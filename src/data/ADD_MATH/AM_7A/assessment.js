// src/data/ADD_MATH/AM_7A/assessment.js
// The Quiz for AM_7A: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one
// nameable mistake (copying the signs out of the brackets, giving r² for r,
// squaring the diameter instead of the radius, forgetting to halve the
// coefficient, adding the square instead of subtracting it, not dividing
// through first). No item repeats a notes check, a workbook question or a
// Circle Lab item, and the key is spread A/B/C/D so it cannot be guessed.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_read',
      type: 'mcq',
      title: '1. What are the centre and radius of $$(x - 6)^2 + (y + 4)^2 = 49$$?',
      options: [
        { val: 'A', text: 'A. Centre $$(-6, 4)$$, radius $$7$$' },
        { val: 'B', text: 'B. Centre $$(6, -4)$$, radius $$49$$' },
        { val: 'C', text: 'C. Centre $$(6, -4)$$, radius $$7$$' },
        { val: 'D', text: 'D. Centre $$(-6, 4)$$, radius $$49$$' },
      ],
      correct: 'C',
      expEn: 'Each bracket is zero at the centre: $$x = 6$$ and $$y = -4$$. The right-hand side is $$r^2$$, so $$r = \\sqrt{49} = 7$$. A and D copy the signs straight out of the brackets; B and D give $$r^2$$ instead of $$r$$.',
    },
    {
      id: 'q2_surd',
      type: 'mcq',
      title: '2. What is the radius of $$x^2 + (y - 2)^2 = 45$$?',
      options: [
        { val: 'A', text: 'A. $$3\\sqrt{5}$$' },
        { val: 'B', text: 'B. $$5\\sqrt{3}$$' },
        { val: 'C', text: 'C. $$45$$' },
        { val: 'D', text: 'D. $$9\\sqrt{5}$$' },
      ],
      correct: 'A',
      expEn: '$$r = \\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt{5}$$. B swaps the two numbers; C gives $$r^2$$; D takes the $$9$$ out from under the root without taking its square root.',
    },
    {
      id: 'q3_write',
      type: 'mcq',
      title: '3. Which is the equation of the circle with centre $$(-3, 0)$$ and radius $$4$$?',
      options: [
        { val: 'A', text: 'A. $$(x - 3)^2 + y^2 = 16$$' },
        { val: 'B', text: 'B. $$(x + 3)^2 + y^2 = 4$$' },
        { val: 'C', text: 'C. $$x^2 + (y + 3)^2 = 16$$' },
        { val: 'D', text: 'D. $$(x + 3)^2 + y^2 = 16$$' },
      ],
      correct: 'D',
      expEn: 'A centre at $$x = -3$$ gives the bracket $$(x + 3)$$; a centre at $$y = 0$$ leaves $$y^2$$ with no bracket; and $$r^2 = 16$$. A has the sign the wrong way round; B forgets to square the radius; C puts the $$-3$$ in the wrong bracket.',
    },
    {
      id: 'q4_point',
      type: 'mcq',
      title: '4. A circle has centre $$(-1, 3)$$ and passes through $$(2, -1)$$. What is its equation?',
      options: [
        { val: 'A', text: 'A. $$(x + 1)^2 + (y - 3)^2 = 5$$' },
        { val: 'B', text: 'B. $$(x + 1)^2 + (y - 3)^2 = 25$$' },
        { val: 'C', text: 'C. $$(x - 2)^2 + (y + 1)^2 = 25$$' },
        { val: 'D', text: 'D. $$(x + 1)^2 + (y - 3)^2 = 7$$' },
      ],
      correct: 'B',
      expEn: 'The differences are $$3$$ and $$-4$$, so $$r^2 = 9 + 16 = 25$$, and the centre goes in the brackets. A puts $$r$$ on the right; C uses the point on the circle as the centre; D adds the differences instead of squaring them.',
    },
    {
      id: 'q5_diameter',
      type: 'mcq',
      title: '5. $$A(-5, 1)$$ and $$B(3, 7)$$ are the ends of a diameter. What is the equation of the circle?',
      options: [
        { val: 'A', text: 'A. $$(x + 1)^2 + (y - 4)^2 = 25$$' },
        { val: 'B', text: 'B. $$(x + 1)^2 + (y - 4)^2 = 100$$' },
        { val: 'C', text: 'C. $$(x - 1)^2 + (y + 4)^2 = 25$$' },
        { val: 'D', text: 'D. $$(x + 1)^2 + (y - 4)^2 = 5$$' },
      ],
      correct: 'A',
      expEn: 'The centre is the midpoint, $$(-1, 4)$$. From there to $$B$$ the differences are $$4$$ and $$3$$, so $$r^2 = 25$$. B squares the whole diameter; C has the signs the wrong way round; D puts $$r$$ on the right.',
    },
    {
      id: 'q6_square',
      type: 'mcq',
      title: '6. Which is the same as $$y^2 - 12y$$?',
      options: [
        { val: 'A', text: 'A. $$(y - 12)^2 - 144$$' },
        { val: 'B', text: 'B. $$(y - 6)^2 + 36$$' },
        { val: 'C', text: 'C. $$(y - 6)^2 - 36$$' },
        { val: 'D', text: 'D. $$(y + 6)^2 - 36$$' },
      ],
      correct: 'C',
      expEn: 'Half of $$-12$$ is $$-6$$, so the bracket is $$(y - 6)^2$$, and you take away $$6^2 = 36$$. A forgets to halve; B adds the square instead of subtracting it; D changes the sign of the half.',
    },
    {
      id: 'q7_general',
      type: 'mcq',
      title: '7. What are the centre and radius of $$x^2 + y^2 - 10x + 6y - 2 = 0$$?',
      options: [
        { val: 'A', text: 'A. Centre $$(-5, 3)$$, radius $$6$$' },
        { val: 'B', text: 'B. Centre $$(5, -3)$$, radius $$36$$' },
        { val: 'C', text: 'C. Centre $$(10, -6)$$, radius $$\\sqrt{2}$$' },
        { val: 'D', text: 'D. Centre $$(5, -3)$$, radius $$6$$' },
      ],
      correct: 'D',
      expEn: '$$(x - 5)^2 - 25 + (y + 3)^2 - 9 - 2 = 0$$, so $$(x - 5)^2 + (y + 3)^2 = 36$$: centre $$(5, -3)$$, radius $$6$$. A copies the signs out of the brackets; B gives $$r^2$$; C forgets to halve the coefficients and ignores the squares.',
    },
    {
      id: 'q8_divide',
      type: 'mcq',
      title: '8. What are the centre and radius of $$3x^2 + 3y^2 + 12x - 15 = 0$$?',
      options: [
        { val: 'A', text: 'A. Centre $$(-2, 0)$$, radius $$3$$' },
        { val: 'B', text: 'B. Centre $$(-6, 0)$$, radius $$\\sqrt{51}$$' },
        { val: 'C', text: 'C. Centre $$(-2, 0)$$, radius $$9$$' },
        { val: 'D', text: 'D. Centre $$(2, 0)$$, radius $$3$$' },
      ],
      correct: 'A',
      expEn: 'Divide by $$3$$ first: $$x^2 + y^2 + 4x - 5 = 0$$. Then $$(x + 2)^2 - 4 + y^2 - 5 = 0$$, so $$(x + 2)^2 + y^2 = 9$$: centre $$(-2, 0)$$, radius $$3$$. B completes the square without dividing; C gives $$r^2$$; D has the sign wrong.',
    },
    {
      id: 'q9_not_circle',
      type: 'mcq',
      title: '9. Which of these equations is NOT a circle?',
      options: [
        { val: 'A', text: 'A. $$x^2 + y^2 = 1$$' },
        { val: 'B', text: 'B. $$x^2 + y^2 - 4x + 8 = 0$$' },
        { val: 'C', text: 'C. $$2x^2 + 2y^2 = 7$$' },
        { val: 'D', text: 'D. $$x^2 + y^2 + 6y = 0$$' },
      ],
      correct: 'B',
      expEn: 'Completing the square in B gives $$(x - 2)^2 + y^2 = -4$$, and a sum of two squares cannot be negative. C is a circle: divide by $$2$$ to get $$x^2 + y^2 = 3.5$$. D is $$x^2 + (y + 3)^2 = 9$$, a circle of radius $$3$$.',
    },
    {
      id: 'q10_axes',
      type: 'mcq',
      title: '10. A circle has centre $$(5, -3)$$ and radius $$4$$. What does it do at the axes?',
      options: [
        { val: 'A', text: 'A. It crosses both axes twice' },
        { val: 'B', text: 'B. It touches the x-axis and crosses the y-axis' },
        { val: 'C', text: 'C. It misses both axes' },
        { val: 'D', text: 'D. It crosses the x-axis twice and misses the y-axis' },
      ],
      correct: 'D',
      expEn: 'The centre is $$3$$ from the x-axis, which is less than the radius, so the circle crosses it twice. The centre is $$5$$ from the y-axis, which is more than the radius, so the circle does not reach it.',
    },
  ],
};
