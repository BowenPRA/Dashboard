// src/data/ADD_MATH/AM_4B/workbook.js
// The "Practice" task for section 4.3: the parts of Exercise 4.3 the Sketch
// It engine does not stage — reading intercepts off a printed figure (Q1, Q3),
// a cubic against a parabola on one grid (Q7, Q8), and the two challenge
// questions that run the whole section backwards, from a printed graph to the
// values of a, b, c and k (Q9, Q10). Every sketching part (Q2, Q4, Q5, Q6) is
// in Sketch It, so between the two tasks every part of the exercise is set.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// MARKING NOTE. Coordinates and several values in one answer are fill_blank,
// one box each, in a stated order (left to right along the axis, or in the
// order the question names the letters), because the equivalence engine
// marks one value at a time and has no idea what a comma or "and" means.
// Fractions in a `correct` field are \dfrac, never \tfrac.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** The diagram shows $y = (x - 2)(x + 1)(x - 3)$. Find the $x$-coordinates of $A$, $B$ and $C$, where the curve meets the $x$-axis, and the $y$-coordinate of $D$, where it meets the positive $y$-axis.',
        inlineSvg: DIAGRAMS.Q1_FIGURE,
        textParts: ['$A$: $x = $ ', '.   $B$: $x = $ ', '.   $C$: $x = $ ', '.   $D$: $y = $ ', '.'],
        blanks: {
          1: { correct: '-1', width: 5 },
          2: { correct: '2', width: 5 },
          3: { correct: '3', width: 5 },
          4: { correct: '6', width: 5 },
        },
        solution: [
          'On the $x$-axis, $y = 0$, so one of the three brackets is zero: $x = 2$, $x = -1$ or $x = 3$.',
          'Read them off the picture from left to right: $A$ is $(-1, 0)$, $B$ is $(2, 0)$ and $C$ is $(3, 0)$.',
          'On the $y$-axis, $x = 0$: $y = (-2)(1)(-3) = 6$, so $D$ is $(0, 6)$.',
          'A quick check of the shape: the product of the $x$ coefficients is $1 \\times 1 \\times 1 = 1 > 0$, so the curve climbs to the right — which it does.',
        ],
        answer: '$A(-1, 0)$, $B(2, 0)$, $C(3, 0)$, $D(0, 6)$',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: '**3** The diagram shows $y = 2(x + 1)^2(7 - 2x)$. Find the coordinates of $A$, where the curve meets the positive $x$-axis, and $B$, where it meets the positive $y$-axis.',
        inlineSvg: DIAGRAMS.Q3_FIGURE,
        textParts: ['$A$: $x = $ ', '.   $B$: $y = $ ', '.'],
        blanks: {
          1: { correct: '$\\dfrac{7}{2}$', width: 6 },
          2: { correct: '14', width: 5 },
        },
        solution: [
          'For $A$, put $y = 0$. The squared bracket gives $x = -1$, which is on the **negative** axis and is where the curve touches; the other bracket gives $7 - 2x = 0$, so $x = \\dfrac{7}{2}$.',
          'So $A$ is $\\left(\\dfrac{7}{2}, 0\\right)$.',
          'For $B$, put $x = 0$: $y = 2 \\times 1^2 \\times 7 = 14$. So $B$ is $(0, 14)$.',
          'Do not forget the $2$ in front when finding $B$ — it doubles the $y$-intercept but does nothing to the $x$-intercepts.',
        ],
        answer: '$A\\left(\\dfrac{7}{2}, 0\\right)$, $B(0, 14)$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p7a',
        type: 'mcq',
        prompt: '**7a** On the same axes, sketch $y = x(x - 5)(x - 7)$ and $y = x(7 - x)$, showing where each meets the coordinate axes. Which description is correct?',
        inlineSvgSolved: DIAGRAMS.Q7_FIGURE,
        options: [
          { val: 'a', text: 'The cubic crosses at $0$, $5$ and $7$ and climbs to the right; the parabola crosses at $0$ and $7$ and opens downwards' },
          { val: 'b', text: 'The cubic crosses at $0$, $-5$ and $-7$; the parabola crosses at $0$ and $-7$' },
          { val: 'c', text: 'The cubic crosses at $0$, $5$ and $7$ and falls to the right; the parabola opens upwards' },
          { val: 'd', text: 'Both curves cross the $y$-axis at $35$' },
        ],
        correct: 'a',
        solution: [
          'The cubic $y = x(x - 5)(x - 7)$: brackets zero at $x = 0$, $5$ and $7$, and the product of the $x$ coefficients is $+1$, so it climbs to the right. Through the origin, so the $y$-intercept is $0$.',
          'The parabola $y = x(7 - x)$: zero at $x = 0$ and $x = 7$, and the $x^2$ coefficient is $-1$, so it opens downwards with its maximum at $x = 3.5$.',
          'Both pass through the origin and both pass through $(7, 0)$ — so those are two of the intersection points before any algebra is done.',
        ],
        answer: 'Cubic through $0, 5, 7$ climbing right; parabola through $0, 7$ opening down',
      },
      {
        id: 'p7b',
        type: 'fill_blank',
        prompt: '**7b** Use algebra to find the coordinates of all the points where $y = x(x - 5)(x - 7)$ and $y = x(7 - x)$ intersect.',
        inlineSvg: DIAGRAMS.Q7_FIGURE,
        textParts: ['Left to right: $x = $ ', ', $x = $ ', ', $x = $ ', '.   The middle point has $y = $ ', '.'],
        blanks: {
          1: { correct: '0', width: 5 },
          2: { correct: '4', width: 5 },
          3: { correct: '7', width: 5 },
          4: { correct: '12', width: 5 },
        },
        solution: [
          'The curves meet where the $y$ values agree: $x(x - 5)(x - 7) = x(7 - x)$.',
          'Do **not** divide by $x$ — that throws away the solution $x = 0$. Instead bring everything to one side and factorise: $x(x - 5)(x - 7) + x(x - 7) = 0$, because $x(7 - x) = -x(x - 7)$.',
          'Take out the common factor $x(x - 7)$: $x(x - 7)\\left[(x - 5) + 1\\right] = x(x - 7)(x - 4) = 0$.',
          'So $x = 0$, $x = 4$ or $x = 7$. Substitute into the easier equation, $y = x(7 - x)$: $y = 0$, $y = 12$, $y = 0$.',
          'The points are $(0, 0)$, $(4, 12)$ and $(7, 0)$ — two of them were visible on the sketch before any algebra.',
        ],
        answer: '$(0, 0)$, $(4, 12)$, $(7, 0)$',
      },
      {
        id: 'p8a',
        type: 'mcq',
        prompt: '**8a** On the same axes, sketch $y = (2x - 1)(x + 2)(x + 1)$ and $y = (x + 1)(4 - x)$, showing where each meets the coordinate axes. Which is correct?',
        inlineSvgSolved: DIAGRAMS.Q8_FIGURE,
        options: [
          { val: 'a', text: 'Cubic: $x$-intercepts $-2$, $-1$, $\\tfrac{1}{2}$ and $y$-intercept $-2$. Parabola: $x$-intercepts $-1$, $4$ and $y$-intercept $4$, opening downwards' },
          { val: 'b', text: 'Cubic: $x$-intercepts $2$, $1$, $-\\tfrac{1}{2}$. Parabola: $x$-intercepts $1$, $-4$' },
          { val: 'c', text: 'Cubic: $x$-intercepts $-2$, $-1$, $1$ and $y$-intercept $2$. Parabola opens upwards' },
          { val: 'd', text: 'Both curves have $y$-intercept $-2$' },
        ],
        correct: 'a',
        solution: [
          'Cubic: $2x - 1 = 0$ gives $x = \\tfrac{1}{2}$; the other brackets give $-2$ and $-1$. At $x = 0$, $y = (-1)(2)(1) = -2$. The $x$ coefficients multiply to $2 > 0$, so it climbs to the right.',
          'Parabola: zero at $x = -1$ and $x = 4$; at $x = 0$, $y = 1 \\times 4 = 4$; the $x^2$ coefficient is $-1$, so it opens downwards.',
          'Both curves share the bracket $(x + 1)$, so both pass through $(-1, 0)$ — one intersection for free.',
        ],
        answer: 'Cubic through $-2, -1, \\tfrac{1}{2}$ with $y$-intercept $-2$; parabola through $-1, 4$ with $y$-intercept $4$',
      },
      {
        id: 'p8b',
        type: 'fill_blank',
        prompt: '**8b** Use algebra to find the coordinates of all the points where $y = (2x - 1)(x + 2)(x + 1)$ and $y = (x + 1)(4 - x)$ intersect.',
        inlineSvg: DIAGRAMS.Q8_FIGURE,
        textParts: ['Left to right: $x = $ ', ', $x = $ ', ', $x = $ ', '.   The left point has $y = $ ', ' and the right point has $y = $ ', '.'],
        blanks: {
          1: { correct: '-3', width: 5 },
          2: { correct: '-1', width: 5 },
          3: { correct: '1', width: 5 },
          4: { correct: '-14', width: 5 },
          5: { correct: '6', width: 5 },
        },
        solution: [
          'Set the two expressions equal: $(2x - 1)(x + 2)(x + 1) = (x + 1)(4 - x)$.',
          'Both sides contain $(x + 1)$. Do not cancel it — move everything to one side and take it out as a common factor, so that $x = -1$ survives: $(x + 1)\\left[(2x - 1)(x + 2) - (4 - x)\\right] = 0$.',
          'Simplify the bracket: $(2x - 1)(x + 2) = 2x^2 + 3x - 2$, so the bracket is $2x^2 + 3x - 2 - 4 + x = 2x^2 + 4x - 6 = 2(x + 3)(x - 1)$.',
          'So $2(x + 1)(x + 3)(x - 1) = 0$: $x = -3$, $x = -1$ or $x = 1$.',
          'Use $y = (x + 1)(4 - x)$: at $x = -3$, $y = (-2)(7) = -14$; at $x = -1$, $y = 0$; at $x = 1$, $y = (2)(3) = 6$. The points are $(-3, -14)$, $(-1, 0)$ and $(1, 6)$.',
        ],
        answer: '$(-3, -14)$, $(-1, 0)$, $(1, 6)$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c9',
        type: 'fill_blank',
        prompt: '**9 Challenge.** The diagram shows the graph of $y = k(x - a)^2(x - b)$. Find the values of $a$, $b$ and $k$.',
        inlineSvg: DIAGRAMS.Q9_GRID,
        textParts: ['$a = $ ', ',   $b = $ ', ',   $k = $ ', '.'],
        blanks: {
          1: { correct: '1', width: 5 },
          2: { correct: '2', width: 5 },
          3: { correct: '-2', width: 5 },
        },
        solution: [
          'Read the $x$-intercepts first. The curve **touches** the axis at $x = 1$ and **crosses** it at $x = 2$.',
          'A touch comes from the squared bracket, so $a = 1$; the crossing comes from the single bracket, so $b = 2$. Getting them the other way round is the mistake this question is set to catch.',
          'That leaves $k$. Use the one point on the graph that is not an intercept-from-a-bracket: the $y$-intercept, $(0, 4)$.',
          'Substitute: $4 = k(0 - 1)^2(0 - 2) = k \\times 1 \\times (-2) = -2k$, so $k = -2$.',
          'Check the shape: $k < 0$ means the curve falls to the right — and on the grid it does.',
        ],
        answer: '$a = 1$, $b = 2$, $k = -2$',
      },
      {
        id: 'c10',
        type: 'fill_blank',
        prompt: '**10 Challenge.** The diagram shows the graph of $y = |k(x - a)(x - b)(x - c)|$, where $a < b < c$. Find the values of $a$, $b$, $c$ and $k$.',
        inlineSvg: DIAGRAMS.Q10_GRID,
        textParts: ['$a = $ ', ',   $b = $ ', ',   $c = $ ', ',   $k = $ ', '.'],
        blanks: {
          1: { correct: '-1', width: 5 },
          2: { correct: '1', width: 5 },
          3: { correct: '2', width: 5 },
          4: { correct: '3', width: 5, accept: ['-3'] },
        },
        solution: [
          'The modulus graph meets the axis exactly where the cubic did — reflecting does not move an intercept. The three sharp corners are at $x = -1$, $1$ and $2$, so with $a < b < c$: $a = -1$, $b = 1$, $c = 2$.',
          'For $k$ use the $y$-intercept, $(0, 6)$: $6 = |k(0 + 1)(0 - 1)(0 - 2)| = |2k|$, so $k = 3$ or $k = -3$.',
          'Both give the same modulus graph, because reflecting everything below the axis destroys the difference between $k$ and $-k$. The book takes $k = 3$; $k = -3$ is equally correct.',
          'Check with another point: between $1$ and $2$ the hump reaches about $2$, and $|3 \\times 2.5 \\times 0.5 \\times (-0.5)| = 1.875$ at $x = 1.5$. It fits.',
        ],
        answer: '$a = -1$, $b = 1$, $c = 2$, $k = 3$ (or $-3$)',
      },
    ],
  },
];
