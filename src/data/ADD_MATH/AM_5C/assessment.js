// src/data/ADD_MATH/AM_5C/assessment.js
// The Quiz for AM_5C: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one
// nameable mistake (adding the insides, dropping the log, multiplying the base
// by the power, keeping a root that puts a negative inside a log, rejecting a
// negative x whose inside is positive, keeping a negative base, stopping at u,
// dividing by the log, dividing upside down). No item repeats a notes check, a
// Practice question or a task item, and the key is spread A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_both_sides',
      type: 'mcq',
      title: '1. Solve $$\\log_5 x + \\log_5 6 = \\log_5 54$$.',
      options: [
        { val: 'A', text: 'A. $$x = 48$$' },
        { val: 'B', text: 'B. $$x = 9$$' },
        { val: 'C', text: 'C. $$x = 324$$' },
        { val: 'D', text: 'D. $$x = \\log_5 9$$' },
      ],
      correct: 'B',
      expEn: 'Adding logs multiplies the insides: $$\\log_5 6x = \\log_5 54$$, so $$6x = 54$$ and $$x = 9$$, which is positive. A adds the insides; C multiplies by $$6$$ instead of dividing; D stops at a log: $$x$$ is the number inside, not a log of it.',
    },
    {
      id: 'q2_exp_form',
      type: 'mcq',
      title: '2. Solve $$\\log_5(2x + 1) = 2$$.',
      options: [
        { val: 'A', text: 'A. $$x = \\frac{1}{2}$$' },
        { val: 'B', text: 'B. $$x = \\frac{9}{2}$$' },
        { val: 'C', text: 'C. $$x = 12$$' },
        { val: 'D', text: 'D. $$x = \\frac{31}{2}$$' },
      ],
      correct: 'C',
      expEn: 'Exponential form: $$2x + 1 = 5^2 = 25$$, so $$x = 12$$. A drops the log ($$2x + 1 = 2$$); B multiplies the base by the power ($$2x + 1 = 10$$); D swaps them ($$2^5 = 32$$).',
    },
    {
      id: 'q3_reject_one',
      type: 'mcq',
      title: '3. The algebra for $$\\log_3 x + \\log_3(x + 8) = 2$$ gives $$x = 1$$ or $$x = -9$$. What is the solution?',
      options: [
        { val: 'A', text: 'A. $$x = 1$$ only' },
        { val: 'B', text: 'B. $$x = 1$$ or $$x = -9$$' },
        { val: 'C', text: 'C. $$x = -9$$ only' },
        { val: 'D', text: 'D. There is no solution' },
      ],
      correct: 'A',
      expEn: 'At $$x = -9$$ the first inside is $$-9$$, so $$\\log_3(-9)$$ does not exist: reject it. At $$x = 1$$ the insides are $$1$$ and $$9$$, and $$0 + 2 = 2$$. B skips the check; C keeps the wrong root; D rejects a root that works.',
    },
    {
      id: 'q4_negative_kept',
      type: 'mcq',
      title: '4. Solve $$\\log_2(x + 12) = 3$$.',
      options: [
        { val: 'A', text: 'A. There is no solution, because the root is negative' },
        { val: 'B', text: 'B. $$x = 4$$' },
        { val: 'C', text: 'C. $$x = -9$$' },
        { val: 'D', text: 'D. $$x = -4$$' },
      ],
      correct: 'D',
      expEn: '$$x + 12 = 2^3 = 8$$, so $$x = -4$$. The inside at $$x = -4$$ is $$8$$, which is positive, so the root is kept. A tests the sign of $$x$$ instead of the inside; B has the sign wrong; C drops the log ($$x + 12 = 3$$).',
    },
    {
      id: 'q5_unknown_base',
      type: 'mcq',
      title: '5. Solve $$\\log_x 81 = 4$$.',
      options: [
        { val: 'A', text: 'A. $$x = 3$$ or $$x = -3$$' },
        { val: 'B', text: 'B. $$x = 3$$' },
        { val: 'C', text: 'C. $$x = \\frac{81}{4}$$' },
        { val: 'D', text: 'D. $$x = 9$$' },
      ],
      correct: 'B',
      expEn: '$$x^4 = 81$$ gives $$x = 3$$ or $$x = -3$$, and a base cannot be negative, so $$x = 3$$. A keeps the negative base; C divides by the power; D takes a square root where the power is $$4$$.',
    },
    {
      id: 'q6_no_solution',
      type: 'mcq',
      title: '6. What is the solution of $$\\lg(x - 8) = \\lg(2 - x)$$?',
      options: [
        { val: 'A', text: 'A. $$x = 5$$' },
        { val: 'B', text: 'B. $$x = -5$$' },
        { val: 'C', text: 'C. There is no solution' },
        { val: 'D', text: 'D. $$x = 5$$ or $$x = 3$$' },
      ],
      correct: 'C',
      expEn: 'The insides are equal: $$x - 8 = 2 - x$$, so $$x = 5$$. But at $$x = 5$$ both insides are $$-3$$, and a log of a negative number does not exist. The only root is rejected. A forgets to check; B is a slip in the algebra; D invents a second root.',
    },
    {
      id: 'q7_quadratic_log',
      type: 'mcq',
      title: '7. Solve $$(\\log_2 x)^2 - 7\\log_2 x + 12 = 0$$.',
      options: [
        { val: 'A', text: 'A. $$x = 3$$ or $$x = 4$$' },
        { val: 'B', text: 'B. $$x = 6$$ or $$x = 8$$' },
        { val: 'C', text: 'C. $$x = 9$$ or $$x = 16$$' },
        { val: 'D', text: 'D. $$x = 8$$ or $$x = 16$$' },
      ],
      correct: 'D',
      expEn: 'With $$u = \\log_2 x$$: $$u^2 - 7u + 12 = 0$$, so $$u = 3$$ or $$u = 4$$, and $$x = 2^3 = 8$$ or $$x = 2^4 = 16$$. A stops at $$u$$; B multiplies $$2$$ by $$u$$; C squares $$u$$ instead of raising $$2$$ to the power $$u$$.',
    },
    {
      id: 'q8_lost_root',
      type: 'mcq',
      title: '8. Solve $$(\\log_5 x)^2 = 2\\log_5 x$$.',
      options: [
        { val: 'A', text: 'A. $$x = 1$$ or $$x = 25$$' },
        { val: 'B', text: 'B. $$x = 25$$ only' },
        { val: 'C', text: 'C. $$x = 0$$ or $$x = 25$$' },
        { val: 'D', text: 'D. $$x = 1$$ or $$x = 2$$' },
      ],
      correct: 'A',
      expEn: '$$u^2 - 2u = 0$$ gives $$u(u - 2) = 0$$: $$u = 0$$ or $$u = 2$$, so $$x = 5^0 = 1$$ or $$x = 5^2 = 25$$. B divides both sides by the log and loses $$u = 0$$; C turns $$u = 0$$ into $$x = 0$$; D stops at $$u = 2$$ instead of going back to $$x$$.',
    },
    {
      id: 'q9_evaluate',
      type: 'mcq',
      title: '9. What is $$\\log_7 50$$, correct to 3 significant figures?',
      options: [
        { val: 'A', text: 'A. $$0.497$$' },
        { val: 'B', text: 'B. $$2.01$$' },
        { val: 'C', text: 'C. $$0.854$$' },
        { val: 'D', text: 'D. $$7.14$$' },
      ],
      correct: 'B',
      expEn: '$$\\lg 50 \\div \\lg 7 = 1.699 \\div 0.8451 = 2.010\\ldots$$, and $$7^2 = 49$$ is just under $$50$$, so a little over $$2$$ is right. A divides upside down; C is $$\\lg(50 \\div 7)$$, one log of a quotient; D divides the numbers themselves.',
    },
    {
      id: 'q10_in_terms_of_u',
      type: 'mcq',
      title: '10. Given that $$u = \\log_3 x$$, which of these is $$\\log_9 x + \\log_x 9$$?',
      options: [
        { val: 'A', text: 'A. $$2u + \\frac{2}{u}$$' },
        { val: 'B', text: 'B. $$\\frac{u}{2} + \\frac{u}{2}$$' },
        { val: 'C', text: 'C. $$2u + \\frac{u}{2}$$' },
        { val: 'D', text: 'D. $$\\frac{u}{2} + \\frac{2}{u}$$' },
      ],
      correct: 'D',
      expEn: '$$\\log_9 x = \\frac{\\log_3 x}{\\log_3 9} = \\frac{u}{2}$$, and $$\\log_x 9 = \\frac{\\log_3 9}{\\log_3 x} = \\frac{2}{u}$$. A multiplies by $$\\log_3 9$$ instead of dividing; B does not turn the second log over; C does both wrong.',
    },
  ],
};
