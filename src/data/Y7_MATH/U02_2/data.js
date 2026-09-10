// src/data/Y7_MATH/U02_2/data.js
// 2.2 Using Expressions and Formulae — self-study unit (ADAPTATION-PLAN §6).
// Six scored tasks at 20 XP = 120 available, capped at 100 by unitXPOf. As in
// 2.1 the fifth practice slot is Book Problems (WORKBOOK_B): the exercise's
// own shapes — substitute into an expression, into a formula with two letters,
// with a negative, and write-then-use.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook, workbookB } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U02_2_DATA = {
  meta: {
    id: 'U02_2',
    title: 'Using Expressions and Formulae',
    desc: 'Substitute a number for a letter — put the times sign back, keep the order of operations, and carry the minus sign in brackets.',
    track: 'Y7_MATH',
    icon: 'Sigma',
    classroom: [{ course: 'y7-math', slug: 'U02_2', title: 'Maths 2.2 · Using Expressions and Formulae' }],
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
        { id: 'WORKBOOK_B', dbKey: 'p22', maxXP: 20 },
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

  // Key words (ADAPTATION-PLAN §4): the section's three margin words
  // (substitute, value, formula) plus the two the questions lean on.
  realWords: [
    {
      word: 'Substitute', vn: 'Thay số',
      def: 'To put a number in place of a letter.',
      vnDef: 'Đặt một con số vào chỗ của chữ cái.',
      sent: 'Substitute 4 for n, and 3n becomes 3 times 4.',
      vnSent: 'Thay 4 vào chỗ n, thì 3n trở thành 3 nhân 4.',
      isReal: true,
    },
    {
      word: 'Value', vn: 'Giá trị',
      def: 'The number you get after substituting. When n is 4, the value of n + 2 is 6.',
      vnDef: 'Con số thu được sau khi thay số. Khi n bằng 4, giá trị của n + 2 là 6.',
      sent: 'Find the value of 5k when k is 6.',
      vnSent: 'Tìm giá trị của 5k khi k bằng 6.',
      isReal: true,
    },
    {
      word: 'Formula', vn: 'Công thức',
      def: 'A rule connecting two or more quantities, written with letters, with an equals sign. The plural is formulae.',
      vnDef: 'Một quy tắc liên hệ hai đại lượng trở lên, viết bằng chữ cái, có dấu bằng. Số nhiều là formulae.',
      sent: 'The formula for the area of a rectangle is A equals l times w.',
      vnSent: 'Công thức tính diện tích hình chữ nhật là A bằng l nhân w.',
      isReal: true,
    },
    {
      word: 'Order of operations', vn: 'Thứ tự phép tính',
      def: 'The rule that multiplication and division are done before addition and subtraction.',
      vnDef: 'Quy tắc rằng phép nhân và phép chia được làm trước phép cộng và phép trừ.',
      sent: 'By the order of operations, 3 times 4 plus 2 is 14, not 18.',
      vnSent: 'Theo thứ tự phép tính, 3 nhân 4 cộng 2 bằng 14, không phải 18.',
      isReal: true,
    },
    {
      word: 'Brackets', vn: 'Dấu ngoặc',
      def: 'The curved marks ( ) that keep a number together. Put a negative number in brackets when you substitute it.',
      vnDef: 'Các dấu cong ( ) giữ một con số liền khối. Khi thay một số âm, hãy đặt nó trong dấu ngoặc.',
      sent: 'Write 2 times negative 3 in brackets: 2 times (minus 3) is minus 6.',
      vnSent: 'Viết 2 nhân âm 3 trong dấu ngoặc: 2 nhân (trừ 3) bằng trừ 6.',
      isReal: true,
    },
    {
      word: 'Quantity', vn: 'Đại lượng',
      def: 'An amount that can be measured or counted, such as a cost, a length or a temperature.',
      vnDef: 'Một lượng có thể đo hoặc đếm được, chẳng hạn chi phí, chiều dài hay nhiệt độ.',
      sent: 'A formula connects two quantities, such as the time and the temperature.',
      vnSent: 'Một công thức liên hệ hai đại lượng, chẳng hạn thời gian và nhiệt độ.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, one mark
  // per scheme line. Prompts plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Lan says that when n = 4, the value of 3n is 34. Explain her mistake and give the correct value.',
      vnTranslation: 'Lan nói rằng khi n = 4, giá trị của 3n là 34. Hãy giải thích lỗi của bạn ấy và cho giá trị đúng.',
      suggestedWords: [['times', 'multiply', 'multiplied'], ['12']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying 3n means 3 times n (the multiplication sign is hidden), so Lan pushed the digits together instead of multiplying.',
        '1 mark for the correct value: 3 times 4 is 12.',
      ],
      modelAnswer: '3n means 3 times n — the multiplication sign is hidden, not gone. Lan pushed the 3 and the 4 together as digits. The correct value is 3 times 4, which is 12.',
    },
    {
      id: 'sq2',
      question: 'Two students work out 3x + 2 when x = 4. One gets 14 and one gets 18. Which is correct, and what did the other student do wrong?',
      vnTranslation: 'Hai bạn học sinh tính 3x + 2 khi x = 4. Một bạn ra 14 và một bạn ra 18. Bạn nào đúng, và bạn kia đã làm sai điều gì?',
      suggestedWords: [['multiply', 'multiplication'], ['first', 'before'], ['left to right', 'added first']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying 14 is correct, because the multiplication is done first: 3 times 4 is 12, then add 2.',
        '1 mark for saying the student with 18 added first (4 + 2 = 6, then times 3) — working left to right instead of following the order of operations.',
      ],
      modelAnswer: '14 is correct. The order of operations says multiply before you add: 3 times 4 is 12, then 12 + 2 is 14. The student who got 18 added first (4 + 2 = 6) and then multiplied by 3, working left to right instead.',
    },
    {
      id: 'sq3',
      question: 'Explain the difference between an expression and a formula. Give one example of each.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa biểu thức và công thức. Cho một ví dụ cho mỗi loại.',
      suggestedWords: [['equals sign', '= sign'], ['rule', 'connects']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying an expression has letters but no equals sign, while a formula is a rule that connects quantities and has an equals sign.',
        '1 mark for a correct example of each, e.g. expression 3n + 2, formula C = 3n + 2 (or A = lw).',
      ],
      modelAnswer: 'An expression has letters and sometimes numbers but no equals sign, such as 3n + 2. A formula is a rule that connects two or more quantities and does have an equals sign, such as C = 3n + 2 or A = lw.',
    },
    {
      id: 'sq4',
      question: 'Mr Bowen heats water using the formula T = 24 + 3m, where T is the temperature and m is the minutes. The formula gives T = 144 after 40 minutes. Explain why this answer cannot be right even though the arithmetic is correct.',
      vnTranslation: 'Thầy Bowen đun nước theo công thức T = 24 + 3m, với T là nhiệt độ và m là số phút. Công thức cho T = 144 sau 40 phút. Hãy giải thích vì sao đáp án này không thể đúng dù phép tính đúng.',
      suggestedWords: [['boils', 'boiling point', '100'], ['stops', 'stays the same']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying water boils at 100 degrees and then stops getting hotter (the temperature stays at 100).',
        '1 mark for saying a formula is only true while the situation it describes is true — after the water boils, the formula no longer describes what is happening.',
      ],
      modelAnswer: 'Water boils at 100 °C and then stops getting hotter, so the temperature cannot reach 144 °C. The arithmetic is right, but a formula is only true while the situation it describes is true — once the water is boiling, the rule "3 degrees every minute" no longer applies.',
    },
  ],

  notes: notes,
  workbook: workbook,
  workbookB: workbookB,
  assessment: assessment,
  games: games,
};
