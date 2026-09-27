// src/data/IGCSE_CHEM/M05_3/workbook.js
// Reveal-solution practice for M05_3 Measuring the Rate of a Reaction.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — nothing is free-typed. Reading values off a GRAPH is the
// Rate Reader task's job, so this set works from a results TABLE instead
// (DIAGRAMS.WB_ZINC_TABLE) and carries what that task does not stage: the
// definitions, choosing what to measure and with what, the reason for each step
// of the method, "excess", suitable units, and sources of error. Focus stays on
// Core, so a shaky student has somewhere to stand.
//
// The zinc table: 0, 16, 28, 37, 43, 46, 48, 48, 48 cm³ at 0–8 min. Per-minute
// volumes 16, 12, 9, 6, 3, 2, 0 — over at 6 min, 48 cm³ in all, average
// 48 ÷ 6 = 8 cm³/min, third minute 37 − 28 = 9 cm³/min.
//
// Inline maths uses $…$ with \text{} for units. See docs/workbook-tasks.md.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which is the best definition of the **rate of a reaction**?',
        options: [
          { val: 'a', text: 'The total amount of product made by the end' },
          { val: 'b', text: 'The amount of a reactant used up, or of a product formed, per unit of time' },
          { val: 'c', text: 'The time it takes for the reaction to start' },
          { val: 'd', text: 'The temperature at which the reaction goes fastest' },
        ],
        correct: 'b',
        solution: [
          'A rate always has two parts: an **amount** and a **unit of time**.',
          'For a reaction, the amount can be a reactant **used up** or a product **formed** — per second, per minute, and so on.',
          'Option (a) has no time in it, so it is only an amount.',
        ],
        answer: 'Reactant used up, or product formed, per unit of time',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'A reaction gives off a gas. Choose the apparatus you need to follow its rate.',
        textParts: [
          'Collect the gas in a ',
          ' to measure its volume, and use a ',
          ' to measure the time.',
        ],
        blanks: {
          1: { correct: 'gas syringe', options: [{ val: 'gas syringe', text: 'gas syringe' }, { val: 'thermometer', text: 'thermometer' }, { val: 'test tube', text: 'test tube' }] },
          2: { correct: 'stopclock', options: [{ val: 'stopclock', text: 'stopclock' }, { val: 'balance', text: 'balance' }, { val: 'ruler', text: 'ruler' }] },
        },
        solution: [
          'The **gas syringe** collects the gas; its plunger moves out and the scale gives the volume in cm³.',
          'The **stopclock** gives the time of each reading, so you can say how much gas came **per minute**.',
        ],
        answer: 'gas syringe … stopclock',
      },
      {
        id: 'f3', type: 'mcq',
        prompt: 'In the magnesium experiment, the dilute hydrochloric acid is **in excess**. What does that mean?',
        options: [
          { val: 'a', text: 'There is exactly enough acid to react with all the magnesium' },
          { val: 'b', text: 'The acid is very concentrated' },
          { val: 'c', text: 'There is more acid than needed, so all the magnesium reacts and some acid is left over' },
          { val: 'd', text: 'The acid has been warmed before it is used' },
        ],
        correct: 'c',
        solution: [
          '**Excess** means **more than enough**.',
          'With the acid in excess, the magnesium is the reactant that runs out. All of it reacts, and some acid is still there at the end.',
        ],
        answer: 'More acid than needed: all the magnesium reacts, some acid is left over',
      },
      {
        id: 'f4', type: 'dnd',
        prompt: 'Drag each unit to the right group.',
        bank: [
          { val: 'cm3min', text: 'cm³/min' },
          { val: 'gs', text: 'g/s' },
          { val: 'cm3s', text: 'cm³/s' },
          { val: 'cm3', text: 'cm³' },
          { val: 'min', text: 'min' },
          { val: 'g', text: 'g' },
        ],
        targets: [
          { id: 'rate', title: 'A unit for a rate' },
          { id: 'not', title: 'Not a unit for a rate' },
        ],
        correctSets: { rate: ['cm3min', 'gs', 'cm3s'], not: ['cm3', 'min', 'g'] },
        solution: [
          'A rate unit is **the unit of the amount / the unit of time**: cm³/min, cm³/s, g/s.',
          'cm³ and g are amounts on their own, and min is a time on its own — none of them says **how much per unit of time**.',
        ],
        answer: 'cm³/min, g/s, cm³/s are rate units; cm³, min, g are not',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'dnd',
        prompt: 'Drag each step of the magnesium experiment to the **reason** for doing it.',
        bank: [
          { val: 'clean', text: 'Rub the ribbon with sandpaper' },
          { val: 'stopper', text: 'Put the stopper in at once' },
          { val: 'clock', text: 'Start the clock as the metal goes in' },
          { val: 'excess', text: 'Use the acid in excess' },
        ],
        targets: [
          { id: 'oxide', title: 'So the acid reaches the metal straight away' },
          { id: 'escape', title: 'So no gas escapes before it is collected' },
          { id: 'start', title: 'So every time is measured from the real start' },
          { id: 'all', title: 'So all the magnesium reacts' },
        ],
        correctSets: { oxide: ['clean'], escape: ['stopper'], start: ['clock'], all: ['excess'] },
        solution: [
          'Sandpaper removes the **magnesium oxide** coat, so the reaction starts at once.',
          'The gas starts the moment the metal meets the acid — seal the flask **immediately** so none escapes.',
          'Start the clock at the **same moment**, so each reading is timed from the true start.',
          'Acid **in excess** means the magnesium runs out first: all of it reacts.',
        ],
        answer: 'sandpaper → oxide · stopper → no gas escapes · clock → real start · excess → all magnesium reacts',
      },
      {
        id: 'p2', type: 'mcq',
        prompt: 'Zinc granules react with excess dilute sulfuric acid. Use the table. What was the rate of reaction during the **third minute**?',
        inlineSvg: DIAGRAMS.WB_ZINC_TABLE,
        options: [
          { val: 'a', text: '37 cm³/min' },
          { val: 'b', text: '9 cm³/min' },
          { val: 'c', text: '12.3 cm³/min' },
          { val: 'd', text: '28 cm³/min' },
        ],
        correct: 'b',
        solution: [
          'The third minute runs from **2 minutes to 3 minutes**.',
          'Reading at the end: 37 cm³. Reading at the start: 28 cm³.',
          'The minute\'s rate = end reading − start reading = $37 - 28 = 9$ cm³/min.',
          '37 is the total collected since the start, and 37 ÷ 3 is an average over three minutes — neither is the rate in that one minute.',
        ],
        answer: '9 cm³/min',
      },
      {
        id: 'p3', type: 'inline',
        prompt: 'Use the same zinc table. Complete the sentence.',
        inlineSvg: DIAGRAMS.WB_ZINC_TABLE,
        textParts: [
          'The reaction finished at ',
          ' minutes, and the total volume of hydrogen made was ',
          ' cm³.',
        ],
        blanks: {
          1: { correct: '6', options: [{ val: '5', text: '5' }, { val: '6', text: '6' }, { val: '8', text: '8' }] },
          2: { correct: '48', options: [{ val: '46', text: '46' }, { val: '48', text: '48' }, { val: '144', text: '144' }] },
        },
        solution: [
          'Look for where the volume **stops changing**: 48 at 6 minutes, and still 48 at 7 and 8.',
          'So the reaction finished at **6 minutes** — the table only goes on to 8 because the student kept watching.',
          'The total volume is the final, unchanging reading: **48 cm³**. (Do not add the columns: each reading is already a running total.)',
        ],
        answer: '6 minutes … 48 cm³',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'Use the zinc table again. What was the **average rate** of the reaction?',
        inlineSvg: DIAGRAMS.WB_ZINC_TABLE,
        options: [
          { val: 'a', text: '6 cm³/min' },
          { val: 'b', text: '0.125 min/cm³' },
          { val: 'c', text: '8 cm³/min' },
          { val: 'd', text: '16 cm³/min' },
        ],
        correct: 'c',
        solution: [
          'Average rate = total volume of gas ÷ total time the reaction took.',
          'Total volume = 48 cm³. The reaction took **6 minutes** (not 8 — it was over at 6).',
          '$48 \\div 6 = 8$ cm³/min.',
          '6 cm³/min divides by 8 minutes; 0.125 puts the time on top; 16 cm³/min is only the first minute.',
        ],
        answer: '8 cm³/min',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'Which of these reactions could you follow by collecting a gas in a **gas syringe**?',
        options: [
          { val: 'a', text: 'Sodium hydroxide solution + dilute hydrochloric acid → sodium chloride + water' },
          { val: 'b', text: 'Silver nitrate solution + sodium chloride solution → silver chloride + sodium nitrate' },
          { val: 'c', text: 'Copper(II) oxide + dilute sulfuric acid → copper(II) sulfate + water' },
          { val: 'd', text: 'Hydrogen peroxide → water + oxygen' },
        ],
        correct: 'd',
        solution: [
          'A gas syringe only works if the reaction **gives off a gas**.',
          'Hydrogen peroxide breaks down to water and **oxygen gas**, which can be collected and measured.',
          'The other three make only a solution, water or a solid — no gas to collect.',
        ],
        answer: 'Hydrogen peroxide → water + oxygen',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'Two students do the magnesium experiment with the same mass of magnesium. Student X\'s first two readings are much **lower** than student Y\'s, but both end with the **same total** volume. Which is the most likely source of error in X\'s experiment?',
        options: [
          { val: 'a', text: 'X did not clean the magnesium, so its oxide coat slowed the start' },
          { val: 'b', text: 'Some hydrogen escaped before X put the stopper in' },
          { val: 'c', text: 'X used the acid in excess' },
          { val: 'd', text: 'X read the syringe with the plunger all the way in' },
        ],
        correct: 'a',
        solution: [
          'Ask two things: which error makes the **start** slow, and which one leaves the **total** the same?',
          'An oxide coat delays the start, but once the acid gets through, all the magnesium still reacts — the same total gas.',
          'Gas escaping before the stopper goes in would make the **total** too low as well. Acid in excess is correct practice, not an error.',
        ],
        answer: 'The magnesium was not cleaned',
      },
      {
        id: 'c2', type: 'inline',
        prompt: 'Marble chips react with dilute hydrochloric acid in a flask on a balance. Complete the explanation.',
        textParts: [
          'The mass falls because ',
          ' escapes. The cotton wool plug lets the gas out but ',
          '. This method is poor for magnesium and acid, because hydrogen is very ',
          '.',
        ],
        blanks: {
          1: { correct: 'carbon dioxide', options: [{ val: 'carbon dioxide', text: 'carbon dioxide' }, { val: 'hydrogen', text: 'hydrogen' }, { val: 'water vapour only', text: 'water vapour only' }] },
          2: { correct: 'stops acid spray escaping', options: [{ val: 'stops acid spray escaping', text: 'stops acid spray escaping' }, { val: 'makes the reaction faster', text: 'makes the reaction faster' }, { val: 'absorbs the gas', text: 'absorbs the gas' }] },
          3: { correct: 'light', options: [{ val: 'light', text: 'light' }, { val: 'heavy', text: 'heavy' }, { val: 'reactive', text: 'reactive' }] },
        },
        solution: [
          'Calcium carbonate + hydrochloric acid gives off **carbon dioxide**. As it leaves the flask, the flask gets lighter.',
          'The cotton wool lets the gas out (a rubber bung would trap it, and nothing would change), but it stops **drops of acid** leaving — they would add to the loss.',
          'Hydrogen is so **light** that the loss in mass is too small to measure well. Collect it in a gas syringe instead.',
        ],
        answer: 'carbon dioxide … stops acid spray escaping … light',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'Marble chips on a balance: **152.40 g** at the start, **151.80 g** after 2 minutes. The mass stops changing at **5 minutes**, at **151.40 g**. What was the **average rate** of loss of mass?',
        options: [
          { val: 'a', text: '30.28 g/min' },
          { val: 'b', text: '0.30 g/min' },
          { val: 'c', text: '0.20 g/min' },
          { val: 'd', text: '5.00 min/g' },
        ],
        correct: 'c',
        solution: [
          'Loss in mass = mass at the start − mass at the end = $152.40 - 151.40 = 1.00$ g.',
          'The reaction took **5 minutes**.',
          'Average rate = $1.00 \\div 5 = 0.20$ g/min.',
          '0.30 g/min is only the first two minutes (0.60 g ÷ 2); 30.28 divides the final mass, not the mass LOST; 5.00 min/g is upside down.',
        ],
        answer: '0.20 g/min',
      },
    ],
  },
];
