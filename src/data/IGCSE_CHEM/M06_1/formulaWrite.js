// src/data/IGCSE_CHEM/M06_1/formulaWrite.js
// FORMULA_WRITE (Formulae) for 6.1 Acids, Bases and Alkalis — turn the name of
// a lab acid, alkali or base into its formula from the charges on its ions.
// Schema: the header of src/tasks/FormulaWrite.jsx. The component derives
// correctness from the charges and counts the student picks, so there is no
// stored answer string.
//
// The acids are written as hydrogen-ion compounds, the way the unit teaches
// them (HCl(aq) → H⁺ + Cl⁻): H⁺ fills the positive slot. The engine's card for
// that slot is headed "Metal ion (＋)", which hydrogen is not — so each acid's
// hint says so, rather than letting the heading teach something false.
//
// A polyatomic ion (SO4, NO3, OH) is written as its own symbol; FormulaWrite's
// unit() brackets it when there is more than one: OH ×2 → (OH)2, so Ca(OH)2.
//
// Order climbs: 1:1 acids → an acid that needs two H⁺ → the 1:1 alkalis → the
// 2+ / 2− oxides → the two hydroxides that need brackets.
//
// Every item is electrically neutral: cation.mag × count == anion.mag × count
// (checked with a node script before shipping).

export const formulaWrite = [
  {
    id: 'fw_hcl',
    name: 'hydrochloric acid',
    cation: { symbol: 'H', mag: 1 },
    anion: { symbol: 'Cl', mag: 1 },
    formula: [{ symbol: 'H', count: 1 }, { symbol: 'Cl', count: 1 }],
    hint: 'Hydrogen is not a metal, but in water an acid gives H⁺ ions: put H⁺ in the positive slot. Chloride is Cl⁻.',
  },
  {
    id: 'fw_hno3',
    name: 'nitric acid',
    cation: { symbol: 'H', mag: 1 },
    anion: { symbol: 'NO3', mag: 1 },
    formula: [{ symbol: 'H', count: 1 }, { symbol: 'NO3', count: 1 }],
    hint: 'The acid gives H⁺ (the positive slot, though hydrogen is not a metal). The nitrate ion is NO₃⁻.',
  },
  {
    id: 'fw_h2so4',
    name: 'sulfuric acid',
    cation: { symbol: 'H', mag: 1 },
    anion: { symbol: 'SO4', mag: 2 },
    formula: [{ symbol: 'H', count: 2 }, { symbol: 'SO4', count: 1 }],
    hint: 'The sulfate ion is SO₄²⁻, so a single sulfate ion needs more than one H⁺ to balance it.',
  },
  {
    id: 'fw_naoh',
    name: 'sodium hydroxide',
    cation: { symbol: 'Na', mag: 1 },
    anion: { symbol: 'OH', mag: 1 },
    formula: [{ symbol: 'Na', count: 1 }, { symbol: 'OH', count: 1 }],
    hint: 'Sodium is in Group I. The hydroxide ion, OH⁻, is the ion every alkali gives.',
  },
  {
    id: 'fw_koh',
    name: 'potassium hydroxide',
    cation: { symbol: 'K', mag: 1 },
    anion: { symbol: 'OH', mag: 1 },
    formula: [{ symbol: 'K', count: 1 }, { symbol: 'OH', count: 1 }],
    hint: 'Potassium is in Group I, just below sodium. Hydroxide is OH⁻.',
  },
  {
    id: 'fw_cao',
    name: 'calcium oxide',
    cation: { symbol: 'Ca', mag: 2 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Ca', count: 1 }, { symbol: 'O', count: 1 }],
    hint: 'Calcium is in Group II. The oxide ion is O²⁻ — the charges are the same size.',
  },
  {
    id: 'fw_mgo',
    name: 'magnesium oxide',
    cation: { symbol: 'Mg', mag: 2 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Mg', count: 1 }, { symbol: 'O', count: 1 }],
    hint: 'Magnesium is in Group II, and oxide is O²⁻.',
  },
  {
    id: 'fw_cuo',
    name: 'copper(II) oxide',
    cation: { symbol: 'Cu', mag: 2 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Cu', count: 1 }, { symbol: 'O', count: 1 }],
    hint: 'The (II) in the name tells you the charge on the copper ion.',
  },
  {
    id: 'fw_caoh2',
    name: 'calcium hydroxide',
    cation: { symbol: 'Ca', mag: 2 },
    anion: { symbol: 'OH', mag: 1 },
    formula: [{ symbol: 'Ca', count: 1 }, { symbol: 'OH', count: 2 }],
    hint: 'Ca²⁺ needs more than one OH⁻. More than one of a polyatomic ion goes in brackets.',
  },
  {
    id: 'fw_mgoh2',
    name: 'magnesium hydroxide',
    cation: { symbol: 'Mg', mag: 2 },
    anion: { symbol: 'OH', mag: 1 },
    formula: [{ symbol: 'Mg', count: 1 }, { symbol: 'OH', count: 2 }],
    hint: 'Set the charge on magnesium first, then count the hydroxide ions it needs.',
  },
];
