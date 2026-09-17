// src/data/Y7_MATH/U02_5/data.js
// 2.5 Constructing and Solving Equations — self-study unit, built to the 2.3+
// unit shape (docs/y7-math/algebra-engines.md §1). 135 XP available, capped at
// 100 by unitXPOf. Gates: 25 of 35 (71%) and 80 of 115 (70%), both under the
// 80% rule. WORKBOOK_B (Book Problems) is retired here: Undo It rehearses the
// exercise's shapes — one step, either way round, "I think of a number", two
// steps, brackets and stories — with fresh numbers.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U02_5_DATA = {
  meta: {
    id: 'U02_5',
    title: 'Constructing and Solving Equations',
    desc: 'Undo each step with its inverse operation — the last step first — then put the answer back in to check it. Turn "I think of a number" into an equation.',
    track: 'Y7_MATH',
    icon: 'Sigma',
    classroom: [{ course: 'y7-math', slug: 'U02_5', title: 'Maths 2.5 · Constructing and Solving Equations' }],
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
        { id: 'FLOW_SOLVE', dbKey: 'p41', maxXP: 25 },
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

  // Key words: the section's two margin words (inverse operation, solve), the
  // word the deck adds (equation), and the three the method leans on.
  realWords: [
    {
      word: 'Equation', vn: 'Phương trình',
      def: 'A number sentence with an equals sign and an unknown number to find.',
      vnDef: 'Một câu toán có dấu bằng và một số chưa biết cần tìm.',
      sent: 'x plus 7 equals 15 is an equation, and x is 8.',
      vnSent: 'x cộng 7 bằng 15 là một phương trình, và x bằng 8.',
      isReal: true,
    },
    {
      word: 'Solve', vn: 'Giải',
      def: 'To find the value of the unknown in an equation.',
      vnDef: 'Tìm giá trị của số chưa biết trong một phương trình.',
      sent: 'To solve x minus 4 equals 6, add 4 to 6, so x is 10.',
      vnSent: 'Để giải x trừ 4 bằng 6, lấy 6 cộng 4, nên x bằng 10.',
      isReal: true,
    },
    {
      word: 'Unknown', vn: 'Số chưa biết',
      def: 'The number you have not found yet. In an equation it is usually written as a letter.',
      vnDef: 'Con số mà em chưa tìm ra. Trong phương trình, nó thường được viết bằng một chữ cái.',
      sent: 'In 3n equals 21, the unknown is n, and n is 7.',
      vnSent: 'Trong 3n bằng 21, số chưa biết là n, và n bằng 7.',
      isReal: true,
    },
    {
      word: 'Inverse operation', vn: 'Phép toán ngược',
      def: 'The operation that undoes another. Add and subtract are inverses; multiply and divide are inverses.',
      vnDef: 'Phép toán làm mất tác dụng của một phép toán khác. Cộng và trừ là hai phép ngược nhau; nhân và chia là hai phép ngược nhau.',
      sent: 'The inverse operation of multiply by 6 is divide by 6.',
      vnSent: 'Phép toán ngược của nhân với 6 là chia cho 6.',
      isReal: true,
    },
    {
      word: 'Check', vn: 'Thử lại',
      def: 'To substitute your answer back into the equation and see if it is true.',
      vnDef: 'Thay đáp án của em vào lại phương trình và xem nó có đúng không.',
      sent: 'Check x equals 10: 10 minus 4 is 6, so the answer is right.',
      vnSent: 'Thử lại x bằng 10: 10 trừ 4 bằng 6, nên đáp án đúng.',
      isReal: true,
    },
    {
      word: 'Flow chart', vn: 'Sơ đồ',
      def: 'A diagram of boxes and arrows that shows, in order, the steps done to a number.',
      vnDef: 'Một sơ đồ gồm các ô và mũi tên cho thấy, theo thứ tự, các bước làm với một số.',
      sent: 'Reverse the flow chart and use the inverse of each step to solve the equation.',
      vnSent: 'Đi ngược sơ đồ và dùng phép ngược của mỗi bước để giải phương trình.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Nam solves x − 4 = 6 and writes x = 2. Explain his mistake, give the correct answer, and show how checking proves which answer is right.',
      vnTranslation: 'Nam giải x − 4 = 6 và viết x = 2. Hãy giải thích lỗi của bạn ấy, cho đáp án đúng, và cho thấy việc thử lại chứng minh đáp án nào đúng.',
      suggestedWords: [['inverse', 'undo', 'add'], ['check', 'substitute', 'put it back']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying Nam did the subtraction he could see (6 − 4) instead of undoing it with the inverse operation, + 4.',
        '1 mark for the correct answer: 6 + 4 = 10, so x = 10.',
        '1 mark for the check: substituting 10 gives 10 − 4 = 6, which is true, while substituting 2 gives 2 − 4 = −2, which is not 6.',
      ],
      modelAnswer: 'Nam did the operation he could see, 6 − 4, instead of undoing it. The − 4 has to be undone with its inverse operation, + 4, so x = 6 + 4 = 10. Checking proves it: put 10 back in and 10 − 4 = 6, which is true. Put 2 back in and 2 − 4 = −2, which is not 6, so x = 2 is wrong.',
    },
    {
      id: 'sq2',
      question: 'To solve 2a + 4 = 18, you take away 4 before you divide by 2. Explain why the + 4 is undone first.',
      vnTranslation: 'Để giải 2a + 4 = 18, em trừ 4 trước khi chia cho 2. Hãy giải thích vì sao phép + 4 được làm ngược trước.',
      suggestedWords: [['last', 'first'], ['order', 'reverse'], ['socks', 'shoes']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying a was multiplied by 2 first and then 4 was added, so + 4 was the last step, and the last step is undone first (reverse order, like socks and shoes).',
        '1 mark for the working or its result: 18 − 4 = 14, then 14 ÷ 2 = 7 (or for showing that halving first gives a = 5, which fails the check: 2 × 5 + 4 = 14, not 18).',
      ],
      modelAnswer: 'In 2a + 4, the letter a is multiplied by 2 first and then 4 is added, so the + 4 is the last step. Undoing works in reverse order, like taking off shoes before socks, so the last step is undone first: 18 − 4 = 14, then 14 ÷ 2 = 7. If you halve first you get a = 5, and 2 × 5 + 4 = 14, not 18.',
    },
    {
      id: 'sq3',
      question: 'Explain how you can check that a solution to an equation is correct. Use the equation 3x − 5 = 16 and the answer x = 7 as your example.',
      vnTranslation: 'Hãy giải thích cách em thử lại để biết một nghiệm của phương trình là đúng. Dùng phương trình 3x − 5 = 16 và đáp án x = 7 làm ví dụ.',
      suggestedWords: [['substitute', 'put it back', 'replace'], ['true', 'equals', 'same']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying you substitute the answer back into the original equation in place of the letter and work out that side.',
        '1 mark for the example worked through: 3 × 7 − 5 = 21 − 5 = 16, which matches the other side, so x = 7 is correct.',
      ],
      modelAnswer: 'Substitute the answer back into the original equation in place of the letter, then work out that side. If it gives the number on the other side, the answer is correct. For 3x − 5 = 16 with x = 7: 3 × 7 − 5 = 21 − 5 = 16, which is the same as the right side, so x = 7 is correct.',
    },
    {
      id: 'sq4',
      question: 'Write "I think of a number, multiply it by 4, then add 6. The answer is 34" as an equation. Explain how you chose the order of the operations, then solve it.',
      vnTranslation: 'Hãy viết "Tôi nghĩ ra một số, nhân nó với 4, rồi cộng 6. Kết quả là 34" thành phương trình. Giải thích cách em chọn thứ tự các phép toán, rồi giải nó.',
      suggestedWords: [['letter', 'n', 'call it'], ['order', 'first', 'then']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for calling the number a letter and writing the correct equation, 4n + 6 = 34.',
        '1 mark for explaining the order: the operations are written in the order they are done to the number — multiply by 4 first (4n), then add 6.',
        '1 mark for the solution: 34 − 6 = 28, 28 ÷ 4 = 7, so the number is 7.',
      ],
      modelAnswer: 'Call the number n. It is multiplied by 4 first, which gives 4n, and then 6 is added, which gives 4n + 6. The answer is 34, so the equation is 4n + 6 = 34. The operations go in the order they happen to the number. To solve it, undo the last step first: 34 − 6 = 28, then 28 ÷ 4 = 7. The number is 7.',
    },
  ],

  // Undo It (FLOW_SOLVE): the item states only the question; utils/algebra.js
  // derives the flow chart, the inverses, the solution, the equations a story
  // item offers, and the slip behind a wrong answer. Numbers are fresh — not
  // the deck's, not the workbook's, not the book's exercise.
  flowSolve: {
    title: 'Undo It',
    titleVn: 'Làm ngược lại',
    intro: 'Build the flow chart, reverse it with inverse operations — last step first — then put your answer back in to check it.',
    introVn: 'Dựng sơ đồ, đi ngược bằng các phép toán ngược — bước cuối trước — rồi thay đáp án vào lại để thử.',
    levels: {
      1: { en: 'One step: + and −', vn: 'Một bước: + và −' },
      2: { en: 'One step: × and ÷', vn: 'Một bước: × và ÷' },
      3: { en: 'Either way round', vn: 'Viết chiều nào cũng được' },
      4: { en: 'I think of a number', vn: 'Tôi nghĩ ra một số' },
      5: { en: 'Two steps', vn: 'Hai bước' },
      6: { en: 'Brackets and stories', vn: 'Dấu ngoặc và bài toán có lời văn' },
    },
    items: [
      { id: 'f1', level: 1, eq: 'x + 11 = 26' },
      { id: 'f2', level: 1, eq: 'y − 9 = 14' },
      { id: 'f3', level: 1, eq: '8 + p = 30' },
      { id: 'f4', level: 2, eq: '7k = 63' },
      { id: 'f5', level: 2, eq: 'n/6 = 8' },
      { id: 'f6', level: 2, eq: '4w = 52' },
      { id: 'f7', level: 3, eq: '45 = 9t' },
      { id: 'f8', level: 3, eq: '17 = c − 8' },
      { id: 'f9', level: 4, ops: [['*', 5]], result: 65, letter: 'n' },
      { id: 'f10', level: 4, ops: [['-', 12]], result: 7, letter: 'n' },
      { id: 'f11', level: 4, ops: [['*', 4], ['+', 9]], result: 37, letter: 'n' },
      { id: 'f12', level: 5, eq: '3g + 8 = 29' },
      { id: 'f13', level: 5, eq: '5h − 6 = 34' },
      { id: 'f14', level: 5, eq: 'q/3 − 4 = 5' },
      { id: 'f15', level: 6, eq: '2(x + 5) = 26' },
      {
        id: 'f16', level: 6, eq: '3n + 6 = 36',
        story: 'Mr Bowen buys 3 notebooks and a pen. The pen costs 6 thousand dong. He pays 36 thousand dong altogether. One notebook costs n thousand dong.',
        storyVn: 'Thầy Bowen mua 3 cuốn vở và một cây bút. Cây bút giá 6 nghìn đồng. Thầy trả tất cả 36 nghìn đồng. Một cuốn vở giá n nghìn đồng.',
      },
      {
        id: 'f17', level: 6, eq: 'h + 20 = 13',
        story: 'Mr Bowen buys a plant that was h cm tall. It grows 4 cm every week, so after 5 weeks it has grown 20 cm. Now it is 13 cm tall.',
        storyVn: 'Thầy Bowen mua một cái cây cao h cm. Mỗi tuần nó cao thêm 4 cm, nên sau 5 tuần nó đã cao thêm 20 cm. Bây giờ nó cao 13 cm.',
      },
      {
        id: 'f18', level: 6, eq: '15x = 90',
        story: 'A right angle, 90°, is split into two angles, 7x and 8x. Collect them first: 7x + 8x is 15x.',
        storyVn: 'Một góc vuông, 90°, được chia thành hai góc, 7x và 8x. Gộp chúng trước: 7x + 8x bằng 15x.',
      },
    ],
  },

  // Algebra Pyramids (ALG_PYRAMID): generated fresh every attempt.
  pyramids: { title: 'Algebra Pyramids', titleVn: 'Kim tự tháp đại số', modes: ['solve', 'down'], rounds: 6 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
