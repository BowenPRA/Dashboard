// src/data/AMC8/TP_02/notes.js
// TP_02 — Arrangements. The deck of the second PROBLEM-TYPE unit, the sequel
// to TP_01 (How Many Ways?). TP_01 taught the slots; this unit lines things
// up in slots and then asks ONE question each time: what has been counted
// too many (or too few) times?
//
// The shape (docs/amc8-course.md, "Problem-type units"):
//   hero → spot the type → the slots, recapped → one question to ask per
//   slide → a contest question done slowly → the checklist.
// Every teaching slide: the idea with ONE small example, ONE orange Write
// card (a `steps` slide carries its line in the steps), ONE check with fresh
// numbers whose wrong options are the real mistakes.
//
// NOTHING HERE IS A PROBLEM OF THE PRACTICE SET OR THE TEST. MATHCOUNTS and
// MISSISSIPPI are Bowen's own examples: they are worked here and nowhere else.
//
// SPINE — line them up, then fix the overcount:
//   1   hero
//   2   spot it: "arrange", "in a row", order matters
//   3   recap: the slots method of TP_01 (Bowen's license plates)
//   4   arrange everything: n!
//   5   arrange some: k slots, counting down
//   6   identical letters: label them, then divide (ZOO, MISSISSIPPI)
//   7   MATHCOUNTS, slowly
//   8   must be together: glue
//   9   must be apart: all − together
//   10  fixed spots and fixed order
//   11  a contest question, slowly (repeats + together + apart)
//   12  the checklist
//
// House notes:
//  · ENGLISH ONLY — AMC8 declares `bilingual: false`; no `vn*` twins.
//  · Prefer inline `$…$`; every slide must fit 1280 × 720 without scrolling.
//  · `check` is always the LAST key on its slide.
//  · A `steps` slide renders no `notes` and carries no diagram with its check.
//  · American spelling, because the contest is American.
//  · A string with an apostrophe is written in double quotes.
import { DIAGRAMS } from './diagrams.js';

const PLAN = '#be185d';
const COUNTING = '#0f766e';

export const notes = [
  // ── 1 · hero ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: COUNTING,
    icon: 'Shuffle',
    brand: 'AMC 8 Prep',
    eyebrow: 'Problem type 2 · Counting',
    title: 'Arrangements',
    objective: 'I can count arrangements: line everything up, then fix what was counted too many times.',
  },

  // ── 2 · spot it ───────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'Crosshair',
    eyebrow: 'Arrangements · Spot it',
    title: 'Spot the Question',
    content: 'Many AMC 8 papers ask you to **arrange** things: people in a line, books on a shelf, the letters of a word. Here the **order matters**: A then B is not the same as B then A.\n\nLook for: _arrange_, _in a row_, _line up_, _distinct arrangements of the letters_, _in how many ways can they sit_.',
    notes: [
      { tone: 'write', text: '**Arrange** = put in order. Draw one slot for each **place** in the row.' },
    ],
    check: {
      id: 'chk_spot',
      q: 'Which question asks you to count arrangements, where the order matters?',
      options: [
        { val: 'A', text: 'How many ways can 2 of 5 students be picked to carry a banner together?' },
        { val: 'B', text: 'How many handshakes are there when 5 students meet?' },
        { val: 'C', text: 'How many ways can 5 students stand in a line for a photo?' },
        { val: 'D', text: 'How many teams of 3 can be picked from 5 students?' },
      ],
      correct: 'C',
      expEn: 'In a line, Ana then Ben is a different photo from Ben then Ana, so the order matters. In A, B and D, swapping two people gives the same pair or the same team: those are choosing questions, where you divide by the orders.',
    },
  },

  // ── 3 · recap: the slots ──────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'Layers',
    eyebrow: 'Arrangements · Recap',
    title: 'The Slots Method',
    content: 'From **How Many Ways?**: one slot per place, its choices inside, multiply.\n\nA license plate of 3 letters then 2 digits: $26 \\times 26 \\times 26 \\times 10 \\times 10 = 1{,}757{,}600$ plates. If nothing may repeat: $26 \\times 25 \\times 24 \\times 10 \\times 9 = 1{,}404{,}000$.',
    notes: [
      { tone: 'write', text: '**Slots:** one blank per place, fill in the choices, multiply. No repeats: one fewer each time.' },
    ],
    check: {
      id: 'chk_recap',
      q: 'A locker code is 2 different letters from A to F, then 1 digit from 0 to 9. How many codes are there?',
      options: [
        { val: 'A', text: '$300$' },
        { val: 'B', text: '$360$' },
        { val: 'C', text: '$21$' },
        { val: 'D', text: '$30$' },
      ],
      correct: 'A',
      expEn: 'Three slots: 6 letters, then 5 (the letters must be different), then 10 digits. $6 \\times 5 \\times 10 = 300$. B lets the two letters be the same. C adds the slots. D forgets the digit.',
    },
  },

  // ── 4 · arrange everything ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'BookOpen',
    eyebrow: 'Arrangements · Everything',
    title: 'Arrange Everything',
    ratio: 46,
    inlineSvg: DIAGRAMS.BOOKS,
    content: 'Line up **all** of them. Any of the 5 books can go first, then 4 are left, then 3, and so on: $5! = 120$.\n\nKnow these: $4! = 24$, $5! = 120$, $6! = 720$, $7! = 5040$.',
    notes: [
      { tone: 'write', text: '**n different things in a row:** $n! = n \\times (n - 1) \\times \\dots \\times 2 \\times 1$.' },
    ],
    check: {
      id: 'chk_fact',
      q: 'In how many ways can 6 children stand in a line for a photo?',
      options: [
        { val: 'A', text: '$120$' },
        { val: 'B', text: '$720$' },
        { val: 'C', text: '$21$' },
        { val: 'D', text: '$46{,}656$' },
      ],
      correct: 'B',
      expEn: 'Six places, one child fewer each time: $6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 720$. A is $5!$, one place short. C adds $6 + 5 + 4 + 3 + 2 + 1$. D is $6 \\times 6 \\times 6 \\times 6 \\times 6 \\times 6$, which lets one child stand in every place.',
    },
  },

  // ── 5 · arrange some ──────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'ArrowDownUp',
    eyebrow: 'Arrangements · Some',
    title: 'Arrange Some',
    content: 'Only **some** of the things go in the row. Play 3 of your 10 songs, in order: $10 \\times 9 \\times 8 = 720$. Draw 3 slots, count down, and **stop**.\n\nWith factorials it is $\\dfrac{10!}{7!}$: the 7 songs left out cancel.',
    notes: [
      { tone: 'write', text: '**Arrange k of n:** k slots, counting down from n. That is $\\tfrac{n!}{(n - k)!}$.' },
    ],
    check: {
      id: 'chk_perm',
      q: 'A shelf has room for 4 trophies in a row, and there are 7 trophies to choose from. In how many ways can the shelf be filled?',
      options: [
        { val: 'A', text: '$35$' },
        { val: 'B', text: '$210$' },
        { val: 'C', text: '$5040$' },
        { val: 'D', text: '$840$' },
      ],
      correct: 'D',
      expEn: 'Four slots, counting down from 7: $7 \\times 6 \\times 5 \\times 4 = 840$, which is $\\tfrac{7!}{3!}$. A counts groups of 4, as if the order on the shelf did not matter. B is $\\tfrac{7!}{4!}$: it divides by the wrong factorial and stops one slot short. C lines up all 7.',
    },
  },

  // ── 6 · identical letters ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'Copy',
    eyebrow: 'Arrangements · Ask 1',
    title: 'Identical Letters',
    ratio: 46,
    inlineSvg: DIAGRAMS.COPIES,
    content: "Label the two O's of ZOO: $3! = 6$ orders. Take the labels off and each word appears **twice**: $6 \\div 2 = 3$ words.\n\nMISSISSIPPI (four I's, four S's, two P's): $11! \\div (4! \\times 4! \\times 2!) = 34{,}650$.",
    notes: [
      { tone: 'write', text: '**Identical letters:** count as if all different, then **÷ the orders of each repeated letter**.' },
    ],
    check: {
      id: 'chk_same',
      q: 'How many distinct arrangements are there of the letters of TOMORROW?',
      options: [
        { val: 'A', text: '$3360$' },
        { val: 'B', text: '$8064$' },
        { val: 'C', text: '$6720$' },
        { val: 'D', text: '$40{,}320$' },
      ],
      correct: 'A',
      expEn: "TOMORROW has 8 letters: three O's and two R's. $\\dfrac{8!}{3! \\times 2!} = \\dfrac{40{,}320}{12} = 3360$. B divides by $3 + 2 = 5$, the number of repeated letters, not by their orders. C divides by $3!$ only and forgets the R's. D forgets to divide.",
    },
  },

  // ── 7 · MATHCOUNTS ────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: COUNTING,
    icon: 'Type',
    eyebrow: 'Arrangements · Count the repeats',
    title: 'MATHCOUNTS',
    content: 'How many distinct arrangements are there of the letters of **MATHCOUNTS**?',
    steps: [
      { text: '**List the letters.** There are 10: M, A, T, H, C, O, U, N, T, S. Only the T comes twice.' },
      { text: '**Arrange them as if all different.** $10! = 3{,}628{,}800$.' },
      { text: '**Divide by the orders of each repeat.** $\\dfrac{10!}{2!} = 1{,}814{,}400$.' },
    ],
    check: {
      id: 'chk_mathcounts',
      q: 'How many distinct arrangements are there of the letters of ALABAMA?',
      options: [
        { val: 'A', text: '$5040$' },
        { val: 'B', text: '$1260$' },
        { val: 'C', text: '$210$' },
        { val: 'D', text: '$2520$' },
      ],
      correct: 'C',
      expEn: 'ALABAMA has 7 letters, and the A comes four times. $\\dfrac{7!}{4!} = \\dfrac{5040}{24} = 210$. B divides by 4, not by $4! = 24$. D divides by $2!$, as if the A came twice. A forgets to divide.',
    },
  },

  // ── 8 · must be together ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'Link',
    eyebrow: 'Arrangements · Ask 2',
    title: 'Must Be Together',
    ratio: 46,
    inlineSvg: DIAGRAMS.GLUE,
    content: 'MATHCOUNTS with **A, O and U together**: glue them into one block. That leaves 8 units, T twice.\n\nThe letters in the block can still swap: $3!$ orders. In all, $\\tfrac{8!}{2!} \\times 3! = 120{,}960$.',
    notes: [
      { tone: 'write', text: '**Must be together:** glue them into **one block**. Arrange the units, then **× the orders inside**.' },
    ],
    check: {
      id: 'chk_glue',
      q: 'Five friends line up for a photo. Two of them, Ana and Ben, must stand next to each other. In how many ways can they line up?',
      options: [
        { val: 'A', text: '$24$' },
        { val: 'B', text: '$48$' },
        { val: 'C', text: '$72$' },
        { val: 'D', text: '$120$' },
      ],
      correct: 'B',
      expEn: 'Glue Ana and Ben: 4 units, $4! = 24$ lines. Inside the block it is Ana then Ben, or Ben then Ana: $\\times 2$. $24 \\times 2 = 48$. A forgets the orders inside the block. C is the number of lines with the two apart. D ignores the rule.',
    },
  },

  // ── 9 · must be apart ─────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'Unlink',
    eyebrow: 'Arrangements · Ask 3',
    title: 'Must Be Apart',
    content: "\"Not next to each other\" hides many cases, so count the **opposite**.\n\nMATHCOUNTS with the T's **apart**: all $1{,}814{,}400$ less the ones with the T's together. Glue TT: 9 units, $9! = 362{,}880$ (two T's have 1 order). $1{,}814{,}400 - 362{,}880 = 1{,}451{,}520$.",
    notes: [
      { tone: 'write', text: '**Must be apart:** all $-$ together.' },
    ],
    check: {
      id: 'chk_apart',
      q: 'Six books go on a shelf. Two of them are dictionaries, and they must not be next to each other. In how many ways can the books be arranged?',
      options: [
        { val: 'A', text: '$240$' },
        { val: 'B', text: '$600$' },
        { val: 'C', text: '$720$' },
        { val: 'D', text: '$480$' },
      ],
      correct: 'D',
      expEn: 'All: $6! = 720$. Dictionaries together: glue them, $5! \\times 2 = 240$. Apart: $720 - 240 = 480$. A is the count with them together. B forgets the 2 orders inside the glued block. C ignores the rule.',
    },
  },

  // ── 10 · fixed spots, fixed order ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'MapPin',
    eyebrow: 'Arrangements · Ask 4',
    title: 'Fixed Spots, Fixed Order',
    content: '**A fixed spot:** fill it first. MATHCOUNTS starting with M: 9 letters left, T twice, $\\tfrac{9!}{2!} = 181{,}440$.\n\n**A fixed order:** A, O, U in that order, not always together. Only 1 of their $3!$ orders counts, so treat them like a repeated letter: $10! \\div (2! \\times 3!) = 302{,}400$.',
    notes: [
      { tone: 'write', text: '**Fixed spot:** fill it first. **Fixed order** for k things: $\\div k!$.' },
    ],
    check: {
      id: 'chk_fixed',
      q: 'The 6 letters of PLANET are arranged so that A comes somewhere before E. How many arrangements are there?',
      options: [
        { val: 'A', text: '$120$' },
        { val: 'B', text: '$240$' },
        { val: 'C', text: '$360$' },
        { val: 'D', text: '$720$' },
      ],
      correct: 'C',
      expEn: 'A and E can come in 2 orders, and only 1 is allowed: $\\dfrac{6!}{2!} = 360$, exactly half of the 720. A glues A then E together, but they do not need to touch. B counts A and E next to each other. D ignores the rule.',
    },
  },

  // ── 11 · a contest question, slowly ───────────────────────────────────────
  {
    layout: 'steps',
    accent: COUNTING,
    icon: 'Target',
    eyebrow: 'Arrangements · Put it together',
    title: 'A Contest Question, Slowly',
    content: "How many arrangements of **BALLOON** have the L's **together** and the O's **apart**?",
    steps: [
      { text: "**Glue the L's.** B, A, LL, O, O, N: 6 units, O twice. $\\tfrac{6!}{2!} = 360$ (the L's are alike: 1 order inside)." },
      { text: "**Count the O's together too.** Glue them as well: B, A, LL, OO, N. $5! = 120$." },
      { text: '**Apart = all − together.** $360 - 120 = 240$.' },
    ],
    check: {
      id: 'chk_contest',
      q: "How many arrangements of the letters of LETTER start with L and have the two T's next to each other?",
      options: [
        { val: 'A', text: '$6$' },
        { val: 'B', text: '$12$' },
        { val: 'C', text: '$24$' },
        { val: 'D', text: '$30$' },
      ],
      correct: 'B',
      expEn: "Put L first. Glue the T's: the units E, TT, E, R, with E twice. $\\dfrac{4!}{2!} = 12$. The T's are the same letter, so the block has 1 order inside. A also divides by $2!$ for the T's, but they are one block now. C forgets that the E's repeat. D ignores the rule about the T's.",
    },
  },

  // ── 12 · checklist ────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: PLAN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you practice',
    title: 'Ready to Arrange?',
    content: '> Copy every orange **Write** card into your notebook. Then open **Step by Step**.',
    items: [
      { text: 'All different, all in a row: n!' },
      { text: 'Only k of them: k slots, counting down.' },
      { text: 'Identical letters: ÷ the orders of each repeat.' },
      { text: 'Must be together: glue, arrange, × the orders inside.' },
      { text: 'Must be apart: all − together.' },
      { text: 'Fixed spot: fill it first. Fixed order: ÷ k!' },
    ],
  },
];
