// src/data/Y7_MATH/U01_1/notes.js
// 1.1 Adding & Subtracting Integers — a self-study reduction of the classroom
// deck (C:\Users\bowen\lessons). 15 layout slides, 5 embedded checks. This
// REBUILDS the old type-based U01_1 deck against the layout system and the
// check gate (ADAPTATION-PLAN §8, §2 for 1.1).
//
// Reduced from 22 classroom slides: the team game and homework are cut; the
// thermometer folds into the number-line slide; adding and subtracting a
// positive share one "moving along the line" slide; two word problems (The Bank
// Account, The Research Station) drop into the workbook. The four English slides
// are kept. The `check:` block is always the LAST key on a slide, because the
// audio generator narrates everything before it and stops there.
import { DIAGRAMS } from './diagrams.js';
import { NumberLineWidget, TranslateWidget } from './widgets.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const BLUE = '#1a5fa8';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Ruler',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 1 · 1.1',
    eyebrowVn: 'Chương 1 · 1.1',
    title: 'Adding & Subtracting Integers',
    titleVn: 'Cộng và Trừ Số nguyên',
    card: {
      icon: 'Pencil',
      badge: 'Starter · Do this first',
      badgeVn: 'Khởi động · Làm trước',
      text: 'Write down **three things** that can be described with a **negative number**, as a full English sentence. Then press Next.',
      textVn: 'Viết ra **ba thứ** có thể được mô tả bằng **số âm**, thành một câu tiếng Anh hoàn chỉnh. Rồi bấm Tiếp.',
    },
  },

  // 2 ─ The number line (thermometer folded in) + CHECK 1 ───────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    title: 'The Number Line',
    titleVn: 'Trục số',
    ratio: 45,
    inlineSvg: DIAGRAMS.NUMBER_LINE_BIG,
    drawThis: true,
    content:
      'Every integer has its own place on the line. Positive integers sit to the **right** of zero, negatives to the **left**, and zero in the middle.\n\n' +
      'A thermometer is the same line stood on its end. Careful: **−8 is lower than −4**, because it is further from zero on the cold side. Further left always means smaller.',
    contentVn:
      'Mỗi số nguyên có một vị trí riêng trên trục số. Số nguyên dương nằm bên **phải** số không, số âm bên **trái**, và số không ở giữa.\n\n' +
      'Nhiệt kế chính là trục số đó dựng đứng lên. Cẩn thận: **−8 thấp hơn −4**, vì nó xa số không hơn về phía lạnh. Càng sang trái thì càng nhỏ.',
    notes: [
      {
        tone: 'write',
        text: '**Integer:** a whole number that is positive, negative or zero — never a fraction.',
        textVn: '**Số nguyên:** một số nguyên vẹn, có thể dương, âm hoặc bằng không — không bao giờ là phân số.',
      },
    ],
    check: {
      id: 'c1',
      q: 'Point A is at $-8$ and point B is at $-4$. Which number is smaller (further to the left)?',
      qVn: 'Điểm A ở $-8$ và điểm B ở $-4$. Số nào nhỏ hơn (nằm xa hơn về bên trái)?',
      options: [
        { val: 'A', text: '$-8$', textVn: '$-8$' },
        { val: 'B', text: '$-4$', textVn: '$-4$' },
      ],
      correct: 'A',
      expEn: '$-8$ is further from zero on the negative side, so it is further left and smaller. On the number line the bigger digit after the minus sign is actually the smaller number.',
      expVn: '$-8$ xa số không hơn về phía âm, nên nó nằm xa hơn về bên trái và nhỏ hơn. Trên trục số, chữ số lớn hơn sau dấu trừ lại là số nhỏ hơn.',
    },
  },

  // 3 ─ English: "negative five" or "minus five"? ───────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Quote',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: '“Negative Five” or “Minus Five”?',
    titleVn: '“Negative five” hay “minus five”?',
    ratio: 45,
    inlineSvg: DIAGRAMS.SIGN_OR_OPERATION,
    content: 'The same little dash does **two different jobs**, and each job has its own English word. Knowing which one a question means is half of reading it correctly.',
    contentVn: 'Cùng một dấu gạch nhỏ làm **hai việc khác nhau**, và mỗi việc có một từ tiếng Anh riêng. Biết câu hỏi đang nói đến việc nào là một nửa của việc đọc đúng.',
    notes: [
      {
        tone: 'write',
        text: '**negative five** = the number $-5$ (the dash is a **sign**).\n**minus** = the operation, as in $8 - 5$ (the dash is an **instruction**).',
        textVn: '**negative five** = số $-5$ (dấu gạch là **dấu của số**).\n**minus** = phép tính, như trong $8 - 5$ (dấu gạch là **lệnh làm tính**).',
      },
      {
        tone: 'info',
        badge: 'Real life',
        badgeVn: 'Đời thực',
        text: 'Weather forecasts break this rule and say “minus five degrees”. In maths, say **negative five**.',
        textVn: 'Bản tin thời tiết phá luật này và nói “minus five degrees”. Trong toán, hãy nói **negative five**.',
      },
    ],
  },

  // 4 ─ Moving along the line (add + subtract a positive) + CHECK 2 ──────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    title: 'Moving Along the Line',
    titleVn: 'Di chuyển trên trục số',
    ratio: 45,
    inlineSvg: DIAGRAMS.ADD_NEG,
    content:
      'Every add and every subtract is a **move**. Start at the first number, then go:\n\n' +
      'Add a **positive** → right. Add a **negative** → left. Subtract a **positive** → left. You can finish below zero, and that is fine.',
    contentVn:
      'Mỗi phép cộng và mỗi phép trừ là một **bước di chuyển**. Bắt đầu ở số thứ nhất, rồi đi:\n\n' +
      'Cộng số **dương** → phải. Cộng số **âm** → trái. Trừ số **dương** → trái. Em có thể kết thúc dưới số không, điều đó hoàn toàn ổn.',
    notes: [
      {
        tone: 'write',
        text: 'Add a **positive** → move **right**.\nAdd a **negative** → move **left**.\nSubtract a **positive** → move **left**.',
        textVn: 'Cộng số **dương** → đi sang **phải**.\nCộng số **âm** → đi sang **trái**.\nTrừ số **dương** → đi sang **trái**.',
      },
    ],
    exampleLabel: 'Examples',
    exampleLabelVn: 'Ví dụ',
    example: '**1)** $-3 + (-4) = -7$\n\n**2)** $2 - 5 = -3$',
    exampleVn: '**1)** $-3 + (-4) = -7$\n\n**2)** $2 - 5 = -3$',
    check: {
      id: 'c2',
      q: 'What is $-3 + (-4)$?',
      qVn: '$-3 + (-4)$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$-7$', textVn: '$-7$' },
        { val: 'B', text: '$7$', textVn: '$7$' },
        { val: 'C', text: '$-1$', textVn: '$-1$' },
      ],
      correct: 'A',
      expEn: 'Adding a negative moves left: start at $-3$, go 4 more left to $-7$. Answering $7$ is the multiplying rule (“two negatives make a positive”), which does not apply to adding.',
      expVn: 'Cộng một số âm là đi sang trái: bắt đầu ở $-3$, đi thêm 4 sang trái đến $-7$. Trả lời $7$ là dùng quy tắc nhân (“hai số âm thành số dương”), không áp dụng cho phép cộng.',
    },
  },

  // 5 ─ Two signs together ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Equal',
    title: 'Two Signs Together',
    titleVn: 'Hai dấu đứng cạnh nhau',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_SIGNS,
    content: 'Sometimes two signs end up **next to each other**, like $5 + (-3)$. Combine them into one sign first, then move.',
    contentVn: 'Đôi khi hai dấu **đứng cạnh nhau**, như $5 + (-3)$. Hãy gộp chúng thành một dấu trước, rồi mới di chuyển.',
    notes: [
      {
        tone: 'write',
        text: '**Same** signs → **$+$** → move **right**.\n**Different** signs → **$-$** → move **left**.',
        textVn: 'Hai dấu **giống nhau** → **$+$** → đi sang **phải**.\nHai dấu **khác nhau** → **$-$** → đi sang **trái**.',
      },
      {
        tone: 'info',
        badge: 'Careful',
        badgeVn: 'Cẩn thận',
        icon: 'AlertTriangle',
        text: 'Only $-(-)$ turns into $+$. A single $+(-)$ still sends you left: $5 + (-3) = 2$, **not** $8$.',
        textVn: 'Chỉ có $-(-)$ mới đổi thành $+$. Một dấu $+(-)$ vẫn đưa em sang trái: $5 + (-3) = 2$, **không** phải $8$.',
      },
    ],
  },

  // 6 ─ Left or right? (NumberLineWidget) ───────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowRight',
    title: 'Left or Right?',
    titleVn: 'Trái hay Phải?',
    ratio: 45,
    content:
      'Every add and every subtract is just a **move** along the line. Change **one thing at a time** and watch which way the arrow goes.\n\n' +
      'Work out the rule from the jumps first, then press the orange button only to **check yourself**.',
    contentVn:
      'Mỗi phép cộng và mỗi phép trừ chỉ là một **bước di chuyển** trên trục số. Hãy thay đổi **từng thứ một** và xem mũi tên đi về phía nào.\n\n' +
      'Hãy tự tìm ra quy tắc từ các bước nhảy, rồi chỉ bấm nút màu cam để **tự kiểm tra**.',
    notes: [
      {
        tone: 'task',
        badge: 'Your job',
        badgeVn: 'Nhiệm vụ của em',
        text: 'Test **all four** rules: add a positive, add a negative, subtract a positive, subtract a negative.',
        textVn: 'Thử đủ **bốn** quy tắc: cộng số dương, cộng số âm, trừ số dương, trừ số âm.',
      },
    ],
    widget: NumberLineWidget,
  },

  // 7 ─ Minus a negative (the big rule) + CHECK 3 ───────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ShieldCheck',
    eyebrow: 'The big rule of the lesson',
    eyebrowVn: 'Quy tắc lớn của bài học',
    title: 'Minus a Negative',
    titleVn: 'Trừ một số âm',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.SUB_NEG,
    drawThis: true,
    content: 'To subtract a negative, add its **inverse** instead — take away a debt and you are richer. Two different signs meeting turn into a plus.',
    contentVn: 'Để trừ một số âm, hãy cộng **số đối** của nó — xoá một khoản nợ thì em giàu thêm. Hai dấu khác nhau gặp nhau thì đổi thành cộng.',
    notes: [
      {
        tone: 'write',
        text: '**Inverse:** the opposite of a number — the inverse of 5 is $-5$.\n**Minus a negative = plus:** $a - (-b) = a + b$.',
        textVn: '**Số đối:** số ngược lại của một số — số đối của 5 là $-5$.\n**Trừ số âm = cộng:** $a - (-b) = a + b$.',
      },
      {
        tone: 'theory',
        badge: 'Language note',
        badgeVn: 'Ghi chú ngôn ngữ',
        text: 'Writing the rule with **$a$ and $b$** instead of numbers is **algebra language**: a letter stands for any number at all.',
        textVn: 'Viết quy tắc bằng **$a$ và $b$** thay cho số chính là **ngôn ngữ đại số**: một chữ cái thay cho một số bất kỳ.',
      },
    ],
    check: {
      id: 'c3',
      q: 'What is $2 - (-5)$?',
      qVn: '$2 - (-5)$ bằng bao nhiêu?',
      options: [
        { val: 'A', text: '$-3$', textVn: '$-3$' },
        { val: 'B', text: '$7$', textVn: '$7$' },
        { val: 'C', text: '$-7$', textVn: '$-7$' },
      ],
      correct: 'B',
      expEn: 'Minus a negative becomes plus: $2 - (-5) = 2 + 5 = 7$. Answering $-3$ treats it as $2 - 5$, forgetting that the two minus signs combine into a plus.',
      expVn: 'Trừ số âm thành cộng: $2 - (-5) = 2 + 5 = 7$. Trả lời $-3$ là coi nó như $2 - 5$, quên rằng hai dấu trừ gộp lại thành dấu cộng.',
    },
  },

  // 8 ─ Which way does the word send you? (compare) + CHECK 4 ───────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'The words that do the work',
    eyebrowVn: 'Những từ làm nên phép tính',
    title: 'Which Way Does the Word Send You?',
    titleVn: 'Từ ngữ đưa em về phía nào?',
    columns: [
      {
        heading: 'These send you UP',
        headingVn: 'Những từ đưa em LÊN',
        accent: GREEN,
        icon: 'ArrowRight',
        content: '**rise · increase · gain · deposit · climb · warmer · higher · above · more than**',
        contentVn: '**rise** (tăng) · **increase** (tăng lên) · **gain** (được thêm) · **deposit** (gửi vào) · **climb** (leo lên) · **warmer** (ấm hơn) · **higher** (cao hơn) · **above** (trên) · **more than** (nhiều hơn)',
        notes: [
          {
            tone: 'write',
            text: 'The temperature **rises by** 6 → $+6$\nHe **deposits** 20 dollars → $+20$',
            textVn: 'Nhiệt độ **rises by** (tăng thêm) 6 → $+6$\nThầy ấy **deposits** (gửi vào) 20 đô → $+20$',
          },
        ],
      },
      {
        heading: 'These send you DOWN',
        headingVn: 'Những từ đưa em XUỐNG',
        accent: RED,
        icon: 'ArrowRight',
        content: '**fall · drop · decrease · loss · withdraw · owe · colder · lower · below · less than**',
        contentVn: '**fall** (giảm) · **drop** (rơi xuống) · **decrease** (giảm bớt) · **loss** (mất mát) · **withdraw** (rút ra) · **owe** (nợ) · **colder** (lạnh hơn) · **lower** (thấp hơn) · **below** (dưới) · **less than** (ít hơn)',
        notes: [
          {
            tone: 'write',
            text: 'The temperature **falls by** 9 → $-9$\nShe **owes** 12 dollars → $-12$',
            textVn: 'Nhiệt độ **falls by** (giảm đi) 9 → $-9$\nCô ấy **owes** (nợ) 12 đô → $-12$',
          },
        ],
      },
    ],
    check: {
      id: 'c4',
      q: 'Mr Bowen **withdraws** 12 dollars from his account. As a change to his money, this is:',
      qVn: 'Thầy Bowen **withdraws** (rút) 12 đô khỏi tài khoản. Xét như thay đổi số tiền, điều này là:',
      options: [
        { val: 'A', text: '$+12$', textVn: '$+12$' },
        { val: 'B', text: '$-12$', textVn: '$-12$' },
      ],
      correct: 'B',
      expEn: '“Withdraw” means take money out — the amount goes **down**, so the change is $-12$. It is the opposite of **deposit**, which would be $+12$.',
      expVn: '“Withdraw” nghĩa là rút tiền ra — số tiền **giảm**, nên thay đổi là $-12$. Nó ngược với **deposit** (gửi vào), khi đó sẽ là $+12$.',
    },
  },

  // 9 ─ English: read it very carefully (word order) ────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Quote',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: 'Read It Very Carefully',
    titleVn: 'Hãy đọc thật kỹ',
    text: 'Subtract 5 from 8.',
    textVn: 'Subtract 5 from 8.',
    sub: 'Write the calculation — not the answer. Which number do you write **first**? The word **from** tells you where you start.',
    subVn: 'Hãy viết phép tính — chưa cần đáp án. Em viết số nào **trước**? Từ **from** cho biết em bắt đầu ở đâu.',
    reveal: {
      label: 'Show me',
      labelVn: 'Cho em xem',
      answer:
        'It is $8 - 5 = 3$ — **not** $5 - 8$. In English the two numbers arrive in the **opposite order** to the calculation.\n\n' +
        'The same trap: **take 7 away from 3** → $3 - 7$.   **6 less than 2** → $2 - 6$.',
      answerVn:
        'Đáp án là $8 - 5 = 3$ — **không** phải $5 - 8$. Trong tiếng Anh, hai số xuất hiện theo **thứ tự ngược lại** với phép tính.\n\n' +
        'Cùng một cái bẫy: **take 7 away from 3** → $3 - 7$.   **6 less than 2** → $2 - 6$.',
    },
  },

  // 10 ─ Say it, then write it (TranslateWidget) ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Say It, Then Write It',
    titleVn: 'Đọc câu, rồi viết phép tính',
    ratio: 45,
    content:
      'The arithmetic is the easy part. The **English** is where the marks are lost — so practise the translation.\n\n' +
      'For every sentence: find the **signal words**, write the **calculation**, and only then the answer. Work through the tool at your own pace.',
    contentVn:
      'Phần tính toán là phần dễ. **Tiếng Anh** mới là chỗ mất điểm — nên hãy luyện tập cách chuyển đổi.\n\n' +
      'Với mỗi câu: tìm **từ khoá**, viết **phép tính**, rồi mới đến đáp án. Hãy làm từng bước với công cụ theo nhịp của em.',
    widget: TranslateWidget,
  },

  // 11 ─ Difference (DIFFERENCE_GAP) ────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Scale',
    title: 'How Much Warmer? How Much Lower?',
    titleVn: 'Ấm hơn bao nhiêu? Thấp hơn bao nhiêu?',
    ratio: 45,
    inlineSvg: DIAGRAMS.DIFFERENCE_GAP,
    content:
      'All of these ask for the **same thing** — the gap: **how much warmer · how much colder · how much higher · how many more**.\n\n' +
      'A **difference** is a distance on the number line, so it is never negative — even when one or both numbers are.',
    contentVn:
      'Tất cả đều hỏi **cùng một thứ** — khoảng cách: **how much warmer · how much colder · how much higher · how many more**.\n\n' +
      '**Hiệu (difference)** là khoảng cách trên trục số, nên nó không bao giờ âm — kể cả khi một hoặc cả hai số là số âm.',
    notes: [
      {
        tone: 'write',
        text: '**Difference:** how far apart two numbers are. Work it out with **bigger − smaller**. The answer is never negative.',
        textVn: '**Hiệu:** hai số cách nhau bao xa. Tính bằng **số lớn − số bé**. Đáp án không bao giờ âm.',
      },
    ],
    exampleLabel: 'Worked example',
    exampleLabelVn: 'Ví dụ mẫu',
    example: 'Freezer $-15$ °C, room $20$ °C. How much **warmer**?  $20 - (-15) = 35$ degrees.',
    exampleVn: 'Tủ đông $-15$ °C, căn phòng $20$ °C. **Ấm hơn** bao nhiêu?  $20 - (-15) = 35$ độ.',
  },

  // 12 ─ Application 1: the car park ────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    title: 'The Car Park',
    titleVn: 'Bãi đỗ xe',
    ratio: 55,
    image: 'images/Y7_MATH/U01_1/lift-panel.jpg',
    content:
      'Mr Bowen parks on level **B4** — four floors **below** the ground, which is floor $-4$.\n\n' +
      'He gets into the lift and goes **up 9 floors**. Which floor is he on now?',
    contentVn:
      'Thầy Bowen đỗ xe ở tầng **B4** — bốn tầng **dưới** mặt đất, tức là tầng $-4$.\n\n' +
      'Thầy bước vào thang máy và đi **lên 9 tầng**. Bây giờ thầy đang ở tầng nào?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: '$-4 + 9 = 5$. He is on **floor 5**.',
      answerVn: '$-4 + 9 = 5$. Thầy đang ở **tầng 5**.',
    },
  },

  // 13 ─ Application 2: the snail + CHECK 5 ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    title: 'The Snail',
    titleVn: 'Con ốc sên',
    ratio: 55,
    side: 'left',
    image: 'images/Y7_MATH/U01_1/snail.jpg',
    content:
      'A snail is at the bottom of a well, 12 metres below the ground, at $-12$ m.\n\n' +
      'Every day it climbs **up 3 m**, and every night it slides **down 3 m**. Where is the snail after 9 days?',
    contentVn:
      'Một con ốc sên ở đáy giếng, sâu 12 mét dưới mặt đất, tức là $-12$ m.\n\n' +
      'Mỗi ngày nó bò **lên 3 m**, và mỗi đêm nó tụt **xuống 3 m**. Sau 9 ngày, con ốc sên ở đâu?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      answer: 'Each day: $+3 - 3 = 0$. After 9 days the snail is still at $-12$ m, at the bottom. Some questions are long, but the numbers cancel — read before you calculate.',
      answerVn: 'Mỗi ngày: $+3 - 3 = 0$. Sau 9 ngày, con ốc sên vẫn ở $-12$ m, dưới đáy giếng. Có những câu hỏi rất dài, nhưng các con số triệt tiêu nhau — hãy đọc trước khi tính.',
    },
    check: {
      id: 'c5',
      q: 'The snail climbs up 3 m each day and slides down 3 m each night. What is its change in height over **one whole day**?',
      qVn: 'Con ốc sên bò lên 3 m mỗi ngày và tụt xuống 3 m mỗi đêm. Thay đổi độ cao của nó trong **trọn một ngày** là bao nhiêu?',
      options: [
        { val: 'A', text: '$0$ m', textVn: '$0$ m' },
        { val: 'B', text: '$+6$ m', textVn: '$+6$ m' },
        { val: 'C', text: '$-6$ m', textVn: '$-6$ m' },
      ],
      correct: 'A',
      expEn: 'Up 3 then down 3 is $+3 - 3 = 0$: no net change. Answering $+6$ adds the two 3s instead of seeing that one goes up and the other down.',
      expVn: 'Lên 3 rồi xuống 3 là $+3 - 3 = 0$: không thay đổi. Trả lời $+6$ là cộng hai số 3 thay vì thấy một cái đi lên và một cái đi xuống.',
    },
  },

  // 14 ─ Countable recap ────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    content: 'Your notebook should now have the **movement rules** and **the key words** written down. Check each one.',
    contentVn: 'Trong vở của em bây giờ phải có **các quy tắc di chuyển** và **các từ khoá** đã viết ra. Hãy kiểm tra từng điều.',
    items: [
      { text: 'Say what an **integer** is, and which side of zero each kind sits.', textVn: 'Nói được **số nguyên** là gì, và mỗi loại nằm phía nào của số không.' },
      { text: 'Move the right way in **all four** cases (add/subtract, positive/negative).', textVn: 'Di chuyển đúng hướng trong **cả bốn** trường hợp (cộng/trừ, dương/âm).' },
      { text: 'Explain **minus a negative = plus**, using the word **inverse**.', textVn: 'Giải thích **trừ số âm = cộng**, dùng từ **số đối**.' },
      { text: 'Give three **up** words and three **down** words.', textVn: 'Nêu ba từ **đi lên** và ba từ **đi xuống**.' },
      { text: 'Turn “subtract 5 from 8” into a calculation, the right way round.', textVn: 'Chuyển “subtract 5 from 8” thành phép tính, đúng thứ tự.' },
      { text: 'Find the **difference**, and say why it is never negative.', textVn: 'Tìm **hiệu**, và nói vì sao nó không bao giờ âm.' },
    ],
  },

  // 15 ─ Closer + exit question ─────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    subtitle: 'You can move both ways along the number line, and turn an English sentence into a calculation. Exit question: the temperature is $-4$ °C and it **falls by 10 degrees**. What is it now?',
    subtitleVn: 'Em đã có thể di chuyển cả hai hướng trên trục số, và chuyển một câu tiếng Anh thành phép tính. Câu hỏi ra về: nhiệt độ đang là $-4$ °C và **giảm 10 độ**. Bây giờ là bao nhiêu?',
  },
];
