// src/utils/expGraphs.js
//
// Graphs and inverses of exponential and logarithmic functions — the pure
// parts behind the three Exp Graph Lab tasks (src/tasks/ExpGraphLab.jsx), built
// for ADD_MATH AM_5D (coursebook sections 5.9, 5.10 and 5.11):
//
//   · Move the Curve    (CURVE_FAMILY)  what a constant k does to a family —
//                                       predicted BEFORE the slider moves (5.9)
//   · Sketch the Curve  (EXP_SKETCH)    y = k·e^(nx) + a or y = k·ln(ax + b),
//                                       one decision at a time, then drawn (5.10)
//   · Find the Inverse  (FN_INVERSE)    swap, rearrange one move at a time,
//                                       state the domain (5.11)
//
// THE RULE (same as modulus.js, cubic.js, logs.js, circle.js): an item stores
// the QUESTION and everything else is derived here — the intercepts as exact
// expressions (½ ln 2, with a 3 s.f. value beside it), the asymptote and the
// side of it the curve lives on, every move of the rearrangement, the domain
// of the inverse, the windows the figures are drawn in. No answer key is
// authored, so none can drift, and `checkExpItems` refuses an item a student
// could not finish on the screen.
//
// ITEM SHAPES
//   a function (sketch, inverse)
//     { id, level?, kind: 'exp', k, n, a, order?, note? }   y = k·e^(nx) + a
//     { id, level?, kind: 'ln',  k, a, b, note? }           y = k·ln(ax + b)
//       Numbers are whole numbers or strings like '1/2'. `order: 'const'`
//       prints a negative-k exponential constant first: 8 − 3e^(−4x).
//   a family (family)
//     { id, level?, family, from, to, ask }
//       `family` is a key of FAMILIES; the curve is drawn with k = `from`, and
//       the question is asked about k = `to`. `ask` is one of ASKS.
//
// Exact arithmetic for everything a student types: rationals are {n, d}
// (linearEquation.js), and an exact logarithm is { c, m }, meaning c·ln(m).

import { fr, add, sub, mul, div, neg, isZero, frEq, toNumber } from './linearEquation.js';
import { parseNum, frTex, frText } from './lineLab.js';

export const EXP_MODES = ['family', 'sketch', 'inverse'];
export const CURVE_KINDS = ['exp', 'ln'];

const MINUS = '−';

// ------------------------------------------------------------------ numbers

const F = (v) => {
  const f = parseNum(v);
  if (!f) throw new Error(`"${v}" is not a number`);
  return f;
};
const isInt = (f) => f.d === 1;
const ONE = fr(1);
const abs = (f) => fr(Math.abs(f.n), f.d);

/** A typed number (whole, decimal or a fraction like 3/2), or null. */
export const typedNumber = (v) => parseNum(String(v ?? '').trim());

/** What a student types for a value: "-7/5". */
export const typedOf = (f) => (f.d === 1 ? String(f.n) : `${f.n}/${f.d}`);

/** Three significant figures, as the exam asks for them: 0.347, −1.61, 2.08. */
export const sf3 = (v) => String(Number(v.toPrecision(3)));

// ------------------------------------------------------------------ the two curves

/** The function an item describes, with exact coefficients. */
export function curveOf(item) {
  if (item?.kind === 'exp') return { kind: 'exp', k: F(item.k ?? 1), n: F(item.n ?? 1), a: F(item.a ?? 0), order: item.order };
  if (item?.kind === 'ln') return { kind: 'ln', k: F(item.k ?? 1), a: F(item.a ?? 1), b: F(item.b ?? 0) };
  throw new Error(`kind "${item?.kind}" — ${CURVE_KINDS.join(' or ')}`);
}

/** y as a number; NaN where a log does not exist. */
export function fnOf(c) {
  const k = toNumber(c.k);
  if (c.kind === 'exp') {
    const n = toNumber(c.n);
    const a = toNumber(c.a);
    return (x) => k * Math.exp(n * x) + a;
  }
  const a = toNumber(c.a);
  const b = toNumber(c.b);
  return (x) => (a * x + b > 0 ? k * Math.log(a * x + b) : NaN);
}

// ------------------------------------------------------------------ printing (KaTeX)

/** A number written in front of e or ln: '', '-', '3', '\tfrac{1}{2}'. */
const coefTex = (f) => {
  if (f.d === 1) return f.n === 1 ? '' : f.n === -1 ? '-' : String(f.n);
  return `${f.n < 0 ? '-' : ''}\\tfrac{${Math.abs(f.n)}}{${f.d}}`;
};
/** f·v as it is written in a power or a bracket: x, -x, 3x, \frac{x}{2}. */
const multTex = (f, v) => {
  if (f.d === 1) return `${f.n === 1 ? '' : f.n === -1 ? '-' : f.n}${v}`;
  return `${f.n < 0 ? '-' : ''}\\frac{${Math.abs(f.n) === 1 ? '' : Math.abs(f.n)}${v}}{${f.d}}`;
};
/** A constant that follows something: ' + 3', ' - 6', ''. */
const tailTex = (f) => (isZero(f) ? '' : ` ${f.n < 0 ? '-' : '+'} ${frTex(abs(f))}`);

const expTex = (c, v = 'x') => {
  const eTerm = `e^{${multTex(c.n, v)}}`;
  if (c.order === 'const' && c.k.n < 0 && !isZero(c.a)) return `${frTex(c.a)} - ${coefTex(abs(c.k))}${eTerm}`;
  return `${coefTex(c.k)}${eTerm}${tailTex(c.a)}`;
};
/** The inside of the log: ax + b, written b − |a|x when a is negative. */
const innerTex = (c, v = 'x') => {
  if (isZero(c.b)) return multTex(c.a, v);
  if (c.a.n < 0 && c.b.n > 0) return `${frTex(c.b)} - ${multTex(abs(c.a), v)}`;
  return `${multTex(c.a, v)}${tailTex(c.b)}`;
};
const lnTex = (c, v = 'x') => {
  const bare = isZero(c.b) && c.a.n > 0 && isInt(c.a);      // ln x, ln 3x
  return `${coefTex(c.k)}\\ln${bare ? ` ${innerTex(c, v)}` : `(${innerTex(c, v)})`}`;
};

/** The right-hand side of the function, in the variable `v`. */
export const curveTex = (c, v = 'x') => (c.kind === 'exp' ? expTex(c, v) : lnTex(c, v));

// ------------------------------------------------------------------ printing (plain text)
// Wrong-answer messages and SVG labels are ordinary text, so powers are set
// with Unicode superscripts: 3e²ˣ − 6.

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻', x: 'ˣ', y: 'ʸ' };
const VULGAR = { '1/2': '½', '1/3': '⅓', '2/3': '⅔', '1/4': '¼', '3/4': '¾', '1/5': '⅕' };

/** A number in front of e or ln, as text: '', '−', '3', '½'. */
const coefText = (f) => {
  if (f.d === 1) return f.n === 1 ? '' : f.n === -1 ? MINUS : frText(f);
  const mag = `${Math.abs(f.n)}/${f.d}`;
  return `${f.n < 0 ? MINUS : ''}${VULGAR[mag] || `(${mag})`}`;
};
const multText = (f, v) => {
  if (f.d === 1) return `${f.n === 1 ? '' : f.n === -1 ? MINUS : frText(f)}${v}`;
  return `${f.n < 0 ? MINUS : ''}${Math.abs(f.n) === 1 ? '' : Math.abs(f.n)}${v}/${f.d}`;
};
const tailText = (f) => (isZero(f) ? '' : ` ${f.n < 0 ? MINUS : '+'} ${frText(abs(f))}`);
/** e to a power of n·v: eˣ, e⁻²ˣ, e^(x/2). */
const ePowText = (n, v = 'x') => {
  if (n.d !== 1) return `e^(${multText(n, v)})`;
  const raw = `${n.n === 1 ? '' : n.n === -1 ? '-' : n.n}${v}`;
  return `e${raw.split('').map((ch) => SUP[ch] ?? ch).join('')}`;
};
const expText = (c, v = 'x') => {
  if (c.order === 'const' && c.k.n < 0 && !isZero(c.a)) return `${frText(c.a)} ${MINUS} ${coefText(abs(c.k))}${ePowText(c.n, v)}`;
  return `${coefText(c.k)}${ePowText(c.n, v)}${tailText(c.a)}`;
};
const innerText = (c, v = 'x') => {
  if (isZero(c.b)) return multText(c.a, v);
  if (c.a.n < 0 && c.b.n > 0) return `${frText(c.b)} ${MINUS} ${multText(abs(c.a), v)}`;
  return `${multText(c.a, v)}${tailText(c.b)}`;
};
const lnText = (c, v = 'x') => {
  const co = coefText(c.k);
  const bare = isZero(c.b) && c.a.n > 0 && isInt(c.a);
  return `${co}${co && co !== MINUS ? ' ' : ''}ln${bare ? ` ${innerText(c, v)}` : `(${innerText(c, v)})`}`;
};
export const curveText = (c, v = 'x') => (c.kind === 'exp' ? expText(c, v) : lnText(c, v));

// ------------------------------------------------------------------ exact logarithms

/** c·ln(m) as a number. */
export const logValue = (v) => toNumber(v.c) * Math.log(toNumber(v.m));

/**
 * Is c₁·ln(m₁) exactly c₂·ln(m₂)? Both sides are raised to whole-number
 * powers, so ½ ln 4, ln 2 and −ln ½ all compare equal with no rounding:
 * m₁^(p₁q₂) = m₂^(p₂q₁) for c = p/q.
 */
export function sameLog(v, w) {
  if (!(v.m.n > 0) || !(w.m.n > 0)) return false;
  const e1 = v.c.n * w.c.d;
  const e2 = w.c.n * v.c.d;
  if (Math.abs(e1) > 400 || Math.abs(e2) > 400) return Math.abs(logValue(v) - logValue(w)) < 1e-12;
  const pow = (m, e) => {
    const [top, bottom] = e >= 0 ? [m.n, m.d] : [m.d, m.n];
    const E = BigInt(Math.abs(e));
    return [BigInt(top) ** E, BigInt(bottom) ** E];
  };
  const [a, b] = pow(v.m, e1);
  const [c, d] = pow(w.m, e2);
  return a * d === c * b;
}

/** The ln of a number below 1 is written the other way up: ln ½ = −ln 2, −ln(2/5) = ln(5/2). */
export function tidyLog(v) {
  if (v.m.n < v.m.d) return { c: neg(v.c), m: fr(v.m.d, v.m.n) };
  return v;
}

/** c·ln(m) as KaTeX: \tfrac{1}{2}\ln 2, -\ln 2, \ln\tfrac{5}{2}. */
export function logTex(v) {
  const arg = isInt(v.m) ? String(v.m.n) : `\\tfrac{${v.m.n}}{${v.m.d}}`;
  return `${coefTex(v.c)}\\ln ${arg}`;
}
/** c·ln(m) as text for SVG labels: ½ ln 2, −ln 2, ln(5/2). */
export function logText(v) {
  const co = coefText(v.c);
  const arg = isInt(v.m) ? ` ${v.m.n}` : `(${v.m.n}/${v.m.d})`;
  return `${co}${co && co !== MINUS ? ' ' : ''}ln${arg}`;
}

// ------------------------------------------------------------------ the facts of a sketch

/**
 * Everything a sketch of the curve shows. Works for every curve of the two
 * shapes, including the plain families of section 5.9 (a = 0, or b = 0).
 *
 *   exp   yInt (a rational), crossesX, xInt (an exact log, or null),
 *         asym { line: 'y', value }, side 'above' | 'below'
 *   ln    crossesY, yInt (an exact log, or null), xIntFr (a rational),
 *         asym { line: 'x', value }, side 'right' | 'left'
 *   both  shape 'rises' | 'falls', stages, questionLatex
 */
export function sketchModel(item) {
  const c = curveOf(item);
  if (c.kind === 'exp') {
    const ratio = div(neg(c.a), c.k);                     // e^(nx) = −a/k
    const crossesX = ratio.n > 0;
    const xInt = crossesX ? { c: div(ONE, c.n), m: ratio } : null;
    return {
      mode: 'sketch', kind: 'exp', curve: c, ratio,
      crossesY: true, yInt: add(c.k, c.a),
      crossesX, xInt, xIntValue: crossesX ? logValue(xInt) : null,
      asym: { line: 'y', value: c.a },
      side: c.k.n > 0 ? 'above' : 'below',
      shape: c.k.n * c.n.n > 0 ? 'rises' : 'falls',
      stages: ['yint', 'xcross', 'asym', 'shape'],
      questionLatex: `y = ${expTex(c)}`, text: expText(c),
    };
  }
  const x0 = div(neg(c.b), c.a);                          // the bracket is 0
  const x1 = div(sub(ONE, c.b), c.a);                     // the bracket is 1
  const crossesY = c.b.n > 0;
  const yInt = crossesY ? { c: c.k, m: c.b } : null;
  return {
    mode: 'sketch', kind: 'ln', curve: c,
    crossesY, yInt, yIntValue: crossesY ? logValue(yInt) : null,
    crossesX: true, xIntFr: x1, xIntValue: toNumber(x1),
    asym: { line: 'x', value: x0 },
    side: c.a.n > 0 ? 'right' : 'left',
    shape: c.k.n * c.a.n > 0 ? 'rises' : 'falls',
    stages: ['ycross', 'xint', 'asym', 'shape'],
    questionLatex: `y = ${lnTex(c)}`, text: lnText(c),
  };
}

// ------------------------------------------------------------------ judging a sketch

const signed = (f) => `${f.n < 0 ? MINUS : '+'} ${frText(abs(f))}`;
/** A constant named in a sentence: the +3, the −1. */
const tight = (f) => `${f.n < 0 ? MINUS : '+'}${frText(abs(f))}`;

/** The y-intercept of an exponential curve: one typed number. */
export function judgeYInt(model, text) {
  const got = typedNumber(text);
  const { k, n, a } = model.curve;
  if (got && frEq(got, model.yInt)) return { ok: true };
  const eTerm = `${coefText(k)}${ePowText(n)}`;
  let why = `Put x = 0 into ${model.text}. What is e⁰?`;
  if (got) {
    if (!isZero(a) && frEq(got, a) && !isZero(k)) {
      why = `${frText(a)} is only the constant. e⁰ is 1, not 0, so at x = 0 the term ${eTerm} is worth ${frText(k)}, not nothing.`;
    } else if (!isZero(a) && frEq(got, k)) {
      why = `${frText(k)} is only the term ${eTerm} at x = 0. The constant ${frText(a)} still has to be added on.`;
    } else if (frEq(got, neg(model.yInt)) || frEq(got, sub(k, a)) || frEq(got, sub(a, k))) {
      why = `Check the signs. At x = 0 the term ${eTerm} is ${frText(k)}, and then comes ${signed(a)}.`;
    } else if (!frEq(n, ONE) && frEq(got, add(mul(k, n), a))) {
      why = `The ${frText(n)} in the power is multiplied by x = 0, so it disappears: the power is 0 and e⁰ = 1.`;
    } else if (isZero(got)) {
      why = `y = 0 is the x-axis. Put x = 0 into ${model.text} and work out y.`;
    }
  }
  return { ok: false, why };
}

/** "Does it cross this axis?" — a yes or no, with the reason either way. */
export function judgeCross(model, pick) {
  const { curve } = model;
  if (model.kind === 'exp') {
    const want = model.crossesX ? 'yes' : 'no';
    const eq = `${ePowText(curve.n)} = ${frText(model.ratio)}`;
    const lead = isZero(curve.a)
      ? `Put y = 0: ${coefText(curve.k)}${ePowText(curve.n)} = 0, so ${eq}.`
      : `Put y = 0: ${coefText(curve.k)}${ePowText(curve.n)} = ${frText(neg(curve.a))}${frEq(curve.k, ONE) ? '' : `, so ${eq}`}.`;
    const why = model.crossesX
      ? `${lead} ${frText(model.ratio)} is positive, and a power of e can be any positive number, so there is a solution: the curve crosses the x-axis.`
      : `${lead} A power of e is always positive, so it can never equal ${frText(model.ratio)}. No solution: the curve stays ${model.side} the x-axis and never reaches it.`;
    return { ok: pick === want, want, why };
  }
  const want = model.crossesY ? 'yes' : 'no';
  const b = curve.b;
  const why = model.crossesY
    ? `Put x = 0: the inside of the log is ${frText(b)}. That is positive, so its ln exists, and the curve crosses the y-axis.`
    : `Put x = 0: the inside of the log is ${frText(b)}. The ln of ${isZero(b) ? 'zero' : 'a negative number'} does not exist, so the curve never reaches the y-axis.`;
  return { ok: pick === want, want, why };
}

/** A typed exact log, [coef] ln [arg]. An empty coefficient box means 1. */
export function typedLog(coefText_, argText) {
  const raw = String(coefText_ ?? '').trim().replace(/[−–]/g, '-');
  const c = raw === '' || raw === '+' ? ONE : raw === '-' ? fr(-1) : typedNumber(raw);
  const m = typedNumber(argText);
  if (!c || !m) return null;
  return { c, m };
}

/**
 * The exact crossing: the x-intercept of an exponential, (1/n)·ln(−a/k), or
 * the y-intercept of a log curve, k·ln b. Any equal form is right.
 */
export function judgeLog(model, coefTyped, argTyped) {
  const got = typedLog(coefTyped, argTyped);
  const { curve } = model;
  if (!got) return { ok: false, why: 'Type a number in each box. Leave the first box empty if nothing multiplies the ln.' };
  if (!(got.m.n > 0)) return { ok: false, why: 'The ln of zero or of a negative number does not exist. The number inside the ln must be positive.' };
  if (model.kind === 'exp') {
    const want = model.xInt;
    if (sameLog(got, want)) return { ok: true };
    const { k, n, a } = curve;
    const pow = ePowText(n);
    const nx = multText(n, 'x');
    let why = `Get the power of e on its own, ${pow} = a number, then take ln of both sides${frEq(n, ONE) ? '' : ` and deal with the ${frText(n)} in the power`}.`;
    if (!frEq(n, ONE) && sameLog(got, { c: ONE, m: want.m })) {
      why = `ln gives you the whole power: ${nx} = ln ${frText(want.m)}. ${frEq(n, fr(-1)) ? 'Change the sign of both sides to get x.' : `You still have to ${isInt(n) ? `divide by ${frText(n)}` : `multiply by ${frText(div(ONE, n))}`} to get x.`}`;
    } else if (!frEq(n, ONE) && !frEq(n, fr(-1)) && sameLog(got, { c: n, m: want.m })) {
      why = `${nx} = ln ${frText(want.m)}, so x is that DIVIDED by ${frText(n)}, not multiplied.`;
    } else if (sameLog(got, { c: neg(want.c), m: want.m })) {
      why = `Right size, wrong sign. ${pow} = ${frText(want.m)} gives ${nx} = ln ${frText(want.m)}${frEq(n, ONE) ? '' : '; keep the sign of the number in the power when you divide'}.`;
    } else if (!frEq(k, ONE) && neg(a).n > 0 && frEq(got.m, neg(a))) {
      why = `Divide by ${frText(k)} before you take ln: ${coefText(k)}${pow} = ${frText(neg(a))} gives ${pow} = ${frText(want.m)}.`;
    } else if (frEq(got.m, abs(a)) || frEq(got.m, abs(k))) {
      why = `Put y = 0 and move the constant across first: ${coefText(k)}${pow} = ${frText(neg(a))}. Then get ${pow} on its own.`;
    }
    return { ok: false, why };
  }
  const want = model.yInt;
  if (sameLog(got, want)) return { ok: true };
  const { k, a, b } = curve;
  let why = 'Put x = 0 inside the bracket, and keep the number in front of ln.';
  if (!frEq(k, ONE) && sameLog(got, { c: ONE, m: b })) {
    why = `The inside is right. Do not lose the ${frText(k)} in front: it multiplies the ln.`;
  } else if (frEq(got.m, b) && frEq(got.c, neg(k))) {
    why = `Check the sign in front of the ln: the function is ${model.text}.`;
  } else if (add(a, b).n > 0 && frEq(got.m, add(a, b))) {
    why = `That is the inside at x = 1. On the y-axis x is 0, so the ${multText(a, 'x')} term is 0.`;
  } else if (frEq(got.m, abs(a)) && !frEq(abs(a), b)) {
    why = `${frText(a)} multiplies x, and x is 0 on the y-axis. What is left inside the bracket?`;
  }
  return { ok: false, why };
}

/** The x-intercept of a log curve: one typed number, (1 − b)/a. */
export function judgeXInt(model, text) {
  const got = typedNumber(text);
  const { a, b } = model.curve;
  if (got && frEq(got, model.xIntFr)) return { ok: true };
  const inner = innerText(model.curve);
  let why = `The ln of something is 0 only when that something is 1, because e⁰ = 1. Solve ${inner} = 1.`;
  if (got) {
    if (frEq(got, model.asym.value)) {
      why = `${frText(got)} makes the inside of the log 0, and ln 0 does not exist: that is the asymptote. The curve crosses the x-axis where the inside is 1, because ln 1 = 0.`;
    } else if (!frEq(a, ONE) && frEq(got, sub(ONE, b))) {
      why = `${inner} = 1 gives ${multText(a, 'x')} = ${frText(sub(ONE, b))}. Now divide by ${frText(a)}.`;
    } else if (frEq(got, neg(model.xIntFr))) {
      why = `Right size, wrong sign. ${inner} = 1 gives ${multText(a, 'x')} = ${frText(sub(ONE, b))}.`;
    } else if (frEq(got, div(ONE, a)) && !isZero(b)) {
      why = `Do not forget the ${tight(b)} inside the bracket: solve ${inner} = 1.`;
    }
  }
  return { ok: false, why };
}

/**
 * The asymptote: which kind of line, its number, and which side of it the
 * curve lives on. Returns a mark for each part and the most useful thing to say.
 */
export function judgeAsym(model, { line, value, side }) {
  const got = typedNumber(value);
  const { curve } = model;
  const want = model.asym;
  const marks = { line: line === want.line, value: !!got && frEq(got, want.value), side: side === model.side };
  if (marks.line && marks.value && marks.side) return { ok: true, marks };
  let why;
  if (model.kind === 'exp') {
    const { k, n, a } = curve;
    const dies = n.n > 0 ? `${MINUS}∞` : '+∞';
    if (!marks.line) {
      why = `The asymptote of an exponential curve is a horizontal line, y = a number. As x → ${dies} the term ${coefText(k)}${ePowText(n)} shrinks to nothing, and y settles towards what is left.`;
      marks.value = false;
    } else if (!marks.value) {
      why = `As x → ${dies}, ${ePowText(n)} → 0. What does y settle towards?`;
      if (got) {
        if (frEq(got, model.yInt)) why = `${frText(got)} is the y-intercept. The asymptote is what is left of ${model.text} when the term ${coefText(k)}${ePowText(n)} has shrunk to nothing.`;
        else if (isZero(got) && !isZero(a)) why = `y = 0 is the asymptote of y = eˣ itself. Here there is a ${tight(a)}, which moves the whole curve, asymptote included.`;
        else if (frEq(got, k) && !frEq(k, a)) why = `${frText(k)} multiplies ${ePowText(n)}, and that term shrinks to nothing. What number is left?`;
        else if (frEq(got, neg(a))) why = `Check the sign: the constant in ${model.text} is ${frText(a)}.`;
      }
    } else {
      why = `${coefText(k)}${ePowText(n)} is always ${k.n > 0 ? 'positive' : 'negative'}, so y is always ${k.n > 0 ? 'more' : 'less'} than ${frText(a)}. Which side of the line is that?`;
    }
    return { ok: false, marks, why };
  }
  const { a, b } = curve;
  const inner = innerText(curve);
  if (!marks.line) {
    why = `The asymptote of a log curve is a vertical line, x = a number: the value of x where the inside of the log reaches 0.`;
    marks.value = false;
  } else if (!marks.value) {
    why = `A log exists only when its inside is positive. The asymptote is the edge of that: where ${inner} = 0.`;
    if (got) {
      if (frEq(got, model.xIntFr)) why = `${frText(got)} is the x-intercept, where the inside of the log is 1. The asymptote is where the inside is 0.`;
      else if (frEq(got, neg(want.value)) && !isZero(want.value)) why = `Check the sign. ${inner} = 0 gives ${multText(a, 'x')} = ${frText(neg(b))}.`;
      else if (!frEq(a, ONE) && frEq(got, neg(b))) why = `${inner} = 0 gives ${multText(a, 'x')} = ${frText(neg(b))}. Now divide by ${frText(a)}.`;
      else if (isZero(got)) why = `x = 0 is the asymptote of y = ln x itself. Here the inside is ${inner}: where is THAT zero?`;
    }
  } else {
    why = `The inside must be positive: ${inner} > 0. Is that the values of x greater than ${frText(want.value)}, or less than it?`;
  }
  return { ok: false, marks, why };
}

/** Rises or falls from left to right — with the reason, shown either way. */
export function judgeShape(model, pick) {
  const { curve } = model;
  let why;
  if (model.kind === 'exp') {
    const { k, n } = curve;
    const grows = n.n > 0;
    why = `As x increases, ${ePowText(n)} ${grows ? 'grows' : 'shrinks'}, because the number in the power is ${grows ? 'positive' : 'negative'}. `
      + (frEq(k, ONE) ? `So y ${model.shape}.`
        : `It is multiplied by ${frText(k)}, a ${k.n > 0 ? 'positive number, which keeps that direction' : 'negative number, which turns it over'}. So y ${model.shape}.`);
  } else {
    const { k, a } = curve;
    const grows = a.n > 0;
    why = `As x increases, the inside ${innerText(curve)} ${grows ? 'grows' : 'shrinks'}, so its ln ${grows ? 'rises' : 'falls'}. `
      + (frEq(k, ONE) ? `So y ${model.shape}.`
        : `It is multiplied by ${frText(k)}, a ${k.n > 0 ? 'positive number, which keeps that direction' : 'negative number, which turns it over'}. So y ${model.shape}.`);
  }
  return { ok: pick === model.shape, want: model.shape, why };
}

/**
 * The finished working for "Copy this into your book". A line is a KaTeX
 * string, or `{ text, tex? }` — a sentence in ordinary type (which can wrap;
 * KaTeX text cannot) with an optional piece of maths after it.
 */
export function sketchWorking(model) {
  const { curve } = model;
  const lines = [model.questionLatex];
  if (model.kind === 'exp') {
    const { k, n, a } = curve;
    const pow = `e^{${multTex(n, 'x')}}`;
    lines.push({ text: 'When x = 0:', tex: `y = ${coefTex(k) === '' ? '' : coefTex(k) === '-' ? '-' : `${coefTex(k)} \\times `}1${tailTex(a)} = ${frTex(model.yInt)}` });
    if (model.crossesX) {
      const lead = frEq(k, ONE) ? `${pow} = ${frTex(model.ratio)}` : `${coefTex(k)}${pow} = ${frTex(neg(a))},\\quad ${pow} = ${frTex(model.ratio)}`;
      lines.push({ text: 'When y = 0:', tex: lead });
      const tidy = tidyLog(model.xInt);
      const forms = [logTex(model.xInt)];
      if (tidy !== model.xInt) forms.push(logTex(tidy));
      lines.push(`${frEq(n, ONE) ? '' : `${multTex(n, 'x')} = \\ln ${isInt(model.ratio) ? model.ratio.n : `\\tfrac{${model.ratio.n}}{${model.ratio.d}}`},\\quad `}x = ${forms.join(' = ')} \\approx ${sf3(model.xIntValue)}`);
    } else {
      const lead = frEq(k, ONE) ? `${pow} = ${frTex(model.ratio)}` : `${coefTex(k)}${pow} = ${frTex(neg(a))},\\quad ${pow} = ${frTex(model.ratio)}`;
      lines.push({ text: 'When y = 0:', tex: lead });
      lines.push({ text: `A power of e is never ${isZero(model.ratio) ? 'zero' : 'negative'}, so the curve does not cross the x-axis.` });
    }
    lines.push({ text: `As x → ${n.n > 0 ? `${MINUS}∞` : '+∞'}, the e term → 0, so the asymptote is`, tex: `y = ${frTex(a)}` });
    lines.push({ text: `The curve is ${model.side} its asymptote and ${model.shape} from left to right.` });
    return lines;
  }
  const { k } = curve;
  const inner = innerTex(curve);
  const x0 = model.asym.value;
  lines.push({ text: 'The inside of the log must be positive:' });
  lines.push(`${inner} > 0 \\ \\Rightarrow\\ x ${model.side === 'right' ? '>' : '<'} ${frTex(x0)}`);
  lines.push({ text: 'The edge of that is the asymptote,', tex: `x = ${frTex(x0)}` });
  if (model.crossesY) {
    const zero = isZero(model.yInt.c) || frEq(model.yInt.m, ONE);
    lines.push({ text: 'When x = 0:', tex: `y = ${logTex(model.yInt)}${zero ? ' = 0' : ` \\approx ${sf3(model.yIntValue)}`}` });
  } else {
    lines.push({ text: `When x = 0 the inside is ${frText(curve.b)}, which has no ln, so the curve does not cross the y-axis.` });
  }
  lines.push({ text: 'When y = 0:', tex: `${frEq(k, ONE) ? '' : `\\ln(${inner}) = 0,\\quad `}${inner} = 1,\\quad x = ${frTex(model.xIntFr)}` });
  lines.push({ text: `The curve is to the ${model.side} of its asymptote and ${model.shape} from left to right.` });
  return lines;
}

// ------------------------------------------------------------------ drawing: the sketch window

export const SKETCH_BOX = { W: 560, H: 380, PAD: 36 };

/**
 * A window the whole sketch fits in — both axes, the asymptote, every
 * crossing — with the curve leaving through an edge the way a book sketch
 * leaves it. Not to scale: the two axes have different units, and a sketch
 * prints no scale at all.
 */
export function sketchWindow(model) {
  const c = model.curve;
  const k = toNumber(c.k);
  if (model.kind === 'exp') {
    const n = toNumber(c.n);
    const a = toNumber(c.a);
    const ti = model.crossesX ? Math.log(toNumber(model.ratio)) : 0;     // n·x at the crossing
    const keys = [0, a, k + a];
    const lo = Math.min(...keys);
    const hi = Math.max(...keys);
    const span = Math.max(hi - lo, 1e-6);
    const yMin = lo - (k > 0 ? 0.32 : 0.9) * span;
    const yMax = hi + (k > 0 ? 0.9 : 0.32) * span;
    const tExit = Math.log(((k > 0 ? yMax : yMin) - a) / k);             // where the curve leaves
    const tLo = Math.min(0, ti) - 2.4;
    const tHi = Math.max(tExit + 0.3, Math.max(0, ti) + 0.5);
    const xs = [tLo / n, tHi / n];
    return { xMin: Math.min(...xs), xMax: Math.max(...xs), yMin, yMax };
  }
  const a = toNumber(c.a);
  const b = toNumber(c.b);
  const uHi = b > 0 ? Math.max(3, 1.4 * b) : 3.2;                        // how far along the inside is shown
  const x0 = -b / a;
  const xEnd = (uHi - b) / a;
  const keys = [0, x0, xEnd];
  const lo = Math.min(...keys);
  const hi = Math.max(...keys);
  const span = hi - lo;
  const M = 1.25 * Math.abs(k) * Math.log(uHi);
  return { xMin: lo - 0.14 * span, xMax: hi + 0.14 * span, yMin: -M, yMax: M };
}

/** Pixel maps for a window inside a box. */
export function scalesOf(win, box) {
  const { W, H, PAD } = box;
  return {
    X: (x) => PAD + ((x - win.xMin) / (win.xMax - win.xMin)) * (W - PAD * 2),
    Y: (y) => PAD + ((win.yMax - y) / (win.yMax - win.yMin)) * (H - PAD * 2),
  };
}

/**
 * Where the labelled things land, in pixels — read by the figure to place its
 * labels and by `checkExpItems` to refuse a sketch whose labels would collide.
 */
export function sketchLayout(model) {
  const win = sketchWindow(model);
  const { X, Y } = scalesOf(win, SKETCH_BOX);
  const px = { axisX: X(0), axisY: Y(0) };
  if (model.kind === 'exp') {
    px.asym = Y(toNumber(model.asym.value));
    px.yInt = Y(toNumber(model.yInt));
    px.xInt = model.crossesX ? X(model.xIntValue) : null;
  } else {
    px.asym = X(toNumber(model.asym.value));
    px.xInt = X(model.xIntValue);
    px.yInt = model.crossesY ? Y(model.yIntValue) : null;
  }
  return { win, X, Y, px };
}

// ------------------------------------------------------------------ drawing: sampled curves

/** One segment clipped to a rectangle (Liang–Barsky), or null when it misses. */
function clipSegment(p, q, w) {
  let t0 = 0;
  let t1 = 1;
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const edges = [[-dx, p[0] - w.xMin], [dx, w.xMax - p[0]], [-dy, p[1] - w.yMin], [dy, w.yMax - p[1]]];
  for (const [den, num] of edges) {
    if (den === 0) { if (num < 0) return null; continue; }
    const t = num / den;
    if (den < 0) { if (t > t1) return null; if (t > t0) t0 = t; } else { if (t < t0) return null; if (t < t1) t1 = t; }
  }
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy], t0 > 0, t1 < 1];
}

/**
 * Points along a curve that cover everything of it inside a window. An
 * exponential is sampled evenly in x; a log curve is sampled evenly in y, so
 * its dive beside the asymptote is as smooth as the rest of it.
 */
export function curvePoints(c, win, steps = 260) {
  const f = fnOf(c);
  const pts = [];
  if (c.kind === 'exp') {
    for (let i = 0; i <= steps; i += 1) {
      const x = win.xMin + ((win.xMax - win.xMin) * i) / steps;
      pts.push([x, f(x)]);
    }
    return pts;
  }
  const k = toNumber(c.k);
  const a = toNumber(c.a);
  const b = toNumber(c.b);
  const pad = (win.yMax - win.yMin) * 0.05;
  for (let i = 0; i <= steps; i += 1) {
    const y = win.yMin - pad + ((win.yMax - win.yMin + 2 * pad) * i) / steps;
    pts.push([(Math.exp(y / k) - b) / a, y]);
  }
  // The flat end of a log curve can run far past the last sampled height.
  const far = a > 0 ? win.xMax : win.xMin;
  const last = pts[k > 0 ? pts.length - 1 : 0];
  if ((a > 0 && last[0] < far) || (a < 0 && last[0] > far)) {
    const extra = [];
    for (let i = 1; i <= 60; i += 1) {
      const x = last[0] + ((far - last[0]) * i) / 60;
      extra.push([x, f(x)]);
    }
    if (k > 0) pts.push(...extra); else pts.unshift(...extra.reverse());
  }
  return pts;
}

/** The mirror image of a set of points in the line y = x. */
export const reflectPoints = (pts) => pts.map(([x, y]) => [y, x]);

/** An SVG path through the points, broken wherever the curve leaves the window. */
export function pathOf(pts, win, X, Y) {
  let d = '';
  let pen = false;
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const p = pts[i];
    const q = pts[i + 1];
    if (![p[0], p[1], q[0], q[1]].every(Number.isFinite)) { pen = false; continue; }
    const hit = clipSegment(p, q, win);
    if (!hit) { pen = false; continue; }
    const [s, e, cutStart, cutEnd] = hit;
    if (!pen || cutStart) d += `M${X(s[0]).toFixed(1)} ${Y(s[1]).toFixed(1)} `;
    d += `L${X(e[0]).toFixed(1)} ${Y(e[1]).toFixed(1)} `;
    pen = !cutEnd;
  }
  return d.trim();
}

// ------------------------------------------------------------------ the inverse

/** (x − a)/k as it is written: x − 7, \dfrac{x − 3}{4}, \dfrac{8 − x}{3}, 2(x − 1). */
function invArg(c) {
  const p = Math.abs(c.k.n);
  const q = c.k.d;
  const negK = c.k.n < 0;
  let tex;
  let text;
  if (!negK) { tex = `x${tailTex(neg(c.a))}`; text = `x${tailText(neg(c.a))}`; }
  else if (isZero(c.a)) { tex = '-x'; text = `${MINUS}x`; }
  else if (c.a.n > 0) { tex = `${frTex(c.a)} - x`; text = `${frText(c.a)} ${MINUS} x`; }
  else { tex = `-x - ${frTex(abs(c.a))}`; text = `${MINUS}x ${MINUS} ${frText(abs(c.a))}`; }
  const topTex = q === 1 ? tex : `${q}(${tex})`;
  const topText = q === 1 ? text : `${q}(${text})`;
  if (p === 1) return { tex: topTex, text: topText, tall: false };
  return { tex: `\\dfrac{${topTex}}{${p}}`, text: `${q === 1 ? `(${text})` : topText}/${p}`, tall: true };
}
const lnWrap = (arg) => (arg.tall ? `\\ln\\left(${arg.tex}\\right)` : `\\ln(${arg.tex})`);

const sayShift = (v) => (v.n > 0 ? `Add ${frText(v)} to both sides` : `Subtract ${frText(abs(v))} from both sides`);
const sayScale = (v) => {
  const inv = div(ONE, v);
  if (!isInt(inv) && isInt(v)) return `Multiply both sides by ${frText(v)}`;
  return `Divide both sides by ${frText(inv)}`;
};
/** The move as the boxes hold it, for "Show me". */
const inputOf = (move) => {
  if (move.type === 'ln' || move.type === 'exp') return { op: move.type, num: '' };
  if (move.type === 'shift') return move.value.n > 0 ? { op: 'add', num: typedOf(move.value) } : { op: 'sub', num: typedOf(abs(move.value)) };
  const inv = div(ONE, move.value);
  if (!isInt(inv) && isInt(move.value)) return { op: 'mul', num: typedOf(move.value) };
  return { op: 'div', num: typedOf(inv) };
};

/** A deterministic shuffle, so an item's options sit in the same order on every visit. */
function shuffled(list, seedText) {
  let h = 2166136261;
  for (const ch of String(seedText)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    const j = Math.abs(h) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Find the Inverse. The three labelled steps of the book — write it as
 * y = …, swap x and y, rearrange — with the rearrangement split into its
 * moves, and the domain of the inverse as a stage of its own.
 *
 *   moves   [{ type: 'shift' | 'scale' | 'ln' | 'exp', value?, say, after }]
 *           `shift` adds `value` to both sides; `scale` multiplies by it.
 *   domain  { rel: 'gt' | 'lt' | 'all', value? }
 */
export function inverseModel(item) {
  const c = curveOf(item);
  const moves = [];
  let swapped;
  let inverseTex;
  let domain;
  let fDomain;
  let options;
  let check;
  if (c.kind === 'exp') {
    const { k, n, a } = c;
    const arg = invArg(c);
    const powY = `e^{${multTex(n, 'y')}}`;
    swapped = `x = ${expTex(c, 'y')}`;
    if (!isZero(a)) moves.push({ type: 'shift', value: neg(a), say: sayShift(neg(a)), after: `x${tailTex(neg(a))} = ${coefTex(k)}${powY}` });
    if (!frEq(k, ONE)) moves.push({ type: 'scale', value: div(ONE, k), say: sayScale(div(ONE, k)), after: `${arg.tex} = ${powY}` });
    moves.push({ type: 'ln', say: 'Take ln of both sides', after: `${lnWrap(arg)} = ${multTex(n, 'y')}` });
    const invN = div(ONE, n);
    inverseTex = `${coefTex(invN)}${lnWrap(arg)}`;
    if (!frEq(n, ONE)) moves.push({ type: 'scale', value: invN, say: sayScale(invN), after: `y = ${inverseTex}` });
    domain = { rel: k.n > 0 ? 'gt' : 'lt', value: a };
    fDomain = { rel: 'all' };
    const flipped = { ...c, n: neg(n) };
    options = [
      { id: 'swap', tex: swapped },
      { id: 'recip', tex: `y = \\dfrac{1}{${expTex(c)}}` },
      { id: 'trade', tex: `y = ${coefTex(k)}\\ln ${isInt(n) && n.n > 0 ? multTex(n, 'x') : `(${multTex(n, 'x')})`}${tailTex(a)}` },
      { id: 'sign', tex: `y = ${expTex(flipped)}` },
    ];
    const f0 = add(k, a);
    check = `f(0) = ${frTex(f0)} \\ \\text{ and } \\ f^{-1}(${frTex(f0)}) = ${coefTex(invN)}\\ln 1 = 0\\ \\checkmark`;
    return finishInverse({ item, c, moves, swapped, inverseTex, domain, fDomain, options, check, argText: arg.text });
  }
  const { k, a, b } = c;
  const invK = div(ONE, k);
  const E = multTex(invK, 'x');
  const pow = `e^{${E}}`;
  const bare = { ...c, k: ONE };
  swapped = `x = ${lnTex(c, 'y')}`;
  if (!frEq(k, ONE)) moves.push({ type: 'scale', value: invK, say: sayScale(invK), after: `${E} = ${lnTex(bare, 'y')}` });
  moves.push({ type: 'exp', say: 'Write both sides as powers of e', after: `${pow} = ${innerTex(c, 'y')}` });
  if (!isZero(b)) moves.push({ type: 'shift', value: neg(b), say: sayShift(neg(b)), after: `${pow}${tailTex(neg(b))} = ${multTex(a, 'y')}` });
  const top = a.n > 0 ? `${pow}${tailTex(neg(b))}` : isZero(b) ? `-${pow}` : `${frTex(b)} - ${pow}`;
  const mag = abs(a);
  inverseTex = frEq(mag, ONE) ? top : `\\dfrac{${top}}{${frTex(mag)}}`;
  if (!frEq(a, ONE)) moves.push({ type: 'scale', value: div(ONE, a), say: sayScale(div(ONE, a)), after: `y = ${inverseTex}` });
  const x0 = div(neg(b), a);
  const x1 = div(sub(ONE, b), a);
  domain = { rel: 'all' };
  fDomain = { rel: a.n > 0 ? 'gt' : 'lt', value: x0 };
  options = [
    { id: 'swap', tex: swapped },
    { id: 'recip', tex: `y = \\dfrac{1}{${lnTex(c)}}` },
    { id: 'trade', tex: `y = ${coefTex(k)}e^{${innerTex(c)}}` },
    { id: 'sign', tex: `y = ${lnTex({ ...c, k: neg(k) })}` },
  ];
  check = `f^{-1}(0) = ${frTex(x1)} \\ \\text{ and } \\ f\\left(${frTex(x1)}\\right) = ${coefTex(k)}\\ln 1 = 0\\ \\checkmark`;
  return finishInverse({ item, c, moves, swapped, inverseTex, domain, fDomain, options, check, argText: null });
}

function finishInverse({ item, c, moves, swapped, inverseTex, domain, fDomain, options, check, argText }) {
  const stages = ['swap', ...moves.map((_, i) => `move${i}`), 'domain'];
  const relTex = (d, v = 'x') => (d.rel === 'all' ? null : `${v} ${d.rel === 'gt' ? '>' : '<'} ${frTex(d.value)}`);
  // The inverse as a function of numbers, for the figure and for the tests.
  const k = toNumber(c.k);
  let inv;
  if (c.kind === 'exp') {
    const n = toNumber(c.n);
    const a = toNumber(c.a);
    inv = (x) => ((x - a) / k > 0 ? Math.log((x - a) / k) / n : NaN);
  } else {
    const a = toNumber(c.a);
    const b = toNumber(c.b);
    inv = (x) => (Math.exp(x / k) - b) / a;
  }
  // One point of f and its mirror image in y = x: where f crosses an axis.
  const hit = frTex(c.kind === 'exp' ? add(c.k, c.a) : div(sub(ONE, c.b), c.a)).replace('\\dfrac', '\\tfrac');
  return {
    mode: 'inverse', kind: c.kind, curve: c, stages, moves, swapped, inverseTex, domain, fDomain, check,
    pairTex: c.kind === 'exp' ? [`(0, ${hit})`, `(${hit}, 0)`] : [`(${hit}, 0)`, `(0, ${hit})`],
    options: shuffled(options, item.id), argText,
    questionLatex: `f(x) = ${curveTex(c)}`, text: curveText(c),
    startLatex: `y = ${curveTex(c)}`,
    fDomainTex: relTex(fDomain), domainTex: relTex(domain),
    rangeTex: c.kind === 'exp' ? `f(x) ${domain.rel === 'gt' ? '>' : '<'} ${frTex(domain.value)}` : null,
    asymF: c.kind === 'exp' ? { line: 'y', value: c.a } : { line: 'x', value: fDomain.value },
    asymInv: c.kind === 'exp' ? { line: 'x', value: c.a } : { line: 'y', value: fDomain.value },
    f: fnOf(c), inv,
  };
}

/** Which of the four "swapped" lines was picked. */
export function judgeSwap(model, id) {
  if (id === 'swap') return { ok: true };
  const why = {
    recip: 'That is 1 ÷ f(x), the reciprocal. The inverse is not "one over f": it is the function that UNDOES f, so x and y trade places.',
    trade: `e and ln undo each other, but you cannot simply trade one for the other: everything else in ${model.text} has to be undone too, and in the reverse order. Swap x and y, then rearrange.`,
    sign: 'Changing a sign reflects the curve in an axis. The inverse is the reflection in the line y = x: x and y trade places.',
  }[id];
  return { ok: false, why: why || 'Swap x and y: every x becomes y, and y becomes x.' };
}

/** A typed move as { type, value }, or null when its number is missing or zero. */
export function moveOf({ op, num }) {
  if (op === 'ln' || op === 'exp') return { type: op };
  const v = typedNumber(num);
  if (!v || isZero(v)) return null;
  if (op === 'add') return { type: 'shift', value: v };
  if (op === 'sub') return { type: 'shift', value: neg(v) };
  if (op === 'mul') return { type: 'scale', value: v };
  if (op === 'div') return { type: 'scale', value: div(ONE, v) };
  return null;
}

const sameMove = (p, q) => p.type === q.type && (p.value === undefined || frEq(p.value, q.value));

/**
 * One move of the rearrangement. `nudge` is true for a move that is legal
 * but out of the book's order (dividing before the constant is cleared): it is
 * turned back without counting as a wrong answer.
 */
export function judgeMove(model, idx, input) {
  const want = model.moves[idx];
  const got = moveOf(input);
  if (!got) return { ok: false, blank: true, why: 'Type the number for that move.' };
  if (sameMove(got, want)) return { ok: true };
  const c = model.curve;
  const isExp = model.kind === 'exp';
  const later = model.moves.findIndex((m, i) => i > idx && sameMove(m, got));
  const pow = isExp ? ePowText(c.n, 'y') : null;
  const inner = isExp ? null : innerText(c, 'y');

  // The opposite tool: e^ on an exponential, ln on a log.
  if ((isExp && got.type === 'exp') || (!isExp && got.type === 'ln')) {
    return { ok: false, why: isExp
      ? 'That is the tool for undoing ln. This equation has a power of e in it, and a power of e is undone by taking ln.'
      : 'That is the tool for undoing a power of e. This equation has ln in it, and ln is undone by writing both sides as powers of e.' };
  }
  // The move that undoes e or ln splits the rearrangement in two: before it
  // the work is around the power of e (or the ln), after it the work is on y.
  const turn = model.moves.findIndex((m) => m.type === 'ln' || m.type === 'exp');
  // A move that belongs later in the working: say what is in its way.
  if (later !== -1) {
    if (isExp && got.type === 'ln') {
      const rhs = want.type === 'shift' ? expText(c, 'y') : `${coefText(c.k)}${pow}`;
      return { ok: false, why: `Not yet. ln undoes e only when the power of e stands alone on its side, and ln(${rhs}) does not simplify. Clear what is around ${pow} first.` };
    }
    if (isExp && later > turn) {
      return { ok: false, why: want.type === 'ln'
        ? `The ${frText(c.n)} is locked inside the power. Take ln first to bring the power down; then you can reach it.`
        : `The ${frText(c.n)} is locked inside the power. Get ${pow} on its own and take ln first; then you can reach it.` };
    }
    if (isExp) {
      // Dividing by k before the constant is cleared is legal: turned back, not marked wrong.
      return { ok: false, nudge: true, why: `You could, but then the ${tight(c.a)} has to be divided as well. Undo things in reverse order: f ${c.a.n > 0 ? 'adds' : 'subtracts'} ${frText(abs(c.a))} LAST, so clear it FIRST.` };
    }
    if (got.type === 'exp') {
      return { ok: false, why: `Not yet. The ln is still multiplied by ${frText(c.k)}, and e to the power ${frText(c.k)} ln(…) is not the bracket. Get ln(${inner}) on its own first.` };
    }
    if (idx > turn) {
      return { ok: false, nudge: true, why: `You could, but then the ${tight(c.b)} has to be divided as well. Clear the ${tight(c.b)} first, then divide.` };
    }
    return { ok: false, why: `The ${got.type === 'shift' ? tight(c.b) : frText(c.a)} is locked inside the ln. ${want.type === 'exp' ? 'Undo the ln first' : 'Get the ln on its own, then undo it'}: write both sides as powers of e.` };
  }
  if (got.type === want.type && got.type === 'shift') {
    const left = isExp ? c.a : c.b;
    if (frEq(got.value, neg(want.value))) return { ok: false, why: `That makes the ${tight(left)} on the right into ${tight(mul(left, fr(2)))}. To clear it, do the opposite.` };
    return { ok: false, why: `Right kind of move, wrong number. Look at what is ${left.n > 0 ? 'added to' : 'subtracted from'} the ${isExp ? 'e term' : `${multText(c.a, 'y')}`} on the right.` };
  }
  if (got.type === want.type && got.type === 'scale') {
    const by = div(ONE, want.value);
    const target = idx > turn ? 'y' : isExp ? pow : 'the ln';
    if (frEq(got.value, by)) return { ok: false, why: `On the right, ${target} is MULTIPLIED by ${frText(by)}. Multiplying again makes it bigger; do the opposite to undo it.` };
    if (frEq(got.value, neg(want.value))) return { ok: false, why: `Check the sign: on the right, ${target} is multiplied by ${frText(by)}.` };
    return { ok: false, why: `Right kind of move, wrong number. What is ${target} multiplied by?` };
  }
  if (isExp && got.type === 'ln') return { ok: false, why: 'ln has already done its job here. Look at what is still attached to y.' };
  if (!isExp && got.type === 'exp') return { ok: false, why: 'The ln has already been undone here. Look at what is still attached to y.' };
  return { ok: false, why: `Undo what f does, last thing first. On the right-hand side, what was done ${idx > turn ? 'to y' : isExp ? `to ${pow}` : 'to the ln'} most recently?` };
}

/** The boxes that make the expected move, for "Show me". */
export const moveInput = (model, idx) => inputOf(model.moves[idx]);

/** The domain of the inverse: x > a, x < a, or every real x. */
export function judgeDomain(model, { rel, value }) {
  const want = model.domain;
  const c = model.curve;
  if (model.kind === 'ln') {
    if (rel === 'all') return { ok: true };
    const got = typedNumber(value);
    const own = got && frEq(got, model.fDomain.value);
    return { ok: false, why: `${own ? `x ${model.fDomain.rel === 'gt' ? '>' : '<'} ${frText(model.fDomain.value)} is the domain of f itself, which becomes the RANGE of the inverse. ` : ''}A log curve takes every height, so the range of f is every real number, and the inverse is a power of e, which exists for any x. There is nothing to rule out.` };
  }
  const got = typedNumber(value);
  const eTerm = `${coefText(c.k)}${ePowText(c.n)}`;
  if (rel === want.rel && got && frEq(got, want.value)) return { ok: true };
  if (rel === 'all') {
    return { ok: false, why: `The inverse has a ln in it, and a ln needs a positive number inside. Which values of x make ${model.argText} positive?` };
  }
  if (!got) return { ok: false, blank: true, why: 'Type the number that x is compared with.' };
  if (rel !== want.rel && frEq(got, want.value)) {
    return { ok: false, why: c.k.n > 0
      ? `${eTerm} is always positive, so f(x) is always MORE than ${frText(c.a)}. The domain of the inverse is the range of f.`
      : `${eTerm} is always negative, so f(x) is always LESS than ${frText(c.a)}. The domain of the inverse is the range of f.` };
  }
  if (frEq(got, add(c.k, c.a)) && !isZero(c.k)) {
    return { ok: false, why: `${frText(got)} is f(0), one value that f takes. The domain of the inverse is the whole RANGE of f: every value on one side of its asymptote.` };
  }
  if (isZero(got) && !isZero(c.a)) {
    return { ok: false, why: `ln x needs x > 0, but here the inside of the ln is ${model.argText}. Make THAT positive.` };
  }
  return { ok: false, why: `The domain of the inverse is the range of f. As the term ${eTerm} shrinks to nothing, what number does f(x) get close to, and is f(x) above or below it?` };
}

/** The finished working: the three steps, the domain, and a check. */
export function inverseWorking(model) {
  const lines = [model.startLatex, { text: 'Swap x and y:', tex: model.swapped }];
  for (const m of model.moves) lines.push({ text: `${m.say}:`, tex: m.after });
  lines.push(`f^{-1}(x) = ${model.inverseTex}`);
  if (model.kind === 'exp') {
    lines.push({ text: 'The range of f is', tex: model.rangeTex });
    lines.push({ text: 'so the domain of the inverse is', tex: model.domainTex });
    lines.push({ text: `The asymptote y = ${frText(model.asymF.value)} of f becomes the asymptote x = ${frText(model.asymInv.value)} of the inverse.` });
  } else {
    lines.push({ text: 'The range of f is every real number, so the domain of the inverse is every real x.' });
    lines.push({ text: `The asymptote x = ${frText(model.asymF.value)} of f becomes the asymptote y = ${frText(model.asymInv.value)} of the inverse.` });
  }
  return lines;
}

/** A square window (equal units on both axes) that holds f, its inverse and y = x. */
export function inverseWindow(model) {
  const c = model.curve;
  const asym = toNumber(model.asymF.value);
  const other = c.kind === 'exp' ? toNumber(add(c.k, c.a)) : toNumber(div(sub(ONE, c.b), c.a));   // f(0), or where f = 0
  const keys = [0, asym, other];
  const lo = Math.min(...keys);
  const hi = Math.max(...keys);
  const span = Math.max(hi - lo, 2.4);
  return { xMin: lo - 0.55 * span, xMax: hi + 0.55 * span, yMin: lo - 0.55 * span, yMax: hi + 0.55 * span };
}

// ------------------------------------------------------------------ the families of 5.9

export const FAMILY_WIN = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };

export const FAMILIES = {
  exp_add: {
    kind: 'exp', tex: 'y = e^{x} + k', curve: (k) => ({ kind: 'exp', k: 1, n: 1, a: k }), zero: true,
    rule: 'Adding k moves the whole curve up by k (down when k is negative). The asymptote moves with it, to y = k, and the y-intercept becomes 1 + k. The curve reaches the x-axis only when k is negative.',
  },
  exp_mult: {
    kind: 'exp', tex: 'y = ke^{x}', curve: (k) => ({ kind: 'exp', k, n: 1, a: 0 }), zero: false,
    rule: 'Multiplying by k stretches the curve away from the x-axis, so the y-intercept becomes k. The asymptote stays y = 0. A negative k reflects the curve in the x-axis: it lies below the axis and falls.',
  },
  exp_in: {
    kind: 'exp', tex: 'y = e^{kx}', curve: (k) => ({ kind: 'exp', k: 1, n: k, a: 0 }), zero: false,
    rule: 'A number in the power changes how steep the curve is. Every curve still passes through (0, 1), because e⁰ = 1, and the asymptote stays y = 0. A negative k reflects the curve in the y-axis, so it falls.',
  },
  ln_add: {
    kind: 'ln', tex: 'y = \\ln(x + k)', curve: (k) => ({ kind: 'ln', k: 1, a: 1, b: k }), zero: true,
    rule: 'Adding k inside the bracket moves the curve k to the LEFT. The asymptote is where the inside is 0, x = −k, and the curve crosses the x-axis where the inside is 1, x = 1 − k. It reaches the y-axis only when k is positive.',
  },
  ln_mult: {
    kind: 'ln', tex: 'y = k\\ln x', curve: (k) => ({ kind: 'ln', k, a: 1, b: 0 }), zero: false,
    rule: 'Multiplying by k stretches the curve away from the x-axis. Every curve still passes through (1, 0), because ln 1 = 0, and the asymptote stays x = 0. A negative k reflects the curve in the x-axis, so it falls.',
  },
  ln_in: {
    kind: 'ln', tex: 'y = \\ln kx', curve: (k) => ({ kind: 'ln', k: 1, a: k, b: 0 }), zero: false,
    rule: 'The curve crosses the x-axis where kx = 1, at x = 1/k. For a positive k, ln kx = ln k + ln x, so the curve is y = ln x moved up by ln k. A negative k needs a negative x: the curve is reflected in the y-axis and lies to the left of it.',
  },
};

/** What a family item can ask, by the kind of curve. */
export const ASKS = {
  exp: ['yint', 'asym', 'crossX', 'shape', 'side'],
  ln: ['xint', 'asym', 'crossY', 'shape', 'side'],
};

/** The values the slider can take for a family (zero only where it is a curve). */
export const sliderValues = (family) => [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((k) => k !== 0 || FAMILIES[family]?.zero);

const ASK_TEXT = {
  yint: 'Where will it cross the y-axis?',
  xint: 'Where will it cross the x-axis?',
  asym: 'What will its asymptote be?',
  crossX: 'Will it cross the x-axis?',
  crossY: 'Will it cross the y-axis?',
  shape: 'Will it rise or fall from left to right?',
};

/** Move the Curve. */
export function familyModel(item) {
  const fam = FAMILIES[item.family];
  if (!fam) throw new Error(`family "${item.family}" — ${Object.keys(FAMILIES).join(', ')}`);
  const from = sketchModel(fam.curve(item.from));
  const to = sketchModel(fam.curve(item.to));
  const typed = ['yint', 'xint', 'asym'].includes(item.ask);
  const pick = (m) => ({
    yint: m.kind === 'exp' ? m.yInt : null,
    xint: m.kind === 'ln' ? m.xIntFr : null,
    asym: m.asym.value,
    crossX: m.crossesX ? 'yes' : 'no',
    crossY: m.crossesY ? 'yes' : 'no',
    shape: m.shape,
    side: m.side,
  }[item.ask]);
  const want = pick(to);
  const was = pick(from);
  const askText = item.ask === 'side'
    ? (fam.kind === 'exp' ? 'Will the curve be above or below its asymptote?' : 'Will the curve be to the left or to the right of its asymptote?')
    : ASK_TEXT[item.ask];
  const choices = typed ? null : {
    crossX: [{ id: 'yes', name: 'Yes, it crosses' }, { id: 'no', name: 'No, it never reaches it' }],
    crossY: [{ id: 'yes', name: 'Yes, it crosses' }, { id: 'no', name: 'No, it never reaches it' }],
    shape: [{ id: 'rises', name: 'It rises' }, { id: 'falls', name: 'It falls' }],
    side: fam.kind === 'exp' ? [{ id: 'above', name: 'Above it' }, { id: 'below', name: 'Below it' }] : [{ id: 'left', name: 'To the left of it' }, { id: 'right', name: 'To the right of it' }],
  }[item.ask];
  const box = typed ? { yint: 'y', xint: 'x', asym: fam.kind === 'exp' ? 'y' : 'x' }[item.ask] : null;
  return {
    mode: 'family', family: item.family, fam, kind: fam.kind, ask: item.ask, from, to, fromK: item.from, toK: item.to,
    typed, want, was, askText, choices, box,
    stages: ['predict', 'slide'],
    questionLatex: fam.tex,
    fromLatex: from.questionLatex, toLatex: to.questionLatex,
  };
}

/** The facts of a family's curve at one value of k, for the read-out beside the slider. */
export function familyFacts(family, k) {
  const m = sketchModel(FAMILIES[family].curve(k));
  const out = [];
  const chipTex = (f) => frTex(f).replace('\\dfrac', '\\tfrac');     // read-out chips are one line high
  if (m.kind === 'exp') {
    out.push({ name: 'y-intercept', tex: `(0, ${chipTex(m.yInt)})` });
    out.push({ name: 'x-intercept', tex: m.crossesX ? `(${isZero(m.xInt.c) || frEq(m.xInt.m, ONE) ? '0' : logTex(tidyLog(m.xInt))}, 0)` : null });
    out.push({ name: 'asymptote', tex: `y = ${chipTex(m.asym.value)}` });
  } else {
    out.push({ name: 'x-intercept', tex: `(${chipTex(m.xIntFr)}, 0)` });
    out.push({ name: 'y-intercept', tex: m.crossesY ? `(0, ${frEq(m.yInt.m, ONE) ? '0' : logTex(m.yInt)})` : null });
    out.push({ name: 'asymptote', tex: `x = ${chipTex(m.asym.value)}` });
  }
  out.push({ name: 'shape', text: m.shape });
  return { model: m, facts: out };
}

/** A prediction about a family: a typed number, or one of two choices. */
export function judgeFamily(model, answer) {
  const { to, from, fam, ask, toK, fromK } = model;
  const kTo = fr(toK);
  if (!model.typed) {
    let why;
    if (ask === 'crossX' || ask === 'crossY') why = judgeCross(to, answer).why;
    else if (ask === 'shape') why = judgeShape(to, answer).why;
    else if (fam.kind === 'exp') why = `${coefText(to.curve.k)}${ePowText(to.curve.n)} is always ${to.curve.k.n > 0 ? 'positive' : 'negative'}, so y is always ${to.curve.k.n > 0 ? 'more' : 'less'} than ${frText(to.curve.a)}: the curve is ${to.side} its asymptote.`;
    else why = `The inside of the log must be positive: ${innerText(to.curve)} > 0 means x ${to.side === 'right' ? '>' : '<'} ${frText(to.asym.value)}. The curve is to the ${to.side} of its asymptote.`;
    return { ok: answer === model.want, want: model.want, why };
  }
  const got = typedNumber(answer);
  if (got && frEq(got, model.want)) return { ok: true };
  const moved = !frEq(model.was, model.want);
  const hint = {
    yint: 'Put x = 0, and remember that e⁰ = 1.',
    xint: 'ln is 0 when what is inside it equals 1.',
    asym: fam.kind === 'exp' ? 'The asymptote is what is left of y when the e term has shrunk to nothing.' : 'The asymptote is where the inside of the log is 0.',
  }[ask];
  let why = `${hint}`;
  if (got) {
    if (moved && frEq(got, model.was)) {
      why = `That is where it is now, with k = ${frText(fr(fromK))}. Changing k to ${frText(kTo)} moves it. ${hint}`;
    } else if (!moved) {
      why = `In this family that does not move when k changes. ${hint}`;
    } else if (model.family === 'ln_add' && ask === 'asym' && frEq(got, kTo)) {
      why = `At x = ${frText(kTo)} the inside ${innerText(to.curve)} is ${frText(add(kTo, kTo))}, not 0. Adding inside the bracket moves the curve the other way.`;
    } else if (model.family === 'exp_add' && ask === 'yint' && frEq(got, kTo)) {
      why = 'e⁰ is 1, not 0, so at x = 0 the term eˣ is worth 1, not nothing. The k is added to that.';
    } else if (model.family === 'ln_in' && ask === 'xint' && frEq(got, kTo)) {
      why = `The inside ${multText(kTo, 'x')} must equal 1, so x = 1 ÷ ${toK < 0 ? `(${frText(kTo)})` : frText(kTo)}.`;
    } else if (frEq(got, neg(model.want)) && !isZero(model.want)) {
      why = `Right size, wrong sign. ${hint}`;
    }
  }
  return { ok: false, why, from };
}

/** The finished working for a family item. */
export function familyWorking(model) {
  const { to, ask } = model;
  const lines = [model.toLatex];
  if (ask === 'yint') lines.push({ text: 'When x = 0:', tex: `y = ${frTex(to.yInt)}` });
  else if (ask === 'xint') lines.push({ text: 'When y = 0 the inside of the log is 1:', tex: `x = ${frTex(to.xIntFr)}` });
  else if (ask === 'asym') lines.push({ text: 'The asymptote is', tex: `${to.asym.line} = ${frTex(to.asym.value)}` });
  else if (ask === 'crossX' || ask === 'crossY') lines.push({ text: judgeCross(to, model.want).why });
  else if (ask === 'shape') lines.push({ text: judgeShape(to, model.want).why });
  else lines.push({ text: judgeFamily(model, model.want).why });
  lines.push({ text: model.fam.rule });
  return lines;
}

// ------------------------------------------------------------------ one door

export function modelOf(mode, item) {
  if (mode === 'sketch') return sketchModel(item);
  if (mode === 'inverse') return inverseModel(item);
  return familyModel(item);
}

// ------------------------------------------------------------------ validation

const small = (f, lim = 9) => Math.abs(f.n) <= lim && f.d <= lim;

/** Problems with a pool of items for one mode, as strings. Empty when all is well. */
export function checkExpItems(items, mode) {
  const out = [];
  if (!EXP_MODES.includes(mode)) return [`unknown mode "${mode}"`];
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
    try {
      if (mode === 'family') {
        const fam = FAMILIES[item.family];
        if (!fam) { out.push(`${at}: family "${item.family}" — ${Object.keys(FAMILIES).join(', ')}`); continue; }
        if (!ASKS[fam.kind].includes(item.ask)) { out.push(`${at}: ask "${item.ask}" — a ${fam.kind} family takes ${ASKS[fam.kind].join(', ')}`); continue; }
        const values = sliderValues(item.family);
        for (const key of ['from', 'to']) if (!values.includes(item[key])) out.push(`${at}: ${key} = ${item[key]} is not on the slider (${values.join(', ')})`);
        if (item.from === item.to) out.push(`${at}: from and to are the same, so nothing moves`);
        if (out.some((p) => p.startsWith(at))) continue;
        const m = familyModel(item);
        if (m.typed && (!m.want || m.want.d > 4)) out.push(`${at}: the answer ${m.want ? frText(m.want) : '?'} is not something to type`);
        if (m.typed && !judgeFamily(m, typedOf(m.want)).ok) out.push(`${at}: does not accept its own answer`);
        continue;
      }
      if (!CURVE_KINDS.includes(item.kind)) { out.push(`${at}: kind "${item.kind}" — ${CURVE_KINDS.join(' or ')}`); continue; }
      const c = curveOf(item);
      if (isZero(c.k)) { out.push(`${at}: k = 0 is not a curve`); continue; }
      if (c.kind === 'exp' && isZero(c.n)) { out.push(`${at}: n = 0 is a straight line`); continue; }
      if (c.kind === 'ln' && isZero(c.a)) { out.push(`${at}: a = 0 leaves no x in the log`); continue; }
      if (mode === 'sketch') {
        const nums = c.kind === 'exp' ? [c.k, c.n, c.a] : [c.k, c.a, c.b];
        if (!nums.every(isInt)) { out.push(`${at}: a sketch item takes whole numbers only`); continue; }
        if (!nums.every((f) => small(f))) out.push(`${at}: a number is too big to work with in your head`);
        const m = sketchModel(item);
        const { px } = sketchLayout(m);
        const gap = (p, q) => Math.abs(p - q);
        if (c.kind === 'exp') {
          if (isZero(c.a)) { out.push(`${at}: a = 0 puts the asymptote on the x-axis — that curve belongs to Move the Curve`); continue; }
          if (isZero(m.yInt)) { out.push(`${at}: the curve passes through the origin, so its two intercepts are one point`); continue; }
          if (m.crossesX && !small(m.ratio)) out.push(`${at}: the x-intercept is ln of ${frText(m.ratio)}, too awkward to type`);
          if (m.crossesX && !judgeLog(m, typedOf(m.xInt.c), typedOf(m.xInt.m)).ok) out.push(`${at}: does not accept its own x-intercept`);
          if (gap(px.asym, px.axisY) < 34) out.push(`${at}: the asymptote is drawn ${Math.round(gap(px.asym, px.axisY))}px from the x-axis — too close to label`);
          if (gap(px.yInt, px.axisY) < 28) out.push(`${at}: the y-intercept is drawn ${Math.round(gap(px.yInt, px.axisY))}px from the origin — too close to label`);
          if (gap(px.yInt, px.asym) < 34) out.push(`${at}: the y-intercept is drawn ${Math.round(gap(px.yInt, px.asym))}px from the asymptote — too close to label`);
          if (m.crossesX && gap(px.xInt, px.axisX) < 44) out.push(`${at}: the x-intercept is drawn ${Math.round(gap(px.xInt, px.axisX))}px from the origin — too close to label`);
        } else {
          if (isZero(c.b)) { out.push(`${at}: b = 0 puts the asymptote on the y-axis — that curve belongs to Move the Curve`); continue; }
          if (frEq(c.b, ONE)) { out.push(`${at}: the curve passes through the origin, so its two intercepts are one point`); continue; }
          if (m.xIntFr.d > 9) out.push(`${at}: the x-intercept ${frText(m.xIntFr)} has an unreasonable denominator`);
          if (m.crossesY && !judgeLog(m, typedOf(m.yInt.c), typedOf(m.yInt.m)).ok) out.push(`${at}: does not accept its own y-intercept`);
          if (gap(px.asym, px.axisX) < 56) out.push(`${at}: the asymptote is drawn ${Math.round(gap(px.asym, px.axisX))}px from the y-axis — too close to label`);
          if (gap(px.asym, px.xInt) < 40) out.push(`${at}: the x-intercept is drawn ${Math.round(gap(px.asym, px.xInt))}px from the asymptote — too close to label`);
          if (gap(px.xInt, px.axisX) < 44) out.push(`${at}: the x-intercept is drawn ${Math.round(gap(px.xInt, px.axisX))}px from the origin — too close to label`);
          if (m.crossesY && gap(px.yInt, px.axisY) < 28) out.push(`${at}: the y-intercept is drawn ${Math.round(gap(px.yInt, px.axisY))}px from the origin — too close to label`);
        }
        continue;
      }
      // inverse
      if (c.kind === 'exp') {
        if (!isInt(c.a)) out.push(`${at}: the constant a must be a whole number`);
        if (!small(c.k) || !small(c.n) || !small(c.a, 20)) out.push(`${at}: a number is too big to work with in your head`);
      } else {
        if (!isInt(c.a) || !isInt(c.b)) out.push(`${at}: a and b must be whole numbers`);
        if (c.a.n < 0 && c.b.n <= 0) out.push(`${at}: a log of ${innerText(c)} is only set with a positive constant`);
        if (!small(c.k) || !small(c.a) || !small(c.b, 20)) out.push(`${at}: a number is too big to work with in your head`);
      }
      const m = inverseModel(item);
      // Compose f and its derived inverse at a few heights: they must undo each other.
      for (const x of [-1.3, -0.4, 0.2, 0.9, 1.7]) {
        const y = m.f(x);
        if (!Number.isFinite(y)) continue;
        if (Math.abs(m.inv(y) - x) > 1e-7 * (1 + Math.abs(x))) { out.push(`${at}: the derived inverse does not undo f at x = ${x}`); break; }
      }
      m.moves.forEach((mv, i) => { if (!judgeMove(m, i, moveInput(m, i)).ok) out.push(`${at}: move ${i + 1} ("${mv.say}") does not accept its own answer`); });
      if (!judgeDomain(m, { rel: m.domain.rel, value: m.domain.value ? typedOf(m.domain.value) : '' }).ok) out.push(`${at}: does not accept its own domain`);
    } catch (err) {
      out.push(`${at}: ${err.message}`);
    }
  }
  return out;
}
