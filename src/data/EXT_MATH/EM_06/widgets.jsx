// src/data/EXT_MATH/EM_06/widgets.jsx
// Widgets for EM_06 — Sets, Surds and Rationalising. Three, and each does one
// thing a still slide cannot (the classroom decks' rule):
//
//   SetNotationExplorer  Tap a piece of notation; the Venn diagram shades it,
//                        says it in words, and — only when asked — counts it
//                        and turns the count into a probability. The same
//                        diagram, eight different questions.
//
//   SurdBreaker          The factor-tree method, one press at a time: split
//                        the number into primes, ring the PAIRS, and watch each
//                        pair jump out of the root as one number. It is the
//                        picture behind "find a square factor", and it is the
//                        tree the student already draws in the margin.
//
//   ConjugateMachine     Rationalising a two-term denominator as a stepper:
//                        the conjugate arrives, the bottom multiplies out in a
//                        grid, the two surd cells cancel in front of you, then
//                        the top, then simplify.
//
// Every number shown is DERIVED (utils/sets.js, utils/surds.js) from the
// example's question, so a widget can never show a wrong answer. English only,
// like the rest of this track; `lang` is accepted and ignored.
import { useState } from 'react';
import { Undo2, ArrowRight, SkipForward, Eye } from 'lucide-react';
import VennFigure from '../../../components/math/VennFigure.jsx';
import { SafeInlineMath } from '../../../components/notes/SafeMath.jsx';
import { regionsOf, latexOf, parseSet, describeRegions, readingOrder } from '../../../utils/sets';
import { primeFactors, splitRoot, deriveRationalise, rationaliseQuestionLatex, termLatex, sumLatex, fractionLatex, tidy } from '../../../utils/surds';

const KEY = '#c2410c';
const TEAL = '#0f766e';
const VIOLET = '#7c3aed';
const INK = '#1e293b';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const MATH = "'Cambria Math', 'Times New Roman', Georgia, serif";

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0f766e] border-[#115e59]',
    orange: 'bg-[#c2410c] border-[#9a3412]',
    violet: 'bg-[#7c3aed] border-[#5b21b6]',
    slate: 'bg-slate-500 border-slate-700',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-3.5 py-2 text-xs sm:text-sm disabled:opacity-35 disabled:pointer-events-none ${tones[tone] || tones.teal}`}
    >
      {Icon && <Icon className="w-4 h-4" strokeWidth={3} />}
      {children}
    </button>
  );
}

/* ============================================================= *
 * WIDGET 1 — SET NOTATION EXPLORER
 * ============================================================= */
const FOOD = {
  sets: ['P', 'B'],
  counts: { '10': 11, '11': 7, '01': 9, '00': 3 },
};
const CARDS = [
  { expr: 'P ∩ B', say: 'P intersection B', words: 'likes phở AND bánh mì' },
  { expr: 'P ∪ B', say: 'P union B', words: 'likes phở OR bánh mì, or both' },
  { expr: "P'", say: 'the complement of P', words: 'does NOT like phở' },
  { expr: "B'", say: 'the complement of B', words: 'does NOT like bánh mì' },
  { expr: "P ∩ B'", say: 'P intersection B-complement', words: 'likes phở but NOT bánh mì' },
  { expr: "P' ∩ B", say: 'P-complement intersection B', words: 'likes bánh mì but NOT phở' },
  { expr: "(P ∪ B)'", say: 'the complement of P union B', words: 'likes NEITHER' },
  { expr: 'ℰ', say: 'the universal set', words: 'everyone asked' },
];

export function SetNotationExplorer() {
  const [which, setWhich] = useState(0);
  const [counted, setCounted] = useState(false);
  const card = CARDS[which];
  const { counts } = FOOD;
  const regions = regionsOf(card.expr, FOOD.sets);
  const nums = readingOrder(2).filter((k) => regions.includes(k)).map((k) => counts[k]);
  const n = nums.reduce((a, b) => a + b, 0);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const tex = latexOf(parseSet(card.expr));

  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center select-none">
      <div className="w-full sm:w-[48%] max-w-[26rem] shrink-0">
        <VennFigure sets={FOOD.sets} counts={counts} shaded={regions} tone="show" />
        <p className="mt-1 text-center text-[11px] font-bold text-slate-400">30 students · P = likes phở · B = likes bánh mì</p>
      </div>
      <div className="w-full sm:flex-1 min-w-0 flex flex-col gap-2.5">
        <div className="grid grid-cols-4 gap-1.5">
          {CARDS.map((c, i) => (
            <button key={c.expr} onClick={() => { setWhich(i); setCounted(false); }}
              className={`rounded-xl border-2 border-b-4 py-1.5 text-base sm:text-lg transition-all ${i === which ? 'bg-[#fff7ed] border-[#c2410c] text-[#9a3412]' : 'bg-white border-slate-200 text-slate-700 hover:border-orange-300'}`}>
              <SafeInlineMath math={latexOf(parseSet(c.expr))} />
            </button>
          ))}
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 sm:p-4 text-slate-800">
          <div className="text-2xl sm:text-3xl text-center"><SafeInlineMath math={tex} /></div>
          <div className="mt-1 text-center text-sm font-black uppercase tracking-widest text-slate-400">say: “{card.say}”</div>
          <div className="mt-2 text-center text-base sm:text-lg font-bold" style={{ color: KEY }}>{card.words}</div>
          <div className="mt-1 text-center text-xs font-semibold text-slate-500">shaded: {describeRegions(regions, FOOD.sets)}</div>
          <div className="mt-3 border-t-2 border-slate-100 pt-3 min-h-[4.5rem] flex flex-col items-center justify-center gap-1">
            {counted ? (
              <>
                <div className="text-lg sm:text-xl"><SafeInlineMath math={`n(${tex}) = ${nums.length > 1 ? `${nums.join(' + ')} = ` : ''}${n}`} /></div>
                <div className="text-lg sm:text-xl"><SafeInlineMath math={`P(${tex}) = \\dfrac{${n}}{${total}}`} /></div>
              </>
            ) : (
              <Btn tone="orange" icon={Eye} onClick={() => setCounted(true)}>Count it</Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================= *
 * WIDGET 2 — SURD BREAKER (prime pairs jump out of the root)
 * ============================================================= */
const NUMBERS = [12, 50, 72, 48, 75, 98, 200];
const PAIR_COLOURS = ['#0f766e', '#7c3aed', '#c2410c', '#1d4ed8'];

/** Primes of n, each tagged with the pair it belongs to (or -1 if left over). */
function pairUp(n) {
  const primes = primeFactors(n);
  const tagged = primes.map((p) => ({ p, pair: -1 }));
  let pair = 0;
  for (let i = 0; i < tagged.length - 1; i += 1) {
    if (tagged[i].pair === -1 && tagged[i + 1].p === tagged[i].p) {
      tagged[i].pair = pair;
      tagged[i + 1].pair = pair;
      pair += 1;
      i += 1;
    }
  }
  return { tagged, pairs: pair };
}

const STEP_LABELS = ['The number', 'Split into primes', 'Ring the pairs', 'Each pair comes out as one', 'Multiply what came out'];

export function SurdBreaker() {
  const [which, setWhich] = useState(2);
  const [step, setStep] = useState(0);
  const n = NUMBERS[which];
  const { tagged, pairs } = pairUp(n);
  const { out, inside } = splitRoot(n);
  const outs = tagged.filter((t, i) => t.pair >= 0 && tagged.findIndex((u) => u.pair === t.pair) === i).map((t) => t.p);

  // Stage geometry (SVG 1000 × 430): the root sign spans the prime chips.
  const CHIP = 74;
  const GAP = 14;
  const rowW = tagged.length * CHIP + (tagged.length - 1) * GAP;
  const x0 = 560 - rowW / 2;
  const ROW_Y = 230;
  const rootLeft = x0 - 70;

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1000 430" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1000" height="430" rx="16" fill="#ffffff" />
          {STEP_LABELS.slice(1).map((label, k) => {
            const on = step === k + 1;
            const done = step > k + 1;
            return (
              <g key={label}>
                <rect x={40 + k * 235} y="18" width="220" height="44" rx="22" fill={on ? VIOLET : '#ffffff'} stroke={on || done ? VIOLET : '#cbd5e1'} strokeWidth="3" />
                <text x={150 + k * 235} y="47" fontFamily={FONT} fontSize="17" fontWeight="bold" fill={on ? '#ffffff' : done ? VIOLET : '#94a3b8'} textAnchor="middle">{k + 1} {label}</text>
              </g>
            );
          })}

          {step === 0 && (
            <text x="500" y="270" fontFamily={MATH} fontSize="120" fill={INK} textAnchor="middle">√{n}</text>
          )}

          {step >= 1 && (
            <>
              {/* the root sign over the primes */}
              <path d={`M ${rootLeft - 40} ${ROW_Y - 10} L ${rootLeft - 18} ${ROW_Y - 22} L ${rootLeft + 8} ${ROW_Y + 58} L ${rootLeft + 44} ${ROW_Y - 88} L ${x0 + rowW + 30} ${ROW_Y - 88}`}
                fill="none" stroke={INK} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
              <text x="120" y="130" fontFamily={MATH} fontSize="44" fill="#94a3b8" textAnchor="middle">√{n}</text>
              <text x="120" y="170" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#94a3b8" textAnchor="middle">= √({tagged.map((t) => t.p).join('×')})</text>

              {tagged.map((t, i) => {
                const homeX = x0 + i * (CHIP + GAP);
                const paired = t.pair >= 0;
                const first = paired && tagged.findIndex((u) => u.pair === t.pair) === i;
                const colour = step >= 2 && paired ? PAIR_COLOURS[t.pair % PAIR_COLOURS.length] : '#94a3b8';
                // Step 3: the first of each pair flies out to the left of the root; its twin fades.
                const outX = rootLeft - 70 - (pairs - t.pair) * (CHIP + 12);
                const dx = step >= 3 && first ? outX - homeX : 0;
                const dy = 0;
                const fade = step >= 3 && paired && !first;
                return (
                  <g key={i} style={{ transform: `translate(${dx}px, ${dy}px)`, transition: 'transform 700ms cubic-bezier(.4,0,.2,1), opacity 500ms', opacity: fade ? 0 : 1 }}>
                    <rect x={homeX} y={ROW_Y - CHIP / 2} width={CHIP} height={CHIP} rx="18" fill="#ffffff" stroke={colour} strokeWidth={step >= 2 && paired ? 6 : 3} />
                    <text x={homeX + CHIP / 2} y={ROW_Y + 16} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={step >= 2 && paired ? colour : INK} textAnchor="middle">{t.p}</text>
                  </g>
                );
              })}
              {step === 2 && pairs === 0 && (
                <text x="560" y="340" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY} textAnchor="middle">No pairs — √{n} is already simplest.</text>
              )}
              {step === 2 && pairs > 0 && (
                <text x="560" y="340" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={VIOLET} textAnchor="middle">A pair of the same prime is a square: 2 × 2 = 4, 3 × 3 = 9 …</text>
              )}
            </>
          )}

          {step >= 4 && (
            <g>
              <rect x="220" y="376" width="760" height="46" rx="14" fill="#fff7ed" stroke={KEY} strokeWidth="3" />
              <text x="600" y="408" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">
                {outs.length ? `${outs.join(' × ')} = ${out} outside,  ${inside === 1 ? 'nothing' : inside} inside  →  ` : 'nothing comes out  →  '}
                <tspan fill={KEY}>{inside === 1 ? `${out}` : `${out === 1 ? '' : out}√${inside}`}</tspan>
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-2 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Btn>
        <Btn tone="violet" icon={ArrowRight} disabled={step === 4} onClick={() => setStep((s) => Math.min(4, s + 1))}>Next step</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % NUMBERS.length); setStep(0); }}>Next number</Btn>
      </div>
    </div>
  );
}

/* ============================================================= *
 * WIDGET 3 — CONJUGATE MACHINE
 * ============================================================= */
const EXAMPLES = [
  { kind: 'binomial', num: [[5, 1]], den: [[3, 1], [-1, 2]] },
  { kind: 'binomial', num: [[6, 1]], den: [[4, 1], [-1, 10]] },
  { kind: 'binomial', num: [[1, 3], [1, 1]], den: [[1, 3], [-1, 1]] },
];
const CM_STEPS = ['The question', 'Multiply by the conjugate', 'Multiply out the bottom', 'The surds cancel', 'Multiply out the top', 'Simplify fully'];

export function ConjugateMachine() {
  const [which, setWhich] = useState(0);
  const [step, setStep] = useState(0);
  const item = EXAMPLES[which];
  const m = deriveRationalise(item);
  const conjL = sumLatex(m.conj);
  const numL = sumLatex(item.num);
  const denL = sumLatex(item.den);
  const cells = m.denCells;

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex flex-wrap justify-center gap-1.5">
        {CM_STEPS.slice(1).map((label, k) => (
          <span key={label} className={`px-2.5 py-1 rounded-full border-2 text-[10px] sm:text-xs font-black uppercase tracking-wide ${step === k + 1 ? 'text-white border-transparent' : step > k + 1 ? 'border-orange-300 text-orange-700 bg-orange-50' : 'border-slate-200 text-slate-400 bg-white'}`}
            style={step === k + 1 ? { backgroundColor: KEY } : undefined}>{k + 1} {label}</span>
        ))}
      </div>

      <div className="flex-1 min-h-0 rounded-2xl bg-white border-2 border-slate-200 p-3 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 overflow-auto text-slate-900">
        {/* the fraction, growing */}
        <div className="flex flex-col items-center gap-2 text-2xl sm:text-3xl [&_.katex]:inline-block">
          <SafeInlineMath math={rationaliseQuestionLatex(item)} />
          {step >= 1 && (
            <div className="animate-in fade-in slide-in-from-left-2">
              <SafeInlineMath math={`= \\dfrac{${numL}}{${denL}} \\times \\dfrac{\\color{${KEY}}{${conjL}}}{\\color{${KEY}}{${conjL}}}`} />
            </div>
          )}
          {step >= 3 && (
            <div className="animate-in fade-in"><SafeInlineMath math={`= \\dfrac{${item.num.length > 1 ? `(${numL})` : numL}(${conjL})}{${m.bottom}}`} /></div>
          )}
          {step >= 4 && (
            <div className="animate-in fade-in"><SafeInlineMath math={`= \\dfrac{${sumLatex(m.topCells.flat().map((c) => c.value))}}{${m.bottom}}`} /></div>
          )}
          {/* The last line only when simplifying changed something — otherwise it
              would print the line above it again. */}
          {step >= 5 && (
            <div className="animate-in fade-in rounded-xl px-3 py-1 border-2" style={{ borderColor: KEY, backgroundColor: '#fff7ed' }}>
              <SafeInlineMath math={`${m.final.divisor === 1 ? '' : '= '}${fractionLatex(m.final.terms, m.final.den)}${m.final.divisor === 1 ? ' \\quad \\text{(nothing divides — done)}' : ''}`} />
            </div>
          )}
        </div>

        {/* the bottom, in a grid */}
        {step >= 2 && (
          <div className="flex flex-col items-center gap-2 animate-in fade-in">
            <div className="text-xs font-black uppercase tracking-widest" style={{ color: TEAL }}>the bottom</div>
            <table className="border-separate border-spacing-1 text-lg sm:text-xl [&_.katex]:inline-block">
              <thead>
                <tr>
                  <th className="px-2 text-slate-400">×</th>
                  {m.conj.map((t, j) => <th key={j} className="px-3 py-1 rounded-lg bg-orange-50"><SafeInlineMath math={termLatex(t)} /></th>)}
                </tr>
              </thead>
              <tbody>
                {item.den.map((t, i) => (
                  <tr key={i}>
                    <th className="px-3 py-1 rounded-lg bg-orange-50"><SafeInlineMath math={termLatex(t)} /></th>
                    {cells[i].map((c, j) => {
                      const cross = c.value[1] > 1;
                      const struck = step >= 3 && cross;
                      return (
                        <td key={j} className={`relative px-3 py-2 rounded-lg border-2 text-center transition-all ${cross ? (struck ? 'border-rose-300 bg-rose-50 text-slate-400' : 'border-slate-200 bg-slate-50') : 'border-emerald-300 bg-emerald-50'}`}>
                          <SafeInlineMath math={termLatex(c.value)} />
                          {struck && <span className="pointer-events-none absolute left-1 right-1 top-1/2 h-[3px] -rotate-12 rounded bg-rose-500" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {step >= 3 && (
              <div className="text-base sm:text-lg font-bold text-emerald-700 [&_.katex]:inline-block">
                <SafeInlineMath math={`${m.firstSq} - ${m.secondSq} = ${m.bottom}`} /> — no surd left
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 flex items-center justify-center gap-2 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={step === 5} onClick={() => setStep((s) => Math.min(5, s + 1))}>Next step</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % EXAMPLES.length); setStep(0); }}>Next example</Btn>
      </div>
      {step === 5 && tidy(m.final.terms).length > 0 && m.final.divisor !== 1 && (
        <p className="-mt-1 text-center text-xs font-bold text-slate-500">Every number on the top and the bottom divided by {Math.abs(m.final.divisor)}.</p>
      )}
    </div>
  );
}
