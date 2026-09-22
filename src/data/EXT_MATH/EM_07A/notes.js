// src/data/EXT_MATH/EM_07A/notes.js
// EM_07A — Bounds, Inequalities & Simultaneous Equations. IGCSE Mathematics
// (Extended), Wolsey Hall Oxford Assignment 07, Part A (the number and
// algebra questions; Part B, EM_07B, carries the bearings, triangles and
// scatter graphs).
//
// Written to the EM_06 exemplar (docs/ext-math-course.md): short sentences,
// one idea per slide, a diagram that carries the picture and a Write panel
// that carries the words to copy. Each part opens on a question to decide
// BEFORE the method is shown.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. EDGES DECIDE MARKS. A bound, an inequality sign, a solid or dashed line,
//    an open or filled circle: each is the question "is the edge included?".
//    The deck asks it the same way every time.
//
// 2. ONE NEW RULE. An inequality is solved like an equation, except that
//    multiplying or dividing by a negative turns the sign round — predicted
//    on slide 6 before it is stated on slide 7.
//
// 3. CHOOSE THE METHOD, AND SAY WHY. Questions 19 to 22 ask for the most
//    efficient method and the reason. The sort on slide 23 is that choice,
//    made six times.
//
// SPINE:
//   1        hero
//   2–5      Part 1 · bounds and time: predict, the bounds, the edges, a time zone
//   6–15     Part 2 · inequalities: the flip, solving, circles, shading a
//            double inequality, splitting one, integers, regions, the region
//            tester, a test point
//   16–17    Part 3 · lines and equations: the line through two points, an
//            area that makes an equation
//   18–25    Part 4 · simultaneous equations: why two, the picture, the
//            machine, elimination, substitution, choosing, tidying, a chain
//   26       the checklist
//
// House notes:
//  · ENGLISH ONLY — EXT_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Every number is original: the assignment's own questions are the
//    homework and are not worked here. The tasks use a second set again.
import { DIAGRAMS } from './diagrams.js';
import { RegionTester, EliminationMachine } from './widgets.jsx';

const PINK = '#be185d';
const TEAL = '#0f766e';
const ORANGE = '#c2410c';
const VIOLET = '#7c3aed';
const PURPLE = '#5c2483';
const EMER = '#047857';

export const notes = [

  // ── 1 · hero ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PINK,
    icon: 'Combine',
    brand: 'IGCSE Mathematics · Extended',
    eyebrow: 'Assignment 07 · Part A',
    title: 'Bounds, Inequalities & Simultaneous Equations',
    objective: 'I can write the bounds of a rounded value, solve inequalities and describe a region, and solve simultaneous equations by the quickest method.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      text: 'Four parts, one idea at a time. You will **tap**, **sort** and **predict** your way through — **20 things are scored**. The first one is on the next slide.',
    },
  },

  // ════════════════════════════ PART 1 · BOUNDS AND TIME ════════════════════

  // ── 2 · predict: the plank ────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Part 1 · Bounds and time — decide first',
    title: 'How Long Is the Plank, Really?',
    content: 'A plank is **12.6 m** long, correct to 1 decimal place.\n\nSo its real length is **not exactly** 12.6 m. It is some length that **rounds to** 12.6.',
    activity: {
      id: 'act_predict_bound',
      type: 'predict',
      prompt: 'Which of these could NOT be the real length?',
      options: [
        { val: 'a', name: '12.56 m' },
        { val: 'b', name: '12.61 m' },
        { val: 'c', name: '12.649 m' },
        { val: 'd', name: '12.65 m' },
      ],
      correct: 'd',
      explain: '12.65 rounds **up** to 12.7, so it cannot be the length. Everything from 12.55 up to — but not including — 12.65 rounds to 12.6. Even 12.649 does.',
    },
  },

  // ── 3 · lower and upper bounds ────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'Key words',
    title: 'Lower and Upper Bounds',
    ratio: 52,
    inlineSvg: DIAGRAMS.BOUNDS_LINE,
    content: 'Go **half a unit** down, and half a unit up.\n\nTo 1 decimal place the unit is 0.1, so half a unit is 0.05.',
    notes: [
      {
        tone: 'write',
        text: '**Lower bound:** the smallest value that rounds to the number. It is included.\n**Upper bound:** the value where rounding goes up. It is **not** included.\n$12.55 \\le l < 12.65$',
      },
    ],
    check: {
      id: 'chk_bound_5g',
      q: 'A mass is 235 g, correct to the nearest 5 g. What is its upper bound?',
      options: [
        { val: 'A', text: '240 g' },
        { val: 'B', text: '237.5 g' },
        { val: 'C', text: '235.5 g' },
        { val: 'D', text: '236 g' },
      ],
      correct: 'B',
      expEn: 'The unit is 5 g, so half a unit is 2.5 g: $235 + 2.5 = 237.5$ g. 240 g is the next value to the nearest 5 g, not the bound; 235.5 g uses half of 1 g instead of half of 5 g.',
    },
  },

  // ── 4 · sort: which lengths round to 12.6 ─────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Test the edges',
    title: 'Which Lengths Round to 12.6?',
    label: 'Sort it',
    labelIcon: 'Sparkles',
    text: 'The lower bound **is** included. The upper bound **is not**.',
    sub: 'That is why the statement mixes $\\le$ and $<$. Round each length to 1 decimal place before you drop it in.',
    activity: {
      id: 'act_sort_round',
      type: 'sort',
      prompt: 'Does each length round to 12.6 m, to 1 decimal place?',
      bins: [
        { id: 'yes', name: 'Rounds to 12.6' },
        { id: 'no', name: 'Does not' },
      ],
      cards: [
        { id: 'r1', name: '12.55 m', bin: 'yes' },
        { id: 'r2', name: '12.649 m', bin: 'yes' },
        { id: 'r3', name: '12.6 m', bin: 'yes' },
        { id: 'r4', name: '12.57 m', bin: 'yes' },
        { id: 'r5', name: '12.65 m', bin: 'no' },
        { id: 'r6', name: '12.549 m', bin: 'no' },
        { id: 'r7', name: '12.7 m', bin: 'no' },
        { id: 'r8', name: '12.5 m', bin: 'no' },
      ],
      explain: '12.55 rounds up to 12.6, so it is in — it is the lower bound. 12.65 rounds up to 12.7, so it is out: the upper bound is never reached. 12.549 rounds down to 12.5.',
    },
  },

  // ── 5 · a time zone ───────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Clock',
    eyebrow: 'Worked example · local times',
    title: 'One Journey, Two Clocks',
    inlineSvg: DIAGRAMS.TIME_ZONES,
    content: 'A train leaves Paris at 09 47 and arrives in London at 11 15. Both are **local** times, and London is **1 hour behind** Paris. How long is the journey?',
    steps: [
      { text: '**Use one clock.** When London reads 11 15, Paris reads 12 15 — so in Paris time the train arrives at 12 15.' },
      { text: '**Count on to the next hour:** 09 47 to 10 00 is 13 minutes.' },
      { text: '**Whole hours:** 10 00 to 12 00 is 2 hours.' },
      { text: '**The rest:** 12 00 to 12 15 is 15 minutes. The journey is **2 h 28 min**.' },
    ],
    check: {
      id: 'chk_time_zone',
      q: 'A train leaves London at 13 20 and arrives in Rome at 17 05, both local times. Rome is 1 hour ahead of London. How long is the journey?',
      options: [
        { val: 'A', text: '3 h 45 min' },
        { val: 'B', text: '2 h 45 min' },
        { val: 'C', text: '4 h 45 min' },
        { val: 'D', text: '2 h 85 min' },
      ],
      correct: 'B',
      expEn: 'In London time it arrives at 16 05. Count on: 13 20 to 14 00 is 40 min, to 16 00 is 2 h more, then 5 min — 2 h 45 min. A forgets the time difference; C adds the hour the wrong way; D subtracts the times as if they were decimals.',
    },
  },

  // ════════════════════════════ PART 2 · INEQUALITIES ═══════════════════════

  // ── 6 · predict: the flip ─────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'FlipHorizontal2',
    eyebrow: 'Part 2 · Inequalities — decide first',
    title: 'Does It Stay True?',
    label: 'Predict',
    labelIcon: 'Sparkles',
    text: '$-3 < 2$ is true.',
    sub: 'Multiply both sides by $-1$. Work out both sides before you choose.',
    activity: {
      id: 'act_predict_flip',
      type: 'predict',
      prompt: 'Multiply both sides of $-3 < 2$ by $-1$. Is it still true?',
      options: [
        { val: 'yes', name: 'Yes — do the same to both sides and it stays true' },
        { val: 'no', name: 'No — it becomes $3 < -2$, which is false' },
        { val: 'depends', name: 'It depends on the numbers' },
      ],
      correct: 'no',
      explain: '$-3 \\times -1 = 3$ and $2 \\times -1 = -2$, and $3 < -2$ is false. Multiplying or dividing by a **negative** turns the order round, so the sign must turn too: $3 > -2$.',
    },
  },

  // ── 7 · the rule ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'FlipHorizontal2',
    eyebrow: 'The one new rule',
    title: 'Turn the Sign Round',
    ratio: 50,
    inlineSvg: DIAGRAMS.FLIP,
    content: 'Solve an inequality like an equation.\n\nOnly one move is different.',
    notes: [
      { tone: 'write', text: '**Inequality:** a statement with $<$, $>$, $\\le$ or $\\ge$.\nMultiply or divide both sides by a **negative** number, and the sign turns round.' },
    ],
    check: {
      id: 'chk_flip',
      q: 'Solve $4 - 3x > 13$.',
      options: [
        { val: 'A', text: '$x < -3$' },
        { val: 'B', text: '$x > -3$' },
        { val: 'C', text: '$x < 3$' },
        { val: 'D', text: '$x > 3$' },
      ],
      correct: 'A',
      expEn: '$-3x > 9$, and dividing by $-3$ turns the sign: $x < -3$. Or keep the letter positive — $4 - 13 > 3x$, so $-9 > 3x$ and $x < -3$ — the same answer with no flip. B divided by $-3$ without turning the sign.',
    },
  },

  // ── 8 · worked example ────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: VIOLET,
    icon: 'PenLine',
    eyebrow: 'Worked example',
    title: 'Letters to the Side With More',
    inlineSvg: DIAGRAMS.SOLVE_LINE,
    content: 'Solve $7x + 3 > 2x - 12$, and show it on a number line.',
    steps: [
      { text: '**Letters:** there are more on the left ($7x$), so take $2x$ from both sides: $5x + 3 > -12$.' },
      { text: '**Numbers:** take 3 from both sides: $5x > -15$.' },
      { text: '**Divide** by 5, a positive number, so the sign stays: $x > -3$.' },
      { text: '**Draw it:** an open circle at $-3$ — it is not included — and an arrow to the right.' },
    ],
  },

  // ── 9 · circles ───────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'CircleDot',
    eyebrow: 'Number lines',
    title: 'Open or Filled?',
    ratio: 50,
    inlineSvg: DIAGRAMS.CIRCLES,
    content: 'The circle answers one question.\n\nIs the end number part of the answer?',
    notes: [
      { tone: 'write', text: 'Open circle: the number is **not** included — $<$ or $>$.\nFilled circle: the number **is** included — $\\le$ or $\\ge$.' },
    ],
  },

  // ── 10 · shade it ─────────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: VIOLET,
    icon: 'Ruler',
    eyebrow: 'Draw it',
    title: 'Two Ends, Two Circles',
    label: 'Shade it',
    labelIcon: 'MousePointerClick',
    text: 'A double inequality has **two** ends. Decide each circle on its own.',
    sub: 'Tap a number to place a circle, tap it again to fill it in. Then tap above the line to shade the numbers that fit.',
    activity: {
      id: 'act_line_double',
      type: 'numberline',
      prompt: 'Show $-1 < x \\le 3$ on the number line.',
      display: '-1 < x \\le 3',
      solution: '-1 < x <= 3',
      min: -4,
      max: 6,
      explain: 'An open circle at $-1$ (not included), a filled circle at $3$ (included), and the line shaded between them.',
    },
  },

  // ── 11 · a double inequality ──────────────────────────────────────────────
  {
    layout: 'steps',
    accent: VIOLET,
    icon: 'Split',
    eyebrow: 'Worked example · letters in all three parts',
    title: 'Split It in Two',
    content: 'Find the integer values of $n$ for which $5 - 2n < 3n \\le 12 + n$.',
    steps: [
      { text: '**Split:** the letter is in all three parts, so write two inequalities: $5 - 2n < 3n$ and $3n \\le 12 + n$.' },
      { text: '**Left:** $5 < 5n$, so $n > 1$.' },
      { text: '**Right:** $2n \\le 12$, so $n \\le 6$.' },
      { text: '**Together:** $1 < n \\le 6$. The integers are $2, 3, 4, 5, 6$ — not 1, because $<$ leaves it out.' },
    ],
    activity: {
      id: 'act_order_double',
      type: 'order',
      prompt: 'Put the method for a double inequality with the letter in every part in order.',
      steps: [
        { id: 'split', name: 'Split it into two inequalities' },
        { id: 'solve', name: 'Solve each half on its own' },
        { id: 'join', name: 'Put the halves together, smaller number first' },
        { id: 'list', name: 'List the whole numbers that fit' },
      ],
      explain: 'Nothing can be solved until it is split. Each half gives one end; together they give the range; and only then can you check each end and list the integers.',
    },
  },

  // ── 12 · integers ─────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'Hash',
    eyebrow: 'Check each end',
    title: 'Which Integers Fit?',
    content: 'An **integer** is a whole number — positive, negative or zero.\n\nList them from the smallest to the largest, and check each end on its own:\n\n$$\\le \\text{ includes the end} \\qquad < \\text{ leaves it out}$$',
    check: {
      id: 'chk_integers',
      q: 'Which integers satisfy $-2 \\le x < 3$?',
      options: [
        { val: 'A', text: '$-1, 0, 1, 2$' },
        { val: 'B', text: '$-2, -1, 0, 1, 2, 3$' },
        { val: 'C', text: '$-2, -1, 0, 1, 2$' },
        { val: 'D', text: '$-1, 0, 1, 2, 3$' },
      ],
      correct: 'C',
      expEn: '$\\le$ includes $-2$, and $<$ leaves $3$ out: $-2, -1, 0, 1, 2$. A drops the end that is included; B keeps the end that is not.',
    },
  },

  // ── 13 · regions ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PINK,
    icon: 'LandPlot',
    eyebrow: 'Key word',
    title: 'A Region on a Graph',
    ratio: 50,
    inlineSvg: DIAGRAMS.REGION_KEY,
    content: 'Each line cuts the grid in two.\n\nThe region $R$ is the part on the right side of **every** line. The rest is shaded.',
    notes: [
      { tone: 'write', text: '**Region:** the points that satisfy every inequality.\nSolid line: points on it count — $\\le$ or $\\ge$.\nDashed line: they do not — $<$ or $>$.' },
    ],
    check: {
      id: 'chk_region_dashed',
      q: 'Region $R$ lies to the right of the DASHED line $x = 1$. Which inequality says so?',
      options: [
        { val: 'A', text: '$x \\ge 1$' },
        { val: 'B', text: '$x < 1$' },
        { val: 'C', text: '$y > 1$' },
        { val: 'D', text: '$x > 1$' },
      ],
      correct: 'D',
      expEn: 'To the right means bigger $x$, and a dashed line means the line itself is not included: $x > 1$. A would need a solid line; C describes a flat line, not an upright one.',
    },
  },

  // ── 14 · the region tester (widget) ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: PINK,
    icon: 'Crosshair',
    eyebrow: 'Tap a point — predict before you look',
    title: 'Test a Point',
    widget: RegionTester,
    caption: 'Put the point\'s $x$ and $y$ into each inequality. In $R$ means **every** one holds. Try a point on the dashed line, then one on a solid line.',
  },

  // ── 15 · hotspot: which point is in R ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PINK,
    icon: 'Target',
    eyebrow: 'Tap it',
    title: 'Inside or Out?',
    label: 'Tap it',
    labelIcon: 'MousePointerClick',
    text: 'The region is left **white**. Everything shaded fails at least one inequality.',
    sub: 'Watch the dashed line: a point sitting on it is not in $R$.',
    activity: {
      id: 'act_hotspot_region',
      type: 'hotspot',
      prompt: 'Tap the one point that is in the region $R$.',
      svg: DIAGRAMS.REGION_PICK,
      viewBox: '0 0 600 440',
      targets: [
        { id: 'in', x: 196, y: 292, r: 28, name: 'the point (2, 2)' },
        { id: 'dash', x: 154, y: 208, r: 28, name: 'the point (1, 4) — on the dashed line, so not included' },
        { id: 'over', x: 322, y: 250, r: 28, name: 'the point (5, 3) — above x + y = 7' },
        { id: 'under', x: 238, y: 376, r: 28, name: 'the point (3, 0) — below y = 1' },
      ],
      correct: 'in',
      explain: '$(2, 2)$: $2 > 1$, $2 \\ge 1$ and $2 + 2 = 4 \\le 7$ — all three hold. $(1, 4)$ is on the dashed line $x = 1$, and $1 > 1$ is false.',
    },
  },

  // ════════════════════════════ PART 3 · LINES AND EQUATIONS ════════════════

  // ── 16 · gradient and equation ────────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'LineChart',
    eyebrow: 'Part 3 · Lines and equations',
    title: 'The Line Through Two Points',
    ratio: 50,
    inlineSvg: DIAGRAMS.GRADIENT,
    content: 'From $A(-1, 1)$ to $C(2, 7)$: up 6, across 3.\n\nGradient 2, so $y = 2x + c$. Put in $A$: $1 = -2 + c$, so $c = 3$ and $y = 2x + 3$.',
    notes: [
      { tone: 'write', text: '**Gradient:** $m = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y_2 - y_1}{x_2 - x_1}$\n**Equation of a line:** $y = mx + c$. Put one point in to find $c$.' },
    ],
    check: {
      id: 'chk_gradient',
      q: 'What is the gradient of the line through $(1, 4)$ and $(3, 10)$?',
      options: [
        { val: 'A', text: '$3$' },
        { val: 'B', text: '$\\dfrac{1}{3}$' },
        { val: 'C', text: '$7$' },
        { val: 'D', text: '$-3$' },
      ],
      correct: 'A',
      expEn: 'Rise $10 - 4 = 6$, run $3 - 1 = 2$, so $m = 6 \\div 2 = 3$. B is run over rise, upside down; D mixes the order of subtraction.',
    },
  },

  // ── 17 · an area gives a quadratic ────────────────────────────────────────
  {
    layout: 'steps',
    accent: VIOLET,
    icon: 'Variable',
    eyebrow: 'Worked example · show that, then solve',
    title: 'An Area Makes an Equation',
    inlineSvg: DIAGRAMS.AREA_TRI,
    content: 'The triangle has area 18 cm². Show that $2x^2 + x - 36 = 0$, and find $x$.',
    steps: [
      { text: '**Area:** $\\dfrac{1}{2} \\times x \\times (2x + 1) = 18$.' },
      { text: '**Clear the half:** $x(2x + 1) = 36$, so $2x^2 + x - 36 = 0$.' },
      { text: '**Factorise:** $(2x + 9)(x - 4) = 0$, so $x = -4.5$ or $x = 4$.' },
      { text: '**In context:** a length cannot be negative, so $x = 4$.' },
    ],
    check: {
      id: 'chk_context',
      q: '$(2x + 9)(x - 4) = 0$ gives $x = -4.5$ or $x = 4$. Which is the length $x$ in the triangle?',
      options: [
        { val: 'A', text: '$-4.5$' },
        { val: 'B', text: 'both of them' },
        { val: 'C', text: 'neither of them' },
        { val: 'D', text: '$4$' },
      ],
      correct: 'D',
      expEn: 'A side of a triangle must be positive, so $x = -4.5$ is rejected and $x = 4$: the sides are 4 cm and 9 cm, and $\\dfrac{1}{2} \\times 4 \\times 9 = 18$. "In the context of the question" means exactly this check.',
    },
  },

  // ════════════════════════════ PART 4 · SIMULTANEOUS EQUATIONS ═════════════

  // ── 18 · predict: one equation ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Part 4 · Simultaneous equations — decide first',
    title: 'One Equation, Two Letters',
    content: 'Two numbers add up to 10.\n\n$$x + y = 10$$',
    activity: {
      id: 'act_predict_many',
      type: 'predict',
      prompt: 'How many pairs of numbers make $x + y = 10$ true?',
      options: [
        { val: 'one', name: 'Just one pair' },
        { val: 'few', name: 'A handful' },
        { val: 'inf', name: 'Infinitely many' },
      ],
      correct: 'inf',
      explain: '$(1, 9)$, $(2, 8)$, $(2.5, 7.5)$, $(-3, 13)$ … every point on a straight line. A **second** equation — a second line — pins down the one pair that works for both.',
    },
  },

  // ── 19 · the picture ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: EMER,
    icon: 'Combine',
    eyebrow: 'Key word',
    title: 'Two Lines, One Point',
    ratio: 52,
    inlineSvg: DIAGRAMS.SIM_LINES,
    content: 'Add a second fact: the numbers differ by 4.\n\nOnly one point is on both lines: $x = 7$, $y = 3$.',
    notes: [
      { tone: 'write', text: '**Simultaneous equations:** two equations that are true at the same time. The solution is where their graphs cross.' },
    ],
  },

  // ── 20 · the elimination machine (widget) ─────────────────────────────────
  {
    layout: 'showcase',
    accent: EMER,
    icon: 'GitMerge',
    eyebrow: 'Press Next step — say what happens first',
    title: 'Get Rid of a Letter',
    widget: EliminationMachine,
    caption: 'Make one letter\'s numbers the **same size**, then add or subtract so it cancels. Press **Next example** for a pair solved by substitution.',
  },

  // ── 21 · elimination ──────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: EMER,
    icon: 'PenLine',
    eyebrow: 'Worked example · elimination',
    title: 'Multiply, Then Add',
    inlineSvg: DIAGRAMS.ELIM_COLUMNS,
    content: 'Solve $5x + 3y = 21$ (1) and $2x - y = 4$ (2).',
    steps: [
      { text: '**Match:** the $y$ terms are 3 and 1. Multiply (2) by 3: $6x - 3y = 12$ (3). Every term, the 4 as well.' },
      { text: '**Signs:** $+3y$ and $-3y$ are different, so **add** (1) and (3): $11x = 33$, so $x = 3$.' },
      { text: '**Back:** put $x = 3$ into (2): $6 - y = 4$, so $y = 2$.' },
      { text: '**Check** in (1): $5(3) + 3(2) = 21$ ✓' },
    ],
    check: {
      id: 'chk_same_signs',
      q: '$4x + 3y = 22$ and $4x - y = 10$. To get rid of $x$, you…',
      options: [
        { val: 'A', text: 'add the equations' },
        { val: 'B', text: 'multiply one equation first' },
        { val: 'C', text: 'subtract the equations' },
        { val: 'D', text: 'multiply both equations first' },
      ],
      correct: 'C',
      expEn: 'Both have $+4x$ — the same size and the same sign — so subtract: $4y = 12$ and $y = 3$. Same signs subtract; different signs add. There is nothing to multiply: they already match.',
    },
  },

  // ── 22 · substitution ─────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: EMER,
    icon: 'ArrowLeftRight',
    eyebrow: 'Worked example · substitution',
    title: 'A Letter Already on Its Own',
    inlineSvg: DIAGRAMS.SUB_ARROW,
    content: 'Solve $y = 2x - 1$ (1) and $3x + 2y = 12$ (2).',
    steps: [
      { text: '**Substitute:** (1) says what $y$ is. Replace $y$ in (2), in a bracket: $3x + 2(2x - 1) = 12$.' },
      { text: '**Expand and collect:** $3x + 4x - 2 = 12$, so $7x = 14$ and $x = 2$.' },
      { text: '**Back:** $y = 2(2) - 1 = 3$.' },
      { text: '**Check** in (2): $3(2) + 2(3) = 12$ ✓' },
    ],
    check: {
      id: 'chk_substitute',
      q: '$y = x + 2$ and $3x + y = 10$. Find $x$.',
      options: [
        { val: 'A', text: '$x = 2$' },
        { val: 'B', text: '$x = 3$' },
        { val: 'C', text: '$x = 2.5$' },
        { val: 'D', text: '$x = 8$' },
      ],
      correct: 'A',
      expEn: '$3x + (x + 2) = 10$, so $4x = 8$ and $x = 2$ (then $y = 4$). C forgets the $+2$ from the bracket; B adds the 2 to the other side instead of taking it away.',
    },
  },

  // ── 23 · sort: the quickest method ────────────────────────────────────────
  {
    layout: 'statement',
    accent: EMER,
    icon: 'ListChecks',
    eyebrow: 'The paper asks: why is your method the quickest?',
    title: 'Choose the Method',
    label: 'Sort it',
    labelIcon: 'Sparkles',
    text: 'A letter already on its own: **substitution**. Numbers already the same size: **eliminate straight away**. Otherwise: **multiply first**.',
    sub: 'Say the reason out loud as you drop each card — that sentence is the mark.',
    activity: {
      id: 'act_sort_method',
      type: 'sort',
      prompt: 'Which method is quickest for each pair?',
      bins: [
        { id: 'sub', name: 'Substitution' },
        { id: 'straight', name: 'Eliminate straight away' },
        { id: 'mult', name: 'Multiply, then eliminate' },
      ],
      cards: [
        { id: 'm1', name: '$y = 4x + 1$ and $2x + y = 7$', bin: 'sub' },
        { id: 'm2', name: '$x = 3y - 2$ and $2x + y = 10$', bin: 'sub' },
        { id: 'm3', name: '$3x + 2y = 11$ and $5x - 2y = 13$', bin: 'straight' },
        { id: 'm4', name: '$6x - y = 9$ and $6x + 5y = 3$', bin: 'straight' },
        { id: 'm5', name: '$2x + 3y = 12$ and $4x + y = 14$', bin: 'mult' },
        { id: 'm6', name: '$3x + 4y = 5$ and $2x + 3y = 4$', bin: 'mult' },
      ],
      explain: '$y = 4x + 1$ already says what $y$ is: substitute. $+2y$ and $-2y$ already match: add. $2x$ and $4x$ match once the first equation is doubled. $3x + 4y$ and $2x + 3y$ share no factor, so both equations are multiplied.',
    },
  },

  // ── 24 · tidy first ───────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: EMER,
    icon: 'Brackets',
    eyebrow: 'Brackets and fractions',
    title: 'Tidy Before You Choose',
    content: 'Brackets and fractions hide the numbers you need. Clear them first, so each equation reads $ax + by = c$:\n\n$$2(x + 3) - (y - 1) = 9 \\quad\\Rightarrow\\quad 2x + 6 - y + 1 = 9 \\quad\\Rightarrow\\quad 2x - y = 2$$\n\nA fraction: multiply **every** term by the number underneath.',
    notes: [
      { tone: 'write', text: 'Tidy each equation to $ax + by = c$ first. A minus in front of a bracket changes the sign of **both** terms inside.' },
    ],
    check: {
      id: 'chk_tidy',
      q: 'Tidy $3(x - 1) + 2(y + 2) = 10$ into the form $ax + by = c$.',
      options: [
        { val: 'A', text: '$3x + 2y = 10$' },
        { val: 'B', text: '$3x + 2y = 7$' },
        { val: 'C', text: '$3x - 2y = 9$' },
        { val: 'D', text: '$3x + 2y = 9$' },
      ],
      correct: 'D',
      expEn: '$3x - 3 + 2y + 4 = 10$, so $3x + 2y + 1 = 10$ and $3x + 2y = 9$. A drops the numbers from the brackets; B uses only the $-3$.',
    },
  },

  // ── 25 · a chain ──────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: EMER,
    icon: 'Split',
    eyebrow: 'Read it carefully',
    title: 'A Chain Says Two Things',
    content: 'Three expressions joined by two equals signs:\n\n$$4x - y = x + 2y = 9$$\n\nEach expression equals 9. That is **two** equations — and two equations with two letters can be solved.',
    check: {
      id: 'chk_chain',
      q: 'Which two equations does $4x - y = x + 2y = 9$ say?',
      options: [
        { val: 'A', text: '$4x - y = x + 2y$ only' },
        { val: 'B', text: '$5x + y = 9$' },
        { val: 'C', text: '$4x - y = 9$ and $x + 2y = 9$' },
        { val: 'D', text: '$4x - y = 9$ only' },
      ],
      correct: 'C',
      expEn: 'Each part equals 9, so $4x - y = 9$ and $x + 2y = 9$. A is true but is only one equation; B adds the two expressions, but each is 9 on its own.',
    },
  },

  // ── 26 · the checklist ────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    title: 'Can You Do These?',
    content: '> Every orange **Write** panel belongs in your notebook. There are 7.',
    items: [
      { text: 'Write the bounds of a rounded value, $\\le$ on the left and $<$ on the right.' },
      { text: 'Work out a journey time across a time zone.' },
      { text: 'Solve an inequality — and turn the sign when dividing by a negative.' },
      { text: 'Show an inequality on a number line: open or filled circles.' },
      { text: 'Split a double inequality and list the integers.' },
      { text: 'Find the three inequalities for a region: solid or dashed, then test a point.' },
      { text: 'Find the equation of the line through two points.' },
      { text: 'Solve simultaneous equations by the quickest method — and say why.' },
    ],
    check: {
      id: 'chk_final',
      q: 'Solve $2x + y = 7$ and $x - y = 2$.',
      options: [
        { val: 'A', text: '$x = 1,\\ y = 3$' },
        { val: 'B', text: '$x = 3,\\ y = 1$' },
        { val: 'C', text: '$x = 3,\\ y = -1$' },
        { val: 'D', text: '$x = 2.5,\\ y = 2$' },
      ],
      correct: 'B',
      expEn: 'The $y$ terms are $+y$ and $-y$: add, $3x = 9$, so $x = 3$. Then $3 - y = 2$ gives $y = 1$. Check: $2(3) + 1 = 7$ ✓. C drops a sign in the last step.',
    },
  },
];
