// src/data/COORD_SCI/U04_1/formulaWrite.js
// FORMULA_WRITE (Formulae) for C4.1 — the step BEFORE writing equations: turn a
// compound's name into its formula, using symbols, charges (superscript) and
// subscripts. Each item names the two ions (cation first, then anion) with the
// charge magnitude the student must supply, and the target formula counts. The
// component derives correctness (charges + neutral formula) — see
// src/tasks/FormulaWrite.jsx.
//
// Every item is electrically neutral: cation.mag × count == anion.mag × count.

export const formulaWrite = [
  {
    id: 'fw_nacl',
    name: 'sodium chloride',
    cation: { symbol: 'Na', mag: 1 },
    anion: { symbol: 'Cl', mag: 1 },
    formula: [{ symbol: 'Na', count: 1 }, { symbol: 'Cl', count: 1 }],
    hint: 'Sodium is Na⁺ and chloride is Cl⁻ — one of each balances.',
  },
  {
    id: 'fw_pbbr2',
    name: 'lead(II) bromide',
    cation: { symbol: 'Pb', mag: 2 },
    anion: { symbol: 'Br', mag: 1 },
    formula: [{ symbol: 'Pb', count: 1 }, { symbol: 'Br', count: 2 }],
    hint: 'The "(II)" tells you the charge: lead is Pb²⁺. Bromide is Br⁻.',
  },
  {
    id: 'fw_zncl2',
    name: 'zinc chloride',
    cation: { symbol: 'Zn', mag: 2 },
    anion: { symbol: 'Cl', mag: 1 },
    formula: [{ symbol: 'Zn', count: 1 }, { symbol: 'Cl', count: 2 }],
    hint: 'Zinc is always Zn²⁺; chloride is Cl⁻.',
  },
  {
    id: 'fw_cucl2',
    name: 'copper(II) chloride',
    cation: { symbol: 'Cu', mag: 2 },
    anion: { symbol: 'Cl', mag: 1 },
    formula: [{ symbol: 'Cu', count: 1 }, { symbol: 'Cl', count: 2 }],
    hint: 'Copper(II) is Cu²⁺ — you need two Cl⁻ to balance it.',
  },
  {
    id: 'fw_al2o3',
    name: 'aluminium oxide',
    cation: { symbol: 'Al', mag: 3 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Al', count: 2 }, { symbol: 'O', count: 3 }],
    hint: 'Aluminium is Al³⁺ and oxide is O²⁻. Cross the charges over: 2 and 3.',
  },
  {
    id: 'fw_cuso4',
    name: 'copper(II) sulfate',
    cation: { symbol: 'Cu', mag: 2 },
    anion: { symbol: 'SO4', mag: 2 },
    formula: [{ symbol: 'Cu', count: 1 }, { symbol: 'SO4', count: 1 }],
    hint: 'Copper(II) is Cu²⁺ and the sulfate ion is SO₄²⁻ — both are 2, so one of each.',
  },
];
