import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Split, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  ShieldCheck, Ban, Route, ListChecks, Ruler,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeBlockMath, SafeInlineMath } from '../components/notes/SafeMath.jsx';
import NumberLineSVG from '../components/math/NumberLineSVG.jsx';
import { regionsOf, repOf } from '../utils/numberLine';
import {
  solveModulus, workingLatex, questionLatex, linLatex, absLatex, rightLatex, negatedLatex,
  fracLatex, fracText, fnum, isInt,
} from '../utils/modulus';
import { answersEquivalent } from '../utils/mathEquivalence';
import { interval, union, sameSet, NEG_INF, POS_INF } from '../utils/interval';

/* ------------------------------------------------------------------ *
 * CASE SOLVER — a modulus equation or inequality, worked in the four
 * moves the coursebook works it in.
 *
 * Reads a unit's `modulusSolve`:
 *   {
 *     title, intro,
 *     items: [{ id, L: [a, b], R: { abs:[c,d] } | { lin:[c,d] } | { num:k },
 *               rel: '=' | '<' | '<=' | '>' | '>=', display?, note?,
 *               line?: { min, max }, expectNone? }]
 *   }
 *
 * The item stores only the QUESTION. utils/modulus.js derives the rest:
 * which shape it is, the two cases, their solutions, the substitution check
 * of every candidate, and for an inequality the critical values and the
 * regions that satisfy it. So the four stages are:
 *
 *   1. NAME THE SHAPE     — one tap. Which of the chapter's four shapes is
 *                           this, and so what is the first move? A student
 *                           who cannot name the shape cannot start, and it is
 *                           the step the book's method chooser is about.
 *   2. WRITE THE CASES    — two rows, and the only choice is the SIGN of the
 *                           right-hand side in each: one case keeps it, one
 *                           negates it. Negating both, or neither, is the
 *                           mistake this stage exists to catch.
 *   3. SOLVE EACH CASE    — type x for each, or say the x terms cancelled.
 *   4a. CHECK (equation)  — the app evaluates both sides at each candidate;
 *                           the student decides keep or reject. This is where
 *                           an extraneous root dies, in front of the student,
 *                           with the two unequal values on screen.
 *   4b. SHADE (inequality)— the critical values are placed on a number line
 *                           by the app; the student decides which regions
 *                           satisfy the inequality and whether each endpoint
 *                           is in or out. Shape before numbers: a "less than"
 *                           that comes out as two rays is wrong on sight.
 *
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item then pays half, so a stuck student is
 * never truly stuck. On completion the whole working is set in LaTeX under
 * "Copy this into your book" — none of it authored.
 * ------------------------------------------------------------------ */

const INK = '#0e7490';
const INK_DARK = '#155e75';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const AMBER = '#f59e0b';

const T = {
  title: 'Case Solver',
  check: 'Check',
  stuck: 'Show me',
  next: 'Next question',
  finish: 'Finish',
  cont: 'Continue',
  solved: 'solved',
  clean: 'Every move right first time.',
  helped: 'Solved — with a move or two shown to you.',
  bookCopy: 'Copy this into your book',
  stages: { shape: 'Name the shape', cases: 'Write the cases', solve: 'Solve each case', check: 'Check each answer', shade: 'Shade the answer' },
  shapeQ: 'What shape is this question, and so what is the first move?',
  casesQ: 'Two expressions with equal moduli are either equal or opposite. Choose the sign of the right-hand side in each case.',
  boundsQ: 'First find the critical values — where the two sides are exactly EQUAL. Choose the sign of the right-hand side in each case.',
  solveQ: 'Solve each case for x. If the x terms cancel, say so.',
  checkQ: 'Substitute each answer back. The app has worked out both sides — you decide.',
  shadeQ: 'The critical values are on the line. Tap the pieces that satisfy the inequality, and tap a point to fill it in when that value is included.',
  keep: 'Keep',
  reject: 'Reject',
  noSol: 'No solution — the x terms cancel',
  bothPlus: 'Both rows keep the right-hand side, so they are the same equation twice. One case must negate it.',
  bothMinus: 'Both rows negate the right-hand side, which is the same equation twice. Only one case takes the negative.',
  pickBoth: 'Choose a sign for both rows first.',
  fillAll: 'Fill in every box first.',
  chooseAll: 'Decide keep or reject for every answer first.',
  needShade: 'Nothing is shaded yet. Test a value in each piece of the line.',
  wrongFill: 'The pieces are right, but a circle is wrong. Is that exact value a solution? A strict sign leaves it out.',
  wrongShade: 'The wrong pieces are shaded. Pick a value inside each piece and try it in the original inequality.',
  answer: 'Answer',
  noneAnswer: 'No solution',
  allAnswer: 'True for every value of x',
};

/** The four shapes the chapter sets, with the first move each one calls for. */
const EQ_SHAPES = [
  { id: 'abs_abs', name: 'Modulus = modulus', move: 'Split into two cases (or square both sides).' },
  { id: 'abs_num', name: 'Modulus = a positive number', move: 'The inside equals that number, or its negative.' },
  { id: 'abs_lin', name: 'Modulus = an expression in x', move: 'Split into two cases, then CHECK every answer — this shape invents false solutions.' },
  { id: 'abs_neg', name: 'Modulus = a negative number', move: 'No working. A modulus is never negative, so there is no solution.' },
];
const INEQ_SHAPES = [
  { id: 'inside', name: 'Small modulus: |p| < or ≤ a number', move: 'One interval: −k ≤ p ≤ k.' },
  { id: 'outside', name: 'Big modulus: |p| > or ≥ a number', move: 'Two rays: p ≤ −k or p ≥ k.' },
  { id: 'square', name: 'Modulus each side', move: 'Find where they cross, then test each piece (or square both sides).' },
  { id: 'sign', name: 'Modulus against an expression in x', move: 'The other side may be negative: find the crossings, then test each piece.' },
  { id: 'neg', name: 'Modulus against a negative number', move: 'No working — a modulus is never negative.' },
];

/** The shape option an item's derived rule maps to. */
function correctShape(model) {
  if (model.isEquation) return model.shape;
  if (model.shape === 'abs_neg') return 'neg';
  return model.rule;
}

/** The right-hand side of a case as LaTeX, with the sign the student chose. */
function caseRhsLatex(item, sign) {
  const R = item.R;
  if (R.num !== undefined) return sign === '+' ? fracLatex(R.num, { d: false }) : `-${fracLatex(R.num, { d: false })}`;
  const lin = R.abs || R.lin;
  return sign === '+' ? linLatex(lin) : negatedLatex(lin);
}

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function Stage({ icon: Icon, label, active, done }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all
      ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
        : active ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
      style={active && !done ? { backgroundColor: INK } : undefined}>
      {done ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}

const STAGE_ICON = { shape: Route, cases: Split, solve: Pencil, check: ShieldCheck, shade: Ruler };

export default function ModulusSolver({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => {
    const list = (pool?.items || []).filter((it) => it?.L && it?.R && it?.rel);
    return list.map((it, i) => ({ ...it, id: it.id || `ms${i}` }));
  }, [pool]);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [stageIdx, setStageIdx] = useState(0);
  const [helped, setHelped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);
  const [flash, setFlash] = useState(null);
  // per-stage working
  const [shapePick, setShapePick] = useState(null);       // { id, ok }
  const [signs, setSigns] = useState([null, null]);       // '+' | '-' per row
  const [signsOk, setSignsOk] = useState(false);
  const [signWrongs, setSignWrongs] = useState(0);
  const [typed, setTyped] = useState(['', '']);
  const [noSol, setNoSol] = useState([false, false]);
  const [rowState, setRowState] = useState([null, null]); // 'ok' | 'bad' | 'shown'
  const [rowWrongs, setRowWrongs] = useState([0, 0]);
  const [choices, setChoices] = useState({});             // candidate index -> 'keep' | 'reject'
  const [choicesResult, setChoicesResult] = useState(null); // { ok }
  const [points, setPoints] = useState([]);
  const [marks, setMarks] = useState([]);
  const [shadeMsg, setShadeMsg] = useState(null);
  const [shadeWrongs, setShadeWrongs] = useState(0);
  const [shadeLocked, setShadeLocked] = useState(false);
  const firstBox = useRef(null);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return solveModulus(item); } catch { return null; }
  }, [item]);

  const stages = useMemo(() => {
    if (!model) return [];
    if (model.shape === 'abs_neg') return ['shape'];
    return ['shape', 'cases', 'solve', model.isEquation ? 'check' : 'shade'];
  }, [model]);
  const stage = stages[stageIdx];

  const line = { min: item?.line?.min ?? -8, max: item?.line?.max ?? 8 };

  useEffect(() => { if (stage === 'solve') firstBox.current?.focus(); }, [stage]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  const say = (text, kind = 'bad') => {
    setFlash({ text, kind });
    setTimeout(() => setFlash((f) => (f && f.text === text ? null : f)), 3800);
  };

  const summary = (res) => {
    const total = items.length;
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = total ? Math.round((cleared / total) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  /** Move to the next stage, or finish the item. */
  const advance = (nowHelped) => {
    setFlash(null);
    if (stageIdx + 1 < stages.length) {
      // The shade stage opens with the critical values already on the line —
      // the student found them in the stage before; the job now is the SHAPE.
      if (stages[stageIdx + 1] === 'shade') {
        setPoints(model.critical.map((c) => ({
          x: fnum(c), closed: false, fixed: true, label: isInt(c) ? undefined : fracText(c),
        })));
      }
      setStageIdx((s) => s + 1);
      return;
    }
    const nextResults = { ...results, [item.id]: { score: nowHelped ? 0.5 : 1 } };
    setResults(nextResults);
    setItemDone(true);
    const { raw, blob, log } = summary(nextResults);
    onProgress?.(raw, blob, { items: log });
  };

  /* ---------------------------------------------------------- stage 1 */
  const shapes = model.isEquation ? EQ_SHAPES : INEQ_SHAPES;
  const wantShape = correctShape(model);
  const pickShape = (id) => {
    if (shapePick) return;
    const ok = id === wantShape;
    setShapePick({ id, ok });
    if (!ok) setHelped(true);
  };

  /* ---------------------------------------------------------- stage 2 */
  const casesBySign = Object.fromEntries(model.cases.map((c) => [c.sign, c]));
  const rowCase = (r) => casesBySign[signs[r]];
  const checkSigns = () => {
    if (signsOk) return;
    if (signs.some((s) => !s)) { say(T.pickBoth); return; }
    if (signs[0] !== signs[1]) { setSignsOk(true); say('', 'good'); setFlash(null); return; }
    const n = signWrongs + 1;
    setSignWrongs(n);
    say(signs[0] === '+' ? T.bothPlus : T.bothMinus);
    if (n >= 2) { setSigns(['+', '-']); setSignsOk(true); setHelped(true); }
  };
  const showSigns = () => { setSigns(['+', '-']); setSignsOk(true); setHelped(true); setFlash(null); };

  /* ---------------------------------------------------------- stage 3 */
  const rowCorrect = (r) => {
    const c = rowCase(r);
    if (!c) return false;
    if (c.kind !== 'unique') return noSol[r];
    if (noSol[r]) return false;
    return answersEquivalent(String(typed[r] ?? ''), fracLatex(c.sol));
  };
  const revealRow = (r, arr) => {
    const c = rowCase(r);
    if (c.kind === 'unique') { arr.typed[r] = fracText(c.sol).replace('−', '-'); arr.noSol[r] = false; }
    else arr.noSol[r] = true;
    arr.state[r] = 'shown';
  };
  const checkSolve = () => {
    const live = [0, 1].filter((r) => rowState[r] !== 'ok' && rowState[r] !== 'shown');
    if (live.some((r) => !noSol[r] && !String(typed[r] ?? '').trim())) { say(T.fillAll); return; }
    const arr = { typed: [...typed], noSol: [...noSol], state: [...rowState], wrongs: [...rowWrongs] };
    let nowHelped = helped;
    for (const r of live) {
      if (rowCorrect(r)) { arr.state[r] = 'ok'; continue; }
      arr.wrongs[r] += 1;
      if (arr.wrongs[r] >= 2) { revealRow(r, arr); nowHelped = true; } else arr.state[r] = 'bad';
    }
    setTyped(arr.typed); setNoSol(arr.noSol); setRowState(arr.state); setRowWrongs(arr.wrongs);
    if (nowHelped !== helped) setHelped(nowHelped);
    if ([0, 1].every((r) => arr.state[r] === 'ok' || arr.state[r] === 'shown')) advance(nowHelped);
  };
  const showSolve = () => {
    const arr = { typed: [...typed], noSol: [...noSol], state: [...rowState], wrongs: [...rowWrongs] };
    for (const r of [0, 1]) if (arr.state[r] !== 'ok') revealRow(r, arr);
    setTyped(arr.typed); setNoSol(arr.noSol); setRowState(arr.state);
    setHelped(true);
    advance(true);
  };

  /* ---------------------------------------------------------- stage 4a */
  const candidates = model.candidates || [];
  const checkChoices = () => {
    if (choicesResult) return;
    if (candidates.some((_, i) => !choices[i])) { say(T.chooseAll); return; }
    const ok = candidates.every((c, i) => choices[i] === (c.keep ? 'keep' : 'reject'));
    setChoicesResult({ ok });
    if (!ok) {
      setChoices(Object.fromEntries(candidates.map((c, i) => [i, c.keep ? 'keep' : 'reject'])));
      setHelped(true);
    }
  };
  const showChoices = () => {
    setChoices(Object.fromEntries(candidates.map((c, i) => [i, c.keep ? 'keep' : 'reject'])));
    setChoicesResult({ ok: false });
    setHelped(true);
  };

  /* ---------------------------------------------------------- stage 4b */
  const drawnSet = () => {
    const regions = regionsOf(points, marks, line.min, line.max);
    const closedAt = (x) => points.find((p) => p.x === x)?.closed;
    return regions.filter((r) => r.shaded)
      .map((r) => interval(r.lo, r.hi, r.lo === NEG_INF ? true : !closedAt(r.lo), r.hi === POS_INF ? true : !closedAt(r.hi)))
      .reduce((acc, iv) => union(acc, [iv]), []);
  };
  const targetSet = () => (model.set || []).reduce((acc, iv) => union(acc, [iv]), []);
  const tapPoint = (p) => {
    if (shadeLocked) return;
    setShadeMsg(null);
    setPoints((ps) => ps.map((q) => (q.x === p.x ? { ...q, closed: !q.closed } : q)));
  };
  const tapRegion = (r) => {
    if (shadeLocked) return;
    setShadeMsg(null);
    setMarks((ms) => (r.shaded ? ms.filter((m) => !((r.lo === NEG_INF || m > r.lo) && (r.hi === POS_INF || m < r.hi))) : [...ms, r.rep]));
  };
  const revealShade = () => {
    const target = targetSet();
    const endpointIn = (x) => target.some((iv) => (iv.lo === x && !iv.loOpen) || (iv.hi === x && !iv.hiOpen));
    setPoints((ps) => ps.map((p) => ({ ...p, closed: endpointIn(p.x) })));
    const regions = regionsOf(points, [], line.min, line.max);
    setMarks(regions.filter((r) => {
      const mid = r.lo === NEG_INF && r.hi === POS_INF ? 0 : r.lo === NEG_INF ? r.hi - 1 : r.hi === POS_INF ? r.lo + 1 : (r.lo + r.hi) / 2;
      return target.some((iv) => iv.lo < mid && mid < iv.hi);
    }).map((r) => repOf(r.lo, r.hi, line.min, line.max)));
    setShadeLocked(true);
  };
  const checkShade = () => {
    if (shadeLocked) return;
    if (!marks.length) { setShadeMsg({ ok: false, text: T.needShade }); return; }
    const mine = drawnSet();
    const target = targetSet();
    if (sameSet(mine, target)) { setShadeMsg({ ok: true }); setShadeLocked(true); advance(helped); return; }
    const n = shadeWrongs + 1;
    setShadeWrongs(n);
    const samePieces = mine.length === target.length && mine.every((iv, i) => iv.lo === target[i].lo && iv.hi === target[i].hi);
    setShadeMsg({ ok: false, text: samePieces ? T.wrongFill : T.wrongShade });
    if (n >= 2) { revealShade(); setHelped(true); setTimeout(() => advance(true), 900); }
  };
  const showShade = () => { revealShade(); setHelped(true); setShadeMsg({ ok: false, text: `${T.answer}: see the line` }); setTimeout(() => advance(true), 700); };

  /* ---------------------------------------------------------- flow */
  const resetItem = () => {
    setStageIdx(0); setHelped(false); setItemDone(false); setFlash(null);
    setShapePick(null); setSigns([null, null]); setSignsOk(false); setSignWrongs(0);
    setTyped(['', '']); setNoSol([false, false]); setRowState([null, null]); setRowWrongs([0, 0]);
    setChoices({}); setChoicesResult(null);
    setPoints([]); setMarks([]); setShadeMsg(null); setShadeWrongs(0); setShadeLocked(false);
  };
  const goNext = () => { setPos((p) => p + 1); resetItem(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const Ltex = linLatex(item.L);

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 pb-10 flex flex-col gap-3">

        {/* The question, in an indigo strip, with the stage rail under it */}
        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          <div className="px-4 sm:px-5 py-3 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
            <Split className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <div className="text-[11px] font-black uppercase tracking-widest opacity-90">
              {model.isEquation ? 'Solve the equation' : 'Solve the inequality'}
            </div>
            <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.solved}</div>
          </div>
          <div className="px-4 sm:px-6 py-4 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
            <SafeBlockMath math={questionLatex(item)} />
          </div>
          {(item.note || (pos === 0 && pool?.intro)) && (
            <p className="px-4 sm:px-6 pb-3 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
          )}
          <div className="px-3 sm:px-4 pb-3 flex flex-wrap gap-1.5">
            {stages.map((s, i) => (
              <Stage key={s} icon={STAGE_ICON[s]} label={T.stages[s]} active={i === stageIdx && !itemDone} done={i < stageIdx || itemDone} />
            ))}
          </div>
        </div>

        {/* A reserved line for the verdict on the last move */}
        <div className="min-h-[1.5rem] flex items-center">
          {flash?.text && (
            <div className="flex items-center gap-2 font-bold text-sm animate-in fade-in slide-in-from-top-1"
              style={{ color: flash.kind === 'bad' ? RED : GREEN }}>
              {flash.kind === 'bad' ? <XCircle className="w-5 h-5 shrink-0" strokeWidth={2.5} /> : <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
              {flash.text}
            </div>
          )}
        </div>

        {/* ---------------- stage 1: name the shape ---------------- */}
        {!itemDone && stage === 'shape' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.shapeQ}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {shapes.map((s) => {
                const chosen = shapePick?.id === s.id;
                const isRight = s.id === wantShape;
                let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-700 dark:text-slate-200';
                if (shapePick) {
                  if (isRight) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                  else if (chosen) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
                  else style = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                }
                return (
                  <button key={s.id} disabled={!!shapePick} onClick={() => pickShape(s.id)}
                    className={`text-left rounded-xl border-2 border-b-[4px] p-3 transition-all ${style}`}>
                    <div className="font-black text-sm">{s.name}</div>
                    {(shapePick && isRight) || !shapePick ? (
                      <div className={`text-xs font-bold mt-1 ${shapePick ? '' : 'text-slate-500 dark:text-slate-400'}`}>{s.move}</div>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              {shapePick && (
                <button onClick={() => advance(helped)} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
                  {T.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ---------------- stage 2: the cases ---------------- */}
        {!itemDone && stage === 'cases' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{model.isEquation ? T.casesQ : T.boundsQ}</div>
            <div className="flex flex-col gap-3">
              {[0, 1].map((r) => (
                <div key={r} className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 p-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-14">Case {r + 1}</span>
                  <span className="text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={`${Ltex} =`} /></span>
                  {['+', '-'].map((s) => {
                    const on = signs[r] === s;
                    return (
                      <button key={s} disabled={signsOk} onClick={() => { setSigns((v) => { const n = [...v]; n[r] = s; return n; }); setFlash(null); }}
                        className={`px-3 py-2 rounded-xl border-2 border-b-[4px] text-lg transition-all
                          ${on ? (signsOk ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200' : 'text-white border-transparent')
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-cyan-500'}`}
                        style={on && !signsOk ? { backgroundColor: INK } : undefined}>
                        <SafeInlineMath math={caseRhsLatex(item, s)} />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              {!signsOk ? (
                <>
                  <button onClick={showSigns} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                    <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
                  </button>
                  <button onClick={checkSigns} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>
                </>
              ) : (
                <button onClick={() => advance(helped)} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
                  {T.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ---------------- stage 3: solve each case ---------------- */}
        {!itemDone && stage === 'solve' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.solveQ}</div>
            <div className="flex flex-col gap-3">
              {[0, 1].map((r) => {
                const c = rowCase(r);
                const st = rowState[r];
                const locked = st === 'ok' || st === 'shown';
                const ring = st === 'ok' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30'
                  : st === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                    : st === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60';
                return (
                  <div key={r} className={`rounded-xl border-2 p-3 ${ring}`}>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-14">Case {r + 1}</span>
                      <span className="text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={`${Ltex} = ${caseRhsLatex(item, c.sign)}`} /></span>
                      <span className="text-slate-400 font-black">⇒</span>
                      <span className="text-lg text-slate-800 dark:text-slate-100 italic font-serif">x =</span>
                      <input ref={r === 0 ? firstBox : undefined} value={typed[r]} disabled={locked || noSol[r]}
                        onChange={(e) => { setTyped((v) => { const n = [...v]; n[r] = e.target.value; return n; }); if (st === 'bad') setRowState((v) => { const n = [...v]; n[r] = null; return n; }); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') checkSolve(); }}
                        placeholder="?" spellCheck={false} autoComplete="off"
                        className="w-24 px-3 py-2 rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-cyan-500 disabled:opacity-70" />
                      {st === 'ok' && <CheckCircle2 className="w-6 h-6 text-[#58a700]" strokeWidth={3} />}
                      {st === 'shown' && <Lightbulb className="w-6 h-6 text-amber-500" strokeWidth={3} />}
                      {st === 'bad' && <XCircle className="w-6 h-6 text-rose-400" strokeWidth={3} />}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button disabled={locked} onClick={() => { setNoSol((v) => { const n = [...v]; n[r] = !n[r]; return n; }); setRowState((v) => { const n = [...v]; if (n[r] === 'bad') n[r] = null; return n; }); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-[11px] font-black uppercase tracking-widest transition-all disabled:opacity-60
                          ${noSol[r] ? 'bg-slate-700 border-slate-800 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'}`}>
                        <Ban className="w-3.5 h-3.5" strokeWidth={3} /> {T.noSol}
                      </button>
                      <span className="text-[11px] font-bold text-slate-400">Fractions are fine: type 7/3.</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button onClick={showSolve} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
              </button>
              <button onClick={checkSolve} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>
            </div>
          </div>
        )}

        {/* ---------------- stage 4a: check each answer ---------------- */}
        {!itemDone && stage === 'check' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.checkQ}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {candidates.map((c, i) => {
                const pick = choices[i];
                const want = c.keep ? 'keep' : 'reject';
                const decided = !!choicesResult;
                return (
                  <div key={i} className={`rounded-xl border-2 p-3 ${decided ? (pick === want ? 'border-[#58a700] bg-[#d7ffb8]/40 dark:bg-lime-900/20' : 'border-rose-400') : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'}`}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Try x = {fracText(c.x)}</div>
                    <div className="text-slate-800 dark:text-slate-100 text-lg leading-loose">
                      <SafeInlineMath math={`${absLatex(item.L)} = ${fracLatex(c.lhs, { d: false })}`} />
                      <br />
                      <SafeInlineMath math={`${rightLatex(item.R)} = ${fracLatex(c.rhs, { d: false })}`} />
                    </div>
                    <div className="mt-2 flex gap-2">
                      {['keep', 'reject'].map((k) => {
                        const on = pick === k;
                        const good = decided && k === want;
                        return (
                          <button key={k} disabled={decided} onClick={() => setChoices((v) => ({ ...v, [i]: k }))}
                            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-2 border-b-[4px] text-xs font-black uppercase tracking-widest transition-all
                              ${good ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
                                : on ? (k === 'keep' ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : 'bg-slate-700 border-slate-900 text-white')
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                            {k === 'keep' ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : <Ban className="w-4 h-4" strokeWidth={3} />}
                            {k === 'keep' ? T.keep : T.reject}
                          </button>
                        );
                      })}
                    </div>
                    {decided && !c.keep && (
                      <div className="mt-2 text-xs font-bold text-rose-600 dark:text-rose-300">
                        The two sides are not equal — {fracText(c.rhs).startsWith('−') ? 'a modulus can never equal a negative number' : 'this value came from the algebra, not from the equation'}. Reject it.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              {!choicesResult ? (
                <>
                  <button onClick={showChoices} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                    <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
                  </button>
                  <button onClick={checkChoices} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>
                </>
              ) : (
                <button onClick={() => advance(helped)} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
                  {T.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ---------------- stage 4b: shade the number line ---------------- */}
        {!itemDone && stage === 'shade' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-1">{T.shadeQ}</div>
            <div className="text-xs font-bold text-slate-400 mb-3 flex flex-wrap gap-x-5 gap-y-1">
              <span className="flex items-center gap-1.5"><svg width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill="#fff" stroke={INK} strokeWidth="3" /></svg> open — this value is NOT included</span>
              <span className="flex items-center gap-1.5"><svg width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill={INK} stroke={INK} strokeWidth="3" /></svg> closed — this value IS included</span>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-2">
              <NumberLineSVG min={line.min} max={line.max} points={points} marks={marks} onPoint={tapPoint} onRegion={tapRegion} readOnly={shadeLocked} accent={INK} />
            </div>
            {shadeMsg && (
              <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm ${shadeMsg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500]' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300'}`}>
                {shadeMsg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
                {shadeMsg.ok ? 'That is the answer.' : shadeMsg.text}
              </div>
            )}
            {!shadeLocked && (
              <div className="mt-3 flex items-center justify-end gap-2">
                <button onClick={showShade} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
                </button>
                <button onClick={checkShade} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>
              </div>
            )}
          </div>
        )}

        {/* ---------------- done: the working, set for the book ---------------- */}
        {itemDone && (
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
            <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
              {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
              <div className="font-black">{helped ? T.helped : T.clean}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                <Pencil className="w-4 h-4" strokeWidth={3} /> {T.bookCopy}
              </div>
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 text-base sm:text-lg overflow-x-auto">
                {workingLatex(item, model).map((ln, i) => (
                  <div key={i} className="py-0.5"><SafeInlineMath math={ln} /></div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(14,116,144,0.08)' }}>
                <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{T.answer}</div>
                <div className="text-lg sm:text-xl text-slate-900 dark:text-slate-100">
                  {model.isEquation && model.shape === 'abs_neg'
                    ? <span className="font-black">{T.noneAnswer}</span>
                    : !model.isEquation && model.shape === 'abs_neg'
                      ? <span className="font-black">{model.rule === 'all' ? T.allAnswer : T.noneAnswer}</span>
                      : <SafeInlineMath math={model.answerLatex} />}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                  {isLast ? T.finish : T.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
