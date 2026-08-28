// src/data/Y7_MATH/U01_2/workbook.js
// Reveal-solution practice for 1.2 Multiplying & Dividing Integers.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. The last two Challenge
// questions are the word problems demoted from the classroom deck (The Long
// Night and The Dive, ADAPTATION-PLAN §8). See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', prompt: 'Work out $6 × -4$.', promptVn: 'Tính $6 × -4$.',
        solution: ['Different signs, so the answer is **negative**.', '$6 × 4 = 24$, so $6 × -4 = -24$.'],
        solutionVn: ['Hai dấu khác nhau, nên đáp án là số **âm**.', '$6 × 4 = 24$, nên $6 × -4 = -24$.'],
        answer: '$-24$', answerVn: '$-24$',
      },
      {
        id: 'f2', type: 'mcq',
        prompt: 'Two negatives multiply to a positive. What is $-7 × -3$?',
        promptVn: 'Nhân hai số âm được số dương. $-7 × -3$ bằng bao nhiêu?',
        options: [
          { val: 'a', text: '$21$' },
          { val: 'b', text: '$-21$' },
          { val: 'c', text: '$-10$' },
          { val: 'd', text: '$10$' },
        ],
        correct: 'a',
        solution: ['Same signs (both negative), so the answer is **positive**.', '$7 × 3 = 21$, so $-7 × -3 = 21$.'],
        solutionVn: ['Cùng dấu (đều âm), nên đáp án là số **dương**.', '$7 × 3 = 21$, nên $-7 × -3 = 21$.'],
        answer: '$21$', answerVn: '$21$',
      },
      {
        id: 'f3', prompt: 'Work out $-20 ÷ 5$.', promptVn: 'Tính $-20 ÷ 5$.',
        solution: ['Different signs, so the answer is **negative**.', '$20 ÷ 5 = 4$, so $-20 ÷ 5 = -4$.'],
        solutionVn: ['Hai dấu khác nhau, nên đáp án là số **âm**.', '$20 ÷ 5 = 4$, nên $-20 ÷ 5 = -4$.'],
        answer: '$-4$', answerVn: '$-4$',
      },
      {
        id: 'f4', prompt: 'Work out $-36 ÷ -6$.', promptVn: 'Tính $-36 ÷ -6$.',
        solution: ['Same signs, so the answer is **positive**. Division follows the same rules as multiplication.', '$36 ÷ 6 = 6$, so $-36 ÷ -6 = 6$.'],
        solutionVn: ['Cùng dấu, nên đáp án là số **dương**. Phép chia theo cùng quy tắc với phép nhân.', '$36 ÷ 6 = 6$, nên $-36 ÷ -6 = 6$.'],
        answer: '$6$', answerVn: '$6$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', prompt: 'Work out $-8 × 7$.', promptVn: 'Tính $-8 × 7$.',
        solution: ['Different signs → negative.', '$8 × 7 = 56$, so $-8 × 7 = -56$.'],
        solutionVn: ['Khác dấu → âm.', '$8 × 7 = 56$, nên $-8 × 7 = -56$.'],
        answer: '$-56$', answerVn: '$-56$',
      },
      {
        id: 'p2', type: 'fill_blank',
        prompt: 'Fill in the missing number.', promptVn: 'Điền số còn thiếu.',
        textParts: ['$-5 ×$', '$= 45$'], textPartsVn: ['$-5 ×$', '$= 45$'],
        blanks: { '1': { correct: '-9', width: 4 } },
        solution: ['The answer $45$ is positive and one number is negative, so the missing one must be **negative** too.', '$45 ÷ 5 = 9$, so $\\square = -9$. Check: $-5 × -9 = 45$. ✓'],
        solutionVn: ['Đáp án $45$ là dương mà một số đã âm, nên số còn thiếu cũng phải **âm**.', '$45 ÷ 5 = 9$, nên $\\square = -9$. Thử lại: $-5 × -9 = 45$. ✓'],
        answer: '$-9$', answerVn: '$-9$',
      },
      {
        id: 'p3', prompt: 'Find the **quotient** of $-56$ and $8$.', promptVn: 'Tìm **thương (quotient)** của $-56$ và $8$.',
        solution: ['“Quotient” means the answer to a **division**: $-56 ÷ 8$.', 'Different signs → negative. $56 ÷ 8 = 7$, so the quotient is $-7$.'],
        solutionVn: ['“Quotient” (thương) là kết quả của phép **chia**: $-56 ÷ 8$.', 'Khác dấu → âm. $56 ÷ 8 = 7$, nên thương là $-7$.'],
        answer: '$-7$', answerVn: '$-7$',
      },
      {
        id: 'p4', prompt: 'Work out $30 ÷ (-2 + -4)$. Do the bracket first.', promptVn: 'Tính $30 ÷ (-2 + -4)$. Làm trong ngoặc trước.',
        solution: ['Inside the bracket is an **addition**: $-2 + -4 = -6$.', 'Then $30 ÷ -6 = -5$ (different signs → negative).'],
        solutionVn: ['Bên trong ngoặc là phép **cộng**: $-2 + -4 = -6$.', 'Rồi $30 ÷ -6 = -5$ (khác dấu → âm).'],
        answer: '$-5$', answerVn: '$-5$',
      },
      {
        id: 'p5', prompt: '**Estimate** $-4.1 × 2.8$ by rounding each number to the nearest integer.', promptVn: '**Ước lượng** $-4.1 × 2.8$ bằng cách làm tròn mỗi số đến số nguyên gần nhất.',
        solution: ['Round each: $-4.1 \\approx -4$ and $2.8 \\approx 3$.', '$-4 × 3 = -12$, so the answer is about $-12$.'],
        solutionVn: ['Làm tròn: $-4.1 \\approx -4$ và $2.8 \\approx 3$.', '$-4 × 3 = -12$, vậy đáp án khoảng $-12$.'],
        answer: '$\\approx -12$', answerVn: '$\\approx -12$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1', prompt: 'Work out $(-4) × (-5) ÷ (-2)$, one step at a time.', promptVn: 'Tính $(-4) × (-5) ÷ (-2)$, từng bước một.',
        solution: ['Left to right. First $-4 × -5 = 20$ (same signs → positive).', 'Then $20 ÷ -2 = -10$ (different signs → negative).'],
        solutionVn: ['Từ trái sang phải. Trước tiên $-4 × -5 = 20$ (cùng dấu → dương).', 'Rồi $20 ÷ -2 = -10$ (khác dấu → âm).'],
        answer: '$-10$', answerVn: '$-10$',
      },
      {
        id: 'c2', prompt: 'At six in the evening the temperature is exactly $0$ °C. It falls **3 degrees every hour** for **6 hours**. What is the temperature at midnight?', promptVn: 'Lúc sáu giờ tối, nhiệt độ đúng bằng $0$ °C. Nhiệt độ giảm **3 độ mỗi giờ** trong **6 giờ**. Nhiệt độ lúc nửa đêm là bao nhiêu?',
        solution: ['Falling 3 degrees each hour is a change of $-3$ per hour, for 6 hours.', '$6 × -3 = -18$, so the temperature is $-18$ °C.'],
        solutionVn: ['Giảm 3 độ mỗi giờ là thay đổi $-3$ mỗi giờ, trong 6 giờ.', '$6 × -3 = -18$, vậy nhiệt độ là $-18$ °C.'],
        answer: '$-18$', answerVn: '$-18$',
      },
      {
        id: 'c3', prompt: 'A diver starts at the surface, at $0$ m, and goes down at a steady rate. After **6 minutes** they are at $-48$ m. How far do they go down **each minute**?', promptVn: 'Một thợ lặn bắt đầu ở mặt nước, tại $0$ m, và đi xuống với tốc độ đều. Sau **6 phút** họ ở độ sâu $-48$ m. Mỗi phút họ đi xuống bao nhiêu mét?',
        solution: ['Share the total change of $-48$ m equally over 6 minutes: $-48 ÷ 6$.', '$-48 ÷ 6 = -8$, so they go down **8 metres each minute** (a change of $-8$ m per minute).'],
        solutionVn: ['Chia đều tổng thay đổi $-48$ m cho 6 phút: $-48 ÷ 6$.', '$-48 ÷ 6 = -8$, vậy mỗi phút họ đi xuống **8 mét** (thay đổi $-8$ m mỗi phút).'],
        answer: '$-8$', answerVn: '$-8$',
      },
    ],
  },
];
