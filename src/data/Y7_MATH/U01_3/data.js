// src/data/Y7_MATH/U01_3/data.js
// 1.3 Lowest Common Multiples — self-study unit (ADAPTATION-PLAN §8). Six tasks
// at 20 XP each = 120 available, capped at 100 by unitXPOf. The quiz
// (ASSESSMENT) and the arcade (GAMES) share one gate at 80 XP.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { drill } from './drill.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U01_3_DATA = {
  meta: {
    id: 'U01_3',
    title: 'Lowest Common Multiples',
    desc: 'Find the lowest common multiple of two numbers by listing, and learn the English: common means shared.',
    track: 'Y7_MATH',
    icon: 'Boxes',
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

  // Key words (ADAPTATION-PLAN §4). "common" is the one that costs marks —
  // everyday English says ordinary; maths says shared.
  realWords: [
    {
      word: 'Multiple', vn: 'Bội số',
      def: 'The answer when you multiply a number by 1, 2, 3, 4, and so on.',
      vnDef: 'Kết quả khi em nhân một số với 1, 2, 3, 4, và tiếp tục.',
      sent: 'The multiples of 4 are 4, 8, 12, 16, and so on.',
      vnSent: 'Các bội số của 4 là 4, 8, 12, 16, và tiếp tục.',
      isReal: true,
    },
    {
      word: 'Common', vn: 'Chung',
      def: 'In maths, shared — belonging to both. It does not mean ordinary here.',
      vnDef: 'Trong toán, nghĩa là chung — thuộc về cả hai. Ở đây nó không có nghĩa là bình thường.',
      sent: 'A common multiple is in both lists at once.',
      vnSent: 'Một bội số chung có trong cả hai danh sách cùng lúc.',
      isReal: true,
    },
    {
      word: 'Common multiple', vn: 'Bội số chung',
      def: 'A number that is a multiple of both numbers — in both lists.',
      vnDef: 'Một số là bội của cả hai số — có trong cả hai danh sách.',
      sent: 'The common multiples of 4 and 6 are 12, 24, 36.',
      vnSent: 'Các bội số chung của 4 và 6 là 12, 24, 36.',
      isReal: true,
    },
    {
      word: 'Lowest common multiple', vn: 'Bội số chung nhỏ nhất',
      def: 'The smallest number that is a multiple of both numbers; also called the LCM.',
      vnDef: 'Số nhỏ nhất là bội của cả hai số; còn gọi là BCNN.',
      sent: 'The lowest common multiple of 4 and 6 is 12.',
      vnSent: 'Bội số chung nhỏ nhất của 4 và 6 là 12.',
      isReal: true,
    },
    {
      word: 'Factor', vn: 'Ước số',
      def: 'A number that divides exactly into another number. Do not mix it up with a multiple.',
      vnDef: 'Một số chia hết vào một số khác. Đừng nhầm nó với bội số.',
      sent: '2 is a factor of 6, but 12 is a multiple of 6.',
      vnSent: '2 là ước số của 6, còn 12 là bội số của 6.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, clean
  // one-mark-per-line schemes. Prompts plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain why the lowest common multiple of 4 and 6 is 12 and not 24.',
      vnTranslation: 'Hãy giải thích vì sao bội số chung nhỏ nhất của 4 và 6 là 12 chứ không phải 24.',
      suggestedWords: [['lowest', 'smallest'], ['both']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for stating that 12 and 24 are both common multiples of 4 and 6 (in both lists).',
        '1 mark for stating that 12 is the lowest of them, so it is the LCM (24 is a common multiple but not the lowest).',
      ],
      modelAnswer: 'Both 12 and 24 are common multiples of 4 and 6 because they are in both lists. But 12 is the smallest one, so 12 is the lowest common multiple. 24 is a common multiple but not the lowest.',
    },
    {
      id: 'sq2',
      question: "What does the word 'common' mean in 'common multiple'? Give an example of a common multiple of 2 and 3.",
      vnTranslation: "Từ 'common' trong 'common multiple' nghĩa là gì? Cho một ví dụ về bội số chung của 2 và 3.",
      suggestedWords: [['shared', 'both'], ['list']],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for saying 'common' means shared / a multiple of both numbers (in both lists), not ordinary.",
        '1 mark for a correct common multiple of 2 and 3, such as 6 (or 12, 18, …).',
      ],
      modelAnswer: 'In maths, common means shared, so a common multiple is a number that is a multiple of both numbers. A common multiple of 2 and 3 is 6.',
    },
    {
      id: 'sq3',
      question: 'Mr Bowen says the LCM of 3 and 5 is 15, and the LCM of 4 and 8 is 32. One is right and one is wrong. Which is wrong, and why?',
      vnTranslation: 'Thầy Bowen nói BCNN của 3 và 5 là 15, và BCNN của 4 và 8 là 32. Một câu đúng và một câu sai. Câu nào sai, và vì sao?',
      suggestedWords: [['divides'], ['bigger', 'larger']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for identifying that the LCM of 4 and 8 is wrong (it should be 8, not 32).',
        '1 mark for explaining that 4 divides into 8, so the LCM is just the bigger number 8; multiplying only works for 3 and 5 because they share no factor.',
      ],
      modelAnswer: 'The LCM of 4 and 8 is wrong. Because 4 divides into 8, the LCM is just the bigger number, 8, not 32. Multiplying worked for 3 and 5 only because they share no common factor.',
    },
    {
      id: 'sq4',
      question: 'Write, in your own words, the steps for finding the lowest common multiple of two numbers.',
      vnTranslation: 'Hãy viết, bằng lời của em, các bước để tìm bội số chung nhỏ nhất của hai số.',
      suggestedWords: [['list', 'multiples'], ['both', 'lowest']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying to list the multiples of each number.',
        '1 mark for saying to find the numbers in both lists and take the lowest one.',
      ],
      modelAnswer: 'First, list the multiples of each number. Then find the numbers that appear in both lists. The lowest common multiple is the smallest number that is in both lists.',
    },
  ],

  notes: notes,
  workbook: workbook,
  drill: drill,
  assessment: assessment,
  games: games,
};
