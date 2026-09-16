// src/data/ADD_MATH/AM_5A/assessment.js
// The Quiz for AM_5A: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one
// nameable mistake (swapping the base and the power, reading a negative power
// as a negative number, adding the numbers inside, multiplying the number in
// front instead of raising to it, dividing two logs, forgetting that the
// inside must be positive). No item repeats a notes check or a workbook
// question, and the key is spread A/B/C/D so it cannot be guessed.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_forms',
      type: 'mcq',
      title: '1. Which statement says the same thing as $$\\log_6 216 = 3$$?',
      options: [
        { val: 'A', text: 'A. $$3^6 = 216$$' },
        { val: 'B', text: 'B. $$6^3 = 216$$' },
        { val: 'C', text: 'C. $$216^3 = 6$$' },
        { val: 'D', text: 'D. $$6^{216} = 3$$' },
      ],
      correct: 'B',
      expEn: 'The base is $$6$$ and, in log form, the power is the number on its own, $$3$$. So $$6^3 = 216$$. A swaps the base and the power; C and D put the number and the base in the wrong places.',
    },
    {
      id: 'q2_negative',
      type: 'mcq',
      title: '2. What is $$\\log_2 \\tfrac{1}{32}$$?',
      options: [
        { val: 'A', text: 'A. $$\\tfrac{1}{5}$$' },
        { val: 'B', text: 'B. $$5$$' },
        { val: 'C', text: 'C. $$-5$$' },
        { val: 'D', text: 'D. It does not exist' },
      ],
      correct: 'C',
      expEn: '$$\\tfrac{1}{32} = \\tfrac{1}{2^5} = 2^{-5}$$, so the log is $$-5$$. A fraction less than 1 needs a NEGATIVE power. A turns the fraction into the answer; B drops the sign; D confuses a small positive number with a negative one — the log of $$\\tfrac{1}{32}$$ exists.',
    },
    {
      id: 'q3_fraction',
      type: 'mcq',
      title: '3. What is $$\\log_{27} 3$$?',
      options: [
        { val: 'A', text: 'A. $$\\tfrac{1}{3}$$' },
        { val: 'B', text: 'B. $$3$$' },
        { val: 'C', text: 'C. $$9$$' },
        { val: 'D', text: 'D. $$-3$$' },
      ],
      correct: 'A',
      expEn: '$$3 = \\sqrt[3]{27} = 27^{1/3}$$, so $$\\log_{27} 3 = \\tfrac{1}{3}$$. B is $$\\log_3 27$$ — the base and the number swapped. C divides $$27 \\div 3$$. D makes the power negative, which would give $$\\tfrac{1}{19683}$$.',
    },
    {
      id: 'q4_domain',
      type: 'mcq',
      title: '4. For which values of x is $$\\log_2(5 - x)$$ defined?',
      options: [
        { val: 'A', text: 'A. $$x > 5$$' },
        { val: 'B', text: 'B. $$x < 5$$' },
        { val: 'C', text: 'C. $$x > -5$$' },
        { val: 'D', text: 'D. $$x \\leq 5$$' },
      ],
      correct: 'B',
      expEn: 'The inside must be positive: $$5 - x > 0$$, so $$x < 5$$. A forgets to flip the sign when dividing by $$-1$$; C solves $$x + 5 > 0$$ instead; D lets in $$x = 5$$, where the inside is $$0$$ and the log does not exist.',
    },
    {
      id: 'q5_graph',
      type: 'mcq',
      title: '5. Which statement about the graph of $$y = \\log_a x$$ (with $$a > 1$$) is true?',
      options: [
        { val: 'A', text: 'A. Its range is $$y > 0$$' },
        { val: 'B', text: 'B. It passes through $$(0, 1)$$' },
        { val: 'C', text: 'C. It has an asymptote at $$y = 0$$' },
        { val: 'D', text: 'D. Its domain is $$x > 0$$, and it passes through $$(1, 0)$$' },
      ],
      correct: 'D',
      expEn: 'Only positive numbers have a log, so the domain is $$x > 0$$, and $$\\log_a 1 = 0$$ puts $$(1, 0)$$ on every log graph. A, B and C are true of the EXPONENTIAL graph $$y = a^x$$ — the log graph is its reflection in $$y = x$$, which swaps them.',
    },
    {
      id: 'q6_product',
      type: 'mcq',
      title: '6. Simplify $$\\lg 25 + \\lg 40$$.',
      options: [
        { val: 'A', text: 'A. $$\\lg 65$$' },
        { val: 'B', text: 'B. $$1000$$' },
        { val: 'C', text: 'C. $$3$$' },
        { val: 'D', text: 'D. $$\\lg 15$$' },
      ],
      correct: 'C',
      expEn: 'Adding logs multiplies the numbers inside: $$\\lg(25 \\times 40) = \\lg 1000$$, and $$1000 = 10^3$$, so the answer is $$3$$. A adds the numbers inside; B stops at the number and forgets the log; D subtracts.',
    },
    {
      id: 'q7_power',
      type: 'mcq',
      title: '7. Simplify $$3\\log_2 4 - \\log_2 8$$.',
      options: [
        { val: 'A', text: 'A. $$3$$' },
        { val: 'B', text: 'B. $$\\log_2 4$$' },
        { val: 'C', text: 'C. $$\\log_2 56$$' },
        { val: 'D', text: 'D. $$\\log_2 \\tfrac{3}{2}$$' },
      ],
      correct: 'A',
      expEn: 'Power inside first: $$3\\log_2 4 = \\log_2 4^3 = \\log_2 64$$. Then $$\\log_2 \\tfrac{64}{8} = \\log_2 8 = 3$$. B multiplies $$3 \\times 4 = 12$$ and subtracts $$8$$; C subtracts $$64 - 8$$; D multiplies $$3 \\times 4$$ and divides by $$8$$.',
    },
    {
      id: 'q8_number',
      type: 'mcq',
      title: '8. Write $$2 + \\log_3 2$$ as a single logarithm.',
      options: [
        { val: 'A', text: 'A. $$\\log_3 4$$' },
        { val: 'B', text: 'B. $$\\log_3 8$$' },
        { val: 'C', text: 'C. $$\\log_3 6$$' },
        { val: 'D', text: 'D. $$\\log_3 18$$' },
      ],
      correct: 'D',
      expEn: 'The $$2$$ must become a log of base $$3$$: $$2 = \\log_3 3^2 = \\log_3 9$$. Then $$\\log_3 9 + \\log_3 2 = \\log_3 18$$. A adds $$2 + 2$$ inside; B raises the $$2$$ inside to the power $$3$$ — the base and the power swapped; C multiplies the $$2$$ by the base instead of raising the base to the power $$2$$.',
    },
    {
      id: 'q9_false_law',
      type: 'mcq',
      title: '9. Which of these is TRUE for all positive x and y?',
      options: [
        { val: 'A', text: 'A. $$\\lg(x + y) = \\lg x + \\lg y$$' },
        { val: 'B', text: 'B. $$\\lg \\tfrac{1}{x} = -\\lg x$$' },
        { val: 'C', text: 'C. $$\\lg x^2 = (\\lg x)^2$$' },
        { val: 'D', text: 'D. $$\\lg \\tfrac{x}{y} = \\tfrac{\\lg x}{\\lg y}$$' },
      ],
      correct: 'B',
      expEn: '$$\\tfrac{1}{x} = x^{-1}$$, so the power law gives $$\\lg \\tfrac{1}{x} = -\\lg x$$. A adds inside the log; C squares the log instead of bringing the power down ($$\\lg x^2 = 2\\lg x$$); D divides two logs, where the real law subtracts them.',
    },
    {
      id: 'q10_in_terms',
      type: 'mcq',
      title: '10. Given $$\\log_a 2 = p$$ and $$\\log_a 5 = q$$, what is $$\\log_a 40$$?',
      options: [
        { val: 'A', text: 'A. $$p + 3q$$' },
        { val: 'B', text: 'B. $$3pq$$' },
        { val: 'C', text: 'C. $$3p + q$$' },
        { val: 'D', text: 'D. $$8p + q$$' },
      ],
      correct: 'C',
      expEn: '$$40 = 2^3 \\times 5$$, so $$\\log_a 40 = 3\\log_a 2 + \\log_a 5 = 3p + q$$. A puts the cube on the $$5$$; B multiplies the logs instead of adding them; D uses $$8$$ as a multiplier instead of writing $$8 = 2^3$$ and bringing the $$3$$ down.',
    },
  ],
};
