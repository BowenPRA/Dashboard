// src/utils/quadratic.js
//
// Quadratics — the pure maths behind three ACELLUS tasks (ALG_QUAD):
//   · Factor It   (src/tasks/FactorQuad.jsx)   factor, then the zero product property
//   · Formula     (src/tasks/QuadFormula.jsx)  a, b, c → discriminant → √ → answers
//   · Quad Solver (src/tasks/QuadSolver.jsx)   type any quadratic, read every step
//
// THE RULE (as surds.js, polynomial.js): an item stores only the equation.
// Every coefficient, factor pair, split, grouping, discriminant, root and
// decimal is derived here, so no answer key can drift, and the checks in
// quadCheck.js refuse an item a student could not finish on the screen.
//
// Numbers are exact. A coefficient is a rational { n, d } (d > 0, lowest
// terms) so that "½x² − 3 = 0" or "0.5x^2 = 3" parse without rounding; the
// standard form then clears the denominators, so every model below works on
// integers a, b, c with a > 0.

import { gcd, isSquare, splitRoot } from './surds.js';

export { gcd, isSquare, splitRoot };

// ------------------------------------------------------------------ rationals

export const R = (n, d = 1) => {
  if (d === 0) throw new Error('divide by zero');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
};
export const rAdd = (p, q) => R(p.n * q.d + q.n * p.d, p.d * q.d);
export const rSub = (p, q) => R(p.n * q.d - q.n * p.d, p.d * q.d);
export const rMul = (p, q) => R(p.n * q.n, p.d * q.d);
export const rDiv = (p, q) => R(p.n * q.d, p.d * q.n);
export const rNeg = (p) => R(-p.n, p.d);
export const rIsZero = (p) => p.n === 0;
export const rEq = (p, q) => p.n === q.n && p.d === q.d;
export const rVal = (p) => p.n / p.d;
const lcm = (a, b) => (a / gcd(a, b)) * b;

/** A rational as LaTeX: 3, -2, \frac{1}{2}, -\frac{3}{4}. */
export function rLatex(p) {
  if (p.d === 1) return String(p.n);
  return `${p.n < 0 ? '-' : ''}\\frac{${Math.abs(p.n)}}{${p.d}}`;
}
/** A rational as plain text: 3, -2, 1/2. */
export const rText = (p) => (p.d === 1 ? String(p.n) : `${p.n}/${p.d}`);

/**
 * What a student typed in a number box, as a rational, or null.
 * Takes −3, -3, +3, 3/2, -3/2, 1.5, ".5", "− 3", and "3 / 4".
 */
export function parseNumber(text) {
  if (text == null) return null;
  const s = String(text).replace(/[−–—]/g, '-').replace(/\s+/g, '').replace(/,/g, '.');
  if (!s) return null;
  const m = s.match(/^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:\/([+-]?)(\d+(?:\.\d*)?|\.\d+))?$/);
  if (!m) return null;
  const dec = (str) => {
    const [i, f = ''] = str.split('.');
    return R(Number(i || 0) * 10 ** f.length + Number(f || 0), 10 ** f.length);
  };
  let v = dec(m[2]);
  if (m[1] === '-') v = rNeg(v);
  if (m[4] != null) {
    const den = dec(m[4]);
    if (rIsZero(den)) return null;
    v = rDiv(v, m[3] === '-' ? rNeg(den) : den);
  }
  return v;
}

// ------------------------------------------------------------------ polynomials (rational coefficients, index = power)

const pTrim = (p) => { const q = [...p]; while (q.length > 1 && rIsZero(q[q.length - 1])) q.pop(); return q; };
const pAdd = (p, q) => pTrim(Array.from({ length: Math.max(p.length, q.length) }, (_, i) => rAdd(p[i] || R(0), q[i] || R(0))));
const pNeg = (p) => p.map(rNeg);
const pMul = (p, q) => {
  const out = Array.from({ length: p.length + q.length - 1 }, () => R(0));
  p.forEach((x, i) => q.forEach((y, j) => { out[i + j] = rAdd(out[i + j], rMul(x, y)); }));
  return pTrim(out);
};
const pDeg = (p) => pTrim(p).length - 1;
const pConst = (r) => [r];

// ------------------------------------------------------------------ the parser

/** Why an input could not be read, in both languages. */
const PARSE_ERR = {
  empty: { en: 'Type a quadratic first.', vn: 'Hãy gõ một phương trình bậc hai trước.' },
  chars: { en: 'Use numbers, one letter (like x), + − × ÷, ^ for powers, brackets and =.', vn: 'Hãy dùng số, một chữ cái (như x), + − × ÷, ^ cho lũy thừa, dấu ngoặc và dấu =.' },
  letters: { en: 'Use just one letter for the unknown — x, for example.', vn: 'Chỉ dùng một chữ cái cho ẩn — ví dụ x.' },
  equals: { en: 'There can only be one = sign.', vn: 'Chỉ được có một dấu =.' },
  syntax: { en: 'Something is missing — check for a sign or a bracket with nothing next to it.', vn: 'Có chỗ bị thiếu — hãy kiểm tra dấu hoặc dấu ngoặc bị bỏ trống.' },
  power: { en: 'Powers must be whole numbers: x^2, not x^½.', vn: 'Số mũ phải là số nguyên: x^2, không phải x^½.' },
  divide: { en: 'You can divide by a number, but not by x.', vn: 'Có thể chia cho một số, nhưng không chia cho x.' },
  zero: { en: 'That divides by zero.', vn: 'Phép tính đó chia cho 0.' },
  big: { en: 'Those numbers are too big to work with here.', vn: 'Các số đó quá lớn để giải ở đây.' },
  degree: { en: 'That has a power higher than 2, so it is not a quadratic.', vn: 'Biểu thức có lũy thừa lớn hơn 2, nên không phải phương trình bậc hai.' },
};

class ParseError extends Error {
  constructor(code) { super(code); this.code = code; }
}

function tokenize(src) {
  const s = src
    .replace(/[−–—]/g, '-')
    .replace(/[×·∙*]/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/\*\*/g, '^')
    .replace(/[[{]/g, '(').replace(/[\]}]/g, ')');
  const out = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) { i += 1; continue; }
    if (/[\d.]/.test(ch)) {
      let j = i;
      while (j < s.length && /[\d.]/.test(s[j])) j += 1;
      const raw = s.slice(i, j);
      if ((raw.match(/\./g) || []).length > 1 || raw === '.') throw new ParseError('syntax');
      out.push({ t: 'num', v: parseNumber(raw) });
      i = j; continue;
    }
    if (/[a-zA-Z]/.test(ch)) { out.push({ t: 'var', v: ch.toLowerCase() }); i += 1; continue; }
    if ('+-*/^()='.includes(ch)) { out.push({ t: ch }); i += 1; continue; }
    throw new ParseError('chars');
  }
  return out;
}

/** Parse one side into a polynomial (rational coefficients, index = power). */
function parseSide(tokens) {
  let pos = 0;
  const peek = () => tokens[pos];
  const take = () => tokens[pos++];

  function atom() {
    const tk = take();
    if (!tk) throw new ParseError('syntax');
    if (tk.t === 'num') return pConst(tk.v);
    if (tk.t === 'var') return [R(0), R(1)];
    if (tk.t === '(') {
      const e = expr();
      if (take()?.t !== ')') throw new ParseError('syntax');
      return e;
    }
    throw new ParseError('syntax');
  }
  function power() {
    let base = atom();
    while (peek()?.t === '^') {
      take();
      let sign = 1;
      if (peek()?.t === '-') { take(); sign = -1; }
      const ex = take();
      if (ex?.t !== 'num' || ex.v.d !== 1 || sign < 0) throw new ParseError('power');
      if (ex.v.n > 6) throw new ParseError('degree');
      let out = [R(1)];
      for (let k = 0; k < ex.v.n; k += 1) out = pMul(out, base);
      base = out;
    }
    return base;
  }
  function unary() {
    if (peek()?.t === '-') { take(); return pNeg(unary()); }
    if (peek()?.t === '+') { take(); return unary(); }
    return power();
  }
  function term() {
    let v = unary();
    for (;;) {
      const tk = peek();
      if (tk?.t === '*') { take(); v = pMul(v, unary()); continue; }
      if (tk?.t === '/') {
        take();
        const d = unary();
        if (pDeg(d) > 0) throw new ParseError('divide');
        if (rIsZero(d[0])) throw new ParseError('zero');
        v = v.map((c) => rDiv(c, d[0]));
        continue;
      }
      // Implicit multiplication: 3x, 2(x+1), (x+1)(x-2), x(x+3).
      if (tk && (tk.t === 'num' || tk.t === 'var' || tk.t === '(')) { v = pMul(v, power()); continue; }
      return v;
    }
  }
  function expr() {
    let v = term();
    for (;;) {
      const tk = peek();
      if (tk?.t === '+') { take(); v = pAdd(v, term()); continue; }
      if (tk?.t === '-') { take(); v = pAdd(v, pNeg(term())); continue; }
      return v;
    }
  }
  const out = expr();
  if (pos !== tokens.length) throw new ParseError('syntax');
  return pTrim(out);
}

/**
 * Read a typed quadratic. Returns
 *   { ok: true, v, left, right, hasEquals, fromY }   (left/right: rational polynomials)
 *   { ok: false, code, en, vn }
 * "y = …" and "f(x) = …" are read as "find the zeros of …".
 */
export function parseEquation(input) {
  const raw = String(input ?? '').trim();
  if (!raw) return { ok: false, code: 'empty', ...PARSE_ERR.empty };
  try {
    let src = raw;
    let fromY = false;
    const yForm = src.match(/^\s*(?:y|f\s*\(\s*([a-z])\s*\))\s*=\s*(.+)$/i);
    if (yForm) { src = yForm[2]; fromY = true; }
    const tokens = tokenize(src);
    const letters = [...new Set(tokens.filter((t) => t.t === 'var').map((t) => t.v))];
    if (letters.length > 1) throw new ParseError('letters');
    const v = letters[0] || (yForm?.[1]?.toLowerCase()) || 'x';
    const eqAt = tokens.map((t, k) => (t.t === '=' ? k : -1)).filter((k) => k >= 0);
    if (eqAt.length > 1) throw new ParseError('equals');
    const leftT = eqAt.length ? tokens.slice(0, eqAt[0]) : tokens;
    const rightT = eqAt.length ? tokens.slice(eqAt[0] + 1) : [];
    if (!leftT.length || (eqAt.length && !rightT.length)) throw new ParseError('syntax');
    const left = parseSide(leftT);
    const right = rightT.length ? parseSide(rightT) : [R(0)];
    const all = [...left, ...right];
    if (all.some((c) => Math.abs(c.n) > 1e7 || c.d > 1e6)) throw new ParseError('big');
    return { ok: true, v, left, right, hasEquals: eqAt.length > 0, fromY };
  } catch (e) {
    const code = e instanceof ParseError ? e.code : 'syntax';
    return { ok: false, code, ...PARSE_ERR[code] };
  }
}

// ------------------------------------------------------------------ LaTeX

/** A polynomial with rational coefficients (index = power), highest power first. */
export function polyLatexR(p, v = 'x') {
  const parts = [];
  for (let k = p.length - 1; k >= 0; k -= 1) {
    const c = p[k];
    if (!c || rIsZero(c)) continue;
    const neg = c.n < 0;
    const mag = R(Math.abs(c.n), c.d);
    let body;
    if (k === 0) body = rLatex(mag);
    else {
      const coef = mag.n === 1 && mag.d === 1 ? '' : rLatex(mag);
      body = `${coef}${v}${k === 1 ? '' : `^{${k}}`}`;
    }
    parts.push(parts.length === 0 ? `${neg ? '-' : ''}${body}` : ` ${neg ? '-' : '+'} ${body}`);
  }
  return parts.length ? parts.join('') : '0';
}

/** a x² + b x + c with integers, as LaTeX ("x^2 - 5x + 6"). */
export const quadLatex = (a, b, c, v = 'x') => polyLatexR([R(c), R(b), R(a)], v);

/** A signed integer for writing after another term: "+ 3", "- 3". */
export const signed = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`);
/** A number in brackets when negative, for substituting: 4 → "4", −4 → "(-4)". */
export const paren = (n) => (n < 0 ? `(${n})` : `${n}`);
/** A coefficient on a letter: 1 → "x", −1 → "-x", 3 → "3x". */
export const coefX = (k, v = 'x') => (k === 1 ? v : k === -1 ? `-${v}` : `${k}${v}`);
/** A bracket p·x + q as LaTeX: "x + 3", "2x - 1", "x". */
export function binLatex(p, q, v = 'x') {
  if (q === 0) return coefX(p, v);
  if (p === 0) return String(q);
  return `${coefX(p, v)} ${signed(q)}`;
}
/** A number as a decimal for "≈": two places, trailing zeros dropped. */
export function approx(x) {
  const r = Math.round(x * 100) / 100;
  return (Object.is(r, -0) ? 0 : r).toFixed(2).replace(/\.?0+$/, '');
}

// ------------------------------------------------------------------ standard form

/**
 * Move everything to the left, clear fractions, make a positive.
 * Returns { a, b, c, deg, moved, scale, flipped, steps[] } where a, b, c are
 * integers with a > 0 when deg = 2. `deg` < 2 means it was not a quadratic.
 */
export function standardForm(parsed) {
  const { left, right, v } = parsed;
  const diff = pAdd(left, pNeg(right));
  const deg = pDeg(diff);
  const at = (k) => diff[k] || R(0);
  const rightIsZero = right.length === 1 && rIsZero(right[0]);
  const moved = !rightIsZero;
  // Out of order on the left (e.g. 5x + x^2 - 3): only matters for what we say.
  const steps = [];
  if (moved) {
    steps.push({
      kind: 'move',
      latex: `${polyLatexR(diff, v)} = 0`,
      en: 'Move every term to the left side, so the right side is 0 (a term changes sign when it crosses the = sign).',
      vn: 'Chuyển mọi hạng tử sang vế trái để vế phải bằng 0 (hạng tử đổi dấu khi chuyển qua dấu =).',
    });
  }
  let coeffs = [at(0), at(1), at(2)];
  let scale = 1;
  const den = coeffs.reduce((m, c) => lcm(m, c.d), 1);
  if (den > 1) {
    scale = den;
    coeffs = coeffs.map((c) => rMul(c, R(den)));
    steps.push({
      kind: 'clear',
      latex: `${polyLatexR(coeffs, v)} = 0`,
      en: `Multiply every term by ${den} to clear the fractions or decimals. The solutions do not change.`,
      vn: `Nhân mọi hạng tử với ${den} để khử phân số hoặc số thập phân. Nghiệm không thay đổi.`,
    });
  }
  let flipped = false;
  const lead = coeffs[Math.max(0, Math.min(2, deg))];
  if (deg === 2 && lead.n < 0) {
    flipped = true;
    coeffs = coeffs.map(rNeg);
    steps.push({
      kind: 'flip',
      latex: `${polyLatexR(coeffs, v)} = 0`,
      en: 'Multiply every term by −1 so the x² term is positive. It makes factoring easier, and the solutions do not change.',
      vn: 'Nhân mọi hạng tử với −1 để hạng tử x² dương. Như vậy phân tích dễ hơn, và nghiệm không thay đổi.',
    });
  }
  const [c, b, a] = coeffs.map((r) => r.n);
  return { a, b, c, deg, moved, scale, flipped, steps, v };
}

/** Is the left side written as "ax² + bx + c" with 0 on the right, in that order? */
export function isWrittenStandard(input) {
  const s = String(input).replace(/\s+/g, '');
  return /=0$/.test(s) || !s.includes('=');
}

// ------------------------------------------------------------------ factor pairs

/**
 * Every integer pair m × n = P (m ≤ n in size order), with its sum.
 * P > 0 → both signs the same; P < 0 → one of each. P = 0 → [].
 */
export function signedPairs(P) {
  if (P === 0) return [];
  const N = Math.abs(P);
  const out = [];
  for (let d = 1; d * d <= N; d += 1) {
    if (N % d) continue;
    const e = N / d;
    if (P > 0) {
      out.push([d, e], [-d, -e]);
    } else {
      out.push([d, -e], [-d, e]);
    }
  }
  return out
    .map(([m, n]) => ({ m, n, sum: m + n, key: `${m},${n}` }))
    // The same pair twice (√P whole, e.g. 4 × 4) collapses to one row.
    .filter((p, i, all) => all.findIndex((q) => q.key === p.key) === i);
}

/** The pair that multiplies to P and adds to S, or null. Small numbers first. */
export function findPair(P, S) {
  if (P === 0) return S === 0 ? null : { m: 0, n: S, sum: S, key: `0,${S}` };
  return signedPairs(P).find((p) => p.sum === S) || null;
}

// ------------------------------------------------------------------ factoring

/**
 * How a x² + b x + c (integers, a > 0) factors over the integers — or why it
 * doesn't. The model carries every line a student writes:
 *
 *   g        the greatest common factor of a, b, c (positive)
 *   A, B, C  the trinomial left after taking g out
 *   family   'common' (C = 0: take out x)
 *            'diff'   (B = 0, A and −C perfect squares: difference of squares)
 *            'pair'   (A = 1: two numbers that multiply to C and add to B)
 *            'ac'     (A > 1: multiply to A·C, add to B, split, group)
 *            'roots'  (B = 0 but not a difference of squares: square roots)
 *            'none'   (the discriminant is not a perfect square)
 *   factors  [[p, q], [r, s]] meaning (p x + q)(r x + s), with g in front
 *   zeros    rationals, smallest first (one entry when repeated)
 */
export function factorModel(a, b, c) {
  const g0 = gcd(gcd(a, b), c) || 1;
  const g = g0;
  const A = a / g; const B = b / g; const C = c / g;
  const D = B * B - 4 * A * C;
  const base = { a, b, c, g, A, B, C, D };

  if (C === 0) {
    // A x² + B x = x (A x + B)
    const zeros = [R(0), R(-B, A)].sort((p, q) => rVal(p) - rVal(q));
    return { ...base, family: 'common', factors: [[1, 0], [A, B]], zeros: dedupe(zeros), factors2: true };
  }
  if (B === 0 && C < 0 && isSquare(A) && isSquare(-C)) {
    const p = Math.sqrt(A); const q = Math.sqrt(-C);
    return { ...base, family: 'diff', sa: p, sc: q, factors: [[p, q], [p, -q]], zeros: [R(-q, p), R(q, p)] };
  }
  if (D < 0 || !isSquare(D)) {
    return { ...base, family: B === 0 ? 'roots' : 'none', factors: null, zeros: null };
  }
  const s = Math.sqrt(D);
  const r1 = R(-B - s, 2 * A); const r2 = R(-B + s, 2 * A);
  // (r1.d x − r1.n)(r2.d x − r2.n): Gauss's lemma makes r1.d × r2.d = A for a primitive trinomial.
  const factors = [[r1.d, -r1.n], [r2.d, -r2.n]];
  const zeros = dedupe([r1, r2]);
  if (A === 1) {
    // Written the way the pair was found: m and n straight into the brackets.
    const pair = findPair(C, B);
    return { ...base, family: 'pair', pair, factors: [[1, pair.m], [1, pair.n]], zeros };
  }
  // Written the way grouping produces it: (P x + Q)(g1 x + g2).
  const pair = findPair(A * C, B);
  const grouping = groupingOf(A, pair.m, pair.n, C);
  return { ...base, family: 'ac', pair, factors: grouping ? [[grouping.P, grouping.Q], [grouping.g1, grouping.g2]] : factors, zeros, grouping };
}

const dedupe = (zs) => zs.filter((z, i) => zs.findIndex((y) => rEq(y, z)) === i);

/**
 * Factor by grouping: (A x² + m x) + (n x + C) = g1 x (P x + Q) + g2 (P x + Q).
 * g1 = gcd(A, m) (positive); P = A / g1, Q = m / g1; g2 = n / P (A·C = m·n
 * makes it whole).
 */
export function groupingOf(A, m, n, C) {
  const g1 = gcd(A, m) || A;
  const P = A / g1; const Q = m / g1;
  const g2 = n / P;
  if (!Number.isInteger(g2) || g2 * Q !== C) return null;
  return { m, n, g1, g2, P, Q };
}

/** (p x + q)(r x + s) multiplied out: [a, b, c]. */
export const expand = ([p, q], [r, s]) => [p * r, p * s + q * r, q * s];

/** The factored form as LaTeX: "2(x + 2)(x + 3)", "(x + 3)^2", "3x(x - 4)". */
export function factoredLatex(model, v = 'x') {
  const { g, factors, family } = model;
  if (!factors) return null;
  const lead = g === 1 ? '' : String(g);
  if (family === 'common') {
    const [, [A, B]] = factors;
    return `${lead}${v}\\left(${binLatex(A, B, v)}\\right)`;
  }
  const [f1, f2] = factors;
  if (f1[0] === f2[0] && f1[1] === f2[1]) return `${lead}\\left(${binLatex(f1[0], f1[1], v)}\\right)^{2}`;
  return `${lead}\\left(${binLatex(f1[0], f1[1], v)}\\right)\\left(${binLatex(f2[0], f2[1], v)}\\right)`;
}

// ------------------------------------------------------------------ the quadratic formula

/**
 * Everything the formula needs, exact. With D = b² − 4ac:
 *   D > 0 square      two rational roots
 *   D > 0 not square  x = (p ± k√r) / q in lowest terms
 *   D = 0             one repeated root −b / 2a
 *   D < 0             no real roots (complex form kept for the footnote)
 */
export function formulaModel(a, b, c) {
  const D = b * b - 4 * a * c;
  const twoA = 2 * a;
  const out = { a, b, c, D, twoA, negB: -b };
  if (D < 0) {
    const { out: k, inside: r } = splitRoot(-D);
    const g = gcd(gcd(-b, k), twoA) || 1;
    return { ...out, kind: 'none', count: 0, root: { k, r }, reduced: { p: -b / g, k: k / g, r, q: twoA / g } };
  }
  if (D === 0) {
    return { ...out, kind: 'one', count: 1, sqrt: 0, roots: [R(-b, twoA)] };
  }
  if (isSquare(D)) {
    const s = Math.sqrt(D);
    const plus = R(-b + s, twoA); const minus = R(-b - s, twoA);
    return { ...out, kind: 'rational', count: 2, sqrt: s, plus, minus, roots: [plus, minus].sort((p, q) => rVal(p) - rVal(q)) };
  }
  const { out: k, inside: r } = splitRoot(D);
  const g = gcd(gcd(-b, k), twoA) || 1;
  const reduced = { p: -b / g, k: k / g, r, q: twoA / g };
  const vals = [(-b + Math.sqrt(D)) / twoA, (-b - Math.sqrt(D)) / twoA];
  return { ...out, kind: 'irrational', count: 2, root: { k, r }, g, reduced, decimals: vals.sort((x, y) => x - y) };
}

/** k√r as LaTeX: 6√2, √5, 7. */
export function rootLatex(k, r) {
  if (r === 1) return String(k);
  return `${k === 1 ? '' : k}\\sqrt{${r}}`;
}

/** (p ± k√r) / q as LaTeX, written the way a book writes it: "2 \pm 3\sqrt{2}", "\frac{-3 \pm \sqrt{5}}{2}". */
export function pmLatex({ p, k, r, q }, i = false) {
  const rad = `${k === 1 ? '' : k}${i ? 'i' : ''}\\sqrt{${r}}`.replace(/\\sqrt\{1\}/, '');
  const top = p === 0 ? `\\pm ${rad}` : `${p} \\pm ${rad}`;
  return q === 1 ? top : `\\frac{${top}}{${q}}`;
}

/** The roots of a formula model as a list of LaTeX strings ("x = …" not included). */
export function rootsLatex(fm) {
  if (fm.kind === 'none') return [];
  if (fm.kind === 'one') return [rLatex(fm.roots[0])];
  if (fm.kind === 'rational') return fm.roots.map(rLatex);
  return [pmLatex(fm.reduced)];
}

// ------------------------------------------------------------------ one call for a typed equation

/**
 * Parse and analyse a typed quadratic in one go (the Solver, and the checks).
 * Returns { ok:false, … } for bad input, { ok:true, kind:'linear'|'constant', … }
 * for something that is not a quadratic, or { ok:true, kind:'quadratic', parsed,
 * std, fac, fm } for the real thing.
 */
export function analyse(input) {
  const parsed = parseEquation(input);
  if (!parsed.ok) return parsed;
  const std = standardForm(parsed);
  if (std.deg > 2) return { ok: false, code: 'degree', ...PARSE_ERR.degree };
  if (std.deg < 2) return { ok: true, kind: std.deg === 1 ? 'linear' : 'constant', parsed, std };
  const { a, b, c } = std;
  if ([a, b, c].some((n) => Math.abs(n) > 1e6)) return { ok: false, code: 'big', ...PARSE_ERR.big };
  return { ok: true, kind: 'quadratic', parsed, std, fac: factorModel(a, b, c), fm: formulaModel(a, b, c) };
}

/** The original equation as typed, cleaned up into LaTeX. */
export function originalLatex(parsed) {
  const { left, right, v, hasEquals, fromY } = parsed;
  if (fromY) return `${polyLatexR(left, v)} = 0`;
  return `${polyLatexR(left, v)} = ${hasEquals ? polyLatexR(right, v) : '0'}`;
}

/** The real zeros as rationals or decimals, for the graph: numbers, smallest first. */
export function realZeros(fm) {
  if (fm.kind === 'none') return [];
  if (fm.kind === 'irrational') return fm.decimals;
  return fm.roots.map(rVal);
}
