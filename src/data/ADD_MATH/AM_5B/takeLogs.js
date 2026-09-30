// src/data/ADD_MATH/AM_5B/takeLogs.js
// "Take Logs" — an Apply task of AM_5B (src/tasks/ExpLab.jsx, mode 'logs').
//
// WHICH QUESTION TYPES THIS IS. From the problem banks:
//   5.5 type A  a^(px + q) = b, then a different base on each side   levels 1–3
//   5.7 type E  e^(…) = k, to 3 significant figures                   level 4
//   5.7 type F  e^(…) = k, the answer in terms of ln                  level 5
//   5.7 type G  ln(px + q) = k                                        level 6
//   5.7 type I  the exact-form ln(…) = k (I1)                         level 6
// One screen, because every one of them is the same argument: get the power
// (or the log) on its own, apply its inverse to both sides, then solve a
// linear equation. The first stage is the same four named moves every time —
// get it on its own / take lg / take ln / make each side a power of e — and
// which one is right changes with the level, so it is a real decision.
//
// An item stores the QUESTION only. utils/expEquations.js derives the move,
// the line after the power law and three wrong lines to set beside it, the
// working value, x to 3 s.f. or the exact form, and the check. The register
// the answer is wanted in (3 s.f., in terms of ln, exact) is printed on every
// question. `npm run validate` (checkExpItems) refuses an item whose right-hand
// side is an exact power of the base (it needs no logs), a wrong option that
// is secretly right, an answer too big or small to type, and one that sits on
// a rounding boundary.
//
// THE LADDER (each level adds one idea):
//   Level 1  A plain power: take lg, bring the power down, divide.
//     1  2^x = 45                   the method
//     2  5^x = 0.3                  a number below 1: a negative answer
//     3  7^x = 500                  a big number: still one division
//   Level 2  More in the power: the whole power comes down, in a bracket.
//     4  2^(5x) = 90                a multiple of x; x = 1.30, the zero counts
//     5  5^(3x − 1) = 60            undo −1 then ÷3 — in that order
//     6  4^(2 − x) = 9              a minus x in the power
//   Level 3  A different base on each side.
//     7  5^x = 2^(x + 3)            one bracket to multiply out
//     8  3^(x + 1) = 7^(x − 1)      two brackets, signs to watch
//     9  5^(1 − 2x) = 3^(x + 2)     a negative answer
//   Level 4  Powers of e, to 3 s.f.: ln is the log that undoes e.
//     10 e^x = 40
//     11 e^(2x − 3) = 6
//     12 e^(1 − 4x) = 3             x = −0.0247: significant figures start at the 2
//   Level 5  Powers of e, answer in terms of ln.
//     13 e^x = 11                   the answer IS the line after the power law
//     14 3e^x − 2 = 10              get e^x on its own first
//     15 e^(3x + 1) = 5             exact form of a linear power
//     16 5 − 2e^(−x) = 1            a negative multiplier, a minus x
//   Level 6  Undo a log: make each side a power of e.
//     17 ln x = −1.5                a negative right-hand side: x is still positive
//     18 ln(3x − 2) = 2
//     19 2 ln x = 5                 get ln x on its own first
//     20 ln(x + 2) = 3              exact form: x = e³ − 2
export const takeLogs = {
  title: 'Take Logs',
  intro: 'The unknown is stuck in a power (or inside a log). Each question says whether it wants 3 significant figures or an exact answer.',
  levels: {
    1: 'A plain power',
    2: 'More in the power',
    3: 'A different base on each side',
    4: 'Powers of e, to 3 significant figures',
    5: 'Powers of e, in terms of ln',
    6: 'Undo a log',
  },
  items: [
    { id: 'p_2_45', level: 1, kind: 'exp', base: 2, power: [1, 0], rhs: 45 },
    { id: 'p_5_03', level: 1, kind: 'exp', base: 5, power: [1, 0], rhs: '0.3', note: '0.3 is less than 1, which is 5 to the power 0. What does that say about x?' },
    { id: 'p_7_500', level: 1, kind: 'exp', base: 7, power: [1, 0], rhs: 500 },

    { id: 'l_2_5x', level: 2, kind: 'exp', base: 2, power: [5, 0], rhs: 90, note: 'Now the power is more than just x. The whole power comes down.' },
    { id: 'l_5_3x1', level: 2, kind: 'exp', base: 5, power: [3, -1], rhs: 60 },
    { id: 'l_4_2x', level: 2, kind: 'exp', base: 4, power: [-1, 2], rhs: 9 },

    { id: 'b_5_2', level: 3, kind: 'exp2', left: { base: 5, power: [1, 0] }, right: { base: 2, power: [1, 3] }, note: 'Two different bases, so they cannot be matched. Take logs of both sides at once.' },
    { id: 'b_3_7', level: 3, kind: 'exp2', left: { base: 3, power: [1, 1] }, right: { base: 7, power: [1, -1] } },
    { id: 'b_5_3', level: 3, kind: 'exp2', left: { base: 5, power: [-2, 1] }, right: { base: 3, power: [1, 2] } },

    { id: 'e_40', level: 4, kind: 'exp', base: 'e', power: [1, 0], rhs: 40, note: 'e is a number, about 2.718. The log to base e is ln.' },
    { id: 'e_2x3', level: 4, kind: 'exp', base: 'e', power: [2, -3], rhs: 6 },
    { id: 'e_14x', level: 4, kind: 'exp', base: 'e', power: [-4, 1], rhs: 3 },

    { id: 'x_11', level: 5, kind: 'exp', base: 'e', power: [1, 0], rhs: 11, give: 'exact', note: 'In terms of ln means leave ln in the answer: no calculator.' },
    { id: 'x_3e2', level: 5, kind: 'exp', base: 'e', power: [1, 0], rhs: 10, coef: 3, add: -2, give: 'exact' },
    { id: 'x_3x1', level: 5, kind: 'exp', base: 'e', power: [3, 1], rhs: 5, give: 'exact' },
    { id: 'x_5m2', level: 5, kind: 'exp', base: 'e', power: [-1, 0], rhs: 1, coef: -2, add: 5, give: 'exact' },

    { id: 'n_m15', level: 6, kind: 'ln', arg: [1, 0], rhs: '-1.5', note: 'Now the unknown is inside a log. The inverse of ln is e to the power.' },
    { id: 'n_3x2', level: 6, kind: 'ln', arg: [3, -2], rhs: 2 },
    { id: 'n_2lnx', level: 6, kind: 'ln', arg: [1, 0], rhs: 5, coef: 2 },
    { id: 'n_x2e', level: 6, kind: 'ln', arg: [1, 2], rhs: 3, give: 'exact' },
  ],
};
