// src/utils/triangles.js
//
// Right-angled triangles — the pure parts behind the Triangle Solver task
// (src/tasks/TriangleSolver.jsx), its figure (components/math/TriangleFigure.jsx)
// and the EM_07B ratio widget.
//
// THE RULE (same as surds.js, sets.js, simultaneous.js): an item stores the
// QUESTION — which corner is the right angle, which way each leg runs, the
// lengths and angle the question gives, what it asks for — and everything
// else is derived here: the other sides and angles, which side is the
// hypotenuse / opposite / adjacent, the ratio, the rearrangement, the answer,
// an exact surd answer for 30°, 45° and 60°, and a bearing. `checkTriangleItems`
// refuses an item the screen could not finish.
//
// A TRIANGLE is authored as
//   { right: 'C', legs: { A: 'E', B: 'N' } }
// — the right angle at C, A due east of C and B due north of C. The legs run
// E / W / N / S, so the figure is also a compass: north is up, which is what
// lets a bearing be DERIVED rather than typed in. `rot` turns the drawing
// (not allowed with a bearing), so "opposite" is not always the upright side.
//
// ITEM KINDS
//   pythag  two sides given, the third asked for:   given: { AC: 9, BC: 12 }, find: 'AB'
//   side    an angle and one side, a side asked for: angle: { at: 'A', deg: 38 }, given: { AB: 12 }, find: 'BC'
//   angle   two sides given, an angle asked for:     given: { AC: 15, AB: 26 }, find: { angle: 'A' }
//   chain   two parts on one figure; the second uses the side the first found:
//           { kind: 'chain', parts: [ {…side…}, { kind: 'pythag', given: { BD: 'prev', DC: 11 }, … } ] }
// Options: `exact: true` (a surd answer — Pythagoras, or 30°/45°/60°),
// `bearing: { from, to }` (an angle item: then the bearing of `to` from `from`),
// `unit` ('cm'), `labels` ({ BC: 'h' } — the letter printed for the unknown),
// `prompt` (the question in words).

import { splitRoot, gcd } from './surds.js';

export const DEG = Math.PI / 180;
const DIR = { E: [1, 0], W: [-1, 0], N: [0, 1], S: [0, -1] };

// ------------------------------------------------------------------ sides and names

/** "AB" and "BA" are the same side. */
export const sideKey = (s) => [...String(s)].sort().join('');

/** The three vertices of a triangle spec: [right, P, Q] in authored order. */
function verticesOf(tri) {
  const others = Object.keys(tri.legs || {});
  return [tri.right, ...others];
}

/**
 * Every side and both acute angles of one right-angled triangle, from what
 * the question gives. `given` holds side lengths (and `prev` resolved by the
 * caller); `angle` an acute angle.
 */
export function solveTriangle(tri, given, angle) {
  const [R, P, Q] = verticesOf(tri);
  if (!R || !P || !Q) throw new Error('a triangle needs right and two legs');
  const legP = sideKey(R + P);
  const legQ = sideKey(R + Q);
  const hyp = sideKey(P + Q);
  const g = Object.fromEntries(Object.entries(given || {}).map(([k, v]) => [sideKey(k), v]));
  for (const k of Object.keys(g)) if (![legP, legQ, hyp].includes(k)) throw new Error(`${k} is not a side of the triangle`);
  let rp = g[legP];
  let rq = g[legQ];
  let h = g[hyp];
  if (angle) {
    const a = angle.deg * DEG;
    if (!(angle.deg > 0 && angle.deg < 90)) throw new Error('an angle must be acute');
    // angle at P: RQ is opposite, RP adjacent. At Q: the other way round.
    const atP = angle.at === P;
    if (!atP && angle.at !== Q) throw new Error(`the angle must be at ${P} or ${Q}`);
    const [adj, opp] = atP ? ['rp', 'rq'] : ['rq', 'rp'];
    const known = { rp, rq, h };
    if (h != null) { known[adj] = h * Math.cos(a); known[opp] = h * Math.sin(a); }
    else if (known[adj] != null) { known.h = known[adj] / Math.cos(a); known[opp] = known[adj] * Math.tan(a); }
    else if (known[opp] != null) { known.h = known[opp] / Math.sin(a); known[adj] = known[opp] / Math.tan(a); }
    else throw new Error('an angle needs one side with it');
    ({ rp, rq, h } = known);
  } else {
    if (h != null && rp != null) rq = Math.sqrt(h * h - rp * rp);
    else if (h != null && rq != null) rp = Math.sqrt(h * h - rq * rq);
    else if (rp != null && rq != null) h = Math.hypot(rp, rq);
    else throw new Error('two sides are needed');
    if (!(rp > 0 && rq > 0)) throw new Error('the hypotenuse must be the longest side');
  }
  const angP = Math.atan2(rq, rp) / DEG;
  return {
    R, P, Q, hyp, legP, legQ,
    len: { [legP]: rp, [legQ]: rq, [hyp]: h },
    ang: { [P]: angP, [Q]: 90 - angP },
  };
}

/** Hypotenuse, opposite and adjacent, relative to the acute angle at `at`. */
export function hoaOf(solved, at) {
  const { R, P, Q, hyp } = solved;
  const other = at === P ? Q : P;
  return { hyp, opp: sideKey(R + other), adj: sideKey(R + at) };
}

// ------------------------------------------------------------------ ratios

export const RATIOS = {
  sin: { name: 'sin', mnemonic: 'SOH', top: 'opp', bottom: 'hyp', f: Math.sin, inv: Math.asin },
  cos: { name: 'cos', mnemonic: 'CAH', top: 'adj', bottom: 'hyp', f: Math.cos, inv: Math.acos },
  tan: { name: 'tan', mnemonic: 'TOA', top: 'opp', bottom: 'adj', f: Math.tan, inv: Math.atan },
};

/** The ratio that links two roles: {opp, hyp} → sin, {adj, hyp} → cos, {opp, adj} → tan. */
export function ratioFor(roleA, roleB) {
  const s = new Set([roleA, roleB]);
  if (s.has('opp') && s.has('hyp')) return 'sin';
  if (s.has('adj') && s.has('hyp')) return 'cos';
  if (s.has('opp') && s.has('adj')) return 'tan';
  return null;
}

// ------------------------------------------------------------------ exact values

// sin, cos, tan of 30°, 45°, 60° as { terms: [[k, r]], den } — k√r / den.
const EXACT = {
  30: { sin: [[1, 1], 2], cos: [[1, 3], 2], tan: [[1, 3], 3] },
  45: { sin: [[1, 2], 2], cos: [[1, 2], 2], tan: [[1, 1], 1] },
  60: { sin: [[1, 3], 2], cos: [[1, 1], 2], tan: [[1, 3], 1] },
};

/** The exact value of a ratio at 30/45/60 as KaTeX: "\dfrac{\sqrt{3}}{2}". */
export function exactLatex(fn, deg) {
  const [[k, r], den] = EXACT[deg][fn];
  const top = r === 1 ? `${k}` : `${k === 1 ? '' : k}\\sqrt{${r}}`;
  return den === 1 ? top : `\\dfrac{${top}}{${den}}`;
}

/**
 * Four exact values to choose from: the right one and the three it is most
 * often confused with, in a fixed order (so the answer is not always first).
 */
export function exactOptions(fn, deg) {
  const ORDER = ['\\dfrac{1}{2}', '\\dfrac{\\sqrt{2}}{2}', '\\dfrac{\\sqrt{3}}{2}', '\\sqrt{3}', '\\dfrac{\\sqrt{3}}{3}', '1'];
  const right = exactLatex(fn, deg);
  const confuse = fn === 'tan'
    ? ['\\sqrt{3}', '\\dfrac{\\sqrt{3}}{3}', '\\dfrac{\\sqrt{3}}{2}', '1']
    : ['\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}', '\\dfrac{\\sqrt{2}}{2}', '\\sqrt{3}'];
  const opts = [right, ...confuse.filter((x) => x !== right)].slice(0, 4);
  return ORDER.filter((x) => opts.includes(x));
}

/**
 * side × (k√r / den) or side ÷ (k√r / den), as an exact k√r (k an integer).
 * Null when the answer is not that shape (the validator then refuses it).
 */
export function exactProduct(side, fn, deg, divide) {
  const [[k, r], den] = EXACT[deg][fn];
  // Work with (num/dn)·√r.
  let num; let dn; let rad;
  if (!divide) { num = side * k; dn = den; rad = r; }
  else {
    // side ÷ (k√r/den) = side·den / (k√r) = side·den·√r / (k·r)
    num = side * den; dn = k * r; rad = r;
  }
  const { out, inside } = splitRoot(rad);
  num *= out; rad = inside;
  const g = gcd(num, dn);
  num /= g; dn /= g;
  if (dn !== 1) return null;
  return [num, rad];
}

// ------------------------------------------------------------------ bearings

/** Bearing (clockwise from north, 0 ≤ b < 360) from point p to point q. */
export function bearingOf([x1, y1], [x2, y2]) {
  const b = Math.atan2(x2 - x1, y2 - y1) / DEG;
  return (b + 360) % 360;
}

const BEARING_RULES = [
  { id: 't', latex: '\\theta', f: (t) => t },
  { id: '180-t', latex: '180^\\circ - \\theta', f: (t) => 180 - t },
  { id: '180+t', latex: '180^\\circ + \\theta', f: (t) => 180 + t },
  { id: '360-t', latex: '360^\\circ - \\theta', f: (t) => 360 - t },
  { id: '90-t', latex: '90^\\circ - \\theta', f: (t) => 90 - t },
  { id: '90+t', latex: '90^\\circ + \\theta', f: (t) => 90 + t },
  { id: '270-t', latex: '270^\\circ - \\theta', f: (t) => 270 - t },
  { id: '270+t', latex: '270^\\circ + \\theta', f: (t) => 270 + t },
];

/** Three-figure bearing text: 57.4 → "057.4°". */
export function bearingText(b, dp = 1) {
  const s = b.toFixed(dp);
  const [whole, frac] = s.split('.');
  return `${whole.padStart(3, '0')}${frac ? `.${frac}` : ''}°`;
}

// ------------------------------------------------------------------ layout

/** Vertex coordinates (north up) for every triangle in an item's figure. */
export function layoutOf(parts) {
  const pos = {};
  for (const part of parts) {
    const { tri, solved } = part;
    const [R, P, Q] = verticesOf(tri);
    if (!pos[R]) {
      // Anchor the first triangle at its right angle; a later triangle must
      // share its right-angle corner or one leg end with what is placed.
      const shared = [P, Q].find((v) => pos[v]);
      if (shared) {
        const d = DIR[tri.legs[shared]];
        const L = solved.len[sideKey(R + shared)];
        pos[R] = [pos[shared][0] - d[0] * L, pos[shared][1] - d[1] * L];
      } else pos[R] = [0, 0];
    }
    for (const V of [P, Q]) {
      const d = DIR[tri.legs[V]];
      const L = solved.len[sideKey(R + V)];
      const want = [pos[R][0] + d[0] * L, pos[R][1] + d[1] * L];
      if (!pos[V]) pos[V] = want;
    }
  }
  return pos;
}

// ------------------------------------------------------------------ the model

/**
 * One part of an item, fully derived. `prev` is the value found by the part
 * before it (a chain), which replaces any given length written as 'prev'.
 */
function derivePart(part, prev) {
  const given = Object.fromEntries(Object.entries(part.given || {}).map(([k, v]) => [sideKey(k), v === 'prev' ? prev : v]));
  const solved = solveTriangle(part.tri, given, part.angle);
  const kind = part.kind;
  const out = { part, kind, tri: part.tri, solved, given, exact: !!part.exact };
  const usesPrev = Object.entries(part.given || {}).find(([, v]) => v === 'prev');
  out.prevSide = usesPrev ? sideKey(usesPrev[0]) : null;

  if (kind === 'pythag') {
    const find = sideKey(part.find);
    const knownSides = Object.keys(given);
    const findHyp = find === solved.hyp;
    const [s1, s2] = findHyp ? knownSides : [solved.hyp, knownSides.find((k) => k !== solved.hyp)];
    const sq1 = given[s1] ** 2;
    const sq2 = given[s2] ** 2;
    const sq = findHyp ? sq1 + sq2 : sq1 - sq2;
    out.find = find;
    out.findHyp = findHyp;
    out.squares = { first: s1, second: s2, sq1, sq2, sq, op: findHyp ? '+' : '-' };
    out.value = Math.sqrt(sq);
    if (part.exact) {
      if (!Number.isInteger(sq)) throw new Error('an exact Pythagoras item needs whole-number squares');
      const { out: k, inside } = splitRoot(sq);
      out.exactAns = [k, inside];
    }
    return out;
  }

  if (kind === 'side') {
    const at = part.angle.at;
    const roles = hoaOf(solved, at);
    const find = sideKey(part.find);
    const knownSide = Object.keys(given).find((k) => k !== find);
    const roleOf = (s) => Object.keys(roles).find((r) => roles[r] === s);
    const fn = ratioFor(roleOf(knownSide), roleOf(find));
    const R = RATIOS[fn];
    const unknownOnTop = roles[R.top] === find;
    out.find = find;
    out.at = at;
    out.deg = part.angle.deg;
    out.roles = roles;
    out.known = { side: knownSide, value: given[knownSide], role: roleOf(knownSide) };
    out.findRole = roleOf(find);
    out.fn = fn;
    out.unknownOnTop = unknownOnTop;
    out.value = solved.len[find];
    // The calculator slips a marker can name.
    const k = given[knownSide];
    const a = part.angle.deg;
    out.slips = [
      { id: 'radians', value: unknownOnTop ? k * R.f(a) : k / R.f(a), why: 'That is the answer with the calculator in RADIANS. Switch it to degrees (DEG / D on the screen) and try again.' },
      { id: 'flip', value: unknownOnTop ? k / R.f(a * DEG) : k * R.f(a * DEG), why: unknownOnTop ? 'You divided — the unknown is on TOP of the fraction, so multiply.' : 'You multiplied — the unknown is on the BOTTOM, so divide.' },
    ];
    if (part.exact) {
      if (![30, 45, 60].includes(a)) throw new Error('an exact item needs 30°, 45° or 60°');
      if (!Number.isInteger(k)) throw new Error('an exact item needs a whole-number side');
      const ans = exactProduct(k, fn, a, !unknownOnTop);
      if (!ans) throw new Error('the exact answer is not a whole number times one surd');
      out.exactAns = ans;
    }
    return out;
  }

  if (kind === 'angle') {
    const at = part.find.angle;
    const roles = hoaOf(solved, at);
    const knownSides = Object.keys(given);
    const roleOf = (s) => Object.keys(roles).find((r) => roles[r] === s);
    const fn = ratioFor(roleOf(knownSides[0]), roleOf(knownSides[1]));
    const R = RATIOS[fn];
    const top = knownSides.find((s) => roles[R.top] === s);
    const bottom = knownSides.find((s) => roles[R.bottom] === s);
    out.at = at;
    out.roles = roles;
    out.fn = fn;
    out.top = { side: top, value: given[top] };
    out.bottom = { side: bottom, value: given[bottom] };
    out.value = solved.ang[at];
    out.slips = [
      { id: 'radians', value: R.inv(given[top] / given[bottom]), why: 'That is the angle in RADIANS. Switch the calculator to degrees and press the inverse again.' },
      // Only tan can be turned upside down and still give an angle — and what
      // it gives is the OTHER acute angle, the classic wrong-corner answer.
      ...(fn === 'tan' ? [{ id: 'flipped', value: Math.atan(given[bottom] / given[top]) / DEG, why: `That is the other acute angle. The fraction is ${R.top === 'opp' ? 'opposite over adjacent' : 'top over bottom'} for the angle at ${at}.` }] : []),
    ];
    return out;
  }
  throw new Error(`kind must be pythag, side, angle or chain (got ${kind})`);
}

/** Everything the Triangle Solver needs for one item. */
export function deriveTriangleItem(item) {
  const partsIn = item.kind === 'chain' ? item.parts : [item];
  if (!Array.isArray(partsIn) || !partsIn.length) throw new Error('a chain needs parts');
  const parts = [];
  let prev = null;
  for (const p of partsIn) {
    const d = derivePart(p, prev);
    parts.push(d);
    prev = d.value;
  }
  const pos = layoutOf(parts);
  // A bearing, on an angle item drawn north-up.
  for (const d of parts) {
    const b = d.part.bearing;
    if (!b) continue;
    if (d.kind !== 'angle') throw new Error('a bearing follows an angle item');
    if (d.part.tri.rot) throw new Error('a bearing needs the figure north-up (no rot)');
    if (b.from !== d.at) throw new Error('the bearing must be measured from the vertex whose angle was found');
    const value = bearingOf(pos[b.from], pos[b.to]);
    const theta = d.value;
    const rule = BEARING_RULES.find((r) => Math.abs(((r.f(theta) % 360) + 360) % 360 - value) < 1e-6);
    if (!rule) throw new Error('no simple rule gives this bearing');
    const pool = BEARING_RULES.filter((r) => ['t', '180-t', '180+t', '360-t'].includes(r.id) || r.id === rule.id);
    const options = [rule, ...pool.filter((r) => r.id !== rule.id)].slice(0, 4).sort((x, y) => BEARING_RULES.indexOf(x) - BEARING_RULES.indexOf(y));
    d.bearing = { ...b, value, rule, options };
  }
  return { item, parts, pos, unit: item.unit || '' };
}

// ------------------------------------------------------------------ marking

/** Significant figures in a typed decimal ("6.64" → 3, "0.05" → 1, "15" → 2). */
export function sigFigs(s) {
  const t = String(s).trim().replace(/^-/, '');
  if (!/^\d*\.?\d+$|^\d+\.$/.test(t)) return 0;
  const digits = t.replace('.', '').replace(/^0+/, '');
  if (!t.includes('.')) return digits.replace(/0+$/, '').length || 1;
  return digits.length;
}

/** A typed decimal as a number, or null. Accepts a comma for the point. */
export function typedDecimal(s) {
  const t = String(s ?? '').trim().replace(',', '.').replace(/[−–]/g, '-').replace(/°$/, '');
  return /^-?\d*\.?\d+$/.test(t) ? Number(t) : null;
}

/**
 * Mark a typed length (3 s.f.) or angle (1 d.p.) against the exact value.
 *   { ok: true } | { ok: false, why }
 * A value that rounds right but is given too roughly is not ok, with a
 * reason; a known calculator slip is named.
 */
export function markValue(typedStr, exact, { angle = false, slips = [] } = {}) {
  const v = typedDecimal(typedStr);
  if (v == null) return { ok: false, why: angle ? 'Type the angle in degrees, like 38.7.' : 'Type the length as a decimal, like 7.39.' };
  const tol = angle ? 0.05 : 0.5 * 10 ** (Math.floor(Math.log10(Math.abs(exact))) - 2);
  if (Math.abs(v - exact) <= tol + 1e-9) {
    // Right to the accuracy asked for — but say so if it was given too roughly.
    if (!angle && sigFigs(typedStr) < 3 && Math.abs(Number(exact.toPrecision(3)) - v) > 1e-9) return { ok: false, why: 'Nearly — give it to 3 significant figures.' };
    return { ok: true };
  }
  for (const s of slips) {
    const t = angle ? 0.05 : 0.5 * 10 ** (Math.floor(Math.log10(Math.abs(s.value || 1))) - 2);
    if (Number.isFinite(s.value) && Math.abs(v - s.value) <= t + 1e-9) return { ok: false, why: s.why };
  }
  // Right to 2 s.f. / whole degrees: rounded too early or too far.
  const loose = angle ? 0.5 : 5 * 10 ** (Math.floor(Math.log10(Math.abs(exact))) - 2);
  if (Math.abs(v - exact) <= loose) return { ok: false, why: angle ? 'Close — but give the angle to 1 decimal place, and do not round until the very end.' : 'Close — but round only at the end, and give 3 significant figures.' };
  return { ok: false, why: null };
}

/** The answer as it should be written: 3 s.f. for a length, 1 d.p. for an angle. */
export function answerText(value, { angle = false } = {}) {
  if (angle) return `${value.toFixed(1)}°`;
  const p = Number(value.toPrecision(3));
  // Keep trailing zeros that are significant: 15.0, 0.250.
  return value.toPrecision(3).includes('e') ? String(p) : value.toPrecision(3);
}

// ------------------------------------------------------------------ validation

/** Problems with a list of Triangle Solver items, as strings. Empty when sound. */
export function checkTriangleItems(items) {
  const out = [];
  const ids = new Set();
  for (const [i, item] of (items || []).entries()) {
    const at = `item ${item?.id || i + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    const partsIn = item?.kind === 'chain' ? item.parts : [item];
    for (const p of partsIn || []) {
      const legs = Object.entries(p?.tri?.legs || {});
      if (legs.length !== 2) { out.push(`${at}: a triangle needs exactly two legs`); continue; }
      const [[, d1], [, d2]] = legs;
      if (!DIR[d1] || !DIR[d2]) out.push(`${at}: legs run E, W, N or S`);
      else if (DIR[d1][0] * DIR[d2][0] + DIR[d1][1] * DIR[d2][1] !== 0) out.push(`${at}: the two legs must be at right angles (one E/W, one N/S)`);
    }
    let m;
    try { m = deriveTriangleItem(item); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    for (const d of m.parts) {
      if (!(d.value > 0) || !Number.isFinite(d.value)) out.push(`${at}: the answer is not a positive number`);
      if (d.kind !== 'angle' && d.value > 999) out.push(`${at}: the answer is too long a number`);
      if (d.kind === 'side' && Object.keys(d.given).length !== 1) out.push(`${at}: a side item gives exactly one side (and the angle)`);
      if (d.kind === 'pythag' && Object.keys(d.given).length !== 2) out.push(`${at}: a Pythagoras item gives exactly two sides`);
      if (d.kind === 'angle' && Object.keys(d.given).length !== 2) out.push(`${at}: an angle item gives exactly two sides`);
      if (d.exact && d.exactAns && d.exactAns[1] === 1) out.push(`${at}: the exact answer is a whole number — drop exact: true`);
      if (d.kind === 'pythag' && !d.exact) {
        const r = d.value;
        if (Math.abs(r - Math.round(r)) > 1e-9 && d.squares.sq <= 0) out.push(`${at}: impossible triangle`);
      }
    }
    if (item.kind === 'chain' && !m.parts.slice(1).every((d) => d.prevSide)) out.push(`${at}: each later part should use the side found before it ('prev')`);
    const letters = new Set(Object.keys(m.pos));
    if ([...letters].some((l) => !/^[A-Z]$/.test(l))) out.push(`${at}: vertices are single capital letters`);
  }
  return out;
}
