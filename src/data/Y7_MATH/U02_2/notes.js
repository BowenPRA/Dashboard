// src/data/Y7_MATH/U02_2/notes.js
// 2.2 Using Expressions and Formulae — a self-study reduction of the classroom
// deck (C:\Users\bowen\lessons, content/y7-math/U02_2). 15 layout slides,
// 5 checks.
//
// The deck opens by paying off 2.1: the cup that had to be left at c − 50 is
// handed c = 320 and the row finishes. The wall is slide 4 — a student who
// reads 3n as two digits answers 34 for n = 4, and is completely confident —
// so INVISIBLE_TIMES draws the × back in before any number lands. Reduced
// from 18 classroom slides: the two ask-first disagreements (14 or 18? −1 or
// 11?) fold into the slides that settle them and become checks 3 and 5, and
// the taxi and boiling-water problems keep their reveals because a solo
// student can still write first and check second. The `check:` block is
// always the LAST key.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 2 · 2.2',
    eyebrowVn: 'Chương 2 · 2.2',
    title: 'Using Expressions and Formulae',
    titleVn: 'Sử dụng biểu thức và công thức',
    objective: 'Substitute a number for a letter and find the value — with the times sign put back in, and the order of operations still switched on.',
    objectiveVn: 'Thay một con số vào chỗ chữ cái và tìm giá trị — với dấu nhân được viết lại, và thứ tự phép tính vẫn còn hiệu lực.',
    card: {
      icon: 'Pencil',
      badge: 'Starter · 30 seconds',
      badgeVn: 'Khởi động · 30 giây',
      text: 'Last lesson a cup held **c ml**, Mr Bowen drank 50 ml, and you had to stop at **c − 50**.\n\nNow you are told: **c = 320**. On paper, write how much is left.',
      textVn: 'Tiết trước, một cốc chứa **c ml**, thầy Bowen uống 50 ml, và em phải dừng lại ở **c − 50**.\n\nBây giờ em được biết: **c = 320**. Hãy viết ra giấy: còn lại bao nhiêu?',
    },
  },

  // 2 ─ The row finishes ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Coffee',
    side: 'left',
    eyebrow: 'Maths 2.1 — the cup we had to leave alone',
    eyebrowVn: 'Toán 2.1 — cái cốc mà ta đành để nguyên',
    title: 'The Row Finishes',
    titleVn: 'Dòng tính đã hoàn thành',
    ratio: 50,
    inlineSvg: DIAGRAMS.CUP_FINISHES,
    content:
      'Last lesson **c − 50** was the finished answer, and stopping there was correct.\n\n' +
      'Nothing about that has changed. The only new thing is that somebody has now **told us what c is**.\n\n' +
      'So today the row goes one step further, and lands on a number: **270**.',
    contentVn:
      'Tiết trước, **c − 50** chính là đáp án hoàn chỉnh, và dừng ở đó là đúng.\n\n' +
      'Điều đó vẫn không thay đổi. Chỉ có một điều mới: bây giờ đã có người **cho ta biết c bằng bao nhiêu**.\n\n' +
      'Vậy nên hôm nay dòng tính đi thêm được một bước nữa, và ra một con số: **270**.',
  },

  // 3 ─ Key words: substitute, value + CHECK 1 ──────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khoá',
    title: 'Substitute',
    titleVn: 'Thay số',
    ratio: 50,
    inlineSvg: DIAGRAMS.SUBSTITUTE_SWAP,
    content:
      'In football, a **substitute** comes on and another player goes off. The position on the pitch does not change — only who is standing in it.\n\n' +
      'A letter works the same way.',
    contentVn:
      'Trong bóng đá, một cầu thủ **dự bị (substitute)** vào sân và một cầu thủ khác rời sân. Vị trí trên sân không đổi — chỉ đổi người đứng ở đó.\n\n' +
      'Chữ cái trong đại số cũng hoạt động đúng như vậy.',
    notes: [
      {
        tone: 'write',
        text:
          '**Substitute:** put a number in place of a letter.\n' +
          '**Value:** the number you get after substituting. When $n = 4$, the value of $n + 2$ is 6.',
        textVn:
          '**Substitute (thay số):** đặt một con số vào chỗ của chữ cái.\n' +
          '**Value (giá trị):** con số em thu được sau khi thay. Khi $n = 4$, giá trị của $n + 2$ là 6.',
      },
    ],
    check: {
      id: 'c1',
      q: 'What is the **value** of $m − 7$ when $m = 12$?',
      qVn: '**Giá trị** của $m − 7$ khi $m = 12$ là bao nhiêu?',
      options: [
        { val: 'A', text: '$5$', textVn: '$5$' },
        { val: 'B', text: '$19$', textVn: '$19$' },
        { val: 'C', text: '$m − 7$', textVn: '$m − 7$' },
      ],
      correct: 'A',
      expEn: 'Substitute 12 for $m$: $12 − 7 = 5$. Adding gives $19$, and leaving it as $m − 7$ is the 2.1 answer — this lesson we have been told the number, so the row finishes.',
      expVn: 'Thay 12 vào chỗ $m$: $12 − 7 = 5$. Cộng thì ra $19$, còn để nguyên $m − 7$ là đáp án của bài 2.1 — bài này ta đã được cho số, nên dòng tính hoàn thành.',
    },
  },

  // 4 ─ THE WALL: the times sign did not leave + CHECK 2 ────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    side: 'left',
    eyebrow: 'This one costs the most marks every year',
    eyebrowVn: 'Chỗ này năm nào cũng mất điểm nhiều nhất',
    title: 'The Times Sign Did Not Leave',
    titleVn: 'Dấu nhân vẫn còn đó',
    ratio: 50,
    inlineSvg: DIAGRAMS.INVISIBLE_TIMES,
    content:
      'Last lesson we stopped writing the **×**. We did not stop **doing** it.\n\n' +
      'So when you substitute, put the **×** back in first. Write $3 × 4$, and only then work it out.',
    contentVn:
      'Tiết trước ta ngừng **viết** dấu **×**. Nhưng ta không hề ngừng **thực hiện** phép nhân đó.\n\n' +
      'Vậy nên khi thay số, hãy **viết lại dấu ×** trước đã. Viết $3 × 4$, rồi mới tính.',
    notes: [
      {
        tone: 'write',
        text:
          '$3n$ means $3 × n$. When $n = 4$, $3n = 3 × 4 = 12$.\n' +
          '**It is never 34.** Never push the two digits together.',
        textVn:
          '$3n$ nghĩa là $3 × n$. Khi $n = 4$ thì $3n = 3 × 4 = 12$.\n' +
          '**Không bao giờ bằng 34.** Đừng bao giờ ghép hai chữ số lại với nhau.',
      },
    ],
    check: {
      id: 'c2',
      q: 'What is the value of $5k$ when $k = 6$?',
      qVn: 'Giá trị của $5k$ khi $k = 6$ là bao nhiêu?',
      options: [
        { val: 'A', text: '$56$', textVn: '$56$' },
        { val: 'B', text: '$30$', textVn: '$30$' },
        { val: 'C', text: '$11$', textVn: '$11$' },
      ],
      correct: 'B',
      expEn: '$5k$ means $5 × k$. Put the × back: $5 × 6 = 30$. $56$ pushes the digits together, and $11$ adds instead of multiplying.',
      expVn: '$5k$ nghĩa là $5 × k$. Viết lại dấu ×: $5 × 6 = 30$. $56$ là ghép hai chữ số lại, còn $11$ là cộng thay vì nhân.',
    },
  },

  // 5 ─ Four to substitute (reveal) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    eyebrow: 'Quick fire — write all four before you check',
    eyebrowVn: 'Nhanh — viết cả bốn rồi mới kiểm tra',
    title: 'Four to Substitute',
    titleVn: 'Bốn câu để thay số',
    ratio: 50,
    content:
      'In every one of these, **n = 5**. Work out the value.\n\n' +
      '**a** $n + 7$\n' +
      '**b** $4n$\n' +
      '**c** $n − 9$\n' +
      '**d** $\\frac{n}{5}$',
    contentVn:
      'Trong tất cả các câu sau, **n = 5**. Hãy tính giá trị.\n\n' +
      '**a** $n + 7$\n' +
      '**b** $4n$\n' +
      '**c** $n − 9$\n' +
      '**d** $\\frac{n}{5}$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      answer:
        '**a** 12  **b** 20  **c** −4  **d** 1\n\n' +
        'Part **b** is $4 × 5$, not 45. Part **c** goes below zero, and that is allowed — you did this in Unit 1.',
      answerVn:
        '**a** 12  **b** 20  **c** −4  **d** 1\n\n' +
        'Câu **b** là $4 × 5$, không phải 45. Câu **c** xuống dưới 0, và điều đó hoàn toàn được — em đã học ở Chương 1.',
    },
  },

  // 6 ─ Multiply before you add + CHECK 3 ───────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'ArrowDownUp',
    side: 'left',
    eyebrow: 'The rule you already know, still switched on',
    eyebrowVn: 'Quy tắc em đã biết, vẫn còn hiệu lực',
    title: 'Multiply Before You Add',
    titleVn: 'Nhân trước, cộng sau',
    ratio: 50,
    inlineSvg: DIAGRAMS.ORDER_AFTER_SUB,
    content:
      'Two students worked out $3x + 2$ when $x = 4$. One got **14** ("I did the multiplication first"). One got **18** ("I worked from left to right").\n\n' +
      '**14 is right.** Substituting a number does not change the order of operations. It never did in arithmetic, and it does not here.',
    contentVn:
      'Hai bạn học sinh tính $3x + 2$ khi $x = 4$. Một bạn ra **14** ("em nhân trước"). Một bạn ra **18** ("em tính từ trái sang phải").\n\n' +
      '**14 mới đúng.** Việc thay số vào không làm thay đổi thứ tự phép tính. Trong số học đã vậy, ở đây cũng vậy.',
    notes: [
      {
        tone: 'write',
        text:
          '**Order of operations:** do **× and ÷ first**, then + and −.\n' +
          'When $x = 4$: $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.',
        textVn:
          '**Thứ tự phép tính:** làm **nhân và chia trước**, rồi mới cộng và trừ.\n' +
          'Khi $x = 4$: $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.',
      },
    ],
    check: {
      id: 'c3',
      q: 'What is the value of $2y + 5$ when $y = 3$?',
      qVn: 'Giá trị của $2y + 5$ khi $y = 3$ là bao nhiêu?',
      options: [
        { val: 'A', text: '$16$', textVn: '$16$' },
        { val: 'B', text: '$28$', textVn: '$28$' },
        { val: 'C', text: '$11$', textVn: '$11$' },
      ],
      correct: 'C',
      expEn: 'Multiply first: $2 × 3 = 6$, then add 5: $11$. $16$ comes from adding first ($3 + 5 = 8$, then $× 2$); $28$ pushes 2 and 3 together into 23.',
      expVn: 'Nhân trước: $2 × 3 = 6$, rồi cộng 5: $11$. $16$ là do cộng trước ($3 + 5 = 8$, rồi $× 2$); $28$ là ghép 2 và 3 thành 23.',
    },
  },

  // 7 ─ Your turn (reveal) ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    eyebrow: 'Three to try — write the middle line every time',
    eyebrowVn: 'Ba câu để thử — luôn viết dòng trung gian',
    title: 'Your Turn',
    titleVn: 'Đến lượt em',
    ratio: 50,
    content:
      'Work out the value of each expression. Write the line where the letter has gone and the × is back.\n\n' +
      '**a** $5n − 3$ when $n = 4$\n' +
      '**b** $20 − 3n$ when $n = 6$\n' +
      '**c** $\\frac{n}{2} + 8$ when $n = 10$',
    contentVn:
      'Hãy tính giá trị của mỗi biểu thức. Viết dòng mà chữ cái đã biến mất và dấu × đã quay lại.\n\n' +
      '**a** $5n − 3$ khi $n = 4$\n' +
      '**b** $20 − 3n$ khi $n = 6$\n' +
      '**c** $\\frac{n}{2} + 8$ khi $n = 10$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      answer:
        '**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$\n\n' +
        'In **b** the multiplication happens first even though it is written second. $20 − 3n$ is not $17n$.',
      answerVn:
        '**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$\n\n' +
        'Ở câu **b**, phép nhân vẫn làm trước dù nó được viết sau. $20 − 3n$ không phải là $17n$.',
    },
  },

  // 8 ─ Key word: formula + CHECK 4 ─────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Equal',
    side: 'left',
    eyebrow: 'Key word — and the opposite of last lesson’s',
    eyebrowVn: 'Từ khoá — và là cái ngược lại với tiết trước',
    title: 'Formula',
    titleVn: 'Công thức',
    ratio: 50,
    inlineSvg: DIAGRAMS.EXPRESSION_FORMULA,
    content:
      'Last lesson you learned that an **expression** has **no = sign**.\n\n' +
      'A **formula** is the one that does. It is a rule: tell it n, and it tells you C.',
    contentVn:
      'Tiết trước em đã học rằng **biểu thức (expression)** thì **không có dấu =**.\n\n' +
      '**Công thức (formula)** thì có. Nó là một quy tắc: cho nó biết n, nó cho em biết C.',
    notes: [
      {
        tone: 'write',
        text:
          '**Formula:** a rule that connects two or more quantities, written with letters, and it **has an = sign**.\n' +
          'For example $C = 3n + 2$, $A = lw$. More than one formula: **formulae**.',
        textVn:
          '**Công thức (formula):** một quy tắc liên hệ hai đại lượng trở lên, viết bằng chữ cái, và **có dấu =**.\n' +
          'Ví dụ $C = 3n + 2$, $A = lw$. Số nhiều của formula là **formulae**.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Which of these is a **formula**?',
      qVn: 'Cái nào sau đây là một **công thức**?',
      options: [
        { val: 'A', text: '$4n − 1$', textVn: '$4n − 1$' },
        { val: 'B', text: '$P = 4s$', textVn: '$P = 4s$' },
        { val: 'C', text: '$9 + 3 = 12$', textVn: '$9 + 3 = 12$' },
      ],
      correct: 'B',
      expEn: 'A formula connects quantities with letters **and** has an = sign: $P = 4s$ (the perimeter of a square). $4n − 1$ is an expression — no = sign. $9 + 3 = 12$ has an = sign but no letters, so it connects nothing.',
      expVn: 'Công thức liên hệ các đại lượng bằng chữ cái **và** có dấu =: $P = 4s$ (chu vi hình vuông). $4n − 1$ là biểu thức — không có dấu =. $9 + 3 = 12$ có dấu = nhưng không có chữ cái, nên không liên hệ gì cả.',
    },
  },

  // 9 ─ Two letters, so substitute twice ────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Square',
    eyebrow: 'A formula you have used since primary school',
    eyebrowVn: 'Một công thức em đã dùng từ hồi tiểu học',
    title: 'Two Letters, So Substitute Twice',
    titleVn: 'Hai chữ cái, nên phải thay hai lần',
    ratio: 50,
    inlineSvg: DIAGRAMS.RECTANGLE_FORMULA,
    content:
      'The area of a rectangle is its length times its width. Written as a formula, that is **A = lw**.\n\n' +
      'Remember what $lw$ means: $l × w$. The times sign is still missing, and still there.',
    contentVn:
      'Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng. Viết thành công thức là **A = lw**.\n\n' +
      'Nhớ lại $lw$ nghĩa là gì: $l × w$. Dấu nhân vẫn bị lược đi, và vẫn đang ở đó.',
    notes: [
      {
        tone: 'write',
        text:
          'When a formula has **two letters**, substitute **both** before you work anything out.\n' +
          '$A = lw$, with $l = 7$ and $w = 4$: $A = 7 × 4 = 28$.',
        textVn:
          'Khi công thức có **hai chữ cái**, hãy thay **cả hai** rồi mới tính.\n' +
          '$A = lw$, với $l = 7$ và $w = 4$: $A = 7 × 4 = 28$.',
      },
    ],
  },

  // 10 ─ Use the formula (reveal) ───────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    side: 'left',
    eyebrow: 'Two formulae, four substitutions',
    eyebrowVn: 'Hai công thức, bốn lần thay số',
    title: 'Use the Formula',
    titleVn: 'Hãy dùng công thức',
    ratio: 50,
    content:
      'The perimeter of a rectangle is **P = 2l + 2w**.\n\n' +
      '**a** Find P when $l = 9$ and $w = 5$.\n' +
      '**b** Find P when $l = 12$ and $w = 3$.\n\n' +
      'A different formula: **T = 5a − b**.\n\n' +
      '**c** Find T when $a = 4$ and $b = 6$.',
    contentVn:
      'Chu vi hình chữ nhật là **P = 2l + 2w**.\n\n' +
      '**a** Tìm P khi $l = 9$ và $w = 5$.\n' +
      '**b** Tìm P khi $l = 12$ và $w = 3$.\n\n' +
      'Một công thức khác: **T = 5a − b**.\n\n' +
      '**c** Tìm T khi $a = 4$ và $b = 6$.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      answer:
        '**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$\n\n' +
        'Both multiplications happen before the + or the −, every time.',
      answerVn:
        '**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$\n\n' +
        'Lần nào cũng vậy: cả hai phép nhân đều làm trước dấu + hoặc dấu −.',
    },
  },

  // 11 ─ The minus sign travels with it + CHECK 5 ───────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Minus',
    eyebrow: 'Unit 1 comes back, inside Unit 2',
    eyebrowVn: 'Chương 1 quay lại, nằm trong Chương 2',
    title: 'The Minus Sign Travels With It',
    titleVn: 'Dấu trừ đi theo con số',
    ratio: 50,
    inlineSvg: DIAGRAMS.NEGATIVE_SUB,
    content:
      '$5 − 2n$, when $n = −3$. One pair says **−1**. Another pair says **11**.\n\n' +
      '**11 is right.** −1 comes from substituting 3 and leaving the minus sign behind. The arithmetic here is $5 + 6$. The only difficulty is getting the sign into the expression in one piece.',
    contentVn:
      '$5 − 2n$, khi $n = −3$. Một cặp nói **−1**. Một cặp khác nói **11**.\n\n' +
      '**11 mới đúng.** −1 là do chỉ thay số 3 vào mà bỏ quên dấu trừ. Phép tính ở đây là $5 + 6$. Cái khó duy nhất là đưa được dấu trừ vào biểu thức cùng với con số.',
    notes: [
      {
        tone: 'write',
        text:
          '**Put a negative number in brackets when you substitute it.**\n' +
          'If $n = −3$ then $2n = 2 × (−3) = −6$, so $5 − 2n = 5 − (−6) = 5 + 6 = 11$.',
        textVn:
          '**Khi thay một số âm, hãy đặt nó trong dấu ngoặc.**\n' +
          'Nếu $n = −3$ thì $2n = 2 × (−3) = −6$, nên $5 − 2n = 5 − (−6) = 5 + 6 = 11$.',
      },
    ],
    check: {
      id: 'c5',
      q: 'What is the value of $4p$ when $p = −2$?',
      qVn: 'Giá trị của $4p$ khi $p = −2$ là bao nhiêu?',
      options: [
        { val: 'A', text: '$−8$', textVn: '$−8$' },
        { val: 'B', text: '$8$', textVn: '$8$' },
        { val: 'C', text: '$2$', textVn: '$2$' },
      ],
      correct: 'A',
      expEn: 'Brackets: $4 × (−2) = −8$. A positive times a negative is negative (Unit 1). $8$ left the minus sign behind; $2$ added instead of multiplying.',
      expVn: 'Dấu ngoặc: $4 × (−2) = −8$. Dương nhân âm ra âm (Chương 1). $8$ là bỏ quên dấu trừ; $2$ là cộng thay vì nhân.',
    },
  },

  // 12 ─ Write it, then use it (taxi, reveal) ───────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'PenTool',
    side: 'left',
    eyebrow: 'Now go the other way — write the formula first',
    eyebrowVn: 'Bây giờ làm ngược lại — viết công thức trước',
    title: 'Write It, Then Use It',
    titleVn: 'Viết ra, rồi dùng nó',
    ratio: 50,
    content:
      'A taxi charges **15 thousand dong** to start, and then **9 thousand dong for every kilometre**.\n\n' +
      '**a** Write a formula for the cost **C** of a journey of **k** kilometres.\n' +
      '**b** Use your formula to find the cost of a journey of 6 kilometres.',
    contentVn:
      'Một chuyến taxi tính **15 nghìn đồng** tiền mở cửa, sau đó **9 nghìn đồng mỗi ki-lô-mét**.\n\n' +
      '**a** Hãy viết công thức tính chi phí **C** cho một chuyến đi dài **k** ki-lô-mét.\n' +
      '**b** Dùng công thức của em để tính chi phí của chuyến đi 6 ki-lô-mét.',
    notes: [
      {
        tone: 'write',
        text:
          'When you write a formula, **say what every letter represents**.\n' +
          'C is the cost in thousand dong · k is the number of kilometres.',
        textVn:
          'Khi viết một công thức, hãy **nói rõ mỗi chữ cái đại diện cho cái gì**.\n' +
          'C là chi phí tính bằng nghìn đồng · k là số ki-lô-mét.',
      },
    ],
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer:
        '**a** $C = 15 + 9k$\n\n' +
        '**b** $C = 15 + 9 × 6 = 15 + 54 = 69$, so 69 thousand dong.\n\n' +
        'The 15 is paid once, so it has no letter with it. The 9 is paid every kilometre, so it is multiplied by k.',
      answerVn:
        '**a** $C = 15 + 9k$\n\n' +
        '**b** $C = 15 + 9 × 6 = 15 + 54 = 69$, tức là 69 nghìn đồng.\n\n' +
        'Số 15 chỉ trả một lần nên không đi kèm chữ cái nào. Số 9 phải trả mỗi ki-lô-mét nên được nhân với k.',
    },
  },

  // 13 ─ The water that would not get hotter (reveal) ───────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Thermometer',
    eyebrow: 'Problem — from your Science lesson',
    eyebrowVn: 'Bài toán — từ tiết Khoa học',
    title: 'The Water That Would Not Get Hotter',
    titleVn: 'Nước không thể nóng hơn được nữa',
    ratio: 50,
    inlineSvg: DIAGRAMS.BOILING_LIMIT,
    content:
      'Mr Bowen heats water. It starts at 24 °C and rises 3 °C every minute, so **T = 24 + 3m**.\n\n' +
      '**a** Find T after 12 minutes.\n' +
      '**b** Find T after 25 minutes.\n' +
      '**c** The formula says T = 144 after 40 minutes. Is that possible?',
    contentVn:
      'Thầy Bowen đun nước. Nước bắt đầu ở 24 °C và tăng 3 °C mỗi phút, nên **T = 24 + 3m**.\n\n' +
      '**a** Tìm T sau 12 phút.\n' +
      '**b** Tìm T sau 25 phút.\n' +
      '**c** Công thức cho ra T = 144 sau 40 phút. Điều đó có thể xảy ra không?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer:
        '**a** $24 + 36 = 60$ °C  **b** $24 + 75 = 99$ °C\n\n' +
        '**c** **No.** Water boils at 100 °C and stops getting hotter — you saw that in Science 2.2.\n\n' +
        'The arithmetic is perfect and the answer is still wrong, because a formula is only true while the situation it describes is true.',
      answerVn:
        '**a** $24 + 36 = 60$ °C  **b** $24 + 75 = 99$ °C\n\n' +
        '**c** **Không.** Nước sôi ở 100 °C rồi không nóng thêm nữa — em đã thấy điều đó ở Khoa học 2.2.\n\n' +
        'Phép tính hoàn toàn đúng mà đáp án vẫn sai, vì một công thức chỉ đúng chừng nào tình huống mà nó mô tả còn đúng.',
    },
  },

  // 14 ─ Recap ──────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    content:
      '> Your notebook should now have **7 written panels**. Count them. If one is missing, go back and copy it before the practice.',
    contentVn:
      '> Trong vở của em bây giờ phải có **7 khung ghi chép**. Hãy đếm lại. Nếu thiếu khung nào, hãy quay lại chép trước khi luyện tập.',
    items: [
      { text: '**Substitute** a number for a letter, and say what the **value** is.', textVn: '**Thay số (substitute)** vào chỗ chữ cái, và nói được **giá trị (value)** là bao nhiêu.' },
      { text: 'Work out $3n$ when $n = 4$ and get **12**, never 34.', textVn: 'Tính $3n$ khi $n = 4$ và ra **12**, không bao giờ ra 34.' },
      { text: 'Do the **× and ÷ before the + and −** after substituting.', textVn: 'Sau khi thay số, làm **nhân và chia trước cộng và trừ**.' },
      { text: 'Say what a **formula** is, and why it **has** an = sign.', textVn: 'Nói được **công thức** là gì, và vì sao nó **có** dấu =.' },
      { text: 'Substitute into a formula with **two letters**, such as $A = lw$.', textVn: 'Thay số vào công thức có **hai chữ cái**, ví dụ $A = lw$.' },
      { text: 'Substitute a **negative** number in brackets: $2 × (−3) = −6$.', textVn: 'Thay một số **âm** trong dấu ngoặc: $2 × (−3) = −6$.' },
    ],
  },

  // 15 ─ Closer ─────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    subtitle: 'Last lesson you were not allowed to finish. This lesson you were. Exit question: **$s = 4t + 1$. Work out s when $t = 6$.**',
    subtitleVn: 'Tiết trước em không được phép tính xong. Tiết này thì được. Câu hỏi ra về: **$s = 4t + 1$. Hãy tính s khi $t = 6$.**',
    reveal: {
      label: 'Check the exit question',
      labelVn: 'Kiểm tra câu hỏi ra về',
      answer: '$s = 4 × 6 + 1 = 24 + 1 = 25$. The × back in, the multiplication first. Now do the Vocab, then the Practice.',
      answerVn: '$s = 4 × 6 + 1 = 24 + 1 = 25$. Viết lại dấu ×, nhân trước. Bây giờ làm phần Từ vựng, rồi Luyện tập.',
    },
  },
];
