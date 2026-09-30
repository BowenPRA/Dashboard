// src/data/ADD_MATH/AM_5C/notes.js
// AM_5C — Log Equations and Change of Base.
// Cambridge IGCSE Additional Mathematics 0606, sections 5.4 and 5.6.
//
// Twenty-four slides, one idea each, following Part 1 of the two problem
// banks (docs/add-math-5-4-log-equations.md, docs/add-math-5-6-change-of-base.md).
// Twenty-one scored items carry the NOTES score: thirteen checks and eight
// activities (predict ×2, numberline, order, hotspot, sort ×2, estimate).
//
// THE SPINE — "check every root" is the main idea, so it comes first:
//   1–6    ask before you tell: the algebra gives two roots, how many are
//          solutions? Then the rule (check in the ORIGINAL equation), where
//          every log exists (shaded), why combining lets false roots in, and
//          the method in order.
//   7–13   5.4 A–C: logs on both sides, a number on one side, a quadratic
//          with a root rejected (tapped on the number line), keep-or-reject
//          sorted, a negative x that survives, and an equation where nothing
//          does.
//   14     5.4 D: an unknown base, and the three things a log needs.
//   15–17  5.4 E: a quadratic in a log, the trap of dividing by the log, and
//          a log of a power against a power of a log (sorted).
//   18–23  5.6: the rule and its proof, evaluating with lg (estimated first),
//          the reciprocal case, related bases (predicted), and the worked
//          equation in two related bases with a root rejected.
//   24     the recap.
//
// House notes:
//  · ENGLISH ONLY — ADD_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Titles are narrated and are plain text: no maths, no bare symbols.
//  · Every example here is fresh: none is a book question, and none is an
//    item from the three log tasks, the Practice set or the Quiz.
import { DIAGRAMS } from './diagrams.js';

const VIOLET = '#6d28d9';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const AMBER = '#d97706';
const PURPLE = '#a855f7';
const RED = '#ef4444';

export const notes = [
  {
    layout: 'hero',
    color: VIOLET,
    icon: 'ShieldCheck',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 5 · Logarithmic and exponential functions · 5.4 and 5.6',
    title: 'Log Equations and Change of Base',
    objective: 'I can solve an equation with logs in it and check every root in the original equation, solve a quadratic in a log, and change the base of a log to evaluate it, rewrite it or solve with it.',
  },

  // ── 2 · ask before you tell ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you turn the page',
    title: 'Two Roots From the Algebra',
    content: 'A student solves\n\n$$\\log_2 x + \\log_2(x - 3) = 2$$\n\nThe algebra ends with $x^2 - 3x - 4 = 0$, so $x = 4$ or $x = -1$. Every step was correct.',
    activity: {
      id: 'act_predict_roots',
      type: 'predict',
      prompt: 'How many of these two values are solutions of the ORIGINAL equation?',
      options: [
        { val: 'both', name: 'Both: the algebra was correct, so both roots work' },
        { val: 'four', name: 'Only $x = 4$' },
        { val: 'minus', name: 'Only $x = -1$' },
        { val: 'none', name: 'Neither of them' },
      ],
      correct: 'four',
      explain: 'Put $x = -1$ back in: the first log becomes $\\log_2(-1)$, and no power of $2$ is negative, so that log does not exist. $x = -1$ is rejected. At $x = 4$ the insides are $4$ and $1$, both positive, and $\\log_2 4 + \\log_2 1 = 2 + 0 = 2$. Only $x = 4$ is a solution.',
    },
  },

  // ── 3 · the rule ────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'ShieldCheck',
    eyebrow: 'The one rule that matters',
    title: 'Check Every Root in the Original Equation',
    inlineSvg: DIAGRAMS.CHECK_GATE,
    caption: 'The algebra of a log equation can produce values that make a log **undefined**. So the last step is always the same: put each root back into the **original** equation and look inside every log. A root that puts **zero or a negative number** inside any log is **rejected**.',
    notes: [
      { tone: 'write', text: 'Every root must be checked in the ORIGINAL equation. Write "reject" next to a root that fails, and say why.' },
    ],
    check: {
      id: 'chk_check_rule',
      q: 'Solving an equation with logs in it gives $x = 5$ and $x = -2$. What must you do before you write the answer?',
      options: [
        { val: 'A', text: 'Keep the positive one: roots of a log equation are never negative' },
        { val: 'B', text: 'Check each one in the last line of the working' },
        { val: 'C', text: 'Check each one in the original equation' },
        { val: 'D', text: 'Reject both and start again' },
      ],
      correct: 'C',
      expEn: 'Only the original equation can tell you. A is wrong because a negative $x$ can be fine when every inside is still positive. B is the trap: both roots always satisfy the last line, because that is where they came from. D throws away a root that may be good.',
    },
  },

  // ── 4 · where every log exists ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Where the answer is allowed to be',
    title: 'Where Every Log Exists',
    content: 'A log needs a **positive** number inside. In $\\log_2 x + \\log_2(x - 3) = 2$ there are two insides, so two conditions must hold at once:\n\n$$x > 0 \\quad\\text{and}\\quad x - 3 > 0$$\n\nA root outside this region can never be a solution.',
    activity: {
      id: 'act_line_domain',
      type: 'numberline',
      prompt: 'Shade every $x$ for which BOTH logs exist.',
      display: 'x > 0 \\text{ and } x - 3 > 0',
      solution: 'x > 3',
      min: -4,
      max: 7,
      explain: 'Both conditions hold only when $x > 3$: a number bigger than $3$ is automatically bigger than $0$. The circle at $3$ is **open**, because there the second inside is $0$ and $\\log_2 0$ does not exist. The root $x = -1$ is nowhere near this region.',
    },
  },

  // ── 5 · why false roots appear ──────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Where false roots come from',
    title: 'Combining Lets Extra Values In',
    inlineSvg: DIAGRAMS.DOMAIN_WIDEN,
    drawThis: true,
    caption: 'Two separate logs need **both** insides positive. But once they are combined into $\\log_2\\big(x(x - 3)\\big)$, only the **product** has to be positive, and a product of two negatives is positive too. So the combined equation accepts values such as $x = -1$ that the original never could. The algebra is right; it just answers a slightly wider question.',
  },

  // ── 6 · the method in order ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'ListChecks',
    eyebrow: 'The whole method on one card',
    title: 'Solving a Log Equation',
    content: 'Every log equation in this unit is the same few moves. The power law comes first whenever there is a number in front of a log.',
    notes: [
      { tone: 'homework', text: 'The check is worth a mark in the exam. A root left in without comment loses it, even when the rest is perfect.' },
    ],
    activity: {
      id: 'act_order_method',
      type: 'order',
      prompt: 'Put the five moves in order.',
      steps: [
        { id: 'm1', name: 'Power law: move each number in front of a log inside, as a power' },
        { id: 'm2', name: 'Combine each side into a single log' },
        { id: 'm3', name: 'Remove the logs: equal logs mean equal numbers, or use exponential form' },
        { id: 'm4', name: 'Solve the equation that is left' },
        { id: 'm5', name: 'Check every root in the original equation' },
      ],
      explain: 'Power law, combine, remove, solve, check. The laws only combine logs with a coefficient of 1, the logs can only come off once each side is a single log, and the check has to come last, on the original equation.',
    },
  },

  // ── 7 · type A ──────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Equal',
    eyebrow: 'Logs on both sides',
    title: 'Equal Logs Mean Equal Numbers',
    content: 'Solve $\\log_4(x + 6) - \\log_4 2 = \\log_4(x - 1)$.',
    steps: [
      { text: 'Combine the left side. A minus divides: $\\log_4\\left(\\dfrac{x + 6}{2}\\right) = \\log_4(x - 1)$.' },
      { text: 'Both sides are single logs to base $4$, so the insides are equal: $\\dfrac{x + 6}{2} = x - 1$.' },
      { text: 'Multiply by $2$: $x + 6 = 2x - 2$, so $x = 8$.' },
      { text: 'Check: at $x = 8$ the insides are $14$, $2$ and $7$. All positive, so keep $x = 8$.' },
    ],
    check: {
      id: 'chk_type_a',
      q: 'Solve $\\log_6 x + \\log_6 4 = \\log_6 28$.',
      options: [
        { val: 'A', text: '$x = 7$' },
        { val: 'B', text: '$x = 24$' },
        { val: 'C', text: '$x = 112$' },
        { val: 'D', text: '$x = 6^{7}$' },
      ],
      correct: 'A',
      expEn: 'Adding logs multiplies the insides: $\\log_6 4x = \\log_6 28$, so $4x = 28$ and $x = 7$, which is positive. B adds the insides ($x + 4 = 28$); C multiplies by $4$ instead of dividing; D uses exponential form, which is for a plain number on the other side, not a log.',
    },
  },

  // ── 8 · type B ──────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Superscript',
    eyebrow: 'A number on one side',
    title: 'Exponential Form Removes the Log',
    content: 'Solve $\\lg(x + 9) - \\lg x = 1$. The right side is a plain number, not a log, so the log comes off by the definition.',
    steps: [
      { text: 'Combine: $\\lg\\left(\\dfrac{x + 9}{x}\\right) = 1$.' },
      { text: 'Exponential form. lg means base $10$, so the inside is $10^1$: $\\dfrac{x + 9}{x} = 10$.' },
      { text: 'Multiply by $x$: $x + 9 = 10x$, so $9x = 9$ and $x = 1$.' },
      { text: 'Check: at $x = 1$ the insides are $10$ and $1$. Keep $x = 1$.' },
    ],
    notes: [
      { tone: 'write', text: '$\\log_b(\\ldots) = k$ means $(\\ldots) = b^k$. The number $k$ is a POWER.' },
    ],
    check: {
      id: 'chk_type_b',
      q: 'Solve $\\log_3(2x - 1) = 2$.',
      options: [
        { val: 'A', text: '$x = \\frac{3}{2}$' },
        { val: 'B', text: '$x = 5$' },
        { val: 'C', text: '$x = \\frac{7}{2}$' },
        { val: 'D', text: '$x = \\frac{9}{2}$' },
      ],
      correct: 'B',
      expEn: 'Exponential form: $2x - 1 = 3^2 = 9$, so $x = 5$, and the inside is $9$, positive. A drops the log and sets $2x - 1 = 2$; C multiplies the base by the power ($2x - 1 = 6$); D swaps them ($2^3 = 8$).',
    },
  },

  // ── 9 · type C, worked ──────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: AMBER,
    icon: 'PenLine',
    eyebrow: 'Leading to a quadratic',
    title: 'Two Roots, One Survivor',
    content: 'Solve $\\lg x + \\lg(x - 15) = 2$.',
    steps: [
      { text: 'Combine: $\\lg\\big(x(x - 15)\\big) = 2$.' },
      { text: 'Exponential form: $x(x - 15) = 10^2 = 100$.' },
      { text: 'Tidy and factorise: $x^2 - 15x - 100 = 0$, so $(x - 20)(x + 5) = 0$ and $x = 20$ or $x = -5$.' },
      { text: 'Check $x = -5$: $\\lg(-5)$ does not exist, so **reject** it. Check $x = 20$: the insides are $20$ and $5$, so keep it. The answer is $x = 20$ only.' },
    ],
    check: {
      id: 'chk_type_c',
      q: 'The algebra for $\\log_2 x + \\log_2(x + 6) = 4$ gives $x = 2$ or $x = -8$. What is the solution?',
      options: [
        { val: 'A', text: '$x = 2$ or $x = -8$' },
        { val: 'B', text: 'There is no solution' },
        { val: 'C', text: '$x = -8$ only' },
        { val: 'D', text: '$x = 2$ only' },
      ],
      correct: 'D',
      expEn: 'At $x = -8$ the first inside is $-8$, so $\\log_2(-8)$ does not exist: reject it. At $x = 2$ the insides are $2$ and $8$, and $1 + 3 = 4$. A skips the check; B rejects a good root; C keeps the wrong one.',
    },
  },

  // ── 10 · the roots on the line, tapped ──────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'The check, as a picture',
    title: 'Which Root Lands Where',
    content: 'Both logs in $\\lg x + \\lg(x - 15) = 2$ exist only when $x > 15$. The picture shades that region green on a number line, and marks the two roots the algebra produced. One is inside the band and one is outside it.',
    activity: {
      id: 'act_hotspot_reject',
      type: 'hotspot',
      prompt: 'Tap the root that must be rejected.',
      svg: DIAGRAMS.ROOTS_ON_LINE,
      viewBox: '0 0 560 200',
      targets: [
        { id: 'neg', x: 110, y: 112, r: 24, name: 'the root outside the band' },
        { id: 'pos', x: 460, y: 112, r: 24, name: 'the root inside the band' },
        { id: 'edge', x: 390, y: 112, r: 16, name: 'the edge of the band' },
      ],
      correct: 'neg',
      explain: 'The root at $x = -5$ is outside the band, where $\\lg x$ does not exist, so it is rejected. The root $x = 20$ is inside the band and survives. The edge, $x = 15$, is not a root at all: there $\\lg(x - 15)$ would be $\\lg 0$.',
    },
  },

  // ── 11 · keep or reject, sorted ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'ShieldCheck',
    eyebrow: 'Practise the check',
    title: 'Keep or Reject',
    content: 'Each card is a root that the algebra produced. Look inside every log of the equation at that value, and at the base if the base is $x$.',
    activity: {
      id: 'act_sort_keep',
      type: 'sort',
      prompt: 'Sort the seven roots. Keep or reject?',
      bins: [
        { id: 'keep', name: 'Keep' },
        { id: 'reject', name: 'Reject' },
      ],
      cards: [
        { id: 'k1', name: '$\\log_2(x + 5) = 3$, root $x = 3$', bin: 'keep' },
        { id: 'k2', name: '$\\log_2 x + \\log_2(x - 2) = 3$, root $x = -2$', bin: 'reject' },
        { id: 'k3', name: '$\\log_3(x + 10) = 2$, root $x = -1$', bin: 'keep' },
        { id: 'k4', name: '$\\log_x 36 = 2$, root $x = -6$', bin: 'reject' },
        { id: 'k5', name: '$\\log_x 36 = 2$, root $x = 6$', bin: 'keep' },
        { id: 'k6', name: '$\\log_5(x - 4) = \\log_5(2x - 3)$, root $x = -1$', bin: 'reject' },
        { id: 'k7', name: '$\\lg(x^2) = 2$, root $x = -10$', bin: 'keep' },
      ],
      explain: 'Two negative roots are KEPT: in $\\log_3(x + 10)$ the inside at $x = -1$ is $9$, and in $\\lg(x^2)$ the inside at $x = -10$ is $100$. What matters is the inside, not the sign of $x$. $x = -6$ is rejected because a base must be positive, and $x = -1$ in the last equation puts $-5$ inside both logs.',
    },
  },

  // ── 12 · test the inside ────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The mistake in the other direction',
    title: 'A Negative Root Is Not Always Wrong',
    inlineSvg: DIAGRAMS.INSIDE_NOT_X,
    caption: 'Rejecting every negative root is as wrong as keeping every root. The test is what goes **inside** each log. The same $x = -1$ puts $9$ inside $\\log_3(x + 10)$, which is fine, and $-3$ inside $\\log_3(x - 2)$, which is not.',
    check: {
      id: 'chk_inside',
      q: 'Solving $\\log_4(x + 20) = 2$ gives $x = -4$. Keep it or reject it?',
      options: [
        { val: 'A', text: 'Reject it: $x$ is negative' },
        { val: 'B', text: 'Keep it: the inside is $16$, which is positive' },
        { val: 'C', text: 'Reject it: $16$ is not a power of $4$' },
        { val: 'D', text: 'Keep it: every root of a log equation is kept' },
      ],
      correct: 'B',
      expEn: 'At $x = -4$ the inside is $-4 + 20 = 16$, and $\\log_4 16 = 2$. Keep it. A tests $x$ instead of the inside; C is false, since $16 = 4^2$; D is the right answer for the wrong reason: many roots are rejected.',
    },
  },

  // ── 13 · when nothing survives ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'CircleSlash',
    eyebrow: 'The check can reject everything',
    title: 'When No Root Survives',
    content: 'Solve $\\log_3(x - 5) = \\log_3(1 - x)$. The insides are equal:\n\n$$x - 5 = 1 - x \\quad\\Rightarrow\\quad x = 3$$\n\nBut at $x = 3$ the first inside is $3 - 5 = -2$, and the second is $1 - 3 = -2$. Neither log exists. The only root is rejected, so the equation has **no solution**. Write that, rather than keeping a root you know is wrong.',
    check: {
      id: 'chk_none',
      q: 'What is the solution of $\\log_2(x - 6) = \\log_2(4 - x)$?',
      options: [
        { val: 'A', text: '$x = 5$' },
        { val: 'B', text: '$x = -5$' },
        { val: 'C', text: 'There is no solution' },
        { val: 'D', text: '$x = 5$ or $x = -1$' },
      ],
      correct: 'C',
      expEn: 'The insides are equal, so $x - 6 = 4 - x$ and $x = 5$. But at $x = 5$ the first inside is $-1$: $\\log_2(-1)$ does not exist, so the only root is rejected. A forgets to check; B is a slip in the algebra; D invents a second root.',
    },
  },

  // ── 14 · type D: an unknown base ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Scale',
    eyebrow: 'The unknown is the base',
    title: 'What a Log Needs',
    inlineSvg: DIAGRAMS.THREE_RULES,
    caption: 'When the unknown is the base, it must obey the rules for a base. $\\log_x 98 - \\log_x 2 = 2$ combines to $\\log_x 49 = 2$, so $x^2 = 49$ and $x = 7$ or $x = -7$. A base cannot be negative, so reject $x = -7$: the answer is $x = 7$.',
    notes: [
      { tone: 'write', text: 'Inside a log: positive. The base: positive, and not $1$.' },
    ],
    check: {
      id: 'chk_base',
      q: 'Solve $\\log_x 125 = 3$.',
      options: [
        { val: 'A', text: '$x = 5$' },
        { val: 'B', text: '$x = 5$ or $x = -5$' },
        { val: 'C', text: '$x = \\frac{125}{3}$' },
        { val: 'D', text: '$x = \\sqrt{125}$' },
      ],
      correct: 'A',
      expEn: 'Exponential form: $x^3 = 125$, so $x = 5$. B: a cube has only one real root, and $(-5)^3 = -125$ anyway, and a base could not be negative; C divides by the power instead of taking a root; D takes a square root where the power is $3$.',
    },
  },

  // ── 15 · type E: a quadratic in a log ───────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Variable',
    eyebrow: 'The same log, twice',
    title: 'A Quadratic in a Log',
    content: 'Solve $(\\log_3 x)^2 - 5\\log_3 x + 4 = 0$. The same log appears twice, once squared, so give it a letter.',
    steps: [
      { text: 'Let $u = \\log_3 x$. The equation is $u^2 - 5u + 4 = 0$.' },
      { text: 'Factorise: $(u - 1)(u - 4) = 0$, so $u = 1$ or $u = 4$.' },
      { text: 'Go back to $x$. $\\log_3 x = 1$ gives $x = 3^1 = 3$, and $\\log_3 x = 4$ gives $x = 3^4 = 81$.' },
      { text: 'A power of $3$ is always positive, so both logs exist: $x = 3$ or $x = 81$.' },
    ],
    check: {
      id: 'chk_quad',
      q: '$(\\log_2 x)^2 - 4\\log_2 x + 3 = 0$ gives $u = 1$ or $u = 3$, where $u = \\log_2 x$. What are the values of $x$?',
      options: [
        { val: 'A', text: '$x = 1$ or $x = 3$' },
        { val: 'B', text: '$x = 2$ or $x = 6$' },
        { val: 'C', text: '$x = 2$ or $x = 8$' },
        { val: 'D', text: '$x = 1$ or $x = 9$' },
      ],
      correct: 'C',
      expEn: '$u = \\log_2 x$ means $x = 2^u$: $2^1 = 2$ and $2^3 = 8$. A stops at $u$; B multiplies $2$ by $u$ instead of raising it to the power; D squares $u$.',
    },
  },

  // ── 16 · the trap: dividing by the log ──────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'Divide',
    eyebrow: 'The root that goes missing',
    title: 'Never Divide by the Log',
    content: 'Faced with $(\\log_2 x)^2 = 3\\log_2 x$, it is tempting to divide both sides by $\\log_2 x$ and write $\\log_2 x = 3$. That throws a root away. Take out the common factor instead:\n\n$$u^2 - 3u = 0 \\quad\\Rightarrow\\quad u(u - 3) = 0$$\n\nSo $u = 0$ or $u = 3$, which gives $x = 1$ or $x = 8$. The root $x = 1$ is real: $\\log_2 1 = 0$, and $0^2 = 3 \\times 0$.',
    check: {
      id: 'chk_divide',
      q: 'Solve $(\\lg x)^2 = 2\\lg x$.',
      options: [
        { val: 'A', text: '$x = 100$ only' },
        { val: 'B', text: '$x = 0$ or $x = 100$' },
        { val: 'C', text: '$x = 1$ or $x = 2$' },
        { val: 'D', text: '$x = 1$ or $x = 100$' },
      ],
      correct: 'D',
      expEn: '$u^2 - 2u = 0$ gives $u = 0$ or $u = 2$, so $x = 10^0 = 1$ or $x = 10^2 = 100$. A divides by $\\lg x$ and loses $u = 0$; B turns $u = 0$ into $x = 0$, but $x = 10^0$; C stops at $u = 2$ instead of going back to $x$.',
    },
  },

  // ── 17 · a log of a power, or a power of a log ──────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Superscript',
    eyebrow: 'Where the power sits matters',
    title: 'A Log of a Power or a Power of a Log',
    label: 'Try it',
    labelIcon: 'Hourglass',
    text: 'A power INSIDE the log comes down to the front. A power on the WHOLE log stays as a square.',
    sub: 'With $u = \\log_3 x$: $\\log_3(x^2) = 2u$, but $(\\log_3 x)^2 = u^2$. Bring every power inside a log down before you substitute.',
    activity: {
      id: 'act_sort_power',
      type: 'sort',
      prompt: 'With $u = \\log_3 x$, sort each expression by what it becomes.',
      bins: [
        { id: 'two', name: '$2u$' },
        { id: 'sq', name: '$u^2$' },
        { id: 'half', name: '$\\frac{1}{2}u$' },
      ],
      cards: [
        { id: 'p1', name: '$\\log_3(x^2)$', bin: 'two' },
        { id: 'p2', name: '$(\\log_3 x)^2$', bin: 'sq' },
        { id: 'p3', name: '$2\\log_3 x$', bin: 'two' },
        { id: 'p4', name: '$\\log_3 x \\times \\log_3 x$', bin: 'sq' },
        { id: 'p5', name: '$\\log_3 \\sqrt{x}$', bin: 'half' },
        { id: 'p6', name: '$\\log_3 x^2$', bin: 'two' },
        { id: 'p7', name: '$\\frac{1}{2}\\log_3 x$', bin: 'half' },
      ],
      explain: '$\\log_3 x^2$ with no brackets still means the log of $x^2$, so it is $2u$: the power law brings the $2$ down. Only a power on the whole log, $(\\log_3 x)^2$, is $u^2$. A square root is a power of $\\tfrac{1}{2}$, so $\\log_3 \\sqrt{x} = \\tfrac{1}{2}u$.',
    },
  },

  // ── 18 · the change of base rule, and why ───────────────────────────────
  {
    layout: 'steps',
    accent: VIOLET,
    icon: 'ArrowLeftRight',
    eyebrow: 'Section 5.6 · change of base',
    title: 'The Change of Base Rule',
    content: 'Sometimes a log is in a base you cannot work with: a calculator has only lg, or an equation mixes base $2$ with base $4$. The change of base rule rewrites a log in any base you choose:\n\n$$\\log_b a = \\dfrac{\\log_c a}{\\log_c b}$$\n\nWhy it works, in four lines:',
    steps: [
      { text: 'Call the log $y$: $y = \\log_b a$.' },
      { text: 'Write it as a power: $b^y = a$.' },
      { text: 'Take logs to base $c$ of both sides: $\\log_c(b^y) = \\log_c a$.' },
      { text: 'Power law: $y\\log_c b = \\log_c a$, so $y = \\dfrac{\\log_c a}{\\log_c b}$.' },
    ],
    notes: [
      { tone: 'write', text: '$\\log_b a = \\dfrac{\\log_c a}{\\log_c b}$, for positive $a$, $b$ and $c$, with $b \\neq 1$ and $c \\neq 1$.' },
    ],
  },

  // ── 19 · any base on a calculator ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Calculator',
    eyebrow: 'Estimate first, then calculate',
    title: 'Any Base on a Calculator',
    inlineSvg: DIAGRAMS.CHANGE_BASE,
    caption: 'The number goes on top, the old base goes underneath, and both are logs to the same new base. On a calculator the new base is $10$. Always estimate first, from the powers of the base: it catches a division done upside down.',
    activity: {
      id: 'act_estimate_log',
      type: 'estimate',
      prompt: 'No calculator yet. Estimate $\\log_2 20$.',
      min: 0,
      max: 10,
      step: 0.05,
      answer: 4.32,
      tolerance: 0.06,
      explain: '$2^4 = 16$ and $2^5 = 32$, so $\\log_2 20$ is between $4$ and $5$, and nearer $4$, because $20$ is only a little past $16$. The calculator gives $\\lg 20 \\div \\lg 2 \\approx 4.32$.',
    },
  },

  // ── 20 · evaluating with lg ─────────────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Calculator',
    eyebrow: 'Worked example',
    title: 'Evaluating a Log With lg',
    content: 'Evaluate $\\log_6 40$, correct to $3$ significant figures.',
    steps: [
      { text: 'Estimate: $6^2 = 36$ and $6^3 = 216$, so the answer is a little more than $2$.' },
      { text: 'Change to base $10$: $\\log_6 40 = \\dfrac{\\lg 40}{\\lg 6}$.' },
      { text: 'Calculator: $\\dfrac{1.6021}{0.7782} = 2.0588\\ldots$' },
      { text: 'To $3$ significant figures, $2.06$. It agrees with the estimate.' },
    ],
    check: {
      id: 'chk_evaluate',
      q: 'What is $\\log_5 30$, correct to $3$ significant figures?',
      options: [
        { val: 'A', text: '$0.473$' },
        { val: 'B', text: '$0.778$' },
        { val: 'C', text: '$6$' },
        { val: 'D', text: '$2.11$' },
      ],
      correct: 'D',
      expEn: '$\\lg 30 \\div \\lg 5 = 1.4771 \\div 0.6990 = 2.113\\ldots$, and $5^2 = 25$ is just under $30$, so an answer a little over $2$ is right. A divides upside down; B is $\\lg(30 \\div 5)$, a log of a quotient; C divides the numbers themselves.',
    },
  },

  // ── 21 · the reciprocal case ────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Repeat',
    eyebrow: 'A special case worth knowing',
    title: 'Swapping the Base and the Number',
    inlineSvg: DIAGRAMS.SWAP_RECIPROCAL,
    caption: 'Choose the new base to be the NUMBER, and the top becomes $1$: $\\log_b a = \\dfrac{\\log_a a}{\\log_a b} = \\dfrac{1}{\\log_a b}$. So a log with $x$ as its base is $1$ over a log with $x$ inside: $\\log_x 2 = \\dfrac{1}{\\log_2 x}$. That is what turns an equation into a quadratic.',
    check: {
      id: 'chk_reciprocal',
      q: 'With $u = \\log_2 x$, what does $\\log_2 x + 3\\log_x 2 = 4$ become?',
      options: [
        { val: 'A', text: '$u + 3u = 4$' },
        { val: 'B', text: '$u + \\dfrac{3}{u} = 4$' },
        { val: 'C', text: '$u + \\dfrac{u}{3} = 4$' },
        { val: 'D', text: '$u - 3u = 4$' },
      ],
      correct: 'B',
      expEn: '$\\log_x 2 = \\dfrac{1}{u}$, so the equation is $u + \\dfrac{3}{u} = 4$. Multiplying by $u$ gives $u^2 - 4u + 3 = 0$: $u = 1$ or $3$, so $x = 2$ or $8$. A treats $\\log_x 2$ as $\\log_2 x$; C puts the $3$ underneath; D changes a sign.',
    },
  },

  // ── 22 · related bases ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Ruler',
    eyebrow: 'When one base is a power of the other',
    title: 'Related Bases',
    inlineSvg: DIAGRAMS.RELATED_LADDERS,
    caption: 'When one base is a power of the other, the change is a simple fraction. $\\log_9 x = \\dfrac{\\log_3 x}{\\log_3 9} = \\dfrac{1}{2}\\log_3 x$: every step up the ladder of $9$ is two steps up the ladder of $3$.',
    activity: {
      id: 'act_predict_related',
      type: 'predict',
      prompt: 'How does $\\log_8 x$ compare with $\\log_2 x$?',
      options: [
        { val: 'third', name: 'It is one third of $\\log_2 x$' },
        { val: 'triple', name: 'It is three times $\\log_2 x$' },
        { val: 'eighth', name: 'It is one eighth of $\\log_2 x$' },
        { val: 'same', name: 'It is the same as $\\log_2 x$' },
      ],
      correct: 'third',
      explain: '$\\log_8 x = \\dfrac{\\log_2 x}{\\log_2 8} = \\dfrac{\\log_2 x}{3}$. A bigger base climbs faster, so its log is SMALLER: one step of $8$ is three steps of $2$. It is not an eighth, because you divide by $\\log_2 8 = 3$, not by $8$.',
    },
  },

  // ── 23 · two related bases in one equation ──────────────────────────────
  {
    layout: 'steps',
    accent: RED,
    icon: 'PenLine',
    eyebrow: 'Worked example · two bases',
    title: 'Change to the Smaller Base',
    content: 'Solve $\\log_2(x + 1) = \\log_4(x + 7)$.',
    steps: [
      { text: 'Change the base-$4$ log to base $2$: $\\log_4(x + 7) = \\dfrac{\\log_2(x + 7)}{\\log_2 4} = \\dfrac{1}{2}\\log_2(x + 7)$.' },
      { text: 'Multiply by $2$ and use the power law: $\\log_2\\big((x + 1)^2\\big) = \\log_2(x + 7)$.' },
      { text: 'Equal logs: $(x + 1)^2 = x + 7$, so $x^2 + x - 6 = 0$, giving $x = 2$ or $x = -3$.' },
      { text: 'Check $x = -3$: the inside $x + 1$ is $-2$, so **reject** it. Check $x = 2$: the insides are $3$ and $9$. The answer is $x = 2$.' },
    ],
    check: {
      id: 'chk_related',
      q: 'In $\\log_3 x = \\log_9(x + 12)$, what does $\\log_9(x + 12)$ become in base $3$?',
      options: [
        { val: 'A', text: '$2\\log_3(x + 12)$' },
        { val: 'B', text: '$\\log_3(x + 12) - 2$' },
        { val: 'C', text: '$\\log_3\\left(\\dfrac{x + 12}{2}\\right)$' },
        { val: 'D', text: '$\\dfrac{1}{2}\\log_3(x + 12)$' },
      ],
      correct: 'D',
      expEn: 'Divide by $\\log_3 9 = 2$: $\\log_9(x + 12) = \\dfrac{1}{2}\\log_3(x + 12)$. A multiplies by $2$ instead of dividing; B subtracts it; C halves the number inside, which is a different thing altogether.',
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
      { text: 'Combine each side of a log equation into a single log, power law first.' },
      { text: 'Remove the logs: equal logs mean equal numbers; a number on one side means exponential form.' },
      { text: 'Check every root in the original equation, and reject one that puts zero or a negative inside a log.' },
      { text: 'Keep a negative root when every inside is still positive.' },
      { text: 'Reject a negative or unit base when the unknown is the base.' },
      { text: 'Substitute $u$ for a log to solve a quadratic in a log, without dividing by $u$.' },
      { text: 'Change the base of a log: the number on top, the old base underneath.' },
      { text: 'Evaluate a log with lg, correct to 3 significant figures, after an estimate.' },
      { text: 'Turn a log over: $\\log_x b = \\dfrac{1}{\\log_b x}$.' },
      { text: 'Solve an equation in two related bases by changing to the smaller one.' },
    ],
    check: {
      id: 'chk_recap',
      q: 'What is $\\log_2 5 \\times \\log_5 8$?',
      options: [
        { val: 'A', text: '$3$' },
        { val: 'B', text: '$1$' },
        { val: 'C', text: '$\\frac{1}{3}$' },
        { val: 'D', text: '$\\log_2 40$' },
      ],
      correct: 'A',
      expEn: 'In base $10$: $\\dfrac{\\lg 5}{\\lg 2} \\times \\dfrac{\\lg 8}{\\lg 5} = \\dfrac{\\lg 8}{\\lg 2} = \\log_2 8 = 3$. B cancels too much: only $\\lg 5$ cancels; C is upside down, $\\log_8 2$; D multiplies the numbers inside, which is the law for ADDING logs of the same base.',
    },
  },
];
