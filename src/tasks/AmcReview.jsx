import { useState, useMemo } from 'react';
import {
  X as XIcon, Check, Minus, ChevronLeft, ChevronRight, Lightbulb, KeyRound, AlertTriangle, Zap,
  ListChecks, Eye, BookOpenCheck, Lock, Sun, Moon, CircleCheck, Flag,
} from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';
import { Prose, Inline, Figure, Choices } from '../components/amc/AmcParts';
import {
  LETTERS, TOPIC_LABEL, MAX_RETRIES, problemsOf, isTestBlob, markOf, missedOf, scoreTest,
  reviewFor, reviewScore, reviewItemsOf, isSettled, triesSpent,
} from '../utils/amcTest';

/* ------------------------------------------------------------------ *
 * REVIEW — the practice test, gone through again with the answers.
 *
 * Opens only once the Practice Test has been handed in (the phase that holds
 * it `requires: 'AMC_TEST'`). It reads that sitting's answers and works
 * through the paper problem by problem:
 *
 *   a problem answered correctly   → marked, with its solution one tap away,
 *                                     to compare methods
 *   a problem missed (wrong/blank) → A SECOND TRY FIRST. The choice made in
 *                                     the test is ruled out, a hint is on
 *                                     offer, and only after the problem is
 *                                     put right — or two more tries are
 *                                     spent — does the solution open.
 *
 * The solution is set out the way a teacher writes it up: the key idea, the
 * numbered steps, a figure where one helps, the answer, and the trap behind
 * the tempting wrong choice.
 *
 * SCORING. The XP is for dealing with the MISSED problems: 1 for one put
 * right on a second try, ½ for one whose solution was worked through and
 * ticked, as a share of the problems missed (utils/amcTest.js). A perfect
 * paper has nothing to put right and earns it for reading.
 * ------------------------------------------------------------------ */

const NAVY = 'bg-[#1e3a8a]';
const quietButton = 'px-5 py-3 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:translate-y-[2px] active:border-b-2 transition-all';
const mainButton = 'px-5 py-3 rounded-xl border-b-4 border-[#172554] bg-[#1e3a8a] text-sm font-black uppercase tracking-widest text-white hover:bg-[#1e40af] active:translate-y-[4px] active:border-b-0 transition-all disabled:opacity-40 disabled:pointer-events-none';
const goButton = 'px-5 py-3 rounded-xl border-b-4 border-[#15803d] bg-[#22c55e] text-sm font-black uppercase tracking-widest text-white hover:bg-[#16a34a] active:translate-y-[4px] active:border-b-0 transition-all';

/** How one problem stands: in the test, and in the review so far. */
function statusOf(problem, picks, work) {
  const inTest = markOf(problem, picks[problem.id]);
  if (inTest === 'right') return 'right';
  const entry = work[problem.id];
  if (entry?.fixed) return 'fixed';
  if (entry?.read) return 'read';
  return triesSpent(entry) ? 'open' : 'todo';
}

const STATUS = {
  right: { label: 'Correct in the test', chip: 'bg-emerald-50 dark:bg-emerald-900/25 border-emerald-400 text-emerald-700 dark:text-emerald-300', Icon: Check },
  fixed: { label: 'Put right', chip: 'bg-emerald-50 dark:bg-emerald-900/25 border-emerald-400 text-emerald-700 dark:text-emerald-300', Icon: CircleCheck },
  read: { label: 'Solution worked through', chip: 'bg-sky-50 dark:bg-sky-900/25 border-sky-400 text-sky-700 dark:text-sky-300', Icon: BookOpenCheck },
  open: { label: 'Read the solution', chip: 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-amber-700 dark:text-amber-300', Icon: Eye },
  todo: { label: 'To put right', chip: 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300', Icon: XIcon },
};

function Callout({ tone, icon: Icon, title, children }) {
  const tones = {
    idea: 'border-blue-200 dark:border-blue-800/70 bg-blue-50 dark:bg-blue-900/20 text-blue-950 dark:text-blue-50',
    hint: 'border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/15 text-amber-950 dark:text-amber-50',
    trap: 'border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-900/15 text-rose-950 dark:text-rose-50',
    tip: 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-900/15 text-emerald-950 dark:text-emerald-50',
  };
  const heads = {
    idea: 'text-blue-700 dark:text-blue-300', hint: 'text-amber-700 dark:text-amber-300',
    trap: 'text-rose-700 dark:text-rose-300', tip: 'text-emerald-700 dark:text-emerald-300',
  };
  return (
    <div className={`rounded-2xl border-2 p-4 ${tones[tone]}`}>
      <div className={`mb-1 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] ${heads[tone]}`}>
        <Icon className="h-4 w-4" strokeWidth={2.75} /> {title}
      </div>
      <div className="font-serif text-[1.05rem] leading-relaxed">{children}</div>
    </div>
  );
}

function Solution({ problem }) {
  const letter = problem.correct;
  const answer = problem.choices[LETTERS.indexOf(letter)];
  return (
    <section className="mt-6 overflow-hidden rounded-[1.5rem] border-2 border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-2 border-b-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <ListChecks className="h-5 w-5 text-[#1e3a8a] dark:text-blue-300" strokeWidth={2.75} />
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">Solution</h3>
        <span className="flex-1" />
        <span className="rounded-full bg-white dark:bg-slate-900 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700">
          {TOPIC_LABEL[problem.topic] || problem.topic}
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <Callout tone="idea" icon={KeyRound} title="Key idea"><Inline text={problem.idea} /></Callout>

        <ol className="space-y-3.5">
          {problem.solution.map((step, i) => (
            <li key={i} className="flex gap-3.5">
              <span className={`${NAVY} mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-black text-white`}>{i + 1}</span>
              <Prose text={step} className="min-w-0 flex-1 font-serif text-[1.1rem] leading-relaxed text-slate-800 dark:text-slate-100" />
            </li>
          ))}
        </ol>

        <Figure svg={problem.solutionFigure} />

        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 ring-2 ring-emerald-300 dark:ring-emerald-700">
          <span className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">Answer</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">{letter}</span>
          <span className="font-serif text-xl font-bold text-emerald-950 dark:text-emerald-50"><Inline text={answer} /></span>
        </div>

        {problem.trap && <Callout tone="trap" icon={AlertTriangle} title="Watch out"><Inline text={problem.trap} /></Callout>}
        {problem.tip && <Callout tone="tip" icon={Zap} title="Quick tip"><Inline text={problem.tip} /></Callout>}
      </div>
    </section>
  );
}

function NoSitting({ onQuit }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 p-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Lock className="h-9 w-9 text-slate-400" strokeWidth={2.5} />
      </div>
      <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Sit the Practice Test first</h2>
      <p className="mt-2 max-w-md text-base font-bold text-slate-500 dark:text-slate-400">The Review goes through your own paper, so it opens once the test has been handed in.</p>
      <button type="button" onClick={onQuit} className={`${mainButton} mt-8`}>Back</button>
    </div>
  );
}

export default function AmcReview({ pool, sitting, savedData, onComplete, onProgress, onQuit }) {
  const test = pool;
  const problems = problemsOf(test);
  const ready = isTestBlob(sitting) && sitting.submitted === true;
  const picks = useMemo(() => (ready ? sitting.picks || {} : {}), [ready, sitting]);

  const [work, setWork] = useState(() => reviewFor(savedData, sitting?.sitting).work);
  const missed = useMemo(() => missedOf(test, picks), [test, picks]);
  const [onlyMissed, setOnlyMissed] = useState(() => missedOf(test, picks).length > 0);
  // Opens on the first missed problem still to deal with.
  const [currentId, setCurrentId] = useState(() => {
    const first = missedOf(test, ready ? sitting.picks || {} : {}).find((p) => !isSettled(reviewFor(savedData, sitting?.sitting).work[p.id]));
    return (first || problemsOf(test)[0])?.id;
  });
  const [draft, setDraft] = useState(null);       // the choice picked for a second try
  const [hintFor, setHintFor] = useState(null);   // problem id whose hint is showing
  const [opened, setOpened] = useState(() => new Set()); // solutions opened for problems that were right
  const [isDark, toggleDark] = useDarkMode();

  if (!ready) return <NoSitting onQuit={onQuit} />;

  const blobOf = (w) => ({ v: 1, sitting: sitting.sitting, work: w });
  const save = (w) => {
    setWork(w);
    onProgress?.(reviewScore(test, picks, w), blobOf(w), {});
  };
  const finish = () => onComplete?.(reviewScore(test, picks, work), blobOf(work), { items: reviewItemsOf(test, picks, work) });

  const shown = onlyMissed ? missed : problems;
  const list = shown.length ? shown : problems;
  const problem = list.find((p) => p.id === currentId) || list[0];
  const at = list.indexOf(problem);
  const number = problems.indexOf(problem) + 1;
  const entry = work[problem.id] || {};
  const status = statusOf(problem, picks, work);
  const testPick = picks[problem.id] || null;
  const settled = missed.filter((p) => isSettled(work[p.id])).length;
  const score = scoreTest(test, picks);

  const goTo = (id) => { setCurrentId(id); setDraft(null); };
  const step = (d) => { const next = list[at + d]; if (next) goTo(next.id); };

  const tried = entry.tries || [];
  const ruled = [...(testPick && testPick !== problem.correct ? [testPick] : []), ...tried.filter((t) => t !== problem.correct)];
  const retrying = status === 'todo';
  const solutionOpen = status === 'fixed' || status === 'read' || status === 'open' || (status === 'right' && opened.has(problem.id));

  const check = () => {
    if (!draft || !retrying) return;
    const tries = [...tried, draft];
    save({ ...work, [problem.id]: { ...entry, tries, ...(draft === problem.correct ? { fixed: true } : null) } });
    setDraft(null);
  };
  const giveUp = () => save({ ...work, [problem.id]: { ...entry, gaveUp: true } });
  const markRead = () => save({ ...work, [problem.id]: { ...entry, read: true } });

  // How the five choices are marked on this screen.
  const marks = {};
  if (retrying) {
    for (const L of ruled) marks[L] = 'ruled';
  } else if (solutionOpen) {
    marks[problem.correct] = 'right';
    for (const L of ruled) marks[L] = 'wrong';
  } else if (status === 'right') {
    marks[problem.correct] = 'right';
  }

  const triesLeft = MAX_RETRIES - tried.length;
  const Status = STATUS[status];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
      <header className={`${NAVY} flex-shrink-0 text-white shadow-md`}>
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center gap-3 px-3 sm:px-5">
          <button type="button" onClick={finish} aria-label="Save and quit" title="Save & quit"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 hover:bg-white/20 active:scale-95 transition-all">
            <XIcon className="h-5 w-5" strokeWidth={3} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base sm:text-lg font-black leading-tight tracking-tight">Review · {test.title}</p>
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-200">
              Test score {score.right} / {score.total}
              {missed.length > 0 && <> · {settled} of {missed.length} missed questions dealt with</>}
            </p>
          </div>
          <button type="button" onClick={toggleDark} aria-label="Toggle dark mode" title="Toggle dark mode"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-blue-100 hover:bg-white/10 active:scale-95 transition-all">
            {isDark ? <Sun className="h-5 w-5" strokeWidth={2.5} /> : <Moon className="h-5 w-5" strokeWidth={2.5} />}
          </button>
        </div>
        {missed.length > 0 && (
          <div className="h-1.5 bg-white/10">
            <div className="h-full bg-[#fb923c] transition-all duration-500" style={{ width: `${(settled / missed.length) * 100}%` }} />
          </div>
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-7xl gap-4 p-3 sm:p-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <main className="min-w-0 rounded-[1.75rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b-2 border-slate-100 dark:border-slate-800 px-5 sm:px-7 py-3.5">
              <span className={`${NAVY} flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-lg font-black tabular-nums text-white`}>{number}</span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Problem {number}</span>
              <span className="flex-1" />
              <span className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-black ${Status.chip}`}>
                <Status.Icon className="h-3.5 w-3.5" strokeWidth={3.5} /> {Status.label}
              </span>
            </div>

            <div key={problem.id} className="px-5 sm:px-7 py-5 sm:py-6">
              <Prose text={problem.text} className="font-serif text-[1.15rem] sm:text-[1.3rem] leading-relaxed text-slate-800 dark:text-slate-100" />
              <Figure svg={problem.figure} className="mt-5" />

              {/* What happened in the test */}
              <p className="mt-6 mb-3 flex flex-wrap items-center gap-2 text-sm font-black text-slate-500 dark:text-slate-400">
                {status === 'right' ? (
                  <><Check className="h-4 w-4 text-emerald-600" strokeWidth={4} /> In the test you answered ({testPick}) — correct.</>
                ) : testPick ? (
                  <><XIcon className="h-4 w-4 text-rose-500" strokeWidth={4} /> In the test you answered ({testPick}). That is not the answer{retrying ? ', so it is crossed out' : ''}.</>
                ) : (
                  <><Minus className="h-4 w-4 text-slate-400" strokeWidth={4} /> You left this one blank in the test.</>
                )}
              </p>

              <Choices choices={problem.choices} pick={retrying ? draft : null} onPick={retrying ? setDraft : undefined} marks={marks} />

              {retrying && (
                <div className="mt-5 space-y-4">
                  {tried.length > 0 && (
                    <p className="rounded-xl border-2 border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-900/15 px-4 py-2.5 text-sm font-black text-rose-700 dark:text-rose-300">
                      Not ({tried[tried.length - 1]}) either. {triesLeft === 1 ? 'One more try' : `${triesLeft} more tries`} — use the hint.
                    </p>
                  )}
                  {hintFor === problem.id && <Callout tone="hint" icon={Lightbulb} title="Hint"><Inline text={problem.hint} /></Callout>}
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                    <button type="button" onClick={check} disabled={!draft} className={`${mainButton} flex-1 sm:flex-none sm:px-8`}>
                      Check my second try
                    </button>
                    {hintFor !== problem.id && (
                      <button type="button" onClick={() => setHintFor(problem.id)} className={`${quietButton} flex items-center justify-center gap-2`}>
                        <Lightbulb className="h-4 w-4 text-amber-500" strokeWidth={2.75} /> Hint
                      </button>
                    )}
                    <span className="flex-1" />
                    <button type="button" onClick={giveUp} className="px-2 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      Show me the solution
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-400">
                    Work it out on paper again before you choose. Putting it right yourself earns full credit; reading the solution earns half.
                  </p>
                </div>
              )}

              {status === 'fixed' && (
                <p className="mt-5 flex items-center gap-2 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 text-sm font-black text-emerald-700 dark:text-emerald-300">
                  <CircleCheck className="h-5 w-5" strokeWidth={2.75} /> You put it right. Now compare your method with the solution.
                </p>
              )}

              {status === 'right' && !solutionOpen && (
                <button type="button" onClick={() => setOpened((prev) => new Set(prev).add(problem.id))} className={`${quietButton} mt-5 flex items-center gap-2`}>
                  <Eye className="h-4 w-4" strokeWidth={2.75} /> Compare with the solution
                </button>
              )}

              {solutionOpen && <Solution problem={problem} />}

              {status === 'open' && (
                <button type="button" onClick={markRead} className={`${goButton} mt-5 flex w-full items-center justify-center gap-2 sm:w-auto`}>
                  <BookOpenCheck className="h-5 w-5" strokeWidth={2.75} /> I have worked through this solution
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 border-t-2 border-slate-100 dark:border-slate-800 px-5 sm:px-7 py-3.5">
              <button type="button" onClick={() => step(-1)} disabled={at === 0} aria-label="Previous problem"
                className={`${quietButton} !px-3 disabled:pointer-events-none disabled:opacity-30`}>
                <ChevronLeft className="h-5 w-5" strokeWidth={3} />
              </button>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{at + 1} / {list.length}{onlyMissed && missed.length > 0 ? ' missed' : ''}</span>
              <span className="flex-1" />
              {at === list.length - 1 ? (
                <button type="button" onClick={finish} className={`${goButton} flex items-center gap-2`}>
                  <Flag className="h-4 w-4" strokeWidth={3} /> Finish review
                </button>
              ) : (
                <button type="button" onClick={() => step(1)} className={`${mainButton} flex items-center gap-1.5`}>
                  Next <ChevronRight className="h-4 w-4" strokeWidth={3} />
                </button>
              )}
            </div>
          </main>

          <aside className="rounded-[1.75rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm lg:sticky lg:top-0">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Your paper</h2>
            {missed.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-black uppercase tracking-widest">
                {[[true, `Missed (${missed.length})`], [false, `All ${problems.length}`]].map(([value, label]) => (
                  <button key={label} type="button" onClick={() => { setOnlyMissed(value); setDraft(null); }}
                    className={`rounded-lg py-2 transition-colors ${onlyMissed === value ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-3 grid grid-cols-5 gap-1.5">
              {problems.map((p, i) => {
                const s = statusOf(p, picks, work);
                const here = p.id === problem.id;
                const dim = onlyMissed && s === 'right';
                const Mark = STATUS[s].Icon;
                return (
                  <button key={p.id} type="button" title={`Problem ${i + 1}: ${STATUS[s].label}`}
                    onClick={() => { if (dim) setOnlyMissed(false); goTo(p.id); }}
                    className={`flex flex-col items-center rounded-xl border-2 py-1.5 transition-all ${STATUS[s].chip} ${here ? 'ring-2 ring-offset-2 ring-blue-600 dark:ring-offset-slate-900' : ''} ${dim ? 'opacity-40' : ''}`}>
                    <span className="text-xs font-black tabular-nums">{i + 1}</span>
                    <Mark className="h-3.5 w-3.5" strokeWidth={3.5} />
                  </button>
                );
              })}
            </div>
            <ul className="mt-4 space-y-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {['right', 'todo', 'fixed', 'read'].map((s) => {
                const Mark = STATUS[s].Icon;
                return (
                  <li key={s} className="flex items-center gap-2">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${STATUS[s].chip}`}><Mark className="h-3 w-3" strokeWidth={3.5} /></span>
                    {STATUS[s].label}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
