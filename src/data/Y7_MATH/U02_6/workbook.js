// src/data/Y7_MATH/U02_6/workbook.js
// Practice for 2.6 Inequalities — 12 questions (4 Focus · 5 Practice ·
// 3 Challenge) mixing six answer widgets: dropdowns in a sentence (the sign
// itself, and the words it is read as), multiple choice, a typed number, a
// typed inequality, drag into a target, the steps dragged into order with one
// wrong card, and typed boxes in a sentence.
//
// Three questions read a drawn number line (WB_LINE_A, _B and _C in
// diagrams.js): a whole number below zero, a circle halfway between two ticks,
// and — in the spirit of the book's Challenge — a line marked in tenths whose
// circle sits between two of the marks.
//
// Every inequality is strict, so every circle is open. Every number is
// original: not the deck's, not Show It's, not the quiz's and not the book's
// Exercise 2.6.
import { DIAGRAMS } from './diagrams.js';

const SIGNS = [
  { val: 'lt', text: '<', textVn: '<' },
  { val: 'gt', text: '>', textVn: '>' },
];

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'inline',
        prompt: 'Choose the sign that makes each statement true.',
        promptVn: 'Chọn dấu để mỗi mệnh đề đúng.',
        textParts: ['$14$ ', ' $9$;   $-19$ ', ' $-12$;   $-20$ ', ' $2$'],
        textPartsVn: ['$14$ ', ' $9$;   $-19$ ', ' $-12$;   $-20$ ', ' $2$'],
        blanks: {
          '1': { options: SIGNS, correct: 'gt' },
          '2': { options: SIGNS, correct: 'lt' },
          '3': { options: SIGNS, correct: 'lt' },
        },
        solution: [
          '$14$ is further right than $9$ on the number line, so $14 > 9$: "14 is greater than 9".',
          '$-19$ is further **left** than $-12$ — it is colder — so $-19 < -12$: "−19 is less than −12".',
          'Every negative number is to the left of every positive number, so $-20 < 2$.',
        ],
        solutionVn: [
          '$14$ nằm xa hơn về bên phải so với $9$ trên trục số, nên $14 > 9$: "14 is greater than 9" (lớn hơn).',
          '$-19$ nằm xa hơn về bên **trái** so với $-12$ — nó lạnh hơn — nên $-19 < -12$: "−19 is less than −12" (nhỏ hơn).',
          'Mọi số âm đều nằm bên trái mọi số dương, nên $-20 < 2$.',
        ],
        answer: '$>$; $<$; $<$',
        answerVn: '$>$; $<$; $<$',
      },
      {
        id: 'f2',
        type: 'mcq',
        prompt: 'Which inequality says "$t$ is below −14"?',
        promptVn: 'Bất đẳng thức nào ghi đúng câu "$t$ is below −14"?',
        options: [
          { val: 'A', text: '$t > -14$', textVn: '$t > -14$' },
          { val: 'B', text: '$t < -14$', textVn: '$t < -14$' },
          { val: 'C', text: '$t < 14$', textVn: '$t < 14$' },
          { val: 'D', text: '$-14 < t$', textVn: '$-14 < t$' },
        ],
        correct: 'B',
        solution: [
          '**Below** means less than, so the sign is $<$.',
          'Write it in the order you read it: $t$, then $<$, then $-14$. That is $t < -14$.',
          'A reads the sign backwards. C has lost the minus sign. D puts the number first but keeps the same sign, so it says "−14 is less than $t$" — the opposite.',
        ],
        solutionVn: [
          '**Below** (dưới) nghĩa là nhỏ hơn, nên dấu là $<$.',
          'Viết theo đúng thứ tự em đọc: $t$, rồi $<$, rồi $-14$. Đó là $t < -14$.',
          'A là đọc ngược dấu. C bỏ mất dấu trừ. D đưa con số lên trước nhưng giữ nguyên dấu, nên nó nói "−14 nhỏ hơn $t$" — nghĩa ngược lại.',
        ],
        answer: 'B',
        answerVn: 'B',
      },
      {
        id: 'f3',
        type: 'inline',
        prompt: 'Complete the sentences about $r > 23$. Choose from the lists.',
        promptVn: 'Hoàn thành các câu về $r > 23$. Hãy chọn trong danh sách.',
        textParts: ['$r > 23$ is read "r ', ' 23". On a number line its arrow points ', ', and 23 itself ', ' included.'],
        textPartsVn: ['$r > 23$ đọc là "r ', ' 23". Trên trục số, mũi tên của nó chỉ sang ', ', và chính số 23 ', ' được tính.'],
        blanks: {
          '1': {
            options: [
              { val: 'lt', text: 'is less than', textVn: 'is less than' },
              { val: 'gt', text: 'is greater than', textVn: 'is greater than' },
              { val: 'eq', text: 'is equal to', textVn: 'is equal to' },
            ],
            correct: 'gt',
          },
          '2': {
            options: [
              { val: 'left', text: 'left', textVn: 'trái' },
              { val: 'right', text: 'right', textVn: 'phải' },
            ],
            correct: 'right',
          },
          '3': {
            options: [
              { val: 'is', text: 'is', textVn: 'có' },
              { val: 'isnot', text: 'is not', textVn: 'không' },
            ],
            correct: 'isnot',
          },
        },
        solution: [
          'Read from left to right: $r$, then $>$ — "is greater than" — then 23.',
          'Greater than means further right on the number line, so the arrow points right.',
          'The circle on 23 is open: 23 is not greater than 23, so 23 is not included.',
        ],
        solutionVn: [
          'Đọc từ trái sang phải: $r$, rồi $>$ — "is greater than" (lớn hơn) — rồi 23.',
          'Lớn hơn nghĩa là nằm xa hơn về bên phải trên trục số, nên mũi tên chỉ sang phải.',
          'Vòng tròn ở số 23 là vòng tròn rỗng: 23 không lớn hơn 23, nên 23 không được tính.',
        ],
        answer: 'is greater than; right; is not',
        answerVn: 'is greater than; phải; không',
      },
      {
        id: 'f4',
        prompt: '$n > 38$. What is the smallest integer $n$ could be?',
        promptVn: '$n > 38$. Số nguyên nhỏ nhất mà $n$ có thể là số nào?',
        solution: [
          'The open circle is on 38: 38 is not greater than 38, so it does not work.',
          'The arrow points right. The first integer after 38 is 39.',
          'The smallest integer $n$ could be is 39.',
        ],
        solutionVn: [
          'Vòng tròn rỗng nằm ở 38: 38 không lớn hơn 38, nên nó không thỏa mãn.',
          'Mũi tên chỉ sang phải. Số nguyên đầu tiên sau 38 là 39.',
          'Số nguyên nhỏ nhất mà $n$ có thể là: 39.',
        ],
        answer: '39',
        answerVn: '39',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        prompt: 'Write the inequality this number line shows. Use the letter $x$.',
        promptVn: 'Viết bất đẳng thức mà trục số này biểu diễn. Dùng chữ $x$.',
        inlineSvg: DIAGRAMS.WB_LINE_A,
        solution: [
          'The open circle is on −16, so −16 is the number in the inequality.',
          'The arrow points right, at the bigger numbers: that is "is greater than", $>$.',
          'The line shows $x > -16$.',
        ],
        solutionVn: [
          'Vòng tròn rỗng nằm ở −16, nên −16 là con số trong bất đẳng thức.',
          'Mũi tên chỉ sang phải, về phía các số lớn hơn: đó là "is greater than", $>$.',
          'Trục số biểu diễn $x > -16$.',
        ],
        answer: '$x > -16$',
        answerVn: '$x > -16$',
      },
      {
        id: 'p2',
        prompt: '$w < -25$. What is the largest integer $w$ could be?',
        promptVn: '$w < -25$. Số nguyên lớn nhất mà $w$ có thể là số nào?',
        solution: [
          'Less than means further left on the number line, even below zero.',
          '−25 is the open circle: −25 is not less than −25.',
          'The first integer to the left of −25 is −26. (−24 is to the right, so it is greater than −25.)',
        ],
        solutionVn: [
          'Nhỏ hơn nghĩa là nằm xa hơn về bên trái trên trục số, kể cả khi dưới 0.',
          '−25 là vòng tròn rỗng: −25 không nhỏ hơn −25.',
          'Số nguyên đầu tiên bên trái −25 là −26. (−24 nằm bên phải, nên nó lớn hơn −25.)',
        ],
        answer: '$-26$',
        answerVn: '$-26$',
      },
      {
        id: 'p3',
        type: 'mcq',
        prompt: 'This line shows an inequality for $y$. What is the largest integer $y$ could be?',
        promptVn: 'Trục số này biểu diễn một bất đẳng thức của $y$. Số nguyên lớn nhất mà $y$ có thể là số nào?',
        inlineSvg: DIAGRAMS.WB_LINE_B,
        options: [
          { val: 'A', text: '$8.5$', textVn: '$8.5$' },
          { val: 'B', text: '$9$', textVn: '$9$' },
          { val: 'C', text: '$8$', textVn: '$8$' },
          { val: 'D', text: '$7$', textVn: '$7$' },
        ],
        correct: 'C',
        solution: [
          'The open circle sits halfway between 8 and 9, so the line shows $y < 8.5$.',
          'The arrow points left. The first integer on that side is 8, and $8 < 8.5$.',
          '8.5 is the open circle, and it is not an integer. 9 is on the wrong side: $9 > 8.5$. 7 works, but 8 is larger.',
        ],
        solutionVn: [
          'Vòng tròn rỗng nằm chính giữa 8 và 9, nên trục số biểu diễn $y < 8.5$.',
          'Mũi tên chỉ sang trái. Số nguyên đầu tiên ở phía đó là 8, và $8 < 8.5$.',
          '8.5 là vòng tròn rỗng, và nó không phải số nguyên. 9 nằm sai phía: $9 > 8.5$. 7 có thỏa mãn, nhưng 8 lớn hơn.',
        ],
        answer: 'C',
        answerVn: 'C',
      },
      {
        id: 'p4',
        type: 'dnd',
        prompt: '$k > 51$ and $k < 56$. Drag every integer $k$ could be into the box. Leave the others out.',
        promptVn: '$k > 51$ và $k < 56$. Kéo mọi số nguyên mà $k$ có thể là vào ô. Bỏ các số còn lại ra.',
        bank: [
          { val: '54', text: '$54$' },
          { val: '51', text: '$51$' },
          { val: '57', text: '$57$' },
          { val: '52', text: '$52$' },
          { val: '56', text: '$56$' },
          { val: '55', text: '$55$' },
          { val: '50', text: '$50$' },
          { val: '53', text: '$53$' },
        ],
        targets: [{ id: 'fit', title: '$k$ could be', titleVn: '$k$ có thể là' }],
        correctSets: { fit: ['52', '53', '54', '55'] },
        solution: [
          '$k > 51$: the integers 52, 53, 54, … work. 51 is an open circle, so it is out.',
          '$k < 56$: the integers 55, 54, 53, … work. 56 is an open circle, so it is out.',
          'The integers that fit **both** are 52, 53, 54 and 55. 50 and 57 are outside.',
        ],
        solutionVn: [
          '$k > 51$: các số nguyên 52, 53, 54, … thỏa mãn. 51 là vòng tròn rỗng, nên bị loại.',
          '$k < 56$: các số nguyên 55, 54, 53, … thỏa mãn. 56 là vòng tròn rỗng, nên bị loại.',
          'Các số nguyên thỏa mãn **cả hai** là 52, 53, 54 và 55. 50 và 57 nằm ngoài.',
        ],
        answer: '52, 53, 54, 55',
        answerVn: '52, 53, 54, 55',
      },
      {
        id: 'p5',
        type: 'order',
        prompt: 'Drag the steps for showing $x < 19$ on a number line into order. One card is a mistake — leave it out.',
        promptVn: 'Kéo các bước biểu diễn $x < 19$ trên trục số theo đúng thứ tự. Có một thẻ là lỗi sai — hãy bỏ nó ra.',
        bank: [
          { val: 'arrowR', text: 'Draw the arrow from the circle to the right', textVn: 'Vẽ mũi tên từ vòng tròn sang phải' },
          { val: 'largest', text: 'Read off the largest integer: 18', textVn: 'Đọc số nguyên lớn nhất: 18' },
          { val: 'find', text: 'Find 19 on the number line', textVn: 'Tìm số 19 trên trục số' },
          { val: 'arrowL', text: 'Draw the arrow from the circle to the left', textVn: 'Vẽ mũi tên từ vòng tròn sang trái' },
          { val: 'circle', text: 'Draw an open circle above 19', textVn: 'Vẽ một vòng tròn rỗng phía trên số 19' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['find', 'circle', 'arrowL', 'largest'] },
        solution: [
          'The circle comes first: find 19 and draw an open circle above it, because 19 itself is not included.',
          'Then the arrow. Less than means further left, so the arrow goes to the left.',
          'The first integer the arrow reaches is 18: that is the largest integer $x$ could be. An arrow to the right would show $x > 19$.',
        ],
        solutionVn: [
          'Vòng tròn trước: tìm số 19 và vẽ một vòng tròn rỗng phía trên nó, vì chính số 19 không được tính.',
          'Rồi đến mũi tên. Nhỏ hơn nghĩa là nằm xa hơn về bên trái, nên mũi tên đi sang trái.',
          'Số nguyên đầu tiên mà mũi tên đi tới là 18: đó là số nguyên lớn nhất mà $x$ có thể là. Mũi tên sang phải thì biểu diễn $x > 19$.',
        ],
        answer: 'find 19 → open circle → arrow left → largest integer 18',
        answerVn: 'tìm 19 → vòng tròn rỗng → mũi tên sang trái → số nguyên lớn nhất 18',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1',
        type: 'mcq',
        prompt: 'This number line is marked in tenths. Which inequality does it show?',
        promptVn: 'Trục số này được chia theo phần mười. Nó biểu diễn bất đẳng thức nào?',
        inlineSvg: DIAGRAMS.WB_LINE_C,
        options: [
          { val: 'A', text: '$x > 5.3$', textVn: '$x > 5.3$' },
          { val: 'B', text: '$x > 5.35$', textVn: '$x > 5.35$' },
          { val: 'C', text: '$x > 5.4$', textVn: '$x > 5.4$' },
          { val: 'D', text: '$x > 5.035$', textVn: '$x > 5.035$' },
        ],
        correct: 'B',
        solution: [
          'Each small mark is 0.1. Count on from 5: the marks are 5.1, 5.2, 5.3, 5.4, …',
          'The open circle sits halfway between the 5.3 mark and the 5.4 mark. Halfway between 5.3 and 5.4 is 5.35.',
          'The arrow points right, so the line shows $x > 5.35$. A and C read the nearest mark instead of the circle. D has the digits in the wrong columns: 5.035 is only just past 5.',
          'The smallest integer $x$ could be is 6.',
        ],
        solutionVn: [
          'Mỗi vạch nhỏ là 0.1. Đếm tiếp từ 5: các vạch là 5.1, 5.2, 5.3, 5.4, …',
          'Vòng tròn rỗng nằm chính giữa vạch 5.3 và vạch 5.4. Chính giữa 5.3 và 5.4 là 5.35.',
          'Mũi tên chỉ sang phải, nên trục số biểu diễn $x > 5.35$. A và C đọc vạch gần nhất thay vì đọc vị trí vòng tròn. D đặt chữ số sai cột: 5.035 chỉ vừa qua số 5 một chút.',
          'Số nguyên nhỏ nhất mà $x$ có thể là: 6.',
        ],
        answer: 'B',
        answerVn: 'B',
      },
      {
        id: 'c2',
        prompt: 'A box holds more than 17 mangoes. It holds fewer than 19 mangoes. How many mangoes are in the box?',
        promptVn: 'Một thùng có nhiều hơn 17 quả xoài (more than 17). Thùng có ít hơn 19 quả xoài (fewer than 19). Trong thùng có bao nhiêu quả xoài?',
        solution: [
          'Write the two inequalities. Use $m$ for the number of mangoes: $m > 17$ and $m < 19$.',
          '17 is not more than 17, and 19 is not fewer than 19: both are open circles.',
          'A number of mangoes is an integer, and the only integer between 17 and 19 is 18. Two inequalities together can leave exactly one answer.',
        ],
        solutionVn: [
          'Viết hai bất đẳng thức. Dùng $m$ cho số quả xoài: $m > 17$ và $m < 19$.',
          '17 không nhiều hơn 17, và 19 không ít hơn 19: cả hai đều là vòng tròn rỗng.',
          'Số quả xoài là một số nguyên, và số nguyên duy nhất nằm giữa 17 và 19 là 18. Hai bất đẳng thức gộp lại có thể chỉ còn đúng một đáp án.',
        ],
        answer: '18',
        answerVn: '18',
        accept: ['18 mangoes', '18 quả', '18 quả xoài'],
      },
      {
        id: 'c3',
        type: 'fill_blank',
        prompt: 'The same number, two inequalities. Fill in both integers.',
        promptVn: 'Cùng một con số, hai bất đẳng thức. Điền cả hai số nguyên.',
        textParts: ['$g > -19.5$: the smallest integer $g$ could be is ', '. $g < -19.5$: the largest integer $g$ could be is ', '.'],
        textPartsVn: ['$g > -19.5$: số nguyên nhỏ nhất mà $g$ có thể là ', '. $g < -19.5$: số nguyên lớn nhất mà $g$ có thể là ', '.'],
        blanks: {
          '1': { correct: '-19', width: 5 },
          '2': { correct: '-20', width: 5 },
        },
        solution: [
          '−19.5 sits halfway between −20 and −19 on the number line: −20 is on its left and −19 is on its right.',
          'Greater than means right: the first integer to the right of −19.5 is −19.',
          'Less than means left: the first integer to the left of −19.5 is −20. The circle itself, −19.5, is not an integer, so it is never the answer.',
        ],
        solutionVn: [
          '−19.5 nằm chính giữa −20 và −19 trên trục số: −20 ở bên trái nó và −19 ở bên phải nó.',
          'Lớn hơn nghĩa là bên phải: số nguyên đầu tiên bên phải −19.5 là −19.',
          'Nhỏ hơn nghĩa là bên trái: số nguyên đầu tiên bên trái −19.5 là −20. Chính vòng tròn, −19.5, không phải số nguyên, nên nó không bao giờ là đáp án.',
        ],
        answer: '$-19$; $-20$',
        answerVn: '$-19$; $-20$',
      },
    ],
  },
];
