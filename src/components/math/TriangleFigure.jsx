/**
 * A right-angled triangle (or two sharing a side), drawn to scale from the
 * coordinates utils/triangles.js derives — shared by the Triangle Solver task
 * and the EM_07B ratio widget.
 *
 *   pos         { A: [x, y], … } — north is up
 *   tris        [[R, P, Q], …] — each triangle's right-angle corner first
 *   sideLabels  { AB: '12 cm', BC: 'x', … } — keyed by sorted side name
 *   sideColors  { AB: '#dc2626', … } — a highlighted side is drawn thick
 *   angles      [{ at: 'A', tri: 0, label: '38°', color }] — an arc at a corner
 *   north       ['X'] — a north arrow at these corners (bearing questions)
 *   bearingTo   { from: 'X', to: 'Y', label } — the clockwise turn from north
 *   rot         turn the drawing (degrees); `onSide(key)` makes sides tappable
 *
 * The same page conventions as the other maths figures: a white plate so it
 * reads on a dark card, italic serif vertex letters, sans-serif lengths.
 */

const INK = '#1e293b';
const MATH = "'Cambria Math', 'Times New Roman', Georgia, serif";
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const key = (s) => [...s].sort().join('');

export default function TriangleFigure({
  pos, tris, sideLabels = {}, sideColors = {}, angles = [], north = [], bearingTo = null,
  rot = 0, onSide = null, width = 440, height = 300, className = 'w-full h-auto',
}) {
  const r = (rot * Math.PI) / 180;
  const turned = Object.fromEntries(Object.entries(pos).map(([k, [x, y]]) => [k, [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]]));
  const xs = Object.values(turned).map((p) => p[0]);
  const ys = Object.values(turned).map((p) => p[1]);
  const pad = 58;
  const topPad = north.length ? 78 : pad;
  const spanX = Math.max(...xs) - Math.min(...xs) || 1;
  const spanY = Math.max(...ys) - Math.min(...ys) || 1;
  const s = Math.min((width - 2 * pad) / spanX, (height - pad - topPad) / spanY);
  const offX = (width - spanX * s) / 2;
  const offY = topPad + (height - pad - topPad - spanY * s) / 2;
  const P = (v) => [offX + (turned[v][0] - Math.min(...xs)) * s, offY + (Math.max(...ys) - turned[v][1]) * s];
  const all = Object.keys(pos);
  const cx = all.reduce((a, v) => a + P(v)[0], 0) / all.length;
  const cy = all.reduce((a, v) => a + P(v)[1], 0) / all.length;

  // Every side once, remembering the first triangle it belongs to.
  const sides = [];
  tris.forEach((t, ti) => {
    for (const [a, b] of [[t[0], t[1]], [t[0], t[2]], [t[1], t[2]]]) {
      const k = key(a + b);
      if (!sides.some((x) => x.k === k)) sides.push({ k, a, b, ti });
    }
  });
  const unit = (from, to) => {
    const [x1, y1] = P(from);
    const [x2, y2] = P(to);
    const d = Math.hypot(x2 - x1, y2 - y1) || 1;
    return [(x2 - x1) / d, (y2 - y1) / d];
  };
  const triCentroid = (ti) => {
    const t = tris[ti];
    return [t.reduce((a, v) => a + P(v)[0], 0) / 3, t.reduce((a, v) => a + P(v)[1], 0) / 3];
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`${className} select-none`}>
      <rect x="0" y="0" width={width} height={height} rx="14" fill="#ffffff" />
      {/* the triangles */}
      {tris.map((t, i) => (
        <polygon key={`t${i}`} points={t.map((v) => P(v).join(',')).join(' ')} fill="#f8fafc" stroke="none" />
      ))}
      {sides.map(({ k, a, b }) => {
        const [x1, y1] = P(a);
        const [x2, y2] = P(b);
        const c = sideColors[k];
        return (
          <g key={`s${k}`}>
            {c && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeOpacity="0.2" strokeWidth="14" strokeLinecap="round" />}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c || INK} strokeWidth={c ? 4 : 2.5} strokeLinecap="round" />
            {onSide && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth="26" className="cursor-pointer" onClick={() => onSide(k)} />}
          </g>
        );
      })}
      {/* right-angle squares */}
      {tris.map((t, i) => {
        const [R, A, B] = t;
        const [ux, uy] = unit(R, A);
        const [vx, vy] = unit(R, B);
        const q = 14;
        const [rx, ry] = P(R);
        return <path key={`ra${i}`} d={`M ${rx + ux * q} ${ry + uy * q} L ${rx + ux * q + vx * q} ${ry + uy * q + vy * q} L ${rx + vx * q} ${ry + vy * q}`} fill="none" stroke={INK} strokeWidth="1.8" />;
      })}
      {/* angle arcs */}
      {angles.map((a, i) => {
        const t = tris[a.tri || 0];
        const others = t.filter((v) => v !== a.at);
        const [ux, uy] = unit(a.at, others[0]);
        const [vx, vy] = unit(a.at, others[1]);
        const [x, y] = P(a.at);
        const rad = 30;
        const cross = ux * vy - uy * vx;
        const sweep = cross > 0 ? 1 : 0;
        const bx = ux + vx;
        const by = uy + vy;
        const bl = Math.hypot(bx, by) || 1;
        const color = a.color || '#be185d';
        return (
          <g key={`a${i}`}>
            <path d={`M ${x + ux * rad} ${y + uy * rad} A ${rad} ${rad} 0 0 ${sweep} ${x + vx * rad} ${y + vy * rad}`} fill="none" stroke={color} strokeWidth="2.5" />
            {a.label && (
              <text x={x + (bx / bl) * 52} y={y + (by / bl) * 52 + 5} textAnchor="middle" fontFamily={FONT} fontSize="15" fontWeight="800" fill={color}
                stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{a.label}</text>
            )}
          </g>
        );
      })}
      {/* side labels, pushed out from the triangle they belong to */}
      {sides.map(({ k, a, b, ti }) => {
        const text = sideLabels[k];
        if (!text) return null;
        const [x1, y1] = P(a);
        const [x2, y2] = P(b);
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        let nx = -(y2 - y1);
        let ny = x2 - x1;
        const nl = Math.hypot(nx, ny) || 1;
        nx /= nl; ny /= nl;
        const [tx, ty] = triCentroid(ti);
        if ((mx - tx) * nx + (my - ty) * ny < 0) { nx = -nx; ny = -ny; }
        const off = 20;
        const anchor = Math.abs(nx) > 0.6 ? (nx > 0 ? 'start' : 'end') : 'middle';
        const c = sideColors[k] || INK;
        return (
          <text key={`l${k}`} x={mx + nx * off} y={my + ny * off + 6} textAnchor={anchor} fontFamily={/^[a-zθ]$/i.test(text) ? MATH : FONT}
            fontStyle={/^[a-z]$/.test(text) ? 'italic' : 'normal'} fontSize={/^[a-zθ]$/i.test(text) ? 22 : 16} fontWeight="800" fill={c}
            stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{text}</text>
        );
      })}
      {/* vertex letters */}
      {all.map((v) => {
        const [x, y] = P(v);
        let dx = x - cx;
        let dy = y - cy;
        const d = Math.hypot(dx, dy) || 1;
        dx /= d; dy /= d;
        return (
          <text key={`v${v}`} x={x + dx * 20} y={y + dy * 20 + 7} textAnchor="middle" fontFamily={MATH} fontStyle="italic" fontSize="22" fill={INK}>{v}</text>
        );
      })}
      {/* north arrows */}
      {north.map((v) => {
        const [x, y] = P(v);
        return (
          <g key={`n${v}`}>
            <line x1={x} y1={y} x2={x} y2={y - 52} stroke={INK} strokeWidth="2" />
            <path d={`M ${x} ${y - 60} l -6 11 l 12 0 z`} fill={INK} />
            <text x={x + 9} y={y - 50} fontFamily={FONT} fontSize="13" fontWeight="800" fill={INK}>N</text>
          </g>
        );
      })}
      {bearingTo && (() => {
        const [x, y] = P(bearingTo.from);
        const [tx, ty] = unit(bearingTo.from, bearingTo.to);
        const rad = 40;
        const start = [x, y - rad];
        const end = [x + tx * rad, y + ty * rad];
        // Clockwise from north; large-arc when the turn passes 180°.
        const ang = (Math.atan2(tx, -ty) * 180) / Math.PI;
        const turn = (ang + 360) % 360;
        return (
          <g>
            <path d={`M ${start[0]} ${start[1]} A ${rad} ${rad} 0 ${turn > 180 ? 1 : 0} 1 ${end[0]} ${end[1]}`} fill="none" stroke="#0369a1" strokeWidth="2.5" strokeDasharray="5 4" />
            {bearingTo.label && <text x={x + 46} y={y - 30} fontFamily={FONT} fontSize="14" fontWeight="800" fill="#0369a1" stroke="#ffffff" strokeWidth="4" paintOrder="stroke">{bearingTo.label}</text>}
          </g>
        );
      })()}
    </svg>
  );
}
