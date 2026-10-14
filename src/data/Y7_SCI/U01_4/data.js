// src/data/Y7_SCI/U01_4/data.js
// 1.4 Cells, Tissues and Organs — Year 7 Science self-study unit, rebuilt to
// the engagement plan (docs/y7-science/ENGAGEMENT-PLAN.md). 145 XP available,
// capped at 100 (docs/y7-science-course.md §3). WORKBOOK and LABEL_IT replace
// the old SPELLING task; the deck's three activities (hotspot, sort, order)
// and three checks live in notes.js.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
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
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 15 },
      ],
    },
    {
      // 25 of the 35 XP before it (71%). The practice phase is where the
      // variety lives: a mixed-type workbook, the labelling task, the reading,
      // the AI-marked questions and diagrams (ENGAGEMENT-PLAN §3).
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 20 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 15 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 15 },
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

  realWords: [
    {
      word: 'Tissue', vn: 'Mô', fr: 'Tissu',
      def: 'A group of similar cells, all working together to carry out one particular job.',
      vnDef: 'Một nhóm tế bào giống nhau, cùng làm việc với nhau để thực hiện một nhiệm vụ nhất định.',
      frDef: 'Un groupe de cellules semblables qui travaillent toutes ensemble pour faire un travail précis.',
      sent: 'The lining of the windpipe is a tissue made of ciliated cells.',
      vnSent: 'Lớp lót khí quản là một mô được tạo nên từ các tế bào có lông rung.',
      frSent: 'La paroi intérieure de la trachée est un tissu fait de cellules ciliées.',
      isReal: true,
    },
    {
      word: 'Organ', vn: 'Cơ quan', fr: 'Organe',
      def: 'A structure made of several different tissues, all working together. The heart and a leaf are organs.',
      vnDef: 'Một cấu trúc tạo nên từ nhiều loại mô khác nhau, cùng làm việc với nhau. Tim và lá là các cơ quan.',
      frDef: 'Une structure faite de plusieurs tissus différents qui travaillent tous ensemble. Le cœur et une feuille sont des organes.',
      sent: 'A leaf is an organ because it contains four different tissues.',
      vnSent: 'Lá là một cơ quan vì nó chứa bốn loại mô khác nhau.',
      frSent: 'Une feuille est un organe car elle contient quatre tissus différents.',
      isReal: true,
    },
    {
      word: 'Organ system', vn: 'Hệ cơ quan', fr: 'Système d’organes',
      def: 'A set of organs that all work together to carry out the same function.',
      vnDef: 'Một nhóm cơ quan cùng làm việc với nhau để thực hiện cùng một chức năng.',
      frDef: 'Un ensemble d’organes qui travaillent tous ensemble pour remplir la même fonction.',
      sent: 'The digestive system is an organ system that breaks food down.',
      vnSent: 'Hệ tiêu hoá là một hệ cơ quan phân giải thức ăn.',
      frSent: 'Le système digestif est un système d’organes qui décompose la nourriture.',
      isReal: true,
    },
    {
      word: 'Organism', vn: 'Sinh vật', fr: 'Organisme',
      def: 'A living thing. It may contain many organ systems, organs and tissues.',
      vnDef: 'Một cơ thể sống. Nó có thể chứa nhiều hệ cơ quan, cơ quan và mô.',
      frDef: 'Un être vivant. Il peut contenir beaucoup de systèmes d’organes, d’organes et de tissus.',
      sent: 'A tree, a mosquito and a person are all organisms.',
      vnSent: 'Một cái cây, một con muỗi và một con người đều là sinh vật.',
      frSent: 'Un arbre, un moustique et une personne sont tous des organismes.',
      isReal: true,
    },
    {
      word: 'Epithelium', vn: 'Biểu mô', fr: 'Épithélium',
      def: 'A tissue that covers a surface. The onion skin is an epidermis; the lining of the windpipe is a ciliated epithelium.',
      vnDef: 'Một mô phủ lên một bề mặt. Lớp da hành là biểu bì; lớp lót khí quản là biểu mô có lông rung.',
      frDef: 'Un tissu qui recouvre une surface. La peau de l’oignon est un épiderme ; la paroi intérieure de la trachée est un épithélium cilié.',
      sent: 'The ciliated epithelium keeps the airways clean.',
      vnSent: 'Biểu mô có lông rung giữ sạch đường thở.',
      frSent: 'L’épithélium cilié garde les voies respiratoires propres.',
      isReal: true,
    },
    {
      word: 'Intestines', vn: 'Ruột', fr: 'Intestins',
      def: 'The long tube below the stomach where food is absorbed into the body.',
      vnDef: 'Ống dài bên dưới dạ dày, nơi thức ăn được hấp thụ vào cơ thể.',
      frDef: 'Le long tube sous l’estomac où la nourriture est absorbée par le corps.',
      sent: 'The intestines fill nearly the whole space below the stomach.',
      vnSent: 'Ruột chiếm gần hết khoảng trống bên dưới dạ dày.',
      frSent: 'Les intestins remplissent presque tout l’espace sous l’estomac.',
      isReal: true,
    },
    {
      word: 'Digestive system', vn: 'Hệ tiêu hoá', fr: 'Système digestif',
      def: 'The organ system that breaks food down and takes it into the body: mouth, gullet, stomach and intestines.',
      vnDef: 'Hệ cơ quan phân giải thức ăn và đưa nó vào cơ thể: miệng, thực quản, dạ dày và ruột.',
      frDef: 'Le système d’organes qui décompose la nourriture et la fait entrer dans le corps : bouche, œsophage, estomac et intestins.',
      sent: 'The stomach is one organ in the digestive system.',
      vnSent: 'Dạ dày là một cơ quan trong hệ tiêu hoá.',
      frSent: 'L’estomac est un des organes du système digestif.',
      isReal: true,
    },
    {
      word: 'Breathing system', vn: 'Hệ hô hấp', fr: 'Système respiratoire',
      def: 'The organ system that gets oxygen into the body: nose, windpipe and lungs.',
      vnDef: 'Hệ cơ quan đưa oxy vào cơ thể: mũi, khí quản và phổi.',
      frDef: 'Le système d’organes qui fait entrer l’oxygène dans le corps : nez, trachée et poumons.',
      sent: 'The lungs cannot get oxygen to your toe without the rest of the breathing system and the blood.',
      vnSent: 'Phổi không thể đưa oxy xuống ngón chân nếu không có phần còn lại của hệ hô hấp và máu.',
      frSent: 'Les poumons ne peuvent pas apporter l’oxygène jusqu’à ton orteil sans le reste du système respiratoire et le sang.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Millions, Side by Side',
      text: 'One ciliated cell sweeps a speck of dust. To clear a whole airway you need millions of them, joined edge to edge, all beating the same way at the same time. A group of similar cells like that, all working together on one job, is called a {tissue}. The lining of your windpipe is one: it is called ciliated {epithelium}, and epithelium just means a tissue that covers a surface. Plants have tissues too. The thin skin inside an onion is a tissue — every cell is the same kind, packed against its neighbours like bricks in a wall.',
      vnTitle: 'Hàng triệu, sát cạnh nhau',
      frTitle: 'Des millions, côte à côte',
      vnText: 'Một tế bào có lông rung chỉ quét được một hạt bụi. Để làm sạch cả đường thở cần hàng triệu tế bào, nối liền nhau, cùng đập một hướng cùng một lúc. Một nhóm tế bào giống nhau như thế, cùng làm một nhiệm vụ, được gọi là {tissue}. Lớp lót khí quản của em là một ví dụ: nó gọi là ciliated {epithelium}, và epithelium chỉ có nghĩa là mô phủ lên một bề mặt. Thực vật cũng có mô. Lớp da mỏng bên trong củ hành là một mô — mọi tế bào đều cùng loại, xếp sát nhau như gạch trong tường.',
      frText: 'Une cellule ciliée balaie un grain de poussière. Pour nettoyer toute une voie respiratoire, il en faut des millions, collées bord à bord, qui battent toutes dans le même sens au même moment. Un groupe de cellules semblables comme celui-là, qui travaillent toutes ensemble pour un seul travail, s’appelle un {tissue}. La paroi intérieure de ta trachée en est un : on l’appelle {epithelium} cilié, et épithélium veut simplement dire un tissu qui recouvre une surface. Les plantes aussi ont des tissus. La fine peau à l’intérieur d’un oignon est un tissu — toutes ses cellules sont de la même sorte, serrées contre leurs voisines comme les briques d’un mur.',
    },
    {
      id: 'passage_2',
      title: 'Up the Ladder',
      text: 'A leaf is not one tissue but four, stacked: flat epidermis on top and underneath, tall palisade cells packed with chloroplasts, and loose spongy cells with air gaps. A structure made of several different tissues working together is an {organ}. A leaf is a plant organ; your heart, lungs and stomach are animal organs. Organs work in teams. The nose, windpipe and lungs together form the {breathing system}, whose shared job is to get oxygen into the body. A set of organs sharing one function like this is an {organ system}. And any living thing — a tree, a mosquito, you — is an {organism}.',
      vnTitle: 'Leo lên bậc thang',
      frTitle: 'On monte l’échelle',
      vnText: 'Một chiếc lá không phải một mô mà là bốn, xếp chồng: biểu bì dẹt ở trên và ở dưới, tế bào mô giậu cao chứa đầy lục lạp, và tế bào mô xốp lỏng lẻo có khe khí. Một cấu trúc tạo nên từ nhiều loại mô khác nhau cùng làm việc là một {organ}. Lá là cơ quan của thực vật; tim, phổi và dạ dày của em là cơ quan của động vật. Các cơ quan làm việc theo nhóm. Mũi, khí quản và phổi cùng tạo thành {breathing system}, có nhiệm vụ chung là đưa oxy vào cơ thể. Một nhóm cơ quan chung một chức năng như vậy là một {organ system}. Và bất kỳ cơ thể sống nào — một cái cây, một con muỗi, em — đều là một {organism}.',
      frText: 'Une feuille n’est pas un seul tissu mais quatre, empilés : un épiderme plat dessus et dessous, de hautes cellules palissadiques pleines de chloroplastes, et des cellules spongieuses lâches avec des espaces d’air. Une structure faite de plusieurs tissus différents qui travaillent ensemble est un {organ}. Une feuille est un organe végétal ; ton cœur, tes poumons et ton estomac sont des organes animaux. Les organes travaillent en équipe. Le nez, la trachée et les poumons forment ensemble le {breathing system}, dont le travail commun est de faire entrer l’oxygène dans le corps. Un ensemble d’organes qui partagent une même fonction comme celui-ci est un {organ system}. Et n’importe quel être vivant — un arbre, un moustique, toi — est un {organism}.',
    },
    {
      id: 'passage_3',
      title: 'Two Kinds of Tissue',
      text: 'Ask for a tissue in a shop and you get a paper handkerchief. That is the everyday meaning, and it is countable: one tissue, two tissues, a box of tissues. In science, tissue means a group of similar cells, and it is usually uncountable — we say muscle tissue, not a muscle tissue. The wall of the stomach contains muscle tissue, and the stomach is one organ in the {digestive system}, along with the mouth, the gullet and the {intestines}, where food is absorbed.',
      vnTitle: 'Hai loại "tissue"',
      frTitle: 'Deux « tissue »',
      vnText: 'Xin a tissue ở cửa hàng thì em nhận được một tờ khăn giấy. Đó là nghĩa đời thường, và nó đếm được: one tissue, two tissues, a box of tissues. Trong khoa học, tissue nghĩa là một nhóm tế bào giống nhau, và thường không đếm được — ta nói muscle tissue, không nói a muscle tissue. Thành dạ dày chứa mô cơ, và dạ dày là một cơ quan trong {digestive system}, cùng với miệng, thực quản và {intestines}, nơi thức ăn được hấp thụ.',
      frText: 'Demande un « tissue » dans un magasin et on te donne un mouchoir en papier. C’est le sens de tous les jours, et il est dénombrable : one tissue, two tissues, a box of tissues. En sciences, « tissue » veut dire un groupe de cellules semblables (un tissu), et il est en général indénombrable — on dit muscle tissue, pas a muscle tissue. La paroi de l’estomac contient du tissu musculaire, et l’estomac est un des organes du {digestive system}, avec la bouche, l’œsophage et les {intestines}, où la nourriture est absorbée.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Explain why one ciliated cell could not keep your lungs clean, and what the name is for the millions of them working together.',
      vnTranslation: 'Hãy giải thích vì sao một tế bào có lông rung không thể giữ sạch phổi của em, và tên gọi của hàng triệu tế bào đó cùng làm việc là gì.',
      frTranslation: 'Explique pourquoi une seule cellule ciliée ne pourrait pas garder tes poumons propres, et comment s’appellent les millions de cellules qui travaillent ensemble.',
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
      frTranslation: 'Écris deux phrases à toi avec le mot « tissue » : une avec son sens de tous les jours et une avec son sens scientifique.',
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
      frTranslation: 'Explique pourquoi une feuille est un organe et pas un tissu.',
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
      frTranslation: 'Tes poumons prennent l’oxygène de l’air, mais les poumons seuls ne peuvent pas apporter l’oxygène jusqu’à ton gros orteil. Explique ce qu’est un système d’organes, avec le système respiratoire comme exemple.',
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

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's own diagrams, labels stripped
  // at runtime, a pin where each label's leader line ends (or, for the ladder,
  // where its own text sits). Coordinates from
  // `node scripts/svg-coords.mjs Y7_SCI/U01_4 <KEY>`. Each bank carries one
  // distractor.
  labelIt: [
    {
      id: 'ladder',
      title: 'Label the five levels', titleVn: 'Gắn nhãn năm cấp độ', titleFr: 'Légende les cinq niveaux',
      inlineSvg: DIAGRAMS.LEVELS_LADDER, viewBox: '0 0 820 325', slotW: 128,
      // A caption box in each panel, under its picture.
      pins: [
        { id: 'p1', x: 84, y: 226, answer: 'cell' },
        { id: 'p2', x: 248, y: 226, answer: 'tissue' },
        { id: 'p3', x: 412, y: 226, answer: 'organ' },
        { id: 'p4', x: 576, y: 226, answer: 'organsys' },
        { id: 'p5', x: 740, y: 226, answer: 'organism' },
      ],
      bank: [
        { val: 'cell', text: 'Cell', textVn: 'Tế bào', textFr: 'Cellule' },
        { val: 'tissue', text: 'Tissue', textVn: 'Mô', textFr: 'Tissu' },
        { val: 'organ', text: 'Organ', textVn: 'Cơ quan', textFr: 'Organe' },
        { val: 'organsys', text: 'Organ system', textVn: 'Hệ cơ quan', textFr: 'Système d’organes' },
        { val: 'organism', text: 'Organism', textVn: 'Sinh vật', textFr: 'Organisme' },
        { val: 'organelle', text: 'Organelle', textVn: 'Bào quan', textFr: 'Organite' },
      ],
    },
    {
      id: 'leaf',
      title: 'Label the leaf section', titleVn: 'Gắn nhãn lát cắt lá', titleFr: 'Légende la coupe de feuille',
      inlineSvg: DIAGRAMS.LEAF_SECTION, viewBox: '0 0 720 380',
      // Root hair cells are the distractor: a specialised cell from 1.3 that
      // lives underground, never in a leaf.
      pins: [
        { id: 'p1', x: 490, y: 67, to: [440, 67], answer: 'upper' },
        { id: 'p2', x: 490, y: 146, to: [440, 146], answer: 'palisade' },
        { id: 'p3', x: 490, y: 222, to: [400, 236], answer: 'spongy' },
        { id: 'p4', x: 490, y: 278, to: [440, 256], answer: 'air' },
        { id: 'p5', x: 490, y: 334, to: [440, 331], answer: 'lower' },
      ],
      bank: [
        { val: 'upper', text: 'Upper epidermis', textVn: 'Biểu bì trên', textFr: 'Épiderme supérieur' },
        { val: 'palisade', text: 'Palisade layer', textVn: 'Lớp mô giậu', textFr: 'Couche palissadique' },
        { val: 'spongy', text: 'Spongy layer', textVn: 'Lớp mô xốp', textFr: 'Couche spongieuse' },
        { val: 'air', text: 'Air space', textVn: 'Khoang khí', textFr: 'Espace d’air' },
        { val: 'lower', text: 'Lower epidermis', textVn: 'Biểu bì dưới', textFr: 'Épiderme inférieur' },
        { val: 'roothair', text: 'Root hair cells', textVn: 'Tế bào lông hút', textFr: 'Cellules de poil absorbant' },
      ],
    },
    {
      id: 'respiratory',
      title: 'Label the breathing system', titleVn: 'Gắn nhãn hệ hô hấp', titleFr: 'Légende le système respiratoire',
      inlineSvg: DIAGRAMS.RESPIRATORY_SYSTEM, viewBox: '0 0 440 420',
      // The distractors are organs from OTHER systems — the lesson's point.
      pins: [
        { id: 'p1', x: 290, y: 78, to: [[206, 66], [209, 88]], answer: 'nose' },
        { id: 'p2', x: 290, y: 140, to: [205, 140], answer: 'windpipe' },
        { id: 'p3', x: 290, y: 240, to: [248, 236], answer: 'lungs' },
      ],
      bank: [
        { val: 'nose', text: 'Nose and mouth', textVn: 'Mũi và miệng', textFr: 'Nez et bouche' },
        { val: 'windpipe', text: 'Windpipe', textVn: 'Khí quản', textFr: 'Trachée' },
        { val: 'lungs', text: 'Lungs', textVn: 'Phổi', textFr: 'Poumons' },
        { val: 'heart', text: 'Heart', textVn: 'Tim', textFr: 'Cœur' },
        { val: 'stomach', text: 'Stomach', textVn: 'Dạ dày', textFr: 'Estomac' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
