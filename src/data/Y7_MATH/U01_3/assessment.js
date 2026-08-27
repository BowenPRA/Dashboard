// src/data/Y7_MATH/U01_3/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Maths lives
// ONLY inside $$…$$ here. 1–2 key words in context (multiple, common), 3–5 the
// core skill (an LCM, one with the multiply-trap distractor, one worked from a
// list), 6 a word problem. Distractors are diagnoses; no item copies a check or
// workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_multiple',
      type: 'mcq',
      title: '1. Which of these is a multiple of 6?',
      options: [
        { val: 'A', text: 'A. $$18$$' },
        { val: 'B', text: 'B. $$3$$' },
        { val: 'C', text: 'C. $$16$$' },
        { val: 'D', text: 'D. $$22$$' },
      ],
      correct: 'A',
      expEn: '$$18 = 6 × 3$$, so 18 is a multiple of 6. $$3$$ is a **factor** of 6 (it divides in), not a multiple — that is the mix-up to avoid.',
      expVn: '$$18 = 6 × 3$$, nên 18 là bội số của 6. $$3$$ là **ước số** của 6 (nó chia hết vào), không phải bội số — đó là chỗ dễ nhầm.',
    },
    {
      id: 'a2_common',
      type: 'mcq',
      title: '2. A common multiple of 3 and 4 is a number that is:',
      options: [
        { val: 'A', text: 'A. a multiple of 3 or of 4' },
        { val: 'B', text: 'B. a multiple of both 3 and 4' },
        { val: 'C', text: 'C. an ordinary, everyday number' },
        { val: 'D', text: 'D. a factor of both 3 and 4' },
      ],
      correct: 'B',
      expEn: 'In maths “common” means **shared** — a common multiple is a multiple of **both** numbers, in both lists. It does not mean “ordinary”, and a factor divides in rather than being a multiple.',
      expVn: 'Trong toán “common” nghĩa là **chung** — bội số chung là bội của **cả hai** số, có trong cả hai danh sách. Nó không có nghĩa “bình thường”, và ước số thì chia hết vào chứ không phải bội số.',
    },
    {
      id: 'a3_lcm',
      type: 'mcq',
      title: '3. What is the lowest common multiple of 4 and 6?',
      options: [
        { val: 'A', text: 'A. $$24$$' },
        { val: 'B', text: 'B. $$2$$' },
        { val: 'C', text: 'C. $$12$$' },
        { val: 'D', text: 'D. $$10$$' },
      ],
      correct: 'C',
      expEn: '12 and 24 are both common multiples, but 12 is the **lowest**, so the LCM is 12. Answering 24 multiplies the numbers ($$4 × 6$$); 10 adds them; 2 is a factor.',
      expVn: '12 và 24 đều là bội số chung, nhưng 12 là **nhỏ nhất**, nên BCNN là 12. Trả lời 24 là nhân ($$4 × 6$$); 10 là cộng; 2 là ước số.',
    },
    {
      id: 'a4_divides',
      type: 'mcq',
      title: '4. What is the LCM of 3 and 6?',
      options: [
        { val: 'A', text: 'A. $$18$$' },
        { val: 'B', text: 'B. $$6$$' },
        { val: 'C', text: 'C. $$9$$' },
        { val: 'D', text: 'D. $$3$$' },
      ],
      correct: 'B',
      expEn: '3 divides into 6, so the LCM is just the bigger number, 6 — not $$3 × 6 = 18$$. When one number divides the other, the LCM is the larger one.',
      expVn: '3 chia hết 6, nên BCNN chính là số lớn hơn, 6 — không phải $$3 × 6 = 18$$. Khi một số chia hết số kia, BCNN là số lớn hơn.',
    },
    {
      id: 'a5_list',
      type: 'mcq',
      title: '5. Work out the lowest common multiple of 8 and 12.',
      options: [
        { val: 'A', text: 'A. $$96$$' },
        { val: 'B', text: 'B. $$20$$' },
        { val: 'C', text: 'C. $$48$$' },
        { val: 'D', text: 'D. $$24$$' },
      ],
      correct: 'D',
      expEn: 'List them: 8, 16, **24** … and 12, **24** … The lowest in both is 24. Answering 96 multiplies them ($$8 × 12$$); 20 adds them.',
      expVn: 'Liệt kê: 8, 16, **24** … và 12, **24** … Số nhỏ nhất có trong cả hai là 24. Trả lời 96 là nhân ($$8 × 12$$); 20 là cộng.',
    },
    {
      id: 'a6_word',
      type: 'mcq',
      title: '6. Two lighthouses flash: one every 8 seconds, one every 10 seconds. They have just flashed together. After how many seconds do they next flash together?',
      options: [
        { val: 'A', text: 'A. $$40$$' },
        { val: 'B', text: 'B. $$80$$' },
        { val: 'C', text: 'C. $$18$$' },
        { val: 'D', text: 'D. $$2$$' },
      ],
      correct: 'A',
      expEn: 'You need the LCM of 8 and 10, which is 40. Answering 80 multiplies them ($$8 × 10$$); 18 adds them ($$8 + 10$$).',
      expVn: 'Em cần BCNN của 8 và 10, bằng 40. Trả lời 80 là nhân ($$8 × 10$$); 18 là cộng ($$8 + 10$$).',
    },
  ],
};
