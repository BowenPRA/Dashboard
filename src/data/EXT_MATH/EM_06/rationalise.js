// src/data/EXT_MATH/EM_06/rationalise.js
// "Rationalise It" — brackets with surds and rationalising the denominator,
// for EM_06 (src/tasks/Rationalise.jsx).
//
// Built from Question 4 of Wolsey Hall IGCSE Maths Extended Assignment 06:
//   4b  show that √3 / (2√3 − 1) can be written as (a + √3)/b
//   4c  simplify (6 − √5)(6 + √5) / √31
//   4d  a right-angled triangle with sides 5 + √7 and 5 − √7
// All three rest on one fact: (a + √b)(a − √b) has no surd in it. So the task
// expands brackets first — the conjugate pair's surd cells cancel in the grid,
// on screen, before the word "rationalise" is used — then clears k√m, then a
// two-term denominator, and ends on 4b's "show that" shape. Every number is
// original; 4c and 4d themselves are in the Practice task.
//
// A term is [k, r] = k√r, r = 1 a whole number, in the order the question
// prints them. `form` names the letters of a "show that" answer.
//
// ORDER (one new idea per item):
//   1  expand two brackets
//   2  a conjugate pair — the surds cancel
//   3  a square bracket: four cells, two of them alike
//   4  k√m on the bottom, the easy case
//   5  √8 on the bottom — the top needs simplifying afterwards
//   6  a two-term top over a single surd
//   7  a two-term bottom: multiply by the conjugate
//   8  the conjugate where everything divides at the end
//   9  Question 4b's "show that … in the form (a + √2)/b"
//   10 surds top and bottom
export const rationalise = {
  title: 'Rationalise It',
  intro: 'Multiply every term by every term. Watch what happens to the surds.',
  items: [
    { id: 'e1', kind: 'expand', left: [[2, 1], [1, 3]], right: [[4, 1], [1, 3]] },
    { id: 'e2', kind: 'expand', left: [[7, 1], [-1, 2]], right: [[7, 1], [1, 2]], note: 'The two brackets differ only in the sign in the middle.' },
    { id: 'e3', kind: 'expand', left: [[4, 1], [1, 5]], right: [[4, 1], [1, 5]], square: true },
    { id: 'm1', kind: 'mono', num: [[6, 1]], den: [1, 3] },
    { id: 'm2', kind: 'mono', num: [[10, 1]], den: [1, 8] },
    { id: 'm3', kind: 'mono', num: [[4, 1], [1, 2]], den: [1, 2] },
    { id: 'b1', kind: 'binomial', num: [[5, 1]], den: [[3, 1], [-1, 2]] },
    { id: 'b2', kind: 'binomial', num: [[4, 1]], den: [[1, 5], [1, 1]] },
    {
      id: 'b3',
      kind: 'binomial',
      num: [[1, 2]],
      den: [[3, 2], [-2, 1]],
      prompt: 'Show that $\\dfrac{\\sqrt{2}}{3\\sqrt{2} - 2}$ can be written in the form $\\dfrac{a + \\sqrt{2}}{b}$, where $a$ and $b$ are integers.',
      form: { latex: '\\dfrac{a + \\sqrt{2}}{b}', a: 'int', b: 'den', surd: 1 },
    },
    { id: 'b4', kind: 'binomial', num: [[1, 3], [1, 1]], den: [[1, 3], [-1, 1]] },
  ],
};
