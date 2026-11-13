// src/data/ACELLUS/ALG_QUAD/assessment.js
// The unit quiz. Twelve items, timed, in the shapes Acellus uses for this
// topic: factor it, find the zeros, read a, b, c, the discriminant, the
// formula with a √ answer. Every explanation names why the wrong options are
// wrong — the review screen is where the teaching happens for a student who
// missed it.
//
// MATHS MARKUP: Assessment.jsx parses ONLY `$$…$$` (rendered inline).
// The key is spread across all four letters (the validator warns otherwise).

export const assessment = {
  timeLimit: 1500, // 25 minutes
  passages: [],
  questions: [
    {
      id: 'q1_factor',
      type: 'mcq',
      title: '1. Factor completely:  $$x^2 + 8x + 15$$',
      options: [
        { val: 'A', text: 'A. $$(x + 3)(x + 5)$$' },
        { val: 'B', text: 'B. $$(x + 1)(x + 15)$$' },
        { val: 'C', text: 'C. $$(x - 3)(x - 5)$$' },
        { val: 'D', text: 'D. $$(x + 8)(x + 15)$$' },
      ],
      correct: 'A',
      expEn: 'Two numbers that multiply to 15 and add to 8: 3 and 5. B multiplies to 15 but adds to 16. C gives $$-8x$$ in the middle. D copies b and c into the brackets.',
      expVn: 'Hai số có tích bằng 15 và tổng bằng 8: 3 và 5. B có tích 15 nhưng tổng 16. C cho hạng tử giữa là $$-8x$$. D chép b và c vào ngoặc.',
    },
    {
      id: 'q2_signs',
      type: 'mcq',
      title: '2. Factor:  $$x^2 - 3x - 28$$',
      options: [
        { val: 'A', text: 'A. $$(x + 7)(x - 4)$$' },
        { val: 'B', text: 'B. $$(x - 7)(x + 4)$$' },
        { val: 'C', text: 'C. $$(x - 7)(x - 4)$$' },
        { val: 'D', text: 'D. $$(x - 14)(x + 2)$$' },
      ],
      correct: 'B',
      expEn: 'c = −28 is negative, so the signs are opposite; b = −3, so the bigger number is negative: $$-7 + 4 = -3$$. A gives $$+3x$$. C multiplies to +28. D multiplies to −28 but adds to −12.',
      expVn: 'c = −28 âm, nên hai số trái dấu; b = −3, nên số lớn hơn âm: $$-7 + 4 = -3$$. A cho $$+3x$$. C có tích +28. D có tích −28 nhưng tổng −12.',
    },
    {
      id: 'q3_zeros',
      type: 'mcq',
      title: '3. What are the zeros of  $$y = (x - 2)(x + 9)$$?',
      options: [
        { val: 'A', text: 'A. $$x = -2$$ and $$x = 9$$' },
        { val: 'B', text: 'B. $$x = 2$$ and $$x = 9$$' },
        { val: 'C', text: 'C. $$x = 2$$ and $$x = -9$$' },
        { val: 'D', text: 'D. $$x = -18$$' },
      ],
      correct: 'C',
      expEn: 'Set y = 0 and use the zero product property: $$x - 2 = 0$$ gives 2, $$x + 9 = 0$$ gives −9. A copies the signs out of the brackets. D multiplies the numbers — that is the constant term, not a zero.',
      expVn: 'Cho y = 0 và dùng tính chất tích bằng 0: $$x - 2 = 0$$ cho 2, $$x + 9 = 0$$ cho −9. A chép nguyên dấu trong ngoặc. D nhân hai số — đó là hạng tử tự do, không phải nghiệm.',
    },
    {
      id: 'q4_standard',
      type: 'mcq',
      title: '4. Solve:  $$x^2 + 2x = 24$$',
      options: [
        { val: 'A', text: 'A. $$x = 4$$ or $$x = -6$$' },
        { val: 'B', text: 'B. $$x = -4$$ or $$x = 6$$' },
        { val: 'C', text: 'C. $$x = 2$$ or $$x = 12$$' },
        { val: 'D', text: 'D. $$x = 22$$' },
      ],
      correct: 'A',
      expEn: 'Standard form first: $$x^2 + 2x - 24 = 0$$, then $$(x + 6)(x - 4) = 0$$, so $$x = -6$$ or $$x = 4$$. B has the signs flipped. D treats it as linear and loses the square.',
      expVn: 'Đưa về dạng chuẩn trước: $$x^2 + 2x - 24 = 0$$, rồi $$(x + 6)(x - 4) = 0$$, nên $$x = -6$$ hoặc $$x = 4$$. B bị ngược dấu. D coi như phương trình bậc nhất và bỏ mất bình phương.',
    },
    {
      id: 'q5_gcf',
      type: 'mcq',
      title: '5. Factor completely:  $$3x^2 - 12x - 36$$',
      options: [
        { val: 'A', text: 'A. $$(3x - 18)(x + 2)$$' },
        { val: 'B', text: 'B. $$3(x^2 - 4x - 12)$$' },
        { val: 'C', text: 'C. $$(x - 6)(x + 2)$$' },
        { val: 'D', text: 'D. $$3(x - 6)(x + 2)$$' },
      ],
      correct: 'D',
      expEn: 'Take out 3, then factor the inside: $$x^2 - 4x - 12 = (x - 6)(x + 2)$$. B stops halfway — "completely" means the brackets too. A is equal but still has a common factor of 3 inside. C has lost the 3 altogether.',
      expVn: 'Đặt 3 ra ngoài, rồi phân tích phần trong: $$x^2 - 4x - 12 = (x - 6)(x + 2)$$. B dừng giữa chừng — "hoàn toàn" nghĩa là phân tích cả ngoặc. A bằng nhưng trong ngoặc vẫn còn nhân tử chung 3. C làm mất số 3.',
    },
    {
      id: 'q6_ac',
      type: 'mcq',
      title: '6. Factor:  $$2x^2 + 5x - 3$$',
      options: [
        { val: 'A', text: 'A. $$(2x + 1)(x - 3)$$' },
        { val: 'B', text: 'B. $$(2x - 1)(x + 3)$$' },
        { val: 'C', text: 'C. $$(2x + 3)(x - 1)$$' },
        { val: 'D', text: 'D. $$(2x - 3)(x + 1)$$' },
      ],
      correct: 'B',
      expEn: 'a × c = −6; the pair that adds to 5 is 6 and −1. Split: $$2x^2 + 6x - x - 3 = 2x(x + 3) - 1(x + 3) = (2x - 1)(x + 3)$$. Multiply the others out: A gives $$-5x$$, C gives $$+x$$, D gives $$-x$$.',
      expVn: 'a × c = −6; cặp có tổng bằng 5 là 6 và −1. Tách: $$2x^2 + 6x - x - 3 = 2x(x + 3) - 1(x + 3) = (2x - 1)(x + 3)$$. Nhân các phương án khác ra: A cho $$-5x$$, C cho $$+x$$, D cho $$-x$$.',
    },
    {
      id: 'q7_ac_zeros',
      type: 'fill_blank',
      title: '7. One solution of  $$2x^2 + 5x - 3 = 0$$  is  $$x = -3$$. What is the other? (Type a fraction like 1/2.)',
      textParts: ['$$x =$$', ''],
      textPartsVn: ['$$x =$$', ''],
      blanks: {
        1: { correct: '1/2', width: 5, accept: ['0.5', '.5'] },
      },
      expEn: 'The factors are $$(2x - 1)(x + 3)$$. Set $$2x - 1 = 0$$: $$2x = 1$$, so $$x = \\frac{1}{2}$$. Remember to divide by the 2 in front of x.',
      expVn: 'Các nhân tử là $$(2x - 1)(x + 3)$$. Cho $$2x - 1 = 0$$: $$2x = 1$$, nên $$x = \\frac{1}{2}$$. Nhớ chia cho số 2 đứng trước x.',
    },
    {
      id: 'q8_diff',
      type: 'mcq',
      title: '8. Solve:  $$x^2 - 81 = 0$$',
      options: [
        { val: 'A', text: 'A. $$x = 9$$ only' },
        { val: 'B', text: 'B. $$x = 81$$ or $$x = -81$$' },
        { val: 'C', text: 'C. $$x = 9$$ or $$x = -9$$' },
        { val: 'D', text: 'D. No real solutions' },
      ],
      correct: 'C',
      expEn: '$$x^2 - 81 = (x + 9)(x - 9)$$, so $$x = \\pm 9$$. A forgets that $$(-9)^2 = 81$$ too. B forgets to take the square root. D would be right for $$x^2 + 81 = 0$$.',
      expVn: '$$x^2 - 81 = (x + 9)(x - 9)$$, nên $$x = \\pm 9$$. A quên rằng $$(-9)^2 = 81$$ cũng đúng. B quên lấy căn. D đúng cho $$x^2 + 81 = 0$$.',
    },
    {
      id: 'q9_disc',
      type: 'fill_blank',
      title: '9. Find the discriminant of  $$2x^2 - 3x - 5 = 0$$',
      textParts: ['$$b^2 - 4ac =$$', ''],
      textPartsVn: ['$$b^2 - 4ac =$$', ''],
      blanks: {
        1: { correct: '49', width: 5, accept: [] },
      },
      expEn: '$$(-3)^2 - 4(2)(-5) = 9 + 40 = 49$$. Square the negative b in brackets (9, not −9), and a negative c makes $$-4ac$$ positive. 49 is a perfect square, so this quadratic factors: $$(2x - 5)(x + 1)$$.',
      expVn: '$$(-3)^2 - 4(2)(-5) = 9 + 40 = 49$$. Bình phương b âm trong ngoặc (9, không phải −9), và c âm làm $$-4ac$$ dương. 49 là số chính phương, nên phương trình phân tích được: $$(2x - 5)(x + 1)$$.',
    },
    {
      id: 'q10_count',
      type: 'mcq',
      title: '10. How many real solutions does  $$3x^2 - 2x + 4 = 0$$  have?',
      options: [
        { val: 'A', text: 'A. Two' },
        { val: 'B', text: 'B. One' },
        { val: 'C', text: 'C. Infinitely many' },
        { val: 'D', text: 'D. None' },
      ],
      correct: 'D',
      expEn: '$$b^2 - 4ac = 4 - 48 = -44$$, negative, so there are no real solutions: the parabola never reaches the x-axis. A quadratic can never have infinitely many solutions.',
      expVn: '$$b^2 - 4ac = 4 - 48 = -44$$, âm, nên vô nghiệm thực: parabol không bao giờ chạm trục x. Phương trình bậc hai không bao giờ có vô số nghiệm.',
    },
    {
      id: 'q11_formula',
      type: 'mcq',
      title: '11. Solve with the quadratic formula:  $$x^2 - 6x + 4 = 0$$',
      options: [
        { val: 'A', text: 'A. $$x = 3 \\pm \\sqrt{5}$$' },
        { val: 'B', text: 'B. $$x = -3 \\pm \\sqrt{5}$$' },
        { val: 'C', text: 'C. $$x = 6 \\pm 2\\sqrt{5}$$' },
        { val: 'D', text: 'D. $$x = 3 \\pm 2\\sqrt{5}$$' },
      ],
      correct: 'A',
      expEn: '$$b^2 - 4ac = 36 - 16 = 20$$ and $$\\sqrt{20} = 2\\sqrt{5}$$. So $$x = \\frac{6 \\pm 2\\sqrt{5}}{2} = 3 \\pm \\sqrt{5}$$. B starts from b instead of −b. C forgets to divide by 2a. D divides the 6 but not the root.',
      expVn: '$$b^2 - 4ac = 36 - 16 = 20$$ và $$\\sqrt{20} = 2\\sqrt{5}$$. Vậy $$x = \\frac{6 \\pm 2\\sqrt{5}}{2} = 3 \\pm \\sqrt{5}$$. B bắt đầu từ b thay vì −b. C quên chia cho 2a. D chia số 6 nhưng không chia phần căn.',
    },
    {
      id: 'q12_formula_frac',
      type: 'mcq',
      title: '12. Use the quadratic formula to solve  $$3x^2 + 5x - 2 = 0$$',
      options: [
        { val: 'A', text: 'A. $$x = 2$$ or $$x = -\\frac{1}{3}$$' },
        { val: 'B', text: 'B. $$x = -2$$ or $$x = \\frac{1}{3}$$' },
        { val: 'C', text: 'C. $$x = -1$$ or $$x = \\frac{2}{3}$$' },
        { val: 'D', text: 'D. $$x = -12$$ or $$x = 2$$' },
      ],
      correct: 'B',
      expEn: '$$b^2 - 4ac = 25 + 24 = 49$$, $$\\sqrt{49} = 7$$, so $$x = \\frac{-5 \\pm 7}{6}$$: $$\\frac{2}{6} = \\frac{1}{3}$$ or $$\\frac{-12}{6} = -2$$. A has both signs flipped (b used instead of −b). D forgot to divide by 2a = 6.',
      expVn: '$$b^2 - 4ac = 25 + 24 = 49$$, $$\\sqrt{49} = 7$$, nên $$x = \\frac{-5 \\pm 7}{6}$$: $$\\frac{2}{6} = \\frac{1}{3}$$ hoặc $$\\frac{-12}{6} = -2$$. A bị ngược cả hai dấu (dùng b thay vì −b). D quên chia cho 2a = 6.',
    },
  ],
};
