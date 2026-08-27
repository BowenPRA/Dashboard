// src/data/Y7_MATH/U01_4/data.js
// 1.4 Highest Common Factors — self-study unit (ADAPTATION-PLAN §8). Seven tasks
// (135 XP available), capped at 100 by unitXPOf. Factor Blitz is the extra: a
// timed factor-recognition round, the HCF method at speed. The quiz (ASSESSMENT)
// and the arcade (GAMES) share one gate at 80 XP.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { drill } from './drill.js';
import { factorBlitz } from './factorBlitz.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U01_4_DATA = {
  meta: {
    id: 'U01_4',
    title: 'Highest Common Factors',
    desc: 'Find the highest common factor of two numbers by listing, and tell a factor from a multiple.',
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

  // Key words (ADAPTATION-PLAN §4). "factor vs multiple" is the pair that costs
  // marks — one list stops, the other never does.
  realWords: [
    {
      word: 'Factor', vn: 'Ước số',
      def: 'A number that divides into another number exactly, with nothing left over.',
      vnDef: 'Một số chia hết vào một số khác, không để lại số dư.',
      sent: 'The factors of 12 are 1, 2, 3, 4, 6 and 12.',
      vnSent: 'Các ước số của 12 là 1, 2, 3, 4, 6 và 12.',
      isReal: true,
    },
    {
      word: 'Common factor', vn: 'Ước số chung',
      def: 'A number that is a factor of both numbers — in both lists.',
      vnDef: 'Một số là ước của cả hai số — có trong cả hai danh sách.',
      sent: 'The common factors of 12 and 18 are 1, 2, 3 and 6.',
      vnSent: 'Ước số chung của 12 và 18 là 1, 2, 3 và 6.',
      isReal: true,
    },
    {
      word: 'Highest common factor', vn: 'Ước số chung lớn nhất',
      def: 'The biggest number that is a factor of both numbers; also called the HCF.',
      vnDef: 'Số lớn nhất là ước của cả hai số; còn gọi là ƯCLN.',
      sent: 'The highest common factor of 12 and 18 is 6.',
      vnSent: 'Ước số chung lớn nhất của 12 và 18 là 6.',
      isReal: true,
    },
    {
      word: 'Consecutive', vn: 'Liên tiếp',
      def: 'Following one after the other when you count; 6 and 7 are consecutive.',
      vnDef: 'Đứng ngay sau nhau khi đếm; 6 và 7 là hai số liên tiếp.',
      sent: 'The numbers 20 and 21 are consecutive.',
      vnSent: 'Hai số 20 và 21 là hai số liên tiếp.',
      isReal: true,
    },
    {
      word: 'Conjecture', vn: 'Phỏng đoán',
      def: 'Something you think is true from a pattern you have seen, before it is proved.',
      vnDef: 'Điều em cho là đúng dựa trên một quy luật đã thấy, trước khi được chứng minh.',
      sent: 'Our conjecture is that consecutive numbers have an HCF of 1.',
      vnSent: 'Phỏng đoán của chúng ta là hai số liên tiếp có ƯCLN bằng 1.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, clean
  // one-mark-per-line schemes. Prompts plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between a factor of 12 and a multiple of 12.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa một ước số của 12 và một bội số của 12.',
      suggestedWords: [['divides', 'into'], ['land', 'count']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying a factor divides into 12 exactly (it is smaller than or equal to 12; the list stops).',
        '1 mark for saying a multiple is what you land on counting up in 12 (it is bigger than or equal to 12; the list never stops).',
      ],
      modelAnswer: 'A factor of 12 divides into 12 exactly, like 1, 2, 3, 4, 6 and 12, and the list stops. A multiple of 12 is a number you land on counting up, like 12, 24, 36, and the list never stops.',
    },
    {
      id: 'sq2',
      question: 'Explain why we ask for the LOWEST common multiple but the HIGHEST common factor.',
      vnTranslation: 'Hãy giải thích vì sao ta hỏi bội số chung NHỎ NHẤT nhưng ước số chung LỚN NHẤT.',
      suggestedWords: [['never stop', 'for ever'], ['stop']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying multiples go on for ever, so there is no highest one to ask for (so we ask for the lowest).',
        '1 mark for saying factors stop at the number itself, so there is a highest one to ask for.',
      ],
      modelAnswer: 'Multiples of a number go on for ever, so there is no highest common multiple to ask for, which is why we ask for the lowest. Factors stop at the number itself, so there is a highest common factor to ask for.',
    },
    {
      id: 'sq3',
      question: "Mr Bowen says the HCF of 8 and 9 is 'none' because they share no factors. What has he done wrong?",
      vnTranslation: "Thầy Bowen nói ƯCLN của 8 và 9 là 'không có' vì chúng không có ước số chung. Thầy đã sai chỗ nào?",
      suggestedWords: [['every number'], ['always']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for stating that 1 is a factor of every number.',
        '1 mark for concluding that two numbers always have a common factor, so the HCF of 8 and 9 is 1, not "none".',
      ],
      modelAnswer: 'He is wrong because 1 is a factor of every number. That means two numbers always have at least one common factor, so the HCF of 8 and 9 is 1, not "none".',
    },
    {
      id: 'sq4',
      question: 'Show how to use the highest common factor to write the fraction 18/24 in its simplest form.',
      vnTranslation: 'Hãy chỉ cách dùng ước số chung lớn nhất để viết phân số 18/24 ở dạng tối giản.',
      suggestedWords: [['divide'], ['top', 'bottom']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for finding that the HCF of 18 and 24 is 6.',
        '1 mark for dividing top and bottom by 6 to get 3/4.',
      ],
      modelAnswer: 'The HCF of 18 and 24 is 6. Divide the top and the bottom by 6: 18 divided by 6 is 3, and 24 divided by 6 is 4, so the fraction is 3/4.',
    },
  ],

  notes: notes,
  workbook: workbook,
  drill: drill,
  factorBlitz: factorBlitz,
  assessment: assessment,
  games: games,
};
