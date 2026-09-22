// src/data/EXT_MATH/EM_07B/workbookB.js
// The "Book Problems" task for EM_07B: the POLYGON and AREA parts of Wolsey
// Hall Assignment 07 that no engine stages —
//   Q12a  two sides of a regular polygon: how many sides?  → Focus 1
//   Q12c  the area of the quadrilateral, exactly           → Practice 2
// plus Pythagoras in two more shapes (an isosceles triangle, a square's
// diagonal in exact form) and two Challenge questions that mix the unit's
// ideas with a quadratic. Every number is original. Q12b (the exact height)
// is staged by the Triangle Solver, with the rest of Q11–Q15 — see data.js.
//
// English only — EXT_MATH declares `bilingual: false`.
//
// MARKING NOTES: two values are `fill_blank`, one box each, in a stated
// order; a surd answer is asked for as the number in front of a printed
// root, so the box only ever holds a number.
import { DIAGRAMS } from './diagrams.js';

export const workbookB = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'text',
        prompt: '**1** In the diagram, $PQRS$ is a parallelogram and $TSR$ is a straight line. $PS$ and $ST$ are two sides of a regular polygon, and angle $PST = 135^\\circ$. Work out the number of sides of this regular polygon.',
        inlineSvg: DIAGRAMS.WB_QUAD,
        answer: '8',
        accept: ['8 sides', 'eight'],
        solution: [
          'Angle $PST$ is the angle between two sides of the polygon, so it is an INTERIOR angle: $135^\\circ$.',
          'Exterior angle $= 180^\\circ - 135^\\circ = 45^\\circ$.',
          'The exterior angles of any polygon add up to $360^\\circ$, so the number of sides is $360 \\div 45 = 8$. It is a regular octagon.',
        ],
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p2',
        type: 'fill_blank',
        prompt: '**2** For the parallelogram $PQRS$ in question 1, $PS = 8$ cm and $SR = 11$ cm. Work out its area in exact form.',
        inlineSvg: DIAGRAMS.WB_QUAD,
        textParts: ['Area $= $ ', ' $\\sqrt{2}$ cm²'],
        blanks: { 1: { correct: '44', width: 5 } },
        solution: [
          '$TSR$ is a straight line, so angle $PSR = 180^\\circ - 135^\\circ = 45^\\circ$.',
          'The height $h$ is opposite that $45^\\circ$ angle, with $PS = 8$ cm as the hypotenuse: $h = 8 \\sin 45^\\circ = 8 \\times \\dfrac{\\sqrt{2}}{2} = 4\\sqrt{2}$ cm.',
          'Area of a parallelogram $=$ base $\\times$ perpendicular height $= 11 \\times 4\\sqrt{2} = 44\\sqrt{2}$ cm².',
          'Not $11 \\times 8$: the sloping side is not the height.',
        ],
        answer: '$44\\sqrt{2}$ cm²',
      },
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**3** An isosceles triangle has two equal sides of 13 cm and a base of 10 cm. Find its height and its area.',
        textParts: ['Height $= $ ', ' cm.   Area $= $ ', ' cm².'],
        blanks: {
          1: { correct: '12', width: 4 },
          2: { correct: '60', width: 4 },
        },
        solution: [
          'The height cuts an isosceles triangle into two equal right-angled triangles, and cuts the base in half: 5 cm.',
          'In one half, 13 cm is the hypotenuse: $h^2 = 13^2 - 5^2 = 169 - 25 = 144$, so $h = 12$ cm. Finding a shorter side: subtract.',
          'Area $= \\dfrac{1}{2} \\times 10 \\times 12 = 60$ cm².',
        ],
        answer: 'Height 12 cm, area 60 cm²',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: '**4** A square has a diagonal of 10 cm. Find the length of one side, in exact form.',
        textParts: ['Side $= $ ', ' $\\sqrt{2}$ cm'],
        blanks: { 1: { correct: '5', width: 4 } },
        solution: [
          'The diagonal is the hypotenuse of a right-angled triangle whose two shorter sides are both $s$: $s^2 + s^2 = 10^2$.',
          '$2s^2 = 100$, so $s^2 = 50$ and $s = \\sqrt{50}$.',
          'Simplify fully: $\\sqrt{50} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}$ cm.',
        ],
        answer: '$5\\sqrt{2}$ cm',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c5',
        type: 'text',
        prompt: '**5** Each interior angle of a regular polygon is 4 times the size of each exterior angle. How many sides does the polygon have?',
        answer: '10',
        accept: ['10 sides', 'ten'],
        solution: [
          'Call the exterior angle $e$. The interior angle is $4e$, and interior + exterior $= 180^\\circ$.',
          '$e + 4e = 180$, so $5e = 180$ and $e = 36^\\circ$.',
          'Number of sides $= 360 \\div 36 = 10$.',
        ],
      },
      {
        id: 'c6',
        type: 'text',
        prompt: '**6** A rectangle is $x$ cm wide and $(x + 2)$ cm long. Its diagonal is 10 cm. Find $x$.',
        answer: '6',
        accept: ['x = 6', 'x=6', '6 cm'],
        solution: [
          'The diagonal is the hypotenuse of a right-angled triangle with sides $x$ and $x + 2$: $x^2 + (x + 2)^2 = 10^2$.',
          'Expand: $x^2 + x^2 + 4x + 4 = 100$, so $2x^2 + 4x - 96 = 0$, and dividing by 2, $x^2 + 2x - 48 = 0$.',
          'Factorise: $(x + 8)(x - 6) = 0$, so $x = -8$ or $x = 6$.',
          'A width cannot be negative: $x = 6$. Check: $6^2 + 8^2 = 36 + 64 = 100$ ✓.',
        ],
      },
    ],
  },
];
