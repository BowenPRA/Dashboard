// src/data/ADD_MATH/AM_3A/assessment.js
// The Quiz for AM_3A: 10 multiple-choice items, one sitting, 12 minutes. Shares
// Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one nameable
// mistake (reading the degree off the first term, forgetting the sign of c,
// multiplying the degrees instead of adding them, stopping a factorisation one
// step early). No item simply repeats a notes check or a workbook question, and
// the key is spread A/B/C/D so it cannot be guessed.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_degree',
      type: 'mcq',
      title: '1. What is the degree of $$5 - 2x + 7x^4$$?',
      options: [
        { val: 'A', text: 'A. 0' },
        { val: 'B', text: 'B. 1' },
        { val: 'C', text: 'C. 4' },
        { val: 'D', text: 'D. 7' },
      ],
      correct: 'C',
      expEn: 'The degree is the HIGHEST power of $$x$$, wherever it appears in the expression — here $$x^4$$, so the degree is 4. A and B read the terms in the order they are printed; D gives the coefficient of that term instead of its power.',
    },
    {
      id: 'q2_not_poly',
      type: 'mcq',
      title: '2. Which of these is NOT a polynomial?',
      options: [
        { val: 'A', text: 'A. $$3x^2 + 4x^{-1}$$' },
        { val: 'B', text: 'B. $$\\tfrac{1}{2}x^3 - 6$$' },
        { val: 'C', text: 'C. $$-11$$' },
        { val: 'D', text: 'D. $$x^5$$' },
      ],
      correct: 'A',
      expEn: 'A polynomial may only have WHOLE-NUMBER powers, and $$x^{-1}$$ is not one. B is fine — a fractional coefficient is allowed even though a fractional power is not. C is a polynomial of degree 0.',
    },
    {
      id: 'q3_turning',
      type: 'mcq',
      title: '3. What is the greatest number of turning points the graph of a quintic can have?',
      options: [
        { val: 'A', text: 'A. 2' },
        { val: 'B', text: 'B. 3' },
        { val: 'C', text: 'C. 5' },
        { val: 'D', text: 'D. 4' },
      ],
      correct: 'D',
      expEn: 'A quintic has degree 5, so it has at most $$5 - 1 = 4$$ turning points. C is the number of ROOTS it can have, which is the commonest confusion between the two facts.',
    },
    {
      id: 'q4_missing',
      type: 'mcq',
      title: '4. Before dividing $$2x^3 - x + 51$$ by $$x + 3$$, how should the dividend be written?',
      options: [
        { val: 'A', text: 'A. $$2x^3 - x + 51$$, unchanged' },
        { val: 'B', text: 'B. $$2x^3 + 0x^2 - x + 51$$' },
        { val: 'C', text: 'C. $$2x^3 - x + 0 + 51$$' },
        { val: 'D', text: 'D. $$51 - x + 2x^3$$' },
      ],
      correct: 'B',
      expEn: 'The $$x^2$$ term is missing, so it is written in as $$0x^2$$ to keep four columns in the working. Without it the $$-x$$ slides into the $$x^2$$ column and every line after it is wrong.',
    },
    {
      id: 'q5_quotient',
      type: 'mcq',
      title: '5. $$x^3 - 5x^2 + 8x - 4$$ is divided by $$x - 2$$. What is the quotient?',
      options: [
        { val: 'A', text: 'A. $$x^2 - 3x + 2$$' },
        { val: 'B', text: 'B. $$x^2 - 7x + 22$$' },
        { val: 'C', text: 'C. $$x^2 - 5x + 8$$' },
        { val: 'D', text: 'D. $$x^2 + 3x + 2$$' },
      ],
      correct: 'A',
      expEn: 'The three passes give $$x^2$$, $$-3x$$ and $$+2$$, with remainder 0. Check by multiplying back: $$(x-2)(x^2-3x+2) = x^3-5x^2+8x-4$$. B comes from ADDING 2 instead of subtracting at each step; D loses the sign on the middle term.',
    },
    {
      id: 'q6_remainder',
      type: 'mcq',
      title: '6. It is given that $$x^3 + 4x^2 - 3x + 5 = (x+2)(x^2+2x-7) + 19$$. What is the remainder when $$x^3 + 4x^2 - 3x + 5$$ is divided by $$x + 2$$?',
      options: [
        { val: 'A', text: 'A. 0' },
        { val: 'B', text: 'B. $$x^2 + 2x - 7$$' },
        { val: 'C', text: 'C. 19' },
        { val: 'D', text: 'D. $$-2$$' },
      ],
      correct: 'C',
      expEn: 'The identity is dividend = divisor × quotient + remainder, so the number left on the end, 19, is the remainder. B is the QUOTIENT. Because the remainder is not 0, $$x+2$$ is not a factor.',
    },
    {
      id: 'q7_sign',
      type: 'mcq',
      title: '7. To test whether $$x + 3$$ is a factor of $$\\text{P}(x)$$, what do you work out?',
      options: [
        { val: 'A', text: 'A. $$\\text{P}(3)$$' },
        { val: 'B', text: 'B. $$\\text{P}(-3)$$' },
        { val: 'C', text: 'C. $$\\text{P}(0)$$' },
        { val: 'D', text: 'D. $$\\text{P}(\\tfrac{1}{3})$$' },
      ],
      correct: 'B',
      expEn: 'Set the bracket equal to zero: $$x + 3 = 0$$ gives $$x = -3$$. A substitutes the number as printed, which is the single most common error in this section.',
    },
    {
      id: 'q8_which_factor',
      type: 'mcq',
      title: '8. For $$\\text{P}(x) = x^3 - 2x^2 - 5x + 6$$, which of these is a factor?',
      options: [
        { val: 'A', text: 'A. $$x + 1$$' },
        { val: 'B', text: 'B. $$x - 6$$' },
        { val: 'C', text: 'C. $$x + 3$$' },
        { val: 'D', text: 'D. $$x - 1$$' },
      ],
      correct: 'D',
      expEn: '$$\\text{P}(1) = 1 - 2 - 5 + 6 = 0$$, so $$x - 1$$ is a factor. The others all fail: $$\\text{P}(-1) = 8$$, $$\\text{P}(6) = 120$$, $$\\text{P}(-3) = -24$$. Substituting 1 first is always worth doing — it is the fastest test there is.',
    },
    {
      id: 'q9_degree_product',
      type: 'mcq',
      title: '9. $$\\text{P}(x)$$ has degree 4 and $$\\text{Q}(x)$$ has degree 2. What is the degree of $$\\text{P}(x)\\text{Q}(x)$$?',
      options: [
        { val: 'A', text: 'A. 6' },
        { val: 'B', text: 'B. 8' },
        { val: 'C', text: 'C. 4' },
        { val: 'D', text: 'D. 2' },
      ],
      correct: 'A',
      expEn: 'Degrees ADD under multiplication: $$4 + 2 = 6$$. B multiplies them, and C gives the answer for P + Q rather than for the product.',
    },
    {
      id: 'q10_factorise',
      type: 'mcq',
      title: '10. Factorise $$x^3 - 7x + 6$$ completely.',
      options: [
        { val: 'A', text: 'A. $$(x-1)(x^2+x-6)$$' },
        { val: 'B', text: 'B. $$(x+1)(x-2)(x+3)$$' },
        { val: 'C', text: 'C. $$(x-1)(x-2)(x+3)$$' },
        { val: 'D', text: 'D. $$(x-1)(x-2)(x-3)$$' },
      ],
      correct: 'C',
      expEn: '$$\\text{P}(1) = 0$$, so $$x-1$$ is a factor; dividing gives $$x^2+x-6 = (x-2)(x+3)$$. A stops one step early and is therefore not "completely". D has the wrong sign on the last factor: its roots would multiply to $$-6$$, not $$+6$$.',
    },
  ],
};
