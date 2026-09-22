// src/data/EXT_MATH/EM_07B/widgets.jsx
// Widgets for EM_07B — Bearings, Trigonometry & Scatter Graphs. Two, and each
// does one thing a still slide cannot (the classroom decks' rule):
//
//   BearingCompass  Pick a place on the map: the line to it is drawn, and —
//                   only when asked — the clockwise turn from north appears
//                   with its three-figure bearing. Then "The way back" stands
//                   the student at the other end, facing north again, and the
//                   back bearing turns out to be half a turn more. North,
//                   clockwise, from: every time.
//
//   RatioLab        One right-angled triangle, three controls: change the
//                   SIZE and the three ratios do not move; change the ANGLE
//                   and they do; mark the OTHER angle and opposite and
//                   adjacent swap. That is why sin 38° is one number on a
//                   calculator. The calculator's values wait behind a button,
//                   so the student predicts first.
//
// Every number shown is DERIVED (plain geometry and trigonometry), so a
// widget can never show a wrong answer. English only, like the rest of this
// track; `lang` is accepted and ignored.
import { useState } from 'react';
import { Eye, RefreshCw, Calculator, Undo2 } from 'lucide-react';
import { SafeInlineMath } from '../../../components/notes/SafeMath.jsx';

const INK = '#1e293b';
const PINK = '#be185d';
const KEY = '#c2410c';
const SKY = '#0369a1';
const RED = '#dc2626';
const BLUE = '#2563eb';
const GREEN = '#15803d';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const MATH = "'Cambria Math', 'Times New Roman', Georgia, serif";

function Btn({ onClick, disabled, tone = 'sky', icon: Icon, children }) {
  const tones = {
    sky: 'bg-[#0369a1] border-[#075985]',
    orange: 'bg-[#c2410c] border-[#9a3412]',
    slate: 'bg-slate-500 border-slate-700',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-3.5 py-2 text-xs sm:text-sm disabled:opacity-35 disabled:pointer-events-none ${tones[tone] || tones.sky}`}
    >
      {Icon && <Icon className="w-4 h-4" strokeWidth={3} />}
      {children}
    </button>
  );
}

function Chip({ on, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`rounded-xl border-2 border-b-4 px-2.5 py-1 text-sm font-black transition-all ${on ? 'bg-[#e0f2fe] border-[#0369a1] text-[#075985]' : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'}`}>
      {children}
    </button>
  );
}

/* ============================================================= *
 * WIDGET 1 — BEARING COMPASS
 * ============================================================= */
const PLACES = [
  { name: 'Lighthouse', deg: 48, d: 150 },
  { name: 'Harbour', deg: 135, d: 128 },
  { name: 'Island', deg: 212, d: 152 },
  { name: 'Beacon', deg: 304, d: 140 },
];
const HOME = [230, 228];
const toward = ([x, y], deg, d) => [x + d * Math.sin((deg * Math.PI) / 180), y - d * Math.cos((deg * Math.PI) / 180)];
const three = (b) => `${String(Math.round(b)).padStart(3, '0')}°`;
function turn([x, y], deg, r) {
  const e = toward([x, y], deg, r);
  return `M ${x} ${y - r} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 1 ${e[0]} ${e[1]}`;
}
function NorthArrow({ at, length = 70 }) {
  const [x, y] = at;
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - length} stroke={INK} strokeWidth="2.5" />
      <path d={`M ${x} ${y - length - 12} l -6 12 l 12 0 z`} fill={INK} />
      <text x={x + 9} y={y - length - 2} fontFamily={FONT} fontSize="13" fontWeight="800" fill={INK}>N</text>
    </g>
  );
}

export function BearingCompass() {
  const [pi, setPi] = useState(0);
  const [stage, setStage] = useState(0); // 0 the line, 1 the bearing, 2 the way back
  const place = PLACES[pi];
  const T = toward(HOME, place.deg, place.d);
  const back = (place.deg + 180) % 360;
  const lab1 = toward(HOME, place.deg / 2, 74);
  const lab2 = toward(T, back / 2, 60);
  const choose = (i) => { setPi(i); setStage(0); };

  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center select-none">
      <div className="w-full sm:w-[52%] max-w-[27rem] shrink-0">
        <svg viewBox="0 0 460 440" className="w-full h-auto">
          <rect x="0" y="0" width="460" height="440" rx="14" fill="#ffffff" />
          {PLACES.map((p, i) => {
            const q = toward(HOME, p.deg, p.d);
            const n = toward(HOME, p.deg, p.d + 24);
            return (
              <g key={p.name}>
                <line x1={HOME[0]} y1={HOME[1]} x2={q[0]} y2={q[1]} stroke={i === pi ? INK : '#e2e8f0'} strokeWidth={i === pi ? 3 : 2} strokeDasharray={i === pi ? undefined : '6 6'} />
                <circle cx={q[0]} cy={q[1]} r="7" fill={i === pi ? KEY : '#cbd5e1'} />
                <text x={n[0]} y={n[1] + 5} fontFamily={FONT} fontSize="14" fontWeight="800" fill={i === pi ? KEY : '#94a3b8'} textAnchor="middle"
                  stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{p.name}</text>
              </g>
            );
          })}
          <NorthArrow at={HOME} length={78} />
          {stage >= 1 && (
            <g>
              <path d={turn(HOME, place.deg, 46)} fill="none" stroke={SKY} strokeWidth="3.5" />
              <text x={lab1[0]} y={lab1[1] + 6} fontFamily={FONT} fontSize="17" fontWeight="900" fill={SKY} textAnchor="middle"
                stroke="#ffffff" strokeWidth="5" paintOrder="stroke">{three(place.deg)}</text>
            </g>
          )}
          {stage === 2 && (
            <g>
              <NorthArrow at={T} length={60} />
              <path d={turn(T, back, 32)} fill="none" stroke={PINK} strokeWidth="3.5" />
              <text x={lab2[0]} y={lab2[1] + 6} fontFamily={FONT} fontSize="16" fontWeight="900" fill={PINK} textAnchor="middle"
                stroke="#ffffff" strokeWidth="5" paintOrder="stroke">{three(back)}</text>
            </g>
          )}
          <circle cx={HOME[0]} cy={HOME[1]} r="7" fill={INK} />
          <text x={HOME[0] - 12} y={HOME[1] + 26} fontFamily={FONT} fontSize="14" fontWeight="800" fill={INK} textAnchor="end">You</text>
        </svg>
      </div>
      <div className="w-full sm:flex-1 min-w-0 flex flex-col gap-2.5">
        <div className="flex flex-wrap gap-1.5">
          {PLACES.map((p, i) => <Chip key={p.name} on={pi === i} onClick={() => choose(i)}>{p.name}</Chip>)}
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 sm:p-4 text-slate-800 min-h-[8.5rem]">
          {stage === 0 && (
            <p className="text-base sm:text-lg font-bold">Stand at <b>You</b>, facing north. Which way do you turn — and how far — to face the {place.name.toLowerCase()}? Say it first.</p>
          )}
          {stage >= 1 && (
            <p className="text-base sm:text-lg font-bold">
              The bearing of the {place.name.toLowerCase()} from you is <span style={{ color: SKY }}>{three(place.deg)}</span> — measured from north, clockwise{place.deg > 180 ? ', past south' : ''}.
            </p>
          )}
          {stage === 2 && (
            <p className="mt-2 text-base sm:text-lg font-bold [&_.katex]:inline-block">
              The way back: at the {place.name.toLowerCase()}, face north and turn to face home —{' '}
              <SafeInlineMath math={place.deg < 180 ? `${place.deg}^\\circ + 180^\\circ = ${back}^\\circ` : `${place.deg}^\\circ - 180^\\circ = ${back}^\\circ`} />.
              <span className="text-slate-500"> Written with three figures: <span style={{ color: PINK }}>{three(back)}</span>.</span>
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn tone="sky" icon={Eye} disabled={stage >= 1} onClick={() => setStage(1)}>Show the bearing</Btn>
          <Btn tone="orange" icon={RefreshCw} disabled={stage !== 1} onClick={() => setStage(2)}>The way back</Btn>
          <Btn tone="slate" icon={Undo2} disabled={stage === 0} onClick={() => setStage(0)}>Start again</Btn>
        </div>
      </div>
    </div>
  );
}

/* ============================================================= *
 * WIDGET 2 — RATIO LAB
 * ============================================================= */
const ANGLES = [25, 40, 55];
const SIZES = [{ name: 'small', h: 4 }, { name: 'medium', h: 6 }, { name: 'large', h: 8 }];
const ROLE = { hyp: { c: RED, name: 'hypotenuse', short: 'H' }, opp: { c: BLUE, name: 'opposite', short: 'O' }, adj: { c: GREEN, name: 'adjacent', short: 'A' } };
const r3 = (v) => v.toFixed(3);
const r2 = (v) => v.toFixed(2);

export function RatioLab() {
  const [ai, setAi] = useState(0);
  const [si, setSi] = useState(1);
  const [atB, setAtB] = useState(false);
  const [calc, setCalc] = useState(false);
  const thA = ANGLES[ai];
  const H = SIZES[si].h;
  const rad = (thA * Math.PI) / 180;
  const BC = H * Math.sin(rad);
  const AC = H * Math.cos(rad);
  const marked = atB ? 90 - thA : thA;
  const opp = atB ? AC : BC;
  const adj = atB ? BC : AC;
  const roleOf = { AB: 'hyp', BC: atB ? 'adj' : 'opp', AC: atB ? 'opp' : 'adj' };

  // Drawn to scale: 30 px per cm, so a bigger triangle really is bigger.
  const S = 30;
  const A = [54, 300];
  const C = [A[0] + AC * S, 300];
  const B = [C[0], 300 - BC * S];
  const lab = (P, Q, key, dx, dy, anchor) => {
    const role = ROLE[roleOf[key]];
    const len = key === 'AB' ? H : key === 'BC' ? BC : AC;
    return (
      <text x={(P[0] + Q[0]) / 2 + dx} y={(P[1] + Q[1]) / 2 + dy} fontFamily={FONT} fontSize="15" fontWeight="800" fill={role.c} textAnchor={anchor}
        stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{role.short} = {r2(len)}</text>
    );
  };
  const arcAt = atB ? B : A;
  const u1 = atB ? [0, 1] : [1, 0];
  const toHyp = atB ? [A[0] - B[0], A[1] - B[1]] : [B[0] - A[0], B[1] - A[1]];
  const hl = Math.hypot(...toHyp);
  const u2 = [toHyp[0] / hl, toHyp[1] / hl];
  const R = 34;
  const cross = u1[0] * u2[1] - u1[1] * u2[0];
  const arc = `M ${arcAt[0] + u1[0] * R} ${arcAt[1] + u1[1] * R} A ${R} ${R} 0 0 ${cross > 0 ? 1 : 0} ${arcAt[0] + u2[0] * R} ${arcAt[1] + u2[1] * R}`;
  const bis = [u1[0] + u2[0], u1[1] + u2[1]];
  const bl = Math.hypot(...bis);

  const rows = [
    { fn: 'sin', top: 'O', bot: 'H', v: opp / H, a: opp, b: H },
    { fn: 'cos', top: 'A', bot: 'H', v: adj / H, a: adj, b: H },
    { fn: 'tan', top: 'O', bot: 'A', v: opp / adj, a: opp, b: adj },
  ];

  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center select-none">
      <div className="w-full sm:w-[52%] max-w-[28rem] shrink-0">
        <svg viewBox="0 0 340 330" className="w-full h-auto">
          <rect x="0" y="0" width="340" height="330" rx="14" fill="#ffffff" />
          <polygon points={`${A.join(',')} ${B.join(',')} ${C.join(',')}`} fill="#f8fafc" />
          <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={ROLE.hyp.c} strokeWidth="4" strokeLinecap="round" />
          <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={ROLE[roleOf.BC].c} strokeWidth="4" strokeLinecap="round" />
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={ROLE[roleOf.AC].c} strokeWidth="4" strokeLinecap="round" />
          <path d={`M ${C[0] - 14} ${C[1]} L ${C[0] - 14} ${C[1] - 14} L ${C[0]} ${C[1] - 14}`} fill="none" stroke={INK} strokeWidth="2" />
          <path d={arc} fill="none" stroke={PINK} strokeWidth="3" />
          <text x={arcAt[0] + (bis[0] / bl) * 56} y={arcAt[1] + (bis[1] / bl) * 56 + 6} fontFamily={FONT} fontSize="15" fontWeight="800" fill={PINK} textAnchor="middle"
            stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{marked}°</text>
          {lab(A, B, 'AB', -12, -10, 'end')}
          {lab(B, C, 'BC', 8, 5, 'start')}
          {lab(A, C, 'AC', 0, 24, 'middle')}
          <text x={A[0] - 8} y={A[1] + 22} fontFamily={MATH} fontStyle="italic" fontSize="20" fill={INK} textAnchor="middle">A</text>
          <text x={B[0] + 6} y={B[1] - 8} fontFamily={MATH} fontStyle="italic" fontSize="20" fill={INK} textAnchor="middle">B</text>
          <text x={C[0] + 12} y={C[1] + 22} fontFamily={MATH} fontStyle="italic" fontSize="20" fill={INK} textAnchor="middle">C</text>
        </svg>
      </div>
      <div className="w-full sm:flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 w-12">Angle</span>
          {ANGLES.map((a, i) => <Chip key={a} on={ai === i} onClick={() => { setAi(i); setCalc(false); }}>{a}°</Chip>)}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 w-12">Size</span>
          {SIZES.map((s, i) => <Chip key={s.name} on={si === i} onClick={() => setSi(i)}>{s.name}</Chip>)}
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-slate-800">
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">From the {marked}° angle</div>
          {rows.map((r) => (
            <div key={r.fn} className="flex items-center gap-2 py-0.5 text-base sm:text-lg [&_.katex]:inline-block">
              <span className="w-10 font-black text-slate-500">{r.fn}</span>
              <SafeInlineMath math={`${r.top} \\div ${r.bot} = ${r2(r.a)} \\div ${r2(r.b)} = ${r3(r.v)}`} />
              {calc && <span className="ml-auto text-sm font-bold text-sky-700 [&_.katex]:inline-block"><SafeInlineMath math={`\\${r.fn} ${marked}^\\circ = ${r3(r.fn === 'sin' ? Math.sin((marked * Math.PI) / 180) : r.fn === 'cos' ? Math.cos((marked * Math.PI) / 180) : Math.tan((marked * Math.PI) / 180))}`} /></span>}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn tone="sky" icon={RefreshCw} onClick={() => setAtB((b) => !b)}>Mark the other angle</Btn>
          <Btn tone="slate" icon={Calculator} onClick={() => setCalc((c) => !c)}>{calc ? 'Hide calculator' : 'Check on a calculator'}</Btn>
        </div>
      </div>
    </div>
  );
}

