import { useState, useMemo } from 'react';
import {
  X as XIcon, Check, Minus, ChevronLeft, ChevronRight, KeyRound, AlertTriangle, Zap,
  ListChecks, Lock, Sun, Moon, Flag,
} from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';
import { Prose, Inline, Figure, Choices } from '../components/amc/AmcParts';
import {
  LETTERS, TOPIC_LABEL, problemsOf, isTestBlob, markOf, missedOf, scoreTest, seenOf, reviewScore, extraOf,
} from '../utils/amcTest';

/* ------------------------------------------------------------------ *
 * REVIEW — the practice test, gone through again with the answers.
 *
 * Opens only once the Practice Test has been handed in (the phase that holds
 * it `requires: 'AMC_TEST'`). It reads that paper's answers and shows every
 * problem with what was answered, the correct answer, and the solution set
 * out the way a teacher writes it up: the key idea, the numbered steps, a
 * figure where one helps, the answer, and the trap behind the tempting wrong
 * choice.
 *
 * There are no second tries: the test is sat once and this is the reading
 * that follows it. The list opens on the problems that were missed, with the
 * whole paper one tap away.
 *
 * SCORING. The XP is for opening the solutions of the MISSED problems, as a
 * share of the problems missed (utils/amcTest.js). A perfect paper has
 * nothing to go back to and earns it for opening the review.
 * ------------------------------------------------------------------ */

const NAVY = 'bg-[#1e3a8a]';
const quietButton = 'px-5 py-3 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:translate-y-[2px] active:border-b-2 transition-all';
const mainButton = 'px-5 py-3 rounded-xl border-b-4 border-[#172554] bg-[#1e3a8a] text-sm font-black uppercase tracking-widest text-white hover:bg-[#1e40af] active:translate-y-[4px] active:border-b-0 transition-all';
const goButton = 'px-5 py-3 rounded-xl border-b-4 border-[#15803d] bg-[#22c55e] text-sm font-black uppercase tracking-widest text-white hover:bg-[#16a34a] active:translate-y-[4px] active:border-b-0 transition-all';

const STATUS = {
  right: { label: 'Correct', chip: 'bg-emerald-50 dark:bg-emerald-900/25 border-emerald-400 text-emerald-700 dark:text-emerald-300', Icon: Check },
  wrong: { label: 'Wrong', chip: 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300', Icon: XIcon },
  blank: { label: 'Left blank', chip: 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400', Icon: Minus },
};

function Callout({ tone, icon: Icon, title, children }) {
  const tones = {
    idea: 'border-blue-200 dark:border-blue-800/70 bg-blue-50 dark:bg-blue-900/20 text-blue-950 dark:text-blue-50',
    trap: 'border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-900/15 text-rose-950 dark:text-rose-50',
    tip: 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-900/15 text-emerald-950 dark:text-emerald-50',
  };
  const heads = {
    idea: 'text-blue-700 dark:text-blue-300',
    trap: 'text-rose-700 dark:text-rose-300',
    tip: 'text-emerald-700 dark:text-emerald-300',
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
    <section className="mt-6 overflow-hidden rounded-[1.5rem] border-2 border-slate-200 dark:border-slate-700">
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

function NoPaper({ onQuit }) {
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

/** Where the review opens: the first missed problem not read yet. */
function openingProblem(test, paper, savedData) {
  const picks = paper?.picks || {};
  const seen = seenOf(savedData);
  const missed = missedOf(test, picks);
  return (missed.find((p) => !seen.includes(p.id)) || missed[0] || problemsOf(test)[0])?.id;
}

export default function AmcReview({ pool, paper, savedData, onComplete, onProgress, onQuit }) {
  const test = pool;
  const problems = problemsOf(test);
  const ready = isTestBlob(paper) && paper.submitted === true;
  const picks = useMemo(() => (ready ? paper.picks || {} : {}), [ready, paper]);
  const missed = useMemo(() => missedOf(test, picks), [test, picks]);

  const [currentId, setCurrentId] = useState(() => openingProblem(test, paper, savedData));
  // The problem on screen counts as read from the moment it is opened.
  const [seen, setSeen] = useState(() => [...new Set([...seenOf(savedData), openingProblem(test, paper, savedData)])].filter(Boolean));
  const [onlyMissed, setOnlyMissed] = useState(() => missedOf(test, paper?.picks || {}).length > 0);
  const [isDark, toggleDark] = useDarkMode();

  if (!ready) return <NoPaper onQuit={onQuit} />;

  const blobOf = (list) => ({ v: 1, seen: list });
  const itemsOf = (list) => missed.map((p) => ({ itemId: p.id, correct: list.includes(p.id) }));
  const finish = () => onComplete?.(reviewScore(test, picks, seen), blobOf(seen), { items: itemsOf(seen) });

  const list = onlyMissed && missed.length ? missed : problems;
  const problem = list.find((p) => p.id === currentId) || list[0];
  const at = list.indexOf(problem);
  const number = problems.indexOf(problem) + 1;
  const status = markOf(problem, picks[problem.id]);
  const testPick = picks[problem.id] || null;
  // An answer given in extra time, after the clock: shown, never scored.
  const latePick = status === 'blank' ? extraOf(paper)[problem.id] || null : null;
  const read = missed.filter((p) => seen.includes(p.id)).length;
  const score = scoreTest(test, picks);

  const goTo = (id) => {
    setCurrentId(id);
    if (!seen.includes(id)) {
      const next = [...seen, id];
      setSeen(next);
      onProgress?.(reviewScore(test, picks, next), blobOf(next), {});
    }
  };
  const step = (d) => { const next = list[at + d]; if (next) goTo(next.id); };

  const marks = { [problem.correct]: 'right' };
  if (status === 'wrong') marks[testPick] = 'wrong';
  if (latePick && latePick !== problem.correct) marks[latePick] = 'wrong';
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
              Your score {score.right} / {score.total}
              {missed.length > 0 && <> · {read} of {missed.length} missed questions read</>}
            </p>
          </div>
          <button type="button" onClick={toggleDark} aria-label="Toggle dark mode" title="Toggle dark mode"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-blue-100 hover:bg-white/10 active:scale-95 transition-all">
            {isDark ? <Sun className="h-5 w-5" strokeWidth={2.5} /> : <Moon className="h-5 w-5" strokeWidth={2.5} />}
          </button>
        </div>
        {missed.length > 0 && (
          <div className="h-1.5 bg-white/10">
            <div className="h-full bg-[#fb923c] transition-all duration-500" style={{ width: `${(read / missed.length) * 100}%` }} />
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

              <p className="mt-6 mb-3 text-sm font-black text-slate-500 dark:text-slate-400">
                {status === 'right' && <>You answered ({testPick}). That is correct.</>}
                {status === 'wrong' && <>You answered ({testPick}). The correct answer is ({problem.correct}).</>}
                {status === 'blank' && !latePick && <>You left this one blank. The correct answer is ({problem.correct}).</>}
                {latePick === problem.correct && <>You left this one blank in the time. In extra time you answered ({latePick}), which is correct.</>}
                {latePick && latePick !== problem.correct && <>You left this one blank in the time. In extra time you answered ({latePick}). The correct answer is ({problem.correct}).</>}
              </p>

              <Choices choices={problem.choices} marks={marks} />
              <Solution problem={problem} />
            </div>

            <div className="flex items-center gap-2.5 border-t-2 border-slate-100 dark:border-slate-800 px-5 sm:px-7 py-3.5">
              <button type="button" onClick={() => step(-1)} disabled={at === 0} aria-label="Previous problem"
                className={`${quietButton} !px-3 disabled:pointer-events-none disabled:opacity-30`}>
                <ChevronLeft className="h-5 w-5" strokeWidth={3} />
              </button>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{at + 1} / {list.length}{list === missed ? ' missed' : ''}</span>
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
                  <button key={label} type="button" onClick={() => setOnlyMissed(value)}
                    className={`rounded-lg py-2 transition-colors ${onlyMissed === value ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-3 grid grid-cols-5 gap-1.5">
              {problems.map((p, i) => {
                const s = markOf(p, picks[p.id]);
                const here = p.id === problem.id;
                const Mark = STATUS[s].Icon;
                return (
                  <button key={p.id} type="button" title={`Problem ${i + 1}: ${STATUS[s].label}`}
                    onClick={() => { if (onlyMissed && s === 'right') setOnlyMissed(false); goTo(p.id); }}
                    className={`relative flex flex-col items-center rounded-xl border-2 py-1.5 transition-all ${STATUS[s].chip} ${here ? 'ring-2 ring-offset-2 ring-blue-600 dark:ring-offset-slate-900' : ''} ${onlyMissed && s === 'right' ? 'opacity-40' : ''}`}>
                    <span className="text-xs font-black tabular-nums">{i + 1}</span>
                    <Mark className="h-3.5 w-3.5" strokeWidth={3.5} />
                    {s !== 'right' && !seen.includes(p.id) && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#f97316] ring-2 ring-white dark:ring-slate-900" title="Not read yet" />}
                  </button>
                );
              })}
            </div>
            <ul className="mt-4 space-y-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {['right', 'wrong', 'blank'].map((s) => {
                const Mark = STATUS[s].Icon;
                return (
                  <li key={s} className="flex items-center gap-2">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${STATUS[s].chip}`}><Mark className="h-3 w-3" strokeWidth={3.5} /></span>
                    {STATUS[s].label}
                  </li>
                );
              })}
              <li className="flex items-center gap-2"><span className="ml-1 mr-1 h-2.5 w-2.5 rounded-full bg-[#f97316]" /> Solution not read yet</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
