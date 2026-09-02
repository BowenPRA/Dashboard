// src/data/ADD_MATH/AM_3A/polyDiv.js
// The Long Division task (src/tasks/PolyDivision.jsx). Eight divisions, in
// teaching order.
//
// ONLY the dividend and the divisor are stored, both as DESCENDING coefficient
// arrays: [1, -1, -3, 2] is x³ − x² − 3x + 2. Every quotient term, product row
// and subtraction is derived at runtime by utils/polynomial.js, and
// `npm run validate` re-derives the same model to prove each item is answerable
// (whole-number cells throughout, remainder below the divisor's degree).
//
// The eight are chosen so that each one adds exactly one new difficulty:
//   1  every power present, monic divisor — the plain case
//   2  large coefficients, so the arithmetic cannot be eyeballed
//   3  a missing x² term: 0x² has to be written in
//   4  the first REMAINDER
//   5  a leading coefficient other than 1 in the dividend
//   6  a missing x term AND a negative remainder
//   7  a non-monic divisor, 3x + 1 — the quotient terms stop being obvious
//   8  a QUADRATIC divisor: two cells per subtraction, and the remainder is
//      itself a linear expression rather than a number
// Five come straight from Exercise 3.2 of the coursebook; three (4, 6, 8) are
// written to give remainders, which that exercise never does.

export const polyDiv = {
  title: 'Long Division of Polynomials',
  intro: 'Work down the columns: divide, multiply, subtract, and the next term is brought down for you.',
  items: [
    {
      id: 'pd1',
      dividend: [1, -1, -3, 2],
      divisor: [1, -2],
      note: 'Every power is present, so the columns are already lined up. Three passes.',
    },
    {
      id: 'pd2',
      dividend: [1, 3, -46, -48],
      divisor: [1, 1],
      note: 'Bigger numbers, identical method. Take the subtraction one column at a time.',
    },
    {
      id: 'pd3',
      dividend: [1, 0, -3, -2],
      divisor: [1, -2],
      note: 'There is no x² term in the question. It is written in as 0x² so nothing slips a column.',
    },
    {
      id: 'pd4',
      dividend: [1, 4, -3, 5],
      divisor: [1, 2],
      note: 'This one does not go exactly. Keep going until what is left is just a number — that number is the remainder.',
    },
    {
      id: 'pd5',
      dividend: [3, 8, 3, -2],
      divisor: [1, 2],
      note: 'The dividend starts with 3x³, so the first quotient term is 3x² rather than x².',
    },
    {
      id: 'pd6',
      dividend: [2, 5, 0, -4],
      divisor: [1, 3],
      note: 'A missing x term and a remainder in the same question. The remainder is allowed to be negative.',
    },
    {
      id: 'pd7',
      dividend: [6, 11, -3, -2],
      divisor: [3, 1],
      note: 'The divisor starts with 3x, so each quotient term comes from dividing by 3x, not by x.',
    },
    {
      id: 'pd8',
      dividend: [2, -3, 0, 1, -5],
      divisor: [1, 0, -2],
      note: 'A quadratic divisor. Stop when what is left has a lower degree than x² — so the remainder here is a linear expression.',
    },
  ],
};
