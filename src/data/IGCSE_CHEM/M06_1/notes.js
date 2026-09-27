// src/data/IGCSE_CHEM/M06_1/notes.js
// 6.1 Acids, Bases and Alkalis — book spreads 11.1 "Acids and bases" and 11.2
// "A closer look at acids and alkalis". English-only (this track is not
// bilingual), so there are no `vn*` twins.
//
// The deck's spine follows the two spreads: a starter → the four lab acids →
// dilute, concentrated and corrosive → acids you eat and drink → bases → the
// alkalis, the soluble bases → an English slide (acid / acidic, alkali /
// alkaline) → litmus → the indicator table, then a sort of its colours → what
// all acids have in common (H⁺) → what all alkalis have in common (OH⁻) → the pH
// scale → an ESTIMATE of stomach pH → a sort by pH → universal indicator and
// the pH meter (an ORDER of its colours) → EXTENDED: a PREDICT before the
// strong / weak reveal → strong and weak acids → the two-way arrow → strength
// is not concentration → a countable recap.
//
// It stops before 6.2: no reactions of acids, no salts, no neutralisation.
//
// Sized for a 1280×720 laptop: a split slide's text column is only ~400px wide
// beside its diagram, so each slide carries one equation, two short paragraphs
// and one copy-down note at most.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its slide
// — the audio generator narrates every field before it and stops there. Slide
// titles are read aloud, so they carry no bare formulae or symbols. Chemical
// equations are KaTeX ($…$) with \text{} keeping element symbols upright.
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
    icon: 'Droplets',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.1 Acids, bases and alkalis',
    title: 'Acids, Bases and Alkalis',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Lemon juice, vinegar and cola all taste **sharp** or **sour**. In one sentence — what do you think they have in common? (Never taste anything in the lab!)',
    },
  },

  // ── 2 · The four lab acids ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'FlaskConical',
    eyebrow: 'Book spread 11.1',
    title: 'The Four Acids in the Lab',
    ratio: 42,
    inlineSvg: DIAGRAMS.LAB_ACIDS,
    content:
      'Acids are **non-metal compounds** that give acidic solutions in **water**.\n\n' +
      'You will meet these four again and again. **Ethanoic acid** is the acid in vinegar.',
    notes: [
      {
        tone: 'write',
        text: '**The four lab acids:** sulfuric $\\text{H}_2\\text{SO}_4$ · hydrochloric $\\text{HCl}$ · nitric $\\text{HNO}_3$ · ethanoic $\\text{CH}_3\\text{COOH}$.',
      },
    ],
    check: {
      id: 'c1',
      q: 'Which is the formula of nitric acid?',
      options: [
        { val: 'A', text: 'H₂SO₄' },
        { val: 'B', text: 'HNO₃' },
        { val: 'C', text: 'NH₃' },
      ],
      correct: 'B',
      expEn: 'Nitric acid is HNO₃: hydrogen, nitrogen and three oxygens. H₂SO₄ is sulfuric acid, and NH₃ is ammonia — it has nitrogen, but it is not an acid.',
    },
  },

  // ── 3 · Dilute, concentrated, corrosive ────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'AlertTriangle',
    eyebrow: 'Handle with care',
    title: 'Dilute, Concentrated and Corrosive',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.CORROSIVE,
    content:
      'An acid can be **dilute** (a little acid in a lot of water) or **concentrated** (a lot of acid in a little water).\n\n' +
      'Concentrated acids are **corrosive**: they eat away metals, cloth and skin. Some, like ethanoic acid, corrode only slowly.',
    notes: [
      {
        tone: 'write',
        text: '**Corrosive:** able to attack and eat away skin, metals and other materials.',
      },
    ],
    check: {
      id: 'c2',
      q: 'A bottle holds a lot of acid in very little water. How is the acid described?',
      options: [
        { val: 'A', text: 'Dilute' },
        { val: 'B', text: 'Neutral' },
        { val: 'C', text: 'Concentrated' },
      ],
      correct: 'C',
      expEn: 'Concentrated means a lot of acid in a little water. Dilute is the opposite: a little acid in a lot of water. Neutral is not a word for an acid at all.',
    },
  },

  // ── 4 · Acids you eat and drink ────────────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Coffee',
    columns: 3,
    eyebrow: 'Acids in everyday life',
    title: 'Acids You Eat and Drink',
    content: 'Many acids are not in the lab at all. They give food its **sharp** taste.',
    notes: [
      {
        tone: 'info',
        text: '**Lemons and oranges** contain **citric acid**.',
      },
      {
        tone: 'info',
        text: '**Yoghurt** and sour milk contain **lactic acid**.',
      },
      {
        tone: 'info',
        text: '**Fizzy drinks** contain **carbonic acid**: carbon dioxide dissolved in water under pressure.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Milk that has gone sour tastes sharp. Which acid is responsible?',
      options: [
        { val: 'A', text: 'Lactic acid' },
        { val: 'B', text: 'Citric acid' },
        { val: 'C', text: 'Carbonic acid' },
      ],
      correct: 'A',
      expEn: 'Sour milk and yoghurt contain lactic acid. Citric acid is in lemons and oranges, and carbonic acid is in fizzy drinks.',
    },
  },

  // ── 5 · Bases ───────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Beaker',
    eyebrow: 'Book spread 11.1',
    title: 'Bases: Oxides and Hydroxides of Metals',
    content:
      '**Bases** are the oxides and hydroxides of **metals**, like calcium oxide $\\text{CaO}$, magnesium oxide $\\text{MgO}$ and magnesium hydroxide $\\text{Mg(OH)}_2$.\n\n' +
      'The hydroxides all have **OH** in their formulae. Most bases do **not** dissolve in water.',
    notes: [
      {
        tone: 'write',
        text: '**Base:** an oxide or a hydroxide of a metal.',
      },
    ],
    activity: {
      id: 'a1',
      type: 'sort',
      prompt: 'Is each substance a base?',
      bins: [
        { id: 'yes', name: 'A base' },
        { id: 'no', name: 'Not a base' },
      ],
      cards: [
        { id: 'cuo', name: 'copper(II) oxide', bin: 'yes' },
        { id: 'koh', name: 'potassium hydroxide', bin: 'yes' },
        { id: 'fe2o3', name: 'iron(III) oxide', bin: 'yes' },
        { id: 'hno3', name: 'nitric acid', bin: 'no' },
        { id: 'co2', name: 'carbon dioxide', bin: 'no' },
        { id: 'sugar', name: 'sugar', bin: 'no' },
      ],
      explain: 'Only the oxides and hydroxides of **metals** are bases — copper, potassium and iron are metals. Carbon is a non-metal, so carbon dioxide is not a base. Nitric acid is an acid, and sugar is neither.',
    },
  },

  // ── 6 · Alkalis ─────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Droplets',
    eyebrow: 'Book spread 11.1',
    title: 'Alkalis Are the Soluble Bases',
    ratio: 40,
    inlineSvg: DIAGRAMS.BASES_ALKALIS,
    content:
      'A few bases **dissolve** in water. These are the **alkalis**: $\\text{NaOH}$, $\\text{KOH}$ and $\\text{Ca(OH)}_2$.\n\n' +
      'Calcium hydroxide is only slightly soluble. Its solution is called **limewater**. Alkalis are corrosive too.',
    notes: [
      {
        tone: 'write',
        text: '**Alkali:** a base that dissolves in water.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Copper(II) oxide is a base, but it is NOT an alkali. Why?',
      options: [
        { val: 'A', text: 'It does not dissolve in water' },
        { val: 'B', text: 'It is not the oxide of a metal' },
        { val: 'C', text: 'It has no hydroxide in its name' },
      ],
      correct: 'A',
      expEn: 'An alkali is a base that dissolves in water. Copper(II) oxide is a metal oxide, so it is a base — but it is insoluble, so it is not an alkali. Oxides can be bases too; they do not need "hydroxide" in the name.',
    },
  },

  // ── 7 · English: acid / acidic, alkali / alkaline ──────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Acid or Acidic? Alkali or Alkaline?',
    columns: [
      {
        heading: 'Nouns: the substance',
        accent: ACID,
        icon: 'FlaskConical',
        content: 'Use **a** or **an** in front: **an acid**, **an alkali**, **a base**.\n\n"Nitric acid is **an acid**."',
        notes: [
          { tone: 'write', text: '**Nouns:** an acid · an alkali · a base' },
        ],
      },
      {
        heading: 'Adjectives: describe a solution',
        accent: ALKALI,
        icon: 'Droplets',
        content: 'No **a** or **an** in front: **acidic**, **alkaline**, **neutral** (neither).\n\n"Limewater is **alkaline**."',
        notes: [
          { tone: 'write', text: '**Adjectives:** acidic · alkaline · neutral' },
        ],
      },
    ],
    check: {
      id: 'c5',
      q: 'Which sentence is written correctly?',
      options: [
        { val: 'A', text: 'Vinegar is an acidic.' },
        { val: 'B', text: 'Limewater is alkaline.' },
        { val: 'C', text: 'Limewater is an alkaline.' },
      ],
      correct: 'B',
      expEn: '"Alkaline" and "acidic" are adjectives, so they take no "a" or "an". You could also say "Limewater is an alkali" — "alkali" is the noun.',
    },
  },

  // ── 8 · The litmus test ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'TestTube',
    eyebrow: 'Book spread 11.1 · the litmus test',
    title: 'The Litmus Test',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.LITMUS,
    drawThis: true,
    content:
      '**Litmus** is a purple dye made from lichens. It is used as a solution, or soaked into paper.\n\n' +
      '> **Acids turn litmus red. Alkalis turn litmus blue.**',
    notes: [
      {
        tone: 'write',
        text: '**Indicator:** a substance whose colour shows whether a solution is acidic or alkaline.',
      },
    ],
    check: {
      id: 'c6',
      q: 'A drop of a solution turns red litmus paper blue. What is the solution?',
      options: [
        { val: 'A', text: 'An acid' },
        { val: 'B', text: 'Neutral' },
        { val: 'C', text: 'An alkali' },
      ],
      correct: 'C',
      expEn: 'Alkalis turn litmus blue. An acid would leave red litmus red, and a neutral solution does not change either colour of litmus.',
    },
  },

  // ── 9 · The indicator table ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Eye',
    eyebrow: 'Book spread 11.1 · indicators',
    title: 'Three Indicators, Two Colours Each',
    ratio: 45,
    inlineSvg: DIAGRAMS.INDICATOR_TABLE,
    drawThis: true,
    content:
      'Litmus is not the only indicator. **Methyl orange** and **thymolphthalein** are used only as solutions.\n\n' +
      'Each one has one colour in an acid and another in an alkali.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the table: three indicators, six colours.',
      },
    ],
    check: {
      id: 'c7',
      q: 'Use the table. Which indicator turns yellow in an alkali?',
      options: [
        { val: 'A', text: 'Litmus' },
        { val: 'B', text: 'Methyl orange' },
        { val: 'C', text: 'Thymolphthalein' },
      ],
      correct: 'B',
      expEn: 'Methyl orange is red in an acid and yellow in an alkali. Litmus turns blue in an alkali, and so does thymolphthalein.',
    },
  },

  // ── 10 · Sort the indicator colours ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'From memory — no table this time',
    title: 'What Does Each Colour Tell You?',
    label: 'Sort',
    labelIcon: 'ListChecks',
    text: 'Each card is one indicator result. Did it come from an acid or an alkali?',
    activity: {
      id: 'a2',
      type: 'sort',
      prompt: 'Sort each indicator result: acid or alkali?',
      bins: [
        { id: 'acid', name: 'An acid' },
        { id: 'alk', name: 'An alkali' },
      ],
      cards: [
        { id: 'lit_r', name: 'litmus turns red', bin: 'acid' },
        { id: 'mo_y', name: 'methyl orange turns yellow', bin: 'alk' },
        { id: 'thy_c', name: 'thymolphthalein stays colourless', bin: 'acid' },
        { id: 'thy_b', name: 'thymolphthalein turns blue', bin: 'alk' },
        { id: 'mo_r', name: 'methyl orange turns red', bin: 'acid' },
        { id: 'lit_b', name: 'litmus turns blue', bin: 'alk' },
      ],
      explain: 'In an **acid**: litmus red, methyl orange red, thymolphthalein colourless. In an **alkali**: litmus blue, methyl orange yellow, thymolphthalein blue. Notice that two of the three indicators turn blue in an alkali.',
    },
  },

  // ── 11 · What all acids have in common ─────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Atom',
    eyebrow: 'Book spread 11.2',
    title: 'What All Acids Have in Common',
    ratio: 46,
    inlineSvg: DIAGRAMS.ION_BADGES,
    content:
      'In water, hydrogen chloride molecules **dissociate**: they break up into ions.\n\n' +
      '> $\\text{HCl}(\\text{aq}) \\rightarrow \\text{H}^{+}(\\text{aq}) + \\text{Cl}^{-}(\\text{aq})$',
    notes: [
      {
        tone: 'write',
        text: '**Solutions of acids contain hydrogen ions,** $\\text{H}^{+}$.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Hydrogen chloride gas dissolves in water. What happens to its molecules?',
      options: [
        { val: 'A', text: 'They stay as whole molecules' },
        { val: 'B', text: 'They turn into hydrogen gas and chlorine gas' },
        { val: 'C', text: 'They dissociate into H⁺ and Cl⁻ ions' },
      ],
      correct: 'C',
      expEn: 'In water, hydrogen chloride dissociates: HCl(aq) → H⁺(aq) + Cl⁻(aq). The H⁺ ions are what make the solution acidic. No gases are made.',
    },
  },

  // ── 12 · What all alkalis have in common ───────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'Droplet',
    eyebrow: 'Book spread 11.2',
    title: 'What All Alkalis Have in Common',
    content:
      'Sodium hydroxide is an ionic solid. When it dissolves, its ions **separate**:\n\n' +
      '> $\\text{NaOH}(\\text{aq}) \\rightarrow \\text{Na}^{+}(\\text{aq}) + \\text{OH}^{-}(\\text{aq})$\n\n' +
      'The same is true of every alkali.',
    notes: [
      {
        tone: 'write',
        text: '**Solutions of alkalis contain hydroxide ions,** $\\text{OH}^{-}$.',
      },
    ],
    check: {
      id: 'c9',
      q: 'Lithium hydroxide dissolves in water. Which ion makes its solution alkaline?',
      options: [
        { val: 'A', text: 'The hydroxide ion, OH⁻' },
        { val: 'B', text: 'The lithium ion, Li⁺' },
        { val: 'C', text: 'The hydrogen ion, H⁺' },
      ],
      correct: 'A',
      expEn: 'Every alkaline solution contains hydroxide ions, OH⁻ — they make it alkaline. Li⁺ is just the metal ion, and H⁺ is the ion that makes a solution acidic.',
    },
  },

  // ── 13 · The pH scale ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Gauge',
    eyebrow: 'Book spread 11.2 · the pH scale',
    title: 'A Scale From 0 to 14',
    ratio: 40,
    inlineSvg: DIAGRAMS.PH_SCALE,
    drawThis: true,
    content:
      'The **pH scale** says **how** acidic or alkaline a solution is.\n\n' +
      'The **more** $\\text{H}^{+}$ ions, the **lower** the pH. The more $\\text{OH}^{-}$ ions, the higher the pH.',
    notes: [
      {
        tone: 'write',
        text: '**Acidic:** pH less than 7. **Neutral:** exactly 7. **Alkaline:** more than 7.',
      },
    ],
    check: {
      id: 'c10',
      q: 'The concentration of H⁺ ions in a solution goes up. What happens to its pH?',
      options: [
        { val: 'A', text: 'It goes up' },
        { val: 'B', text: 'It goes down' },
        { val: 'C', text: 'It stays at 7' },
      ],
      correct: 'B',
      expEn: 'More H⁺ ions means a more acidic solution, and a more acidic solution has a LOWER pH. That feels backwards at first — so learn it: the more H⁺, the lower the pH.',
    },
  },

  // ── 14 · Estimate: the pH of stomach acid ──────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Estimate first',
    title: 'How Acidic Is Your Stomach?',
    label: 'Estimate',
    labelIcon: 'MessageSquare',
    text: 'Your stomach makes hydrochloric acid to help digest protein. Its lining stops the acid leaking out.',
    activity: {
      id: 'a3',
      type: 'estimate',
      prompt: 'Estimate the pH inside your stomach.',
      min: 0,
      max: 14,
      step: 0.5,
      answer: 2,
      tolerance: 0.5,
      explain: 'About **pH 2** — strongly acidic, close to lemon juice. Anywhere from 1 to 3 counts. The acid is dilute, but it is still strong enough to attack protein, which is its job.',
    },
  },

  // ── 15 · Acidic, neutral or alkaline? ──────────────────────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Scale',
    eyebrow: 'Using the scale',
    title: 'Acidic, Neutral or Alkaline?',
    content:
      'Read the number, then use the rule:\n\n' +
      '> below 7 **acidic** · exactly 7 **neutral** · above 7 **alkaline**\n\n' +
      'Pure water is neutral. So is a solution of sugar.',
    activity: {
      id: 'a4',
      type: 'sort',
      prompt: 'Sort each solution by its pH.',
      bins: [
        { id: 'acid', name: 'Acidic' },
        { id: 'neut', name: 'Neutral' },
        { id: 'alk', name: 'Alkaline' },
      ],
      cards: [
        { id: 'lemon', name: 'lemon juice, pH 2.5', bin: 'acid' },
        { id: 'rain', name: 'rain water, pH 5.6', bin: 'acid' },
        { id: 'milk', name: 'milk, pH 6.5', bin: 'acid' },
        { id: 'water', name: 'pure water, pH 7', bin: 'neut' },
        { id: 'sugar', name: 'sugar solution, pH 7', bin: 'neut' },
        { id: 'sea', name: 'sea water, pH 8', bin: 'alk' },
        { id: 'lime', name: 'limewater, pH 12', bin: 'alk' },
      ],
      explain: 'Anything below 7 is acidic — even milk at 6.5 and rain at 5.6, which are only weakly acidic. Only exactly 7 is neutral. Sea water, at 8, is slightly alkaline, and limewater, at 12, is strongly alkaline.',
    },
  },

  // ── 16 · Universal indicator and the pH meter ──────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Book spread 11.2 · measuring pH',
    title: 'Universal Indicator and the Meter',
    content:
      '**Universal indicator** is a mix of indicators. Its colour gives the **pH**, not just "acid" or "alkali". Use it as a solution or on paper.\n\n' +
      'For a **precise** pH, use a **pH meter**: dip its probe in the solution and read the number.',
    notes: [
      {
        tone: 'write',
        text: '**Universal indicator** gives a rough pH. A **pH meter** gives a precise pH.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'order',
      prompt: 'Universal indicator is added to five solutions. Put the colours in order, from the most acidic to the most alkaline.',
      steps: [
        { id: 'red', name: 'red' },
        { id: 'yellow', name: 'yellow' },
        { id: 'green', name: 'green' },
        { id: 'blue', name: 'blue' },
        { id: 'violet', name: 'violet' },
      ],
      explain: 'Red (pH 0–2) is the most acidic, then yellow (orange sits between them). **Green is neutral**, pH 7. Then blue, and violet (pH 11–14) is the most alkaline — the order of a rainbow.',
    },
  },

  // ── 17 · EXTENDED: predict before the strong / weak reveal ─────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Extended',
    title: 'Same Concentration, Same Number?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Two acid solutions are made with exactly the same concentration: 0.1 mol/dm³ hydrochloric acid and 0.1 mol/dm³ ethanoic acid. A pH meter is dipped into each.',
    activity: {
      id: 'a6',
      type: 'predict',
      prompt: 'What will the pH meter show?',
      options: [
        { val: 'same', name: 'The same pH — they have the same concentration' },
        { val: 'hcl', name: 'Hydrochloric acid has the lower pH' },
        { val: 'eth', name: 'Ethanoic acid has the lower pH' },
      ],
      correct: 'hcl',
      explain: 'Hydrochloric acid: **pH 1.08**. Ethanoic acid: **pH 2.88**. Same concentration, but not the same pH — so the ethanoic acid solution must contain fewer H⁺ ions. The next slide shows why.',
    },
  },

  // ── 18 · EXTENDED: strong and weak acids ───────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Split',
    eyebrow: 'Extended',
    title: 'Strong Acids and Weak Acids',
    ratio: 45,
    inlineSvg: DIAGRAMS.STRONG_WEAK,
    content:
      'In hydrochloric acid **every** molecule dissociates. In ethanoic acid only a **few** do.\n\n' +
      'Fewer $\\text{H}^{+}$ ions means a **higher** pH.',
    notes: [
      {
        tone: 'write',
        text: '**Strong acid:** completely dissociated into ions in solution. **Weak acid:** only partially dissociated.',
      },
    ],
    check: {
      id: 'c11',
      q: 'Oranges contain citric acid. In water, only some of its molecules split into ions. What kind of acid is it?',
      options: [
        { val: 'A', text: 'A strong acid' },
        { val: 'B', text: 'A weak acid' },
        { val: 'C', text: 'A concentrated acid' },
      ],
      correct: 'B',
      expEn: 'An acid that is only partially dissociated is a weak acid. A strong acid, like the sulfuric acid in a car battery, is completely dissociated. "Concentrated" says how much acid is in the water — a different idea.',
    },
  },

  // ── 19 · EXTENDED: the two-way arrow ───────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Extended',
    title: 'The Two-Way Arrow',
    content:
      '> $\\text{CH}_3\\text{COOH}(\\text{aq}) \\rightleftharpoons \\text{H}^{+}(\\text{aq}) + \\text{CH}_3\\text{COO}^{-}(\\text{aq})$\n\n' +
      'The two-way arrow means the dissociation is **reversible**: ions join back into molecules. At equilibrium, **most** ethanoic acid molecules are still whole.',
    notes: [
      {
        tone: 'write',
        text: 'A **weak** acid dissociates with $\\rightleftharpoons$. A **strong** acid dissociates with $\\rightarrow$.',
      },
    ],
    check: {
      id: 'c12',
      q: 'In a solution of ethanoic acid, what are most of the acid particles?',
      options: [
        { val: 'A', text: 'Whole CH₃COOH molecules' },
        { val: 'B', text: 'H⁺ ions' },
        { val: 'C', text: 'CH₃COO⁻ ions' },
      ],
      correct: 'A',
      expEn: 'Ethanoic acid is a weak acid: the dissociation is reversible, so at equilibrium most of the molecules are whole. Only a few have split into H⁺ and CH₃COO⁻ ions.',
    },
  },

  // ── 20 · EXTENDED: strength is not concentration ───────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Languages',
    eyebrow: 'Extended',
    title: 'Strong Is Not the Same as Concentrated',
    ratio: 44,
    inlineSvg: DIAGRAMS.CONC_STRENGTH,
    content:
      '**Strong / weak:** how much of the acid **splits into ions**.\n\n' +
      '**Concentrated / dilute:** how much acid is **in the water**.',
    notes: [
      {
        tone: 'write',
        text: 'A weak acid can be concentrated. A strong acid can be dilute.',
      },
    ],
    activity: {
      id: 'a7',
      type: 'sort',
      prompt: 'Is each phrase about strength or about concentration?',
      bins: [
        { id: 'str', name: 'Strength' },
        { id: 'conc', name: 'Concentration' },
      ],
      cards: [
        { id: 'complete', name: 'completely dissociated', bin: 'str' },
        { id: 'few', name: 'only a few molecules split', bin: 'str' },
        { id: 'arrow', name: 'a two-way arrow', bin: 'str' },
        { id: 'lots', name: 'lots of acid, little water', bin: 'conc' },
        { id: 'moldm', name: '0.1 mol/dm³', bin: 'conc' },
        { id: 'water', name: 'more water added', bin: 'conc' },
      ],
      explain: 'Anything about **splitting into ions** — completely, only a few, the two-way arrow — is strength. Anything about **how much acid is in the water** — a lot, 0.1 mol/dm³, adding water — is concentration.',
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
    content: '> In your notebook: **9 definitions**, **1 table of 6 colours**, **3 equations**.',
    items: [
      { text: 'Name the four lab **acids** and give their formulae.' },
      { text: 'Define **base** and **alkali**; name three alkalis.' },
      { text: 'Give the colours of **three indicators**.' },
      { text: 'Name the ions that make solutions **acidic** and **alkaline**.' },
      { text: 'Use the **pH scale** and universal indicator.' },
      { text: 'Explain **strong** and **weak** acids (Extended).' },
    ],
    check: {
      id: 'c13',
      q: 'A solution turns thymolphthalein blue. What could its pH be?',
      options: [
        { val: 'A', text: '3' },
        { val: 'B', text: '7' },
        { val: 'C', text: '11' },
      ],
      correct: 'C',
      expEn: 'Thymolphthalein turns blue only in an alkali, and an alkaline solution has a pH above 7. So 11 is the only possible answer: 3 is acidic and 7 is neutral.',
    },
  },
];
