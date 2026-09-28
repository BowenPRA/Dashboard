// src/data/AMC8/PT_01/notes.js
// PT_01 — Practice Test 1. The "Test-Day Toolkit": the deck studied BEFORE the
// student sits the timed 25-question practice test.
//
// Written to the EXT_MATH exemplar (EM_06): short sentences, one idea each, and
// a slide body never repeats its Write panel. A diagram carries the picture;
// the Write panel carries the words to copy.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. THE TEST IS NEVER WORKED HERE. Every example, check and reveal uses fresh
//    numbers and a fresh context. The deck teaches the idea a question leans
//    on; the question itself stays the student's own to meet under the clock.
//
// 2. STRATEGY FIRST. A wrong answer costs nothing, every question is one
//    point, and 40 minutes is about a minute and a half each. Slides 2–5 are
//    how to spend the time; the rest is what to spend it on.
//
// 3. ONE TOOL PER SLIDE. Fourteen small tools, each with one picture or one
//    worked line. Where a tool is not scored, a Reveal box asks it instead.
//
// SPINE:
//   1–2    hero; predict — no idea on question 24
//   3–5    the shape of the test; the two-pass plan; use the choices
//   6–7    number: ones digit; fractions to decimals
//   8–9    area: by subtraction; rings and sectors
//   10–11  ratio: parts; when a ratio changes
//   12–14  counting: in order; the opposite; the least possible overlap
//   15–16  grids: a triangle; a line across the cells
//   17–19  repeating blocks; the 45°-45°-90° triangle; thin strips
//   20     the checklist
//
// House notes:
//  · ENGLISH ONLY — AMC8 declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). Everything else is inline `$…$` only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · American spelling, because the contest is American.
import { DIAGRAMS } from './diagrams.js';

const PINK = '#be185d';
const TEAL = '#0f766e';
const ORANGE = '#c2410c';
const VIOLET = '#7c3aed';
const PURPLE = '#5c2483';
const RED = '#c8102e';
const BLUE = '#1a5fa8';

export const notes = [
  // ── 1 · hero ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PINK,
    icon: 'Target',
    brand: 'AMC 8 Prep',
    eyebrow: 'Practice Test 1 · Before you start',
    title: 'Test-Day Toolkit',
    objective: 'I can plan my 40 minutes, use the answer choices, and pick the right tool for a contest question.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      text: 'A plan for the clock, then **14 small tools**. **13 things are scored** — the first one is on the next slide.',
    },
  },

  // ── 2 · predict: no idea on question 24 ──────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    title: 'No Idea on Question 24',
    content: 'On the AMC 8, a correct answer is **1 point**. A blank is **0**. A wrong answer is **0**.\n\nThere is one minute left. Question 24 is still blank, and you have no idea how to do it.',
    activity: {
      id: 'act_predict_guess',
      type: 'predict',
      prompt: 'What is the best move?',
      options: [
        { val: 'blank', name: 'Leave it blank — a wrong answer is worse' },
        { val: 'guess', name: 'Bubble a guess' },
        { val: 'change', name: 'Go back and change an earlier answer' },
        { val: 'stop', name: 'Put the pencil down and wait' },
      ],
      correct: 'guess',
      explain: 'A wrong answer costs **nothing**, and a blank earns **nothing**. A guess is right about 1 time in 5, so it can only help. Never leave a blank on the AMC 8.',
    },
  },

  // ── 3 · the shape of the test ────────────────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'ListChecks',
    columns: 3,
    eyebrow: 'Know the test',
    title: 'The Shape of the Test',
    content: 'The questions get harder as you go: about **1–10** quick, **11–20** medium, **21–25** hard.\n\nBut a hard question is worth the same as an easy one.',
    notes: [
      { tone: 'info', badge: 'The questions', icon: 'ListChecks', text: '**25** questions.\nFive choices each: A, B, C, D, E.\n**No calculator.**' },
      { tone: 'info', badge: 'The clock', icon: 'Timer', text: '**40** minutes.\nThat is about a minute and a half for each question.' },
      { tone: 'info', badge: 'The points', icon: 'Star', text: 'Correct: **1** point.\nBlank: 0.\nWrong: 0. There is no penalty.' },
    ],
  },

  // ── 4 · the two-pass plan ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'The plan for the clock',
    title: 'Two Passes, Then Guess',
    label: 'Order it',
    labelIcon: 'Sparkles',
    text: 'Do not get stuck. Easy points first.',
    sub: 'One question that eats 5 minutes takes the time of three others.',
    notes: [
      { tone: 'write', text: '**Pass 1:** answer what you can do fast. Circle the rest and move on.\n**Pass 2:** go back to the circled questions.\n**Last 2 minutes:** bubble a guess for every blank.' },
    ],
    activity: {
      id: 'act_order_passes',
      type: 'order',
      prompt: 'Put the plan for the 40 minutes in order.',
      steps: [
        { id: 'fast', name: 'Answer every question you can do fast' },
        { id: 'circle', name: 'Go back to the questions you circled' },
        { id: 'guess', name: 'Bubble a guess for every blank' },
      ],
      explain: 'The fast questions come first because every question is 1 point, so the quick points are the safe points. The slow ones get the time that is left. The guesses come last: a guess costs nothing, but a blank earns nothing.',
    },
  },

  // ── 5 · use the five choices ─────────────────────────────────────────────
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Crosshair',
    eyebrow: 'The answer is on the page',
    title: 'Use the Five Choices',
    content: 'One of the five choices is correct. You do not always need the full working to find it.',
    steps: [
      { text: '**Estimate and eliminate.** Round the numbers. Cross out every choice that is far too big or far too small.' },
      { text: '**Test the choices.** Put a choice back into the question. Start with the middle one, then you know to go bigger or smaller.' },
      { text: '**Do not trust the picture.** Figures are *not necessarily drawn to scale*. Use the numbers, not how it looks.' },
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
      expEn: '$400 \\times 50 = 20{,}000$, so the answer is near 20,000. A is ten times too small and C is ten times too big. D is close, but $8 \\times 2 = 16$, so the answer must end in 6, not 3.',
    },
  },

  // ── 6 · ones digit ───────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'Hash',
    eyebrow: 'Tool 1 · Ones digit',
    title: 'Only the Last Digits Matter',
    content: '$$4{,}317 \\times 29 \\;\\rightarrow\\; 7 \\times 9 = 63 \\;\\rightarrow\\; \\text{ones digit } 3$$\n\nIn a subtraction, **borrow** when the top digit is too small.\n\n$$5{,}002 - 347 \\;\\rightarrow\\; 12 - 7 = 5 \\;\\rightarrow\\; \\text{ones digit } 5$$',
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
      expEn: '$7 \\times 3 = 21$, so the product ends in 1. Then $1 - 8$ needs a borrow: $11 - 8 = 3$. B takes $8 - 1$, the small digit from the big one. A adds the 8. C stops before the subtraction.',
    },
  },

  // ── 7 · fractions to decimals ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'Divide',
    eyebrow: 'Tool 2 · Fractions to decimals',
    title: 'Simplify First',
    content: 'Make the fraction simple **before** you divide.\n\n$$\\dfrac{45}{18} = \\dfrac{5}{2} = 2.5 \\qquad\\qquad \\dfrac{21}{700} = \\dfrac{3}{100} = 0.03$$',
    notes: [
      { tone: 'write', text: '**Tenths:** $\\dfrac{1}{10} = 0.1$. **Hundredths:** $\\dfrac{1}{100} = 0.01$.\nKnow these: $\\dfrac{1}{2} = 0.5$, $\\dfrac{1}{4} = 0.25$, $\\dfrac{3}{4} = 0.75$, $\\dfrac{1}{5} = 0.2$, $\\dfrac{1}{8} = 0.125$.' },
    ],
    reveal: {
      label: 'Check your answer',
      prompt: 'Try it: what is $\\dfrac{18}{24} + \\dfrac{14}{200}$ as a decimal?',
      answer: '$$\\dfrac{3}{4} + \\dfrac{7}{100} = 0.75 + 0.07 = 0.82$$',
    },
  },

  // ── 8 · area by subtraction ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Square',
    eyebrow: 'Tool 3 · Area by subtraction',
    title: 'Whole Minus Hole',
    ratio: 44,
    inlineSvg: DIAGRAMS.AREA_SUBTRACT,
    content: 'A frame is hard to cut into pieces.\n\nSo do not cut it. Take the **whole** rectangle, then take away the **hole**.',
    notes: [
      { tone: 'write', text: '**Area by subtraction:** the area of the big shape minus the area of the missing piece.' },
    ],
    reveal: {
      label: 'Check your answer',
      prompt: 'A square of side 8 has a 3 by 5 rectangle cut from one corner. What area is left?',
      answer: '$$8 \\times 8 - 3 \\times 5 = 64 - 15 = 49$$',
    },
  },

  // ── 9 · rings and sectors ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'CircleDot',
    eyebrow: 'Tool 4 · Circles',
    title: 'Rings and Sectors',
    ratio: 46,
    inlineSvg: DIAGRAMS.RING_SECTOR,
    content: 'A **ring** is a big circle with a small circle taken away.\n\nA **sector** is a slice of a circle. Its angle tells you what fraction it is.',
    notes: [
      { tone: 'write', text: '**Ring:** area $= \\pi R^2 - \\pi r^2$\n**Sector:** area $= \\dfrac{\\text{angle}}{360} \\times \\pi r^2$' },
    ],
    check: {
      id: 'chk_sector',
      q: 'A circle has radius 6. A sector of it has an angle of 120° at the center. What is the area of the sector?',
      options: [
        { val: 'A', text: '$4\\pi$' },
        { val: 'B', text: '$36\\pi$' },
        { val: 'C', text: '$12\\pi$' },
        { val: 'D', text: '$24\\pi$' },
      ],
      correct: 'C',
      expEn: 'The whole circle is $\\pi \\times 6^2 = 36\\pi$, and $\\dfrac{120}{360} = \\dfrac{1}{3}$, so the sector is $12\\pi$. A uses the distance around, $2\\pi r = 12\\pi$, in place of the area. B is the whole circle. D is the other 240°.',
    },
  },

  // ── 10 · ratios are parts ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Tool 5 · Ratio',
    title: 'Ratios Are Parts',
    ratio: 44,
    inlineSvg: DIAGRAMS.RATIO_PARTS,
    content: 'A ratio of $3 : 5$ means 3 equal parts and 5 equal parts.\n\nYou cannot have half a fruit, so each part is a whole number.',
    notes: [
      { tone: 'write', text: '**Ratio $a : b$:** the total is $a + b$ equal parts. So the total is a **multiple** of $a + b$.' },
    ],
    activity: {
      id: 'act_sort_total',
      type: 'sort',
      prompt: 'apples : oranges $= 3 : 5$. Could this be the total number of fruits?',
      bins: [
        { id: 'yes', name: 'Yes — possible' },
        { id: 'no', name: 'No — impossible' },
      ],
      cards: [
        { id: 't16', name: '$16$', bin: 'yes' },
        { id: 't30', name: '$30$', bin: 'no' },
        { id: 't40', name: '$40$', bin: 'yes' },
        { id: 't35', name: '$35$', bin: 'no' },
        { id: 't64', name: '$64$', bin: 'yes' },
        { id: 't45', name: '$45$', bin: 'no' },
        { id: 't24', name: '$24$', bin: 'yes' },
      ],
      explain: 'The total is $3 + 5 = 8$ equal parts, so it must be a multiple of 8: 16, 24, 40 and 64 are. 30, 35 and 45 are multiples of 3 or of 5, but the total does not care about 3 or 5 alone — only about 8.',
    },
  },

  // ── 11 · when a ratio changes ────────────────────────────────────────────
  {
    layout: 'steps',
    accent: ORANGE,
    icon: 'Variable',
    eyebrow: 'Tool 6 · Ratio with a letter',
    title: 'When a Ratio Changes',
    content: 'Lan and Minh have stickers in the ratio $5 : 3$. Lan gives Minh 4 stickers. Now they have the same number.',
    steps: [
      { text: '**One letter:** one part is $x$. Lan has $5x$ and Minh has $3x$.' },
      { text: '**Make the change:** Lan has $5x - 4$. Minh has $3x + 4$.' },
      { text: '**Build the equation:** $5x - 4 = 3x + 4$, so $2x = 8$ and $x = 4$.' },
      { text: '**Answer the question:** Lan had $5 \\times 4 = 20$ and Minh had $3 \\times 4 = 12$.' },
    ],
    check: {
      id: 'chk_ratio_change',
      q: 'In a club, boys : girls $= 3 : 2$. Then 5 more girls join, and the ratio is $1 : 1$. How many boys are in the club?',
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

  // ── 12 · count in order ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'GitMerge',
    eyebrow: 'Tool 7 · Counting',
    title: 'Count in Order',
    ratio: 42,
    inlineSvg: DIAGRAMS.TREE_LIST,
    content: 'Make 3-digit numbers from the digits 1, 2 and 3. Use each digit once.\n\nList them **in order**, smallest first. Then nothing is missed, and nothing is counted twice.',
    notes: [
      { tone: 'write', text: '**Organized list:** write the possibilities in order.\n**Tree diagram:** one branch for each choice. Count the ends.' },
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
      expEn: 'There are 4 choices for the first digit, then 3 are left for the second: $4 \\times 3 = 12$. A lets a digit repeat, like 44. B counts 45 and 54 as one number, but they are different. D adds $4 + 4$ where the branches multiply.',
    },
  },

  // ── 13 · count the opposite ──────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Minus',
    eyebrow: 'Tool 8 · Counting',
    title: 'Count the Opposite',
    content: 'How many 2-digit numbers have **at least one** digit 7?\n\nIt is easier to count the numbers with **no** 7: 8 choices for the first digit, 9 for the second.\n\nAll 2-digit numbers: $90$. With no 7: $8 \\times 9 = 72$.\n\n$$90 - 72 = 18$$',
    notes: [
      { tone: 'write', text: '**Wanted** $=$ total $-$ not wanted.\n**At least one** $=$ all $-$ none.' },
    ],
    reveal: {
      label: 'Check your answer',
      prompt: 'A coin is flipped 3 times. There are 8 possible results. How many have at least one head?',
      answer: '$$8 - 1 = 7$$\n\nOnly one result has no head: tail, tail, tail.',
    },
  },

  // ── 14 · the least possible overlap ──────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Layers',
    eyebrow: 'Tool 9 · Least possible',
    title: 'Push to the Extreme',
    ratio: 44,
    inlineSvg: DIAGRAMS.OVERLAP_MIN,
    content: 'A class has 20 students. 14 play soccer and 11 play chess.\n\nSome do **both**, because $14 + 11 = 25$ is more than 20. For the **least possible** number, push the two groups as far apart as they go.',
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
      expEn: '$22 + 17 - 30 = 9$. The two groups are 39 names for 30 students, so at least 9 are counted twice. A is the **greatest** possible, when every rider also swims. C is $22 - 17$, only the difference. D forgets that the groups do not fit side by side.',
    },
  },

  // ── 15 · a triangle on a grid ────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Triangle',
    eyebrow: 'Tool 10 · Coordinates',
    title: 'Triangles on a Grid',
    ratio: 44,
    inlineSvg: DIAGRAMS.GRID_TRIANGLE,
    content: 'The base $PQ$ lies on a grid line. Its length is $6 - 1 = 5$.\n\nThe height is how far $R$ is from the **base line**: $5 - 1 = 4$. $R$ does not need to be over the base.',
    notes: [
      { tone: 'write', text: '**Area of a triangle** $= \\dfrac{1}{2} \\times \\text{base} \\times \\text{height}$\nKnow the area? Then height $= 2 \\times \\text{area} \\div \\text{base}$.' },
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
      expEn: 'The base $AB$ is $6 - 0 = 6$. The height is from $y = 4$ up to $y = 9$, which is 5. Area $= \\dfrac{1}{2} \\times 6 \\times 5 = 15$. B forgets the half. C uses 8 for the base. D uses 9 for the height, but the base line is at $y = 4$, not 0.',
    },
  },

  // ── 16 · a line across a grid ────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Grid3x3',
    eyebrow: 'Tool 11 · Grid cells',
    title: 'A Line Across a Grid',
    ratio: 46,
    inlineSvg: DIAGRAMS.GRID_LINE,
    content: 'A **lattice point** is a point where two grid lines cross.\n\nEach time the segment crosses a grid line, it enters a new cell. At a lattice point it crosses two lines at once, so one cell is saved.',
    notes: [
      { tone: 'write', text: 'A segment goes $a$ across and $b$ up.\n**Cells it passes through** $= a + b - \\gcd(a, b)$\nWhen the greatest common divisor is 1, cells $= a + b - 1$.' },
    ],
    check: {
      id: 'chk_grid_line',
      q: 'A segment joins $(3, 1)$ to $(11, 7)$ on a grid of unit squares. How many squares does it pass through?',
      options: [
        { val: 'A', text: '$48$' },
        { val: 'B', text: '$14$' },
        { val: 'C', text: '$13$' },
        { val: 'D', text: '$12$' },
      ],
      correct: 'D',
      expEn: 'It goes $11 - 3 = 8$ across and $7 - 1 = 6$ up, and $\\gcd(8, 6) = 2$. So $8 + 6 - 2 = 12$. C takes away 1, but this segment passes through the lattice point $(7, 4)$ on the way. B is only $a + b$. A counts every square in the 8 by 6 rectangle.',
    },
  },

  // ── 17 · repeating blocks ────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'Repeat',
    eyebrow: 'Tool 12 · 101 and 1001',
    title: 'Repeating Blocks',
    content: 'A number that repeats a block of digits has a hidden factor.\n\n$$4{,}747 = 47 \\times 100 + 47 = 47 \\times 101$$\n\n$$358{,}358 = 358 \\times 1000 + 358 = 358 \\times 1001$$',
    notes: [
      { tone: 'write', text: '$ABAB = 101 \\times AB$\n$ABCABC = 1001 \\times ABC$' },
    ],
    reveal: {
      label: 'Check your answer',
      prompt: 'Try it: what is $246{,}246 \\div 123{,}123$?',
      answer: '$$\\dfrac{246 \\times 1001}{123 \\times 1001} = \\dfrac{246}{123} = 2$$',
    },
  },

  // ── 18 · the 45-45-90 triangle ───────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'TriangleRight',
    eyebrow: 'Tool 13 · The 45°-45°-90° triangle',
    title: 'Half a Square',
    ratio: 44,
    inlineSvg: DIAGRAMS.HALF_SQUARE,
    content: 'Cut a square along its diagonal. Each half is a **45°-45°-90° triangle**.\n\nStand it on its long side. The height cuts it into two smaller copies, so the height is **half** of the long side.',
    notes: [
      { tone: 'write', text: 'Height to the long side $= h$. Then the long side $= 2h$.\nArea $= \\dfrac{1}{2} \\times 2h \\times h = h^2$' },
    ],
    check: {
      id: 'chk_half_square',
      q: 'A 45°-45°-90° triangle stands on its long side. Its height is 7. What is its area?',
      options: [
        { val: 'A', text: '$24.5$' },
        { val: 'B', text: '$49$' },
        { val: 'C', text: '$98$' },
        { val: 'D', text: '$14$' },
      ],
      correct: 'B',
      expEn: 'The long side is $2 \\times 7 = 14$, so the area is $\\dfrac{1}{2} \\times 14 \\times 7 = 49 = 7^2$. A uses 7 for the base as well as the height. C forgets the half. D is the length of the long side, not an area.',
    },
  },

  // ── 19 · thin strips ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'Tool 14 · Thin strips',
    title: 'Unroll It',
    ratio: 44,
    inlineSvg: DIAGRAMS.RIBBON_ROLL,
    content: 'From the side, a long thin strip is a very long rectangle.\n\nRoll it up and the side view becomes a ring. It is the same ribbon, so the area is the **same**.',
    notes: [
      { tone: 'write', text: '**Thin strip:** area $=$ length $\\times$ thickness.\nSo length $=$ area $\\div$ thickness.' },
    ],
    reveal: {
      label: 'Check your answer',
      prompt: 'From the side, a rolled ribbon is a ring of area $6\\pi$ square centimeters. The ribbon is 0.05 cm thick. How long is it?',
      answer: '$$6\\pi \\div 0.05 = 600\\pi \\div 5 = 120\\pi \\text{ cm}$$',
    },
  },

  // ── 20 · checklist ───────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the test',
    title: 'Can You Do These?',
    content: '> Every orange **Write** panel belongs in your notebook. There are 14.',
    items: [
      { text: 'Guess every blank. A wrong answer costs nothing.' },
      { text: 'Two passes: fast questions first, circled questions second.' },
      { text: 'Estimate, eliminate, and test the choices.' },
      { text: 'Find a ones digit from the ones digits.' },
      { text: 'Find an area by subtraction: frames, rings and sectors.' },
      { text: 'Turn a ratio into equal parts, or into $x$.' },
      { text: 'Count in order, or count the opposite.' },
      { text: 'Use $a + b - \\gcd(a, b)$, $1001$ and $h^2$.' },
    ],
    check: {
      id: 'chk_final',
      q: 'Use your tools, not long multiplication. Which one is $7 \\times 143{,}143$?',
      options: [
        { val: 'A', text: '$1{,}001{,}001$' },
        { val: 'B', text: '$102{,}001$' },
        { val: 'C', text: '$1{,}002{,}002$' },
        { val: 'D', text: '$1{,}002{,}001$' },
      ],
      correct: 'D',
      expEn: '$143{,}143 = 143 \\times 1001$ and $7 \\times 143 = 1001$, so the answer is $1001 \\times 1001 = 1{,}001{,}000 + 1001 = 1{,}002{,}001$. B is far too small: $7 \\times 140{,}000$ is about a million. C ends in 2, but $7 \\times 3 = 21$ ends in 1. A adds only 1 at the end, where a whole $1001$ is needed.',
    },
  },
];
