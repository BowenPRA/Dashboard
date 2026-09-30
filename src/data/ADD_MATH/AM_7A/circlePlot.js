// src/data/ADD_MATH/AM_7A/circlePlot.js
// "Plot the Circle" — the first Apply task of AM_7A (src/tasks/CircleLab.jsx,
// mode 'plot').
//
// WHICH QUESTION TYPE THIS IS. Problem bank types A and F
// (docs/add-math-7-1-circles.md): an equation in completed square form is
// printed, and the student reads the centre and the radius off it. Here they
// do it on a grid — click the centre, then click a point on the circle, or
// type the exact radius when it is a surd — and the finished circle is swept
// on with points marked. Levels 1–4 are type A in the book's order of
// difficulty; level 5 is type F (sketching, and touching an axis), asked as
// a prediction BEFORE the circle is drawn.
//
// Only the question is written here. utils/circle.js derives the centre, the
// radius, the lattice points on the circle and what it does at each axis, and
// `npm run validate` refuses a circle that does not fit the −10..10 grid.
// Every number is fresh: none of these is a book question.
//
// THE LADDER (the levels only climb, and each item adds one idea):
//   Level 1  Centred at the origin.
//     1  x² + y² = 49               no brackets: the centre is the origin
//     2  x² + y² = 20               the radius is a surd — but the circle still
//                                   passes through whole-number points
//     3  3x² + 3y² = 75             divide through first
//   Level 2  One bracket.
//     4  x² + (y + 6)² = 4          a plus sign means a NEGATIVE coordinate
//     5  (x − 5)² + y² = 16         the other way round
//   Level 3  Two brackets.
//     6  (x − 3)² + (y + 1)² = 25   one sign of each kind
//     7  (x + 4)² + (y − 2)² = 9
//     8  (x + 2)² + (y + 3)² = 36   two plus signs, two negative coordinates
//   Level 4  A surd radius.
//     9  (x + 5)² + (y − 4)² = 12   2√3: simplify it
//     10 (x − 2)² + (y − 3)² = 18   3√2, through (5, 6)
//     11 (x − 1)² + (y + 4)² = 7    √7 will not simplify
//     12 (x − 1)² + (y − 1)² = 50   5√2, and twelve lattice points
//   Level 5  What happens at the axes?
//     13 (x − 3)² + (y + 2)² = 9    touches one axis, crosses the other
//     14 (x + 4)² + (y − 5)² = 25   touches the x-axis
//     15 (x − 4)² + (y − 4)² = 16   touches both
//     16 (x − 6)² + (y + 5)² = 9    misses both
//     17 (x + 1)² + (y − 2)² = 20   a surd radius that crosses both
export const circlePlot = {
  title: 'Plot the Circle',
  intro: 'Each bracket is zero at the centre. The number on the right is the radius squared.',
  levels: {
    1: 'Centred at the origin',
    2: 'One bracket',
    3: 'Two brackets',
    4: 'A surd radius',
    5: 'What happens at the axes?',
  },
  items: [
    { id: 'o_49', level: 1, centre: [0, 0], r2: 49 },
    { id: 'o_20', level: 1, centre: [0, 0], r2: 20, note: 'No whole number squares to 20. Type the radius exactly.' },
    { id: 'o_scale', level: 1, centre: [0, 0], r2: 25, scale: 3, note: 'x² and y² must have a coefficient of 1 before you read anything off. Divide through first.' },

    { id: 'y_bracket', level: 2, centre: [0, -6], r2: 4, note: 'There is no x bracket, so the x-coordinate of the centre is 0.' },
    { id: 'x_bracket', level: 2, centre: [5, 0], r2: 16 },

    { id: 'two_a', level: 3, centre: [3, -1], r2: 25 },
    { id: 'two_b', level: 3, centre: [-4, 2], r2: 9 },
    { id: 'two_c', level: 3, centre: [-2, -3], r2: 36 },

    { id: 'surd_12', level: 4, centre: [-5, 4], r2: 12, note: 'Simplify the surd: look for a square factor of 12.' },
    { id: 'surd_18', level: 4, centre: [2, 3], r2: 18 },
    { id: 'surd_7', level: 4, centre: [1, -4], r2: 7, note: 'Not every surd simplifies.' },
    { id: 'surd_50', level: 4, centre: [1, 1], r2: 50 },

    { id: 'ax_touch_cross', level: 5, centre: [3, -2], r2: 9, axes: true, note: 'A circle touches an axis when the centre is exactly one radius away from it.' },
    { id: 'ax_touch_x', level: 5, centre: [-4, 5], r2: 25, axes: true },
    { id: 'ax_touch_both', level: 5, centre: [4, 4], r2: 16, axes: true },
    { id: 'ax_miss', level: 5, centre: [6, -5], r2: 9, axes: true },
    { id: 'ax_surd', level: 5, centre: [-1, 2], r2: 20, axes: true },
  ],
};
