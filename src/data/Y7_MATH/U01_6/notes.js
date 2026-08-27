// src/data/Y7_MATH/U01_6/notes.js
// 1.6 Square Roots and Cube Roots — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons). 14 layout slides, 5 embedded checks.
//
// The idea is "there and back", taught twice: squaring goes out, square rooting
// comes back; cubing goes out, cube rooting comes back. Reduced from 23
// classroom slides: the two number lists fold into their key-word slides as
// copy-down notes, and three word problems (One Number Two Names, The Bathroom
// Wall) move to the workbook. The `check:` block is always the LAST key.
import { DIAGRAMS } from './diagrams.js';
import { WorkedExampleWidget } from './widgets.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Grid3x3',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 1 · 1.6',
    eyebrowVn: 'Chương 1 · 1.6',
    title: 'Square Roots and Cube Roots',
    titleVn: 'Căn bậc hai và căn bậc ba',
    card: {
      icon: 'Pencil',
      badge: 'Starter · Do this first',
      badgeVn: 'Khởi động · Làm trước',
      text: 'No calculator. Work out $7 × 7$, then $2 × 2 × 2$. Write both answers, then press Next.',
      textVn: 'Không dùng máy tính. Tính $7 × 7$, rồi $2 × 2 × 2$. Viết cả hai đáp án, rồi bấm Tiếp.',
    },
  },

  // 2 ─ The hook: the patio, posed backwards ────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'MessageSquare',
    eyebrow: 'Two minutes, pen and paper',
    eyebrowVn: 'Hai phút, giấy và bút',
    title: 'Mr Bowen’s Patio',
    titleVn: 'Sân gạch của thầy Bowen',
    text: '**225 stones**',
    textVn: '**225 viên gạch**',
    sub: 'They are laid in a **perfect square**. How many stones run along one side? Write one number — guessing is fine.',
    subVn: 'Chúng được lát thành một **hình vuông hoàn hảo**. Mỗi cạnh có bao nhiêu viên gạch? Viết một con số — đoán cũng được.',
  },

  // 3 ─ Key word: Square Number (+ the list) + CHECK 1 ──────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    title: 'Square Number',
    titleVn: 'Số chính phương',
    ratio: 45,
    inlineSvg: DIAGRAMS.SQUARE_TILES,
    content:
      'The word comes from the picture. Multiply a number by itself and the tiles make a **square** — an 8×8 chessboard is $8 × 8 = 64$ squares.\n\n' +
      'We write $5^2 = 5 × 5 = 25$, and say it **five squared**. The small 2 says **how many fives to multiply**, not what to multiply by.',
    contentVn:
      'Tên gọi đến từ hình vẽ. Nhân một số với chính nó, các viên gạch xếp thành một **hình vuông** — bàn cờ 8×8 là $8 × 8 = 64$ ô.\n\n' +
      'Ta viết $5^2 = 5 × 5 = 25$, đọc là **five squared** (5 bình phương). Số 2 nhỏ cho biết **có bao nhiêu số 5 được nhân**, chứ không phải nhân với 2.',
    notes: [
      {
        tone: 'write',
        text: '**Square number:** a number multiplied by itself. Learn the first twelve: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.',
        textVn: '**Số chính phương (square number):** một số nhân với chính nó. Học mười hai số đầu: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.',
      },
    ],
    check: {
      id: 'c1',
      q: 'Which of these equals $5^2$ (five squared)?',
      qVn: 'Cái nào bằng $5^2$ (năm bình phương)?',
      options: [
        { val: 'A', text: '$10$', textVn: '$10$' },
        { val: 'B', text: '$25$', textVn: '$25$' },
        { val: 'C', text: '$7$', textVn: '$7$' },
      ],
      correct: 'B',
      expEn: '$5^2 = 5 × 5 = 25$. The small 2 means multiply two 5s together, not multiply 5 by 2 (which would be $10$). Adding would give $7$.',
      expVn: '$5^2 = 5 × 5 = 25$. Số 2 nhỏ nghĩa là nhân hai số 5, không phải nhân 5 với 2 (sẽ ra $10$). Cộng thì ra $7$.',
    },
  },

  // 4 ─ Key word: Square Root (going backwards) + CHECK 2 ───────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'RotateCcw',
    side: 'left',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    title: 'Square Root',
    titleVn: 'Căn bậc hai',
    ratio: 45,
    inlineSvg: DIAGRAMS.ROOT_BOTH_WAYS,
    content:
      'Squaring was easy. Now turn it around: **? × ? = 225**. That question needs a name.\n\n' +
      'A **root** is where something came from. The **square root** of a number is the number it was squared from: $\\sqrt{225} = 15$, because $15 × 15 = 225$.',
    contentVn:
      'Bình phương thì dễ. Giờ lật ngược lại: **? × ? = 225**. Câu hỏi đó cần một cái tên.\n\n' +
      '**Root** nghĩa là nơi một thứ bắt đầu. **Căn bậc hai** của một số là số đã được bình phương ra nó: $\\sqrt{225} = 15$, vì $15 × 15 = 225$.',
    notes: [
      {
        tone: 'write',
        text: '**Square root:** the number that was multiplied by itself. $\\sqrt{144} = 12$, because $12 × 12 = 144$.',
        textVn: '**Căn bậc hai (square root):** số đã được nhân với chính nó. $\\sqrt{144} = 12$, vì $12 × 12 = 144$.',
      },
    ],
    check: {
      id: 'c2',
      q: 'What is $\\sqrt{144}$?',
      qVn: '$\\sqrt{144}$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$12$', textVn: '$12$' },
        { val: 'B', text: '$72$', textVn: '$72$' },
        { val: 'C', text: '$14$', textVn: '$14$' },
      ],
      correct: 'A',
      expEn: '$\\sqrt{144}$ asks which number times itself is 144. It is $12$, because $12 × 12 = 144$. Answering $72$ halves 144 instead of finding the root.',
      expVn: '$\\sqrt{144}$ hỏi số nào nhân với chính nó bằng 144. Đó là $12$, vì $12 × 12 = 144$. Trả lời $72$ là chia đôi 144 thay vì tìm căn.',
    },
  },

  // 5 ─ The hook paid off ───────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Back to the patio',
    eyebrowVn: 'Quay lại sân gạch',
    title: 'Fifteen Along Each Side',
    titleVn: 'Mỗi cạnh mười lăm viên',
    inlineSvg: DIAGRAMS.PATIO_225,
    caption: '$\\sqrt{225} = 15$, so 15 stones run along each side. Two minutes ago this was guesswork; now it is a question you can answer. How close was your guess?',
    captionVn: '$\\sqrt{225} = 15$, nên mỗi cạnh có 15 viên gạch. Hai phút trước còn là đoán mò; bây giờ là câu hỏi em trả lời được. Em đoán gần đến đâu?',
  },

  // 6 ─ Key word: Cube Number (+ the list) ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    title: 'Cube Number',
    titleVn: 'Số lập phương',
    ratio: 45,
    inlineSvg: DIAGRAMS.CUBE_STACKS,
    content:
      'Same idea, one dimension up. A box packed **4 along, 4 across, 4 high** holds $4 × 4 × 4 = 64$ cubes. Three of the same number, multiplied together, build a cube.\n\n' +
      'We write $2^3 = 2 × 2 × 2 = 8$, and say it **two cubed**.',
    contentVn:
      'Cùng ý tưởng, thêm một chiều. Một hộp xếp **4 dài, 4 rộng, 4 cao** chứa $4 × 4 × 4 = 64$ viên. Ba số giống nhau nhân với nhau dựng thành một khối lập phương.\n\n' +
      'Ta viết $2^3 = 2 × 2 × 2 = 8$, đọc là **two cubed** (2 lập phương).',
    notes: [
      {
        tone: 'write',
        text: '**Cube number:** a number multiplied by itself twice. The list is short — learn **1, 8, 27, 64, 125, 216**, and 1000.',
        textVn: '**Số lập phương (cube number):** một số nhân với chính nó hai lần. Bảng ngắn — học **1, 8, 27, 64, 125, 216**, và 1000.',
      },
    ],
  },

  // 7 ─ Key word: Cube Root + CHECK 3 ───────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'RotateCcw',
    side: 'left',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    title: 'Cube Root',
    titleVn: 'Căn bậc ba',
    ratio: 45,
    inlineSvg: DIAGRAMS.CUBE_ROOT_BOTH_WAYS,
    content: 'This is not a new idea. It is the square root picture, with a small **3** on the sign. The **cube root** undoes cubing: $\\sqrt[3]{125} = 5$, because $5 × 5 × 5 = 125$.',
    contentVn: 'Đây không phải ý tưởng mới. Vẫn là hình căn bậc hai, chỉ thêm số **3** nhỏ trên dấu căn. **Căn bậc ba** làm ngược lại phép lập phương: $\\sqrt[3]{125} = 5$, vì $5 × 5 × 5 = 125$.',
    notes: [
      {
        tone: 'write',
        text: '**Cube root:** the number that was multiplied by itself twice. $\\sqrt[3]{64} = 4$, because $4 × 4 × 4 = 64$.',
        textVn: '**Căn bậc ba (cube root):** số đã được nhân với chính nó hai lần. $\\sqrt[3]{64} = 4$, vì $4 × 4 × 4 = 64$.',
      },
    ],
    check: {
      id: 'c3',
      q: 'The cube root of 64 is 4. What is the **square** root of 64, $\\sqrt{64}$?',
      qVn: 'Căn bậc ba của 64 là 4. Vậy **căn bậc hai** của 64, $\\sqrt{64}$, là bao nhiêu?',
      options: [
        { val: 'A', text: '$4$', textVn: '$4$' },
        { val: 'B', text: '$8$', textVn: '$8$' },
        { val: 'C', text: '$32$', textVn: '$32$' },
      ],
      correct: 'B',
      expEn: '$\\sqrt{64} = 8$, because $8 × 8 = 64$ (two eights). The **cube** root is 4, because $4 × 4 × 4 = 64$ (three fours). 64 is on both lists — square and cube.',
      expVn: '$\\sqrt{64} = 8$, vì $8 × 8 = 64$ (hai số 8). **Căn bậc ba** là 4, vì $4 × 4 × 4 = 64$ (ba số 4). 64 có trong cả hai bảng — chính phương và lập phương.',
    },
  },

  // 8 ─ Worked example (WorkedExampleWidget) ────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Calculator',
    side: 'left',
    eyebrow: 'A worked example, one line at a time',
    eyebrowVn: 'Ví dụ mẫu, từng dòng một',
    title: 'One Line at a Time',
    titleVn: 'Từng dòng một',
    ratio: 45,
    content: 'Work each line on paper **before** you reveal it. **Roots first, subtraction last** — the roots are like brackets, done before the rest.',
    contentVn: 'Hãy làm từng dòng ra giấy **trước khi** hiện đáp án. **Tính căn trước, phép trừ sau cùng** — căn giống như dấu ngoặc, làm trước phần còn lại.',
    widget: WorkedExampleWidget,
  },

  // 9 ─ English: consecutive + CHECK 5 ──────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: 'Consecutive',
    titleVn: 'Consecutive — Liên tiếp',
    ratio: 45,
    inlineSvg: DIAGRAMS.CONSECUTIVE,
    content: 'The exercise uses this word without explaining it. **Consecutive square numbers** are next to each other **in the list of squares** — not one apart as numbers.',
    contentVn: 'Bài tập dùng từ này mà không giải thích. **Consecutive square numbers** (các số chính phương liên tiếp) đứng cạnh nhau **trong bảng bình phương** — không phải hơn kém nhau 1 đơn vị.',
    notes: [
      {
        tone: 'write',
        text: '**Consecutive:** one after another, with nothing missed out. 25 and 36 are consecutive square numbers.',
        textVn: '**Liên tiếp (consecutive):** cái này nối tiếp cái kia, không bỏ sót. 25 và 36 là hai số chính phương liên tiếp.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Which pair are **consecutive square numbers**?',
      qVn: 'Cặp nào là **hai số chính phương liên tiếp**?',
      options: [
        { val: 'A', text: '$25$ and $26$', textVn: '$25$ và $26$' },
        { val: 'B', text: '$16$ and $36$', textVn: '$16$ và $36$' },
        { val: 'C', text: '$25$ and $36$', textVn: '$25$ và $36$' },
      ],
      correct: 'C',
      expEn: '$25 = 5^2$ and $36 = 6^2$ are next to each other in the list of squares, so they are consecutive square numbers. $25$ and $26$ are consecutive whole numbers; $16$ and $36$ skip 25.',
      expVn: '$25 = 5^2$ và $36 = 6^2$ đứng cạnh nhau trong bảng bình phương, nên là hai số chính phương liên tiếp. $25$ và $26$ là hai số nguyên liên tiếp; $16$ và $36$ bỏ qua 25.',
    },
  },

  // 10 ─ Trap the root + CHECK 4 ────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    side: 'left',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    title: 'Trap the Root',
    titleVn: 'Kẹp căn lại',
    ratio: 45,
    inlineSvg: DIAGRAMS.BETWEEN_SQUARES,
    content: '45 is not in your list of squares, so $\\sqrt{45}$ is not a whole number. Which **two whole numbers** is it between?',
    contentVn: '45 không nằm trong bảng số chính phương, nên $\\sqrt{45}$ không phải số nguyên. Nó nằm giữa **hai số nguyên** nào?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: 'Between **6 and 7**. 45 sits between $36 = 6^2$ and $49 = 7^2$, so its root sits between 6 and 7.',
      answerVn: 'Nằm giữa **6 và 7**. Vì 45 nằm giữa $36 = 6^2$ và $49 = 7^2$, nên căn của nó nằm giữa 6 và 7.',
    },
    check: {
      id: 'c4',
      q: 'Between which two whole numbers does $\\sqrt{45}$ lie?',
      qVn: '$\\sqrt{45}$ nằm giữa hai số nguyên nào?',
      options: [
        { val: 'A', text: '$6$ and $7$', textVn: '$6$ và $7$' },
        { val: 'B', text: '$22$ and $23$', textVn: '$22$ và $23$' },
        { val: 'C', text: '$4$ and $5$', textVn: '$4$ và $5$' },
      ],
      correct: 'A',
      expEn: '45 is between the square numbers $36 = 6^2$ and $49 = 7^2$, so $\\sqrt{45}$ is between 6 and 7. Answering 22 and 23 halves 45 instead of using the square list.',
      expVn: '45 nằm giữa hai số chính phương $36 = 6^2$ và $49 = 7^2$, nên $\\sqrt{45}$ nằm giữa 6 và 7. Trả lời 22 và 23 là chia đôi 45 thay vì dùng bảng bình phương.',
    },
  },

  // 11 ─ Problem: Mr Bowen's number ─────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    ratio: 55,
    content:
      'Mr Bowen is thinking of a number.\n\n' +
      '> It is between **100 and 200**.\n' +
      '> Its **square root** is a multiple of **3**.\n\n' +
      'What is his number?',
    contentVn:
      'Thầy Bowen đang nghĩ đến một con số.\n\n' +
      '> Nó nằm giữa **100 và 200**.\n' +
      '> **Căn bậc hai** của nó là bội số của **3**.\n\n' +
      'Con số đó là bao nhiêu?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: '**144.** Between 100 and 200 the only squares are 121 and 144. $\\sqrt{121} = 11$ and $\\sqrt{144} = 12$ — and 12 is the multiple of 3.',
      answerVn: '**144.** Giữa 100 và 200 chỉ có hai số chính phương là 121 và 144. $\\sqrt{121} = 11$ và $\\sqrt{144} = 12$ — và 12 mới là bội số của 3.',
    },
    check: {
      id: 'c6',
      q: 'Between 100 and 200, with a square root that is a multiple of 3 — which is Mr Bowen’s number?',
      qVn: 'Nằm giữa 100 và 200, có căn bậc hai là bội số của 3 — con số của thầy Bowen là số nào?',
      options: [
        { val: 'A', text: '$121$', textVn: '$121$' },
        { val: 'B', text: '$144$', textVn: '$144$' },
        { val: 'C', text: '$150$', textVn: '$150$' },
      ],
      correct: 'B',
      expEn: 'The only square numbers between 100 and 200 are $121 = 11^2$ and $144 = 12^2$. Only $\\sqrt{144} = 12$ is a multiple of 3, so the number is 144. 150 is not a square number at all.',
      expVn: 'Hai số chính phương duy nhất giữa 100 và 200 là $121 = 11^2$ và $144 = 12^2$. Chỉ $\\sqrt{144} = 12$ là bội số của 3, nên con số đó là 144. 150 không phải số chính phương.',
    },
  },

  // 12 ─ Problem: the cube watermelons ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Problem 3',
    eyebrowVn: 'Bài 3',
    title: 'The Cube Watermelons',
    titleVn: 'Những quả dưa hấu lập phương',
    ratio: 55,
    side: 'left',
    image: 'images/Y7_MATH/U01_6/cubemelon.jpg',
    content:
      'Mr Bowen grows **cube watermelons** — they stack better. A crate holds **3 along, 3 across and 3 high**.\n\n' +
      'How many watermelons fit in one crate?',
    contentVn:
      'Thầy Bowen trồng **dưa hấu hình lập phương** — xếp chồng dễ hơn. Một thùng chứa **3 quả dài, 3 quả rộng và 3 quả cao**.\n\n' +
      'Một thùng chứa được bao nhiêu quả dưa?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: '$3 × 3 × 3 = 27$ watermelons — that is $3^3$. They are real: Japanese farmers grow them inside glass boxes.',
      answerVn: '$3 × 3 × 3 = 27$ quả dưa — đó là $3^3$. Loại dưa này có thật: nông dân Nhật Bản trồng chúng trong hộp kính.',
    },
    check: {
      id: 'c7',
      q: 'A crate is 3 watermelons along, 3 across and 3 high. How many does it hold?',
      qVn: 'Một thùng xếp 3 quả dưa dài, 3 quả rộng và 3 quả cao. Nó chứa được bao nhiêu quả?',
      options: [
        { val: 'A', text: '$9$', textVn: '$9$' },
        { val: 'B', text: '$27$', textVn: '$27$' },
        { val: 'C', text: '$18$', textVn: '$18$' },
      ],
      correct: 'B',
      expEn: 'Three along, three across, three high is $3 × 3 × 3 = 27$ — that is $3^3$, a cube number. $9$ is only $3 × 3$ (one layer); $18$ adds the numbers instead of multiplying all three.',
      expVn: 'Ba dài, ba rộng, ba cao là $3 × 3 × 3 = 27$ — đó là $3^3$, một số lập phương. $9$ chỉ là $3 × 3$ (một lớp); $18$ là cộng thay vì nhân cả ba số.',
    },
  },

  // 13 ─ Countable recap ────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    title: 'Can You Do All Four?',
    titleVn: 'Em làm được cả bốn điều này chứ?',
    content: 'Your notebook should now have **5 key words** and **2 lists** — twelve square numbers and six cube numbers. Check none is missing.',
    contentVn: 'Trong vở của em bây giờ phải có **5 từ khoá** và **2 bảng số** — mười hai số chính phương và sáu số lập phương. Hãy kiểm tra không thiếu cái nào.',
    items: [
      { text: 'Say what a **square number** and a **cube number** are, and read $7^2$ and $2^3$ out loud.', textVn: 'Nói được **số chính phương** và **số lập phương** là gì, và đọc to $7^2$ và $2^3$.' },
      { text: 'Work out a **square root** and a **cube root** from your two lists.', textVn: 'Tính được **căn bậc hai** và **căn bậc ba** bằng hai bảng số.' },
      { text: 'Trap a root between **two whole numbers**, the way you did with $\\sqrt{45}$.', textVn: 'Kẹp một căn giữa **hai số nguyên**, như em đã làm với $\\sqrt{45}$.' },
      { text: 'Use the word **consecutive** correctly about numbers.', textVn: 'Dùng đúng từ **consecutive (liên tiếp)** khi nói về các con số.' },
    ],
  },

  // 14 ─ Closer + exit question ─────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    subtitle: 'One idea, learned twice: squaring goes out, rooting comes back. Exit question: **what is $\\sqrt{81} + \\sqrt[3]{8}$?**',
    subtitleVn: 'Một ý tưởng, học hai lần: bình phương đi ra, khai căn đi về. Câu hỏi ra về: **$\\sqrt{81} + \\sqrt[3]{8}$ bằng bao nhiêu?**',
  },
];
