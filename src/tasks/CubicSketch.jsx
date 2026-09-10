import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Spline, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  Target, TrendingUp, TrendingDown, FlipVertical2, Scissors, Crosshair, MousePointerClick,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeBlockMath, SafeInlineMath } from '../components/notes/SafeMath.jsx';
import CubicFigure from '../components/math/CubicFigure.jsx';
import {
  rootsOf, yInterceptOf, endBehaviourOf, leadingOf, arcsOf, factorLatex, expandedLatex, expandCubic,
} from '../utils/cubic';
import { fracLatex, fracText } from '../utils/modulus';
import { answersEquivalent, compileExpr } from '../utils/mathEquivalence';
import { evaluate, polyLatex } from '../utils/polynomial';

/* ------------------------------------------------------------------ *
 * SKETCH IT — a cubic in factorised form, sketched the way the book
 * sketches it, one decision at a time.
 *
 * Reads a unit's `cubicSketch`:
 *   {
 *     title, intro,
 *     items: [{ id, factors: [[p, q], [p, q], [p, q]], k?, display?,
 *               expanded?, modulus?, note? }]
 *   }
 *
 * The item stores only the factors (and the printed forms). utils/cubic.js
 * derives the x-intercepts and their multiplicity, the y-intercept, the end
 * behaviour, and which pieces of the curve lie below the axis. The stages
 * are the book's own working, in the book's order:
 *
 *   0. FACTORISE     (only when the question prints the expanded form)
 *                    three boxes, one factor each — marked by multiplying
 *                    them back, so any correct factorisation is accepted
 *   1. X-INTERCEPTS  one box per factor, any order; a repeated root is typed
 *                    twice, exactly as the book writes "x = 1 (repeated)"
 *   2. Y-INTERCEPT   put x = 0
 *   3. END BEHAVIOUR which way does the right-hand tail go? — the sign of
 *                    the product of the x coefficients, and the decision
 *                    that fixes the whole shape
 *   4. CROSS OR TOUCH at each root — an odd power crosses, an even one
 *                    touches; the curve is then drawn in front of the student
 *   5. REFLECT       (only for a modulus) tap every piece below the axis;
 *                    those pieces fold up and the sketch of |f(x)| appears
 *
 * A wrong answer can be retried; a second wrong answer or "Show me" fills the
 * stage in and the item pays half. The finished sketch, with its intercepts,
 * sits under "Copy this into your book".
 * ------------------------------------------------------------------ */

const INK = '#2563eb';
const INK_DARK = '#1e40af';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const AMBER = '#f59e0b';

const T = {
  title: 'Sketch It',
  check: 'Check',
  stuck: 'Show me',
  next: 'Next curve',
  finish: 'Finish',
  cont: 'Continue',
  solved: 'sketched',
  clean: 'Every decision right first time.',
  helped: 'Sketched — with a step or two shown to you.',
  bookCopy: 'Copy this sketch into your book',
  stages: { factor: 'Factorise', roots: 'x-intercepts', yint: 'y-intercept', end: 'End behaviour', touch: 'Cross or touch', reflect: 'Reflect' },
  factorQ: 'Write the function as a product of three linear factors, one in each box. Start by taking out a common factor, or find one factor with the factor theorem.',
  rootsQ: 'Where does the curve meet the x-axis? Put y = 0: each factor gives one value. Type one per box, in any order.',
  yintQ: 'Where does the curve meet the y-axis? Put x = 0.',
  endQ: 'As x gets very large and positive, which way does y go? Multiply the x coefficients (and the number in front) to decide.',
  touchQ: 'At each x-intercept, does the curve cross the axis or just touch it and turn back? A squared factor touches.',
  reflectQ: 'For the modulus graph, every piece below the x-axis is reflected upwards. Tap every piece that is below the axis, then reflect.',
  fillAll: 'Fill in every box first.',
  notLinear: 'Each box must hold a LINEAR factor — an x term and a number, nothing squared.',
  notProduct: 'Those three multiply out to something else. Check the signs and the constant term.',
  pickBoth: 'Decide cross or touch for every intercept first.',
  tapSome: 'Tap at least one piece of the curve first.',
  wrongArcsMissing: 'There is another piece below the axis you have not tapped. Follow the curve from left to right.',
  wrongArcsExtra: 'One of the pieces you tapped is ABOVE the axis. The modulus leaves those alone.',
  up: 'y → +∞  (the right tail climbs)',
  down: 'y → −∞  (the right tail falls)',
  reflectBtn: 'Reflect the pieces',
  cross: 'crosses',
  touch: 'touches',
  typeHint: 'Fractions are fine: type 1/2.',
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const STAGE_ICON = { factor: Scissors, roots: Crosshair, yint: Target, end: TrendingUp, touch: MousePointerClick, reflect: FlipVertical2 };

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

/** Is a typed expression a non-constant linear function of x? */
function isLinearExpr(src) {
  try {
    const { fn } = compileExpr(src);
    const f = (x) => fn({ x });
    const vals = [0, 1, 2, 3, 4].map(f);
    if (vals.some((v) => !Number.isFinite(v))) return false;
    const second = Math.abs(vals[2] - 2 * vals[1] + vals[0]) + Math.abs(vals[4] - 2 * vals[3] + vals[2]);
    const slope = Math.abs(vals[1] - vals[0]);
    return second < 1e-9 && slope > 1e-9;
  } catch { return false; }
}

/** Do three typed factors multiply back to the polynomial? */
function productMatches(srcs, coeffs) {
  try {
    const fns = srcs.map((s) => compileExpr(s).fn);
    return [0.5, 1.7, -2.3, 3.1, -0.4].every((x) => {
      const p = fns.reduce((acc, fn) => acc * fn({ x }), 1);
      const want = evaluate(coeffs, x);
      return Math.abs(p - want) <= 1e-6 * (1 + Math.abs(want));
    });
  } catch { return false; }
}

const HelpBtn = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
    <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
  </button>
);
const GoBtn = ({ onClick, label }) => (
  <button onClick={onClick} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
    {label} {label === T.cont && <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />}
  </button>
);

const boxClass = (st) => `px-3 py-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center focus:outline-none focus:border-blue-500 disabled:opacity-70 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100
  ${st === 'ok' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30' : st === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : st === 'bad' ? 'border-rose-400' : 'border-slate-300 dark:border-slate-600'}`;

export default function CubicSketch({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => {
    const list = (pool?.items || []).filter((it) => Array.isArray(it?.factors) && it.factors.length === 3);
    return list.map((it, i) => ({ ...it, id: it.id || `cs${i}` }));
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
  // stage working
  const [factors, setFactors] = useState(['', '', '']);
  const [factorState, setFactorState] = useState(null);   // 'ok' | 'shown'
  const [factorWrongs, setFactorWrongs] = useState(0);
  const [roots, setRoots] = useState(['', '', '']);
  const [rootState, setRootState] = useState([null, null, null]);
  const [rootWrongs, setRootWrongs] = useState(0);
  const [yTyped, setYTyped] = useState('');
  const [yState, setYState] = useState(null);
  const [yWrongs, setYWrongs] = useState(0);
  const [endPick, setEndPick] = useState(null);           // { dir, ok }
  const [touchPick, setTouchPick] = useState({});         // root index -> 'cross' | 'touch'
  const [touchResult, setTouchResult] = useState(null);   // { ok }
  const [arcSel, setArcSel] = useState([]);
  const [arcResult, setArcResult] = useState(null);       // { ok }
  const [arcWrongs, setArcWrongs] = useState(0);
  const firstBox = useRef(null);

  const item = items[pos];
  const derived = useMemo(() => {
    if (!item) return null;
    try {
      return {
        roots: rootsOf(item),
        yInt: yInterceptOf(item),
        end: endBehaviourOf(item),
        lead: leadingOf(item),
        arcs: arcsOf(item),
        coeffs: expandCubic(item),
        // every root, with repeats, as the boxes expect them
        rootList: rootsOf(item).flatMap((r) => Array.from({ length: r.mult }, () => r.x)),
      };
    } catch { return null; }
  }, [item]);

  const stages = useMemo(() => {
    if (!item) return [];
    const s = [];
    if (item.expanded) s.push('factor');
    s.push('roots', 'yint', 'end', 'touch');
    if (item.modulus) s.push('reflect');
    return s;
  }, [item]);
  const stage = stages[stageIdx];
  const curveVisible = itemDone || stage === 'reflect';

  useEffect(() => { if (stage === 'roots' || stage === 'factor') firstBox.current?.focus(); }, [stage]);

  if (!items.length || !derived) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No curves yet</h2>
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

  const advance = (nowHelped) => {
    setFlash(null);
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); return; }
    const nextResults = { ...results, [item.id]: { score: nowHelped ? 0.5 : 1 } };
    setResults(nextResults);
    setItemDone(true);
    const { raw, blob, log } = summary(nextResults);
    onProgress?.(raw, blob, { items: log });
  };

  /* ---------------------------------------------------------- factorise */
  const revealFactors = () => {
    setFactors(item.factors.map(([p, q]) => polyLatex([p, q]).replace(/\s/g, '')));
    setFactorState('shown');
    setHelped(true);
  };
  const checkFactors = () => {
    if (factorState) return;
    if (factors.some((f) => !f.trim())) { say(T.fillAll); return; }
    if (!factors.every(isLinearExpr)) { say(T.notLinear); bumpFactorWrong(); return; }
    if (!productMatches(factors, derived.coeffs)) { say(T.notProduct); bumpFactorWrong(); return; }
    setFactorState('ok');
  };
  const bumpFactorWrong = () => {
    const n = factorWrongs + 1;
    setFactorWrongs(n);
    if (n >= 2) revealFactors();
  };

  /* ---------------------------------------------------------- roots */
  const checkRoots = () => {
    const live = [0, 1, 2].filter((i) => rootState[i] !== 'ok' && rootState[i] !== 'shown');
    if (live.some((i) => !String(roots[i] ?? '').trim())) { say(T.fillAll); return; }
    // Greedy multiset match: each typed value claims one unclaimed root.
    const pool = derived.rootList.map((x) => ({ x, used: false }));
    const state = [...rootState];
    for (const i of [0, 1, 2]) {
      if (state[i] === 'ok' || state[i] === 'shown') {
        const hit = pool.find((r) => !r.used && answersEquivalent(String(roots[i]), fracLatex(r.x)));
        if (hit) hit.used = true;
      }
    }
    for (const i of live) {
      const hit = pool.find((r) => !r.used && answersEquivalent(String(roots[i]), fracLatex(r.x)));
      if (hit) { hit.used = true; state[i] = 'ok'; } else state[i] = 'bad';
    }
    let nowHelped = helped;
    if (state.some((s) => s === 'bad')) {
      const n = rootWrongs + 1;
      setRootWrongs(n);
      if (n >= 2) {
        const typedNext = [...roots];
        for (const i of [0, 1, 2]) {
          if (state[i] === 'bad') {
            const left = pool.find((r) => !r.used);
            if (left) { left.used = true; typedNext[i] = fracText(left.x).replace('−', '-'); state[i] = 'shown'; }
          }
        }
        setRoots(typedNext);
        nowHelped = true;
      }
    }
    setRootState(state);
    if (nowHelped !== helped) setHelped(nowHelped);
    if (state.every((s) => s === 'ok' || s === 'shown')) advance(nowHelped);
  };
  const showRoots = () => {
    setRoots(derived.rootList.map((x) => fracText(x).replace('−', '-')));
    setRootState(['shown', 'shown', 'shown']);
    setHelped(true);
    advance(true);
  };

  /* ---------------------------------------------------------- y-intercept */
  const checkY = () => {
    if (!String(yTyped).trim()) { say(T.fillAll); return; }
    if (answersEquivalent(String(yTyped), fracLatex(derived.yInt))) { setYState('ok'); advance(helped); return; }
    const n = yWrongs + 1;
    setYWrongs(n);
    if (n >= 2) { setYTyped(fracText(derived.yInt).replace('−', '-')); setYState('shown'); setHelped(true); advance(true); }
    else setYState('bad');
  };
  const showY = () => { setYTyped(fracText(derived.yInt).replace('−', '-')); setYState('shown'); setHelped(true); advance(true); };

  /* ---------------------------------------------------------- end behaviour */
  const pickEnd = (dir) => {
    if (endPick) return;
    const ok = dir === derived.end;
    setEndPick({ dir, ok });
    if (!ok) setHelped(true);
  };

  /* ---------------------------------------------------------- cross or touch */
  const checkTouch = () => {
    if (touchResult) return;
    if (derived.roots.some((_, i) => !touchPick[i])) { say(T.pickBoth); return; }
    const ok = derived.roots.every((r, i) => touchPick[i] === (r.touches ? 'touch' : 'cross'));
    setTouchResult({ ok });
    if (!ok) { setTouchPick(Object.fromEntries(derived.roots.map((r, i) => [i, r.touches ? 'touch' : 'cross']))); setHelped(true); }
  };
  const showTouch = () => {
    setTouchPick(Object.fromEntries(derived.roots.map((r, i) => [i, r.touches ? 'touch' : 'cross'])));
    setTouchResult({ ok: false });
    setHelped(true);
  };

  /* ---------------------------------------------------------- reflect */
  const belowSet = derived.arcs.filter((a) => a.below).map((a) => a.i);
  const toggleArc = (arc) => {
    if (arcResult) return;
    setArcSel((s) => (s.includes(arc.i) ? s.filter((i) => i !== arc.i) : [...s, arc.i]));
  };
  const checkArcs = () => {
    if (arcResult) return;
    if (!arcSel.length) { say(T.tapSome); return; }
    const ok = arcSel.length === belowSet.length && belowSet.every((i) => arcSel.includes(i));
    if (ok) { setArcResult({ ok: true }); return; }
    const n = arcWrongs + 1;
    setArcWrongs(n);
    say(arcSel.some((i) => !belowSet.includes(i)) ? T.wrongArcsExtra : T.wrongArcsMissing);
    if (n >= 2) { setArcSel(belowSet); setArcResult({ ok: false }); setHelped(true); }
  };
  const showArcs = () => { setArcSel(belowSet); setArcResult({ ok: false }); setHelped(true); };

  /* ---------------------------------------------------------- flow */
  const resetItem = () => {
    setStageIdx(0); setHelped(false); setItemDone(false); setFlash(null);
    setFactors(['', '', '']); setFactorState(null); setFactorWrongs(0);
    setRoots(['', '', '']); setRootState([null, null, null]); setRootWrongs(0);
    setYTyped(''); setYState(null); setYWrongs(0);
    setEndPick(null); setTouchPick({}); setTouchResult(null);
    setArcSel([]); setArcResult(null); setArcWrongs(0);
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
  const questionTex = item.expanded && factorState !== 'ok' && factorState !== 'shown' && !itemDone
    ? `y = ${expandedLatex(item)}`
    : `y = ${item.modulus ? `|${factorLatex(item)}|` : factorLatex(item)}`;
  const showFigure = stage !== 'factor' || itemDone;

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 pb-10 flex flex-col gap-3">

        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          <div className="px-4 sm:px-5 py-3 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
            <Spline className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <div className="text-[11px] font-black uppercase tracking-widest opacity-90">
              {item.expanded ? 'Factorise, then sketch' : item.modulus ? 'Sketch the curve, then its modulus' : 'Sketch the curve'}
            </div>
            <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.solved}</div>
          </div>
          <div className="px-4 sm:px-6 py-4 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
            <SafeBlockMath math={questionTex} />
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

        <div className="min-h-[1.5rem] flex items-center">
          {flash?.text && (
            <div className="flex items-center gap-2 font-bold text-sm animate-in fade-in slide-in-from-top-1" style={{ color: flash.kind === 'bad' ? RED : GREEN }}>
              {flash.kind === 'bad' ? <XCircle className="w-5 h-5 shrink-0" strokeWidth={2.5} /> : <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
              {flash.text}
            </div>
          )}
        </div>

        {/* The sketch, building up: axes → intercepts → the curve → the modulus */}
        {showFigure && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm p-2 relative">
            <CubicFigure
              item={item}
              showCurve={curveVisible}
              showRoots={itemDone || stageIdx > stages.indexOf('roots')}
              showY={itemDone || stageIdx > stages.indexOf('yint')}
              reflected={!!arcResult && item.modulus}
              selected={arcSel}
              arcsTappable={stage === 'reflect' && !arcResult}
              onArc={toggleArc}
            />
            {stage === 'reflect' && !arcResult && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest">
                <MousePointerClick className="w-3.5 h-3.5" strokeWidth={3} /> tap the pieces
              </div>
            )}
          </div>
        )}

        {/* ---------------- factorise ---------------- */}
        {!itemDone && stage === 'factor' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.factorQ}</div>
            <div className="flex flex-wrap items-center justify-center gap-1 text-2xl text-slate-800 dark:text-slate-100">
              <span className="italic font-serif">y =</span>
              {[0, 1, 2].map((i) => (
                <span key={i} className="flex items-center">
                  <span className="text-3xl font-light">(</span>
                  <input ref={i === 0 ? firstBox : undefined} value={factors[i]} disabled={!!factorState}
                    onChange={(e) => setFactors((v) => { const n = [...v]; n[i] = e.target.value; return n; })}
                    onKeyDown={(e) => { if (e.key === 'Enter') checkFactors(); }}
                    placeholder="?" spellCheck={false} autoComplete="off"
                    className={`w-28 ${boxClass(factorState)}`} />
                  <span className="text-3xl font-light">)</span>
                </span>
              ))}
            </div>
            <div className="mt-2 text-center text-[11px] font-bold text-slate-400">Type factors like 2x-1 or 3-x. Any order, any correct signs.</div>
            <div className="mt-3 flex items-center justify-end gap-2">
              {!factorState ? (<><HelpBtn onClick={revealFactors} /><GoBtn onClick={checkFactors} label={T.check} /></>)
                : <GoBtn onClick={() => advance(helped)} label={T.cont} />}
            </div>
          </div>
        )}

        {/* ---------------- roots ---------------- */}
        {!itemDone && stage === 'roots' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.rootsQ}</div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 text-xl text-slate-800 dark:text-slate-100">
                  <span className="italic font-serif">x =</span>
                  <input ref={i === 0 ? firstBox : undefined} value={roots[i]} disabled={rootState[i] === 'ok' || rootState[i] === 'shown'}
                    onChange={(e) => { setRoots((v) => { const n = [...v]; n[i] = e.target.value; return n; }); if (rootState[i] === 'bad') setRootState((v) => { const n = [...v]; n[i] = null; return n; }); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') checkRoots(); }}
                    placeholder="?" spellCheck={false} autoComplete="off"
                    className={`w-24 ${boxClass(rootState[i])}`} />
                  {rootState[i] === 'ok' && <CheckCircle2 className="w-5 h-5 text-[#58a700]" strokeWidth={3} />}
                  {rootState[i] === 'bad' && <XCircle className="w-5 h-5 text-rose-400" strokeWidth={3} />}
                  {rootState[i] === 'shown' && <Lightbulb className="w-5 h-5 text-amber-500" strokeWidth={3} />}
                </div>
              ))}
            </div>
            <div className="mt-2 text-center text-[11px] font-bold text-slate-400">{T.typeHint} A repeated root is typed twice.</div>
            <div className="mt-3 flex items-center justify-end gap-2"><HelpBtn onClick={showRoots} /><GoBtn onClick={checkRoots} label={T.check} /></div>
          </div>
        )}

        {/* ---------------- y-intercept ---------------- */}
        {!itemDone && stage === 'yint' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.yintQ}</div>
            <div className="flex items-center justify-center gap-2 text-xl text-slate-800 dark:text-slate-100">
              <span className="italic font-serif">y =</span>
              <input autoFocus value={yTyped} disabled={yState === 'ok' || yState === 'shown'}
                onChange={(e) => { setYTyped(e.target.value); if (yState === 'bad') setYState(null); }}
                onKeyDown={(e) => { if (e.key === 'Enter') checkY(); }}
                placeholder="?" spellCheck={false} autoComplete="off" className={`w-28 ${boxClass(yState)}`} />
              {yState === 'bad' && <XCircle className="w-5 h-5 text-rose-400" strokeWidth={3} />}
            </div>
            <div className="mt-2 text-center text-[11px] font-bold text-slate-400">Multiply the constants from every bracket — and the number in front.</div>
            <div className="mt-3 flex items-center justify-end gap-2"><HelpBtn onClick={showY} /><GoBtn onClick={checkY} label={T.check} /></div>
          </div>
        )}

        {/* ---------------- end behaviour ---------------- */}
        {!itemDone && stage === 'end' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.endQ}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {['up', 'down'].map((dir) => {
                const chosen = endPick?.dir === dir;
                const isRight = dir === derived.end;
                let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200';
                if (endPick) {
                  if (isRight) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                  else if (chosen) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
                  else style = 'opacity-50 border-slate-200 dark:border-slate-800 text-slate-400';
                }
                return (
                  <button key={dir} disabled={!!endPick} onClick={() => pickEnd(dir)} className={`flex items-center gap-3 rounded-xl border-2 border-b-[4px] p-3 text-left font-black text-sm transition-all ${style}`}>
                    {dir === 'up' ? <TrendingUp className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <TrendingDown className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                    <span>As x → +∞, {dir === 'up' ? T.up : T.down}</span>
                  </button>
                );
              })}
            </div>
            {endPick && (
              <div className="mt-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                The x³ coefficient is {item.k && item.k !== 1 ? `${item.k} × ` : ''}{item.factors.map(([p]) => p).join(' × ')} = <span className="font-black">{derived.lead}</span>, which is {derived.lead > 0 ? 'positive, so the curve climbs to the right and falls to the left' : 'negative, so the curve falls to the right and climbs to the left'}.
              </div>
            )}
            <div className="mt-3 flex items-center justify-end gap-2">{endPick && <GoBtn onClick={() => advance(helped)} label={T.cont} />}</div>
          </div>
        )}

        {/* ---------------- cross or touch ---------------- */}
        {!itemDone && stage === 'touch' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3">{T.touchQ}</div>
            <div className="flex flex-col gap-2">
              {derived.roots.map((r, i) => {
                const want = r.touches ? 'touch' : 'cross';
                return (
                  <div key={i} className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 p-3">
                    <span className="text-lg text-slate-800 dark:text-slate-100 w-24"><SafeInlineMath math={`x = ${fracLatex(r.x, { d: false })}`} /></span>
                    {['cross', 'touch'].map((k) => {
                      const on = touchPick[i] === k;
                      const good = touchResult && k === want;
                      return (
                        <button key={k} disabled={!!touchResult} onClick={() => setTouchPick((v) => ({ ...v, [i]: k }))}
                          className={`px-4 py-2 rounded-lg border-2 border-b-[4px] text-xs font-black uppercase tracking-widest transition-all
                            ${good ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
                              : on ? 'text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-500'}`}
                          style={on && !good ? { backgroundColor: INK } : undefined}>
                          {k === 'cross' ? T.cross : T.touch}
                        </button>
                      );
                    })}
                    {touchResult && (
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">
                        {r.touches ? `the factor appears ${r.mult} times — an even power touches` : 'the factor appears once — it crosses'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              {!touchResult ? (<><HelpBtn onClick={showTouch} /><GoBtn onClick={checkTouch} label={T.check} /></>)
                : <GoBtn onClick={() => advance(helped)} label={T.cont} />}
            </div>
          </div>
        )}

        {/* ---------------- reflect ---------------- */}
        {!itemDone && stage === 'reflect' && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-1">{T.reflectQ}</div>
            <div className="text-xs font-bold text-slate-400 mb-3">Selected: {arcSel.length} piece{arcSel.length === 1 ? '' : 's'}</div>
            <div className="flex items-center justify-end gap-2">
              {!arcResult ? (<><HelpBtn onClick={showArcs} /><GoBtn onClick={checkArcs} label={T.reflectBtn} /></>)
                : <GoBtn onClick={() => advance(helped)} label={T.cont} />}
            </div>
          </div>
        )}

        {/* ---------------- done ---------------- */}
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
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 text-base sm:text-lg space-y-1">
                {item.expanded && <div><SafeInlineMath math={`y = ${expandedLatex(item)} = ${factorLatex(item)}`} /></div>}
                <div><SafeInlineMath math={`\\text{When } x = 0,\\; y = ${fracLatex(derived.yInt, { d: false })}`} /></div>
                <div><SafeInlineMath math={`\\text{When } y = 0,\\; x = ${derived.roots.map((r) => `${fracLatex(r.x, { d: false })}${r.mult > 1 ? '\\text{ (repeated)}' : ''}`).join(',\\; ')}`} /></div>
                <div><SafeInlineMath math={`\\text{As } x \\to +\\infty,\\; y \\to ${derived.end === 'up' ? '+' : '-'}\\infty;\\quad \\text{as } x \\to -\\infty,\\; y \\to ${derived.end === 'up' ? '-' : '+'}\\infty`} /></div>
                {item.modulus && <div className="text-sm font-bold text-slate-500 dark:text-slate-400">For the modulus, the pieces below the axis are reflected in the x-axis; every intercept stays where it is.</div>}
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
