// src/data/COORD_SCI/U05_1/assessment.js
// The Quiz for C5.01 Exothermic and endothermic reactions: 8 MCQ, one sitting,
// 10 minutes. Shares Gate 2 with the arcade at 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of notes/workbook.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake (reading the ΔH sign backwards, measuring the activation energy from
// the axis instead of the reactants line, judging endothermic by how hot the
// apparatus is) — and no item simply copies a notes check or workbook question.
// The correct letter is spread across A/B/C/D so the key cannot be guessed.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_define',
      type: 'mcq',
      title: '1. During an endothermic reaction, what happens to the temperature of the surroundings?',
      options: [
        { val: 'A', text: 'A. It rises, because heat is given out' },
        { val: 'B', text: 'B. It falls, because heat is taken in from them' },
        { val: 'C', text: 'C. It stays exactly the same' },
        { val: 'D', text: 'D. It rises, because bonds are broken' },
      ],
      correct: 'B',
      expEn: 'ENdothermic means heat ENters the reaction. That heat comes out of the surroundings, so the surroundings cool and the mixture feels cold. Option A describes an exothermic reaction.',
    },
    {
      id: 'a2_thermometer',
      type: 'mcq',
      title: '2. A thermometer in a test tube reads a higher temperature during a reaction. Why?',
      options: [
        { val: 'A', text: 'A. Thermal energy has been transferred into the thermometer, which is part of the surroundings' },
        { val: 'B', text: 'B. The thermometer senses the heat from a distance' },
        { val: 'C', text: 'C. The mercury reacts with the chemicals in the tube' },
        { val: 'D', text: 'D. The glass of the thermometer expands and pushes the liquid up' },
      ],
      correct: 'A',
      expEn: 'The thermometer is one of the surroundings. The reading only rises because heat has actually moved into it — which is why the bulb has to be in the mixture, not held above it.',
    },
    {
      id: 'a3_axes',
      type: 'mcq',
      title: '3. On an energy level diagram, what is plotted along the horizontal axis?',
      options: [
        { val: 'A', text: 'A. The energy of the substances, in kJ' },
        { val: 'B', text: 'B. The temperature of the surroundings' },
        { val: 'C', text: 'C. The progress of the reaction, reactants on the left and products on the right' },
        { val: 'D', text: 'D. The time in seconds since the reaction began' },
      ],
      correct: 'C',
      expEn: 'Energy goes up the vertical axis (option A describes that one); the horizontal axis is the progress of reaction. It is not a time axis — a slow and a fast reaction can share the same diagram.',
    },
    {
      id: 'a4_delta_h_sign',
      type: 'mcq',
      title: '4. The burning of methane has $$\\Delta H = -728$$ kJ/mol. What does the sign tell you?',
      options: [
        { val: 'A', text: 'A. The reaction absorbs 728 kJ per mole' },
        { val: 'B', text: 'B. The enthalpy of the system fell, so energy was released — it is exothermic' },
        { val: 'C', text: 'C. The products are higher in energy than the reactants' },
        { val: 'D', text: 'D. The reaction gets colder as it goes' },
      ],
      correct: 'B',
      expEn: 'A negative enthalpy change means the system ended with less energy than it started with, and that energy left as heat. Negative always means exothermic, so the products are LOWER (which rules out C).',
    },
    {
      id: 'a5_bonds',
      type: 'mcq',
      title: '5. Which statement about chemical bonds is correct?',
      options: [
        { val: 'A', text: 'A. Breaking bonds releases energy; making bonds absorbs it' },
        { val: 'B', text: 'B. Both breaking and making bonds release energy' },
        { val: 'C', text: 'C. Breaking bonds absorbs energy; making bonds releases it' },
        { val: 'D', text: 'D. Neither breaking nor making bonds involves any energy' },
      ],
      correct: 'C',
      expEn: 'A bond is a force of attraction, so pulling atoms apart costs energy (endothermic) and letting them come together gives it back (exothermic). Option A is the same idea reversed — the commonest slip. MEXOBENDO: Making EXO, Breaking ENDO.',
    },
    {
      id: 'a6_bond_totals',
      type: 'mcq',
      title: '6. In a reaction, the bonds broken take in 800 kJ and the bonds made give out 950 kJ. The reaction is:',
      options: [
        { val: 'A', text: 'A. Endothermic, $$\\Delta H = +150$$ kJ/mol' },
        { val: 'B', text: 'B. Exothermic, $$\\Delta H = -1750$$ kJ/mol' },
        { val: 'C', text: 'C. Endothermic, $$\\Delta H = +1750$$ kJ/mol' },
        { val: 'D', text: 'D. Exothermic, $$\\Delta H = -150$$ kJ/mol' },
      ],
      correct: 'D',
      expEn: 'Compare, do not add: 950 kJ out against 800 kJ in leaves 150 kJ released overall, so the reaction is exothermic and ΔH is −150 kJ/mol. Options B and C add the two totals instead of finding the difference.',
    },
    {
      id: 'a7_activation',
      type: 'mcq',
      title: '7. Why does even a strongly exothermic reaction need an activation energy?',
      options: [
        { val: 'A', text: 'A. Because some bonds must be broken before new ones can form, and breaking takes energy in' },
        { val: 'B', text: 'B. Because every reaction must be heated with a Bunsen burner' },
        { val: 'C', text: 'C. Because the products are always higher in energy than the reactants' },
        { val: 'D', text: 'D. Because exothermic reactions are always very slow' },
      ],
      correct: 'A',
      expEn: 'Bond breaking always comes first and is always endothermic, so there is always a barrier — sometimes tiny, but never zero. Option C is false for an exothermic reaction, where the products are lower.',
    },
    {
      id: 'a8_reading_a_diagram',
      type: 'mcq',
      title: '8. A diagram shows the products line ABOVE the reactants line, with a tall peak between them. Which description fits?',
      options: [
        { val: 'A', text: 'A. Exothermic, $$\\Delta H$$ negative, low activation energy' },
        { val: 'B', text: 'B. Endothermic, $$\\Delta H$$ positive, high activation energy' },
        { val: 'C', text: 'C. Exothermic, $$\\Delta H$$ positive, high activation energy' },
        { val: 'D', text: 'D. Endothermic, $$\\Delta H$$ negative, low activation energy' },
      ],
      correct: 'B',
      expEn: 'Products above reactants means the system gained energy: endothermic, so ΔH is positive, and a tall peak is a high activation energy. Options C and D pair the right type with the wrong sign — the two always agree.',
    },
  ],
};
