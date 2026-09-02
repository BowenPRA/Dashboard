import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Divide, Construction, CheckCircle2, XCircle, ArrowRight, ArrowDown,
  Lightbulb, Trophy, Sparkles, Pencil, HelpCircle,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeBlockMath } from '../components/notes/SafeMath.jsx';
import {
  divide, polyLatex, resultLatex, divisionLatex, termBody, degreeOf, isZero,
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
 * WHAT THE DESIGN IS FOR. The mistake students make in this topic is not
 * arithmetic, it is ALIGNMENT: an x² landing in the x column, a missing
 * power never written as 0x², a subtraction where only the first term got
 * its sign flipped. So the screen is a column grid — one column per
 * power, with a ruled band running the full height of each column and
 * the dividend written out INCLUDING its zero terms. Nothing can be
 * typed into the wrong column because the column decides the power; all
 * the student supplies is the number, and the box says so.
 *
 * FOUR DELIBERATE MOVES, EACH NAMED WHERE IT HAPPENS.
 *   - the instruction sits ABOVE the grid, in this problem's own terms
 *     ("Divide -3x² by x"), because the work happens in the grid and a
 *     caption underneath makes the eye travel;
 *   - the columns in play are tinted from the header pill all the way
 *     down to the live row, so "which column am I in" is never a guess;
 *   - the active row is tagged in the left margin with the move it is
 *     ("multiply", "subtract"), which is the annotation the textbook
 *     prints down its right-hand margin;
 *   - the app performs the fourth move, BRING DOWN, in front of the
 *     student: amber, with an arrow, the way you would draw it.
 * A three-colour legend says what ink means what, because green, amber
 * and slate on one grid is otherwise something to be decoded.
 *
 * A cell wrong twice is filled in (as is "Show me this step"), and the
 * item then pays half — a stuck student is never truly stuck. When the
 * last subtraction lands, the whole division is re-set in proper LaTeX,
 * the way the book prints it, above the two finished statements:
 * P(x) = D(x)Q(x) + R(x) and the fraction form.
 * ------------------------------------------------------------------ */

const INK = '#4338ca';        // the task colour (indigo)
const INK_DARK = '#312e81';
const GREEN = '#58cc02';      // an accepted cell — the student's own working
const RED = '#ff4b4b';        // a wrong cell
const AMBER = '#f59e0b';      // a revealed cell, and the brought-down terms

const T = {
  title: 'Long Division',
  check: 'Check',
  stuck: 'Show me',
  next: 'Next problem',
  finish: 'Finish',
  bankHere: 'Finish & bank XP',
  solved: 'solved',
  empty: 'Fill in every box first.',
  clean: 'Every box right first time.',
  helped: 'Solved — with a box or two filled in for you.',
  typeNumber: 'Type the NUMBER only — the column already holds the power.',
  divide: 'Divide',
  multiply: 'Multiply',
  subtract: 'Subtract',
  bring: 'Bring down',
  quotient: 'Quotient',
  remainder: 'remainder',
  bookCopy: 'Copy this into your book',
  isFactor: 'The remainder is 0, so the divisor IS a factor of the polynomial.',
  notFactor: 'The remainder is not 0, so the divisor is not a factor.',
  legend: [
    ['given', 'the question'],
    ['own', 'your working'],
    ['bring', 'brought down for you'],
  ],
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

/** The power that names a column: x³ … x, 1. */
function PowerLabel({ deg }) {
  if (deg === 0) return <>1</>;
  return (
    <>
      <span className="italic font-serif">x</span>
      {deg > 1 && <sup className="text-[0.65em] leading-none">{deg}</sup>}
    </>
  );
}

/**
 * One written term in its column: the operator sign, then the body. `lead` drops
 * a leading plus, exactly as it is written on paper. The tone is the ink: whose
 * working this is.
 */
function Term({ coef, deg, lead = false, tone = 'given', spaced = false, size = 'base' }) {
  const color =
    tone === 'own' ? 'text-[#3e7500] dark:text-[#8ee000]'
      : tone === 'bring' ? 'text-amber-600 dark:text-amber-400'
        : tone === 'zero' ? 'text-slate-300 dark:text-slate-600'
          : tone === 'cancel' ? 'text-[#58a700]/60 dark:text-[#8ee000]/50'
            : 'text-slate-800 dark:text-slate-100';
  const sign = coef < 0 ? '−' : lead ? '' : '+';
  const body = termBody(coef, deg);
  // termBody gives "3x^{2}" style text; rebuild it with a real superscript so
  // the columns keep one baseline (KaTeX per cell would not line up).
  const m = /^(\d*)x?(?:\^\{(\d+)\})?$/.exec(body);
  const num = m ? m[1] : body;
  const text = size === 'sm' ? 'text-base' : 'text-[19px] sm:text-xl';
  return (
    <span className={`font-mono font-black tabular-nums whitespace-nowrap ${color} ${text} ${spaced && !lead ? 'ml-1.5' : ''}`}>
      {sign && <span className="mr-0.5">{sign}</span>}
      {num}
      {deg > 0 && (
        <>
          <span className="italic font-serif">x</span>
          {deg > 1 && <sup className="text-[0.62em] leading-none">{deg}</sup>}
        </>
      )}
    </span>
  );
}

/** A live coefficient box. The power is printed inside it, so the box itself
 *  answers "what goes here": a number, in front of this power. */
function CoefBox({ value, deg, state, onChange, onEnter, refEl }) {
  const wrong = state === 'error';
  return (
    <div className="relative w-full">
      <input
        ref={refEl}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
        inputMode="text"
        maxLength={5}
        aria-label={`coefficient of x to the power ${deg}`}
        placeholder="?"
        className={`w-full h-12 rounded-xl border-[2.5px] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50
          text-center pr-6 font-mono font-black text-xl tabular-nums outline-none transition-all
          placeholder:text-slate-300 dark:placeholder:text-slate-700
          ${wrong
            ? 'border-[#ff4b4b] ring-4 ring-rose-100 dark:ring-rose-900/40'
            : 'border-[#4338ca] ring-4 ring-indigo-100 dark:ring-indigo-900/40 focus:ring-indigo-200 dark:focus:ring-indigo-800'}`}
      />
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 font-mono font-black text-[13px] text-indigo-400 dark:text-indigo-300">
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
  const cols = N + 1;
  const colOf = (deg) => N - deg + 1;   // 1-based grid column for a power
  const cid = (i, which, deg) => `s${i}:${which}:${deg}`;

  /** The cells the student is filling in right now. */
  const liveCells = itemDone ? [] : stage === 'q'
    ? [{ id: cid(stepIdx, 'q', step.qDeg), deg: step.qDeg, value: step.qCoef }]
    : stage === 'p'
      ? step.prod.map((c) => ({ id: cid(stepIdx, 'p', c.deg), deg: c.deg, value: c.coef }))
      : step.diff.map((c) => ({ id: cid(stepIdx, 'd', c.deg), deg: c.deg, value: c.coef }));

  // The columns this move is working in — tinted from the header pill all the
  // way down the grid, so the live row is visibly in a column, not floating.
  const activeCols = new Set(liveCells.map((c) => c.deg));
  if (!itemDone && stage === 'd') activeCols.add(step.cancelDeg);

  const say = (text) => {
    setFlash(text);
    setTimeout(() => setFlash((f) => (f === text ? null : f)), 3500);
  };

  /** Move on once every live cell is settled. */
  const advance = (nowHelped) => {
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
    advance(nowHelped);
  };

  /** "Show me" — fill this move in and move on. The item then pays half. */
  const showStep = () => {
    if (itemDone) return;
    const nextLocked = { ...locked };
    const nextEntries = { ...entries };
    for (const c of liveCells) {
      nextLocked[c.id] = true;
      nextEntries[c.id] = String(c.value);
    }
    setLocked(nextLocked);
    setEntries(nextEntries);
    setErrors({});
    setHelped(true);
    advance(true);
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
  const outcome = resultLatex(model);

  // One shared geometry for every row, so the columns cannot drift. Both are CSS
  // variables so the whole tableau narrows on a phone instead of scrolling away
  // from the divisor sitting in the gutter.
  const divisorChars = polyLatex(model.divisor).replace(/[{}^\\]/g, '').length;
  const geom = {
    '--col': 'clamp(50px, 13vw, 78px)',
    '--gutter': `${Math.min(170, Math.max(88, divisorChars * 11 + 34))}px`,
  };
  const rowProps = { cols };

  const stages = [
    { key: 'q', n: 1, label: T.divide },
    { key: 'p', n: 2, label: T.multiply },
    { key: 'd', n: 3, label: T.subtract },
  ];

  // The instruction for the live move, written with this problem's own terms —
  // the annotation the textbook prints down its right-hand margin.
  const leadCoef = step.rowBefore[0]?.coef;
  const instruction = itemDone ? null
    : stage === 'q'
      ? <>Divide <Term coef={leadCoef} deg={step.rDeg} lead /> by <Term coef={model.divisor[0]} deg={degreeOf(model.divisor)} lead />, and write the answer above the bar.</>
      : stage === 'p'
        ? <>Multiply the divisor <span className="font-mono font-black">(<PolyText coeffs={model.divisor} />)</span> by <Term coef={step.qCoef} deg={step.qDeg} lead />.</>
        : <>Subtract, column by column. The <span className="font-mono font-black text-slate-800 dark:text-slate-100"><PowerLabel deg={step.cancelDeg} /></span> column always cancels to 0.</>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 font-sans transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `
        .pd-scroll::-webkit-scrollbar { height: 8px; }
        .pd-scroll::-webkit-scrollbar-thumb { background-color: rgba(148,163,184,0.35); border-radius: 10px; }
      ` }} />

      <TopBar onQuit={finish} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-4xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        {/* ONE card: the question, the move, the working. */}
        <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
          {/* the question, stated the way the exam states it */}
          <div className="px-4 sm:px-7 pt-3 pb-4 text-white" style={{ backgroundColor: INK }}>
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-black uppercase tracking-widest text-[11px] sm:text-xs text-white/70">
                Problem {pos + 1} of {items.length}
              </span>
              <span className="flex items-center gap-1.5 font-black text-[11px] sm:text-xs bg-white/15 rounded-full px-3 py-1 border border-white/25">
                <Trophy className="w-3.5 h-3.5" strokeWidth={3} />
                {cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {T.solved}
              </span>
            </div>
            <div className="text-white text-[15px] sm:text-[23px] -my-2">
              <SafeBlockMath math={`\\text{Divide }\\;${polyLatex(model.dividend)}\\;\\text{ by }\\;${polyLatex(model.divisor)}`} />
            </div>
            {/* The pool's intro orients a first-timer; every item's own note
                says what is new about THIS one. Both, on problem one. */}
            {pos === 0 && pool?.intro && (
              <p className="text-[13px] sm:text-sm font-bold text-white/70 leading-snug mt-1">{pool.intro}</p>
            )}
            {item.note && (
              <p className="text-[13px] sm:text-sm font-bold text-white/85 leading-snug mt-1">{item.note}</p>
            )}
          </div>

          {/* the move: what to do, right above where it is done */}
          {!itemDone && (
            <div className="px-4 sm:px-7 py-3 border-b-2 border-slate-100 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-950/20">
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                {stages.map((s, i) => {
                  const done = stages.findIndex((x) => x.key === stage) > i;
                  const on = stage === s.key;
                  return (
                    <div key={s.key} className="flex items-center gap-1.5">
                      <span
                        className={`flex items-center gap-1.5 rounded-lg font-black uppercase tracking-widest transition-all
                          ${on ? 'text-white px-3 py-1.5 text-[11px] sm:text-xs shadow-sm'
                            : `px-2.5 py-1 text-[10px] sm:text-[11px] ${done ? 'text-[#3e7500] dark:text-[#8ee000] bg-[#58cc02]/10' : 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800'}`}`}
                        style={on ? { backgroundColor: INK } : undefined}>
                        <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[9px] ${on ? 'bg-white/25' : done ? 'bg-[#58cc02]/25' : 'bg-slate-200 dark:bg-slate-700'}`}>
                          {done ? '✓' : s.n}
                        </span>
                        {s.label}
                      </span>
                      {i < stages.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" strokeWidth={3} />}
                    </div>
                  );
                })}
                <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" strokeWidth={3} />
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">
                  <ArrowDown className="w-3 h-3" strokeWidth={3} /> {T.bring}
                </span>
                <span className="ml-auto text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Pass {stepIdx + 1} / {steps.length}
                </span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-100 text-[15px] sm:text-lg leading-relaxed">
                {instruction}
              </p>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-500/80 dark:text-indigo-300/70 mt-1.5">
                {T.typeNumber}
              </p>
            </div>
          )}

          {/* THE TABLEAU */}
          <div className="px-2 sm:px-5 py-5 overflow-x-auto pd-scroll" style={geom}>
            <div className="w-fit mx-auto relative">
              {/* the column bands: one ruled lane per power, tinted where the
                  current move is working. This is the alignment lesson made
                  visible — a column is a place, not a coincidence. */}
              <div className="absolute inset-y-0 pointer-events-none grid"
                style={{ left: 'var(--gutter)', width: `calc(var(--col) * ${cols})`, gridTemplateColumns: `repeat(${cols}, var(--col))` }}
                aria-hidden="true">
                {Array.from({ length: cols }, (_, i) => {
                  const deg = N - i;
                  const on = activeCols.has(deg);
                  return (
                    <div key={deg}
                      className={`border-r border-dashed transition-colors ${i === 0 ? 'border-l' : ''}
                        ${on ? 'bg-indigo-100/60 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-800'
                          : 'border-slate-200/80 dark:border-slate-700/50'}`} />
                  );
                })}
              </div>

              <div className="relative">
                {/* power headers — the column IS the power */}
                <Row {...rowProps} height={30}>
                  {Array.from({ length: cols }, (_, i) => {
                    const deg = N - i;
                    const on = activeCols.has(deg);
                    return (
                      <div key={deg} className="flex items-center justify-center">
                        <span className={`px-2.5 py-0.5 rounded-md font-mono font-black text-[13px] transition-colors
                          ${on ? 'text-white' : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'}`}
                          style={on ? { backgroundColor: INK } : undefined}>
                          <PowerLabel deg={deg} />
                        </span>
                      </div>
                    );
                  })}
                </Row>

                {/* the quotient, written above the bar in its own power column */}
                <Row {...rowProps} height={56}>
                  {steps.map((s, i) => {
                    const id = cid(i, 'q', s.qDeg);
                    const st = stateOf(id);
                    return (
                      <div key={s.qDeg} className="px-1 flex items-center justify-center" style={{ gridColumn: colOf(s.qDeg) }}>
                        {st === 'locked'
                          ? <Term coef={s.qCoef} deg={s.qDeg} lead={i === 0} tone="own" />
                          : st === 'dim'
                            ? <span className="w-full h-11 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800" />
                            : <CoefBox value={entries[id] ?? ''} deg={s.qDeg} state={st} onChange={(v) => edit(id, v)} onEnter={check} refEl={liveCells[0]?.id === id ? firstBox : undefined} />}
                      </div>
                    );
                  })}
                </Row>

                {/* the vinculum */}
                <div className="flex">
                  <div style={{ width: 'var(--gutter)' }} />
                  <div className="rounded-full bg-slate-800 dark:bg-slate-200" style={{ width: `calc(var(--col) * ${cols})`, height: 3 }} />
                </div>

                {/* the dividend, written out in FULL — zero terms included */}
                <Row {...rowProps} height={52}
                  label={
                    <span className="flex items-baseline gap-1">
                      <span className="text-slate-800 dark:text-slate-100"><PolyText coeffs={model.divisor} /></span>
                      <span className="text-[26px] leading-none text-slate-400 dark:text-slate-500 font-mono">)</span>
                    </span>
                  }>
                  {Array.from({ length: cols }, (_, i) => {
                    const deg = N - i;
                    const coef = model.dividend[i];
                    return (
                      <div key={deg} className="flex items-center justify-center">
                        <Term coef={coef} deg={deg} lead={i === 0} tone={coef === 0 ? 'zero' : 'given'} />
                      </div>
                    );
                  })}
                </Row>

                {/* one worked block per pass */}
                {(itemDone ? steps : steps.slice(0, stepIdx + 1)).map((s, i) => {
                  const showProd = itemDone || i < stepIdx || stage !== 'q';
                  const showDiff = itemDone || i < stepIdx || stage === 'd';
                  const liveProd = !itemDone && i === stepIdx && stage === 'p';
                  const liveDiff = !itemDone && i === stepIdx && stage === 'd';
                  const span = s.rDeg - s.qDeg + 1;
                  return (
                    <div key={i}>
                      {showProd && (
                        <>
                          <Row {...rowProps} height={52}
                            label={
                              <span className="flex items-baseline justify-end gap-2 w-full">
                                {liveProd && <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: INK }}>{T.multiply}</span>}
                                <span className="font-mono font-black text-2xl text-slate-500 dark:text-slate-400 leading-none">−</span>
                              </span>
                            }>
                            {s.prod.map((c) => {
                              const id = cid(i, 'p', c.deg);
                              const st = stateOf(id);
                              return (
                                <div key={c.deg} className="px-1 flex items-center justify-center" style={{ gridColumn: colOf(c.deg) }}>
                                  {st === 'live' || st === 'error'
                                    ? <CoefBox value={entries[id] ?? ''} deg={c.deg} state={st} onChange={(v) => edit(id, v)} onEnter={check} refEl={liveCells[0]?.id === id ? firstBox : undefined} />
                                    : <Term coef={c.coef} deg={c.deg} lead={c.deg === s.rDeg} tone="own" />}
                                </div>
                              );
                            })}
                          </Row>
                          {/* the subtraction rule, drawn under the product only */}
                          <div className="flex" style={{ height: 10 }}>
                            <div style={{ width: 'var(--gutter)' }} />
                            <div className="grid" style={{ width: `calc(var(--col) * ${cols})`, gridTemplateColumns: `repeat(${cols}, var(--col))` }}>
                              <div className="border-t-2 border-slate-600 dark:border-slate-300 mt-1" style={{ gridColumn: `${colOf(s.rDeg)} / span ${span}` }} />
                            </div>
                          </div>
                        </>
                      )}

                      {showDiff && (
                        <Row {...rowProps} height={52}
                          label={liveDiff
                            ? <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: INK }}>{T.subtract}</span>
                            : null}>
                          {/* the cancelled column, shown rather than left blank —
                              this is the whole reason that quotient term was chosen */}
                          <div className="flex items-center justify-center" style={{ gridColumn: colOf(s.cancelDeg) }}>
                            <Term coef={0} deg={0} lead tone="cancel" size="sm" />
                          </div>
                          {s.diff.map((c) => {
                            const id = cid(i, 'd', c.deg);
                            const st = stateOf(id);
                            return (
                              <div key={c.deg} className="px-1 flex items-center justify-center" style={{ gridColumn: colOf(c.deg) }}>
                                {st === 'live' || st === 'error'
                                  ? <CoefBox value={entries[id] ?? ''} deg={c.deg} state={st} onChange={(v) => edit(id, v)} onEnter={check} refEl={liveCells[0]?.id === id ? firstBox : undefined} />
                                  : <Term coef={c.coef} deg={c.deg} lead tone="own" />}
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
          </div>

          {/* what the three inks mean */}
          {!itemDone && (
            <div className="px-4 sm:px-7 py-2.5 border-t-2 border-slate-100 dark:border-slate-800 flex items-center gap-4 flex-wrap">
              {T.legend.map(([tone, label]) => (
                <span key={tone} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{
                    backgroundColor: tone === 'given' ? '#334155' : tone === 'own' ? GREEN : AMBER,
                  }} />
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* feedback while working */}
        {!itemDone && (!!flash || reasonCodes.length > 0) && (
          <div className="flex flex-col gap-2">
            {flash && (
              <div className="flex items-start gap-2 font-bold text-sm" style={{ color: RED }}>
                <XCircle className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2.5} />{flash}
              </div>
            )}
            {reasonCodes.map((code) => (
              <div key={code} className="flex items-start gap-2 rounded-xl border-2 p-3" style={{ borderColor: AMBER, backgroundColor: `${AMBER}1a` }}>
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: AMBER }} strokeWidth={2.5} />
                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 leading-snug">{T.reasons[code]}</span>
              </div>
            ))}
          </div>
        )}

        {/* the finished division, set the way the book sets it */}
        {itemDone && (
          <div className="rounded-3xl border-2 overflow-hidden bg-white dark:bg-slate-900" style={{ borderColor: GREEN }}>
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3" style={{ backgroundColor: 'rgba(88,204,2,0.14)' }}>
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: GREEN }} strokeWidth={3} />
              <span className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                {results[item.id]?.score === 1 ? T.clean : T.helped}
              </span>
              <span className="ml-auto font-black text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-right leading-relaxed">
                {T.quotient} <PolyText coeffs={model.quotient} />
                {!isZero(model.remainder) && <>· {T.remainder} <PolyText coeffs={model.remainder} /></>}
              </span>
            </div>

            <div className="px-4 sm:px-6 py-4">
              <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 mb-1 text-white font-black uppercase tracking-widest text-[10px] sm:text-[11px]" style={{ backgroundColor: '#c25e12' }}>
                <Pencil className="w-3.5 h-3.5" strokeWidth={3} /> {T.bookCopy}
              </div>
              <div className="rounded-2xl border-2 border-[#e8c9a6] dark:border-amber-800/60 bg-[#fdf1e3] dark:bg-amber-950/20 px-3 py-1 overflow-x-auto pd-scroll">
                <SafeBlockMath math={divisionLatex(model)} />
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 px-3 py-1">
                <SafeBlockMath math={outcome.product} />
                <SafeBlockMath math={outcome.fraction} />
              </div>

              <p className="mt-3 text-[13px] sm:text-sm font-bold text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: outcome.exact ? GREEN : AMBER }} strokeWidth={3} />
                {outcome.exact ? T.isFactor : T.notFactor}
              </p>
            </div>
          </div>
        )}

        {/* one clear next step */}
        <div className="flex items-center justify-end gap-3">
          {!itemDone ? (
            <>
              <button onClick={showStep}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest bg-white dark:bg-slate-800 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 active:border-b-2 active:translate-y-[2px]">
                <HelpCircle className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
              </button>
              <button onClick={check}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-black text-base uppercase tracking-widest text-white border-b-[4px] active:border-b-0 active:translate-y-[4px]"
                style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                <Divide className="w-5 h-5" strokeWidth={3} /> {T.check}
              </button>
            </>
          ) : item.isLast ? (
            <button onClick={finish} className="px-7 py-3.5 rounded-xl font-black text-base uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-5 h-5" strokeWidth={3} /> {T.finish}
            </button>
          ) : (
            <>
              <button onClick={finish}
                className="px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-white dark:bg-slate-800 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 active:border-b-2 active:translate-y-[2px]">
                {T.bankHere}
              </button>
              <button onClick={goNext} className="px-7 py-3.5 rounded-xl font-black text-base uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                {T.next} <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * One row of the tableau: a fixed-width gutter for the divisor, the minus sign
 * or the name of the live move, then one cell per power column. Declared at
 * module scope — a component created inside the render would be a new type on
 * every keystroke, which remounts (and so blanks) the input being typed into.
 */
function Row({ children, label = null, height = 52, cols }) {
  return (
    <div className="flex items-center" style={{ height }}>
      <div className="shrink-0 flex items-center justify-end pr-2 font-mono font-black text-lg text-slate-500 dark:text-slate-400"
        style={{ width: 'var(--gutter)' }}>
        {label}
      </div>
      <div className="grid" style={{ width: `calc(var(--col) * ${cols})`, gridTemplateColumns: `repeat(${cols}, var(--col))` }}>
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
        return <Term key={deg} coef={coef} deg={deg} lead={i === 0} spaced size="sm" />;
      })}
    </span>
  );
}
