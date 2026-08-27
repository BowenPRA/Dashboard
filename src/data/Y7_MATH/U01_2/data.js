// src/data/Y7_MATH/U01_2/data.js
// 1.2 Multiplying & Dividing Integers — see docs/y7-math/ADAPTATION-PLAN.md.
//
// Six tasks at 20 XP each = 120 available, capped at 100 by unitXPOf, so a
// student can drop a whole task and still finish (ADAPTATION-PLAN §6). The quiz
// (ASSESSMENT) and the arcade (GAMES) share one gate at 80 XP.
//
// NOTE the module properties are written out in full (`notes: notes,` not
// `notes,`). A shorthand property right after `realWords` makes the audio
// generator over-read the vocab array and silently skip all word audio
// (ADAPTATION-PLAN §10.1) — so every one is spelled out.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { drill } from './drill.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U01_2_DATA = {
  meta: {
    id: 'U01_2',
    title: 'Multiplying & Dividing Integers',
    desc: 'Multiply and divide positive and negative integers, and know when “two negatives make a positive”.',
    track: 'Y7_MATH',
    icon: 'Calculator',
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

  // Key words (ADAPTATION-PLAN §4): the words a Vietnamese student needs in
  // order to READ the question. "product" is the one that actually costs marks —
  // the book says "find the product" and means ×.
  realWords: [
    {
      word: 'Product', vn: 'Tích',
      def: 'The answer you get when you multiply two numbers together.',
      vnDef: 'Kết quả em nhận được khi nhân hai số với nhau.',
      sent: 'Find the product of 2 and -9.',
      vnSent: 'Tìm tích của 2 và -9.',
      isReal: true,
    },
    {
      word: 'Multiply', vn: 'Nhân',
      def: 'To add a number to itself a given number of times; the sign for it is ×.',
      vnDef: 'Cộng một số với chính nó một số lần cho trước; dấu của nó là ×.',
      sent: 'Multiply -7 by 4 to get -28.',
      vnSent: 'Nhân -7 với 4 để được -28.',
      isReal: true,
    },
    {
      word: 'Divide', vn: 'Chia',
      def: 'To share a number into equal parts; the sign for it is ÷.',
      vnDef: 'Chia một số thành các phần bằng nhau; dấu của nó là ÷.',
      sent: 'Divide -20 by 4 to get -5.',
      vnSent: 'Chia -20 cho 4 để được -5.',
      isReal: true,
    },
    {
      word: 'Quotient', vn: 'Thương',
      def: 'The answer you get when you divide one number by another.',
      vnDef: 'Kết quả em nhận được khi chia một số cho một số khác.',
      sent: 'The quotient of -56 and 8 is -7.',
      vnSent: 'Thương của -56 và 8 là -7.',
      isReal: true,
    },
    {
      word: 'Brackets', vn: 'Dấu ngoặc',
      def: 'The curved marks ( ) around a part of a calculation you must work out first.',
      vnDef: 'Các dấu cong ( ) bao quanh phần phép tính mà em phải tính trước.',
      sent: 'Work out the brackets first: 20 ÷ (-3 + -2).',
      vnSent: 'Tính trong dấu ngoặc trước: 20 ÷ (-3 + -2).',
      isReal: true,
    },
    {
      word: 'Estimate', vn: 'Ước lượng',
      def: 'A quick, rough answer you work out before the real one, to check it.',
      vnDef: 'Một đáp án nhanh và thô mà em tính trước đáp án thật, để kiểm tra nó.',
      sent: 'Estimate -4.1 × 2.8 by rounding to -4 × 3.',
      vnSent: 'Ước lượng -4.1 × 2.8 bằng cách làm tròn thành -4 × 3.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, each a clean
  // one-mark-per-line scheme (docs/question-quality.md). Prompts are plain text
  // — ShortAnswers.jsx does not render $…$ — with a Vietnamese `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Mr Bowen writes -3 × -4 = -12. Explain what he has done wrong, and give the correct answer.',
      vnTranslation: 'Thầy Bowen viết -3 × -4 = -12. Hãy giải thích thầy đã sai chỗ nào, và cho đáp án đúng.',
      suggestedWords: [['sign'], ['multiply', 'times']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for stating that a negative multiplied by a negative gives a positive.',
        '1 mark for giving the correct answer of 12.',
      ],
      modelAnswer: 'He kept the answer negative, but a negative multiplied by a negative gives a positive. The correct answer is 12.',
    },
    {
      id: 'sq2',
      question: "Write a sentence in words that means the same as -20 ÷ 4, using the word 'divided'.",
      vnTranslation: "Viết một câu bằng lời có nghĩa giống như -20 ÷ 4, dùng từ 'divided'.",
      suggestedWords: [['divided'], ['quotient']],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for a sentence that divides -20 by 4 (for example, 'negative twenty divided by four').",
        '1 mark for keeping -20 as the number being divided, not swapping the order to 4 divided by -20.',
      ],
      modelAnswer: 'Negative twenty divided by four gives negative five.',
    },
    {
      id: 'sq3',
      question: "Explain why 'two negatives make a positive' is true for -3 × -4 but not true for -3 + -4.",
      vnTranslation: "Hãy giải thích vì sao 'two negatives make a positive' đúng với -3 × -4 nhưng không đúng với -3 + -4.",
      suggestedWords: [['multiply', 'times'], ['add', 'addition']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for stating that for multiplication two negatives give a positive, so -3 × -4 = 12.',
        '1 mark for stating that for addition, adding a negative goes more negative, so -3 + -4 = -7.',
      ],
      modelAnswer: 'For multiplication, two negatives make a positive, so -3 × -4 = 12. But adding a negative makes a number more negative, so -3 + -4 = -7. The rule only works for multiplying and dividing.',
    },
    {
      id: 'sq4',
      question: 'In the calculation 20 ÷ (-3 + -2), which part do you work out first, and why?',
      vnTranslation: 'Trong phép tính 20 ÷ (-3 + -2), em tính phần nào trước, và vì sao?',
      suggestedWords: [['brackets'], ['order']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for stating that you work out the bracket first.',
        '1 mark for explaining the bracket is an addition, so -3 + -2 = -5 (not +5).',
      ],
      modelAnswer: 'You work out the bracket first. Inside it is an addition, so -3 + -2 = -5, and then you divide 20 by -5 to get -4.',
    },
  ],

  notes: notes,
  workbook: workbook,
  drill: drill,
  assessment: assessment,
  games: games,
};
