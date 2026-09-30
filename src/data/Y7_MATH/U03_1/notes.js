// src/data/Y7_MATH/U03_1/notes.js
// 3.1 Multiplying and Dividing by Powers of 10 — a self-study reduction of the
// first half of the classroom deck (C:\Users\bowen\lessons, content/y7-math/
// U03_1_2, slides 1–18), rebuilt to the algebra-engines density
// (docs/y7-math/algebra-engines.md §4). 24 layout slides, 20 scored items:
// 9 checks and 11 activities across five activity types (predict · sort ·
// shift · order · hotspot). No two slides in a row go unscored, and no two
// activities in a row are the same type.
//
// THREE THINGS SHAPE THIS DECK (from the classroom deck, kept).
//
// 1. "MULTIPLYING ADDS A ZERO" IS THE FOLK RULE, AND IT IS WRONG. It survives
//    whole numbers and dies on 7.2 × 10³. The classroom hand vote is now a
//    `predict` (slide 7), settled on the next slide by the stepper: the digits
//    move, the point does not. Slide 10 then says why the old rule ever looked
//    right — in 56 × 10 the ones column is left empty, and a zero holds it.
//
// 2. THE ENGLISH IS THE BARRIER. "Power" is not electricity; 10² is "ten
//    squared", 10³ "ten cubed", 10⁶ "ten to the power of six" (slide 4 sorts
//    the phrases). And hundreds / hundredths differ by three letters and a
//    factor of ten thousand — the hotspot on slide 23 turns on exactly that.
//
// 3. A ZERO THAT APPEARS IS A PLACEHOLDER. It holds an empty column open
//    between the digits and the point; it is never "added". Dividing is where
//    they cost marks (520 ÷ 10⁴ is 0.052, not 0.52), so the key word gets its
//    own slide (14) before the student slides the digits themselves (15).
//
// SPINE:
//   1–2    hero; how many zeros? (predict)
//   3–6    key word power (check); saying a power (sort); the power counts the
//          zeros (check); write it out (check)
//   7–10   Mr Bowen's rule (predict); The Digits Move stepper; multiplying
//          moves left (shift ×); where the zero comes from (check)
//   11–15  Now Divide stepper; dividing moves right (check); which way?
//          (sort); key word placeholder; hold the columns open (shift ÷)
//   16–17  Mr Bowen's chain of moves (predict); the missing power (shift)
//   18–20  four units of mass (order); milligrams to tonnes (shift, convert);
//          Mr Bowen's motorbike (check)
//   21–22  the Moon and Jupiter (check); the power decides (check)
//   23–24  the place-value table (hotspot); the checklist, with the exit
//          question as the last check
//
// House notes:
//  · `$…$` inline maths in checks, notes and activity strings; `$$…$$` only in
//    content, a callout body and reveal.answer.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field states the answer its own slide asks for.
//  · No whiteboards, pairs, hand votes, paper, homework, date or exit hero.
//  · No thousands separators and no decimal commas, in either language.
import { DIAGRAMS } from './diagrams.js';
import { ShiftLeft, ShiftRight } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_MATH/U03_1/${f}`);

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
    eyebrow: 'Unit 3 · 3.1',
    eyebrowVn: 'Chương 3 · 3.1',
    title: 'Multiplying and Dividing by Powers of 10',
    titleVn: 'Nhân và chia với lũy thừa của 10',
    objective: 'Say what a power is and read it out loud; know that the power counts the zeros; multiply and divide by powers of 10 by moving the digits left or right, not by "adding zeros"; and change between milligrams, grams, kilograms and tonnes.',
    objectiveVn: 'Nói được số mũ là gì và đọc nó thành lời; biết rằng số mũ đếm số chữ số 0; nhân và chia với lũy thừa của 10 bằng cách dịch các chữ số sang trái hoặc sang phải, chứ không phải "thêm số 0"; và đổi giữa miligam, gam, kilôgam và tấn.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **predict**, **sort**, **slide the digits** and **tap** your way through it. **20 things are scored** — the first is a very long number on the next slide.',
      textVn: 'Em sẽ **dự đoán**, **phân loại**, **dịch chữ số** và **chạm** trong suốt bài học. **20 mục được tính điểm** — mục đầu tiên là một con số rất dài ở slide sau.',
    },
  },

  // 2 ─ Starter: how many zeros? (PREDICT) ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter',
    eyebrowVn: 'Khởi động',
    title: 'How Many Zeros?',
    titleVn: 'Bao nhiêu số 0?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: '10000000000',
    textVn: '10000000000',
    sub: '10 has **1** zero. 100 has **2**. 1000 has **3**. Count the zeros in this one.',
    subVn: '10 có **1** số 0. 100 có **2**. 1000 có **3**. Hãy đếm các số 0 trong số này.',
    activity: {
      id: 'act_zeros',
      type: 'predict',
      prompt: 'How many zeros come after the 1?',
      promptVn: 'Có bao nhiêu số 0 đứng sau số 1?',
      options: [
        { val: 'nine', name: '9 zeros', nameVn: '9 số 0' },
        { val: 'ten', name: '10 zeros', nameVn: '10 số 0' },
        { val: 'eleven', name: '11 zeros', nameVn: '11 số 0' },
        { val: 'twelve', name: '12 zeros', nameVn: '12 số 0' },
      ],
      correct: 'ten',
      explain: '**10 zeros.** Almost nobody counts a number this long correctly the first time. The next slide shows a much shorter way to write it.',
      explainVn: '**10 số 0.** Hầu như không ai đếm đúng một số dài như thế này ngay lần đầu. Slide sau cho em thấy một cách viết ngắn hơn nhiều.',
    },
  },

  // 3 ─ Key word: power (CHECK 1) ───────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Superscript',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Power',
    titleVn: 'Số mũ',
    ratio: 40,
    inlineSvg: DIAGRAMS.POWER_PARTS,
    content: 'That long number is a 1 followed by **ten** zeros. The short way to write it is $10^{10}$.\n\nThe small number does the big work.',
    contentVn: 'Con số dài đó là một số 1 và **mười** số 0 theo sau. Cách viết ngắn gọn là $10^{10}$.\n\nCon số nhỏ lại làm việc lớn.',
    notes: [
      {
        tone: 'write',
        text: '**Power:** the small raised number. It says how many to multiply together.\n$10^3 = 10 × 10 × 10 = 1000$',
        textVn: '**Số mũ (power):** con số nhỏ viết cao. Nó cho biết nhân bao nhiêu số với nhau.\n$10^3 = 10 × 10 × 10 = 1000$',
      },
    ],
    check: {
      id: 'chk_power',
      q: 'What does $10^4$ mean?',
      qVn: '$10^4$ nghĩa là gì?',
      options: [
        { val: 'A', text: '$10 × 4$', textVn: '$10 × 4$' },
        { val: 'B', text: '$10 + 10 + 10 + 10$', textVn: '$10 + 10 + 10 + 10$' },
        { val: 'C', text: '$10 × 10 × 10 × 10$', textVn: '$10 × 10 × 10 × 10$' },
        { val: 'D', text: '$4 × 4 × 4 × 4 × 4 × 4 × 4 × 4 × 4 × 4$', textVn: '$4 × 4 × 4 × 4 × 4 × 4 × 4 × 4 × 4 × 4$' },
      ],
      correct: 'C',
      expEn: 'The power says how many tens to **multiply together**: $10^4 = 10 × 10 × 10 × 10 = 10000$. A multiplies 10 by the power and B adds four tens — both only make 40. D swaps the two parts: that is 4 to the power of 10.',
      expVn: 'Số mũ cho biết **nhân** bao nhiêu số 10 **với nhau**: $10^4 = 10 × 10 × 10 × 10 = 10000$. A lấy 10 nhân với số mũ, còn B cộng bốn số 10 — cả hai chỉ ra 40. D đổi chỗ hai phần: đó là 4 mũ 10.',
    },
  },

  // 4 ─ English check: saying a power (SORT) ────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    title: 'Saying a Power',
    titleVn: 'Đọc số mũ',
    inlineSvg: DIAGRAMS.POWER_WORDS,
    caption: 'In maths, **power** is not electricity. Say each one out loud.',
    captionVn: 'Trong toán, **power** không phải là điện. Hãy đọc to từng cách nói. (squared = bình phương, cubed = lập phương)',
    activity: {
      id: 'act_say_power',
      type: 'sort',
      prompt: 'Which power is each card? Sort them.',
      promptVn: 'Mỗi thẻ là lũy thừa nào? Hãy phân loại.',
      bins: [
        { id: 'p2', name: '$10^2$', nameVn: '$10^2$' },
        { id: 'p3', name: '$10^3$', nameVn: '$10^3$' },
        { id: 'p6', name: '$10^6$', nameVn: '$10^6$' },
      ],
      cards: [
        { id: 's1', name: 'ten squared', nameVn: 'ten squared', bin: 'p2' },
        { id: 's2', name: 'ten cubed', nameVn: 'ten cubed', bin: 'p3' },
        { id: 's3', name: 'ten to the power of six', nameVn: 'ten to the power of six', bin: 'p6' },
        { id: 's4', name: '$10 × 10 × 10$', nameVn: '$10 × 10 × 10$', bin: 'p3' },
        { id: 's5', name: 'ten to the power of two', nameVn: 'ten to the power of two', bin: 'p2' },
        { id: 's6', name: '$10 × 10 × 10 × 10 × 10 × 10$', nameVn: '$10 × 10 × 10 × 10 × 10 × 10$', bin: 'p6' },
        { id: 's7', name: 'ten to the power of three', nameVn: 'ten to the power of three', bin: 'p3' },
        { id: 's8', name: '$10 × 10$', nameVn: '$10 × 10$', bin: 'p2' },
      ],
      explain: '**Squared** means to the power of 2, and **cubed** means to the power of 3. Every other power is said the long way: ten to the power of six. The power is how many tens are multiplied together.',
      explainVn: '**Squared** (bình phương) nghĩa là mũ 2, và **cubed** (lập phương) nghĩa là mũ 3. Mọi số mũ khác đều đọc theo cách dài: ten to the power of six. Số mũ là số lượng số 10 được nhân với nhau.',
    },
  },

  // 5 ─ The power counts the zeros (CHECK 2) ────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Hash',
    eyebrow: 'Powers of 10',
    eyebrowVn: 'Lũy thừa của 10',
    title: 'Count the Zeros',
    titleVn: 'Đếm số 0',
    ratio: 40,
    inlineSvg: DIAGRAMS.ZERO_LADDER,
    content: 'Read down the ladder. The power and the number of zeros always match.',
    contentVn: 'Hãy đọc từ trên xuống dưới. Số mũ và số chữ số 0 luôn bằng nhau.',
    notes: [
      {
        tone: 'write',
        text: '**Powers of 10:** 10, 100, 1000, and so on.\nThe power tells you the number of zeros after the 1.',
        textVn: '**Lũy thừa của 10 (powers of 10):** 10, 100, 1000, ...\nSố mũ cho biết có bao nhiêu số 0 đứng sau số 1.',
      },
    ],
    check: {
      id: 'chk_count_zeros',
      q: 'Ten million is $10000000$. Which power of 10 is it?',
      qVn: 'Mười triệu là $10000000$. Đó là lũy thừa nào của 10?',
      options: [
        { val: 'A', text: '$10^6$', textVn: '$10^6$' },
        { val: 'B', text: '$10^7$', textVn: '$10^7$' },
        { val: 'C', text: '$10^8$', textVn: '$10^8$' },
        { val: 'D', text: '$7^{10}$', textVn: '$7^{10}$' },
      ],
      correct: 'B',
      expEn: 'Count the zeros after the 1: there are **7**, so it is $10^7$. $10^6$ is one zero short — that is one million. $10^8$ counts all eight digits, the 1 as well. $7^{10}$ swaps the base and the power.',
      expVn: 'Đếm các số 0 sau số 1: có **7** số, nên đó là $10^7$. $10^6$ thiếu một số 0 — đó là một triệu. $10^8$ là đếm cả tám chữ số, tính luôn số 1. $7^{10}$ là đổi chỗ cơ số và số mũ.',
    },
  },

  // 6 ─ Write it out (CHECK 3) ──────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Write It Out',
    titleVn: 'Viết ra đầy đủ',
    content: 'Write each one as an ordinary number.\n\n**a** $10^4$\n**b** $3 × 10^5$\n**c** $8 × 10^2$\n\nAnswer **b** below, then check **a** and **c**.',
    contentVn: 'Viết mỗi số dưới dạng số thường.\n\n**a** $10^4$\n**b** $3 × 10^5$\n**c** $8 × 10^2$\n\nTrả lời câu **b** ở bên dưới, rồi kiểm tra câu **a** và **c**.',
    reveal: {
      label: 'Check a and c',
      labelVn: 'Kiểm tra a và c',
      answer: '**a** $10000$: four zeros.\n**c** $800$: that is $8 × 100$.',
      answerVn: '**a** $10000$: bốn số 0.\n**c** $800$: tức là $8 × 100$.',
    },
    check: {
      id: 'chk_write_out',
      q: '**b** Write $3 × 10^5$ as an ordinary number.',
      qVn: '**b** Viết $3 × 10^5$ dưới dạng số thường.',
      options: [
        { val: 'A', text: '$15$', textVn: '$15$' },
        { val: 'B', text: '$30000$', textVn: '$30000$' },
        { val: 'C', text: '$3000000$', textVn: '$3000000$' },
        { val: 'D', text: '$300000$', textVn: '$300000$' },
      ],
      correct: 'D',
      expEn: '$10^5 = 100000$, so $3 × 10^5$ is three hundred-thousands: $300000$. 15 multiplies 3 by the power. $30000$ has only four zeros: that is $3 × 10^4$. $3000000$ has six: that is $3 × 10^6$.',
      expVn: '$10^5 = 100000$, nên $3 × 10^5$ là ba trăm nghìn: $300000$. 15 là lấy 3 nhân với số mũ. $30000$ chỉ có bốn số 0: đó là $3 × 10^4$. $3000000$ có sáu số 0: đó là $3 × 10^6$.',
    },
  },

  // 7 ─ The folk rule, and the vote (PREDICT) ───────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Is he right?',
    eyebrowVn: 'Thầy nói đúng không?',
    title: 'Mr Bowen Says',
    titleVn: 'Thầy Bowen nói',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: '"To multiply by 10, just add a zero."',
    textVn: '"Muốn nhân với 10, chỉ cần thêm một số 0."',
    sub: 'Test his rule on a decimal. Work out $7.2 × 10^3$.',
    subVn: 'Hãy thử quy tắc của thầy với một số thập phân. Tính $7.2 × 10^3$.',
    activity: {
      id: 'act_vote_72',
      type: 'predict',
      prompt: 'Which answer is right?',
      promptVn: 'Đáp án nào đúng?',
      options: [
        { val: 'zeros', name: '$7.2000$', nameVn: '$7.2000$' },
        { val: 'moved', name: '$7200$', nameVn: '$7200$' },
        { val: 'strip', name: '$72000$', nameVn: '$72000$' },
      ],
      correct: 'moved',
      explain: '**7200.** Three zeros stuck on after the point change nothing: $7.2000$ is still $7.2$. Taking the point out and then adding three zeros gives $72000$, ten times too big. Mr Bowen’s rule breaks on a decimal — the next slide shows what really happens.',
      explainVn: '**7200.** Thêm ba số 0 vào sau phần thập phân không làm số thay đổi: $7.2000$ vẫn là $7.2$. Bỏ dấu thập phân rồi thêm ba số 0 thì ra $72000$, lớn gấp mười lần. Quy tắc của thầy Bowen sai với số thập phân — slide sau cho thấy điều thật sự xảy ra.',
    },
  },

  // 8 ─ The stepper: multiplying ────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Move',
    eyebrow: 'Say each move before you press',
    eyebrowVn: 'Nói từng bước trước khi bấm',
    title: 'The Digits Move',
    titleVn: 'Các chữ số dịch chuyển',
    widget: ShiftLeft,
    caption: '**7200** is right. Every digit moves **left**. The point never moves.',
    captionVn: '**7200** mới đúng. Mọi chữ số dịch sang **trái**. Dấu thập phân không bao giờ dịch chuyển.',
  },

  // 9 ─ Multiplying moves left (SHIFT ×) ────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'MoveHorizontal',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    title: 'Multiplying Moves Left',
    titleVn: 'Nhân thì dịch sang trái',
    content: '**a** $4.3 × 10^3$\n**b** $56 × 10^4$\n**c** $0.9 × 10^5$\n\nSlide the digits for **a** below. Then work out **b** and **c**.',
    contentVn: '**a** $4.3 × 10^3$\n**b** $56 × 10^4$\n**c** $0.9 × 10^5$\n\nDịch các chữ số của câu **a** ở bên dưới. Rồi tính câu **b** và **c**.',
    notes: [
      {
        tone: 'write',
        text: 'Multiplying by $10^n$ moves every digit **n places left**.\nThe decimal point stays still.',
        textVn: 'Nhân với $10^n$ làm mọi chữ số dịch **n cột sang trái**.\nDấu thập phân đứng yên.',
      },
    ],
    reveal: {
      label: 'Check b and c',
      labelVn: 'Kiểm tra b và c',
      answer: '**b** $560000$\n**c** $90000$',
      answerVn: '**b** $560000$\n**c** $90000$',
    },
    activity: {
      id: 'act_shift_mult',
      type: 'shift',
      n: '4.3',
      op: '×',
      p: 3,
      prompt: '**a** $4.3 × 10^3$: slide every digit to its new column.',
      promptVn: '**a** $4.3 × 10^3$: dịch mọi chữ số đến cột mới của nó.',
      explain: 'The 4 lands in the thousands and the 3 in the hundreds. The tens and ones columns are left empty, so each gets a placeholder 0: $4300$.',
      explainVn: 'Số 4 vào hàng nghìn và số 3 vào hàng trăm. Cột hàng chục và hàng đơn vị bị trống, nên mỗi cột cần một số 0 giữ chỗ: $4300$.',
    },
  },

  // 10 ─ Why the old rule looked right (CHECK 4) ────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Lightbulb',
    side: 'left',
    eyebrow: 'Why the old rule seemed to work',
    eyebrowVn: 'Vì sao quy tắc cũ có vẻ đúng',
    title: 'Where the Zero Comes From',
    titleVn: 'Số 0 từ đâu ra',
    ratio: 54,
    inlineSvg: DIAGRAMS.ADD_ZERO,
    content: 'With a whole number, "add a zero" gets the right answer for the wrong reason.\n\nIn both tables every digit moves one place left. Only $56 × 10$ leaves the ones column **empty**.',
    contentVn: 'Với số tự nhiên, "thêm một số 0" cho đáp án đúng nhưng vì một lý do sai.\n\nTrong cả hai bảng, mọi chữ số đều dịch một cột sang trái. Chỉ có $56 × 10$ làm cột hàng đơn vị bị **trống**.',
    notes: [
      {
        tone: 'write',
        text: 'A zero is written only when a column is left **empty**.\n$56 × 10 = 560$ but $7.2 × 10 = 72$',
        textVn: 'Số 0 chỉ được viết khi có một cột bị **trống**.\n$56 × 10 = 560$ nhưng $7.2 × 10 = 72$',
      },
    ],
    check: {
      id: 'chk_which_zero',
      q: 'Which answer needs a zero to hold a column open?',
      qVn: 'Đáp án của phép tính nào cần một số 0 để giữ chỗ cho một cột?',
      options: [
        { val: 'A', text: '$1.8 × 10^2$', textVn: '$1.8 × 10^2$' },
        { val: 'B', text: '$3.25 × 10$', textVn: '$3.25 × 10$' },
        { val: 'C', text: '$0.4 × 10$', textVn: '$0.4 × 10$' },
        { val: 'D', text: '$0.07 × 10^2$', textVn: '$0.07 × 10^2$' },
      ],
      correct: 'A',
      expEn: '$1.8 × 10^2 = 180$: the 1 and the 8 move two places left and the ones column is left empty, so it needs a 0. The other three are $32.5$, $4$ and $7$: their digits fill every column up to the point, so no zero is written. D even loses the zeros it started with.',
      expVn: '$1.8 × 10^2 = 180$: số 1 và số 8 dịch hai cột sang trái và cột hàng đơn vị bị trống, nên cần một số 0. Ba câu còn lại bằng $32.5$, $4$ và $7$: các chữ số lấp đầy mọi cột cho đến dấu thập phân, nên không viết số 0 nào. Câu D còn mất luôn các số 0 lúc đầu.',
    },
  },

  // 11 ─ The stepper: dividing ──────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Move',
    eyebrow: 'Say each move before you press',
    eyebrowVn: 'Nói từng bước trước khi bấm',
    title: 'Now Divide',
    titleVn: 'Bây giờ là phép chia',
    widget: ShiftRight,
    caption: 'Dividing moves every digit **right**. Each **orange zero** holds a column open.',
    captionVn: 'Phép chia làm mọi chữ số dịch sang **phải**. Mỗi **số 0 màu cam** giữ chỗ cho một cột.',
  },

  // 12 ─ Dividing moves right (CHECK 5) ─────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'ArrowRight',
    eyebrow: 'The other way',
    eyebrowVn: 'Chiều ngược lại',
    title: 'Dividing Moves Right',
    titleVn: 'Chia thì dịch sang phải',
    content: 'Dividing makes a number **smaller**, so its digits move to the smaller columns on the right.',
    contentVn: 'Phép chia làm một số **nhỏ đi**, nên các chữ số của nó dịch sang các cột nhỏ hơn ở bên phải.',
    notes: [
      {
        tone: 'write',
        text: 'Dividing by $10^n$ moves every digit **n places right**.\nThe decimal point stays still.',
        textVn: 'Chia cho $10^n$ làm mọi chữ số dịch **n cột sang phải**.\nDấu thập phân đứng yên.',
      },
    ],
    check: {
      id: 'chk_divide',
      q: 'Work out $7000 ÷ 10^2$.',
      qVn: 'Tính $7000 ÷ 10^2$.',
      options: [
        { val: 'A', text: '$7$', textVn: '$7$' },
        { val: 'B', text: '$70$', textVn: '$70$' },
        { val: 'C', text: '$700$', textVn: '$700$' },
        { val: 'D', text: '$700000$', textVn: '$700000$' },
      ],
      correct: 'B',
      expEn: 'Every digit moves 2 places right, so the 7 goes from the thousands to the tens: $70$. The zeros that slide past the point are not written — $70.00$ is just $70$. 7 moved three places and 700 only one. $700000$ moved the digits left: that is multiplying.',
      expVn: 'Mọi chữ số dịch 2 cột sang phải, nên số 7 đi từ hàng nghìn xuống hàng chục: $70$. Các số 0 trượt qua dấu thập phân thì không cần viết — $70.00$ chính là $70$. 7 là dịch ba cột, còn 700 là chỉ dịch một cột. $700000$ là dịch các chữ số sang trái: đó là phép nhân.',
    },
  },

  // 13 ─ Which Way? (SORT) ──────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Left or right?',
    eyebrowVn: 'Trái hay phải?',
    title: 'Which Way?',
    titleVn: 'Đi hướng nào?',
    label: 'Sort it',
    labelVn: 'Phân loại',
    labelIcon: 'Sparkles',
    text: '**Multiplying** makes a number bigger. **Dividing** makes it smaller.',
    textVn: '**Phép nhân** làm số lớn lên. **Phép chia** làm số nhỏ đi.',
    sub: 'The big columns are on the left. The small columns are on the right.',
    subVn: 'Các cột lớn nằm bên trái. Các cột nhỏ nằm bên phải.',
    activity: {
      id: 'act_which_way',
      type: 'sort',
      prompt: 'Which way do the digits move? Sort each card.',
      promptVn: 'Các chữ số dịch về hướng nào? Hãy phân loại từng thẻ.',
      bins: [
        { id: 'left', name: 'The digits move **left**', nameVn: 'Các chữ số dịch sang **trái**' },
        { id: 'right', name: 'The digits move **right**', nameVn: 'Các chữ số dịch sang **phải**' },
      ],
      cards: [
        { id: 'w1', name: '$× 10^2$', nameVn: '$× 10^2$', bin: 'left' },
        { id: 'w2', name: '$÷ 10^3$', nameVn: '$÷ 10^3$', bin: 'right' },
        { id: 'w3', name: 'multiply by one thousand', nameVn: 'nhân với một nghìn', bin: 'left' },
        { id: 'w4', name: '$÷ 10$', nameVn: '$÷ 10$', bin: 'right' },
        { id: 'w5', name: '$45$ becomes $0.045$', nameVn: '$45$ thành $0.045$', bin: 'right' },
        { id: 'w6', name: '$× 10^5$', nameVn: '$× 10^5$', bin: 'left' },
        { id: 'w7', name: 'divide by ten squared', nameVn: 'chia cho mười bình phương', bin: 'right' },
        { id: 'w8', name: '$0.06$ becomes $60$', nameVn: '$0.06$ thành $60$', bin: 'left' },
      ],
      explain: 'Multiplying makes a number bigger, so its digits move left into bigger columns. Dividing makes it smaller: right. $45$ became $0.045$, which is smaller — right, $÷ 10^3$. $0.06$ became $60$, which is bigger — left, $× 10^3$.',
      explainVn: 'Phép nhân làm số lớn lên, nên các chữ số dịch sang trái vào các cột lớn hơn. Phép chia làm số nhỏ đi: sang phải. $45$ thành $0.045$, nhỏ hơn — sang phải, $÷ 10^3$. $0.06$ thành $60$, lớn hơn — sang trái, $× 10^3$.',
    },
  },

  // 14 ─ Key word: placeholder ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'CircleDot',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Placeholder',
    titleVn: 'Số 0 giữ chỗ',
    ratio: 45,
    inlineSvg: DIAGRAMS.PLACEHOLDERS,
    content: 'Divide 6 by $10^3$. The 6 moves three places right, into the thousandths.\n\nThe columns it has left are **empty**. Each one gets a zero, or nobody could tell which column the 6 is in.',
    contentVn: 'Chia 6 cho $10^3$. Số 6 dịch ba cột sang phải, vào hàng phần nghìn.\n\nCác cột nó vừa rời đi đều **trống**. Mỗi cột cần một số 0, nếu không thì không ai biết số 6 đang ở cột nào.',
    notes: [
      {
        tone: 'write',
        text: '**Placeholder:** a zero that holds a column open.\n$6 ÷ 10^3 = 0.006$',
        textVn: '**Số 0 giữ chỗ (placeholder):** số 0 giữ chỗ cho một cột trống.\n$6 ÷ 10^3 = 0.006$',
      },
    ],
  },

  // 15 ─ Hold the columns open (SHIFT ÷) ────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Hold the Columns Open',
    titleVn: 'Giữ chỗ cho các cột',
    content: '**a** $520 ÷ 10^4$\n**b** $45 ÷ 10^3$\n**c** $1200 ÷ 10^5$\n\nSlide the digits for **a** below. Then work out **b** and **c**.',
    contentVn: '**a** $520 ÷ 10^4$\n**b** $45 ÷ 10^3$\n**c** $1200 ÷ 10^5$\n\nDịch các chữ số của câu **a** ở bên dưới. Rồi tính câu **b** và **c**.',
    reveal: {
      label: 'Check b and c',
      labelVn: 'Kiểm tra b và c',
      answer: '**b** $0.045$\n**c** $0.012$',
      answerVn: '**b** $0.045$\n**c** $0.012$',
    },
    activity: {
      id: 'act_shift_div',
      type: 'shift',
      n: '520',
      op: '÷',
      p: 4,
      prompt: '**a** $520 ÷ 10^4$: slide every digit to its new column.',
      promptVn: '**a** $520 ÷ 10^4$: dịch mọi chữ số đến cột mới của nó.',
      explain: 'The 5 lands in the hundredths and the 2 in the thousandths. The ones and tenths columns are left empty, so each gets a placeholder 0: $0.052$. Writing $0.52$ loses one of them.',
      explainVn: 'Số 5 vào hàng phần trăm và số 2 vào hàng phần nghìn. Cột hàng đơn vị và hàng phần mười bị trống, nên mỗi cột cần một số 0 giữ chỗ: $0.052$. Viết $0.52$ là làm mất một số 0.',
    },
  },

  // 16 ─ Mr Bowen’s chain of moves (PREDICT) ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Repeat',
    eyebrow: 'One move after another',
    eyebrowVn: 'Dịch nhiều lần liên tiếp',
    title: 'Mr Bowen Keeps Going',
    titleVn: 'Thầy Bowen làm tiếp',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Start with **5**. $× 10^4$, then $÷ 10^2$, then $× 10^3$.',
    textVn: 'Bắt đầu với **5**. $× 10^4$, rồi $÷ 10^2$, rồi $× 10^3$.',
    sub: 'Mr Bowen says that is the same as one move: $× 10^5$.',
    subVn: 'Thầy Bowen nói như vậy cũng giống một lần dịch duy nhất: $× 10^5$.',
    activity: {
      id: 'act_chain',
      type: 'predict',
      prompt: 'Is Mr Bowen right this time?',
      promptVn: 'Lần này thầy Bowen có đúng không?',
      options: [
        { val: 'nine', name: 'No — it is $× 10^9$, because $4 + 2 + 3 = 9$', nameVn: 'Sai — đó là $× 10^9$, vì $4 + 2 + 3 = 9$' },
        { val: 'yes', name: 'Yes — it is the same as $× 10^5$', nameVn: 'Đúng — nó giống như $× 10^5$' },
        { val: 'never', name: 'No — three moves are never the same as one', nameVn: 'Sai — ba lần dịch không bao giờ giống một lần' },
      ],
      correct: 'yes',
      explain: 'Yes. Left 4, right 2, left 3 is $4 − 2 + 3 = 5$ places left, so it is $× 10^5$: the 5 ends up as $500000$. Dividing moves the digits **back** to the right, so its 2 is taken away, not added.',
      explainVn: 'Đúng. Trái 4, phải 2, trái 3 là $4 − 2 + 3 = 5$ cột sang trái, nên đó là $× 10^5$: số 5 thành $500000$. Phép chia làm các chữ số dịch **ngược lại** sang phải, nên số 2 của nó được trừ đi, không phải cộng vào.',
    },
  },

  // 17 ─ The missing power (SHIFT, find the power) ──────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Search',
    eyebrow: 'Find the power',
    eyebrowVn: 'Tìm số mũ',
    title: 'What Is Missing?',
    titleVn: 'Còn thiếu gì?',
    content: '**a** $6.1 × 10^{?} = 61000$\n**b** $900 ÷ 10^{?} = 0.09$\n\nSlide the digits for **a** below until they sit on the answer.',
    contentVn: '**a** $6.1 × 10^{?} = 61000$\n**b** $900 ÷ 10^{?} = 0.09$\n\nDịch các chữ số của câu **a** ở bên dưới cho đến khi chúng nằm đúng trên đáp án.',
    notes: [
      {
        tone: 'task',
        text: 'Count how many places the digits have moved. That is the power.',
        textVn: 'Đếm xem các chữ số đã dịch mấy cột. Đó chính là số mũ.',
      },
    ],
    reveal: {
      label: 'Check b',
      labelVn: 'Kiểm tra b',
      answer: '**b** $10^4$: the 9 moves from the hundreds to the hundredths, 4 places right.',
      answerVn: '**b** $10^4$: số 9 dịch từ hàng trăm xuống hàng phần trăm, 4 cột sang phải.',
    },
    activity: {
      id: 'act_shift_power',
      type: 'shift',
      kind: 'power',
      n: '6.1',
      op: '×',
      result: '61000',
      prompt: '**a** $6.1 × 10^{?} = 61000$. Slide the digits to find the missing power.',
      promptVn: '**a** $6.1 × 10^{?} = 61000$. Dịch các chữ số để tìm số mũ còn thiếu.',
      explain: 'Follow the 6: it goes from the ones to the ten-thousands, and the 1 goes with it. $6.1 × 10^4 = 61000$.',
      explainVn: 'Theo dõi số 6: nó đi từ hàng đơn vị lên hàng chục nghìn, và số 1 đi cùng nó. $6.1 × 10^4 = 61000$.',
    },
  },

  // 18 ─ Four units of mass (ORDER) ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Weight',
    eyebrow: 'Where this is used',
    eyebrowVn: 'Dùng ở đâu',
    title: 'Four Units of Mass',
    titleVn: 'Bốn đơn vị khối lượng',
    label: 'Order it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: '**kilogram · milligram · tonne · gram**',
    textVn: '**kilôgam · miligam · tấn · gam**',
    sub: 'Four units of **mass**. You have met them all in science.',
    subVn: 'Bốn đơn vị đo **khối lượng**. Em đã gặp cả bốn trong môn khoa học.',
    activity: {
      id: 'act_units',
      type: 'order',
      prompt: 'Put the four units in order: lightest first.',
      promptVn: 'Sắp xếp bốn đơn vị theo thứ tự: nhẹ nhất trước.',
      steps: [
        { id: 'mg', name: 'milligram (mg)', nameVn: 'miligam (mg)' },
        { id: 'g', name: 'gram (g)', nameVn: 'gam (g)' },
        { id: 'kg', name: 'kilogram (kg)', nameVn: 'kilôgam (kg)' },
        { id: 't', name: 'tonne (t)', nameVn: 'tấn (t)' },
      ],
      explain: 'Milligram, gram, kilogram, tonne. **Milli** means a thousandth and **kilo** means a thousand: 1000 mg make 1 g, 1000 g make 1 kg, and 1000 kg make 1 tonne. Every step is $10^3$.',
      explainVn: 'Miligam, gam, kilôgam, tấn. **Mili** nghĩa là một phần nghìn và **kilô** nghĩa là một nghìn: 1000 mg là 1 g, 1000 g là 1 kg, và 1000 kg là 1 tấn. Mỗi bậc là $10^3$.',
    },
  },

  // 19 ─ Milligrams to tonnes (SHIFT, convert) ──────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Every step is the same',
    eyebrowVn: 'Bậc nào cũng như nhau',
    title: 'Milligrams to Tonnes',
    titleVn: 'Từ miligam đến tấn',
    ratio: 40,
    inlineSvg: DIAGRAMS.MASS_LADDER,
    content: 'Every step on the ladder is $10^3$.\n\n**Down** to a smaller unit, there are more of them: multiply.\n\n**Up** to a bigger unit, there are fewer: divide.',
    contentVn: 'Mỗi bậc trên thang đều là $10^3$.\n\n**Xuống** đơn vị nhỏ hơn thì số đo nhiều lên: nhân.\n\n**Lên** đơn vị lớn hơn thì số đo ít đi: chia.',
    notes: [
      {
        tone: 'write',
        text: '1 g = 1000 mg, 1 kg = 1000 g and 1 t = 1000 kg\nEach step down is $× 10^3$. Each step up is $÷ 10^3$.',
        textVn: '1 g = 1000 mg, 1 kg = 1000 g và 1 t = 1000 kg\nMỗi bậc xuống là $× 10^3$. Mỗi bậc lên là $÷ 10^3$.',
      },
    ],
    activity: {
      id: 'act_shift_mass',
      type: 'shift',
      kind: 'convert',
      n: '4',
      from: 'kg',
      to: 'mg',
      prompt: 'Change 4 kg into milligrams. Which way, and how many places? Slide the digits.',
      promptVn: 'Đổi 4 kg sang miligam. Dịch về hướng nào, và mấy cột? Hãy dịch các chữ số.',
      explain: 'kg → g → mg is **two** steps down, so multiply by $10^3$ twice: $× 10^6$. Six empty columns, six placeholder zeros: 4 kg = $4000000$ mg.',
      explainVn: 'kg → g → mg là **hai** bậc đi xuống, nên nhân với $10^3$ hai lần: $× 10^6$. Sáu cột trống, sáu số 0 giữ chỗ: 4 kg = $4000000$ mg.',
    },
  },

  // 20 ─ Mr Bowen’s motorbike (CHECK 6) ─────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Up the ladder',
    eyebrowVn: 'Đi lên thang',
    title: 'Mr Bowen’s Motorbike',
    titleVn: 'Xe máy của thầy Bowen',
    content: 'Mr Bowen’s motorbike has a mass of 115 kg.\n\nThe sign on a small bridge gives its limit in **tonnes**, so Mr Bowen stops to work out his motorbike in tonnes.',
    contentVn: 'Xe máy của thầy Bowen có khối lượng 115 kg.\n\nBiển báo trên một cây cầu nhỏ ghi giới hạn theo **tấn**, nên thầy Bowen dừng lại để đổi khối lượng xe máy sang tấn.',
    check: {
      id: 'chk_motorbike',
      q: 'What is 115 kg in tonnes?',
      qVn: '115 kg bằng bao nhiêu tấn?',
      options: [
        { val: 'A', text: '$115000$ t', textVn: '$115000$ tấn' },
        { val: 'B', text: '$11.5$ t', textVn: '$11.5$ tấn' },
        { val: 'C', text: '$1.15$ t', textVn: '$1.15$ tấn' },
        { val: 'D', text: '$0.115$ t', textVn: '$0.115$ tấn' },
      ],
      correct: 'D',
      expEn: 'kg → t is one step **up**, so divide by $10^3$: every digit moves 3 places right and the ones column needs a placeholder 0. 115 kg = $0.115$ t. A multiplied — no motorbike is 115000 tonnes. B moved only one place and C only two.',
      expVn: 'kg → t là một bậc đi **lên**, nên chia cho $10^3$: mọi chữ số dịch 3 cột sang phải và cột hàng đơn vị cần một số 0 giữ chỗ. 115 kg = $0.115$ tấn. A đã nhân — không xe máy nào nặng 115000 tấn. B chỉ dịch một cột, còn C chỉ dịch hai cột.',
    },
  },

  // 21 ─ The Moon and Jupiter (CHECK 7) ─────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Real distances',
    eyebrowVn: 'Khoảng cách thật',
    title: 'How Far Away?',
    titleVn: 'Xa bao nhiêu?',
    ratio: 45,
    image: img('moon.jpg'),
    content: 'The Moon is $3.844 × 10^5$ km from Earth.\n\nJupiter is $6.287 × 10^8$ km from Earth.\n\nScientists write big distances like this. Now you can read them.',
    contentVn: 'Mặt Trăng cách Trái Đất $3.844 × 10^5$ km.\n\nSao Mộc cách Trái Đất $6.287 × 10^8$ km.\n\nCác nhà khoa học viết những khoảng cách lớn theo cách này. Giờ em đã đọc được chúng.',
    reveal: {
      prompt: 'Then write Jupiter’s distance as an ordinary number.',
      promptVn: 'Sau đó hãy viết khoảng cách đến Sao Mộc thành số thường.',
      label: 'Check Jupiter',
      labelVn: 'Kiểm tra Sao Mộc',
      answer: '$628700000$ km. Every digit moves 8 places left.',
      answerVn: '$628700000$ km. Mọi chữ số dịch 8 cột sang trái.',
    },
    check: {
      id: 'chk_moon',
      q: 'Write the Moon’s distance, $3.844 × 10^5$ km, as an ordinary number.',
      qVn: 'Viết khoảng cách đến Mặt Trăng, $3.844 × 10^5$ km, thành số thường.',
      options: [
        { val: 'A', text: '$384400$ km', textVn: '$384400$ km' },
        { val: 'B', text: '$3844000$ km', textVn: '$3844000$ km' },
        { val: 'C', text: '$38440$ km', textVn: '$38440$ km' },
        { val: 'D', text: '$3.84400000$ km', textVn: '$3.84400000$ km' },
      ],
      correct: 'A',
      expEn: 'Every digit moves 5 places left: the 3 lands in the hundred-thousands, and the two empty columns at the end get placeholder zeros. $384400$ km. B moved 6 places and C only 4. D stuck five zeros on after the point, which is still $3.844$.',
      expVn: 'Mọi chữ số dịch 5 cột sang trái: số 3 vào hàng trăm nghìn, và hai cột trống ở cuối cần số 0 giữ chỗ. $384400$ km. B dịch 6 cột, còn C chỉ dịch 4 cột. D thêm năm số 0 vào sau phần thập phân, mà số đó vẫn là $3.844$.',
    },
  },

  // 22 ─ The power decides (CHECK 8) ────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Orbit',
    eyebrow: 'Before you write a digit',
    eyebrowVn: 'Trước khi viết một chữ số nào',
    title: 'The Power Decides',
    titleVn: 'Số mũ quyết định',
    content: 'Jupiter is further away, and you knew before you wrote a single digit: $10^8$ beats $10^5$.\n\nWhen the number in front is between 1 and 10, compare the **power** first.',
    contentVn: 'Sao Mộc ở xa hơn, và em biết điều đó trước khi viết một chữ số nào: $10^8$ lớn hơn $10^5$.\n\nKhi số đứng trước nằm giữa 1 và 10, hãy so sánh **số mũ** trước.',
    check: {
      id: 'chk_biggest',
      q: 'Which of these is the **biggest**?',
      qVn: 'Số nào sau đây **lớn nhất**?',
      options: [
        { val: 'A', text: '$9.9 × 10^4$', textVn: '$9.9 × 10^4$' },
        { val: 'B', text: '$1.2 × 10^6$', textVn: '$1.2 × 10^6$' },
        { val: 'C', text: '$6 × 10^5$', textVn: '$6 × 10^5$' },
        { val: 'D', text: '$2.4 × 10^5$', textVn: '$2.4 × 10^5$' },
      ],
      correct: 'B',
      expEn: '$1.2 × 10^6$ has the biggest power: it is $1200000$. A has the biggest number in front but the smallest power: only $99000$. C and D are $600000$ and $240000$ — the same power, so there the number in front decides, but both are smaller than a million.',
      expVn: '$1.2 × 10^6$ có số mũ lớn nhất: bằng $1200000$. A có số đứng trước lớn nhất nhưng số mũ nhỏ nhất: chỉ bằng $99000$. C và D bằng $600000$ và $240000$ — cùng số mũ, nên lúc đó số đứng trước mới quyết định, nhưng cả hai đều nhỏ hơn một triệu.',
    },
  },

  // 23 ─ The place-value table (HOTSPOT) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Columns3',
    eyebrow: 'The whole lesson in one table',
    eyebrowVn: 'Cả bài học trong một bảng',
    title: 'Place Value',
    titleVn: 'Giá trị theo vị trí',
    inlineSvg: DIAGRAMS.PLACE_TABLE,
    caption: 'Multiplying goes **left**. Dividing goes **right**. The point never moves. In 3.2, this same table tells you where to round.',
    captionVn: 'Nhân thì sang **trái**. Chia thì sang **phải**. Dấu thập phân không bao giờ dịch chuyển. Ở bài 3.2, chính bảng này cho em biết làm tròn ở đâu. (tenths = phần mười, hundredths = phần trăm, thousandths = phần nghìn)',
    activity: {
      id: 'act_tap_column',
      type: 'hotspot',
      prompt: 'A 7 sits in the **ones** column (O). You divide by $10^2$. Tap the column the 7 lands in.',
      promptVn: 'Số 7 đang ở cột **ones** (O, hàng đơn vị). Em chia cho $10^2$. Hãy chạm vào cột mà số 7 dịch đến.',
      svg: DIAGRAMS.PLACE_COLUMNS,
      viewBox: '0 0 780 196',
      targets: [
        { id: 'thousands', x: 70, y: 98, r: 48, name: 'thousands', nameVn: 'thousands (hàng nghìn)' },
        { id: 'hundreds', x: 170, y: 98, r: 48, name: 'hundreds', nameVn: 'hundreds (hàng trăm)' },
        { id: 'tens', x: 270, y: 98, r: 48, name: 'tens', nameVn: 'tens (hàng chục)' },
        { id: 'ones', x: 370, y: 98, r: 48, name: 'ones', nameVn: 'ones (hàng đơn vị)' },
        { id: 'tenths', x: 510, y: 98, r: 48, name: 'tenths', nameVn: 'tenths (hàng phần mười)' },
        { id: 'hundredths', x: 610, y: 98, r: 48, name: 'hundredths', nameVn: 'hundredths (hàng phần trăm)' },
        { id: 'thousandths', x: 710, y: 98, r: 48, name: 'thousandths', nameVn: 'thousandths (hàng phần nghìn)' },
      ],
      correct: 'hundredths',
      explain: '$÷ 10^2$ moves the 7 two places **right**: past the point to the tenths, then to the hundredths. So $7 ÷ 10^2 = 0.07$. The **hundreds** column is two places the wrong way — that is $× 10^2$. Watch the ending: hundred**ths** are small.',
      explainVn: '$÷ 10^2$ làm số 7 dịch hai cột sang **phải**: qua dấu thập phân đến hàng phần mười, rồi đến hàng phần trăm (hundredths). Vậy $7 ÷ 10^2 = 0.07$. Cột **hundreds** (hàng trăm) là dịch hai cột sai chiều — đó là $× 10^2$. Chú ý đuôi từ: hundred**ths** là cột nhỏ.',
    },
  },

  // 24 ─ Checklist + the exit question (CHECK 9) ────────────────────────────
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
      { text: 'Say what a **power** is, and read $10^3$ out loud.', textVn: 'Nói được **số mũ** là gì, và đọc $10^3$ thành lời.' },
      { text: 'Know that the power counts the **zeros**.', textVn: 'Biết số mũ đếm số **số 0**.' },
      { text: 'Multiply by $10^n$: move the digits **left**.', textVn: 'Nhân với $10^n$: dịch chữ số sang **trái**.' },
      { text: 'Divide by $10^n$: move the digits **right**.', textVn: 'Chia cho $10^n$: dịch chữ số sang **phải**.' },
      { text: 'Fill an empty column with a **placeholder** zero.', textVn: 'Điền **số 0 giữ chỗ** vào cột trống.' },
      { text: 'Change mg to g to kg to t.', textVn: 'Đổi mg sang g sang kg sang tấn.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Exit question: work out $6.5 × 10^3$.',
      qVn: 'Câu hỏi cuối bài: tính $6.5 × 10^3$.',
      options: [
        { val: 'A', text: '$6.5000$', textVn: '$6.5000$' },
        { val: 'B', text: '$650$', textVn: '$650$' },
        { val: 'C', text: '$6500$', textVn: '$6500$' },
        { val: 'D', text: '$65000$', textVn: '$65000$' },
      ],
      correct: 'C',
      expEn: 'Every digit moves 3 places left: the 6 lands in the thousands and the 5 in the hundreds, and the two empty columns get placeholder zeros. $6500$. A stuck zeros on after the point — that is still $6.5$. B moved only 2 places and D moved 4.',
      expVn: 'Mọi chữ số dịch 3 cột sang trái: số 6 vào hàng nghìn và số 5 vào hàng trăm, và hai cột trống cần số 0 giữ chỗ. $6500$. A thêm số 0 vào sau phần thập phân — số đó vẫn là $6.5$. B chỉ dịch 2 cột, còn D dịch 4 cột.',
    },
  },
];
