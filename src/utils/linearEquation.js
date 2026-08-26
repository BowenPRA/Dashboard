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

const lcm = (a, b) => Math.abs(a * b) / (gcd(a, b) || 1);

/**
 * The number that clears every denominator in the equation at once — the LCM of
 * all four denominators, and 1 when there is nothing to clear.
 *
 * Multiplying both sides by it is the taught first move on a fraction equation,
 * so the hint, the par count and the number row all read it from here rather
 * than each working it out their own way.
 */
export const lcdOf = (eq) =>
  [eq.left.x.d, eq.left.c.d, eq.right.x.d, eq.right.c.d].reduce(lcm, 1);

// ------------------------------------------------------------------ sides

/** A side of the equation: `x` is the coefficient of x, `c` the constant. */
export const side = (x, c) => ({ x, c });
export const sideEq = (a, b) => frEq(a.x, b.x) && frEq(a.c, b.c);

/**
 * The one fraction shape this course cares about: a whole side written over a
 * single denominator, `(ax + b)/d`.
 *
 * It is DERIVED, never stored. A side holding x/2 and -3/2 *is* (x - 3)/2, so
 * asking the numbers is enough — which means the display can never drift from
 * the model, and a side that stops having that shape (multiply both sides by 2
 * and it becomes x - 3) simply stops being drawn that way.
 */
export function groupedOf(s) {
  if (isZero(s.x) || isZero(s.c)) return null;   // one term needs no bracket
  // BOTH terms must be genuine fractions. "x/2 + 3" is written exactly like
  // that, never as the equal-but-unrecognisable "(x + 6)/2" — a whole number
  // sitting beside the fraction is the tell that the side is not one quotient.
  if (s.x.d === 1 || s.c.d === 1) return null;
  const d = lcm(s.x.d, s.c.d);                   // (2x - 1)/4 arrives as 1/2 and -1/4
  return { d, num: side(fr(s.x.n * (d / s.x.d)), fr(s.c.n * (d / s.c.d))) };
}

/** How a coefficient is written in front of the letter: "3x", "x", "-x/2". */
export function coefText(co, v = 'x') {
  if (isOne(co)) return v;
  if (co.n === -1 && co.d === 1) return `-${v}`;
  if (co.d === 1) return `${co.n}${v}`;
  if (co.n === 1) return `${v}/${co.d}`;          // 1/2 is "x/2", never "1x/2"
  if (co.n === -1) return `-${v}/${co.d}`;
  return `${co.n}${v}/${co.d}`;
}

/**
 * Render a side the way it would be written: "3x + 7", "x", "-x/2", "22",
 * "(x - 3)/2".
 * `v` is the variable's letter — GED problems use h for hours, m for miles.
 */
export function sideText(s, v = 'x') {
  const g = groupedOf(s);
  if (g) return `(${sideText(g.num, v)})/${g.d}`;
  const parts = [];
  if (!isZero(s.x)) parts.push(coefText(s.x, v));
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
 * Split a side into its top-level signed terms, leaving anything inside
 * brackets alone: "(x-3)/2+4" -> ["(x-3)/2", "+4"]. The naive
 * `replace('-', '+-').split('+')` cannot do this — it tears "(x-3)" in half.
 */
function splitTerms(s) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if ((ch === '+' || ch === '-') && depth === 0 && i > start && !'+-'.includes(s[i - 1])) {
      out.push(s.slice(start, i));
      start = i;
    }
  }
  out.push(s.slice(start));
  return out.filter(Boolean);
}

/**
 * Parse a linear side: "3x + 7", "22", "-x", "2x/3 - 1", "(x - 3)/2", "4(x + 1)".
 * Authoring stays readable; the structure stays exact.
 *
 * A bracketed group is EXPANDED as it is parsed — the model is `a·x + b` and has
 * nowhere to keep an unexpanded bracket. That is invisible for the one shape
 * this unit is built on, `(ax + b)/d`, because `sideText` reads that shape back
 * out of the numbers (see `groupedOf`). Any other bracket — "4(x + 1)" — is a
 * pure authoring convenience, and the student meets it already multiplied out.
 */
export function parseSide(src, v = 'x') {
  const s = String(src).replace(/\s+/g, '').replace(/[−–—]/g, '-');
  if (!s) throw new Error('empty side');
  const re = new RegExp(`^([+-]?)(\\d*)(?:/(\\d+))?(${v}?)(?:/(\\d+))?$`);
  const group = /^([+-]?)(\d*)\((.+)\)(?:\/(\d+))?$/;
  let x = fr(0), c = fr(0);

  for (const term of splitTerms(s)) {
    const g = term.match(group);
    if (g) {
      const [, sign, mulRaw, inner, denRaw] = g;
      let factor = fr(mulRaw === '' ? 1 : parseInt(mulRaw, 10), parseInt(denRaw || '1', 10));
      if (sign === '-') factor = neg(factor);
      const part = parseSide(inner, v);          // no brackets left inside
      x = add(x, mul(part.x, factor));
      c = add(c, mul(part.c, factor));
      continue;
    }
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
  // 0. fractions anywhere -> multiply the whole equation by the LCD. This comes
  //    first for the same reason it is taught first: every later step is easier
  //    on whole numbers, and collecting x across two different denominators is
  //    how a student ends up with 1/6 x and gives up.
  const lcd = lcdOf(eq);
  if (lcd > 1) return { kind: 'mul', amount: fr(lcd) };
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
  // 3. bare coefficient -> divide it out. If the x has cancelled away entirely
  //    there is nothing to divide BY: "2x + 1 = 2x + 5" has no solution and
  //    "2x + 1 = 2x + 1" has every number. Neither is solvable by this strategy,
  //    and saying so beats dividing by zero.
  if (isZero(varSide.x)) return null;
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
