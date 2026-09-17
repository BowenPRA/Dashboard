// src/data/Y7_MATH/U02_4/workbook.js
// Practice for 2.4 Expanding Brackets — 12 questions, 4 Focus · 5 Practice ·
// 3 Challenge, mixing five answer widgets (src/tasks/Workbook.jsx):
//   fill_blank  the grid boxes, one typed box per multiplication (f1, p1), and
//               work backwards (c2) and the rectangle (c3)
//   inline      a dropdown sentence: the rule (f2), and "right, wrong, why" (c1)
//   mcq         a diagnosis-distractor expansion (f3) and the odd one out (p4)
//   text        a typed expansion, marked by equivalence (f4, p3, p5)
//   dnd         drag each expansion onto its expression (p2)
//
// Every number is original — the Workbook exercise is the classroom homework
// and is not spent here. There is no WORKBOOK_B: Expand It (expandGrid in
// data.js) rehearses the exercise's shapes with fresh numbers
// (docs/y7-math/algebra-engines.md §1).

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: 'Fill the grid for $7(x + 3)$: one box, one multiplication. Then write the expansion.',
        promptVn: 'Điền lưới ô cho $7(x + 3)$: một ô, một phép nhân. Rồi viết kết quả khai triển.',
        textParts: ['$7 × x =$ ', '     $7 × 3 =$ ', '     so $7(x + 3) =$ ', ''],
        textPartsVn: ['$7 × x =$ ', '     $7 × 3 =$ ', '     vậy $7(x + 3) =$ ', ''],
        blanks: {
          '1': { correct: '7x', width: 4 },
          '2': { correct: '21', width: 4 },
          '3': { correct: '7x + 21', accept: ['21 + 7x'], width: 8 },
        },
        solution: ['Box 1: $7 × x = 7x$.', 'Box 2: $7 × 3 = 21$ — the 3 is inside the brackets, so it is multiplied too.', 'Add the boxes: $7x + 21$.'],
        solutionVn: ['Ô 1: $7 × x = 7x$.', 'Ô 2: $7 × 3 = 21$ — số 3 nằm trong ngoặc, nên cũng được nhân.', 'Cộng các ô: $7x + 21$.'],
        answer: '$7x$, $21$, $7x + 21$',
        answerVn: '$7x$, $21$, $7x + 21$',
      },
      {
        id: 'f2',
        type: 'inline',
        prompt: 'Choose the words that complete the rule.',
        promptVn: 'Chọn từ để hoàn thành quy tắc.',
        textParts: ['To **expand** $5(y + 2)$, multiply ', ' inside the brackets by ', '.'],
        textPartsVn: ['Để **khai triển** $5(y + 2)$, nhân ', ' bên trong ngoặc với ', '.'],
        blanks: {
          '1': {
            correct: 'every',
            options: [
              { val: 'first', text: 'only the first term', textVn: 'chỉ hạng tử đầu tiên' },
              { val: 'every', text: 'every term', textVn: 'mọi hạng tử' },
              { val: 'last', text: 'only the last term', textVn: 'chỉ hạng tử cuối cùng' },
            ],
          },
          '2': {
            correct: 'five',
            options: [
              { val: 'y', text: 'y', textVn: 'y' },
              { val: 'five', text: 'the 5 outside', textVn: 'số 5 bên ngoài' },
              { val: 'two', text: 'the 2', textVn: 'số 2' },
            ],
          },
        },
        solution: ['**Expand** means multiply **every** term inside by the number outside.', '$5(y + 2) = 5 × y + 5 × 2 = 5y + 10$.'],
        solutionVn: ['**Khai triển** nghĩa là nhân **mọi** hạng tử bên trong với số bên ngoài.', '$5(y + 2) = 5 × y + 5 × 2 = 5y + 10$.'],
        answer: 'every term · the 5 outside',
        answerVn: 'mọi hạng tử · số 5 bên ngoài',
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: 'Which is the expansion of $3(k − 6)$?',
        promptVn: 'Đâu là kết quả khai triển của $3(k − 6)$?',
        options: [
          { val: 'A', text: '$3k − 6$', textVn: '$3k − 6$' },
          { val: 'B', text: '$3k + 18$', textVn: '$3k + 18$' },
          { val: 'C', text: '$3k − 18$', textVn: '$3k − 18$' },
          { val: 'D', text: '$3k − 9$', textVn: '$3k − 9$' },
        ],
        correct: 'C',
        solution: ['$3 × k = 3k$ and $3 × (−6) = −18$: the minus goes into the box with the 6.', 'A did not multiply the 6; B lost the minus sign; D added $3 + 6$.'],
        solutionVn: ['$3 × k = 3k$ và $3 × (−6) = −18$: dấu trừ đi vào ô cùng số 6.', 'A không nhân số 6; B làm mất dấu trừ; D cộng $3 + 6$.'],
        answer: '$3k − 18$',
        answerVn: '$3k − 18$',
      },
      {
        id: 'f4',
        prompt: 'Expand $8(2 + n)$.',
        promptVn: 'Khai triển $8(2 + n)$.',
        solution: ['$8 × 2 = 16$ and $8 × n = 8n$.', 'The number came first inside, so it can come first in the answer: $16 + 8n$.'],
        solutionVn: ['$8 × 2 = 16$ và $8 × n = 8n$.', 'Số đứng trước trong ngoặc, nên có thể đứng trước trong đáp án: $16 + 8n$.'],
        answer: '16 + 8n',
        answerVn: '16 + 8n',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        type: 'fill_blank',
        prompt: 'Fill the grid for $4(3a − 5)$. Take the sign into its box.',
        promptVn: 'Điền lưới ô cho $4(3a − 5)$. Mang dấu vào ô của nó.',
        textParts: ['$4 × 3a =$ ', '     $4 × (−5) =$ ', '     so $4(3a − 5) =$ ', ''],
        textPartsVn: ['$4 × 3a =$ ', '     $4 × (−5) =$ ', '     vậy $4(3a − 5) =$ ', ''],
        blanks: {
          '1': { correct: '12a', width: 4 },
          '2': { correct: '-20', width: 4 },
          '3': { correct: '12a - 20', width: 8 },
        },
        solution: ['Multiply the numbers, keep the letter: $4 × 3a = 12a$.', 'The minus travels with the 5: $4 × (−5) = −20$.', 'So $4(3a − 5) = 12a − 20$.'],
        solutionVn: ['Nhân các số, giữ chữ cái: $4 × 3a = 12a$.', 'Dấu trừ đi cùng số 5: $4 × (−5) = −20$.', 'Vậy $4(3a − 5) = 12a − 20$.'],
        answer: '$12a$, $−20$, $12a − 20$',
        answerVn: '$12a$, $−20$, $12a − 20$',
      },
      {
        id: 'p2',
        type: 'dnd',
        prompt: 'Drag each expansion onto the expression it came from. Two cards are left over — they are slips.',
        promptVn: 'Kéo mỗi kết quả khai triển vào biểu thức tương ứng. Sẽ thừa hai thẻ — đó là những lỗi sai.',
        bank: [
          { val: '6x+4', text: '$6x + 4$', textVn: '$6x + 4$' },
          { val: '8-6x', text: '$8 − 6x$', textVn: '$8 − 6x$' },
          { val: '6x+8', text: '$6x + 8$', textVn: '$6x + 8$' },
          { val: '4x+2', text: '$4x + 2$', textVn: '$4x + 2$' },
          { val: '6x-12', text: '$6x − 12$', textVn: '$6x − 12$' },
          { val: '4x+8', text: '$4x + 8$', textVn: '$4x + 8$' },
        ],
        targets: [
          { id: 't1', title: '$2(3x + 4)$', titleVn: '$2(3x + 4)$' },
          { id: 't2', title: '$3(2x − 4)$', titleVn: '$3(2x − 4)$' },
          { id: 't3', title: '$4(x + 2)$', titleVn: '$4(x + 2)$' },
          { id: 't4', title: '$2(4 − 3x)$', titleVn: '$2(4 − 3x)$' },
        ],
        correctSets: { t1: ['6x+8'], t2: ['6x-12'], t3: ['4x+8'], t4: ['8-6x'] },
        solution: ['$2(3x + 4) = 6x + 8$ · $3(2x − 4) = 6x − 12$ · $4(x + 2) = 4x + 8$ · $2(4 − 3x) = 8 − 6x$.', 'The two left over, $6x + 4$ and $4x + 2$, each multiplied only the first term.'],
        solutionVn: ['$2(3x + 4) = 6x + 8$ · $3(2x − 4) = 6x − 12$ · $4(x + 2) = 4x + 8$ · $2(4 − 3x) = 8 − 6x$.', 'Hai thẻ thừa, $6x + 4$ và $4x + 2$, đều chỉ nhân hạng tử đầu tiên.'],
        answer: '$6x + 8$ · $6x − 12$ · $4x + 8$ · $8 − 6x$',
        answerVn: '$6x + 8$ · $6x − 12$ · $4x + 8$ · $8 − 6x$',
      },
      {
        id: 'p3',
        prompt: 'Multiply out $5(2p − q + 3)$.',
        promptVn: 'Nhân phá ngoặc $5(2p − q + 3)$.',
        solution: ['Three terms inside, so three boxes: $5 × 2p = 10p$, $5 × (−q) = −5q$, $5 × 3 = 15$.', 'No two are like terms, so stop: $10p − 5q + 15$.'],
        solutionVn: ['Ba hạng tử bên trong, nên có ba ô: $5 × 2p = 10p$, $5 × (−q) = −5q$, $5 × 3 = 15$.', 'Không có hai hạng tử nào đồng dạng, nên dừng: $10p − 5q + 15$.'],
        answer: '10p - 5q + 15',
        answerVn: '10p - 5q + 15',
      },
      {
        id: 'p4',
        type: 'mcq',
        prompt: 'Three of these expand to the same expression. Which is the **odd one out**?',
        promptVn: 'Ba biểu thức khai triển ra cùng một kết quả. Biểu thức nào **khác loại**?',
        options: [
          { val: 'A', text: '$2(9m + 12)$', textVn: '$2(9m + 12)$' },
          { val: 'B', text: '$6(3m + 4)$', textVn: '$6(3m + 4)$' },
          { val: 'C', text: '$3(6m + 8)$', textVn: '$3(6m + 8)$' },
          { val: 'D', text: '$9(2m + 3)$', textVn: '$9(2m + 3)$' },
        ],
        correct: 'D',
        solution: ['Every first box is $18m$, so look at the second box.', 'A, B and C give $18m + 24$.', 'D gives $9 × 3 = 27$: $18m + 27$. D is the odd one out.'],
        solutionVn: ['Ô đầu tiên của cả bốn đều là $18m$, nên hãy nhìn ô thứ hai.', 'A, B và C cho $18m + 24$.', 'D cho $9 × 3 = 27$: $18m + 27$. D là biểu thức khác loại.'],
        answer: 'D',
        answerVn: 'D',
      },
      {
        id: 'p5',
        prompt: 'Expand and simplify $4(x + 3) + 2x$.',
        promptVn: 'Khai triển rồi rút gọn $4(x + 3) + 2x$.',
        solution: ['Expand first: $4(x + 3) = 4x + 12$.', 'Then collect: $4x + 12 + 2x = 6x + 12$.', '12 is a number and $6x$ is an $x$ term, so stop.'],
        solutionVn: ['Khai triển trước: $4(x + 3) = 4x + 12$.', 'Rồi gộp: $4x + 12 + 2x = 6x + 12$.', '12 là một con số còn $6x$ là hạng tử chứa $x$, nên dừng.'],
        answer: '6x + 12',
        answerVn: '6x + 12',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1',
        type: 'inline',
        prompt: 'Lan writes $3(5 − 2d) = 15 − 6d = 9d$. Complete the verdict.',
        promptVn: 'Lan viết $3(5 − 2d) = 15 − 6d = 9d$. Hoàn thành nhận xét.',
        textParts: ['Lan’s first step, $15 − 6d$, is ', '. Her second step, $9d$, is ', ', because 15 and $6d$ are ', '.'],
        textPartsVn: ['Bước thứ nhất của Lan, $15 − 6d$, là ', '. Bước thứ hai, $9d$, là ', ', vì 15 và $6d$ ', '.'],
        blanks: {
          '1': {
            correct: 'right',
            options: [
              { val: 'right', text: 'right', textVn: 'đúng' },
              { val: 'wrong', text: 'wrong', textVn: 'sai' },
            ],
          },
          '2': {
            correct: 'wrong',
            options: [
              { val: 'right', text: 'right', textVn: 'đúng' },
              { val: 'wrong', text: 'wrong', textVn: 'sai' },
            ],
          },
          '3': {
            correct: 'unlike',
            options: [
              { val: 'like', text: 'like terms', textVn: 'là hạng tử đồng dạng' },
              { val: 'unlike', text: 'not like terms', textVn: 'không phải hạng tử đồng dạng' },
            ],
          },
        },
        solution: ['$3 × 5 = 15$ and $3 × (−2d) = −6d$, so $15 − 6d$ is right.', '15 is a number and $6d$ is a $d$ term — not like terms — so they cannot be collected.', 'Lan carried on past the answer. $15 − 6d$ is already finished.'],
        solutionVn: ['$3 × 5 = 15$ và $3 × (−2d) = −6d$, nên $15 − 6d$ là đúng.', '15 là một con số còn $6d$ là hạng tử chứa $d$ — không đồng dạng — nên không gộp được.', 'Lan đã làm tiếp quá đáp án. $15 − 6d$ đã xong rồi.'],
        answer: 'right · wrong · not like terms',
        answerVn: 'đúng · sai · không phải hạng tử đồng dạng',
      },
      {
        id: 'c2',
        type: 'fill_blank',
        prompt: 'Work backwards. Find the two missing numbers: □(4x + □) = 20x + 35.',
        promptVn: 'Làm ngược lại. Tìm hai số còn thiếu: □(4x + □) = 20x + 35.',
        textParts: ['', ' (4x + ', ') = 20x + 35'],
        textPartsVn: ['', ' (4x + ', ') = 20x + 35'],
        blanks: {
          '1': { correct: '5', width: 3 },
          '2': { correct: '7', width: 3 },
        },
        solution: ['Start with the box you can see: the outside number times $4x$ makes $20x$, so it is $20 ÷ 4 = 5$.', 'Now $5 ×$ □ $= 35$, so the inside number is $35 ÷ 5 = 7$.', 'Check: $5(4x + 7) = 20x + 35$.'],
        solutionVn: ['Bắt đầu từ ô em nhìn thấy được: số bên ngoài nhân $4x$ ra $20x$, nên số đó là $20 ÷ 4 = 5$.', 'Bây giờ $5 ×$ □ $= 35$, nên số bên trong là $35 ÷ 5 = 7$.', 'Kiểm tra: $5(4x + 7) = 20x + 35$.'],
        answer: '5 and 7',
        answerVn: '5 và 7',
      },
      {
        id: 'c3',
        type: 'fill_blank',
        prompt: 'A rectangle is 6 cm wide and $(2y + 5)$ cm long. Write its area and its perimeter in simplest form.',
        promptVn: 'Một hình chữ nhật rộng 6 cm và dài $(2y + 5)$ cm. Viết diện tích và chu vi của nó ở dạng gọn nhất.',
        textParts: ['Area $=$ ', ' cm²      Perimeter $=$ ', ' cm'],
        textPartsVn: ['Diện tích $=$ ', ' cm²      Chu vi $=$ ', ' cm'],
        blanks: {
          '1': { correct: '12y + 30', width: 9 },
          '2': { correct: '4y + 22', width: 9 },
        },
        solution: ['Area = length × width: $6(2y + 5) = 12y + 30$.', 'Perimeter = all four sides: $2(2y + 5) + 2 × 6 = 4y + 10 + 12$.', 'Collect the numbers: $4y + 22$.'],
        solutionVn: ['Diện tích = dài × rộng: $6(2y + 5) = 12y + 30$.', 'Chu vi = tổng bốn cạnh: $2(2y + 5) + 2 × 6 = 4y + 10 + 12$.', 'Gộp các số: $4y + 22$.'],
        answer: 'Area $12y + 30$ cm², perimeter $4y + 22$ cm',
        answerVn: 'Diện tích $12y + 30$ cm², chu vi $4y + 22$ cm',
      },
    ],
  },
];
