// src/data/ADD_MATH/AM_5D/assessment.js
// The Quiz for AM_5D: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one
// nameable mistake (forgetting that e⁰ = 1, giving the x-intercept for the
// asymptote, forgetting to divide by the number in the power, not flipping an
// inequality, taking one of two negatives into account, undoing things in the
// wrong order, reading the domain of f as the domain of its inverse). No item
// repeats a notes check, a Practice question or an Exp Graph Lab item, and the
// key is spread A/B/C/D so it cannot be guessed.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_family',
      type: 'mcq',
      title: '1. The curve $$y = e^{x} + k$$ has the asymptote $$y = -4$$. Where does it cross the y-axis?',
      options: [
        { val: 'A', text: 'A. $$(0, -4)$$' },
        { val: 'B', text: 'B. $$(0, -3)$$' },
        { val: 'C', text: 'C. $$(0, -5)$$' },
        { val: 'D', text: 'D. $$(0, 1)$$' },
      ],
      correct: 'B',
      expEn: 'The asymptote of $$y = e^{x} + k$$ is $$y = k$$, so $$k = -4$$. At $$x = 0$$, $$y = e^{0} - 4 = 1 - 4 = -3$$. A is the asymptote itself, as if $$e^{0}$$ were $$0$$; C subtracts the $$1$$ instead of adding it; D is where $$y = e^{x}$$ crosses, before the curve was moved.',
    },
    {
      id: 'q2_ln_asym',
      type: 'mcq',
      title: '2. What is the equation of the asymptote of $$y = \\ln(2x - 10)$$?',
      options: [
        { val: 'A', text: 'A. $$x = 10$$' },
        { val: 'B', text: 'B. $$x = 5.5$$' },
        { val: 'C', text: 'C. $$x = 5$$' },
        { val: 'D', text: 'D. $$x = -5$$' },
      ],
      correct: 'C',
      expEn: 'The asymptote is where the inside of the log is $$0$$: $$2x - 10 = 0$$, so $$x = 5$$. A forgets to divide by $$2$$; B is where the inside is $$1$$, the x-intercept; D has the sign wrong.',
    },
    {
      id: 'q3_exp_xint',
      type: 'mcq',
      title: '3. Where does the curve $$y = 2e^{3x} - 8$$ cross the x-axis?',
      options: [
        { val: 'A', text: 'A. $$x = \\ln 4$$' },
        { val: 'B', text: 'B. $$x = 3\\ln 4$$' },
        { val: 'C', text: 'C. It does not cross the x-axis' },
        { val: 'D', text: 'D. $$x = \\tfrac{1}{3}\\ln 4$$' },
      ],
      correct: 'D',
      expEn: '$$2e^{3x} = 8$$, so $$e^{3x} = 4$$ and $$3x = \\ln 4$$, giving $$x = \\tfrac{1}{3}\\ln 4 \\approx 0.462$$. A forgets that ln gives the whole power $$3x$$; B multiplies by $$3$$ instead of dividing; C would need $$e^{3x}$$ to be negative, but it equals $$4$$.',
    },
    {
      id: 'q4_never',
      type: 'mcq',
      title: '4. Which one of these curves never meets the x-axis?',
      options: [
        { val: 'A', text: 'A. $$y = 3e^{x} - 1$$' },
        { val: 'B', text: 'B. $$y = -2e^{x} + 5$$' },
        { val: 'C', text: 'C. $$y = 4e^{-x} + 1$$' },
        { val: 'D', text: 'D. $$y = e^{2x} - 6$$' },
      ],
      correct: 'C',
      expEn: 'Put $$y = 0$$ in each. C gives $$e^{-x} = -\\tfrac{1}{4}$$, and a power of e is never negative, so there is no solution: the curve stays above its asymptote $$y = 1$$. A gives $$e^{x} = \\tfrac{1}{3}$$, B gives $$e^{x} = \\tfrac{5}{2}$$ (it starts above the axis but falls through it), and D gives $$e^{2x} = 6$$: all three cross.',
    },
    {
      id: 'q5_ln_left',
      type: 'mcq',
      title: '5. For which values of x does $$y = \\ln(12 - 4x)$$ exist?',
      options: [
        { val: 'A', text: 'A. $$x > 3$$' },
        { val: 'B', text: 'B. $$x < 12$$' },
        { val: 'C', text: 'C. $$x > -3$$' },
        { val: 'D', text: 'D. $$x < 3$$' },
      ],
      correct: 'D',
      expEn: 'The inside must be positive: $$12 - 4x > 0$$, so $$12 > 4x$$ and $$x < 3$$. The curve lives to the LEFT of its asymptote $$x = 3$$. A has the inequality the wrong way round; B forgets to divide by $$4$$; C has the wrong sign.',
    },
    {
      id: 'q6_shape',
      type: 'mcq',
      title: '6. Which describes the curve $$y = -3e^{-2x} + 4$$?',
      options: [
        { val: 'A', text: 'A. Below the line $$y = 4$$, and falling from left to right' },
        { val: 'B', text: 'B. Below the line $$y = 4$$, and rising from left to right' },
        { val: 'C', text: 'C. Above the line $$y = 4$$, and rising from left to right' },
        { val: 'D', text: 'D. Above the line $$y = 4$$, and falling from left to right' },
      ],
      correct: 'B',
      expEn: 'The $$-3$$ in front makes the e term negative, so the curve is below its asymptote $$y = 4$$. The power $$-2x$$ makes the e term shrink as x grows, and the $$-3$$ turns that shrinking into a rise. Two negatives: it rises. A takes only the number in front into account; C only the power; D ignores both.',
    },
    {
      id: 'q7_ln_yint',
      type: 'mcq',
      title: '7. Where does the curve $$y = 5\\ln(x + 2)$$ cross the y-axis?',
      options: [
        { val: 'A', text: 'A. $$(0, 5\\ln 2)$$' },
        { val: 'B', text: 'B. $$(0, \\ln 10)$$' },
        { val: 'C', text: 'C. $$(0, \\ln 2)$$' },
        { val: 'D', text: 'D. $$(0, -1)$$' },
      ],
      correct: 'A',
      expEn: 'Put $$x = 0$$: $$y = 5\\ln 2 \\approx 3.47$$. B puts the $$5$$ inside the log, but $$5\\ln 2 = \\ln 32$$, not $$\\ln 10$$; C loses the $$5$$ in front; D gives the x-value where the curve crosses the x-axis, not a height.',
    },
    {
      id: 'q8_inverse_exp',
      type: 'mcq',
      title: '8. What is the inverse of $$f(x) = 2e^{x} + 6$$?',
      options: [
        { val: 'A', text: 'A. $$f^{-1}(x) = \\ln\\left(\\dfrac{x - 6}{2}\\right)$$' },
        { val: 'B', text: 'B. $$f^{-1}(x) = \\ln\\left(\\dfrac{x}{2}\\right) - 6$$' },
        { val: 'C', text: 'C. $$f^{-1}(x) = \\tfrac{1}{2}\\ln(x - 6)$$' },
        { val: 'D', text: 'D. $$f^{-1}(x) = \\ln\\left(\\dfrac{x + 6}{2}\\right)$$' },
      ],
      correct: 'A',
      expEn: 'Swap: $$x = 2e^{y} + 6$$. Subtract $$6$$, divide by $$2$$, then take ln: $$y = \\ln\\left(\\dfrac{x - 6}{2}\\right)$$. B undoes the steps in the wrong order, dividing before the $$6$$ is cleared and taking it off at the end; C divides by $$2$$ after taking ln, as if the $$2$$ were in the power; D adds the $$6$$ instead of subtracting it.',
    },
    {
      id: 'q9_inverse_domain',
      type: 'mcq',
      title: '9. The function f is defined by $$f(x) = 7 - e^{2x}$$ for all real x. What is the domain of its inverse?',
      options: [
        { val: 'A', text: 'A. $$x > 7$$' },
        { val: 'B', text: 'B. $$x < 6$$' },
        { val: 'C', text: 'C. Every real x' },
        { val: 'D', text: 'D. $$x < 7$$' },
      ],
      correct: 'D',
      expEn: '$$e^{2x}$$ is always positive and it is subtracted from $$7$$, so $$f(x) < 7$$. That range is the domain of the inverse: $$x < 7$$. A turns the inequality the wrong way; B uses $$f(0) = 6$$, one value of f, instead of the whole range; C is the domain of f itself.',
    },
    {
      id: 'q10_inverse_ln',
      type: 'mcq',
      title: '10. What is the inverse of $$g(x) = 4\\ln(x - 1)$$, for $$x > 1$$?',
      options: [
        { val: 'A', text: 'A. $$g^{-1}(x) = e^{\\frac{x}{4}} + 1$$' },
        { val: 'B', text: 'B. $$g^{-1}(x) = e^{4x} + 1$$' },
        { val: 'C', text: 'C. $$g^{-1}(x) = e^{\\frac{x}{4}} - 1$$' },
        { val: 'D', text: 'D. $$g^{-1}(x) = 4e^{x} + 1$$' },
      ],
      correct: 'A',
      expEn: 'Swap: $$x = 4\\ln(y - 1)$$. Divide by $$4$$: $$\\dfrac{x}{4} = \\ln(y - 1)$$. Powers of e: $$e^{\\frac{x}{4}} = y - 1$$, so $$y = e^{\\frac{x}{4}} + 1$$. B multiplies by $$4$$ instead of dividing; C subtracts the $$1$$ instead of adding it; D writes powers of e before getting the ln on its own.',
    },
  ],
};
