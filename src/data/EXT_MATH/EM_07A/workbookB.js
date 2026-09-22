// src/data/EXT_MATH/EM_07A/workbookB.js
// The "Book Problems" task for EM_07A: the LINES and EQUATIONS parts of
// Wolsey Hall Assignment 07 that no engine stages —
//   Q14a  the line through two points, as y = mx + c           → Focus 1
//   Q14c  where it meets another line — and what you notice    → Practice 2a, 2b
//   Q10   a parallelogram's angles in x and y                  → Practice 3
//   Q16a  an area that gives a quadratic ("show that")         → Practice 4
//   Q16b  factorise, solve, and reject the length that cannot be → Practice 5
// plus a Challenge that forms its own simultaneous equations from words.
// Every number is original. The Q14c solving itself is also staged by the
// Simultaneous task (item s_line); 2a/2b add the "state what you notice" the
// engine cannot ask. Q14b (the angle with the x-axis) is in EM_07B.
//
// English only — EXT_MATH declares `bilingual: false`.
//
// MARKING NOTES: two values are `fill_blank`, one box each, in a stated
// order; a "show that" equation is `mcq`, because the equivalence engine
// would accept any rearrangement of it as well as the one the question wants.
import { DIAGRAMS } from './diagrams.js';

export const workbookB = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** A straight line joins the points $A(-1, 2)$ and $C(2, 11)$. Find the equation of the line $AC$ in the form $y = mx + c$.',
        textParts: ['$y = $ ', ' $x \\;+$ ', ''],
        blanks: {
          1: { correct: '3', width: 4 },
          2: { correct: '5', width: 4 },
        },
        solution: [
          'Gradient: $m = \\dfrac{11 - 2}{2 - (-1)} = \\dfrac{9}{3} = 3$. Take the $y$ values in the same order as the $x$ values.',
          'So $y = 3x + c$. Put in the point $A$: $2 = 3(-1) + c$, so $c = 5$.',
          'Check with $C$: $3(2) + 5 = 11$ ✓. The equation is $y = 3x + 5$.',
        ],
        answer: '$y = 3x + 5$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p2a',
        type: 'fill_blank',
        prompt: '**2a** The line $x + y = 13$ crosses the line $AC$ from question 1. Find the coordinates of the point where they meet.',
        textParts: ['$($', ', ', '$)$'],
        blanks: {
          1: { correct: '2', width: 4 },
          2: { correct: '11', width: 4 },
        },
        solution: [
          'Two lines meet where both equations are true: solve $y = 3x + 5$ and $x + y = 13$ simultaneously.',
          'The first says what $y$ is, so substitute: $x + (3x + 5) = 13$.',
          '$4x + 5 = 13$, so $4x = 8$ and $x = 2$. Then $y = 3(2) + 5 = 11$.',
          'They meet at $(2, 11)$.',
        ],
        answer: '$(2, 11)$',
      },
      {
        id: 'p2b',
        type: 'mcq',
        prompt: '**2b** What do you notice about the point $(2, 11)$?',
        options: [
          { val: 'a', text: 'It is the point $A$.' },
          { val: 'b', text: 'It is the midpoint of $AC$.' },
          { val: 'c', text: 'It is the point $C$.' },
          { val: 'd', text: 'It is on the $y$-axis.' },
        ],
        correct: 'c',
        solution: [
          'Compare it with the two points in question 1: $C$ is $(2, 11)$.',
          'So the line $x + y = 13$ passes through $C$ — the two lines meet exactly at one end of $AC$. Check: $2 + 11 = 13$ ✓.',
        ],
        answer: 'It is the point $C$',
      },
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**3** Here is a parallelogram. The angles are in degrees. Work out the value of $x$ and the value of $y$.',
        inlineSvg: DIAGRAMS.WB_PARALLELOGRAM,
        textParts: ['$x = $ ', ',   $y = $ ', ''],
        blanks: {
          1: { correct: '20', width: 4 },
          2: { correct: '15', width: 4 },
        },
        solution: [
          'Two unknowns need two equations — and the parallelogram gives two angle facts.',
          '**Opposite angles are equal**: angle $A$ = angle $C$, so $4x + y = 3x + 2y + 5$, which tidies to $x - y = 5$.',
          '**Co-interior angles add up to $180^\\circ$**: angles $A$ and $B$ lie between the parallel sides $AD$ and $BC$, so $(4x + y) + (2x + 3y) = 180$. That is $6x + 4y = 180$, or $3x + 2y = 90$.',
          '$x - y = 5$ says $x = y + 5$. Substitute: $3(y + 5) + 2y = 90$, so $5y + 15 = 90$ and $y = 15$. Then $x = 20$.',
          'Check: $A = 95^\\circ$, $B = 85^\\circ$, $C = 95^\\circ$ — opposite angles match and $95 + 85 = 180$ ✓.',
        ],
        answer: '$x = 20$, $y = 15$',
      },
      {
        id: 'p4',
        type: 'mcq',
        prompt: '**4** The diagram shows a right-angled triangle. Its area is 14 cm². Which equation does the area give?',
        inlineSvg: DIAGRAMS.WB_AREA_TRI,
        options: [
          { val: 'a', text: '$2x^2 - x - 14 = 0$' },
          { val: 'b', text: '$2x^2 - x - 28 = 0$' },
          { val: 'c', text: '$x^2 - x - 28 = 0$' },
          { val: 'd', text: '$2x^2 + x - 28 = 0$' },
        ],
        correct: 'b',
        solution: [
          'The two shorter sides meet at the right angle, so they are the base and the height: area $= \\dfrac{1}{2} \\times x \\times (2x - 1)$.',
          '$\\dfrac{1}{2}x(2x - 1) = 14$. Multiply both sides by 2 to clear the half: $x(2x - 1) = 28$.',
          'Expand: $2x^2 - x = 28$, so $2x^2 - x - 28 = 0$.',
          'Option (a) forgot to double the 14 when the half was cleared; (d) lost the minus inside the bracket.',
        ],
        answer: '$2x^2 - x - 28 = 0$',
      },
      {
        id: 'p5',
        type: 'text',
        prompt: '**5** Use factorisation to solve $2x^2 - x - 28 = 0$, and find the value of $x$ in the context of question 4.',
        answer: '4',
        accept: ['x = 4', 'x=4', '4 cm'],
        solution: [
          'Look for two numbers that multiply to $2 \\times (-28) = -56$ and add to $-1$: $-8$ and $7$.',
          'Split the middle term: $2x^2 - 8x + 7x - 28 = 2x(x - 4) + 7(x - 4) = (2x + 7)(x - 4)$.',
          'So $(2x + 7)(x - 4) = 0$, giving $x = -3.5$ or $x = 4$.',
          '$x$ is a length, so it cannot be negative: $x = 4$. Check: the sides are 4 cm and 7 cm, and $\\dfrac{1}{2} \\times 4 \\times 7 = 14$ ✓.',
        ],
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c6',
        type: 'fill_blank',
        prompt: '**6** Two adult tickets and three child tickets cost £31. One adult ticket and two child tickets cost £18. Find the price of each ticket.',
        textParts: ['Adult: £', ',   child: £', ''],
        blanks: {
          1: { correct: '8', width: 4 },
          2: { correct: '5', width: 4 },
        },
        solution: [
          'Let an adult ticket cost £$a$ and a child ticket £$c$. Each sentence is one equation.',
          '$2a + 3c = 31$ (1) and $a + 2c = 18$ (2).',
          'Neither letter is on its own, but (2) doubled matches the $a$ terms: $2a + 4c = 36$ (3).',
          'The $a$ terms have the same sign, so subtract: (3) − (1) gives $c = 5$.',
          'Back in (2): $a + 10 = 18$, so $a = 8$. Check in (1): $16 + 15 = 31$ ✓.',
        ],
        answer: 'Adult £8, child £5',
      },
    ],
  },
];
