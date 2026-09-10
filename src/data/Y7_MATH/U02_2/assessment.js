// src/data/Y7_MATH/U02_2/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Maths lives
// ONLY inside $$…$$ here. 1–2 the key words in context (substitute/value,
// formula), 3–5 the core skill (the hidden ×, the order of operations, a
// negative in brackets), 6 a two-letter formula word problem. Distractors are
// diagnoses; no item copies a check or workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_value',
      type: 'mcq',
      title: '1. What is the value of $$n − 6$$ when $$n = 15$$?',
      options: [
        { val: 'A', text: 'A. $$21$$' },
        { val: 'B', text: 'B. $$9$$' },
        { val: 'C', text: 'C. $$n − 6$$' },
        { val: 'D', text: 'D. $$156$$' },
      ],
      correct: 'B',
      expEn: 'Substitute 15 for $$n$$: $$15 − 6 = 9$$. A added; C left the expression unfinished, which was last lesson\'s answer; D pushed digits together.',
      expVn: 'Thay 15 vào chỗ $$n$$: $$15 − 6 = 9$$. A cộng; C để nguyên biểu thức, là đáp án của bài trước; D ghép các chữ số lại.',
    },
    {
      id: 'a2_formula',
      type: 'mcq',
      title: '2. Which of these is a formula?',
      options: [
        { val: 'A', text: 'A. $$5x + 3$$' },
        { val: 'B', text: 'B. $$12 − 4 = 8$$' },
        { val: 'C', text: 'C. $$P = 2l + 2w$$' },
        { val: 'D', text: 'D. $$lw$$' },
      ],
      correct: 'C',
      expEn: 'A formula is a rule with letters **and** an = sign: $$P = 2l + 2w$$. A and D are expressions (no = sign); B has an = sign but no letters.',
      expVn: 'Công thức là một quy tắc có chữ cái **và** dấu =: $$P = 2l + 2w$$. A và D là biểu thức (không có dấu =); B có dấu = nhưng không có chữ cái.',
    },
    {
      id: 'a3_hidden_times',
      type: 'mcq',
      title: '3. What is the value of $$7k$$ when $$k = 3$$?',
      options: [
        { val: 'A', text: 'A. $$73$$' },
        { val: 'B', text: 'B. $$10$$' },
        { val: 'C', text: 'C. $$21$$' },
        { val: 'D', text: 'D. $$4$$' },
      ],
      correct: 'C',
      expEn: '$$7k$$ means $$7 × k$$. Put the × back: $$7 × 3 = 21$$. A pushed the digits together; B added; D subtracted.',
      expVn: '$$7k$$ nghĩa là $$7 × k$$. Viết lại dấu ×: $$7 × 3 = 21$$. A ghép các chữ số lại; B cộng; D trừ.',
    },
    {
      id: 'a4_order',
      type: 'mcq',
      title: '4. What is the value of $$4x + 3$$ when $$x = 5$$?',
      options: [
        { val: 'A', text: 'A. $$23$$' },
        { val: 'B', text: 'B. $$32$$' },
        { val: 'C', text: 'C. $$12$$' },
        { val: 'D', text: 'D. $$453$$' },
      ],
      correct: 'A',
      expEn: 'Multiply first: $$4 × 5 = 20$$, then add 3: $$23$$. B added first ($$5 + 3 = 8$$, then $$× 4$$); C added everything; D pushed the digits together.',
      expVn: 'Nhân trước: $$4 × 5 = 20$$, rồi cộng 3: $$23$$. B cộng trước ($$5 + 3 = 8$$, rồi $$× 4$$); C cộng tất cả; D ghép các chữ số lại.',
    },
    {
      id: 'a5_negative',
      type: 'mcq',
      title: '5. What is the value of $$10 − 3n$$ when $$n = −2$$?',
      options: [
        { val: 'A', text: 'A. $$4$$' },
        { val: 'B', text: 'B. $$16$$' },
        { val: 'C', text: 'C. $$−16$$' },
        { val: 'D', text: 'D. $$5$$' },
      ],
      correct: 'B',
      expEn: 'Brackets: $$10 − 3 × (−2) = 10 − (−6) = 10 + 6 = 16$$. A left the minus sign behind ($$10 − 6$$); C put the minus on the wrong answer; D subtracted before multiplying.',
      expVn: 'Dấu ngoặc: $$10 − 3 × (−2) = 10 − (−6) = 10 + 6 = 16$$. A bỏ quên dấu trừ ($$10 − 6$$); C đặt dấu trừ sai chỗ; D trừ trước khi nhân.',
    },
    {
      id: 'a6_word_problem',
      type: 'mcq',
      title: '6. A bus ticket costs $$C = 8 + 2k$$ thousand dong for a journey of $$k$$ kilometres. How much is a 6 km journey?',
      options: [
        { val: 'A', text: 'A. $$60$$ thousand dong' },
        { val: 'B', text: 'B. $$16$$ thousand dong' },
        { val: 'C', text: 'C. $$826$$ thousand dong' },
        { val: 'D', text: 'D. $$20$$ thousand dong' },
      ],
      correct: 'D',
      expEn: 'Substitute $$k = 6$$: $$C = 8 + 2 × 6 = 8 + 12 = 20$$. A added first ($$8 + 2 = 10$$, then $$× 6$$); B forgot the 8; C pushed digits together.',
      expVn: 'Thay $$k = 6$$: $$C = 8 + 2 × 6 = 8 + 12 = 20$$. A cộng trước ($$8 + 2 = 10$$, rồi $$× 6$$); B quên số 8; C ghép các chữ số lại.',
    },
  ],
};
