import { useMemo } from 'react';
import {
  sketchLayout, sketchModel, curvePoints, reflectPoints, pathOf, scalesOf, inverseWindow, logText, tidyLog,
  SKETCH_BOX, FAMILY_WIN, FAMILIES,
} from '../../utils/expGraphs';
import { frText } from '../../utils/lineLab';
import { toNumber, isZero } from '../../utils/linearEquation';

/* ------------------------------------------------------------------ *
 * The picture of an exponential or a logarithmic curve, drawn from the
 * function alone. Shared by the three Exp Graph Lab tasks; `mode` picks the
 * kind of picture:
 *
 *   sketch   what a book sketch shows and nothing more: the two axes, the
 *            asymptote as a dashed line labelled with its equation, each axis
 *            crossing named with its EXACT value (½ ln 2, not 0.347), and the
 *            curve. No scale — the two axes have different units, and a
 *            sketch is about shape and crossings. `showY` / `showX` /
 *            `showAsym` / `showCurve` reveal it a stage at a time.
 *   inverse  f on a squared grid with equal units on both axes; `reveal`
 *            adds the line y = x, the inverse as the mirror image of f, its
 *            asymptote, and one pair of mirrored points joined across the line.
 *   family   one member of a family on a fixed grid, redrawn as k changes,
 *            with the curve it started from left behind as a ghost.
 *
 * Everything is derived in utils/expGraphs.js: the window, where each label
 * goes, and the sampled path (broken where the curve leaves the window).
 * ------------------------------------------------------------------ */

const SKY = '#0284c7';
const PINK = '#be185d';
const AMBER = '#d97706';
const INK = '#1e293b';
const RULE = '#94a3b8';
const GRID = '#e8eef5';
const MONO = "ui-monospace, 'Cascadia Mono', Consolas, monospace";

const GRID_BOX = { W: 460, H: 460, PAD: 22 };

/** A curve that sweeps itself on as it appears. */
function Sweep({ d, color, width = 3.5, draw = false, dashed = false, opacity = 1 }) {
  if (!d) return null;
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}
      pathLength={draw ? 1 : undefined} strokeDasharray={draw ? 1 : dashed ? '3 7' : undefined}>
      {draw && <animate attributeName="stroke-dashoffset" from="1" to="0" dur="1s" fill="freeze" />}
    </path>
  );
}

/* ------------------------------------------------------------ sketch */

function SketchFigure({ model, showY, showX, showAsym, showCurve }) {
  const { win, X, Y, px } = useMemo(() => sketchLayout(model), [model]);
  const d = useMemo(() => pathOf(curvePoints(model.curve, win), win, X, Y), [model, win, X, Y]);
  const { W, H, PAD } = SKETCH_BOX;
  const exp = model.kind === 'exp';
  const rises = model.shape === 'rises';
  const label = { fontSize: 15, fontFamily: MONO, fontWeight: 900 };

  // The asymptote and its equation. An exponential's label sits at the end
  // the curve has left, on the side away from the x-axis; a log curve's sits
  // at the end of the line the curve does not dive along.
  let asym = null;
  if (showAsym) {
    const value = frText(model.asym.value);
    if (exp) {
      const hugsLeft = toNumber(model.curve.n) > 0;
      const above = px.asym < px.axisY;
      asym = (
        <g pointerEvents="none">
          <line x1={PAD - 12} y1={px.asym} x2={W - PAD + 12} y2={px.asym} stroke={AMBER} strokeWidth="2.5" strokeDasharray="9 7" />
          <text x={hugsLeft ? W - PAD + 8 : PAD - 8} y={px.asym + (above ? -8 : 18)} textAnchor={hugsLeft ? 'end' : 'start'} fill={AMBER} {...label}>y = {value}</text>
        </g>
      );
    } else {
      const width = 9 * (value.length + 4);
      const domainRight = model.side === 'right';
      // On the side the curve is not, unless there is no room for it there.
      const room = domainRight ? px.asym - 6 : W - px.asym - 6;
      const onLeft = room >= width ? domainRight : !domainRight;
      const top = toNumber(model.curve.k) > 0;
      asym = (
        <g pointerEvents="none">
          <line x1={px.asym} y1={PAD - 12} x2={px.asym} y2={H - PAD + 12} stroke={AMBER} strokeWidth="2.5" strokeDasharray="9 7" />
          <text x={px.asym + (onLeft ? -8 : 8)} y={top ? PAD + 16 : H - PAD - 8} textAnchor={onLeft ? 'end' : 'start'} fill={AMBER} {...label}>x = {value}</text>
        </g>
      );
    }
  }

  // Each crossing is named on the side of the point the curve does not pass through.
  let yMark = null;
  if (showY && px.yInt !== null) {
    const text = exp ? frText(model.yInt) : (isZero(model.yInt.c) ? '0' : logText(tidyLog(model.yInt)));
    yMark = (
      <g pointerEvents="none">
        <circle cx={px.axisX} cy={px.yInt} r="5.5" fill={INK} />
        <text x={px.axisX + (rises ? -10 : 10)} y={px.yInt - 9} textAnchor={rises ? 'end' : 'start'} fill={INK} {...label}>{text}</text>
      </g>
    );
  }
  let xMark = null;
  if (showX && px.xInt !== null) {
    const text = exp ? logText(tidyLog(model.xInt)) : frText(model.xIntFr);
    // Away from the y-axis for an exponential, away from the asymptote for a log curve.
    const toRight = exp ? px.xInt > px.axisX : model.side === 'right';
    const curveAbove = toRight ? rises : !rises;      // on that side of the crossing
    xMark = (
      <g pointerEvents="none">
        <circle cx={px.xInt} cy={px.axisY} r="5.5" fill={INK} />
        <text x={px.xInt + (toRight ? 9 : -9)} y={px.axisY + (curveAbove ? 20 : -10)} textAnchor={toRight ? 'start' : 'end'} fill={INK} {...label}>{text}</text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={`Sketch of y = ${model.text}`}>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
      <line x1={PAD - 12} y1={px.axisY} x2={W - PAD + 12} y2={px.axisY} stroke={INK} strokeWidth="2" />
      <path d={`M${W - PAD + 12} ${px.axisY} l-9 -4.5 l0 9 z`} fill={INK} />
      <line x1={px.axisX} y1={H - PAD + 12} x2={px.axisX} y2={PAD - 12} stroke={INK} strokeWidth="2" />
      <path d={`M${px.axisX} ${PAD - 12} l-4.5 9 l9 0 z`} fill={INK} />
      <text x={W - PAD + 14} y={px.axisY + 5} fontSize="15" fontStyle="italic" fontFamily="serif" fill={INK}>x</text>
      <text x={px.axisX + 9} y={PAD - 10} fontSize="15" fontStyle="italic" fontFamily="serif" fill={INK}>y</text>
      <text x={px.axisX - 7} y={px.axisY + 16} fontSize="12" fontFamily={MONO} fill={RULE} textAnchor="end">O</text>
      {asym}
      {showCurve && <Sweep d={d} color={SKY} width={4} draw />}
      {yMark}
      {xMark}
    </svg>
  );
}

/* ------------------------------------------------------------ squared grid */

const niceStep = (span) => {
  const raw = span / 9;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const f = raw / pow;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * pow;
};
const tickText = (v) => String(Number(v.toFixed(2))).replace('-', '−');

/** The squared paper both grid pictures are drawn on: gridlines, axes, numbers. */
function Grid({ win, X, Y, box }) {
  const { W, H, PAD } = box;
  const step = niceStep(win.xMax - win.xMin);
  const ticks = [];
  for (let v = Math.ceil(win.xMin / step) * step; v <= win.xMax + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
  return (
    <g pointerEvents="none">
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={PAD} x2={X(v)} y2={H - PAD} stroke={GRID} strokeWidth="1" />
          <line x1={PAD} y1={Y(v)} x2={W - PAD} y2={Y(v)} stroke={GRID} strokeWidth="1" />
        </g>
      ))}
      <line x1={PAD - 6} y1={Y(0)} x2={W - PAD + 6} y2={Y(0)} stroke={INK} strokeWidth="1.8" />
      <path d={`M${W - PAD + 8} ${Y(0)} l-9 -4.5 l0 9 z`} fill={INK} />
      <line x1={X(0)} y1={H - PAD + 6} x2={X(0)} y2={PAD - 6} stroke={INK} strokeWidth="1.8" />
      <path d={`M${X(0)} ${PAD - 8} l-4.5 9 l9 0 z`} fill={INK} />
      {ticks.filter((v) => v !== 0 && X(v) > PAD + 8 && X(v) < W - PAD - 12).map((v) => (
        <text key={`x${v}`} x={X(v)} y={Y(0) + 14} textAnchor="middle" fontSize="10.5" fontFamily={MONO} fill={RULE}>{tickText(v)}</text>
      ))}
      {ticks.filter((v) => v !== 0 && Y(v) > PAD + 12 && Y(v) < H - PAD - 8).map((v) => (
        <text key={`y${v}`} x={X(0) - 5} y={Y(v) + 3.5} textAnchor="end" fontSize="10.5" fontFamily={MONO} fill={RULE}>{tickText(v)}</text>
      ))}
      <text x={W - PAD + 2} y={Y(0) - 8} textAnchor="end" fontSize="14" fontStyle="italic" fontFamily="serif" fill={INK}>x</text>
      <text x={X(0) + 8} y={PAD + 6} fontSize="14" fontStyle="italic" fontFamily="serif" fill={INK}>y</text>
    </g>
  );
}

/** A dashed line across the whole grid: y = value, or x = value. */
function AsymLine({ line, value, color, X, Y, box, faint = false }) {
  const { W, H, PAD } = box;
  const common = { stroke: color, strokeWidth: 2.2, strokeDasharray: '8 6', opacity: faint ? 0.35 : 1 };
  return line === 'y'
    ? <line x1={PAD} y1={Y(value)} x2={W - PAD} y2={Y(value)} {...common} />
    : <line x1={X(value)} y1={PAD} x2={X(value)} y2={H - PAD} {...common} />;
}

/* ------------------------------------------------------------ inverse */

function InverseFigure({ model, reveal }) {
  const win = useMemo(() => inverseWindow(model), [model]);
  const { X, Y } = useMemo(() => scalesOf(win, GRID_BOX), [win]);
  const pts = useMemo(() => curvePoints(model.curve, win, 320), [model, win]);
  const dF = useMemo(() => pathOf(pts, win, X, Y), [pts, win, X, Y]);
  const dInv = useMemo(() => pathOf(reflectPoints(pts), win, X, Y), [pts, win, X, Y]);
  const { W, H, PAD } = GRID_BOX;
  // One point of f and its mirror image: where f crosses an axis.
  const P = model.kind === 'exp' ? [0, model.f(0)] : [model.inv(0), 0];
  const Q = [P[1], P[0]];
  const inside = (p) => p[0] > win.xMin && p[0] < win.xMax && p[1] > win.yMin && p[1] < win.yMax;
  const pair = reveal && inside(P) && inside(Q) && Math.abs(P[0] - P[1]) > 1e-9;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={reveal ? 'The function, its inverse, and the line y = x' : 'The graph of the function'}>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
      <Grid win={win} X={X} Y={Y} box={GRID_BOX} />
      <AsymLine line={model.asymF.line} value={toNumber(model.asymF.value)} color={SKY} X={X} Y={Y} box={GRID_BOX} faint />
      {reveal && <line x1={X(win.xMin)} y1={Y(win.xMin)} x2={X(win.xMax)} y2={Y(win.xMax)} stroke={RULE} strokeWidth="2" strokeDasharray="3 6" />}
      {reveal && <AsymLine line={model.asymInv.line} value={toNumber(model.asymInv.value)} color={PINK} X={X} Y={Y} box={GRID_BOX} faint />}
      <Sweep d={dF} color={SKY} width={3.5} />
      {reveal && <Sweep d={dInv} color={PINK} width={3.5} draw />}
      {pair && (
        <g pointerEvents="none">
          <line x1={X(P[0])} y1={Y(P[1])} x2={X(Q[0])} y2={Y(Q[1])} stroke={AMBER} strokeWidth="1.8" strokeDasharray="4 4" />
          <circle cx={X(P[0])} cy={Y(P[1])} r="5" fill={SKY} />
          <circle cx={X(Q[0])} cy={Y(Q[1])} r="5" fill={PINK} />
        </g>
      )}
      <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} fill="none" stroke="#e2e8f0" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------ family */

function FamilyFigure({ family, k, ghostK = null }) {
  const win = FAMILY_WIN;
  const { X, Y } = useMemo(() => scalesOf(win, GRID_BOX), [win]);
  const fam = FAMILIES[family];
  const model = useMemo(() => sketchModel(fam.curve(k)), [fam, k]);
  const d = useMemo(() => pathOf(curvePoints(model.curve, win, 320), win, X, Y), [model, win, X, Y]);
  const dGhost = useMemo(() => (ghostK === null || ghostK === k ? '' : pathOf(curvePoints(sketchModel(fam.curve(ghostK)).curve, win, 320), win, X, Y)), [fam, ghostK, k, win, X, Y]);
  const { W, H, PAD } = GRID_BOX;
  const exp = model.kind === 'exp';
  const asymValue = toNumber(model.asym.value);
  const onAxis = Math.abs(asymValue) < 1e-9;
  // The crossings, as dots: they are what the questions ask about.
  const dots = [];
  if (exp) {
    dots.push([0, toNumber(model.yInt)]);
    if (model.crossesX) dots.push([model.xIntValue, 0]);
  } else {
    dots.push([model.xIntValue, 0]);
    if (model.crossesY) dots.push([0, model.yIntValue]);
  }
  const shown = dots.filter(([x, y]) => x >= win.xMin && x <= win.xMax && y >= win.yMin && y <= win.yMax);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={`The curve for k = ${k}`}>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
      <Grid win={win} X={X} Y={Y} box={GRID_BOX} />
      {dGhost && <Sweep d={dGhost} color={RULE} width={3} dashed opacity={0.8} />}
      {/* An asymptote that lies along an axis is drawn a little heavier, so it still shows. */}
      <AsymLine line={model.asym.line} value={asymValue} color={AMBER} X={X} Y={Y} box={GRID_BOX} />
      {onAxis && (exp
        ? <line x1={PAD} y1={Y(0)} x2={W - PAD} y2={Y(0)} stroke={AMBER} strokeWidth="4" strokeDasharray="8 6" opacity="0.55" />
        : <line x1={X(0)} y1={PAD} x2={X(0)} y2={H - PAD} stroke={AMBER} strokeWidth="4" strokeDasharray="8 6" opacity="0.55" />)}
      <Sweep d={d} color={SKY} width={4} />
      {shown.map(([x, y]) => <circle key={`${x},${y}`} cx={X(x)} cy={Y(y)} r="5.5" fill={INK} stroke="#ffffff" strokeWidth="1.5" />)}
      <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} fill="none" stroke="#e2e8f0" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------ one door */

export default function ExpCurveFigure({
  mode = 'sketch', model, family, k, ghostK,
  showY = true, showX = true, showAsym = true, showCurve = true, reveal = false,
}) {
  if (mode === 'family') return <FamilyFigure family={family} k={k} ghostK={ghostK} />;
  if (mode === 'inverse') return <InverseFigure model={model} reveal={reveal} />;
  return <SketchFigure model={model} showY={showY} showX={showX} showAsym={showAsym} showCurve={showCurve} />;
}
