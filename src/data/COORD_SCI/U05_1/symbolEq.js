// src/data/COORD_SCI/U05_1/symbolEq.js
// SYMBOL_EQ (Symbol Equations) for C5.01. Step 2 of the coursebook's Worked
// Example is "work out the formulae and write a balanced symbol equation" — you
// cannot draw an energy level diagram until you can label the two lines, and the
// labels ARE the balanced equation. So this task carries forward from U04_1 and
// feeds directly into the Energy Diagrams task beside it.
//
// Every item is verified by src/utils/chemFormula.js (checkItem): every target
// formula parses, appears in the item's `bank`, and the target equation
// balances — so a wrong key cannot ship.
//
// Authoring rules (unchanged from U04_1):
//  · one slot per named substance in the word equation (order preserved);
//  · `bank` mixes the right formulae with believable wrong ones — here the
//    recurring slip is forgetting that oxygen, hydrogen and nitrogen are
//    diatomic (O vs O2);
//  · `reactants`/`products` carry the TARGET coefficient — the student must set
//    it to balance, and the grader derives balance, it does not trust the key.
//
// All six are reactions this unit's diagrams and questions actually use.

export const symbolEq = [
  {
    id: 'eq_magnesium',
    wordEquation: 'magnesium + oxygen → magnesium oxide',
    reactants: [{ formula: 'Mg', coeff: 2 }, { formula: 'O2', coeff: 1 }],
    products: [{ formula: 'MgO', coeff: 2 }],
    bank: ['Mg', 'O2', 'MgO', 'O', 'Mg2O', 'MgO2'],
    note: 'The Worked Example. Oxygen is diatomic (O₂), so two magnesium are needed to use up both oxygen atoms: 2Mg + O₂ → 2MgO.',
  },
  {
    id: 'eq_methane',
    wordEquation: 'methane + oxygen → carbon dioxide + water',
    reactants: [{ formula: 'CH4', coeff: 1 }, { formula: 'O2', coeff: 2 }],
    products: [{ formula: 'CO2', coeff: 1 }, { formula: 'H2O', coeff: 2 }],
    bank: ['CH4', 'O2', 'CO2', 'H2O', 'CH2', 'O', 'H2O2', 'CO'],
    note: 'Balance the hydrogens first: four in CH₄ means 2H₂O. That gives four oxygens on the right, so you need 2O₂ on the left.',
  },
  {
    id: 'eq_nitrogen_monoxide',
    wordEquation: 'nitrogen + oxygen → nitrogen monoxide',
    reactants: [{ formula: 'N2', coeff: 1 }, { formula: 'O2', coeff: 1 }],
    products: [{ formula: 'NO', coeff: 2 }],
    bank: ['N2', 'O2', 'NO', 'N', 'O', 'NO2', 'N2O'],
    note: 'Both reactants are diatomic, so one of each supplies two nitrogen and two oxygen atoms — which makes 2NO. This is the endothermic example.',
  },
  {
    id: 'eq_hydrogen',
    wordEquation: 'hydrogen + oxygen → water',
    reactants: [{ formula: 'H2', coeff: 2 }, { formula: 'O2', coeff: 1 }],
    products: [{ formula: 'H2O', coeff: 2 }],
    bank: ['H2', 'O2', 'H2O', 'H', 'O', 'HO', 'H2O2'],
    note: 'The reaction on the "roller coaster" diagram. One O₂ gives two oxygen atoms, so you get 2H₂O — which needs 2H₂ to supply the four hydrogens.',
  },
  {
    id: 'eq_hydrogen_peroxide',
    wordEquation: 'hydrogen peroxide → water + oxygen',
    reactants: [{ formula: 'H2O2', coeff: 2 }],
    products: [{ formula: 'H2O', coeff: 2 }, { formula: 'O2', coeff: 1 }],
    bank: ['H2O2', 'H2O', 'O2', 'O', 'H2', 'HO2'],
    note: 'Coursebook question C5.05. Two H₂O₂ carry four oxygens: two go into the water, and the other two pair up as one O₂.',
  },
  {
    id: 'eq_zinc_copper_sulfate',
    wordEquation: 'zinc + copper(II) sulfate → zinc sulfate + copper',
    reactants: [{ formula: 'Zn', coeff: 1 }, { formula: 'CuSO4', coeff: 1 }],
    products: [{ formula: 'ZnSO4', coeff: 1 }, { formula: 'Cu', coeff: 1 }],
    bank: ['Zn', 'CuSO4', 'ZnSO4', 'Cu', 'Zn2', 'CuSO3', 'ZnS'],
    note: 'Coursebook question C5.02. A displacement: zinc swaps places with copper and the sulfate group (SO₄) is carried across unchanged, so it already balances 1:1.',
  },
];
