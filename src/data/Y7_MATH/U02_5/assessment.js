// src/data/Y7_MATH/U02_5/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 the key word (inverse operation), 2–3 one-step equations, 4 checking
// a solution, 5–6 two steps (one with a bracket), 7–8 word problems (the
// equation for "I think of a number", a negative answer). Every distractor is
// a diagnosis: did the operation instead of its inverse, undid in the wrong
// order, swapped the order in a word problem, or a failed (or faked) check.
// No item copies a deck check, a workbook question or an Undo It item.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_inverse',
      type: 'mcq',
      title: '1. What is the inverse operation of $$× 8$$?',
      options: [
        { val: 'A', text: 'A. $$− 8$$' },
        { val: 'B', text: 'B. $$÷ 8$$' },
        { val: 'C', text: 'C. $$+ 8$$' },
        { val: 'D', text: 'D. $$× 8$$' },
      ],
      correct: 'B',
      expEn: 'The inverse operation undoes it: $$× 8$$ is undone by $$÷ 8$$ ($$3 × 8 = 24$$ and $$24 ÷ 8 = 3$$). A and C are the wrong kind of operation — $$+$$ and $$−$$ undo each other, not $$×$$. D does the same operation again.',
      expVn: 'Phép toán ngược làm mất tác dụng của nó: $$× 8$$ được làm ngược bằng $$÷ 8$$ ($$3 × 8 = 24$$ và $$24 ÷ 8 = 3$$). A và C sai loại phép toán — $$+$$ và $$−$$ làm ngược nhau, không làm ngược $$×$$. D là làm lại chính phép đó.',
    },
    {
      id: 'a2_one_step_minus',
      type: 'mcq',
      title: '2. Solve $$x − 12 = 7$$.',
      options: [
        { val: 'A', text: 'A. $$x = −5$$' },
        { val: 'B', text: 'B. $$x = 5$$' },
        { val: 'C', text: 'C. $$x = 19$$' },
        { val: 'D', text: 'D. $$x = 84$$' },
      ],
      correct: 'C',
      expEn: 'Undo $$− 12$$ with $$+ 12$$: $$7 + 12 = 19$$. Check: $$19 − 12 = 7$$. A did the subtraction instead of undoing it ($$7 − 12$$); B took 7 from 12, the wrong way round; D multiplied.',
      expVn: 'Làm ngược $$− 12$$ bằng $$+ 12$$: $$7 + 12 = 19$$. Thử lại: $$19 − 12 = 7$$. A làm luôn phép trừ thay vì làm ngược ($$7 − 12$$); B lấy 12 trừ 7, ngược chiều; D nhân.',
    },
    {
      id: 'a3_one_step_divide',
      type: 'mcq',
      title: '3. Solve $$\\frac{k}{4} = 9$$.',
      options: [
        { val: 'A', text: 'A. $$k = 36$$' },
        { val: 'B', text: 'B. $$k = \\frac{9}{4}$$' },
        { val: 'C', text: 'C. $$k = 13$$' },
        { val: 'D', text: 'D. $$k = 5$$' },
      ],
      correct: 'A',
      expEn: 'The fraction line means $$÷ 4$$, and $$× 4$$ undoes it: $$9 × 4 = 36$$. Check: $$36 ÷ 4 = 9$$. B divided again instead of undoing the division; C added 4 and D subtracted 4 — the wrong kind of inverse.',
      expVn: 'Vạch phân số nghĩa là $$÷ 4$$, và $$× 4$$ làm ngược nó: $$9 × 4 = 36$$. Thử lại: $$36 ÷ 4 = 9$$. B lại chia tiếp thay vì làm ngược phép chia; C cộng 4 và D trừ 4 — sai loại phép ngược.',
    },
    {
      id: 'a4_check',
      type: 'mcq',
      title: '4. Lan says the solution of $$5x = 35$$ is $$x = 30$$. What does checking her answer show?',
      options: [
        { val: 'A', text: 'A. $$30 + 5 = 35$$, so Lan is right.' },
        { val: 'B', text: 'B. $$35 − 30 = 5$$, so Lan is right.' },
        { val: 'C', text: 'C. $$30 ÷ 5 = 6$$, so $$x = 6$$.' },
        { val: 'D', text: 'D. $$5 × 30 = 150$$, not $$35$$, so Lan is wrong: $$x = 7$$.' },
      ],
      correct: 'D',
      expEn: 'To check, substitute into the equation as it is written: $$5x$$ means $$5 × x$$, and $$5 × 30 = 150$$, not $$35$$. The right answer is $$35 ÷ 5 = 7$$. A and B "check" with a different operation from the one in the equation, so a wrong answer seems to pass. C divides Lan\'s answer instead of the 35.',
      expVn: 'Để thử lại, thay vào đúng phương trình đã viết: $$5x$$ nghĩa là $$5 × x$$, và $$5 × 30 = 150$$, không phải $$35$$. Đáp án đúng là $$35 ÷ 5 = 7$$. A và B "thử lại" bằng một phép toán khác với phép trong phương trình, nên đáp án sai trông như đúng. C chia đáp án của Lan thay vì chia 35.',
    },
    {
      id: 'a5_two_step',
      type: 'mcq',
      title: '5. Solve $$3a + 6 = 27$$.',
      options: [
        { val: 'A', text: 'A. $$a = 7$$' },
        { val: 'B', text: 'B. $$a = 3$$' },
        { val: 'C', text: 'C. $$a = 11$$' },
        { val: 'D', text: 'D. $$a = 99$$' },
      ],
      correct: 'A',
      expEn: 'Undo the last step first: $$27 − 6 = 21$$, then $$21 ÷ 3 = 7$$. Check: $$3 × 7 + 6 = 27$$. B divided first ($$27 ÷ 3 = 9$$, $$9 − 6 = 3$$) — the wrong order. C added the 6 instead of taking it away. D did both operations instead of undoing them.',
      expVn: 'Làm ngược bước cuối trước: $$27 − 6 = 21$$, rồi $$21 ÷ 3 = 7$$. Thử lại: $$3 × 7 + 6 = 27$$. B chia trước ($$27 ÷ 3 = 9$$, $$9 − 6 = 3$$) — sai thứ tự. C cộng 6 thay vì trừ 6. D làm cả hai phép toán thay vì làm ngược chúng.',
    },
    {
      id: 'a6_bracket',
      type: 'mcq',
      title: '6. Solve $$2(x + 4) = 20$$.',
      options: [
        { val: 'A', text: 'A. $$x = 8$$' },
        { val: 'B', text: 'B. $$x = 6$$' },
        { val: 'C', text: 'C. $$x = 14$$' },
        { val: 'D', text: 'D. $$x = 16$$' },
      ],
      correct: 'B',
      expEn: 'Brackets first: $$x$$ had 4 added, then was multiplied by 2. So undo $$× 2$$ first: $$20 ÷ 2 = 10$$, then $$10 − 4 = 6$$. Check: $$2 × (6 + 4) = 20$$. A undid the $$+ 4$$ first ($$20 − 4 = 16$$, $$16 ÷ 2 = 8$$) — the wrong order. C added the 4 instead of taking it away. D never undid the $$× 2$$.',
      expVn: 'Ngoặc trước: $$x$$ được cộng 4, rồi nhân với 2. Vậy làm ngược $$× 2$$ trước: $$20 ÷ 2 = 10$$, rồi $$10 − 4 = 6$$. Thử lại: $$2 × (6 + 4) = 20$$. A làm ngược $$+ 4$$ trước ($$20 − 4 = 16$$, $$16 ÷ 2 = 8$$) — sai thứ tự. C cộng 4 thay vì trừ 4. D chưa làm ngược $$× 2$$.',
    },
    {
      id: 'a7_think_of_a_number',
      type: 'mcq',
      title: '7. "I think of a number, add 5, then multiply by 3. The answer is 36." Which equation says this?',
      options: [
        { val: 'A', text: 'A. $$3n + 5 = 36$$' },
        { val: 'B', text: 'B. $$n + 5 = 36$$' },
        { val: 'C', text: 'C. $$3(n − 5) = 36$$' },
        { val: 'D', text: 'D. $$3(n + 5) = 36$$' },
      ],
      correct: 'D',
      expEn: 'The 5 is added first, so it goes nearest the letter: $$n + 5$$. Then the whole of that is multiplied by 3, which needs a bracket: $$3(n + 5) = 36$$ (so $$n = 7$$). A swaps the order — it multiplies first. B leaves out the $$× 3$$. C writes the inverse of $$+ 5$$.',
      expVn: 'Số 5 được cộng trước, nên nằm gần chữ cái nhất: $$n + 5$$. Rồi cả biểu thức đó nhân với 3, nên cần dấu ngoặc: $$3(n + 5) = 36$$ (vậy $$n = 7$$). A đổi thứ tự — nhân trước. B bỏ mất $$× 3$$. C viết phép ngược của $$+ 5$$.',
    },
    {
      id: 'a8_negative',
      type: 'mcq',
      title: '8. A lift starts at floor $$f$$. It goes up 11 floors and stops at floor 3. Which floor did it start at?',
      options: [
        { val: 'A', text: 'A. Floor $$14$$' },
        { val: 'B', text: 'B. Floor $$8$$' },
        { val: 'C', text: 'C. Floor $$−8$$' },
        { val: 'D', text: 'D. Floor $$−14$$' },
      ],
      correct: 'C',
      expEn: 'Going up 11 is $$+ 11$$: $$f + 11 = 3$$. Undo it: $$3 − 11 = −8$$, a floor below the ground. Check: $$−8 + 11 = 3$$. A added the 11 instead of undoing it. B worked out $$11 − 3$$, the wrong way round. D put a minus sign on the wrong sum.',
      expVn: 'Đi lên 11 tầng là $$+ 11$$: $$f + 11 = 3$$. Làm ngược: $$3 − 11 = −8$$, một tầng dưới mặt đất. Thử lại: $$−8 + 11 = 3$$. A cộng thêm 11 thay vì làm ngược. B tính $$11 − 3$$, ngược chiều. D đặt dấu trừ cho một phép cộng sai.',
    },
  ],
};
