// src/data/Y7_MATH/U01_5/notes.js
// 1.5 Tests for Divisibility — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons). 15 layout slides, 5 embedded checks.
//
// Reduced from 20 classroom slides: the homework slide and two word problems
// (The Biscuit Tins, The School Hall) are cut/demoted, and the discussion beats
// become solo. The rules table is the copy-down spine — nine tests in five
// groups — and the 3960 hook runs through it, each test slide paying back a
// piece. The English beat is "Three Ways to Say One Thing". The `check:` block
// is always the LAST key on a slide.
import { DIAGRAMS } from './diagrams.js';
import { FactorHuntWidget } from './widgets.jsx';

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
    icon: 'ScanEye',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Unit 1 · 1.5',
    eyebrowVn: 'Chương 1 · 1.5',
    title: 'Tests for Divisibility',
    titleVn: 'Dấu hiệu chia hết',
    objective: 'Check whether a number divides exactly by 2 to 11 — without a calculator.',
    objectiveVn: 'Kiểm tra xem một số có chia hết cho 2 đến 11 hay không — mà không cần máy tính.',
  },

  // 2 ─ The hook: Mr Bowen's number ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'MessageSquare',
    eyebrow: 'Two minutes, pen and paper',
    eyebrowVn: 'Hai phút, giấy và bút',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    text: '**3960**',
    textVn: '**3960**',
    sub: 'Which of 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 divide into it **exactly**, with **nothing left over**?',
    subVn: 'Số nào trong 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 chia hết nó **chính xác**, **không dư gì**?',
    content: 'Write the numbers **2 to 11** down the side of your page with a **tick** or a **cross** next to each. Guessing is fine — we will prove them one test at a time.',
    contentVn: 'Viết các số **2 đến 11** dọc mép trang, đánh **dấu đúng** hoặc **dấu sai** cạnh mỗi số. Đoán cũng được — ta sẽ chứng minh từng dấu hiệu một.',
  },

  // 3 ─ Key word: Divisible ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khoá',
    title: 'Divisible',
    titleVn: 'Divisible — Chia hết',
    ratio: 45,
    inlineSvg: DIAGRAMS.EXACTLY_OR_NOT,
    content: 'One number is **divisible by** another if it divides **exactly** — nothing left over, no remainder. It is the same idea as a factor, said from the other end.',
    contentVn: 'Một số **chia hết cho** số khác nếu phép chia ra **đúng** — không thừa gì, không có số dư. Đây chính là ý tưởng ước số, chỉ nói từ phía ngược lại.',
    notes: [
      {
        tone: 'write',
        text:
          '**Divisible:** divides exactly, with nothing left over. 42 is divisible by 6.\n' +
          '**Test for divisibility:** a quick check that tells you **yes or no** without doing the division.',
        textVn:
          '**Chia hết (divisible):** chia ra đúng, không dư gì. 42 chia hết cho 6.\n' +
          '**Dấu hiệu chia hết:** cách kiểm tra nhanh cho biết **có hay không**, mà không cần chia.',
      },
    ],
  },

  // 4 ─ English: three ways to say one thing ────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    side: 'left',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: 'Three Ways to Say One Thing',
    titleVn: 'Ba cách nói cùng một điều',
    ratio: 45,
    inlineSvg: DIAGRAMS.THREE_SENTENCES,
    content: 'You met **factor** in 1.4 and **multiple** in 1.3. **Divisible by** is not a third new idea — all three sentences describe the same division.',
    contentVn: 'Em đã học **factor (ước số)** ở 1.4 và **multiple (bội số)** ở 1.3. **Divisible by** không phải ý tưởng thứ ba — cả ba câu đều mô tả cùng một phép chia.',
    notes: [
      {
        tone: 'write',
        text:
          'These three sentences say the **same thing**:\n' +
          '**1.** 6 is a **factor of** 24.\n' +
          '**2.** 24 is **divisible by** 6.\n' +
          '**3.** 24 is a **multiple of** 6.',
        textVn:
          'Ba câu này nói **cùng một điều**:\n' +
          '**1.** 6 là **ước số của** 24.\n' +
          '**2.** 24 **chia hết cho** 6.\n' +
          '**3.** 24 là **bội số của** 6.',
      },
    ],
  },

  // 5 ─ Tests for 2, 5, 10 (last digit) + CHECK 1 ───────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Tests for 2, 5 and 10',
    eyebrowVn: 'Dấu hiệu chia hết cho 2, 5 và 10',
    title: 'Look at the Last Digit',
    titleVn: 'Nhìn vào chữ số cuối',
    ratio: 45,
    inlineSvg: DIAGRAMS.LAST_DIGIT,
    content: 'For these three tests, **cover the whole number except the last digit**. Nothing else can change the answer.',
    contentVn: 'Với ba dấu hiệu này, hãy **che hết cả số, chỉ chừa chữ số cuối**. Không có gì khác làm thay đổi câu trả lời.',
    notes: [
      {
        tone: 'write',
        text:
          '**Divisible by 2:** the last digit is 0, 2, 4, 6 or 8.\n' +
          '**Divisible by 5:** the last digit is 0 or 5.\n' +
          '**Divisible by 10:** the last digit is 0.',
        textVn:
          '**Chia hết cho 2:** chữ số cuối là 0, 2, 4, 6 hoặc 8.\n' +
          '**Chia hết cho 5:** chữ số cuối là 0 hoặc 5.\n' +
          '**Chia hết cho 10:** chữ số cuối là 0.',
      },
      {
        tone: 'info',
        badge: 'Try it on 3960',
        badgeVn: 'Thử với 3960',
        text: '3960 ends in **0**, so it is divisible by 2, by 5 and by 10 — three ticks already.',
        textVn: '3960 tận cùng bằng **0**, nên chia hết cho 2, 5 và 10 — đã ba dấu đúng.',
      },
    ],
    check: {
      id: 'c1',
      q: 'Which of these is divisible by **both** 2 and 5?',
      qVn: 'Số nào chia hết cho **cả** 2 và 5?',
      options: [
        { val: 'A', text: '$90$', textVn: '$90$' },
        { val: 'B', text: '$35$', textVn: '$35$' },
        { val: 'C', text: '$24$', textVn: '$24$' },
      ],
      correct: 'A',
      expEn: 'A number divisible by both 2 and 5 must end in **0**, and 90 does. 35 ends in 5 (divisible by 5 only); 24 ends in 4 (divisible by 2 only).',
      expVn: 'Một số chia hết cho cả 2 và 5 phải tận cùng bằng **0**, và 90 thì đúng vậy. 35 tận cùng 5 (chỉ chia hết cho 5); 24 tận cùng 4 (chỉ chia hết cho 2).',
    },
  },

  // 6 ─ Tests for 3 and 9 (digit sum) + CHECK 2 ─────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Layers',
    side: 'left',
    eyebrow: 'Tests for 3 and 9',
    eyebrowVn: 'Dấu hiệu chia hết cho 3 và 9',
    title: 'Add Up the Digits',
    titleVn: 'Cộng các chữ số lại',
    ratio: 45,
    inlineSvg: DIAGRAMS.DIGIT_SUM,
    content: 'Throw the number away and keep only the **sum of its digits**. If the sum passes, the number passes.',
    contentVn: 'Bỏ qua con số ban đầu, chỉ giữ lại **tổng các chữ số**. Nếu tổng thoả điều kiện thì số đó cũng thoả.',
    notes: [
      {
        tone: 'write',
        text:
          '**Divisible by 3:** the digits add to a multiple of 3.\n' +
          '**Divisible by 9:** the digits add to a multiple of 9.\n' +
          'For 3960: $3 + 9 + 6 + 0 = 18$ — a multiple of both. Five ticks.',
        textVn:
          '**Chia hết cho 3:** tổng các chữ số là bội của 3.\n' +
          '**Chia hết cho 9:** tổng các chữ số là bội của 9.\n' +
          'Với 3960: $3 + 9 + 6 + 0 = 18$ — bội của cả hai. Được năm dấu đúng.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Use the digit-sum test: is $4725$ divisible by 9?',
      qVn: 'Dùng dấu hiệu tổng chữ số: $4725$ có chia hết cho 9 không?',
      options: [
        { val: 'A', text: 'Yes — the digits add to 18, a multiple of 9', textVn: 'Có — tổng các chữ số bằng 18, là bội của 9' },
        { val: 'B', text: 'No — it ends in 5', textVn: 'Không — nó tận cùng bằng 5' },
        { val: 'C', text: 'Yes — because it is an odd number', textVn: 'Có — vì nó là số lẻ' },
      ],
      correct: 'A',
      expEn: '$4 + 7 + 2 + 5 = 18$, which is a multiple of 9, so 4725 is divisible by 9. The last digit tells you about 2, 5 and 10 — not about 9.',
      expVn: '$4 + 7 + 2 + 5 = 18$, là bội của 9, nên 4725 chia hết cho 9. Chữ số cuối cho biết về 2, 5 và 10 — không phải về 9.',
    },
  },

  // 7 ─ Tests for 4 and 8 (end of number) ───────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Tests for 4 and 8',
    eyebrowVn: 'Dấu hiệu chia hết cho 4 và 8',
    title: 'Look at the End',
    titleVn: 'Nhìn vào phần đuôi',
    ratio: 45,
    inlineSvg: DIAGRAMS.END_OF_NUMBER,
    content: 'These two need more than one digit, but still not the whole number. Put a finger over the front and test only what is left.',
    contentVn: 'Hai dấu hiệu này cần nhiều hơn một chữ số, nhưng vẫn không cần cả số. Che phần đầu và chỉ kiểm tra phần còn lại.',
    notes: [
      {
        tone: 'write',
        text:
          '**Divisible by 4:** the last **two** digits make a multiple of 4.\n' +
          '**Divisible by 8:** the last **three** digits make a multiple of 8.\n' +
          'For 3960: 60 divides by 4, and 960 divides by 8. Seven ticks.',
        textVn:
          '**Chia hết cho 4:** **hai** chữ số cuối tạo thành bội của 4.\n' +
          '**Chia hết cho 8:** **ba** chữ số cuối tạo thành bội của 8.\n' +
          'Với 3960: 60 chia hết cho 4, và 960 chia hết cho 8. Được bảy dấu đúng.',
      },
    ],
  },

  // 8 ─ Test for 6 (two tests at once) + CHECK 3 ────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ShieldCheck',
    side: 'left',
    eyebrow: 'Test for 6',
    eyebrowVn: 'Dấu hiệu chia hết cho 6',
    title: 'Two Tests at Once',
    titleVn: 'Hai dấu hiệu cùng lúc',
    ratio: 45,
    inlineSvg: DIAGRAMS.SIX_IS_TWO_AND_THREE,
    content: 'There is **no new test** for 6. Because $6 = 2 × 3$, a number divides by 6 exactly when it divides by 2 **and** by 3. One tick is not enough — 10 is even, but 10 does not divide by 6.',
    contentVn: 'Không có dấu hiệu **mới** cho 6. Vì $6 = 2 × 3$, một số chia hết cho 6 đúng khi nó chia hết cho 2 **và** cho 3. Một dấu đúng thôi chưa đủ — 10 là số chẵn, nhưng 10 không chia hết cho 6.',
    notes: [
      {
        tone: 'write',
        text: '**Divisible by 6:** divisible by **2** and by **3** — both, not one. (3960 is even and its digits add to 18, so it passes. Eight ticks.)',
        textVn: '**Chia hết cho 6:** chia hết cho **2** và cho **3** — cả hai, không phải một. (3960 là số chẵn và tổng chữ số bằng 18, nên thoả. Tám dấu đúng.)',
      },
    ],
    check: {
      id: 'c3',
      q: '10 is an even number. Is 10 divisible by 6?',
      qVn: '10 là số chẵn. 10 có chia hết cho 6 không?',
      options: [
        { val: 'A', text: 'Yes — it is even, so it divides by 6', textVn: 'Có — nó chẵn, nên chia hết cho 6' },
        { val: 'B', text: 'Yes — 6 is a factor of 10', textVn: 'Có — 6 là ước số của 10' },
        { val: 'C', text: 'No — 10 divides by 2 but not by 3', textVn: 'Không — 10 chia hết cho 2 nhưng không cho 3' },
      ],
      correct: 'C',
      expEn: 'Dividing by 6 needs **both** the 2 test and the 3 test. 10 is even (passes 2) but its digits add to 1 (fails 3), so 10 does not divide by 6. Being even alone is not enough.',
      expVn: 'Chia hết cho 6 cần **cả** dấu hiệu 2 và dấu hiệu 3. 10 là số chẵn (thoả 2) nhưng tổng chữ số bằng 1 (không thoả 3), nên 10 không chia hết cho 6. Chỉ chẵn thôi thì chưa đủ.',
    },
  },

  // 9 ─ Test for 11 (the strange one) ───────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Sparkles',
    eyebrow: 'Test for 11',
    eyebrowVn: 'Dấu hiệu chia hết cho 11',
    title: 'The Strange One',
    titleVn: 'Dấu hiệu kỳ lạ',
    ratio: 45,
    inlineSvg: DIAGRAMS.ELEVEN_GROUPS,
    content: 'Add every other digit into two groups, then **subtract the smaller total from the bigger**. If the difference is 0 or a multiple of 11, the number divides by 11.',
    contentVn: 'Cộng các chữ số cách nhau một ô thành hai nhóm, rồi **lấy tổng lớn trừ tổng nhỏ**. Nếu hiệu bằng 0 hoặc là bội của 11 thì số đó chia hết cho 11.',
    notes: [
      {
        tone: 'write',
        text: '**Divisible by 11:** group alternate digits, add each group, take the difference. If it is 0 or a multiple of 11, it divides. For 3960: $(3+6) - (9+0) = 0$ — and zero counts. Nine ticks.',
        textVn: '**Chia hết cho 11:** nhóm các chữ số xen kẽ, cộng mỗi nhóm, lấy hiệu. Nếu bằng 0 hoặc bội của 11 thì chia hết. Với 3960: $(3+6) - (9+0) = 0$ — và số 0 vẫn tính. Chín dấu đúng.',
      },
    ],
  },

  // 10 ─ English: one number is missing (no test for 7) + CHECK 4 ───────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'MessageSquare',
    eyebrow: 'Count the tests we have written down',
    eyebrowVn: 'Đếm lại những dấu hiệu ta đã chép',
    title: 'One Number Is Missing',
    titleVn: 'Còn thiếu một số',
    text: 'Nine tests, not ten.',
    textVn: 'Chín, không phải mười.',
    sub: 'We have tests for 2, 3, 4, 5, 6, 8, 9, 10 and 11. Which one is **missing**, and why?',
    subVn: 'Ta có dấu hiệu cho 2, 3, 4, 5, 6, 8, 9, 10 và 11. Số nào bị **thiếu**, và vì sao?',
    check: {
      id: 'c4',
      q: 'Why is there no simple test for divisibility by 7?',
      qVn: 'Vì sao không có dấu hiệu đơn giản cho phép chia hết cho 7?',
      options: [
        { val: 'A', text: 'Because 7 is a prime number', textVn: 'Vì 7 là số nguyên tố' },
        { val: 'B', text: 'Any test for 7 is longer than just dividing, so you divide and check the remainder', textVn: 'Mọi dấu hiệu cho 7 đều dài hơn cả phép chia, nên em chia rồi xem số dư' },
        { val: 'C', text: 'Because 7 never divides into anything', textVn: 'Vì 7 không bao giờ chia hết số nào' },
      ],
      correct: 'B',
      expEn: 'A test only helps if it is faster than dividing. Every test for 7 is longer than the division itself, so for 7 you just divide and look at the remainder.',
      expVn: 'Một dấu hiệu chỉ có ích khi nó nhanh hơn phép chia. Mọi dấu hiệu cho 7 đều dài hơn chính phép chia, nên với 7 em chỉ việc chia rồi xem số dư.',
    },
  },

  // 11 ─ The hook paid off: the tick chart ──────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Back to Mr Bowen’s number',
    eyebrowVn: 'Quay lại con số của thầy Bowen',
    title: 'How Many Did You Get Right?',
    titleVn: 'Em đoán đúng được bao nhiêu?',
    inlineSvg: DIAGRAMS.TICK_CHART_3960,
    caption: 'Every number from 2 to 11 is a factor of 3960 — **except 7**, the only one without a test. Two minutes of guessing at the start; nine tests later, you can prove all ten. Count your ticks against the chart.',
    captionVn: 'Mọi số từ 2 đến 11 đều là ước số của 3960 — **trừ số 7**, số duy nhất không có dấu hiệu. Lúc đầu đoán trong hai phút; sau chín dấu hiệu, em chứng minh được cả mười. Đối chiếu các dấu của em với bảng.',
  },

  // 12 ─ Your turn to hunt (FactorHuntWidget) ───────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Your Turn to Hunt',
    titleVn: 'Đến lượt em đi săn',
    ratio: 45,
    content:
      'Three more numbers. For each one, **choose which test to run** and see if it passes — but decide your tick or cross **before** you check.\n\n' +
      'Say the test to yourself, not just the answer: “the digits add to 18, so it divides by 9”.',
    contentVn:
      'Thêm ba con số nữa. Với mỗi số, **chọn dấu hiệu để thử** và xem nó có thoả không — nhưng hãy quyết định dấu đúng/sai của em **trước khi** kiểm tra.\n\n' +
      'Tự nói cách kiểm tra, không chỉ nói đáp án: “tổng các chữ số bằng 18, nên nó chia hết cho 9”.',
    widget: FactorHuntWidget,
  },

  // 13 ─ Work backwards: the missing digit + CHECK 5 ────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'AlertTriangle',
    eyebrow: 'Problem — work backwards',
    eyebrowVn: 'Bài toán — làm ngược lại',
    title: 'The Missing Digit',
    titleVn: 'Chữ số bị thiếu',
    ratio: 55,
    side: 'left',
    content:
      'A four-digit number starts **2, 7, 4** — but the last digit has been rubbed out.\n\n' +
      '> **2 7 4 ▢**  is divisible by **9**.\n\n' +
      'What is the missing digit? There is only one answer.',
    contentVn:
      'Một số bốn chữ số bắt đầu bằng **2, 7, 4** — nhưng chữ số cuối đã bị xoá.\n\n' +
      '> **2 7 4 ▢**  chia hết cho **9**.\n\n' +
      'Chữ số bị thiếu là số mấy? Chỉ có một đáp án.',
    check: {
      id: 'c5',
      q: 'The number **2 7 4 ▢** is divisible by 9. What is the missing last digit?',
      qVn: 'Số **2 7 4 ▢** chia hết cho 9. Chữ số cuối bị thiếu là số mấy?',
      options: [
        { val: 'A', text: '$0$', textVn: '$0$' },
        { val: 'B', text: '$9$', textVn: '$9$' },
        { val: 'C', text: '$5$', textVn: '$5$' },
      ],
      correct: 'C',
      expEn: 'The visible digits add to $2 + 7 + 4 = 13$. For the whole number to divide by 9 the digits must add to a multiple of 9 — the next is 18, so the missing digit is $18 − 13 = 5$.',
      expVn: 'Các chữ số nhìn thấy cộng lại bằng $2 + 7 + 4 = 13$. Để cả số chia hết cho 9, tổng chữ số phải là bội của 9 — số kế tiếp là 18, nên chữ số thiếu là $18 − 13 = 5$.',
    },
  },

  // 14 ─ Countable recap ────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Recap',
    eyebrowVn: 'Ôn lại',
    title: 'Can You Do All Five?',
    titleVn: 'Em làm được cả năm điều này chứ?',
    content: 'You’ve now met **the two key words**, **the three sentences**, and **9 tests** (for 2, 3, 4, 5, 6, 8, 9, 10 and 11). Tick each one you can do.',
    contentVn: 'Em đã học **hai từ khoá**, **ba câu nói cùng một điều**, và **9 dấu hiệu** (cho 2, 3, 4, 5, 6, 8, 9, 10 và 11). Hãy tự đánh dấu từng điều em làm được.',
    items: [
      { text: 'Say what **divisible by** means, and the other two sentences that say the same thing.', textVn: 'Nói được **divisible by** nghĩa là gì, và hai câu còn lại nói cùng một điều.' },
      { text: 'Test for **2, 5 and 10** by the last digit.', textVn: 'Kiểm tra **2, 5 và 10** bằng chữ số cuối.' },
      { text: 'Test for **3 and 9** by the digit sum, and **4 and 8** by the end of the number.', textVn: 'Kiểm tra **3 và 9** bằng tổng chữ số, **4 và 8** bằng phần đuôi.' },
      { text: 'Explain why the test for **6** is really two tests.', textVn: 'Giải thích vì sao dấu hiệu cho **6** thật ra là hai dấu hiệu.' },
      { text: 'Say why there is **no test for 7**.', textVn: 'Nói được vì sao **không có dấu hiệu cho 7**.' },
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
    subtitle: 'You can test a number for nine different factors without dividing once. Exit question: **is 4113 divisible by 3?** Say the test, not just the answer.',
    subtitleVn: 'Em có thể kiểm tra chín ước số của một số mà không cần chia lần nào. Câu hỏi ra về: **4113 có chia hết cho 3 không?** Hãy nói cách kiểm tra, đừng chỉ nói đáp án.',
  },
];
