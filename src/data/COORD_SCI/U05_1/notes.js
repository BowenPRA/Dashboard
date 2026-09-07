// src/data/COORD_SCI/U05_1/notes.js
// C5.01 Exothermic and endothermic reactions — the second unit of the IGCSE
// Coordinated Science track, built from the Cambridge coursebook section in
// docs/coord-science/sources. English-only (this track is not bilingual), so
// there are no `vn*` twins.
//
// The deck's spine is the same one the coursebook uses: FEEL it (hot tube, cold
// tube) → DRAW it (energy level diagram) → NAME it (ΔH) → EXPLAIN it (bonds
// broken vs bonds made) → and only then the hump (activation energy). Each idea
// arrives because the previous one left a hole.
//
// The `check:` block is ALWAYS the LAST key on its slide — the audio generator
// narrates every field before it and stops there. Chemical equations are KaTeX
// ($…$) with \text{} keeping element symbols upright.
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
    icon: 'Flame',
    brand: 'IGCSE Coordinated Science',
    eyebrow: 'C5.01 Exothermic and endothermic reactions',
    title: 'Reactions That Give Out Heat — and Ones That Take It In',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'A **hand warmer** you snap gets hot enough to hold on a cold morning. An **instant cold pack** from a first-aid kit gets icy in seconds. Both are chemical reactions in a plastic bag. In one sentence — where do you think the **heat** is coming from, and where is it **going**?',
    },
  },

  // ── 2 · Why a reaction changes the temperature at all ───────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Zap',
    title: 'Every Reaction Moves Energy',
    ratio: 45,
    inlineSvg: DIAGRAMS.MEXOBENDO,
    content:
      'In a chemical reaction, the **bonds change**: old ones come apart and new ones form. Because of that, the **chemical energy** stored in the substances changes too — and the difference has to go somewhere.\n\n' +
      'You usually notice it as a **heat change** — the reaction feels **warmer** or **cooler**. Sometimes you see **light** (magnesium burning) or hear **sound** (an explosion) instead.',
    notes: [
      {
        tone: 'write',
        text: 'Energy is transferred during a reaction because the **chemical bonds change**. It is most often observed as a **heat change**.',
      },
    ],
    check: {
      id: 'c1',
      q: 'Why does a chemical reaction change the temperature?',
      options: [
        { val: 'A', text: 'Because the bonds change, so the chemical energy stored changes' },
        { val: 'B', text: 'Because the substances are always heated with a Bunsen burner first' },
        { val: 'C', text: 'Because mixing anything together always makes friction' },
      ],
      correct: 'A',
      expEn: 'Breaking and making bonds changes the chemical energy of the system. That difference is transferred to or from the surroundings — usually as heat.',
    },
  },

  // ── 3 · The two words, and the memory trick ────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    title: 'Two Words, Two Directions',
    columns: [
      {
        heading: 'EXOthermic — heat EXits',
        accent: RED,
        icon: 'Flame',
        content:
          'The reaction **gives out** heat to the surroundings.\n\n' +
          'The surroundings **warm up**, so the mixture **feels hot**.\n\n' +
          'Examples: **combustion** (burning), adding **zinc to copper(II) sulfate**, neutralisation.',
        notes: [
          {
            tone: 'write',
            text: '**Exothermic:** a process that **releases** heat energy to the surroundings, so the temperature of the surroundings **rises**.',
          },
        ],
      },
      {
        heading: 'ENDOthermic — heat ENters',
        accent: BLUE,
        icon: 'Snowflake',
        content:
          'The reaction **takes in** heat from the surroundings.\n\n' +
          'The surroundings **cool down**, so the mixture **feels cold**.\n\n' +
          'Examples: **photosynthesis**, thermal decomposition, an instant cold pack.',
        notes: [
          {
            tone: 'write',
            text: '**Endothermic:** a process that **absorbs** heat energy from the surroundings, so the temperature of the surroundings **falls**.',
          },
        ],
      },
    ],
    check: {
      id: 'c2',
      q: 'A student mixes two liquids and the test tube goes cold. What kind of reaction is it?',
      options: [
        { val: 'A', text: 'Endothermic — it has taken heat in from the surroundings' },
        { val: 'B', text: 'Exothermic — it has given heat out' },
        { val: 'C', text: 'Neither — cold means no reaction happened' },
      ],
      correct: 'A',
      expEn: 'ENdothermic means heat ENters the reaction. The heat comes out of the surroundings, so the surroundings — including the tube you are holding — get colder.',
    },
  },

  // ── 4 · The picture: two test tubes ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'TestTube',
    eyebrow: 'What it looks like on the bench',
    title: 'The Hot Tube and the Cold Tube',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.HOT_COLD_TUBES,
    drawThis: true,
    content:
      'Notice which way the arrows point. In the **exothermic** tube, energy flows **outwards** in every direction. In the **endothermic** tube, energy is pulled **inwards** from everything around it.\n\n' +
      'The reaction is the **system**. Everything else is the **surroundings**.',
    notes: [
      {
        tone: 'write',
        text: '**System:** the reacting substances themselves. **Surroundings:** everything else that the energy can move to or from.',
      },
    ],
  },

  // ── 5 · What "the surroundings" actually means ─────────────────────────────
  {
    layout: 'stack',
    accent: PURPLE,
    icon: 'Thermometer',
    columns: 2,
    eyebrow: 'A detail the exam likes',
    title: 'What Counts as "the Surroundings"?',
    content:
      'When an exothermic reaction warms "the surroundings", that means **all** of this:\n\n' +
      '> • the reaction mixture in the test tube\n' +
      '> • the air around the test tube\n' +
      '> • the test tube itself\n' +
      '> • **the thermometer in the test tube**\n\n' +
      'That last one matters more than it looks. The thermometer does not sense heat from a distance — the reading rises because **thermal energy is transferred into the thermometer itself**.',
    check: {
      id: 'c3',
      q: 'Why does the thermometer reading rise during an exothermic reaction?',
      options: [
        { val: 'A', text: 'Thermal energy is transferred into the thermometer, which is part of the surroundings' },
        { val: 'B', text: 'The thermometer detects the heat from a distance without touching it' },
        { val: 'C', text: 'The glass of the thermometer reacts with the mixture' },
      ],
      correct: 'A',
      expEn: 'The thermometer is one of the surroundings. It reads a higher temperature because heat has actually moved into it — which is why it must be in the mixture, not above it.',
    },
  },

  // ── 6 · The bridge to diagrams ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'No answer yet — just predict',
    title: 'How Would You Draw This?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: '"Feels hot" and "feels cold" are fine in the lab, but an exam asks you to **draw** the energy change. If energy went **out** of the reaction — should the products end up **higher** or **lower** than the reactants?',
  },

  // ── 7 · What an energy level diagram shows ─────────────────────────────────
  {
    layout: 'steps',
    accent: INDIGO,
    icon: 'AreaChart',
    eyebrow: 'Also called a reaction pathway diagram',
    title: 'How to Read an Energy Level Diagram',
    content: '> Three things, every time. Get these and you can read any of them.',
    steps: [
      { text: 'The **vertical axis (y)** is the **energy** of the substances, in **kJ**.' },
      { text: 'The **horizontal axis (x)** is the **progress of reaction** — **reactants on the left**, **products on the right**.' },
      { text: 'An **arrow** between the two levels shows the energy change: **down** = given out, **up** = taken in.' },
    ],
    notes: [
      {
        tone: 'write',
        text: '**Energy level diagram** (reaction pathway diagram): energy on the y-axis, progress of reaction on the x-axis, and an arrow showing the energy change.',
      },
    ],
  },

  // ── 8 · The exothermic diagram ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Flame',
    eyebrow: 'The exothermic shape',
    title: 'Burning Methane',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.ENERGY_EXO,
    drawThis: true,
    content:
      'Methane is the main gas in natural gas. Burning it gives carbon dioxide and water vapour:\n\n' +
      '> $\\text{CH}_4(\\text{g}) + 2\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}) + 2\\text{H}_2\\text{O}(\\text{g})$\n\n' +
      'The reactants start **high**. The products end **low**. The energy that is missing has left the system as **heat** — which is exactly why methane is such a useful fuel.',
    notes: [
      {
        tone: 'write',
        text: 'For an **exothermic** reaction: the reactants are **higher** than the products, and the arrow points **down**.',
      },
    ],
    check: {
      id: 'c4',
      q: 'On an energy level diagram for an exothermic reaction, where is the products line?',
      options: [
        { val: 'A', text: 'Lower than the reactants line' },
        { val: 'B', text: 'Higher than the reactants line' },
        { val: 'C', text: 'At exactly the same height as the reactants line' },
      ],
      correct: 'A',
      expEn: 'Energy left the system as heat, so the products hold less than the reactants did — the line drops, and the arrow points down.',
    },
  },

  // ── 9 · The endothermic diagram ────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Snowflake',
    eyebrow: 'The endothermic shape',
    title: 'Nitrogen and Oxygen in a Car Engine',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.ENERGY_ENDO,
    drawThis: true,
    content:
      'Inside a hot engine, the nitrogen and oxygen of the air react to make nitrogen monoxide:\n\n' +
      '> $\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{NO}(\\text{g})$\n\n' +
      'This one is **endothermic**. The products end **higher** than the reactants: energy had to be **taken in** from the surroundings and is now stored in the NO.',
    notes: [
      {
        tone: 'write',
        text: 'For an **endothermic** reaction: the reactants are **lower** than the products, and the arrow points **up**.',
      },
    ],
    check: {
      id: 'c5',
      q: 'A diagram shows the products line drawn ABOVE the reactants line. What does that tell you?',
      options: [
        { val: 'A', text: 'The reaction is endothermic — energy was taken in' },
        { val: 'B', text: 'The reaction is exothermic — energy was given out' },
        { val: 'C', text: 'The diagram has been drawn the wrong way round' },
      ],
      correct: 'A',
      expEn: 'Products higher than reactants means the system gained energy, and it can only have come from the surroundings. That is endothermic.',
    },
  },

  // ── 10 · The worked example — drawing one yourself ─────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Worked example — magnesium burning in oxygen',
    title: 'Drawing One From Scratch',
    content: '> Magnesium burns with a brilliant white flame, giving off **heat and light** — so you already know it is exothermic.',
    steps: [
      { text: 'Write the **word equation**:  magnesium + oxygen → magnesium oxide.' },
      { text: 'Work out the formulae and **balance** it:  $2\\text{Mg} + \\text{O}_2 \\rightarrow 2\\text{MgO}$' },
      { text: 'Decide: released (**exothermic**) or absorbed (**endothermic**)? Heat and light are given out — **exothermic**.' },
      { text: 'Draw and **label the axes**: Energy / kJ up the side, Progress of reaction along the bottom.' },
      { text: 'Draw the **reactants** line on the left and label it $2\\text{Mg} + \\text{O}_2$.' },
      { text: 'Draw the arrow **downwards** (it is exothermic), then the **products** line at the bottom of it, labelled $2\\text{MgO}$.' },
    ],
  },

  // ── 11 · Enthalpy and ΔH ───────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'Sigma',
    eyebrow: 'Giving the arrow a name and a number',
    title: 'Enthalpy Change, $\\Delta H$',
    content:
      'The heat energy stored in a system is its **enthalpy**, $H$. The amount transferred during a reaction is the **enthalpy change**, $\\Delta H$ — the symbol $\\Delta$ (delta) just means "change in".\n\n' +
      'It is measured in **kilojoules (kJ)**, where $1\\text{ kJ} = 1000\\text{ J}$, and usually quoted **per mole**: kJ/mol.',
    notes: [
      {
        tone: 'write',
        text: '**Enthalpy ($H$):** the thermal energy content of a system. **Enthalpy change ($\\Delta H$):** the thermal energy transferred during a reaction, in kJ/mol.',
      },
    ],
  },

  // ── 12 · The sign of ΔH ────────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowUpDown',
    title: 'Why the Sign Makes Sense',
    columns: [
      {
        heading: 'Exothermic — $\\Delta H$ is negative',
        accent: RED,
        icon: 'TrendingDown',
        content:
          'Heat is **released** from the system, so the system **loses** enthalpy. Less than it started with means a **negative** change.\n\n' +
          'For burning methane:\n\n> $\\Delta H = -728\\text{ kJ/mol}$\n\nThat large negative number is exactly why methane is a good fuel.',
      },
      {
        heading: 'Endothermic — $\\Delta H$ is positive',
        accent: BLUE,
        icon: 'TrendingUp',
        content:
          'Heat is **taken in** by the system, so the system **gains** enthalpy. More than it started with means a **positive** change.\n\n' +
          'The arrow on the diagram and the sign of $\\Delta H$ always agree: **arrow down, minus; arrow up, plus**.',
      },
    ],
    check: {
      id: 'c6',
      q: 'A reaction has $\\Delta H = -180$ kJ/mol. What can you say about it?',
      options: [
        { val: 'A', text: 'It is exothermic — the system lost energy, so it gives heat out' },
        { val: 'B', text: 'It is endothermic — the minus sign means energy went in' },
        { val: 'C', text: 'It absorbs 180 kJ from the surroundings for every mole' },
      ],
      correct: 'A',
      expEn: 'A negative $\\Delta H$ means the enthalpy of the system fell — the energy left as heat. Negative always means exothermic.',
    },
  },

  // ── 13 · Bond breaking and bond making ─────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Unlink',
    eyebrow: 'The reason underneath all of it',
    title: 'Breaking Costs Energy, Making Pays It Back',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.MEXOBENDO,
    content:
      'A chemical bond is a **force of attraction**. Pulling atoms apart against that attraction **needs energy put in** — so **bond breaking is endothermic**.\n\n' +
      'When new bonds form, the atoms fall together and that energy is **given back out** — so **bond making is exothermic**.\n\n' +
      'The memory aid is **MEXOBENDO**: **M**aking = **EXO**, **B**reaking = **ENDO**.',
    notes: [
      {
        tone: 'write',
        text: '**Bond breaking** takes energy IN — endothermic. **Bond making** gives energy OUT — exothermic. (MEXOBENDO.)',
      },
    ],
    check: {
      id: 'c7',
      q: 'Is breaking a chemical bond endothermic or exothermic?',
      options: [
        { val: 'A', text: 'Endothermic — energy must be put in to pull the atoms apart' },
        { val: 'B', text: 'Exothermic — the bond releases its energy as it snaps' },
        { val: 'C', text: 'Neither — breaking a bond involves no energy at all' },
      ],
      correct: 'A',
      expEn: 'A bond is an attraction holding atoms together, so separating them costs energy: bond **B**reaking is **ENDO**thermic. Only bond making gives energy out.',
    },
  },

  // ── 14 · Which one wins — bond energy ──────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Scale',
    eyebrow: 'Every reaction does both — so which wins?',
    title: 'Comparing the Two Totals',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.BOND_ROLLERCOASTER,
    content:
      'Every reaction breaks bonds **and** makes them. Whether it ends up hot or cold is just which total is bigger.\n\n' +
      'Some bonds are stronger than others. A stronger bond has a higher **bond energy**: it takes more to break, and gives more out when it forms.\n\n' +
      '> **more energy out than in** → **exothermic**\n' +
      '> **more energy in than out** → **endothermic**',
    notes: [
      {
        tone: 'write',
        text: '**Bond energy:** the energy needed to break a bond (and released when it forms). If the bonds in the **products** are stronger than those in the reactants, the reaction is **exothermic**.',
      },
    ],
    check: {
      id: 'c8',
      q: 'In a reaction, the bonds made in the products are STRONGER than the bonds broken in the reactants. What follows?',
      options: [
        { val: 'A', text: 'More energy is given out than taken in, so the reaction is exothermic' },
        { val: 'B', text: 'More energy is taken in than given out, so it is endothermic' },
        { val: 'C', text: 'The two cancel exactly, so there is no temperature change' },
      ],
      correct: 'A',
      expEn: 'Stronger bonds release more energy when they form. If the products’ bonds beat the reactants’, the "out" total wins and the reaction is exothermic — which is the case for burning methane.',
    },
  },

  // ── 15 · Activation energy ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Mountain',
    eyebrow: 'The hump on the diagram',
    title: 'Activation Energy',
    ratio: 55,
    side: 'left',
    inlineSvg: DIAGRAMS.ACTIVATION_PAIR,
    drawThis: true,
    content:
      'Most reactions are exothermic, but very few start on their own. Natural gas does not ignite the moment it meets air — you need a **spark**.\n\n' +
      'That starting energy is the **activation energy, $E_a$**. It is needed because **bonds must be broken before any new ones can form**, and breaking is endothermic.\n\n' +
      'On the diagram it is the **hump**, measured **from the reactants line up to the peak** — never from the bottom of the axis.',
    notes: [
      {
        tone: 'write',
        text: '**Activation energy ($E_a$):** the minimum energy needed to start a reaction, by breaking the first bonds. On a diagram it is the height from the **reactants** line to the **peak**.',
      },
    ],
    check: {
      id: 'c9',
      q: 'On a reaction pathway diagram, the activation energy is measured from where to where?',
      options: [
        { val: 'A', text: 'From the reactants line up to the top of the peak' },
        { val: 'B', text: 'From the bottom of the y-axis up to the peak' },
        { val: 'C', text: 'From the reactants line down to the products line' },
      ],
      correct: 'A',
      expEn: 'The activation energy is the extra energy the reactants need to get over the barrier, so it is measured from the reactants line to the peak. Reactants down to products is $\\Delta H$, not $E_a$.',
    },
  },

  // ── 16 · Every reaction has one ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'A favourite exam question',
    title: 'Why Must Every Reaction Have an Activation Energy?',
    content:
      'Even a reaction that gives out a huge amount of heat has a hump — sometimes a tiny one, but always there.\n\n' +
      'The reason is the order of events: **bonds are always broken first, and breaking always costs energy**. So there is always a barrier to get over, however small.',
    check: {
      id: 'c10',
      q: 'Why does every chemical reaction have an activation energy, even a very exothermic one?',
      options: [
        { val: 'A', text: 'Because some bonds must always be broken before new ones can form, and breaking takes energy in' },
        { val: 'B', text: 'Because all reactions need to be heated with a Bunsen burner' },
        { val: 'C', text: 'Because the products are always higher in energy than the reactants' },
      ],
      correct: 'A',
      expEn: 'Bond breaking comes first and is endothermic, so there is always a barrier. In a very exothermic reaction the energy released as new bonds form then keeps the reaction going.',
    },
  },

  // ── 17 · Reading a diagram in one pass ─────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'Eye',
    eyebrow: 'Put it together',
    title: 'Three Questions to Ask Any Diagram',
    content:
      '> **1.** Is the products line **below** or **above** the reactants line? → exothermic or endothermic.\n' +
      '> **2.** Which way does the $\\Delta H$ arrow point? → **down = negative**, **up = positive**.\n' +
      '> **3.** How big is the hump above the **reactants** line? → the activation energy.\n\n' +
      'Answer those three and you have described the reaction completely.',
    check: {
      id: 'c11',
      q: 'A diagram shows the products BELOW the reactants, with a small hump in between. Describe the reaction.',
      options: [
        { val: 'A', text: 'Exothermic, $\\Delta H$ negative, with a low activation energy' },
        { val: 'B', text: 'Endothermic, $\\Delta H$ positive, with a low activation energy' },
        { val: 'C', text: 'Exothermic, $\\Delta H$ positive, with a high activation energy' },
      ],
      correct: 'A',
      expEn: 'Products below reactants means energy was given out: exothermic, so $\\Delta H$ is negative. A small hump means it needs only a little energy to get started.',
    },
  },

  // ── 18 · Recap ─────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Seven?',
    content:
      '> Your notebook should now have about **11 key words**, **3 equations**, and **2 labelled diagrams** (one exothermic, one endothermic).',
    items: [
      { text: 'Define **exothermic** and **endothermic**, and say what happens to the **surroundings**.' },
      { text: 'List what "the surroundings" includes — and why **the thermometer** matters.' },
      { text: 'Label the **axes** of an energy level diagram.' },
      { text: 'Draw the diagram for an exothermic **and** an endothermic reaction.' },
      { text: 'State the **sign of $\\Delta H$** for each, and give its units.' },
      { text: 'Say whether **bond breaking** and **bond making** take energy in or give it out.' },
      { text: 'Mark the **activation energy** on a diagram, and say why it is always there.' },
    ],
    check: {
      id: 'c12',
      q: 'Photosynthesis uses the energy in sunlight to turn carbon dioxide and water into carbohydrates. What kind of process is it?',
      options: [
        { val: 'A', text: 'Endothermic — it takes energy in from its surroundings' },
        { val: 'B', text: 'Exothermic — it gives energy out to its surroundings' },
        { val: 'C', text: 'Neither — light is not a form of energy' },
      ],
      correct: 'A',
      expEn: 'The plant absorbs energy from sunlight and stores it in the carbohydrates it builds. Energy goes IN, so photosynthesis is endothermic — one of the most important endothermic reactions on the planet.',
    },
  },
];
