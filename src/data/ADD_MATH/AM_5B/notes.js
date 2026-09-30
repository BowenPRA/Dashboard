// src/data/ADD_MATH/AM_5B/notes.js
// AM_5B — Exponential Equations, e and ln.
// Cambridge IGCSE Additional Mathematics 0606, sections 5.5, 5.7 and 5.8.
//
// Twenty-four slides, one idea each, following Part 1 of the three problem
// banks (docs/add-math-5-5-…, 5-7-…, 5-8-…). Twenty scored items carry the
// NOTES score: twelve checks and eight activities (predict ×2, sort ×3, order,
// estimate, hotspot), placed where each idea has just landed.
//
// THE SPINE:
//   1–6    5.5 take logs: which log (predict), the method, a linear power, the
//          two traps (dividing logs, rounding early), a different base on
//          each side.
//   7–13   5.5 hidden quadratics: what the substitution does (predict), the
//          picture, a worked example, why a value of y is rejected (sort), a
//          worked rejection, shifted and disguised powers (sort), the method
//          in order.
//   14–20  5.7 e and ln: where e comes from (estimate), e and ln, the mirror
//          graph (hotspot), the inverse pair and exact values, e^(…) = k in
//          both registers, ln(…) = k, a hidden quadratic with e^(−x). The book
//          prints no worked examples for 5.7, so these slides supply them.
//   21–23  5.8 growth and decay (sort), the cooling model worked in full, and
//          finding the constant from a half-life.
//   24     the recap.
//
// House notes:
//  · ENGLISH ONLY — ADD_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, captions,
//    check and activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Titles are narrated and are plain text: no maths, no bare symbols.
//  · Every example here is fresh: none is a book question, and none is an
//    item from Undo It, Take Logs, Hidden Quadratic, the Practice or the Quiz.
import { DIAGRAMS } from './diagrams.js';

const VIOLET = '#6d28d9';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const AMBER = '#d97706';
const PURPLE = '#a855f7';
const RED = '#ef4444';
const TEAL = '#0e7490';
const PINK = '#be185d';

export const notes = [
  {
    layout: 'hero',
    color: VIOLET,
    icon: 'Superscript',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 5 · Logarithmic and exponential functions · 5.5, 5.7, 5.8',
    title: 'Exponential Equations, e and ln',
    objective: 'I can solve an equation with the unknown in a power by taking logs, spot and solve a hidden quadratic and reject the values a power can never take, use e and ln as a pair that undo each other, and use exponential models of growth and decay.',
  },

  // ── 2 · ask before you tell ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you turn the page',
    title: 'Which Log Should You Take',
    content: 'In the last unit you met $2^x = 32$: write $32$ as $2^5$, so $x = 5$. But what about\n\n$$3^x = 20$$\n\nThere is no whole power of $3$ that makes $20$, so the bases cannot be matched. The way in is to **take logs of both sides**, because the power law brings the $x$ down.',
    activity: {
      id: 'act_predict_which_log',
      type: 'predict',
      prompt: 'To solve $3^x = 20$ you take a log of both sides. Which log may you use?',
      options: [
        { val: 'base3', name: 'Only a log to base 3, to match the 3' },
        { val: 'lg', name: 'Only lg, because that is the key on the calculator' },
        { val: 'any', name: 'Any log at all: they all give the same x' },
        { val: 'ln', name: 'Only ln, because it is the natural one' },
      ],
      correct: 'any',
      explain: 'Taking lg gives $x = \\dfrac{\\lg 20}{\\lg 3}$ and taking ln gives $x = \\dfrac{\\ln 20}{\\ln 3}$. Work both out: each is $2.7268\\ldots$ One log divided by another comes out the same in every base, so use whichever key you like. A log to base $3$ works too — it gives $x = \\log_3 20$ straight away — but it is not the only one, and most calculators have no key for it. The book uses lg; with a power of e you will want ln.',
    },
  },

  // ── 3 · the method ──────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: VIOLET,
    icon: 'Superscript',
    eyebrow: 'Write this down · taking logs',
    title: 'Take Logs, Bring the Power Down, Divide',
    inlineSvg: DIAGRAMS.TAKE_LOGS,
    drawThis: true,
    caption: 'Take lg of **both** sides: $\\lg 3^x = \\lg 20$. The **power law** brings the power down in front: $x \\lg 3 = \\lg 20$. Now $\\lg 3$ is just a number multiplying $x$, so divide by it: $x = \\dfrac{\\lg 20}{\\lg 3} = 2.73$ to 3 significant figures.',
    check: {
      id: 'chk_take_logs',
      q: 'Solve $6^x = 50$, giving $x$ to 3 significant figures.',
      options: [
        { val: 'A', text: '$x = 0.921$' },
        { val: 'B', text: '$x = 8.33$' },
        { val: 'C', text: '$x = 0.458$' },
        { val: 'D', text: '$x = 2.18$' },
      ],
      correct: 'D',
      expEn: '$x \\lg 6 = \\lg 50$, so $x = \\dfrac{\\lg 50}{\\lg 6} = 2.18$. A works out $\\lg \\dfrac{50}{6}$, but dividing two logs is not a law; B is $50 \\div 6$, with no logs at all; C is the division upside down.',
    },
  },

  // ── 4 · a linear power ──────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: VIOLET,
    icon: 'PenLine',
    eyebrow: 'When the power is more than just x',
    title: 'The Whole Power Comes Down',
    content: 'Solve $4^{2x - 1} = 30$, giving $x$ to 3 significant figures.',
    steps: [
      { text: '**Take lg of both sides:** $\\lg 4^{2x - 1} = \\lg 30$.' },
      { text: '**The whole power comes down, in a bracket:** $(2x - 1)\\lg 4 = \\lg 30$.' },
      { text: '**Divide by** $\\lg 4$ **and keep 4 or more figures:** $2x - 1 = \\dfrac{\\lg 30}{\\lg 4} = 2.4534$.' },
      { text: '**Undo the rest in reverse order:** add $1$, then divide by $2$: $x = \\dfrac{3.4534}{2} = 1.73$.' },
    ],
    notes: [
      { tone: 'write', text: '$\\lg a^{\\text{power}} = (\\text{power}) \\times \\lg a$. The bracket matters: without it only part of the power is multiplied by the log.' },
    ],
    check: {
      id: 'chk_bracket',
      q: 'After taking lg of both sides of $7^{x + 3} = 40$, which line comes next?',
      options: [
        { val: 'A', text: '$x + 3\\lg 7 = \\lg 40$' },
        { val: 'B', text: '$(x + 3)\\lg 7 = \\lg 40$' },
        { val: 'C', text: '$x + 3 = \\lg 40 - \\lg 7$' },
        { val: 'D', text: '$(x + 3) \\times 7 = 40$' },
      ],
      correct: 'B',
      expEn: 'The whole power $x + 3$ comes down in front of $\\lg 7$, so it needs a bracket. A multiplies only the $3$ by $\\lg 7$; C subtracts a log that is really multiplying; D has lost the logs altogether.',
    },
  },

  // ── 5 · the traps ───────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Two ways to lose the accuracy mark',
    title: 'Dividing Logs and Rounding Too Soon',
    content: '**Trap 1.** $\\dfrac{\\lg 20}{\\lg 3}$ is **not** $\\lg \\dfrac{20}{3}$, and it is not $\\lg 20 - \\lg 3$. There is no log law for dividing one log by another. Key it into the calculator exactly as it stands:\n\n$$\\frac{\\lg 20}{\\lg 3} = 2.7268\\ldots \\qquad \\text{but} \\qquad \\lg \\frac{20}{3} = 0.8239\\ldots$$\n\n**Trap 2.** Round only at the very end. If $2x - 1 = 2.4534$ is cut to $2.5$ first, the answer comes out as $1.75$ instead of $1.73$. Keep at least 4 significant figures in the working, then give the answer to 3.',
    notes: [
      { tone: 'plant', text: 'Significant figures are counted from the first digit that is not zero: $0.024668$ to 3 significant figures is $0.0247$, and $1.2979$ is $1.30$ — the zero counts, so write it.' },
    ],
  },

  // ── 6 · a different base on each side ───────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'ArrowLeftRight',
    eyebrow: 'The unknown on both sides',
    title: 'A Different Base on Each Side',
    content: 'Solve $2^{x + 1} = 5^x$, giving $x$ to 3 significant figures. Take logs of both sides, then it is a linear equation with some awkward numbers in it.',
    steps: [
      { text: '**Both powers come down:** $(x + 1)\\lg 2 = x \\lg 5$.' },
      { text: '**Multiply out the bracket:** $x \\lg 2 + \\lg 2 = x \\lg 5$.' },
      { text: '**Collect the** $x$ **terms on one side:** $\\lg 2 = x \\lg 5 - x \\lg 2 = x(\\lg 5 - \\lg 2)$.' },
      { text: '**Divide:** $x = \\dfrac{\\lg 2}{\\lg 5 - \\lg 2} = 0.756$.' },
    ],
    check: {
      id: 'chk_two_bases',
      q: 'Taking logs of $3^x = 2^{x + 4}$ gives $x\\lg 3 = (x + 4)\\lg 2$. Which line comes next?',
      options: [
        { val: 'A', text: '$x(\\lg 3 - \\lg 2) = 4$' },
        { val: 'B', text: '$x(\\lg 3 + \\lg 2) = 4\\lg 2$' },
        { val: 'C', text: '$x(\\lg 3 - \\lg 2) = 4\\lg 2$' },
        { val: 'D', text: '$x\\lg(3 - 2) = 4\\lg 2$' },
      ],
      correct: 'C',
      expEn: 'Multiply out: $x\\lg 3 = x\\lg 2 + 4\\lg 2$. Move $x\\lg 2$ across: $x(\\lg 3 - \\lg 2) = 4\\lg 2$. A forgets that the $4$ is multiplied by $\\lg 2$ too; B keeps the sign of $x\\lg 2$ when it crosses; D treats $\\lg 3 - \\lg 2$ as $\\lg(3 - 2)$, which is not a law.',
    },
  },

  // ── 7 · ask before you tell: the substitution ───────────────────────────
  {
    layout: 'callout',
    accent: PINK,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you turn the page',
    title: 'Two Powers of the Same Thing',
    content: 'Look closely at\n\n$$2^{2x} - 10\\left(2^x\\right) + 16 = 0$$\n\nTaking logs will not help here: there is no log law for a sum. But $2^{2x}$ and $2^x$ are related. Suppose you write $y$ for $2^x$.',
    activity: {
      id: 'act_predict_substitute',
      type: 'predict',
      prompt: 'With $y = 2^x$, what does the equation turn into?',
      options: [
        { val: 'quad', name: '$y^2 - 10y + 16 = 0$' },
        { val: 'twoY', name: '$2y - 10y + 16 = 0$' },
        { val: 'allSq', name: '$y^2 - 10y^2 + 16 = 0$' },
        { val: 'fourY', name: '$4y - 10y + 16 = 0$' },
      ],
      correct: 'quad',
      explain: 'By the index laws, $2^{2x} = \\left(2^x\\right)^2$, which is $y^2$ — not $2y$ and not $4y$. And $10\\left(2^x\\right)$ is just $10y$. So the equation is the quadratic $y^2 - 10y + 16 = 0$, hiding in disguise. That is why it is called a **hidden quadratic**.',
    },
  },

  // ── 8 · the picture ─────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PINK,
    icon: 'Variable',
    eyebrow: 'The substitution',
    title: 'A Quadratic in Disguise',
    inlineSvg: DIAGRAMS.SUBSTITUTE,
    drawThis: true,
    caption: 'When one power is the **square** of another, substitute: let $y$ stand for the simpler power. The equation becomes a quadratic in $y$, which you already know how to solve. The work is not over when you have $y$: each value of $y$ still has to be turned back into $x$.',
  },

  // ── 9 · a worked example ────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PINK,
    icon: 'PenLine',
    eyebrow: 'A hidden quadratic, worked',
    title: 'Substitute, Solve, Then Go Back to x',
    content: 'Solve $2^{2x} - 10\\left(2^x\\right) + 16 = 0$.',
    steps: [
      { text: '**Substitute.** Let $y = 2^x$: $y^2 - 10y + 16 = 0$.' },
      { text: '**Solve for** $y$**.** $(y - 2)(y - 8) = 0$, so $y = 2$ or $y = 8$.' },
      { text: '**Check each value can be a power.** Both are positive, so both are kept.' },
      { text: '**Back to** $x$**.** $2^x = 2$ gives $x = 1$, and $2^x = 8$ gives $x = 3$.' },
    ],
    notes: [
      { tone: 'write', text: 'Two values of $y$ can give two values of $x$ — or one, or none. The check in the third step decides.' },
    ],
    check: {
      id: 'chk_hidden_quadratic',
      q: 'Solve $3^{2x} - 4\\left(3^x\\right) + 3 = 0$.',
      options: [
        { val: 'A', text: '$x = 1$ or $x = 3$' },
        { val: 'B', text: '$x = 0$ or $x = 1$' },
        { val: 'C', text: '$x = 1$ only' },
        { val: 'D', text: '$x = -1$ or $x = -3$' },
      ],
      correct: 'B',
      expEn: 'With $y = 3^x$: $y^2 - 4y + 3 = (y - 1)(y - 3) = 0$, so $3^x = 1$ or $3^x = 3$, giving $x = 0$ or $x = 1$. A stops at the values of $y$; C throws away $3^x = 1$, but $3^0 = 1$, so $x = 0$ is a real solution; D takes the signs from the brackets.',
    },
  },

  // ── 10 · keep or reject, sorted ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'ShieldAlert',
    eyebrow: 'The check that matters',
    title: 'A Power Is Never Zero or Negative',
    inlineSvg: DIAGRAMS.POWER_POSITIVE,
    caption: 'The curve $y = 2^x$ is **above the axis everywhere**. Large powers are large; negative powers are small fractions, like $2^{-1} = \\tfrac{1}{2}$ — but still positive. So $2^x = 4$ and $2^x = \\tfrac{1}{2}$ have solutions, and $2^x = -3$ does not. When a hidden quadratic gives a value of $y$ that is zero or negative, **reject it**.',
    activity: {
      id: 'act_sort_keep',
      type: 'sort',
      prompt: 'Can the power really equal the number? Sort the seven equations.',
      bins: [
        { id: 'keep', name: 'It has a solution: keep' },
        { id: 'reject', name: 'No solution: reject' },
      ],
      cards: [
        { id: 'k1', name: '$5^x = 25$', bin: 'keep' },
        { id: 'k2', name: '$2^x = \\tfrac{1}{8}$', bin: 'keep' },
        { id: 'k3', name: '$3^x = -9$', bin: 'reject' },
        { id: 'k4', name: '$e^x = 0$', bin: 'reject' },
        { id: 'k5', name: '$7^x = 1$', bin: 'keep' },
        { id: 'k6', name: '$4^x = -\\tfrac{1}{4}$', bin: 'reject' },
        { id: 'k7', name: '$e^x = 0.02$', bin: 'keep' },
      ],
      explain: 'Only zero and negative numbers are rejected. $2^x = \\tfrac{1}{8}$ has the answer $x = -3$: a negative POWER gives a small positive number. $7^x = 1$ has the answer $x = 0$. $e^x = 0.02$ has an answer too, a little below $-3.9$. But no power of a positive number is ever $0$, $-9$ or $-\\tfrac{1}{4}$.',
    },
  },

  // ── 11 · a rejection, worked ────────────────────────────────────────────
  {
    layout: 'steps',
    accent: RED,
    icon: 'PenLine',
    eyebrow: 'A hidden quadratic with a value to reject',
    title: 'One Value Survives',
    content: 'Solve $2^{2x} - 3\\left(2^x\\right) - 10 = 0$, giving $x$ to 3 significant figures.',
    steps: [
      { text: 'Let $y = 2^x$: $y^2 - 3y - 10 = 0$, so $(y - 5)(y + 2) = 0$.' },
      { text: '$y = 5$ or $y = -2$.' },
      { text: '$2^x = -2$ has no solution, because $2^x$ is always positive. **Reject it**, and say why.' },
      { text: '$2^x = 5$: take logs, $x = \\dfrac{\\lg 5}{\\lg 2} = 2.32$.' },
    ],
    notes: [
      { tone: 'homework', text: 'An exam answer that keeps $2^x = -2$ loses the final mark, even when the other answer is right. Write the rejection down.' },
    ],
    check: {
      id: 'chk_no_solutions',
      q: 'How many solutions does $5^{2x} + 3\\left(5^x\\right) + 2 = 0$ have?',
      options: [
        { val: 'A', text: 'Two' },
        { val: 'B', text: 'One' },
        { val: 'C', text: 'None' },
        { val: 'D', text: 'Infinitely many' },
      ],
      correct: 'C',
      expEn: 'With $y = 5^x$: $y^2 + 3y + 2 = (y + 1)(y + 2) = 0$, so $y = -1$ or $y = -2$. Both are negative, and $5^x$ is never negative, so there are no solutions at all. A counts the values of $y$; B keeps one of them. You could also see it at a glance: every term on the left is positive, so they cannot add up to $0$.',
    },
  },

  // ── 12 · shifted and disguised powers, sorted ───────────────────────────
  {
    layout: 'statement',
    accent: PINK,
    icon: 'Split',
    eyebrow: 'Two more disguises',
    title: 'Split the Power, Spot the Square',
    label: 'Try it',
    labelIcon: 'Hourglass',
    text: 'A shifted power splits into a number times the power: $3^{x + 2} = 3^x \\times 3^2 = 9\\left(3^x\\right)$, and $3^{x - 1} = \\tfrac{1}{3}\\left(3^x\\right)$.',
    sub: 'A bigger base may be a square in disguise: $9^x = \\left(3^2\\right)^x = \\left(3^x\\right)^2$. Always let $y$ be the SMALLER base to the power $x$.',
    activity: {
      id: 'act_sort_in_y',
      type: 'sort',
      prompt: 'Let $y = 2^x$. Sort each expression by what it equals.',
      bins: [
        { id: 'y2', name: 'equals $y^2$' },
        { id: 'twoY', name: 'equals $2y$' },
        { id: 'fourY', name: 'equals $4y$' },
      ],
      cards: [
        { id: 'e1', name: '$2^{2x}$', bin: 'y2' },
        { id: 'e2', name: '$4^x$', bin: 'y2' },
        { id: 'e3', name: '$2^{x + 1}$', bin: 'twoY' },
        { id: 'e4', name: '$2^x + 2^x$', bin: 'twoY' },
        { id: 'e5', name: '$2^{x + 2}$', bin: 'fourY' },
        { id: 'e6', name: '$4 \\times 2^x$', bin: 'fourY' },
        { id: 'e7', name: '$2^{x + 1} + 2^{x + 1}$', bin: 'fourY' },
      ],
      explain: '$2^{2x}$ and $4^x$ are both $\\left(2^x\\right)^2 = y^2$. $2^{x + 1} = 2 \\times 2^x = 2y$, and so is $2^x + 2^x$ — adding two equal powers doubles them, it does not square them. $2^{x + 2} = 4 \\times 2^x = 4y$, and $2^{x + 1} + 2^{x + 1} = 2y + 2y = 4y$.',
    },
  },

  // ── 13 · the method in order ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'The whole method on one card',
    title: 'Hidden Quadratics, Start to Finish',
    content: 'Every hidden quadratic in this section is the same five moves — the five the Hidden Quadratic task walks you through. Put them in the order you would do them.',
    notes: [
      { tone: 'homework', text: 'Exam questions often say "use the substitution $y = 2^x$" or "show that the equation can be written as …". That is the first two moves done for you. Show every line after it.' },
    ],
    activity: {
      id: 'act_order_hidden',
      type: 'order',
      prompt: 'Put the five moves in order.',
      steps: [
        { id: 'h1', name: 'Write every power in terms of one simple power: split any shifts, spot any squares' },
        { id: 'h2', name: 'Let y stand for that power, and write the quadratic in y' },
        { id: 'h3', name: 'Solve the quadratic for y' },
        { id: 'h4', name: 'Reject any value of y that is zero or negative' },
        { id: 'h5', name: 'Turn each value that is left back into x' },
      ],
      explain: 'Rewrite, substitute, solve, reject, convert. The rejecting comes before converting: a negative value of $y$ has no $x$ to find, and trying to take its log gives an error.',
    },
  },

  // ── 14 · where e comes from ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Coins',
    eyebrow: 'A special number, met through money',
    title: 'Interest Added More and More Often',
    content: 'Put $1$ dollar in a bank paying $100\\%$ interest a year. Paid once, at the end of the year, you have $2$ dollars. Paid in two halves, you have $\\left(1 + \\tfrac{1}{2}\\right)^2 = 2.25$ dollars, because the second half earns interest on the first. Paid monthly, you have $\\left(1 + \\tfrac{1}{12}\\right)^{12} \\approx 2.61$ dollars.\n\n$$\\text{paid } n \\text{ times a year:} \\quad \\left(1 + \\frac{1}{n}\\right)^n \\text{ dollars}$$',
    activity: {
      id: 'act_estimate_e',
      type: 'estimate',
      prompt: 'The interest is paid every day, then every second, then more often still. What amount does $\\left(1 + \\frac{1}{n}\\right)^n$ get closer and closer to?',
      min: 2,
      max: 4,
      step: 0.01,
      answer: 2.72,
      tolerance: 0.02,
      explain: 'Paid daily it is $\\left(1 + \\tfrac{1}{365}\\right)^{365} \\approx 2.7146$. However often the interest is paid, the amount never passes $2.7182818\\ldots$ That number is called $e$. It does not grow without limit, and it never reaches $3$.',
    },
  },

  // ── 15 · e and ln ───────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Sparkles',
    eyebrow: 'Write this down · e and ln',
    title: 'The Number e and the Natural Log',
    inlineSvg: DIAGRAMS.E_LIMIT,
    drawThis: true,
    caption: '$e \\approx 2.718$ is **irrational**: its decimals never end and never repeat, like those of $\\pi$. It is the natural base for anything that grows or decays continuously, and you will meet its special properties again in calculus. A log to base $e$ is called a **natural logarithm** and written $\\ln$: $\\ln x$ means $\\log_e x$. Your calculator has an $e^x$ key and an $\\ln$ key.',
    notes: [
      { tone: 'write', text: '$\\ln x = \\log_e x$. Every law of logarithms you know works for $\\ln$ too: $\\ln ab = \\ln a + \\ln b$, and $\\ln a^n = n\\ln a$.' },
    ],
  },

  // ── 16 · the mirror graph, tapped ───────────────────────────────────────
  // A callout, not a showcase: a labelled copy of the figure beside the
  // hotspot would print the answer next to the question.
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'LineChart',
    eyebrow: 'The picture',
    title: 'The Two Graphs Are Mirror Images',
    content: 'Because $e^x$ and $\\ln x$ undo each other, their graphs are reflections of each other in the line $y = x$. Every point $(p, q)$ on one is $(q, p)$ on the other: $(0, 1)$ on $y = e^x$ matches $(1, 0)$ on $y = \\ln x$.\n\nIn the picture, $y = e^x$ is **blue**, $y = \\ln x$ is **red**, and the dashed line is $y = x$.',
    activity: {
      id: 'act_hotspot_ln_e',
      type: 'hotspot',
      prompt: 'Blue is $y = e^x$ and red is $y = \\ln x$. Tap the point that shows $\\ln e = 1$.',
      svg: DIAGRAMS.E_LN_MIRROR,
      viewBox: '0 0 560 420',
      targets: [
        { id: 'e_one', x: 386, y: 194, r: 22, name: 'the point (e, 1) on y = ln x' },
        { id: 'one_e', x: 300, y: 108, r: 22, name: 'the point (1, e) on y = e to the x' },
        { id: 'zero_one', x: 250, y: 194, r: 20, name: 'the point (0, 1) on y = e to the x' },
        { id: 'one_zero', x: 300, y: 244, r: 20, name: 'the point (1, 0) on y = ln x' },
      ],
      correct: 'e_one',
      explain: '$\\ln e = 1$ says that on $y = \\ln x$, when $x = e$ the height is $1$: the point $(e, 1)$. Its mirror image $(1, e)$ on $y = e^x$ says the same thing the other way round, $e^1 = e$. $(1, 0)$ shows $\\ln 1 = 0$.',
    },
  },

  // ── 17 · the inverse pair, and exact values ─────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Repeat',
    eyebrow: 'Write this down · the inverse pair',
    title: 'Each One Undoes the Other',
    inlineSvg: DIAGRAMS.UNDO_PAIR,
    drawThis: true,
    caption: 'For every $x$: $\\ln\\left(e^x\\right) = x$, and for every positive $x$: $e^{\\ln x} = x$. Use them to find exact values with no calculator. A number in front of $\\ln$ moves inside first, as a power: $e^{2\\ln 5} = e^{\\ln 25} = 25$. A power of $e$ may need rewriting first: $\\ln \\dfrac{1}{e^3} = \\ln e^{-3} = -3$.',
    check: {
      id: 'chk_exact_value',
      q: 'Find the exact value of $e^{-2\\ln 3}$.',
      options: [
        { val: 'A', text: '$\\dfrac{1}{9}$' },
        { val: 'B', text: '$-6$' },
        { val: 'C', text: '$-9$' },
        { val: 'D', text: '$9$' },
      ],
      correct: 'A',
      expEn: '$-2\\ln 3 = \\ln 3^{-2} = \\ln \\dfrac{1}{9}$, so $e^{-2\\ln 3} = e^{\\ln \\frac{1}{9}} = \\dfrac{1}{9}$. B multiplies $-2 \\times 3$ instead of using a power; C treats the minus sign as making the answer negative, but $e$ to any power is positive; D drops the minus sign.',
    },
  },

  // ── 18 · e^(…) = k ──────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Solving with e · two ways to give the answer',
    title: 'Take ln of Both Sides',
    content: 'Solve $e^{2x + 1} = 9$. The question always says which answer it wants: to 3 significant figures, or **exact**, which here means **in terms of ln**.',
    steps: [
      { text: '**Take ln of both sides.** $\\ln e^{2x + 1}$ is just the power, because $\\ln e = 1$: $2x + 1 = \\ln 9$.' },
      { text: '**Solve the linear equation:** $x = \\dfrac{\\ln 9 - 1}{2}$. That is the answer in terms of ln — stop here if that is what is asked.' },
      { text: '**For 3 significant figures**, only now use the calculator: $x = \\dfrac{2.1972 - 1}{2} = 0.599$.' },
    ],
    notes: [
      { tone: 'plant', text: 'The exact answer can be tidied with the laws of logs: $\\ln 9 = 2\\ln 3$, so $x = \\ln 3 - \\tfrac{1}{2}$. Either form earns the mark.' },
    ],
    check: {
      id: 'chk_in_terms_of_ln',
      q: 'Solve $e^{3x} = 20$, giving $x$ in terms of $\\ln$.',
      options: [
        { val: 'A', text: '$x = \\ln \\dfrac{20}{3}$' },
        { val: 'B', text: '$x = \\dfrac{\\ln 20}{3}$' },
        { val: 'C', text: '$x = 3\\ln 20$' },
        { val: 'D', text: '$x = \\dfrac{e^{20}}{3}$' },
      ],
      correct: 'B',
      expEn: 'Take ln: $3x = \\ln 20$, so $x = \\dfrac{\\ln 20}{3}$. A divides inside the log instead of dividing the log; C multiplies by $3$ instead of dividing; D raises $e$ to the power $20$, which is the opposite of taking ln.',
    },
  },

  // ── 19 · ln(…) = k ──────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'PenLine',
    eyebrow: 'When the unknown is inside the log',
    title: 'Make Each Side a Power of e',
    content: 'Solve $\\ln(2x - 5) = 3$, giving $x$ to 3 significant figures. Now the log is in the way, so use its inverse: raise $e$ to the power of each side.',
    steps: [
      { text: '**Undo the ln.** $e^{\\ln(2x - 5)} = e^3$, so $2x - 5 = e^3$.' },
      { text: '**Exact answer:** $x = \\dfrac{e^3 + 5}{2}$.' },
      { text: '**To 3 significant figures:** $e^3 = 20.086$, so $x = \\dfrac{25.086}{2} = 12.5$.' },
      { text: '**Check it exists:** $2x - 5 = e^3$ is positive, so the log is defined. It always will be: $e$ to any power is positive.' },
    ],
    check: {
      id: 'chk_undo_ln',
      q: 'Solve $\\ln(x + 4) = 2$, giving $x$ in exact form.',
      options: [
        { val: 'A', text: '$x = e^2 - 4$' },
        { val: 'B', text: '$x = e^{-2}$' },
        { val: 'C', text: '$x = \\ln 2 - 4$' },
        { val: 'D', text: '$x = 2e - 4$' },
      ],
      correct: 'A',
      expEn: 'Raise $e$ to each side: $x + 4 = e^2$, so $x = e^2 - 4$. B puts the $4$ into the power: $e^{2 - 4}$; C takes ln again instead of undoing it; D reads $e^2$ as $2 \\times e$.',
    },
  },

  // ── 20 · a hidden quadratic with e^(−x) ─────────────────────────────────
  {
    layout: 'steps',
    accent: PINK,
    icon: 'Variable',
    eyebrow: 'Hidden quadratics come back, with e',
    title: 'Clear the e to the Minus x First',
    content: 'Solve $e^x + 10e^{-x} = 7$, giving exact answers. $e^{-x} = \\dfrac{1}{e^x}$, so with $y = e^x$ the equation is $y + \\dfrac{10}{y} = 7$.',
    steps: [
      { text: '**Multiply every term by** $y$**:** $y^2 + 10 = 7y$, so $y^2 - 7y + 10 = 0$.' },
      { text: '**Solve:** $(y - 2)(y - 5) = 0$, so $y = 2$ or $y = 5$. Both are positive, so both are kept.' },
      { text: '**Back to** $x$ **with ln:** $e^x = 2$ gives $x = \\ln 2$, and $e^x = 5$ gives $x = \\ln 5$.' },
    ],
    notes: [
      { tone: 'plant', text: 'Never take ln of each term: $\\ln\\left(e^x + 10e^{-x}\\right)$ is not $x + \\ln 10 - x$. There is no log law for a sum.' },
    ],
    check: {
      id: 'chk_e_minus_x',
      q: 'Solve $e^x - 6e^{-x} = 1$.',
      options: [
        { val: 'A', text: '$x = \\ln 3$ or $x = \\ln(-2)$' },
        { val: 'B', text: '$x = 3$' },
        { val: 'C', text: '$x = \\ln 3$ or $x = \\ln 2$' },
        { val: 'D', text: '$x = \\ln 3$' },
      ],
      correct: 'D',
      expEn: 'Multiply by $y = e^x$: $y^2 - y - 6 = (y - 3)(y + 2) = 0$. $e^x = -2$ is rejected, so $x = \\ln 3$ only. A keeps the rejected value, and the ln of a negative number does not exist; B stops at the value of $e^x$; C takes the wrong sign from the bracket $(y + 2)$.',
    },
  },

  // ── 21 · growth and decay, sorted ───────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'TrendingUp',
    eyebrow: 'Practical applications',
    title: 'Growth and Decay',
    label: 'Try it',
    labelIcon: 'Hourglass',
    text: 'In $N = A e^{kt}$, $A$ is the value when $t = 0$, because $e^0 = 1$. A positive $k$ means **growth**; a negative $k$ means **decay**.',
    sub: 'The same is true with any base: $N = A b^t$ grows when $b > 1$ and decays when $0 < b < 1$. Watch for a minus sign in the power: it turns growth into decay, and decay back into growth.',
    activity: {
      id: 'act_sort_growth',
      type: 'sort',
      prompt: 'Sort the seven models. Does each one grow or decay as time goes on?',
      bins: [
        { id: 'grow', name: 'Growth' },
        { id: 'decay', name: 'Decay' },
      ],
      cards: [
        { id: 'g1', name: '$500e^{0.03t}$', bin: 'grow' },
        { id: 'g2', name: '$80(0.9)^t$', bin: 'decay' },
        { id: 'g3', name: '$200e^{-0.5t}$', bin: 'decay' },
        { id: 'g4', name: '$3 \\times 2^t$', bin: 'grow' },
        { id: 'g5', name: '$40(1.05)^t$', bin: 'grow' },
        { id: 'g6', name: '$12e^{-t}$', bin: 'decay' },
        { id: 'g7', name: '$100\\left(\\tfrac{1}{2}\\right)^{-t}$', bin: 'grow' },
      ],
      explain: '$0.9$ is less than $1$ and $e^{-0.5t}$, $e^{-t}$ have negative powers, so those three decay. The trap is $100\\left(\\tfrac{1}{2}\\right)^{-t}$: the minus sign flips the fraction, $\\left(\\tfrac{1}{2}\\right)^{-t} = 2^t$, so it grows.',
    },
  },

  // ── 22 · the cooling model, worked ──────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Thermometer',
    eyebrow: 'A model, worked in full',
    title: 'A Cup of Tea Cooling Down',
    inlineSvg: DIAGRAMS.COOLING,
    drawThis: true,
    caption: 'The temperature of a cup of tea $t$ minutes after it is made is $T = 70e^{-0.04t} + 20$ degrees. **At the start**, $t = 0$ and $e^0 = 1$: $T = 70 + 20 = 90$. **After 10 minutes**, $T = 70e^{-0.4} + 20 = 66.9$. **To reach 50**: $70e^{-0.04t} = 30$, so $e^{-0.04t} = \\tfrac{3}{7}$; take ln, $-0.04t = \\ln \\tfrac{3}{7}$, and $t = 21.2$ minutes. **In the long run** $e^{-0.04t}$ shrinks towards $0$, so $T$ settles towards $20$ — the temperature of the room.',
    check: {
      id: 'chk_cooling',
      q: 'For the same cup of tea, $T = 70e^{-0.04t} + 20$, what is the temperature after 30 minutes?',
      options: [
        { val: 'A', text: '$21.1$' },
        { val: 'B', text: '$27.1$' },
        { val: 'C', text: '$41.1$' },
        { val: 'D', text: '$252$' },
      ],
      correct: 'C',
      expEn: '$T = 70e^{-1.2} + 20 = 70 \\times 0.3012 + 20 = 41.1$. A forgets to add the $20$; B adds $70 + 20$ before multiplying by $e^{-1.2}$; D loses the minus sign in the power, so the tea heats up.',
    },
  },

  // ── 23 · finding the constant ───────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Timer',
    eyebrow: 'Finding the constant from one fact',
    title: 'Half Left Every Six Days',
    inlineSvg: DIAGRAMS.HALF_LIFE,
    caption: 'A substance decays so that $N = 80e^{-kt}$ after $t$ days, and half of it is left after $6$ days. Put the fact in: $40 = 80e^{-6k}$, so $e^{-6k} = \\tfrac{1}{2}$. Take ln: $-6k = \\ln \\tfrac{1}{2} = -\\ln 2$, so $k = \\dfrac{\\ln 2}{6} = 0.116$. The time for half to go is the **half-life**; for growth, the time to double is the **doubling time**.',
    check: {
      id: 'chk_doubling',
      q: 'An investment is worth $V = 200e^{kt}$ dollars after $t$ years, and it doubles in $10$ years. What is $k$?',
      options: [
        { val: 'A', text: '$k = 0.2$' },
        { val: 'B', text: '$k = 0.0693$' },
        { val: 'C', text: '$k = 14.4$' },
        { val: 'D', text: '$k = 0.0301$' },
      ],
      correct: 'B',
      expEn: '$400 = 200e^{10k}$, so $e^{10k} = 2$ and $10k = \\ln 2$: $k = \\dfrac{\\ln 2}{10} = 0.0693$. A divides $2$ by $10$ without taking a log; C divides the wrong way round, $\\dfrac{10}{\\ln 2}$; D uses $\\lg 2$ where base $e$ needs $\\ln 2$.',
    },
  },

  // ── 24 · recap ──────────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: VIOLET,
    icon: 'ListChecks',
    variant: 'checklist',
    columns: 2,
    eyebrow: 'Tick each one only if you could do it right now, unaided',
    title: 'What You Should Be Able to Do',
    items: [
      { text: 'Solve $a^x = b$ by taking logs of both sides, to 3 significant figures.' },
      { text: 'Bring down a whole power in a bracket, and undo the rest in reverse order.' },
      { text: 'Solve an equation with a different base on each side by collecting the $x$ terms.' },
      { text: 'Spot a hidden quadratic, including a shifted power or a disguised base, and substitute.' },
      { text: 'Reject any value of $y$ that is zero or negative, and say why.' },
      { text: 'Use $e^{\\ln x} = x$ and $\\ln e^x = x$ to find exact values and solve equations.' },
      { text: 'Solve $e^{(\\ldots)} = k$ and $\\ln(\\ldots) = k$, to 3 significant figures or in exact form.' },
      { text: 'Clear an $e^{-x}$ by multiplying through by $e^x$.' },
      { text: 'Use a growth or decay model: the start value, a later value, a time, and the constant.' },
      { text: 'Round only at the end, and give the number of significant figures asked for.' },
    ],
    check: {
      id: 'chk_recap',
      q: 'How many solutions does $e^{2x} - 5e^x + 4 = 0$ have?',
      options: [
        { val: 'A', text: 'One' },
        { val: 'B', text: 'None' },
        { val: 'C', text: 'Four' },
        { val: 'D', text: 'Two' },
      ],
      correct: 'D',
      expEn: 'With $y = e^x$: $(y - 1)(y - 4) = 0$, so $e^x = 1$ or $e^x = 4$. Both are positive, so both are kept: $x = 0$ and $x = \\ln 4$. A throws away $e^x = 1$, but $e^0 = 1$; B forgets that positive values are kept; C counts the numbers in the brackets.',
    },
  },
];
