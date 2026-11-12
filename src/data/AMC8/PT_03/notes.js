// src/data/AMC8/PT_03/notes.js
// PT_03 — Practice Test 3. The toolkit deck read BEFORE the student sits the
// timed 25-question practice test (the 2026 paper).
//
// Built to the PT_01 shape (docs/amc8-course.md, "The toolkit deck"):
//   eyebrow  "<Topic> · <tool>", in that topic's colour
//   body     the idea in a sentence or two, and one example (or a diagram)
//   Write    one orange card, the line to copy — never a repeat of the body
//   check    one question with fresh numbers, last key on the slide
// No reveals and no activities.
//
// Like PT_02, the plan is ONE recap slide; the other ten slides spend
// themselves on nine new tools.
//
// THE TEST IS NEVER WORKED HERE. Every example and check uses fresh numbers
// and a fresh context. The deck teaches the idea a question leans on; the
// question itself stays the student's own to meet under the clock.
//
// SPINE:
//   1      hero
//   2      the plan, again
//   3–5    Number: percent change; a percent of people; divisible by 4
//   6–8    Algebra: part to whole; equally spaced; same time
//   9–10   Geometry: a tilted square; a band around circles
//   11     Counting: build it up
//   12     the checklist
//
// House notes:
//  · ENGLISH ONLY — AMC8 declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields; prefer inline `$\dfrac{}{}$` — a
//    display block costs ~180 px and every slide must fit 1280 × 720.
//  · `check` is always the LAST key on its slide.
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
    eyebrow: 'Practice Test 3 · Before you start',
    title: 'Test-Day Toolkit 3',
    objective: 'I can use the plan, and nine new tools, on a third contest paper.',
  },

  // ── 2 · the plan, again ──────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: PLAN,
    icon: 'ListChecks',
    columns: 3,
    eyebrow: 'The plan · Same as last time',
    title: 'The Plan, One More Time',
    content: 'The rules have not changed: 25 questions, 40 minutes, 1 point for a right answer, and nothing taken off for a wrong one.',
    notes: [
      { tone: 'write', badge: 'Guess', icon: 'Target', text: 'Bubble a **guess** for every blank. A wrong answer costs nothing.' },
      { tone: 'write', badge: 'Two passes', icon: 'Repeat', text: 'Do the **fast** ones first. Circle the rest and come back.' },
      { tone: 'write', badge: 'The choices', icon: 'Crosshair', text: '**Estimate**, cross out, and test the choices.' },
    ],
    check: {
      id: 'chk_plan3',
      q: 'With 2 minutes left you have 4 blanks. Best move?',
      options: [
        { val: 'A', text: 'Leave them blank, since a wrong answer might cost points' },
        { val: 'B', text: 'Work one of them fully and leave the other three blank' },
        { val: 'C', text: 'Bubble a guess for all four' },
        { val: 'D', text: 'Check your earlier answers instead' },
      ],
      correct: 'C',
      expEn: 'Nothing is taken off for a wrong answer, so a guess is free and can only add points. A is a worry that does not apply to this contest. B leaves three free chances on the table. D can wait: a blank can never score, but a checked answer was probably right already.',
    },
  },

  // ── 3 · Number: percent change ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: NUMBER,
    icon: 'Hash',
    eyebrow: 'Number · Percent change',
    title: 'Percent Change Is Multiplying',
    content: 'Up 20% is $\\times 1.2$. Down 25% is $\\times 0.75$. Changes in a row multiply: $1.2 \\times 0.75 = 0.9$, so you end at 90% of the start.',
    notes: [
      { tone: 'write', text: '**Percent change:** up 20% is $\\times 1.2$; down 20% is $\\times 0.8$. Changes in a row **multiply**.' },
    ],
    check: {
      id: 'chk_percent_change',
      q: 'A score of 200 goes up 10%, then down 10%. What is it now?',
      options: [
        { val: 'A', text: '$200$' },
        { val: 'B', text: '$198$' },
        { val: 'C', text: '$180$' },
        { val: 'D', text: '$202$' },
      ],
      correct: 'B',
      expEn: 'Up 10% is $200 \\times 1.1 = 220$. Down 10% of that is $220 \\times 0.9 = 198$. A assumes the two changes cancel, but the second one is taken from a bigger number. C only takes the 10% off. D only adds it.',
    },
  },

  // ── 4 · Number: a percent is a fraction ──────────────────────────────────
  {
    layout: 'callout',
    accent: NUMBER,
    icon: 'Divide',
    eyebrow: 'Number · Percents of people',
    title: 'A Percent Is a Fraction',
    content: 'Exactly 35% of a class is left-handed. $\\tfrac{35}{100} = \\tfrac{7}{20}$, so the class size must be a multiple of 20.',
    notes: [
      { tone: 'write', text: '**Fewest people:** write the percent as a fraction in lowest terms. The bottom number is the smallest group.' },
    ],
    check: {
      id: 'chk_percent_people',
      q: 'Exactly 45% of a club wear glasses. What is the fewest members the club can have?',
      options: [
        { val: 'A', text: '$20$' },
        { val: 'B', text: '$9$' },
        { val: 'C', text: '$45$' },
        { val: 'D', text: '$100$' },
      ],
      correct: 'A',
      expEn: '$\\tfrac{45}{100} = \\tfrac{9}{20}$ in lowest terms, so the club has a multiple of 20 members, and the fewest is 20 (9 of them wear glasses). B is the top of the fraction. C is the percent used as a head count. D works, but it is not the fewest.',
    },
  },

  // ── 5 · Number: divisible by 4 ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: NUMBER,
    icon: 'Grid3x3',
    eyebrow: 'Number · Divisibility',
    title: 'Divisible by 4?',
    content: 'Only the last two digits matter, because 100 is a multiple of 4. $3{,}516$ works (16 is a multiple of 4). $7{,}342$ does not (42 is not).',
    notes: [
      { tone: 'write', text: '**Divisible by 4:** look at the last two digits only.' },
    ],
    check: {
      id: 'chk_div4',
      q: 'Which of these is divisible by 4?',
      options: [
        { val: 'A', text: '$5{,}126$' },
        { val: 'B', text: '$8{,}314$' },
        { val: 'C', text: '$2{,}752$' },
        { val: 'D', text: '$9{,}930$' },
      ],
      correct: 'C',
      expEn: 'The last two digits of 2,752 are 52, and $52 = 4 \\times 13$. In A the 26 is not a multiple of 4, in B the 14 is not, and in D the 30 is not. B and D are even numbers, but even is not enough.',
    },
  },

  // ── 6 · Algebra: part to whole ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: RATIO,
    icon: 'Layers',
    eyebrow: 'Algebra · Part to whole',
    title: 'A Part Tells You the Whole',
    content: '$\\tfrac{3}{4}$ of a tank is 36 liters. So $\\tfrac{1}{4}$ is $36 \\div 3 = 12$ liters, and the full tank is $4 \\times 12 = 48$.',
    notes: [
      { tone: 'write', text: '**Part to whole:** find one piece, then all the pieces.' },
    ],
    check: {
      id: 'chk_part_whole',
      q: '$\\tfrac{2}{3}$ of a book is 80 pages. How many pages are in the whole book?',
      options: [
        { val: 'A', text: '$160$' },
        { val: 'B', text: '$100$' },
        { val: 'C', text: '$107$' },
        { val: 'D', text: '$120$' },
      ],
      correct: 'D',
      expEn: 'Two pieces are 80 pages, so one piece is 40, and three pieces make $3 \\times 40 = 120$. A doubles the 80. B adds 20 by guessing. C computes $80 \\times \\tfrac{4}{3}$, the wrong way round.',
    },
  },

  // ── 7 · Algebra: equal spacing ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: RATIO,
    icon: 'Scale',
    eyebrow: 'Algebra · Equal spacing',
    title: 'Equally Spaced Numbers',
    content: 'Take 7, 12, 17. The middle number is the average, so the sum is $3 \\times 12 = 36$.',
    notes: [
      { tone: 'write', text: '**Equally spaced:** the middle number is the average. Sum $=$ how many $\\times$ the middle.' },
    ],
    check: {
      id: 'chk_equal_spacing',
      q: 'Five equally spaced numbers add up to 100. What is the middle number?',
      options: [
        { val: 'A', text: '$10$' },
        { val: 'B', text: '$20$' },
        { val: 'C', text: '$25$' },
        { val: 'D', text: '$50$' },
      ],
      correct: 'B',
      expEn: 'The middle number is the average: $100 \\div 5 = 20$. A is $100 \\div 10$. C divides by 4, and D by 2, so each uses the wrong count.',
    },
  },

  // ── 8 · Algebra: same time, same ratio ───────────────────────────────────
  {
    layout: 'callout',
    accent: RATIO,
    icon: 'Gauge',
    eyebrow: 'Algebra · Same time',
    title: 'Same Time, Same Ratio',
    content: 'A cyclist is 3 times as fast as a walker, so in the same time she goes 3 times as far. Start 8 km apart and move toward each other: they share the 8 km as 1 part and 3 parts, which is 2 km and 6 km.',
    notes: [
      { tone: 'write', text: '**Same time:** distances are in the ratio of the speeds. Share the total distance in that ratio.' },
    ],
    check: {
      id: 'chk_same_time',
      q: 'Two friends start at opposite ends of a 600 m path and walk toward each other. One walks twice as fast. How far does the slower one walk before they meet?',
      options: [
        { val: 'A', text: '$300$ m' },
        { val: 'B', text: '$150$ m' },
        { val: 'C', text: '$200$ m' },
        { val: 'D', text: '$400$ m' },
      ],
      correct: 'C',
      expEn: 'The distances are in the ratio 1 to 2, which is 3 parts in all: $600 \\div 3 = 200$ m for each part. The slower friend gets 1 part, 200 m. A splits the path evenly. B halves it twice. D is the share of the faster friend.',
    },
  },

  // ── 9 · Geometry: a tilted square ────────────────────────────────────────
  {
    layout: 'split',
    accent: GEOMETRY,
    icon: 'Square',
    eyebrow: 'Geometry · Tilted squares',
    title: 'A Tilted Square',
    ratio: 50,
    inlineSvg: DIAGRAMS.TILTED_SQUARE,
    content: 'A side that goes 4 across and 1 up is the long side of a right triangle, so $\\text{side}^2 = 4^2 + 1^2 = 17$. That is the area.',
    notes: [
      { tone: 'write', text: '**Tilted square:** if a side goes $a$ across and $b$ up, the area is $a^2 + b^2$.' },
    ],
    check: {
      id: 'chk_tilted_square',
      q: 'A side of a tilted square goes 2 across and 5 up. What is its area?',
      options: [
        { val: 'A', text: '$10$' },
        { val: 'B', text: '$20$' },
        { val: 'C', text: '$49$' },
        { val: 'D', text: '$29$' },
      ],
      correct: 'D',
      expEn: 'The area is the side squared: $2^2 + 5^2 = 4 + 25 = 29$. A multiplies 2 by 5. B doubles that. C squares the sum, $(2 + 5)^2$, which is the area of the box around the square.',
    },
  },

  // ── 10 · Geometry: a band around circles ─────────────────────────────────
  {
    layout: 'split',
    accent: GEOMETRY,
    icon: 'CircleDot',
    eyebrow: 'Geometry · Bands',
    title: 'A Band Around Circles',
    ratio: 50,
    inlineSvg: DIAGRAMS.BAND,
    content: 'The straight parts match the sides of the shape joining the centers. The curved parts always add up to one whole circle.',
    notes: [
      { tone: 'write', text: '**Tight band:** straight parts $=$ the sides joining the centers. Curved parts $=$ **one** whole circle.' },
    ],
    check: {
      id: 'chk_band',
      q: 'Three coins of radius 1 each touch the other two. A band is wrapped tightly around them. How long is the band?',
      options: [
        { val: 'A', text: '$6 + 2\\pi$' },
        { val: 'B', text: '$6 + 3\\pi$' },
        { val: 'C', text: '$12 + 2\\pi$' },
        { val: 'D', text: '$6 + \\pi$' },
      ],
      correct: 'A',
      expEn: 'The centers form a triangle with sides 2, so the straight parts total $3 \\times 2 = 6$. The curved parts make one whole circle, $2\\pi \\times 1 = 2\\pi$. B counts three circles. C doubles the straight parts. D counts only half a circle.',
    },
  },

  // ── 11 · Counting: build it up ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'GitMerge',
    eyebrow: 'Counting · Build it up',
    title: 'Build It Up',
    content: 'Climb stairs 1 or 2 steps at a time. The last move was a 1 or a 2, so ways to a step = ways to the step below + ways to two below: 1, 2, 3, 5, …',
    notes: [
      { tone: 'write', text: '**Build it up:** ways to here $=$ the ways to each place you could have come from, added.' },
    ],
    check: {
      id: 'chk_build_up',
      q: 'A frog climbs 5 steps, hopping 1 or 2 steps at a time. How many ways can it do it?',
      options: [
        { val: 'A', text: '$5$' },
        { val: 'B', text: '$6$' },
        { val: 'C', text: '$8$' },
        { val: 'D', text: '$10$' },
      ],
      correct: 'C',
      expEn: 'Build up from step 1: the ways are 1, 2, 3, 5, 8, each the sum of the two before it, so step 5 has 8 ways. A is the number of steps. B and D are guesses that skip the adding.',
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
    title: 'Ready for Test 3?',
    content: '> Copy every orange **Write** card into your notebook. Then start the Practice Test.',
    items: [
      { text: 'Guess every blank. Two passes. Use the choices.' },
      { text: 'Percent change multiplies. A percent is a fraction.' },
      { text: 'Divisible by 4: the last two digits.' },
      { text: 'Part to whole. Equally spaced: the middle is the average.' },
      { text: 'Same time: share the distance in the ratio of the speeds.' },
      { text: 'Tilted square: $a^2 + b^2$. Band: sides plus one circle. Build it up.' },
    ],
  },
];
