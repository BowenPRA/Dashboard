// src/data/ADD_MATH/AM_5B/undoIt.js
// "Undo It" — an Apply task of AM_5B (src/tasks/ExpLab.jsx, mode 'exact').
//
// WHICH QUESTION TYPES THIS IS. From the problem bank for 5.7:
//   type C  exact values: e^(ln a) = a and ln(e^n) = n, no calculator
//   type D  solve using the same two facts
// Both are the one idea the rest of the unit leans on — e to the power and ln
// undo each other — so it gets a short task of its own and comes first in
// Gate 1. It earns a screen because the traps are specific and nameable:
// 2 ln 3 is ln 9, not ln 6; the 4 in 4e^(ln 3) multiplies and is not a
// power; −ln 5 is ln(1/5), never ln(−5); ln(1/e²) is −2; and e^(2 ln x) = 49
// gives x² = 49, where −7 must be REJECTED because ln(−7) does not exist.
//
// Items: { kind: 'value', front?, terms: [[k, a], …] } for front · e^(Σ k ln a);
// { kind: 'lnpow', power } for ln of a power of e, printed by its shape (1/e²,
// √e); { kind: 'solve', form: 'exp' | 'ln', k, rhs } for e^(k ln x) = rhs and
// ln e^(kx) = rhs. utils/expEquations.js derives every single log, value and
// root with exact fractions; `checkExpItems` refuses a power that leaves a
// root inside a log, and a solution that is not a whole number or a fraction.
//
// THE LADDER:
//   Level 1  e undoes ln.
//     1  e^(ln 9)
//     2  e^(ln x) = 12
//   Level 2  ln undoes e.
//     3  ln e⁴
//     4  ln(1/e²)                   one over a power is a negative power
//     5  ln √e                      a root is a fractional power
//     6  ln e^(2x) = 9
//   Level 3  A number in front of ln: it goes inside as a power.
//     7  e^(2 ln 3)                 9, not 6
//     8  e^(½ ln 49)                a power of ½ is a square root
//     9  e^(3 ln x) = 64            x³ = 64
//   Level 4  A minus sign: a power of −1.
//     10 e^(−ln 5)                  1/5, never −5
//     11 e^(−ln x) = 8              1/x = 8
//     12 −e^(−ln ¼)                 two minus signs, doing different jobs
//   Level 5  Putting it together.
//     13 4e^(ln 3)                  the 4 multiplies: 12, not 81
//     14 e^(ln 6 − ln 2)            combine first: ln 3
//     15 e^(2 ln x) = 49            x = ±7, and −7 is rejected
export const undoIt = {
  title: 'Undo It',
  intro: 'e to the power and ln undo each other: e^(ln a) = a and ln(e^n) = n. No calculator in this task.',
  levels: {
    1: 'e undoes ln',
    2: 'ln undoes e',
    3: 'A number in front of ln',
    4: 'A minus sign',
    5: 'Putting it together',
  },
  items: [
    { id: 'v_9', level: 1, kind: 'value', terms: [[1, 9]] },
    { id: 's_x12', level: 1, kind: 'solve', form: 'exp', k: 1, rhs: 12 },

    { id: 'w_4', level: 2, kind: 'lnpow', power: 4 },
    { id: 'w_m2', level: 2, kind: 'lnpow', power: -2 },
    { id: 'w_half', level: 2, kind: 'lnpow', power: '1/2' },
    { id: 's_2x9', level: 2, kind: 'solve', form: 'ln', k: 2, rhs: 9 },

    { id: 'v_2ln3', level: 3, kind: 'value', terms: [[2, 3]], note: 'Move the 2 inside the log as a power first.' },
    { id: 'v_half49', level: 3, kind: 'value', terms: [['1/2', 49]] },
    { id: 's_x3', level: 3, kind: 'solve', form: 'exp', k: 3, rhs: 64 },

    { id: 'v_mln5', level: 4, kind: 'value', terms: [[-1, 5]], note: 'A minus sign in front of ln is a power of −1.' },
    { id: 's_xm1', level: 4, kind: 'solve', form: 'exp', k: -1, rhs: 8 },
    { id: 'v_mmq', level: 4, kind: 'value', front: -1, terms: [[-1, '1/4']] },

    { id: 'v_4e3', level: 5, kind: 'value', front: 4, terms: [[1, 3]] },
    { id: 'v_6m2', level: 5, kind: 'value', terms: [[1, 6], [-1, 2]] },
    { id: 's_x2', level: 5, kind: 'solve', form: 'exp', k: 2, rhs: 49, note: 'x² has two square roots. Which of them can go into ln x?' },
  ],
};
