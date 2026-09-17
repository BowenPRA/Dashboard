// src/data/Y7_MATH/U02_5/notes.js
// 2.5 Constructing and Solving Equations — a self-study reduction of the
// classroom deck (C:\Users\bowen\lessons, content/y7-math/U02_5), rebuilt to the
// algebra-engines density (docs/y7-math/algebra-engines.md §4). 26 layout
// slides, 20 scored items: 10 checks and 10 activities across five activity
// types (algebra · sort · predict · flow · order). No three slides in a row go
// unscored, and no two activities in a row are the same type.
//
// THREE THINGS SHAPE THIS DECK (from the classroom deck, kept).
//
// 1. THE STUDENT HAS ALREADY SOLVED EQUATIONS. The starter is a missing-number
//    box, and in Girl Math the box was called n. Slide 2 gives the box a letter
//    and has the student type the number.
//
// 2. THE ENGLISH IS THE BARRIER. "Reverse" (go backwards) and "inverse" (the
//    opposite operation) look almost the same; "I think of a number" means
//    choose a secret one, not "think about". Slide 4 sorts sentences into the
//    three. Socks and shoes (slides 15–16) carry the order: last on, first off.
//
// 3. TWO MISTAKES COST THE MARKS: doing the operation you see instead of its
//    inverse (x − 4 = 6, so x = 2) and undoing the steps in the wrong order
//    (2a + 4 = 18, halve first, so a = 5). Each classroom hand vote is now a
//    `predict` (slides 5 and 17), settled on the next slide — the first by
//    CHECKING, the second by the stepper.
//
// SPINE:
//   1–2    hero; the box has a name (algebra: x + 7 = 15)
//   3–4    key word equation (check); reverse / inverse / think of (sort)
//   5–8    which is right? (predict); check your answer (check); inverse
//          operation (check); the book's flow chart (check)
//   9–12   Undo It stepper; solve then check (flow); either way round
//          (check); Check It! (sort)
//   13–14  Mr Bowen's number; write it, then solve it (algebra)
//   15–20  getting dressed (order); last on, first off; the second vote
//          (predict); Two Steps stepper; undo the last step first (check);
//          two-step equations (flow)
//   21–25  Mr Bowen's homework (sort); angles (check); notebooks (check);
//          his age of 4; the plant that was −4 cm (check)
//   26     the checklist, with the exit question as the last check
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them.
//  · No whiteboards, pairs, hand votes, paper, homework, date or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { ReverseOne, ReverseTwo } from './widgets.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 2 · 2.5',
    eyebrowVn: 'Chương 2 · 2.5',
    title: 'Constructing and Solving Equations',
    titleVn: 'Lập và giải phương trình',
    objective: 'Say what an equation is and what solve means; check an answer by putting it back in; undo each step with its inverse operation, the last step first; and turn "I think of a number…" into an equation and solve it.',
    objectiveVn: 'Nói được phương trình là gì và giải nghĩa là gì; thử lại đáp án bằng cách thay nó vào lại; làm ngược từng bước bằng phép toán ngược, bước cuối trước tiên; và biến "I think of a number…" thành phương trình rồi giải nó.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **type**, **sort**, **predict** and **reverse** your way through it. **20 things are scored** — the first is a missing-number box on the next slide.',
      textVn: 'Em sẽ **nhập**, **phân loại**, **dự đoán** và **đi ngược** trong suốt bài học. **20 mục được tính điểm** — mục đầu tiên là một ô số còn thiếu ở slide sau.',
    },
  },

  // 2 ─ Starter: the box has a name (ALGEBRA) ───────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter',
    eyebrowVn: 'Khởi động',
    title: 'The Box Has a Name',
    titleVn: 'Ô trống có tên',
    label: 'Type it',
    labelVn: 'Nhập đáp án',
    labelIcon: 'PenLine',
    text: '**□ + 7 = 15** → **x + 7 = 15**',
    textVn: '**□ + 7 = 15** → **x + 7 = 15**',
    sub: 'In Girl Math, the box was called **n**. A letter is just a box with a name.',
    subVn: 'Trong Girl Math, ô trống tên là **n**. Một chữ cái chỉ là một ô trống có tên.',
    reveal: {
      prompt: 'Two more boxes: **□ × 4 = 28** and **20 − □ = 11**.',
      promptVn: 'Thêm hai ô nữa: **□ × 4 = 28** và **20 − □ = 11**.',
      label: 'Check these two',
      labelVn: 'Kiểm tra hai ô này',
      answer: '**7** and **9**. Every one of these is an **equation**, and you have just **solved** it.',
      answerVn: '**7** và **9**. Mỗi câu này là một **phương trình**, và em vừa **giải** nó.',
    },
    activity: {
      id: 'act_box',
      type: 'algebra',
      mode: 'solve',
      eq: 'x + 7 = 15',
      prompt: 'Solve $x + 7 = 15$. What number is $x$?',
      promptVn: 'Giải $x + 7 = 15$. $x$ là số nào?',
      explain: '$8 + 7 = 15$, so $x = 8$. A letter in an equation stands for one number you have not found yet.',
      explainVn: '$8 + 7 = 15$, nên $x = 8$. Chữ cái trong phương trình đại diện cho một số mà em chưa tìm ra.',
    },
  },

  // 3 ─ Key words: equation, solve (CHECK 1) ────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    title: 'Equation',
    titleVn: 'Phương trình',
    ratio: 45,
    inlineSvg: DIAGRAMS.KINDS,
    content: 'You know two of these already. An **expression** has no = sign. A **formula** is a rule for any value.\n\nAn **equation** hides **one** number.',
    contentVn: 'Em đã biết hai loại rồi. **Biểu thức** không có dấu =. **Công thức** là quy tắc đúng với mọi giá trị.\n\n**Phương trình** giấu **một** con số.',
    notes: [
      {
        tone: 'write',
        text: '**Equation:** has an = sign and an **unknown** number.\n**Solve:** find the value of the unknown.\n$x + 7 = 15$, so $x = 8$',
        textVn: '**Phương trình (equation):** có dấu = và một số **chưa biết** (unknown).\n**Giải (solve):** tìm giá trị của số chưa biết.\n$x + 7 = 15$, nên $x = 8$',
      },
    ],
    check: {
      id: 'chk_equation',
      q: 'Which of these is an **equation** with one unknown?',
      qVn: 'Cái nào sau đây là một **phương trình** có một số chưa biết?',
      options: [
        { val: 'A', text: '$4n − 1$', textVn: '$4n − 1$' },
        { val: 'B', text: '$y + 9 = 16$', textVn: '$y + 9 = 16$' },
        { val: 'C', text: '$A = lw$', textVn: '$A = lw$' },
        { val: 'D', text: '$12 − 5 = 7$', textVn: '$12 − 5 = 7$' },
      ],
      correct: 'B',
      expEn: '$y + 9 = 16$ has an = sign and one unknown number, $y$ (it is 7). $4n − 1$ has no = sign, so it is an expression. $A = lw$ is a formula: a rule for any length and width. $12 − 5 = 7$ has nothing unknown.',
      expVn: '$y + 9 = 16$ có dấu = và một số chưa biết là $y$ (bằng 7). $4n − 1$ không có dấu =, nên là biểu thức. $A = lw$ là công thức: một quy tắc cho mọi chiều dài và chiều rộng. $12 − 5 = 7$ không có gì chưa biết.',
    },
  },

  // 4 ─ English check: reverse / inverse / think of (SORT) ──────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    title: 'Three Words to Watch',
    titleVn: 'Ba từ cần chú ý',
    inlineSvg: DIAGRAMS.WORDS,
    caption: '**Reverse** and **inverse** look the same. They are not.',
    captionVn: '**Reverse** = đi ngược lại. **Inverse** = phép ngược. **think of a number** = nghĩ ra một số và giữ bí mật.',
    activity: {
      id: 'act_words',
      type: 'sort',
      prompt: 'Which word does each sentence need? Sort them.',
      promptVn: 'Mỗi câu cần từ nào? Hãy phân loại.',
      bins: [
        { id: 'reverse', name: '**reverse** — go backwards', nameVn: '**reverse** — đi ngược lại' },
        { id: 'inverse', name: '**inverse** — the opposite operation', nameVn: '**inverse** — phép toán ngược' },
        { id: 'think', name: '**think of** — choose a secret number', nameVn: '**think of** — chọn một số bí mật' },
      ],
      cards: [
        { id: 'w1', name: 'The car goes backwards out of the gate.', nameVn: 'Chiếc xe lùi ra khỏi cổng.', bin: 'reverse' },
        { id: 'w2', name: 'Go along the flow chart from right to left.', nameVn: 'Đi theo sơ đồ từ phải sang trái.', bin: 'reverse' },
        { id: 'w3', name: '$− 5$ undoes $+ 5$.', nameVn: '$− 5$ làm ngược $+ 5$.', bin: 'inverse' },
        { id: 'w4', name: '$÷ 3$ undoes $× 3$.', nameVn: '$÷ 3$ làm ngược $× 3$.', bin: 'inverse' },
        { id: 'w5', name: 'Choose a number and do not tell anyone.', nameVn: 'Chọn một số và không nói cho ai biết.', bin: 'think' },
        { id: 'w6', name: 'Call the secret number $n$.', nameVn: 'Gọi số bí mật đó là $n$.', bin: 'think' },
      ],
      explain: '**Reverse** is about direction: backwards, right to left. **Inverse** is about the operation: the one that undoes it. **I think of a number** means choose one and keep it secret — not "think about".',
      explainVn: '**Reverse** nói về hướng: đi lùi, từ phải sang trái. **Inverse** nói về phép toán: phép làm ngược lại nó. **I think of a number** nghĩa là chọn một số và giữ bí mật — không phải "nghĩ về".',
    },
  },

  // 5 ─ The first vote: x − 4 = 6 (PREDICT) ─────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    title: 'Which Is Right?',
    titleVn: 'Đáp án nào đúng?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Solve $x − 4 = 6$',
    textVn: 'Giải $x − 4 = 6$',
    sub: 'One student says **x = 2**. Another says **x = 10**. Only one can be right.',
    subVn: 'Một bạn nói **x = 2**. Một bạn khác nói **x = 10**. Chỉ một bạn đúng.',
    activity: {
      id: 'act_vote_x',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptVn: 'Đáp án nào đúng?',
      options: [
        { val: 'two', name: '$x = 2$', nameVn: '$x = 2$' },
        { val: 'ten', name: '$x = 10$', nameVn: '$x = 10$' },
        { val: 'both', name: 'Both — it depends how you work it out', nameVn: 'Cả hai — tùy cách em tính' },
      ],
      correct: 'ten',
      explain: '$x = 10$. Do not guess — put each answer back in: $10 − 4 = 6$, but $2 − 4 = −2$. An equation has one answer, and the next slide shows how to prove it.',
      explainVn: '$x = 10$. Đừng đoán — thay từng đáp án vào lại: $10 − 4 = 6$, nhưng $2 − 4 = −2$. Phương trình chỉ có một đáp án, và slide sau cho em thấy cách chứng minh.',
    },
  },

  // 6 ─ Check your answer (CHECK 2) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'CheckCircle2',
    eyebrow: 'Do not guess',
    eyebrowVn: 'Đừng đoán',
    title: 'Check Your Answer',
    titleVn: 'Thử lại đáp án',
    ratio: 45,
    inlineSvg: DIAGRAMS.CHECK,
    content: '**x = 10 is right.** $x = 2$ comes from doing the subtraction you can see.\n\nYou met substitution in 2.2. It settles every argument.',
    contentVn: '**x = 10 mới đúng.** $x = 2$ là do làm luôn phép trừ mà em nhìn thấy.\n\nEm đã học thay số ở bài 2.2. Nó giải quyết mọi tranh cãi.',
    notes: [
      {
        tone: 'write',
        text: '**Check:** substitute your answer back into the equation.\n$10 − 4 = 6$ ✓',
        textVn: '**Thử lại (check):** thay đáp án của em vào lại phương trình.\n$10 − 4 = 6$ ✓',
      },
    ],
    check: {
      id: 'chk_substitute',
      q: 'Which answer to $x − 8 = 5$ passes the check?',
      qVn: 'Đáp án nào của $x − 8 = 5$ thử lại thấy đúng?',
      options: [
        { val: 'A', text: '$x = −3$', textVn: '$x = −3$' },
        { val: 'B', text: '$x = 3$', textVn: '$x = 3$' },
        { val: 'C', text: '$x = 13$', textVn: '$x = 13$' },
      ],
      correct: 'C',
      expEn: 'Put each one back in: $13 − 8 = 5$ ✓. But $−3 − 8 = −11$ and $3 − 8 = −5$. $−3$ did the $− 8$ instead of undoing it; $3$ took 5 from 8, the wrong way round.',
      expVn: 'Thay từng đáp án vào lại: $13 − 8 = 5$ ✓. Nhưng $−3 − 8 = −11$ và $3 − 8 = −5$. $−3$ là làm luôn phép $− 8$ thay vì làm ngược nó; $3$ là lấy 8 trừ 5, ngược chiều.',
    },
  },

  // 7 ─ Inverse operation (CHECK 3) ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    side: 'left',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Inverse Operation',
    titleVn: 'Phép toán ngược',
    ratio: 45,
    inlineSvg: DIAGRAMS.INVERSES,
    content: 'Do it, then undo it, and you are back where you started.\n\nIn Unit 1 "the inverse of 5" was $−5$. Here the word names an **operation**.',
    contentVn: 'Làm một phép, rồi làm ngược lại, và em trở về chỗ ban đầu.\n\nỞ Chương 1, "số đối của 5" là $−5$. Ở đây từ này chỉ một **phép toán**.',
    notes: [
      {
        tone: 'write',
        text: '**Inverse operation:** the operation that undoes another.\n+ and − are inverses. × and ÷ are inverses.',
        textVn: '**Phép toán ngược (inverse operation):** phép toán xóa bỏ tác dụng của một phép toán khác.\n+ và − là hai phép ngược nhau. × và ÷ là hai phép ngược nhau.',
      },
    ],
    check: {
      id: 'chk_inverse',
      q: 'In $\\frac{x}{4} = 3$, what is done to $x$, and what undoes it?',
      qVn: 'Trong $\\frac{x}{4} = 3$, phép toán nào được làm với $x$, và phép nào làm ngược nó?',
      options: [
        { val: 'A', text: '$÷ 4$, undone by $× 4$', textVn: '$÷ 4$, làm ngược bằng $× 4$' },
        { val: 'B', text: '$÷ 4$, undone by $− 4$', textVn: '$÷ 4$, làm ngược bằng $− 4$' },
        { val: 'C', text: '$× 4$, undone by $÷ 4$', textVn: '$× 4$, làm ngược bằng $÷ 4$' },
        { val: 'D', text: '$− 4$, undone by $+ 4$', textVn: '$− 4$, làm ngược bằng $+ 4$' },
      ],
      correct: 'A',
      expEn: 'The fraction line means divide: $x ÷ 4$. The inverse of ÷ is ×, so $× 4$ undoes it and $x = 12$. B pairs ÷ with −, which are not inverses. C and D misread the fraction line.',
      expVn: 'Vạch phân số nghĩa là chia: $x ÷ 4$. Phép ngược của ÷ là ×, nên $× 4$ làm ngược nó và $x = 12$. B ghép ÷ với −, hai phép này không ngược nhau. C và D đọc sai vạch phân số.',
    },
  },

  // 8 ─ The book's flow chart (CHECK 4) ─────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'RotateCcw',
    eyebrow: 'The book’s method',
    eyebrowVn: 'Phương pháp trong sách',
    title: 'Reverse the Flow Chart',
    titleVn: 'Đi ngược sơ đồ',
    ratio: 45,
    inlineSvg: DIAGRAMS.FLOW,
    content: '**Forward:** what happens to $x$.\n\n**Backwards:** start at the answer and undo it, one box at a time.',
    contentVn: '**Đi xuôi:** điều gì xảy ra với $x$.\n\n**Đi ngược:** bắt đầu từ kết quả và làm ngược lại, từng ô một.',
    notes: [
      {
        tone: 'write',
        text: 'To **solve**, reverse the flow chart.\nUse the **inverse** of each operation.\n$x + 5 = 12$, so $x = 12 − 5 = 7$',
        textVn: 'Để **giải**, đi ngược sơ đồ (flow chart).\nDùng phép **ngược** của mỗi phép toán.\n$x + 5 = 12$, nên $x = 12 − 5 = 7$',
      },
    ],
    check: {
      id: 'chk_reverse_box',
      q: 'For $x − 6 = 10$, the forward box is $− 6$. What goes in the reverse box?',
      qVn: 'Với $x − 6 = 10$, ô đi xuôi là $− 6$. Ô đi ngược ghi gì?',
      options: [
        { val: 'A', text: '$− 6$', textVn: '$− 6$' },
        { val: 'B', text: '$÷ 6$', textVn: '$÷ 6$' },
        { val: 'C', text: '$× 6$', textVn: '$× 6$' },
        { val: 'D', text: '$+ 6$', textVn: '$+ 6$' },
      ],
      correct: 'D',
      expEn: 'The reverse box holds the inverse, $+ 6$: $x = 10 + 6 = 16$. Copying $− 6$ does the operation again and gives 4, but $4 − 6$ is not 10. × and ÷ undo each other, not a −.',
      expVn: 'Ô đi ngược ghi phép ngược, $+ 6$: $x = 10 + 6 = 16$. Chép lại $− 6$ là làm lại chính phép đó và ra 4, nhưng $4 − 6$ không bằng 10. × và ÷ làm ngược nhau, không làm ngược phép −.',
    },
  },

  // 9 ─ The stepper: one step ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each box before you press',
    eyebrowVn: 'Nói từng ô trước khi bấm',
    title: 'Undo It',
    titleVn: 'Làm ngược lại',
    widget: ReverseOne,
    caption: 'Say what goes in each box **before** you press **Next box**. The last press checks the answer.',
    captionVn: 'Nói điều gì sẽ vào mỗi ô **trước khi** bấm **Ô tiếp**. Lần bấm cuối cùng sẽ thử lại đáp án.',
  },

  // 10 ─ Solve, then check (FLOW) ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Solve, Then Check',
    titleVn: 'Giải, rồi thử lại',
    content:
      '**a** $x + 8 = 20$\n' +
      '**b** $x − 7 = 9$\n' +
      '**c** $6 + x = 14$\n' +
      '**d** $6x = 42$\n' +
      '**e** $x − 15 = 20$\n\n' +
      'Reverse the flow chart for **d** below. Solve the other four, then check them.',
    contentVn:
      '**a** $x + 8 = 20$\n' +
      '**b** $x − 7 = 9$\n' +
      '**c** $6 + x = 14$\n' +
      '**d** $6x = 42$\n' +
      '**e** $x − 15 = 20$\n\n' +
      'Đi ngược sơ đồ của câu **d** ở bên dưới. Giải bốn câu còn lại, rồi kiểm tra.',
    reveal: {
      label: 'Check a, b, c and e',
      labelVn: 'Kiểm tra a, b, c và e',
      answer: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$ ($6 + x$ is the same as $x + 6$), **e** $x = 35$',
      answerVn: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$ ($6 + x$ cũng giống $x + 6$), **e** $x = 35$',
    },
    activity: {
      id: 'act_flow_6x',
      type: 'flow',
      eq: '6x = 42',
      prompt: 'Reverse the flow chart for **d** $6x = 42$.',
      promptVn: 'Đi ngược sơ đồ của câu **d** $6x = 42$.',
      explain: '$6x$ means $x × 6$. The inverse of $× 6$ is $÷ 6$: $42 ÷ 6 = 7$. Check: $6 × 7 = 42$ ✓.',
      explainVn: '$6x$ nghĩa là $x × 6$. Phép ngược của $× 6$ là $÷ 6$: $42 ÷ 6 = 7$. Thử lại: $6 × 7 = 42$ ✓.',
    },
  },

  // 11 ─ Either way round (CHECK 5) ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    title: 'Either Way Round',
    titleVn: 'Viết chiều nào cũng được',
    content: 'The unknown can sit on the **right** of the = sign. Nothing changes: an = sign reads both ways.',
    contentVn: 'Số chưa biết có thể nằm ở **bên phải** dấu =. Không có gì thay đổi: dấu = đọc chiều nào cũng được.',
    notes: [
      {
        tone: 'write',
        text: '$14 = x + 3$ means the same as $x + 3 = 14$.',
        textVn: '$14 = x + 3$ có nghĩa giống như $x + 3 = 14$.',
      },
    ],
    reveal: {
      prompt: 'Two more: **b** $35 = 5x$, **c** $9 = x − 4$.',
      promptVn: 'Thêm hai câu: **b** $35 = 5x$, **c** $9 = x − 4$.',
      label: 'Check b and c',
      labelVn: 'Kiểm tra b và c',
      answer: '**b** $35 ÷ 5 = 7$, so $x = 7$. **c** $9 + 4 = 13$, so $x = 13$.',
      answerVn: '**b** $35 ÷ 5 = 7$, nên $x = 7$. **c** $9 + 4 = 13$, nên $x = 13$.',
    },
    check: {
      id: 'chk_either_way',
      q: '**a** Solve $20 = x + 6$.',
      qVn: '**a** Giải $20 = x + 6$.',
      options: [
        { val: 'A', text: '$x = 26$', textVn: '$x = 26$' },
        { val: 'B', text: '$x = 14$', textVn: '$x = 14$' },
        { val: 'C', text: '$x = −14$', textVn: '$x = −14$' },
      ],
      correct: 'B',
      expEn: 'Read it as $x + 6 = 20$. Undo $+ 6$ with $− 6$: $20 − 6 = 14$. Check: $14 + 6 = 20$ ✓. 26 added the 6 instead of undoing it; $−14$ worked out $6 − 20$, the wrong way round.',
      expVn: 'Đọc thành $x + 6 = 20$. Làm ngược $+ 6$ bằng $− 6$: $20 − 6 = 14$. Thử lại: $14 + 6 = 20$ ✓. 26 là cộng thêm 6 thay vì làm ngược; $−14$ là tính $6 − 20$, ngược chiều.',
    },
  },

  // 12 ─ Check It! (SORT) ───────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'CheckCircle2',
    eyebrow: 'Put each answer back in',
    eyebrowVn: 'Thay từng đáp án vào lại',
    title: 'Check It!',
    titleVn: 'Thử lại nào!',
    label: 'Sort it',
    labelVn: 'Phân loại',
    labelIcon: 'Sparkles',
    text: 'Each equation is solved already. **Is the answer right?**',
    textVn: 'Mỗi phương trình đã được giải sẵn. **Đáp án có đúng không?**',
    sub: 'Do not solve them. Put the answer back in and see if the equation is true.',
    subVn: 'Đừng giải lại. Thay đáp án vào và xem phương trình có đúng không.',
    activity: {
      id: 'act_check_it',
      type: 'sort',
      prompt: 'Sort each solved equation.',
      promptVn: 'Phân loại từng phương trình đã giải.',
      bins: [
        { id: 'ok', name: 'Right — it checks', nameVn: 'Đúng — thử lại thấy đúng' },
        { id: 'bad', name: 'Wrong — the check fails', nameVn: 'Sai — thử lại thấy sai' },
      ],
      cards: [
        { id: 'k1', name: '$x − 3 = 8$, so $x = 5$', nameVn: '$x − 3 = 8$, nên $x = 5$', bin: 'bad' },
        { id: 'k2', name: '$4x = 28$, so $x = 7$', nameVn: '$4x = 28$, nên $x = 7$', bin: 'ok' },
        { id: 'k3', name: '$x + 12 = 20$, so $x = 32$', nameVn: '$x + 12 = 20$, nên $x = 32$', bin: 'bad' },
        { id: 'k4', name: '$15 = x + 6$, so $x = 9$', nameVn: '$15 = x + 6$, nên $x = 9$', bin: 'ok' },
        { id: 'k5', name: '$x − 10 = 5$, so $x = −5$', nameVn: '$x − 10 = 5$, nên $x = −5$', bin: 'bad' },
        { id: 'k6', name: '$30 = 5x$, so $x = 6$', nameVn: '$30 = 5x$, nên $x = 6$', bin: 'ok' },
        { id: 'k7', name: '$x + 8 = 8$, so $x = 0$', nameVn: '$x + 8 = 8$, nên $x = 0$', bin: 'ok' },
        { id: 'k8', name: '$7x = 7$, so $x = 0$', nameVn: '$7x = 7$, nên $x = 0$', bin: 'bad' },
      ],
      explain: 'The wrong four fail their checks: $5 − 3 = 2$, $32 + 12 = 44$, $−5 − 10 = −15$ and $7 × 0 = 0$. They should be 11, 8, 15 and 1. $x = 0$ is a good answer to $x + 8 = 8$: $0 + 8 = 8$.',
      explainVn: 'Bốn câu sai không qua được phép thử: $5 − 3 = 2$, $32 + 12 = 44$, $−5 − 10 = −15$ và $7 × 0 = 0$. Đáp án đúng là 11, 8, 15 và 1. $x = 0$ là đáp án đúng của $x + 8 = 8$: $0 + 8 = 8$.',
    },
  },

  // 13 ─ Mr Bowen's number: sentence to equation ────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it as an equation',
    eyebrowVn: 'Nói thành phương trình',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.SENTENCE,
    content: '"I think of a number and subtract 5. My answer is 21." What number did Mr Bowen **first think of**?\n\nTurn each phrase into maths. Then solve it: **26**.',
    contentVn: '"Thầy nghĩ ra một số rồi trừ đi 5. Kết quả là 21." Lúc đầu thầy Bowen **đã nghĩ ra** số nào?\n\nBiến từng cụm từ thành toán. Rồi giải: **26**.',
    notes: [
      {
        tone: 'write',
        text: '**I think of a number:** call it $n$.\n$n − 5 = 21$, so $n = 21 + 5 = 26$',
        textVn: '**I think of a number** (nghĩ ra một số): gọi số đó là $n$.\n$n − 5 = 21$, nên $n = 21 + 5 = 26$',
      },
    ],
  },

  // 14 ─ Write it, then solve it (ALGEBRA) ──────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Write It, Then Solve It',
    titleVn: 'Viết ra, rồi giải',
    content:
      'I think of a number and…\n\n' +
      '**a** add 13. The answer is 30.\n' +
      '**b** subtract 8. The answer is 15.\n' +
      '**c** multiply it by 6. The answer is 54.\n' +
      '**d** divide it by 4. The answer is 5.\n\n' +
      'Equation first, then the number. Type **d** below.',
    contentVn:
      'Thầy nghĩ ra một số rồi…\n\n' +
      '**a** cộng 13. Kết quả là 30.\n' +
      '**b** trừ đi 8. Kết quả là 15.\n' +
      '**c** nhân nó với 6. Kết quả là 54.\n' +
      '**d** chia nó cho 4. Kết quả là 5.\n\n' +
      'Viết phương trình trước, rồi tìm số. Nhập câu **d** ở bên dưới.',
    reveal: {
      label: 'Check a, b and c',
      labelVn: 'Kiểm tra a, b và c',
      answer: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$',
      answerVn: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$',
    },
    activity: {
      id: 'act_think_d',
      type: 'algebra',
      mode: 'solve',
      eq: 'n/4 = 5',
      prompt: '**d** I think of a number and divide it by 4. The answer is 5. What is the number?',
      promptVn: '**d** Thầy nghĩ ra một số rồi chia nó cho 4. Kết quả là 5. Số đó là bao nhiêu?',
      explain: 'The equation is $\\frac{n}{4} = 5$. Undo $÷ 4$ with $× 4$: $n = 20$. Check: $20 ÷ 4 = 5$ ✓.',
      explainVn: 'Phương trình là $\\frac{n}{4} = 5$. Làm ngược $÷ 4$ bằng $× 4$: $n = 20$. Thử lại: $20 ÷ 4 = 5$ ✓.',
    },
  },

  // 15 ─ Getting dressed (ORDER) ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it in English',
    eyebrowVn: 'Nói bằng tiếng Anh',
    title: 'Getting Dressed',
    titleVn: 'Mặc đồ',
    label: 'Order it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: 'Mr Bowen puts on his **socks**. Then he puts on his **shoes**.',
    textVn: 'Thầy Bowen mang **tất**. Rồi thầy mang **giày**.',
    sub: 'How does he take them off? Say it in a sentence, out loud.',
    subVn: 'Thầy cởi chúng ra thế nào? Hãy nói thành một câu (bằng tiếng Anh), thật to.',
    activity: {
      id: 'act_socks',
      type: 'order',
      prompt: 'Put Mr Bowen’s day in order: morning first, evening last.',
      promptVn: 'Sắp xếp một ngày của thầy Bowen: buổi sáng trước, buổi tối sau cùng.',
      steps: [
        { id: 'socks_on', name: 'He puts on his socks.', nameVn: 'Thầy mang tất vào.' },
        { id: 'shoes_on', name: 'He puts on his shoes.', nameVn: 'Thầy mang giày vào.' },
        { id: 'shoes_off', name: 'He takes off his shoes.', nameVn: 'Thầy cởi giày ra.' },
        { id: 'socks_off', name: 'He takes off his socks.', nameVn: 'Thầy cởi tất ra.' },
      ],
      explain: '**Last on, first off.** The shoes went on last, so they come off first. Undoing always runs in the reverse order — and so does solving a two-step equation.',
      explainVn: '**Mang sau, cởi trước.** Giày được mang sau cùng, nên cởi ra trước tiên. Làm ngược lại luôn theo thứ tự ngược — giải phương trình hai bước cũng vậy.',
    },
  },

  // 16 ─ Last on, first off ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'Undo in reverse order',
    eyebrowVn: 'Làm ngược theo thứ tự ngược',
    title: 'Last On, First Off',
    titleVn: 'Mang sau, cởi trước',
    inlineSvg: DIAGRAMS.SOCKS_REAL,
    caption: 'An equation with two steps works the same way.',
    captionVn: 'Phương trình có hai bước cũng như vậy. (put on = mang vào, take off = cởi ra)',
  },

  // 17 ─ The second vote: 2a + 4 = 18 (PREDICT) ─────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowVn: 'Quyết định trước khi đi tiếp',
    title: 'Two Students Disagree',
    titleVn: 'Hai bạn không đồng ý',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Solve $2a + 4 = 18$',
    textVn: 'Giải $2a + 4 = 18$',
    sub: 'One student says **a = 5**. Another says **a = 7**.',
    subVn: 'Một bạn nói **a = 5**. Một bạn khác nói **a = 7**.',
    activity: {
      id: 'act_vote_a',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptVn: 'Đáp án nào đúng?',
      options: [
        { val: 'five', name: '$a = 5$ — halve 18 first, then take away 4', nameVn: '$a = 5$ — chia đôi 18 trước, rồi trừ 4' },
        { val: 'seven', name: '$a = 7$ — take away 4 first, then halve', nameVn: '$a = 7$ — trừ 4 trước, rồi chia đôi' },
      ],
      correct: 'seven',
      explain: '$a = 7$. Check: $2 × 7 + 4 = 18$ ✓. Halving first gives $a = 5$, and $2 × 5 + 4 = 14$, not 18. The next slide shows why the $+ 4$ comes off first.',
      explainVn: '$a = 7$. Thử lại: $2 × 7 + 4 = 18$ ✓. Chia đôi trước thì ra $a = 5$, mà $2 × 5 + 4 = 14$, không phải 18. Slide sau cho thấy vì sao phải bỏ $+ 4$ trước.',
    },
  },

  // 18 ─ The stepper: two steps ─────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Say each box before you press',
    eyebrowVn: 'Nói từng ô trước khi bấm',
    title: 'Two Steps',
    titleVn: 'Hai bước',
    widget: ReverseTwo,
    caption: '**a = 7** is right. The **+ 4** happened last, so undo it first.',
    captionVn: '**a = 7** mới đúng. Phép **+ 4** làm sau cùng, nên làm ngược nó trước.',
  },

  // 19 ─ Undo the last step first (CHECK 6) ─────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    side: 'left',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    title: 'Undo the Last Step First',
    titleVn: 'Làm ngược bước cuối trước',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_STEP,
    content: 'Socks and shoes again. **× 2** went on first. **+ 4** went on last, so it comes off first.',
    contentVn: 'Lại là tất và giày. **× 2** làm trước. **+ 4** làm sau cùng, nên bỏ nó ra trước.',
    notes: [
      {
        tone: 'write',
        text: 'Two steps: undo the **last** step **first**.\n$2a + 4 = 18$\n$18 − 4 = 14$, then $14 ÷ 2 = 7$',
        textVn: 'Hai bước: làm ngược bước **cuối** **trước tiên**.\n$2a + 4 = 18$\n$18 − 4 = 14$, rồi $14 ÷ 2 = 7$',
      },
    ],
    check: {
      id: 'chk_first_step',
      q: 'To solve $3m − 4 = 17$, what do you do **first**?',
      qVn: 'Để giải $3m − 4 = 17$, em làm gì **trước tiên**?',
      options: [
        { val: 'A', text: '$÷ 3$', textVn: '$÷ 3$' },
        { val: 'B', text: '$− 4$', textVn: '$− 4$' },
        { val: 'C', text: '$+ 4$', textVn: '$+ 4$' },
        { val: 'D', text: '$× 3$', textVn: '$× 3$' },
      ],
      correct: 'C',
      expEn: 'The $− 4$ happened last, so undo it first with $+ 4$: $17 + 4 = 21$, then $21 ÷ 3 = 7$. $÷ 3$ first undoes the steps in the wrong order. $− 4$ does the operation again instead of undoing it. $× 3$ does not undo anything here.',
      expVn: 'Phép $− 4$ làm sau cùng, nên làm ngược nó trước bằng $+ 4$: $17 + 4 = 21$, rồi $21 ÷ 3 = 7$. $÷ 3$ trước là làm ngược sai thứ tự. $− 4$ là làm lại chính phép đó thay vì làm ngược. $× 3$ không làm ngược phép nào ở đây.',
    },
  },

  // 20 ─ Two-step equations (FLOW) ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Two-Step Equations',
    titleVn: 'Phương trình hai bước',
    content:
      '**a** $3a + 5 = 26$\n' +
      '**b** $4b − 3 = 29$\n' +
      '**c** $30 = 6c + 12$\n' +
      '**d** $20 = 5d − 10$\n\n' +
      'Reverse the flow chart for **b** below. Undo the last step first.',
    contentVn:
      '**a** $3a + 5 = 26$\n' +
      '**b** $4b − 3 = 29$\n' +
      '**c** $30 = 6c + 12$\n' +
      '**d** $20 = 5d − 10$\n\n' +
      'Đi ngược sơ đồ của câu **b** ở bên dưới. Làm ngược bước cuối trước.',
    reveal: {
      label: 'Check a, c and d',
      labelVn: 'Kiểm tra a, c và d',
      answer: '**a** $26 − 5 = 21$, $21 ÷ 3 = 7$\n**c** $30 − 12 = 18$, $18 ÷ 6 = 3$\n**d** $20 + 10 = 30$, $30 ÷ 5 = 6$',
      answerVn: '**a** $26 − 5 = 21$, $21 ÷ 3 = 7$\n**c** $30 − 12 = 18$, $18 ÷ 6 = 3$\n**d** $20 + 10 = 30$, $30 ÷ 5 = 6$',
    },
    activity: {
      id: 'act_flow_4b',
      type: 'flow',
      eq: '4b − 3 = 29',
      prompt: 'Reverse the flow chart for **b** $4b − 3 = 29$.',
      promptVn: 'Đi ngược sơ đồ của câu **b** $4b − 3 = 29$.',
      explain: 'Forward: $× 4$, then $− 3$. Backwards, last step first: $29 + 3 = 32$, then $32 ÷ 4 = 8$. Check: $4 × 8 − 3 = 29$ ✓.',
      explainVn: 'Đi xuôi: $× 4$, rồi $− 3$. Đi ngược, bước cuối trước: $29 + 3 = 32$, rồi $32 ÷ 4 = 8$. Thử lại: $4 × 8 − 3 = 29$ ✓.',
    },
  },

  // 21 ─ Mr Bowen's homework (SORT) ─────────────────────────────────────────
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
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nPut each answer back in. **Every one fails the check.**',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nThay từng đáp án vào lại. **Câu nào thử lại cũng sai.**',
    activity: {
      id: 'act_homework',
      type: 'sort',
      prompt: 'What went wrong in each line?',
      promptVn: 'Mỗi dòng đã sai ở đâu?',
      bins: [
        { id: 'did', name: 'Did the operation, not its inverse', nameVn: 'Làm luôn phép toán, không làm phép ngược' },
        { id: 'kind', name: 'Used the wrong kind of inverse', nameVn: 'Dùng sai loại phép ngược' },
        { id: 'order', name: 'Undid the steps in the wrong order', nameVn: 'Làm ngược các bước sai thứ tự' },
      ],
      cards: [
        { id: 'h1', name: '**a** $x + 6 = 14$, so $x = 20$', nameVn: '**a** $x + 6 = 14$, nên $x = 20$', bin: 'did' },
        { id: 'h2', name: '**b** $5x = 45$, so $x = 40$', nameVn: '**b** $5x = 45$, nên $x = 40$', bin: 'kind' },
        { id: 'h3', name: '**c** $18 = x − 7$, so $x = 11$', nameVn: '**c** $18 = x − 7$, nên $x = 11$', bin: 'did' },
        { id: 'h4', name: '**d** $2x + 6 = 20$, so $x = 4$', nameVn: '**d** $2x + 6 = 20$, nên $x = 4$', bin: 'order' },
      ],
      explain: '**a** He added 6: $x = 8$. **b** $× 5$ is undone by $÷ 5$, not $− 5$: $x = 9$. **c** He subtracted 7: $x = 25$. **d** He halved first; take away 6 first: $x = 7$.',
      explainVn: '**a** Thầy đã cộng 6: $x = 8$. **b** $× 5$ phải làm ngược bằng $÷ 5$, không phải $− 5$: $x = 9$. **c** Thầy đã trừ 7: $x = 25$. **d** Thầy chia đôi trước; phải trừ 6 trước: $x = 7$.',
    },
  },

  // 22 ─ Angles (CHECK 7) ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Triangle',
    side: 'left',
    eyebrow: 'Challenge · uses 2.3',
    eyebrowVn: 'Thử thách · dùng bài 2.3',
    title: 'Angles',
    titleVn: 'Góc',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANGLES,
    content: 'The two angles make a **right angle**.\n\n**a** Write an equation. **b** Solve it. **c** How big is each angle?',
    contentVn: 'Hai góc tạo thành một **góc vuông**.\n\n**a** Viết một phương trình. **b** Giải nó. **c** Mỗi góc bằng bao nhiêu độ?',
    check: {
      id: 'chk_angles',
      q: 'How big is the $5x$ angle?',
      qVn: 'Góc $5x$ bằng bao nhiêu độ?',
      options: [
        { val: 'A', text: '$10°$', textVn: '$10°$' },
        { val: 'B', text: '$45°$', textVn: '$45°$' },
        { val: 'C', text: '$40°$', textVn: '$40°$' },
        { val: 'D', text: '$50°$', textVn: '$50°$' },
      ],
      correct: 'D',
      expEn: '$4x + 5x = 90$, so $9x = 90$ and $x = 10$. The $5x$ angle is $5 × 10 = 50°$, and $4x = 40°$: $40 + 50 = 90$ ✓. 10 is $x$, not an angle. 45 halves the right angle, but the angles are not equal. 40 is the $4x$ angle.',
      expVn: '$4x + 5x = 90$, nên $9x = 90$ và $x = 10$. Góc $5x$ bằng $5 × 10 = 50°$, và $4x = 40°$: $40 + 50 = 90$ ✓. 10 là $x$, không phải góc. 45 là chia đôi góc vuông, nhưng hai góc không bằng nhau. 40 là góc $4x$.',
    },
  },

  // 23 ─ Mr Bowen's notebooks (CHECK 8) ─────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    title: 'Mr Bowen’s Notebooks',
    titleVn: 'Những cuốn vở của thầy Bowen',
    content:
      'Mr Bowen buys 4 notebooks and one pen. The pen costs 7 thousand dong.\n\n' +
      'He pays 43 thousand dong. How much is one notebook?',
    contentVn:
      'Thầy Bowen mua 4 cuốn vở và một cây bút. Cây bút giá 7 nghìn đồng.\n\n' +
      'Thầy trả 43 nghìn đồng. Một cuốn vở giá bao nhiêu?',
    check: {
      id: 'chk_notebooks',
      q: 'Let $n$ be the cost of one notebook, in thousand dong. Which equation fits?',
      qVn: 'Gọi $n$ là giá một cuốn vở, tính bằng nghìn đồng. Phương trình nào phù hợp?',
      options: [
        { val: 'A', text: '$4n + 7 = 43$', textVn: '$4n + 7 = 43$' },
        { val: 'B', text: '$4(n + 7) = 43$', textVn: '$4(n + 7) = 43$' },
        { val: 'C', text: '$4n − 7 = 43$', textVn: '$4n − 7 = 43$' },
        { val: 'D', text: '$4n = 43$', textVn: '$4n = 43$' },
      ],
      correct: 'A',
      expEn: 'Four notebooks cost $4n$, and the pen adds 7: $4n + 7 = 43$. So $4n = 36$ and $n = 9$: **9 thousand dong**. B adds the 7 before multiplying — a pen with every notebook. C writes the inverse. D leaves the pen out.',
      expVn: 'Bốn cuốn vở giá $4n$, cộng thêm cây bút 7: $4n + 7 = 43$. Vậy $4n = 36$ và $n = 9$: **9 nghìn đồng**. B cộng 7 trước khi nhân — như mỗi cuốn vở kèm một cây bút. C viết phép ngược. D bỏ quên cây bút.',
    },
  },

  // 24 ─ Mr Bowen's age ─────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    title: 'Mr Bowen’s Age',
    titleVn: 'Tuổi của thầy Bowen',
    content:
      'Mr Bowen thinks of his age.\n\n' +
      'He doubles it, then subtracts 7. The answer is 1.\n\n' +
      'How old is Mr Bowen?',
    contentVn:
      'Thầy Bowen nghĩ đến tuổi của mình.\n\n' +
      'Thầy gấp đôi nó, rồi trừ đi 7. Kết quả là 1.\n\n' +
      'Thầy Bowen bao nhiêu tuổi?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: '$2a − 7 = 1$\n\n$2a = 8$, so $a = 4$. Mr Bowen is **4 years old**.',
      answerVn: '$2a − 7 = 1$\n\n$2a = 8$, nên $a = 4$. Thầy Bowen **4 tuổi**.',
    },
  },

  // 25 ─ Mr Bowen's plant (CHECK 9) ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Sprout',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    title: 'Mr Bowen’s Plant',
    titleVn: 'Cái cây của thầy Bowen',
    content:
      'Mr Bowen buys a plant. It grows 5 cm every week.\n\n' +
      'After 6 weeks, it is 26 cm tall.',
    contentVn:
      'Thầy Bowen mua một cái cây. Mỗi tuần nó cao thêm 5 cm.\n\n' +
      'Sau 6 tuần, nó cao 26 cm.',
    check: {
      id: 'chk_plant',
      q: 'How tall was the plant when Mr Bowen bought it?',
      qVn: 'Lúc thầy Bowen mua, cái cây cao bao nhiêu?',
      options: [
        { val: 'A', text: '$56$ cm', textVn: '$56$ cm' },
        { val: 'B', text: '$−4$ cm', textVn: '$−4$ cm' },
        { val: 'C', text: '$4$ cm', textVn: '$4$ cm' },
        { val: 'D', text: '$21$ cm', textVn: '$21$ cm' },
      ],
      correct: 'B',
      expEn: 'Six weeks of 5 cm is 30 cm: $h + 30 = 26$, so $h = 26 − 30 = −4$. The plant was **−4 cm** tall. 56 added the 30 instead of undoing it. 4 worked out $30 − 26$, the wrong way round. 21 counted only one week.',
      expVn: 'Sáu tuần, mỗi tuần 5 cm là 30 cm: $h + 30 = 26$, nên $h = 26 − 30 = −4$. Cái cây cao **−4 cm**. 56 là cộng thêm 30 thay vì làm ngược. 4 là tính $30 − 26$, ngược chiều. 21 là chỉ tính một tuần.',
    },
  },

  // 26 ─ Checklist + the exit question (CHECK 10) ───────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    eyebrowVn: 'Trước khi làm các nhiệm vụ',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: '> Say each one out loud. If one feels shaky, go back to its slide before the practice.',
    contentVn: '> Nói to từng điều. Nếu điều nào chưa chắc, hãy quay lại slide đó trước khi luyện tập.',
    items: [
      { text: 'Say what an **equation** is and what **solve** means.', textVn: 'Nói được **phương trình** là gì và **giải** nghĩa là gì.' },
      { text: '**Check** an answer by putting it back in.', textVn: '**Thử lại** đáp án bằng cách thay nó vào lại.' },
      { text: 'Undo a step with its **inverse operation**.', textVn: 'Làm ngược một bước bằng **phép toán ngược**.' },
      { text: '**Reverse** a flow chart to solve.', textVn: '**Đi ngược** sơ đồ để giải.' },
      { text: 'Turn "I think of a number" into an equation.', textVn: 'Biến "I think of a number" thành phương trình.' },
      { text: 'Undo the **last** step **first**.', textVn: 'Làm ngược bước **cuối** **trước tiên**.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: solve $6x − 4 = 32$.',
      qVn: 'Câu hỏi cuối bài: giải $6x − 4 = 32$.',
      options: [
        { val: 'A', text: '$x = 36$', textVn: '$x = 36$' },
        { val: 'B', text: '$x = 168$', textVn: '$x = 168$' },
        { val: 'C', text: '$x = 6$', textVn: '$x = 6$' },
        { val: 'D', text: '$x = \\frac{14}{3}$', textVn: '$x = \\frac{14}{3}$' },
      ],
      correct: 'C',
      expEn: 'Undo the last step first: $32 + 4 = 36$, then $36 ÷ 6 = 6$. Check: $6 × 6 − 4 = 32$ ✓. 36 stopped before undoing the $× 6$. 168 did the operations instead of undoing them ($28 × 6$). $\\frac{14}{3}$ took the 4 away again ($28 ÷ 6$).',
      expVn: 'Làm ngược bước cuối trước: $32 + 4 = 36$, rồi $36 ÷ 6 = 6$. Thử lại: $6 × 6 − 4 = 32$ ✓. 36 là dừng lại trước khi làm ngược $× 6$. 168 là làm các phép toán thay vì làm ngược ($28 × 6$). $\\frac{14}{3}$ là lại trừ 4 lần nữa ($28 ÷ 6$).',
    },
  },
];
