// src/data/IGCSE_CHEM/M06_3/workbook.js
// Reveal-solution practice for 6.3 Oxides.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Balancing the equations is the
// Equations task's job, so this set carries what that task does not stage:
// what counts as an oxide, metal → basic and non-metal → acidic, the litmus
// evidence, what forms when an oxide meets water, acid rain, neutral oxides,
// and (Challenge only) amphoteric oxides.
//
// Focus stays on Core content, so a shaky student has somewhere to stand.
// No end-of-spread or Checkup question is reproduced: every substance is fresh.
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'dnd',
        prompt: 'An **oxide** is a compound of oxygen and ONE other element. Drag each compound to the right box.',
        bank: [
          { val: 'k2o', text: 'potassium oxide, K₂O' },
          { val: 'so3', text: 'sulfur trioxide, SO₃' },
          { val: 'co', text: 'carbon monoxide, CO' },
          { val: 'koh', text: 'potassium hydroxide, KOH' },
          { val: 'mgco3', text: 'magnesium carbonate, MgCO₃' },
          { val: 'nacl', text: 'sodium chloride, NaCl' },
        ],
        targets: [
          { id: 'ox', title: 'An oxide' },
          { id: 'not', title: 'Not an oxide' },
        ],
        correctSets: { ox: ['k2o', 'so3', 'co'], not: ['koh', 'mgco3', 'nacl'] },
        solution: [
          'Count the elements in each formula.',
          '$\\text{K}_2\\text{O}$, $\\text{SO}_3$ and $\\text{CO}$ each have oxygen and **one** other element — they are oxides.',
          '$\\text{KOH}$ and $\\text{MgCO}_3$ contain oxygen, but they have **three** elements each. Sodium chloride has no oxygen at all.',
        ],
        answer: 'Oxides: K₂O, SO₃, CO · not oxides: KOH, MgCO₃, NaCl',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Barium burns in oxygen to form barium oxide. Complete the sentences.',
        textParts: [
          'Barium is a ',
          ', so barium oxide is a ',
          ' oxide. If it is added to an acid, it will ',
          ' the acid.',
        ],
        blanks: {
          1: { correct: 'metal', options: [{ val: 'metal', text: 'metal' }, { val: 'non-metal', text: 'non-metal' }] },
          2: { correct: 'basic', options: [{ val: 'basic', text: 'basic' }, { val: 'acidic', text: 'acidic' }, { val: 'neutral', text: 'neutral' }] },
          3: { correct: 'neutralise', options: [{ val: 'neutralise', text: 'neutralise' }, { val: 'strengthen', text: 'strengthen' }, { val: 'not react with', text: 'not react with' }] },
        },
        solution: [
          'Barium is in Group 2, with magnesium and calcium — it is a **metal**.',
          'Metals react with oxygen to form **basic** oxides.',
          'A basic oxide is a base, so it **neutralises** an acid, giving a salt and water.',
        ],
        answer: 'metal … basic … neutralise',
      },
      {
        id: 'f3', type: 'mcq',
        prompt: 'Selenium is a non-metal. Its oxide is shaken with water and a piece of **blue litmus** paper is dipped in. What happens?',
        options: [
          { val: 'a', text: 'The litmus stays blue, because the oxide is a base' },
          { val: 'b', text: 'The litmus turns red, because an acid forms' },
          { val: 'c', text: 'The litmus turns green, because the solution is neutral' },
          { val: 'd', text: 'Nothing, because oxides never dissolve in water' },
        ],
        correct: 'b',
        solution: [
          'Selenium is a **non-metal**, and non-metals form **acidic** oxides.',
          'An acidic oxide dissolves in water to give an **acid**.',
          'Acids turn blue litmus **red**. (Litmus is only red or blue — it never goes green.)',
        ],
        answer: 'The litmus turns red, because an acid forms',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'A country builds more coal power stations and more roads full of cars. Its rain becomes more **acidic**. Which gases are the most likely cause?',
        options: [
          { val: 'a', text: 'Oxygen and nitrogen' },
          { val: 'b', text: 'Sulfur dioxide and oxides of nitrogen' },
          { val: 'c', text: 'Carbon monoxide and water vapour' },
          { val: 'd', text: 'Calcium oxide and magnesium oxide' },
        ],
        correct: 'b',
        solution: [
          'Coal contains sulfur, so burning it gives **sulfur dioxide**.',
          'In hot car engines, nitrogen and oxygen from the air react to give **oxides of nitrogen**.',
          'Both are **acidic oxides**: they dissolve in rain water to give acids — acid rain.',
        ],
        answer: 'Sulfur dioxide and oxides of nitrogen',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'A powder does not dissolve in water. It dissolves in warm dilute sulfuric acid, and afterwards the liquid has **no effect on blue litmus**. What could the powder be?',
        options: [
          { val: 'a', text: 'Carbon' },
          { val: 'b', text: 'Nickel(II) oxide' },
          { val: 'c', text: 'Sulfur dioxide' },
          { val: 'd', text: 'Phosphorus(V) oxide' },
        ],
        correct: 'b',
        solution: [
          'The acid was used up — blue litmus no longer turns red — so the powder **neutralised** it. It is a base.',
          'Bases here are **metal oxides**. Nickel is a metal, so nickel(II) oxide is a basic oxide.',
          'Sulfur dioxide and phosphorus(V) oxide are acidic oxides, and carbon is an element, not an oxide.',
        ],
        answer: 'Nickel(II) oxide',
      },
      {
        id: 'p2', type: 'inline',
        prompt: 'Magnesium oxide is warmed with dilute sulfuric acid. Complete the word equation.',
        textParts: [
          'magnesium oxide + sulfuric acid → ',
          ' + ',
          '',
        ],
        blanks: {
          1: { correct: 'magnesium sulfate', options: [{ val: 'magnesium sulfate', text: 'magnesium sulfate' }, { val: 'magnesium sulfide', text: 'magnesium sulfide' }, { val: 'magnesium oxide sulfate', text: 'magnesium oxide sulfate' }] },
          2: { correct: 'water', options: [{ val: 'water', text: 'water' }, { val: 'hydrogen', text: 'hydrogen' }, { val: 'oxygen', text: 'oxygen' }] },
        },
        solution: [
          'Magnesium oxide is a **basic oxide**, so this is base + acid → salt + water.',
          'The salt: magnesium from the oxide, **sulfate** from sulfuric acid — magnesium sulfate.',
          'The oxide ions and the acid\'s hydrogen ions make **water**. No gas is given off.',
        ],
        answer: 'magnesium sulfate … water',
      },
      {
        id: 'p3', type: 'dnd',
        prompt: 'Each element is burned in oxygen. Drag it to the kind of oxide it forms.',
        bank: [
          { val: 'k', text: 'potassium' },
          { val: 'li', text: 'lithium' },
          { val: 'ba', text: 'barium' },
          { val: 'si', text: 'silicon' },
          { val: 'cl', text: 'chlorine' },
          { val: 'se', text: 'selenium' },
        ],
        targets: [
          { id: 'basic', title: 'A basic oxide' },
          { id: 'acidic', title: 'An acidic oxide' },
        ],
        correctSets: { basic: ['k', 'li', 'ba'], acidic: ['si', 'cl', 'se'] },
        solution: [
          'Decide first: is it a **metal** or a **non-metal**?',
          'Potassium, lithium and barium are metals, so they form **basic** oxides.',
          'Silicon, chlorine and selenium are non-metals, so they form **acidic** oxides.',
        ],
        answer: 'Basic: potassium, lithium, barium · acidic: silicon, chlorine, selenium',
      },
      {
        id: 'p4', type: 'inline',
        prompt: 'Sulfur trioxide, $\\text{SO}_3$, is an acidic oxide. Complete the sentence about what happens when it dissolves in water.',
        textParts: [
          '$\\text{SO}_3 + \\text{H}_2\\text{O} \\rightarrow$ ',
          ', which is called ',
          ', so universal indicator would turn ',
          '.',
        ],
        blanks: {
          1: { correct: 'H2SO4', options: [{ val: 'H2SO4', text: 'H₂SO₄' }, { val: 'H2SO3', text: 'H₂SO₃' }, { val: 'H2SO5', text: 'H₂SO₅' }] },
          2: { correct: 'sulfuric acid', options: [{ val: 'sulfuric acid', text: 'sulfuric acid' }, { val: 'sulfurous acid', text: 'sulfurous acid' }, { val: 'sodium sulfate', text: 'sodium sulfate' }] },
          3: { correct: 'red', options: [{ val: 'red', text: 'red' }, { val: 'green', text: 'green' }, { val: 'purple', text: 'purple' }] },
        },
        solution: [
          'Add the atoms: $\\text{SO}_3$ has 1 S and 3 O; $\\text{H}_2\\text{O}$ adds 2 H and 1 O. That makes $\\text{H}_2\\text{SO}_4$.',
          '$\\text{H}_2\\text{SO}_4$ is **sulfuric acid**. (Sulfurous acid, $\\text{H}_2\\text{SO}_3$, comes from sulfur **di**oxide.)',
          'It is a strong acid, so universal indicator turns **red**.',
        ],
        answer: 'H₂SO₄ … sulfuric acid … red',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'Dinitrogen oxide, $\\text{N}_2\\text{O}$, is a **neutral** oxide. Which statement about it is correct?',
        options: [
          { val: 'a', text: 'It dissolves in water to give nitric acid' },
          { val: 'b', text: 'It neutralises acids, like a basic oxide' },
          { val: 'c', text: 'It reacts with neither acids nor bases' },
          { val: 'd', text: 'It reacts with both acids and alkalis' },
        ],
        correct: 'c',
        solution: [
          'Most non-metal oxides are acidic — but a **neutral** oxide is the exception.',
          'Neutral oxides react with **neither** acids nor bases.',
          'Reacting with both acids and alkalis is what an **amphoteric** oxide does — a different kind.',
        ],
        answer: 'It reacts with neither acids nor bases',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'A white powder X does **not** dissolve in water. It dissolves when warmed with dilute nitric acid, and it **also** dissolves when warmed with sodium hydroxide solution. What could X be?',
        options: [
          { val: 'a', text: 'Magnesium oxide' },
          { val: 'b', text: 'Zinc oxide' },
          { val: 'c', text: 'Phosphorus(V) oxide' },
          { val: 'd', text: 'Carbon monoxide' },
        ],
        correct: 'b',
        solution: [
          'X reacts with an acid **and** with an alkali, so it is an **amphoteric** oxide.',
          'Magnesium oxide is basic: it would not react with the alkali.',
          'Phosphorus(V) oxide dissolves in water, and carbon monoxide is a gas that reacts with neither.',
          'Zinc oxide is amphoteric — X could be **zinc oxide**.',
        ],
        answer: 'Zinc oxide',
      },
      {
        id: 'c2', type: 'inline',
        prompt: 'Zinc oxide is amphoteric. Complete the sentences.',
        textParts: [
          'With dilute sulfuric acid, zinc oxide acts as ',
          ' and gives zinc sulfate and water. With sodium hydroxide solution it acts as ',
          '. An oxide that does not react with either would be ',
          '.',
        ],
        blanks: {
          1: { correct: 'a base', options: [{ val: 'a base', text: 'a base' }, { val: 'an acid', text: 'an acid' }] },
          2: { correct: 'an acid', options: [{ val: 'an acid', text: 'an acid' }, { val: 'a base', text: 'a base' }] },
          3: { correct: 'neutral', options: [{ val: 'neutral', text: 'neutral' }, { val: 'amphoteric', text: 'amphoteric' }, { val: 'basic', text: 'basic' }] },
        },
        solution: [
          'Whatever zinc oxide reacts with, it plays the **opposite** part.',
          'With an acid it neutralises the acid, so it acts as **a base**.',
          'With an alkali it neutralises the alkali, so it acts as **an acid** (like an acidic oxide).',
          'An oxide that reacts with neither is **neutral**, like carbon monoxide.',
        ],
        answer: 'a base … an acid … neutral',
      },
      {
        id: 'c3', type: 'dnd',
        prompt: 'Each oxide is added to water. Drag it to the solution it forms.',
        bank: [
          { val: 'so2', text: 'sulfur dioxide, SO₂' },
          { val: 'so3', text: 'sulfur trioxide, SO₃' },
          { val: 'co2', text: 'carbon dioxide, CO₂' },
          { val: 'k2o', text: 'potassium oxide, K₂O' },
        ],
        targets: [
          { id: 'h2so3', title: 'sulfurous acid, H₂SO₃' },
          { id: 'h2so4', title: 'sulfuric acid, H₂SO₄' },
          { id: 'h2co3', title: 'carbonic acid, H₂CO₃' },
          { id: 'koh', title: 'potassium hydroxide, KOH' },
        ],
        correctSets: { h2so3: ['so2'], h2so4: ['so3'], h2co3: ['co2'], koh: ['k2o'] },
        solution: [
          'An oxide + water: add the atoms of $\\text{H}_2\\text{O}$ to the oxide.',
          '$\\text{SO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{SO}_3$ and $\\text{SO}_3 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{SO}_4$ — one more oxygen, one more in the acid.',
          '$\\text{CO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{CO}_3$, carbonic acid.',
          'Potassium oxide is a **soluble basic oxide**: $\\text{K}_2\\text{O} + \\text{H}_2\\text{O} \\rightarrow 2\\text{KOH}$, an alkali.',
        ],
        answer: 'SO₂ → H₂SO₃ · SO₃ → H₂SO₄ · CO₂ → H₂CO₃ · K₂O → KOH',
      },
    ],
  },
];
