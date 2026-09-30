// src/data/ADD_MATH/AM_5D/expSketch.js
// "Sketch the Curve" — the second Apply task of AM_5D
// (src/tasks/ExpGraphLab.jsx, mode 'sketch').
//
// WHICH QUESTION TYPE THIS IS. Problem bank 5.10, types A, B and C
// (docs/add-math-5-10-sketching-exp-and-ln.md): sketch y = k·e^(nx) + a or
// y = k·ln(ax + b), showing where it crosses the axes and its asymptote. The
// sketch is made the way it is made on paper, one decision at a time:
//
//   exponential  the y-intercept → does it cross the x-axis, and exactly
//                where? → the asymptote and which side of it the curve is on
//                → rises or falls → the curve is drawn
//   log curve    does it cross the y-axis, and exactly where? → the
//                x-intercept → the asymptote and which side → rises or falls
//                → the curve is drawn
//
// "Does it cross?" is a real question each time: an exponential with its
// asymptote on the far side of the x-axis never reaches it, and a log curve
// whose inside is negative at x = 0 never reaches the y-axis. An exact
// crossing such as ½ ln 2 is built from two boxes — a number in front, and
// the number inside the ln — and any equal form is accepted.
//
// An item is only the function: `kind: 'exp'` with k, n, a, or `kind: 'ln'`
// with k, a, b. utils/expGraphs.js derives every answer and every message,
// and `npm run validate` refuses a curve whose labels would land on top of
// each other when it is drawn.
//
// THE LADDER (the bank's "how it climbs" column; the levels only climb):
//   Level 1  eˣ with a constant.
//     1  3eˣ − 6            crosses the x-axis at ln 2
//     2  2eˣ + 5            does NOT cross: eˣ cannot be negative
//   Level 2  A negative power.
//     3  5e⁻ˣ − 2           falls; crosses at ln(5/2)
//     4  4e⁻ˣ + 2           falls, and never reaches the axis
//   Level 3  A negative number in front.
//     5  −3e⁻ˣ + 6          below its asymptote, and rises towards it
//     6  −2eˣ − 3           below its asymptote, and falls away from it
//   Level 4  A number in the power.
//     7  6e⁻²ˣ − 3          the crossing needs a ½: ½ ln 2
//     8  2e³ˣ + 4           no crossing
//     9  −2e²ˣ + 5          everything at once: ½ ln(5/2)
//   Level 5  A log curve with a plain bracket.
//     10 ln(x + 3)          the asymptote is where the inside is 0
//     11 ln(2x − 3)         no y-intercept: the inside is negative at x = 0
//   Level 6  An inside that is only positive to the left.
//     12 ln(6 − 3x)         the curve lives to the LEFT of x = 2, and falls
//     13 ln(4 − x)
//   Level 7  A number in front of the log.
//     14 3 ln(x + 2)        the y-intercept keeps its 3: 3 ln 2
//     15 2 ln(3x − 3)       the x-intercept is a fraction
//   Level 8  A negative number in front.
//     16 −2 ln(4x − 6)      turned over: it falls
//     17 −ln(5 − x)         two reflections: it rises
export const expSketch = {
  title: 'Sketch the Curve',
  intro: 'A sketch shows three things: where the curve crosses each axis, and its asymptote.',
  levels: {
    1: 'eˣ with a constant',
    2: 'A negative power',
    3: 'A negative number in front',
    4: 'A number in the power',
    5: 'A log curve',
    6: 'Only positive to the left',
    7: 'A number in front of the log',
    8: 'A negative number in front',
  },
  items: [
    { id: 'e_cross', level: 1, kind: 'exp', k: 3, n: 1, a: -6 },
    { id: 'e_none', level: 1, kind: 'exp', k: 2, n: 1, a: 5, note: 'Put y = 0 and see whether the equation can be solved.' },

    { id: 'neg_cross', level: 2, kind: 'exp', k: 5, n: -1, a: -2 },
    { id: 'neg_none', level: 2, kind: 'exp', k: 4, n: -1, a: 2 },

    { id: 'front_rise', level: 3, kind: 'exp', k: -3, n: -1, a: 6, note: 'A negative number in front puts the curve below its asymptote.' },
    { id: 'front_fall', level: 3, kind: 'exp', k: -2, n: 1, a: -3 },

    { id: 'pow_half', level: 4, kind: 'exp', k: 6, n: -2, a: -3, note: 'Taking ln gives the whole power. There is one more move to get x.' },
    { id: 'pow_none', level: 4, kind: 'exp', k: 2, n: 3, a: 4 },
    { id: 'pow_all', level: 4, kind: 'exp', k: -2, n: 2, a: 5 },

    { id: 'ln_plain', level: 5, kind: 'ln', k: 1, a: 1, b: 3, note: 'A log exists only where its inside is positive.' },
    { id: 'ln_noy', level: 5, kind: 'ln', k: 1, a: 2, b: -3 },

    { id: 'ln_left', level: 6, kind: 'ln', k: 1, a: -3, b: 6, note: 'Solve 6 − 3x > 0 carefully: which side of the asymptote is that?' },
    { id: 'ln_left_b', level: 6, kind: 'ln', k: 1, a: -1, b: 4 },

    { id: 'ln_front', level: 7, kind: 'ln', k: 3, a: 1, b: 2 },
    { id: 'ln_front_b', level: 7, kind: 'ln', k: 2, a: 3, b: -3 },

    { id: 'ln_neg', level: 8, kind: 'ln', k: -2, a: 4, b: -6 },
    { id: 'ln_neg_b', level: 8, kind: 'ln', k: -1, a: -1, b: 5 },
  ],
};
