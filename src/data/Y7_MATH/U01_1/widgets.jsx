import { useState, useEffect, useRef } from 'react';
import { DIAGRAMS } from './diagrams.js';

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

/* ============================================================= *
 * WIDGET 3 — TEAM ACTIVITY (2-minute brainstorm)
 * A big countdown timer for the paired "list the negatives" game,
 * plus a reveal button that shows genuinely surprising real-world
 * negatives once the teams have shared their own. Fully theme-safe.
 * ============================================================= */
const START_SECONDS = 120;

const COOL_NEGATIVES = [
  { icon: '🏖️', label: 'Dead Sea shore', value: '−430 m', note: 'lowest land on Earth' },
  { icon: '⛳', label: 'Golf "under par"', value: '−3', note: 'a great score is negative' },
  { icon: '🚀', label: 'Rocket launch', value: 'T − 10', note: 'the countdown to lift-off' },
  { icon: '🧊', label: 'Home freezer', value: '−18 °C', note: 'colder than the kitchen' },
  { icon: '💳', label: 'Bank overdraft', value: '−$50', note: 'money you owe the bank' },
  { icon: '🏔️', label: 'Antarctica record', value: '−89 °C', note: 'the coldest day ever measured' },
];

export const TeamActivityWidget = () => {
  const [seconds, setSeconds] = useState(START_SECONDS);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const mm = String(Math.floor(seconds / 60));
  const ss = String(seconds % 60).padStart(2, '0');
  const done = seconds === 0;
  const low = seconds > 0 && seconds <= 15;
  const timeColor = done ? 'text-[#ef4444]' : low ? 'text-[#ff9600]' : 'text-[#14b8a6]';

  const reset = () => { clearInterval(intervalRef.current); setRunning(false); setSeconds(START_SECONDS); };

  return (
    <div className="w-full h-full flex flex-col select-none">
      {/* Stage: the timer */}
      <div className="flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col items-center justify-center p-3 sm:p-5 overflow-hidden">
        {!revealed ? (
          <>
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
              {done ? "Time's up! ✋" : 'Brainstorm time'}
            </div>
            <div className={`font-mono font-black tabular-nums leading-none ${timeColor} ${low && !done ? 'animate-pulse' : ''}`} style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)' }}>
              {mm}:{ss}
            </div>
            <div className="mt-2 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 text-center max-w-[16rem]">
              How many negatives can your team list?
            </div>
          </>
        ) : (
          <div className="w-full h-full overflow-y-auto custom-scrollbar">
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#14b8a6] text-center mb-3">
              Surprising real negatives 🌍
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COOL_NEGATIVES.map((c) => (
                <div key={c.label} className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-2.5 shadow-sm">
                  <span className="text-2xl shrink-0" aria-hidden="true">{c.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-slate-700 dark:text-slate-200 text-sm truncate">{c.label}</span>
                      <span className="font-mono font-black text-[#ef4444] text-sm shrink-0">{c.value}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 truncate">{c.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => (done ? reset() : setRunning((r) => !r))}
            className={`flex-1 py-2 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 active:scale-95 transition-all ${running ? 'bg-[#ff9600] border-[#e08600]' : 'bg-[#14b8a6] border-[#0d9488]'}`}>
            {done ? 'Reset Timer' : running ? '❚❚ Pause' : '▶ Start 2:00'}
          </button>
          <button
            onClick={reset}
            className="px-3 py-2 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 active:scale-95">
            Reset
          </button>
        </div>
        <button
          onClick={() => setRevealed((v) => !v)}
          className="w-full py-2 rounded-xl font-black text-sm uppercase tracking-widest bg-[#8b5cf6] border-2 border-[#7c3aed] text-white active:scale-95 transition-all">
          {revealed ? '↩ Back to timer' : '💡 Reveal interesting examples'}
        </button>
      </div>
    </div>
  );
};

/* ============================================================= *
 * WIDGET 4 — WORD PROBLEM (break it down, then reveal)
 * Shows a stepped breakdown of a word problem. The number-line
 * picture stays hidden behind a button so the class solves it
 * first. Parametrised so each problem is a thin wrapper below.
 * ============================================================= */
const WordProblemWidget = ({ steps = [], answer, svg, accent = '#1cb0f6' }) => {
  const [revealed, setRevealed] = useState(false);
  const [shown, setShown] = useState(0); // how many steps are visible

  const allSteps = shown >= steps.length;

  const revealNext = () => {
    if (!allSteps) setShown((n) => n + 1);
    else setRevealed(true);
  };

  return (
    <div className="w-full h-full flex flex-col select-none">
      {/* Stage */}
      <div className="flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-y-auto custom-scrollbar">
        {shown === 0 && !revealed ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
            <span className="text-4xl" aria-hidden="true">🤔</span>
            <div className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-[15rem]">
              Solve it on your whiteboard first. Then reveal the steps one at a time.
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {steps.slice(0, shown).map((st, i) => (
              <div key={i} className="flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="shrink-0 w-6 h-6 rounded-full text-white font-black text-xs flex items-center justify-center shadow-sm" style={{ backgroundColor: accent }}>{i + 1}</span>
                <div className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 leading-snug pt-0.5" dangerouslySetInnerHTML={{ __html: st }} />
              </div>
            ))}

            {revealed && svg && (
              <div className="mt-2 w-full bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-2 animate-in fade-in zoom-in-95 duration-300" style={{ aspectRatio: '520 / 150' }} dangerouslySetInnerHTML={{ __html: svg }} />
            )}

            {revealed && answer && (
              <div className="mt-1 flex items-center justify-center gap-2 bg-[#14b8a6]/10 rounded-xl border-2 border-[#14b8a6] px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0d9488]">Answer</span>
                <span className="font-mono font-black text-lg text-[#0d9488]">{answer}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Control */}
      <div className="w-full mt-2 flex-shrink-0">
        <button
          onClick={revealNext}
          disabled={revealed}
          className="w-full py-3 rounded-2xl font-black text-sm uppercase tracking-widest text-white border-2 shadow-sm active:scale-95 transition-all disabled:opacity-60"
          style={{ backgroundColor: accent, borderColor: accent }}>
          {revealed ? '✓ Solved' : !allSteps ? `Reveal step ${shown + 1}` : '📈 Show the number line'}
        </button>
      </div>
    </div>
  );
};

// Word problem 1 — temperature drops: 4 − 9 = −5.
export const TempDropProblemWidget = () => (
  <WordProblemWidget
    accent="#ff4b4b"
    steps={[
      'At noon it is <b>+4°C</b>. Start at <b>4</b> on the line.',
      '"Dropped 9 degrees" means <b>subtract 9</b> → move <b>9 left</b>.',
      '4 − 9 = <b>−5</b>. Five steps below zero.',
    ]}
    answer="−5 °C"
    svg={DIAGRAMS.NOTES_WP1}
  />
);

// Word problem 2 — how much warmer: 20 − (−15) = 35.
export const WarmerProblemWidget = () => (
  <WordProblemWidget
    accent="#14b8a6"
    steps={[
      'Room is <b>20°C</b>, freezer is <b>−15°C</b>. "How much warmer" = 20 − (−15).',
      'Subtracting a negative → <b>add</b>: 20 − (−15) = 20 + 15.',
      '20 + 15 = <b>35</b>. The gap from −15 up to 20 is 35 steps.',
    ]}
    answer="35 °C"
    svg={DIAGRAMS.NOTES_WP2}
  />
);
