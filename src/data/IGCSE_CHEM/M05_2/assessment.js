// src/data/IGCSE_CHEM/M05_2/assessment.js
// The Quiz for M05_2 Bond Energies & Calculating ΔH: 10 MCQ, one sitting,
// 12 minutes. Shares Gate 2 with the arcade at 70 XP. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of notes/workbook. Most items need no maths markup at all: bonds
// are plain text (H–H, O=O, N≡N) and numbers use a Unicode minus.
//
// Every distractor is the answer you reach by making ONE nameable mistake:
// forgetting the coefficient, doing out − in, dropping or flipping the sign,
// adding instead of subtracting, splitting a double bond into two singles, or
// reading the wrong bond's value. Only a10 stages a whole calculation; the rest
// test single steps, because the full method is the Bond Ledger task's job.
// No item copies a notes check or a workbook question, and the correct letter
// is spread across A/B/C/D (A 2 · B 3 · C 3 · D 2).
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_define',
      type: 'mcq',
      title: '1. Which of these is the best definition of bond energy?',
      options: [
        { val: 'A', text: 'A. The total energy given out when a reaction takes place' },
        { val: 'B', text: 'B. The energy needed to break one mole of a particular bond, which is also released when one mole of that bond forms' },
        { val: 'C', text: 'C. The minimum energy colliding particles need in order to react' },
        { val: 'D', text: 'D. The energy stored in one atom of an element' },
      ],
      correct: 'B',
      expEn: 'Bond energy belongs to one kind of bond, and it is quoted per mole of that bond, in kJ/mol. Option A describes the enthalpy change of a whole reaction, and option C is the activation energy.',
    },
    {
      id: 'a2_joules',
      type: 'mcq',
      title: '2. Breaking one mole of C–H bonds needs 413 kJ. How much is this in joules?',
      options: [
        { val: 'A', text: 'A. 0.413 J' },
        { val: 'B', text: 'B. 4130 J' },
        { val: 'C', text: 'C. 41 300 J' },
        { val: 'D', text: 'D. 413 000 J' },
      ],
      correct: 'D',
      expEn: '1 kJ = 1000 J, so kJ to J means multiply by 1000: 413 × 1000 = 413 000 J. Option A divided instead of multiplying; options B and C multiplied by 10 and 100.',
    },
    {
      id: 'a3_count_coefficient',
      type: 'mcq',
      title: '3. Propane is C₃H₈: three carbon atoms in a chain, with eight hydrogen atoms around them. How many C–H bonds are broken when 2C₃H₈ burns?',
      options: [
        { val: 'A', text: 'A. 8' },
        { val: 'B', text: 'B. 11' },
        { val: 'C', text: 'C. 16' },
        { val: 'D', text: 'D. 20' },
      ],
      correct: 'C',
      expEn: 'Each propane molecule has 8 C–H bonds, and the coefficient 2 means two molecules: 2 × 8 = 16. Option A forgot the coefficient; option D also counted the 4 C–C bonds, which are not C–H; option B counted atoms, not bonds.',
    },
    {
      id: 'a4_double_bond',
      type: 'mcq',
      title: '4. An equation has 3O₂ in its reactants. Using O=O = 498 kJ/mol, how much energy is taken in to break these oxygen molecules?',
      options: [
        { val: 'A', text: 'A. 1494 kJ' },
        { val: 'B', text: 'B. 498 kJ' },
        { val: 'C', text: 'C. 2988 kJ' },
        { val: 'D', text: 'D. 1392 kJ' },
      ],
      correct: 'A',
      expEn: 'Each O₂ is one O=O double bond, which has its own value in the table. Three molecules: 3 × 498 = 1494 kJ. Option B forgot the coefficient; option C counted each double bond twice; option D used the O–H value (464) instead.',
    },
    {
      id: 'a5_which_way_round',
      type: 'mcq',
      title: '5. A student finds energy in = 1850 kJ and energy out = 2030 kJ. She writes ΔH = +180 kJ. What has she done wrong?',
      options: [
        { val: 'A', text: 'A. Nothing — the answer is correct' },
        { val: 'B', text: 'B. She worked out energy out − energy in; the answer should be −180 kJ, exothermic' },
        { val: 'C', text: 'C. She should have added the totals, to give 3880 kJ' },
        { val: 'D', text: 'D. She should have divided the totals, to give 0.91' },
      ],
      correct: 'B',
      expEn: 'ΔH = energy in − energy out = 1850 − 2030 = −180 kJ. More energy came out than went in, so the reaction is exothermic. Subtracting the wrong way round gives the right size but the wrong sign.',
    },
    {
      id: 'a6_energy_out',
      type: 'mcq',
      title: '6. Carbon dioxide is O=C=O. How much energy is given out when the bonds in 2CO₂ form? (C=O = 805 kJ/mol)',
      options: [
        { val: 'A', text: 'A. 805 kJ' },
        { val: 'B', text: 'B. 1610 kJ' },
        { val: 'C', text: 'C. 3220 kJ' },
        { val: 'D', text: 'D. 1432 kJ' },
      ],
      correct: 'C',
      expEn: 'Each CO₂ molecule has two C=O bonds, and there are two molecules: 2 × 2 = 4 C=O bonds, and 4 × 805 = 3220 kJ. Option B counted only one of those two things; option D used the C–O single bond value (358) instead of C=O.',
    },
    {
      id: 'a7_per_mole',
      type: 'mcq',
      title: '7. For H₂ + F₂ → 2HF, ΔH = −536 kJ. How much energy is given out when 1 mole of HF forms?',
      options: [
        { val: 'A', text: 'A. 536 kJ' },
        { val: 'B', text: 'B. 1072 kJ' },
        { val: 'C', text: 'C. 565 kJ' },
        { val: 'D', text: 'D. 268 kJ' },
      ],
      correct: 'D',
      expEn: 'The −536 kJ is for the equation as written, which makes 2 moles of HF. One mole is half of that: 536 ÷ 2 = 268 kJ. Option A forgot the equation makes two moles; option C is just the H–F bond energy, which ignores the bonds that had to break first.',
    },
    {
      id: 'a8_top_level',
      type: 'mcq',
      title: '8. On a bond energy diagram for H₂ + F₂ → 2HF, the top level is labelled "bonds broken". What is present at that level?',
      options: [
        { val: 'A', text: 'A. Separate atoms: 2H and 2F' },
        { val: 'B', text: 'B. Hydrogen and fluorine molecules, H₂ and F₂' },
        { val: 'C', text: 'C. Two molecules of HF' },
        { val: 'D', text: 'D. Nothing — the energy has all been given out' },
      ],
      correct: 'A',
      expEn: 'The up arrow is the energy taken in to break every bond in the reactants. At the top nothing is bonded, so there are only separate atoms. The HF molecules only appear after the down arrow, when new bonds form.',
    },
    {
      id: 'a9_inert',
      type: 'mcq',
      title: '9. Fluorine, F₂, is extremely reactive, but nitrogen, N₂, is very unreactive. Which reason, using bond energies, is correct?',
      options: [
        { val: 'A', text: 'A. N≡N gives out 946 kJ/mol when it breaks, so nitrogen loses its energy' },
        { val: 'B', text: 'B. Nitrogen is a noble gas, so it has a full outer shell of electrons' },
        { val: 'C', text: 'C. N≡N (946 kJ/mol) needs far more energy to break than F–F (158 kJ/mol)' },
        { val: 'D', text: 'D. Fluorine molecules have more bonds than nitrogen molecules' },
      ],
      correct: 'C',
      expEn: 'Before either gas can react, its bond must be broken. The N≡N triple bond needs about six times as much energy in as the F–F single bond, so nitrogen barely reacts. Option A has the direction wrong: breaking a bond takes energy in. Nitrogen is not a noble gas (B).',
    },
    {
      id: 'a10_full_calculation',
      type: 'mcq',
      title: '10. Ethene reacts with steam to make ethanol: C₂H₄ + H₂O → C₂H₅OH. The energy in is 3192 kJ. The bonds made are 1 C–C (346), 5 C–H (413), 1 C–O (358) and 1 O–H (464). What is ΔH?',
      options: [
        { val: 'A', text: 'A. +41 kJ' },
        { val: 'B', text: 'B. −41 kJ' },
        { val: 'C', text: 'C. +423 kJ' },
        { val: 'D', text: 'D. +6425 kJ' },
      ],
      correct: 'B',
      expEn: 'Energy out = 346 + (5 × 413) + 358 + 464 = 346 + 2065 + 358 + 464 = 3233 kJ. ΔH = in − out = 3192 − 3233 = −41 kJ, so the reaction is exothermic. Option A did out − in; option C left the O–H bond out of the energy out; option D added the two totals.',
    },
  ],
};
