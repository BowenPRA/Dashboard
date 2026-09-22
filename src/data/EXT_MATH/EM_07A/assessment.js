// src/data/EXT_MATH/EM_07A/assessment.js
// The Quiz for EM_07A: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files. No diagram is used: every
// region and timetable is given in words, so the quiz never depends on a
// picture the student might read wrongly.
//
// Every distractor is a diagnosis — the answer you reach by making one
// nameable mistake: rounding the bound instead of halving the unit, ignoring
// the time difference, forgetting to turn the sign, keeping an end that <
// leaves out, a solid line read as dashed, a bracket not multiplied out, a
// minus in front of a bracket, the slower method, a sign dropped on the way
// back. No item repeats a notes check or a Practice question, and the key is
// spread A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_bound',
      type: 'mcq',
      title: '1. A length is 7.3 cm, correct to 1 decimal place. What is its upper bound?',
      options: [
        { val: 'A', text: 'A. 7.35 cm' },
        { val: 'B', text: 'B. 7.34 cm' },
        { val: 'C', text: 'C. 7.4 cm' },
        { val: 'D', text: 'D. 7.349 cm' },
      ],
      correct: 'A',
      expEn: 'Half of the unit 0.1 is 0.05, so the upper bound is $$7.3 + 0.05 = 7.35$$ — the boundary itself, even though a length of exactly 7.35 would round up. B and D are values just below it; C is the next value to 1 d.p.',
    },
    {
      id: 'q2_zone',
      type: 'mcq',
      title: '2. A flight leaves Hanoi at 08 15 and lands in Tokyo at 15 05. Both are local times, and Tokyo is 2 hours ahead of Hanoi. How long is the flight?',
      options: [
        { val: 'A', text: 'A. 6 h 50 min' },
        { val: 'B', text: 'B. 8 h 50 min' },
        { val: 'C', text: 'C. 4 h 50 min' },
        { val: 'D', text: 'D. 5 h 10 min' },
      ],
      correct: 'C',
      expEn: 'In Hanoi time it lands at 13 05. From 08 15: 45 min to 09 00, 4 h to 13 00, then 5 min — 4 h 50 min. A ignores the time difference; B adds the 2 hours instead of taking them away.',
    },
    {
      id: 'q3_line',
      type: 'mcq',
      title: '3. Find the equation of the straight line through $$(0, -2)$$ and $$(3, 4)$$.',
      options: [
        { val: 'A', text: 'A. $$y = 2x - 2$$' },
        { val: 'B', text: 'B. $$y = \\tfrac{1}{2}x - 2$$' },
        { val: 'C', text: 'C. $$y = 2x + 4$$' },
        { val: 'D', text: 'D. $$y = -2x + 2$$' },
      ],
      correct: 'A',
      expEn: 'Gradient $$= \\dfrac{4 - (-2)}{3 - 0} = \\dfrac{6}{3} = 2$$, and the line crosses the $$y$$-axis at $$-2$$: $$y = 2x - 2$$. B is run over rise; C uses the other point as if it were the intercept.',
    },
    {
      id: 'q4_flip',
      type: 'mcq',
      title: '4. Solve $$7 - 3x \\le 19$$.',
      options: [
        { val: 'A', text: 'A. $$x \\le -4$$' },
        { val: 'B', text: 'B. $$x \\ge -4$$' },
        { val: 'C', text: 'C. $$x \\ge 4$$' },
        { val: 'D', text: 'D. $$x \\le 4$$' },
      ],
      correct: 'B',
      expEn: '$$-3x \\le 12$$, and dividing by $$-3$$ turns the sign: $$x \\ge -4$$. A divides by $$-3$$ but forgets to turn the sign round.',
    },
    {
      id: 'q5_integers',
      type: 'mcq',
      title: '5. List the integers n for which $$-3 \\le 2n + 1 < 7$$.',
      options: [
        { val: 'A', text: 'A. $$-1, 0, 1, 2$$' },
        { val: 'B', text: 'B. $$-2, -1, 0, 1, 2, 3$$' },
        { val: 'C', text: 'C. $$-1, 0, 1, 2, 3$$' },
        { val: 'D', text: 'D. $$-2, -1, 0, 1, 2$$' },
      ],
      correct: 'D',
      expEn: 'Subtract 1 from all three parts: $$-4 \\le 2n < 6$$; halve: $$-2 \\le n < 3$$. So $$-2$$ is in (≤) and 3 is out (<). A drops the end that is included; B keeps the end that is not.',
    },
    {
      id: 'q6_region',
      type: 'mcq',
      title: '6. A region R lies below the SOLID line $$2x + y = 8$$. Which inequality describes that side of the line?',
      options: [
        { val: 'A', text: 'A. $$2x + y < 8$$' },
        { val: 'B', text: 'B. $$2x + y \\ge 8$$' },
        { val: 'C', text: 'C. $$2x + y \\le 8$$' },
        { val: 'D', text: 'D. $$2x + y > 8$$' },
      ],
      correct: 'C',
      expEn: 'Test the point (0, 0), which is below the line: $$0 \\le 8$$ is true. The line is solid, so points on it count: $$\\le$$. A would need a dashed line.',
    },
    {
      id: 'q7_substitute',
      type: 'mcq',
      title: '7. $$y = 2x + 1$$ and $$3x + 2y = 16$$. Find the value of $$x$$.',
      options: [
        { val: 'A', text: 'A. $$x = \\dfrac{15}{7}$$' },
        { val: 'B', text: 'B. $$x = 3$$' },
        { val: 'C', text: 'C. $$x = 2$$' },
        { val: 'D', text: 'D. $$x = \\dfrac{18}{7}$$' },
      ],
      correct: 'C',
      expEn: 'Substitute in a bracket: $$3x + 2(2x + 1) = 16$$, so $$7x + 2 = 16$$ and $$x = 2$$ (then $$y = 5$$). A multiplies the $$2x$$ by 2 but not the 1; B drops the 2 in front of the bracket; D adds the 2 instead of taking it away.',
    },
    {
      id: 'q8_tidy',
      type: 'mcq',
      title: '8. Write $$4(x + 2) - 3(y - 1) = 20$$ in the form $$ax + by = c$$.',
      options: [
        { val: 'A', text: 'A. $$4x - 3y = 20$$' },
        { val: 'B', text: 'B. $$4x - 3y = 15$$' },
        { val: 'C', text: 'C. $$4x + 3y = 9$$' },
        { val: 'D', text: 'D. $$4x - 3y = 9$$' },
      ],
      correct: 'D',
      expEn: '$$4x + 8 - 3y + 3 = 20$$ — the minus in front of the bracket makes $$-3 \\times -1 = +3$$ — so $$4x - 3y = 9$$. B takes that 3 as $$-3$$; A drops the numbers from the brackets.',
    },
    {
      id: 'q9_method',
      type: 'mcq',
      title: '9. Which pair of simultaneous equations is quickest to solve by SUBSTITUTION?',
      options: [
        { val: 'A', text: 'A. $$2x + 3y = 7$$ and $$5x - 3y = 14$$' },
        { val: 'B', text: 'B. $$y = 3x - 4$$ and $$5x + 2y = 3$$' },
        { val: 'C', text: 'C. $$4x + y = 9$$ and $$4x + 3y = 11$$' },
        { val: 'D', text: 'D. $$3x + 5y = 1$$ and $$2x + 3y = 1$$' },
      ],
      correct: 'B',
      expEn: 'In B, the first equation already says what $$y$$ is, so it goes straight into the second. A has $$+3y$$ and $$-3y$$, and C has $$4x$$ twice — both eliminate straight away. D needs both equations multiplied.',
    },
    {
      id: 'q10_simultaneous',
      type: 'mcq',
      title: '10. Solve the simultaneous equations $$3x + 2y = 13$$ and $$x - 2y = -1$$.',
      options: [
        { val: 'A', text: 'A. $$x = 3,\\ y = -2$$' },
        { val: 'B', text: 'B. $$x = 2,\\ y = 3$$' },
        { val: 'C', text: 'C. $$x = 3.5,\\ y = 1.25$$' },
        { val: 'D', text: 'D. $$x = 3,\\ y = 2$$' },
      ],
      correct: 'D',
      expEn: 'The $$y$$ terms are $$+2y$$ and $$-2y$$: add, $$4x = 12$$, so $$x = 3$$. Then $$3 - 2y = -1$$ gives $$y = 2$$. Check: $$3(3) + 2(2) = 13$$ ✓. A drops a sign on the way back; B swaps the two values.',
    },
  ],
};
