// src/data/Y7_SCI/U02_6/data.js
// 2.6 Compounds and Formulae — Year 7 Science self-study unit, reduced from the
// classroom lesson y7-science/U02_6 (Learner's Book pp. 57–63). Built to
// docs/y7-science/particle-engines.md (the 2.5–2.7 shape): an interactive deck
// dense with checks and activities, the book's key words, a mixed-type
// Workbook, the generative Particle Lab, Label It on three drawn diagrams, the
// cloze reading, AI-marked reasoning questions and an eight-question quiz.
// 145 XP available, capped at 100. SPELLING and DIAGRAMS are not used.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U02_6_DATA = {
  meta: {
    id: 'U02_6',
    title: 'Compounds and Formulae',
    desc: 'Two dangerous elements make the salt on your table: what a compound is, how its name tells you the elements (-ide, -ate, mono, di), and how to read and write a formula.',
    track: 'Y7_SCI',
    icon: 'FlaskConical',
    classroom: [
      { course: 'y7-science', slug: 'U02_6', title: 'Science 2.6 · Compounds and Formulae' },
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

  // Particle Lab (particle-engines.md §2): rounds cycle count → formula →
  // build → name → classify, drawn fresh from a seed. No mixtures in 2.6 —
  // classify is element / compound only; mixtures are 2.7's lesson.
  particleLab: {
    title: 'Particle Lab', titleVn: 'Phòng thí nghiệm hạt',
    modes: ['count', 'formula', 'build', 'name', 'classify'],
    mixtures: false,
    rounds: 10,
  },

  realWords: [
    {
      word: 'Element', vn: 'Nguyên tố',
      def: 'A substance made of only one kind of atom. Gold, oxygen and sodium are elements.',
      vnDef: 'Một chất chỉ gồm một loại nguyên tử. Vàng, oxi và natri là các nguyên tố.',
      sent: 'Oxygen is an element, even though each particle has two atoms.',
      vnSent: 'Oxi là một nguyên tố, dù mỗi hạt có hai nguyên tử.',
      isReal: true,
    },
    {
      word: 'Compound', vn: 'Hợp chất',
      def: 'A substance made of different kinds of atom bonded together. A compound has new properties, not like the elements it is made from.',
      vnDef: 'Một chất gồm các loại nguyên tử khác nhau liên kết với nhau. Hợp chất có tính chất mới, không giống các nguyên tố tạo nên nó.',
      sent: 'Water is a compound of hydrogen and oxygen.',
      vnSent: 'Nước là một hợp chất của hiđro và oxi.',
      isReal: true,
    },
    {
      word: 'Bonding', vn: 'Liên kết',
      def: 'Atoms joining tightly together.',
      vnDef: 'Các nguyên tử gắn chặt với nhau.',
      sent: 'Bonding holds the sodium and chlorine atoms together in salt.',
      vnSent: 'Liên kết giữ các nguyên tử natri và clo với nhau trong muối ăn.',
      isReal: true,
    },
    {
      word: 'Sodium chloride', vn: 'Natri clorua',
      def: 'The compound of sodium and chlorine. Its everyday name is salt, and its formula is NaCl.',
      vnDef: 'Hợp chất của natri và clo. Tên thường gọi là muối ăn, và công thức của nó là NaCl.',
      sent: 'The white crystals in the salt field are sodium chloride.',
      vnSent: 'Những tinh thể trắng trên cánh đồng muối là natri clorua.',
      isReal: true,
    },
    {
      word: 'Formula', vn: 'Công thức hóa học',
      def: 'The symbols of the elements in a compound. The small number tells you how many atoms; no number means one. The plural is formulae.',
      vnDef: 'Kí hiệu của các nguyên tố trong một hợp chất. Số nhỏ cho biết có bao nhiêu nguyên tử; không có số nghĩa là một. Số nhiều là formulae.',
      sent: 'The formula of water is H2O: two hydrogen atoms and one oxygen atom.',
      vnSent: 'Công thức của nước là H2O: hai nguyên tử hiđro và một nguyên tử oxi.',
      isReal: true,
    },
    {
      word: 'Particle', vn: 'Hạt',
      def: 'A tiny piece of a substance, far too small to see. A particle can be one atom, or a few atoms bonded together.',
      vnDef: 'Một mảnh rất nhỏ của một chất, quá nhỏ để nhìn thấy. Một hạt có thể là một nguyên tử, hoặc vài nguyên tử liên kết với nhau.',
      sent: 'One particle of carbon dioxide has one carbon atom and two oxygen atoms.',
      vnSent: 'Một hạt cacbon đioxit có một nguyên tử cacbon và hai nguyên tử oxi.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Salt from Two Dangers',
      text: 'Sodium is a soft metal that bursts into flame in water, and chlorine is a poisonous yellow-green gas. Each one is an {element}: it has only one kind of atom. When sodium atoms and chlorine atoms join tightly together, we call that {bonding}. The new substance has two different kinds of atom, so it is a {compound}. Its name is {sodium chloride}, and you know it as the salt on your table: white crystals that are safe to eat, nothing like the two elements it came from.',
      vnTitle: 'Muối ăn từ hai mối nguy hiểm',
      vnText: 'Natri là một kim loại mềm bốc cháy trong nước, còn clo là một chất khí độc màu vàng lục. Mỗi chất là một {element}: nó chỉ có một loại nguyên tử. Khi các nguyên tử natri và nguyên tử clo gắn chặt với nhau, ta gọi đó là {bonding}. Chất mới có hai loại nguyên tử khác nhau, nên nó là một {compound}. Tên của nó là {sodium chloride}, và em biết nó là muối ăn trên bàn: những tinh thể trắng ăn được, hoàn toàn không giống hai nguyên tố tạo nên nó.',
    },
    {
      id: 'passage_2',
      title: 'What the Name Tells You',
      text: 'The name of a compound tells you what is in it. In {sodium chloride}, the metal comes first and the non-metal ends in -ide. A name that ends in -ate, like calcium carbonate, means oxygen is there too. Some names count atoms as well: carbon monoxide has one oxygen atom in each {particle}, and carbon dioxide has two. Oxygen gas also has two atoms in each particle, but both of them are oxygen, so it is an {element} and not a {compound}.',
      vnTitle: 'Cái tên cho em biết điều gì',
      vnText: 'Tên của một hợp chất cho em biết trong đó có gì. Trong {sodium chloride}, kim loại đứng trước và phi kim có đuôi -ide. Một cái tên có đuôi -ate, như calcium carbonate, nghĩa là trong đó còn có oxi. Một số tên còn đếm cả nguyên tử: carbon monoxide có một nguyên tử oxi trong mỗi {particle}, còn carbon dioxide có hai. Khí oxi cũng có hai nguyên tử trong mỗi hạt, nhưng cả hai đều là oxi, nên nó là một {element} chứ không phải một {compound}.',
    },
    {
      id: 'passage_3',
      title: 'Reading a Formula',
      text: 'A {formula} is a short way to write a substance with the symbols of its elements. Water is H2O. The small 2 comes after the H, so every {particle} of water has two hydrogen atoms, and the O has no number, so there is one oxygen atom. The atoms are held together by {bonding}. Be careful with capital letters: CO is carbon and oxygen, a {compound}, but Co with a small o is cobalt, an element.',
      vnTitle: 'Đọc một công thức',
      vnText: 'Một {formula} là cách viết ngắn gọn một chất bằng kí hiệu của các nguyên tố trong nó. Nước là H2O. Số 2 nhỏ đứng sau chữ H, nên mỗi {particle} nước có hai nguyên tử hiđro, còn chữ O không có số, nên có một nguyên tử oxi. Các nguyên tử được giữ với nhau nhờ {bonding}. Cẩn thận với chữ in hoa: CO là cacbon và oxi, một {compound}, còn Co với chữ o thường là coban, một nguyên tố.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between an element and a compound. Give one example of each.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa nguyên tố và hợp chất. Cho một ví dụ về mỗi loại.',
      suggestedWords: [['one kind of atom'], ['different kinds', 'bonded'], ['element', 'compound']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the difference: an element is made of only one kind of atom; a compound is made of different kinds of atom bonded together.',
        '1 mark for a correct example of each, e.g. gold / oxygen / sodium / iron (element) and salt (sodium chloride) / water / carbon dioxide (compound).',
      ],
      modelAnswer: 'An element is made of only one kind of atom, for example gold, which is only gold atoms. A compound is made of different kinds of atom bonded together, for example water, which is hydrogen and oxygen atoms bonded together.',
    },
    {
      id: 'sq2',
      question: 'Oxygen gas, O₂, has two atoms in every particle. A student says, "Oxygen has two atoms, so it must be a compound." Explain why the student is wrong.',
      vnTranslation: 'Khí oxi, O₂, có hai nguyên tử trong mỗi hạt. Một học sinh nói: "Oxi có hai nguyên tử, nên nó phải là hợp chất." Hãy giải thích vì sao bạn ấy sai.',
      suggestedWords: [['both', 'oxygen', 'same'], ['one kind of atom', 'element'], ['different kinds']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying both atoms are oxygen — only one kind of atom — so oxygen is an element.',
        '1 mark for explaining that a compound needs different KINDS of atom bonded together; the number of atoms in a particle does not decide it.',
      ],
      modelAnswer: 'The student is counting atoms, not kinds of atom. Both atoms in an O₂ particle are oxygen, so there is only one kind of atom, which makes oxygen an element. A compound needs two or more different kinds of atom bonded together, like carbon and oxygen in CO₂. The number of atoms does not matter.',
    },
    {
      id: 'sq3',
      question: 'Sodium chloride is made from sodium and chlorine. Describe how sodium chloride is different from sodium and from chlorine, and say what this tells you about compounds.',
      vnTranslation: 'Natri clorua được tạo nên từ natri và clo. Hãy mô tả natri clorua khác với natri và với clo như thế nào, và cho biết điều này nói gì về hợp chất.',
      suggestedWords: [['shiny metal', 'flame', 'water'], ['yellow-green gas', 'poisonous'], ['white crystals', 'safe to eat'], ['new properties']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for a difference from sodium, e.g. sodium is a shiny metal that bursts into flame in water / is not safe to eat, but salt is white crystals that are safe to eat.',
        '1 mark for a difference from chlorine, e.g. chlorine is a poisonous yellow-green gas, but salt is a white solid that is safe to eat.',
        '1 mark for saying a compound has new properties, different from the elements it is made from.',
      ],
      modelAnswer: 'Sodium is a shiny metal that bursts into flame in water, and it is not safe to eat. Chlorine is a poisonous yellow-green gas. Sodium chloride is salt: white crystals that are safe to eat. So a compound has totally new properties — it is not like the elements it is made from.',
    },
    {
      id: 'sq4',
      question: 'The formula of carbon dioxide is CO₂. Explain what this formula tells you about one particle of carbon dioxide, and why its name uses "di".',
      vnTranslation: 'Công thức của cacbon đioxit là CO₂. Hãy giải thích công thức này cho em biết gì về một hạt cacbon đioxit, và vì sao tên của nó dùng "di".',
      suggestedWords: [['carbon', 'oxygen'], ['one carbon atom', 'two oxygen atoms'], ['small number', 'no number'], ['di', 'two']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the elements: carbon (C) and oxygen (O) — two elements.',
        '1 mark for the numbers of atoms: one carbon atom (no number means one) and two oxygen atoms (the small 2 after O).',
        '1 mark for saying "di" means two — the two oxygen atoms — which tells it apart from carbon monoxide, CO, with one.',
      ],
      modelAnswer: 'CO₂ contains two elements, carbon and oxygen. The C has no number, so each particle has one carbon atom, and the small 2 after the O means two oxygen atoms. The name is carbon dioxide because "di" means two: there are two oxygen atoms. Carbon monoxide, CO, has only one.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): three drawn diagrams, labels stripped at
  // runtime. None of the three has leader lines, so each pin sits on the
  // label's own text position (`node scripts/svg-coords.mjs Y7_SCI/U02_6
  // <KEY>`; start-anchored labels get the pin a little inside the word).
  // Stripping also removes the atom letters, so the atoms are known by colour
  // — the title gives the key. FORMULA_READ is not used: its text IS the
  // diagram, and nothing is left once it is stripped.
  labelIt: [
    {
      id: 'particles',
      title: 'Name the four particles (grey = carbon, red = oxygen, white = hydrogen)',
      titleVn: 'Gọi tên bốn hạt (xám = cacbon, đỏ = oxi, trắng = hiđro)',
      inlineSvg: DIAGRAMS.PARTICLES, viewBox: '0 0 1120 440',
      pins: [
        { id: 'p1', x: 150, y: 380, answer: 'co2' },
        { id: 'p2', x: 430, y: 380, answer: 'h2o' },
        { id: 'p3', x: 710, y: 380, answer: 'o2' },
        { id: 'p4', x: 980, y: 380, answer: 'ch4' },
      ],
      bank: [
        { val: 'co2', text: 'carbon dioxide, CO₂', textVn: 'carbon dioxide, CO₂' },
        { val: 'h2o', text: 'water, H₂O', textVn: 'nước, H₂O' },
        { val: 'o2', text: 'oxygen, O₂', textVn: 'oxi, O₂' },
        { val: 'ch4', text: 'methane, CH₄', textVn: 'metan, CH₄' },
        { val: 'co', text: 'carbon monoxide, CO', textVn: 'carbon monoxide, CO' },
        { val: 'h2', text: 'hydrogen, H₂', textVn: 'hiđro, H₂' },
      ],
    },
    {
      id: 'element_compound',
      title: 'Label the element and the compound',
      titleVn: 'Gắn nhãn nguyên tố và hợp chất',
      inlineSvg: DIAGRAMS.ELEMENT_COMPOUND, viewBox: '0 0 840 560',
      pins: [
        { id: 'p1', x: 216, y: 70, answer: 'element' },
        { id: 'p2', x: 624, y: 70, answer: 'compound' },
        { id: 'p3', x: 216, y: 438, answer: 'one_kind' },
        { id: 'p4', x: 624, y: 454, answer: 'bonded' },
        { id: 'p5', x: 216, y: 482, answer: 'gold' },
        { id: 'p6', x: 624, y: 510, answer: 'nacl' },
      ],
      bank: [
        { val: 'element', text: 'Element', textVn: 'Nguyên tố' },
        { val: 'compound', text: 'Compound', textVn: 'Hợp chất' },
        { val: 'one_kind', text: 'one kind of atom', textVn: 'một loại nguyên tử' },
        { val: 'bonded', text: 'different kinds of atom, bonded together', textVn: 'các loại nguyên tử khác nhau, liên kết với nhau' },
        { val: 'gold', text: 'gold', textVn: 'vàng' },
        { val: 'nacl', text: 'sodium chloride', textVn: 'natri clorua' },
        { val: 'same_two', text: 'two atoms of the same kind', textVn: 'hai nguyên tử cùng loại' },
      ],
    },
    {
      id: 'prefixes',
      title: 'Label carbon monoxide and carbon dioxide (grey = carbon, red = oxygen)',
      titleVn: 'Gắn nhãn carbon monoxide và carbon dioxide (xám = cacbon, đỏ = oxi)',
      inlineSvg: DIAGRAMS.PREFIXES, viewBox: '0 0 840 560',
      pins: [
        { id: 'p1', x: 340, y: 106, answer: 'monoxide' },
        { id: 'p2', x: 340, y: 168, answer: 'mono' },
        { id: 'p3', x: 340, y: 221, answer: 'co' },
        { id: 'p4', x: 340, y: 372, answer: 'dioxide' },
        { id: 'p5', x: 340, y: 434, answer: 'di' },
        { id: 'p6', x: 340, y: 487, answer: 'co2' },
      ],
      bank: [
        { val: 'monoxide', text: 'carbon monoxide', textVn: 'carbon monoxide' },
        { val: 'mono', text: 'mono = one oxygen', textVn: 'mono = một oxi' },
        { val: 'co', text: 'CO', textVn: 'CO' },
        { val: 'dioxide', text: 'carbon dioxide', textVn: 'carbon dioxide' },
        { val: 'di', text: 'di = two oxygens', textVn: 'di = hai oxi' },
        { val: 'co2', text: 'CO₂', textVn: 'CO₂' },
        { val: 'oxide', text: 'carbon oxide', textVn: 'carbon oxide' },
        { val: 'tri', text: 'tri = three oxygens', textVn: 'tri = ba oxi' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
