// src/data/ADD_MATH/AM_5D/fnInverse.js
// "Find the Inverse" — the third Apply task of AM_5D
// (src/tasks/ExpGraphLab.jsx, mode 'inverse').
//
// WHICH QUESTION TYPE THIS IS. Problem bank 5.11, types A, B and C
// (docs/add-math-5-11-inverses.md): find the inverse of an exponential or a
// logarithmic function, and state its domain. It is pure procedure, so it is
// staged exactly as the three labelled steps the section teaches, with a
// fourth that the exercise adds:
//
//   1  write it as y = …           (printed)
//   2  swap x and y                (chosen from four lines that look alike)
//   3  rearrange to make y the subject, ONE MOVE AT A TIME: the student names
//      each move — add, subtract, multiply, divide, take ln, or write both
//      sides as powers of e — and types its number
//   4  state the domain of the inverse: it is the range of f
//
// The reveal draws f and its inverse together with the line y = x, so the
// reflection can be seen, and the asymptote of one becomes the asymptote of
// the other.
//
// An item is only the function. utils/expGraphs.js derives the swapped line
// and its three look-alikes, every move and what the equation looks like
// after it, the inverse, its domain, and a check. `npm run validate` composes
// f with the derived inverse numerically and refuses an item whose own moves
// the judge does not accept.
//
// THE LADDER (the bank's "how it climbs" columns; the levels only climb):
//   Level 1  eˣ with a constant.          two moves
//     1  eˣ + 7
//     2  eˣ − 5                           ADD to clear a subtraction
//   Level 2  A number in front.           three moves
//     3  4eˣ + 3                          clear the constant before you divide
//   Level 3  A number in the power.       ln first, then divide
//     4  e²ˣ + 3
//     5  2e³ˣ − 1                         all four moves
//   Level 4  A negative power.
//     6  6e⁻²ˣ + 4                        divide by −2 at the end
//   Level 5  A constant minus an exponential.   the domain is x < a
//     7  3 − eˣ
//     8  5 − 2e⁻ˣ
//     9  8 − 3e⁻⁴ˣ
//   Level 6  Halves.
//     10 ½e^(x/2) + 1                     dividing by ½ is multiplying by 2
//   Level 7  A log with a plain bracket.  powers of e undo ln
//     11 ln(x + 4)
//     12 ln(x − 6)
//   Level 8  A number in front of the log.
//     13 3 ln(x + 1)                      divide BEFORE writing powers of e
//   Level 9  A number inside the bracket.
//     14 2 ln(3x + 2)
//     15 4 ln(2x − 7)
//   Level 10 A negative number in front.
//     16 −2 ln(5x − 1)
export const fnInverse = {
  title: 'Find the Inverse',
  intro: 'Swap x and y, then undo what f does, last thing first.',
  levels: {
    1: 'eˣ with a constant',
    2: 'A number in front',
    3: 'A number in the power',
    4: 'A negative power',
    5: 'A constant minus an exponential',
    6: 'Halves',
    7: 'A log with a plain bracket',
    8: 'A number in front of the log',
    9: 'A number inside the bracket',
    10: 'A negative number in front',
  },
  items: [
    { id: 'c_plus', level: 1, kind: 'exp', k: 1, n: 1, a: 7 },
    { id: 'c_minus', level: 1, kind: 'exp', k: 1, n: 1, a: -5 },

    { id: 'k_front', level: 2, kind: 'exp', k: 4, n: 1, a: 3, note: 'f multiplies by 4 and THEN adds 3. Undo the last thing first.' },

    { id: 'n_pow', level: 3, kind: 'exp', k: 1, n: 2, a: 3 },
    { id: 'n_all', level: 3, kind: 'exp', k: 2, n: 3, a: -1 },

    { id: 'neg_pow', level: 4, kind: 'exp', k: 6, n: -2, a: 4 },

    { id: 'minus_e', level: 5, kind: 'exp', k: -1, n: 1, a: 3, order: 'const', note: 'The number in front of the e term is −1.' },
    { id: 'minus_e_b', level: 5, kind: 'exp', k: -2, n: -1, a: 5, order: 'const' },
    { id: 'minus_e_c', level: 5, kind: 'exp', k: -3, n: -4, a: 8, order: 'const' },

    { id: 'halves', level: 6, kind: 'exp', k: '1/2', n: '1/2', a: 1, note: 'To undo a half, multiply by 2.' },

    { id: 'ln_plus', level: 7, kind: 'ln', k: 1, a: 1, b: 4, note: 'ln is undone by writing both sides as powers of e.' },
    { id: 'ln_minus', level: 7, kind: 'ln', k: 1, a: 1, b: -6 },

    { id: 'ln_front', level: 8, kind: 'ln', k: 3, a: 1, b: 1, note: 'Get the ln on its own before you undo it.' },

    { id: 'ln_inside', level: 9, kind: 'ln', k: 2, a: 3, b: 2 },
    { id: 'ln_inside_b', level: 9, kind: 'ln', k: 4, a: 2, b: -7 },

    { id: 'ln_neg', level: 10, kind: 'ln', k: -2, a: 5, b: -1 },
  ],
};
