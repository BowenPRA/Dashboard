// src/data/ADD_MATH/AM_5C/logEq.js
// "Log Equation Solver" — the first Apply task of AM_5C
// (src/tasks/LogEqLab.jsx, mode 'eq').
//
// WHICH QUESTION TYPES THIS IS. Problem bank types A, B, C and D of section 5.4
// (docs/add-math-5-4-log-equations.md) and type F of section 5.6
// (docs/add-math-5-6-change-of-base.md), plus the coursebook's own 5.6 worked
// example shape (two related bases ending in a quadratic). They share one
// method, so they share one task and differ as LEVELS:
//
//   combine each side into a single log (power law first)
//   → remove the logs (equal logs mean equal numbers, or exponential form)
//   → solve the equation that is left
//   → CHECK EVERY ROOT in the original equation.
//
// The last stage is the point of the unit. The app works out what goes inside
// every log (or what the base would be) at each root, and the student decides:
// keep or reject. So that the check is a real check, this pool has roots that
// are all kept, roots where one of two is rejected, and two questions where
// NOTHING survives.
//
// An item stores only the question: `base` and the terms on each side.
//   a number                  a plain number (or 'p/q')
//   [coef, arg]               coef · log_base(arg); arg is a number or a
//                             linear expression in x written as a string
//   [coef, arg, otherBase]    a log to another base
//   base: 'x'                 the unknown is the base
// utils/logEquations.js derives every stage, and `npm run validate`
// (checkLogEqItems) refuses a quadratic that does not factorise, a power that
// is not rational, and a question with no surviving root unless it says
// `expectNone: true`. Every number here is fresh.
//
// THE LADDER (one new idea per item; the levels only climb):
//   Level 1  Logs on both sides — equal logs mean equal numbers.
//     1  log₂ x + log₂ 7 = log₂ 42                  a sum
//     2  log₅(3x + 2) − log₅ 4 = log₅(x − 1)        a difference, and brackets
//     3  log₃(x + 4) + log₃ 2 = 2 log₃ 6            a coefficient: power law first
//     4  2 log₅ x = log₅ 81                         two roots; the negative one dies
//     5  log₇(2x − 9) = log₇(x − 6)                 the only root dies: no solution
//   Level 2  A number on one side — exponential form.
//     6  lg x + lg 4 = 2                            one log to make, then 10²
//     7  log₂ 5x − log₂(x − 3) = 3                  a quotient equal to 2³
//     8  log₃(7x + 3) = 2 + log₃(x − 1)             a log to move across first
//     9  lg(3x + 1) + 2 lg 5 = 2 + lg(x − 2)        move, power law, combine
//   Level 3  Leading to a quadratic.
//     10 log₃ x + log₃(x − 6) = 3                   one root rejected
//     11 log₂(x + 2) + log₂(x + 5) = log₂ 14x       BOTH roots survive
//     12 2 log₂ x − log₂(x + 3) = 2                 power law, then cross-multiply
//     13 log₂ x + log₂(2x − 3) = 1                  a fraction is the root that dies
//     14 1 + 2 log₅ x = log₅(24x + 5)               the number sits with a log
//     15 log₃(x − 5) + log₃(x − 2) = log₃(4 − 2x)   NEITHER root survives
//   Level 4  An unknown base.
//     16 logₓ 72 − logₓ 2 = 2                       x² = 36: a base is never negative
//     17 logₓ 4 + logₓ 16 = 3                       x³ = 64: only one root to check
//     18 logₓ 45 − 2 logₓ 3 = ½                     a root as the power
//     19 logₓ 75 = 2 + logₓ 3                       a log to move across first
//   Level 5  More than one base.
//     20 log₉ 3 + log₂(x − 1) = log₄ 32             evaluate the numerical logs first
//     21 log₃ x = log₉(x + 6)                       change to the smaller base
//     22 log₂(x − 1) = log₄(x + 5)                  the same, with a bracket to square
export const logEq = {
  title: 'Log Equation Solver',
  intro: 'Combine, remove the logs, solve. Then check every root in the original equation: a log needs a positive number inside.',
  levels: {
    1: 'Logs on both sides',
    2: 'A number on one side',
    3: 'Leading to a quadratic',
    4: 'An unknown base',
    5: 'More than one base',
  },
  items: [
    { id: 'a_sum', level: 1, base: 2, L: [[1, 'x'], [1, 7]], R: [[1, 42]] },
    { id: 'a_diff', level: 1, base: 5, L: [[1, '3x + 2'], [-1, 4]], R: [[1, 'x - 1']] },
    { id: 'a_coef', level: 1, base: 3, L: [[1, 'x + 4'], [1, 2]], R: [[2, 6]], note: 'A number in front of a log goes inside first, as a power.' },
    { id: 'a_square', level: 1, base: 5, L: [[2, 'x']], R: [[1, 81]], note: 'The algebra will give two roots. The check decides which to keep.' },
    { id: 'a_none', level: 1, base: 7, L: [[1, '2x - 9']], R: [[1, 'x - 6']], expectNone: true },

    { id: 'b_one', level: 2, base: 10, L: [[1, 'x'], [1, 4]], R: [2], note: 'A plain number on the right: convert to exponential form.' },
    { id: 'b_two', level: 2, base: 2, L: [[1, '5x'], [-1, 'x - 3']], R: [3] },
    { id: 'b_move', level: 2, base: 3, L: [[1, '7x + 3']], R: [2, [1, 'x - 1']], note: 'Logs on both sides AND a number. Collect the logs first.' },
    { id: 'b_coef', level: 2, base: 10, L: [[1, '3x + 1'], [2, 5]], R: [2, [1, 'x - 2']] },

    { id: 'c_one', level: 3, base: 3, L: [[1, 'x'], [1, 'x - 6']], R: [3] },
    { id: 'c_both', level: 3, base: 2, L: [[1, 'x + 2'], [1, 'x + 5']], R: [[1, '14x']] },
    { id: 'c_coef', level: 3, base: 2, L: [[2, 'x'], [-1, 'x + 3']], R: [2] },
    { id: 'c_lead', level: 3, base: 2, L: [[1, 'x'], [1, '2x - 3']], R: [1] },
    { id: 'c_move', level: 3, base: 5, L: [1, [2, 'x']], R: [[1, '24x + 5']] },
    { id: 'c_none', level: 3, base: 3, L: [[1, 'x - 5'], [1, 'x - 2']], R: [[1, '4 - 2x']], expectNone: true },

    { id: 'd_diff', level: 4, base: 'x', L: [[1, 72], [-1, 2]], R: [2], note: 'Now the unknown is the BASE. A base must be positive, and not 1.' },
    { id: 'd_cube', level: 4, base: 'x', L: [[1, 4], [1, 16]], R: [3] },
    { id: 'd_half', level: 4, base: 'x', L: [[1, 45], [-2, 3]], R: ['1/2'] },
    { id: 'd_move', level: 4, base: 'x', L: [[1, 75]], R: [2, [1, 3]] },

    { id: 'f_eval', level: 5, base: 2, L: [[1, 3, 9], [1, 'x - 1']], R: [[1, 32, 4]], note: 'Three different bases, but two of the logs are just numbers.' },
    { id: 'f_rel', level: 5, base: 3, L: [[1, 'x']], R: [[1, 'x + 6', 9]], note: 'Base 9 is a power of base 3. Change it to base 3.' },
    { id: 'f_rel2', level: 5, base: 2, L: [[1, 'x - 1']], R: [[1, 'x + 5', 4]] },
  ],
};
