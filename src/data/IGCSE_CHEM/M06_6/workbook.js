// src/data/IGCSE_CHEM/M06_6/workbook.js
// Reveal-solution practice for 6.6 Group 1: The Alkali Metals.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Balancing the symbol equations is
// the Equations task's job, so this set carries what that task does not stage:
// the physical properties, what you see on water, the word equations and the
// products, density worked out from fresh numbers, which way each property
// trends, the gas test, and — in Challenge (Extended) — ions and the pull of
// the nucleus.
//
// Focus stays on Core content, so a shaky student has somewhere to stand.
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'inline',
        prompt: 'Choose the words that describe the alkali metals.',
        textParts: [
          'The alkali metals are ',
          ' metals. They have a ',
          ' density and ',
          ' melting points.',
        ],
        blanks: {
          1: { correct: 'soft', options: [{ val: 'soft', text: 'soft' }, { val: 'hard', text: 'hard' }] },
          2: { correct: 'low', options: [{ val: 'low', text: 'low' }, { val: 'high', text: 'high' }] },
          3: { correct: 'low', options: [{ val: 'low', text: 'low' }, { val: 'high', text: 'high' }] },
        },
        solution: [
          'The alkali metals are **not** typical metals.',
          'They are **soft** — you can cut them with a knife.',
          'They have a **low** density: lithium, sodium and potassium float on water.',
          'They have **low** melting points: all of them melt below 200 °C.',
        ],
        answer: 'soft … low … low',
      },
      {
        id: 'f2', type: 'dnd',
        prompt: 'Each metal is dropped into a trough of water. Drag each metal to what you would see.',
        bank: [
          { val: 'li', text: 'Lithium' },
          { val: 'na', text: 'Sodium' },
          { val: 'k', text: 'Potassium' },
        ],
        targets: [
          { id: 'float', title: 'Floats, moves about and fizzes steadily' },
          { id: 'ball', title: 'Melts into a silver ball and shoots across the water' },
          { id: 'flame', title: 'Shoots across the water; the gas burns with a lilac flame' },
        ],
        correctSets: { float: ['li'], ball: ['na'], flame: ['k'] },
        solution: [
          'Reactivity increases down Group I: lithium, then sodium, then potassium.',
          '**Lithium**, the least reactive, just floats and fizzes.',
          '**Sodium** gives out enough heat to melt into a ball, which shoots across the water.',
          '**Potassium** gives out so much heat that the gas catches fire with a **lilac** flame.',
        ],
        answer: 'Lithium → floats · sodium → silver ball · potassium → lilac flame',
      },
      {
        id: 'f3', type: 'inline',
        prompt: 'Lithium reacts with water. Complete the word equation.',
        textParts: [
          'lithium + water → ',
          ' + ',
          '',
        ],
        blanks: {
          1: { correct: 'lithium hydroxide', options: [{ val: 'lithium hydroxide', text: 'lithium hydroxide' }, { val: 'lithium oxide', text: 'lithium oxide' }, { val: 'lithium water', text: 'lithium water' }] },
          2: { correct: 'hydrogen', options: [{ val: 'hydrogen', text: 'hydrogen' }, { val: 'oxygen', text: 'oxygen' }, { val: 'carbon dioxide', text: 'carbon dioxide' }] },
        },
        solution: [
          'Every alkali metal reacts with water in the same way:',
          'metal + water → metal **hydroxide** + **hydrogen**.',
          'So: lithium + water → **lithium hydroxide** + **hydrogen**.',
        ],
        answer: 'lithium hydroxide … hydrogen',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'Which Group I metals are safe to use in a school lab?',
        options: [
          { val: 'a', text: 'All six of them' },
          { val: 'b', text: 'Only rubidium and caesium, because they are the densest' },
          { val: 'c', text: 'Lithium, sodium and potassium' },
          { val: 'd', text: 'Only francium' },
        ],
        correct: 'c',
        solution: [
          'Reactivity increases down the group.',
          'Only the first three — **lithium, sodium and potassium** — react gently enough to use in the school lab.',
          'Rubidium and caesium react violently, and francium is radioactive.',
        ],
        answer: 'Lithium, sodium and potassium',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'A block of lithium has a volume of **3.0 cm³** and a mass of **1.59 g**. What is its density?',
        options: [
          { val: 'a', text: '4.77 g/cm³' },
          { val: 'b', text: '1.89 g/cm³' },
          { val: 'c', text: '0.53 g/cm³' },
          { val: 'd', text: '4.59 g/cm³' },
        ],
        correct: 'c',
        solution: [
          'Density = mass ÷ volume.',
          '$1.59 \\div 3.0 = 0.53$, so the density is **0.53 g/cm³**.',
          'Check: it is less than water (1 g/cm³), and lithium does float.',
          '(4.77 is mass × volume, 1.89 is volume ÷ mass, and 4.59 is mass + volume.)',
        ],
        answer: '0.53 g/cm³',
      },
      {
        id: 'p2', type: 'dnd',
        prompt: 'What happens to each property as you go DOWN Group I? Drag each one to its trend.',
        bank: [
          { val: 'mp', text: 'Melting point' },
          { val: 'react', text: 'Reactivity' },
          { val: 'shells', text: 'Number of electron shells' },
          { val: 'outer', text: 'Number of outer-shell electrons' },
        ],
        targets: [
          { id: 'up', title: 'Increases' },
          { id: 'down', title: 'Decreases' },
          { id: 'same', title: 'Stays the same' },
        ],
        correctSets: { up: ['react', 'shells'], down: ['mp'], same: ['outer'] },
        solution: [
          '**Melting point decreases**: from 181 °C for lithium to 29 °C for caesium.',
          '**Reactivity increases**: potassium is more reactive than sodium, sodium than lithium.',
          'Each period down adds a shell, so the **number of shells increases**.',
          'Every alkali metal atom has **1 outer-shell electron** — that stays the same, which is why they react alike.',
        ],
        answer: 'Increases: reactivity, shells · decreases: melting point · same: outer-shell electrons',
      },
      {
        id: 'p3', type: 'inline',
        prompt: 'Lithium burns in oxygen. The white powder that forms is shaken with water and universal indicator. Complete the sentences.',
        textParts: [
          'The powder is lithium ',
          '. It dissolves to give an ',
          ' solution, so the indicator turns ',
          '.',
        ],
        blanks: {
          1: { correct: 'oxide', options: [{ val: 'oxide', text: 'oxide' }, { val: 'oxygen', text: 'oxygen' }, { val: 'chloride', text: 'chloride' }] },
          2: { correct: 'alkaline', options: [{ val: 'alkaline', text: 'alkaline' }, { val: 'acidic', text: 'acidic' }, { val: 'neutral', text: 'neutral' }] },
          3: { correct: 'purple', options: [{ val: 'purple', text: 'purple' }, { val: 'red', text: 'red' }, { val: 'green', text: 'green' }] },
        },
        solution: [
          'metal + oxygen → metal **oxide**, so the powder is lithium oxide.',
          'The oxides of the alkali metals dissolve in water to give **alkaline** solutions (the oxide becomes lithium hydroxide).',
          'Universal indicator turns **purple** (or blue) in an alkali. Red would mean an acid, green neutral.',
        ],
        answer: 'oxide … alkaline … purple',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'Caesium reacts with chlorine gas. Which describes the product?',
        options: [
          { val: 'a', text: 'Caesium chloride, a pale green gas' },
          { val: 'b', text: 'Caesium chloride, a white solid' },
          { val: 'c', text: 'Caesium hydroxide, which dissolves to give an alkali' },
          { val: 'd', text: 'Caesium oxide, a white solid' },
        ],
        correct: 'b',
        solution: [
          'Caesium is in Group I, so it reacts like sodium: metal + chlorine → metal **chloride**. The product is caesium chloride.',
          'Like all alkali metal compounds, it is a **white solid** — the green colour belonged to the chlorine, which has been used up.',
          'A hydroxide needs water, and an oxide needs oxygen.',
        ],
        answer: 'Caesium chloride, a white solid',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'The gas given off when potassium reacts with water is collected safely. Which test identifies it?',
        options: [
          { val: 'a', text: 'It turns limewater milky' },
          { val: 'b', text: 'It relights a glowing splint' },
          { val: 'c', text: 'It turns damp red litmus paper blue' },
          { val: 'd', text: 'A lighted splint gives a squeaky pop' },
        ],
        correct: 'd',
        solution: [
          'Every alkali metal + water gives the metal hydroxide + **hydrogen**.',
          'The test for hydrogen: a lighted splint gives a **squeaky pop**.',
          'Limewater is the test for carbon dioxide, a glowing splint for oxygen, and red litmus turning blue for ammonia.',
        ],
        answer: 'A lighted splint gives a squeaky pop',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'inline',
        prompt: 'A potassium atom has the electron arrangement 2,8,8,1. Complete the sentences.',
        textParts: [
          'It ',
          ' one electron to reach a full outer shell. The ion has the arrangement ',
          ' and a charge of ',
          '.',
        ],
        blanks: {
          1: { correct: 'loses', options: [{ val: 'loses', text: 'loses' }, { val: 'gains', text: 'gains' }] },
          2: { correct: '2,8,8', options: [{ val: '2,8,8', text: '2,8,8' }, { val: '2,8,8,2', text: '2,8,8,2' }, { val: '2,8,7', text: '2,8,7' }] },
          3: { correct: '1+', options: [{ val: '1+', text: '1+' }, { val: '1−', text: '1−' }, { val: '2+', text: '2+' }] },
        },
        solution: [
          'Losing one electron is far easier than gaining seven, so potassium **loses** its outer electron.',
          'What is left is **2,8,8** — a full outer shell.',
          'It now has 19 protons but only 18 electrons, so its charge is **1+**: $\\text{K}^{+}$.',
        ],
        answer: 'loses … 2,8,8 … 1+',
      },
      {
        id: 'c2', type: 'dnd',
        prompt: 'Compare a sodium atom (2,8,1) with a potassium atom (2,8,8,1). Drag each statement to the atom it is true of — or to "Both".',
        bank: [
          { val: 'one', text: 'has 1 outer-shell electron' },
          { val: 'three', text: 'has 3 electron shells' },
          { val: 'four', text: 'has 4 electron shells' },
          { val: 'held', text: 'its outer electron is held more strongly' },
          { val: 'easy', text: 'loses its outer electron more easily' },
          { val: 'ion', text: 'forms an ion with a 1+ charge' },
        ],
        targets: [
          { id: 'na', title: 'Sodium atom only' },
          { id: 'k', title: 'Potassium atom only' },
          { id: 'both', title: 'Both' },
        ],
        correctSets: { na: ['three', 'held'], k: ['four', 'easy'], both: ['one', 'ion'] },
        solution: [
          'Both are in Group I: each has **1 outer-shell electron** and forms a **1+ ion**.',
          'Sodium has **3 shells**, so its outer electron is closer to the nucleus and **held more strongly**.',
          'Potassium has **4 shells**; its outer electron is further out, pulled less, and **lost more easily**.',
          'That is why potassium is the more reactive of the two.',
        ],
        answer: 'Sodium: 3 shells, held more strongly · potassium: 4 shells, lost more easily · both: 1 outer electron, 1+ ion',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'Francium is at the bottom of Group I. Which prediction fits the trends best?',
        options: [
          { val: 'a', text: 'The highest melting point in the group, and the least reactive' },
          { val: 'b', text: 'The lowest melting point in the group, and the least reactive' },
          { val: 'c', text: 'The highest melting point in the group, and the most reactive' },
          { val: 'd', text: 'The lowest melting point in the group, and the most reactive' },
        ],
        correct: 'd',
        solution: [
          'Melting point **decreases** down Group I, so francium should have the **lowest** melting point.',
          'Reactivity **increases** down Group I, so francium should be the **most reactive**.',
          'Reason: it has the most shells, so its one outer electron is furthest from the nucleus and the easiest to lose.',
        ],
        answer: 'The lowest melting point, and the most reactive',
      },
    ],
  },
];
