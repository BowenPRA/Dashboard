// src/data/ADD_MATH/AM_4B/assessment.js
// The Quiz for AM_4B: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files.
//
// Every distractor is a diagnosis: the answer you land on by making one
// nameable mistake (reading the sign of a root off the page, forgetting the
// number in front when finding the y-intercept, taking the end behaviour from
// the wrong sign, letting a squared factor cross, moving an intercept when
// reflecting). No item repeats a notes check or a workbook question, and the
// key is spread A/B/C/D so it cannot be guessed.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_roots',
      type: 'mcq',
      title: '1. Where does $$y = (x + 3)(2x - 1)(4 - x)$$ meet the x-axis?',
      options: [
        { val: 'A', text: 'A. $$x = 3,\\ x = \\tfrac{1}{2},\\ x = -4$$' },
        { val: 'B', text: 'B. $$x = -3,\\ x = \\tfrac{1}{2},\\ x = 4$$' },
        { val: 'C', text: 'C. $$x = -3,\\ x = 1,\\ x = 4$$' },
        { val: 'D', text: 'D. $$x = -3,\\ x = -\\tfrac{1}{2},\\ x = 4$$' },
      ],
      correct: 'B',
      expEn: 'Each bracket equal to zero: $$x + 3 = 0$$ gives $$-3$$, $$2x - 1 = 0$$ gives $$\\tfrac{1}{2}$$, and $$4 - x = 0$$ gives $$+4$$. A reads every sign off the page backwards; C forgets to divide by the 2; D gets the middle sign wrong.',
    },
    {
      id: 'q2_yint',
      type: 'mcq',
      title: '2. What is the y-intercept of $$y = 3(x - 2)(x + 1)(x - 4)$$?',
      options: [
        { val: 'A', text: 'A. 8' },
        { val: 'B', text: 'B. −8' },
        { val: 'C', text: 'C. 24' },
        { val: 'D', text: 'D. −24' },
      ],
      correct: 'C',
      expEn: 'Put $$x = 0$$: $$y = 3 \\times (-2) \\times 1 \\times (-4) = 24$$. A and B forget the 3 in front; D has the sign wrong — two negatives multiply to a positive.',
    },
    {
      id: 'q3_end',
      type: 'mcq',
      title: '3. For $$y = (x - 1)(x + 2)(5 - x)$$, what happens to y as x becomes very large and positive?',
      options: [
        { val: 'A', text: 'A. $$y \\to +\\infty$$, because all three brackets are positive' },
        { val: 'B', text: 'B. $$y \\to 0$$, because the curve levels off' },
        { val: 'C', text: 'C. $$y \\to +\\infty$$, because 5 is the biggest number' },
        { val: 'D', text: 'D. $$y \\to -\\infty$$, because the x coefficients multiply to $$-1$$' },
      ],
      correct: 'D',
      expEn: 'For a huge $$x$$, $$x - 1$$ and $$x + 2$$ are huge and positive but $$5 - x$$ is huge and negative, so the product is negative and enormous. The quick rule: multiply the x coefficients, $$1 \\times 1 \\times (-1) = -1 < 0$$, so the curve falls to the right. A cubic never levels off.',
    },
    {
      id: 'q4_shape',
      type: 'mcq',
      title: '4. Which of these curves climbs to the right and falls to the left?',
      options: [
        { val: 'A', text: 'A. $$y = (1 - x)(x + 2)(x - 3)$$' },
        { val: 'B', text: 'B. $$y = -2(x + 1)(x - 1)(x - 4)$$' },
        { val: 'C', text: 'C. $$y = (2 - x)(3 - x)(x + 1)$$' },
        { val: 'D', text: 'D. $$y = (x - 5)(3 - x)(1 - x)$$' },
      ],
      correct: 'C',
      expEn: 'Climbing to the right means a POSITIVE coefficient of $$x^3$$. C: $$(-1)(-1)(1) = 1 > 0$$. A has one negative x coefficient, B has a $$-2$$ in front, and D has two negative x coefficients and one positive — an odd number of negatives each time, so those three all fall to the right.',
    },
    {
      id: 'q5_touch',
      type: 'mcq',
      title: '5. The curve $$y = (x + 2)^2(x - 3)$$ meets the x-axis at $$x = -2$$ and $$x = 3$$. Which is true?',
      options: [
        { val: 'A', text: 'A. It touches at $$-2$$ and crosses at $$3$$' },
        { val: 'B', text: 'B. It crosses at $$-2$$ and touches at $$3$$' },
        { val: 'C', text: 'C. It crosses at both' },
        { val: 'D', text: 'D. It touches at both' },
      ],
      correct: 'A',
      expEn: 'The bracket $$(x + 2)$$ is squared, so the sign of $$y$$ does not change as $$x$$ passes $$-2$$: the curve comes down to the axis and turns back — it touches. The single bracket $$(x - 3)$$ changes sign, so the curve crosses there.',
    },
    {
      id: 'q6_read_k',
      type: 'mcq',
      title: '6. A curve $$y = k(x - 1)(x + 2)(x - 4)$$ passes through $$(0, 16)$$. What is k?',
      options: [
        { val: 'A', text: 'A. $$k = 2$$' },
        { val: 'B', text: 'B. $$k = -2$$' },
        { val: 'C', text: 'C. $$k = 8$$' },
        { val: 'D', text: 'D. $$k = 16$$' },
      ],
      correct: 'A',
      expEn: 'Substitute the point: $$16 = k(-1)(2)(-4) = 8k$$, so $$k = 2$$. B has the sign wrong; C and D stop before dividing.',
    },
    {
      id: 'q7_modulus_intercepts',
      type: 'mcq',
      title: '7. The curve $$y = (x - 2)(x + 1)(x - 5)$$ is reflected to give $$y = |(x - 2)(x + 1)(x - 5)|$$. What happens to its three x-intercepts?',
      options: [
        { val: 'A', text: 'A. They move to $$x = -2, 1$$ and $$-5$$' },
        { val: 'B', text: 'B. They stay at $$x = -1, 2$$ and $$5$$, and become sharp corners' },
        { val: 'C', text: 'C. Only the middle one survives' },
        { val: 'D', text: 'D. They disappear, because the graph is never zero' },
      ],
      correct: 'B',
      expEn: 'A point ON the axis has $$y = 0$$, and $$|0| = 0$$, so reflecting leaves it exactly where it is. What changes is the shape at each one: a piece that used to go below the axis now bounces off it, giving a sharp corner.',
    },
    {
      id: 'q8_modulus_yint',
      type: 'mcq',
      title: '8. What is the y-intercept of $$y = |2(x + 1)(x - 3)(x - 4)|$$?',
      options: [
        { val: 'A', text: 'A. $$-24$$' },
        { val: 'B', text: 'B. $$12$$' },
        { val: 'C', text: 'C. $$-12$$' },
        { val: 'D', text: 'D. $$24$$' },
      ],
      correct: 'D',
      expEn: 'Inside the bars first: $$2 \\times 1 \\times (-3) \\times (-4) = 24$$, and $$|24| = 24$$. Had the inside come out negative, the modulus would have flipped it positive — a modulus graph never has a negative y-intercept, which rules out A and C on sight.',
    },
    {
      id: 'q9_below',
      type: 'mcq',
      title: '9. For $$y = (x + 1)(x - 2)(x - 3)$$, which parts of the curve does the modulus reflect?',
      options: [
        { val: 'A', text: 'A. The part between $$-1$$ and $$2$$ only' },
        { val: 'B', text: 'B. The part to the left of $$-1$$ and the part between $$2$$ and $$3$$' },
        { val: 'C', text: 'C. The part to the right of $$3$$ only' },
        { val: 'D', text: 'D. Every part of the curve' },
      ],
      correct: 'B',
      expEn: 'The x coefficients multiply to $$+1$$, so the curve climbs to the right: it is below the axis on its left tail (left of $$-1$$), above between $$-1$$ and $$2$$, below between $$2$$ and $$3$$, and above to the right of $$3$$. Only the pieces BELOW the axis are reflected.',
    },
    {
      id: 'q10_factorise',
      type: 'mcq',
      title: '10. To sketch $$y = x^3 - 4x$$, a student first factorises. Which is the fully factorised form?',
      options: [
        { val: 'A', text: 'A. $$x(x^2 - 4)$$' },
        { val: 'B', text: 'B. $$x(x - 4)(x + 4)$$' },
        { val: 'C', text: 'C. $$x(x - 2)(x + 2)$$' },
        { val: 'D', text: 'D. $$(x - 2)^2(x + 2)$$' },
      ],
      correct: 'C',
      expEn: 'Take out the common factor $$x$$ to get $$x(x^2 - 4)$$, then recognise the difference of two squares: $$x^2 - 4 = (x - 2)(x + 2)$$. A stops halfway, so the sketch would be missing two intercepts; B mistakes 4 for its square root; D multiplies out to something else.',
    },
  ],
};
