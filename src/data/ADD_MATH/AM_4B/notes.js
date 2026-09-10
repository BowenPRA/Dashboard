// src/data/ADD_MATH/AM_4B/notes.js
// AM_4B — Sketching Cubic Graphs and Their Moduli.
// Cambridge IGCSE Additional Mathematics 0606, section 4.3.
//
// THE EXEMPLAR DECK for this track (docs/add-math-course.md §5): twenty-one
// slides, one idea each, and on six of them the student does something on
// the screen before the deck tells them the answer — predicts the shape,
// sorts equations by end behaviour, taps the pieces of a curve to reflect,
// taps the root that touches, puts the method in order. Seventeen scored
// items (eleven checks, six activities) carry the NOTES score.
//
// THE SPINE:
//   1–4    ask before you tell — what does a cubic look like? Then the only
//          two shapes there are, and where every feature of the sketch comes
//          from in the brackets.
//   5–7    worked example 7 as the book works it, the sketch, and the sign
//          test for end behaviour drilled by sorting.
//   8–9    the modulus: reflect what is below (tapped), then the finished graph.
//   10–13  worked example 8: a squared factor TOUCHES (tapped), up close, and
//          its modulus.
//   14–16  factorise first — common factor, the factor theorem — and the
//          whole method put in order.
//   17–20  the exercise's other shapes: a printed figure, a cubic against a
//          parabola, and the section run backwards from a graph to k.
//   21     the recap.
//
// House notes:
//  · ENGLISH ONLY — ADD_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Activity schemas: docs/add-math/notes-and-activities.md.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const AMBER = '#d97706';
const PURPLE = '#a855f7';
const RED = '#ef4444';

export const notes = [
  {
    layout: 'hero',
    color: '#1d4ed8',
    icon: 'Spline',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 4 · Equations, inequalities and graphs · 4.3',
    title: 'Sketching Cubic Graphs',
    objective: 'I can sketch y = k(x − a)(x − b)(x − c) from its factors — every intercept, the right shape, cross or touch at each root — and sketch its modulus by reflecting what is below the axis.',
  },

  // ── 2 · ask before you tell ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you turn the page',
    title: 'What Does a Cubic Look Like?',
    content: 'You know a straight line and you know a parabola. Now consider\n\n$$y = (x - 1)(x - 2)(x - 3)$$\n\nMultiplied out, the highest power is $x^3$ — a **cubic**. Where does it meet the $x$-axis? What happens when $x$ is huge? Sketch it in your head before you choose.',
    activity: {
      id: 'act_predict_shape',
      type: 'predict',
      prompt: 'Which description fits the graph of $y = (x - 1)(x - 2)(x - 3)$?',
      options: [
        { val: 'n', name: 'Comes up from the bottom left, wiggles through the axis at 1, 2 and 3, and leaves at the top right' },
        { val: 'u', name: 'A U shape with its lowest point between 1 and 3' },
        { val: 'down', name: 'Comes down from the top left, through 1, 2 and 3, and leaves at the bottom right' },
        { val: 'line', name: 'A straight line through 1, 2 and 3' },
      ],
      correct: 'n',
      explain: 'Each bracket is zero once, so the curve meets the axis three times. For huge positive $x$ all three brackets are positive, so $y$ is huge and positive: the right-hand tail climbs. For huge negative $x$ all three are negative, and three negatives multiply to a negative: the left-hand tail falls. That S-shaped wiggle is what every cubic in this section looks like — one way up or the other.',
    },
  },

  // ── 3 · the two shapes ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Spline',
    eyebrow: 'There are only two',
    title: 'The Two Shapes of a Cubic',
    inlineSvg: DIAGRAMS.TWO_SHAPES,
    drawThis: true,
    caption: 'For $y = k(x - a)(x - b)(x - c)$ the shape is decided by the **sign of $k$** — the number in front, times the $x$ coefficients of the brackets. Positive: the curve climbs to the right and falls to the left. Negative: the other way round. Nothing else about the equation changes the shape.',
    check: {
      id: 'chk_end_behaviour',
      q: 'For $y = (2 - x)(x + 1)(x - 3)$, what happens to $y$ as $x \\to +\\infty$?',
      options: [
        { val: 'A', text: '$y \\to +\\infty$' },
        { val: 'B', text: '$y \\to -\\infty$' },
        { val: 'C', text: '$y \\to 0$' },
        { val: 'D', text: '$y \\to 3$' },
      ],
      correct: 'B',
      expEn: 'Multiply the $x$ coefficients: $(-1) \\times 1 \\times 1 = -1$, which is negative. So the curve falls to the right: $y \\to -\\infty$. You can also see it directly — for a huge $x$, $(2 - x)$ is huge and negative while the other two brackets are positive.',
    },
  },

  // ── 4 · anatomy ─────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'ScanEye',
    eyebrow: 'The equation already contains the sketch',
    title: 'Everything Is in the Brackets',
    inlineSvg: DIAGRAMS.ANATOMY,
    caption: 'A bracket equal to zero gives an $x$-intercept — solve it, do not read the sign off the page: $(x + 1)$ is zero at $-1$, and $(2 - x)$ at $+2$. Put $x = 0$ for the $y$-intercept, and remember the number in front. The sign of $k$ gives the shape.',
    check: {
      id: 'chk_yint',
      q: 'What is the $y$-intercept of $y = 2(x + 1)(x - 3)(2 - x)$?',
      options: [
        { val: 'A', text: '$-6$' },
        { val: 'B', text: '$6$' },
        { val: 'C', text: '$-12$' },
        { val: 'D', text: '$12$' },
      ],
      correct: 'C',
      expEn: 'Put $x = 0$: $2 \\times 1 \\times (-3) \\times 2 = -12$. A forgets the $2$ in front; B and D have the sign wrong — there is exactly one negative factor.',
    },
  },

  // ── 5 · WE7 steps ───────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'PenLine',
    eyebrow: 'Worked example 7a · the book\'s method',
    title: 'Sketching From the Factors',
    content: 'Sketch $y = (2x - 1)(2 - x)(x + 1)$. Four facts, in the order the book writes them.',
    steps: [
      { text: '**$y$-intercept.** Put $x = 0$: $y = (-1)(2)(1) = -2$. The curve passes through $(0, -2)$.' },
      { text: '**$x$-intercepts.** Put $y = 0$: $2x - 1 = 0$ gives $x = \\tfrac{1}{2}$; $2 - x = 0$ gives $x = 2$; $x + 1 = 0$ gives $x = -1$.' },
      { text: '**End behaviour.** The $x$ coefficients are $2$, $-1$ and $1$, product $-2 < 0$. So as $x \\to +\\infty$, $y \\to -\\infty$, and as $x \\to -\\infty$, $y \\to +\\infty$.' },
      { text: '**Draw.** Start high on the left, come down through $-1$, turn, cross $\\tfrac{1}{2}$ going up past $(0, -2)$… wait — check that: at $x = 0$ the curve is at $-2$, which is between the roots $-1$ and $\\tfrac{1}{2}$, so between those roots the curve dips **below** the axis. Then up through $\\tfrac{1}{2}$, turn, down through $2$, and away to the bottom right.' },
    ],
    notes: [
      { tone: 'write', text: 'A sketch shows the **shape and the intercepts**. The turning points go roughly where they belong; you are not asked for their coordinates.' },
    ],
  },

  // ── 6 · WE7 sketch ──────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'LineChart',
    eyebrow: 'Worked example 7a · the sketch',
    title: 'Three Crossings and a Falling Tail',
    inlineSvg: DIAGRAMS.WE7_CURVE,
    drawThis: true,
    caption: 'The three intercepts are labelled with their exact values — $\\tfrac{1}{2}$ stays a fraction — and the $y$-intercept sits at $-2$. Between $-1$ and $\\tfrac{1}{2}$ the curve is below the axis; between $\\tfrac{1}{2}$ and $2$ it is above. Notice the shape: $k < 0$, so it falls to the right.',
    check: {
      id: 'chk_root_from_bracket',
      q: 'Which $x$-intercept comes from the bracket $(2x - 1)$?',
      options: [
        { val: 'A', text: '$x = 1$' },
        { val: 'B', text: '$x = -\\tfrac{1}{2}$' },
        { val: 'C', text: '$x = 2$' },
        { val: 'D', text: '$x = \\tfrac{1}{2}$' },
      ],
      correct: 'D',
      expEn: 'Solve $2x - 1 = 0$: $2x = 1$, so $x = \\tfrac{1}{2}$. A forgets to divide by the $2$; B reads the sign off the page; C is the root of a different bracket.',
    },
  },

  // ── 7 · sort by end behaviour ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ArrowUpDown',
    eyebrow: 'The sign test, drilled',
    title: 'Count the Negatives',
    label: 'Try it',
    labelIcon: 'Hourglass',
    text: 'The sign of $k$ is the sign of the number in front times every $x$ coefficient.',
    sub: 'An odd number of negatives makes the product negative. A bracket written $(3 - x)$ or $(5 - 2x)$ hides a negative $x$ coefficient — count it.',
    activity: {
      id: 'act_sort_end',
      type: 'sort',
      prompt: 'Sort the six curves by what their right-hand tail does.',
      bins: [
        { id: 'up', name: 'Climbs to the right ($k > 0$)' },
        { id: 'down', name: 'Falls to the right ($k < 0$)' },
      ],
      cards: [
        { id: 'e1', name: '$y = (x - 2)(x - 4)(x + 3)$', bin: 'up' },
        { id: 'e2', name: '$y = (x + 2)(x + 1)(3 - x)$', bin: 'down' },
        { id: 'e3', name: '$y = (3 - 2x)(x - 1)(x + 2)$', bin: 'down' },
        { id: 'e4', name: '$y = -2(x + 1)(x - 1)(x - 4)$', bin: 'down' },
        { id: 'e5', name: '$y = (2 - x)(3 - x)(x + 1)$', bin: 'up' },
        { id: 'e6', name: '$y = x^2(5 - 2x)$', bin: 'down' },
      ],
      explain: 'Count the negatives among the number in front and the $x$ coefficients. $(2 - x)(3 - x)(x + 1)$ has two, so the product is positive and it climbs. $-2(x + 1)(x - 1)(x - 4)$ has one — the $-2$ — so it falls. $x^2(5 - 2x)$ has one, in the $-2x$.',
    },
  },

  // ── 8 · the reflection rule, tapped ─────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'FlipVertical2',
    eyebrow: 'Worked example 7b · the modulus',
    title: 'Reflect What Is Below',
    inlineSvg: DIAGRAMS.REFLECT_RULE,
    caption: 'To sketch $y = |(2x - 1)(2 - x)(x + 1)|$, take the sketch of the cubic and **reflect in the $x$-axis every piece that lies below it**. Pieces above the axis are left alone. A modulus is never negative, so the finished graph never dips below the axis.',
    activity: {
      id: 'act_reflect_we7',
      type: 'reflect',
      prompt: 'Here is the cubic again. Tap every piece of the curve that is below the $x$-axis, then reflect.',
      factors: [[2, -1], [-1, 2], [1, 1]],
      display: '(2x - 1)(2 - x)(x + 1)',
      explain: 'Two pieces were below the axis: the stretch between $-1$ and $\\tfrac{1}{2}$, and the whole right-hand tail beyond $2$. Both fold up; the left tail and the hump between $\\tfrac{1}{2}$ and $2$ were already above and do not move.',
    },
  },

  // ── 9 · finished modulus ────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'LineChart',
    eyebrow: 'Worked example 7b · the sketch',
    title: 'The Finished Modulus Graph',
    inlineSvg: DIAGRAMS.WE7_MOD,
    drawThis: true,
    caption: 'The $x$-intercepts have not moved — a point on the axis has $y = 0$, and $|0| = 0$ — but each one is now a sharp corner where the curve bounces off the axis. The $y$-intercept has gone from $-2$ to $2$.',
    check: {
      id: 'chk_mod_yint',
      q: 'The cubic passed through $(0, -2)$. Where does its modulus graph meet the $y$-axis?',
      options: [
        { val: 'A', text: '$(0, -2)$ — the modulus does not change intercepts' },
        { val: 'B', text: '$(0, 2)$' },
        { val: 'C', text: '$(0, 0)$' },
        { val: 'D', text: '$(2, 0)$' },
      ],
      correct: 'B',
      expEn: 'At $x = 0$ the value inside the bars is $-2$, and $|-2| = 2$. It is the $x$-intercepts that stay put, because their $y$ value is $0$ and reflecting $0$ does nothing. A point below the axis is always moved.',
    },
  },

  // ── 10 · WE8 steps ──────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Worked example 8a · a squared factor',
    title: 'When a Factor Appears Twice',
    content: 'Sketch $y = (x - 1)^2(x + 1)$. The same four facts — but one of the brackets is squared.',
    steps: [
      { text: '**$y$-intercept.** $x = 0$: $y = (-1)^2 \\times 1 = 1$.' },
      { text: '**$x$-intercepts.** $y = 0$: $(x - 1)(x - 1)(x + 1) = 0$, so $x = 1$, $x = 1$ **(repeated)**, and $x = -1$.' },
      { text: '**End behaviour.** The $x$ coefficients are all $1$, so $k = 1 > 0$: climbs to the right, falls to the left.' },
      { text: '**Draw.** Up from the bottom left, cross at $-1$, over the top past $(0, 1)$, down to the axis at $1$ — and here it does **not** cross. It touches and turns back up.' },
    ],
    notes: [
      { tone: 'plant', text: 'A **repeated root** is where a squared bracket is zero. The curve **touches** the axis there: it comes down to it and bounces off.' },
    ],
  },

  // ── 11 · WE8 sketch, tapped ─────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'LineChart',
    eyebrow: 'Worked example 8a · the sketch',
    title: 'A Touch, Not a Crossing',
    inlineSvg: DIAGRAMS.WE8_CURVE,
    drawThis: true,
    caption: 'Two $x$-intercepts, not three, because two of the brackets are the same. At $x = -1$ the curve crosses. At $x = 1$ it only touches — the sign of $y$ is the same on both sides of $1$, because $(x - 1)^2$ is never negative.',
    activity: {
      id: 'act_hotspot_touch',
      type: 'hotspot',
      prompt: 'Tap the point where the curve TOUCHES the $x$-axis.',
      svg: DIAGRAMS.WE8_CURVE,
      viewBox: '0 0 560 340',
      targets: [
        { id: 'touch', x: 360, y: 200, r: 30, name: 'the touch at x = 1' },
        { id: 'cross', x: 160, y: 200, r: 30, name: 'the crossing at x = −1' },
        { id: 'yint', x: 260, y: 138, r: 26, name: 'the y-intercept' },
      ],
      correct: 'touch',
      explain: 'The touch is at $x = 1$, from the squared bracket $(x - 1)^2$. At $x = -1$ the single bracket $(x + 1)$ changes sign, so the curve crosses there.',
    },
  },

  // ── 12 · touch vs cross ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Target',
    eyebrow: 'The rule, up close',
    title: 'Cross or Touch?',
    inlineSvg: DIAGRAMS.TOUCH_VS_CROSS,
    caption: 'A bracket to the power $1$ changes sign as $x$ passes its root, so the curve goes from one side of the axis to the other: it **crosses**. A bracket squared is never negative, so the sign of $y$ is the same on both sides: the curve **touches** and turns back.',
    check: {
      id: 'chk_touch_which',
      q: 'The curve $y = (x + 2)^2(x - 3)$ meets the axis at $x = -2$ and $x = 3$. Which is true?',
      options: [
        { val: 'A', text: 'It crosses at $-2$ and touches at $3$' },
        { val: 'B', text: 'It touches at both' },
        { val: 'C', text: 'It touches at $-2$ and crosses at $3$' },
        { val: 'D', text: 'It crosses at both' },
      ],
      correct: 'C',
      expEn: 'The squared bracket is $(x + 2)^2$, zero at $x = -2$ — that is the touch. The single bracket $(x - 3)$ gives the crossing at $3$. Read which bracket carries the square, not which number is bigger.',
    },
  },

  // ── 13 · WE8 modulus ────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'FlipVertical2',
    eyebrow: 'Worked example 8b · the modulus',
    title: 'The Modulus of a Curve That Touches',
    inlineSvg: DIAGRAMS.WE8_MOD,
    caption: 'Only one piece of this curve was below the axis — the left-hand tail, to the left of $-1$. It folds up; everything else, including the touch at $x = 1$, is exactly as it was. A touch is never reflected, because the curve never went below the axis there.',
    activity: {
      id: 'act_reflect_we8',
      type: 'reflect',
      prompt: 'Tap every piece of $y = (x - 1)^2(x + 1)$ that lies below the axis, then reflect. Careful — it is not two pieces.',
      factors: [[1, -1], [1, -1], [1, 1]],
      display: '(x - 1)^2(x + 1)',
      explain: 'Just the left tail. Between $-1$ and $1$ the curve is above the axis, it touches at $1$ without going below, and it climbs away to the right. One reflection, and the touch is untouched.',
    },
  },

  // ── 14 · factorise first: common factor ─────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Scissors',
    eyebrow: 'Exercise 4.3 question 6 · factorise, then sketch',
    title: 'When the Brackets Are Hidden',
    content: 'Sketch $y = 9x - x^3$. There are no brackets yet, so there are no intercepts to read — the first job is to make some.',
    steps: [
      { text: 'Take out the **common factor** $x$: $y = x(9 - x^2)$.' },
      { text: 'Look at what is left. $9 - x^2$ is a **difference of two squares**: $(3 - x)(3 + x)$.' },
      { text: 'Now it is three linear factors: $y = x(3 - x)(3 + x)$, with roots $0$, $3$ and $-3$.' },
      { text: 'The $x$ coefficients are $1$, $-1$, $1$: product $-1$, so the curve falls to the right. It passes through the origin, so the $y$-intercept is $0$.' },
    ],
    reveal: {
      label: 'Why must you factorise completely?',
      prompt: 'A student stops at $y = x(9 - x^2)$ and sketches. What goes wrong?',
      answer: 'They see only one root, $x = 0$, and miss the two at $\\pm 3$ — so the sketch has one crossing where there should be three. A sketch is only as good as the factorising underneath it: every linear factor is an intercept, and a quadratic bracket is two of them still hidden.',
    },
  },

  // ── 15 · factor theorem ─────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Split',
    eyebrow: 'Exercise 4.3 question 6 · when there is no common factor',
    title: 'The Factor Theorem Finds the First Bracket',
    content: 'Sketch $y = x^3 + 4x^2 + x - 6$. Nothing to take out — so use the factor theorem from chapter 3.',
    steps: [
      { text: 'Try small values. $x = 1$: $1 + 4 + 1 - 6 = 0$. So $(x - 1)$ is a factor.' },
      { text: 'Divide it out (long division, or match coefficients): $x^3 + 4x^2 + x - 6 = (x - 1)(x^2 + 5x + 6)$.' },
      { text: 'Factorise the quadratic: $x^2 + 5x + 6 = (x + 2)(x + 3)$.' },
      { text: 'So $y = (x - 1)(x + 2)(x + 3)$: roots $1$, $-2$, $-3$; $y$-intercept $-6$; $k = 1$, climbs to the right.' },
    ],
    check: {
      id: 'chk_factor_theorem',
      q: 'For $P(x) = 2x^3 + x^2 - 25x + 12$, which of these is a factor?',
      options: [
        { val: 'A', text: '$(x - 1)$' },
        { val: 'B', text: '$(x + 1)$' },
        { val: 'C', text: '$(x - 2)$' },
        { val: 'D', text: '$(x - 3)$' },
      ],
      correct: 'D',
      expEn: '$P(3) = 54 + 9 - 75 + 12 = 0$, so $(x - 3)$ is a factor. Check the others: $P(1) = -10$, $P(-1) = 36$, $P(2) = -18$ — none is zero. Dividing out $(x - 3)$ leaves $2x^2 + 7x - 4 = (2x - 1)(x + 4)$.',
    },
  },

  // ── 16 · the method in order ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'The whole method on one card',
    title: 'Sketching a Cubic, Start to Finish',
    content: 'Every sketching question in this section is the same seven moves. Put them in the order you would do them.',
    notes: [
      { tone: 'homework', text: 'On a sketch, **label every intercept with its exact value** — a fraction stays a fraction. Marks are given for the intercepts and the shape, not for accuracy.' },
    ],
    activity: {
      id: 'act_order_method',
      type: 'order',
      prompt: 'Put the seven moves in order.',
      steps: [
        { id: 'm1', name: 'Factorise completely, so every bracket is linear' },
        { id: 'm2', name: 'Put y = 0: each bracket gives an x-intercept' },
        { id: 'm3', name: 'Put x = 0 for the y-intercept, including the number in front' },
        { id: 'm4', name: 'Decide the end behaviour from the sign of k' },
        { id: 'm5', name: 'Mark any repeated root as a touch, not a crossing' },
        { id: 'm6', name: 'Draw the curve through the intercepts with that shape' },
        { id: 'm7', name: 'For a modulus, reflect every piece below the axis' },
      ],
      explain: 'Factorise, intercepts, y-intercept, shape, touches, draw, reflect. The order matters because each move needs the one before it: you cannot read intercepts until it is factorised, and you cannot reflect until it is drawn.',
    },
  },

  // ── 17 · reading a figure ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ScanEye',
    ratio: 55,
    eyebrow: 'Exercise 4.3 question 1 · the question runs the other way',
    title: 'Reading a Printed Graph',
    inlineSvg: DIAGRAMS.Q1_FIGURE,
    content: 'The graph of $y = (x - 2)(x + 1)(x - 3)$ is printed with four points named: $A$, $B$, $C$ on the $x$-axis and $D$ on the $y$-axis. Find their coordinates.\n\nThe brackets give $x = 2$, $x = -1$ and $x = 3$; the picture tells you **which letter is which** — read them left to right. Put $x = 0$ for $D$: $(-2)(1)(-3) = 6$.',
    notes: [
      { tone: 'write', text: 'Give a point as **coordinates**, $(-1, 0)$, not as a bare number. The question said "the coordinates of".' },
    ],
    check: {
      id: 'chk_read_A',
      q: 'On that graph, what are the coordinates of $A$?',
      options: [
        { val: 'A', text: '$(-1, 0)$' },
        { val: 'B', text: '$(2, 0)$' },
        { val: 'C', text: '$(1, 0)$' },
        { val: 'D', text: '$(0, -1)$' },
      ],
      correct: 'A',
      expEn: '$A$ is the left-most crossing, and the smallest root is $x = -1$ from the bracket $(x + 1)$. C reads the sign off the page; D puts it on the wrong axis.',
    },
  },

  // ── 18 · cubic meets parabola ───────────────────────────────────────────
  {
    layout: 'steps',
    accent: RED,
    icon: 'GitMerge',
    eyebrow: 'Exercise 4.3 questions 7 and 8 · two graphs on one grid',
    title: 'Where a Cubic Meets a Parabola',
    content: 'Sketch $y = x(x - 5)(x - 7)$ and $y = x(7 - x)$ on the same axes, then find where they meet. The sketch gives two of the points for free — both curves pass through $(0, 0)$ and $(7, 0)$ — and the algebra finds the third.',
    steps: [
      { text: 'Set the $y$ values equal: $x(x - 5)(x - 7) = x(7 - x)$.' },
      { text: '**Do not divide by $x$** — that throws away the solution $x = 0$. Move everything to one side instead: $x(x - 5)(x - 7) + x(x - 7) = 0$, using $x(7 - x) = -x(x - 7)$.' },
      { text: 'Take out the common factor $x(x - 7)$: $x(x - 7)(x - 5 + 1) = x(x - 7)(x - 4) = 0$.' },
      { text: 'So $x = 0$, $4$ or $7$. Then $y$ from the easier equation, $y = x(7 - x)$: the points are $(0, 0)$, $(4, 12)$ and $(7, 0)$.' },
    ],
    check: {
      id: 'chk_dont_divide',
      q: 'Why should you not divide both sides of $x(x - 5)(x - 7) = x(7 - x)$ by $x$?',
      options: [
        { val: 'A', text: 'Because $x$ might be negative' },
        { val: 'B', text: 'Because $x = 0$ is a solution, and dividing by $x$ loses it' },
        { val: 'C', text: 'Because you can only divide by numbers' },
        { val: 'D', text: 'You can — it makes no difference' },
      ],
      correct: 'B',
      expEn: 'Both curves pass through the origin, so $x = 0$ is one of the answers. Dividing by $x$ is dividing by zero at that point, and the solution vanishes. Move everything to one side and factorise instead — the common factor $x$ stays visible.',
    },
  },

  // ── 19 · backwards: find k ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Route',
    ratio: 52,
    eyebrow: 'Exercise 4.3 question 9 · from the graph to the equation',
    title: 'Running It Backwards',
    inlineSvg: DIAGRAMS.Q9_GRID,
    content: 'The graph of $y = k(x - a)^2(x - b)$ is printed on a grid. Find $a$, $b$ and $k$.\n\nThe curve **touches** at $1$ and **crosses** at $2$, so the squared bracket is $(x - 1)$ and $a = 1$, $b = 2$. That leaves $k$: use a point that is not a root. It passes through $(0, 4)$:\n\n$$4 = k(0 - 1)^2(0 - 2) = -2k \\;\\Rightarrow\\; k = -2$$\n\nCheck the shape: $k < 0$ falls to the right — and it does.',
    check: {
      id: 'chk_find_k',
      q: 'A curve $y = k(x - 2)^2(x + 1)$ passes through $(0, 8)$. What is $k$?',
      options: [
        { val: 'A', text: '$k = 8$' },
        { val: 'B', text: '$k = -2$' },
        { val: 'C', text: '$k = 4$' },
        { val: 'D', text: '$k = 2$' },
      ],
      correct: 'D',
      expEn: 'Substitute the point: $8 = k(-2)^2(1) = 4k$, so $k = 2$. A stops before dividing; B has the sign wrong — $(-2)^2$ is positive.',
    },
  },

  // ── 20 · the modulus backwards ──────────────────────────────────────────
  {
    layout: 'split',
    accent: AMBER,
    icon: 'FlipVertical2',
    ratio: 52,
    eyebrow: 'Exercise 4.3 question 10 · the last twist',
    title: 'A Modulus Graph Hides the Sign of k',
    inlineSvg: DIAGRAMS.Q10_GRID,
    content: 'This is $y = |k(x - a)(x - b)(x - c)|$ with $a < b < c$. The corners on the axis give $a = -1$, $b = 1$, $c = 2$ — reflecting never moves an intercept.\n\nFor $k$, use $(0, 6)$: $6 = |k(1)(-1)(-2)| = |2k|$, so $k = 3$ **or** $k = -3$. Both are right: the two cubics are reflections of each other, and reflecting everything below the axis makes them identical.',
    check: {
      id: 'chk_mod_k_sign',
      q: 'Two cubics, $y = 3(x + 1)(x - 1)(x - 2)$ and $y = -3(x + 1)(x - 1)(x - 2)$. What is true of their modulus graphs?',
      options: [
        { val: 'A', text: 'They are identical' },
        { val: 'B', text: 'They are reflections of each other in the $x$-axis' },
        { val: 'C', text: 'They have different $x$-intercepts' },
        { val: 'D', text: 'One is twice the height of the other' },
      ],
      correct: 'A',
      expEn: 'The two cubics are reflections of each other in the $x$-axis. Taking the modulus folds everything above the axis, so whatever was above stays and whatever was below joins it — the same graph either way. That is why the question can only pin $k$ down to $\\pm 3$.',
    },
  },

  // ── 21 · recap ──────────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'ListChecks',
    variant: 'checklist',
    columns: 2,
    eyebrow: 'Tick each one only if you could do it right now, unaided',
    title: 'What You Should Be Able to Do',
    items: [
      { text: 'Read the $x$-intercepts off the brackets — solving each one, not copying its sign.' },
      { text: 'Find the $y$-intercept by putting $x = 0$, with the number in front.' },
      { text: 'Decide the end behaviour from the sign of $k$: count the negatives.' },
      { text: 'Draw the right one of the two shapes through the intercepts.' },
      { text: 'Recognise a squared bracket as a **touch**, and draw it turning back.' },
      { text: 'Reflect the pieces below the axis to sketch the modulus, leaving the intercepts where they are.' },
      { text: 'Factorise an expanded cubic first — common factor, difference of two squares, or the factor theorem.' },
      { text: 'Find where a cubic meets another curve without dividing by $x$.' },
      { text: 'Read $a$, $b$, $c$ off a printed graph, and find $k$ from one more point.' },
      { text: 'Label every intercept on a sketch with its exact value.' },
    ],
    check: {
      id: 'chk_recap',
      q: 'A sketch of $y = (x - 3)(x + 1)^2$ must show which of these?',
      options: [
        { val: 'A', text: 'Crossings at $3$ and $-1$, $y$-intercept $3$, climbing to the right' },
        { val: 'B', text: 'A crossing at $3$, a touch at $-1$, $y$-intercept $-3$, climbing to the right' },
        { val: 'C', text: 'A touch at $3$, a crossing at $-1$, $y$-intercept $-3$, falling to the right' },
        { val: 'D', text: 'A crossing at $3$, a touch at $-1$, $y$-intercept $3$, falling to the right' },
      ],
      correct: 'B',
      expEn: 'The squared bracket $(x + 1)^2$ touches at $-1$; $(x - 3)$ crosses at $3$; at $x = 0$, $y = (-3)(1) = -3$; and the $x$ coefficients multiply to $+1$, so it climbs to the right.',
    },
  },
];
