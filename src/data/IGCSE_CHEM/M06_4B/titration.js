// src/data/IGCSE_CHEM/M06_4B/titration.js
// TITRATION (Titration Bench) for Module 6, topic 4 (second half) — finding a
// concentration by titration, in the four steps coursebook spread 11.8 sets
// out: moles of the solution you know, the ratio from the equation, moles of
// the other solution, its concentration.
//
// An item is the titration as an exam question gives it: what was in the
// flask, what was in the burette, the two burette readings and the balanced
// equation. The titre, both volumes in dm³, both mole amounts, the ratio and
// the answer are derived by src/utils/titration.js. The `answer` written on
// each item is a CHECK the validator holds the derivation to, not the key.
//
// The book's two worked examples (hydrochloric acid against sodium carbonate,
// and vinegar against sodium hydroxide) are taught in the deck and deliberately
// NOT set here. Order climbs: 1 : 1 with the acid unknown → a 2 : 1 ratio →
// the ALKALI unknown, so the known solution is the one in the burette → a
// carbonate, 1 : 2 → a volume to find instead of a concentration → a dilute
// solution, where the numbers are small.
//
// `flask.volume` and the burette readings are in cm³; concentrations are in
// mol/dm³. Leave out the concentration that is to be found.
export const titration = {
  title: 'Titration Bench',
  items: [
    {
      id: 'ti_hcl_naoh',
      name: 'Hydrochloric acid against sodium hydroxide',
      context: 'A student wants the concentration of some hydrochloric acid. 25.0 cm³ of sodium hydroxide solution of known concentration is pipetted into a flask, and the acid is run in from a burette until the indicator changes colour.',
      equation: {
        reactants: [{ formula: 'HCl' }, { formula: 'NaOH' }],
        products: [{ formula: 'NaCl' }, { formula: 'H2O' }],
      },
      flask: { formula: 'NaOH', name: 'sodium hydroxide', volume: 25, conc: 0.1 },
      burette: { formula: 'HCl', name: 'hydrochloric acid', initial: 0.5, final: 20.5 },
      indicator: { name: 'thymolphthalein', from: 'blue', to: 'colourless' },
      answer: 0.125,
      note: 'Less acid than alkali was needed (20 cm³ against 25 cm³) for the same number of moles, so the acid must be the more concentrated of the two.',
    },
    {
      id: 'ti_h2so4_koh',
      name: 'Sulfuric acid against potassium hydroxide',
      context: '25.0 cm³ of potassium hydroxide solution is pipetted into a flask with a few drops of indicator. Sulfuric acid of unknown concentration is added from a burette.',
      equation: {
        reactants: [{ formula: 'H2SO4' }, { formula: 'KOH', coeff: 2 }],
        products: [{ formula: 'K2SO4' }, { formula: 'H2O', coeff: 2 }],
      },
      flask: { formula: 'KOH', name: 'potassium hydroxide', volume: 25, conc: 0.2 },
      burette: { formula: 'H2SO4', name: 'sulfuric acid', initial: 2.3, final: 14.8 },
      indicator: { name: 'methyl orange', from: 'yellow', to: 'red' },
      answer: 0.2,
      note: 'Each sulfuric acid gives two hydrogen ions, so it neutralises TWO potassium hydroxide. Half as many moles of acid were needed.',
    },
    {
      id: 'ti_naoh_hno3',
      name: 'Finding the alkali this time',
      context: 'Now the unknown is the alkali. 20.0 cm³ of sodium hydroxide solution of unknown concentration is pipetted into the flask. Nitric acid of known concentration is added from the burette.',
      equation: {
        reactants: [{ formula: 'HNO3' }, { formula: 'NaOH' }],
        products: [{ formula: 'NaNO3' }, { formula: 'H2O' }],
      },
      flask: { formula: 'NaOH', name: 'sodium hydroxide', volume: 20 },
      burette: { formula: 'HNO3', name: 'nitric acid', conc: 0.5, initial: 1.2, final: 17.2 },
      indicator: { name: 'methyl orange', from: 'yellow', to: 'red' },
      answer: 0.4,
      note: 'The method is the same "the other way round": start from whichever solution you know — here the acid in the burette.',
    },
    {
      id: 'ti_hcl_k2co3',
      name: 'Hydrochloric acid against potassium carbonate',
      context: '25.0 cm³ of potassium carbonate solution is pipetted into a flask. Hydrochloric acid of unknown concentration is added from a burette until the fizzing stops and the indicator changes.',
      equation: {
        reactants: [{ formula: 'HCl', coeff: 2 }, { formula: 'K2CO3' }],
        products: [{ formula: 'KCl', coeff: 2 }, { formula: 'H2O' }, { formula: 'CO2' }],
      },
      flask: { formula: 'K2CO3', name: 'potassium carbonate', volume: 25, conc: 0.1 },
      burette: { formula: 'HCl', name: 'hydrochloric acid', initial: 0, final: 25 },
      indicator: { name: 'methyl orange', from: 'yellow', to: 'red' },
      answer: 0.2,
      note: 'The two volumes were the same, but the acid is twice as concentrated: one carbonate needs two hydrochloric acid.',
    },
    {
      id: 'ti_volume_h2so4',
      name: 'How much acid will it take?',
      context: 'Both concentrations are known this time. 25.0 cm³ of sodium hydroxide solution is in the flask. What volume of the sulfuric acid will neutralise it exactly?',
      equation: {
        reactants: [{ formula: 'H2SO4' }, { formula: 'NaOH', coeff: 2 }],
        products: [{ formula: 'Na2SO4' }, { formula: 'H2O', coeff: 2 }],
      },
      flask: { formula: 'NaOH', name: 'sodium hydroxide', volume: 25, conc: 0.4 },
      burette: { formula: 'H2SO4', name: 'sulfuric acid', conc: 0.5 },
      indicator: { name: 'thymolphthalein', from: 'blue', to: 'colourless' },
      answer: 10,
      note: 'The triangle turned round: volume = moles ÷ concentration. It comes out in dm³, so multiply by 1000 for cm³.',
    },
    {
      id: 'ti_limewater',
      name: 'How strong is limewater?',
      context: 'Limewater is a solution of calcium hydroxide, which is only slightly soluble. 50.0 cm³ of limewater is pipetted into a flask, and dilute hydrochloric acid of known concentration is added from a burette.',
      equation: {
        reactants: [{ formula: 'HCl', coeff: 2 }, { formula: 'Ca(OH)2' }],
        products: [{ formula: 'CaCl2' }, { formula: 'H2O', coeff: 2 }],
      },
      flask: { formula: 'Ca(OH)2', name: 'calcium hydroxide', volume: 50 },
      burette: { formula: 'HCl', name: 'hydrochloric acid', conc: 0.05, initial: 3.4, final: 23.4 },
      indicator: { name: 'methyl orange', from: 'yellow', to: 'red' },
      answer: 0.01,
      note: 'A very small concentration: calcium hydroxide is only slightly soluble, which is why limewater is such a weak alkaline solution.',
    },
  ],
};
