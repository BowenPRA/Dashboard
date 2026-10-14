// src/data/Y7_SCI/U02_7/data.js
// 2.7 Compounds and Mixtures — Year 7 Science self-study unit, reduced from the
// classroom lesson y7-science/U02_7 to docs/y7-science/particle-engines.md:
// an interactive deck (18 scored items), the book's key words, a mixed-type
// Workbook, Particle Lab (classify · pure · magnet · formula · count, with
// mixtures), Label It on three of the deck's diagrams, cloze reading and
// four reasoning questions. 145 XP available, capped at 100.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U02_7_DATA = {
  meta: {
    id: 'U02_7',
    title: 'Compounds and Mixtures',
    desc: 'Iron and sulfur stirred make a mixture; heated, they make a compound. Then the everyday mixtures — air, mineral water, tap water — and what pure really means.',
    track: 'Y7_SCI',
    icon: 'Magnet',
    classroom: [
      { course: 'y7-science', slug: 'U02_7', title: 'Science 2.7 · Compounds and Mixtures' },
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
        { id: 'PARTICLE_LAB', dbKey: 'p44', maxXP: 20 },
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

  // Particle Lab (particle-engines.md §2): rounds cycle classify → pure →
  // magnet → formula → count, drawn fresh from a seed; classify includes
  // mixtures in this unit.
  particleLab: {
    title: 'Particle Lab', titleVn: 'Phòng thí nghiệm hạt', titleFr: 'Labo des particules',
    modes: ['classify', 'pure', 'magnet', 'formula', 'count'],
    mixtures: true,
    rounds: 10,
  },

  // The book's key words for 2.7 (p. 64), definitions from the deck's Key word
  // cards. "Pipe-clay triangle" is also on the book's list, but the section
  // never uses it, so — as in the classroom — it is left out.
  realWords: [
    {
      word: 'Composition', vn: 'Thành phần', fr: 'Composition',
      def: 'What a mixture is made of, and how much of each. Air is 78% nitrogen, 21% oxygen and 1% other gases.',
      vnDef: 'Hỗn hợp gồm những chất gì, và mỗi chất bao nhiêu. Không khí gồm 78% nitơ, 21% oxi và 1% các khí khác.',
      frDef: 'Ce dont un mélange est fait, et en quelle quantité. L’air contient 78% d’azote, 21% d’oxygène et 1% d’autres gaz.',
      sent: 'The composition of air changes a little with the weather.',
      vnSent: 'Thành phần của không khí thay đổi một chút theo thời tiết.',
      frSent: 'La composition de l’air change un peu avec la météo.',
      isReal: true,
    },
    {
      word: 'Evaporating basin', vn: 'Bát cô cạn', fr: 'Capsule d’évaporation',
      def: 'A dish for heating a liquid until the water evaporates.',
      vnDef: 'Cái bát dùng để đun chất lỏng cho đến khi nước bay hơi hết.',
      frDef: 'Une coupelle pour chauffer un liquide jusqu’à ce que l’eau s’évapore.',
      sent: 'We heated the tap water in an evaporating basin until only a white solid was left.',
      vnSent: 'Chúng em đun nước máy trong bát cô cạn cho đến khi chỉ còn lại một chất rắn màu trắng.',
      frSent: 'Nous avons chauffé l’eau du robinet dans une capsule d’évaporation jusqu’à ce qu’il ne reste qu’un solide blanc.',
      isReal: true,
    },
    {
      word: 'Filings', vn: 'Mạt', fr: 'Limaille',
      def: 'Very small pieces of metal, such as iron filings.',
      vnDef: 'Những mẩu kim loại rất nhỏ, ví dụ mạt sắt.',
      frDef: 'De tout petits morceaux de métal, comme la limaille de fer.',
      sent: 'The magnet pulled the iron filings out of the sulfur.',
      vnSent: 'Nam châm hút mạt sắt ra khỏi lưu huỳnh.',
      frSent: 'L’aimant a attiré la limaille de fer hors du soufre.',
      isReal: true,
    },
    {
      word: 'Mineral', vn: 'Khoáng chất', fr: 'Minéral',
      def: 'A natural substance from rocks. Mineral water is a mixture of water and minerals.',
      vnDef: 'Một chất tự nhiên từ đất đá. Nước khoáng là hỗn hợp của nước và khoáng chất.',
      frDef: 'Une substance naturelle qui vient des roches. L’eau minérale est un mélange d’eau et de minéraux.',
      sent: 'Calcium is a mineral that dissolves in water as it flows through rocks.',
      vnSent: 'Canxi là một khoáng chất hòa tan vào nước khi nước chảy qua đất đá.',
      frSent: 'Le calcium est un minéral qui se dissout dans l’eau quand elle coule à travers les roches.',
      isReal: true,
    },
    {
      word: 'Mixture', vn: 'Hỗn hợp', fr: 'Mélange',
      def: 'Different substances mixed together, but not bonded. Each substance keeps its properties, and a mixture is easy to separate.',
      vnDef: 'Các chất khác nhau trộn lẫn với nhau, nhưng không liên kết. Mỗi chất giữ nguyên tính chất, và hỗn hợp dễ tách ra.',
      frDef: 'Des substances différentes mélangées ensemble, mais pas liées. Chaque substance garde ses propriétés, et un mélange est facile à séparer.',
      sent: 'Iron and sulfur stirred together make a mixture.',
      vnSent: 'Sắt và lưu huỳnh khuấy với nhau tạo thành một hỗn hợp.',
      frSent: 'Du fer et du soufre remués ensemble forment un mélange.',
      isReal: true,
    },
    {
      word: 'Natural emissions', vn: 'Khí thải tự nhiên', fr: 'Émissions naturelles',
      def: 'Gases that nature gives out. Volcanoes, animals and plants give out carbon dioxide.',
      vnDef: 'Các khí do tự nhiên thải ra. Núi lửa, động vật và thực vật thải ra cacbon đioxit.',
      frDef: 'Des gaz que la nature rejette. Les volcans, les animaux et les plantes rejettent du dioxyde de carbone.',
      sent: 'Carbon dioxide from a volcano is one of the natural emissions that change the air.',
      vnSent: 'Cacbon đioxit từ núi lửa là một trong những khí thải tự nhiên làm thay đổi không khí.',
      frSent: 'Le dioxyde de carbone d’un volcan fait partie des émissions naturelles qui changent l’air.',
      isReal: true,
    },
    {
      word: 'Pure', vn: 'Tinh khiết', fr: 'Pur',
      def: 'Contains only one substance. Pure water is only water. On a bottle, pure just means clean.',
      vnDef: 'Chỉ chứa một chất. Nước tinh khiết chỉ có nước. Trên chai nước, tinh khiết chỉ có nghĩa là sạch.',
      frDef: 'Qui ne contient qu’une seule substance. L’eau pure, c’est seulement de l’eau. Sur une bouteille, pure veut juste dire propre.',
      sent: 'Tap water is not pure, because minerals are dissolved in it.',
      vnSent: 'Nước máy không tinh khiết, vì có khoáng chất hòa tan trong đó.',
      frSent: 'L’eau du robinet n’est pas pure, parce que des minéraux y sont dissous.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'The Magnet Test',
      text: 'Tiny pieces of iron called {filings} are stirred into yellow sulfur powder. Nothing bonds, so the result is a {mixture}: the iron keeps its properties, and a magnet can still pull it out. Now heat the same powder until it glows. The iron and sulfur bond and make a new compound, iron sulfide, and the magnet does nothing. The dark grey solid is {pure} iron sulfide, because it contains only one substance.',
      vnTitle: 'Thí nghiệm nam châm',
      frTitle: 'Le test de l’aimant',
      vnText: 'Những mẩu sắt rất nhỏ gọi là {filings} được khuấy vào bột lưu huỳnh màu vàng. Không có gì liên kết, nên kết quả là một {mixture}: sắt giữ nguyên tính chất, và nam châm vẫn hút được nó ra. Bây giờ đun nóng chính lượng bột đó cho đến khi nó phát sáng. Sắt và lưu huỳnh liên kết và tạo thành một hợp chất mới, sắt sunfua, và nam châm không hút được nữa. Chất rắn màu xám đen đó là sắt sunfua {pure}, vì nó chỉ chứa một chất.',
      frText: 'De tout petits morceaux de fer appelés {filings} sont mélangés à de la poudre de soufre jaune. Rien ne se lie, donc on obtient un {mixture} : le fer garde ses propriétés, et un aimant peut encore l’attirer. Maintenant, chauffe la même poudre jusqu’à ce qu’elle rougeoie. Le fer et le soufre se lient et forment un nouveau composé, le sulfure de fer (iron sulfide), et l’aimant ne fait plus rien. Le solide gris foncé est du sulfure de fer {pure}, parce qu’il ne contient qu’une seule substance.',
    },
    {
      id: 'passage_2',
      title: 'What Is in a Breath?',
      text: 'Air is not one gas. Its {composition} is about 78% nitrogen, 21% oxygen and 1% other gases, such as carbon dioxide, argon and water vapour. None of these gases are bonded to each other, so air is a {mixture}, and the amounts can change. The water changes with the weather. The carbon dioxide changes too: volcanoes, animals and plants give it out as {natural emissions}, and people add more when they burn petrol.',
      vnTitle: 'Trong một hơi thở có gì?',
      frTitle: 'Qu’y a-t-il dans notre souffle ?',
      vnText: 'Không khí không phải một chất khí. {composition} của nó gồm khoảng 78% nitơ, 21% oxi và 1% các khí khác, như cacbon đioxit, agon và hơi nước. Không khí nào trong số này liên kết với nhau, nên không khí là một {mixture}, và lượng mỗi khí có thể thay đổi. Lượng hơi nước thay đổi theo thời tiết. Lượng cacbon đioxit cũng thay đổi: núi lửa, động vật và thực vật thải nó ra dưới dạng {natural emissions}, và con người thải thêm khi đốt xăng.',
      frText: 'L’air n’est pas un seul gaz. Sa {composition} est d’environ 78% d’azote, 21% d’oxygène et 1% d’autres gaz, comme le dioxyde de carbone, l’argon et la vapeur d’eau. Aucun de ces gaz n’est lié aux autres, donc l’air est un {mixture}, et les quantités peuvent changer. La vapeur d’eau change avec la météo. Le dioxyde de carbone change aussi : les volcans, les animaux et les plantes en rejettent, ce sont des {natural emissions}, et les humains en ajoutent quand ils brûlent de l’essence.',
    },
    {
      id: 'passage_3',
      title: 'Is Tap Water Pure?',
      text: 'A water bottle may say pure, but in science pure means only one substance. On its way to your tap, water flows through rocks, and a {mineral} such as calcium dissolves in it. You cannot see it, but you can find it. Heat some tap water in an {evaporating basin} until all the water has evaporated, wearing safety glasses. A white solid is left behind, so the water was a {mixture}, not pure water.',
      vnTitle: 'Nước máy có tinh khiết không?',
      frTitle: 'L’eau du robinet est-elle pure ?',
      vnText: 'Chai nước có thể ghi là tinh khiết, nhưng trong khoa học tinh khiết nghĩa là chỉ một chất. Trên đường đến vòi nhà em, nước chảy qua đất đá, và một {mineral} như canxi hòa tan vào nó. Em không nhìn thấy nó, nhưng em có thể tìm ra nó. Đun một ít nước máy trong {evaporating basin} cho đến khi nước bay hơi hết, nhớ đeo kính bảo hộ. Một chất rắn màu trắng còn lại, vậy nước đó là một {mixture}, không phải nước tinh khiết.',
      frText: 'Une bouteille d’eau peut dire « pure », mais en sciences, pur veut dire une seule substance. Sur le chemin de ton robinet, l’eau coule à travers les roches, et un {mineral} comme le calcium s’y dissout. Tu ne peux pas le voir, mais tu peux le trouver. Chauffe un peu d’eau du robinet dans une {evaporating basin} jusqu’à ce que toute l’eau se soit évaporée, avec des lunettes de protection. Un solide blanc reste au fond, donc l’eau était un {mixture}, pas de l’eau pure.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'A magnet can separate the iron from a mixture of iron and sulfur, but not from iron sulfide. Explain why.',
      vnTranslation: 'Nam châm có thể tách sắt ra khỏi hỗn hợp sắt và lưu huỳnh, nhưng không tách được sắt ra khỏi sắt sunfua. Hãy giải thích vì sao.',
      frTranslation: 'Un aimant peut séparer le fer d’un mélange de fer et de soufre, mais pas du sulfure de fer. Explique pourquoi.',
      suggestedWords: [['mixture', 'not bonded'], ['keeps', 'properties', 'magnetic'], ['compound', 'bonded', 'new properties']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for explaining the mixture: the iron is not bonded to the sulfur, so it keeps its own properties — it is still magnetic — and the magnet pulls it out.',
        '1 mark for explaining iron sulfide: the iron atoms are bonded to sulfur atoms in a compound with new properties; iron sulfide is not magnetic, so the magnet cannot separate the iron.',
      ],
      modelAnswer: 'In the mixture the iron and sulfur are only stirred together, not bonded, so the iron keeps its own properties. Iron is magnetic, so the magnet pulls it out. When the mixture is heated, every iron atom bonds to a sulfur atom and they make a new compound, iron sulfide. A compound has new properties, and iron sulfide is not magnetic, so the magnet cannot pull the iron out.',
    },
    {
      id: 'sq2',
      question: 'Air contains nitrogen, oxygen, carbon dioxide and water. Explain why air is a mixture and not a compound.',
      vnTranslation: 'Không khí chứa nitơ, oxi, cacbon đioxit và nước. Hãy giải thích vì sao không khí là hỗn hợp chứ không phải hợp chất.',
      frTranslation: 'L’air contient de l’azote, de l’oxygène, du dioxyde de carbone et de l’eau. Explique pourquoi l’air est un mélange et pas un composé.',
      suggestedWords: [['different substances', 'elements', 'compounds'], ['not bonded'], ['composition', 'changes', 'weather']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying air is several different substances (nitrogen and oxygen are elements; carbon dioxide and water are compounds) that are not bonded to each other.',
        '1 mark for a reason it cannot be one compound: the amounts of the gases can change (for example the water vapour changes with the weather, or natural emissions add carbon dioxide), OR each gas keeps its own properties (we still breathe in the oxygen).',
      ],
      modelAnswer: 'Air is made of several different substances: nitrogen and oxygen are elements, and carbon dioxide and water are compounds. These particles are mixed together but they are not bonded to each other, so air is a mixture. It cannot be a compound, because its composition changes: the amount of water vapour goes up and down with the weather, and volcanoes, animals and plants add carbon dioxide. A compound always has the same atoms bonded in the same way.',
    },
    {
      id: 'sq3',
      question: 'Tap water looks clear. Explain why tap water is not pure, and describe how you could show that it is a mixture.',
      vnTranslation: 'Nước máy trông trong suốt. Hãy giải thích vì sao nước máy không tinh khiết, và mô tả cách em có thể chứng minh nó là hỗn hợp.',
      frTranslation: 'L’eau du robinet a l’air limpide. Explique pourquoi l’eau du robinet n’est pas pure, et décris comment tu pourrais montrer que c’est un mélange.',
      suggestedWords: [['pure', 'one substance'], ['minerals', 'dissolved', 'rocks'], ['evaporating basin', 'heat', 'white solid']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for explaining that pure means only one substance, and tap water has minerals dissolved in it (from the rocks the water flowed through), so it contains more than one substance — a mixture.',
        '1 mark for the test: heat the tap water in an evaporating basin until all the water has evaporated; a white solid (the minerals) is left behind, which shows it was a mixture.',
      ],
      modelAnswer: 'In science, pure means only one substance. Tap water has flowed through rocks, and minerals such as calcium have dissolved in it, so it holds more than one substance and is a mixture. You cannot see the minerals, but you can show they are there: heat some tap water in an evaporating basin until all the water evaporates. A white solid is left in the basin. If the water had been pure, nothing would be left.',
    },
    {
      id: 'sq4',
      question: 'Salt (sodium chloride) is a compound. Is salt water a mixture or a compound? Explain your answer.',
      vnTranslation: 'Muối (natri clorua) là một hợp chất. Nước muối là hỗn hợp hay hợp chất? Hãy giải thích câu trả lời của em.',
      frTranslation: 'Le sel (chlorure de sodium) est un composé. L’eau salée est-elle un mélange ou un composé ? Explique ta réponse.',
      suggestedWords: [['mixture'], ['not bonded', 'dissolved'], ['evaporate', 'left behind', 'easy to separate']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying salt water is a mixture, because the salt and the water are two substances that are not bonded to each other (the salt is only dissolved).',
        '1 mark for supporting evidence: each substance keeps its properties (it still tastes salty), OR it is easy to separate — evaporating the water leaves the salt behind.',
      ],
      modelAnswer: 'Salt water is a mixture. Salt is a compound and water is a compound, but in salt water they are not bonded to each other: the salt is only dissolved in the water. Each substance keeps its own properties, which is why salt water still tastes salty. It is also easy to separate: if you evaporate the water, the salt is left behind.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the deck's own diagrams, labels stripped
  // at runtime. Each pin is a blank box: (x, y) is where its leader line meets
  // the box and `to` is the part it names; a pin with no `to` is a box centred
  // on (x, y) — beside a key particle or a pie-chart swatch. Coordinates from
  // `node scripts/svg-coords.mjs Y7_SCI/U02_7 <KEY>`. Each bank has distractors.
  // MINERAL_LABEL is not used: its printed text IS the content, so stripping
  // it leaves nothing to label.
  labelIt: [
    {
      id: 'mix_compound',
      title: 'Label mixed, then bonded', titleVn: 'Gắn nhãn trộn lẫn, rồi liên kết', titleFr: 'Légende : mélangés, puis liés',
      inlineSvg: DIAGRAMS.MIX_COMPOUND, viewBox: '0 0 1120 440', slotW: 270,
      // The sulfur box points at a sulfur atom in the compound: an atom keeps
      // its name whether it is loose or bonded.
      pins: [
        { id: 'p1', x: 150, y: 52, to: [86, 100], side: 'above', answer: 'iron' },
        { id: 'p2', x: 556, y: 52, to: [556, 196], side: 'above', answer: 'heat' },
        { id: 'p3', x: 880, y: 52, to: [857, 115], side: 'above', answer: 'sulfur' },
        { id: 'p4', x: 245, y: 382, answer: 'mixture' },
        { id: 'p5', x: 875, y: 382, answer: 'compound' },
      ],
      bank: [
        { val: 'iron', text: 'Iron atom', textVn: 'Nguyên tử sắt', textFr: 'Atome de fer' },
        { val: 'sulfur', text: 'Sulfur atom', textVn: 'Nguyên tử lưu huỳnh', textFr: 'Atome de soufre' },
        { val: 'heat', text: 'Heat', textVn: 'Đun nóng', textFr: 'Chauffer' },
        { val: 'mixture', text: 'Mixture: not bonded', textVn: 'Hỗn hợp: không liên kết', textFr: 'Mélange : pas liés' },
        { val: 'compound', text: 'Compound: bonded', textVn: 'Hợp chất: có liên kết', textFr: 'Composé : liés' },
        { val: 'cool', text: 'Cool', textVn: 'Làm lạnh', textFr: 'Refroidir' },
        { val: 'element', text: 'An element', textVn: 'Một nguyên tố', textFr: 'Un élément' },
      ],
    },
    {
      id: 'air',
      title: 'Label the particles of air', titleVn: 'Gắn nhãn các hạt trong không khí', titleFr: 'Légende les particules de l’air',
      inlineSvg: DIAGRAMS.AIR, viewBox: '0 0 840 560', slotW: 200,
      // One box beside each particle in the key below the sample.
      pins: [
        { id: 'p1', x: 250, y: 440, answer: 'nitrogen' },
        { id: 'p2', x: 640, y: 440, answer: 'oxygen' },
        { id: 'p3', x: 250, y: 512, answer: 'co2' },
        { id: 'p4', x: 640, y: 512, answer: 'water' },
      ],
      bank: [
        { val: 'nitrogen', text: 'Nitrogen', textVn: 'Nitơ', textFr: 'Azote' },
        { val: 'oxygen', text: 'Oxygen', textVn: 'Oxi', textFr: 'Oxygène' },
        { val: 'co2', text: 'Carbon dioxide', textVn: 'Cacbon đioxit', textFr: 'Dioxyde de carbone' },
        { val: 'water', text: 'Water', textVn: 'Nước', textFr: 'Eau' },
        { val: 'hydrogen', text: 'Hydrogen', textVn: 'Hiđro', textFr: 'Hydrogène' },
      ],
    },
    {
      id: 'air_pie',
      title: 'Label the composition of air', titleVn: 'Gắn nhãn thành phần không khí', titleFr: 'Légende la composition de l’air',
      inlineSvg: DIAGRAMS.AIR_PIE, viewBox: '0 0 840 560', slotW: 230,
      // A box beside each colour swatch: match the swatch to its slice, then
      // the slice's size to its share.
      pins: [
        { id: 'p1', x: 715, y: 110, answer: 'nitrogen' },
        { id: 'p2', x: 715, y: 250, answer: 'oxygen' },
        { id: 'p3', x: 715, y: 390, answer: 'other' },
      ],
      bank: [
        { val: 'nitrogen', text: '78% nitrogen', textVn: '78% nitơ', textFr: '78% d’azote' },
        { val: 'oxygen', text: '21% oxygen', textVn: '21% oxi', textFr: '21% d’oxygène' },
        { val: 'other', text: '1% other gases', textVn: '1% khí khác', textFr: '1% d’autres gaz' },
        { val: 'oxygen78', text: '78% oxygen', textVn: '78% oxi', textFr: '78% d’oxygène' },
        { val: 'co2_21', text: '21% carbon dioxide', textVn: '21% cacbon đioxit', textFr: '21% de dioxyde de carbone' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
