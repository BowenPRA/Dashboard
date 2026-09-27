// src/data/IGCSE_CHEM/M06_2/symbolEq.js
// SYMBOL_EQ (Equations) for 6.2 Reactions of Acids and Bases. The book gives
// every acid reaction twice — as a general word equation, then as a balanced
// symbol equation — so this task turns a word equation into the symbol one.
// The deck teaches the book's own five examples; every reaction here is FRESH.
//
// The mix: two acid + metal (hydrogen), three acid + base (water), two acid +
// carbonate (water AND carbon dioxide), and one alkali + ammonium salt
// (ammonia). Nitric acid is kept away from metals on purpose — it does not give
// hydrogen with them — and copper, which does not react with dilute acids at all,
// only appears as copper(II) carbonate.
//
// Every item is verified by src/utils/chemFormula.js (checkItem): every target
// formula parses, appears in the item's `bank`, and the target equation
// balances — so a wrong key cannot ship.
//
// Authoring rules (as COORD_SCI/U05_1):
//  · one slot per named substance in the word equation (order preserved);
//  · `bank` mixes the right formulae with believable wrong ones — here the
//    recurring slips are a salt formula that ignores the charges (KSO4, CaNO3,
//    ZnNO3), hydrogen written as H instead of H₂, and water as HO;
//  · `reactants`/`products` carry the TARGET coefficient — the student must set
//    it to balance, and the grader derives balance, it does not trust the key.

export const symbolEq = [
  {
    id: 'eq_zinc_hydrochloric',
    wordEquation: 'zinc + hydrochloric acid → zinc chloride + hydrogen',
    reactants: [{ formula: 'Zn', coeff: 1 }, { formula: 'HCl', coeff: 2 }],
    products: [{ formula: 'ZnCl2', coeff: 1 }, { formula: 'H2', coeff: 1 }],
    bank: ['Zn', 'HCl', 'ZnCl2', 'H2', 'ZnCl', 'H', 'Cl2'],
    note: 'Acid + metal → salt + hydrogen. A zinc ion is Zn²⁺, so it needs two chloride ions: ZnCl₂. That takes two HCl, and their two hydrogen atoms leave as one H₂ molecule.',
  },
  {
    id: 'eq_iron_sulfuric',
    wordEquation: 'iron + sulfuric acid → iron(II) sulfate + hydrogen',
    reactants: [{ formula: 'Fe', coeff: 1 }, { formula: 'H2SO4', coeff: 1 }],
    products: [{ formula: 'FeSO4', coeff: 1 }, { formula: 'H2', coeff: 1 }],
    bank: ['Fe', 'H2SO4', 'FeSO4', 'H2', 'Fe2SO4', 'Fe2(SO4)3', 'H', 'HSO4'],
    note: 'The (II) tells you the iron ion is Fe²⁺, and sulfate is SO₄²⁻ — so one of each: FeSO₄. The metal displaces both hydrogens, which leave as one H₂. It balances 1 : 1 : 1 : 1.',
  },
  {
    id: 'eq_potassium_hydroxide_sulfuric',
    wordEquation: 'potassium hydroxide + sulfuric acid → potassium sulfate + water',
    reactants: [{ formula: 'KOH', coeff: 2 }, { formula: 'H2SO4', coeff: 1 }],
    products: [{ formula: 'K2SO4', coeff: 1 }, { formula: 'H2O', coeff: 2 }],
    bank: ['KOH', 'H2SO4', 'K2SO4', 'H2O', 'KSO4', 'K(OH)2', 'HO', 'H2'],
    note: 'Acid + alkali → salt + water. K⁺ has one plus charge and SO₄²⁻ has two minus, so the salt is K₂SO₄. Two potassium means 2KOH, and the two OH⁻ make 2H₂O.',
  },
  {
    id: 'eq_calcium_hydroxide_nitric',
    wordEquation: 'calcium hydroxide + nitric acid → calcium nitrate + water',
    reactants: [{ formula: 'Ca(OH)2', coeff: 1 }, { formula: 'HNO3', coeff: 2 }],
    products: [{ formula: 'Ca(NO3)2', coeff: 1 }, { formula: 'H2O', coeff: 2 }],
    bank: ['Ca(OH)2', 'HNO3', 'Ca(NO3)2', 'H2O', 'CaOH', 'CaNO3', 'HO', 'HNO2'],
    note: 'Ca²⁺ needs two nitrate ions (NO₃⁻), written Ca(NO₃)₂ with a bracket. Two nitrates means 2HNO₃, and the two OH groups in Ca(OH)₂ make 2H₂O.',
  },
  {
    id: 'eq_zinc_oxide_nitric',
    wordEquation: 'zinc oxide + nitric acid → zinc nitrate + water',
    reactants: [{ formula: 'ZnO', coeff: 1 }, { formula: 'HNO3', coeff: 2 }],
    products: [{ formula: 'Zn(NO3)2', coeff: 1 }, { formula: 'H2O', coeff: 1 }],
    bank: ['ZnO', 'HNO3', 'Zn(NO3)2', 'H2O', 'ZnNO3', 'ZnO2', 'HO', 'NO3'],
    note: 'Acid + insoluble base → salt + water. Zn²⁺ needs two NO₃⁻, so 2HNO₃. Their two hydrogens and the one oxygen from ZnO make just ONE water molecule.',
  },
  {
    id: 'eq_sodium_carbonate_hydrochloric',
    wordEquation: 'sodium carbonate + hydrochloric acid → sodium chloride + water + carbon dioxide',
    reactants: [{ formula: 'Na2CO3', coeff: 1 }, { formula: 'HCl', coeff: 2 }],
    products: [{ formula: 'NaCl', coeff: 2 }, { formula: 'H2O', coeff: 1 }, { formula: 'CO2', coeff: 1 }],
    bank: ['Na2CO3', 'HCl', 'NaCl', 'H2O', 'CO2', 'NaCO3', 'NaCl2', 'CO', 'H2'],
    note: 'Acid + carbonate → salt + water + carbon dioxide. Na₂CO₃ has two sodium atoms, so you get 2NaCl — and that needs 2HCl. The carbonate becomes one H₂O and one CO₂.',
  },
  {
    id: 'eq_copper_carbonate_sulfuric',
    wordEquation: 'copper(II) carbonate + sulfuric acid → copper(II) sulfate + water + carbon dioxide',
    reactants: [{ formula: 'CuCO3', coeff: 1 }, { formula: 'H2SO4', coeff: 1 }],
    products: [{ formula: 'CuSO4', coeff: 1 }, { formula: 'H2O', coeff: 1 }, { formula: 'CO2', coeff: 1 }],
    bank: ['CuCO3', 'H2SO4', 'CuSO4', 'H2O', 'CO2', 'Cu2CO3', 'CuSO3', 'CO', 'H2'],
    note: 'Cu²⁺ and CO₃²⁻, then Cu²⁺ and SO₄²⁻ — every charge is 2, so everything is 1 : 1. The green solid fizzes and a blue solution of copper(II) sulfate is left.',
  },
  {
    id: 'eq_sodium_hydroxide_ammonium_sulfate',
    wordEquation: 'sodium hydroxide + ammonium sulfate → sodium sulfate + water + ammonia',
    reactants: [{ formula: 'NaOH', coeff: 2 }, { formula: '(NH4)2SO4', coeff: 1 }],
    products: [{ formula: 'Na2SO4', coeff: 1 }, { formula: 'H2O', coeff: 2 }, { formula: 'NH3', coeff: 2 }],
    bank: ['NaOH', '(NH4)2SO4', 'Na2SO4', 'H2O', 'NH3', 'NH4SO4', 'NaSO4', 'NH4', 'H2'],
    note: 'Alkali + ammonium salt → salt + water + ammonia. The ammonium ion is NH₄⁺, so ammonium sulfate is (NH₄)₂SO₄. Two NH₄⁺ need two OH⁻ (2NaOH), giving 2NH₃ and 2H₂O.',
  },
];
