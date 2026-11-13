import { approx } from '../../utils/quadratic.js';
import { tr } from '../../utils/lang.js';

/**
 * A small picture of y = ax² + bx + c (a > 0) with its zeros marked: the
 * point of the whole unit in one glance — the solutions ARE where the curve
 * crosses the x-axis, and "no real solutions" is a curve that never gets there.
 * The window is chosen around the vertex so every zero is on screen.
 */
const W = 340;
const H = 220;
const PAD = 18;

export default function QuadGraph({ a, b, c, zeros = [], ink = '#2563eb', lang = 'en', v = 'x' }) {
  if (!a) return null;
  const f = (x) => a * x * x + b * x + c;
  const h = -b / (2 * a);
  const k = f(h);
  let half = Math.max(2, ...zeros.map((z) => Math.abs(z - h) * 1.5));
  if (!zeros.length) half = Math.max(2, Math.sqrt(Math.max(Math.abs(k), 1) / a) * 1.4);
  const x0 = h - half; const x1 = h + half;
  const yEdge = f(x0);
  let y0 = Math.min(0, k); let y1 = Math.max(0, yEdge);
  const span = (y1 - y0) || 1;
  y0 -= span * 0.12; y1 += span * 0.12;
  const X = (x) => PAD + ((x - x0) / (x1 - x0)) * (W - 2 * PAD);
  const Y = (y) => H - PAD - ((y - y0) / (y1 - y0)) * (H - 2 * PAD);
  const pts = [];
  for (let i = 0; i <= 80; i += 1) {
    const x = x0 + ((x1 - x0) * i) / 80;
    pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  }
  const axisY = Y(0);
  const axisX = x0 < 0 && x1 > 0 ? X(0) : null;
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800"
        role="img" aria-label={tr(lang, 'Graph of the parabola with its zeros marked', 'Đồ thị parabol với các nghiệm được đánh dấu')}>
        <line x1={PAD / 2} x2={W - PAD / 2} y1={axisY} y2={axisY} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" />
        {axisX != null && <line x1={axisX} x2={axisX} y1={PAD / 2} y2={H - PAD / 2} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1.5" />}
        <text x={W - PAD / 2} y={axisY - 5} textAnchor="end" className="fill-slate-400 dark:fill-slate-500" fontSize="12" fontWeight="700" fontStyle="italic">{v}</text>
        <polyline points={pts.join(' ')} fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={X(h)} cy={Y(k)} r="3.5" className="fill-slate-500 dark:fill-slate-300" />
        {zeros.map((z, i) => (
          <g key={i}>
            <circle cx={X(z)} cy={axisY} r="6" fill="#58cc02" stroke="white" strokeWidth="2" />
            <text x={zeros.length === 1 ? X(z) : i === 0 ? X(z) - 10 : X(z) + 10} y={axisY + 22}
              textAnchor={zeros.length === 1 ? 'middle' : i === 0 ? 'end' : 'start'}fontSize="13" fontWeight="900" className="fill-[#2f5d00] dark:fill-lime-300" fontFamily="ui-monospace, monospace">
              {approx(z).replace('-', '−')}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
        {zeros.length === 0
          ? tr(lang, 'The curve never reaches the x-axis: no real solutions.', 'Đường cong không bao giờ chạm trục x: vô nghiệm thực.')
          : zeros.length === 1
            ? tr(lang, 'The vertex touches the x-axis once: one solution.', 'Đỉnh chạm trục x một lần: một nghiệm.')
            : tr(lang, 'The green dots are the zeros — where y = 0.', 'Các chấm xanh là nghiệm — nơi y = 0.')}
      </div>
    </div>
  );
}
