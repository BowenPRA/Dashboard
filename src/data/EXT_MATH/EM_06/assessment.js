// src/data/EXT_MATH/EM_06/assessment.js
// The Quiz for EM_06: 10 multiple-choice items, one sitting, 12 minutes.
// Shares Gate 2 with the arcade. English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files. No diagram is used: a Venn
// diagram question states its region counts in words, so the quiz never
// depends on a picture the student might read wrongly.
//
// Every distractor is a diagnosis — the answer you reach by making one
// nameable mistake: counting only the "only" part of a set, dividing by the
// circles instead of by n(ℰ), forgetting the students in neither set, stopping
// at a square factor that is not the largest, adding under the root, squaring
// only the root, or forgetting to cancel at the end. No item repeats a notes
// check or a Practice question, and the key is spread A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_union',
      type: 'mcq',
      title: '1. On a Venn diagram, 9 students are in A only, 4 are in both A and B, 6 are in B only, and 5 are outside both. Find $$n(A \\cup B)$$.',
      options: [
        { val: 'A', text: 'A. 15' },
        { val: 'B', text: 'B. 19' },
        { val: 'C', text: 'C. 24' },
        { val: 'D', text: 'D. 4' },
      ],
      correct: 'B',
      expEn: 'The union is everything inside the circles: $$9 + 4 + 6 = 19$$. C adds the 5 outside as well, which is $$n(\\mathscr{E})$$; A forgets the middle.',
    },
    {
      id: 'q2_prob',
      type: 'mcq',
      title: '2. Using the same diagram (9 in A only, 4 in both, 6 in B only, 5 outside), one student is chosen at random. Find the probability that the student is in neither set.',
      options: [
        { val: 'A', text: 'A. $$\\dfrac{5}{19}$$' },
        { val: 'B', text: 'B. $$\\dfrac{19}{24}$$' },
        { val: 'C', text: 'C. $$\\dfrac{5}{24}$$' },
        { val: 'D', text: 'D. $$5$$' },
      ],
      correct: 'C',
      expEn: 'Probability is the region over EVERYONE: $$n(\\mathscr{E}) = 9 + 4 + 6 + 5 = 24$$, so the answer is $$\\dfrac{5}{24}$$. A divides by the union instead of by $$n(\\mathscr{E})$$.',
    },
    {
      id: 'q3_notation',
      type: 'mcq',
      title: '3. Which notation describes the elements that are in B but NOT in A?',
      options: [
        { val: 'A', text: "A. $$A \\cap B'$$" },
        { val: 'B', text: "B. $$(A \\cup B)'$$" },
        { val: 'C', text: "C. $$A' \\cap B$$" },
        { val: 'D', text: "D. $$A' \\cup B$$" },
      ],
      correct: 'C',
      expEn: "Not in A is $$A'$$, and in B is $$B$$; both at once is $$A' \\cap B$$. A is the other crescent (in A but not B), and B is the region outside both circles.",
    },
    {
      id: 'q4_elements',
      type: 'mcq',
      title: '4. $$\\mathscr{E} = \\{1, 2, 3, \\ldots, 10\\}$$, A is the set of even numbers and B is the set of multiples of 3. Find $$A \\cap B$$.',
      options: [
        { val: 'A', text: 'A. $$\\{6\\}$$' },
        { val: 'B', text: 'B. $$\\{3, 6, 9\\}$$' },
        { val: 'C', text: 'C. $$\\{2, 3, 4, 6, 8, 9, 10\\}$$' },
        { val: 'D', text: 'D. $$\\varnothing$$' },
      ],
      correct: 'A',
      expEn: 'The intersection needs both: even AND a multiple of 3. Between 1 and 10 only 6 is both. B is just the multiples of 3, and C is the union.',
    },
    {
      id: 'q5_hidden',
      type: 'mcq',
      title: '5. 35 students were asked about hot drinks. 20 like tea, 18 like coffee, and 4 like neither. How many like both?',
      options: [
        { val: 'A', text: 'A. 3' },
        { val: 'B', text: 'B. 11' },
        { val: 'C', text: 'C. 4' },
        { val: 'D', text: 'D. 7' },
      ],
      correct: 'D',
      expEn: 'Let both $$= x$$. Then $$(20 - x) + x + (18 - x) + 4 = 35$$, so $$42 - x = 35$$ and $$x = 7$$. A forgets the 4 who like neither (giving $$38 - 35$$); B adds instead of subtracting.',
    },
    {
      id: 'q6_simplify',
      type: 'mcq',
      title: '6. Simplify $$\\sqrt{80}$$ fully.',
      options: [
        { val: 'A', text: 'A. $$2\\sqrt{20}$$' },
        { val: 'B', text: 'B. $$4\\sqrt{5}$$' },
        { val: 'C', text: 'C. $$16\\sqrt{5}$$' },
        { val: 'D', text: 'D. $$8\\sqrt{10}$$' },
      ],
      correct: 'B',
      expEn: '$$80 = 16 \\times 5$$ and $$\\sqrt{16} = 4$$, so $$\\sqrt{80} = 4\\sqrt{5}$$. A used the square factor 4 and stopped, but 20 still has the square factor 4; C forgot to take the root of 16.',
    },
    {
      id: 'q7_collect',
      type: 'mcq',
      title: '7. Simplify $$\\sqrt{27} + \\sqrt{75}$$.',
      options: [
        { val: 'A', text: 'A. $$\\sqrt{102}$$' },
        { val: 'B', text: 'B. $$8\\sqrt{6}$$' },
        { val: 'C', text: 'C. $$8\\sqrt{3}$$' },
        { val: 'D', text: 'D. $$15\\sqrt{3}$$' },
      ],
      correct: 'C',
      expEn: '$$\\sqrt{27} = 3\\sqrt{3}$$ and $$\\sqrt{75} = 5\\sqrt{3}$$, so together they make $$8\\sqrt{3}$$. A adds under the root, which never works; D multiplied the numbers in front instead of adding them.',
    },
    {
      id: 'q8_mono',
      type: 'mcq',
      title: '8. Rationalise the denominator of $$\\dfrac{15}{\\sqrt{5}}$$.',
      options: [
        { val: 'A', text: 'A. $$3\\sqrt{5}$$' },
        { val: 'B', text: 'B. $$\\dfrac{15\\sqrt{5}}{25}$$' },
        { val: 'C', text: 'C. $$\\sqrt{3}$$' },
        { val: 'D', text: 'D. $$\\dfrac{\\sqrt{5}}{3}$$' },
      ],
      correct: 'A',
      expEn: 'Multiply top and bottom by $$\\sqrt{5}$$: $$\\dfrac{15\\sqrt{5}}{5} = 3\\sqrt{5}$$. B took $$\\sqrt{5} \\times \\sqrt{5}$$ to be 25 — it is 5. D turned the fraction upside down.',
    },
    {
      id: 'q9_conjugate',
      type: 'mcq',
      title: '9. Expand and simplify $$(7 + \\sqrt{3})(7 - \\sqrt{3})$$.',
      options: [
        { val: 'A', text: 'A. $$52$$' },
        { val: 'B', text: 'B. $$46$$' },
        { val: 'C', text: 'C. $$49 - \\sqrt{3}$$' },
        { val: 'D', text: 'D. $$46 + 14\\sqrt{3}$$' },
      ],
      correct: 'B',
      expEn: 'A conjugate pair: $$7^2 - (\\sqrt{3})^2 = 49 - 3 = 46$$. A added the 3 instead of subtracting it; D kept a middle term, but $$+7\\sqrt{3}$$ and $$-7\\sqrt{3}$$ cancel.',
    },
    {
      id: 'q10_binomial',
      type: 'mcq',
      title: '10. Rationalise the denominator of $$\\dfrac{2}{3 + \\sqrt{7}}$$.',
      options: [
        { val: 'A', text: 'A. $$3 + \\sqrt{7}$$' },
        { val: 'B', text: 'B. $$\\dfrac{6 - 2\\sqrt{7}}{16}$$' },
        { val: 'C', text: 'C. $$\\dfrac{3 - \\sqrt{7}}{2}$$' },
        { val: 'D', text: 'D. $$3 - \\sqrt{7}$$' },
      ],
      correct: 'D',
      expEn: 'Multiply top and bottom by the conjugate $$3 - \\sqrt{7}$$. The bottom is $$9 - 7 = 2$$ and the top is $$6 - 2\\sqrt{7}$$, so the answer is $$\\dfrac{6 - 2\\sqrt{7}}{2} = 3 - \\sqrt{7}$$. B added the squares instead of subtracting; C divided only the first term by 2.',
    },
  ],
};
