// src/data/IGCSE_CHEM/M06_3/symbolEq.js
// SYMBOL_EQ (Equations) for 6.3 Oxides. The spread writes every oxide reaction
// as a balanced symbol equation, so this task turns a word equation into one.
// The deck teaches the book's own examples (calcium, iron and copper burning;
// carbon, sulfur and phosphorus burning; CuO + HCl; CO₂ + H₂O; the two
// aluminium oxide equations) — every reaction here is FRESH.
//
// The mix follows the spread: three metals burning (basic oxides), one
// non-metal burning (an acidic oxide — the nitrogen dioxide of acid rain), two
// basic oxides neutralising an acid, and an acidic oxide meeting first water,
// then an alkali. Zinc oxide is amphoteric, but here it is set with an acid, so
// it behaves as the base.
//
// Every item is verified by src/utils/chemFormula.js (checkItem): every target
// formula parses, appears in the item's `bank`, and the target equation
// balances — so a wrong key cannot ship.
//
// Authoring rules (as M06_2):
//  · one slot per named substance in the word equation (order preserved);
//  · `bank` mixes the right formulae with believable wrong ones — here the
//    recurring slips are an oxide formula that ignores the charges (MgO₂, NaO,
//    AlO, FeCl₂ for iron(III)), oxygen written as O instead of O₂, the "-ous"
//    and "-ic" acids swapped (H₂SO₃ / H₂SO₄), and water as HO;
//  · `reactants`/`products` carry the TARGET coefficient — the student must set
//    it to balance, and the grader derives balance, it does not trust the key;
//  · `note` is shown as a HINT while the item is still open (SymbolEquation.jsx
//    hides it only once graded), so it names the method — the ion charges, the
//    atom to count — and never states a finished formula or coefficient.

export const symbolEq = [
  {
    id: 'eq_magnesium_oxygen',
    wordEquation: 'magnesium + oxygen → magnesium oxide',
    reactants: [{ formula: 'Mg', coeff: 2 }, { formula: 'O2', coeff: 1 }],
    products: [{ formula: 'MgO', coeff: 2 }],
    bank: ['Mg', 'O2', 'MgO', 'O', 'MgO2', 'Mg2O'],
    hint: 'Magnesium ions are 2+ and oxide ions are 2−, so they pair up one to one. Oxygen is always written O₂ — so count the O atoms first, then the Mg.',
  },
  {
    id: 'eq_sodium_oxygen',
    wordEquation: 'sodium + oxygen → sodium oxide',
    reactants: [{ formula: 'Na', coeff: 4 }, { formula: 'O2', coeff: 1 }],
    products: [{ formula: 'Na2O', coeff: 2 }],
    bank: ['Na', 'O2', 'Na2O', 'NaO', 'NaO2', 'O'],
    hint: 'Sodium ions are 1+ and oxide ions are 2−: how many sodium ions does one oxide ion need? Then balance the O atoms from O₂, and the Na last.',
  },
  {
    id: 'eq_aluminium_oxygen',
    wordEquation: 'aluminium + oxygen → aluminium oxide',
    reactants: [{ formula: 'Al', coeff: 4 }, { formula: 'O2', coeff: 3 }],
    products: [{ formula: 'Al2O3', coeff: 2 }],
    bank: ['Al', 'O2', 'Al2O3', 'AlO', 'AlO3', 'Al3O2', 'O'],
    hint: 'Aluminium ions are 3+ and oxide ions are 2−: find the smallest numbers of each whose charges cancel. If the oxide has an odd number of O atoms, O₂ cannot supply it — double the oxide.',
  },
  {
    id: 'eq_nitrogen_oxygen',
    wordEquation: 'nitrogen + oxygen → nitrogen dioxide',
    reactants: [{ formula: 'N2', coeff: 1 }, { formula: 'O2', coeff: 2 }],
    products: [{ formula: 'NO2', coeff: 2 }],
    bank: ['N2', 'O2', 'NO2', 'N', 'NO', 'N2O', 'O'],
    hint: 'An acidic oxide — one of the gases behind acid rain. "Di" means two: count the oxygens in the name. Nitrogen and oxygen both come as two-atom molecules.',
  },
  {
    id: 'eq_iron3_oxide_hydrochloric',
    wordEquation: 'iron(III) oxide + hydrochloric acid → iron(III) chloride + water',
    reactants: [{ formula: 'Fe2O3', coeff: 1 }, { formula: 'HCl', coeff: 6 }],
    products: [{ formula: 'FeCl3', coeff: 2 }, { formula: 'H2O', coeff: 3 }],
    bank: ['Fe2O3', 'HCl', 'FeCl3', 'H2O', 'FeO', 'FeCl2', 'HO', 'Cl2'],
    hint: 'A basic oxide + an acid → a salt + water. The (III) tells you the iron ion is 3+, and a chloride ion is 1−. Balance Fe first, then Cl, then the H and O of the water.',
  },
  {
    id: 'eq_zinc_oxide_sulfuric',
    wordEquation: 'zinc oxide + sulfuric acid → zinc sulfate + water',
    reactants: [{ formula: 'ZnO', coeff: 1 }, { formula: 'H2SO4', coeff: 1 }],
    products: [{ formula: 'ZnSO4', coeff: 1 }, { formula: 'H2O', coeff: 1 }],
    bank: ['ZnO', 'H2SO4', 'ZnSO4', 'H2O', 'ZnO2', 'Zn2SO4', 'ZnS', 'HO'],
    hint: 'With an acid, zinc oxide acts as a base. The zinc ion and the sulfate ion both carry a charge of 2. (A sulfate contains oxygen; a sulfide does not.)',
  },
  {
    id: 'eq_sulfur_dioxide_water',
    wordEquation: 'sulfur dioxide + water → sulfurous acid',
    reactants: [{ formula: 'SO2', coeff: 1 }, { formula: 'H2O', coeff: 1 }],
    products: [{ formula: 'H2SO3', coeff: 1 }],
    bank: ['SO2', 'H2O', 'H2SO3', 'H2SO4', 'SO3', 'HO', 'H2S'],
    hint: 'An acidic oxide + water gives an acid: add up the S, H and O atoms of both reactants. An "-ous" acid has one oxygen fewer than the "-ic" acid.',
  },
  {
    id: 'eq_carbon_dioxide_sodium_hydroxide',
    wordEquation: 'carbon dioxide + sodium hydroxide → sodium carbonate + water',
    reactants: [{ formula: 'CO2', coeff: 1 }, { formula: 'NaOH', coeff: 2 }],
    products: [{ formula: 'Na2CO3', coeff: 1 }, { formula: 'H2O', coeff: 1 }],
    bank: ['CO2', 'NaOH', 'Na2CO3', 'H2O', 'NaCO3', 'CO', 'HO', 'H2'],
    hint: 'An acidic oxide + an alkali gives a salt and water. The carbonate ion is CO₃ with a 2− charge, and a sodium ion is 1+. Balance Na first, then H.',
  },
];
