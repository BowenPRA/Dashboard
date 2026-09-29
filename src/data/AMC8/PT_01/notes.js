// src/data/AMC8/PT_01/notes.js
// PT_01 — Practice Test 1. The "Test-Day Toolkit": the deck read BEFORE the
// student sits the timed 25-question practice test.
//
// STREAMLINED 2026-09-29, at Bowen's request ("simple and clear"): 20 slides
// became 14. The first version taught fourteen small tricks, most of them
// made for one problem each; this one teaches the plan and nine tools, two or
// three for each of the test's four topics.
//
// EVERY TOOL SLIDE HAS THE SAME SHAPE, so the deck reads as one thing:
//   eyebrow  "<Topic> · <tool>", in that topic's colour
//   body     the idea in a sentence or two, and one example (or a diagram)
//   Write    one orange card, the line to copy — never a repeat of the body
//   check    one question with fresh numbers, last key on the slide
// No reveals and no activities: one kind of question, the same every time.
//
// THE TEST IS NEVER WORKED HERE. Every example and check uses fresh numbers
// and a fresh context. The deck teaches the idea a question leans on; the
// question itself stays the student's own to meet under the clock.
//
// SPINE:
//   1      hero
//   2–4    the plan: how it is scored; two passes; use the choices
//   5–6    Number: the ones digit; simplify first
//   7–8    Ratio: ratios are parts; one letter for one part
//   9–10   Geometry: whole minus hole; triangles on a grid
//   11–13  Counting: in order; the opposite; the least possible overlap
//   14     the checklist
//
// House notes:
//  · ENGLISH ONLY — AMC8 declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body).
//    Everything else is inline `$…$` only.
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
    eyebrow: 'Practice Test 1 · Before you start',
    title: 'Test-Day Toolkit',
    objective: 'I can plan my 40 minutes, and pick the right tool for each kind of question.',
  },

  // ── 2 · how it is scored ─────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: PLAN,
    icon: 'ListChecks',
    columns: 3,
    eyebrow: 'The plan · Know the test',
    title: 'How the Test Is Scored',
    content: 'The questions get harder as you go. But a hard question is worth the same as an easy one.',
    notes: [
      { tone: 'info', badge: 'Questions', icon: 'ListChecks', text: '**25**, with five choices each.\nNo calculator.' },
      { tone: 'info', badge: 'Time', icon: 'Timer', text: '**40** minutes.\nAbout a minute and a half each.' },
      { tone: 'info', badge: 'Points', icon: 'Star', text: 'Correct: **1**.\nBlank: 0. Wrong: 0.' },
    ],
    check: {
      id: 'chk_guess',
      q: 'One minute is left. Question 24 is blank, and you have no idea how to do it. What is the best move?',
      options: [
        { val: 'A', text: 'Leave it blank' },
        { val: 'B', text: 'Bubble a guess' },
        { val: 'C', text: 'Change an earlier answer' },
        { val: 'D', text: 'Put the pencil down' },
      ],
      correct: 'B',
      expEn: 'A wrong answer costs nothing, and a blank earns nothing. So a guess can only help: it is right about 1 time in 5. Never leave a blank.',
    },
  },

  // ── 3 · the two-pass plan ────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: PLAN,
    icon: 'Repeat',
    columns: 3,
    eyebrow: 'The plan · The clock',
    title: 'Two Passes, Then Guess',
    content: 'Easy points first, and do not get stuck. One question that eats 5 minutes costs you the time of three others.',
    notes: [
      { tone: 'write', badge: 'Pass 1', icon: 'Zap', text: 'Answer every question you can do **fast**.\nCircle the rest and move on.' },
      { tone: 'write', badge: 'Pass 2', icon: 'RotateCcw', text: 'Go back to the **circled** questions.' },
      { tone: 'write', badge: 'Last 2 minutes', icon: 'Target', text: 'Bubble a **guess** for every blank.' },
    ],
  },

  // ── 4 · use the five choices ─────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PLAN,
    icon: 'Crosshair',
    eyebrow: 'The plan · The choices',
    title: 'Use the Five Choices',
    content: 'One of the five choices is right. You do not always need the full working.',
    steps: [
      { text: '**Estimate and eliminate.** Round, then cross out the choices that are far too big or too small.' },
      { text: '**Test the choices.** Put one back into the question. Start with the middle one.' },
      { text: '**Trust the numbers.** Figures are not always drawn to scale.' },
    ],
    check: {
      id: 'chk_estimate',
      q: 'Do not multiply it out. Which one is $398 \\times 52$?',
      options: [
        { val: 'A', text: '$2{,}696$' },
        { val: 'B', text: '$20{,}696$' },
        { val: 'C', text: '$206{,}960$' },
        { val: 'D', text: '$20{,}693$' },
      ],
      correct: 'B',
      expEn: '$400 \\times 50 = 20{,}000$, so the answer is near 20,000. A is ten times too small and C is ten times too big. D is close, but $8 \\times 2 = 16$, so the answer ends in 6.',
    },
  },

  // ── 5 · Number: the ones digit ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: NUMBER,
    icon: 'Hash',
    eyebrow: 'Number · The ones digit',
    title: 'Only the Last Digits Matter',
    content: '$4{,}317 \\times 29$ ends in 3, because $7 \\times 9 = 63$. You never need the whole answer.\n\nIn a subtraction, borrow when the top digit is too small: $5{,}002 - 347$ ends in 5, because $12 - 7 = 5$.',
    notes: [
      { tone: 'write', text: '**Ones digit:** the last digit of a whole number. When you add, subtract or multiply, only the ones digits decide it.' },
    ],
    check: {
      id: 'chk_ones',
      q: 'What is the ones digit of $47 \\times 63 - 1{,}288$?',
      options: [
        { val: 'A', text: '$9$' },
        { val: 'B', text: '$7$' },
        { val: 'C', text: '$1$' },
        { val: 'D', text: '$3$' },
      ],
      correct: 'D',
      expEn: '$7 \\times 3 = 21$, so the product ends in 1. Then $1 - 8$ needs a borrow: $11 - 8 = 3$. B takes $8 - 1$ the wrong way round. A adds the 8. C stops before the subtraction.',
    },
  },

  // ── 6 · Number: simplify first ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: NUMBER,
    icon: 'Divide',
    eyebrow: 'Number · Fractions to decimals',
    title: 'Simplify First',
    content: 'Make a fraction simple **before** you divide. Then the division is easy.\n\n$\\dfrac{45}{18} = \\dfrac{5}{2} = 2.5$ and $\\dfrac{21}{700} = \\dfrac{3}{100} = 0.03$',
    notes: [
      { tone: 'write', text: '**Know these:** $\\tfrac{1}{2} = 0.5$, $\\tfrac{1}{4} = 0.25$, $\\tfrac{3}{4} = 0.75$, $\\tfrac{1}{5} = 0.2$, $\\tfrac{1}{8} = 0.125$' },
    ],
    check: {
      id: 'chk_simplify',
      q: 'Write $\\dfrac{18}{24} + \\dfrac{14}{200}$ as a decimal.',
      options: [
        { val: 'A', text: '$0.89$' },
        { val: 'B', text: '$0.82$' },
        { val: 'C', text: '$0.757$' },
        { val: 'D', text: '$1.45$' },
      ],
      correct: 'B',
      expEn: '$\\dfrac{18}{24} = \\dfrac{3}{4} = 0.75$ and $\\dfrac{14}{200} = \\dfrac{7}{100} = 0.07$, so the sum is $0.82$. A reads $\\dfrac{14}{200}$ as $0.14$. C reads it as $0.007$. D reads the 200 as 20.',
    },
  },

  // ── 7 · Ratio: ratios are parts ──────────────────────────────────────────
  {
    layout: 'split',
    accent: RATIO,
    icon: 'Scale',
    eyebrow: 'Ratio · Equal parts',
    title: 'Ratios Are Parts',
    ratio: 44,
    inlineSvg: DIAGRAMS.RATIO_PARTS,
    content: 'A ratio of $3 : 5$ means 3 equal parts and 5 equal parts: 8 parts in all.\n\nYou cannot have part of a fruit, so the total is a whole number of those 8 parts.',
    notes: [
      { tone: 'write', text: '**Parts:** a ratio of $a$ to $b$ has $a + b$ equal parts. So the total is a **multiple** of $a + b$.' },
    ],
    check: {
      id: 'chk_ratio_total',
      q: 'apples : oranges $= 3 : 5$. Which of these could be the total number of fruits?',
      options: [
        { val: 'A', text: '$30$' },
        { val: 'B', text: '$35$' },
        { val: 'C', text: '$40$' },
        { val: 'D', text: '$45$' },
      ],
      correct: 'C',
      expEn: 'The total is $3 + 5 = 8$ equal parts, so it must be a multiple of 8. Only 40 is: 15 apples and 25 oranges. 30 and 45 are multiples of 3, and 35 is a multiple of 5, but the total needs 8.',
    },
  },

  // ── 8 · Ratio: one letter for one part ───────────────────────────────────
  {
    layout: 'steps',
    accent: RATIO,
    icon: 'Variable',
    eyebrow: 'Ratio · One letter',
    title: 'When a Ratio Changes',
    content: 'Lan and Minh have stickers in the ratio $5 : 3$. Lan gives Minh 4 stickers, and now they have the same number.',
    steps: [
      { text: '**Call one part $x$.** Lan has $5x$ and Minh has $3x$.' },
      { text: '**Make the change.** Now they are equal: $5x - 4 = 3x + 4$, so $x = 4$.' },
      { text: '**Answer the question.** Lan had $5 \\times 4 = 20$ and Minh had $3 \\times 4 = 12$.' },
    ],
    check: {
      id: 'chk_ratio_change',
      q: 'In a club, boys : girls $= 3 : 2$. Then 5 more girls join, and now boys : girls $= 1 : 1$. How many boys are in the club?',
      options: [
        { val: 'A', text: '$15$' },
        { val: 'B', text: '$5$' },
        { val: 'C', text: '$10$' },
        { val: 'D', text: '$25$' },
      ],
      correct: 'A',
      expEn: 'Boys $3x$, girls $2x$. After the change $3x = 2x + 5$, so $x = 5$ and there are $3 \\times 5 = 15$ boys. B stops at $x$, which is one part. C is the girls at the start. D is everyone at the start.',
    },
  },

  // ── 9 · Geometry: whole minus hole ───────────────────────────────────────
  {
    layout: 'split',
    accent: GEOMETRY,
    icon: 'Square',
    eyebrow: 'Geometry · Area by subtraction',
    title: 'Whole Minus Hole',
    ratio: 44,
    inlineSvg: DIAGRAMS.AREA_SUBTRACT,
    content: 'A frame is hard to cut into pieces. So do not cut it: take the **whole**, then take away the **hole**.\n\nA ring works the same way. It is a big circle with a small circle taken away.',
    notes: [
      { tone: 'write', text: '**Area by subtraction:** the whole minus the hole.\n**Ring:** $\\pi R^2 - \\pi r^2$' },
    ],
    check: {
      id: 'chk_ring',
      q: 'A ring has an outer radius of 6 and an inner radius of 4. What is its area?',
      options: [
        { val: 'A', text: '$4\\pi$' },
        { val: 'B', text: '$20\\pi$' },
        { val: 'C', text: '$52\\pi$' },
        { val: 'D', text: '$16\\pi$' },
      ],
      correct: 'B',
      expEn: 'Whole minus hole: $\\pi \\times 6^2 - \\pi \\times 4^2 = 36\\pi - 16\\pi = 20\\pi$. A squares the difference, $(6 - 4)^2$. C adds the two circles. D is the hole, not what is left.',
    },
  },

  // ── 10 · Geometry: a triangle on a grid ──────────────────────────────────
  {
    layout: 'split',
    accent: GEOMETRY,
    icon: 'Triangle',
    eyebrow: 'Geometry · Triangles on a grid',
    title: 'Height From the Base Line',
    ratio: 48,
    inlineSvg: DIAGRAMS.GRID_TRIANGLE,
    content: 'The base $PQ$ lies on a grid line: $6 - 1 = 5$.\n\n$R$ is not above the base, and it does not need to be. The height is how far $R$ is from the base **line**: $5 - 1 = 4$.',
    notes: [
      { tone: 'write', text: '**Triangle:** area $= \\tfrac{1}{2} \\times \\text{base} \\times \\text{height}$, with the height measured from the line of the base.' },
    ],
    check: {
      id: 'chk_grid_triangle',
      q: 'A triangle has vertices $A(0, 4)$, $B(6, 4)$ and $C(8, 9)$. What is its area?',
      options: [
        { val: 'A', text: '$15$' },
        { val: 'B', text: '$30$' },
        { val: 'C', text: '$20$' },
        { val: 'D', text: '$27$' },
      ],
      correct: 'A',
      expEn: 'The base $AB$ is $6 - 0 = 6$. The height is from $y = 4$ up to $y = 9$, which is 5. Area $= \\dfrac{1}{2} \\times 6 \\times 5 = 15$. B forgets the half. C uses 8 for the base. D uses 9 for the height, but the base line is at $y = 4$.',
    },
  },

  // ── 11 · Counting: in order ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'GitMerge',
    eyebrow: 'Counting · In order',
    title: 'Count in Order',
    ratio: 42,
    inlineSvg: DIAGRAMS.TREE_LIST,
    content: 'Make 3-digit numbers from 1, 2 and 3, using each digit once. List them **in order**, smallest first: then nothing is missed and nothing is counted twice.',
    notes: [
      { tone: 'write', text: '**Organized list:** write the cases in order.\n**Tree:** multiply the choices at each step: $3 \\times 2 \\times 1 = 6$.' },
    ],
    check: {
      id: 'chk_tree',
      q: 'How many 2-digit numbers can you make from the digits 4, 5, 6 and 7, if a digit cannot be used twice?',
      options: [
        { val: 'A', text: '$16$' },
        { val: 'B', text: '$6$' },
        { val: 'C', text: '$12$' },
        { val: 'D', text: '$8$' },
      ],
      correct: 'C',
      expEn: '4 choices for the first digit, then 3 for the second: $4 \\times 3 = 12$. A lets a digit repeat, like 44. B counts 45 and 54 as one number. D adds $4 + 4$ where the choices multiply.',
    },
  },

  // ── 12 · Counting: the opposite ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'Minus',
    eyebrow: 'Counting · The opposite',
    title: 'Count the Opposite',
    content: 'How many 2-digit numbers have **at least one** 7?\n\nCount the ones with **no** 7 instead: $8 \\times 9 = 72$ (8 choices for the first digit, 9 for the second). There are 90 two-digit numbers, so $90 - 72 = 18$ have a 7.',
    notes: [
      { tone: 'write', text: '**At least one:** count them all, then take away the ones with none.' },
    ],
    check: {
      id: 'chk_opposite',
      q: 'A coin is flipped 3 times. There are 8 possible results. How many have **at least one** head?',
      options: [
        { val: 'A', text: '$3$' },
        { val: 'B', text: '$7$' },
        { val: 'C', text: '$4$' },
        { val: 'D', text: '$1$' },
      ],
      correct: 'B',
      expEn: 'Only one result has no head: tail, tail, tail. So $8 - 1 = 7$. A counts only the results with exactly one head. C is half of 8. D is the one result to take away.',
    },
  },

  // ── 13 · Counting: the least possible overlap ────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'Layers',
    eyebrow: 'Counting · Least possible',
    title: 'Push to the Extreme',
    ratio: 46,
    inlineSvg: DIAGRAMS.OVERLAP_MIN,
    content: 'A class has 20 students. 14 play soccer and 11 play chess. $14 + 11 = 25$ is more than 20, so some students do **both**.\n\nFor the **least possible** number, push the two groups as far apart as they go.',
    notes: [
      { tone: 'write', text: '**Least possible overlap** $=$ group 1 $+$ group 2 $-$ total.' },
    ],
    check: {
      id: 'chk_overlap',
      q: 'There are 30 students. 22 can swim and 17 can ride a bike. What is the **least possible** number who can do both?',
      options: [
        { val: 'A', text: '$17$' },
        { val: 'B', text: '$9$' },
        { val: 'C', text: '$5$' },
        { val: 'D', text: '$0$' },
      ],
      correct: 'B',
      expEn: '$22 + 17 - 30 = 9$: 39 names for 30 students, so at least 9 are counted twice. A is the **greatest** possible, when every rider also swims. C is $22 - 17$. D forgets that the groups do not fit side by side.',
    },
  },

  // ── 14 · checklist ───────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: PLAN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the test',
    title: 'Ready for the Test?',
    content: '> Copy every orange **Write** card into your notebook. Then start the Practice Test.',
    items: [
      { text: 'Guess every blank. A wrong answer costs nothing.' },
      { text: 'Two passes, then guess. Use the five choices.' },
      { text: 'Use the ones digits. Simplify before you divide.' },
      { text: 'A ratio is equal parts. Call one part $x$.' },
      { text: 'Whole minus hole. Height from the base line.' },
      { text: 'Count in order, count the opposite, push to the extreme.' },
    ],
  },
];
