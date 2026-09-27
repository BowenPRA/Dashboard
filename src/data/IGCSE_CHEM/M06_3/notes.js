// src/data/IGCSE_CHEM/M06_3/notes.js
// 6.3 Oxides — book spread 11.5 "Oxides" (pages 136–137). English-only (this
// track is not bilingual), so there are no `vn*` twins.
//
// The deck's spine follows the spread: one slide of recap → what an oxide is →
// metals burning in oxygen, PREDICTED before it is shown, then the equations
// and "the more reactive, the more vigorous" → the English of "basic" → the
// copper(II) oxide litmus evidence, PREDICTED before it is shown → metals form
// basic oxides → non-metals burning, with the litmus result PREDICTED first →
// acidic oxides in water → the two sorted side by side → acid rain →
// EXTENDED: amphoteric oxides, predicted then shown → neutral oxides → all four
// kinds sorted, then summed up as a two-way test → EXTENDED: the pattern across
// period 3 → a countable recap.
//
// The book prints the calcium equation without its 2s; slide 6 writes it
// balanced and says so, because the student has the book open beside them.
//
// Sized for a 1280×720 laptop: a split slide's text column is only ~400px wide
// beside its diagram, so each slide carries one equation, two short paragraphs
// and one copy-down note at most. Wide diagrams get the wide column (ratio 40).
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its slide
// — the audio generator narrates every field before it and stops there. Slide
// titles are read aloud, so they carry no bare formulae. Chemical equations are
// KaTeX ($…$) with \text{} keeping element symbols upright.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const ACID = '#c8102e';
const ALKALI = '#4338ca';
const NEUTRAL = '#2f8f5b';
const AMPHOTERIC = '#7e22ce';
const SLATE = '#475569';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: ORANGE,
    icon: 'Flame',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.3 Oxides',
    title: 'What Happens When Elements Burn in Oxygen',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Rain near a big coal power station can slowly dissolve stone statues. The rain is **acidic** — but nobody poured acid into the clouds. In one sentence — where do you think the acid came from?',
    },
  },

  // ── 2 · One-slide recap of 6.2 ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Recap from topic 6.2',
    title: 'Bases, Alkalis and Litmus',
    content:
      '> • A **base** reacts with an acid to give **only** a salt and water.\n' +
      '> • An **alkali** is a base that dissolves in water.\n' +
      '> • Acids turn **blue litmus red**. Alkalis turn **red litmus blue**.\n\n' +
      'Today we meet a whole family of bases — and a family of compounds that make **acids**.',
    check: {
      id: 'c1',
      q: 'A solution has no effect on blue litmus AND no effect on red litmus. What is it?',
      options: [
        { val: 'A', text: 'An acid' },
        { val: 'B', text: 'An alkali' },
        { val: 'C', text: 'Neutral' },
      ],
      correct: 'C',
      expEn: 'An acid would turn the blue litmus red, and an alkali would turn the red litmus blue. A solution that changes neither colour is neutral.',
    },
  },

  // ── 3 · What an oxide is ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Book spread 11.5 · every class is an English class',
    title: 'What Is an Oxide?',
    content:
      'Read the definition slowly: oxygen and **another element** — ONE other element, no more.\n\n' +
      '> $\\text{MgO}$ is an oxide: magnesium + oxygen.\n' +
      '> $\\text{NaOH}$ is not: it has **three** elements.',
    notes: [
      {
        tone: 'write',
        text: '**Oxide:** a compound containing oxygen and one other element.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which of these compounds is an oxide?',
      options: [
        { val: 'A', text: 'Calcium carbonate, CaCO₃' },
        { val: 'B', text: 'Sulfur dioxide, SO₂' },
        { val: 'C', text: 'Potassium hydroxide, KOH' },
      ],
      correct: 'B',
      expEn: 'Sulfur dioxide contains just two elements, sulfur and oxygen, so it is an oxide. Calcium carbonate and potassium hydroxide both contain oxygen, but each has three elements.',
    },
  },

  // ── 4 · Predict: which metal is most vigorous? ─────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Which Metal Burns Hardest?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Calcium, iron and copper are each heated, then put into a jar of pure oxygen.',
    activity: {
      id: 'a1',
      type: 'predict',
      prompt: 'Which metal will react most vigorously?',
      options: [
        { val: 'ca', name: 'Calcium' },
        { val: 'fe', name: 'Iron' },
        { val: 'cu', name: 'Copper' },
        { val: 'same', name: 'All three the same — they all burn' },
      ],
      correct: 'ca',
      explain: '**Calcium** bursts into flame. Iron glows and throws out sparks. Copper does not catch fire at all. Calcium is the most reactive of the three. The next slide shows all three.',
    },
  },

  // ── 5 · Metals in oxygen ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Flame',
    eyebrow: 'Book spread 11.5 · basic oxides',
    title: 'Three Metals in Oxygen',
    ratio: 45,
    inlineSvg: DIAGRAMS.METALS_BURN,
    drawThis: true,
    content:
      'Each metal joins with oxygen to make its **oxide** — but they react very differently.\n\n' +
      'Copper does not even catch fire: its surface just turns **black**.',
    notes: [
      {
        tone: 'write',
        text: '**The more reactive the metal, the more vigorously it reacts** with oxygen.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Hot iron wool is put into a jar of oxygen. What do you see?',
      options: [
        { val: 'A', text: 'Nothing — iron is too unreactive to burn' },
        { val: 'B', text: 'It glows bright orange and throws out a shower of sparks' },
        { val: 'C', text: 'It fizzes and gives off hydrogen' },
      ],
      correct: 'B',
      expEn: 'Iron wool glows bright orange and sparks, leaving iron(III) oxide. It is less vigorous than calcium, which bursts into flame, but more than copper, which does not catch fire. Hydrogen comes from a metal and an ACID, not oxygen.',
    },
  },

  // ── 6 · The three equations ─────────────────────────────────────────────
  {
    layout: 'steps',
    accent: ALKALI,
    icon: 'ListChecks',
    eyebrow: 'The equations',
    title: 'Writing the Metal Equations',
    dense: true,
    content: '> metal + oxygen → metal oxide',
    steps: [
      { text: 'Calcium: $2\\text{Ca}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{CaO}(\\text{s})$ — your book leaves out the 2s; count the O atoms.' },
      { text: 'Iron: $4\\text{Fe}(\\text{s}) + 3\\text{O}_2(\\text{g}) \\rightarrow 2\\text{Fe}_2\\text{O}_3(\\text{s})$' },
      { text: 'Copper: $2\\text{Cu}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{CuO}(\\text{s})$' },
    ],
    activity: {
      id: 'a2',
      type: 'order',
      prompt: 'Put the metals in order: the most vigorous with oxygen first.',
      steps: [
        { id: 'ca', name: 'Calcium' },
        { id: 'mg', name: 'Magnesium' },
        { id: 'fe', name: 'Iron' },
        { id: 'cu', name: 'Copper' },
      ],
      explain: 'Reactivity decides it: calcium is more reactive than magnesium, magnesium more than iron, and copper is the least reactive. So calcium reacts most vigorously and copper least.',
    },
  },

  // ── 7 · The English of "basic" ──────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Basic Does Not Mean Simple',
    content:
      'In everyday English, **basic** means simple: "a basic phone".\n\n' +
      'In chemistry, **basic** means **acting as a base**. A basic oxide is an oxide that is a base — it **neutralises acids**.\n\n' +
      'In the same way, an **acidic** oxide is one that makes an acid.',
    check: {
      id: 'c4',
      q: 'A book says "magnesium oxide is a basic oxide". What does that tell you?',
      options: [
        { val: 'A', text: 'Magnesium oxide is a simple compound' },
        { val: 'B', text: 'Magnesium oxide is used a lot in everyday life' },
        { val: 'C', text: 'Magnesium oxide is a base: it can neutralise an acid' },
      ],
      correct: 'C',
      expEn: 'In chemistry "basic" means "acting as a base". So a basic oxide neutralises acids, giving a salt and water. It says nothing about being simple or common.',
    },
  },

  // ── 8 · Predict: the litmus after copper(II) oxide ─────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Is Copper Oxide a Base?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Copper(II) oxide is insoluble in water. It is stirred into warm dilute hydrochloric acid until no more dissolves.',
    activity: {
      id: 'a3',
      type: 'predict',
      prompt: 'Blue litmus is dipped into the liquid left. What happens?',
      options: [
        { val: 'red', name: 'Turns red — the acid is still there' },
        { val: 'blue', name: 'Stays blue — the acid is used up' },
        { val: 'none', name: 'No test works — the oxide is insoluble' },
      ],
      correct: 'blue',
      explain: 'The litmus **stays blue**. The oxide dissolved in the acid and used it up, so the liquid is no longer acidic. The next slide shows the three steps.',
    },
  },

  // ── 9 · The litmus evidence ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'TestTube',
    eyebrow: 'Book spread 11.5 · the evidence',
    title: 'How We Know Copper Oxide Is a Base',
    ratio: 45,
    inlineSvg: DIAGRAMS.LITMUS_CUO,
    drawThis: true,
    content:
      'It does not dissolve in water — but it **dissolves in acid** and **neutralises** it.',
    notes: [
      {
        tone: 'write',
        text: '**Basic oxide:** a metal oxide that is a base — it neutralises acids.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Which result shows that the copper(II) oxide has neutralised the acid?',
      options: [
        { val: 'A', text: 'The black powder sinks to the bottom of the beaker' },
        { val: 'B', text: 'The liquid left at the end has no effect on blue litmus' },
        { val: 'C', text: 'The acid turns blue litmus red at the start' },
      ],
      correct: 'B',
      expEn: 'The acid turned blue litmus red at the start. At the end the litmus stays blue, so the acid is gone — the oxide has neutralised it. Sinking only shows the powder is insoluble in water.',
    },
  },

  // ── 10 · Metals form basic oxides ──────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Layers',
    eyebrow: 'The rule for metals',
    title: 'Metals Form Basic Oxides',
    content:
      'Iron(III) oxide and magnesium oxide behave the same way: they neutralise acids too.\n\n' +
      '> In general, **metals react with oxygen to form basic oxides**.\n' +
      '> **Basic oxides belong to the larger group of compounds called bases.**',
    check: {
      id: 'c6',
      q: 'Magnesium oxide does not dissolve in water. What would happen if you added it to warm dilute nitric acid?',
      options: [
        { val: 'A', text: 'It would dissolve and neutralise the acid, making magnesium nitrate and water' },
        { val: 'B', text: 'Nothing, because it is insoluble' },
        { val: 'C', text: 'It would fizz and give off oxygen' },
      ],
      correct: 'A',
      expEn: 'Magnesium oxide is a basic oxide, and a base reacts with an acid to give a salt and water: magnesium nitrate and water. Being insoluble in WATER does not stop it reacting with an acid.',
    },
  },

  // ── 11 · Predict: non-metal oxides and litmus ──────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'What About the Non-Metals?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Carbon, sulfur and phosphorus are burned in oxygen. Each oxide is shaken with water, and blue litmus is dipped in.',
    activity: {
      id: 'a4',
      type: 'predict',
      prompt: 'What will the blue litmus do?',
      options: [
        { val: 'red', name: 'Turn red — the solutions are acidic' },
        { val: 'blue', name: 'Stay blue — they are bases, like the metal oxides' },
        { val: 'green', name: 'Turn green — the solutions are neutral' },
      ],
      correct: 'red',
      explain: 'The litmus **turns red**. All three oxides dissolve in water and give acids. Non-metal oxides are the opposite of metal oxides. (Litmus is only ever red or blue — never green.)',
    },
  },

  // ── 12 · Non-metals in oxygen ───────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Flame',
    eyebrow: 'Book spread 11.5 · acidic oxides',
    title: 'Three Non-Metals in Oxygen',
    ratio: 45,
    inlineSvg: DIAGRAMS.NONMETALS_BURN,
    drawThis: true,
    content:
      '> $\\text{C}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g})$\n' +
      '> $\\text{S}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{SO}_2(\\text{g})$\n' +
      '> $\\text{P}_4(\\text{s}) + 5\\text{O}_2(\\text{g}) \\rightarrow \\text{P}_4\\text{O}_{10}(\\text{s})$\n\n' +
      'Phosphorus catches fire in air **without heating**.',
    check: {
      id: 'c7',
      q: 'Why is white phosphorus stored under water?',
      options: [
        { val: 'A', text: 'It bursts into flame in air, even without heating' },
        { val: 'B', text: 'It dissolves in water to make an acid' },
        { val: 'C', text: 'It needs water to stay a solid' },
      ],
      correct: 'A',
      expEn: 'Phosphorus is so reactive that it bursts into flame in air on its own. Under water it cannot reach the oxygen. Carbon has to be heated red-hot and sulfur lit over a Bunsen first.',
    },
  },

  // ── 13 · Acidic oxides in water ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Droplets',
    eyebrow: 'What makes them acidic',
    title: 'Acidic Oxides Make Acids',
    ratio: 60,
    side: 'left',
    inlineSvg: DIAGRAMS.ACIDIC_WATER,
    content:
      'All three oxides dissolve in water, and the solutions turn blue litmus **red**. Carbon dioxide gives the weak acid **carbonic acid**.\n\n' +
      'It is only slightly soluble — more dissolves under pressure, as in a fizzy drink.',
    notes: [
      {
        tone: 'write',
        text: '**Acidic oxide:** a non-metal oxide that dissolves in water to give an acid. **Non-metals form acidic oxides.**',
      },
    ],
    check: {
      id: 'c8',
      q: 'Sulfur dioxide is bubbled into water with blue litmus in it. What happens, and why?',
      options: [
        { val: 'A', text: 'The litmus stays blue, because sulfur dioxide is a gas' },
        { val: 'B', text: 'The litmus turns red, because an acid forms' },
        { val: 'C', text: 'The litmus turns red, because sulfur dioxide is a base' },
      ],
      correct: 'B',
      expEn: 'Sulfur is a non-metal, so sulfur dioxide is an acidic oxide. It dissolves in the water and gives an acid, which turns blue litmus red. Being a gas does not stop it dissolving.',
    },
  },

  // ── 14 · Metal or non-metal? ────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Side by side',
    title: 'Basic Oxides and Acidic Oxides',
    columns: [
      {
        heading: 'Metals',
        accent: ALKALI,
        icon: 'Layers',
        content: 'Form **basic** oxides. They **neutralise acids**. Most are **insoluble** in water.',
      },
      {
        heading: 'Non-metals',
        accent: ACID,
        icon: 'Droplets',
        content: 'Form **acidic** oxides. They **dissolve in water** to give acids.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'sort',
      prompt: 'What kind of oxide does each element form when it burns?',
      bins: [
        { id: 'basic', name: 'A basic oxide' },
        { id: 'acidic', name: 'An acidic oxide' },
      ],
      cards: [
        { id: 'na', name: 'sodium', bin: 'basic' },
        { id: 'mg', name: 'magnesium', bin: 'basic' },
        { id: 'c', name: 'carbon', bin: 'acidic' },
        { id: 'cu', name: 'copper', bin: 'basic' },
        { id: 'n', name: 'nitrogen', bin: 'acidic' },
        { id: 's', name: 'sulfur', bin: 'acidic' },
      ],
      explain: 'Ask one question: metal or non-metal? Sodium, magnesium and copper are metals, so they form basic oxides. Carbon, nitrogen and sulfur are non-metals, so they form acidic oxides.',
    },
  },

  // ── 15 · Acid rain ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'CloudFog',
    eyebrow: 'Why it matters',
    title: 'Acid Rain',
    ratio: 45,
    inlineSvg: DIAGRAMS.ACID_RAIN,
    content:
      'Coal contains sulfur, so burning it makes **sulfur dioxide**. Hot car engines make **oxides of nitrogen**.\n\n' +
      'These **acidic oxides** dissolve in clouds and fall as **acid rain**.',
    notes: [
      {
        tone: 'write',
        text: '**Acid rain:** rain made acidic by oxides of sulfur and nitrogen dissolved in it.',
      },
    ],
    check: {
      id: 'c9',
      q: 'Which oxides are the main cause of acid rain?',
      options: [
        { val: 'A', text: 'Calcium oxide and magnesium oxide' },
        { val: 'B', text: 'Carbon monoxide and dinitrogen oxide' },
        { val: 'C', text: 'Oxides of sulfur and oxides of nitrogen' },
      ],
      correct: 'C',
      expEn: 'Sulfur and nitrogen are non-metals, so their oxides are acidic and dissolve in rain water to give acids. Calcium and magnesium oxides are basic, and carbon monoxide and dinitrogen oxide do not make acids.',
    },
  },

  // ── 16 · EXTENDED: predict — aluminium oxide ───────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Extended · no answer yet — just predict',
    title: 'Aluminium Is a Metal, So…',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'White aluminium oxide powder is warmed with dilute hydrochloric acid. Then some more is warmed with sodium hydroxide solution, an alkali.',
    activity: {
      id: 'a6',
      type: 'predict',
      prompt: 'Which one will the aluminium oxide react with?',
      options: [
        { val: 'acid', name: 'Only the acid — it is a metal oxide, so a base' },
        { val: 'alkali', name: 'Only the alkali' },
        { val: 'both', name: 'Both the acid and the alkali' },
        { val: 'neither', name: 'Neither of them' },
      ],
      correct: 'both',
      explain: 'Surprise: it reacts with **both**. With the acid it behaves as a base; with the alkali it behaves as an acidic oxide. The next slide shows the two equations.',
    },
  },

  // ── 17 · EXTENDED: amphoteric oxides ───────────────────────────────────
  // A showcase, not a split: the book's two equations are each ~45 characters
  // with state symbols, too wide for a split slide's text column at 1280×720,
  // so they are drawn into the diagram, which gets the whole slide.
  {
    layout: 'showcase',
    accent: AMPHOTERIC,
    icon: 'ArrowLeftRight',
    eyebrow: 'Extended · amphoteric oxides',
    title: 'Aluminium Oxide Reacts With Both',
    inlineSvg: DIAGRAMS.AMPHOTERIC,
    drawThis: true,
    caption: 'With the acid it acts as a **base**. With the alkali it acts as an **acid**, making **sodium aluminate**.',
    check: {
      id: 'c10',
      q: 'In which reaction does aluminium oxide behave as an ACID?',
      options: [
        { val: 'A', text: 'With hydrochloric acid, making aluminium chloride' },
        { val: 'B', text: 'With sodium hydroxide, making sodium aluminate' },
        { val: 'C', text: 'When aluminium burns in oxygen' },
      ],
      correct: 'B',
      expEn: 'Only an acid (or an acidic oxide) reacts with an alkali. So when aluminium oxide reacts with sodium hydroxide, it is behaving as an acid. With hydrochloric acid it is doing the opposite job — acting as a base.',
    },
  },

  // ── 18 · Neutral oxides ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'CircleSlash',
    eyebrow: 'Book spread 11.5 · neutral oxides',
    title: 'Some Oxides Are Neither',
    content:
      'A few non-metal oxides are **neither acidic nor basic**. They do not react with acids or with bases.\n\n' +
      '> • **Carbon monoxide**, $\\text{CO}$ — a deadly gas.\n' +
      '> • **Dinitrogen oxide**, $\\text{N}_2\\text{O}$ — "laughing gas", used by dentists as an anaesthetic.',
    notes: [
      {
        tone: 'write',
        text: '**Neutral oxide:** an oxide that reacts with neither acids nor bases, e.g. CO and N₂O.',
      },
    ],
    check: {
      id: 'c11',
      q: 'Carbon monoxide is an oxide of a non-metal. Why is it NOT called an acidic oxide?',
      options: [
        { val: 'A', text: 'Because it is a gas' },
        { val: 'B', text: 'Because it neutralises acids' },
        { val: 'C', text: 'Because it does not react with acids or bases, so it is neutral' },
      ],
      correct: 'C',
      expEn: 'Most non-metal oxides are acidic, but carbon monoxide does not react with acids OR bases, so it is a neutral oxide. Carbon dioxide is a gas too, and it is acidic — being a gas is not the reason.',
    },
  },

  // ── 19 · Sort all four kinds ────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Shapes',
    eyebrow: 'Putting it together',
    title: 'Four Kinds of Oxide',
    content:
      '**Basic** oxides react with acids; **acidic** oxides react with alkalis; **neutral** oxides react with neither.',
    notes: [
      {
        tone: 'write',
        text: '**Amphoteric oxide:** an oxide that reacts with both acids and alkalis, e.g. aluminium oxide and zinc oxide.',
      },
    ],
    activity: {
      id: 'a7',
      type: 'sort',
      prompt: 'Sort the eight oxides into the four kinds.',
      bins: [
        { id: 'basic', name: 'Basic' },
        { id: 'acidic', name: 'Acidic' },
        { id: 'amph', name: 'Amphoteric' },
        { id: 'neutral', name: 'Neutral' },
      ],
      cards: [
        { id: 'na2o', name: 'sodium oxide', bin: 'basic' },
        { id: 'so3', name: 'sulfur trioxide', bin: 'acidic' },
        { id: 'zno', name: 'zinc oxide', bin: 'amph' },
        { id: 'co', name: 'carbon monoxide', bin: 'neutral' },
        { id: 'fe2o3', name: 'iron(III) oxide', bin: 'basic' },
        { id: 'no2', name: 'nitrogen dioxide', bin: 'acidic' },
        { id: 'al2o3', name: 'aluminium oxide', bin: 'amph' },
        { id: 'n2o', name: 'dinitrogen oxide', bin: 'neutral' },
      ],
      explain: 'Metal oxides are basic, except the two amphoteric ones, zinc oxide and aluminium oxide. Non-metal oxides are acidic, except the two neutral ones, carbon monoxide and dinitrogen oxide.',
    },
  },

  // ── 20 · The two-way test ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'The summary',
    title: 'Two Questions Decide the Kind',
    ratio: 45,
    inlineSvg: DIAGRAMS.OXIDE_GRID,
    drawThis: true,
    content:
      'Test an unknown oxide twice: once with an **acid**, once with an **alkali**. The two answers put it in one box.',
    check: {
      id: 'c12',
      q: 'An oxide reacts with sodium hydroxide solution, but not with hydrochloric acid. What kind of oxide is it?',
      options: [
        { val: 'A', text: 'Basic' },
        { val: 'B', text: 'Amphoteric' },
        { val: 'C', text: 'Acidic' },
      ],
      correct: 'C',
      expEn: 'Reacting with an alkali but not with an acid is the sign of an acidic oxide. A basic oxide does the opposite, and an amphoteric oxide would react with both.',
    },
  },

  // ── 21 · EXTENDED: across period 3 ─────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'ArrowRight',
    eyebrow: 'Extended · the pattern',
    title: 'From Metal to Non-Metal',
    ratio: 42,
    inlineSvg: DIAGRAMS.PERIOD3,
    content:
      'Across a row of the Periodic Table the elements change from **metals** to **non-metals** — so their oxides change too.\n\n' +
      'Aluminium, where the change happens, gives the **amphoteric** oxide.',
    check: {
      id: 'c13',
      q: 'Going across period 3 from sodium to chlorine, how do the oxides change?',
      options: [
        { val: 'A', text: 'From acidic, to amphoteric, to basic' },
        { val: 'B', text: 'From basic, to amphoteric, to acidic' },
        { val: 'C', text: 'They are all basic, because they are all oxides' },
      ],
      correct: 'B',
      expEn: 'Sodium and magnesium are metals, so their oxides are basic. Aluminium oxide is amphoteric. Silicon to chlorine are non-metals, so their oxides are acidic.',
    },
  },

  // ── 22 · Countable recap ───────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: ORANGE,
    icon: 'CheckCircle2',
    columns: 3,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Six?',
    content: '> In your notebook: **6 definitions** and **8 equations**.',
    items: [
      { text: 'Define an **oxide**.' },
      { text: 'Write **burning** equations.' },
      { text: 'Show a metal oxide is a **base**.' },
      { text: 'Say what makes an oxide **acidic**.' },
      { text: 'Explain **acid rain**.' },
      { text: 'Define **amphoteric** and **neutral**.' },
    ],
    check: {
      id: 'c14',
      q: 'An element\'s oxide dissolves in water, and the solution turns blue litmus red. What is the element?',
      options: [
        { val: 'A', text: 'It is probably a non-metal' },
        { val: 'B', text: 'It is probably a metal' },
        { val: 'C', text: 'It must be very reactive' },
      ],
      correct: 'A',
      expEn: 'An oxide that dissolves to give an acid is an acidic oxide, and acidic oxides come from non-metals. Metal oxides are basic. The litmus says nothing about how reactive the element is.',
    },
  },
];
