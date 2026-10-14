// src/data/Y7_SCI/U01_1/data.js
// 1.1 Cells — the first Year 7 Science self-study unit. Seven scored tasks:
// 130 XP available, capped at 100 by unitXPOf (docs/y7-science-course.md §3).
// The science shape adds what the maths shape does not need: Spelling (the
// words ARE the lesson for an ESL class), Reading (a cloze passage in the
// register of the Learner's Book) and Diagrams (label-and-explain, AI-marked).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U01_1_DATA = {
  meta: {
    id: 'U01_1',
    title: 'Cells: The Building Blocks of Life',
    desc: 'What a cell is, the four parts every cell has, the extras only a plant cell has, and the microscope that lets us see them.',
    track: 'Y7_SCI',
    icon: 'Microscope',
    classroom: [{ course: 'y7-science', slug: 'U01_1', title: 'Science 1.1 · Cells' }],
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
      word: 'Cell', vn: 'Tế bào', fr: 'Cellule',
      def: 'The smallest basic unit of all living organisms.',
      vnDef: 'Đơn vị cơ bản nhỏ nhất của mọi sinh vật sống.',
      frDef: 'La plus petite unité de base de tous les êtres vivants.',
      sent: 'Every plant and animal is built out of cells.',
      vnSent: 'Mọi loài cây và động vật đều được tạo nên từ tế bào.',
      frSent: 'Chaque plante et chaque animal est fait de cellules.',
      isReal: true,
    },
    {
      word: 'Organelle', vn: 'Bào quan', fr: 'Organite',
      def: 'A tiny structure inside a cell that does one specific, important job.',
      vnDef: 'Một cấu trúc nhỏ bên trong tế bào, đảm nhận một nhiệm vụ cụ thể, quan trọng.',
      frDef: 'Une minuscule structure dans une cellule, qui fait un travail précis et important.',
      sent: 'The nucleus is the organelle that controls the cell.',
      vnSent: 'Nhân là bào quan điều khiển tế bào.',
      frSent: 'Le noyau est l’organite qui contrôle la cellule.',
      isReal: true,
    },
    {
      word: 'Nucleus', vn: 'Nhân', fr: 'Noyau',
      def: 'The control centre of the cell, which manages everything the cell does.',
      vnDef: 'Trung tâm điều khiển của tế bào, quản lý mọi hoạt động của tế bào.',
      frDef: 'Le centre de contrôle de la cellule, qui dirige tout ce que fait la cellule.',
      sent: 'The dark dot in the middle of the cheek cell is its nucleus.',
      vnSent: 'Chấm sẫm ở giữa tế bào má là nhân của nó.',
      frSent: 'Le point foncé au milieu de la cellule de joue est son noyau.',
      isReal: true,
    },
    {
      word: 'Cytoplasm', vn: 'Tế bào chất', fr: 'Cytoplasme',
      def: 'The clear, jelly-like substance inside a cell where its chemical reactions happen.',
      vnDef: 'Chất trong suốt, dạng thạch bên trong tế bào, nơi diễn ra các phản ứng hoá học.',
      frDef: 'La substance claire, comme de la gelée, à l’intérieur d’une cellule, où se font ses réactions chimiques.',
      sent: 'The organelles float in the cytoplasm.',
      vnSent: 'Các bào quan trôi nổi trong tế bào chất.',
      frSent: 'Les organites flottent dans le cytoplasme.',
      isReal: true,
    },
    {
      word: 'Cell membrane', vn: 'Màng tế bào', fr: 'Membrane cellulaire',
      def: 'The very thin, flexible layer around a cell that controls what goes in and out.',
      vnDef: 'Lớp rất mỏng và linh hoạt bao quanh tế bào, kiểm soát những gì ra vào.',
      frDef: 'La couche très fine et souple autour d’une cellule, qui contrôle ce qui entre et sort.',
      sent: 'Water and food pass through the cell membrane.',
      vnSent: 'Nước và thức ăn đi qua màng tế bào.',
      frSent: 'L’eau et la nourriture traversent la membrane cellulaire.',
      isReal: true,
    },
    {
      word: 'Cell wall', vn: 'Thành tế bào', fr: 'Paroi cellulaire',
      def: 'The strong, stiff outer layer that holds a plant cell in shape. Animal cells do not have one.',
      vnDef: 'Lớp ngoài chắc và cứng giữ hình dạng cho tế bào thực vật. Tế bào động vật không có.',
      frDef: 'La couche externe solide et rigide qui garde la forme d’une cellule végétale. Les cellules animales n’en ont pas.',
      sent: 'Onion cells look like bricks because each one has a cell wall.',
      vnSent: 'Tế bào hành trông như những viên gạch vì mỗi tế bào có một thành tế bào.',
      frSent: 'Les cellules d’oignon ressemblent à des briques, car chacune a une paroi cellulaire.',
      isReal: true,
    },
    {
      word: 'Chloroplast', vn: 'Lục lạp', fr: 'Chloroplaste',
      def: 'A green structure in a plant cell where the plant makes its food using sunlight.',
      vnDef: 'Cấu trúc màu xanh trong tế bào thực vật, nơi cây tạo thức ăn nhờ ánh sáng mặt trời.',
      frDef: 'Une structure verte dans une cellule végétale, où la plante fabrique sa nourriture grâce à la lumière du soleil.',
      sent: 'Leaves are green because their cells are full of chloroplasts.',
      vnSent: 'Lá có màu xanh vì tế bào của chúng chứa đầy lục lạp.',
      frSent: 'Les feuilles sont vertes car leurs cellules sont pleines de chloroplastes.',
      isReal: true,
    },
    {
      word: 'Microscope', vn: 'Kính hiển vi', fr: 'Microscope',
      def: 'A tool that uses lenses to bend light and magnify an image, making it look much bigger.',
      vnDef: 'Dụng cụ dùng thấu kính để bẻ ánh sáng và phóng đại hình ảnh, làm nó trông to hơn rất nhiều.',
      frDef: 'Un outil qui utilise des lentilles pour dévier la lumière et grossir une image, pour qu’elle paraisse beaucoup plus grande.',
      sent: 'You need a microscope to see a cell.',
      vnSent: 'Em cần kính hiển vi để nhìn thấy tế bào.',
      frSent: 'Il te faut un microscope pour voir une cellule.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'The Tiny Room',
      text: 'Every living thing — every plant, every animal, and you — is built out of the same tiny unit. Scientists call it a {cell}. The word comes from the Latin cella, which means a small room. In 1665 Robert Hooke looked at a piece of cork through an early {microscope} and saw rows of little empty boxes, so he borrowed the word. A cell is far too small to see with your eyes alone: a typical human cell is only 0.02 mm across, about three times thinner than a human hair. Inside the cell are even smaller structures, each with one important job. A structure like this is called an {organelle}.',
      vnTitle: 'Căn phòng nhỏ',
      frTitle: 'La petite pièce',
      vnText: 'Mọi sinh vật sống — mọi loài cây, mọi loài vật, và cả em — đều được tạo nên từ cùng một đơn vị tí hon. Các nhà khoa học gọi nó là {cell}. Từ này đến từ tiếng Latin cella, nghĩa là căn phòng nhỏ. Năm 1665 Robert Hooke quan sát một mẩu nút bần qua một chiếc {microscope} thời đầu và thấy những dãy hộp nhỏ trống rỗng, nên ông mượn từ đó. Tế bào quá nhỏ để nhìn bằng mắt thường: một tế bào người thường chỉ rộng 0,02 mm, mỏng hơn sợi tóc khoảng ba lần. Bên trong tế bào là những cấu trúc còn nhỏ hơn, mỗi cái có một nhiệm vụ quan trọng. Một cấu trúc như vậy được gọi là {organelle}.',
      frText: 'Tous les êtres vivants — chaque plante, chaque animal, et toi — sont faits de la même minuscule unité. Les scientifiques l’appellent une {cell}. Le mot vient du latin cella, qui veut dire « petite pièce ». En 1665, Robert Hooke a regardé un morceau de liège à travers un {microscope} très ancien et a vu des rangées de petites cases vides, alors il a emprunté ce mot. Une cellule est bien trop petite pour être vue à l’œil nu : une cellule humaine typique ne mesure que 0.02 mm de large, environ trois fois moins qu’un cheveu. Dans la cellule, il y a des structures encore plus petites, chacune avec un rôle important. Une structure comme celle-ci s’appelle un {organelle}.',
    },
    {
      id: 'passage_2',
      title: 'Four Parts Every Cell Has',
      text: 'Animal cells and plant cells both have four standard parts. Around the outside is the {cell membrane}, a very thin, flexible layer that controls what goes in and out. Inside is the {cytoplasm}, a clear jelly where the cell’s chemical reactions happen. The {nucleus} is the control centre — the boss that manages everything the cell does. And scattered through the jelly are the mitochondria, where energy is released from food.',
      vnTitle: 'Bốn bộ phận mọi tế bào đều có',
      frTitle: 'Quatre parties que toute cellule possède',
      vnText: 'Tế bào động vật và tế bào thực vật đều có bốn bộ phận tiêu chuẩn. Bao quanh bên ngoài là {cell membrane}, một lớp rất mỏng và linh hoạt kiểm soát những gì ra vào. Bên trong là {cytoplasm}, một chất thạch trong suốt nơi diễn ra các phản ứng hoá học của tế bào. {nucleus} là trung tâm điều khiển — ông chủ quản lý mọi hoạt động của tế bào. Và rải rác trong chất thạch là các ti thể, nơi năng lượng được giải phóng từ thức ăn.',
      frText: 'Les cellules animales et végétales ont toutes deux quatre parties de base. Tout autour se trouve la {cell membrane}, une couche très fine et souple qui contrôle ce qui entre et sort. À l’intérieur se trouve le {cytoplasm}, une gelée claire où se font les réactions chimiques de la cellule. Le {nucleus} est le centre de contrôle — le chef qui dirige tout ce que fait la cellule. Et un peu partout dans la gelée, il y a les mitochondries, où l’énergie est libérée à partir de la nourriture.',
    },
    {
      id: 'passage_3',
      title: 'What Only a Plant Cell Has',
      text: 'A plant cell has everything an animal cell has, plus some extras. An animal has a skeleton to hold it up, but a plant does not, so every plant cell needs a stiff box around it: the {cell wall}, made of a tough substance called cellulose. A large sap vacuole full of sugars and water keeps the cell firm, like air in a tyre. And because a plant cannot go and find food, it makes its own inside green structures called {chloroplast}s, using the green substance chlorophyll to capture sunlight.',
      vnTitle: 'Những gì chỉ tế bào thực vật có',
      frTitle: 'Ce que seule la cellule végétale possède',
      vnText: 'Tế bào thực vật có mọi thứ mà tế bào động vật có, cộng thêm vài phần nữa. Động vật có bộ xương để nâng đỡ, nhưng cây thì không, nên mỗi tế bào thực vật cần một chiếc hộp cứng bao quanh: {cell wall}, được làm từ một chất dai gọi là xenlulozơ. Một không bào lớn chứa đầy đường và nước giúp tế bào căng cứng, như hơi trong lốp xe. Và vì cây không thể đi tìm thức ăn, nó tự tạo thức ăn bên trong những cấu trúc màu xanh gọi là {chloroplast}, dùng chất diệp lục màu xanh để hấp thụ ánh sáng mặt trời.',
      frText: 'Une cellule végétale a tout ce qu’a une cellule animale, plus quelques extras. Un animal a un squelette pour le tenir debout, mais pas une plante, donc chaque cellule végétale a besoin d’une boîte rigide autour d’elle : la {cell wall}, faite d’une substance résistante appelée cellulose. Une grande vacuole pleine de sucres et d’eau garde la cellule ferme, comme l’air dans un pneu. Et comme une plante ne peut pas aller chercher sa nourriture, elle la fabrique elle-même dans des structures vertes appelées {chloroplast}s, grâce à une substance verte, la chlorophylle, qui capte la lumière du soleil.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Explain why you cannot see a cell with your eyes alone, and name the tool scientists use to see one.',
      vnTranslation: 'Hãy giải thích vì sao em không thể nhìn thấy tế bào bằng mắt thường, và kể tên dụng cụ các nhà khoa học dùng để nhìn thấy nó.',
      frTranslation: 'Explique pourquoi tu ne peux pas voir une cellule à l’œil nu, et donne le nom de l’outil que les scientifiques utilisent pour en voir une.',
      suggestedWords: [['small', 'tiny', '0.02'], ['microscope']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying a cell is far too small to see (e.g. about 0.02 mm across, thinner than a hair).',
        '1 mark for naming the microscope, which magnifies the image.',
      ],
      modelAnswer: 'A cell is far too small for your eyes to see — a typical human cell is only about 0.02 mm across, thinner than a hair. Scientists use a microscope, which bends light with lenses to magnify the image.',
    },
    {
      id: 'sq2',
      question: 'What does the nucleus do, and what does the cell membrane do?',
      vnTranslation: 'Nhân làm gì, và màng tế bào làm gì?',
      frTranslation: 'Que fait le noyau, et que fait la membrane cellulaire ?',
      suggestedWords: [['control', 'controls', 'manages'], ['in and out', 'goes in', 'enters']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the nucleus is the control centre that manages (controls) what the cell does.',
        '1 mark for saying the cell membrane controls what goes into and out of the cell.',
      ],
      modelAnswer: 'The nucleus is the control centre of the cell: it manages everything the cell does. The cell membrane is the thin layer around the outside that controls what goes in and out of the cell.',
    },
    {
      id: 'sq3',
      question: 'A plant cell has a cell wall but an animal cell does not. Explain why a plant needs cell walls.',
      vnTranslation: 'Tế bào thực vật có thành tế bào nhưng tế bào động vật thì không. Hãy giải thích vì sao cây cần thành tế bào.',
      frTranslation: 'Une cellule végétale a une paroi cellulaire, mais pas une cellule animale. Explique pourquoi une plante a besoin de parois cellulaires.',
      suggestedWords: [['skeleton'], ['shape', 'hold', 'support', 'stiff']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying a plant has no skeleton to hold it up (unlike an animal).',
        '1 mark for saying the stiff cell wall holds each cell in shape and supports the plant.',
      ],
      modelAnswer: 'An animal has a skeleton to hold it up, but a plant does not. So every plant cell needs a strong, stiff cell wall around it to hold the cell in shape and support the plant.',
    },
    {
      id: 'sq4',
      question: 'Leaves are green. Explain why, using the words chloroplast and chlorophyll.',
      vnTranslation: 'Lá có màu xanh. Hãy giải thích vì sao, dùng các từ chloroplast (lục lạp) và chlorophyll (diệp lục).',
      frTranslation: 'Les feuilles sont vertes. Explique pourquoi, en utilisant les mots chloroplast (chloroplaste) et chlorophyll (chlorophylle).',
      suggestedWords: [['chloroplast', 'chloroplasts'], ['chlorophyll'], ['sunlight', 'food']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying leaf cells contain chloroplasts, which are full of the green substance chlorophyll.',
        '1 mark for saying chlorophyll captures sunlight so the plant can make its own food.',
      ],
      modelAnswer: 'Leaf cells are full of chloroplasts, and chloroplasts contain a green substance called chlorophyll — that is what makes leaves green. Chlorophyll captures sunlight, which the plant uses to make its own food.',
    },
  ],

  diagrams: [
    {
      id: 'd1',
      inlineSvg: DIAGRAMS.ANIMAL_CELL,
      promptText: 'This is an animal cell. Name the four parts shown, and say what job the nucleus and the cell membrane each do.',
      suggestedWords: [['membrane'], ['cytoplasm'], ['nucleus'], ['mitochondria']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming all four parts: cell membrane, cytoplasm, nucleus, mitochondria.',
        '1 mark for saying the nucleus is the control centre that manages what the cell does.',
        '1 mark for saying the cell membrane controls what goes in and out of the cell.',
      ],
      modelAnswer: 'The four parts are the cell membrane, the cytoplasm, the nucleus and the mitochondria. The nucleus is the control centre that manages everything the cell does. The cell membrane is the thin outer layer that controls what goes into and out of the cell.',
    },
    {
      id: 'd2',
      inlineSvg: DIAGRAMS.PLANT_CELL,
      promptText: 'This is a plant cell. Name the three parts it has that an animal cell does not have, and explain what one of them does.',
      suggestedWords: [['cell wall'], ['chloroplast', 'chloroplasts'], ['vacuole']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming the cell wall and the chloroplasts.',
        '1 mark for naming the (sap) vacuole.',
        '1 mark for a correct job: the cell wall holds the cell in shape / chloroplasts make food using sunlight / the vacuole keeps the cell firm.',
      ],
      modelAnswer: 'A plant cell has a cell wall, chloroplasts and a large sap vacuole, which an animal cell does not have. The cell wall is a strong, stiff outer layer that holds the plant cell in shape. (The chloroplasts make food using sunlight, and the vacuole keeps the cell firm.)',
    },
    {
      id: 'd3',
      inlineSvg: DIAGRAMS.MICROSCOPE_LIGHT,
      promptText: 'The diagram shows how a light microscope works. Explain how it makes a tiny specimen look bigger.',
      suggestedWords: [['light'], ['lens', 'lenses', 'bend', 'bends'], ['magnify', 'bigger']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying light passes up through the specimen and through curved glass lenses.',
        '1 mark for saying the lenses bend the light so the image reaching the eye is magnified (much bigger than the real thing).',
      ],
      modelAnswer: 'Light shines up through the specimen and passes through two curved pieces of glass called lenses. The lenses bend the light, so the image that reaches your eye is magnified — it looks much bigger than the specimen really is.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's own diagrams, labels stripped
  // at runtime. Each pin is a blank box: (x, y) is where its leader line meets
  // the box, `to` is the part the line points at. Part coordinates from
  // `node scripts/svg-coords.mjs Y7_SCI/U01_1 <KEY>`; the validator fails a box
  // that overlaps another or runs off the diagram. Each bank carries a
  // distractor.
  labelIt: [
    {
      id: 'animal',
      title: 'Label the animal cell', titleVn: 'Gắn nhãn tế bào động vật', titleFr: 'Légende la cellule animale',
      inlineSvg: DIAGRAMS.ANIMAL_CELL, viewBox: '0 0 760 430',
      pins: [
        { id: 'p1', x: 190, y: 104, to: [246, 118], answer: 'membrane' },
        { id: 'p2', x: 190, y: 322, to: [268, 301], answer: 'mito' },
        { id: 'p3', x: 590, y: 140, to: [440, 204], answer: 'nucleus' },
        { id: 'p4', x: 590, y: 300, to: [505, 262], answer: 'cyto' },
      ],
      bank: [
        { val: 'membrane', text: 'Cell membrane', textVn: 'Màng tế bào', textFr: 'Membrane' },
        { val: 'nucleus', text: 'Nucleus', textVn: 'Nhân', textFr: 'Noyau' },
        { val: 'mito', text: 'Mitochondrion', textVn: 'Ti thể', textFr: 'Mitochondrie' },
        { val: 'cyto', text: 'Cytoplasm', textVn: 'Tế bào chất', textFr: 'Cytoplasme' },
        { val: 'wall', text: 'Cell wall', textVn: 'Thành tế bào', textFr: 'Paroi cellulaire' },
      ],
    },
    {
      id: 'plant',
      title: 'Label the plant cell', titleVn: 'Gắn nhãn tế bào thực vật', titleFr: 'Légende la cellule végétale',
      inlineSvg: DIAGRAMS.PLANT_CELL, viewBox: '0 0 760 470',
      pins: [
        { id: 'p1', x: 250, y: 90, to: [300, 118], answer: 'wall' },
        { id: 'p2', x: 250, y: 170, to: [311, 170], answer: 'membrane' },
        { id: 'p3', x: 250, y: 245, to: [330, 245], answer: 'cyto' },
        { id: 'p4', x: 250, y: 330, to: [332, 306], answer: 'nucleus' },
        { id: 'p5', x: 520, y: 130, to: [398, 150], answer: 'vacuole' },
        { id: 'p6', x: 520, y: 210, to: [446, 202], answer: 'chloro' },
        { id: 'p7', x: 520, y: 290, to: [447, 264], answer: 'mito' },
      ],
      bank: [
        { val: 'wall', text: 'Cell wall', textVn: 'Thành tế bào', textFr: 'Paroi cellulaire' },
        { val: 'membrane', text: 'Cell membrane', textVn: 'Màng tế bào', textFr: 'Membrane cellulaire' },
        { val: 'cyto', text: 'Cytoplasm', textVn: 'Tế bào chất', textFr: 'Cytoplasme' },
        { val: 'nucleus', text: 'Nucleus', textVn: 'Nhân', textFr: 'Noyau' },
        { val: 'vacuole', text: 'Sap vacuole', textVn: 'Không bào', textFr: 'Vacuole' },
        { val: 'chloro', text: 'Chloroplast', textVn: 'Lục lạp', textFr: 'Chloroplaste' },
        { val: 'mito', text: 'Mitochondrion', textVn: 'Ti thể', textFr: 'Mitochondrie' },
        { val: 'cellulose', text: 'Cellulose', textVn: 'Xenlulozơ', textFr: 'Cellulose' },
      ],
    },
    {
      // A real microscope, not the ray diagram: the exam asks for the parts.
      id: 'microscope',
      title: 'Label the light microscope', titleVn: 'Gắn nhãn kính hiển vi quang học', titleFr: 'Légende le microscope optique',
      inlineSvg: DIAGRAMS.MICROSCOPE, viewBox: '0 0 680 440',
      pins: [
        { id: 'p1', x: 205, y: 60, to: [359, 56], answer: 'eyepiece' },
        { id: 'p2', x: 205, y: 236, to: [240, 236], answer: 'knob' },
        { id: 'p3', x: 490, y: 228, to: [381, 240], answer: 'objective' },
        { id: 'p4', x: 490, y: 280, to: [383, 295], answer: 'specimen' },
        { id: 'p5', x: 490, y: 330, to: [455, 307], answer: 'stage' },
        { id: 'p6', x: 490, y: 378, to: [382, 363], answer: 'light' },
      ],
      bank: [
        { val: 'eyepiece', text: 'Eyepiece lens', textVn: 'Thị kính', textFr: 'Oculaire' },
        { val: 'objective', text: 'Objective lens', textVn: 'Vật kính', textFr: 'Objectif' },
        { val: 'specimen', text: 'The specimen', textVn: 'Mẫu vật', textFr: 'L’échantillon' },
        { val: 'stage', text: 'Stage', textVn: 'Bàn kính', textFr: 'Platine' },
        { val: 'light', text: 'Light source', textVn: 'Nguồn sáng', textFr: 'Source de lumière' },
        { val: 'knob', text: 'Focusing knob', textVn: 'Núm chỉnh tiêu cự', textFr: 'Vis de mise au point' },
        { val: 'mirror', text: 'Mirror', textVn: 'Gương', textFr: 'Miroir' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
