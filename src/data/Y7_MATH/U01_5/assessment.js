// src/data/Y7_MATH/U01_5/assessment.js
// Six questions, one sitting, eight minutes (ADAPTATION-PLAN §6.2). Maths lives
// ONLY inside $$…$$ here. 1–2 key words in context (divisible / the three
// sentences), 3–5 the core skill (apply a test, the "both" trap for 6, the
// remainder for 7), 6 a word problem. Distractors are diagnoses; no item copies
// a check or workbook question.
export const assessment = {
  timeLimit: 480, // 8 minutes
  passages: [],
  questions: [
    {
      id: 'a1_sentences',
      type: 'mcq',
      title: '1. Which sentence means the same as "6 is a factor of 24"?',
      options: [
        { val: 'A', text: 'A. 24 is a factor of 6' },
        { val: 'B', text: 'B. 6 is a multiple of 24' },
        { val: 'C', text: 'C. 24 is divisible by 6' },
        { val: 'D', text: 'D. 6 is divisible by 24' },
      ],
      correct: 'C',
      expEn: '"6 is a factor of 24", "24 is divisible by 6" and "24 is a multiple of 6" all say the same thing. The others swap the two numbers, which reverses the meaning.',
      expVn: '"6 là ước của 24", "24 chia hết cho 6" và "24 là bội của 6" đều nói cùng một điều. Các câu khác đảo hai số, làm đảo nghĩa.',
    },
    {
      id: 'a2_last_digit',
      type: 'mcq',
      title: '2. Which of these numbers is divisible by 10?',
      options: [
        { val: 'A', text: 'A. $$250$$' },
        { val: 'B', text: 'B. $$105$$' },
        { val: 'C', text: 'C. $$52$$' },
        { val: 'D', text: 'D. $$15$$' },
      ],
      correct: 'A',
      expEn: 'A number is divisible by 10 when its last digit is 0, and only $$250$$ ends in 0. $$105$$ and $$15$$ end in 5 (divisible by 5, not 10); $$52$$ ends in 2.',
      expVn: 'Một số chia hết cho 10 khi chữ số cuối là 0, và chỉ $$250$$ tận cùng bằng 0. $$105$$ và $$15$$ tận cùng 5 (chia hết cho 5, không phải 10); $$52$$ tận cùng 2.',
    },
    {
      id: 'a3_digit_sum',
      type: 'mcq',
      title: '3. Which of these numbers is divisible by 9? (Use the digit-sum test.)',
      options: [
        { val: 'A', text: 'A. $$532$$' },
        { val: 'B', text: 'B. $$91$$' },
        { val: 'C', text: 'C. $$100$$' },
        { val: 'D', text: 'D. $$531$$' },
      ],
      correct: 'D',
      expEn: 'For $$531$$ the digits add to $$5 + 3 + 1 = 9$$, a multiple of 9, so it divides. $$532$$ adds to 10, $$91$$ to 10, $$100$$ to 1 — none is a multiple of 9.',
      expVn: 'Với $$531$$ tổng chữ số là $$5 + 3 + 1 = 9$$, bội của 9, nên chia hết. $$532$$ có tổng 10, $$91$$ có 10, $$100$$ có 1 — không số nào là bội của 9.',
    },
    {
      id: 'a4_six_both',
      type: 'mcq',
      title: '4. Which of these numbers is divisible by 6?',
      options: [
        { val: 'A', text: 'A. $$16$$' },
        { val: 'B', text: 'B. $$42$$' },
        { val: 'C', text: 'C. $$15$$' },
        { val: 'D', text: 'D. $$33$$' },
      ],
      correct: 'B',
      expEn: 'Dividing by 6 needs the 2 test AND the 3 test. $$42$$ is even and $$4 + 2 = 6$$ is a multiple of 3, so it passes both. $$16$$ is even but fails the 3 test; $$15$$ and $$33$$ are odd.',
      expVn: 'Chia hết cho 6 cần cả dấu hiệu 2 và dấu hiệu 3. $$42$$ là số chẵn và $$4 + 2 = 6$$ là bội của 3, nên thoả cả hai. $$16$$ chẵn nhưng không thoả dấu hiệu 3; $$15$$ và $$33$$ là số lẻ.',
    },
    {
      id: 'a5_remainder_7',
      type: 'mcq',
      title: '5. There is no simple test for 7, so you divide. What is the remainder when $$3960$$ is divided by 7?',
      options: [
        { val: 'A', text: 'A. $$0$$' },
        { val: 'B', text: 'B. $$1$$' },
        { val: 'C', text: 'C. $$5$$' },
        { val: 'D', text: 'D. $$7$$' },
      ],
      correct: 'C',
      expEn: '$$3960 ÷ 7 = 565$$ remainder $$5$$. The remainder is not 0, so 3960 is **not** divisible by 7 — which is why 7 was the one number missing a test.',
      expVn: '$$3960 ÷ 7 = 565$$ dư $$5$$. Số dư khác 0, nên 3960 **không** chia hết cho 7 — đó là lý do 7 là số duy nhất không có dấu hiệu.',
    },
    {
      id: 'a6_word',
      type: 'mcq',
      title: '6. Mr Bowen has 5304 apples and packs them in crates of 8, none left over. Using a test, will every crate be full?',
      options: [
        { val: 'A', text: 'A. No — 5304 is not divisible by 8' },
        { val: 'B', text: 'B. Yes — because 5304 is an even number' },
        { val: 'C', text: 'C. Yes — because it ends in 4' },
        { val: 'D', text: 'D. Yes — the last three digits 304 divide by 8' },
      ],
      correct: 'D',
      expEn: 'The test for 8 is the last **three** digits: $$304 ÷ 8 = 38$$, so 5304 divides by 8 and every crate is full. Being even or ending in 4 is the test for 2, not for 8.',
      expVn: 'Dấu hiệu cho 8 là **ba** chữ số cuối: $$304 ÷ 8 = 38$$, nên 5304 chia hết cho 8 và mọi thùng đều đầy. Chẵn hay tận cùng 4 là dấu hiệu cho 2, không phải cho 8.',
    },
  ],
};
