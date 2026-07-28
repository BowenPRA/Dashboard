import React, { useState } from 'react';

/* ============================================================= *
 * WIDGET 1 — NUMBER LINE JUMPER
 * Set a start, pick + / −, pick a second number (may be negative),
 * and watch the jump on an auto-scaling number line. The rule hint
 * updates live — the point of the lesson made visual.
 * ============================================================= */
export const NumberLineWidget = () => {
  const [start, setStart] = useState(-3);
  const [op, setOp] = useState('add');       // 'add' | 'subtract'
  const [amount, setAmount] = useState(-4);  // second number, may be negative

  const effectiveDelta = op === 'add' ? amount : -amount;
  const result = start + effectiveDelta;

  // Auto-scale the visible window to the numbers in play.
  const lo = Math.min(start, result, 0) - 1;
  const hi = Math.max(start, result, 0) + 1;
  const span = Math.max(hi - lo, 4);
  const W = 620, H = 150, X0 = 45, X1 = 575, midY = 95;
  const px = (v) => X0 + ((v - lo) / span) * (X1 - X0);
  const labelEvery = span > 18 ? 4 : span > 12 ? 2 : 1;

  const ticks = [];
  for (let v = Math.ceil(lo); v <= Math.floor(hi); v++) ticks.push(v);

  const sx = px(start), rx = px(result);
  const arcTop = 40;
  const goingRight = effectiveDelta > 0;
  const jumpColor = effectiveDelta === 0 ? '#94a3b8' : goingRight ? '#10b981' : '#ef4444';

  // Notation: 2 − (−5), −3 + (−4)
  const amtStr = amount < 0 ? `(${amount})` : `${amount}`;
  const opSym = op === 'add' ? '+' : '−';

  const hint =
    effectiveDelta === 0 ? 'No movement — you added or subtracted zero.'
    : op === 'add' && amount >= 0 ? 'Adding a positive → move RIGHT.'
    : op === 'add' && amount < 0 ? 'Adding a negative → move LEFT.'
    : op === 'subtract' && amount >= 0 ? 'Subtracting a positive → move LEFT.'
    : 'Subtracting a negative = ADDING → move RIGHT.';

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        {/* Equation ribbon */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white font-mono font-black rounded-xl px-4 py-1.5 shadow-md text-sm sm:text-lg whitespace-nowrap z-10">
          {start} {opSym} {amtStr} = <span style={{ color: jumpColor }}>{result}</span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          {/* axis */}
          <line x1={X0} y1={midY} x2={X1} y2={midY} stroke="#1e293b" strokeWidth="3" strokeLinecap="round" className="dark:stroke-slate-300" />
          {ticks.map((v) => (
            <g key={v}>
              <line x1={px(v)} y1={midY - 6} x2={px(v)} y2={midY + 6} stroke="#94a3b8" strokeWidth="2" />
              {v % labelEvery === 0 && (
                <text x={px(v)} y={midY + 24} fontFamily="monospace" fontSize="12" fontWeight={v === 0 ? 900 : 'bold'} fill={v === 0 ? '#10b981' : '#64748b'} textAnchor="middle">{v}</text>
              )}
            </g>
          ))}

          {/* jump arc */}
          {effectiveDelta !== 0 && (
            <path d={`M ${sx} ${midY - 6} Q ${(sx + rx) / 2} ${arcTop} ${rx} ${midY - 6}`} fill="none" stroke={jumpColor} strokeWidth="3.5" markerEnd="url(#nl-head)" />
          )}
          <defs>
            <marker id="nl-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill={jumpColor} />
            </marker>
          </defs>
          <text x={(sx + rx) / 2} y={arcTop - 4} fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill={jumpColor} textAnchor="middle">
            {effectiveDelta === 0 ? '' : `${goingRight ? '+' : '−'}${Math.abs(effectiveDelta)}`}
          </text>

          {/* markers */}
          <circle cx={sx} cy={midY} r="7" fill="#3b82f6" stroke="white" strokeWidth="2" />
          <text x={sx} y={midY - 14} fontFamily="monospace" fontSize="13" fontWeight="900" fill="#3b82f6" textAnchor="middle">{start}</text>
          <circle cx={rx} cy={midY} r="7" fill={jumpColor} stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {/* controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
        <div className={`text-center font-black text-xs sm:text-sm mb-3 rounded-lg py-1.5 px-3 ${goingRight ? 'text-[#10b981] bg-[#10b981]/10' : effectiveDelta === 0 ? 'text-slate-400 bg-slate-100 dark:bg-slate-700/50' : 'text-[#ef4444] bg-[#ef4444]/10'}`}>
          {hint}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="w-16 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">Start</span>
          <input type="range" min="-10" max="10" value={start} onChange={(e) => setStart(Number(e.target.value))} className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]" />
          <span className="w-10 text-right font-mono font-bold text-slate-600 dark:text-slate-300">{start}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-16 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">Operation</span>
          <button onClick={() => setOp('add')} className={`flex-1 py-1.5 rounded-lg font-black text-sm border-2 transition-all ${op === 'add' ? 'bg-[#10b981] border-[#059669] text-white' : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500'}`}>+ Add</button>
          <button onClick={() => setOp('subtract')} className={`flex-1 py-1.5 rounded-lg font-black text-sm border-2 transition-all ${op === 'subtract' ? 'bg-[#ef4444] border-[#dc2626] text-white' : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500'}`}>− Subtract</button>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-16 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">Number</span>
          <input type="range" min="-9" max="9" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#f59e0b]" />
          <span className="w-10 text-right font-mono font-bold text-slate-600 dark:text-slate-300">{amtStr}</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================= *
 * WIDGET 2 — ZERO PAIRS
 * A + counter and a − counter. Each +1 and −1 form a "zero pair"
 * that cancels, so the leftover chips ARE the answer. Explains why
 * −3 + −4 = −7 and 6 + −5 = 1 without any rule to memorise.
 * ============================================================= */
const SCENARIOS = [
  { label: '−3 + −4', pos: 0, neg: 7 },
  { label: '6 + −5', pos: 6, neg: 5 },
  { label: '−2 + 5', pos: 5, neg: 2 },
  { label: '4 + −4', pos: 4, neg: 4 },
];

export const ZeroPairsWidget = () => {
  const [pos, setPos] = useState(6);
  const [neg, setNeg] = useState(5);

  const pairs = Math.min(pos, neg);
  const net = pos - neg;
  const clamp = (n) => Math.max(0, Math.min(12, n));

  const Chip = ({ sign, cancelled }) => (
    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-white text-sm shadow-sm border-2 transition-all
      ${sign === '+' ? 'bg-[#f59e0b] border-[#d97706]' : 'bg-[#3b82f6] border-[#2563eb]'}
      ${cancelled ? 'opacity-30 scale-90' : 'opacity-100'}`}>
      {sign}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col items-center justify-center p-3 sm:p-5 overflow-hidden">
        {/* chips */}
        <div className="flex-1 w-full flex flex-col justify-center gap-2">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {Array.from({ length: pos }).map((_, i) => <Chip key={`p${i}`} sign="+" cancelled={i < pairs} />)}
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {Array.from({ length: neg }).map((_, i) => <Chip key={`n${i}`} sign="−" cancelled={i < pairs} />)}
          </div>
        </div>
        {/* result */}
        <div className="mt-3 flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2 border-2 border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{pairs} zero pairs cancel</span>
          <span className="text-slate-300 dark:text-slate-600">→</span>
          <span className={`font-mono font-black text-xl ${net > 0 ? 'text-[#f59e0b]' : net < 0 ? 'text-[#3b82f6]' : 'text-slate-400'}`}>
            {net > 0 ? `+${net}` : net}
          </span>
        </div>
      </div>

      {/* controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
        <div className="flex items-center justify-center gap-2 mb-3">
          <button onClick={() => setPos(clamp(pos + 1))} className="px-3 py-1.5 rounded-lg font-black text-sm bg-[#f59e0b] border-2 border-[#d97706] text-white active:scale-95">+ 1</button>
          <button onClick={() => setNeg(clamp(neg + 1))} className="px-3 py-1.5 rounded-lg font-black text-sm bg-[#3b82f6] border-2 border-[#2563eb] text-white active:scale-95">− 1</button>
          <button onClick={() => { setPos(0); setNeg(0); }} className="px-3 py-1.5 rounded-lg font-black text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 active:scale-95">Clear</button>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {SCENARIOS.map((s) => (
            <button key={s.label} onClick={() => { setPos(s.pos); setNeg(s.neg); }}
              className="py-1.5 rounded-lg font-mono font-bold text-[11px] sm:text-xs bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-400 active:scale-95 transition-all">
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
