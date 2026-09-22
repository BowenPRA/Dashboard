/**
 * A squared-paper coordinate grid with straight lines on it — shared by the
 * Simultaneous task (two lines and the point where they cross), the
 * Inequalities task (a region cut out by three lines, the rest shaded the way
 * the IGCSE paper shades it) and the EM_07A widgets.
 *
 *   window   { xMin, xMax, yMin, yMax } — whole numbers
 *   lines    [{ a, b, c, dashed?, color?, label?, glow? }]  meaning a·x + b·y = c
 *   region   [{ a, b, c, rel }] — shade everything OUTSIDE the region these
 *            inequalities cut out (rel is '<' '<=' '>' '>='); `regionLabel`
 *            prints in the middle of what is left
 *   points   [{ x, y, label?, color? }]
 *   vars     the axis letters, ['x', 'y'] by default
 *   onPick   (x, y) => … — makes the grid tappable; the tap is snapped to the
 *            nearest half unit
 *
 * Every shape is computed from the equations, so what is drawn and what is
 * marked cannot disagree. A white plate first, so it reads on a dark card.
 */

import { regionPolygon, lineEnds } from '../../utils/lines.js';

const INK = '#1e293b';
const GRIDC = '#cbd5e1';
const SHADE = '#94a3b8';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const MATH = "'Cambria Math', 'Times New Roman', Georgia, serif";

const fmt = (n) => (n < 0 ? `−${-n}` : `${n}`);

export default function CoordGrid({
  window: win, lines = [], region = null, regionLabel = null, points = [], vars = ['x', 'y'],
  onPick = null, unit = null, className = 'w-full h-auto', tickEvery = null,
}) {
  const { xMin, xMax, yMin, yMax } = win;
  const spanX = xMax - xMin;
  const spanY = yMax - yMin;
  const u = unit || Math.max(22, Math.min(44, 520 / Math.max(spanX, spanY)));
  const PAD_L = 34;
  const PAD_B = 30;
  const PAD_T = 22;
  const PAD_R = 24;
  const W = PAD_L + spanX * u + PAD_R;
  const H = PAD_T + spanY * u + PAD_B;
  const X = (x) => PAD_L + (x - xMin) * u;
  const Y = (y) => PAD_T + (yMax - y) * u;
  const every = tickEvery || (Math.max(spanX, spanY) > 16 ? 2 : 1);

  const xs = [];
  for (let x = xMin; x <= xMax; x += 1) xs.push(x);
  const ys = [];
  for (let y = yMin; y <= yMax; y += 1) ys.push(y);
  const poly = region ? regionPolygon(win, region) : null;
  const centroid = poly && poly.length
    ? poly.reduce(([sx, sy], [x, y]) => [sx + x / poly.length, sy + y / poly.length], [0, 0])
    : null;
  const axisX = yMin <= 0 && yMax >= 0;
  const axisY = xMin <= 0 && xMax >= 0;

  const pick = (e) => {
    if (!onPick) return;
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const x = Math.round(((p.x - PAD_L) / u + xMin) * 2) / 2;
    const y = Math.round((yMax - (p.y - PAD_T) / u) * 2) / 2;
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) onPick(x, y);
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`${className} select-none`} onClick={pick}
      style={{ cursor: onPick ? 'crosshair' : 'default', touchAction: 'manipulation' }}>
      <rect x="0" y="0" width={W} height={H} rx="12" fill="#ffffff" />
      {/* shading outside the region */}
      {poly && (
        <>
          <rect x={X(xMin)} y={Y(yMax)} width={spanX * u} height={spanY * u} fill={SHADE} opacity="0.55" />
          {poly.length > 2 && <polygon points={poly.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill="#ffffff" />}
        </>
      )}
      {/* squared paper */}
      {xs.map((x) => <line key={`gx${x}`} x1={X(x)} y1={Y(yMin)} x2={X(x)} y2={Y(yMax)} stroke={GRIDC} strokeWidth="1" />)}
      {ys.map((y) => <line key={`gy${y}`} x1={X(xMin)} y1={Y(y)} x2={X(xMax)} y2={Y(y)} stroke={GRIDC} strokeWidth="1" />)}
      {/* axes */}
      {axisX && <line x1={X(xMin)} y1={Y(0)} x2={X(xMax) + 10} y2={Y(0)} stroke={INK} strokeWidth="2" />}
      {axisY && <line x1={X(0)} y1={Y(yMin)} x2={X(0)} y2={Y(yMax) - 10} stroke={INK} strokeWidth="2" />}
      {axisX && <path d={`M ${X(xMax) + 14} ${Y(0)} l -9 -5 l 0 10 z`} fill={INK} />}
      {axisY && <path d={`M ${X(0)} ${Y(yMax) - 14} l -5 9 l 10 0 z`} fill={INK} />}
      {axisX && <text x={X(xMax) + 12} y={Y(0) + 18} fontFamily={MATH} fontStyle="italic" fontSize="16" fill={INK}>{vars[0]}</text>}
      {axisY && <text x={X(0) + 9} y={Y(yMax) - 2} fontFamily={MATH} fontStyle="italic" fontSize="16" fill={INK}>{vars[1]}</text>}
      {/* tick numbers */}
      {xs.filter((x) => x % every === 0 && x !== 0).map((x) => (
        <text key={`tx${x}`} x={X(x)} y={(axisX ? Y(0) : Y(yMin)) + 15} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="600" fill="#475569">{fmt(x)}</text>
      ))}
      {ys.filter((y) => y % every === 0 && y !== 0).map((y) => (
        <text key={`ty${y}`} x={(axisY ? X(0) : X(xMin)) - 6} y={Y(y) + 4} textAnchor="end" fontFamily={FONT} fontSize="11" fontWeight="600" fill="#475569">{fmt(y)}</text>
      ))}
      {axisX && axisY && <text x={X(0) - 6} y={Y(0) + 15} textAnchor="end" fontFamily={FONT} fontSize="11" fontWeight="600" fill="#475569">0</text>}
      {/* the lines */}
      {lines.map((ln, i) => {
        const ends = lineEnds(win, ln);
        if (!ends) return null;
        const [[x1, y1], [x2, y2]] = ends;
        const color = ln.color || INK;
        return (
          <g key={`l${i}`}>
            {ln.glow && <line x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={color} strokeOpacity="0.22" strokeWidth="11" strokeLinecap="round" />}
            <line x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={color} strokeWidth={ln.glow ? 3.5 : 2.5}
              strokeDasharray={ln.dashed ? '9 7' : undefined} strokeLinecap="round" />
          </g>
        );
      })}
      {/* line labels, placed a little in from the end that sits higher on the page */}
      {lines.map((ln, i) => {
        if (!ln.label) return null;
        const ends = lineEnds(win, ln);
        if (!ends) return null;
        const text = (x, y, anchor) => (
          <text key={`lab${i}`} x={x} y={y} textAnchor={anchor} fontFamily={MATH} fontSize="15" fontWeight="bold"
            fill={ln.color || INK} stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{ln.label}</text>
        );
        // An authored spot wins: [x, y] or [x, y, 'start' | 'middle' | 'end'].
        if (Array.isArray(ln.labelAt)) return text(X(ln.labelAt[0]), Y(ln.labelAt[1]), ln.labelAt[2] || 'start');
        // As the paper prints them: an upright line is named above the grid,
        // a flat one at its right-hand end.
        if (ln.b === 0) return text(X(ln.c / ln.a), Y(yMax) - 6, 'middle');
        if (ln.a === 0) return text(X(xMax) - 6, Y(ln.c / ln.b) - 7, 'end');
        const [p, q] = ends;
        const [far, near] = (ln.labelAt === 'low' ? Y(p[1]) > Y(q[1]) : Y(p[1]) < Y(q[1])) ? [p, q] : [q, p];
        const t = 0.14;
        const lx = far[0] + t * (near[0] - far[0]);
        const ly = far[1] + t * (near[1] - far[1]);
        // Written INTO the grid from whichever side the line leaves by, so a
        // label never runs off the edge.
        const right = X(lx) > (X(xMin) + X(xMax)) / 2;
        return (
          <text key={`lab${i}`} x={X(lx) + (right ? -10 : 10)} y={Y(ly) - 6} textAnchor={right ? 'end' : 'start'} fontFamily={MATH} fontSize="15" fontWeight="bold"
            fill={ln.color || INK} stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{ln.label}</text>
        );
      })}
      {centroid && regionLabel && (
        <text x={X(centroid[0])} y={Y(centroid[1]) + 7} textAnchor="middle" fontFamily={MATH} fontStyle="italic" fontSize="22" fontWeight="bold" fill={INK}>{regionLabel}</text>
      )}
      {points.map((p, i) => (
        <g key={`p${i}`}>
          <circle cx={X(p.x)} cy={Y(p.y)} r="6.5" fill={p.color || '#be185d'} stroke="#ffffff" strokeWidth="2.5" />
          {p.label && (
            <text x={X(p.x) + 10} y={Y(p.y) - 9} fontFamily={FONT} fontSize="14" fontWeight="800" fill={p.color || '#be185d'}
              stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{p.label}</text>
          )}
        </g>
      ))}
    </svg>
  );
}
