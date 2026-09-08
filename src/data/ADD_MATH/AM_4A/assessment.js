// src/data/ADD_MATH/AM_4A/assessment.js
// The Quiz for AM_4A: 10 multiple-choice items, one sitting, 12 minutes. Shares
// Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one nameable
// mistake (applying the bars to the whole subtraction, keeping a solution that
// squaring invented, writing a "greater than" answer as a chain, forgetting that
// a modulus inside a quadratic doubles the roots). No item simply repeats a
// notes check or a workbook question, and the key is spread A/B/C/D so it cannot
// be guessed.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_evaluate',
      type: 'mcq',
      title: '1. Work out $$|-3| - |-8|$$.',
      options: [
        { val: 'A', text: 'A. 11' },
        { val: 'B', text: 'B. 5' },
        { val: 'C', text: 'C. −5' },
        { val: 'D', text: 'D. −11' },
      ],
      correct: 'C',
      expEn: 'Apply each modulus first: $$|-3| = 3$$ and $$|-8| = 8$$. Then $$3 - 8 = -5$$. The subtraction happens OUTSIDE the bars, so the final answer is allowed to be negative. B is $$|-3 - (-8)|$$, which is a different expression; A adds the two moduli instead of subtracting.',
    },
    {
      id: 'q2_never_true',
      type: 'mcq',
      title: '2. Which of these statements is NOT true for all real numbers?',
      options: [
        { val: 'A', text: 'A. $$|x|^2 = x^2$$' },
        { val: 'B', text: 'B. $$|a + b| = |a| + |b|$$' },
        { val: 'C', text: 'C. $$|-x| = |x|$$' },
        { val: 'D', text: 'D. $$|x| \\geq 0$$' },
      ],
      correct: 'B',
      expEn: 'Take $$a = 3$$ and $$b = -3$$: the left side is $$|0| = 0$$ but the right side is $$3 + 3 = 6$$. The bars are not a bracket you can split across a plus. The other three hold for every real number, and A is the identity the whole squaring method is built on.',
    },
    {
      id: 'q3_equals_number',
      type: 'mcq',
      title: '3. Solve $$|3x + 5| = 2$$.',
      options: [
        { val: 'A', text: 'A. $$x = -1$$ or $$x = -\\frac{7}{3}$$' },
        { val: 'B', text: 'B. $$x = -1$$ only' },
        { val: 'C', text: 'C. $$x = -1$$ or $$x = \\frac{7}{3}$$' },
        { val: 'D', text: 'D. $$x = 1$$ or $$x = \\frac{7}{3}$$' },
      ],
      correct: 'A',
      expEn: 'A modulus equal to a positive number splits into two: $$3x + 5 = 2$$ gives $$x = -1$$, and $$3x + 5 = -2$$ gives $$3x = -7$$, so $$x = -\\frac{7}{3}$$. B forgets the negative branch entirely — the commonest single mistake in this topic. C solves $$3x - 5 = 2$$ by mistake.',
    },
    {
      id: 'q4_negative_rhs',
      type: 'mcq',
      title: '4. How many solutions does $$|2x - 9| = -4$$ have?',
      options: [
        { val: 'A', text: 'A. Two' },
        { val: 'B', text: 'B. One' },
        { val: 'C', text: 'C. Infinitely many' },
        { val: 'D', text: 'D. None' },
      ],
      correct: 'D',
      expEn: 'A modulus is a distance, so it can never be negative — and nothing that is never negative can equal $$-4$$. Splitting into two cases would produce $$x = \\frac{5}{2}$$ and $$x = \\frac{13}{2}$$, and both fail the check, which is exactly why the check exists. Spotting this takes one second and saves the whole calculation.',
    },
    {
      id: 'q5_parallel_arms',
      type: 'mcq',
      title: '5. How many solutions does $$|x - 6| = |x + 2|$$ have, and what are they?',
      options: [
        { val: 'A', text: 'A. Two: $$x = 2$$ and $$x = -2$$' },
        { val: 'B', text: 'B. One: $$x = 2$$' },
        { val: 'C', text: 'C. Two: $$x = 6$$ and $$x = -2$$' },
        { val: 'D', text: 'D. None' },
      ],
      correct: 'B',
      expEn: 'Case one, $$x - 6 = x + 2$$, collapses to $$-6 = 2$$ and gives nothing. Case two, $$x - 6 = -(x + 2)$$, gives $$2x = 4$$ and $$x = 2$$. Both graphs have arms of gradient $$\\pm 1$$, so one pair is parallel and there is only one crossing. C reads the numbers straight out of the brackets without solving.',
    },
    {
      id: 'q6_extraneous',
      type: 'mcq',
      title: '6. Squaring $$|x| = 3x - 8$$ produces $$x = 2$$ and $$x = 4$$. Which of these is an actual solution?',
      options: [
        { val: 'A', text: 'A. Both of them' },
        { val: 'B', text: 'B. $$x = 2$$ only' },
        { val: 'C', text: 'C. $$x = 4$$ only' },
        { val: 'D', text: 'D. Neither of them' },
      ],
      correct: 'C',
      expEn: 'Test each in the ORIGINAL equation. At $$x = 4$$: $$|4| = 4$$ and $$3(4) - 8 = 4$$, so it works. At $$x = 2$$: $$|2| = 2$$ but $$3(2) - 8 = -2$$, and a modulus is never negative. Squaring erased the requirement that the right-hand side be non-negative, so it handed back a value the equation rejects.',
    },
    {
      id: 'q7_less_than',
      type: 'mcq',
      title: '7. Solve $$|x - 3| < 7$$.',
      options: [
        { val: 'A', text: 'A. $$-4 < x < 10$$' },
        { val: 'B', text: 'B. $$x < -4$$ or $$x > 10$$' },
        { val: 'C', text: 'C. $$-10 < x < 4$$' },
        { val: 'D', text: 'D. $$-7 < x < 7$$' },
      ],
      correct: 'A',
      expEn: 'Write the chain $$-7 < x - 3 < 7$$, then add 3 to all three parts: $$-4 < x < 10$$. A "less than" always gives ONE interval, so B has the wrong shape before you look at its numbers. C subtracts the 3 instead of adding it, and D forgets to shift at all.',
    },
    {
      id: 'q8_more_than',
      type: 'mcq',
      title: '8. Solve $$|4 - x| \\geq 6$$.',
      options: [
        { val: 'A', text: 'A. $$-2 \\leq x \\leq 10$$' },
        { val: 'B', text: 'B. $$10 \\leq x \\leq -2$$' },
        { val: 'C', text: 'C. $$x \\leq 2$$ or $$x \\geq 10$$' },
        { val: 'D', text: 'D. $$x \\leq -2$$ or $$x \\geq 10$$' },
      ],
      correct: 'D',
      expEn: 'Split it: $$4 - x \\leq -6$$ gives $$-x \\leq -10$$, so $$x \\geq 10$$; and $$4 - x \\geq 6$$ gives $$-x \\geq 2$$, so $$x \\leq -2$$. Dividing by $$-1$$ reverses each sign. A has the wrong shape for a "greater than", and B writes two rays as an impossible chain — nothing is both at least 10 and at most $$-2$$.',
    },
    {
      id: 'q9_both_moduli',
      type: 'mcq',
      title: '9. Solve $$|5x| \\geq |x + 8|$$.',
      options: [
        { val: 'A', text: 'A. $$-\\frac{4}{3} \\leq x \\leq 2$$' },
        { val: 'B', text: 'B. $$x \\leq -\\frac{4}{3}$$ or $$x \\geq 2$$' },
        { val: 'C', text: 'C. $$x \\geq 2$$ only' },
        { val: 'D', text: 'D. $$x \\leq -2$$ or $$x \\geq \\frac{4}{3}$$' },
      ],
      correct: 'B',
      expEn: 'A modulus on each side, so square: $$25x^2 \\geq x^2 + 16x + 64$$, giving $$24x^2 - 16x - 64 \\geq 0$$. Divide by 8: $$3x^2 - 2x - 8 \\geq 0$$, which factorises as $$(3x + 4)(x - 2) \\geq 0$$. An upward parabola is at or above the axis OUTSIDE its roots, so the answer is the two outer pieces. A takes the inside instead, and C drops the negative branch.',
    },
    {
      id: 'q10_hidden_quadratic',
      type: 'mcq',
      title: '10. How many real solutions does $$x^2 - 5|x| + 6 = 0$$ have?',
      options: [
        { val: 'A', text: 'A. One' },
        { val: 'B', text: 'B. Two' },
        { val: 'C', text: 'C. Four' },
        { val: 'D', text: 'D. None' },
      ],
      correct: 'C',
      expEn: 'Because $$x^2 = |x|^2$$, putting $$u = |x|$$ gives $$u^2 - 5u + 6 = 0$$, so $$(u - 2)(u - 3) = 0$$ and $$u = 2$$ or $$u = 3$$. Each positive value of $$u$$ unfolds into TWO values of $$x$$: $$\\pm 2$$ and $$\\pm 3$$. B is the answer you give if you stop at the two values of $$u$$ and forget to put the bars back.',
    },
  ],
};
