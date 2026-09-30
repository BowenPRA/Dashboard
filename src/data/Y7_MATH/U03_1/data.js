// src/data/Y7_MATH/U03_1/data.js
// 3.1 Multiplying and Dividing by Powers of 10 — self-study unit, built to the
// Unit 3 shape (docs/y7-math/number-engines.md §1). 135 XP available, capped at
// 100 by unitXPOf. Gates: 25 of 35 (71%) and 80 of 115 (70%), both under the
// 80% rule. Slide the Digits rehearses the exercise's shapes — multiply,
// divide, the missing power, metric mass, chains and stories — with fresh
// numbers, and Quick Fire deals new cards every attempt.
//
// The classroom teaches 3.1 and 3.2 as ONE deck (y7-math/U03_1_2); the
// Dashboard follows the book, so this unit takes slides 1–18 and U03_2 takes
// the rest. Both units carry the same `meta.classroom` entry.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio (§10.1).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U03_1_DATA = {
  meta: {
    id: 'U03_1',
    title: 'Multiplying and Dividing by Powers of 10',
    desc: 'The power counts the zeros. Multiplying by a power of 10 moves every digit left, dividing moves it right, and the decimal point never moves — a zero only appears to hold an empty column open.',
    track: 'Y7_MATH',
    icon: 'Sigma',
    classroom: [{ course: 'y7-math', slug: 'U03_1_2', title: 'Maths 3.1–3.2 · Place Value and Rounding' }],
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
        { id: 'PLACE_SHIFT', dbKey: 'p57', maxXP: 25 },
        { id: 'QUICK_FIRE', dbKey: 'p58', maxXP: 15 },
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

  // Key words: the section's two margin words (power, powers of 10), and the
  // four the method leans on — the table (place value), what moves (digit),
  // what does not (decimal point), and the zero that holds a column open.
  // Sentences are written in words, the way the voice reads them.
  realWords: [
    {
      word: 'Power', vn: 'Số mũ',
      def: 'The small raised number. It says how many of the same number to multiply together.',
      vnDef: 'Con số nhỏ viết cao. Nó cho biết nhân bao nhiêu số giống nhau với nhau.',
      sent: 'In ten cubed, the power is three, so you multiply three tens together.',
      vnSent: 'Trong mười lập phương, số mũ là ba, nên em nhân ba số mười với nhau.',
      isReal: true,
    },
    {
      word: 'Powers of 10', vn: 'Lũy thừa của 10',
      def: 'The numbers 10, 100, 1000 and so on. Each one is a 1 followed by zeros.',
      vnDef: 'Các số 10, 100, 1000 và cứ thế tiếp tục. Mỗi số là một số 1 và các số 0 theo sau.',
      sent: 'One thousand is one of the powers of 10, because it is ten cubed.',
      vnSent: 'Một nghìn là một lũy thừa của 10, vì nó bằng mười lập phương.',
      isReal: true,
    },
    {
      word: 'Place value', vn: 'Giá trị theo vị trí',
      def: 'What a digit is worth because of the column it is in.',
      vnDef: 'Giá trị của một chữ số tùy theo cột mà nó đứng.',
      sent: 'In 350, the place value of the 5 is tens, so it is worth fifty.',
      vnSent: 'Trong số 350, chữ số 5 đứng ở hàng chục, nên nó có giá trị là năm mươi.',
      isReal: true,
    },
    {
      word: 'Digit', vn: 'Chữ số',
      def: 'One of the ten symbols, 0 to 9, that every number is written with.',
      vnDef: 'Một trong mười ký hiệu, từ 0 đến 9, dùng để viết mọi con số.',
      sent: 'When you multiply by ten, every digit moves one place to the left.',
      vnSent: 'Khi em nhân với mười, mọi chữ số dịch một cột sang trái.',
      isReal: true,
    },
    {
      word: 'Placeholder', vn: 'Số 0 giữ chỗ',
      def: 'A zero that holds an empty column open, so the other digits stay in the right place.',
      vnDef: 'Một số 0 giữ chỗ cho một cột trống, để các chữ số khác đứng đúng vị trí.',
      sent: 'In 0.052, the zero after the decimal point is a placeholder.',
      vnSent: 'Trong số 0.052, số 0 đứng sau dấu thập phân là một số 0 giữ chỗ.',
      isReal: true,
    },
    {
      word: 'Decimal point', vn: 'Dấu thập phân',
      def: 'The dot between the ones and the tenths. It never moves.',
      vnDef: 'Dấu chấm nằm giữa hàng đơn vị và hàng phần mười. Nó không bao giờ dịch chuyển.',
      sent: 'The digits move left or right, but the decimal point stays still.',
      vnSent: 'Các chữ số dịch sang trái hoặc sang phải, còn dấu thập phân thì đứng yên.',
      isReal: true,
    },
  ],

  // Short Answers: four reasoning questions, one mark per scheme line. Prompts
  // plain text (powers as Unicode superscripts); Vietnamese in `vnTranslation`.
  // Suggested words are vocabulary, never the answer.
  shortQA: [
    {
      id: 'sq1',
      question: 'Minh says: "To multiply by 10, just add a zero." Use 7.2 × 10 to explain why his rule is wrong, give the correct answer, and say what really happens to the digits and to the decimal point.',
      vnTranslation: 'Minh nói: "Muốn nhân với 10, chỉ cần thêm một số 0." Hãy dùng 7.2 × 10 để giải thích vì sao quy tắc của bạn ấy sai, cho đáp án đúng, và nói điều gì thật sự xảy ra với các chữ số và với dấu thập phân.',
      suggestedWords: [['digit', 'digits'], ['column', 'place'], ['decimal point', 'point']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for showing the rule fails: adding a zero gives 7.20, which is still 7.2 (the number has not changed).',
        '1 mark for the correct answer: 7.2 × 10 = 72.',
        '1 mark for saying every digit moves one place to the left and the decimal point does not move (a zero is only written when a column is left empty).',
      ],
      modelAnswer: 'If you add a zero to 7.2 you get 7.20, and that is still 7.2, so the rule does not work. The correct answer is 72. When you multiply by 10, every digit moves one place to the left: the 7 moves from the ones to the tens and the 2 moves from the tenths to the ones. The decimal point does not move. A zero is only written when a column is left empty.',
    },
    {
      id: 'sq2',
      question: 'Lan works out 36 ÷ 10³ and writes 0.36. Explain her mistake, give the correct answer, and explain why the answer needs a zero after the decimal point.',
      vnTranslation: 'Lan tính 36 ÷ 10³ và viết 0.36. Hãy giải thích lỗi của bạn ấy, cho đáp án đúng, và giải thích vì sao đáp án cần một số 0 sau dấu thập phân.',
      suggestedWords: [['placeholder', 'hold'], ['column', 'place'], ['right']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the mistake: Lan moved the digits only 2 places to the right, but dividing by 10³ moves them 3 places.',
        '1 mark for the correct answer: 0.036.',
        '1 mark for the reason: after moving 3 places the 3 is in the hundredths and the 6 is in the thousandths, so the tenths column is empty and needs a placeholder zero to keep them there.',
      ],
      modelAnswer: 'Lan moved the digits only two places to the right. Dividing by 10³ moves every digit three places to the right, so the correct answer is 0.036. After the move, the 3 is in the hundredths column and the 6 is in the thousandths column. The tenths column is empty, so it needs a placeholder zero. Without that zero the digits would be in the wrong columns and the number would be ten times too big.',
    },
    {
      id: 'sq3',
      question: 'Explain how to change 2.5 tonnes into grams. Say how many steps it is on the ladder of units, whether you multiply or divide and why, and give the answer.',
      vnTranslation: 'Hãy giải thích cách đổi 2.5 tấn sang gam. Nói rõ đó là mấy bậc trên thang đơn vị, em nhân hay chia và vì sao, và cho đáp án.',
      suggestedWords: [['kilogram', 'kg'], ['step', 'steps'], ['smaller unit', 'bigger unit']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the steps: tonnes to kilograms to grams is two steps, and each step is 10³ (so 10⁶ altogether).',
        '1 mark for the direction with a reason: grams are a smaller unit, so there are more of them, so multiply.',
        '1 mark for the answer: 2.5 × 10⁶ = 2500000 g.',
      ],
      modelAnswer: 'Tonnes to kilograms is one step and kilograms to grams is another step, so it is two steps. Each step is 10³, which makes 10⁶ altogether. Grams are a smaller unit than tonnes, so there will be more of them, and I multiply. 2.5 × 10⁶ moves the digits six places to the left, so 2.5 tonnes is 2500000 grams.',
    },
    {
      id: 'sq4',
      question: 'A number is multiplied by 10⁶ and then divided by 10². Explain why this is the same as one single move, say what that move is, and use the number 3 to show it.',
      vnTranslation: 'Một số được nhân với 10⁶ rồi chia cho 10². Hãy giải thích vì sao việc này giống như một lần dịch duy nhất, nói đó là phép nào, và dùng số 3 để minh họa.',
      suggestedWords: [['left', 'right'], ['places', 'columns'], ['digits', 'digit']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the two moves: multiplying by 10⁶ moves the digits 6 places left, and dividing by 10² moves them 2 places back to the right.',
        '1 mark for the single move: 6 − 2 = 4 places left overall, which is the same as multiplying by 10⁴.',
        '1 mark for the example: 3 × 10⁶ = 3000000, then 3000000 ÷ 10² = 30000, and 3 × 10⁴ is also 30000.',
      ],
      modelAnswer: 'Multiplying by 10⁶ moves every digit 6 places to the left. Dividing by 10² then moves every digit 2 places back to the right. Altogether the digits have moved 6 − 2 = 4 places to the left, which is the same as multiplying by 10⁴. For example, 3 × 10⁶ = 3000000, and 3000000 ÷ 10² = 30000. That is the same as 3 × 10⁴ = 30000.',
    },
  ],

  // Slide the Digits (PLACE_SHIFT): the item states only the question;
  // utils/placeShift.js derives the moves, every snapshot of the table, the
  // placeholders, the answer and the slip behind a wrong one. Numbers are
  // fresh — not the deck's, not the workbook's, not the book's exercise.
  placeShift: {
    title: 'Slide the Digits',
    titleVn: 'Dịch chữ số',
    intro: 'Slide every digit along the place-value table — left to multiply, right to divide, one column for each power — then write the number. The decimal point never moves.',
    introVn: 'Dịch mọi chữ số dọc theo bảng giá trị theo vị trí — sang trái để nhân, sang phải để chia, mỗi số mũ là một cột — rồi viết số ra. Dấu thập phân không bao giờ dịch chuyển.',
    levels: {
      1: { en: 'Multiply: whole numbers', vn: 'Nhân: số tự nhiên' },
      2: { en: 'Multiply: decimals', vn: 'Nhân: số thập phân' },
      3: { en: 'Divide: placeholder zeros', vn: 'Chia: số 0 giữ chỗ' },
      4: { en: 'Find the power', vn: 'Tìm số mũ' },
      5: { en: 'Metric mass', vn: 'Đơn vị khối lượng' },
      6: { en: 'Chains and stories', vn: 'Chuỗi phép tính và bài toán có lời văn' },
    },
    items: [
      { id: 's1', level: 1, n: '38', op: '×', p: 2 },
      { id: 's2', level: 1, n: '205', op: '×', p: 3 },
      { id: 's3', level: 2, n: '5.4', op: '×', p: 2 },
      { id: 's4', level: 2, n: '0.37', op: '×', p: 3 },
      { id: 's5', level: 2, n: '2.06', op: '×', p: 4 },
      { id: 's6', level: 3, n: '3600', op: '÷', p: 2 },
      { id: 's7', level: 3, n: '84', op: '÷', p: 3 },
      { id: 's8', level: 3, n: '15.2', op: '÷', p: 2 },
      { id: 's9', level: 3, n: '7', op: '÷', p: 4 },
      { id: 's10', level: 4, kind: 'power', n: '3.9', op: '×', result: '39000' },
      { id: 's11', level: 4, kind: 'power', n: '1700', op: '÷', result: '1.7' },
      { id: 's12', level: 4, kind: 'power', n: '0.05', op: '×', result: '500' },
      { id: 's13', level: 5, kind: 'convert', n: '7', from: 'kg', to: 'g' },
      { id: 's14', level: 5, kind: 'convert', n: '320', from: 'g', to: 'kg' },
      { id: 's15', level: 5, kind: 'convert', n: '0.6', from: 't', to: 'g' },
      { id: 's16', level: 6, kind: 'chain', n: '8', ops: [['×', 5], ['÷', 3], ['×', 2]] },
      { id: 's17', level: 6, kind: 'chain', n: '3.5', ops: [['÷', 2], ['×', 4]] },
      {
        id: 's18', level: 6, n: '95', op: '÷', p: 3,
        context: 'A stack of 10³ sheets of paper is 95 mm tall. How thick is one sheet, in millimetres?',
        contextVn: 'Một chồng 10³ tờ giấy cao 95 mm. Một tờ giấy dày bao nhiêu milimét?',
      },
    ],
  },

  // Quick Fire (QUICK_FIRE): generated fresh every attempt from these modes.
  quickFire: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['shift', 'power', 'mass'], rounds: 12 },

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
