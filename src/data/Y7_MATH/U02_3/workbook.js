// src/data/Y7_MATH/U02_3/workbook.js
// Practice for 2.3 Collecting Like Terms (WORKBOOK, 12 Q: 4 Focus · 5 Practice ·
// 3 Challenge). Five answer widgets, chosen so that "simplest form" is marked
// by the SHAPE of the answer wherever it matters: the typed box is marked by
// value (answersEquivalent), so the harder simplifications ask for the numbers
// in front of each kind in fill-in boxes instead.
//
//   dropdowns  like / not like                       (f1)
//   drag       signed terms into baskets             (f2)
//   typed      short simplifications                 (f3, f4, p5, c3)
//   fill-in    coefficient boxes, a brick row, a pyramid (p1, p2, p3, c1)
//   choice     which cannot be simplified; a perimeter (p4, c2)
//
// Every number is original — the book's Exercise 2.3 is the homework, and the
// deck and Collect It use different numbers again. Multi-letter answers (pq)
// are never typed whole: the equivalence checker reads "pq" as a word.
import { DIAGRAMS } from './diagrams.js';

const LIKE = [
  { val: 'like', text: 'like terms', textVn: 'đồng dạng' },
  { val: 'not', text: 'not like terms', textVn: 'không đồng dạng' },
];

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1', type: 'inline',
        prompt: 'Choose for each pair: **like terms** or **not like terms**?',
        promptVn: 'Chọn cho từng cặp: **đồng dạng** hay **không đồng dạng**?',
        textParts: ['$6q$ and $q$ are ', '. $4z$ and $4$ are ', '. $2cd$ and $5dc$ are ', '.'],
        textPartsVn: ['$6q$ và $q$ là ', '. $4z$ và $4$ là ', '. $2cd$ và $5dc$ là ', '.'],
        blanks: {
          '1': { options: LIKE, correct: 'like' },
          '2': { options: LIKE, correct: 'not' },
          '3': { options: LIKE, correct: 'like' },
        },
        solution: [
          'Look at the letters, not the numbers.',
          '$6q$ and $q$: both $q$ terms ($q$ is $1q$) — like.',
          '$4z$ and $4$: the $4$ has no letter — not like.',
          '$2cd$ and $5dc$: $cd = dc$, because $c × d = d × c$ — like.',
        ],
        solutionVn: [
          'Nhìn chữ cái, không nhìn con số.',
          '$6q$ và $q$: đều là hạng tử $q$ ($q$ là $1q$) — đồng dạng.',
          '$4z$ và $4$: số $4$ không có chữ cái — không đồng dạng.',
          '$2cd$ và $5dc$: $cd = dc$, vì $c × d = d × c$ — đồng dạng.',
        ],
        answer: 'like · not like · like', answerVn: 'đồng dạng · không đồng dạng · đồng dạng',
      },
      {
        id: 'f2', type: 'dnd',
        prompt: 'Drag each term of $5x + 3 + 2y − x + 4y − 1$ into its basket. The sign in front goes with the term.',
        promptVn: 'Kéo từng hạng tử của $5x + 3 + 2y − x + 4y − 1$ vào rổ của nó. Dấu đứng trước đi cùng hạng tử.',
        bank: [
          { val: '5x', text: '$5x$' },
          { val: '+3', text: '$+3$' },
          { val: '+2y', text: '$+2y$' },
          { val: '-x', text: '$−x$' },
          { val: '+4y', text: '$+4y$' },
          { val: '-1', text: '$−1$' },
        ],
        targets: [
          { id: 'x', title: '$x$ terms', titleVn: 'Hạng tử $x$' },
          { id: 'y', title: '$y$ terms', titleVn: 'Hạng tử $y$' },
          { id: 'n', title: 'Numbers', titleVn: 'Các số' },
        ],
        correctSets: { x: ['5x', '-x'], y: ['+2y', '+4y'], n: ['+3', '-1'] },
        solution: [
          'Each kind gets its own basket, and each term keeps the sign in front of it.',
          '$x$ terms: $5x$ and $−x$. $y$ terms: $+2y$ and $+4y$. Numbers: $+3$ and $−1$.',
          'Collected: $4x + 6y + 2$.',
        ],
        solutionVn: [
          'Mỗi loại có một rổ riêng, và mỗi hạng tử giữ dấu đứng trước nó.',
          'Hạng tử $x$: $5x$ và $−x$. Hạng tử $y$: $+2y$ và $+4y$. Các số: $+3$ và $−1$.',
          'Sau khi gộp: $4x + 6y + 2$.',
        ],
        answer: '$5x, −x$ · $+2y, +4y$ · $+3, −1$', answerVn: '$5x, −x$ · $+2y, +4y$ · $+3, −1$',
      },
      {
        id: 'f3',
        prompt: 'Simplify $7j + 2j$.',
        promptVn: 'Rút gọn $7j + 2j$.',
        solution: ['Both are $j$ terms, so they collect.', '$7 + 2 = 9$, and the letter stays: $9j$.'],
        solutionVn: ['Cả hai đều là hạng tử $j$, nên gộp được.', '$7 + 2 = 9$, và chữ cái giữ nguyên: $9j$.'],
        answer: '$9j$', answerVn: '$9j$',
      },
      {
        id: 'f4',
        prompt: 'Simplify $11f − f$.',
        promptVn: 'Rút gọn $11f − f$.',
        solution: ['The lone $f$ is $1f$ — the invisible 1.', '$11f − 1f = 10f$. Not $11$, and not $10$: the letter never disappears.'],
        solutionVn: ['Chữ $f$ đứng riêng là $1f$ — số 1 vô hình.', '$11f − 1f = 10f$. Không phải $11$, cũng không phải $10$: chữ cái không bao giờ biến mất.'],
        answer: '$10f$', answerVn: '$10f$',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1', type: 'fill_blank',
        prompt: 'Simplify $9a + 4b − 2a + b$. Fill in the numbers.',
        promptVn: 'Rút gọn $9a + 4b − 2a + b$. Điền các số.',
        textParts: ['$9a + 4b − 2a + b =$ ', '$a\\ +$ ', '$b$'],
        textPartsVn: ['$9a + 4b − 2a + b =$ ', '$a\\ +$ ', '$b$'],
        blanks: { '1': { correct: '7', width: 3 }, '2': { correct: '5', width: 3 } },
        solution: ['Move each term with its sign: $9a − 2a + 4b + b$.', '$a$ terms: $9 − 2 = 7$. $b$ terms: $4 + 1 = 5$ (the lone $b$ is $1b$).', '$7a + 5b$.'],
        solutionVn: ['Di chuyển mỗi hạng tử cùng dấu của nó: $9a − 2a + 4b + b$.', 'Hạng tử $a$: $9 − 2 = 7$. Hạng tử $b$: $4 + 1 = 5$ ($b$ đứng riêng là $1b$).', '$7a + 5b$.'],
        answer: '$7a + 5b$', answerVn: '$7a + 5b$',
      },
      {
        id: 'p2', type: 'fill_blank',
        prompt: 'Each $x$ brick is $x$ cm long and each $y$ brick is $y$ cm long. How long is this row, in simplest form?',
        promptVn: 'Mỗi viên gạch $x$ dài $x$ cm và mỗi viên gạch $y$ dài $y$ cm. Hàng gạch này dài bao nhiêu, ở dạng gọn nhất?',
        inlineSvg: DIAGRAMS.WB_BRICK_ROW,
        inlineSvgSolved: DIAGRAMS.WB_BRICK_ROW_SOLVED,
        textParts: ['Length $=$ ', '$x\\ +$ ', '$y$ cm'],
        textPartsVn: ['Chiều dài $=$ ', '$x\\ +$ ', '$y$ cm'],
        blanks: { '1': { correct: '2', width: 3 }, '2': { correct: '3', width: 3 } },
        solution: ['Read the row: $y + x + y + y + x$.', 'Count each kind: two $x$ bricks, three $y$ bricks.', 'Length $= 2x + 3y$ cm.'],
        solutionVn: ['Đọc hàng gạch: $y + x + y + y + x$.', 'Đếm từng loại: hai viên gạch $x$, ba viên gạch $y$.', 'Chiều dài $= 2x + 3y$ cm.'],
        answer: '$2x + 3y$ cm', answerVn: '$2x + 3y$ cm',
      },
      {
        id: 'p3', type: 'fill_blank',
        prompt: 'In an algebra pyramid, each block is the two blocks under it added together. Fill in the three empty blocks.',
        promptVn: 'Trong kim tự tháp đại số, mỗi ô bằng hai ô bên dưới cộng lại. Điền ba ô còn trống.',
        inlineSvg: DIAGRAMS.WB_PYRAMID,
        inlineSvgSolved: DIAGRAMS.WB_PYRAMID_SOLVED,
        textParts: ['Middle left: ', '   Middle right: ', '   Top: ', ''],
        textPartsVn: ['Giữa bên trái: ', '   Giữa bên phải: ', '   Đỉnh: ', ''],
        blanks: {
          '1': { correct: '5m + 1', width: 7 },
          '2': { correct: '4m + 1', width: 7 },
          '3': { correct: '9m + 2', width: 7 },
        },
        solution: [
          'Middle left: $2m + 3m + 1 = 5m + 1$.',
          'Middle right: $3m + 1 + m = 4m + 1$ (the lone $m$ is $1m$).',
          'Top: $5m + 1 + 4m + 1 = 9m + 2$.',
        ],
        solutionVn: [
          'Giữa bên trái: $2m + 3m + 1 = 5m + 1$.',
          'Giữa bên phải: $3m + 1 + m = 4m + 1$ ($m$ đứng riêng là $1m$).',
          'Đỉnh: $5m + 1 + 4m + 1 = 9m + 2$.',
        ],
        answer: '$5m + 1$, $4m + 1$, $9m + 2$', answerVn: '$5m + 1$, $4m + 1$, $9m + 2$',
      },
      {
        id: 'p4', type: 'mcq',
        prompt: 'Which expression **cannot** be simplified?',
        promptVn: 'Biểu thức nào **không thể** rút gọn?',
        options: [
          { val: 'A', text: '$4g + g$', textVn: '$4g + g$' },
          { val: 'B', text: '$8 − 3 + g$', textVn: '$8 − 3 + g$' },
          { val: 'C', text: '$3g + 3$', textVn: '$3g + 3$' },
          { val: 'D', text: '$2g + 5 + g$', textVn: '$2g + 5 + g$' },
        ],
        correct: 'C',
        solution: [
          'Look for two terms of the same kind.',
          'A: $4g + g = 5g$. B: the numbers collect, $5 + g$. D: $3g + 5$.',
          'C: $3g$ is a $g$ term and $3$ is a number — no like terms, so it is already in simplest form.',
        ],
        solutionVn: [
          'Tìm hai hạng tử cùng loại.',
          'A: $4g + g = 5g$. B: các số gộp được, $5 + g$. D: $3g + 5$.',
          'C: $3g$ là hạng tử $g$ còn $3$ là một số — không có hạng tử đồng dạng, nên đã ở dạng gọn nhất.',
        ],
        answer: 'C', answerVn: 'C',
      },
      {
        id: 'p5',
        prompt: 'Simplify $6 + 4w − 2 − 3w$.',
        promptVn: 'Rút gọn $6 + 4w − 2 − 3w$.',
        solution: ['Move each term with its sign: $4w − 3w + 6 − 2$.', '$w$ terms: $4w − 3w = 1w$, written $w$. Numbers: $6 − 2 = 4$.', '$w + 4$.'],
        solutionVn: ['Di chuyển mỗi hạng tử cùng dấu của nó: $4w − 3w + 6 − 2$.', 'Hạng tử $w$: $4w − 3w = 1w$, viết là $w$. Các số: $6 − 2 = 4$.', '$w + 4$.'],
        answer: '$w + 4$', answerVn: '$w + 4$',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Thử thách',
    questions: [
      {
        id: 'c1', type: 'fill_blank',
        prompt: 'Simplify $5pq + 3 − 2qp + 4$. Fill in the numbers.',
        promptVn: 'Rút gọn $5pq + 3 − 2qp + 4$. Điền các số.',
        textParts: ['$5pq + 3 − 2qp + 4 =$ ', '$pq\\ +$ ', ''],
        textPartsVn: ['$5pq + 3 − 2qp + 4 =$ ', '$pq\\ +$ ', ''],
        blanks: { '1': { correct: '3', width: 3 }, '2': { correct: '7', width: 3 } },
        solution: ['$pq$ and $qp$ are like terms, because $p × q = q × p$.', '$pq$ terms: $5pq − 2qp = 3pq$. Numbers: $3 + 4 = 7$.', '$3pq + 7$.'],
        solutionVn: ['$pq$ và $qp$ là hạng tử đồng dạng, vì $p × q = q × p$.', 'Hạng tử $pq$: $5pq − 2qp = 3pq$. Các số: $3 + 4 = 7$.', '$3pq + 7$.'],
        answer: '$3pq + 7$', answerVn: '$3pq + 7$',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'A triangle has sides $2x + 3$, $x − 1$ and $3x$ cm. What is its perimeter, in simplest form?',
        promptVn: 'Một tam giác có các cạnh $2x + 3$, $x − 1$ và $3x$ cm. Chu vi của nó là bao nhiêu, ở dạng gọn nhất?',
        options: [
          { val: 'A', text: '$6x + 4$ cm', textVn: '$6x + 4$ cm' },
          { val: 'B', text: '$8x$ cm', textVn: '$8x$ cm' },
          { val: 'C', text: '$5x + 2$ cm', textVn: '$5x + 2$ cm' },
          { val: 'D', text: '$6x + 2$ cm', textVn: '$6x + 2$ cm' },
        ],
        correct: 'D',
        solution: [
          'Add the three sides: $2x + 3 + x − 1 + 3x$.',
          '$x$ terms: $2x + x + 3x = 6x$ (the lone $x$ is $1x$). Numbers: $3 − 1 = 2$.',
          'Perimeter $= 6x + 2$ cm. A left the minus sign behind; B added the number to the $x$ terms; C forgot the invisible 1.',
        ],
        solutionVn: [
          'Cộng ba cạnh: $2x + 3 + x − 1 + 3x$.',
          'Hạng tử $x$: $2x + x + 3x = 6x$ ($x$ đứng riêng là $1x$). Các số: $3 − 1 = 2$.',
          'Chu vi $= 6x + 2$ cm. A bỏ quên dấu trừ; B cộng số vào hạng tử $x$; C quên số 1 vô hình.',
        ],
        answer: 'D', answerVn: 'D',
      },
      {
        id: 'c3',
        prompt: 'In an algebra pyramid, the top block is $9y + 4$. One of the two blocks under it is $5y + 1$. What is the other block?',
        promptVn: 'Trong một kim tự tháp đại số, ô trên cùng là $9y + 4$. Một trong hai ô bên dưới là $5y + 1$. Ô còn lại là gì?',
        solution: [
          'Going down a pyramid, subtract: other block $= (9y + 4) − (5y + 1)$.',
          '$y$ terms: $9y − 5y = 4y$. Numbers: $4 − 1 = 3$.',
          'Check by adding: $5y + 1 + 4y + 3 = 9y + 4$. ✓',
        ],
        solutionVn: [
          'Đi xuống kim tự tháp thì trừ: ô còn lại $= (9y + 4) − (5y + 1)$.',
          'Hạng tử $y$: $9y − 5y = 4y$. Các số: $4 − 1 = 3$.',
          'Thử lại bằng phép cộng: $5y + 1 + 4y + 3 = 9y + 4$. ✓',
        ],
        answer: '$4y + 3$', answerVn: '$4y + 3$',
      },
    ],
  },
];
