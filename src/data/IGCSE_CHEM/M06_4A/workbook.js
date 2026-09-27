// src/data/IGCSE_CHEM/M06_4A/workbook.js
// Reveal-solution practice for 6.4 Making Salts: the methods.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Putting a method's steps in order
// is Order It's job and writing a full ionic equation is Spectator Strike's, so
// this set carries what those two do not stage: why each step is there, the
// words residue and filtrate, the solubility rules, choosing the method and the
// starting compounds for a named salt, the indicator, and hydrated salts. One
// item (c2) picks an ionic equation from four; none asks the student to build one.
//
// Every salt is fresh — none of the book's worked examples (zinc sulfate,
// copper(II) sulfate, sodium chloride, barium sulfate) is set here. Focus stays
// on Core content, so a shaky student has somewhere to stand. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Mr Bowen makes magnesium chloride by adding magnesium ribbon to dilute hydrochloric acid. He keeps adding magnesium until some is **left over**. Why?',
        options: [
          { val: 'a', text: 'So that the magnesium chloride dissolves' },
          { val: 'b', text: 'So that all of the acid reacts' },
          { val: 'c', text: 'So that more hydrogen can be collected' },
          { val: 'd', text: 'Because magnesium is cheaper than acid' },
        ],
        correct: 'b',
        solution: [
          'While there is still acid, the magnesium keeps reacting and fizzing.',
          'When magnesium is **left over**, the reaction has stopped because the **acid** ran out.',
          'So no acid is left to end up in the salt. The magnesium is **in excess** so that **all of the acid reacts**.',
        ],
        answer: 'So that all of the acid reacts',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Mr Bowen now filters the mixture. Choose the words that complete the sentences.',
        textParts: [
          'The unreacted magnesium stays in the filter paper: it is the ',
          '. The magnesium chloride solution that runs through is the ',
          '.',
        ],
        blanks: {
          1: { correct: 'residue', options: [{ val: 'residue', text: 'residue' }, { val: 'filtrate', text: 'filtrate' }, { val: 'precipitate', text: 'precipitate' }] },
          2: { correct: 'filtrate', options: [{ val: 'filtrate', text: 'filtrate' }, { val: 'residue', text: 'residue' }, { val: 'solvent', text: 'solvent' }] },
        },
        solution: [
          'Filtering splits a mixture into a solid and a liquid.',
          'The solid that stays **in** the filter paper is the **residue** — here, the leftover magnesium.',
          'The liquid that runs **through** the paper is the **filtrate** — here, magnesium chloride solution.',
        ],
        answer: 'residue … filtrate',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Use the solubility rules. Drag each salt to the right group.',
        bank: [
          { val: 'na2co3', text: 'sodium carbonate' },
          { val: 'agcl', text: 'silver chloride' },
          { val: 'cano3', text: 'calcium nitrate' },
          { val: 'pbso4', text: 'lead(II) sulfate' },
          { val: 'nh4so4', text: 'ammonium sulfate' },
          { val: 'cuco3', text: 'copper(II) carbonate' },
        ],
        targets: [
          { id: 'sol', title: 'Soluble in water' },
          { id: 'insol', title: 'Insoluble in water' },
        ],
        correctSets: { sol: ['na2co3', 'cano3', 'nh4so4'], insol: ['agcl', 'pbso4', 'cuco3'] },
        solution: [
          '**Sodium** and **ammonium** salts are all soluble, and so are all **nitrates**: sodium carbonate, ammonium sulfate and calcium nitrate dissolve.',
          'Chlorides are soluble **except** silver and lead chloride, so **silver chloride** is insoluble.',
          'Sulfates are soluble **except** calcium, barium and lead sulfate, so **lead(II) sulfate** is insoluble.',
          'Carbonates are insoluble unless they are sodium, potassium or ammonium carbonate, so **copper(II) carbonate** is insoluble.',
        ],
        answer: 'Soluble: sodium carbonate, calcium nitrate, ammonium sulfate · Insoluble: silver chloride, lead(II) sulfate, copper(II) carbonate',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'Which salt can be made **safely** by adding an excess of the metal to a dilute acid?',
        options: [
          { val: 'a', text: 'Potassium chloride' },
          { val: 'b', text: 'Iron(II) sulfate' },
          { val: 'c', text: 'Copper(II) nitrate' },
          { val: 'd', text: 'Silver sulfate' },
        ],
        correct: 'b',
        solution: [
          'Method 1 works for **magnesium, aluminium, zinc and iron**.',
          'Potassium reacts **violently** with acids, so it is not safe.',
          'Copper and silver **do not react** with dilute acids at all.',
          'So iron + dilute sulfuric acid is the one that works: **iron(II) sulfate**.',
        ],
        answer: 'Iron(II) sulfate',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'Potassium hydroxide solution is titrated with dilute nitric acid, using **thymolphthalein** as the indicator. What colour change shows that the alkali has just been neutralised?',
        options: [
          { val: 'a', text: 'Colourless to blue' },
          { val: 'b', text: 'Blue to red' },
          { val: 'c', text: 'Blue to colourless' },
          { val: 'd', text: 'Red to yellow' },
        ],
        correct: 'c',
        solution: [
          'Thymolphthalein is **blue in alkali**, so the flask starts blue.',
          'It is **colourless** in neutral and acidic solutions — it never turns red.',
          'The moment the last of the alkali is used up, the blue disappears: **blue to colourless**.',
        ],
        answer: 'Blue to colourless',
      },
      {
        id: 'p2', type: 'inline',
        prompt: 'Choose the words that explain how to make potassium sulfate.',
        textParts: [
          'I would use ',
          ', because potassium hydroxide is ',
          ' in water, so any excess could not be ',
          '.',
        ],
        blanks: {
          1: { correct: 'titr', options: [{ val: 'titr', text: 'a titration' }, { val: 'excess', text: 'excess solid and filtering' }, { val: 'precip', text: 'precipitation' }] },
          2: { correct: 'sol', options: [{ val: 'sol', text: 'soluble' }, { val: 'insol', text: 'insoluble' }] },
          3: { correct: 'filt', options: [{ val: 'filt', text: 'filtered off' }, { val: 'seen', text: 'seen' }, { val: 'heated', text: 'heated' }] },
        },
        solution: [
          'Potassium metal reacts violently with acid, so method 1 is out.',
          'Potassium hydroxide is an **alkali** — a base that is **soluble** in water.',
          'Extra alkali would stay dissolved and pass straight through filter paper, so it could not be **filtered off**.',
          'So find the exact amounts by **a titration** first.',
        ],
        answer: 'a titration … soluble … filtered off',
      },
      {
        id: 'p3', type: 'dnd',
        prompt: 'Drag the right pair of starting compounds to each salt. One pair is not needed.',
        bank: [
          { val: 'mgo', text: 'magnesium oxide + dilute nitric acid' },
          { val: 'lioh', text: 'lithium hydroxide + dilute sulfuric acid' },
          { val: 'cuco3', text: 'copper(II) carbonate + dilute nitric acid' },
          { val: 'cuo_s', text: 'copper(II) oxide + dilute sulfuric acid' },
        ],
        targets: [
          { id: 'mgno3', title: 'magnesium nitrate' },
          { id: 'li2so4', title: 'lithium sulfate (by titration)' },
          { id: 'cuno3', title: 'copper(II) nitrate' },
        ],
        correctSets: { mgno3: ['mgo'], li2so4: ['lioh'], cuno3: ['cuco3'] },
        solution: [
          'The **second** word of the salt tells you the acid: nitrates need **nitric acid**, sulfates need **sulfuric acid**.',
          'The **first** word tells you the metal in the base, alkali or carbonate.',
          'A titration needs an **alkali**: lithium hydroxide.',
          'Copper(II) oxide + sulfuric acid would make copper(II) **sulfate**, not the nitrate — that pair is not needed.',
        ],
        answer: 'magnesium oxide → magnesium nitrate · lithium hydroxide → lithium sulfate · copper(II) carbonate → copper(II) nitrate',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'Epsom salts are hydrated magnesium sulfate, $\\text{MgSO}_4{\\cdot}7\\text{H}_2\\text{O}$. What forms when the crystals are heated?',
        options: [
          { val: 'a', text: 'Magnesium oxide and sulfur dioxide' },
          { val: 'b', text: 'Magnesium metal and sulfuric acid' },
          { val: 'c', text: 'More hydrated magnesium sulfate and oxygen' },
          { val: 'd', text: 'Anhydrous magnesium sulfate and water' },
        ],
        correct: 'd',
        solution: [
          'The $7\\text{H}_2\\text{O}$ is water bonded into the crystals.',
          'Heating a hydrated salt **drives off that water** as steam.',
          'What is left is the salt without its water: **anhydrous magnesium sulfate**.',
        ],
        answer: 'Anhydrous magnesium sulfate and water',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'Which of these is **not** a sensible way to make crystals of zinc sulfate?',
        options: [
          { val: 'a', text: 'Excess zinc + dilute sulfuric acid, then filter' },
          { val: 'b', text: 'Excess zinc oxide + dilute sulfuric acid, then filter' },
          { val: 'c', text: 'Mix zinc nitrate solution with sodium sulfate solution' },
          { val: 'd', text: 'Excess zinc carbonate + dilute sulfuric acid, then filter' },
        ],
        correct: 'c',
        solution: [
          'Zinc sulfate is **soluble**, so it is made from an excess of the metal, the oxide or the carbonate, and the excess is filtered off.',
          'Mixing two solutions only works for an **insoluble** salt, which falls out as a precipitate.',
          'Zinc sulfate and sodium nitrate are both soluble, so nothing precipitates — you would be left with a mixture of the two salts in solution.',
        ],
        answer: 'Mix zinc nitrate solution with sodium sulfate solution',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'Barium carbonate is insoluble. Which pair should be mixed to precipitate it?',
        options: [
          { val: 'a', text: 'Barium sulfate and sodium carbonate solution' },
          { val: 'b', text: 'Barium nitrate solution and solid calcium carbonate' },
          { val: 'c', text: 'Barium nitrate solution and sodium carbonate solution' },
          { val: 'd', text: 'Barium nitrate solution and potassium nitrate solution' },
        ],
        correct: 'c',
        solution: [
          'You need a solution of the **positive ions**, $\\text{Ba}^{2+}$, and a solution of the **negative ions**, $\\text{CO}_3^{2-}$.',
          'Barium sulfate and calcium carbonate are both **insoluble**, so they put no ions into the solution — (a) and (b) fail.',
          'Potassium nitrate contains no carbonate ions at all — (d) fails.',
          'Barium nitrate is soluble (all nitrates are) and sodium carbonate is soluble (a sodium salt), so **(c)** works.',
        ],
        answer: 'Barium nitrate solution and sodium carbonate solution',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'Zinc sulfate solution is mixed with sodium carbonate solution, and zinc carbonate precipitates: $\\text{ZnSO}_4(\\text{aq}) + \\text{Na}_2\\text{CO}_3(\\text{aq}) \\rightarrow \\text{ZnCO}_3(\\text{s}) + \\text{Na}_2\\text{SO}_4(\\text{aq})$. Which is the ionic equation?',
        options: [
          { val: 'a', text: '2Na⁺(aq) + SO₄²⁻(aq) → Na₂SO₄(aq)' },
          { val: 'b', text: 'Zn²⁺(aq) + CO₃²⁻(aq) → ZnCO₃(s)' },
          { val: 'c', text: 'Zn²⁺(aq) + CO₃²⁻(aq) → ZnCO₃(aq)' },
          { val: 'd', text: 'ZnSO₄(aq) + CO₃²⁻(aq) → ZnCO₃(s) + SO₄²⁻(aq)' },
        ],
        correct: 'b',
        solution: [
          'The three (aq) substances **split into ions**; the solid zinc carbonate **stays whole**.',
          '$\\text{Na}^{+}$ and $\\text{SO}_4^{2-}$ are on both sides unchanged: **strike out the spectator ions** — so not (a), which is made of nothing else, and not (d), which leaves zinc sulfate whole.',
          'What is left is the ionic equation: $\\text{Zn}^{2+}(\\text{aq}) + \\text{CO}_3^{2-}(\\text{aq}) \\rightarrow \\text{ZnCO}_3(\\text{s})$. The product is a **solid** — (c) has it dissolved.',
        ],
        answer: 'Zn²⁺(aq) + CO₃²⁻(aq) → ZnCO₃(s)',
      },
      {
        id: 'c3', type: 'inline',
        prompt: 'Pink crystals of cobalt(II) chloride have the formula $\\text{CoCl}_2{\\cdot}6\\text{H}_2\\text{O}$. Complete the sentences.',
        textParts: [
          'There are ',
          ' water molecules for each CoCl₂. When the crystals are heated, the ',
          ' is driven off, and blue ',
          ' cobalt(II) chloride is left.',
        ],
        blanks: {
          1: { correct: 'six', options: [{ val: 'six', text: 'six' }, { val: 'two', text: 'two' }, { val: 'twelve', text: 'twelve' }] },
          2: { correct: 'woc', options: [{ val: 'woc', text: 'water of crystallisation' }, { val: 'chloride', text: 'chloride ion' }, { val: 'cobalt', text: 'cobalt' }] },
          3: { correct: 'anh', options: [{ val: 'anh', text: 'anhydrous' }, { val: 'hyd', text: 'hydrated' }, { val: 'sat', text: 'saturated' }] },
        },
        solution: [
          'The number in front of $\\text{H}_2\\text{O}$ counts water molecules: **six** for each $\\text{CoCl}_2$. (Twelve is the number of hydrogen atoms.)',
          'That water, bonded into the crystals, is the **water of crystallisation**. Heating drives it off.',
          'A salt without its water of crystallisation is **anhydrous** — for cobalt(II) chloride, it is blue.',
        ],
        answer: 'six … water of crystallisation … anhydrous',
      },
    ],
  },
];
