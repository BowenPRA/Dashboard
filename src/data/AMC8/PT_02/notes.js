// src/data/AMC8/PT_02/notes.js
// PT_02 — Practice Test 2. The toolkit deck read BEFORE the student sits the
// timed 25-question practice test (the 2025 paper).
//
// Built to the PT_01 shape (docs/amc8-course.md, "The toolkit deck"):
//   eyebrow  "<Topic> · <tool>", in that topic's colour
//   body     the idea in a sentence or two, and one example (or a diagram)
//   Write    one orange card, the line to copy — never a repeat of the body
//   check    one question with fresh numbers, last key on the slide
// No reveals and no activities.
//
// The one change from PT_01: the plan is ONE recap slide, not three. The
// student met the plan in Practice Test 1; this deck spends its slides on
// nine new tools instead.
//
// THE TEST IS NEVER WORKED HERE. Every example and check uses fresh numbers
// and a fresh context. The deck teaches the idea a question leans on; the
// question itself stays the student's own to meet under the clock.
//
// SPINE:
//   1      hero
//   2      the plan, again
//   3–4    Number: remainders repeat; factor pairs
//   5–7    Algebra: mean and median; speed × time; a fraction of a group
//   8–9    Geometry: a square in a circle; walking on a grid
//   10–11  Counting: at least minus at least; pair them up
//   12     the checklist
//
// House notes:
//  · ENGLISH ONLY — AMC8 declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields; prefer inline `$\dfrac{}{}$` — a
//    display block costs ~180 px and every slide must fit 1280 × 720.
//  · `check` is always the LAST key on its slide.
//  · A `steps` slide renders no `notes` and carries no diagram with its check.
//  · American spelling, because the contest is American.
import { DIAGRAMS } from './diagrams.js';

// One colour per part of the deck, matching the topics on the results screen.
const PLAN = '#be185d';
const NUMBER = '#7c3aed';
const RATIO = '#c2410c';
const GEOMETRY = '#1a5fa8';
const COUNTING = '#0f766e';

export const notes = [
  // ── 1 · hero ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PLAN,
    icon: 'Target',
    brand: 'AMC 8 Prep',
    eyebrow: 'Practice Test 2 · Before you start',
    title: 'Test-Day Toolkit 2',
    objective: 'I can use the plan, and nine new tools, on a second contest paper.',
  },

  // ── 2 · the plan, again ──────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: PLAN,
    icon: 'ListChecks',
    columns: 3,
    eyebrow: 'The plan · Same as last time',
    title: 'The Plan for 40 Minutes',
    content: 'The rules have not changed: 25 questions, 40 minutes, 1 point for a right answer, and nothing taken off for a wrong one.',
    notes: [
      { tone: 'write', badge: 'Guess', icon: 'Target', text: 'Bubble a **guess** for every blank. A wrong answer costs nothing.' },
      { tone: 'write', badge: 'Two passes', icon: 'Repeat', text: 'Do the **fast** ones first. Circle the rest and come back.' },
      { tone: 'write', badge: 'The choices', icon: 'Crosshair', text: '**Estimate**, cross out, and test the choices.' },
    ],
    check: {
      id: 'chk_stuck',
      q: 'You have spent 5 minutes on question 12, and you are still stuck. What is the best move?',
      options: [
        { val: 'A', text: 'Keep going until it works' },
        { val: 'B', text: 'Bubble a guess, circle it, move on' },
        { val: 'C', text: 'Leave it blank and move on' },
        { val: 'D', text: 'Go back to question 1' },
      ],
      correct: 'B',
      expEn: 'Every question is worth 1 point, so the time is better spent on questions you can do. A guess now costs nothing, and the circle brings you back in pass 2. C throws away the free guess. A and D waste the clock.',
    },
  },

  // ── 3 · Number: remainders repeat ────────────────────────────────────────
  {
    layout: 'callout',
    accent: NUMBER,
    icon: 'Repeat',
    eyebrow: 'Number · Remainders',
    title: 'Remainders Repeat',
    content: 'Divide 1, 2, 3, 4, 5, … by 4 and the remainders go 1, 2, 3, 0, 1, 2, 3, 0, …: one block of four, over and over.\n\nSo only the remainder matters. 100 days after a Monday is a Wednesday, because $100 = 14 \\times 7 + 2$.',
    notes: [
      { tone: 'write', text: '**Remainders repeat.** Find one cycle, count the whole cycles, then deal with the few left over.' },
    ],
    check: {
      id: 'chk_cycle',
      q: 'Lights flash red, yellow, green, blue, red, yellow, green, blue, … in that order. What color is the 30th flash?',
      options: [
        { val: 'A', text: 'Red' },
        { val: 'B', text: 'Yellow' },
        { val: 'C', text: 'Green' },
        { val: 'D', text: 'Blue' },
      ],
      correct: 'B',
      expEn: '$30 = 7 \\times 4 + 2$: seven full cycles, then 2 more flashes, red and yellow. D is the 28th flash, the end of the seventh cycle. A is the 29th. C would be the 31st.',
    },
  },

  // ── 4 · Number: factor pairs ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: NUMBER,
    icon: 'Grid3x3',
    eyebrow: 'Number · Factor pairs',
    title: 'Factor Pairs',
    ratio: 50,
    inlineSvg: DIAGRAMS.FACTOR_PAIRS,
    content: 'Every whole number splits into pairs that multiply to it: $24 = 1 \\times 24 = 2 \\times 12 = 3 \\times 8 = 4 \\times 6$.\n\nList them from 1 up, and stop when the pair meets in the middle: 4 pairs, so 8 factors.',
    notes: [
      { tone: 'write', text: '**Factor pairs:** list them from 1 up; stop in the middle.\n**One less than a square:** $n^2 - 1 = (n - 1)(n + 1)$.' },
    ],
    check: {
      id: 'chk_factors',
      q: 'How many whole numbers divide $48$ exactly?',
      options: [
        { val: 'A', text: '$10$' },
        { val: 'B', text: '$8$' },
        { val: 'C', text: '$5$' },
        { val: 'D', text: '$9$' },
      ],
      correct: 'A',
      expEn: 'The pairs are $1 \\times 48$, $2 \\times 24$, $3 \\times 16$, $4 \\times 12$ and $6 \\times 8$: five pairs, so 10 factors. B misses a pair. C counts the pairs, not the numbers in them. D needs a middle pair like $7 \\times 7$, but 48 is not a square.',
    },
  },

  // ── 5 · Algebra: mean and median ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: RATIO,
    icon: 'Scale',
    eyebrow: 'Algebra · Averages',
    title: 'Mean and Median',
    content: 'For 3, 5, 8, 12 the **mean** is $\\dfrac{3 + 5 + 8 + 12}{4} = 7$. The **median** is the middle of the ordered list; with two middle numbers, take their average: $\\dfrac{5 + 8}{2} = 6.5$.',
    notes: [
      { tone: 'write', text: '**Mean** $=$ total $\\div$ how many, so the total $=$ mean $\\times$ how many.\n**Median:** the middle number, once the list is in order.' },
    ],
    check: {
      id: 'chk_mean',
      q: 'The mean of four numbers is 9. Three of them are 4, 8 and 10. What is the fourth?',
      options: [
        { val: 'A', text: '$14$' },
        { val: 'B', text: '$9$' },
        { val: 'C', text: '$22$' },
        { val: 'D', text: '$5$' },
      ],
      correct: 'A',
      expEn: 'The four numbers add to $4 \\times 9 = 36$, and $36 - 4 - 8 - 10 = 14$. B is the mean itself. C is the sum of the three. D uses $3 \\times 9$ for the total, but there are four numbers.',
    },
  },

  // ── 6 · Algebra: distance = speed × time ─────────────────────────────────
  {
    layout: 'steps',
    accent: RATIO,
    icon: 'Gauge',
    eyebrow: 'Algebra · Speed',
    title: 'Distance = Speed × Time',
    content: 'Two cyclists 30 km apart ride toward each other at 12 km/h and 18 km/h. Where do they meet?',
    steps: [
      { text: '**Add the speeds.** Together they close $12 + 18 = 30$ km every hour.' },
      { text: '**Find the time.** $30 \\div 30 = 1$ hour until they meet.' },
      { text: '**Answer the question.** The slower one rides $12 \\times 1 = 12$ km, so they meet 12 km from where it started.' },
    ],
    check: {
      id: 'chk_speed',
      q: 'A car drives 60 km at 30 km/h, then 60 km more at 60 km/h. How long does the whole trip take?',
      options: [
        { val: 'A', text: '$3$ hours' },
        { val: 'B', text: '$2$ hours' },
        { val: 'C', text: '$4$ hours' },
        { val: 'D', text: '$2\\tfrac{2}{3}$ hours' },
      ],
      correct: 'A',
      expEn: 'Time $=$ distance $\\div$ speed, one part at a time: $60 \\div 30 = 2$ hours, then $60 \\div 60 = 1$ hour. B uses the fast speed for the whole trip, C the slow one. D averages the speeds to 45 km/h, but the car spends longer at the slow speed.',
    },
  },

  // ── 7 · Algebra: a fraction of a group ───────────────────────────────────
  {
    layout: 'callout',
    accent: RATIO,
    icon: 'Divide',
    eyebrow: 'Algebra · Fractions',
    title: 'A Fraction of a Group',
    content: 'A club has 60 members. $\\tfrac{1}{3}$ of them walk to school and $\\tfrac{1}{4}$ cycle.\n\nWalkers: $60 \\div 3 = 20$. Cyclists: $60 \\div 4 = 15$. The rest: $60 - 20 - 15 = 25$.',
    notes: [
      { tone: 'write', text: '**A fraction of a number:** divide by the bottom, then multiply by the top: $\\tfrac{3}{5}$ of 40 is $40 \\div 5 \\times 3 = 24$.\n**The rest** is the total minus every part.' },
    ],
    check: {
      id: 'chk_fraction',
      q: 'There are 40 students. $\\tfrac{1}{4}$ of them play piano and $\\tfrac{1}{5}$ play violin, and no one plays both. How many play neither?',
      options: [
        { val: 'A', text: '$22$' },
        { val: 'B', text: '$18$' },
        { val: 'C', text: '$30$' },
        { val: 'D', text: '$32$' },
      ],
      correct: 'A',
      expEn: 'Piano: $40 \\div 4 = 10$. Violin: $40 \\div 5 = 8$. Neither: $40 - 10 - 8 = 22$. B counts the players instead. C takes away only the piano players, and D only the violin players.',
    },
  },

  // ── 8 · Geometry: a square in a circle ───────────────────────────────────
  {
    layout: 'split',
    accent: GEOMETRY,
    icon: 'CircleDot',
    eyebrow: 'Geometry · Circles',
    title: 'A Square in a Circle',
    ratio: 50,
    inlineSvg: DIAGRAMS.SQUARE_IN_CIRCLE,
    content: 'When the corners of a square sit on a circle, its diagonal is a **diameter**. In a circle of radius 3 the diagonal is 6, so the square is $6 \\times 6 \\div 2 = 18$.',
    notes: [
      { tone: 'write', text: '**A square from its diagonal:** area $= d \\times d \\div 2$.\nIn a circle of radius $r$, $d = 2r$, so the square is $2r^2$.' },
    ],
    check: {
      id: 'chk_square_circle',
      q: 'A square has its four corners on a circle of radius 5. What is the area of the square?',
      options: [
        { val: 'A', text: '$50$' },
        { val: 'B', text: '$100$' },
        { val: 'C', text: '$25$' },
        { val: 'D', text: '$10$' },
      ],
      correct: 'A',
      expEn: 'The diagonal is a diameter, 10, so the area is $10 \\times 10 \\div 2 = 50$. B forgets to halve. C uses the radius as the side. D is the diagonal, a length and not an area.',
    },
  },

  // ── 9 · Geometry: walking on a grid ──────────────────────────────────────
  {
    layout: 'split',
    accent: GEOMETRY,
    icon: 'Route',
    eyebrow: 'Geometry · Grid distance',
    title: 'Walking on a Grid',
    ratio: 46,
    inlineSvg: DIAGRAMS.GRID_WALK,
    content: 'On a street grid you cannot cut across the blocks. From $P$ to $Q$ is 5 blocks across and 3 up, so every shortest route is $5 + 3 = 8$ blocks.\n\nThe order of the turns does not matter, as long as you never walk back.',
    notes: [
      { tone: 'write', text: '**Grid distance** $=$ blocks across $+$ blocks up or down.' },
    ],
    check: {
      id: 'chk_grid_walk',
      q: 'On a street grid you walk from $(1, 2)$ to $(6, 7)$, then on to $(4, 1)$. What is the shortest total walk, in blocks?',
      options: [
        { val: 'A', text: '$18$' },
        { val: 'B', text: '$14$' },
        { val: 'C', text: '$10$' },
        { val: 'D', text: '$8$' },
      ],
      correct: 'A',
      expEn: 'First leg: 5 across and 5 up, 10 blocks. Second leg: 2 back and 6 down, 8 blocks. Total 18. B cuts across in straight lines, which the streets do not allow. C is only the first leg, and D only the second.',
    },
  },

  // ── 10 · Counting: at least minus at least ───────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'Layers',
    eyebrow: 'Counting · Between',
    title: 'At Least, Minus At Least',
    content: '30 students scored at least 60 points. 12 of them scored at least 80.\n\nSo $30 - 12 = 18$ students scored at least 60 but **less than** 80.',
    notes: [
      { tone: 'write', text: '**Between two marks:** everyone past the lower mark, take away everyone past the higher mark.' },
    ],
    check: {
      id: 'chk_between',
      q: 'In a race, 25 runners finished in under 50 minutes, 9 in under 40 minutes and 4 in under 30 minutes. How many took at least 30 minutes but less than 50?',
      options: [
        { val: 'A', text: '$21$' },
        { val: 'B', text: '$16$' },
        { val: 'C', text: '$5$' },
        { val: 'D', text: '$38$' },
      ],
      correct: 'A',
      expEn: 'Everyone under 50 minutes, 25, take away everyone under 30 minutes, 4: $25 - 4 = 21$. B is $25 - 9$, only from 40 to 50 minutes. C is $9 - 4$, only from 30 to 40. D adds the groups, but the faster runners are already inside the 25.',
    },
  },

  // ── 11 · Counting: pair them up ──────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'Link',
    eyebrow: 'Counting · Pairs',
    title: 'Pair Them Up',
    ratio: 50,
    inlineSvg: DIAGRAMS.PAIR_UP,
    content: 'To add all the numbers from 1 to 10, pair the ends: $1 + 10$, $2 + 9$, $3 + 8$, … Five pairs of 11 make $5 \\times 11 = 55$.',
    notes: [
      { tone: 'write', text: '**Pair the ends:** sum $=$ pairs $\\times$ one pair.\nAn evenly spaced list averages its first and last.' },
    ],
    check: {
      id: 'chk_pairs',
      q: 'What is $1 + 2 + 3 + \\cdots + 20$?',
      options: [
        { val: 'A', text: '$210$' },
        { val: 'B', text: '$200$' },
        { val: 'C', text: '$220$' },
        { val: 'D', text: '$420$' },
      ],
      correct: 'A',
      expEn: 'Pair $1 + 20$, $2 + 19$, …: 10 pairs of 21, so 210. B uses pairs of 20. C uses 11 pairs. D counts every pair twice.',
    },
  },

  // ── 12 · checklist ───────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: PLAN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the test',
    title: 'Ready for Test 2?',
    content: '> Copy every orange **Write** card into your notebook. Then start the Practice Test.',
    items: [
      { text: 'Guess every blank. Two passes. Use the choices.' },
      { text: 'Remainders repeat. List factor pairs from 1 up.' },
      { text: 'Total = mean × how many. Median: the middle.' },
      { text: 'Distance = speed × time, one stretch at a time.' },
      { text: 'A square in a circle: its diagonal is a diameter.' },
      { text: 'Grid distance, at least minus at least, pair the ends.' },
    ],
  },
];
