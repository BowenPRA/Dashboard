// src/data/ADD_MATH/AM_5B/hiddenQuad.js
// "Hidden Quadratic" — an Apply task of AM_5B (src/tasks/ExpLab.jsx, mode 'quad').
//
// WHICH QUESTION TYPES THIS IS. From the problem banks:
//   5.5 type B  split with the index laws (one term in y)   level 1
//   5.5 type C  a plain hidden quadratic                    level 2
//   5.5 type D  a shifted power                             level 3
//   5.5 type E  a disguised base (4 and 2, 25 and 5, …)     level 4
//   5.7 types I, J  quadratics in e^x                       level 5
//   5.7 types I, J  with e^(−x)                             level 6
// The book teaches these in three steps of disguise — plain, shifted,
// squared base — and the ladder climbs in the same order. Type B sits first:
// it is not a quadratic, but it is the split (3^(x+1) = 3 × 3^x) that level 3
// needs, practised where it is the only idea.
//
// The stages: choose the substitution (skipped where the question gives it,
// as the exam's "use the substitution y = …" does) → [clear 1/y] → type the
// quadratic's coefficients (any multiple is accepted) → the values of y →
// KEEP OR REJECT each one → turn what is kept back into x. The keep stage is
// the point of the task: a power of a positive number is never zero or
// negative. So the ladder includes items where both values survive, where one
// is rejected, where the value is a fraction or 1 (both KEPT — the traps that
// look wrong), where 0 is rejected, and two where nothing survives at all.
// After the keep stage the curve y = a^x is drawn with each value as a line:
// the kept ones meet the curve, the rejected ones never can.
//
// Every question comes from the bank and stores the equation only
// (`lhs` / `rhs` terms); utils/expEquations.js derives the quadratic, its
// roots, which are kept, and each x. `npm run validate` refuses a quadratic
// with irrational roots, a repeated root, an item with no solutions that does
// not say `expectNone: true`, and a one-term item that does not say
// `linear: true` — so neither can happen by accident.
//
// THE LADDER:
//   Level 1  Split the power: one term in y.
//     1  2^(x+3) − 2^x = 21            8y − y = 21
//     2  4^x − 4^(x+1) + 24 = 0        y = 8, an exact power: x = 3/2
//     3  2^(x+2) + 2^(x−1) = 27        a negative shift gives ½y
//   Level 2  A plain hidden quadratic.
//     4  2^(2x) + 8 = 6(2^x)           the substitution is given
//     5  5^(2x) − 7(5^x) + 10 = 0      one exact answer, one to 3 s.f.
//     6  2^(2x) − 2^x − 12 = 0         y = −3 is rejected
//     7  2^(2x) + 5(2^x) + 6 = 0       both rejected: no solutions
//   Level 3  A shifted power.
//     8  3^(2x) − 4(3^(x+1)) + 27 = 0  given; 4(3^(x+1)) = 12y
//     9  2^(2x) + 2^(x+2) − 32 = 0     y = −8 is rejected
//     10 2^(2x+1) = 9(2^x) − 4         2y²; y = ½ is KEPT: x = −1
//   Level 4  A disguised base.
//     11 4^x − 5(2^x) − 24 = 0         4^x = (2^x)²
//     12 25^x + 4 = 5^(x+1)            y = 1 is KEPT: x = 0
//     13 16^x − 4^(x+1) − 12 = 0       disguised AND shifted
//   Level 5  Powers of e.
//     14 e^(2x) − 7e^x + 12 = 0        exact: x = ln 3 or ln 4
//     15 e^(2x) − 8e^x + 7 = 0         3 s.f.: e^x = 1 gives x = 0
//     16 e^(2x) − 6e^x = 0             y = 0 is rejected: e^x is never 0
//     17 e^(2x) − 3e^x − 10 = 0        3 s.f.: y = −2 is rejected
//   Level 6  With e^(−x): multiply through by y first.
//     18 e^x + 8e^(−x) = 6             exact
//     19 e^x − 12e^(−x) = 1            3 s.f.: y = −3 is rejected
//     20 e^x + 6e^(−x) + 5 = 0         no solutions — and every term was positive
export const hiddenQuad = {
  title: 'Hidden Quadratic',
  intro: 'Two powers of the same thing hide a quadratic. Substitute, solve for y, and then decide which values of y a power can really take.',
  levels: {
    1: 'Split the power: one term in y',
    2: 'A plain hidden quadratic',
    3: 'A shifted power',
    4: 'A disguised base',
    5: 'Powers of e',
    6: 'With e to the minus x',
  },
  items: [
    { id: 's_2_21', level: 1, base: 2, lhs: [[1, 1, 3], [-1, 1, 0]], rhs: [21], linear: true, note: 'Not a quadratic yet: this level practises splitting a power, which the harder levels need.' },
    { id: 's_4_24', level: 1, base: 4, lhs: [[1, 1, 0], [-1, 1, 1], 24], rhs: [0], linear: true },
    { id: 's_2_27', level: 1, base: 2, lhs: [[1, 1, 2], [1, 1, -1]], rhs: [27], linear: true },

    { id: 'q_2_68', level: 2, base: 2, lhs: [[1, 2, 0], 8], rhs: [[6, 1, 0]], given: true, note: '2^(2x) is (2^x)², so with y = 2^x it is y².' },
    { id: 'q_5_710', level: 2, base: 5, lhs: [[1, 2, 0], [-7, 1, 0], 10], rhs: [0] },
    { id: 'q_2_112', level: 2, base: 2, lhs: [[1, 2, 0], [-1, 1, 0], -12], rhs: [0] },
    { id: 'q_2_none', level: 2, base: 2, lhs: [[1, 2, 0], [5, 1, 0], 6], rhs: [0], expectNone: true },

    { id: 'd_3_427', level: 3, base: 3, lhs: [[1, 2, 0], [-4, 1, 1], 27], rhs: [0], given: true, note: 'Split the shifted power first: 3^(x+1) = 3 × 3^x.' },
    { id: 'd_2_432', level: 3, base: 2, lhs: [[1, 2, 0], [1, 1, 2], -32], rhs: [0] },
    { id: 'd_2_94', level: 3, base: 2, lhs: [[1, 2, 1]], rhs: [[9, 1, 0], -4] },

    { id: 'g_4_2', level: 4, base: 2, lhs: [[1, 1, 0, 4], [-5, 1, 0], -24], rhs: [0], note: 'Two different bases, but one is the square of the other.' },
    { id: 'g_25_5', level: 4, base: 5, lhs: [[1, 1, 0, 25], 4], rhs: [[1, 1, 1]] },
    { id: 'g_16_4', level: 4, base: 4, lhs: [[1, 1, 0, 16], [-1, 1, 1], -12], rhs: [0] },

    { id: 'e_712', level: 5, base: 'e', lhs: [[1, 2, 0], [-7, 1, 0], 12], rhs: [0], give: 'exact', note: 'The same method with e: y = e^x, and ln turns y back into x.' },
    { id: 'e_87', level: 5, base: 'e', lhs: [[1, 2, 0], [-8, 1, 0], 7], rhs: [0] },
    { id: 'e_6', level: 5, base: 'e', lhs: [[1, 2, 0], [-6, 1, 0]], rhs: [0], give: 'exact' },
    { id: 'e_310', level: 5, base: 'e', lhs: [[1, 2, 0], [-3, 1, 0], -10], rhs: [0] },

    { id: 'm_86', level: 6, base: 'e', lhs: [[1, 1, 0], [8, -1, 0]], rhs: [6], give: 'exact', note: 'e^(−x) = 1/e^x, so with y = e^x it becomes 1/y.' },
    { id: 'm_121', level: 6, base: 'e', lhs: [[1, 1, 0], [-12, -1, 0]], rhs: [1] },
    { id: 'm_none', level: 6, base: 'e', lhs: [[1, 1, 0], [6, -1, 0], 5], rhs: [0], expectNone: true },
  ],
};
