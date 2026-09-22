// src/utils/inequalities.js
//
// Linear inequalities and regions — the pure parts behind the Inequalities
// task (src/tasks/Inequalities.jsx) and the EM_07A region widget.
//
// THE RULE (same as surds.js, simultaneous.js, triangles.js): an item stores
// the QUESTION and everything else is derived here — the collected form, the
// solution and whether the sign turns round, the split of a double
// inequality, the integers that fit, the number line, and for a region every
// boundary line's equation, whether it is solid or dashed, which side the
// region is on and the inequality that says so. `checkInequalityItems`
// refuses an item the screen could not finish.
//
// ITEM KINDS
//   solve   { ineq: '9x - 4 >= 5x + 8', line?: true, integers?: { from, to } }
//   double  { ineq: '14 - 3n < 4n <= 20 + n', integers?: true }
//           — the letter in the outer parts too: SPLIT it into two; the letter
//             only in the middle: do the same to all THREE parts
//   read    { set: '-2 < x <= 1', min, max } — a number line to write down
//   region  { lines: [{ eq: 'x = 2', dashed?: true, label?: false }, …],
//             point: [3, 2], grid: { xMin, xMax, yMin, yMax } }
//           — `point` is any point inside R; each line's inequality is the
//             side of the line that point is on. A line with `label: false`
//             is not printed, so its equation must be read off the graph
//             (Assignment 07 Q9) and is authored as x = k, y = k or y = mx + c.

import { parseEquation, parseSide, variableOf, fr, sub, div, neg, isZero, flipRel } from './linearEquation.js';
import { parseStatement, linearValue, sideLatex, frLatex } from './simultaneous.js';
import { parseInequality, sameSet, interval, intersect, normalize, NEG_INF, POS_INF, contains } from './interval.js';
import { regionPolygon, polygonArea } from './lines.js';

export const REL_LATEX = { '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge' };
export const REL_TEXT = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };
export const RELS = ['<', '<=', '>', '>='];
const strict = (rel) => rel === '<' || rel === '>';
const num = (f) => f.n / f.d;

/** An authored inequality as KaTeX: "18 - 2n < 6n \le 30 + n". */
export function ineqLatex(src) {
  return String(src).replace(/<=|≤/g, ' \\le ').replace(/>=|≥/g, ' \\ge ').replace(/\*/g, ' \\times ')
    .replace(/\(([^()]+)\)\/(\d+)/g, '\\dfrac{$1}{$2}').replace(/\s+/g, ' ').trim();
}

/** The set of numbers v with v rel value. */
export function raySet(rel, value) {
  const n = typeof value === 'number' ? value : num(value);
  if (rel === '>') return [interval(n, POS_INF, true)];
  if (rel === '>=') return [interval(n, POS_INF, false)];
  if (rel === '<') return [interval(NEG_INF, n, true, true)];
  return [interval(NEG_INF, n, true, false)];
}

/** a·v rel b, solved for v: dividing by a negative turns the sign round. */
export function solveLinear(a, rel, b) {
  if (isZero(a)) return null;
  return { rel: a.n < 0 ? flipRel(rel) : rel, value: div(b, a), flipped: a.n < 0 };
}

/** The set a·v rel b describes, or null when a = 0. */
export function setOfCollected(a, rel, b) {
  const s = solveLinear(a, rel, b);
  return s ? raySet(s.rel, s.value) : null;
}

/** A typed number: "3", "-2", "20/3", "6.67". Null when it is not one. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(/[−–]/g, '-');
  if (!t) return null;
  const m = t.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (m) return Number(m[2]) === 0 ? null : fr(Number(m[1]), Number(m[2]));
  if (/^-?\d*\.?\d+$/.test(t)) return fr(Number(t));
  return null;
}

/** Close enough to a fraction: exact, or a decimal right to 2 d.p. */
export function nearValue(typed, want) {
  if (!typed) return false;
  if (typed.n === want.n && typed.d === want.d) return true;
  return want.d !== 1 && Math.abs(num(typed) - num(want)) < 0.006;
}

// ------------------------------------------------------------------ one inequality

/**
 * "9x - 4 >= 5x + 8": collect the letters on the side with MORE of them (so
 * their number stays positive and nothing turns round), then divide.
 */
export function deriveSolve(src) {
  const eq = parseEquation(src);
  if (eq.rel === '=') throw new Error(`"${src}" is an equation, not an inequality`);
  const dx = sub(eq.left.x, eq.right.x);
  if (isZero(dx)) throw new Error(`"${src}": the letters cancel`);
  const lettersRight = dx.n < 0;
  const a = lettersRight ? neg(dx) : dx;
  const rel = lettersRight ? flipRel(eq.rel) : eq.rel;
  const b = lettersRight ? sub(eq.left.c, eq.right.c) : sub(eq.right.c, eq.left.c);
  const sol = solveLinear(a, rel, b);
  return { src, v: eq.v, eq, collected: { a, rel, b }, lettersRight, sol, set: raySet(sol.rel, sol.value) };
}

/** Whole numbers in a bounded set. */
export function integersIn(set) {
  const s = normalize(set);
  if (!s.length || s.some((iv) => !Number.isFinite(iv.lo) || !Number.isFinite(iv.hi))) return null;
  const out = [];
  for (const iv of s) for (let n = Math.ceil(iv.lo); n <= Math.floor(iv.hi); n += 1) if (contains([iv], n)) out.push(n);
  return out;
}

// ------------------------------------------------------------------ double inequalities

export function deriveDouble(src) {
  const text = String(src).replace(/≤/g, '<=').replace(/≥/g, '>=');
  const bits = text.split(/(<=|>=|<|>)/).map((s) => s.trim());
  if (bits.length !== 5) throw new Error(`"${src}" is not a double inequality`);
  const [p0, r1, p1, r2, p2] = bits;
  const up = (r) => r === '<' || r === '<=';
  if (up(r1) !== up(r2)) throw new Error(`"${src}": both signs must point the same way`);
  const v = variableOf(text) || 'x';
  const P = [p0, p1, p2].map((s) => parseSide(s, v));
  const outer = !isZero(P[0].x) || !isZero(P[2].x);
  if (!outer) {
    // The letter only in the middle: the same move on all three parts.
    const a = P[1].x;
    const c = P[1].c;
    if (a.n < 0) throw new Error(`"${src}": keep the middle's number positive`);
    const lo = sub(P[0].c, c);
    const hi = sub(P[2].c, c);
    const final = { lo: div(lo, a), hi: div(hi, a), r1, r2 };
    const set = intersect(raySet(flipRel(r1), final.lo), raySet(r2, final.hi));
    return { src, v, method: 'three', parts: [p0, p1, p2], rels: [r1, r2], a, c, sub3: { lo, hi }, final, set };
  }
  const left = deriveSolve(`${p0} ${r1} ${p1}`);
  const right = deriveSolve(`${p1} ${r2} ${p2}`);
  const set = intersect(left.set, right.set);
  const s = normalize(set);
  if (s.length !== 1 || !Number.isFinite(s[0].lo) || !Number.isFinite(s[0].hi)) throw new Error(`"${src}": the two halves do not make one bounded interval`);
  const final = { lo: fr(0), hi: fr(0), r1: s[0].loOpen ? '<' : '<=', r2: s[0].hiOpen ? '<' : '<=' };
  // The ends as exact fractions, taken from whichever half gives each end.
  for (const half of [left, right]) {
    const val = half.sol.value;
    if (Math.abs(num(val) - s[0].lo) < 1e-9) final.lo = val;
    if (Math.abs(num(val) - s[0].hi) < 1e-9) final.hi = val;
  }
  return { src, v, method: 'split', parts: [p0, p1, p2], rels: [r1, r2], left, right, final, set };
}

/** The options for the first move on a double inequality. */
export function doubleStartOptions(d) {
  const [p0, p1, p2] = d.parts.map(ineqLatex);
  const [r1, r2] = d.rels.map((r) => REL_LATEX[r]);
  return [
    { id: 'outer', latex: `${p0} ${r1} ${p2}`, correct: false, why: 'The two outside parts leave out the middle — the part that holds the question.' },
    { id: 'split', latex: `${p0} ${r1} ${p1} \\;\\text{ and }\\; ${p1} ${r2} ${p2}`, correct: true, why: 'Right — the letter is in more than one part, so no single move can get it alone in the middle. Split it into two inequalities and solve each.' },
    { id: 'all', latex: `\\text{do the same to all three parts}`, correct: false, why: 'That works only when the letter is in the middle part alone. Here it is in the outside parts too.' },
    { id: 'one', latex: `${p1} ${r2} ${p2} \\;\\text{ only}`, correct: false, why: 'That is only half of it: the left-hand part still has to be true as well.' },
  ];
}

// ------------------------------------------------------------------ number lines

/** The picture of a set on a number line: endpoints and shaded regions. */
export function readModel(item) {
  const set = parseInequality(item.set);
  const s = normalize(set);
  if (s.length !== 1) throw new Error(`"${item.set}" must be one piece`);
  const iv = s[0];
  const v = (String(item.set).match(/[a-zA-Z]/) || ['x'])[0];
  const twoSided = Number.isFinite(iv.lo) && Number.isFinite(iv.hi);
  return { v, set, iv, twoSided };
}

// ------------------------------------------------------------------ regions

/** One boundary line: its equation, its side of the region and how to write it. */
function deriveLine(ln, point) {
  const [l, r] = parseStatement(ln.eq);
  const L = linearValue(l);
  const R = linearValue(r);
  const val = (o, k) => (o[k] ? num(o[k]) : 0);
  // Exact first (a gradient of 1/3 must stay 1/3), numbers for the geometry.
  const aF = sub(L.x || fr(0), R.x || fr(0));
  const bF = sub(L.y || fr(0), R.y || fr(0));
  const cF = sub(R.c, L.c);
  const a = num(aF);
  const b = num(bF);
  const c = num(cF);
  if (!a && !b) throw new Error(`"${ln.eq}" is not a line`);
  const s = a * point[0] + b * point[1] - c;
  if (Math.abs(s) < 1e-9) throw new Error(`the point (${point}) is ON the line ${ln.eq}`);
  const dashed = !!ln.dashed;
  const rel = s > 0 ? (dashed ? '>' : '>=') : (dashed ? '<' : '<=');
  const written = `${sideLatex(l)} ${REL_LATEX[rel]} ${sideLatex(r)}`;
  // The form the line is READ in off a graph: x = k, y = k, or y = mx + c.
  let shape;
  if (!b) shape = { kind: 'vertical', k: div(cF, aF) };
  else if (!a) shape = { kind: 'horizontal', k: div(cF, bF) };
  else shape = { kind: 'sloped', m: neg(div(aF, bF)), k: div(cF, bF) };
  const readRel = (() => {
    if (shape.kind === 'vertical') return point[0] > num(shape.k) ? (dashed ? '>' : '>=') : (dashed ? '<' : '<=');
    if (shape.kind === 'horizontal') return point[1] > num(shape.k) ? (dashed ? '>' : '>=') : (dashed ? '<' : '<=');
    const yLine = num(shape.m) * point[0] + num(shape.k);
    return point[1] > yLine ? (dashed ? '>' : '>=') : (dashed ? '<' : '<=');
  })();
  const readSide = shape.kind === 'vertical' ? 'x' : 'y';
  const readRhs = shape.kind === 'sloped' ? slopedRhs(shape.m, shape.k) : frLatex(shape.k);
  return {
    eq: ln.eq, dashed, labelled: ln.label !== false, labelAt: ln.labelAt, a, b, c, rel,
    lhs: sideLatex(l), rhs: sideLatex(r), written,
    eqLatex: `${sideLatex(l)} = ${sideLatex(r)}`,
    shape, readRel, readSide, readRhs,
    readLatex: `${readSide} = ${readRhs}`,
    readWritten: `${readSide} ${REL_LATEX[readRel]} ${readRhs}`,
    half: { a, b, c, rel },
    // Each written side's value at any point — the test-a-point method.
    at: (x, y) => ({ lhs: num(L.c) + val(L, 'x') * x + val(L, 'y') * y, rhs: num(R.c) + val(R, 'x') * x + val(R, 'y') * y }),
  };
}

/** "2x + 1", "-\dfrac{1}{2}x + 4", "x". */
export function slopedRhs(m, k) {
  const mt = m.d === 1 ? (m.n === 1 ? '' : m.n === -1 ? '-' : `${m.n}`) : `${m.n < 0 ? '-' : ''}\\dfrac{${Math.abs(m.n)}}{${m.d}}`;
  const kt = isZero(k) ? '' : ` ${k.n < 0 ? '-' : '+'} ${frLatex(fr(Math.abs(k.n), k.d))}`;
  return `${mt}x${kt}`;
}

export function deriveRegion(item) {
  if (!Array.isArray(item.point) || item.point.length !== 2) throw new Error('a region needs a point inside it');
  const lines = (item.lines || []).map((ln) => deriveLine(ln, item.point));
  const grid = item.grid;
  const poly = regionPolygon(grid, lines.map((l) => l.half));
  return { lines, grid, poly, point: item.point };
}

// ------------------------------------------------------------------ the model

export function deriveInequalityItem(item) {
  if (item.kind === 'solve') {
    const s = deriveSolve(item.ineq);
    return { kind: 'solve', ...s, integers: item.integers ? integersIn(intersect(s.set, [interval(item.integers.from, item.integers.to, false, false)])) : null };
  }
  if (item.kind === 'double') {
    const d = deriveDouble(item.ineq);
    return { kind: 'double', ...d, integers: item.integers ? integersIn(d.set) : null };
  }
  if (item.kind === 'read') return { kind: 'read', ...readModel(item) };
  if (item.kind === 'region') return { kind: 'region', ...deriveRegion(item) };
  throw new Error(`kind must be solve, double, read or region (got ${item.kind})`);
}

// ------------------------------------------------------------------ validation

/** Problems with a list of Inequalities items, as strings. Empty when sound. */
export function checkInequalityItems(items) {
  const out = [];
  const ids = new Set();
  for (const [i, item] of (items || []).entries()) {
    const at = `item ${item?.id || i + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    let m;
    try { m = deriveInequalityItem(item); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    if (m.kind === 'solve') {
      if (item.line) {
        const v = m.sol.value;
        if (v.d !== 1) out.push(`${at}: a number line needs a whole-number end (got ${v.n}/${v.d})`);
        const min = item.min ?? v.n - 4;
        const max = item.max ?? v.n + 4;
        if (v.d === 1 && (v.n <= min || v.n >= max)) out.push(`${at}: the end ${v.n} is off the number line`);
      }
      if (item.integers && (!m.integers || !m.integers.length)) out.push(`${at}: no whole numbers fit`);
    }
    if (m.kind === 'double') {
      if (item.integers) {
        if (!m.integers || !m.integers.length) out.push(`${at}: no whole numbers fit`);
        else if (m.integers.length > 10) out.push(`${at}: ${m.integers.length} whole numbers is too many to tap`);
      }
      if (m.method === 'three' && (m.final.lo.d !== 1 || m.final.hi.d !== 1) && item.integers) { /* fractions are fine: the integers are still whole */ }
    }
    if (m.kind === 'read') {
      const { iv } = m;
      for (const end of [iv.lo, iv.hi]) {
        if (!Number.isFinite(end)) continue;
        if (!Number.isInteger(end)) out.push(`${at}: the end ${end} is not on a tick`);
        if (end <= (item.min ?? -8) || end >= (item.max ?? 8)) out.push(`${at}: the end ${end} is off the line`);
      }
    }
    if (m.kind === 'region') {
      const g = item.grid;
      if (!g || ![g.xMin, g.xMax, g.yMin, g.yMax].every(Number.isInteger) || g.xMin >= g.xMax || g.yMin >= g.yMax) { out.push(`${at}: grid needs whole-number xMin < xMax, yMin < yMax`); continue; }
      if (m.lines.length < 2 || m.lines.length > 4) out.push(`${at}: a region needs 2 to 4 lines`);
      if (polygonArea(m.poly) < 0.5) out.push(`${at}: the region is empty (or too thin to see)`);
      // Every corner of R must be a meeting of lines, not the edge of the grid.
      for (const [x, y] of m.poly) {
        const onLine = m.lines.some((l) => Math.abs(l.a * x + l.b * y - l.c) < 1e-6);
        if (!onLine) out.push(`${at}: the region runs off the grid near (${x.toFixed(1)}, ${y.toFixed(1)}) — enlarge the grid or add a line`);
      }
      for (const l of m.lines) {
        if (l.labelled) continue;
        const sh = l.shape;
        const nice = (f) => f.d <= 4 && Math.abs(f.n) <= 40;
        if (sh.kind === 'sloped') {
          if (!nice(sh.m) || !nice(sh.k)) out.push(`${at}: ${l.eq} has a gradient or intercept too awkward to read`);
          if (num(sh.k) < g.yMin || num(sh.k) > g.yMax || g.xMin > 0 || g.xMax < 0) out.push(`${at}: ${l.eq} must cross the y-axis on the grid to be read`);
        } else if (sh.k.d !== 1) out.push(`${at}: ${l.eq} is not on a grid line`);
        const eqNorm = l.eq.replace(/\s+/g, '');
        if (!/^[xy]=/.test(eqNorm)) out.push(`${at}: an unlabelled line is authored as x = k, y = k or y = mx + c (got ${l.eq})`);
      }
    }
  }
  return out;
}

export { sameSet, intersect, normalize, interval, NEG_INF, POS_INF, contains, strict };
