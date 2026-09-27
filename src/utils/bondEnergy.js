// src/utils/bondEnergy.js
//
// The derivation behind the BOND_ENERGY task (Bond Ledger). An item states a
// reaction as molecules and coefficients; everything the student is asked for
// is worked out here from the STRUCTURE of those molecules —
//
//   which bonds each molecule holds      (from its drawn layout)
//   how many of each are broken / made   (× the coefficient)
//   energy in, energy out                (× the bond energy)
//   ΔH = energy in − energy out, its sign, and exothermic / endothermic
//
// — so an author cannot ship a wrong count or a wrong total, and the screen
// draws the same structure the counts came from. It is the derive-don't-store
// rule Equations (chemFormula.js) and Energy Diagrams (energyProfile.js) follow.
//
// A molecule is `{ formula, name, atoms: [[element, x, y]…], bonds: [[i, j,
// order]…] }`, on a unit grid the component scales. `checkBondItems` proves
// each layout against its own formula, so a drawing with a hydrogen missing is
// caught before it teaches anybody to miscount.
import { parseFormula } from './chemFormula.js';

/**
 * Mean bond energies in kJ/mol. The first eleven are the table on page 96 of
 * the coursebook, to the digit; the rest are standard values for the bonds the
 * fresh items need. Keys are written the way the book writes them (H–Cl, not
 * Cl–H), with `-`, `=` and `#` for single, double and triple.
 */
export const BOND_ENERGY = {
  'H-H': 436, 'Cl-Cl': 242, 'H-Cl': 431, 'C-C': 346, 'C=C': 612, 'C-O': 358,
  'C-H': 413, 'O=O': 498, 'O-H': 464, 'N-H': 391, 'N#N': 946,
  'C=O': 805, 'Br-Br': 193, 'H-Br': 366, 'I-I': 151, 'H-I': 298, 'N-N': 158,
  'F-F': 158, 'H-F': 565, 'O-O': 146, 'C-Cl': 339,
};

const GLYPH = { 1: '-', 2: '=', 3: '#' };
const SHOWN = { '-': '–', '=': '=', '#': '≡' };

/** "N#N" → "N≡N", "H-Cl" → "H–Cl": the label a student reads. */
export const bondLabel = (key) => String(key).replace(/[-=#]/, (g) => SHOWN[g]);

/** The table's key for a bond between two elements, whichever way round. */
export function bondKey(a, b, order = 1, table = BOND_ENERGY) {
  const g = GLYPH[order];
  if (!g) return null;
  const one = `${a}${g}${b}`;
  const two = `${b}${g}${a}`;
  if (one in table) return one;
  if (two in table) return two;
  return null;
}

// Layout shorthands. x runs right, y runs down, one unit between bonded atoms.
const pair = (a, b, order = 1) => ({ atoms: [[a, 0, 0], [b, 1, 0]], bonds: [[0, 1, order]] });
const chain = (els, orders) => ({
  atoms: els.map((el, i) => [el, i, 0]),
  bonds: orders.map((o, i) => [i, i + 1, o]),
});

/**
 * The molecules an item may name. Layouts are displayed formulae — every atom
 * and every bond drawn — not shapes: water is H–O–H in a line, because the
 * thing being taught is counting bonds, and a bent molecule counts the same.
 */
export const MOLECULES = {
  H2: { name: 'hydrogen', ...pair('H', 'H') },
  F2: { name: 'fluorine', ...pair('F', 'F') },
  Cl2: { name: 'chlorine', ...pair('Cl', 'Cl') },
  Br2: { name: 'bromine', ...pair('Br', 'Br') },
  I2: { name: 'iodine', ...pair('I', 'I') },
  O2: { name: 'oxygen', ...pair('O', 'O', 2) },
  N2: { name: 'nitrogen', ...pair('N', 'N', 3) },
  HF: { name: 'hydrogen fluoride', ...pair('H', 'F') },
  HCl: { name: 'hydrogen chloride', ...pair('H', 'Cl') },
  HBr: { name: 'hydrogen bromide', ...pair('H', 'Br') },
  HI: { name: 'hydrogen iodide', ...pair('H', 'I') },
  H2O: { name: 'water', ...chain(['H', 'O', 'H'], [1, 1]) },
  CO2: { name: 'carbon dioxide', ...chain(['O', 'C', 'O'], [2, 2]) },
  H2O2: { name: 'hydrogen peroxide', ...chain(['H', 'O', 'O', 'H'], [1, 1, 1]) },
  NH3: {
    name: 'ammonia',
    atoms: [['N', 1, 1], ['H', 0, 1], ['H', 2, 1], ['H', 1, 0]],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
  },
  CH4: {
    name: 'methane',
    atoms: [['C', 1, 1], ['H', 0, 1], ['H', 2, 1], ['H', 1, 0], ['H', 1, 2]],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
  },
  CH3Cl: {
    name: 'chloromethane',
    atoms: [['C', 1, 1], ['H', 0, 1], ['Cl', 2, 1], ['H', 1, 0], ['H', 1, 2]],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
  },
  CH3OH: {
    name: 'methanol',
    atoms: [['C', 1, 1], ['H', 0, 1], ['O', 2, 1], ['H', 1, 0], ['H', 1, 2], ['H', 3, 1]],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [2, 5, 1]],
  },
  N2H4: {
    name: 'hydrazine',
    atoms: [['N', 1, 1], ['N', 2, 1], ['H', 1, 0], ['H', 0, 1], ['H', 2, 0], ['H', 3, 1]],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]],
  },
  C2H4: {
    name: 'ethene',
    atoms: [['C', 1, 1], ['C', 2, 1], ['H', 0.3, 0.3], ['H', 0.3, 1.7], ['H', 2.7, 0.3], ['H', 2.7, 1.7]],
    bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]],
  },
  C2H6: {
    name: 'ethane',
    atoms: [['C', 1, 1], ['C', 2, 1], ['H', 0, 1], ['H', 1, 0], ['H', 1, 2], ['H', 3, 1], ['H', 2, 0], ['H', 2, 2]],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1]],
  },
  C3H6: {
    name: 'propene',
    atoms: [
      ['C', 1, 1], ['C', 2, 1], ['C', 3, 1],
      ['H', 0.3, 0.3], ['H', 0.3, 1.7], ['H', 2, 0],
      ['H', 4, 1], ['H', 3, 0], ['H', 3, 2],
    ],
    bonds: [[0, 1, 2], [1, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [2, 6, 1], [2, 7, 1], [2, 8, 1]],
  },
  C3H8: {
    name: 'propane',
    atoms: [
      ['C', 1, 1], ['C', 2, 1], ['C', 3, 1],
      ['H', 0, 1], ['H', 1, 0], ['H', 1, 2], ['H', 2, 0], ['H', 2, 2],
      ['H', 4, 1], ['H', 3, 0], ['H', 3, 2],
    ],
    bonds: [[0, 1, 1], [1, 2, 1], [0, 3, 1], [0, 4, 1], [0, 5, 1], [1, 6, 1], [1, 7, 1], [2, 8, 1], [2, 9, 1], [2, 10, 1]],
  },
};
for (const [formula, m] of Object.entries(MOLECULES)) m.formula = formula;

/** Element → count for a molecule, read off its drawn atoms. */
export function atomsOf(mol) {
  const out = {};
  for (const [el] of mol.atoms) out[el] = (out[el] || 0) + 1;
  return out;
}

/** Bond key → count for ONE molecule, read off its drawn bonds. */
export function bondsOf(mol, table = BOND_ENERGY) {
  const out = {};
  for (const [i, j, order] of mol.bonds) {
    const key = bondKey(mol.atoms[i][0], mol.atoms[j][0], order, table)
      || `${mol.atoms[i][0]}${GLYPH[order] || '?'}${mol.atoms[j][0]}`;
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

const tableOf = (item) => ({ ...BOND_ENERGY, ...(item?.energies || {}) });

/**
 * One side of the ledger: a row per bond type, in the order the bonds are met
 * reading the equation left to right.
 *   [{ bond, label, count, each, subtotal }], total
 */
export function ledgerOf(side, table = BOND_ENERGY) {
  const counts = new Map();
  for (const sp of side || []) {
    const mol = MOLECULES[sp.mol];
    if (!mol) continue;
    const n = Number(sp.coeff) || 1;
    for (const [bond, k] of Object.entries(bondsOf(mol, table))) {
      counts.set(bond, (counts.get(bond) || 0) + k * n);
    }
  }
  const rows = [...counts].map(([bond, count]) => ({
    bond, label: bondLabel(bond), count, each: table[bond], subtotal: count * table[bond],
  }));
  return { rows, total: rows.reduce((s, r) => s + r.subtotal, 0) };
}

/** Everything the task asks for, derived from the item's chemistry. */
export function deriveBondItem(item) {
  const table = tableOf(item);
  const broken = ledgerOf(item.reactants, table);
  const made = ledgerOf(item.products, table);
  const deltaH = broken.total - made.total;
  return {
    broken, made,
    energyIn: broken.total,
    energyOut: made.total,
    deltaH,
    sign: deltaH < 0 ? '-' : '+',
    exo: deltaH < 0,
    type: deltaH < 0 ? 'exothermic' : 'endothermic',
  };
}

/** "2NH3 → N2 + 3H2" as plain text, for logs and messages. */
export function equationText(item) {
  const side = (list) => (list || []).map((s) => `${Number(s.coeff) > 1 ? s.coeff : ''}${s.mol}`).join(' + ');
  return `${side(item.reactants)} → ${side(item.products)}`;
}

function sideAtoms(side) {
  const out = {};
  for (const sp of side || []) {
    const mol = MOLECULES[sp.mol];
    if (!mol) continue;
    for (const [el, n] of Object.entries(atomsOf(mol))) out[el] = (out[el] || 0) + n * (Number(sp.coeff) || 1);
  }
  return out;
}

/** Problems with the molecule library itself: a drawing that is not its formula. */
export function checkMolecules() {
  const out = [];
  for (const [formula, mol] of Object.entries(MOLECULES)) {
    let want;
    try { want = parseFormula(formula); } catch (e) { out.push(`molecule ${formula}: ${e.message}`); continue; }
    const got = atomsOf(mol);
    const els = new Set([...Object.keys(want), ...Object.keys(got)]);
    for (const el of els) {
      if ((want[el] || 0) !== (got[el] || 0)) out.push(`molecule ${formula}: drawn with ${got[el] || 0} ${el}, formula has ${want[el] || 0}`);
    }
    for (const [i, j, order] of mol.bonds) {
      if (!mol.atoms[i] || !mol.atoms[j]) out.push(`molecule ${formula}: bond ${i}–${j} names an atom that is not drawn`);
      else if (!bondKey(mol.atoms[i][0], mol.atoms[j][0], order)) out.push(`molecule ${formula}: no bond energy for ${mol.atoms[i][0]}${GLYPH[order] || '?'}${mol.atoms[j][0]}`);
    }
    const bonded = new Set(mol.bonds.flatMap(([i, j]) => [i, j]));
    if (mol.atoms.length > 1 && bonded.size !== mol.atoms.length) out.push(`molecule ${formula}: an atom is drawn with no bond to it`);
  }
  return out;
}

/** Problems with authored items, as strings. Empty when the pool is sound. */
export function checkBondItems(items) {
  const out = [...checkMolecules()];
  const seen = new Set();
  for (const item of items || []) {
    const id = item?.id || '(no id)';
    if (!item?.id) out.push('an item has no id');
    if (seen.has(id)) out.push(`item ${id}: duplicate id`);
    seen.add(id);
    if (!item?.name) out.push(`item ${id}: needs a name`);

    let sound = true;
    for (const k of ['reactants', 'products']) {
      if (!Array.isArray(item?.[k]) || !item[k].length) { out.push(`item ${id}: needs ${k}`); sound = false; continue; }
      for (const sp of item[k]) {
        if (!MOLECULES[sp?.mol]) { out.push(`item ${id}: "${sp?.mol}" is not in the molecule library`); sound = false; }
        const c = sp?.coeff === undefined ? 1 : sp.coeff;
        if (!Number.isInteger(c) || c < 1 || c > 9) { out.push(`item ${id}: coefficient ${sp?.coeff} on ${sp?.mol} must be a whole number 1–9`); sound = false; }
      }
    }
    if (!sound) continue;

    const left = sideAtoms(item.reactants);
    const right = sideAtoms(item.products);
    for (const el of new Set([...Object.keys(left), ...Object.keys(right)])) {
      if ((left[el] || 0) !== (right[el] || 0)) out.push(`item ${id}: does not balance — ${left[el] || 0} ${el} on the left, ${right[el] || 0} on the right`);
    }

    const table = tableOf(item);
    for (const [bond, v] of Object.entries(item.energies || {})) {
      if (!(Number(v) > 0)) out.push(`item ${id}: energies["${bond}"] must be a positive number`);
    }
    const d = deriveBondItem(item);
    for (const r of [...d.broken.rows, ...d.made.rows]) {
      if (!(table[r.bond] > 0)) out.push(`item ${id}: no bond energy for ${r.label}`);
    }
    // The ledger has room for four kinds of bond a side, and a count box for 1–20.
    for (const [name, led] of [['broken', d.broken], ['made', d.made]]) {
      if (led.rows.length > 4) out.push(`item ${id}: ${led.rows.length} kinds of bond ${name} — the ledger has four rows`);
      for (const r of led.rows) if (r.count > 20) out.push(`item ${id}: ${r.count} ${r.label} bonds ${name} is more than the count box holds`);
    }
    if (d.deltaH === 0) out.push(`item ${id}: energy in equals energy out, so there is no sign to find`);
    if (item.type !== undefined && item.type !== d.type) out.push(`item ${id}: stated type "${item.type}" but the bond energies give ${d.deltaH} kJ (${d.type})`);
    if (item.deltaH !== undefined && item.deltaH !== d.deltaH) out.push(`item ${id}: stated deltaH ${item.deltaH} but the bond energies give ${d.deltaH}`);
  }
  return out;
}
