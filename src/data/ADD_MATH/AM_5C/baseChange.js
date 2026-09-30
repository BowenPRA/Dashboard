// src/data/ADD_MATH/AM_5C/baseChange.js
// "Change of Base" — the third Apply task of AM_5C
// (src/tasks/LogEqLab.jsx, mode 'base').
//
// WHICH QUESTION TYPES THIS IS. Problem bank types A, B, C, D, E, G and H of
// section 5.6 (docs/add-math-5-6-change-of-base.md). They are six different
// things to DO with one rule,
//
//     log_b a = log_c a ÷ log_c b        (the log of the number, over the
//                                         log of the old base)
//
// so they share a task and climb as levels. Every item opens by choosing the
// right quotient from its look-alikes — upside down, a difference, a product —
// because that choice is the whole rule.
//
// An item stores only the question; utils/logEquations.js derives the stages.
//   { kind: 'evaluate', base, arg }                   log_b(arg) to 3 s.f., with lg
//   { kind: 'swap', given, letter, of, num }          letter = log_given(of); find log_of(num)
//   { kind: 'rebase', given, letter, of, target, times? }   find log_target(times · of)
//   { kind: 'from2', base, a: [name, value], b: [name, value], find: [newBase, number] }
//   { kind: 'product', logs: [[base, number], [base, number]] }
//   { kind: 'related', base, L: [term…], R: [term…] } term: a number, or [coef, logBase]
// `npm run validate` (checkLogEqItems) refuses an "evaluate" that is an exact
// number (that is the Log Simplifier's job), a base that is not a power of the
// given one, and a chain that does not link. Every number is fresh.
//
// THE LADDER:
//   Level 1  Evaluate with lg — estimate between two whole numbers first.
//     1  log₃ 20        between 2 and 3
//     2  log₂ 50        between 5 and 6
//     3  log₇ 3         less than 1: the number is smaller than the base
//     4  log₅ 0.4       negative: the number is smaller than 1
//   Level 2  The base and the number swapped.
//     5  u = log₂ x: log_x 2            the reciprocal case, 1/u
//     6  u = log₂ x: log_x 8            a power of the old base on top
//     7  u = log₅ x: log_x (1/5)        a negative log on top
//     8  u = log₅ x: log_x √5           a half on top
//   Level 3  A related base.
//     9  u = log₂ x: log₈ x             the new base is a power of the old one
//     10 x = log₉ y: log₃ y             the new base is a ROOT of the old one
//     11 x = log₉ y: log₃(27y)          a product inside as well
//   Level 4  One log from two.
//     12 log_a x = 15, log_a y = 5: log_y x
//     13 log_a P = 4, log_a Q = 10: log_Q P       the answer is a fraction
//   Level 5  A chain of logs.
//     14 log₃ 5 × log₅ 9                the 5 cancels
//     15 log_a 2 × log₈ a               the letter cancels
//   Level 6  Two related bases in one equation.
//     16 log₃ x + 2 log₉ x = 8
//     17 5 log₂ x − 2 log₄ x = 12       a subtraction
//     18 2 log₃ x = log₂₇ x + 5         logs on both sides
//     19 log₂ x + log₄ x + log₁₆ x = 7  three bases
export const baseChange = {
  title: 'Change of Base',
  intro: 'One rule: the log of the number, over the log of the old base. The base stays at the bottom.',
  levels: {
    1: 'Evaluate with lg',
    2: 'Base and number swapped',
    3: 'A related base',
    4: 'One log from two',
    5: 'A chain of logs',
    6: 'Two related bases',
  },
  items: [
    { id: 'e_3_20', level: 1, kind: 'evaluate', base: 3, arg: 20 },
    { id: 'e_2_50', level: 1, kind: 'evaluate', base: 2, arg: 50 },
    { id: 'e_7_3', level: 1, kind: 'evaluate', base: 7, arg: 3, note: 'The number is smaller than the base this time.' },
    { id: 'e_5_04', level: 1, kind: 'evaluate', base: 5, arg: '0.4', note: 'The number is smaller than 1.' },

    { id: 's_one', level: 2, kind: 'swap', given: 2, letter: 'u', of: 'x', num: 2, note: 'Now x is the BASE. Change back to the base you were given.' },
    { id: 's_cube', level: 2, kind: 'swap', given: 2, letter: 'u', of: 'x', num: 8 },
    { id: 's_recip', level: 2, kind: 'swap', given: 5, letter: 'u', of: 'x', num: '1/5' },
    { id: 's_root', level: 2, kind: 'swap', given: 5, letter: 'u', of: 'x', num: { root: 2, of: 5 } },

    { id: 'r_power', level: 3, kind: 'rebase', given: 2, letter: 'u', of: 'x', target: 8 },
    { id: 'r_root', level: 3, kind: 'rebase', given: 9, letter: 'x', of: 'y', target: 3, note: 'The new base, 3, is smaller than the base you are given.' },
    { id: 'r_times', level: 3, kind: 'rebase', given: 9, letter: 'x', of: 'y', target: 3, times: 27 },

    { id: 't_whole', level: 4, kind: 'from2', base: 'a', a: ['x', 15], b: ['y', 5], find: ['y', 'x'] },
    { id: 't_frac', level: 4, kind: 'from2', base: 'a', a: ['P', 4], b: ['Q', 10], find: ['Q', 'P'] },

    { id: 'p_num', level: 5, kind: 'product', logs: [[3, 5], [5, 9]] },
    { id: 'p_letter', level: 5, kind: 'product', logs: [['a', 2], [8, 'a']] },

    { id: 'h_sum', level: 6, kind: 'related', base: 3, L: [[1, 3], [2, 9]], R: [8] },
    { id: 'h_minus', level: 6, kind: 'related', base: 2, L: [[5, 2], [-2, 4]], R: [12] },
    { id: 'h_sides', level: 6, kind: 'related', base: 3, L: [[2, 3]], R: [[1, 27], 5] },
    { id: 'h_three', level: 6, kind: 'related', base: 2, L: [[1, 2], [1, 4], [1, 16]], R: [7] },
  ],
};
