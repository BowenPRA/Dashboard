// src/data/Y7_MATH/U03_1/widgets.jsx
// The "say it before you press" stepper for 3.1 Multiplying and Dividing by
// Powers of 10, ported from the classroom deck (content/y7-math/U03_1_2/
// widgets.jsx).
//
//   PlaceShift   The whole point of 3.1: multiplying by a power of 10 does not
//                "add zeros", it MOVES every digit along the place-value table.
//                One press = one place. The decimal point never moves; the
//                digits do. Zeros that appear are orange, because they are
//                placeholders holding a column open, not digits someone
//                invented. The student says each move BEFORE pressing. Two
//                sets, one per slide: ShiftLeft (multiplying — it settles the
//                7.2 × 10³ vote) and ShiftRight (dividing — where the orange
//                zeros appear after the point).
//
// Changed from the classroom: the four sets are split over two slides and each
// gains a third number (0.38 × 10², where NO zero appears, and 35 ÷ 10²); a
// digit is keyed by the column it STARTED in, so it slides to its new column
// instead of being redrawn there.
//
// The classroom's room game, Which Way?, is not ported: in the self-study deck
// it is a scored `sort` activity (slide 13), and the Quick Fire task deals the
// cards.
//
// A showcase slide hands a widget no isDisplayMode, so the stage is ONE SVG
// (text scales with the panel) and only the buttons are HTML. It opens with a
// white plate.
import { useState } from 'react';
import { Undo2, Move, SkipForward } from 'lucide-react';

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
const tr = (lang, en, vn) => (lang === 'vn' ? vn : en);

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tones[tone] ? tone : 'teal']}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  );
}

// `n` is the number as written, `op` the operation, `k` the power of 10.
const SETS = {
  left: [
    { n: '7.2', op: '×', k: 3 },
    { n: '6.5', op: '×', k: 4 },
    { n: '0.38', op: '×', k: 2 },
  ],
  right: [
    { n: '48600', op: '÷', k: 3 },
    { n: '702', op: '÷', k: 4 },
    { n: '35', op: '÷', k: 2 },
  ],
};

// "7.2" -> { 0: '7', -1: '2' }. Place 0 is the ones column; left is positive.
function parseNumber(text) {
  const [whole, frac = ''] = text.split('.');
  const map = {};
  [...whole].forEach((d, i) => { map[whole.length - 1 - i] = d; });
  [...frac].forEach((d, i) => { map[-(i + 1)] = d; });
  // The 0 in front of "0.38" is not a digit of the number: it is a placeholder
  // for the empty ones column, and the table draws it as one.
  if (whole === '0') delete map[0];
  return map;
}

// Every digit's place moves by `delta`. The decimal point stays where it is.
const shiftBy = (map, delta) =>
  Object.fromEntries(Object.entries(map).map(([p, d]) => [Number(p) + delta, d]));

// The cells actually written down: every column from the top digit (or the ones
// column, whichever is higher) down to the last digit that is not a trailing
// zero. Columns with no digit of their own get a placeholder zero.
function cellsFor(map) {
  const places = Object.keys(map).map(Number);
  const hi = Math.max(0, ...places);
  let lo = Math.min(0, ...places);
  while (lo < 0 && (map[lo] === undefined || map[lo] === '0')) lo += 1;
  const out = [];
  for (let p = hi; p >= lo; p -= 1) out.push({ p, ch: map[p] ?? '0', placeholder: map[p] === undefined });
  return out;
}

const textOf = (cells) =>
  cells.map((c) => (c.p === -1 ? `.${c.ch}` : c.ch)).join('').replace(/^\./, '0.');

function PlaceShift({ lang = 'en', set: setName }) {
  const list = SETS[setName];
  const [which, setWhich] = useState(0);
  const [step, setStep] = useState(0);
  const set = list[which];
  const dir = set.op === '×' ? 1 : -1;

  const start = parseNumber(set.n);
  const now = shiftBy(start, dir * step);
  const cells = cellsFor(now);

  // Columns span every place the number visits, so nothing jumps out of frame.
  const endPlaces = cellsFor(shiftBy(start, dir * set.k)).map((c) => c.p);
  const startPlaces = cellsFor(start).map((c) => c.p);
  const hiP = Math.max(...startPlaces, ...endPlaces);
  const loP = Math.min(...startPlaces, ...endPlaces);
  const nCols = hiP - loP + 1;
  const GAP = 20;
  const CW = (960 - GAP) / nCols;
  const X0 = 80;
  const xOf = (p) => X0 + (hiP - p) * CW + (p < 0 ? GAP : 0);
  const pointX = X0 + (hiP + 1) * CW + GAP / 2;
  const hasPoint = loP < 0;

  const running =
    step === 0 ? set.n : `${set.n} ${set.op} 10${SUP[step]} = ${textOf(cells)}`;

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="60" y="56" fontFamily={FONT} fontSize="34" fontWeight="bold" fill={INK} textAnchor="start">
            {set.n} {set.op} 10{SUP[set.k]}
          </text>
          <text x="1060" y="56" fontFamily={FONT} fontSize="24" fontWeight="bold" fill="#9aa5ae" textAnchor="end">
            {which + 1} / {list.length}
          </text>
          <text x="560" y="56" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY} textAnchor="middle">
            {step === 0
              ? tr(lang, 'Ready', 'Sẵn sàng')
              : tr(lang, `${step} of ${set.k} places ${dir > 0 ? 'left' : 'right'}`,
                        `${step} trên ${set.k} cột sang ${dir > 0 ? 'trái' : 'phải'}`)}
          </text>

          {/* Empty columns, so the student can see where a digit is heading. */}
          {Array.from({ length: nCols }, (_, i) => {
            const p = hiP - i;
            return (
              <rect key={`c${p}`} x={xOf(p)} y="110" width={CW} height="130" rx="8"
                    fill={p < 0 ? '#fdf8f2' : '#f7f9fa'} stroke={RULE} strokeWidth="2" />
            );
          })}

          {hasPoint && <circle cx={pointX} cy="228" r="10" fill={INK} />}

          {/* A digit is keyed by the column it started in, so a press slides it
              to the next column; a placeholder is keyed by the column it holds,
              and fades in once the digit that was there has moved out. */}
          <style>{'@keyframes u31-hold { from { opacity: 0; } to { opacity: 1; } }'}</style>
          {cells.map((c) => (
            <g key={c.placeholder ? `${which}-hold-${c.p}` : `${which}-digit-${c.p - dir * step}`}
               style={{
                 transform: `translate(${xOf(c.p)}px, 0px)`,
                 transition: 'transform 600ms cubic-bezier(.4,0,.2,1)',
                 animation: c.placeholder && step > 0 ? 'u31-hold 250ms ease-out 400ms both' : undefined,
               }}>
              <text x={CW / 2} y="205" fontFamily={FONT} fontSize={Math.min(76, CW * 0.8)} fontWeight="bold"
                    fill={c.placeholder ? KEY : INK} textAnchor="middle">
                {c.ch}
              </text>
            </g>
          ))}

          <rect x="80" y="290" width="960" height="92" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
          <text x="560" y="352" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={INK} textAnchor="middle">
            {running}
          </text>

          <text x="560" y="414" fontFamily={FONT} fontSize="24" fill={MUTED} textAnchor="middle">
            {tr(lang, 'An orange zero is holding a column open.',
                      'Số 0 màu cam giữ chỗ cho một cột.')}
          </text>
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          {tr(lang, 'Back', 'Lùi')}
        </Btn>
        <Btn tone="orange" icon={Move} disabled={step === set.k} onClick={() => setStep((s) => Math.min(set.k, s + 1))}>
          {tr(lang, 'Move one place', 'Dịch một cột')}
        </Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % list.length); setStep(0); }}>
          {tr(lang, 'Next number', 'Số khác')}
        </Btn>
      </div>
    </div>
  );
}

export function ShiftLeft({ lang }) { return <PlaceShift lang={lang} set="left" />; }
export function ShiftRight({ lang }) { return <PlaceShift lang={lang} set="right" />; }
