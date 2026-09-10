// src/data/Y7_MATH/U02_1/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Maths lives
// ONLY inside $$…$$ here. 1–2 the key words in context (expression, represent),
// 3–5 the core skill (notation, the word-order flip, subtract-from), 6 a word
// problem with two letters. Distractors are diagnoses; no item copies a check
// or workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_expression',
      type: 'mcq',
      title: '1. Which of these is an expression?',
      options: [
        { val: 'A', text: 'A. $$3k + 1$$' },
        { val: 'B', text: 'B. $$3k + 1 = 10$$' },
        { val: 'C', text: 'C. $$9 + 1 = 10$$' },
        { val: 'D', text: 'D. $$k = 3$$' },
      ],
      correct: 'A',
      expEn: 'An expression has a letter and **no equals sign**: $$3k + 1$$. B and D have an = sign, so they are not expressions; C has an = sign and no letter.',
      expVn: 'Biểu thức có chữ cái và **không có dấu bằng**: $$3k + 1$$. B và D có dấu =, nên không phải biểu thức; C có dấu = và không có chữ cái.',
    },
    {
      id: 'a2_represent',
      type: 'mcq',
      title: '2. A bag holds some rice. We write the amount as $$r$$ grams. What does $$r$$ represent?',
      options: [
        { val: 'A', text: 'A. The bag' },
        { val: 'B', text: 'B. The number of grams of rice' },
        { val: 'C', text: 'C. One grain of rice' },
        { val: 'D', text: 'D. The letter r' },
      ],
      correct: 'B',
      expEn: 'A letter represents a **number** we do not know — here, how many grams there are. It is not the bag, not a grain, and not the letter itself.',
      expVn: 'Một chữ cái đại diện cho một **con số** ta chưa biết — ở đây là số gam gạo. Nó không phải cái túi, không phải một hạt gạo, và không phải bản thân chữ cái.',
    },
    {
      id: 'a3_notation',
      type: 'mcq',
      title: '3. Which is the short way of writing $$7 × m × n$$?',
      options: [
        { val: 'A', text: 'A. $$mn7$$' },
        { val: 'B', text: 'B. $$7 + m + n$$' },
        { val: 'C', text: 'C. $$7mn$$' },
        { val: 'D', text: 'D. $$7m + n$$' },
      ],
      correct: 'C',
      expEn: 'Drop the × signs and put the number in front: $$7mn$$. A puts the number at the end; B and D turn multiplying into adding — only the × sign disappears.',
      expVn: 'Bỏ các dấu × và đặt số đứng trước: $$7mn$$. A đặt số ở cuối; B và D biến phép nhân thành phép cộng — chỉ dấu × mới biến mất.',
    },
    {
      id: 'a4_less_than',
      type: 'mcq',
      title: '4. Write an expression for **6 less than $$t$$**.',
      options: [
        { val: 'A', text: 'A. $$6 − t$$' },
        { val: 'B', text: 'B. $$6t$$' },
        { val: 'C', text: 'C. $$t + 6$$' },
        { val: 'D', text: 'D. $$t − 6$$' },
      ],
      correct: 'D',
      expEn: 'Start from $$t$$ and take 6 away: $$t − 6$$. Check with numbers — 6 less than 10 is 4, which is $$10 − 6$$. A has the order backwards; B multiplies; C adds.',
      expVn: 'Bắt đầu từ $$t$$ rồi bớt 6: $$t − 6$$. Thử bằng số — 6 less than 10 là 4, tức là $$10 − 6$$. A viết ngược thứ tự; B nhân; C cộng.',
    },
    {
      id: 'a5_subtract_from',
      type: 'mcq',
      title: '5. Multiply $$x$$ by 2, then subtract the result from 9. Which expression is that?',
      options: [
        { val: 'A', text: 'A. $$2x − 9$$' },
        { val: 'B', text: 'B. $$9 − 2x$$' },
        { val: 'C', text: 'C. $$7x$$' },
        { val: 'D', text: 'D. $$2(x − 9)$$' },
      ],
      correct: 'B',
      expEn: 'The result is $$2x$$. "Subtract the result **from 9**" starts at 9: $$9 − 2x$$. A is "subtract 9" (no "from"); C subtracts before multiplying; D subtracts 9 from $$x$$ first.',
      expVn: 'Kết quả là $$2x$$. "Lấy **9** trừ đi kết quả" bắt đầu từ 9: $$9 − 2x$$. A là "trừ đi 9" (không có "from"); C trừ trước khi nhân; D lấy $$x$$ trừ 9 trước.',
    },
    {
      id: 'a6_word_problem',
      type: 'mcq',
      title: '6. A big bottle holds $$b$$ ml and a small bottle holds $$s$$ ml. Mr Bowen pours **two** big bottles and **four** small bottles into a bucket. Which expression gives the total?',
      options: [
        { val: 'A', text: 'A. $$6bs$$' },
        { val: 'B', text: 'B. $$2b + 4s$$' },
        { val: 'C', text: 'C. $$b + s + 6$$' },
        { val: 'D', text: 'D. $$8bs$$' },
      ],
      correct: 'B',
      expEn: 'Two big bottles: $$2b$$. Four small: $$4s$$. "Total" → add: $$2b + 4s$$. Two sizes mean two letters that cannot be combined, so A and D (which multiply them) and C (which adds a bare 6) are wrong.',
      expVn: 'Hai chai lớn: $$2b$$. Bốn chai nhỏ: $$4s$$. "Tổng" → cộng: $$2b + 4s$$. Hai cỡ khác nhau nghĩa là hai chữ cái không gộp được, nên A và D (nhân chúng) và C (cộng thêm số 6) đều sai.',
    },
  ],
};
