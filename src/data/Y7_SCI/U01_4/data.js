// src/data/Y7_SCI/U01_4/data.js
// 1.4 Cells, Tissues and Organs — Year 7 Science self-study unit. Seven
// scored tasks: 130 XP available, capped at 100 (docs/y7-science-course.md §3).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const U01_4_DATA = {
  meta: {
    id: 'U01_4',
    title: 'Cells, Tissues and Organs',
    desc: 'The ladder from one cell up to a whole living thing: tissue, organ, organ system, organism — with a real example on every rung.',
    track: 'Y7_SCI',
    icon: 'Layers',
    classroom: [{ course: 'y7-science', slug: 'U01_4', title: 'Science 1.4 · Cells, Tissues and Organs' }],
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
        { id: 'SPELLING', dbKey: 'p2', maxXP: 10 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 20 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 20 },
      ],
    },
    {
      // Quiz and arcade share one gate at 80 of the 110 XP before it (73%).
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  realWords: [
    {
      word: 'Tissue', vn: 'Mô',
      def: 'A group of similar cells, all working together to carry out one particular job.',
      vnDef: 'Một nhóm tế bào giống nhau, cùng làm việc với nhau để thực hiện một nhiệm vụ nhất định.',
      sent: 'The lining of the windpipe is a tissue made of ciliated cells.',
      vnSent: 'Lớp lót khí quản là một mô được tạo nên từ các tế bào có lông rung.',
      isReal: true,
    },
    {
      word: 'Organ', vn: 'Cơ quan',
      def: 'A structure made of several different tissues, all working together. The heart and a leaf are organs.',
      vnDef: 'Một cấu trúc tạo nên từ nhiều loại mô khác nhau, cùng làm việc với nhau. Tim và lá là các cơ quan.',
      sent: 'A leaf is an organ because it contains four different tissues.',
      vnSent: 'Lá là một cơ quan vì nó chứa bốn loại mô khác nhau.',
      isReal: true,
    },
    {
      word: 'Organ system', vn: 'Hệ cơ quan',
      def: 'A set of organs that all work together to carry out the same function.',
      vnDef: 'Một nhóm cơ quan cùng làm việc với nhau để thực hiện cùng một chức năng.',
      sent: 'The digestive system is an organ system that breaks food down.',
      vnSent: 'Hệ tiêu hoá là một hệ cơ quan phân giải thức ăn.',
      isReal: true,
    },
    {
      word: 'Organism', vn: 'Sinh vật',
      def: 'A living thing. It may contain many organ systems, organs and tissues.',
      vnDef: 'Một cơ thể sống. Nó có thể chứa nhiều hệ cơ quan, cơ quan và mô.',
      sent: 'A tree, a mosquito and a person are all organisms.',
      vnSent: 'Một cái cây, một con muỗi và một con người đều là sinh vật.',
      isReal: true,
    },
    {
      word: 'Epithelium', vn: 'Biểu mô',
      def: 'A tissue that covers a surface. The onion skin is an epidermis; the lining of the windpipe is a ciliated epithelium.',
      vnDef: 'Một mô phủ lên một bề mặt. Lớp da hành là biểu bì; lớp lót khí quản là biểu mô có lông rung.',
      sent: 'The ciliated epithelium keeps the airways clean.',
      vnSent: 'Biểu mô có lông rung giữ sạch đường thở.',
      isReal: true,
    },
    {
      word: 'Intestines', vn: 'Ruột',
      def: 'The long tube below the stomach where food is absorbed into the body.',
      vnDef: 'Ống dài bên dưới dạ dày, nơi thức ăn được hấp thụ vào cơ thể.',
      sent: 'The intestines fill nearly the whole space below the stomach.',
      vnSent: 'Ruột chiếm gần hết khoảng trống bên dưới dạ dày.',
      isReal: true,
    },
    {
      word: 'Digestive system', vn: 'Hệ tiêu hoá',
      def: 'The organ system that breaks food down and takes it into the body: mouth, gullet, stomach and intestines.',
      vnDef: 'Hệ cơ quan phân giải thức ăn và đưa nó vào cơ thể: miệng, thực quản, dạ dày và ruột.',
      sent: 'The stomach is one organ in the digestive system.',
      vnSent: 'Dạ dày là một cơ quan trong hệ tiêu hoá.',
      isReal: true,
    },
    {
      word: 'Breathing system', vn: 'Hệ hô hấp',
      def: 'The organ system that gets oxygen into the body: nose, windpipe and lungs.',
      vnDef: 'Hệ cơ quan đưa oxy vào cơ thể: mũi, khí quản và phổi.',
      sent: 'The lungs cannot get oxygen to your toe without the rest of the breathing system and the blood.',
      vnSent: 'Phổi không thể đưa oxy xuống ngón chân nếu không có phần còn lại của hệ hô hấp và máu.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Millions, Side by Side',
      text: 'One ciliated cell sweeps a speck of dust. To clear a whole airway you need millions of them, joined edge to edge, all beating the same way at the same time. A group of similar cells like that, all working together on one job, is called a {tissue}. The lining of your windpipe is one: it is called ciliated {epithelium}, and epithelium just means a tissue that covers a surface. Plants have tissues too. The thin skin inside an onion is a tissue — every cell is the same kind, packed against its neighbours like bricks in a wall.',
      vnTitle: 'Hàng triệu, sát cạnh nhau',
      vnText: 'Một tế bào có lông rung chỉ quét được một hạt bụi. Để làm sạch cả đường thở cần hàng triệu tế bào, nối liền nhau, cùng đập một hướng cùng một lúc. Một nhóm tế bào giống nhau như thế, cùng làm một nhiệm vụ, được gọi là {tissue}. Lớp lót khí quản của em là một ví dụ: nó gọi là ciliated {epithelium}, và epithelium chỉ có nghĩa là mô phủ lên một bề mặt. Thực vật cũng có mô. Lớp da mỏng bên trong củ hành là một mô — mọi tế bào đều cùng loại, xếp sát nhau như gạch trong tường.',
    },
    {
      id: 'passage_2',
      title: 'Up the Ladder',
      text: 'A leaf is not one tissue but four, stacked: flat epidermis on top and underneath, tall palisade cells packed with chloroplasts, and loose spongy cells with air gaps. A structure made of several different tissues working together is an {organ}. A leaf is a plant organ; your heart, lungs and stomach are animal organs. Organs work in teams. The nose, windpipe and lungs together form the {breathing system}, whose shared job is to get oxygen into the body. A set of organs sharing one function like this is an {organ system}. And any living thing — a tree, a mosquito, you — is an {organism}.',
      vnTitle: 'Leo lên bậc thang',
      vnText: 'Một chiếc lá không phải một mô mà là bốn, xếp chồng: biểu bì dẹt ở trên và ở dưới, tế bào mô giậu cao chứa đầy lục lạp, và tế bào mô xốp lỏng lẻo có khe khí. Một cấu trúc tạo nên từ nhiều loại mô khác nhau cùng làm việc là một {organ}. Lá là cơ quan của thực vật; tim, phổi và dạ dày của em là cơ quan của động vật. Các cơ quan làm việc theo nhóm. Mũi, khí quản và phổi cùng tạo thành {breathing system}, có nhiệm vụ chung là đưa oxy vào cơ thể. Một nhóm cơ quan chung một chức năng như vậy là một {organ system}. Và bất kỳ cơ thể sống nào — một cái cây, một con muỗi, em — đều là một {organism}.',
    },
    {
      id: 'passage_3',
      title: 'Two Kinds of Tissue',
      text: 'Ask for a tissue in a shop and you get a paper handkerchief. That is the everyday meaning, and it is countable: one tissue, two tissues, a box of tissues. In science, tissue means a group of similar cells, and it is usually uncountable — we say muscle tissue, not a muscle tissue. The wall of the stomach contains muscle tissue, and the stomach is one organ in the {digestive system}, along with the mouth, the gullet and the {intestines}, where food is absorbed.',
      vnTitle: 'Hai loại "tissue"',
      vnText: 'Xin a tissue ở cửa hàng thì em nhận được một tờ khăn giấy. Đó là nghĩa đời thường, và nó đếm được: one tissue, two tissues, a box of tissues. Trong khoa học, tissue nghĩa là một nhóm tế bào giống nhau, và thường không đếm được — ta nói muscle tissue, không nói a muscle tissue. Thành dạ dày chứa mô cơ, và dạ dày là một cơ quan trong {digestive system}, cùng với miệng, thực quản và {intestines}, nơi thức ăn được hấp thụ.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Explain why one ciliated cell could not keep your lungs clean, and what the name is for the millions of them working together.',
      vnTranslation: 'Hãy giải thích vì sao một tế bào có lông rung không thể giữ sạch phổi của em, và tên gọi của hàng triệu tế bào đó cùng làm việc là gì.',
      suggestedWords: [['millions', 'many'], ['tissue']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying one cell only sweeps a tiny spot, so millions are needed side by side along the whole airway, all beating together.',
        '1 mark for naming a tissue (ciliated epithelium) — a group of similar cells working together on one job.',
      ],
      modelAnswer: 'One ciliated cell only sweeps a tiny spot. To clear a whole airway you need millions of them joined edge to edge, all beating the same way. A group of similar cells working together on one job like that is called a tissue — this one is ciliated epithelium.',
    },
    {
      id: 'sq2',
      question: 'Write two sentences of your own using the word "tissue": one with its everyday meaning and one with its scientific meaning.',
      vnTranslation: 'Viết hai câu của riêng em dùng từ "tissue": một câu với nghĩa đời thường và một câu với nghĩa khoa học.',
      suggestedWords: [['a tissue', 'tissues'], ['cells', 'muscle tissue']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for an everyday-meaning sentence (a paper handkerchief), e.g. "She took a tissue from the box."',
        '1 mark for a scientific-meaning sentence (a group of similar cells), e.g. "The stomach wall contains muscle tissue."',
      ],
      modelAnswer: 'Everyday: "Mr Bowen sneezed, so he took a tissue out of the box." Scientific: "The wall of the stomach contains muscle tissue, which is made of many similar muscle cells."',
    },
    {
      id: 'sq3',
      question: 'Explain why a leaf is an organ and not a tissue.',
      vnTranslation: 'Hãy giải thích vì sao lá là một cơ quan chứ không phải một mô.',
      suggestedWords: [['different tissues', 'several tissues'], ['epidermis', 'palisade', 'spongy']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying an organ is made of several different tissues working together, while a tissue is one kind of cell.',
        '1 mark for naming at least two of the leaf’s tissues: epidermis, palisade, spongy.',
      ],
      modelAnswer: 'A tissue is a group of one kind of cell, but an organ is made of several different tissues working together. A leaf has at least three different tissues — the epidermis on top and underneath, the tall palisade tissue and the loose spongy tissue — so it is an organ.',
    },
    {
      id: 'sq4',
      question: 'Your lungs take oxygen out of the air, but lungs alone cannot get oxygen to your big toe. Explain what an organ system is, using the breathing system as your example.',
      vnTranslation: 'Phổi lấy oxy từ không khí, nhưng chỉ có phổi thì không thể đưa oxy xuống ngón chân cái. Hãy giải thích hệ cơ quan là gì, dùng hệ hô hấp làm ví dụ.',
      suggestedWords: [['organs', 'set of organs'], ['same function', 'work together'], ['nose', 'windpipe', 'lungs']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for defining an organ system as a set of organs that work together to carry out the same function.',
        '1 mark for the example: the nose, windpipe and lungs form the breathing system, whose shared job is to get oxygen into the body — no single organ can do it alone.',
      ],
      modelAnswer: 'An organ system is a set of organs that all work together to carry out the same function. The breathing system is the nose, the windpipe and the lungs: the nose warms the air, the windpipe carries it and the lungs take the oxygen out. No one of those organs could do the job alone.',
    },
  ],

  diagrams: [
    {
      id: 'd1',
      inlineSvg: DIAGRAMS.LEVELS_LADDER,
      promptText: 'The diagram shows the five levels from a cell up to an organism. Name the five levels in order, and give the example on the ladder for each one.',
      suggestedWords: [['cell'], ['tissue'], ['organ'], ['organ system'], ['organism']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the five levels in the correct order: cell, tissue, organ, organ system, organism.',
        '1 mark for the examples on the first three rungs: a ciliated cell, ciliated epithelium (tissue), a lung (organ).',
        '1 mark for the last two examples: the breathing system (organ system) and a person / a human (organism).',
      ],
      modelAnswer: 'The five levels in order are cell, tissue, organ, organ system and organism. The examples are a ciliated cell, then ciliated epithelium (the tissue), then a lung (the organ), then the breathing system (the organ system), then a whole person (the organism). Each level is built out of the one before it.',
    },
    {
      id: 'd2',
      inlineSvg: DIAGRAMS.LEAF_SECTION,
      promptText: 'The diagram shows a leaf cut across. Name the tissues shown, and explain why this proves that a leaf is an organ.',
      suggestedWords: [['epidermis'], ['palisade'], ['spongy'], ['organ', 'different tissues']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming the epidermis (top and bottom) and the palisade tissue.',
        '1 mark for naming the spongy tissue (with air gaps).',
        '1 mark for explaining that several different tissues working together make an organ, so a leaf is an organ.',
      ],
      modelAnswer: 'The leaf has flat epidermis on the top and underneath, tall palisade cells packed with chloroplasts just under the top, and loose spongy cells with air gaps below them. That is several different tissues working together in one structure, and a structure made of several different tissues is an organ — so a leaf is an organ.',
    },
    {
      id: 'd3',
      inlineSvg: DIAGRAMS.RESPIRATORY_SYSTEM,
      promptText: 'The diagram shows the breathing system. Name its organs, state the function they share, and explain why it is called an organ system.',
      suggestedWords: [['nose', 'windpipe', 'lungs'], ['oxygen'], ['work together', 'same function']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming the organs: the nose, the windpipe (trachea) and the lungs.',
        '1 mark for the shared function: getting oxygen into the body.',
        '1 mark for explaining that a set of organs working together on the same function is an organ system.',
      ],
      modelAnswer: 'The breathing system is made of the nose, the windpipe and the lungs. Their shared function is to get oxygen into the body: the nose warms the air, the windpipe carries it and the lungs take the oxygen out. Because it is a set of organs all working together to carry out the same function, it is called an organ system.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
