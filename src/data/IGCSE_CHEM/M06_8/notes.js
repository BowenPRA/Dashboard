// src/data/IGCSE_CHEM/M06_8/notes.js
// 6.8 Transition Elements — book spread 12.5 "The transition elements" (pages
// 154–155), read against 12.2 (Group I), the comparison the whole spread is
// built on. English-only (this track is not bilingual), so there are no `vn*`
// twins.
//
// The deck's spine follows the spread: a one-slide recap of Group I → where
// the block is → the ten to know → the physical properties, each against
// sodium (density PREDICTED before the data, then estimated from it; melting
// point; hard, strong, conductors) → the chemical properties (much less
// reactive, no clear trend, coloured compounds, catalysts) → alkali metal or
// transition element? → uses that follow from the properties → salts from the
// oxides and hydroxides → EXTENDED: ions with different charges, two oxides of
// copper and of iron, the Roman numeral as the oxidation number, both ways →
// and, because 6.8 is the LAST topic of Module 6 and the module ends in a
// multiple-choice quiz, a close that pulls the three families together:
// alkali metals vs halogens vs transition elements.
//
// The Formulae task (FORMULA_WRITE) uses the SAME words as slides 17–18: "the
// Roman numeral is the charge on the metal ion", "set the charges", "balance".
//
// Sized for a 1280×720 laptop: a split slide's text column is ~400px wide
// beside its diagram, so each slide carries one equation, two short paragraphs
// and one copy-down note at most.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its slide
// — the audio generator narrates every field before it and stops there. Slide
// titles are read aloud, so they carry no bare formulae, symbols or units.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const TRANS = '#0e7490';   // transition elements (as in the diagrams)
const AMBER = '#b45309';   // Group I, alkali metals
const SLATE = '#475569';   // Extended

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TRANS,
    icon: 'Building2',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.8 Transition elements',
    title: 'The Metals We Build With',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Bridges are built from **iron**. Wires are made of **copper**. **Sodium** is a metal too — but nobody has ever built a bridge from sodium. In one sentence: why not?',
    },
  },

  // ── 2 · One-slide recap of Group I ─────────────────────────────────────
  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Flame',
    eyebrow: 'Recap from topic 6.6',
    title: 'Group One, the Alkali Metals',
    content:
      '> • **Soft** — you can cut them with a knife.\n' +
      '> • **Low density** and **low melting points**.\n' +
      '> • **Very reactive**: they react vigorously with water. Reactivity **increases** down the group.\n' +
      '> • Their compounds are **white**, and their ions are always $\\text{1+}$.\n\n' +
      'Keep these in mind. Every property of the transition elements is compared with them.',
    check: {
      id: 'c1',
      q: 'Which description fits the Group I metals?',
      options: [
        { val: 'A', text: 'Hard, dense, and slow to react with water' },
        { val: 'B', text: 'Soft, low density, and react vigorously with water' },
        { val: 'C', text: 'Non-metals that form coloured compounds' },
      ],
      correct: 'B',
      expEn: 'The alkali metals are soft enough to cut, light (lithium, sodium and potassium float on water), and they fizz as they react with it. The transition elements are the opposite on every count.',
    },
  },

  // ── 3 · Where the block is ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: TRANS,
    icon: 'LayoutGrid',
    eyebrow: 'Book spread 12.5 · what are they?',
    title: 'Where the Transition Elements Are',
    ratio: 40,
    inlineSvg: DIAGRAMS.TABLE_BLOCK,
    drawThis: true,
    content:
      'The **transition elements** are the large block in the **middle** of the Periodic Table, between Group II and Group III. The block starts in Period 4.\n\n' +
      'They are **all metals** — and most of the metals we use every day.',
    notes: [
      {
        tone: 'write',
        text: '**Transition elements:** the block of metals in the middle of the Periodic Table, between Group II and Group III.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which statement about the transition elements is correct?',
      options: [
        { val: 'A', text: 'They are all metals, in the block between Group II and Group III' },
        { val: 'B', text: 'They are the elements to the right of the zig-zag line' },
        { val: 'C', text: 'They are a mixture of metals and non-metals' },
      ],
      correct: 'A',
      expEn: 'Every transition element is a metal, and they sit together in the middle block. The elements to the right of the zig-zag line are the non-metals.',
    },
  },

  // ── 4 · The ten to know ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TRANS,
    icon: 'Boxes',
    eyebrow: 'Ten transition elements',
    title: 'Ten to Know by Name',
    ratio: 38,
    inlineSvg: DIAGRAMS.TEN_TILES,
    content:
      '**iron** Fe · **copper** Cu · **nickel** Ni · **zinc** Zn · **silver** Ag\n\n' +
      '**gold** Au · **platinum** Pt · **mercury** Hg · **chromium** Cr · **titanium** Ti',
    activity: {
      id: 'a1',
      type: 'sort',
      prompt: 'Is each metal a transition element?',
      bins: [
        { id: 'te', name: 'Transition element' },
        { id: 'not', name: 'Not a transition element' },
      ],
      cards: [
        { id: 'zn', name: 'zinc', bin: 'te' },
        { id: 'pt', name: 'platinum', bin: 'te' },
        { id: 'hg', name: 'mercury', bin: 'te' },
        { id: 'al', name: 'aluminium', bin: 'not' },
        { id: 'ca', name: 'calcium', bin: 'not' },
        { id: 'k', name: 'potassium', bin: 'not' },
      ],
      explain: 'Zinc, platinum and mercury are three of the ten. Aluminium is in Group III, calcium in Group II and potassium in Group I — metals, but outside the middle block.',
    },
  },

  // ── 5 · Predict: how much heavier? ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No numbers yet — just predict',
    title: 'Two Blocks the Same Size',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'One block is iron. One block is sodium. Both are exactly the same size.',
    activity: {
      id: 'a2',
      type: 'predict',
      prompt: 'How many times heavier do you think the iron block is?',
      options: [
        { val: 'same', name: 'About the same — they are both metals' },
        { val: 'two', name: 'About twice as heavy' },
        { val: 'eight', name: 'Between five and ten times as heavy' },
        { val: 'hundred', name: 'About a hundred times as heavy' },
      ],
      correct: 'eight',
      explain: 'It is **between five and ten times**. Sodium is so light that it floats on water; iron sinks. The next slide gives the densities, so you can work out the exact number.',
    },
  },

  // ── 6 · Density ─────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TRANS,
    icon: 'Weight',
    eyebrow: 'Physical property 1 · density in g/cm³',
    title: 'High Density',
    ratio: 42,
    inlineSvg: DIAGRAMS.DENSITY_BARS,
    content:
      'Density tells you how heavy a substance is for its size.\n\n' +
      '> iron **7.9** · copper **8.9** · nickel **8.9** · sodium **0.97**',
    notes: [
      {
        tone: 'write',
        text: '**High density:** iron is over **8 times** heavier than the same volume of sodium.',
      },
    ],
    activity: {
      id: 'a3',
      type: 'estimate',
      prompt: 'Divide the density of iron by the density of sodium. How many times denser is iron?',
      min: 0,
      max: 30,
      step: 0.5,
      answer: 8,
      tolerance: 0.1,
      explain: '7.9 ÷ 0.97 ≈ **8.1**, so iron is about **8 times** denser. Dividing — not subtracting — tells you **how many times** bigger one number is than another.',
    },
  },

  // ── 7 · Melting point ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TRANS,
    icon: 'Thermometer',
    eyebrow: 'Physical property 2 · melting point in °C',
    title: 'High Melting Points',
    ratio: 42,
    inlineSvg: DIAGRAMS.MELTING_BARS,
    content:
      'Iron melts at **1535 °C**, nickel at **1455 °C** and copper at **1083 °C**. Sodium melts at only **98 °C** — in boiling water it would melt.\n\n' +
      'One exception: **mercury** is a **liquid** at room temperature. It melts at −39 °C.',
    notes: [
      {
        tone: 'write',
        text: '**High melting points** — except mercury, a liquid at room temperature.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Which transition element does NOT have a high melting point?',
      options: [
        { val: 'A', text: 'Titanium' },
        { val: 'B', text: 'Chromium' },
        { val: 'C', text: 'Mercury' },
      ],
      correct: 'C',
      expEn: 'Mercury is the exception: it is a liquid at room temperature, so its melting point is below 20 °C (it is −39 °C). Titanium and chromium both melt above 1600 °C.',
    },
  },

  // ── 8 · Hard, strong, conductors ────────────────────────────────────────
  {
    layout: 'stack',
    accent: TRANS,
    icon: 'Hammer',
    columns: 3,
    eyebrow: 'Physical properties 3 and 4',
    title: 'Hard, Strong and Good Conductors',
    content: 'Two more properties that make them **useful**.',
    notes: [
      {
        tone: 'info',
        text: '**Hard and strong.** Not soft like the Group I metals — you cannot cut iron with a knife.',
      },
      {
        tone: 'info',
        text: '**Good conductors** of heat and electricity. Of all the metals, **silver** is the best conductor of electricity, and **copper** is next.',
      },
      {
        tone: 'write',
        text: 'Transition elements are **hard and strong**, and **good conductors** of heat and electricity.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Of all the metals, which two are the best conductors of electricity?',
      options: [
        { val: 'A', text: 'Iron first, then nickel' },
        { val: 'B', text: 'Sodium first, then potassium' },
        { val: 'C', text: 'Silver first, then copper' },
      ],
      correct: 'C',
      expEn: 'Silver is the best conductor of electricity of all the metals, and copper comes next. Copper is used for wires because it is much cheaper than silver.',
    },
  },

  // ── 9 · Much less reactive, no clear trend ──────────────────────────────
  {
    layout: 'compare',
    accent: TRANS,
    icon: 'Scale',
    eyebrow: 'Chemical properties 1 and 2',
    title: 'Much Less Reactive Than Group One',
    columns: [
      {
        heading: 'Sodium, Group I',
        accent: AMBER,
        icon: 'Flame',
        content: 'Fizzes on cold water and catches fire in air. Reactivity **increases** down Group I — a clear **trend**.',
      },
      {
        heading: 'Copper and nickel',
        accent: TRANS,
        icon: 'Shapes',
        content: 'No reaction with water. They do not catch fire in air. (Iron **rusts** in damp air, but slowly.) **No clear trend** — neighbours in the table tend to be similar.',
        notes: [
          { tone: 'write', text: 'Transition elements are **much less reactive** than Group I, and show **no clear trend** in reactivity.' },
        ],
      },
    ],
    check: {
      id: 'c5',
      q: 'A piece of nickel is dropped into a beaker of cold water. What happens?',
      options: [
        { val: 'A', text: 'It fizzes and moves around, giving off hydrogen' },
        { val: 'B', text: 'Nothing that you can see' },
        { val: 'C', text: 'It melts into a ball and catches fire' },
      ],
      correct: 'B',
      expEn: 'Nickel, like copper, does not react with water. Fizzing, melting and catching fire are what Group I metals do — the transition elements are much less reactive.',
    },
  },

  // ── 10 · Coloured compounds ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: TRANS,
    icon: 'Sparkles',
    eyebrow: 'Chemical property 3',
    title: 'Coloured Compounds',
    ratio: 40,
    inlineSvg: DIAGRAMS.COLOURED_COMPOUNDS,
    content:
      'Most transition elements form **coloured compounds**: blue copper(II) sulfate, pale green iron(II) sulfate, orange-brown iron(III) hydroxide.\n\n' +
      'In contrast, the Group I metals form **white** compounds.',
    notes: [
      {
        tone: 'write',
        text: 'Most transition elements form **coloured compounds**. Group I compounds are white.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Which of these compounds is most likely to be coloured?',
      options: [
        { val: 'A', text: 'Potassium chloride' },
        { val: 'B', text: 'Chromium(III) chloride' },
        { val: 'C', text: 'Lithium nitrate' },
      ],
      correct: 'B',
      expEn: 'Chromium is a transition element, so its compounds are coloured — chromium(III) compounds are usually green. Potassium and lithium are Group I metals, and their compounds are white.',
    },
  },

  // ── 11 · Catalysts ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TRANS,
    icon: 'Zap',
    eyebrow: 'Chemical property 4',
    title: 'Transition Elements as Catalysts',
    ratio: 42,
    inlineSvg: DIAGRAMS.CATALYST_BED,
    content:
      'A **catalyst** speeds up a reaction, but remains **unchanged** itself.\n\n' +
      'Many transition elements and their compounds act as catalysts. **Iron** is the catalyst in making **ammonia** (page 122).',
    notes: [
      {
        tone: 'write',
        text: '**Catalyst:** a substance that speeds up a reaction but remains unchanged. Example: iron, in making ammonia.',
      },
    ],
    check: {
      id: 'c7',
      q: 'Iron is used as the catalyst in making ammonia. What is true about the iron at the end?',
      options: [
        { val: 'A', text: 'It has all been used up, so more must be added' },
        { val: 'B', text: 'It has become part of the ammonia' },
        { val: 'C', text: 'It is still there, unchanged, and can be used again' },
      ],
      correct: 'C',
      expEn: 'A catalyst speeds up a reaction but is not used up — the iron is chemically unchanged at the end. That is why the same iron can work for a long time.',
    },
  },

  // ── 12 · Alkali metal or transition element? ───────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'GitCompare',
    eyebrow: 'Put it together',
    title: 'Two Kinds of Metal',
    content:
      'Both are metals, and both conduct electricity. But in almost every other way, the transition elements are the **opposite** of Group I.',
    activity: {
      id: 'a4',
      type: 'sort',
      prompt: 'Which kind of metal does each property describe?',
      bins: [
        { id: 'am', name: 'Alkali metal (Group I)' },
        { id: 'te', name: 'Transition element' },
      ],
      cards: [
        { id: 'knife', name: 'can be cut with a knife', bin: 'am' },
        { id: 'light', name: 'low density', bin: 'am' },
        { id: 'water', name: 'fizzes on cold water', bin: 'am' },
        { id: 'hard', name: 'hard and strong', bin: 'te' },
        { id: 'colour', name: 'forms coloured compounds', bin: 'te' },
        { id: 'cat', name: 'used as a catalyst', bin: 'te' },
      ],
      explain: 'Soft, light and very reactive — that is Group I. Hard, coloured compounds and catalysts — that is the transition elements.',
    },
  },

  // ── 13 · Uses follow from the properties ────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Building2',
    columns: 3,
    eyebrow: 'Why it matters',
    title: 'Each Use Comes From a Property',
    content: 'Iron is the most used metal of all — usually as **steel**.',
    notes: [
      {
        tone: 'info',
        text: '**Hard and strong:** bridges, buildings, ships, cars. **Titanium** is strong but much lighter than steel.',
      },
      {
        tone: 'info',
        text: '**Steel** is iron with other substances added. **Stainless steel** has about 11% **chromium**, to stop rust.',
      },
      {
        tone: 'info',
        text: '**Coloured compounds:** paint pigments and pottery glazes.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'sort',
      prompt: 'Which property explains each use?',
      bins: [
        { id: 'strong', name: 'Hard and strong' },
        { id: 'colour', name: 'Coloured compounds' },
        { id: 'conduct', name: 'Good conductor' },
        { id: 'cat', name: 'Catalyst' },
      ],
      cards: [
        { id: 'girder', name: 'steel beams in a bridge', bin: 'strong' },
        { id: 'glaze', name: 'a blue glaze on a pot', bin: 'colour' },
        { id: 'wire', name: 'copper wires in a house', bin: 'conduct' },
        { id: 'nh3', name: 'iron in making ammonia', bin: 'cat' },
        { id: 'paint', name: 'a green paint pigment', bin: 'colour' },
        { id: 'hull', name: 'the hull of a ship', bin: 'strong' },
      ],
      explain: 'Beams and hulls need a hard, strong metal. Glazes and pigments need colour. Wires need a good conductor. Iron in the ammonia plant speeds up the reaction without being used up.',
    },
  },

  // ── 14 · Salts of transition elements ───────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'FlaskConical',
    eyebrow: 'Salts of transition elements',
    title: 'Making Their Salts',
    content:
      'The **oxides** and **hydroxides** of all metals are **bases**. So you can make a salt of a transition element by reacting its oxide or hydroxide with an **acid** (topic 6.2):\n\n' +
      '> $\\text{NiO}(\\text{s}) + 2\\text{HCl}(\\text{aq}) \\rightarrow \\text{NiCl}_2(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$',
    notes: [
      {
        tone: 'write',
        text: '**metal oxide or hydroxide + acid → salt + water.** This works for the transition elements too.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Iron(III) oxide is added to warm dilute hydrochloric acid. What are the products?',
      options: [
        { val: 'A', text: 'Iron(III) chloride and hydrogen' },
        { val: 'B', text: 'Iron(III) chloride and water' },
        { val: 'C', text: 'No reaction — transition elements are unreactive' },
      ],
      correct: 'B',
      expEn: 'An oxide is a base, so it gives a salt and water: iron(III) chloride and water. Hydrogen comes only from an acid and a metal. "Less reactive" is about the metal itself, not its oxide.',
    },
  },

  // ── 15 · EXTENDED: ions with different charges ─────────────────────────
  {
    layout: 'compare',
    accent: SLATE,
    icon: 'Superscript',
    eyebrow: 'Extended',
    title: 'Ions With Different Charges',
    columns: [
      {
        heading: 'Always the same charge',
        accent: AMBER,
        icon: 'Equal',
        content: 'Group I metals: always $\\text{1+}$, like $\\text{Na}^{+}$.\n\nGroup II: always $\\text{2+}$, like $\\text{Mg}^{2+}$.\n\nGroup III: always $\\text{3+}$, like $\\text{Al}^{3+}$.',
      },
      {
        heading: 'Variable charge',
        accent: TRANS,
        icon: 'Repeat',
        content: 'Most transition elements can form ions with **different charges**:\n\ncopper: $\\text{Cu}^{+}$ and $\\text{Cu}^{2+}$\n\niron: $\\text{Fe}^{2+}$ and $\\text{Fe}^{3+}$',
      },
    ],
    check: {
      id: 'c9',
      q: 'Magnesium forms only Mg²⁺ ions, but iron forms Fe²⁺ and Fe³⁺. Why the difference?',
      options: [
        { val: 'A', text: 'Iron is more reactive than magnesium' },
        { val: 'B', text: 'Magnesium is in Group II, whose ions are always 2+; iron is a transition element, whose charge is variable' },
        { val: 'C', text: 'Magnesium is a non-metal, so it has only one ion' },
      ],
      correct: 'B',
      expEn: 'The charge on a Group I, II or III ion is fixed by the group. Transition elements are different: most can form ions with more than one charge. (Iron is in fact less reactive than magnesium, and both are metals.)',
    },
  },

  // ── 16 · EXTENDED: two oxides of copper, two of iron ───────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Atom',
    eyebrow: 'Extended',
    title: 'More Than One Compound With Oxygen',
    ratio: 40,
    inlineSvg: DIAGRAMS.COPPER_IRON_OXIDES,
    drawThis: true,
    content:
      'Because they form ions with different charges, most transition elements form **more than one compound** with another element.\n\n' +
      '> copper(I) oxide $\\text{Cu}_2\\text{O}$ · copper(II) oxide $\\text{CuO}$\n' +
      '> iron(II) oxide $\\text{FeO}$ · iron(III) oxide $\\text{Fe}_2\\text{O}_3$',
    check: {
      id: 'c10',
      q: 'Why does copper(I) oxide, Cu₂O, have two copper ions for every oxide ion?',
      options: [
        { val: 'A', text: 'Each Cu⁺ ion has a charge of 1+, so two are needed to balance one O²⁻ ion' },
        { val: 'B', text: 'Copper atoms always go around in pairs' },
        { val: 'C', text: 'The (I) means there is one oxide ion' },
      ],
      correct: 'A',
      expEn: 'The (I) is the charge on the copper ion, 1+. The oxide ion is 2−, so two Cu⁺ ions (2+ in total) balance one O²⁻. In copper(II) oxide, one Cu²⁺ is enough, so the formula is CuO.',
    },
  },

  // ── 17 · EXTENDED: the Roman numeral ───────────────────────────────────
  {
    layout: 'steps',
    accent: SLATE,
    icon: 'Hash',
    eyebrow: 'Extended',
    title: 'The Roman Numeral Is the Oxidation Number',
    dense: true,
    content: '> **Oxidation number:** the number of electrons each metal atom has lost — the Roman numeral in the name. The transition elements have **variable oxidation numbers**.',
    steps: [
      { text: 'Read the numeral: copper(**I**) chloride → the copper ion is $\\text{Cu}^{+}$.' },
      { text: 'Chloride, from Group VII, is always $\\text{Cl}^{-}$.' },
      { text: 'Balance the charges: one $\\text{Cu}^{+}$ and one $\\text{Cl}^{-}$ → $\\text{CuCl}$.' },
    ],
    activity: {
      id: 'a6',
      type: 'sort',
      prompt: 'Sort each compound by the oxidation number of its metal.',
      bins: [
        { id: 'one', name: 'Oxidation number 1' },
        { id: 'two', name: 'Oxidation number 2' },
        { id: 'three', name: 'Oxidation number 3' },
      ],
      cards: [
        { id: 'cui', name: 'copper(I) iodide', bin: 'one' },
        { id: 'cus', name: 'copper(I) sulfide', bin: 'one' },
        { id: 'cuno3', name: 'copper(II) nitrate', bin: 'two' },
        { id: 'feso4', name: 'iron(II) sulfate', bin: 'two' },
        { id: 'feno3', name: 'iron(III) nitrate', bin: 'three' },
        { id: 'crcl3', name: 'chromium(III) chloride', bin: 'three' },
      ],
      explain: 'Only the numeral counts: I is 1, II is 2, III is 3. The other part of the name — iodide, sulfate, nitrate — does not change the metal\'s oxidation number.',
    },
  },

  // ── 18 · EXTENDED: from a formula back to a name ───────────────────────
  {
    layout: 'steps',
    accent: SLATE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Extended',
    title: 'From a Formula Back to a Name',
    dense: true,
    content: '> Worked example: name $\\text{FeBr}_3$.',
    steps: [
      { text: 'Bromide is from Group VII, so each ion is $\\text{Br}^{-}$. Three of them: $3 \\times 1- = 3-$.' },
      { text: 'The compound has no overall charge, so the one iron ion must be $\\text{Fe}^{3+}$.' },
      { text: 'Write the charge as a Roman numeral: **iron(III) bromide**.' },
    ],
    check: {
      id: 'c11',
      q: 'What is the name of Cr(OH)₃?',
      options: [
        { val: 'A', text: 'Chromium(I) hydroxide — there is one chromium' },
        { val: 'B', text: 'Chromium hydrogen oxide' },
        { val: 'C', text: 'Chromium(III) hydroxide' },
      ],
      correct: 'C',
      expEn: 'Each hydroxide ion, OH⁻, is 1−, and there are three, so 3− in total. The chromium ion must be Cr³⁺ to balance them: chromium(III) hydroxide. The numeral is the charge on the metal ion, not the number of metal ions.',
    },
  },

  // ── 19 · Module close: three families ──────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Columns3',
    eyebrow: 'Module 6 · the three families',
    title: 'Three Families Side by Side',
    ratio: 34,
    inlineSvg: DIAGRAMS.THREE_FAMILIES,
    content:
      'The module quiz mixes all three families. Read the table **row by row**.',
    activity: {
      id: 'a7',
      type: 'sort',
      prompt: 'Which family does each element belong to?',
      bins: [
        { id: 'am', name: 'Alkali metal' },
        { id: 'hal', name: 'Halogen' },
        { id: 'te', name: 'Transition element' },
        { id: 'nob', name: 'Noble gas' },
      ],
      cards: [
        { id: 'e1', name: 'soft metal, floats and fizzes on water', bin: 'am' },
        { id: 'e2', name: 'metal kept under oil, lilac flame', bin: 'am' },
        { id: 'e3', name: 'grey-black solid, purple vapour', bin: 'hal' },
        { id: 'e4', name: 'pale yellow gas, most reactive non-metal', bin: 'hal' },
        { id: 'e5', name: 'hard metal, forms a blue sulfate', bin: 'te' },
        { id: 'e6', name: 'hard metal, its oxide is a green pigment', bin: 'te' },
        { id: 'e7', name: 'unreactive gas of single atoms', bin: 'nob' },
      ],
      explain: 'Soft, floats, fizzes, lilac flame: alkali metals (sodium, potassium). Coloured non-metals that react readily: halogens (iodine, fluorine). Hard metals with coloured compounds: transition elements (copper, chromium). Unreactive and monatomic: a noble gas.',
    },
  },

  // ── 20 · Module close: the trends ──────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'TrendingUp',
    eyebrow: 'Module 6 · the trends',
    title: 'Which Way Does Reactivity Go',
    content:
      '> **Group I:** more reactive going **down**.\n' +
      '> **Group VII:** less reactive going **down**.\n' +
      '> **Transition elements:** **no clear trend**.',
    activity: {
      id: 'a8',
      type: 'hotspot',
      prompt: 'Tap the family whose reactivity DECREASES as you go down the group.',
      svg: DIAGRAMS.TABLE_BLOCK,
      viewBox: '0 0 560 316',
      targets: [
        { id: 'am', x: 42, y: 170, r: 14, name: 'Group I — reactivity increases going down' },
        { id: 'te', x: 224, y: 198, r: 50, name: 'the transition elements — no clear trend' },
        { id: 'hal', x: 490, y: 170, r: 13, name: 'Group VII, the halogens' },
        { id: 'nob', x: 518, y: 156, r: 13, name: 'Group VIII — the noble gases are unreactive' },
      ],
      correct: 'hal',
      explain: 'The **halogens**, Group VII: fluorine is the most reactive and iodine the least. Group I goes the other way, the transition elements show no clear trend, and the noble gases are unreactive.',
    },
  },

  // ── 21 · Countable recap ───────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: ORANGE,
    icon: 'CheckCircle2',
    columns: 3,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Six?',
    content: '> In your notebook: **13 key words**, **4 physical** and **4 chemical properties**, **2 labelled drawings**.',
    items: [
      { text: 'Find the **transition elements** in the table.' },
      { text: 'Name **ten** of them.' },
      { text: 'Give four **physical properties**, against sodium.' },
      { text: 'Give four **chemical properties**.' },
      { text: 'Link each **use** to a property.' },
      { text: 'Use **Roman numerals** in names and formulae.' },
    ],
    check: {
      id: 'c12',
      q: 'Which pair of properties belongs to a transition element but NOT to an alkali metal?',
      options: [
        { val: 'A', text: 'It conducts electricity and it is shiny when cut' },
        { val: 'B', text: 'It is soft and it has a low density' },
        { val: 'C', text: 'It has a high melting point and it forms coloured compounds' },
      ],
      correct: 'C',
      expEn: 'High melting points and coloured compounds belong to the transition elements only. Conducting electricity and being shiny are true of both — they are metal properties. Soft and low density describe Group I.',
    },
  },
];
