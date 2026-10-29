import { at, f1, labelAt, keyOf, FIG } from '../../utils/anglePairGeom';

/**
 * The picture for X, F or Z? (Year 7 Maths 5.2): two lines crossing, or
 * parallel lines with a line across them, drawn from utils/anglePairGeom.js.
 * Used by the ANGLE_PAIR task and the `anglepair` deck activity.
 *
 *   F        figureOf(item.fig)
 *   marks    [{ at: [c, w], tone, text }] — the angles to colour and label
 *            (tone: given · ask · good · bad · stone · shown)
 *   glow     { paths, tone } — the X, F, Z or straight line, traced under the lines
 *   tap      'sector' (every angle is a button) · 'rail' (each line of a
 *            three-line picture) · null
 *   onTap    (at) or (railIndex)
 *   rails    { [i]: tone } — a three-line picture's lines, coloured
 *
 * Diagrams render on white in both themes, like every teaching diagram here.
 */
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const INK = '#2b2b2b';
const TONES = {
  given: ['#fdf1e3', '#c25e12'],
  ask: ['#e3eef9', '#1a5fa8'],
  good: ['#e4f4d6', '#3d731c'],
  bad: ['#fde8ea', '#c8102e'],
  stone: ['#f2ecf7', '#5c2483'],
  shown: ['#fff4d6', '#b45309'],
};

function sectorPath(P, r, a1, a2) {
  const [x1, y1] = at(P, r, a1);
  const [x2, y2] = at(P, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${f1(P[0])} ${f1(P[1])} L ${f1(x1)} ${f1(y1)} A ${r} ${r} 0 ${large} 0 ${f1(x2)} ${f1(y2)} Z`;
}

function chevron([x, y], d, s = 15) {
  const [ax, ay] = at([x, y], s, d + 148);
  const [bx, by] = at([x, y], s, d - 148);
  return `M ${f1(ax)} ${f1(ay)} L ${f1(x)} ${f1(y)} L ${f1(bx)} ${f1(by)}`;
}

const poly = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${f1(p[0])} ${f1(p[1])}`).join(' ');

export default function AnglePairFigure({ F, marks = [], glow = null, tap = null, onTap, rails = {}, label = 'angle', className = '', style }) {
  if (!F) return null;
  // How far a tap on an angle reaches: half the gap between two crossings.
  const gaps = F.points.flatMap((P, i) => F.points.slice(i + 1).map((Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1])));
  const reach = Math.min(130, ...gaps.map((g) => g / 2 - 4));
  const marked = new Map(marks.map((m) => [keyOf(m.at), m]));
  const glowColour = glow?.tone === 'shown' ? '#d97706' : '#4a8b23';

  return (
    <svg viewBox={`0 0 ${F.W} ${F.H}`} className={`w-full h-auto select-none ${className}`} style={style} role="img" aria-label={label}>
      <rect x="0" y="0" width={F.W} height={F.H} rx="16" fill="#ffffff" />
      <rect x="0.75" y="0.75" width={F.W - 1.5} height={F.H - 1.5} rx="15" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />

      {glow?.paths?.map((pts, i) => (
        <path key={`g${i}`} d={poly(pts)} fill="none" stroke={glowColour} strokeWidth="18" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
      ))}

      {F.sectors.flatMap((list, c) => list.map((q, w) => {
        const m = marked.get(keyOf([c, w]));
        if (!m) return null;
        const [fill, stroke] = TONES[m.tone] || TONES.ask;
        return <path key={`s${c}-${w}`} d={sectorPath(F.points[c], FIG.ARC, q.start, q.end)} fill={fill} stroke={stroke} strokeWidth="3" />;
      }))}

      {F.lines.map((l, i) => {
        const tone = l.rail ? rails[i] : null;
        return (
          <line key={l.id} x1={f1(l.ends[0][0])} y1={f1(l.ends[0][1])} x2={f1(l.ends[1][0])} y2={f1(l.ends[1][1])}
            stroke={tone ? TONES[tone][1] : INK} strokeWidth={tone ? 7 : 5} strokeLinecap="round" />
        );
      })}
      {F.arrows.map((a, i) => (
        <path key={`a${i}`} d={chevron(a.tip, a.d)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {F.points.map((P, i) => <circle key={`p${i}`} cx={f1(P[0])} cy={f1(P[1])} r="5" fill={INK} />)}
      {F.names.map((n, i) => (
        <text key={`n${i}`} x={f1(n.at[0])} y={f1(n.at[1] + 10)} fontFamily={FONT} fontSize="28" fontWeight="900"
          fill={rails[i] ? TONES[rails[i]][1] : '#1a5fa8'} textAnchor="middle">{n.name}</text>
      ))}

      {marks.filter((m) => m.text).map((m) => {
        const [x, y] = labelAt(F, m.at);
        const stroke = (TONES[m.tone] || TONES.ask)[1];
        return (
          <text key={`t${keyOf(m.at)}`} x={f1(x)} y={f1(y + 9.5)} fontFamily={FONT} fontSize="26" fontWeight="900" fill={stroke} textAnchor="middle">{m.text}</text>
        );
      })}

      {tap === 'sector' && F.sectors.flatMap((list, c) => list.map((q, w) => (
        <path key={`h${c}-${w}`} d={sectorPath(F.points[c], reach, q.start, q.end)} role="button" tabIndex={0}
          aria-label={`${label} ${c + 1}.${w + 1}`}
          className="cursor-pointer fill-transparent hover:fill-sky-300/25 focus:fill-sky-300/25 focus:outline-none"
          onClick={() => onTap?.([c, w])}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onTap?.([c, w]); } }} />
      )))}
      {tap === 'rail' && F.lines.map((l, i) => (l.rail ? (
        <g key={`r${i}`} role="button" tabIndex={0} aria-label={`${label} ${F.names[i]?.name || i + 1}`}
          className="cursor-pointer group focus:outline-none" onClick={() => onTap?.(i)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onTap?.(i); } }}>
          <line x1={f1(l.ends[0][0])} y1={f1(l.ends[0][1])} x2={f1(l.ends[1][0])} y2={f1(l.ends[1][1])} stroke="#38bdf8" strokeOpacity="0" strokeWidth="34"
            className="group-hover:[stroke-opacity:0.25] group-focus:[stroke-opacity:0.25]" />
          {F.names[i] && <circle cx={f1(F.names[i].at[0])} cy={f1(F.names[i].at[1])} r="24" fill="transparent" />}
        </g>
      ) : null))}
    </svg>
  );
}
