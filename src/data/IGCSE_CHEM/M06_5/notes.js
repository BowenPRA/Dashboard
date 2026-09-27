// src/data/IGCSE_CHEM/M06_5/notes.js
// 6.5 The Periodic Table — book spreads 12.1 "The Periodic Table: an overview"
// and 12.4 "More about the trends", and the history pages "How the Periodic
// Table developed" (pages 146–147, 152–153, 156–157). English-only (this track
// is not bilingual), so there are no `vn*` twins.
//
// The deck's spine follows the spreads: the order of the elements → the key →
// periodicity (an English slide) → groups and periods (TAPPED on the table) →
// metals and non-metals, hydrogen, the transition block → a PREDICT before the
// outer-electron rule → group number = outer electrons, period number = shells
// → the noble gases → position predicts properties → the charge on the ion →
// EXTENDED: reactivity and shells, fewer electrons to move, the metalloid,
// Period 3 trends → the history, with a PREDICT before Mendeleev's gaps → a
// countable recap.
//
// Four `periodic` activities put the student's finger on the book's first-20
// table (utils/elements.js — the same table Element Hunt marks against). Its
// tiles colour metals yellow and non-metals blue, which is why the metal
// question hides the colours (the engine does this for a `metal` query).
//
// Groups I, VII and the transition elements are LATER units (6.6, 6.7, 6.8):
// they are named here as "coming next" and their reactions are not taught.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its
// slide — the audio generator narrates every field before it and stops there.
// Slide titles are read aloud, so they carry no bare symbols.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const SLATE = '#475569';
const GOLD = '#b8912a';
const BLUE = '#1a5fa8';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Grid3x3',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.5 The Periodic Table',
    title: 'One Map for Every Element',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Mr Bowen gives you **118 cards**, one for each element. You must lay them out so that elements that **behave alike** end up next to each other. In one sentence — how would you start?',
    },
  },

  // ── 2 · In order of proton number ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Hash',
    eyebrow: 'Book spread 12.1',
    title: 'Elements in Order of Proton Number',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.PT_OUTLINE,
    content:
      'The table lists all **118** known elements in order of **proton number**: lithium (3 protons), then beryllium (4).\n\n' +
      'The proton number is also the number of **electrons** in the atom.',
    notes: [
      {
        tone: 'write',
        text: '**Proton number (atomic number):** the number of protons in an atom. It tells you which element it is.',
      },
    ],
    check: {
      id: 'c1',
      q: 'What decides the order of the elements in the modern Periodic Table?',
      options: [
        { val: 'A', text: 'Their relative atomic masses' },
        { val: 'B', text: 'Their proton numbers' },
        { val: 'C', text: 'The dates they were discovered' },
      ],
      correct: 'B',
      expEn: 'The elements go in order of proton number — the number of protons in each atom. Relative atomic mass almost always rises in the same order, but not quite always, so it is not what decides.',
    },
  },

  // ── 3 · The key ─────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Search',
    eyebrow: 'Reading the table',
    title: 'What the Numbers in Each Box Mean',
    ratio: 55,
    inlineSvg: DIAGRAMS.KEY_BOX,
    content:
      'Every box follows the **key**: proton number at the top, then the symbol and the name, and the **relative atomic mass** at the bottom.\n\n' +
      'Magnesium: 12 protons, so 12 electrons. Its atoms have an average mass of 24.',
    notes: [
      {
        tone: 'write',
        text: '**Relative atomic mass:** the average mass of the atoms of an element (the bottom number in the box).',
      },
    ],
    check: {
      id: 'c2',
      q: 'The box for chlorine shows 17 at the top and 35.5 at the bottom. What is 35.5?',
      options: [
        { val: 'A', text: 'The proton number' },
        { val: 'B', text: 'The number of neutrons' },
        { val: 'C', text: 'The relative atomic mass' },
      ],
      correct: 'C',
      expEn: 'The bottom number is the relative atomic mass — the AVERAGE mass of chlorine\'s atoms, which is why it is not a whole number. The top number, 17, is the proton number.',
    },
  },

  // ── 4 · English: periodicity ────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Period, Periodic, Periodicity',
    content:
      '> Something **periodic** happens again and again, at **regular intervals** — like the days of the week.\n\n' +
      'In order of proton number, elements with **similar properties** turn up again at regular intervals. That is **periodicity**, and it gives the table its name.',
    notes: [
      {
        tone: 'write',
        text: '**Periodicity:** elements with similar properties appear at regular intervals.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Lithium (3), sodium (11) and potassium (19) behave in a very similar way. What does this show?',
      options: [
        { val: 'A', text: 'They have the same relative atomic mass' },
        { val: 'B', text: 'They are in the same period' },
        { val: 'C', text: 'Periodicity — similar elements turn up at regular intervals' },
      ],
      correct: 'C',
      expEn: 'The proton numbers go up by 8 each time, and the same kind of element turns up again: periodicity. The three are in the same GROUP (a column), not the same period, and their masses are all different.',
    },
  },

  // ── 5 · Groups and periods — tap one ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Columns3',
    eyebrow: 'Book spread 12.1',
    title: 'Groups Go Down, Periods Go Across',
    content:
      'The columns numbered **I to VIII** are **groups**. The elements in a group have similar properties. The rows are **periods**, numbered **1 to 7**.\n\n' +
      'Count the columns: I and II on the left, then the gap, then III to VIII.',
    notes: [
      {
        tone: 'write',
        text: '**Group:** a numbered column of elements with similar properties.\n**Period:** a row of the Periodic Table.',
      },
    ],
    activity: {
      id: 'a1',
      type: 'periodic',
      prompt: 'Tap the element in Period 3, Group VI.',
      query: { period: 3, group: 6 },
      explain: 'Go along row 3 and down column VI: they cross at **sulfur (S)**. Oxygen is above it in Group VI, but in Period 2.',
    },
  },

  // ── 6 · Metals and non-metals — tap the Period 3 metals ────────────────
  {
    layout: 'split',
    accent: GOLD,
    icon: 'Split',
    eyebrow: 'Book spread 12.1',
    title: 'The Zig-Zag Line',
    content:
      'The **zig-zag line** separates the **metals**, on the left, from the **non-metals**, on the right. Hydrogen is the exception: a non-metal on the left.\n\n' +
      'There are far more metals than non-metals. Across each period, the elements change from **metal to non-metal**.',
    notes: [
      {
        tone: 'write',
        text: '**Metals** are to the left of the zig-zag line, **non-metals** to the right. Over **80%** of the elements are metals.',
      },
    ],
    activity: {
      id: 'a2',
      type: 'periodic',
      prompt: 'The colours are hidden. Tap every metal in Period 3.',
      query: { period: 3, metal: true },
      explain: 'Only **sodium (Na)**, **magnesium (Mg)** and **aluminium (Al)**. The line runs between aluminium and silicon, so the rest of the row, from silicon to argon, is on the non-metal side.',
    },
  },

  // ── 7 · Hydrogen, and the block in the middle ───────────────────────────
  {
    layout: 'split',
    accent: GOLD,
    icon: 'LayoutGrid',
    eyebrow: 'Book spread 12.1',
    title: 'Hydrogen, and the Block in the Middle',
    ratio: 42,
    side: 'left',
    inlineSvg: DIAGRAMS.PT_OUTLINE,
    content:
      '**Hydrogen** sits alone. It has one outer electron and forms H⁺ ions, like the Group I metals — but it is a gas, and it usually reacts like a non-metal.\n\n' +
      'The **transition elements** are the block in the middle. They are all metals, like iron, copper and gold. Topic 6.8 is about them.',
    check: {
      id: 'c4',
      q: 'Why does hydrogen sit on its own, and not at the top of Group I?',
      options: [
        { val: 'A', text: 'It has one outer electron like Group I, but it is a gas that usually reacts like a non-metal' },
        { val: 'B', text: 'It has no electrons at all' },
        { val: 'C', text: 'It is one of the transition elements' },
      ],
      correct: 'A',
      expEn: 'Hydrogen is a puzzle: one outer electron and an H⁺ ion, like the Group I metals, but a gas that behaves like a non-metal. So the table gives it a place of its own.',
    },
  },

  // ── 8 · Predict: what do Group I atoms share? ───────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'What Do Their Atoms Share?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Lithium, sodium and potassium are all in Group I, and they react in very similar ways.',
    activity: {
      id: 'a3',
      type: 'predict',
      prompt: 'What do their atoms have in common?',
      options: [
        { val: 'shells', name: 'The same number of electron shells' },
        { val: 'outer', name: 'The same number of outer-shell electrons' },
        { val: 'mass', name: 'The same mass' },
        { val: 'protons', name: 'The same number of protons' },
      ],
      correct: 'outer',
      explain: 'They all have **one electron in the outer shell**. Their numbers of shells are different: 2, 3 and 4. The next slide draws the three atoms.',
    },
  },

  // ── 9 · Group number = outer-shell electrons ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Key point 1',
    title: 'Group Number Equals Outer-Shell Electrons',
    ratio: 55,
    inlineSvg: DIAGRAMS.SHELLS_GROUP1,
    content:
      'Lithium 2,1, sodium 2,8,1, potassium 2,8,8,1: each has **one** outer-shell electron, and all are in **Group I**.\n\n' +
      'Atoms with the same number of outer electrons **react in a similar way**.',
    notes: [
      {
        tone: 'write',
        text: '**Group number = number of outer-shell electrons** (Groups I to VII).',
      },
    ],
    activity: {
      id: 'a4',
      type: 'periodic',
      prompt: 'Which group has atoms with two outer-shell electrons? Tap every element in it.',
      query: { group: 2 },
      explain: 'Group II: **beryllium (Be)**, **magnesium (Mg)** and **calcium (Ca)**, with two outer-shell electrons each. Helium also has two electrons, but that is its FULL shell, so it belongs in Group VIII.',
    },
  },

  // ── 10 · Period number = number of shells ───────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Layers',
    eyebrow: 'Key point 2',
    title: 'Period Number Equals the Number of Shells',
    content:
      'Period 2 atoms have **two** electron shells. Period 3 atoms have **three**, and so on.\n\n' +
      '> Aluminium is 2,8,3. Three shells → **Period 3**. Three outer electrons → **Group III**.',
    notes: [
      {
        tone: 'write',
        text: '**Period number = number of electron shells.**',
      },
    ],
    check: {
      id: 'c5',
      q: 'An atom has the electron arrangement 2,8,5. Where is it in the Periodic Table?',
      options: [
        { val: 'A', text: 'Period 5, Group III' },
        { val: 'B', text: 'Period 3, Group V' },
        { val: 'C', text: 'Period 3, Group III' },
      ],
      correct: 'B',
      expEn: 'Count the shells for the period: three numbers, so Period 3. Read the LAST number for the group: 5 outer electrons, so Group V. It is phosphorus. (A mixes the two rules up.)',
    },
  },

  // ── 11 · Group VIII: the noble gases ────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'CircleDot',
    eyebrow: 'Group VIII',
    title: 'The Noble Gases Have Full Outer Shells',
    ratio: 55,
    inlineSvg: DIAGRAMS.SHELLS_NOBLE,
    content:
      'Helium (2), neon (2,8) and argon (2,8,8) have **full outer shells**. A full shell is **stable**, so they are **unreactive**.\n\n' +
      'They stay as single atoms: they are **monatomic**.',
    notes: [
      {
        tone: 'write',
        text: '**Noble gases (Group VIII):** full outer shells, so they are unreactive and monatomic.',
      },
    ],
    activity: {
      id: 'a5',
      type: 'periodic',
      prompt: 'Tap every noble gas.',
      query: { group: 8 },
      explain: 'Group VIII runs down the right-hand edge: **helium (He)**, **neon (Ne)** and **argon (Ar)** among the first 20. Their full outer shells make them unreactive.',
    },
  },

  // ── 12 · Position predicts properties ───────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'TrendingUp',
    eyebrow: 'Why the table matters',
    title: 'Where an Element Sits Tells You How It Behaves',
    content:
      'Elements in a **group** react in a similar way, and show **trends** down the group. Going down Group I, the metals get **more reactive**. Going down any group, the atoms get heavier and the **density** generally increases.\n\n' +
      'So if you know an element\'s **position**, you can **predict** its properties.',
    notes: [
      {
        tone: 'info',
        text: '**Coming next:** Group I, the alkali metals (6.6) · Group VII, the halogens (6.7) · the transition elements (6.8).',
      },
    ],
    check: {
      id: 'c6',
      q: 'Selenium is in Group VI, below sulfur. What can you predict about a selenium atom?',
      options: [
        { val: 'A', text: 'It has six electron shells' },
        { val: 'B', text: 'It has six outer-shell electrons, like oxygen and sulfur' },
        { val: 'C', text: 'It is a metal, because it is lower down than sulfur' },
      ],
      correct: 'B',
      expEn: 'Group number = outer-shell electrons, so selenium has six, like everything in Group VI. The number of SHELLS comes from the period, not the group. Selenium sits right of the zig-zag line, so it is a non-metal.',
    },
  },

  // ── 13 · Group number and the charge on the ion ─────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowUpDown',
    eyebrow: 'Book spread 12.4',
    title: 'Group Number and the Charge on the Ion',
    ratio: 44,
    inlineSvg: DIAGRAMS.ION_STRIP,
    content:
      'Atoms lose or gain electrons to reach a **full outer shell**. Losing electrons gives a **positive** ion; gaining them gives a **negative** ion.',
    notes: [
      {
        tone: 'write',
        text: 'Group **I → 1+**, **II → 2+**, **III → 3+**, **VI → 2−**, **VII → 1−**.',
      },
    ],
    activity: {
      id: 'a6',
      type: 'sort',
      prompt: 'Sort each element by the charge on its ion.',
      bins: [
        { id: 'p1', name: '1+' },
        { id: 'p2', name: '2+' },
        { id: 'p3', name: '3+' },
        { id: 'n2', name: '2−' },
        { id: 'n1', name: '1−' },
      ],
      cards: [
        { id: 'li', name: 'lithium', bin: 'p1' },
        { id: 'rb', name: 'rubidium (Group I)', bin: 'p1' },
        { id: 'mg', name: 'magnesium', bin: 'p2' },
        { id: 'sr', name: 'strontium (Group II)', bin: 'p2' },
        { id: 'al', name: 'aluminium', bin: 'p3' },
        { id: 's', name: 'sulfur', bin: 'n2' },
        { id: 'se', name: 'selenium (Group VI)', bin: 'n2' },
        { id: 'f', name: 'fluorine', bin: 'n1' },
      ],
      explain: 'Metals lose their outer electrons: lithium and rubidium (Group I) lose 1 → **1+**; magnesium and strontium (II) lose 2 → **2+**; aluminium (III) loses 3 → **3+**. Non-metals gain: sulfur and selenium (VI) gain 2 → **2−**; fluorine (VII) gains 1 → **1−**.',
    },
  },

  // ── 14 · EXTENDED: more shells, weaker pull ─────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Magnet',
    eyebrow: 'Extended',
    title: 'More Shells, Weaker Pull',
    ratio: 46,
    inlineSvg: DIAGRAMS.REACTIVITY_SHELLS,
    content:
      'The positive nucleus **pulls** on the outer electrons. The pull gets **weaker** as shells are added.\n\n' +
      'So potassium **loses** its outer electron more easily than sodium; chlorine **gains** one more easily than bromine.',
    notes: [
      {
        tone: 'write',
        text: 'Reactivity **increases** down Group I and **decreases** down Group VII.',
      },
    ],
    check: {
      id: 'c7',
      q: 'Iodine is below chlorine in Group VII. Why is iodine LESS reactive?',
      options: [
        { val: 'A', text: 'Iodine has fewer outer-shell electrons than chlorine' },
        { val: 'B', text: 'Iodine atoms are heavier, so they move more slowly' },
        { val: 'C', text: 'Iodine has more shells, so its nucleus pulls less strongly on an electron from another atom' },
      ],
      correct: 'C',
      expEn: 'Both have 7 outer electrons (they are in the same group). Iodine\'s outer shell is further from the nucleus, so the pull on an incoming electron is weaker and iodine gains one less easily.',
    },
  },

  // ── 15 · EXTENDED: fewer electrons to move ─────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Zap',
    eyebrow: 'Extended',
    title: 'Fewer Electrons to Move, More Reactive',
    content:
      'It takes less energy to lose **one** electron than two, and to gain **one** electron than two.\n\n' +
      '> Sodium (2,8,1) is more reactive than magnesium (2,8,2).\n' +
      '> Chlorine (2,8,7) is more reactive than sulfur (2,8,6).',
    notes: [
      {
        tone: 'write',
        text: 'The **fewer** electrons an atom must lose or gain, the **more reactive** it is.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Potassium is 2,8,8,1 and calcium is 2,8,8,2. Which is more reactive, and why?',
      options: [
        { val: 'A', text: 'Calcium — it has more outer electrons to give away' },
        { val: 'B', text: 'Potassium — it has to lose only one electron to reach a full shell' },
        { val: 'C', text: 'Neither — they are both in Period 4, so they are equally reactive' },
      ],
      correct: 'B',
      expEn: 'Both have four shells, so the pull is similar. Potassium has to lose just one electron; calcium has to lose two, which takes more energy. So potassium is more reactive.',
    },
  },

  // ── 16 · EXTENDED: silicon, the metalloid ──────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Hexagon',
    eyebrow: 'Extended',
    title: 'Silicon, the Metalloid',
    content:
      'The change from metal to non-metal is not clear-cut. **Silicon** can conduct electricity in some conditions, like a metal — but it forms covalent bonds with oxygen, like a non-metal.\n\n' +
      'On the table it sits on the non-metal side of the line, but it is really a **metalloid**.',
    notes: [
      {
        tone: 'write',
        text: '**Metalloid:** an element with properties of both a metal and a non-metal, like silicon.',
      },
    ],
    activity: {
      id: 'a7',
      type: 'sort',
      prompt: 'Sort the Period 3 elements.',
      bins: [
        { id: 'metal', name: 'Metal' },
        { id: 'mid', name: 'Metalloid' },
        { id: 'non', name: 'Non-metal' },
      ],
      cards: [
        { id: 'na', name: 'sodium', bin: 'metal' },
        { id: 'mg', name: 'magnesium', bin: 'metal' },
        { id: 'al', name: 'aluminium', bin: 'metal' },
        { id: 'si', name: 'silicon', bin: 'mid' },
        { id: 'p', name: 'phosphorus', bin: 'non' },
        { id: 's', name: 'sulfur', bin: 'non' },
        { id: 'cl', name: 'chlorine', bin: 'non' },
        { id: 'ar', name: 'argon', bin: 'non' },
      ],
      explain: 'Sodium, magnesium and aluminium are metals. **Silicon** is the metalloid. Phosphorus, sulfur, chlorine and argon are non-metals.',
    },
  },

  // ── 17 · EXTENDED: trends across Period 3 ──────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Extended',
    title: 'Trends Across Period 3',
    ratio: 40,
    side: 'left',
    inlineSvg: DIAGRAMS.PERIOD3_TABLE,
    content:
      'Across the period: **metal → metalloid → non-metal**, and the oxides go **basic → amphoteric → acidic**.',
    notes: [
      {
        tone: 'write',
        text: '**Amphoteric oxide:** an oxide that reacts with both acids and bases, like aluminium oxide.',
      },
    ],
    check: {
      id: 'c9',
      q: 'Which Period 3 element forms an oxide that reacts with BOTH acids and bases?',
      options: [
        { val: 'A', text: 'Sodium' },
        { val: 'B', text: 'Sulfur' },
        { val: 'C', text: 'Aluminium' },
      ],
      correct: 'C',
      expEn: 'Aluminium oxide is amphoteric: it reacts with acids and with bases. Sodium oxide is basic (it reacts only with acids), and sulfur\'s oxides are acidic (they react only with bases).',
    },
  },

  // ── 18 · History: the Law of Octaves ───────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Milestone',
    eyebrow: 'How the table developed',
    title: 'Newlands and the Law of Octaves',
    ratio: 50,
    inlineSvg: DIAGRAMS.NEWLANDS_MENDELEEV,
    content:
      'By 1863, 56 elements were known. **John Newlands** put them in order of **atomic weight** and saw that every **eighth** element seemed to behave like the first: his **Law of Octaves** (1865).\n\n' +
      'It was the first table to show a periodic pattern. But it filled every place, with no gaps, so it put **copper** with **sodium**.',
    check: {
      id: 'c10',
      q: 'Why did other chemists reject Newlands\'s Law of Octaves?',
      options: [
        { val: 'A', text: 'It did not use atomic weights at all' },
        { val: 'B', text: 'It left too many empty gaps' },
        { val: 'C', text: 'It forced very different elements, like copper and sodium, into the same group' },
      ],
      correct: 'C',
      expEn: 'Newlands DID use atomic weights, and he left no gaps at all — that was the problem. Every place was filled, so elements that behave very differently were put together, and chemists did not believe it.',
    },
  },

  // ── 19 · Predict: Mendeleev's empty space ──────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'An Element That Does Not Fit',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'It is 1869. Mendeleev is laying out his cards. The next known element does not behave like the group it would go into at all.',
    activity: {
      id: 'a8',
      type: 'predict',
      prompt: 'What should he do?',
      options: [
        { val: 'force', name: 'Put it in the next space anyway' },
        { val: 'gap', name: 'Leave a gap for an element nobody has found yet' },
        { val: 'drop', name: 'Leave that element out of the table' },
        { val: 'row', name: 'Start a brand-new row' },
      ],
      correct: 'gap',
      explain: 'He **left a gap** — a big risk, and the opposite of what Newlands did. The next slide shows how it paid off.',
    },
  },

  // ── 20 · Mendeleev's gaps and predictions ──────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'How the table developed',
    title: 'Mendeleev Left Gaps and Made Predictions',
    ratio: 58,
    inlineSvg: DIAGRAMS.NEWLANDS_MENDELEEV,
    content:
      '**Mendeleev** put the 63 known elements in order of atomic weight, then into groups that **behave alike**. Where nothing fitted, he left a **gap**.\n\n' +
      'His predicted elements — **gallium, scandium, germanium** — were soon found, and matched.',
    notes: [
      {
        tone: 'write',
        text: '**Mendeleev (1869):** left gaps and predicted the missing elements. The predictions came true.',
      },
    ],
    check: {
      id: 'c11',
      q: 'What made chemists accept Mendeleev\'s table?',
      options: [
        { val: 'A', text: 'It had no gaps in it' },
        { val: 'B', text: 'Elements discovered later matched the properties he had predicted' },
        { val: 'C', text: 'It put the elements in order of proton number' },
      ],
      correct: 'B',
      expEn: 'His table DID have gaps, and nobody knew about protons in 1869. What convinced chemists was that gallium, scandium and germanium turned up with the properties he had predicted for eka-aluminium, eka-boron and eka-silicon.',
    },
  },

  // ── 21 · Proton number puts things right ───────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Clock',
    eyebrow: 'Atomic structure and the table',
    title: 'Proton Number Puts Things Right',
    content:
      'In order of atomic weight, **potassium** (39) comes before **argon** (40). That would put a reactive metal among the unreactive gases — so the two were **swapped**.\n\n' +
      'In the early 1900s the proton was discovered. **Proton number**, not atomic weight, decides an element\'s place: argon is 18, potassium 19. Then **electron shells** explained why a group reacts alike.',
    activity: {
      id: 'a9',
      type: 'order',
      prompt: 'Put the story of the Periodic Table in order.',
      steps: [
        { id: 'scraps', name: 'Many new elements are found, but chemists see only scraps of a pattern' },
        { id: 'octaves', name: 'Newlands proposes the Law of Octaves (1865)' },
        { id: 'mendeleev', name: 'Mendeleev publishes his table, with gaps (1869)' },
        { id: 'found', name: 'Gallium, scandium and germanium are discovered — and match his predictions' },
        { id: 'protons', name: 'Protons and electron shells are discovered; proton number fixes the order' },
      ],
      explain: 'Scraps of a pattern → Newlands\'s octaves (1865) → Mendeleev\'s table with gaps (1869) → his missing elements found (1875–1886) → protons and electron shells explain the table in the early 1900s.',
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
    content: '> Notebook: **14 copy-down notes**, **2 rules**, **1 list of ion charges**.',
    items: [
      { text: 'Read a **box** of the table.' },
      { text: 'Find **groups** and **periods**.' },
      { text: 'Link **electrons** to **position**.' },
      { text: 'Explain the **noble gases**.' },
      { text: 'Give **ion charges** by group.' },
      { text: 'Tell the **history**.' },
    ],
    check: {
      id: 'c12',
      q: 'Element E is in Period 4 and Group II. Which statement about E is correct?',
      options: [
        { val: 'A', text: 'Its atoms have two shells, and it forms 4+ ions' },
        { val: 'B', text: 'Its atoms have four shells, and it forms 2+ ions' },
        { val: 'C', text: 'It is a non-metal with two outer-shell electrons' },
      ],
      correct: 'B',
      expEn: 'Period 4 → four shells. Group II → two outer electrons, lost to give a 2+ ion. Group II is on the metal side of the line. E is calcium, 2,8,8,2.',
    },
  },
];
