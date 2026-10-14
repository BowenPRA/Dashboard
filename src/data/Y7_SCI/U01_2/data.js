// src/data/Y7_SCI/U01_2/data.js
// 1.2 Animal Cells — Year 7 Science self-study unit, rebuilt to the
// engagement plan (docs/y7-science/ENGAGEMENT-PLAN.md). Nine scored tasks:
// 145 XP available, capped at 100 (docs/y7-science-course.md §3). SPELLING
// is dropped; WORKBOOK and LABEL_IT are new.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { DIAGRAMS } from './diagrams.js';

export const U01_2_DATA = {
  meta: {
    id: 'U01_2',
    title: 'Animal Cells: What You Are Made Of',
    desc: 'The four parts of an animal cell, the three things it has not got, why it has no fixed shape, and how to look at your own cells.',
    track: 'Y7_SCI',
    icon: 'Dna',
    classroom: [{ course: 'y7-science', slug: 'U01_2', title: 'Science 1.2 · Animal Cells' }],
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
      word: 'Mitochondria', vn: 'Ti thể', fr: 'Mitochondries',
      def: 'The parts of a cell where energy is released from food. One of them is a mitochondrion.',
      vnDef: 'Những bộ phận của tế bào nơi năng lượng được giải phóng từ thức ăn. Số ít là mitochondrion.',
      frDef: 'Les parties de la cellule où l’énergie est libérée à partir de la nourriture. Au singulier : une mitochondrie (mitochondrion).',
      sent: 'Muscle cells have many mitochondria because they need a lot of energy.',
      vnSent: 'Tế bào cơ có nhiều ti thể vì chúng cần nhiều năng lượng.',
      frSent: 'Les cellules musculaires ont beaucoup de mitochondries parce qu’elles ont besoin de beaucoup d’énergie.',
      isReal: true,
    },
    {
      word: 'Similar', vn: 'Tương tự', fr: 'Semblable',
      def: 'Alike in some ways but different in others. Not the same.',
      vnDef: 'Giống ở một số điểm nhưng khác ở những điểm khác. Không giống hệt.',
      frDef: 'Pareil sur certains points, mais différent sur d’autres. Pas identique.',
      sent: 'Animal cells are similar to plant cells, but they have no cell wall.',
      vnSent: 'Tế bào động vật tương tự tế bào thực vật, nhưng không có thành tế bào.',
      frSent: 'Les cellules animales sont semblables aux cellules végétales, mais elles n’ont pas de paroi cellulaire.',
      isReal: true,
    },
    {
      word: 'Fixed shape', vn: 'Hình dạng cố định', fr: 'Forme fixe',
      def: 'A shape that does not change. An animal cell has no fixed shape because it has no cell wall.',
      vnDef: 'Một hình dạng không thay đổi. Tế bào động vật không có hình dạng cố định vì không có thành tế bào.',
      frDef: 'Une forme qui ne change pas. Une cellule animale n’a pas de forme fixe parce qu’elle n’a pas de paroi cellulaire.',
      sent: 'A plant cell has a fixed shape, like a box.',
      vnSent: 'Tế bào thực vật có hình dạng cố định, như một chiếc hộp.',
      frSent: 'Une cellule végétale a une forme fixe, comme une boîte.',
      isReal: true,
    },
    {
      word: 'Stain', vn: 'Thuốc nhuộm', fr: 'Colorant',
      def: 'A coloured dye added to a specimen to make its parts easier to see.',
      vnDef: 'Phẩm màu thêm vào mẫu vật để các bộ phận dễ nhìn thấy hơn.',
      frDef: 'Une teinture colorée ajoutée à un échantillon pour rendre ses parties plus visibles.',
      sent: 'Methylene blue is a stain that turns the nucleus dark blue.',
      vnSent: 'Xanh methylen là thuốc nhuộm làm nhân chuyển sang màu xanh đậm.',
      frSent: 'Le bleu de méthylène est un colorant qui rend le noyau bleu foncé.',
      isReal: true,
    },
    {
      word: 'Specimen', vn: 'Mẫu vật', fr: 'Échantillon',
      def: 'The thing you are looking at under a microscope.',
      vnDef: 'Thứ em đang quan sát dưới kính hiển vi.',
      frDef: 'La chose que tu observes au microscope.',
      sent: 'Put the specimen on the slide over the hole in the stage.',
      vnSent: 'Đặt mẫu vật trên lam kính, ngay trên lỗ sáng của bàn kính.',
      frSent: 'Pose l’échantillon sur la lame, au-dessus du trou de la platine.',
      isReal: true,
    },
    {
      word: 'Cover slip', vn: 'Lamen', fr: 'Lamelle',
      def: 'A very thin square of glass lowered over the specimen on a slide.',
      vnDef: 'Một miếng kính vuông rất mỏng được hạ xuống phủ lên mẫu vật trên lam kính.',
      frDef: 'Un petit carré de verre très fin qu’on pose sur l’échantillon, sur la lame.',
      sent: 'Lower the cover slip carefully so there are no air bubbles.',
      vnSent: 'Hạ lamen xuống cẩn thận để không có bọt khí.',
      frSent: 'Pose la lamelle doucement pour éviter les bulles d’air.',
      isReal: true,
    },
    {
      word: 'Objective lens', vn: 'Vật kính', fr: 'Objectif',
      def: 'The lens on a microscope closest to the specimen. Start with the smallest one.',
      vnDef: 'Thấu kính trên kính hiển vi gần mẫu vật nhất. Bắt đầu với vật kính nhỏ nhất.',
      frDef: 'La lentille du microscope la plus proche de l’échantillon. Commence par le plus petit.',
      sent: 'Turn to a larger objective lens to magnify the cells more.',
      vnSent: 'Xoay sang vật kính lớn hơn để phóng đại tế bào nhiều hơn.',
      frSent: 'Passe à un objectif plus grand pour grossir davantage les cellules.',
      isReal: true,
    },
    {
      word: 'Trillion', vn: 'Nghìn tỉ', fr: 'Mille milliards',
      def: 'A million million: 1 000 000 000 000. A person is made of about 100 trillion cells.',
      vnDef: 'Một triệu triệu: 1 000 000 000 000. Một người được tạo nên từ khoảng 100 nghìn tỉ tế bào.',
      frDef: 'Un million de millions : 1 000 000 000 000. Une personne est faite d’environ 100 000 milliards (100 trillion) de cellules.',
      sent: 'There are more cells in you than there are stars in the galaxy — about 100 trillion.',
      vnSent: 'Trong em có nhiều tế bào hơn số sao trong thiên hà — khoảng 100 nghìn tỉ.',
      frSent: 'Tu as plus de cellules que la galaxie n’a d’étoiles — environ 100 000 milliards.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'You Are an Animal',
      text: 'All animals are made of cells, and you are an animal, so your body is made of cells too — about 100 {trillion} of them. An animal cell has a cell membrane, cytoplasm, a nucleus and {mitochondria}, where energy is released from food. In these ways an animal cell is {similar} to a plant cell. But similar is not the same. A plant cell also has a cell wall, chloroplasts and a sap vacuole, and an animal cell has none of those.',
      vnTitle: 'Em là một động vật',
      frTitle: 'Tu es un animal',
      vnText: 'Mọi loài vật đều được tạo nên từ tế bào, và em là một động vật, nên cơ thể em cũng được tạo nên từ tế bào — khoảng 100 {trillion}. Tế bào động vật có màng tế bào, tế bào chất, nhân và {mitochondria}, nơi năng lượng được giải phóng từ thức ăn. Về những mặt này, tế bào động vật {similar} tế bào thực vật. Nhưng tương tự không phải là giống hệt. Tế bào thực vật còn có thành tế bào, lục lạp và không bào, còn tế bào động vật không có thứ nào trong số đó.',
      frText: 'Tous les animaux sont faits de cellules, et tu es un animal, donc ton corps est fait de cellules lui aussi — environ 100 {trillion} (100 000 milliards). Une cellule animale a une membrane cellulaire, du cytoplasme, un noyau et des {mitochondria}, où l’énergie est libérée à partir de la nourriture. Sur ces points, une cellule animale est {similar} à une cellule végétale. Mais semblable ne veut pas dire identique. Une cellule végétale a aussi une paroi cellulaire, des chloroplastes et une vacuole, et une cellule animale n’a rien de tout cela.',
    },
    {
      id: 'passage_2',
      title: 'Why Animal Cells Are Soft',
      text: 'A plant stands still. Every one of its cells is locked inside a stiff cell wall, and that is what holds a whole tree up. An animal moves, so its cells have to bend, squeeze and change shape all day. A stiff box would stop them. That is why an animal cell has no cell wall and no {fixed shape}: it looks soft and rounded, with no straight edges. Because it is not locked in a box, an animal cell can grow into whatever shape its job needs — a nerve cell can be a metre long.',
      vnTitle: 'Vì sao tế bào động vật mềm',
      frTitle: 'Pourquoi les cellules animales sont molles',
      vnText: 'Cây đứng yên một chỗ. Mỗi tế bào của nó nằm trong một thành tế bào cứng, và chính điều đó nâng đỡ cả một cái cây. Động vật di chuyển, nên tế bào của nó phải uốn, ép và đổi hình dạng suốt ngày. Một chiếc hộp cứng sẽ cản trở điều đó. Đó là lý do tế bào động vật không có thành tế bào và không có {fixed shape}: nó trông mềm và tròn, không có cạnh thẳng. Vì không bị nhốt trong hộp, tế bào động vật có thể phát triển thành bất kỳ hình dạng nào nhiệm vụ của nó cần — một tế bào thần kinh có thể dài một mét.',
      frText: 'Une plante ne bouge pas. Chacune de ses cellules est enfermée dans une paroi cellulaire rigide, et c’est ce qui tient tout un arbre debout. Un animal bouge, donc ses cellules doivent se plier, se serrer et changer de forme toute la journée. Une boîte rigide les en empêcherait. C’est pourquoi une cellule animale n’a pas de paroi cellulaire et pas de {fixed shape} : elle semble molle et arrondie, sans bords droits. Comme elle n’est pas enfermée dans une boîte, une cellule animale peut prendre la forme dont son travail a besoin — une cellule nerveuse peut mesurer un mètre de long.',
    },
    {
      id: 'passage_3',
      title: 'Looking at Your Own Cells',
      text: 'Gently rub a cotton bud along the inside of your cheek, then rub it on a clean slide. You still will not see anything, because cheek cells are almost see-through. So add one drop of methylene blue — a {stain}, a coloured dye that makes the parts easier to see — and carefully lower a {cover slip} over the drop. Put the smallest {objective lens} over the stage, and, looking from the side, turn the focusing knob until the lens is close to the slide. Then look down the eyepiece and slowly move the lens upwards until the cells appear.',
      vnTitle: 'Quan sát tế bào của chính em',
      frTitle: 'Observer tes propres cellules',
      vnText: 'Nhẹ nhàng chà tăm bông dọc theo mặt trong má, rồi chà lên một lam kính sạch. Em vẫn chưa thấy gì, vì tế bào má gần như trong suốt. Vậy nên nhỏ một giọt xanh methylen — một {stain}, phẩm màu làm các bộ phận dễ nhìn thấy hơn — và cẩn thận hạ {cover slip} xuống phủ lên giọt đó. Đưa {objective lens} nhỏ nhất vào vị trí trên bàn kính, và, nhìn từ bên cạnh, vặn núm chỉnh cho tới khi vật kính gần sát lam kính. Rồi nhìn qua thị kính và từ từ đưa vật kính lên trên cho tới khi tế bào hiện ra.',
      frText: 'Frotte doucement un coton-tige à l’intérieur de ta joue, puis frotte-le sur une lame propre. Tu ne vois toujours rien, car les cellules de la joue sont presque transparentes. Alors ajoute une goutte de bleu de méthylène — un {stain}, une teinture qui rend les parties plus visibles — et pose doucement une {cover slip} sur la goutte. Place le plus petit {objective lens} au-dessus de la platine et, en regardant de côté, tourne la molette de mise au point jusqu’à ce que l’objectif soit près de la lame. Puis regarde dans l’oculaire et remonte lentement l’objectif jusqu’à ce que les cellules apparaissent.',
    },
  ],

  shortQA: [
    {
      id: 'sq1',
      question: 'Write one sentence comparing a plant cell and an animal cell, using the word "both", and one using the word "but".',
      vnTranslation: 'Viết một câu so sánh tế bào thực vật và tế bào động vật dùng từ "both", và một câu dùng từ "but".',
      frTranslation: 'Écris une phrase qui compare une cellule végétale et une cellule animale avec le mot « both », et une autre avec le mot « but ».',
      suggestedWords: [['both'], ['but']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for a correct "both" sentence, e.g. both a plant cell and an animal cell have a nucleus (or a membrane / cytoplasm / mitochondria).',
        '1 mark for a correct "but" sentence, e.g. a plant cell has a cell wall (or chloroplasts / a vacuole), but an animal cell does not.',
      ],
      modelAnswer: 'Both a plant cell and an animal cell have a nucleus. A plant cell has a cell wall, but an animal cell does not.',
    },
    {
      id: 'sq2',
      question: 'Explain why an animal cell has no fixed shape, and why that is useful for an animal.',
      vnTranslation: 'Hãy giải thích vì sao tế bào động vật không có hình dạng cố định, và vì sao điều đó có ích cho động vật.',
      frTranslation: 'Explique pourquoi une cellule animale n’a pas de forme fixe, et pourquoi c’est utile pour un animal.',
      suggestedWords: [['cell wall'], ['move', 'moves', 'bend', 'squeeze']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying an animal cell has no cell wall (the stiff box that gives a plant cell its shape).',
        '1 mark for saying animals move, so their cells need to bend, squeeze and change shape.',
      ],
      modelAnswer: 'An animal cell has no cell wall, so there is no stiff box to hold it in one shape. That is useful because an animal moves — its cells need to bend, squeeze and change shape all day.',
    },
    {
      id: 'sq3',
      question: 'A photograph shows cells with no green parts. Lan says "they must be animal cells". Explain why Lan might be wrong, and say what clue she should look for instead.',
      vnTranslation: 'Một bức ảnh cho thấy các tế bào không có phần màu xanh. Lan nói "chắc chắn là tế bào động vật". Hãy giải thích vì sao Lan có thể sai, và nói dấu hiệu nào bạn ấy nên tìm thay vào đó.',
      frTranslation: 'Une photo montre des cellules sans aucune partie verte. Lan dit : « Ce sont forcément des cellules animales. » Explique pourquoi Lan a peut-être tort, et dis quel indice elle devrait chercher à la place.',
      suggestedWords: [['onion', 'root', 'underground', 'dark'], ['cell wall']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying some plant cells have no chloroplasts (e.g. an onion grows underground in the dark), so no green does not mean animal.',
        '1 mark for saying the reliable clue is the cell wall — straight, stiff edges with cells packed like bricks.',
      ],
      modelAnswer: 'Lan might be wrong because some plant cells have no chloroplasts — an onion bulb grows underground in the dark, so its cells are not green but they are still plant cells. The reliable clue is the cell wall: straight, stiff edges with the cells packed together like bricks mean it is a plant.',
    },
    {
      id: 'sq4',
      question: 'When you set up the microscope, why must you look from the side while turning the focusing knob to bring the lens close to the slide?',
      vnTranslation: 'Khi lắp đặt kính hiển vi, vì sao em phải nhìn từ bên cạnh trong lúc vặn núm chỉnh để đưa vật kính lại gần lam kính?',
      frTranslation: 'Quand tu règles le microscope, pourquoi dois-tu regarder de côté en tournant la molette pour approcher l’objectif de la lame ?',
      suggestedWords: [['see', 'tell', 'how close'], ['break', 'crush', 'smash']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying that with your eye at the eyepiece you cannot tell how close the lens is to the slide.',
        '1 mark for saying that otherwise the lens could be driven into the slide and break it.',
      ],
      modelAnswer: 'With your eye at the eyepiece you cannot tell how close the lens is to the slide. Looking from the side is the only way to be sure you do not drive the lens into the slide and break it.',
    },
  ],

  diagrams: [
    {
      id: 'd1',
      inlineSvg: DIAGRAMS.SPOT_THE_DIFFERENCE,
      promptText: 'The diagram shows a plant cell and an animal cell side by side. Name the three parts the plant cell has that the animal cell does not, and explain why the animal cell has no fixed shape.',
      suggestedWords: [['cell wall'], ['chloroplast', 'chloroplasts'], ['vacuole'], ['no fixed shape', 'change shape']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming the cell wall and the chloroplasts.',
        '1 mark for naming the sap vacuole.',
        '1 mark for saying the animal cell has no cell wall, so nothing holds it in one shape (it is soft and rounded).',
      ],
      modelAnswer: 'The plant cell has a cell wall, chloroplasts and a sap vacuole, which the animal cell does not have. The animal cell has no fixed shape because it has no cell wall — there is no stiff box holding it in one shape, so it is soft and rounded.',
    },
    {
      id: 'd2',
      inlineSvg: DIAGRAMS.SLIDE_PREP,
      promptText: 'The diagram shows the steps for making a slide of your own cheek cells. Describe the steps in order, and explain why the methylene blue is added.',
      suggestedWords: [['cotton bud', 'cheek'], ['slide'], ['methylene blue', 'stain'], ['cover slip']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the first two steps in order: rub a cotton bud inside the cheek, then rub it on a clean slide.',
        '1 mark for the last two steps in order: add a drop of methylene blue, then lower a cover slip over it.',
        '1 mark for saying methylene blue is a stain that colours the parts so they are easier to see (the cells are almost see-through).',
      ],
      modelAnswer: 'First, gently rub a cotton bud along the inside of your cheek. Then rub the bud on a clean microscope slide. Next, add one drop of methylene blue with a dropper pipette, and finally lower a cover slip carefully over the drop. The methylene blue is a stain: cheek cells are almost see-through, and the dye colours the parts (the nucleus goes dark blue) so they are easier to see.',
    },
    {
      id: 'd3',
      inlineSvg: DIAGRAMS.SHAPE_FREEDOM,
      promptText: 'Use the diagram to explain why a plant cell keeps a box shape but an animal cell can bend and squeeze.',
      suggestedWords: [['cell wall', 'wall'], ['stiff', 'box'], ['move', 'bend', 'squeeze']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the plant cell is held in shape by its stiff cell wall.',
        '1 mark for saying the animal cell has no cell wall, so it can change shape — which an animal needs because it moves.',
      ],
      modelAnswer: 'The plant cell is locked inside a stiff cell wall, which holds it in a box shape. The animal cell has no cell wall, so nothing holds it in one shape — it can bend and squeeze, which an animal needs because it moves.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's own diagrams, labels stripped
  // at runtime. Each pin is a blank box: (x, y) is where its leader line meets
  // the box, `to` is the part the line points at; a pin with no `to` is a
  // caption box centred on (x, y). Part coordinates from
  // `node scripts/svg-coords.mjs Y7_SCI/U01_2 <KEY>`. Each bank carries one or
  // two distractors.
  labelIt: [
    {
      id: 'animal',
      title: 'Label the animal cell', titleVn: 'Gắn nhãn tế bào động vật', titleFr: 'Légende la cellule animale',
      inlineSvg: DIAGRAMS.ANIMAL_CELL, viewBox: '0 0 760 430',
      pins: [
        { id: 'p1', x: 560, y: 90, to: [424, 92], answer: 'membrane' },
        { id: 'p2', x: 560, y: 170, to: [360, 178], answer: 'cyto' },
        { id: 'p3', x: 560, y: 250, to: [414, 197], answer: 'mito' },
        { id: 'p4', x: 560, y: 330, to: [372, 292], answer: 'nucleus' },
      ],
      bank: [
        { val: 'membrane', text: 'Cell membrane', textVn: 'Màng tế bào', textFr: 'Membrane cellulaire' },
        { val: 'cyto', text: 'Cytoplasm', textVn: 'Tế bào chất', textFr: 'Cytoplasme' },
        { val: 'mito', text: 'Mitochondrion', textVn: 'Ti thể', textFr: 'Mitochondrie' },
        { val: 'nucleus', text: 'Nucleus', textVn: 'Nhân', textFr: 'Noyau' },
        { val: 'wall', text: 'Cell wall', textVn: 'Thành tế bào', textFr: 'Paroi cellulaire' },
      ],
    },
    {
      id: 'slide_prep',
      title: 'Label the steps for making a slide', titleVn: 'Gắn nhãn các bước chuẩn bị tiêu bản', titleFr: 'Légende les étapes pour préparer une lame',
      inlineSvg: DIAGRAMS.SLIDE_PREP, viewBox: '0 0 760 260', slotW: 170,
      // A caption box under each picture; the distractors are real steps that
      // come AFTER these four, so knowing the order is what gets them right.
      pins: [
        { id: 'p1', x: 104, y: 222, answer: 'cheek' },
        { id: 'p2', x: 290, y: 222, answer: 'slide' },
        { id: 'p3', x: 476, y: 222, answer: 'stain' },
        { id: 'p4', x: 662, y: 222, answer: 'coverslip' },
      ],
      bank: [
        { val: 'cheek', text: 'Rub a cotton bud inside your cheek', textVn: 'Chà tăm bông vào mặt trong má', textFr: 'Frotte un coton-tige dans ta joue' },
        { val: 'slide', text: 'Rub the bud on a clean slide', textVn: 'Chà tăm bông lên lam kính sạch', textFr: 'Frotte le coton-tige sur une lame propre' },
        { val: 'stain', text: 'Add a drop of methylene blue', textVn: 'Nhỏ một giọt xanh methylen', textFr: 'Ajoute une goutte de bleu de méthylène' },
        { val: 'coverslip', text: 'Lower a cover slip over it', textVn: 'Hạ lamen phủ lên', textFr: 'Pose une lamelle dessus' },
        { val: 'eyepiece', text: 'Look down the eyepiece', textVn: 'Nhìn qua thị kính', textFr: 'Regarde dans l’oculaire' },
        { val: 'objective', text: 'Choose the smallest objective lens', textVn: 'Chọn vật kính nhỏ nhất', textFr: 'Choisis le plus petit objectif' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
