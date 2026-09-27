// src/data/IGCSE_CHEM/M06_7/workbook.js
// Reveal-solution practice for 6.7 Group 7: the Halogens.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Balancing symbol equations is the
// Equations task's job and writing ionic equations is Spectator Strike's, so
// this set carries what those two do not stage: naming halides, the physical
// and chemical trends, what iron wool looks like in each halogen, predicting a
// displacement from the order of reactivity, ionic against covalent products,
// and the electron-shell reasons behind the opposite trends in Groups I and VII.
//
// Focus stays on Core content, so a shaky student has somewhere to stand.
// Inline maths uses $…$ with \text{} to keep element symbols upright. See
// docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'dnd',
        prompt: 'Each compound is a **halide**. Drag it to the halogen it was made from.',
        bank: [
          { val: 'lii', text: 'lithium iodide' },
          { val: 'cacl2', text: 'calcium chloride' },
          { val: 'kbr', text: 'potassium bromide' },
          { val: 'alcl3', text: 'aluminium chloride' },
          { val: 'znbr2', text: 'zinc bromide' },
          { val: 'mgi2', text: 'magnesium iodide' },
        ],
        targets: [
          { id: 'cl', title: 'Chlorine' },
          { id: 'br', title: 'Bromine' },
          { id: 'i', title: 'Iodine' },
        ],
        correctSets: { cl: ['cacl2', 'alcl3'], br: ['kbr', 'znbr2'], i: ['lii', 'mgi2'] },
        solution: [
          'A halide is named after its halogen, with the ending changed to **-ide**.',
          'chlorine → **chloride**, bromine → **bromide**, iodine → **iodide**.',
          'The first word is the other element. So calcium chloride and aluminium chloride came from chlorine, and so on.',
        ],
        answer: 'Chlorides → chlorine · bromides → bromine · iodides → iodine',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'Complete the sentence about the trends down Group VII.',
        textParts: [
          'Going down Group VII, the boiling point ',
          ', the density ',
          ' and the reactivity ',
          '.',
        ],
        blanks: {
          1: { correct: 'increases', options: [{ val: 'increases', text: 'increases' }, { val: 'decreases', text: 'decreases' }, { val: 'stays the same', text: 'stays the same' }] },
          2: { correct: 'increases', options: [{ val: 'increases', text: 'increases' }, { val: 'decreases', text: 'decreases' }, { val: 'stays the same', text: 'stays the same' }] },
          3: { correct: 'decreases', options: [{ val: 'increases', text: 'increases' }, { val: 'decreases', text: 'decreases' }, { val: 'stays the same', text: 'stays the same' }] },
        },
        solution: [
          'Boiling point: −35 °C (chlorine), 59 °C (bromine), 184 °C (iodine) — it **increases**. That is why the state goes gas → liquid → solid.',
          'Density also **increases**: the atoms get much heavier and only a little bigger.',
          'Reactivity **decreases** — the one trend that goes the other way.',
        ],
        answer: 'increases … increases … decreases',
      },
      {
        id: 'f3', type: 'mcq',
        prompt: 'Hot iron wool is lowered into a gas jar of **bromine vapour**. What would you see?',
        options: [
          { val: 'a', text: 'Nothing — iron does not react with bromine' },
          { val: 'b', text: 'It bursts into a white flame, brighter than in chlorine' },
          { val: 'c', text: 'It glows, but less brightly than in chlorine, and a red-brown solid forms' },
          { val: 'd', text: 'It fizzes and gives off hydrogen' },
        ],
        correct: 'c',
        solution: [
          'All the halogens react with hot iron wool, so there **is** a reaction.',
          'Bromine is below chlorine, so it is **less reactive**: the wool glows, but less brightly than in chlorine.',
          'The product is iron(III) bromide, $\\text{FeBr}_3$, a **red-brown solid**.',
        ],
        answer: 'It glows, but less brightly than in chlorine, and a red-brown solid forms',
      },
      {
        id: 'f4', type: 'inline',
        prompt: 'Complete the description of the halogens.',
        textParts: [
          'The halogens are ',
          '. They are all ',
          ', and their molecules are ',
          '.',
        ],
        blanks: {
          1: { correct: 'non-metals', options: [{ val: 'non-metals', text: 'non-metals' }, { val: 'metals', text: 'metals' }, { val: 'noble gases', text: 'noble gases' }] },
          2: { correct: 'poisonous', options: [{ val: 'poisonous', text: 'poisonous' }, { val: 'harmless', text: 'harmless' }, { val: 'colourless', text: 'colourless' }] },
          3: { correct: 'diatomic', options: [{ val: 'diatomic', text: 'diatomic' }, { val: 'single atoms', text: 'single atoms' }, { val: 'ions', text: 'ions' }] },
        },
        solution: [
          'Group VII is a group of **non-metal** elements.',
          'They are all coloured, and all **poisonous** — fluorine is too dangerous for a school lab.',
          'Their molecules are **diatomic** — two atoms each: $\\text{Cl}_2$, $\\text{Br}_2$, $\\text{I}_2$.',
        ],
        answer: 'non-metals … poisonous … diatomic',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'mcq',
        prompt: 'Orange **bromine water** is added to colourless **sodium iodide** solution. What happens, and why?',
        options: [
          { val: 'a', text: 'The solution turns red-brown, because bromine displaces iodine' },
          { val: 'b', text: 'Nothing, because bromine is less reactive than iodine' },
          { val: 'c', text: 'The solution turns colourless, because the bromine is destroyed' },
          { val: 'd', text: 'The solution turns pale yellow-green, because chlorine is made' },
        ],
        correct: 'a',
        solution: [
          'Bromine is **above** iodine in Group VII, so it is **more reactive**.',
          'A halogen displaces a less reactive halogen from a solution of its halide, so bromine pushes the iodine out.',
          'Iodine in solution is **red-brown**: $\\text{Br}_2 + 2\\text{NaI} \\rightarrow 2\\text{NaBr} + \\text{I}_2$.',
        ],
        answer: 'The solution turns red-brown, because bromine displaces iodine',
      },
      {
        id: 'p2', type: 'inline',
        prompt: 'Chlorine water is added to lithium bromide solution. Complete the word equation.',
        textParts: [
          'chlorine + lithium bromide → ',
          ' + ',
          '',
        ],
        blanks: {
          1: { correct: 'lithium chloride', options: [{ val: 'lithium chloride', text: 'lithium chloride' }, { val: 'lithium chlorine', text: 'lithium chlorine' }, { val: 'lithium bromide', text: 'lithium bromide' }] },
          2: { correct: 'bromine', options: [{ val: 'bromine', text: 'bromine' }, { val: 'bromide', text: 'bromide' }, { val: 'chlorine', text: 'chlorine' }] },
        },
        solution: [
          'Chlorine is more reactive than bromine, so it **displaces** it.',
          'The chlorine takes bromine\'s place in the compound: **lithium chloride**. (A compound is a chlor**ide**, not a chlor**ine**.)',
          'The bromine is pushed out as the element: **bromine**, which colours the solution orange.',
        ],
        answer: 'lithium chloride … bromine',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'Which of these mixtures gives **no reaction**?',
        options: [
          { val: 'a', text: 'Chlorine water + potassium iodide' },
          { val: 'b', text: 'Bromine water + potassium iodide' },
          { val: 'c', text: 'Chlorine water + potassium bromide' },
          { val: 'd', text: 'Iodine solution + potassium bromide' },
        ],
        correct: 'd',
        solution: [
          'Order of reactivity: chlorine > bromine > iodine.',
          'In (a), (b) and (c) the halogen added is **more** reactive than the one in the halide, so it displaces it.',
          'In (d), iodine is **less** reactive than bromine, so it cannot push bromine out: **no reaction**.',
        ],
        answer: 'Iodine solution + potassium bromide',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'Chlorine reacts with **phosphorus**, a non-metal. What kind of product forms?',
        options: [
          { val: 'a', text: 'An ionic compound, because chlorine atoms gain electrons to form chloride ions' },
          { val: 'b', text: 'Molecules with covalent bonds, because the atoms share electrons' },
          { val: 'c', text: 'A salt, because every halogen compound is a salt' },
          { val: 'd', text: 'No product — halogens only react with metals' },
        ],
        correct: 'b',
        solution: [
          'Look at the partner. Phosphorus is a **non-metal**, so it does not give electrons away.',
          'Instead the atoms **share** electrons.',
          'So the product is made of **molecules with covalent bonds** — like hydrogen chloride, $\\text{HCl}$. Chloride ions only form with a **metal**.',
        ],
        answer: 'Molecules with covalent bonds, because the atoms share electrons',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: '**Rubidium** is below potassium in Group I. **Astatine** is below iodine in Group VII. Which statement is correct?',
        options: [
          { val: 'a', text: 'Rubidium is more reactive than potassium, and astatine is more reactive than iodine' },
          { val: 'b', text: 'Rubidium is less reactive than potassium, and astatine is less reactive than iodine' },
          { val: 'c', text: 'Rubidium is less reactive than potassium, and astatine is more reactive than iodine' },
          { val: 'd', text: 'Rubidium is more reactive than potassium, and astatine is less reactive than iodine' },
        ],
        correct: 'd',
        solution: [
          'In Group I, reactivity **increases** down the group, so rubidium is **more** reactive than potassium.',
          'In Group VII, reactivity **decreases** down the group, so astatine is **less** reactive than iodine.',
          'The two groups have **opposite** trends.',
        ],
        answer: 'Rubidium is more reactive than potassium, and astatine is less reactive than iodine',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'inline',
        prompt: 'Explain the opposite trends. Choose the words.',
        textParts: [
          'A potassium atom\'s outer shell is further from the nucleus than a sodium atom\'s, so its outer electron is ',
          ' to lose, and potassium is ',
          ' reactive. An iodine atom\'s outer shell is further from the nucleus than a chlorine atom\'s, so an extra electron is ',
          ' to gain, and iodine is ',
          ' reactive.',
        ],
        blanks: {
          1: { correct: 'easier', options: [{ val: 'easier', text: 'easier' }, { val: 'harder', text: 'harder' }] },
          2: { correct: 'more', options: [{ val: 'more', text: 'more' }, { val: 'less', text: 'less' }] },
          3: { correct: 'harder', options: [{ val: 'easier', text: 'easier' }, { val: 'harder', text: 'harder' }] },
          4: { correct: 'less', options: [{ val: 'more', text: 'more' }, { val: 'less', text: 'less' }] },
        },
        solution: [
          'The positive nucleus pulls on electrons, and the pull is weaker further away.',
          'A Group I metal reacts by **losing** its outer electron. A weaker hold makes that **easier**, so potassium is **more** reactive.',
          'A halogen reacts by **gaining** an electron. A weaker pull makes that **harder**, so iodine is **less** reactive.',
          'Same cause, opposite trends — because one group loses electrons and the other gains them.',
        ],
        answer: 'easier … more … harder … less',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'Magnesium burns in bromine vapour to form an ionic compound. Magnesium ions are $\\text{Mg}^{2+}$. What is the formula of the product?',
        options: [
          { val: 'a', text: 'MgBr' },
          { val: 'b', text: 'MgBr₂' },
          { val: 'c', text: 'Mg₂Br' },
          { val: 'd', text: 'MgBr₇' },
        ],
        correct: 'b',
        solution: [
          'A bromine atom gains **one** electron, so the bromide ion is $\\text{Br}^{-}$ — every halide ion has a charge of 1−.',
          'One $\\text{Mg}^{2+}$ ion needs **two** $\\text{Br}^{-}$ ions to cancel its charge.',
          'So the formula is **MgBr₂**, magnesium bromide. (The 7 outer electrons do not give a charge of 7.)',
        ],
        answer: 'MgBr₂',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'A halogen **X** is tested. It displaces iodine from potassium iodide solution, but it does **not** displace bromine from potassium bromide solution. Which halogen is X?',
        options: [
          { val: 'a', text: 'Chlorine' },
          { val: 'b', text: 'Iodine' },
          { val: 'c', text: 'Fluorine' },
          { val: 'd', text: 'Bromine' },
        ],
        correct: 'd',
        solution: [
          'X displaces iodine, so X is **more** reactive than iodine — it is not iodine itself.',
          'X does not displace bromine, so X is **not more** reactive than bromine. That rules out chlorine and fluorine, which would displace it.',
          'The only halogen that fits is **bromine** itself — it has nothing to swap with its own bromide.',
        ],
        answer: 'Bromine',
      },
    ],
  },
];
