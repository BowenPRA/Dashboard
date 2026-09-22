import { useMemo, useState } from 'react';
import {
  LandPlot, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, ListChecks,
  AlignLeft, Divide, Ruler, Hash, Split, Scissors, Link2, PenLine, LineChart, Crosshair,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { parseInlineText } from '../components/notes/layouts/helpers.jsx';
import NumberLineSVG from '../components/math/NumberLineSVG.jsx';
import CoordGrid from '../components/math/CoordGrid.jsx';
import { regionsOf, repOf } from '../utils/numberLine';
import { graphOfSet, union } from '../utils/interval';
import { frLatex } from '../utils/simultaneous';
import {
  deriveInequalityItem, REL_LATEX, RELS, solveLinear, setOfCollected, raySet, parseNum, nearValue, ineqLatex,
  doubleStartOptions, sameSet, intersect, interval, NEG_INF, POS_INF,
} from '../utils/inequalities';

/* ------------------------------------------------------------------ *
 * INEQUALITIES — solving, number lines, whole-number solutions and regions,
 * worked in the moves the mark scheme pays for.
 *
 * Reads a unit's `inequalities`:
 *   { title, intro, items: [ { id, kind: 'solve' | 'double' | 'read' | 'region', … } ] }
 * (schema at the top of utils/inequalities.js — everything is derived there).
 *
 * Stages:
 *   SOLVE    COLLECT letters one side, numbers the other (any correct way)
 *            → DIVIDE (the sign turns round for a negative) → LINE draw it
 *            → INTEGERS tap every whole number that fits
 *   DOUBLE   the letter only in the middle: ALL THREE parts, then DIVIDE;
 *            the letter in the outer parts too: START (split it) → LEFT →
 *            RIGHT → COMBINE → INTEGERS
 *   READ     WRITE the inequality a number line shows
 *   REGION   for each boundary line: (unlabelled) its EQUATION off the grid,
 *            then its INEQUALITY — solid or dashed, and which side, found by
 *            testing a point: tap the grid and both sides are worked out
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item pays half. START is a pick: one try.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const LINE_COLORS = ['#be185d', '#0369a1', '#c2410c', '#047857'];

const T = {
  title: 'Inequalities',
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
  collect: ['Collect', AlignLeft], divide: ['Divide', Divide], line: ['Number line', Ruler], integers: ['Integers', Hash],
  all3: ['All three parts', AlignLeft], divide3: ['Divide', Divide],
  start: ['Split', Split], left: ['Left half', Scissors], right: ['Right half', Scissors], combine: ['Combine', Link2],
  write: ['Write it', PenLine], eq: ['Equation', LineChart], ineq: ['Inequality', Crosshair],
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};
const numOf = (f) => f.n / f.d;
const typedText = (f) => (f.d === 1 ? String(f.n) : `${f.n}/${f.d}`);

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

/** A number box that takes a whole number, a minus, a decimal or a fraction like 20/3. */
function ValBox({ value, onChange, onEnter, state, disabled, label, width = 'w-20' }) {
  return (
    <input value={value ?? ''} disabled={disabled} inputMode="text" aria-label={label} placeholder="?" spellCheck={false} autoComplete="off"
      onChange={(e) => onChange(e.target.value.replace(/[−–]/g, '-').replace(/[^\d./-]/g, ''))} onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      className={`${width} px-1.5 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 disabled:opacity-80 ${RING[state] || 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}`} />
  );
}

/** The four signs as buttons. `only` limits them (a two-ended answer uses < and ≤). */
function RelPick({ value, onChange, disabled, state, only = RELS, label }) {
  return (
    <span role="radiogroup" aria-label={label} className={`inline-flex rounded-xl border-2 overflow-hidden ${RING[state] ? RING[state].split(' ')[0] : 'border-slate-300 dark:border-slate-600'}`}>
      {only.map((r) => (
        <button key={r} disabled={disabled} onClick={() => onChange(r)} aria-label={r}
          className={`px-2.5 py-1 text-xl [&_.katex]:inline-block ${value === r ? 'bg-violet-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
          <SafeInlineMath math={REL_LATEX[r]} />
        </button>
      ))}
    </span>
  );
}

function stagesFor(m, item, typedA) {
  if (m.kind === 'solve') {
    return ['collect', ...(typedA === 1 ? [] : ['divide']), ...(item.line ? ['line'] : []), ...(m.integers ? ['integers'] : [])];
  }
  if (m.kind === 'double') {
    const ints = m.integers ? ['integers'] : [];
    return m.method === 'three' ? ['all3', 'divide3', ...ints] : ['start', 'left', 'right', 'combine', ...ints];
  }
  if (m.kind === 'read') return ['write'];
  return m.lines.flatMap((l, i) => [...(l.labelled ? [] : [`eq:${i}`]), `ineq:${i}`]);
}

export default function Inequalities({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
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
  // The collected form the student chose (a, rel, b) — the DIVIDE stage
  // follows it, so dividing by their negative number really does flip.
  const [collected, setCollected] = useState(null);
  const [points, setPoints] = useState([]);
  const [shade, setShade] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [test, setTest] = useState(null);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return deriveInequalityItem(item); } catch { return null; }
  }, [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const m = model;
  const v = m.v || 'x';
  const typedA = collected ? numOf(collected.a) : null;
  const stages = stagesFor(m, item, typedA);
  const stage = stages[Math.min(stageIdx, stages.length - 1)];
  const [stageKey, lineIdxStr] = String(stage).split(':');
  const lineIdx = lineIdxStr != null ? Number(lineIdxStr) : null;

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); setPoints([]); setShade([]); setChosen([]); setTest(null); };
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const advance = () => {
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); resetStage(); return; }
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
  const goNext = () => { setPos((p) => p + 1); setStageIdx(0); setHelped(false); setSlipped(false); setItemDone(false); setCollected(null); resetStage(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());
  const type = (k, val) => { setTyped((t) => ({ ...t, [k]: val })); setMarks((mk) => ({ ...mk, [k]: undefined })); setMsg(null); };
  const fill = (entries) => {
    setTyped((t) => ({ ...t, ...Object.fromEntries(entries.map(([k, val]) => [k, String(val)])) }));
    setMarks((mk) => ({ ...mk, ...Object.fromEntries(entries.map(([k]) => [k, 'shown'])) }));
  };
  const reached = (s) => itemDone || stages.indexOf(s) < stageIdx || (stages.indexOf(s) === stageIdx && locked);

  /* ---------------------------------------------------------- one-sided answers: v rel value */
  const checkRay = (wantSet, { flipHint = null, keyPrefix = '' } = {}) => {
    const rel = typed[`${keyPrefix}rel`];
    const val = parseNum(typed[`${keyPrefix}val`]);
    if (!rel || !val) { setMsg({ ok: false, text: 'Choose a sign and type the number (a fraction like 20/3 is fine).' }); return null; }
    const mine = raySet(rel, val);
    const exact = sameSet(mine, wantSet);
    const wantIv = wantSet[0];
    const wantVal = Number.isFinite(wantIv.lo) ? wantIv.lo : wantIv.hi;
    const approx = !exact && Math.abs(numOf(val) - wantVal) < 0.006 && sameSet(raySet(rel, wantVal), wantSet);
    const ok = exact || approx;
    const valOk = Math.abs(numOf(val) - wantVal) < 0.006;
    setMarks({ [`${keyPrefix}rel`]: ok ? 'good' : valOk ? 'bad' : undefined, [`${keyPrefix}val`]: valOk ? 'good' : 'bad' });
    let why = 'Divide both sides by the number in front of the letter.';
    if (valOk && flipHint) why = flipHint;
    else if (valOk) why = 'The number is right — now the sign. Only dividing (or multiplying) by a NEGATIVE turns it round.';
    return { ok, why, approx };
  };

  /* ---------------------------------------------------------- SOLVE */
  const want = m.kind === 'solve' ? m : null;
  const checkCollect = () => {
    const a = parseNum(typed.a);
    const b = parseNum(typed.b);
    const rel = typed.rel;
    if (!a || !b || !rel || a.n === 0) { setMsg({ ok: false, text: 'Fill in the number in front of the letter, the sign and the number.' }); return; }
    const mine = setOfCollected(a, rel, b);
    const ok = sameSet(mine, want.set);
    const numbersOk = Math.abs(numOf(b) / numOf(a) - numOf(want.sol.value)) < 1e-9;
    setMarks({ a: numbersOk ? 'good' : 'bad', b: numbersOk ? 'good' : 'bad', rel: ok ? 'good' : 'bad' });
    const why = numbersOk
      ? 'The numbers are right, but the sign points the wrong way. Moving terms keeps the sign the same — only × or ÷ by a negative turns it round.'
      : `Do the same to both sides: ${want.lettersRight ? 'the right-hand side has more letters, so take the letters there' : 'take the letters to the left, where there are more of them'}, and the numbers to the other side.`;
    if (ok) setCollected({ a, rel, b });
    judge(ok, why, () => { setCollected(want.collected); fill([['a', typedText(want.collected.a)], ['b', typedText(want.collected.b)], ['rel', want.collected.rel]]); },
      numOf(a) < 0 ? `Right — and the number in front of $${v}$ is negative, so watch the next step.` : `Right — $${collectedLatex(a, rel, b)}$.`);
  };
  const collectedLatex = (a, rel, b) => `${a.d === 1 ? (a.n === 1 ? '' : a.n === -1 ? '-' : a.n) : `\\dfrac{${a.n}}{${a.d}}`}${v} ${REL_LATEX[rel]} ${frLatex(b)}`;
  const col = collected || want?.collected;
  const divSol = want && col ? solveLinear(col.a, col.rel, col.b) : null;
  const checkDivide = () => {
    const r = checkRay(want.set, { flipHint: divSol?.flipped ? `You are dividing by ${frLatex(col.a)} — a NEGATIVE number — so the sign turns round.` : null });
    if (!r) return;
    judge(r.ok, r.why, () => fill([['rel', divSol.rel], ['val', typedText(divSol.value)]]),
      divSol.flipped ? `Right — dividing by $${frLatex(col.a)}$ turned the sign round: $${v} ${REL_LATEX[divSol.rel]} ${frLatex(divSol.value)}$.` : `Right — $${v} ${REL_LATEX[divSol.rel]} ${frLatex(divSol.value)}$.`);
  };

  /* ---------------------------------------------------------- number line */
  const lineMin = item.min ?? (want ? numOf(want.sol.value) - 5 : -5);
  const lineMax = item.max ?? (want ? numOf(want.sol.value) + 5 : 5);
  const drawnSet = () => {
    const regions = regionsOf(points, shade, lineMin, lineMax);
    const closedAt = (x) => points.find((p) => p.x === x)?.closed;
    return regions.filter((r) => r.shaded)
      .map((r) => interval(r.lo, r.hi, r.lo === NEG_INF ? true : !closedAt(r.lo), r.hi === POS_INF ? true : !closedAt(r.hi)))
      .reduce((acc, iv) => union(acc, [iv]), []);
  };
  const tapTick = (n) => {
    if (locked) return;
    setMsg(null);
    setPoints((ps) => {
      const here = ps.find((p) => p.x === n);
      if (!here) return [...ps, { x: n, closed: false }];
      if (!here.closed) return ps.map((p) => (p.x === n ? { ...p, closed: true } : p));
      return ps.filter((p) => p.x !== n);
    });
  };
  const tapPoint = (p) => { if (!locked) { setMsg(null); setPoints((ps) => ps.map((q) => (q.x === p.x ? { ...q, closed: !q.closed } : q))); } };
  const tapRegion = (r) => {
    if (locked) return;
    setMsg(null);
    setShade((ms) => (r.shaded ? ms.filter((x) => !((r.lo === NEG_INF || x > r.lo) && (r.hi === POS_INF || x < r.hi))) : [...ms, r.rep]));
  };
  const revealLine = (set) => {
    const g = graphOfSet(set);
    setPoints(g.points);
    const bounds = [NEG_INF, ...g.points.map((p) => p.x), POS_INF];
    setShade(g.shaded.map((i) => repOf(bounds[i], bounds[i + 1], lineMin, lineMax)));
  };
  const checkLine = () => {
    if (!points.length) { setMsg({ ok: false, text: 'Tap the number line to put a circle on the end number.' }); return; }
    if (!shade.length) { setMsg({ ok: false, text: 'Now tap above the line on the side where the numbers work, to shade it.' }); return; }
    const target = want.set;
    const mine = drawnSet();
    const ok = sameSet(mine, target);
    const end = numOf(want.sol.value);
    const pointRight = points.length === 1 && points[0].x === end;
    const fillRight = pointRight && points[0].closed === !['<', '>'].includes(want.sol.rel);
    let why = `The circle goes on ${end}, the number in the answer.`;
    if (pointRight && !fillRight) why = `${['<', '>'].includes(want.sol.rel) ? `$<$ and $>$ do not include ${end}, so the circle is OPEN.` : `$\\le$ and $\\ge$ include ${end}, so the circle is FILLED in.`}`;
    else if (fillRight) why = `Shade the side where the numbers work: try $${v} = ${end + (['>', '>='].includes(want.sol.rel) ? 1 : -1)}$ — does it fit?`;
    judge(ok, why, () => revealLine(target), 'Right — the circle and the shading say the same as the inequality.');
  };

  /* ---------------------------------------------------------- integers */
  const ints = m.integers || [];
  const chipRange = (() => {
    if (!ints.length) return [];
    const lo = Math.min(...ints) - 2;
    const hi = Math.max(...ints) + 2;
    const out = [];
    for (let n = lo; n <= hi; n += 1) out.push(n);
    return out;
  })();
  const toggleChip = (n) => { if (!locked) { setMsg(null); setChosen((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n])); } };
  const checkIntegers = () => {
    if (!chosen.length) { setMsg({ ok: false, text: 'Tap every whole number that fits.' }); return; }
    const ok = chosen.length === ints.length && ints.every((n) => chosen.includes(n));
    const final = m.kind === 'double' ? m.final : null;
    const extra = chosen.find((n) => !ints.includes(n));
    const missing = ints.find((n) => !chosen.includes(n));
    let why = 'Check each end.';
    if (final && extra != null) why = `${extra} does not fit: the answer is $${frLatex(final.lo)} ${REL_LATEX[final.r1]} ${v} ${REL_LATEX[final.r2]} ${frLatex(final.hi)}$${extra === numOf(final.lo) || extra === numOf(final.hi) ? ` — and $<$ leaves the end out` : ''}.`;
    else if (final && missing != null) why = `You have missed ${missing}. Every whole number between the ends counts${final.hi.d !== 1 ? ` — and $${frLatex(final.hi)}$ is about ${numOf(final.hi).toFixed(2)}` : ''}.`;
    judge(ok, why, () => setChosen(ints), `Right — $${v} = ${ints.join(', ')}$.`);
  };

  /* ---------------------------------------------------------- DOUBLE, three parts */
  const d3 = m.kind === 'double' && m.method === 'three' ? m : null;
  const checkAll3 = () => {
    const lo = parseNum(typed.lo);
    const k = parseNum(typed.k);
    const hi = parseNum(typed.hi);
    if (!lo || !k || !hi) { setMsg({ ok: false, text: 'Fill in all three boxes.' }); return; }
    const ok = nearValue(lo, d3.sub3.lo) && nearValue(hi, d3.sub3.hi) && nearValue(k, d3.a);
    setMarks({ lo: nearValue(lo, d3.sub3.lo) ? 'good' : 'bad', k: nearValue(k, d3.a) ? 'good' : 'bad', hi: nearValue(hi, d3.sub3.hi) ? 'good' : 'bad' });
    judge(ok, `${numOf(d3.c) > 0 ? `Subtract ${frLatex(d3.c)} from` : `Add ${frLatex({ n: -d3.c.n, d: d3.c.d })} to`} ALL THREE parts — the two outside numbers as well as the middle.`,
      () => fill([['lo', typedText(d3.sub3.lo)], ['k', typedText(d3.a)], ['hi', typedText(d3.sub3.hi)]]));
  };
  const checkDivide3 = () => {
    const lo = parseNum(typed.lo);
    const hi = parseNum(typed.hi);
    if (!lo || !hi) { setMsg({ ok: false, text: 'Fill in both ends.' }); return; }
    const okLo = nearValue(lo, d3.final.lo);
    const okHi = nearValue(hi, d3.final.hi);
    setMarks({ lo: okLo ? 'good' : 'bad', hi: okHi ? 'good' : 'bad' });
    judge(okLo && okHi, `Divide all three parts by ${frLatex(d3.a)}.`, () => fill([['lo', typedText(d3.final.lo)], ['hi', typedText(d3.final.hi)]]));
  };

  /* ---------------------------------------------------------- DOUBLE, split */
  const ds = m.kind === 'double' && m.method === 'split' ? m : null;
  const startOpts = ds ? doubleStartOptions(ds) : [];
  const pickStart = (i) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
    const o = startOpts[i];
    if (o.correct) setMsg({ ok: true, text: o.why });
    else { setHelped(true); setSlipped(true); setMsg({ ok: false, text: `${o.why} Split it: $${startOpts.find((p) => p.correct).latex}$.` }); }
  };
  const half = ds ? (stageKey === 'left' ? ds.left : ds.right) : null;
  const checkHalf = () => {
    const r = checkRay(half.set);
    if (!r) return;
    judge(r.ok, r.why, () => fill([['rel', half.sol.rel], ['val', typedText(half.sol.value)]]),
      `Right — $${v} ${REL_LATEX[half.sol.rel]} ${frLatex(half.sol.value)}$${half.sol.value.d !== 1 ? ` (about ${numOf(half.sol.value).toFixed(2)})` : ''}.`);
  };
  const checkCombine = () => {
    const lo = parseNum(typed.lo);
    const hi = parseNum(typed.hi);
    const r1 = typed.r1;
    const r2 = typed.r2;
    if (!lo || !hi || !r1 || !r2) { setMsg({ ok: false, text: 'Fill in both numbers and both signs.' }); return; }
    const mine = intersect(raySet(r1 === '<' ? '>' : '>=', lo), raySet(r2, hi));
    const exactOk = sameSet(mine, ds.set);
    const ok = exactOk || (nearValue(lo, ds.final.lo) && nearValue(hi, ds.final.hi) && r1 === ds.final.r1 && r2 === ds.final.r2);
    setMarks({ lo: nearValue(lo, ds.final.lo) ? 'good' : 'bad', hi: nearValue(hi, ds.final.hi) ? 'good' : 'bad', r1: r1 === ds.final.r1 ? 'good' : 'bad', r2: r2 === ds.final.r2 ? 'good' : 'bad' });
    judge(ok, `Both halves at once: the smaller number on the left. $${v} ${REL_LATEX[ds.left.sol.rel]} ${frLatex(ds.left.sol.value)}$ and $${v} ${REL_LATEX[ds.right.sol.rel]} ${frLatex(ds.right.sol.value)}$ — keep each sign's strictness.`,
      () => fill([['lo', typedText(ds.final.lo)], ['hi', typedText(ds.final.hi)], ['r1', ds.final.r1], ['r2', ds.final.r2]]));
  };

  /* ---------------------------------------------------------- READ */
  const rd = m.kind === 'read' ? m : null;
  const readGraph = rd ? graphOfSet(rd.set) : null;
  const readShade = rd ? (() => {
    const bounds = [NEG_INF, ...readGraph.points.map((p) => p.x), POS_INF];
    return readGraph.shaded.map((i) => repOf(bounds[i], bounds[i + 1], item.min ?? -8, item.max ?? 8));
  })() : [];
  const checkWrite = () => {
    if (rd.twoSided) {
      const lo = parseNum(typed.lo);
      const hi = parseNum(typed.hi);
      const r1 = typed.r1;
      const r2 = typed.r2;
      if (!lo || !hi || !r1 || !r2) { setMsg({ ok: false, text: 'Fill in both numbers and both signs.' }); return; }
      const mine = intersect(raySet(r1 === '<' ? '>' : '>=', lo), raySet(r2, hi));
      const ok = sameSet(mine, rd.set);
      const okLo = numOf(lo) === rd.iv.lo;
      const okHi = numOf(hi) === rd.iv.hi;
      setMarks({ lo: okLo ? 'good' : 'bad', hi: okHi ? 'good' : 'bad', r1: okLo && r1 === (rd.iv.loOpen ? '<' : '<=') ? 'good' : 'bad', r2: okHi && r2 === (rd.iv.hiOpen ? '<' : '<=') ? 'good' : 'bad' });
      judge(ok, okLo && okHi ? 'The numbers are right. Now the signs: an OPEN circle is $<$ (the number is left out), a FILLED circle is $\\le$.' : 'Read the two circles: the smaller number goes on the left.',
        () => fill([['lo', rd.iv.lo], ['hi', rd.iv.hi], ['r1', rd.iv.loOpen ? '<' : '<='], ['r2', rd.iv.hiOpen ? '<' : '<=']]));
      return;
    }
    const r = checkRay(rd.set);
    if (!r) return;
    const end = Number.isFinite(rd.iv.lo) ? rd.iv.lo : rd.iv.hi;
    const wantRel = Number.isFinite(rd.iv.lo) ? (rd.iv.loOpen ? '>' : '>=') : (rd.iv.hiOpen ? '<' : '<=');
    judge(r.ok, 'Open circle: $<$ or $>$. Filled circle: $\\le$ or $\\ge$. The arrow shows which way.', () => fill([['rel', wantRel], ['val', end]]));
  };

  /* ---------------------------------------------------------- REGION */
  const rg = m.kind === 'region' ? m : null;
  const ln = rg && lineIdx != null ? rg.lines[lineIdx] : null;
  const checkEq = () => {
    const sh = ln.shape;
    if (sh.kind === 'sloped') {
      const mm = parseNum(typed.m);
      const k = parseNum(typed.k);
      if (!mm || !k) { setMsg({ ok: false, text: 'Type the gradient and the intercept (0 if it goes through the origin).' }); return; }
      const okM = nearValue(mm, sh.m);
      const okK = nearValue(k, sh.k);
      setMarks({ m: okM ? 'good' : 'bad', k: okK ? 'good' : 'bad' });
      judge(okM && okK, okM ? 'The gradient is right. The intercept is where the line crosses the $y$-axis.' : 'Gradient = up ÷ across, between two points where the line crosses grid corners. Going down means negative.',
        () => fill([['m', typedText(sh.m)], ['k', typedText(sh.k)]]), `Right — $${ln.readLatex}$.`);
      return;
    }
    const k = parseNum(typed.k);
    if (!k) { setMsg({ ok: false, text: 'Type the number.' }); return; }
    const ok = nearValue(k, sh.k);
    setMarks({ k: ok ? 'good' : 'bad' });
    judge(ok, sh.kind === 'vertical' ? 'Every point on an upright line has the same $x$ — read it off the $x$-axis.' : 'Every point on a flat line has the same $y$ — read it off the $y$-axis.',
      () => fill([['k', typedText(sh.k)]]), `Right — $${ln.readLatex}$.`);
  };
  const lhsL = ln ? (ln.labelled ? ln.lhs : ln.readSide) : '';
  const rhsL = ln ? (ln.labelled ? ln.rhs : ln.readRhs) : '';
  const wantRel = ln ? (ln.labelled ? ln.rel : ln.readRel) : null;
  // Both sides worked out at the student's test point — in the form the line
  // is written (labelled) or read (unlabelled).
  const sideValue = (which, [x, y]) => {
    if (!ln) return 0;
    if (ln.labelled) return ln.at(x, y)[which];
    const sh = ln.shape;
    if (which === 'lhs') return sh.kind === 'vertical' ? x : y;
    if (sh.kind === 'sloped') return numOf(sh.m) * x + numOf(sh.k);
    return numOf(sh.k);
  };
  const checkIneq = () => {
    const rel = typed.rel;
    if (!rel) { setMsg({ ok: false, text: 'Choose the sign.' }); return; }
    const strictOk = ['<', '>'].includes(rel) === ln.dashed;
    const sideOk = ['<', '<='].includes(rel) === ['<', '<='].includes(wantRel);
    setMarks({ rel: rel === wantRel ? 'good' : 'bad' });
    let why = `Test a point inside the region: tap the grid, and put its $x$ and $y$ into both sides.`;
    if (sideOk && !strictOk) why = ln.dashed ? 'The line is DASHED — points ON it are not in the region, so use $<$ or $>$.' : 'The line is SOLID — points ON it count, so use $\\le$ or $\\ge$.';
    else if (strictOk && !sideOk) why = 'Solid or dashed is right — but the region is on the other side. Test a point inside it.';
    judge(rel === wantRel, why, () => fill([['rel', wantRel]]), `Right — $${lhsL} ${REL_LATEX[wantRel]} ${rhsL}$.`);
  };

  /* ---------------------------------------------------------- the working ladder */
  const ladder = [];
  if (m.kind === 'solve') {
    ladder.push(ineqLatex(item.ineq));
    const c = collected || (reached('collect') ? m.collected : null);
    if (reached('collect') && c) ladder.push(collectedLatex(c.a, c.rel, c.b));
    if (stages.includes('divide') && reached('divide') && c) {
      const s = solveLinear(c.a, c.rel, c.b);
      ladder.push(`${v} ${REL_LATEX[s.rel]} ${frLatex(s.value)}${s.flipped ? ` \\quad \\text{(÷ by } ${frLatex(c.a)} \\text{: the sign turns)}` : ''}`);
    }
  }
  if (d3) {
    ladder.push(ineqLatex(item.ineq));
    if (reached('all3')) ladder.push(`${frLatex(d3.sub3.lo)} ${REL_LATEX[d3.rels[0]]} ${d3.a.n === 1 && d3.a.d === 1 ? '' : frLatex(d3.a)}${v} ${REL_LATEX[d3.rels[1]]} ${frLatex(d3.sub3.hi)}`);
    if (reached('divide3')) ladder.push(`${frLatex(d3.final.lo)} ${REL_LATEX[d3.rels[0]]} ${v} ${REL_LATEX[d3.rels[1]]} ${frLatex(d3.final.hi)}`);
  }
  if (ds) {
    ladder.push(ineqLatex(item.ineq));
    for (const [key, h] of [['left', ds.left], ['right', ds.right]]) {
      if (!reached(key)) continue;
      const c = h.collected;
      const colL = h.lettersRight ? `${frLatex(c.b)} ${REL_LATEX[c.rel === '>' ? '<' : c.rel === '>=' ? '<=' : c.rel === '<' ? '>' : '>=']} ${frLatex(c.a)}${v}` : collectedLatex(c.a, c.rel, c.b);
      ladder.push(`${ineqLatex(h.src)} \\;\\Rightarrow\\; ${colL} \\;\\Rightarrow\\; ${v} ${REL_LATEX[h.sol.rel]} ${frLatex(h.sol.value)}`);
    }
    if (reached('combine')) ladder.push(`${frLatex(ds.final.lo)} ${REL_LATEX[ds.final.r1]} ${v} ${REL_LATEX[ds.final.r2]} ${frLatex(ds.final.hi)}`);
  }
  if (stages.includes('integers') && reached('integers')) ladder.push(`${v} = ${ints.join(',\\ ')}`);
  if (rd && reached('write')) ladder.push(rd.twoSided ? `${rd.iv.lo} ${rd.iv.loOpen ? '<' : '\\le'} ${v} ${rd.iv.hiOpen ? '<' : '\\le'} ${rd.iv.hi}` : `${v} ${REL_LATEX[Number.isFinite(rd.iv.lo) ? (rd.iv.loOpen ? '>' : '>=') : (rd.iv.hiOpen ? '<' : '<=')]} ${Number.isFinite(rd.iv.lo) ? rd.iv.lo : rd.iv.hi}`);
  if (rg) {
    rg.lines.forEach((l, i) => {
      if (!l.labelled && reached(`eq:${i}`)) ladder.push(`\\text{Line ${i + 1}: } ${l.readLatex}`);
      if (reached(`ineq:${i}`)) ladder.push(l.labelled ? l.written : l.readWritten);
    });
  }

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;

  /* ---------------------------------------------------------- figures */
  const regionFigure = rg && (
    <CoordGrid window={rg.grid} region={rg.lines.map((l) => l.half)} regionLabel="R"
      lines={rg.lines.map((l, i) => ({
        a: l.a, b: l.b, c: l.c, dashed: l.dashed,
        color: lineIdx === i && !itemDone ? LINE_COLORS[i % 4] : '#1e293b',
        glow: lineIdx === i && !itemDone,
        labelAt: l.labelAt,
        label: l.labelled ? l.eqLatex.replace(/\\dfrac\{([^}]*)\}\{([^}]*)\}/g, '($1)/$2').replace(/-/g, '−') : (itemDone || reached(`eq:${i}`) ? l.readLatex.replace(/\\dfrac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2').replace(/-/g, '−') : null),
      }))}
      points={test ? [{ x: test[0], y: test[1], label: `(${test[0]}, ${test[1]})`.replace(/-/g, '−'), color: '#7c3aed' }] : []}
      onPick={stageKey === 'ineq' && !locked ? (x, y) => setTest([x, y]) : null} />
  );
  const lineFigure = (stageKey === 'line') ? (
    <NumberLineSVG min={lineMin} max={lineMax} points={points} marks={shade} onTick={tapTick} onPoint={tapPoint} onRegion={tapRegion} readOnly={locked} accent={INK} />
  ) : null;
  const readFigure = rd ? (
    <NumberLineSVG min={item.min ?? -8} max={item.max ?? 8} points={readGraph.points} marks={readShade} readOnly accent={INK} />
  ) : null;

  const oneSided = (prefix = '', onEnter) => (
    <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
      <i className="font-serif">{v}</i>
      <RelPick value={typed[`${prefix}rel`]} state={marks[`${prefix}rel`]} disabled={locked} onChange={(r) => type(`${prefix}rel`, r)} label="sign" />
      <ValBox value={typed[`${prefix}val`]} state={marks[`${prefix}val`]} disabled={locked} onEnter={onEnter} label="the number" onChange={(x) => type(`${prefix}val`, x)} />
    </div>
  );
  const twoSided = (onEnter) => (
    <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
      <ValBox value={typed.lo} state={marks.lo} disabled={locked} onEnter={onEnter} label="the smaller number" onChange={(x) => type('lo', x)} />
      <RelPick value={typed.r1} state={marks.r1} only={['<', '<=']} disabled={locked} onChange={(r) => type('r1', r)} label="left sign" />
      <i className="font-serif">{v}</i>
      <RelPick value={typed.r2} state={marks.r2} only={['<', '<=']} disabled={locked} onChange={(r) => type('r2', r)} label="right sign" />
      <ValBox value={typed.hi} state={marks.hi} disabled={locked} onEnter={onEnter} label="the larger number" onChange={(x) => type('hi', x)} />
    </div>
  );

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 lg:items-start">
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <LandPlot className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">
                {m.kind === 'region' ? 'Regions' : m.kind === 'read' ? 'Number lines' : 'Solve the inequality'}
              </div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.solved}</div>
            </div>
            {item.prompt && <p className="px-4 pt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">{parseInlineText(item.prompt)}</p>}
            {m.kind === 'read' && <p className="px-4 pt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200"><Say text={`Write down the inequality, in terms of $${v}$, shown by the number line.`} /></p>}
            {m.kind === 'double' && item.integers && <p className="px-4 pt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200"><Say text={`Find the integer values of $${v}$ that satisfy the inequality.`} /></p>}
            {(m.kind === 'solve' || m.kind === 'double') && (
              <div className="px-4 py-4 text-center text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto [&_.katex]:inline-block"><SafeInlineMath math={ineqLatex(item.ineq)} /></div>
            )}
            {readFigure && <div className="px-3 py-3">{readFigure}</div>}
            {regionFigure && <div className="px-3 py-3 max-w-lg mx-auto">{regionFigure}</div>}
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-3 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s, i) => {
                  const [k, idx] = String(s).split(':');
                  const [label, Icon] = STAGES[k];
                  return <Stage key={s} icon={Icon} label={idx != null ? `${label} ${Number(idx) + 1}` : label} active={i === stageIdx} done={i < stageIdx || (i === stageIdx && locked)} />;
                })}
              </div>
            )}
          </div>

          {!itemDone && ladder.length > (m.kind === 'region' ? 0 : 1) && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Working so far</div>
              {ladder.map((l, i) => <div key={i} className="text-lg py-1 [&_.katex]:inline-block"><SafeInlineMath math={l} /></div>)}
            </div>
          )}
        </div>

        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              {stageKey === 'collect' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Letters on one side, numbers on the other.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <Say text={`Do the same to both sides, just like an equation. Tip: move the letters to the side with MORE of them — then nothing turns round.`} />
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                    <ValBox value={typed.a} state={marks.a} disabled={locked} onEnter={checkCollect} label={`number in front of ${v}`} width="w-16" onChange={(x) => type('a', x)} />
                    <i className="font-serif">{v}</i>
                    <RelPick value={typed.rel} state={marks.rel} disabled={locked} onChange={(r) => type('rel', r)} label="sign" />
                    <ValBox value={typed.b} state={marks.b} disabled={locked} onEnter={checkCollect} label="the number" onChange={(x) => type('b', x)} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setCollected(m.collected); fill([['a', typedText(m.collected.a)], ['b', typedText(m.collected.b)], ['rel', m.collected.rel]]); })} onCheck={checkCollect} onContinue={advance} />
                </>
              )}

              {stageKey === 'divide' && col && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`$${collectedLatex(col.a, col.rel, col.b)}$. Divide both sides by $${frLatex(col.a)}$.`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{numOf(col.a) < 0 ? 'That is a negative number. What happens to the sign?' : 'A positive number: the sign stays as it is.'}</p>
                  {oneSided('', checkDivide)}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => fill([['rel', divSol.rel], ['val', typedText(divSol.value)]]))} onCheck={checkDivide} onContinue={advance} />
                </>
              )}

              {stageKey === 'line' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`Show $${v} ${REL_LATEX[m.sol.rel]} ${frLatex(m.sol.value)}$ on the number line.`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Tap a number to put a circle on it — tap again to fill it in, again to remove it. Then tap above the line to shade the side that works.</p>
                  {lineFigure}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => revealLine(m.set))} onCheck={checkLine} onContinue={advance} />
                </>
              )}

              {stageKey === 'integers' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Tap every whole number that fits.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {m.kind === 'double' ? <Say text={`$${frLatex(m.final.lo)} ${REL_LATEX[m.final.r1]} ${v} ${REL_LATEX[m.final.r2]} ${frLatex(m.final.hi)}$ — check each end: is it included?`} /> : 'Check each end: is it included?'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chipRange.map((n) => {
                      const on = chosen.includes(n);
                      const isRight = ints.includes(n);
                      let style = on ? 'bg-violet-600 border-violet-800 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200';
                      if (locked) style = isRight ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300';
                      return (
                        <button key={n} disabled={locked} onClick={() => toggleChip(n)} className={`w-14 h-12 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg transition-all ${style}`}>
                          {n < 0 ? `−${-n}` : n}
                        </button>
                      );
                    })}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => setChosen(ints))} onCheck={checkIntegers} onContinue={advance} />
                </>
              )}

              {stageKey === 'all3' && d3 && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`The letter is only in the middle. ${numOf(d3.c) > 0 ? `Subtract ${frLatex(d3.c)} from` : `Add ${frLatex({ n: -d3.c.n, d: d3.c.d })} to`} all three parts.`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Whatever you do to the middle, do to both outside parts too.</p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <ValBox value={typed.lo} state={marks.lo} disabled={locked} onEnter={checkAll3} label="left part" onChange={(x) => type('lo', x)} />
                    <SafeInlineMath math={REL_LATEX[d3.rels[0]]} />
                    <ValBox value={typed.k} state={marks.k} disabled={locked} onEnter={checkAll3} label={`number in front of ${v}`} width="w-16" onChange={(x) => type('k', x)} />
                    <i className="font-serif">{v}</i>
                    <SafeInlineMath math={REL_LATEX[d3.rels[1]]} />
                    <ValBox value={typed.hi} state={marks.hi} disabled={locked} onEnter={checkAll3} label="right part" onChange={(x) => type('hi', x)} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => fill([['lo', typedText(d3.sub3.lo)], ['k', typedText(d3.a)], ['hi', typedText(d3.sub3.hi)]]))} onCheck={checkAll3} onContinue={advance} />
                </>
              )}

              {stageKey === 'divide3' && d3 && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`Divide all three parts by ${frLatex(d3.a)}.`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">A fraction like 5/2 is fine.</p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <ValBox value={typed.lo} state={marks.lo} disabled={locked} onEnter={checkDivide3} label="left end" onChange={(x) => type('lo', x)} />
                    <SafeInlineMath math={REL_LATEX[d3.rels[0]]} />
                    <i className="font-serif">{v}</i>
                    <SafeInlineMath math={REL_LATEX[d3.rels[1]]} />
                    <ValBox value={typed.hi} state={marks.hi} disabled={locked} onEnter={checkDivide3} label="right end" onChange={(x) => type('hi', x)} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => fill([['lo', typedText(d3.final.lo)], ['hi', typedText(d3.final.hi)]]))} onCheck={checkDivide3} onContinue={advance} />
                </>
              )}

              {stageKey === 'start' && ds && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">The letter is in more than one part. How do you start?</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Look where the letter is in each of the three parts.</p>
                  <div className="grid gap-2">
                    {startOpts.map((o, i) => {
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-violet-600 text-slate-900 dark:text-slate-100';
                      if (locked) style = o.correct ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : picked === i ? 'bg-rose-50 border-rose-400 text-rose-600' : 'opacity-50 border-slate-200 dark:border-slate-800 text-slate-400';
                      return (
                        <button key={o.id} disabled={locked} onClick={() => pickStart(i)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-lg text-left transition-all [&_.katex]:inline-block ${style}`}>
                          <SafeInlineMath math={o.latex} />
                        </button>
                      );
                    })}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {(stageKey === 'left' || stageKey === 'right') && half && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`Solve the ${stageKey} half: $${ineqLatex(half.src)}$`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Letters to the side with more of them, then divide. A fraction like 20/3 is fine — keep it exact.</p>
                  {oneSided('', checkHalf)}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => fill([['rel', half.sol.rel], ['val', typedText(half.sol.value)]]))} onCheck={checkHalf} onContinue={advance} />
                </>
              )}

              {stageKey === 'combine' && ds && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`Put the halves together: $${v} ${REL_LATEX[ds.left.sol.rel]} ${frLatex(ds.left.sol.value)}$ and $${v} ${REL_LATEX[ds.right.sol.rel]} ${frLatex(ds.right.sol.value)}$.`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Smaller number on the left, and each end keeps its own sign.</p>
                  {twoSided(checkCombine)}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => fill([['lo', typedText(ds.final.lo)], ['hi', typedText(ds.final.hi)], ['r1', ds.final.r1], ['r2', ds.final.r2]]))} onCheck={checkCombine} onContinue={advance} />
                </>
              )}

              {stageKey === 'write' && rd && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Write the inequality the line shows.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Open circle: the number is left out. Filled circle: it is included.</p>
                  {rd.twoSided ? twoSided(checkWrite) : oneSided('', checkWrite)}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => (rd.twoSided
                    ? fill([['lo', rd.iv.lo], ['hi', rd.iv.hi], ['r1', rd.iv.loOpen ? '<' : '<='], ['r2', rd.iv.hiOpen ? '<' : '<=']])
                    : fill([['rel', Number.isFinite(rd.iv.lo) ? (rd.iv.loOpen ? '>' : '>=') : (rd.iv.hiOpen ? '<' : '<=')], ['val', Number.isFinite(rd.iv.lo) ? rd.iv.lo : rd.iv.hi]])))}
                  onCheck={checkWrite} onContinue={advance} />
                </>
              )}

              {stageKey === 'eq' && ln && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    Line {lineIdx + 1} is not labelled. What is its equation?
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {ln.shape.kind === 'sloped' ? 'Gradient: up ÷ across between two grid points on the line. Intercept: where it crosses the y-axis.' : ln.shape.kind === 'vertical' ? 'An upright line: every point on it has the same x.' : 'A flat line: every point on it has the same y.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                    <i className="font-serif">{ln.shape.kind === 'vertical' ? 'x' : 'y'}</i>
                    <span className="font-black text-slate-500">=</span>
                    {ln.shape.kind === 'sloped' ? (
                      <>
                        <ValBox value={typed.m} state={marks.m} disabled={locked} onEnter={checkEq} label="gradient" width="w-16" onChange={(x) => type('m', x)} />
                        <i className="font-serif">x</i><span className="font-black text-slate-400">+</span>
                        <ValBox value={typed.k} state={marks.k} disabled={locked} onEnter={checkEq} label="intercept" width="w-16" onChange={(x) => type('k', x)} />
                      </>
                    ) : (
                      <ValBox value={typed.k} state={marks.k} disabled={locked} onEnter={checkEq} label="the number" width="w-16" onChange={(x) => type('k', x)} />
                    )}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => fill(ln.shape.kind === 'sloped' ? [['m', typedText(ln.shape.m)], ['k', typedText(ln.shape.k)]] : [['k', typedText(ln.shape.k)]]))} onCheck={checkEq} onContinue={advance} />
                </>
              )}

              {stageKey === 'ineq' && ln && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`Line ${lineIdx + 1} is **${ln.dashed ? 'dashed' : 'solid'}**. Which sign puts $R$ on the right side of it?`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <Say text={'Dashed: the line is not included ($<$ or $>$). Solid: it is ($\\le$ or $\\ge$). Tap a point inside $R$ on the grid to test it.'} />
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={lhsL} />
                    <RelPick value={typed.rel} state={marks.rel} disabled={locked} onChange={(r) => type('rel', r)} label="sign" />
                    <SafeInlineMath math={rhsL} />
                  </div>
                  {test && (
                    <div className="mt-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-100 dark:border-violet-900/40 p-3 text-base text-slate-800 dark:text-slate-100 [&_.katex]:inline-block">
                      <div className="text-[11px] font-black uppercase tracking-widest text-violet-700 dark:text-violet-300 mb-1">Testing ({test[0]}, {test[1]})</div>
                      <SafeInlineMath math={`${lhsL} \\to ${Number(sideValue('lhs', test).toFixed(3))}, \\qquad ${rhsL} \\to ${Number(sideValue('rhs', test).toFixed(3))}`} />
                    </div>
                  )}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => fill([['rel', wantRel]]))} onCheck={checkIneq} onContinue={advance} />
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
                {m.kind === 'solve' && item.line && (
                  <div className="mt-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-2">
                    <NumberLineSVG min={lineMin} max={lineMax} points={graphOfSet(m.set).points}
                      marks={graphOfSet(m.set).shaded.map((i) => { const b = [NEG_INF, ...graphOfSet(m.set).points.map((p) => p.x), POS_INF]; return repOf(b[i], b[i + 1], lineMin, lineMax); })} readOnly accent={INK} />
                  </div>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(124,58,237,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Answer</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={rg ? rg.lines.map((l) => (l.labelled ? l.written : l.readWritten)).join(', \\quad ') : ladder[ladder.length - 1]} />
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
    </div>
  );
}
