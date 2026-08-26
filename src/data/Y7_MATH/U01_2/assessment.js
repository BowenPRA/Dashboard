// src/data/Y7_MATH/U01_2/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Comes last,
// behind an 80 XP gate. Maths lives ONLY inside $$…$$ here — a single $ is
// literal in Assessment.jsx, the opposite of notes/workbook.
//
// Shape: 1–2 key words used in context, 3–5 the core skill (one routine, one
// with the classic mistake as a distractor, one worked backwards), 6 a word
// problem. Every distractor is a diagnosis — the number you reach by making one
// nameable mistake — and no item copies a check or workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_product',
      type: 'mcq',
      title: '1. Find the product of $$-8$$ and $$5$$.',
      options: [
        { val: 'A', text: 'A. $$-40$$' },
        { val: 'B', text: 'B. $$40$$' },
        { val: 'C', text: 'C. $$-3$$' },
        { val: 'D', text: 'D. $$13$$' },
      ],
      correct: 'A',
      expEn: '“Product” means multiply: $$-8 × 5 = -40$$ (different signs → negative). The value $$-3$$ comes from adding, $$-8 + 5$$ — reading “product” as “sum”.',
      expVn: '“Product” (tích) nghĩa là nhân: $$-8 × 5 = -40$$ (khác dấu → âm). Giá trị $$-3$$ là do cộng, $$-8 + 5$$ — hiểu nhầm “product” thành “tổng”.',
    },
    {
      id: 'a2_quotient',
      type: 'mcq',
      title: '2. What is the quotient when $$-45$$ is divided by $$-9$$?',
      options: [
        { val: 'A', text: 'A. $$-5$$' },
        { val: 'B', text: 'B. $$5$$' },
        { val: 'C', text: 'C. $$54$$' },
        { val: 'D', text: 'D. $$-54$$' },
      ],
      correct: 'B',
      expEn: 'A “quotient” is the answer to a division: $$-45 ÷ -9$$. Same signs → positive, so the quotient is $$5$$. Choosing $$-5$$ forgets that division follows the same sign rules as multiplication.',
      expVn: '“Quotient” (thương) là kết quả của phép chia: $$-45 ÷ -9$$. Cùng dấu → dương, nên thương là $$5$$. Chọn $$-5$$ là quên rằng phép chia theo cùng quy tắc dấu như phép nhân.',
    },
    {
      id: 'a3_routine',
      type: 'mcq',
      title: '3. Work out $$-7 × -8$$.',
      options: [
        { val: 'A', text: 'A. $$-56$$' },
        { val: 'B', text: 'B. $$-15$$' },
        { val: 'C', text: 'C. $$15$$' },
        { val: 'D', text: 'D. $$56$$' },
      ],
      correct: 'D',
      expEn: 'Two negatives multiplied give a positive: $$-7 × -8 = 56$$. Answering $$-56$$ keeps the sign negative; $$-15$$ comes from adding the two numbers instead of multiplying.',
      expVn: 'Hai số âm nhân nhau cho kết quả dương: $$-7 × -8 = 56$$. Trả lời $$-56$$ là giữ dấu âm; $$-15$$ là do cộng hai số thay vì nhân.',
    },
    {
      id: 'a4_brackets',
      type: 'mcq',
      title: '4. Work out $$24 ÷ (-2 + -1)$$.',
      options: [
        { val: 'A', text: 'A. $$8$$' },
        { val: 'B', text: 'B. $$-8$$' },
        { val: 'C', text: 'C. $$-3$$' },
        { val: 'D', text: 'D. $$3$$' },
      ],
      correct: 'B',
      expEn: 'Do the bracket first — it is an addition, so $$-2 + -1 = -3$$. Then $$24 ÷ -3 = -8$$. Getting $$8$$ means you wrongly made the bracket $$+3$$, applying “two negatives make a positive” to an addition.',
      expVn: 'Làm trong ngoặc trước — đó là phép cộng, nên $$-2 + -1 = -3$$. Rồi $$24 ÷ -3 = -8$$. Ra $$8$$ nghĩa là em đã sai khi cho ngoặc bằng $$+3$$, áp dụng “hai số âm thành số dương” cho phép cộng.',
    },
    {
      id: 'a5_backwards',
      type: 'mcq',
      title: '5. Which number makes this true? $$-6 × \\square = 54$$',
      options: [
        { val: 'A', text: 'A. $$-9$$' },
        { val: 'B', text: 'B. $$9$$' },
        { val: 'C', text: 'C. $$48$$' },
        { val: 'D', text: 'D. $$-48$$' },
      ],
      correct: 'A',
      expEn: 'The answer $$54$$ is positive and one factor is negative, so the missing number must be negative. $$54 ÷ 6 = 9$$, so it is $$-9$$. Check: $$-6 × -9 = 54$$.',
      expVn: 'Đáp án $$54$$ là dương mà một thừa số đã âm, nên số còn thiếu phải âm. $$54 ÷ 6 = 9$$, nên đó là $$-9$$. Thử lại: $$-6 × -9 = 54$$.',
    },
    {
      id: 'a6_word',
      type: 'mcq',
      title: '6. A submarine dives at a steady rate, going down $$7$$ metres every minute for $$8$$ minutes. What is its total change in depth?',
      options: [
        { val: 'A', text: 'A. $$56$$ m' },
        { val: 'B', text: 'B. $$1$$ m' },
        { val: 'C', text: 'C. $$-56$$ m' },
        { val: 'D', text: 'D. $$15$$ m' },
      ],
      correct: 'C',
      expEn: 'Going down is negative, at $$-7$$ m each minute for $$8$$ minutes: $$8 × -7 = -56$$ m. The value $$56$$ drops the sign; $$1$$ comes from adding, $$8 + -7$$.',
      expVn: 'Đi xuống là âm, $$-7$$ m mỗi phút trong $$8$$ phút: $$8 × -7 = -56$$ m. Giá trị $$56$$ là bỏ mất dấu; $$1$$ là do cộng, $$8 + -7$$.',
    },
  ],
};
