// src/data/IGCSE_CHEM/M05_3/assessment.js
// The Quiz for M05_3 Measuring the Rate of a Reaction: 10 MCQ, one sitting,
// 12 minutes. Shares Gate 2 with the arcade at 70 XP. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of notes/workbook. Units (cm³/min, g) are written as plain text.
//
// Every distractor is one nameable mistake: reading the running total instead
// of the volume made in that minute, dividing time by volume, dividing by the
// time the student stopped watching, adding readings, taking "ends higher" for
// "faster", or choosing a unit with the wrong quantity or no time in it. Every
// item uses fresh substances and numbers; none copies a notes check or a
// workbook question. Graph reading is left to the Rate Reader task — only one
// item here (a4) is about the shape of a curve.
// Key: A ×3, B ×3, C ×2, D ×2.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_what_to_measure',
      type: 'mcq',
      title: '1. Zinc reacts with dilute sulfuric acid to make zinc sulfate and hydrogen. Which measurement could NOT be used to find the rate of this reaction?',
      options: [
        { val: 'A', text: 'A. The mass of zinc used up each minute' },
        { val: 'B', text: 'B. The volume of hydrogen given off each minute' },
        { val: 'C', text: 'C. The total mass of zinc sulfate in the flask at the end' },
        { val: 'D', text: 'D. The amount of sulfuric acid used up each minute' },
      ],
      correct: 'C',
      expEn: 'A rate is an amount PER UNIT OF TIME. A, B and D each follow a reactant used up or a product formed every minute. The total at the end is a single amount with no time in it, so it cannot say how fast the reaction went.',
    },
    {
      id: 'a2_one_minute',
      type: 'mcq',
      title: '2. A gas syringe reads 0 cm³ at the start, 24 cm³ after 1 minute and 42 cm³ after 2 minutes. How much gas was produced during the second minute?',
      options: [
        { val: 'A', text: 'A. 42 cm³' },
        { val: 'B', text: 'B. 18 cm³' },
        { val: 'C', text: 'C. 21 cm³' },
        { val: 'D', text: 'D. 66 cm³' },
      ],
      correct: 'B',
      expEn: 'The second minute runs from 1 to 2 minutes: end reading − start reading = 42 − 24 = 18 cm³. 42 cm³ is the total since the start, 21 cm³ is the average over two minutes, and 66 cm³ adds two running totals together.',
    },
    {
      id: 'a3_units',
      type: 'mcq',
      title: '3. Hydrogen peroxide breaks down to water and oxygen. A student reads the volume of oxygen in a gas syringe every 10 seconds. Which unit should the rate be given in?',
      options: [
        { val: 'A', text: 'A. cm³/s' },
        { val: 'B', text: 'B. g/s' },
        { val: 'C', text: 'C. s/cm³' },
        { val: 'D', text: 'D. cm³' },
      ],
      correct: 'A',
      expEn: 'The student measured a VOLUME (cm³) against a TIME in seconds, so the rate is cm³ per second. g/s is for a mass, s/cm³ has the time on top, and cm³ alone has no time in it.',
    },
    {
      id: 'a4_curve_shape',
      type: 'mcq',
      title: '4. A curve of volume of gas against time is steep at first, then becomes less and less steep. What does this show?',
      options: [
        { val: 'A', text: 'A. The reaction is speeding up' },
        { val: 'B', text: 'B. The reaction has already finished' },
        { val: 'C', text: 'C. The rate stays the same all the way through' },
        { val: 'D', text: 'D. The rate is greatest at the start and decreases as the reaction goes on' },
      ],
      correct: 'D',
      expEn: 'The steeper the curve, the faster the reaction. Steep at first then less steep means the rate falls as time goes on. A finished reaction would show a FLAT line; a constant rate would be a straight line.',
    },
    {
      id: 'a5_why_it_slows',
      type: 'mcq',
      title: '5. Magnesium reacts with excess dilute hydrochloric acid. Why does the rate of reaction decrease as the reaction goes on?',
      options: [
        { val: 'A', text: 'A. The magnesium is being used up, so there are fewer magnesium particles left to react' },
        { val: 'B', text: 'B. The acid is all used up before the magnesium' },
        { val: 'C', text: 'C. The hydrogen collected in the syringe pushes back and slows the reaction' },
        { val: 'D', text: 'D. The magnesium gets a new coat of oxide as it reacts' },
      ],
      correct: 'A',
      expEn: 'As the reaction goes on, the reactant is used up, so fewer particles are left to react and the rate falls. The acid is in EXCESS, so it is not the acid that runs out (B).',
    },
    {
      id: 'a6_average_rate',
      type: 'mcq',
      title: '6. Marble chips and dilute hydrochloric acid produced 90 cm³ of carbon dioxide. The volume stopped rising at 3 minutes, but the student kept taking readings until 5 minutes. What was the average rate of reaction?',
      options: [
        { val: 'A', text: 'A. 18 cm³/min' },
        { val: 'B', text: 'B. 0.033 min/cm³' },
        { val: 'C', text: 'C. 30 cm³/min' },
        { val: 'D', text: 'D. 270 cm³/min' },
      ],
      correct: 'C',
      expEn: 'Average rate = total volume ÷ the time the reaction took = $$90 \\div 3 = 30$$ cm³/min. 18 divides by the 5 minutes the student kept watching; 0.033 is time ÷ volume; 270 multiplies instead of dividing.',
    },
    {
      id: 'a7_excess',
      type: 'mcq',
      title: '7. In the gas syringe experiment, the dilute hydrochloric acid is in excess. Which reactant decides the TOTAL volume of hydrogen made?',
      options: [
        { val: 'A', text: 'A. The acid, because there is more of it' },
        { val: 'B', text: 'B. The magnesium, because it is the reactant that runs out' },
        { val: 'C', text: 'C. Both reactants equally' },
        { val: 'D', text: 'D. Neither: the size of the gas syringe decides it' },
      ],
      correct: 'B',
      expEn: 'With the acid in excess, there is more acid than is needed, so the reaction stops when the magnesium is all used up. More magnesium would make more hydrogen; more acid would not.',
    },
    {
      id: 'a8_mass_loss',
      type: 'mcq',
      title: '8. Marble chips react with acid in a flask on a balance. The mass is 85.50 g at the start, 85.10 g after 1 minute and 84.85 g after 2 minutes. What mass was lost during the SECOND minute?',
      options: [
        { val: 'A', text: 'A. 0.65 g' },
        { val: 'B', text: 'B. 0.40 g' },
        { val: 'C', text: 'C. 84.85 g' },
        { val: 'D', text: 'D. 0.25 g' },
      ],
      correct: 'D',
      expEn: 'The second minute runs from 1 to 2 minutes: $$85.10 - 84.85 = 0.25$$ g. 0.65 g is the loss over both minutes, 0.40 g is the first minute, and 84.85 g is the mass left in the flask, not the mass lost.',
    },
    {
      id: 'a9_clock_error',
      type: 'mcq',
      title: '9. A student sealed the flask at once but started the stopclock 10 seconds after adding the magnesium. How does the average rate she calculates compare with the true value?',
      options: [
        { val: 'A', text: 'A. Too low, because some gas was lost' },
        { val: 'B', text: 'B. Too high, because her time for the reaction is too short' },
        { val: 'C', text: 'C. The same, because the total volume is correct' },
        { val: 'D', text: 'D. Too high, because more gas was collected' },
      ],
      correct: 'B',
      expEn: 'The flask was sealed at once, so no gas was lost and the total volume is right. But every time she records is 10 seconds short, so she divides the right volume by too small a time — the average rate comes out too high.',
    },
    {
      id: 'a10_first_vs_average',
      type: 'mcq',
      title: '10. In one experiment, 16 cm³ of gas was made in the first minute, and 40 cm³ was made in total over the 5 minutes the reaction lasted. Which statement is correct?',
      options: [
        { val: 'A', text: 'A. The rate in the first minute (16 cm³/min) is greater than the average rate (8 cm³/min)' },
        { val: 'B', text: 'B. The average rate (8 cm³/min) is greater than the rate in the first minute' },
        { val: 'C', text: 'C. The two rates are equal, because both are measured in cm³/min' },
        { val: 'D', text: 'D. The average rate is 200 cm³/min' },
      ],
      correct: 'A',
      expEn: 'Average rate = $$40 \\div 5 = 8$$ cm³/min, and the first minute gave 16 cm³/min. That fits the rule: the rate is greatest at the start, so the first minute beats the average. 200 multiplies instead of dividing.',
    },
  ],
};
