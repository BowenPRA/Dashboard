// src/data/COORD_SCI/U04_1/notes.js
// C4.1 Electrolysis — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons\content\coord-science\U04_1). 18 layout slides ported
// verbatim (English-only; this track is not bilingual), with 5 embedded `check`
// questions added so NOTES scores meaningfully.
//
// The `check:` block is ALWAYS the LAST key on its slide — the audio generator
// narrates every field before it and stops there. `reveal:` is a predict-then-
// show panel (discussion, not scored). Chemical equations are KaTeX ($…$) with
// \text{} keeping element symbols upright.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const BLUE = '#1a5fa8';
const INDIGO = '#4338ca';
const GREY = '#5c6570';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: INDIGO,
    icon: 'Zap',
    brand: 'IGCSE Coordinated Science',
    eyebrow: 'C4.1 Electrolysis',
    title: 'Electrolysis: Splitting Compounds with Electricity',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Two things both make a bulb light up: a **copper wire** and a beaker of **salty water**. In one sentence — how do you think the way they carry the electricity is **different**?',
    },
  },

  // ── 2 · Conductivity: metals conduct, and stay the same ─────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Lightbulb',
    title: 'Two Ways to Conduct Electricity',
    ratio: 45,
    inlineSvg: DIAGRAMS.METAL_CONDUCTION,
    content:
      'A **metal** conducts because it is full of tiny **free electrons** that drift through it. **Graphite** (carbon) is the one non-metal that does the same.\n\n' +
      'The key point: when a metal conducts, **nothing about the metal changes** — copper wire stays copper.',
    notes: [
      {
        tone: 'write',
        text: '**Electrical conductor:** lets electricity pass through (metals, graphite).\n**Electrical insulator:** does **not** let it pass (plastic, wood).',
      },
    ],
    check: {
      id: 'c1',
      q: 'In a metal wire, what actually moves to carry the current?',
      options: [
        { val: 'A', text: 'Free electrons' },
        { val: 'B', text: 'Ions' },
        { val: 'C', text: 'Atoms of copper' },
      ],
      correct: 'A',
      expEn: 'A metal conducts through its sea of free electrons, and the metal itself is unchanged. Ions only carry the current in an electrolyte.',
    },
  },

  // ── 3 · The question, on its own ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'No answer yet — just predict',
    title: 'What Happens to the Liquid?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Salty water carried the current too — yet it **changed**, while the wire did not. **Why is the liquid different?**',
  },

  // ── 4 · Electrolytes vs non-electrolytes ────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Droplet',
    title: 'Electrolytes and Non-electrolytes',
    columns: [
      {
        heading: 'Electrolytes — conduct & break down',
        accent: TEAL,
        icon: 'Beaker',
        content:
          '• sulfuric acid\n• molten lead(II) bromide\n• sodium chloride solution\n• copper(II) chloride solution\n\nEach one is an **ionic compound** that is **molten** or **dissolved in water**.',
        notes: [
          {
            tone: 'write',
            text: '**Electrolyte:** a liquid or solution that conducts electricity **and is broken down by it**, because it contains **ions that are free to move**.',
          },
        ],
      },
      {
        heading: 'Non-electrolytes — do neither',
        accent: GREY,
        icon: 'TestTube',
        content:
          '• distilled water\n• ethanol\n• petrol\n• sugar solution\n\nThese have **no free ions**, so no current passes and nothing breaks down.',
        notes: [
          {
            tone: 'write',
            text: '**Non-electrolyte:** a liquid that does **not** conduct electricity, because it has no free ions.',
          },
        ],
      },
    ],
    check: {
      id: 'c2',
      q: 'Which of these is an electrolyte?',
      options: [
        { val: 'A', text: 'Sugar solution' },
        { val: 'B', text: 'Molten lead(II) bromide' },
        { val: 'C', text: 'Ethanol' },
      ],
      correct: 'B',
      expEn: 'An electrolyte has free-moving ions. Molten lead(II) bromide is an ionic compound melted so its ions can move; sugar and ethanol have no ions.',
    },
  },

  // ── 5 · The definition of electrolysis ──────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'Atom',
    eyebrow: 'The word for the whole lesson',
    title: 'Electrolysis',
    content: '**Electro-** = electricity.  **-lysis** = splitting.  So the word literally means: **electricity splits the compound apart.**',
    notes: [
      {
        tone: 'write',
        text: '**Electrolysis:** the breakdown of an ionic compound — when molten or dissolved — by passing an electric current through it.',
      },
    ],
  },

  // ── 6 · Why must it be molten or dissolved? ─────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Grid3x3',
    title: 'Why Molten or Dissolved?',
    columns: [
      {
        heading: 'Solid — locked',
        accent: GREY,
        icon: 'Grid3x3',
        inlineSvg: DIAGRAMS.SOLID_LATTICE,
        caption: 'In a solid ionic compound the ions are held tight in a fixed lattice. They cannot move, so the solid **cannot conduct**.',
      },
      {
        heading: 'Molten or dissolved — free',
        accent: TEAL,
        icon: 'Move',
        inlineSvg: DIAGRAMS.MOLTEN_IONS,
        caption: 'Melt it, or dissolve it in water, and the ions break free. Now they **can move to the electrodes** and carry the charge.',
        notes: [
          {
            tone: 'write',
            text: '**The rule:** ions must be **free to move** to conduct. That means the compound must be **molten** or **dissolved in water**.',
          },
        ],
      },
    ],
  },

  // ── 7 · The electrolytic cell ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Beaker',
    title: 'The Parts of an Electrolytic Cell',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.ELECTROLYTIC_CELL,
    drawThis: true,
    content:
      '• the **power supply** pushes the current\n' +
      '• the two **electrodes** — often **graphite**, because it is **inert** (does not react)\n' +
      '• the liquid itself is the **electrolyte**',
    notes: [
      {
        tone: 'write',
        text: '**Electrolytic cell:** the apparatus for electrolysis — a power supply, two electrodes, and the electrolyte.',
      },
      {
        tone: 'write',
        text: '**Inert electrode:** one (graphite or platinum) that carries the current **without reacting**.',
      },
    ],
  },

  // ── 8 · Cathode vs anode, cation vs anion ───────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    title: 'Cathode and Anode — Which Ion Goes Where',
    columns: [
      {
        heading: 'Cathode (−)',
        accent: BLUE,
        icon: 'Zap',
        content:
          'The **negative** electrode.\n\nOpposite charges attract, so **positive ions** travel here. A positive ion is a **cation**.\n\nHere ions **gain electrons** — this is **reduction**. **Metals** (and hydrogen) form at the cathode.',
        notes: [
          {
            tone: 'write',
            text: '**Cathode:** the negative (−) electrode. **Cation:** a positive ion — it moves to the cathode.',
          },
        ],
      },
      {
        heading: 'Anode (+)',
        accent: ORANGE,
        icon: 'Zap',
        content:
          'The **positive** electrode.\n\nOpposite charges attract, so **negative ions** travel here. A negative ion is an **anion**.\n\nHere ions **lose electrons** — this is **oxidation**. **Non-metals** form at the anode.',
        notes: [
          {
            tone: 'write',
            text: '**Anode:** the positive (+) electrode. **Anion:** a negative ion — it moves to the anode.',
          },
        ],
      },
    ],
    check: {
      id: 'c3',
      q: 'A cation (a positive ion) is attracted to which electrode?',
      options: [
        { val: 'A', text: 'The cathode (−)' },
        { val: 'B', text: 'The anode (+)' },
        { val: 'C', text: 'Neither — it stays still' },
      ],
      correct: 'A',
      expEn: 'Opposite charges attract, so a positive cation moves to the negative cathode, where it gains electrons (reduction).',
    },
  },

  // ── 9 · The worked example: molten lead(II) bromide ─────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'FlaskConical',
    eyebrow: 'The classic example',
    title: 'Electrolysis of Molten Lead(II) Bromide',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.LEAD_BROMIDE_CELL,
    content:
      'Heat **lead(II) bromide** until it melts, then pass a current through it. It **breaks down** into its two elements: silvery **lead** collects at the cathode, and brown **bromine** gas bubbles off at the anode.\n\n' +
      'In words:  **lead(II) bromide → lead + bromine**',
    notes: [
      {
        tone: 'write',
        text: 'Overall equation:  $\\text{PbBr}_2(\\text{l}) \\rightarrow \\text{Pb}(\\text{l}) + \\text{Br}_2(\\text{g})$',
      },
    ],
  },

  // ── 10 · Reading the notation ───────────────────────────────────────────────
  {
    layout: 'steps',
    accent: ORANGE,
    icon: 'BookOpen',
    eyebrow: 'Every symbol is telling you something',
    title: 'How to Read the Lead Bromide Equation',
    content:
      '> **State symbols:** $(\\text{s})$ solid · $(\\text{l})$ molten · $(\\text{g})$ gas · $(\\text{aq})$ dissolved in water.',
    steps: [
      { text: '**The small 2** in $\\text{PbBr}_2$ means **two bromines** per lead — part of the formula.' },
      { text: '**State symbol $(\\text{l})$** means **molten**; **$\\text{Br}_2$** means bromine leaves in **pairs** of atoms.' },
      { text: '**The charges:** $\\text{Pb}^{2+}$ has lost **2 electrons**, $\\text{Br}^-$ has gained **1** — that sets how many move at each electrode.' },
    ],
  },

  // ── 11 · The cathode half-equation ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Zap',
    eyebrow: 'At the cathode (−)',
    title: 'What Happens to the Lead Ions',
    content:
      'The lead ions ($\\text{Pb}^{2+}$) are positive, so they travel to the negative **cathode**. A $\\text{Pb}^{2+}$ ion is short of 2 electrons; a lead atom is not.',
    check: {
      id: 'c6',
      q: 'To turn into lead metal at the cathode, what do the $\\text{Pb}^{2+}$ ions do?',
      options: [
        { val: 'A', text: 'Gain 2 electrons (reduction)' },
        { val: 'B', text: 'Lose 2 electrons (oxidation)' },
        { val: 'C', text: 'Gain just 1 electron' },
      ],
      correct: 'A',
      expEn: 'A $\\text{Pb}^{2+}$ ion is missing 2 electrons, so it gains 2 to become neutral lead. Gaining electrons is reduction: $\\text{Pb}^{2+} + 2\\text{e}^- \\rightarrow \\text{Pb}$.',
    },
  },

  // ── 12 · The anode half-equation ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Zap',
    eyebrow: 'At the anode (+)',
    title: 'What Happens to the Bromide Ions',
    content:
      'The bromide ions ($\\text{Br}^-$) are negative, so they travel to the positive **anode**. Each $\\text{Br}^-$ carries 1 extra electron, and two of them join to make one $\\text{Br}_2$ molecule.',
    check: {
      id: 'c7',
      q: 'To turn into bromine gas at the anode, what do the $\\text{Br}^-$ ions do?',
      options: [
        { val: 'A', text: 'Each loses 1 electron (oxidation)' },
        { val: 'B', text: 'Each gains 1 electron (reduction)' },
        { val: 'C', text: 'They stay unchanged' },
      ],
      correct: 'A',
      expEn: 'Each $\\text{Br}^-$ has one extra electron; losing it is oxidation, and two bromine atoms pair up: $2\\text{Br}^- \\rightarrow \\text{Br}_2 + 2\\text{e}^-$.',
    },
  },

  // ── 13 · Binary substances & putting the half-equations together ────────────
  {
    layout: 'stack',
    accent: PURPLE,
    icon: 'Equal',
    columns: 2,
    title: 'Binary Substances and Half-equations',
    content:
      'Lead(II) bromide is a **binary substance** — made of only **two** elements. Each electrode reaction is a **half-equation**. Copy both, then add them — the 2 electrons **cancel**:\n\n' +
      '> **Cathode:** $\\text{Pb}^{2+} + 2\\text{e}^- \\rightarrow \\text{Pb}$\n' +
      '> **Anode:** $2\\text{Br}^- \\rightarrow \\text{Br}_2 + 2\\text{e}^-$\n' +
      '> **Overall:** $\\text{Pb}^{2+} + 2\\text{Br}^- \\rightarrow \\text{Pb} + \\text{Br}_2$',
    notes: [
      {
        tone: 'write',
        text: '**Binary substance:** a substance made from only two different elements.',
      },
      {
        tone: 'write',
        text: '**Half-equation:** an ionic equation for what happens at **one** electrode — showing the electrons gained (cathode) or lost (anode).',
      },
    ],
    check: {
      id: 'c4',
      q: 'When you add the cathode and anode half-equations together, what cancels out?',
      options: [
        { val: 'A', text: 'The electrons (2e⁻ on each side)' },
        { val: 'B', text: 'The lead atoms' },
        { val: 'C', text: 'The bromine atoms' },
      ],
      correct: 'A',
      expEn: 'The 2 electrons gained at the cathode are the same 2 lost at the anode, so they cancel, leaving Pb²⁺ + 2Br⁻ → Pb + Br₂.',
    },
  },

  // ── 14 · Predicting products for any molten binary salt ─────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'Target',
    eyebrow: 'Now you can predict any molten binary salt',
    title: 'Metal at the Cathode, Non-metal at the Anode',
    content:
      'Every molten binary salt splits the same way — the metal goes to the cathode, the non-metal to the anode.\n\n' +
      '> **The rule to copy:** metal (or hydrogen) forms at the **cathode (−)**; the non-metal forms at the **anode (+)**.',
    check: {
      id: 'c8',
      q: 'For molten sodium chloride (NaCl), what forms at the cathode (−)?',
      options: [
        { val: 'A', text: 'Sodium — the metal' },
        { val: 'B', text: 'Chlorine gas' },
        { val: 'C', text: 'Hydrogen gas' },
      ],
      correct: 'A',
      expEn: 'Metal to the cathode: sodium (Na). Chlorine ($\\text{Cl}_2$), the non-metal, forms at the anode.',
    },
  },

  // ── 15 · Discussion Q1 (ionic bonding) ──────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Coursebook discussion question 1',
    title: 'Why Must the Substance Be Liquid or Molten?',
    content: 'Think about **ionic bonding**: why does electrolysis only work on a molten or dissolved compound, never a solid?',
    check: {
      id: 'c9',
      q: 'Why can a solid ionic compound not be electrolysed, but a molten one can?',
      options: [
        { val: 'A', text: 'In the solid the ions are locked in a fixed lattice; only when molten are they free to move' },
        { val: 'B', text: 'A solid contains no ions at all' },
        { val: 'C', text: 'A solid is simply too cold to react' },
      ],
      correct: 'A',
      expEn: 'Electrolysis needs ions free to move to the electrodes. In a solid lattice the ions are held in fixed positions; melting or dissolving frees them.',
    },
  },

  // ── 16 · Discussion Q2 (aqueous sodium chloride / brine) ─────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Droplet',
    eyebrow: 'Coursebook discussion question 2',
    title: 'What Comes Out of Salty Water (Brine)?',
    content: 'Back to the beaker from the start. **Brine** is sodium chloride dissolved in water — so the ions present are Na⁺, Cl⁻, and the water itself matters too.',
    check: {
      id: 'c10',
      q: 'When brine (salty water) is electrolysed, what forms at the cathode (−)?',
      options: [
        { val: 'A', text: 'Hydrogen gas — from the water, because sodium is too reactive' },
        { val: 'B', text: 'Sodium metal' },
        { val: 'C', text: 'Chlorine gas' },
      ],
      correct: 'A',
      expEn: 'Sodium is too reactive to be discharged, so hydrogen from the water forms at the cathode. Chlorine forms at the anode, and sodium hydroxide is left in solution.',
    },
  },

  // ── 17 · Discussion Q3 (economic importance) ────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Coursebook discussion question 3',
    title: 'Why Does Industry Care?',
    content: 'Think about the processes we have met — electrolysis, electroplating, the hydrogen fuel cell — and what each one produces that industry needs.',
    check: {
      id: 'c11',
      q: 'What makes electrolysis so important to industry?',
      options: [
        { val: 'A', text: 'It is the only way to extract very reactive metals such as aluminium from their ores' },
        { val: 'B', text: 'It is always the cheapest possible process' },
        { val: 'C', text: 'It is the only way to make a solid melt' },
      ],
      correct: 'A',
      expEn: 'Electrolysis extracts reactive metals (aluminium, sodium) that heating with carbon cannot. It also makes chlorine and sodium hydroxide from brine, and is used for electroplating.',
    },
  },

  // ── 18 · Recap ──────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Seven?',
    content:
      '> Your notebook should now have about **13 key words**, **3 equations**, and **1 labelled diagram** (the electrolytic cell).',
    items: [
      { text: 'Say how a **metal** conducts differently from an **electrolyte**.' },
      { text: 'Define **electrolysis**, **electrolyte** and **non-electrolyte**.' },
      { text: 'Explain why a compound must be **molten or dissolved**.' },
      { text: 'Label a cell; say what **cathode**, **anode**, **cation**, **anion** mean.' },
      { text: 'Read $\\text{PbBr}_2(\\text{l}) \\rightarrow \\text{Pb}(\\text{l}) + \\text{Br}_2(\\text{g})$ — every symbol.' },
      { text: 'Write both **half-equations** and add them.' },
      { text: 'Predict the products of any **molten binary salt**.' },
    ],
    check: {
      id: 'c5',
      q: 'For molten zinc chloride (ZnCl₂), what forms at the cathode (−)?',
      options: [
        { val: 'A', text: 'Zinc (the metal)' },
        { val: 'B', text: 'Chlorine gas' },
        { val: 'C', text: 'Nothing forms there' },
      ],
      correct: 'A',
      expEn: 'The rule: metal to the cathode, non-metal to the anode. Zinc is the metal, so zinc forms at the cathode and chlorine at the anode.',
    },
  },
];
