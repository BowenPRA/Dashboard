// src/data/Y7_MATH/U01_1/workbook.js
// Reveal-solution practice for 1.1 Adding & Subtracting Integers.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. The last two Challenge
// questions are the word problems demoted from the classroom deck (The Bank
// Account and The Research Station, ADAPTATION-PLAN §8). See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', prompt: 'Work out $-3 + -4$.', promptVn: 'Tính $-3 + -4$.',
        solution: ['Adding a negative means move **left**.', 'Start at $-3$, move 4 left: $-3 + -4 = -7$.'],
        solutionVn: ['Cộng một số âm nghĩa là đi sang **trái**.', 'Bắt đầu ở $-3$, đi 4 bước sang trái: $-3 + -4 = -7$.'],
        answer: '$-7$', answerVn: '$-7$',
      },
      {
        id: 'f2', prompt: 'Work out $6 + -5$.', promptVn: 'Tính $6 + -5$.',
        solution: ['Adding a negative → move **left**.', 'Start at $6$, move 5 left: $6 + -5 = 1$.'],
        solutionVn: ['Cộng một số âm → đi sang **trái**.', 'Bắt đầu ở $6$, đi 5 bước sang trái: $6 + -5 = 1$.'],
        answer: '$1$', answerVn: '$1$',
      },
      {
        id: 'f3', prompt: 'Work out $-6 - 3$.', promptVn: 'Tính $-6 - 3$.',
        solution: ['Subtracting a positive → move **left**.', 'Start at $-6$, move 3 left: $-6 - 3 = -9$.'],
        solutionVn: ['Trừ một số dương → đi sang **trái**.', 'Bắt đầu ở $-6$, đi 3 bước sang trái: $-6 - 3 = -9$.'],
        answer: '$-9$', answerVn: '$-9$',
      },
      {
        id: 'f4', prompt: 'Work out $1 - -8$.', promptVn: 'Tính $1 - -8$.',
        solution: ['Minus a negative becomes plus: $1 - -8 = 1 + 8$.', '$1 + 8 = 9$.'],
        solutionVn: ['Trừ số âm thành cộng: $1 - -8 = 1 + 8$.', '$1 + 8 = 9$.'],
        answer: '$9$', answerVn: '$9$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', prompt: 'Work out $-10 - -15$.', promptVn: 'Tính $-10 - -15$.',
        solution: ['Change $- -$ into $+$: $-10 - -15 = -10 + 15$.', '$-10 + 15 = 5$.'],
        solutionVn: ['Đổi $- -$ thành $+$: $-10 - -15 = -10 + 15$.', '$-10 + 15 = 5$.'],
        answer: '$5$', answerVn: '$5$',
      },
      {
        id: 'p2', prompt: 'Fill in the missing number: $8 + \\square = 1$.', promptVn: 'Điền số còn thiếu: $8 + \\square = 1$.',
        solution: ['We need what to add to $8$ to reach $1$, so $\\square = 1 - 8$.', '$1 - 8 = -7$. Check: $8 + -7 = 1$. ✓'],
        solutionVn: ['Cần cộng gì vào $8$ để được $1$, nên $\\square = 1 - 8$.', '$1 - 8 = -7$. Thử lại: $8 + -7 = 1$. ✓'],
        answer: '$-7$', answerVn: '$-7$',
      },
      {
        id: 'p3', prompt: 'Find the **difference** between $-3$ and $4$.', promptVn: 'Tìm **hiệu (difference)** giữa $-3$ và $4$.',
        solution: ['The difference is the gap on the number line: **bigger − smaller**.', '$4 - (-3) = 4 + 3 = 7$. A difference is never negative.'],
        solutionVn: ['Hiệu là khoảng cách trên trục số: **số lớn − số bé**.', '$4 - (-3) = 4 + 3 = 7$. Hiệu không bao giờ âm.'],
        answer: '$7$', answerVn: '$7$',
      },
      {
        id: 'p4', prompt: '**Estimate** $-6.15 + 9.93$ by rounding each number to the nearest integer.', promptVn: '**Ước lượng** $-6.15 + 9.93$ bằng cách làm tròn mỗi số đến số nguyên gần nhất.',
        solution: ['Round each: $-6.15 \\approx -6$ and $9.93 \\approx 10$.', '$-6 + 10 = 4$, so the answer is about $4$.'],
        solutionVn: ['Làm tròn: $-6.15 \\approx -6$ và $9.93 \\approx 10$.', '$-6 + 10 = 4$, vậy đáp án khoảng $4$.'],
        answer: '$\\approx 4$', answerVn: '$\\approx 4$',
      },
      {
        id: 'p5', prompt: 'Two integers add up to $2$. One of them is $8$. What is the other integer?', promptVn: 'Hai số nguyên có tổng bằng $2$. Một trong hai số là $8$. Số còn lại là bao nhiêu?',
        solution: ['The other integer $= 2 - 8$.', '$2 - 8 = -6$. Check: $8 + -6 = 2$. ✓'],
        solutionVn: ['Số còn lại $= 2 - 8$.', '$2 - 8 = -6$. Thử lại: $8 + -6 = 2$. ✓'],
        answer: '$-6$', answerVn: '$-6$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'Use each of $-5, -3, -2, 3, 4, 5$ **once** to complete all three: $\\square + \\square = 1$,  $\\square + \\square = -2$,  $\\square + \\square = 3$.',
        promptVn: 'Dùng mỗi số $-5, -3, -2, 3, 4, 5$ **một lần** để hoàn thành cả ba: $\\square + \\square = 1$,  $\\square + \\square = -2$,  $\\square + \\square = 3$.',
        solution: ['Every integer is used exactly once across the three sums.', '$-3 + 4 = 1$.', '$-5 + 3 = -2$.', '$-2 + 5 = 3$.'],
        solutionVn: ['Mỗi số nguyên được dùng đúng một lần trong ba phép tính.', '$-3 + 4 = 1$.', '$-5 + 3 = -2$.', '$-2 + 5 = 3$.'],
        answer: '$-3+4=1,\\ \\ -5+3=-2,\\ \\ -2+5=3$', answerVn: '$-3+4=1,\\ \\ -5+3=-2,\\ \\ -2+5=3$',
      },
      {
        id: 'c2',
        prompt: 'Mr Bowen has $-6$ dollars in his account — he **owes** the bank 6 dollars. He **deposits** 20 dollars, then **withdraws** 9 dollars, then the bank **takes away** a 4-dollar debt he had forgotten. How much does he have now?',
        promptVn: 'Thầy Bowen có $-6$ đô trong tài khoản — thầy **nợ** ngân hàng 6 đô. Thầy **gửi vào** 20 đô, rồi **rút ra** 9 đô, sau đó ngân hàng **xoá** một khoản nợ 4 đô thầy đã quên. Bây giờ thầy có bao nhiêu?',
        solution: ['Work along the sentence in order. Deposit adds, withdraw subtracts, and taking away a debt is minus a negative.', '$-6 + 20 - 9 - (-4) = -6 + 20 - 9 + 4 = 9$, so **9 dollars**.'],
        solutionVn: ['Làm theo đúng thứ tự trong câu. Gửi vào là cộng, rút ra là trừ, và xoá một khoản nợ là trừ một số âm.', '$-6 + 20 - 9 - (-4) = -6 + 20 - 9 + 4 = 9$, vậy là **9 đô**.'],
        answer: '$9$', answerVn: '$9$',
      },
      {
        id: 'c3',
        prompt: 'At 6 a.m. it is $-11$ °C at a research station. By noon the temperature has **risen 4 degrees**. By midnight it has **fallen 9 degrees**. What is the temperature at midnight?',
        promptVn: 'Lúc 6 giờ sáng, một trạm nghiên cứu ở $-11$ °C. Đến trưa nhiệt độ đã **tăng 4 độ**. Đến nửa đêm nhiệt độ đã **giảm 9 độ**. Nhiệt độ lúc nửa đêm là bao nhiêu?',
        solution: ['Start, then the rise, then the fall, in order.', '$-11 + 4 - 9 = -16$, so **$-16$ °C**.'],
        solutionVn: ['Số ban đầu, rồi phần tăng, rồi phần giảm, theo đúng thứ tự.', '$-11 + 4 - 9 = -16$, vậy là **$-16$ °C**.'],
        answer: '$-16$', answerVn: '$-16$',
      },
    ],
  },
];
