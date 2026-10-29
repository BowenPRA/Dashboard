// src/data/Y7_MATH/U05_1/widgets.jsx
// Tear It — the self-study version of the classroom's "Tear off the corners"
// (slides 14–15). Drag any corner of the quadrilateral (finger or mouse) to
// make it as strange as you like; it stays a four-sided shape that does not
// fold in on itself. Press "Tear off the corners": the four corners slide to
// one point and close up into a full turn. The four angles are read out live,
// and they always add up to 360°. Unscored: the slide before asks for the
// prediction. English and French through tr(lang, en, null, fr).
import { useRef, useState } from 'react';
import { Scissors, Undo2 } from 'lucide-react';
import { tr } from '../../../utils/lang';

const INK = '#2b2b2b';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const FILLS = ['#e2f2f6', '#f2ecf7', '#fdf1e3', '#eef6e6'];
const TEXTS = ['#0087a8', '#5c2483', '#c25e12', '#4a8b23'];
const NAMES = ['a', 'b', 'c', 'd'];
const R = 46;
const C = { x: 470, y: 180 };
const START = [[60, 300], [110, 70], [305, 105], [270, 320]];
const BOUNDS = { x0: 22, x1: 360, y0: 22, y1: 338 };
const t = (lang, en, fr) => tr(lang, en, null, fr);

const rad = (d) => (d * Math.PI) / 180;
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))];
const angOf = (P, Q) => (Math.atan2(-(Q[1] - P[1]), Q[0] - P[0]) * 180) / Math.PI;

/** The interior angle at P between neighbours A and B: where it starts (math degrees) and how wide. */
function span(P, A, B) {
  let a1 = angOf(P, A);
  let d = (angOf(P, B) - a1 + 360) % 360;
  if (d > 180) { a1 = angOf(P, B); d = 360 - d; }
  return { a1, d };
}
const wedgePath = (cx, cy, a1, d) => {
  const [x1, y1] = at(cx, cy, R, a1);
  const [x2, y2] = at(cx, cy, R, a1 + d);
  return `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R} ${R} 0 0 0 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
};
/** A shape we accept: convex, every corner 25°–155°, inside its half of the picture. */
function fine(Q) {
  const cross = Q.map((P, i) => {
    const A = Q[(i + 3) % 4]; const B = Q[(i + 1) % 4];
    return (P[0] - A[0]) * (B[1] - P[1]) - (P[1] - A[1]) * (B[0] - P[0]);
  });
  if (!(cross.every((c) => c > 0) || cross.every((c) => c < 0))) return false;
  if (Q.some(([x, y]) => x < BOUNDS.x0 || x > BOUNDS.x1 || y < BOUNDS.y0 || y > BOUNDS.y1)) return false;
  return Q.every((P, i) => { const { d } = span(P, Q[(i + 3) % 4], Q[(i + 1) % 4]); return d >= 25 && d <= 155; });
}
/** Whole degrees that still add up to exactly 360 (largest remainders get the spare degrees). */
function rounded(ds) {
  const fl = ds.map(Math.floor);
  let spare = 360 - fl.reduce((s, x) => s + x, 0);
  const order = ds.map((d, i) => [d - Math.floor(d), i]).sort((a, b) => b[0] - a[0]);
  for (const [, i] of order) { if (spare <= 0) break; fl[i] += 1; spare -= 1; }
  return fl;
}

export function TearIt({ lang = 'en' }) {
  const [Q, setQ] = useState(START);
  const [torn, setTorn] = useState(false);
  const svg = useRef(null);
  const drag = useRef(null);

  const corners = Q.map((P, i) => ({ P, ...span(P, Q[(i + 3) % 4], Q[(i + 1) % 4]) }));
  const deg = rounded(corners.map((c) => c.d));
  const placed = corners.map((_, i) => 90 + corners.slice(0, i).reduce((sum, c) => sum + c.d, 0));

  const toSvg = (e) => {
    const el = svg.current;
    const p = el.createSVGPoint();
    p.x = e.clientX; p.y = e.clientY;
    const m = el.getScreenCTM();
    if (!m) return null;
    const q = p.matrixTransform(m.inverse());
    return [q.x, q.y];
  };
  const onDown = (i) => (e) => { e.preventDefault(); e.currentTarget.setPointerCapture?.(e.pointerId); drag.current = i; };
  const onMove = (e) => {
    if (drag.current == null) return;
    const p = toSvg(e);
    if (!p) return;
    const next = Q.map((P, i) => (i === drag.current ? [Math.round(p[0]), Math.round(p[1])] : P));
    if (fine(next)) setQ(next);
  };
  const onUp = () => { drag.current = null; };

  const label = (c) => at(c.P[0], c.P[1], 27, c.a1 + c.d / 2);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 min-h-0">
      <svg ref={svg} viewBox="0 0 600 360" className="w-full flex-1 min-h-0 max-h-[46vh] lg:max-h-none select-none" role="img"
        aria-label={t(lang, 'A quadrilateral with four corners you can drag', 'Un quadrilatère avec quatre coins à déplacer')}
        onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <rect x="0" y="0" width="600" height="360" rx="14" fill="#ffffff" />
        <line x1="385" y1="24" x2="385" y2="336" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />
        <polygon points={Q.map((p) => p.join(',')).join(' ')} fill={torn ? '#ffffff' : '#eef1f4'} stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeDasharray={torn ? '8 6' : 'none'} />
        <circle cx={C.x} cy={C.y} r={R + 6} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx={C.x} cy={C.y} r="5" fill={INK} />
        {corners.map((c, i) => {
          const rot = placed[i] - c.a1;
          const style = {
            transformBox: 'view-box', transformOrigin: `${c.P[0]}px ${c.P[1]}px`, transition: 'transform 0.8s ease-in-out',
            transform: torn ? `translate(${C.x - c.P[0]}px, ${C.y - c.P[1]}px) rotate(${-rot}deg)` : 'none',
          };
          return <path key={i} d={wedgePath(c.P[0], c.P[1], c.a1, c.d)} fill={FILLS[i]} stroke={INK} strokeWidth="2" style={style} />;
        })}
        {corners.map((c, i) => {
          const [lx, ly] = label(c);
          const [tx, ty] = at(C.x, C.y, 27, placed[i] + c.d / 2);
          const style = { transition: 'transform 0.8s ease-in-out', transform: torn ? `translate(${tx - lx}px, ${ty - ly}px)` : 'none' };
          return <text key={i} x={lx} y={ly + 8} textAnchor="middle" fontFamily={FONT} fontSize="24" fontWeight="bold" fontStyle="italic" fill={TEXTS[i]} style={style} pointerEvents="none">{NAMES[i]}</text>;
        })}
        <text x={C.x} y="318" textAnchor="middle" fontFamily={FONT} fontSize="24" fontWeight="bold" fill={torn ? INK : '#94a3b8'}>
          {torn ? t(lang, 'a full turn: 360°', 'un tour complet : 360°') : '?'}
        </text>
        {!torn && Q.map(([x, y], i) => (
          <g key={i} onPointerDown={onDown(i)} style={{ cursor: 'grab', touchAction: 'none' }}>
            <circle cx={x} cy={y} r="26" fill="rgba(92,36,131,0.01)" />
            <circle cx={x} cy={y} r="11" fill="#ffffff" stroke="#5c2483" strokeWidth="3" />
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm sm:text-base font-black font-mono">
        {deg.map((v, i) => <span key={i} className="px-2 py-0.5 rounded-lg border-2" style={{ color: TEXTS[i], borderColor: TEXTS[i], backgroundColor: FILLS[i] }}><i>{NAMES[i]}</i> = {v}°</span>)}
        <span className="px-1 text-slate-800 dark:text-slate-100">→ {deg.join(' + ')} = 360°</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={() => setTorn(!torn)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-b-[4px] font-black uppercase tracking-widest text-xs text-white bg-[#5c2483] border-[#3f1a5c] active:border-b-0 active:translate-y-[4px]">
          {torn ? <Undo2 className="w-4 h-4" strokeWidth={3} /> : <Scissors className="w-4 h-4" strokeWidth={3} />}
          {torn ? t(lang, 'Put them back', 'Remets-les') : t(lang, 'Tear off the corners', 'Déchire les coins')}
        </button>
        {!torn && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t(lang, 'Drag a corner to change the shape.', 'Fais glisser un coin pour changer la forme.')}</span>}
      </div>
    </div>
  );
}
