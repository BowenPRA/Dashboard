// src/data/IGCSE_CHEM/M06_8/formulaWrite.js
// FORMULA_WRITE (Formulae) for 6.8 Transition Elements — the Extended skill of
// the spread: the Roman numeral in the name IS the charge on the metal ion, so
// read it, set the charges, then balance. Schema in src/tasks/FormulaWrite.jsx
// (cation first, then anion; `mag` is the size of the charge; `formula` is
// the target counts). The component derives the grade from the charges and
// counts the student sets.
//
// Built in PAIRS: the same two elements give two formulae, and only the Roman
// numeral changes. Copper(I)/(II) oxide, iron(II)/(III) oxide, iron(II)/(III)
// chloride, copper(I)/(II) bromide — then two (III) compounds that need
// brackets or a crossover in a new setting: iron(III) hydroxide and
// chromium(III) oxide.
//
// Brackets: the component brackets any polyatomic symbol (two capitals, or a
// digit) when there is more than one of it, so `OH` with count 3 is shown as
// (OH)₃. Write the symbol bare; never put brackets in `symbol`.
//
// Every item is electrically neutral: cation.mag × count == anion.mag × count
// (checked with a node script before shipping). Hints name the method, never
// the charge the student is asked to set.

export const formulaWrite = [
  {
    id: 'fw_cu2o',
    name: 'copper(I) oxide',
    cation: { symbol: 'Cu', mag: 1 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Cu', count: 2 }, { symbol: 'O', count: 1 }],
    hint: 'The Roman numeral is the charge on the copper ion. The oxide ion has the same charge in every oxide.',
  },
  {
    id: 'fw_cuo',
    name: 'copper(II) oxide',
    cation: { symbol: 'Cu', mag: 2 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Cu', count: 1 }, { symbol: 'O', count: 1 }],
    hint: 'Same two elements as the last one — only the Roman numeral has changed.',
  },
  {
    id: 'fw_feo',
    name: 'iron(II) oxide',
    cation: { symbol: 'Fe', mag: 2 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Fe', count: 1 }, { symbol: 'O', count: 1 }],
    hint: 'Read the numeral for the iron ion. When the two charges are the same size, how many of each do you need?',
  },
  {
    id: 'fw_fe2o3',
    name: 'iron(III) oxide',
    cation: { symbol: 'Fe', mag: 3 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Fe', count: 2 }, { symbol: 'O', count: 3 }],
    hint: 'The charges are different sizes. Find the smallest total that both charges divide into.',
  },
  {
    id: 'fw_fecl2',
    name: 'iron(II) chloride',
    cation: { symbol: 'Fe', mag: 2 },
    anion: { symbol: 'Cl', mag: 1 },
    formula: [{ symbol: 'Fe', count: 1 }, { symbol: 'Cl', count: 2 }],
    hint: 'Chloride is a Group VII ion. How many of them cancel one iron ion?',
  },
  {
    id: 'fw_fecl3',
    name: 'iron(III) chloride',
    cation: { symbol: 'Fe', mag: 3 },
    anion: { symbol: 'Cl', mag: 1 },
    formula: [{ symbol: 'Fe', count: 1 }, { symbol: 'Cl', count: 3 }],
    hint: 'The same two elements as the last one, with a bigger Roman numeral.',
  },
  {
    id: 'fw_cubr',
    name: 'copper(I) bromide',
    cation: { symbol: 'Cu', mag: 1 },
    anion: { symbol: 'Br', mag: 1 },
    formula: [{ symbol: 'Cu', count: 1 }, { symbol: 'Br', count: 1 }],
    hint: 'Bromide is in Group VII, like chloride. Read the numeral for the copper.',
  },
  {
    id: 'fw_cubr2',
    name: 'copper(II) bromide',
    cation: { symbol: 'Cu', mag: 2 },
    anion: { symbol: 'Br', mag: 1 },
    formula: [{ symbol: 'Cu', count: 1 }, { symbol: 'Br', count: 2 }],
    hint: 'One copper ion again — but it now carries a bigger charge. How many bromide ions balance it?',
  },
  {
    id: 'fw_feoh3',
    name: 'iron(III) hydroxide',
    cation: { symbol: 'Fe', mag: 3 },
    anion: { symbol: 'OH', mag: 1 },
    formula: [{ symbol: 'Fe', count: 1 }, { symbol: 'OH', count: 3 }],
    hint: 'Hydroxide is one ion made of two atoms. More than one of it goes in brackets.',
  },
  {
    id: 'fw_cr2o3',
    name: 'chromium(III) oxide',
    cation: { symbol: 'Cr', mag: 3 },
    anion: { symbol: 'O', mag: 2 },
    formula: [{ symbol: 'Cr', count: 2 }, { symbol: 'O', count: 3 }],
    hint: 'A new metal, the same rule: the numeral gives the charge. It balances like one of the iron oxides.',
  },
];
