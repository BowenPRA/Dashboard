// src/data/Y7_MATH/U02_4/data.js
// 2.4 Expanding Brackets — self-study unit, the algebra-engines shape
// (docs/y7-math/algebra-engines.md §1): an interactive deck, the key words,
// a mixed-widget Practice workbook, Expand It (EXPAND_GRID), Algebra Pyramids
// (ALG_PYRAMID), four reasoning questions, then the quiz and the arcade.
// 135 XP available, capped at 100. Gates: 25 of 35 (71%) and 80 of 115 (70%),
// both under the 80% rule. WORKBOOK_B is retired: Expand It rehearses the
// exercise's shapes with fresh numbers.
//
// Every Expand It item states only the QUESTION. utils/algebra.js derives the
// grid boxes, the expansion, the collected answer and the name of each slip,
// and the validator runs the same functions on every item.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (ADAPTATION-PLAN §10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U02_4_DATA = {
  meta: {
    id: 'U02_4',
    title: 'Expanding Brackets',
    desc: 'Multiply every term inside the brackets by the number outside — take the sign with it, know when to stop, then expand and simplify.',
    track: 'Y7_MATH',
    icon: 'Sigma',
    classroom: [{ course: 'y7-math', slug: 'U02_4', title: 'Maths 2.4 · Expanding Brackets' }],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 15 },
      ],
    },
    {
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'EXPAND_GRID', dbKey: 'p40', maxXP: 25 },
        { id: 'ALG_PYRAMID', dbKey: 'p42', maxXP: 15 },
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

  // Key words: the workbook's two (brackets, expand), the deck's third
  // (multiply out — the exercise switches to it without warning), and the
  // three from 2.3 that "expand and simplify" leans on.
  realWords: [
    {
      word: 'Brackets', vn: 'Dấu ngoặc',
      def: 'The marks ( ). A number written right next to a bracket means multiply: 4(10 + 6) means 4 times (10 + 6).',
      vnDef: 'Các dấu ( ). Một con số viết sát dấu ngoặc nghĩa là nhân: 4(10 + 6) nghĩa là 4 nhân (10 + 6).',
      sent: 'In 5(a + 3), the brackets hold two terms, a and 3.',
      vnSent: 'Trong 5(a + 3), dấu ngoặc chứa hai hạng tử, a và 3.',
      isReal: true,
    },
    {
      word: 'Expand', vn: 'Khai triển',
      def: 'To multiply every term inside the brackets by the number outside. The value does not get bigger; only the writing gets longer.',
      vnDef: 'Nhân mọi hạng tử bên trong ngoặc với số bên ngoài. Giá trị không lớn hơn; chỉ có cách viết dài ra.',
      sent: 'Expand 5(a + 3) and you get 5a plus 15.',
      vnSent: 'Khai triển 5(a + 3) thì được 5a cộng 15.',
      isReal: true,
    },
    {
      word: 'Multiply out', vn: 'Nhân phá ngoặc',
      def: 'The same instruction as expand, in different words: multiply each term inside the brackets by the number outside.',
      vnDef: 'Cùng một yêu cầu như khai triển, nói bằng từ khác: nhân mỗi hạng tử bên trong ngoặc với số bên ngoài.',
      sent: 'Multiply out 4(3 minus c) to get 12 minus 4c.',
      vnSent: 'Nhân phá ngoặc 4(3 trừ c) thì được 12 trừ 4c.',
      isReal: true,
    },
    {
      word: 'Term', vn: 'Hạng tử',
      def: 'One part of an expression. The plus and minus signs separate the terms, and each term keeps the sign in front of it.',
      vnDef: 'Một phần của biểu thức. Các dấu cộng và trừ ngăn cách các hạng tử, và mỗi hạng tử giữ dấu đứng trước nó.',
      sent: 'In x minus 2, the second term is minus 2.',
      vnSent: 'Trong x trừ 2, hạng tử thứ hai là trừ 2.',
      isReal: true,
    },
    {
      word: 'Like terms', vn: 'Hạng tử đồng dạng',
      def: 'Terms with exactly the same letters, such as 3x and 4x. A number and a letter term are not like terms.',
      vnDef: 'Các hạng tử có chữ cái giống hệt nhau, như 3x và 4x. Một con số và một hạng tử chứa chữ cái không phải hạng tử đồng dạng.',
      sent: '12 and 4c are not like terms, so 12 minus 4c is already finished.',
      vnSent: '12 và 4c không phải hạng tử đồng dạng, nên 12 trừ 4c đã xong rồi.',
      isReal: true,
    },
    {
      word: 'Simplify', vn: 'Rút gọn',
      def: 'To write an expression in a shorter way by collecting the like terms. Expand and simplify means expand first, then collect.',
      vnDef: 'Viết một biểu thức gọn hơn bằng cách gộp các hạng tử đồng dạng. Khai triển rồi rút gọn nghĩa là khai triển trước, rồi gộp.',
      sent: 'Expand and simplify 3(x + 2) + 4x to get 7x plus 6.',
      vnSent: 'Khai triển rồi rút gọn 3(x + 2) + 4x thì được 7x cộng 6.',
      isReal: true,
    },
  ],

  // Expand It (docs/y7-math/algebra-engines.md §2.2). The ladder: positive →
  // the number first → a minus inside → a number times a letter → three terms
  // → expand and simplify → two brackets (one with a minus in front) → work
  // backwards. Numbers are fresh: not the deck's, and not the Workbook
  // exercise's (that is the classroom homework).
  expandGrid: {
    title: 'Expand It',
    titleVn: 'Khai triển',
    intro: 'One box, one multiplication: the number outside times each term inside, sign included. Then write the expansion.',
    introVn: 'Một ô, một phép nhân: số bên ngoài nhân với mỗi hạng tử bên trong, tính cả dấu. Rồi viết kết quả khai triển.',
    levels: {
      1: { en: 'Every term', vn: 'Mọi hạng tử' },
      2: { en: 'The number first', vn: 'Số đứng trước' },
      3: { en: 'A minus inside', vn: 'Dấu trừ bên trong' },
      4: { en: 'A number times a letter', vn: 'Số nhân với hạng tử có chữ' },
      5: { en: 'Three terms', vn: 'Ba hạng tử' },
      6: { en: 'Expand and simplify', vn: 'Khai triển rồi rút gọn' },
      7: { en: 'Two brackets', vn: 'Hai dấu ngoặc' },
      8: { en: 'Work backwards', vn: 'Làm ngược lại' },
    },
    items: [
      { id: 'e1', level: 1, expr: '4(a + 6)' },
      { id: 'e2', level: 1, expr: '7(m + 2)' },
      { id: 'e3', level: 2, expr: '6(5 + k)' },
      { id: 'e4', level: 2, expr: '3(8 + t)' },
      { id: 'e5', level: 3, expr: '5(n − 7)' },
      { id: 'e6', level: 3, expr: '9(2 − h)' },
      { id: 'e7', level: 4, expr: '3(4p + 5)' },
      { id: 'e8', level: 4, expr: '6(2r − 3)' },
      { id: 'e9', level: 5, expr: '4(5a − 2b + 3)' },
      { id: 'e10', level: 5, expr: '2(7 + 3x − 4y)' },
      { id: 'e11', level: 6, expr: '3(2x + 5) + 4x' },
      { id: 'e12', level: 6, expr: '2(4w − 1) − 3w + 9' },
      { id: 'e13', level: 7, expr: '3(x + 5) + 2(x + 4)' },
      { id: 'e14', level: 7, expr: '6(y + 3) − 2(y + 5)' },
      { id: 'e15', level: 8, kind: 'missing', expr: '6(3x + 2)', hide: ['outer'] },
      { id: 'e16', level: 8, kind: 'missing', expr: '4(5y − 3)', hide: ['inner:1'] },
      { id: 'e17', level: 8, kind: 'missing', expr: '7(2m + 5)', hide: ['outer', 'inner:1'] },
    ],
  },

  // Algebra Pyramids, generated fresh every attempt (utils/pyramid.js): the
  // bottom blocks hold brackets to expand, then a plain build-up round.
  pyramids: { title: 'Algebra Pyramids', titleVn: 'Kim tự tháp đại số', modes: ['brackets', 'up'], rounds: 6 },

  // Short Answers: four reasoning questions on the deck's four walls, one mark
  // per scheme line. Prompts plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Nam says that 5(a + 3) = 5a + 3. Explain his mistake and give the correct expansion.',
      vnTranslation: 'Nam nói rằng 5(a + 3) = 5a + 3. Hãy giải thích lỗi của bạn ấy và cho kết quả khai triển đúng.',
      suggestedWords: [['every', 'each'], ['multiply', 'multiplied'], ['15']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the 5 must multiply every (each) term inside the brackets, and Nam only multiplied the first term — the 3 was not multiplied.',
        '1 mark for the correct expansion: 5(a + 3) = 5a + 15, because 5 × 3 = 15.',
      ],
      modelAnswer: 'Expanding means multiplying every term inside the brackets by the number outside. Nam multiplied the a by 5 but did not multiply the 3. The 3 is inside the brackets too, so 5 × 3 = 15, and the correct expansion is 5a + 15.',
    },
    {
      id: 'sq2',
      question: 'Explain why 4(3 − c) = 12 − 4c is already finished, and why writing 12 − 4c = 8c is wrong.',
      vnTranslation: 'Hãy giải thích vì sao 4(3 − c) = 12 − 4c đã là đáp án cuối cùng, và vì sao viết 12 − 4c = 8c là sai.',
      suggestedWords: [['like terms', 'not like terms'], ['number', 'letter'], ['collect', 'combine']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying 12 and 4c are not like terms (12 is a number and 4c is a c term), so they cannot be collected and 12 − 4c is finished.',
        '1 mark for explaining that 8c is wrong because it subtracts a c term from a number as if they were the same kind (or for showing a substitution that gives different values, e.g. c = 2 gives 12 − 8 = 4 but 8c = 16).',
      ],
      modelAnswer: '12 is a number and 4c is a c term, so they are not like terms and cannot be collected. That means 12 − 4c is already the final answer. Writing 8c takes 4 away from 12 as if 12 were 12c. For example, when c = 2, 12 − 4c = 12 − 8 = 4, but 8c = 16, so they are not equal.',
    },
    {
      id: 'sq3',
      question: 'What happens to the minus sign when you expand 3(x − 2)? Explain, and give the expansion.',
      vnTranslation: 'Điều gì xảy ra với dấu trừ khi em khai triển 3(x − 2)? Hãy giải thích, và cho kết quả khai triển.',
      suggestedWords: [['sign', 'minus'], ['box', 'term'], ['−6', '-6']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the minus sign belongs to the 2 and goes into the box with it, so the multiplication is 3 × (−2) = −6 (the sign does not disappear or change to plus).',
        '1 mark for the correct expansion: 3(x − 2) = 3x − 6.',
      ],
      modelAnswer: 'The minus sign belongs to the term after it, so it travels with the 2 into the grid. The second box is 3 × (−2), which is −6. The sign stays a minus. So 3(x − 2) = 3x − 6.',
    },
    {
      id: 'sq4',
      question: 'Explain how 5 × 2p becomes 10p. Why is 7p a wrong answer?',
      vnTranslation: 'Hãy giải thích vì sao 5 × 2p thành 10p. Vì sao 7p là đáp án sai?',
      suggestedWords: [['multiply', 'multiplied', 'times'], ['letter', 'p'], ['add', 'added']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying you multiply the numbers, 5 × 2 = 10, and the letter p stays the same, so the answer is 10p.',
        '1 mark for saying 7p comes from adding 5 + 2 instead of multiplying.',
      ],
      modelAnswer: '2p means 2 × p, so 5 × 2p is 5 × 2 × p. Multiply the numbers: 5 × 2 = 10, and the letter p stays, which gives 10p. The answer 7p is wrong because it adds 5 and 2 instead of multiplying them.',
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
