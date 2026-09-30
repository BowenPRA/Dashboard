// src/utils/expEquations.js
//
// Exponential equations, e and ln — the pure parts behind the three Exp Lab
// tasks (src/tasks/ExpLab.jsx), built for ADD_MATH AM_5B (coursebook sections
// 5.5 and 5.7):
//
//   · Take Logs        (EXP_LOGS, mode 'logs')   a^(px+q) = b, a different base on
//                                                each side, e^(…) = k, ln(…) = k
//   · Hidden Quadratic (EXP_QUAD, mode 'quad')   substitute y = a^x, solve for y,
//                                                KEEP OR REJECT each value, then
//                                                turn what is kept back into x
//   · Undo It          (E_EXACT, mode 'exact')   exact values and equations from
//                                                e^(ln x) = x and ln(e^x) = x
//
// THE RULE (same as modulus.js, cubic.js, logs.js, circle.js): an item stores
// the QUESTION and everything else is derived here — the move that starts it,
// every line of working, the wrong lines a student would write and what is
// wrong with each, the quadratic, its roots, which roots survive, the exact
// answer and the answer to 3 significant figures. No answer key is authored,
// so none can drift, and `checkExpItems` refuses an item a student could not
// finish on the screen.
//
// ITEM SHAPES
//   logs   { id, level?, kind: 'exp',  base, power: [p, q], rhs, coef?, add?, give? }
//            coef · base^(px + q) + add = rhs.  base is a whole number or 'e'.
//          { id, level?, kind: 'exp2', left: { base, power }, right: { base, power } }
//            a^(px + q) = c^(rx + s), two different whole-number bases.
//          { id, level?, kind: 'ln',   arg: [p, q], rhs, coef?, give? }
//            coef · ln(px + q) = rhs.
//          give: '3sf' (default) or 'exact'.
//   quad   { id, level?, base, lhs: [term…], rhs: [term…], given?, linear?, expectNone?, give? }
//            a term is a number (a constant) or [c, m, k] for c · base^(mx + k);
//            [c, m, k, big] when the power is printed in a bigger base that is
//            a power of `base` (4^x with base 2). base 'e' may use m = -1.
//   exact  { id, level?, kind: 'value', front?, terms: [[k, a], …] }     front · e^(Σ k ln a)
//          { id, level?, kind: 'lnpow', power }                          ln(e^power), printed by its shape
//          { id, level?, kind: 'solve', form: 'exp', k, rhs }            e^(k ln x) = rhs
//          { id, level?, kind: 'solve', form: 'ln',  k, rhs }            ln e^(kx) = rhs
//
// A MODEL is { mode, questionLatex, head, register, stages, answerLatex,
// checkLines, figure?, problems }. A STAGE is one of three kinds, and the
// screen renders all of them generically:
//   choice  { options: [{ id, tex | text, ok?, nudge?, why }], good }
//   typed   { rows: [[{ tex } | { box, width?, sup? }]], judge(values), fill }
//   keep    { rows: [{ key, tex, keep, why }] }
// Every stage carries `lines`: what it adds to the written working once passed.
// A line is a KaTeX string, or `{ text, tex? }` — a sentence in ordinary type
// (which can wrap; KaTeX text cannot) with an optional piece of maths after it.

import {
  rat, rAdd, rMul, rDiv, rNeg, rAbs, rSign, rEq, rIsInt, rValue, rIsOne, parseRational, toRat,
  ppOfRat, ppPow, ppMul, ppToRat, ppRatio, ratLatex, ratText, gcd,
} from './logs.js';

export const EXP_MODES = ['logs', 'quad', 'exact'];
export const LOGS_KINDS = ['exp', 'exp2', 'ln'];
export const EXACT_KINDS = ['value', 'lnpow', 'solve'];

// ------------------------------------------------------------------ numbers

const MINUS = '−';
const ONE = rat(1, 1);
const ZERO = rat(0, 1);
const rSub = (a, b) => rAdd(a, rNeg(b));
const lcm = (a, b) => (a / (gcd(a, b) || 1)) * b;
const isE = (b) => b === 'e';
const baseNum = (b) => (isE(b) ? Math.E : b);
const baseTex = (b) => (isE(b) ? 'e' : `${b}`);
const txt = (s) => String(s).replace(/-/g, MINUS);

/** An authored number held exactly: 45, '3/10', '0.3', -1.5. */
function R(v) {
  const r = typeof v === 'number' && !Number.isInteger(v) ? parseRational(String(v)) : toRat(v);
  if (!r) throw new Error(`"${v}" is not a number the engine can hold exactly`);
  return r;
}

/** A rational as a decimal string when it terminates within four places, else null. */
function decOf(r) {
  for (let k = 0; k <= 4; k += 1) if ((r[0] * 10 ** k) % r[1] === 0) return (r[0] / r[1]).toFixed(k);
  return null;
}
const numTex = (r, dec = false) => (dec && decOf(r) !== null ? decOf(r) : ratLatex(r));
const numS = (r, dec = false) => (dec && decOf(r) !== null ? txt(decOf(r)) : ratText(r));
/** What "Show me" types into a box. */
const typedForm = (r, dec = false) => (dec && decOf(r) !== null ? decOf(r) : (r[1] === 1 ? `${r[0]}` : `${r[0]}/${r[1]}`));

/** base^n for a whole-number base and any integer n, exactly. */
const powInt = (base, n) => (n >= 0 ? rat(base ** n, 1) : rat(1, base ** -n));

/** px + q as KaTeX: 3x - 1, x, -x, 2 - x. `v` is the letter (or a bracketed number). */
function linTex(p, q, v = 'x') {
  const px = `${Math.abs(p) === 1 ? '' : Math.abs(p)}${v}`;
  if (q === 0) return `${p < 0 ? '-' : ''}${px}`;
  if (p < 0 && q > 0) return `${q} - ${px}`;
  return `${p < 0 ? '-' : ''}${px} ${q < 0 ? '-' : '+'} ${Math.abs(q)}`;
}
const linText = (p, q, v = 'x') => txt(linTex(p, q, v));

/** A value to n significant figures as it should be WRITTEN: 1.30, 10.0, 0.0247. */
export function sfString(v, n = 3) {
  if (!Number.isFinite(v)) return '?';
  if (v === 0) return '0';
  const s = Number(v.toPrecision(n)).toPrecision(n);
  return /e/.test(s) ? String(Number(s)) : s;
}
const sfS = (v, n = 3) => txt(sfString(v, n));

/** A power in plain type: 2 stays 2, anything else is bracketed: (−1/2). */
const powWrap = (s) => (/^[\d.]+$/.test(s) ? s : `(${s})`);

const cleanNum = (s) => String(s ?? '').replace(/[−–]/g, '-').replace(/\s+/g, '');
const isDecimal = (s) => /^-?(\d+\.?\d*|\.\d+)$/.test(s);
const sigFigs = (s) => s.replace(/^-/, '').replace('.', '').replace(/^0+/, '').length;
const decimalsOf = (s) => (s.split('.')[1] || '').length;
const same = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
const near = (t, v) => Number.isFinite(v) && (same(t, Number(v.toPrecision(3))) || Math.abs(t - v) <= Math.abs(v) * 2e-3);

const NUMBER_HINT = 'Type a number, such as 1.58 or −0.748.';
const VALUE_HINT = 'Type a whole number, a negative number, a decimal or a fraction like 3/2.';

/**
 * A typed answer that should be `v` to n significant figures.
 *   ok       right (a `note` says so when a trailing zero was left off)
 *   nudge    the right value with too many figures: not a miss, type it again
 *   invalid  not a number: not a miss
 * `alts` are the wrong values worth naming, `[{ v, why }]`, tried in order.
 */
export function judgeSf(text, v, { n = 3, alts = [], generic = 'Not the value. Check what you keyed into the calculator.' } = {}) {
  const s = cleanNum(text);
  if (!isDecimal(s)) return { ok: false, invalid: true, why: NUMBER_HINT };
  const t = Number(s);
  const target = Number(v.toPrecision(n));
  if (same(t, target)) {
    if (sigFigs(s) < n && sfString(v, n) !== s) return { ok: true, note: `Right. Written to ${n} significant figures it is ${sfS(v, n)}: the zero is a significant figure too.` };
    return { ok: true };
  }
  if (sigFigs(s) > n && same(Number(t.toPrecision(n)), target) && Math.abs(t - v) <= 10 ** -decimalsOf(s)) {
    return { ok: false, nudge: true, why: `That is the right value, with too many figures. Round it to ${n} significant figures.` };
  }
  for (const a of alts) if (near(t, a.v)) return { ok: false, why: a.why };
  const mag = 10 ** (n - 1 - Math.floor(Math.log10(Math.abs(v))));
  const cut = Math.trunc(v * mag) / mag;
  if (same(t, cut)) return { ok: false, why: 'You cut the number off instead of rounding it. Look at the next figure: it is 5 or more, so the last figure you keep goes up by one.' };
  const d = decimalsOf(s);
  if (d !== decimalsOf(sfString(v, n)) && same(t, Number(v.toFixed(d)))) {
    return { ok: false, why: `That is rounded to ${d} decimal place${d === 1 ? '' : 's'}. Significant figures are counted from the first digit that is not zero, and the question asks for ${n} of them.` };
  }
  if (sigFigs(s) < n && (same(t, Number(v.toPrecision(n - 1))) || same(t, Number(v.toPrecision(1))))) {
    return { ok: false, why: `That is the right value, but with too few figures. The question asks for ${n} significant figures.` };
  }
  if (sigFigs(s) >= n && Math.abs(t - v) < 1.5 / mag) {
    return { ok: false, why: `Close, but not rounded correctly. Look at the figure after the ${n === 3 ? 'third' : `${n}th`} significant figure to decide whether it stays or goes up.` };
  }
  if (same(t, -target)) return { ok: false, why: 'Right size, wrong sign. Go back through the last step and check each sign.' };
  return { ok: false, why: generic };
}

/** A typed working value: right to at least 4 significant figures. */
export function judgeWorking(text, v, { alts = [], generic = 'Not the value. Check what you keyed into the calculator.' } = {}) {
  const s = cleanNum(text);
  if (!isDecimal(s)) return { ok: false, invalid: true, why: NUMBER_HINT };
  const t = Number(s);
  const close = same(Number(t.toPrecision(4)), Number(v.toPrecision(4)))
    || (sigFigs(s) >= 5 && Math.abs(t - v) <= 10 ** -decimalsOf(s));
  if (close && sigFigs(s) >= 4) return { ok: true };
  if (same(t, Number(v.toPrecision(3))) || same(t, Number(v.toPrecision(2))) || (close && sigFigs(s) < 4)) {
    return { ok: false, nudge: true, why: 'That is right as far as it goes, but this is not the final answer yet. Keep at least 4 significant figures here, or the third figure of x can come out wrong.' };
  }
  for (const a of alts) if (near(t, a.v)) return { ok: false, why: a.why };
  if (near(-t, v)) return { ok: false, why: 'Right size, wrong sign. Check the sign of each number you keyed in.' };
  return { ok: false, why: generic };
}

// ------------------------------------------------------------------ option helpers

const hash = (s) => [...String(s)].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 9973, 7);
/** The same options for an item every time, but not the right one always first. */
function rotate(options, seed) {
  const k = hash(seed) % options.length;
  return [...options.slice(k), ...options.slice(0, k)];
}
/** The right option plus the first three wrong ones that apply. */
const pickOptions = (right, wrong, seed) => rotate([{ ...right, ok: true }, ...wrong.filter(Boolean).slice(0, 3)], seed);

// =================================================================== TAKE LOGS

/** The four first moves. The same four, in the same order, on every question. */
export const MOVES = [
  { id: 'isolate', text: 'Get the power or the log on its own first' },
  { id: 'lg', text: 'Take lg of both sides' },
  { id: 'ln', text: 'Take ln of both sides' },
  { id: 'exp', text: 'Make each side a power of e' },
];

const REGISTER = {
  '3sf': 'Give x correct to 3 significant figures',
  ln: 'Give x in terms of ln (an exact answer)',
  exact: 'Give x in exact form',
};

const moveStage = (verdict, good, lines, sub) => ({
  id: 'move',
  label: 'First move',
  kind: 'choice',
  columns: 1,
  fixed: true,
  title: 'What is the first move?',
  sub,
  options: MOVES.map((m) => ({ ...m, ...verdict[m.id] })),
  good,
  lines,
});

/** (inner − q) / p as KaTeX, for an exact answer. `inner` is \ln 5, e^{3}, … */
function exactForm(p, q, inner) {
  const ap = Math.abs(p);
  const aq = Math.abs(q);
  if (p > 0) {
    const numer = q === 0 ? inner : `${inner} ${q > 0 ? '-' : '+'} ${aq}`;
    return ap === 1 ? numer : `\\dfrac{${numer}}{${ap}}`;
  }
  // p < 0: x = (q − inner) / |p|
  if (q === 0) return ap === 1 ? `-${inner}` : `-\\dfrac{${inner}}{${ap}}`;
  if (q > 0) return ap === 1 ? `${aq} - ${inner}` : `\\dfrac{${aq} - ${inner}}{${ap}}`;
  return ap === 1 ? `-${inner} - ${aq}` : `-\\dfrac{${inner} + ${aq}}{${ap}}`;
}

/** The wrong values of x worth naming once px + q = L is known. */
function linearAlts(p, q, L, Ls, what) {
  const px = linText(p, 0);
  const undo = q < 0 ? 'add' : 'subtract';
  const op = q < 0 ? '+' : MINUS;
  const aq = Math.abs(q);
  const alts = [];
  if (q !== 0) {
    alts.push({ v: (L + q) / p, why: `Check the sign when you undo the ${q < 0 ? MINUS : '+'}${aq}. You ${undo} ${aq}: ${px} = ${Ls} ${op} ${aq}.` });
    if (Math.abs(p) !== 1) alts.push({ v: L / p - q, why: `Undo in the right order. First ${undo} ${aq}, THEN divide by ${txt(p)}: x = (${Ls} ${op} ${aq}) ÷ ${txt(p)}.` });
  }
  alts.push({ v: L, why: `That is the value of ${what}. Now solve for x.` });
  if (Math.abs(p) !== 1) alts.push({ v: (L - q) * p, why: `Divide by ${txt(p)}, do not multiply.` });
  if (q !== 0 && p !== 1) {
    alts.push({ v: L - q, why: p === -1 ? `That is ${MINUS}x. Change the sign to get x.` : `That is ${px}. Divide by ${txt(p)} to get x.` });
  }
  return alts;
}

function expLogsModel(item) {
  const base = item.base;
  const [p, q] = item.power;
  const coef = R(item.coef ?? 1);
  const add = R(item.add ?? 0);
  const rhs = R(item.rhs);
  const give = item.give || '3sf';
  const dec = /\./.test(String(item.rhs));
  const e = isE(base);
  const b = baseNum(base);
  const B = baseTex(base);
  const K = rDiv(rSub(rhs, add), coef);
  const problems = [];
  if (K[0] <= 0) {
    problems.push(`the power would have to equal ${ratText(K)}, and a power is never zero or negative`);
    return { mode: 'logs', kind: 'exp', problems, stages: [], questionLatex: '' };
  }
  const Kv = rValue(K);
  const L = Math.log(Kv) / Math.log(b);
  const x = (L - q) / p;
  const plain = p === 1 && q === 0;
  const needIso = !rIsOne(coef) || add[0] !== 0;
  const lin = linTex(p, q);
  const linS = linText(p, q);
  const powT = `${B}^{${lin}}`;
  const powS = plain ? `${B}^x` : `${B}^(${linS})`;
  const Kt = numTex(K, dec);
  const Ks = numS(K, dec);
  const rhsT = numTex(rhs, dec);

  // ---- the question as printed
  const coefAbs = rAbs(coef);
  const coefT = rIsOne(coefAbs) ? '' : ratLatex(coefAbs);
  const body = coefT && !e ? `${coefT} \\times ${powT}` : `${coefT}${powT}`;
  const bodyS = `${rIsOne(coefAbs) ? '' : `${ratText(coefAbs)}${e && rIsInt(coefAbs) ? '' : ' × '}`}${powS}`;
  const termS = `${rSign(coef) < 0 ? MINUS : ''}${bodyS}`;
  let lhsT = `${rSign(coef) < 0 ? '-' : ''}${body}`;
  let lhsS = termS;
  if (add[0] !== 0) {
    const addAbsT = numTex(rAbs(add));
    const addAbsS = numS(rAbs(add));
    if (rSign(coef) < 0 && rSign(add) > 0) { lhsT = `${addAbsT} - ${body}`; lhsS = `${addAbsS} ${MINUS} ${bodyS}`; }
    else { lhsT = `${lhsT} ${rSign(add) < 0 ? '-' : '+'} ${addAbsT}`; lhsS = `${lhsS} ${rSign(add) < 0 ? MINUS : '+'} ${addAbsS}`; }
  }
  const questionLatex = `${lhsT} = ${rhsT}`;
  const coefS = ratText(coef);

  // ---- stage 1: the move
  const verdict = {};
  let good;
  const stages = [];
  if (needIso) {
    verdict.isolate = { ok: true };
    const logsFirst = (w) => (add[0] !== 0
      ? { why: `${w} of the left-hand side is ${w}(${lhsS}), and the log of a ${rSign(coef) < 0 || rSign(add) < 0 ? 'difference' : 'sum'} cannot be split up. Get ${powS} on its own first.` }
      : { nudge: true, why: `That can be made to work, but it leaves an extra log to tidy away. It is quicker to get ${powS} on its own first.` });
    verdict.lg = logsFirst('lg');
    verdict.ln = logsFirst('ln');
    verdict.exp = { why: `That would put ${lhsS} up in a power of e, which buries x deeper. Get ${powS} on its own, then use a log to bring the power down.` };
    good = `Right. Undo what has been done to ${powS} before you take logs.`;
    stages.push(moveStage(verdict, good, [], 'The unknown is in a power, and the power is not on its own.'));
    const rhsMinusAdd = rSub(rhs, add);
    stages.push({
      id: 'isolate',
      label: 'Isolate',
      kind: 'typed',
      title: `Get ${powS} on its own.`,
      sub: `${add[0] !== 0 ? 'Undo the number added or subtracted first, then the number multiplying. ' : ''}A fraction is typed like 5/2.`,
      show: [questionLatex],
      rows: [[{ tex: `${powT} =` }, { box: 'K' }]],
      fill: { K: typedForm(K, dec) },
      judge(vals) {
        const v = parseRational(vals.K);
        if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
        if (rEq(v, K)) return { ok: true, marks: { K: true } };
        let why = `Work backwards: ${add[0] !== 0 ? `first move the ${numS(rAbs(add))} across, then ` : ''}divide both sides by ${coefS}.`;
        if (add[0] !== 0 && rEq(v, rDiv(rAdd(rhs, add), coef))) {
          why = `The ${numS(rAbs(add))} changes sign when it crosses the equals sign: ${numS(rhs, dec)} ${rSign(add) > 0 ? MINUS : '+'} ${numS(rAbs(add))} = ${numS(rhsMinusAdd, dec)}.`;
        } else if (!rIsOne(coef) && rEq(v, rhsMinusAdd)) {
          why = `That is ${termS}. Now divide both sides by ${coefS}${rIsInt(coef) ? '' : `, which is the same as multiplying by ${ratText(rDiv(ONE, coef))}`}.`;
        } else if (!rIsOne(coef) && rEq(v, rMul(rhsMinusAdd, coef))) {
          why = `Divide by ${coefS}, do not multiply${rIsInt(coef) ? '' : `. Dividing by ${coefS} is the same as multiplying by ${ratText(rDiv(ONE, coef))}`}.`;
        } else if (add[0] !== 0 && !rIsOne(coef) && rEq(v, rSub(rDiv(rhs, coef), add))) {
          why = `Deal with the ${numS(rAbs(add))} first, then divide everything that is left by ${coefS}.`;
        } else if (rEq(v, rNeg(K))) {
          why = 'Right size, wrong sign. Check the sign of each number as it crosses the equals sign, and again when you divide.';
        }
        return { ok: false, marks: { K: false }, why };
      },
      good: `Right: ${powS} = ${Ks}. Now the power is on its own.`,
      lines: [`${powT} = ${Kt}`],
    });
  } else if (e) {
    verdict.ln = { ok: true };
    verdict.lg = { nudge: true, why: `lg would work, but it leaves lg e in the answer. ln is the log to base e, so ln ${powS} is simply the power. Choose ln.` };
    verdict.isolate = { why: `${powS} is already on its own. Now bring the power down.` };
    verdict.exp = { why: `e to the power of each side makes e^(${powS}), which buries x deeper. A log is what brings a power down.` };
    good = `Right. ln is the log to base e, so it undoes ${powS} exactly.`;
    stages.push(moveStage(verdict, good, [`\\ln ${powT} = \\ln ${Kt}`], 'The unknown is in a power of e.'));
  } else {
    verdict.lg = { ok: true };
    verdict.ln = { ok: true };
    verdict.isolate = { why: `${powS} is already on its own. Now bring the power down.` };
    verdict.exp = { why: `e to the power of each side makes e^(${powS}), which buries x deeper. A log is what brings a power down.` };
    good = (id) => (id === 'ln'
      ? `Right. Any log works: ln ${Ks} ÷ ln ${B} gives the same x as lg ${Ks} ÷ lg ${B}. The working here uses lg.`
      : `Right. ${Ks} is not a whole-number power of ${B}, so the bases cannot be matched. A log brings the power down.`);
    stages.push(moveStage(verdict, good, [`\\lg ${powT} = \\lg ${Kt}`], 'The unknown is in a power.'));
  }

  // ---- stage: bring the power down
  const wrap = plain ? 'x' : `(${lin})`;
  let downRight;
  if (e) {
    downRight = `${lin} = \\ln ${Kt}`;
    stages.push({
      id: 'down',
      label: 'Power down',
      kind: 'choice',
      columns: 1,
      title: needIso ? 'Now take ln of both sides.' : 'ln and e undo each other.',
      sub: `ln ${powS} is just the power, because ln e = 1. Which line is right?`,
      show: [needIso ? `${powT} = ${Kt}` : `\\ln ${powT} = \\ln ${Kt}`],
      options: pickOptions({ id: 'right', tex: downRight }, [
        { id: 'noLog', tex: `${lin} = ${Kt}`, why: 'ln was taken of the left-hand side only. Whatever you do to one side of an equation, you do to the other.' },
        { id: 'raised', tex: `${lin} = e^{${Kt}}`, why: `That raises e to the power ${Ks} on the right. You took ln of the left-hand side, so take ln of the right-hand side too.` },
        { id: 'lgMix', tex: `${lin} = \\lg ${Kt}`, why: 'The left-hand side used ln, because that is what undoes e. The right-hand side must use ln as well, not lg.' },
      ], `${item.id}down`),
      good: plain && give !== '3sf' ? `Right, and that is the exact answer: x = ln ${Ks}.` : 'Right: ln e^n = n.',
      lines: needIso ? [`\\ln ${powT} = \\ln ${Kt}`, downRight] : [downRight],
    });
  } else {
    downRight = `${wrap}\\lg ${B} = \\lg ${Kt}`;
    stages.push({
      id: 'down',
      label: 'Power down',
      kind: 'choice',
      columns: 1,
      title: needIso ? 'Take lg of both sides and bring the power down.' : 'Use the power law to bring the power down.',
      sub: 'Which line is right?',
      show: [needIso ? `${powT} = ${Kt}` : `\\lg ${powT} = \\lg ${Kt}`],
      options: pickOptions({ id: 'right', tex: downRight }, [
        q !== 0 && { id: 'noBracket', tex: `${lin}\\,\\lg ${B} = \\lg ${Kt}`, why: `The WHOLE power comes down in front of the log, so it needs a bracket: (${linS}) lg ${B}.` },
        q === 0 && { id: 'inside', tex: `\\lg\\left(${B} \\times ${linTex(p, 0)}\\right) = \\lg ${Kt}`, why: `The power comes down in FRONT of the log as a multiplier. It does not stay inside: lg ${powS} = ${linS} lg ${B}.` },
        { id: 'sub', tex: `${lin} = \\lg ${Kt} - \\lg ${B}`, why: `lg ${B} is multiplying the power, so later it will be divided out. It is not subtracted.` },
        { id: 'dropLog', tex: `${wrap} \\times ${B} = ${Kt}`, why: `The logs have disappeared. Taking lg of both sides leaves a log on each side, and the power law only moves the power in front of lg ${B}.` },
      ], `${item.id}down`),
      good: 'Right: lg a^n = n lg a, and the whole power comes down.',
      lines: needIso ? [`\\lg ${powT} = \\lg ${Kt}`, downRight] : [downRight],
    });
  }

  // ---- stage: the answer
  const quotT = e ? `\\ln ${Kt}` : `\\dfrac{\\lg ${Kt}}{\\lg ${B}}`;
  const valueAlts = e
    ? [
      { v: Math.log10(Kv), why: `That is lg ${Ks}, the log to base 10. Base e needs the ln key.` },
      { v: Kv < 15 ? Math.exp(Kv) : NaN, why: `That is e^${Ks}. You want ln ${Ks}: the power that e must be raised to.` },
      { v: Kv / Math.E, why: `That is ${Ks} ÷ e. e^x is a power, not e × x, so it is undone by ln.` },
    ]
    : [
      { v: Math.log10(Kv / b), why: `lg ${Ks} ÷ lg ${B} is not lg(${Ks} ÷ ${B}), and it is not lg ${Ks} ${MINUS} lg ${B}. Dividing two logs is not a log law: key in lg ${Ks} ÷ lg ${B} as it stands.` },
      { v: 1 / L, why: `Upside down. lg ${Ks} goes on top, because it came from the right-hand side.` },
      { v: Kv / b, why: `That is ${Ks} ÷ ${B}. Take the log of each number first: lg ${Ks} ÷ lg ${B}.` },
      { v: Math.log10(Kv), why: `That is lg ${Ks} on its own. It still has to be divided by lg ${B}.` },
      { v: Math.log(Kv), why: `That is ln ${Ks} on its own. It still has to be divided by ln ${B}.` },
    ];
  const L5 = L.toPrecision(5);
  const xS = sfString(x);
  let answerLatex;
  if (give === '3sf') {
    const rows = plain
      ? [[{ tex: `x = ${quotT} =` }, { box: 'x', width: 'w-28' }]]
      : [[{ tex: `${lin} = ${quotT} =` }, { box: 'L', width: 'w-28' }], [{ tex: 'x =' }, { box: 'x', width: 'w-28' }]];
    const xAlts = plain ? valueAlts : linearAlts(p, q, L, txt(L5), linS);
    stages.push({
      id: 'answer',
      label: 'Work it out',
      kind: 'typed',
      title: plain ? 'Work it out on your calculator.' : 'Work out the right-hand side, then solve for x.',
      sub: plain ? 'Give x correct to 3 significant figures.' : 'Keep at least 4 significant figures in the first box. Give x correct to 3 significant figures.',
      show: [downRight],
      rows,
      fill: plain ? { x: xS } : { L: L5, x: xS },
      judge(vals) {
        const marks = {};
        if (!plain) {
          const a = judgeWorking(vals.L, L, { alts: valueAlts, generic: e ? `Key in ln ${Ks}.` : `Key in lg ${Ks} ÷ lg ${B}.` });
          if (a.invalid) return a;
          marks.L = a.ok;
          if (!a.ok) { const bx = judgeSf(vals.x, x); marks.x = cleanNum(vals.x) ? !!bx.ok : undefined; return { ...a, marks }; }
        }
        const r = judgeSf(vals.x, x, { alts: xAlts, generic: plain ? (e ? `Key in ln ${Ks}.` : `Key in lg ${Ks} ÷ lg ${B}.`) : `Solve ${linS} = ${txt(L5)} for x.` });
        if (r.invalid) return r;
        marks.x = !!r.ok;
        return { ...r, marks };
      },
      good: `Right: x = ${txt(xS)}, correct to 3 significant figures.`,
      lines: plain
        ? [e ? `x = ${xS}\\ \\text{(3 s.f.)}` : `x = ${quotT} = ${xS}\\ \\text{(3 s.f.)}`]
        : [`${lin} = ${quotT} = ${L5}`, `x = ${xS}\\ \\text{(3 s.f.)}`],
    });
    answerLatex = `x = ${xS}`;
  } else if (!plain) {
    const inner = `\\ln ${Kt}`;
    const right = exactForm(p, q, inner);
    const aq = Math.abs(q);
    const ap = Math.abs(p);
    const Kq = rSub(K, rat(q, 1));
    stages.push({
      id: 'answer',
      label: 'Exact answer',
      kind: 'choice',
      columns: 2,
      title: 'Solve for x. Which is the exact answer?',
      sub: 'Leave ln in the answer. No calculator is needed.',
      show: [downRight],
      options: pickOptions({ id: 'right', tex: `x = ${right}`, v: x }, [
        q !== 0 && { id: 'sign', tex: `x = ${exactForm(p, -q, inner)}`, v: (L + q) / p, why: `The ${aq} changes sign when it crosses the equals sign${Math.abs(p) === 1 ? '' : `, before you divide by ${txt(p)}`}.` },
        q !== 0 && Kq[0] > 0 && { id: 'inside', tex: `x = ${exactForm(p, 0, `\\ln\\left(${Kt} ${q > 0 ? '-' : '+'} ${aq}\\right)`)}`, v: Math.log(rValue(Kq)) / p, why: `The ${aq} is outside the log. ln ${Ks} ${q > 0 ? MINUS : '+'} ${aq} is not ln(${Ks} ${q > 0 ? MINUS : '+'} ${aq}).` },
        q !== 0 && ap !== 1 && { id: 'order', tex: `x = ${exactForm(p, 0, inner)} ${q > 0 ? '-' : '+'} ${aq}`, v: L / p - q, why: `Everything is divided by ${txt(p)}, the ${aq} as well. Undo the ${q > 0 ? '+' : MINUS}${aq} first, then divide.` },
        q === 0 && ap !== 1 && { id: 'mult', tex: `x = ${p}${inner}`, v: L * p, why: `${linText(p, 0)} = ln ${Ks}, so divide by ${txt(p)}. Do not multiply.` },
        q === 0 && p === -1 && { id: 'lost', tex: `x = ${inner}`, v: L, why: `The line above says ${MINUS}x = ln ${Ks}. That is minus x, so the minus sign must not be lost when you find x.` },
        q === 0 && p === -1 && { id: 'lnNeg', tex: `x = \\ln\\left(-${Kt}\\right)`, v: NaN, why: 'The ln of a negative number does not exist, so the minus sign cannot go inside the log.' },
        { id: 'raise', tex: `x = ${exactForm(p, q, `e^{${Kt}}`)}`, v: (Math.exp(Kv) - q) / p, why: `e^${Ks} is the opposite move. A power of e is undone by ln, so the answer has ln ${Ks} in it.` },
        { id: 'lg', tex: `x = ${exactForm(p, q, `\\lg ${Kt}`)}`, v: (Math.log10(Kv) - q) / p, why: 'Base e is undone by ln, not by lg.' },
      ], `${item.id}answer`),
      good: 'Right. That is exact: no rounding anywhere.',
      lines: [`x = ${right}`],
    });
    answerLatex = `x = ${right}`;
  } else {
    answerLatex = `x = \\ln ${Kt}`;
  }

  // ---- the reveal
  const checkLines = [];
  const subst = (xv) => {
    const neg = xv.startsWith('-');
    const inner = p === 1 ? (neg && q !== 0 ? `(${xv})` : xv) : p === -1 ? (neg ? `(${xv})` : xv) : `(${xv})`;
    return linTex(p, q, inner);
  };
  const lhsAt = (xv) => rValue(coef) * b ** (p * xv + q) + rValue(add);
  const withPow = (expo) => questionLatex.replace(powT, `${B}^{${expo}}`).replace(/ = [^=]*$/, '');
  if (give === '3sf') {
    const xr = Number(xS);
    checkLines.push({ text: `Put x = ${txt(xS)} back in:`, tex: `${withPow(subst(xS))} \\approx ${sfString(lhsAt(xr))}` });
    checkLines.push({ text: `That is close to ${numS(rhs, dec)}. It is not exact, because x has been rounded.` });
  } else {
    checkLines.push({ text: 'As a decimal,', tex: `x \\approx ${xS}` });
    checkLines.push({ text: 'Put the exact value back in and the left-hand side is', tex: `${rhsT}\\ \\checkmark` });
  }
  if (!e && plain) {
    const lo = Math.floor(L);
    checkLines.push({
      text: 'Sense check:',
      tex: `${B}^{${lo}} = ${ratLatex(powInt(base, lo))} < ${Kt} < ${ratLatex(powInt(base, lo + 1))} = ${B}^{${lo + 1}}`,
    });
    checkLines.push({ text: `so x is between ${txt(lo)} and ${txt(lo + 1)}.` });
  }

  // ---- what the validator needs to know
  if (!e) {
    const k = ppRatio(ppOfRat(K), ppOfRat(rat(base, 1)));
    if (k !== null) problems.push(`${ratText(K)} is an exact power of ${base} (the power ${ratText(k)}), so this is solved by matching bases and needs no logs`);
  }
  if (give !== '3sf' && !e) problems.push('an exact answer is only asked for with base e');
  return {
    mode: 'logs', kind: 'exp', base, x, L, plain, needIso, give, questionLatex, stages, answerLatex, checkLines, problems,
    head: 'Solve', register: give === '3sf' ? REGISTER['3sf'] : REGISTER.ln, numbers: give === '3sf' ? [x] : [],
  };
}

/** c·lg a terms as KaTeX: 3\lg 2 - \lg 5. */
function combTex(parts) {
  const out = [];
  for (const [c, a] of parts) {
    if (c === 0) continue;
    const bodyT = `${Math.abs(c) === 1 ? '' : Math.abs(c)}\\lg ${a}`;
    out.push(out.length ? `${c < 0 ? '-' : '+'} ${bodyT}` : `${c < 0 ? '-' : ''}${bodyT}`);
  }
  return out.length ? out.join(' ') : '0';
}
const combText = (parts) => {
  const out = [];
  for (const [c, a] of parts) {
    if (c === 0) continue;
    const bodyS = `${Math.abs(c) === 1 ? '' : `${Math.abs(c)} `}lg ${a}`;
    out.push(out.length ? `${c < 0 ? MINUS : '+'} ${bodyS}` : `${c < 0 ? MINUS : ''}${bodyS}`);
  }
  return out.length ? out.join(' ') : '0';
};

function exp2Model(item) {
  const a = item.left.base;
  const c = item.right.base;
  const [p, q] = item.left.power;
  const [r, s] = item.right.power;
  const la = Math.log10(a);
  const lc = Math.log10(c);
  const D = p * la - r * lc;
  const N = s * lc - q * la;
  const x = N / D;
  const problems = [];
  const linA = linTex(p, q);
  const linC = linTex(r, s);
  const powA = `${a}^{${linA}}`;
  const powC = `${c}^{${linC}}`;
  const wrapA = p === 1 && q === 0 ? 'x' : `(${linA})`;
  const wrapC = r === 1 && s === 0 ? 'x' : `(${linC})`;
  const questionLatex = `${powA} = ${powC}`;
  const powAS = q === 0 && p === 1 ? `${a}^x` : `${a}^(${linText(p, q)})`;
  const powCS = s === 0 && r === 1 ? `${c}^x` : `${c}^(${linText(r, s)})`;
  const stages = [];

  stages.push(moveStage({
    lg: { ok: true },
    ln: { ok: true },
    isolate: { why: `Each side is already a single power: ${powAS} and ${powCS}. Now bring both powers down.` },
    exp: { why: 'e to the power of each side buries x deeper. A log is what brings a power down, and it works on both sides at once.' },
  }, (id) => (id === 'ln'
    ? 'Right. Any log works here, and ln gives the same x as lg. The working here uses lg.'
    : `Right. ${a} and ${c} are not powers of the same number, so the bases cannot be matched. Take logs of both sides.`),
  [`\\lg ${powA} = \\lg ${powC}`], 'The unknown is in a power on BOTH sides, and the bases are different.'));

  const downRight = `${wrapA}\\lg ${a} = ${wrapC}\\lg ${c}`;
  stages.push({
    id: 'down',
    label: 'Powers down',
    kind: 'choice',
    columns: 1,
    title: 'Bring both powers down.',
    sub: 'Which line is right?',
    show: [`\\lg ${powA} = \\lg ${powC}`],
    options: pickOptions({ id: 'right', tex: downRight }, [
      (q !== 0 || s !== 0) && { id: 'noBracket', tex: `${linA}\\,\\lg ${a} = ${linC}\\,\\lg ${c}`, why: 'Each WHOLE power comes down in front of its log, so each one needs its bracket.' },
      { id: 'crossed', tex: `${wrapA}\\lg ${c} = ${wrapC}\\lg ${a}`, why: `Each power comes down in front of its OWN log: ${linText(p, q)} belongs with lg ${a}, and ${linText(r, s)} with lg ${c}.` },
      { id: 'dropLog', tex: `${wrapA} \\times ${a} = ${wrapC} \\times ${c}`, why: `The logs have disappeared. The power law keeps them: each power comes down in front of the log of its base.` },
    ], `${item.id}down`),
    good: 'Right: each power comes down in front of the log of its own base.',
    lines: [downRight],
  });

  const leftC = [[p, a], [-r, c]];
  const rightC = [[s, c], [-q, a]];
  const collectRight = `x\\left(${combTex(leftC)}\\right) = ${combTex(rightC)}`;
  const side = (pp, qq, base) => {
    const xt = `${pp === 1 ? '' : pp === -1 ? '-' : pp}x\\lg ${base}`;
    if (qq === 0) return xt;
    return `${xt} ${qq < 0 ? '-' : '+'} ${Math.abs(qq) === 1 ? '' : Math.abs(qq)}\\lg ${base}`;
  };
  // The bracket a student forgets to multiply out: the first one with a number in it.
  const [fp, fq, fb] = q !== 0 ? [p, q, a] : [r, s, c];
  const sideText = (pp, qq, base) => {
    const xt = `${pp === 1 ? '' : pp === -1 ? MINUS : txt(pp)}x lg ${base}`;
    return qq === 0 ? xt : `${xt} ${qq < 0 ? MINUS : '+'} ${Math.abs(qq) === 1 ? '' : `${Math.abs(qq)} `}lg ${base}`;
  };
  const noExpandWhy = `Multiplying out (${linText(fp, fq)}) lg ${fb} gives ${sideText(fp, fq, fb)}: the ${Math.abs(fq)} is multiplied by lg ${fb} as well.`;
  const signLeftWhy = `${txt(`${r === 1 ? '' : r === -1 ? '-' : r}x`)} lg ${c} changes sign when it crosses to the left-hand side.`;
  const signRight = q !== 0
    ? { id: 'signRight', tex: `x\\left(${combTex(leftC)}\\right) = ${combTex([[s, c], [q, a]])}`, v: (s * lc + q * la) / D, why: `${combText([[q, a]])} changes sign when it crosses to the right-hand side.` }
    : { id: 'signRight', tex: `x\\left(${combTex(leftC)}\\right) = ${combTex([[-s, c]])}`, v: -N / D, why: `${combText([[s, c]])} was already on the right-hand side, so it keeps its sign.` };
  const collectWrong = [
    { id: 'noExpand', tex: `x\\left(${combTex(leftC)}\\right) = ${s - q}`, v: (s - q) / D, why: noExpandWhy },
    { id: 'signLeft', tex: `x\\left(${combTex([[p, a], [r, c]])}\\right) = ${combTex(rightC)}`, v: N / (p * la + r * lc), why: signLeftWhy },
    signRight,
  ];
  stages.push({
    id: 'collect',
    label: 'Collect x',
    kind: 'choice',
    columns: 1,
    title: 'Multiply out both brackets, then collect the x terms on the left.',
    sub: 'Which line is right?',
    show: [downRight],
    options: pickOptions({ id: 'right', tex: collectRight, v: x }, collectWrong, `${item.id}collect`),
    good: 'Right. x is now a factor of the left-hand side, so one division finishes it.',
    lines: [`${side(p, q, a)} = ${side(r, s, c)}`, collectRight],
  });

  const fracT = `\\dfrac{${combTex(rightC)}}{${combTex(leftC)}}`;
  const xS = sfString(x);
  stages.push({
    id: 'answer',
    label: 'Work it out',
    kind: 'typed',
    title: 'Divide, and work it out on your calculator.',
    sub: 'Put brackets round the top and round the bottom. Give x correct to 3 significant figures.',
    show: [collectRight],
    rows: [[{ tex: `x = ${fracT} =` }, { box: 'x', width: 'w-28' }]],
    fill: { x: xS },
    judge(vals) {
      const res = judgeSf(vals.x, x, {
        alts: [
          { v: D / N, why: 'Upside down. The side without x goes on top.' },
          ...collectWrong.map((o) => ({ v: o.v, why: o.why })),
        ],
        generic: `Key in (${combText(rightC)}) ÷ (${combText(leftC)}), with both brackets.`,
      });
      if (res.invalid) return res;
      return { ...res, marks: { x: !!res.ok } };
    },
    good: `Right: x = ${txt(xS)}, correct to 3 significant figures.`,
    lines: [`x = ${fracT} = ${xS}\\ \\text{(3 s.f.)}`],
  });

  const xr = Number(xS);
  const at = (pp, qq) => {
    const inner = pp === 1 ? (xS.startsWith('-') && qq !== 0 ? `(${xS})` : xS) : pp === -1 ? (xS.startsWith('-') ? `(${xS})` : xS) : `(${xS})`;
    return linTex(pp, qq, inner);
  };
  const checkLines = [
    { text: `Put x = ${txt(xS)} into each side:`, tex: `${a}^{${at(p, q)}} \\approx ${sfString(a ** (p * xr + q))},\\quad ${c}^{${at(r, s)}} \\approx ${sfString(c ** (r * xr + s))}` },
    { text: 'The two sides agree to about 3 figures. They are not exactly equal, because x has been rounded.' },
  ];
  if (Math.abs(D) < 1e-9) problems.push('the x terms cancel, so there is nothing to solve');
  if (a === c) problems.push('the two bases are the same, so the powers can simply be set equal');
  if (q === 0 && s === 0) problems.push('both powers are multiples of x, so the only solution is x = 0');
  if (ppRatio(ppOfRat(rat(a, 1)), ppOfRat(rat(c, 1))) !== null) problems.push(`${a} and ${c} are powers of the same number, so this is solved by matching bases and needs no logs`);
  return {
    mode: 'logs', kind: 'exp2', x, give: '3sf', questionLatex, stages, answerLatex: `x = ${xS}`, checkLines, problems,
    head: 'Solve', register: REGISTER['3sf'], numbers: [x],
  };
}

function lnLogsModel(item) {
  const [p, q] = item.arg;
  const coef = R(item.coef ?? 1);
  const k = R(item.rhs);
  const give = item.give || '3sf';
  const K = rDiv(k, coef);
  const Kv = rValue(K);
  const V = Math.exp(Kv);
  const x = (V - q) / p;
  const plain = p === 1 && q === 0;
  const needIso = !rIsOne(coef);
  const arg = linTex(p, q);
  const argS = linText(p, q);
  const lnT = plain ? '\\ln x' : `\\ln(${arg})`;
  const lnS = plain ? 'ln x' : `ln(${argS})`;
  const Kt = numTex(K, true);
  const Ks = numS(K, true);
  const coefT = rIsOne(coef) ? '' : ratLatex(coef);
  const questionLatex = `${coefT}${lnT} = ${numTex(k, true)}`;
  const coefS = ratText(coef);
  const problems = [];
  const stages = [];

  if (needIso) {
    stages.push(moveStage({
      isolate: { ok: true },
      exp: { nudge: true, why: `That can be made to work, but it turns the ${coefS} into a power and makes more to do. It is easier to divide by ${coefS} first and get ${lnS} on its own.` },
      lg: { why: 'There is already a log on the left. Taking another log of it does not undo it.' },
      ln: { why: 'There is already a log on the left. Taking another log of it does not undo it.' },
    }, `Right. Divide by ${coefS} so that ${lnS} is on its own.`, [], 'The unknown is inside a log, and the log is not on its own.'));
    stages.push({
      id: 'isolate',
      label: 'Isolate',
      kind: 'typed',
      title: `Get ${lnS} on its own.`,
      sub: 'A decimal or a fraction such as 5/2 is fine.',
      show: [questionLatex],
      rows: [[{ tex: `${lnT} =` }, { box: 'K' }]],
      fill: { K: typedForm(K, true) },
      judge(vals) {
        const v = parseRational(vals.K);
        if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
        if (rEq(v, K)) return { ok: true, marks: { K: true } };
        let why = `Divide both sides by ${coefS}.`;
        if (rEq(v, rMul(k, coef))) why = `Divide by ${coefS}, do not multiply: ${numS(k, true)} ÷ ${coefS} = ${Ks}.`;
        else if (rEq(v, k)) why = `That is still ${coefS} ${lnS}. Divide both sides by ${coefS}.`;
        return { ok: false, marks: { K: false }, why };
      },
      good: `Right: ${lnS} = ${Ks}. Now the log is on its own.`,
      lines: [`${lnT} = ${Kt}`],
    });
  } else {
    stages.push(moveStage({
      exp: { ok: true },
      isolate: { why: `${lnS} is already on its own. Now undo the log.` },
      lg: { why: 'There is already a log on the left. To undo ln you use its inverse: make each side a power of e.' },
      ln: { why: 'There is already a log on the left. To undo ln you use its inverse: make each side a power of e.' },
    }, `Right. e to the power is the inverse of ln, so e^(${lnS}) is just ${argS}.`, [`e^{${lnT}} = e^{${Kt}}`], 'The unknown is inside a log.'));
  }

  const undoRight = `${arg} = e^{${Kt}}`;
  stages.push({
    id: 'undo',
    label: 'Undo the log',
    kind: 'choice',
    columns: 2,
    title: needIso ? 'Now make each side a power of e.' : 'e and ln undo each other.',
    sub: `e^(${lnS}) is just ${argS}. Which line is right?`,
    show: [needIso ? `${lnT} = ${Kt}` : `e^{${lnT}} = e^{${Kt}}`],
    options: pickOptions({ id: 'right', tex: undoRight }, [
      Kv > 0 && { id: 'lnAgain', tex: `${arg} = \\ln ${Kt}`, why: 'That takes a log again. ln is undone by its inverse, e to the power.' },
      Kv < 0 && { id: 'negPow', tex: `${arg} = -e^{${numTex(rAbs(K), true)}}`, why: `A negative power is not a negative number. e^(${Ks}) is small, but it is positive.` },
      { id: 'ten', tex: `${arg} = 10^{${Kt}}`, why: '10 to the power undoes lg. ln is the log to base e, so it is undone by e to the power.' },
      { id: 'times', tex: `${arg} = ${Kt}e`, why: `e^${Ks} means e to the POWER ${Ks}. It is not ${Ks} × e.` },
    ], `${item.id}undo`),
    good: plain && give !== '3sf' ? `Right, and that is the exact answer: x = e^${Ks}.` : 'Right: e^(ln a) = a.',
    lines: needIso ? [`e^{${lnT}} = e^{${Kt}}`, undoRight] : [undoRight],
  });

  const valueAlts = [
    { v: Kv > 0 ? Math.log(Kv) : NaN, why: `That is ln ${Ks}. You want e^${Ks}: use the e^x key.` },
    { v: 10 ** Kv, why: `That is 10^${Ks}. The base here is e, not 10.` },
    { v: Kv * Math.E, why: `That is ${Ks} × e. e^${Ks} is e to the POWER ${Ks}.` },
  ];
  const V5 = V.toPrecision(5);
  const xS = sfString(x);
  let answerLatex;
  if (give === '3sf') {
    const rows = plain
      ? [[{ tex: `x = e^{${Kt}} =` }, { box: 'x', width: 'w-28' }]]
      : [[{ tex: `${arg} = e^{${Kt}} =` }, { box: 'L', width: 'w-28' }], [{ tex: 'x =' }, { box: 'x', width: 'w-28' }]];
    const xAlts = plain ? valueAlts : linearAlts(p, q, V, txt(V5), argS);
    stages.push({
      id: 'answer',
      label: 'Work it out',
      kind: 'typed',
      title: plain ? 'Work it out on your calculator.' : 'Work out the right-hand side, then solve for x.',
      sub: plain ? 'Give x correct to 3 significant figures.' : 'Keep at least 4 significant figures in the first box. Give x correct to 3 significant figures.',
      show: [undoRight],
      rows,
      fill: plain ? { x: xS } : { L: V5, x: xS },
      judge(vals) {
        const marks = {};
        if (!plain) {
          const a = judgeWorking(vals.L, V, { alts: valueAlts, generic: `Key in e^${Ks} with the e^x key.` });
          if (a.invalid) return a;
          marks.L = a.ok;
          if (!a.ok) { const bx = judgeSf(vals.x, x); marks.x = cleanNum(vals.x) ? !!bx.ok : undefined; return { ...a, marks }; }
        }
        const res = judgeSf(vals.x, x, { alts: xAlts, generic: plain ? `Key in e^${Ks} with the e^x key.` : `Solve ${argS} = ${txt(V5)} for x.` });
        if (res.invalid) return res;
        marks.x = !!res.ok;
        return { ...res, marks };
      },
      good: `Right: x = ${txt(xS)}, correct to 3 significant figures.`,
      lines: plain
        ? [`x = ${xS}\\ \\text{(3 s.f.)}`]
        : [`${arg} = e^{${Kt}} = ${V5}`, `x = ${xS}\\ \\text{(3 s.f.)}`],
    });
    answerLatex = `x = ${xS}`;
  } else if (!plain) {
    const inner = `e^{${Kt}}`;
    const right = exactForm(p, q, inner);
    const aq = Math.abs(q);
    const ap = Math.abs(p);
    stages.push({
      id: 'answer',
      label: 'Exact answer',
      kind: 'choice',
      columns: 2,
      title: 'Solve for x. Which is the exact answer?',
      sub: 'Leave e in the answer. No calculator is needed.',
      show: [undoRight],
      options: pickOptions({ id: 'right', tex: `x = ${right}`, v: x }, [
        q !== 0 && { id: 'sign', tex: `x = ${exactForm(p, -q, inner)}`, v: (V + q) / p, why: `The ${aq} changes sign when it crosses the equals sign${Math.abs(p) === 1 ? '' : `, before you divide by ${txt(p)}`}.` },
        q !== 0 && { id: 'inside', tex: `x = ${exactForm(p, 0, `e^{${numTex(rSub(K, rat(q, 1)), true)}}`)}`, v: Math.exp(Kv - q) / p, why: `The ${aq} is not part of the power. e^${Ks} ${q > 0 ? MINUS : '+'} ${aq} is not e^(${Ks} ${q > 0 ? MINUS : '+'} ${aq}).` },
        q !== 0 && ap !== 1 && { id: 'order', tex: `x = ${exactForm(p, 0, inner)} ${q > 0 ? '-' : '+'} ${aq}`, v: V / p - q, why: `Everything is divided by ${txt(p)}, the ${aq} as well. Undo the ${q > 0 ? '+' : MINUS}${aq} first, then divide.` },
        Kv > 0 && { id: 'lnForm', tex: `x = ${exactForm(p, q, `\\ln ${Kt}`)}`, v: (Math.log(Kv) - q) / p, why: `That takes a log again. ln is undone by e to the power, so the answer has e^${Ks} in it.` },
        { id: 'times', tex: `x = ${exactForm(p, q, `${Kt}e`)}`, v: (Kv * Math.E - q) / p, why: `e^${Ks} is e to the POWER ${Ks}. It is not ${Ks} × e.` },
      ], `${item.id}answer`),
      good: 'Right. That is exact: no rounding anywhere.',
      lines: [`x = ${right}`],
    });
    answerLatex = `x = ${right}`;
  } else {
    answerLatex = `x = e^{${Kt}}`;
  }

  const checkLines = [];
  if (give === '3sf') {
    const xr = Number(xS);
    const inner = p === 1 ? (xS.startsWith('-') && q !== 0 ? `(${xS})` : xS) : `(${xS})`;
    checkLines.push({ text: `Put x = ${txt(xS)} back in:`, tex: `${coefT}\\ln(${linTex(p, q, inner)}) \\approx ${sfString(rValue(coef) * Math.log(p * xr + q))}` });
    checkLines.push({ text: `That is close to ${numS(k, true)}. It is not exact, because x has been rounded.` });
  } else {
    checkLines.push({ text: 'As a decimal,', tex: `x \\approx ${xS}` });
  }
  checkLines.push({ text: `${argS} comes out as ${sfS(V)}, which is positive, so the log exists.` });
  if (V > 1e6) problems.push('e to that power is too big to work with');
  return {
    mode: 'logs', kind: 'ln', x, L: V, plain, needIso, give, questionLatex, stages, answerLatex, checkLines, problems,
    head: 'Solve', register: give === '3sf' ? REGISTER['3sf'] : REGISTER.exact, numbers: give === '3sf' ? [x] : [],
  };
}

export function logsModel(item) {
  if (item.kind === 'exp') return expLogsModel(item);
  if (item.kind === 'exp2') return exp2Model(item);
  if (item.kind === 'ln') return lnLogsModel(item);
  throw new Error(`unknown kind "${item.kind}"`);
}

// =================================================================== HIDDEN QUADRATIC

/** One monomial f·y^deg as KaTeX, without its sign. */
function monoTex(f, deg) {
  const a = rAbs(f);
  if (deg === 0) return ratLatex(a);
  if (deg === -1) return `\\dfrac{${ratLatex(a)}}{y}`;
  const c = rIsOne(a) ? '' : ratLatex(a);
  return `${c}y${deg === 1 ? '' : `^{${deg}}`}`;
}
/** A list of signed pieces `[sign, tex]` joined into one side of an equation. */
function joinSigned(pieces) {
  if (!pieces.length) return '0';
  return pieces.map(([sign, t], i) => (i === 0 ? `${sign < 0 ? '-' : ''}${t}` : `${sign < 0 ? '-' : '+'} ${t}`)).join(' ');
}

export function quadModel(item) {
  const base = item.base;
  const e = isE(base);
  const b = baseNum(base);
  const B = baseTex(base);
  const problems = [];

  /** An authored term → everything known about it. */
  const parse = (t) => {
    if (!Array.isArray(t)) { const c = R(t); return { c, isConst: true, deg: 0, f: c }; }
    const [cRaw, m, k = 0, big] = t;
    const c = R(cRaw);
    let j = 1;
    if (big !== undefined && big !== base) {
      j = [2, 3].find((n) => !e && base ** n === big);
      if (!j) throw new Error(`${big} is not the square or the cube of the base ${base}`);
    }
    if (e && k !== 0) throw new Error('a power of e with a shift has an irrational coefficient: keep the shift at 0');
    const f = e ? c : rMul(c, powInt(base, j * k));
    const printed = big !== undefined && big !== base ? `${big}` : B;
    const P = `${printed}^{${linTex(m, k)}}`;
    const PS = m === 1 && k === 0 ? `${printed}^x` : `${printed}^(${linText(m, k)})`;
    return { c, m, k, j, big: j > 1 ? big : null, deg: j * m, f, P, PS, shift: j * k, isConst: false };
  };
  const lhs = (item.lhs || []).map(parse);
  const rhs = (item.rhs || []).map(parse);
  const all = [...lhs, ...rhs];

  // ---- printing
  const termPiece = (t) => {
    if (t.isConst) return [rSign(t.c), ratLatex(rAbs(t.c))];
    const a = rAbs(t.c);
    if (rIsOne(a)) return [rSign(t.c), t.P];
    return [rSign(t.c), e ? `${ratLatex(a)}${t.P}` : `${ratLatex(a)}\\left(${t.P}\\right)`];
  };
  const sideTex = (side) => joinSigned(side.filter((t) => t.c[0] !== 0 || side.length === 1).map(termPiece));
  const questionLatex = `${sideTex(lhs)} = ${sideTex(rhs)}`;
  const ySide = (side) => joinSigned(side.filter((t) => t.c[0] !== 0 || side.length === 1).map((t) => [rSign(t.f), monoTex(t.f, t.deg)]));
  const yEquation = `${ySide(lhs)} = ${ySide(rhs)}`;

  /** How one power turns into y. */
  const hintOf = (t) => {
    if (t.deg === -1) return `${t.P} = \\dfrac{1}{${B}^{x}} = \\dfrac{1}{y}`;
    const yd = t.deg === 1 ? 'y' : `y^{${t.deg}}`;
    const plainPow = `${t.big || B}^{${linTex(t.m, 0)}}`;
    if (t.k !== 0) {
      const num = powInt(t.big || base, t.k);
      const lead = `${plainPow} \\times ${t.big || B}^{${t.k}}`;
      return `${t.P} = ${lead} = ${rIsOne(num) ? '' : ratLatex(num)}${yd}`;
    }
    if (t.big) return `${t.P} = \\left(${B}^{${t.j}}\\right)^{x} = \\left(${B}^{x}\\right)^{${t.j}} = ${yd}`;
    if (t.deg === 1) return `${t.P} = y`;
    return `${t.P} = \\left(${B}^{x}\\right)^{${t.deg}} = ${yd}`;
  };
  /** The same, in plain type, for a message. */
  const hintText = (t) => {
    if (t.deg === -1) return `${t.PS} = 1/${B}^x = 1/y`;
    const yd = t.deg === 1 ? 'y' : t.deg === 2 ? 'y²' : 'y³';
    const printed = t.big || B;
    if (t.k !== 0) {
      const num = powInt(t.big || base, t.k);
      const plainPow = `${printed}^${t.m === 1 ? 'x' : `(${t.m}x)`}`;
      return `${t.PS} = ${plainPow} × ${printed}^${t.k < 0 ? `(${txt(t.k)})` : t.k} = ${rIsOne(num) ? '' : ratText(num)}${yd}`;
    }
    if (t.big) return `${t.PS} = (${B}^${t.j})^x = (${B}^x)^${t.j} = ${yd}`;
    if (t.deg === 1) return `${t.PS} = y`;
    return `${t.PS} = (${B}^x)^${t.deg} = ${yd}`;
  };
  const powers = all.filter((t) => !t.isConst);
  const seen = new Set();
  const hints = powers.filter((t) => (seen.has(t.P) ? false : seen.add(t.P))).map(hintOf);

  // ---- collect: everything on the left
  const collect = (terms, shiftBy, rule = (t) => ({ deg: t.deg, f: t.f })) => {
    const poly = {};
    for (const [t, sign] of terms) {
      const { deg, f } = rule(t);
      const d = deg + (typeof shiftBy === 'function' ? shiftBy(t) : shiftBy);
      poly[d] = rAdd(poly[d] || ZERO, sign < 0 ? rNeg(f) : f);
    }
    return poly;
  };
  const signed = [...lhs.map((t) => [t, 1]), ...rhs.map((t) => [t, -1])];
  const hasNeg = powers.some((t) => t.deg === -1);
  const shiftAll = hasNeg ? 1 : 0;
  const poly = collect(signed, shiftAll);
  for (const d of Object.keys(poly)) if (![0, 1, 2].includes(Number(d)) && poly[d][0] !== 0) problems.push(`a term of degree ${d} in y is left, so this is not a quadratic`);
  /** {2, 1, 0} → whole numbers with a positive leading coefficient, not divided down. */
  const integerise = (pl) => {
    const raw = [pl[2] || ZERO, pl[1] || ZERO, pl[0] || ZERO];
    const L = raw.reduce((acc, r0) => lcm(acc, r0[1]), 1);
    let ints = raw.map((r0) => (r0[0] * L) / r0[1]);
    const lead = ints.find((n) => n !== 0) || 1;
    if (lead < 0) ints = ints.map((n) => -n);
    return ints.map((n) => n + 0);
  };
  const [A, Bq, C] = integerise(poly);
  const linear = A === 0;
  if (linear && Bq === 0) problems.push('every term in y cancels, so there is nothing to solve');
  const proportional = (u, w) => {
    const i = w.findIndex((n) => n !== 0);
    if (i === -1 || u[i][0] === 0) return false;
    // u[k] · w[i] = w[k] · u[i] for every k
    return u.every((uk, k2) => rEq(rMul(uk, rat(w[i], 1)), rMul(u[i], rat(w[k2], 1))));
  };

  // ---- roots
  let roots = [];
  if (linear && Bq !== 0) roots = [rat(-C, Bq)];
  else if (!linear) {
    const disc = Bq * Bq - 4 * A * C;
    const sq = Math.round(Math.sqrt(Math.max(disc, 0)));
    if (disc < 0 || sq * sq !== disc) problems.push(`the quadratic ${A}y² + ${Bq}y + ${C} = 0 has no rational roots, so its answers cannot be typed exactly`);
    else {
      roots = [rat(-Bq - sq, 2 * A), rat(-Bq + sq, 2 * A)];
      if (rEq(roots[0], roots[1])) problems.push('the quadratic has a repeated root: pick numbers that give two different values of y');
    }
  }
  const cand = roots.map((r, i) => {
    const keep = r[0] > 0;
    let exact = null;
    let xv = null;
    if (keep) {
      if (e) exact = rIsOne(r) ? ZERO : null;
      else exact = ppRatio(ppOfRat(r), ppOfRat(rat(base, 1)));
      xv = exact ? rValue(exact) : Math.log(rValue(r)) / Math.log(b);
    }
    return { key: `r${i + 1}`, xKey: `x${i + 1}`, r, keep, exact, x: xv, rT: ratLatex(r), rS: ratText(r) };
  });
  const kept = cand.filter((c0) => c0.keep);
  const give = e ? (item.give || '3sf') : 'mixed';

  // ---- stages
  const stages = [];
  const subLine = { text: 'Let', tex: `y = ${B}^{x}` };
  const shifted = powers.find((t) => t.k !== 0);
  const bigTerm = powers.find((t) => t.big);
  const sqTerm = powers.find((t) => t.deg === 2 && !t.big);
  if (!item.given) {
    const wrong = [
      hasNeg && { id: 'neg', tex: `y = ${B}^{-x}`, nudge: true, why: `That works too, because then ${B}^x = 1/y. The usual choice is y = ${B}^x, and the working here uses it. Choose that one.` },
      bigTerm && { id: 'big', tex: `y = ${bigTerm.big}^{x}`, why: `Then ${B}^x would be the square root of y, and the equation would not turn into a quadratic. Choose the SMALLER base: ${bigTerm.big}^x = (${B}^x)² = y².` },
      !bigTerm && sqTerm && { id: 'big', tex: `y = ${B}^{2x}`, why: `Then ${B}^x would be the square root of y. Let y be the simple power ${B}^x, so that ${B}^(2x) = y².` },
      shifted && { id: 'shifted', tex: `y = ${shifted.P}`, nudge: true, why: `That can be made to work, but then every other power needs adjusting to match. It is simpler to split the shift off, ${hintText(shifted)}, and let y = ${B}^x. Choose that one.` },
      { id: 'xsq', tex: 'y = x^{2}', why: `There is no x² here: x is up in the power. The thing that repeats is ${B}^x.` },
      { id: 'lin', tex: `y = ${B}x`, why: `${B}^x is a power, not ${B} × x, so ${B}x appears nowhere in the equation.` },
    ];
    stages.push({
      id: 'sub',
      label: 'Substitute',
      kind: 'choice',
      columns: 2,
      title: 'Choose the substitution.',
      sub: 'Which one turns this into an equation you already know how to solve?',
      options: pickOptions({ id: 'right', tex: `y = ${B}^{x}` }, wrong, `${item.id}sub`),
      good: `Right. Every power here can be written in terms of ${B}^x.`,
      lines: [subLine],
    });
  }

  if (hasNeg) {
    const constTerm = all.find((t) => t.isConst && t.c[0] !== 0);
    stages.push({
      id: 'multiply',
      label: 'Clear 1/y',
      kind: 'choice',
      columns: 1,
      title: `${B}^(${MINUS}x) is 1 over ${B}^x, so it becomes 1/y. How do you clear the fraction?`,
      show: [yEquation],
      options: rotate([
        { id: 'mulY', text: 'Multiply every term by y', ok: true },
        { id: 'mulInv', text: 'Multiply every term by 1/y', why: 'That makes it worse: the fraction would become a number over y².' },
        { id: 'lnAll', text: 'Take ln of every term', why: 'There is no law for the ln of a sum. ln(a + b) is not ln a + ln b, so logs cannot be taken term by term.' },
        { id: 'square', text: 'Square both sides', why: 'Squaring leaves y underneath, and adds a cross term as well.' },
      ], `${item.id}multiply`),
      good: constTerm ? `Right. Every term, the plain ${ratText(rAbs(constTerm.c))} as well.` : 'Right. Every term on both sides.',
      lines: [yEquation, { text: 'Multiply every term by y.' }],
    });
  }

  const quadPieces = [[A, 2], [Bq, 1], [C, 0]].filter(([n]) => n !== 0).map(([n, d]) => [Math.sign(n), monoTex(rat(n, 1), d)]);
  const quadTex = `${joinSigned(quadPieces)} = 0`;
  // The wrong quadratics worth naming.
  const altPolys = [];
  if (shifted) {
    altPolys.push({
      ints: integerise(collect(signed, shiftAll, (t) => ({ deg: t.deg, f: t.c }))),
      why: `A shifted power brings a number with it: ${hintText(shifted)}.`,
    });
  }
  if (bigTerm) {
    altPolys.push({
      ints: integerise(collect(signed, shiftAll, (t) => (t.big ? { deg: t.m, f: rMul(t.f, rat(t.j, 1)) } : { deg: t.deg, f: t.f }))),
      why: `${bigTerm.big}^x = (${B}^${bigTerm.j})^x = (${B}^x)^${bigTerm.j}, which is y${bigTerm.j === 2 ? '²' : '³'}, not ${bigTerm.j}y.`,
    });
  }
  if (sqTerm) {
    altPolys.push({
      ints: integerise(collect(signed, shiftAll, (t) => (t === sqTerm ? { deg: 1, f: rMul(t.f, rat(2, 1)) } : { deg: t.deg, f: t.f }))),
      why: `${B}^(2x) = (${B}^x)², which is y², not 2y.`,
    });
  }
  if (rhs.some((t) => t.c[0] !== 0)) {
    altPolys.push({
      ints: integerise(collect(signed.map(([t]) => [t, 1]), shiftAll)),
      why: 'Everything has to be on one side. A term changes sign when it crosses the equals sign.',
    });
  }
  if (hasNeg) {
    const constTerm = all.find((t) => t.isConst && t.c[0] !== 0);
    if (constTerm) {
      altPolys.push({
        ints: integerise(collect(signed, (t) => (t.isConst ? 0 : 1))),
        why: `Multiply EVERY term by y, the plain number as well: ${ratText(rAbs(constTerm.c))} becomes ${ratText(rAbs(constTerm.c))}y.`,
      });
    }
  }
  const truth = [A, Bq, C];
  if (linear) {
    // Keep the numbers the student will actually get: 4y + ½y = 27 is (9/2)y = 27.
    const rawB = poly[1] || ZERO;
    const rawC = rNeg(poly[0] || ZERO);
    const collectedTex = `${rSign(rawB) < 0 ? '-' : ''}${monoTex(rawB, 1)} = ${ratLatex(rawC)}`;
    const bS = ratText(rawB);
    stages.push({
      id: 'rewrite',
      label: 'Write in y',
      kind: 'typed',
      title: 'Write each power as a number times y, then collect the y terms.',
      sub: 'The y terms on the left, the plain number on the right. A fraction is typed like 9/2.',
      show: [questionLatex],
      hints,
      rows: [[{ box: 'B', width: 'w-20' }, { tex: 'y =' }, { box: 'C', width: 'w-20' }]],
      fill: { B: typedForm(rawB), C: typedForm(rawC) },
      judge(vals) {
        const vb = parseRational(vals.B);
        const vc = parseRational(vals.C);
        if (!vb || !vc) return { ok: false, invalid: true, why: 'Fill in both boxes. A fraction is typed like 9/2.' };
        if (proportional([ZERO, vb, rNeg(vc)], truth)) return { ok: true, marks: { B: true, C: true } };
        let why = 'Write each power as a number times y, add up the y terms, and keep the plain number on the right.';
        for (const alt of altPolys) if (proportional([ZERO, vb, rNeg(vc)], alt.ints)) { why = alt.why; break; }
        if (proportional([ZERO, vb, vc], truth)) why = 'The plain number changes sign when it crosses the equals sign.';
        return { ok: false, marks: { B: rEq(vb, rawB), C: rEq(vc, rawC) }, why };
      },
      good: 'Right. Every power was a number times y, so they collect into one term.',
      lines: yEquation === collectedTex ? [yEquation] : [yEquation, collectedTex],
    });
    stages.push({
      id: 'roots',
      label: 'Solve for y',
      kind: 'typed',
      title: 'Solve for y.',
      show: [collectedTex],
      rows: [[{ tex: 'y =' }, { box: 'r1', width: 'w-24' }]],
      fill: { r1: typedForm(roots[0] || ZERO) },
      judge(vals) {
        const v = parseRational(vals.r1);
        if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
        if (roots[0] && rEq(v, roots[0])) return { ok: true, marks: { r1: true } };
        let why = `Divide both sides by ${bS}.`;
        if (roots[0] && rEq(v, rNeg(roots[0]))) why = `Right size, wrong sign. Check the signs of ${ratText(rawC)} and ${bS} when you divide.`;
        else if (rEq(v, rMul(rawC, rawB))) why = `Divide by ${bS}, do not multiply.`;
        return { ok: false, marks: { r1: false }, why };
      },
      good: `Right: y = ${cand[0] ? cand[0].rS : '?'}.`,
      lines: [`y = ${cand[0] ? cand[0].rT : '?'}`],
    });
  } else {
    stages.push({
      id: 'rewrite',
      label: 'Write in y',
      kind: 'typed',
      title: hasNeg ? 'Multiply through by y and collect. What is the quadratic?' : 'Write every term in y. What is the quadratic?',
      sub: 'Everything on the left, zero on the right. Type a minus sign for a negative number, and 0 for a term that is missing.',
      show: [hasNeg ? yEquation : questionLatex],
      hints,
      rows: [[{ box: 'A', width: 'w-16' }, { tex: 'y^2 +' }, { box: 'B', width: 'w-16' }, { tex: 'y +' }, { box: 'C', width: 'w-16' }, { tex: '= 0' }]],
      fill: { A: `${A}`, B: `${Bq}`, C: `${C}` },
      judge(vals) {
        const typed = [parseRational(vals.A), parseRational(vals.B), parseRational(vals.C)];
        if (typed.some((v) => !v)) return { ok: false, invalid: true, why: 'Fill in all three boxes. Type 0 if a term is missing.' };
        if (proportional(typed, truth)) return { ok: true, marks: { A: true, B: true, C: true } };
        let why = 'Turn one term at a time into y, move everything to the left, then read off the three numbers.';
        for (const alt of altPolys) if (proportional(typed, alt.ints)) { why = alt.why; break; }
        // Mark each box against the form whose leading sign the student used.
        const flip = typed[0][0] < 0 ? -1 : 1;
        return {
          ok: false,
          marks: { A: rEq(typed[0], rat(flip * A, 1)), B: rEq(typed[1], rat(flip * Bq, 1)), C: rEq(typed[2], rat(flip * C, 1)) },
          why,
        };
      },
      good: 'Right. That is the quadratic that was hiding in the equation.',
      lines: hasNeg || yEquation === quadTex ? [quadTex] : [yEquation, quadTex],
    });
    const [r1, r2] = roots.length === 2 ? roots : [ZERO, ZERO];
    const fac = (r) => (r[0] === 0 ? 'y' : `(${linTex(r[1], -r[0], 'y')})`);
    const g = roots.length === 2 ? A / (r1[1] * r2[1]) : 1;
    const factorTex = `${g === 1 ? '' : g}${r1[0] === 0 ? `y${fac(r2)}` : r2[0] === 0 ? `y${fac(r1)}` : `${fac(r1)}${fac(r2)}`}`;
    const factorText = txt(factorTex);
    const prod = ratText(rat(C, A));
    const sum = ratText(rat(-Bq, A));
    stages.push({
      id: 'roots',
      label: 'Solve for y',
      kind: 'typed',
      title: 'Solve the quadratic for y.',
      sub: 'Factorise it, or use the formula. Give both values, in either order.',
      show: [quadTex],
      rows: [[{ tex: 'y =' }, { box: 'r1', width: 'w-20' }, { tex: '\\text{or}\\quad y =' }, { box: 'r2', width: 'w-20' }]],
      fill: { r1: typedForm(r1), r2: typedForm(r2) },
      after: [`${factorTex} = 0`],
      judge(vals) {
        const v1 = parseRational(vals.r1);
        const v2 = parseRational(vals.r2);
        if (!v1 || !v2) return { ok: false, invalid: true, why: 'Give both values of y. A fraction is typed like 1/2.' };
        const straight = rEq(v1, r1) && rEq(v2, r2);
        const swapped = rEq(v1, r2) && rEq(v2, r1);
        if (straight || swapped) return { ok: true, marks: { r1: true, r2: true } };
        const isRoot = (v) => rEq(v, r1) || rEq(v, r2);
        const marks = { r1: isRoot(v1), r2: isRoot(v2) && !(rEq(v1, v2)) };
        let why = `The two values multiply to ${prod} and add up to ${sum}.`;
        const negated = (rEq(v1, rNeg(r1)) && rEq(v2, rNeg(r2))) || (rEq(v1, rNeg(r2)) && rEq(v2, rNeg(r1)));
        const ex = r1[0] !== 0 ? r1 : r2;
        if (negated) why = `Those have the wrong signs. In ${factorText} = 0, the bracket ${txt(fac(ex))} is zero when y = ${ratText(ex)}, not ${ratText(rNeg(ex))}. Do the same with the other bracket.`;
        else if (rEq(v1, v2) && isRoot(v1)) why = `That is one value twice. A quadratic like this has two: they multiply to ${prod} and add up to ${sum}.`;
        else if (marks.r1 || marks.r2) why = `One value is right. For the other: the two values multiply to ${prod} and add up to ${sum}.`;
        return { ok: false, marks, why };
      },
      good: `Right: y = ${ratText(r1)} or y = ${ratText(r2)}.`,
      lines: [`${factorTex} = 0`, `y = ${ratLatex(r1)} \\ \\text{ or } \\ y = ${ratLatex(r2)}`],
    });
  }

  // ---- keep or reject
  const keepWhy = (c0) => {
    const v = rValue(c0.r);
    if (!c0.keep) {
      return v === 0
        ? `${B}^x = 0 has no solution. ${B}^x gets as close to 0 as you like, but it never reaches it. Reject it.`
        : `${B}^x = ${c0.rS} has no solution. Every power of ${B} is positive, however negative x is. Reject it.`;
    }
    if (v === 1) return `1 is positive, and ${B}^0 = 1, so this one gives x = 0. Keep it.`;
    if (v < 1) return `${c0.rS} is small, but it is positive, so ${B}^x can equal it: a negative power of ${B} gives a number between 0 and 1. Only zero and negative values are rejected.`;
    return `${c0.rS} is positive, so ${B}^x can equal it. Keep it.`;
  };
  const rejected = cand.filter((c0) => !c0.keep);
  const keepLines = rejected.map((c0) => ({ text: `${B}^x = ${c0.rS} has no solution, because ${B}^x is always positive. Reject it.` }));
  if (cand.length && !kept.length) keepLines.push({ text: cand.length > 1 ? 'Neither value of y is possible, so the equation has no solutions.' : 'That value of y is not possible, so the equation has no solutions.' });
  let keepGood;
  if (cand.length && !kept.length) keepGood = cand.length > 1 ? 'Right. Neither value is positive, so there are no solutions at all.' : 'Right. It is not positive, so there are no solutions at all.';
  else if (rejected.length) keepGood = `Right. ${B}^x is never ${rValue(rejected[0].r) === 0 ? 'zero' : 'negative'}, so ${rejected[0].rS} is rejected.`;
  else if (cand.length > 1) keepGood = 'Right. Both values are positive, so both give a value of x.';
  else keepGood = 'Right. It is positive, so it gives a value of x.';
  stages.push({
    id: 'keep',
    label: 'Keep or reject',
    kind: 'keep',
    tries: 1,
    title: `y stands for ${B}^x. Can ${B}^x really take ${cand.length > 1 ? 'each of these values' : 'this value'}?`,
    sub: `Decide for ${cand.length > 1 ? 'each one' : 'it'}: keep it or reject it.`,
    rows: cand.map((c0) => ({ key: c0.key, tex: `${B}^{x} = ${c0.rT}`, keep: c0.keep, why: keepWhy(c0) })),
    good: keepGood,
    lines: keepLines,
  });

  // ---- back to x
  const xTexOf = (c0) => {
    if (c0.exact) return ratLatex(c0.exact);
    return e ? `\\ln ${c0.rT}` : `\\dfrac{\\lg ${c0.rT}}{\\lg ${B}}`;
  };
  let answerLatex;
  if (kept.length) {
    if (e && give === 'exact') {
      const form = (f) => kept.map(f).join(' \\text{ or } ');
      const right = form((c0) => `x = ${c0.exact ? '0' : `\\ln ${c0.rT}`}`);
      const bad = rejected.find((c0) => c0.r[0] < 0);
      const one = kept.find((c0) => c0.exact);
      stages.push({
        id: 'convert',
        label: 'Back to x',
        kind: 'choice',
        columns: 1,
        title: kept.length > 1 ? 'Turn each value of y back into x. Which is the full answer?' : 'Turn the value of y back into x. Which is the answer?',
        sub: 'Leave ln in the answer. No calculator is needed.',
        show: kept.map((c0) => `e^{x} = ${c0.rT}`),
        options: pickOptions({ id: 'right', tex: right }, [
          bad && { id: 'withRejected', tex: `${right} \\text{ or } x = \\ln\\left(${bad.rT}\\right)`, why: `${bad.rS} was rejected. The ln of a negative number does not exist, so it gives no value of x.` },
          one && { id: 'lnOne', tex: form((c0) => `x = ${c0.exact ? '1' : `\\ln ${c0.rT}`}`), why: 'ln 1 is 0, not 1, because e^0 = 1.' },
          { id: 'raised', tex: form((c0) => `x = e^{${c0.rT}}`), why: `e^x = ${kept[0].rS} is undone by taking ln. Writing e^${kept[0].rS} raises e a second time.` },
          { id: 'values', tex: form((c0) => `x = ${c0.rT}`), why: 'Those are the values of e^x, which is y. x itself is the ln of each one.' },
          { id: 'lg', tex: form((c0) => `x = ${c0.exact ? '0' : `\\lg ${c0.rT}`}`), why: 'Base e is undone by ln, not by lg.' },
        ], `${item.id}convert`),
        good: 'Right. Those are exact.',
        lines: kept.map((c0) => `e^{x} = ${c0.rT} \\ \\Rightarrow\\ x = ${c0.exact ? '\\ln 1 = 0' : `\\ln ${c0.rT}`}`),
      });
      answerLatex = right;
    } else {
      const xStr = (c0) => (c0.exact ? typedForm(c0.exact) : sfString(c0.x));
      stages.push({
        id: 'convert',
        label: 'Back to x',
        kind: 'typed',
        title: kept.length > 1 ? 'Turn each value of y back into x.' : 'Turn the value of y back into x.',
        sub: e
          ? 'Use ln. Give 3 significant figures, unless the answer is exact.'
          : `If the value is an exact power of ${B}, give the power. If not, take logs and give 3 significant figures.`,
        rows: kept.map((c0) => [{ tex: `${B}^{x} = ${c0.rT}\\ \\ \\Rightarrow\\ \\ x =` }, { box: c0.xKey, width: 'w-24' }]),
        fill: Object.fromEntries(kept.map((c0) => [c0.xKey, xStr(c0)])),
        judge(vals) {
          const marks = {};
          let fail = null;
          let note = null;
          for (const c0 of kept) {
            let res;
            const rv = rValue(c0.r);
            if (c0.exact) {
              const v = parseRational(vals[c0.xKey]);
              if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
              if (rEq(v, c0.exact)) res = { ok: true };
              else {
                let why = e ? 'Ask: e to what power gives 1?' : `Write ${c0.rS} as a power of ${B}. That power is x.`;
                if (!e && rEq(v, rDiv(c0.r, rat(base, 1)))) why = `${B}^x = ${c0.rS} is not ${B} × x = ${c0.rS}. Ask which POWER of ${B} makes ${c0.rS}.`;
                else if (c0.exact[0] !== 0 && rEq(v, rNeg(c0.exact))) why = c0.exact[0] < 0 ? `Check the sign: ${c0.rS} is less than 1, so the power of ${B} that makes it is negative.` : `Check the sign: ${c0.rS} is bigger than 1, so the power is positive.`;
                else if (c0.exact[0] === 0 && rEq(v, ONE)) why = `${B}^1 = ${B}, not 1. Which power turns any number into 1?`;
                else if (rEq(v, c0.r)) why = `That is the value of y. You want the power x that makes ${B}^x = ${c0.rS}.`;
                res = { ok: false, why };
              }
            } else {
              res = judgeSf(vals[c0.xKey], c0.x, {
                alts: e
                  ? [
                    { v: Math.log10(rv), why: `That is lg ${c0.rS}, the log to base 10. Base e needs the ln key.` },
                    { v: rv / Math.E, why: `e^x = ${c0.rS} is not e × x = ${c0.rS}. Use ln: x = ln ${c0.rS}.` },
                    { v: rv, why: `That is the value of y. x is ln ${c0.rS}.` },
                  ]
                  : [
                    { v: rv / b, why: `${B}^x = ${c0.rS} is not ${B} × x = ${c0.rS}. Take logs: x = lg ${c0.rS} ÷ lg ${B}.` },
                    { v: Math.log10(rv / b), why: `lg ${c0.rS} ÷ lg ${B} is not lg(${c0.rS} ÷ ${B}). Key in lg ${c0.rS} ÷ lg ${B} as it stands.` },
                    { v: 1 / c0.x, why: `Upside down. lg ${c0.rS} goes on top: x = lg ${c0.rS} ÷ lg ${B}.` },
                    { v: Math.log10(rv), why: `That is lg ${c0.rS} on its own. It still has to be divided by lg ${B}.` },
                    { v: rv, why: `That is the value of y. Take logs to find x: x = lg ${c0.rS} ÷ lg ${B}.` },
                  ],
                generic: e ? `Use the ln key: x = ln ${c0.rS}.` : `${c0.rS} is not an exact power of ${B}, so take logs: x = lg ${c0.rS} ÷ lg ${B}.`,
              });
              if (res.invalid) return res;
            }
            marks[c0.xKey] = !!res.ok;
            if (!res.ok && !fail) fail = res;
            if (res.ok && res.note && !note) note = res.note;
          }
          if (fail) return { ...fail, ok: false, marks };
          return { ok: true, marks, note };
        },
        good: `Right: x = ${kept.map((c0) => (c0.exact ? ratText(c0.exact) : sfS(c0.x))).join(' or x = ')}.`,
        lines: kept.map((c0) => `${B}^{x} = ${c0.rT} \\ \\Rightarrow\\ x = ${c0.exact ? ratLatex(c0.exact) : `${xTexOf(c0)} = ${sfString(c0.x)}`}`),
      });
      answerLatex = kept.map((c0) => `x = ${c0.exact ? ratLatex(c0.exact) : sfString(c0.x)}`).join(' \\text{ or } ');
    }
  } else {
    answerLatex = '\\text{no solutions}';
  }

  // ---- the reveal: put each answer back into the original equation
  const fmt = (v) => {
    if (Math.abs(v - Math.round(v)) < 1e-7) return `${Math.round(v)}`;
    if (Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-6) return String(Number(v.toFixed(3)));
    return sfString(v);
  };
  const valOf = (t, xv) => (t.isConst ? rValue(t.c) : rValue(t.c) * baseNum(t.big || base) ** (t.m * xv + t.k));
  const sideVals = (side, xv) => {
    const live = side.filter((t) => t.c[0] !== 0 || side.length === 1);
    const vals = live.map((t) => valOf(t, xv));
    const total = vals.reduce((a0, v) => a0 + v, 0);
    const listed = joinSigned(vals.map((v) => [v < 0 ? -1 : 1, fmt(Math.abs(v))]));
    return { total, tex: vals.length > 1 ? `${listed} = ${fmt(total)}` : fmt(total) };
  };
  const checkLines = kept.map((c0) => {
    const xText = c0.exact ? ratText(c0.exact) : (e && give === 'exact' ? `ln ${c0.rS}` : sfS(c0.x));
    const l = sideVals(lhs, c0.x);
    const r = sideVals(rhs, c0.x);
    return { text: `x = ${xText}:`, tex: `\\text{left } ${l.tex},\\quad \\text{right } ${r.tex}\\ \\checkmark` };
  });

  // ---- what the validator needs to know
  if (!linear && item.linear) problems.push('marked linear, but a y² term is left');
  if (linear && !item.linear) problems.push('the y² terms cancel, leaving one term in y: add linear: true if that is the point');
  if (cand.length && !kept.length && !item.expectNone) problems.push('no value of y is positive, so there are no solutions: add expectNone: true if that is the point');
  if (kept.length && item.expectNone) problems.push('marked expectNone, but a value of y is positive');
  if (give === 'exact' && !e) problems.push("give: 'exact' is only for base e");
  for (const c0 of cand) if (c0.r[1] > 9 || Math.abs(c0.r[0]) > 999) problems.push(`y = ${c0.rS} is awkward to type`);
  if (Math.max(Math.abs(A), Math.abs(Bq), Math.abs(C)) > 999) problems.push('a coefficient of the quadratic is too big to type');

  return {
    mode: 'quad', kind: linear ? 'linear' : 'quadratic', base, questionLatex, stages, answerLatex, checkLines, problems,
    head: 'Solve', givenTex: item.given ? `y = ${B}^{x}` : null,
    register: e
      ? (give === 'exact' ? REGISTER.ln : 'Give x correct to 3 significant figures, unless it is exact')
      : 'Give x exactly where you can, otherwise correct to 3 significant figures',
    coefs: [A, Bq, C], roots: cand, kept, give,
    figure: { base: b, baseTex: B, candidates: cand.map((c0) => ({ key: c0.key, y: rValue(c0.r), keep: c0.keep, x: c0.x, yText: c0.rS, xText: c0.keep ? (c0.exact ? ratText(c0.exact) : sfS(c0.x)) : null })) },
    numbers: kept.filter((c0) => !c0.exact && !(e && give === 'exact')).map((c0) => c0.x),
  };
}

// =================================================================== UNDO IT

function valueModel(item) {
  const front = R(item.front ?? 1);
  const terms = (item.terms || []).map(([k, a]) => ({ k: R(k), a: R(a) }));
  const problems = [];
  let pp = {};
  let lin = ZERO;
  for (const t of terms) {
    if (t.a[0] <= 0) { problems.push('the number inside a log must be positive'); continue; }
    pp = ppMul(pp, ppPow(ppOfRat(t.a), t.k));
    lin = rAdd(lin, rMul(t.k, t.a));
  }
  const N = ppToRat(pp);
  if (!N) problems.push('the power leaves a root inside the log, so the value is not a whole number or a fraction');
  const Nn = N || ONE;
  const single = terms.length === 1;
  const needInside = !(single && rIsOne(terms[0].k));
  const result = rMul(front, Nn);
  const expoTex = terms.map((t, i) => {
    const abs = rAbs(t.k);
    const bodyT = `${rIsOne(abs) ? '' : ratLatex(abs)}\\ln ${ratLatex(t.a)}`;
    return i === 0 ? `${rSign(t.k) < 0 ? '-' : ''}${bodyT}` : `${rSign(t.k) < 0 ? '-' : '+'} ${bodyT}`;
  }).join(' ');
  const expoText = terms.map((t, i) => {
    const abs = rAbs(t.k);
    const bodyS = `${rIsOne(abs) ? '' : `${ratText(abs)} `}ln ${ratText(t.a)}`;
    return i === 0 ? `${rSign(t.k) < 0 ? MINUS : ''}${bodyS}` : `${rSign(t.k) < 0 ? MINUS : '+'} ${bodyS}`;
  }).join(' ');
  const frontT = rIsOne(front) ? '' : rEq(front, rat(-1, 1)) ? '-' : ratLatex(front);
  const frontS = ratText(front);
  const NT = ratLatex(Nn);
  const NS = ratText(Nn);
  const questionLatex = `${frontT}e^{${expoTex}}`;
  const stages = [];
  const first = terms[0] || { k: ONE, a: ONE };
  const aS = ratText(first.a);
  const kS = ratText(first.k);
  const absK = rAbs(first.k);
  const powS = (r) => (rIsInt(r) && r[0] >= 0 ? ratText(r) : `(${ratText(r)})`);

  if (needInside) {
    stages.push({
      id: 'inside',
      label: 'One log',
      kind: 'typed',
      title: 'Write the power as a single ln.',
      sub: single ? 'A number in front of ln moves inside as a power. A fraction is typed like 1/5.' : 'A minus between logs divides the numbers inside. A plus multiplies them.',
      show: [questionLatex],
      rows: [[{ tex: `${expoTex} = \\ln` }, { box: 'N', width: 'w-24' }]],
      fill: { N: typedForm(Nn) },
      judge(vals) {
        const v = parseRational(vals.N);
        if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
        if (rEq(v, Nn)) return { ok: true, marks: { N: true } };
        let why = single ? `Raise ${aS} to the power ${kS}.` : 'Combine the logs into one: multiply for a plus, divide for a minus.';
        if (single) {
          const powered = ppToRat(ppPow(ppOfRat(first.a), absK)) || ONE;
          if (rEq(v, lin) && !rIsOne(absK)) why = `${expoText} is ln ${aS}^${powS(first.k)}, not ln(${kS} × ${aS}). The number in front becomes a POWER.`;
          else if (rSign(first.k) < 0 && rEq(v, rNeg(powered))) why = `ln of a negative number does not exist. The minus sign in front is a power of ${MINUS}1, and it turns the number upside down: ${expoText} = ln ${NS}.`;
          else if (rSign(first.k) < 0 && rEq(v, powered)) why = `The minus sign cannot be dropped. It is a power of ${MINUS}1, and it turns the number upside down: ${expoText} = ln ${NS}.`;
          else if (!rIsInt(absK) && rEq(v, rDiv(first.a, rat(absK[1], 1)))) why = `A power of ${ratText(absK)} is a root, not a fraction of the number: ${aS}^(${ratText(absK)}) = ${ratText(powered)}.`;
          else if (rEq(v, rDiv(ONE, Nn))) why = 'Upside down. Work out the power again, and check the sign of the number in front.';
        } else if (rEq(v, lin)) why = 'Adding and subtracting logs multiplies and divides the numbers inside. It does not add or subtract them.';
        else if (rEq(v, rDiv(ONE, Nn))) why = 'Upside down. The number after the minus sign goes underneath.';
        return { ok: false, marks: { N: false }, why };
      },
      good: `Right: ${expoText} = ln ${NS}.`,
      lines: [`${expoTex} = \\ln ${NT}`],
    });
  }
  stages.push({
    id: 'value',
    label: 'Undo',
    kind: 'typed',
    title: needInside ? 'Now e and ln undo each other.' : 'e and ln undo each other.',
    sub: rIsOne(front) ? 'e^(ln a) = a, for any positive a.' : 'e^(ln a) = a. Then deal with the number in front of e.',
    show: needInside ? [] : [questionLatex],
    rows: [[{ tex: `${frontT}e^{\\ln ${NT}} =` }, { box: 'v', width: 'w-24' }]],
    fill: { v: typedForm(result) },
    judge(vals) {
      const v = parseRational(vals.v);
      if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
      if (rEq(v, result)) return { ok: true, marks: { v: true } };
      let why = `e^(ln ${NS}) = ${NS}${rIsOne(front) ? '' : `, and the ${frontS} in front of e multiplies it`}.`;
      if (!rIsOne(front)) {
        const asPower = rIsInt(front) && front[0] > 1 ? ppToRat(ppPow(ppOfRat(Nn), front)) : null;
        if (asPower && rEq(v, asPower)) why = `The ${frontS} is in front of e, not in front of ln, so it multiplies: ${frontS} × ${NS}. It is not a power.`;
        else if (rEq(v, Nn)) why = `That is e^(ln ${NS}). Now ${rEq(front, rat(-1, 1)) ? 'put the minus sign in front' : `multiply by ${frontS}`}.`;
        else if (rEq(v, rNeg(result))) why = 'Right size, wrong sign. The sign in front of e stays where it is.';
      } else if (rEq(v, rNeg(Nn))) why = 'e to any power is positive, so the answer cannot be negative.';
      return { ok: false, marks: { v: false }, why };
    },
    good: `Right: the value is ${ratText(result)}.`,
    lines: [rIsOne(front) ? `e^{\\ln ${NT}} = ${NT}` :rEq(front, rat(-1, 1)) ? `-e^{\\ln ${NT}} = ${ratLatex(result)}` : `${frontT}e^{\\ln ${NT}} = ${frontT} \\times ${NT} = ${ratLatex(result)}`],
  });
  if (Math.abs(Nn[0]) > 9999 || Nn[1] > 9999) problems.push('the value is too big to type');
  if (front[0] === 0) problems.push('front must not be 0');
  return {
    mode: 'exact', kind: 'value', questionLatex, stages, answerLatex: ratLatex(result), checkLines: [], problems,
    head: 'Find the exact value', register: 'No calculator: give the exact value', value: result, numbers: [],
  };
}

function lnpowModel(item) {
  const k = R(item.power);
  const problems = [];
  if (k[0] === 0) problems.push('the power must not be 0');
  const kT = ratLatex(k);
  const kS = ratText(k);
  const plainShape = rIsInt(k) && k[0] >= 1;
  const abs = rAbs(k);
  let inner;
  if (plainShape) inner = k[0] === 1 ? 'e' : `e^{${k[0]}}`;
  else {
    let pos;
    if (rIsInt(abs)) pos = abs[0] === 1 ? 'e' : `e^{${abs[0]}}`;
    else if (abs[1] === 2) pos = abs[0] === 1 ? '\\sqrt{e}' : `\\sqrt{e^{${abs[0]}}}`;
    else pos = abs[0] === 1 ? `\\sqrt[${abs[1]}]{e}` : `\\sqrt[${abs[1]}]{e^{${abs[0]}}}`;
    inner = k[0] < 0 ? `\\dfrac{1}{${pos}}` : pos;
  }
  const questionLatex = `\\ln ${inner}`;
  const stages = [];
  if (!plainShape) {
    stages.push({
      id: 'rewrite',
      label: 'A power of e',
      kind: 'typed',
      title: 'Write it as a single power of e.',
      sub: `${k[0] < 0 ? 'One over a power is a negative power. ' : ''}${rIsInt(abs) ? '' : 'A root is a fractional power. '}A fraction is typed like 1/2.`,
      show: [questionLatex],
      rows: [[{ tex: `${inner} = e` }, { box: 'k', width: 'w-20', sup: true }]],
      fill: { k: typedForm(k) },
      judge(vals) {
        const v = parseRational(vals.k);
        if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
        if (rEq(v, k)) return { ok: true, marks: { k: true } };
        let why = 'Ask: what power of e is this?';
        if (rEq(v, rNeg(k))) why = k[0] < 0 ? `One over a power is a NEGATIVE power: 1/e^n = e^(${MINUS}n).` : 'Check the sign: nothing here is one over a power.';
        else if (!rIsInt(abs) && rEq(rAbs(v), rDiv(ONE, abs))) why = `A ${abs[1] === 2 ? 'square' : abs[1] === 3 ? 'cube' : `${abs[1]}th`} root is the power 1/${abs[1]}, not ${abs[1]}.`;
        return { ok: false, marks: { k: false }, why };
      },
      good: `Right: it is e^${powWrap(kS)}.`,
      lines: [`${questionLatex} = \\ln e^{${kT}}`],
    });
  }
  stages.push({
    id: 'value',
    label: 'Undo',
    kind: 'typed',
    title: 'ln and e undo each other.',
    sub: 'ln e^n = n: it asks what power of e gives e^n.',
    show: plainShape ? [questionLatex] : [],
    rows: [[{ tex: `\\ln e^{${kT}} =` }, { box: 'v', width: 'w-24' }]],
    fill: { v: typedForm(k) },
    judge(vals) {
      const v = parseRational(vals.v);
      if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
      if (rEq(v, k)) return { ok: true, marks: { v: true } };
      let why = 'ln asks: e to what power? For a power of e, the answer is the power itself: ln e^n = n.';
      if (rEq(v, ONE) && !rIsOne(k)) why = `ln e is 1, but this is ln of e^${powWrap(kS)}. The power comes down in front: it is the power times ln e.`;
      else if (rEq(v, rNeg(k))) why = 'Right size, wrong sign. The power comes down exactly as it is.';
      return { ok: false, marks: { v: false }, why };
    },
    good: `Right: ln e^${powWrap(kS)} = ${kS}.`,
    lines: [`\\ln e^{${kT}} = ${kT}`],
  });
  if (k[1] > 4) problems.push('keep the power to halves, thirds and quarters');
  return {
    mode: 'exact', kind: 'lnpow', questionLatex, stages, answerLatex: kT, checkLines: [], problems,
    head: 'Find the exact value', register: 'No calculator: give the exact value', value: k, numbers: [],
  };
}

function solveModel(item) {
  const k = R(item.k ?? 1);
  const rhs = R(item.rhs);
  const dec = /\./.test(String(item.rhs));
  const rhsT = numTex(rhs, dec);
  const rhsS = numS(rhs, dec);
  const kT = ratLatex(k);
  const kS = ratText(k);
  const problems = [];
  const stages = [];
  const minusOne = rEq(k, rat(-1, 1));
  const coefT = rIsOne(k) ? '' : minusOne ? '-' : kT;

  if (item.form === 'ln') {
    const kx = `${coefT}x`;
    const kxS = txt(`${rIsOne(k) ? '' : minusOne ? '-' : kS}x`);
    const x = rDiv(rhs, k);
    const xT = numTex(x, dec || decOf(x) !== null);
    const questionLatex = `\\ln e^{${kx}} = ${rhsT}`;
    stages.push({
      id: 'simplify',
      label: 'Undo',
      kind: 'choice',
      columns: 2,
      title: 'Simplify the left-hand side.',
      sub: 'ln and e undo each other: ln e^n = n.',
      show: [questionLatex],
      options: pickOptions({ id: 'right', tex: `${kx} = ${rhsT}` }, [
        { id: 'keptE', tex: `e^{${kx}} = ${rhsT}`, why: 'ln has undone the e, so no e is left: ln e^n = n.' },
        { id: 'lnx', tex: `${coefT}\\ln x = ${rhsT}`, why: `x is up in the power of e, not inside the log on its own. ln e^(${kxS}) is just the power, ${kxS}.` },
        rIsOne(k) ? { id: 'ex', tex: `ex = ${rhsT}`, why: 'ln e^x is not e × x. The log and the power of e cancel completely, leaving x.' }
          : { id: 'pow', tex: `x^{${kT}} = ${rhsT}`, why: `The ${kS} multiplies x in the power: ln e^(${kxS}) = ${kxS}. It does not become a power of x.` },
      ], `${item.id}simplify`),
      good: rIsOne(k) ? 'Right, and that is the answer.' : `Right: the power comes straight down, so ${kxS} = ${rhsS}.`,
      lines: [`${kx} = ${rhsT}`],
    });
    if (!rIsOne(k)) {
      stages.push({
        id: 'roots',
        label: 'Solve',
        kind: 'typed',
        title: `Solve ${kxS} = ${rhsS}.`,
        sub: 'A decimal or a fraction such as 9/2 is fine.',
        rows: [[{ tex: 'x =' }, { box: 'r1', width: 'w-24' }]],
        fill: { r1: typedForm(x, true) },
        judge(vals) {
          const v = parseRational(vals.r1);
          if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
          if (rEq(v, x)) return { ok: true, marks: { r1: true } };
          let why = `Divide both sides by ${kS}.`;
          if (rEq(v, rMul(rhs, k))) why = `Divide by ${kS}, do not multiply.`;
          else if (rEq(v, rhs)) why = `That is ${kxS}. Divide by ${kS} to get x.`;
          else if (rEq(v, rNeg(x))) why = 'Right size, wrong sign.';
          return { ok: false, marks: { r1: false }, why };
        },
        good: `Right: x = ${numS(x, true)}.`,
        lines: [`x = ${xT}`],
      });
    }
    return {
      mode: 'exact', kind: 'solve', questionLatex, stages, answerLatex: `x = ${xT}`, problems,
      checkLines: [{ text: 'Check:', tex: `${rIsOne(k) ? '' : `\\ln e^{${kT} \\times ${xT}} = `}\\ln e^{${rhsT}} = ${rhsT}\\ \\checkmark` }],
      head: 'Solve', register: 'No calculator: give the exact value of x', value: x, numbers: [],
    };
  }

  // e^(k ln x) = rhs  →  x^k = rhs
  if (rhs[0] <= 0) problems.push('a power of e is never zero or negative, so the right-hand side must be positive');
  const safe = rhs[0] > 0 ? rhs : ONE;
  const x0 = ppToRat(ppPow(ppOfRat(safe), rDiv(ONE, k)));
  if (!x0) problems.push('x does not come out as a whole number or a fraction');
  const X = x0 || ONE;
  const even = rIsInt(k) && k[0] % 2 === 0;
  const lhsT = `e^{${coefT}\\ln x}`;
  const questionLatex = `${lhsT} = ${rhsT}`;
  const absK = rAbs(k);
  let simp;
  if (rIsOne(k)) simp = 'x';
  else if (k[0] < 0) simp = rIsOne(absK) ? '\\dfrac{1}{x}' : `\\dfrac{1}{x^{${ratLatex(absK)}}}`;
  else if (!rIsInt(k) && k[0] === 1 && k[1] === 2) simp = '\\sqrt{x}';
  else simp = `x^{${kT}}`;
  const simpS = rIsOne(k) ? 'x' : k[0] < 0 ? (rIsOne(absK) ? '1/x' : `1/x^${powWrap(ratText(absK))}`) : (!rIsInt(k) && k[0] === 1 && k[1] === 2 ? '√x' : `x^${powWrap(kS)}`);
  stages.push({
    id: 'simplify',
    label: 'Undo',
    kind: 'choice',
    columns: 2,
    title: 'Simplify the left-hand side.',
    sub: rIsOne(k) ? 'e to the power and ln are inverses: e^(ln a) = a.' : 'Move the number in front of ln inside first, as a power. Then e and ln undo each other.',
    show: [questionLatex],
    options: pickOptions({ id: 'right', tex: `${simp} = ${rhsT}` }, rIsOne(k)
      ? [
        { id: 'lnx', tex: `\\ln x = ${rhsT}`, why: 'e to the power has undone the ln, so none of the ln is left: e^(ln x) = x.' },
        { id: 'ex', tex: `e^{x} = ${rhsT}`, why: 'The ln has gone, and so has the e: e^(ln x) is x, not e^x.' },
        { id: 'times', tex: `ex = ${rhsT}`, why: 'e^(ln x) is not e × x. The power of e and the log cancel completely, leaving x.' },
      ]
      : [
        { id: 'mult', tex: `${coefT}x = ${rhsT}`, why: `${kS === `${MINUS}1` ? MINUS : `${kS} `}ln x is ln of x to the power ${kS}. The number in front becomes a POWER of x, not a multiplier.` },
        { id: 'ignore', tex: `x = ${rhsT}`, why: `The ${minusOne ? 'minus sign' : kS} in front of ln x cannot be ignored. Move it inside the log as a power first.` },
        { id: 'ek', tex: `e^{${kT}}x = ${rhsT}`, why: 'A power of a product is not a product of powers here: e^(a × b) is not e^a × b. Move the number in front of ln inside the log first.' },
      ], `${item.id}simplify`),
    good: rIsOne(k) ? 'Right, and that is the answer.' : `Right: the left-hand side is e^(ln ${simpS}), which is ${simpS}.`,
    lines: rIsOne(k) ? [`x = ${rhsT}`] : [`e^{\\ln x^{${kT}}} = ${rhsT}`, `${simp} = ${rhsT}`],
  });
  let answerLatex = `x = ${rhsT}`;
  const checkLines = [];
  if (!rIsOne(k)) {
    const xT = ratLatex(X);
    const xS = ratText(X);
    if (even) {
      const neg = rNeg(X);
      stages.push({
        id: 'roots',
        label: 'Solve',
        kind: 'typed',
        title: `Solve ${simpS} = ${rhsS}.`,
        sub: 'Give both values, in either order. You will decide which can be used in a moment.',
        rows: [[{ tex: 'x =' }, { box: 'r1', width: 'w-20' }, { tex: '\\text{or}\\quad x =' }, { box: 'r2', width: 'w-20' }]],
        fill: { r1: typedForm(X), r2: typedForm(neg) },
        judge(vals) {
          const v1 = parseRational(vals.r1);
          const v2 = parseRational(vals.r2);
          if (!v1 || !v2) return { ok: false, invalid: true, why: 'Give both values of x.' };
          if ((rEq(v1, X) && rEq(v2, neg)) || (rEq(v1, neg) && rEq(v2, X))) return { ok: true, marks: { r1: true, r2: true } };
          const isRoot = (v) => rEq(v, X) || rEq(v, neg);
          const marks = { r1: isRoot(v1), r2: isRoot(v2) && !rEq(v1, v2) };
          let why = `Which numbers, raised to the power ${kS}, make ${rhsS}?`;
          if (rEq(v1, v2) && isRoot(v1)) why = `An even power has two roots: ${xS} and ${MINUS}${xS} both give ${rhsS}. Type both, then decide which can be used.`;
          else if (rEq(v1, rDiv(rhs, k)) || rEq(v2, rDiv(rhs, k))) why = `${simpS} = ${rhsS} is not ${kS}x = ${rhsS}. Take the root instead of dividing.`;
          return { ok: false, marks, why };
        },
        good: `Right: x = ${xS} or x = ${ratText(neg)}. Both square to ${rhsS}.`,
        lines: [`x = ${xT} \\ \\text{ or } \\ x = ${ratLatex(neg)}`],
      });
      stages.push({
        id: 'keep',
        label: 'Keep or reject',
        kind: 'keep',
        tries: 1,
        title: 'The original equation has ln x in it. Which values can go into ln x?',
        sub: 'Decide for each one: keep it or reject it.',
        rows: [
          { key: 'r1', tex: `x = ${xT}`, keep: true, why: `${xS} is positive, so ln ${xS} exists and x = ${xS} works. Keep it.` },
          { key: 'r2', tex: `x = ${ratLatex(neg)}`, keep: false, why: `ln(${MINUS}${xS}) does not exist, so x = ${MINUS}${xS} cannot be put into the original equation. Reject it.` },
        ],
        good: `Right. ln x needs x to be positive, so ${MINUS}${xS} is rejected.`,
        lines: [{ text: `ln(${MINUS}${xS}) does not exist, so reject x = ${MINUS}${xS}.` }, `x = ${xT}`],
      });
    } else {
      stages.push({
        id: 'roots',
        label: 'Solve',
        kind: 'typed',
        title: `Solve ${simpS} = ${rhsS}.`,
        sub: 'A fraction is typed like 1/8.',
        rows: [[{ tex: 'x =' }, { box: 'r1', width: 'w-24' }]],
        fill: { r1: typedForm(X) },
        judge(vals) {
          const v = parseRational(vals.r1);
          if (!v) return { ok: false, invalid: true, why: VALUE_HINT };
          if (rEq(v, X)) return { ok: true, marks: { r1: true } };
          let why = `Which number, raised to the power ${kS}, makes ${rhsS}?`;
          if (k[0] < 0 && rEq(v, rhs)) why = `That is the value of ${simpS}, not of x. Turn both sides upside down.`;
          else if (rEq(v, rDiv(rhs, k))) why = `${simpS} = ${rhsS} is not ${kS}x = ${rhsS}. Take the root instead of dividing.`;
          else if (!rIsInt(k) && rEq(v, ppToRat(ppPow(ppOfRat(safe), k)) || ZERO)) why = `${simpS} = ${rhsS}, so x is ${rhsS} raised to the power ${ratText(rDiv(ONE, k))}, not the other way round.`;
          else if (rEq(v, rNeg(X))) why = 'ln x needs x to be positive, so a negative value cannot be the answer.';
          return { ok: false, marks: { r1: false }, why };
        },
        good: `Right: x = ${xS}.`,
        lines: [`x = ${xT}`],
      });
    }
    answerLatex = `x = ${xT}`;
    checkLines.push({ text: 'Check:', tex: `e^{${coefT}\\ln ${xT}} = e^{\\ln ${rhsT}} = ${rhsT}\\ \\checkmark` });
  } else {
    checkLines.push({ text: 'Check:', tex: `e^{\\ln ${rhsT}} = ${rhsT}\\ \\checkmark` });
  }
  if (Math.abs(X[0]) > 9999 || X[1] > 9999) problems.push('the value of x is too big to type');
  return {
    mode: 'exact', kind: 'solve', questionLatex, stages, answerLatex, checkLines, problems,
    head: 'Solve', register: 'No calculator: give the exact value of x', value: X, numbers: [],
  };
}

export function exactModel(item) {
  if (item.kind === 'value') return valueModel(item);
  if (item.kind === 'lnpow') return lnpowModel(item);
  if (item.kind === 'solve') return solveModel(item);
  throw new Error(`unknown kind "${item.kind}"`);
}

// =================================================================== shared

export function modelOf(mode, item) {
  if (mode === 'logs') return logsModel(item);
  if (mode === 'quad') return quadModel(item);
  if (mode === 'exact') return exactModel(item);
  throw new Error(`unknown mode "${mode}"`);
}

/** The finished working: the question, then what every stage adds. */
export function workingOf(model, upTo = Infinity) {
  const lines = [model.questionLatex];
  if (model.givenTex) lines.push({ text: 'Let', tex: model.givenTex });
  model.stages.forEach((s, i) => { if (i < upTo) lines.push(...(s.lines || [])); });
  return lines;
}

// ------------------------------------------------------------------ validation

const isInt = Number.isInteger;

/** A value whose n-th significant figure sits on a rounding boundary is a bad question. */
function onBoundary(v, n) {
  if (!Number.isFinite(v) || v === 0) return false;
  const mag = 10 ** (n - 1 - Math.floor(Math.log10(Math.abs(v))));
  const frac = Math.abs(v * mag) % 1;
  return Math.abs(frac - 0.5) < 2e-3;
}

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
      if (!isInt(item.level) || item.level < 1) out.push(`${at}: level must be a whole number from 1`);
      else if (item.level < lastLevel) out.push(`${at}: level ${item.level} comes after level ${lastLevel} — levels only climb`);
      else lastLevel = item.level;
    }
    const okBase = (b0) => isE(b0) || (isInt(b0) && b0 >= 2 && b0 <= 20);
    const okLin = (l) => Array.isArray(l) && l.length === 2 && l.every(isInt) && l[0] !== 0 && Math.abs(l[0]) <= 9 && Math.abs(l[1]) <= 9;
    let model;
    try {
      if (mode === 'logs') {
        if (!LOGS_KINDS.includes(item.kind)) { out.push(`${at}: kind "${item.kind}" — ${LOGS_KINDS.join(', ')}`); continue; }
        if (item.give !== undefined && !['3sf', 'exact'].includes(item.give)) { out.push(`${at}: give must be '3sf' or 'exact'`); continue; }
        if (item.kind === 'exp') {
          if (!okBase(item.base)) { out.push(`${at}: base must be 'e' or a whole number from 2 to 20`); continue; }
          if (!okLin(item.power)) { out.push(`${at}: power must be [p, q] whole numbers with p not 0`); continue; }
          if (rSign(R(item.coef ?? 1)) === 0) { out.push(`${at}: coef must not be 0`); continue; }
        } else if (item.kind === 'exp2') {
          const okSide = (sd) => !!sd && isInt(sd.base) && sd.base >= 2 && sd.base <= 20 && okLin(sd.power);
          if (!okSide(item.left) || !okSide(item.right)) { out.push(`${at}: each side needs { base: a whole number from 2 to 20, power: [p, q] }`); continue; }
          if (item.give === 'exact') out.push(`${at}: a question with two bases is answered to 3 significant figures`);
        } else {
          if (!okLin(item.arg)) { out.push(`${at}: arg must be [p, q] whole numbers with p not 0`); continue; }
          if (rSign(R(item.coef ?? 1)) === 0) { out.push(`${at}: coef must not be 0`); continue; }
        }
      } else if (mode === 'quad') {
        if (!(isE(item.base) || (isInt(item.base) && item.base >= 2 && item.base <= 9))) { out.push(`${at}: base must be 'e' or a whole number from 2 to 9`); continue; }
        if (!Array.isArray(item.lhs) || !Array.isArray(item.rhs) || !item.lhs.length || !item.rhs.length) { out.push(`${at}: needs lhs and rhs lists of terms`); continue; }
        let bad = false;
        for (const t of [...item.lhs, ...item.rhs]) {
          if (!Array.isArray(t)) continue;
          if (t.length < 2 || !isInt(t[1]) || ![1, 2, -1].includes(t[1]) || (t[2] !== undefined && (!isInt(t[2]) || Math.abs(t[2]) > 3))) {
            out.push(`${at}: a power term is [c, m, k] with m = 1, 2 or -1 and a small whole-number shift k`); bad = true;
          }
        }
        if (bad) continue;
        if (![...item.lhs, ...item.rhs].some(Array.isArray)) { out.push(`${at}: there is no power in the equation`); continue; }
      } else {
        if (!EXACT_KINDS.includes(item.kind)) { out.push(`${at}: kind "${item.kind}" — ${EXACT_KINDS.join(', ')}`); continue; }
        if (item.kind === 'value' && (!Array.isArray(item.terms) || !item.terms.length || item.terms.some((t) => !Array.isArray(t) || t.length !== 2))) { out.push(`${at}: terms must be a list of [k, a] pairs`); continue; }
        if (item.kind === 'solve') {
          if (!['exp', 'ln'].includes(item.form)) { out.push(`${at}: form must be 'exp' or 'ln'`); continue; }
          if (rSign(R(item.k ?? 1)) === 0) { out.push(`${at}: k must not be 0`); continue; }
        }
      }
      model = modelOf(mode, item);
    } catch (err) {
      out.push(`${at}: ${err.message}`);
      continue;
    }
    for (const p of model.problems || []) out.push(`${at}: ${p}`);
    if (!model.stages.length) continue;
    // Every choice stage: exactly one right answer, no two options that read
    // the same, and no wrong option that is secretly right.
    for (const st of model.stages) {
      if (st.kind !== 'choice') continue;
      const right = st.options.filter((o) => o.ok);
      if (st.id === 'move') { if (!right.length) out.push(`${at}: no first move is marked right`); }
      else if (right.length !== 1) out.push(`${at}: stage ${st.id} has ${right.length} right answers`);
      if (st.options.length < 3) out.push(`${at}: stage ${st.id} has only ${st.options.length} options`);
      const faces = st.options.map((o) => o.tex || o.text);
      if (new Set(faces).size !== faces.length) out.push(`${at}: stage ${st.id} has two options that read the same`);
      const rv = right[0]?.v;
      if (Number.isFinite(rv)) {
        for (const o of st.options) if (!o.ok && Number.isFinite(o.v) && Math.abs(o.v - rv) <= 1e-6 * Math.max(1, Math.abs(rv))) out.push(`${at}: stage ${st.id}: the wrong option "${o.id}" has the same value as the right one`);
      }
      for (const o of st.options) if (!o.ok && !o.why) out.push(`${at}: stage ${st.id}: option "${o.id}" has nothing to say`);
    }
    // Every typed stage accepts its own filled-in answer.
    for (const st of model.stages) {
      if (st.kind !== 'typed') continue;
      const res = st.judge(st.fill);
      if (!res.ok) out.push(`${at}: stage ${st.id} does not accept its own answer (${JSON.stringify(st.fill)})`);
    }
    // Numbers a student has to type.
    for (const v of model.numbers || []) {
      if (!Number.isFinite(v)) { out.push(`${at}: an answer is not a number`); continue; }
      if (Math.abs(v) >= 1000 || (v !== 0 && Math.abs(v) < 0.001)) out.push(`${at}: the answer ${v} is too big or too small to give to 3 significant figures comfortably`);
      if (onBoundary(v, 3)) out.push(`${at}: the answer ${v} sits on a rounding boundary at the third significant figure`);
    }
    if (mode === 'logs' && Number.isFinite(model.L) && !model.plain && model.give === '3sf' && onBoundary(model.L, 4)) out.push(`${at}: the working value ${model.L} sits on a rounding boundary at the fourth figure`);
  }
  return out;
}
