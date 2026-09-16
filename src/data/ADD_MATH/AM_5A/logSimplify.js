// src/data/ADD_MATH/AM_5A/logSimplify.js
// "Log Simplifier" — the production task for AM_5A (src/tasks/LogSimplify.jsx).
//
// Built from coursebook sections 5.1–5.3: evaluating a log by asking the
// power question (worked examples 1, 4, 5) and the laws of logarithms
// (worked example 7: lg 8 + lg 2, log₄ 15 − log₄ 5, 2 log₃ 4 + 5 log₃ 2). Every
// number is fresh. Only the question is written here — every number-to-log,
// power, combined number and exponent is derived by utils/logs.js, and
// `npm run validate` refuses an item that has nothing to simplify, leaves a
// root inside, or puts a level out of order.
//
// THE LADDER (one new idea per item; the levels only climb):
//   Level 1  What a log asks — evaluate by writing the number as a power.
//     1  log₂ 32         a whole-number power
//     2  lg 1000         base 10 has its own name
//     3  log₇ 1          any base to the power 0 is 1
//     4  log₃ (1/9)      a fraction is a NEGATIVE power
//     5  log₄ 2          a root is a FRACTIONAL power (the half-rungs on the ladder)
//   Level 2  One law at a time.
//     6  log₆ 3 + log₆ 5          multiplication law — and 15 is not a power of 6
//     7  log₂ 40 − log₂ 5         division law — and 8 IS a power of 2
//     8  3 log₂ 5                 power law on its own
//   Level 3  Two laws at once.
//     9  2 log₅ 3 + 3 log₅ 2      powers inside, then multiply (worked example 7c's shape)
//     10 lg 50 + lg 4 − lg 2      three terms, top and bottom, down to a number
//     11 2 log₃ 6 − log₃ 4        power then divide, down to a number
//   Level 4  Negatives and fractions.
//     12 log₂ 3 − log₂ 24         the answer is a fraction, so the log is negative
//     13 ½ log₂ 36 − log₂ 3       a half in front is a square root inside
//   Level 5  Numbers into logs.
//     14 2 + log₃ 5               a whole number has to become a log first
//     15 1 + lg 3 − lg 2          the same with lg (1 = lg 10), and a log to divide by
//   Level 6  Challenge: fractional answers.
//     16 log₄ 2 + log₄ 16         combines to 32, which is 4 to the power 5/2
//     17 ⅔ log₈ 27 − log₈ 18      a cube root inside, a negative fraction out
export const logSimplify = {
  title: 'Log Simplifier',
  intro: 'Every log asks a power question. Simplify one move at a time, then ask: is it an exact number?',
  levels: {
    1: 'What a log asks',
    2: 'One law at a time',
    3: 'Two laws at once',
    4: 'Negatives and fractions',
    5: 'Numbers into logs',
    6: 'Challenge: fractional answers',
  },
  items: [
    { id: 'e_2_32', level: 1, kind: 'evaluate', base: 2, arg: 32 },
    { id: 'e_lg_1000', level: 1, kind: 'evaluate', base: 10, arg: 1000, note: 'lg means log base 10 — the log key on your calculator.' },
    { id: 'e_7_1', level: 1, kind: 'evaluate', base: 7, arg: 1 },
    { id: 'e_3_ninth', level: 1, kind: 'evaluate', base: 3, arg: '1/9', note: 'A number smaller than 1 needs a negative power.' },
    { id: 'e_4_2', level: 1, kind: 'evaluate', base: 4, arg: 2, note: 'Look at the small rungs on the ladder.' },

    { id: 'c_6_prod', level: 2, kind: 'combine', base: 6, terms: [[1, 3], [1, 5]], note: 'Adding logs multiplies. Then ask: is the answer an exact number?' },
    { id: 'c_2_quot', level: 2, kind: 'combine', base: 2, terms: [[1, 40], [-1, 5]] },
    { id: 'c_2_pow', level: 2, kind: 'combine', base: 2, terms: [[3, 5]], note: 'The 3 in front becomes a power.' },

    { id: 'c_5_two', level: 3, kind: 'combine', base: 5, terms: [[2, 3], [3, 2]] },
    { id: 'c_lg_three', level: 3, kind: 'combine', base: 10, terms: [[1, 50], [1, 4], [-1, 2]] },
    { id: 'c_3_powdiv', level: 3, kind: 'combine', base: 3, terms: [[2, 6], [-1, 4]] },

    { id: 'c_2_neg', level: 4, kind: 'combine', base: 2, terms: [[1, 3], [-1, 24]], note: 'The fraction you get is less than 1 — so what sign is its log?' },
    { id: 'c_2_half', level: 4, kind: 'combine', base: 2, terms: [['1/2', 36], [-1, 3]], note: 'A power of one half is a square root.' },

    { id: 'n_3_two', level: 5, kind: 'combine', base: 3, number: 2, terms: [[1, 5]], note: 'Logs only combine with logs — so the 2 must become one.' },
    { id: 'n_lg_one', level: 5, kind: 'combine', base: 10, number: 1, terms: [[1, 3], [-1, 2]] },

    { id: 'x_4_frac', level: 6, kind: 'combine', base: 4, terms: [[1, 2], [1, 16]] },
    { id: 'x_8_cube', level: 6, kind: 'combine', base: 8, terms: [['2/3', 27], [-1, 18]], note: 'A power of two thirds: cube root first, then square.' },
  ],
};
