import { useMemo, useState } from 'react';
import {
  TriangleRight, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, ListChecks,
  Tags, MousePointerClick, Equal, ArrowLeftRight, Calculator, SquareRadical, Ruler, Compass, Navigation, Superscript, Sigma,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { parseInlineText } from '../components/notes/layouts/helpers.jsx';
import { SurdBox } from '../components/math/SurdInput.jsx';
import TriangleFigure from '../components/math/TriangleFigure.jsx';
import {
  deriveTriangleItem, sideKey, RATIOS, exactOptions, exactLatex, markValue, answerText, bearingText, typedDecimal,
} from '../utils/triangles';
import { isSquareFree } from '../utils/surds';

/* ------------------------------------------------------------------ *
 * TRIANGLE SOLVER — Pythagoras and right-angled trigonometry, worked in
 * the moves the mark scheme pays for.
 *
 * Reads a unit's `triangles`:
 *   { title, intro, items: [ { id, kind: 'pythag' | 'side' | 'angle' | 'chain', tri, … } ] }
 * (schema at the top of utils/triangles.js). Every side, angle, label,
 * ratio, answer, exact surd and bearing is derived there.
 *
 * Stages:
 *   PYTHAGORAS   HYPOTENUSE which side is it? → SQUARES add or subtract, and
 *                the total → ROOT the length (3 s.f., or exact)
 *   A SIDE       LABEL H / O / A from the marked angle → RATIO SOH, CAH or
 *                TOA → EQUATION fill the fraction → REARRANGE multiply or
 *                divide → CALCULATE (or, for 30°/45°/60° in exact form,
 *                EXACT VALUE → EXACT ANSWER)
 *   AN ANGLE     LABEL → RATIO → EQUATION → INVERSE → CALCULATE (1 d.p.)
 *                → (a bearing) RULE → BEARING
 * A chain runs two of these on one figure; the second uses the side the
 * first found. A wrong answer can be tried again; a second wrong answer (or
 * "Show me") fills the stage in and the item pays half. Picks get one try.
 * A calculator slip is NAMED: radians, dividing for multiplying, the other
 * angle, rounding too early.
 * ------------------------------------------------------------------ */

const INK = '#0369a1';
const INK_DARK = '#075985';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const ROLE_COLOR = { hyp: '#dc2626', opp: '#2563eb', adj: '#16a34a' };
const ROLE_NAME = { hyp: 'Hypotenuse', opp: 'Opposite', adj: 'Adjacent' };
const ROLE_SHORT = { hyp: 'H', opp: 'O', adj: 'A' };

const T = {
  title: 'Triangle Solver',
  check: 'Check',
  stuck: 'Show me',
  cont: 'Continue',
  next: 'Next question',
  finish: 'Finish',
  solved: 'solved',
  clean: 'Every move right first time.',
  slipped: 'Solved — one wrong turn, and you found it yourself.',
  helped: 'Solved — with a move or two shown to you.',
  bookCopy: 'Copy this into your book',
  shown: 'Here it is. Read it, then continue.',
};
const STAGES = {
  hyp: ['Hypotenuse', Ruler], squares: ['Squares', Superscript], root: ['Square root', SquareRadical],
  label: ['Label', Tags], ratio: ['Ratio', MousePointerClick], equation: ['Equation', Equal], rearrange: ['Rearrange', ArrowLeftRight],
  inverse: ['Inverse', ArrowLeftRight], calc: ['Calculate', Calculator], exactValue: ['Exact value', Sigma], exact: ['Exact answer', SquareRadical],
  rule: ['Bearing rule', Compass], bearing: ['Bearing', Navigation],
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const intOf = (s) => (/^\s*-?\d+\s*$/.test(String(s ?? '')) ? Number(s) : null);
const num = (v) => (Number.isInteger(v) ? String(v) : answerText(v));
// Working lines keep a figure more than the answer, so rounding shows only at the end.
const num4 = (v) => (Number.isInteger(v) ? String(v) : String(Number(v.toPrecision(4))));
const fnLatex = (fn) => `\\${fn}`;

function stagesFor(d) {
  if (d.kind === 'pythag') return ['hyp', 'squares', 'root'];
  if (d.kind === 'side') return ['label', 'ratio', 'equation', 'rearrange', ...(d.exact ? ['exactValue', 'exact'] : ['calc'])];
  return ['label', 'ratio', 'equation', 'inverse', 'calc', ...(d.bearing ? ['rule', 'bearing'] : [])];
}

function Stage({ icon: Icon, label, active, done }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all
      ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
        : active ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
      style={active && !done ? { backgroundColor: INK } : undefined}>
      {done ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
      <span>{label}</span>
    </div>
  );
}

function Message({ msg }) {
  if (!msg?.text) return null;
  const tone = msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.shown || msg.info ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown || msg.info ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{parseInlineText(msg.text)}</span>
    </div>
  );
}

function Actions({ locked, onShow, onCheck, onContinue }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {!locked ? (
        <>
          {onShow && (
            <button onClick={onShow} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
            </button>
          )}
          {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>}
        </>
      ) : (
        <button onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

const Say = ({ text }) => (
  <span className="[&_.katex]:inline-block">
    {String(text).split('$').map((p, i) => (i % 2 ? <SafeInlineMath key={i} math={p} /> : <span key={i}>{parseInlineText(p)}</span>))}
  </span>
);

/** A free-typed decimal box (lengths and angles have decimal points). */
function DecimalBox({ value, onChange, onEnter, state, disabled, label, suffix }) {
  const RING = {
    good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
    bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
    shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
  };
  return (
    <span className="inline-flex items-center gap-1.5">
      <input value={value ?? ''} disabled={disabled} inputMode="decimal" aria-label={label} placeholder="?" spellCheck={false} autoComplete="off"
        onChange={(e) => onChange(e.target.value.replace(/[^\d.,°-]/g, ''))} onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
        className={`w-28 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500 disabled:opacity-80 ${RING[state] || 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}`} />
      {suffix && <span className="font-bold text-slate-500 dark:text-slate-400 text-lg">{suffix}</span>}
    </span>
  );
}

export default function TriangleSolver({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && it?.kind), [pool]);

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
  const [slipped, setSlipped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wrongs, setWrongs] = useState(0);
  const [msg, setMsg] = useState(null);
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [picked, setPicked] = useState(null);
  const [assign, setAssign] = useState({});
  const [frac, setFrac] = useState({ top: null, bottom: null });
  const [op, setOp] = useState(null);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return deriveTriangleItem(item); } catch { return null; }
  }, [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const { parts } = model;
  const unit = model.unit;
  const flat = parts.flatMap((d, pi) => stagesFor(d).map((s) => ({ pi, s })));
  const cur = flat[Math.min(stageIdx, flat.length - 1)];
  const d = parts[cur.pi];
  const stage = cur.s;
  const chain = parts.length > 1;
  const letterFor = (pi) => item.labels?.[parts[pi].find] || (item.kind === 'chain' ? item.parts[pi].labels?.[parts[pi].find] || parts[pi].find : null) || 'x';
  const unknown = d.kind === 'angle' ? '\\theta' : letterFor(cur.pi);
  const u = unit ? ` ${unit}` : '';

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); setAssign({}); setFrac({ top: null, bottom: null }); setOp(null); };
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const advance = () => {
    if (stageIdx + 1 < flat.length) { setStageIdx((s) => s + 1); resetStage(); return; }
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const judge = (ok, badText, reveal, goodText = 'Right.') => {
    if (locked) return;
    if (ok) { setLocked(true); setMsg({ ok: true, text: goodText }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= 2) { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text: `${badText} The answer is filled in for you.` }); }
    else setMsg({ ok: false, text: badText });
  };
  const showMe = (reveal, text = T.shown) => { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text }); };
  const pickOnce = (i, options, rightText) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
    const o = options[i];
    if (o.correct) setMsg({ ok: true, text: o.why });
    else { setHelped(true); setSlipped(true); setMsg({ ok: false, text: `${o.why} ${rightText}` }); }
  };
  const goNext = () => { setPos((p) => p + 1); setStageIdx(0); setHelped(false); setSlipped(false); setItemDone(false); resetStage(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());
  const reachedAt = (pi, s) => {
    if (itemDone) return true;
    const i = flat.findIndex((f) => f.pi === pi && f.s === s);
    return i !== -1 && (i < stageIdx || (i === stageIdx && locked));
  };

  /* ---------------------------------------------------------- the figure */
  const tris = parts.map((p) => [p.tri.right, ...Object.keys(p.tri.legs)]);
  const partTri = tris[cur.pi];
  const sideLabels = {};
  const allGiven = {};
  parts.forEach((p, pi) => {
    if (pi > cur.pi && !itemDone) return;
    for (const [k, v] of Object.entries(p.given)) if (!allGiven[k]) allGiven[k] = { v, prev: p.prevSide === k };
  });
  for (const [k, { v, prev }] of Object.entries(allGiven)) sideLabels[k] = prev ? `${num(v)}…` : `${num(v)}${u}`;
  parts.forEach((p, pi) => {
    if (p.kind === 'angle' || !p.find) return;
    if (itemDone) sideLabels[p.find] = `${num(p.value)}${u}`;
    else if (pi < cur.pi) sideLabels[p.find] = sideLabels[p.find] || `${num(p.value)}…`;
    else if (pi === cur.pi) sideLabels[p.find] = chain ? '?' : letterFor(pi);
  });
  const angleMarks = [];
  parts.forEach((p, pi) => {
    if (pi > cur.pi && !itemDone) return;
    if (p.kind === 'side') angleMarks.push({ at: p.at, tri: pi, label: `${p.deg}°` });
    if (p.kind === 'angle') angleMarks.push({ at: p.at, tri: pi, label: pi === cur.pi && !itemDone && !reachedAt(pi, 'calc') ? 'θ' : `${p.value.toFixed(1)}°` });
  });
  const sideColors = {};
  const derivedColors = d.roles && !itemDone && ['label', 'ratio', 'equation'].includes(stage) && !(stage === 'label' && !locked);
  if (stage === 'label' && !locked) for (const [k, r] of Object.entries(assign)) sideColors[k] = ROLE_COLOR[r];
  else if (derivedColors) for (const r of ['hyp', 'opp', 'adj']) sideColors[d.roles[r]] = ROLE_COLOR[r];
  if (stage === 'hyp') {
    if (picked && !locked) sideColors[picked] = INK;
    if (locked) sideColors[d.solved.hyp] = ROLE_COLOR.hyp;
  }
  const bearingPart = parts.find((p) => p.bearing);
  const showBearing = bearingPart && (reachedAt(parts.indexOf(bearingPart), 'calc') || ['rule', 'bearing'].includes(stage));

  /* ---------------------------------------------------------- hypotenuse (pythag) */
  const triSides = [
    sideKey(partTri[0] + partTri[1]), sideKey(partTri[0] + partTri[2]), sideKey(partTri[1] + partTri[2]),
  ];
  const tapSide = (k) => { if (stage === 'hyp' && !locked) { setPicked(k); setMsg(null); } };
  const checkHyp = () => {
    if (!picked) { setMsg({ ok: false, text: 'Tap a side on the diagram, or one of the buttons.' }); return; }
    judge(picked === d.solved.hyp, 'The hypotenuse is the side opposite the right angle — it never touches the square corner.',
      () => setPicked(d.solved.hyp), `Right — $${d.solved.hyp}$ is opposite the right angle, so it is the longest side.`);
  };

  /* ---------------------------------------------------------- squares (pythag) */
  const sq = d.squares;
  const closeTo = (v, want) => (Number.isInteger(want) ? v === want : Math.abs(v - want) <= Math.max(0.05, Math.abs(want) * 0.002));
  const checkSquares = () => {
    const v = typedDecimal(typed.sq);
    if (!op || v == null) { setMsg({ ok: false, text: 'Choose + or −, then type the total.' }); return; }
    const opOk = op === sq.op;
    const vOk = closeTo(v, sq.sq);
    setMarks({ sq: vOk && opOk ? 'good' : 'bad' });
    let why = `Square each length first: $${num(d.given[sq.first])}^2 = ${num(sq.sq1)}$.`;
    if (!opOk) why = d.findHyp ? 'You are finding the HYPOTENUSE, the longest side: ADD the two squares.' : 'You are finding a SHORTER side: take the smaller square AWAY from the hypotenuse squared.';
    judge(opOk && vOk, why, () => { setOp(sq.op); setTyped({ sq: num(sq.sq) }); setMarks({ sq: 'shown' }); },
      `Right — $${d.find}^2 = ${num(sq.sq)}$.`);
  };

  /* ---------------------------------------------------------- label (trig) */
  const checkLabel = () => {
    if (triSides.some((k) => !assign[k])) { setMsg({ ok: false, text: 'Give every side a label: H, O or A.' }); return; }
    const hypOk = assign[d.roles.hyp] === 'hyp';
    const ok = ['hyp', 'opp', 'adj'].every((r) => assign[d.roles[r]] === r);
    const why = !hypOk
      ? 'The hypotenuse is opposite the right angle — always the longest side.'
      : `Opposite is the side that does NOT touch the angle at $${d.at}$. Adjacent is the other side that does touch it.`;
    judge(ok, why, () => setAssign(Object.fromEntries(['hyp', 'opp', 'adj'].map((r) => [d.roles[r], r]))),
      `Right — seen from the angle at $${d.at}$.`);
  };

  /* ---------------------------------------------------------- ratio */
  const knownRoles = d.kind === 'side' ? [d.known.role, d.findRole] : d.kind === 'angle' ? [
    Object.keys(d.roles).find((r) => d.roles[r] === d.top.side), Object.keys(d.roles).find((r) => d.roles[r] === d.bottom.side),
  ] : [];
  const ratioOpts = ['sin', 'cos', 'tan'].map((fn) => {
    const R = RATIOS[fn];
    const correct = fn === d.fn;
    const uses = [R.top, R.bottom];
    const missing = knownRoles.find((r) => !uses.includes(r));
    return {
      id: fn, fn, correct,
      why: correct
        ? `Right — ${R.mnemonic}: $\\${fn} = \\dfrac{\\text{${ROLE_NAME[R.top].toLowerCase()}}}{\\text{${ROLE_NAME[R.bottom].toLowerCase()}}}$ uses exactly the two sides in this question.`
        : `${R.mnemonic} uses the ${ROLE_NAME[R.top].toLowerCase()} and the ${ROLE_NAME[R.bottom].toLowerCase()} — it has no ${ROLE_NAME[missing || 'hyp'].toLowerCase()}.`,
    };
  });

  /* ---------------------------------------------------------- equation */
  const R = d.fn ? RATIOS[d.fn] : null;
  const angleLatex = d.kind === 'side' ? `${d.deg}^\\circ` : '\\theta';
  const chips = d.kind === 'side'
    ? [{ id: 'k', latex: num(d.known.value) }, { id: 'u', latex: unknown }]
    : d.kind === 'angle' ? [{ id: 'a', latex: num(d.given[d.top.side]), side: d.top.side }, { id: 'b', latex: num(d.given[d.bottom.side]), side: d.bottom.side }] : [];
  const wantTop = d.kind === 'side' ? (d.unknownOnTop ? 'u' : 'k') : 'a';
  const wantBottom = d.kind === 'side' ? (d.unknownOnTop ? 'k' : 'u') : 'b';
  const chipLatex = (id) => chips.find((c) => c.id === id)?.latex;
  const eqLatex = R ? `${fnLatex(d.fn)} ${angleLatex} = \\dfrac{${chipLatex(wantTop)}}{${chipLatex(wantBottom)}}` : '';
  const checkEquation = () => {
    if (!frac.top || !frac.bottom) { setMsg({ ok: false, text: 'Fill the top and the bottom of the fraction.' }); return; }
    const ok = frac.top === wantTop && frac.bottom === wantBottom;
    judge(ok, `${R.mnemonic}: the ${ROLE_NAME[R.top].toLowerCase()} goes on top, the ${ROLE_NAME[R.bottom].toLowerCase()} on the bottom.`,
      () => setFrac({ top: wantTop, bottom: wantBottom }), `Right — $${eqLatex}$.`);
  };

  /* ---------------------------------------------------------- rearrange / inverse */
  const kL = d.kind === 'side' ? num(d.known.value) : '';
  const trig = d.kind === 'side' ? `${fnLatex(d.fn)} ${d.deg}^\\circ` : '';
  const rearrangeOpts = d.kind === 'side' ? [
    { id: 'mul', latex: `${unknown} = ${kL} \\times ${trig}`, correct: d.unknownOnTop },
    { id: 'div', latex: `${unknown} = \\dfrac{${kL}}{${trig}}`, correct: !d.unknownOnTop },
    { id: 'rev', latex: `${unknown} = \\dfrac{${trig}}{${kL}}`, correct: false },
  ].map((o) => ({
    ...o,
    why: o.correct
      ? (d.unknownOnTop ? `Right — $${unknown}$ is divided by ${kL}, so multiply both sides by ${kL}.` : `Right — $${unknown}$ is on the bottom: multiply both sides by $${unknown}$, then divide by $${trig}$.`)
      : o.id === 'rev' ? 'That is the fraction turned upside down — the ratio is fixed as written.'
        : d.unknownOnTop ? `$${unknown}$ is on TOP, divided by ${kL}. Undo a divide by multiplying.` : `$${unknown}$ is on the BOTTOM. Multiplying by ${kL} would leave it there — multiply by $${unknown}$ first, then divide.`,
  })) : [];
  const fracL = d.kind === 'angle' ? `\\dfrac{${num(d.top.value)}}{${num(d.bottom.value)}}` : '';
  const inverseOpts = d.kind === 'angle' ? [
    { id: 'inv', latex: `\\theta = ${fnLatex(d.fn)}^{-1}\\left(${fracL}\\right)`, correct: true, why: `Right — $${fnLatex(d.fn)}^{-1}$ (SHIFT ${d.fn} on the calculator) takes you from the ratio back to the angle.` },
    { id: 'fn', latex: `\\theta = ${fnLatex(d.fn)}\\left(${fracL}\\right)`, correct: false, why: `${d.fn} turns an angle into a ratio. You have the ratio — you need to go the other way.` },
    { id: 'recip', latex: `\\theta = \\dfrac{1}{${fnLatex(d.fn)}\\left(${fracL}\\right)}`, correct: false, why: `$${fnLatex(d.fn)}^{-1}$ is not "one over ${d.fn}" — it is the inverse button, SHIFT ${d.fn}.` },
    { id: 'flip', latex: `\\theta = ${fnLatex(d.fn)}^{-1}\\left(\\dfrac{${num(d.bottom.value)}}{${num(d.top.value)}}\\right)`, correct: false, why: `The fraction is upside down — ${R?.mnemonic}: ${ROLE_NAME[R?.top || 'opp'].toLowerCase()} over ${ROLE_NAME[R?.bottom || 'hyp'].toLowerCase()}.` },
  ] : [];

  /* ---------------------------------------------------------- calculate */
  const isAngle = d.kind === 'angle';
  const keys = d.kind === 'side'
    ? (d.unknownOnTop ? `${kL} × ${d.fn} ( ${d.deg} ) =` : `${kL} ÷ ${d.fn} ( ${d.deg} ) =`)
    : isAngle ? `SHIFT ${d.fn} ( ${num(d.top.value)} ÷ ${num(d.bottom.value)} ) =` : '';
  const checkCalc = () => {
    const r = markValue(typed.v, d.value, { angle: isAngle, slips: d.slips || [] });
    setMarks({ v: r.ok ? 'good' : 'bad' });
    const why = r.why || (isAngle ? `Press exactly: ${keys} — with the calculator in degrees.` : `Press exactly: ${keys} — with the calculator in degrees.`);
    judge(r.ok, why, () => { setTyped({ v: answerText(d.value, { angle: isAngle }).replace('°', '') }); setMarks({ v: 'shown' }); },
      `Right — ${isAngle ? `$\\theta = ${answerText(d.value, { angle: true }).replace('°', '^\\circ')}$ (1 d.p.)` : `$${unknown} = ${answerText(d.value)}$${u} (3 s.f.)`}.`);
  };
  const checkRoot = () => {
    if (d.exact) {
      const k = intOf(typed.k);
      const r = String(typed.r ?? '').trim() === '' ? 1 : intOf(typed.r);
      if (k == null || r == null || r < 1) { setMsg({ ok: false, text: 'Type the number in front and the number under the root.' }); return; }
      const [wk, wr] = d.exactAns;
      const equal = k > 0 && k * k * r === wk * wk * wr;
      if (equal && !isSquareFree(r)) { setMsg({ info: true, text: `Equal — but $\\sqrt{${r}}$ can still be simplified. Take out the square factor.` }); return; }
      setMarks({ e: equal ? 'good' : 'bad' });
      judge(equal, `$${d.find}^2 = ${sq.sq}$, so $${d.find} = \\sqrt{${sq.sq}}$. Find the biggest square number that divides ${sq.sq}.`,
        () => { setTyped({ k: String(wk), r: String(wr) }); setMarks({ e: 'shown' }); }, `Right — $\\sqrt{${sq.sq}} = ${wk}\\sqrt{${wr}}$.`);
      return;
    }
    const r = markValue(typed.v, d.value, {});
    setMarks({ v: r.ok ? 'good' : 'bad' });
    judge(r.ok, r.why || `Press √ ( ${num(sq.sq)} ) = and give 3 significant figures.`,
      () => { setTyped({ v: answerText(d.value) }); setMarks({ v: 'shown' }); }, `Right — $${d.find} = ${answerText(d.value)}$${u}.`);
  };

  /* ---------------------------------------------------------- exact trig */
  const exOpts = d.kind === 'side' && d.exact ? exactOptions(d.fn, d.deg).map((latex) => ({
    latex, correct: latex === exactLatex(d.fn, d.deg),
    why: latex === exactLatex(d.fn, d.deg) ? `Right — $${fnLatex(d.fn)} ${d.deg}^\\circ = ${latex}$. It comes from half an equilateral triangle${d.deg === 45 ? ' — here, half a square' : ''}.` : `Not that one — look again at the triangle it comes from.`,
  })) : [];
  const checkExact = () => {
    const k = intOf(typed.k);
    const r = String(typed.r ?? '').trim() === '' ? 1 : intOf(typed.r);
    if (k == null || r == null || r < 1) { setMsg({ ok: false, text: 'Type the number in front and the number under the root.' }); return; }
    const [wk, wr] = d.exactAns;
    const equal = k * k * r === wk * wk * wr && Math.sign(k) === Math.sign(wk);
    if (equal && !isSquareFree(r)) { setMsg({ info: true, text: `Equal — but simplify $\\sqrt{${r}}$ fully.` }); return; }
    setMarks({ e: equal ? 'good' : 'bad' });
    judge(equal, `$${unknown} = ${kL} \\times ${exactLatex(d.fn, d.deg)}$ — multiply the ${kL} by the top, then divide by the bottom.`,
      () => { setTyped({ k: String(wk), r: String(wr) }); setMarks({ e: 'shown' }); }, `Right — $${unknown} = ${wk}\\sqrt{${wr}}$${u}.`);
  };

  /* ---------------------------------------------------------- bearing */
  const B = d.bearing;
  const RULE_WHY = {
    t: 'The angle is already measured clockwise from north.',
    '180-t': 'Facing south is 180°. The line is θ back from south towards east, so take θ away.',
    '180+t': 'Facing south is 180°. The line is θ past south, towards west, so add θ.',
    '360-t': 'The line is θ anticlockwise from north: a full turn, 360°, take away θ.',
    '90-t': 'Facing east is 90°. The line is θ back towards north.',
    '90+t': 'Facing east is 90°. The line is θ past east.',
    '270-t': 'Facing west is 270°. The line is θ back towards south.',
    '270+t': 'Facing west is 270°. The line is θ past west.',
  };
  const ruleOpts = B ? B.options.map((r) => ({ ...r, correct: r.id === B.rule.id, why: r.id === B.rule.id ? `Right — ${RULE_WHY[r.id]}` : `Not this one. Start facing north at $${B.from}$ and turn clockwise until you face $${B.to}$.` })) : [];
  const checkBearing = () => {
    const v = typedDecimal(typed.b);
    if (v == null) { setMsg({ ok: false, text: 'Type the bearing in degrees.' }); return; }
    const ok = Math.abs(v - B.value) <= 0.05 + 1e-9;
    setMarks({ b: ok ? 'good' : 'bad' });
    judge(ok, `$${B.rule.latex.replace(/\\theta/g, `${d.value.toFixed(1)}^\\circ`)}$ — use your angle rounded to 1 d.p.`,
      () => { setTyped({ b: B.value.toFixed(1) }); setMarks({ b: 'shown' }); }, `Right — the bearing of $${B.to}$ from $${B.from}$ is ${bearingText(B.value)}.`);
  };

  /* ---------------------------------------------------------- the working ladder */
  const ladder = [];
  parts.forEach((p, pi) => {
    const L = (s) => reachedAt(pi, s);
    const letter = p.kind === 'angle' ? '\\theta' : letterFor(pi);
    if (chain && L(stagesFor(p)[0])) ladder.push(`\\text{Triangle ${[...tris[pi]].sort().join('')}:}`);
    if (p.kind === 'pythag') {
      const s = p.squares;
      const a = num(p.given[s.first]);
      const bq = num(p.given[s.second]);
      const findName = p.find;
      if (L('squares')) {
        ladder.push(`${findName}^2 = ${p.prevSide === s.first ? `(${p.given[s.first].toFixed(3)}\\ldots)` : a}^2 ${s.op === '+' ? '+' : '-'} ${p.prevSide === s.second ? `(${p.given[s.second].toFixed(3)}\\ldots)` : bq}^2`);
        ladder.push(`${findName}^2 = ${num4(s.sq1)} ${s.op === '+' ? '+' : '-'} ${num4(s.sq2)} = ${num4(s.sq)}`);
      }
      if (L('root')) ladder.push(p.exact ? `${findName} = \\sqrt{${s.sq}} = ${p.exactAns[0]}\\sqrt{${p.exactAns[1]}}\\text{${u}}` : `${findName} = \\sqrt{${num(s.sq)}} = ${num(p.value)}\\text{${u}}${Number.isInteger(p.value) ? '' : ' \\text{ (3 s.f.)}'}`);
      return;
    }
    const ang = p.kind === 'side' ? `${p.deg}^\\circ` : '\\theta';
    if (L('equation')) {
      if (p.kind === 'side') {
        const k = p.prevSide === p.known.side ? `${p.known.value.toFixed(3)}\\ldots` : num(p.known.value);
        ladder.push(`${fnLatex(p.fn)} ${ang} = \\dfrac{${p.unknownOnTop ? letter : k}}{${p.unknownOnTop ? k : letter}}`);
      } else ladder.push(`${fnLatex(p.fn)} \\theta = \\dfrac{${num(p.top.value)}}{${num(p.bottom.value)}}`);
    }
    if (p.kind === 'side' && L('rearrange')) ladder.push(p.unknownOnTop ? `${letter} = ${num(p.known.value)} \\times ${fnLatex(p.fn)} ${ang}` : `${letter} = \\dfrac{${num(p.known.value)}}{${fnLatex(p.fn)} ${ang}}`);
    if (p.kind === 'angle' && L('inverse')) ladder.push(`\\theta = ${fnLatex(p.fn)}^{-1}\\left(\\dfrac{${num(p.top.value)}}{${num(p.bottom.value)}}\\right)`);
    if (p.kind === 'side' && p.exact && L('exact')) ladder.push(`${letter} = ${num(p.known.value)} \\times ${exactLatex(p.fn, p.deg)} = ${p.exactAns[0]}\\sqrt{${p.exactAns[1]}}\\text{${u}}`);
    if (L('calc')) {
      if (p.kind === 'side') ladder.push(`${letter} = ${p.value.toFixed(4)}\\ldots = ${answerText(p.value)}\\text{${u} (3 s.f.)}`);
      else ladder.push(`\\theta = ${p.value.toFixed(3)}\\ldots = ${p.value.toFixed(1)}^\\circ \\text{ (1 d.p.)}`);
    }
    if (p.bearing && L('bearing')) ladder.push(`\\text{Bearing} = ${p.bearing.rule.latex.replace(/\\theta/g, `${p.value.toFixed(1)}^\\circ`)} = ${bearingText(p.bearing.value).replace('°', '^\\circ')}`);
  });

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const lastPart = parts[parts.length - 1];
  const answerLatex = lastPart.bearing
    ? `\\theta = ${lastPart.value.toFixed(1)}^\\circ, \\; \\text{bearing } ${bearingText(lastPart.bearing.value).replace('°', '^\\circ')}`
    : lastPart.kind === 'angle' ? `\\theta = ${lastPart.value.toFixed(1)}^\\circ`
      : lastPart.exact ? `${lastPart.kind === 'pythag' ? lastPart.find : letterFor(parts.length - 1)} = ${lastPart.exactAns[0]}\\sqrt{${lastPart.exactAns[1]}}\\text{${u}}`
        : `${lastPart.kind === 'pythag' ? lastPart.find : letterFor(parts.length - 1)} = ${num(lastPart.value)}\\text{${u}}`;
  const formLine = lastPart.exact && item.prompt && /a\\sqrt/.test(item.prompt) ? `a = ${lastPart.exactAns[0]}` : null;

  const choiceStyle = (correct, i) => {
    let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-sky-600 text-slate-900 dark:text-slate-100';
    if (locked) {
      if (correct) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
      else if (picked === i) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
      else style = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
    }
    return style;
  };
  const choices = (options, { cols = 1, rightText = '' } = {}) => (
    <div className={`grid gap-2 ${cols === 2 ? 'sm:grid-cols-2' : cols === 3 ? 'grid-cols-3' : ''}`}>
      {options.map((o, i) => (
        <button key={o.id || o.latex} disabled={locked} onClick={() => pickOnce(i, options, rightText)}
          className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-xl transition-all [&_.katex]:inline-block ${choiceStyle(o.correct, i)}`}>
          {o.label ? <span className="block text-sm font-black uppercase tracking-wide">{o.label}</span> : null}
          <SafeInlineMath math={o.latex} />
        </button>
      ))}
    </div>
  );

  const figure = (
    <TriangleFigure pos={model.pos} tris={tris} rot={item.tri?.rot || 0} sideLabels={sideLabels} sideColors={sideColors} angles={angleMarks}
      north={showBearing ? [bearingPart.bearing.from] : []}
      bearingTo={showBearing && (stage === 'bearing' || itemDone || reachedAt(parts.indexOf(bearingPart), 'rule')) ? { from: bearingPart.bearing.from, to: bearingPart.bearing.to } : null}
      onSide={stage === 'hyp' && !locked && !itemDone ? tapSide : null} />
  );

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 lg:items-start">
        {/* left: the question, the figure, the working so far */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <TriangleRight className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">
                {parts[0].kind === 'pythag' && !chain ? 'Pythagoras' : 'Right-angled trigonometry'}
              </div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.solved}</div>
            </div>
            <p className="px-4 pt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">
              {item.prompt ? parseInlineText(item.prompt) : (
                <Say text={d.kind === 'angle' ? `Find the angle $\\theta$ at $${d.at}$. Give your answer to 1 decimal place.`
                  : `Find the length of $${d.find}$${d.kind === 'pythag' && d.exact ? ' in exact form' : ''}.${d.exact ? '' : ' Give your answer to 3 significant figures.'}`} />
              )}
            </p>
            <div className="px-3 py-2 max-w-md mx-auto">{figure}</div>
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-2 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {flat.map((f, i) => {
                  const [label, Icon] = STAGES[f.s];
                  return <Stage key={`${f.pi}${f.s}`} icon={Icon} label={chain ? `${f.pi + 1} · ${label}` : label} active={i === stageIdx} done={i < stageIdx || (i === stageIdx && locked)} />;
                })}
              </div>
            )}
          </div>

          {!itemDone && ladder.length > 0 && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Working so far</div>
              {ladder.map((l, i) => <div key={i} className="text-lg py-1 [&_.katex]:inline-block"><SafeInlineMath math={l} /></div>)}
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              {chain && cur.pi > 0 && stageIdx === flat.findIndex((f) => f.pi === cur.pi) && (
                <div className="mb-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-100 dark:border-sky-900/40 p-3 text-sm font-bold text-sky-800 dark:text-sky-200">
                  <Say text={`Now the second triangle. Use $${d.prevSide} = ${parts[cur.pi - 1].value.toFixed(4)}\\ldots$ — keep the full value in your calculator (press ANS), and round only at the end.`} />
                </div>
              )}

              {stage === 'hyp' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Which side is the hypotenuse?</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Tap it on the diagram, or choose it here.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {triSides.map((k) => (
                      <button key={k} disabled={locked} onClick={() => tapSide(k)}
                        className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-xl transition-all [&_.katex]:inline-block ${locked ? (k === d.solved.hyp ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400') : picked === k ? 'border-sky-600 bg-sky-50 dark:bg-sky-900/30 text-slate-900 dark:text-slate-100' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'}`}>
                        <SafeInlineMath math={k} />
                      </button>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => setPicked(d.solved.hyp))} onCheck={checkHyp} onContinue={advance} />
                </>
              )}

              {stage === 'squares' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    {d.findHyp ? 'Finding the hypotenuse — add or subtract the squares?' : 'Finding a shorter side — add or subtract the squares?'}
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <Say text={`$a^2 + b^2 = c^2$, where $c$ is the hypotenuse. ${d.prevSide ? 'Square the full value from your calculator.' : ''}`} />
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={`${d.find}^2 = ${d.prevSide === sq.first ? `${d.given[sq.first].toFixed(3)}\\ldots` : num(d.given[sq.first])}^2`} />
                    <span className="inline-flex rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
                      {['+', '-'].map((o) => (
                        <button key={o} disabled={locked} onClick={() => { setOp(o); setMarks({}); setMsg(null); }}
                          className={`px-3 py-1 font-black text-xl ${op === o ? 'bg-sky-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>{o === '-' ? '−' : '+'}</button>
                      ))}
                    </span>
                    <SafeInlineMath math={`${d.prevSide === sq.second ? `${d.given[sq.second].toFixed(3)}\\ldots` : num(d.given[sq.second])}^2 =`} />
                    <DecimalBox value={typed.sq} state={marks.sq} disabled={locked} onEnter={checkSquares} label="the total" onChange={(v) => { setTyped({ sq: v }); setMarks({}); }} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setOp(sq.op); setTyped({ sq: num(sq.sq) }); setMarks({ sq: 'shown' }); })} onCheck={checkSquares} onContinue={advance} />
                </>
              )}

              {stage === 'root' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`$${d.find}^2 = ${num(sq.sq)}$. Now square-root it.`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {d.exact ? 'Exact form: leave the root in, simplified fully.' : 'Give the length to 3 significant figures.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={`${d.find} =`} />
                    {d.exact ? (
                      <SurdBox coef={typed.k} rad={typed.r} state={marks.e} disabled={locked} onEnter={checkRoot}
                        onCoef={(v) => { setTyped((t) => ({ ...t, k: v })); setMarks({}); }} onRad={(v) => { setTyped((t) => ({ ...t, r: v })); setMarks({}); }} />
                    ) : (
                      <DecimalBox value={typed.v} state={marks.v} disabled={locked} onEnter={checkRoot} label="the length" suffix={unit} onChange={(v) => { setTyped({ v }); setMarks({}); }} />
                    )}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { if (d.exact) { setTyped({ k: String(d.exactAns[0]), r: String(d.exactAns[1]) }); setMarks({ e: 'shown' }); } else { setTyped({ v: answerText(d.value) }); setMarks({ v: 'shown' }); } })} onCheck={checkRoot} onContinue={advance} />
                </>
              )}

              {stage === 'label' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`Label the sides from the angle at $${d.at}$.`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Hypotenuse: opposite the right angle. Opposite: across from the angle. Adjacent: next to it.</p>
                  <div className="flex flex-col gap-2">
                    {triSides.map((k) => (
                      <div key={k} className="flex items-center gap-2">
                        <span className="w-12 text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block"><SafeInlineMath math={k} /></span>
                        {['hyp', 'opp', 'adj'].map((r) => (
                          <button key={r} disabled={locked} onClick={() => { setAssign((a) => ({ ...a, [k]: r })); setMsg(null); }}
                            className={`flex-1 rounded-xl border-2 border-b-[4px] px-2 py-2 text-xs sm:text-sm font-black uppercase tracking-wide transition-all ${assign[k] === r ? 'text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
                            style={assign[k] === r ? { backgroundColor: ROLE_COLOR[r], borderColor: ROLE_COLOR[r] } : undefined}>
                            {ROLE_NAME[r]}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => setAssign(Object.fromEntries(['hyp', 'opp', 'adj'].map((r) => [d.roles[r], r]))))} onCheck={checkLabel} onContinue={advance} />
                </>
              )}

              {stage === 'ratio' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Which ratio links these two sides?</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {d.kind === 'side'
                      ? <Say text={`You know the **${ROLE_NAME[d.known.role].toLowerCase()}** (${num(d.known.value)}). You want the **${ROLE_NAME[d.findRole].toLowerCase()}** ($${unknown}$).`} />
                      : <Say text={`You know the **${ROLE_NAME[knownRoles[0]].toLowerCase()}** (${num(d.top.value)}) and the **${ROLE_NAME[knownRoles[1]].toLowerCase()}** (${num(d.bottom.value)}).`} />}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {ratioOpts.map((o, i) => (
                      <button key={o.id} disabled={locked} onClick={() => pickOnce(i, ratioOpts, `It is ${RATIOS[d.fn].mnemonic}.`)}
                        className={`rounded-xl border-2 border-b-[4px] px-2 py-3 transition-all [&_.katex]:inline-block ${choiceStyle(o.correct, i)}`}>
                        <div className="text-lg font-black tracking-widest">{RATIOS[o.fn].mnemonic}</div>
                        <div className="text-base"><SafeInlineMath math={`\\${o.fn} = \\dfrac{${ROLE_SHORT[RATIOS[o.fn].top]}}{${ROLE_SHORT[RATIOS[o.fn].bottom]}}`} /></div>
                      </button>
                    ))}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'equation' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Write the equation.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <Say text={`${R.mnemonic}: $\\${d.fn} = \\dfrac{\\text{${ROLE_NAME[R.top].toLowerCase()}}}{\\text{${ROLE_NAME[R.bottom].toLowerCase()}}}$. Tap what goes on top, then what goes on the bottom.`} />
                  </p>
                  <div className="flex items-center gap-4 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={`${fnLatex(d.fn)} ${angleLatex} =`} />
                    <div className="inline-flex flex-col items-center gap-1">
                      {['top', 'bottom'].map((slot, si) => (
                        <div key={slot} className="flex flex-col items-center">
                          {si === 1 && <div className="h-[3px] w-28 rounded bg-slate-700 dark:bg-slate-300 mb-1" />}
                          <div className="flex gap-1.5">
                            {chips.map((c) => (
                              <button key={c.id} disabled={locked} onClick={() => { setFrac((f) => ({ ...f, [slot]: c.id })); setMsg(null); }}
                                className={`min-w-[3rem] rounded-xl border-2 border-b-[4px] px-2 py-1 text-xl transition-all [&_.katex]:inline-block ${frac[slot] === c.id ? 'border-sky-600 bg-sky-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                <SafeInlineMath math={c.latex} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => setFrac({ top: wantTop, bottom: wantBottom }))} onCheck={checkEquation} onContinue={advance} />
                </>
              )}

              {stage === 'rearrange' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`$${eqLatex}$. Make $${unknown}$ the subject.`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3"><Say text={`Is $${unknown}$ on the top or the bottom of the fraction?`} /></p>
                  {choices(rearrangeOpts, { rightText: `It is $${rearrangeOpts.find((o) => o.correct)?.latex}$.` })}
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'inverse' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`$${eqLatex}$. How do you get $\\theta$ on its own?`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">You know the ratio. You want the angle that gives it.</p>
                  {choices(inverseOpts, { cols: 2, rightText: `It is $${inverseOpts[0].latex}$.` })}
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'calc' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Now the calculator.</div>
                  <div className="my-2 rounded-xl bg-slate-900 text-lime-300 font-mono font-bold text-lg px-4 py-2 inline-flex items-center gap-2">
                    <Calculator className="w-5 h-5 shrink-0" strokeWidth={2.5} /> {keys}
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    Check the screen shows <b>D</b> (degrees). {isAngle ? 'Give the angle to 1 decimal place.' : 'Give the length to 3 significant figures.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={`${unknown} =`} />
                    <DecimalBox value={typed.v} state={marks.v} disabled={locked} onEnter={checkCalc} label={isAngle ? 'the angle' : 'the length'} suffix={isAngle ? '°' : unit} onChange={(v) => { setTyped({ v }); setMarks({}); }} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ v: answerText(d.value, { angle: isAngle }).replace('°', '') }); setMarks({ v: 'shown' }); })} onCheck={checkCalc} onContinue={advance} />
                </>
              )}

              {stage === 'exactValue' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`Exact form — no calculator. What is $${fnLatex(d.fn)} ${d.deg}^\\circ$ exactly?`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">The exact values come from half an equilateral triangle (30° and 60°) and half a square (45°).</p>
                  <div className="grid grid-cols-2 gap-2">
                    {exOpts.map((o, i) => (
                      <button key={o.latex} disabled={locked} onClick={() => pickOnce(i, exOpts, `$${fnLatex(d.fn)} ${d.deg}^\\circ = ${exactLatex(d.fn, d.deg)}$.`)}
                        className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-2xl transition-all [&_.katex]:inline-block ${choiceStyle(o.correct, i)}`}>
                        <SafeInlineMath math={o.latex} />
                      </button>
                    ))}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'exact' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`$${unknown} = ${kL} \\times ${exactLatex(d.fn, d.deg)}$. Write it as one surd.`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Multiply the whole number by the top, divide by the bottom. A whole number leaves the root box empty.</p>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={`${unknown} =`} />
                    <SurdBox coef={typed.k} rad={typed.r} state={marks.e} disabled={locked} onEnter={checkExact}
                      onCoef={(v) => { setTyped((t) => ({ ...t, k: v })); setMarks({}); }} onRad={(v) => { setTyped((t) => ({ ...t, r: v })); setMarks({}); }} />
                    {unit && <span className="font-bold text-slate-500 text-lg">{unit}</span>}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ k: String(d.exactAns[0]), r: String(d.exactAns[1]) }); setMarks({ e: 'shown' }); })} onCheck={checkExact} onContinue={advance} />
                </>
              )}

              {stage === 'rule' && B && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`Now the bearing of $${B.to}$ from $${B.from}$. Which rule gives it?`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <Say text={`A bearing is measured from **north**, **clockwise**, at $${B.from}$ — the point you are going FROM. $\\theta$ is the angle you just found.`} />
                  </p>
                  {choices(ruleOpts, { cols: 2, rightText: `It is $${B.rule.latex}$.` })}
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'bearing' && B && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`Bearing $= ${B.rule.latex.replace(/\\theta/g, `${d.value.toFixed(1)}^\\circ`)}$`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Bearings are written with three figures, like 057.4°.</p>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
                    <span className="font-bold">Bearing =</span>
                    <DecimalBox value={typed.b} state={marks.b} disabled={locked} onEnter={checkBearing} label="the bearing" suffix="°" onChange={(v) => { setTyped({ b: v }); setMarks({}); }} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ b: B.value.toFixed(1) }); setMarks({ b: 'shown' }); })} onCheck={checkBearing} onContinue={advance} />
                </>
              )}
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? T.helped : slipped ? T.slipped : T.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {T.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
                  {ladder.map((l, i) => <div key={i} className="text-lg py-1 [&_.katex]:inline-block"><SafeInlineMath math={l} /></div>)}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(3,105,161,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Answer</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block"><SafeInlineMath math={answerLatex} /></div>
                  {formLine && <div className="text-base text-slate-700 dark:text-slate-200 [&_.katex]:inline-block">so <SafeInlineMath math={formLine} /></div>}
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
    </div>
  );
}
