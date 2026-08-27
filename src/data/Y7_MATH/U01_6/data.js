// src/data/Y7_MATH/U01_6/data.js
// 1.6 Square Roots and Cube Roots — self-study unit (ADAPTATION-PLAN §8). Six
// tasks at 20 XP each = 120 available, capped at 100 by unitXPOf. The quiz
// (ASSESSMENT) and the arcade (GAMES) share one gate at 80 XP.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { drill } from './drill.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U01_6_DATA = {
  meta: {
    id: 'U01_6',
    title: 'Square Roots and Cube Roots',
    desc: 'Square and cube numbers, and find square roots and cube roots — squaring goes out, rooting comes back.',
    track: 'Y7_MATH',
    icon: 'Grid3x3',
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

  // Key words (ADAPTATION-PLAN §4). "consecutive" is the one that costs marks —
  // the exercise uses it and the book never defines it.
  realWords: [
    {
      word: 'Square number', vn: 'Số chính phương',
      def: 'What you get when a number is multiplied by itself. 25 is a square number.',
      vnDef: 'Kết quả khi một số được nhân với chính nó. 25 là một số chính phương.',
      sent: 'Five squared is a square number: 5 times 5 is 25.',
      vnSent: 'Năm bình phương là một số chính phương: 5 nhân 5 bằng 25.',
      isReal: true,
    },
    {
      word: 'Square root', vn: 'Căn bậc hai',
      def: 'The number that was multiplied by itself. The square root of 225 is 15.',
      vnDef: 'Số đã được nhân với chính nó. Căn bậc hai của 225 là 15.',
      sent: 'The square root of 144 is 12, because 12 times 12 is 144.',
      vnSent: 'Căn bậc hai của 144 là 12, vì 12 nhân 12 bằng 144.',
      isReal: true,
    },
    {
      word: 'Cube number', vn: 'Số lập phương',
      def: 'What you get when a number is multiplied by itself twice. 8 is a cube number.',
      vnDef: 'Kết quả khi một số được nhân với chính nó hai lần. 8 là một số lập phương.',
      sent: 'Two cubed is a cube number: 2 times 2 times 2 is 8.',
      vnSent: 'Hai lập phương là một số lập phương: 2 nhân 2 nhân 2 bằng 8.',
      isReal: true,
    },
    {
      word: 'Cube root', vn: 'Căn bậc ba',
      def: 'The number that was multiplied by itself twice. The cube root of 125 is 5.',
      vnDef: 'Số đã được nhân với chính nó hai lần. Căn bậc ba của 125 là 5.',
      sent: 'The cube root of 64 is 4, because 4 times 4 times 4 is 64.',
      vnSent: 'Căn bậc ba của 64 là 4, vì 4 nhân 4 nhân 4 bằng 64.',
      isReal: true,
    },
    {
      word: 'Consecutive', vn: 'Liên tiếp',
      def: 'One after another, with nothing missed out. 25 and 36 are consecutive square numbers.',
      vnDef: 'Cái này nối tiếp cái kia, không bỏ sót. 25 và 36 là hai số chính phương liên tiếp.',
      sent: 'The square numbers 49 and 64 are consecutive.',
      vnSent: 'Hai số chính phương 49 và 64 là liên tiếp.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, clean
  // one-mark-per-line schemes. Prompts plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between "5 squared" and "5 times 2", and give both answers.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa "5 squared" (5 bình phương) và "5 times 2" (5 nhân 2), và cho cả hai đáp án.',
      suggestedWords: [['itself'], ['multiply']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying 5 squared means 5 multiplied by itself, 5 times 5, which is 25.',
        '1 mark for saying 5 times 2 is 10 — the small 2 in 5 squared counts how many 5s, it is not a number to multiply by.',
      ],
      modelAnswer: 'Five squared means 5 multiplied by itself, so 5 times 5, which is 25. Five times 2 is 10. The small 2 in 5 squared tells you how many 5s to multiply, not to multiply by 2.',
    },
    {
      id: 'sq2',
      question: 'What is a square root? Use the square root of 49 as your example.',
      vnTranslation: 'Căn bậc hai là gì? Dùng căn bậc hai của 49 làm ví dụ.',
      suggestedWords: [['itself', 'squared']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the square root is the number that was multiplied by itself (squared) to give the number.',
        '1 mark for the example: the square root of 49 is 7, because 7 times 7 is 49.',
      ],
      modelAnswer: 'A square root is the number that was multiplied by itself to make the number. The square root of 49 is 7, because 7 times 7 is 49.',
    },
    {
      id: 'sq3',
      question: 'The square root of 50 is not a whole number. Explain how you know which two whole numbers it lies between.',
      vnTranslation: 'Căn bậc hai của 50 không phải số nguyên. Hãy giải thích làm sao em biết nó nằm giữa hai số nguyên nào.',
      suggestedWords: [['between'], ['square numbers']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for finding the square numbers either side of 50: 49 (7 squared) and 64 (8 squared).',
        '1 mark for concluding that the square root of 50 lies between 7 and 8.',
      ],
      modelAnswer: '50 lies between the square numbers 49 and 64. Since 49 is 7 squared and 64 is 8 squared, the square root of 50 lies between 7 and 8.',
    },
    {
      id: 'sq4',
      question: 'Explain why 64 is both a square number and a cube number.',
      vnTranslation: 'Hãy giải thích vì sao 64 vừa là số chính phương vừa là số lập phương.',
      suggestedWords: [['itself'], ['twice']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for showing 64 is a square number: 8 times 8 is 64.',
        '1 mark for showing 64 is a cube number: 4 times 4 times 4 is 64.',
      ],
      modelAnswer: '64 is a square number because 8 times 8 is 64. It is also a cube number because 4 times 4 times 4 is 64.',
    },
  ],

  notes: notes,
  workbook: workbook,
  drill: drill,
  assessment: assessment,
  games: games,
};
