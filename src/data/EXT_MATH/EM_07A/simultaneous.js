// src/data/EXT_MATH/EM_07A/simultaneous.js
// "Simultaneous" — two equations, two unknowns, solved by the quickest method,
// for EM_07A (src/tasks/Simultaneous.jsx).
//
// Built from Wolsey Hall IGCSE Maths Extended Assignment 07:
//   Q14c  a line from part (a) and a second line: where do they cross?
//   Q19   a chain "… = … = 10" is two equations; solve them
//   Q20   brackets on both lines: tidy first, then eliminate
//   Q21   fractions: clear them, and the y terms match
//   Q22   a bracket repeated in both equations: its x terms already match
// and the instruction over Q19–Q22: explain why the method you chose was the
// most efficient. So every item stages the METHOD as its own choice, with its
// reason, derived from the equations. Every number is original; the
// assignment's own equations are the homework.
//
// ORDER (one new idea per item):
//   1  the y terms are opposite: add
//   2  the x terms are the same: subtract (same signs subtract)
//   3  Q19's chain: split it, then multiply ONE equation
//   4  multiply BOTH equations
//   5  Q14c: y is already on its own — substitution
//   6  x on its own, with a number in front of it in the other equation
//   7  Q20: brackets — tidy both, then eliminate
//   8  Q21: fractions — clear them, and a pair already matches
//   9  Q22: a repeated bracket — tidy, and the x terms already match
export const simultaneous = {
  title: 'Simultaneous Equations',
  intro: 'Tidy, choose the quickest method, solve, then check in the other equation.',
  items: [
    { id: 's_add', eqs: ['3x + 2y = 16', '5x - 2y = 16'], note: 'Look at the y terms first.' },
    { id: 's_sub', eqs: ['5x + 2y = 27', '3x + 2y = 17'] },
    { id: 's_chain', chain: '5x + 2y = 3x - 4y = 13' },
    { id: 's_both', eqs: ['4x + 3y = 11', '5x - 2y = 8'] },
    {
      id: 's_line',
      eqs: ['y = 3x - 5', '2x + y = 15'],
      prompt: 'Line $L$ has equation $y = 3x - 5$ and line $M$ has equation $2x + y = 15$. Find the coordinates of the point where they cross.',
    },
    { id: 's_xsub', eqs: ['x = 2y + 1', '3x - 4y = 7'] },
    { id: 's_brackets', eqs: ['2(x + 3) - 3(y - 1) = 3', '4(x - 2) - (y + 1) = -1'] },
    { id: 's_fractions', eqs: ['x + 1 = y/2', 'x = (y + 3)/3'] },
    { id: 's_repeat', eqs: ['2(x + 1) + y = 11', '5(y - 2) + 2(x + 1) = 5'] },
  ],
};
