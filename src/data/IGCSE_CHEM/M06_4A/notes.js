// src/data/IGCSE_CHEM/M06_4A/notes.js
// 6.4 Making Salts: the methods — book spreads 11.6 "Making salts (part I)" and
// 11.7 "Making salts (part II)". English-only (this track is not bilingual), so
// there are no `vn*` twins. Titration CALCULATIONS (spread 11.8) are the next
// unit, M06_4B; here titration is only a METHOD for making a salt.
//
// The deck's spine follows the two spreads: starter → recap of what acids react
// with → METHOD 1, acid + excess metal (zinc sulfate), with the words excess,
// residue, filtrate and saturated → which metals it works for, with copper
// PREDICTED first → METHOD 2, an insoluble base (copper(II) sulfate) and why
// excess and filtering → METHOD 3, an alkali by titration (sodium chloride) →
// the solubility rules → EXTENDED: METHOD 4, precipitation (barium sulfate), its
// steps and how to choose the two solutions → choosing a method for any salt →
// EXTENDED: the ionic equation for a precipitation, and precipitation at work →
// hydrated and anhydrous salts, then (EXTENDED) water of crystallisation → a
// countable recap.
//
// Extended content follows the book's margin bar and the Checkup's list: the
// whole precipitation section, choosing the starting compounds, lab tests, and
// the term "water of crystallisation". Hydrated / anhydrous is Core.
//
// The ionic-equation slide uses the SAME words as M06_2 and the Spectator
// Strike task (IONIC_EQ): "split into ions", "stay whole", "strike out the
// spectator ions", "what is left is the ionic equation". The deck's own
// precipitation examples are BaCl₂ + MgSO₄ (the book's) and AgNO₃ + KBr (sort
// a7), kept out of the Spectator Strike pool.
//
// Sized for a 1280×720 laptop: one equation, two short paragraphs and one
// copy-down note per slide at most. The three-panel method strips are wide, so
// they get the wide column (ratio 36–40).
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
const AMBER = '#b45309';
const SLATE = '#475569';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: NEUTRAL,
    icon: 'FlaskConical',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.4 Making salts: the methods',
    title: 'How Do You Get a Salt Out of a Reaction?',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Mr Bowen leaves a saucer of **salt water** on a sunny windowsill for a week. What is left in the saucer, and where did the **water** go? Answer in one sentence.',
    },
  },

  // ── 2 · Recap of 6.2 ───────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Recap from topic 6.2',
    title: 'Four Things That Turn an Acid Into a Salt',
    content:
      '> Acids make salts with **metals**, **insoluble bases**, **alkalis** (soluble bases) and **carbonates**.\n\n' +
      'Every method in this topic has the same goal: use up the acid **completely**, then get the salt out **pure** and **dry**.',
    check: {
      id: 'c1',
      q: 'Zinc carbonate reacts with dilute hydrochloric acid. What are the products?',
      options: [
        { val: 'A', text: 'Zinc chloride and hydrogen' },
        { val: 'B', text: 'Zinc chloride, water and carbon dioxide' },
        { val: 'C', text: 'Zinc carbonate chloride and water' },
      ],
      correct: 'B',
      expEn: 'Acid + carbonate always gives a salt, water and carbon dioxide. The salt is zinc chloride, because hydrochloric acid gives chlorides. Hydrogen only comes from acid + metal.',
    },
  },

  // ── 3 · Method 1: acid + excess metal ──────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'TestTube',
    eyebrow: 'Method 1 · acid + excess metal',
    title: 'Starting With a Metal',
    ratio: 42,
    inlineSvg: DIAGRAMS.METAL_METHOD,
    drawThis: true,
    content:
      '> $\\text{Zn}(\\text{s}) + \\text{H}_2\\text{SO}_4(\\text{aq}) \\rightarrow \\text{ZnSO}_4(\\text{aq}) + \\text{H}_2(\\text{g})$\n\n' +
      'Add zinc until some is **left over**, then **filter**.',
    notes: [
      {
        tone: 'write',
        text: '**Excess:** more than is needed — some is left over.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Why does Mr Bowen add the zinc in excess?',
      options: [
        { val: 'A', text: 'So that the zinc dissolves faster' },
        { val: 'B', text: 'So that more hydrogen is made than zinc sulfate' },
        { val: 'C', text: 'So that all of the acid is used up' },
      ],
      correct: 'C',
      expEn: 'With zinc left over, the reaction can only stop because the ACID has run out. So no acid is left to end up mixed with the salt.',
    },
  },

  // ── 4 · English: residue and filtrate (hotspot) ────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Residue and Filtrate',
    content:
      'Filtering splits a mixture into two parts:\n\n' +
      '> **residue** — the solid that stays **in** the filter paper\n' +
      '> **filtrate** — the liquid that runs **through** it',
    notes: [
      {
        tone: 'write',
        text: '**Residue:** the solid left in the filter paper. **Filtrate:** the liquid that passes through.',
      },
    ],
    activity: {
      id: 'a1',
      type: 'hotspot',
      prompt: 'Tap the **residue**.',
      svg: DIAGRAMS.FILTER_PARTS,
      viewBox: '0 0 300 224',
      targets: [
        { id: 'residue', x: 150, y: 82, r: 16, name: 'the residue — the solid in the paper' },
        { id: 'paper', x: 124, y: 55, r: 10, name: 'the filter paper itself' },
        { id: 'stem', x: 150, y: 124, r: 12, name: 'the stem of the funnel' },
        { id: 'filtrate', x: 150, y: 188, r: 20, name: 'the filtrate — the solution in the beaker' },
      ],
      correct: 'residue',
      explain: 'The residue is the solid **left behind** in the filter paper — here, the zinc that did not react. The filtrate is the zinc sulfate solution that ran through into the beaker.',
    },
  },

  // ── 5 · Evaporate, then cool (order) ───────────────────────────────────
  {
    layout: 'steps',
    accent: NEUTRAL,
    icon: 'Droplets',
    eyebrow: 'Method 1 · getting the crystals',
    title: 'Evaporate, Then Let It Cool',
    dense: true,
    content: '> **Saturated solution:** a solution that can dissolve no more of the salt at that temperature.',
    steps: [
      { text: '**Heat** the filtrate to evaporate some of the water.' },
      { text: 'Stop when the solution is **saturated**.' },
      { text: '**Leave it to cool.** Cold water holds less salt, so **crystals** of zinc sulfate appear.' },
    ],
    activity: {
      id: 'a2',
      type: 'order',
      prompt: 'Put the whole method for making zinc sulfate crystals in order.',
      steps: [
        { id: 'add', name: 'Add zinc to the dilute sulfuric acid until some is left over' },
        { id: 'wait', name: 'Wait until the bubbling stops' },
        { id: 'filter', name: 'Filter off the unreacted zinc' },
        { id: 'heat', name: 'Heat the filtrate until it is saturated' },
        { id: 'cool', name: 'Leave it to cool, so that crystals form' },
      ],
      explain: 'React first, with the zinc in excess, and wait until the acid is used up. Filter out the extra zinc. Only then evaporate the filtrate to a saturated solution and cool it to get crystals.',
    },
  },

  // ── 6 · Predict: copper ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Will Copper Work?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Mr Bowen wants to make copper(II) sulfate. He drops copper foil into warm dilute sulfuric acid.',
    activity: {
      id: 'a3',
      type: 'predict',
      prompt: 'What happens?',
      options: [
        { val: 'slow', name: 'It fizzes gently and slowly dissolves' },
        { val: 'fast', name: 'It fizzes violently' },
        { val: 'none', name: 'Nothing happens' },
      ],
      correct: 'none',
      explain: '**Nothing happens.** Copper does not react with dilute acids, so method 1 can never make a copper salt. The next slide shows which metals it does work for.',
    },
  },

  // ── 7 · Which metals? (sort) ───────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ShieldAlert',
    eyebrow: 'Method 1 · which metals?',
    title: 'Not Every Metal Will Do',
    content:
      '> **Works:** magnesium, aluminium, zinc, iron\n' +
      '> **Too violent:** sodium, potassium, calcium\n' +
      '> **Too slow:** lead\n' +
      '> **No reaction:** copper, silver, gold\n\n' +
      'For the salts of those metals, you must **choose a different method**.',
    activity: {
      id: 'a4',
      type: 'sort',
      prompt: 'Can method 1 (acid + excess metal) be used to make each salt?',
      bins: [
        { id: 'yes', name: 'Yes — start from the metal' },
        { id: 'no', name: 'No — choose another method' },
      ],
      cards: [
        { id: 'mgcl2', name: 'magnesium chloride', bin: 'yes' },
        { id: 'alcl3', name: 'aluminium chloride', bin: 'yes' },
        { id: 'fecl2', name: 'iron(II) chloride', bin: 'yes' },
        { id: 'k2so4', name: 'potassium sulfate', bin: 'no' },
        { id: 'cacl2', name: 'calcium chloride', bin: 'no' },
        { id: 'cucl2', name: 'copper(II) chloride', bin: 'no' },
        { id: 'pbno3', name: 'lead(II) nitrate', bin: 'no' },
      ],
      explain: 'Look at the METAL in the name. Magnesium, aluminium and iron react with dilute acid at a safe speed. Potassium and calcium react violently, copper does not react at all, and lead reacts too slowly.',
    },
  },

  // ── 8 · Method 2: acid + excess insoluble base ─────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Beaker',
    eyebrow: 'Method 2 · acid + excess insoluble base or carbonate',
    title: 'Starting With an Insoluble Base',
    ratio: 46,
    inlineSvg: DIAGRAMS.BASE_METHOD,
    drawThis: true,
    content:
      '> $\\text{CuO}(\\text{s}) + \\text{H}_2\\text{SO}_4(\\text{aq}) \\rightarrow \\text{CuSO}_4(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$\n\n' +
      'Add copper(II) oxide to warm acid until **no more dissolves**.',
    notes: [
      {
        tone: 'write',
        text: '**Copper(II) carbonate** works too — it also fizzes.',
      },
    ],
    check: {
      id: 'c3',
      q: 'How does Mr Bowen know that all the sulfuric acid has been used up?',
      options: [
        { val: 'A', text: 'The solution turns blue' },
        { val: 'B', text: 'Some black solid stays at the bottom, however long he stirs' },
        { val: 'C', text: 'Bubbles of hydrogen stop coming off' },
      ],
      correct: 'B',
      expEn: 'The solution turns blue as soon as ANY copper(II) sulfate forms, so blue alone proves nothing. When black solid stays undissolved, the copper(II) oxide is in excess — the acid has run out. There is no hydrogen: an oxide gives water.',
    },
  },

  // ── 9 · Why excess? Why filter? ────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'The reason for each step',
    title: 'Why Add Excess, and Why Filter?',
    columns: [
      {
        heading: 'Add the solid in excess',
        accent: ACID,
        icon: 'Target',
        content: 'Extra solid makes sure **every bit of acid reacts**. No acid is left to spoil the salt.',
        notes: [
          { tone: 'write', text: 'Excess solid → **no acid left over**.' },
        ],
      },
      {
        heading: 'Then filter',
        accent: NEUTRAL,
        icon: 'Layers',
        content: 'The extra solid does not dissolve, so the **filter paper catches it**. Only the salt solution gets through.',
        notes: [
          { tone: 'write', text: 'Filtering **removes the excess solid**.' },
        ],
      },
    ],
    check: {
      id: 'c4',
      q: 'A student adds too little zinc oxide to dilute nitric acid, and all of it dissolves. What is wrong with her solution?',
      options: [
        { val: 'A', text: 'It still contains acid, so the salt will not be pure' },
        { val: 'B', text: 'It still contains solid zinc oxide' },
        { val: 'C', text: 'It contains no zinc nitrate at all' },
      ],
      correct: 'A',
      expEn: 'If every grain dissolved, the zinc oxide ran out first — so some acid is left over, and it would end up in the salt. Adding the solid until some is left over prevents this.',
    },
  },

  // ── 10 · Method 3: the problem with an alkali ──────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Droplet',
    eyebrow: 'Method 3 · acid + alkali',
    title: 'When Both Reactants Dissolve',
    content:
      '> $\\text{NaOH}(\\text{aq}) + \\text{HCl}(\\text{aq}) \\rightarrow \\text{NaCl}(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$\n\n' +
      'Both reactants are **soluble**, so any excess stays dissolved. You **cannot filter it off**.\n\n' +
      'So do a **titration** first, to find the exact amounts. Then mix exactly those amounts.',
    notes: [
      {
        tone: 'write',
        text: '**Titration:** adding one solution slowly to another, with an indicator, to find the exact amount needed to react.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Why can you NOT add excess sodium hydroxide and then filter it off?',
      options: [
        { val: 'A', text: 'Sodium hydroxide does not react with acids' },
        { val: 'B', text: 'Sodium hydroxide is a gas, so it escapes' },
        { val: 'C', text: 'Sodium hydroxide dissolves, so it passes straight through the filter paper' },
      ],
      correct: 'C',
      expEn: 'Filter paper only catches solids. Sodium hydroxide is an alkali — a soluble base — so any extra would stay in the solution and end up in the salt.',
    },
  },

  // ── 11 · The titration ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'FlaskConical',
    eyebrow: 'Method 3 · the titration',
    title: 'Finding the Exact Amount of Acid',
    ratio: 48,
    inlineSvg: DIAGRAMS.TITRATION_RIG,
    drawThis: true,
    content:
      'Pipette 25 cm³ of sodium hydroxide into a flask. Add two drops of **thymolphthalein**: it turns blue.\n\n' +
      'Add acid from the **burette**, a little at a time, swirling. Stop when the blue **suddenly disappears**.',
    notes: [
      {
        tone: 'write',
        text: '**Thymolphthalein:** blue in alkali; colourless in neutral or acid.',
      },
    ],
    check: {
      id: 'c6',
      q: 'The blue colour has just disappeared. What does this tell you?',
      options: [
        { val: 'A', text: 'All of the alkali has been used up — the solution is now neutral' },
        { val: 'B', text: 'All of the acid in the burette has been used up' },
        { val: 'C', text: 'The indicator has been used up' },
      ],
      correct: 'A',
      expEn: 'Thymolphthalein is blue only while alkali is left. When the last of the alkali is neutralised, the solution is neutral and the indicator turns colourless. So do not add any more acid.',
    },
  },

  // ── 12 · Repeat without the indicator ──────────────────────────────────
  {
    layout: 'steps',
    accent: ALKALI,
    icon: 'Repeat',
    eyebrow: 'Method 3 · making the salt',
    title: 'Repeat Without the Indicator',
    dense: true,
    content: '> The titration tells you how much acid neutralises 25 cm³ of the alkali. Now:',
    steps: [
      { text: 'Read the scale on the burette: how much acid did you add?' },
      { text: 'Repeat **without the indicator**: 25 cm³ of alkali and exactly that volume of acid.' },
      { text: 'Heat the solution to **evaporate the water**. White crystals of sodium chloride are left.' },
    ],
    check: {
      id: 'c7',
      q: 'Why is the second run done WITHOUT the indicator?',
      options: [
        { val: 'A', text: 'The reaction goes faster without it' },
        { val: 'B', text: 'The indicator would stay in the salt as an impurity' },
        { val: 'C', text: 'The indicator would turn the salt blue for ever' },
      ],
      correct: 'B',
      expEn: 'The indicator is a separate chemical. If it were added again, it would be left in the dish with the sodium chloride, so the salt would not be pure. The first run has already told you the amounts.',
    },
  },

  // ── 13 · The solubility rules (sort) ───────────────────────────────────
  {
    layout: 'split',
    accent: AMBER,
    icon: 'Grid3x3',
    eyebrow: 'Book spread 11.7 · not all salts are soluble',
    title: 'The Solubility Rules',
    ratio: 40,
    inlineSvg: DIAGRAMS.SOLUBILITY_TABLE,
    content:
      'So far every salt **dissolved**, so we got it out by evaporating. But some salts are **insoluble**.',
    notes: [
      {
        tone: 'write',
        text: '**Always soluble:** sodium, potassium and ammonium salts, and all nitrates.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'sort',
      prompt: 'Soluble or insoluble? Use the rules in the table.',
      bins: [
        { id: 'sol', name: 'Soluble' },
        { id: 'insol', name: 'Insoluble' },
      ],
      cards: [
        { id: 'k2co3', name: 'potassium carbonate', bin: 'sol' },
        { id: 'pbcl2', name: 'lead(II) chloride', bin: 'insol' },
        { id: 'baso4', name: 'barium sulfate', bin: 'insol' },
        { id: 'znno3', name: 'zinc nitrate', bin: 'sol' },
        { id: 'caco3', name: 'calcium carbonate', bin: 'insol' },
        { id: 'nh4so4', name: 'ammonium sulfate', bin: 'sol' },
        { id: 'agbr', name: 'silver bromide', bin: 'insol' },
        { id: 'mgso4', name: 'magnesium sulfate', bin: 'sol' },
      ],
      explain: 'Potassium and ammonium salts and all nitrates are soluble. Magnesium sulfate is soluble — only calcium, barium and lead sulfates are not. Lead and silver halides are insoluble, and so is every carbonate except sodium, potassium and ammonium carbonate.',
    },
  },

  // ── 14 · EXTENDED: precipitation ───────────────────────────────────────
  {
    layout: 'split',
    accent: AMBER,
    icon: 'Layers',
    eyebrow: 'Extended',
    title: 'Making an Insoluble Salt by Precipitation',
    ratio: 50,
    inlineSvg: DIAGRAMS.PRECIP_PARTICLES,
    drawThis: true,
    content:
      '> $\\text{BaCl}_2(\\text{aq}) + \\text{MgSO}_4(\\text{aq}) \\rightarrow \\text{BaSO}_4(\\text{s}) + \\text{MgCl}_2(\\text{aq})$\n\n' +
      'Barium sulfate is **insoluble**, so it falls out as a solid.',
    notes: [
      {
        tone: 'write',
        text: '**Precipitation:** two solutions mix to give an insoluble **precipitate**.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Which two ions join to make the precipitate?',
      options: [
        { val: 'A', text: 'Mg²⁺ and Cl⁻' },
        { val: 'B', text: 'Ba²⁺ and Cl⁻' },
        { val: 'C', text: 'Ba²⁺ and SO₄²⁻' },
      ],
      correct: 'C',
      expEn: 'Barium sulfate is the insoluble product, so its ions — Ba²⁺ and SO₄²⁻ — are the ones that join. Magnesium chloride is soluble, so Mg²⁺ and Cl⁻ stay in the solution.',
    },
  },

  // ── 15 · EXTENDED: the steps ───────────────────────────────────────────
  {
    layout: 'split',
    accent: AMBER,
    icon: 'ListChecks',
    eyebrow: 'Extended',
    title: 'The Steps in Making Barium Sulfate',
    ratio: 36,
    inlineSvg: DIAGRAMS.PRECIP_METHOD,
    drawThis: true,
    content:
      '**1** Make up the two solutions and **mix** them. A white precipitate forms at once.\n' +
      '**2** **Filter.** The precipitate is trapped in the filter paper.\n' +
      '**3** **Rinse** it with distilled water.\n' +
      '**4** **Dry** it in a warm oven.',
    check: {
      id: 'c9',
      q: 'Why is the precipitate rinsed with DISTILLED water?',
      options: [
        { val: 'A', text: 'To wash off the solution left on it, without adding any new ions' },
        { val: 'B', text: 'To dissolve the precipitate so it can be filtered again' },
        { val: 'C', text: 'To cool it down before it goes into the oven' },
      ],
      correct: 'A',
      expEn: 'The wet precipitate is still coated in the solution of magnesium chloride. Rinsing washes it away. Distilled water is pure, so it adds no ions of its own. The precipitate is insoluble, so it does not dissolve.',
    },
  },

  // ── 16 · EXTENDED: choosing the two solutions ──────────────────────────
  {
    layout: 'split',
    accent: AMBER,
    icon: 'GitMerge',
    eyebrow: 'Extended',
    title: 'Choosing the Two Starting Solutions',
    content:
      '> To precipitate an insoluble salt, mix a solution of its **positive ions** with a solution of its **negative ions**.\n\n' +
      'Both starting compounds must be **soluble**. Barium nitrate and sodium sulfate also give barium sulfate: all that matters is that barium ions meet sulfate ions.',
    check: {
      id: 'c10',
      q: 'Which pair would you mix to make insoluble calcium carbonate?',
      options: [
        { val: 'A', text: 'Calcium nitrate solution and solid magnesium carbonate' },
        { val: 'B', text: 'Calcium carbonate and water' },
        { val: 'C', text: 'Calcium nitrate solution and sodium carbonate solution' },
      ],
      correct: 'C',
      expEn: 'Calcium nitrate is soluble (all nitrates are) and gives Ca²⁺ ions; sodium carbonate is soluble and gives CO₃²⁻ ions. Magnesium carbonate is insoluble, so it puts no carbonate ions into the solution.',
    },
  },

  // ── 17 · Which method? (sort) ──────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Route',
    eyebrow: 'Choosing the method',
    title: 'Which Method Makes This Salt?',
    content:
      '> **Insoluble salt?** Precipitation.\n' +
      '> **A sodium, potassium or ammonium salt?** Titration.\n' +
      '> **Any other soluble salt?** Excess metal, base or carbonate, then filter.',
    activity: {
      id: 'a6',
      type: 'sort',
      prompt: 'Which method would you use to make each salt?',
      bins: [
        { id: 'solid', name: 'Excess solid, then filter' },
        { id: 'titr', name: 'Titration' },
        { id: 'precip', name: 'Precipitation' },
      ],
      cards: [
        { id: 'kno3', name: 'potassium nitrate', bin: 'titr' },
        { id: 'na2so4', name: 'sodium sulfate', bin: 'titr' },
        { id: 'cuno3', name: 'copper(II) nitrate', bin: 'solid' },
        { id: 'zncl2', name: 'zinc chloride', bin: 'solid' },
        { id: 'mgso4', name: 'magnesium sulfate', bin: 'solid' },
        { id: 'agcl', name: 'silver chloride', bin: 'precip' },
        { id: 'baco3', name: 'barium carbonate', bin: 'precip' },
      ],
      explain: 'Silver chloride and barium carbonate are insoluble, so they are precipitated. Potassium and sodium salts come from an alkali, so they need a titration. Copper, zinc and magnesium salts are soluble and made from an excess of the metal, its oxide or its carbonate (never copper metal).',
    },
  },

  // ── 18 · EXTENDED: the ionic equation ──────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Scissors',
    eyebrow: 'Extended',
    title: 'The Ionic Equation for a Precipitation',
    ratio: 45,
    inlineSvg: DIAGRAMS.PRECIP_STRIKE,
    content:
      'The (aq) substances **split into ions**; the solid **stays whole**.\n\n' +
      '**Strike out the spectator ions**, $\\text{Mg}^{2+}$ and $\\text{Cl}^{-}$. **What is left is the ionic equation.**',
    notes: [
      {
        tone: 'write',
        text: '$\\text{Ba}^{2+}(\\text{aq}) + \\text{SO}_4^{2-}(\\text{aq}) \\rightarrow \\text{BaSO}_4(\\text{s})$',
      },
    ],
    activity: {
      id: 'a7',
      type: 'sort',
      prompt: 'Silver nitrate solution is mixed with potassium bromide solution, and cream silver bromide precipitates. Sort the four ions.',
      bins: [
        { id: 'part', name: 'Takes part' },
        { id: 'spec', name: 'Spectator ion' },
      ],
      cards: [
        { id: 'ag', name: 'Ag⁺', bin: 'part' },
        { id: 'no3', name: 'NO₃⁻', bin: 'spec' },
        { id: 'k', name: 'K⁺', bin: 'spec' },
        { id: 'br', name: 'Br⁻', bin: 'part' },
      ],
      explain: 'Ag⁺ and Br⁻ join to make the solid: Ag⁺(aq) + Br⁻(aq) → AgBr(s). K⁺ and NO₃⁻ are still in the solution afterwards, as potassium nitrate — they are the spectators.',
    },
  },

  // ── 19 · EXTENDED: precipitation at work ───────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Microscope',
    columns: 3,
    eyebrow: 'Extended',
    title: 'Precipitation at Work',
    content: 'Precipitation is used far outside the salt lab.',
    notes: [
      {
        tone: 'info',
        text: '**Lab tests.** Add silver nitrate solution to an unknown solution. A **pale yellow precipitate** shows it contains **iodide ions**.',
      },
      {
        tone: 'info',
        text: '**Clean water.** Ions of toxic metals such as **lead** and **mercury** are precipitated out of waste water.',
      },
      {
        tone: 'info',
        text: '**Pigments and film.** **Cadmium yellow** paint and the **silver bromide** on photographic film are made by precipitation.',
      },
    ],
    check: {
      id: 'c11',
      q: 'Why does precipitation help to clean waste water that contains lead ions?',
      options: [
        { val: 'A', text: 'The lead ions turn into water molecules' },
        { val: 'B', text: 'The lead ions dissolve better, so they wash away' },
        { val: 'C', text: 'The lead ions become part of an insoluble solid, which can be separated out' },
      ],
      correct: 'C',
      expEn: 'Adding the right negative ions turns the dissolved lead ions into an insoluble lead compound. A solid can be filtered or settled out of the water; dissolved ions cannot.',
    },
  },

  // ── 20 · Hydrated and anhydrous ────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplet',
    eyebrow: 'Book spread 11.7 · hydrated salts',
    title: 'Hydrated and Anhydrous Salts',
    ratio: 48,
    inlineSvg: DIAGRAMS.HYDRATED,
    drawThis: true,
    content:
      'Many salts have **water molecules bonded into their crystals**. $\\text{CuSO}_4{\\cdot}5\\text{H}_2\\text{O}$ has five for each copper ion and sulfate ion.\n\n' +
      'Heating drives the water off.',
    notes: [
      {
        tone: 'write',
        text: '**Hydrated:** with water bonded in its crystals. **Anhydrous:** without that water.',
      },
    ],
    check: {
      id: 'c12',
      q: 'Blue copper(II) sulfate crystals are heated strongly. What is left?',
      options: [
        { val: 'A', text: 'Blue anhydrous copper(II) sulfate' },
        { val: 'B', text: 'White anhydrous copper(II) sulfate' },
        { val: 'C', text: 'Copper metal and steam' },
      ],
      correct: 'B',
      expEn: 'Heating drives off the water bonded in the crystals. What is left is anhydrous copper(II) sulfate, a white powder. The blue colour needs the water: add water and it turns blue again.',
    },
  },

  // ── 21 · EXTENDED: water of crystallisation ────────────────────────────
  {
    layout: 'callout',
    accent: NEUTRAL,
    icon: 'Droplets',
    eyebrow: 'Extended',
    title: 'Water of Crystallisation',
    content:
      '> **Water of crystallisation:** the water bonded into the crystals of a hydrated salt.\n\n' +
      'In $\\text{CoSO}_4{\\cdot}7\\text{H}_2\\text{O}$ the dot separates it from the rest of the formula. It is usually left out when formulae are written.',
    check: {
      id: 'c13',
      q: 'Green nickel(II) sulfate crystals are NiSO₄·6H₂O. How many water molecules are there for each nickel ion?',
      options: [
        { val: 'A', text: '1' },
        { val: 'B', text: '12' },
        { val: 'C', text: '6' },
      ],
      correct: 'C',
      expEn: 'The 6 in front of H₂O counts water molecules: six for each NiSO₄, that is, for each nickel ion and sulfate ion. 12 is the number of hydrogen ATOMS in them.',
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
    content: '> In your notebook: **14 key words**, **4 methods**, the **solubility rules**, **1 ionic equation**.',
    items: [
      { text: 'Steps: acid + **excess metal**.' },
      { text: 'Which **metals** work.' },
      { text: 'Steps: an **insoluble base**.' },
      { text: 'Why an alkali needs **titration**.' },
      { text: '**Solubility rules**; **precipitation**.' },
      { text: '**Hydrated** and **anhydrous**.' },
    ],
    check: {
      id: 'c14',
      q: 'Which of these salts would you make by titration?',
      options: [
        { val: 'A', text: 'Potassium sulfate' },
        { val: 'B', text: 'Zinc sulfate' },
        { val: 'C', text: 'Lead(II) iodide' },
      ],
      correct: 'A',
      expEn: 'Potassium sulfate is soluble and comes from an alkali, potassium hydroxide, so the excess cannot be filtered off — it needs a titration. Zinc sulfate is made with excess zinc, zinc oxide or zinc carbonate. Lead(II) iodide is insoluble, so it is precipitated.',
    },
  },
];
