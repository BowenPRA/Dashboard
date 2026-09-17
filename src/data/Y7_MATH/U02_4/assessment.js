// src/data/Y7_MATH/U02_4/assessment.js
// Eight questions, one sitting, ten minutes (docs/y7-math/algebra-engines.md
// §1). Maths lives ONLY inside $$…$$ here. 1–2 the key words in context
// (multiply out, expanded), 3–4 the core skill with the two classic slips (a
// number times a letter, a minus inside), 5–6 expand and simplify (one bracket,
// then two with a minus in front), 7 worked backwards, 8 a word problem.
// Distractors are diagnoses: first term only, added not multiplied, lost sign,
// carried on past the answer. No item copies a check, activity or workbook
// question. Correct letters: C A D B A B C D.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_multiply_out',
      type: 'mcq',
      title: '1. **Multiply out** $$6(c + 5)$$.',
      options: [
        { val: 'A', text: 'A. $$6c + 5$$' },
        { val: 'B', text: 'B. $$6c + 11$$' },
        { val: 'C', text: 'C. $$6c + 30$$' },
        { val: 'D', text: 'D. $$36c$$' },
      ],
      correct: 'C',
      expEn: 'Multiply out means expand: $$6 × c = 6c$$ and $$6 × 5 = 30$$. A multiplied only the first term; B added $$6 + 5$$; D carried on past the answer — $$6c$$ and 30 are not like terms.',
      expVn: 'Multiply out nghĩa là khai triển: $$6 × c = 6c$$ và $$6 × 5 = 30$$. A chỉ nhân hạng tử đầu; B cộng $$6 + 5$$; D làm tiếp quá đáp án — $$6c$$ và 30 không đồng dạng.',
    },
    {
      id: 'a2_expanded',
      type: 'mcq',
      title: '2. Which of these is $$4(y − 9)$$ **expanded**?',
      options: [
        { val: 'A', text: 'A. $$4y − 36$$' },
        { val: 'B', text: 'B. $$4y + 36$$' },
        { val: 'C', text: 'C. $$4y − 9$$' },
        { val: 'D', text: 'D. $$−32y$$' },
      ],
      correct: 'A',
      expEn: '$$4 × y = 4y$$ and $$4 × (−9) = −36$$: the minus goes into the box with the 9. B lost the minus sign; C did not multiply the 9; D carried on past the answer.',
      expVn: '$$4 × y = 4y$$ và $$4 × (−9) = −36$$: dấu trừ đi vào ô cùng số 9. B làm mất dấu trừ; C không nhân số 9; D làm tiếp quá đáp án.',
    },
    {
      id: 'a3_number_letter',
      type: 'mcq',
      title: '3. Expand $$7(3m + 2)$$.',
      options: [
        { val: 'A', text: 'A. $$10m + 14$$' },
        { val: 'B', text: 'B. $$21m + 2$$' },
        { val: 'C', text: 'C. $$21m + 9$$' },
        { val: 'D', text: 'D. $$21m + 14$$' },
      ],
      correct: 'D',
      expEn: 'Multiply the numbers and keep the letter: $$7 × 3m = 21m$$, and $$7 × 2 = 14$$. A added $$7 + 3$$; B multiplied only the first term; C added $$7 + 2$$.',
      expVn: 'Nhân các số và giữ chữ cái: $$7 × 3m = 21m$$, và $$7 × 2 = 14$$. A cộng $$7 + 3$$; B chỉ nhân hạng tử đầu; C cộng $$7 + 2$$.',
    },
    {
      id: 'a4_minus_finished',
      type: 'mcq',
      title: '4. Expand $$8(5 − 2k)$$.',
      options: [
        { val: 'A', text: 'A. $$24k$$' },
        { val: 'B', text: 'B. $$40 − 16k$$' },
        { val: 'C', text: 'C. $$40 − 10k$$' },
        { val: 'D', text: 'D. $$40 + 16k$$' },
      ],
      correct: 'B',
      expEn: '$$8 × 5 = 40$$ and $$8 × (−2k) = −16k$$, so $$40 − 16k$$, and stop. A carried on past the answer — 40 and $$16k$$ are not like terms; C added $$8 + 2$$; D lost the minus sign.',
      expVn: '$$8 × 5 = 40$$ và $$8 × (−2k) = −16k$$, nên $$40 − 16k$$, rồi dừng. A làm tiếp quá đáp án — 40 và $$16k$$ không đồng dạng; C cộng $$8 + 2$$; D làm mất dấu trừ.',
    },
    {
      id: 'a5_expand_simplify',
      type: 'mcq',
      title: '5. Expand and simplify $$3(2x + 4) + 5x$$.',
      options: [
        { val: 'A', text: 'A. $$11x + 12$$' },
        { val: 'B', text: 'B. $$11x + 4$$' },
        { val: 'C', text: 'C. $$6x + 12 + 5x$$' },
        { val: 'D', text: 'D. $$23x$$' },
      ],
      correct: 'A',
      expEn: 'Expand: $$6x + 12$$. Collect: $$6x + 5x = 11x$$, so $$11x + 12$$. B multiplied only the first term; C expanded but did not simplify; D collected a number with $$x$$ terms.',
      expVn: 'Khai triển: $$6x + 12$$. Gộp: $$6x + 5x = 11x$$, nên $$11x + 12$$. B chỉ nhân hạng tử đầu; C đã khai triển nhưng chưa rút gọn; D gộp một con số với các hạng tử chứa $$x$$.',
    },
    {
      id: 'a6_two_brackets',
      type: 'mcq',
      title: '6. Expand and simplify $$5(n + 3) − 2(n + 4)$$.',
      options: [
        { val: 'A', text: 'A. $$3n + 23$$' },
        { val: 'B', text: 'B. $$3n + 7$$' },
        { val: 'C', text: 'C. $$7n + 23$$' },
        { val: 'D', text: 'D. $$3n − 1$$' },
      ],
      correct: 'B',
      expEn: 'The −2 goes into both boxes: $$5n + 15 − 2n − 8 = 3n + 7$$. A lost the sign on the 8 ($$−2 × 4 = −8$$); C lost the minus in front of the second bracket; D multiplied only the first term in each bracket.',
      expVn: 'Số −2 đi vào cả hai ô: $$5n + 15 − 2n − 8 = 3n + 7$$. A làm mất dấu ở số 8 ($$−2 × 4 = −8$$); C bỏ mất dấu trừ trước ngoặc thứ hai; D chỉ nhân hạng tử đầu trong mỗi ngoặc.',
    },
    {
      id: 'a7_backwards',
      type: 'mcq',
      title: '7. Find the missing number: $$\\square(3a + 7) = 18a + 42$$.',
      options: [
        { val: 'A', text: 'A. $$15$$' },
        { val: 'B', text: 'B. $$21$$' },
        { val: 'C', text: 'C. $$6$$' },
        { val: 'D', text: 'D. $$35$$' },
      ],
      correct: 'C',
      expEn: 'The box times $$3a$$ makes $$18a$$, so it is $$18 ÷ 3 = 6$$. Check the other box: $$6 × 7 = 42$$. A took away ($$18 − 3$$); B added ($$18 + 3$$); D took away ($$42 − 7$$).',
      expVn: 'Số trong ô nhân $$3a$$ ra $$18a$$, nên số đó là $$18 ÷ 3 = 6$$. Kiểm tra ô còn lại: $$6 × 7 = 42$$. A lấy $$18 − 3$$; B lấy $$18 + 3$$; D lấy $$42 − 7$$.',
    },
    {
      id: 'a8_word_problem',
      type: 'mcq',
      title: '8. Mai buys 4 boxes. Each box has $$p$$ pens and 3 pencils. She gives away 5 pencils. Which expression, in simplest form, shows how many things she has left?',
      options: [
        { val: 'A', text: 'A. $$4p − 2$$' },
        { val: 'B', text: 'B. $$4p + 12$$' },
        { val: 'C', text: 'C. $$11p$$' },
        { val: 'D', text: 'D. $$4p + 7$$' },
      ],
      correct: 'D',
      expEn: 'Four boxes of $$p + 3$$ is $$4(p + 3) = 4p + 12$$; giving away 5 leaves $$4p + 12 − 5 = 4p + 7$$. A multiplied only the $$p$$ ($$4p + 3 − 5$$); B forgot the 5 she gave away; C collected unlike terms.',
      expVn: 'Bốn hộp, mỗi hộp $$p + 3$$ thứ, là $$4(p + 3) = 4p + 12$$; cho đi 5 thì còn $$4p + 12 − 5 = 4p + 7$$. A chỉ nhân $$p$$ ($$4p + 3 − 5$$); B quên 5 cây bút chì đã cho đi; C gộp các hạng tử không đồng dạng.',
    },
  ],
};
