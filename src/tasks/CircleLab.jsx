import { useState, useMemo, useRef } from 'react';
import {
  Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, Target, Crosshair,
  MousePointerClick, CircleDot, Radius, PenLine, Divide, SquareFunction, Scale, HelpCircle, Axis3d, Ruler,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeBlockMath, SafeInlineMath } from '../components/notes/SafeMath.jsx';
import LinePlane from '../components/math/LinePlane.jsx';
import { latticeFromEvent } from '../components/math/linePlaneGeom.js';
import { SurdBox, NumberBox } from '../components/math/SurdInput.jsx';
import {
  modelOf, gridOf, judgeCentre, judgeCentreTyped, judgeRim, judgeRadius, judgeEquation, judgeSquare, judgeRhs, judgeR2,
  revealPoints, workingLatex, checkLineLatex, radiusText, bracketLatex, legs,
} from '../utils/circle';

/* ------------------------------------------------------------------ *
 * CIRCLE LAB — one screen, three tasks (the registry passes `mode`):
 *
 *   plot    "Plot the Circle"     (x − a)² + (y − b)² = r² is printed. Click
 *                                 the centre on the grid; then click a point
 *                                 ON the circle (a whole-number radius) or
 *                                 type the exact surd radius. Some items ask
 *                                 what the circle does at each axis BEFORE it
 *                                 is drawn.
 *   eq      "Write the Equation"  A centre and a radius, a centre and a point,
 *                                 the two ends of a diameter, or a centre and
 *                                 a tangent axis. Find what is missing, then
 *                                 fill in (x ± ▢)² + (y ± ▢)² = ▢.
 *   square  "Complete the Square" kx² + ky² + Dx + Ey + F = 0 is printed.
 *                                 Divide through, complete the square in x
 *                                 and in y, tidy up the right-hand side, then
 *                                 read off the centre and the radius — or
 *                                 decide that it is not a circle at all.
 *
 * Reads unit.circlePlot / circleEq / circleSquare:
 *   { title, intro, levels?: { 1: 'name', … }, items: [ … ] }
 * Item shapes are at the top of src/utils/circle.js, which derives every
 * answer; nothing here is authored but the question.
 *
 * The same rules as every ADD_MATH engine: one stage at a time, Check and
 * Show me on each, a second wrong answer fills the stage in and the item then
 * pays half, and a finished item prints its working under "Copy this into
 * your book". The finished circle is swept onto the grid with points on it
 * marked — lattice points when it has them, exact surd points when not — and
 * one of them is substituted back into the equation.
 * ------------------------------------------------------------------ */

const INK = '#0e7490';
const INK_DARK = '#155e75';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const AMBER = '#f59e0b';
const SKY = '#1cb0f6';
const PINK = '#be185d';
const UNIT = 24;

const T = {
  check: 'Check',
  stuck: 'Show me',
  cont: 'Continue',
  next: 'Next question',
  finish: 'Finish',
  done: 'done',
  clean: 'Every move right first time.',
  helped: 'Done — with a move or two shown to you.',
  bookCopy: 'Copy this into your book',
  pointsOn: 'Points on the circle',
  checkOne: 'Check one',
  aimHint: 'Move over the grid and click a point.',
  tapAgain: 'Tap the same point again to place it.',
  place: 'Place it',
  fill: 'Fill in every box first.',
  pickAll: 'Choose an answer for both axes first.',
  stages: {
    centre: 'Find the centre', rim: 'Mark the circle', radius: 'Find the radius', axes: 'Check the axes',
    r2: 'Find r²', equation: 'Write the equation', divide: 'Divide through', squareX: 'Square in x',
    squareY: 'Square in y', rhs: 'Tidy up', verdict: 'What is it?',
  },
  head: { plot: 'Plot the circle', eq: 'Write the equation of the circle', square: 'Find the centre and the radius' },
};

const STAGE_ICON = {
  centre: Target, rim: CircleDot, radius: Radius, axes: Axis3d, r2: Ruler, equation: PenLine,
  divide: Divide, squareX: SquareFunction, squareY: SquareFunction, rhs: Scale, verdict: HelpCircle,
};

const AXIS_CHOICES = [
  { id: 'cross', name: 'Crosses it twice' },
  { id: 'touch', name: 'Touches it once' },
  { id: 'miss', name: 'Misses it' },
];

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

const fmt = (n) => (n < 0 ? `−${-n}` : `${n}`);
const pairText = (p) => `(${fmt(p[0])}, ${fmt(p[1])})`;
const typedOf = (f) => (f.d === 1 ? `${Math.abs(f.n)}` : `${Math.abs(f.n)}/${f.d}`);

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

/** A box that takes a whole number or a fraction such as 3/2. */
function FracBox({ value, onChange, onEnter, state, disabled, label, width = 'w-20' }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      aria-label={label}
      onChange={(e) => onChange(e.target.value.replace(/[−–]/g, '-').replace(/[^\d\-/.]/g, ''))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      placeholder="?"
      spellCheck={false}
      autoComplete="off"
      className={`${width} px-1.5 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-cyan-500 disabled:opacity-80 ${RING[state] || IDLE}`}
    />
  );
}

/** The − / + inside a bracket: one tap flips it. */
function SignToggle({ value, onChange, disabled, label }) {
  return (
    <button type="button" disabled={disabled} aria-label={label} onClick={() => onChange(value === '-' ? '+' : '-')}
      className="w-10 h-11 rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono font-black text-xl text-slate-800 dark:text-slate-100 hover:border-cyan-500 disabled:opacity-80">
      {value === '-' ? '−' : '+'}
    </button>
  );
}

const Sym = ({ children }) => <span className="font-serif italic text-xl text-slate-800 dark:text-slate-100">{children}</span>;
const Glyph = ({ children }) => <span className="font-mono font-black text-xl text-slate-700 dark:text-slate-200">{children}</span>;

export default function CircleLab({ pool, mode = 'plot', onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id), [pool]);

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
  const [locked, setLocked] = useState(false);       // this stage is answered; Continue is showing
  const [wrongs, setWrongs] = useState(0);
  const [msg, setMsg] = useState(null);              // { ok, text }
  const [aim, setAim] = useState(null);
  const [armed, setArmed] = useState(false);
  const [misses, setMisses] = useState([]);
  const [centreAt, setCentreAt] = useState(null);    // the centre, once it is on the grid
  const [rimAt, setRimAt] = useState(null);          // the clicked point on the circle
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [signs, setSigns] = useState({ sx: '-', sy: '-', px: '+', py: '+' });
  const [picks, setPicks] = useState({});
  const svgRef = useRef(null);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return modelOf(mode, item); } catch { return null; }
  }, [item, mode]);

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

  const grid = gridOf(item);
  const stages = model.stages;
  const stage = stages[stageIdx];
  const centreNum = [model.centre[0].n / model.centre[0].d, model.centre[1].n / model.centre[1].d];
  const isClick = !itemDone && !locked && ((stage === 'centre' && model.clickCentre) || stage === 'rim');

  const setField = (key, value) => {
    setTyped((s) => ({ ...s, [key]: value }));
    setMarks((m) => (m[key] === 'bad' ? { ...m, [key]: undefined } : m));
    if (msg && !msg.ok) setMsg(null);
  };

  const summary = (res) => {
    const total = items.length;
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = total ? Math.round((cleared / total) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  /** The stage is answered — right, or shown. Continue appears. */
  const pass = (text = null) => {
    setLocked(true);
    setAim(null); setArmed(false);
    setMsg(text ? { ok: true, text } : null);
  };

  const advance = () => {
    setMsg(null); setLocked(false); setWrongs(0); setMisses([]); setAim(null); setArmed(false);
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); return; }
    const nextResults = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(nextResults);
    setItemDone(true);
    const { raw, blob, log } = summary(nextResults);
    onProgress?.(raw, blob, { items: log });
  };

  /* ---------------------------------------------------------- answers, filled in */
  const reveal = () => {
    setHelped(true);
    if (stage === 'centre') {
      if (model.clickCentre) setCentreAt(centreNum);
      else {
        setTyped((s) => ({ ...s, cx: `${model.centre[0].n < 0 ? '-' : ''}${typedOf(model.centre[0])}`, cy: `${model.centre[1].n < 0 ? '-' : ''}${typedOf(model.centre[1])}` }));
        setMarks((m) => ({ ...m, cx: 'shown', cy: 'shown' }));
      }
      pass();
    } else if (stage === 'rim') {
      setRimAt([centreNum[0] + model.root.out, centreNum[1]]);
      pass();
    } else if (stage === 'radius') {
      setTyped((s) => ({ ...s, rk: model.root.out === 1 && model.root.inside !== 1 ? '' : `${model.root.out}`, rr: model.root.inside === 1 ? '' : `${model.root.inside}` }));
      setMarks((m) => ({ ...m, radius: 'shown' }));
      pass();
    } else if (stage === 'axes') {
      setPicks((p) => ({ ...p, x: model.axes.x.kind, y: model.axes.y.kind, axesShown: true }));
      pass();
    } else if (stage === 'r2') {
      setTyped((s) => ({ ...s, r2: `${model.r2}` }));
      setMarks((m) => ({ ...m, r2: 'shown' }));
      pass();
    } else if (stage === 'equation') {
      setSigns((s) => ({ ...s, sx: model.centre[0].n < 0 ? '+' : '-', sy: model.centre[1].n < 0 ? '+' : '-' }));
      setTyped((s) => ({ ...s, mx: typedOf(model.centre[0]), my: typedOf(model.centre[1]), rhs: `${model.r2}` }));
      setMarks((m) => ({ ...m, mx: 'shown', my: 'shown', rhs: 'shown' }));
      pass();
    } else if (stage === 'divide') {
      setTyped((s) => ({ ...s, div: `${model.k}` }));
      setMarks((m) => ({ ...m, div: 'shown' }));
      pass();
    } else if (stage === 'squareX' || stage === 'squareY') {
      const ax = stage === 'squareX' ? 'x' : 'y';
      const h = ax === 'x' ? model.p : model.q;
      const h2 = ax === 'x' ? model.p2 : model.q2;
      setSigns((s) => ({ ...s, [`p${ax}`]: h.n < 0 ? '-' : '+' }));
      setTyped((s) => ({ ...s, [`pm${ax}`]: typedOf(h), [`pq${ax}`]: typedOf(h2) }));
      setMarks((m) => ({ ...m, [`pm${ax}`]: 'shown', [`pq${ax}`]: 'shown' }));
      pass();
    } else if (stage === 'rhs') {
      setTyped((s) => ({ ...s, rhsq: `${model.r2f.n < 0 ? '-' : ''}${typedOf(model.r2f)}` }));
      setMarks((m) => ({ ...m, rhsq: 'shown' }));
      pass();
    } else if (stage === 'verdict') {
      setPicks((p) => ({ ...p, verdict: model.r2 < 0 ? 'none' : 'point', verdictShown: true }));
      pass();
    }
  };

  /** A wrong answer: say why; the second one fills the stage in. */
  const miss = (why) => {
    const n = wrongs + 1;
    setWrongs(n);
    if (n >= 2) { reveal(); setMsg({ ok: false, text: `${why} The answer has been filled in for you.` }); return; }
    setMsg({ ok: false, text: why });
  };

  /* ---------------------------------------------------------- click stages */
  const place = (p) => {
    if (stage === 'centre') {
      const res = judgeCentre(model, p);
      if (res.ok) { setCentreAt(p); pass(`Centre ${pairText(p)}.`); return; }
      setMisses((m) => [...m, p]);
      miss(res.why);
      return;
    }
    const res = judgeRim(model, p);
    if (res.ok) { setRimAt(p); pass(`${pairText(p)} is ${radiusText(model.r2)} from the centre, so it is on the circle.`); return; }
    setMisses((m) => [...m, p]);
    miss(res.why);
  };

  const onPointerMove = (e) => {
    if (!isClick) return;
    if (e.pointerType === 'touch' && !armed) return;
    const p = latticeFromEvent(e, svgRef.current, grid, UNIT);
    if (p) setAim(p);
  };
  const onPointerUp = (e) => {
    if (!isClick) return;
    const p = latticeFromEvent(e, svgRef.current, grid, UNIT);
    if (!p) return;
    if (e.pointerType === 'touch') {
      if (armed && aim && aim[0] === p[0] && aim[1] === p[1]) { setArmed(false); setAim(null); place(p); } else { setAim(p); setArmed(true); }
      return;
    }
    setAim(p);
    place(p);
  };
  const onKeyDown = (e) => {
    if (!isClick) return;
    const nudge = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
    const clamp = (x, y) => [Math.max(grid.xMin, Math.min(grid.xMax, x)), Math.max(grid.yMin, Math.min(grid.yMax, y))];
    if (nudge) {
      e.preventDefault();
      setAim(aim ? clamp(aim[0] + nudge[0], aim[1] + nudge[1]) : clamp(0, 0));
      setArmed(false);
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && aim) {
      e.preventDefault();
      const p = aim;
      setArmed(false); setAim(null);
      place(p);
    }
  };

  /* ---------------------------------------------------------- typed stages */
  const has = (...keys) => keys.every((k) => String(typed[k] ?? '').trim() !== '');
  const markAll = (obj) => setMarks((m) => ({ ...m, ...obj }));

  const check = () => {
    if (locked) return;
    if (stage === 'centre') {
      if (!has('cx', 'cy')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeCentreTyped(model, typed.cx, typed.cy);
      markAll({ cx: res.marks.x ? 'good' : 'bad', cy: res.marks.y ? 'good' : 'bad' });
      if (res.ok) pass(); else miss(res.why);
    } else if (stage === 'radius') {
      if (!has('rk') && !has('rr')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeRadius(model, typed.rk, typed.rr);
      if (res.ok) { markAll({ radius: 'good' }); pass(); return; }
      markAll({ radius: 'bad' });
      // The right length written as an unsimplified surd is a nudge, not a miss.
      if (res.simplify) { setMsg({ ok: false, text: res.why }); return; }
      miss(res.why);
    } else if (stage === 'axes') {
      if (!picks.x || !picks.y) { setMsg({ ok: false, text: T.pickAll }); return; }
      const okX = picks.x === model.axes.x.kind;
      const okY = picks.y === model.axes.y.kind;
      if (okX && okY) { pass(); return; }
      const ax = okX ? 'y' : 'x';
      const away = Math.abs(ax === 'x' ? centreNum[1] : centreNum[0]);
      miss(`Look at the ${ax}-axis again. The centre is ${away} from that axis and the radius is ${radiusText(model.r2)}. Further away than the radius, it misses; exactly the radius, it touches; nearer, it crosses twice.`);
    } else if (stage === 'r2') {
      if (!has('r2')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeR2(model, typed.r2);
      markAll({ r2: res.ok ? 'good' : 'bad' });
      if (res.ok) pass(); else miss(res.why);
    } else if (stage === 'equation') {
      if (!has('mx', 'my', 'rhs')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeEquation(model, { sx: signs.sx, mx: typed.mx, sy: signs.sy, my: typed.my, rhs: typed.rhs });
      markAll({ mx: res.marks.x ? 'good' : 'bad', my: res.marks.y ? 'good' : 'bad', rhs: res.marks.rhs ? 'good' : 'bad' });
      if (res.ok) pass(); else miss(res.why);
    } else if (stage === 'divide') {
      if (!has('div')) { setMsg({ ok: false, text: T.fill }); return; }
      const ok = Number(typed.div) === model.k;
      markAll({ div: ok ? 'good' : 'bad' });
      if (ok) pass(); else miss('Divide by the number in front of x² and y², so that each has a coefficient of 1.');
    } else if (stage === 'squareX' || stage === 'squareY') {
      const ax = stage === 'squareX' ? 'x' : 'y';
      if (!has(`pm${ax}`, `pq${ax}`)) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeSquare(model, ax, signs[`p${ax}`], typed[`pm${ax}`], typed[`pq${ax}`]);
      markAll({ [`pm${ax}`]: res.marks.p ? 'good' : 'bad', [`pq${ax}`]: res.marks.q ? 'good' : 'bad' });
      if (res.ok) pass(); else miss(res.why);
    } else if (stage === 'rhs') {
      if (!has('rhsq')) { setMsg({ ok: false, text: T.fill }); return; }
      const res = judgeRhs(model, typed.rhsq);
      markAll({ rhsq: res.ok ? 'good' : 'bad' });
      if (res.ok) pass(); else miss(res.why);
    }
  };

  const pickVerdict = (id) => {
    if (locked) return;
    const want = model.r2 < 0 ? 'none' : 'point';
    setPicks((p) => ({ ...p, verdict: id }));
    if (id === want) { pass(); return; }
    setHelped(true);
    setPicks((p) => ({ ...p, verdict: want, verdictShown: true, verdictWrong: id }));
    pass();
    setMsg({ ok: false, text: model.r2 < 0
      ? 'A square is never negative, so two squares cannot add up to a negative number. No point satisfies the equation.'
      : 'Two squares add up to 0 only when both are 0. That is one single point, not a circle.' });
  };

  /* ---------------------------------------------------------- flow */
  const resetItem = () => {
    setStageIdx(0); setHelped(false); setItemDone(false); setLocked(false); setWrongs(0); setMsg(null);
    setAim(null); setArmed(false); setMisses([]); setCentreAt(null); setRimAt(null);
    setTyped({}); setMarks({}); setSigns({ sx: '-', sy: '-', px: '+', py: '+' }); setPicks({});
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
  const levelName = item.level !== undefined ? pool?.levels?.[item.level] : null;
  const showCircle = itemDone && model.isCircle;
  const showCentre = !!centreAt || (itemDone && model.isCircle) || (model.mode === 'eq' && model.kind !== 'diameter');

  /* ---------------------------------------------------------- the picture */
  const drawnPoints = [];
  const segments = [];
  const circles = [];
  const given = model.given || [];
  for (const g of given) {
    // A diameter item's A and B are always shown; its centre arrives when found.
    if (g.name === 'C') continue;
    drawnPoints.push({ at: g.at, color: PINK, name: g.name, flag: pairText(g.at) });
  }
  if (model.mode === 'eq' && model.kind === 'diameter') segments.push({ from: given[0].at, to: given[1].at, color: '#94a3b8', width: 2.5 });
  if (showCentre && model.isCircle) drawnPoints.push({ at: centreNum, color: INK, name: 'C', flag: model.clickCentre ? pairText(centreNum) : undefined });
  if (rimAt && !itemDone) {
    drawnPoints.push({ at: rimAt, color: GREEN, flag: pairText(rimAt) });
    segments.push({ from: centreNum, to: rimAt, color: GREEN, label: `r = ${radiusText(model.r2)}` });
  }
  // The right-angled triangle from the centre to a known point: the two
  // differences are the legs, and r is the hypotenuse.
  const triPoint = model.mode === 'eq' && (stage === 'r2' || (stage === 'equation' && model.kind !== 'radius' && model.kind !== 'touch')) && !itemDone
    ? (model.kind === 'through' ? item.point : model.kind === 'diameter' ? item.A : null) : null;
  if (triPoint && showCentre) {
    const { dx, dy } = legs(model.centre, triPoint);
    const P = [Number(triPoint[0]), Number(triPoint[1])];
    const corner = [P[0], centreNum[1]];
    if (dx.n !== 0 && dy.n !== 0) {
      segments.push({ from: centreNum, to: corner, color: AMBER, dashed: true, label: `${Math.abs(dx.n / dx.d)}`, labelSide: 'after' });
      segments.push({ from: corner, to: P, color: AMBER, dashed: true, label: `${Math.abs(dy.n / dy.d)}` });
    }
    segments.push({ from: centreNum, to: P, color: INK, label: 'r' });
  }
  if (model.mode === 'eq' && model.kind === 'touch' && !itemDone) {
    const foot = item.axis === 'x' ? [centreNum[0], 0] : [0, centreNum[1]];
    segments.push({ from: centreNum, to: foot, color: AMBER, dashed: true, label: locked || stage === 'equation' ? `r = ${radiusText(model.r2)}` : 'r' });
  }
  let shown = [];
  if (showCircle) {
    circles.push({ centre: centreNum, r: model.r, color: INK, draw: true, fill: true });
    shown = revealPoints(model.centre, model.r2);
    const axisPts = item.axes ? [...model.axes.x.points, ...model.axes.y.points] : [];
    const near = (a, b) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;
    for (const p of shown) {
      const onAxis = axisPts.some((q) => near(q.at, p.at));
      // On an axes item the axis points carry the labels; seven flags round a
      // small circle sit on top of each other, and the panel lists the rest.
      drawnPoints.push({ at: p.at, color: GREEN, r: 6, flag: p.flag && !onAxis && !item.axes ? p.text : undefined });
    }
    for (const q of axisPts) drawnPoints.push({ at: q.at, color: AMBER, r: 6, flag: q.text });
    // The radius is drawn to a slanted point when the circle has one, so its
    // label stays clear of the axis numbers; one that must lie along an axis
    // is labelled above the line.
    const spoke = shown.find((p) => p.flag && Math.abs(p.at[0] - centreNum[0]) > 1e-9 && Math.abs(p.at[1] - centreNum[1]) > 1e-9)
      || shown.find((p) => Math.abs(p.at[1] - centreNum[1]) < 1e-9 && p.at[0] > centreNum[0]) || shown[0];
    if (spoke) segments.push({ from: centreNum, to: spoke.at, color: GREEN, label: `r = ${radiusText(model.r2)}`, labelSide: 'before' });
  }

  /* ---------------------------------------------------------- stage cards */
  const actions = (onCheck = check) => (
    <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
      {!locked ? (
        <>
          <button onClick={reveal} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
            <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
          </button>
          {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>}
        </>
      ) : (
        // Focused as it appears, so the Enter that checked the answer also moves on.
        <button autoFocus onClick={advance} className={`px-5 py-3 text-white text-xs ${btn} flex items-center gap-1.5`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </button>
      )}
    </div>
  );

  const clickPanel = (
    <>
      {!locked && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 px-3 py-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <MousePointerClick className="w-4 h-4 shrink-0" strokeWidth={2.5} />{armed ? T.tapAgain : T.aimHint}
          </span>
          <span className="font-mono font-black text-lg tabular-nums shrink-0" style={aim ? { color: SKY } : undefined}>
            {aim ? pairText(aim) : <span className="text-slate-300 dark:text-slate-600">(–, –)</span>}
          </span>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        {armed && aim && !locked && (
          <button onClick={() => { const p = aim; setArmed(false); setAim(null); place(p); }}
            className={`px-4 py-3 text-xs text-white bg-[#1CB0F6] border-[#1899D6] ${btn} flex items-center gap-2`}>
            <Crosshair className="w-4 h-4" strokeWidth={3} />{T.place}
          </button>
        )}
        {!locked ? (
          <button onClick={reveal} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
            <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
          </button>
        ) : (
          <button autoFocus onClick={advance} className={`px-5 py-3 text-white text-xs ${btn} flex items-center gap-1.5`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
            {T.cont} <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </button>
        )}
      </div>
    </>
  );

  const heading = (title, sub) => (
    <>
      <div className="font-black text-slate-800 dark:text-slate-100 leading-snug">{title}</div>
      {sub && <div className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400 leading-snug">{sub}</div>}
    </>
  );

  const sqLeft = (v, coefF) => {
    const mag = Math.abs(coefF.n);
    return `${v}^2 ${coefF.n < 0 ? '-' : '+'} ${mag === 1 ? '' : mag}${v} =`;
  };

  let card = null;
  if (!itemDone) {
    if (stage === 'centre' && model.clickCentre) {
      card = (
        <>
          {heading(
            model.kind === 'diameter' ? 'The centre is the midpoint of AB. Click it on the grid.'
              : model.mode === 'square' ? 'Read the centre off your completed square form, and click it on the grid.'
                : 'Click the centre of the circle on the grid.',
            model.kind === 'diameter' ? 'Halfway between the x-coordinates, halfway between the y-coordinates.'
              : 'Each bracket is zero at the centre.',
          )}
          {model.mode === 'square' && <div className="mt-2 text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.answerLatex} /></div>}
          {clickPanel}
        </>
      );
    } else if (stage === 'centre') {
      card = (
        <>
          {heading('Type the coordinates of the centre.', 'Each bracket is zero at the centre. A fraction is typed like 1/2.')}
          <div className="mt-2 text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.answerLatex} /></div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Glyph>(</Glyph>
            <FracBox value={typed.cx} onChange={(v) => setField('cx', v)} onEnter={check} state={marks.cx} disabled={locked} label="x-coordinate of the centre" />
            <Glyph>,</Glyph>
            <FracBox value={typed.cy} onChange={(v) => setField('cy', v)} onEnter={check} state={marks.cy} disabled={locked} label="y-coordinate of the centre" />
            <Glyph>)</Glyph>
          </div>
          {actions()}
        </>
      );
    } else if (stage === 'rim') {
      card = (
        <>
          {heading('Now click any point ON the circle.', 'A point on the circle is exactly one radius from the centre. Straight across or straight up is easiest.')}
          {clickPanel}
        </>
      );
    } else if (stage === 'radius') {
      card = (
        <>
          {heading(
            model.kind === 'touch' ? `The circle touches the ${item.axis}-axis. How far is the centre from that axis? That distance is the radius.`
              : model.mode === 'plot' ? 'No whole number squares to give the right-hand side. Type the exact radius, in simplest form.'
                : 'Type the radius, in simplest form.',
            'A number in front, and a number under the root. Leave the root box empty if there is no root.',
          )}
          {model.mode === 'square' && <div className="mt-2 text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.answerLatex} /></div>}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xl text-slate-800 dark:text-slate-100"><SafeInlineMath math="r =" /></span>
            <SurdBox coef={typed.rk} rad={typed.rr} onCoef={(v) => setField('rk', v)} onRad={(v) => setField('rr', v)}
              onEnter={check} state={marks.radius} disabled={locked} label="radius" />
          </div>
          {actions()}
        </>
      );
    } else if (stage === 'axes') {
      card = (
        <>
          {heading('Before the circle is drawn: what will it do at each axis?', 'Compare the radius with how far the centre is from the axis.')}
          <div className="mt-3 flex flex-col gap-2">
            {['x', 'y'].map((ax) => (
              <div key={ax} className="flex flex-wrap items-center gap-2">
                <span className="w-16 text-[11px] font-black uppercase tracking-widest text-slate-400">{ax}-axis</span>
                {AXIS_CHOICES.map((c) => {
                  const on = picks[ax] === c.id;
                  const right = locked && c.id === model.axes[ax].kind;
                  return (
                    <button key={c.id} disabled={locked} onClick={() => { setPicks((p) => ({ ...p, [ax]: c.id })); if (msg && !msg.ok) setMsg(null); }}
                      className={`px-3 py-2 rounded-xl border-2 border-b-[4px] text-xs font-black transition-all
                        ${right ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
                          : on ? 'text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-cyan-500'}`}
                      style={on && !right ? { backgroundColor: INK } : undefined}>
                      {c.name}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          {actions()}
        </>
      );
    } else if (stage === 'r2') {
      card = (
        <>
          {heading(
            model.kind === 'diameter' ? 'Find r²: the distance from the centre to either end of the diameter, squared.'
              : 'Find r²: the distance from the centre to the point, squared.',
            'The dashed triangle shows the two differences. r² = (difference in x)² + (difference in y)².',
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xl text-slate-800 dark:text-slate-100"><SafeInlineMath math="r^2 =" /></span>
            <NumberBox value={typed.r2} onChange={(v) => setField('r2', v)} onEnter={check} state={marks.r2} disabled={locked} label="r squared" width="w-24" allowMinus={false} />
          </div>
          {actions()}
        </>
      );
    } else if (stage === 'equation') {
      card = (
        <>
          {heading('Fill in the equation of the circle.', 'Tap a sign to flip it. If a bracket is just x² or y², type 0. A fraction is typed like 3/2.')}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Glyph>(</Glyph><Sym>x</Sym>
            <SignToggle value={signs.sx} onChange={(v) => { setSigns((s) => ({ ...s, sx: v })); setMarks((m) => ({ ...m, mx: undefined })); }} disabled={locked} label="sign in the x bracket" />
            <FracBox value={typed.mx} onChange={(v) => setField('mx', v)} onEnter={check} state={marks.mx} disabled={locked} label="number in the x bracket" width="w-16" />
            <Glyph>)²</Glyph><Glyph>+</Glyph>
            <Glyph>(</Glyph><Sym>y</Sym>
            <SignToggle value={signs.sy} onChange={(v) => { setSigns((s) => ({ ...s, sy: v })); setMarks((m) => ({ ...m, my: undefined })); }} disabled={locked} label="sign in the y bracket" />
            <FracBox value={typed.my} onChange={(v) => setField('my', v)} onEnter={check} state={marks.my} disabled={locked} label="number in the y bracket" width="w-16" />
            <Glyph>)²</Glyph><Glyph>=</Glyph>
            <FracBox value={typed.rhs} onChange={(v) => setField('rhs', v)} onEnter={check} state={marks.rhs} disabled={locked} label="right-hand side" width="w-20" />
          </div>
          {actions()}
        </>
      );
    } else if (stage === 'divide') {
      card = (
        <>
          {heading('x² and y² must each have a coefficient of 1 before you complete the square.', 'What do you divide every term by?')}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-black text-slate-500 dark:text-slate-400">Divide by</span>
            <NumberBox value={typed.div} onChange={(v) => setField('div', v)} onEnter={check} state={marks.div} disabled={locked} label="divide by" allowMinus={false} />
          </div>
          {locked && <div className="mt-3 text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.dividedLatex} /></div>}
          {actions()}
        </>
      );
    } else if (stage === 'squareX' || stage === 'squareY') {
      const ax = stage === 'squareX' ? 'x' : 'y';
      const coefF = ax === 'x' ? model.d : model.e;
      card = (
        <>
          {heading(`Complete the square for the ${ax} terms.`, 'Halve the coefficient for the bracket, then take away the square of that half. Tap the sign to flip it.')}
          {(model.k !== 1 || model.rhs !== 0) && (
            <div className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">Working with <span className="text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.dividedLatex} /></span></div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xl text-slate-800 dark:text-slate-100"><SafeInlineMath math={sqLeft(ax, coefF)} /></span>
            <Glyph>(</Glyph><Sym>{ax}</Sym>
            <SignToggle value={signs[`p${ax}`]} onChange={(v) => { setSigns((s) => ({ ...s, [`p${ax}`]: v })); setMarks((m) => ({ ...m, [`pm${ax}`]: undefined })); }} disabled={locked} label={`sign in the ${ax} bracket`} />
            <FracBox value={typed[`pm${ax}`]} onChange={(v) => setField(`pm${ax}`, v)} onEnter={check} state={marks[`pm${ax}`]} disabled={locked} label={`number in the ${ax} bracket`} width="w-16" />
            <Glyph>)²</Glyph><Glyph>−</Glyph>
            <FracBox value={typed[`pq${ax}`]} onChange={(v) => setField(`pq${ax}`, v)} onEnter={check} state={marks[`pq${ax}`]} disabled={locked} label="the square taken away" width="w-16" />
          </div>
          {actions()}
        </>
      );
    } else if (stage === 'rhs') {
      card = (
        <>
          {heading(
            'Put it together. What is left on the right-hand side?',
            `${model.p.n !== 0 && model.q.n !== 0 ? 'The two squares you subtracted are' : 'The square you subtracted is'} added back on the right, and any constant crosses with its sign changed.`,
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xl text-slate-800 dark:text-slate-100">
              <SafeInlineMath math={`${bracketLatex('x', model.centre[0])} + ${bracketLatex('y', model.centre[1])} =`} />
            </span>
            <FracBox value={typed.rhsq} onChange={(v) => setField('rhsq', v)} onEnter={check} state={marks.rhsq} disabled={locked} label="right-hand side" />
          </div>
          {actions()}
        </>
      );
    } else if (stage === 'verdict') {
      const want = model.r2 < 0 ? 'none' : 'point';
      const options = [
        { id: 'none', name: 'No point satisfies it, so it is not a circle' },
        { id: 'point', name: 'Exactly one point satisfies it, so it is not a circle' },
        { id: 'surd', name: 'It is a circle; the radius is the square root of the size of that number' },
      ];
      card = (
        <>
          {heading(`The right-hand side is ${fmt(model.r2)}. What does that tell you?`)}
          <div className="mt-2 text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={model.answerLatex} /></div>
          <div className="mt-3 flex flex-col gap-2">
            {options.map((o) => {
              const right = locked && o.id === want;
              const wrong = locked && picks.verdictWrong === o.id;
              return (
                <button key={o.id} disabled={locked} onClick={() => pickVerdict(o.id)}
                  className={`text-left px-3 py-2.5 rounded-xl border-2 border-b-[4px] text-sm font-black transition-all
                    ${right ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
                      : wrong ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-cyan-500'}`}>
                  {o.name}
                </button>
              );
            })}
          </div>
          {locked && actions(null)}
        </>
      );
    }
  }

  const planeFirst = mode !== 'square';

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.head[mode]} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 flex flex-col lg:flex-row gap-3 lg:gap-5 lg:items-start">

        {/* The grid */}
        {/* Pinned from lg, so the circle stays in view while a long panel scrolls. */}
        <div className={`lg:flex-1 min-w-0 lg:sticky lg:top-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2 flex justify-center ${planeFirst ? '' : 'order-2 lg:order-1'}`}>
          <LinePlane
            // A new key per item restarts the sweep that draws the circle.
            key={`${item.id}-${showCircle ? 'done' : 'live'}`}
            grid={grid} unit={UNIT} svgRef={svgRef}
            circles={circles} segments={segments} points={drawnPoints}
            misses={itemDone ? [] : misses} missFlag={null}
            aim={isClick ? aim : null} armed={armed} interactive={isClick}
            onPointerMove={onPointerMove} onPointerUp={onPointerUp}
            onPointerLeave={() => { if (!armed) setAim(null); }} onKeyDown={onKeyDown}
            style={{ width: '100%', height: 'auto', maxHeight: '78vh' }} />
        </div>

        {/* The question and the stage */}
        <div className={`lg:w-[430px] shrink-0 flex flex-col gap-3 ${planeFirst ? '' : 'order-1 lg:order-2'}`}>
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-2" style={{ backgroundColor: INK }}>
              <CircleDot className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{T.head[mode]}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.done}</div>
            </div>
            {model.promptLines ? (
              <div className="px-4 py-3 text-center text-lg sm:text-xl text-slate-900 dark:text-slate-100 leading-loose">
                {model.promptLines.map((ln) => <div key={ln}><SafeInlineMath math={ln} /></div>)}
              </div>
            ) : (
              <div className="px-4 py-3 text-center text-xl sm:text-2xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                <SafeBlockMath math={model.questionLatex} />
              </div>
            )}
            {(levelName || item.note || (pos === 0 && pool?.intro)) && (
              <div className="px-4 pb-3 -mt-1 text-center">
                {levelName && <span className="inline-block mb-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: INK_DARK }}>Level {item.level} · {levelName}</span>}
                {(item.note || (pos === 0 && pool?.intro)) && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>}
              </div>
            )}
            <div className="px-3 pb-3 flex flex-wrap gap-1.5">
              {stages.map((s, i) => (
                <StagePill key={s} icon={STAGE_ICON[s]} label={T.stages[s]} active={i === stageIdx && !itemDone} done={i < stageIdx || itemDone} />
              ))}
            </div>
          </div>

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
                  {workingLatex(item, model).map((ln, i) => (
                    typeof ln === 'string'
                      ? <div key={i} className="py-0.5"><SafeInlineMath math={ln} /></div>
                      : <div key={i} className="py-0.5 text-sm sm:text-base font-bold leading-snug">{ln.text}{ln.tex && <> <SafeInlineMath math={ln.tex} /></>}</div>
                  ))}
                </div>
                {model.isCircle && (
                  <div className="mt-3 rounded-xl border-2 p-3" style={{ borderColor: GREEN, backgroundColor: 'rgba(88,204,2,0.08)' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{T.pointsOn}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {shown.slice(0, 8).map((p) => (
                        <span key={p.text} className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border-2 border-[#58a700]/40 text-sm text-slate-800 dark:text-slate-100">
                          <SafeInlineMath math={p.tex} />
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{T.checkOne}</div>
                    <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={checkLineLatex(model)} /></div>
                  </div>
                )}
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
