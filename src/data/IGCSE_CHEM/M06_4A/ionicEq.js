// src/data/IGCSE_CHEM/M06_4A/ionicEq.js
// IONIC_EQ (Spectator Strike) for Module 6, topic 4 (first half) — the ionic
// equation for a PRECIPITATION, coursebook spread 11.7: two solutions are
// mixed, two of their ions join to make an insoluble solid, and the other two
// are spectators.
//
// An item is the ordinary balanced equation with state symbols; the ions, the
// spectators, the ionic equation and the kind of reaction are derived by
// src/utils/ionicEquation.js. The `ionic` line is a CHECK the validator holds
// the derivation to, not an answer key.
//
// The book's example (barium chloride + magnesium sulfate → barium sulfate) is
// taught in the deck and deliberately NOT set here. The (s) on the product is
// the whole lesson: it is what the solubility rules predict, and it is what
// stops the solid being written as ions. Every precipitate is one the unit's
// solubility table predicts. Order climbs: one of each ion → a 2 in front of a
// spectator → a 2 that STAYS in the ionic equation.
export const ionicEq = {
  title: 'Spectator Strike',
  items: [
    {
      id: 'ie_agcl',
      name: 'Silver chloride',
      wordEquation: 'silver nitrate + sodium chloride → silver chloride + sodium nitrate',
      reactants: [{ formula: 'AgNO3', state: 'aq' }, { formula: 'NaCl', state: 'aq' }],
      products: [{ formula: 'AgCl', state: 's' }, { formula: 'NaNO3', state: 'aq' }],
      ionic: 'Ag⁺ + Cl⁻ → AgCl',
      note: 'Every chloride is soluble except silver and lead. So the moment silver ions meet chloride ions, a white solid forms.',
    },
    {
      id: 'ie_baso4',
      name: 'Barium sulfate',
      wordEquation: 'barium nitrate + sodium sulfate → barium sulfate + sodium nitrate',
      reactants: [{ formula: 'Ba(NO3)2', state: 'aq' }, { formula: 'Na2SO4', state: 'aq' }],
      products: [{ formula: 'BaSO4', state: 's' }, { formula: 'NaNO3', state: 'aq', coeff: 2 }],
      ionic: 'Ba²⁺ + SO₄²⁻ → BaSO₄',
      note: 'Different starting solutions from the book, the same precipitate. All that matters is that one solution brings the barium ions and the other brings the sulfate ions.',
    },
    {
      id: 'ie_pbi2',
      name: 'Lead(II) iodide',
      wordEquation: 'lead(II) nitrate + potassium iodide → lead(II) iodide + potassium nitrate',
      reactants: [{ formula: 'Pb(NO3)2', state: 'aq' }, { formula: 'KI', state: 'aq', coeff: 2 }],
      products: [{ formula: 'PbI2', state: 's' }, { formula: 'KNO3', state: 'aq', coeff: 2 }],
      ionic: 'Pb²⁺ + 2I⁻ → PbI₂',
      note: 'The 2 stays this time. One lead ion is 2+, so it needs two iodide ions — the numbers cannot be divided down any further.',
    },
    {
      id: 'ie_caco3',
      name: 'Calcium carbonate',
      wordEquation: 'calcium chloride + sodium carbonate → calcium carbonate + sodium chloride',
      reactants: [{ formula: 'CaCl2', state: 'aq' }, { formula: 'Na2CO3', state: 'aq' }],
      products: [{ formula: 'CaCO3', state: 's' }, { formula: 'NaCl', state: 'aq', coeff: 2 }],
      ionic: 'Ca²⁺ + CO₃²⁻ → CaCO₃',
      note: 'Sodium carbonate is one of the few soluble carbonates, which is why it is the one used to bring carbonate ions into a solution.',
    },
    {
      id: 'ie_agi',
      name: 'Silver iodide',
      wordEquation: 'silver nitrate + potassium iodide → silver iodide + potassium nitrate',
      reactants: [{ formula: 'AgNO3', state: 'aq' }, { formula: 'KI', state: 'aq' }],
      products: [{ formula: 'AgI', state: 's' }, { formula: 'KNO3', state: 'aq' }],
      ionic: 'Ag⁺ + I⁻ → AgI',
      note: 'A pale yellow precipitate. This is the reaction behind the test for an iodide: add silver nitrate solution and look at the colour of the solid.',
    },
    {
      id: 'ie_pbcl2',
      name: 'Lead(II) chloride',
      wordEquation: 'lead(II) nitrate + sodium chloride → lead(II) chloride + sodium nitrate',
      reactants: [{ formula: 'Pb(NO3)2', state: 'aq' }, { formula: 'NaCl', state: 'aq', coeff: 2 }],
      products: [{ formula: 'PbCl2', state: 's' }, { formula: 'NaNO3', state: 'aq', coeff: 2 }],
      ionic: 'Pb²⁺ + 2Cl⁻ → PbCl₂',
      note: 'The other exception in the chloride rule. Both starting solutions were chosen the same way: a nitrate for the metal ion, a sodium salt for the negative ion, because those are always soluble.',
    },
  ],
};
