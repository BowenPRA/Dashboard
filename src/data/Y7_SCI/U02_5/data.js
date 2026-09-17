// src/data/Y7_SCI/U02_5/data.js
// 2.5 Atoms, Elements and the Periodic Table — Year 7 Science self-study unit,
// the twin of the classroom lesson y7-science/U02_5. Built to
// docs/y7-science/particle-engines.md: the most interactive science deck yet
// (18 scored items, the new `periodic` activity four times), a mixed-type
// Workbook, the generative Element Hunt, Label It on three drawn diagrams,
// cloze reading and four reasoning questions. 145 XP available, capped at 100.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U02_5_DATA = {
  meta: {
    id: 'U02_5',
    title: 'Atoms, Elements and the Periodic Table',
    desc: 'Cut gold until it cannot be cut, meet the atom and the element, then find your way around the first 20 elements of the Periodic Table and write their symbols.',
    track: 'Y7_SCI',
    icon: 'Atom',
    classroom: [
      { course: 'y7-science', slug: 'U02_5', title: 'Science 2.5 · Atoms, Elements and the Periodic Table' },
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
        { id: 'ELEMENT_HUNT', dbKey: 'p43', maxXP: 20 },
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

  // Generative: rounds cycle through the modes, drawn fresh from a seed
  // (src/utils/elementHunt.js), so a second attempt asks about other elements.
  elementHunt: {
    title: 'Element Hunt',
    titleVn: 'Truy tìm nguyên tố',
    modes: ['find', 'symbol', 'name', 'place', 'metal', 'mass'],
    rounds: 12,
  },

  // The book's Key words box, defined as the classroom write notes define them.
  realWords: [
    {
      word: 'Atom', vn: 'Nguyên tử',
      def: 'A tiny piece of matter. Everything is made of atoms. The word atom means cannot be divided.',
      vnDef: 'Một mẩu vật chất rất nhỏ. Mọi thứ đều được tạo nên từ nguyên tử. Từ atom có nghĩa là không thể chia nhỏ.',
      sent: 'Keep cutting a piece of gold and you reach one gold atom.',
      vnSent: 'Cứ cắt mãi một miếng vàng, em sẽ đến một nguyên tử vàng.',
      isReal: true,
    },
    {
      word: 'Nanotube', vn: 'Ống nano',
      def: 'A very, very small tube made of carbon atoms. Nano means very, very small.',
      vnDef: 'Một ống rất, rất nhỏ tạo nên từ nguyên tử cacbon. Nano nghĩa là rất, rất nhỏ.',
      sent: 'A nanotube is thousands of times thinner than a hair.',
      vnSent: 'Một ống nano mỏng hơn sợi tóc hàng nghìn lần.',
      isReal: true,
    },
    {
      word: 'Element', vn: 'Nguyên tố',
      def: 'A substance made of only one kind of atom. Gold, silver and carbon are elements.',
      vnDef: 'Một chất chỉ được tạo nên từ một loại nguyên tử. Vàng, bạc và cacbon là các nguyên tố.',
      sent: 'Silver is an element because it is made of only silver atoms.',
      vnSent: 'Bạc là một nguyên tố vì nó chỉ gồm nguyên tử bạc.',
      isReal: true,
    },
    {
      word: 'Periodic Table', vn: 'Bảng tuần hoàn',
      def: 'A way of arranging all the elements, in rows and columns.',
      vnDef: 'Một cách sắp xếp tất cả các nguyên tố, theo hàng và cột.',
      sent: 'The Periodic Table on the lab wall shows all 118 elements.',
      vnSent: 'Bảng tuần hoàn trên tường phòng thí nghiệm cho thấy cả 118 nguyên tố.',
      isReal: true,
    },
    {
      word: 'Period', vn: 'Chu kì',
      def: 'A row in the Periodic Table. In everyday English, a period is also one lesson at school.',
      vnDef: 'Một hàng trong Bảng tuần hoàn. Trong tiếng Anh đời thường, period còn là một tiết học.',
      sent: 'Sodium and chlorine are in the same period.',
      vnSent: 'Natri và clo cùng một chu kì.',
      isReal: true,
    },
    {
      word: 'Group', vn: 'Nhóm',
      def: 'A column in the Periodic Table. Elements in the same group are similar.',
      vnDef: 'Một cột trong Bảng tuần hoàn. Các nguyên tố cùng một nhóm thì giống nhau.',
      sent: 'Helium, neon and argon are in the same group.',
      vnSent: 'Heli, neon và agon cùng một nhóm.',
      isReal: true,
    },
    {
      word: 'Metal', vn: 'Kim loại',
      def: 'An element like iron, copper or aluminium. In the Periodic Table, the metals are the yellow boxes.',
      vnDef: 'Một nguyên tố như sắt, đồng hoặc nhôm. Trong Bảng tuần hoàn, kim loại là các ô màu vàng.',
      sent: 'Magnesium is a metal, but sulfur is not.',
      vnSent: 'Magie là kim loại, nhưng lưu huỳnh thì không.',
      isReal: true,
    },
    {
      word: 'Symbol', vn: 'Kí hiệu',
      def: 'A short way to write the name of an element. The first letter is always a capital and the second is always small.',
      vnDef: 'Cách viết ngắn gọn tên của một nguyên tố. Chữ cái đầu luôn viết hoa và chữ thứ hai luôn viết thường.',
      sent: 'The symbol for calcium is Ca, not CA.',
      vnSent: 'Kí hiệu của canxi là Ca, không phải CA.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'The Piece You Cannot Cut',
      text: 'More than two thousand years ago, a Greek thinker called Democritus asked a simple question: if you cut a piece of gold in half again and again, can you go on forever? He said no. In the end you reach a tiny piece that cannot be cut, and today we call it an {atom}. Everything is made of atoms, and they are so small that only 25 halvings take a 1 cm gold cube down to the width of one. Scientists can now see atoms with a special microscope, and they can even build a {nanotube}, a very small tube made of carbon atoms. Gold, silver and carbon are each made of only one kind of atom, so each one is an {element}.',
      vnTitle: 'Mẩu không thể cắt',
      vnText: 'Hơn hai nghìn năm trước, một nhà tư tưởng Hy Lạp tên là Democritus đặt ra một câu hỏi đơn giản: nếu em cắt đôi một miếng vàng hết lần này đến lần khác, em có thể cắt mãi không? Ông nói không. Cuối cùng em sẽ đến một mẩu rất nhỏ không thể cắt được nữa, và ngày nay ta gọi nó là {atom}. Mọi thứ đều được tạo nên từ nguyên tử, và chúng nhỏ đến mức chỉ cần 25 lần cắt đôi là một khối vàng 1 cm còn rộng bằng một nguyên tử. Ngày nay các nhà khoa học có thể nhìn thấy nguyên tử bằng một loại kính hiển vi đặc biệt, và thậm chí còn chế tạo được {nanotube}, một ống rất nhỏ làm từ nguyên tử cacbon. Vàng, bạc và cacbon mỗi chất chỉ gồm một loại nguyên tử, nên mỗi chất là một {element}.',
    },
    {
      id: 'passage_2',
      title: 'Rows and Columns',
      text: 'There are 94 natural elements and 24 more made by scientists. To find your way around all 118 of them, scientists use the {Periodic Table}, a chart that arranges the elements in rows and columns. Each row is called a {period}, which is a strange word if you only know it as a lesson at school. Each column is called a {group}. Reading the table like a page of English, from left to right and then down to the next row, the atoms get heavier: hydrogen is the lightest, and of the first 20 elements, calcium is the heaviest.',
      vnTitle: 'Hàng và cột',
      vnText: 'Có 94 nguyên tố tự nhiên và 24 nguyên tố khác do các nhà khoa học tạo ra. Để tìm đường giữa cả 118 nguyên tố này, các nhà khoa học dùng {Periodic Table}, một bảng sắp xếp các nguyên tố theo hàng và cột. Mỗi hàng được gọi là một {period}, một từ lạ nếu em chỉ biết nó là một tiết học ở trường. Mỗi cột được gọi là một {group}. Đọc bảng như đọc một trang tiếng Anh, từ trái sang phải rồi xuống hàng tiếp, nguyên tử nặng dần: hiđro nhẹ nhất, và trong 20 nguyên tố đầu tiên, canxi nặng nhất.',
    },
    {
      id: 'passage_3',
      title: 'Why Sodium Is Na',
      text: 'The table puts similar elements close together. Iron, copper and aluminium are shiny, and each one is a {metal}; in the first 20 elements the metals sit on the left of each row, and the non-metals, like oxygen and neon, sit on the right. Every element also has a {symbol}, a short way to write its name. Oxygen is O and helium is He, but sodium is Na, from natrium, its old Latin name. The capital letters matter: Co is one element, cobalt, but CO is two elements, carbon and oxygen.',
      vnTitle: 'Vì sao sodium là Na',
      vnText: 'Bảng xếp các nguyên tố giống nhau ở gần nhau. Sắt, đồng và nhôm sáng bóng, và mỗi chất là một {metal}; trong 20 nguyên tố đầu tiên, kim loại nằm ở bên trái mỗi hàng, còn phi kim như oxi và neon nằm ở bên phải. Mỗi nguyên tố cũng có một {symbol}, cách viết ngắn gọn tên của nó. Oxi là O và heli là He, nhưng natri là Na, từ natrium, tên La-tinh cổ của nó. Chữ hoa rất quan trọng: Co là một nguyên tố, coban, nhưng CO là hai nguyên tố, cacbon và oxi.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between an atom and an element. Use gold as your example.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa nguyên tử và nguyên tố. Dùng vàng làm ví dụ.',
      suggestedWords: [['atom', 'tiny piece', 'matter'], ['element', 'one kind of atom'], ['gold atoms']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying an atom is a tiny piece of matter (the smallest piece, which cannot be divided), and everything is made of atoms.',
        '1 mark for saying an element is a substance made of only one kind of atom, with gold as the example: gold is an element because it is made only of gold atoms (one gold atom is an atom; a gold bar is the element).',
      ],
      modelAnswer: 'An atom is a tiny piece of matter — the smallest piece, which cannot be cut any further — and everything is made of atoms. An element is a substance made of only one kind of atom. Gold is an element because a piece of gold is made only of gold atoms; one of those tiny pieces is a gold atom.',
    },
    {
      id: 'sq2',
      question: 'The symbol for sulfur is S, but the symbol for sodium is Na. Explain how each symbol was made, and why the symbol for sodium does not start with S.',
      vnTranslation: 'Kí hiệu của sulfur (lưu huỳnh) là S, nhưng kí hiệu của sodium (natri) là Na. Hãy giải thích mỗi kí hiệu được tạo ra như thế nào, và vì sao kí hiệu của sodium không bắt đầu bằng chữ S.',
      suggestedWords: [['first letter'], ['Latin', 'natrium'], ['capital', 'small']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying S is the first letter of sulfur\'s name.',
        '1 mark for saying Na comes from sodium\'s old Latin name, natrium (so its letters come from a different name, not the English word sodium).',
      ],
      modelAnswer: 'The symbol S is made from the first letter of sulfur. Sodium\'s symbol is not made from its English name at all: Na comes from natrium, the old Latin name for sodium. That is why it starts with N, not S. Like every symbol, it has a capital first letter and a small second letter.',
    },
    {
      id: 'sq3',
      question: 'One student writes Co and another writes CO. Explain why these mean different things.',
      vnTranslation: 'Một học sinh viết Co và một học sinh khác viết CO. Hãy giải thích vì sao hai cách viết này có nghĩa khác nhau.',
      suggestedWords: [['capital', 'small', 'lower case'], ['one element', 'cobalt'], ['two elements', 'carbon', 'oxygen']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for explaining that Co (a capital then a small letter) is one symbol, so it is one element: cobalt.',
        '1 mark for explaining that CO has two capital letters, so it is two symbols: C (carbon) and O (oxygen), two different elements.',
      ],
      modelAnswer: 'Every symbol starts with one capital letter, and any second letter is small. Co has a capital C and a small o, so it is one symbol — the element cobalt, a metal. CO has two capital letters, so it is two symbols: C for carbon and O for oxygen. That means two different elements, not one.',
    },
    {
      id: 'sq4',
      question: 'Helium, neon and argon are in the same group of the Periodic Table. Explain what a group is, and what elements in the same group have in common.',
      vnTranslation: 'Heli, neon và agon cùng một nhóm trong Bảng tuần hoàn. Hãy giải thích nhóm là gì, và các nguyên tố cùng một nhóm có điểm gì chung.',
      suggestedWords: [['group', 'column'], ['similar', 'close together'], ['non-metals', 'gases', 'atoms alone']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying a group is a column in the Periodic Table (not a row, which is a period).',
        '1 mark for saying elements in the same group are similar, because the table puts similar elements close together — e.g. helium, neon and argon are all non-metals whose atoms move around alone (or all are gases).',
      ],
      modelAnswer: 'A group is a column in the Periodic Table; a row is called a period. The table puts similar elements close together, so elements in the same group are similar to each other. Helium, neon and argon are all non-metals, all gases, and in all three the atoms move around alone instead of joining together.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's drawn diagrams, labels stripped
  // at runtime. Coordinates from `node scripts/svg-coords.mjs Y7_SCI/U02_5 <KEY>`.
  // JOINING and SIZE_LADDER have no leader lines, so their pins sit at each
  // panel's label; PT_MAP's pins sit where each leader line ends. Every bank
  // carries a distractor.
  labelIt: [
    {
      id: 'joining',
      title: 'Label how the atoms join', titleVn: 'Gắn nhãn cách các nguyên tử liên kết',
      inlineSvg: DIAGRAMS.JOINING, viewBox: '0 0 1120 440',
      pins: [
        { id: 'p1', x: 152, y: 372, answer: 'neon' },
        { id: 'p2', x: 427, y: 372, answer: 'gold' },
        { id: 'p3', x: 702, y: 372, answer: 'oxygen' },
        { id: 'p4', x: 977, y: 372, answer: 'sulfur' },
      ],
      bank: [
        { val: 'neon', text: 'Neon: atoms move around alone', textVn: 'Neon: nguyên tử chuyển động riêng lẻ' },
        { val: 'gold', text: 'Gold: atoms packed closely', textVn: 'Vàng: nguyên tử xếp sát nhau' },
        { val: 'oxygen', text: 'Oxygen: particles of 2 atoms joined', textVn: 'Oxi: hạt gồm 2 nguyên tử liên kết' },
        { val: 'sulfur', text: 'Sulfur: particles of 8 atoms in a ring', textVn: 'Lưu huỳnh: hạt gồm 8 nguyên tử thành vòng' },
        { val: 'mixed', text: 'Atoms of two different elements joined', textVn: 'Nguyên tử của hai nguyên tố khác nhau liên kết' },
      ],
    },
    {
      id: 'table',
      title: 'Label the Periodic Table', titleVn: 'Gắn nhãn Bảng tuần hoàn',
      inlineSvg: DIAGRAMS.PT_MAP, viewBox: '0 0 900 400',
      pins: [
        { id: 'p1', x: 92, y: 126, answer: 'group' },
        { id: 'p2', x: 741, y: 223, answer: 'period' },
        { id: 'p3', x: 156, y: 298, answer: 'metals' },
        { id: 'p4', x: 716, y: 160, answer: 'nonmetals' },
        { id: 'p5', x: 298, y: 90, answer: 'hydrogen' },
      ],
      bank: [
        { val: 'group', text: 'A group (a column)', textVn: 'Một nhóm (một cột)' },
        { val: 'period', text: 'A period (a row)', textVn: 'Một chu kì (một hàng)' },
        { val: 'metals', text: 'Metals (yellow)', textVn: 'Kim loại (màu vàng)' },
        { val: 'nonmetals', text: 'Non-metals (blue)', textVn: 'Phi kim (màu xanh)' },
        { val: 'hydrogen', text: 'Hydrogen: in no group', textVn: 'Hiđro: không thuộc nhóm nào' },
        { val: 'lightest', text: 'Helium: the lightest atoms', textVn: 'Heli: nguyên tử nhẹ nhất' },
      ],
    },
    {
      id: 'ladder',
      title: 'Label the cuts, from a gold cube to one atom', titleVn: 'Gắn nhãn các lần cắt, từ khối vàng đến một nguyên tử',
      inlineSvg: DIAGRAMS.SIZE_LADDER, viewBox: '0 0 1000 350',
      pins: [
        { id: 'p1', x: 95, y: 292, answer: 'cube' },
        { id: 'p2', x: 257, y: 292, answer: 'sand' },
        { id: 'p3', x: 419, y: 292, answer: 'hair' },
        { id: 'p4', x: 581, y: 292, answer: 'cell' },
        { id: 'p5', x: 743, y: 292, answer: 'virus' },
        { id: 'p6', x: 905, y: 292, answer: 'atom' },
      ],
      bank: [
        { val: 'cube', text: 'A 1 cm gold cube (0 cuts)', textVn: 'Khối vàng 1 cm (0 lần cắt)' },
        { val: 'sand', text: 'A grain of sand (3 cuts)', textVn: 'Một hạt cát (3 lần cắt)' },
        { val: 'hair', text: 'As thin as a hair (7 cuts)', textVn: 'Mỏng như sợi tóc (7 lần cắt)' },
        { val: 'cell', text: 'One cell (9 cuts)', textVn: 'Một tế bào (9 lần cắt)' },
        { val: 'virus', text: 'A virus (17 cuts)', textVn: 'Một vi-rút (17 lần cắt)' },
        { val: 'atom', text: 'One gold atom (25 cuts)', textVn: 'Một nguyên tử vàng (25 lần cắt)' },
        { val: 'rice', text: 'A grain of rice', textVn: 'Một hạt gạo' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
