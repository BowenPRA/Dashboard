// src/data/IGCSE_CHEM/M06_2/workbook.js
// Reveal-solution practice for 6.2 Reactions of Acids and Bases.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Balancing symbol equations is the
// Equations task's job and writing ionic equations is Spectator Strike's, so
// this set carries what those two do not stage: naming salts, choosing the
// reactants for a named salt, predicting products from the type of reaction,
// the gases and their tests, neutralisation in everyday life, and protons.
// Only one item (c1) touches an ionic equation, and it asks about the
// spectators, not for the equation.
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
        prompt: 'Lithium carbonate reacts with dilute **sulfuric acid**. What is the name of the salt that forms?',
        options: [
          { val: 'a', text: 'Lithium carbonate sulfate' },
          { val: 'b', text: 'Lithium chloride' },
          { val: 'c', text: 'Lithium sulfate' },
          { val: 'd', text: 'Lithium sulfide' },
        ],
        correct: 'c',
        solution: [
          'The first word of the salt is the metal: **lithium**.',
          'The second word comes from the acid: sulfuric acid always gives **sulfates**. (A sulfide has no oxygen — it is a different compound.)',
          'The carbonate is used up: it becomes water and carbon dioxide. The salt is **lithium sulfate**.',
        ],
        answer: 'Lithium sulfate',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Choose the words that complete the general equation.',
        textParts: [
          'acid + carbonate → salt + ',
          ' + ',
          '',
        ],
        blanks: {
          1: { correct: 'water', options: [{ val: 'water', text: 'water' }, { val: 'hydrogen', text: 'hydrogen' }, { val: 'oxygen', text: 'oxygen' }] },
          2: { correct: 'carbon dioxide', options: [{ val: 'carbon dioxide', text: 'carbon dioxide' }, { val: 'hydrogen', text: 'hydrogen' }, { val: 'carbon monoxide', text: 'carbon monoxide' }] },
        },
        solution: [
          'A carbonate contains carbon and oxygen. The acid breaks it up.',
          'So an acid + carbonate gives **three** products: a salt, **water** and **carbon dioxide**.',
          'Hydrogen is only made when an acid reacts with a **metal**.',
        ],
        answer: 'water … carbon dioxide',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Drag each gas to the test that identifies it.',
        bank: [
          { val: 'h2', text: 'Hydrogen' },
          { val: 'co2', text: 'Carbon dioxide' },
          { val: 'nh3', text: 'Ammonia' },
        ],
        targets: [
          { id: 'pop', title: 'A lighted splint gives a squeaky pop' },
          { id: 'lime', title: 'It turns limewater milky' },
          { id: 'litmus', title: 'It turns damp red litmus paper blue' },
        ],
        correctSets: { pop: ['h2'], lime: ['co2'], litmus: ['nh3'] },
        solution: [
          '**Hydrogen** (from acid + metal) burns with a squeaky pop.',
          '**Carbon dioxide** (from acid + carbonate) turns limewater milky.',
          '**Ammonia** (from alkali + ammonium salt) is an alkaline gas, so it turns damp red litmus blue.',
        ],
        answer: 'Hydrogen → squeaky pop · carbon dioxide → limewater · ammonia → red litmus blue',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'Why do most toothpastes contain a **base**?',
        options: [
          { val: 'a', text: 'To add acid to the mouth and kill bacteria' },
          { val: 'b', text: 'To neutralise the acids that bacteria make from sugar' },
          { val: 'c', text: 'To make hydrogen gas that cleans the teeth' },
          { val: 'd', text: 'To turn the tooth enamel into a salt' },
        ],
        correct: 'b',
        solution: [
          'Bacteria in the mouth feed on sugar and produce **acids**.',
          'The acids attack the enamel of the teeth, causing tooth decay.',
          'A base in the toothpaste **neutralises** the acid, so it does less damage.',
        ],
        answer: 'To neutralise the acids that bacteria make from sugar',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'You want to make **copper(II) nitrate** and water, and nothing else. Which pair of reactants should you use?',
        options: [
          { val: 'a', text: 'Copper and dilute nitric acid' },
          { val: 'b', text: 'Copper(II) carbonate and dilute nitric acid' },
          { val: 'c', text: 'Copper(II) oxide and dilute sulfuric acid' },
          { val: 'd', text: 'Copper(II) oxide and dilute nitric acid' },
        ],
        correct: 'd',
        solution: [
          'A **nitrate** must come from **nitric acid**, which rules out (c) — that makes copper(II) sulfate.',
          '"Salt and water, nothing else" means the acid must react with a **base**. A carbonate (b) would also give carbon dioxide.',
          'Copper metal (a) does not react with dilute acids at all.',
          'So use the base **copper(II) oxide** with **nitric acid**.',
        ],
        answer: 'Copper(II) oxide and dilute nitric acid',
      },
      {
        id: 'p2', type: 'inline',
        prompt: 'Magnesium carbonate is added to dilute nitric acid. Complete the word equation.',
        textParts: [
          'magnesium carbonate + nitric acid → ',
          ' + water + ',
          '',
        ],
        blanks: {
          1: { correct: 'magnesium nitrate', options: [{ val: 'magnesium nitrate', text: 'magnesium nitrate' }, { val: 'magnesium carbonate nitrate', text: 'magnesium carbonate nitrate' }, { val: 'magnesium chloride', text: 'magnesium chloride' }] },
          2: { correct: 'carbon dioxide', options: [{ val: 'carbon dioxide', text: 'carbon dioxide' }, { val: 'hydrogen', text: 'hydrogen' }, { val: 'oxygen', text: 'oxygen' }] },
        },
        solution: [
          'Name the type of reaction first: acid + **carbonate** → salt + water + carbon dioxide.',
          'The salt: the metal is magnesium, and nitric acid gives nitrates — **magnesium nitrate**.',
          'The gas from a carbonate is **carbon dioxide**.',
        ],
        answer: 'magnesium nitrate … carbon dioxide',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'Which of these reactions is **not** a neutralisation?',
        options: [
          { val: 'a', text: 'Zinc + dilute sulfuric acid' },
          { val: 'b', text: 'Zinc oxide + dilute sulfuric acid' },
          { val: 'c', text: 'Zinc carbonate + dilute sulfuric acid' },
          { val: 'd', text: 'Sodium hydroxide + dilute sulfuric acid' },
        ],
        correct: 'a',
        solution: [
          'Neutralisation is a reaction with an acid that gives **water** as well as a salt.',
          'The oxide (b), the carbonate (c) and the hydroxide (d) all give water.',
          'Zinc metal gives zinc sulfate and **hydrogen** — no water, so it is **not** a neutralisation.',
        ],
        answer: 'Zinc + dilute sulfuric acid',
      },
      {
        id: 'p4', type: 'inline',
        prompt: 'Complete the sentences about acids and bases.',
        textParts: [
          'A hydrogen ion is a hydrogen atom that has lost its ',
          ', so it is just a proton. An acid is a proton ',
          ' and a base is a proton ',
          '.',
        ],
        blanks: {
          1: { correct: 'electron', options: [{ val: 'electron', text: 'electron' }, { val: 'proton', text: 'proton' }, { val: 'neutron', text: 'neutron' }] },
          2: { correct: 'donor', options: [{ val: 'donor', text: 'donor' }, { val: 'acceptor', text: 'acceptor' }] },
          3: { correct: 'acceptor', options: [{ val: 'acceptor', text: 'acceptor' }, { val: 'donor', text: 'donor' }] },
        },
        solution: [
          'A hydrogen atom has one proton and one electron. Losing the **electron** leaves just the proton, $\\text{H}^{+}$.',
          'An acid **gives** its $\\text{H}^{+}$ ions away, so it is a proton **donor**.',
          'A base (its $\\text{OH}^{-}$ or $\\text{O}^{2-}$ ions) **takes** them, so it is a proton **acceptor**.',
        ],
        answer: 'electron … donor … acceptor',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'Sodium hydroxide solution is warmed with **ammonium sulfate**. A piece of damp red litmus paper held at the mouth of the tube turns blue. Which gas is given off?',
        options: [
          { val: 'a', text: 'Hydrogen' },
          { val: 'b', text: 'Sulfur dioxide' },
          { val: 'c', text: 'Ammonia' },
          { val: 'd', text: 'Carbon dioxide' },
        ],
        correct: 'c',
        solution: [
          'An **alkali** + an **ammonium salt** → salt + water + **ammonia**.',
          'Ammonia is the only common alkaline gas, which is why it turns red litmus blue.',
          'The sulfate part stays behind in the salt, sodium sulfate — it does not come off as a gas.',
        ],
        answer: 'Ammonia',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'Dilute nitric acid is neutralised by lithium hydroxide solution: $\\text{HNO}_3(\\text{aq}) + \\text{LiOH}(\\text{aq}) \\rightarrow \\text{LiNO}_3(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$. Which ions are the **spectator ions**?',
        options: [
          { val: 'a', text: 'H⁺ and OH⁻' },
          { val: 'b', text: 'Li⁺ and NO₃⁻' },
          { val: 'c', text: 'Li⁺ only' },
          { val: 'd', text: 'There are none — every ion takes part' },
        ],
        correct: 'b',
        solution: [
          'Write every ion: $\\text{H}^{+} + \\text{NO}_3^{-} + \\text{Li}^{+} + \\text{OH}^{-} \\rightarrow \\text{Li}^{+} + \\text{NO}_3^{-} + \\text{H}_2\\text{O}$',
          '$\\text{Li}^{+}$ and $\\text{NO}_3^{-}$ appear unchanged on **both** sides — they are the spectators.',
          'What is left, $\\text{H}^{+} + \\text{OH}^{-} \\rightarrow \\text{H}_2\\text{O}$, shows the ions that take part.',
        ],
        answer: 'Li⁺ and NO₃⁻',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'A white powder X does **not** dissolve in water. When it is added to dilute hydrochloric acid it disappears, but there is **no fizzing**. What could X be?',
        options: [
          { val: 'a', text: 'Zinc powder' },
          { val: 'b', text: 'Zinc carbonate' },
          { val: 'c', text: 'Sodium hydroxide' },
          { val: 'd', text: 'Zinc oxide' },
        ],
        correct: 'd',
        solution: [
          'No fizzing means no gas — so not a metal (hydrogen) and not a carbonate (carbon dioxide).',
          'Sodium hydroxide is an alkali — it **dissolves** in water, so it cannot be X.',
          'An **insoluble base** fits: zinc oxide reacts to give zinc chloride and water only.',
        ],
        answer: 'Zinc oxide',
      },
      {
        id: 'c3', type: 'dnd',
        prompt: 'Zinc oxide neutralises dilute hydrochloric acid. Drag each particle to its job in the reaction.',
        bank: [
          { val: 'h', text: 'the H⁺ ions from the acid' },
          { val: 'o', text: 'the O²⁻ ions in the zinc oxide' },
          { val: 'zn', text: 'the Zn²⁺ ions' },
          { val: 'cl', text: 'the Cl⁻ ions' },
        ],
        targets: [
          { id: 'donor', title: 'Proton donor' },
          { id: 'acceptor', title: 'Proton acceptor' },
          { id: 'spec', title: 'Ends up in the salt solution, unchanged' },
        ],
        correctSets: { donor: ['h'], acceptor: ['o'], spec: ['zn', 'cl'] },
        solution: [
          'The acid gives protons: the **H⁺ ions** are donated.',
          'The **oxide ions** take them: $2\\text{H}^{+}(\\text{aq}) + \\text{O}^{2-}(\\text{s}) \\rightarrow \\text{H}_2\\text{O}(\\text{l})$.',
          'The Zn²⁺ ions leave the lattice and join the Cl⁻ ions in solution — zinc chloride, the salt.',
        ],
        answer: 'H⁺ → donor · O²⁻ → acceptor · Zn²⁺ and Cl⁻ → the salt solution',
      },
    ],
  },
];
