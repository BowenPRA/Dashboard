// src/data/Y7_SCI/U02_8/data.js
// 2.8 Acids and Bases — Year 7 Science self-study unit, reduced from the
// classroom lesson y7-science/U02_8 to docs/y7-science/unit2-close-engines.md:
// an interactive deck (17 scored items), the deck's ten key words, a mixed-type
// Workbook, pH Lab (classify · colour · litmus · strength · neutralise), Label
// It on three of the deck's diagrams, cloze reading and four reasoning
// questions. 145 XP available, capped at 100.
//
// There are no Learner's Book pages behind 2.8 — Unit 2 of the book ends at 2.7
// — so, like the classroom deck, the unit is built to the Cambridge Lower
// Secondary Stage 7 content on acids, alkalis, indicators, the pH scale and
// neutralisation, with the classroom's own pH values.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U02_8_DATA = {
  meta: {
    id: 'U02_8',
    title: 'Acids and Bases',
    desc: 'Two clear glasses and no tasting allowed: acids, bases and the corrosive symbol, then litmus, the pH scale and its colours — and neutralising an acid, drop by drop.',
    track: 'Y7_SCI',
    icon: 'FlaskConical',
    classroom: [
      { course: 'y7-science', slug: 'U02_8', title: 'Science 2.8 · Acids and Bases' },
    ],
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
      // 25 of the 35 XP before it (71%).
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'PH_LAB', dbKey: 'p75', maxXP: 20 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 15 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 15 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // Quiz and arcade share one gate at 80 of the 125 XP before it (64%).
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // pH Lab (unit2-close-engines.md §4): rounds cycle classify → colour →
  // litmus → strength → neutralise, drawn fresh from a seed by utils/phLab.js.
  phLab: {
    title: 'pH Lab', titleVn: 'Phòng thí nghiệm pH',
    modes: ['classify', 'colour', 'litmus', 'strength', 'neutralise'],
    rounds: 10,
  },

  // The deck's ten key words, definitions from its Key word cards (the
  // classroom's seven write panels).
  realWords: [
    {
      word: 'Acid', vn: 'Axit',
      def: 'A substance that tastes sour. A strong acid can burn your skin.',
      vnDef: 'Chất có vị chua. Axit mạnh có thể làm bỏng da.',
      sent: 'Lemon juice is an acid, so it tastes sour.',
      vnSent: 'Nước chanh là axit, nên nó có vị chua.',
      isReal: true,
    },
    {
      word: 'Alkali', vn: 'Kiềm',
      def: 'A base that dissolves in water.',
      vnDef: 'Bazơ tan được trong nước.',
      sent: 'Soapy water is an alkali, so it turns red litmus blue.',
      vnSent: 'Nước xà phòng là kiềm, nên nó làm giấy quỳ đỏ chuyển xanh.',
      isReal: true,
    },
    {
      word: 'Base', vn: 'Bazơ',
      def: 'The chemical opposite of an acid.',
      vnDef: 'Chất đối lập hóa học của axit.',
      sent: 'An indigestion tablet is a base that cancels out stomach acid.',
      vnSent: 'Viên thuốc đau dạ dày là một bazơ triệt tiêu axit trong dạ dày.',
      isReal: true,
    },
    {
      word: 'Corrosive', vn: 'Ăn mòn',
      def: 'It attacks skin, eyes and clothes.',
      vnDef: 'Làm hỏng da, mắt và quần áo.',
      sent: 'Oven cleaner is corrosive, so never let it touch your skin.',
      vnSent: 'Nước tẩy lò có tính ăn mòn, nên đừng bao giờ để nó dính vào da.',
      isReal: true,
    },
    {
      word: 'Indicator', vn: 'Chất chỉ thị',
      def: 'A substance that changes colour to show an acid or an alkali.',
      vnDef: 'Chất đổi màu để cho biết đó là axit hay kiềm.',
      sent: 'Red cabbage water is an indicator you can make at home.',
      vnSent: 'Nước bắp cải tím là một chất chỉ thị em có thể tự làm ở nhà.',
      isReal: true,
    },
    {
      word: 'Litmus', vn: 'Quỳ',
      def: 'The simplest indicator. It comes as red paper and blue paper.',
      vnDef: 'Chất chỉ thị đơn giản nhất. Có loại giấy đỏ và giấy xanh.',
      sent: 'Blue litmus turns red in an acid.',
      vnSent: 'Giấy quỳ xanh chuyển đỏ trong axit.',
      isReal: true,
    },
    {
      word: 'Neutral', vn: 'Trung tính',
      def: 'Not an acid and not a base. Its pH is exactly 7.',
      vnDef: 'Không phải axit, cũng không phải bazơ. pH đúng bằng 7.',
      sent: 'Pure water is neutral, so universal indicator turns green in it.',
      vnSent: 'Nước tinh khiết trung tính, nên chất chỉ thị vạn năng chuyển xanh lá trong đó.',
      isReal: true,
    },
    {
      word: 'Neutralisation', vn: 'Sự trung hòa',
      def: 'An acid and a base cancel each other out and make something neutral.',
      vnDef: 'Axit và bazơ triệt tiêu lẫn nhau, tạo ra chất trung tính.',
      sent: 'Brushing your teeth after a meal is neutralisation: the toothpaste cancels out the acid.',
      vnSent: 'Đánh răng sau bữa ăn là sự trung hòa: kem đánh răng triệt tiêu axit.',
      isReal: true,
    },
    {
      word: 'pH scale', vn: 'Thang pH',
      def: 'Numbers from 1 to 14 that say how strong an acid or an alkali is.',
      vnDef: 'Các số từ 1 đến 14 cho biết axit hay kiềm mạnh đến mức nào.',
      sent: 'On the pH scale, lemon juice is 2 and soap is 10.',
      vnSent: 'Trên thang pH, nước chanh là 2 và xà phòng là 10.',
      isReal: true,
    },
    {
      word: 'Universal indicator', vn: 'Chất chỉ thị vạn năng',
      def: 'An indicator that gives many colours, not just two.',
      vnDef: 'Chất chỉ thị cho nhiều màu, không chỉ hai màu.',
      sent: 'Universal indicator turns purple in oven cleaner.',
      vnSent: 'Chất chỉ thị vạn năng chuyển tím trong nước tẩy lò.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Sour and Slippery',
      text: 'Lemons, vinegar and tamarind all taste sour, because each one contains an acid. Soap feels slippery between wet fingers, and it belongs to the opposite family: soap is a {base}. A base that dissolves in water, such as soapy water, is called an {alkali}. In the lab, you must never taste a liquid to find out which family it belongs to, because some acids and alkalis are strong enough to burn. A bottle of oven cleaner carries a warning symbol, because it is {corrosive}: it attacks skin, eyes and clothes.',
      vnTitle: 'Chua và trơn',
      vnText: 'Chanh, giấm và me đều có vị chua, vì mỗi thứ đều chứa axit. Xà phòng có cảm giác trơn giữa các ngón tay ướt, và nó thuộc nhóm đối lập: xà phòng là một {base}. Bazơ tan được trong nước, như nước xà phòng, được gọi là {alkali}. Trong phòng thí nghiệm, em không bao giờ được nếm một chất lỏng để biết nó thuộc nhóm nào, vì một số axit và kiềm đủ mạnh để gây bỏng. Chai nước tẩy lò có kí hiệu cảnh báo, vì nó {corrosive}: nó làm hỏng da, mắt và quần áo.',
    },
    {
      id: 'passage_2',
      title: 'Testing With Colour',
      text: 'How can you tell lemon juice from soapy water without tasting them? Use an indicator, a substance that changes colour. The simplest one is {litmus}: blue paper turns red in an acid, and red paper turns blue in an alkali. But two colours cannot say how strong a liquid is. {Universal indicator} gives many colours instead, and each colour matches a number on the {pH scale}, from 1 to 14. Red is a strong acid, green is pH 7, and purple is a strong alkali.',
      vnTitle: 'Thử bằng màu sắc',
      vnText: 'Làm sao phân biệt nước chanh với nước xà phòng mà không cần nếm? Hãy dùng chất chỉ thị, một chất biết đổi màu. Loại đơn giản nhất là {litmus}: giấy xanh chuyển đỏ trong axit, và giấy đỏ chuyển xanh trong kiềm. Nhưng hai màu không cho biết chất lỏng mạnh đến đâu. {Universal indicator} thì cho nhiều màu, và mỗi màu ứng với một số trên {pH scale}, từ 1 đến 14. Đỏ là axit mạnh, xanh lá là pH 7, còn tím là kiềm mạnh.',
    },
    {
      id: 'passage_3',
      title: 'Cancelling Out',
      text: 'After two bowls of spicy noodles, Mr Bowen has too much acid in his stomach, and it hurts. He swallows an indigestion tablet, which is a base. The base meets the acid and cancels it out. This is called {neutralisation}. The liquid in his stomach moves towards pH 7, which is {neutral}: not an acid and not a base. Farmers use the same idea when they spread lime on soil that is too acidic, and you use it every time you brush your teeth after a meal, because toothpaste is a base.',
      vnTitle: 'Triệt tiêu lẫn nhau',
      vnText: 'Sau hai tô mì cay, dạ dày thầy Bowen thừa axit, và đang đau. Thầy uống một viên thuốc đau dạ dày, là một bazơ. Bazơ gặp axit và triệt tiêu nó. Việc này gọi là {neutralisation}. Chất lỏng trong dạ dày tiến về pH 7, tức là {neutral}: không phải axit, cũng không phải bazơ. Người nông dân dùng cùng ý tưởng này khi rải vôi lên đất quá chua, và em dùng nó mỗi lần đánh răng sau bữa ăn, vì kem đánh răng là bazơ.',
    },
  ],


  shortQA: [
    {
      id: 'sq1',
      question: 'Lemon juice and soapy water are both clear and look the same. Describe how you could use litmus paper to tell them apart, without tasting either one.',
      vnTranslation: 'Nước chanh và nước xà phòng đều trong suốt và trông giống nhau. Hãy mô tả cách em có thể dùng giấy quỳ để phân biệt chúng, mà không nếm thứ nào.',
      suggestedWords: [['litmus', 'dip', 'never taste'], ['acid', 'blue litmus', 'turns red'], ['alkali', 'red litmus', 'turns blue']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the test: dip litmus paper (an indicator) into each liquid and look at the colour of the wet end — no tasting.',
        '1 mark for results that tell them apart: lemon juice is an acid, so it turns blue litmus red; soapy water is an alkali, so it turns red litmus blue (or: leaves blue litmus blue).',
      ],
      modelAnswer: 'I would dip litmus paper into each glass instead of tasting. Lemon juice is an acid, so it turns blue litmus paper red, and red litmus stays red. Soapy water is an alkali, so it turns red litmus paper blue, and blue litmus stays blue. The glass that turns blue litmus red is the lemon juice.',
    },
    {
      id: 'sq2',
      question: 'A student says: "Only acids can burn your skin, so a liquid at pH 13 is safe to touch." Explain why the student is wrong.',
      vnTranslation: 'Một học sinh nói: "Chỉ có axit mới làm bỏng da, nên chất lỏng có pH 13 thì chạm vào được." Hãy giải thích vì sao học sinh đó sai.',
      suggestedWords: [['above 7', 'alkali', 'strong'], ['corrosive', 'burns', 'both ends'], ['oven cleaner']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying pH 13 is far above 7, so the liquid is a strong alkali (near the end of the scale).',
        '1 mark for explaining that a strong alkali is corrosive and burns skin just as a strong acid does — danger is at BOTH ends of the scale (for example, oven cleaner at pH 13).',
      ],
      modelAnswer: 'pH 13 is far above 7, near the end of the scale, so the liquid is a strong alkali. Strong alkalis are corrosive: they attack skin, eyes and clothes just like strong acids. Danger is at both ends of the pH scale, not just the acid end. Oven cleaner is pH 13, and that is why its bottle says do not touch.',
    },
    {
      id: 'sq3',
      question: 'Sea water is pH 8 and oven cleaner is pH 13. Explain why litmus paper cannot tell them apart, but universal indicator can.',
      vnTranslation: 'Nước biển có pH 8 và nước tẩy lò có pH 13. Hãy giải thích vì sao giấy quỳ không phân biệt được chúng, nhưng chất chỉ thị vạn năng thì được.',
      suggestedWords: [['both alkalis', 'above 7'], ['red litmus', 'turns blue', 'two colours'], ['universal indicator', 'many colours', 'how strong']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for explaining litmus: both liquids are above 7, so both are alkalis and both turn red litmus blue — litmus has only two colours, so it only shows the family.',
        '1 mark for explaining universal indicator: it gives many colours, a different colour for each pH, so it shows how strong (sea water blue-green, oven cleaner purple).',
      ],
      modelAnswer: 'Both liquids are above 7, so both are alkalis. An alkali turns red litmus blue, so both liquids give exactly the same result: litmus has only two colours and only shows the family. Universal indicator gives many colours, one for each number on the pH scale. Sea water turns it blue-green and oven cleaner turns it purple, so it shows that oven cleaner is the much stronger alkali.',
    },
    {
      id: 'sq4',
      question: 'Toothpaste has a pH of 9. Explain why brushing your teeth after a meal helps to protect them.',
      vnTranslation: 'Kem đánh răng có pH 9. Hãy giải thích vì sao đánh răng sau bữa ăn giúp bảo vệ răng.',
      suggestedWords: [['food', 'acid', 'teeth'], ['base', 'alkali', 'above 7'], ['neutralises', 'towards 7']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying food leaves acid on the teeth after a meal.',
        '1 mark for explaining that toothpaste is a base / alkali (pH 9 is above 7), so it neutralises the acid — the acid and base cancel out and the pH moves towards 7.',
      ],
      modelAnswer: 'After a meal, food leaves acid on your teeth. Toothpaste has a pH of 9, which is above 7, so it is a base. When you brush, the base neutralises the acid: they cancel each other out and the pH on your teeth moves towards 7. Brushing before a meal would not do this, because the acid has not been made yet.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the deck's own diagrams, labels stripped
  // at runtime. Coordinates from `node scripts/svg-coords.mjs Y7_SCI/U02_8 <KEY>`.
  // The fourteen numbers on PH_SCALE and the "+" on NEUTRALISE are tagged
  // class="keep" in diagrams.js, so the scale stays numbered. Every bank's
  // distractors are absent from the drawing. ACIDS_ROUND, BASES_ROUND and
  // NEUTRAL_LIFE are not used: their printed text is the content.
  labelIt: [
    {
      id: 'ph_scale',
      title: 'Label the pH scale', titleVn: 'Gắn nhãn thang pH',
      inlineSvg: DIAGRAMS.PH_SCALE, viewBox: '0 0 1120 520',
      // The three bands where ACID / 7 neutral / ALKALI were printed, then a
      // box to the right of each beaker: match the liquid to its colour.
      pins: [
        { id: 'p1', x: 264, y: 272, answer: 'acid' },
        { id: 'p2', x: 523, y: 366, answer: 'neutral' },
        { id: 'p3', x: 819, y: 272, answer: 'alkali' },
        { id: 'p4', x: 172, y: 448, to: [120, 448], side: 'right', answer: 'lemon' },
        { id: 'p5', x: 522, y: 448, to: [470, 448], side: 'right', answer: 'water' },
        { id: 'p6', x: 842, y: 448, to: [790, 448], side: 'right', answer: 'soap' },
      ],
      bank: [
        { val: 'acid', text: 'Acid — below 7', textVn: 'Axit — nhỏ hơn 7' },
        { val: 'neutral', text: 'Neutral — exactly 7', textVn: 'Trung tính — đúng 7' },
        { val: 'alkali', text: 'Alkali — above 7', textVn: 'Kiềm — lớn hơn 7' },
        { val: 'lemon', text: 'Lemon juice', textVn: 'Nước chanh' },
        { val: 'water', text: 'Pure water', textVn: 'Nước tinh khiết' },
        { val: 'soap', text: 'Soapy water', textVn: 'Nước xà phòng' },
        { val: 'acid_above', text: 'Acid — above 7', textVn: 'Axit — lớn hơn 7' },
        { val: 'oven', text: 'Oven cleaner', textVn: 'Nước tẩy lò' },
      ],
    },
    {
      id: 'litmus',
      title: 'Label the litmus rule', titleVn: 'Gắn nhãn quy tắc giấy quỳ',
      inlineSvg: DIAGRAMS.LITMUS_RULE, viewBox: '0 0 840 620',
      // Each row's heading, then the paper before (left) and what it did (right).
      pins: [
        { id: 'p1', x: 420, y: 78, answer: 'acid_row' },
        { id: 'p2', x: 160, y: 266, answer: 'blue' },
        { id: 'p3', x: 664, y: 266, answer: 'turns_red' },
        { id: 'p4', x: 420, y: 366, answer: 'alkali_row' },
        { id: 'p5', x: 160, y: 554, answer: 'red' },
        { id: 'p6', x: 664, y: 554, answer: 'turns_blue' },
      ],
      bank: [
        { val: 'acid_row', text: 'Dip it in an acid', textVn: 'Nhúng vào axit' },
        { val: 'alkali_row', text: 'Dip it in an alkali', textVn: 'Nhúng vào kiềm' },
        { val: 'blue', text: 'Blue litmus', textVn: 'Giấy quỳ xanh' },
        { val: 'red', text: 'Red litmus', textVn: 'Giấy quỳ đỏ' },
        { val: 'turns_red', text: 'Turns red', textVn: 'Chuyển đỏ' },
        { val: 'turns_blue', text: 'Turns blue', textVn: 'Chuyển xanh' },
        { val: 'water_row', text: 'Dip it in pure water', textVn: 'Nhúng vào nước tinh khiết' },
        { val: 'turns_green', text: 'Turns green', textVn: 'Chuyển xanh lá' },
      ],
    },
    {
      id: 'neutralise',
      title: 'Label acid + alkali', titleVn: 'Gắn nhãn axit + kiềm',
      inlineSvg: DIAGRAMS.NEUTRALISE, viewBox: '0 0 1120 500',
      // A box under each beaker — read its colour against the scale below — and
      // one for the two arrows that meet in the middle.
      pins: [
        { id: 'p1', x: 120, y: 266, answer: 'acid' },
        { id: 'p2', x: 480, y: 266, answer: 'alkali' },
        { id: 'p3', x: 920, y: 266, answer: 'neutral' },
        { id: 'p4', x: 560, y: 462, answer: 'towards' },
      ],
      bank: [
        { val: 'acid', text: 'Acid, pH 2', textVn: 'Axit, pH 2' },
        { val: 'alkali', text: 'Alkali, pH 12', textVn: 'Kiềm, pH 12' },
        { val: 'neutral', text: 'Neutral, pH 7', textVn: 'Trung tính, pH 7' },
        { val: 'towards', text: 'Both move towards 7', textVn: 'Cả hai tiến về 7' },
        { val: 'acid12', text: 'Acid, pH 12', textVn: 'Axit, pH 12' },
        { val: 'away', text: 'Both move away from 7', textVn: 'Cả hai đi xa khỏi 7' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
