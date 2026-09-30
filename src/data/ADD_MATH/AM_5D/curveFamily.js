// src/data/ADD_MATH/AM_5D/curveFamily.js
// "Move the Curve" — the first Apply task of AM_5D (src/tasks/ExpGraphLab.jsx,
// mode 'family').
//
// WHICH QUESTION TYPE THIS IS. Problem bank 5.9, types A and B
// (docs/add-math-5-9-graphs-of-e-and-ln.md): the book's two graphing-software
// investigations. A constant k is put in one of three places in eˣ or in
// ln x — added to it, multiplying it, or inside it — and the student finds out
// what it does to the curve. Here the curve is drawn for one value of k, the
// student PREDICTS one fact about another value before anything moves, and
// only then does the slider unlock so that they can see it happen.
//
// Only the question is written here: the family, the value of k the curve
// starts at, the value it is asked about, and which fact. utils/expGraphs.js
// derives the answer, the message for each wrong answer, and the read-out
// beside the slider. `npm run validate` refuses a value that is not on the
// slider or a fact the family does not have.
//
// THE LADDER (the levels only climb; each family is met with its easiest fact
// first, and each has one question whose answer is "it does not move"):
//   Level 1  A number added to eˣ            y = eˣ + k
//     1  k: 1 → 3    y-intercept             1 + k, not k: e⁰ is 1
//     2  k: 1 → −2   asymptote               it moves with the curve
//     3  k: 2 → −3   crosses the x-axis?     only when k is negative
//   Level 2  A number in front of eˣ         y = keˣ
//     4  k: 1 → 4    y-intercept             k
//     5  k: 1 → 3    asymptote               it does NOT move
//     6  k: 2 → −2   above or below?         a negative k turns it over
//   Level 3  A number in the power           y = e^(kx)
//     7  k: 1 → 3    y-intercept             it does NOT move: (0, 1) always
//     8  k: 2 → −1   rises or falls?         a negative k reflects it in the y-axis
//   Level 4  A number added inside the ln    y = ln(x + k)
//     9  k: 1 → 3    asymptote               x = −k: the sign trap
//     10 k: 0 → −2   x-intercept             1 − k
//     11 k: 2 → −1   crosses the y-axis?     only when k is positive
//   Level 5  A number in front of ln         y = k ln x
//     12 k: 1 → 3    x-intercept             it does NOT move: (1, 0) always
//     13 k: 2 → −2   rises or falls?
//   Level 6  A number multiplying x          y = ln kx
//     14 k: 1 → 4    x-intercept             1/k
//     15 k: 1 → −2   left or right?          a negative k needs a negative x
export const curveFamily = {
  title: 'Move the Curve',
  intro: 'Decide first, then move the slider to see whether you were right.',
  levels: {
    1: 'A number added to eˣ',
    2: 'A number in front of eˣ',
    3: 'A number in the power',
    4: 'A number added inside the ln',
    5: 'A number in front of ln',
    6: 'A number multiplying x',
  },
  items: [
    { id: 'add_yint', level: 1, family: 'exp_add', from: 1, to: 3, ask: 'yint' },
    { id: 'add_asym', level: 1, family: 'exp_add', from: 1, to: -2, ask: 'asym' },
    { id: 'add_cross', level: 1, family: 'exp_add', from: 2, to: -3, ask: 'crossX' },

    { id: 'mult_yint', level: 2, family: 'exp_mult', from: 1, to: 4, ask: 'yint' },
    { id: 'mult_asym', level: 2, family: 'exp_mult', from: 1, to: 3, ask: 'asym' },
    { id: 'mult_side', level: 2, family: 'exp_mult', from: 2, to: -2, ask: 'side' },

    { id: 'pow_yint', level: 3, family: 'exp_in', from: 1, to: 3, ask: 'yint' },
    { id: 'pow_shape', level: 3, family: 'exp_in', from: 2, to: -1, ask: 'shape' },

    { id: 'lnadd_asym', level: 4, family: 'ln_add', from: 1, to: 3, ask: 'asym' },
    { id: 'lnadd_xint', level: 4, family: 'ln_add', from: 0, to: -2, ask: 'xint' },
    { id: 'lnadd_cross', level: 4, family: 'ln_add', from: 2, to: -1, ask: 'crossY' },

    { id: 'lnmult_xint', level: 5, family: 'ln_mult', from: 1, to: 3, ask: 'xint' },
    { id: 'lnmult_shape', level: 5, family: 'ln_mult', from: 2, to: -2, ask: 'shape' },

    { id: 'lnin_xint', level: 6, family: 'ln_in', from: 1, to: 4, ask: 'xint' },
    { id: 'lnin_side', level: 6, family: 'ln_in', from: 1, to: -2, ask: 'side' },
  ],
};
