// src/data/EXT_MATH/EM_07A/inequalities.js
// "Inequalities" — solving, number lines, whole-number solutions and regions,
// for EM_07A (src/tasks/Inequalities.jsx).
//
// Built from Wolsey Hall IGCSE Maths Extended Assignment 07:
//   Q5  solve a linear inequality with the letter on both sides
//   Q6  a double inequality with the letter in all three parts: the integers
//   Q7  write down the inequality a number line shows
//   Q8  the region R, three labelled lines: find the three inequalities
//   Q9  the unshaded region, lines NOT labelled: read each equation first
// Every number is original; the assignment's own inequalities are the
// homework. utils/inequalities.js derives every collected form, solution,
// flip, split, integer, line equation and region side.
//
// ORDER (one new idea per item):
//   1  Q5: letters to the side with more of them, then divide — and draw it
//   2  the letters end up negative: dividing turns the sign round
//   3  Q7: read a two-ended number line
//   4  the letter only in the middle: the same move on all three parts
//   5  Q6: the letter in all three parts — split it, then list the integers
//   6  Q8: a region, lines labelled — solid or dashed, then test a point
//   7  Q9: a region, lines unlabelled — read each equation off the grid first
export const inequalities = {
  title: 'Inequalities',
  intro: 'Solve it like an equation — but watch the sign. Dividing by a negative turns it round.',
  items: [
    { id: 'i_solve', kind: 'solve', ineq: '9x - 4 >= 5x + 8', line: true },
    { id: 'i_flip', kind: 'solve', ineq: '3 - 2x < 11', line: true, note: 'Two ways to collect the letters — one of them turns the sign round.' },
    { id: 'i_read', kind: 'read', set: '-2 < x <= 1', min: -4, max: 4 },
    { id: 'i_three', kind: 'double', ineq: '-5 < 2x + 3 <= 9', integers: true },
    { id: 'i_split', kind: 'double', ineq: '14 - 3n < 4n <= 20 + n', integers: true },
    {
      id: 'i_region',
      kind: 'region',
      grid: { xMin: -1, xMax: 11, yMin: -2, yMax: 9 },
      lines: [
        { eq: 'x = 2', dashed: true },
        { eq: '5y + 4x = 40', labelAt: [6.2, 4.4] },
        { eq: '3y = x - 3', dashed: true, labelAt: [10.9, 3.1, 'end'] },
      ],
      point: [3, 2],
      prompt: 'The region $R$ is defined by three inequalities. Find them.',
    },
    {
      id: 'i_unlabelled',
      kind: 'region',
      grid: { xMin: -3, xMax: 6, yMin: -3, yMax: 10 },
      lines: [
        { eq: 'y = -1', label: false },
        { eq: 'x = 4', dashed: true, label: false },
        { eq: 'y = 2x + 1', label: false },
      ],
      point: [2, 1],
      prompt: 'Write down the three inequalities that define the unshaded region. The lines are not labelled — read each one off the grid.',
    },
  ],
};
