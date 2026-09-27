// src/data/IGCSE_CHEM/M05_2/notes.js
// M05_2 Bond Energies & Calculating ΔH — book spread 8.3, "Calculating enthalpy
// changes". English only (IGCSE_CHEM is not bilingual), so there are no `*Vn`
// twins anywhere.
//
// This is the track's CALCULATION exemplar, so the deck teaches one method and
// names its steps the same way every time, in the order the Bond Ledger task
// walks them: (1) show all the bonds, (2) count them — with the coefficient,
// (3) energy in, (4) energy out, (5) ΔH = in − out, (6) read the sign. The
// spine: one recap slide of spreads 8.1–8.2 → a predict → the unit → bond
// energy → the table → the English of "in" and "out" → the equation → the six
// steps → the book's two worked examples, taught step by step (the student has
// the book open beside them) → the energy diagram with "bonds broken" at the
// top → why N≡N makes nitrogen inert → a countable recap.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its
// slide — the audio generator narrates every field before it and stops there.
// Titles are read aloud, so symbols like ΔH stay out of them. Chemical
// equations are KaTeX ($…$) with \text{} keeping element symbols upright; a
// bond written in prose (H–H, O=O, N≡N) stays plain text.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const BLUE = '#1a5fa8';
const INDIGO = '#4338ca';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: RED,
    icon: 'Calculator',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Energy changes in reactions · spread 8.3',
    title: 'Bond Energies and Calculating the Enthalpy Change',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Burning natural gas heats millions of homes. Chemists can say **how much** heat one mole of it gives out — and they can work it out **on paper**, without lighting anything. In one sentence: what do you think they need to know about the molecules to do that?',
    },
  },

  // ── 2 · Recap of 8.1 and 8.2 (one slide) ─────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Recap of spreads 8.1 and 8.2',
    title: 'What You Already Know',
    columns: [
      {
        heading: 'Breaking bonds — energy IN',
        accent: BLUE,
        icon: 'Unlink',
        content:
          'To break a bond, you pull two atoms apart. That **takes energy in**.\n\n' +
          'Bond breaking is **endothermic**.\n\n' +
          'If more energy goes in than comes out, the reaction is endothermic and $\\Delta H$ is **positive**.',
      },
      {
        heading: 'Making bonds — energy OUT',
        accent: RED,
        icon: 'Link',
        content:
          'When two atoms join to make a bond, energy is **given out**.\n\n' +
          'Bond making is **exothermic**.\n\n' +
          'If more energy comes out than goes in, the reaction is exothermic and $\\Delta H$ is **negative**.',
      },
    ],
    check: {
      id: 'c1',
      q: 'During any chemical reaction, what happens to the bonds?',
      options: [
        { val: 'A', text: 'New bonds are made first, then the old bonds break' },
        { val: 'B', text: 'Bonds in the reactants are broken (energy in), then new bonds are made (energy out)' },
        { val: 'C', text: 'Bonds are only made — nothing needs to break' },
      ],
      correct: 'B',
      expEn: 'The atoms in the reactants must come apart before they can join up in a new way. So bonds are broken first (energy in), then new bonds are made (energy out).',
    },
  },

  // ── 3 · Ask before you tell ──────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'No numbers yet — just predict',
    title: 'Which Total Is Bigger?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A mixture of **hydrogen** and **chlorine** gas explodes when sunlight hits it. The reaction breaks **H–H** and **Cl–Cl** bonds, then makes **H–Cl** bonds.',
    sub: 'Which is bigger: the energy taken in to break the bonds, or the energy given out when the new bonds form?',
    activity: {
      id: 'a1', type: 'predict',
      prompt: 'Hydrogen and chlorine explode in sunlight. Which is bigger?',
      options: [
        { val: 'in', name: 'The energy taken IN to break the bonds' },
        { val: 'out', name: 'The energy given OUT when the new bonds form' },
        { val: 'same', name: 'They are exactly the same' },
      ],
      correct: 'out',
      explain: 'An explosion gives out a lot of heat, so more energy must come **out** than goes **in**. In a few slides you will prove it with numbers: **678 kJ in**, **862 kJ out**.',
    },
  },

  // ── 4 · The unit of energy ───────────────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'Hash',
    eyebrow: 'The unit of energy',
    title: 'Joules, Kilojoules and Kilojoules per Mole',
    content:
      'Energy is measured in **joules**, symbol **J**. One joule is very small, and a reaction moves thousands of them, so we usually use the **kilojoule**:\n\n' +
      '> $1\\text{ kJ} = 1000\\text{ J}$\n\n' +
      'To change kJ into J, **multiply by 1000**. To change J into kJ, **divide by 1000**.\n\n' +
      'Energy changes in reactions are given **per mole**: **kilojoules per mole**, written **kJ/mol**. A mole is always the same number of particles, so values per mole are fair to compare.',
    notes: [
      {
        tone: 'write',
        text: '**Joule (J):** the unit of energy. **1 kJ = 1000 J.** Energy changes in reactions are given in **kilojoules per mole (kJ/mol)**.',
      },
    ],
    check: {
      id: 'c2',
      q: 'A reaction gives out 6500 J. How many kilojoules is that?',
      options: [
        { val: 'A', text: '6 500 000 kJ' },
        { val: 'B', text: '65 kJ' },
        { val: 'C', text: '6.5 kJ' },
      ],
      correct: 'C',
      expEn: 'J to kJ: divide by 1000. 6500 ÷ 1000 = 6.5 kJ. Answer A multiplied instead of dividing; answer B divided by 100.',
    },
  },

  // ── 5 · Bond energy, defined ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Extended · The key definition',
    title: 'What Is Bond Energy?',
    content:
      'Breaking a bond takes energy in. Making the **same** bond gives out **exactly the same** amount of energy. That amount is the **bond energy**.\n\n' +
      'Example: **242 kJ** must be supplied to break the Cl–Cl bonds in **one mole** of chlorine molecules, giving chlorine atoms. If those atoms join up again to make chlorine molecules, **242 kJ** is given out.\n\n' +
      'Scientists have measured the bond energy of every kind of bond by experiment.',
    notes: [
      {
        tone: 'write',
        text: '**Bond energy:** the energy needed to break one mole of a bond, or released when one mole of the same bond forms. It is given in **kJ/mol**.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Breaking one mole of H–H bonds needs 436 kJ. What happens when one mole of H–H bonds forms?',
      options: [
        { val: 'A', text: '436 kJ is given out' },
        { val: 'B', text: '436 kJ is taken in' },
        { val: 'C', text: '218 kJ is given out — half the value' },
      ],
      correct: 'A',
      expEn: 'The same bond, the same amount of energy — only the direction changes. Breaking takes 436 kJ in; making gives 436 kJ out.',
    },
  },

  // ── 6 · Reading the table ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'Extended · Reading the data',
    title: 'The Bond Energy Table',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.BOND_TABLE,
    content:
      'You do **not** need to learn these numbers — an exam question gives them to you. You need to **read** them.\n\n' +
      'Find the bond. The number beside it is the energy for **one mole** of that bond, in kJ/mol.\n\n' +
      'A **bigger** number means a **stronger** bond: it is harder to break, and it gives out more energy when it forms.',
    activity: {
      id: 'a2', type: 'order',
      prompt: 'Use the table. Put these bonds in order, from the WEAKEST (easiest to break) to the STRONGEST.',
      steps: [
        { id: 'clcl', name: 'Cl–Cl' },
        { id: 'cc', name: 'C–C' },
        { id: 'hh', name: 'H–H' },
        { id: 'oh', name: 'O–H' },
        { id: 'nn', name: 'N≡N' },
      ],
      explain: 'Cl–Cl **242** → C–C **346** → H–H **436** → O–H **464** → N≡N **946**. The triple bond in nitrogen is by far the strongest. Remember it — it comes back at the end.',
    },
  },

  // ── 7 · The English of "in" and "out" ────────────────────────────────────
  {
    layout: 'stack',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Many Ways to Say In and Out',
    content:
      'Exam questions use many different words for the **same two ideas**. The verb changes; the direction does not.\n\n' +
      'So ask one question every time: is the energy going **into** the chemicals, or coming **out** of them?',
    notes: [
      {
        tone: 'write',
        text: '**Energy IN:** taken in, absorbed, supplied, needed, required. **Energy OUT:** given out, released, given off, transferred to the surroundings.',
      },
    ],
    activity: {
      id: 'a3', type: 'sort',
      prompt: 'Sort each phrase: is the energy going IN or coming OUT?',
      bins: [
        { id: 'in', name: 'Energy IN' },
        { id: 'out', name: 'Energy OUT' },
      ],
      cards: [
        { id: 'required', name: 'the energy required to break the bonds', bin: 'in' },
        { id: 'released', name: 'the energy released as the bonds form', bin: 'out' },
        { id: 'absorbed', name: 'energy is absorbed from the surroundings', bin: 'in' },
        { id: 'supplied', name: '242 kJ must be supplied', bin: 'in' },
        { id: 'givenoff', name: 'heat is given off', bin: 'out' },
        { id: 'transferred', name: 'energy is transferred to the surroundings', bin: 'out' },
      ],
      explain: '**Required, absorbed, supplied** — energy goes IN. **Released, given off, transferred to the surroundings** — energy comes OUT. Breaking bonds always goes with the first family; making bonds with the second.',
    },
  },

  // ── 8 · The equation ─────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'Sigma',
    eyebrow: 'Extended · The equation',
    title: 'Energy In Minus Energy Out',
    content:
      'A reaction does two jobs, **in this order**: first the bonds in the reactants are **broken**, then the new bonds in the products are **made**.\n\n' +
      'The calculation follows the reaction, so **energy in comes first**:\n\n' +
      '> $\\Delta H = \\text{energy in} - \\text{energy out}$\n\n' +
      '$\\Delta H$ (say "delta H") is the **enthalpy change** for the reaction.',
    notes: [
      {
        tone: 'write',
        text: '**Enthalpy change:** ΔH = energy in (for bond breaking) − energy out (from bond making).',
      },
    ],
    check: {
      id: 'c4',
      q: 'For one reaction, energy in = 900 kJ and energy out = 700 kJ. Which calculation gives the enthalpy change?',
      options: [
        { val: 'A', text: '700 − 900' },
        { val: 'B', text: '900 + 700' },
        { val: 'C', text: '900 − 700' },
      ],
      correct: 'C',
      expEn: 'Energy in comes first: ΔH = 900 − 700 = +200 kJ. Swapping them (A) flips the sign. Adding them (B) is never right — the two totals work against each other.',
    },
  },

  // ── 9 · Step 1: show all the bonds ───────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Step 1 · Show all the bonds',
    title: 'Draw Every Bond as a Line',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.SHOW_BONDS_HCL,
    drawThis: true,
    content:
      'A normal formula hides the bonds. A **displayed formula** shows them: every atom is a symbol, and every bond is a **line** between two atoms.\n\n' +
      '$\\text{H}_2$ becomes H–H. $\\text{Cl}_2$ becomes Cl–Cl. HCl becomes H–Cl.\n\n' +
      'Now you can **see** which bonds break (blue) and which bonds form (red).',
    notes: [
      {
        tone: 'write',
        text: '**Displayed formula:** a formula that shows every atom and every bond. Each line is one bond.',
      },
    ],
    check: {
      id: 'c5',
      q: 'In ethane, $\\text{C}_2\\text{H}_6$, the two carbon atoms are joined to each other, and each carbon also holds three hydrogen atoms. Which bonds does one ethane molecule have?',
      options: [
        { val: 'A', text: '6 C–H bonds only' },
        { val: 'B', text: '1 C–C bond and 6 C–H bonds' },
        { val: 'C', text: '2 C–C bonds and 6 C–H bonds' },
      ],
      correct: 'B',
      expEn: 'Draw it: H₃C–CH₃. One line joins the two carbons (1 C–C), and each carbon has three lines to hydrogen (3 + 3 = 6 C–H). Answer A forgot the bond between the carbons.',
    },
  },

  // ── 10 · Step 2: count, with the coefficient ─────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Hash',
    eyebrow: 'Step 2 · Count the bonds',
    title: 'The Big Number Counts Too',
    ratio: 42,
    side: 'left',
    inlineSvg: DIAGRAMS.SHOW_BONDS_NH3,
    drawThis: true,
    content:
      'The **coefficient** — the big number in front of a formula — tells you how many molecules there are. **Every** one of them has its own bonds.\n\n' +
      'One ammonia molecule has **3** N–H bonds. In $2\\text{NH}_3$ there are **two** molecules, so 2 × 3 = **6** N–H bonds are broken.\n\n' +
      'In $3\\text{H}_2$ there are three molecules, so there are **3** H–H bonds.',
    notes: [
      {
        tone: 'write',
        text: '**Number of bonds** = bonds in one molecule × the coefficient in front of it.',
      },
    ],
    check: {
      id: 'c6',
      q: 'How many O–H bonds are broken in $3\\text{H}_2\\text{O}$? (One water molecule is H–O–H.)',
      options: [
        { val: 'A', text: '6' },
        { val: 'B', text: '2' },
        { val: 'C', text: '3' },
      ],
      correct: 'A',
      expEn: 'One water molecule has 2 O–H bonds. There are 3 molecules, so 3 × 2 = 6. Answer B forgot the coefficient; answer C counted molecules, not bonds.',
    },
  },

  // ── 11 · Double and triple bonds are one entry each ──────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'AlertTriangle',
    eyebrow: 'Step 2 · A common mistake',
    title: 'A Double Bond Is One Entry in the Table',
    content:
      'O=O is a **double bond**. N≡N is a **triple bond**. Each one is still **one bond** in the table, with its **own** value, measured whole.\n\n' +
      '> O=O: use **498** once for each $\\text{O}_2$ molecule.\n' +
      '> N≡N: use **946** once for each $\\text{N}_2$ molecule.\n\n' +
      'Do not split a double bond into two single bonds. Just look it up.',
    check: {
      id: 'c7',
      q: 'Oxygen, $\\text{O}_2$, is drawn O=O. How do you use its bond in a calculation?',
      options: [
        { val: 'A', text: 'Count it as two separate O–O bonds' },
        { val: 'B', text: 'Use the O=O value, 498 kJ/mol, once for each O₂ molecule' },
        { val: 'C', text: 'Use the O–H value, 464 kJ/mol' },
      ],
      correct: 'B',
      expEn: 'O=O has its own entry in the table: 498 kJ/mol for the whole double bond. Use it once per O₂ molecule (times the coefficient, as always). O–H (answer C) is a different bond.',
    },
  },

  // ── 12 · Worked example 1: energy in ─────────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Unlink',
    eyebrow: 'Worked example 1 · Hydrogen and chlorine',
    title: 'Energy In: Break the Reactant Bonds',
    content:
      '> $\\text{H}_2 + \\text{Cl}_2 \\rightarrow 2\\text{HCl}$\n\n' +
      'With every bond shown: **H–H + Cl–Cl → 2 H–Cl**.',
    steps: [
      { text: 'List every bond **broken** in the reactants: **1 × H–H** and **1 × Cl–Cl**.' },
      { text: 'Look up each one in the table: H–H = **436** kJ/mol, Cl–Cl = **242** kJ/mol.' },
      { text: 'Multiply each value by how many of that bond there are. Here there is just 1 of each.' },
      { text: 'Add them up: 436 + 242 = **678 kJ**. This is the **energy in**.' },
    ],
  },

  // ── 13 · Worked example 1: energy out ────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'Link',
    eyebrow: 'Worked example 1 · Hydrogen and chlorine',
    title: 'Energy Out: Make the Product Bonds',
    content:
      'Now the products. The equation makes $2\\text{HCl}$ — **two** molecules, and each one has **one** H–Cl bond.\n\n' +
      'The table gives H–Cl = **431 kJ/mol**.\n\n' +
      '> Energy out = number of bonds made × bond energy\n\n' +
      'Work it out yourself before you choose.',
    check: {
      id: 'c8',
      q: 'What is the energy out when the bonds in $2\\text{HCl}$ form?',
      options: [
        { val: 'A', text: '431 kJ' },
        { val: 'B', text: '862 kJ' },
        { val: 'C', text: '216 kJ' },
      ],
      correct: 'B',
      expEn: 'Two H–Cl bonds form: 2 × 431 = 862 kJ. Answer A forgot the 2 in front of HCl. Answer C halved the value instead of doubling it.',
    },
  },

  // ── 14 · Worked example 1: subtract, and the energy diagram ──────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AreaChart',
    eyebrow: 'Worked example 1 · Subtract',
    title: 'In Minus Out Gives the Answer',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.LEDGER_EXO,
    drawThis: true,
    content:
      '> $\\Delta H = 678 - 862 = -184\\text{ kJ}$\n\n' +
      'The answer is **negative**, so the reaction is **exothermic**: 184 kJ is given out when **1 mole** of hydrogen reacts with **1 mole** of chlorine.\n\n' +
      'The diagram shows the same sum. The blue arrow goes **up** to the top level, where **every bond is broken** and there are only separate atoms. The red arrow comes **down** as the new bonds form — and it is **longer**, so the products end **below** the reactants.',
    notes: [
      {
        tone: 'write',
        text: '**The bond energy diagram:** reactants → up arrow (energy in) to the **bonds broken** level (separate atoms) → down arrow (energy out) to the products. ΔH is the gap between reactants and products.',
      },
    ],
    check: {
      id: 'c9',
      q: 'On this diagram, why do the products end BELOW the reactants?',
      options: [
        { val: 'A', text: 'Because the energy-out arrow (862 kJ) is longer than the energy-in arrow (678 kJ)' },
        { val: 'B', text: 'Because the energy-in arrow is longer than the energy-out arrow' },
        { val: 'C', text: 'Because hydrogen chloride is a gas' },
      ],
      correct: 'A',
      expEn: 'The line goes up 678 kJ, then comes down 862 kJ. It comes down 184 kJ further than it went up, so the products finish 184 kJ below the reactants: ΔH = −184 kJ.',
    },
  },

  // ── 15 · Step 5: the sign ────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowUpDown',
    eyebrow: 'Step 5 · Read the sign',
    title: 'What the Sign Tells You',
    columns: [
      {
        heading: 'Minus — exothermic',
        accent: RED,
        icon: 'Flame',
        content:
          'Energy out is **bigger** than energy in.\n\n' +
          'The reaction **gives out** energy to the surroundings, which get warmer.\n\n' +
          'Example: hydrogen + chlorine, $\\Delta H = -184\\text{ kJ}$.',
        notes: [
          { tone: 'write', text: '**Minus sign** (ΔH negative): energy out > energy in. The reaction is **exothermic**.' },
        ],
      },
      {
        heading: 'Plus — endothermic',
        accent: BLUE,
        icon: 'Snowflake',
        content:
          'Energy in is **bigger** than energy out.\n\n' +
          'The reaction **takes in** energy from the surroundings, which get cooler.\n\n' +
          'Always write the **+** sign: $\\Delta H = +92\\text{ kJ}$, not just 92.',
        notes: [
          { tone: 'write', text: '**Plus sign** (ΔH positive): energy in > energy out. The reaction is **endothermic**.' },
        ],
      },
    ],
    check: {
      id: 'c10',
      q: 'A student finds energy in = 1500 kJ and energy out = 1420 kJ. What is the enthalpy change?',
      options: [
        { val: 'A', text: '−80 kJ, exothermic' },
        { val: 'B', text: '+2920 kJ, endothermic' },
        { val: 'C', text: '+80 kJ, endothermic' },
      ],
      correct: 'C',
      expEn: 'ΔH = in − out = 1500 − 1420 = +80 kJ. More energy went in than came out, so it is endothermic. Answer A did out − in; answer B added the two totals.',
    },
  },

  // ── 16 · Worked example 2: energy in, with an estimate ───────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Unlink',
    eyebrow: 'Worked example 2 · Decomposing ammonia',
    title: 'Energy In for Ammonia',
    content:
      '> $2\\text{NH}_3 \\rightarrow \\text{N}_2 + 3\\text{H}_2$\n\n' +
      'Ammonia breaks down when it is heated strongly. Same method, same order.',
    steps: [
      { text: 'Show all the bonds: each ammonia molecule has **3 N–H** bonds.' },
      { text: 'Count them, with the coefficient: 2 × 3 = **6 N–H** bonds are broken.' },
      { text: 'Look up N–H in the table: **391 kJ/mol**.' },
      { text: 'Estimate first: 6 × 391 is about 6 × 400 = **2400**. Then work it out exactly.' },
    ],
    activity: {
      id: 'a4', type: 'estimate',
      prompt: 'Energy in = 6 × 391 kJ. Slide to your answer.',
      min: 1000, max: 4000, step: 2, unit: 'kJ', answer: 2346, tolerance: 0.05,
      explain: '6 × 391 = **2346 kJ**. The estimate of 2400 was close — that is how you know the exact answer is sensible. Always estimate before you trust a calculator.',
    },
  },

  // ── 17 · Worked example 2: energy out and subtract ───────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'AreaChart',
    eyebrow: 'Worked example 2 · Energy out, then subtract',
    title: 'The Answer Comes Out Positive',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.LEDGER_ENDO,
    drawThis: true,
    content:
      'Bonds **made** in the products — four moles of bonds:\n\n' +
      '> 1 × N≡N = **946 kJ**\n' +
      '> 3 × H–H = 3 × 436 = **1308 kJ**\n' +
      '> Energy out = 946 + 1308 = **2254 kJ**\n\n' +
      '$\\Delta H = 2346 - 2254 = +92\\text{ kJ}$\n\n' +
      'The **plus** sign shows the reaction is **endothermic**: 92 kJ is taken in to decompose **2 moles** of ammonia. On the diagram, the products end **above** the reactants.',
    check: {
      id: 'c11',
      q: 'The +92 kJ is for 2 moles of ammonia, as written in the equation. How much energy is taken in to decompose 1 mole of ammonia?',
      options: [
        { val: 'A', text: '184 kJ' },
        { val: 'B', text: '46 kJ' },
        { val: 'C', text: '92 kJ' },
      ],
      correct: 'B',
      expEn: 'The equation decomposes 2 moles. Half as much ammonia needs half as much energy: 92 ÷ 2 = 46 kJ. Answer A doubled instead of halving.',
    },
  },

  // ── 18 · The whole method, in order ──────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'ListChecks',
    eyebrow: 'Put it together',
    title: 'One Method, Six Steps, One Order',
    content:
      'Every bond-energy question uses the **same six steps**, always in the **same order**. The Bond Ledger task walks you through them one at a time.\n\n' +
      'Put them in order before you move on.',
    activity: {
      id: 'a5', type: 'order',
      prompt: 'Put the six steps of the method in order.',
      steps: [
        { id: 's1', name: 'Write the equation with every bond shown' },
        { id: 's2', name: 'Count each type of bond broken — remember the coefficient' },
        { id: 's3', name: 'Multiply by the bond energies and add: energy in' },
        { id: 's4', name: 'Do the same for the bonds made: energy out' },
        { id: 's5', name: 'Subtract: ΔH = energy in − energy out' },
        { id: 's6', name: 'Read the sign: minus is exothermic, plus is endothermic' },
      ],
      explain: 'Show the bonds → count them → **energy in** → **energy out** → **in − out** → read the **sign**. Energy in always comes first, because bonds are always broken first.',
    },
  },

  // ── 19 · Why nitrogen is inert ───────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'ShieldCheck',
    eyebrow: 'Extended · Why nitrogen is inert',
    title: 'The Strongest Bond in the Table',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.TRIPLE_BOND,
    content:
      'Look at the table again. **N≡N**, the triple bond in a nitrogen molecule, has a bond energy of **946 kJ/mol** — the biggest number there.\n\n' +
      'Before nitrogen can react, that bond must be **broken**, and that needs a very large amount of energy **in**. So nitrogen hardly reacts at all. We say it is **unreactive**, or **inert**.\n\n' +
      'That is why bags of snacks are filled with nitrogen: it does not react with the food, so the food stays fresh.',
    notes: [
      {
        tone: 'write',
        text: '**Nitrogen is inert** because the N≡N triple bond is very strong (946 kJ/mol): a lot of energy must be taken in to break it.',
      },
    ],
    check: {
      id: 'c12',
      q: 'Which is the best reason that nitrogen gas, $\\text{N}_2$, is so unreactive?',
      options: [
        { val: 'A', text: 'Its N≡N triple bond needs a very large energy in (946 kJ/mol) to break' },
        { val: 'B', text: 'Nitrogen molecules have no bonds at all' },
        { val: 'C', text: 'Making an N≡N bond takes in a lot of energy' },
      ],
      correct: 'A',
      expEn: 'Nitrogen has to break its N≡N bond before it can react, and that bond has the highest bond energy in the table. Making a bond never takes energy in — it gives energy out (answer C).',
    },
  },

  // ── 20 · Countable recap ─────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you finish',
    title: 'Can You Do All Nine?',
    content:
      '> Your notebook should now have **10 copy-down notes**, **2 worked examples**, and **2 energy diagrams** with the bonds-broken level at the top.',
    items: [
      { text: 'State the unit of energy, and change **kJ into J** and back.' },
      { text: 'Define **bond energy**, and give its unit, **kJ/mol**.' },
      { text: 'Read a value from the **bond energy table**, and say which bond is stronger.' },
      { text: 'Write an equation as **displayed formulae**, showing every bond.' },
      { text: 'Count the bonds, remembering the **coefficient**.' },
      { text: 'Work out **energy in** and **energy out**, then **ΔH = energy in − energy out**.' },
      { text: 'Say what a **minus** and a **plus** sign mean.' },
      { text: 'Draw the energy diagram with the **bonds broken** level at the top.' },
      { text: 'Explain why **nitrogen is inert**, using its bond energy.' },
    ],
    check: {
      id: 'c13',
      q: '$\\text{H}_2 + \\text{Cl}_2 \\rightarrow 2\\text{HCl}$ has ΔH = −184 kJ. What is ΔH for the reverse reaction, $2\\text{HCl} \\rightarrow \\text{H}_2 + \\text{Cl}_2$?',
      options: [
        { val: 'A', text: '−184 kJ' },
        { val: 'B', text: '0 kJ' },
        { val: 'C', text: '+184 kJ' },
      ],
      correct: 'C',
      expEn: 'Run it backwards and the jobs swap: now the two H–Cl bonds are broken (energy in = 862 kJ) and H–H and Cl–Cl are made (energy out = 678 kJ). ΔH = 862 − 678 = +184 kJ — the same size, the opposite sign.',
    },
  },
];
