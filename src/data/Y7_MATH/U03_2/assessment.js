// src/data/Y7_MATH/U03_2/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 the instruction words, 2 counting decimal places, 3 the rule (with
// the rounded-twice trap), 4 the trailing zeros, 5 the nearest 10, 6 a short
// division finished by adding zeros, 7 a division correct to 2 d.p. (one place
// further), 8 a story that needs the division AND the zero. Every distractor
// is a diagnosis: chopped instead of rounded, dropped the zero, counted places
// from the front, rounded twice, wrote 10 in one column, stopped dividing too
// early, or left it unrounded. No item copies a deck check, a workbook
// question or a Bus Stop item.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_words',
      type: 'mcq',
      title: '1. Which instruction does NOT tell you to round the answer?',
      options: [
        { val: 'A', text: 'A. "Round it to 2 decimal places."' },
        { val: 'B', text: 'B. "Give your answer correct to 2 decimal places."' },
        { val: 'C', text: 'C. "Work it out as far as 2 decimal places."' },
        { val: 'D', text: 'D. "Write it to 2 d.p."' },
      ],
      correct: 'C',
      expEn: '"As far as" means keep dividing until you reach that place, write the digits you have, and stop — nothing is rounded. "Round to", "correct to" and "to 2 d.p." (A, B and D) are three ways of asking for the same job: round the answer.',
      expVn: '"As far as" nghĩa là cứ chia cho đến vị trí đó, viết các chữ số em có, rồi dừng — không làm tròn gì cả. "Round to", "correct to" và "to 2 d.p." (A, B và D) là ba cách nói cùng một việc: làm tròn đáp án.',
    },
    {
      id: 'a2_places',
      type: 'mcq',
      title: '2. How many decimal places does $$0.0807$$ have?',
      options: [
        { val: 'A', text: 'A. $$4$$' },
        { val: 'B', text: 'B. $$2$$' },
        { val: 'C', text: 'C. $$3$$' },
        { val: 'D', text: 'D. $$5$$' },
      ],
      correct: 'A',
      expEn: 'Count every digit after the point: 0, 8, 0, 7 — four. B counts only the digits that are not zero. C leaves out the zero straight after the point. D also counts the 0 in front of the point, but decimal places are counted from the point, not from the front of the number.',
      expVn: 'Đếm mọi chữ số sau dấu thập phân: 0, 8, 0, 7 — bốn. B chỉ đếm những chữ số khác 0. C bỏ sót số 0 ngay sau dấu thập phân. D đếm cả số 0 đứng trước dấu thập phân, nhưng chữ số thập phân được đếm từ dấu thập phân, không phải từ đầu số.',
    },
    {
      id: 'a3_rule',
      type: 'mcq',
      title: '3. Round $$18.349$$ to 1 decimal place.',
      options: [
        { val: 'A', text: 'A. $$18.4$$' },
        { val: 'B', text: 'B. $$18.35$$' },
        { val: 'C', text: 'C. $$18$$' },
        { val: 'D', text: 'D. $$18.3$$' },
      ],
      correct: 'D',
      expEn: 'The digit straight after the 3 tenths is 4, which is 4 or less, so the 3 stays: $$18.3$$. A rounds twice — to $$18.35$$ first, then up again. B is 2 decimal places. C is the nearest whole number.',
      expVn: 'Chữ số ngay sau 3 phần mười là 4, từ 4 trở xuống, nên số 3 giữ nguyên: $$18.3$$. A là làm tròn hai lần — thành $$18.35$$ trước, rồi lại làm tròn lên. B là 2 chữ số thập phân. C là số nguyên gần nhất.',
    },
    {
      id: 'a4_zeros',
      type: 'mcq',
      title: '4. Round $$5.996$$ to 2 decimal places.',
      options: [
        { val: 'A', text: 'A. $$6$$' },
        { val: 'B', text: 'B. $$6.00$$' },
        { val: 'C', text: 'C. $$5.99$$' },
        { val: 'D', text: 'D. $$5.910$$' },
      ],
      correct: 'B',
      expEn: 'The 3rd decimal digit is 6, so the 9 hundredths go up to 10 hundredths. That carries into the tenths, and again into the ones: $$5.99$$ becomes $$6.00$$. Both zeros stay, because they show 2 decimal places. A has dropped them. C is chopped. D writes the 10 in one column instead of carrying it.',
      expVn: 'Chữ số thập phân thứ 3 là 6, nên 9 phần trăm tăng lên thành 10 phần trăm. Phải nhớ sang hàng phần mười, rồi lại nhớ sang hàng đơn vị: $$5.99$$ thành $$6.00$$. Cả hai số 0 đều được giữ lại, vì chúng cho thấy 2 chữ số thập phân. A bỏ mất chúng. C là cắt cụt. D viết cả 10 vào một cột thay vì nhớ sang.',
    },
    {
      id: 'a5_nearest_ten',
      type: 'mcq',
      title: '5. Write $$7349.62$$ correct to the nearest 10.',
      options: [
        { val: 'A', text: 'A. $$7350$$' },
        { val: 'B', text: 'B. $$7340$$' },
        { val: 'C', text: 'C. $$7300$$' },
        { val: 'D', text: 'D. $$7349.6$$' },
      ],
      correct: 'A',
      expEn: 'The tens digit is 4 and the next digit is 9, so it goes up: $$7350$$. B is chopped — it ignores the 9. C is the nearest 100. D is rounded to 1 decimal place: "the nearest 10" means a whole number of tens, not tenths.',
      expVn: 'Chữ số hàng chục là 4 và chữ số ngay sau là 9, nên tăng lên: $$7350$$. B là cắt cụt — bỏ qua số 9. C là hàng trăm gần nhất. D là làm tròn đến 1 chữ số thập phân: "the nearest 10" nghĩa là tròn chục, không phải phần mười.',
    },
    {
      id: 'a6_add_zeros',
      type: 'mcq',
      title: '6. Work out $$19 ÷ 4$$ by short division, adding zeros after the point until the remainder is 0.',
      options: [
        { val: 'A', text: 'A. $$4$$ remainder $$3$$' },
        { val: 'B', text: 'B. $$4.3$$' },
        { val: 'C', text: 'C. $$4.75$$' },
        { val: 'D', text: 'D. $$47.5$$' },
      ],
      correct: 'C',
      expEn: '4 into 19 is 4, remainder 3. Write the point, add a zero and carry the 3: 4 into 30 is 7, remainder 2. Add a zero: 4 into 20 is 5. So $$19 ÷ 4 = 4.75$$. A stops with a remainder still left. B writes the remainder after the point, but 3 left over out of 4 is not 3 tenths. D puts the point one place too far to the right.',
      expVn: '19 chia 4 được 4, dư 3. Viết dấu thập phân, thêm một số 0 và nhớ 3 sang: 30 chia 4 được 7, dư 2. Thêm một số 0: 20 chia 4 được 5. Vậy $$19 ÷ 4 = 4.75$$. A dừng lại khi vẫn còn số dư. B viết số dư ra sau dấu thập phân, nhưng dư 3 khi chia cho 4 không phải là 3 phần mười. D đặt dấu thập phân lệch sang phải một cột.',
    },
    {
      id: 'a7_one_further',
      type: 'mcq',
      title: '7. Work out $$34 ÷ 9$$, correct to 2 decimal places.',
      options: [
        { val: 'A', text: 'A. $$3.77$$' },
        { val: 'B', text: 'B. $$3.78$$' },
        { val: 'C', text: 'C. $$3.8$$' },
        { val: 'D', text: 'D. $$3.777$$' },
      ],
      correct: 'B',
      expEn: '9 into 34 is 3, remainder 7. Then 9 into 70 is 7, remainder 7 — again and again: $$3.777...$$ Work to 3 decimal places, one more than you need. The 3rd digit is 7, so round up: $$3.78$$. A stopped dividing at 2 places. C is 1 decimal place. D has 3 places and has not been rounded.',
      expVn: '34 chia 9 được 3, dư 7. Rồi 70 chia 9 được 7, dư 7 — cứ lặp lại mãi: $$3.777...$$ Tính đến 3 chữ số thập phân, nhiều hơn một so với yêu cầu. Chữ số thứ 3 là 7, nên làm tròn lên: $$3.78$$. A dừng chia ở 2 chữ số. C là 1 chữ số thập phân. D có 3 chữ số và chưa được làm tròn.',
    },
    {
      id: 'a8_story',
      type: 'mcq',
      title: '8. Six friends share $$41.9$$ kg of rice equally. How much rice does each friend get, correct to 1 decimal place?',
      options: [
        { val: 'A', text: 'A. $$6.9$$ kg' },
        { val: 'B', text: 'B. $$7$$ kg' },
        { val: 'C', text: 'C. $$6.98$$ kg' },
        { val: 'D', text: 'D. $$7.0$$ kg' },
      ],
      correct: 'D',
      expEn: '6 into 41 is 6, remainder 5. The 5 rides on the 9: 6 into 59 is 9, remainder 5. Add a zero: 6 into 50 is 8. So $$41.9 ÷ 6 = 6.98...$$ The 2nd decimal digit is 8, so the 9 tenths go up to 10 tenths and carry: $$7.0$$ kg. A stopped at 1 place. B dropped the zero. C has not been rounded to 1 decimal place.',
      expVn: '41 chia 6 được 6, dư 5. Số 5 được nhớ sang số 9: 59 chia 6 được 9, dư 5. Thêm một số 0: 50 chia 6 được 8. Vậy $$41.9 ÷ 6 = 6.98...$$ Chữ số thập phân thứ 2 là 8, nên 9 phần mười tăng lên thành 10 phần mười và nhớ sang: $$7.0$$ kg. A dừng ở 1 chữ số. B bỏ mất số 0. C chưa được làm tròn đến 1 chữ số thập phân.',
    },
  ],
};
