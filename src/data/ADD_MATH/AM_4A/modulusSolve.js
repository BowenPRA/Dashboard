// src/data/ADD_MATH/AM_4A/modulusSolve.js
// Case Solver items for Modulus Equations and Inequalities — the production
// task, where an equation from Exercise 4.1 or an inequality from Exercise 4.2
// is worked in the coursebook's four moves: name the shape, write the cases,
// solve each case, then CHECK (equations) or SHADE the line (inequalities).
// See src/tasks/ModulusSolver.jsx for the screen and src/utils/modulus.js for
// the derivation.
//
// THE ANSWERS ARE NOT WRITTEN HERE. An item is the question and nothing else:
// `L: [a, b]` is the modulus |ax + b| on the left, and `R` is what it is
// compared with — another modulus, a linear expression, or a number. A number
// written in front of a modulus is folded INSIDE it (2|3 − x| is abs: [-2, 6])
// and `display` carries the book's own printing so the student still reads
// the question as set. Every case, solution, check and region is derived.
//
// WHY THESE ITEMS, IN THIS ORDER. Each adds one idea:
//   q1a   modulus = modulus with two clean answers — the shape at its simplest
//   q1b   the same shape, but one case collapses (parallel arms): "no solution"
//         is an answer to a CASE, not to the question
//   q1c   negative and fractional answers, so the boxes are used properly
//   q1d   an answer of 0, which is a real answer and not a "no solution"
//   q1h   a 2 in front of a modulus, taken inside before anything else
//   exA   modulus = expression: the algebra hands back TWO values and the check
//         throws one out — the whole reason stage 4 exists
//   exB   the same trap the other way round (the negative candidate)
//   neg   a negative number on the right: the item is over at stage 1
//   q3a   the first inequality — big modulus, two rays
//   q3b   small modulus with a negative x coefficient (the signs reverse)
//   q3c   the same with strict signs, open circles
//   q3f   small modulus, wide interval
//   q5b   modulus vs modulus with ONE critical value (the x² terms cancel)
//   q5e   modulus vs modulus with two, "≥" yet a single interval — the shape
//         rule is for a NUMBER on the right, not another modulus
//   q5f   the same shape with strict signs
//   q4a   modulus vs an expression that can go negative: the sign trap
//
// The parts of the exercises not here (sums of moduli, the hidden quadratic,
// the k-constant questions) stay in the two Workbook tasks with full worked
// solutions, so between the three tasks every part of both exercises is set.
//
// `line: { min, max }` sizes the number line; every critical value must sit
// inside it (npm run validate refuses one that does not).

export const modulusSolve = {
  title: 'Case Solver',
  intro: 'Name the shape first. The method follows from the shape, never the other way round.',
  items: [
    { id: 'q1a', L: [2, -1], R: { abs: [1, 0] }, rel: '=', note: 'Exercise 4.1, question 1a.' },
    { id: 'q1b', L: [1, 5], R: { abs: [1, -4] }, rel: '=', note: 'Question 1b. Expect one of the cases to collapse — both graphs have arms of gradient ±1.' },
    { id: 'q1c', L: [2, -3], R: { abs: [-1, 4] }, rel: '=', display: '|2x - 3| = |4 - x|', note: 'Question 1c.' },
    { id: 'q1d', L: [5, 1], R: { abs: [-3, 1] }, rel: '=', display: '|5x + 1| = |1 - 3x|', note: 'Question 1d. An answer of 0 is an answer.' },
    { id: 'q1h', L: [2, -1], R: { abs: [-2, 6] }, rel: '=', display: '|2x - 1| = 2|3 - x|', note: 'Question 1h. The 2 is positive, so it can go inside the bars: 2|3 − x| = |6 − 2x|.' },
    { id: 'exA', L: [1, 0], R: { lin: [2, -3] }, rel: '=', note: 'Not from the book. The right-hand side is not a modulus, so it can go negative — watch what the check does.' },
    { id: 'exB', L: [1, -3], R: { lin: [2, 0] }, rel: '=', note: 'The same shape. One of the two values the algebra produces is a fake.' },
    { id: 'neg', L: [2, -9], R: { num: -4 }, rel: '=', expectNone: true, note: 'Read the whole question before you start writing.' },
    { id: 'q3a', L: [2, -3], R: { num: 5 }, rel: '>', note: 'Exercise 4.2, question 3a. Decide the SHAPE of the answer before you touch a number.' },
    { id: 'q3b', L: [-5, 4], R: { num: 9 }, rel: '<=', display: '|4 - 5x| \\leq 9', note: 'Question 3b. The x coefficient is negative — the number line does not care, but a chain would.' },
    { id: 'q3c', L: [-3, 8], R: { num: 2 }, rel: '<', display: '|8 - 3x| < 2', note: 'Question 3c. Strict signs: open circles.' },
    { id: 'q3f', L: [-2, 5], R: { num: 7 }, rel: '<=', display: '|5 - 2x| \\leq 7', note: 'Question 3f.' },
    { id: 'q5b', L: [1, 1], R: { abs: [1, 0] }, rel: '>', note: 'Question 5b. Only ONE critical value here — the arms with equal gradient never meet.' },
    { id: 'q5e', L: [1, 3], R: { abs: [2, 0] }, rel: '>=', note: 'Question 5e. A "≥" that gives ONE interval: the two-rays rule is for a number on the right, not another modulus.' },
    { id: 'q5f', L: [2, 0], R: { abs: [1, -3] }, rel: '<', note: 'Question 5f.' },
    { id: 'q4a', L: [2, -3], R: { lin: [1, -1] }, rel: '<=', note: 'Question 4a. The right-hand side can be negative, and a modulus can never be at most a negative number — the region test knows that.' },
  ],
};
