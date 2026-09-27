// src/data/IGCSE_CHEM/M06_7/ionicEq.js
// IONIC_EQ (Spectator Strike) for Module 6, topic 7 — the ionic equation for a
// halogen DISPLACING a less reactive halogen from a solution of its halide,
// coursebook spread 12.3.
//
// An item is the ordinary balanced equation with state symbols; the ions, the
// spectators, the ionic equation and the kind of reaction are derived by
// src/utils/ionicEquation.js. The `ionic` line is a CHECK the validator holds
// the derivation to, not an answer key.
//
// The book's two examples (chlorine water with potassium bromide, and with
// potassium iodide) are taught in the deck and deliberately NOT set here, so
// every item uses a different metal halide. The point the task makes is the
// one the ionic equation makes: the METAL ion is a spectator, so it does not
// matter whether the bromide is sodium bromide or potassium bromide. The
// halogen itself is dissolved — (aq) — but it is made of molecules, so it
// stays whole.
//
// Only reactions that HAPPEN can be set: bromine with a chloride gives no
// reaction, so there is no equation to write. The deck and the Practice task
// carry the "no change" cases.
export const ionicEq = {
  title: 'Spectator Strike',
  items: [
    {
      id: 'ie_cl2_nabr',
      name: 'Chlorine and sodium bromide',
      wordEquation: 'chlorine + sodium bromide → sodium chloride + bromine',
      reactants: [{ formula: 'Cl2', state: 'aq' }, { formula: 'NaBr', state: 'aq', coeff: 2 }],
      products: [{ formula: 'NaCl', state: 'aq', coeff: 2 }, { formula: 'Br2', state: 'aq' }],
      ionic: 'Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂',
      note: 'The solution turns orange as bromine forms. Chlorine is more reactive than bromine, so it takes the electrons and pushes the bromine out.',
    },
    {
      id: 'ie_cl2_nai',
      name: 'Chlorine and sodium iodide',
      wordEquation: 'chlorine + sodium iodide → sodium chloride + iodine',
      reactants: [{ formula: 'Cl2', state: 'aq' }, { formula: 'NaI', state: 'aq', coeff: 2 }],
      products: [{ formula: 'NaCl', state: 'aq', coeff: 2 }, { formula: 'I2', state: 'aq' }],
      ionic: 'Cl₂ + 2I⁻ → 2Cl⁻ + I₂',
      note: 'The solution turns red-brown as iodine forms. Swap sodium for potassium and the ionic equation would not change at all.',
    },
    {
      id: 'ie_br2_nai',
      name: 'Bromine and sodium iodide',
      wordEquation: 'bromine + sodium iodide → sodium bromide + iodine',
      reactants: [{ formula: 'Br2', state: 'aq' }, { formula: 'NaI', state: 'aq', coeff: 2 }],
      products: [{ formula: 'NaBr', state: 'aq', coeff: 2 }, { formula: 'I2', state: 'aq' }],
      ionic: 'Br₂ + 2I⁻ → 2Br⁻ + I₂',
      note: 'Bromine is below chlorine but above iodine, so it can displace iodine — and nothing else in the school lab.',
    },
    {
      id: 'ie_cl2_mgbr2',
      name: 'Chlorine and magnesium bromide',
      wordEquation: 'chlorine + magnesium bromide → magnesium chloride + bromine',
      reactants: [{ formula: 'Cl2', state: 'aq' }, { formula: 'MgBr2', state: 'aq' }],
      products: [{ formula: 'MgCl2', state: 'aq' }, { formula: 'Br2', state: 'aq' }],
      ionic: 'Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂',
      note: 'No 2 in front of the magnesium bromide — but each one brings two bromide ions, so the ionic equation is exactly the one you wrote for sodium bromide.',
    },
    {
      id: 'ie_br2_cai2',
      name: 'Bromine and calcium iodide',
      wordEquation: 'bromine + calcium iodide → calcium bromide + iodine',
      reactants: [{ formula: 'Br2', state: 'aq' }, { formula: 'CaI2', state: 'aq' }],
      products: [{ formula: 'CaBr2', state: 'aq' }, { formula: 'I2', state: 'aq' }],
      ionic: 'Br₂ + 2I⁻ → 2Br⁻ + I₂',
      note: 'Whatever the metal, a displacement is the halogen molecule taking electrons from the halide ions. The metal ion only watches.',
    },
  ],
};
