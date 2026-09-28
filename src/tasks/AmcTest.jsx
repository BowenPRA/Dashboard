import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X as XIcon, Clock, Flag, ChevronLeft, ChevronRight, Eraser, Send, Trophy, Timer,
  PencilLine, CalculatorIcon, Ruler, CircleSlash, RotateCcw, Check, Minus, ArrowRight, Award, Sun, Moon,
} from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';
import { Prose, Figure, Choices } from '../components/amc/AmcParts';
import {
  LETTERS, TOPICS, TOPIC_LABEL, problemsOf, secondsAllowed, isTestBlob, newSitting,
  scoreTest, itemsOf, markOf, awardFor, formatClock,
} from '../utils/amcTest';

/* ------------------------------------------------------------------ *
 * PRACTICE TEST — an AMC 8 paper, sat under contest conditions.
 *
 * 25 questions, five choices each, 40 minutes, one point for a correct
 * answer and nothing taken off for a wrong one. Three screens:
 *
 *   cover    the front of the booklet: the rules, and Begin
 *   running  one problem at a time beside a bubble sheet, under a clock
 *   results  the score — and which questions were missed, but NOT their
 *            answers: those belong to the Review task, where each missed
 *            problem is tried again before its solution is shown
 *
 * THE CLOCK IS A DEADLINE. Begin stamps `deadline` into the resume blob and
 * every answer is checkpointed (`onProgress`), so closing the tab neither
 * stops the clock nor loses the paper: reopening carries on with whatever
 * time is left, and a paper whose time ran out while it was closed is handed
 * in as it stood.
 *
 * Nothing is marked while the test runs. The score is reported only when the
 * paper is handed in, as the number of correct answers out of 25
 * (`nativeMax: 25` in the registry), and `submitted: true` in the blob is
 * what opens the Review. Reads a unit's `amcTest` (item shape in
 * src/data/AMC8/PT_01/test.js; blob shape in src/utils/amcTest.js).
 * ------------------------------------------------------------------ */

const NAVY = 'bg-[#1e3a8a]';

/** What the task opens on, worked out once from the saved blob. */
function openingState(test, savedData, now) {
  if (!isTestBlob(savedData)) return { stage: 'cover', blob: null, lapsed: false };
  if (savedData.submitted) return { stage: 'results', blob: savedData, lapsed: false };
  if (now >= savedData.deadline) {
    // Time ran out while the test was closed: it is handed in as it stood.
    return { stage: 'results', blob: { ...savedData, submitted: true, usedSeconds: secondsAllowed(test), timedOut: true }, lapsed: true };
  }
  return { stage: 'running', blob: savedData, lapsed: false };
}

const firstUnanswered = (problems, picks) => {
  const i = problems.findIndex((p) => !picks[p.id]);
  return i === -1 ? 0 : i;
};

function IconButton({ onClick, label, children, className = '' }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label}
      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:translate-y-[2px] active:border-b-2 ${className}`}>
      {children}
    </button>
  );
}

function Dialog({ title, children, actions }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-150" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-full max-w-md rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-150">
        <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">{title}</h2>
        <div className="mt-3 space-y-3 text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">{actions}</div>
      </div>
    </div>
  );
}

const quietButton = 'px-5 py-3 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:translate-y-[2px] active:border-b-2 transition-all';
const mainButton = 'px-5 py-3 rounded-xl border-b-4 border-[#172554] bg-[#1e3a8a] text-sm font-black uppercase tracking-widest text-white hover:bg-[#1e40af] active:translate-y-[4px] active:border-b-0 transition-all';
const goButton = 'px-5 py-3 rounded-xl border-b-4 border-[#c2410c] bg-[#f97316] text-sm font-black uppercase tracking-widest text-white hover:bg-[#fb923c] active:translate-y-[4px] active:border-b-0 transition-all';

// ── Cover ───────────────────────────────────────────────────────────────────
function Cover({ test, count, resit, onBegin, onQuit }) {
  const minutes = Math.round(secondsAllowed(test) / 60);
  const rules = [
    <>This is a <strong>{count}-question multiple-choice test</strong>. Each question has five choices, and exactly one of them is correct.</>,
    <>You have <strong>{minutes} minutes</strong>. The clock starts when you press Begin and it <strong>does not stop</strong> — not even if you close the test.</>,
    <>You score <strong>1 point</strong> for each correct answer, <strong>0</strong> for a blank and <strong>0</strong> for a wrong answer. Nothing is taken off for a wrong answer, so answer every question.</>,
    <>You may use blank scratch paper, a ruler and an eraser. <strong>No calculator</strong>, and no phone, smartwatch, compass, protractor or graph paper. No question needs a calculator.</>,
    <>Figures are not necessarily drawn to scale.</>,
    <>You will not see which answers are correct until you hand in your paper. The solutions are in the <strong>Review</strong>, which opens after the test.</>,
  ];
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <div className={`${NAVY} relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10 text-white`}>
            <div aria-hidden="true" className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[28px] border-white/5" />
            <div aria-hidden="true" className="absolute right-24 -bottom-24 h-56 w-56 rounded-full border-[22px] border-white/5" />
            <p className="relative text-xs font-black uppercase tracking-[0.25em] text-blue-200">AMC 8 Prep · Practice under contest conditions</p>
            <h1 className="relative mt-2 text-4xl sm:text-5xl font-black tracking-tight text-[#fb923c]">{test.title}</h1>
            {test.source && <p className="relative mt-2 text-sm sm:text-base font-bold text-blue-100">{test.source}</p>}
            <div className="relative mt-6 flex flex-wrap gap-2.5">
              {[[PencilLine, `${count} questions`], [Timer, `${minutes} minutes`], [CalculatorIcon, 'No calculator'], [Trophy, '1 point each']].map(([Icon, label]) => (
                <span key={label} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-black ring-1 ring-white/20">
                  <Icon className="h-4 w-4" strokeWidth={2.5} /> {label}
                </span>
              ))}
            </div>
          </div>

          <div className="px-6 py-7 sm:px-10 sm:py-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e3a8a] dark:text-blue-300">Instructions</h2>
            <ol className="mt-3 space-y-3">
              {rules.map((rule, i) => (
                <li key={i} className="flex gap-3.5 font-serif text-[1.05rem] leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 font-sans text-sm font-black text-slate-500 dark:text-slate-400">{i + 1}</span>
                  <span className="[&_strong]:font-bold [&_strong]:text-slate-900 dark:[&_strong]:text-white">{rule}</span>
                </li>
              ))}
            </ol>

            <div className="mt-7 rounded-2xl border-2 border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/15 p-4 sm:p-5">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">Before you begin</h3>
              <ul className="mt-2.5 grid gap-2 sm:grid-cols-3 text-sm font-bold text-amber-900 dark:text-amber-100">
                <li className="flex items-center gap-2"><Ruler className="h-4 w-4 flex-shrink-0" strokeWidth={2.5} /> Scratch paper and a pencil</li>
                <li className="flex items-center gap-2"><CircleSlash className="h-4 w-4 flex-shrink-0" strokeWidth={2.5} /> Calculator and phone away</li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 flex-shrink-0" strokeWidth={2.5} /> {minutes} minutes with no breaks</li>
              </ul>
            </div>

            {resit && (
              <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">
                This is a second sitting. Your best score is kept, and the Review will start again from the new paper.
              </p>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={onQuit} className={quietButton}>Not now</button>
              <button type="button" onClick={onBegin} className={`${goButton} flex items-center justify-center gap-2 px-8 py-4 text-base`}>
                Begin the test <ArrowRight className="h-5 w-5" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── The bubble sheet ────────────────────────────────────────────────────────
function AnswerSheet({ problems, picks, flags, current, onGo, onPick }) {
  const half = Math.ceil(problems.length / 2);
  const column = (list, offset) => (
    <ol className="space-y-1">
      {list.map((p, i) => {
        const n = offset + i;
        const here = n === current;
        return (
          <li key={p.id} className={`flex items-center gap-1 rounded-lg px-1 py-0.5 ${here ? 'bg-blue-100 dark:bg-blue-900/40 ring-2 ring-blue-500' : ''}`}>
            <button type="button" onClick={() => onGo(n)} aria-label={`Go to question ${n + 1}`}
              className={`relative w-7 flex-shrink-0 text-right text-xs font-black tabular-nums ${here ? 'text-blue-800 dark:text-blue-200' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600`}>
              {flags.includes(p.id) && <Flag className="absolute -left-0.5 top-0.5 h-2.5 w-2.5 fill-amber-400 text-amber-500" strokeWidth={2.5} />}
              {n + 1}.
            </button>
            {LETTERS.map((L) => {
              const on = picks[p.id] === L;
              return (
                <button key={L} type="button" onClick={() => onPick(n, L)} aria-label={`Question ${n + 1}, choice ${L}`} aria-pressed={on}
                  className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border text-[10px] font-black transition-colors
                    ${on
                      ? 'border-slate-800 bg-slate-800 text-white dark:border-white dark:bg-white dark:text-slate-900'
                      : 'border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500 hover:border-blue-500 hover:text-blue-600'}`}>
                  {L}
                </button>
              );
            })}
          </li>
        );
      })}
    </ol>
  );
  return (
    <div className="grid grid-cols-2 gap-x-2">
      {column(problems.slice(0, half), 0)}
      {column(problems.slice(half), half)}
    </div>
  );
}

// ── Results ─────────────────────────────────────────────────────────────────
function Results({ test, blob, onDone, onResit }) {
  const problems = problemsOf(test);
  const score = scoreTest(test, blob.picks);
  const award = awardFor(test, score.right);
  const allowed = secondsAllowed(test);
  const used = Math.min(allowed, Math.max(0, Math.round(blob.usedSeconds ?? allowed)));
  const missed = score.wrong + score.blank;
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="overflow-hidden rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <div className={`${NAVY} px-6 py-7 sm:px-10 text-white`}>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-200">{test.title} · handed in{blob.timedOut ? ' when time ran out' : ''}</p>
            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <div className="relative h-36 w-36 flex-shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
                  <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" stroke="rgba(255,255,255,0.15)" />
                  <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" strokeLinecap="round" stroke="#fb923c"
                    strokeDasharray={c} strokeDashoffset={c * (1 - score.right / Math.max(1, score.total))} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black tabular-nums leading-none">{score.right}</span>
                  <span className="mt-1 text-sm font-black text-blue-200">out of {score.total}</span>
                </div>
              </div>
              <div className="min-w-0 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Your score: {score.right}</h1>
                <p className="mt-1.5 text-base font-bold text-blue-100">
                  {score.right} correct · {score.wrong} wrong · {score.blank} blank · time used {formatClock(used)}
                </p>
                {award ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f97316] px-4 py-1.5 text-sm font-black">
                    <Award className="h-4 w-4" strokeWidth={2.5} /> {award.label} level{award.note ? ` (${award.note})` : ''}
                  </p>
                ) : (test.awards || []).length > 0 && (
                  <p className="mt-3 text-sm font-bold text-blue-200">
                    {[...test.awards].sort((a, b) => a.score - b.score).map((a) => `${a.label}: ${a.score}+`).join(' · ')}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-10 sm:py-7">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Question by question</h2>
            <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-[repeat(13,minmax(0,1fr))]">
              {problems.map((p, i) => {
                const mark = markOf(p, blob.picks[p.id]);
                const tone = mark === 'right'
                  ? 'bg-emerald-50 dark:bg-emerald-900/25 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                  : mark === 'wrong'
                    ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400';
                const Mark = mark === 'right' ? Check : mark === 'wrong' ? XIcon : Minus;
                return (
                  <div key={p.id} title={`Question ${i + 1}: ${mark}`} className={`flex flex-col items-center rounded-xl border-2 py-1.5 ${tone}`}>
                    <span className="text-[11px] font-black tabular-nums opacity-70">{i + 1}</span>
                    <Mark className="h-4 w-4" strokeWidth={4} />
                    <span className="text-[11px] font-black">{blob.picks[p.id] || '–'}</span>
                  </div>
                );
              })}
            </div>

            <h2 className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-slate-400">By topic</h2>
            <div className="mt-3 space-y-2.5">
              {TOPICS.filter((t) => score.byTopic[t]).map((t) => {
                const { right, total } = score.byTopic[t];
                return (
                  <div key={t} className="flex items-center gap-3">
                    <span className="w-44 flex-shrink-0 text-sm font-black text-slate-700 dark:text-slate-200">{TOPIC_LABEL[t]}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-full rounded-full bg-[#1e3a8a] dark:bg-blue-500" style={{ width: `${(right / total) * 100}%` }} />
                    </div>
                    <span className="w-12 flex-shrink-0 text-right text-sm font-black tabular-nums text-slate-500 dark:text-slate-400">{right}/{total}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-2xl border-2 border-orange-200 dark:border-orange-800/60 bg-orange-50 dark:bg-orange-900/15 p-4 sm:p-5">
              <h3 className="text-base font-black text-orange-900 dark:text-orange-100">
                {missed > 0 ? `Next: review your ${missed} missed question${missed === 1 ? '' : 's'}` : 'A perfect paper'}
              </h3>
              <p className="mt-1 text-sm font-bold leading-relaxed text-orange-800 dark:text-orange-200">
                {missed > 0
                  ? 'The answers are not shown here on purpose. Open Review on the unit card: you get a second try at each missed question, then the solution step by step.'
                  : 'Open Review on the unit card to compare your methods with the worked solutions.'}
              </p>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={onResit} className={`${quietButton} flex items-center justify-center gap-2`}>
                <RotateCcw className="h-4 w-4" strokeWidth={3} /> Sit the test again
              </button>
              <button type="button" onClick={onDone} className={`${mainButton} px-8 py-4 text-base`}>Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── The task ────────────────────────────────────────────────────────────────
export default function AmcTest({ pool, savedData, onComplete, onProgress, onQuit }) {
  const test = pool;
  const problems = problemsOf(test);

  const [opening] = useState(() => openingState(test, savedData, Date.now()));
  const [stage, setStage] = useState(opening.stage);
  const [blob, setBlob] = useState(opening.blob);
  const [idx, setIdx] = useState(() => (opening.stage === 'running' ? firstUnanswered(problemsOf(test), opening.blob.picks) : 0));
  const [now, setNow] = useState(() => Date.now());
  const [dialog, setDialog] = useState(null); // 'handin' | 'leave' | 'resit'
  const [isDark, toggleDark] = useDarkMode();

  // The interval and the key handler are bound once; they read the live paper
  // through this ref rather than being re-bound on every answer.
  const live = useRef({ blob, stage, handIn: null });

  // A paper that timed out while closed is handed in the moment it is opened.
  useEffect(() => {
    if (opening.lapsed) onProgress?.(scoreTest(test, opening.blob.picks).right, opening.blob);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- once, on open

  const checkpoint = (next) => {
    setBlob(next);
    onProgress?.(0, next);
  };

  const handIn = (timedOut = false) => {
    const { blob: paper, stage: at } = live.current;
    if (at !== 'running' || !paper || paper.submitted) return;
    const allowed = secondsAllowed(test);
    const used = timedOut ? allowed : Math.min(allowed, Math.round((Date.now() - paper.startedAt) / 1000));
    const done = { ...paper, submitted: true, usedSeconds: used, ...(timedOut ? { timedOut: true } : null) };
    live.current = { ...live.current, blob: done, stage: 'results' };
    setBlob(done);
    setStage('results');
    setDialog(null);
    // Banked at once, so closing the tab on the results screen loses nothing.
    onProgress?.(scoreTest(test, done.picks).right, done);
  };
  useEffect(() => { live.current = { blob, stage, handIn }; });

  useEffect(() => {
    if (stage !== 'running') return undefined;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= live.current.blob.deadline) live.current.handIn?.(true);
    }, 250);
    return () => clearInterval(id);
  }, [stage]);

  const begin = () => {
    const t = Date.now();
    const fresh = newSitting(test, t, blob);
    setNow(t);
    setIdx(0);
    setStage('running');
    checkpoint(fresh);
  };

  const pick = (n, letter) => {
    const p = problems[n];
    if (!p || stage !== 'running') return;
    const picks = { ...blob.picks };
    if (letter) picks[p.id] = letter; else delete picks[p.id];
    checkpoint({ ...blob, picks });
  };

  const toggleFlag = () => {
    const id = problems[idx]?.id;
    if (!id) return;
    const flags = blob.flags.includes(id) ? blob.flags.filter((f) => f !== id) : [...blob.flags, id];
    checkpoint({ ...blob, flags });
  };

  const go = useCallback((n) => setIdx(Math.max(0, Math.min(problemsOf(test).length - 1, n))), [test]);

  // A–E answer, the arrows move, F flags — the keys a student reaches for.
  useEffect(() => {
    if (stage !== 'running' || dialog) return undefined;
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (e.key === 'ArrowRight') { e.preventDefault(); setIdx((i) => Math.min(problems.length - 1, i + 1)); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
      else if (LETTERS.includes(key) || key === 'F') {
        e.preventDefault();
        document.getElementById(key === 'F' ? 'amc-flag' : `amc-key-${key}`)?.click();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stage, dialog, problems.length]);

  // ── cover ────────────────────────────────────────────────────────────────
  if (stage === 'cover') {
    return <Cover test={test} count={problems.length} resit={!!blob?.submitted} onBegin={begin} onQuit={onQuit} />;
  }

  // ── results ──────────────────────────────────────────────────────────────
  if (stage === 'results') {
    const done = () => {
      // The attempt is logged once per sitting; reopening the results later
      // only looks at them.
      if (blob.logged) { onQuit?.(); return; }
      const finished = { ...blob, logged: true };
      onComplete?.(scoreTest(test, finished.picks).right, finished, { items: itemsOf(test, finished.picks) });
    };
    return (
      <>
        <Results test={test} blob={blob} onDone={done} onResit={() => setDialog('resit')} />
        {dialog === 'resit' && (
          <Dialog title="Sit the test again?" actions={<>
            <button type="button" className={quietButton} onClick={() => setDialog(null)}>Cancel</button>
            <button type="button" className={mainButton} onClick={() => { setDialog(null); setStage('cover'); }}>Yes, new paper</button>
          </>}>
            <p>You will get a blank paper and a new {Math.round(secondsAllowed(test) / 60)} minutes. Your best score is kept.</p>
            <p>The Review locks again until the new paper is handed in, and then starts from that paper.</p>
          </Dialog>
        )}
      </>
    );
  }

  // ── running ──────────────────────────────────────────────────────────────
  const problem = problems[idx];
  const left = Math.max(0, (blob.deadline - now) / 1000);
  const answered = problems.filter((p) => blob.picks[p.id]).length;
  const blanks = problems.map((p, i) => (blob.picks[p.id] ? null : i + 1)).filter(Boolean);
  const flagged = blob.flags.includes(problem.id);
  const clockTone = left <= 60
    ? 'bg-rose-600 border-rose-800 text-white animate-pulse'
    : left <= 300
      ? 'bg-amber-400 border-amber-600 text-amber-950'
      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100';

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Hidden targets for the A–E and F keys, so a key press goes through
          exactly the same handlers as a click. */}
      <div className="hidden">
        {LETTERS.map((L) => <button key={L} id={`amc-key-${L}`} type="button" tabIndex={-1} onClick={() => pick(idx, L)} />)}
        <button id="amc-flag" type="button" tabIndex={-1} onClick={toggleFlag} />
      </div>

      <header className={`${NAVY} flex-shrink-0 text-white shadow-md`}>
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center gap-3 px-3 sm:px-5">
          <button type="button" onClick={() => setDialog('leave')} aria-label="Leave the test" title="Leave the test"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 hover:bg-white/20 active:scale-95 transition-all">
            <XIcon className="h-5 w-5" strokeWidth={3} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base sm:text-lg font-black leading-tight tracking-tight">{test.title}</p>
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-200">{answered} of {problems.length} answered</p>
          </div>
          <button type="button" onClick={toggleDark} aria-label="Toggle dark mode" title="Toggle dark mode"
            className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-blue-100 hover:bg-white/10 active:scale-95 transition-all">
            {isDark ? <Sun className="h-5 w-5" strokeWidth={2.5} /> : <Moon className="h-5 w-5" strokeWidth={2.5} />}
          </button>
          <div className={`flex flex-shrink-0 items-center gap-2 rounded-xl border-2 border-b-4 px-3 sm:px-4 py-1.5 font-mono text-xl sm:text-2xl font-black tabular-nums ${clockTone}`} role="timer" aria-label="Time left">
            <Clock className="h-5 w-5" strokeWidth={2.75} /> {formatClock(left)}
          </div>
          <button type="button" onClick={() => setDialog('handin')} className={`${goButton} flex flex-shrink-0 items-center gap-2 !px-3.5 sm:!px-5 !py-2.5`}>
            <Send className="h-4 w-4" strokeWidth={3} /> <span className="hidden sm:inline">Hand in</span>
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-7xl gap-4 p-3 sm:p-5 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          {/* The problem */}
          <main className="min-w-0 rounded-[1.75rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-3 border-b-2 border-slate-100 dark:border-slate-800 px-5 sm:px-7 py-3.5">
              <span className={`${NAVY} flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-lg font-black tabular-nums text-white`}>{idx + 1}</span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Problem {idx + 1} of {problems.length}</span>
              <span className="flex-1" />
              <button type="button" onClick={toggleFlag} aria-pressed={flagged}
                className={`flex items-center gap-1.5 rounded-xl border-2 px-3 py-1.5 text-xs font-black uppercase tracking-widest transition-colors
                  ${flagged
                    ? 'border-amber-400 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-amber-300 hover:text-amber-600'}`}>
                <Flag className={`h-4 w-4 ${flagged ? 'fill-amber-400' : ''}`} strokeWidth={2.5} /> {flagged ? 'Flagged' : 'Flag'}
              </button>
            </div>

            <div key={problem.id} className="px-5 sm:px-7 py-5 sm:py-6">
              <Prose text={problem.text} className="font-serif text-[1.15rem] sm:text-[1.3rem] leading-relaxed text-slate-800 dark:text-slate-100" />
              <Figure svg={problem.figure} className="mt-5" />
              <div className="mt-6">
                <Choices choices={problem.choices} pick={blob.picks[problem.id] || null} onPick={(L) => pick(idx, L)} />
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-t-2 border-slate-100 dark:border-slate-800 px-5 sm:px-7 py-3.5">
              <IconButton onClick={() => go(idx - 1)} label="Previous question" className={idx === 0 ? 'pointer-events-none opacity-30' : ''}>
                <ChevronLeft className="h-5 w-5" strokeWidth={3} />
              </IconButton>
              <button type="button" onClick={() => pick(idx, null)} disabled={!blob.picks[problem.id]}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 disabled:pointer-events-none disabled:opacity-30">
                <Eraser className="h-4 w-4" strokeWidth={2.5} /> Erase
              </button>
              <span className="flex-1" />
              {idx === problems.length - 1 ? (
                <button type="button" onClick={() => setDialog('handin')} className={`${goButton} flex items-center gap-2`}>
                  <Send className="h-4 w-4" strokeWidth={3} /> Hand in
                </button>
              ) : (
                <button type="button" onClick={() => go(idx + 1)} className={`${mainButton} flex items-center gap-1.5`}>
                  Next <ChevronRight className="h-4 w-4" strokeWidth={3} />
                </button>
              )}
            </div>
          </main>

          {/* The bubble sheet */}
          <aside className="rounded-[1.75rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm lg:sticky lg:top-0">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Answer sheet</h2>
              <span className="text-[11px] font-bold text-slate-400">tap a number to jump</span>
            </div>
            <AnswerSheet problems={problems} picks={blob.picks} flags={blob.flags} current={idx} onGo={go}
              onPick={(n, L) => { go(n); pick(n, blob.picks[problems[n].id] === L ? null : L); }} />
            <p className="mt-3 text-[11px] font-bold leading-relaxed text-slate-400">
              Keys: <kbd className="font-black">A</kbd>–<kbd className="font-black">E</kbd> answer · <kbd className="font-black">←</kbd> <kbd className="font-black">→</kbd> move · <kbd className="font-black">F</kbd> flag
            </p>
          </aside>
        </div>
      </div>

      {dialog === 'handin' && (
        <Dialog title="Hand in your paper?" actions={<>
          <button type="button" className={quietButton} onClick={() => setDialog(null)}>Keep working</button>
          <button type="button" className={goButton} onClick={() => handIn(false)}>Hand in</button>
        </>}>
          <p>You have answered <strong className="text-slate-900 dark:text-white">{answered} of {problems.length}</strong> questions, with <strong className="text-slate-900 dark:text-white">{formatClock(left)}</strong> left.</p>
          {blanks.length > 0 && (
            <p className="rounded-xl border-2 border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/15 p-3 text-sm text-amber-900 dark:text-amber-100">
              Still blank: <strong>{blanks.join(', ')}</strong>. A wrong answer costs nothing, so a guess can only help.
            </p>
          )}
          <p className="text-sm">You cannot change your answers after you hand in.</p>
        </Dialog>
      )}

      {dialog === 'leave' && (
        <Dialog title="Leave the test?" actions={<>
          <button type="button" className={quietButton} onClick={() => setDialog(null)}>Stay</button>
          <button type="button" className={mainButton} onClick={() => { onProgress?.(0, blob); onQuit?.(); }}>Leave</button>
        </>}>
          <p>Your answers are saved, but <strong className="text-slate-900 dark:text-white">the clock keeps running</strong>. You can come back while there is time left.</p>
          <p className="text-sm">If the time runs out while you are away, the paper is handed in as it is.</p>
        </Dialog>
      )}
    </div>
  );
}
