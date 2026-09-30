// src/data/Y7_MATH/U03_2/data.js
// 3.2 Rounding — self-study unit, built to the number-engines unit shape
// (docs/y7-math/number-engines.md §1). 125 XP available, capped at 100 by
// unitXPOf. Gates: 20 of 30 (67%) and 80 of 105 (76%), both under the 80% rule.
//
// The classroom teaches 3.1 and 3.2 as ONE deck (lessons/content/y7-math/
// U03_1_2); the Dashboard follows the book, so this unit takes the second half
// (slides 19–39) and opens with the place-value table (slide 17) as its recap.
// U03_1 carries the same `meta.classroom` entry.
//
// What this unit adds that the classroom deck never had: short division
// written the short way — each remainder small, up and to the left of the next
// digit, and zeros added after the point — in the deck, the Bus Stop task and
// the workbook. The deck only compared 8.285 with 8.286.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U03_2_DATA = {
  meta: {
    id: 'U03_2',
    title: 'Rounding',
    desc: 'Round to a number of decimal places and keep the zero at the end; read "correct to" as round; and divide the short way — carry each remainder, add zeros after the point, work one place further, then round once.',
    track: 'Y7_MATH',
    icon: 'Sigma',
    classroom: [{ course: 'y7-math', slug: 'U03_1_2', title: 'Maths 3.1–3.2 · Place Value and Rounding' }],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 20,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'SHORT_DIV', dbKey: 'p56', maxXP: 25 },
        { id: 'QUICK_FIRE', dbKey: 'p58', maxXP: 10 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words: the section's two margin words (round, degree of accuracy), the
  // one the counting depends on (decimal places), the exam's two instruction
  // words (correct to, nearest) and the word the bus stop leans on (remainder).
  // The example sentences use their own numbers, so none gives away a deck item.
  realWords: [
    {
      word: 'Round', vn: 'Làm tròn',
      def: 'To write a number in a simpler form that is close to it.',
      vnDef: 'Viết một số ở dạng đơn giản hơn nhưng gần bằng nó.',
      sent: 'Round 4.53 to 1 decimal place and you get 4.5.',
      vnSent: 'Làm tròn 4.53 đến 1 chữ số thập phân thì được 4.5.',
      isReal: true,
    },
    {
      word: 'Decimal places', vn: 'Chữ số thập phân',
      def: 'The digits after the decimal point. You count them from the point, not from the front of the number.',
      vnDef: 'Các chữ số đứng sau dấu thập phân. Em đếm chúng từ dấu thập phân, không phải từ đầu số.',
      sent: '3.14159 has 5 decimal places, and 28.6 has 1.',
      vnSent: '3.14159 có 5 chữ số thập phân, còn 28.6 có 1.',
      isReal: true,
    },
    {
      word: 'Degree of accuracy', vn: 'Độ chính xác',
      def: 'How exact an answer has to be, such as the nearest 10 or 2 decimal places. The question always tells you.',
      vnDef: 'Đáp án cần chính xác đến mức nào, ví dụ hàng chục gần nhất hoặc 2 chữ số thập phân. Đề bài luôn nói rõ.',
      sent: 'The degree of accuracy in this question is 2 decimal places.',
      vnSent: 'Độ chính xác trong câu hỏi này là 2 chữ số thập phân.',
      isReal: true,
    },
    {
      word: 'Correct to', vn: 'Chính xác đến',
      def: 'The exam’s way of saying round to. Correct to 2 decimal places means round the answer to 2 decimal places.',
      vnDef: 'Cách đề thi nói "làm tròn đến". Correct to 2 decimal places nghĩa là làm tròn đáp án đến 2 chữ số thập phân.',
      sent: '10 divided by 3, correct to 2 decimal places, is 3.33.',
      vnSent: '10 chia 3, chính xác đến 2 chữ số thập phân, là 3.33.',
      isReal: true,
    },
    {
      word: 'Remainder', vn: 'Số dư',
      def: 'What is left over after a division. In short division it is carried onto the next digit.',
      vnDef: 'Phần còn thừa lại sau một phép chia. Trong phép chia ngắn, nó được nhớ sang chữ số tiếp theo.',
      sent: '4 into 27 goes 6 times, remainder 3.',
      vnSent: '27 chia 4 được 6, dư 3.',
      isReal: true,
    },
    {
      word: 'Nearest', vn: 'Gần nhất',
      def: 'The closest one. To the nearest 10 means choose the multiple of 10 that the number is closest to.',
      vnDef: 'Cái gần hơn cả. To the nearest 10 nghĩa là chọn bội số của 10 mà số đó gần nhất.',
      sent: '67 to the nearest 10 is 70, because 67 is closer to 70 than to 60.',
      vnSent: '67 làm tròn đến hàng chục gần nhất là 70, vì 67 gần 70 hơn 60.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; Vietnamese in `vnTranslation`. They are the deck's four
  // arguments — the zero, one place further, the two instruction words, and
  // rounding twice — asked for in the student's own words.
  shortQA: [
    {
      id: 'sq1',
      question: 'Hoa rounds 34.9892 to 1 decimal place and writes 35. Explain why the correct answer is 35.0, and why writing 35 loses the mark.',
      vnTranslation: 'Hoa làm tròn 34.9892 đến 1 chữ số thập phân và viết 35. Hãy giải thích vì sao đáp án đúng là 35.0, và vì sao viết 35 thì bị mất điểm.',
      suggestedWords: [['decimal place', 'd.p.'], ['tenths', 'next digit'], ['degree of accuracy', 'accuracy', 'exact']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for using the next digit: the digit after the first decimal place is 8, which is 5 or more, so the 9 tenths round up.',
        '1 mark for the carry: 9 tenths and one more is 10 tenths, which is one whole, so 34.9 becomes 35.0.',
        '1 mark for the zero: an answer to 1 decimal place must show one digit after the point, and 35 shows none (it looks rounded to the nearest whole number).',
      ],
      modelAnswer: 'To round to 1 decimal place, look at the next digit, which is 8. That is 5 or more, so the 9 tenths round up. 9 tenths and one more makes 10 tenths, which is one whole, so 34.9 becomes 35.0. The answer has to show 1 decimal place, so the zero must be written. 35 has no decimal place, so it looks as if it was only rounded to the nearest whole number.',
    },
    {
      id: 'sq2',
      question: 'To work out 58 ÷ 7 correct to 3 decimal places, Minh divides until he has 8.285 and stops. Explain why his answer is wrong, and what he should have done.',
      vnTranslation: 'Để tính 58 ÷ 7 chính xác đến 3 chữ số thập phân, Minh chia đến khi được 8.285 rồi dừng lại. Hãy giải thích vì sao đáp án của bạn ấy sai, và lẽ ra bạn ấy phải làm gì.',
      suggestedWords: [['round', 'rounding'], ['remainder', 'carry'], ['digit', 'decimal place']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying "correct to" means round, and Minh only cut the answer off at 3 places (that is "as far as" 3 d.p.) without looking at the next digit.',
        '1 mark for saying he should work one place further, to 4 decimal places: 8.2857.',
        '1 mark for rounding once: the 4th digit is 7, which is 5 or more, so the answer is 8.286.',
      ],
      modelAnswer: '"Correct to 3 decimal places" means round to 3 decimal places. Minh stopped at 8.285 without finding the next digit, so he cut the number off instead of rounding it. He should divide one place further, to 4 decimal places, which gives 8.2857. The 4th digit is 7, which is 5 or more, so the 5 rounds up and the answer is 8.286.',
    },
    {
      id: 'sq3',
      question: 'One question says "Work out 5 ÷ 3 as far as 3 decimal places." Another says "Work out 5 ÷ 3 correct to 3 decimal places." Explain the difference between the two instructions and give both answers. (5 ÷ 3 = 1.6666...)',
      vnTranslation: 'Một câu hỏi ghi "Work out 5 ÷ 3 as far as 3 decimal places." Một câu khác ghi "Work out 5 ÷ 3 correct to 3 decimal places." Hãy giải thích sự khác nhau giữa hai yêu cầu và cho cả hai đáp án. (5 ÷ 3 = 1.6666...)',
      suggestedWords: [['round', 'rounding'], ['divide', 'division'], ['next digit', 'digit']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for "as far as": keep dividing until there are 3 decimal places, then stop and write the digits without rounding — 1.666.',
        '1 mark for "correct to": it means round to 3 decimal places, so the 4th decimal place is needed first.',
        '1 mark for the rounded answer: the 4th digit is 6, which is 5 or more, so the answer is 1.667.',
      ],
      modelAnswer: '"As far as 3 decimal places" means keep dividing until you have 3 decimal places and then stop. You write the digits you have and do not round, so the answer is 1.666. "Correct to 3 decimal places" means round to 3 decimal places. For that you need the 4th decimal place, which is 6. It is 5 or more, so the third digit goes up and the answer is 1.667.',
    },
    {
      id: 'sq4',
      question: 'Mr Bowen rounds 2.7449 to 2 decimal places like this: first 2.7449 becomes 2.745, then 2.745 becomes 2.75. Explain his mistake and give the correct answer.',
      vnTranslation: 'Thầy Bowen làm tròn 2.7449 đến 2 chữ số thập phân như sau: đầu tiên 2.7449 thành 2.745, rồi 2.745 thành 2.75. Hãy giải thích lỗi của thầy và cho đáp án đúng.',
      suggestedWords: [['original', 'start'], ['next digit', 'digit'], ['decimal place', 'd.p.']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming the mistake: he rounded twice (he rounded a number that was already rounded).',
        '1 mark for the rule: round once, from the original number, looking only at the digit straight after the 2nd decimal place — here the 3rd decimal digit, 4.',
        '1 mark for the correct answer: 4 is less than 5, so the second decimal place stays and the answer is 2.74.',
      ],
      modelAnswer: 'Mr Bowen rounded twice: he rounded 2.7449 to 3 decimal places, and then rounded that rounded number again. You must round once, from the original number, and look only at the digit straight after the place you want. The digit after the 2nd decimal place is 4, which is less than 5, so the 4 hundredths stay. The correct answer is 2.74, because 2.7449 is nearer to 2.74 than to 2.75.',
    },
  ],

  // Bus Stop (SHORT_DIV): the item states only the division; utils/
  // shortDivision.js derives every column, carry, added zero and answer, and
  // utils/rounding.js names the slip behind a wrong rounded answer. Numbers are
  // fresh — not the deck's (58 ÷ 7, 23 ÷ 9, 852 ÷ 6, 27 ÷ 4, 7 ÷ 8 …), not the
  // workbook's and not the book's exercise. Answers, for the reviewer:
  //   L1  738 ÷ 6 = 123 · 952 ÷ 7 = 136 · 4608 ÷ 9 = 512
  //   L2  8.52 ÷ 4 = 2.13 · 17.4 ÷ 6 = 2.9
  //   L3  45 ÷ 2 = 22.5 · 5 ÷ 8 = 0.625 · 6.3 ÷ 4 = 1.575
  //   L4  25 ÷ 6 = 4.16… → 4.2 · 47 ÷ 9 = 5.222… → 5.22 · 38 ÷ 7 = 5.4285… → 5.429
  //   L5  35.8 ÷ 6 = 5.96… → 6.0 · 17.52 ÷ 7 = 2.502… → 2.50
  //   L6  87 ÷ 12 = 7.25 · 50 ÷ 11 = 4.545… → 4.55 · 20.9 ÷ 7 = 2.98… → 3.0
  shortDiv: {
    title: 'Bus Stop',
    titleVn: 'Chia ngắn',
    intro: 'Divide the short way: type each digit of the answer on top, and each remainder in the small box, up and to the left of the next digit. When the digits run out, press +0 to add a zero after the point.',
    introVn: 'Chia theo cách ngắn: nhập từng chữ số của đáp án ở phía trên, và mỗi số dư vào ô nhỏ, ở phía trên bên trái của chữ số tiếp theo. Khi hết chữ số, bấm +0 để thêm một số 0 sau dấu thập phân.',
    levels: {
      1: { en: 'Carry the remainder', vn: 'Nhớ số dư sang' },
      2: { en: 'The point is given', vn: 'Đã có sẵn dấu thập phân' },
      3: { en: 'Add zeros until it stops', vn: 'Thêm số 0 đến khi hết dư' },
      4: { en: 'Correct to: one place further', vn: 'Correct to: tính thêm một cột' },
      5: { en: 'Keep the zero', vn: 'Giữ lại số 0' },
      6: { en: 'Stories', vn: 'Bài toán có lời văn' },
    },
    items: [
      { id: 'd1', level: 1, dividend: '738', divisor: 6 },
      { id: 'd2', level: 1, dividend: '952', divisor: 7 },
      { id: 'd3', level: 1, dividend: '4608', divisor: 9 },
      { id: 'd4', level: 2, dividend: '8.52', divisor: 4 },
      { id: 'd5', level: 2, dividend: '17.4', divisor: 6 },
      { id: 'd6', level: 3, dividend: '45', divisor: 2 },
      { id: 'd7', level: 3, dividend: '5', divisor: 8 },
      { id: 'd8', level: 3, dividend: '6.3', divisor: 4 },
      { id: 'd9', level: 4, dividend: '25', divisor: 6, dp: 1 },
      { id: 'd10', level: 4, dividend: '47', divisor: 9, dp: 2 },
      { id: 'd11', level: 4, dividend: '38', divisor: 7, dp: 3 },
      { id: 'd12', level: 5, dividend: '35.8', divisor: 6, dp: 1 },
      { id: 'd13', level: 5, dividend: '17.52', divisor: 7, dp: 2 },
      {
        id: 'd14', level: 6, dividend: '87', divisor: 12,
        context: 'A box of 12 pencils costs 87 thousand dong. How many thousand dong does one pencil cost?',
        contextVn: 'Một hộp 12 cây bút chì giá 87 nghìn đồng. Một cây bút chì giá bao nhiêu nghìn đồng?',
      },
      {
        id: 'd15', level: 6, dividend: '50', divisor: 11, dp: 2,
        context: 'Mr Bowen walks 50 km in 11 days, the same distance every day. How many kilometres does he walk each day?',
        contextVn: 'Thầy Bowen đi bộ 50 km trong 11 ngày, mỗi ngày một quãng đường như nhau. Mỗi ngày thầy đi bao nhiêu ki-lô-mét?',
      },
      {
        id: 'd16', level: 6, dividend: '20.9', divisor: 7, dp: 1,
        context: 'A sack of rice has a mass of 20.9 kg. It is shared equally between 7 bags. What is the mass of rice in one bag, in kilograms?',
        contextVn: 'Một bao gạo nặng 20.9 kg. Gạo được chia đều vào 7 túi. Mỗi túi có bao nhiêu ki-lô-gam gạo?',
      },
    ],
  },

  // Quick Fire (QUICK_FIRE): rounding cards dealt fresh every attempt — 1 to 3
  // d.p., the nearest whole number, 10 and 100; one card in three carries into
  // a trailing zero.
  quickFire: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['round'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
