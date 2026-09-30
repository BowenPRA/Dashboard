// src/data/ADD_MATH/AM_7A/circleEq.js
// "Write the Equation" — the second Apply task of AM_7A
// (src/tasks/CircleLab.jsx, mode 'eq').
//
// WHICH QUESTION TYPES THESE ARE. Problem bank types B, D, E and the
// "touches an axis" half of F (docs/add-math-7-1-circles.md): the question
// runs the other way from Plot the Circle. Something about the circle is
// given, and the student finds what is missing and writes the equation.
//
//   radius    centre and radius given            → write it             (type B)
//   through   centre and a point on the circle   → r², then write it    (type D)
//   diameter  the two ends of a diameter         → centre, r², write it (type E)
//   touch     centre and the axis it touches     → radius, write it     (type F)
//
// Only the question is written here. utils/circle.js derives the midpoint,
// r² and the equation, and draws the right-angled triangle whose legs are the
// two differences. `npm run validate` refuses a diameter whose midpoint is
// not a whole-number point (it has to be clicked) and a circle that does not
// fit the grid. Every number is fresh.
//
// THE LADDER:
//   Level 1  Centre and radius.
//     1  centre (0, 0), radius 9          no brackets at all
//     2  centre (−2, 4), radius 5         one sign of each kind
//     3  centre (4, −3), radius 3√2       square the surd: r² = 18
//     4  centre (−6, 0), radius √7        one bracket, and r² = 7
//     5  centre (3/2, −1/4), radius 2     fractions in the brackets
//   Level 2  Centre and a point.
//     6  centre (1, −2), through (4, 2)   a 3-4-5 triangle
//     7  centre (−3, 4), through (1, 1)   the differences are negative; their squares are not
//     8  centre (2, 1), through (4, 7)    r² = 40, and it stays 40
//   Level 3  A diameter.
//     9  A(−2, −1), B(6, 5)               midpoint first
//     10 A(−3, 5), B(5, 1)                r² = 20
//     11 A(−6, 2), B(2, −6)               r² = 32
//   Level 4  Touching an axis.
//     12 centre (−4, 5), touches the x-axis   the radius is the HEIGHT of the centre
//     13 centre (3, −7), touches the y-axis   ... or how far across it is
//     14 centre (−5, −5), touches the x-axis  a length is never negative
export const circleEq = {
  title: 'Write the Equation',
  intro: 'A circle with centre (a, b) and radius r is (x − a)² + (y − b)² = r².',
  levels: {
    1: 'Centre and radius',
    2: 'Centre and a point',
    3: 'A diameter',
    4: 'Touching an axis',
  },
  items: [
    { id: 'r_origin', level: 1, kind: 'radius', centre: [0, 0], r2: 81 },
    { id: 'r_signs', level: 1, kind: 'radius', centre: [-2, 4], r2: 25 },
    { id: 'r_surd', level: 1, kind: 'radius', centre: [4, -3], r2: 18, note: 'The right-hand side is r², so square the surd.' },
    { id: 'r_root7', level: 1, kind: 'radius', centre: [-6, 0], r2: 7 },
    { id: 'r_frac', level: 1, kind: 'radius', centre: ['3/2', '-1/4'], r2: 4, note: 'Fractions go in the brackets exactly as they are.' },

    { id: 'p_345', level: 2, kind: 'through', centre: [1, -2], point: [4, 2], note: 'You do not need r itself — only r².' },
    { id: 'p_neg', level: 2, kind: 'through', centre: [-3, 4], point: [1, 1] },
    { id: 'p_40', level: 2, kind: 'through', centre: [2, 1], point: [4, 7] },

    { id: 'd_a', level: 3, kind: 'diameter', A: [-2, -1], B: [6, 5], note: 'The centre is the midpoint of the diameter.' },
    { id: 'd_b', level: 3, kind: 'diameter', A: [-3, 5], B: [5, 1] },
    { id: 'd_c', level: 3, kind: 'diameter', A: [-6, 2], B: [2, -6] },

    { id: 't_x', level: 4, kind: 'touch', centre: [-4, 5], axis: 'x', note: 'Touching an axis means the axis is a tangent: it is exactly one radius from the centre.' },
    { id: 't_y', level: 4, kind: 'touch', centre: [3, -7], axis: 'y' },
    { id: 't_neg', level: 4, kind: 'touch', centre: [-5, -5], axis: 'x' },
  ],
};
