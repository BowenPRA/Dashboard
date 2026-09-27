// src/data/IGCSE_CHEM/M05_2/workbook.js
// Reveal-solution practice for M05_2 Bond Energies & Calculating ΔH.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — nothing is free-typed. The full six-step calculation is
// the Bond Ledger task's job, so this workbook stages it only ONCE (c1) and
// otherwise tests the ideas around it: units and J ↔ kJ, reading the table,
// which bond is strongest, reading the bond energy diagram, what the sign
// means, per-mole reasoning, and why N≡N makes nitrogen inert.
//
// Focus stays on Core content (bond breaking/making, the sign, the unit) so a
// shaky student has somewhere to stand. Every reaction here is a fresh one —
// neither of the book's worked examples is recalculated, and no book question
// is reproduced. Bond energies are the unit's table (diagrams.js BOND_TABLE).
//
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'A student reads that a reaction gives out **4.8 kJ**. How many **joules** is that?',
        options: [
          { val: 'a', text: '0.0048 J' },
          { val: 'b', text: '48 J' },
          { val: 'c', text: '4800 J' },
          { val: 'd', text: '480 J' },
        ],
        correct: 'c',
        solution: [
          '**1 kJ = 1000 J.**',
          'kJ to J: **multiply** by 1000.',
          '4.8 × 1000 = **4800 J**. (Answer a divided instead of multiplying.)',
        ],
        answer: '4800 J',
      },
      {
        id: 'f2', type: 'dnd',
        prompt: 'Drag each change to the right box. Does it take energy **in**, or give energy **out**?',
        bank: [
          { val: 'hh', text: 'Breaking the H–H bond in a hydrogen molecule' },
          { val: 'oh', text: 'Forming an O–H bond in a water molecule' },
          { val: 'br', text: 'Splitting bromine molecules into bromine atoms' },
          { val: 'nn', text: 'Two nitrogen atoms joining to make N≡N' },
        ],
        targets: [
          { id: 'in', title: 'Takes energy IN' },
          { id: 'out', title: 'Gives energy OUT' },
        ],
        correctSets: { in: ['hh', 'br'], out: ['oh', 'nn'] },
        solution: [
          'Pulling atoms apart **breaks** a bond, and breaking always **takes energy in**: H–H breaking, bromine molecules splitting.',
          'Atoms joining **makes** a bond, and making always **gives energy out**: an O–H bond forming, N≡N forming.',
        ],
        answer: 'In: breaking H–H, splitting bromine · Out: forming O–H, making N≡N',
      },
      {
        id: 'f3', type: 'inline',
        prompt: 'Choose the words that complete the equation for the enthalpy change.',
        textParts: [
          'ΔH = energy ',
          ' (for bond breaking) − energy ',
          ' (from bond making).',
        ],
        blanks: {
          1: { correct: 'in', options: [{ val: 'in', text: 'in' }, { val: 'out', text: 'out' }] },
          2: { correct: 'out', options: [{ val: 'in', text: 'in' }, { val: 'out', text: 'out' }] },
        },
        solution: [
          'Bonds are **broken first**, so energy **in** comes first.',
          'Then the new bonds form and give energy **out**, which is subtracted.',
          '**ΔH = energy in − energy out.**',
        ],
        answer: 'in … out',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'A reaction has $\\Delta H = -45$ kJ/mol. Which statement is correct?',
        options: [
          { val: 'a', text: 'It is endothermic; 45 kJ is taken in per mole' },
          { val: 'b', text: 'It is exothermic; 45 kJ is given out per mole' },
          { val: 'c', text: 'It is exothermic; 45 kJ is taken in per mole' },
          { val: 'd', text: 'It is endothermic; 45 J is given out per mole' },
        ],
        correct: 'b',
        solution: [
          'A **minus** sign means energy out was bigger than energy in.',
          'So the reaction **gives out** 45 kJ for each mole: it is **exothermic**.',
        ],
        answer: 'Exothermic; 45 kJ is given out per mole',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'Use the bond energy table. Which of these bonds needs the **most** energy to break?',
        options: [
          { val: 'a', text: 'C–H' },
          { val: 'b', text: 'O–H' },
          { val: 'c', text: 'H–F' },
          { val: 'd', text: 'C=C' },
        ],
        correct: 'd',
        solution: [
          'Read each value: C–H **413**, O–H **464**, H–F **565**, C=C **612** kJ/mol.',
          'The biggest number is the strongest bond, and the hardest to break: **C=C**.',
        ],
        answer: 'C=C (612 kJ/mol)',
      },
      {
        id: 'p2', type: 'dnd',
        prompt: 'An energy diagram for a reaction is drawn the book’s way: the reactants, then an arrow **up** to a top level, then an arrow **down** to the products. Drag each meaning to the part of the diagram it describes.',
        bank: [
          { val: 'atoms', text: 'Every bond is broken: only separate atoms' },
          { val: 'ein', text: 'Energy taken in to break the reactant bonds' },
          { val: 'eout', text: 'Energy given out as the product bonds form' },
          { val: 'dh', text: 'ΔH, the overall enthalpy change' },
        ],
        targets: [
          { id: 'up', title: 'The arrow going up' },
          { id: 'top', title: 'The top level' },
          { id: 'down', title: 'The arrow coming down' },
          { id: 'gap', title: 'The gap between reactants and products' },
        ],
        correctSets: { up: ['ein'], top: ['atoms'], down: ['eout'], gap: ['dh'] },
        solution: [
          'Going **up** costs energy: that is **energy in**, for breaking the bonds.',
          'At the **top**, all the bonds are broken — the level is **separate atoms**.',
          'Coming **down** releases energy: that is **energy out**, as the new bonds form.',
          'Where the line ends compared with where it started is **ΔH**.',
        ],
        answer: 'Up: energy in · Top: separate atoms · Down: energy out · Gap: ΔH',
      },
      {
        id: 'p3', type: 'inline',
        prompt: 'Hydrogen reacts with iodine: $\\text{H}_2 + \\text{I}_2 \\rightarrow 2\\text{HI}$. Complete the bond count.',
        textParts: [
          'Bonds broken: 1 H–H and 1 ',
          '. Bonds made: ',
          ' H–I.',
        ],
        blanks: {
          1: { correct: 'I–I', options: [{ val: 'I–I', text: 'I–I' }, { val: 'H–I', text: 'H–I' }, { val: 'H–H', text: 'H–H' }] },
          2: { correct: '2', options: [{ val: '1', text: '1' }, { val: '2', text: '2' }, { val: '4', text: '4' }] },
        },
        solution: [
          'Write it out: **H–H + I–I → 2 H–I**.',
          'Reactants: one H–H bond and one **I–I** bond are broken.',
          'Products: 2HI is **two** molecules, each with one H–I bond, so **2** H–I bonds are made.',
        ],
        answer: 'I–I … 2',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'How much energy is needed to break all the bonds in **3 moles** of iodine, $\\text{I}_2$? (I–I = 151 kJ/mol)',
        options: [
          { val: 'a', text: '151 kJ' },
          { val: 'b', text: '453 kJ' },
          { val: 'c', text: '302 kJ' },
          { val: 'd', text: '894 kJ' },
        ],
        correct: 'b',
        solution: [
          'Each $\\text{I}_2$ molecule is I–I: **one** bond.',
          '3 moles of molecules → **3 moles** of I–I bonds.',
          '3 × 151 = **453 kJ**. (Answer a forgot the 3; answer d used the H–I value, 298, by mistake.)',
        ],
        answer: '453 kJ',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'For $\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3$, $\\Delta H = -92$ kJ. How much energy is given out when **4 moles** of ammonia are made?',
        options: [
          { val: 'a', text: '92 kJ' },
          { val: 'b', text: '46 kJ' },
          { val: 'c', text: '368 kJ' },
          { val: 'd', text: '184 kJ' },
        ],
        correct: 'd',
        solution: [
          'The −92 kJ is for the equation as written, which makes **2 moles** of ammonia.',
          '4 moles is **twice** as much, so twice the energy: 2 × 92 = **184 kJ** given out.',
          '(Answer c multiplied by 4 — but the 92 kJ was already for 2 moles, not 1.)',
        ],
        answer: '184 kJ',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'Hydrogen reacts with fluorine: $\\text{H}_2 + \\text{F}_2 \\rightarrow 2\\text{HF}$. Use H–H = 436, F–F = 158 and H–F = 565 kJ/mol. What is ΔH?',
        options: [
          { val: 'a', text: '+536 kJ, endothermic' },
          { val: 'b', text: '+29 kJ, endothermic' },
          { val: 'c', text: '−536 kJ, exothermic' },
          { val: 'd', text: '+1724 kJ, endothermic' },
        ],
        correct: 'c',
        solution: [
          'Show the bonds: **H–H + F–F → 2 H–F**.',
          'Energy in: 436 + 158 = **594 kJ**.',
          'Energy out: 2 × 565 = **1130 kJ**.',
          'ΔH = in − out = 594 − 1130 = **−536 kJ**: negative, so **exothermic**.',
          'Answer a did out − in; answer b forgot the 2 in 2HF; answer d added the totals.',
        ],
        answer: '−536 kJ, exothermic',
      },
      {
        id: 'c2', type: 'inline',
        prompt: 'Nitrogen makes up most of the air, yet it hardly ever reacts. Complete the explanation.',
        textParts: [
          'A nitrogen molecule is held together by a ',
          ' bond. Its bond energy, ',
          ' kJ/mol, is the ',
          ' in the table, so a very large amount of energy must be ',
          ' before nitrogen can react.',
        ],
        blanks: {
          1: { correct: 'triple', options: [{ val: 'single', text: 'single' }, { val: 'double', text: 'double' }, { val: 'triple', text: 'triple' }] },
          2: { correct: '946', options: [{ val: '158', text: '158' }, { val: '391', text: '391' }, { val: '946', text: '946' }] },
          3: { correct: 'highest', options: [{ val: 'highest', text: 'highest' }, { val: 'lowest', text: 'lowest' }] },
          4: { correct: 'taken in', options: [{ val: 'taken in', text: 'taken in' }, { val: 'given out', text: 'given out' }] },
        },
        solution: [
          'Nitrogen is **N≡N**: a **triple** bond.',
          'Its bond energy is **946 kJ/mol** — the **highest** value in the table. (158 is the single N–N bond; 391 is N–H.)',
          'Nitrogen must break this bond before it can react, and breaking **takes energy in**. So nitrogen is **inert**.',
        ],
        answer: 'triple … 946 … highest … taken in',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: '$\\text{H}_2 + \\text{I}_2 \\rightarrow 2\\text{HI}$ has $\\Delta H = -9$ kJ. What is ΔH for the **reverse** reaction, $2\\text{HI} \\rightarrow \\text{H}_2 + \\text{I}_2$?',
        options: [
          { val: 'a', text: '+9 kJ' },
          { val: 'b', text: '−9 kJ' },
          { val: 'c', text: '+596 kJ' },
          { val: 'd', text: '0 kJ' },
        ],
        correct: 'a',
        solution: [
          'Reversing swaps the jobs: now the **two H–I bonds are broken** (energy in = 2 × 298 = 596 kJ).',
          'And **H–H and I–I are made** (energy out = 436 + 151 = 587 kJ).',
          'ΔH = 596 − 587 = **+9 kJ**: the same size, the **opposite sign**.',
          '(Answer c is only the energy in — the energy out still has to be subtracted.)',
        ],
        answer: '+9 kJ',
      },
    ],
  },
];
