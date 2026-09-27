// src/data/IGCSE_CHEM/M06_1/assessment.js
// The Quiz for 6.1 Acids, Bases and Alkalis: 10 MCQ, one sitting, 12 minutes,
// modelled on the Wolsey Hall module multiple-choice quiz. Shares Gate 2 with
// the arcade at 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae are written with Unicode subscripts and charges (Ca(OH)₂, OH⁻) in
// plain text instead.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: counting an insoluble base as an alkali, mixing up the everyday
// acids, swapping the indicator colours, giving the ions the wrong charges,
// reading "lower pH" as "fewer H⁺", choosing an indicator when a precise value
// is wanted, giving a weak acid a one-way arrow, or reading "weak" as "dilute".
// No item copies a notes check or a workbook question. The key is spread
// across A/B/C/D (A3 B2 C3 D2).
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_alkalis_list',
      type: 'mcq',
      title: '1. Which list contains ONLY alkalis?',
      options: [
        { val: 'A', text: 'A. HCl, HNO₃, H₂SO₄' },
        { val: 'B', text: 'B. NaOH, KOH, MgO' },
        { val: 'C', text: 'C. NaOH, KOH, Ca(OH)₂' },
        { val: 'D', text: 'D. CuO, MgO, Mg(OH)₂' },
      ],
      correct: 'C',
      expEn: 'An alkali is a base that dissolves in water: sodium hydroxide, potassium hydroxide and calcium hydroxide. A is a list of acids. Magnesium oxide (B) and everything in D are bases, but they do not dissolve, so they are not alkalis.',
    },
    {
      id: 'a2_fizzy_drink',
      type: 'mcq',
      title: '2. Which acid is found in fizzy drinks?',
      options: [
        { val: 'A', text: 'A. Citric acid' },
        { val: 'B', text: 'B. Lactic acid' },
        { val: 'C', text: 'C. Ethanoic acid' },
        { val: 'D', text: 'D. Carbonic acid' },
      ],
      correct: 'D',
      expEn: 'Fizzy drinks contain carbonic acid, made by dissolving carbon dioxide in water under pressure. Citric acid is in lemons and oranges, lactic acid in yoghurt, and ethanoic acid in vinegar.',
    },
    {
      id: 'a3_corrosive',
      type: 'mcq',
      title: '3. Concentrated sulfuric acid carries a "corrosive" hazard symbol. What does "corrosive" mean?',
      options: [
        { val: 'A', text: 'A. It can attack and eat away skin, cloth and metals' },
        { val: 'B', text: 'B. It dissolves easily in water' },
        { val: 'C', text: 'C. It turns litmus red' },
        { val: 'D', text: 'D. It has been diluted with water' },
      ],
      correct: 'A',
      expEn: 'A corrosive substance attacks and eats away materials such as skin, cloth and metals — which is why concentrated acids and alkalis must be handled with care. Turning litmus red (C) tells you it is an acid, not that it is corrosive.',
    },
    {
      id: 'a4_three_indicators_acid',
      type: 'mcq',
      title: '4. Litmus, methyl orange and thymolphthalein are each added to a separate sample of dilute nitric acid. Which set of colours is seen?',
      options: [
        { val: 'A', text: 'A. blue, yellow, blue' },
        { val: 'B', text: 'B. red, red, colourless' },
        { val: 'C', text: 'C. red, yellow, blue' },
        { val: 'D', text: 'D. red, red, blue' },
      ],
      correct: 'B',
      expEn: 'In an acid, litmus is red, methyl orange is red and thymolphthalein is colourless. A is the set of colours for an alkali. C and D each use an alkali colour for one of the indicators.',
    },
    {
      id: 'a5_koh_ions',
      type: 'mcq',
      title: '5. Potassium hydroxide dissolves in water. Which equation shows what happens?',
      options: [
        { val: 'A', text: 'A. KOH(aq) → K⁺(aq) + OH⁻(aq)' },
        { val: 'B', text: 'B. KOH(aq) → K⁻(aq) + OH⁺(aq)' },
        { val: 'C', text: 'C. KOH(aq) → K⁺(aq) + O²⁻(aq) + H⁺(aq)' },
        { val: 'D', text: 'D. KOH(aq) → K(s) + OH(aq)' },
      ],
      correct: 'A',
      expEn: 'The ions separate as a positive metal ion, K⁺, and a hydroxide ion, OH⁻ — the ion every alkali gives. B has the charges the wrong way round, C splits the hydroxide ion itself, and D gives atoms instead of ions.',
    },
    {
      id: 'a6_most_hydroxide',
      type: 'mcq',
      title: '6. Which of these solutions has the highest concentration of hydroxide ions?',
      options: [
        { val: 'A', text: 'A. A solution with pH 1' },
        { val: 'B', text: 'B. A solution with pH 7' },
        { val: 'C', text: 'C. A solution with pH 13' },
        { val: 'D', text: 'D. A solution with pH 9' },
      ],
      correct: 'C',
      expEn: 'The higher the concentration of OH⁻ ions, the higher the pH, so pH 13 has the most. pH 9 is alkaline too, but less so. pH 1 has the most H⁺ ions, not OH⁻, and pH 7 is neutral.',
    },
    {
      id: 'a7_green_universal',
      type: 'mcq',
      title: '7. A solution turns universal indicator green. What is its pH, and what kind of solution is it?',
      options: [
        { val: 'A', text: 'A. pH 1 — strongly acidic' },
        { val: 'B', text: 'B. pH 7 — neutral' },
        { val: 'C', text: 'C. pH 10 — alkaline' },
        { val: 'D', text: 'D. pH 14 — strongly alkaline' },
      ],
      correct: 'B',
      expEn: 'Green on universal indicator means pH 7, which is neutral. Red would mean about pH 1, blue about pH 10, and violet pH 14.',
    },
    {
      id: 'a8_precise_ph',
      type: 'mcq',
      title: '8. A student needs to measure the pH of a solution precisely, to one decimal place. What should the student use?',
      options: [
        { val: 'A', text: 'A. Litmus paper' },
        { val: 'B', text: 'B. Methyl orange' },
        { val: 'C', text: 'C. Universal indicator paper' },
        { val: 'D', text: 'D. A pH meter' },
      ],
      correct: 'D',
      expEn: 'A pH meter gives a precise reading. Universal indicator only gives a rough pH from its colour, and litmus and methyl orange only tell you acid or alkali.',
    },
    {
      id: 'a9_ethanoic_equation',
      type: 'mcq',
      title: '9. Ethanoic acid is a weak acid. Which equation shows how it dissociates in water?',
      options: [
        { val: 'A', text: 'A. CH₃COOH(aq) → H⁺(aq) + CH₃COO⁻(aq)' },
        { val: 'B', text: 'B. CH₃COOH(aq) ⇌ H⁻(aq) + CH₃COO⁺(aq)' },
        { val: 'C', text: 'C. CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)' },
        { val: 'D', text: 'D. CH₃COOH(aq) ⇌ OH⁻(aq) + CH₃CO⁺(aq)' },
      ],
      correct: 'C',
      expEn: 'A weak acid is only partially dissociated and the change is reversible, so the equation uses ⇌. A has a one-way arrow, which means complete dissociation — a strong acid. B has the charges swapped, and D gives hydroxide ions, which acids do not produce.',
    },
    {
      id: 'a10_concentrated_weak',
      type: 'mcq',
      title: '10. Which describes a concentrated solution of a weak acid?',
      options: [
        { val: 'A', text: 'A. A lot of acid in the water, but only a small fraction of its molecules split into ions' },
        { val: 'B', text: 'B. Very little acid in the water, and all of it split into ions' },
        { val: 'C', text: 'C. A lot of acid in the water, and all of it split into ions' },
        { val: 'D', text: 'D. Very little acid in the water, and only a small fraction split into ions' },
      ],
      correct: 'A',
      expEn: 'Concentrated means a lot of acid in the water; weak means only a small fraction of it is dissociated. B is a dilute strong acid, C is a concentrated strong acid, and D is a dilute weak acid.',
    },
  ],
};
