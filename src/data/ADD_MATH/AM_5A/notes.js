// src/data/ADD_MATH/AM_5A/notes.js
// AM_5A — Logarithms and the Laws of Logs.
// Cambridge IGCSE Additional Mathematics 0606, sections 5.1–5.3.
//
// Twenty-six slides, one idea each. Twenty-one scored items carry the NOTES
// score: twelve checks and nine activities (predict ×3, sort ×2, estimate,
// hotspot, numberline, order), placed where each idea has just landed.
//
// THE SPINE:
//   1–4    why we care: the unknown stuck in a power (predict), the power
//          ladder that makes a log a position, and log scales in the wild.
//   5–9    what a log is: the definition, the two forms, converting both ways,
//          evaluating whole / negative / fractional logs (sorted), lg and ln.
//   10–15  the limits: no log of zero or a negative (predict), the graph as a
//          reflection of 2^x (tapped), domain and range, an expression inside
//          (shaded), why the base is positive and not 1, the four facts.
//   16–21  the laws: spot the pattern (predict), the slide rule, the three
//          laws, a proof, the false laws (sorted), change of base as a preview.
//   22–25  simplifying: worked example 7 with new numbers, all the way to a
//          number, the method in order, and the laws run backwards.
//   26     the recap.
//
// House notes:
//  · ENGLISH ONLY — ADD_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Titles are narrated and are plain text: no maths, no bare symbols.
//  · The coursebook prints worked example 7b as "log₄ 15 ÷ log₄ 5 = log₄ 3".
//    That ÷ is a misprint for −, and dividing two logs is exactly the false
//    law slide 20 warns about — so the deck never reproduces it.
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
    color: '#0369a1',
    icon: 'Superscript',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 5 · Logarithmic and exponential functions · 5.1–5.3',
    title: 'Logarithms and the Laws of Logs',
    objective: 'I can explain what a logarithm is, say which numbers it accepts and which it can give, and use the laws of logs to simplify an expression to a single log or an exact number.',
  },

  // ── 2 · ask before you tell ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you turn the page',
    title: 'The Unknown Is in the Power',
    content: 'You can solve $x^2 = 50$ with a square root, and $2x = 50$ by dividing. Now try\n\n$$2^x = 50$$\n\nThe unknown is **up in the power**. Adding, multiplying and taking roots cannot bring it down. Is there even an answer?',
    activity: {
      id: 'act_predict_power',
      type: 'predict',
      prompt: 'What can you say about the $x$ that makes $2^x = 50$?',
      options: [
        { val: 'between', name: 'It exists, and it is between 5 and 6' },
        { val: 'twentyfive', name: 'It is 25, because 2 × 25 = 50' },
        { val: 'root', name: 'It is √50, about 7.07' },
        { val: 'none', name: 'There is no such number' },
      ],
      correct: 'between',
      explain: '$2^5 = 32$ and $2^6 = 64$, and $50$ is between them — so $x$ is between $5$ and $6$ (about $5.64$). The number exists; what was missing is a **name** for it and a way to work it out. That name is a logarithm: $x = \\log_2 50$. Logs are the tool for getting an unknown out of a power, which is why they matter for anything that grows or shrinks by multiplying — money, populations, radioactivity, sound.',
    },
  },

  // ── 3 · the power ladder ────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Milestone',
    eyebrow: 'The picture to keep in your head',
    title: 'A Log Is a Position on the Power Ladder',
    inlineSvg: DIAGRAMS.POWER_LADDER_2,
    caption: 'Write the powers of $2$ at **equal** spacing. How far along a number sits is its **log**: $\\log_2 32 = 5$ because $2^5 = 32$. A number between two rungs has a log between two whole numbers — $50$ sits between $32$ and $64$, so $\\log_2 50 \\approx 5.64$.',
    check: {
      id: 'chk_ladder_between',
      q: 'Between which two whole numbers is $\\log_2 20$?',
      options: [
        { val: 'A', text: '$10$ and $11$' },
        { val: 'B', text: '$4$ and $5$' },
        { val: 'C', text: '$2$ and $3$' },
        { val: 'D', text: '$19$ and $21$' },
      ],
      correct: 'B',
      expEn: '$2^4 = 16$ and $2^5 = 32$, and $20$ is between them, so $\\log_2 20$ is between $4$ and $5$ (about $4.32$). A halves $20$ — a log is a power, not a division. C is the rungs for $4$ and $8$. D treats the log as the number itself.',
    },
  },

  // ── 4 · why we care ─────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'Why we care',
    title: 'Log Scales in the Real World',
    inlineSvg: DIAGRAMS.PH_SCALE,
    caption: 'When something ranges from tiny to enormous, a log scale squeezes it onto one line: each step is a **multiply**, not an add. **pH** measures acidity this way — one step down is ten times more acidic. The **Richter scale** for earthquakes and **decibels** for loudness work the same way, and so does every "how long until it doubles?" question about money, bacteria or radioactive decay.',
    check: {
      id: 'chk_ph',
      q: 'Lemon juice has pH $2$ and coffee has pH $5$. How many times more acidic is the lemon juice?',
      options: [
        { val: 'A', text: '$3$ times' },
        { val: 'B', text: '$30$ times' },
        { val: 'C', text: '$2.5$ times' },
        { val: 'D', text: '$1000$ times' },
      ],
      correct: 'D',
      expEn: 'Three steps on a log scale are three multiplications by $10$: $10 \\times 10 \\times 10 = 10^3 = 1000$. A reads the scale as ordinary subtraction; B multiplies the $3$ steps by $10$ instead of raising $10$ to the power $3$; C divides the two readings.',
    },
  },

  // ── 5 · the definition ──────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: BLUE,
    icon: 'Superscript',
    eyebrow: 'Write this down',
    title: 'What a Logarithm Is',
    label: 'The definition',
    labelIcon: 'Pencil',
    text: '$\\log_a y$ is the power that $a$ must be raised to, to give $y$.',
    sub: 'If $y = a^x$ then $x = \\log_a y$. The small number $a$ is the **base**. Read $\\log_2 8$ as "log of $8$, base $2$" — and ask the power question: $2$ to what power makes $8$?',
  },

  // ── 6 · the two forms ───────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Exponential form and log form',
    title: 'Two Ways to Write One Fact',
    inlineSvg: DIAGRAMS.TWO_FORMS,
    drawThis: true,
    caption: '$2^3 = 8$ and $\\log_2 8 = 3$ say exactly the same thing. The **base** stays the base in both. In log form the **power stands on its own** on one side of the equals sign, and the number goes inside the log.',
    check: {
      id: 'chk_to_log_form',
      q: 'Which is $5^2 = 25$ written in log form?',
      options: [
        { val: 'A', text: '$\\log_2 25 = 5$' },
        { val: 'B', text: '$\\log_{25} 5 = 2$' },
        { val: 'C', text: '$\\log_5 25 = 2$' },
        { val: 'D', text: '$\\log_5 2 = 25$' },
      ],
      correct: 'C',
      expEn: 'The base is $5$ and the power is $2$. The power goes on its own: $2 = \\log_5 25$. A swaps the base and the power; B swaps the base and the number; D puts the power inside the log.',
    },
  },

  // ── 7 · converting ──────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'PenLine',
    eyebrow: 'Worked examples 1, 4 and 5 · new numbers',
    title: 'Converting Both Ways',
    content: 'Every conversion is the same two moves: **identify the base and the power**, then write the other form.',
    steps: [
      { text: '**Exponential to log.** $3^4 = 81$: the base is $3$ and the power is $4$. The power goes on its own: $4 = \\log_3 81$.' },
      { text: '**Log to exponential.** $\\log_6 36 = 2$: the base is $6$, and in log form the power is the number on its own, $2$. Write the base and the power first: $6^2 = 36$.' },
      { text: '**Base 10.** $10^x = 45$ becomes $x = \\log_{10} 45$, which is written $\\lg 45$. The **log** key on a calculator gives $x \\approx 1.65$.' },
    ],
    notes: [
      { tone: 'write', text: 'In **exponential form** the number is on its own: $a^x = y$. In **log form** the power is on its own: $x = \\log_a y$.' },
    ],
    check: {
      id: 'chk_to_exp_form',
      q: 'Which is $\\log_4 64 = 3$ written in exponential form?',
      options: [
        { val: 'A', text: '$4^3 = 64$' },
        { val: 'B', text: '$3^4 = 64$' },
        { val: 'C', text: '$64^3 = 4$' },
        { val: 'D', text: '$4^{64} = 3$' },
      ],
      correct: 'A',
      expEn: 'The base is $4$ and the power is the number on its own, $3$: so $4^3 = 64$. B uses the power as the base; C and D put the base and the number in the wrong places. Check it: $4 \\times 4 \\times 4 = 64$.',
    },
  },

  // ── 8 · evaluating, sorted ──────────────────────────────────────────────
  {
    layout: 'statement',
    accent: AMBER,
    icon: 'Hash',
    eyebrow: 'Evaluating a log without a calculator',
    title: 'Write the Number as a Power of the Base',
    label: 'Try it',
    labelIcon: 'Hourglass',
    text: 'Write $y$ as a power of $a$. That power is $\\log_a y$.',
    sub: 'A whole number: $\\log_2 16 = 4$, as $16 = 2^4$. A fraction: $\\log_3 \\tfrac{1}{9} = -2$, as $\\tfrac{1}{9} = 3^{-2}$. A root: $\\log_9 3 = \\tfrac{1}{2}$, as $3 = \\sqrt{9} = 9^{1/2}$.',
    activity: {
      id: 'act_sort_values',
      type: 'sort',
      prompt: 'Sort the logs by their value.',
      bins: [
        { id: 'two', name: 'equals $2$' },
        { id: 'minus', name: 'equals $-2$' },
        { id: 'half', name: 'equals $\\tfrac{1}{2}$' },
      ],
      cards: [
        { id: 'v1', name: '$\\log_5 25$', bin: 'two' },
        { id: 'v2', name: '$\\lg 100$', bin: 'two' },
        { id: 'v3', name: '$\\log_4 \\tfrac{1}{16}$', bin: 'minus' },
        { id: 'v4', name: '$\\lg 0.01$', bin: 'minus' },
        { id: 'v5', name: '$\\log_{25} 5$', bin: 'half' },
        { id: 'v6', name: '$\\log_{49} 7$', bin: 'half' },
        { id: 'v7', name: '$\\log_{\\frac{1}{3}} 9$', bin: 'minus' },
      ],
      explain: '$25 = 5^2$ and $100 = 10^2$. $\\tfrac{1}{16} = 4^{-2}$ and $0.01 = \\tfrac{1}{100} = 10^{-2}$. $5 = \\sqrt{25} = 25^{1/2}$ and $7 = 49^{1/2}$. The trap is $\\log_{\\frac{1}{3}} 9$: the base is a fraction, and $\\left(\\tfrac{1}{3}\\right)^{-2} = 3^2 = 9$, so it equals $-2$.',
    },
  },

  // ── 9 · lg, ln, the calculator ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Calculator',
    eyebrow: 'Two bases with their own keys',
    title: 'Common Logs, Natural Logs and Your Calculator',
    content: 'Two bases are so useful they get their own names.\n\n**Base 10**, the common log: $\\log_{10} x$ is written $\\lg x$ — the **log** key on a calculator.\n\n**Base e**, the natural log: $\\log_e x$ is written $\\ln x$, where $e \\approx 2.718$. You meet $e$ properly in the next unit.\n\nEvery law in this lesson works the same way for common logs and natural logs.',
    activity: {
      id: 'act_estimate_lg500',
      type: 'estimate',
      prompt: 'No calculator yet. If $10^x = 500$, estimate $x = \\lg 500$.',
      min: 0,
      max: 4,
      step: 0.05,
      answer: 2.7,
      tolerance: 0.06,
      explain: '$10^2 = 100$ and $10^3 = 1000$, so $\\lg 500$ is between $2$ and $3$. It is not half-way at $2.5$: on the power ladder $500$ is five times $100$ but only two times short of $1000$, so it sits nearer $3$. The calculator says $\\lg 500 \\approx 2.70$.',
    },
  },

  // ── 10 · no log of a negative ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'ShieldAlert',
    eyebrow: 'The first limit',
    title: 'Can You Take the Log of a Negative Number?',
    content: 'Ask the power question of $\\log_2(-8)$: $2$ to what power makes $-8$?\n\n$$2^3 = 8 \\qquad 2^0 = 1 \\qquad 2^{-3} = \\tfrac{1}{8}$$',
    activity: {
      id: 'act_predict_negative',
      type: 'predict',
      prompt: 'What is $\\log_2(-8)$?',
      options: [
        { val: 'minus3', name: '$-3$' },
        { val: 'three', name: '$3$' },
        { val: 'eighth', name: '$-\\tfrac{1}{8}$' },
        { val: 'none', name: 'It does not exist' },
      ],
      correct: 'none',
      explain: 'Every power of $2$ is **positive**: big powers give big numbers, negative powers give small fractions, and $2^0 = 1$. No power reaches $0$ or goes below it — so $\\log_2(-8)$ and $\\log_2 0$ do not exist. $-3$ is the log of $\\tfrac{1}{8}$, not of $-8$: a negative POWER gives a small positive number, never a negative one. The same is true for every base.',
    },
  },

  // ── 11 · the graph, tapped ──────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'LineChart',
    eyebrow: 'The graph of a log',
    title: 'A Log Undoes a Power',
    inlineSvg: DIAGRAMS.LOG_GRAPH,
    caption: '$y = \\log_2 x$ and $y = 2^x$ are **inverse functions** — each undoes the other — so their graphs are mirror images in the line $y = x$. Every point $(p, q)$ on one is $(q, p)$ on the other: $(1, 2)$ on the blue curve is $(2, 1)$ on the red.',
    activity: {
      id: 'act_hotspot_one_zero',
      type: 'hotspot',
      prompt: 'Tap the point that the graph of EVERY log passes through, whatever its base.',
      svg: DIAGRAMS.LOG_GRAPH,
      viewBox: '0 0 560 400',
      targets: [
        { id: 'one', x: 300, y: 230, r: 22, name: 'the point (1, 0)' },
        { id: 'yint', x: 250, y: 180, r: 22, name: 'the point (0, 1)' },
        { id: 'origin', x: 250, y: 230, r: 20, name: 'the origin' },
        { id: 'mirror', x: 350, y: 180, r: 22, name: 'the point (2, 1)' },
      ],
      correct: 'one',
      explain: '$(1, 0)$, because $\\log_a 1 = 0$ for every base: $a^0 = 1$. The exponential graph passes through the matching point $(0, 1)$. No log graph passes through the origin — $\\log_a 0$ does not exist.',
    },
  },

  // ── 12 · domain and range ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'MoveHorizontal',
    ratio: 52,
    eyebrow: 'The limits, stated properly',
    title: 'Domain and Range',
    inlineSvg: DIAGRAMS.DOMAIN_RANGE,
    content: 'The **domain** is every input a function accepts. The **range** is every output it can give.\n\nFor $y = \\log_a x$ the domain is $x > 0$: only positive numbers go in. The range is **all real numbers**: a log can come out as $-50$, $0$ or $1000$.\n\nFor $y = a^x$ it is the other way round — any $x$ goes in, and only positive numbers come out. Inverse functions swap their domain and range.',
    notes: [
      { tone: 'write', text: '$y = \\log_a x$: domain $x > 0$, range all real numbers. The $y$-axis is an **asymptote** — the curve gets ever closer to it but never touches.' },
    ],
    check: {
      id: 'chk_exp_range',
      q: 'What is the range of $y = 2^x$?',
      options: [
        { val: 'A', text: 'All real numbers' },
        { val: 'B', text: '$y \\geq 0$' },
        { val: 'C', text: '$y > 0$' },
        { val: 'D', text: '$x > 0$' },
      ],
      correct: 'C',
      expEn: 'Every power of $2$ is positive and none is $0$, so the outputs are $y > 0$. A is the range of the LOG; B lets in $0$, which $2^x$ never reaches; D is the domain of the log, and it describes $x$, not the outputs.',
    },
  },

  // ── 13 · an expression inside, shaded ───────────────────────────────────
  // A number line keeps the footer under the slide (it needs the full width to
  // be tappable), so this is a compact callout rather than a big statement.
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'The domain when there is an expression inside',
    title: 'Whatever Is Inside Must Be Positive',
    content: 'Set the whole inside greater than $0$ and solve. For $\\log_3(x - 2)$: $x - 2 > 0$, so $x > 2$. For $\\lg(2x + 6)$: $2x + 6 > 0$, so $x > -3$.',
    activity: {
      id: 'act_line_domain',
      type: 'numberline',
      prompt: 'Shade every $x$ for which $\\log_5(x + 4)$ exists.',
      display: 'x + 4 > 0',
      solution: 'x > -4',
      min: -8,
      max: 4,
      explain: 'Set the inside positive: $x + 4 > 0$, so $x > -4$. The circle at $-4$ is **open**: there the inside is $0$, and $\\log_5 0$ does not exist.',
    },
  },

  // ── 14 · the base ───────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: AMBER,
    icon: 'AlertTriangle',
    eyebrow: 'The second limit',
    title: 'Why the Base Must Be Positive and Not One',
    content: 'A base $a$ must have $a > 0$ and $a \\neq 1$.\n\n**Base 1 fails:** $1^x = 1$ for every $x$, so no power of $1$ ever makes $5$ — and "the power that makes $1$" would be every number at once.\n\n**A negative base fails:** $(-2)^x$ flips sign at every whole step, and has no real value at all for $x = \\tfrac{1}{2}$, the square root of $-2$. There is no smooth ladder to read a log from.\n\nA fraction is fine: $\\left(\\tfrac{1}{2}\\right)^{-3} = 8$, so $\\log_{\\frac{1}{2}} 8 = -3$.',
    check: {
      id: 'chk_valid_base',
      q: 'Which of these logarithms exists?',
      options: [
        { val: 'A', text: '$\\log_1 5$' },
        { val: 'B', text: '$\\log_{-3} 9$' },
        { val: 'C', text: '$\\log_4(-16)$' },
        { val: 'D', text: '$\\log_{\\frac{1}{2}} 4$' },
      ],
      correct: 'D',
      expEn: 'A base of $\\tfrac{1}{2}$ is positive and not $1$, and $4$ is positive: $\\left(\\tfrac{1}{2}\\right)^{-2} = 4$, so it equals $-2$. A has base $1$; B has a negative base; C has a negative number inside.',
    },
  },

  // ── 15 · the four facts ─────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Four facts straight from the definition',
    title: 'What Every Log Obeys',
    content: 'For any base $a$ (with $a > 0$ and $a \\neq 1$):\n\n$$\\log_a a = 1 \\qquad \\log_a 1 = 0$$\n\n$$\\log_a a^x = x \\qquad a^{\\log_a x} = x \\quad (x > 0)$$\n\nEach is the definition said again: $a^1 = a$; $a^0 = 1$; the power that makes $a^x$ is $x$; and raising $a$ to "the power that makes $x$" makes $x$. The last two say that taking $\\log_a$ and raising $a$ to a power **undo each other**.',
    check: {
      id: 'chk_undo',
      q: 'Simplify $7^{\\log_7 12}$.',
      options: [
        { val: 'A', text: '$7$' },
        { val: 'B', text: '$12$' },
        { val: 'C', text: '$\\log_7 12$' },
        { val: 'D', text: '$84$' },
      ],
      correct: 'B',
      expEn: '$\\log_7 12$ is the power $7$ must be raised to, to make $12$. Raise $7$ to exactly that power and you get $12$. A and C stop halfway; D multiplies $7 \\times 12$.',
    },
  },

  // ── 16 · spot the pattern ───────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you see the laws',
    title: 'Spot the Pattern',
    content: 'On the base-$10$ ladder, $\\lg 10 = 1$, $\\lg 100 = 2$ and $\\lg 1000 = 3$. Now look:\n\n$$\\lg 10 + \\lg 100 = 1 + 2 = 3 = \\lg 1000$$\n\nand $1000 = 10 \\times 100$.',
    activity: {
      id: 'act_predict_product',
      type: 'predict',
      prompt: 'So what is $\\lg 20 + \\lg 5$?',
      options: [
        { val: 'lg25', name: '$\\lg 25$ — add the numbers inside' },
        { val: 'lg100', name: '$\\lg 100$, which is $2$ — multiply the numbers inside' },
        { val: 'lg4', name: '$\\lg 4$ — divide the numbers inside' },
        { val: 'twolg25', name: '$2\\lg 25$' },
      ],
      correct: 'lg100',
      explain: 'A log is a power, and adding powers is what happens when you **multiply**: $10^a \\times 10^b = 10^{a + b}$. So $\\lg 20 + \\lg 5 = \\lg(20 \\times 5) = \\lg 100 = 2$. Adding the numbers inside is the most common mistake in this whole topic.',
    },
  },

  // ── 17 · the slide rule ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Why logs were invented',
    title: 'Adding Lengths Multiplies Numbers',
    inlineSvg: DIAGRAMS.SLIDE_RULE,
    caption: 'On the power ladder, $\\lg 20$ and $\\lg 5$ are lengths. Lay them end to end and you land on $100$. For three hundred years before calculators, scientists and engineers multiplied big numbers exactly this way — with log tables and **slide rules**, two log scales sliding along each other — because adding is far easier than multiplying.',
  },

  // ── 18 · the three laws ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'Write this down · the laws of logarithms',
    title: 'The Three Laws',
    inlineSvg: DIAGRAMS.LAWS_TABLE,
    drawThis: true,
    caption: 'For positive $x$ and $y$ and any base $a$: the **multiplication law** $\\log_a(xy) = \\log_a x + \\log_a y$; the **division law** $\\log_a \\frac{x}{y} = \\log_a x - \\log_a y$; the **power law** $\\log_a x^m = m\\log_a x$. A special case of the power law: $\\log_a \\frac{1}{x} = -\\log_a x$.',
    check: {
      id: 'chk_division_law',
      q: 'Which is $\\log_2 45 - \\log_2 5$ as a single logarithm?',
      options: [
        { val: 'A', text: '$\\log_2 40$' },
        { val: 'B', text: '$\\log_2 225$' },
        { val: 'C', text: '$\\log_2 9$' },
        { val: 'D', text: '$\\log_2 \\frac{1}{9}$' },
      ],
      correct: 'C',
      expEn: 'Subtracting logs divides the numbers inside: $\\log_2 \\frac{45}{5} = \\log_2 9$. A subtracts the numbers; B multiplies them; D divides the wrong way round.',
    },
  },

  // ── 19 · a proof ────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Why the laws are true',
    title: 'Proving the Multiplication Law',
    content: 'Every law of logs is an index law in disguise. Here is the proof of the first one.',
    steps: [
      { text: 'Name the two logs: let $p = \\log_a x$ and $q = \\log_a y$.' },
      { text: 'Write them in exponential form: $x = a^p$ and $y = a^q$.' },
      { text: 'Multiply, using the index law: $xy = a^p \\times a^q = a^{p + q}$.' },
      { text: 'Read that in log form: $\\log_a(xy) = p + q = \\log_a x + \\log_a y$.' },
    ],
    reveal: {
      label: 'Try the power law yourself',
      prompt: 'With $p = \\log_a x$, what is $x^m$ as a power of $a$ — and so what is $\\log_a x^m$?',
      answer: '$x = a^p$, so $x^m = (a^p)^m = a^{mp}$ by the power-of-a-power law. In log form, $\\log_a x^m = mp = m\\log_a x$. The division law works the same way, from $a^p \\div a^q = a^{p - q}$.',
    },
  },

  // ── 20 · false laws, sorted ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'ShieldAlert',
    eyebrow: 'The trap',
    title: 'Laws That Do Not Exist',
    content: 'Three things look like laws and are **false**:\n\n$$\\log_a(x + y) \\neq \\log_a x + \\log_a y$$\n\n$$\\frac{\\log_a x}{\\log_a y} \\neq \\log_a \\frac{x}{y} \\qquad (\\log_a x)^2 \\neq 2\\log_a x$$\n\nTest one with numbers: $\\lg(10 + 10) = \\lg 20 \\approx 1.30$, but $\\lg 10 + \\lg 10 = 2$. The laws are about **multiplying, dividing and powers inside** a log — never adding inside, and never dividing one log by another.',
    activity: {
      id: 'act_sort_laws',
      type: 'sort',
      prompt: 'True law or false law? Sort the six statements.',
      bins: [
        { id: 'law', name: 'True — a law of logs' },
        { id: 'fake', name: 'False — not a law' },
      ],
      cards: [
        { id: 'l1', name: '$\\lg 6 = \\lg 2 + \\lg 3$', bin: 'law' },
        { id: 'l2', name: '$\\lg 5 = \\lg 2 + \\lg 3$', bin: 'fake' },
        { id: 'l3', name: '$\\log_2 9 = 2\\log_2 3$', bin: 'law' },
        { id: 'l4', name: '$(\\log_2 3)^2 = 2\\log_2 3$', bin: 'fake' },
        { id: 'l5', name: '$\\log_3 4 = \\log_3 12 - \\log_3 3$', bin: 'law' },
        { id: 'l6', name: '$\\log_3 4 = \\dfrac{\\log_3 12}{\\log_3 3}$', bin: 'fake' },
      ],
      explain: '$6 = 2 \\times 3$, so $\\lg 6 = \\lg 2 + \\lg 3$ — but $5 = 2 + 3$, and adding inside is not a law. $9 = 3^2$, so $\\log_2 9 = 2\\log_2 3$; squaring the whole log is something else. $4 = \\frac{12}{3}$ gives the subtraction; dividing the logs gives $\\frac{\\log_3 12}{1} = \\log_3 12$, which is not $\\log_3 4$.',
    },
  },

  // ── 21 · change of base, as a preview ───────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Calculator',
    eyebrow: 'One more property · you will use it later in the chapter',
    title: 'Any Base on a Calculator',
    label: 'Change of base',
    labelIcon: 'Calculator',
    text: '$\\log_b a = \\dfrac{\\lg a}{\\lg b}$',
    sub: 'Dividing two logs is not a law for simplifying — but it is how a calculator with only base-10 and natural logs finds a log in any other base: $\\log_2 50 = \\dfrac{\\lg 50}{\\lg 2} \\approx 5.64$, the number from the start of this lesson.',
    check: {
      id: 'chk_change_base',
      q: 'Which calculation gives $\\log_3 20$?',
      options: [
        { val: 'A', text: '$\\dfrac{\\lg 3}{\\lg 20}$' },
        { val: 'B', text: '$\\lg 20 - \\lg 3$' },
        { val: 'C', text: '$\\dfrac{\\lg 20}{\\lg 3}$' },
        { val: 'D', text: '$\\lg \\dfrac{20}{3}$' },
      ],
      correct: 'C',
      expEn: 'The number goes on top and the base underneath: $\\log_3 20 = \\frac{\\lg 20}{\\lg 3} \\approx 2.73$. A is upside down. B and D are equal to each other — that is the division law — and both are about $0.82$, not the log base $3$.',
    },
  },

  // ── 22 · worked example 7 ───────────────────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'PenLine',
    eyebrow: 'Worked example 7 · new numbers',
    title: 'Writing a Single Logarithm',
    content: 'Write $2\\log_3 5 + \\log_3 4 - 3\\log_3 2$ as a single logarithm.',
    steps: [
      { text: '**Powers inside first.** $2\\log_3 5 = \\log_3 25$ and $3\\log_3 2 = \\log_3 8$. Leave the minus sign where it is.' },
      { text: '**Now every term is a plain log:** $\\log_3 25 + \\log_3 4 - \\log_3 8$.' },
      { text: '**Combine.** A plus log multiplies and a minus log divides: $\\log_3 \\dfrac{25 \\times 4}{8}$.' },
      { text: '**Work out the number:** $\\dfrac{100}{8} = \\dfrac{25}{2}$. That is not a power of $3$, so the answer stays a log: $\\log_3 \\dfrac{25}{2}$.' },
    ],
    notes: [
      { tone: 'write', text: 'Always move the numbers in front **inside first**. The multiplication and division laws only join logs with nothing in front.' },
    ],
    check: {
      id: 'chk_single_log',
      q: 'Write $\\lg 8 + \\lg 5 - \\lg 4$ as simply as possible.',
      options: [
        { val: 'A', text: '$\\lg 9$' },
        { val: 'B', text: '$\\lg 160$' },
        { val: 'C', text: '$\\lg \\frac{2}{5}$' },
        { val: 'D', text: '$1$' },
      ],
      correct: 'D',
      expEn: '$\\lg \\frac{8 \\times 5}{4} = \\lg 10 = 1$. A adds and subtracts the numbers inside; B multiplies all three; C divides by the $5$ as well as the $4$. Stopping at $\\lg 10$ misses the last step — $10 = 10^1$.',
    },
  },

  // ── 23 · all the way to a number ────────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Simplify fully',
    title: 'All the Way to a Number',
    content: 'When the single log\'s number is an exact power of the base, the log **is** that power — and "simplify" means say so.',
    steps: [
      { text: '$\\log_2 56 - \\log_2 7 = \\log_2 8$, and $8 = 2^3$, so the answer is $3$.' },
      { text: '$\\tfrac{1}{2}\\lg 16 + \\lg 25 = \\lg 4 + \\lg 25 = \\lg 100 = 2$. A power of $\\tfrac{1}{2}$ is a square root: $16^{1/2} = 4$.' },
      { text: '**A plain number must become a log first.** $2 + \\log_3 5$: write $2 = \\log_3 3^2 = \\log_3 9$, then $\\log_3 9 + \\log_3 5 = \\log_3 45$.' },
    ],
    notes: [
      { tone: 'plant', text: 'A single log is **finished** only when its number is not a power of the base. $\\log_2 8$ is not finished; $\\log_3 45$ is.' },
    ],
  },

  // ── 24 · the method in order ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'The whole method on one card',
    title: 'Simplifying Logs, Start to Finish',
    content: 'Every simplifying question in this section is the same six moves — the same six the Log Simplifier task walks you through. Put them in the order you would do them.',
    activity: {
      id: 'act_order_method',
      type: 'order',
      prompt: 'Put the six moves in order.',
      steps: [
        { id: 'm1', name: 'Write any plain number as a log of the base' },
        { id: 'm2', name: 'Move every number in front inside, as a power' },
        { id: 'm3', name: 'Combine: plus logs multiply, minus logs divide' },
        { id: 'm4', name: 'Work out the single number inside the log' },
        { id: 'm5', name: 'Ask whether that number is an exact power of the base' },
        { id: 'm6', name: 'If it is, write the power; if not, leave the single log' },
      ],
      explain: 'Numbers into logs, powers inside, combine, work it out, check for a power, finish. The first two must come before combining, because the multiplication and division laws only join plain logs of the same base.',
    },
  },

  // ── 25 · the laws run backwards ─────────────────────────────────────────
  {
    layout: 'steps',
    accent: AMBER,
    icon: 'Split',
    eyebrow: 'The laws run both ways',
    title: 'Splitting a Log Apart',
    content: 'Some questions want the opposite: one log **expanded** into simpler ones.',
    steps: [
      { text: '$\\lg \\dfrac{x^3 y}{z^2} = \\lg x^3 + \\lg y - \\lg z^2 = 3\\lg x + \\lg y - 2\\lg z$.' },
      { text: 'A root is a power: $\\log_a \\sqrt{x} = \\log_a x^{1/2} = \\tfrac{1}{2}\\log_a x$.' },
      { text: 'Given $\\log_a 2 = p$ and $\\log_a 3 = q$: $12 = 2^2 \\times 3$, so $\\log_a 12 = 2\\log_a 2 + \\log_a 3 = 2p + q$.' },
    ],
    check: {
      id: 'chk_in_terms',
      q: 'Given $\\log_a 2 = p$ and $\\log_a 3 = q$, what is $\\log_a 18$?',
      options: [
        { val: 'A', text: '$2p + q$' },
        { val: 'B', text: '$p + 2q$' },
        { val: 'C', text: '$pq^2$' },
        { val: 'D', text: '$9p$' },
      ],
      correct: 'B',
      expEn: '$18 = 2 \\times 3^2$, so $\\log_a 18 = \\log_a 2 + 2\\log_a 3 = p + 2q$. A is $\\log_a 12$; C multiplies the logs instead of adding them; D reads $18$ as $9 \\times 2$ and multiplies the log by $9$.',
    },
  },

  // ── 26 · recap ──────────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'ListChecks',
    variant: 'checklist',
    columns: 2,
    eyebrow: 'Tick each one only if you could do it right now, unaided',
    title: 'What You Should Be Able to Do',
    items: [
      { text: 'Say what $\\log_a y$ means: the power $a$ must be raised to, to give $y$.' },
      { text: 'Convert between $a^x = y$ and $x = \\log_a y$ in both directions.' },
      { text: 'Evaluate a log by writing the number as a power of the base — whole, negative or fractional.' },
      { text: 'Write a base-10 log as $\\lg x$ and a base-e log as $\\ln x$, and find any log on a calculator.' },
      { text: 'State the domain ($x > 0$) and range (all real numbers) of $y = \\log_a x$, and say why the base must be positive and not $1$.' },
      { text: 'Find which $x$ make a log of an expression exist.' },
      { text: 'Use $\\log_a a = 1$ and $\\log_a 1 = 0$, and that logs and powers undo each other.' },
      { text: 'Use the multiplication, division and power laws — and avoid the three false laws.' },
      { text: 'Simplify to a single log, and all the way to a number when it is one.' },
      { text: 'Split a log apart, or write it in terms of given logs.' },
    ],
    check: {
      id: 'chk_recap',
      q: 'Simplify $\\log_5 50 - \\log_5 2$.',
      options: [
        { val: 'A', text: '$\\log_5 48$' },
        { val: 'B', text: '$\\log_5 100$' },
        { val: 'C', text: '$2$' },
        { val: 'D', text: '$25$' },
      ],
      correct: 'C',
      expEn: '$\\log_5 \\frac{50}{2} = \\log_5 25$, and $25 = 5^2$, so the answer is $2$. A subtracts the numbers; B multiplies them; D stops at the number inside and forgets that the log asks for the POWER.',
    },
  },
];
