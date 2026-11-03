/**
 * Name That Energy (ENERGY_SPOT) — the proof. scripts/validate-entry.js calls
 * checkEnergySpotConfig on a unit's `energySpot`; an empty list means every
 * item's right answer is accepted at every stage, every wrong answer gets a
 * slip that is NOT `ok`, every named trap fires on its own wrong answer and
 * only where it fits, and the pictures and pins are where they should be.
 */
import {
  ENERGIES, ENERGY_IDS, STORE_IDS, FAMILIES, FAMILY_IDS, CLUES, CLUE_IDS, TRAPS, TRAP_IDS,
  FAMILY_SLIPS, STORE_SLIPS, LASTS, VERDICTS, VERDICT_IDS, YEAR_SLIPS, REASONS, REASON_SETS,
} from './energySpotData.js';
import {
  roundModel, trapFor, diagnoseLook, diagnoseName, diagnoseFamily, diagnoseQuick, diagnoseScene,
  diagnoseSceneFamilies, diagnoseStores, diagnoseStore, diagnoseYear, diagnoseWhy, answerOf, pinRadius,
} from './energySpot.js';

const KINDS = ['one', 'scene', 'stores', 'lasts'];
const other = (f) => (f === 'store' ? 'transfer' : 'store');

/** The code a wrong energy must get: its trap if one fits, else `other`. */
const expectName = (right, wrong, tags) => trapFor(right, wrong, tags) || 'other';
const expectFamily = (clue) => {
  const { energy, family } = CLUES[clue];
  if (energy === 'thermal') return family === 'store' ? 'heatKept' : 'heatMoving';
  return family === 'transfer' ? 'transferStore' : 'storeTransfer';
};

/** Every wrong answer that can happen in a round, with the code it must get. */
export function slipCases(m) {
  const cases = [];
  const add = (stage, input, code) => cases.push({ stage, input, code });
  if (m.kind === 'one') {
    add('look', m.clue, 'ok');
    for (const c of m.look) {
      if (c !== m.clue) add('look', c, trapFor(m.energy, CLUES[c].energy, m.tags) || 'clue');
    }
    for (const e of ENERGY_IDS) add('name', e, e === m.energy ? 'ok' : expectName(m.energy, e, m.tags));
    for (const f of FAMILY_IDS) add('family', f, f === m.family ? 'ok' : expectFamily(m.clue));
    for (const e of ENERGY_IDS) {
      for (const f of FAMILY_IDS) {
        const code = e !== m.energy ? expectName(m.energy, e, m.tags) : f !== m.family ? expectFamily(m.clue) : 'ok';
        add('quick', { energy: e, family: f }, code);
      }
    }
  } else if (m.kind === 'scene') {
    const right = answerOf(m, 'names');
    add('names', right, 'ok');
    for (const p of m.pins) {
      for (const e of ENERGY_IDS) if (e !== p.energy) add('names', { ...right, [p.id]: e }, expectName(p.energy, e, p.tags));
    }
    const fams = answerOf(m, 'families');
    add('families', fams, 'ok');
    for (const p of m.pins) add('families', { ...fams, [p.id]: other(p.family) }, expectFamily(p.clue));
  } else if (m.kind === 'stores') {
    add('stores', m.stores, 'ok');
    if (!m.stores.includes('sound')) add('stores', [...m.stores, 'sound'], 'soundStore');
    for (const t of ['electrical', 'light']) add('stores', [...m.stores, t], 'transferStore');
    for (const s of STORE_IDS) {
      if (m.stores.includes(s)) continue;
      const trap = m.stores.map((r) => trapFor(r, s)).find(Boolean);
      add('stores', [...m.stores, s], trap || 'notThere');
    }
    for (const s of m.stores) add('stores', m.stores.filter((x) => x !== s), 'missed');
  } else if (m.kind === 'lasts') {
    for (const s of STORE_IDS) add('store', s, s === m.store ? 'ok' : expectName(m.store, s, m.tags));
    for (const v of VERDICT_IDS) add('year', v, v === m.verdict ? 'ok' : YEAR_SLIPS[m.store].code);
    for (const r of m.reasons) add('why', r, r === m.reason ? 'ok' : REASONS[r].trap ? r : 'otherReason');
  }
  return cases;
}

/** Run one case against the engine; the code it gets. */
export function runCase(m, c) {
  const d = {
    look: diagnoseLook, name: diagnoseName, family: diagnoseFamily, quick: diagnoseQuick,
    names: diagnoseScene, families: diagnoseSceneFamilies, stores: diagnoseStores,
    store: diagnoseStore, year: diagnoseYear, why: diagnoseWhy,
  }[c.stage](m, c.input);
  if (d.ok !== (d.code === 'ok')) return `inconsistent (${d.code}, ok=${d.ok})`;
  if (!d.ok && (!d.en || !d.fr)) return `${d.code} with no English or French message`;
  return d.code;
}

const runAll = (m) => slipCases(m).flatMap((c) => {
  let got;
  try { got = runCase(m, c); } catch (e) { got = `error: ${e.message}`; }
  return got === c.code ? [] : [`${c.stage} ${JSON.stringify(c.input)} should be "${c.code}" but the engine says "${got}"`];
});

/** Problems with the engine's own tables (the same for every unit). */
export function checkTables() {
  const out = [];
  const need = (at, o, keys) => { for (const k of keys) if (!o?.[k]) out.push(`${at} has no ${k}`); };
  for (const e of ENERGY_IDS) need(`energy ${e}`, ENERGIES[e], ['en', 'fr', 'family', 'needs', 'needsFr']);
  for (const f of FAMILY_IDS) need(`family ${f}`, FAMILIES[f], ['en', 'fr', 'says', 'saysFr']);
  for (const c of CLUE_IDS) {
    need(`clue ${c}`, CLUES[c], ['en', 'fr', 'energy', 'family']);
    const e = ENERGIES[CLUES[c].energy];
    if (!e) out.push(`clue ${c}: unknown energy`);
    else if (e.family !== 'both' && e.family !== CLUES[c].family) out.push(`clue ${c}: ${CLUES[c].energy} is not a ${CLUES[c].family}`);
  }
  for (const e of ENERGY_IDS) if (!CLUE_IDS.some((c) => CLUES[c].energy === e)) out.push(`energy ${e} has no clue`);
  const pairs = new Set();
  for (const id of TRAP_IDS) {
    const t = TRAPS[id];
    need(`trap ${id}`, t, ['right', 'wrong', 'en', 'fr']);
    if (!ENERGIES[t.right] || !ENERGIES[t.wrong]) out.push(`trap ${id}: unknown energy`);
    if (t.right === t.wrong) out.push(`trap ${id}: right and wrong are the same`);
    const key = `${t.right}>${t.wrong}>${t.needs || ''}`;
    if (pairs.has(key)) out.push(`trap ${id}: another trap has the same answers`);
    pairs.add(key);
    if (String(t.en).length > 130) out.push(`trap ${id}: ${t.en.length} characters — keep it under 130`);
  }
  for (const [k, s] of Object.entries({ ...FAMILY_SLIPS, ...STORE_SLIPS })) need(`slip ${k}`, s, ['en', 'fr']);
  for (const s of Object.keys(LASTS)) {
    if (!STORE_IDS.includes(s)) out.push(`LASTS: ${s} is not a store`);
    need(`year slip ${s}`, YEAR_SLIPS[s], ['code', 'en', 'fr']);
    const set = REASON_SETS[s] || [];
    if (set.length !== 4 || REASONS[set[0]]?.store !== s) out.push(`reasons for ${s}: the first must be its own reason, then three more`);
    for (const r of set) if (!REASONS[r]) out.push(`reasons for ${s}: unknown reason ${r}`);
  }
  if ('elastic' in LASTS) out.push('LASTS must not classify elastic potential (the book does not)');
  for (const v of VERDICT_IDS) need(`verdict ${v}`, VERDICTS[v], ['en', 'fr']);
  for (const [id, r] of Object.entries(REASONS)) need(`reason ${id}`, r, r.trap ? ['en', 'fr', 'why', 'whyFr'] : ['en', 'fr', 'store']);
  return out;
}

const inBox = ([w, h], x, y, pad = 0) => x - pad >= 0 && y - pad >= 0 && x + pad <= w && y + pad <= h;

/** A scene's pins: inside the picture, and no two badges touching. */
function checkPins(m) {
  const out = [];
  const r = pinRadius(m.viewBox);
  for (const p of m.pins) {
    if (!inBox(m.viewBox, p.x, p.y, r)) out.push(`pin ${p.id}: its badge leaves the picture`);
    if (!Array.isArray(p.to) || !inBox(m.viewBox, p.to[0], p.to[1])) out.push(`pin ${p.id}: its leader ends outside the picture`);
  }
  for (let i = 0; i < m.pins.length; i++) {
    for (let j = i + 1; j < m.pins.length; j++) {
      const a = m.pins[i], b = m.pins[j];
      if (Math.hypot(a.x - b.x, a.y - b.y) < 2 * r + 6) out.push(`pins ${a.id} and ${b.id} overlap`);
    }
  }
  return out;
}

/** Problems with a unit's whole `energySpot` config, as strings. */
export function checkEnergySpotConfig(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['energySpot must be an object'];
  if (!cfg.title || (bilingual && !cfg.titleFr)) out.push(`needs a ${bilingual ? 'French ' : ''}title`);
  if (cfg.intro && bilingual && !cfg.introFr) out.push('intro needs introFr');
  for (const e of ENERGY_IDS) if (!String(cfg.poses?.[e] || '').includes('<svg')) out.push(`poses.${e} is not a drawing`);
  const items = cfg.items || [];
  if (items.length < 6) out.push(`has ${items.length} items — at least 6`);
  const ids = new Set();
  const fired = new Set();
  let lastLevel = 0;
  for (const [i, it] of items.entries()) {
    const at = `item ${it?.id || i + 1}`;
    if (!it?.id) out.push(`item ${i + 1} has no id`);
    else if (ids.has(it.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    if (!KINDS.includes(it?.kind)) { out.push(`${at}: kind must be one of ${KINDS.join(', ')}`); continue; }
    if (!Number.isInteger(it.level) || it.level < 1) out.push(`${at}: level must be a whole number ≥ 1`);
    else if (it.level < lastLevel) out.push(`${at}: level ${it.level} comes after level ${lastLevel} — levels only climb`);
    else lastLevel = it.level;
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || (bilingual && !lv.fr)) out.push(`${at}: level ${it.level} has no ${bilingual ? 'English and French ' : ''}name in levels`);
    if (it.kind !== 'scene') {
      if (!it.en || (bilingual && !it.fr)) out.push(`${at}: needs a name in English${bilingual ? ' and French' : ''}`);
      if (!String(cfg.pics?.[it.pic] || '').includes('<svg')) out.push(`${at}: picture "${it.pic}" is not in pics`);
    }
    if (it.kind === 'scene') {
      for (const p of it.pins || []) if (!p.en || (bilingual && !p.fr)) out.push(`${at}: pin ${p.id} needs a name in English${bilingual ? ' and French' : ''}`);
      if ((it.pins || []).length < 3) out.push(`${at}: a scene needs at least 3 pins`);
    }
    if (it.kind === 'stores') {
      for (const c of it.clues || []) if (CLUES[c] && CLUES[c].family !== 'store') out.push(`${at}: clue ${c} is a transfer, not a store`);
      if ((it.clues || []).length < 2) out.push(`${at}: a stores item needs at least 2 stores`);
    }
    let m;
    try { m = roundModel(it, cfg); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    if (m.kind === 'scene') {
      out.push(...checkPins(m).map((p) => `${at}: ${p}`));
      if (!String(m.svg || '').includes('<svg')) out.push(`${at}: scene ${it.scene} is not a drawing`);
    }
    for (const c of slipCases(m)) if (TRAPS[c.code]) fired.add(c.code);
    for (const p of runAll(m)) out.push(`${at}: ${p}`);
  }
  for (const id of TRAP_IDS) if (!fired.has(id)) out.push(`trap ${id} never fires in any item — add an item it fits, or drop it`);
  out.push(...checkTables());
  return out;
}
