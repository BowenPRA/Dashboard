// src/data/IGCSE_CHEM/M05_2/bondEnergy.js
// BOND_ENERGY (Bond Ledger) for Module 5, topic 2 — calculating an enthalpy
// change from bond energies, in the order the coursebook works it (page 97):
// count the bonds broken, total the energy in, count the bonds made, total the
// energy out, subtract, read the sign.
//
// An item only NAMES the reaction. Every count, subtotal, total and ΔH on the
// screen is derived from the molecules' structures by src/utils/bondEnergy.js,
// and `checkBondItems` (run by `npm run validate`) refuses an item that does
// not balance or that states a ΔH the bond energies do not give. The `deltaH`
// written on each item below is therefore a CHECK, not the answer key: change a
// coefficient and the validator says so.
//
// The book's two worked examples (H₂ + Cl₂ and the decomposition of ammonia)
// are taught in the deck and deliberately NOT set here — the student has the
// book open. Order climbs: one bond of each kind → a coefficient to remember →
// a double bond → two kinds of bond in one molecule → an endothermic answer →
// a bond that is NOT broken (ethene keeps its four C–H).
export const bondEnergy = {
  title: 'Bond Ledger',
  items: [
    {
      id: 'be_hbr',
      name: 'Hydrogen and bromine',
      wordEquation: 'hydrogen + bromine → hydrogen bromide',
      reactants: [{ mol: 'H2', coeff: 1 }, { mol: 'Br2', coeff: 1 }],
      products: [{ mol: 'HBr', coeff: 2 }],
      deltaH: -103,
      note: 'Two bonds broken, two bonds made. The 2 in front of HBr means two H–Br bonds form, not one.',
    },
    {
      id: 'be_water',
      name: 'Hydrogen burning in oxygen',
      wordEquation: 'hydrogen + oxygen → water',
      reactants: [{ mol: 'H2', coeff: 2 }, { mol: 'O2', coeff: 1 }],
      products: [{ mol: 'H2O', coeff: 2 }],
      deltaH: -486,
      note: 'Each water molecule holds two O–H bonds, and there are two molecules: four O–H bonds made. This is the reaction that lifts a rocket.',
    },
    {
      id: 'be_hf',
      name: 'Hydrogen and fluorine',
      wordEquation: 'hydrogen + fluorine → hydrogen fluoride',
      reactants: [{ mol: 'H2', coeff: 1 }, { mol: 'F2', coeff: 1 }],
      products: [{ mol: 'HF', coeff: 2 }],
      deltaH: -536,
      note: 'The F–F bond is weak and the H–F bond is very strong, so far more energy comes out than goes in. That is why fluorine reacts so violently.',
    },
    {
      id: 'be_methane',
      name: 'Methane burning (natural gas)',
      wordEquation: 'methane + oxygen → carbon dioxide + water',
      reactants: [{ mol: 'CH4', coeff: 1 }, { mol: 'O2', coeff: 2 }],
      products: [{ mol: 'CO2', coeff: 1 }, { mol: 'H2O', coeff: 2 }],
      deltaH: -818,
      note: 'Four C–H bonds and two O=O bonds are broken; two C=O and four O–H are made. The bonds made are stronger, so methane is a good fuel.',
    },
    {
      id: 'be_hi',
      name: 'Hydrogen iodide decomposing',
      wordEquation: 'hydrogen iodide → hydrogen + iodine',
      reactants: [{ mol: 'HI', coeff: 2 }],
      products: [{ mol: 'H2', coeff: 1 }, { mol: 'I2', coeff: 1 }],
      deltaH: 9,
      note: 'A small positive answer: slightly more energy goes in than comes out, so the reaction is endothermic. The sign matters even when the number is small.',
    },
    {
      id: 'be_ethene',
      name: 'Ethene and hydrogen',
      wordEquation: 'ethene + hydrogen → ethane',
      reactants: [{ mol: 'C2H4', coeff: 1 }, { mol: 'H2', coeff: 1 }],
      products: [{ mol: 'C2H6', coeff: 1 }],
      deltaH: -124,
      note: 'Counting every bond works, and so does the short cut: the four C–H bonds in ethene are still there in ethane, so only C=C and H–H really break.',
    },
    {
      id: 'be_hydrazine',
      name: 'Hydrazine burning (rocket fuel)',
      wordEquation: 'hydrazine + oxygen → nitrogen + water',
      reactants: [{ mol: 'N2H4', coeff: 1 }, { mol: 'O2', coeff: 1 }],
      products: [{ mol: 'N2', coeff: 1 }, { mol: 'H2O', coeff: 2 }],
      deltaH: -582,
      note: 'The N≡N triple bond that forms is one of the strongest bonds there is: making it gives out 946 kJ on its own.',
    },
  ],
};
