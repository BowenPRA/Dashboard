// src/utils/ionicEquation.js
//
// The derivation behind the IONIC_EQ task (Spectator Strike). An item states a
// reaction the ordinary way — formulae, coefficients and STATE SYMBOLS — and
// everything the coursebook's three-step method produces is worked out here:
//
//   1. which substances split into ions      (dissolved ionic compounds and
//                                             acids), and into WHICH ions
//   2. which ions are spectators             (unchanged on both sides)
//   3. the ionic equation that is left       in its simplest whole numbers
//   4. what kind of reaction it is           read off the ions that reacted
//
// so an author cannot ship an ionic equation that does not follow from the
// equation above it. `checkIonicItems` also proves the full equation balances
// for atoms, and the ionic equation for atoms AND charge.
//
// A formula is split by trial: every cation × anion pair in the library, in the
// smallest numbers that are electrically neutral, is tested against the
// formula's own atom count (chemFormula.parseFormula). That is how iron is
// found to be Fe²⁺ in FeSO₄ and Fe³⁺ in FeCl₃ without being told.
import { parseFormula } from './chemFormula.js';

/** The ions of the IGCSE course. `sym` is a formula the atom counter can read. */
export const CATIONS = [
  { sym: 'H', charge: 1, name: 'hydrogen' },
  { sym: 'Li', charge: 1, name: 'lithium' },
  { sym: 'Na', charge: 1, name: 'sodium' },
  { sym: 'K', charge: 1, name: 'potassium' },
  { sym: 'Ag', charge: 1, name: 'silver' },
  { sym: 'NH4', charge: 1, name: 'ammonium' },
  { sym: 'Mg', charge: 2, name: 'magnesium' },
  { sym: 'Ca', charge: 2, name: 'calcium' },
  { sym: 'Ba', charge: 2, name: 'barium' },
  { sym: 'Zn', charge: 2, name: 'zinc' },
  { sym: 'Cu', charge: 2, name: 'copper(II)' },
  { sym: 'Fe', charge: 2, name: 'iron(II)' },
  { sym: 'Pb', charge: 2, name: 'lead(II)' },
  { sym: 'Fe', charge: 3, name: 'iron(III)' },
  { sym: 'Al', charge: 3, name: 'aluminium' },
];
export const ANIONS = [
  { sym: 'Cl', charge: -1, name: 'chloride' },
  { sym: 'Br', charge: -1, name: 'bromide' },
  { sym: 'I', charge: -1, name: 'iodide' },
  { sym: 'OH', charge: -1, name: 'hydroxide' },
  { sym: 'NO3', charge: -1, name: 'nitrate' },
  { sym: 'SO4', charge: -2, name: 'sulfate' },
  { sym: 'CO3', charge: -2, name: 'carbonate' },
  { sym: 'O', charge: -2, name: 'oxide' },
];

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const sameAtoms = (a, b) => {
  const els = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const el of els) if ((a[el] || 0) !== (b[el] || 0)) return false;
  return true;
};
const scaled = (atoms, n) => Object.fromEntries(Object.entries(atoms).map(([el, k]) => [el, k * n]));
const added = (a, b) => {
  const out = { ...a };
  for (const [el, k] of Object.entries(b)) out[el] = (out[el] || 0) + k;
  return out;
};

/** The key an ion is known by: "Na+", "SO4 2-". State is NOT part of it. */
export const ionKey = (ion) => `${ion.sym}${Math.abs(ion.charge) > 1 ? Math.abs(ion.charge) : ''}${ion.charge > 0 ? '+' : '-'}`;

/**
 * Split a formula into its ions: [{ sym, charge, name, n }, { … }], cation
 * first, or null when it is not an ionic compound the library knows.
 */
export function ionsOf(formula) {
  let want;
  try { want = parseFormula(formula); } catch { return null; }
  for (const cat of CATIONS) {
    for (const an of ANIONS) {
      const g = gcd(cat.charge, an.charge);
      const nCat = Math.abs(an.charge) / g;
      const nAn = cat.charge / g;
      const got = added(scaled(parseFormula(cat.sym), nCat), scaled(parseFormula(an.sym), nAn));
      if (sameAtoms(want, got)) return [{ ...cat, n: nCat }, { ...an, n: nAn }];
    }
  }
  return null;
}

const isElement = (formula) => {
  try { return Object.keys(parseFormula(formula)).length === 1; } catch { return false; }
};

/**
 * Does this substance split into ions, and why? The reason is the sentence the
 * student is given when they decide wrongly.
 */
export function splitOf(sp) {
  const ions = ionsOf(sp.formula);
  if (sp.state === 'aq' && ions) {
    const acid = ions[0].sym === 'H';
    return {
      splits: true, ions,
      why: acid
        ? 'It is an acid dissolved in water (aq), so it has split into hydrogen ions and negative ions.'
        : 'It is an ionic compound dissolved in water (aq). Its ions have separated and move about freely.',
    };
  }
  if (sp.split && ions) {
    return {
      splits: true, ions,
      why: sp.splitWhy || 'It does not dissolve, but it is still a lattice of ions — and the acid reacts with those ions one at a time. So its ions are written out, with (s).',
    };
  }
  if (sp.state === 'l') return { splits: false, why: sp.formula === 'H2O' ? 'Water is made of molecules, not free ions. It stays whole.' : 'A liquid made of molecules stays whole.' };
  if (sp.state === 'g') return { splits: false, why: 'A gas is made of molecules. It stays whole.' };
  if (sp.state === 's' && isElement(sp.formula)) return { splits: false, why: 'A solid metal is made of atoms, not separate ions. It stays whole.' };
  if (sp.state === 's') return { splits: false, why: 'A solid stays whole: its ions are held together and cannot move apart.' };
  return { splits: false, why: 'It is dissolved, but it is made of molecules, not ions. It stays whole.' };
}

/**
 * One side written out in full. Each entry is
 *   { key, kind: 'ion' | 'whole', sym | formula, charge, coeff, state, from }
 * Ions of the same kind from different substances are merged.
 */
function writeOut(side) {
  const out = [];
  for (const sp of side) {
    const c = Number(sp.coeff) || 1;
    const s = splitOf(sp);
    if (!s.splits) {
      out.push({ key: `${sp.formula}(${sp.state})`, kind: 'whole', formula: sp.formula, charge: 0, coeff: c, state: sp.state });
      continue;
    }
    for (const ion of s.ions) {
      const key = ionKey(ion);
      const seen = out.find((e) => e.key === key);
      if (seen) seen.coeff += c * ion.n;
      else out.push({ key, kind: 'ion', sym: ion.sym, charge: ion.charge, name: ion.name, coeff: c * ion.n, state: sp.state });
    }
  }
  return out;
}

const atomsOfEntry = (e) => scaled(parseFormula(e.kind === 'ion' ? e.sym : e.formula), e.coeff);
const sideAtoms = (list) => list.reduce((acc, e) => added(acc, atomsOfEntry(e)), {});
const sideCharge = (list) => list.reduce((s, e) => s + e.charge * e.coeff, 0);

/** The kinds of reaction an ionic equation can turn out to be. */
export const REACTION_KINDS = {
  neutralisation: 'Neutralisation — acid + base, giving water',
  metal: 'Acid + metal — hydrogen forms, so NOT a neutralisation',
  carbonate: 'Acid + carbonate — water and carbon dioxide form',
  precipitation: 'Precipitation — two ions join to make an insoluble solid',
  displacement: 'Displacement — one element pushes another out of its compound',
};

function kindOf(net) {
  const has = (list, key) => list.some((e) => e.key === key);
  const L = net.left, R = net.right;
  const acid = has(L, 'H+');
  if (acid && (has(L, 'OH-') || has(L, 'O2-')) && R.some((e) => e.formula === 'H2O')) return 'neutralisation';
  if (acid && L.some((e) => e.key === 'CO32-' || (e.kind === 'whole' && /CO3/.test(e.formula))) && R.some((e) => e.formula === 'CO2')) return 'carbonate';
  if (acid && R.some((e) => e.formula === 'H2') && L.some((e) => e.kind === 'whole' && e.state === 's')) return 'metal';
  if (L.every((e) => e.kind === 'ion') && R.length === 1 && R[0].kind === 'whole' && R[0].state === 's') return 'precipitation';
  if (L.some((e) => e.kind === 'whole' && isElement(e.formula)) && R.some((e) => e.kind === 'whole' && isElement(e.formula))) return 'displacement';
  return null;
}

/**
 * Everything the task asks for.
 *   species   every substance, with `splits`, `ions` and `why`
 *   full      { left, right } — every ion written out
 *   spectators  the keys struck out
 *   net       { left, right } — what is left, NOT yet simplified
 *   factor    the number the net equation can be divided through by
 *   ionic     { left, right } — the ionic equation, simplest whole numbers
 *   kind      a key of REACTION_KINDS
 */
export function deriveIonicItem(item) {
  const tag = (side, where) => side.map((sp, i) => ({ ...sp, coeff: Number(sp.coeff) || 1, id: `${where}${i}`, where, ...splitOf(sp) }));
  const species = [...tag(item.reactants, 'L'), ...tag(item.products, 'R')];
  const full = { left: writeOut(item.reactants), right: writeOut(item.products) };

  const spectators = full.left
    .filter((e) => e.kind === 'ion' && full.right.some((r) => r.kind === 'ion' && r.key === e.key))
    .map((e) => e.key);
  const uneven = spectators.filter((k) => full.left.find((e) => e.key === k).coeff !== full.right.find((e) => e.key === k).coeff);

  // What is left, in the order an ionic equation is written: a substance that
  // stayed whole first, then the hydrogen ion, then the ion it reacts with.
  const rank = (e) => (e.kind === 'whole' ? 0 : e.key === 'H+' ? 1 : 2);
  const keep = (list) => list
    .filter((e) => !(e.kind === 'ion' && spectators.includes(e.key)))
    .map((e, i) => [e, i])
    .sort((p, q) => rank(p[0]) - rank(q[0]) || p[1] - q[1])
    .map(([e]) => e);
  const net = { left: keep(full.left), right: full.right.filter((e) => !(e.kind === 'ion' && spectators.includes(e.key))) };
  const factor = [...net.left, ...net.right].reduce((g, e) => gcd(g, e.coeff), 0) || 1;
  const shrink = (list) => list.map((e) => ({ ...e, coeff: e.coeff / factor }));
  const ionic = { left: shrink(net.left), right: shrink(net.right) };

  return { species, full, spectators, uneven, net, factor, ionic, kind: kindOf(ionic) };
}

const SUP = { 1: '', 2: '²', 3: '³' };
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const subbed = (f) => String(f).replace(/\d/g, (n) => SUB[n]);

/** An entry as plain text — "2H⁺(aq)", "H₂O(l)" — for messages and logs. */
export function entryText(e, withState = true) {
  const body = e.kind === 'ion'
    ? `${subbed(e.sym)}${SUP[Math.abs(e.charge)]}${e.charge > 0 ? '⁺' : '⁻'}`
    : subbed(e.formula);
  return `${e.coeff > 1 ? e.coeff : ''}${body}${withState ? `(${e.state})` : ''}`;
}
export const sideText = (list, withState = true) => list.map((e) => entryText(e, withState)).join(' + ');
export const equationText = (eq, withState = true) => `${sideText(eq.left, withState)} → ${sideText(eq.right, withState)}`;

/** Problems with authored items, as strings. Empty when the pool is sound. */
export function checkIonicItems(items) {
  const out = [];
  const seen = new Set();
  for (const item of items || []) {
    const id = item?.id || '(no id)';
    const say = (m) => out.push(`item ${id}: ${m}`);
    if (!item?.id) out.push('an item has no id');
    if (seen.has(id)) say('duplicate id');
    seen.add(id);
    if (!item?.name) say('needs a name');
    if (!item?.wordEquation) say('needs a wordEquation');

    let sound = true;
    for (const k of ['reactants', 'products']) {
      if (!Array.isArray(item?.[k]) || !item[k].length) { say(`needs ${k}`); sound = false; continue; }
      for (const sp of item[k]) {
        try { parseFormula(sp?.formula); } catch (e) { say(`"${sp?.formula}" — ${e.message}`); sound = false; }
        if (!['s', 'l', 'g', 'aq'].includes(sp?.state)) { say(`${sp?.formula} needs a state symbol: s, l, g or aq`); sound = false; }
        const c = sp?.coeff === undefined ? 1 : sp.coeff;
        if (!Number.isInteger(c) || c < 1 || c > 6) { say(`coefficient ${sp?.coeff} on ${sp?.formula} must be a whole number 1–6`); sound = false; }
        if (sp?.split && sp.state !== 's') say(`${sp.formula}: "split" is only for a solid whose ions are written out`);
        if (sp?.split && !ionsOf(sp.formula)) say(`${sp.formula}: marked "split" but it is not an ionic compound the library knows`);
      }
    }
    if (!sound) continue;

    const whole = (side) => side.reduce((acc, sp) => added(acc, scaled(parseFormula(sp.formula), Number(sp.coeff) || 1)), {});
    if (!sameAtoms(whole(item.reactants), whole(item.products))) { say('the full equation does not balance'); continue; }

    const d = deriveIonicItem(item);
    if (!d.species.some((s) => s.splits)) say('nothing splits into ions, so there is no ionic equation to write');
    if (!d.spectators.length) say('there are no spectator ions to strike out');
    for (const k of d.uneven) say(`${k} appears on both sides in different numbers — only part of it is a spectator, which the task cannot show`);
    if (!d.ionic.left.length || !d.ionic.right.length) say('every ion is a spectator: nothing reacts');
    else {
      if (!sameAtoms(sideAtoms(d.ionic.left), sideAtoms(d.ionic.right))) say(`the ionic equation does not balance for atoms: ${equationText(d.ionic)}`);
      if (sideCharge(d.ionic.left) !== sideCharge(d.ionic.right)) say(`the ionic equation does not balance for charge: ${equationText(d.ionic)}`);
    }
    if (!d.kind) say(`the task cannot name this kind of reaction: ${equationText(d.ionic)}`);
    if (item.ionic !== undefined && item.ionic !== equationText(d.ionic, false)) say(`stated ionic equation "${item.ionic}" but the equation gives "${equationText(d.ionic, false)}"`);
    if ([...d.full.left, ...d.full.right].length > 10) say('more than ten ions and substances — the full equation will not fit on the screen');
  }
  return out;
}
