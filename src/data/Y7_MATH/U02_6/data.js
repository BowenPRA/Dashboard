// src/data/Y7_MATH/U02_6/data.js
// 2.6 Inequalities — self-study unit, built to the number-engines unit shape
// (docs/y7-math/number-engines.md §1). 125 XP available, capped at 100 by
// unitXPOf. Gates: 20 of 30 (67%) — the lesson alone opens the practice — and
// 80 of 105 (76%), both under the 80% rule.
//
// The classroom twin is one deck (lessons/content/y7-math/U02_6, 28 slides).
// What this unit adds that the deck never had: the inequality is DRAWN by the
// student — the open circle tapped onto the line, then the arrow — in the deck
// (`ineq` activities) and in the Show It task, and every slip has a name: the
// circle's own number, the wrong way below zero, the sign read backwards.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U02_6_DATA = {
  meta: {
    id: 'U02_6',
    title: 'Inequalities',
    desc: 'Read "is less than" and "is greater than" from left to right, and the other words a word problem uses; show an inequality on a number line with an open circle and an arrow; and find the smallest or largest integer that works — even below zero, where less than still means left.',
    track: 'Y7_MATH',
    icon: 'Sigma',
    classroom: [{ course: 'y7-math', slug: 'U02_6', title: 'Maths 2.6 · Inequalities' }],
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
        { id: 'INEQ_LINE', dbKey: 'p59', maxXP: 25 },
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

  // Key words: the book's two margin words for 2.6 (inequality, integer), the
  // two phrases the signs are read as (less than, greater than), the picture's
  // own word (open circle) and one of the word-problem words (fewer). No sign
  // is written in a definition or a sentence — the word audio reads them as
  // they stand — and the sentences use their own numbers, so none gives away a
  // deck item.
  realWords: [
    {
      word: 'Inequality', vn: 'Bất đẳng thức',
      def: 'A statement that one thing is less than, or greater than, another. It can have many answers.',
      vnDef: 'Một mệnh đề cho biết một đại lượng nhỏ hơn, hoặc lớn hơn, một đại lượng khác. Nó có thể có nhiều đáp án.',
      sent: 'The inequality "n is greater than 12" has many answers: 13, 14, 15 and more.',
      vnSent: 'Bất đẳng thức "n lớn hơn 12" có nhiều đáp án: 13, 14, 15 và nhiều số nữa.',
      isReal: true,
    },
    {
      word: 'Integer', vn: 'Số nguyên',
      def: 'A whole number. It can be negative, zero or positive.',
      vnDef: 'Số không có phần thập phân. Nó có thể âm, bằng 0 hoặc dương.',
      sent: 'The numbers 15, 0 and −6 are integers, but 4.5 is not.',
      vnSent: 'Các số 15, 0 và −6 là số nguyên, nhưng 4.5 thì không.',
      isReal: true,
    },
    {
      word: 'Less than', vn: 'Nhỏ hơn',
      def: 'Smaller. On a number line, a number that is less than another one is further to the left.',
      vnDef: 'Bé hơn. Trên trục số, một số nhỏ hơn số khác thì nằm xa hơn về bên trái.',
      sent: '2 is less than 11, so 2 is further left on the number line.',
      vnSent: '2 nhỏ hơn 11, nên 2 nằm xa hơn về bên trái trên trục số.',
      isReal: true,
    },
    {
      word: 'Greater than', vn: 'Lớn hơn',
      def: 'Bigger. On a number line, a number that is greater than another one is further to the right.',
      vnDef: 'To hơn. Trên trục số, một số lớn hơn số khác thì nằm xa hơn về bên phải.',
      sent: '30 is greater than 19, so 30 is further right on the number line.',
      vnSent: '30 lớn hơn 19, nên 30 nằm xa hơn về bên phải trên trục số.',
      isReal: true,
    },
    {
      word: 'Open circle', vn: 'Vòng tròn rỗng',
      def: 'An empty circle drawn above a number on a number line. It shows that the number itself is not included.',
      vnDef: 'Một vòng tròn rỗng vẽ phía trên một số trên trục số. Nó cho biết chính số đó không được tính.',
      sent: 'Draw an open circle above 12, and then draw the arrow.',
      vnSent: 'Vẽ một vòng tròn rỗng phía trên số 12, rồi vẽ mũi tên.',
      isReal: true,
    },
    {
      word: 'Fewer', vn: 'Ít hơn',
      def: 'A smaller number of things that you can count. In a word problem, fewer than means less than.',
      vnDef: 'Số lượng ít hơn, dùng cho những thứ đếm được. Trong bài toán có lời văn, fewer than nghĩa là nhỏ hơn.',
      sent: 'A week has fewer than 10 days.',
      vnSent: 'Một tuần có ít hơn 10 ngày.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text; Vietnamese in `vnTranslation`. They are the deck's four
  // arguments — many answers and the word integer, the open circle, less than
  // means left, and two inequalities at once — asked for in the student's own
  // words, each with numbers the deck does not use.
  shortQA: [
    {
      id: 'sq1',
      question: 'The equation x + 7 = 15 has one answer. Mr Bowen says, "I have more than 3 cats", which is the inequality c > 3. Explain why the inequality has many answers, and why c cannot be 3 or 3.5.',
      vnTranslation: 'Phương trình x + 7 = 15 có một đáp án. Thầy Bowen nói: "I have more than 3 cats" (thầy có nhiều hơn 3 con mèo), tức là bất đẳng thức c > 3. Hãy giải thích vì sao bất đẳng thức này có nhiều đáp án, và vì sao c không thể là 3 hay 3.5.',
      suggestedWords: [['inequality'], ['integer', 'whole number'], ['greater than', 'more than']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for many answers: every whole number greater than 3 works (4, 5, 6 and so on), so the inequality does not fix one value the way an equation does.',
        '1 mark for why not 3: 3 is not more than 3 (it is equal to 3), so 3 does not work.',
        '1 mark for why not 3.5: 3.5 is greater than 3, but a number of cats must be an integer (a whole number).',
      ],
      modelAnswer: 'An equation is true for one number, but an inequality is true for many. Every whole number greater than 3 works, so c could be 4, 5, 6 and so on. c cannot be 3, because 3 is equal to 3 and is not greater than 3. c cannot be 3.5, because a number of cats has to be an integer, and 3.5 is not a whole number.',
    },
    {
      id: 'sq2',
      question: 'Hoa draws x > 16 on a number line. She says the smallest integer x could be is 16. Explain why she is wrong, say what the open circle on 16 shows, and give the correct answer.',
      vnTranslation: 'Hoa vẽ x > 16 trên trục số. Bạn ấy nói số nguyên nhỏ nhất mà x có thể là 16. Hãy giải thích vì sao bạn ấy sai, cho biết vòng tròn rỗng ở số 16 thể hiện điều gì, và nêu đáp án đúng.',
      suggestedWords: [['open circle', 'circle'], ['included', 'include'], ['arrow', 'number line']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying 16 does not work: 16 is not greater than 16 (it is equal to it).',
        '1 mark for the open circle: it shows that 16 itself is not included, and the numbers that work start after it (where the arrow points, to the right).',
        '1 mark for the correct answer: the smallest integer is 17, the first integer after 16.',
      ],
      modelAnswer: 'Hoa is wrong because 16 is not greater than 16. It is equal to 16, so it does not work. The open circle on 16 shows that 16 is not included, and the arrow points right at the numbers that do work. The first integer to the right of 16 is 17, so the smallest integer x could be is 17.',
    },
    {
      id: 'sq3',
      question: 'Minh says: "t < −11, so t could be −10, −9 or −8, because 10, 9 and 8 are less than 11." Explain his mistake, using a number line or a thermometer, and write three integers that t could really be.',
      vnTranslation: 'Minh nói: "t < −11, nên t có thể là −10, −9 hoặc −8, vì 10, 9 và 8 nhỏ hơn 11." Hãy giải thích lỗi sai của bạn ấy, dùng trục số hoặc nhiệt kế, và viết ba số nguyên mà t thật sự có thể là.',
      suggestedWords: [['number line', 'thermometer'], ['negative', 'minus sign'], ['left', 'colder']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the rule: less than means further left on the number line (or lower, colder, on a thermometer), and this is still true below zero.',
        '1 mark for the mistake: −10, −9 and −8 are to the right of −11 (warmer than −11), so they are greater than −11 — he compared the numbers without their minus signs.',
        '1 mark for three correct integers, such as −12, −13 and −14.',
      ],
      modelAnswer: 'Less than means further left on the number line, even below zero. Minh compared 10, 9 and 8 with 11 and forgot the minus signs. On a number line, −10, −9 and −8 are to the right of −11, so they are greater than −11, just as −8 degrees is warmer than −11 degrees. The integers that work are to the left of −11, such as −12, −13 and −14.',
    },
    {
      id: 'sq4',
      question: 'Mr Bowen says: "The number of books I have read this year is an integer. It is more than 18. It is fewer than 19." Write the two inequalities, using b for the number of books, and explain why Mr Bowen must be wrong.',
      vnTranslation: 'Thầy Bowen nói: "Số quyển sách thầy đã đọc năm nay là một số nguyên. Nó nhiều hơn 18 (more than 18). Nó ít hơn 19 (fewer than 19)." Hãy viết hai bất đẳng thức, dùng b cho số quyển sách, và giải thích vì sao thầy Bowen chắc chắn nói sai.',
      suggestedWords: [['inequality', 'inequalities'], ['integer', 'whole number'], ['between', 'open circle']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for both inequalities: b > 18 and b < 19.',
        '1 mark for saying 18 and 19 themselves do not work: 18 is not more than 18 and 19 is not fewer than 19.',
        '1 mark for the conclusion: the only numbers between 18 and 19 are decimals such as 18.5, which are not integers, so no integer fits both and no number of books is possible.',
      ],
      modelAnswer: 'The inequalities are b > 18 and b < 19. 18 does not work because 18 is not more than 18, and 19 does not work because 19 is not fewer than 19. The only numbers between 18 and 19 are decimals such as 18.5, and they are not integers. No integer fits both inequalities, so Mr Bowen cannot have read that number of books.',
    },
  ],

  // Show It (INEQ_LINE): the item states only the inequality; utils/ineqLine.js
  // derives the line, the circle, the arrow, the integers that work, the
  // sentence of a `words` item and the name of the slip behind a wrong answer.
  // Numbers are fresh — not the deck's (x > 3, t < −2, p > 2.5, 20 to 24 …),
  // not the workbook's and not the quiz's. Answers, for the reviewer:
  //   L1  x > 11: circle 11, right, smallest 12 · y < 15: circle 15, left, largest 14
  //   L2  reads x < 13, largest 12 · reads k > 18, smallest 19
  //   L3  t < −8: left, largest −9 · x > −5: right, smallest −4 · p > 6.5: circle between 6 and 7, smallest 7
  //       · reads z < −3.5, largest −4
  //   L4  w < 17 → 16 · h > 40 → 41 · t < −13 → −14 · d > −11 → −10
  //       · j < 50 → 49 · r > 65 → 66
  //   L5  t < −18 → −19 · p > 31 → 32
  //   L6  34, 35, 36 · b > 26 and b < 30 → 27, 28, 29 · m > 44 and m < 45 → none
  ineqLine: {
    title: 'Show It',
    titleVn: 'Biểu diễn trên trục số',
    intro: 'The circle first, then the arrow. Tap the number in the inequality to put the open circle on it, choose which way the arrow goes, then give the smallest or largest integer that works.',
    introVn: 'Vòng tròn trước, rồi đến mũi tên. Chạm vào con số trong bất đẳng thức để đặt vòng tròn rỗng lên đó, chọn hướng của mũi tên, rồi cho biết số nguyên nhỏ nhất hoặc lớn nhất thỏa mãn.',
    levels: {
      1: { en: 'The circle, then the arrow', vn: 'Vòng tròn trước, rồi đến mũi tên' },
      2: { en: 'Read the line', vn: 'Đọc trục số' },
      3: { en: 'Below zero, and halves', vn: 'Dưới 0, và số có nửa đơn vị' },
      4: { en: 'Words into signs', vn: 'Đổi lời thành dấu' },
      5: { en: 'Stories', vn: 'Bài toán có lời văn' },
      6: { en: 'Between two inequalities', vn: 'Giữa hai bất đẳng thức' },
    },
    items: [
      { id: 'n1', level: 1, kind: 'draw', ineq: 'x > 11' },
      { id: 'n2', level: 1, kind: 'draw', ineq: 'y < 15' },
      { id: 'n3', level: 2, kind: 'read', ineq: 'x < 13' },
      { id: 'n4', level: 2, kind: 'read', ineq: 'k > 18' },
      { id: 'n5', level: 3, kind: 'draw', ineq: 't < −8' },
      { id: 'n19', level: 3, kind: 'draw', ineq: 'x > −5' },
      { id: 'n6', level: 3, kind: 'draw', ineq: 'p > 6.5' },
      { id: 'n7', level: 3, kind: 'read', ineq: 'z < −3.5' },
      { id: 'n8', level: 4, kind: 'words', ineq: 'w < 17', phrase: 'fewer than' },
      { id: 'n9', level: 4, kind: 'words', ineq: 'h > 40', phrase: 'more than' },
      { id: 'n10', level: 4, kind: 'words', ineq: 't < −13', phrase: 'below' },
      { id: 'n11', level: 4, kind: 'words', ineq: 'd > −11', phrase: 'above' },
      { id: 'n12', level: 4, kind: 'words', ineq: 'j < 50', phrase: 'under' },
      { id: 'n13', level: 4, kind: 'words', ineq: 'r > 65', phrase: 'over' },
      {
        id: 'n14', level: 5, kind: 'words', ineq: 't < −18',
        context: 'A freezer must stay below −18 °C. Use t for the temperature.',
        contextVn: 'Tủ đông phải luôn ở dưới −18 °C (below −18 °C). Dùng t cho nhiệt độ.',
      },
      {
        id: 'n15', level: 5, kind: 'words', ineq: 'p > 31',
        context: 'Lan scored more than 31 points in the quiz. Use p for her points.',
        contextVn: 'Lan được nhiều hơn 31 điểm trong bài kiểm tra (more than 31 points). Dùng p cho số điểm của bạn ấy.',
      },
      { id: 'n16', level: 6, kind: 'between', ineqs: ['k > 33', 'k < 37'] },
      {
        id: 'n17', level: 6, kind: 'between', ineqs: ['b > 26', 'b < 30'],
        context: 'A bus has more than 26 passengers. It has fewer than 30 passengers. Use b for the number of passengers.',
        contextVn: 'Một chiếc xe buýt có nhiều hơn 26 hành khách (more than 26). Xe có ít hơn 30 hành khách (fewer than 30). Dùng b cho số hành khách.',
      },
      { id: 'n18', level: 6, kind: 'between', ineqs: ['m > 44', 'm < 45'] },
    ],
  },

  // Quick Fire (QUICK_FIRE): cards dealt fresh every attempt — < or > between
  // two numbers, "could it be?" (the room game the deck could not keep), and
  // the smallest or largest integer.
  quickFire: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['compare', 'couldbe', 'integer'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
