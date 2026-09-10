// src/data/ADD_MATH/AM_4A/notes.js
// AM_4A — Modulus Equations and Modulus Inequalities.
// Cambridge IGCSE Additional Mathematics 0606, sections 4.1 and 4.2.
//
// Rewritten 2026-09-10 for a student alone with a screen: shorter slides,
// one idea each, and the student DOES something on eight of them before the
// deck tells them the answer. Eighteen scored items — ten checks and eight
// activities — carry the NOTES score.
//
// THE SPINE:
//   1–5    what the bars MEAN, the three facts and the trap (sorted by the
//          student, not read), and the rule the section rests on:
//          |p| = |q| ⇔ p² = q².
//   6      the picture: a modulus graph is a V with its corner where the
//          inside is zero — clicked, not told.
//   7–13   section 4.1, equations: split or square, one crossing or two
//          (predicted before it is shown), the method put in order, and the
//          slide the marks live on: substitute back.
//   14–17  the other 4.1 shapes: modulus = number (solved by clicking), a sum
//          of moduli, and a quadratic in |x|.
//   18–25  section 4.2, inequalities: the two rules and the two answer
//          SHAPES (shaded on a number line by the student), squaring a
//          modulus against a modulus, finishing on a parabola, and the trap of
//          squaring against something that may be negative.
//   26–27  the method chooser (a sort), and the recap.
//
// House notes:
//  · ENGLISH ONLY — ADD_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` is legal ONLY in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, gallery
//    text, check and activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide; the audio
//    generator narrates everything before it and stops there.
//  · Activity schemas: docs/add-math/notes-and-activities.md. Card and option
//    fields are `name`/`explain`, never `text`, so they are not narrated.
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
    color: '#0e7490',
    icon: 'Sigma',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 4 · Equations, inequalities and graphs',
    title: 'Modulus Equations and Inequalities',
    objective: 'I can solve equations and inequalities containing modulus signs, by algebra and by reading a graph, and I know which method each shape needs.',
  },

  // ── 2 · the definition ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    ratio: 52,
    eyebrow: 'The definition, in two lines',
    title: 'What the Bars Mean',
    inlineSvg: DIAGRAMS.MODULUS_DEF,
    content: 'The **modulus** of $x$, written $|x|$, is its **distance from zero**. A distance has no direction, so it is never negative.\n\n$$|x| = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0\\end{cases}$$\n\nThe second line looks wrong until you try it: if $x = -7$ then $-x = 7$, and $7$ is the distance from zero.',
    notes: [
      {
        tone: 'write',
        text: 'Read $|x|$ as **"mod x"**. Work out the inside first, then drop the sign.',
      },
    ],
    check: {
      id: 'chk_mod_value',
      q: 'What is the value of $|4 - 9|$?',
      options: [
        { val: 'A', text: '$-5$' },
        { val: 'B', text: '$5$' },
        { val: 'C', text: '$13$' },
        { val: 'D', text: '$-13$' },
      ],
      correct: 'B',
      expEn: 'Inside first: $4 - 9 = -5$. The bars then give the distance from zero, which is $5$. A forgets the bars; C has added $|4|$ and $|-9|$, which is a different — and wrong — thing.',
    },
  },

  // ── 3 · the facts and the trap, sorted ──────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Before you read the answer, decide for yourself',
    title: 'Three Facts and One Trap',
    label: 'Try it',
    labelIcon: 'Hourglass',
    text: 'Which of these are true for **every** number?',
    sub: 'Test each one with a negative number before you place it — try $a = 3$ and $b = -3$, or $x = -2$. Then sort.',
    activity: {
      id: 'act_sort_facts',
      type: 'sort',
      prompt: 'Sort the seven statements. "Always" means true for every real number; "not always" means you can find a number that breaks it.',
      bins: [
        { id: 'always', name: 'Always true' },
        { id: 'not', name: 'Not always true' },
      ],
      cards: [
        { id: 'c1', name: '$|x| \\geq 0$', bin: 'always' },
        { id: 'c2', name: '$|x|^2 = x^2$', bin: 'always' },
        { id: 'c3', name: '$|-x| = |x|$', bin: 'always' },
        { id: 'c4', name: '$|ab| = |a| \\times |b|$', bin: 'always' },
        { id: 'c5', name: '$|a + b| = |a| + |b|$', bin: 'not' },
        { id: 'c6', name: '$|x| = x$', bin: 'not' },
        { id: 'c7', name: '$|x - 3| = |x| - 3$', bin: 'not' },
      ],
      explain: 'The bars survive multiplying but not adding. $|3 + (-3)| = 0$ while $|3| + |-3| = 6$; $|x| = x$ only when $x \\geq 0$; and $|x - 3|$ is a distance from $3$, not $|x|$ with $3$ taken off. The four that are always true are the whole toolkit for this chapter.',
    },
  },

  // ── 4 · the rule ────────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Equal',
    eyebrow: 'Section 4.1 · the rule the whole section rests on',
    title: 'Equal Moduli Means Equal Squares',
    label: 'Learn this',
    labelIcon: 'Star',
    text: '$|p| = |q| \\iff p^2 = q^2$',
    sub: 'Squaring throws away the sign — which is exactly what the bars were throwing away. Both statements carry the same information, and the squared one has no bars left.',
  },

  // ── 5 · why ─────────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'GitCompare',
    eyebrow: 'Where the rule comes from',
    title: 'Why Squaring Is Allowed',
    inlineSvg: DIAGRAMS.EQUIV_BOX,
    caption: '$p^2 - q^2 = (|p| - |q|)(|p| + |q|)$. The second bracket is never negative, so the sign of $p^2 - q^2$ is decided by $|p| - |q|$ alone. Bigger modulus, bigger square — every time. That is why $<$ and $>$ survive squaring too.',
    check: {
      id: 'chk_why_square',
      q: 'In the derivation, why does it matter that $|p| + |q|$ is never negative?',
      options: [
        { val: 'A', text: 'It makes $p^2 - q^2$ equal to zero' },
        { val: 'B', text: 'Multiplying by it cannot flip the direction of the comparison' },
        { val: 'C', text: 'It proves $p = q$' },
        { val: 'D', text: 'It lets you cancel the brackets' },
      ],
      correct: 'B',
      expEn: 'Multiplying by a positive quantity leaves an inequality alone; multiplying by a negative one reverses it. Because $|p| + |q|$ is never negative, $|p| - |q|$ and $p^2 - q^2$ always have the same sign.',
    },
  },

  // ── 6 · the picture, clicked ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'LineChart',
    eyebrow: 'The picture behind every question in this chapter',
    title: 'A Modulus Graph Is a V',
    content: 'The graph of $y = |x - 5|$ is the line $y = x - 5$ with everything below the axis **folded upwards**. The fold is the corner, and the corner sits where the **inside is zero** — solve $x - 5 = 0$, do not read the sign off the page.\n\nEvery equation in this chapter is a question about where a V meets something: a line, another V, or a level.',
    notes: [
      { tone: 'homework', text: 'The vertex of $y = |x + 2|$ is at $x = -2$, not $+2$. This sign is the single most expensive slip in the chapter.' },
    ],
    activity: {
      id: 'act_plot_vertex',
      type: 'plot',
      prompt: 'Click the vertex of this graph. The corner is where the inside of the bars is zero.',
      equation: 'y = |x - 5|',
      curve: { kind: 'modulus', a: 1, h: 5, k: 0 },
      grid: { xMin: -3, xMax: 9, yMin: -2, yMax: 6 },
      step: { kind: 'vertex' },
      explain: 'The inside, $x - 5$, is zero at $x = 5$, so the corner is at $(5, 0)$. The arms rise at gradient $1$ on the right and $-1$ on the left.',
    },
  },

  // ── 7 · WE1 method 1 ────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Split',
    eyebrow: 'Worked example 1 · Method 1',
    title: 'Splitting Into Two Cases',
    content: 'Solve $|x - 5| = |x + 1|$.\n\nIf two things have the same modulus they are either **equal** or **exact opposites**. That is two ordinary equations — solve both.',
    steps: [
      { text: 'Write the two cases. The second one negates **one** side only — negating both would just give the first case back.\n$x - 5 = x + 1$ or $x - 5 = -(x + 1)$' },
      { text: 'First case: subtract $x$ from both sides.\n$-5 = 1$, which is false. This case gives nothing.' },
      { text: 'Second case: remove the bracket, flipping both signs inside it.\n$x - 5 = -x - 1$, so $2x = 4$ and $x = 2$.' },
      { text: 'CHECK by substituting back: $|2 - 5| = 3$ and $|2 + 1| = 3$. They agree, so $x = 2$ is genuine.' },
    ],
    check: {
      id: 'chk_split_cases',
      q: 'Which pair of equations correctly splits $|3x - 2| = |x + 4|$?',
      options: [
        { val: 'A', text: '$3x - 2 = x + 4$ or $3x - 2 = -(x + 4)$' },
        { val: 'B', text: '$3x - 2 = x + 4$ or $-(3x - 2) = -(x + 4)$' },
        { val: 'C', text: '$3x - 2 = x + 4$ only' },
        { val: 'D', text: '$3x = x$ or $-2 = 4$' },
      ],
      correct: 'A',
      expEn: 'Equal moduli means equal or opposite, so exactly one side is negated. B negates both sides, which cancels out and repeats the first equation. C throws away half the solutions.',
    },
  },

  // ── 8 · WE1 method 2 ────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Superscript',
    eyebrow: 'Worked example 1 · Method 2',
    title: 'Squaring Both Sides',
    content: 'The same equation, $|x - 5| = |x + 1|$, using $|p| = |q| \\iff p^2 = q^2$. Both sets of bars disappear in one move.',
    steps: [
      { text: 'Square both sides. The bars go, and there is nothing to case-split.\n$(x - 5)^2 = (x + 1)^2$' },
      { text: 'Expand each side in full — do not cancel the squares yet.\n$x^2 - 10x + 25 = x^2 + 2x + 1$' },
      { text: 'Now the $x^2$ terms cancel, which is what keeps this equation linear.\n$-10x + 25 = 2x + 1$' },
      { text: 'Collect and finish.\n$24 = 12x$, so $x = 2$ — the same single answer.' },
    ],
  },

  // ── 9 · one crossing, then a prediction ─────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'LineChart',
    eyebrow: 'The same answer, read off a picture',
    title: 'One Crossing, One Solution',
    inlineSvg: DIAGRAMS.WE1_GRAPH,
    drawThis: true,
    caption: 'Draw $y = |x - 5|$ and $y = |x + 1|$ on one grid. The solution is the $x$-coordinate where the graphs cross — exactly one crossing, at $x = 2$. The arms that never met are **parallel**, which is why the first case collapsed.',
    activity: {
      id: 'act_predict_crossings',
      type: 'predict',
      prompt: 'Next comes $|2x + 1| = |x - 3|$. Before you see it worked: how many solutions will it have? Think about the gradients of the two V shapes.',
      options: [
        { val: 'one', name: 'One — like the example above' },
        { val: 'two', name: 'Two' },
        { val: 'none', name: 'None' },
        { val: 'four', name: 'Four — two from each case' },
      ],
      correct: 'two',
      explain: 'The arms of $y = |2x + 1|$ have gradient $\\pm 2$ and those of $y = |x - 3|$ have gradient $\\pm 1$. No pair of arms is parallel, so every pair meets: two crossings, two solutions.',
    },
  },

  // ── 10 · WE2 ────────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Sigma',
    eyebrow: 'Worked example 2 · both methods on a harder one',
    title: 'When There Are Two Answers',
    content: 'Solve $|2x + 1| = |x - 3|$. The gradients differ, so expect **two** solutions — and a quadratic if you square.',
    steps: [
      { text: 'Method 1, case one: $2x + 1 = x - 3$, so $x = -4$.' },
      { text: 'Method 1, case two: $2x + 1 = -(x - 3) = -x + 3$, so $3x = 2$ and $x = \\tfrac{2}{3}$.' },
      { text: 'Method 2 instead: square both sides.\n$(2x + 1)^2 = (x - 3)^2$, so $4x^2 + 4x + 1 = x^2 - 6x + 9$.' },
      { text: 'Collect on one side — this time the $x^2$ terms do **not** cancel.\n$3x^2 + 10x - 8 = 0$' },
      { text: 'Factorise and solve.\n$(3x - 2)(x + 4) = 0$, so $x = \\tfrac{2}{3}$ or $x = -4$ — the same pair.' },
    ],
    reveal: {
      label: 'Check both, the way the mark scheme does',
      prompt: 'Substitute each answer back into the original equation.',
      answer: 'At $x = -4$: $|2(-4) + 1| = 7$ and $|-4 - 3| = 7$. At $x = \\tfrac{2}{3}$: $|\\tfrac{4}{3} + 1| = \\tfrac{7}{3}$ and $|\\tfrac{2}{3} - 3| = \\tfrac{7}{3}$. Both hold, so both are genuine.',
    },
  },

  // ── 11 · two crossings ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'LineChart',
    eyebrow: 'The picture behind worked example 2',
    title: 'Two Crossings, Two Solutions',
    inlineSvg: DIAGRAMS.WE2_GRAPH,
    caption: 'One answer, $x = -4$, can be read straight off the grid. The other, $x = \\tfrac{2}{3}$, sits between the lines and could never be read accurately — which is the honest reason the algebra is worth doing even when a graph is available.',
  },

  // ── 12 · the two methods, and the squaring method in order ──────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'GitCompare',
    eyebrow: 'Choose whichever you trust — both earn full marks',
    title: 'The Two Methods Side by Side',
    inlineSvg: DIAGRAMS.TWO_METHODS,
    caption: 'Splitting is faster and stays linear, but it is easy to drop a case or a sign. Squaring cannot lose a case — but it only works when a modulus sits on **each** side of the equals sign.',
    activity: {
      id: 'act_order_square',
      type: 'order',
      prompt: 'Put the squaring method in the order you would write it.',
      steps: [
        { id: 's1', name: 'Square both sides — the bars disappear' },
        { id: 's2', name: 'Expand each side in full' },
        { id: 's3', name: 'Collect everything on one side, equal to zero' },
        { id: 's4', name: 'Factorise (or the x² terms cancel and it is linear)' },
        { id: 's5', name: 'Solve for x' },
        { id: 's6', name: 'Substitute each answer back into the ORIGINAL equation' },
      ],
      explain: 'Square, expand, collect, factorise, solve — and the check comes last, in the original equation, not in the squared one. The squared equation is the one that cannot tell a real answer from a fake.',
    },
  },

  // ── 13 · always substitute back ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'ShieldAlert',
    eyebrow: 'Where the marks go',
    title: 'Always Substitute Back',
    content: 'Squaring can invent a solution out of nothing, because it forgets which side was negative.\n\n$$|x| = 2x - 3 \\;\\Rightarrow\\; x^2 = 4x^2 - 12x + 9 \\;\\Rightarrow\\; 3x^2 - 12x + 9 = 0 \\;\\Rightarrow\\; x = 1 \\text{ or } x = 3$$\n\nTest them. At $x = 3$: $|3| = 3$ and $2(3) - 3 = 3$ — real. At $x = 1$: $|1| = 1$ but $2(1) - 3 = -1$, and a modulus is never negative — so $x = 1$ is **not** a solution, even though the algebra produced it.',
    notes: [
      { tone: 'homework', text: 'Write the check as a line of its own, the way the coursebook does. It is the difference between two marks and none.' },
    ],
    check: {
      id: 'chk_extraneous',
      q: 'Squaring produced $x = 1$ and $x = 3$ for $|x| = 2x - 3$, but only $x = 3$ works. What went wrong with $x = 1$?',
      options: [
        { val: 'A', text: 'The factorising was wrong' },
        { val: 'B', text: 'Squaring lost the fact that the right-hand side must not be negative' },
        { val: 'C', text: '$x = 1$ makes the left side negative' },
        { val: 'D', text: 'A modulus equation can only ever have one answer' },
      ],
      correct: 'B',
      expEn: 'At $x = 1$ the right-hand side is $-1$, and a modulus can never equal a negative number. Squaring erased that requirement. C is impossible — the left side is a modulus, so it is never negative.',
    },
  },

  // ── 14 · modulus = number, clicked ──────────────────────────────────────
  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Crosshair',
    eyebrow: 'The simplest shape of all',
    title: 'Modulus Equals a Number',
    content: '$|x - 2| = 3$ asks: which numbers are a distance $3$ from $2$? There are two, one on each side — $x = 5$ and $x = -1$.\n\nOn the graph it is where the V meets the horizontal line $y = 3$. Algebra: $x - 2 = 3$ or $x - 2 = -3$.\n\nIf the number is **negative**, $|x - 2| = -3$, there is nothing to do: the line sits below the V and never touches it.',
    activity: {
      id: 'act_plot_meets',
      type: 'plot',
      prompt: 'Solve $|x - 2| = 3$ by picture: click every point where the V meets the line.',
      equation: 'y = |x - 2|',
      curve: { kind: 'modulus', a: 1, h: 2, k: 0 },
      grid: { xMin: -4, xMax: 8, yMin: -2, yMax: 6 },
      step: { kind: 'meets', at: 3 },
      explain: 'The crossings are $(-1, 3)$ and $(5, 3)$, so $x = -1$ or $x = 5$ — the two numbers a distance $3$ from $2$. The vertex $(2, 0)$ is the midpoint of the two answers, always.',
    },
  },

  // ── 15 · WE3 sum of moduli ──────────────────────────────────────────────
  {
    layout: 'steps',
    accent: AMBER,
    icon: 'Layers',
    eyebrow: 'Worked example 3 · a shape you cannot square',
    title: 'A Sum of Two Moduli',
    content: 'Solve $|x + 4| + |x - 5| = 11$.\n\nThere is no rule for squaring a **sum** of moduli. Isolate one modulus and split, then split again.',
    steps: [
      { text: 'Move one modulus across.\n$|x + 4| = 11 - |x - 5|$' },
      { text: 'Split on that modulus: $x + 4 = 11 - |x - 5|$, or $x + 4 = |x - 5| - 11$.' },
      { text: 'First branch: $|x - 5| = 7 - x$. Split again — $x - 5 = 7 - x$ gives $x = 6$; $x - 5 = -(7 - x)$ gives $0 = -2$, false.' },
      { text: 'Second branch: $|x - 5| = x + 15$. Split again — $x - 5 = x + 15$ is false; $x - 5 = -(x + 15)$ gives $x = -5$.' },
      { text: 'CHECK both. $|10| + |1| = 11$ and $|-1| + |-10| = 11$. So $x = 6$ or $x = -5$.' },
    ],
  },

  // ── 16 · regions ────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Milestone',
    eyebrow: 'The same problem, cut into regions',
    title: 'Critical Values Cut the Line',
    inlineSvg: DIAGRAMS.SUM_REGIONS,
    caption: 'The method worth knowing for harder sums. $|x + 4|$ changes rule at $x = -4$ and $|x - 5|$ at $x = 5$, so the line falls into three regions. Solve with the bars removed in each region, and keep only the answers that land inside the region that produced them.',
    check: {
      id: 'chk_critical_values',
      q: 'At which values of $x$ does $|2x + 6| + |x - 1|$ change its rule?',
      options: [
        { val: 'A', text: '$x = 6$ and $x = 1$' },
        { val: 'B', text: '$x = -3$ and $x = 1$' },
        { val: 'C', text: '$x = -6$ and $x = -1$' },
        { val: 'D', text: '$x = 3$ and $x = -1$' },
      ],
      correct: 'B',
      expEn: 'A modulus changes rule exactly where its inside is zero: $2x + 6 = 0$ gives $x = -3$ and $x - 1 = 0$ gives $x = 1$. A reads the constants off without solving; C forgets to divide by $2$.',
    },
  },

  // ── 17 · hidden quadratic ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Boxes',
    ratio: 55,
    eyebrow: 'The other 4.1 shape · a quadratic in disguise',
    title: 'When the Modulus Is the Unknown',
    inlineSvg: DIAGRAMS.ABS_QUAD,
    content: 'Some questions are quadratics whose variable is a modulus. Substitute a letter for the whole modulus, solve, then put the bars back.\n\n$$6|x + 2|^2 + 7|x + 2| - 3 = 0$$\n\nLet $u = |x + 2|$: $6u^2 + 7u - 3 = 0$, so $(3u - 1)(2u + 3) = 0$ and $u = \\tfrac{1}{3}$ or $u = -\\tfrac{3}{2}$.\n\n**Reject $u = -\\tfrac{3}{2}$ at once** — a modulus is never negative. Then $|x + 2| = \\tfrac{1}{3}$ gives $x = -2 \\pm \\tfrac{1}{3}$.',
    notes: [
      { tone: 'plant', text: 'The graph is $y = x^2 - 6|x| + 8$: with $u = |x|$, $u = 2$ or $u = 4$, so **four** roots. Each positive $u$ unfolds into two values of $x$.' },
    ],
    check: {
      id: 'chk_hidden_quad',
      q: 'Solving $x^2 - 6|x| + 8 = 0$ with $u = |x|$ gives $u = 2$ and $u = 4$. How many values of $x$ is that?',
      options: [
        { val: 'A', text: 'Two' },
        { val: 'B', text: 'Three' },
        { val: 'C', text: 'Four' },
        { val: 'D', text: 'One' },
      ],
      correct: 'C',
      expEn: '$|x| = 2$ gives $x = \\pm 2$ and $|x| = 4$ gives $x = \\pm 4$. Four roots — which is what the W-shaped graph shows.',
    },
  },

  // ── 18 · the inequality rules ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Section 4.2 · the two rules for inequalities',
    title: 'Small Modulus, Big Modulus',
    label: 'Learn both',
    labelIcon: 'Star',
    text: '$|p| \\leq q \\iff -q \\leq p \\leq q$',
    sub: 'and $|p| \\geq q \\iff p \\leq -q$ or $p \\geq q$. A small modulus traps $p$ near zero: one interval. A large modulus pushes $p$ away from zero in either direction: two separate pieces.',
  },

  // ── 19 · less than, shaded ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Minimize2',
    ratio: 52,
    eyebrow: 'Worked example 4 · less than',
    title: 'Below the Line Is One Interval',
    inlineSvg: DIAGRAMS.LESS_THAN,
    content: 'Solve $|2x - 1| < 3$.\n\n**By algebra.** $-3 < 2x - 1 < 3$, then add $1$ and halve, all three parts at once:\n\n$$-2 < 2x < 4 \\;\\Rightarrow\\; -1 < x < 2$$\n\n**By graph.** $y = |2x - 1|$ meets $y = 3$ at $x = -1$ and $x = 2$. The V is **below** the line between the crossings.',
    notes: [
      { tone: 'write', text: 'Whatever you do to the middle, do to all three parts. Dividing by a **negative** reverses both signs.' },
    ],
    activity: {
      id: 'act_line_less',
      type: 'numberline',
      prompt: 'Now shade the answer to $|x - 4| \\leq 2$ on the number line. Decide the shape first, then the numbers, then whether the ends are included.',
      display: '|x - 4| \\leq 2',
      solution: '2 <= x <= 6',
      min: -2,
      max: 10,
      explain: '$-2 \\leq x - 4 \\leq 2$, add $4$: $2 \\leq x \\leq 6$. One interval, closed circles, because "at most 2" includes a distance of exactly $2$. The centre of the interval is $4$ — the vertex of the V.',
    },
  },

  // ── 20 · greater than, shaded ───────────────────────────────────────────
  {
    layout: 'split',
    accent: AMBER,
    icon: 'Maximize2',
    ratio: 52,
    eyebrow: 'Worked example 5 · greater than',
    title: 'Above the Line Is Two Rays',
    inlineSvg: DIAGRAMS.MORE_THAN,
    content: 'Solve $|2x + 3| > 4$.\n\n**By algebra.** Two separate statements — never one chain:\n\n$$2x + 3 < -4 \\;\\Rightarrow\\; x < -\\tfrac{7}{2} \\qquad \\text{or} \\qquad 2x + 3 > 4 \\;\\Rightarrow\\; x > \\tfrac{1}{2}$$\n\n**By graph.** The V is **above** $y = 4$ everywhere outside the two crossings.',
    notes: [
      { tone: 'homework', text: 'Writing $\\tfrac{1}{2} < x < -\\tfrac{7}{2}$ scores zero. Nothing is bigger than a half **and** smaller than negative three and a half. Two rays need two statements joined by "or".' },
    ],
    activity: {
      id: 'act_line_more',
      type: 'numberline',
      prompt: 'Shade the answer to $|x + 1| > 5$. Two rays or one interval? Open or closed?',
      display: '|x + 1| > 5',
      solution: 'x < -6 or x > 4',
      min: -10,
      max: 8,
      explain: '$x + 1 < -5$ gives $x < -6$; $x + 1 > 5$ gives $x > 4$. Two rays, open circles (strict signs), and the gap between them is centred on $-1$, the vertex.',
    },
  },

  // ── 21 · the two shapes ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Know which shape you are heading for before you start',
    title: 'The Two Answer Shapes',
    inlineSvg: DIAGRAMS.INSIDE_OUT,
    drawThis: true,
    caption: 'Check the shape of your answer against the sign in the question. A "less than" that came out as two rays, or a "greater than" that came out as one interval, is wrong before you have looked at a single number.',
    check: {
      id: 'chk_shape',
      q: 'A student solves $|3x - 7| \\geq 2$ and writes $\\tfrac{5}{3} \\leq x \\leq 3$. Without checking the arithmetic, how do you know it is wrong?',
      options: [
        { val: 'A', text: 'The numbers are fractions' },
        { val: 'B', text: 'It is a "greater than", so the answer must be two separate pieces, not one interval' },
        { val: 'C', text: 'The inequality signs should be strict' },
        { val: 'D', text: 'You cannot solve a modulus inequality with a $3$ in front of the $x$' },
      ],
      correct: 'B',
      expEn: 'A big modulus pushes the inside away from zero on both sides, so the solution is two rays joined by "or": $x \\leq \\tfrac{5}{3}$ or $x \\geq 3$ — the same numbers, the outside rather than the inside.',
    },
  },

  // ── 22 · WE6 squaring an inequality ─────────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Superscript',
    eyebrow: 'Worked example 6 · a modulus on each side',
    title: 'Squaring an Inequality',
    content: 'Solve $|2x + 1| \\geq |3 - x|$.\n\nWith a modulus on **both** sides, $|p| \\geq |q| \\iff p^2 \\geq q^2$ applies safely: both sides are non-negative, so squaring cannot reverse the sign.',
    steps: [
      { text: 'Square both sides.\n$(2x + 1)^2 \\geq (3 - x)^2$' },
      { text: 'Expand both. $(3-x)^2$ and $(x-3)^2$ are the same thing.\n$4x^2 + 4x + 1 \\geq 9 - 6x + x^2$' },
      { text: 'Collect on the side that keeps $x^2$ positive.\n$3x^2 + 10x - 8 \\geq 0$' },
      { text: 'Factorise for the critical values.\n$(3x - 2)(x + 4) \\geq 0$, so they are $\\tfrac{2}{3}$ and $-4$.' },
      { text: 'Finish on a sketch, not in your head — next slide.' },
    ],
  },

  // ── 23 · the parabola ───────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Activity',
    eyebrow: 'How a quadratic inequality is actually finished',
    title: 'Read the Answer Off the Parabola',
    inlineSvg: DIAGRAMS.SIGN_PARABOLA,
    drawThis: true,
    caption: 'Sketch $y = 3x^2 + 10x - 8$: a positive quadratic, so it opens upwards and crosses at $-4$ and $\\tfrac{2}{3}$. The question wants $y \\geq 0$ — on or above the axis — which is the two outer pieces. So $x \\leq -4$ or $x \\geq \\tfrac{2}{3}$.',
    check: {
      id: 'chk_sign_diagram',
      q: 'For the same parabola, what is the solution of $3x^2 + 10x - 8 < 0$?',
      options: [
        { val: 'A', text: '$x < -4$ or $x > \\tfrac{2}{3}$' },
        { val: 'B', text: '$-4 < x < \\tfrac{2}{3}$' },
        { val: 'C', text: '$x < \\tfrac{2}{3}$' },
        { val: 'D', text: 'There is no solution' },
      ],
      correct: 'B',
      expEn: 'Below the axis on an upward parabola is the piece **between** the roots. Reversing the inequality swaps inside for outside — it does not change the critical values.',
    },
  },

  // ── 24 · WE6 on a graph ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'LineChart',
    eyebrow: 'The same inequality, checked against a picture',
    title: 'Where Blue Sits Above Red',
    inlineSvg: DIAGRAMS.WE6_GRAPH,
    caption: 'Draw both moduli and find the crossings, at $x = -4$ and $x = \\tfrac{2}{3}$. Then read the question literally: $|2x + 1| \\geq |3 - x|$ asks where the blue graph is **at or above** the red one — everything outside the crossings, matching the algebra exactly.',
  },

  // ── 25 · the sign trap ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'ShieldAlert',
    ratio: 52,
    eyebrow: 'The 4.2 trap that costs the most marks',
    title: 'Squaring Against Something That Might Be Negative',
    inlineSvg: DIAGRAMS.RHS_TRAP,
    content: 'The squaring rule needs a modulus on **both** sides. When the other side is an ordinary expression such as $x - 1$, it may be negative, and squaring a negative makes it positive — so squaring can change the answer.\n\nSolve $|2x - 3| \\leq x - 1$ safely: state $x - 1 \\geq 0$ first, so $x \\geq 1$. Then $(2x-3)^2 \\leq (x-1)^2$ gives $(3x - 4)(x - 2) \\leq 0$, so $\\tfrac{4}{3} \\leq x \\leq 2$ — and every value in it satisfies $x \\geq 1$, so the answer stands.',
    notes: [
      { tone: 'homework', text: 'A "less than" against a negative is impossible; a "greater than" against a negative is automatically true. Say which before you square.' },
    ],
    check: {
      id: 'chk_rhs_sign',
      q: 'How many solutions does $|3x + 2| \\leq -4$ have?',
      options: [
        { val: 'A', text: 'Two' },
        { val: 'B', text: 'One' },
        { val: 'C', text: 'None — a modulus is never negative, so it can never be at most $-4$' },
        { val: 'D', text: 'Every value of $x$' },
      ],
      correct: 'C',
      expEn: 'The left side is a distance, so it is $0$ or more, and nothing that is $0$ or more is at most $-4$. Note that $|3x + 2| \\geq -4$ is the opposite case: true for every $x$.',
    },
  },

  // ── 26 · method chooser, sorted ─────────────────────────────────────────
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Route',
    eyebrow: 'Four shapes, four first moves',
    title: 'Choosing Your Method',
    content: 'Nearly every question in this chapter is one of four shapes. Name the shape first and the method chooses itself.',
    steps: [
      { text: '**Modulus = modulus**, as in $|2x - 3| = |4 - x|$: split into two cases, or square. Both are safe.' },
      { text: '**Modulus = number**, as in $|2x - 1| = 7$: the inside is $7$ or $-7$. A negative number means no solution.' },
      { text: '**Modulus = expression**, as in $|x| = 2x - 3$: split or square, then CHECK every answer — this shape invents false ones.' },
      { text: '**Sum of moduli**, as in $|x + 1| + |2x - 3| = 8$: you cannot square. Isolate and split twice, or cut the line at the critical values.' },
    ],
    activity: {
      id: 'act_sort_shapes',
      type: 'sort',
      prompt: 'Sort these six questions by shape — the first move follows from the bin.',
      bins: [
        { id: 'mm', name: 'Modulus = modulus' },
        { id: 'mn', name: 'Modulus = number' },
        { id: 'me', name: 'Modulus = expression' },
        { id: 'sum', name: 'Sum of moduli' },
      ],
      cards: [
        { id: 'k1', name: '$|2x - 3| = |4 - x|$', bin: 'mm' },
        { id: 'k2', name: '$|2x - 1| = 7$', bin: 'mn' },
        { id: 'k3', name: '$|x| = 2x - 3$', bin: 'me' },
        { id: 'k4', name: '$|x + 1| + |2x - 3| = 8$', bin: 'sum' },
        { id: 'k5', name: '$|3x + 2| = 2|x|$', bin: 'mm' },
        { id: 'k6', name: '$|x - 4| = 3x + 1$', bin: 'me' },
      ],
      explain: 'A number in front of a modulus ($2|x|$) does not change the shape — it goes inside the bars. What decides the shape is what sits on the OTHER side: a modulus, a bare number, an expression with $x$ in it, or a second modulus added on.',
    },
  },

  // ── 27 · recap ──────────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'ListChecks',
    variant: 'checklist',
    columns: 2,
    eyebrow: 'Tick each one only if you could do it right now, unaided',
    title: 'What You Should Be Able to Do',
    items: [
      { text: 'State what $|x|$ means, and why it is never negative.' },
      { text: 'Use $|p| = |q| \\iff p^2 = q^2$ to remove two sets of bars at once.' },
      { text: 'Solve $|ax + b| = |cx + d|$ by splitting into two cases.' },
      { text: 'Solve the same equation by squaring, and factorise the quadratic.' },
      { text: 'Say how many solutions to expect from the two **gradients**.' },
      { text: 'Substitute every answer back, and reject the ones that fail.' },
      { text: 'Solve a **sum** of two moduli by isolating one, or by regions.' },
      { text: 'Spot a hidden quadratic in $|x|$, and reject a negative modulus.' },
      { text: 'Use $|p| \\leq q \\iff -q \\leq p \\leq q$ and get **one interval**.' },
      { text: 'Use $|p| \\geq q \\iff p \\leq -q$ or $p \\geq q$ and get **two rays**.' },
      { text: 'Finish a squared inequality on a sketch of the parabola.' },
      { text: 'Check the sign of the other side before squaring against an expression.' },
    ],
    check: {
      id: 'chk_recap',
      q: 'A question asks you to solve $|5 - 2x| \\leq 7$. What shape is the answer, and what is your first line?',
      options: [
        { val: 'A', text: 'One interval; write $-7 \\leq 5 - 2x \\leq 7$' },
        { val: 'B', text: 'Two rays; write $5 - 2x \\leq -7$ or $5 - 2x \\geq 7$' },
        { val: 'C', text: 'One interval; square both sides first' },
        { val: 'D', text: 'No solution, because $5 - 2x$ can be negative' },
      ],
      correct: 'A',
      expEn: 'A "less than or equal to" against a positive number is the small-modulus rule: one interval. The chain gives $-12 \\leq -2x \\leq 2$, and dividing by $-2$ **reverses** both signs: $-1 \\leq x \\leq 6$. D confuses the inside of the bars, which may be negative, with the modulus itself, which may not.',
    },
  },
];
