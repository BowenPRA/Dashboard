// src/data/Y7_MATH/U02_3/data.js
// 2.3 Collecting Like Terms — self-study unit, the first built to the Year 7
// algebra shape (docs/y7-math/algebra-engines.md §1): an interactive deck, the
// key words, a mixed-widget Practice workbook, Collect It (COLLECT_TERMS),
// Algebra Pyramids (ALG_PYRAMID) and four reasoning questions, then the quiz.
// 135 XP available, capped at 100. Gates 25 of 35 (71%) and 80 of 115 (70%).
// WORKBOOK_B is retired here: Collect It rehearses the exercise's shapes with
// fresh numbers.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (ADAPTATION-PLAN §10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U02_3_DATA = {
  meta: {
    id: 'U02_3',
    title: 'Collecting Like Terms',
    desc: 'Put like terms together — count the invisible 1, keep every sign with its term, and leave unlike terms alone.',
    track: 'Y7_MATH',
    icon: 'Sigma',
    classroom: [{ course: 'y7-math', slug: 'U02_3', title: 'Maths 2.3 · Collecting Like Terms' }],
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
        { id: 'COLLECT_TERMS', dbKey: 'p39', maxXP: 25 },
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

  // Key words: the workbook's key-words box (term, like terms, simplify,
  // collecting like terms) plus the two the questions lean on — "simplest form"
  // is the instruction in half the exercise, and "expression" is what a term is
  // part of. Vietnamese from the classroom plan.
  realWords: [
    {
      word: 'Term', vn: 'Hạng tử',
      def: 'One part of an expression. The plus and minus signs separate the terms, and a number on its own is a term too.',
      vnDef: 'Một phần của biểu thức. Các dấu cộng và trừ ngăn cách các hạng tử, và một số đứng riêng cũng là một hạng tử.',
      sent: 'The expression 5x plus 3 has two terms: 5x and 3.',
      vnSent: 'Biểu thức 5x cộng 3 có hai hạng tử: 5x và 3.',
      isReal: true,
    },
    {
      word: 'Like terms', vn: 'Hạng tử đồng dạng',
      def: 'Terms that contain exactly the same letters. Here "like" means "the same kind".',
      vnDef: 'Các hạng tử có đúng cùng các chữ cái. Ở đây "like" nghĩa là "cùng loại".',
      sent: '2a and 7a are like terms, but 2a and 7b are not.',
      vnSent: '2a và 7a là hạng tử đồng dạng, nhưng 2a và 7b thì không.',
      isReal: true,
    },
    {
      word: 'Simplify', vn: 'Rút gọn',
      def: 'To write an expression in a shorter way that has the same value.',
      vnDef: 'Viết một biểu thức theo cách ngắn gọn hơn mà vẫn có cùng giá trị.',
      sent: 'Simplify a plus a plus a, and you get 3a.',
      vnSent: 'Rút gọn a cộng a cộng a, em được 3a.',
      isReal: true,
    },
    {
      word: 'Collecting like terms', vn: 'Thu gọn hạng tử đồng dạng',
      def: 'Adding like terms together to simplify an expression. Each kind of term is added on its own.',
      vnDef: 'Cộng các hạng tử đồng dạng lại với nhau để rút gọn biểu thức. Mỗi loại hạng tử được cộng riêng.',
      sent: 'By collecting like terms, 4x plus 3 plus 2x becomes 6x plus 3.',
      vnSent: 'Bằng cách thu gọn hạng tử đồng dạng, 4x cộng 3 cộng 2x trở thành 6x cộng 3.',
      isReal: true,
    },
    {
      word: 'Simplest form', vn: 'Dạng gọn nhất',
      def: 'An expression once every like term has been collected, so that no two terms are the same kind.',
      vnDef: 'Một biểu thức sau khi mọi hạng tử đồng dạng đã được gộp, nên không còn hai hạng tử nào cùng loại.',
      sent: '3a plus 2b is already in its simplest form.',
      vnSent: '3a cộng 2b đã ở dạng gọn nhất.',
      isReal: true,
    },
    {
      word: 'Expression', vn: 'Biểu thức',
      def: 'A group of numbers, letters and operation signs, with no equals sign.',
      vnDef: 'Một nhóm gồm các số, chữ cái và dấu phép tính, không có dấu bằng.',
      sent: 'The expression 7m minus m simplifies to 6m.',
      vnSent: 'Biểu thức 7m trừ m rút gọn thành 6m.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. The
  // four slips the deck is built around — the invisible 1, unlike terms, the
  // sign that travels, and ab = ba. Prompts plain text; Vietnamese in
  // `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Nam says that 8s − s = 8. Explain his mistake and give the correct answer.',
      vnTranslation: 'Nam nói rằng 8s − s = 8. Hãy giải thích lỗi của bạn ấy và cho đáp án đúng.',
      suggestedWords: [['1s', 'one s', 'invisible 1'], ['7s']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying that s on its own means 1s (one s), so only one s is taken away, and the letter does not disappear or cancel.',
        '1 mark for the correct answer: 8s − 1s = 7s.',
      ],
      modelAnswer: 'A lone s means 1s, so 8s − s takes away just one s — eight s take away one s leaves seven s. Nam made the letters disappear, but the letter never disappears when you collect like terms. The correct answer is 7s.',
    },
    {
      id: 'sq2',
      question: 'Explain why 3a + 2b cannot be simplified.',
      vnTranslation: 'Hãy giải thích vì sao 3a + 2b không thể rút gọn.',
      suggestedWords: [['like terms', 'same kind'], ['different letters', 'different']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying 3a and 2b have different letters, so they are not like terms (they are different kinds).',
        '1 mark for saying only like terms can be collected, so 3a + 2b is already in its simplest form (like 5 cm and 3 kg cannot be added into one amount).',
      ],
      modelAnswer: '3a has the letter a and 2b has the letter b, so they are not like terms — they are different kinds, like apples and bananas. Only like terms can be collected, so there is nothing to put together, and 3a + 2b is already in its simplest form. It is not 5ab.',
    },
    {
      id: 'sq3',
      question: 'Linh simplifies 7x + 5y − 3x + y and gets 10x + 6y. Where should the minus sign go, and what is the correct answer?',
      vnTranslation: 'Linh rút gọn 7x + 5y − 3x + y và được 10x + 6y. Dấu trừ phải đi theo đâu, và đáp án đúng là gì?',
      suggestedWords: [['belongs to', 'in front of', 'moves with'], ['4x + 6y']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the minus sign belongs to the term after it (−3x) and moves with it, so the x terms are 7x − 3x, not 7x + 3x.',
        '1 mark for the correct answer 4x + 6y.',
      ],
      modelAnswer: 'The minus sign is in front of 3x, so it belongs to 3x and moves with it: 7x + 5y − 3x + y = 7x − 3x + 5y + y. Linh left the minus sign behind and added 3x. The x terms make 4x and the y terms make 6y, so the answer is 4x + 6y.',
    },
    {
      id: 'sq4',
      question: 'Explain why 4ab and 3ba are like terms. Then simplify 4ab + 3ba.',
      vnTranslation: 'Hãy giải thích vì sao 4ab và 3ba là hạng tử đồng dạng. Sau đó rút gọn 4ab + 3ba.',
      suggestedWords: [['a × b', 'b × a', 'multiply'], ['same', 'order'], ['7ab']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying ab means a × b and ba means b × a, and multiplying in either order gives the same answer, so ab and ba are the same kind of term.',
        '1 mark for the correct simplification 4ab + 3ba = 7ab.',
      ],
      modelAnswer: 'ab means a × b and ba means b × a. You can multiply two numbers in either order and get the same answer, so ab and ba are the same kind of term. That makes 4ab and 3ba like terms, and 4ab + 3ba = 7ab.',
    },
  ],

  // Collect It (COLLECT_TERMS, p39): the item is the question; utils/algebra.js
  // derives the baskets, totals, answer and the named slips. The ladder of the
  // spec, with numbers that appear nowhere else in the unit. c9 and c15 cannot
  // be simplified — the engine asks "can it be simplified?" and the answer is no.
  collectTerms: {
    title: 'Collect It',
    titleVn: 'Gộp hạng tử',
    intro: 'Find each kind, sort the terms into baskets with their signs, total each basket, then write the answer in simplest form.',
    introVn: 'Tìm từng loại, xếp các hạng tử cùng dấu của chúng vào rổ, tính tổng mỗi rổ, rồi viết đáp án ở dạng gọn nhất.',
    levels: {
      1: { en: 'One kind', vn: 'Một loại' },
      2: { en: 'The invisible 1', vn: 'Số 1 vô hình' },
      3: { en: 'Two kinds', vn: 'Hai loại' },
      4: { en: 'Keep the sign', vn: 'Giữ nguyên dấu' },
      5: { en: 'Tricky kinds', vn: 'Loại dễ nhầm' },
      6: { en: 'Lengths and perimeters', vn: 'Chiều dài và chu vi' },
    },
    items: [
      { id: 'c1', level: 1, expr: '4h + 5h' },
      { id: 'c2', level: 1, expr: '6w + 2w + 3w' },
      { id: 'c3', level: 1, expr: '9r − 4r' },
      { id: 'c4', level: 2, expr: 'k + 7k' },
      { id: 'c5', level: 2, expr: '10e − e' },
      { id: 'c6', level: 2, expr: 'g + g + 5g' },
      { id: 'c7', level: 3, expr: '5a + 3b + 2a + 4b' },
      { id: 'c8', level: 3, expr: '2p + 6 + 4p + 3' },
      { id: 'c9', level: 3, expr: '3u + 8v' },
      { id: 'c10', level: 4, expr: '8x + 3y − 5x + y' },
      { id: 'c11', level: 4, expr: '12 + 6n − 5 − 4n' },
      { id: 'c12', level: 4, expr: '4c − 7d + c + 2d' },
      { id: 'c13', level: 5, expr: '2mn + 5 + 3nm − 1' },
      { id: 'c14', level: 5, expr: '3t² + 4t + t² − t' },
      { id: 'c15', level: 5, expr: '6y² + 2y' },
      {
        id: 'c16', level: 6, expr: '3a + 2 + a + 3a + 2 + a',
        context: 'The perimeter of a rectangle with sides 3a + 2 cm and a cm.',
        contextVn: 'Chu vi của một hình chữ nhật có các cạnh 3a + 2 cm và a cm.',
      },
      {
        id: 'c17', level: 6, expr: 'x + 2y + x + 2y + x + 2y',
        context: 'The perimeter of an equilateral triangle: every side is x + 2y cm.',
        contextVn: 'Chu vi của một tam giác đều: mỗi cạnh dài x + 2y cm.',
      },
      {
        id: 'c18', level: 6, expr: '10p − 3p − 2',
        context: 'A ribbon is 10p cm long. Mr Bowen cuts off 3p cm, then another 2 cm. How long is the ribbon now?',
        contextVn: 'Một dải ruy băng dài 10p cm. Thầy Bowen cắt đi 3p cm, rồi thêm 2 cm nữa. Bây giờ dải ruy băng dài bao nhiêu?',
      },
    ],
  },

  // Algebra Pyramids (ALG_PYRAMID, p42): generated fresh every attempt by
  // utils/pyramid.js. 2.3 builds up (add and collect) and works down (subtract).
  pyramids: { title: 'Algebra Pyramids', titleVn: 'Kim tự tháp đại số', modes: ['up', 'down'], rounds: 6 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
