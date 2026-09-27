// src/data/IGCSE_CHEM/M06_2/notes.js
// 6.2 Reactions of Acids and Bases — book spreads 11.3 "The reactions of acids
// and bases" and 11.4 "A closer look at neutralisation". English-only (this
// track is not bilingual), so there are no `vn*` twins.
//
// The deck's spine follows the two spreads: one slide of recap → acids make
// salts → naming the salt → the three typical acid reactions, each PREDICTED
// before it is shown → the three side by side → what bases do → what
// neutralisation means (and the one that is not) → where the water comes from →
// neutralisation outside the lab → EXTENDED: the ionic equation in the book's
// three steps → the insoluble-base case → the proton, donors and acceptors →
// a countable recap.
//
// The ionic-equation slides use the SAME words as the Spectator Strike task
// (IONIC_EQ): "split into ions", "stay whole", "strike out the spectator ions",
// "what is left is the ionic equation".
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
const SLATE = '#475569';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: ACID,
    icon: 'FlaskConical',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.2 Reactions of acids and bases',
    title: 'What Acids Do to Metals, Bases and Carbonates',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Too much acid in your stomach gives you **indigestion**. A chalky tablet from the pharmacy makes it better in a few minutes. In one sentence — what do you think the tablet does to the **acid**?',
    },
  },

  // ── 2 · One-slide recap of 6.1 ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Recap from topic 6.1',
    title: 'Hydrogen Ions and Hydroxide Ions',
    content:
      '> • **Acids** contain **hydrogen ions**, $\\text{H}^{+}$, in solution.\n' +
      '> • **Bases** are metal **oxides** and **hydroxides**. Most are insoluble.\n' +
      '> • **Alkalis** are the **soluble** bases. Their solutions contain **hydroxide ions**, $\\text{OH}^{-}$.\n\n' +
      'This topic is about what happens when acids **react**.',
    check: {
      id: 'c1',
      q: 'Which ion do the solutions of ALL acids contain?',
      options: [
        { val: 'A', text: 'Hydroxide ions, OH⁻' },
        { val: 'B', text: 'Hydrogen ions, H⁺' },
        { val: 'C', text: 'Chloride ions, Cl⁻' },
      ],
      correct: 'B',
      expEn: 'Every acid solution contains hydrogen ions, H⁺ — that is what makes it acidic. Hydroxide ions belong to alkalis, and chloride ions are only in hydrochloric acid.',
    },
  },

  // ── 3 · Acids make salts ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Shapes',
    eyebrow: 'Book spread 11.3',
    title: 'When Acids React, They Give Salts',
    ratio: 50,
    inlineSvg: DIAGRAMS.SALT_NAMER,
    content:
      'Acids react with **metals**, **bases** and **carbonates** to give **salts**.\n\n' +
      'The **metal** part of the salt comes from the metal, base or carbonate. The other part comes from the **acid**.',
    notes: [
      {
        tone: 'write',
        text: '**Salt:** the ionic compound formed when an acid reacts with a metal, a base or a carbonate.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Potassium chloride is a salt. Which part of it came from the acid?',
      options: [
        { val: 'A', text: 'The potassium ions' },
        { val: 'B', text: 'Both the potassium and the chloride ions' },
        { val: 'C', text: 'The chloride ions' },
      ],
      correct: 'C',
      expEn: 'The chloride part comes from hydrochloric acid. The potassium part comes from the metal, base or carbonate the acid reacted with.',
    },
  },

  // ── 4 · Naming the salt ─────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: NEUTRAL,
    icon: 'ListChecks',
    eyebrow: 'Every class is an English class',
    title: 'How to Name a Salt',
    dense: true,
    content: '> First word: the **metal**. Second word: from the **acid**.',
    steps: [
      { text: 'Take the **metal** — from the metal itself, or its oxide, hydroxide or carbonate.' },
      { text: 'Take the family name from the **acid**: chloride, sulfate or nitrate.' },
      { text: 'Join them: calcium carbonate + nitric acid gives **calcium nitrate**.' },
    ],
    activity: {
      id: 'a1',
      type: 'sort',
      prompt: 'Which acid was used to make each salt?',
      bins: [
        { id: 'hcl', name: 'Hydrochloric acid' },
        { id: 'h2so4', name: 'Sulfuric acid' },
        { id: 'hno3', name: 'Nitric acid' },
      ],
      cards: [
        { id: 'kcl', name: 'potassium chloride', bin: 'hcl' },
        { id: 'cuso4', name: 'copper(II) sulfate', bin: 'h2so4' },
        { id: 'cano3', name: 'calcium nitrate', bin: 'hno3' },
        { id: 'alcl3', name: 'aluminium chloride', bin: 'hcl' },
        { id: 'na2so4', name: 'sodium sulfate', bin: 'h2so4' },
        { id: 'znno3', name: 'zinc nitrate', bin: 'hno3' },
      ],
      explain: 'Read the SECOND word. Chlorides come from hydrochloric acid, sulfates from sulfuric acid, nitrates from nitric acid. The first word only tells you the metal.',
    },
  },

  // ── 5 · Predict: acid + metal ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'What Is Fizzing?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Magnesium ribbon in dilute sulfuric acid fizzes hard and slowly disappears.',
    activity: {
      id: 'a2',
      type: 'predict',
      prompt: 'Which gas is bubbling off?',
      options: [
        { val: 'h2', name: 'Hydrogen' },
        { val: 'co2', name: 'Carbon dioxide' },
        { val: 'o2', name: 'Oxygen' },
        { val: 'so2', name: 'Sulfur dioxide' },
      ],
      correct: 'h2',
      explain: 'It is **hydrogen**. The magnesium pushes the hydrogen out of the acid and takes its place. The next slide shows the equation.',
    },
  },

  // ── 6 · Acid + metal ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'TestTube',
    eyebrow: 'Typical acid reaction 1 · with metals',
    title: 'Acids and Metals Give a Salt and Hydrogen',
    ratio: 65,
    side: 'left',
    inlineSvg: DIAGRAMS.ACID_METAL,
    drawThis: true,
    content:
      '> $\\text{Mg}(\\text{s}) + \\text{H}_2\\text{SO}_4(\\text{aq}) \\rightarrow \\text{MgSO}_4(\\text{aq}) + \\text{H}_2(\\text{g})$\n\n' +
      'The metal **displaces** hydrogen — it takes the hydrogen\'s place. (Copper cannot: it does not react with dilute acids.)',
    notes: [
      {
        tone: 'write',
        text: '**acid + metal → salt + hydrogen.** Test for hydrogen: a lighted splint gives a **squeaky pop**.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Zinc reacts with dilute hydrochloric acid. What does "zinc displaces hydrogen" mean?',
      options: [
        { val: 'A', text: 'Zinc drives the hydrogen out of the acid and takes its place' },
        { val: 'B', text: 'Zinc slowly turns into hydrogen gas' },
        { val: 'C', text: 'The hydrogen pushes the zinc out of the solution' },
      ],
      correct: 'A',
      expEn: 'To displace means to push out and take the place of. The zinc takes the hydrogen\'s place and forms zinc chloride; the hydrogen escapes as H₂ gas.',
    },
  },

  // ── 7 · Acid + base ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Beaker',
    eyebrow: 'Typical acid reaction 2 · with bases',
    title: 'Acids and Bases Give a Salt and Water',
    ratio: 65,
    side: 'left',
    inlineSvg: DIAGRAMS.ACID_BASE,
    drawThis: true,
    content:
      'Alkalis and insoluble bases both react this way. **No gas.**\n\n' +
      '> $\\text{HCl}(\\text{aq}) + \\text{NaOH}(\\text{aq}) \\rightarrow \\text{NaCl}(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$\n' +
      '> $\\text{H}_2\\text{SO}_4(\\text{aq}) + \\text{CuO}(\\text{s}) \\rightarrow \\text{CuSO}_4(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$',
    notes: [
      {
        tone: 'write',
        text: '**acid + base → salt + water.**',
      },
    ],
    check: {
      id: 'c4',
      q: 'Black copper(II) oxide is stirred into warm dilute sulfuric acid. What do you see?',
      options: [
        { val: 'A', text: 'Fizzing, as hydrogen is given off' },
        { val: 'B', text: 'The black solid disappears and the solution turns blue' },
        { val: 'C', text: 'A white solid appears and the solution stays colourless' },
      ],
      correct: 'B',
      expEn: 'Copper(II) oxide is a base, so it gives a salt and water — no gas. The black solid is used up, and copper(II) sulfate solution is blue.',
    },
  },

  // ── 8 · Predict: acid + carbonate ──────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'The Same Gas Again?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Marble chips — calcium carbonate — fizz in dilute hydrochloric acid too.',
    activity: {
      id: 'a3',
      type: 'predict',
      prompt: 'Which gas fizzes off when an acid meets a carbonate?',
      options: [
        { val: 'h2', name: 'Hydrogen again — every acid fizz is hydrogen' },
        { val: 'co2', name: 'Carbon dioxide — it comes from the carbonate' },
        { val: 'o2', name: 'Oxygen — from the oxygen atoms in the carbonate' },
        { val: 'cl2', name: 'Chlorine — from the hydrochloric acid' },
      ],
      correct: 'co2',
      explain: 'It is **carbon dioxide**. A carbonate contains carbon and oxygen, and the acid breaks it up into water and CO₂. Hydrogen only comes from acid + metal.',
    },
  },

  // ── 9 · Acid + carbonate ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Droplets',
    eyebrow: 'Typical acid reaction 3 · with carbonates',
    title: 'Acids and Carbonates Give a Salt, Water and Carbon Dioxide',
    ratio: 65,
    side: 'left',
    inlineSvg: DIAGRAMS.ACID_CARBONATE,
    drawThis: true,
    content:
      '> $\\text{CaCO}_3(\\text{s}) + 2\\text{HCl}(\\text{aq}) \\rightarrow \\text{CaCl}_2(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l}) + \\text{CO}_2(\\text{g})$\n\n' +
      'This time the gas is **carbon dioxide**, from the carbonate.',
    notes: [
      {
        tone: 'write',
        text: '**acid + carbonate → salt + water + carbon dioxide.** Test for carbon dioxide: it turns **limewater milky**.',
      },
    ],
    check: {
      id: 'c5',
      q: 'What are the products when zinc carbonate reacts with dilute nitric acid?',
      options: [
        { val: 'A', text: 'Zinc nitrate and hydrogen' },
        { val: 'B', text: 'Zinc nitrate and water only' },
        { val: 'C', text: 'Zinc nitrate, water and carbon dioxide' },
      ],
      correct: 'C',
      expEn: 'Acid + carbonate always gives three products: a salt (zinc nitrate, because the acid is nitric), water and carbon dioxide. Hydrogen is only made by acid + metal.',
    },
  },

  // ── 10 · The three side by side ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Side by side',
    title: 'Three Reactions, One Salt',
    ratio: 42,
    inlineSvg: DIAGRAMS.THREE_REACTIONS,
    content:
      'All three use dilute **sulfuric acid**, and all three make the **same salt, zinc sulfate**. Only the other products change.',
    notes: [
      {
        tone: 'write',
        text: '**acid + metal → salt + hydrogen**\n\n**acid + base → salt + water**\n\n**acid + carbonate → salt + water + carbon dioxide**',
      },
    ],
  },

  // ── 11 · Reactions of bases ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Wind',
    eyebrow: 'Now from the base\'s side',
    title: 'The Reactions of Bases',
    content:
      'A base + an acid gives **only** a salt and water — the sign of a base. An alkali + an **ammonium salt** gives **ammonia**:\n\n' +
      '> $\\text{Ca(OH)}_2(\\text{s}) + 2\\text{NH}_4\\text{Cl}(\\text{s}) \\rightarrow \\text{CaCl}_2(\\text{s}) + 2\\text{H}_2\\text{O}(\\text{l}) + 2\\text{NH}_3(\\text{g})$',
    notes: [
      {
        tone: 'write',
        text: '**alkali + ammonium salt → salt + water + ammonia.** Test for ammonia: it turns **damp red litmus blue**.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Potassium hydroxide is warmed with ammonium sulfate. Which gas comes off?',
      options: [
        { val: 'A', text: 'Hydrogen' },
        { val: 'B', text: 'Ammonia' },
        { val: 'C', text: 'Carbon dioxide' },
      ],
      correct: 'B',
      expEn: 'An alkali drives ammonia gas, NH₃, out of any ammonium salt. There is no carbonate here, so no carbon dioxide, and no metal, so no hydrogen.',
    },
  },

  // ── 12 · What neutralisation means ─────────────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Scale',
    eyebrow: 'The definition — and the one that is not',
    title: 'What Neutralisation Means',
    content:
      '> acid + base → salt + **water**\n' +
      '> acid + carbonate → salt + **water** + CO₂\n' +
      '> acid + metal → salt + hydrogen: **no water, so not a neutralisation**',
    notes: [
      {
        tone: 'write',
        text: '**Neutralisation:** a reaction with an acid that gives **water** as well as a salt.',
      },
    ],
    activity: {
      id: 'a4',
      type: 'sort',
      prompt: 'Is each reaction a neutralisation?',
      bins: [
        { id: 'yes', name: 'Neutralisation' },
        { id: 'no', name: 'Not a neutralisation' },
      ],
      cards: [
        { id: 'zn', name: 'zinc + hydrochloric acid', bin: 'no' },
        { id: 'koh', name: 'potassium hydroxide + nitric acid', bin: 'yes' },
        { id: 'na2co3', name: 'sodium carbonate + nitric acid', bin: 'yes' },
        { id: 'fe', name: 'iron + sulfuric acid', bin: 'no' },
      ],
      explain: 'The two metals (zinc and iron) give a salt and **hydrogen** — no water, so no neutralisation. The hydroxide and the carbonate both give **water**.',
    },
  },

  // ── 13 · Where the water comes from ────────────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Droplet',
    eyebrow: 'Book spread 11.3 · the ions',
    title: 'Where Does the Water Come From?',
    ratio: 40,
    inlineSvg: DIAGRAMS.IONS_BEFORE_AFTER,
    drawThis: true,
    content:
      'When the two solutions mix, the **hydrogen ions and hydroxide ions combine** to make water.\n\n' +
      'The sodium and chloride ions are **still there**. Evaporate the water and you get sodium chloride.',
    notes: [
      {
        tone: 'write',
        text: '$\\text{H}^{+}(\\text{aq}) + \\text{OH}^{-}(\\text{aq}) \\rightarrow \\text{H}_2\\text{O}(\\text{l})$',
      },
    ],
    check: {
      id: 'c7',
      q: 'Hydrochloric acid and sodium hydroxide solution are mixed in exactly the right amounts. Which ions are left in the solution?',
      options: [
        { val: 'A', text: 'H⁺ and OH⁻' },
        { val: 'B', text: 'None — every ion has turned into water' },
        { val: 'C', text: 'Na⁺ and Cl⁻' },
      ],
      correct: 'C',
      expEn: 'The H⁺ and OH⁻ ions combine to make water molecules. The Na⁺ and Cl⁻ ions do not change — they stay in the solution, which is why evaporating it gives sodium chloride.',
    },
  },

  // ── 14 · Neutralisation outside the lab ────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Sprout',
    columns: 3,
    eyebrow: 'Why it matters',
    title: 'Neutralisation Outside the Lab',
    content: 'We use neutralisation every day — usually to **reduce acidity**.',
    notes: [
      {
        tone: 'info',
        text: '**Teeth.** Bacteria turn sugar into acids that cause **tooth decay**. Toothpaste contains **bases** to neutralise them.',
      },
      {
        tone: 'info',
        text: '**Stomach.** Too much hydrochloric acid causes **indigestion**. Indigestion remedies contain **bases**.',
      },
      {
        tone: 'info',
        text: '**Soil.** Acidic soil is treated with **limestone** (calcium carbonate), **lime** (calcium oxide) or **slaked lime** (calcium hydroxide).',
      },
    ],
    check: {
      id: 'c8',
      q: 'A remedy for indigestion contains magnesium hydroxide. How does it help?',
      options: [
        { val: 'A', text: 'It is a base, so it neutralises the extra acid in the stomach' },
        { val: 'B', text: 'It is an acid, so it cancels out the stomach acid' },
        { val: 'C', text: 'It adds more hydrogen ions to the stomach' },
      ],
      correct: 'A',
      expEn: 'Magnesium hydroxide is a base. It reacts with the excess hydrochloric acid, making a salt and water, so there is less acid to cause pain.',
    },
  },

  // ── 15 · EXTENDED: what an ionic equation is, and step 1 ────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Split',
    eyebrow: 'Extended',
    title: 'Split Into Ions, or Stay Whole?',
    content:
      'To write an ionic equation, first sort every substance:\n\n' +
      '> **split into ions:** anything dissolved — (aq)\n' +
      '> **stay whole:** liquids, gases, solids, metals',
    notes: [
      {
        tone: 'write',
        text: '**Ionic equation:** an equation that shows just the ions that take part in the reaction.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'sort',
      prompt: 'Does each substance split into ions, or stay whole?',
      bins: [
        { id: 'split', name: 'Split into ions' },
        { id: 'whole', name: 'Stay whole' },
      ],
      cards: [
        { id: 'h2so4', name: 'H₂SO₄(aq)', bin: 'split' },
        { id: 'naoh', name: 'NaOH(aq)', bin: 'split' },
        { id: 'mgcl2', name: 'MgCl₂(aq)', bin: 'split' },
        { id: 'h2o', name: 'H₂O(l)', bin: 'whole' },
        { id: 'co2', name: 'CO₂(g)', bin: 'whole' },
        { id: 'zn', name: 'Zn(s)', bin: 'whole' },
      ],
      explain: 'Everything marked (aq) — the acid, the alkali and the dissolved salt — splits into ions. Water (l), a gas (g) and a metal (s) stay whole.',
    },
  },

  // ── 16 · EXTENDED: every ion written out ──────────────────────────────
  {
    layout: 'steps',
    accent: SLATE,
    icon: 'Grid3x3',
    eyebrow: 'Extended',
    title: 'Every Ion Written Out',
    dense: true,
    content: '> Worked example: hydrochloric acid and sodium hydroxide solution.',
    steps: [
      { text: 'Start from the balanced symbol equation: $\\text{HCl}(\\text{aq}) + \\text{NaOH}(\\text{aq}) \\rightarrow \\text{NaCl}(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$' },
      { text: 'The three (aq) substances **split into ions**. Water is a liquid, so it **stays whole**.' },
      { text: 'Write out every ion: $\\text{H}^{+} + \\text{Cl}^{-} + \\text{Na}^{+} + \\text{OH}^{-} \\rightarrow \\text{Na}^{+} + \\text{Cl}^{-} + \\text{H}_2\\text{O}$' },
    ],
    check: {
      id: 'c9',
      q: 'In the full ionic equation, how is sodium chloride solution, NaCl(aq), written?',
      options: [
        { val: 'A', text: 'NaCl(aq) — a salt always stays whole' },
        { val: 'B', text: 'Na⁺(aq) + Cl⁻(aq)' },
        { val: 'C', text: 'Na(s) + Cl₂(g)' },
      ],
      correct: 'B',
      expEn: 'Sodium chloride is dissolved — it is (aq) — so it splits into its ions, Na⁺ and Cl⁻. Only liquids, gases, solids and metals stay whole.',
    },
  },

  // ── 17 · EXTENDED: strike out the spectator ions ───────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Scissors',
    eyebrow: 'Extended',
    title: 'Strike Out the Spectator Ions',
    ratio: 45,
    inlineSvg: DIAGRAMS.SPECTATORS_CROSSED,
    content:
      '$\\text{Na}^{+}$ and $\\text{Cl}^{-}$ are the same before and after. They do not take part, like people watching a match. **Strike out the spectator ions** on both sides.',
    notes: [
      {
        tone: 'write',
        text: '**Spectator ions:** ions in the solution that do not take part in the reaction.',
      },
    ],
    activity: {
      id: 'a6',
      type: 'sort',
      prompt: 'Sodium hydroxide solution neutralises nitric acid. Sort the four ions.',
      bins: [
        { id: 'part', name: 'Takes part' },
        { id: 'spec', name: 'Spectator ion' },
      ],
      cards: [
        { id: 'h', name: 'H⁺', bin: 'part' },
        { id: 'no3', name: 'NO₃⁻', bin: 'spec' },
        { id: 'na', name: 'Na⁺', bin: 'spec' },
        { id: 'oh', name: 'OH⁻', bin: 'part' },
      ],
      explain: 'H⁺ and OH⁻ join to make water, so they take part. Na⁺ and NO₃⁻ are in the solution before and after — as sodium nitrate — so they are the spectators.',
    },
  },

  // ── 18 · EXTENDED: what is left ────────────────────────────────────────
  {
    layout: 'callout',
    accent: NEUTRAL,
    icon: 'Target',
    eyebrow: 'Extended',
    title: 'What Is Left Is the Ionic Equation',
    content:
      '> $\\text{H}^{+}(\\text{aq}) + \\text{OH}^{-}(\\text{aq}) \\rightarrow \\text{H}_2\\text{O}(\\text{l})$\n\n' +
      'The same for **every** acid and alkali.',
    notes: [
      {
        tone: 'write',
        text: '**H⁺ ions combine with OH⁻ ions to form water molecules.**',
      },
    ],
    activity: {
      id: 'a7',
      type: 'order',
      prompt: 'Put the steps for writing an ionic equation in order.',
      steps: [
        { id: 'sym', name: 'Write the balanced symbol equation, with state symbols' },
        { id: 'split', name: 'Write out every ion: (aq) substances split into ions, the rest stay whole' },
        { id: 'strike', name: 'Strike out the spectator ions — the same on both sides' },
        { id: 'left', name: 'What is left is the ionic equation — in simplest whole numbers' },
      ],
      explain: 'You need the balanced equation and its state symbols first, because the state symbols tell you what splits into ions. Then write every ion, strike out the spectators, and what is left is the ionic equation.',
    },
  },

  // ── 19 · EXTENDED: an insoluble base ───────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Grid3x3',
    eyebrow: 'Extended',
    title: 'When the Base Does Not Dissolve',
    ratio: 44,
    inlineSvg: DIAGRAMS.OXIDE_LATTICE,
    drawThis: true,
    content:
      'Magnesium oxide is a lattice of $\\text{Mg}^{2+}$ and $\\text{O}^{2-}$ ions — no hydroxide ions.\n\n' +
      'The acid\'s $\\text{H}^{+}$ ions join the **oxide ions** to make water. The oxide ion is still in the solid, so it keeps its (s).',
    notes: [
      {
        tone: 'write',
        text: '$2\\text{H}^{+}(\\text{aq}) + \\text{O}^{2-}(\\text{s}) \\rightarrow \\text{H}_2\\text{O}(\\text{l})$',
      },
    ],
    check: {
      id: 'c10',
      q: 'Which ion in magnesium oxide takes the H⁺ ions from the acid?',
      options: [
        { val: 'A', text: 'The magnesium ion, Mg²⁺' },
        { val: 'B', text: 'The oxide ion, O²⁻' },
        { val: 'C', text: 'The hydroxide ion, OH⁻' },
      ],
      correct: 'B',
      expEn: 'Two H⁺ ions join onto one O²⁻ ion to make H₂O. Mg²⁺ is positive, like H⁺, so it does not take them; and magnesium oxide contains no hydroxide ions at all.',
    },
  },

  // ── 20 · EXTENDED: the proton ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Atom',
    eyebrow: 'Extended',
    title: 'A Hydrogen Ion Is Just a Proton',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.PROTON,
    drawThis: true,
    content:
      'A hydrogen atom has **one proton** and **one electron**. Take away the electron and only the proton is left.\n\n' +
      'So in neutralisation, the acid **gives** protons and the base **takes** them.',
    notes: [
      {
        tone: 'write',
        text: 'An $\\text{H}^{+}$ ion is **just a proton**.',
      },
    ],
    check: {
      id: 'c11',
      q: 'Why is a hydrogen ion, H⁺, called "just a proton"?',
      options: [
        { val: 'A', text: 'It has gained an extra proton' },
        { val: 'B', text: 'It has lost its proton, so only the electron is left' },
        { val: 'C', text: 'A hydrogen atom has one proton and one electron, and H⁺ has lost the electron' },
      ],
      correct: 'C',
      expEn: 'A hydrogen atom has no neutrons — just one proton and one electron. Losing the electron gives the + charge and leaves nothing but the proton.',
    },
  },

  // ── 21 · EXTENDED: donors and acceptors ────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Extended',
    title: 'Proton Donors and Proton Acceptors',
    columns: [
      {
        heading: 'Acids donate protons',
        accent: ACID,
        icon: 'ArrowRight',
        content: 'An acid **gives** (donates) $\\text{H}^{+}$ ions.',
        notes: [
          { tone: 'write', text: '**Acids are proton donors.**' },
        ],
      },
      {
        heading: 'Bases accept protons',
        accent: ALKALI,
        icon: 'Magnet',
        content: 'A base **takes** (accepts) them — with $\\text{OH}^{-}$ or $\\text{O}^{2-}$.',
        notes: [
          { tone: 'write', text: '**Bases are proton acceptors.**' },
        ],
      },
    ],
    check: {
      id: 'c12',
      q: 'Calcium oxide neutralises hydrochloric acid. Which particle accepts the protons?',
      options: [
        { val: 'A', text: 'The calcium ion, Ca²⁺' },
        { val: 'B', text: 'The chloride ion, Cl⁻' },
        { val: 'C', text: 'The oxide ion, O²⁻' },
      ],
      correct: 'C',
      expEn: 'Calcium oxide is the base, and the part of it that takes the H⁺ ions is the oxide ion: 2H⁺ + O²⁻ → H₂O. Ca²⁺ and Cl⁻ are left in the solution as calcium chloride.',
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
    content: '> In your notebook: **12 key words**, **4 general equations**, **2 ionic equations**.',
    items: [
      { text: 'Name salts; give the three **acid reactions**.' },
      { text: 'Write them as **symbol equations**.' },
      { text: 'Name each **gas**, and its **test**.' },
      { text: 'Give the two reactions of **bases**.' },
      { text: 'Define **neutralisation**.' },
      { text: 'Write an **ionic equation**; explain **proton donors**.' },
    ],
    check: {
      id: 'c13',
      q: 'Which pair of reactants makes calcium chloride and water, and nothing else?',
      options: [
        { val: 'A', text: 'Calcium carbonate and hydrochloric acid' },
        { val: 'B', text: 'Calcium hydroxide and hydrochloric acid' },
        { val: 'C', text: 'Calcium hydroxide and sulfuric acid' },
      ],
      correct: 'B',
      expEn: 'A base and an acid give only a salt and water. Calcium carbonate would also give carbon dioxide, and sulfuric acid would make calcium sulfate, not calcium chloride.',
    },
  },
];
