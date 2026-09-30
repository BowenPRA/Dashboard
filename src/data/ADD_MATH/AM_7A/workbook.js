// src/data/ADD_MATH/AM_7A/workbook.js
// The "Practice" task for AM_7A: the question types from the problem bank
// (docs/add-math-7-1-circles.md) that the three Circle Lab tasks do not stage.
//
//   Plot the Circle      carries type A (whole-number centres) and type F's
//                        "what happens at each axis"
//   Write the Equation   carries types B, D, E and "touches an axis"
//   Complete the Square  carries type C
//
// What is left, and is set here with a worked solution for every question:
// a fractional radius, the book's g-f-c formula, a circle that shares its
// centre with another, a point inside or outside a circle, the exact axis
// crossings of a sketch, circles pinned by a tangent axis (two answers), an
// unknown constant k, and the packed-circle designs that the exercise's
// challenge questions are built on. Every number is fresh.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// MARKING NOTE. Several values in one answer are fill_blank, one box each, in
// a stated order, because the equivalence engine marks one value at a time.
// An answer with a surd in it is an mcq: a typed "3 + 2√6" has too many
// spellings to mark. Fractions in a `correct` field are \dfrac, never \tfrac.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** Write down the centre and the radius of the circle $\\left(x + \\dfrac{1}{2}\\right)^2 + (y - 3)^2 = \\dfrac{49}{4}$.',
        textParts: ['Centre: $x = $ ', ', $y = $ ', '.   Radius $ = $ ', '.'],
        blanks: {
          1: { correct: '$-\\dfrac{1}{2}$', width: 6 },
          2: { correct: '3', width: 5 },
          3: { correct: '$\\dfrac{7}{2}$', width: 6 },
        },
        solution: [
          'Each bracket is zero at the centre. $x + \\dfrac{1}{2} = 0$ gives $x = -\\dfrac{1}{2}$, and $y - 3 = 0$ gives $y = 3$.',
          'The right-hand side is $r^2$, so $r = \\sqrt{\\dfrac{49}{4}} = \\dfrac{\\sqrt{49}}{\\sqrt{4}} = \\dfrac{7}{2}$.',
          'A fraction changes nothing about the method: take the square root of the top and of the bottom.',
        ],
        answer: 'Centre $\\left(-\\dfrac{1}{2}, 3\\right)$, radius $\\dfrac{7}{2}$',
      },
      {
        id: 'f2',
        type: 'fill_blank',
        prompt: '**2** The general form of a circle is $x^2 + y^2 + 2gx + 2fy + c = 0$, with centre $(-g, -f)$ and radius $\\sqrt{g^2 + f^2 - c}$. Use this to find the centre and radius of $x^2 + y^2 + 8x - 10y + 5 = 0$.',
        textParts: ['$g = $ ', ', $f = $ ', '.   Centre: $x = $ ', ', $y = $ ', '.   Radius $ = $ ', '.'],
        blanks: {
          1: { correct: '4', width: 5 },
          2: { correct: '-5', width: 5 },
          3: { correct: '-4', width: 5 },
          4: { correct: '5', width: 5 },
          5: { correct: '6', width: 5 },
        },
        solution: [
          'Match the $x$ term: $2g = 8$, so $g = 4$. Match the $y$ term: $2f = -10$, so $f = -5$. The constant is $c = 5$.',
          'The centre is $(-g, -f) = (-4, 5)$.',
          'The radius is $\\sqrt{g^2 + f^2 - c} = \\sqrt{16 + 25 - 5} = \\sqrt{36} = 6$.',
          'Completing the square gives the same thing: $(x + 4)^2 + (y - 5)^2 = 36$. The formula is that working, done once and remembered.',
        ],
        answer: '$g = 4$, $f = -5$; centre $(-4, 5)$, radius $6$',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: '**3** A circle passes through the point $(7, 1)$ and has the same centre as the circle $x^2 + y^2 - 6x + 2y - 15 = 0$. Find its equation.',
        textParts: ['Centre: $x = $ ', ', $y = $ ', '.   $r^2 = $ ', '.'],
        blanks: {
          1: { correct: '3', width: 5 },
          2: { correct: '-1', width: 5 },
          3: { correct: '20', width: 5 },
        },
        solution: [
          'Find the centre of the given circle. Complete the square: $(x - 3)^2 - 9 + (y + 1)^2 - 1 - 15 = 0$, so $(x - 3)^2 + (y + 1)^2 = 25$. The centre is $(3, -1)$.',
          'The new circle has the same centre but a different radius. Its radius is the distance from $(3, -1)$ to $(7, 1)$.',
          'The differences are $4$ and $2$, so $r^2 = 16 + 4 = 20$.',
          'The equation is $(x - 3)^2 + (y + 1)^2 = 20$. You did not need the radius of the first circle at all.',
        ],
        answer: '$(x - 3)^2 + (y + 1)^2 = 20$',
      },
      {
        id: 'f4',
        type: 'mcq',
        prompt: '**4** Where is the point $(5, 2)$ in relation to the circle $x^2 + y^2 - 4x + 2y - 20 = 0$?',
        options: [
          { val: 'a', text: 'Inside the circle' },
          { val: 'b', text: 'On the circle' },
          { val: 'c', text: 'Outside the circle' },
          { val: 'd', text: 'It cannot be decided without a sketch' },
        ],
        correct: 'a',
        solution: [
          'Find the centre and radius: $(x - 2)^2 - 4 + (y + 1)^2 - 1 - 20 = 0$, so $(x - 2)^2 + (y + 1)^2 = 25$. Centre $(2, -1)$, radius $5$.',
          'Now find how far the point is from the centre. The differences are $3$ and $3$, so the distance squared is $9 + 9 = 18$.',
          'Compare with $r^2 = 25$. Since $18 < 25$, the point is **nearer** to the centre than the radius. It is inside the circle.',
          'The rule: distance squared less than $r^2$ is inside, equal is on, greater is outside.',
        ],
        answer: 'Inside: its distance squared from the centre is $18$, less than $r^2 = 25$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1',
        type: 'fill_blank',
        prompt: '**5a** The circle $(x - 3)^2 + (y + 1)^2 = 25$ crosses the $y$-axis at two points. Find their $y$-coordinates.',
        textParts: ['Lower point: $y = $ ', '.   Upper point: $y = $ ', '.'],
        blanks: {
          1: { correct: '-5', width: 5 },
          2: { correct: '3', width: 5 },
        },
        solution: [
          'On the $y$-axis, $x = 0$. Put that in: $(0 - 3)^2 + (y + 1)^2 = 25$.',
          'So $9 + (y + 1)^2 = 25$, which gives $(y + 1)^2 = 16$.',
          'Take the square root, remembering both signs: $y + 1 = 4$ or $y + 1 = -4$.',
          'So $y = 3$ or $y = -5$. The circle crosses the $y$-axis at $(0, 3)$ and $(0, -5)$.',
        ],
        answer: '$(0, -5)$ and $(0, 3)$',
      },
      {
        id: 'p2',
        type: 'mcq',
        prompt: '**5b** Where does the same circle, $(x - 3)^2 + (y + 1)^2 = 25$, cross the $x$-axis? Give exact values.',
        options: [
          { val: 'a', text: '$x = 3 \\pm 5$' },
          { val: 'b', text: '$x = 3 \\pm 2\\sqrt{6}$' },
          { val: 'c', text: '$x = 3 \\pm \\sqrt{26}$' },
          { val: 'd', text: 'It does not cross the $x$-axis' },
        ],
        correct: 'b',
        solution: [
          'On the $x$-axis, $y = 0$: $(x - 3)^2 + (0 + 1)^2 = 25$.',
          'So $(x - 3)^2 = 24$, and $x - 3 = \\pm\\sqrt{24} = \\pm 2\\sqrt{6}$.',
          'The crossings are at $x = 3 - 2\\sqrt{6}$ and $x = 3 + 2\\sqrt{6}$.',
          'Option a forgets the $1$ that comes from $(0 + 1)^2$. Option c adds it instead of subtracting it. The circle does cross: its centre is only $1$ from the $x$-axis, and its radius is $5$.',
        ],
        answer: '$x = 3 \\pm 2\\sqrt{6}$',
      },
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**6** A circle of radius $4$ touches both axes, and its centre is in the second quadrant (where $x$ is negative and $y$ is positive). Find its centre and the right-hand side of its equation.',
        inlineSvg: DIAGRAMS.TOUCH_AXIS,
        textParts: ['Centre: $x = $ ', ', $y = $ ', '.   $r^2 = $ ', '.'],
        blanks: {
          1: { correct: '-4', width: 5 },
          2: { correct: '4', width: 5 },
          3: { correct: '16', width: 5 },
        },
        solution: [
          'Touching the $x$-axis means the centre is one radius above or below it, so its $y$-coordinate is $4$ or $-4$.',
          'Touching the $y$-axis means the centre is one radius to the left or right of it, so its $x$-coordinate is $4$ or $-4$.',
          'In the second quadrant $x$ is negative and $y$ is positive, so the centre is $(-4, 4)$.',
          'The equation is $(x + 4)^2 + (y - 4)^2 = 16$. There are four circles of radius $4$ that touch both axes, one in each quadrant.',
        ],
        answer: 'Centre $(-4, 4)$; $(x + 4)^2 + (y - 4)^2 = 16$',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: '**7** A circle has radius $5$ and passes through the point $(4, 2)$. The $x$-axis is a tangent to the circle. There are two possible circles. Find their centres.',
        textParts: ['Both centres have $y = $ ', '.   Their $x$-coordinates are $x = $ ', ' (smaller) and $x = $ ', ' (larger).'],
        blanks: {
          1: { correct: '5', width: 5 },
          2: { correct: '0', width: 5 },
          3: { correct: '8', width: 5 },
        },
        solution: [
          'The $x$-axis is a tangent, so the centre is $5$ above or below it. The point $(4, 2)$ is above the axis, so the circle is too: the centre is $(a, 5)$.',
          'The point is on the circle, so it is $5$ from the centre: $(4 - a)^2 + (2 - 5)^2 = 25$.',
          'So $(4 - a)^2 + 9 = 25$, giving $(4 - a)^2 = 16$ and $4 - a = \\pm 4$.',
          'So $a = 0$ or $a = 8$. The circles are $x^2 + (y - 5)^2 = 25$ and $(x - 8)^2 + (y - 5)^2 = 25$.',
        ],
        answer: 'Centres $(0, 5)$ and $(8, 5)$',
      },
      {
        id: 'p5',
        type: 'mcq',
        prompt: '**8** Why is $x^2 + y^2 - 2x + 6y + 14 = 0$ not the equation of a circle?',
        options: [
          { val: 'a', text: 'Because $x^2$ and $y^2$ do not have the same coefficient' },
          { val: 'b', text: 'Because it has no $xy$ term' },
          { val: 'c', text: 'Because completing the square gives a negative number on the right-hand side' },
          { val: 'd', text: 'Because the constant $14$ is positive' },
        ],
        correct: 'c',
        solution: [
          'Complete the square: $(x - 1)^2 - 1 + (y + 3)^2 - 9 + 14 = 0$.',
          'So $(x - 1)^2 + (y + 3)^2 = -4$.',
          'The left-hand side is a sum of two squares, which can never be negative. No point satisfies the equation, so it does not describe a circle, or anything else.',
          'The coefficients of $x^2$ and $y^2$ are equal and there is no $xy$ term, so the equation passes both of the quick checks. A positive constant is not a problem in itself: $x^2 + y^2 - 2x + 6y + 6 = 0$ is a circle of radius $2$.',
        ],
        answer: 'It becomes $(x - 1)^2 + (y + 3)^2 = -4$, and a sum of two squares cannot be negative',
      },
      {
        id: 'p6',
        type: 'fill_blank',
        prompt: '**9** The circle $x^2 + y^2 - 10x + 4y + k = 0$ has radius $6$. Find the value of $k$.',
        textParts: ['$k = $ ', '.'],
        blanks: {
          1: { correct: '-7', width: 5 },
        },
        solution: [
          'Complete the square with $k$ left as a letter: $(x - 5)^2 - 25 + (y + 2)^2 - 4 + k = 0$.',
          'So $(x - 5)^2 + (y + 2)^2 = 29 - k$. The right-hand side is $r^2$.',
          'The radius is $6$, so $29 - k = 36$.',
          'Therefore $k = -7$.',
        ],
        answer: '$k = -7$',
      },
      {
        id: 'p7',
        type: 'fill_blank',
        prompt: '**10** For the circle $x^2 + y^2 + 12y + 11 = 0$, find the length of a diameter, and the $y$-coordinate of the highest point on the circle.',
        textParts: ['Diameter $ = $ ', '.   Highest point: $y = $ ', '.'],
        blanks: {
          1: { correct: '10', width: 5 },
          2: { correct: '-1', width: 5 },
        },
        solution: [
          'There is no $x$ term, so only the $y$ terms need completing: $x^2 + (y + 6)^2 - 36 + 11 = 0$.',
          'So $x^2 + (y + 6)^2 = 25$: centre $(0, -6)$, radius $5$.',
          'A diameter is twice the radius: $10$.',
          'The highest point is one radius straight above the centre: $y = -6 + 5 = -1$. It is the point $(0, -1)$.',
        ],
        answer: 'Diameter $10$; highest point $(0, -1)$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1',
        type: 'fill_blank',
        prompt: '**11** The equation $x^2 + y^2 - 8x + 6y + k = 0$ represents a circle. Find the range of values of $k$, the value of $k$ if the circle touches the $x$-axis, the value of $k$ if it touches the $y$-axis, and the radius if it passes through the origin.',
        textParts: ['It is a circle when $k < $ ', '.   Touches the $x$-axis: $k = $ ', '.   Touches the $y$-axis: $k = $ ', '.   Through the origin: radius $ = $ ', '.'],
        blanks: {
          1: { correct: '25', width: 5 },
          2: { correct: '16', width: 5 },
          3: { correct: '9', width: 5 },
          4: { correct: '5', width: 5 },
        },
        solution: [
          'Complete the square: $(x - 4)^2 - 16 + (y + 3)^2 - 9 + k = 0$, so $(x - 4)^2 + (y + 3)^2 = 25 - k$. The centre is $(4, -3)$ whatever $k$ is.',
          'For a circle, $r^2$ must be positive: $25 - k > 0$, so $k < 25$.',
          'Touching the $x$-axis: the radius equals the distance from the centre to the $x$-axis, which is $3$. So $25 - k = 9$ and $k = 16$.',
          'Touching the $y$-axis: the radius is $4$, so $25 - k = 16$ and $k = 9$.',
          'Through the origin: put $x = 0$, $y = 0$ into the equation to get $k = 0$. Then $r^2 = 25$ and the radius is $5$.',
        ],
        answer: '$k < 25$; $k = 16$; $k = 9$; radius $5$',
      },
      {
        id: 'c2',
        type: 'fill_blank',
        prompt: '**12** A circle touches both axes and passes through the point $(2, 4)$. Its centre is in the first quadrant. There are two such circles. Find their radii.',
        textParts: ['Smaller radius $ = $ ', '.   Larger radius $ = $ ', '.'],
        blanks: {
          1: { correct: '2', width: 5 },
          2: { correct: '10', width: 5 },
        },
        solution: [
          'A circle in the first quadrant that touches both axes has its centre at $(r, r)$: one radius from each axis.',
          'The point $(2, 4)$ is on the circle, so it is $r$ from the centre: $(2 - r)^2 + (4 - r)^2 = r^2$.',
          'Expand: $4 - 4r + r^2 + 16 - 8r + r^2 = r^2$, which tidies to $r^2 - 12r + 20 = 0$.',
          'Factorise: $(r - 2)(r - 10) = 0$, so $r = 2$ or $r = 10$.',
          'The circles are $(x - 2)^2 + (y - 2)^2 = 4$ and $(x - 10)^2 + (y - 10)^2 = 100$. Check the small one: $(2, 4)$ is straight above its centre $(2, 2)$, exactly $2$ away.',
        ],
        answer: 'Radii $2$ and $10$',
      },
      {
        id: 'c3',
        type: 'mcq',
        prompt: '**13a** Four circles of radius $3$ have centres $(3, 3)$, $(-3, 3)$, $(-3, -3)$ and $(3, -3)$, so that each touches its two neighbours. What is the radius of the smallest circle, centred at the origin, that contains all four?',
        options: [
          { val: 'a', text: '$6$' },
          { val: 'b', text: '$3\\sqrt{2}$' },
          { val: 'c', text: '$6\\sqrt{2}$' },
          { val: 'd', text: '$3 + 3\\sqrt{2}$' },
        ],
        correct: 'd',
        solution: [
          'Find how far each small centre is from the origin. For $(3, 3)$ that is $\\sqrt{3^2 + 3^2} = \\sqrt{18} = 3\\sqrt{2}$.',
          'The point of a small circle furthest from the origin is on the far side of its centre: one more radius out, along the same line.',
          'So the big circle must reach $3\\sqrt{2} + 3$ from the origin. Its radius is $3 + 3\\sqrt{2}$, about $7.24$.',
          'Option a is the distance to where two small circles touch. Option b reaches only the small centres. Option c doubles the diagonal instead of adding a radius.',
        ],
        answer: '$3 + 3\\sqrt{2}$',
      },
      {
        id: 'c4',
        type: 'mcq',
        prompt: '**13b** For the same four circles, what is the radius of the largest circle, centred at the origin, that fits in the gap between them?',
        options: [
          { val: 'a', text: '$3\\sqrt{2} - 3$' },
          { val: 'b', text: '$3$' },
          { val: 'c', text: '$3\\sqrt{2}$' },
          { val: 'd', text: '$3 - \\sqrt{2}$' },
        ],
        correct: 'a',
        solution: [
          'Each small centre is $3\\sqrt{2}$ from the origin, as before.',
          'The point of a small circle nearest the origin is one radius back towards it: $3\\sqrt{2} - 3$ from the origin.',
          'The gap circle can grow until it reaches that point, so its radius is $3\\sqrt{2} - 3$, about $1.24$.',
          'The two answers to this question belong together: the outer circle is "diagonal plus a radius" and the inner one is "diagonal minus a radius".',
        ],
        answer: '$3\\sqrt{2} - 3$',
      },
    ],
  },
];
