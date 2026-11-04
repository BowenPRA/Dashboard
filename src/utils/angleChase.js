// src/utils/angleChase.js
//
// Find Every Angle (Year 7 Maths 5.1 and 5.2): a Workbook-style diagram with
// several letters, found one at a time. Each angle found is written on the
// picture and becomes a known angle for the next one — "use one angle to find
// the rest". For every letter the student gives the FACT (the reason), then
// the SIZE; the fact lights the angles it joins.
//
// An item states the picture only (utils/angleChaseGeom.js has the figure
// schema) and its marks:
//   { id, level, fig: { box, lines, marks: [ { at: 'm t', toward: 30, show: 64 | 'a' | 'R' } ] },
//     context?, contextFr?, guided?: true | false }
// A number must be the angle the lines really make (the proof checks it); 'R'
// is a small square (90°); the same letter twice means the same size. Every
// unmarked angle is still in the picture: when no letter can be found in one
// step, one of them is the stepping stone, found on the way ("?").
//
// The unit chooses the facts on offer (`facts`), from:
//   line  angles on a straight line add up to 180°
//   point angles around a point add up to 360°
//   opp   vertically opposite angles are equal                (an X)
//   corr  corresponding angles are equal                       (an F)
//   alt   alternate angles are equal                           (a Z)
//   side  between the parallel lines, on the same side: 180°   (no name on screen)
//   tri   the angles in a triangle add up to 180°
//   quad  the angles in a quadrilateral add up to 360°
//   para  opposite angles in a parallelogram are equal
// Every relation of those kinds is read off the drawing, so any true route to
// a letter is marked right.

import { buildFigure, vertexOf, sectorToward, norm, atPx } from './angleChaseGeom.js';

export const FACT_KINDS = ['line', 'point', 'opp', 'corr', 'alt', 'side', 'tri', 'quad', 'para'];
export const EQUAL_KINDS = ['opp', 'corr', 'alt', 'para'];
export const GUIDED_UP_TO = 2;
const deg = (v) => `${Number.isInteger(v) ? v : Number(v.toFixed(2))}°`;
const same = (a, b) => Math.abs(a - b) < 1e-6;
const isLetter = (t) => typeof t === 'string' && /^[a-z]$/.test(t);

/* ------------------------------------------------------------------ words */

export const FACT_WORDS = {
  line: { en: 'angles on a straight line add up to 180°', fr: 'les angles sur une ligne droite font 180° en tout' },
  point: { en: 'angles around a point add up to 360°', fr: 'les angles autour d’un point font 360° en tout' },
  opp: { en: 'vertically opposite angles are equal', fr: 'les angles opposés par le sommet sont égaux' },
  corr: { en: 'corresponding angles are equal', fr: 'les angles correspondants sont égaux' },
  alt: { en: 'alternate angles are equal', fr: 'les angles alternes-internes sont égaux' },
  side: { en: 'angles between parallel lines, on the same side, add up to 180°', fr: 'entre deux droites parallèles, deux angles du même côté font 180° en tout' },
  tri: { en: 'the angles in a triangle add up to 180°', fr: 'les angles d’un triangle font 180° en tout' },
  quad: { en: 'the angles in a quadrilateral add up to 360°', fr: 'les angles d’un quadrilatère font 360° en tout' },
  para: { en: 'opposite angles in a parallelogram are equal', fr: 'dans un parallélogramme, les angles opposés sont égaux' },
};
/** The button: a short name and the rule in brief. */
export const FACT_BUTTONS = {
  line: { en: ['Straight line', '180°'], fr: ['Ligne droite', '180°'] },
  point: { en: ['Around a point', '360°'], fr: ['Autour d’un point', '360°'] },
  opp: { en: ['Vertically opposite', 'X · equal'], fr: ['Opposés par le sommet', 'X · égaux'] },
  corr: { en: ['Corresponding', 'F · equal'], fr: ['Correspondants', 'F · égaux'] },
  alt: { en: ['Alternate', 'Z · equal'], fr: ['Alternes-internes', 'Z · égaux'] },
  side: { en: ['Same side, between', '180°'], fr: ['Même côté, entre', '180°'] },
  tri: { en: ['Triangle', '180°'], fr: ['Triangle', '180°'] },
  quad: { en: ['Quadrilateral', '360°'], fr: ['Quadrilatère', '360°'] },
  para: { en: ['Parallelogram', 'opposite · equal'], fr: ['Parallélogramme', 'opposés · égaux'] },
};
// "a is not …" — what the fact needs, said where the student chose it and it is not there.
const NOT_THERE = {
  line: { en: (L) => `${L} is not next to other angles on a straight line.`, fr: (L) => `${L} n’est pas à côté d’autres angles sur une ligne droite.` },
  point: { en: (L) => `${L} is not at a point where three or more angles make a full turn.`, fr: (L) => `${L} n’est pas à un point où trois angles ou plus font un tour complet.` },
  opp: { en: (L) => `Vertically opposite angles are across an X from each other, where two straight lines cross. ${L} has no angle across an X.`, fr: (L) => `Les angles opposés par le sommet sont face à face dans un X, là où deux droites se croisent. ${L} n’a pas d’angle en face dans un X.` },
  corr: { en: (L) => `Corresponding angles are in the same place at two crossings, in an F, on parallel lines. ${L} is not in an F.`, fr: (L) => `Les angles correspondants sont à la même place à deux croisements, dans un F, sur des droites parallèles. ${L} n’est pas dans un F.` },
  alt: { en: (L) => `Alternate angles are between the parallel lines, on opposite sides of the line across, in a Z. ${L} is not in a Z.`, fr: (L) => `Les angles alternes-internes sont entre les parallèles, de chaque côté de la sécante, dans un Z. ${L} n’est pas dans un Z.` },
  side: { en: (L) => `This fact is for two angles between the parallel lines, on the same side of the line across. ${L} is not one of them.`, fr: (L) => `Cette propriété parle de deux angles entre les parallèles, du même côté de la sécante. ${L} n’en fait pas partie.` },
  tri: { en: (L) => `${L} is not a corner of a triangle.`, fr: (L) => `${L} n’est pas un coin d’un triangle.` },
  quad: { en: (L) => `${L} is not a corner of a quadrilateral.`, fr: (L) => `${L} n’est pas un coin d’un quadrilatère.` },
  para: { en: (L) => `${L} is not a corner of a parallelogram.`, fr: (L) => `${L} n’est pas un coin d’un parallélogramme.` },
};

/* ------------------------------------------------------------------ relations read off the figure */

const raySame = (a, b) => a.line === b.line && a.sign === b.sign;
const dirEq = (a, b) => Math.abs(norm(a - b)) < 1e-6 || Math.abs(norm(a - b) - 360) < 1e-6;

/** The sectors from ray A anticlockwise to ray B at vertex v (keys), and their total. */
function sweep(F, v, A, B) {
  const k0 = v.rays.findIndex((r) => raySame(r, A));
  const k1 = v.rays.findIndex((r) => raySame(r, B));
  if (k0 < 0 || k1 < 0) return null;
  const keys = [];
  let size = 0;
  for (let k = k0; k !== k1; k = (k + 1) % v.rays.length) { keys.push(v.sectors[k]); size += F.sectors[v.sectors[k]].size; }
  return { keys, size };
}
/** The angle (< 180°) between two rays at v: the sectors inside it. */
function between(F, v, A, B) {
  const a = sweep(F, v, A, B);
  const b = sweep(F, v, B, A);
  if (!a || !b) return null;
  return a.size < b.size ? a : b;
}
const rayToward = (F, v, lineId, Q) => {
  const L = F.lineById[lineId];
  const d = norm(L.dir);
  const s = (Q[0] - v.P[0]) * Math.cos((d * Math.PI) / 180) + (Q[1] - v.P[1]) * Math.sin((d * Math.PI) / 180);
  const sign = s > 0 ? 1 : -1;
  return v.rays.find((r) => r.line === lineId && r.sign === sign) || null;
};
const meetVertex = (F, a, b) => F.verts.find((v) => v.lines.includes(a) && v.lines.includes(b)) || null;
const parallelDeclared = (A, B) => A.par && B.par && A.par === B.par && dirEq(norm(A.dir) % 180, norm(B.dir) % 180);

/** Every relation the drawing makes: { kind, terms: { key: coef }, total, lines, vertex?, poly? }. */
export function relationsOf(F) {
  const out = [];
  const seen = new Set();
  const add = (r) => {
    // An equality is the same fact either way round: keep the first key positive.
    const first = Object.keys(r.terms).sort()[0];
    if (r.total === 0 && r.terms[first] < 0) r = { ...r, terms: Object.fromEntries(Object.entries(r.terms).map(([k, c]) => [k, -c])) };
    const sig =`${r.kind}|${Object.entries(r.terms).sort().map(([k, c]) => `${k}${c}`).join(',')}|${r.total}`;
    if (seen.has(sig)) return;
    seen.add(sig);
    out.push({ id: `r${out.length}`, ...r });
  };
  const sumOf = (lists, total, base) => {
    const terms = {};
    for (const l of lists) for (const k of l) terms[k] = (terms[k] || 0) + 1;
    return { ...base, terms, total };
  };
  for (const v of F.verts) {
    // A straight line through v: the angles on each side.
    for (const id of v.lines) {
      const plus = v.rays.find((r) => r.line === id && r.sign === 1);
      const minus = v.rays.find((r) => r.line === id && r.sign === -1);
      if (!plus || !minus) continue;
      for (const [A, B] of [[plus, minus], [minus, plus]]) {
        const sw = sweep(F, v, A, B);
        if (sw && sw.keys.length >= 2) add(sumOf([sw.keys], 180, { kind: 'line', lines: [id], vertex: v.id }));
      }
    }
    // Around a point: three angles or more.
    if (v.sectors.length >= 3) add(sumOf([v.sectors], 360, { kind: 'point', lines: [...v.lines], vertex: v.id }));
    // Vertically opposite: a sector between two rays and the one between their opposites.
    for (const k of v.sectors) {
      const s = F.sectors[k];
      const [A, B] = s.rays;
      if (A.line === B.line) continue;
      const k2 = v.sectors.find((x) => {
        const t = F.sectors[x];
        return t.rays[0].line === A.line && t.rays[0].sign === -A.sign && t.rays[1].line === B.line && t.rays[1].sign === -B.sign;
      });
      if (k2 && k2 !== k) add({ kind: 'opp', terms: { [k]: 1, [k2]: -1 }, total: 0, lines: [A.line, B.line], vertex: v.id });
    }
  }
  // Two parallel lines (arrows) and a line across both.
  const L = F.lines;
  for (let i = 0; i < L.length; i += 1) {
    for (let j = i + 1; j < L.length; j += 1) {
      if (!parallelDeclared(L[i], L[j])) continue;
      for (const T of L) {
        if (T === L[i] || T === L[j]) continue;
        const V1 = meetVertex(F, L[i].id, T.id);
        const V2 = meetVertex(F, L[j].id, T.id);
        if (!V1 || !V2 || V1 === V2) continue;
        const toward = rayToward(F, V1, T.id, V2.P);
        const back = rayToward(F, V2, T.id, V1.P);
        if (!toward || !back) continue;
        const pairsAt = (v, rail) => v.sectors.map((k) => F.sectors[k]).filter((s) => {
          if (s.size > 180) return false;
          const ls = s.rays.map((r) => r.line);
          return ls.includes(rail) && ls.includes(T.id);
        }).map((s) => ({ key: s.key, rail: s.rays.find((r) => r.line === rail), cross: s.rays.find((r) => r.line === T.id) }));
        const P1 = pairsAt(V1, L[i].id);
        const P2 = pairsAt(V2, L[j].id);
        for (const a of P1) {
          for (const b of P2) {
            const lines = [L[i].id, L[j].id, T.id];
            if (dirEq(a.rail.dir, b.rail.dir) && dirEq(a.cross.dir, b.cross.dir)) {
              add({ kind: 'corr', terms: { [a.key]: 1, [b.key]: -1 }, total: 0, lines, pair: [V1.id, V2.id] });
            }
            const inA = raySame(a.cross, toward);
            const inB = raySame(b.cross, back);
            if (inA && inB && dirEq(a.rail.dir, b.rail.dir + 180)) add({ kind: 'alt', terms: { [a.key]: 1, [b.key]: -1 }, total: 0, lines, pair: [V1.id, V2.id] });
            if (inA && inB && dirEq(a.rail.dir, b.rail.dir)) add({ kind: 'side', terms: { [a.key]: 1, [b.key]: 1 }, total: 180, lines, pair: [V1.id, V2.id] });
          }
        }
      }
    }
  }
  // Triangles: three lines meeting in three different vertices.
  const corner = (v, a, b, Pa, Pb) => {
    const A = rayToward(F, v, a, Pa);
    const B = rayToward(F, v, b, Pb);
    return A && B ? between(F, v, A, B) : null;
  };
  for (let i = 0; i < L.length; i += 1) {
    for (let j = i + 1; j < L.length; j += 1) {
      for (let k = j + 1; k < L.length; k += 1) {
        const [a, b, c] = [L[i].id, L[j].id, L[k].id];
        const A = meetVertex(F, a, b), B = meetVertex(F, b, c), C = meetVertex(F, c, a);
        if (!A || !B || !C || A === B || B === C || C === A) continue;
        const ca = corner(A, b, a, B.P, C.P), cb = corner(B, c, b, C.P, A.P), cc = corner(C, a, c, A.P, B.P);
        if (!ca || !cb || !cc || !same(ca.size + cb.size + cc.size, 180)) continue;
        add(sumOf([ca.keys, cb.keys, cc.keys], 180, { kind: 'tri', lines: [a, b, c], poly: [A.id, B.id, C.id] }));
      }
    }
  }
  // Quadrilaterals: four lines in a ring, a convex shape. And parallelograms.
  for (let i = 0; i < L.length; i += 1) for (let j = i + 1; j < L.length; j += 1) for (let k = j + 1; k < L.length; k += 1) for (let m = k + 1; m < L.length; m += 1) {
    const four = [L[i], L[j], L[k], L[m]];
    for (const ord of [[0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3]]) {
      const ls = ord.map((x) => four[x]);
      const V = ls.map((l, n) => meetVertex(F, l.id, ls[(n + 1) % 4].id));
      if (V.some((v) => !v) || new Set(V).size !== 4) continue;
      const P = V.map((v) => v.P);
      const cr = P.map((p, n) => {
        const q = P[(n + 1) % 4], r = P[(n + 2) % 4];
        return (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0]);
      });
      if (!(cr.every((x) => x > 1e-6) || cr.every((x) => x < -1e-6))) continue;
      // corner n sits between line n (back to V[n-1]) and line n+1 (on to V[n+1])
      const cs = V.map((v, n) => corner(v, ls[n].id, ls[(n + 1) % 4].id, P[(n + 3) % 4], P[(n + 1) % 4]));
      if (cs.some((x) => !x) || !same(cs.reduce((s, x) => s + x.size, 0), 360)) continue;
      add(sumOf(cs.map((x) => x.keys), 360, { kind: 'quad', lines: ls.map((l) => l.id), poly: V.map((v) => v.id) }));
      if (parallelDeclared(ls[0], ls[2]) && parallelDeclared(ls[1], ls[3])) {
        for (const [p, q] of [[0, 2], [1, 3]]) {
          const terms = {};
          for (const key of cs[p].keys) terms[key] = (terms[key] || 0) + 1;
          for (const key of cs[q].keys) terms[key] = (terms[key] || 0) - 1;
          add({ kind: 'para', terms, total: 0, lines: ls.map((l) => l.id), poly: V.map((v) => v.id), corners: [V[p].id, V[q].id] });
        }
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ the model */

/** Everything about one item, derived. Throws on an item that cannot be drawn or solved. */
export function chaseModel(item, facts = FACT_KINDS, { guidedUpTo = GUIDED_UP_TO } = {}) {
  if (!item?.id) throw new Error('an item needs an id');
  const F = buildFigure(item.fig);
  const marks = {};
  for (const mk of item.fig.marks || []) {
    const v = vertexOf(F, mk.at);
    if (!v) throw new Error(`mark at "${mk.at}": no vertex where those lines meet`);
    const s = sectorToward(F, v, mk.toward);
    if (!s) throw new Error(`mark at "${mk.at}" toward ${mk.toward}: no angle there`);
    if (marks[s.key]) throw new Error(`two marks on one angle at "${mk.at}"`);
    const show = mk.show;
    if (show === 'R') { if (s.size !== 90) throw new Error(`mark at "${mk.at}": a small square on a ${s.size}° angle`); }
    else if (typeof show === 'number') { if (show !== s.size) throw new Error(`mark at "${mk.at}" shows ${show}°, but the lines make ${s.size}°`); }
    else if (!isLetter(show)) throw new Error(`mark at "${mk.at}": show a number, 'R' or one lower-case letter`);
    marks[s.key] = { key: s.key, show, mark: mk };
  }
  // Variables: a letter (all its angles), or one unmarked angle (a possible stepping stone).
  const vars = {};
  const varOf = {};
  for (const key of Object.keys(F.sectors)) {
    const mk = marks[key];
    if (mk && !isLetter(mk.show)) continue;
    const name = mk ? mk.show : `?${key}`;
    if (!vars[name]) vars[name] = { name, letter: mk ? mk.show : null, keys: [], value: F.sectors[key].size };
    if (!same(vars[name].value, F.sectors[key].size)) throw new Error(`letter ${name} is on angles of different sizes (${vars[name].value}° and ${F.sectors[key].size}°)`);
    vars[name].keys.push(key);
    varOf[key] = name;
  }
  const letters = Object.keys(vars).filter((n) => vars[n].letter).sort();
  if (!letters.length) throw new Error('nothing to find: give an angle a letter');
  const constOf = (key) => (varOf[key] ? null : F.sectors[key].size);
  const rels = relationsOf(F).filter((r) => facts.includes(r.kind)).map((r) => {
    const coef = {};
    let rhs = r.total;
    for (const [key, c] of Object.entries(r.terms)) {
      const k = constOf(key);
      if (k != null) rhs -= c * k;
      else coef[varOf[key]] = (coef[varOf[key]] || 0) + c;
    }
    for (const n of Object.keys(coef)) if (coef[n] === 0) delete coef[n];
    return { ...r, coef, rhs };
  }).filter((r) => Object.keys(r.coef).length);

  const model = { id: item.id, level: item.level || 1, F, marks, vars, varOf, letters, rels, facts, context: item.context || null };
  model.guided = item.guided ?? model.level <= guidedUpTo;
  model.plan = planOf(model);
  return model;
}

/** Relations that find `name` now, given the known variables. */
export function readyFor(m, name, known) {
  return m.rels.filter((r) => r.coef[name] && Object.keys(r.coef).every((n) => n === name || known.has(n)));
}
export const findable = (m, name, known) => !known.has(name) && readyFor(m, name, known).length > 0;

/**
 * The guided order: the first letter (alphabetically) that can be found; when
 * none can, the unmarked angle that unlocks a letter soonest. Throws if the
 * letters cannot all be found with the unit's facts.
 */
export function planOf(m) {
  const known = new Set();
  const plan = [];
  for (let guard = 0; guard < 40 && m.letters.some((l) => !known.has(l)); guard += 1) {
    const L = m.letters.find((l) => findable(m, l, known));
    if (L) { plan.push(L); known.add(L); continue; }
    const stones = Object.keys(m.vars).filter((n) => !m.vars[n].letter && findable(m, n, known));
    if (!stones.length) throw new Error(`cannot be solved with ${m.facts.join(', ')}: ${m.letters.filter((l) => !known.has(l)).join(', ')} left`);
    const unlocks = (s) => { const k = new Set([...known, s]); return m.letters.filter((l) => !k.has(l) && findable(m, l, k)).length; };
    stones.sort((a, b) => unlocks(b) - unlocks(a) || a.localeCompare(b));
    plan.push(stones[0]);
    known.add(stones[0]);
  }
  return plan;
}

/** The unmarked angles worth tapping now (they can be found, and they lead to a letter). */
export function usefulStones(m, known) {
  return Object.keys(m.vars).filter((n) => {
    if (m.vars[n].letter || !findable(m, n, known)) return false;
    const k = new Set([...known, n]);
    return m.letters.some((l) => !k.has(l) && findable(m, l, k));
  });
}

/* ------------------------------------------------------------------ one step: the fact, then the size */

const nameOf = (m, n) => (m.vars[n]?.letter || '?');
const listOf = (xs, lang) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${lang === 'fr' ? 'et' : 'and'} ${xs[xs.length - 1]}`);

/** The fact the student chose for `name`: { ok, rel } or { ok: false, code, en, fr }. */
export function diagnoseFact(m, name, kind, known) {
  const L = nameOf(m, name);
  const ready = readyFor(m, name, known).filter((r) => r.kind === kind);
  if (ready.length) {
    ready.sort((a, b) => Object.keys(a.coef).length - Object.keys(b.coef).length || Object.keys(a.terms).length - Object.keys(b.terms).length);
    return { ok: true, rel: ready[0] };
  }
  const blocked = m.rels.filter((r) => r.kind === kind && r.coef[name]);
  if (blocked.length) {
    const unknown = [...new Set(blocked.flatMap((r) => Object.keys(r.coef).filter((n) => n !== name && !known.has(n))))];
    const ls = unknown.filter((n) => m.vars[n].letter).map((n) => m.vars[n].letter);
    const en = ls.length
      ? `That is true for ${L}, but it also needs ${listOf(ls, 'en')}, and you do not know ${ls.length > 1 ? 'them' : 'it'} yet. Try another fact.`
      : `That is true for ${L}, but it also needs an angle you do not know yet. Try another fact.`;
    const fr = ls.length
      ? `C’est vrai pour ${L}, mais il faut aussi ${listOf(ls, 'fr')}, et tu ne ${ls.length > 1 ? 'les' : 'le'} connais pas encore. Essaie une autre propriété.`
      : `C’est vrai pour ${L}, mais il faut aussi un angle que tu ne connais pas encore. Essaie une autre propriété.`;
    return { ok: false, code: 'blocked', en, fr };
  }
  if (['corr', 'alt', 'side'].includes(kind) && !m.F.lines.some((l) => l.par)) {
    return { ok: false, code: 'noarrows', en: 'There are no arrows, so you cannot tell if any lines are parallel. F and Z only work on parallel lines.', fr: 'Il n’y a pas de flèches, donc on ne peut pas savoir si des droites sont parallèles. F et Z ne marchent que sur des parallèles.' };
  }
  return { ok: false, code: 'none', en: NOT_THERE[kind].en(L), fr: NOT_THERE[kind].fr(L) };
}

/** The working of one step, ready to show: the sum, the parts, the answer. */
export function workingOf(m, name, rel, known, found) {
  const k = rel.coef[name];
  const others = Object.keys(rel.coef).filter((n) => n !== name);
  const val = (n) => found[n] ?? m.vars[n].value;
  const answer = m.vars[name].value;
  // The known angles in the fact, as they appear on the picture (numbers and found letters).
  const parts = [];
  for (const [key, c] of Object.entries(rel.terms)) {
    const v = m.varOf[key];
    if (v === name) continue;
    parts.push({ key, c, value: v ? val(v) : m.F.sectors[key].size, name: v ? nameOf(m, v) : null });
  }
  const equal = EQUAL_KINDS.includes(rel.kind);
  if (equal) return { equal, k: 1, parts, total: 0, sum: parts[0]?.value ?? answer, rest: answer, answer, others };
  const sum = parts.reduce((s, p) => s + p.value, 0);
  return { equal, k, parts, total: rel.total, sum, rest: rel.total - sum, answer, others };
}

/** Every named wrong size for one step: [{ code, value, angle? }]. */
export function slipsOf(m, name, rel, known, found) {
  const w = workingOf(m, name, rel, known, found);
  const out = [];
  const push = (code, value, extra = {}) => {
    if (!Number.isFinite(value) || value <= 0 || same(value, w.answer) || out.some((x) => same(x.value, value))) return;
    out.push({ code, value: Number(value.toFixed(4)), ...extra });
  };
  if (w.equal) {
    push('supp', 180 - w.answer);
    push('full', 360 - w.answer);
  } else {
    const other = w.total === 180 ? 360 : 180;
    // One known angle on a line: typing it again says "they are equal", not "I forgot to subtract".
    if (w.parts.length === 1 && ['line', 'side'].includes(rel.kind)) push('equal', w.parts[0].value, { angle: w.parts[0].value });
    push('noSub', w.sum);
    push('wrongTotal', (other - w.sum) / w.k, { total: other });
    if (w.k > 1) push('noShare', w.rest);
    if (w.parts.length >= 2) for (const p of w.parts) push('forgot', (w.total - (w.sum - p.value)) / w.k, { angle: p.value });
    if (['line', 'side', 'tri'].includes(rel.kind)) for (const p of w.parts) push('equal', p.value, { angle: p.value });
  }
  for (const n of m.letters) if (n !== name) push('otherLetter', m.vars[n].value, { letter: n });
  return out;
}

const KIND_EQUAL_NAME = {
  opp: { en: 'Vertically opposite angles', fr: 'Les angles opposés par le sommet' },
  corr: { en: 'Corresponding angles', fr: 'Les angles correspondants' },
  alt: { en: 'Alternate angles', fr: 'Les angles alternes-internes' },
  para: { en: 'Opposite angles in a parallelogram', fr: 'Les angles opposés d’un parallélogramme' },
};
const TOTAL_PLACE = {
  line: { en: 'on a straight line', fr: 'sur une ligne droite' },
  point: { en: 'around a point', fr: 'autour d’un point' },
  side: { en: 'between the parallel lines on the same side', fr: 'entre les parallèles, du même côté' },
  tri: { en: 'in a triangle', fr: 'dans un triangle' },
  quad: { en: 'in a quadrilateral', fr: 'dans un quadrilatère' },
};

/** The size typed for `name` with fact `rel`: { ok } or { ok: false, code, en, fr } (or { soft } for not-a-number). */
export function diagnoseSize(m, name, rel, typed, known, found) {
  const s = String(typed ?? '').replace(/°|degrees?|deg/gi, '').trim();
  if (!s) return { soft: true, en: 'Type a number of degrees.', fr: 'Écris un nombre de degrés.' };
  if (/^\d+,\d+$/.test(s)) return { soft: true, en: 'Use a point, not a comma, for a decimal.', fr: 'Utilise un point, pas une virgule, pour un décimal.' };
  if (!/^\d+(\.\d+)?$/.test(s)) return { soft: true, en: 'Type just the number, like 52.', fr: 'Écris seulement le nombre, comme 52.' };
  const v = Number(s);
  const w = workingOf(m, name, rel, known, found);
  if (same(v, w.answer)) return { ok: true, v };
  const L = nameOf(m, name);
  const T = deg(w.total);
  const hit = slipsOf(m, name, rel, known, found).find((x) => same(x.value, v));
  const kn = KIND_EQUAL_NAME[rel.kind];
  const pl = TOTAL_PLACE[rel.kind];
  const say = (en, fr) => ({ ok: false, code: hit?.code || 'arith', en, fr });
  switch (hit?.code) {
    case 'supp': return say(`${kn.en} are EQUAL. They do not add up to 180°.`, `${kn.fr} sont ÉGAUX. Ils ne font pas 180° en tout.`);
    case 'full': return say(`${kn.en} are EQUAL: ${L} is the same size as ${deg(w.sum)}.`, `${kn.fr} sont ÉGAUX : ${L} a la même taille que ${deg(w.sum)}.`);
    case 'noSub': return w.parts.length === 1
      ? say(`${deg(w.sum)} is the angle you know. Now take it away from ${T}.`, `${deg(w.sum)}, c’est l’angle que tu connais. Maintenant, enlève-le de ${T}.`)
      : say(`${deg(w.sum)} is the angles you know, added up. Now take it away from ${T}.`, `${deg(w.sum)}, c’est le total des angles que tu connais. Maintenant, enlève-le de ${T}.`);
    case 'wrongTotal': return say(`Check the total: the angles ${pl.en} add up to ${T}, not ${deg(hit.total)}.`, `Vérifie le total : les angles ${pl.fr} font ${T} en tout, pas ${deg(hit.total)}.`);
    case 'noShare': return say(`${deg(w.rest)} is shared between the ${w.k} angles called ${L}. Divide by ${w.k}.`, `${deg(w.rest)} se partage entre les ${w.k} angles appelés ${L}. Divise par ${w.k}.`);
    case 'forgot': return say(`You left out ${deg(hit.angle)}. Add every angle you know ${pl.en}.`, `Tu as oublié ${deg(hit.angle)}. Additionne tous les angles que tu connais ${pl.fr}.`);
    case 'equal': return say(`These angles are not equal: they add up to ${T}. Take ${deg(w.sum)} away from ${T}.`, `Ces angles ne sont pas égaux : ils font ${T} en tout. Enlève ${deg(w.sum)} de ${T}.`);
    case 'otherLetter': return say(`${deg(v)} is the size of ${hit.letter}, not ${L}.`, `${deg(v)}, c’est la taille de ${hit.letter}, pas de ${L}.`);
    default:
      return w.equal
        ? say(`${L} is the same size as ${deg(w.sum)}.`, `${L} a la même taille que ${deg(w.sum)}.`)
        : say(`Check the working: ${T} − ${deg(w.sum)} = ?`, `Vérifie le calcul : ${T} − ${deg(w.sum)} = ?`);
  }
}

/* ------------------------------------------------------------------ what is shown */

const fmt = (v) => (Number.isInteger(v) ? String(v) : String(Number(v.toFixed(2))));
/** The working as the book wants it, in plain text: "a = 180° − (64° + 49°) = 67°". */
export function workingLine(m, name, rel, known, found) {
  const w = workingOf(m, name, rel, known, found);
  const L = nameOf(m, name);
  if (w.equal) return `${L} = ${fmt(w.answer)}°`;
  const ps = w.parts.map((p) => `${fmt(p.value)}°`);
  const inner = ps.length === 1 ? ps[0] : `(${ps.join(' + ')})`;
  if (w.k > 1) return `${w.k}${L} = ${fmt(w.total)}° − ${inner} = ${fmt(w.rest)}°, so ${L} = ${fmt(w.rest)}° ÷ ${w.k} = ${fmt(w.answer)}°`;
  if (ps.length === 1) return `${L} = ${fmt(w.total)}° − ${ps[0]} = ${fmt(w.answer)}°`;
  return `${L} = ${fmt(w.total)}° − ${inner} = ${fmt(w.total)}° − ${fmt(w.sum)}° = ${fmt(w.answer)}°`;
}
/** The frame shown before the size is typed: the sum to do, with a box for the answer. */
export function frameOf(m, name, rel, known, found, full) {
  const w = workingOf(m, name, rel, known, found);
  const L = nameOf(m, name);
  if (!full) return { lhs: `${L} =`, hint: null };
  if (w.equal) return { lhs: `${L} =`, hint: { en: `the same size as ${fmt(w.sum)}°`, fr: `la même taille que ${fmt(w.sum)}°` } };
  const ps = w.parts.map((p) => `${fmt(p.value)}°`);
  const body = ps.length === 1 ? `${fmt(w.total)}° − ${ps[0]}` : `${fmt(w.total)}° − (${ps.join(' + ')})`;
  if (w.k > 1) return { lhs: `${L} = (${body}) ÷ ${w.k} =`, hint: null };
  return { lhs: `${L} = ${body} =`, hint: null };
}
/** The reason, as a sentence. */
export const reasonOf = (rel) => FACT_WORDS[rel.kind];
/** The instruction above the diagram, in the Workbook's words. */
export function questionOf(m) {
  return m.letters.length > 1
    ? { en: 'Work out the size of each angle with a letter. Give a reason for each.', fr: 'Calcule la taille de chaque angle qui a une lettre. Donne une raison pour chacun.' }
    : { en: 'Work out the size of the angle with a letter. Give a reason.', fr: 'Calcule la taille de l’angle qui a une lettre. Donne une raison.' };
}
/** What to light for a relation: its angles (not the target's), the rays that bound them, and its shape. */
export function litOf(model, rel, target) {
  if (!rel) return null;
  const F = model.F;
  const keys = Object.keys(rel.terms);
  const others = keys.filter((k) => model.varOf[k] !== target);
  const segs = [];
  const ray = (v, d, r = 112) => [v.px, atPx(v.px, r, d)];
  if (rel.kind === 'line') {
    const v = F.vertById[rel.vertex];
    const L = F.lineById[rel.lines[0]];
    segs.push([atPx(v.px, 140, L.dir + 180), atPx(v.px, 140, L.dir)]);
  } else if (rel.kind === 'tri' || rel.kind === 'quad' || rel.kind === 'para') {
    const pts = rel.poly.map((id) => F.vertById[id].px);
    segs.push([...pts, pts[0]]);
    return { keys: others, segs, poly: pts };
  } else {
    for (const k of keys) {
      const s = F.sectors[k];
      const v = F.vertById[s.vertex];
      for (const r of s.rays) segs.push(ray(v, r.dir));
    }
    if (rel.pair) segs.push(rel.pair.map((id) => F.vertById[id].px));
  }
  return { keys: others, segs, poly: null };
}
export { deg, fmt };
