// src/data/IGCSE_CHEM/M06_6/notes.js
// 6.6 Group 1: The Alkali Metals — book spread 12.2 "Group I: the alkali
// metals", with point 4 of 12.4 (why reactivity rises down Group I).
// English-only (this track is not bilingual), so there are no `vn*` twins.
//
// The deck's spine follows the spread: one slide of recap → who they are (tap
// them on the table) → one outer electron, so they react alike → not typical
// metals → the word TREND → melting points (estimate rubidium before the chart
// shows it) → density and the value that does not fit → stored under oil →
// lithium, sodium, potassium on water, each PREDICTED before it is shown → the
// products and the name "alkali" → chlorine and oxygen → reactivity increases
// down the group → EXTENDED: why so reactive (1+ ions), why reactivity rises
// (the outer electron is further out) → predict rubidium, then caesium → a
// countable recap that points at Group VII, where the trend runs the other way.
//
// Core vs Extended follows the Chapter 12 Checkup: "say why elements in a group
// react in a similar way" is CORE there, so slide 4 is not marked; "why so
// reactive, in terms of electron transfer" and "the trends in reactivity in
// terms of electron shells" are EXTENDED (slides 18–19).
//
// Every symbol equation the deck writes is the book's own example (sodium). The
// Equations task uses lithium, potassium, rubidium and caesium, and sodium only
// as its oxide, so the deck never gives a task item away.
//
// Sized for a 1280×720 laptop: one equation, two short paragraphs and one
// copy-down note per slide at most; wide diagrams get the wide column.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its slide
// — the audio generator narrates every field before it and stops there. Slide
// titles are read aloud, so they carry no bare symbols or formulae.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const ALKALI = '#4338ca';
const NEUTRAL = '#2f8f5b';
const SLATE = '#475569';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: ALKALI,
    icon: 'Zap',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.6 Group 1: the alkali metals',
    title: 'The Metals You Can Cut With a Knife',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Most metals are hard and heavy. Sodium is so soft you can cut it with a knife, and it floats on water. In one sentence — why do you think chemists keep sodium in a jar of **oil**?',
    },
  },

  // ── 2 · One-slide recap of 6.5 ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'LayoutGrid',
    eyebrow: 'Recap from topic 6.5',
    title: 'Groups, Periods and Outer Shells',
    content:
      '> • A **group** is a column. For Groups I to VII, the group number = the number of **outer-shell electrons**.\n' +
      '> • A **period** is a row. The period number = the number of **electron shells**.\n' +
      '> • Elements in a group react in a **similar way**, and show **trends**.\n\n' +
      'This topic is the first column: **Group I**.',
    check: {
      id: 'c1',
      q: 'Potassium is in Group I and Period 4. How many electron shells does a potassium atom have?',
      options: [
        { val: 'A', text: '1' },
        { val: 'B', text: '4' },
        { val: 'C', text: '19' },
      ],
      correct: 'B',
      expEn: 'The period number gives the number of shells: Period 4, four shells (2,8,8,1). The group number, I, gives the number of OUTER-shell electrons — one. 19 is the proton number.',
    },
  },

  // ── 3 · Meet the alkali metals ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Columns3',
    eyebrow: 'Book spread 12.2 · what are they?',
    title: 'Meet the Alkali Metals',
    content:
      'The **alkali metals** are the elements of **Group I**: lithium, sodium, potassium, rubidium, caesium and francium. They are **soft, silvery metals**.\n\n' +
      'Only the first three — **lithium, sodium and potassium** — are safe in the school lab. The others react violently, and francium is radioactive.',
    notes: [
      {
        tone: 'write',
        text: '**Alkali metals:** the elements of Group I. Their atoms have **1 outer-shell electron**.',
      },
    ],
    activity: {
      id: 'a1',
      type: 'periodic',
      prompt: 'Tap every alkali metal on this table.',
      query: { group: 1 },
      explain: 'Group I is the first column: **lithium (Li)**, **sodium (Na)** and **potassium (K)**. Rubidium and caesium are further down, below this 20-element table. Hydrogen sits on its own above the gap — it is not an alkali metal.',
    },
  },

  // ── 4 · One outer electron: why they react alike ───────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Atom',
    eyebrow: 'Book spread 12.2 · why they react alike',
    title: 'One Electron in the Outer Shell',
    ratio: 40,
    inlineSvg: DIAGRAMS.SHELLS,
    drawThis: true,
    content:
      'Each atom has **1 electron in its outer shell**. That is what puts it in Group I — and why the alkali metals all react alike.',
    notes: [
      {
        tone: 'write',
        text: '**Atoms with the same number of outer-shell electrons react in a similar way.**',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which electron arrangement belongs to an alkali metal atom?',
      options: [
        { val: 'A', text: '2,8,2' },
        { val: 'B', text: '2,8,7' },
        { val: 'C', text: '2,8,8,1' },
      ],
      correct: 'C',
      expEn: '2,8,8,1 ends with ONE outer-shell electron, so it is in Group I — it is potassium. 2,8,2 has two outer electrons (Group II) and 2,8,7 has seven (Group VII).',
    },
  },

  // ── 5 · Physical properties ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scissors',
    eyebrow: 'Book spread 12.2 · physical properties',
    title: 'Not Your Typical Metals',
    content:
      'Iron is hard, dense and melts at over 1500 °C. The alkali metals are the opposite:\n\n' +
      '> • **soft** — you can cut them with a knife\n' +
      '> • **low density** — lithium, sodium and potassium float\n' +
      '> • **low melting points**',
    notes: [
      {
        tone: 'write',
        text: '**The alkali metals** are soft, have a low density and have low melting points.',
      },
    ],
    activity: {
      id: 'a2',
      type: 'sort',
      prompt: 'Is each property true of the alkali metals, or of a typical metal like iron?',
      bins: [
        { id: 'alk', name: 'Alkali metals (lithium, sodium, potassium)' },
        { id: 'iron', name: 'Typical metals like iron' },
      ],
      cards: [
        { id: 'knife', name: 'Soft enough to cut with a knife', bin: 'alk' },
        { id: 'hard', name: 'Hard and strong', bin: 'iron' },
        { id: 'float', name: 'Floats on water', bin: 'alk' },
        { id: 'sink', name: 'Sinks in water', bin: 'iron' },
        { id: 'low', name: 'Melts below 200 °C', bin: 'alk' },
        { id: 'high', name: 'Melts above 1000 °C', bin: 'iron' },
      ],
      explain: 'Lithium, sodium and potassium are soft, light enough to float, and melt below 200 °C (lithium, the highest, at 181 °C). Iron is hard, dense enough to sink, and melts at over 1500 °C.',
    },
  },

  // ── 6 · English: the word "trend" ──────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'What Is a Trend?',
    content:
      '> **increases** = goes up · **decreases** = goes down · **does not fit** = breaks the pattern',
    notes: [
      {
        tone: 'write',
        text: '**Trend:** a gradual change in a property, in one direction, as you go down a group.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Which sentence describes a TREND?',
      options: [
        { val: 'A', text: 'Potassium has a density of 0.86 g/cm³.' },
        { val: 'B', text: 'Melting point decreases as you go down Group I.' },
        { val: 'C', text: 'Sodium is a soft, silvery metal.' },
      ],
      correct: 'B',
      expEn: 'A trend is a change in one direction across the whole group — "decreases as you go down". The other two sentences are true, but each is one fact about one element.',
    },
  },

  // ── 7 · Estimate rubidium's melting point ──────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Target',
    eyebrow: 'No answer yet — estimate',
    title: 'Where Does Rubidium Fit?',
    ratio: 40,
    inlineSvg: DIAGRAMS.MP_GAP,
    content:
      'The chart shows four melting points. **Rubidium**, between potassium and caesium, is hidden.\n\n' +
      'Follow the pattern of the bars, then make your estimate.',
    activity: {
      id: 'a3',
      type: 'estimate',
      prompt: 'Estimate the melting point of rubidium.',
      min: 0,
      max: 150,
      step: 1,
      unit: '°C',
      answer: 39,
      tolerance: 0.25,
      explain: 'Rubidium melts at **39 °C** — below potassium (63 °C) and above caesium (29 °C), just where the trend puts it. That is only a little warmer than a hot day.',
    },
  },

  // ── 8 · The trend in melting points ────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'TrendingUp',
    eyebrow: 'Book spread 12.2 · the data',
    title: 'The Trend in Melting Points',
    ratio: 40,
    inlineSvg: DIAGRAMS.MP_BARS,
    drawThis: true,
    content:
      'Every step down the group, the melting point is **lower**. No value breaks the pattern.',
    notes: [
      {
        tone: 'write',
        text: '**Melting point decreases** as you go down Group I.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Francium is below caesium in Group I. What does the trend predict for its melting point?',
      options: [
        { val: 'A', text: 'Higher than 181 °C, like lithium' },
        { val: 'B', text: 'Between 29 °C and 39 °C' },
        { val: 'C', text: 'Lower than 29 °C' },
      ],
      correct: 'C',
      expEn: 'Melting point decreases down the group, and francium is below caesium (29 °C), so it should melt below 29 °C. Between 29 and 39 °C is where caesium and rubidium are — above francium, not below it. Francium is so rare that chemists rely on the trend to predict it.',
    },
  },

  // ── 9 · Density, and the value that does not fit ────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Weight',
    eyebrow: 'About density',
    title: 'Density, and the Value That Does Not Fit',
    ratio: 50,
    inlineSvg: DIAGRAMS.DENSITY_TABLE,
    content:
      '> $\\text{density} = \\dfrac{\\text{mass in g}}{\\text{volume in cm}^3}$\n\n' +
      'Water is **1 g/cm³**: a solid less dense than water **floats**.',
    notes: [
      {
        tone: 'write',
        text: 'Density generally **increases** down Group I — potassium does not fit.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Which alkali metal would SINK if it were dropped into water?',
      options: [
        { val: 'A', text: 'Lithium' },
        { val: 'B', text: 'Potassium' },
        { val: 'C', text: 'Rubidium' },
      ],
      correct: 'C',
      expEn: 'Rubidium is 1.53 g/cm³ — denser than water (1.00 g/cm³), so it sinks. Lithium (0.53) and potassium (0.86) are less dense than water, so they float, even though potassium breaks the trend.',
    },
  },

  // ── 10 · Stored under oil ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'ShieldAlert',
    eyebrow: 'Book spread 12.2 · safety',
    title: 'Why They Are Kept Under Oil',
    ratio: 55,
    side: 'left',
    inlineSvg: DIAGRAMS.UNDER_OIL,
    content:
      'A freshly cut surface is **shiny**, but it soon goes **dull**: the metal reacts with **oxygen** and **water vapour** in the air.',
    notes: [
      {
        tone: 'write',
        text: '**Group I metals are stored under oil** to stop them reacting with oxygen and water.',
      },
    ],
    check: {
      id: 'c6',
      q: 'The shiny cut surface of a piece of sodium soon goes dull. Why?',
      options: [
        { val: 'A', text: 'It reacts with oxygen and water vapour in the air' },
        { val: 'B', text: 'It melts in the warm air of the room' },
        { val: 'C', text: 'The oil it was stored in dries on its surface' },
      ],
      correct: 'A',
      expEn: 'The fresh metal reacts straight away with the oxygen and water vapour in the air, and a dull layer forms. That is exactly why it is kept under oil. Sodium melts at 98 °C, far above room temperature.',
    },
  },

  // ── 11 · Predict: lithium meets water ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Lithium Meets Water',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A small piece of lithium is dropped into a trough of water. A few drops of universal indicator have made the water green.',
    activity: {
      id: 'a4',
      type: 'predict',
      prompt: 'What will you see?',
      options: [
        { val: 'sink', name: 'It sinks to the bottom and nothing happens' },
        { val: 'float', name: 'It floats, moves about and fizzes' },
        { val: 'bang', name: 'It explodes the moment it touches the water' },
        { val: 'fire', name: 'It floats and bursts into a lilac flame' },
      ],
      correct: 'float',
      explain: 'Lithium **floats** (its density is only 0.53 g/cm³), moves about on the surface and **fizzes** as a gas is given off. It is the least reactive alkali metal — no flame and no bang.',
    },
  },

  // ── 12 · Lithium on water; predict sodium ──────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Waves',
    eyebrow: 'Book spread 12.2 · reaction with water',
    title: 'What Lithium Does',
    ratio: 45,
    inlineSvg: DIAGRAMS.TROUGH,
    drawThis: true,
    content:
      'Lithium **floats**, moves about and **fizzes**. Around it the indicator turns **purple**: an **alkali** is forming.',
    notes: [
      {
        tone: 'write',
        text: '**Lithium + water:** floats and fizzes; the indicator turns purple.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'predict',
      prompt: 'Sodium is next — it is below lithium. Compared with lithium, how will sodium react with water?',
      options: [
        { val: 'slow', name: 'More slowly — its atoms are heavier' },
        { val: 'same', name: 'Exactly the same as lithium' },
        { val: 'fast', name: 'More vigorously than lithium' },
        { val: 'none', name: 'Not at all' },
      ],
      correct: 'fast',
      explain: 'Sodium reacts **more vigorously**. In Group I, reactivity **increases** as you go down. The next slide shows what that looks like.',
    },
  },

  // ── 13 · Sodium on water; predict potassium ────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Droplets',
    eyebrow: 'Reaction with water · sodium',
    title: 'What Sodium Does',
    content:
      'Sodium **melts into a silver ball**: the reaction gives out enough heat to melt it (it melts at 98 °C).\n\n' +
      'The ball **shoots across the water**, fizzing hard, and the indicator turns purple again.',
    notes: [
      {
        tone: 'write',
        text: '**Sodium + water:** it melts into a silver ball, shoots across the water and fizzes.',
      },
    ],
    activity: {
      id: 'a6',
      type: 'predict',
      prompt: 'Potassium is below sodium. What extra thing will you see?',
      options: [
        { val: 'none', name: 'Nothing extra — it just fizzes' },
        { val: 'sink', name: 'It sinks and slowly dissolves' },
        { val: 'fire', name: 'The gas catches fire, with a lilac flame' },
        { val: 'ice', name: 'The water around it freezes' },
      ],
      correct: 'fire',
      explain: 'Potassium is even more reactive. It melts and shoots across the water, and so much heat is given out that the gas **catches fire** — the potassium burns with a **lilac** flame.',
    },
  },

  // ── 14 · Potassium, and all three side by side ─────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Flame',
    eyebrow: 'Reaction with water · all three',
    title: 'Down the Group, Faster and Fiercer',
    ratio: 40,
    inlineSvg: DIAGRAMS.THREE_WATER,
    content:
      'With potassium the gas **catches fire**: a **lilac flame**. The same reaction each time — only the speed changes.',
    notes: [
      {
        tone: 'write',
        text: '**Reactivity increases** as you go down Group I.',
      },
    ],
    check: {
      id: 'c7',
      q: 'Which observation shows that potassium is MORE reactive than sodium?',
      options: [
        { val: 'A', text: 'It floats on the water' },
        { val: 'B', text: 'The indicator turns purple' },
        { val: 'C', text: 'So much heat is given out that the gas catches fire' },
      ],
      correct: 'C',
      expEn: 'All three metals float and all three turn the indicator purple, so those do not tell them apart. Only potassium gives out enough heat for the gas to catch fire — the sign of the fastest reaction.',
    },
  },

  // ── 15 · The products, and the name ────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Beaker',
    eyebrow: 'Book spread 12.2 · the products',
    title: 'A Hydroxide and Hydrogen',
    content:
      '> sodium + water → sodium hydroxide + hydrogen\n' +
      '> $2\\text{Na}(\\text{s}) + 2\\text{H}_2\\text{O}(\\text{l}) \\rightarrow 2\\text{NaOH}(\\text{aq}) + \\text{H}_2(\\text{g})$\n\n' +
      'The gas is **hydrogen**. The **hydroxide** is an **alkali**: it turns the indicator purple, and it gives the group its name.',
    notes: [
      {
        tone: 'write',
        text: '**alkali metal + water → metal hydroxide + hydrogen.** The hydroxide is an alkali.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Why are the Group I metals called the "alkali metals"?',
      options: [
        { val: 'A', text: 'They react with water to give hydroxides, which are alkalis' },
        { val: 'B', text: 'They are soft enough to cut with a knife' },
        { val: 'C', text: 'They react with alkalis to give hydrogen' },
      ],
      correct: 'A',
      expEn: 'With water, every alkali metal gives its hydroxide — lithium hydroxide, sodium hydroxide, potassium hydroxide — and these are alkalis. Being soft is true, but it is not where the name comes from.',
    },
  },

  // ── 16 · Chlorine and oxygen ───────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Flame',
    eyebrow: 'Book spread 12.2 · more reactions',
    title: 'Burning in Chlorine and in Oxygen',
    columns: [
      {
        heading: 'With chlorine: chlorides',
        accent: TEAL,
        icon: 'Flame',
        content: 'Heated, then plunged into a gas jar of chlorine, the metals **burn brightly**. Potassium burns most vigorously.\n\n> sodium + chlorine → sodium chloride',
        notes: [
          { tone: 'write', text: '**metal + chlorine → metal chloride**' },
        ],
      },
      {
        heading: 'With oxygen: oxides',
        accent: ALKALI,
        icon: 'Flame',
        content: 'In oxygen they **burn fiercely**. The oxides **dissolve in water** to give **alkaline** solutions.\n\n> sodium + oxygen → sodium oxide',
        notes: [
          { tone: 'write', text: '**metal + oxygen → metal oxide** — it dissolves to give an alkaline solution.' },
        ],
      },
    ],
    check: {
      id: 'c9',
      q: 'Lithium is heated and plunged into a gas jar of chlorine. What forms?',
      options: [
        { val: 'A', text: 'Lithium chloride, a white solid' },
        { val: 'B', text: 'Lithium hydroxide and hydrogen' },
        { val: 'C', text: 'Lithium oxide and chlorine' },
      ],
      correct: 'A',
      expEn: 'metal + chlorine → metal chloride, so lithium gives lithium chloride, a white solid. A hydroxide and hydrogen come only from water, and an oxide needs oxygen.',
    },
  },

  // ── 17 · The conclusion: reactivity increases down the group ───────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowDownUp',
    eyebrow: 'Book spread 12.2 · the conclusion',
    title: 'Reactivity Increases Down the Group',
    content:
      'With water, with chlorine and with oxygen, potassium reacts the most vigorously of the three, and lithium the least.\n\n' +
      '> **Reactivity increases as you go down Group I.**',
    activity: {
      id: 'a7',
      type: 'order',
      prompt: 'Put the five alkali metals in order of reactivity — the LEAST reactive first.',
      steps: [
        { id: 'li', name: 'lithium, Li' },
        { id: 'na', name: 'sodium, Na' },
        { id: 'k', name: 'potassium, K' },
        { id: 'rb', name: 'rubidium, Rb' },
        { id: 'cs', name: 'caesium, Cs' },
      ],
      explain: 'Reactivity increases down Group I, so the order of reactivity is the order of the group: lithium, sodium, potassium, rubidium, caesium. Caesium is the most reactive metal found in nature.',
    },
  },

  // ── 18 · EXTENDED: why so reactive ─────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Zap',
    eyebrow: 'Extended',
    title: 'Why They Are So Reactive',
    ratio: 45,
    inlineSvg: DIAGRAMS.ION_FORM,
    content:
      'They are the **most reactive metals**. Each atom only has to lose **one electron** to get a **full outer shell** — so it gives it up easily, and becomes a **1+ ion**.',
    notes: [
      {
        tone: 'write',
        text: '**1+ ions**: $\\text{Li}^{+}$, $\\text{Na}^{+}$, $\\text{K}^{+}$. Their compounds are **white solids**; their solutions are **colourless**.',
      },
    ],
    check: {
      id: 'c10',
      q: 'Why does a sodium atom form an ion with a charge of 1+?',
      options: [
        { val: 'A', text: 'It gains one electron to fill its outer shell' },
        { val: 'B', text: 'It loses its one outer electron, leaving a full outer shell' },
        { val: 'C', text: 'It loses one proton from its nucleus' },
      ],
      correct: 'B',
      expEn: 'Sodium (2,8,1) loses its single outer electron and is left as 2,8 — a full outer shell. It now has one more proton than electrons, so the charge is 1+. Gaining an electron would make it negative, and the nucleus never changes in a reaction.',
    },
  },

  // ── 19 · EXTENDED: why reactivity rises down the group ─────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Orbit',
    eyebrow: 'Extended',
    title: 'Why Reactivity Increases Down the Group',
    ratio: 42,
    inlineSvg: DIAGRAMS.SHELL_PULL,
    drawThis: true,
    content:
      'The positive **nucleus pulls** on the outer electron. Each extra shell puts it **further away**, so the pull is **weaker**.',
    notes: [
      {
        tone: 'write',
        text: 'Down Group I the outer electron is **further out**, so it is **lost more easily**.',
      },
    ],
    check: {
      id: 'c11',
      q: 'A caesium atom has six electron shells; a lithium atom has two. Why is caesium more reactive?',
      options: [
        { val: 'A', text: 'Caesium has more outer-shell electrons to lose' },
        { val: 'B', text: 'Its outer electron is further from the nucleus, so it is pulled less and lost more easily' },
        { val: 'C', text: 'Its nucleus has more protons, so it pulls the outer electron harder' },
      ],
      correct: 'B',
      expEn: 'Both atoms have just ONE outer electron, so it is not A. Caesium\'s nucleus does have more protons, but its extra shells put the outer electron much further out, so the pull on it is weaker and it is lost more easily.',
    },
  },

  // ── 20 · Predict: rubidium ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — predict from the trends',
    title: 'What Would Rubidium Do?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Rubidium is below potassium. Its density is 1.53 g/cm³. A tiny piece is dropped into water — by an expert, behind a safety screen.',
    activity: {
      id: 'a8',
      type: 'predict',
      prompt: 'Use two trends. What do you predict?',
      options: [
        { val: 'gentle', name: 'It floats and fizzes gently, like lithium' },
        { val: 'same', name: 'It floats and burns with a lilac flame, exactly like potassium' },
        { val: 'violent', name: 'It sinks, and reacts even more violently than potassium' },
        { val: 'none', name: 'It does not react — it is too dense' },
      ],
      correct: 'violent',
      explain: 'Two trends at once. Density: 1.53 g/cm³ is more than water, so it **sinks**. Reactivity increases down the group, so the reaction is **even more violent** than potassium\'s — it can explode. The products follow the family pattern: **rubidium hydroxide** and **hydrogen**.',
    },
  },

  // ── 21 · Predicting rubidium and caesium ───────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Sparkles',
    eyebrow: 'Using the trends',
    title: 'Predicting Rubidium and Caesium',
    content:
      '> rubidium + chlorine → rubidium chloride\n' +
      '> caesium + oxygen → caesium oxide\n\n' +
      'Same reactions, same kinds of product — only **faster and more violent** down the group.',
    notes: [
      {
        tone: 'write',
        text: '**To predict:** react it like sodium, but faster down the group.',
      },
    ],
    check: {
      id: 'c12',
      q: 'Caesium is dropped into water containing universal indicator. Which prediction is right?',
      options: [
        { val: 'A', text: 'Caesium hydroxide forms, so the indicator turns purple' },
        { val: 'B', text: 'Caesium oxide and oxygen form, and the indicator stays green' },
        { val: 'C', text: 'Caesium chloride forms, and the indicator turns red' },
      ],
      correct: 'A',
      expEn: 'Every alkali metal + water gives the metal hydroxide + hydrogen. Caesium hydroxide is an alkali, so the indicator turns purple — and the reaction is explosive. There is no chlorine here, and no oxygen gas is made.',
    },
  },

  // ── 22 · Countable recap, and what comes next ──────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: ORANGE,
    icon: 'CheckCircle2',
    columns: 3,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Six?',
    content: '> **16 notes**, **4 drawings**. Next, Group VII: reactivity **decreases** down the group — the opposite trend.',
    items: [
      { text: 'Say why they **react alike**.' },
      { text: 'Give 3 **properties**.' },
      { text: 'Describe a **trend**.' },
      { text: 'Say what you **see** on water.' },
      { text: 'Name the **products**.' },
      { text: 'Explain the **reactivity**.' },
    ],
    check: {
      id: 'c13',
      q: 'A metal X is soft, floats on water, fizzes in water, and turns universal indicator purple. It melts at 98 °C. What is X?',
      options: [
        { val: 'A', text: 'Lithium' },
        { val: 'B', text: 'Sodium' },
        { val: 'C', text: 'Calcium' },
      ],
      correct: 'B',
      expEn: 'Soft, floats, fizzes and makes an alkali: an alkali metal. The melting point picks out which one — sodium melts at 98 °C, lithium at 181 °C. Calcium is in Group II: it is harder and denser, and it sinks.',
    },
  },
];
