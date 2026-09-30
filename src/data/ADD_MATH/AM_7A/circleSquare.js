// src/data/ADD_MATH/AM_7A/circleSquare.js
// "Complete the Square" — the third Apply task of AM_7A
// (src/tasks/CircleLab.jsx, mode 'square').
//
// WHICH QUESTION TYPE THIS IS. Problem bank type C
// (docs/add-math-7-1-circles.md): an equation in expanded general form is
// printed, and the student completes the square in x and in y to get
// completed square form, then reads off the centre and the radius. This is
// the one skill in the section that is pure procedure, so it has a task of
// its own and the procedure is staged one move at a time.
//
// An item is `coef: [k, D, E, F]` for kx² + ky² + Dx + Ey + F = 0, with
// `rhs` when the constant is printed on the right. utils/circle.js derives
// the division, both completed squares, the right-hand side, the centre and
// the radius. `npm run validate` refuses an equation that is not a circle
// unless it says `notCircle: true` — so one can never be set by accident.
// Every number is fresh.
//
// THE LADDER:
//   Level 1  One square to complete.
//     1  x² + y² − 8y − 9 = 0            only the y terms need work
//     2  x² + y² + 6x = 0                no constant at all
//   Level 2  Two squares.
//     3  x² + y² − 6x + 4y − 12 = 0      the standard question
//     4  x² + y² + 10x − 2y + 10 = 0     a positive constant
//     5  x² + y² − 4x − 10y + 13 = 0
//   Level 3  A surd radius.
//     6  x² + y² + 2x + 6y − 8 = 0       r² = 18
//     7  x² + y² − 8x + 2y + 5 = 0       r² = 12
//   Level 4  The constant on the right.
//     8  x² + y² − 4x + 6y = 12          the exam's "show that" form
//     9  x² + y² + 8x − 2y = −1          a negative number on the right
//   Level 5  Divide first.
//     10 2x² + 2y² + 4x − 20y + 2 = 0
//     11 3x² + 3y² − 18x + 12y − 9 = 0
//     12 4x² + 4y² − 4x + 24y + 1 = 0    the centre is at a half
//   Level 6  Is it a circle?
//     13 x² + y² + 4x − 6y + 15 = 0      the right-hand side is negative
//     14 x² + y² − 2x + 8y + 17 = 0      the right-hand side is zero
//     15 x² + y² − 6x − 2y + 6 = 0       this one IS a circle
export const circleSquare = {
  title: 'Complete the Square',
  intro: 'x² − 6x = (x − 3)² − 9: halve the coefficient for the bracket, then take away the square of that half.',
  levels: {
    1: 'One square to complete',
    2: 'Two squares',
    3: 'A surd radius',
    4: 'The constant on the right',
    5: 'Divide first',
    6: 'Is it a circle?',
  },
  items: [
    { id: 'one_y', level: 1, coef: [1, 0, -8, -9], note: 'There is no x term, so x² is already a complete square.' },
    { id: 'one_x', level: 1, coef: [1, 6, 0, 0] },

    { id: 'two_a', level: 2, coef: [1, -6, 4, -12] },
    { id: 'two_b', level: 2, coef: [1, 10, -2, 10] },
    { id: 'two_c', level: 2, coef: [1, -4, -10, 13] },

    { id: 'surd_18', level: 3, coef: [1, 2, 6, -8], note: 'The right-hand side is r². Simplify its square root.' },
    { id: 'surd_12', level: 3, coef: [1, -8, 2, 5] },

    { id: 'rhs_a', level: 4, coef: [1, -4, 6, 0], rhs: 12, note: 'The constant is already on the right. The two squares you subtract will join it.' },
    { id: 'rhs_b', level: 4, coef: [1, 8, -2, 0], rhs: -1 },

    { id: 'div_2', level: 5, coef: [2, 4, -20, 2], note: 'x² and y² must have a coefficient of 1 first.' },
    { id: 'div_3', level: 5, coef: [3, -18, 12, -9] },
    { id: 'div_4', level: 5, coef: [4, -4, 24, 1], note: 'Halving 1 gives a half. Type it as 1/2.' },

    { id: 'not_neg', level: 6, coef: [1, 4, -6, 15], notCircle: true, note: 'Not every equation of this shape is a circle. Work it through and see what comes out.' },
    { id: 'not_zero', level: 6, coef: [1, -2, 8, 17], notCircle: true },
    { id: 'is_circle', level: 6, coef: [1, -6, -2, 6] },
  ],
};
