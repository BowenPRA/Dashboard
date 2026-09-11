// src/utils/formula.js
//
// The model behind the Isolate It task (src/tasks/Rearrange.jsx): a physics
// FORMULA — an equation whose sides are sums of products of powers — and the
// legal both-sides moves you can make on it to change its subject.
//
// It is deliberately separate from the component, and from the linear-equation
// engine the Balance task uses, because a formula is a different object: the
// letters are not one unknown and some numbers, they are a dozen quantities,
// and the moves that matter are multiply, divide, square and square-root rather
// than add and subtract. `F = m v^2 / r` solved for v is × r, ÷ m, √ — three
// moves and no arithmetic — and that is the whole skill this engine exists to
// make visible.
//
//   A SIDE      is a list of TERMS (a sum).
//   A TERM      is a product: an exact rational coefficient, a power of π, and
//               a list of FACTORS, each a base raised to an exact rational
//               exponent. `m v^2 / r` is coef 1, π^0, [m^1, v^2, r^-1].
//   A BASE      is a symbol (`v`, `F_c`, `theta`) or a GROUP — a whole side in
//               brackets, `(T + m g)`, which is how a sum survives being
//               multiplied by r or put under a root without being expanded.
//
// Everything is derived from the authored formula string: the legal chips, the
// hint, the target step count, the rendering of every line of working, the
// substituted numeric expression and the answer. There is no answer key, so
// nothing can drift, and `checkRearrangeItems` (run by npm run validate)
// refuses an item the taught strategy cannot finish.
//
// Every function here is pure and returns NEW objects, which is what makes undo
// and the step history trivial. Exact rationals come from linearEquation.js.

import { fr, add, mul, div, neg, isZero, isOne, frText } from './linearEquation.js';

// ------------------------------------------------------------------ symbols

/** Greek letters an author may spell out; rendered with the KaTeX command. */
const GREEK = new Set([
  'alpha', 'beta', 'gamma', 'delta', 'theta', 'lambda', 'mu', 'rho', 'sigma',
  'tau', 'phi', 'omega', 'Delta', 'Omega',
]);

/** How a symbol is written in KaTeX: `F_c` → F_{c}, `theta` → \theta. */
export function symbolLatex(name) {
  const [base, sub] = String(name).split('_');
  const b = GREEK.has(base) ? `\\${base}` : base.length === 1 ? base : `\\text{${base}}`;
  return sub ? `${b}_{${sub}}` : b;
}

// ------------------------------------------------------------------ building blocks

const symBase = (name) => ({ sym: name });
const groupBase = (side) => ({ group: side });

/** A term: exact coefficient, integer power of π, ordered factor list. */
export const term = (coef = fr(1), pi = 0, factors = []) => ({ coef, pi, factors });
export const factor = (base, exp = fr(1)) => ({ base, exp });

/** The canonical text of a base — what decides whether two factors are "the same". */
function baseKey(base) {
  if (base.sym !== undefined) return `s:${base.sym}`;
  return `g:${canonicalSide(base.group)}`;
}

/** A term's identity for like-term collection: everything but the coefficient. */
function termKey(t) {
  const fs = t.factors.map((f) => `${baseKey(f.base)}^${frText(f.exp)}`).sort();
  return `pi${t.pi}|${fs.join('*')}`;
}

/** Order-independent text of a side; only used for identity, never shown. */
function canonicalSide(side) {
  return side.map((t) => `${frText(t.coef)}·${termKey(t)}`).sort().join(' + ');
}

const sameBase = (a, b) => baseKey(a) === baseKey(b);

/**
 * Multiply two terms. Factors merge by base, so v × v^2 becomes v^3 and r × r^-1
 * disappears; a base that was not there yet is appended, which keeps `F r`
 * reading in the order the student built it.
 */
export function mulTerm(a, b) {
  const factors = a.factors.map((f) => ({ ...f }));
  for (const g of b.factors) {
    const at = factors.findIndex((f) => sameBase(f.base, g.base));
    if (at === -1) factors.push({ ...g });
    else factors[at] = { ...factors[at], exp: add(factors[at].exp, g.exp) };
  }
  return term(mul(a.coef, b.coef), a.pi + b.pi, factors.filter((f) => !isZero(f.exp)));
}

/** The reciprocal of a term: every exponent negated, coefficient inverted. */
export function invTerm(t) {
  if (isZero(t.coef)) throw new Error('cannot divide by zero');
  return term(div(fr(1), t.coef), -t.pi, t.factors.map((f) => ({ ...f, exp: neg(f.exp) })));
}

const isPerfectSquare = (n) => {
  if (n < 0) return false;
  const r = Math.round(Math.sqrt(n));
  return r * r === n;
};

/**
 * Raise a term to a rational power. Integer powers always work. A half power
 * (the square root) needs a coefficient whose top and bottom are both perfect
 * squares and an even power of π — √(4π²) is 2π, √(2π) is a mess no textbook
 * would print, and a student who reaches it has skipped a divide.
 */
export function powTerm(t, e) {
  if (e.d === 1) {
    const k = e.n;
    let coef = fr(1);
    const mag = k < 0 ? invTerm(t).coef : t.coef;
    for (let i = 0; i < Math.abs(k); i++) coef = mul(coef, mag);
    return term(coef, t.pi * k, t.factors.map((f) => ({ ...f, exp: mul(f.exp, e) })).filter((f) => !isZero(f.exp)));
  }
  if (e.d === 2 && e.n === 1) {
    if (t.coef.n < 0) throw new Error('negative under the root');
    if (!isPerfectSquare(t.coef.n) || !isPerfectSquare(t.coef.d)) throw new Error('coefficient is not a perfect square');
    if (t.pi % 2 !== 0) throw new Error('odd power of pi under the root');
    return term(fr(Math.round(Math.sqrt(t.coef.n)), Math.round(Math.sqrt(t.coef.d))), t.pi / 2,
      t.factors.map((f) => ({ ...f, exp: mul(f.exp, e) })));
  }
  throw new Error(`unsupported power ${frText(e)}`);
}

/** True when the term is exactly one bare symbol: coefficient 1, no π, `sym^1`. */
export function isBareSymbol(t, sym) {
  return isOne(t.coef) && t.pi === 0 && t.factors.length === 1
    && t.factors[0].base.sym === sym && isOne(t.factors[0].exp);
}

/** Does this side mention the symbol anywhere, brackets included? */
export function contains(side, sym) {
  return side.some((t) => t.factors.some((f) => (f.base.sym !== undefined ? f.base.sym === sym : contains(f.base.group, sym))));
}

/** Every symbol a side mentions, in first-seen order. */
export function symbolsOf(side, out = []) {
  for (const t of side) for (const f of t.factors) {
    if (f.base.sym !== undefined) { if (!out.includes(f.base.sym)) out.push(f.base.sym); }
    else symbolsOf(f.base.group, out);
  }
  return out;
}

// ------------------------------------------------------------------ sides

/** Add a term to a side, collecting like terms and dropping what cancels. */
export function addTerm(side, t) {
  const out = side.map((s) => ({ ...s }));
  const key = termKey(t);
  const at = out.findIndex((s) => termKey(s) === key);
  if (at === -1) out.push(t);
  else out[at] = { ...out[at], coef: add(out[at].coef, t.coef) };
  return out.filter((s) => !isZero(s.coef));
}

/** A side as ONE term — itself if it has one, else the whole sum in brackets. */
function asTerm(side) {
  if (side.length === 1) return side[0];
  if (side.length === 0) return term(fr(0));
  return term(fr(1), 0, [factor(groupBase(side))]);
}

/** Multiply a whole side by a term. A sum goes into brackets rather than being expanded. */
export function mulSide(side, t) {
  if (side.length === 0) return [];
  return [mulTerm(asTerm(side), t)];
}

export function powSide(side, e) {
  if (side.length === 0) return [];
  return [powTerm(asTerm(side), e)];
}

/**
 * Tidy a side: a bracket that holds a single term is opened out, and a
 * bracket raised to a whole power around a single term is multiplied through.
 * Applied after every move so `(m g)` never appears on screen.
 */
function tidySide(side) {
  const out = [];
  for (const t of side) {
    let cur = term(t.coef, t.pi, []);
    for (const f of t.factors) {
      if (f.base.group !== undefined) {
        const inner = tidySide(f.base.group);
        if (inner.length === 1) { cur = mulTerm(cur, powTerm(inner[0], f.exp)); continue; }
        cur = mulTerm(cur, term(fr(1), 0, [factor(groupBase(inner), f.exp)]));
      } else {
        cur = mulTerm(cur, term(fr(1), 0, [{ ...f }]));
      }
    }
    out.push(cur);
  }
  return out.reduce((acc, t) => addTerm(acc, t), []);
}

// ------------------------------------------------------------------ parsing

/**
 * Tokenise an authored formula: numbers, identifiers (`F_c`, `theta`), the
 * words `pi` and `sqrt`, and the punctuation `( ) ^ / * + - = { }`.
 */
function tokenize(src) {
  const out = [];
  const s = String(src).replace(/[−–]/g, '-').replace(/²/g, '^2').replace(/³/g, '^3').replace(/π/g, 'pi').replace(/√/g, 'sqrt');
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      out.push({ t: 'num', v: s.slice(i, j) }); i = j; continue;
    }
    if (/[A-Za-z]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[A-Za-z0-9]/.test(s[j])) j++;
      if (s[j] === '_') { j++; while (j < s.length && /[A-Za-z0-9]/.test(s[j])) j++; }
      const word = s.slice(i, j);
      out.push({ t: word === 'pi' || word === 'sqrt' ? word : 'id', v: word }); i = j; continue;
    }
    if ('()^/*+-={}'.includes(c)) { out.push({ t: c }); i++; continue; }
    throw new Error(`unexpected character "${c}"`);
  }
  return out;
}

/** Parse "12", "0.5" or "3/2" written after a caret into an exact exponent. */
function parseExponent(tokens, pos) {
  // ^2   ^-1   ^(1/2)   ^{3}   ^{1/2}
  let close = null;
  if (tokens[pos]?.t === '(' || tokens[pos]?.t === '{') { close = tokens[pos].t === '(' ? ')' : '}'; pos++; }
  let sign = 1;
  if (tokens[pos]?.t === '-') { sign = -1; pos++; }
  if (tokens[pos]?.t !== 'num') throw new Error('an exponent needs a number');
  const n = tokens[pos].v; pos++;
  let d = '1';
  // A fraction exponent only inside its own brackets — `v^2 / r` is v² divided by r.
  if (close && tokens[pos]?.t === '/') { pos++; if (tokens[pos]?.t !== 'num') throw new Error('bad exponent'); d = tokens[pos].v; pos++; }
  if (close) { if (tokens[pos]?.t !== close) throw new Error(`missing ${close}`); pos++; }
  if (n.includes('.') || d.includes('.')) throw new Error('exponents must be whole or a fraction like 1/2');
  return { exp: fr(sign * parseInt(n, 10), parseInt(d, 10)), pos };
}

/** A number token as an exact fraction: "0.5" → 1/2. */
const numFr = (v) => fr(Number(v));

/**
 * Parse a formula string into { left, right }.
 *
 *   F = m v^2 / r          T + m g = m v^2 / r
 *   g = G M / r^2          v = sqrt(G M / r)
 *   T = 2 pi sqrt(r^3 / (G M))
 *
 * Multiplication is a space (or *), `/` divides by the ONE factor or bracket
 * that follows it, `^` takes a whole number or a bracketed fraction, `sqrt(…)`
 * halves every exponent inside, and `+`/`-` split a side into terms at the top
 * level only. A bracket holding a single product is simply multiplied in; one
 * holding a sum becomes a group.
 */
export function parseFormula(src) {
  const tokens = tokenize(src);
  let pos = 0;
  const peek = () => tokens[pos];
  const eat = () => tokens[pos++];

  function parseSide(stopAt) {
    const terms = [];
    let first = true;
    while (pos < tokens.length && !stopAt.includes(peek().t)) {
      let sign = 1;
      if (peek().t === '+') { eat(); }
      else if (peek().t === '-') { eat(); sign = -1; }
      else if (!first) throw new Error('terms must be joined with + or -');
      first = false;
      let t = parseProduct(stopAt);
      if (sign < 0) t = term(neg(t.coef), t.pi, t.factors);
      terms.push(t);
    }
    if (!terms.length) throw new Error('a side cannot be empty');
    return tidySide(terms);
  }

  function parseProduct(stopAt) {
    let t = term(fr(1));
    let any = false;
    while (pos < tokens.length && !stopAt.includes(peek().t) && peek().t !== '+' && peek().t !== '-') {
      if (peek().t === '*') { eat(); continue; }
      let divide = false;
      if (peek().t === '/') { eat(); divide = true; }
      let item = parseItem();
      if (peek()?.t === '^') { eat(); const r = parseExponent(tokens, pos); pos = r.pos; item = powTerm(item, r.exp); }
      if (divide) item = invTerm(item);
      t = mulTerm(t, item);
      any = true;
    }
    if (!any) throw new Error('expected a term');
    return t;
  }

  function parseItem() {
    const tk = eat();
    if (!tk) throw new Error('unexpected end');
    if (tk.t === 'num') return term(numFr(tk.v));
    if (tk.t === 'pi') return term(fr(1), 1);
    if (tk.t === 'id') return term(fr(1), 0, [factor(symBase(tk.v))]);
    if (tk.t === 'sqrt') {
      if (peek()?.t !== '(') throw new Error('sqrt needs brackets');
      eat();
      const inner = parseSide([')']);
      if (peek()?.t !== ')') throw new Error('missing )');
      eat();
      return powTerm(asTerm(inner), fr(1, 2));
    }
    if (tk.t === '(') {
      const inner = parseSide([')']);
      if (peek()?.t !== ')') throw new Error('missing )');
      eat();
      return asTerm(inner);
    }
    throw new Error(`unexpected "${tk.t}"`);
  }

  const left = parseSide(['=']);
  if (peek()?.t !== '=') throw new Error('a formula needs an =');
  eat();
  const right = parseSide([]);
  return { left, right };
}

// ------------------------------------------------------------------ rendering

/** "6.77" or "6.67 \times 10^{-11}", to `sig` significant figures. */
export function fmtNumber(v, sig = 3) {
  if (!Number.isFinite(v)) return '?';
  if (v === 0) return '0';
  const a = Math.abs(v);
  const e = Math.floor(Math.log10(a));
  if (e >= 5 || e <= -3) {
    let m = v / 10 ** e;
    m = Number(m.toPrecision(sig));
    let ee = e;
    if (Math.abs(m) >= 10) { m = Number((m / 10).toPrecision(sig)); ee += 1; }
    return `${m} \\times 10^{${ee}}`;
  }
  return String(Number(v.toPrecision(sig)));
}

/** "6.77" or "6.67e-11" — plain text for inputs and prose. */
export function fmtPlain(v, sig = 3) {
  if (!Number.isFinite(v)) return '?';
  if (v === 0) return '0';
  const a = Math.abs(v);
  const e = Math.floor(Math.log10(a));
  if (e >= 5 || e <= -3) return Number(v.toPrecision(sig)).toExponential(sig - 1).replace('e+', 'e');
  return String(Number(v.toPrecision(sig)));
}

const expLatex = (e) => (isOne(e) ? '' : e.d === 1 ? `^{${e.n}}` : `^{${e.n}/${e.d}}`);

/**
 * One base with a whole-number exponent, as it sits in a numerator or a
 * denominator. `sub` substitutes a symbol with a number (for the worked
 * substitution line); a group is always bracketed.
 */
function baseLatex(base, opts) {
  if (base.sym !== undefined) {
    const s = opts.sub?.[base.sym];
    return s !== undefined ? s : symbolLatex(base.sym);
  }
  return `\\left(${sideLatex(base.group, opts)}\\right)`;
}

function joinFactors(items, opts) {
  // Numbers next to numbers need a × between them; symbols just sit together.
  const sep = opts.sub ? ' \\times ' : '\\,';
  return items.join(sep);
}

/**
 * A term in KaTeX. Integer powers go above or below one fraction bar; half
 * powers are gathered under one root, which itself may hold a fraction:
 *   2\pi\sqrt{\dfrac{r^{3}}{G\,M}}       \dfrac{m\,v^{2}}{r}
 * `opts.sub` maps symbol → number string for the substituted line, and
 * `opts.abs` drops the sign (the caller prints it as the operator between terms).
 */
export function termLatex(t, opts = {}) {
  const num = [], den = [], rootNum = [], rootDen = [];
  const c = opts.abs ? { n: Math.abs(t.coef.n), d: t.coef.d } : t.coef;
  const negative = c.n < 0;
  const cn = Math.abs(c.n), cd = c.d;
  // "2π" and "4π²" are one number to a physicist, so the coefficient and the
  // power of π are written as one item — never "2 × π".
  const piTop = t.pi > 0 ? (t.pi === 1 ? '\\pi' : `\\pi^{${t.pi}}`) : '';
  if (cn !== 1 || (t.factors.length === 0 && t.pi === 0)) num.push(`${cn}${piTop}`);
  else if (piTop) num.push(piTop);
  if (cd !== 1) den.push(String(cd));
  if (t.pi < 0) den.push(t.pi === -1 ? '\\pi' : `\\pi^{${-t.pi}}`);
  for (const f of t.factors) {
    const e = f.exp;
    const b = baseLatex(f.base, opts);
    // A substituted number raised to a power needs its own bracket when it is
    // itself a product like 6.67 × 10^-11.
    const wrap = (s, ex) => (opts.sub && f.base.sym !== undefined && !isOne(ex) && /\\times/.test(s) ? `\\left(${s}\\right)` : s);
    if (e.d === 1) {
      if (e.n > 0) num.push(`${wrap(b, e)}${expLatex(e)}`);
      else den.push(`${wrap(b, neg(e))}${expLatex(neg(e))}`);
    } else if (e.d === 2) {
      const inner = fr(Math.abs(e.n));   // the power under the root
      if (e.n > 0) rootNum.push(`${wrap(b, inner)}${expLatex(inner)}`);
      else rootDen.push(`${wrap(b, inner)}${expLatex(inner)}`);
    } else {
      num.push(`${b}^{${frText(e)}}`);
    }
  }
  // A bracketed sum that is the whole of a numerator or denominator, or the
  // whole of what sits under a root, needs no brackets: the bar does that job.
  const unbracket = (items) => (items.length === 1 && /^\\left\((.*)\\right\)$/.test(items[0]) ? [items[0].slice(6, -7)] : items);
  let root = '';
  if (rootNum.length || rootDen.length) {
    const top = rootNum.length ? joinFactors(rootDen.length ? unbracket(rootNum) : rootNum, opts) : '1';
    root = rootDen.length ? `\\sqrt{\\dfrac{${top}}{${joinFactors(unbracket(rootDen), opts)}}}` : `\\sqrt{${top}}`;
  }
  const numItems = den.length && !root ? unbracket(num) : num;
  const top = [joinFactors(numItems, opts), root].filter(Boolean).join(opts.sub && num.length && root ? ' \\times ' : '\\,') || '1';
  const body = den.length ? `\\dfrac{${top}}{${joinFactors(unbracket(den), opts)}}` : top;
  return negative ? `-${body}` : body;
}

/** A whole side: terms joined with + and −. An empty side is 0. */
export function sideLatex(side, opts = {}) {
  if (!side.length) return '0';
  return side.map((t, i) => {
    const body = termLatex(t, { ...opts, abs: true });
    const negative = t.coef.n < 0;
    if (i === 0) return negative ? `-${body}` : body;
    return `${negative ? ' - ' : ' + '}${body}`;
  }).join('');
}

export const formulaLatex = (eq, opts = {}) => `${sideLatex(eq.left, opts)} = ${sideLatex(eq.right, opts)}`;

// ------------------------------------------------------------------ moves

/**
 * The moves a student can make, all applied to BOTH sides:
 *   { kind: 'mul' | 'div', term }   multiply or divide by a chip — a factor
 *                                   like r or v^2, a bracket, or a number like 4π²
 *   { kind: 'add' | 'sub', term }   add or take away a whole term
 *   { kind: 'square' }              square both sides
 *   { kind: 'sqrt' }                square-root both sides
 */
export function applyMove(eq, move) {
  switch (move.kind) {
    case 'mul': return { left: tidySide(mulSide(eq.left, move.term)), right: tidySide(mulSide(eq.right, move.term)) };
    case 'div': {
      const inv = invTerm(move.term);
      return { left: tidySide(mulSide(eq.left, inv)), right: tidySide(mulSide(eq.right, inv)) };
    }
    case 'add': return { left: tidySide(addTerm(eq.left, move.term)), right: tidySide(addTerm(eq.right, move.term)) };
    case 'sub': {
      const n = term(neg(move.term.coef), move.term.pi, move.term.factors);
      return { left: tidySide(addTerm(eq.left, n)), right: tidySide(addTerm(eq.right, n)) };
    }
    case 'square': return { left: tidySide(powSide(eq.left, fr(2))), right: tidySide(powSide(eq.right, fr(2))) };
    case 'sqrt': return { left: tidySide(powSide(eq.left, fr(1, 2))), right: tidySide(powSide(eq.right, fr(1, 2))) };
    default: throw new Error(`unknown move ${move.kind}`);
  }
}

/** The move as it is written under each side of the working: "× r", "÷ v²", "− m g". */
export function moveLatex(move) {
  switch (move.kind) {
    case 'mul': return `\\times\\, ${termLatex(move.term)}`;
    case 'div': return `\\div\\, ${termLatex(move.term)}`;
    case 'add': return `+\\, ${termLatex(move.term)}`;
    case 'sub': return `-\\, ${termLatex(move.term)}`;
    case 'square': return '(\\;\\;)^{2}';
    case 'sqrt': return '\\sqrt{\\;\\;\\;}';
    default: return '';
  }
}

/** Solved when one side is the bare target and the other side does not mention it. */
export function isIsolated(eq, target) {
  const bareL = eq.left.length === 1 && isBareSymbol(eq.left[0], target);
  const bareR = eq.right.length === 1 && isBareSymbol(eq.right[0], target);
  return (bareL && !contains(eq.right, target)) || (bareR && !contains(eq.left, target));
}

/** The side that gives the target's value once isolated, or null. */
export function solvedSide(eq, target) {
  if (!isIsolated(eq, target)) return null;
  return eq.left.length === 1 && isBareSymbol(eq.left[0], target) ? eq.right : eq.left;
}

/** The whole-exponent chips a side offers: one per distinct factor, as it appears. */
function factorChips(side, out) {
  for (const t of side) for (const f of t.factors) {
    const chip = term(fr(1), 0, [factor(f.base, fr(Math.abs(f.exp.n), f.exp.d))]);
    // A factor under a root is offered as the whole thing (r, not √r): the
    // student squares first, which is what the strategy teaches.
    if (f.exp.d !== 1) chip.factors[0].exp = fr(1);
    const key = termKey(chip);
    if (!out.some((c) => termKey(c) === key)) out.push(chip);
  }
}

/**
 * Everything the student may multiply or divide by, and every term they may
 * add or subtract — read off the equation as it stands, so the row of chips
 * changes as the working does and nothing has to be authored.
 */
export function chipsOf(eq) {
  const factors = [];
  factorChips(eq.left, factors);
  factorChips(eq.right, factors);
  const numbers = [];
  for (const t of [...eq.left, ...eq.right]) {
    if (isOne(t.coef) && t.pi === 0) continue;
    if (t.coef.n === -1 && t.coef.d === 1 && t.pi === 0) continue;
    const chip = term({ n: Math.abs(t.coef.n), d: t.coef.d }, t.pi, []);
    const key = `${frText(chip.coef)}|${chip.pi}`;
    if (!numbers.some((c) => `${frText(c.coef)}|${c.pi}` === key)) numbers.push(chip);
  }
  const terms = [];
  for (const side of [eq.left, eq.right]) {
    if (side.length < 2) continue;
    for (const t of side) {
      const chip = term({ n: Math.abs(t.coef.n), d: t.coef.d }, t.pi, t.factors.map((f) => ({ ...f })));
      const key = termKey(chip) + frText(chip.coef);
      if (!terms.some((c) => termKey(c) + frText(c.coef) === key)) terms.push(chip);
    }
  }
  return { factors, numbers, terms };
}

// ------------------------------------------------------------------ strategy

/**
 * The taught strategy, one move at a time — the hint and the target count
 * both read it from here:
 *   1. anything ADDED to the target's term: take it away
 *   2. the target under a root: square both sides
 *   3. the target in a denominator: multiply it up
 *   4. every other factor beside it: divide (or multiply) it away
 *   5. a number in front of it: divide by the number
 *   6. the target squared: square-root both sides
 * Returns null when no move helps: the target is on both sides, inside a
 * bracket, raised to a power this engine cannot undo, or already alone.
 */
export function suggestMove(eq, target) {
  const inL = contains(eq.left, target), inR = contains(eq.right, target);
  if (inL && inR) return null;
  if (!inL && !inR) return null;
  const S = inL ? eq.left : eq.right;
  const O = inL ? eq.right : eq.left;

  // 1. other terms on the target's side
  if (S.length > 1) {
    const carriers = S.filter((t) => contains([t], target));
    if (carriers.length !== 1) return null;
    const other = S.find((t) => !contains([t], target));
    const mag = term({ n: Math.abs(other.coef.n), d: other.coef.d }, other.pi, other.factors);
    return { kind: other.coef.n < 0 ? 'add' : 'sub', term: mag };
  }
  const T = S[0];
  const tf = T.factors.find((f) => f.base.sym === target);
  if (!tf) return null;                                   // inside a bracket
  if (isIsolated(eq, target)) return null;

  // 2. a fractional exponent on the target: square first
  if (tf.exp.d === 2) return { kind: 'square' };
  if (tf.exp.d !== 1) return null;

  // 3. the target in a denominator
  if (tf.exp.n < 0) return { kind: 'mul', term: term(fr(1), 0, [factor(tf.base, neg(tf.exp))]) };

  // 4. the other factors — anything dividing is multiplied up first ("get rid
  //    of the fraction"), then whatever is multiplying is divided away.
  const others = T.factors.filter((f) => f.base.sym !== target);
  const below = others.find((f) => f.exp.n < 0);
  if (below) return { kind: 'mul', term: term(fr(1), 0, [factor(below.base, neg(below.exp))]) };
  const beside = others.find((f) => f.exp.n > 0);
  if (beside) return { kind: 'div', term: term(fr(1), 0, [factor(beside.base, beside.exp)]) };

  // 5. a number in front
  if (!isOne(T.coef) || T.pi !== 0) return { kind: 'div', term: term(T.coef, T.pi, []) };

  // 6. the target squared
  if (tf.exp.n === 2) {
    // Only when the other side can actually be rooted; otherwise stop here.
    try { powSide(O, fr(1, 2)); } catch { return null; }
    return { kind: 'sqrt' };
  }
  return null;
}

/** Fewest moves the taught strategy needs. */
export function parMoves(eq, target, limit = 12) {
  let cur = eq, n = 0;
  while (!isIsolated(cur, target) && n < limit) {
    const m = suggestMove(cur, target);
    if (!m) break;
    cur = applyMove(cur, m);
    n++;
  }
  return isIsolated(cur, target) ? n : null;
}

/**
 * Why the suggested move is the right one, in the student's terms. The working
 * prints this beside each line, so what they copy down carries the reason.
 */
export function reasonFor(move, eq, target) {
  const chip = move.term ? termLatex(move.term) : '';
  switch (move.kind) {
    case 'sub': return { en: `$${chip}$ is added to the $${symbolLatex(target)}$ term. Take it away from both sides.`, vn: `$${chip}$ đang được cộng vào số hạng chứa $${symbolLatex(target)}$. Trừ nó ở cả hai vế.` };
    case 'add': return { en: `$${chip}$ is taken away on the $${symbolLatex(target)}$ side. Add it to both sides.`, vn: `$${chip}$ đang bị trừ ở vế chứa $${symbolLatex(target)}$. Cộng nó vào cả hai vế.` };
    case 'square': return { en: 'Squaring undoes a square root.', vn: 'Bình phương sẽ khử căn bậc hai.' };
    case 'sqrt': return { en: 'A square root undoes a square.', vn: 'Căn bậc hai sẽ khử bình phương.' };
    case 'mul': {
      const t = move.term.factors[0];
      if (t && t.base.sym === target) return { en: `$${symbolLatex(target)}$ is dividing. Multiply both sides by $${chip}$ to bring it up.`, vn: `$${symbolLatex(target)}$ đang ở mẫu số. Nhân cả hai vế với $${chip}$ để đưa nó lên.` };
      return { en: `$${chip}$ is dividing the $${symbolLatex(target)}$ term. Multiply both sides by $${chip}$ to undo it.`, vn: `$${chip}$ đang chia số hạng chứa $${symbolLatex(target)}$. Nhân cả hai vế với $${chip}$ để khử nó.` };
    }
    case 'div': return { en: `$${chip}$ is multiplying $${symbolLatex(target)}$. Divide both sides by $${chip}$ to undo it.`, vn: `$${chip}$ đang nhân với $${symbolLatex(target)}$. Chia cả hai vế cho $${chip}$ để khử nó.` };
    default: return { en: '', vn: '' };
  }
}

// ------------------------------------------------------------------ evaluation

const PI = Math.PI;
const frNum = (f) => f.n / f.d;

/** Evaluate a side with a map of symbol → number. Throws on a symbol with no value. */
export function evalSide(side, values) {
  return side.reduce((sum, t) => sum + evalTerm(t, values), 0);
}

export function evalTerm(t, values) {
  let v = frNum(t.coef) * PI ** t.pi;
  for (const f of t.factors) {
    const base = f.base.sym !== undefined ? values[f.base.sym] : evalSide(f.base.group, values);
    if (base === undefined || base === null || Number.isNaN(base)) throw new Error(`no value for ${f.base.sym ?? 'bracket'}`);
    v *= base ** frNum(f.exp);
  }
  return v;
}

// ------------------------------------------------------------------ units

/**
 * Every unit an item may quote, with its SI unit and the factor that converts
 * TO SI. Authors write the unit the question uses; the task derives the
 * conversion the student has to do from this table.
 */
export const UNITS = {
  m: { si: 'm', factor: 1 }, km: { si: 'm', factor: 1000 }, cm: { si: 'm', factor: 0.01 }, mm: { si: 'm', factor: 0.001 },
  kg: { si: 'kg', factor: 1 }, g: { si: 'kg', factor: 0.001 }, tonne: { si: 'kg', factor: 1000 },
  s: { si: 's', factor: 1 }, min: { si: 's', factor: 60 }, h: { si: 's', factor: 3600 }, hours: { si: 's', factor: 3600 }, minutes: { si: 's', factor: 60 }, days: { si: 's', factor: 86400 },
  'm/s': { si: 'm/s', factor: 1 }, 'km/s': { si: 'm/s', factor: 1000 }, 'km/h': { si: 'm/s', factor: 1 / 3.6 },
  'm/s²': { si: 'm/s²', factor: 1 }, 'm/s^2': { si: 'm/s²', factor: 1 },
  N: { si: 'N', factor: 1 }, kN: { si: 'N', factor: 1000 },
  'N m²/kg²': { si: 'N m²/kg²', factor: 1 }, 'N m^2/kg^2': { si: 'N m²/kg²', factor: 1 },
  rad: { si: 'rad', factor: 1 }, 'rad/s': { si: 'rad/s', factor: 1 }, J: { si: 'J', factor: 1 }, W: { si: 'W', factor: 1 },
};

export const unitInfo = (u) => UNITS[String(u).trim()] || null;
export const isSI = (u) => { const i = unitInfo(u); return !!i && i.factor === 1; };
/** Convert a value quoted in `unit` to SI. */
export const toSI = (value, unit) => { const i = unitInfo(unit); if (!i) throw new Error(`unknown unit "${unit}"`); return value * i.factor; };
/** Convert an SI value into `unit`. */
export const fromSI = (value, unit) => { const i = unitInfo(unit); if (!i) throw new Error(`unknown unit "${unit}"`); return value / i.factor; };

/** The conversion, said out loud: "1 km = 1000 m, so multiply by 1000". */
export function conversionRule(unit) {
  const i = unitInfo(unit);
  if (!i || i.factor === 1) return null;
  const f = i.factor;
  if (f >= 1) return { en: `1 ${unit} = ${fmtPlain(f, 4)} ${i.si}, so multiply by ${fmtPlain(f, 4)}.`, vn: `1 ${unit} = ${fmtPlain(f, 4)} ${i.si}, nên nhân với ${fmtPlain(f, 4)}.` };
  const inv = 1 / f;
  return { en: `1 ${i.si} = ${fmtPlain(inv, 4)} ${unit}, so divide by ${fmtPlain(inv, 4)}.`, vn: `1 ${i.si} = ${fmtPlain(inv, 4)} ${unit}, nên chia cho ${fmtPlain(inv, 4)}.` };
}

// ------------------------------------------------------------------ typed numbers

const SUPERS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };

/**
 * Read what a student typed as a number. Accepts 29.7, 6.24e18, 6.24E+18,
 * 6.24×10^18, 6.24x10^18, 6.24*10^18, 6.24 × 10¹⁸, and a trailing unit
 * ("29.7 kg"). Returns null when it is not a number.
 */
export function parseNumber(raw) {
  if (raw === null || raw === undefined) return null;
  let s = String(raw).trim().replace(/[−–]/g, '-').replace(/,/g, '');
  // Superscript digits are tagged with a private-use marker, so that a run of
  // them straight after "10" reads as an exponent: "10¹⁸" → "10^18".
  const MARK = '';
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, (ch) => `${MARK}${SUPERS[ch]}`);
  s = s.replace(/10((?:[-0-9])+)/g, (m, digits) => `10^${digits.replace(//g, '')}`);
  s = s.replace(//g, '');
  const sci = s.match(/^([+-]?\d*\.?\d+)\s*(?:[eE]|[x×*]\s*10\s*\^?)\s*\(?\s*([+-]?\d+)\s*\)?\s*[a-zA-Z/²^0-9 ]*$/);
  if (sci) {
    const v = Number(sci[1]) * 10 ** Number(sci[2]);
    return Number.isFinite(v) ? v : null;
  }
  const plain = s.match(/^([+-]?\d*\.?\d+)\s*[a-zA-Z/²^0-9 ]*$/);
  if (plain) {
    const v = Number(plain[1]);
    return Number.isFinite(v) ? v : null;
  }
  return null;
}

/** Within a relative tolerance of the wanted value. */
export const closeTo = (got, want, tol = 0.015) =>
  Number.isFinite(got) && Number.isFinite(want) && Math.abs(got - want) <= tol * Math.max(Math.abs(want), 1e-300);

// ------------------------------------------------------------------ an item, worked

/**
 * Everything the task and the validator need about one item, derived from the
 * item, the unit's symbol table and its constants:
 *   start        the parsed formula
 *   par          the taught strategy's move count (null: cannot be solved)
 *   solved       the formula with the target isolated, by that strategy
 *   expr         the side that gives the target
 *   pieces       every symbol the expression needs: { sym, value, unit, si, siValue, given|constant }
 *   siValues     symbol → SI number
 *   answer       the target's value in SI
 *   siUnit       the SI unit of the answer, and `askUnit` the unit the item wants it in
 *   answerAsked  the answer converted into askUnit
 *   traps        [{ key, value, en, vn }] wrong numbers a common slip produces
 */
export function workItem(item, config = {}) {
  const symbols = config.symbols || {};
  const constants = config.constants || {};
  const start = parseFormula(item.formula);
  const target = item.target;

  let cur = start, n = 0;
  const limit = 12;
  while (!isIsolated(cur, target) && n < limit) {
    const m = suggestMove(cur, target);
    if (!m) break;
    cur = applyMove(cur, m);
    n++;
  }
  const solvable = isIsolated(cur, target);
  const expr = solvable ? solvedSide(cur, target) : null;

  const needed = expr ? symbolsOf(expr) : symbolsOf(start.left).concat(symbolsOf(start.right)).filter((s) => s !== target);
  const pieces = [];
  const siValues = {};
  for (const sym of needed) {
    const g = item.given?.[sym];
    const c = constants[sym];
    const src = g || c;
    if (!src) { pieces.push({ sym, missing: true }); continue; }
    const info = unitInfo(src.unit);
    const siValue = info ? src.value * info.factor : NaN;
    siValues[sym] = siValue;
    pieces.push({
      sym,
      value: src.value,
      unit: src.unit,
      si: info?.si || src.unit,
      siValue,
      needsConversion: !!info && info.factor !== 1,
      constant: !g && !!c,
      show: src.show || null,
      name: symbols[sym]?.name || sym,
      nameVn: symbols[sym]?.nameVn || symbols[sym]?.name || sym,
    });
  }

  let answer = NaN;
  if (expr && pieces.every((p) => !p.missing)) {
    try { answer = evalSide(expr, siValues); } catch { answer = NaN; }
  }
  const siUnit = symbols[target]?.si || unitInfo(item.ask?.unit)?.si || item.ask?.unit || '';
  const askUnit = item.ask?.unit || siUnit;
  const askInfo = unitInfo(askUnit);
  const answerAsked = askInfo ? answer / askInfo.factor : answer;

  // The slips a student is most likely to make, each with the number it
  // produces, so a wrong answer can be named rather than just marked wrong.
  const traps = [];
  if (expr && Number.isFinite(answer)) {
    for (const p of pieces) {
      if (!p.needsConversion) continue;
      try {
        const v = evalSide(expr, { ...siValues, [p.sym]: p.value });
        traps.push({ key: `raw:${p.sym}`, value: v, sym: p.sym, unit: p.unit, si: p.si });
      } catch { /* ignore */ }
    }
    const noRoot = expr.map((t) => term(t.coef, t.pi, t.factors.map((f) => ({ ...f, exp: f.exp.d === 2 ? fr(f.exp.n) : f.exp }))));
    const noSquare = expr.map((t) => term(t.coef, t.pi, t.factors.map((f) => ({ ...f, exp: f.exp.d === 1 && Math.abs(f.exp.n) === 2 ? fr(Math.sign(f.exp.n)) : f.exp }))));
    const hasRoot = expr.some((t) => t.factors.some((f) => f.exp.d === 2));
    const hasSquare = expr.some((t) => t.factors.some((f) => f.exp.d === 1 && Math.abs(f.exp.n) === 2));
    try { if (hasRoot) traps.push({ key: 'noroot', value: evalSide(noRoot, siValues) }); } catch { /* ignore */ }
    try { if (hasSquare) traps.push({ key: 'nosquare', value: evalSide(noSquare, siValues) }); } catch { /* ignore */ }
    if (askInfo && askInfo.factor !== 1) traps.push({ key: 'unconverted-answer', value: answer, unit: askUnit, si: siUnit });
  }

  return { start, target, par: solvable ? n : null, solved: solvable ? cur : null, expr, pieces, siValues, answer, siUnit, askUnit, answerAsked, traps };
}

/**
 * Problems with a unit's `rearrange` block, as strings — empty when it is
 * sound. Run by npm run validate. Re-derives every item exactly as the task
 * does and also checks the derivation numerically: random values for the
 * givens, the target computed from the rearranged formula, and the ORIGINAL
 * formula must then balance. A rearrangement that is merely "solvable" but
 * silently wrong would fail there.
 */
export function checkRearrangeItems(config) {
  const out = [];
  if (!config) return out;
  if (!config.title) out.push('rearrange needs a title');
  const items = config.items || [];
  if (!items.length) out.push('rearrange has no items');
  const seen = new Set();
  for (const item of items) {
    const at = `item ${item.id || '?'}`;
    if (!item.id) out.push('an item has no id');
    else if (seen.has(item.id)) out.push(`${at}: duplicate id`);
    seen.add(item.id);
    if (!item.prompt || !item.promptVn) out.push(`${at} is missing a bilingual prompt`);
    if (!item.target) { out.push(`${at} has no target`); continue; }
    let w;
    try { w = workItem(item, config); } catch (e) { out.push(`${at}: cannot parse "${item.formula}" — ${e.message}`); continue; }
    if (!contains(w.start.left, item.target) && !contains(w.start.right, item.target)) { out.push(`${at}: "${item.formula}" has no ${item.target}`); continue; }
    if (w.par === null) { out.push(`${at}: "${item.formula}" cannot be solved for ${item.target} by the taught strategy`); continue; }
    for (const p of w.pieces) {
      if (p.missing) out.push(`${at}: ${p.sym} is neither given nor a constant`);
      else if (!unitInfo(p.unit)) out.push(`${at}: unit "${p.unit}" for ${p.sym} is not in the units table`);
    }
    if (!item.ask?.unit) out.push(`${at} needs ask.unit`);
    else if (!unitInfo(item.ask.unit)) out.push(`${at}: ask.unit "${item.ask.unit}" is not in the units table`);
    else if (w.siUnit && unitInfo(item.ask.unit).si !== w.siUnit) out.push(`${at}: ask.unit "${item.ask.unit}" does not measure ${item.target} (${w.siUnit})`);
    if (!Number.isFinite(w.answer) || w.answer <= 0) out.push(`${at}: the answer evaluates to ${w.answer}`);
    // Numerical proof of the rearrangement.
    const vals = {};
    for (const sym of new Set([...symbolsOf(w.start.left), ...symbolsOf(w.start.right)])) vals[sym] = 1 + ((sym.charCodeAt(0) * 7919) % 97) / 13;
    try {
      const t = evalSide(w.expr, vals);
      const probe = { ...vals, [item.target]: t };
      const L = evalSide(w.start.left, probe), R = evalSide(w.start.right, probe);
      if (!closeTo(L, R, 1e-9)) out.push(`${at}: rearranging "${item.formula}" for ${item.target} changed its meaning (${L} vs ${R})`);
    } catch (e) {
      out.push(`${at}: could not check the rearrangement numerically — ${e.message}`);
    }
  }
  return out;
}
