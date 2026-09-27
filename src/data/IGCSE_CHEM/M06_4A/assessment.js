// src/data/IGCSE_CHEM/M06_4A/assessment.js
// The Quiz for 6.4 Making Salts: the methods — 10 MCQ, one sitting, 12
// minutes, modelled on the Wolsey Hall module multiple-choice quiz. Shares
// Gate 2 with the arcade at 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae are written with Unicode subscripts and charges (CaCO₃, Pb²⁺) in
// plain text instead.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: evaporating before filtering, rinsing a solution, using a metal that
// is too reactive (or not reactive enough), reading the colour instead of the
// leftover solid, confusing the burette with the pipette, forgetting an
// exception to the solubility rules, trying to precipitate from an insoluble
// starting compound, keeping a spectator ion or dissolving the precipitate in
// the ionic equation, or filtering an excess that dissolves. No item copies a
// notes check or a workbook question, and every salt is fresh. The key is
// spread across A/B/C/D (A2 B3 C3 D2).
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_after_filter',
      type: 'mcq',
      title: '1. Aluminium chloride is made by adding excess aluminium to dilute hydrochloric acid. The unreacted aluminium has just been filtered off. What should be done next?',
      options: [
        { val: 'A', text: 'A. Add an indicator and titrate the filtrate' },
        { val: 'B', text: 'B. Heat the filtrate to evaporate some water, then leave it to cool' },
        { val: 'C', text: 'C. Rinse the filtrate with distilled water and dry it in an oven' },
        { val: 'D', text: 'D. Add more aluminium to the filtrate' },
      ],
      correct: 'B',
      expEn: 'The filtrate is aluminium chloride solution. Evaporating some water makes it saturated, and on cooling crystals form. A titration (A) is only for an alkali; rinsing and oven-drying (C) are for a precipitate caught in the filter paper; and the acid is already used up, so more aluminium (D) would do nothing.',
    },
    {
      id: 'a2_too_violent',
      type: 'mcq',
      title: '2. Which metal should NOT be added to a dilute acid to make its salt, because it reacts too violently?',
      options: [
        { val: 'A', text: 'A. Zinc' },
        { val: 'B', text: 'B. Iron' },
        { val: 'C', text: 'C. Calcium' },
        { val: 'D', text: 'D. Copper' },
      ],
      correct: 'C',
      expEn: 'Calcium, like sodium and potassium, reacts violently with acids. Zinc and iron react at a safe speed, so method 1 works for them. Copper cannot be used either — but because it does not react at all, not because it is too violent.',
    },
    {
      id: 'a3_carbonate_done',
      type: 'mcq',
      title: '3. Excess green copper(II) carbonate is added to dilute nitric acid. How can you tell when all of the acid has been used up?',
      options: [
        { val: 'A', text: 'A. The solution turns blue' },
        { val: 'B', text: 'B. Bubbles of hydrogen stop coming off' },
        { val: 'C', text: 'C. All of the green solid dissolves' },
        { val: 'D', text: 'D. The fizzing stops and some green solid stays undissolved' },
      ],
      correct: 'D',
      expEn: 'With the carbonate in excess, the fizzing can only stop because the acid has run out, and the leftover green solid shows that there was more than enough. The solution turns blue as soon as any copper(II) nitrate forms (A); the gas is carbon dioxide, not hydrogen (B); and if all the solid dissolved (C), some acid might still be left.',
    },
    {
      id: 'a4_burette',
      type: 'mcq',
      title: '4. Sodium sulfate is made from sodium hydroxide solution and dilute sulfuric acid. In the titration, what is the burette used for?',
      options: [
        { val: 'A', text: 'A. To add the acid a little at a time and measure its volume' },
        { val: 'B', text: 'B. To measure exactly 25 cm³ of the alkali into the flask' },
        { val: 'C', text: 'C. To heat the solution until crystals form' },
        { val: 'D', text: 'D. To filter off the excess sodium hydroxide' },
      ],
      correct: 'A',
      expEn: 'The burette has a scale and a tap: it adds the acid drop by drop and shows how much was added. The 25 cm³ of alkali is measured with a volumetric pipette (B). Nothing is filtered in this method (D) — sodium hydroxide dissolves, which is the reason for the titration.',
    },
    {
      id: 'a5_insoluble',
      type: 'mcq',
      title: '5. Which of these salts is insoluble in water?',
      options: [
        { val: 'A', text: 'A. Potassium carbonate' },
        { val: 'B', text: 'B. Lead(II) nitrate' },
        { val: 'C', text: 'C. Ammonium chloride' },
        { val: 'D', text: 'D. Calcium sulfate' },
      ],
      correct: 'D',
      expEn: 'Sulfates are soluble except those of calcium, barium and lead, so calcium sulfate is insoluble. Potassium carbonate is one of the three soluble carbonates (A); ALL nitrates are soluble, even lead(II) nitrate (B); and all ammonium salts are soluble (C).',
    },
    {
      id: 'a6_which_pair',
      type: 'mcq',
      title: '6. Which pair of solutions gives a precipitate when they are mixed?',
      options: [
        { val: 'A', text: 'A. Sodium chloride and potassium nitrate' },
        { val: 'B', text: 'B. Silver nitrate and magnesium chloride' },
        { val: 'C', text: 'C. Zinc sulfate and sodium nitrate' },
        { val: 'D', text: 'D. Copper(II) nitrate and ammonium sulfate' },
      ],
      correct: 'B',
      expEn: 'Swap the partners and check each new salt. Silver ions meet chloride ions, and silver chloride is insoluble, so it precipitates. In A the new salts are sodium nitrate and potassium chloride; in C, zinc nitrate and sodium sulfate; in D, copper(II) sulfate and ammonium nitrate — all soluble, so nothing forms.',
    },
    {
      id: 'a7_ionic',
      type: 'mcq',
      title: '7. Barium chloride solution is mixed with potassium carbonate solution, and barium carbonate precipitates. Which is the ionic equation?',
      options: [
        { val: 'A', text: 'A. 2K⁺(aq) + 2Cl⁻(aq) → 2KCl(aq)' },
        { val: 'B', text: 'B. Ba²⁺(aq) + CO₃²⁻(aq) → BaCO₃(aq)' },
        { val: 'C', text: 'C. Ba²⁺(aq) + CO₃²⁻(aq) → BaCO₃(s)' },
        { val: 'D', text: 'D. BaCl₂(aq) + CO₃²⁻(aq) → BaCO₃(s) + 2Cl⁻(aq)' },
      ],
      correct: 'C',
      expEn: 'K⁺ and Cl⁻ are the spectator ions, so they are struck out — (A) is built from nothing else. Barium chloride is dissolved, so it must be split into ions (D keeps it whole). What is left is Ba²⁺ + CO₃²⁻ → BaCO₃, and the product is the precipitate, a solid, not (aq) as in (B).',
    },
    {
      id: 'a8_hydrated',
      type: 'mcq',
      title: '8. Zinc sulfate crystals have the formula ZnSO₄·7H₂O. Which statement about them is correct?',
      options: [
        { val: 'A', text: 'A. There are seven water molecules for each zinc ion and sulfate ion in the crystals' },
        { val: 'B', text: 'B. The crystals are anhydrous' },
        { val: 'C', text: 'C. The crystals are wet because they have not been dried properly' },
        { val: 'D', text: 'D. Each crystal contains seven zinc ions' },
      ],
      correct: 'A',
      expEn: 'The ·7H₂O is water of crystallisation: seven water molecules bonded in for each ZnSO₄. That makes the salt hydrated, the opposite of anhydrous (B). The water is part of the crystal, not surface water (C), and the 7 counts water molecules, not zinc ions (D).',
    },
    {
      id: 'a9_insoluble_method',
      type: 'mcq',
      title: '9. Copper(II) carbonate is insoluble. Which is the best way to make a sample of it?',
      options: [
        { val: 'A', text: 'A. Add excess copper to dilute acid, filter, then evaporate the filtrate' },
        { val: 'B', text: 'B. Mix copper(II) sulfate solution with sodium carbonate solution; filter, rinse and dry the precipitate' },
        { val: 'C', text: 'C. Titrate copper(II) oxide against dilute acid, then evaporate' },
        { val: 'D', text: 'D. Mix copper(II) sulfate solution with calcium carbonate; filter, rinse and dry the solid' },
      ],
      correct: 'B',
      expEn: 'An insoluble salt is made by precipitation, from a solution of its positive ions (copper(II) sulfate) and a solution of its negative ions (sodium carbonate). Copper does not react with dilute acid (A); a titration needs an alkali, and copper(II) oxide with an acid gives a soluble salt of that acid, not the carbonate (C); and calcium carbonate is insoluble, so it gives no carbonate ions to the solution (D).',
    },
    {
      id: 'a10_sodium_nitrate',
      type: 'mcq',
      title: '10. Which method is best for making crystals of sodium nitrate?',
      options: [
        { val: 'A', text: 'A. Add excess sodium to dilute nitric acid, then filter' },
        { val: 'B', text: 'B. Add excess sodium carbonate to dilute nitric acid, then filter off the excess' },
        { val: 'C', text: 'C. Titrate sodium hydroxide solution with dilute nitric acid, repeat without the indicator, then evaporate' },
        { val: 'D', text: 'D. Mix sodium chloride solution with silver nitrate solution, then filter and dry the precipitate' },
      ],
      correct: 'C',
      expEn: 'Sodium nitrate is a soluble sodium salt, so it is made by titration. Sodium reacts violently with acid (A). Sodium carbonate is soluble, so its excess would pass straight through the filter (B). In D the precipitate is silver chloride — the sodium nitrate stays in the solution, so drying the precipitate gives the wrong salt.',
    },
  ],
};
