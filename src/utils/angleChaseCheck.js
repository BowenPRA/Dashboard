// src/utils/angleChaseCheck.js
//
// The proof of Find Every Angle (utils/angleChase.js), run by `npm run
// validate` at the @@U05_1_CHECK@@ marker on every unit with an `angleChase`.
// For every item it builds the picture, checks each printed number against
// the angle the lines really make, solves every letter with the unit's facts
// (in the letters' own order when the item is guided), walks each step with
// its right size (accepted) and each named slip's value (named by its own
// code), and refuses a picture a student could not read: a label off the
// picture, two labels on top of each other, a label on a line, an angle too
// thin to label, two crossings too close together.

import { chaseModel, FACT_KINDS, readyFor, diagnoseFact, diagnoseSize, slipsOf } from './angleChase.js';
import { wedgeOf, labelBox, arrowsOf, norm } from './angleChaseGeom.js';

const segDist = ([x, y], [ax, ay], [bx, by]) => {
  const vx = bx - ax, vy = by - ay;
  const t = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy || 1)));
  return Math.hypot(x - (ax + t * vx), y - (ay + t * vy));
};

function proveFigure(m, keys, out) {
  const F = m.F;
  const SLOT = labelBox('000°');
  const ws = keys.map((k) => wedgeOf(F, k));
  for (const w of ws) {
    const s = F.sectors[w.key];
    const shown = m.marks[w.key]?.show;
    if (shown !== 'R' && s.size < 20) out.push(`the ${s.size}° angle at ${w.vertex} is too thin to label (20° or more)`);
    const [x, y] = w.label;
    const B = w.labelBox;
    if (x - B.w / 2 < 2 || x + B.w / 2 > F.W - 2 || y - B.h / 2 < 2 || y + B.h / 2 > F.H - 2) out.push(`the label of the ${s.size}° angle at ${w.vertex} leaves the picture`);
    for (const L of F.lines) {
      const r = (L.dir * Math.PI) / 180;
      const ext = Math.abs(Math.sin(r)) * (B.w / 2) + Math.abs(Math.cos(r)) * (B.h / 2);
      if (segDist(w.label, L.ends[0], L.ends[1]) < ext) out.push(`the label of the ${s.size}° angle at ${w.vertex} sits on line ${L.id}`);
    }
  }
  for (let i = 0; i < ws.length; i += 1) {
    for (let j = i + 1; j < ws.length; j += 1) {
      const a = ws[i].label, b = ws[j].label;
      const gap = (ws[i].labelBox.w + ws[j].labelBox.w) / 2 + 4;
      if (Math.abs(a[0] - b[0]) < gap && Math.abs(a[1] - b[1]) < SLOT.h + 4) out.push(`labels at ${ws[i].vertex} and ${ws[j].vertex} are on top of each other`);
    }
  }
  for (const ar of arrowsOf(F)) {
    for (const w of ws) if (Math.hypot(ar.tip[0] - w.label[0], ar.tip[1] - w.label[1]) < 30) out.push(`an arrow on line ${ar.line} touches a label at ${w.vertex}`);
  }
  for (let i = 0; i < F.verts.length; i += 1) {
    for (let j = i + 1; j < F.verts.length; j += 1) {
      const a = F.verts[i].px, b = F.verts[j].px;
      if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 70) out.push(`crossings ${F.verts[i].id} and ${F.verts[j].id} are too close together to label`);
    }
  }
}

/** Problems with one item, as strings. Empty when it is proved. */
export function proveChaseItem(item, facts, opts = {}) {
  const out = [];
  let m;
  try { m = chaseModel(item, facts, opts); } catch (e) { return [e.message]; }
  for (const mk of item.fig.marks || []) {
    const v = m.F.verts.find((x) => String(mk.at).trim().split(/\s+/).every((id) => x.lines.includes(id)));
    if (v && v.rays.some((r) => Math.abs(norm(mk.toward - r.dir + 180) - 180) < 4)) out.push(`mark at "${mk.at}" toward ${mk.toward} is within 4° of a line: point it into the angle`);
  }
  if (m.letters.length > 6) out.push('more than six letters in one picture');
  if (m.guided) {
    const ls = m.plan.filter((n) => m.vars[n].letter);
    if (ls.join('') !== m.letters.join('')) out.push(`guided, but the letters can only be found in the order ${ls.join(', ')}: name them in that order`);
  }
  // Every angle that will carry a label at some point: the marks and the stepping stones.
  const labelled = [...Object.keys(m.marks), ...m.plan.filter((n) => !m.vars[n].letter).flatMap((n) => m.vars[n].keys)];
  proveFigure(m, [...new Set(labelled)], out);
  // Walk the plan: every way that works is accepted, every slip is named by its own code.
  const known = new Set();
  const found = {};
  for (const name of m.plan) {
    const ready = readyFor(m, name, known);
    if (!ready.length) { out.push(`${name}: cannot be found when its turn comes`); break; }
    for (const kind of facts) {
      const d = diagnoseFact(m, name, kind, known);
      const should = ready.some((r) => r.kind === kind);
      if (d.ok !== should) out.push(`${name}: the fact "${kind}" is ${d.ok ? 'accepted' : 'refused'} but ${should ? 'works' : 'does not'}`);
      if (!d.ok && !(d.en && d.fr)) out.push(`${name}: "${kind}" refused with no message`);
    }
    for (const rel of ready) {
      const ok = diagnoseSize(m, name, rel, String(m.vars[name].value), known, found);
      if (!ok.ok) out.push(`${name}: its own size ${m.vars[name].value} is refused (${rel.kind})`);
      for (const sl of slipsOf(m, name, rel, known, found)) {
        const d = diagnoseSize(m, name, rel, String(sl.value), known, found);
        if (d.ok || d.code !== sl.code) out.push(`${name} (${rel.kind}): the slip ${sl.code} (${sl.value}) comes back as ${d.ok ? 'right' : d.code}`);
      }
    }
    known.add(name);
    found[name] = m.vars[name].value;
  }
  if (item.context && !item.contextFr) out.push('a context needs its contextFr');
  return out;
}

/** Problems with a unit's angleChase, as strings. */
export function checkAngleChaseConfig(cfg) {
  const out = [];
  if (!cfg?.title || !cfg?.titleFr) out.push('needs a title and a titleFr');
  if (cfg?.intro && !cfg.introFr) out.push('intro needs an introFr');
  const facts = cfg?.facts || [];
  if (!facts.length) out.push('needs facts: the reasons on offer');
  if (cfg?.guidedUpTo != null && !Number.isInteger(cfg.guidedUpTo)) out.push('guidedUpTo is a level number');
  for (const f of facts) if (!FACT_KINDS.includes(f)) out.push(`fact "${f}" — one of ${FACT_KINDS.join(', ')}`);
  const items = cfg?.items || [];
  if (!items.length) out.push('has no items');
  const ids = new Set();
  for (const it of items) {
    if (ids.has(it.id)) out.push(`item id ${it.id} is used twice`);
    ids.add(it.id);
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || !lv?.fr) out.push(`item ${it.id}: level ${it.level} needs { en, fr } in levels`);
    for (const p of proveChaseItem(it, facts, { guidedUpTo: cfg.guidedUpTo })) out.push(`item ${it.id}: ${p}`);
  }
  return out;
}
