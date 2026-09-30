// src/data/ADD_MATH/AM_5C/logQuad.js
// "Quadratic in a Log" — the second Apply task of AM_5C
// (src/tasks/LogEqLab.jsx, mode 'quad').
//
// WHICH QUESTION TYPES THIS IS. Problem bank type E of section 5.4 (a
// quadratic in log x, including a log of a power that has to be brought down
// first) and types I and J of section 5.6 (an equation with log_b x AND
// log_x b in it: changing the base turns the second one upside down, and
// multiplying through by the log gives a quadratic). Both are the same move —
// SUBSTITUTE u for the log — so they are one task; the second kind is a later
// level.
//
//   (bring the power down) → (turn the upside-down log over)
//   → let u = log x and write the quadratic in u → solve for u → go back to x.
//
// An item stores only the question: `base`, and the terms on each side.
//   a number          a plain number (or 'p/q')
//   ['sq', a]         a (log_b x)²
//   ['log', c, n]     c log_b(xⁿ)        n defaults to 1
//   ['rec', c]        c log_x b          the log upside down
// utils/logEquations.js derives the quadratic, its roots and each value of x
// (a fraction for a negative u, a surd for a half), and `npm run validate`
// refuses a quadratic that does not factorise.
//
// Nothing is rejected in this task, and the finished working says why: a
// power of a positive base is always positive. That is the contrast with the
// Log Equation Solver. The trap here is a different one — DIVIDING by the log
// and losing the root u = 0 (level 3). Every number is fresh.
//
// THE LADDER:
//   Level 1  A quadratic in a log.
//     1  (log₃ x)² − 3 log₃ x + 2 = 0          two whole-number powers
//     2  (log₂ x)² + log₂ x − 6 = 0            a negative u gives a fraction
//     3  2(log₉ x)² − 5 log₉ x + 2 = 0         u = ½, and 9 to the half is 3
//     4  2(lg x)² − 3 lg x + 1 = 0             u = ½ again, and now x is a surd
//   Level 2  Bring the power down first.
//     5  (log₂ x)² − log₂(x³) = 4              log(x³) is 3 log x, not (log x)³
//     6  (log₅ x)² + log₅(x²) = 3
//     7  2(log₄ x)² − log₄(x³) + 1 = 0
//   Level 3  Do not divide by the log.
//     8  (log₃ x)² = log₃(x²)                  u² = 2u: u = 0 is a root too
//     9  3 lg x = (lg x)²                      the same trap, the other way round
//   Level 4  The log upside down.
//     10 log₃ x = 4 log_x 3                    u = 4/u
//     11 log₂ x + 6 log_x 2 = 5                multiply EVERY term by u
//     12 log₅ x − 2 log_x 5 = 1                a negative u
//     13 log₃ x + log_x 3 = 5/2                a fraction to clear, a surd to finish
//     14 log₂ x = 3 − 2 log_x 2                terms on both sides
export const logQuad = {
  title: 'Quadratic in a Log',
  intro: 'The same log appears twice. Call it u, solve the quadratic in u, then go back to x.',
  levels: {
    1: 'A quadratic in a log',
    2: 'Bring the power down first',
    3: 'Do not divide by the log',
    4: 'The log upside down',
  },
  items: [
    { id: 'q_plain', level: 1, base: 3, L: [['sq', 1], ['log', -3], 2], R: [0] },
    { id: 'q_neg', level: 1, base: 2, L: [['sq', 1], ['log', 1], -6], R: [0], note: 'One value of u will be negative. That is allowed: a log can be negative.' },
    { id: 'q_half', level: 1, base: 9, L: [['sq', 2], ['log', -5], 2], R: [0] },
    { id: 'q_surd', level: 1, base: 10, L: [['sq', 2], ['log', -3], 1], R: [0] },

    { id: 'd_cube', level: 2, base: 2, L: [['sq', 1], ['log', -1, 3]], R: [4], note: 'One log has a power INSIDE it. Bring that power down first.' },
    { id: 'd_square', level: 2, base: 5, L: [['sq', 1], ['log', 1, 2]], R: [3] },
    { id: 'd_lead', level: 2, base: 4, L: [['sq', 2], ['log', -1, 3], 1], R: [0] },

    { id: 'z_left', level: 3, base: 3, L: [['sq', 1]], R: [['log', 1, 2]], note: 'It is tempting to divide both sides by the log. Do not.' },
    { id: 'z_right', level: 3, base: 10, L: [['log', 3]], R: [['sq', 1]] },

    { id: 'r_pure', level: 4, base: 3, L: [['log', 1]], R: [['rec', 4]], note: 'One log has x as its base. Change it to base 3 and it turns upside down.' },
    { id: 'r_sum', level: 4, base: 2, L: [['log', 1], ['rec', 6]], R: [5] },
    { id: 'r_neg', level: 4, base: 5, L: [['log', 1], ['rec', -2]], R: [1] },
    { id: 'r_frac', level: 4, base: 3, L: [['log', 1], ['rec', 1]], R: ['5/2'] },
    { id: 'r_sides', level: 4, base: 2, L: [['log', 1]], R: [3, ['rec', -2]] },
  ],
};
