// src/data/Y7_MATH/U01_6/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Maths lives
// ONLY inside $$…$$ here. 1–2 key words in context (square, root), 3–5 the core
// skill (a cube, a cube root, trapping a root), 6 a word problem. Distractors
// are diagnoses; no item copies a check or workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_square',
      type: 'mcq',
      title: '1. What is $$7^2$$ (seven squared)?',
      options: [
        { val: 'A', text: 'A. $$14$$' },
        { val: 'B', text: 'B. $$49$$' },
        { val: 'C', text: 'C. $$9$$' },
        { val: 'D', text: 'D. $$21$$' },
      ],
      correct: 'B',
      expEn: '$$7^2 = 7 × 7 = 49$$. The small 2 means multiply two 7s together, not multiply 7 by 2 (which is $$14$$). Adding would give $$9$$.',
      expVn: '$$7^2 = 7 × 7 = 49$$. Số 2 nhỏ nghĩa là nhân hai số 7, không phải nhân 7 với 2 (ra $$14$$). Cộng thì ra $$9$$.',
    },
    {
      id: 'a2_root',
      type: 'mcq',
      title: '2. What is $$\\sqrt{100}$$?',
      options: [
        { val: 'A', text: 'A. $$10$$' },
        { val: 'B', text: 'B. $$50$$' },
        { val: 'C', text: 'C. $$20$$' },
        { val: 'D', text: 'D. $$1000$$' },
      ],
      correct: 'A',
      expEn: '$$\\sqrt{100}$$ asks which number times itself is 100. It is $$10$$, because $$10 × 10 = 100$$. Answering $$50$$ halves 100 instead of finding the root.',
      expVn: '$$\\sqrt{100}$$ hỏi số nào nhân với chính nó bằng 100. Đó là $$10$$, vì $$10 × 10 = 100$$. Trả lời $$50$$ là chia đôi 100 thay vì tìm căn.',
    },
    {
      id: 'a3_cube',
      type: 'mcq',
      title: '3. What is $$4^3$$ (four cubed)?',
      options: [
        { val: 'A', text: 'A. $$12$$' },
        { val: 'B', text: 'B. $$16$$' },
        { val: 'C', text: 'C. $$64$$' },
        { val: 'D', text: 'D. $$7$$' },
      ],
      correct: 'C',
      expEn: '$$4^3 = 4 × 4 × 4 = 64$$. Answering $$16$$ stops at $$4 × 4$$ (that is four *squared*); $$12$$ is $$4 × 3$$.',
      expVn: '$$4^3 = 4 × 4 × 4 = 64$$. Trả lời $$16$$ là dừng ở $$4 × 4$$ (đó là bốn *bình phương*); $$12$$ là $$4 × 3$$.',
    },
    {
      id: 'a4_cube_root',
      type: 'mcq',
      title: '4. What is $$\\sqrt[3]{27}$$ (the cube root of 27)?',
      options: [
        { val: 'A', text: 'A. $$9$$' },
        { val: 'B', text: 'B. $$3$$' },
        { val: 'C', text: 'C. $$27$$' },
        { val: 'D', text: 'D. $$81$$' },
      ],
      correct: 'B',
      expEn: 'The cube root asks which number times itself twice is 27: $$3 × 3 × 3 = 27$$, so $$\\sqrt[3]{27} = 3$$. Answering $$9$$ divides by 3 instead of taking the root.',
      expVn: 'Căn bậc ba hỏi số nào nhân với chính nó hai lần bằng 27: $$3 × 3 × 3 = 27$$, nên $$\\sqrt[3]{27} = 3$$. Trả lời $$9$$ là chia cho 3 thay vì lấy căn.',
    },
    {
      id: 'a5_trap',
      type: 'mcq',
      title: '5. Between which two whole numbers does $$\\sqrt{40}$$ lie?',
      options: [
        { val: 'A', text: 'A. $$6$$ and $$7$$' },
        { val: 'B', text: 'B. $$20$$ and $$21$$' },
        { val: 'C', text: 'C. $$5$$ and $$6$$' },
        { val: 'D', text: 'D. $$8$$ and $$9$$' },
      ],
      correct: 'A',
      expEn: '40 is between the squares $$36 = 6^2$$ and $$49 = 7^2$$, so $$\\sqrt{40}$$ is between 6 and 7. Answering 20 and 21 halves 40 instead of using the square list.',
      expVn: '40 nằm giữa hai số chính phương $$36 = 6^2$$ và $$49 = 7^2$$, nên $$\\sqrt{40}$$ nằm giữa 6 và 7. Trả lời 20 và 21 là chia đôi 40 thay vì dùng bảng bình phương.',
    },
    {
      id: 'a6_word',
      type: 'mcq',
      title: '6. Mr Bowen lays 400 paving stones in a perfect square. How many stones run along one side?',
      options: [
        { val: 'A', text: 'A. $$40$$' },
        { val: 'B', text: 'B. $$200$$' },
        { val: 'C', text: 'C. $$100$$' },
        { val: 'D', text: 'D. $$20$$' },
      ],
      correct: 'D',
      expEn: 'A perfect square means side × side = 400, so the side is $$\\sqrt{400} = 20$$ (because $$20 × 20 = 400$$). Answering $$200$$ halves 400; $$100$$ quarters it.',
      expVn: 'Hình vuông hoàn hảo nghĩa là cạnh × cạnh = 400, nên cạnh là $$\\sqrt{400} = 20$$ (vì $$20 × 20 = 400$$). Trả lời $$200$$ là chia đôi 400; $$100$$ là chia tư.',
    },
  ],
};
