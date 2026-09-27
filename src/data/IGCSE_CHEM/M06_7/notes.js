// src/data/IGCSE_CHEM/M06_7/notes.js
// 6.7 Group 7: the Halogens — book spread 12.3 "Group VII: the halogens"
// (pages 150–151), with the reactivity explanation from 12.4 (page 152).
// English-only (this track is not bilingual), so there are no `vn*` twins.
//
// Wolsey writes "Group 7", the book writes "Group VII". Slide 2 says once that
// they are the same group; from then on the chemistry says Group VII, as the
// book does. (The `periodic` widget's own table numbers its columns 1–8, so
// slide 3 asks for "group 7".)
//
// The deck's spine follows the spread: what the halogens are → their colours
// and states → the boiling-point trend, and a prediction for astatine → iron
// wool, PREDICTED before it is shown → reactivity decreases down the group →
// the opposite of Group I → why they react alike → EXTENDED: why they are so
// reactive → with metals and with non-metals → displacement, each result
// PREDICTED first → the rule, applied to nine mixtures → the book's results
// table → EXTENDED: the ionic equation for a displacement → why reactivity
// falls, and a prediction for fluorine → a countable recap.
//
// The ionic-equation slide uses the SAME words as the Spectator Strike task
// (IONIC_EQ) and M06_2: "split into ions", "stay whole", "strike out the
// spectator ions", "what is left is the ionic equation". Its one new point is
// that a dissolved halogen, Cl₂(aq), is molecules and stays whole.
//
// "Why do they react in a similar way?" is Core here: the Chapter 12 Checkup
// lists "say why elements in a group react in a similar way" under Core. The
// electron-transfer reasons (why so reactive, why reactivity falls) are the
// Extended lines, and carry `eyebrow: 'Extended'`.
//
// Sized for a 1280×720 laptop: a split slide's text column is only ~400px wide
// beside its diagram, so each slide carries one equation, two short paragraphs
// and one copy-down note at most. Wide diagrams get the wide column (ratio 40).
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its slide
// — the audio generator narrates every field before it and stops there. Slide
// titles are read aloud, so they carry no bare formulae or Roman numerals.
// Chemical equations are KaTeX ($…$) with \text{} keeping symbols upright.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const SLATE = '#475569';
const HALOGEN = '#8a9a24';   // chlorine's yellow-green, darkened to carry white text
const BROMINE = '#7f2a10';   // bromine's red-brown

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: HALOGEN,
    icon: 'Atom',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.7 Group 7: the halogens',
    title: 'The Halogens',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'A nurse wipes your arm with **iodine** before a blood test. Pools are cleaned with **chlorine**. Why might two elements be good at the **same job**?',
    },
  },

  // ── 2 · Two names for one group ─────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Group Seven, Written Two Ways',
    content:
      '> **VII** is **7** in Roman numerals. Wolsey says **Group 7**; the book says **Group VII**. The **same group**.\n\n' +
      '**Halogen** is Greek for "salt-maker". With metals, halogens make salts called **halides**.',
    notes: [
      {
        tone: 'write',
        text: '**Halogens:** the elements of Group VII (Group 7).',
      },
    ],
    check: {
      id: 'c1',
      q: 'Your Wolsey notes say "Group 7". Your textbook says "Group VII". What is true?',
      options: [
        { val: 'A', text: 'They are two different groups, next to each other' },
        { val: 'B', text: 'They are the same group — VII is 7 in Roman numerals' },
        { val: 'C', text: 'Group VII is the group of noble gases' },
      ],
      correct: 'B',
      expEn: 'V is 5 and each I adds one, so VII is 7. Both names mean the halogens, the column just before the noble gases (Group VIII, or 0).',
    },
  },

  // ── 3 · Find them on the table ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Columns3',
    eyebrow: 'Your turn',
    title: 'Find the Halogens',
    label: 'Tap it',
    labelIcon: 'MousePointerClick',
    text: 'A **column** of **non-metals**, next to the noble gases.',
    activity: {
      id: 'a1',
      type: 'periodic',
      prompt: 'Tap every element in group 7.',
      query: { group: 7 },
      explain: 'Group 7 is the second-last column. In the first 20 elements it holds **fluorine (F)** and **chlorine (Cl)**. Below them, off this table, are **bromine (Br)**, **iodine (I)** and rare **astatine (At)**.',
    },
  },

  // ── 4 · Coloured, poisonous, diatomic ──────────────────────────────────
  {
    layout: 'split',
    accent: HALOGEN,
    icon: 'AlertTriangle',
    eyebrow: 'Book spread 12.3 · a non-metal group',
    title: 'Coloured, Poisonous and Diatomic',
    ratio: 42,
    inlineSvg: DIAGRAMS.THREE_HALOGENS,
    drawThis: true,
    content:
      'The halogens are all **different colours**, and all **poisonous**.\n\n' +
      'Each one is made of **diatomic** molecules: $\\text{Cl}_2$, $\\text{Br}_2$, $\\text{I}_2$. Bromine is a liquid, but it easily forms a **vapour**.',
    notes: [
      {
        tone: 'write',
        text: '**Diatomic:** a molecule made of **two atoms**, like $\\text{Cl}_2$.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which formula shows how the element bromine exists?',
      options: [
        { val: 'A', text: 'Br — single atoms' },
        { val: 'B', text: 'Br⁻ — ions' },
        { val: 'C', text: 'Br₂ — molecules of two atoms' },
      ],
      correct: 'C',
      expEn: 'Every halogen is diatomic: its atoms go around in pairs, so bromine is Br₂. Br⁻ is the bromide ion, found in compounds like potassium bromide — not in the element.',
    },
  },

  // ── 5 · Which halogen? ──────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Boxes',
    eyebrow: 'From memory',
    title: 'Which Halogen Is It?',
    content:
      'Each halogen has its own **colour** and its own **state** at room temperature. Picture the three jars, then sort.',
    notes: [
      {
        tone: 'write',
        text: '**chlorine** — pale yellow-green **gas** · **bromine** — red-brown **liquid** · **iodine** — grey-black **solid**',
      },
    ],
    activity: {
      id: 'a2',
      type: 'sort',
      prompt: 'Which halogen does each description belong to?',
      bins: [
        { id: 'cl', name: 'Chlorine' },
        { id: 'br', name: 'Bromine' },
        { id: 'i', name: 'Iodine' },
      ],
      cards: [
        { id: 'ygreen', name: 'pale yellow-green', bin: 'cl' },
        { id: 'gas', name: 'a gas at room temperature', bin: 'cl' },
        { id: 'redbrown', name: 'red-brown', bin: 'br' },
        { id: 'liquid', name: 'a liquid that easily forms a vapour', bin: 'br' },
        { id: 'greyblack', name: 'grey-black', bin: 'i' },
        { id: 'solid', name: 'a solid at room temperature', bin: 'i' },
      ],
      explain: 'Going down the group: **chlorine** is a pale yellow-green gas, **bromine** a red-brown liquid, **iodine** a grey-black solid. Gas → liquid → solid is itself a trend.',
    },
  },

  // ── 6 · Physical trends ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'TrendingUp',
    eyebrow: 'Trends in physical properties',
    title: 'Down the Group, Boiling Points and Density Rise',
    ratio: 50,
    inlineSvg: DIAGRAMS.BP_TREND,
    content:
      'Boiling point **increases** down the group, so the state goes gas → liquid → solid.\n\n' +
      '**Density** increases too: the atoms get much heavier ($A_r$ 35.5 → 80 → 127) but only a little bigger.',
    notes: [
      {
        tone: 'write',
        text: 'Going **down** Group VII, **boiling point** and **density** increase.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Room temperature is about 20 °C. Why is bromine a liquid, while chlorine is a gas?',
      options: [
        { val: 'A', text: 'Bromine is more reactive than chlorine' },
        { val: 'B', text: 'Bromine boils at 59 °C, above room temperature; chlorine boils at −35 °C, below it' },
        { val: 'C', text: 'Bromine molecules have one atom, chlorine molecules have two' },
      ],
      correct: 'B',
      expEn: 'A substance is a gas at room temperature if it has already boiled — its boiling point is below 20 °C. Chlorine (−35 °C) has; bromine (59 °C) has not. Both are diatomic, and bromine is LESS reactive than chlorine.',
    },
  },

  // ── 7 · Estimate: astatine ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Thermometer',
    eyebrow: 'Use the trend',
    title: 'Astatine, at the Bottom',
    label: 'Estimate',
    labelIcon: 'Target',
    text: 'The three above it boil at **−35**, **59** and **184 °C**.',
    activity: {
      id: 'a3',
      type: 'estimate',
      prompt: 'Use the trend to estimate the boiling point of astatine.',
      min: 0,
      max: 500,
      step: 5,
      unit: '°C',
      answer: 340,
      tolerance: 0.2,
      explain: 'The gaps grow: **+94**, then **+125**. The next gap should be bigger again, about +155, giving **about 340 °C**. No one has made enough astatine to measure it, so this is a prediction — which is what a trend is for. A boiling point that high means astatine is a **solid**.',
    },
  },

  // ── 8 · Predict: iron wool ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Which One Glows Brightest?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Hot iron wool goes into chlorine, then bromine vapour, then iodine vapour.',
    activity: {
      id: 'a4',
      type: 'predict',
      prompt: 'With which halogen will the iron wool glow most brightly?',
      options: [
        { val: 'cl', name: 'Chlorine' },
        { val: 'br', name: 'Bromine' },
        { val: 'i', name: 'Iodine' },
        { val: 'same', name: 'All the same — they are in one group' },
      ],
      correct: 'cl',
      explain: 'It is **chlorine**. The glow is bright with chlorine, weaker with bromine and only faint with iodine. The next slide shows what that tells you.',
    },
  },

  // ── 9 · Iron wool ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BROMINE,
    icon: 'Flame',
    eyebrow: 'Trends in chemical properties',
    title: 'Iron Wool and the Three Halogens',
    ratio: 55,
    inlineSvg: DIAGRAMS.IRON_WOOL,
    drawThis: true,
    content:
      'Products: **FeCl₃** (yellow), **FeBr₃** (red-brown), **FeI₃** (black). The glow gets **fainter** down the group.',
    notes: [
      {
        tone: 'write',
        text: '**Halide:** a compound of a halogen with another element, e.g. iron(III) chloride.',
      },
    ],
    check: {
      id: 'c4',
      q: 'The glow is bright with chlorine and only faint with iodine. What does this tell you?',
      options: [
        { val: 'A', text: 'Iodine gives out more heat than chlorine' },
        { val: 'B', text: 'Iron is not reacting with iodine at all' },
        { val: 'C', text: 'Chlorine reacts more vigorously than iodine — it is more reactive' },
      ],
      correct: 'C',
      expEn: 'A brighter glow means a more vigorous reaction, giving out more heat. Iodine does still react — it makes iron(III) iodide — but less vigorously, so it is less reactive.',
    },
  },

  // ── 10 · Reactivity decreases ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'ArrowDownUp',
    eyebrow: 'The big trend',
    title: 'Reactivity Decreases Down the Group',
    content:
      'Iron wool showed it: chlorine reacts hardest, iodine least. The same pattern runs through the **whole** group, from top to bottom.',
    notes: [
      {
        tone: 'write',
        text: '**Reactivity decreases** as you go **down** Group VII.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'order',
      prompt: 'Put all five halogens in order of reactivity, MOST reactive first.',
      steps: [
        { id: 'f', name: 'Fluorine' },
        { id: 'cl', name: 'Chlorine' },
        { id: 'br', name: 'Bromine' },
        { id: 'i', name: 'Iodine' },
        { id: 'at', name: 'Astatine' },
      ],
      explain: 'Reactivity decreases down the group, so the order is the group\'s own order: **fluorine** (top, the most reactive non-metal of all), chlorine, bromine, iodine, **astatine** (bottom).',
    },
  },

  // ── 11 · The opposite of Group I ───────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Compare with topic 6.6',
    title: 'The Opposite of Group One',
    ratio: 48,
    inlineSvg: DIAGRAMS.TRENDS_I_VS_VII,
    content:
      'In **Group I**, reactivity **increases** down the group. In **Group VII** it **decreases**.\n\n' +
      'Alkali metals react by **losing** an electron; halogens by **gaining** one.',
    check: {
      id: 'c5',
      q: 'Which is the more reactive of each pair: sodium or potassium? chlorine or iodine?',
      options: [
        { val: 'A', text: 'Potassium, and chlorine' },
        { val: 'B', text: 'Sodium, and iodine' },
        { val: 'C', text: 'Potassium, and iodine — lower is always more reactive' },
      ],
      correct: 'A',
      expEn: 'In Group I the lower metal, potassium, is more reactive. In Group VII the trend runs the other way, so the higher halogen, chlorine, is more reactive. "Lower is more reactive" is only true for Group I.',
    },
  },

  // ── 12 · Why they react alike ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Why do they react in a similar way?',
    title: 'Seven Electrons in the Outer Shell',
    ratio: 45,
    inlineSvg: DIAGRAMS.SHELLS_F_CL,
    drawThis: true,
    content:
      'Fluorine is **2,7**; chlorine is **2,8,7**. Different numbers of shells — but the **same 7 electrons** in the outer shell. So do bromine and iodine.',
    notes: [
      {
        tone: 'write',
        text: 'Atoms with the same number of **outer shell electrons** react in a similar way.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Why do chlorine and iodine react in a similar way?',
      options: [
        { val: 'A', text: 'Their atoms have the same number of shells' },
        { val: 'B', text: 'Their atoms both have 7 outer-shell electrons' },
        { val: 'C', text: 'They are both gases at room temperature' },
      ],
      correct: 'B',
      expEn: 'Elements in one group have the same number of outer-shell electrons — 7 for every halogen — and it is the outer electrons that take part in reactions. Iodine has more shells than chlorine, and it is a solid.',
    },
  },

  // ── 13 · EXTENDED: why so reactive ─────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Magnet',
    eyebrow: 'Extended',
    title: 'Why Are the Halogens So Reactive?',
    ratio: 48,
    inlineSvg: DIAGRAMS.GAIN_ELECTRON,
    content:
      'A halogen atom needs only **one** more electron for a full outer shell of 8. So it has a very strong drive to **gain** one from other atoms.',
    notes: [
      {
        tone: 'write',
        text: '**Halide ion:** a halogen atom that has gained one electron. Charge **1−**: Cl⁻, Br⁻, I⁻.',
      },
    ],
    check: {
      id: 'c7',
      q: 'A chlorine atom (2,8,7) gains one electron. What does it become?',
      options: [
        { val: 'A', text: 'A chloride ion, Cl⁻, with electrons 2,8,8' },
        { val: 'B', text: 'A chloride ion, Cl⁺, with electrons 2,8,8' },
        { val: 'C', text: 'An atom of argon, 2,8,8' },
      ],
      correct: 'A',
      expEn: 'One extra electron fills the outer shell (2,8,8) and gives one more negative charge than protons: Cl⁻. Gaining electrons never makes a positive ion, and the nucleus is still chlorine\'s — 17 protons — so it is not argon.',
    },
  },

  // ── 14 · With metals, with non-metals ─────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'GitCompare',
    eyebrow: 'Two kinds of product',
    title: 'With Metals and With Non-Metals',
    columns: [
      {
        heading: 'With metals: ionic',
        accent: BROMINE,
        icon: 'Magnet',
        content: 'Halogen atoms **accept electrons** from the metal and become **halide ions**. The product is an **ionic compound**: $\\text{FeCl}_3$ is $\\text{Fe}^{3+}$ and $\\text{Cl}^{-}$ ions.',
      },
      {
        heading: 'With non-metals: covalent',
        accent: TEAL,
        icon: 'Link',
        content: 'Halogen atoms **share** electrons. The product is made of **molecules** with covalent bonds, like hydrogen chloride, $\\text{HCl}$.',
      },
    ],
    activity: {
      id: 'a6',
      type: 'sort',
      prompt: 'What kind of product does each pair make?',
      bins: [
        { id: 'ionic', name: 'Ionic — halide ions form' },
        { id: 'cov', name: 'Covalent — electrons are shared' },
      ],
      cards: [
        { id: 'nabr', name: 'sodium + bromine', bin: 'ionic' },
        { id: 'hcl', name: 'hydrogen + chlorine', bin: 'cov' },
        { id: 'mgi', name: 'magnesium + iodine', bin: 'ionic' },
        { id: 'ccl', name: 'carbon + chlorine', bin: 'cov' },
        { id: 'kcl', name: 'potassium + chlorine', bin: 'ionic' },
        { id: 'hi', name: 'hydrogen + iodine', bin: 'cov' },
      ],
      explain: 'Look at the partner. Sodium, magnesium and potassium are **metals**, so the halogen takes their electrons and ions form. Hydrogen and carbon are **non-metals**, so the atoms share electrons and make molecules.',
    },
  },

  // ── 15 · Predict: chlorine water + potassium bromide ──────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'A Halogen Meets a Halide',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: '**Chlorine water** — chlorine dissolved in water, pale yellow — is added to colourless **potassium bromide** solution.',
    activity: {
      id: 'a7',
      type: 'predict',
      prompt: 'What will you see?',
      options: [
        { val: 'none', name: 'Nothing — halogens do not react with halides' },
        { val: 'orange', name: 'The mixture turns orange' },
        { val: 'ppt', name: 'A white solid forms' },
        { val: 'gas', name: 'Bubbles of gas' },
      ],
      correct: 'orange',
      explain: 'It turns **orange**. Something new has appeared in the solution — the next slide shows what it is, and where it came from.',
    },
  },

  // ── 16 · Displacement ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BROMINE,
    icon: 'TestTube',
    eyebrow: 'How the halogens react with halides',
    title: 'Chlorine Pushes Bromine Out',
    ratio: 55,
    inlineSvg: DIAGRAMS.DISPLACEMENT_TUBE,
    drawThis: true,
    content:
      '> $\\text{Cl}_2(\\text{aq}) + 2\\text{KBr}(\\text{aq}) \\rightarrow 2\\text{KCl}(\\text{aq}) + \\text{Br}_2(\\text{aq})$\n\n' +
      'The **orange** is bromine, pushed out by the more reactive chlorine.',
    notes: [
      {
        tone: 'write',
        text: '**Displace:** to push an element out of its compound and take its place.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Chlorine water is added to potassium iodide solution, and it turns red-brown. What makes the colour?',
      options: [
        { val: 'A', text: 'Iodine, pushed out of the potassium iodide' },
        { val: 'B', text: 'Potassium chloride, which is red-brown' },
        { val: 'C', text: 'Chlorine, which turns red-brown in water' },
      ],
      correct: 'A',
      expEn: 'Chlorine displaces iodine: Cl₂ + 2KI → 2KCl + I₂. Iodine in solution is red-brown. Potassium chloride solution is colourless, and chlorine water is pale yellow.',
    },
  },

  // ── 17 · Predict: bromine + chloride ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Now Swap Them Round',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Orange **bromine water** is added to colourless **potassium chloride** solution.',
    activity: {
      id: 'a8',
      type: 'predict',
      prompt: 'Will bromine displace chlorine from the chloride?',
      options: [
        { val: 'yes', name: 'Yes — chlorine is pushed out, and the colour changes' },
        { val: 'no', name: 'No — nothing happens, the mixture just stays orange' },
      ],
      correct: 'no',
      explain: '**No change.** Bromine is **less** reactive than chlorine, so it cannot push chlorine out. Displacement only works one way round.',
    },
  },

  // ── 18 · The rule, applied ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'The rule',
    title: 'Only a More Reactive Halogen Can Displace',
    content:
      'Reactivity: **chlorine > bromine > iodine**. Use it to decide every mixture.',
    notes: [
      {
        tone: 'write',
        text: 'A halogen will **displace** a **less reactive** halogen from a solution of its halide.',
      },
    ],
    activity: {
      id: 'a9',
      type: 'sort',
      prompt: 'Each halogen solution is added to each sodium halide solution. Does a reaction happen?',
      bins: [
        { id: 'yes', name: 'Reaction — a halogen is displaced' },
        { id: 'no', name: 'No change' },
      ],
      cards: [
        { id: 'cl_cl', name: 'Cl₂ + NaCl', bin: 'no' },
        { id: 'cl_br', name: 'Cl₂ + NaBr', bin: 'yes' },
        { id: 'cl_i', name: 'Cl₂ + NaI', bin: 'yes' },
        { id: 'br_cl', name: 'Br₂ + NaCl', bin: 'no' },
        { id: 'br_br', name: 'Br₂ + NaBr', bin: 'no' },
        { id: 'br_i', name: 'Br₂ + NaI', bin: 'yes' },
        { id: 'i_cl', name: 'I₂ + NaCl', bin: 'no' },
        { id: 'i_br', name: 'I₂ + NaBr', bin: 'no' },
        { id: 'i_i', name: 'I₂ + NaI', bin: 'no' },
      ],
      explain: 'Only **three** react: chlorine with a bromide or an iodide, and bromine with an iodide. Iodine displaces nothing — it is the least reactive. And a halogen with its **own** halide has nothing to swap.',
    },
  },

  // ── 19 · The results table ────────────────────────────────────────────
  {
    layout: 'split',
    accent: BROMINE,
    icon: 'Grid3x3',
    eyebrow: 'Book spread 12.3 · the results',
    title: 'The Whole Results Table',
    ratio: 38,
    inlineSvg: DIAGRAMS.RESULTS_GRID,
    content:
      'The book\'s table has every result you just sorted. Each **orange** or **red-brown** box is a halogen being **displaced**.\n\n' +
      'The results **confirm** the order of reactivity: chlorine > bromine > iodine.',
    check: {
      id: 'c9',
      q: 'Which row of the table has a reaction in BOTH of its boxes?',
      options: [
        { val: 'A', text: 'The chloride row' },
        { val: 'B', text: 'The bromide row' },
        { val: 'C', text: 'The iodide row' },
      ],
      correct: 'C',
      expEn: 'Iodine is the least reactive halogen, so BOTH chlorine and bromine can displace it from an iodide. Nothing can displace chlorine from a chloride, because nothing in the table is more reactive than chlorine.',
    },
  },

  // ── 20 · EXTENDED: the ionic equation for a displacement ──────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Scissors',
    eyebrow: 'Extended',
    title: 'The Ionic Equation for a Displacement',
    content:
      'Chlorine water + potassium bromide: KBr and KCl **split into ions**. Cl₂ and Br₂ are molecules, so they **stay whole**, even in water.\n\n' +
      '> $\\text{Cl}_2 + 2\\text{K}^{+} + 2\\text{Br}^{-} \\rightarrow 2\\text{K}^{+} + 2\\text{Cl}^{-} + \\text{Br}_2$\n\n' +
      '**Strike out the spectator ions** ($\\text{K}^{+}$). **What is left is the ionic equation.**',
    notes: [
      {
        tone: 'write',
        text: '$\\text{Cl}_2(\\text{aq}) + 2\\text{Br}^{-}(\\text{aq}) \\rightarrow 2\\text{Cl}^{-}(\\text{aq}) + \\text{Br}_2(\\text{aq})$',
      },
    ],
    activity: {
      id: 'a10',
      type: 'sort',
      prompt: 'In a displacement, does each substance split into ions, or stay whole?',
      bins: [
        { id: 'split', name: 'Split into ions' },
        { id: 'whole', name: 'Stay whole' },
      ],
      cards: [
        { id: 'nai', name: 'NaI(aq)', bin: 'split' },
        { id: 'i2', name: 'I₂(aq)', bin: 'whole' },
        { id: 'licl', name: 'LiCl(aq)', bin: 'split' },
        { id: 'cl2', name: 'Cl₂(aq)', bin: 'whole' },
        { id: 'kbr', name: 'KBr(aq)', bin: 'split' },
        { id: 'br2', name: 'Br₂(aq)', bin: 'whole' },
      ],
      explain: 'The halides — NaI, LiCl, KBr — are ionic compounds, so dissolved they **split into ions**. A dissolved halogen is still made of X₂ **molecules**, so it **stays whole**. (aq) alone does not decide it.',
    },
  },

  // ── 21 · EXTENDED: why reactivity falls, and fluorine ──────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Orbit',
    eyebrow: 'Extended',
    title: 'Why Reactivity Falls Down the Group',
    ratio: 50,
    inlineSvg: DIAGRAMS.PULL_DISTANCE,
    content:
      'Going down, atoms have **more shells**, so the outer shell is **further from** the positive nucleus. Its pull on a new electron is **weaker**.',
    notes: [
      {
        tone: 'write',
        text: 'Down Group VII, an electron is **harder to attract**, so reactivity **decreases**.',
      },
    ],
    check: {
      id: 'c10',
      q: 'Fluorine (2,7) is above chlorine (2,8,7) in Group VII. Which prediction is correct?',
      options: [
        { val: 'A', text: 'It is less reactive than chlorine, because it has fewer shells' },
        { val: 'B', text: 'It is a solid, because it is at the top of the group' },
        { val: 'C', text: 'It is more reactive than chlorine, because its outer shell is closer to the nucleus' },
      ],
      correct: 'C',
      expEn: 'Fewer shells means the outer shell is closer to the nucleus, so the pull on a new electron is stronger — fluorine is the most reactive halogen of all. Boiling points rise DOWN the group, so fluorine, at the top, is a gas.',
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
    content: '> Notebook: **13 key words**, **3 trends**, **1 rule**, **1 ionic equation**, **4 drawings**.',
    items: [
      { text: 'The **three halogens** at 20 °C.' },
      { text: 'Trends in **boiling point**, **density**.' },
      { text: '**Iron wool** in each halogen.' },
      { text: '**Reactivity**, and **Group I**.' },
      { text: 'Predict a **displacement**.' },
      { text: 'Explain it with **shells**.' },
    ],
    check: {
      id: 'c11',
      q: 'Bromine water is added to lithium iodide solution. Which is the correct equation?',
      options: [
        { val: 'A', text: 'Br₂ + 2LiI → 2LiBr + I₂' },
        { val: 'B', text: 'I₂ + 2LiBr → 2LiI + Br₂' },
        { val: 'C', text: 'Br + LiI → LiBr + I' },
      ],
      correct: 'A',
      expEn: 'Bromine is more reactive than iodine, so it displaces it: the products are lithium bromide and iodine. (B) runs the reaction backwards, which cannot happen. (C) forgets that halogens are diatomic: Br₂ and I₂.',
    },
  },
];
