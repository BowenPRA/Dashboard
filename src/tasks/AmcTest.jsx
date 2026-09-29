import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X as XIcon, Clock, Flag, ChevronLeft, ChevronRight, Eraser, Send, Trophy, Timer,
  PencilLine, CalculatorIcon, Ruler, CircleSlash, Check, Minus, ArrowRight, Award, Sun, Moon,
  Lock, Hourglass,
} from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';
import { Prose, Figure, Choices } from '../components/amc/AmcParts';
import {
  LETTERS, TOPICS, TOPIC_LABEL, problemsOf, secondsAllowed, isTestBlob, newPaper,
  scoreTest, itemsOf, markOf, awardFor, formatClock, extraOf, scoreExtra,
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
 *            answers: those belong to the Review task
 *
 * SAT ONCE. There is no second attempt: a paper that has been handed in only
 * ever reopens on its results, and its score is what is saved.
 *
 * THE CLOCK STOPS WHEN THE TEST IS CLOSED. The seconds left are kept in the
 * resume blob (`remaining`) and written with every answer, every quarter of
 * a minute, and on the way out — so leaving the test keeps the time that was
 * on the clock, and coming back carries on from it.
 *
 * EXTRA TIME. When the clock runs out with questions still blank, the answers
 * given so far are LOCKED IN and banked as the score (`timeUp`), and the
 * student may keep going on the blanks with the clock counting up instead.
 * Those answers go in `extra`, are marked on the results screen as "after
 * the time", and never move the score. A paper with nothing blank is simply
 * handed in when the time runs out.
 *
 * Nothing is marked while the test runs. The score is reported only when the
 * paper is handed in, as the number of correct answers out of 25
 * (`nativeMax: 25` in the registry), and `submitted: true` in the blob is
 * what opens the Review. Reads a unit's `amcTest` (item shape in
 * src/data/AMC8/PT_01/test.js; blob shape in src/utils/amcTest.js).
 * ------------------------------------------------------------------ */

const NAVY = 'bg-[#1e3a8a]';

/** What the task opens on, worked out once from the saved blob. */
function openingState(savedData) {
  if (!isTestBlob(savedData)) return { stage: 'cover', blob: null };
  return { stage: savedData.submitted ? 'results' : 'running', blob: savedData };
}

/** Every answer on the sheet: the ones given in the time, then any given after. */
const answersOf = (paper) => ({ ...extraOf(paper), ...(paper?.picks || {}) });

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
function Cover({ test, count, onBegin, onQuit }) {
  const minutes = Math.round(secondsAllowed(test) / 60);
  const rules = [
    <>This is a <strong>{count}-question multiple-choice test</strong>. Each question has five choices, and exactly one of them is correct.</>,
    <>You have <strong>{minutes} minutes</strong>. The clock starts when you press Begin. If you have to leave, your answers and your time are saved, and the clock carries on when you come back.</>,
    <>You sit this test <strong>one time only</strong>. When the time runs out, your answers are <strong>locked in</strong>, and they are your score.</>,
    <>After the time, you can <strong>keep going</strong> on the questions you left blank, with no clock. Those answers are marked separately and do not change your score.</>,
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
// In extra time (`extra` given) a row answered in the time is locked, and an
// answer given since is bubbled in violet.
function AnswerSheet({ problems, picks, extra = null, flags, current, onGo, onPick }) {
  const half = Math.ceil(problems.length / 2);
  const column = (list, offset) => (
    <ol className="space-y-1">
      {list.map((p, i) => {
        const n = offset + i;
        const here = n === current;
        const locked = !!extra && !!picks[p.id];
        return (
          <li key={p.id} className={`flex items-center gap-1 rounded-lg px-1 py-0.5 ${here ? 'bg-blue-100 dark:bg-blue-900/40 ring-2 ring-blue-500' : ''}`}>
            <button type="button" onClick={() => onGo(n)} aria-label={`Go to question ${n + 1}`}
              className={`relative w-7 flex-shrink-0 text-right text-xs font-black tabular-nums ${here ? 'text-blue-800 dark:text-blue-200' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600`}>
              {flags.includes(p.id) && <Flag className="absolute -left-0.5 top-0.5 h-2.5 w-2.5 fill-amber-400 text-amber-500" strokeWidth={2.5} />}
              {n + 1}.
            </button>
            {LETTERS.map((L) => {
              const timed = picks[p.id] === L;
              const late = !timed && extra?.[p.id] === L;
              return (
                <button key={L} type="button" onClick={() => onPick(n, L)} disabled={locked}
                  aria-label={`Question ${n + 1}, choice ${L}${locked ? ', locked' : ''}`} aria-pressed={timed || late}
                  className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border text-[10px] font-black transition-colors
                    ${timed
                      ? 'border-slate-800 bg-slate-800 text-white dark:border-white dark:bg-white dark:text-slate-900'
                      : late
                        ? 'border-violet-600 bg-violet-600 text-white'
                        : locked
                          ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
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
function Results({ test, blob, onDone }) {
  const problems = problemsOf(test);
  const score = scoreTest(test, blob.picks);
  const award = awardFor(test, score.right);
  const allowed = secondsAllowed(test);
  const used = Math.min(allowed, Math.max(0, Math.round(blob.usedSeconds ?? allowed)));
  const missed = score.wrong + score.blank;
  const late = blob.timeUp ? scoreExtra(test, blob) : null;
  const extra = extraOf(blob);
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="overflow-hidden rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <div className={`${NAVY} px-6 py-7 sm:px-10 text-white`}>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-200">
              {test.title} · {blob.timeUp || blob.timedOut ? 'scored when the time ran out' : 'handed in'}
            </p>
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
                  {blob.timeUp && blob.extraSeconds > 0 && <> + {formatClock(blob.extraSeconds)} extra</>}
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

            {late && late.answered > 0 && (
              <div className="mt-7 rounded-2xl border-2 border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-900/15 p-4 sm:p-5">
                <h3 className="flex items-center gap-2 text-base font-black text-violet-900 dark:text-violet-100">
                  <Hourglass className="h-4 w-4" strokeWidth={2.75} /> After the time: {late.right} more correct
                </h3>
                <p className="mt-1 text-sm font-bold leading-relaxed text-violet-800 dark:text-violet-200">
                  You answered {late.answered} of the {late.open} you left blank. With no clock, your score would have been {score.right + late.right}.
                  These do not change your score of {score.right}.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {problems.map((p, i) => {
                    if (blob.picks[p.id] || !extra[p.id]) return null;
                    const right = extra[p.id] === p.correct;
                    const Mark = right ? Check : XIcon;
                    return (
                      <span key={p.id} className={`flex items-center gap-1 rounded-full border-2 px-2.5 py-0.5 text-xs font-black tabular-nums
                        ${right
                          ? 'border-emerald-400 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-300'}`}>
                        {i + 1}. {extra[p.id]} <Mark className="h-3.5 w-3.5" strokeWidth={4} />
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

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
                  ? 'Open Review on the unit card to see the answer and the solution, step by step, for every question.'
                  : 'Open Review on the unit card to compare your methods with the worked solutions.'}
              </p>
            </div>

            <div className="mt-7 flex justify-end">
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

  const [opening] = useState(() => openingState(savedData));
  const [stage, setStage] = useState(opening.stage);
  const [blob, setBlob] = useState(opening.blob);
  const [idx, setIdx] = useState(() => (opening.stage === 'running' ? firstUnanswered(problemsOf(test), answersOf(opening.blob)) : 0));
  const [now, setNow] = useState(() => Date.now());
  // Where the clock runs out in THIS session: now, plus the time that was
  // left when the test was last saved.
  const [endsAt, setEndsAt] = useState(() => (opening.stage === 'running' ? Date.now() + opening.blob.remaining * 1000 : 0));
  // In extra time the clock counts UP from here: now, less the extra time
  // already spent in earlier sessions.
  const [extraFrom, setExtraFrom] = useState(() => (opening.blob?.timeUp ? Date.now() - (opening.blob.extraSeconds || 0) * 1000 : 0));
  const [dialog, setDialog] = useState(null); // 'handin' | 'leave' | 'timeup'
  const [isDark, toggleDark] = useDarkMode();

  // The interval is bound once; it reads the live paper through this ref
  // rather than being re-bound on every answer.
  const live = useRef({ blob, stage, endsAt, extraFrom, handIn: null, lockIn: null, keep: null });

  const secondsLeft = (until = endsAt) => Math.max(0, Math.round((until - Date.now()) / 1000));
  const secondsSince = (from) => Math.max(0, Math.round((Date.now() - from) / 1000));
  const lockedScore = (paper) => scoreTest(test, paper.picks).right;

  /** Save the paper as it stands, with the time now on the clock. */
  const checkpoint = (next, until = endsAt, from = extraFrom) => {
    const stamped = next.timeUp
      ? { ...next, remaining: 0, extraSeconds: secondsSince(from) }
      : { ...next, remaining: secondsLeft(until) };
    setBlob(stamped);
    // Nothing is marked while the clock runs. Once it has run out, the score
    // that was locked in goes with every save.
    onProgress?.(stamped.timeUp ? lockedScore(stamped) : 0, stamped);
    return stamped;
  };

  const handIn = (timedOut = false) => {
    const { blob: paper, stage: at, endsAt: until, extraFrom: from } = live.current;
    if (at !== 'running' || !paper || paper.submitted) return;
    const allowed = secondsAllowed(test);
    let done;
    if (paper.timeUp) {
      done = { ...paper, submitted: true, remaining: 0, extraSeconds: secondsSince(from) };
    } else {
      const remaining = timedOut ? 0 : secondsLeft(until);
      done = { ...paper, submitted: true, remaining, usedSeconds: allowed - remaining, ...(timedOut ? { timedOut: true } : null) };
    }
    live.current = { ...live.current, blob: done, stage: 'results' };
    setBlob(done);
    setStage('results');
    setDialog(null);
    // Banked at once, so closing the tab on the results screen loses nothing.
    onProgress?.(lockedScore(done), done);
  };

  /**
   * The clock has run out. What is answered is locked in and banked as the
   * score, and the questions left blank stay open, untimed. A paper with
   * nothing blank has nothing to keep going on, so it is handed in.
   */
  const lockIn = () => {
    const { blob: paper, stage: at } = live.current;
    if (at !== 'running' || !paper || paper.submitted || paper.timeUp) return;
    if (problems.every((p) => paper.picks[p.id])) { handIn(true); return; }
    const from = Date.now();
    const locked = { ...paper, timeUp: true, remaining: 0, usedSeconds: secondsAllowed(test), extra: {}, extraSeconds: 0 };
    live.current = { ...live.current, blob: locked, extraFrom: from };
    setExtraFrom(from);
    setBlob(locked);
    setIdx(firstUnanswered(problems, locked.picks));
    setDialog('timeup');
    onProgress?.(lockedScore(locked), locked);
  };
  const keep = () => {
    const l = live.current;
    if (l.stage === 'running') checkpoint(l.blob, l.endsAt, l.extraFrom);
  };
  useEffect(() => { live.current = { blob, stage, endsAt, extraFrom, handIn, lockIn, keep }; });

  useEffect(() => {
    if (stage !== 'running') return undefined;
    let ticks = 0;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (!live.current.blob?.timeUp && t >= live.current.endsAt) { live.current.lockIn?.(); return; }
      // Every 15 seconds the time is saved, so a closed tab or a flat battery
      // costs a few seconds of clock and never the paper.
      ticks += 1;
      if (ticks % 60 === 0) live.current.keep?.();
    }, 250);
    return () => clearInterval(id);
  }, [stage]);

  const begin = () => {
    const t = Date.now();
    const until = t + secondsAllowed(test) * 1000;
    setNow(t);
    setEndsAt(until);
    setIdx(0);
    setStage('running');
    checkpoint(newPaper(test, t), until);
  };

  const pick = (n, letter) => {
    const p = problems[n];
    if (!p || stage !== 'running') return;
    if (blob.timeUp) {
      // An answer given in the time is locked in. A blank takes an extra one.
      if (blob.picks[p.id]) return;
      const extra = { ...extraOf(blob) };
      if (letter) extra[p.id] = letter; else delete extra[p.id];
      checkpoint({ ...blob, extra });
      return;
    }
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
      const target = e.key === 'ArrowRight' ? 'amc-next'
        : e.key === 'ArrowLeft' ? 'amc-prev'
          : key === 'F' ? 'amc-flag'
            : LETTERS.includes(key) ? `amc-key-${key}` : null;
      if (!target) return;
      e.preventDefault();
      document.getElementById(target)?.click();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stage, dialog]);

  // ── cover ────────────────────────────────────────────────────────────────
  if (stage === 'cover') {
    return <Cover test={test} count={problems.length} onBegin={begin} onQuit={onQuit} />;
  }

  // ── results ──────────────────────────────────────────────────────────────
  if (stage === 'results') {
    const done = () => {
      // The attempt is logged once; reopening the results later only looks
      // at them.
      if (blob.logged) { onQuit?.(); return; }
      const finished = { ...blob, logged: true };
      onComplete?.(scoreTest(test, finished.picks).right, finished, { items: itemsOf(test, finished.picks) });
    };
    return <Results test={test} blob={blob} onDone={done} />;
  }

  // ── running ──────────────────────────────────────────────────────────────
  const problem = problems[idx];
  const overtime = !!blob.timeUp;
  const extra = extraOf(blob);
  const left = Math.max(0, (endsAt - now) / 1000);
  const overBy = overtime ? Math.max(0, Math.floor((now - extraFrom) / 1000)) : 0;
  const answered = problems.filter((p) => blob.picks[p.id]).length;
  const blanks = problems.map((p, i) => (blob.picks[p.id] ? null : i + 1)).filter(Boolean);
  const extraAnswered = problems.filter((p) => !blob.picks[p.id] && extra[p.id]).length;
  const locked = overtime && !!blob.picks[problem.id];
  const shown = blob.picks[problem.id] || (overtime ? extra[problem.id] : null) || null;
  const flagged = blob.flags.includes(problem.id);
  // In extra time, Back and Next step through the questions still open.
  const stops = overtime ? blanks.map((n) => n - 1) : problems.map((_, i) => i);
  const prev = [...stops].reverse().find((i) => i < idx);
  const next = stops.find((i) => i > idx);
  const handInLabel = overtime ? 'Finish' : 'Hand in';
  const clockTone = overtime
    ? 'bg-violet-600 border-violet-800 text-white'
    : left <= 60
      ? 'bg-rose-600 border-rose-800 text-white animate-pulse'
      : left <= 300
        ? 'bg-amber-400 border-amber-600 text-amber-950'
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100';

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Hidden targets for the keys (A–E, F, the arrows), so a key press goes
          through exactly the same handlers as a click. */}
      <div className="hidden">
        {LETTERS.map((L) => <button key={L} id={`amc-key-${L}`} type="button" tabIndex={-1} onClick={() => pick(idx, L)} />)}
        <button id="amc-flag" type="button" tabIndex={-1} onClick={toggleFlag} />
        <button id="amc-prev" type="button" tabIndex={-1} onClick={() => prev !== undefined && go(prev)} />
        <button id="amc-next" type="button" tabIndex={-1} onClick={() => next !== undefined && go(next)} />
      </div>

      <header className={`${NAVY} flex-shrink-0 text-white shadow-md`}>
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center gap-3 px-3 sm:px-5">
          <button type="button" onClick={() => setDialog('leave')} aria-label="Leave the test" title="Leave the test"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 hover:bg-white/20 active:scale-95 transition-all">
            <XIcon className="h-5 w-5" strokeWidth={3} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base sm:text-lg font-black leading-tight tracking-tight">{test.title}</p>
            <p className="truncate text-[11px] font-black uppercase tracking-widest text-blue-200">
              {overtime
                ? <>Time's up · {answered} locked in · {extraAnswered} of {blanks.length} extra</>
                : <>{answered} of {problems.length} answered</>}
            </p>
          </div>
          <button type="button" onClick={toggleDark} aria-label="Toggle dark mode" title="Toggle dark mode"
            className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-blue-100 hover:bg-white/10 active:scale-95 transition-all">
            {isDark ? <Sun className="h-5 w-5" strokeWidth={2.5} /> : <Moon className="h-5 w-5" strokeWidth={2.5} />}
          </button>
          {overtime ? (
            <div className={`flex flex-shrink-0 items-center gap-2 rounded-xl border-2 border-b-4 px-3 sm:px-4 py-1.5 font-mono text-xl sm:text-2xl font-black tabular-nums ${clockTone}`} role="timer" aria-label="Extra time">
              <Hourglass className="h-5 w-5" strokeWidth={2.75} />
              <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-widest">Extra</span>
              +{formatClock(overBy)}
            </div>
          ) : (
            <div className={`flex flex-shrink-0 items-center gap-2 rounded-xl border-2 border-b-4 px-3 sm:px-4 py-1.5 font-mono text-xl sm:text-2xl font-black tabular-nums ${clockTone}`} role="timer" aria-label="Time left">
              <Clock className="h-5 w-5" strokeWidth={2.75} /> {formatClock(left)}
            </div>
          )}
          <button type="button" onClick={() => setDialog('handin')} className={`${goButton} flex flex-shrink-0 items-center gap-2 !px-3.5 sm:!px-5 !py-2.5`}>
            <Send className="h-4 w-4" strokeWidth={3} /> <span className="hidden sm:inline">{handInLabel}</span>
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

            {overtime && (locked ? (
              <div className="flex items-center gap-2 border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 sm:px-7 py-2.5 text-sm font-bold text-slate-500 dark:text-slate-400">
                <Lock className="h-4 w-4 flex-shrink-0" strokeWidth={2.75} /> Locked in when the time ran out. This answer counts.
              </div>
            ) : (
              <div className="flex items-center gap-2 border-b-2 border-violet-100 dark:border-violet-900/50 bg-violet-50 dark:bg-violet-900/20 px-5 sm:px-7 py-2.5 text-sm font-bold text-violet-800 dark:text-violet-200">
                <Hourglass className="h-4 w-4 flex-shrink-0" strokeWidth={2.75} /> Extra time. Your answer is marked, but it does not change your score.
              </div>
            ))}

            <div key={problem.id} className="px-5 sm:px-7 py-5 sm:py-6">
              <Prose text={problem.text} className="font-serif text-[1.15rem] sm:text-[1.3rem] leading-relaxed text-slate-800 dark:text-slate-100" />
              <Figure svg={problem.figure} className="mt-5" />
              <div className="mt-6">
                <Choices choices={problem.choices} pick={shown} late={overtime && !locked}
                  onPick={locked ? undefined : (L) => pick(idx, L)} />
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-t-2 border-slate-100 dark:border-slate-800 px-5 sm:px-7 py-3.5">
              <IconButton onClick={() => prev !== undefined && go(prev)} label="Previous question" className={prev === undefined ? 'pointer-events-none opacity-30' : ''}>
                <ChevronLeft className="h-5 w-5" strokeWidth={3} />
              </IconButton>
              <button type="button" onClick={() => pick(idx, null)} disabled={locked || !shown}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 disabled:pointer-events-none disabled:opacity-30">
                <Eraser className="h-4 w-4" strokeWidth={2.5} /> Erase
              </button>
              <span className="flex-1" />
              {next === undefined ? (
                <button type="button" onClick={() => setDialog('handin')} className={`${goButton} flex items-center gap-2`}>
                  <Send className="h-4 w-4" strokeWidth={3} /> {handInLabel}
                </button>
              ) : (
                <button type="button" onClick={() => go(next)} className={`${mainButton} flex items-center gap-1.5`}>
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
            <AnswerSheet problems={problems} picks={blob.picks} extra={overtime ? extra : null} flags={blob.flags} current={idx} onGo={go}
              onPick={(n, L) => { go(n); pick(n, answersOf(blob)[problems[n].id] === L ? null : L); }} />
            {overtime && (
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-slate-800 dark:bg-white" /> Locked in</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-violet-600" /> Extra time</span>
              </p>
            )}
            <p className="mt-3 text-[11px] font-bold leading-relaxed text-slate-400">
              Keys: <kbd className="font-black">A</kbd>–<kbd className="font-black">E</kbd> answer · <kbd className="font-black">←</kbd> <kbd className="font-black">→</kbd> move · <kbd className="font-black">F</kbd> flag
            </p>
          </aside>
        </div>
      </div>

      {dialog === 'timeup' && (
        <Dialog title="Time's up" actions={<>
          <button type="button" className={quietButton} onClick={() => handIn()}>Finish now</button>
          <button type="button" className={mainButton} onClick={() => setDialog(null)}>Keep going</button>
        </>}>
          <p>Your answers are <strong className="text-slate-900 dark:text-white">locked in</strong>: {answered} of {problems.length} answered in the time. That is your score, and it is saved.</p>
          <p>You left {blanks.length === 1 ? 'one question' : `${blanks.length} questions`} blank. You can keep going on {blanks.length === 1 ? 'it' : 'them'} now, with no clock.</p>
          <p className="text-sm">Answers you give now are marked separately. They do not change your score.</p>
        </Dialog>
      )}

      {dialog === 'handin' && overtime && (
        <Dialog title="Finish the test?" actions={<>
          <button type="button" className={quietButton} onClick={() => setDialog(null)}>Keep going</button>
          <button type="button" className={goButton} onClick={() => handIn()}>Finish</button>
        </>}>
          <p>Your score is locked in: <strong className="text-slate-900 dark:text-white">{answered} of {problems.length}</strong> answered in the time.</p>
          <p>In extra time you have answered <strong className="text-slate-900 dark:text-white">{extraAnswered} of the {blanks.length}</strong> you left blank.</p>
          <p className="text-sm">When you finish, you see your score, and the Review opens.</p>
        </Dialog>
      )}

      {dialog === 'handin' && !overtime && (
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
          <button type="button" className={mainButton} onClick={() => { checkpoint(blob); onQuit?.(); }}>Save and leave</button>
        </>}>
          {overtime ? <>
            <p>Your score is locked in and saved, and so are your extra-time answers.</p>
            <p className="text-sm">Come back any time to keep going, or to finish and see your score.</p>
          </> : <>
            <p>Your answers are saved, and so is your time: you have <strong className="text-slate-900 dark:text-white">{formatClock(left)}</strong> left.</p>
            <p className="text-sm">The clock stops while you are away and carries on when you come back.</p>
          </>}
        </Dialog>
      )}
    </div>
  );
}
