// src/data/IGCSE_CHEM/M06_6/symbolEq.js
// SYMBOL_EQ (Equations) for 6.6 Group 1: The Alkali Metals. The book gives the
// three reactions of the family as word equations — with water, with chlorine,
// with oxygen — and says the oxides dissolve to give alkaline solutions. This
// task turns each one into a balanced symbol equation.
//
// The deck teaches the book's own example, sodium. Here the metals are lithium,
// potassium and the two the lab never sees (rubidium, caesium — predicted from
// the family), and sodium appears only as its oxide. Potassium + chlorine is
// left out on purpose: it is the spread's own end-of-page question.
//
// The mix: three with water (2M + 2H₂O → 2MOH + H₂), two with chlorine
// (2M + Cl₂ → 2MCl), two with oxygen (4M + O₂ → 2M₂O), and one oxide
// dissolving (M₂O + H₂O → 2MOH). Every metal ion is M⁺, so the charges settle
// every formula: MOH, MCl, M₂O.
//
// Every item is verified by src/utils/chemFormula.js (checkItem): every target
// formula parses, appears in the item's `bank`, and the target equation
// balances — so a wrong key cannot ship.
//
// Authoring rules (as M06_2):
//  · one slot per named substance in the word equation (order preserved);
//  · `bank` mixes the right formulae with believable wrong ones — here the
//    recurring slips are hydrogen and chlorine written as single atoms (H, Cl),
//    formulae that ignore the 1+ charge (NaO, LiCl₂, KO), a hydroxide that keeps
//    too many metal atoms (Na₂OH), and the oxide and hydroxide confused;
//  · `reactants`/`products` carry the TARGET coefficient — the student must set
//    it to balance, and the grader derives balance, it does not trust the key;
//  · `note` is shown as a HINT while the student is still working
//    (SymbolEquation.jsx hides it only once graded), so it points at the ion
//    charges and never writes a formula or coefficient out.

export const symbolEq = [
  {
    id: 'eq_lithium_water',
    wordEquation: 'lithium + water → lithium hydroxide + hydrogen',
    reactants: [{ formula: 'Li', coeff: 2 }, { formula: 'H2O', coeff: 2 }],
    products: [{ formula: 'LiOH', coeff: 2 }, { formula: 'H2', coeff: 1 }],
    bank: ['Li', 'H2O', 'LiOH', 'H2', 'Li2O', 'Li(OH)2', 'H', 'HO'],
    hint: 'A lithium ion is Li⁺ and a hydroxide ion is OH⁻ — how many of each in the hydroxide? Hydrogen gas comes in pairs of atoms, so count the H on each side last.',
  },
  {
    id: 'eq_potassium_water',
    wordEquation: 'potassium + water → potassium hydroxide + hydrogen',
    reactants: [{ formula: 'K', coeff: 2 }, { formula: 'H2O', coeff: 2 }],
    products: [{ formula: 'KOH', coeff: 2 }, { formula: 'H2', coeff: 1 }],
    bank: ['K', 'H2O', 'KOH', 'H2', 'K2O', 'K2OH', 'H', 'O2'],
    hint: 'Every alkali metal follows the same pattern with water. Potassium forms K⁺. One hydrogen molecule needs a hydrogen atom from more than one water molecule.',
  },
  {
    id: 'eq_rubidium_water',
    wordEquation: 'rubidium + water → rubidium hydroxide + hydrogen',
    reactants: [{ formula: 'Rb', coeff: 2 }, { formula: 'H2O', coeff: 2 }],
    products: [{ formula: 'RbOH', coeff: 2 }, { formula: 'H2', coeff: 1 }],
    bank: ['Rb', 'H2O', 'RbOH', 'H2', 'Rb(OH)2', 'Rb2O', 'H', 'RbH'],
    hint: 'You have never seen rubidium, but you can still write this: it is in Group I, so its ion has a 1+ charge and it reacts exactly like lithium — only faster.',
  },
  {
    id: 'eq_lithium_chlorine',
    wordEquation: 'lithium + chlorine → lithium chloride',
    reactants: [{ formula: 'Li', coeff: 2 }, { formula: 'Cl2', coeff: 1 }],
    products: [{ formula: 'LiCl', coeff: 2 }],
    bank: ['Li', 'Cl2', 'LiCl', 'LiCl2', 'Li2Cl', 'Cl'],
    hint: 'Chlorine gas is made of molecules of two atoms. The chloride ion is Cl⁻ and the lithium ion is Li⁺ — so how many of each are in lithium chloride?',
  },
  {
    id: 'eq_caesium_chlorine',
    wordEquation: 'caesium + chlorine → caesium chloride',
    reactants: [{ formula: 'Cs', coeff: 2 }, { formula: 'Cl2', coeff: 1 }],
    products: [{ formula: 'CsCl', coeff: 2 }],
    bank: ['Cs', 'Cl2', 'CsCl', 'CsCl2', 'Cs2Cl', 'Cl', 'CsCl7'],
    hint: 'Caesium forms a 1+ ion and chloride is 1−. Chlorine\'s group number (VII) is not a subscript — it counts outer electrons, not atoms.',
  },
  {
    id: 'eq_lithium_oxygen',
    wordEquation: 'lithium + oxygen → lithium oxide',
    reactants: [{ formula: 'Li', coeff: 4 }, { formula: 'O2', coeff: 1 }],
    products: [{ formula: 'Li2O', coeff: 2 }],
    bank: ['Li', 'O2', 'Li2O', 'LiO', 'LiOH', 'O'],
    hint: 'The oxide ion is O²⁻ and lithium is Li⁺ — how many lithium ions balance one oxide ion? Oxygen gas is O₂, so each molecule makes more than one oxide.',
  },
  {
    id: 'eq_potassium_oxygen',
    wordEquation: 'potassium + oxygen → potassium oxide',
    reactants: [{ formula: 'K', coeff: 4 }, { formula: 'O2', coeff: 1 }],
    products: [{ formula: 'K2O', coeff: 2 }],
    bank: ['K', 'O2', 'K2O', 'KO', 'KOH', 'O'],
    hint: 'A 1+ ion and a 2− ion do not pair one to one. Balance the oxygen first, then count how many potassium atoms that needs.',
  },
  {
    id: 'eq_sodium_oxide_water',
    wordEquation: 'sodium oxide + water → sodium hydroxide',
    reactants: [{ formula: 'Na2O', coeff: 1 }, { formula: 'H2O', coeff: 1 }],
    products: [{ formula: 'NaOH', coeff: 2 }],
    bank: ['Na2O', 'H2O', 'NaOH', 'NaO', 'Na2OH', 'Na(OH)2', 'H2'],
    hint: 'This is why the oxides give alkaline solutions: the oxide becomes the hydroxide. Count the sodium atoms in sodium oxide — each one ends up in a hydroxide.',
  },
];
