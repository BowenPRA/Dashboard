// src/data/ADD_MATH/AM_4A/notes.js
// AM_4A — Modulus Equations and Modulus Inequalities.
// Cambridge IGCSE Additional Mathematics 0606, sections 4.1 and 4.2.
//
// THE SPINE, and why it is in this order:
//   1–4    what the bars MEAN — distance from zero — and the three facts that
//          follow: |x| is never negative, |x|² = x², and |−x| = |x|. Slide 4 is
//          the one the rest of the unit stands on: |p| = |q| is equivalent to
//          p² = q², because squaring throws away exactly the information the
//          bars were throwing away anyway.
//   5–11   section 4.1, equations. The two methods (split into two cases, or
//          square both sides), the coursebook's three worked examples, and the
//          picture behind each: one crossing when the arms are parallel, two
//          when they are not. Slide 10 is load-bearing — it is where "always
//          check" stops being nagging and becomes a rule with a reason.
//   12–14  the shapes 4.1 sets that are not |ax+b| = |cx+d|: a SUM of two
//          moduli, which cannot be squared, and a hidden quadratic in |x|.
//   15–22  section 4.2, inequalities. The two rules, the two answer SHAPES they
//          produce (one interval versus two rays), squaring a modulus against a
//          modulus, and finishing on the sign diagram of a quadratic.
//   23     the trap that costs the most marks in 4.2: squaring against something
//          that might be negative.
//   24–25  a strategy chooser, and the recap checklist.
//
// House notes:
//  · ENGLISH ONLY. ADD_MATH declares `bilingual: false`, so there are no `vn*`
//    twins; the layouts fall back to English through pick(en, vn).
//  · `$…$` is inline KaTeX and `$$…$$` is a display block, but `$$…$$` is legal
//    ONLY in fields rendered by renderContent — a slide's `content`, a callout
//    body, a `reveal.answer`. In steps[].text, note text, statement text/sub,
//    gallery item text and every check question it renders as a red error.
//  · Layout `title` and hero `objective` are plain text — never parsed — so no
//    markdown and no maths goes in them.
//  · `check` is always the LAST key on its slide: generate_all_audio.py narrates
//    everything before it and deliberately stops there, so a check question is
//    never read aloud before the student has answered it.
//  · Eleven `check` questions carry the NOTES score, so the XP is earned rather
//    than paid out for reaching the last slide.
//  · The modulus bars are plain pipes, `|2x - 1|`. speechify() in
//    generate_all_audio.py knows to read a matched pair as "the modulus of".
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
    card: {
      icon: 'Pencil',
      badge: 'Warm-Up · Do this now in your book',
      text: 'Write down the value of $|7|$, $|-7|$, $|0|$ and $|3 - 10|$. **Four numbers, ten seconds.** Notice that only one of them could ever have come out negative — and it did not.',
    },
  },

  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    ratio: 52,
    eyebrow: 'The definition, in two lines',
    title: 'What the Bars Mean',
    inlineSvg: DIAGRAMS.MODULUS_DEF,
    content: 'The **modulus** of $x$, written $|x|$, is its **distance from zero**. Distance has no direction, so the answer is never negative:\n\n$$|x| = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0\\end{cases}$$\n\nThe second line looks wrong the first time you read it. It is not: if $x = -7$ then $-x = 7$, and $7$ is the distance from zero.',
    notes: [
      {
        tone: 'write',
        text: 'Read $|x|$ aloud as **"the modulus of x"** or **"mod x"**.\nThe graph of $y = |x|$ is the line $y = x$ with everything below the axis **folded upwards**.',
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
      expEn: 'Work out the inside first: $4 - 9 = -5$. The modulus then takes the distance from zero, which is $5$. A forgets to apply the bars at all; C changes the subtraction into an addition of two moduli, which is a different — and wrong — thing.',
    },
  },

  {
    layout: 'compare',
    accent: TEAL,
    eyebrow: 'Learn the true ones, and refuse the tempting one',
    title: 'Three Facts and One Trap',
    columns: [
      {
        heading: 'Always true',
        icon: 'CheckCircle2',
        accent: GREEN,
        content: '$|x| \\geq 0$ — a modulus can never be negative\n\n$|x|^2 = x^2$ — squaring already removes the sign\n\n$|-x| = |x|$ — the bars cannot tell the two apart\n\n$|ab| = |a| \\times |b|$ — moduli survive multiplying',
        caption: 'These four are the whole toolkit for this chapter.',
      },
      {
        heading: 'Never true',
        icon: 'AlertTriangle',
        accent: RED,
        content: '$|a + b| = |a| + |b|$ — try $a = 3$, $b = -3$: the left side is $0$, the right side is $6$\n\n$|x| = x$ — only for $x \\geq 0$\n\n$|x - 3| = |x| - 3$ — the bars are not a bracket you can multiply out',
        caption: 'You cannot take a modulus apart across a plus or a minus.',
      },
    ],
  },

  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Equal',
    eyebrow: 'Section 4.1 · the rule the whole section rests on',
    title: 'Equal Moduli Means Equal Squares',
    label: 'Learn this',
    labelIcon: 'Star',
    text: '$|p| = |q| \\iff p^2 = q^2$',
    sub: 'Squaring throws away the sign — which is exactly what the bars were throwing away. So the two statements carry the same information, and the squared one has no bars left to worry about.',
  },

  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'GitCompare',
    eyebrow: 'Where the rule comes from, and the two it drags with it',
    title: 'Why Squaring Is Allowed',
    inlineSvg: DIAGRAMS.EQUIV_BOX,
    caption: 'Start from $p^2 - q^2 = |p|^2 - |q|^2$, then use the difference of two squares: $p^2 - q^2 = (|p| - |q|)(|p| + |q|)$. The bracket $|p| + |q|$ can never be negative, so the sign of $p^2 - q^2$ is decided entirely by $|p| - |q|$ — which is why all three comparisons survive squaring.',
    check: {
      id: 'chk_why_square',
      q: 'In the derivation, why does $|p| + |q|$ being non-negative matter?',
      options: [
        { val: 'A', text: 'It makes $p^2 - q^2$ equal to zero' },
        { val: 'B', text: 'It means multiplying by it cannot flip the direction of the comparison' },
        { val: 'C', text: 'It proves $p = q$' },
        { val: 'D', text: 'It lets you cancel the brackets' },
      ],
      correct: 'B',
      expEn: 'Multiplying an inequality by a positive quantity leaves its direction alone; multiplying by a negative one would reverse it. Because $|p| + |q|$ is never negative, $|p| - |q|$ and $p^2 - q^2$ always have the same sign — so bigger modulus means bigger square, every time.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Split',
    eyebrow: 'Worked example 1 · Method 1',
    title: 'Splitting Into Two Equations',
    content: 'Solve $|x - 5| = |x + 1|$.\n\nIf two things have the same modulus they are either **equal** or **exact opposites**. That is two ordinary equations, and you solve both.',
    steps: [
      { text: 'Write the two cases. The second one negates **one** side only — negating both would just give you the first case back.\n$x - 5 = x + 1$ or $x - 5 = -(x + 1)$' },
      { text: 'First case: subtract $x$ from both sides.\n$-5 = 1$, which is false. This case gives no solution.' },
      { text: 'Second case: remove the bracket, flipping both signs inside it.\n$x - 5 = -x - 1$, so $2x = 4$ and $x = 2$.' },
      { text: 'CHECK by substituting back: $|2 - 5| = 3$ and $|2 + 1| = 3$. They agree, so $x = 2$ is genuine.' },
    ],
    reveal: {
      label: 'Why did one case collapse?',
      prompt: 'The case $x - 5 = x + 1$ lost its $x$ altogether. What does that tell you about the two graphs?',
      answer: 'Both graphs have arms of gradient $+1$ and $-1$. When you set the $+1$ arm of one equal to the $+1$ arm of the other you are asking two **parallel** lines to meet, and they never do. That is why $|x - 5| = |x + 1|$ has only one solution.',
    },
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
      expEn: 'Two expressions with equal moduli are either equal or opposite, so exactly one side is negated. B negates both sides, which cancels out and just repeats the first equation. C throws away half the solutions.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Superscript',
    eyebrow: 'Worked example 1 · Method 2',
    title: 'Squaring Both Sides',
    content: 'The same equation, $|x - 5| = |x + 1|$, done with $|p| = |q| \\iff p^2 = q^2$. Both sets of bars disappear in one move.',
    steps: [
      { text: 'Square both sides. The bars go, and nothing is left to case-split.\n$(x - 5)^2 = (x + 1)^2$' },
      { text: 'Expand each side in full. Do not cancel the squares — they are the terms that will cancel each other in a moment.\n$x^2 - 10x + 25 = x^2 + 2x + 1$' },
      { text: 'The $x^2$ terms cancel, which is what makes this equation linear rather than quadratic.\n$-10x + 25 = 2x + 1$' },
      { text: 'Collect and finish.\n$24 = 12x$, so $x = 2$ — the same single answer Method 1 found.' },
    ],
  },

  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'LineChart',
    eyebrow: 'The same answer, read off a picture',
    title: 'One Crossing, One Solution',
    inlineSvg: DIAGRAMS.WE1_GRAPH,
    drawThis: true,
    caption: 'Draw $y = |x - 5|$ and $y = |x + 1|$ on one grid. The solution of the equation is the $x$-coordinate where the two graphs cross. There is exactly one crossing, at $x = 2$ — and now you can see why: the arms that did not meet are parallel.',
  },

  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Sigma',
    eyebrow: 'Worked example 2 · both methods on a harder one',
    title: 'When There Are Two Answers',
    content: 'Solve $|2x + 1| = |x - 3|$. This time the gradients differ, so expect **two** solutions — and a quadratic if you square.',
    steps: [
      { text: 'Method 1, case one: $2x + 1 = x - 3$, so $x = -4$.' },
      { text: 'Method 1, case two: $2x + 1 = -(x - 3) = -x + 3$, so $3x = 2$ and $x = \\tfrac{2}{3}$.' },
      { text: 'Method 2 instead: square both sides.\n$(2x + 1)^2 = (x - 3)^2$, so $4x^2 + 4x + 1 = x^2 - 6x + 9$.' },
      { text: 'Collect everything on one side — this time the $x^2$ terms do **not** cancel.\n$3x^2 + 10x - 8 = 0$' },
      { text: 'Factorise and solve.\n$(3x - 2)(x + 4) = 0$, so $x = \\tfrac{2}{3}$ or $x = -4$ — the same pair.' },
    ],
    reveal: {
      label: 'Check both, the way the mark scheme does',
      prompt: 'Substitute each answer back into the original equation.',
      answer: 'At $x = -4$: $|2(-4) + 1| = |-7| = 7$ and $|-4 - 3| = |-7| = 7$. At $x = \\tfrac{2}{3}$: $|\\tfrac{4}{3} + 1| = \\tfrac{7}{3}$ and $|\\tfrac{2}{3} - 3| = \\tfrac{7}{3}$. Both hold, so both are genuine solutions.',
    },
  },

  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'LineChart',
    eyebrow: 'The picture behind worked example 2',
    title: 'Two Crossings, Two Solutions',
    inlineSvg: DIAGRAMS.WE2_GRAPH,
    caption: 'One answer, $x = -4$, can be read straight off the grid. The other, $x = \\tfrac{2}{3}$, sits between the lines and could never be read accurately — which is the honest reason the algebra is worth doing even when a graph is available.',
    check: {
      id: 'chk_how_many',
      q: 'Why does $|2x + 1| = |x - 3|$ have two solutions when $|x - 5| = |x + 1|$ had only one?',
      options: [
        { val: 'A', text: 'Because the numbers inside the second one are larger' },
        { val: 'B', text: 'Because the two graphs have different gradients, so both pairs of arms meet' },
        { val: 'C', text: 'Because one equation is quadratic and the other is not' },
        { val: 'D', text: 'Because $|2x + 1|$ has a positive sign inside' },
      ],
      correct: 'B',
      expEn: 'A modulus graph has two arms. If both graphs have the same steepness, one pair of arms is parallel and never meets, leaving one crossing. Here the steepnesses are $2$ and $1$, so every pair of arms meets and you get two.',
    },
  },

  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'GitCompare',
    eyebrow: 'Choose whichever you trust — both earn full marks',
    title: 'The Two Methods Side by Side',
    inlineSvg: DIAGRAMS.TWO_METHODS,
    caption: 'Splitting is faster and keeps the algebra linear, but it is easy to drop a case or a sign. Squaring cannot lose a case, because both sets of bars go at once — but it only works when a modulus sits on **each** side of the equals sign.',
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'ShieldAlert',
    eyebrow: 'Where the marks go',
    title: 'Always Substitute Back',
    content: 'Both methods can produce an answer that does not actually work, and squaring is the worse offender: it can invent a solution out of nothing, because it forgets which side was negative.\n\n$$|x| = 2x - 3 \\;\\Rightarrow\\; x^2 = 4x^2 - 12x + 9 \\;\\Rightarrow\\; 3x^2 - 12x + 9 = 0 \\;\\Rightarrow\\; x = 1 \\text{ or } x = 3$$\n\nTest them. At $x = 3$: $|3| = 3$ and $2(3) - 3 = 3$, so that one is real. At $x = 1$: $|1| = 1$ but $2(1) - 3 = -1$, and a modulus is never negative — so $x = 1$ is **not** a solution, even though the algebra produced it.',
    notes: [
      {
        tone: 'homework',
        text: 'Write the check into your working as a line of its own, the way the coursebook does. It costs fifteen seconds and it is the difference between two marks and none.',
      },
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
      expEn: 'At $x = 1$ the right-hand side is $-1$, and a modulus can never equal a negative number. Squaring erased that requirement, so the algebra happily returned a value the original equation rejects. C is impossible — the left side is a modulus, so it is never negative.',
    },
  },

  {
    layout: 'steps',
    accent: AMBER,
    icon: 'Layers',
    eyebrow: 'Worked example 3 · a shape you cannot square',
    title: 'A Sum of Two Moduli',
    content: 'Solve $|x + 4| + |x - 5| = 11$.\n\nThere is no rule for squaring a **sum** of moduli, so this needs the other approach: take the moduli apart one at a time, or split the number line at the points where each one changes rule.',
    steps: [
      { text: 'Move one modulus across so a single one is alone on the left.\n$|x + 4| = 11 - |x - 5|$' },
      { text: 'Split on that modulus. Either $x + 4 = 11 - |x - 5|$, or $x + 4 = |x - 5| - 11$.' },
      { text: 'Take the first: $|x - 5| = 7 - x$. Split again — $x - 5 = 7 - x$ gives $x = 6$; $x - 5 = -(7 - x)$ gives $0 = -2$, which is false.' },
      { text: 'Take the second: $|x - 5| = x + 15$. Split again — $x - 5 = x + 15$ gives $0 = 20$, false; $x - 5 = -(x + 15)$ gives $2x = -10$ and $x = -5$.' },
      { text: 'CHECK both. $|6 + 4| + |6 - 5| = 10 + 1 = 11$, and $|-5 + 4| + |-5 - 5| = 1 + 10 = 11$. So $x = 6$ or $x = -5$.' },
    ],
  },

  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Milestone',
    eyebrow: 'The same problem, cut into regions',
    title: 'Critical Values Cut the Line',
    inlineSvg: DIAGRAMS.SUM_REGIONS,
    caption: 'The alternative method, and the one worth knowing for harder sums. $|x + 4|$ changes rule at $x = -4$ and $|x - 5|$ changes rule at $x = 5$, so the number line falls into three regions. Solve the equation in each region with the bars removed, and keep only the answers that land inside the region that produced them.',
    check: {
      id: 'chk_critical_values',
      q: 'At which values of $x$ does the expression $|2x + 6| + |x - 1|$ change its rule?',
      options: [
        { val: 'A', text: '$x = 6$ and $x = 1$' },
        { val: 'B', text: '$x = -3$ and $x = 1$' },
        { val: 'C', text: '$x = -6$ and $x = -1$' },
        { val: 'D', text: '$x = 3$ and $x = -1$' },
      ],
      correct: 'B',
      expEn: 'A modulus changes rule exactly where the expression inside it is zero. $2x + 6 = 0$ gives $x = -3$, and $x - 1 = 0$ gives $x = 1$. A reads the constants straight off without solving, and C forgets to divide by the $2$.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Boxes',
    ratio: 55,
    eyebrow: 'The other 4.1 shape · a quadratic in disguise',
    title: 'When the Modulus Is the Unknown',
    inlineSvg: DIAGRAMS.ABS_QUAD,
    content: 'Some questions are quadratics whose variable happens to be a modulus. Substitute a letter for the whole modulus, solve the ordinary quadratic, then put the bars back.\n\n$$6|x + 2|^2 + 7|x + 2| - 3 = 0$$\n\nLet $u = |x + 2|$. Then $6u^2 + 7u - 3 = 0$, so $(3u - 1)(2u + 3) = 0$ and $u = \\tfrac{1}{3}$ or $u = -\\tfrac{3}{2}$.\n\n**Reject $u = -\\tfrac{3}{2}$ immediately** — a modulus is never negative. That leaves $|x + 2| = \\tfrac{1}{3}$, so $x = -2 \\pm \\tfrac{1}{3}$.',
    notes: [
      {
        tone: 'plant',
        text: 'The graph shown is $y = x^2 - 6|x| + 8$, the same idea with $u = |x|$: solve $u^2 - 6u + 8 = 0$ to get $u = 2$ or $u = 4$, then $|x| = 2$ or $|x| = 4$ gives **four** roots. A modulus inside a quadratic doubles the answers, because each positive $u$ gives two values of $x$.',
      },
    ],
    check: {
      id: 'chk_hidden_quad',
      q: 'Solving $x^2 - 6|x| + 8 = 0$ by letting $u = |x|$ gives $u = 2$ and $u = 4$. How many values of $x$ is that?',
      options: [
        { val: 'A', text: 'Two' },
        { val: 'B', text: 'Three' },
        { val: 'C', text: 'Four' },
        { val: 'D', text: 'One' },
      ],
      correct: 'C',
      expEn: '$|x| = 2$ gives $x = 2$ and $x = -2$; $|x| = 4$ gives $x = 4$ and $x = -4$. Each positive value of $u$ unfolds into two values of $x$, so there are four roots — which is exactly what the graph shows.',
    },
  },

  {
    layout: 'statement',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Section 4.2 · the two rules for inequalities',
    title: 'Small Modulus, Big Modulus',
    label: 'Learn both',
    labelIcon: 'Star',
    text: '$|p| \\leq q \\iff -q \\leq p \\leq q$',
    sub: 'and $|p| \\geq q \\iff p \\leq -q$ or $p \\geq q$. A small modulus traps $p$ near zero, which is one interval. A large modulus pushes $p$ away from zero in either direction, which is two separate pieces.',
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'Minimize2',
    ratio: 52,
    eyebrow: 'Worked example 4 · less than',
    title: 'Below the Line Is One Interval',
    inlineSvg: DIAGRAMS.LESS_THAN,
    content: 'Solve $|2x - 1| < 3$.\n\n**By algebra.** Use $|p| < q \\iff -q < p < q$ and work on all three parts of the chain at once:\n\n$$-3 < 2x - 1 < 3 \\;\\Rightarrow\\; -2 < 2x < 4 \\;\\Rightarrow\\; -1 < x < 2$$\n\n**By graph.** Draw $y = |2x - 1|$ and the line $y = 3$. They meet at $A(-1, 3)$ and $B(2, 3)$. The inequality asks where the V is **below** the line, and that is the stretch between the two crossings.',
    notes: [
      {
        tone: 'write',
        text: 'Whatever you do to the middle you do to all three parts. Adding $1$ across the chain and then halving it keeps every inequality sign pointing the same way, because $2$ is positive.',
      },
    ],
    check: {
      id: 'chk_less_than',
      q: 'Solve $|x - 4| \\leq 2$.',
      options: [
        { val: 'A', text: '$2 \\leq x \\leq 6$' },
        { val: 'B', text: '$x \\leq 2$ or $x \\geq 6$' },
        { val: 'C', text: '$-6 \\leq x \\leq -2$' },
        { val: 'D', text: '$-2 \\leq x \\leq 2$' },
      ],
      correct: 'A',
      expEn: 'Write $-2 \\leq x - 4 \\leq 2$, then add $4$ to all three parts: $2 \\leq x \\leq 6$. B is the answer to the opposite inequality — a "less than" can never produce two separate pieces. D forgets to add the $4$.',
    },
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Maximize2',
    ratio: 52,
    eyebrow: 'Worked example 5 · greater than',
    title: 'Above the Line Is Two Rays',
    inlineSvg: DIAGRAMS.MORE_THAN,
    content: 'Solve $|2x + 3| > 4$.\n\n**By algebra.** Use $|p| > q \\iff p < -q$ or $p > q$, and solve the two statements **separately** — they are not a chain and must never be written as one:\n\n$$2x + 3 < -4 \\;\\Rightarrow\\; x < -\\tfrac{7}{2} \\qquad \\text{or} \\qquad 2x + 3 > 4 \\;\\Rightarrow\\; x > \\tfrac{1}{2}$$\n\n**By graph.** $y = |2x + 3|$ meets $y = 4$ at $A(-\\tfrac{7}{2}, 4)$ and $B(\\tfrac{1}{2}, 4)$. The V is **above** the line everywhere outside those two points.',
    notes: [
      {
        tone: 'homework',
        text: 'Writing this answer as $\\tfrac{1}{2} < x < -\\tfrac{7}{2}$ scores zero. It claims $x$ is bigger than a half **and** smaller than negative three and a half, which nothing is. Two rays need two sentences joined by "or".',
      },
    ],
    check: {
      id: 'chk_more_than',
      q: 'Solve $|x + 1| > 5$.',
      options: [
        { val: 'A', text: '$-6 < x < 4$' },
        { val: 'B', text: '$x < -6$ or $x > 4$' },
        { val: 'C', text: '$x < -4$ or $x > 6$' },
        { val: 'D', text: '$4 < x < -6$' },
      ],
      correct: 'B',
      expEn: 'Split it: $x + 1 < -5$ gives $x < -6$, and $x + 1 > 5$ gives $x > 4$. A solves the "less than" version by mistake. C subtracts the $1$ the wrong way. D writes the right numbers as an impossible chain.',
    },
  },

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
      expEn: 'A large modulus pushes the expression away from zero on both sides, so the solution is always two rays joined by "or". The correct answer here is $x \\leq \\tfrac{5}{3}$ or $x \\geq 3$ — the same two numbers, but the outside rather than the inside.',
    },
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Superscript',
    eyebrow: 'Worked example 6 · a modulus on each side',
    title: 'Squaring an Inequality',
    content: 'Solve $|2x + 1| \\geq |3 - x|$.\n\nWith a modulus on **both** sides, $|p| \\geq |q| \\iff p^2 \\geq q^2$ applies, and nothing can go wrong: both sides are automatically non-negative, so squaring cannot reverse the sign.',
    steps: [
      { text: 'Square both sides.\n$(2x + 1)^2 \\geq (3 - x)^2$' },
      { text: 'Expand both. Note that $(3-x)^2$ and $(x-3)^2$ are the same thing, so the order inside does not matter once you square.\n$4x^2 + 4x + 1 \\geq 9 - 6x + x^2$' },
      { text: 'Collect on the side that keeps the $x^2$ coefficient positive — it makes the sign diagram easier to read.\n$3x^2 + 10x - 8 \\geq 0$' },
      { text: 'Factorise to find the critical values.\n$(3x - 2)(x + 4) \\geq 0$, so the critical values are $\\tfrac{2}{3}$ and $-4$.' },
      { text: 'Finish on a sketch, not in your head — the next slide shows why.' },
    ],
  },

  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Activity',
    eyebrow: 'How a quadratic inequality is actually finished',
    title: 'Read the Answer Off the Parabola',
    inlineSvg: DIAGRAMS.SIGN_PARABOLA,
    drawThis: true,
    caption: 'Sketch $y = 3x^2 + 10x - 8$: it is a positive quadratic, so it opens upwards and crosses at $-4$ and $\\tfrac{2}{3}$. The question wants $y \\geq 0$, which is where the curve is on or above the axis — the two outer pieces. So $x \\leq -4$ or $x \\geq \\tfrac{2}{3}$.',
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
      expEn: 'Below the axis on an upward parabola is the piece **between** the roots, so $-4 < x < \\tfrac{2}{3}$. A is the answer to the "greater than" version. Reversing the inequality swaps inside for outside — it does not change the critical values.',
    },
  },

  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'LineChart',
    eyebrow: 'The same inequality, checked against a picture',
    title: 'Where Blue Sits Above Red',
    inlineSvg: DIAGRAMS.WE6_GRAPH,
    caption: 'Draw both moduli and find the crossings, at $x = -4$ and $x = \\tfrac{2}{3}$. Then read the question literally: $|2x + 1| \\geq |3 - x|$ asks where the blue graph is **at or above** the red one, which is everything outside the crossings — matching the algebra exactly.',
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'ShieldAlert',
    ratio: 52,
    eyebrow: 'The 4.2 trap that costs the most marks',
    title: 'Squaring Against Something That Might Be Negative',
    inlineSvg: DIAGRAMS.RHS_TRAP,
    content: 'The rule $|p| \\geq |q| \\iff p^2 \\geq q^2$ needs a modulus on **both** sides. When the other side is an ordinary expression such as $x - 1$, it may be negative, and squaring a negative number makes it positive — so squaring can change the answer.\n\nSolve $|2x - 3| \\leq x - 1$ properly:\n\n$$x - 1 \\geq 0 \\;\\Rightarrow\\; x \\geq 1, \\quad \\text{then} \\quad (2x-3)^2 \\leq (x-1)^2$$\n\nThat gives $3x^2 - 10x + 8 \\leq 0$, so $(3x - 4)(x - 2) \\leq 0$ and $\\tfrac{4}{3} \\leq x \\leq 2$. Both of those already satisfy $x \\geq 1$, so the answer stands.',
    notes: [
      {
        tone: 'homework',
        text: 'If the right-hand side can go negative, state the condition **before** you square and check your final answer against it. A "less than" against a negative is impossible; a "greater than" against a negative is automatically true.',
      },
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
      expEn: 'The left side is a distance, so it is always $0$ or more, and nothing that is $0$ or more can be less than or equal to $-4$. Spotting this takes one second and saves a page of squaring. Note that $|3x + 2| \\geq -4$ is the opposite case — it is true for every value of $x$.',
    },
  },

  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Route',
    eyebrow: 'Four shapes, four first moves',
    title: 'Choosing Your Method',
    content: 'Nearly every question in this chapter is one of four shapes. Name the shape first and the method chooses itself.',
    steps: [
      { text: '**Modulus = modulus**, as in $|2x - 3| = |4 - x|$: square both sides, or split into two cases. Both are safe.' },
      { text: '**Modulus = number**, as in $|2x - 1| = 7$: split into $2x - 1 = 7$ and $2x - 1 = -7$. If the number is negative, there is no solution at all.' },
      { text: '**Modulus = expression**, as in $|x| = 2x - 3$: split or square, then CHECK every answer against the original — this is the shape that invents false solutions.' },
      { text: '**Sum of moduli**, as in $|x + 1| + |2x - 3| = 8$: you cannot square. Isolate one modulus and split twice, or cut the number line at the critical values and solve region by region.' },
      { text: 'For an inequality, do the matching thing and then ask the shape question: does a "less than" give one interval, and a "greater than" two rays?' },
    ],
    reveal: {
      label: 'Which shape is $2|x - 3| > |3x + 1|$?',
      prompt: 'There is a $2$ in front of the first modulus. Does that stop you squaring?',
      answer: 'No. Both sides are still non-negative, so squaring is legal: $4(x-3)^2 > (3x+1)^2$. Expanding gives $4x^2 - 24x + 36 > 9x^2 + 6x + 1$, so $5x^2 + 30x - 35 < 0$, then $x^2 + 6x - 7 < 0$ and $(x + 7)(x - 1) < 0$ — giving $-7 < x < 1$. A positive number in front of a modulus can also be taken inside it: $2|x-3| = |2x-6|$.',
    },
  },

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
      { text: 'Solve the same equation by squaring, and factorise the quadratic that results.' },
      { text: 'Say how many solutions to expect from the two **gradients**.' },
      { text: 'Substitute every answer back, and reject the ones that fail.' },
      { text: 'Solve a **sum** of two moduli by isolating one, or by regions.' },
      { text: 'Spot a hidden quadratic in $|x|$, and reject a negative value of the modulus.' },
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
      expEn: 'It is a "less than or equal to" against a positive number, so it is the small-modulus rule and the answer is a single interval. The chain gives $-12 \\leq -2x \\leq 2$, and dividing by $-2$ **reverses** both signs to give $-1 \\leq x \\leq 6$. D confuses the inside of the bars, which may certainly be negative, with the modulus itself, which may not.',
    },
  },
];
