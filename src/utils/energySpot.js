/**
 * Name That Energy (ENERGY_SPOT, p89) — derive and mark. Year 7 Science 3.5.
 *
 * An item names a thing (or a scene's pins) and its CLUE; everything else is
 * derived from utils/energySpotData.js: the energy, store or transfer, the
 * Look options, which stores a thing has, whether a store lasts, and the
 * reasons to choose from. Every diagnose* returns { ok, code, en, fr }: `ok`
 * or a named slip. The screen (tasks/EnergySpot.jsx) shows the message and
 * lets the student try again; energySpotCheck.js proves every item.
 *
 *   one     a picture → Look (the clue) → Name (the eight) → Store or transfer?
 *           From level 3 it opens QUICK: the name and the family together.
 *   scene   numbered pins on a drawing → a name for each → store or transfer each
 *   stores  a picture → tap every store it has (the transfers are there too)
 *   lasts   a picture → which store → a year from now? → why
 */
import {
  ENERGIES, ENERGY_IDS, STORE_IDS, FAMILIES, CLUES, CLUE_IDS, TRAPS, TRAP_IDS,
  FAMILY_SLIPS, STORE_SLIPS, LASTS, YEAR_SLIPS, REASONS, REASON_SETS,
} from './energySpotData.js';

/** Items at this level or below walk every stage; above it they open quick. */
export const WALK_UP_TO = 2;

/** A scene's pin badge radius, in its own viewBox units (big enough to read on a wide bus). */
export const pinRadius = ([w, h]) => Math.round(Math.max(w, h) * 0.027);

const OK = { ok: true, code: 'ok' };
const fill = (s, key, val) => String(s).replace(`{${key}}`, val);
const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const clueSaid = (c, lang) => lowerFirst(String(lang === 'fr' ? CLUES[c].fr : CLUES[c].en));

/** A small stable hash, so an item's options come out in the same order every time. */
function hash(str) {
  let h = 2166136261;
  for (const ch of String(str)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const shuffleBy = (seed, list) => [...list]
  .map((v, i) => ({ v, k: hash(`${seed}:${v}:${i}`) }))
  .sort((a, b) => a.k - b.k)
  .map((x) => x.v);

/** The trap for naming `wrong` where `right` is the answer, if one fits this thing. */
export function trapFor(right, wrong, tags = []) {
  return TRAP_IDS.find((id) => {
    const t = TRAPS[id];
    return t.right === right && t.wrong === wrong && (!t.needs || tags.includes(t.needs));
  }) || null;
}

/** A wrong energy named: its trap, or `other` with the clue it would need. */
export function nameSlip(right, wrong, clue, tags = []) {
  const id = trapFor(right, wrong, tags);
  if (id) return { ok: false, code: id, en: TRAPS[id].en, fr: TRAPS[id].fr };
  const w = ENERGIES[wrong];
  return {
    ok: false, code: 'other',
    en: `${w.en} needs ${w.needs}. Look again: ${clueSaid(clue, 'en')}`,
    fr: `${w.fr} : il faut ${w.needsFr}. Regarde encore : ${clueSaid(clue, 'fr')}`,
  };
}

/** Store or transfer chosen wrong, for a thing whose clue is `clue`. */
export function familySlip(clue, chosen) {
  const { energy, family } = CLUES[clue];
  if (chosen === family) return OK;
  if (energy === 'thermal') {
    const s = family === 'store' ? FAMILY_SLIPS.heatKept : FAMILY_SLIPS.heatMoving;
    return { ok: false, code: family === 'store' ? 'heatKept' : 'heatMoving', en: s.en, fr: s.fr };
  }
  const key = family === 'transfer' ? 'transferStore' : 'storeTransfer';
  const s = FAMILY_SLIPS[key];
  return { ok: false, code: key, en: fill(s.en, 'energy', ENERGIES[energy].en), fr: fill(s.fr, 'energy', ENERGIES[energy].fr) };
}

/** The four clues offered at Look: the right one, the clues of its traps, then others. */
export function lookOptions(item) {
  const { energy } = CLUES[item.clue];
  const tags = item.tags || [];
  const partners = TRAP_IDS.filter((id) => TRAPS[id].right === energy && (!TRAPS[id].needs || tags.includes(TRAPS[id].needs)))
    .map((id) => CLUE_IDS.find((c) => CLUES[c].energy === TRAPS[id].wrong));
  const others = shuffleBy(item.id, CLUE_IDS.filter((c) => CLUES[c].energy !== energy && !partners.includes(c)));
  // three wrong clues, each pointing at a different energy
  const wrong = [];
  for (const c of [...partners, ...others]) {
    if (wrong.length < 3 && !wrong.some((w) => CLUES[w].energy === CLUES[c].energy)) wrong.push(c);
  }
  return shuffleBy(`${item.id}:look`, [item.clue, ...wrong]);
}

/** The whole round for one item. `pool` gives the scene's pin positions. */
export function roundModel(item, pool = {}) {
  const base = { id: item.id, level: item.level, kind: item.kind, en: item.en, fr: item.fr, pic: item.pic };
  if (item.kind === 'one') {
    const c = CLUES[item.clue];
    if (!c) throw new Error(`unknown clue ${item.clue}`);
    const walk = item.walk ?? item.level <= WALK_UP_TO;
    return {
      ...base, clue: item.clue, tags: item.tags || [], energy: c.energy, family: c.family, walk,
      stages: walk ? ['look', 'name', 'family'] : ['quick'], look: lookOptions(item),
    };
  }
  if (item.kind === 'scene') {
    const scene = pool.scenes?.[item.scene];
    if (!scene) throw new Error(`unknown scene ${item.scene}`);
    const pins = item.pins.map((p, i) => {
      const c = CLUES[p.clue];
      const at = scene.pins?.[p.id];
      if (!c) throw new Error(`pin ${p.id}: unknown clue ${p.clue}`);
      if (!at) throw new Error(`pin ${p.id}: no position in scene ${item.scene}`);
      return { ...p, n: i + 1, tags: p.tags || [], energy: c.energy, family: c.family, x: at.x, y: at.y, to: at.to };
    });
    return { ...base, scene: item.scene, svg: scene.svg, viewBox: scene.viewBox, pins, stages: ['names', 'families'] };
  }
  if (item.kind === 'stores') {
    const stores = item.clues.map((c) => {
      if (!CLUES[c]) throw new Error(`unknown clue ${c}`);
      return CLUES[c].energy;
    });
    return { ...base, clues: item.clues, stores, stages: ['stores'] };
  }
  if (item.kind === 'lasts') {
    const c = CLUES[item.clue];
    if (!c) throw new Error(`unknown clue ${item.clue}`);
    if (!(c.energy in LASTS)) throw new Error(`lasts is not asked of ${c.energy}`);
    const set = REASON_SETS[c.energy];
    return {
      ...base, clue: item.clue, tags: item.tags || [], store: c.energy, lasts: LASTS[c.energy],
      verdict: LASTS[c.energy] ? 'lasts' : 'gone', reason: set[0], reasons: shuffleBy(`${item.id}:why`, set),
      stages: ['store', 'year', 'why'],
    };
  }
  throw new Error(`unknown kind ${item.kind}`);
}

/* ── marking ────────────────────────────────────────────────────────────── */

export function diagnoseLook(m, clue) {
  if (clue === m.clue) return OK;
  const wrong = CLUES[clue]?.energy;
  const id = trapFor(m.energy, wrong, m.tags);
  if (id) return { ok: false, code: id, en: TRAPS[id].en, fr: TRAPS[id].fr };
  return {
    ok: false, code: 'clue',
    en: `That clue would make it ${ENERGIES[wrong].en.toLowerCase()}. Look at the picture again: what do you see?`,
    fr: `Cet indice donnerait ${ENERGIES[wrong].fr.toLowerCase()}. Regarde encore l’image : que vois-tu ?`,
  };
}

export const diagnoseName = (m, energy) => (energy === m.energy ? OK : nameSlip(m.energy, energy, m.clue, m.tags));
export const diagnoseFamily = (m, family) => familySlip(m.clue, family);

/** Quick: the name and the family together. `opens` says which stages a slip opens. */
export function diagnoseQuick(m, { energy, family } = {}) {
  if (!energy || !family) return { ok: false, soft: true, code: 'missing', en: 'Choose an energy, and store or transfer.', fr: 'Choisis une énergie, et réserve ou transfert.' };
  const n = diagnoseName(m, energy);
  if (!n.ok) return { ...n, opens: family === m.family ? ['look', 'name'] : ['look', 'name', 'family'] };
  const f = diagnoseFamily(m, family);
  return f.ok ? OK : { ...f, opens: ['family'] };
}

/** A scene's names: one result per pin. */
export function diagnoseScene(m, placed = {}) {
  if (m.pins.some((p) => !placed[p.id])) return { ok: false, soft: true, code: 'missing', en: 'Give every pin an energy first.', fr: 'Donne d’abord une énergie à chaque repère.' };
  const per = m.pins.map((p) => (placed[p.id] === p.energy ? { id: p.id, ...OK } : { id: p.id, ...nameSlip(p.energy, placed[p.id], p.clue, p.tags) }));
  const bad = per.find((x) => !x.ok);
  return bad ? { ok: false, code: bad.code, en: bad.en, fr: bad.fr, per } : { ...OK, per };
}

/** A scene's families: one result per pin. */
export function diagnoseSceneFamilies(m, fams = {}) {
  if (m.pins.some((p) => !fams[p.id])) return { ok: false, soft: true, code: 'missing', en: 'Choose store or transfer for every pin.', fr: 'Choisis réserve ou transfert pour chaque repère.' };
  const per = m.pins.map((p) => ({ id: p.id, ...familySlip(p.clue, fams[p.id]) }));
  const bad = per.find((x) => !x.ok);
  return bad ? { ok: false, code: bad.code, en: bad.en, fr: bad.fr, per } : { ...OK, per };
}

/** Which stores does it have? A transfer first, then a wrong store, then one left out. */
export function diagnoseStores(m, picked = []) {
  if (!picked.length) return { ok: false, soft: true, code: 'missing', en: 'Tap every store it has.', fr: 'Touche chaque réserve qu’il a.' };
  const set = new Set(picked);
  if (set.has('sound') && !m.stores.includes('sound')) return { ok: false, code: 'soundStore', en: STORE_SLIPS.soundStore.en, fr: STORE_SLIPS.soundStore.fr };
  const transfer = picked.find((e) => ENERGIES[e].family === 'transfer');
  if (transfer) {
    const s = FAMILY_SLIPS.transferStore;
    return { ok: false, code: 'transferStore', en: fill(s.en, 'energy', ENERGIES[transfer].en), fr: fill(s.fr, 'energy', ENERGIES[transfer].fr) };
  }
  const extra = picked.find((e) => !m.stores.includes(e));
  if (extra) {
    for (const r of m.stores) {
      const id = trapFor(r, extra);
      if (id) return { ok: false, code: id, en: TRAPS[id].en, fr: TRAPS[id].fr };
    }
    const w = ENERGIES[extra];
    return { ok: false, code: 'notThere', en: `${w.en} needs ${w.needs}. Is there one?`, fr: `${w.fr} : il faut ${w.needsFr}. Y en a-t-il ?` };
  }
  const missing = m.clues.find((c) => !set.has(CLUES[c].energy));
  if (missing) {
    return { ok: false, code: 'missed', en: fill(STORE_SLIPS.missed.en, 'clue', clueSaid(missing, 'en')), fr: fill(STORE_SLIPS.missed.fr, 'clue', clueSaid(missing, 'fr')) };
  }
  return OK;
}

export const diagnoseStore = (m, store) => (store === m.store ? OK : nameSlip(m.store, store, m.clue, m.tags));

export function diagnoseYear(m, verdict) {
  if (verdict === m.verdict) return OK;
  const s = YEAR_SLIPS[m.store];
  return { ok: false, code: s.code, en: s.en, fr: s.fr };
}

export function diagnoseWhy(m, reason) {
  if (reason === m.reason) return OK;
  const r = REASONS[reason];
  if (r?.trap) return { ok: false, code: reason, en: r.why, fr: r.whyFr };
  const other = r?.store;
  return {
    ok: false, code: 'otherReason',
    en: `That is true of a ${ENERGIES[other].en.toLowerCase()} store. This one is ${ENERGIES[m.store].en.toLowerCase()}.`,
    fr: `C’est vrai pour une réserve ${ENERGIES[other].fr.toLowerCase()}. Celle-ci est ${ENERGIES[m.store].fr.toLowerCase()}.`,
  };
}

/** The right answer to a stage, to fill it in after a second wrong (or Show me). */
export function answerOf(m, stage) {
  if (stage === 'look') return m.clue;
  if (stage === 'name') return m.energy;
  if (stage === 'family') return m.family;
  if (stage === 'quick') return { energy: m.energy, family: m.family };
  if (stage === 'names') return Object.fromEntries(m.pins.map((p) => [p.id, p.energy]));
  if (stage === 'families') return Object.fromEntries(m.pins.map((p) => [p.id, p.family]));
  if (stage === 'stores') return [...m.stores];
  if (stage === 'store') return m.store;
  if (stage === 'year') return m.verdict;
  if (stage === 'why') return m.reason;
  return null;
}

export { ENERGIES, ENERGY_IDS, STORE_IDS, FAMILIES, CLUES, REASONS };
