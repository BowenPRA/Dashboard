/**
 * The curve y = a^x with the values of y a Hidden Quadratic question produced,
 * drawn as level lines — the picture behind "keep or reject". A kept value is
 * a line the curve meets (at the x the student found); a rejected value is a
 * line below the axis (or on it) that the curve can never reach, because a
 * power of a positive number is always positive.
 *
 * Props:
 *   base        the base as a number (Math.E for e)
 *   baseText    'e' or '2', for the label y = 2ˣ
 *   candidates  [{ key, y, keep, x, yText, xText }] from quadModel().figure
 *   showLines   draw the level lines (after the keep stage is answered)
 *   showX       drop each crossing to the x-axis and label it (after convert)
 *
 * Everything is to scale. Used only by src/tasks/ExpLab.jsx.
 */

const W = 360;
const H = 250;
const PAD = { l: 14, r: 14, t: 16, b: 30 };
const INK = '#0e7490';
const GREEN = '#16a34a';
const RED = '#e11d48';
const AXIS = '#1e293b';
const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, Consolas, monospace';

/** The window: tall enough for every kept value, deep enough for every rejected one. */
function windowFor(base, candidates) {
  const pos = candidates.filter((c) => c.y > 0).map((c) => c.y);
  const neg = candidates.filter((c) => c.y < 0).map((c) => c.y);
  const yTop = Math.max(2, ...pos.map((v) => v * 1.3));
  const yBot = neg.length ? Math.min(...neg) * 1.25 : -0.14 * yTop;
  const lnb = Math.log(base);
  // The curve leaves through the top edge; keep at least 1.2 to the right of
  // the y-axis so its label has room.
  const xTop = Math.max(Math.log(yTop) / lnb, 1.2);
  const xs = candidates.filter((c) => c.keep && Number.isFinite(c.x)).map((c) => c.x);
  const xLeft = Math.min(-1.5, xTop - Math.log(40) / lnb, ...xs.map((x) => x - 0.9));
  return { x0: xLeft, x1: xTop, y0: yBot, y1: yTop };
}

export default function ExpCurve({ base, baseText, candidates = [], showLines = false, showX = false }) {
  const win = windowFor(base, candidates);
  const X = (x) => PAD.l + ((x - win.x0) / (win.x1 - win.x0)) * (W - PAD.l - PAD.r);
  const Y = (y) => PAD.t + ((win.y1 - y) / (win.y1 - win.y0)) * (H - PAD.t - PAD.b);
  let d = '';
  const steps = 160;
  for (let i = 0; i <= steps; i += 1) {
    const x = win.x0 + ((win.x1 - win.x0) * i) / steps;
    const y = base ** x;
    if (y > win.y1) break;
    d += `${i === 0 ? 'M' : 'L'}${X(x).toFixed(1)} ${Y(y).toFixed(1)} `;
  }
  const ox = X(0);
  const oy = Y(0);
  const left = PAD.l;
  const right = W - PAD.r;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`The curve y = ${baseText} to the power x, which stays above the x-axis`}>
      <rect x="0" y="0" width={W} height={H} rx="12" fill="#ffffff" />
      {/* below the axis: where no power of a positive number can be */}
      <rect x={left} y={oy} width={right - left} height={Math.max(0, H - PAD.b + 6 - oy)} fill="#fef2f2" />
      <text x={left + 4} y={Math.min(oy + 14, H - PAD.b)} fontFamily={FONT} fontSize="10.5" fontWeight="700" fill={RED}>{`no power of ${baseText} is down here`}</text>
      {/* axes */}
      <line x1={left} y1={oy} x2={right} y2={oy} stroke={AXIS} strokeWidth="1.6" />
      <line x1={ox} y1={PAD.t - 6} x2={ox} y2={H - PAD.b + 8} stroke={AXIS} strokeWidth="1.6" />
      <path d={`M${right} ${oy} l-8 -4 l0 8 z M${ox} ${PAD.t - 8} l-4 8 l8 0 z`} fill={AXIS} />
      <text x={right - 2} y={oy + 16} textAnchor="end" fontFamily={MONO} fontSize="12" fontStyle="italic" fill={AXIS}>x</text>
      <text x={ox + 7} y={PAD.t + 4} fontFamily={MONO} fontSize="12" fontStyle="italic" fill={AXIS}>y</text>
      <text x={ox - 5} y={oy + 14} textAnchor="end" fontFamily={MONO} fontSize="11" fill="#64748b">O</text>
      {/* the curve */}
      <path d={d.trim()} fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={ox} cy={Y(1)} r="3.5" fill={INK} />
      <text x={ox - 6} y={Y(1) - 5} textAnchor="end" fontFamily={MONO} fontSize="11" fontWeight="700" fill={INK}>1</text>
      <text x={X(win.x1) - 16} y={PAD.t + 12} textAnchor="end" fontFamily={MONO} fontSize="14" fontWeight="900" fill={INK}>{`y = ${baseText}ˣ`}</text>
      {showLines && candidates.map((c) => {
        const y = Y(c.y);
        const onAxis = c.y === 0;
        const color = c.keep ? GREEN : RED;
        // Labels sit at the left, where the curve is flat and low; a line on
        // the axis is labelled under it.
        const labelY = onAxis ? y + 28 : y - 6;
        return (
          <g key={c.key}>
            <line x1={left} y1={y} x2={right} y2={y} stroke={color} strokeWidth={onAxis ? 3 : 2.2} strokeDasharray="7 5" />
            <text x={left + 4} y={labelY} fontFamily={MONO} fontSize="12" fontWeight="900" fill={color}>
              {`y = ${c.yText}${c.keep ? '' : onAxis ? ': never reached' : ': never met'}`}
            </text>
            {c.keep && Number.isFinite(c.x) && (
              <>
                <circle cx={X(c.x)} cy={y} r="5.5" fill={GREEN} stroke="#ffffff" strokeWidth="2" />
                {showX && (
                  <>
                    <line x1={X(c.x)} y1={y} x2={X(c.x)} y2={oy} stroke={GREEN} strokeWidth="1.6" strokeDasharray="3 3" />
                    <rect x={X(c.x) - 30} y={oy + 5} width="60" height="17" rx="8.5" fill="#dcfce7" />
                    <text x={X(c.x)} y={oy + 17.5} textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="900" fill="#166534">{`x = ${c.xText}`}</text>
                  </>
                )}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
