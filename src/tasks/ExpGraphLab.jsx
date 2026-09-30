import { useState, useMemo } from 'react';
import {
  Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, Target, Crosshair, Minus as MinusIcon,
  Plus as PlusIcon, TrendingUp, TrendingDown, ArrowLeftRight, Undo2, MoveHorizontal, HelpCircle, SlidersHorizontal, ChartSpline,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeBlockMath, SafeInlineMath } from '../components/notes/SafeMath.jsx';
import ExpCurveFigure from '../components/math/ExpCurveFigure.jsx';
import {
  modelOf, judgeYInt, judgeCross, judgeLog, judgeXInt, judgeAsym, judgeShape, sketchWorking,
  judgeSwap, judgeMove, moveInput, judgeDomain, inverseWorking,
  judgeFamily, familyWorking, familyFacts, sliderValues,
  logText, tidyLog, typedOf, sf3,
} from '../utils/expGraphs';
import { frText } from '../utils/lineLab';
import { frEq, fr } from '../utils/linearEquation';

/* ------------------------------------------------------------------ *
 * EXP GRAPH LAB — one screen, three tasks (the registry passes `mode`):
 *
 *   family   "Move the Curve"    A family such as y = eˣ + k is drawn for one
 *                                value of k. PREDICT one fact about another
 *                                value — a crossing, the asymptote, which way
 *                                it goes — and only then does the slider
 *                                unlock, so the curve can be moved to see it.
 *   sketch   "Sketch the Curve"  y = k·e^(nx) + a or y = k·ln(ax + b),
 *                                sketched one decision at a time: each axis
 *                                crossing (asked as "does it cross?" before
 *                                "where?"), the asymptote and the side of it
 *                                the curve lives on, rises or falls — and
 *                                then the curve is drawn.
 *   inverse  "Find the Inverse"  The three labelled steps: write it as
 *                                y = …, swap x and y, rearrange ONE MOVE AT A
 *                                TIME (the student names each move and types
 *                                its number), then state the domain. The
 *                                reveal draws f and its inverse as mirror
 *                                images in y = x.
 *
 * Reads unit.curveFamily / expSketch / fnInverse:
 *   { title, intro, levels?: { 1: 'name', … }, items: [ … ] }
 * Item shapes are at the top of src/utils/expGraphs.js, which derives every
 * answer and every wrong-answer message; nothing here is authored but the
 * question.
 *
 * The same rules as every ADD_MATH engine: one stage at a time, Check and
 * Show me on each, a second wrong answer fills the stage in and the item then
 * pays half, and a finished item prints its working under "Copy this into
 * your book". A two-way choice is decided once: a wrong pick is explained,
 * corrected, and the item pays half.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const AMBER = '#f59e0b';
const SKY = '#0284c7';
const PINK = '#be185d';

const T = {
  check: 'Check',
  stuck: 'Show me',
  cont: 'Continue',
  next: 'Next question',
  finish: 'Finish',
  done: 'done',
  clean: 'Every decision right first time.',
  helped: 'Done — with a step or two shown to you.',
  bookCopy: 'Copy this into your book',
  fill: 'Fill in every box first.',
  pick: 'Choose an answer first.',
  pickAll: 'Choose the kind of line, type its number, and choose the side first.',
  pickMove: 'Choose a move first.',
  fracHint: 'A fraction is typed like 1/2.',
  head: { family: 'Predict, then move the curve', sketch: 'Sketch the curve', inverse: 'Find the inverse function' },
  stages: {
    yint: 'y-intercept', xcross: 'x-axis', ycross: 'y-axis', xint: 'x-intercept', asym: 'Asymptote', shape: 'Shape',
    swap: 'Swap', domain: 'Domain', predict: 'Predict', slide: 'Move it',
  },
};

const STAGE_ICON = {
  yint: Target, xcross: Crosshair, ycross: Crosshair, xint: Target, asym: MinusIcon, shape: TrendingUp,
  swap: ArrowLeftRight, domain: MoveHorizontal, predict: HelpCircle, slide: SlidersHorizontal,
};

/** The six moves a rearrangement is made of. `num` says whether it takes a number. */
const OPS = [
  { id: 'add', name: 'Add', num: true, tail: 'to both sides' },
  { id: 'sub', name: 'Subtract', num: true, tail: 'from both sides' },
  { id: 'mul', name: 'Multiply by', num: true, tail: '' },
  { id: 'div', name: 'Divide by', num: true, tail: '' },
  { id: 'ln', name: 'Take ln of both sides', num: false },
  { id: 'exp', name: 'Write both sides as powers of e', num: false },
];

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

const stageName = (s) => (s.startsWith('move') ? `Move ${Number(s.slice(4)) + 1}` : T.stages[s]);
const stageIcon = (s) => (s.startsWith('move') ? Undo2 : STAGE_ICON[s]);
const approx = (v) => sf3(v).replace('-', '−');

/* ------------------------------------------------------------ small parts */

function StagePill({ icon: Icon, label, active, done }) {
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

/** A box that takes a whole number, a decimal or a fraction such as 3/2. */
function FracBox({ value, onChange, onEnter, state, disabled, label, width = 'w-20', autoFocus = false }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      aria-label={label}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value.replace(/[−–]/g, '-').replace(/[^\d\-/.]/g, ''))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      placeholder="?"
      spellCheck={false}
      autoComplete="off"
      className={`${width} px-1.5 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 disabled:opacity-80 ${RING[state] || IDLE}`}
    />
  );
}

/** One choice among a few: a chip that shows which was right once the stage is answered. */
function Chip({ on, right, wrong, disabled, onClick, children, wide = false, label }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} aria-label={label} aria-pressed={on}
      className={`${wide ? 'w-full text-left' : ''} px-3 py-2 rounded-xl border-2 border-b-[4px] text-sm font-black transition-all
        ${right ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
          : wrong ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300'
            : on ? 'text-white border-transparent'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'}`}
      style={on && !right && !wrong ? { backgroundColor: INK } : undefined}>
      {children}
    </button>
  );
}

function Actions({ locked, onReveal, onCheck, onContinue, canContinue = true }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
      {!locked ? (
        <>
          {onReveal && (
            <button onClick={onReveal} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
            </button>
          )}
          {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>}
        </>
      ) : (
        // Focused as it appears, so the Enter that checked the answer also moves on.
        <button autoFocus disabled={!canContinue} onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn} flex items-center gap-1.5`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

function Heading({ title, sub }) {
  return (
    <>
      <div className="font-black text-slate-800 dark:text-slate-100 leading-snug">{title}</div>
      {sub && <div className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400 leading-snug">{sub}</div>}
    </>
  );
}

/** Lines of working: a KaTeX string, or a sentence with an optional piece of maths after it. */
function Working({ lines }) {
  return lines.map((ln, i) => (
    typeof ln === 'string'
      ? <div key={i} className="py-0.5"><SafeInlineMath math={ln} /></div>
      : <div key={i} className="py-0.5 text-sm sm:text-base font-bold leading-snug">{ln.text}{ln.tex && <> <SafeInlineMath math={ln.tex} /></>}</div>
  ));
}

const Sym = ({ children }) => <span className="font-serif italic text-xl text-slate-800 dark:text-slate-100">{children}</span>;
const Glyph = ({ children }) => <span className="font-mono font-black text-xl text-slate-700 dark:text-slate-200">{children}</span>;

/** A row of the legend under the inverse picture. */
function Key({ color, dashed = false, dotted = false, tex }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-700">
      <svg width="26" height="8" aria-hidden="true"><line x1="1" y1="4" x2="25" y2="4" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '6 4' : dotted ? '2 5' : undefined} /></svg>
      <SafeInlineMath math={tex} />
    </span>
  );
}

/* ------------------------------------------------------------ the task */

export default function ExpGraphLab({ pool, mode = 'sketch', onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id), [pool]);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  // What the task opened with: the X only logs an attempt when something was
  // answered THIS sitting.
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [stageIdx, setStageIdx] = useState(0);
  const [helped, setHelped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);
  const [locked, setLocked] = useState(false);       // this stage is answered; Continue is showing
  const [wrongs, setWrongs] = useState(0);
  const [msg, setMsg] = useState(null);              // { ok, text }
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [picks, setPicks] = useState({});
  const [kNow, setKNow] = useState(null);            // the slider; null = where the item starts

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return modelOf(mode, item); } catch { return null; }
  }, [item, mode]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  const stages = model.stages;
  const stage = stages[stageIdx];
  const moveIdx = stage.startsWith('move') ? Number(stage.slice(4)) : -1;
  const isExp = model.kind === 'exp';

  const setField = (key, value, markKey = key) => {
    setTyped((s) => ({ ...s, [key]: value }));
    setMarks((m) => (m[markKey] === 'bad' ? { ...m, [markKey]: undefined } : m));
    if (msg && !msg.ok) setMsg(null);
  };
  const choose = (key, value, markKey = key) => {
    setPicks((p) => ({ ...p, [key]: value }));
    setMarks((m) => (m[markKey] === 'bad' ? { ...m, [markKey]: undefined } : m));
    if (msg && !msg.ok) setMsg(null);
  };
  const markAll = (obj) => setMarks((m) => ({ ...m, ...obj }));
  const has = (...keys) => keys.every((k) => String(typed[k] ?? '').trim() !== '');

  const summary = (res) => {
    const total = items.length;
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = total ? Math.round((cleared / total) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  /** The stage is answered — right, or shown. Continue appears. */
  const pass = (text = null, ok = true) => {
    setLocked(true);
    setMsg(text ? { ok, text } : null);
  };

  const advance = () => {
    setMsg(null); setLocked(false); setWrongs(0);
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); return; }
    const nextResults = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(nextResults);
    setItemDone(true);
    const { raw, blob, log } = summary(nextResults);
    onProgress?.(raw, blob, { items: log });
  };

  /* ---------------------------------------------------------- what each stage says when it is right */
  const crossing = () => {
    if (isExp) return `x = ${logText(tidyLog(model.xInt))}, which is about ${approx(model.xIntValue)}.`;
    return `y = ${logText(model.yInt)}, which is about ${approx(model.yIntValue)}.`;
  };
  const asymSays = () => `The asymptote is ${model.asym.line} = ${frText(model.asym.value)}, and the curve is ${isExp ? model.side : `to the ${model.side} of`} it.`;
  const logBoxes = (v) => ({ lc: frEq(v.c, fr(1)) ? '' : frEq(v.c, fr(-1)) ? '-' : typedOf(v.c), la: typedOf(v.m) });

  /* ---------------------------------------------------------- answers, filled in */
  const reveal = () => {
    setHelped(true);
    if (stage === 'yint') {
      setTyped((s) => ({ ...s, yint: typedOf(model.yInt) }));
      markAll({ yint: 'shown' });
      pass();
    } else if (stage === 'xcross' || stage === 'ycross') {
      const crosses = isExp ? model.crossesX : model.crossesY;
      if (!picks.crossDone) {
        const res = judgeCross(model, crosses ? 'yes' : 'no');
        setPicks((p) => ({ ...p, cross: res.want, crossDone: true }));
        if (crosses) setMsg({ ok: false, text: res.why }); else pass(res.why, false);
        return;
      }
      setTyped((s) => ({ ...s, ...logBoxes(isExp ? tidyLog(model.xInt) : model.yInt) }));
      markAll({ log: 'shown' });
      pass(crossing(), false);
    } else if (stage === 'xint') {
      setTyped((s) => ({ ...s, xint: typedOf(model.xIntFr) }));
      markAll({ xint: 'shown' });
      pass();
    } else if (stage === 'asym') {
      setPicks((p) => ({ ...p, line: model.asym.line, side: model.side }));
      setTyped((s) => ({ ...s, asym: typedOf(model.asym.value) }));
      markAll({ line: 'shown', asym: 'shown', side: 'shown' });
      pass(asymSays(), false);
    } else if (stage === 'shape') {
      const res = judgeShape(model, model.shape);
      setPicks((p) => ({ ...p, shape: model.shape }));
      pass(res.why, false);
    } else if (stage === 'swap') {
      setPicks((p) => ({ ...p, swap: 'swap' }));
      pass();
    } else if (moveIdx >= 0) {
      const inp = moveInput(model, moveIdx);
      setPicks((p) => ({ ...p, [`op${moveIdx}`]: inp.op }));
      setTyped((s) => ({ ...s, [`num${moveIdx}`]: inp.num }));
      markAll({ [`move${moveIdx}`]: 'shown' });
      pass();
    } else if (stage === 'domain') {
      setPicks((p) => ({ ...p, rel: model.domain.rel }));
      setTyped((s) => ({ ...s, dom: model.domain.value ? typedOf(model.domain.value) : '' }));
      markAll({ dom: 'shown' });
      pass();
    } else if (stage === 'predict') {
      if (model.typed) {
        setTyped((s) => ({ ...s, pred: typedOf(model.want) }));
        markAll({ pred: 'shown' });
        pass();
      } else {
        setPicks((p) => ({ ...p, fam: model.want }));
        pass(judgeFamily(model, model.want).why, false);
      }
    }
  };

  /** A wrong answer: say why; the second one fills the stage in. */
  const miss = (why) => {
    const n = wrongs + 1;
    setWrongs(n);
    if (n >= 2) { reveal(); setMsg({ ok: false, text: `${why} The answer has been filled in for you.` }); return; }
    setMsg({ ok: false, text: why });
  };

  /* ---------------------------------------------------------- two-way choices: decided once */
  const pickCross = (id) => {
    if (locked || picks.crossDone) return;
    const res = judgeCross(model, id);
    setPicks((p) => ({ ...p, cross: res.want, crossPicked: id, crossDone: true }));
    if (!res.ok) setHelped(true);
    if (res.want === 'no') { pass(res.why, res.ok); return; }
    setMsg({ ok: res.ok, text: res.ok ? 'It does cross. Now find exactly where.' : res.why });
  };
  const pickShape = (id) => {
    if (locked) return;
    const res = judgeShape(model, id);
    setPicks((p) => ({ ...p, shape: res.want, shapePicked: id }));
    if (!res.ok) setHelped(true);
    pass(res.why, res.ok);
  };
  const pickFamily = (id) => {
    if (locked) return;
    const res = judgeFamily(model, id);
    setPicks((p) => ({ ...p, fam: res.want, famPicked: id }));
    if (!res.ok) setHelped(true);
    pass(res.why, res.ok);
  };
  const pickSwap = (id) => {
    if (locked) return;
    const res = judgeSwap(model, id);
    if (res.ok) { setPicks((p) => ({ ...p, swap: id })); pass(); return; }
    setPicks((p) => ({ ...p, swapWrong: [...(p.swapWrong || []), id] }));
    miss(res.why);
  };

  /* ---------------------------------------------------------- typed stages */
  const check = () => {
    if (locked) return;
    if (stage === 'yint') {
      if (!has('yint')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeYInt(model, typed.yint);
      markAll({ yint: res.ok ? 'good' : 'bad' });
      if (res.ok) pass(`The curve crosses the y-axis at (0, ${frText(model.yInt)}).`); else miss(res.why);
    } else if (stage === 'xcross' || stage === 'ycross') {
      if (!has('la')) { setMsg({ ok: false, text: 'Type the number inside the ln. Leave the first box empty if nothing multiplies the ln.' }); return; }
      const res = judgeLog(model, typed.lc, typed.la);
      markAll({ log: res.ok ? 'good' : 'bad' });
      if (res.ok) pass(crossing()); else miss(res.why);
    } else if (stage === 'xint') {
      if (!has('xint')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeXInt(model, typed.xint);
      markAll({ xint: res.ok ? 'good' : 'bad' });
      if (res.ok) pass(`The curve crosses the x-axis at (${frText(model.xIntFr)}, 0).`); else miss(res.why);
    } else if (stage === 'asym') {
      if (!picks.line || !picks.side || !has('asym')) { setMsg({ ok: false, text: T.pickAll }); return; }
      const res = judgeAsym(model, { line: picks.line, value: typed.asym, side: picks.side });
      markAll({ line: res.marks.line ? 'good' : 'bad', asym: res.marks.value ? 'good' : 'bad', side: res.marks.side ? 'good' : 'bad' });
      if (res.ok) pass(asymSays()); else miss(res.why);
    } else if (moveIdx >= 0) {
      const op = picks[`op${moveIdx}`];
      if (!op) { setMsg({ ok: false, text: T.pickMove }); return; }
      const res = judgeMove(model, moveIdx, { op, num: typed[`num${moveIdx}`] });
      if (res.blank) { setMsg({ ok: false, text: res.why }); return; }
      if (res.ok) { markAll({ [`move${moveIdx}`]: 'good' }); pass(); return; }
      // A legal move in the wrong order is turned back without counting against the item.
      if (res.nudge) { setMsg({ ok: false, text: res.why }); return; }
      markAll({ [`move${moveIdx}`]: 'bad' });
      miss(res.why);
    } else if (stage === 'domain') {
      if (!picks.rel) { setMsg({ ok: false, text: T.pick }); return; }
      const res = judgeDomain(model, { rel: picks.rel, value: typed.dom });
      if (res.blank) { setMsg({ ok: false, text: res.why }); return; }
      markAll({ dom: res.ok ? 'good' : 'bad' });
      if (res.ok) {
        pass(isExp ? `The range of f is every value ${model.domain.rel === 'gt' ? 'above' : 'below'} ${frText(model.domain.value)}, and that is what the inverse can take.` : 'Every real x: a power of e always exists.');
      } else miss(res.why);
    } else if (stage === 'predict') {
      if (!has('pred')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeFamily(model, typed.pred);
      markAll({ pred: res.ok ? 'good' : 'bad' });
      if (res.ok) pass('Right. Now move the slider and watch it happen.'); else miss(res.why);
    }
  };

  /* ---------------------------------------------------------- flow */
  const resetItem = () => {
    setStageIdx(0); setHelped(false); setItemDone(false); setLocked(false); setWrongs(0); setMsg(null);
    setTyped({}); setMarks({}); setPicks({}); setKNow(null);
  };
  const goNext = () => { setPos((p) => p + 1); resetItem(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelName = item.level !== undefined ? pool?.levels?.[item.level] : null;
  const answered = stageIdx + (locked ? 1 : 0);            // stages whose answer is on the picture
  const working = itemDone
    ? (mode === 'sketch' ? sketchWorking(model) : mode === 'inverse' ? inverseWorking(model) : familyWorking(model))
    : [];

  /* ---------------------------------------------------------- the slider (family) */
  const values = mode === 'family' ? sliderValues(item.family) : [];
  const k = mode === 'family' ? (kNow ?? model.fromK) : null;
  const sliding = mode === 'family' && (stage === 'slide' || itemDone);
  const slideTo = (v) => {
    if (!sliding || !values.includes(v)) return;
    setKNow(v);
    if (v === model.toK) setPicks((p) => (p.reached ? p : { ...p, reached: true }));
  };
  const facts = mode === 'family' ? familyFacts(item.family, k).facts : [];

  /* ---------------------------------------------------------- stage cards */
  const act = (onCheck = check, onReveal = reveal) => <Actions locked={locked} onReveal={onReveal} onCheck={onCheck} onContinue={advance} />;
  const yesNo = (crossPrompt) => (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {[{ id: 'yes', name: 'Yes, it crosses' }, { id: 'no', name: 'No, it never reaches it' }].map((o) => (
        <Chip key={o.id} wide disabled={!!picks.crossDone} label={`${crossPrompt}: ${o.name}`}
          right={picks.crossDone && picks.cross === o.id} wrong={picks.crossDone && picks.crossPicked === o.id && picks.cross !== o.id}
          onClick={() => pickCross(o.id)}>{o.name}</Chip>
      ))}
    </div>
  );
  const logRow = (lead) => (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Sym>{lead}</Sym><Glyph>=</Glyph>
        <FracBox value={typed.lc} onChange={(v) => setField('lc', v, 'log')} onEnter={check} state={marks.log} disabled={locked} label="number in front of ln" width="w-16" autoFocus />
        <span className="font-serif text-xl text-slate-800 dark:text-slate-100">ln</span>
        <FracBox value={typed.la} onChange={(v) => setField('la', v, 'log')} onEnter={check} state={marks.log} disabled={locked} label="number inside the ln" width="w-16" />
      </div>
      <div className="mt-2 text-[11px] font-bold text-slate-400">Leave the first box empty if nothing multiplies the ln. {T.fracHint}</div>
    </>
  );

  let card = null;
  if (!itemDone) {
    if (stage === 'yint') {
      card = (
        <>
          <Heading title="Where does the curve cross the y-axis?" sub="On the y-axis, x = 0." />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Sym>y</Sym><Glyph>=</Glyph>
            <FracBox value={typed.yint} onChange={(v) => setField('yint', v)} onEnter={check} state={marks.yint} disabled={locked} label="y-intercept" autoFocus />
          </div>
          {act()}
        </>
      );
    } else if (stage === 'xcross') {
      card = (
        <>
          <Heading title="Does the curve cross the x-axis?" sub="On the x-axis, y = 0. Can that equation be solved?" />
          {yesNo('Does it cross the x-axis')}
          {picks.crossDone && model.crossesX && (
            <>
              <div className="mt-4 font-black text-slate-800 dark:text-slate-100">Where, exactly? Give x in terms of ln.</div>
              {logRow('x')}
            </>
          )}
          {(locked || (picks.crossDone && model.crossesX)) ? act() : act(null)}
        </>
      );
    } else if (stage === 'ycross') {
      card = (
        <>
          <Heading title="Does the curve cross the y-axis?" sub="On the y-axis, x = 0. Does the function exist there?" />
          {yesNo('Does it cross the y-axis')}
          {picks.crossDone && model.crossesY && (
            <>
              <div className="mt-4 font-black text-slate-800 dark:text-slate-100">Where, exactly? Give y in terms of ln.</div>
              {logRow('y')}
            </>
          )}
          {(locked || (picks.crossDone && model.crossesY)) ? act() : act(null)}
        </>
      );
    } else if (stage === 'xint') {
      card = (
        <>
          <Heading title="Where does the curve cross the x-axis?" sub={`On the x-axis, y = 0. ${T.fracHint}`} />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Sym>x</Sym><Glyph>=</Glyph>
            <FracBox value={typed.xint} onChange={(v) => setField('xint', v)} onEnter={check} state={marks.xint} disabled={locked} label="x-intercept" autoFocus />
          </div>
          {act()}
        </>
      );
    } else if (stage === 'asym') {
      const sides = isExp ? [{ id: 'above', name: 'Above it' }, { id: 'below', name: 'Below it' }] : [{ id: 'left', name: 'To the left of it' }, { id: 'right', name: 'To the right of it' }];
      card = (
        <>
          <Heading title="What is the asymptote, and which side of it is the curve on?"
            sub="The asymptote is the line the curve gets closer and closer to but never reaches." />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="w-16 text-[11px] font-black uppercase tracking-widest text-slate-400">The line</span>
            {['y', 'x'].map((ln) => (
              <Chip key={ln} on={picks.line === ln} disabled={locked} label={`the line ${ln} equals a number`}
                right={locked && model.asym.line === ln && picks.line === ln} wrong={!locked && marks.line === 'bad' && picks.line === ln}
                onClick={() => choose('line', ln)}><span className="font-serif italic text-base">{ln}</span> =</Chip>
            ))}
            <FracBox value={typed.asym} onChange={(v) => setField('asym', v)} onEnter={check} state={marks.asym} disabled={locked} label="the number in the asymptote's equation" />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="w-16 text-[11px] font-black uppercase tracking-widest text-slate-400">The curve</span>
            {sides.map((s) => (
              <Chip key={s.id} on={picks.side === s.id} disabled={locked} right={locked && model.side === s.id}
                wrong={!locked && marks.side === 'bad' && picks.side === s.id} onClick={() => choose('side', s.id)}>{s.name}</Chip>
            ))}
          </div>
          {act()}
        </>
      );
    } else if (stage === 'shape') {
      card = (
        <>
          <Heading title="From left to right, does the curve rise or fall?" sub="Decide before it is drawn." />
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[{ id: 'rises', name: 'It rises', Icon: TrendingUp }, { id: 'falls', name: 'It falls', Icon: TrendingDown }].map(({ id, name, Icon }) => (
              <Chip key={id} wide disabled={locked} right={locked && picks.shape === id} wrong={locked && picks.shapePicked === id && picks.shape !== id} onClick={() => pickShape(id)}>
                <span className="flex items-center gap-2"><Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />{name}</span>
              </Chip>
            ))}
          </div>
          {locked ? act() : act(null)}
        </>
      );
    } else if (stage === 'swap') {
      card = (
        <>
          <Heading title="Step 2: swap x and y. Which line is that?" sub="Step 1 is done for you: the function is written as y = …" />
          <div className="mt-2 text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.startLatex} /></div>
          <div className="mt-3 flex flex-col gap-2">
            {model.options.map((o) => (
              <Chip key={o.id} wide disabled={locked || (picks.swapWrong || []).includes(o.id)} right={locked && o.id === 'swap'}
                wrong={(picks.swapWrong || []).includes(o.id)} onClick={() => pickSwap(o.id)}>
                <span className="text-base font-normal"><SafeInlineMath math={o.tex} /></span>
              </Chip>
            ))}
          </div>
          {act(null)}
        </>
      );
    } else if (moveIdx >= 0) {
      const opKey = `op${moveIdx}`;
      const numKey = `num${moveIdx}`;
      const markKey = `move${moveIdx}`;
      const op = OPS.find((o) => o.id === picks[opKey]);
      const before = moveIdx === 0 ? model.swapped : model.moves[moveIdx - 1].after;
      card = (
        <>
          <Heading title={`Step 3: make y the subject. Move ${moveIdx + 1} of ${model.moves.length}.`} sub="Undo what was done to y, last thing first. Choose one move." />
          <div className="mt-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-800 dark:text-slate-100 overflow-x-auto">
            <div className="text-lg"><SafeInlineMath math={before} /></div>
            {locked && <div className="text-lg mt-1" style={{ color: '#3e7500' }}><SafeInlineMath math={model.moves[moveIdx].after} /></div>}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {OPS.map((o) => (
              <Chip key={o.id} on={picks[opKey] === o.id} disabled={locked} right={locked && picks[opKey] === o.id}
                wrong={!locked && marks[markKey] === 'bad' && picks[opKey] === o.id} onClick={() => choose(opKey, o.id, markKey)}>{o.name}</Chip>
            ))}
          </div>
          {op?.num && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-black text-slate-600 dark:text-slate-300">
              <span>{op.name}</span>
              <FracBox value={typed[numKey]} onChange={(v) => setField(numKey, v, markKey)} onEnter={check} state={marks[markKey]} disabled={locked} label="the number for this move" autoFocus />
              {op.tail && <span>{op.tail}</span>}
              <span className="text-[11px] font-bold text-slate-400">{T.fracHint}</span>
            </div>
          )}
          {act()}
        </>
      );
    } else if (stage === 'domain') {
      const rels = [{ id: 'gt', name: 'x >' }, { id: 'lt', name: 'x <' }, { id: 'all', name: 'All real values of x' }];
      card = (
        <>
          <Heading title="State the domain of the inverse." sub="The domain of the inverse is the range of f: the values that f can actually produce." />
          <div className="mt-2 text-lg text-slate-800 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={`f^{-1}(x) = ${model.inverseTex}`} /></div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {rels.map((r) => (
              <Chip key={r.id} on={picks.rel === r.id} disabled={locked} right={locked && model.domain.rel === r.id}
                wrong={!locked && marks.dom === 'bad' && picks.rel === r.id} onClick={() => choose('rel', r.id, 'dom')}>{r.name}</Chip>
            ))}
            {(picks.rel === 'gt' || picks.rel === 'lt') && (
              <FracBox value={typed.dom} onChange={(v) => setField('dom', v)} onEnter={check} state={marks.dom} disabled={locked} label="the number x is compared with" autoFocus />
            )}
          </div>
          {act()}
        </>
      );
    } else if (stage === 'predict') {
      card = (
        <>
          <Heading
            title={<>The curve on the grid is <SafeInlineMath math={model.fromLatex} />. Now k becomes {frText(fr(model.toK))}: <SafeInlineMath math={model.toLatex} />.</>}
            sub="Decide before you move the slider." />
          <div className="mt-3 font-black text-slate-800 dark:text-slate-100">{model.askText}</div>
          {model.typed ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Sym>{model.box}</Sym><Glyph>=</Glyph>
              <FracBox value={typed.pred} onChange={(v) => setField('pred', v)} onEnter={check} state={marks.pred} disabled={locked} label="your prediction" autoFocus />
              <span className="text-[11px] font-bold text-slate-400">{T.fracHint}</span>
            </div>
          ) : (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {model.choices.map((c) => (
                <Chip key={c.id} wide disabled={locked} right={locked && picks.fam === c.id} wrong={locked && picks.famPicked === c.id && picks.fam !== c.id} onClick={() => pickFamily(c.id)}>{c.name}</Chip>
              ))}
            </div>
          )}
          {act(model.typed ? check : null)}
        </>
      );
    } else if (stage === 'slide') {
      card = (
        <>
          <Heading title={`Now move the slider to k = ${frText(fr(model.toK))} and watch the curve.`}
            sub="The dashed grey curve is where it started. Try the other values of k as well." />
          <div className="mt-3 rounded-xl border-2 p-3 text-sm font-bold text-slate-700 dark:text-slate-200" style={{ borderColor: picks.reached ? GREEN : '#e2e8f0' }}>
            {picks.reached ? model.fam.rule : `The slider is at k = ${frText(fr(k))}.`}
          </div>
          <Actions locked onContinue={advance} canContinue={!!picks.reached} />
        </>
      );
    }
  }

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.head[mode]} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 flex flex-col lg:flex-row gap-3 lg:gap-5 lg:items-start">

        {/* The picture. Pinned from lg, so it stays in view while a long panel scrolls. */}
        <div className="lg:flex-1 min-w-0 lg:sticky lg:top-3 order-2 lg:order-1 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm p-2">
          {/* A family keeps its slider and read-out under the grid in view on a laptop, so its grid is smaller. */}
          <div className={mode === 'sketch' ? 'w-full' : mode === 'family' ? 'w-full max-w-[370px] mx-auto' : 'w-full max-w-[460px] mx-auto'}>
            {mode === 'sketch' && (
              <ExpCurveFigure
                // A new key when the curve appears restarts the sweep that draws it.
                key={`${item.id}-${itemDone || (stage === 'shape' && locked) ? 'drawn' : 'live'}`}
                mode="sketch" model={model}
                showY={itemDone || answered > 0} showX={itemDone || answered > 1} showAsym={itemDone || answered > 2}
                showCurve={itemDone || (stage === 'shape' && locked)} />
            )}
            {mode === 'inverse' && <ExpCurveFigure key={`${item.id}-${itemDone ? 'both' : 'f'}`} mode="inverse" model={model} reveal={itemDone} />}
            {mode === 'family' && <ExpCurveFigure mode="family" family={item.family} k={k} ghostK={model.fromK} />}
          </div>

          {mode === 'inverse' && (
            <div className="px-2 pt-1 pb-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
              <Key color={SKY} tex="y = f(x)" />
              {itemDone && <Key color={SKY} dashed tex={`${model.asymF.line} = ${frText(model.asymF.value).replace('−', '-')}`} />}
              {itemDone && <Key color={PINK} tex="y = f^{-1}(x)" />}
              {itemDone && <Key color={PINK} dashed tex={`${model.asymInv.line} = ${frText(model.asymInv.value).replace('−', '-')}`} />}
              {itemDone && <Key color="#94a3b8" dotted tex="y = x" />}
              {itemDone && <Key color="#d97706" dashed tex={`${model.pairTex[0]} \\leftrightarrow ${model.pairTex[1]}`} />}
            </div>
          )}

          {mode === 'family' && (
            <div className="px-2 pb-2">
              <div className="flex items-center gap-2">
                <button type="button" aria-label="k down one step" disabled={!sliding || values.indexOf(k) <= 0} onClick={() => slideTo(values[values.indexOf(k) - 1])}
                  className="w-10 h-10 shrink-0 rounded-xl border-2 border-b-[4px] border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:border-violet-500 disabled:opacity-40">
                  <MinusIcon className="w-4 h-4" strokeWidth={3} />
                </button>
                <input type="range" aria-label="the value of k" min={0} max={values.length - 1} step={1} value={values.indexOf(k)} disabled={!sliding}
                  onChange={(e) => slideTo(values[Number(e.target.value)])} className="flex-1 min-w-0 accent-violet-600 disabled:opacity-50" />
                <button type="button" aria-label="k up one step" disabled={!sliding || values.indexOf(k) >= values.length - 1} onClick={() => slideTo(values[values.indexOf(k) + 1])}
                  className="w-10 h-10 shrink-0 rounded-xl border-2 border-b-[4px] border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:border-violet-500 disabled:opacity-40">
                  <PlusIcon className="w-4 h-4" strokeWidth={3} />
                </button>
                <span className="w-20 shrink-0 text-right font-mono font-black text-xl tabular-nums" style={{ color: INK }}>k = {frText(fr(k))}</span>
              </div>
              <div className="mt-1 text-center text-[11px] font-black uppercase tracking-widest text-slate-400">
                {sliding ? 'Move the slider' : 'The slider unlocks when you have decided'}
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                {facts.map((f) => (
                  <span key={f.name} className="px-2 py-1 rounded-lg bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm text-slate-700">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-1">{f.name}</span>
                    {f.tex ? <SafeInlineMath math={f.tex} /> : <span className="font-black">{f.text ?? 'none'}</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* The question and the stage */}
        <div className="lg:w-[430px] shrink-0 flex flex-col gap-3 order-1 lg:order-2">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-2" style={{ backgroundColor: INK }}>
              <ChartSpline className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{T.head[mode]}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.done}</div>
            </div>
            <div className="px-4 pt-3 pb-1 text-center text-xl sm:text-2xl text-slate-900 dark:text-slate-100 overflow-x-auto">
              <SafeBlockMath math={model.questionLatex} />
            </div>
            {mode === 'inverse' && (
              <div className="px-4 -mt-2 pb-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
                {model.fDomainTex ? <>for <span className="text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.fDomainTex} /></span></> : 'for all real values of x'}
              </div>
            )}
            {(levelName || item.note || (pos === 0 && pool?.intro)) && (
              <div className="px-4 pb-3 text-center">
                {levelName && <span className="inline-block mb-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: INK_DARK }}>Level {item.level} · {levelName}</span>}
                {(item.note || (pos === 0 && pool?.intro)) && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>}
              </div>
            )}
            <div className="px-3 pb-3 flex flex-wrap gap-1.5">
              {stages.map((s, i) => (
                <StagePill key={s} icon={stageIcon(s)} label={stageName(s)} active={i === stageIdx && !itemDone} done={i < stageIdx || itemDone} />
              ))}
            </div>
          </div>

          {/* The working so far, for a rearrangement: it grows a line with every move. */}
          {mode === 'inverse' && !itemDone && stageIdx > 1 && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-4 py-3 text-slate-700 dark:text-slate-200 overflow-x-auto">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Your working so far</div>
              {/* The line being worked on sits in the card below, so it is not repeated here. */}
              <Working lines={[model.startLatex, model.swapped, ...model.moves.slice(0, moveIdx >= 0 ? moveIdx - 1 : model.moves.length).map((m) => m.after)]} />
            </div>
          )}

          {msg?.text && (
            <div className="flex items-start gap-2 font-bold text-sm animate-in fade-in slide-in-from-top-1" style={{ color: msg.ok ? '#3e7500' : RED }}>
              {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={2.5} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
              <span>{msg.text}</span>
            </div>
          )}

          {!itemDone && card && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4">
              {card}
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? T.helped : T.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {T.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-slate-800 dark:text-slate-100 text-base overflow-x-auto">
                  <Working lines={working} />
                </div>
                {mode === 'inverse' && (
                  <div className="mt-3 rounded-xl border-2 p-3" style={{ borderColor: GREEN, backgroundColor: 'rgba(88,204,2,0.08)' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check it</div>
                    <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={model.check} /></div>
                    <div className="mt-1.5 text-sm font-bold text-slate-600 dark:text-slate-300">On the grid, the two curves are mirror images in the line y = x.</div>
                  </div>
                )}
                {mode === 'sketch' && <div className="mt-3 text-sm font-bold text-slate-500 dark:text-slate-400">Copy the sketch too: both axes, the dashed asymptote with its equation, and each crossing labelled with its exact value.</div>}
                <div className="mt-4 flex justify-end">
                  <button autoFocus onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? T.finish : T.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
