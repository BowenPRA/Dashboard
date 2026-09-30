// src/data/ADD_MATH/AM_5B/assessment.js
// The Quiz for AM_5B: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one
// nameable mistake (dividing two logs as if it were a log law, dropping the
// bracket when the power comes down, taking ln where e to the power is
// needed, reading a shifted power without its number, keeping a value of y a
// power can never take, using lg where the base is e). No item repeats a notes
// example or check, a workbook question or a task item, and the key is spread
// A/B/C/D so it cannot be guessed.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_take_logs',
      type: 'mcq',
      title: '1. Solve $$5^x = 12$$, giving $$x$$ to 3 significant figures.',
      options: [
        { val: 'A', text: 'A. $$x = 0.380$$' },
        { val: 'B', text: 'B. $$x = 2.4$$' },
        { val: 'C', text: 'C. $$x = 1.54$$' },
        { val: 'D', text: 'D. $$x = 0.648$$' },
      ],
      correct: 'C',
      expEn: 'Take logs: $$x \\lg 5 = \\lg 12$$, so $$x = \\dfrac{\\lg 12}{\\lg 5} = 1.54$$. A works out $$\\lg \\dfrac{12}{5}$$, but dividing two logs is not a log law; B is $$12 \\div 5$$ with no logs at all; D divides the wrong way round.',
    },
    {
      id: 'q2_bracket',
      type: 'mcq',
      title: '2. Taking lg of both sides of $$3^{2x - 1} = 7$$ gives which line?',
      options: [
        { val: 'A', text: 'A. $$(2x - 1)\\lg 3 = \\lg 7$$' },
        { val: 'B', text: 'B. $$2x - 1\\lg 3 = \\lg 7$$' },
        { val: 'C', text: 'C. $$2x - 1 = \\lg 7 - \\lg 3$$' },
        { val: 'D', text: 'D. $$(2x - 1) \\times 3 = 7$$' },
      ],
      correct: 'A',
      expEn: 'The whole power $$2x - 1$$ comes down in front of $$\\lg 3$$, in a bracket. B multiplies only the $$1$$ by $$\\lg 3$$; C subtracts $$\\lg 3$$, which is really multiplying; D loses the logs.',
    },
    {
      id: 'q3_in_terms_of_ln',
      type: 'mcq',
      title: '3. Solve $$e^{x - 2} = 15$$, giving $$x$$ in terms of $$\\ln$$.',
      options: [
        { val: 'A', text: 'A. $$x = \\ln 15 - 2$$' },
        { val: 'B', text: 'B. $$x = \\ln 13$$' },
        { val: 'C', text: 'C. $$x = 2\\ln 15$$' },
        { val: 'D', text: 'D. $$x = 2 + \\ln 15$$' },
      ],
      correct: 'D',
      expEn: 'Take ln: $$x - 2 = \\ln 15$$, so $$x = 2 + \\ln 15$$. A keeps the sign of the $$2$$ when it crosses; B moves the $$2$$ inside the log; C multiplies by $$2$$ instead of adding it.',
    },
    {
      id: 'q4_undo_ln',
      type: 'mcq',
      title: '4. Solve $$\\ln(3x + 1) = 2$$, giving $$x$$ to 3 significant figures.',
      options: [
        { val: 'A', text: 'A. $$x = -0.102$$' },
        { val: 'B', text: 'B. $$x = 2.13$$' },
        { val: 'C', text: 'C. $$x = 2.80$$' },
        { val: 'D', text: 'D. $$x = 1.46$$' },
      ],
      correct: 'B',
      expEn: 'Raise $$e$$ to each side: $$3x + 1 = e^2 = 7.389$$, so $$x = \\dfrac{e^2 - 1}{3} = 2.13$$. A takes ln again, $$\\dfrac{\\ln 2 - 1}{3}$$; C adds the $$1$$ instead of subtracting it; D divides before subtracting, $$\\dfrac{e^2}{3} - 1$$.',
    },
    {
      id: 'q5_exact_power',
      type: 'mcq',
      title: '5. Find the exact value of $$e^{3\\ln 2}$$.',
      options: [
        { val: 'A', text: 'A. $$8$$' },
        { val: 'B', text: 'B. $$6$$' },
        { val: 'C', text: 'C. $$9$$' },
        { val: 'D', text: 'D. $$e^6$$' },
      ],
      correct: 'A',
      expEn: '$$3\\ln 2 = \\ln 2^3 = \\ln 8$$, and $$e^{\\ln 8} = 8$$. B multiplies $$3 \\times 2$$ instead of raising $$2$$ to the power $$3$$; C raises $$3$$ to the power $$2$$; D multiplies the numbers in the power and forgets the ln.',
    },
    {
      id: 'q6_ln_root',
      type: 'mcq',
      title: '6. Find the exact value of $$\\ln \\dfrac{1}{\\sqrt{e}}$$.',
      options: [
        { val: 'A', text: 'A. $$\\dfrac{1}{2}$$' },
        { val: 'B', text: 'B. $$-2$$' },
        { val: 'C', text: 'C. $$-\\dfrac{1}{2}$$' },
        { val: 'D', text: 'D. $$2$$' },
      ],
      correct: 'C',
      expEn: '$$\\dfrac{1}{\\sqrt{e}} = e^{-\\frac{1}{2}}$$, and $$\\ln e^{-\\frac{1}{2}} = -\\dfrac{1}{2}$$. A loses the minus sign that "one over" brings; B and D read the square root as the power $$2$$ instead of $$\\dfrac{1}{2}$$.',
    },
    {
      id: 'q7_substitute',
      type: 'mcq',
      title: '7. With $$y = 3^x$$, the equation $$9^x - 2\\left(3^{x + 1}\\right) - 27 = 0$$ becomes which quadratic?',
      options: [
        { val: 'A', text: 'A. $$y^2 - 2y - 27 = 0$$' },
        { val: 'B', text: 'B. $$3y - 6y - 27 = 0$$' },
        { val: 'C', text: 'C. $$y^2 - 6y + 27 = 0$$' },
        { val: 'D', text: 'D. $$y^2 - 6y - 27 = 0$$' },
      ],
      correct: 'D',
      expEn: '$$9^x = \\left(3^x\\right)^2 = y^2$$ and $$3^{x + 1} = 3 \\times 3^x = 3y$$, so $$2\\left(3^{x + 1}\\right) = 6y$$. A forgets the $$3$$ that the shifted power brings; B reads $$9^x$$ as $$3y$$; C changes the sign of the constant.',
    },
    {
      id: 'q8_reject',
      type: 'mcq',
      title: '8. Solve $$2^{2x} + 2^x - 6 = 0$$.',
      options: [
        { val: 'A', text: 'A. $$x = 1$$ or $$x = -3$$' },
        { val: 'B', text: 'B. $$x = 1$$ only' },
        { val: 'C', text: 'C. There are no solutions' },
        { val: 'D', text: 'D. $$x = 2$$ only' },
      ],
      correct: 'B',
      expEn: 'With $$y = 2^x$$: $$(y + 3)(y - 2) = 0$$. $$2^x = -3$$ is rejected, because a power of $$2$$ is never negative; $$2^x = 2$$ gives $$x = 1$$. A turns the rejected value of $$y$$ into an $$x$$; C rejects both values; D stops at the value of $$y$$.',
    },
    {
      id: 'q9_decay_time',
      type: 'mcq',
      title: '9. The mass of a sample after $$t$$ days is $$N = 300e^{-0.02t}$$ grams. How many days does it take to fall to $$120$$ grams?',
      options: [
        { val: 'A', text: 'A. $$45.8$$' },
        { val: 'B', text: 'B. $$-45.8$$' },
        { val: 'C', text: 'C. $$20$$' },
        { val: 'D', text: 'D. $$19.9$$' },
      ],
      correct: 'A',
      expEn: '$$e^{-0.02t} = \\dfrac{120}{300} = 0.4$$, so $$-0.02t = \\ln 0.4$$ and $$t = \\dfrac{\\ln 0.4}{-0.02} = 45.8$$. B loses the minus sign in the power; C divides $$0.4$$ by $$0.02$$ with no log; D uses $$\\lg$$, but the base here is $$e$$.',
    },
    {
      id: 'q10_doubling',
      type: 'mcq',
      title: '10. A population grows as $$P = 5000e^{0.04t}$$, where $$t$$ is in years. How long does it take to double?',
      options: [
        { val: 'A', text: 'A. $$50$$ years' },
        { val: 'B', text: 'B. $$7.53$$ years' },
        { val: 'C', text: 'C. $$17.3$$ years' },
        { val: 'D', text: 'D. $$0.0577$$ years' },
      ],
      correct: 'C',
      expEn: 'Doubling means $$e^{0.04t} = 2$$, so $$0.04t = \\ln 2$$ and $$t = \\dfrac{\\ln 2}{0.04} = 17.3$$ years. A divides $$2$$ by $$0.04$$ with no log; B uses $$\\lg 2$$ instead of $$\\ln 2$$; D divides the wrong way round.',
    },
  ],
};
