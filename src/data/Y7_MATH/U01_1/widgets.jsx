// src/data/Y7_MATH/U01_1/widgets.jsx
// Interactive tools for 1.1 Adding & Subtracting Integers.
//
// Ported from the classroom deck (C:\Users\bowen\lessons), reduced to the two
// widgets the self-study deck keeps: the Number Line Jumper and Say It, Then
// Write It. The classroom TeamActivityWidget (a team timer) is dropped — the
// arcade is the unit's game now. Each takes the deck's `lang` so its interface
// is bilingual; Notes.jsx forwards it through WidgetRenderer.
import { useState } from 'react'
import { DIAGRAMS } from './diagrams.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en)

// Shared shells so every widget on the projector has the same silhouette.
const Stage = ({ children, className = '' }) => (
  <div className={`flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden ${className}`}>
    {children}
  </div>
)

const Controls = ({ children }) => (
  <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
    {children}
  </div>
)

/** A −/+ pair around a big readable value. Steadier than a slider on a screen. */
const Stepper = ({ label, display, onDown, onUp, colour }) => (
  <div className="flex items-center gap-2">
    <span className="w-[4.5rem] text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{label}</span>
    <button onClick={onDown} className="w-9 h-9 rounded-lg font-black text-lg bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 active:scale-95">−</button>
    <span className="flex-1 text-center font-mono font-black text-lg tabular-nums" style={{ color: colour }}>{display}</span>
    <button onClick={onUp} className="w-9 h-9 rounded-lg font-black text-lg bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 active:scale-95">+</button>
  </div>
)

/* ============================================================= *
 * WIDGET 2 — NUMBER LINE JUMPER
 * Set a start, choose add or subtract, choose the second number,
 * and watch the jump. The rule stays HIDDEN behind a button: the
 * class works it out from the jumps first, then checks itself.
 * ============================================================= */
export const NumberLineWidget = ({ lang = 'en' }) => {
  const [start, setStart] = useState(-3)
  const [op, setOp] = useState('add')
  const [amount, setAmount] = useState(-4)
  const [showRule, setShowRule] = useState(false)

  const delta = op === 'add' ? amount : -amount
  const result = start + delta

  const lo = Math.min(start, result, 0) - 1
  const hi = Math.max(start, result, 0) + 1
  const span = Math.max(hi - lo, 4)
  const W = 620, H = 150, X0 = 45, X1 = 575, midY = 95
  const px = (v) => X0 + ((v - lo) / span) * (X1 - X0)
  const labelEvery = span > 18 ? 4 : span > 12 ? 2 : 1

  const ticks = []
  for (let v = Math.ceil(lo); v <= Math.floor(hi); v++) ticks.push(v)

  const sx = px(start), rx = px(result)
  const right = delta > 0
  const jump = delta === 0 ? '#94a3b8' : right ? GREEN : RED
  const amtStr = amount < 0 ? `(${amount})` : `${amount}`

  const rule =
    delta === 0 ? pick(lang, 'No movement — the second number is zero.', 'Không di chuyển — số thứ hai bằng không.')
      : op === 'add' && amount > 0 ? pick(lang, 'Add a positive → move RIGHT.', 'Cộng số dương → đi sang PHẢI.')
        : op === 'add' && amount < 0 ? pick(lang, 'Add a negative → move LEFT.', 'Cộng số âm → đi sang TRÁI.')
          : op === 'subtract' && amount > 0 ? pick(lang, 'Subtract a positive → move LEFT.', 'Trừ số dương → đi sang TRÁI.')
            : pick(lang, 'Subtract a negative → move RIGHT.', 'Trừ số âm → đi sang PHẢI.')

  const clampStart = (n) => Math.max(-10, Math.min(10, n))
  const clampAmt = (n) => Math.max(-9, Math.min(9, n))

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage className="items-center justify-center">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono font-black rounded-xl px-4 py-1.5 shadow-md text-sm sm:text-lg whitespace-nowrap z-10">
          {start} {op === 'add' ? '+' : '−'} {amtStr} = <span style={{ color: right ? '#8fd14f' : '#ff8f9a' }}>{result}</span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          {/* White plate, like the authored diagrams: the line art then reads
              the same on a light or a dark slide. */}
          <rect x="0" y="0" width={W} height={H} rx="16" fill="#ffffff" />
          <line x1={X0} y1={midY} x2={X1} y2={midY} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          {ticks.map((v) => (
            <g key={v}>
              <line x1={px(v)} y1={midY - 6} x2={px(v)} y2={midY + 6} stroke="#94a3b8" strokeWidth="2" />
              {v % labelEvery === 0 && (
                <text x={px(v)} y={midY + 24} fontFamily="Inter, sans-serif" fontSize="14" fontWeight={v === 0 ? 900 : 'bold'} fill={v === 0 ? '#2b2b2b' : '#7c8a95'} textAnchor="middle">{v}</text>
              )}
            </g>
          ))}

          <defs>
            <marker id="nl-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill={jump} />
            </marker>
          </defs>
          {delta !== 0 && (
            <path d={`M ${sx} ${midY - 8} Q ${(sx + rx) / 2} 44 ${rx} ${midY - 8}`} fill="none" stroke={jump} strokeWidth="4" markerEnd="url(#nl-head)" />
          )}
          <text x={(sx + rx) / 2} y="36" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="900" fill={jump} textAnchor="middle">
            {delta === 0 ? '' : `${right ? '+' : '−'}${Math.abs(delta)}`}
          </text>

          <circle cx={sx} cy={midY} r="7" fill={BLUE} stroke="white" strokeWidth="2" />
          <text x={sx} y={midY - 16} fontFamily="Inter, sans-serif" fontSize="16" fontWeight="900" fill={BLUE} textAnchor="middle">{start}</text>
          <circle cx={rx} cy={midY} r="8" fill={jump} stroke="white" strokeWidth="2" />
          <text x={rx} y={midY + 44} fontFamily="Inter, sans-serif" fontSize="17" fontWeight="900" fill={jump} textAnchor="middle">{result}</text>
        </svg>
      </Stage>

      <Controls>
        <div className="space-y-2">
          <Stepper
            label={pick(lang, 'Start', 'Bắt đầu')} display={start} colour={BLUE}
            onDown={() => setStart(clampStart(start - 1))} onUp={() => setStart(clampStart(start + 1))} />
          <div className="flex items-center gap-2">
            <span className="w-[4.5rem] text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{pick(lang, 'Do', 'Phép')}</span>
            <button onClick={() => setOp('add')}
              className="flex-1 py-1.5 rounded-lg font-black text-sm border-2 transition-all"
              style={op === 'add' ? { backgroundColor: GREEN, borderColor: GREEN, color: '#fff' } : { borderColor: '#cbd5e1', color: '#64748b' }}>
              + {pick(lang, 'Add', 'Cộng')}
            </button>
            <button onClick={() => setOp('subtract')}
              className="flex-1 py-1.5 rounded-lg font-black text-sm border-2 transition-all"
              style={op === 'subtract' ? { backgroundColor: RED, borderColor: RED, color: '#fff' } : { borderColor: '#cbd5e1', color: '#64748b' }}>
              − {pick(lang, 'Subtract', 'Trừ')}
            </button>
          </div>
          <Stepper
            label={pick(lang, 'Number', 'Số')} display={amtStr} colour={ORANGE}
            onDown={() => setAmount(clampAmt(amount - 1))} onUp={() => setAmount(clampAmt(amount + 1))} />
        </div>

        <button
          onClick={() => setShowRule((v) => !v)}
          className="w-full mt-3 py-2 rounded-xl font-black text-xs uppercase tracking-widest border-2 active:scale-95 transition-all"
          style={showRule ? { backgroundColor: ORANGE, borderColor: ORANGE, color: '#fff' } : { borderColor: ORANGE, color: ORANGE }}>
          {showRule ? rule : pick(lang, 'Check your rule', 'Kiểm tra quy tắc của em')}
        </button>
      </Controls>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 3 — SAY IT, THEN WRITE IT
 * The language drill. One sentence at a time: press once for the
 * words that carry the maths, again for the calculation, again for
 * the answer. Some items run the other way — from a calculation to
 * the English you would use to say it.
 * ============================================================= */
const DRILL = [
  {
    prompt: 'At noon it is 4 °C. By midnight the temperature has fallen by 9 degrees.',
    promptVn: 'Buổi trưa là 4 °C. Đến nửa đêm nhiệt độ đã giảm 9 độ.',
    signal: 'fallen by → go down → subtract',
    signalVn: 'fallen by (giảm) → đi xuống → trừ',
    calc: '4 − 9',
    answer: '−5 °C',
  },
  {
    prompt: 'Mr Bowen owes the school canteen $12.',
    promptVn: 'Thầy Bowen nợ căng tin trường $12.',
    signal: 'owes → a debt → a negative amount',
    signalVn: 'owes (nợ) → khoản nợ → số âm',
    calc: '−12',
    answer: '−$12',
  },
  {
    prompt: 'The submarine is 30 m below sea level. It rises 12 m.',
    promptVn: 'Tàu ngầm ở 30 m dưới mực nước biển. Nó nổi lên 12 m.',
    signal: 'below → negative · rises → go up → add',
    signalVn: 'below (dưới) → số âm · rises (nổi lên) → đi lên → cộng',
    calc: '−30 + 12',
    answer: '−18 m',
  },
  {
    prompt: 'Subtract 8 from 5.',
    promptVn: 'Subtract 8 from 5. (Lấy 5 trừ đi 8.)',
    signal: 'subtract … from … → the numbers swap round',
    signalVn: 'subtract … from … → hai số đổi chỗ cho nhau',
    calc: '5 − 8',
    answer: '−3',
    figure: DIAGRAMS.WORD_ORDER,
  },
  {
    prompt: 'Find the difference between −4 and 6.',
    promptVn: 'Tìm hiệu (khoảng cách) giữa −4 và 6.',
    signal: 'difference between → the gap → bigger − smaller',
    signalVn: 'difference between → khoảng cách → số lớn − số bé',
    calc: '6 − (−4)',
    answer: '10',
  },
  {
    prompt: 'Mr Bowen has −$6 in the bank. He deposits $20, then withdraws $9.',
    promptVn: 'Thầy Bowen có −$6 trong ngân hàng. Thầy gửi vào $20, rồi rút ra $9.',
    signal: 'deposits → add · withdraws → subtract',
    signalVn: 'deposits (gửi vào) → cộng · withdraws (rút ra) → trừ',
    calc: '−6 + 20 − 9',
    answer: '$5',
  },
  {
    reverse: true,
    prompt: '−6 + 10',
    promptVn: '−6 + 10',
    signal: 'Say it out loud in English, three different ways.',
    signalVn: 'Hãy đọc to bằng tiếng Anh, theo ba cách khác nhau.',
    calc: '“negative six plus ten” · “ten more than negative six” · “start at −6 and increase by 10”',
    calcVn: '“negative six plus ten” · “ten more than negative six” · “start at −6 and increase by 10”',
    answer: '4',
  },
  {
    reverse: true,
    prompt: '3 − (−5)',
    promptVn: '3 − (−5)',
    signal: 'Say it out loud in English, two different ways.',
    signalVn: 'Hãy đọc to bằng tiếng Anh, theo hai cách khác nhau.',
    calc: '“three subtract negative five” · “the difference between −5 and 3”',
    calcVn: '“three subtract negative five” · “the difference between −5 and 3”',
    answer: '8',
  },
]

export const TranslateWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [step, setStep] = useState(0) // 0 prompt · 1 signal · 2 calculation · 3 answer
  const item = DRILL[i]
  const last = i === DRILL.length - 1

  const go = (n) => { setI(n); setStep(0) }

  const nextLabel = step === 0 ? pick(lang, 'Which words matter?', 'Từ nào quan trọng?')
    : step === 1 ? (item.reverse ? pick(lang, 'Show the English', 'Hiện câu tiếng Anh') : pick(lang, 'Write the calculation', 'Viết phép tính'))
      : step === 2 ? pick(lang, 'Show the answer', 'Hiện đáp án')
        : pick(lang, 'Next sentence', 'Câu tiếp theo')

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {item.reverse ? pick(lang, 'Maths → English', 'Toán → Tiếng Anh') : pick(lang, 'English → Maths', 'Tiếng Anh → Toán')}
          </span>
          <span className="font-mono font-black text-xs text-slate-400 tabular-nums">{i + 1}/{DRILL.length}</span>
        </div>

        <div className="rounded-xl border-2 px-3 py-2.5 mb-2 shrink-0" style={{ borderColor: TEAL, backgroundColor: `${TEAL}0f` }}>
          <p className={`font-black text-slate-800 dark:text-slate-100 leading-snug ${item.reverse ? 'font-mono text-3xl text-center' : 'text-base sm:text-lg lg:text-xl'}`}>
            {pick(lang, item.prompt, item.promptVn)}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-2">
          {step >= 1 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${ORANGE}14` }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: ORANGE }}>{pick(lang, 'Signal words', 'Từ khoá')}</div>
              <div className="font-bold text-[15px] sm:text-base lg:text-lg text-slate-700 dark:text-slate-200">{pick(lang, item.signal, item.signalVn)}</div>
            </div>
          )}
          {step >= 2 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${PURPLE}12` }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: PURPLE }}>
                {item.reverse ? pick(lang, 'Say it like this', 'Nói như thế này') : pick(lang, 'The calculation', 'Phép tính')}
              </div>
              <div className={`font-black text-slate-800 dark:text-slate-100 ${item.reverse ? 'text-[15px] sm:text-base leading-snug' : 'font-mono text-2xl'}`}>
                {pick(lang, item.calc, item.calcVn)}
              </div>
              {item.figure && (
                <div className="mt-2 w-full rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white p-1"
                  style={{ aspectRatio: '620 / 240' }}
                  dangerouslySetInnerHTML={{ __html: item.figure }} />
              )}
            </div>
          )}
          {step >= 3 && (
            <div className="rounded-xl px-3 py-2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 border-2" style={{ borderColor: GREEN, backgroundColor: `${GREEN}12` }}>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>{pick(lang, 'Answer', 'Đáp án')}</span>
              <span className="font-mono font-black text-2xl" style={{ color: GREEN }}>{item.answer}</span>
            </div>
          )}
        </div>
      </Stage>

      <Controls>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(Math.max(0, i - 1))}
            disabled={i === 0}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95">
            {pick(lang, 'Back', 'Lùi')}
          </button>
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : !last && go(i + 1))}
            disabled={step === 3 && last}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: step === 3 ? PURPLE : TEAL, borderColor: step === 3 ? PURPLE : TEAL }}>
            {step === 3 && last ? pick(lang, 'That is all of them', 'Hết rồi') : nextLabel}
          </button>
        </div>
      </Controls>
    </div>
  )
}
