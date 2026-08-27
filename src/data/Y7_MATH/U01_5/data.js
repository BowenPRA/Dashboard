// src/data/Y7_MATH/U01_5/data.js
// 1.5 Tests for Divisibility — self-study unit (ADAPTATION-PLAN §8). Seven tasks
// (135 XP available), capped at 100 by unitXPOf. Factor Blitz is the extra: a
// timed factor-recognition round — each tap is a divisibility test. The quiz
// (ASSESSMENT) and the arcade (GAMES) share one gate at 80 XP.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { drill } from './drill.js';
import { factorBlitz } from './factorBlitz.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U01_5_DATA = {
  meta: {
    id: 'U01_5',
    title: 'Tests for Divisibility',
    desc: 'Test a number for many factors without dividing, and know when you must divide instead.',
    track: 'Y7_MATH',
    icon: 'ScanEye',
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 20 },
      ],
    },
    {
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 30,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'NUM_DRILL', dbKey: 'p17', maxXP: 20 },
        { id: 'FACTOR_BLITZ', dbKey: 'p18', maxXP: 15 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // Quiz and the arcade share one gate: both open at 80 XP. The arcade stays
      // 0 XP (a reward the unit unlocks, not a task paid for by it) and no longer
      // waits on the quiz being attempted — reaching 80 opens both together.
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words (ADAPTATION-PLAN §4). "divisible by / factor of / multiple of" —
  // three sentences for one fact — is what costs marks.
  realWords: [
    {
      word: 'Divisible', vn: 'Chia hết',
      def: 'Divides exactly, with nothing left over. 42 is divisible by 6.',
      vnDef: 'Chia ra đúng, không dư gì. 42 chia hết cho 6.',
      sent: 'A number is divisible by 5 if its last digit is 0 or 5.',
      vnSent: 'Một số chia hết cho 5 nếu chữ số cuối là 0 hoặc 5.',
      isReal: true,
    },
    {
      word: 'Remainder', vn: 'Số dư',
      def: 'What is left over after a division that does not divide exactly.',
      vnDef: 'Phần còn lại sau một phép chia không chia hết.',
      sent: 'When you divide 3960 by 7 the remainder is 5, so it is not divisible by 7.',
      vnSent: 'Khi chia 3960 cho 7, số dư là 5, nên nó không chia hết cho 7.',
      isReal: true,
    },
    {
      word: 'Digit', vn: 'Chữ số',
      def: 'A single number symbol from 0 to 9. The number 3960 has four digits.',
      vnDef: 'Một ký hiệu số đơn từ 0 đến 9. Số 3960 có bốn chữ số.',
      sent: 'The last digit of 250 is 0.',
      vnSent: 'Chữ số cuối của 250 là 0.',
      isReal: true,
    },
    {
      word: 'Digit sum', vn: 'Tổng các chữ số',
      def: 'The total you get by adding all the digits of a number.',
      vnDef: 'Tổng em nhận được khi cộng tất cả các chữ số của một số.',
      sent: 'The digit sum of 4725 is 4 + 7 + 2 + 5 = 18.',
      vnSent: 'Tổng các chữ số của 4725 là 4 + 7 + 2 + 5 = 18.',
      isReal: true,
    },
    {
      word: 'Divisibility test', vn: 'Dấu hiệu chia hết',
      def: 'A quick check that tells you yes or no without doing the division.',
      vnDef: 'Cách kiểm tra nhanh cho biết có hay không mà không cần chia.',
      sent: 'The divisibility test for 3 is to add the digits.',
      vnSent: 'Dấu hiệu chia hết cho 3 là cộng các chữ số.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, clean
  // one-mark-per-line schemes. Prompts plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: "Write a sentence that means the same as '24 is divisible by 6', using the word 'factor'.",
      vnTranslation: "Viết một câu có nghĩa giống '24 is divisible by 6', dùng từ 'factor'.",
      suggestedWords: [['factor']],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for a sentence using 'factor' correctly, e.g. '6 is a factor of 24'.",
        '1 mark for keeping the relationship the right way round (6 divides into 24, not 24 into 6).',
      ],
      modelAnswer: '6 is a factor of 24.',
    },
    {
      id: 'sq2',
      question: 'Explain the test for divisibility by 9, then use it to decide whether 522 is divisible by 9.',
      vnTranslation: 'Hãy giải thích dấu hiệu chia hết cho 9, rồi dùng nó để xem 522 có chia hết cho 9 không.',
      suggestedWords: [['add', 'digits'], ['multiple']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for stating the test: add the digits, and if the sum is a multiple of 9 the number is divisible by 9.',
        '1 mark for applying it: 5 + 2 + 2 = 9, which is a multiple of 9, so 522 is divisible by 9.',
      ],
      modelAnswer: 'To test for 9, add the digits: if the sum is a multiple of 9, the number is divisible by 9. For 522, 5 + 2 + 2 = 9, which is a multiple of 9, so 522 is divisible by 9.',
    },
    {
      id: 'sq3',
      question: 'Explain why the test for divisibility by 6 is really two tests, using 10 as your example.',
      vnTranslation: 'Hãy giải thích vì sao dấu hiệu chia hết cho 6 thật ra là hai dấu hiệu, dùng 10 làm ví dụ.',
      suggestedWords: [['both'], ['2', '3']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying 6 = 2 × 3, so a number must divide by both 2 and 3 to divide by 6.',
        '1 mark for the example: 10 is even (passes 2) but its digits add to 1 (fails 3), so 10 does not divide by 6.',
      ],
      modelAnswer: 'Because 6 = 2 × 3, a number divides by 6 only if it divides by both 2 and 3. For example, 10 is even so it passes the 2 test, but its digits add to 1, which is not a multiple of 3, so it fails the 3 test and does not divide by 6.',
    },
    {
      id: 'sq4',
      question: 'There is no simple test for divisibility by 7. What do you do instead, and how do you read the result?',
      vnTranslation: 'Không có dấu hiệu đơn giản cho phép chia hết cho 7. Em làm gì thay vào đó, và đọc kết quả thế nào?',
      suggestedWords: [['divide'], ['remainder']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying you divide the number by 7.',
        '1 mark for saying a remainder of 0 means it is divisible by 7, and any other remainder means it is not.',
      ],
      modelAnswer: 'Instead of a test, you divide the number by 7. If the remainder is 0, the number is divisible by 7; if there is any other remainder, it is not.',
    },
  ],

  notes: notes,
  workbook: workbook,
  drill: drill,
  factorBlitz: factorBlitz,
  assessment: assessment,
  games: games,
};
