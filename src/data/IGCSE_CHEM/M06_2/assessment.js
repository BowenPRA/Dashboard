// src/data/IGCSE_CHEM/M06_2/assessment.js
// The Quiz for 6.2 Reactions of Acids and Bases: 10 MCQ, one sitting,
// 12 minutes, modelled on the Wolsey Hall module multiple-choice quiz. Shares
// Gate 2 with the arcade at 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae are written with Unicode subscripts and charges (H₂SO₄, O²⁻) in
// plain text instead, as COORD_SCI/U05_1 does.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: calling acid + metal a neutralisation, giving hydrogen for a
// carbonate, naming the salt after the wrong acid, keeping a spectator ion in
// the ionic equation, splitting water into ions, or reading "donor" and
// "acceptor" the wrong way round. No item copies a notes check or a workbook
// question, and only two (5 and 9) ask for a whole ionic equation — Spectator
// Strike stages that skill. The key is spread across A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_name_salt',
      type: 'mcq',
      title: '1. Potassium hydroxide solution reacts with dilute nitric acid. Which salt is formed?',
      options: [
        { val: 'A', text: 'A. Potassium nitride' },
        { val: 'B', text: 'B. Potassium sulfate' },
        { val: 'C', text: 'C. Potassium nitrate' },
        { val: 'D', text: 'D. Potassium hydroxide nitrate' },
      ],
      correct: 'C',
      expEn: 'Nitric acid always gives nitrates, and the metal is potassium: potassium nitrate. A nitride (A) contains no oxygen; sulfate (B) would need sulfuric acid; and the hydroxide is used up to make water, so it is not in the name (D).',
    },
    {
      id: 'a2_carbonate_equation',
      type: 'mcq',
      title: '2. Which general word equation shows the reaction of an acid with a carbonate?',
      options: [
        { val: 'A', text: 'A. acid + carbonate → salt + water + carbon dioxide' },
        { val: 'B', text: 'B. acid + carbonate → salt + hydrogen' },
        { val: 'C', text: 'C. acid + carbonate → salt + water' },
        { val: 'D', text: 'D. acid + carbonate → salt + hydrogen + carbon dioxide' },
      ],
      correct: 'A',
      expEn: 'A carbonate gives three products: a salt, water and carbon dioxide. Hydrogen (B, D) only comes from acid + metal, and salt + water alone (C) is acid + base.',
    },
    {
      id: 'a3_not_neutralisation',
      type: 'mcq',
      title: '3. Which of these reactions is NOT a neutralisation?',
      options: [
        { val: 'A', text: 'A. Calcium oxide + dilute nitric acid' },
        { val: 'B', text: 'B. Potassium carbonate + dilute sulfuric acid' },
        { val: 'C', text: 'C. Lithium hydroxide + dilute hydrochloric acid' },
        { val: 'D', text: 'D. Iron + dilute hydrochloric acid' },
      ],
      correct: 'D',
      expEn: 'A neutralisation gives water as well as a salt. The oxide, the carbonate and the hydroxide all give water. Iron gives iron(II) chloride and hydrogen — no water, so it is not a neutralisation, even though the acid is used up.',
    },
    {
      id: 'a4_spectator_define',
      type: 'mcq',
      title: '4. What is a spectator ion?',
      options: [
        { val: 'A', text: 'A. An ion that is made during the reaction' },
        { val: 'B', text: 'B. An ion that is present in the solution but does not take part in the reaction' },
        { val: 'C', text: 'C. An ion that leaves the solution as a gas' },
        { val: 'D', text: 'D. The ion that makes a solution acidic' },
      ],
      correct: 'B',
      expEn: 'A spectator ion is there before and after the reaction, unchanged — it appears on both sides of the full ionic equation, so it is struck out. The ion that makes a solution acidic (D) is H⁺, which does take part.',
    },
    {
      id: 'a5_ionic_alkali',
      type: 'mcq',
      title: '5. Which is the ionic equation for the neutralisation of dilute sulfuric acid by potassium hydroxide solution?',
      options: [
        { val: 'A', text: 'A. H⁺(aq) + OH⁻(aq) → H₂O(l)' },
        { val: 'B', text: 'B. 2K⁺(aq) + SO₄²⁻(aq) → K₂SO₄(aq)' },
        { val: 'C', text: 'C. H⁺(aq) + K⁺(aq) + OH⁻(aq) → H₂O(l) + K⁺(aq)' },
        { val: 'D', text: 'D. H₂O(l) → H⁺(aq) + OH⁻(aq)' },
      ],
      correct: 'A',
      expEn: 'K⁺ and SO₄²⁻ are the spectators, so they are struck out — (B) is built from nothing but spectators, and (C) keeps one in. Water is a liquid, so it stays whole: (D) splits it into ions, the wrong way round. What is left, in simplest whole numbers, is H⁺ + OH⁻ → H₂O.',
    },
    {
      id: 'a6_slaked_lime',
      type: 'mcq',
      title: '6. A farmer spreads slaked lime on a field. What is slaked lime, and why is it used?',
      options: [
        { val: 'A', text: 'A. Calcium oxide, which makes the soil more acidic' },
        { val: 'B', text: 'B. Calcium hydroxide, a base that neutralises acidity in the soil' },
        { val: 'C', text: 'C. Calcium carbonate, which adds hydrogen ions to the soil' },
        { val: 'D', text: 'D. Calcium hydroxide, an acid that neutralises alkaline soil' },
      ],
      correct: 'B',
      expEn: 'Slaked lime is calcium hydroxide, a base. Crops grow best near pH 7, so it is spread on soil that is too acidic. Lime (A) is calcium oxide and limestone (C) is calcium carbonate — both are bases too, but neither is slaked lime, and none of them adds hydrogen ions.',
    },
    {
      id: 'a7_donor_meaning',
      type: 'mcq',
      title: '7. Hydrochloric acid is described as a proton donor. What does this mean?',
      options: [
        { val: 'A', text: 'A. It accepts H⁺ ions from a base' },
        { val: 'B', text: 'B. It gives electrons to a base' },
        { val: 'C', text: 'C. It gives Cl⁻ ions to a base' },
        { val: 'D', text: 'D. It gives H⁺ ions to a base' },
      ],
      correct: 'D',
      expEn: 'A proton is an H⁺ ion, and to donate is to give. So a proton donor gives H⁺ ions — here to the base that accepts them. (A) is the definition of a base, reversed; the chloride ion is a spectator.',
    },
    {
      id: 'a8_acceptor_limewater',
      type: 'mcq',
      title: '8. Dilute nitric acid is neutralised by calcium hydroxide solution. Which particle accepts the protons?',
      options: [
        { val: 'A', text: 'A. The calcium ion, Ca²⁺' },
        { val: 'B', text: 'B. The nitrate ion, NO₃⁻' },
        { val: 'C', text: 'C. The hydroxide ion, OH⁻' },
        { val: 'D', text: 'D. The water molecule, H₂O' },
      ],
      correct: 'C',
      expEn: 'The hydroxide ion takes an H⁺ ion and becomes a water molecule: H⁺ + OH⁻ → H₂O. Ca²⁺ and NO₃⁻ are the spectators, and water is the product, not the acceptor.',
    },
    {
      id: 'a9_ionic_oxide',
      type: 'mcq',
      title: '9. Solid copper(II) oxide is added to dilute nitric acid. Which is the ionic equation for the reaction?',
      options: [
        { val: 'A', text: 'A. 2H⁺(aq) + O²⁻(s) → H₂O(l)' },
        { val: 'B', text: 'B. H⁺(aq) + OH⁻(aq) → H₂O(l)' },
        { val: 'C', text: 'C. H⁺(aq) + O²⁻(s) → H₂O(l)' },
        { val: 'D', text: 'D. Cu²⁺(s) + 2NO₃⁻(aq) → Cu(NO₃)₂(aq)' },
      ],
      correct: 'A',
      expEn: 'Copper(II) oxide is insoluble and has no hydroxide ions (so not B). Its oxide ions accept the protons. One O²⁻ needs two H⁺ to make H₂O and to cancel its 2− charge — (C) balances neither the hydrogen nor the charge. (D) is made of spectator ions.',
    },
    {
      id: 'a10_identify_carbonate',
      type: 'mcq',
      title: '10. A white powder is added to dilute hydrochloric acid. It fizzes, and the gas turns limewater milky. What could the powder be?',
      options: [
        { val: 'A', text: 'A. Magnesium' },
        { val: 'B', text: 'B. Magnesium oxide' },
        { val: 'C', text: 'C. Magnesium hydroxide' },
        { val: 'D', text: 'D. Magnesium carbonate' },
      ],
      correct: 'D',
      expEn: 'Limewater turning milky means the gas is carbon dioxide, which comes from a carbonate. Magnesium metal (A) would fizz too, but with hydrogen. The oxide and hydroxide (B, C) are bases: they give a salt and water, with no gas.',
    },
  ],
};
