// src/utils/surds.js
//
// Surds — the pure parts behind two tasks and a notes widget:
//   · Surd Breaker (src/tasks/SurdSimplify.jsx): simplify √n, collect like
//     surds, multiply surds.
//   · Rationalise It (src/tasks/Rationalise.jsx): expand brackets with surds,
//     rationalise a k√m or a two-term denominator.
//
// THE RULE (same as modulus.js, cubic.js, sets.js): an item stores the question
// and everything else is derived here — every square factor, product cell,
// conjugate, denominator and final simplified answer — so no answer key can
// drift, and `checkSurdItems` / `checkRationaliseItems` refuse an item a
// student could not finish on the screen.
//
// A TERM is `[k, r]`: the integer k times √r, with r a positive integer and
// r = 1 meaning a plain integer. `[6, 2]` is 6√2, `[-1, 3]` is −√3, `[5, 1]`
// is 5. A SUM is a list of terms. Everything is exact integer arithmetic: √m
// for square-free m > 1 is irrational, so two sums are equal exactly when
// their collected terms are equal.

// ------------------------------------------------------------------ integers

export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

export const isSquare = (n) => Number.isInteger(n) && n >= 0 && Math.round(Math.sqrt(n)) ** 2 === n;

/** n = out² × inside, with inside square-free. */
export function splitRoot(n) {
  let out = 1;
  let inside = n;
  for (let d = 2; d * d <= inside; d += 1) {
    while (inside % (d * d) === 0) { inside /= d * d; out *= d; }
  }
  return { out, inside };
}

export const isSquareFree = (n) => splitRoot(n).out === 1;

/** Every perfect square above 1 that divides n, smallest first. */
export function squareFactors(n) {
  const out = [];
  for (let d = 2; d * d <= n; d += 1) if (n % (d * d) === 0) out.push(d * d);
  return out;
}

/** The factor pairs of n: [[1, n], [2, n/2], …], smaller factor first. */
export function factorPairs(n) {
  const out = [];
  for (let d = 1; d * d <= n; d += 1) if (n % d === 0) out.push([d, n / d]);
  return out;
}

/** Prime factors of n with repeats, smallest first: 72 → [2, 2, 2, 3, 3]. */
export function primeFactors(n) {
  const out = [];
  let m = n;
  for (let d = 2; d * d <= m; d += 1) while (m % d === 0) { out.push(d); m /= d; }
  if (m > 1) out.push(m);
  return out;
}

// ------------------------------------------------------------------ terms and sums

/** k√r in simplest form: [3, 8] → [6, 2]; [2, 9] → [6, 1]. */
export function simplifyTerm([k, r]) {
  const { out, inside } = splitRoot(r);
  return [k * out, inside];
}

/** The product of two terms as written, before any simplifying: √6 × √10 → [1, 60]. */
export const multiplyRaw = ([k1, r1], [k2, r2]) => [k1 * k2, r1 * r2];

/** The product of two terms, simplified: √6 × √10 → 2√15. */
export const multiply = (a, b) => simplifyTerm(multiplyRaw(a, b));

export const negate = ([k, r]) => [-k, r];

/** Simplify every term, add like surds, drop zeros; integers first, then by radicand. */
export function collect(terms) {
  const by = new Map();
  for (const t of terms) {
    const [k, r] = simplifyTerm(t);
    by.set(r, (by.get(r) || 0) + k);
  }
  return [...by.entries()].filter(([, k]) => k !== 0).sort((a, b) => a[0] - b[0]).map(([r, k]) => [k, r]);
}

export const termValue = ([k, r]) => k * Math.sqrt(r);

/** Two terms are the same number: compares k²r and the sign, so √8 equals 2√2. */
export function sameTermValue([k1, r1], [k2, r2]) {
  if (Math.sign(k1) !== Math.sign(k2)) return false;
  return k1 * k1 * r1 === k2 * k2 * r2;
}

/** Two sums are the same number (exact). */
export function sameSum(a, b) {
  const x = collect(a);
  const y = collect(b);
  return x.length === y.length && x.every(([k, r], i) => y[i][0] === k && y[i][1] === r);
}

// ------------------------------------------------------------------ printing

const MINUS = '−';

/** One term as KaTeX. `first` decides whether a + sign is written. */
export function termLatex([k, r], { first = true } = {}) {
  const sign = k < 0 ? '-' : first ? '' : '+';
  const abs = Math.abs(k);
  let body;
  if (r === 1) body = `${abs}`;
  else body = `${abs === 1 ? '' : abs}\\sqrt{${r}}`;
  return first ? `${sign}${body}` : `${sign} ${body}`;
}

/** A sum as KaTeX, in the order given: "6 + \sqrt{3}". Empty → "0". */
export function sumLatex(terms) {
  const live = terms.filter(([k]) => k !== 0);
  if (!live.length) return '0';
  return live.map((t, i) => termLatex(t, { first: i === 0 })).join(' ');
}

/**
 * A derived sum in the order a book prints it: a positive term leads, so
 * −1 + √5 is written √5 − 1. Authored questions are never reordered.
 */
export function tidy(terms) {
  const live = terms.filter(([k]) => k !== 0);
  if (live.length > 1 && live[0][0] < 0) {
    const i = live.findIndex(([k]) => k > 0);
    if (i > 0) return [live[i], ...live.filter((_, j) => j !== i)];
  }
  return live;
}

/** A sum over a denominator as KaTeX; a denominator of 1 is not written. */
export function fractionLatex(terms, den) {
  if (den === 1) return sumLatex(tidy(terms));
  return `\\dfrac{${sumLatex(tidy(terms))}}{${den}}`;
}

/** Plain-text term for messages: "6√2", "−√3", "5". */
export function termText([k, r]) {
  const sign = k < 0 ? MINUS : '';
  const abs = Math.abs(k);
  if (r === 1) return `${sign}${abs}`;
  return `${sign}${abs === 1 ? '' : abs}√${r}`;
}

// ------------------------------------------------------------------ Surd Breaker

/**
 * The derived model of a Surd Breaker item.
 *   { kind: 'simplify', n, k? }            k√n in simplest form
 *   { kind: 'collect', terms: [[k, n], …] } add/subtract, simplifying first
 *   { kind: 'multiply', a: [k, n], b: [k, n] }  multiply, then simplify
 */
export function deriveSurdItem(item) {
  if (item.kind === 'simplify') {
    const start = [item.k ?? 1, item.n];
    return { kind: 'simplify', start, answer: simplifyTerm(start), rounds: splitRoot(item.n).out > 1 };
  }
  if (item.kind === 'collect') {
    const simplified = item.terms.map(simplifyTerm);
    const radicands = [...new Set(simplified.map(([, r]) => r))];
    const answer = collect(item.terms);
    return { kind: 'collect', terms: item.terms, simplified, like: radicands.length === 1, radicand: radicands[0], answer };
  }
  if (item.kind === 'multiply') {
    const raw = multiplyRaw(item.a, item.b);
    return { kind: 'multiply', a: item.a, b: item.b, raw, answer: simplifyTerm(raw), rounds: splitRoot(raw[1]).out > 1 };
  }
  throw new Error(`unknown kind "${item.kind}"`);
}

/** The question as KaTeX. */
export function surdQuestionLatex(item) {
  if (item.kind === 'simplify') return termLatex([item.k ?? 1, item.n]);
  if (item.kind === 'collect') return sumLatex(item.terms);
  if (item.kind === 'multiply') {
    const same = item.a[0] === item.b[0] && item.a[1] === item.b[1];
    if (same && item.square) return `\\left(${termLatex(item.a)}\\right)^2`;
    return `${termLatex(item.a)} \\times ${termLatex(item.b)}`;
  }
  return '?';
}

/** Problems with Surd Breaker items, as strings. */
export function checkSurdItems(items) {
  const out = [];
  const ids = new Set();
  for (const [i, item] of (items || []).entries()) {
    const at = `item ${item?.id || i + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    const posInt = (v) => Number.isInteger(v) && v > 0;
    const term = (t) => Array.isArray(t) && t.length === 2 && Number.isInteger(t[0]) && t[0] !== 0 && posInt(t[1]);
    if (item.kind === 'simplify') {
      if (!posInt(item.n) || item.n < 2) out.push(`${at}: n must be a whole number above 1`);
      else if (isSquareFree(item.n)) out.push(`${at}: √${item.n} is already simplest — nothing to break down`);
      if (item.k !== undefined && !(Number.isInteger(item.k) && item.k > 0)) out.push(`${at}: k must be a positive whole number`);
      if (posInt(item.n) && item.n > 400) out.push(`${at}: n = ${item.n} is past the square chips on screen (keep n ≤ 400)`);
    } else if (item.kind === 'collect') {
      if (!Array.isArray(item.terms) || item.terms.length < 2 || !item.terms.every(term)) out.push(`${at}: terms must be at least two [k, n] pairs with k ≠ 0`);
      else {
        const m = deriveSurdItem(item);
        if (m.simplified.some(([, r]) => r === 1)) out.push(`${at}: a term is a whole number once simplified — keep collect items to surds`);
        if (item.terms.every(([, r]) => isSquareFree(r)) && m.like) out.push(`${at}: every term is already simplest and alike — nothing to break down first`);
        if (m.like && m.answer.length > 1) out.push(`${at}: the like-surd answer should be one term`);
      }
    } else if (item.kind === 'multiply') {
      if (!term(item.a) || !term(item.b)) out.push(`${at}: a and b must be [k, n] with k ≠ 0`);
      else {
        if (item.a[1] === 1 || item.b[1] === 1) out.push(`${at}: both factors must be surds`);
        if (item.square && (item.a[0] !== item.b[0] || item.a[1] !== item.b[1])) out.push(`${at}: square: true needs a and b equal`);
        if (item.a[1] * item.b[1] > 400) out.push(`${at}: the product under the root is ${item.a[1] * item.b[1]} — keep it ≤ 400`);
      }
    } else {
      out.push(`${at}: kind must be simplify, collect or multiply`);
    }
  }
  return out;
}

// ------------------------------------------------------------------ Rationalise It

const termOk = (t) => Array.isArray(t) && t.length === 2 && Number.isInteger(t[0]) && Number.isInteger(t[1]) && t[1] > 0;

/** Divide a sum and its denominator by their common factor; make the denominator positive. */
export function reduceFraction(terms, den) {
  let g = Math.abs(den);
  for (const [k] of terms) g = gcd(g, k);
  if (g === 0) g = 1;
  const s = den < 0 ? -1 : 1;
  return { terms: terms.map(([k, r]) => [(s * k) / g, r]), den: Math.abs(den) / g, divisor: g * s };
}

/** The integer part and the surd part of a collected sum (at most one surd). */
export function partsOf(terms) {
  const c = collect(terms);
  const int = c.find(([, r]) => r === 1)?.[0] ?? 0;
  const surd = c.find(([, r]) => r > 1) || null;
  return { int, surdCoef: surd ? surd[0] : 0, radicand: surd ? surd[1] : null, radicands: c.filter(([, r]) => r > 1).length };
}

/**
 * The derived model of a Rationalise It item.
 *   { kind: 'expand', left: [t, t], right: [t, t] }   two brackets, grid-multiplied
 *   { kind: 'mono', num: [t…], den: [q, m] }            num over q√m
 *   { kind: 'binomial', num: [t…], den: [t, t] }        num over a two-term bracket
 * Terms are [k, r] in the order the book prints them.
 */
export function deriveRationalise(item) {
  if (item.kind === 'expand') {
    const cells = item.left.map((a) => item.right.map((b) => ({ raw: multiplyRaw(a, b), value: multiply(a, b) })));
    const sum = collect(cells.flat().map((c) => c.value));
    const conjugatePair = item.left[0][0] === item.right[0][0] && item.left[0][1] === item.right[0][1]
      && item.left[1][1] === item.right[1][1] && item.left[1][0] === -item.right[1][0];
    return { kind: 'expand', cells, sum, parts: partsOf(sum), conjugatePair };
  }
  if (item.kind === 'mono') {
    const [q, m] = item.den;
    const multiplier = [[1, m]];
    const bottom = q * m;
    const topCells = item.num.map((t) => ({ raw: multiplyRaw(t, [1, m]), value: multiply(t, [1, m]) }));
    const top = collect(topCells.map((c) => c.value));
    const final = reduceFraction(top, bottom);
    return { kind: 'mono', multiplier, bottom, denCell: { raw: [q, m * m], value: [bottom, 1] }, topCells, top, topParts: partsOf(top), final, finalParts: partsOf(final.terms) };
  }
  if (item.kind === 'binomial') {
    const [t1, t2] = item.den;
    const conj = [t1, negate(t2)];
    const firstSq = t1[0] * t1[0] * t1[1];
    const secondSq = t2[0] * t2[0] * t2[1];
    const bottom = firstSq - secondSq;
    const denCells = [t1, t2].map((a) => conj.map((b) => ({ raw: multiplyRaw(a, b), value: multiply(a, b) })));
    const topCells = item.num.map((a) => conj.map((b) => ({ raw: multiplyRaw(a, b), value: multiply(a, b) })));
    const top = collect(topCells.flat().map((c) => c.value));
    const final = reduceFraction(top, bottom);
    return { kind: 'binomial', conj, firstSq, secondSq, bottom, denCells, topCells, top, topParts: partsOf(top), final, finalParts: partsOf(final.terms) };
  }
  throw new Error(`unknown kind "${item.kind}"`);
}

/** The question as KaTeX. */
export function rationaliseQuestionLatex(item) {
  const bracket = (ts) => `\\left(${sumLatex(ts)}\\right)`;
  if (item.kind === 'expand') {
    const same = item.left.every((t, i) => t[0] === item.right[i][0] && t[1] === item.right[i][1]);
    if (same && item.square) return `${bracket(item.left)}^2`;
    return `${bracket(item.left)}${bracket(item.right)}`;
  }
  if (item.kind === 'mono') return `\\dfrac{${sumLatex(item.num)}}{${termLatex(item.den)}}`;
  if (item.kind === 'binomial') return `\\dfrac{${sumLatex(item.num)}}{${sumLatex(item.den)}}`;
  return '?';
}

/**
 * The four "multiply top and bottom by…" options for a rationalise item, each
 * with why it works or fails. Derived from the denominator, so the conjugate
 * is always right and the traps are always the same three mistakes.
 */
export function multiplierOptions(item) {
  if (item.kind === 'mono') {
    const [, m] = item.den;
    const root = termLatex([1, m]);
    return [
      { id: 'root', correct: true, latex: `\\dfrac{${root}}{${root}}`, why: `$${root} \\times ${root} = ${m}$, so the bottom becomes a whole number — and $\\dfrac{${root}}{${root}} = 1$, so the value does not change.` },
      { id: 'bottom', correct: false, latex: `\\dfrac{1}{${root}}`, why: `That is not equal to 1, so it changes the value of the fraction. Whatever you do to the bottom you must do to the top.` },
      { id: 'number', correct: false, latex: `\\dfrac{${m}}{${m}}`, why: `$\\dfrac{${m}}{${m}} = 1$, so the value is safe — but the bottom is still $${m} \\times$ a surd. Only a root multiplies a root into a whole number.` },
      { id: 'topOnly', correct: false, latex: `\\dfrac{${root}}{1}`, why: `That multiplies the top only, so it changes the value — and the surd on the bottom has not moved.` },
    ];
  }
  if (item.kind === 'binomial') {
    const d = deriveRationalise(item);
    const den = sumLatex(item.den);
    const conj = sumLatex(d.conj);
    const surd = item.den.find(([, r]) => r > 1);
    const root = termLatex([1, surd[1]]);
    return [
      { id: 'conj', correct: true, latex: `\\dfrac{${conj}}{${conj}}`, why: `Change the sign in the middle. $(${den})(${conj})$ is a difference of two squares, so the two surd terms cancel and the bottom is a whole number.` },
      { id: 'same', correct: false, latex: `\\dfrac{${den}}{${den}}`, why: `The bottom becomes $(${den})^2$. Squaring a bracket gives a middle term that still has a surd in it — nothing cancels.` },
      { id: 'root', correct: false, latex: `\\dfrac{${root}}{${root}}`, why: `That clears a single surd, but this bottom is a SUM. The whole-number term becomes a surd term, so a surd is still left on the bottom.` },
      { id: 'bottomOnly', correct: false, latex: `\\dfrac{1}{${conj}}`, why: `Right bracket, but on the bottom only — that is not equal to 1, so it changes the value. The top must be multiplied too.` },
    ];
  }
  return [];
}

/** Problems with Rationalise It items, as strings. */
export function checkRationaliseItems(items) {
  const out = [];
  const ids = new Set();
  for (const [i, item] of (items || []).entries()) {
    const at = `item ${item?.id || i + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    try {
      if (item.kind === 'expand') {
        if (![item.left, item.right].every((b) => Array.isArray(b) && b.length === 2 && b.every(termOk))) { out.push(`${at}: left and right must each be two [k, r] terms`); continue; }
        const d = deriveRationalise(item);
        if (d.parts.radicands > 1) out.push(`${at}: the expansion has two different surds — the answer boxes take one`);
      } else if (item.kind === 'mono') {
        if (!Array.isArray(item.num) || !item.num.length || !item.num.every(termOk)) { out.push(`${at}: num must be a list of [k, r] terms`); continue; }
        if (!termOk(item.den) || item.den[1] < 2 || isSquare(item.den[1])) { out.push(`${at}: den must be [q, m] with m > 1 not a square`); continue; }
        const d = deriveRationalise(item);
        if (d.topParts.radicands > 1) out.push(`${at}: the top has two different surds after multiplying — the answer boxes take one`);
        if (d.finalParts.radicands > 1) out.push(`${at}: the answer has two different surds`);
      } else if (item.kind === 'binomial') {
        if (!Array.isArray(item.num) || !item.num.length || !item.num.every(termOk)) { out.push(`${at}: num must be a list of [k, r] terms`); continue; }
        if (!Array.isArray(item.den) || item.den.length !== 2 || !item.den.every(termOk)) { out.push(`${at}: den must be two [k, r] terms`); continue; }
        const surds = item.den.filter(([, r]) => r > 1);
        if (surds.length !== 1 || !isSquareFree(surds[0][1])) { out.push(`${at}: den needs exactly one simplest surd term and one whole number`); continue; }
        const d = deriveRationalise(item);
        if (d.bottom === 0) out.push(`${at}: the bottom becomes 0`);
        if (d.topParts.radicands > 1) out.push(`${at}: the top has two different surds after multiplying`);
        if (d.finalParts.radicands > 1) out.push(`${at}: the answer has two different surds`);
      } else {
        out.push(`${at}: kind must be expand, mono or binomial`);
        continue;
      }
      if (item.form) {
        const d = deriveRationalise(item);
        const parts = { int: d.finalParts.int, surd: d.finalParts.surdCoef, den: d.final.den };
        for (const [letter, part] of Object.entries(item.form)) {
          if (letter === 'latex') continue;
          if (typeof part === 'number') continue;
          if (!['int', 'surd', 'den'].includes(part)) out.push(`${at}: form letter ${letter} must map to int, surd or den`);
        }
        if (typeof item.form.surd === 'number' && item.form.surd !== parts.surd) out.push(`${at}: the form prints ${item.form.surd}√ but the simplified answer has ${parts.surd}√`);
        if (!item.form.latex) out.push(`${at}: form needs latex`);
      }
    } catch (e) {
      out.push(`${at}: ${e.message}`);
    }
  }
  return out;
}
