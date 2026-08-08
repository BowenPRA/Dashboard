// src/utils/linearEquation.js
//
// The model behind the Balance task: a linear equation in one variable, and the
// legal moves you can make on it. Deliberately separate from the component so
// the maths can be tested on its own and reused by any later task.
//
// A side is `a·x + b`, stored as two exact fractions. Exact, not floating point:
// dividing 15 by 4 has to stay 15/4 and print as a fraction, or a student who
// divides too early sees 3.75 and thinks they broke it.
//
// Everything here is pure — every operation returns a NEW equation, which is
// what makes undo and the step history trivial.

// ------------------------------------------------------------------ fractions

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

/** Exact rational. Always normalised: denominator > 0, reduced to lowest terms. */
export function fr(n, d = 1) {
  if (d === 0) throw new Error('division by zero');
  if (!Number.isInteger(n) || !Number.isInteger(d)) {
    // Accept a decimal by scaling it up: 1.5 -> 3/2.
    const scale = 10 ** Math.max(decimals(n), decimals(d));
    n = Math.round(n * scale); d = Math.round(d * scale);
  }
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  return { n: n / g, d: d / g };
}
const decimals = (v) => (String(v).split('.')[1] || '').length;

export const isZero = (f) => f.n === 0;
export const isOne = (f) => f.n === 1 && f.d === 1;
export const isNeg = (f) => f.n < 0;
export const toNumber = (f) => f.n / f.d;
export const frEq = (a, b) => a.n === b.n && a.d === b.d;

export const add = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a, b) => fr(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a, b) => fr(a.n * b.n, a.d * b.d);
export const div = (a, b) => {
  if (isZero(b)) throw new Error('division by zero');
  return fr(a.n * b.d, a.d * b.n);
};
export const neg = (a) => fr(-a.n, a.d);

/** "3", "-3", "3/4". */
export const frText = (f) => (f.d === 1 ? String(f.n) : `${f.n}/${f.d}`);

// ------------------------------------------------------------------ sides

/** A side of the equation: `x` is the coefficient of x, `c` the constant. */
export const side = (x, c) => ({ x, c });
export const sideEq = (a, b) => frEq(a.x, b.x) && frEq(a.c, b.c);

/**
 * Render a side the way it would be written: "3x + 7", "x", "-x/2", "22".
 * `v` is the variable's letter — GED problems use h for hours, m for miles.
 */
export function sideText(s, v = 'x') {
  const parts = [];
  if (!isZero(s.x)) {
    const co = s.x;
    let t;
    if (isOne(co)) t = v;
    else if (co.n === -1 && co.d === 1) t = `-${v}`;
    else if (co.d === 1) t = `${co.n}${v}`;
    else if (co.n === 1) t = `${v}/${co.d}`;      // 1/2 is "x/2", never "1x/2"
    else if (co.n === -1) t = `-${v}/${co.d}`;
    else t = `${co.n}${v}/${co.d}`;
    parts.push(t);
  }
  if (!isZero(s.c) || parts.length === 0) {
    const c = s.c;
    if (parts.length === 0) parts.push(frText(c));
    else parts.push(isNeg(c) ? `- ${frText(neg(c))}` : `+ ${frText(c)}`);
  }
  return parts.join(' ');
}

// ------------------------------------------------------------------ parsing

/** The single variable letter used in a string, or null if it has none. */
export function variableOf(src) {
  const letters = [...new Set(String(src).match(/[a-zA-Z]/g) || [])];
  if (letters.length > 1) throw new Error(`more than one variable: ${letters.join(', ')}`);
  return letters[0] || null;
}

/**
 * Parse a linear side: "3x + 7", "22", "-x", "2x/3 - 1".
 * Authoring stays readable; the structure stays exact.
 */
export function parseSide(src, v = 'x') {
  const s = String(src).replace(/\s+/g, '').replace(/[−–—]/g, '-');
  if (!s) throw new Error('empty side');
  // Split into signed terms: "3x+7" -> ["+3x", "+7"]
  const terms = s.replace(/-/g, '+-').split('+').filter(Boolean);
  const re = new RegExp(`^(-?)(\\d*)(?:/(\\d+))?(${v}?)(?:/(\\d+))?$`);
  let x = fr(0), c = fr(0);
  for (const term of terms) {
    const m = term.match(re);
    if (!m) throw new Error(`cannot parse term "${term}"`);
    const [, sign, numRaw, den1, isVar, den2] = m;
    if (numRaw === '' && !isVar) throw new Error(`cannot parse term "${term}"`);
    const num = numRaw === '' ? 1 : parseInt(numRaw, 10);
    const den = parseInt(den1 || den2 || '1', 10);
    let value = fr(num, den);
    if (sign === '-') value = neg(value);
    if (isVar) x = add(x, value); else c = add(c, value);
  }
  return side(x, c);
}

/**
 * Parse a whole equation from "3x + 7 = 22" or "6y = -42".
 * The variable's letter is carried on the equation so everything downstream
 * renders it back the way the author wrote it.
 */
export function parseEquation(src) {
  const [l, r] = String(src).split('=');
  if (r === undefined) throw new Error('an equation needs an "="');
  const v = variableOf(src) || 'x';
  return { left: parseSide(l, v), right: parseSide(r, v), v };
}

export const equationText = (eq) =>
  `${sideText(eq.left, eq.v)} = ${sideText(eq.right, eq.v)}`;

// ------------------------------------------------------------------ moves

/**
 * A move applied to BOTH sides. `kind` is add/sub/mul/div, `amount` a fraction,
 * and `onX` marks "…of x" — subtracting 2x is how a variable on both sides gets
 * collected, and it is the same legal move as subtracting 2.
 */
export function applyMove(eq, move) {
  const { kind, amount, onX = false } = move;
  const apply = (s) => {
    switch (kind) {
      case 'add': return onX ? side(add(s.x, amount), s.c) : side(s.x, add(s.c, amount));
      case 'sub': return onX ? side(sub(s.x, amount), s.c) : side(s.x, sub(s.c, amount));
      case 'mul': return side(mul(s.x, amount), mul(s.c, amount));
      case 'div': return side(div(s.x, amount), div(s.c, amount));
      default: throw new Error(`unknown move ${kind}`);
    }
  };
  if ((kind === 'div' && isZero(amount)) || (kind === 'mul' && isZero(amount))) {
    // Multiplying by zero is "legal" but destroys the equation — never allow it.
    throw new Error('that would multiply or divide by zero');
  }
  return { ...eq, left: apply(eq.left), right: apply(eq.right) };
}

/** How the move is written under each side: "- 7", "÷ 3", "+ 2x". */
export function moveText(move, v = 'x') {
  const sym = { add: '+', sub: '−', mul: '×', div: '÷' }[move.kind];
  return `${sym} ${frText(move.amount)}${move.onX ? v : ''}`;
}

/** Solved when one side is exactly `x` and the other holds no x. */
export function isSolved(eq) {
  const bare = (s) => isOne(s.x) && isZero(s.c);
  const value = (s) => isZero(s.x);
  return (bare(eq.left) && value(eq.right)) || (bare(eq.right) && value(eq.left));
}

/** The solution value once solved, as a fraction. */
export const solutionOf = (eq) => (isOne(eq.left.x) ? eq.right.c : eq.left.c);

/**
 * True when the equation still says the same thing — a guard that the move
 * engine never silently changes the answer. Used by the tests and by authoring
 * validation, not on the hot path.
 */
export function sameSolution(a, b) {
  const solve = (eq) => {
    const x = sub(eq.left.x, eq.right.x);
    const c = sub(eq.right.c, eq.left.c);
    return isZero(x) ? null : div(c, x);
  };
  const sa = solve(a), sb = solve(b);
  if (!sa || !sb) return sa === sb;
  return frEq(sa, sb);
}

/**
 * The move that most obviously advances the equation — used for the hint and to
 * compute a par step count. Strategy is the one taught: clear the constant on
 * the variable's side, collect x if it appears on both sides, then divide.
 */
export function suggestMove(eq) {
  const { left, right } = eq;
  // 1. x on both sides -> remove the smaller coefficient
  if (!isZero(left.x) && !isZero(right.x)) {
    const smaller = toNumber(left.x) <= toNumber(right.x) ? left.x : right.x;
    return { kind: 'sub', amount: smaller, onX: true };
  }
  // 2. constant sitting beside the x -> clear it
  const varSide = isZero(left.x) ? right : left;
  if (!isZero(varSide.c)) {
    return isNeg(varSide.c)
      ? { kind: 'add', amount: neg(varSide.c) }
      : { kind: 'sub', amount: varSide.c };
  }
  // 3. bare coefficient -> divide it out
  if (!isOne(varSide.x)) return { kind: 'div', amount: varSide.x };
  return null;
}

/** Fewest moves the suggested strategy needs — the "par" shown to the student. */
export function parSteps(eq, limit = 12) {
  let cur = eq, n = 0;
  while (!isSolved(cur) && n < limit) {
    const m = suggestMove(cur);
    if (!m) break;
    cur = applyMove(cur, m);
    n++;
  }
  return n;
}
