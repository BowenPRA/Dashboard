// src/data/IGCSE_CHEM/M06_1/workbook.js
// Reveal-solution practice for 6.1 Acids, Bases and Alkalis.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Writing the formulae of the acids
// and alkalis is the Formulae task's job, so this set carries what that task
// does not stage: base vs alkali, the indicator colours, the ions that make a
// solution acidic or alkaline, the pH scale, and (Challenge) strong vs weak and
// strength vs concentration.
//
// Focus stays on Core content, so a shaky student has somewhere to stand.
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which of these substances is an **alkali**?',
        options: [
          { val: 'a', text: 'Copper(II) oxide' },
          { val: 'b', text: 'Ethanoic acid' },
          { val: 'c', text: 'Potassium hydroxide' },
          { val: 'd', text: 'Magnesium oxide' },
        ],
        correct: 'c',
        solution: [
          'An alkali is a **base** that **dissolves** in water.',
          'Copper(II) oxide and magnesium oxide are bases (metal oxides), but they do **not** dissolve, so they are not alkalis.',
          'Ethanoic acid is an acid, not a base at all.',
          '**Potassium hydroxide** is a metal hydroxide that dissolves in water, so it is an alkali.',
        ],
        answer: 'Potassium hydroxide',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Choose the words that complete the definitions.',
        textParts: [
          'Bases are the oxides and ',
          ' of metals. A base that dissolves in water is called ',
          '.',
        ],
        blanks: {
          1: { correct: 'hydroxides', options: [{ val: 'hydroxides', text: 'hydroxides' }, { val: 'chlorides', text: 'chlorides' }, { val: 'acids', text: 'acids' }] },
          2: { correct: 'an alkali', options: [{ val: 'an alkali', text: 'an alkali' }, { val: 'an indicator', text: 'an indicator' }, { val: 'a salt', text: 'a salt' }] },
        },
        solution: [
          'A **base** is an oxide or a **hydroxide** of a metal — for example $\\text{MgO}$ or $\\text{Mg(OH)}_2$.',
          'Most bases are insoluble. The few that dissolve in water are called **alkalis**.',
        ],
        answer: 'hydroxides … an alkali',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Universal indicator is added to three solutions. Drag each colour to the pH it shows.',
        bank: [
          { val: 'red', text: 'red' },
          { val: 'green', text: 'green' },
          { val: 'violet', text: 'violet' },
        ],
        targets: [
          { id: 'ph1', title: 'pH 1' },
          { id: 'ph7', title: 'pH 7' },
          { id: 'ph13', title: 'pH 13' },
        ],
        correctSets: { ph1: ['red'], ph7: ['green'], ph13: ['violet'] },
        solution: [
          'Universal indicator runs through the colours of a rainbow as the pH rises.',
          'pH 1 is strongly acidic: **red**.',
          'pH 7 is neutral: **green**.',
          'pH 13 is strongly alkaline: **violet**.',
        ],
        answer: 'pH 1 → red · pH 7 → green · pH 13 → violet',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'A solution turns **blue** litmus paper **red**. Which of these could it be?',
        options: [
          { val: 'a', text: 'Limewater' },
          { val: 'b', text: 'Dilute sulfuric acid' },
          { val: 'c', text: 'Sugar solution' },
          { val: 'd', text: 'Sodium hydroxide solution' },
        ],
        correct: 'b',
        solution: [
          'Acids turn litmus **red**, so the solution is an acid.',
          'Limewater and sodium hydroxide solution are alkalis — they turn litmus blue.',
          'Sugar solution is neutral, so it does not change litmus.',
          'The only acid in the list is **dilute sulfuric acid**.',
        ],
        answer: 'Dilute sulfuric acid',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'Solution P has **pH 2**. Solution Q has **pH 5**. Which statement is correct?',
        options: [
          { val: 'a', text: 'Q is more acidic, because 5 is a bigger number' },
          { val: 'b', text: 'P has a higher concentration of H⁺ ions than Q' },
          { val: 'c', text: 'P has a higher concentration of OH⁻ ions than Q' },
          { val: 'd', text: 'Both solutions are alkaline' },
        ],
        correct: 'b',
        solution: [
          'Both pH values are below 7, so both solutions are **acidic**.',
          'On the pH scale, the **more** $\\text{H}^{+}$ ions there are, the **lower** the pH.',
          'P has the lower pH, so P has the **higher concentration of $\\text{H}^{+}$ ions** — P is the more acidic.',
        ],
        answer: 'P has a higher concentration of H⁺ ions than Q',
      },
      {
        id: 'p2', type: 'inline',
        prompt: 'Potassium hydroxide dissolves in water. Complete the sentences.',
        textParts: [
          'In water, potassium hydroxide separates into ',
          ' ions and ',
          ' ions. It is the ',
          ' ions that make the solution alkaline.',
        ],
        blanks: {
          1: { correct: 'potassium', options: [{ val: 'potassium', text: 'potassium' }, { val: 'hydrogen', text: 'hydrogen' }, { val: 'oxide', text: 'oxide' }] },
          2: { correct: 'hydroxide', options: [{ val: 'hydroxide', text: 'hydroxide' }, { val: 'hydrogen', text: 'hydrogen' }, { val: 'chloride', text: 'chloride' }] },
          3: { correct: 'hydroxide', options: [{ val: 'hydroxide', text: 'hydroxide' }, { val: 'potassium', text: 'potassium' }, { val: 'hydrogen', text: 'hydrogen' }] },
        },
        solution: [
          'Potassium hydroxide is an ionic solid. When it dissolves, its ions separate:',
          '$\\text{KOH}(\\text{aq}) \\rightarrow \\text{K}^{+}(\\text{aq}) + \\text{OH}^{-}(\\text{aq})$',
          'Every alkaline solution contains **hydroxide** ions, $\\text{OH}^{-}$. They are what make it alkaline; $\\text{K}^{+}$ is just the metal ion.',
        ],
        answer: 'potassium … hydroxide … hydroxide',
      },
      {
        id: 'p3', type: 'dnd',
        prompt: 'Drag each substance into the right group.',
        bank: [
          { val: 'hno3', text: 'nitric acid' },
          { val: 'ch3cooh', text: 'ethanoic acid' },
          { val: 'cuo', text: 'copper(II) oxide' },
          { val: 'mgoh2', text: 'magnesium hydroxide' },
          { val: 'naoh', text: 'sodium hydroxide' },
          { val: 'caoh2', text: 'calcium hydroxide' },
        ],
        targets: [
          { id: 'acid', title: 'Acid' },
          { id: 'insol', title: 'Base that does not dissolve' },
          { id: 'alkali', title: 'Alkali' },
        ],
        correctSets: { acid: ['hno3', 'ch3cooh'], insol: ['cuo', 'mgoh2'], alkali: ['naoh', 'caoh2'] },
        solution: [
          '**Acids:** nitric acid and ethanoic acid — non-metal compounds that give $\\text{H}^{+}$ ions in water.',
          '**Insoluble bases:** copper(II) oxide and magnesium hydroxide — a metal oxide and a metal hydroxide that do not dissolve.',
          '**Alkalis:** sodium hydroxide and calcium hydroxide — metal hydroxides that dissolve. (Calcium hydroxide only dissolves slightly; its solution is limewater.)',
        ],
        answer: 'Acids: nitric, ethanoic · insoluble bases: CuO, Mg(OH)₂ · alkalis: NaOH, Ca(OH)₂',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'A solution has **no effect** on red litmus paper **or** on blue litmus paper. Which of these could it be?',
        options: [
          { val: 'a', text: 'Dilute nitric acid' },
          { val: 'b', text: 'Limewater' },
          { val: 'c', text: 'Potassium hydroxide solution' },
          { val: 'd', text: 'Sugar solution' },
        ],
        correct: 'd',
        solution: [
          'An acid would turn blue litmus red. An alkali would turn red litmus blue.',
          'Nothing changed, so the solution is neither acidic nor alkaline: it is **neutral**.',
          'Nitric acid is an acid; limewater and potassium hydroxide are alkalis. **Sugar solution** is neutral, pH 7.',
        ],
        answer: 'Sugar solution',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: '**Limewater** is the solution of which compound?',
        options: [
          { val: 'a', text: 'Calcium oxide' },
          { val: 'b', text: 'Calcium carbonate' },
          { val: 'c', text: 'Calcium hydroxide' },
          { val: 'd', text: 'Calcium chloride' },
        ],
        correct: 'c',
        solution: [
          'Limewater is an **alkali**, so it must be a soluble metal hydroxide.',
          'Calcium hydroxide, $\\text{Ca(OH)}_2$, is only slightly soluble — its solution is called **limewater**.',
        ],
        answer: 'Calcium hydroxide',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'Solutions of nitric acid and methanoic acid are made with the **same concentration**, 0.1 mol/dm³. The nitric acid has **pH 1.0** and the methanoic acid has **pH 2.4**. Which statement explains this?',
        options: [
          { val: 'a', text: 'The methanoic acid solution is more dilute' },
          { val: 'b', text: 'Methanoic acid is only partially dissociated, so it gives fewer H⁺ ions' },
          { val: 'c', text: 'The nitric acid solution also contains OH⁻ ions' },
          { val: 'd', text: 'Methanoic acid is a strong acid, so its pH is higher' },
        ],
        correct: 'b',
        solution: [
          'The concentrations are the **same**, so (a) cannot be the reason.',
          'A higher pH means **fewer** $\\text{H}^{+}$ ions in the solution.',
          'Nitric acid is a **strong** acid: completely dissociated. Methanoic acid is a **weak** acid: only partially dissociated, so it gives fewer $\\text{H}^{+}$ ions and a higher pH.',
        ],
        answer: 'Methanoic acid is only partially dissociated, so it gives fewer H⁺ ions',
      },
      {
        id: 'c2', type: 'dnd',
        prompt: 'Drag each description to the kind of acid it belongs to.',
        bank: [
          { val: 'complete', text: 'completely dissociated' },
          { val: 'partial', text: 'partially dissociated' },
          { val: 'oneway', text: 'dissociation written with →' },
          { val: 'twoway', text: 'dissociation written with ⇌' },
          { val: 'hcl', text: 'hydrochloric acid' },
          { val: 'citric', text: 'citric acid' },
        ],
        targets: [
          { id: 'strong', title: 'Strong acid' },
          { id: 'weak', title: 'Weak acid' },
        ],
        correctSets: { strong: ['complete', 'oneway', 'hcl'], weak: ['partial', 'twoway', 'citric'] },
        solution: [
          'A **strong** acid is completely dissociated, so its equation has a one-way arrow: $\\text{HCl}(\\text{aq}) \\rightarrow \\text{H}^{+}(\\text{aq}) + \\text{Cl}^{-}(\\text{aq})$.',
          'A **weak** acid is only partially dissociated; the dissociation is reversible, so it is written with $\\rightleftharpoons$.',
          'Hydrochloric acid is strong. Citric acid, in oranges and lemons, is weak.',
        ],
        answer: 'Strong: complete, →, hydrochloric · weak: partial, ⇌, citric',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'Which of these four solutions has the **lowest pH**?',
        options: [
          { val: 'a', text: '1 mol/dm³ hydrochloric acid' },
          { val: 'b', text: '0.1 mol/dm³ hydrochloric acid' },
          { val: 'c', text: '1 mol/dm³ ethanoic acid' },
          { val: 'd', text: '0.1 mol/dm³ ethanoic acid' },
        ],
        correct: 'a',
        solution: [
          'The lowest pH belongs to the solution with the **most** $\\text{H}^{+}$ ions.',
          'Hydrochloric acid is **strong**: all of it dissociates. Ethanoic acid is **weak**: only a little does.',
          'Of the two hydrochloric acid solutions, the **more concentrated** one holds more acid, so it gives more $\\text{H}^{+}$ ions.',
          'So **1 mol/dm³ hydrochloric acid** has the lowest pH (about 0). Even 1 mol/dm³ ethanoic acid only reaches about pH 2.4.',
        ],
        answer: '1 mol/dm³ hydrochloric acid',
      },
    ],
  },
];
