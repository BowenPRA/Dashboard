// src/data/Y7_MATH/U02_5/workbook.js
// Practice for 2.5 Constructing and Solving Equations — 12 questions
// (4 Focus · 5 Practice · 3 Challenge) mixing five answer widgets: a typed
// solution, dropdowns for the operation and its inverse, typed boxes on a
// reverse flow chart, "which equation" multiple choice, and dragging the
// solving steps into order (with one wrong-order step as a distractor).
//
// Every number is original: not the deck's, not Undo It's, and not the book's
// Exercise 2.5, which is the classroom homework. Answers are single values, so
// marking is exact.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        prompt: 'Solve $x + 13 = 31$.',
        promptVn: 'Giải $x + 13 = 31$.',
        solution: [
          'Forward: $x$, then $+ 13$, gives 31.',
          'Undo $+ 13$ with its inverse, $− 13$: $31 − 13 = 18$.',
          'Check: $18 + 13 = 31$ ✓.',
        ],
        solutionVn: [
          'Đi xuôi: $x$, rồi $+ 13$, được 31.',
          'Làm ngược $+ 13$ bằng phép ngược của nó, $− 13$: $31 − 13 = 18$.',
          'Thử lại: $18 + 13 = 31$ ✓.',
        ],
        answer: '18',
        answerVn: '18',
      },
      {
        id: 'f2',
        type: 'inline',
        prompt: 'Choose the operation and its inverse.',
        promptVn: 'Chọn phép toán và phép ngược của nó.',
        textParts: ['In $\\frac{m}{5} = 7$, the operation done to $m$ is ', ' 5, and the inverse operation is ', ' 5.'],
        textPartsVn: ['Trong $\\frac{m}{5} = 7$, phép toán làm với $m$ là ', ' 5, và phép toán ngược là ', ' 5.'],
        blanks: {
          '1': {
            options: [
              { val: 'add', text: '+', textVn: '+' },
              { val: 'sub', text: '−', textVn: '−' },
              { val: 'mul', text: '×', textVn: '×' },
              { val: 'div', text: '÷', textVn: '÷' },
            ],
            correct: 'div',
          },
          '2': {
            options: [
              { val: 'add', text: '+', textVn: '+' },
              { val: 'sub', text: '−', textVn: '−' },
              { val: 'mul', text: '×', textVn: '×' },
              { val: 'div', text: '÷', textVn: '÷' },
            ],
            correct: 'mul',
          },
        },
        solution: [
          'The fraction line means divide: $\\frac{m}{5}$ is $m ÷ 5$.',
          'The inverse of ÷ is ×, so $× 5$ undoes it.',
          '$7 × 5 = 35$, so $m = 35$.',
        ],
        solutionVn: [
          'Vạch phân số nghĩa là chia: $\\frac{m}{5}$ là $m ÷ 5$.',
          'Phép ngược của ÷ là ×, nên $× 5$ làm ngược nó.',
          '$7 × 5 = 35$, nên $m = 35$.',
        ],
        answer: '÷ 5, undone by × 5',
        answerVn: '÷ 5, làm ngược bằng × 5',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: 'Reverse the flow chart for $x − 9 = 16$. Fill in the reverse box and the answer.',
        promptVn: 'Đi ngược sơ đồ của $x − 9 = 16$. Điền ô đi ngược và đáp án.',
        textParts: ['Start at $16$. The reverse box is $+$ ', ', so $x =$ ', '.'],
        textPartsVn: ['Bắt đầu từ $16$. Ô đi ngược là $+$ ', ', nên $x =$ ', '.'],
        blanks: {
          '1': { correct: '9', width: 4 },
          '2': { correct: '25', width: 4 },
        },
        solution: [
          'Forward: $x$, then $− 9$, gives 16.',
          'The reverse box holds the inverse of $− 9$, which is $+ 9$.',
          '$16 + 9 = 25$. Check: $25 − 9 = 16$ ✓.',
        ],
        solutionVn: [
          'Đi xuôi: $x$, rồi $− 9$, được 16.',
          'Ô đi ngược ghi phép ngược của $− 9$, tức là $+ 9$.',
          '$16 + 9 = 25$. Thử lại: $25 − 9 = 16$ ✓.',
        ],
        answer: '$+ 9$; $x = 25$',
        answerVn: '$+ 9$; $x = 25$',
      },
      {
        id: 'f4',
        prompt: 'Solve $54 = 9k$.',
        promptVn: 'Giải $54 = 9k$.',
        solution: [
          'Either way round: $54 = 9k$ means $9k = 54$.',
          '$9k$ means $k × 9$. Undo it with $÷ 9$: $54 ÷ 9 = 6$.',
          'Check: $9 × 6 = 54$ ✓.',
        ],
        solutionVn: [
          'Chiều nào cũng được: $54 = 9k$ nghĩa là $9k = 54$.',
          '$9k$ nghĩa là $k × 9$. Làm ngược bằng $÷ 9$: $54 ÷ 9 = 6$.',
          'Thử lại: $9 × 6 = 54$ ✓.',
        ],
        answer: '6',
        answerVn: '6',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        type: 'mcq',
        prompt: '"I think of a number, multiply it by 3, then subtract 8. The answer is 19." Which equation says this?',
        promptVn: '"Tôi nghĩ ra một số, nhân nó với 3, rồi trừ đi 8. Kết quả là 19." Phương trình nào nói điều này?',
        options: [
          { val: 'A', text: '$3n + 8 = 19$', textVn: '$3n + 8 = 19$' },
          { val: 'B', text: '$3(n − 8) = 19$', textVn: '$3(n − 8) = 19$' },
          { val: 'C', text: '$3n − 8 = 19$', textVn: '$3n − 8 = 19$' },
          { val: 'D', text: '$n − 8 = 19$', textVn: '$n − 8 = 19$' },
        ],
        correct: 'C',
        solution: [
          'Call the number $n$. Multiply it by 3 first: $3n$. Then subtract 8: $3n − 8$.',
          'A writes the inverse, $+ 8$ — the equation says what was DONE. B subtracts before multiplying, the wrong order. D leaves out the $× 3$.',
          'Solving it: $19 + 8 = 27$, $27 ÷ 3 = 9$.',
        ],
        solutionVn: [
          'Gọi số đó là $n$. Nhân với 3 trước: $3n$. Rồi trừ 8: $3n − 8$.',
          'A viết phép ngược, $+ 8$ — phương trình ghi lại những gì đã LÀM. B trừ trước khi nhân, sai thứ tự. D bỏ mất $× 3$.',
          'Giải nó: $19 + 8 = 27$, $27 ÷ 3 = 9$.',
        ],
        answer: 'C',
        answerVn: 'C',
      },
      {
        id: 'p2',
        prompt: 'Solve $5a + 7 = 42$.',
        promptVn: 'Giải $5a + 7 = 42$.',
        solution: [
          'Forward: $× 5$, then $+ 7$. The $+ 7$ happened last.',
          'Undo the last step first: $42 − 7 = 35$.',
          'Then undo $× 5$: $35 ÷ 5 = 7$. Check: $5 × 7 + 7 = 42$ ✓.',
        ],
        solutionVn: [
          'Đi xuôi: $× 5$, rồi $+ 7$. Phép $+ 7$ làm sau cùng.',
          'Làm ngược bước cuối trước: $42 − 7 = 35$.',
          'Rồi làm ngược $× 5$: $35 ÷ 5 = 7$. Thử lại: $5 × 7 + 7 = 42$ ✓.',
        ],
        answer: '7',
        answerVn: '7',
      },
      {
        id: 'p3',
        type: 'order',
        prompt: 'Drag the steps for solving $4x − 8 = 28$ into order. One card is a mistake — leave it out.',
        promptVn: 'Kéo các bước giải $4x − 8 = 28$ theo đúng thứ tự. Có một thẻ là lỗi sai — hãy bỏ nó ra.',
        bank: [
          { val: 'divfirst', text: 'Divide by 4 first: $28 ÷ 4 = 7$', textVn: 'Chia cho 4 trước: $28 ÷ 4 = 7$' },
          { val: 'check', text: 'Check: $4 × 9 − 8 = 28$', textVn: 'Thử lại: $4 × 9 − 8 = 28$' },
          { val: 'start', text: 'Start at the answer, 28', textVn: 'Bắt đầu từ kết quả, 28' },
          { val: 'div', text: 'Undo $× 4$: $36 ÷ 4 = 9$', textVn: 'Làm ngược $× 4$: $36 ÷ 4 = 9$' },
          { val: 'add', text: 'Undo $− 8$: $28 + 8 = 36$', textVn: 'Làm ngược $− 8$: $28 + 8 = 36$' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['start', 'add', 'div', 'check'] },
        solution: [
          'Forward, $x$ is multiplied by 4 and then 8 is taken away. The $− 8$ is the last step.',
          'So start at 28 and undo the $− 8$ first: $28 + 8 = 36$. Then $36 ÷ 4 = 9$.',
          'Finish by putting 9 back in. "Divide by 4 first" undoes the steps in the wrong order.',
        ],
        solutionVn: [
          'Đi xuôi, $x$ được nhân với 4 rồi trừ đi 8. Phép $− 8$ là bước cuối.',
          'Vậy bắt đầu từ 28 và làm ngược $− 8$ trước: $28 + 8 = 36$. Rồi $36 ÷ 4 = 9$.',
          'Kết thúc bằng việc thay 9 vào lại. "Chia cho 4 trước" là làm ngược sai thứ tự.',
        ],
        answer: 'Start at 28 · + 8 = 36 · ÷ 4 = 9 · check',
        answerVn: 'Bắt đầu từ 28 · + 8 = 36 · ÷ 4 = 9 · thử lại',
      },
      {
        id: 'p4',
        type: 'inline',
        prompt: 'A bracket changes the order. Choose from the lists.',
        promptVn: 'Dấu ngoặc làm thay đổi thứ tự. Hãy chọn trong danh sách.',
        textParts: ['In $2(y + 3) = 22$, the last thing done to $y$ was ', '. So the first step to solve it is ', '.'],
        textPartsVn: ['Trong $2(y + 3) = 22$, việc cuối cùng làm với $y$ là ', '. Vậy bước đầu tiên để giải là ', '.'],
        blanks: {
          '1': {
            options: [
              { val: 'plus3', text: '+ 3', textVn: '+ 3' },
              { val: 'times2', text: '× 2', textVn: '× 2' },
            ],
            correct: 'times2',
          },
          '2': {
            options: [
              { val: 'minus3', text: '− 3', textVn: '− 3' },
              { val: 'div2', text: '÷ 2', textVn: '÷ 2' },
              { val: 'plus3', text: '+ 3', textVn: '+ 3' },
            ],
            correct: 'div2',
          },
        },
        solution: [
          'Brackets first: $y$ has 3 added, THEN the bracket is multiplied by 2.',
          'So $× 2$ was the last step, and it is undone first: $22 ÷ 2 = 11$.',
          'Then $11 − 3 = 8$. Check: $2 × (8 + 3) = 22$ ✓.',
        ],
        solutionVn: [
          'Ngoặc trước: $y$ được cộng 3, RỒI cả ngoặc được nhân với 2.',
          'Vậy $× 2$ là bước cuối, và được làm ngược trước: $22 ÷ 2 = 11$.',
          'Rồi $11 − 3 = 8$. Thử lại: $2 × (8 + 3) = 22$ ✓.',
        ],
        answer: '× 2; ÷ 2',
        answerVn: '× 2; ÷ 2',
      },
      {
        id: 'p5',
        prompt: 'Solve $\\frac{n}{3} + 4 = 10$.',
        promptVn: 'Giải $\\frac{n}{3} + 4 = 10$.',
        solution: [
          'Forward: $÷ 3$, then $+ 4$.',
          'Undo the $+ 4$ first: $10 − 4 = 6$.',
          'Then undo $÷ 3$ with $× 3$: $6 × 3 = 18$. Check: $18 ÷ 3 + 4 = 10$ ✓.',
        ],
        solutionVn: [
          'Đi xuôi: $÷ 3$, rồi $+ 4$.',
          'Làm ngược $+ 4$ trước: $10 − 4 = 6$.',
          'Rồi làm ngược $÷ 3$ bằng $× 3$: $6 × 3 = 18$. Thử lại: $18 ÷ 3 + 4 = 10$ ✓.',
        ],
        answer: '18',
        answerVn: '18',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1',
        type: 'fill_blank',
        prompt: 'Mr Bowen buys 5 pens and a ruler. The ruler costs 8 thousand dong. He pays 43 thousand dong. Let $p$ be the cost of one pen. Complete the equation, then solve it.',
        promptVn: 'Thầy Bowen mua 5 cây bút và một cây thước. Cây thước giá 8 nghìn đồng. Thầy trả 43 nghìn đồng. Gọi $p$ là giá một cây bút. Hoàn thành phương trình, rồi giải.',
        textParts: ['$5p +$ ', ' $=$ ', ', so one pen costs ', ' thousand dong.'],
        textPartsVn: ['$5p +$ ', ' $=$ ', ', nên một cây bút giá ', ' nghìn đồng.'],
        blanks: {
          '1': { correct: '8', width: 4 },
          '2': { correct: '43', width: 4 },
          '3': { correct: '7', width: 4 },
        },
        solution: [
          'Five pens cost $5p$. The ruler adds 8. Altogether: $5p + 8 = 43$.',
          'Undo the $+ 8$ first: $43 − 8 = 35$.',
          'Then $35 ÷ 5 = 7$. One pen costs 7 thousand dong. Check: $5 × 7 + 8 = 43$ ✓.',
        ],
        solutionVn: [
          'Năm cây bút giá $5p$. Cây thước thêm 8. Tổng cộng: $5p + 8 = 43$.',
          'Làm ngược $+ 8$ trước: $43 − 8 = 35$.',
          'Rồi $35 ÷ 5 = 7$. Một cây bút giá 7 nghìn đồng. Thử lại: $5 × 7 + 8 = 43$ ✓.',
        ],
        answer: '$5p + 8 = 43$; 7',
        answerVn: '$5p + 8 = 43$; 7',
      },
      {
        id: 'c2',
        prompt: 'At midnight the temperature was $t$ °C. By noon it had risen 9 degrees, to 4 °C. Write an equation and solve it. What was the temperature at midnight?',
        promptVn: 'Lúc nửa đêm nhiệt độ là $t$ °C. Đến trưa nó tăng thêm 9 độ, lên 4 °C. Viết phương trình và giải. Nhiệt độ lúc nửa đêm là bao nhiêu?',
        solution: [
          'Rising 9 degrees means $+ 9$: $t + 9 = 4$.',
          'Undo $+ 9$ with $− 9$: $4 − 9 = −5$.',
          'A negative answer is fine — it was below zero. Check: $−5 + 9 = 4$ ✓.',
        ],
        solutionVn: [
          'Tăng 9 độ nghĩa là $+ 9$: $t + 9 = 4$.',
          'Làm ngược $+ 9$ bằng $− 9$: $4 − 9 = −5$.',
          'Đáp án âm hoàn toàn được — trời dưới 0 độ. Thử lại: $−5 + 9 = 4$ ✓.',
        ],
        answer: '-5',
        answerVn: '-5',
      },
      {
        id: 'c3',
        type: 'mcq',
        prompt: 'Angles on a straight line add up to 180°. Two angles on a straight line are $7x$ and $3x$. How big is the $7x$ angle?',
        promptVn: 'Các góc trên một đường thẳng cộng lại bằng 180°. Hai góc trên một đường thẳng là $7x$ và $3x$. Góc $7x$ bằng bao nhiêu độ?',
        options: [
          { val: 'A', text: '$18°$', textVn: '$18°$' },
          { val: 'B', text: '$126°$', textVn: '$126°$' },
          { val: 'C', text: '$54°$', textVn: '$54°$' },
          { val: 'D', text: '$90°$', textVn: '$90°$' },
        ],
        correct: 'B',
        solution: [
          'Collect first (2.3): $7x + 3x = 10x$, so $10x = 180$.',
          '$180 ÷ 10 = 18$, so $x = 18$ — but that is not the angle yet.',
          'The $7x$ angle is $7 × 18 = 126°$ (and $3x = 54°$; $126 + 54 = 180$ ✓). A stopped at $x$; C is the other angle; D halves 180, but the angles are not equal.',
        ],
        solutionVn: [
          'Gộp trước (bài 2.3): $7x + 3x = 10x$, nên $10x = 180$.',
          '$180 ÷ 10 = 18$, nên $x = 18$ — nhưng đó chưa phải là góc.',
          'Góc $7x$ bằng $7 × 18 = 126°$ (và $3x = 54°$; $126 + 54 = 180$ ✓). A dừng lại ở $x$; C là góc còn lại; D chia đôi 180, nhưng hai góc không bằng nhau.',
        ],
        answer: 'B',
        answerVn: 'B',
      },
    ],
  },
];
