// src/data/ADD_MATH/AM_4A/workbook.js
// The "Practice" task: the parts of Exercise 4.1 that the Case Solver does not
// carry. Questions 1a–1d and 1h are worked in the solver, stage by stage; the
// twelve here are the shapes it cannot stage — fractions inside the bars, a
// simultaneous pair, the hidden quadratic, sums of moduli, the square-root
// trick — each with a worked solution (the book prints answers only; the
// method is what we add). Between the two tasks every part of 4.1 is set.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// MARKING NOTE, and why so many of these are `fill_blank`.
// The equivalence engine (utils/mathEquivalence.js) understands a value, an
// equation, one inequality and a CHAIN like -1 < x < 2 — but it has no idea what
// "or" means. An answer with two separate solutions ("x = 1/3 or x = 1") would
// fall through to a normalised string compare, so a student who typed the two
// values in the other order would be marked wrong. Every two-answer question is
// therefore a fill_blank with a box per value, labelled SMALLER and LARGER so
// the order is the question's, not the marker's guess.
//
// Fractions in a `correct` field are written \dfrac, never \tfrac: clean() in
// mathEquivalence rewrites \dfrac and \frac into division and leaves \tfrac
// alone, which would drop the answer into string-compare.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1e',
        type: 'fill_blank',
        prompt: '**1e** Solve $|1 - 4x| = |2 - x|$.',
        textParts: ['Smaller value: $x = $ ', '.   Larger value: $x = $ ', '.'],
        blanks: {
          1: { correct: '$-\\dfrac{1}{3}$', width: 6 },
          2: { correct: '$\\dfrac{3}{5}$', width: 6 },
        },
        solution: [
          'Case 1: $1 - 4x = 2 - x$, so $-3x = 1$ and $x = -\\dfrac{1}{3}$.',
          'Case 2: $1 - 4x = -(2 - x) = x - 2$, so $-5x = -3$ and $x = \\dfrac{3}{5}$.',
          'CHECK $x = \\dfrac{3}{5}$: $\\left|1 - \\dfrac{12}{5}\\right| = \\dfrac{7}{5}$ and $\\left|2 - \\dfrac{3}{5}\\right| = \\dfrac{7}{5}$.',
          'Both cases produced an answer, which is what you expect when the gradients differ.',
        ],
        answer: '$x = -\\dfrac{1}{3}$ or $x = \\dfrac{3}{5}$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1f',
        type: 'fill_blank',
        prompt: '**1f** Solve $\\left|1 - \\dfrac{x}{2}\\right| = |3x + 2|$.',
        textParts: ['Smaller value: $x = $ ', '.   Larger value: $x = $ ', '.'],
        blanks: {
          1: { correct: '$-\\dfrac{6}{5}$', width: 6 },
          2: { correct: '$-\\dfrac{2}{7}$', width: 6 },
        },
        solution: [
          'Case 1: $1 - \\dfrac{x}{2} = 3x + 2$. Multiply through by $2$ to clear the fraction: $2 - x = 6x + 4$.',
          'So $-2 = 7x$ and $x = -\\dfrac{2}{7}$.',
          'Case 2: $1 - \\dfrac{x}{2} = -(3x + 2)$. Doubling gives $2 - x = -6x - 4$.',
          'So $5x = -6$ and $x = -\\dfrac{6}{5}$.',
          'Both answers are negative, so read the two carefully: $-\\dfrac{6}{5} = -1.2$ is the **smaller**.',
        ],
        answer: '$x = -\\dfrac{6}{5}$ or $x = -\\dfrac{2}{7}$',
      },
      {
        id: 'p1g',
        type: 'fill_blank',
        prompt: '**1g** Solve $|3x - 2| = |2x + 5|$.',
        textParts: ['Smaller value: $x = $ ', '.   Larger value: $x = $ ', '.'],
        blanks: {
          1: { correct: '$-\\dfrac{3}{5}$', width: 6 },
          2: { correct: '7', width: 6 },
        },
        solution: [
          'Case 1: $3x - 2 = 2x + 5$, so $x = 7$.',
          'Case 2: $3x - 2 = -(2x + 5) = -2x - 5$, so $5x = -3$ and $x = -\\dfrac{3}{5}$.',
          'CHECK $x = 7$: $|21 - 2| = 19$ and $|14 + 5| = 19$.',
          'You could also square: $(3x-2)^2 = (2x+5)^2$ gives $5x^2 - 32x - 21 = 0$, which factorises as $(5x + 3)(x - 7) = 0$ — the same pair.',
        ],
        answer: '$x = -\\dfrac{3}{5}$ or $x = 7$',
      },
      {
        id: 'p1i',
        type: 'fill_blank',
        prompt: '**1i** Solve $|2 - x| = 5\\left|\\dfrac{1}{2}x + 1\\right|$.',
        textParts: ['Smaller value: $x = $ ', '.   Larger value: $x = $ ', '.'],
        blanks: {
          1: { correct: '$-\\dfrac{14}{3}$', width: 6 },
          2: { correct: '$-\\dfrac{6}{7}$', width: 6 },
        },
        solution: [
          'Take the $5$ inside the bars: $5\\left|\\dfrac{1}{2}x + 1\\right| = \\left|\\dfrac{5}{2}x + 5\\right|$.',
          'Case 1: $2 - x = \\dfrac{5}{2}x + 5$. Double everything: $4 - 2x = 5x + 10$, so $-6 = 7x$ and $x = -\\dfrac{6}{7}$.',
          'Case 2: $2 - x = -\\left(\\dfrac{5}{2}x + 5\\right)$. Doubling gives $4 - 2x = -5x - 10$, so $3x = -14$ and $x = -\\dfrac{14}{3}$.',
          'CHECK $x = -\\dfrac{6}{7}$: the left side is $\\dfrac{20}{7}$, and the right side is $5\\left|-\\dfrac{3}{7} + 1\\right| = 5 \\times \\dfrac{4}{7} = \\dfrac{20}{7}$.',
        ],
        answer: '$x = -\\dfrac{14}{3}$ or $x = -\\dfrac{6}{7}$',
      },
      {
        id: 'p2',
        type: 'fill_blank',
        prompt: '**2** Solve the simultaneous equations $y = |x - 5|$ and $y = |8 - x|$.',
        textParts: ['$x = $ ', '   and   $y = $ ', '.'],
        blanks: {
          1: { correct: '$\\dfrac{13}{2}$', width: 6 },
          2: { correct: '$\\dfrac{3}{2}$', width: 6 },
        },
        solution: [
          'Simultaneous means the two $y$ values are the same, so set the right-hand sides equal: $|x - 5| = |8 - x|$.',
          'Case 1: $x - 5 = 8 - x$, so $2x = 13$ and $x = \\dfrac{13}{2}$.',
          'Case 2: $x - 5 = -(8 - x) = x - 8$, giving $-5 = -8$, which is false.',
          'The question asks for the **point**, so finish by finding $y$: $y = \\left|\\dfrac{13}{2} - 5\\right| = \\dfrac{3}{2}$.',
          'An answer of $x$ alone would lose a mark here — "solve the simultaneous equations" wants both coordinates.',
        ],
        answer: '$x = \\dfrac{13}{2}$, $y = \\dfrac{3}{2}$',
      },
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**3** Solve the equation $6|x + 2|^2 + 7|x + 2| - 3 = 0$.',
        textParts: ['Smaller value: $x = $ ', '.   Larger value: $x = $ ', '.'],
        blanks: {
          1: { correct: '$-\\dfrac{7}{3}$', width: 6 },
          2: { correct: '$-\\dfrac{5}{3}$', width: 6 },
        },
        solution: [
          'This is a quadratic whose unknown is the whole modulus. Let $u = |x + 2|$, so $6u^2 + 7u - 3 = 0$.',
          'Factorise: $(3u - 1)(2u + 3) = 0$, giving $u = \\dfrac{1}{3}$ or $u = -\\dfrac{3}{2}$.',
          '**Reject $u = -\\dfrac{3}{2}$** at once — $u$ is a modulus, and a modulus is never negative.',
          'That leaves $|x + 2| = \\dfrac{1}{3}$, so $x + 2 = \\dfrac{1}{3}$ or $x + 2 = -\\dfrac{1}{3}$.',
          '$x = -2 + \\dfrac{1}{3} = -\\dfrac{5}{3}$, or $x = -2 - \\dfrac{1}{3} = -\\dfrac{7}{3}$.',
        ],
        answer: '$x = -\\dfrac{7}{3}$ or $x = -\\dfrac{5}{3}$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c4a',
        type: 'fill_blank',
        prompt: '**4a** Solve the equation $x^2 - 6|x| + 8 = 0$.',
        textParts: ['$x = $ ', ', ', ', ', ' or ', '.'],
        blanks: {
          1: { correct: '-4', width: 5 },
          2: { correct: '-2', width: 5 },
          3: { correct: '2', width: 5 },
          4: { correct: '4', width: 5 },
        },
        solution: [
          'The key move is $x^2 = |x|^2$, which turns the whole equation into a quadratic in $|x|$.',
          'Let $u = |x|$. Then $u^2 - 6u + 8 = 0$, so $(u - 2)(u - 4) = 0$ and $u = 2$ or $u = 4$.',
          'Now unfold each one. $|x| = 2$ gives $x = 2$ or $x = -2$.',
          '$|x| = 4$ gives $x = 4$ or $x = -4$.',
          'Four roots, because every positive value of $|x|$ comes from two values of $x$. List them in order: $-4, -2, 2, 4$.',
        ],
        answer: '$x = -4,\\ -2,\\ 2,\\ 4$',
      },
      {
        id: 'c4b',
        type: 'mcq',
        prompt: '**4b** Draw the graph of $\\text{f}(x) = x^2 - 6|x| + 8$. Which description is correct?',
        inlineSvgSolved: DIAGRAMS.ABS_QUAD,
        options: [
          { val: 'a', text: 'A single upward parabola with its minimum at $(0, 8)$' },
          { val: 'b', text: 'A W shape, symmetrical about the $y$-axis, crossing the $x$-axis four times with minimum points at $(\\pm 3, -1)$' },
          { val: 'c', text: 'A V shape with its vertex at $(0, 8)$' },
          { val: 'd', text: 'An upside-down parabola crossing at $x = 2$ and $x = 4$ only' },
        ],
        correct: 'b',
        solution: [
          'For $x \\geq 0$ the modulus does nothing, so the right-hand half is just $y = x^2 - 6x + 8$ — an ordinary parabola with roots $2$ and $4$ and a minimum at $(3, -1)$.',
          'Replacing $x$ by $|x|$ makes the function **even**: $\\text{f}(-x) = \\text{f}(x)$, so the left-hand half is the mirror image of the right in the $y$-axis.',
          'That is why the graph is a W: two minimum points at $(3, -1)$ and $(-3, -1)$, a local maximum at $(0, 8)$, and four roots.',
          'The four roots are exactly the four answers from part **a**.',
        ],
        answer: 'A W shape with minima at $(\\pm 3, -1)$ and roots $-4, -2, 2, 4$',
      },
      {
        id: 'c4c',
        type: 'mcq',
        prompt: '**4c** Use your graph to find the range of $\\text{f}(x) = x^2 - 6|x| + 8$.',
        inlineSvg: DIAGRAMS.ABS_QUAD,
        options: [
          { val: 'a', text: '$\\text{f}(x) \\geq -1$' },
          { val: 'b', text: '$\\text{f}(x) \\geq 0$' },
          { val: 'c', text: '$-1 \\leq \\text{f}(x) \\leq 8$' },
          { val: 'd', text: '$\\text{f}(x) \\leq 8$' },
        ],
        correct: 'a',
        solution: [
          'The **range** is the set of $y$ values the graph actually reaches.',
          'The lowest point on the whole curve is $y = -1$, at $x = 3$ and $x = -3$.',
          'Both arms rise without limit as $x$ moves away from zero, so there is no largest value.',
          'Hence the range is $\\text{f}(x) \\geq -1$. Option **c** mistakes the local maximum at $(0, 8)$ for a ceiling, but the graph passes straight through $y = 8$ and keeps climbing.',
        ],
        answer: '$\\text{f}(x) \\geq -1$',
      },
      {
        id: 'c5',
        type: 'fill_blank',
        prompt: '**5 Challenge.** Solve the equation $|x + 1| + |2x - 3| = 8$.',
        textParts: ['Smaller value: $x = $ ', '.   Larger value: $x = $ ', '.'],
        blanks: {
          1: { correct: '-2', width: 6 },
          2: { correct: '$\\dfrac{10}{3}$', width: 6 },
        },
        solution: [
          'A **sum** of two moduli cannot be squared, so split the number line where each modulus changes rule: at $x = -1$ and at $x = \\dfrac{3}{2}$.',
          'For $x < -1$ both brackets are negative, so the equation becomes $-(x+1) - (2x-3) = 8$, that is $-3x + 2 = 8$, giving $x = -2$. That **is** less than $-1$, so keep it.',
          'For $-1 \\leq x < \\dfrac{3}{2}$ only the second flips: $(x+1) - (2x-3) = 8$, that is $-x + 4 = 8$, giving $x = -4$. That is **not** in this region, so reject it.',
          'For $x \\geq \\dfrac{3}{2}$ neither flips: $(x+1) + (2x-3) = 8$, that is $3x - 2 = 8$, giving $x = \\dfrac{10}{3}$. That is in the region, so keep it.',
          'CHECK: $|-2+1| + |-4-3| = 1 + 7 = 8$, and $\\left|\\dfrac{13}{3}\\right| + \\left|\\dfrac{11}{3}\\right| = 8$.',
        ],
        answer: '$x = -2$ or $x = \\dfrac{10}{3}$',
      },
      {
        id: 'c6',
        type: 'fill_blank',
        prompt: '**6 Challenge.** Solve the simultaneous equations $y = |x - 5|$ and $y = |3 - 2x| + 2$.',
        textParts: ['First point: $x = $ ', ', $y = $ ', '.   Second point: $x = $ ', ', $y = $ ', '.'],
        blanks: {
          1: { correct: '0', width: 5 },
          2: { correct: '5', width: 5 },
          3: { correct: '2', width: 5 },
          4: { correct: '3', width: 5 },
        },
        solution: [
          'Set the two expressions equal: $|x - 5| = |3 - 2x| + 2$. The stray $+2$ blocks squaring, so work by regions.',
          'The critical values are $x = \\dfrac{3}{2}$ (from $3 - 2x$) and $x = 5$ (from $x - 5$).',
          'For $x < \\dfrac{3}{2}$: $5 - x = (3 - 2x) + 2$, so $5 - x = 5 - 2x$ and $x = 0$. In the region, so keep it. Then $y = |0 - 5| = 5$.',
          'For $\\dfrac{3}{2} \\leq x < 5$: $5 - x = (2x - 3) + 2$, so $5 - x = 2x - 1$ and $3x = 6$, giving $x = 2$. In the region, so keep it. Then $y = |2 - 5| = 3$.',
          'For $x \\geq 5$: $x - 5 = 2x - 1$ gives $x = -4$, which is not in the region — reject.',
          'The two points are $(0, 5)$ and $(2, 3)$. List them with the smaller $x$ first.',
        ],
        answer: '$(0,\\ 5)$ and $(2,\\ 3)$',
      },
      {
        id: 'c7',
        type: 'fill_blank',
        prompt: '**7 Challenge.** Solve the equation $2|3x + 4y - 2| + 3\\sqrt{25 - 5x + 2y} = 0$.',
        textParts: ['$x = $ ', '   and   $y = $ ', '.'],
        blanks: {
          1: { correct: '4', width: 5 },
          2: { correct: '$-\\dfrac{5}{2}$', width: 6 },
        },
        solution: [
          'Look at the two terms before touching any algebra. A modulus is never negative, and a square root is never negative, so **both terms are at least zero**.',
          'Two things that cannot be negative can only add to zero if each of them is zero. That converts one equation into two:',
          '$3x + 4y - 2 = 0$ and $25 - 5x + 2y = 0$.',
          'From the second, $2y = 5x - 25$. Substitute into the first: $3x + 2(5x - 25) - 2 = 0$.',
          'So $13x = 52$ and $x = 4$. Then $2y = 20 - 25 = -5$, giving $y = -\\dfrac{5}{2}$.',
          'CHECK: $3(4) + 4\\left(-\\dfrac{5}{2}\\right) - 2 = 0$, and $25 - 20 - 5 = 0$, so both terms vanish.',
        ],
        answer: '$x = 4$, $y = -\\dfrac{5}{2}$',
      },
    ],
  },
];
