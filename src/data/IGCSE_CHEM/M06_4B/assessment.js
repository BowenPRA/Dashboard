// src/data/IGCSE_CHEM/M06_4B/assessment.js
// The Quiz for 6.4 Making Salts: Titration Calculations — 10 MCQ, one sitting,
// 12 minutes. Shares Gate 2 with the arcade at 70 XP. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// No item needs maths markup: formulae are Unicode (H₂SO₄, cm³, mol/dm³) and
// numbers use a Unicode minus.
//
// Every distractor is the answer you reach by making ONE nameable mistake:
// leaving a volume in cm³, dividing by 100 instead of 1000, using the ratio
// upside down or ignoring it, dividing the wrong way round, dividing by the
// other solution's volume, adding the burette readings, or stopping before the
// end-point. Only a10 stages a whole calculation; the rest test single steps,
// because the full method is the Titration Bench task's job. No item copies a
// notes check or a workbook question, and the correct letter is spread across
// A/B/C/D (A 2 · B 3 · C 2 · D 3).
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_end_point',
      type: 'mcq',
      title: '1. What is the end-point of a titration?',
      options: [
        { val: 'A', text: 'A. The moment all the solution in the burette has run out' },
        { val: 'B', text: 'B. The point where the indicator just changes colour for good, because the reaction is complete' },
        { val: 'C', text: 'C. The reading at the bottom of the burette scale, 50 cm³' },
        { val: 'D', text: 'D. The first flash of colour change, which disappears again when the flask is swirled' },
      ],
      correct: 'B',
      expEn: 'At the end-point the reaction is just complete, so one more drop changes the indicator for good. A flash that disappears on swirling (D) means alkali is still left — stopping there is stopping too early. The burette running out (A, C) has nothing to do with the reaction.',
    },
    {
      id: 'a2_scale_down',
      type: 'mcq',
      title: '2. A burette reads 0.0 at the top and 50.0 near the tap. Why is its scale numbered down the tube?',
      options: [
        { val: 'A', text: 'A. So that the reading is the volume still left in the burette' },
        { val: 'B', text: 'B. So that the tube can be read with the eye above the liquid' },
        { val: 'C', text: 'C. Because acid is denser than water and sinks' },
        { val: 'D', text: 'D. So that the reading goes up by exactly the volume that has run out' },
      ],
      correct: 'D',
      expEn: 'As liquid runs out of the tap, the level falls, and the numbers get bigger down the tube. So the change in the reading is the volume that has been added: final − initial. The reading is not the volume left (A), and you always read at eye level (B).',
    },
    {
      id: 'a3_dm3_to_cm3',
      type: 'mcq',
      title: '3. A calculation gives a volume of 0.035 dm³. What is this in cm³?',
      options: [
        { val: 'A', text: 'A. 35 cm³' },
        { val: 'B', text: 'B. 0.000035 cm³' },
        { val: 'C', text: 'C. 3.5 cm³' },
        { val: 'D', text: 'D. 350 cm³' },
      ],
      correct: 'A',
      expEn: '1 dm³ = 1000 cm³, so dm³ to cm³ means multiply by 1000: 0.035 × 1000 = 35 cm³. Option B divided instead of multiplying; C multiplied by 100 and D by 10 000.',
    },
    {
      id: 'a4_step1_moles',
      type: 'mcq',
      title: '4. How many moles of acid are in 200 cm³ of a 0.5 mol/dm³ solution?',
      options: [
        { val: 'A', text: 'A. 100 mol' },
        { val: 'B', text: 'B. 2.5 mol' },
        { val: 'C', text: 'C. 0.1 mol' },
        { val: 'D', text: 'D. 0.4 mol' },
      ],
      correct: 'C',
      expEn: '200 cm³ = 0.2 dm³, and moles = concentration × volume = 0.5 × 0.2 = 0.1 mol. Option A used 200 without changing it into dm³; B divided the concentration by the volume; D divided the volume by the concentration.',
    },
    {
      id: 'a5_ratio_sulfuric',
      type: 'mcq',
      title: '5. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. In a titration, 0.006 mol of sodium hydroxide is neutralised. How many moles of sulfuric acid reacted?',
      options: [
        { val: 'A', text: 'A. 0.012 mol' },
        { val: 'B', text: 'B. 0.003 mol' },
        { val: 'C', text: 'C. 0.006 mol' },
        { val: 'D', text: 'D. It cannot be found without the concentration of the acid' },
      ],
      correct: 'B',
      expEn: 'The equation has 1 H₂SO₄ for every 2 NaOH, so the acid is half: 0.006 ÷ 2 = 0.003 mol. Option A used the ratio upside down; C ignored it. The ratio needs only the equation (D) — the acid\'s concentration is what the moles are used to FIND.',
    },
    {
      id: 'a6_step4_vinegar',
      type: 'mcq',
      title: '6. A titration shows there is 0.0036 mol of ethanoic acid in 20.0 cm³ of vinegar. What is the concentration of ethanoic acid in the vinegar?',
      options: [
        { val: 'A', text: 'A. 0.00018 mol/dm³' },
        { val: 'B', text: 'B. 5.6 mol/dm³' },
        { val: 'C', text: 'C. 0.000072 mol/dm³' },
        { val: 'D', text: 'D. 0.18 mol/dm³' },
      ],
      correct: 'D',
      expEn: '20.0 cm³ = 0.020 dm³, and concentration = moles ÷ volume = 0.0036 ÷ 0.020 = 0.18 mol/dm³. Option A divided by 20 instead of 0.020; B divided the volume by the moles; C multiplied the two.',
    },
    {
      id: 'a7_standard_solution',
      type: 'mcq',
      title: '7. In a titration, what is a standard solution?',
      options: [
        { val: 'A', text: 'A. A solution whose concentration is known accurately' },
        { val: 'B', text: 'B. Any solution with a concentration of exactly 1 mol/dm³' },
        { val: 'C', text: 'C. A neutral solution, with a pH of 7' },
        { val: 'D', text: 'D. Whichever solution is put in the conical flask' },
      ],
      correct: 'A',
      expEn: 'The standard solution is the one of known concentration, which you titrate the other solution against. It can have any concentration (B) — the book\'s examples just happen to use 1 mol/dm³ — and it can be in the flask or in the burette (D).',
    },
    {
      id: 'a8_white_tile',
      type: 'mcq',
      title: '8. Why is a white tile put under the conical flask during a titration?',
      options: [
        { val: 'A', text: 'A. To protect the bench from spilt acid' },
        { val: 'B', text: 'B. To stop the flask from sliding while it is swirled' },
        { val: 'C', text: 'C. So that the colour change at the end-point is easy to see' },
        { val: 'D', text: 'D. To catch drops that fall from the burette' },
      ],
      correct: 'C',
      expEn: 'The whole titration depends on seeing the exact drop that changes the indicator. Against a white background even a small colour change shows clearly. The tile is not there to protect the bench or catch drops — every drop must go into the flask.',
    },
    {
      id: 'a9_volume_rearranged',
      type: 'mcq',
      title: '9. Both concentrations are known, so a question asks for the volume of acid needed. Once you know the moles of acid, how do you find its volume in dm³?',
      options: [
        { val: 'A', text: 'A. volume = moles × concentration' },
        { val: 'B', text: 'B. volume = moles ÷ concentration' },
        { val: 'C', text: 'C. volume = concentration ÷ moles' },
        { val: 'D', text: 'D. volume = moles ÷ 1000' },
      ],
      correct: 'B',
      expEn: 'Cover "volume" on the calculation triangle and moles is left over concentration: volume = moles ÷ concentration, in dm³. Multiply by 1000 afterwards for cm³. Option C divides the wrong way round, and D confuses the unit change with the calculation.',
    },
    {
      id: 'a10_full_calculation',
      type: 'mcq',
      title: '10. 20.0 cm³ of dilute sulfuric acid is exactly neutralised by 16.0 cm³ of 0.25 mol/dm³ sodium hydroxide solution. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. What is the concentration of the sulfuric acid?',
      options: [
        { val: 'A', text: 'A. 0.4 mol/dm³' },
        { val: 'B', text: 'B. 0.2 mol/dm³' },
        { val: 'C', text: 'C. 0.125 mol/dm³' },
        { val: 'D', text: 'D. 0.1 mol/dm³' },
      ],
      correct: 'D',
      expEn: 'Step 1: 0.25 × 0.016 = 0.004 mol NaOH. Step 2: 1 H₂SO₄ to 2 NaOH. Step 3: 0.004 ÷ 2 = 0.002 mol H₂SO₄. Step 4: 0.002 ÷ 0.020 = 0.1 mol/dm³. Option A used the ratio upside down; B ignored it; C divided by the alkali\'s volume (0.016 dm³) instead of the acid\'s.',
    },
  ],
};
