// src/data/IGCSE_CHEM/M06_7/assessment.js
// The Quiz for 6.7 Group 7: the Halogens: 10 MCQ, one sitting, 12 minutes,
// modelled on the Wolsey Hall module multiple-choice quiz. Shares Gate 2 with
// the arcade at 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae are written with Unicode subscripts and charges (Cl₂, Br⁻) in plain
// text instead, as M06_2 does.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: carrying the Group I trend into Group VII, writing a halogen as
// single atoms, ignoring the charges in a halide formula, running a
// displacement backwards, giving a halide ion the wrong sign or seven charges,
// keeping a spectator ion in the ionic equation, or picking the iodide when the
// colour says bromine. No item copies a notes check or a workbook question, and
// only one (9) asks for an ionic equation — Spectator Strike stages that skill.
// The key is spread across A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_liquid_range',
      type: 'mcq',
      title: '1. Which halogen has a boiling point between 0 °C and 100 °C?',
      options: [
        { val: 'A', text: 'A. Chlorine' },
        { val: 'B', text: 'B. Iodine' },
        { val: 'C', text: 'C. Bromine' },
        { val: 'D', text: 'D. Fluorine' },
      ],
      correct: 'C',
      expEn: 'Bromine boils at 59 °C, which is why it is a liquid at room temperature. Chlorine boils at −35 °C and fluorine even lower — both are gases — while iodine boils at 184 °C.',
    },
    {
      id: 'a2_halide_name',
      type: 'mcq',
      title: '2. Calcium bromide is made when calcium reacts with bromine. What is the general name for compounds like this, of a halogen with a metal?',
      options: [
        { val: 'A', text: 'A. Halides' },
        { val: 'B', text: 'B. Halogens' },
        { val: 'C', text: 'C. Hydroxides' },
        { val: 'D', text: 'D. Alkalis' },
      ],
      correct: 'A',
      expEn: 'The compounds are halides — chlorides, bromides and iodides. "Halogen" (B) is the name of the elements themselves, not their compounds. Hydroxides and alkalis contain OH⁻, not a halogen.',
    },
    {
      id: 'a3_decreases',
      type: 'mcq',
      title: '3. Which property DECREASES as you go down Group VII?',
      options: [
        { val: 'A', text: 'A. Boiling point' },
        { val: 'B', text: 'B. Density' },
        { val: 'C', text: 'C. The number of electron shells' },
        { val: 'D', text: 'D. Reactivity' },
      ],
      correct: 'D',
      expEn: 'Reactivity decreases down Group VII: chlorine is the most reactive of the three you meet, iodine the least. Boiling point, density and the number of shells all increase. (In Group I, reactivity increases instead.)',
    },
    {
      id: 'a4_orange_unknown',
      type: 'mcq',
      title: '4. Chlorine water is added to a colourless solution Y. The mixture turns orange. What is Y?',
      options: [
        { val: 'A', text: 'A. Sodium chloride solution' },
        { val: 'B', text: 'B. Sodium bromide solution' },
        { val: 'C', text: 'C. Sodium iodide solution' },
        { val: 'D', text: 'D. Sodium hydroxide solution' },
      ],
      correct: 'B',
      expEn: 'Orange is the colour of bromine in solution, so chlorine has displaced bromine from a bromide. An iodide (C) would also react, but it would turn red-brown, from iodine. Chlorine cannot displace itself from a chloride (A), and sodium hydroxide (D) is not a halide.',
    },
    {
      id: 'a5_calcium_bromide',
      type: 'mcq',
      title: '5. Chlorine displaces bromine from calcium bromide solution. Calcium ions are Ca²⁺. Which is the balanced equation?',
      options: [
        { val: 'A', text: 'A. Cl + CaBr → CaCl + Br' },
        { val: 'B', text: 'B. Cl₂ + 2CaBr → 2CaCl + Br₂' },
        { val: 'C', text: 'C. Br₂ + CaCl₂ → CaBr₂ + Cl₂' },
        { val: 'D', text: 'D. Cl₂ + CaBr₂ → CaCl₂ + Br₂' },
      ],
      correct: 'D',
      expEn: 'Ca²⁺ needs two halide ions, so the salts are CaBr₂ and CaCl₂ — (B) ignores the charge. The halogens are diatomic, Cl₂ and Br₂ — (A) writes single atoms. (C) runs the displacement backwards: bromine is less reactive, so it cannot push chlorine out.',
    },
    {
      id: 'a6_describe_group',
      type: 'mcq',
      title: '6. Which description fits the elements of Group VII?',
      options: [
        { val: 'A', text: 'A. Non-metals with 7 outer-shell electrons, made of diatomic molecules' },
        { val: 'B', text: 'B. Metals with 7 outer-shell electrons, made of diatomic molecules' },
        { val: 'C', text: 'C. Non-metals with a full outer shell, made of single atoms' },
        { val: 'D', text: 'D. Soft metals with 1 outer-shell electron' },
      ],
      correct: 'A',
      expEn: 'The halogens are non-metals, their atoms have 7 outer-shell electrons (the group number), and they form molecules of two atoms: Cl₂, Br₂, I₂. (C) describes the noble gases of Group VIII, and (D) the alkali metals of Group I.',
    },
    {
      id: 'a7_halide_charge',
      type: 'mcq',
      title: '7. What is the charge on a halide ion, such as the iodide ion, and why?',
      options: [
        { val: 'A', text: 'A. 1+, because the halogen atom loses one electron' },
        { val: 'B', text: 'B. 7−, because the halogen atom gains seven electrons' },
        { val: 'C', text: 'C. 1−, because the halogen atom gains one electron' },
        { val: 'D', text: 'D. 1−, because the halogen atom loses one electron' },
      ],
      correct: 'C',
      expEn: 'A halogen atom has 7 outer-shell electrons and needs just one more for a full shell, so it gains one electron and becomes 1−. Losing an electron would make a positive ion (A), and D has the right charge for the wrong reason: losing a negative electron cannot leave a negative charge.',
    },
    {
      id: 'a8_astatide',
      type: 'mcq',
      title: '8. Astatine is below iodine in Group VII. Iodine solution is added to a solution of sodium astatide. What would you predict?',
      options: [
        { val: 'A', text: 'A. No reaction, because iodine is less reactive than astatine' },
        { val: 'B', text: 'B. Iodine displaces astatine, because astatine is less reactive than iodine' },
        { val: 'C', text: 'C. Astatine displaces iodine, because the lower halogen is always more reactive' },
        { val: 'D', text: 'D. No reaction, because iodine never displaces anything' },
      ],
      correct: 'B',
      expEn: 'Reactivity decreases down Group VII, so astatine is less reactive than iodine, and a halogen displaces a less reactive halogen from a solution of its halide. (A) and (C) carry the Group I trend over; (D) is true for the three halogens in the book\'s table, but only because iodine was the lowest one tested.',
    },
    {
      id: 'a9_ionic_lithium_iodide',
      type: 'mcq',
      title: '9. Chlorine water is added to lithium iodide solution. Which is the ionic equation for the reaction?',
      options: [
        { val: 'A', text: 'A. Cl₂(aq) + 2Li⁺(aq) → 2LiCl(aq)' },
        { val: 'B', text: 'B. 2Cl⁻(aq) + I₂(aq) → Cl₂(aq) + 2I⁻(aq)' },
        { val: 'C', text: 'C. Cl₂(aq) + 2Li⁺(aq) + 2I⁻(aq) → 2Li⁺(aq) + 2Cl⁻(aq) + I₂(aq)' },
        { val: 'D', text: 'D. Cl₂(aq) + 2I⁻(aq) → 2Cl⁻(aq) + I₂(aq)' },
      ],
      correct: 'D',
      expEn: 'Li⁺ is on both sides, unchanged — a spectator ion — so it is struck out; (C) leaves it in. What is left is Cl₂ + 2I⁻ → 2Cl⁻ + I₂. (B) is the reaction backwards, and (A) is built from the spectator ion and leaves out the iodide that actually reacts.',
    },
    {
      id: 'a10_density',
      type: 'mcq',
      title: '10. How does density change down Group VII, and why?',
      options: [
        { val: 'A', text: 'A. It increases: the atoms get much heavier but only a little larger' },
        { val: 'B', text: 'B. It decreases: the atoms get larger, so they are spread out more' },
        { val: 'C', text: 'C. It stays the same: every halogen is made of diatomic molecules' },
        { val: 'D', text: 'D. It increases: each molecule contains more atoms' },
      ],
      correct: 'A',
      expEn: 'Density increases down the group. The relative atomic mass rises steeply — chlorine 35.5, bromine 80, iodine 127 — while the atoms get only a little bigger, so more mass is packed into the same space. Every halogen molecule has two atoms (D).',
    },
  ],
};
