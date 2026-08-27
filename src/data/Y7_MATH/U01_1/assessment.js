// src/data/Y7_MATH/U01_1/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Comes last,
// behind an 80 XP gate. Maths lives ONLY inside $$…$$ here — a single $ is
// literal in Assessment.jsx, the opposite of notes/workbook.
//
// 1–2 key words in context (integer, difference), 3–5 the core skill (adding, a
// minus-a-negative with the classic mistake as a distractor, one worked
// backwards), 6 a word problem. Every distractor is a diagnosis, and no item
// copies a check or workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_integer',
      type: 'mcq',
      title: '1. Which of these numbers is NOT an integer?',
      options: [
        { val: 'A', text: 'A. $$-7$$' },
        { val: 'B', text: 'B. $$0$$' },
        { val: 'C', text: 'C. $$\\tfrac{3}{4}$$' },
        { val: 'D', text: 'D. $$12$$' },
      ],
      correct: 'C',
      expEn: 'An integer is a whole number that is positive, negative or zero. $$\\tfrac{3}{4}$$ is a fraction, so it is not an integer; $$-7$$, $$0$$ and $$12$$ all are.',
      expVn: 'Số nguyên là một số nguyên vẹn, có thể dương, âm hoặc bằng không. $$\\tfrac{3}{4}$$ là phân số nên không phải số nguyên; $$-7$$, $$0$$ và $$12$$ đều là số nguyên.',
    },
    {
      id: 'a2_difference',
      type: 'mcq',
      title: '2. Find the difference between $$-5$$ and $$3$$.',
      options: [
        { val: 'A', text: 'A. $$-8$$' },
        { val: 'B', text: 'B. $$8$$' },
        { val: 'C', text: 'C. $$-2$$' },
        { val: 'D', text: 'D. $$2$$' },
      ],
      correct: 'B',
      expEn: 'A difference is the gap on the number line — bigger minus smaller: $$3 - (-5) = 8$$. It is never negative. The value $$-8$$ comes from $$-5 - 3$$; $$-2$$ from $$-5 + 3$$.',
      expVn: 'Hiệu là khoảng cách trên trục số — số lớn trừ số bé: $$3 - (-5) = 8$$. Nó không bao giờ âm. Giá trị $$-8$$ là do $$-5 - 3$$; $$-2$$ là do $$-5 + 3$$.',
    },
    {
      id: 'a3_add',
      type: 'mcq',
      title: '3. Work out $$-6 + (-5)$$.',
      options: [
        { val: 'A', text: 'A. $$-11$$' },
        { val: 'B', text: 'B. $$11$$' },
        { val: 'C', text: 'C. $$-1$$' },
        { val: 'D', text: 'D. $$1$$' },
      ],
      correct: 'A',
      expEn: 'Adding a negative moves left: start at $$-6$$, go 5 more left to $$-11$$. Answering $$11$$ uses the multiplying rule (“two negatives make a positive”), which does not apply to adding.',
      expVn: 'Cộng một số âm là đi sang trái: bắt đầu ở $$-6$$, đi thêm 5 sang trái đến $$-11$$. Trả lời $$11$$ là dùng quy tắc nhân (“hai số âm thành số dương”), không áp dụng cho phép cộng.',
    },
    {
      id: 'a4_minusneg',
      type: 'mcq',
      title: '4. Work out $$3 - (-8)$$.',
      options: [
        { val: 'A', text: 'A. $$-5$$' },
        { val: 'B', text: 'B. $$11$$' },
        { val: 'C', text: 'C. $$5$$' },
        { val: 'D', text: 'D. $$-11$$' },
      ],
      correct: 'B',
      expEn: 'Minus a negative becomes plus: $$3 - (-8) = 3 + 8 = 11$$. Answering $$-5$$ treats it as $$3 - 8$$, forgetting that the two minus signs combine into a plus.',
      expVn: 'Trừ số âm thành cộng: $$3 - (-8) = 3 + 8 = 11$$. Trả lời $$-5$$ là coi nó như $$3 - 8$$, quên rằng hai dấu trừ gộp lại thành dấu cộng.',
    },
    {
      id: 'a5_backwards',
      type: 'mcq',
      title: '5. The temperature was $$-2$$ °C. It rose to $$6$$ °C. By how many degrees did it rise?',
      options: [
        { val: 'A', text: 'A. $$4$$' },
        { val: 'B', text: 'B. $$-8$$' },
        { val: 'C', text: 'C. $$-4$$' },
        { val: 'D', text: 'D. $$8$$' },
      ],
      correct: 'D',
      expEn: 'The rise is the gap from $$-2$$ up to $$6$$: $$6 - (-2) = 8$$ degrees. Answering $$4$$ does $$6 - 2$$, forgetting that the start was below zero.',
      expVn: 'Mức tăng là khoảng cách từ $$-2$$ lên $$6$$: $$6 - (-2) = 8$$ độ. Trả lời $$4$$ là làm $$6 - 2$$, quên rằng điểm bắt đầu ở dưới số không.',
    },
    {
      id: 'a6_word',
      type: 'mcq',
      title: '6. A submarine is at $$-30$$ m. It rises $$12$$ m, then dives $$5$$ m. What is its depth now?',
      options: [
        { val: 'A', text: 'A. $$-23$$ m' },
        { val: 'B', text: 'B. $$-47$$ m' },
        { val: 'C', text: 'C. $$-13$$ m' },
        { val: 'D', text: 'D. $$23$$ m' },
      ],
      correct: 'A',
      expEn: 'Work along the sentence: $$-30 + 12 - 5 = -23$$ m. Rising adds, diving subtracts. Answering $$-47$$ treats the rise as a fall too ($$-30 - 12 - 5$$).',
      expVn: 'Làm theo đúng câu: $$-30 + 12 - 5 = -23$$ m. Nổi lên là cộng, lặn xuống là trừ. Trả lời $$-47$$ là coi cả phần nổi lên cũng là đi xuống ($$-30 - 12 - 5$$).',
    },
  ],
};
