// src/data/ADD_MATH/AM_3A/notes.js
// AM_3A — Polynomials, Division and the Factor Theorem.
// Cambridge IGCSE Additional Mathematics 0606, sections 3.1, 3.2 and 3.3.
//
// THE SPINE, and why it is in this order:
//   1–4    what a polynomial IS, in the exam's own words: term, coefficient,
//          leading coefficient, degree, constant term — then the name table.
//   5–9    the SHAPE of each degree, 0 to 5, and the two facts that fall out of
//          it: at most n roots, at most n − 1 turning points. Slide 9 is the
//          practical one and it is load-bearing: there is no formula for the
//          roots of a quintic and there never will be, so the only way through a
//          high-degree polynomial is to find one factor and reduce the degree.
//          Everything after slide 9 is that plan being carried out.
//   10–12  adding, subtracting and multiplying, with the degree rules.
//   13–17  division: the vocabulary (borrowed from 5508 ÷ 17), writing missing
//          powers as 0, the four moves, and what a remainder means.
//   18–23  the factor theorem: the statement, the four equivalent ways of saying
//          it, the ax − b extension, the sign trap, and factorising a cubic
//          completely — which is what the theorem is FOR.
//   24     the recap checklist.
//
// House notes:
//  · ENGLISH ONLY. ADD_MATH declares `bilingual: false`, so there are no `vn*`
//    twins; the layouts fall back to English through pick(en, vn).
//  · `$…$` is inline KaTeX and `$$…$$` is a display block; both are used freely.
//    There is no money anywhere in this unit, so a bare dollar never appears.
//  · Layout `title` and hero `objective` are plain text — never parsed — so no
//    markdown and no maths goes in them.
//  · Icons must exist in the ICONS map in notes/layouts/primitives.jsx.
//  · `check` is always the LAST key on its slide: generate_all_audio.py narrates
//    everything before it and deliberately stops there, so a check question is
//    never read aloud before the student has answered it.
//  · Ten `check` questions carry the NOTES score, so the XP is earned rather
//    than paid out for reaching the last slide.
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
    icon: 'Calculator',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 3 · Factors and Polynomials',
    title: 'Polynomials, Division and the Factor Theorem',
    objective: 'I can name every part of a polynomial, divide one polynomial by another, and use the factor theorem to break a cubic into its factors.',
    card: {
      icon: 'Pencil',
      badge: 'Warm-Up · Do this now in your book',
      text: 'Expand $(x-2)(x^2+x-1)$. **Three lines of working.** Keep the answer where you can see it — the whole of this unit is that multiplication run backwards.',
    },
  },

  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    ratio: 45,
    eyebrow: 'The definition, and the five words',
    title: 'What a Polynomial Is',
    inlineSvg: DIAGRAMS.ANATOMY,
    content: 'A **polynomial** is an expression built from one variable using only $+$, $-$, $\\times$ and **whole-number powers**:\n\n$$a_nx^n + a_{n-1}x^{n-1} + \\ldots + a_2x^2 + a_1x + a_0$$\n\nEach $a$ is a constant, called a **coefficient**. The leading coefficient $a_n$ must not be $0$ — if it were, the polynomial would really be a smaller one wearing the wrong name.',
    notes: [
      {
        tone: 'write',
        text: 'The **degree** is the highest power of $x$.\nThe **constant term** is the one with no $x$ (it is $a_0$).\nThe **leading coefficient** is the number in front of the highest power.',
      },
    ],
    check: {
      id: 'chk_is_poly',
      q: 'Which one of these is **not** a polynomial?',
      options: [
        { val: 'A', text: '$4x^3 - x + 9$' },
        { val: 'B', text: '$7$' },
        { val: 'C', text: '$5x^2 + \\dfrac{3}{x}$' },
        { val: 'D', text: '$x^5 - 2x^4$' },
      ],
      correct: 'C',
      expEn: '$\\dfrac{3}{x}$ is $3x^{-1}$, and $-1$ is not a whole number, so C is not a polynomial. B is fine: a lone constant is a polynomial of degree 0.',
    },
  },

  {
    layout: 'compare',
    accent: TEAL,
    eyebrow: 'Sort these before you go on',
    title: 'Polynomial, or Not',
    columns: [
      {
        heading: 'These are polynomials',
        icon: 'CheckCircle2',
        accent: GREEN,
        content: '$3x^4 - 2x^2 + x - 8$ — degree 4\n\n$\\tfrac{1}{2}x^3 + 5$ — a fractional **coefficient** is fine\n\n$-x$ — degree 1\n\n$12$ — degree 0, a constant',
        caption: 'Whole-number powers of x, constants in front.',
      },
      {
        heading: 'These are not',
        icon: 'AlertTriangle',
        accent: RED,
        content: '$\\dfrac{4}{x} + 1$ — that is $4x^{-1}$: a **negative** power\n\n$\\sqrt{x} - 3$ — that is $x^{1/2}$: a **fractional** power\n\n$2^x$ — the variable is in the **power**\n\n$\\dfrac{1}{x^2+1}$ — a polynomial in the denominator',
        caption: 'A fractional coefficient is allowed. A fractional power is not.',
      },
    ],
  },

  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'Learn these names — questions use them instead of numbers',
    title: 'The Degree Decides the Name',
    inlineSvg: DIAGRAMS.DEGREE_TABLE,
    drawThis: true,
    caption: 'A question that says "the cubic $\\text{P}(x)$" has just told you the degree is 3, and therefore that there are at most three roots.',
  },

  {
    layout: 'gallery',
    accent: PURPLE,
    tone: 'plant',
    icon: 'Activity',
    columns: 3,
    eyebrow: 'Same window, same scale, six curves',
    title: 'What Each Degree Looks Like',
    copyLabel: 'Sketch the six shapes',
    content: 'Read down the pictures once. Two patterns should come out of them on their own: **each new degree adds at most one more bump, and at most one more crossing.**',
    items: [
      {
        inlineSvg: DIAGRAMS.DEG_0,
        term: 'Degree 0 — constant',
        text: '$y = a$. A flat line. **No bumps, no roots** (unless the whole thing is 0). Nothing to solve.',
      },
      {
        inlineSvg: DIAGRAMS.DEG_1,
        term: 'Degree 1 — linear',
        text: '$y = ax + b$. A straight line. **Exactly one root**, always, and you find it by rearranging.',
      },
      {
        inlineSvg: DIAGRAMS.DEG_2,
        term: 'Degree 2 — quadratic',
        text: 'A parabola. **One turning point**, and 0, 1 or 2 roots. The formula always finds them.',
      },
      {
        inlineSvg: DIAGRAMS.DEG_3,
        term: 'Degree 3 — cubic',
        text: 'Up to **two** turning points, and 1, 2 or 3 roots — but **never none**: the two ends go opposite ways.',
      },
      {
        inlineSvg: DIAGRAMS.DEG_4,
        term: 'Degree 4 — quartic',
        text: 'Up to **three** turning points, and 0 to 4 roots. Both ends go the same way, so it can miss the axis entirely.',
      },
      {
        inlineSvg: DIAGRAMS.DEG_5,
        term: 'Degree 5 — quintic',
        text: 'Up to **four** turning points, and 1 to 5 roots. Odd degree again, so **at least one root** is guaranteed.',
      },
    ],
  },

  {
    layout: 'split',
    accent: AMBER,
    icon: 'Activity',
    side: 'left',
    ratio: 42,
    eyebrow: 'Counting the bumps',
    title: 'Turning Points',
    inlineSvg: DIAGRAMS.TURNING_POINTS,
    content: 'A **turning point** is where the curve stops rising and starts falling, or the other way round.\n\nA polynomial of degree $n$ has **at most $n-1$** of them. It can have fewer — a cubic can climb the whole way with none — but it can never have more.',
    notes: [
      {
        tone: 'plant',
        text: 'Degree $n$: **at most $n$ roots**, and **at most $n-1$ turning points**. Two facts, one picture.',
      },
    ],
    check: {
      id: 'chk_turning',
      q: 'A quartic curve is drawn. What is the greatest number of turning points it can have?',
      options: [
        { val: 'A', text: '$2$' },
        { val: 'B', text: '$3$' },
        { val: 'C', text: '$4$' },
        { val: 'D', text: '$5$' },
      ],
      correct: 'B',
      expEn: 'A quartic has degree 4, so it has at most $4 - 1 = 3$ turning points. C is the trap: 4 is the maximum number of **roots**, not bumps.',
    },
  },

  {
    layout: 'split',
    accent: RED,
    icon: 'Target',
    ratio: 45,
    eyebrow: 'The most useful word in the chapter',
    title: 'Roots',
    inlineSvg: DIAGRAMS.ROOTS_CUBIC,
    content: 'A **root** (or **zero**) of $\\text{P}(x)$ is a value of $x$ for which $\\text{P}(x) = 0$. On the graph, it is where the curve **meets the $x$-axis**.\n\nEach root $c$ comes from a factor $(x-c)$, and each factor $(x-c)$ gives a root $c$. That link is the entire point of this chapter — and it is the factor theorem, which you meet in a few slides.',
    notes: [
      {
        tone: 'write',
        text: 'A polynomial of degree $n$ has **at most $n$ roots**, because it has at most $n$ linear factors.',
      },
    ],
    check: {
      id: 'chk_roots_factor',
      q: 'A cubic has factors $(x-1)$, $(x+4)$ and $(x-6)$. What are its roots?',
      options: [
        { val: 'A', text: '$1,\\ -4,\\ 6$' },
        { val: 'B', text: '$-1,\\ 4,\\ -6$' },
        { val: 'C', text: '$1,\\ 4,\\ 6$' },
        { val: 'D', text: '$0,\\ 1,\\ 4$' },
      ],
      correct: 'A',
      expEn: 'A factor $(x-c)$ is zero when $x=c$. So $(x-1)$ gives $1$, $(x+4)$ gives $-4$ (because $x+4=0$ means $x=-4$), and $(x-6)$ gives $6$. Option B flips every sign — the single most common slip in this topic.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Layers',
    side: 'left',
    ratio: 42,
    eyebrow: 'How many roots, really',
    title: 'Odd Degrees Always Have One',
    inlineSvg: DIAGRAMS.ROOT_COUNT,
    content: 'Slide the same cubic upwards and watch the crossings disappear one at a time — three, then two, then one. **It never reaches zero.**\n\nThat is true of every odd degree: the two ends of the curve go in opposite directions, so it has to cross somewhere. An even degree has both ends pointing the same way, so it can float clear of the axis and have no roots at all.',
    notes: [
      {
        tone: 'info',
        text: 'When two roots merge into one, that root is **repeated** — the curve touches the axis there instead of crossing it. The factor appears twice, as in $(x-2)^2$.',
      },
    ],
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The practical truth, and the reason this chapter exists',
    title: 'Finding Roots Is Hard',
    content: 'Reading roots off a picture is easy. Calculating them is not.\n\n**Degree 1** — rearrange. Ten seconds.\n**Degree 2** — the quadratic formula. It always works, for every quadratic there has ever been.\n**Degree 3 and 4** — general formulas do exist, but they run to half a page and nobody uses them.\n**Degree 5 and above** — it was **proved in 1824 that no such formula can ever exist**. Not "not found yet". Cannot exist.\n\nSo for anything above a quadratic, mathematicians do not solve. They **factorise**: find one root, divide it out, and keep going until what is left is a quadratic they can finish with the formula.',
    notes: [
      {
        tone: 'plant',
        text: 'That plan needs exactly two skills, and they are the next two sections: **dividing** one polynomial by another, and **spotting a factor** without dividing.',
      },
    ],
    check: {
      id: 'chk_why_factor',
      q: 'Why does this chapter teach you to factorise a cubic instead of giving you a cubic formula?',
      options: [
        { val: 'A', text: 'Because no formula for a cubic has ever been found' },
        { val: 'B', text: 'Because a cubic formula exists but is far too long to use, and beyond degree 4 no formula can exist at all' },
        { val: 'C', text: 'Because cubics have no roots' },
        { val: 'D', text: 'Because factorising is the only way to draw the graph' },
      ],
      correct: 'B',
      expEn: 'A cubic formula does exist — it is just unusable in practice. From degree 5 upwards there is provably no formula at all, so reducing the degree by pulling out one factor at a time is the general method.',
    },
  },

  {
    layout: 'statement',
    accent: BLUE,
    icon: 'Equal',
    eyebrow: 'Section 3.1 · adding, subtracting, multiplying',
    title: 'What Happens to the Degree',
    label: 'Learn both',
    labelIcon: 'Pencil',
    text: '$\\deg(\\text{P} \\pm \\text{Q}) \\leq \\max(p,\\, q)$',
    sub: 'but $\\deg(\\text{PQ}) = p + q$ — always, exactly. Adding can **lose** degree if the leading terms cancel; multiplying never can, because the two leading coefficients are both non-zero and their product cannot be $0$.',
  },

  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Layers',
    eyebrow: 'Worked example · P(x) = 2x³ − 6x² − 5 and Q(x) = x³ + 2x − 1',
    title: 'Combining Two Polynomials',
    content: 'Collect **like terms** — terms with the same power. Nothing else is allowed to be added.',
    steps: [
      { text: '**$\\text{P}(x)+\\text{Q}(x)$**: add the matching powers.\n$(2x^3+x^3) - 6x^2 + 2x + (-5-1) = 3x^3 - 6x^2 + 2x - 6$' },
      { text: '**$\\text{P}(x)-\\text{Q}(x)$**: remove the bracket **first**, flipping every sign inside it.\n$2x^3 - 6x^2 - 5 - x^3 - 2x + 1 = x^3 - 6x^2 - 2x - 4$' },
      { text: '**$2\\text{Q}(x)$**: multiply every term by 2.\n$2(x^3+2x-1) = 2x^3 + 4x - 2$' },
      { text: '**$\\text{P}(x)\\text{Q}(x)$**: multiply every term of P by every term of Q, then collect.\n$2x^6 - 6x^5 + 4x^4 - 19x^3 + 6x^2 - 10x + 5$' },
    ],
    reveal: {
      label: 'Check the degree of the product',
      prompt: 'P has degree 3 and Q has degree 3. What degree should the product be, and does the answer above agree?',
      answer: '$3 + 3 = 6$, and the product does start with $2x^6$. Checking the degree before you check the arithmetic catches a missed term in one glance.',
    },
    check: {
      id: 'chk_degree_product',
      q: 'P has degree 4 and Q has degree 3. What is the degree of $\\text{P}(x)\\text{Q}(x)$?',
      options: [
        { val: 'A', text: '$4$' },
        { val: 'B', text: '$7$' },
        { val: 'C', text: '$12$' },
        { val: 'D', text: 'It could be anything up to 7' },
      ],
      correct: 'B',
      expEn: 'Degrees **add** when polynomials are multiplied: $4+3=7$. C multiplies them instead. D describes addition, where cancelling leading terms can lower the degree — multiplication never can.',
    },
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'Scissors',
    eyebrow: 'Where marks are lost',
    title: 'The Minus Outside the Bracket',
    content: 'When you subtract a polynomial, the minus sign applies to **every term inside the bracket**, not just the first one.\n\n$$-(x^3 + 2x - 1) = -x^3 - 2x + 1$$\n\nThe $-1$ became $+1$. Students who lose a mark here almost always flipped the first sign and copied the rest.',
    notes: [
      {
        tone: 'homework',
        text: 'Write the bracket out with its signs already flipped **before** you collect anything. One extra line, and the error disappears.',
      },
    ],
  },

  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    ratio: 45,
    eyebrow: 'Section 3.2 · you already know this method',
    title: 'The Words for Division',
    inlineSvg: DIAGRAMS.NUMBER_DIVISION,
    content: 'Before dividing polynomials, do one long division with numbers and name the parts. The polynomial version uses **the same four moves and the same four words**.\n\n$5508 \\div 17 = 324$, with nothing left over.',
    notes: [
      {
        tone: 'write',
        text: '**dividend** ÷ **divisor** = **quotient**, and anything left over is the **remainder**.\nHere: dividend $5508$, divisor $17$, quotient $324$, remainder $0$.',
      },
    ],
  },

  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Do this before you set anything out',
    title: 'Write the Missing Powers In',
    inlineSvg: DIAGRAMS.MISSING_TERM,
    drawThis: true,
    caption: 'Long division is columns, and a column with nothing in it still has to exist. Put every power in, in descending order, with a $0$ where the term is missing.',
    check: {
      id: 'chk_missing_term',
      q: 'How should $x^3 - 8$ be written before dividing it by $x-2$?',
      options: [
        { val: 'A', text: '$x^3 - 8$, exactly as given' },
        { val: 'B', text: '$x^3 + 0x^2 + 0x - 8$' },
        { val: 'C', text: '$x^3 + 0x - 8$' },
        { val: 'D', text: '$-8 + x^3$' },
      ],
      correct: 'B',
      expEn: 'Both the $x^2$ and the $x$ terms are missing, so both are written as $0$. That gives four columns — $x^3$, $x^2$, $x$ and the constant — and the working lines up.',
    },
  },

  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Layers',
    eyebrow: 'Worked example · divide x³ − 5x² + 8x − 4 by x − 2',
    title: 'Divide, Multiply, Subtract, Bring Down',
    inlineSvg: DIAGRAMS.POLY_DIVISION,
    content: 'Every pass through the four moves kills off **one term** of the dividend. Repeat until nothing is left to bring down.',
    steps: [
      { text: '**Divide** the first term of what is left by the first term of the divisor: $x^3 \\div x = x^2$. Write $x^2$ above the bar, in the $x^2$ column.' },
      { text: '**Multiply** the whole divisor by that term: $x^2(x-2) = x^3 - 2x^2$. Write it underneath, lined up.' },
      { text: '**Subtract**. The leading column always cancels — that is why $x^2$ was chosen. $-5x^2 - (-2x^2) = -3x^2$.' },
      { text: '**Bring down** the next term, $+8x$, and start again with $-3x^2 + 8x$.' },
      // Step text is rendered inline-only, so this stays `$…$` — a `$$…$$`
      // block here renders as a KaTeX error, not as a centred equation.
      { text: 'Two more passes give $-3x$ and then $+2$, and the last subtraction leaves $0$, so $x^3-5x^2+8x-4 = (x-2)(x^2-3x+2)$.' },
    ],
  },

  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Info',
    eyebrow: 'When it does not go exactly',
    title: 'A Division With a Remainder',
    inlineSvg: DIAGRAMS.DIVISION_REMAINDER,
    caption: 'Stop when what is left has a **lower degree than the divisor** — there is nothing left to divide into. Here the last line is the number $19$, and $19$ has degree 0.',
    check: {
      id: 'chk_remainder_stop',
      q: 'You are dividing by $x-3$ and the line you have reached is $7x + 5$. What now?',
      options: [
        { val: 'A', text: 'Stop — the remainder is $7x+5$' },
        { val: 'B', text: 'Do one more pass: $7x \\div x = 7$' },
        { val: 'C', text: 'Start again from the top' },
        { val: 'D', text: 'Divide $5$ by $3$' },
      ],
      correct: 'B',
      expEn: '$7x+5$ has degree 1, the same as $x-3$, so it still divides. You stop only once the line left is of **lower** degree than the divisor — here, once it is just a number.',
    },
  },

  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'The sentence a division question is really asking for',
    title: 'The Division Identity',
    label: 'Copy this',
    labelIcon: 'Pencil',
    text: '$\\text{P}(x) = \\text{D}(x)\\,\\text{Q}(x) + \\text{R}(x)$',
    sub: 'dividend = divisor × quotient + remainder, with $\\deg \\text{R} < \\deg \\text{D}$. It is exactly $5508 = 17 \\times 324 + 0$ written with letters, and multiplying it out is how you **check** a division in the exam.',
    notes: [
      {
        tone: 'info',
        text: 'Dividing by a **linear** divisor means the remainder has degree 0 — a plain number. Dividing by a quadratic can leave a remainder like $-5x+3$.',
      },
    ],
  },

  {
    layout: 'statement',
    accent: GREEN,
    icon: 'ShieldCheck',
    eyebrow: 'Section 3.3 · the theorem itself',
    title: 'The Factor Theorem',
    label: 'Learn word for word',
    labelIcon: 'Pencil',
    text: 'If $\\text{P}(c) = 0$, then $(x-c)$ is a factor of $\\text{P}(x)$',
    sub: 'and it works in reverse too: if $(x-c)$ is a factor, then $\\text{P}(c)=0$. Substituting takes three lines. Dividing takes fifteen. That difference is the whole value of the theorem.',
    notes: [
      {
        tone: 'write',
        text: 'The extended form, for a divisor that is not monic: if $\\text{P}\\!\\left(\\dfrac{b}{a}\\right) = 0$, then $(ax-b)$ is a factor of $\\text{P}(x)$.',
      },
    ],
  },

  {
    layout: 'split',
    accent: GREEN,
    icon: 'GitMerge',
    ratio: 45,
    eyebrow: 'One idea, four sentences',
    title: 'Saying the Same Thing Four Ways',
    inlineSvg: DIAGRAMS.FACTOR_LINK,
    content: 'A question can arrive in any of these four disguises. Recognising that they are one statement is most of the work:\n\n$\\text{P}(c)=0$ · $(x-c)$ is a factor · the remainder is $0$ · the graph crosses at $x=c$.\n\nSo "show that $x-3$ is a factor" and "show that $3$ is a root" are the same instruction, and both are answered by working out $\\text{P}(3)$.',
    notes: [
      {
        tone: 'theory',
        text: 'Coming next chapter: the **remainder theorem** — the remainder when $\\text{P}(x)$ is divided by $(x-c)$ is exactly $\\text{P}(c)$. The factor theorem is just that theorem with the remainder equal to $0$.',
      },
    ],
    check: {
      id: 'chk_equivalent',
      q: 'A question says "the graph of $y=\\text{P}(x)$ crosses the $x$-axis at $x=5$". What does that tell you?',
      options: [
        { val: 'A', text: '$\\text{P}(5)=0$, so $(x-5)$ is a factor' },
        { val: 'B', text: '$\\text{P}(0)=5$' },
        { val: 'C', text: '$(x+5)$ is a factor' },
        { val: 'D', text: 'The remainder on dividing by $(x-5)$ is 5' },
      ],
      correct: 'A',
      expEn: 'Crossing the axis at $x=5$ means the value there is zero: $\\text{P}(5)=0$. By the factor theorem $(x-5)$ is then a factor, and dividing by it leaves remainder $0$ — not 5.',
    },
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'ShieldCheck',
    eyebrow: 'Worked example · show that x − 3 is a factor of x³ − 6x² + 11x − 6',
    title: 'Two Routes, One Answer',
    content: 'Both are correct. Time them against each other once, and you will never choose the long one again.',
    steps: [
      { text: '**By division.** Set out $x^3-6x^2+11x-6$ under $x-3$ and work the four moves. Three passes give a quotient of $x^2-3x+2$ and a remainder of $0$. Remainder $0$, so $x-3$ is a factor.' },
      { text: '**By the factor theorem.** Let $\\text{f}(x)=x^3-6x^2+11x-6$ and substitute $x=3$:' },
      { text: '$\\text{f}(3) = (3)^3 - 6(3)^2 + 11(3) - 6$' },
      { text: '$= 27 - 54 + 33 - 6 = 0$' },
      { text: 'Since $\\text{f}(3)=0$, **$x-3$ is a factor of $x^3-6x^2+11x-6$.** Four lines instead of fifteen — and the exam accepts it in full.' },
    ],
    reveal: {
      label: 'When is division still worth doing?',
      prompt: 'If the theorem is so much faster, why divide at all?',
      answer: 'Because the theorem only tells you **whether** something is a factor. It does not tell you what is left. The moment a question says "factorise completely" or "hence solve", you need the **quotient** — and only division gives you that.',
    },
  },

  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The mistake that costs the most marks in 3.3',
    title: 'Mind the Sign',
    content: 'The theorem is written for the factor $(x-c)$, so the value you substitute is the one that makes the **bracket zero**, not the number you can see in it.\n\nTo test $(x+4)$, solve $x+4=0$ and substitute $x=-4$.\nTo test $(2x-1)$, solve $2x-1=0$ and substitute $x=\\tfrac{1}{2}$.\nTo test $(3x+2)$, substitute $x=-\\tfrac{2}{3}$.',
    notes: [
      {
        tone: 'homework',
        text: 'Always write the little equation down: **set the bracket equal to zero and solve it.** Guessing the sign from the look of the bracket is what goes wrong under time pressure.',
      },
    ],
    check: {
      id: 'chk_sign_trap',
      q: 'To test whether $(2x+3)$ is a factor of $\\text{P}(x)$, what do you work out?',
      options: [
        { val: 'A', text: '$\\text{P}(3)$' },
        { val: 'B', text: '$\\text{P}\\!\\left(\\tfrac{3}{2}\\right)$' },
        { val: 'C', text: '$\\text{P}\\!\\left(-\\tfrac{3}{2}\\right)$' },
        { val: 'D', text: '$\\text{P}(-3)$' },
      ],
      correct: 'C',
      expEn: 'Set the bracket to zero: $2x+3=0$ gives $x=-\\tfrac{3}{2}$. Option B forgets the minus, and A and D forget to divide by the 2.',
    },
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Layers',
    side: 'left',
    ratio: 42,
    eyebrow: 'What the whole chapter was for',
    title: 'Factorising a Cubic Completely',
    inlineSvg: DIAGRAMS.FACTORISE_CUBIC,
    content: 'Four moves, and they are always the same four:\n\n**1.** Test small values until one gives $0$. **2.** Write down the factor it proves. **3.** Divide it out to get a quadratic. **4.** Factorise that quadratic the usual way.\n\n$$x^3-5x^2+8x-4 = (x-1)(x-2)^2$$',
    notes: [
      {
        tone: 'plant',
        text: 'The repeated factor $(x-2)^2$ is why the curve **touches** the axis at $x=2$ instead of crossing it.',
      },
    ],
  },

  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Lightbulb',
    eyebrow: 'Do not test values at random',
    title: 'Which Values to Try',
    content: 'If a polynomial with whole-number coefficients has a whole-number root, that root **must divide the constant term**. So there are only ever a handful of candidates, and you can list them before you start.\n\nFor $x^3-5x^2+8x-4$ the constant is $-4$, so the only whole numbers worth testing are $\\pm 1$, $\\pm 2$ and $\\pm 4$. Try $1$ first — it is the fastest substitution there is.',
    notes: [
      {
        tone: 'task',
        text: 'For $\\text{P}(x)=x^3+2x^2-5x-6$, list the values you would test, in the order you would test them. (Constant $-6$.)',
      },
    ],
    check: {
      id: 'chk_candidates',
      q: 'For $\\text{P}(x) = x^3 + 4x^2 + x - 6$, which list contains every whole number worth testing?',
      options: [
        { val: 'A', text: '$\\pm1,\\ \\pm2,\\ \\pm3,\\ \\pm6$' },
        { val: 'B', text: '$1,\\ 2,\\ 3,\\ 4$' },
        { val: 'C', text: '$\\pm1,\\ \\pm4$' },
        { val: 'D', text: 'Every whole number from $-10$ to $10$' },
      ],
      correct: 'A',
      expEn: 'The candidates are the factors of the constant term $-6$, positive and negative: $\\pm1, \\pm2, \\pm3, \\pm6$. C uses the coefficient of $x^2$ by mistake, and B forgets that roots can be negative.',
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
      { text: 'Say what makes an expression a **polynomial**, and what rules it out.' },
      { text: 'Name the **degree, leading coefficient and constant term** of any polynomial.' },
      { text: 'Use the words **linear, quadratic, cubic, quartic, quintic** correctly.' },
      { text: 'State the greatest possible number of **roots and turning points** for a given degree.' },
      { text: 'Add, subtract and multiply polynomials, and give the **degree** of the result.' },
      { text: 'Write a polynomial in descending powers with **$0$ for missing terms**.' },
      { text: 'Divide one polynomial by another and state the **quotient and remainder**.' },
      { text: 'Write the answer as $\\text{P}(x)=\\text{D}(x)\\text{Q}(x)+\\text{R}(x)$.' },
      { text: 'Use the **factor theorem** to test a factor, including $(ax-b)$.' },
      { text: 'Factorise a cubic **completely**, and hence solve $\\text{P}(x)=0$.' },
    ],
    check: {
      id: 'chk_recap',
      q: '$\\text{P}(x) = x^3 - 4x^2 + x + 6$ and $\\text{P}(2)=0$. What can you write down immediately?',
      options: [
        { val: 'A', text: '$(x-2)$ is a factor, and dividing by it leaves a quadratic' },
        { val: 'B', text: '$(x+2)$ is a factor' },
        { val: 'C', text: 'The other two roots are $-2$ and $3$' },
        { val: 'D', text: 'The polynomial cannot be factorised' },
      ],
      correct: 'A',
      expEn: '$\\text{P}(2)=0$ gives the factor $(x-2)$ by the factor theorem, and dividing the cubic by it leaves a quadratic you can factorise. You cannot know the other roots (C) until you have done that division.',
    },
  },
];
