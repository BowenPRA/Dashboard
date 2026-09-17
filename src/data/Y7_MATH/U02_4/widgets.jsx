// src/data/Y7_MATH/U02_4/widgets.jsx
// The showcase stepper for 2.4 Expanding Brackets, ported from the classroom
// deck (C:\Users\bowen\lessons, content/y7-math/U02_4/widgets.jsx).
//
//   Expand        The book's grid method, one box per press. The outside number
//                 and one inside term light up, the product lands in that box,
//                 and the working line is written underneath — so the student
//                 says "five times a" out loud BEFORE the box is filled. Two
//                 sets, one per slide: ExpandPlus (plus signs only) and
//                 ExpandMinus (a minus inside the brackets, which is where the
//                 marks are lost).
//
// The classroom file also held RightOrWrong, a full-slide thumbs-up/down room
// game. It does not port: a student alone plays it as the `sort` activity on
// slide 15 of notes.js, which scores every card.
//
// A showcase slide hands a widget no isDisplayMode, so Expand draws its stage as
// ONE SVG (text scales with the panel) and keeps only the buttons as HTML. Every
// SVG opens with a white plate.
import { useState } from 'react';
import { Undo2, ArrowRight, SkipForward } from 'lucide-react';

const INK = '#2b2b2b';
const KEY = '#c25e12';
const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const MUTED = '#5b6770';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const MINUS = '−';

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

// `out` is the number outside the brackets; `inner` is the list of terms inside
// as [coefficient, letter].
const SETS = {
  plus: [
    { out: 2, inner: [[1, 'x'], [3, '']] },
    { out: 3, inner: [[1, 'x'], [4, '']] },
    { out: 5, inner: [[1, 'm'], [1, '']] },
    { out: 4, inner: [[2, 'n'], [3, '']] },
  ],
  minus: [
    { out: 3, inner: [[1, 'x'], [-2, '']] },
    { out: 6, inner: [[1, 'k'], [-3, '']] },
    { out: 2, inner: [[1, 'y'], [-4, '']] },
    { out: 7, inner: [[1, ''], [-1, 'w']] },
  ],
};

// 1x prints as x, −1w prints as −w; a bare number keeps its digits.
const body = ([c, v]) => (v && Math.abs(c) === 1 ? v : `${Math.abs(c)}${v}`);
const signed = (t, first) => (first ? `${t[0] < 0 ? MINUS : ''}${body(t)}` : `${t[0] < 0 ? MINUS : '+'} ${body(t)}`);
const product = (out, t) => [out * t[0], t[1]];
// On the working line a negative term is bracketed, so 3 × (−2) = −6 reads as
// the multiplication it is rather than as 3 × 2.
const factor = (t) => (t[0] < 0 ? `(${MINUS}${body(t)})` : body(t));
const value = (t) => `${t[0] < 0 ? MINUS : ''}${body(t)}`;

const bracketText = (p) => `${p.out}(${p.inner.map((t, i) => signed(t, i === 0)).join(' ')})`;
const answerText = (p) => p.inner.map((t, i) => signed(product(p.out, t), i === 0)).join(' ');

const COL0 = 150;
const COLW = 200;
const ROWH = 96;
const TOP = 118;

function Expand({ lang = 'en', set }) {
  const list = SETS[set];
  const [which, setWhich] = useState(0);
  const [step, setStep] = useState(0);
  const p = list[which];
  const n = p.inner.length;
  const total = COL0 + COLW * n;
  const x0 = 560 - total / 2;
  const done = step >= n + 1;
  const active = step >= 1 && step <= n ? step - 1 : -1;

  const cellX = (i) => x0 + COL0 + COLW * i;

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="560" y="78" fontFamily={FONT} fontSize="54" fontWeight="bold" fill={INK} textAnchor="middle">
            {tr(lang, 'Expand ', 'Khai triển ')}
            <tspan fill={KEY}>{bracketText(p)}</tspan>
          </text>
          <text x="1096" y="52" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{which + 1} / {list.length}</text>

          {/* header row: × and each term inside */}
          <rect x={x0} y={TOP} width={COL0} height={ROWH} fill="#eef1f4" stroke={INK} strokeWidth="3" />
          <text x={x0 + COL0 / 2} y={TOP + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={MUTED} textAnchor="middle">×</text>
          {p.inner.map((t, i) => (
            <g key={`h${i}`}>
              <rect x={cellX(i)} y={TOP} width={COLW} height={ROWH} fill={active === i ? '#fdf1e3' : '#eef1f4'} stroke={active === i ? KEY : INK} strokeWidth={active === i ? 5 : 3} />
              <text x={cellX(i) + COLW / 2} y={TOP + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={active === i ? KEY : PURPLE} textAnchor="middle">
                {signed(t, true)}
              </text>
            </g>
          ))}

          {/* answer row: the outside number and the products */}
          <rect x={x0} y={TOP + ROWH} width={COL0} height={ROWH} fill={active >= 0 ? '#fdf1e3' : '#ffffff'} stroke={active >= 0 ? KEY : INK} strokeWidth={active >= 0 ? 5 : 3} />
          <text x={x0 + COL0 / 2} y={TOP + ROWH + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={active >= 0 ? KEY : TEAL} textAnchor="middle">{p.out}</text>
          {p.inner.map((t, i) => {
            // The box fills on the same press that lights it up, so the student
            // says the multiplication BEFORE the press and sees it land after.
            const filled = step >= i + 1;
            const isNew = active === i;
            return (
              <g key={`a${i}`}>
                <rect x={cellX(i)} y={TOP + ROWH} width={COLW} height={ROWH} fill={isNew ? '#fdf1e3' : '#ffffff'} stroke={isNew ? KEY : INK} strokeWidth={isNew ? 5 : 3} />
                <text x={cellX(i) + COLW / 2} y={TOP + ROWH + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={filled ? (isNew ? KEY : INK) : '#c3cbd2'} textAnchor="middle">
                  {filled ? signed(product(p.out, t), true) : '?'}
                </text>
              </g>
            );
          })}

          {/* the working line, then the finished expansion */}
          {active >= 0 && (
            <text x="560" y="392" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={KEY} textAnchor="middle">
              {p.out} × {factor(p.inner[active])} = {value(product(p.out, p.inner[active]))}
            </text>
          )}
          {done && (
            <g>
              <rect x="170" y="330" width="780" height="92" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
              <text x="560" y="392" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={INK} textAnchor="middle">
                {bracketText(p)} = <tspan fill={KEY}>{answerText(p)}</tspan>
              </text>
            </g>
          )}
          {step === 0 && (
            <text x="560" y="392" fontFamily={FONT} fontSize="32" fill="#9aa5ae" textAnchor="middle">
              {tr(lang, 'Say the first multiplication, then press Next box.', 'Nói phép nhân đầu tiên, rồi bấm Ô tiếp.')}
            </text>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={done} onClick={() => setStep((s) => Math.min(n + 1, s + 1))}>{tr(lang, 'Next box', 'Ô tiếp')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % list.length); setStep(0); }}>{tr(lang, 'Next question', 'Câu tiếp')}</Btn>
      </div>
    </div>
  );
}

export function ExpandPlus({ lang }) { return <Expand lang={lang} set="plus" />; }
export function ExpandMinus({ lang }) { return <Expand lang={lang} set="minus" />; }
