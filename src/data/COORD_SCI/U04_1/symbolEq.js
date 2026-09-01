// src/data/COORD_SCI/U04_1/symbolEq.js
// SYMBOL_EQ (Symbol Equations) for C4.1 Electrolysis: turn each word equation
// for a molten binary salt splitting into its elements into a balanced symbol
// equation. Every item is verified by src/utils/chemFormula.js (checkItem):
// every target formula parses, appears in the item's `bank`, and the target
// equation balances — so a wrong key cannot ship.
//
// Authoring rules:
//  · one slot per named substance in the word equation (order preserved);
//  · `bank` mixes the right formulae with believable wrong ones (a common
//    slip: forgetting a non-metal element is diatomic, e.g. Cl vs Cl2);
//  · `reactants`/`products` carry the TARGET coefficient — the student must set
//    it to balance, and the grader derives balance, it does not trust the key.

export const symbolEq = [
  {
    id: 'eq_pbbr2',
    wordEquation: 'lead(II) bromide → lead + bromine',
    reactants: [{ formula: 'PbBr2', coeff: 1 }],
    products: [{ formula: 'Pb', coeff: 1 }, { formula: 'Br2', coeff: 1 }],
    bank: ['PbBr2', 'Pb', 'Br2', 'Br', 'PbBr', 'Pb2Br'],
    note: 'The formula lead(II) bromide is PbBr₂. Bromine leaves as a molecule, Br₂.',
  },
  {
    id: 'eq_nacl',
    wordEquation: 'sodium chloride → sodium + chlorine',
    reactants: [{ formula: 'NaCl', coeff: 2 }],
    products: [{ formula: 'Na', coeff: 2 }, { formula: 'Cl2', coeff: 1 }],
    bank: ['NaCl', 'Na', 'Cl2', 'Cl', 'Na2', 'NaCl2'],
    note: 'Chlorine is diatomic (Cl₂), so you need two NaCl to supply two chlorine atoms — and two sodium.',
  },
  {
    id: 'eq_ki',
    wordEquation: 'potassium iodide → potassium + iodine',
    reactants: [{ formula: 'KI', coeff: 2 }],
    products: [{ formula: 'K', coeff: 2 }, { formula: 'I2', coeff: 1 }],
    bank: ['KI', 'K', 'I2', 'I', 'K2', 'KI2'],
    note: 'Iodine, like the other halogens, is diatomic: I₂.',
  },
  {
    id: 'eq_zncl2',
    wordEquation: 'zinc chloride → zinc + chlorine',
    reactants: [{ formula: 'ZnCl2', coeff: 1 }],
    products: [{ formula: 'Zn', coeff: 1 }, { formula: 'Cl2', coeff: 1 }],
    bank: ['ZnCl2', 'Zn', 'Cl2', 'Cl', 'ZnCl', 'Zn2Cl'],
    note: 'Zinc chloride already has two chlorines (ZnCl₂), so one formula unit gives one Cl₂.',
  },
  {
    id: 'eq_cucl2',
    wordEquation: 'copper(II) chloride → copper + chlorine',
    reactants: [{ formula: 'CuCl2', coeff: 1 }],
    products: [{ formula: 'Cu', coeff: 1 }, { formula: 'Cl2', coeff: 1 }],
    bank: ['CuCl2', 'Cu', 'Cl2', 'Cl', 'CuCl', 'Cu2Cl'],
    note: 'Copper(II) means Cu²⁺, so the formula is CuCl₂ — one Cu₂⁺ balanced by two Cl⁻.',
  },
  {
    id: 'eq_al2o3',
    wordEquation: 'aluminium oxide → aluminium + oxygen',
    reactants: [{ formula: 'Al2O3', coeff: 2 }],
    products: [{ formula: 'Al', coeff: 4 }, { formula: 'O2', coeff: 3 }],
    bank: ['Al2O3', 'Al', 'O2', 'O', 'AlO', 'Al3O2'],
    note: 'The hard one: two Al₂O₃ give four Al and, since oxygen is O₂, three O₂ (6 oxygen atoms).',
  },
];
