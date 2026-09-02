import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Divide, Construction, CheckCircle2, XCircle, ArrowRight, ArrowDown,
  Lightbulb, RotateCcw, Trophy, Sparkles, Minus,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeBlockMath } from '../components/notes/SafeMath.jsx';
import {
  divide, polyLatex, resultLatex, termBody, degreeOf, isZero,
} from '../utils/polynomial';

/* ------------------------------------------------------------------ *
 * LONG DIVISION — the written algorithm for polynomials, one column at
 * a time.
 *
 * The item stores ONLY a dividend and a divisor, both as coefficient
 * arrays. Every quotient term, every product row and every subtraction
 * is derived by utils/polynomial.js, so there is no authored answer key
 * to drift, and `npm run validate` checks an item is answerable using
 * the very code this screen grades with. Same rule as Number Gym,
 * Graph It and Vectors.
 *
 * Reads a unit's `polyDiv`:
 *   {
 *     title, intro,
 *     items: [{ id, dividend: [1,-5,8,-4], divisor: [1,-2], note? }]
 *   }
 *
 * WHY IT LOOKS LIKE THIS. The mistake students make in this topic is not
 * arithmetic, it is ALIGNMENT: an x² landing in the x column, a missing
 * power never written as 0x², a subtraction where only the first term
 * got its sign flipped. So the screen is a column grid — one column per
 * power, labelled at the top, with the dividend written out in full
 * INCLUDING its zero terms. Nothing can be typed into the wrong column
 * because the column decides the power for you; all the student supplies
 * is the number.
 *
 * THE FOUR MOVES. Each pass is broken into the three things the textbook
 * annotates in its margin — divide, multiply, subtract — and the app
 * performs the fourth (bring down) in front of them, in amber, with an
 * arrow. Only one move is live at a time and the instruction above the
 * grid names it with this problem's actual terms ("Divide -3x² by x"),
 * so the method is learned as a sentence, not as a shape to copy.
 *
 * A cell wrong twice is filled in and the item pays half, so a stuck
 * student is never truly stuck. When the last subtraction lands, the
 * finished statement is printed both ways round —
 * P(x) = (divisor)(quotient) + remainder, and the fraction form — which
 * is the sentence the exam asks for and the bridge to the factor theorem
 * (remainder 0 means the divisor is a factor).
 * ------------------------------------------------------------------ */

const INK = '#4338ca';        // the task colour (indigo)
const INK_DARK = '#312e81';
const GREEN = '#58cc02';      // an accepted cell
const RED = '#ff4b4b';        // a wrong cell
const AMBER = '#f59e0b';      // a revealed cell, and the brought-down terms
const COL = 74;               // px per power column; every row uses the same grid

const T = {
  title: 'Long Division',
  check: 'Check',
  next: 'Next',
  finish: 'Finish',
  bankHere: 'Finish & bank XP',
  cleared: 'solved',
  empty: 'Fill in every box first.',
  clean: 'Every box right first time.',
  helped: 'Solved — but a box had to be filled in for you.',
  divide: 'Divide',
  multiply: 'Multiply',
  subtract: 'Subtract',
  bring: 'Bring down',
  quotient: 'Quotient',
  remainder: 'remainder',
  isFactor: 'The remainder is 0, so the divisor is a factor of the polynomial.',
  notFactor: 'The remainder is not 0, so the divisor is not a factor.',
  reasons: {
    q: 'Divide the FIRST term of the row above by the FIRST term of the divisor — nothing else.',
    p: 'Multiply every term of the divisor by the quotient term you just wrote. Watch the signs.',
    d: 'Subtract the row below from the row above, column by column. Subtracting a negative adds.',
  },
};

/* ------------------------------------------------------------- helpers */

/** Parse a typed coefficient: an optional minus and digits. */
function parseCoef(text) {
  const t = String(text ?? '').replace(/[^0-9-]/g, '').replace(/(?!^)-/g, '');
  if (t === '' || t === '-') return NaN;
  return Number(t);
}

/** The power label for a column: x³ … x, 1. */
function PowerLabel({ deg, className = '' }) {
  if (deg === 0) return <span className={className}>1</span>;
  return (
    <span className={className}>
      <span className="italic">x</span>
      {deg > 1 && <sup className="text-[0.7em]">{deg}</sup>}
    </span>
  );
}

/**
 * One written term in its column: the operator sign, then the body.
 * `lead` drops a leading plus, exactly as it is written on paper.
 */
function Term({ coef, deg, lead = false, tone = 'ink', spaced = false }) {
  const color =
    tone === 'locked' ? 'text-[#3e7500] dark:text-[#8ee000]'
      : tone === 'bring' ? 'text-amber-600 dark:text-amber-400'
        : tone === 'faint' ? 'text-slate-400 dark:text-slate-600'
          : 'text-slate-800 dark:text-slate-100';
  const sign = coef < 0 ? '−' : lead ? '' : '+';
  const body = termBody(coef, deg);
  // termBody gives "3x^{2}" style text; rebuild it with a real superscript so
  // the columns keep one baseline (KaTeX per cell would not line up).
  const m = /^(\d*)x?(?:\^\{(\d+)\})?$/.exec(body);
  const num = m ? m[1] : body;
  return (
    <span className={`font-mono font-black tabular-nums ${color} whitespace-nowrap ${spaced && !lead ? 'ml-1.5' : ''}`}>
      {sign && <span className="mr-0.5">{sign}</span>}
      {num}
      {deg > 0 && (
        <>
          <span className="italic font-serif">x</span>
          {deg > 1 && <sup className="text-[0.65em]">{deg}</sup>}
        </>
      )}
    </span>
  );
}

/** A live coefficient box, with the column's power printed faintly inside. */
function CoefBox({ value, deg, state, onChange, onEnter, refEl }) {
  const border = state === 'error' ? RED : state === 'live' ? INK : null;
  return (
    <div className="relative">
      <input
        ref={refEl}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
        inputMode="text"
        maxLength={5}
        aria-label={`coefficient of x^${deg}`}
        placeholder="?"
        className="w-full h-11 rounded-lg border-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100
          text-center pr-5 font-mono font-black text-lg tabular-nums outline-none transition-colors
          border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900
          placeholder:text-slate-300 dark:placeholder:text-slate-700"
        style={border ? { borderColor: border } : undefined}
      />
      <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[11px] font-black text-slate-400 dark:text-slate-600">
        <PowerLabel deg={deg} />
      </span>
    </div>
  );
}

/* -------------------------------------------------------------- screen */

export default function PolyDivision({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => {
    const list = (pool?.items || []).filter((it) => it?.dividend && it?.divisor);
    return list.map((it, i) => ({ ...it, id: it.id || `pd${i}`, isLast: i === list.length - 1 }));
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
  const [stepIdx, setStepIdx] = useState(0);
  const [stage, setStage] = useState('q');          // q → p → d, then the next step
  const [entries, setEntries] = useState({});
  const [locked, setLocked] = useState({});
  const [errors, setErrors] = useState({});
  const [wrongs, setWrongs] = useState({});
  const [helped, setHelped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [flash, setFlash] = useState(null);
  const [ended, setEnded] = useState(false);
  const firstBox = useRef(null);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return divide(item.dividend, item.divisor); } catch { return null; }
  }, [item]);

  useEffect(() => { firstBox.current?.focus(); }, [stepIdx, stage, pos]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No divisions yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px]" style={{ backgroundColor: INK, borderColor: INK_DARK }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  const N = degreeOf(model.dividend);
  const steps = model.steps;
  const step = steps[stepIdx];
  const gutter = Math.max(104, polyLatex(model.divisor).replace(/[{}^\\]/g, '').length * 11 + 34);
  const gridW = (N + 1) * COL;
  const colOf = (deg) => N - deg + 1;   // 1-based grid column for a power

  const cid = (i, which, deg) => `s${i}:${which}:${deg}`;

  /** The cells the student is filling in right now. */
  const liveCells = itemDone ? [] : stage === 'q'
    ? [{ id: cid(stepIdx, 'q', step.qDeg), deg: step.qDeg, value: step.qCoef }]
    : stage === 'p'
      ? step.prod.map((c) => ({ id: cid(stepIdx, 'p', c.deg), deg: c.deg, value: c.coef }))
      : step.diff.map((c) => ({ id: cid(stepIdx, 'd', c.deg), deg: c.deg, value: c.coef }));

  const say = (text) => {
    setFlash(text);
    setTimeout(() => setFlash((f) => (f === text ? null : f)), 3500);
  };

  const check = () => {
    if (itemDone) return;
    if (liveCells.some((c) => !locked[c.id] && Number.isNaN(parseCoef(entries[c.id])))) {
      say(T.empty);
      return;
    }
    const nextLocked = { ...locked };
    const nextErrors = {};
    const nextWrongs = { ...wrongs };
    const nextEntries = { ...entries };
    let nowHelped = helped;

    for (const c of liveCells) {
      if (nextLocked[c.id]) continue;
      if (parseCoef(entries[c.id]) === c.value) {
        nextLocked[c.id] = true;
        nextEntries[c.id] = String(c.value);
        continue;
      }
      const count = (nextWrongs[c.id] || 0) + 1;
      nextWrongs[c.id] = count;
      if (count >= 2) {
        nextLocked[c.id] = true;
        nextEntries[c.id] = String(c.value);
        nowHelped = true;
      } else {
        nextErrors[c.id] = stage;
      }
    }
    setLocked(nextLocked);
    setErrors(nextErrors);
    setWrongs(nextWrongs);
    setEntries(nextEntries);
    if (nowHelped !== helped) setHelped(nowHelped);
    if (!liveCells.every((c) => nextLocked[c.id])) return;

    setFlash(null);
    if (stage === 'q') setStage('p');
    else if (stage === 'p') setStage('d');
    else if (stepIdx + 1 < steps.length) { setStepIdx((s) => s + 1); setStage('q'); }
    else {
      const nextResults = { ...results, [item.id]: { score: nowHelped ? 0.5 : 1 } };
      setResults(nextResults);
      setItemDone(true);
      const { raw, blob, log } = summary(nextResults);
      onProgress?.(raw, blob, { items: log });
    }
  };

  const summary = (res) => {
    const total = items.length;
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = total ? Math.round((cleared / total) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  const resetItem = () => {
    setStepIdx(0); setStage('q'); setEntries({}); setLocked({}); setErrors({});
    setWrongs({}); setHelped(false); setItemDone(false); setFlash(null);
  };
  const goNext = () => { setPos((p) => p + 1); resetItem(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const edit = (id, text) => {
    setEntries((s) => ({ ...s, [id]: text }));
    if (errors[id]) setErrors((e) => { const n = { ...e }; delete n[id]; return n; });
  };

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const stateOf = (id) => (locked[id] ? 'locked' : errors[id] ? 'error' : liveCells.some((c) => c.id === id) ? 'live' : 'dim');
  const reasonCodes = [...new Set(Object.values(errors))];
  const result = resultLatex(model);

  // Layout props every row of the tableau shares, so the columns cannot drift.
  const rowProps = { gutter, gridW, cols: N + 1 };

  const stagesShown = ['q', 'p', 'd'];
  const stageLabel = { q: T.divide, p: T.multiply, d: T.subtract };

  // The instruction for the live move, written with this problem's own terms —
  // the same annotation the textbook prints down the right-hand margin.
  const leadCoef = step.rowBefore[0]?.coef;
  const instruction = itemDone ? null
    : stage === 'q'
      ? <>Divide <Term coef={leadCoef} deg={step.rDeg} lead /> by <Term coef={model.divisor[0]} deg={degreeOf(model.divisor)} lead />.</>
      : stage === 'p'
        ? <>Multiply <span className="font-mono font-black">(<PolyText coeffs={model.divisor} />)</span> by <Term coef={step.qCoef} deg={step.qDeg} lead />.</>
        : <>Subtract, column by column. The <PowerLabel deg={step.cancelDeg} className="font-mono font-black" /> column always cancels to 0.</>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={finish} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-4xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-3">
        {/* problem chip + running score */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor: INK, backgroundColor: `${INK}14` }}>
            <Divide className="w-4 h-4" style={{ color: INK }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">Problem {pos + 1} of {items.length}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />
            {cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {T.cleared}
          </div>
        </div>

        {/* the question, set the way the exam sets it */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 shadow-sm">
          <SafeBlockMath math={`\\text{Divide } ${polyLatex(model.dividend)} \\text{ by } ${polyLatex(model.divisor)}`} />
          {(item.note || (pos === 0 && pool?.intro)) && (
            <p className="text-center text-sm font-bold text-slate-500 dark:text-slate-400 pb-3 -mt-2">
              {item.note || pool.intro}
            </p>
          )}
        </div>

        {/* THE TABLEAU */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 overflow-x-auto custom-scrollbar">
          <div className="w-fit mx-auto">
            {/* power headers — the column IS the power, so nothing can land in
                the wrong one */}
            <Row {...rowProps} height={26}>
              {Array.from({ length: N + 1 }, (_, i) => {
                const deg = N - i;
                return (
                  <div key={deg} className="flex items-start justify-center">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-black tabular-nums text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">
                      <PowerLabel deg={deg} />
                    </span>
                  </div>
                );
              })}
            </Row>

            {/* the quotient, written above the bar in its own power column */}
            <Row {...rowProps}>
              {steps.map((s, i) => {
                const id = cid(i, 'q', s.qDeg);
                const st = stateOf(id);
                return (
                  <div key={s.qDeg} className="px-1 flex items-center justify-center" style={{ gridColumn: colOf(s.qDeg) }}>
                    {st === 'locked'
                      ? <Term coef={s.qCoef} deg={s.qDeg} lead={i === 0} tone="locked" />
                      : st === 'dim'
                        ? <span className="w-full h-11 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800" />
                        : <CoefBox value={entries[id] ?? ''} deg={s.qDeg} state={st} onChange={(v) => edit(id, v)} onEnter={check} refEl={liveCells[0]?.id === id ? firstBox : undefined} />}
                  </div>
                );
              })}
            </Row>

            {/* the vinculum */}
            <div className="flex">
              <div style={{ width: gutter }} />
              <div className="rounded-full bg-slate-800 dark:bg-slate-200" style={{ width: gridW, height: 3 }} />
            </div>

            {/* the dividend, written out in FULL — zero terms included */}
            <Row {...rowProps} label={<span className="flex items-baseline gap-1"><span className="text-slate-700 dark:text-slate-200"><PolyText coeffs={model.divisor} /></span><span className="text-2xl leading-none text-slate-400">)</span></span>}>
              {Array.from({ length: N + 1 }, (_, i) => {
                const deg = N - i;
                const coef = model.dividend[i];
                return (
                  <div key={deg} className="flex items-center justify-center">
                    <Term coef={coef} deg={deg} lead={i === 0} tone={coef === 0 ? 'faint' : 'ink'} />
                  </div>
                );
              })}
            </Row>

            {/* one worked block per step */}
            {(itemDone ? steps : steps.slice(0, stepIdx + 1)).map((s, i) => {
              const showProd = itemDone || i < stepIdx || stage !== 'q';
              const showDiff = itemDone || i < stepIdx || stage === 'd';
              const span = s.rDeg - s.qDeg + 1;
              return (
                <div key={i}>
                  {showProd && (
                    <>
                      <Row {...rowProps} label={<Minus className="w-5 h-5" strokeWidth={3} />}>
                        {s.prod.map((c) => {
                          const id = cid(i, 'p', c.deg);
                          const st = stateOf(id);
                          return (
                            <div key={c.deg} className="px-1 flex items-center justify-center" style={{ gridColumn: colOf(c.deg) }}>
                              {st === 'live' || st === 'error'
                                ? <CoefBox value={entries[id] ?? ''} deg={c.deg} state={st} onChange={(v) => edit(id, v)} onEnter={check} refEl={liveCells[0]?.id === id ? firstBox : undefined} />
                                : <Term coef={c.coef} deg={c.deg} lead={c.deg === s.rDeg} tone="locked" />}
                            </div>
                          );
                        })}
                      </Row>
                      {/* the subtraction rule, drawn under the product only */}
                      <div className="flex" style={{ height: 10 }}>
                        <div style={{ width: gutter }} />
                        <div className="grid" style={{ width: gridW, gridTemplateColumns: `repeat(${N + 1}, ${COL}px)` }}>
                          <div className="border-t-2 border-slate-500 dark:border-slate-400 mt-1" style={{ gridColumn: `${colOf(s.rDeg)} / span ${span}` }} />
                        </div>
                      </div>
                    </>
                  )}

                  {showDiff && (
                    <Row {...rowProps}>
                      {/* the cancelled column, shown rather than left blank —
                          this is the whole reason the quotient term was chosen */}
                      <div className="flex items-center justify-center" style={{ gridColumn: colOf(s.cancelDeg) }}>
                        <span className="font-mono font-black text-slate-300 dark:text-slate-700">0</span>
                      </div>
                      {s.diff.map((c) => {
                        const id = cid(i, 'd', c.deg);
                        const st = stateOf(id);
                        return (
                          <div key={c.deg} className="px-1 flex items-center justify-center" style={{ gridColumn: colOf(c.deg) }}>
                            {st === 'live' || st === 'error'
                              ? <CoefBox value={entries[id] ?? ''} deg={c.deg} state={st} onChange={(v) => edit(id, v)} onEnter={check} refEl={liveCells[0]?.id === id ? firstBox : undefined} />
                              : <Term coef={c.coef} deg={c.deg} lead tone="locked" />}
                          </div>
                        );
                      })}
                      {/* brought down by the app, in front of the student */}
                      {s.bring.map((c, bi) => (
                        <div key={`b${c.deg}`} className="flex items-center justify-center gap-0.5" style={{ gridColumn: colOf(c.deg) }}>
                          {bi === 0 && <ArrowDown className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={3} />}
                          <Term coef={c.coef} deg={c.deg} tone="bring" />
                        </div>
                      ))}
                    </Row>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* the four moves, with the live one named in this problem's terms */}
        {!itemDone && (
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 flex flex-col gap-3" style={{ borderColor: `${INK}44` }}>
            <div className="flex items-center gap-1.5 flex-wrap">
              {stagesShown.map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${stage === s ? 'text-white' : 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800'}`}
                    style={stage === s ? { backgroundColor: INK } : undefined}>
                    {stageLabel[s]}
                  </span>
                  {i < 2 && <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" strokeWidth={3} />}
                </div>
              ))}
              <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" strokeWidth={3} />
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">
                {T.bring}
              </span>
              <span className="ml-auto text-[11px] font-black uppercase tracking-widest text-slate-400">
                Step {stepIdx + 1} / {steps.length}
              </span>
            </div>
            <p className="font-bold text-slate-700 dark:text-slate-200 text-base flex items-center gap-1.5 flex-wrap">{instruction}</p>
          </div>
        )}

        {/* feedback */}
        <div className="min-h-[2rem] flex flex-col gap-2">
          {itemDone && (
            <div className="rounded-2xl border-2 p-4 flex flex-col gap-1" style={{ borderColor: GREEN, backgroundColor: 'rgba(88,204,2,0.10)' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: GREEN }} strokeWidth={2.5} />
                <span className="font-black text-sm text-slate-800 dark:text-slate-100">
                  {results[item.id]?.score === 1 ? T.clean : T.helped}
                  {' '}{T.quotient}: <PolyText coeffs={model.quotient} />
                  {!isZero(model.remainder) && <>, {T.remainder} <PolyText coeffs={model.remainder} /></>}
                </span>
              </div>
              {/* the finished statement, both ways round */}
              <div className="mt-1 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 px-2">
                <SafeBlockMath math={result.product} />
                <SafeBlockMath math={result.fraction} />
              </div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: result.exact ? GREEN : AMBER }} strokeWidth={3} />
                {result.exact ? T.isFactor : T.notFactor}
              </p>
            </div>
          )}
          {flash && (
            <div className="flex items-start gap-2 font-bold text-sm" style={{ color: RED }}>
              <XCircle className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2.5} />{flash}
            </div>
          )}
          {reasonCodes.map((code) => (
            <div key={code} className="flex items-start gap-2 rounded-xl border-2 p-2.5" style={{ borderColor: AMBER, backgroundColor: `${AMBER}1a` }}>
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: AMBER }} strokeWidth={2.5} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">{T.reasons[code]}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          {!itemDone ? (
            <button onClick={check} className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white border-b-[4px] active:border-b-0 active:translate-y-[4px] flex items-center gap-2"
              style={{ backgroundColor: INK, borderColor: INK_DARK }}>
              <Divide className="w-4 h-4" strokeWidth={3} /> {T.check}
            </button>
          ) : item.isLast ? (
            <button onClick={finish} className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-4 h-4" strokeWidth={3} /> {T.finish}
            </button>
          ) : (
            <>
              <button onClick={finish} className="px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-700 border-b-[4px] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 active:border-b-0 active:translate-y-[4px]">
                {T.bankHere}
              </button>
              <button onClick={goNext} className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                {T.next} <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * One row of the tableau: a fixed-width gutter for the divisor or the minus
 * sign, then one cell per power column. Declared at module scope — a component
 * created inside the render would be a new type on every keystroke, which
 * remounts (and so blanks) the input the student is typing into.
 */
function Row({ children, label = null, height = 48, gutter, gridW, cols }) {
  return (
    <div className="flex items-center" style={{ height }}>
      <div className="shrink-0 flex items-center justify-end pr-2 font-mono font-black text-lg text-slate-500 dark:text-slate-400" style={{ width: gutter }}>
        {label}
      </div>
      <div className="grid" style={{ width: gridW, gridTemplateColumns: `repeat(${cols}, ${COL}px)` }}>
        {children}
      </div>
    </div>
  );
}

/** The divisor as it is written outside the bracket. */
function PolyText({ coeffs }) {
  const top = degreeOf(coeffs);
  return (
    <span className="font-mono font-black whitespace-nowrap">
      {coeffs.map((coef, i) => {
        const deg = top - i;
        if (coef === 0) return null;
        return <Term key={deg} coef={coef} deg={deg} lead={i === 0} spaced />;
      })}
    </span>
  );
}
