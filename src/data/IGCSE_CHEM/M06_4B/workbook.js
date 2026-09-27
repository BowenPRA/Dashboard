// src/data/IGCSE_CHEM/M06_4B/workbook.js
// Reveal-solution practice for 6.4 Making Salts: Titration Calculations.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — nothing is free-typed. The whole four-step calculation is
// the Titration Bench task's job, so this set stages it only ONCE (c1) and
// otherwise tests single steps and the ideas around them: the apparatus, the
// end-point, the burette readings, cm³ → dm³, the triangle, Step 1, Step 2 and
// Step 4 each on their own, a volume found from moles, and the Checkup's
// hardest form (the moles of a carbonate in a sample, c3) stopped at Step 3.
//
// Focus stays on Core content (the apparatus, the end-point, reading a burette)
// so a shaky student has somewhere to stand. Every titration here is a fresh
// one — neither of the book's worked examples is recalculated, no book question
// is reproduced, and no item repeats a Titration Bench item.
//
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'You need **exactly 25.0 cm³** of sodium hydroxide solution in a conical flask. Which piece of apparatus should you use to measure it?',
        options: [
          { val: 'a', text: 'A beaker' },
          { val: 'b', text: 'A measuring cylinder' },
          { val: 'c', text: 'A volumetric pipette' },
          { val: 'd', text: 'A conical flask' },
        ],
        correct: 'c',
        solution: [
          'A **volumetric pipette** is made to deliver **one exact volume** — you fill it to the line.',
          'A measuring cylinder is much less accurate, and a beaker or flask only gives a rough volume.',
          'So use a **volumetric pipette**.',
        ],
        answer: 'A volumetric pipette',
      },
      {
        id: 'f2', type: 'dnd',
        prompt: 'Drag each piece of apparatus to its job in a titration.',
        bank: [
          { val: 'burette', text: 'Burette' },
          { val: 'flask', text: 'Conical flask' },
          { val: 'indicator', text: 'Indicator' },
          { val: 'tile', text: 'White tile' },
        ],
        targets: [
          { id: 'add', title: 'Adds the acid a drop at a time and measures how much' },
          { id: 'hold', title: 'Holds the mixture so it can be swirled' },
          { id: 'change', title: 'Changes colour when the reaction is complete' },
          { id: 'see', title: 'Makes the colour change easy to see' },
        ],
        correctSets: { add: ['burette'], hold: ['flask'], change: ['indicator'], see: ['tile'] },
        solution: [
          'The **burette** has a tap, so acid can be added slowly, and a scale to read the volume.',
          'The **conical flask** narrows at the top, so it can be swirled without spilling.',
          'The **indicator** changes colour at the end-point.',
          'The **white tile** under the flask makes that colour change easy to see.',
        ],
        answer: 'Burette → adds and measures · flask → holds · indicator → changes colour · tile → easy to see',
      },
      {
        id: 'f3', type: 'inline',
        prompt: 'A burette reads **0.6 cm³** before a titration and **22.9 cm³** at the end-point. Complete the working.',
        textParts: [
          'Volume of acid used = ',
          ' = ',
          ' cm³',
        ],
        blanks: {
          1: { correct: 'fmi', options: [{ val: 'fmi', text: 'final − initial' }, { val: 'imf', text: 'initial − final' }, { val: 'fpi', text: 'final + initial' }] },
          2: { correct: '22.3', options: [{ val: '22.3', text: '22.3' }, { val: '23.5', text: '23.5' }, { val: '22.9', text: '22.9' }] },
        },
        solution: [
          'A burette is numbered **down** the tube, so the final reading is the bigger number.',
          'Volume used = **final − initial** = 22.9 − 0.6.',
          '= **22.3 cm³**. (23.5 adds the readings; 22.9 is the final reading alone.)',
        ],
        answer: 'final − initial … 22.3',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'Hydrochloric acid is added from a burette to an alkali containing **thymolphthalein**, which is blue in alkali and colourless in neutral solution. What is the **end-point**?',
        options: [
          { val: 'a', text: 'When the first drop of acid lands in the flask' },
          { val: 'b', text: 'When a single drop of acid turns the blue solution colourless' },
          { val: 'c', text: 'When the solution turns a deeper blue' },
          { val: 'd', text: 'When all the acid in the burette has run out' },
        ],
        correct: 'b',
        solution: [
          'The **end-point** is where the indicator changes colour, because the reaction is just complete.',
          'Thymolphthalein is blue while alkali is left, and colourless once it is neutral.',
          'So the end-point is the **single drop that turns the blue solution colourless**.',
        ],
        answer: 'One drop turns the blue solution colourless',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'A titration used **18.5 cm³** of acid. What is this volume in **dm³**?',
        options: [
          { val: 'a', text: '18 500 dm³' },
          { val: 'b', text: '0.185 dm³' },
          { val: 'c', text: '1.85 dm³' },
          { val: 'd', text: '0.0185 dm³' },
        ],
        correct: 'd',
        solution: [
          '**1000 cm³ = 1 dm³**, so cm³ to dm³ means **divide by 1000**.',
          'Move the decimal point 3 places left: 18.5 → **0.0185 dm³**.',
          '(Answer a multiplied instead; b and c divided by 100 and by 10.)',
        ],
        answer: '0.0185 dm³',
      },
      {
        id: 'p2', type: 'inline',
        prompt: 'Complete the rules from the calculation triangle.',
        textParts: [
          'moles = concentration ',
          ' volume.   concentration = moles ',
          ' volume.   The volume must be in ',
          '.',
        ],
        blanks: {
          1: { correct: 'x', options: [{ val: 'x', text: '×' }, { val: 'd', text: '÷' }] },
          2: { correct: 'd', options: [{ val: 'x', text: '×' }, { val: 'd', text: '÷' }] },
          3: { correct: 'dm3', options: [{ val: 'dm3', text: 'dm³' }, { val: 'cm3', text: 'cm³' }] },
        },
        solution: [
          'On the triangle, **moles** sits on top of **concentration × volume**.',
          'Cover moles: **concentration × volume**. Cover concentration: **moles ÷ volume**.',
          'Concentration is in mol per **dm³**, so the volume must be in **dm³** too.',
        ],
        answer: '× … ÷ … dm³',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: '**Step 1.** How many moles of sodium hydroxide are in **20.0 cm³** of a **0.15 mol/dm³** solution?',
        options: [
          { val: 'a', text: '0.003 mol' },
          { val: 'b', text: '3 mol' },
          { val: 'c', text: '0.133 mol' },
          { val: 'd', text: '0.03 mol' },
        ],
        correct: 'a',
        solution: [
          'Change the volume first: 20.0 cm³ = 20.0 ÷ 1000 = **0.020 dm³**.',
          'moles = concentration × volume = 0.15 × 0.020 = **0.003 mol**.',
          '(Answer b used 20 instead of 0.020; c divided the volume by the concentration; d divided by 100 instead of 1000.)',
        ],
        answer: '0.003 mol',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: '**Step 2 and Step 3.** In $2\\text{HNO}_3 + \\text{Ca(OH)}_2 \\rightarrow \\text{Ca(NO}_3)_2 + 2\\text{H}_2\\text{O}$, **0.004 mol** of calcium hydroxide is neutralised. How many moles of nitric acid reacted?',
        options: [
          { val: 'a', text: '0.002 mol' },
          { val: 'b', text: '0.004 mol' },
          { val: 'c', text: '0.008 mol' },
          { val: 'd', text: '0.016 mol' },
        ],
        correct: 'c',
        solution: [
          'Read the big numbers: **2** $\\text{HNO}_3$ to **1** $\\text{Ca(OH)}_2$.',
          'So the moles of acid are **twice** the moles of calcium hydroxide.',
          '2 × 0.004 = **0.008 mol**. (Answer a used the ratio upside down; b ignored it.)',
        ],
        answer: '0.008 mol',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: '**Step 4.** A titration shows that **0.0045 mol** of hydrochloric acid was in **18.0 cm³** of the acid. What is its concentration?',
        options: [
          { val: 'a', text: '0.00025 mol/dm³' },
          { val: 'b', text: '0.25 mol/dm³' },
          { val: 'c', text: '4 mol/dm³' },
          { val: 'd', text: '0.000081 mol/dm³' },
        ],
        correct: 'b',
        solution: [
          'Change the volume: 18.0 cm³ = **0.018 dm³**.',
          'concentration = moles ÷ volume = 0.0045 ÷ 0.018 = **0.25 mol/dm³**.',
          '(Answer a divided by 18 instead of 0.018; c divided the wrong way round; d multiplied.)',
        ],
        answer: '0.25 mol/dm³',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: '**20.0 cm³** of potassium hydroxide solution is in a flask. **0.10 mol/dm³** sulfuric acid is added from a burette: initial reading **2.0 cm³**, final reading **17.0 cm³**. $\\text{H}_2\\text{SO}_4 + 2\\text{KOH} \\rightarrow \\text{K}_2\\text{SO}_4 + 2\\text{H}_2\\text{O}$. What is the concentration of the potassium hydroxide?',
        options: [
          { val: 'a', text: '0.075 mol/dm³' },
          { val: 'b', text: '0.0375 mol/dm³' },
          { val: 'c', text: '0.20 mol/dm³' },
          { val: 'd', text: '0.15 mol/dm³' },
        ],
        correct: 'd',
        solution: [
          'Read the burette: 17.0 − 2.0 = **15.0 cm³** of acid = **0.015 dm³**.',
          '**Step 1** — you know the acid: 0.10 × 0.015 = **0.0015 mol** of sulfuric acid.',
          '**Step 2** — 1 $\\text{H}_2\\text{SO}_4$ to **2** KOH.',
          '**Step 3** — 2 × 0.0015 = **0.003 mol** of potassium hydroxide.',
          '**Step 4** — 20.0 cm³ = 0.020 dm³, so 0.003 ÷ 0.020 = **0.15 mol/dm³**.',
          '(Answer a ignored the ratio; b used it upside down; c divided by the acid\'s volume, 0.015 dm³, instead of the alkali\'s.)',
        ],
        answer: '0.15 mol/dm³',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: '**Finding a volume.** A calculation shows that **0.004 mol** of hydrochloric acid is needed. The acid is **0.25 mol/dm³**. What volume of it, in **cm³**, should be added?',
        options: [
          { val: 'a', text: '0.016 cm³' },
          { val: 'b', text: '16.0 cm³' },
          { val: 'c', text: '0.001 cm³' },
          { val: 'd', text: '62.5 cm³' },
        ],
        correct: 'b',
        solution: [
          'Cover **volume** on the triangle: volume = moles ÷ concentration.',
          '0.004 ÷ 0.25 = **0.016 dm³**.',
          'Change back into cm³: 0.016 × 1000 = **16.0 cm³**.',
          '(Answer a stopped in dm³; c multiplied; d divided the wrong way round — and would not even fit in a 50 cm³ burette.)',
        ],
        answer: '16.0 cm³',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'A sample of potassium carbonate is dissolved in water. It is exactly neutralised by **24.0 cm³** of **0.50 mol/dm³** hydrochloric acid: $2\\text{HCl} + \\text{K}_2\\text{CO}_3 \\rightarrow 2\\text{KCl} + \\text{H}_2\\text{O} + \\text{CO}_2$. How many **moles of potassium carbonate** were in the sample?',
        options: [
          { val: 'a', text: '0.006 mol' },
          { val: 'b', text: '0.012 mol' },
          { val: 'c', text: '0.024 mol' },
          { val: 'd', text: '6 mol' },
        ],
        correct: 'a',
        solution: [
          '**Step 1** — you know the acid: 24.0 cm³ = 0.024 dm³, so 0.50 × 0.024 = **0.012 mol** of HCl.',
          '**Step 2** — **2** HCl to **1** $\\text{K}_2\\text{CO}_3$.',
          '**Step 3** — the carbonate is **half** the acid: 0.012 ÷ 2 = **0.006 mol**.',
          'No Step 4 is needed: the question asks for moles, not a concentration.',
          '(Answer b ignored the ratio; c used it upside down; d left the volume in cm³.)',
        ],
        answer: '0.006 mol',
      },
    ],
  },
];
