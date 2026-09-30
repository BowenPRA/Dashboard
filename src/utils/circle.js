// src/utils/circle.js
//
// The equation of a circle — the pure parts behind the three Circle Lab tasks
// (src/tasks/CircleLab.jsx), built for ADD_MATH AM_7A (coursebook section 7.1):
//
//   · Plot the Circle      (CIRCLE_PLOT)   read the centre and radius off
//                                          (x − a)² + (y − b)² = r², on a grid
//   · Write the Equation   (CIRCLE_EQ)     build the equation from a centre and
//                                          a radius, a point, a diameter or a
//                                          tangent axis
//   · Complete the Square  (CIRCLE_SQUARE) general form → completed square form
//                                          → centre and radius
//
// THE RULE (same as modulus.js, cubic.js, logs.js, lineLab.js): an item stores
// the QUESTION and everything else is derived here with exact arithmetic — the
// centre, r², the simplified surd radius, the halves and squares of completing
// the square, the lattice points on the circle, what the circle does at each
// axis. No answer key is authored, so none can drift, and `checkCircleItems`
// refuses an item a student could not finish on the screen.
//
// ITEM SHAPES
//   plot    { id, level?, centre: [a, b], r2, scale?, axes?, note?, grid? }
//             (x − a)² + (y − b)² = r2. `scale: k` prints kx² + ky² = k·r2
//             (origin only). `axes: true` adds the "what happens at each axis"
//             stage before the circle is drawn.
//   eq      { id, level?, kind: 'radius',   centre, r2 }
//           { id, level?, kind: 'through',  centre, point }
//           { id, level?, kind: 'diameter', A, B }
//           { id, level?, kind: 'touch',    centre, axis: 'x' | 'y' }
//   square  { id, level?, coef: [k, D, E, F], rhs?, notCircle? }
//             kx² + ky² + Dx + Ey + F = rhs (rhs defaults to 0).
//
// Coordinates are whole numbers or strings like '1/2'. r2 is always a whole
// number: a surd radius is the point of half the items, a fractional one is not.

import { fr, add, sub, mul, div, neg, isZero, frEq, toNumber } from './linearEquation.js';
import { parseNum, frTex, frText } from './lineLab.js';
import { splitRoot } from './surds.js';

export const CIRCLE_MODES = ['plot', 'eq', 'square'];
export const EQ_KINDS = ['radius', 'through', 'diameter', 'touch'];
export const DEFAULT_CIRCLE_GRID = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

// ------------------------------------------------------------------ numbers

const F = (v) => {
  const f = parseNum(v);
  if (!f) throw new Error(`"${v}" is not a number`);
  return f;
};
const isInt = (f) => f.d === 1;
const sq = (f) => mul(f, f);
const ZERO = fr(0);
const pt = (p) => [F(p[0]), F(p[1])];
const numPt = (p) => [toNumber(p[0]), toNumber(p[1])];

/** A typed number (whole, decimal or a fraction like 3/2), or null. */
export const typedNumber = (v) => parseNum(String(v ?? '').trim());

/** r = out·√inside for a positive whole r². */
export const rootOf = (r2) => splitRoot(r2);

/** The radius as KaTeX: 5, \sqrt{7}, 2\sqrt{3}. */
export function radiusLatex(r2) {
  const { out, inside } = rootOf(r2);
  if (inside === 1) return `${out}`;
  return `${out === 1 ? '' : out}\\sqrt{${inside}}`;
}

/** The radius as plain text for SVG flags: 5, √7, 2√3. */
export function radiusText(r2) {
  const { out, inside } = rootOf(r2);
  if (inside === 1) return `${out}`;
  return `${out === 1 ? '' : out}√${inside}`;
}

const pairTex = (p) => (p[0].d === 1 && p[1].d === 1
  ? `(${frTex(p[0])}, ${frTex(p[1])})`
  : `\\left(${frTex(p[0])}, ${frTex(p[1])}\\right)`);
const pairText = (p) => `(${frText(p[0])}, ${frText(p[1])})`;

// ------------------------------------------------------------------ printing

/** One squared bracket: x², (x − 3)², (x + 1/2)². `c` is the CENTRE coordinate. */
export function bracketLatex(v, c) {
  if (isZero(c)) return `${v}^2`;
  const mag = frTex(fr(Math.abs(c.n), c.d));
  const inner = `${v} ${c.n > 0 ? '-' : '+'} ${mag}`;
  return c.d === 1 ? `(${inner})^2` : `\\left(${inner}\\right)^2`;
}

/** (x − a)² + (y − b)² = r². */
export const completedLatex = (centre, r2) =>
  `${bracketLatex('x', centre[0])} + ${bracketLatex('y', centre[1])} = ${typeof r2 === 'number' ? r2 : frTex(r2)}`;

const termLatex = (coef, body, first) => {
  if (coef === 0) return '';
  const mag = Math.abs(coef);
  const num = mag === 1 && body ? '' : `${mag}`;
  if (first) return `${coef < 0 ? '-' : ''}${num}${body}`;
  return ` ${coef < 0 ? '-' : '+'} ${num}${body}`;
};

/** kx² + ky² + Dx + Ey + F = rhs, as printed. */
export function generalLatex([k, D, E, Fc], rhs = 0) {
  const left = termLatex(k, 'x^2', true) + termLatex(k, 'y^2', false) + termLatex(D, 'x', false)
    + termLatex(E, 'y', false) + termLatex(Fc, '', false);
  return `${left} = ${rhs}`;
}

/** x² + y² + dx + ey + c with fraction coefficients (after dividing through). */
function dividedLatex(d, e, c) {
  const part = (f, body) => {
    if (isZero(f)) return '';
    const mag = fr(Math.abs(f.n), f.d);
    const num = mag.n === 1 && mag.d === 1 && body ? '' : frTex(mag);
    return ` ${f.n < 0 ? '-' : '+'} ${num}${body}`;
  };
  return `x^2 + y^2${part(d, 'x')}${part(e, 'y')}${part(c, '')} = 0`;
}

// ------------------------------------------------------------------ geometry

/** Every lattice point on the circle, anticlockwise from due east. Lattice centres only. */
export function latticeOn(centre, r2) {
  if (!isInt(centre[0]) || !isInt(centre[1]) || r2 <= 0) return [];
  const [a, b] = numPt(centre);
  const out = [];
  const lim = Math.floor(Math.sqrt(r2));
  for (let dx = -lim; dx <= lim; dx += 1) {
    const rest = r2 - dx * dx;
    const dy = Math.round(Math.sqrt(rest));
    if (dy * dy !== rest) continue;
    out.push([a + dx, b + dy]);
    if (dy !== 0) out.push([a + dx, b - dy]);
  }
  const ang = ([x, y]) => (Math.atan2(y - b, x - a) + 2 * Math.PI) % (2 * Math.PI);
  return out.sort((p, q) => ang(p) - ang(q));
}

/** A coordinate "base ± r" as text: 7, −1, 3 + 2√3, −√5. */
function offsetText(base, sign, r2) {
  const { out, inside } = rootOf(r2);
  if (inside === 1) return frText(add(base, fr(sign * out)));
  const rt = radiusText(r2);
  if (isZero(base)) return `${sign < 0 ? '−' : ''}${rt}`;
  return `${frText(base)} ${sign > 0 ? '+' : '−'} ${rt}`;
}
function offsetLatex(base, sign, r2) {
  const { out, inside } = rootOf(r2);
  if (inside === 1) return frTex(add(base, fr(sign * out)));
  const rt = radiusLatex(r2);
  if (isZero(base)) return `${sign < 0 ? '-' : ''}${rt}`;
  return `${frTex(base)} ${sign > 0 ? '+' : '-'} ${rt}`;
}

/**
 * The points shown on a finished circle: `{ at: [x, y], text, tex, flag }`.
 * Lattice points when the circle has them (four of them flagged, spread round
 * the circle), otherwise the four compass points with exact surd coordinates.
 */
export function revealPoints(centre, r2) {
  const lattice = latticeOn(centre, r2);
  if (lattice.length) {
    const step = Math.max(1, Math.floor(lattice.length / 4));
    const flagged = new Set([0, 1, 2, 3].map((i) => (i * step) % lattice.length));
    // A circle with twelve lattice points reads better with a slanted one
    // flagged too, so shift every other flag one place round when we can.
    if (lattice.length >= 8) { flagged.clear(); [0, 1, 2, 3].forEach((i) => flagged.add((i * step + (i % 2)) % lattice.length)); }
    return lattice.map((p, i) => ({
      at: p, text: `(${frText(fr(p[0]))}, ${frText(fr(p[1]))})`, tex: `(${p[0]}, ${p[1]})`, flag: flagged.has(i),
    }));
  }
  const r = Math.sqrt(r2);
  const [a, b] = numPt(centre);
  return [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([sx, sy]) => ({
    at: [a + sx * r, b + sy * r],
    text: `(${sx ? offsetText(centre[0], sx, r2) : frText(centre[0])}, ${sy ? offsetText(centre[1], sy, r2) : frText(centre[1])})`,
    tex: `(${sx ? offsetLatex(centre[0], sx, r2) : frTex(centre[0])}, ${sy ? offsetLatex(centre[1], sy, r2) : frTex(centre[1])})`,
    flag: true,
  }));
}

/**
 * What the circle does at one axis: 'cross' (two points), 'touch' (one) or
 * 'miss', with the exact crossing coordinates as text and KaTeX.
 * `axis` 'x' compares the centre's y-coordinate with the radius.
 */
export function axisInfo(centre, r2, axis) {
  const along = axis === 'x' ? centre[0] : centre[1];   // coordinate that varies along the axis
  const away = axis === 'x' ? centre[1] : centre[0];    // distance from the axis
  const gap = sub(fr(r2), sq(away));                    // (half-chord)²
  const kind = gap.n > 0 ? 'cross' : gap.n === 0 ? 'touch' : 'miss';
  const at = (v) => (axis === 'x' ? [v, 0] : [0, v]);
  if (kind === 'miss') return { axis, kind, points: [] };
  if (kind === 'touch') {
    const p = axis === 'x' ? [along, ZERO] : [ZERO, along];
    return { axis, kind, points: [{ at: numPt(p), text: pairText(p), tex: pairTex(p) }] };
  }
  // gap is a positive rational; every item here keeps it a whole number or a
  // quarter-integer, so the root is √n or √n / 2.
  const whole = isInt(gap) ? gap.n : null;
  const half = Math.sqrt(toNumber(gap));
  const points = [-1, 1].map((s) => {
    const v = toNumber(along) + s * half;
    let text;
    let tex;
    if (whole !== null) {
      text = offsetText(along, s, whole);
      tex = offsetLatex(along, s, whole);
    } else {
      text = String(Math.round(v * 1000) / 1000);
      tex = text;
    }
    return { at: at(v), text: axis === 'x' ? `(${text}, 0)` : `(0, ${text})`, tex: axis === 'x' ? `(${tex}, 0)` : `(0, ${tex})` };
  });
  return { axis, kind, points };
}

export const gridOf = (item) => ({ ...DEFAULT_CIRCLE_GRID, ...(item?.grid || {}) });

// ------------------------------------------------------------------ models

/** Plot the Circle. */
export function plotModel(item) {
  const centre = pt(item.centre);
  const r2 = item.r2;
  const root = rootOf(r2);
  const rIsInt = root.inside === 1;
  const stages = ['centre', rIsInt ? 'rim' : 'radius'];
  if (item.axes) stages.push('axes');
  const questionLatex = item.scale
    ? `${item.scale}x^2 + ${item.scale}y^2 = ${item.scale * r2}`
    : completedLatex(centre, r2);
  return {
    mode: 'plot', centre, r2, root, rIsInt, r: Math.sqrt(r2), stages, questionLatex,
    isCircle: true, clickCentre: true,
    axes: { x: axisInfo(centre, r2, 'x'), y: axisInfo(centre, r2, 'y') },
  };
}

/** Write the Equation. */
export function eqModel(item) {
  let centre;
  let r2;
  let stages;
  let given;
  let promptLatex;
  if (item.kind === 'radius') {
    centre = pt(item.centre);
    r2 = item.r2;
    stages = ['equation'];
    promptLatex = `\\text{Centre } ${pairTex(centre)},\\ \\text{radius } ${radiusLatex(r2)}`;
    given = [{ at: numPt(centre), name: 'C' }];
  } else if (item.kind === 'through') {
    centre = pt(item.centre);
    const P = pt(item.point);
    r2 = toNumber(add(sq(sub(P[0], centre[0])), sq(sub(P[1], centre[1]))));
    stages = ['r2', 'equation'];
    promptLatex = `\\text{Centre } ${pairTex(centre)},\\ \\text{passing through } ${pairTex(P)}`;
    given = [{ at: numPt(centre), name: 'C' }, { at: numPt(P), name: 'P' }];
  } else if (item.kind === 'diameter') {
    const A = pt(item.A);
    const B = pt(item.B);
    centre = [div(add(A[0], B[0]), fr(2)), div(add(A[1], B[1]), fr(2))];
    r2 = toNumber(add(sq(sub(A[0], centre[0])), sq(sub(A[1], centre[1]))));
    stages = ['centre', 'r2', 'equation'];
    promptLatex = `\\text{Diameter } AB,\\ A${pairTex(A)},\\ B${pairTex(B)}`;
    given = [{ at: numPt(A), name: 'A' }, { at: numPt(B), name: 'B' }];
  } else {
    centre = pt(item.centre);
    const away = item.axis === 'x' ? centre[1] : centre[0];
    r2 = toNumber(sq(away));
    stages = ['radius', 'equation'];
    promptLatex = `\\text{Centre } ${pairTex(centre)},\\ \\text{touching the } ${item.axis}\\text{-axis}`;
    given = [{ at: numPt(centre), name: 'C' }];
  }
  const clickCentre = isInt(centre[0]) && isInt(centre[1]);
  // The prompt is set on two short lines: on one it is wider than the card.
  const promptLines = promptLatex.split(',\\ ').reduce((acc, part, i) => {
    if (item.kind === 'diameter' && i === 2) acc[1] += `,\\ ${part}`;
    else acc.push(part);
    return acc;
  }, []);
  return {
    mode: 'eq', kind: item.kind, centre, r2, root: Number.isInteger(r2) && r2 > 0 ? rootOf(r2) : null,
    r: Math.sqrt(r2), stages, promptLatex, promptLines, given, isCircle: true, clickCentre, axis: item.axis,
    questionLatex: promptLatex, answerLatex: completedLatex(centre, r2),
  };
}

/** Complete the Square. */
export function squareModel(item) {
  const [k, D, E, Fc] = item.coef;
  const rhs = item.rhs || 0;
  const d = fr(D, k);
  const e = fr(E, k);
  const c = fr(Fc - rhs, k);
  const p = div(d, fr(2));            // x² + dx = (x + p)² − p²
  const q = div(e, fr(2));
  const p2 = sq(p);
  const q2 = sq(q);
  const centre = [neg(p), neg(q)];
  const r2f = sub(add(p2, q2), c);
  const r2 = isInt(r2f) ? r2f.n : toNumber(r2f);
  const isCircle = r2 > 0;
  const stages = [];
  if (k !== 1) stages.push('divide');
  if (!isZero(d)) stages.push('squareX');
  if (!isZero(e)) stages.push('squareY');
  stages.push('rhs');
  if (isCircle) stages.push('centre', 'radius');
  else stages.push('verdict');
  return {
    mode: 'square', k, D, E, F: Fc, rhs, d, e, c, p, q, p2, q2, centre, r2, r2f,
    root: isCircle && Number.isInteger(r2) ? rootOf(r2) : null,
    r: isCircle ? Math.sqrt(r2) : 0, isCircle, stages,
    clickCentre: isInt(centre[0]) && isInt(centre[1]),
    questionLatex: generalLatex(item.coef, rhs),
    dividedLatex: dividedLatex(d, e, c),
    answerLatex: completedLatex(centre, r2f),
  };
}

export function modelOf(mode, item) {
  if (mode === 'plot') return plotModel(item);
  if (mode === 'eq') return eqModel(item);
  return squareModel(item);
}

// ------------------------------------------------------------------ judging

/**
 * A clicked centre. The three wrong points worth naming: both signs copied
 * straight off the brackets, one sign copied, and the two coordinates swapped.
 */
export function judgeCentre(model, p) {
  const [a, b] = numPt(model.centre);
  if (p[0] === a && p[1] === b) return { ok: true };
  if (model.mode === 'eq' && model.kind === 'diameter') {
    return { ok: false, why: 'The centre is the midpoint of the diameter: average the two x-coordinates, then the two y-coordinates.' };
  }
  if (p[0] === -a && p[1] === -b && (a !== 0 || b !== 0)) {
    // Quote the question's own brackets, so the example is the one on screen.
    const zeroAt = (v, c) => `(${v} ${c > 0 ? '−' : '+'} ${Math.abs(c)}) is zero when ${v} = ${c < 0 ? '−' : ''}${Math.abs(c)}`;
    const parts = [a !== 0 ? zeroAt('x', a) : null, b !== 0 ? zeroAt('y', b) : null].filter(Boolean);
    const lead = model.mode === 'plot' ? 'You copied the signs straight out of the brackets. They flip' : 'The signs are the wrong way round. They flip';
    return { ok: false, why: `${lead}: ${parts.join(', and ')}.` };
  }
  if ((p[0] === -a && p[1] === b && a !== 0) || (p[0] === a && p[1] === -b && b !== 0)) {
    return { ok: false, why: 'One coordinate is right and one has the wrong sign. Ask of each bracket: what value makes it zero?' };
  }
  if (p[0] === b && p[1] === a && a !== b) {
    return { ok: false, why: 'Those are the right numbers the wrong way round. The x-bracket gives the x-coordinate.' };
  }
  if (a === 0 && b === 0) {
    return { ok: false, why: 'There are no brackets here, so nothing has been shifted. Where is the centre of x² + y² = r²?' };
  }
  if (a === 0 || b === 0) {
    return { ok: false, why: `Not the centre. There is no ${a === 0 ? 'x' : 'y'} bracket, so that coordinate is 0; the other bracket is zero at the centre.` };
  }
  return { ok: false, why: 'Not the centre. Each bracket is zero at the centre: solve x-bracket = 0 and y-bracket = 0.' };
}

/** A typed centre (two boxes), for a centre that is not a whole-number point. */
export function judgeCentreTyped(model, xText, yText) {
  const x = typedNumber(xText);
  const y = typedNumber(yText);
  const marks = { x: !!x && frEq(x, model.centre[0]), y: !!y && frEq(y, model.centre[1]) };
  if (marks.x && marks.y) return { ok: true, marks };
  const flipped = (got, want) => !!got && !isZero(want) && frEq(got, neg(want));
  // Quote the question's own brackets, so the example is the one on screen.
  const zeroAt = (v, c) => `(${v} ${c.n > 0 ? '−' : '+'} ${frText(fr(Math.abs(c.n), c.d))}) is zero when ${v} = ${frText(c)}`;
  const parts = [['x', model.centre[0]], ['y', model.centre[1]]].filter(([, c]) => !isZero(c)).map(([v, c]) => zeroAt(v, c));
  const why = flipped(x, model.centre[0]) || flipped(y, model.centre[1])
    ? `A sign is the wrong way round. Each bracket is zero at the centre: ${parts.join(', and ')}.`
    : 'Not the centre. Each bracket is zero at the centre: solve x-bracket = 0 and y-bracket = 0.';
  return { ok: false, marks, why };
}

/** A clicked point that should lie on the circle. */
export function judgeRim(model, p) {
  const [a, b] = numPt(model.centre);
  const d2 = (p[0] - a) ** 2 + (p[1] - b) ** 2;
  if (d2 === model.r2) return { ok: true };
  if (d2 === 0) return { ok: false, why: 'That is the centre. Click a point ON the circle: one radius away from the centre.' };
  const dist = radiusText(d2);
  if (d2 === model.r2 * model.r2) {
    return { ok: false, why: `That point is ${dist} from the centre. The number on the right is the radius SQUARED — take its square root.` };
  }
  return { ok: false, why: `That point is ${dist} from the centre, which is not the radius. The radius is the square root of the number on the right.` };
}

/**
 * A typed radius [coef]√[rad]; an empty root box means no root.
 * `simplify` is true when the value is right but a square is still under the root.
 */
export function judgeRadius(model, coefText, radText) {
  const coef = Number(String(coefText ?? '').trim() || (String(radText ?? '').trim() ? '1' : ''));
  const rad = Number(String(radText ?? '').trim() || '1');
  if (!Number.isInteger(coef) || !Number.isInteger(rad) || rad < 1) return { ok: false, why: 'Type the radius: a number in front, and a number under the root if it needs one.' };
  if (coef < 0) return { ok: false, why: 'A radius is a length, so it is never negative.' };
  const value2 = coef * coef * rad;
  if (value2 === model.r2) {
    if (splitRoot(rad).out !== 1) return { ok: false, simplify: true, why: 'That is the right length. Now simplify it: take the square factor out from under the root.' };
    return { ok: true };
  }
  // A tangent-axis item has no right-hand side to read yet: the radius comes
  // from the centre's distance to the axis it touches.
  if (model.kind === 'touch') {
    const otherAxis = model.axis === 'x' ? 'y' : 'x';
    const toOther = Math.abs(toNumber(model.axis === 'x' ? model.centre[0] : model.centre[1]));
    if (rad === 1 && coef === toOther) return { ok: false, why: `That is how far the centre is from the ${otherAxis}-axis. The circle touches the ${model.axis}-axis.` };
    return { ok: false, why: `Not the radius. The circle touches the ${model.axis}-axis, so the radius is how far the centre is from that axis: look at the centre's ${otherAxis}-coordinate.` };
  }
  if (rad === 1 && coef === model.r2) return { ok: false, why: 'That is r², the number on the right-hand side. The radius is its square root.' };
  if (rad === 1 && coef * 2 === model.r2) return { ok: false, why: 'You halved it. Squaring is undone by a square root, not by halving.' };
  return { ok: false, why: 'Not the radius. The right-hand side is r², so r is its square root.' };
}

const signedValue = (sign, magText) => {
  const m = typedNumber(magText);
  if (!m) return null;
  return sign === '+' ? neg(m) : m;      // (x + m)² has centre x = −m
};

/**
 * The equation boxes: (x [sx] [mx])² + (y [sy] [my])² = [rhs].
 * Returns marks per part and the most useful thing to say.
 */
export function judgeEquation(model, { sx, mx, sy, my, rhs }) {
  const cx = signedValue(sx, mx);
  const cy = signedValue(sy, my);
  const r = typedNumber(rhs);
  const marks = {
    x: !!cx && frEq(cx, model.centre[0]),
    y: !!cy && frEq(cy, model.centre[1]),
    rhs: !!r && isInt(r) && r.n === model.r2,
  };
  if (marks.x && marks.y && marks.rhs) return { ok: true, marks };
  let why = 'Check the parts marked red.';
  const flipped = (got, want) => !!got && !isZero(want) && frEq(got, neg(want));
  // Name the bracket that is wanted, with the question's own number in it.
  const wanted = (v, c) => {
    const mag = frText(fr(Math.abs(c.n), c.d));
    return `The sign in the ${v}-bracket is the wrong way round. The centre has ${v} = ${frText(c)}, and the bracket must be zero there, so it is (${v} ${c.n > 0 ? '−' : '+'} ${mag}).`;
  };
  if (!marks.x && flipped(cx, model.centre[0])) why = wanted('x', model.centre[0]);
  else if (!marks.y && flipped(cy, model.centre[1])) why = wanted('y', model.centre[1]);
  else if (!marks.rhs && r) {
    const root = model.root;
    if (root && root.inside === 1 && isInt(r) && r.n === root.out) why = 'The right-hand side is the radius SQUARED, not the radius.';
    else if (root && root.inside === 1 && isInt(r) && r.n === 2 * root.out) why = 'You doubled the radius. It has to be squared.';
    else if (model.kind === 'diameter' && isInt(r) && r.n === 4 * model.r2) why = 'That is the diameter squared. Use the radius: the distance from the centre to one end.';
    else why = 'The right-hand side is r², the radius squared.';
  }
  return { ok: false, marks, why };
}

/** One completed square: x² + dx = (x + [p])² − [q]. `axis` is 'x' or 'y'. */
export function judgeSquare(model, axis, sign, magText, qText) {
  const want = axis === 'x' ? model.p : model.q;        // the number added inside the bracket
  const want2 = axis === 'x' ? model.p2 : model.q2;
  const m = typedNumber(magText);
  const inside = m ? (sign === '-' ? neg(m) : m) : null;
  const q = typedNumber(qText);
  const marks = { p: !!inside && frEq(inside, want), q: !!q && frEq(q, want2) };
  if (marks.p && marks.q) return { ok: true, marks };
  const coef = axis === 'x' ? model.d : model.e;
  let why = 'Halve the coefficient for the bracket, then subtract the square of that half.';
  if (!marks.p && inside && frEq(inside, coef)) why = 'The number in the bracket is HALF the coefficient, not the whole of it.';
  else if (!marks.p && inside && frEq(inside, neg(want))) why = 'Right size, wrong sign. The bracket keeps the sign of the term: x² − 6x starts (x − 3)².';
  else if (marks.p && q && frEq(q, neg(want2))) why = 'The square you take away is always positive: (−3)² is 9, so you subtract 9.';
  else if (marks.p && q && frEq(q, fr(Math.abs(want.n), want.d))) why = 'Subtract the SQUARE of the half, not the half itself.';
  return { ok: false, marks, why };
}

/** The number left on the right once both squares are complete. */
export function judgeRhs(model, text) {
  const r = typedNumber(text);
  if (r && frEq(r, model.r2f)) return { ok: true };
  // One square or two: an item with no x term (or no y term) completes only one.
  const two = !isZero(model.p) && !isZero(model.q);
  let why = `Move the numbers to the right: add ${two ? 'the two squares' : 'the square'} you subtracted, and move any constant across with its sign changed.`;
  if (r) {
    const forgot = neg(model.c);
    if (frEq(r, forgot) && !(isZero(model.p2) && isZero(model.q2))) {
      why = two
        ? 'You left out the two squares. They were subtracted on the left, so they are added on the right.'
        : 'You left out the square. It was subtracted on the left, so it is added on the right.';
    }
    else if (frEq(r, add(add(model.p2, model.q2), model.c))) why = 'The constant changes sign when it crosses the equals sign.';
    else if (frEq(r, neg(model.r2f))) why = 'Right size, wrong sign. Check each term as it crosses the equals sign.';
  }
  return { ok: false, why };
}

/** A typed r² (distance squared from the centre to a point on the circle). */
export function judgeR2(model, text) {
  const r = typedNumber(text);
  if (r && isInt(r) && r.n === model.r2) return { ok: true };
  let why = 'r² is (difference in x)² + (difference in y)², from the centre to a point on the circle.';
  if (r && isInt(r)) {
    if (model.root && model.root.inside === 1 && r.n === model.root.out) why = 'That is r. This box wants r², the distance squared — it is what goes on the right of the equation.';
    else if (model.kind === 'diameter' && r.n === 4 * model.r2) why = 'That is the whole diameter squared. Measure from the CENTRE to one end.';
  }
  return { ok: false, why };
}

// ------------------------------------------------------------------ working

/** The legs of the right-angled triangle from the centre to a point. */
export function legs(centre, point) {
  return { dx: sub(F(point[0]), centre[0]), dy: sub(F(point[1]), centre[1]) };
}

/**
 * The finished working for "Copy this into your book". A line is either a
 * KaTeX string, or `{ text, tex? }` — a sentence in ordinary type (which can
 * wrap; KaTeX text cannot) with an optional piece of maths after it.
 */
export function workingLatex(item, model) {
  const lines = [];
  const C = pairTex(model.centre);
  if (model.mode === 'plot') {
    lines.push(model.questionLatex);
    if (item.scale) lines.push(`\\text{Divide by } ${item.scale}:\\quad ${completedLatex(model.centre, model.r2)}`);
    lines.push(`\\text{Centre } ${C}`);
    lines.push(model.rIsInt ? `r = \\sqrt{${model.r2}} = ${radiusLatex(model.r2)}`
      : model.root.out === 1 ? `r = \\sqrt{${model.r2}}` : `r = \\sqrt{${model.r2}} = ${radiusLatex(model.r2)}`);
    if (item.axes) {
      for (const ax of ['x', 'y']) {
        const info = model.axes[ax];
        if (info.kind === 'miss') lines.push({ text: `It does not reach the ${ax}-axis.` });
        else if (info.kind === 'touch') lines.push({ text: `It touches the ${ax}-axis at`, tex: info.points[0].tex });
        else lines.push({ text: `It crosses the ${ax}-axis at`, tex: `${info.points[0].tex} \\text{ and } ${info.points[1].tex}` });
      }
    }
    return lines;
  }
  if (model.mode === 'eq') {
    if (model.kind === 'diameter') {
      const A = pt(item.A);
      const B = pt(item.B);
      lines.push(`\\text{Centre = midpoint of } AB = \\left(\\dfrac{${frTex(A[0])} + ${frTex(B[0])}}{2},\\ \\dfrac{${frTex(A[1])} + ${frTex(B[1])}}{2}\\right) = ${C}`.replace(/\+ -/g, '- '));
      const { dx, dy } = legs(model.centre, item.A);
      lines.push(`r^2 = (${frTex(dx)})^2 + (${frTex(dy)})^2 = ${model.r2}`);
    } else if (model.kind === 'through') {
      const { dx, dy } = legs(model.centre, item.point);
      lines.push(`r^2 = (${frTex(dx)})^2 + (${frTex(dy)})^2 = ${model.r2}`);
    } else if (model.kind === 'touch') {
      lines.push({ text: `The radius is the distance from the centre to the ${item.axis}-axis:`, tex: `r = ${radiusLatex(model.r2)}` });
      lines.push(`r^2 = ${model.r2}`);
    } else {
      lines.push(`r = ${radiusLatex(model.r2)} \\ \\Rightarrow\\ r^2 = ${model.r2}`);
    }
    lines.push(model.answerLatex);
    return lines;
  }
  // square
  lines.push(model.questionLatex);
  if (model.k !== 1) lines.push(`\\text{Divide by } ${model.k}:\\quad ${model.dividedLatex}`);
  const part = (v, h, h2) => (isZero(h) ? `${v}^2` : `${bracketLatex(v, neg(h))} - ${frTex(h2)}`);
  const cTerm = isZero(model.c) ? '' : ` ${model.c.n < 0 ? '-' : '+'} ${frTex(fr(Math.abs(model.c.n), model.c.d))}`;
  lines.push(`${part('x', model.p, model.p2)} + ${part('y', model.q, model.q2)}${cTerm} = 0`);
  lines.push(model.answerLatex);
  if (model.isCircle) {
    lines.push(`\\text{Centre } ${C},\\quad r = \\sqrt{${model.r2}}${model.root.inside === 1 || model.root.out !== 1 ? ` = ${radiusLatex(model.r2)}` : ''}`);
  } else {
    lines.push({ text: model.r2 === 0
      ? 'Two squares add up to 0 only when both are 0. That is a single point, not a circle.'
      : 'A sum of two squares cannot be negative. No point satisfies the equation, so it is not a circle.' });
  }
  return lines;
}

/** One point on the circle substituted back, as a KaTeX check line. */
export function checkLineLatex(model) {
  if (!model.isCircle) return null;
  const pts = revealPoints(model.centre, model.r2);
  const lattice = latticeOn(model.centre, model.r2);
  if (lattice.length) {
    const [a, b] = numPt(model.centre);
    const slanted = lattice.find((p) => p[0] !== a && p[1] !== b) || lattice[0];
    const dx = slanted[0] - a;
    const dy = slanted[1] - b;
    return `(${slanted[0]}, ${slanted[1]}):\\quad (${dx})^2 + (${dy})^2 = ${dx * dx} + ${dy * dy} = ${model.r2}\\ \\checkmark`;
  }
  return `${pts[0].tex}:\\quad \\left(${radiusLatex(model.r2)}\\right)^2 + 0^2 = ${model.r2}\\ \\checkmark`;
}

// ------------------------------------------------------------------ validation

const inGrid = (g, x, y) => x >= g.xMin && x <= g.xMax && y >= g.yMin && y <= g.yMax;

/** Problems with a pool of items for one mode, as strings. Empty when all is well. */
export function checkCircleItems(items, mode) {
  const out = [];
  if (!CIRCLE_MODES.includes(mode)) return [`unknown circle mode "${mode}"`];
  const seen = new Set();
  let lastLevel = -Infinity;
  for (const item of items || []) {
    const at = `item ${item?.id ?? '?'}`;
    if (!item?.id) { out.push('an item has no id'); continue; }
    if (seen.has(item.id)) out.push(`${at}: duplicate id`);
    seen.add(item.id);
    if (item.level !== undefined) {
      if (item.level < lastLevel) out.push(`${at}: level ${item.level} comes after level ${lastLevel} — levels only climb`);
      lastLevel = item.level;
    }
    let model;
    try {
      if (mode === 'plot') {
        if (!Array.isArray(item.centre) || item.centre.length !== 2) { out.push(`${at}: needs centre: [a, b]`); continue; }
        if (!Number.isInteger(item.r2) || item.r2 <= 0) { out.push(`${at}: r2 must be a positive whole number`); continue; }
        if (item.scale !== undefined) {
          if (!Number.isInteger(item.scale) || item.scale < 2) out.push(`${at}: scale must be a whole number of 2 or more`);
          if (Number(item.centre[0]) !== 0 || Number(item.centre[1]) !== 0) out.push(`${at}: scale is only for a circle centred at the origin`);
        }
        model = plotModel(item);
        if (!model.clickCentre || !isInt(model.centre[0]) || !isInt(model.centre[1])) out.push(`${at}: the centre must be a whole-number point, because it is clicked`);
      } else if (mode === 'eq') {
        if (!EQ_KINDS.includes(item.kind)) { out.push(`${at}: kind "${item.kind}" — ${EQ_KINDS.join(', ')}`); continue; }
        if (item.kind === 'radius' && (!Number.isInteger(item.r2) || item.r2 <= 0)) { out.push(`${at}: r2 must be a positive whole number`); continue; }
        if (item.kind === 'touch' && !['x', 'y'].includes(item.axis)) { out.push(`${at}: axis must be 'x' or 'y'`); continue; }
        model = eqModel(item);
        if (!Number.isInteger(model.r2) || model.r2 <= 0) out.push(`${at}: r² comes out as ${model.r2} — it must be a positive whole number`);
        if (item.kind === 'diameter' && !model.clickCentre) out.push(`${at}: the midpoint of AB is not a whole-number point, so the centre cannot be clicked`);
        if (item.kind !== 'radius' && !model.clickCentre) out.push(`${at}: only a "radius" item may have a fractional centre`);
      } else {
        if (!Array.isArray(item.coef) || item.coef.length !== 4 || !item.coef.every(Number.isInteger)) { out.push(`${at}: needs coef: [k, D, E, F] whole numbers`); continue; }
        if (item.coef[0] < 1) { out.push(`${at}: k must be a positive whole number`); continue; }
        if (item.coef[1] === 0 && item.coef[2] === 0) { out.push(`${at}: no x or y term — there is no square to complete`); continue; }
        model = squareModel(item);
        if (model.d.d > 1 || model.e.d > 1) out.push(`${at}: dividing by ${model.k} leaves a fractional x or y coefficient`);
        if (model.centre[0].d > 2 || model.centre[1].d > 2) out.push(`${at}: the centre is not at whole or half numbers`);
        if (!Number.isInteger(model.r2)) out.push(`${at}: r² comes out as ${frText(model.r2f)}, not a whole number`);
        if (!model.isCircle && !item.notCircle) out.push(`${at}: r² = ${model.r2}, so this is not a circle — add notCircle: true if that is the point`);
        if (model.isCircle && item.notCircle) out.push(`${at}: marked notCircle, but r² = ${model.r2} is positive`);
      }
    } catch (err) {
      out.push(`${at}: ${err.message}`);
      continue;
    }
    if (model.isCircle && Number.isInteger(model.r2) && model.r2 > 0) {
      const g = gridOf(item);
      const [a, b] = numPt(model.centre);
      const r = Math.sqrt(model.r2);
      if (!inGrid(g, a - r, b - r) || !inGrid(g, a + r, b + r)) out.push(`${at}: the circle does not fit on the grid ${g.xMin}..${g.xMax} × ${g.yMin}..${g.yMax}`);
      if (model.clickCentre && !inGrid(g, -a, -b)) out.push(`${at}: the sign-flipped centre (${-a}, ${-b}) is off the grid, so that mistake could not be clicked`);
    }
    if (mode === 'eq') for (const p of model.given) if (!inGrid(gridOf(item), p.at[0], p.at[1])) out.push(`${at}: the point ${p.name} is off the grid`);
  }
  return out;
}
