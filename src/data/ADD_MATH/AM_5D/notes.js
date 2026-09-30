// src/data/ADD_MATH/AM_5D/notes.js
// AM_5D — Graphs and Inverses of Exponential and Log Functions.
// Cambridge IGCSE Additional Mathematics 0606, sections 5.9–5.11.
//
// Twenty-three slides, one idea each, following Part 1 of the three problem
// banks (docs/add-math-5-9-graphs-of-e-and-ln.md, …-5-10-…, …-5-11-…). Twenty
// scored items (thirteen checks, seven activities) carry the NOTES score.
//
// THE SPINE:
//   1–2    what chapter 1 gave us: inverse, mirror in y = x, composite.
//   3–6    5.9: ask where eˣ goes on the left, then the two curves and their
//          properties, and that they are mirror images (a hotspot).
//   7–8    5.9: a constant in three places, for eˣ (a sort) and for ln.
//   9–13   5.10: the six facts and the method in order, a worked
//          exponential and its sketch, the trap (not every curve reaches the
//          x-axis — a sort), and which way it goes.
//   14–17  5.10: where a log curve lives (predict first), a worked log curve
//          and its sketch, and the inside that is positive to the left.
//   18–22  5.11: the three steps to an inverse, the moves in order, the
//          domain of the inverse, the inverse of a log function, and
//          composites of e and ln.
//   23     the recap.
//
// House notes:
//  · ENGLISH ONLY — ADD_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Arrows and infinity are written as the characters → and ∞ inside the
//    maths: KaTeX sets them, and the narration reads "to" and "infinity",
//    where \to and \infty would be deleted.
//  · Every example here is fresh: none is a book question, and none is an
//    item from the three Exp Graph Lab tasks, Practice or the Quiz.
import { DIAGRAMS } from './diagrams.js';

const VIOLET = '#7c3aed';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const AMBER = '#d97706';
const PURPLE = '#a855f7';
const RED = '#ef4444';

export const notes = [
  {
    layout: 'hero',
    color: VIOLET,
    icon: 'Spline',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 5 · Logarithmic and exponential functions · 5.9 to 5.11',
    title: 'Graphs and Inverses of Exponential and Log Functions',
    objective: 'I can describe the graphs of e to the power x and ln x and what a constant does to them, sketch a transformed curve with its exact crossings and its asymptote, and find the inverse of an exponential or a log function together with its domain.',
  },

  // ── 2 · what chapter 1 gave us ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Repeat',
    eyebrow: 'Before you start: from chapter 1',
    title: 'Inverse, Mirror, Composite',
    content: 'Three facts about functions from chapter 1 carry this unit.\n\n**Inverse.** Only a one-one function has an inverse. To find it, write $y = f(x)$, swap $x$ and $y$, and make $y$ the subject again. The inverse of $f$ is written $f^{-1}$.\n\n**Mirror.** The graph of the inverse is the reflection of the graph of $f$ in the line $y = x$. What $f$ puts out, the inverse takes in: its domain is the range of $f$.\n\n**Composite.** $fg(x)$ means apply $g$ first, then apply $f$ to the result.',
    check: {
      id: 'chk_recap_inverse',
      q: 'Which is the inverse of $f(x) = 2x + 3$?',
      options: [
        { val: 'A', text: '$f^{-1}(x) = \\dfrac{x - 3}{2}$' },
        { val: 'B', text: '$f^{-1}(x) = \\dfrac{1}{2x + 3}$' },
        { val: 'C', text: '$f^{-1}(x) = \\dfrac{x + 3}{2}$' },
        { val: 'D', text: '$f^{-1}(x) = 2x - 3$' },
      ],
      correct: 'A',
      expEn: 'Swap: $x = 2y + 3$. Subtract $3$, then divide by $2$: $y = \\dfrac{x - 3}{2}$. B is the reciprocal $\\dfrac{1}{f(x)}$, which is not the inverse; C adds the $3$ instead of taking it away; D undoes the $+3$ but keeps the $\\times 2$.',
    },
  },

  // ── 3 · ask before you tell ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you turn the page',
    title: 'Where Does the Curve Go on the Left?',
    content: 'Work out a few values of $e^x$ as $x$ goes negative: $e^{-1} \\approx 0.37$, $e^{-3} \\approx 0.05$, and $e^{-10}$ is about $0.00005$.\n\nEach one is smaller than the last. So what does the curve $y = e^x$ do far out on the left?',
    activity: {
      id: 'act_predict_left',
      type: 'predict',
      prompt: 'Far out on the left, what does the curve $y = e^x$ do?',
      options: [
        { val: 'cross', name: 'It crosses the $x$-axis and carries on below it' },
        { val: 'near', name: 'It gets closer and closer to the $x$-axis but never touches it' },
        { val: 'touch', name: 'It touches the $x$-axis at one point and stops there' },
        { val: 'turn', name: 'It turns round and climbs again' },
      ],
      correct: 'near',
      explain: 'Each step to the left divides by $e$ again, so $e^x$ gets closer and closer to $0$. But a positive number divided by $e$ is still positive: $e^x$ never reaches $0$ and never goes below it. The $x$-axis is an **asymptote** of $y = e^x$: a line the curve approaches but never meets.',
    },
  },

  // ── 4 · the graph of eˣ ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'TrendingUp',
    eyebrow: '5.9 · The graph of eˣ',
    title: 'The Graph of y = eˣ',
    inlineSvg: DIAGRAMS.EXP_FEATURES,
    drawThis: true,
    caption: 'The curve $y = e^x$ crosses the $y$-axis at $(0, 1)$, because $e^0 = 1$. It is **positive for every** $x$, so it never meets the $x$-axis. As $x → −∞$, $y → 0$: the negative $x$-axis is an **asymptote**. As $x → +∞$, it grows without limit.',
    notes: [
      { tone: 'write', text: '$y = e^x$: through $(0, 1)$; $e^x > 0$ for every $x$; asymptote $y = 0$.' },
    ],
    check: {
      id: 'chk_ex_zero',
      q: 'For which values of $x$ is $e^x = 0$?',
      options: [
        { val: 'A', text: 'Only $x = 0$' },
        { val: 'B', text: 'Only very large negative values of $x$' },
        { val: 'C', text: 'No value of $x$' },
        { val: 'D', text: 'Every negative value of $x$' },
      ],
      correct: 'C',
      expEn: '$e^x$ is positive for every $x$, so it is never $0$. A mixes up $e^0$ with $0$: $e^0 = 1$. B is the asymptote talking: $e^x$ gets closer and closer to $0$ but never reaches it. D is wrong because $e^{-2} \\approx 0.14$ is still positive.',
    },
  },

  // ── 5 · the graph of ln x ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'LineChart',
    eyebrow: '5.9 · The graph of ln x',
    title: 'The Graph of y = ln x',
    inlineSvg: DIAGRAMS.LN_FEATURES,
    drawThis: true,
    caption: 'The curve $y = \\ln x$ crosses the $x$-axis at $(1, 0)$, because $\\ln 1 = 0$. It exists **only for positive** $x$: no power of $e$ is $0$ or negative. As $x → 0$, $y → −∞$, so the negative $y$-axis is an **asymptote**. As $x → +∞$ it keeps rising, slowly, without limit.',
    notes: [
      { tone: 'write', text: '$y = \\ln x$: through $(1, 0)$; exists only for $x > 0$; asymptote $x = 0$.' },
    ],
    check: {
      id: 'chk_ln_negative',
      q: 'For which values of $x$ is $\\ln x$ negative?',
      options: [
        { val: 'A', text: '$x < 0$' },
        { val: 'B', text: '$0 < x < 1$' },
        { val: 'C', text: '$x < 1$' },
        { val: 'D', text: 'It is never negative' },
      ],
      correct: 'B',
      expEn: 'The curve is below the $x$-axis between the asymptote $x = 0$ and the crossing at $x = 1$. A and C include negative $x$, where $\\ln x$ does not exist at all. D is true of $e^x$, not of $\\ln x$: $\\ln 0.5 \\approx -0.69$.',
    },
  },

  // ── 6 · mirror images, touched ──────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'FlipHorizontal2',
    eyebrow: '5.9 · Why they match',
    title: 'Mirror Images in the Line y = x',
    inlineSvg: DIAGRAMS.EXP_LN_MIRROR,
    caption: 'The natural log undoes $e$: $\\ln e^x = x$ and $e^{\\ln x} = x$. So $y = e^x$ and $y = \\ln x$ are **inverse functions**, and each graph is the reflection of the other in $y = x$. A point $(a, b)$ on one is $(b, a)$ on the other.',
    activity: {
      id: 'act_hotspot_mirror',
      type: 'hotspot',
      prompt: 'The blue curve $y = e^x$ passes through $(0, 1)$. Tap the point on the red curve $y = \\ln x$ that is its mirror image in $y = x$.',
      svg: DIAGRAMS.EXP_LN_MIRROR,
      viewBox: '0 0 560 400',
      targets: [
        { id: 'mirror', x: 300, y: 230, r: 22, name: 'the point (1, 0) on y = ln x' },
        { id: 'same', x: 250, y: 180, r: 20, name: 'the point (0, 1) itself' },
        { id: 'origin', x: 250, y: 230, r: 18, name: 'the origin' },
        { id: 'e_one', x: 386, y: 180, r: 22, name: 'the point (e, 1) on y = ln x' },
        { id: 'one_e', x: 300, y: 94, r: 22, name: 'the point (1, e) on y = eˣ' },
      ],
      correct: 'mirror',
      explain: 'Reflecting in $y = x$ swaps the two coordinates, so $(0, 1)$ becomes $(1, 0)$. Check it: $\\ln 1 = 0$. The point $(e, 1)$ is on $y = \\ln x$ too, but it is the mirror image of $(1, e)$, not of $(0, 1)$. And the asymptote $y = 0$ of one curve becomes the asymptote $x = 0$ of the other.',
    },
  },

  // ── 7 · a constant in three places: eˣ ──────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Layers',
    eyebrow: '5.9 · Families of exponential curves',
    title: 'Three Places to Put a Number',
    inlineSvg: DIAGRAMS.EXP_FAMILIES,
    caption: '**Added**, $y = e^x + k$ moves the curve up by $k$, asymptote and all. **In front**, $y = ke^x$ stretches it: the $y$-intercept becomes $k$, the asymptote stays $y = 0$, and a negative $k$ flips it below the axis. **In the power**, $y = e^{kx}$ changes the steepness, and every curve still passes through $(0, 1)$.',
    activity: {
      id: 'act_sort_families',
      type: 'sort',
      prompt: 'Sort the six curves by what the number does to $y = e^x$.',
      bins: [
        { id: 'move', name: 'Moves it up or down' },
        { id: 'stretch', name: 'Stretches it, or flips it in the $x$-axis' },
        { id: 'power', name: 'Changes the steepness; $(0, 1)$ stays' },
      ],
      cards: [
        { id: 'c1', name: '$y = e^x + 5$', bin: 'move' },
        { id: 'c2', name: '$y = e^x - 1$', bin: 'move' },
        { id: 'c3', name: '$y = 5e^x$', bin: 'stretch' },
        { id: 'c4', name: '$y = -3e^x$', bin: 'stretch' },
        { id: 'c5', name: '$y = e^{4x}$', bin: 'power' },
        { id: 'c6', name: '$y = e^{-2x}$', bin: 'power' },
      ],
      explain: 'A number added moves the whole curve, so $e^x + 5$ has asymptote $y = 5$. A number in front multiplies every height: $-3e^x$ is stretched AND flipped below the $x$-axis. A number in the power leaves $e^0 = 1$ alone, so $(0, 1)$ stays; $e^{-2x}$ has a negative in the power, which reflects the curve in the $y$-axis, not the $x$-axis.',
    },
  },

  // ── 8 · the same for ln ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Layers',
    eyebrow: '5.9 · Families of log curves',
    title: 'The Same Three Places for ln',
    inlineSvg: DIAGRAMS.LN_FAMILIES,
    caption: '**Added inside**, $y = \\ln(x + k)$ moves the curve $k$ to the **left**: its asymptote is where the inside is $0$, at $x = -k$. **In front**, $y = k\\ln x$ stretches it, and every curve still passes through $(1, 0)$. **Multiplying** $x$, $y = \\ln kx$ crosses at $x = \\tfrac{1}{k}$, and for positive $k$ it is $\\ln x$ moved up by $\\ln k$, because $\\ln kx = \\ln k + \\ln x$.',
    check: {
      id: 'chk_ln_shift',
      q: 'What is the asymptote of $y = \\ln(x + 5)$?',
      options: [
        { val: 'A', text: '$x = 5$' },
        { val: 'B', text: '$x = -5$' },
        { val: 'C', text: '$y = 5$' },
        { val: 'D', text: '$x = -4$' },
      ],
      correct: 'B',
      expEn: 'The asymptote is where the inside is $0$: $x + 5 = 0$ at $x = -5$. Adding inside the bracket moves the curve LEFT, so A has the sign the wrong way round. C is a horizontal line, but a log curve has a vertical asymptote. D is where the inside is $1$: the $x$-intercept.',
    },
  },

  // ── 9 · the six facts, and the method in order ──────────────────────────
  {
    layout: 'callout',
    accent: AMBER,
    icon: 'ListChecks',
    eyebrow: '5.10 · Sketching a transformed curve',
    title: 'Six Facts Make a Sketch',
    content: 'To sketch a curve such as $y = ke^{nx} + a$, find six facts: the value of $y$ when $x = 0$, so the point where it crosses the $y$-axis; the value of $x$ when $y = 0$, if there is one; what $y$ does as $x → +∞$ and as $x → −∞$; and so the equation of the asymptote.\n\nA sketch has **no scale**. It shows the shape, the exact crossings, and the asymptote as a dashed line labelled with its equation.',
    activity: {
      id: 'act_order_sketch',
      type: 'order',
      prompt: 'Put the moves for sketching $y = ke^{nx} + a$ in order.',
      steps: [
        { id: 's1', name: 'Put x = 0 to find where it crosses the y-axis' },
        { id: 's2', name: 'Put y = 0 and solve with ln, or find that there is no solution' },
        { id: 's3', name: 'Let the e term shrink to nothing to find the asymptote' },
        { id: 's4', name: 'Decide whether the curve rises or falls from left to right' },
        { id: 's5', name: 'Draw it through the crossings, closer and closer to the asymptote' },
      ],
      explain: 'The crossings and the asymptote are the three things a sketch must show, so they come first. Deciding the direction tells you which side the curve leaves from, and only then is it drawn.',
    },
  },

  // ── 10 · worked example: an exponential ─────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'PenLine',
    eyebrow: '5.10 · Worked example',
    title: 'Sketching an Exponential',
    content: 'Sketch $y = 4e^{2x} - 12$, showing where it crosses the axes and its asymptote.',
    steps: [
      { text: '**Crossing the $y$-axis.** Put $x = 0$: $y = 4e^0 - 12 = 4 - 12 = -8$. The point is $(0, -8)$.' },
      { text: '**Crossing the $x$-axis.** Put $y = 0$: $4e^{2x} = 12$, so $e^{2x} = 3$. Take ln of both sides: $2x = \\ln 3$, so $x = \\tfrac{1}{2}\\ln 3 \\approx 0.549$.' },
      { text: '**Asymptote.** As $x → −∞$, $e^{2x} → 0$, so $y → −12$. The asymptote is $y = -12$.' },
      { text: '**Shape.** As $x → +∞$, $y → +∞$. The curve rises, from just above $y = -12$ on the left.' },
    ],
    notes: [
      { tone: 'write', text: 'Leave a crossing exact, such as $\\tfrac{1}{2}\\ln 3$. Give the decimal too only if it is asked for.' },
    ],
    check: {
      id: 'chk_exp_xint',
      q: 'Where does $y = 5e^x - 10$ cross the $x$-axis?',
      options: [
        { val: 'A', text: '$x = \\ln 10$' },
        { val: 'B', text: '$x = 2$' },
        { val: 'C', text: '$x = \\ln 2$' },
        { val: 'D', text: 'It does not cross the $x$-axis' },
      ],
      correct: 'C',
      expEn: '$5e^x = 10$, so $e^x = 2$ and $x = \\ln 2$. A forgets to divide by $5$ before taking ln; B stops at $e^x = 2$ and forgets that $x$ is the POWER; D would need $e^x$ to be negative, but here it equals $2$.',
    },
  },

  // ── 11 · the finished sketch ────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Spline',
    eyebrow: '5.10 · The finished sketch',
    title: 'What a Sketch Shows',
    inlineSvg: DIAGRAMS.SKETCH_EXP,
    drawThis: true,
    caption: 'Mark both crossings with their exact values. Draw the asymptote as a dashed line and label it with its equation. Then draw the curve through the crossings: on the left it gets closer and closer to $y = -12$ without touching it, and on the right it climbs steeply.',
    check: {
      id: 'chk_exp_asym',
      q: 'What is the asymptote of $y = 3e^{-x} + 4$?',
      options: [
        { val: 'A', text: '$y = 4$' },
        { val: 'B', text: '$y = 7$' },
        { val: 'C', text: '$y = 0$' },
        { val: 'D', text: '$y = 3$' },
      ],
      correct: 'A',
      expEn: 'This time the power is negative, so the $e$ term shrinks to nothing as $x → +∞$, and what is left is $4$. B is the $y$-intercept, $3 + 4$; C is the asymptote of $e^x$ itself, before the $+4$ moved it; D is the number in front, which only stretches the curve.',
    },
  },

  // ── 12 · the trap: not every curve reaches the x-axis ───────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The trap',
    title: 'Not Every Curve Reaches the x-Axis',
    inlineSvg: DIAGRAMS.CROSS_OR_NOT,
    caption: 'Put $y = 0$ in $y = e^x + 3$ and you get $e^x = -3$. A power of $e$ is **always positive**, so there is no solution: the curve never reaches the $x$-axis. The curve crosses only when the $x$-axis is on the same side of the asymptote as the curve.',
    activity: {
      id: 'act_sort_cross',
      type: 'sort',
      prompt: 'Sort the six curves: does each one cross the $x$-axis?',
      bins: [
        { id: 'cross', name: 'Crosses the $x$-axis' },
        { id: 'never', name: 'Never reaches it' },
      ],
      cards: [
        { id: 'k1', name: '$y = 2e^x - 7$', bin: 'cross' },
        { id: 'k2', name: '$y = 2e^x + 7$', bin: 'never' },
        { id: 'k3', name: '$y = -e^x + 4$', bin: 'cross' },
        { id: 'k4', name: '$y = -3e^x - 1$', bin: 'never' },
        { id: 'k5', name: '$y = 5e^{-x} - 1$', bin: 'cross' },
        { id: 'k6', name: '$y = 4e^{2x} + 3$', bin: 'never' },
      ],
      explain: 'Put $y = 0$ and look at the sign: $e^x = \\tfrac{7}{2}$ has a solution, $e^x = -\\tfrac{7}{2}$ has none. The trap is $-e^x + 4$: it crosses the $y$-axis ABOVE the $x$-axis, at $3$, but it lives below its asymptote $y = 4$ and falls, so it does cross, at $x = \\ln 4$. And $-3e^x - 1$ gives $e^x = -\\tfrac{1}{3}$: never.',
    },
  },

  // ── 13 · which way does it go? ──────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'FlipHorizontal2',
    eyebrow: '5.10 · Which way does it go?',
    title: 'A Negative Number in Front, or in the Power',
    content: 'A negative number **in front** puts the curve below its asymptote. A negative number **in the power** makes the $e$ term shrink as $x$ grows. Look at both before you draw.',
    steps: [
      { text: '$y = 4e^x + 1$: the power grows and the number in front is positive, so the curve **rises**, above $y = 1$.' },
      { text: '$y = 4e^{-x} + 1$: the power shrinks, so the curve **falls** towards $y = 1$.' },
      { text: '$y = -4e^x + 1$: the number in front turns it over, so it **falls**, below $y = 1$.' },
      { text: '$y = -4e^{-x} + 1$: two negatives, so it **rises**, from below, up towards $y = 1$.' },
    ],
    notes: [
      { tone: 'plant', text: 'It rises when the number in front and the number in the power have the **same** sign, and falls when their signs are different.' },
    ],
    check: {
      id: 'chk_exp_shape',
      q: 'Which describes $y = -2e^{3x} + 6$, from left to right?',
      options: [
        { val: 'A', text: 'It rises, above $y = 6$' },
        { val: 'B', text: 'It falls, above $y = 6$' },
        { val: 'C', text: 'It rises, below $y = 6$' },
        { val: 'D', text: 'It falls, below $y = 6$' },
      ],
      correct: 'D',
      expEn: 'The $-2$ in front makes the $e$ term negative, so the curve is below $y = 6$; the power $3x$ grows, and the $-2$ turns that growth into a fall. A ignores the minus sign completely; B and C take only one of the two facts into account.',
    },
  },

  // ── 14 · where a log curve lives: predict ───────────────────────────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'Target',
    eyebrow: '5.10 · Sketching a log curve',
    title: 'Where a Log Curve Lives',
    label: 'Decide first',
    labelIcon: 'Hourglass',
    text: 'A log exists only where its inside is positive. The edge of that region, where the inside is $0$, is a vertical asymptote.',
    sub: 'And a log is $0$ exactly when its inside is $1$, because $\\ln 1 = 0$.',
    activity: {
      id: 'act_predict_lnx',
      type: 'predict',
      prompt: 'Where does $y = \\ln(x - 3)$ cross the $x$-axis?',
      options: [
        { val: 'three', name: 'At $x = 3$' },
        { val: 'four', name: 'At $x = 4$' },
        { val: 'minus', name: 'At $x = -3$' },
        { val: 'none', name: 'It never crosses the $x$-axis' },
      ],
      correct: 'four',
      explain: 'It crosses where $\\ln(x - 3) = 0$, which is where the inside is $1$: $x - 3 = 1$, so $x = 4$. At $x = 3$ the inside is $0$, and $\\ln 0$ does not exist: $x = 3$ is the asymptote. A log curve of this kind always crosses the $x$-axis, because a log can be any number at all.',
    },
  },

  // ── 15 · worked example: a log curve ────────────────────────────────────
  {
    layout: 'steps',
    accent: RED,
    icon: 'PenLine',
    eyebrow: '5.10 · Worked example',
    title: 'Sketching a Log Curve',
    content: 'Sketch $y = 2\\ln(2x + 4)$, showing where it crosses the axes and its asymptote.',
    steps: [
      { text: '**Where it lives.** The inside must be positive: $2x + 4 > 0$, so $x > -2$.' },
      { text: '**Asymptote.** The edge of that region is the line $x = -2$. The curve lives to its right.' },
      { text: '**Crossing the $y$-axis.** Put $x = 0$: $y = 2\\ln 4 \\approx 2.77$.' },
      { text: '**Crossing the $x$-axis.** Put $y = 0$: $\\ln(2x + 4) = 0$, so $2x + 4 = 1$ and $x = -\\tfrac{3}{2}$.' },
      { text: '**Shape.** The inside grows as $x$ grows, and the $2$ in front is positive, so the curve rises.' },
    ],
    notes: [
      { tone: 'write', text: 'For a log curve: the inside $> 0$ gives where it lives; the inside $= 0$ gives the asymptote; the inside $= 1$ gives the $x$-intercept.' },
    ],
  },

  // ── 16 · the finished log sketch ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Spline',
    eyebrow: '5.10 · The finished sketch',
    title: 'The Finished Log Sketch',
    inlineSvg: DIAGRAMS.SKETCH_LN,
    drawThis: true,
    caption: 'Beside the asymptote the curve dives down, closer and closer to $x = -2$. The $y$-intercept is left exact, as $2\\ln 4$. The curve reaches the $y$-axis only because its inside, $2x + 4$, is positive at $x = 0$.',
    check: {
      id: 'chk_ln_yaxis',
      q: 'Does $y = \\ln(3x - 6)$ cross the $y$-axis?',
      options: [
        { val: 'A', text: 'Yes, at $(0, \\ln 6)$' },
        { val: 'B', text: 'Yes, at $(0, -\\ln 6)$' },
        { val: 'C', text: 'No: at $x = 0$ the inside is $-6$, which has no ln' },
        { val: 'D', text: 'Yes, at $(0, 2)$' },
      ],
      correct: 'C',
      expEn: 'The curve lives where $3x - 6 > 0$, which is $x > 2$, so it never gets as far left as the $y$-axis. A drops the minus sign of the $-6$; B treats $\\ln(-6)$ as $-\\ln 6$, but the ln of a negative number does not exist; D confuses the $y$-axis with the asymptote $x = 2$.',
    },
  },

  // ── 17 · positive to the left ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: AMBER,
    icon: 'ArrowLeftRight',
    eyebrow: '5.10 · A reflected inside',
    title: 'Only Positive to the Left',
    content: 'When the $x$ inside the log has a negative number in front of it, the inside is positive to the **left**.\n\n$$8 - 2x > 0 \\quad\\Rightarrow\\quad 8 > 2x \\quad\\Rightarrow\\quad x < 4$$\n\nSo $y = \\ln(8 - 2x)$ lives to the LEFT of its asymptote $x = 4$. As $x$ grows, the inside shrinks, so the curve **falls**, and it dives down beside $x = 4$.',
    check: {
      id: 'chk_ln_left',
      q: 'For which values of $x$ does $y = \\ln(10 - 5x)$ exist?',
      options: [
        { val: 'A', text: '$x > 2$' },
        { val: 'B', text: '$x > -2$' },
        { val: 'C', text: '$x < 10$' },
        { val: 'D', text: '$x < 2$' },
      ],
      correct: 'D',
      expEn: '$10 - 5x > 0$ means $10 > 5x$, so $x < 2$. A has the inequality the wrong way round; B has the sign of the $2$ wrong; C forgets to divide by the $5$.',
    },
  },

  // ── 18 · three steps to an inverse ──────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'ArrowLeftRight',
    eyebrow: '5.11 · Inverses',
    title: 'Three Steps to an Inverse',
    content: 'Find the inverse of $f(x) = 3e^{2x} + 5$, defined for every real $x$, and state its domain.',
    steps: [
      { text: '**Write it as $y = …$** $\\ y = 3e^{2x} + 5$.' },
      { text: '**Swap $x$ and $y$.** $\\ x = 3e^{2y} + 5$.' },
      { text: '**Make $y$ the subject**, undoing the last thing first. Subtract $5$: $x - 5 = 3e^{2y}$. Divide by $3$: $\\dfrac{x - 5}{3} = e^{2y}$.' },
      { text: 'Take ln of both sides: $\\ln\\left(\\dfrac{x - 5}{3}\\right) = 2y$. Divide by $2$: $y = \\tfrac{1}{2}\\ln\\left(\\dfrac{x - 5}{3}\\right)$.' },
      { text: '**Domain.** $3e^{2x}$ is always positive, so $f(x) > 5$. The range of $f$ is the domain of the inverse: $x > 5$.' },
    ],
    notes: [
      { tone: 'write', text: '$f^{-1}(x) = \\tfrac{1}{2}\\ln\\left(\\dfrac{x - 5}{3}\\right)$ for $x > 5$.' },
    ],
  },

  // ── 19 · the moves in order ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'ListChecks',
    eyebrow: '5.11 · The method, drilled',
    title: 'Undo It Last Thing First',
    content: 'To work out $f(x) = 5e^{-x} - 2$, you take $x$, change its sign, raise $e$ to that power, multiply by $5$, and subtract $2$. The inverse undoes those in the **reverse** order.',
    activity: {
      id: 'act_order_inverse',
      type: 'order',
      prompt: 'Put the moves for finding the inverse of $f(x) = 5e^{-x} - 2$ in order.',
      steps: [
        { id: 'v1', name: 'Swap x and y' },
        { id: 'v2', name: 'Add 2 to both sides' },
        { id: 'v3', name: 'Divide both sides by 5' },
        { id: 'v4', name: 'Take ln of both sides' },
        { id: 'v5', name: 'Change the sign of both sides' },
      ],
      explain: 'Swap first: $x = 5e^{-y} - 2$. The last thing $f$ did was subtract $2$, so add $2$; then divide by $5$ to get $e^{-y}$ on its own; then take ln to bring the power down: $\\ln\\left(\\dfrac{x + 2}{5}\\right) = -y$. Last, change the sign: $f^{-1}(x) = -\\ln\\left(\\dfrac{x + 2}{5}\\right)$, for $x > -2$.',
    },
  },

  // ── 20 · the domain of the inverse ──────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'FlipHorizontal2',
    eyebrow: '5.11 · The domain of the inverse',
    title: 'What f Puts Out, the Inverse Takes In',
    inlineSvg: DIAGRAMS.INVERSE_REFLECT,
    caption: 'The graph of the inverse is the reflection of the graph of $f$ in $y = x$. So the **domain of the inverse is the range of $f$**. For $f(x) = e^x + 2$ the range is $f(x) > 2$, everything above the asymptote $y = 2$, so the inverse, $\\ln(x - 2)$, is defined for $x > 2$. The asymptote $y = 2$ becomes the asymptote $x = 2$.',
    check: {
      id: 'chk_inverse_domain',
      q: 'What is the domain of the inverse of $f(x) = 4 - 2e^x$?',
      options: [
        { val: 'A', text: '$x > 4$' },
        { val: 'B', text: 'Every real $x$' },
        { val: 'C', text: '$x < 4$' },
        { val: 'D', text: '$x > 0$' },
      ],
      correct: 'C',
      expEn: '$2e^x$ is always positive, and it is SUBTRACTED from $4$, so $f(x) < 4$. That range is the domain of the inverse: $x < 4$. A is the right number the wrong way round; B is the domain of $f$ itself; D is the domain of $\\ln x$, before anything was done to it.',
    },
  },

  // ── 21 · the inverse of a log function ──────────────────────────────────
  {
    layout: 'steps',
    accent: RED,
    icon: 'PenLine',
    eyebrow: '5.11 · The inverse of a log function',
    title: 'Powers of e Undo ln',
    content: 'Find the inverse of $g(x) = 3\\ln(2x - 1)$, for $x > \\tfrac{1}{2}$.',
    steps: [
      { text: 'Swap $x$ and $y$: $x = 3\\ln(2y - 1)$.' },
      { text: 'Divide by $3$ to get the ln on its own: $\\dfrac{x}{3} = \\ln(2y - 1)$.' },
      { text: 'Write both sides as powers of $e$: $e^{\\frac{x}{3}} = 2y - 1$.' },
      { text: 'Add $1$, then divide by $2$: $y = \\dfrac{e^{\\frac{x}{3}} + 1}{2}$.' },
      { text: 'A log curve takes every height, so the range of $g$ is every real number, and the inverse is defined for **every real** $x$.' },
    ],
    check: {
      id: 'chk_ln_inverse',
      q: 'What is the inverse of $f(x) = \\ln(x + 7)$, for $x > -7$?',
      options: [
        { val: 'A', text: '$e^x - 7$' },
        { val: 'B', text: '$e^x + 7$' },
        { val: 'C', text: '$\\dfrac{1}{\\ln(x + 7)}$' },
        { val: 'D', text: '$\\ln(x - 7)$' },
      ],
      correct: 'A',
      expEn: 'Swap: $x = \\ln(y + 7)$. Powers of $e$: $e^x = y + 7$, so $y = e^x - 7$. B adds the $7$ instead of taking it away; C is the reciprocal, not the inverse; D changes a sign but never undoes the ln.',
    },
  },

  // ── 22 · composites of e and ln ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Combine',
    eyebrow: '5.11 · Composites and equations',
    title: 'e and ln Undo Each Other',
    content: 'Because $e^x$ and $\\ln x$ are inverse functions, $e^{\\ln x} = x$ for $x > 0$, and $\\ln e^x = x$ for every $x$. That makes composites short. With $f(x) = e^x$ and $g(x) = \\ln 2x$:\n\n$$fg(x) = e^{\\ln 2x} = 2x \\qquad gf(x) = \\ln\\left(2e^x\\right) = \\ln 2 + x$$\n\nAn equation that links one function with the inverse of another turns into a log equation or an exponential equation, and you solve it with the methods of this chapter.',
    check: {
      id: 'chk_composite',
      q: 'With $f(x) = e^{3x}$ and $g(x) = \\ln x$ for $x > 0$, what is $fg(x)$?',
      options: [
        { val: 'A', text: '$3x$' },
        { val: 'B', text: '$x^3$' },
        { val: 'C', text: '$3\\ln x$' },
        { val: 'D', text: '$e^3 x$' },
      ],
      correct: 'B',
      expEn: '$fg(x) = f(\\ln x) = e^{3\\ln x} = e^{\\ln x^3} = x^3$, using the power law. A is $gf(x) = \\ln e^{3x} = 3x$, with the functions the wrong way round; C forgets the $e$; D splits the power as if $e^{3\\ln x}$ were $e^3 \\times e^{\\ln x}$.',
    },
  },

  // ── 23 · recap ──────────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: VIOLET,
    icon: 'ListChecks',
    variant: 'checklist',
    columns: 2,
    eyebrow: 'Tick each one only if you could do it right now, unaided',
    title: 'What You Should Be Able to Do',
    items: [
      { text: 'Describe the graph of $y = e^x$: through $(0, 1)$, always positive, asymptote $y = 0$.' },
      { text: 'Describe the graph of $y = \\ln x$: through $(1, 0)$, only for $x > 0$, asymptote $x = 0$.' },
      { text: 'Say what a number added, in front, or inside does to either curve.' },
      { text: 'Find where $y = ke^{nx} + a$ crosses each axis, exactly, or show that it never reaches the $x$-axis.' },
      { text: 'Give the asymptote of $y = ke^{nx} + a$, and say which side of it the curve is on.' },
      { text: 'Find where $y = k\\ln(ax + b)$ lives, its vertical asymptote, and its crossings.' },
      { text: 'Decide whether a curve rises or falls from the signs of its numbers.' },
      { text: 'Find an inverse in three steps: write as $y = …$, swap, rearrange.' },
      { text: 'State the domain of an inverse: it is the range of the function.' },
      { text: 'Simplify composites of $e^x$ and $\\ln x$, and solve equations that link a function with an inverse.' },
    ],
    check: {
      id: 'chk_recap_all',
      q: 'Which is the inverse of $f(x) = e^x - 4$, with its domain?',
      options: [
        { val: 'A', text: '$\\ln(x - 4)$, for $x > 4$' },
        { val: 'B', text: '$\\ln(x + 4)$, for every real $x$' },
        { val: 'C', text: '$e^x + 4$, for $x > -4$' },
        { val: 'D', text: '$\\ln(x + 4)$, for $x > -4$' },
      ],
      correct: 'D',
      expEn: 'Swap: $x = e^y - 4$, so $e^y = x + 4$ and $y = \\ln(x + 4)$. The range of $f$ is $f(x) > -4$, so that is the domain of the inverse. A has the sign wrong; B forgets that a ln needs a positive inside; C undoes the $-4$ but never undoes the $e$.',
    },
  },
];
