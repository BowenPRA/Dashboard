// src/data/Y7_MATH/U02_2/workbook.js
// Two practice tasks for 2.2 Using Expressions and Formulae.
//
// `workbook` (Practice, 12 Q: 4 Focus · 5 Practice · 3 Challenge) drills the
// deck: substitute, with the × put back, the order of operations kept, and the
// minus sign carried in brackets. Every answer is a number, so marking is
// exact.
//
// `workbookB` (Book Problems, 10 Q) mirrors Exercise 2.2's shapes: value of
// an expression, formula with two letters, formula with a negative, and
// write-the-formula-then-use-it. Numbers are original.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', prompt: 'Find the value of $n + 9$ when $n = 6$.',
        promptVn: 'Tìm giá trị của $n + 9$ khi $n = 6$.',
        solution: ['Substitute 6 for $n$.', '$6 + 9 = 15$.'],
        solutionVn: ['Thay 6 vào chỗ $n$.', '$6 + 9 = 15$.'],
        answer: '15', answerVn: '15',
      },
      {
        id: 'f2', prompt: 'Find the value of $4k$ when $k = 7$.',
        promptVn: 'Tìm giá trị của $4k$ khi $k = 7$.',
        solution: ['$4k$ means $4 × k$. Put the × back in.', '$4 × 7 = 28$. Not 47.'],
        solutionVn: ['$4k$ nghĩa là $4 × k$. Viết lại dấu ×.', '$4 × 7 = 28$. Không phải 47.'],
        answer: '28', answerVn: '28',
      },
      {
        id: 'f3', prompt: 'Find the value of $m − 12$ when $m = 5$.',
        promptVn: 'Tìm giá trị của $m − 12$ khi $m = 5$.',
        solution: ['Substitute: $5 − 12$.', 'This goes below zero, and that is allowed: $−7$.'],
        solutionVn: ['Thay số: $5 − 12$.', 'Kết quả xuống dưới 0, và điều đó được phép: $−7$.'],
        answer: '-7', answerVn: '-7',
      },
      {
        id: 'f4', prompt: 'Find the value of $\\frac{p}{4}$ when $p = 20$.',
        promptVn: 'Tìm giá trị của $\\frac{p}{4}$ khi $p = 20$.',
        solution: ['The fraction line means divide: $p ÷ 4$.', '$20 ÷ 4 = 5$.'],
        solutionVn: ['Vạch phân số nghĩa là chia: $p ÷ 4$.', '$20 ÷ 4 = 5$.'],
        answer: '5', answerVn: '5',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', prompt: 'Find the value of $2x + 7$ when $x = 5$.',
        promptVn: 'Tìm giá trị của $2x + 7$ khi $x = 5$.',
        solution: ['Middle line: $2 × 5 + 7$.', 'Multiply first: $10 + 7 = 17$.'],
        solutionVn: ['Dòng trung gian: $2 × 5 + 7$.', 'Nhân trước: $10 + 7 = 17$.'],
        answer: '17', answerVn: '17',
      },
      {
        id: 'p2', prompt: 'Find the value of $30 − 4n$ when $n = 6$.',
        promptVn: 'Tìm giá trị của $30 − 4n$ khi $n = 6$.',
        solution: ['Middle line: $30 − 4 × 6$.', 'The multiplication happens first even though it is written second: $30 − 24 = 6$.'],
        solutionVn: ['Dòng trung gian: $30 − 4 × 6$.', 'Phép nhân làm trước dù được viết sau: $30 − 24 = 6$.'],
        answer: '6', answerVn: '6',
      },
      {
        id: 'p3', prompt: 'The perimeter of a rectangle is $P = 2l + 2w$. Find $P$ when $l = 8$ and $w = 3$.',
        promptVn: 'Chu vi hình chữ nhật là $P = 2l + 2w$. Tìm $P$ khi $l = 8$ và $w = 3$.',
        solution: ['Two letters — substitute both: $P = 2 × 8 + 2 × 3$.', '$16 + 6 = 22$.'],
        solutionVn: ['Hai chữ cái — thay cả hai: $P = 2 × 8 + 2 × 3$.', '$16 + 6 = 22$.'],
        answer: '22', answerVn: '22',
      },
      {
        id: 'p4', prompt: 'Find the value of $3p$ when $p = −4$.',
        promptVn: 'Tìm giá trị của $3p$ khi $p = −4$.',
        solution: ['Put the negative number in brackets: $3 × (−4)$.', 'Positive times negative is negative: $−12$.'],
        solutionVn: ['Đặt số âm trong dấu ngoặc: $3 × (−4)$.', 'Dương nhân âm ra âm: $−12$.'],
        answer: '-12', answerVn: '-12',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'Which of these is a **formula**?',
        promptVn: 'Cái nào sau đây là một **công thức**?',
        options: [
          { val: 'A', text: '$6n − 5$', textVn: '$6n − 5$' },
          { val: 'B', text: '$V = lwh$', textVn: '$V = lwh$' },
          { val: 'C', text: '$7 × 8 = 56$', textVn: '$7 × 8 = 56$' },
        ],
        correct: 'B',
        solution: ['A formula connects quantities with letters and has an = sign.', 'A is an expression (no = sign). C has no letters.', 'B: $V = lwh$, the volume of a box.'],
        solutionVn: ['Công thức liên hệ các đại lượng bằng chữ cái và có dấu =.', 'A là biểu thức (không có dấu =). C không có chữ cái.', 'B: $V = lwh$, thể tích hình hộp.'],
        answer: 'B', answerVn: 'B',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1', prompt: 'Find the value of $8 − 3n$ when $n = −2$.',
        promptVn: 'Tìm giá trị của $8 − 3n$ khi $n = −2$.',
        solution: ['Brackets: $8 − 3 × (−2)$.', '$3 × (−2) = −6$, so $8 − (−6)$.', 'Subtracting a negative is adding: $8 + 6 = 14$.'],
        solutionVn: ['Dấu ngoặc: $8 − 3 × (−2)$.', '$3 × (−2) = −6$, nên $8 − (−6)$.', 'Trừ một số âm là cộng: $8 + 6 = 14$.'],
        answer: '14', answerVn: '14',
      },
      {
        id: 'c2', prompt: 'A taxi charges 12 thousand dong to start, then 8 thousand dong per kilometre. Write the formula for the cost $C$ of $k$ kilometres, then find the cost of a 9 km journey (in thousand dong).',
        promptVn: 'Một chuyến taxi tính 12 nghìn đồng mở cửa, rồi 8 nghìn đồng mỗi ki-lô-mét. Hãy viết công thức tính chi phí $C$ cho $k$ ki-lô-mét, rồi tính chi phí chuyến đi 9 km (theo nghìn đồng).',
        type: 'fill_blank',
        textParts: ['$C =$ ', '   and for 9 km, $C =$ ', ' thousand dong.'],
        textPartsVn: ['$C =$ ', '   và với 9 km, $C =$ ', ' nghìn đồng.'],
        blanks: { '1': { correct: '12 + 8k', accept: ['8k + 12'], width: 8 }, '2': { correct: '84', width: 4 } },
        solution: ['The 12 is paid once; the 8 is paid every kilometre, so it is multiplied by $k$: $C = 12 + 8k$.', 'For 9 km: $C = 12 + 8 × 9 = 12 + 72 = 84$.'],
        solutionVn: ['Số 12 trả một lần; số 8 trả mỗi ki-lô-mét nên nhân với $k$: $C = 12 + 8k$.', 'Với 9 km: $C = 12 + 8 × 9 = 12 + 72 = 84$.'],
        answer: '$C = 12 + 8k$; 84', answerVn: '$C = 12 + 8k$; 84',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'A pan of water starts at 20 °C and rises 4 °C every minute, so $T = 20 + 4m$. Which statement is true?',
        promptVn: 'Một nồi nước bắt đầu ở 20 °C và tăng 4 °C mỗi phút, nên $T = 20 + 4m$. Câu nào đúng?',
        options: [
          { val: 'A', text: 'After 30 minutes the water is at 140 °C, because $20 + 4 × 30 = 140$.', textVn: 'Sau 30 phút nước ở 140 °C, vì $20 + 4 × 30 = 140$.' },
          { val: 'B', text: 'After 10 minutes the water is at 60 °C, and after 30 minutes it is boiling at 100 °C — the formula stopped being true.', textVn: 'Sau 10 phút nước ở 60 °C, và sau 30 phút nước đang sôi ở 100 °C — công thức đã không còn đúng.' },
          { val: 'C', text: 'After 10 minutes the water is at 240 °C, because $20 + 4 = 24$ then $× 10$.', textVn: 'Sau 10 phút nước ở 240 °C, vì $20 + 4 = 24$ rồi $× 10$.' },
        ],
        correct: 'B',
        solution: ['$m = 10$: $20 + 40 = 60$ °C. Correct.', '$m = 30$: the arithmetic gives 140, but water boils at 100 °C and stops getting hotter.', 'A formula is only true while the situation it describes is true. C added before multiplying.'],
        solutionVn: ['$m = 10$: $20 + 40 = 60$ °C. Đúng.', '$m = 30$: phép tính ra 140, nhưng nước sôi ở 100 °C rồi không nóng thêm.', 'Công thức chỉ đúng chừng nào tình huống nó mô tả còn đúng. C cộng trước khi nhân.'],
        answer: 'B', answerVn: 'B',
      },
    ],
  },
];

export const workbookB = [
  {
    tier: 'Value of an expression',
    tierVn: 'Giá trị của biểu thức',
    questions: [
      {
        id: 'b1', prompt: 'When $a = 9$, find the value of $a − 4$.',
        promptVn: 'Khi $a = 9$, tìm giá trị của $a − 4$.',
        solution: ['$9 − 4 = 5$.'], solutionVn: ['$9 − 4 = 5$.'],
        answer: '5', answerVn: '5',
      },
      {
        id: 'b2', prompt: 'When $a = 9$, find the value of $6a$.',
        promptVn: 'Khi $a = 9$, tìm giá trị của $6a$.',
        solution: ['$6a = 6 × a$.', '$6 × 9 = 54$. Not 69.'], solutionVn: ['$6a = 6 × a$.', '$6 × 9 = 54$. Không phải 69.'],
        answer: '54', answerVn: '54',
      },
      {
        id: 'b3', prompt: 'When $a = 9$, find the value of $2a − 5$.',
        promptVn: 'Khi $a = 9$, tìm giá trị của $2a − 5$.',
        solution: ['Middle line: $2 × 9 − 5$.', '$18 − 5 = 13$.'], solutionVn: ['Dòng trung gian: $2 × 9 − 5$.', '$18 − 5 = 13$.'],
        answer: '13', answerVn: '13',
      },
      {
        id: 'b4', prompt: 'When $a = 9$, find the value of $40 − 3a$.',
        promptVn: 'Khi $a = 9$, tìm giá trị của $40 − 3a$.',
        solution: ['Middle line: $40 − 3 × 9$.', 'Multiply first: $40 − 27 = 13$. It is not $37 × 9$.'], solutionVn: ['Dòng trung gian: $40 − 3 × 9$.', 'Nhân trước: $40 − 27 = 13$. Không phải $37 × 9$.'],
        answer: '13', answerVn: '13',
      },
    ],
  },
  {
    tier: 'Formulae with two letters',
    tierVn: 'Công thức có hai chữ cái',
    questions: [
      {
        id: 'b5', prompt: 'The area of a rectangle is $A = lw$. Find $A$ when $l = 11$ and $w = 6$.',
        promptVn: 'Diện tích hình chữ nhật là $A = lw$. Tìm $A$ khi $l = 11$ và $w = 6$.',
        solution: ['$lw$ means $l × w$.', '$A = 11 × 6 = 66$.'], solutionVn: ['$lw$ nghĩa là $l × w$.', '$A = 11 × 6 = 66$.'],
        answer: '66', answerVn: '66',
      },
      {
        id: 'b6', prompt: 'A formula is $T = 5a − b$. Find $T$ when $a = 7$ and $b = 9$.',
        promptVn: 'Một công thức là $T = 5a − b$. Tìm $T$ khi $a = 7$ và $b = 9$.',
        solution: ['Substitute both: $T = 5 × 7 − 9$.', '$35 − 9 = 26$.'], solutionVn: ['Thay cả hai: $T = 5 × 7 − 9$.', '$35 − 9 = 26$.'],
        answer: '26', answerVn: '26',
      },
      {
        id: 'b7', prompt: 'The formula $s = \\frac{d}{t}$ gives speed from distance and time. Find $s$ when $d = 90$ and $t = 3$.',
        promptVn: 'Công thức $s = \\frac{d}{t}$ tính tốc độ từ quãng đường và thời gian. Tìm $s$ khi $d = 90$ và $t = 3$.',
        solution: ['The fraction line means divide.', '$s = 90 ÷ 3 = 30$.'], solutionVn: ['Vạch phân số nghĩa là chia.', '$s = 90 ÷ 3 = 30$.'],
        answer: '30', answerVn: '30',
      },
    ],
  },
  {
    tier: 'With a negative',
    tierVn: 'Với số âm',
    questions: [
      {
        id: 'b8', prompt: 'Find the value of $n + 7$ when $n = −10$.',
        promptVn: 'Tìm giá trị của $n + 7$ khi $n = −10$.',
        solution: ['$(−10) + 7$.', 'Start at −10 and go up 7: $−3$.'], solutionVn: ['$(−10) + 7$.', 'Bắt đầu từ −10 rồi đi lên 7: $−3$.'],
        answer: '-3', answerVn: '-3',
      },
      {
        id: 'b9', prompt: 'Find the value of $6 − 2n$ when $n = −5$.',
        promptVn: 'Tìm giá trị của $6 − 2n$ khi $n = −5$.',
        solution: ['Brackets: $6 − 2 × (−5)$.', '$2 × (−5) = −10$, so $6 − (−10) = 6 + 10 = 16$.'], solutionVn: ['Dấu ngoặc: $6 − 2 × (−5)$.', '$2 × (−5) = −10$, nên $6 − (−10) = 6 + 10 = 16$.'],
        answer: '16', answerVn: '16',
      },
    ],
  },
  {
    tier: 'Write it, then use it',
    tierVn: 'Viết ra, rồi dùng nó',
    questions: [
      {
        id: 'b10', prompt: 'A phone plan costs 50 thousand dong a month plus 2 thousand dong for every gigabyte used. Write a formula for the monthly cost $C$ when $g$ gigabytes are used, then find the cost when $g = 15$ (in thousand dong).',
        promptVn: 'Một gói điện thoại có giá 50 nghìn đồng một tháng cộng 2 nghìn đồng cho mỗi gigabyte dùng. Hãy viết công thức tính chi phí hằng tháng $C$ khi dùng $g$ gigabyte, rồi tính chi phí khi $g = 15$ (theo nghìn đồng).',
        type: 'fill_blank',
        textParts: ['$C =$ ', '   and when $g = 15$, $C =$ ', ' thousand dong.'],
        textPartsVn: ['$C =$ ', '   và khi $g = 15$, $C =$ ', ' nghìn đồng.'],
        blanks: { '1': { correct: '50 + 2g', accept: ['2g + 50'], width: 8 }, '2': { correct: '80', width: 4 } },
        solution: ['Say what the letters represent: C is the cost in thousand dong, g is the gigabytes.', 'The 50 is paid once; the 2 is paid per gigabyte: $C = 50 + 2g$.', '$g = 15$: $C = 50 + 2 × 15 = 50 + 30 = 80$.'],
        solutionVn: ['Nói rõ chữ cái đại diện cho gì: C là chi phí theo nghìn đồng, g là số gigabyte.', 'Số 50 trả một lần; số 2 trả mỗi gigabyte: $C = 50 + 2g$.', '$g = 15$: $C = 50 + 2 × 15 = 50 + 30 = 80$.'],
        answer: '$C = 50 + 2g$; 80', answerVn: '$C = 50 + 2g$; 80',
      },
    ],
  },
];
