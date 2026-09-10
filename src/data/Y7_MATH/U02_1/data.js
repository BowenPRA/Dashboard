// src/data/Y7_MATH/U02_1/data.js
// 2.1 Constructing Expressions — self-study unit (ADAPTATION-PLAN §6). Six
// scored tasks at 20 XP = 120 available, capped at 100 by unitXPOf. There is no
// Number Gym here — the section has no arithmetic to drill — so the fifth
// practice slot is Book Problems (WORKBOOK_B): the exercise's own question
// shapes, English-first, because in this section the reading IS the maths.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook, workbookB } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U02_1_DATA = {
  meta: {
    id: 'U02_1',
    title: 'Constructing Expressions',
    desc: 'Give an unknown number a letter, leave c − 50 unfinished, and read the English that decides the operation.',
    track: 'Y7_MATH',
    icon: 'Variable',
    // The projected deck this unit was taught from (see classroomLink.js).
    classroom: [{ course: 'y7-math', slug: 'U02_1', title: 'Maths 2.1 · Constructing Expressions' }],
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

  // Key words (ADAPTATION-PLAN §4): the workbook's own words. "Represent" is
  // the verb Q10 marks on; "total" and "difference" are used in Q13 without a
  // definition anywhere in the section.
  realWords: [
    {
      word: 'Expression', vn: 'Biểu thức',
      def: 'A statement with letters and sometimes numbers, but no equals sign. For example n + 7.',
      vnDef: 'Một mệnh đề có chữ cái và đôi khi có số, nhưng không có dấu bằng. Ví dụ n + 7.',
      sent: 'The expression c minus 50 has no equals sign, so it is finished as it is.',
      vnSent: 'Biểu thức c trừ 50 không có dấu bằng, nên nó đã hoàn chỉnh như vậy.',
      isReal: true,
    },
    {
      word: 'Represent', vn: 'Đại diện cho',
      def: 'To stand in place of. In algebra a letter represents a number we do not know.',
      vnDef: 'Thay thế cho. Trong đại số, một chữ cái đại diện cho một số mà ta chưa biết.',
      sent: 'Let n represent the number of particles in the drop of water.',
      vnSent: 'Cho n đại diện cho số lượng hạt trong giọt nước.',
      isReal: true,
    },
    {
      word: 'Unknown', vn: 'Số chưa biết',
      def: 'A number nobody has told you yet. We give it a letter.',
      vnDef: 'Một con số chưa ai cho em biết. Ta đặt cho nó một chữ cái.',
      sent: 'The cup holds an unknown amount, so we call it c.',
      vnSent: 'Cái cốc chứa một lượng chưa biết, nên ta gọi nó là c.',
      isReal: true,
    },
    {
      word: 'Total', vn: 'Tổng',
      def: 'The amount you get when you add things together. The total of a and b is a + b.',
      vnDef: 'Số lượng thu được khi cộng các thứ lại. Tổng của a và b là a + b.',
      sent: 'Write an expression for the total number of beakers.',
      vnSent: 'Hãy viết biểu thức cho tổng số cốc.',
      isReal: true,
    },
    {
      word: 'Difference', vn: 'Hiệu',
      def: 'The amount you get when you subtract one thing from another. The difference between a and b is a − b.',
      vnDef: 'Số lượng thu được khi lấy thứ này trừ đi thứ kia. Hiệu của a và b là a − b.',
      sent: 'The difference between the two beakers is a minus b.',
      vnSent: 'Hiệu giữa hai cái cốc là a trừ b.',
      isReal: true,
    },
    {
      word: 'Subtract from', vn: 'Lấy … trừ đi',
      def: 'Start at the number after "from" and take the other amount away. Subtract 3n from 25 is 25 − 3n.',
      vnDef: 'Bắt đầu từ số đứng sau "from" rồi trừ đi lượng kia. Subtract 3n from 25 là 25 − 3n.',
      sent: 'Multiply x by 5, then subtract the result from 4.',
      vnSent: 'Nhân x với 5, rồi lấy 4 trừ đi kết quả.',
      isReal: true,
    },
  ],

  // Short Answers (ADAPTATION-PLAN §6.3): four reasoning questions, one mark
  // per scheme line. Prompts plain text; Vietnamese in `vnTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'A cup holds c ml of coffee and Mr Bowen drinks 50 ml. Explain why "c − 50" is a finished answer, and what would be wrong with writing "270".',
      vnTranslation: 'Một cốc chứa c ml cà phê và thầy Bowen uống 50 ml. Hãy giải thích vì sao "c − 50" là một đáp án hoàn chỉnh, và viết "270" thì sai ở đâu.',
      suggestedWords: [['unknown', 'do not know'], ['expression']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying nobody has told us the value of c (it is unknown), so the expression c − 50 cannot be worked out any further.',
        '1 mark for saying 270 invents a value for c — a number that was never given — so it is not the answer.',
      ],
      modelAnswer: 'Nobody has told us what c is, so c − 50 cannot be worked out any further — the expression is the answer. Writing 270 invents a number for c that was never given, so it is wrong.',
    },
    {
      id: 'sq2',
      question: 'Explain the difference between "h less than t" and "h − t". Use numbers to show which expression is correct for the words.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa "h less than t" và "h − t". Dùng số để chỉ ra biểu thức nào đúng với câu chữ.',
      suggestedWords: [['start', 'first'], ['t − h', 't minus h']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying "h less than t" starts from t and takes h away, so it is written t − h, not h − t.',
        '1 mark for a numerical check, e.g. 5 less than 12 is 7, which is 12 − 5 (not 5 − 12).',
      ],
      modelAnswer: '"h less than t" means start with t and take h away, so it is t − h. The expression h − t is the other way round. For example, 5 less than 12 is 7, and 7 is 12 − 5, not 5 − 12.',
    },
    {
      id: 'sq3',
      question: 'Marcus says the expression "5 − 5x" means "multiply x by 5, then subtract 5". Is he right? Explain, and write the correct words if he is wrong.',
      vnTranslation: 'Marcus nói biểu thức "5 − 5x" nghĩa là "nhân x với 5, rồi trừ đi 5". Bạn ấy có đúng không? Hãy giải thích, và viết lại câu đúng nếu bạn ấy sai.',
      suggestedWords: [['from'], ['5x − 5']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying Marcus is wrong because his words describe 5x − 5, which starts from 5x.',
        '1 mark for the correct words: multiply x by 5, then subtract the result FROM 5.',
      ],
      modelAnswer: 'No. "Multiply x by 5, then subtract 5" describes 5x − 5, which starts at 5x. The expression 5 − 5x starts at 5, so the words need "from": multiply x by 5, then subtract the result from 5.',
    },
    {
      id: 'sq4',
      question: 'A syringe holds v ml of air. Mr Bowen pushes the plunger until half is left, then pushes 20 ml further. Write the expression and explain each part of it.',
      vnTranslation: 'Một ống tiêm chứa v ml không khí. Thầy Bowen đẩy pít-tông đến khi còn một nửa, rồi đẩy thêm 20 ml nữa. Hãy viết biểu thức và giải thích từng phần của nó.',
      suggestedWords: [['half', 'divide'], ['v/2 − 20', 'v over 2 minus 20']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for "half is left" giving v ÷ 2 (or v/2).',
        '1 mark for then subtracting the 20 ml pushed out: v/2 − 20.',
      ],
      modelAnswer: 'Half of v is v ÷ 2, written v/2. Pushing 20 ml further takes 20 away from that, so the expression is v/2 − 20.',
    },
  ],

  notes: notes,
  workbook: workbook,
  workbookB: workbookB,
  assessment: assessment,
  games: games,
};
