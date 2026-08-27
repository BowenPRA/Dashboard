// src/data/Y7_MATH/U01_1/data.js
// 1.1 Adding & Subtracting Integers — REBUILT into the full self-study format
// (ADAPTATION-PLAN §8). Six tasks at 20 XP each = 120 available, capped at 100
// by unitXPOf, so a student can drop a whole task and still finish. The quiz
// (ASSESSMENT) and the arcade (GAMES) share one gate at 80 XP.
//
// Module properties are written out in full (`notes: notes,` not `notes,`): a
// shorthand right after `realWords` makes the audio generator over-read the
// vocab array and skip all word audio (ADAPTATION-PLAN §10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { drill } from './drill.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U01_1_DATA = {
  meta: {
    id: 'U01_1',
    title: 'Adding & Subtracting Integers',
    desc: 'Add and subtract positive and negative integers on a number line, and read the English of the question.',
    track: 'Y7_MATH',
    icon: 'Hash',
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

  // Key words (ADAPTATION-PLAN §4). "difference" is the one that actually costs
  // marks — "the difference between −4 and 7" is a subtraction, and nothing on
  // the page says so.
  realWords: [
    {
      word: 'Integer', vn: 'Số nguyên',
      def: 'A whole number that can be positive, negative, or zero — never a fraction.',
      vnDef: 'Một số nguyên vẹn, có thể là dương, âm hoặc bằng không — không bao giờ là phân số.',
      sent: 'The number line shows every integer from -5 to 5.',
      vnSent: 'Trục số hiển thị mọi số nguyên từ -5 đến 5.',
      isReal: true,
    },
    {
      word: 'Positive', vn: 'Số dương',
      def: 'A number greater than zero, to the right of zero on the line.',
      vnDef: 'Một số lớn hơn không, nằm bên phải số không trên trục số.',
      sent: 'Adding a positive integer moves you right on the number line.',
      vnSent: 'Cộng một số dương làm em đi sang phải trên trục số.',
      isReal: true,
    },
    {
      word: 'Negative', vn: 'Số âm',
      def: 'A number less than zero, written with a minus sign.',
      vnDef: 'Một số nhỏ hơn không, được viết với dấu trừ.',
      sent: 'Subtracting a negative is the same as adding.',
      vnSent: 'Trừ một số âm thì giống như cộng.',
      isReal: true,
    },
    {
      word: 'Inverse', vn: 'Số đối',
      def: 'The opposite of a number; the inverse of 5 is -5.',
      vnDef: 'Số ngược dấu của một số; số đối của 5 là -5.',
      sent: 'To subtract a number, you can add its inverse.',
      vnSent: 'Để trừ một số, em có thể cộng số đối của nó.',
      isReal: true,
    },
    {
      word: 'Difference', vn: 'Hiệu',
      def: 'How far apart two numbers are on the number line; bigger minus smaller. It is never negative.',
      vnDef: 'Hai số cách nhau bao xa trên trục số; số lớn trừ số bé. Nó không bao giờ âm.',
      sent: 'The difference between -4 and 7 is 11.',
      vnSent: 'Hiệu giữa -4 và 7 là 11.',
      isReal: true,
    },
    {
      word: 'Number line', vn: 'Trục số',
      def: 'A line on which numbers are placed in order from small to large.',
      vnDef: 'Một đường thẳng trên đó các số được sắp xếp theo thứ tự từ nhỏ đến lớn.',
      sent: 'Moving right along the number line makes a value larger.',
      vnSent: 'Di chuyển sang phải trên trục số làm cho giá trị lớn hơn.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, clean
  // one-mark-per-line schemes (docs/question-quality.md). Prompts are plain text
  // — ShortAnswers.jsx does not render $…$ — with a Vietnamese `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Mr Bowen says the difference between -4 and 7 is 3. Explain what he has done wrong, and give the correct difference.',
      vnTranslation: 'Thầy Bowen nói hiệu giữa -4 và 7 là 3. Hãy giải thích thầy đã sai chỗ nào, và cho hiệu đúng.',
      suggestedWords: [['gap', 'distance'], ['sign']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for stating the difference is the gap on the number line, found by bigger minus smaller: 7 - (-4).',
        '1 mark for the correct difference of 11 (he ignored the negative sign and did 7 - 4).',
      ],
      modelAnswer: 'The difference is the gap on the number line, so it is 7 minus negative 4. He ignored the minus sign and did 7 - 4 = 3. The correct difference is 7 - (-4) = 11.',
    },
    {
      id: 'sq2',
      question: "Write a sentence in words that means the same as 8 - 5, using the word 'subtract'.",
      vnTranslation: "Viết một câu bằng lời có nghĩa giống như 8 - 5, dùng từ 'subtract'.",
      suggestedWords: [['subtract'], ['from']],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for a sentence that subtracts 5 from 8 (for example, 'subtract 5 from 8').",
        '1 mark for keeping 8 as the starting number, not swapping to subtract 8 from 5.',
      ],
      modelAnswer: 'Subtract 5 from 8, which gives 3.',
    },
    {
      id: 'sq3',
      question: 'Explain why the difference between two numbers is never negative.',
      vnTranslation: 'Hãy giải thích vì sao hiệu giữa hai số không bao giờ âm.',
      suggestedWords: [['distance', 'gap'], ['number line']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the difference is a distance or gap between the two numbers on the number line.',
        '1 mark for saying a distance is always positive (or zero), so it cannot be negative.',
      ],
      modelAnswer: 'The difference is the distance between the two numbers on the number line. A distance is always positive or zero, so a difference can never be negative.',
    },
    {
      id: 'sq4',
      question: 'The temperature is -4 degrees C and it falls by 10 degrees. What calculation do you write, and what is the answer?',
      vnTranslation: 'Nhiệt độ là -4 độ C và giảm 10 độ. Em viết phép tính gì, và đáp án là bao nhiêu?',
      suggestedWords: [['falls', 'subtract'], ['negative']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for writing -4 - 10 (falling means subtract from the starting temperature).',
        '1 mark for the answer of -14 degrees C.',
      ],
      modelAnswer: 'Falling by 10 means subtracting, so the calculation is -4 - 10. The answer is -14 degrees C.',
    },
  ],

  notes: notes,
  workbook: workbook,
  drill: drill,
  assessment: assessment,
  games: games,
};
