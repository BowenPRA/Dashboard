// src/utils/logEquations.js
//
// Log equations and change of base — the pure parts behind the three AM_5C
// tasks that share one screen (src/tasks/LogEqLab.jsx, which takes `mode`):
//
//   eq    "Log Equation Solver"   coursebook 5.4 A–D and 5.6 F. Combine each
//                                 side into a single log, remove the logs,
//                                 solve — then CHECK EVERY ROOT in the
//                                 original equation: the inside of each log
//                                 (and the base) is worked out at each root,
//                                 and a root that makes one non-positive dies.
//   quad  "Quadratic in a Log"    5.4 E and 5.6 I–J. Substitute u = log x,
//                                 solve the quadratic in u, go back to x.
//   base  "Change of Base"        5.6 A–E and G–H. Evaluate with lg, swap the
//                                 base and the number, related bases, one log
//                                 from two, a chain of logs, and an equation
//                                 in two related bases.
//
// THE RULE (same as logs.js, circle.js, modulus.js): an item stores only the
// QUESTION. Everything else — every combined log, exponential form, quadratic,
// root, check and wrong-answer message — is derived here, so no answer key can
// drift, and `checkLogEqItems` refuses an item the screen could not finish.
//
// Everything that is marked is EXACT: rationals are [p, q] pairs and powers
// are prime-exponent maps, both from logs.js. Floating point is used only for
// the "3 significant figures" answers of the change-of-base evaluations and
// for the two sides shown beside a root that has been kept.
//
// WHAT A MODEL IS. `modelOf(mode, item)` returns
//   { head, lines, stages: [stage…], final: [line…], answerTex, … }
// and each stage is one of three generic kinds the screen knows how to draw:
//   pick   options: [{ id, tex | text, ok, why }]
//   fill   rows: [[{ tex } | { text } | { box, sup? } | { choose, options }]],
//          judge(typed) → { ok, marks, why, nudge? }, answers: { key: text }
//   keep   candidates: [{ xTex, rows, keep, why }]  — keep or reject each root
// A line (in `out`, `final`, a message) is a KaTeX string or
// { text, tex?, after? } — a sentence in ordinary type, which can wrap.
//
// ITEM SHAPES
//
//   eq     { id, level, base: 3 | 'x', L: [term…], R: [term…], expectNone? }
//            term: a number (or 'p/q')            a plain number
//                  [coef, arg]                    coef · log_base(arg)
//                  [coef, arg, otherBase]         a log to another base
//            arg:  a number or 'p/q', or a linear expression in x written as
//                  a string: 'x', '3x', 'x - 2', '2x + 1', '4 - 2x'.
//            base 'x' is an unknown base: every arg is then a number.
//
//   quad   { id, level, base, L: [term…], R: [term…] }
//            term: a number
//                  ['sq', a]          a (log_b x)²
//                  ['log', c, n?]     c log_b(xⁿ)   (n defaults to 1)
//                  ['rec', c]         c log_x b     (the log upside down)
//
//   base   { id, level, kind: 'evaluate', base, arg }            log_b(arg), 3 s.f.
//          { kind: 'swap', given, letter, of, num }              letter = log_given(of); find log_of(num)
//          { kind: 'rebase', given, letter, of, target, times? } find log_target(times · of)
//          { kind: 'from2', base, a: [name, value], b: [name, value], find: [newBase, arg] }
//          { kind: 'product', logs: [[base, arg], [base, arg]] } a chain of two logs
//          { kind: 'related', base, L: [term…], R: [term…] }     term: a number, or [coef, logBase]
import {
  rat, rAdd, rMul, rDiv, rNeg, rAbs, rSign, rEq, rIsInt, rIsOne, rValue, gcd,
  parseRational, toRat, ppOfRat, ppPow, ppToRat, ppRatio, argOf, ratLatex, ratText, powText, logText,
} from './logs.js';

export const LOGEQ_MODES = ['eq', 'quad', 'base'];

const MAX_TYPED = 1e6;
const ZERO = rat(0, 1);
const ONE = rat(1, 1);
const R = (p, q = 1) => rat(p, q);
const rSub = (a, b) => rAdd(a, rNeg(b));
const rCmp = (a, b) => Math.sign(a[0] * b[1] - b[0] * a[1]);
const rIsZero = (a) => a[0] === 0;
const lcm = (a, b) => (a / gcd(a, b)) * b;

/** A rational the way a student types it: 3, -2, 3/2. */
export const typedForm = ([p, q]) => (q === 1 ? `${p}` : `${p}/${q}`);

/** a^k for a positive rational a and a rational k — a rational, or null when a root is left. */
function ratPow(a, k) {
  if (a[0] <= 0) return null;
  return ppToRat(ppPow(ppOfRat(a), k));
}

/** log_base(n) as an exact rational, or null. */
function exactLog(base, n) {
  if (n[0] <= 0) return null;
  return ppRatio(ppOfRat(n), ppOfRat(R(base)));
}

/** A message: a sentence, an optional piece of maths after it, and an optional tail. */
const M = (text, tex, after) => ({ text, tex, after });

// ------------------------------------------------------------------ printing

/** The log's name: \lg for base 10, \log_{b} otherwise (b may be a letter). */
const head = (base) => (base === 10 ? '\\lg' : `\\log_{${base}}`);

/** A plain-text log for a message: log₄ 2, lg 7, logₓ 25. */
function lt(base, argText) {
  if (base === 'x') return `logₓ ${argText}`;
  if (typeof base === 'number') return logText(base, argText);
  return `log_${base} ${argText}`;
}

/** ax + b as KaTeX, a and b whole numbers: x, 3x, x - 2, 2x + 1, 4 - 2x. */
function linTex([a, b], v = 'x') {
  const ax = a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`;
  if (b === 0) return ax;
  if (a < 0 && b > 0) return `${b} - ${a === -1 ? '' : -a}${v}`;
  return `${ax} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
}
const linText = (lin) => linTex(lin).replace(/-/g, '−');

/** A whole-number polynomial (index = degree) as KaTeX: x^{2} - 5x + 6. */
function polyTex(p, v = 'x') {
  const parts = [];
  for (let d = p.length - 1; d >= 0; d -= 1) {
    const c = p[d];
    if (!c) continue;
    const mag = Math.abs(c);
    const body = d === 0 ? `${mag}` : `${mag === 1 ? '' : mag}${v}${d === 1 ? '' : `^{${d}}`}`;
    if (!parts.length) parts.push(`${c < 0 ? '-' : ''}${body}`);
    else parts.push(`${c < 0 ? '-' : '+'} ${body}`);
  }
  return parts.length ? parts.join(' ') : '0';
}

const polyMul = (a, b) => {
  const out = new Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] += x * y; }));
  return out;
};
const polyAdd = (a, b, sign = 1) => {
  const out = new Array(Math.max(a.length, b.length)).fill(0);
  a.forEach((x, i) => { out[i] += x; });
  b.forEach((y, j) => { out[j] += sign * y; });
  return out;
};
const polyTrim = (p) => { const q = [...p]; while (q.length > 1 && q[q.length - 1] === 0) q.pop(); return q; };
/** Whole-number coefficients with no common factor and a positive leading one. */
function polyNorm(p) {
  const q = polyTrim(p);
  const g = q.reduce((s, c) => gcd(s, c), 0) || 1;
  const sign = q[q.length - 1] < 0 ? -1 : 1;
  return q.map((c) => (c / g) * sign + 0);
}

// ------------------------------------------------------------------ products
//
// The inside of a combined log is a product over a product. A PRODUCT is
// { k, xp, bins }: the whole number k, times x^xp, times each (ax + b)^pow.

const P1 = () => ({ k: 1, xp: 0, bins: [] });
const pIsOne = (P) => P.k === 1 && !P.xp && !P.bins.length;

function pTimesLin(P, lin, pow) {
  const [a, b] = lin;
  if (b === 0 && a > 0) return { k: P.k * a ** pow, xp: P.xp + pow, bins: P.bins };
  const at = P.bins.findIndex((q) => q.lin[0] === a && q.lin[1] === b);
  const bins = at === -1 ? [...P.bins, { lin, pow }] : P.bins.map((q, i) => (i === at ? { lin, pow: q.pow + pow } : q));
  return { k: P.k, xp: P.xp, bins };
}
function pMul(A, B) {
  let out = { k: A.k * B.k, xp: A.xp + B.xp, bins: A.bins };
  for (const b of B.bins) out = pTimesLin(out, b.lin, b.pow);
  return out;
}
function pPoly(P) {
  let poly = [P.k];
  for (let i = 0; i < P.xp; i += 1) poly = polyMul(poly, [0, 1]);
  for (const b of P.bins) for (let i = 0; i < b.pow; i += 1) poly = polyMul(poly, [b.lin[1], b.lin[0]]);
  return poly;
}
function pTex(P) {
  if (!P.bins.length && !P.xp) return `${P.k}`;
  if (P.k === 1 && !P.xp && P.bins.length === 1 && P.bins[0].pow === 1) return linTex(P.bins[0].lin);
  let s = P.k === 1 ? '' : `${P.k}`;
  if (P.xp) s += P.xp === 1 ? 'x' : `x^{${P.xp}}`;
  for (const b of P.bins) s += `(${linTex(b.lin)})${b.pow > 1 ? `^{${b.pow}}` : ''}`;
  return s;
}
/** A fraction of two products, { top, bot }. */
const fTex = (F) => (pIsOne(F.bot) ? pTex(F.top) : `\\dfrac{${pTex(F.top)}}{${pTex(F.bot)}}`);
const fIsBare = (F) => pIsOne(F.bot) && !F.top.bins.length && (F.top.xp === 0 || F.top.k === 1 || F.top.xp === 1);
const logOfF = (base, F) => (fIsBare(F) ? `${head(base)} ${fTex(F)}` : `${head(base)}\\left(${fTex(F)}\\right)`);

// ------------------------------------------------------------------ small shared pieces

const hashOf = (s) => [...String(s)].reduce((n, ch) => n + ch.charCodeAt(0), 0);

/** Options with duplicates dropped (the first is the right one) and the order turned by the item. */
function options(seed, list) {
  const seen = new Set();
  const out = [];
  for (const o of list) {
    if (!o) continue;
    const key = o.tex ?? o.text;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(o);
  }
  const shift = hashOf(seed) % out.length;
  return [...out.slice(shift), ...out.slice(0, shift)];
}

/** A typed whole number or fraction, or null. */
const typedRat = (s) => parseRational(s);

/** Three typed numbers that must be a non-zero multiple of a quadratic's [a, b, c]. */
function judgeQuadratic(typed, want, whyOf) {
  const A = typedRat(typed.a);
  const B = typedRat(typed.b);
  const C = typedRat(typed.c);
  const [a, b, c] = want.map((n) => R(n));
  if (!A || !B || !C) return { ok: false, marks: { a: !!A, b: !!B, c: !!C }, why: 'Type a number in every box. Type 0 if a term is missing.' };
  if (rIsZero(A)) return { ok: false, marks: { a: false, b: true, c: true }, why: 'The squared term cannot be 0: this equation is a quadratic.' };
  const t = rDiv(a, A);
  const b2 = rMul(B, t);
  const c2 = rMul(C, t);
  const marks = { a: true, b: rEq(b2, b), c: rEq(c2, c) };
  if (marks.b && marks.c) return { ok: true, marks };
  const flipped = rEq(b2, rNeg(b)) && rEq(c2, rNeg(c));
  return { ok: false, marks, why: whyOf({ flipped, b2, c2 }) };
}

/** Two roots typed in either order. */
function judgeTwoRoots(typed, roots, whyOf) {
  const v = [typedRat(typed.r0), typedRat(typed.r1)];
  if (!v[0] || !v[1]) return { ok: false, marks: { r0: !!v[0], r1: !!v[1] }, why: 'Type a number in both boxes. A fraction is typed like 1/2.' };
  const direct = rEq(v[0], roots[0]) && rEq(v[1], roots[1]);
  const swapped = rEq(v[0], roots[1]) && rEq(v[1], roots[0]);
  if (direct || swapped) return { ok: true, marks: { r0: true, r1: true } };
  const isRoot = (x) => roots.some((r) => rEq(r, x));
  const marks = { r0: isRoot(v[0]), r1: isRoot(v[1]) && !(isRoot(v[0]) && rEq(v[0], v[1])) };
  return { ok: false, marks, why: whyOf(v, marks) };
}

/** (qx − p)(sx − r) = 0 for two rational roots, with the letter given. */
function factorTex(roots, lead, v = 'x') {
  const brackets = roots.map(([p, q]) => (p === 0 ? v : `(${linTex([q, -p], v)})`));
  const covered = roots.reduce((s, r) => s * r[1], 1);
  const front = lead / covered;
  const sorted = [...brackets].sort((a, b) => a.length - b.length);
  return `${front === 1 ? '' : front}${sorted.join('')} = 0`;
}

const orTex = (vals, v = 'x') => vals.map((r) => `${v} = ${ratLatex(r)}`).join(' \\text{ or } ');

// ====================================================================== eq

function parseLin(s) {
  const t = String(s).replace(/\s+/g, '').replace(/−/g, '-');
  let m = t.match(/^(-?\d*)x([+-]\d+)?$/);
  if (m) {
    const a = m[1] === '' ? 1 : m[1] === '-' ? -1 : Number(m[1]);
    return [a, m[2] ? Number(m[2]) : 0];
  }
  m = t.match(/^(\d+)-(\d*)x$/);
  if (m) return [-(m[2] === '' ? 1 : Number(m[2])), Number(m[1])];
  throw new Error(`cannot read "${s}" as a linear expression in x`);
}

function parseArg(v) {
  if (typeof v === 'string' && /x/.test(v)) {
    const lin = parseLin(v);
    if (lin[0] === 0) throw new Error(`"${v}" has no x in it`);
    return { lin };
  }
  const q = toRat(v);
  if (!q || q[0] <= 0) throw new Error(`the number inside a log must be positive (got ${JSON.stringify(v)})`);
  return { num: q };
}

function parseTerm(raw, base) {
  if (Array.isArray(raw)) {
    const c = toRat(raw[0]);
    if (!c || rIsZero(c)) throw new Error('a log term needs a non-zero coefficient');
    return { kind: 'log', c, arg: parseArg(raw[1]), base: raw[2] ?? base, pow: 1 };
  }
  const k = toRat(raw);
  if (!k) throw new Error(`cannot read the term ${JSON.stringify(raw)}`);
  return { kind: 'num', k };
}

function argTex(arg, pow = 1) {
  if (arg.num) return { tex: ratLatex(arg.num), bare: rIsInt(arg.num) };
  const [a, b] = arg.lin;
  if (pow === 1) return { tex: linTex(arg.lin), bare: b === 0 && a > 0 };
  if (a === 1 && b === 0) return { tex: `x^{${pow}}`, bare: true };
  return { tex: `(${linTex(arg.lin)})^{${pow}}`, bare: false };
}
function logTex(base, arg, pow = 1) {
  const a = argTex(arg, pow);
  return a.bare ? `${head(base)} ${a.tex}` : `${head(base)}\\left(${a.tex}\\right)`;
}
const termBody = (t) => {
  const abs = rAbs(t.kind === 'num' ? t.k : t.c);
  return t.kind === 'num' ? ratLatex(abs) : `${rIsOne(abs) ? '' : ratLatex(abs)}${logTex(t.base, t.arg, t.pow)}`;
};
function sideTex(terms) {
  if (!terms.length) return '0';
  return terms.map((t, i) => {
    const neg = (t.kind === 'num' ? t.k : t.c)[0] < 0;
    if (i === 0) return `${neg ? '-' : ''}${termBody(t)}`;
    return `${neg ? '-' : '+'} ${termBody(t)}`;
  }).join(' ');
}
const eqTex = (E) => `${sideTex(E.L)} = ${sideTex(E.R)}`;

/** All the plain numbers on a side added into the first one's place; a zero is dropped beside other terms. */
function mergeNums(terms) {
  const nums = terms.filter((t) => t.kind === 'num');
  if (!nums.length) return terms;
  const total = nums.reduce((s, t) => rAdd(s, t.k), ZERO);
  const out = [];
  let placed = false;
  for (const t of terms) {
    if (t.kind !== 'num') { out.push(t); continue; }
    if (!placed) { out.push({ kind: 'num', k: total }); placed = true; }
  }
  const logs = out.filter((t) => t.kind === 'log');
  return rIsZero(total) && logs.length ? logs : out;
}

/** The logs of a side as one fraction of products. */
function sideFraction(terms) {
  let top = P1();
  let bot = P1();
  for (const t of terms) {
    const up = t.c[0] > 0;
    if (t.arg.num) {
      const [p, q] = t.arg.num;
      if (up) { top = { ...top, k: top.k * p }; bot = { ...bot, k: bot.k * q }; } else { top = { ...top, k: top.k * q }; bot = { ...bot, k: bot.k * p }; }
    } else if (up) top = pTimesLin(top, t.arg.lin, t.pow);
    else bot = pTimesLin(bot, t.arg.lin, t.pow);
  }
  const g = gcd(top.k, bot.k) || 1;
  return { top: { ...top, k: top.k / g }, bot: { ...bot, k: bot.k / g } };
}

/** The mistake of adding the insides: log a + log b written as log(a + b). */
function sumInsideTex(base, terms) {
  let poly = [0];
  for (const t of terms) {
    const p = t.arg.num ? null : pPoly(pTimesLin(P1(), t.arg.lin, t.pow));
    if (!p) { if (!rIsInt(t.arg.num)) return null; poly = polyAdd(poly, [t.arg.num[0]], t.c[0] > 0 ? 1 : -1); } else poly = polyAdd(poly, p, t.c[0] > 0 ? 1 : -1);
  }
  return `${head(base)}\\left(${polyTex(polyTrim(poly))}\\right)`;
}

/** The mistake of multiplying where the sign says divide (or dividing where it says multiply). */
function flippedFraction(terms) {
  const hasMinus = terms.some((t) => t.c[0] < 0);
  if (hasMinus) return sideFraction(terms.map((t) => ({ ...t, c: rAbs(t.c) })));
  return sideFraction(terms.map((t, i) => (i === 0 ? t : { ...t, c: rNeg(t.c) })));
}

/** Both sides of the original equation as numbers, at a value of x (or with x as the base). */
function sidesAt(E, base, x) {
  const side = (terms) => terms.reduce((s, t) => {
    if (t.kind === 'num') return s + rValue(t.k);
    const b = t.base === 'x' ? x : t.base;
    const inside = t.arg.num ? rValue(t.arg.num) : t.arg.lin[0] * x + t.arg.lin[1];
    return s + rValue(t.c) * (Math.log(inside) / Math.log(b));
  }, 0);
  return { lhs: side(E.L), rhs: side(E.R) };
}
const approxTex = (v) => {
  const near = Math.round(v);
  if (Math.abs(v - near) < 1e-9) return `${near}`;
  const half = Math.round(v * 2) / 2;
  if (Math.abs(v - half) < 1e-9) return `${half}`;
  return `${Number(v.toPrecision(3))}`;
};

function eqModel(item) {
  const base = item.base;
  const unknown = base === 'x';
  if (!unknown && !(Number.isInteger(base) && base >= 2 && base <= 20)) throw new Error('base must be a whole number from 2 to 20, or "x" for an unknown base');
  if (!Array.isArray(item.L) || !Array.isArray(item.R) || !item.L.length || !item.R.length) throw new Error('needs L and R, each a list of terms');
  const original = { L: item.L.map((t) => parseTerm(t, base)), R: item.R.map((t) => parseTerm(t, base)) };
  let E = original;
  const all = (X) => [...X.L, ...X.R];
  const isLog = (t) => t.kind === 'log';
  const stages = [];
  const seed = (s) => `${item.id}:${s}`;
  const bText = unknown ? 'x' : `${base}`;

  if (unknown) {
    if (all(E).some((t) => isLog(t) && (t.base !== 'x' || !t.arg.num))) throw new Error('with an unknown base, every log is a log of a number to base x');
  } else {
    for (const t of all(E)) if (isLog(t) && !(Number.isInteger(t.base) && t.base >= 2 && t.base <= 100)) throw new Error('a log to another base needs a whole-number base');
    if (!all(E).some((t) => isLog(t) && t.arg.lin && t.base === base)) throw new Error(`no log to base ${base} has x inside it — make the base of the unknown's log the item's base`);
  }
  const argsChecked = all(original).filter((t) => isLog(t) && t.arg.lin);

  /* ---- evaluate: a log of a number, to another base, is just a number ---- */
  const foreignNum = all(E).filter((t) => isLog(t) && t.arg.num && t.base !== base);
  if (foreignNum.length) {
    const list = [];
    const conv = (terms) => terms.map((t) => {
      if (!(isLog(t) && t.arg.num)) return t;
      const v = exactLog(t.base, t.arg.num);
      if (v === null) {
        if (t.base !== base) throw new Error(`${lt(t.base, ratText(t.arg.num))} is not an exact number, so it cannot be evaluated first`);
        return t;
      }
      list.push({ t, v });
      return { kind: 'num', k: rMul(t.c, v) };
    });
    const next = { L: mergeNums(conv(E.L)), R: mergeNums(conv(E.R)) };
    const first = list[0];
    stages.push({
      id: 'evaluate', label: 'Evaluate the numbers', type: 'fill',
      title: 'Evaluate the logs that have only numbers in them.',
      sub: `A log of a number is just a number. ${lt(first.t.base, ratText(first.t.arg.num))} asks: ${first.t.base} to what power gives ${ratText(first.t.arg.num)}?`,
      rows: list.map((e, i) => [{ tex: `${logTex(e.t.base, e.t.arg)} =` }, { box: `e${i}` }]),
      hint: 'A fraction is typed like 1/2.',
      answers: Object.fromEntries(list.map((e, i) => [`e${i}`, typedForm(e.v)])),
      judge: (typed) => {
        const marks = {};
        let why = null;
        list.forEach((e, i) => {
          const v = typedRat(typed[`e${i}`]);
          const ok = !!v && rEq(v, e.v);
          marks[`e${i}`] = ok;
          if (ok || why) return;
          const n = e.t.arg.num;
          const name = lt(e.t.base, ratText(n));
          if (v && !rIsZero(e.v) && !rIsOne(rAbs(e.v)) && rEq(v, rDiv(ONE, e.v))) why = `Upside down. ${name} asks what power of ${e.t.base} gives ${ratText(n)}, and ${ratText(v)} is the power of ${ratText(n)} that gives ${e.t.base}.`;
          else if (v && rEq(v, rDiv(n, R(e.t.base)))) why = `A log is not a division. ${name} asks: ${e.t.base} to what power gives ${ratText(n)}?`;
          else why = `${name} asks: ${e.t.base} to what power gives ${ratText(n)}? ${rIsInt(e.v) ? 'Count the powers.' : 'The power is a fraction, because a root is a fractional power.'}`;
        });
        return { ok: Object.values(marks).every(Boolean), marks, why };
      },
      good: 'Right. Now the equation has plain numbers in it.',
      out: [
        list.map((e) => {
          const abs = rAbs(e.t.c);
          const lg = logTex(e.t.base, e.t.arg);
          return rIsOne(abs) ? `${lg} = ${ratLatex(e.v)}` : `${ratLatex(abs)}${lg} = ${ratLatex(abs)} \\times ${ratLatex(e.v)} = ${ratLatex(rMul(abs, e.v))}`;
        }).join(',\\quad '),
        eqTex(next),
      ],
    });
    E = next;
  }

  /* ---- rebase: a log of x to a related base, changed to the item's base ---- */
  const foreignVar = all(E).filter((t) => isLog(t) && t.arg.lin && t.base !== base);
  if (foreignVar.length) {
    const bases = [...new Set(foreignVar.map((t) => t.base))];
    const ms = {};
    for (const B of bases) {
      const m = exactLog(base, R(B));
      if (!m || !rIsInt(m) || m[0] < 2) throw new Error(`base ${B} is not a whole-number power of ${base} — make the SMALLER base the item's base`);
      ms[B] = m[0];
    }
    const conv = (terms) => terms.map((t) => (isLog(t) && t.base !== base ? { ...t, c: rDiv(t.c, R(ms[t.base])), base } : t));
    const next = { L: conv(E.L), R: conv(E.R) };
    const mult = all(next).filter(isLog).reduce((l, t) => lcm(l, t.c[1]), 1);
    const scale = (terms) => terms.map((t) => (t.kind === 'num' ? { ...t, k: rMul(t.k, R(mult)) } : { ...t, c: rMul(t.c, R(mult)) }));
    const scaled = mult > 1 ? { L: scale(next.L), R: scale(next.R) } : null;
    const f0 = foreignVar[0];
    const a0 = argTex(f0.arg).tex;
    stages.push({
      id: 'rebase', label: 'Change the base', type: 'fill',
      title: `Two different bases. Change every log to base ${base}, the smaller one.`,
      sub: M('Change of base:', `\\log_{${f0.base}}\\left(${a0}\\right) = \\dfrac{${head(base)}\\left(${a0}\\right)}{${head(base)} ${f0.base}}`, 'What is the number underneath?'),
      rows: bases.map((B, i) => [{ tex: `${head(base)} ${B} =` }, { box: `m${i}` }]),
      answers: Object.fromEntries(bases.map((B, i) => [`m${i}`, `${ms[B]}`])),
      judge: (typed) => {
        const marks = {};
        let why = null;
        bases.forEach((B, i) => {
          const v = typedRat(typed[`m${i}`]);
          const ok = !!v && rEq(v, R(ms[B]));
          marks[`m${i}`] = ok;
          if (ok || why) return;
          if (v && rEq(v, R(1, ms[B]))) why = `Upside down. ${lt(base, `${B}`)} asks what power of ${base} gives ${B}. ${ratText(v)} is ${lt(B, `${base}`)}.`;
          else if (v && rEq(v, R(B, base)) && B / base !== ms[B]) why = `${lt(base, `${B}`)} is a power, not ${B} ÷ ${base}. ${base} to what power gives ${B}?`;
          else why = `${lt(base, `${B}`)} asks: ${base} to what power gives ${B}?`;
        });
        return { ok: Object.values(marks).every(Boolean), marks, why };
      },
      good: scaled ? `Right. Every log is now in base ${base}; multiply through by ${mult} to clear the fraction.` : `Right. Every log is now in base ${base}.`,
      out: [
        ...foreignVar.map((t) => {
          const a = argTex(t.arg).tex;
          const m = ms[t.base];
          return `\\log_{${t.base}}\\left(${a}\\right) = \\dfrac{${head(base)}\\left(${a}\\right)}{${head(base)} ${t.base}} = \\dfrac{1}{${m}}${head(base)}\\left(${a}\\right)`;
        }),
        eqTex(next),
        ...(scaled ? [M(`Multiply every term by ${mult}:`, eqTex(scaled))] : []),
      ],
    });
    E = scaled || next;
  }

  /* ---- collect: logs on one side, the number on the other ---- */
  const logsOf = (terms) => terms.filter(isLog);
  const constOf = (terms) => terms.filter((t) => t.kind === 'num').reduce((s, t) => rAdd(s, t.k), ZERO);
  const lL = logsOf(E.L);
  const lR = logsOf(E.R);
  const cL = constOf(E.L);
  const cR = constOf(E.R);
  if (!lL.length && !lR.length) throw new Error('there is no log left in the equation');
  let method;
  if (rIsZero(cL) && rIsZero(cR) && lL.length && lR.length) {
    method = 'equal';
    E = { L: lL, R: lR };
  } else if (!lR.length && rIsZero(cL)) {
    method = 'exp';
    E = { L: lL, R: [{ kind: 'num', k: cR }] };
  } else if (!lL.length && rIsZero(cR)) {
    throw new Error('write the logs on the left and the number on the right');
  } else {
    method = 'exp';
    const K = rSub(cR, cL);
    const toLeft = K[0] >= 0;
    const neg = (t) => ({ ...t, c: rNeg(t.c) });
    const order = (ts) => [...ts.filter((t) => t.c[0] > 0), ...ts.filter((t) => t.c[0] < 0)];
    const stay = toLeft ? lL : lR;
    const move = toLeft ? lR : lL;
    const logsNew = order([...stay, ...move.map(neg)]);
    const Kabs = rAbs(K);
    const made = (logs, k) => eqTex({ L: logs, R: [{ kind: 'num', k }] });
    const correct = { L: logsNew, R: [{ kind: 'num', k: Kabs }] };
    const bothNums = !rIsZero(cL) && !rIsZero(cR);
    const opts = [{ id: 'right', tex: eqTex(correct), ok: true }];
    if (move.length) {
      opts.push({
        id: 'nosign', tex: made(order([...stay, ...move]), Kabs), ok: false,
        why: M('A log changes sign when it crosses the equals sign. On the other side,', termBody(move[0]), move[0].c[0] > 0 ? 'has a minus in front of it.' : 'has a plus in front of it.'),
      });
    }
    if (bothNums) {
      opts.push({
        id: 'added', tex: made(logsNew, rAdd(rAbs(cL), rAbs(cR))), ok: false,
        why: `A number changes sign when it crosses the equals sign, so the two numbers are subtracted, not added: ${ratText(rAbs(toLeft ? cR : cL))} − ${ratText(rAbs(toLeft ? cL : cR))}.`,
      });
    }
    if (!rIsZero(Kabs)) {
      opts.push({
        id: 'negnum', tex: made(logsNew, rNeg(Kabs)), ok: false,
        why: bothNums
          ? `Subtract the right way round: ${ratText(toLeft ? cR : cL)} − ${ratText(toLeft ? cL : cR)} is positive.`
          : 'Check the sign of the number. Only a term that CROSSES the equals sign changes sign, and the logs and the number end up on opposite sides.',
      });
    }
    stages.push({
      id: 'collect', label: 'Collect the logs', type: 'pick',
      title: 'Get every log on one side and the number on the other.',
      sub: 'A term changes sign when it crosses the equals sign. Which line is right?',
      options: options(seed('collect'), opts),
      good: toLeft ? 'Right. Logs on one side, a number on the other.' : 'Right. It is the same equation, written with the logs first.',
      out: [eqTex(correct)],
    });
    E = correct;
  }
  const K = method === 'exp' ? E.R[0].k : null;

  /* ---- power: every number in front goes inside as a power ---- */
  const needPow = all(E).filter((t) => isLog(t) && !rIsOne(rAbs(t.c)));
  if (needPow.length) {
    const info = needPow.map((t, i) => {
      const abs = rAbs(t.c);
      if (t.arg.num) {
        const powered = ratPow(t.arg.num, abs);
        if (!powered) throw new Error(`${ratText(abs)} log of ${ratText(t.arg.num)} leaves a root inside the log`);
        if (powered[0] > MAX_TYPED || powered[1] > MAX_TYPED) throw new Error(`${ratText(t.arg.num)} to the power ${ratText(abs)} is too big to type`);
        return { t, key: `p${i}`, numeric: true, abs, want: powered };
      }
      if (!rIsInt(abs) || abs[0] > 3) throw new Error('a log with x inside needs a whole-number coefficient of 3 or less');
      return { t, key: `p${i}`, numeric: false, abs, want: abs };
    });
    const conv = (terms) => terms.map((t) => {
      const f = info.find((r) => r.t === t);
      if (!f) return t;
      return f.numeric ? { ...t, c: R(rSign(t.c)), arg: { num: f.want } } : { ...t, c: R(rSign(t.c)), pow: f.abs[0] };
    });
    const next = { L: conv(E.L), R: conv(E.R) };
    stages.push({
      id: 'power', label: 'Power law', type: 'fill',
      title: 'Power law first: move each number in front inside, as a power.',
      sub: M('', 'n\\log_{a} p = \\log_{a} p^{\\,n}', 'Leave any minus sign outside for now.'),
      rows: info.map((f) => {
        const sign = f.t.c[0] < 0 ? '-' : '';
        const left = `${sign}${ratLatex(f.abs)}${logTex(f.t.base, f.t.arg)} = ${sign}${head(f.t.base)}`;
        if (f.numeric) return [{ tex: left }, { box: f.key }];
        const [a, b] = f.t.arg.lin;
        return [{ tex: `${left}\\,${a === 1 && b === 0 ? 'x' : `(${linTex(f.t.arg.lin)})`}` }, { box: f.key, sup: true }];
      }),
      answers: Object.fromEntries(info.map((f) => [f.key, typedForm(f.want)])),
      judge: (typed) => {
        const marks = {};
        let why = null;
        for (const f of info) {
          const v = typedRat(typed[f.key]);
          const ok = !!v && rEq(v, f.want);
          marks[f.key] = ok;
          if (ok || why) continue;
          const n = f.numeric ? ratText(f.t.arg.num) : linText(f.t.arg.lin);
          const k = ratText(f.abs);
          if (f.numeric && v && rEq(v, rMul(f.abs, f.t.arg.num))) why = `The ${k} in front becomes a POWER, not a multiplier: ${k} log ${n} is log of ${n}^${k}, not log of ${k} × ${n}.`;
          else if (f.numeric) why = `Move the ${k} up as a power: work out ${n}^${rIsInt(f.abs) ? k : `(${k})`}.`;
          else why = `The number in front, ${k}, becomes the power of ${n}.`;
        }
        return { ok: Object.values(marks).every(Boolean), marks, why };
      },
      good: 'Right. Every number in front is now a power inside its log.',
      out: [eqTex(next)],
    });
    E = next;
  }

  /* ---- combine: one log on each side ---- */
  const FL = sideFraction(E.L);
  const FR = method === 'equal' ? sideFraction(E.R) : null;
  const needs = (terms) => terms.length >= 2 || (terms.length === 1 && terms[0].c[0] < 0);
  const needL = needs(E.L);
  const needR = method === 'equal' && needs(E.R);
  const rightTex = method === 'equal' ? logOfF(base, FR) : ratLatex(K);
  const combinedTex = `${logOfF(base, FL)} = ${rightTex}`;
  if (needL || needR) {
    if (unknown) {
      const sides = [needL ? { key: 'cl', terms: E.L, want: R(FL.top.k, FL.bot.k) } : null, needR ? { key: 'cr', terms: E.R, want: R(FR.top.k, FR.bot.k) } : null].filter(Boolean);
      stages.push({
        id: 'combine', label: 'Combine', type: 'fill',
        title: needL && needR ? 'Write each side as a single log.' : 'Write the logs as a single log.',
        sub: 'A plus between logs multiplies the numbers inside. A minus divides.',
        rows: sides.map((s) => [{ tex: `${sideTex(s.terms)} = ${head(base)}` }, { box: s.key }]),
        answers: Object.fromEntries(sides.map((s) => [s.key, typedForm(s.want)])),
        judge: (typed) => {
          const marks = {};
          let why = null;
          for (const s of sides) {
            const v = typedRat(typed[s.key]);
            const ok = !!v && rEq(v, s.want);
            marks[s.key] = ok;
            if (ok || why) continue;
            const minus = s.terms.some((t) => t.c[0] < 0);
            const sum = s.terms.reduce((acc, t) => rAdd(acc, t.c[0] > 0 ? t.arg.num : rNeg(t.arg.num)), ZERO);
            const product = s.terms.reduce((acc, t) => rMul(acc, t.arg.num), ONE);
            const names = s.terms.map((t) => ratText(t.arg.num));
            if (v && rEq(v, sum)) why = minus ? `Subtracting logs DIVIDES the numbers inside: ${names[0]} ÷ ${names[names.length - 1]}, not ${names[0]} − ${names[names.length - 1]}.` : `Adding logs MULTIPLIES the numbers inside: ${names.join(' × ')}, not ${names.join(' + ')}.`;
            else if (v && minus && rEq(v, product)) why = 'The log with a minus in front DIVIDES: its number goes underneath.';
            else if (v && !rIsZero(v) && rEq(v, rDiv(ONE, s.want))) why = 'Upside down. The number after the plus goes on top; the number after the minus goes underneath.';
            else why = 'A plus between logs multiplies the numbers inside, and a minus divides them.';
          }
          return { ok: Object.values(marks).every(Boolean), marks, why };
        },
        good: 'Right: one log.',
        out: [combinedTex],
      });
    } else {
      const variant = (fn) => {
        const l = needL ? fn(E.L) : logOfF(base, FL);
        const r = needR ? fn(E.R) : rightTex;
        return l && r ? `${l} = ${r}` : null;
      };
      const minus = [...(needL ? E.L : []), ...(needR ? E.R : [])].some((t) => t.c[0] < 0);
      const bothWays = [needL ? FL : null, needR ? FR : null].filter(Boolean).some((F) => !pIsOne(F.bot) && !pIsOne(F.top));
      const sumTex = variant((terms) => sumInsideTex(base, terms));
      const flipTex = variant((terms) => logOfF(base, flippedFraction(terms)));
      const invTex = bothWays ? variant((terms) => { const F = sideFraction(terms); return logOfF(base, { top: F.bot, bot: F.top }); }) : null;
      stages.push({
        id: 'combine', label: 'Combine', type: 'pick',
        title: needL && needR ? 'Write each side as a single log.' : 'Write the logs as a single log.',
        sub: 'A plus between logs multiplies the insides. A minus divides. Which line is right?',
        options: options(seed('combine'), [
          { id: 'right', tex: combinedTex, ok: true },
          sumTex && {
            id: 'sum', tex: sumTex, ok: false,
            why: minus
              ? 'The insides are never added or subtracted. A plus between logs MULTIPLIES the insides, and a minus DIVIDES them.'
              : 'Adding logs MULTIPLIES the insides: log a + log b = log(ab). It is never log(a + b).',
          },
          flipTex && { id: 'flip', tex: flipTex, ok: false, why: 'Check the sign in front of each log: a plus multiplies the insides, a minus divides them.' },
          invTex && { id: 'invert', tex: invTex, ok: false, why: 'Upside down. The log with the minus sign in front of it goes underneath.' },
        ]),
        good: 'Right: a single log.',
        out: [combinedTex],
      });
    }
  }

  /* ---- remove the logs ---- */
  let solve;           // { kind: 'linear' | 'quadratic' | 'power', roots, … }
  let freeTex;
  if (method === 'equal') {
    freeTex = `${fTex(FL)} = ${fTex(FR)}`;
    stages.push({
      id: 'remove', label: 'Remove the logs', type: 'pick',
      title: 'Both sides are single logs to the same base. What does that tell you?',
      options: options(seed('remove'), [
        { id: 'right', tex: freeTex, ok: true },
        {
          id: 'expo', tex: `${fTex(FL)} = ${base}^{${fTex(FR)}}`, ok: false,
          why: 'That is exponential form, which is for a plain NUMBER on the other side. Here the other side is a log as well, so the two insides are simply equal.',
        },
        {
          id: 'half', tex: `${logOfF(base, FL)} = ${fTex(FR)}`, ok: false,
          why: 'The log has come off one side only. Both sides are logs to the same base, so it comes off both.',
        },
      ]),
      good: 'Right: equal logs to the same base mean equal numbers.',
      out: [freeTex],
    });
  } else if (unknown) {
    const N = R(FL.top.k, FL.bot.k);
    freeTex = `x^{${ratLatex(K)}} = ${ratLatex(N)}`;
    stages.push({
      id: 'remove', label: 'Remove the log', type: 'fill',
      title: 'Remove the log: write it in exponential form.',
      sub: M('', `${logOfF(base, FL)} = ${ratLatex(K)}`, 'The base is x. What power is it raised to, and what does that give?'),
      rows: [[{ tex: 'x' }, { box: 'e', sup: true }, { tex: '=' }, { box: 'n' }]],
      answers: { e: typedForm(K), n: typedForm(N) },
      judge: (typed) => {
        const e = typedRat(typed.e);
        const n = typedRat(typed.n);
        const marks = { e: !!e && rEq(e, K), n: !!n && rEq(n, N) };
        if (marks.e && marks.n) return { ok: true, marks };
        let why = `${lt('x', ratText(N))} = ${ratText(K)} means: x, raised to the power ${ratText(K)}, gives ${ratText(N)}.`;
        if (e && n && rEq(e, N) && rEq(n, K)) why = `Swapped. The log IS the power, so ${ratText(K)} is the power and ${ratText(N)} is what the power gives.`;
        return { ok: false, marks, why };
      },
      good: 'Right: the log is the power.',
      out: [freeTex],
    });
  } else {
    const V = ratPow(R(base), K);
    if (!V) throw new Error(`${base} to the power ${ratText(K)} is not a whole number or a fraction`);
    if (V[0] > MAX_TYPED || V[1] > MAX_TYPED) throw new Error(`${powText(base, K)} is too big to type`);
    const FV = { top: { k: V[0], xp: 0, bins: [] }, bot: { k: V[1], xp: 0, bins: [] } };
    freeTex = `${fTex(FL)} = ${ratLatex(V)}`;
    stages.push({
      id: 'remove', label: 'Remove the log', type: 'fill',
      title: 'Remove the log: write it in exponential form.',
      sub: M('', `${logOfF(base, FL)} = ${ratLatex(K)}`, `means the inside equals ${base} to that power. Work the power out.`),
      rows: [[{ tex: `${fTex(FL)} =` }, { box: 'v' }]],
      hint: rIsInt(V) ? null : 'A fraction is typed like 1/2.',
      answers: { v: typedForm(V) },
      judge: (typed) => {
        const v = typedRat(typed.v);
        if (v && rEq(v, V)) return { ok: true, marks: { v: true } };
        let why = `Exponential form: the inside equals ${powText(base, K)}.${rIsInt(K) ? '' : ' A power of 1/2 is a square root.'}${K[0] < 0 ? ' A negative power is a reciprocal.' : ''}`;
        if (v && rEq(v, K)) why = `The log cannot simply be dropped: ${ratText(K)} is a POWER. The inside equals ${powText(base, K)}.`;
        else if (v && rEq(v, rMul(K, R(base)))) why = `The base is RAISED to the power, not multiplied by it: ${powText(base, K)}, not ${base} × ${ratText(K)}.`;
        else if (v && rIsInt(K) && K[0] > 0 && rEq(v, R(K[0] ** base))) why = `Base and power have swapped: it is ${powText(base, K)}, not ${ratText(K)}^${base}.`;
        return { ok: false, marks: { v: false }, why };
      },
      good: `Right: ${powText(base, K)} = ${ratText(V)}.`,
      out: [freeTex],
    });
    solve = { FR: FV };
  }

  /* ---- solve ---- */
  let roots;
  if (unknown) {
    const N = R(FL.top.k, FL.bot.k);
    if (rIsZero(K)) throw new Error('the log equals 0, so the base cannot be found');
    const r = ratPow(N, rDiv(ONE, K));
    if (!r) throw new Error(`x to the power ${ratText(K)} = ${ratText(N)} has no whole-number or fraction solution`);
    if (!rIsInt(K) && K[0] % 2 === 0) throw new Error('keep the power a whole number, or a fraction with an odd top');
    const two = rIsInt(K) && K[0] % 2 === 0;
    roots = two ? [rNeg(r), r] : [r];
    const kT = ratText(K);
    const nT = ratText(N);
    if (two) {
      stages.push({
        id: 'solve', label: 'Solve', type: 'fill',
        title: M('Solve', freeTex, 'Give BOTH roots.'),
        sub: 'Write both here, even one you expect to reject. The check comes next.',
        rows: [[{ tex: 'x =' }, { box: 'r0' }, { tex: '\\text{or}\\quad x =' }, { box: 'r1' }]],
        answers: { r0: typedForm(roots[1]), r1: typedForm(roots[0]) },
        judge: (typed) => judgeTwoRoots(typed, roots, (v) => {
          if (rEq(v[0], v[1]) && rEq(v[0], r)) return `An even power has two roots: ${ratText(r)} and ${ratText(rNeg(r))} both give ${nT} when raised to the power ${kT}. Write both; the check decides.`;
          if (v.some((x) => rEq(x, rDiv(N, K)))) return `Undo a power of ${kT} with a root, not by dividing by ${kT}.`;
          return `Which numbers, raised to the power ${kT}, give ${nT}? There is a positive one and a negative one.`;
        }),
        good: 'Right: two roots from the algebra. Now check them.',
        out: [orTex([roots[1], roots[0]])],
      });
    } else {
      stages.push({
        id: 'solve', label: 'Solve', type: 'fill',
        title: M('Solve', freeTex),
        sub: rIsInt(K) ? `An odd power has only one real root.` : `A power of ${kT} is a root. Undo it by raising both sides to the power ${ratText(rDiv(ONE, K))}.`,
        rows: [[{ tex: 'x =' }, { box: 'r0' }]],
        answers: { r0: typedForm(r) },
        judge: (typed) => {
          const v = typedRat(typed.r0);
          if (v && rEq(v, r)) return { ok: true, marks: { r0: true } };
          let why = `Which number, raised to the power ${kT}, gives ${nT}?`;
          if (v && rEq(v, rMul(N, K))) why = `That is ${nT} × ${kT}. A power is undone by a root (or by the opposite power), not by multiplying.`;
          else if (v && rEq(v, rDiv(N, K))) why = `That is ${nT} ÷ ${kT}. A power is undone by a root, not by dividing.`;
          else if (!rIsInt(K)) why = `x to the power ${kT} is ${nT}, so x is ${nT} raised to the power ${ratText(rDiv(ONE, K))}.`;
          return { ok: false, marks: { r0: false }, why };
        },
        good: 'Right.',
        out: [`x = ${ratLatex(r)}`],
      });
    }
  } else {
    const B = method === 'equal' ? FR : solve.FR;
    const crossL = pMul(FL.top, B.bot);
    const crossR = pMul(B.top, FL.bot);
    const PL = pPoly(crossL);
    const PR = pPoly(crossR);
    const hasDen = !pIsOne(FL.bot) || !pIsOne(B.bot);
    const crossTex = `${pTex(crossL)} = ${pTex(crossR)}`;
    const expandedTex = `${polyTex(polyTrim(PL))} = ${polyTex(polyTrim(PR))}`;
    const N = polyNorm(polyAdd(PL, PR, -1));
    const deg = N.length - 1;
    if (N.some((c) => Math.abs(c) > MAX_TYPED)) throw new Error('the numbers in the equation get too big to type');
    const startTex = hasDen ? crossTex : freeTex;
    const pure = [FL.top, FL.bot, B.top, B.bot].every((P) => !P.bins.length);
    const binomial = N.slice(1, deg).every((c) => c === 0);
    if (deg < 1) throw new Error('x cancels out of the equation');
    if (deg === 1) {
      const r = R(-N[0], N[1]);
      roots = [r];
      const showExpanded = expandedTex !== startTex && !pure;
      stages.push({
        id: 'solve', label: 'Solve', type: 'fill',
        title: M('Solve', freeTex),
        sub: hasDen ? M('Multiply both sides by what is underneath:', crossTex) : null,
        rows: [[{ tex: 'x =' }, { box: 'r0' }]],
        hint: rIsInt(r) ? null : 'A fraction is typed like 7/3.',
        answers: { r0: typedForm(r) },
        judge: (typed) => {
          const v = typedRat(typed.r0);
          if (v && rEq(v, r)) return { ok: true, marks: { r0: true } };
          if (v && !rIsZero(r) && rEq(v, rNeg(r))) return { ok: false, marks: { r0: false }, why: M('Right size, wrong sign. Put your value back into', startTex, 'and see which sign works.') };
          return { ok: false, marks: { r0: false }, why: showExpanded ? M('Not yet. Multiplied out, the equation is', expandedTex, 'Collect the x terms on one side.') : M('Not yet. Solve', startTex, 'one step at a time.') };
        },
        good: 'Right. One root from the algebra. Now check it.',
        out: [...(hasDen ? [crossTex] : []), ...(showExpanded ? [expandedTex] : []), `x = ${ratLatex(r)}`],
      });
    } else if (binomial && (pure || deg > 2)) {
      if (!pure) throw new Error('the equation is a cubic or higher that this screen cannot solve');
      const V = R(-N[0], N[deg]);
      const r = ratPow(V, R(1, deg));
      if (!r) throw new Error(`x^${deg} = ${ratText(V)} has no whole-number or fraction solution`);
      const two = deg % 2 === 0;
      roots = two ? [rNeg(r), r] : [r];
      const powTex = `x^{${deg}} = ${ratLatex(V)}`;
      const lead = freeTex === powTex ? [] : [powTex];
      if (two) {
        stages.push({
          id: 'solve', label: 'Solve', type: 'fill',
          title: M('Solve', freeTex, 'Give BOTH roots.'),
          sub: 'Write both here, even one you expect to reject. The check comes next.',
          rows: [[{ tex: 'x =' }, { box: 'r0' }, { tex: '\\text{or}\\quad x =' }, { box: 'r1' }]],
          answers: { r0: typedForm(r), r1: typedForm(rNeg(r)) },
          judge: (typed) => judgeTwoRoots(typed, roots, (v) => {
            if (rEq(v[0], v[1]) && rEq(v[0], r)) return `${ratText(r)} is one root. The other is ${ratText(rNeg(r))}: a negative number has the same even power. Write both; the check decides.`;
            if (v.some((x) => rEq(x, rDiv(V, R(deg))))) return `Undo a power of ${deg} with a root, not by dividing by ${deg}.`;
            return `Which numbers, raised to the power ${deg}, give ${ratText(V)}? There is a positive one and a negative one.`;
          }),
          good: 'Right: two roots from the algebra. Now check them.',
          out: [...lead, orTex([r, rNeg(r)])],
        });
      } else {
        stages.push({
          id: 'solve', label: 'Solve', type: 'fill',
          title: M('Solve', freeTex),
          sub: 'An odd power has only one real root.',
          rows: [[{ tex: 'x =' }, { box: 'r0' }]],
          answers: { r0: typedForm(r) },
          judge: (typed) => {
            const v = typedRat(typed.r0);
            if (v && rEq(v, r)) return { ok: true, marks: { r0: true } };
            return { ok: false, marks: { r0: false }, why: v && rEq(v, rDiv(V, R(deg))) ? `Undo a power of ${deg} with a root, not by dividing by ${deg}.` : `Which number, raised to the power ${deg}, gives ${ratText(V)}?` };
          },
          good: 'Right. Now check it.',
          out: [...lead, `x = ${ratLatex(r)}`],
        });
      }
    } else if (deg === 2) {
      const [c, b, a] = N;
      const disc = b * b - 4 * a * c;
      const s = Math.round(Math.sqrt(Math.max(disc, 0)));
      if (disc <= 0 || s * s !== disc) throw new Error(`the quadratic ${polyTex(N)} = 0 does not factorise into two different rational roots`);
      roots = [R(-b - s, 2 * a), R(-b + s, 2 * a)];
      const quadTex = `${polyTex(N)} = 0`;
      stages.push({
        id: 'tidy', label: 'Make a quadratic', type: 'fill',
        title: 'Multiply out, and collect every term on one side.',
        sub: hasDen ? M('First multiply both sides by what is underneath:', crossTex) : M('Start from', freeTex),
        rows: [[{ box: 'a' }, { tex: 'x^{2}\\ +' }, { box: 'b' }, { tex: 'x\\ +' }, { box: 'c' }, { tex: '= 0' }]],
        hint: 'Type a minus sign for a negative number, and 0 if a term is missing.',
        answers: { a: `${a}`, b: `${b}`, c: `${c}` },
        judge: (typed) => judgeQuadratic(typed, [a, b, c], ({ flipped }) => (flipped
          ? M('Every term that crosses the equals sign changes sign. Multiplied out, the equation is', expandedTex)
          : M('Not yet. Multiplied out, the equation is', expandedTex, 'Now move every term to one side.'))),
        good: 'Right: a quadratic equal to 0.',
        out: [...(hasDen ? [crossTex] : []), quadTex],
      });
      const fTexQ = factorTex(roots, a);
      const sumT = ratText(R(-b, a));
      const prodT = ratText(R(c, a));
      stages.push({
        id: 'solve', label: 'Solve', type: 'fill',
        title: M('Solve', quadTex, 'Give BOTH roots.'),
        sub: 'Write both here, even one you expect to reject. The check comes next.',
        rows: [[{ tex: 'x =' }, { box: 'r0' }, { tex: '\\text{or}\\quad x =' }, { box: 'r1' }]],
        hint: roots.every(rIsInt) ? null : 'A fraction is typed like 1/2.',
        answers: { r0: typedForm(roots[1]), r1: typedForm(roots[0]) },
        judge: (typed) => judgeTwoRoots(typed, roots, (v, marks) => {
          if (roots.every((r) => v.some((x) => rEq(x, rNeg(r)))) && !rIsZero(rAdd(roots[0], roots[1]))) return M('Both signs are the wrong way round. A bracket is zero when x has the OPPOSITE sign to its number:', fTexQ);
          if (marks.r0 !== marks.r1) return `One root is right. The two roots add up to ${sumT} and multiply to ${prodT}.`;
          return a === 1 ? `Factorise: find two numbers that multiply to ${c < 0 ? '−' : ''}${Math.abs(c)} and add to ${b < 0 ? '−' : ''}${Math.abs(b)}.` : `Factorise, or use the formula. The two roots add up to ${sumT} and multiply to ${prodT}.`;
        }),
        good: 'Right: two roots from the algebra. Now check them.',
        out: [fTexQ, orTex([roots[1], roots[0]])],
      });
    } else {
      throw new Error('the equation is a cubic or higher that this screen cannot solve');
    }
  }

  /* ---- check every root in the ORIGINAL equation ---- */
  const seenArg = new Set();
  const logsToCheck = argsChecked.filter((t) => {
    const key = `${t.base}|${t.arg.lin.join(',')}`;
    if (seenArg.has(key)) return false;
    seenArg.add(key);
    return true;
  });
  const candidates = [...roots].sort(rCmp).map((x) => {
    const xT = ratText(x);
    if (unknown) {
      const keep = x[0] > 0 && !rIsOne(x);
      return {
        x, xTex: ratLatex(x), xText: xT, keep,
        rows: [{ name: 'the base', tex: `x = ${ratLatex(x)}`, ok: keep }],
        why: keep ? `${xT} is positive and not 1, so it can be a base.` : x[0] <= 0 ? `A base must be positive, so ${xT} cannot be the base of a log.` : 'A base cannot be 1: every power of 1 is 1.',
        line: keep ? M(`Check x = ${xT}: the base is positive and not 1. Keep.`) : M(`Check x = ${xT}: a base must be positive. Reject.`),
      };
    }
    const rows = logsToCheck.map((t) => {
      const value = rAdd(rMul(R(t.arg.lin[0]), x), R(t.arg.lin[1]));
      return { name: logTex(t.base, t.arg), inside: linTex(t.arg.lin), tex: `${linTex(t.arg.lin)} = ${ratLatex(value)}`, value, ok: value[0] > 0 };
    });
    const keep = rows.every((r) => r.ok);
    const bad = rows.find((r) => !r.ok);
    let sides = null;
    if (keep) {
      const { lhs, rhs } = sidesAt(original, base, rValue(x));
      const v = (n) => `${approxTex(n).includes('.') && !Number.isInteger(n * 2) ? '≈ ' : '= '}${approxTex(n).replace('-', '−')}`;
      sides = `Left side ${v(lhs)}, right side ${v(rhs)}.`;
    }
    return {
      x, xTex: ratLatex(x), xText: xT, keep, rows, sides,
      why: keep
        ? 'Every log has a positive number inside, so every log exists and the two sides are equal.'
        : M(`A log needs a positive number inside. x = ${xT} puts ${ratText(bad.value)} inside`, bad.name, bad.value[0] === 0 ? 'and the log of 0 does not exist.' : 'and the log of a negative number does not exist.'),
      line: keep
        ? M(`Check x = ${xT}:`, rows.map((r) => r.tex).join(',\\quad '), rows.length > 1 ? 'All positive. Keep.' : 'Positive. Keep.')
        : M(`Check x = ${xT}:`, bad.tex, 'is not positive, so that log does not exist. Reject.'),
    };
  });
  const kept = candidates.filter((c) => c.keep).map((c) => c.x);
  stages.push({
    id: 'check', label: 'Check each root', type: 'keep',
    title: candidates.length > 1 ? 'Check each root in the ORIGINAL equation.' : 'Check the root in the ORIGINAL equation.',
    sub: unknown
      ? 'Here x is the base of every log. Can each value be a base?'
      : 'The app has worked out what goes inside each log. Does every log exist?',
    candidates,
    out: [],
  });

  /* ---- the values of x for which every log exists ---- */
  let domain;
  if (unknown) domain = { lo: ZERO, hi: null, empty: false, text: 'x > 0 and x ≠ 1', hole: ONE };
  else {
    let lo = null;
    let hi = null;
    for (const t of logsToCheck) {
      const [a, b] = t.arg.lin;
      const edge = R(-b, a);
      if (a > 0) { if (!lo || rCmp(edge, lo) > 0) lo = edge; } else if (!hi || rCmp(edge, hi) < 0) hi = edge;
    }
    const empty = !!lo && !!hi && rCmp(lo, hi) >= 0;
    const text = empty ? 'no value of x' : lo && hi ? `${ratText(lo)} < x < ${ratText(hi)}` : lo ? `x > ${ratText(lo)}` : `x < ${ratText(hi)}`;
    domain = { lo, hi, empty, text };
  }

  const answerTex = kept.length ? orTex(kept) : '\\text{No solution}';
  return {
    mode: 'eq', head: unknown ? 'Solve for the base x' : 'Solve the equation', questionTex: eqTex(original),
    lines: [{ tex: eqTex(original), big: true }],
    stages, candidates, kept, domain, unknown, base, method,
    final: [...candidates.map((c) => c.line), `\\therefore\\ ${answerTex}`],
    answerTex, baseText: bText,
  };
}

// ====================================================================== quad

function quadTerm(raw) {
  if (Array.isArray(raw)) {
    const [kind, coef, n] = raw;
    const c = toRat(coef);
    if (!c || rIsZero(c)) throw new Error('a term needs a non-zero coefficient');
    if (kind === 'sq') return { kind, c };
    if (kind === 'rec') return { kind, c };
    if (kind === 'log') {
      const pow = n ?? 1;
      if (!Number.isInteger(pow) || pow < 1 || pow > 6) throw new Error('the power of x inside a log must be a whole number from 1 to 6');
      return { kind, c, pow };
    }
    throw new Error(`unknown term kind "${kind}" — sq, log or rec`);
  }
  const k = toRat(raw);
  if (!k) throw new Error(`cannot read the term ${JSON.stringify(raw)}`);
  return { kind: 'num', c: k };
}

/** b^u as KaTeX when it is not rational: √7, 1/√10, ∛4. */
function surdPowTex(base, u) {
  const [p, q] = rAbs(u);
  let body;
  if (q === 2 && p === 1) body = `\\sqrt{${base}}`;
  else if (q === 2) body = `${base ** ((p - 1) / 2)}\\sqrt{${base}}`;
  else body = p === 1 ? `\\sqrt[${q}]{${base}}` : `\\sqrt[${q}]{${base ** p}}`;
  return u[0] < 0 ? `\\dfrac{1}{${body}}` : body;
}

function quadModel(item) {
  const base = item.base;
  if (!(Number.isInteger(base) && base >= 2 && base <= 20)) throw new Error('base must be a whole number from 2 to 20');
  if (!Array.isArray(item.L) || !Array.isArray(item.R) || !item.L.length || !item.R.length) throw new Error('needs L and R, each a list of terms');
  const L = item.L.map(quadTerm);
  const Rt = item.R.map(quadTerm);
  const allT = [...L, ...Rt];
  const hasSq = allT.some((t) => t.kind === 'sq');
  const hasRec = allT.some((t) => t.kind === 'rec');
  if (hasSq && hasRec) throw new Error('a squared log and an upside-down log together make a cubic');
  if (!hasSq && !hasRec) throw new Error('no squared log and no upside-down log: there is no quadratic here');
  const h = head(base);
  const lx = `${h} x`;
  const seed = (s) => `${item.id}:${s}`;

  const coefTex = (c) => (rIsOne(rAbs(c)) ? '' : ratLatex(rAbs(c)));
  const termTex = (t, down) => {
    if (t.kind === 'num') return ratLatex(rAbs(t.c));
    if (t.kind === 'sq') return `${coefTex(t.c)}\\left(${lx}\\right)^{2}`;
    if (t.kind === 'rec') return `${coefTex(t.c)}\\log_{x} ${base}`;
    if (t.pow === 1 || down) return `${coefTex(down ? rMul(t.c, R(t.pow)) : t.c)}${lx}`;
    return `${coefTex(t.c)}${h}\\left(x^{${t.pow}}\\right)`;
  };
  const uTex = (t) => {
    if (t.kind === 'num') return ratLatex(rAbs(t.c));
    if (t.kind === 'sq') return `${coefTex(t.c)}u^{2}`;
    if (t.kind === 'rec') return `\\dfrac{${ratLatex(rAbs(t.c))}}{u}`;
    return `${coefTex(rMul(t.c, R(t.pow)))}u`;
  };
  const side = (terms, f) => (terms.length === 1 && terms[0].kind === 'num' && rIsZero(terms[0].c) ? '0' : terms.map((t, i) => {
    const neg = t.c[0] < 0;
    if (i === 0) return `${neg ? '-' : ''}${f(t)}`;
    return `${neg ? '-' : '+'} ${f(t)}`;
  }).join(' '));
  const whole = (f) => `${side(L, f)} = ${side(Rt, f)}`;
  const questionTex = whole((t) => termTex(t, false));
  const stages = [];

  /* ---- bring the power down ---- */
  const powered = allT.filter((t) => t.kind === 'log' && t.pow > 1);
  if (powered.length) {
    const distinct = [...new Set(powered.map((t) => t.pow))];
    stages.push({
      id: 'down', label: 'Power down', type: 'fill',
      title: 'Bring the power down first.',
      sub: M('The power is on the x, inside the log, so the power law brings it to the front. It is NOT the same as', `\\left(${lx}\\right)^{2}`, 'where the whole log is squared.'),
      rows: distinct.map((n) => [{ tex: `${h}\\left(x^{${n}}\\right) =` }, { box: `d${n}` }, { tex: lx }]),
      answers: Object.fromEntries(distinct.map((n) => [`d${n}`, `${n}`])),
      judge: (typed) => {
        const marks = {};
        let why = null;
        for (const n of distinct) {
          const v = typedRat(typed[`d${n}`]);
          const ok = !!v && rEq(v, R(n));
          marks[`d${n}`] = ok;
          if (!ok && !why) why = `The power law: the log of x to the power ${n} is ${n} times the log of x. The ${n} comes down to the front.`;
        }
        return { ok: Object.values(marks).every(Boolean), marks, why };
      },
      good: 'Right. Now every log in the equation is the same log.',
      out: [whole((t) => termTex(t, true))],
    });
  }

  /* ---- the upside-down log ---- */
  if (hasRec) {
    stages.push({
      id: 'swap', label: 'Change the base', type: 'pick',
      title: M('One log has x as its BASE. Write', `\\log_{x} ${base}`, `in base ${base}.`),
      sub: M('Change of base:', `\\log_{x} ${base} = \\dfrac{${h} ${base}}{${lx}}`),
      options: options(seed('swap'), [
        { id: 'right', tex: `\\dfrac{1}{${lx}}`, ok: true },
        { id: 'neg', tex: `-${lx}`, ok: false, why: M('A minus sign comes from the log of a reciprocal. Swapping the base and the number is different: change of base gives', `\\dfrac{${h} ${base}}{${lx}}`, `and ${lt(base, `${base}`)} is 1.`) },
        { id: 'same', tex: lx, ok: false, why: `Swapping the base and the number changes the value: ${lt(base, `${base ** 2}`)} is 2, but ${lt(base ** 2, `${base}`)} is 1/2. It turns the log upside down.` },
        { id: 'still', tex: `\\dfrac{1}{\\log_{x} ${base}}`, ok: false, why: `That is 1 over the same log, and it is still in base x. The answer has to be in base ${base}.` },
      ]),
      good: 'Right: swapping the base and the number turns the log upside down.',
      out: [`\\log_{x} ${base} = \\dfrac{1}{${lx}}`],
    });
  }

  /* ---- the quadratic in u ---- */
  const sum = (kind, weight = () => ONE) => rSub(
    L.filter((t) => t.kind === kind).reduce((s, t) => rAdd(s, rMul(t.c, weight(t))), ZERO),
    Rt.filter((t) => t.kind === kind).reduce((s, t) => rAdd(s, rMul(t.c, weight(t))), ZERO),
  );
  const sq = sum('sq');
  const lg = sum('log', (t) => R(t.pow));
  const rc = sum('rec');
  const nm = sum('num');
  const raw = hasRec ? [lg, nm, rc] : [sq, lg, nm];            // a, b, c
  if (rIsZero(raw[0])) throw new Error('the squared terms cancel, so this is not a quadratic');
  const den = raw.reduce((l, r) => lcm(l, r[1]), 1);
  const ints = polyNorm(raw.map((r) => (r[0] * den) / r[1]).reverse()).reverse();   // [a, b, c], a > 0
  const [a, b, c] = ints;
  const disc = b * b - 4 * a * c;
  const s = Math.round(Math.sqrt(Math.max(disc, 0)));
  if (disc <= 0 || s * s !== disc) throw new Error(`the quadratic ${polyTex([c, b, a], 'u')} = 0 does not factorise into two different rational roots`);
  const roots = [R(-b - s, 2 * a), R(-b + s, 2 * a)];
  if (hasRec && roots.some(rIsZero)) throw new Error('u = 0 would make x = 1, which cannot be a base');
  const uForm = whole(uTex);
  const quadTex = `${polyTex([c, b, a], 'u')} = 0`;
  const numTerm = allT.find((t) => t.kind === 'num' && !rIsZero(t.c));
  stages.push({
    id: 'sub', label: 'Substitute', type: 'fill',
    title: M('Let', `u = ${lx}`, 'and write the equation as a quadratic in u, equal to 0.'),
    sub: M('In terms of u the equation is', uForm, hasRec ? 'Multiply EVERY term by u to clear the fraction, then collect on one side.' : 'Collect every term on one side.'),
    rows: [[{ box: 'a' }, { tex: 'u^{2}\\ +' }, { box: 'b' }, { tex: 'u\\ +' }, { box: 'c' }, { tex: '= 0' }]],
    hint: 'Type a minus sign for a negative number, and 0 if a term is missing.',
    answers: { a: `${a}`, b: `${b}`, c: `${c}` },
    judge: (typed) => {
      const res = judgeQuadratic(typed, [a, b, c], ({ flipped }) => (flipped
        ? 'Every term that crosses the equals sign changes sign. Check the signs of the terms you moved.'
        : hasRec
          ? 'Multiply every term by u: a plain number picks up a u, a term in u becomes u², and the fraction loses its u. Then collect on one side.'
          : 'Collect every term on one side, changing the sign of each term that crosses the equals sign.'));
      if (!res.ok && hasRec && numTerm) {
        // The plain number left as a number: it was not multiplied by u.
        const A = typedRat(typed.a); const B = typedRat(typed.b); const C = typedRat(typed.c);
        const n = rAbs(numTerm.c);
        if (A && B && C && !rIsZero(A) && rIsZero(B)) res.why = `Multiply EVERY term by u, the ${ratText(n)} as well: it becomes ${rIsOne(n) ? '' : rIsInt(n) ? ratText(n) : `(${ratText(n)})`}u, the middle term of the quadratic.`;
      }
      return res;
    },
    good: 'Right: a quadratic in u.',
    out: [M('Let', `u = ${lx}`), uForm, quadTex],
  });

  /* ---- solve for u ---- */
  const fT = factorTex(roots, a, 'u');
  const zeroRoot = roots.some(rIsZero);
  const other = roots.find((r) => !rIsZero(r));
  stages.push({
    id: 'roots', label: 'Solve for u', type: 'fill',
    title: M('Solve', quadTex, 'Give BOTH values of u.'),
    sub: zeroRoot ? 'Factorise it. Do not divide both sides by u.' : null,
    rows: [[{ tex: 'u =' }, { box: 'r0' }, { tex: '\\text{or}\\quad u =' }, { box: 'r1' }]],
    hint: roots.every(rIsInt) ? null : 'A fraction is typed like 1/2.',
    answers: { r0: typedForm(roots[1]), r1: typedForm(roots[0]) },
    judge: (typed) => judgeTwoRoots(typed, roots, (v, marks) => {
      if (zeroRoot && v.some((x) => rEq(x, other)) && !v.some(rIsZero)) return M(`Dividing both sides by u throws a root away: u = 0 also works. Take out the common factor instead:`, fT);
      if (b === 0 && rEq(v[0], v[1])) return `A square has two roots: u = ${ratText(roots[1])} and u = ${ratText(roots[0])}.`;
      if (roots.every((r) => v.some((x) => rEq(x, rNeg(r)))) && !rIsZero(rAdd(roots[0], roots[1]))) return M('Both signs are the wrong way round. A bracket is zero when u has the OPPOSITE sign to its number:', fT);
      if (marks.r0 !== marks.r1) return `One value is right. The two values add up to ${ratText(R(-b, a))} and multiply to ${ratText(R(c, a))}.`;
      return a === 1 ? `Factorise: find two numbers that multiply to ${c < 0 ? '−' : ''}${Math.abs(c)} and add to ${b < 0 ? '−' : ''}${Math.abs(b)}.` : `Factorise, or use the formula. The two values add up to ${ratText(R(-b, a))} and multiply to ${ratText(R(c, a))}.`;
    }),
    good: 'Right: two values of u.',
    out: [fT, orTex([roots[1], roots[0]], 'u')],
  });

  /* ---- back to x ---- */
  const order = [roots[1], roots[0]];
  const backs = order.map((u, i) => {
    const x = ratPow(R(base), u);
    const key = `x${i}`;
    if (x) {
      if (x[0] > MAX_TYPED || x[1] > MAX_TYPED) throw new Error(`${powText(base, u)} is too big to type`);
      return { u, key, x, tex: ratLatex(x) };
    }
    if (u[1] > 3 || Math.abs(u[0]) > 3) throw new Error(`${powText(base, u)} is too awkward a surd — keep fractional powers to halves and thirds`);
    const tex = surdPowTex(base, u);
    const inv = ratPow(R(base), rDiv(ONE, u));
    const opts = options(seed(key), [
      { id: 'right', tex },
      { id: 'times', tex: ratLatex(rMul(R(base), u)) },
      { id: 'sign', tex: u[0] < 0 ? `-${surdPowTex(base, rAbs(u))}` : surdPowTex(base, rNeg(u)) },
      inv && { id: 'inverse', tex: ratLatex(inv) },
    ]);
    return { u, key, x: null, tex, opts };
  });
  stages.push({
    id: 'back', label: 'Back to x', type: 'fill',
    title: M('Go back to x. Each value of u is a log:', `u = ${lx}`, `so x is ${base} to the power u.`),
    rows: backs.map((bk) => [{ tex: `u = ${ratLatex(bk.u)}:\\quad x =` }, bk.x ? { box: bk.key } : { choose: bk.key, options: bk.opts.map((o) => ({ id: o.id, tex: o.tex })) }]),
    hint: backs.some((bk) => bk.x && !rIsInt(bk.x)) ? 'A fraction is typed like 1/9.' : null,
    answers: Object.fromEntries(backs.map((bk) => [bk.key, bk.x ? typedForm(bk.x) : 'right'])),
    judge: (typed) => {
      const marks = {};
      let why = null;
      for (const bk of backs) {
        const uT = ratText(bk.u);
        const pw = powText(base, bk.u);
        if (!bk.x) {
          const ok = typed[bk.key] === 'right';
          marks[bk.key] = ok;
          if (ok || why) continue;
          if (typed[bk.key] === 'times') why = `x is a POWER of ${base}: ${pw}, not ${base} × ${uT}. A power of 1/2 is a square root.`;
          else if (typed[bk.key] === 'sign') why = bk.u[0] < 0 ? `A negative power gives a reciprocal, never a negative number: ${pw} is 1 over a root.` : `The power ${uT} is positive, so there is no reciprocal: ${pw} is a root.`;
          else why = `A power of ${uT} is a root, not the opposite power: ${pw}.`;
          continue;
        }
        const v = typedRat(typed[bk.key]);
        const ok = !!v && rEq(v, bk.x);
        marks[bk.key] = ok;
        if (ok || why) continue;
        if (v && rIsZero(bk.u) && rIsZero(v)) why = `${base} to the power 0 is not 0. Any number to the power 0 is the same small whole number.`;
        else if (v && rEq(v, bk.u)) why = `That is u. u = ${lt(base, 'x')}, so x is ${base} to the power u: ${pw}.`;
        else if (v && rEq(v, rMul(R(base), bk.u))) why = `x is a POWER of ${base}: ${pw}, not ${base} × ${uT}.`;
        else if (v && bk.u[0] < 0 && rEq(v, rNeg(ratPow(R(base), rAbs(bk.u)) || ZERO))) why = `A negative power gives a reciprocal, never a negative number: ${pw} is 1 over ${powText(base, rAbs(bk.u))}.`;
        else if (v && bk.u[0] < 0 && rEq(v, ratPow(R(base), rAbs(bk.u)) || ZERO)) why = `u is negative here, so x is a fraction: ${pw} is 1 over ${powText(base, rAbs(bk.u))}.`;
        else if (v && rIsInt(bk.u) && bk.u[0] > 0 && rEq(v, R(bk.u[0] ** base))) why = `Base and power have swapped: it is ${pw}, not ${uT}^${base}.`;
        else why = `u = ${lt(base, 'x')} means x = ${pw}. Work that power out.`;
      }
      return { ok: Object.values(marks).every(Boolean), marks, why };
    },
    good: 'Right: two values of x.',
    out: backs.map((bk) => `u = ${ratLatex(bk.u)}:\\quad x = ${base}^{${ratLatex(bk.u)}} = ${bk.tex}`),
  });

  const answerTex = backs.map((bk) => `x = ${bk.tex}`).join(' \\text{ or } ');
  return {
    mode: 'quad', head: 'Solve the equation', questionTex,
    lines: [{ tex: questionTex, big: true }],
    stages, roots, backs, base, hasRec, quad: [a, b, c],
    final: [
      M(`Both values of x are positive${hasRec ? ' and neither is 1' : ''}, so every log in the equation exists. Nothing is rejected.`),
      `\\therefore\\ ${answerTex}`,
    ],
    answerTex,
  };
}

// ====================================================================== base

const sig3 = (v) => Number(v.toPrecision(3));
const sigText = (v) => v.toPrecision(3).replace('-', '−');
const parseDecimal = (s) => {
  const t = String(s ?? '').replace(/−/g, '-').replace(/\s+/g, '');
  return /^-?(\d+\.?\d*|\.\d+)$/.test(t) ? Number(t) : null;
};
/** b^k as text for a message: 16, 1/4. */
const powValueText = (b, k) => (k >= 0 ? `${b ** k}` : `1/${b ** -k}`);

/** c0 + c1·L as KaTeX, L a letter: 3 + 2x, u/2, 3/2 + u/2. */
function linFormTex(c0, c1, L) {
  const lt1 = rIsOne(rAbs(c1)) ? L : rIsInt(c1) ? `${Math.abs(c1[0])}${L}` : `\\dfrac{${Math.abs(c1[0]) === 1 ? '' : Math.abs(c1[0])}${L}}{${c1[1]}}`;
  if (rIsZero(c0)) return `${c1[0] < 0 ? '-' : ''}${lt1}`;
  const c0t = rIsInt(c0) ? `${c0[0]}` : `${c0[0] < 0 ? '-' : ''}\\dfrac{${Math.abs(c0[0])}}{${c0[1]}}`;
  return `${c0t} ${c1[0] < 0 ? '-' : '+'} ${lt1}`;
}

function ruleOptions(seed, topTex, botTex) {
  return options(seed, [
    { id: 'right', tex: `\\dfrac{${topTex}}{${botTex}}`, ok: true },
    { id: 'upside', tex: `\\dfrac{${botTex}}{${topTex}}`, ok: false, why: 'Upside down. The log of the NUMBER goes on top, and the log of the old BASE goes underneath: the base stays at the bottom.' },
    { id: 'minus', tex: `${topTex} - ${botTex}`, ok: false, why: 'Subtracting two logs is the division LAW, for the log of a quotient. Change of base DIVIDES one log by another.' },
    { id: 'times', tex: `${topTex} \\times ${botTex}`, ok: false, why: 'Change of base divides: the log of the number, over the log of the old base.' },
  ]);
}

function baseModel(item) {
  const seed = (s) => `${item.id}:${s}`;
  const stages = [];

  if (item.kind === 'evaluate') {
    const base = item.base;
    const q = toRat(item.arg);
    if (!(Number.isInteger(base) && base >= 2 && base <= 20) || base === 10) throw new Error('base must be a whole number from 2 to 20, and not 10');
    if (!q || q[0] <= 0) throw new Error('the number must be positive');
    if (exactLog(base, q) !== null) throw new Error('this log is an exact number — it belongs in the Log Simplifier, not here');
    const n = rValue(q);
    const nTex = typeof item.arg === 'string' && item.arg.includes('.') ? item.arg : ratLatex(q);
    const nText = typeof item.arg === 'string' && item.arg.includes('.') ? item.arg : ratText(q);
    const v = Math.log(n) / Math.log(base);
    const want = sig3(v);
    const wantText = v.toPrecision(3);
    const k = Math.floor(v);
    const qTex = `${head(base)} ${nTex}`;
    const between = (lo) => `Between ${lo < 0 ? '−' : ''}${Math.abs(lo)} and ${lo + 1 < 0 ? '−' : ''}${Math.abs(lo + 1)}`;
    const reason = `${powText(base, R(k))} = ${powValueText(base, k)} and ${powText(base, R(k + 1))} = ${powValueText(base, k + 1)}, and ${nText} lies between them.`;
    const far = Math.floor(n / base);
    stages.push({
      id: 'bracket', label: 'Estimate', type: 'pick',
      title: M('Before the calculator:', qTex, 'lies between which two whole numbers?'),
      sub: `A log is a power. Which two powers of ${base} is ${nText} between?`,
      options: options(seed('bracket'), [
        { id: 'right', text: between(k), ok: true },
        { id: 'below', text: between(k - 1), ok: false, why: `Too low. ${reason}` },
        { id: 'above', text: between(k + 1), ok: false, why: `Too high. ${reason}` },
        far !== k && far !== k - 1 && far !== k + 1
          ? { id: 'divide', text: between(far), ok: false, why: `That is ${nText} ÷ ${base}. A log is a POWER: ${reason}` }
          : { id: 'further', text: between(k + 2), ok: false, why: `Too high. ${reason}` },
      ]),
      good: `Right: ${reason}`,
      out: [M('Estimate:', `${k} < ${qTex} < ${k + 1}`)],
    });
    stages.push({
      id: 'rule', label: 'Change the base', type: 'pick',
      title: M('The calculator has lg. Write', qTex, 'with logs to base 10.'),
      options: [
        ...ruleOptions(seed('rule'), `\\lg ${nTex}`, `\\lg ${base}`).filter((o) => o.id !== 'times'),
        { id: 'inside', tex: `\\lg\\left(\\dfrac{${nTex}}{${base}}\\right)`, ok: false, why: `That is the log of ${nText} ÷ ${base}, one log of a quotient. Change of base divides two separate logs.` },
      ],
      good: 'Right: the log of the number, over the log of the base.',
      out: [`${qTex} = \\dfrac{\\lg ${nTex}}{\\lg ${base}}`],
    });
    const quotient = Math.log10(n / base);
    stages.push({
      id: 'value', label: 'Evaluate', type: 'fill',
      title: 'Work it out on the calculator, correct to 3 significant figures.',
      rows: [[{ tex: `\\dfrac{\\lg ${nTex}}{\\lg ${base}} =` }, { box: 'v', width: 'w-28', decimal: true }]],
      hint: 'Type a decimal. Count three figures from the first one that is not zero.',
      answers: { v: wantText },
      judge: (typed) => {
        const t = parseDecimal(typed.v);
        if (t === null) return { ok: false, marks: { v: false }, nudge: true, why: 'Type a decimal number, such as 2.58.' };
        if (t === want) return { ok: true, marks: { v: true } };
        if (sig3(t) === want) return { ok: false, marks: { v: false }, nudge: true, why: 'That is the right value. Now round it to 3 significant figures.' };
        if (t === Number(v.toPrecision(2)) || t === Number(v.toPrecision(1))) return { ok: false, marks: { v: false }, nudge: true, why: 'Right so far, but that is not 3 significant figures. Count three figures from the first one that is not zero.' };
        let why = `On the calculator: lg ${nText} ÷ lg ${base}. Check it against your estimate: between ${k} and ${k + 1}.`.replace(/-/g, '−');
        if (Math.abs(t - 1 / v) < 0.006 * Math.abs(1 / v) + 0.0006) why = `Upside down: that is lg ${base} ÷ lg ${nText}. The number goes on top. Your estimate said between ${k} and ${k + 1}.`.replace(/-/g, '−');
        else if (Math.abs(t + v) < 0.006 * Math.abs(v)) why = n < 1 ? `Check the sign. lg ${nText} is negative, because ${nText} is less than 1, so the answer is negative.` : `Check the sign. ${nText} is more than 1, so its log is positive.`;
        else if (Math.abs(t - quotient) < 0.006 * Math.abs(quotient) + 0.0006) why = `That is lg(${nText} ÷ ${base}). Work out lg ${nText} and lg ${base} separately, then divide one by the other.`;
        return { ok: false, marks: { v: false }, why };
      },
      good: `Right: ${sigText(v)}, and it sits between ${k} and ${k + 1}, as you estimated.`.replace(/-(\d)/g, '−$1'),
      out: [`${qTex} = ${wantText}\\ \\text{(3 s.f.)}`],
    });
    return {
      mode: 'base', kind: 'evaluate', head: 'Evaluate, correct to 3 significant figures', questionTex: qTex,
      lines: [{ tex: qTex, big: true }], stages, final: [], answerTex: `${qTex} = ${wantText}`, value: v, want,
    };
  }

  if (item.kind === 'swap' || item.kind === 'rebase') {
    const G = item.given;
    const L = item.letter || 'u';
    const of = item.of || 'x';
    if (!(Number.isInteger(G) && G >= 2 && G <= 20)) throw new Error('given must be a whole-number base from 2 to 20');
    const hG = head(G);
    const givenTex = `${L} = ${hG} ${of}`;
    let targetTex; let topTex; let botTex; let rawTex; let c0; let c1; let recip = false;
    let ratio = null;      // rebase: log_G(target)
    let shift = ZERO;      // rebase: log_G(times)
    const parts = [];
    if (item.kind === 'swap') {
      const a = argOf(item.num);
      const k = ppRatio(a.pp, ppOfRat(R(G)));
      if (k === null || rIsZero(k)) throw new Error(`the number is not a power of ${G}`);
      const bare = /^\d+$/.test(a.latex) || /^\\sqrt/.test(a.latex);
      const numLog = bare ? `${hG} ${a.latex}` : `${hG}\\left(${a.latex}\\right)`;
      targetTex = bare ? `\\log_{${of}} ${a.latex}` : `\\log_{${of}}\\left(${a.latex}\\right)`;
      topTex = numLog; botTex = `${hG} ${of}`;
      parts.push({ key: 'top', tex: `${numLog} =`, want: k, name: `the log of the number, to base ${G}`, ask: `${G} to what power gives the number?` });
      rawTex = `\\dfrac{${ratLatex(k)}}{${L}}`;
      recip = true;
      c0 = k;          // the answer is k / L
    } else {
      const T = item.target;
      if (!Number.isInteger(T) || T < 2 || T > 100 || T === G) throw new Error('target must be a different whole-number base');
      const r = exactLog(G, R(T));
      if (r === null || rIsZero(r)) throw new Error(`base ${T} is not a power of ${G}`);
      let k = ZERO;
      let argT = of;
      if (item.times !== undefined) {
        const tq = toRat(item.times);
        k = tq && tq[0] > 0 ? exactLog(G, tq) : null;
        if (k === null || rIsZero(k)) throw new Error(`the number in front of ${of} must be a power of ${G}`);
        argT = `${ratLatex(tq)}${of}`;
      }
      const bracket = item.times !== undefined;
      targetTex = bracket ? `\\log_{${T}}\\left(${argT}\\right)` : `\\log_{${T}} ${argT}`;
      topTex = bracket ? `${hG}\\left(${argT}\\right)` : `${hG} ${argT}`;
      botTex = `${hG} ${T}`;
      parts.push({ key: 'bot', tex: `${hG} ${T} =`, want: r, name: `the log of the new base, to base ${G}`, ask: `${G} to what power gives ${T}?` });
      if (bracket) parts.push({ key: 'top', tex: `${hG} ${ratLatex(toRat(item.times))} =`, want: k, name: `the log of ${ratText(toRat(item.times))}, to base ${G}`, ask: `${G} to what power gives ${ratText(toRat(item.times))}?` });
      const topRaw = bracket ? `${ratLatex(k)} + ${L}` : L;
      rawTex = `\\dfrac{${topRaw}}{${ratLatex(r)}}`;
      c0 = rDiv(k, r); c1 = rDiv(ONE, r);
      ratio = r; shift = k;
    }
    stages.push({
      id: 'rule', label: 'Change the base', type: 'pick',
      title: M('Change', targetTex, `to base ${G}, the base you are given.`),
      options: ruleOptions(seed('rule'), topTex, botTex),
      good: 'Right: the log of the number, over the log of the old base.',
      out: [`${targetTex} = \\dfrac{${topTex}}{${botTex}}`],
    });
    stages.push({
      id: 'parts', label: 'Evaluate the numbers', type: 'fill',
      title: parts.length > 1 ? 'Evaluate the two logs that have only numbers in them.' : 'Evaluate the log that has only numbers in it.',
      sub: M('You are given', givenTex, item.kind === 'rebase' && item.times !== undefined ? `and the log of a product is a sum.` : null),
      rows: parts.map((p) => [{ tex: p.tex }, { box: p.key }]),
      hint: parts.every((p) => rIsInt(p.want)) ? null : 'A fraction is typed like 1/2.',
      answers: Object.fromEntries(parts.map((p) => [p.key, typedForm(p.want)])),
      judge: (typed) => {
        const marks = {};
        let why = null;
        for (const p of parts) {
          const v = typedRat(typed[p.key]);
          const ok = !!v && rEq(v, p.want);
          marks[p.key] = ok;
          if (ok || why) continue;
          if (v && !rIsOne(rAbs(p.want)) && rEq(v, rDiv(ONE, p.want))) why = `Upside down. This is ${p.name}: ${p.ask}`;
          else if (v && rEq(v, rNeg(p.want))) why = `Check the sign. A number less than 1 has a negative log; a number more than 1 has a positive one.`;
          else why = `This is ${p.name}: ${p.ask}${rIsInt(p.want) ? '' : ' The power is a fraction, because a root is a fractional power.'}`;
        }
        return { ok: Object.values(marks).every(Boolean), marks, why };
      },
      good: 'Right.',
      out: [`${targetTex} = ${rawTex}`],
    });
    let answerTex;
    if (recip) {
      const k = c0;
      const mag = rAbs(k);
      const sgn = k[0] < 0 ? '-' : '';
      // top over bot, written flat when the bottom is 1.
      const form = (top, bot) => (bot === '1' ? `${sgn}${top}` : `${sgn}\\dfrac{${top}}{${bot}}`);
      const withL = (n) => (n === 1 ? L : `${n}${L}`);
      answerTex = form(`${mag[0]}`, withL(mag[1]));
      if (!rIsInt(k) || k[0] < 0) {
        stages.push({
          id: 'simplify', label: 'Simplify', type: 'pick',
          title: M('Simplify', rawTex),
          options: options(seed('simplify'), [
            { id: 'right', tex: answerTex, ok: true },
            { id: 'flip', tex: form(withL(mag[1]), `${mag[0]}`), ok: false, why: `Upside down: ${L} is the log of the old base, so it stays underneath.` },
            mag[1] === 1 ? null : { id: 'floor', tex: form(`${mag[1]}`, withL(mag[0])), ok: false, why: `Dividing by ${L} puts ${L} underneath, and the ${mag[1]} from the fraction joins it there.` },
            k[0] < 0
              ? { id: 'sign', tex: `\\dfrac{${mag[0]}}{${withL(mag[1])}}`, ok: false, why: 'The minus sign has been lost. The log of a number less than 1 is negative.' }
              : { id: 'prod', tex: `${ratLatex(k)}${L}`, ok: false, why: `It is ${ratText(k)} DIVIDED by ${L}, not multiplied.` },
            k[0] < 0 ? { id: 'plain', tex: L, ok: false, why: `${L} is underneath, and the minus sign stays: the log of a number less than 1 is negative.` } : null,
          ]),
          good: 'Right.',
          out: [`${targetTex} = ${answerTex}`],
        });
      }
    } else {
      const r = ratio;
      const k = shift;
      answerTex = linFormTex(c0, c1, L);
      if (!(rIsInt(r) && rIsZero(k))) {
        const mulTex = linFormTex(rMul(k, r), r, L);
        const partTex = rIsZero(k) ? `\\dfrac{${r[0]}}{${r[1] === 1 ? '' : r[1]}${L}}` : linFormTex(k, c1, L);
        stages.push({
          id: 'simplify', label: 'Simplify', type: 'pick',
          title: M('Simplify', rawTex),
          options: options(seed('simplify'), [
            { id: 'right', tex: answerTex, ok: true },
            { id: 'mul', tex: mulTex, ok: false, why: rIsInt(r) ? `Divide by ${ratText(r)}; do not multiply by it.` : `Dividing by ${ratText(r)} is the same as multiplying by ${ratText(rDiv(ONE, r))}. You multiplied by ${ratText(r)} instead.` },
            { id: 'part', tex: partTex, ok: false, why: rIsZero(k) ? `${L} is on top: it is ${L} divided by ${ratText(r)}.` : `Divide BOTH terms on top by ${ratText(r)}, the ${ratText(k)} as well as the ${L}.` },
          ]),
          good: 'Right.',
          out: [`${targetTex} = ${answerTex}`],
        });
      }
    }
    return {
      mode: 'base', kind: item.kind, head: `Write in terms of ${L}`, questionTex: targetTex,
      lines: [{ text: 'Given that', tex: givenTex }, { text: `find, in terms of ${L}:`, tex: targetTex, big: true }],
      stages, final: [], answerTex: `${targetTex} = ${answerTex}`,
    };
  }

  if (item.kind === 'from2') {
    const p = item.base || 'p';
    const [an, av] = item.a || [];
    const [bn, bv] = item.b || [];
    const [newBase, arg] = item.find || [];
    const A = toRat(av);
    const B = toRat(bv);
    if (!an || !bn || !A || !B || rIsZero(A) || rIsZero(B)) throw new Error('needs a: [name, value] and b: [name, value], both values non-zero');
    const val = { [an]: A, [bn]: B };
    if (!val[newBase] || !val[arg] || newBase === arg) throw new Error('find must be [newBase, arg], the two names the other way round');
    const want = rDiv(val[arg], val[newBase]);
    const hp = `\\log_{${p}}`;
    const targetTex = `\\log_{${newBase}} ${arg}`;
    const top = `${hp} ${arg}`;
    const bot = `${hp} ${newBase}`;
    stages.push({
      id: 'rule', label: 'Change the base', type: 'pick',
      title: M('Change', targetTex, `to base ${p}, the base both logs are given in.`),
      options: ruleOptions(seed('rule'), top, bot),
      good: `Right: the log of ${arg}, over the log of the new base ${newBase}.`,
      out: [`${targetTex} = \\dfrac{${top}}{${bot}}`],
    });
    stages.push({
      id: 'value', label: 'Evaluate', type: 'fill',
      title: 'Put the two values in.',
      sub: M('', `${hp} ${an} = ${ratLatex(A)},\\quad ${hp} ${bn} = ${ratLatex(B)}`),
      rows: [[{ tex: `${targetTex} =` }, { box: 'v' }]],
      hint: rIsInt(want) ? null : 'A fraction is typed like 2/3.',
      answers: { v: typedForm(want) },
      judge: (typed) => {
        const v = typedRat(typed.v);
        if (v && rEq(v, want)) return { ok: true, marks: { v: true } };
        const tT = ratText(val[arg]);
        const bT = ratText(val[newBase]);
        let why = `Divide the log of ${arg} by the log of ${newBase}: ${tT} ÷ ${bT}.`;
        if (v && rEq(v, rDiv(val[newBase], val[arg]))) why = `Upside down: that is ${bT} ÷ ${tT}. The new base, ${newBase}, goes underneath.`;
        else if (v && rEq(v, rSub(val[arg], val[newBase]))) why = `That is ${tT} − ${bT}. Subtracting is for the log of a quotient; change of base DIVIDES the two logs.`;
        else if (v && rEq(v, rMul(val[arg], val[newBase]))) why = `That is ${tT} × ${bT}. Change of base DIVIDES the two logs.`;
        return { ok: false, marks: { v: false }, why };
      },
      good: 'Right.',
      out: [`${targetTex} = \\dfrac{${ratLatex(val[arg])}}{${ratLatex(val[newBase])}} = ${ratLatex(want)}`],
    });
    return {
      mode: 'base', kind: 'from2', head: 'Find the value', questionTex: targetTex,
      lines: [{ text: 'Given that', tex: `${hp} ${an} = ${ratLatex(A)} \\ \\text{ and } \\ ${hp} ${bn} = ${ratLatex(B)}` }, { text: 'find the value of', tex: targetTex, big: true }],
      stages, final: [], answerTex: `${targetTex} = ${ratLatex(want)}`,
    };
  }

  if (item.kind === 'product') {
    const logs = item.logs || [];
    if (logs.length !== 2) throw new Error('a product item has exactly two logs, [[base, arg], [base, arg]]');
    const [[b0, a0], [b1, a1]] = logs;
    let link; let B; let N;
    if (a0 === b1) { link = a0; B = b0; N = a1; } else if (a1 === b0) { link = a1; B = b1; N = a0; } else throw new Error('the two logs must chain: the number of one is the base of the other');
    if (!Number.isInteger(B) || !Number.isInteger(N) || B < 2 || N < 2) throw new Error('the base and the number that are left must be whole numbers');
    const want = exactLog(B, R(N));
    if (want === null) throw new Error(`log base ${B} of ${N} is not an exact number`);
    const lg = (x) => `\\lg ${x}`;
    const one = (b, a) => `\\log_{${b}} ${a}`;
    const qTex = `${one(b0, a0)} \\times ${one(b1, a1)}`;
    const spread = `\\dfrac{${lg(a0)}}{${lg(b0)}} \\times \\dfrac{${lg(a1)}}{${lg(b1)}}`;
    const numeric = Number.isInteger(link);
    stages.push({
      id: 'chain', label: 'Cancel', type: 'pick',
      title: 'Write both logs in base 10, then cancel. Which single log is left?',
      sub: M('', `${qTex} = ${spread}`),
      options: options(seed('chain'), [
        { id: 'right', tex: one(B, N), ok: true },
        { id: 'upside', tex: one(N, B), ok: false, why: `Upside down. After cancelling lg ${link}, lg ${N} is on top and lg ${B} is underneath, and the one underneath is the base.` },
        numeric ? { id: 'multiply', tex: one(link, N * B), ok: false, why: `Multiplying the numbers inside is for ADDING two logs of the same base. Here two logs are multiplied, and lg ${link} cancels.` } : null,
        { id: 'one', text: '1: everything cancels', ok: false, why: `Only lg ${link} appears on top and underneath. lg ${N} and lg ${B} are still there.` },
      ]),
      good: `Right: lg ${link} cancels, leaving lg ${N} over lg ${B}.`,
      out: [`${qTex} = ${spread} = \\dfrac{${lg(N)}}{${lg(B)}} = ${one(B, N)}`],
    });
    stages.push({
      id: 'value', label: 'Evaluate', type: 'fill',
      title: M('Evaluate', one(B, N)),
      sub: `${B} to what power gives ${N}?`,
      rows: [[{ tex: `${one(B, N)} =` }, { box: 'v' }]],
      hint: rIsInt(want) ? null : 'A fraction is typed like 1/2.',
      answers: { v: typedForm(want) },
      judge: (typed) => {
        const v = typedRat(typed.v);
        if (v && rEq(v, want)) return { ok: true, marks: { v: true } };
        let why = `${lt(B, `${N}`)} asks: ${B} to what power gives ${N}?${rIsInt(want) ? '' : ' The power is a fraction, because a root is a fractional power.'}`;
        if (v && !rIsOne(want) && rEq(v, rDiv(ONE, want))) why = `Upside down. ${lt(B, `${N}`)} asks what power of ${B} gives ${N}; ${ratText(v)} is the power of ${N} that gives ${B}.`;
        else if (v && rEq(v, R(N, B))) why = `A log is not a division. ${B} to what power gives ${N}?`;
        return { ok: false, marks: { v: false }, why };
      },
      good: 'Right.',
      out: [`${one(B, N)} = ${ratLatex(want)}`],
    });
    return {
      mode: 'base', kind: 'product', head: 'Evaluate the product', questionTex: qTex,
      lines: [{ tex: qTex, big: true }], stages, final: [], answerTex: `${qTex} = ${ratLatex(want)}`,
    };
  }

  if (item.kind === 'related') {
    const base = item.base;
    if (!(Number.isInteger(base) && base >= 2 && base <= 20)) throw new Error('base must be a whole number from 2 to 20');
    const term = (raw) => {
      if (Array.isArray(raw)) {
        const c = toRat(raw[0]);
        if (!c || rIsZero(c)) throw new Error('a log term needs a non-zero coefficient');
        const B = raw[1];
        const m = B === base ? ONE : exactLog(base, R(B));
        if (!m || !rIsInt(m) || m[0] < 1) throw new Error(`base ${B} is not a whole-number power of ${base} — make the SMALLER base the item's base`);
        return { kind: 'log', c, B, m: m[0] };
      }
      const k = toRat(raw);
      if (!k) throw new Error(`cannot read the term ${JSON.stringify(raw)}`);
      return { kind: 'num', c: k };
    };
    const L = (item.L || []).map(term);
    const Rt = (item.R || []).map(term);
    const allT = [...L, ...Rt];
    const foreign = [...new Set(allT.filter((t) => t.kind === 'log' && t.B !== base).map((t) => t.B))];
    if (!foreign.length) throw new Error('every log is already in the same base');
    const mOf = Object.fromEntries(allT.filter((t) => t.kind === 'log').map((t) => [t.B, t.m]));
    const coef = (c) => (rIsOne(rAbs(c)) ? '' : ratLatex(rAbs(c)));
    const tTex = (t) => (t.kind === 'num' ? ratLatex(rAbs(t.c)) : `${coef(t.c)}${head(t.B)} x`);
    const uT = (t) => {
      if (t.kind === 'num') return ratLatex(rAbs(t.c));
      const c = rAbs(rDiv(t.c, R(t.m)));
      return `${rIsOne(c) ? '' : ratLatex(c)}u`;
    };
    const side = (terms, f) => terms.map((t, i) => {
      const neg = t.c[0] < 0;
      if (i === 0) return `${neg ? '-' : ''}${f(t)}`;
      return `${neg ? '-' : '+'} ${f(t)}`;
    }).join(' ');
    const qTex = `${side(L, tTex)} = ${side(Rt, tTex)}`;
    const uForm = `${side(L, uT)} = ${side(Rt, uT)}`;
    const sumLogs = (terms, w) => terms.filter((t) => t.kind === 'log').reduce((s, t) => rAdd(s, w(t)), ZERO);
    const sumNums = (terms) => terms.filter((t) => t.kind === 'num').reduce((s, t) => rAdd(s, t.c), ZERO);
    const A = rSub(sumLogs(L, (t) => rDiv(t.c, R(t.m))), sumLogs(Rt, (t) => rDiv(t.c, R(t.m))));
    const Kc = rSub(sumNums(Rt), sumNums(L));
    if (rIsZero(A)) throw new Error('the logs cancel out');
    if (rIsZero(Kc)) throw new Error('the number is 0, so u = 0 and x = 1 — too thin a question');
    const u = rDiv(Kc, A);
    const x = ratPow(R(base), u);
    if (!x || x[0] > MAX_TYPED || x[1] > MAX_TYPED) throw new Error(`${powText(base, u)} is not a whole number or fraction small enough to type`);
    const plain = rSub(sumLogs(L, (t) => t.c), sumLogs(Rt, (t) => t.c));
    const multiplied = rSub(sumLogs(L, (t) => rMul(t.c, R(t.m))), sumLogs(Rt, (t) => rMul(t.c, R(t.m))));
    const f0 = allT.find((t) => t.kind === 'log' && t.B !== base);
    stages.push({
      id: 'rebase', label: 'Change the base', type: 'fill',
      title: `${foreign.length > 1 ? 'Three' : 'Two'} related bases. Change every log to base ${base}, the smallest.`,
      sub: M('Change of base:', `\\log_{${f0.B}} x = \\dfrac{${head(base)} x}{${head(base)} ${f0.B}}`, foreign.length > 1 ? 'What are the numbers underneath?' : 'What is the number underneath?'),
      rows: foreign.map((B, i) => [{ tex: `${head(base)} ${B} =` }, { box: `m${i}` }]),
      answers: Object.fromEntries(foreign.map((B, i) => [`m${i}`, `${mOf[B]}`])),
      judge: (typed) => {
        const marks = {};
        let why = null;
        foreign.forEach((B, i) => {
          const v = typedRat(typed[`m${i}`]);
          const ok = !!v && rEq(v, R(mOf[B]));
          marks[`m${i}`] = ok;
          if (ok || why) return;
          if (v && rEq(v, R(1, mOf[B]))) why = `Upside down. ${lt(base, `${B}`)} asks what power of ${base} gives ${B}; ${ratText(v)} is ${lt(B, `${base}`)}.`;
          else if (v && rEq(v, R(B, base)) && B / base !== mOf[B]) why = `${lt(base, `${B}`)} is a power, not ${B} ÷ ${base}. ${base} to what power gives ${B}?`;
          else why = `${lt(base, `${B}`)} asks: ${base} to what power gives ${B}?`;
        });
        return { ok: Object.values(marks).every(Boolean), marks, why };
      },
      good: `Right. Every log is now a multiple of ${lt(base, 'x')}.`,
      out: foreign.map((B) => `\\log_{${B}} x = \\dfrac{${head(base)} x}{${head(base)} ${B}} = \\dfrac{1}{${mOf[B]}}${head(base)} x`),
    });
    stages.push({
      id: 'collect', label: 'Collect', type: 'fill',
      title: M('Let', `u = ${head(base)} x`, 'and collect the u terms.'),
      sub: M('In terms of u the equation is', uForm),
      rows: [[{ box: 'a' }, { tex: 'u\\ =' }, { box: 'k' }]],
      hint: 'A fraction is typed like 5/2. Any correct multiple is accepted.',
      answers: { a: typedForm(A), k: typedForm(Kc) },
      judge: (typed) => {
        const a = typedRat(typed.a);
        const k = typedRat(typed.k);
        if (!a || !k) return { ok: false, marks: { a: !!a, k: !!k }, why: 'Type a number in both boxes.' };
        if (!rIsZero(a) && rEq(rMul(a, Kc), rMul(k, A))) return { ok: true, marks: { a: true, k: true } };
        const marks = { a: rEq(a, A), k: rEq(k, Kc) };
        let why = M('Add up the u terms in', uForm, 'and keep the number on the other side.');
        if (rEq(a, plain) && !rEq(plain, A)) why = `That counts ${lt(f0.B, 'x')} as a whole u. It is only 1/${f0.m} of one, because ${lt(base, `${f0.B}`)} = ${f0.m}.`;
        else if (rEq(a, multiplied) && !rEq(multiplied, A)) why = `Divide by ${lt(base, `${f0.B}`)} = ${f0.m}; do not multiply by it. ${lt(f0.B, 'x')} is u ÷ ${f0.m}.`;
        else if (marks.a && rEq(k, rNeg(Kc))) why = 'Check the sign of the number. Only a term that crosses the equals sign changes sign.';
        return { ok: false, marks, why };
      },
      good: 'Right: one equation in u.',
      out: [M('Let', `u = ${head(base)} x`), uForm, `${rIsOne(A) ? '' : ratLatex(A)}u = ${ratLatex(Kc)}`],
    });
    stages.push({
      id: 'solve', label: 'Solve', type: 'fill',
      title: 'Solve for u, then go back to x.',
      sub: M('Remember', `u = ${head(base)} x`),
      rows: [[{ tex: 'u =' }, { box: 'u' }], [{ tex: 'x =' }, { box: 'x' }]],
      answers: { u: typedForm(u), x: typedForm(x) },
      judge: (typed) => {
        const tu = typedRat(typed.u);
        const tx = typedRat(typed.x);
        const marks = { u: !!tu && rEq(tu, u), x: !!tx && rEq(tx, x) };
        if (marks.u && marks.x) return { ok: true, marks };
        let why = `u = ${lt(base, 'x')} means x is ${base} to the power u.`;
        if (!marks.u) why = tu && rEq(tu, rMul(Kc, A)) ? `Divide ${ratText(Kc)} by ${ratText(A)}; do not multiply.` : `Divide both sides by ${ratText(A)}: u = ${ratText(Kc)} ÷ ${ratText(A)}.`;
        else if (tx && rEq(tx, u)) why = `That is u again. u = ${lt(base, 'x')}, so x is ${base} to the power u: ${powText(base, u)}.`;
        else if (tx && rEq(tx, rMul(R(base), u))) why = `x is a POWER of ${base}: ${powText(base, u)}, not ${base} × ${ratText(u)}.`;
        else if (tx && rIsInt(u) && u[0] > 0 && rEq(tx, R(u[0] ** base))) why = `Base and power have swapped: it is ${powText(base, u)}, not ${ratText(u)}^${base}.`;
        return { ok: false, marks, why };
      },
      good: 'Right.',
      out: [`u = ${ratLatex(u)}`, `x = ${base}^{${ratLatex(u)}} = ${ratLatex(x)}`],
    });
    return {
      mode: 'base', kind: 'related', head: 'Solve the equation', questionTex: qTex,
      lines: [{ tex: qTex, big: true }], stages,
      final: [M(`x = ${ratText(x)} is positive, so every log exists.`), `\\therefore\\ x = ${ratLatex(x)}`],
      answerTex: `x = ${ratLatex(x)}`, u, x,
    };
  }

  throw new Error(`unknown kind "${item.kind}" — evaluate, swap, rebase, from2, product or related`);
}

// ------------------------------------------------------------------ the public face

/** The derived model of one item, for one mode. Throws when the item cannot be staged. */
export function modelOf(mode, item) {
  if (mode === 'eq') return eqModel(item);
  if (mode === 'quad') return quadModel(item);
  if (mode === 'base') return baseModel(item);
  throw new Error(`unknown mode "${mode}"`);
}

/** The finished working: the question, what each stage produced, and the ending. */
export function workingLines(model) {
  return [...model.lines.map((l) => (l.text ? { text: l.text, tex: l.tex } : l.tex)), ...model.stages.flatMap((s) => s.out || []), ...model.final];
}

/** Every KaTeX string a model can put on screen, for a render test. */
export function allTex(model) {
  const out = [];
  const line = (l) => { if (typeof l === 'string') out.push(l); else if (l?.tex) out.push(l.tex); };
  model.lines.forEach(line);
  model.final.forEach(line);
  out.push(model.answerTex);
  for (const s of model.stages) {
    line(s.title); line(s.sub); line(s.good);
    (s.out || []).forEach(line);
    for (const o of s.options || []) { if (o.tex) out.push(o.tex); line(o.why); }
    for (const row of s.rows || []) for (const p of row) { if (p.tex) out.push(p.tex); for (const o of p.options || []) out.push(o.tex); }
    for (const c of s.candidates || []) { out.push(`x = ${c.xTex}`); line(c.why); line(c.line); for (const r of c.rows) { out.push(r.tex); if (r.name && r.name.includes('\\')) out.push(r.name); } }
  }
  return out.filter(Boolean);
}

/** Problems with a pool of items for one mode, as strings. Empty when all is well. */
export function checkLogEqItems(items, mode) {
  if (!LOGEQ_MODES.includes(mode)) return [`unknown log-equation mode "${mode}"`];
  const out = [];
  const seen = new Set();
  let level = -Infinity;
  for (const item of items || []) {
    const at = `item ${item?.id ?? '?'}`;
    if (!item?.id) { out.push('an item has no id'); continue; }
    if (seen.has(item.id)) out.push(`${at}: duplicate id`);
    seen.add(item.id);
    if (item.level !== undefined) {
      if (!Number.isInteger(item.level) || item.level < 1) out.push(`${at}: level must be a whole number from 1`);
      else if (item.level < level) out.push(`${at}: level ${item.level} comes after level ${level} — levels only climb`);
      else level = item.level;
    }
    let model;
    try {
      model = modelOf(mode, item);
    } catch (err) {
      out.push(`${at}: ${err.message}`);
      continue;
    }
    if (!model.stages.length) out.push(`${at}: there is nothing to do`);
    for (const s of model.stages) {
      if (s.type === 'pick') {
        if (s.options.filter((o) => o.ok).length !== 1) out.push(`${at}: stage "${s.id}" does not have exactly one right option`);
        if (s.options.length < 3) out.push(`${at}: stage "${s.id}" has fewer than three options — the wrong ones collapsed into the right one`);
      }
      if (s.type === 'fill') {
        // The derived answers must pass the derived marking.
        const res = s.judge(s.answers);
        if (!res.ok) out.push(`${at}: stage "${s.id}" does not accept its own answer`);
      }
    }
    if (mode === 'eq') {
      if (model.candidates.length > 2) out.push(`${at}: more than two roots to check`);
      if (!model.kept.length && !item.expectNone) out.push(`${at}: no root survives the check — add expectNone: true if that is the point`);
      if (model.kept.length && item.expectNone) out.push(`${at}: marked expectNone, but x = ${model.kept.map(ratText).join(', ')} survives`);
      for (const c of model.candidates) if (Math.abs(c.x[0]) > MAX_TYPED || c.x[1] > 99) out.push(`${at}: the root ${ratText(c.x)} is too awkward to type`);
    }
    // Every derived line must be balanced KaTeX (a full render runs in the unit's scratch test).
    for (const tex of allTex(model)) {
      let depth = 0;
      for (let i = 0; i < tex.length; i += 1) {
        if (tex[i] === '\\') { i += 1; continue; }
        if (tex[i] === '{') depth += 1; else if (tex[i] === '}') depth -= 1;
        if (depth < 0) break;
      }
      if (depth !== 0) { out.push(`${at}: a derived line has unbalanced braces: ${tex}`); break; }
    }
  }
  return out;
}

// ------------------------------------------------------------------ the arcade's oracle helper

/** log_base(n) as an exact [p, q], or null — exported for the Maths Bolt check. */
export const exactLogOf = (base, n) => exactLog(base, toRat(n));
