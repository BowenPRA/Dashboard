// src/data/Y7_MATH/U01_4/workbook.js
// Reveal-solution practice for 1.4 Highest Common Factors.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. The last Challenge questions
// include the word problem demoted from the classroom deck (The Staff Room Fruit
// Baskets) and the consecutive-numbers investigation. See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'Which number is the **highest common factor** of 8 and 12 — the biggest number that divides into **both**?',
        promptVn: 'Số nào là **ước số chung lớn nhất** của 8 và 12 — số lớn nhất chia hết **cả hai**?',
        options: [
          { val: 'a', text: '$2$' },
          { val: 'b', text: '$4$' },
          { val: 'c', text: '$8$' },
          { val: 'd', text: '$24$' },
        ],
        correct: 'b',
        solution: ['Factors of 8: 1, 2, **4**, 8. Factors of 12: 1, 2, 3, **4**, 6, 12.', 'The biggest number in both lists is $4$.'],
        solutionVn: ['Ước số của 8: 1, 2, **4**, 8. Ước số của 12: 1, 2, 3, **4**, 6, 12.', 'Số lớn nhất có trong cả hai là $4$.'],
        answer: '$4$', answerVn: '$4$',
      },
      {
        id: 'f2', prompt: 'Find the HCF of 15 and 20.', promptVn: 'Tìm ƯCLN của 15 và 20.',
        solution: ['Factors of 15: 1, **5**, 15. Factors of 20: 1, 2, 4, **5**, 10, 20.', 'The HCF is $5$.'],
        solutionVn: ['Ước số của 15: 1, **5**, 15. Ước số của 20: 1, 2, 4, **5**, 10, 20.', 'ƯCLN là $5$.'],
        answer: '$5$', answerVn: '$5$',
      },
      {
        id: 'f3', prompt: 'Find the HCF of 9 and 12.', promptVn: 'Tìm ƯCLN của 9 và 12.',
        solution: ['Factors of 9: 1, **3**, 9. Factors of 12: 1, 2, **3**, 4, 6, 12.', 'The HCF is $3$.'],
        solutionVn: ['Ước số của 9: 1, **3**, 9. Ước số của 12: 1, 2, **3**, 4, 6, 12.', 'ƯCLN là $3$.'],
        answer: '$3$', answerVn: '$3$',
      },
      {
        id: 'f4', prompt: 'Find the HCF of 16 and 24.', promptVn: 'Tìm ƯCLN của 16 và 24.',
        solution: ['Factors of 16: 1, 2, 4, **8**, 16. Factors of 24: 1, 2, 3, 4, 6, **8**, 12, 24.', 'The HCF is $8$.'],
        solutionVn: ['Ước số của 16: 1, 2, 4, **8**, 16. Ước số của 24: 1, 2, 3, 4, 6, **8**, 12, 24.', 'ƯCLN là $8$.'],
        answer: '$8$', answerVn: '$8$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', prompt: 'Find the HCF of 6 and 18.', promptVn: 'Tìm ƯCLN của 6 và 18.',
        solution: ['6 divides into 18, so the HCF is just the **smaller** number.', 'The HCF is $6$, not 1.'],
        solutionVn: ['6 chia hết 18, nên ƯCLN chính là **số nhỏ hơn**.', 'ƯCLN là $6$, không phải 1.'],
        answer: '$6$', answerVn: '$6$',
      },
      {
        id: 'p2', prompt: 'Find the HCF of 7 and 15.', promptVn: 'Tìm ƯCLN của 7 và 15.',
        solution: ['Factors of 7: 1, 7. Factors of 15: 1, 3, 5, 15. Only **1** is in both.', 'The HCF is $1$ — never “none”, because 1 is a factor of every number.'],
        solutionVn: ['Ước số của 7: 1, 7. Ước số của 15: 1, 3, 5, 15. Chỉ có **1** ở cả hai.', 'ƯCLN là $1$ — không bao giờ “không có”, vì 1 là ước số của mọi số.'],
        answer: '$1$', answerVn: '$1$',
      },
      {
        id: 'p3', type: 'dnd',
        prompt: 'Drag **every** number that is a factor of **both** 24 and 36 into the box. Leave the others behind.',
        promptVn: 'Kéo **mọi** số là ước của **cả** 24 và 36 vào ô. Để lại những số khác.',
        bank: [
          { val: '1', text: '$1$' }, { val: '2', text: '$2$' }, { val: '3', text: '$3$' }, { val: '4', text: '$4$' },
          { val: '6', text: '$6$' }, { val: '8', text: '$8$' }, { val: '9', text: '$9$' }, { val: '12', text: '$12$' },
        ],
        targets: [{ id: 'common', title: 'Common factors of 24 & 36', titleVn: 'Ước chung của 24 và 36' }],
        correctSets: { common: ['1', '2', '3', '4', '6', '12'] },
        solution: ['Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.', 'The ones in both lists are $1, 2, 3, 4, 6, 12$. (8 is only a factor of 24; 9 only of 36.)'],
        solutionVn: ['Ước số của 24: 1, 2, 3, 4, 6, 8, 12, 24. Ước số của 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.', 'Những số ở cả hai là $1, 2, 3, 4, 6, 12$. (8 chỉ là ước của 24; 9 chỉ của 36.)'],
        answer: '$1, 2, 3, 4, 6, 12$', answerVn: '$1, 2, 3, 4, 6, 12$',
      },
      {
        id: 'p4', type: 'fill_blank',
        prompt: 'Use the HCF to write $\\frac{20}{30}$ in its simplest form. Fill in the top and bottom.',
        promptVn: 'Dùng ƯCLN để viết $\\frac{20}{30}$ ở dạng tối giản. Điền tử số và mẫu số.',
        textParts: ['$\\dfrac{20}{30} =$  top:', '   bottom:', ''],
        textPartsVn: ['$\\dfrac{20}{30} =$  tử:', '   mẫu:', ''],
        blanks: { '1': { correct: '2', width: 2 }, '2': { correct: '3', width: 2 } },
        solution: ['The HCF of 20 and 30 is $10$. Divide top and bottom by 10.', '$\\frac{20}{30} = \\frac{2}{3}$.'],
        solutionVn: ['ƯCLN của 20 và 30 là $10$. Chia cả tử và mẫu cho 10.', '$\\frac{20}{30} = \\frac{2}{3}$.'],
        answer: '$\\frac{2}{3}$', answerVn: '$\\frac{2}{3}$',
      },
      {
        id: 'p5', prompt: 'Find the HCF of 30 and 45.', promptVn: 'Tìm ƯCLN của 30 và 45.',
        solution: ['Factors of 30: 1, 2, 3, 5, 6, 10, **15**, 30. Factors of 45: 1, 3, 5, 9, **15**, 45.', 'The HCF is $15$.'],
        solutionVn: ['Ước số của 30: 1, 2, 3, 5, 6, 10, **15**, 30. Ước số của 45: 1, 3, 5, 9, **15**, 45.', 'ƯCLN là $15$.'],
        answer: '$15$', answerVn: '$15$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1', prompt: 'Find the HCF of **three** numbers: 24, 36 and 60.', promptVn: 'Tìm ƯCLN của **ba** số: 24, 36 và 60.',
        solution: ['Find the numbers that are a factor of **all three**.', 'Common factors: 1, 2, 3, 4, 6, 12. The highest is $12$.'],
        solutionVn: ['Tìm những số là ước của **cả ba**.', 'Ước số chung: 1, 2, 3, 4, 6, 12. Lớn nhất là $12$.'],
        answer: '$12$', answerVn: '$12$',
      },
      {
        id: 'c2', prompt: 'Mr Bowen buys **30 bananas** and **45 oranges**. He makes **identical fruit baskets**, using every piece of fruit with nothing left over, and wants **as many baskets as possible**. How many baskets?', promptVn: 'Thầy Bowen mua **30 quả chuối** và **45 quả cam**. Thầy làm những **giỏ giống hệt nhau**, dùng hết trái cây không thừa quả nào, và muốn **càng nhiều giỏ càng tốt**. Bao nhiêu giỏ?',
        solution: ['“As many identical baskets as possible” means the HCF of 30 and 45.', 'The HCF is $15$, so **15 baskets**, each with $30 ÷ 15 = 2$ bananas and $45 ÷ 15 = 3$ oranges.'],
        solutionVn: ['“Càng nhiều giỏ giống nhau càng tốt” nghĩa là ƯCLN của 30 và 45.', 'ƯCLN là $15$, nên **15 giỏ**, mỗi giỏ có $30 ÷ 15 = 2$ chuối và $45 ÷ 15 = 3$ cam.'],
        answer: '$15$', answerVn: '$15$',
      },
      {
        id: 'c3', prompt: 'Find the HCF of 99 and 100. What does your answer suggest about the HCF of any two **consecutive** numbers?', promptVn: 'Tìm ƯCLN của 99 và 100. Đáp án của em gợi ý điều gì về ƯCLN của hai số **liên tiếp** bất kỳ?',
        solution: ['99 and 100 are consecutive. Their only common factor is 1, so the HCF is $1$.', 'This suggests a conjecture: the HCF of any two consecutive numbers is always 1.'],
        solutionVn: ['99 và 100 là hai số liên tiếp. Ước số chung duy nhất là 1, nên ƯCLN là $1$.', 'Điều này gợi ý một phỏng đoán: ƯCLN của hai số liên tiếp bất kỳ luôn bằng 1.'],
        answer: '$1$', answerVn: '$1$',
      },
    ],
  },
];
