/**
 * A small picture of each angle fact, for the reason buttons of Find Every
 * Angle (utils/angleChase.js): the straight line, the full turn, the X, the
 * upright F, the true Z, the same-side pair, the triangle, the quadrilateral
 * and the parallelogram. The two angles the fact joins are filled.
 */
const INK = 'currentColor';
const FILL = '#f5b301';

const wedge = (x, y, r, a0, a1) => {
  const p = (a) => [x + r * Math.cos((a * Math.PI) / 180), y - r * Math.sin((a * Math.PI) / 180)];
  const [sx, sy] = p(a0);
  const [ex, ey] = p(a1);
  return `M ${x} ${y} L ${sx.toFixed(1)} ${sy.toFixed(1)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${ex.toFixed(1)} ${ey.toFixed(1)} Z`;
};

const PICS = {
  line: (
    <>
      <path d={wedge(24, 26, 9, 0, 55)} fill={FILL} stroke="none" /><path d={wedge(24, 26, 9, 55, 180)} fill={FILL} stroke="none" opacity="0.5" />
      <path d="M 4 26 L 44 26 M 24 26 L 36 9" />
    </>
  ),
  point: (
    <>
      <path d={wedge(24, 17, 8, 20, 150)} fill={FILL} stroke="none" /><path d={wedge(24, 17, 8, 150, 270)} fill={FILL} stroke="none" opacity="0.5" />
      <path d="M 24 17 L 40 11 M 24 17 L 10 9 M 24 17 L 24 33" /><circle cx="24" cy="17" r="2" fill={INK} />
    </>
  ),
  opp: (
    <>
      <path d={wedge(24, 17, 9, 30, 150)} fill={FILL} stroke="none" /><path d={wedge(24, 17, 9, 210, 330)} fill={FILL} stroke="none" />
      <path d="M 8 26 L 40 8 M 8 8 L 40 26" />
    </>
  ),
  corr: (
    <>
      <path d={wedge(19.2, 10, 8, 301, 360)} fill={FILL} stroke="none" /><path d={wedge(28.8, 26, 8, 301, 360)} fill={FILL} stroke="none" />
      <path d="M 6 10 L 44 10 M 6 26 L 44 26 M 15 3 L 33 33" />
    </>
  ),
  alt: (
    <>
      <path d={wedge(29.3, 10, 8, 180, 236)} fill={FILL} stroke="none" /><path d={wedge(18.7, 26, 8, 0, 56)} fill={FILL} stroke="none" />
      <path d="M 6 10 L 44 10 M 6 26 L 44 26 M 36 0 L 12 36" />
    </>
  ),
  side: (
    <>
      <path d={wedge(19.2, 10, 8, 180, 301)} fill={FILL} stroke="none" /><path d={wedge(28.8, 26, 8, 121, 180)} fill={FILL} stroke="none" opacity="0.6" />
      <path d="M 6 10 L 44 10 M 6 26 L 44 26 M 15 3 L 33 33" />
    </>
  ),
  tri: (
    <>
      <path d={wedge(8, 30, 8, 0, 57)} fill={FILL} stroke="none" /><path d={wedge(40, 30, 8, 123, 180)} fill={FILL} stroke="none" opacity="0.7" /><path d={wedge(24, 5, 6, 237, 303)} fill={FILL} stroke="none" opacity="0.5" />
      <path d="M 8 30 L 40 30 L 24 5 Z" />
    </>
  ),
  quad: <path d="M 7 29 L 41 31 L 35 6 L 13 9 Z" />,
  para: (
    <>
      <path d={wedge(6, 29, 8, 0, 70)} fill={FILL} stroke="none" /><path d={wedge(42, 7, 8, 180, 250)} fill={FILL} stroke="none" />
      <path d="M 6 29 L 34 29 L 42 7 L 14 7 Z" />
    </>
  ),
};

export default function FactIcon({ kind, className = 'w-11 h-8' }) {
  return (
    <svg viewBox="0 0 48 36" className={className} aria-hidden="true" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {PICS[kind] || null}
    </svg>
  );
}
