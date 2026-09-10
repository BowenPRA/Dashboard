// src/data/ADD_MATH/AM_4B/cubicSketch.js
// Sketch It items for Sketching Cubic Graphs — the production task, where a
// curve from Exercise 4.3 is sketched the way the book sketches it: the
// x-intercepts from the factors, the y-intercept from x = 0, the end
// behaviour from the sign of k, cross-or-touch at each root, and for the
// modulus the pieces below the axis tapped and folded up. See
// src/tasks/CubicSketch.jsx for the screen and src/utils/cubic.js for the
// derivation.
//
// THE ANSWERS ARE NOT WRITTEN HERE. An item is `factors` — each [p, q] is the
// bracket px + q, written in the book's order, a squared factor written twice
// — plus `k` for a number in front. `display` carries the book's printing when
// it differs from the derived form ((2 − x) rather than (−x + 2)); `expanded`
// is the polynomial as printed for the "factorise, then sketch" questions;
// `modulus: true` adds the reflect stage. Everything else is derived.
//
// WHY THESE, IN THIS ORDER. Each adds one idea:
//   we7   three distinct roots, one of them a fraction, k negative
//   q2a   three clean integer roots, k positive — the plain case
//   q2b   a (3 − x) factor: the root is +3 and the curve falls to the right
//   q2c   a 2x factor: the root is −1/2, not −1
//   q2d   a (3 − 2x) factor: both traps at once
//   we8   a squared factor: the curve TOUCHES
//   q4a   x² as the squared factor: it touches at the origin
//   q4b   x² again, with k negative
//   q4c   (x + 1)² — the touch is at −1
//   q4d   (x − 2)²(10 − 3x): a fractional root and a negative k
//   q5a   the first modulus: a plain cubic, then reflect
//   q5b   modulus with k = 2 and a (5 − 2x) factor
//   q5c   |x(9 − x²)|: the difference of two squares hidden in a bracket
//   q5d   modulus of a curve that touches: the touch is unchanged
//   q6a   factorise first: a common factor and a difference of two squares
//   q6b   factorise first: the factor theorem finds (x − 1)
//   q6c   factorise first, with a 2x³
//   q6d   factorise first, the hardest: 2x³ + 3x² − 29x − 60
//
// npm run validate re-derives each item, and for the expanded ones checks the
// printed polynomial really is the product of the factors.

export const cubicSketch = {
  title: 'Sketch It',
  intro: 'A sketch is four facts and a shape: where it crosses each axis, which way the tails go, and whether each root crosses or touches.',
  items: [
    { id: 'we7', factors: [[2, -1], [-1, 2], [1, 1]], display: '(2x - 1)(2 - x)(x + 1)', note: 'Worked example 7 from the book. Start with y = 0: each bracket gives one intercept.' },
    { id: 'q2a', factors: [[1, -2], [1, -4], [1, 3]], note: 'Exercise 4.3, question 2a.' },
    { id: 'q2b', factors: [[1, 2], [1, 1], [-1, 3]], display: '(x + 2)(x + 1)(3 - x)', note: 'Question 2b. Read (3 − x) carefully: it is zero at +3, and its x coefficient is −1.' },
    { id: 'q2c', factors: [[2, 1], [1, 2], [1, -2]], note: 'Question 2c. The bracket (2x + 1) is zero at x = −1/2, not −1.' },
    { id: 'q2d', factors: [[-2, 3], [1, -1], [1, 2]], display: '(3 - 2x)(x - 1)(x + 2)', note: 'Question 2d.' },
    { id: 'we8', factors: [[1, -1], [1, -1], [1, 1]], display: '(x - 1)^2(x + 1)', note: 'Worked example 8. A squared factor is a repeated root — type it twice.' },
    { id: 'q4a', factors: [[1, 0], [1, 0], [1, 2]], display: 'x^2(x + 2)', note: 'Question 4a. x² is (x − 0)², so the repeated root is 0 — and that is the y-intercept too.' },
    { id: 'q4b', factors: [[1, 0], [1, 0], [-2, 5]], display: 'x^2(5 - 2x)', note: 'Question 4b.' },
    { id: 'q4c', factors: [[1, 1], [1, 1], [1, -2]], display: '(x + 1)^2(x - 2)', note: 'Question 4c.' },
    { id: 'q4d', factors: [[1, -2], [1, -2], [-3, 10]], display: '(x - 2)^2(10 - 3x)', note: 'Question 4d.' },
    { id: 'q5a', factors: [[1, 1], [1, -2], [1, -3]], modulus: true, note: 'Question 5a. Sketch the cubic first; the modulus is the last stage.' },
    { id: 'q5b', factors: [[-2, 5], [1, 1], [1, 2]], k: 2, display: '2(5 - 2x)(x + 1)(x + 2)', modulus: true, note: 'Question 5b. The 2 in front doubles every y value, including the y-intercept.' },
    { id: 'q5c', factors: [[1, 0], [-1, 3], [1, 3]], display: 'x(9 - x^2)', modulus: true, note: 'Question 5c. 9 − x² is (3 − x)(3 + x), so this is three linear factors after all.' },
    { id: 'q5d', factors: [[1, -1], [1, -1], [1, 1]], k: 3, display: '3(x - 1)^2(x + 1)', modulus: true, note: 'Question 5d. What does the modulus do to a touch?' },
    { id: 'q6a', factors: [[1, 0], [-1, 3], [1, 3]], expanded: '9x - x^3', display: 'x(3 - x)(3 + x)', note: 'Question 6a. Take out the common factor x first, then look at what is left.' },
    { id: 'q6b', factors: [[1, -1], [1, 2], [1, 3]], expanded: 'x^3 + 4x^2 + x - 6', note: 'Question 6b. Try x = 1 in the factor theorem, then divide out the factor you find.' },
    { id: 'q6c', factors: [[2, -1], [1, -3], [1, 4]], expanded: '2x^3 + x^2 - 25x + 12', note: 'Question 6c. Try x = 3 first.' },
    { id: 'q6d', factors: [[2, 5], [1, -4], [1, 3]], expanded: '2x^3 + 3x^2 - 29x - 60', note: 'Question 6d. Try x = 4.' },
  ],
};
