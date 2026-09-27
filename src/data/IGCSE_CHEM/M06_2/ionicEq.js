// src/data/IGCSE_CHEM/M06_2/ionicEq.js
// IONIC_EQ (Spectator Strike) for Module 6, topic 2 — writing an ionic
// equation by the three steps coursebook spread 11.4 sets out: write every ion,
// cross out the ions that appear on both sides, and what is left is the ionic
// equation.
//
// An item is the ORDINARY balanced equation, with state symbols. Which
// substances split, into which ions, which of those are spectators, the ionic
// equation and the kind of reaction are all derived by
// src/utils/ionicEquation.js. The `ionic` line on each item is a CHECK the
// validator holds the derivation to, not an answer key: `checkIonicItems`
// (run by `npm run validate`) refuses an item whose equation does not balance
// for atoms and for charge.
//
// The book's own examples (HCl + NaOH, and MgO + HCl) are taught in the deck
// and deliberately NOT set here. Order climbs: one of everything → a 2 that has
// to be divided out → a metal, which is not a neutralisation → a carbonate →
// an insoluble base.
//
// The insoluble base follows the BOOK's way of writing it (page 135): the oxide
// does not dissolve, but the acid reacts with its oxide ions, so the lattice is
// written out as ions with (s). `split: true` is what asks for that.
export const ionicEq = {
  title: 'Spectator Strike',
  items: [
    {
      id: 'ie_koh_hno3',
      name: 'Nitric acid and potassium hydroxide',
      wordEquation: 'nitric acid + potassium hydroxide → potassium nitrate + water',
      reactants: [{ formula: 'HNO3', state: 'aq' }, { formula: 'KOH', state: 'aq' }],
      products: [{ formula: 'KNO3', state: 'aq' }, { formula: 'H2O', state: 'l' }],
      ionic: 'H⁺ + OH⁻ → H₂O',
      note: 'The potassium ions and the nitrate ions do nothing at all. Evaporate the water and they are what is left: the salt, potassium nitrate.',
    },
    {
      id: 'ie_naoh_h2so4',
      name: 'Sulfuric acid and sodium hydroxide',
      wordEquation: 'sulfuric acid + sodium hydroxide → sodium sulfate + water',
      reactants: [{ formula: 'H2SO4', state: 'aq' }, { formula: 'NaOH', state: 'aq', coeff: 2 }],
      products: [{ formula: 'Na2SO4', state: 'aq' }, { formula: 'H2O', state: 'l', coeff: 2 }],
      ionic: 'H⁺ + OH⁻ → H₂O',
      note: 'A different acid and a different alkali, and exactly the same ionic equation. Every neutralisation of an acid by an alkali is this one reaction.',
    },
    {
      id: 'ie_zn_hcl',
      name: 'Zinc and hydrochloric acid',
      wordEquation: 'zinc + hydrochloric acid → zinc chloride + hydrogen',
      reactants: [{ formula: 'Zn', state: 's' }, { formula: 'HCl', state: 'aq', coeff: 2 }],
      products: [{ formula: 'ZnCl2', state: 'aq' }, { formula: 'H2', state: 'g' }],
      ionic: 'Zn + 2H⁺ → Zn²⁺ + H₂',
      note: 'No water forms, so this is not a neutralisation. The zinc atoms have pushed the hydrogen out of the acid and taken its place.',
    },
    {
      id: 'ie_caoh2_hcl',
      name: 'Limewater and hydrochloric acid',
      wordEquation: 'calcium hydroxide + hydrochloric acid → calcium chloride + water',
      reactants: [{ formula: 'Ca(OH)2', state: 'aq' }, { formula: 'HCl', state: 'aq', coeff: 2 }],
      products: [{ formula: 'CaCl2', state: 'aq' }, { formula: 'H2O', state: 'l', coeff: 2 }],
      ionic: 'H⁺ + OH⁻ → H₂O',
      note: 'One calcium hydroxide gives TWO hydroxide ions, which is why it needs two of the acid. The ionic equation still comes down to one of each.',
    },
    {
      id: 'ie_k2co3_hno3',
      name: 'Potassium carbonate solution and nitric acid',
      wordEquation: 'potassium carbonate + nitric acid → potassium nitrate + water + carbon dioxide',
      reactants: [{ formula: 'K2CO3', state: 'aq' }, { formula: 'HNO3', state: 'aq', coeff: 2 }],
      products: [{ formula: 'KNO3', state: 'aq', coeff: 2 }, { formula: 'H2O', state: 'l' }, { formula: 'CO2', state: 'g' }],
      ionic: '2H⁺ + CO₃²⁻ → H₂O + CO₂',
      note: 'The fizzing is the carbonate ion taking two hydrogen ions and falling apart into water and carbon dioxide.',
    },
    {
      id: 'ie_fe_h2so4',
      name: 'Iron and sulfuric acid',
      wordEquation: 'iron + sulfuric acid → iron(II) sulfate + hydrogen',
      reactants: [{ formula: 'Fe', state: 's' }, { formula: 'H2SO4', state: 'aq' }],
      products: [{ formula: 'FeSO4', state: 'aq' }, { formula: 'H2', state: 'g' }],
      ionic: 'Fe + 2H⁺ → Fe²⁺ + H₂',
      note: 'Compare this with zinc and hydrochloric acid: a different metal and a different acid, the same pattern. The sulfate ion is the spectator this time.',
    },
    {
      id: 'ie_cuo_h2so4',
      name: 'Copper(II) oxide and sulfuric acid',
      wordEquation: 'copper(II) oxide + sulfuric acid → copper(II) sulfate + water',
      reactants: [{ formula: 'CuO', state: 's', split: true }, { formula: 'H2SO4', state: 'aq' }],
      products: [{ formula: 'CuSO4', state: 'aq' }, { formula: 'H2O', state: 'l' }],
      ionic: '2H⁺ + O²⁻ → H₂O',
      note: 'An insoluble base has no hydroxide ions to offer. Its oxide ions accept the protons instead — so a base is a proton acceptor.',
    },
  ],
};
