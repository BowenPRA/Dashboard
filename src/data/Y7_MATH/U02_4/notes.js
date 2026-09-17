// src/data/Y7_MATH/U02_4/notes.js
// 2.4 Expanding Brackets — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons, content/y7-math/U02_4). 26 layout slides, 19 scored
// items: 10 activities (predict · grid · algebra · sort · order) and 9 checks.
//
// The first deck built to the algebra-engines density
// (docs/y7-math/algebra-engines.md §4): the student does something on nearly
// every slide, and no three slides in a row are unscored. What the classroom
// did with a room, this deck does with a tap:
//  · the starter (4 × 16 in your head) is a predict whose distractor 46 is the
//    "first term only" slip, and the book's grid is filled for 6 × 17;
//  · both hand votes (5(a + 3), 4(3 − c)) are predicts on the vote slide, and
//    the slide after settles each one;
//  · the whiteboard slides are typed `algebra` answers and a three-term `grid`,
//    with the rest of their questions in a reveal;
//  · the Right or Wrong? room game is a right/wrong sort, and Mr Bowen's
//    homework is a sort that NAMES each slip;
//  · the ExpandPlus / ExpandMinus steppers stay as showcase slides, each
//    followed by a scored slide.
// Cut: the homework slide and the "Lesson Complete" exit hero — the exit
// question is the check on the closing checklist.
//
// House notes: `$…$` inline maths in checks, notes and activity strings; a
// slide's `check:` or `activity:` is its LAST key, and no slide has both.
import { DIAGRAMS } from './diagrams.js';
import { ExpandPlus, ExpandMinus } from './widgets.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 2 · 2.4',
    eyebrowVn: 'Chương 2 · 2.4',
    title: 'Expanding Brackets',
    titleVn: 'Khai triển dấu ngoặc',
    objective: 'Expand brackets by multiplying every term inside by the number outside — the sign goes into the box with its term — know when an answer is finished, and expand and simplify in that order.',
    objectiveVn: 'Khai triển dấu ngoặc bằng cách nhân mọi hạng tử bên trong với số bên ngoài — dấu đi vào ô cùng hạng tử của nó — biết khi nào đáp án đã xong, và khai triển rồi rút gọn theo đúng thứ tự đó.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You already do this in your head. Today it gets a name and a grid. **19 things are scored** — you will **predict**, **fill the grid**, **type**, **sort** and **order** your way through. The first one is on the next slide.',
      textVn: 'Em vẫn làm việc này trong đầu rồi. Hôm nay nó có tên gọi và có lưới ô. **19 mục được tính điểm** — em sẽ **dự đoán**, **điền lưới ô**, **gõ đáp án**, **phân loại** và **sắp xếp**. Mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: PREDICT 4 × 16 ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter — in your head',
    eyebrowVn: 'Khởi động — tính nhẩm',
    title: 'Four Times Sixteen',
    titleVn: 'Bốn nhân mười sáu',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Work out **4 × 16** in your head.',
    textVn: 'Tính nhẩm **4 × 16**.',
    sub: 'No calculator. Notice **how** you did it — that method is today’s lesson.',
    subVn: 'Không dùng máy tính. Để ý xem em tính **bằng cách nào** — cách đó chính là bài học hôm nay.',
    activity: {
      id: 'a1_start',
      type: 'predict',
      prompt: 'What is $4 × 16$?',
      promptVn: '$4 × 16$ bằng bao nhiêu?',
      options: [
        { val: 'p46', name: '$46$', nameVn: '$46$' },
        { val: 'p64', name: '$64$', nameVn: '$64$' },
        { val: 'p28', name: '$28$', nameVn: '$28$' },
        { val: 'p20', name: '$20$', nameVn: '$20$' },
      ],
      correct: 'p64',
      explain: 'Nobody multiplies by 16 — you split it into $10 + 6$ and multiply **both** parts: $4 × 10 = 40$, $4 × 6 = 24$, $40 + 24 = 64$. **46** multiplied the 10 but not the 6 — remember that slip, it comes back with letters. 28 read 16 as 1 and 6; 20 added.',
      explainVn: 'Không ai nhân với 16 — em tách thành $10 + 6$ rồi nhân **cả hai** phần: $4 × 10 = 40$, $4 × 6 = 24$, $40 + 24 = 64$. **46** là nhân số 10 mà quên số 6 — hãy nhớ lỗi này, nó sẽ quay lại khi có chữ cái. 28 là đọc 16 thành 1 và 6; 20 là phép cộng.',
    },
  },

  // 3 ─ The book's grid + GRID 6(10 + 7) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'The book’s method — the grid',
    eyebrowVn: 'Phương pháp trong sách — lưới ô',
    title: 'One Box, One Multiplication',
    titleVn: 'Một ô, một phép nhân',
    inlineSvg: DIAGRAMS.BOX_NUMBER,
    caption: 'The 4 goes down the side, the parts of 16 go across the top. **Fill every box, then add the boxes.**',
    captionVn: 'Số 4 ở cột bên trái, các phần của 16 ở hàng trên cùng. **Điền mọi ô, rồi cộng các ô lại.** (box = ô)',
    activity: {
      id: 'a2_grid_number',
      type: 'grid',
      expr: '6(10 + 7)',
      prompt: 'Your turn: $6 × 17$. Split 17 into $10 + 7$ and fill the grid for $6(10 + 7)$.',
      promptVn: 'Đến lượt em: $6 × 17$. Tách 17 thành $10 + 7$ rồi điền lưới ô cho $6(10 + 7)$.',
      explain: '$6 × 10 = 60$ and $6 × 7 = 42$, so $6 × 17 = 60 + 42 = 102$. One box, one multiplication — then add the boxes.',
      explainVn: '$6 × 10 = 60$ và $6 × 7 = 42$, nên $6 × 17 = 60 + 42 = 102$. Một ô, một phép nhân — rồi cộng các ô lại.',
    },
  },

  // 4 ─ The real thing: chocolate ───────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'A real grid',
    eyebrowVn: 'Một lưới ô có thật',
    title: 'Snap the Chocolate',
    titleVn: 'Bẻ đôi thanh sô cô la',
    inlineSvg: DIAGRAMS.CHOC_REAL,
    caption: 'A bar of 2 × 7 squares, snapped after 5 rows: 2 × 5 = 10 and 2 × 2 = 4. Two pieces, still **14** squares.',
    captionVn: 'Một thanh 2 × 7 ô, bẻ sau 5 hàng: 2 × 5 = 10 và 2 × 2 = 4. Hai mảnh, vẫn là **14** ô. (snap = bẻ, square = ô vuông)',
  },

  // 5 ─ English: expand / multiply out / each + CHECK 1 ─────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    title: 'Three Words to Watch',
    titleVn: 'Ba từ cần chú ý',
    inlineSvg: DIAGRAMS.WORDS,
    caption: 'In maths the value never gets bigger. Only the **writing** gets longer.',
    captionVn: 'Trong toán, giá trị không hề lớn hơn. Chỉ có **cách viết** dài ra. (expand = khai triển, multiply out = nhân phá ngoặc, each = mỗi)',
    check: {
      id: 'c1_words',
      q: 'In maths, what does **multiply out** $4(10 + 6)$ mean?',
      qVn: 'Trong toán, **multiply out** $4(10 + 6)$ nghĩa là gì?',
      options: [
        { val: 'A', text: 'Make the answer bigger', textVn: 'Làm cho đáp án lớn hơn' },
        { val: 'B', text: 'The same as **expand**: multiply **each** term inside by 4', textVn: 'Giống như **khai triển**: nhân **mỗi** hạng tử bên trong với 4' },
        { val: 'C', text: 'Multiply only the 10 by 4', textVn: 'Chỉ nhân số 10 với 4' },
        { val: 'D', text: 'Add 4 to each term inside', textVn: 'Cộng 4 vào mỗi hạng tử bên trong' },
      ],
      correct: 'B',
      expEn: '**Multiply out** and **expand** are the same job: $4 × 10 + 4 × 6 = 40 + 24$. A is the balloon — the everyday meaning; the value stays 64. C forgets **each**, and D adds instead of multiplying.',
      expVn: '**Multiply out** và **expand** là cùng một việc: $4 × 10 + 4 × 6 = 40 + 24$. A là quả khinh khí cầu — nghĩa đời thường; giá trị vẫn là 64. C quên chữ **each** (mỗi), còn D cộng thay vì nhân.',
    },
  },

  // 6 ─ Key word: brackets + CHECK 2 ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Brackets',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Brackets',
    titleVn: 'Dấu ngoặc',
    ratio: 40,
    inlineSvg: DIAGRAMS.BRACKETS,
    content: 'You met the hidden times sign in 2.2: $3x$ means $3 × x$.\n\nA number touching a bracket works the same way.',
    contentVn: 'Em đã gặp dấu nhân ẩn ở bài 2.2: $3x$ nghĩa là $3 × x$.\n\nMột con số đứng sát dấu ngoặc cũng vậy.',
    notes: [
      {
        tone: 'write',
        text: '**Brackets:** the marks **( )**.\n$4(10 + 6)$ means $4 × (10 + 6)$.',
        textVn: '**Dấu ngoặc (brackets):** các dấu **( )**.\n$4(10 + 6)$ nghĩa là $4 × (10 + 6)$.',
      },
    ],
    check: {
      id: 'c2_brackets',
      q: 'What does $3(x + 5)$ mean?',
      qVn: '$3(x + 5)$ nghĩa là gì?',
      options: [
        { val: 'A', text: '$3 × (x + 5)$', textVn: '$3 × (x + 5)$' },
        { val: 'B', text: '$3 + (x + 5)$', textVn: '$3 + (x + 5)$' },
        { val: 'C', text: '$x + 8$', textVn: '$x + 8$' },
      ],
      correct: 'A',
      expEn: 'A number touching a bracket means multiply: $3(x + 5) = 3 × (x + 5)$. B reads the hidden sign as a plus, and C adds the 3 to the 5.',
      expVn: 'Một con số đứng sát dấu ngoặc nghĩa là nhân: $3(x + 5) = 3 × (x + 5)$. B đọc dấu ẩn thành dấu cộng, còn C cộng 3 với 5.',
    },
  },

  // 7 ─ Which is right? 5(a + 3) — PREDICT ──────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    title: 'Which Is Right?',
    titleVn: 'Đáp án nào đúng?',
    columns: [
      {
        heading: 'Answer A',
        headingVn: 'Đáp án A',
        accent: BLUE,
        icon: 'HelpCircle',
        inlineSvg: DIAGRAMS.ANS_5A3,
      },
      {
        heading: 'Answer B',
        headingVn: 'Đáp án B',
        accent: ORANGE,
        icon: 'HelpCircle',
        inlineSvg: DIAGRAMS.ANS_5A15,
      },
    ],
    activity: {
      id: 'a3_vote_5a3',
      type: 'predict',
      prompt: 'Expand $5(a + 3)$. Which answer is right?',
      promptVn: 'Khai triển $5(a + 3)$. Đáp án nào đúng?',
      options: [
        { val: 'a', name: '**A** · $5a + 3$', nameVn: '**A** · $5a + 3$' },
        { val: 'b', name: '**B** · $5a + 15$', nameVn: '**B** · $5a + 15$' },
      ],
      correct: 'b',
      explain: '**B.** The 5 multiplies **every** term inside: $5 × a = 5a$ and $5 × 3 = 15$. A multiplied the $a$ and left the 3 alone — the 46 from the starter again. The next slide fills the grid box by box.',
      explainVn: '**B.** Số 5 nhân với **mọi** hạng tử bên trong: $5 × a = 5a$ và $5 × 3 = 15$. A nhân $a$ mà bỏ quên số 3 — lại là số 46 ở phần khởi động. Slide sau điền lưới ô từng ô một.',
    },
  },

  // 8 ─ The grid settles it (widget) ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each box before you press',
    eyebrowVn: 'Nói từng ô trước khi bấm',
    title: 'Fill the Grid',
    titleVn: 'Điền vào lưới ô',
    widget: ExpandPlus,
    caption: 'Before each press, say the multiplication out loud — “two times x”. Then press **Next box** and see if you were right.',
    captionVn: 'Trước mỗi lần bấm, hãy nói to phép nhân — “hai nhân x”. Rồi bấm **Ô tiếp** và xem em nói đúng không.',
  },

  // 9 ─ The rule + CHECK 3 ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    title: 'Every Term, Not Just the First',
    titleVn: 'Mọi hạng tử, không chỉ hạng tử đầu',
    ratio: 40,
    inlineSvg: DIAGRAMS.ARROWS,
    content: '**B was right.** The 3 is inside the brackets, so it is multiplied too.',
    contentVn: '**B mới đúng.** Số 3 nằm trong ngoặc, nên nó cũng được nhân.',
    notes: [
      {
        tone: 'write',
        text: '**Expand:** multiply **every** term inside the brackets by the number outside.\n$5(a + 3) = 5a + 15$',
        textVn: '**Khai triển (expand):** nhân **mọi** hạng tử bên trong ngoặc với số bên ngoài.\n$5(a + 3) = 5a + 15$',
      },
    ],
    check: {
      id: 'c3_every_term',
      q: 'Expand $6(b + 4)$.',
      qVn: 'Khai triển $6(b + 4)$.',
      options: [
        { val: 'A', text: '$6b + 4$', textVn: '$6b + 4$' },
        { val: 'B', text: '$6b + 10$', textVn: '$6b + 10$' },
        { val: 'C', text: '$6b + 24$', textVn: '$6b + 24$' },
      ],
      correct: 'C',
      expEn: '$6 × b = 6b$ and $6 × 4 = 24$, so $6b + 24$. A multiplied only the first term; B added $6 + 4$ instead of multiplying.',
      expVn: '$6 × b = 6b$ và $6 × 4 = 24$, nên $6b + 24$. A chỉ nhân hạng tử đầu; B cộng $6 + 4$ thay vì nhân.',
    },
  },

  // 10 ─ Expand these (reveal) + ALGEBRA 9(3 + y) ───────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn — the number can come first',
    eyebrowVn: 'Đến lượt em — số có thể đứng trước',
    title: 'Expand These',
    titleVn: 'Khai triển các biểu thức sau',
    ratio: 50,
    content: 'Multiply **both** terms every time.\n\n**a** $3(a + 2)$\n**b** $5(b + 3)$\n**c** $4(2 + f)$\n**d** $8(7 + z)$',
    contentVn: 'Lần nào cũng nhân **cả hai** hạng tử.\n\n**a** $3(a + 2)$\n**b** $5(b + 3)$\n**c** $4(2 + f)$\n**d** $8(7 + z)$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      answer: '**a** $3a + 6$  **b** $5b + 15$  **c** $8 + 4f$  **d** $56 + 8z$\n\nWhen the number comes first inside, it can come first in the answer: $4(2 + f) = 8 + 4f$.',
      answerVn: '**a** $3a + 6$  **b** $5b + 15$  **c** $8 + 4f$  **d** $56 + 8z$\n\nKhi số đứng trước trong ngoặc, nó có thể đứng trước trong đáp án: $4(2 + f) = 8 + 4f$.',
    },
    activity: {
      id: 'a4_type_9_3y',
      type: 'algebra',
      mode: 'expand',
      expr: '9(3 + y)',
      prompt: 'Type the expansion of $9(3 + y)$.',
      promptVn: 'Gõ kết quả khai triển của $9(3 + y)$.',
      explain: '$9 × 3 = 27$ and $9 × y = 9y$, so $27 + 9y$. The order can stay as it was written: $9y + 27$ is right too.',
      explainVn: '$9 × 3 = 27$ và $9 × y = 9y$, nên $27 + 9y$. Thứ tự có thể giữ như đề bài: $9y + 27$ cũng đúng.',
    },
  },

  // 11 ─ The minus goes into the box ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Move',
    eyebrow: 'Watch the minus sign',
    eyebrowVn: 'Theo dõi dấu trừ',
    title: 'Take the Sign With You',
    titleVn: 'Mang theo cả dấu',
    ratio: 40,
    inlineSvg: DIAGRAMS.MINUS_BOX,
    content: 'The same rule as 2.3: the sign travels with the term after it.\n\nSay it: three times minus two is minus six.',
    contentVn: 'Vẫn là quy tắc của bài 2.3: dấu đi cùng hạng tử đứng sau nó.\n\nHãy nói: ba nhân âm hai bằng âm sáu.',
    notes: [
      {
        tone: 'write',
        text: 'The sign **in front** of a term goes into the box with it.\n$3(x − 2) = 3x − 6$',
        textVn: 'Dấu **đứng trước** hạng tử đi vào ô cùng với hạng tử đó.\n$3(x − 2) = 3x − 6$',
      },
    ],
  },

  // 12 ─ A minus inside (widget) ────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Say each box before you press',
    eyebrowVn: 'Nói từng ô trước khi bấm',
    title: 'A Minus Inside',
    titleVn: 'Dấu trừ ở bên trong',
    widget: ExpandMinus,
    caption: 'Say “three times minus two” before you press. The last one has the letter **second** — it still works.',
    captionVn: 'Nói “ba nhân âm hai” trước khi bấm. Câu cuối có chữ cái đứng **sau** — cách làm vẫn vậy.',
  },

  // 13 ─ Two students disagree: 4(3 − c) — PREDICT ──────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    title: 'Two Students Disagree',
    titleVn: 'Hai bạn không đồng ý',
    columns: [
      {
        heading: 'Answer A',
        headingVn: 'Đáp án A',
        accent: BLUE,
        icon: 'HelpCircle',
        inlineSvg: DIAGRAMS.ANS_8C,
      },
      {
        heading: 'Answer B',
        headingVn: 'Đáp án B',
        accent: ORANGE,
        icon: 'HelpCircle',
        inlineSvg: DIAGRAMS.ANS_12M4C,
      },
    ],
    activity: {
      id: 'a5_vote_4_3c',
      type: 'predict',
      prompt: 'Expand $4(3 − c)$. Which answer is right?',
      promptVn: 'Khai triển $4(3 − c)$. Đáp án nào đúng?',
      options: [
        { val: 'a', name: '**A** · $8c$', nameVn: '**A** · $8c$' },
        { val: 'b', name: '**B** · $12 − 4c$', nameVn: '**B** · $12 − 4c$' },
      ],
      correct: 'b',
      explain: '**B.** $4 × 3 = 12$ and $4 × (−c) = −4c$, so $12 − 4c$. A took one more step, $12 − 4c = 8c$, and that step is not allowed. The next slide says why.',
      explainVn: '**B.** $4 × 3 = 12$ và $4 × (−c) = −4c$, nên $12 − 4c$. A làm thêm một bước, $12 − 4c = 8c$, và bước đó không được phép. Slide sau giải thích vì sao.',
    },
  },

  // 14 ─ Already finished + CHECK 4 ─────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Know when to stop',
    eyebrowVn: 'Biết dừng đúng lúc',
    title: 'Already Finished',
    titleVn: 'Đã xong rồi',
    ratio: 40,
    inlineSvg: DIAGRAMS.STOP,
    content: 'This is 2.3 coming back. 12 is a number and $4c$ is a $c$ term.\n\nYou cannot collect a number and a $c$ term.',
    contentVn: 'Đây là bài 2.3 quay lại. 12 là một con số còn $4c$ là một hạng tử chứa $c$.\n\nEm không thể gộp một con số với một hạng tử chứa $c$.',
    notes: [
      {
        tone: 'write',
        text: '$12 − 4c$ is the answer. Stop there.\n12 and $4c$ are **not like terms**.',
        textVn: '$12 − 4c$ chính là đáp án. Dừng ở đó.\n12 và $4c$ **không phải hạng tử đồng dạng**.',
      },
    ],
    check: {
      id: 'c4_stop',
      q: 'Expand $5(4 − d)$. Which answer is correct **and** finished?',
      qVn: 'Khai triển $5(4 − d)$. Đáp án nào đúng **và** đã xong?',
      options: [
        { val: 'A', text: '$20 − d$', textVn: '$20 − d$' },
        { val: 'B', text: '$15d$', textVn: '$15d$' },
        { val: 'C', text: '$20 + 5d$', textVn: '$20 + 5d$' },
        { val: 'D', text: '$20 − 5d$', textVn: '$20 − 5d$' },
      ],
      correct: 'D',
      expEn: '$5 × 4 = 20$ and $5 × (−d) = −5d$: $20 − 5d$, and stop. B carried on past the answer — 20 and $5d$ are not like terms. A did not multiply the $d$, and C lost the minus sign.',
      expVn: '$5 × 4 = 20$ và $5 × (−d) = −5d$: $20 − 5d$, rồi dừng. B làm tiếp quá đáp án — 20 và $5d$ không đồng dạng. A không nhân $d$, còn C làm mất dấu trừ.',
    },
  },

  // 15 ─ Right or wrong? — SORT ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'Eight expansions, already done',
    eyebrowVn: 'Tám phép khai triển đã làm sẵn',
    title: 'Right or Wrong?',
    titleVn: 'Đúng hay sai?',
    label: 'Sort it',
    labelVn: 'Phân loại',
    labelIcon: 'Sparkles',
    text: 'Is each expansion **right** or **wrong**?',
    textVn: 'Mỗi phép khai triển **đúng** hay **sai**?',
    sub: 'Check every box: the number outside times **each** term inside, sign included. Then check where it stops.',
    subVn: 'Kiểm tra từng ô: số bên ngoài nhân với **mỗi** hạng tử bên trong, tính cả dấu. Rồi kiểm tra xem nó dừng ở đâu.',
    activity: {
      id: 'a6_right_wrong',
      type: 'sort',
      prompt: 'Sort each expansion: right or wrong?',
      promptVn: 'Phân loại mỗi phép khai triển: đúng hay sai?',
      bins: [
        { id: 'right', name: 'Right', nameVn: 'Đúng' },
        { id: 'wrong', name: 'Wrong', nameVn: 'Sai' },
      ],
      cards: [
        { id: 'rw1', name: '$4(b + 2) = 4b + 2$', nameVn: '$4(b + 2) = 4b + 2$', bin: 'wrong' },
        { id: 'rw2', name: '$6(k − 3) = 6k − 18$', nameVn: '$6(k − 3) = 6k − 18$', bin: 'right' },
        { id: 'rw3', name: '$3(x − 7) = 3x + 21$', nameVn: '$3(x − 7) = 3x + 21$', bin: 'wrong' },
        { id: 'rw4', name: '$5(a + 3) = 5a + 15$', nameVn: '$5(a + 3) = 5a + 15$', bin: 'right' },
        { id: 'rw5', name: '$7(3 − n) = 21 − 7n = 14n$', nameVn: '$7(3 − n) = 21 − 7n = 14n$', bin: 'wrong' },
        { id: 'rw6', name: '$2(9 − m) = 18 − 2m$', nameVn: '$2(9 − m) = 18 − 2m$', bin: 'right' },
        { id: 'rw7', name: '$9(r + 2) = 9r + 11$', nameVn: '$9(r + 2) = 9r + 11$', bin: 'wrong' },
        { id: 'rw8', name: '$7(y + 4) = 7y + 28$', nameVn: '$7(y + 4) = 7y + 28$', bin: 'right' },
      ],
      explain: 'The wrong ones: $4(b + 2) = 4b + 8$ (the 2 was not multiplied) · $3(x − 7) = 3x − 21$ (the minus stays with the 7) · $7(3 − n) = 21 − 7n$, and stop (21 and $7n$ are not like terms) · $9(r + 2) = 9r + 18$ ($9 × 2$, not $9 + 2$).',
      explainVn: 'Các câu sai: $4(b + 2) = 4b + 8$ (số 2 chưa được nhân) · $3(x − 7) = 3x − 21$ (dấu trừ đi cùng số 7) · $7(3 − n) = 21 − 7n$, rồi dừng (21 và $7n$ không đồng dạng) · $9(r + 2) = 9r + 18$ ($9 × 2$, không phải $9 + 2$).',
    },
  },

  // 16 ─ 5 × 2p = 10p + CHECK 5 ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ScanEye',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    title: 'A Number Inside Too',
    titleVn: 'Bên trong cũng có số',
    ratio: 40,
    inlineSvg: DIAGRAMS.TWO_NUMBERS,
    content: 'A very common slip: writing $7p$ instead of $10p$. That adds the numbers.\n\nMultiply them instead.',
    contentVn: 'Một lỗi rất hay gặp: viết $7p$ thay vì $10p$. Như vậy là cộng các số.\n\nHãy nhân chúng.',
    notes: [
      {
        tone: 'write',
        text: '$5 × 2p = 10p$\nMultiply the **numbers**. The letter stays.',
        textVn: '$5 × 2p = 10p$\nNhân các **con số**. Chữ cái giữ nguyên.',
      },
    ],
    check: {
      id: 'c5_number_letter',
      q: 'What is $4 × 3q$?',
      qVn: '$4 × 3q$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$7q$', textVn: '$7q$' },
        { val: 'B', text: '$12q$', textVn: '$12q$' },
        { val: 'C', text: '$43q$', textVn: '$43q$' },
        { val: 'D', text: '$12$', textVn: '$12$' },
      ],
      correct: 'B',
      expEn: 'Multiply the numbers and keep the letter: $4 × 3 = 12$, so $12q$. A added $4 + 3$; C pushed the digits together; D lost the $q$.',
      expVn: 'Nhân các số và giữ chữ cái: $4 × 3 = 12$, nên $12q$. A cộng $4 + 3$; C ghép các chữ số lại; D làm mất chữ $q$.',
    },
  },

  // 17 ─ Multiply out (reveal) + GRID, three terms ──────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Same job, exam words',
    eyebrowVn: 'Cùng một việc, từ ngữ trong đề',
    title: 'Multiply Out',
    titleVn: 'Nhân phá ngoặc',
    ratio: 50,
    content: '**Multiply out** means expand. These have a number **and** a letter inside.\n\n**a** $7(3q + 2)$\n**b** $4(5u − 1)$\n**c** $6(1 + 2v)$',
    contentVn: '**Multiply out** nghĩa là khai triển. Các câu này có cả số **và** chữ cái bên trong.\n\n**a** $7(3q + 2)$\n**b** $4(5u − 1)$\n**c** $6(1 + 2v)$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      answer: '**a** $21q + 14$  **b** $20u − 4$  **c** $6 + 12v$\n\nIn **b**, $4 × (−1) = −4$: the minus goes into its box.',
      answerVn: '**a** $21q + 14$  **b** $20u − 4$  **c** $6 + 12v$\n\nỞ câu **b**, $4 × (−1) = −4$: dấu trừ đi vào ô của nó.',
    },
    activity: {
      id: 'a7_grid_three',
      type: 'grid',
      expr: '8(6 + 4w − 3g)',
      prompt: 'Three terms inside, so three boxes. Fill the grid for $8(6 + 4w − 3g)$.',
      promptVn: 'Ba hạng tử bên trong, nên có ba ô. Điền lưới ô cho $8(6 + 4w − 3g)$.',
      explain: '$8 × 6 = 48$, $8 × 4w = 32w$ and $8 × (−3g) = −24g$. So $48 + 32w − 24g$ — no two terms are alike, so it is finished.',
      explainVn: '$8 × 6 = 48$, $8 × 4w = 32w$ và $8 × (−3g) = −24g$. Vậy $48 + 32w − 24g$ — không có hai hạng tử nào đồng dạng, nên đã xong.',
    },
  },

  // 18 ─ Mr Bowen's homework — SORT the slips ───────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowVn: 'Tìm lỗi sai',
    title: 'Mr Bowen’s Homework',
    titleVn: 'Bài tập về nhà của thầy Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.MISTAKES,
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nEvery line is wrong. **Name** each mistake.',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nDòng nào cũng sai. Hãy **gọi tên** từng lỗi.',
    activity: {
      id: 'a8_name_slips',
      type: 'sort',
      prompt: 'What went wrong on each line?',
      promptVn: 'Mỗi dòng đã sai ở đâu?',
      bins: [
        { id: 'notmult', name: 'A term was not multiplied', nameVn: 'Một hạng tử chưa được nhân' },
        { id: 'added', name: 'Added instead of multiplying', nameVn: 'Cộng thay vì nhân' },
        { id: 'past', name: 'Carried on past the answer', nameVn: 'Làm tiếp quá đáp án' },
      ],
      cards: [
        { id: 'mb_a', name: 'a) $6(a + 2) = 6a + 2$', nameVn: 'a) $6(a + 2) = 6a + 2$', bin: 'notmult' },
        { id: 'mb_b', name: 'b) $4(3b − 5) = 12b − 9$', nameVn: 'b) $4(3b − 5) = 12b − 9$', bin: 'added' },
        { id: 'mb_c', name: 'c) $5(2 − d) = 10 − 5d = 5d$', nameVn: 'c) $5(2 − d) = 10 − 5d = 5d$', bin: 'past' },
        { id: 'mb_d', name: 'd) $3(2m + 4) = 5m + 12$', nameVn: 'd) $3(2m + 4) = 5m + 12$', bin: 'added' },
      ],
      explain: 'The right answers: **a** $6a + 12$ · **b** $12b − 20$ (he did $4 + 5$) · **c** $10 − 5d$, and stop · **d** $6m + 12$ (he did $3 + 2$). A line can look almost right — check every box.',
      explainVn: 'Đáp án đúng: **a** $6a + 12$ · **b** $12b − 20$ (thầy lấy $4 + 5$) · **c** $10 − 5d$, rồi dừng · **d** $6m + 12$ (thầy lấy $3 + 2$). Một dòng có thể trông gần đúng — hãy kiểm tra từng ô.',
    },
  },

  // 19 ─ Odd one out + CHECK 6 ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Expand all four',
    eyebrowVn: 'Khai triển cả bốn',
    title: 'Odd One Out',
    titleVn: 'Tìm biểu thức khác loại',
    ratio: 45,
    inlineSvg: DIAGRAMS.ODD,
    content: 'Three of these expand to the same thing. One does not.\n\nThe first box will not tell you. Look at the second.',
    contentVn: 'Ba biểu thức khai triển ra cùng một kết quả. Một cái thì không.\n\nÔ đầu tiên không giúp em phân biệt. Hãy nhìn ô thứ hai.',
    check: {
      id: 'c6_odd',
      q: 'Which one is the **odd one out**?',
      qVn: 'Biểu thức nào **khác loại**?',
      options: [
        { val: 'A', text: '$2(6x + 10)$', textVn: '$2(6x + 10)$' },
        { val: 'B', text: '$4(3x + 5)$', textVn: '$4(3x + 5)$' },
        { val: 'C', text: '$3(4x + 6)$', textVn: '$3(4x + 6)$' },
        { val: 'D', text: '$1(12x + 20)$', textVn: '$1(12x + 20)$' },
      ],
      correct: 'C',
      expEn: '$3(4x + 6) = 12x + 18$. A, B and D all give $12x + 20$. Every first box is $12x$, so only multiplying the second term separates them.',
      expVn: '$3(4x + 6) = 12x + 18$. A, B và D đều cho $12x + 20$. Ô đầu tiên của cả bốn đều là $12x$, nên chỉ có phép nhân hạng tử thứ hai mới phân biệt được.',
    },
  },

  // 20 ─ Expand and simplify — ORDER ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Exam words — two jobs',
    eyebrowVn: 'Từ trong đề — hai việc',
    title: 'Expand and Simplify',
    titleVn: 'Khai triển rồi rút gọn',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_STEPS,
    content: 'Job one is today’s lesson. Job two is all of 2.3: collect the like terms.',
    contentVn: 'Việc thứ nhất là bài hôm nay. Việc thứ hai chính là toàn bộ bài 2.3: gộp các hạng tử đồng dạng.',
    notes: [
      {
        tone: 'write',
        text: '**Expand and simplify:** expand the brackets, then collect the like terms.\n$3(x + 2) + 4x = 7x + 6$',
        textVn: '**Khai triển rồi rút gọn (expand and simplify):** khai triển dấu ngoặc, rồi gộp các hạng tử đồng dạng.\n$3(x + 2) + 4x = 7x + 6$',
      },
    ],
    activity: {
      id: 'a9_order_jobs',
      type: 'order',
      prompt: 'Put the steps of **expand and simplify** in order.',
      promptVn: 'Sắp xếp các bước **khai triển rồi rút gọn** theo đúng thứ tự.',
      steps: [
        { id: 'expand', name: 'Multiply every term inside the brackets by the number outside', nameVn: 'Nhân mọi hạng tử bên trong ngoặc với số bên ngoài' },
        { id: 'write', name: 'Write every term out, each with its sign', nameVn: 'Viết ra mọi hạng tử, mỗi hạng tử kèm dấu của nó' },
        { id: 'find', name: 'Find the like terms', nameVn: 'Tìm các hạng tử đồng dạng' },
        { id: 'collect', name: 'Collect them, then stop', nameVn: 'Gộp chúng lại, rồi dừng' },
      ],
      explain: 'You cannot collect a term that is still locked inside a bracket, so expanding comes first. Once no two terms are alike, you stop.',
      explainVn: 'Em không thể gộp một hạng tử còn nằm trong ngoặc, nên khai triển phải làm trước. Khi không còn hai hạng tử nào đồng dạng, em dừng lại.',
    },
  },

  // 21 ─ Expand, then collect (reveal) + ALGEBRA ────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn — two jobs each',
    eyebrowVn: 'Đến lượt em — mỗi câu hai việc',
    title: 'Expand, Then Collect',
    titleVn: 'Khai triển, rồi gộp',
    ratio: 50,
    content: 'Expand first. Then collect.\n\n**a** $4(9 + x) − 24$\n**b** $4(x + 4) + 7(x + 1)$',
    contentVn: 'Khai triển trước. Rồi gộp.\n\n**a** $4(9 + x) − 24$\n**b** $4(x + 4) + 7(x + 1)$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      answer: '**a** $36 + 4x − 24 = 4x + 12$\n**b** $4x + 16 + 7x + 7 = 11x + 23$\n\nIn **b** there are two brackets: expand both, then collect.',
      answerVn: '**a** $36 + 4x − 24 = 4x + 12$\n**b** $4x + 16 + 7x + 7 = 11x + 23$\n\nỞ câu **b** có hai dấu ngoặc: khai triển cả hai, rồi gộp.',
    },
    activity: {
      id: 'a10_type_simplify',
      type: 'algebra',
      mode: 'expand',
      expr: '5(2x − 2) + x + 17',
      prompt: 'Expand and simplify $5(2x − 2) + x + 17$. Type the finished answer.',
      promptVn: 'Khai triển rồi rút gọn $5(2x − 2) + x + 17$. Gõ đáp án cuối cùng.',
      explain: '$5(2x − 2) = 10x − 10$. Then $10x − 10 + x + 17$: the $x$ terms make $11x$ and the numbers make $7$. So $11x + 7$.',
      explainVn: '$5(2x − 2) = 10x − 10$. Rồi $10x − 10 + x + 17$: các hạng tử chứa $x$ gộp thành $11x$ và các số gộp thành $7$. Vậy $11x + 7$.',
    },
  },

  // 22 ─ The rectangle + CHECK 7 ────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Square',
    eyebrow: 'The grid is a rectangle',
    eyebrowVn: 'Lưới ô chính là hình chữ nhật',
    title: 'Area and Perimeter',
    titleVn: 'Diện tích và chu vi',
    ratio: 40,
    inlineSvg: DIAGRAMS.RECT_AREA,
    content: 'The grid was a rectangle all along: one side is 4, the other is $x + 3$.\n\nArea = length × width.',
    contentVn: 'Lưới ô từ đầu đã là một hình chữ nhật: một cạnh là 4, cạnh kia là $x + 3$.\n\nDiện tích (area) = chiều dài × chiều rộng.',
    reveal: {
      label: 'And the perimeter?',
      labelVn: 'Còn chu vi thì sao?',
      answer: 'Add all four sides: $2(x + 3) + 2 × 4 = 2x + 6 + 8 = 2x + 14$ cm.',
      answerVn: 'Cộng cả bốn cạnh: $2(x + 3) + 2 × 4 = 2x + 6 + 8 = 2x + 14$ cm.',
    },
    check: {
      id: 'c7_area',
      q: 'What is the **area** of the rectangle, in simplest form?',
      qVn: '**Diện tích** hình chữ nhật, viết ở dạng gọn nhất, là bao nhiêu?',
      options: [
        { val: 'A', text: '$4x + 12$ cm²', textVn: '$4x + 12$ cm²' },
        { val: 'B', text: '$4x + 3$ cm²', textVn: '$4x + 3$ cm²' },
        { val: 'C', text: '$2x + 14$ cm²', textVn: '$2x + 14$ cm²' },
        { val: 'D', text: '$x + 7$ cm²', textVn: '$x + 7$ cm²' },
      ],
      correct: 'A',
      expEn: 'Area $= 4(x + 3) = 4x + 12$ cm². B multiplied only the $x$; C is the **perimeter**; D added the sides instead of multiplying.',
      expVn: 'Diện tích $= 4(x + 3) = 4x + 12$ cm². B chỉ nhân $x$; C là **chu vi**; D cộng các cạnh thay vì nhân.',
    },
  },

  // 23 ─ Work backwards (reveal) ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'RotateCcw',
    eyebrow: 'Challenge',
    eyebrowVn: 'Thử thách',
    title: 'Work Backwards',
    titleVn: 'Làm ngược lại',
    content: 'Now the answer is given and a number is missing. Find the number in each box.\n\n**a** $\\square(2x + 3) = 8x + 12$\n\n**b** $5(2y − \\square) = 10y − 35$\n\n**c** $\\square(3m + \\square) = 12m + 20$',
    contentVn: 'Bây giờ đáp án đã có sẵn và thiếu một con số. Hãy tìm số trong mỗi ô.\n\n**a** $\\square(2x + 3) = 8x + 12$\n\n**b** $5(2y − \\square) = 10y − 35$\n\n**c** $\\square(3m + \\square) = 12m + 20$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      answer: '**a** 4, because $4 × 2x = 8x$ and $4 × 3 = 12$\n\n**b** 7, because $5 × 7 = 35$\n\n**c** 4 and 5: $4 × 3m = 12m$ first, then $4 × 5 = 20$',
      answerVn: '**a** 4, vì $4 × 2x = 8x$ và $4 × 3 = 12$\n\n**b** 7, vì $5 × 7 = 35$\n\n**c** 4 và 5: trước tiên $4 × 3m = 12m$, rồi $4 × 5 = 20$',
    },
  },

  // 24 ─ Mr Bowen's shopping + CHECK 8 ──────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form — read every word',
    eyebrowVn: 'Dạng gọn nhất — đọc kỹ từng chữ',
    title: 'Mr Bowen’s Shopping',
    titleVn: 'Thầy Bowen đi chợ',
    content: 'Mr Bowen buys 6 bags. Each bag has $m$ mangoes and 2 dragon fruits.\n\nOn the way home he eats 4 mangoes.\n\nHow much fruit does he carry into the house?',
    contentVn: 'Thầy Bowen mua 6 túi. Mỗi túi có $m$ quả xoài và 2 quả thanh long.\n\nTrên đường về thầy ăn 4 quả xoài.\n\nThầy mang vào nhà bao nhiêu quả?',
    check: {
      id: 'c8_mangoes',
      q: 'How much fruit does Mr Bowen carry into the house, in simplest form?',
      qVn: 'Thầy Bowen mang vào nhà bao nhiêu quả, viết ở dạng gọn nhất?',
      options: [
        { val: 'A', text: '$6m + 12$', textVn: '$6m + 12$' },
        { val: 'B', text: '$6m − 2$', textVn: '$6m − 2$' },
        { val: 'C', text: '$6m + 12 − 4$', textVn: '$6m + 12 − 4$' },
        { val: 'D', text: '$6m + 8$', textVn: '$6m + 8$' },
      ],
      correct: 'D',
      expEn: 'Six bags of $m + 2$ is $6(m + 2) = 6m + 12$; he eats 4, so $6m + 12 − 4 = 6m + 8$. A forgot the 4 he ate; B multiplied only the $m$; C has the right value but is not finished — 12 and −4 are like terms. And it is $6m + 8$ **fruit**, not mangoes.',
      expVn: 'Sáu túi, mỗi túi $m + 2$ quả, là $6(m + 2) = 6m + 12$; thầy ăn 4 quả, nên $6m + 12 − 4 = 6m + 8$. A quên 4 quả thầy đã ăn; B chỉ nhân $m$; C đúng giá trị nhưng chưa xong — 12 và −4 là hạng tử đồng dạng. Và đó là $6m + 8$ **quả** nói chung, không phải chỉ xoài.',
    },
  },

  // 25 ─ Mr Bowen's drawers (reveal) ────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Bug',
    eyebrow: 'It gets sillier',
    eyebrowVn: 'Càng lúc càng ngớ ngẩn',
    title: 'Mr Bowen’s Drawers',
    titleVn: 'Ngăn kéo của thầy Bowen',
    content: 'Mr Bowen has 7 drawers. Each drawer holds $s$ socks and 3 spiders.\n\nEvery spider picks up one sock and walks out.\n\nHow many things are in the drawers now?',
    contentVn: 'Thầy Bowen có 7 ngăn kéo. Mỗi ngăn có $s$ chiếc tất và 3 con nhện.\n\nMỗi con nhện cầm một chiếc tất rồi bò ra ngoài.\n\nBây giờ trong các ngăn kéo có bao nhiêu thứ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: 'At the start: $7(s + 3) = 7s + 21$.\n\nEach drawer loses its 3 spiders **and** 3 socks, leaving $s − 3$ socks: $7(s − 3) = 7s − 21$.',
      answerVn: 'Lúc đầu: $7(s + 3) = 7s + 21$.\n\nMỗi ngăn mất 3 con nhện **và** 3 chiếc tất, còn lại $s − 3$ chiếc tất: $7(s − 3) = 7s − 21$.',
    },
  },

  // 26 ─ Checklist + CHECK 9 (the exit question) ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: '> Next: the key words, then **Expand It** and **Pyramids**. The last question is below.',
    contentVn: '> Tiếp theo: các từ khóa, rồi **Khai triển** và **Kim tự tháp**. Câu hỏi cuối cùng ở bên dưới.',
    items: [
      { text: 'Say what **brackets** and **expand** mean.', textVn: 'Nói được **dấu ngoặc** và **khai triển** là gì.' },
      { text: 'Multiply **every** term inside the brackets.', textVn: 'Nhân **mọi** hạng tử bên trong ngoặc.' },
      { text: 'Take the **minus** sign in with its term.', textVn: 'Mang **dấu trừ** vào cùng hạng tử của nó.' },
      { text: 'Stop at $12 − 4c$: not like terms.', textVn: 'Dừng ở $12 − 4c$: không đồng dạng.' },
      { text: 'Know that $5 × 2p = 10p$.', textVn: 'Biết rằng $5 × 2p = 10p$.' },
      { text: '**Expand and simplify** in that order.', textVn: '**Khai triển rồi rút gọn**, đúng thứ tự đó.' },
    ],
    check: {
      id: 'c9_exit',
      q: 'Expand and simplify $5(x + 2) + 3x$.',
      qVn: 'Khai triển rồi rút gọn $5(x + 2) + 3x$.',
      options: [
        { val: 'A', text: '$8x + 10$', textVn: '$8x + 10$' },
        { val: 'B', text: '$8x + 2$', textVn: '$8x + 2$' },
        { val: 'C', text: '$5x + 10 + 3x$', textVn: '$5x + 10 + 3x$' },
        { val: 'D', text: '$18x$', textVn: '$18x$' },
      ],
      correct: 'A',
      expEn: '$5(x + 2) = 5x + 10$, then $5x + 3x = 8x$: $8x + 10$. B multiplied only the $x$; C expanded but did not collect; D collected unlike terms — 10 is a number, not an $x$ term.',
      expVn: '$5(x + 2) = 5x + 10$, rồi $5x + 3x = 8x$: $8x + 10$. B chỉ nhân $x$; C đã khai triển nhưng chưa gộp; D gộp các hạng tử không đồng dạng — 10 là một con số, không phải hạng tử chứa $x$.',
    },
  },
];
