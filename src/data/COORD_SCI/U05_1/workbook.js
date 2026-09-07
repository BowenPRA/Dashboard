// src/data/COORD_SCI/U05_1/workbook.js
// Reveal-solution practice for C5.01 Exothermic and endothermic reactions.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed equations or sentences. Drawing a diagram is
// the Energy Diagrams task's job and writing equations is the Equations task's;
// the workbook checks the understanding AROUND them, which is why several items
// here describe a diagram in words and ask what it means.
//
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which word describes a reaction that **gives out** heat to its surroundings?',
        options: [
          { val: 'a', text: 'Exothermic' },
          { val: 'b', text: 'Endothermic' },
          { val: 'c', text: 'Electrolytic' },
          { val: 'd', text: 'Diatomic' },
        ],
        correct: 'a',
        solution: ['**EX**othermic — heat **EX**its the reaction.', 'The surroundings warm up, so the mixture feels hot.'],
        answer: 'Exothermic',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Choose the words that complete the sentence.',
        textParts: [
          'In an endothermic reaction, heat energy is ',
          ' the surroundings, so the temperature of the surroundings ',
          '.',
        ],
        blanks: {
          1: { correct: 'taken in from', options: [{ val: 'taken in from', text: 'taken in from' }, { val: 'given out to', text: 'given out to' }] },
          2: { correct: 'falls', options: [{ val: 'falls', text: 'falls' }, { val: 'rises', text: 'rises' }, { val: 'stays the same', text: 'stays the same' }] },
        },
        solution: ['**EN**dothermic — heat **EN**ters the reaction.', 'That heat has to come out of the surroundings, so the surroundings get **colder**.'],
        answer: 'taken in from … falls',
      },
      {
        id: 'f3', type: 'mcq',
        prompt: 'On an energy level diagram, what is shown on the **vertical (y) axis**?',
        options: [
          { val: 'a', text: 'The energy of the substances, in kJ' },
          { val: 'b', text: 'The time the reaction takes' },
          { val: 'c', text: 'The temperature of the room' },
          { val: 'd', text: 'The mass of the products' },
        ],
        correct: 'a',
        solution: ['The y-axis is **Energy / kJ**.', 'The horizontal axis is the **progress of reaction**, with reactants on the left and products on the right.'],
        answer: 'The energy of the substances, in kJ',
      },
      {
        id: 'f4', type: 'dnd',
        prompt: 'Drag each reaction to the correct type.',
        bank: [
          { val: 'burn', text: 'Burning methane in a gas hob' },
          { val: 'photo', text: 'Photosynthesis in a leaf' },
        ],
        targets: [
          { id: 'exo', title: 'Exothermic — gives out heat' },
          { id: 'endo', title: 'Endothermic — takes in heat' },
        ],
        correctSets: { exo: ['burn'], endo: ['photo'] },
        solution: ['**Combustion** always releases energy — that is the point of a fuel.', '**Photosynthesis** absorbs the energy of sunlight and stores it in carbohydrates.'],
        answer: 'Burning → exothermic, photosynthesis → endothermic',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'inline',
        prompt: 'Choose the words that describe the diagram for an **exothermic** reaction.',
        textParts: [
          'The products line is drawn ',
          ' the reactants line, the energy arrow points ',
          ', and the enthalpy change ΔH is ',
          '.',
        ],
        blanks: {
          1: { correct: 'below', options: [{ val: 'below', text: 'below' }, { val: 'above', text: 'above' }, { val: 'level with', text: 'level with' }] },
          2: { correct: 'downwards', options: [{ val: 'downwards', text: 'downwards' }, { val: 'upwards', text: 'upwards' }] },
          3: { correct: 'negative', options: [{ val: 'negative', text: 'negative' }, { val: 'positive', text: 'positive' }, { val: 'zero', text: 'zero' }] },
        },
        solution: ['Energy leaves the system, so the products hold **less** than the reactants: the line drops.', 'A drop means the arrow points **down** and the enthalpy change is **negative**.'],
        answer: 'below … downwards … negative',
      },
      {
        id: 'p2', type: 'mcq',
        prompt: 'A reaction has $\\Delta H = +178$ kJ/mol. Which statement is correct?',
        options: [
          { val: 'a', text: 'It is endothermic; 178 kJ is taken in per mole' },
          { val: 'b', text: 'It is exothermic; 178 kJ is given out per mole' },
          { val: 'c', text: 'It is endothermic; 178 kJ is given out per mole' },
          { val: 'd', text: 'It is exothermic; 178 J is taken in per mole' },
        ],
        correct: 'a',
        solution: ['A **positive** ΔH means the enthalpy of the system went **up** — it gained energy.', 'Gaining energy from the surroundings is **endothermic**. The units are kilojoules per mole.'],
        answer: 'Endothermic; 178 kJ is taken in per mole',
      },
      {
        id: 'p3', type: 'dnd',
        prompt: 'Drag each bond process to whether it takes energy in or gives energy out.',
        bank: [
          { val: 'break', text: 'Breaking bonds in the reactants' },
          { val: 'make', text: 'Making bonds in the products' },
        ],
        targets: [
          { id: 'in', title: 'Takes energy IN (endothermic)' },
          { id: 'out', title: 'Gives energy OUT (exothermic)' },
        ],
        correctSets: { in: ['break'], out: ['make'] },
        solution: ['A bond is an attraction, so pulling atoms apart **needs** energy: breaking is endothermic.', 'Forming a bond lets that energy back out: making is exothermic. **MEXOBENDO** — **M**aking **EXO**, **B**reaking **ENDO**.'],
        answer: 'Breaking → takes in, making → gives out',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'Which list gives **all** of "the surroundings" that warm up during an exothermic reaction in a test tube?',
        options: [
          { val: 'a', text: 'Only the air in the room' },
          { val: 'b', text: 'The reaction mixture, the air around the tube, the tube itself and the thermometer' },
          { val: 'c', text: 'Only the reaction mixture' },
          { val: 'd', text: 'Only the thermometer' },
        ],
        correct: 'b',
        solution: ['The surroundings are everything the energy can move into — mixture, air, glass **and** thermometer.', 'The thermometer matters most: the reading rises because heat is transferred **into the thermometer itself**.'],
        answer: 'The reaction mixture, the air around the tube, the tube itself and the thermometer',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'On a reaction pathway diagram, the **activation energy** is the height measured from:',
        options: [
          { val: 'a', text: 'The bottom of the y-axis up to the peak' },
          { val: 'b', text: 'The products line up to the peak' },
          { val: 'c', text: 'The reactants line up to the peak' },
          { val: 'd', text: 'The reactants line down to the products line' },
        ],
        correct: 'c',
        solution: ['$E_a$ is the extra energy the **reactants** need to get over the barrier, so it is measured from the reactants line.', 'Option (d) describes ΔH, the enthalpy change — a different measurement on the same diagram.'],
        answer: 'The reactants line up to the peak',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'In a certain reaction, breaking the bonds in the reactants takes in 1200 kJ and making the bonds in the products gives out 1450 kJ. What is the reaction?',
        options: [
          { val: 'a', text: 'Exothermic, because 250 kJ more is given out than taken in' },
          { val: 'b', text: 'Endothermic, because 250 kJ more is taken in than given out' },
          { val: 'c', text: 'Exothermic, because 2650 kJ is released in total' },
          { val: 'd', text: 'Neither — the energies cancel out' },
        ],
        correct: 'a',
        solution: ['Compare the two totals: **out** 1450 kJ against **in** 1200 kJ.', 'More comes out than goes in, so the reaction releases 250 kJ overall — **exothermic** ($\\Delta H = -250$ kJ/mol). Option (c) adds the two instead of comparing them.'],
        answer: 'Exothermic, because 250 kJ more is given out than taken in',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'Calcium carbonate decomposes in a kiln: $\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2$. The kiln must be kept hot the whole time or the reaction stops. What does that tell you?',
        options: [
          { val: 'a', text: 'It is exothermic, because the kiln is hot' },
          { val: 'b', text: 'It is endothermic — energy has to be continuously supplied to it' },
          { val: 'c', text: 'It has no activation energy' },
          { val: 'd', text: 'It is exothermic, because a gas is produced' },
        ],
        correct: 'b',
        solution: ['Do not judge by how hot the room is — ask **which way the energy is flowing**.', 'The reaction only continues while heat is being **supplied**, so it is taking energy IN: **endothermic**, ΔH positive.'],
        answer: 'Endothermic — energy has to be continuously supplied to it',
      },
      {
        id: 'c3', type: 'inline',
        prompt: 'Natural gas does not burst into flame the moment it mixes with air, even though burning is strongly exothermic. Complete the explanation.',
        textParts: [
          'The mixture first needs its ',
          ' energy, supplied here by a spark, because ',
          ' must happen before new bonds can form. Once it has started, the energy released as new bonds form ',
          '.',
        ],
        blanks: {
          1: { correct: 'activation', options: [{ val: 'activation', text: 'activation' }, { val: 'enthalpy', text: 'enthalpy' }, { val: 'bond', text: 'bond' }] },
          2: { correct: 'bond breaking', options: [{ val: 'bond breaking', text: 'bond breaking' }, { val: 'bond making', text: 'bond making' }] },
          3: { correct: 'keeps the reaction going', options: [{ val: 'keeps the reaction going', text: 'keeps the reaction going' }, { val: 'stops the reaction', text: 'stops the reaction' }] },
        },
        solution: ['Every reaction has an **activation energy**, because bonds must be **broken** first and breaking is endothermic.', 'That is the barrier the spark gets you over. After that, the energy from bond making is more than enough to keep it going — which is why one spark lights a whole hob.'],
        answer: 'activation … bond breaking … keeps the reaction going',
      },
    ],
  },
];
