// src/data/Y7_SCI/U01_1/notes.js
// 1.1 Cells — the self-study deck, rebuilt to the engagement plan
// (docs/y7-science/ENGAGEMENT-PLAN.md). 16 layout slides; 6 scored items —
// three interactive activities (estimate · hotspot · sort) and three checks.
//
// The classroom deck opened with "write a sentence on paper"; this one opens
// with a guess on a slider that the next two slides pay off. The two
// Learner's Book scans are not used (not openly licensed); the drawn diagrams
// carry the content. Every photograph is credited in docs/credits.md. The
// `check:` or `activity:` block is always the LAST key on its slide.
import { DIAGRAMS } from './diagrams.js';
import { ScaleChallengeWidget, CellExplorerWidget } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U01_1/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const GREEN = '#4a8b23';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Microscope',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 1 · 1.1',
    eyebrowVn: 'Chương 1 · 1.1',
    eyebrowFr: 'Unité 1 · 1.1',
    title: 'Cells: The Building Blocks of Life',
    titleVn: 'Tế bào: Đơn vị cơ bản của sự sống',
    titleFr: 'Cellules : les briques du vivant',
    objective: 'Define a cell and its organelles, compare animal and plant cells, and explain how a microscope lets us see them.',
    objectiveVn: 'Định nghĩa tế bào và các bào quan, so sánh tế bào động vật với tế bào thực vật, và giải thích kính hiển vi giúp ta nhìn thấy chúng như thế nào.',
    objectiveFr: 'Définir une cellule et ses organites, comparer les cellules animales et végétales, et expliquer comment un microscope nous permet de les voir.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'You will **guess**, **tap** and **sort** your way through it. Six things are scored — the slider on the next slide is the first.',
      textVn: 'Em sẽ **đoán**, **chạm** và **sắp xếp** trong suốt bài học. Sáu mục được tính điểm — thanh trượt ở slide sau là mục đầu tiên.',
      textFr: 'Tu vas **deviner**, **toucher** et **trier** tout au long de la leçon. Six éléments sont notés — le curseur de la diapo suivante est le premier.',
    },
  },

  // 2 ─ The soda can challenge: ESTIMATE ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'The soda can challenge',
    eyebrowVn: 'Thử thách lon nước ngọt',
    eyebrowFr: 'Le défi de la canette',
    title: 'How Tall Would Mr Bowen Be?',
    titleVn: 'Thầy Bowen sẽ cao bao nhiêu?',
    titleFr: 'Quelle serait la taille de M. Bowen ?',
    label: 'Imagine',
    labelVn: 'Hãy tưởng tượng',
    labelFr: 'Imagine',
    labelIcon: 'Sparkles',
    text: 'One **average cell** in Mr Bowen’s body is magnified until it is the size of a **soda can**.',
    textVn: 'Một **tế bào trung bình** trong cơ thể thầy Bowen được phóng to đến khi bằng một **lon nước ngọt**.',
    textFr: 'Une **cellule moyenne** du corps de M. Bowen est agrandie jusqu’à la taille d’une **canette de soda**.',
    sub: 'Mr Bowen is 178 cm tall. Magnified the same amount, how tall is he now? A building? A mountain? Slide to your guess.',
    subVn: 'Thầy Bowen cao 178 cm. Phóng to cùng tỉ lệ, thầy cao bao nhiêu? Một toà nhà? Một ngọn núi? Kéo thanh trượt đến dự đoán của em.',
    subFr: 'M. Bowen mesure 178 cm. Agrandi autant, quelle serait sa taille ? Un immeuble ? Une montagne ? Fais glisser le curseur sur ta réponse.',
    activity: {
      id: 'a1', type: 'estimate',
      prompt: 'How tall would Mr Bowen be, in kilometres?',
      promptVn: 'Thầy Bowen sẽ cao bao nhiêu ki-lô-mét?',
      promptFr: 'Quelle serait la taille de M. Bowen, en kilomètres ?',
      min: 0, max: 40, step: 0.5, unit: 'km', answer: 10.5, tolerance: 0.3,
      explain: 'About **10.7 km** — taller than Everest. A soda can is about 6000 times bigger than a cell, so he is 6000 times taller too. The next slide works it out.',
      explainVn: 'Khoảng **10,7 km** — cao hơn cả Everest. Một lon nước ngọt lớn hơn tế bào khoảng 6000 lần, nên thầy cũng cao hơn 6000 lần. Slide sau sẽ tính ra.',
      explainFr: 'Environ **10.7 km** — plus grand que l’Everest. Une canette est environ 6000 fois plus grande qu’une cellule, donc il serait aussi 6000 fois plus grand. La diapo suivante fait le calcul.',
    },
  },

  // 3 ─ Working it out (widget) ────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'The working',
    eyebrowVn: 'Cách tính',
    eyebrowFr: 'Le calcul',
    title: 'Working It Out',
    titleVn: 'Cùng tính toán',
    titleFr: 'Faisons le calcul',
    ratio: 45,
    content:
      'Press through the steps on the right, one at a time.\n\n' +
      '> **1.** A typical human cell is **0.02 mm** across.\n' +
      '> **2.** A soda can is about **120 mm** tall.\n' +
      '> **3.** The **scale factor** is how many times bigger: $120 ÷ 0.02$.',
    contentVn:
      'Bấm từng bước ở bên phải.\n\n' +
      '> **1.** Một tế bào người thường rộng **0,02 mm**.\n' +
      '> **2.** Một lon nước ngọt cao khoảng **120 mm**.\n' +
      '> **3.** **Hệ số phóng đại** là lớn hơn bao nhiêu lần: $120 ÷ 0,02$.',
    contentFr: 'Avance dans les étapes à droite, une à la fois.\n\n> **1.** Une cellule humaine typique mesure **0.02 mm** de large.\n> **2.** Une canette mesure environ **120 mm** de haut.\n> **3.** Le **facteur d’agrandissement** (scale factor), c’est combien de fois plus grand : $120 ÷ 0.02$.',
    widget: ScaleChallengeWidget,
  },

  // 4 ─ Taller than Everest ────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Sparkles',
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    title: 'Taller Than Everest',
    titleVn: 'Cao hơn cả Everest',
    titleFr: 'Plus grand que l’Everest',
    image: img('everest.jpg'),
    caption: 'Magnified 6000×, Mr Bowen would be **10.68 km** tall. Everest is **8.85 km**. He would stand almost 2 km above the summit — and that is how much bigger a soda can is than one of your cells. How close was your guess?',
    captionVn: 'Phóng đại 6000 lần, thầy Bowen sẽ cao **10,68 km**. Everest cao **8,85 km**. Thầy sẽ đứng cao hơn đỉnh núi gần 2 km — và đó chính là mức chênh lệch giữa một lon nước ngọt và một tế bào của em. Em đoán gần đến đâu?',
    captionFr: 'Agrandi 6000×, M. Bowen mesurerait **10.68 km**. L’Everest mesure **8.85 km**. Il dépasserait le sommet de presque 2 km — voilà combien une canette est plus grande qu’une de tes cellules. Ta réponse était-elle proche ?',
  },

  // 5 ─ How small is small ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Getting a feel for it',
    eyebrowVn: 'Cảm nhận kích thước',
    eyebrowFr: 'Pour se faire une idée',
    title: 'How Small Is Small?',
    titleVn: 'Nhỏ đến mức nào?',
    titleFr: 'Petit, c’est petit comment ?',
    inlineSvg: DIAGRAMS.SCALE_LADDER,
    caption: 'Everything to the right of the hair needs a microscope. A cell is about **3 times thinner than a human hair**.',
    captionVn: 'Mọi thứ bên phải sợi tóc đều cần kính hiển vi. Một tế bào **mỏng hơn sợi tóc khoảng 3 lần**.',
    captionFr: 'Tout ce qui est à droite du cheveu demande un microscope. Une cellule est environ **3 fois plus fine qu’un cheveu**.',
  },

  // 6 ─ Defining the cell + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    title: 'Defining the Cell',
    titleVn: 'Định nghĩa Tế bào',
    titleFr: 'Définir la cellule',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.TINY_ROOM,
    content: 'All living organisms — every plant, every animal, you — are built out of the same kind of tiny unit.',
    contentVn: 'Mọi sinh vật sống — mọi loài cây, mọi loài vật, và cả em — đều được tạo nên từ cùng một loại đơn vị tí hon.',
    contentFr: 'Tous les êtres vivants — plantes, animaux, toi — sont faits du même genre de minuscule unité.',
    notes: [
      {
        tone: 'write',
        text: '**Cell:** the smallest basic unit of all living organisms.',
        textVn: '**Tế bào (cell):** đơn vị cơ bản nhỏ nhất của mọi sinh vật sống.',
        textFr: '**Cellule (cell) :** la plus petite unité de base de tous les êtres vivants.',
      },
    ],
    reveal: {
      label: 'Every class is an English class — where does "cell" come from?',
      labelVn: 'Mỗi tiết học đều là tiết tiếng Anh — từ "cell" đến từ đâu?',
      labelFr: 'Chaque cours est un cours d’anglais — d’où vient le mot « cell » ?',
      prompt: '**Hint:** you already know this word. What are **prison cells**? What makes a prison cell a "cell"?',
      promptVn: '**Gợi ý:** em đã biết từ này rồi. **Prison cell** (phòng giam) là gì? Điều gì khiến một phòng giam được gọi là "cell"?',
      promptFr: '**Indice :** tu connais déjà ce mot. Que sont les **prison cells** (cellules de prison) ? Pourquoi une cellule de prison est-elle une « cell » ?',
      answer: 'From the Latin word **cella**, meaning a "**small room**". A prison cell is a small bare room — and so was a monk’s cell. Robert Hooke looked at cork through an early microscope, saw rows of little empty boxes, and used the same word.',
      answerVn: 'Từ tiếng Latin **cella**, nghĩa là "**căn phòng nhỏ**". Phòng giam là một căn phòng nhỏ trống trải — phòng của tu sĩ cũng vậy. Robert Hooke quan sát nút bần qua kính hiển vi thời đầu, thấy những dãy hộp nhỏ trống rỗng, và dùng đúng từ đó.',
      answerFr: 'Du latin **cella**, « **petite pièce** ». Une cellule de prison est une petite pièce vide — comme celle d’un moine. Robert Hooke a vu, dans un des premiers microscopes, du liège fait de petites cases vides, et a pris le même mot.',
    },
    check: {
      id: 'c2',
      q: 'What is a **cell**?',
      qVn: '**Tế bào** là gì?',
      qFr: 'Qu’est-ce qu’une **cellule** ?',
      options: [
        { val: 'A', text: 'The smallest basic unit of all living organisms', textVn: 'Đơn vị cơ bản nhỏ nhất của mọi sinh vật sống', textFr: 'La plus petite unité de base de tous les êtres vivants' },
        { val: 'B', text: 'A tiny structure inside an organ', textVn: 'Một cấu trúc nhỏ bên trong một cơ quan', textFr: 'Une minuscule structure dans un organe' },
        { val: 'C', text: 'A small room in a prison', textVn: 'Một căn phòng nhỏ trong nhà tù', textFr: 'Une petite pièce dans une prison' },
      ],
      correct: 'A',
      expEn: 'A cell is the smallest basic unit of **all living organisms** — plants, animals, you. The prison cell is where the **word** came from, not what a cell is; and a structure inside a cell is an organelle.',
      expVn: 'Tế bào là đơn vị cơ bản nhỏ nhất của **mọi sinh vật sống** — cây, động vật, em. Phòng giam là nơi **từ này** bắt nguồn, không phải định nghĩa tế bào; còn cấu trúc bên trong tế bào là bào quan.',
      expFr: 'Une cellule est la plus petite unité de base de **tous les êtres vivants** — plantes, animaux, toi. La cellule de prison, c’est l’origine du **mot**, pas ce qu’est une cellule ; et une structure dans une cellule est un organite.',
    },
  },

  // 7 ─ Same word, two places ──────────────────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Boxes',
    title: 'Same Word, Two Places',
    titleVn: 'Cùng một từ, hai nơi',
    titleFr: 'Un mot, deux endroits',
    columns: [
      {
        heading: 'A prison cell', headingVn: 'Phòng giam', headingFr: 'Une cellule de prison',
        accent: '#5c6570',
        icon: 'Home',
        image: img('prison-cell.jpg'),
        caption: 'A small, bare room. This is the meaning you already knew.',
        captionVn: 'Một căn phòng nhỏ, trống trải. Đây là nghĩa em đã biết.',
        captionFr: 'Une petite pièce vide. C’est le sens que tu connaissais déjà.',
      },
      {
        heading: 'Hooke’s cork, 1665', headingVn: 'Nút bần của Hooke, 1665', headingFr: 'Le liège de Hooke, 1665',
        accent: PURPLE,
        icon: 'Microscope',
        image: img('hooke-cork.jpg'),
        caption: 'Robert Hooke’s own drawing of cork under his microscope — rows of little rooms. He named them **cells**, and the name stuck for 360 years.',
        captionVn: 'Bản vẽ của chính Robert Hooke về nút bần dưới kính hiển vi — những dãy phòng nhỏ. Ông gọi chúng là **cells**, và cái tên ấy tồn tại suốt 360 năm.',
        captionFr: 'Le dessin de Robert Hooke lui-même : du liège sous son microscope — des rangées de petites pièces. Il les a appelées **cells**, et le nom est resté depuis 360 ans.',
      },
    ],
  },

  // 8 ─ Inside the tiny room (widget) ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    title: 'Inside the Tiny Room',
    titleVn: 'Bên trong căn phòng nhỏ',
    titleFr: 'Dans la petite pièce',
    ratio: 45,
    content:
      'A classroom has furniture. A human body has organs. In the same way, a cell has tiny structures inside it, and each one has a job.\n\n' +
      'Tap each part of the cell to find out what it does — you will need them all on the next slide.',
    contentVn:
      'Lớp học có bàn ghế. Cơ thể người có các cơ quan. Tương tự, tế bào có những cấu trúc nhỏ bên trong, và mỗi cái có một nhiệm vụ.\n\n' +
      'Chạm vào từng bộ phận của tế bào để xem nó làm gì — em sẽ cần tất cả ở slide sau.',
    contentFr: 'Une classe a des meubles. Le corps humain a des organes. De la même façon, une cellule a de minuscules structures à l’intérieur, et chacune a un rôle.\n\nTouche chaque partie de la cellule pour découvrir ce qu’elle fait — tu en auras besoin sur la diapo suivante.',
    notes: [
      {
        tone: 'write',
        text: '**Organelle:** a tiny structure inside a cell that does one specific, important job to keep the cell alive.',
        textVn: '**Bào quan (organelle):** một cấu trúc nhỏ bên trong tế bào, đảm nhận một nhiệm vụ cụ thể, quan trọng để giữ tế bào sống.',
        textFr: '**Organite (organelle) :** une minuscule structure dans une cellule, qui fait un travail précis et important pour garder la cellule en vie.',
      },
    ],
    widget: CellExplorerWidget,
  },

  // 9 ─ Find the control centre: HOTSPOT ───────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Tap the diagram',
    eyebrowVn: 'Chạm vào hình',
    eyebrowFr: 'Touche le schéma',
    title: 'Find the Boss',
    titleVn: 'Tìm ông chủ',
    titleFr: 'Trouve le chef',
    label: 'Locate',
    labelVn: 'Xác định vị trí',
    labelFr: 'Localise',
    labelIcon: 'Target',
    text: 'One organelle **manages everything** the cell does.',
    textVn: 'Một bào quan **quản lý mọi hoạt động** của tế bào.',
    textFr: 'Un organite **dirige tout** ce que fait la cellule.',
    sub: 'Tap it on the animal cell below. You get two tries.',
    subVn: 'Chạm vào nó trên tế bào động vật bên dưới. Em có hai lần thử.',
    subFr: 'Touche-le sur la cellule animale ci-dessous. Tu as deux essais.',
    activity: {
      id: 'a2', type: 'hotspot',
      prompt: 'Tap the **nucleus** — the control centre of the cell.',
      promptVn: 'Chạm vào **nhân** — trung tâm điều khiển của tế bào.',
      promptFr: 'Touche le **noyau** — le centre de contrôle de la cellule.',
      svg: DIAGRAMS.ANIMAL_CELL, viewBox: '0 0 760 430',
      targets: [
        { id: 'nucleus', x: 405, y: 188, r: 55, name: 'the nucleus', nameVn: 'nhân', nameFr: 'le noyau' },
        { id: 'mito', x: 272, y: 300, r: 30, name: 'a mitochondrion', nameVn: 'một ti thể', nameFr: 'une mitochondrie' },
        { id: 'mito2', x: 500, y: 130, r: 30, name: 'a mitochondrion', nameVn: 'một ti thể', nameFr: 'une mitochondrie' },
        { id: 'cyto', x: 330, y: 250, r: 40, name: 'the cytoplasm', nameVn: 'tế bào chất', nameFr: 'le cytoplasme' },
        { id: 'membrane', x: 210, y: 150, r: 28, name: 'the cell membrane', nameVn: 'màng tế bào', nameFr: 'la membrane cellulaire' },
      ],
      correct: 'nucleus',
      explain: 'The **nucleus** is the big purple sphere near the middle: it is the control centre, the "boss" of the cell. The small sausages are mitochondria; the jelly around them is cytoplasm.',
      explainVn: '**Nhân** là khối cầu tím lớn gần giữa: đó là trung tâm điều khiển, "ông chủ" của tế bào. Những hạt hình xúc xích nhỏ là ti thể; chất thạch quanh chúng là tế bào chất.',
      explainFr: 'Le **noyau** est la grosse sphère violette près du centre : c’est le centre de contrôle, le « chef » de la cellule. Les petites saucisses sont des mitochondries ; la gelée autour d’elles est le cytoplasme.',
    },
  },

  // 10 ─ Every cell has these four + CHECK ─────────────────────────────────
  {
    layout: 'gallery',
    accent: TEAL,
    icon: 'Layers',
    tone: 'write',
    columns: 4,
    eyebrow: 'The standard features',
    eyebrowVn: 'Những bộ phận tiêu chuẩn',
    eyebrowFr: 'Les parties de base',
    title: 'Every Cell Has These Four',
    titleVn: 'Mọi tế bào đều có bốn bộ phận này',
    titleFr: 'Toutes les cellules ont ces quatre parties',
    content: 'Animal cells and plant cells both have all four. The highlighted part shows you where it sits.',
    contentVn: 'Cả tế bào động vật và thực vật đều có đủ bốn bộ phận. Phần được tô đậm cho em thấy vị trí của nó.',
    contentFr: 'Les cellules animales et végétales ont toutes les quatre. La partie en couleur montre où elle se trouve.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_MEMBRANE,
        term: 'Cell membrane', termVn: 'Màng tế bào', termFr: 'Membrane cellulaire',
        text: 'A very thin, flexible layer that **controls what goes in and out** of the cell.',
        textVn: 'Lớp rất mỏng và linh hoạt, **kiểm soát những gì ra vào** tế bào.',
        textFr: 'Une couche très fine et souple qui **contrôle ce qui entre et sort** de la cellule.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CYTOPLASM,
        term: 'Cytoplasm', termVn: 'Tế bào chất', termFr: 'Cytoplasme',
        text: 'A clear, jelly-like substance where the cell’s **chemical reactions** happen.',
        textVn: 'Chất trong suốt, dạng thạch, nơi diễn ra các **phản ứng hoá học** của tế bào.',
        textFr: 'Une substance claire, comme de la gelée, où se font les **réactions chimiques** de la cellule.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_NUCLEUS,
        term: 'Nucleus', termVn: 'Nhân', termFr: 'Noyau',
        text: 'The **control centre** — the "boss" that manages everything the cell does.',
        textVn: '**Trung tâm điều khiển** — "ông chủ" quản lý mọi hoạt động của tế bào.',
        textFr: 'Le **centre de contrôle** — le « chef » qui dirige tout ce que fait la cellule.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_MITOCHONDRIA,
        term: 'Mitochondria', termVn: 'Ti thể', termFr: 'Mitochondries',
        tag: 'plural', tagVn: 'số nhiều', tagFr: 'pluriel',
        text: 'Where **energy is released from food**. One of them is a mitochondrion.',
        textVn: 'Nơi **năng lượng được giải phóng từ thức ăn**. Số ít là "mitochondrion".',
        textFr: 'Là où **l’énergie est libérée à partir de la nourriture**. Au singulier : une mitochondrie (mitochondrion).',
      },
    ],
    check: {
      id: 'c3',
      q: 'A cell needs energy to move and grow. Which organelle **releases energy from food**?',
      qVn: 'Tế bào cần năng lượng để chuyển động và lớn lên. Bào quan nào **giải phóng năng lượng từ thức ăn**?',
      qFr: 'Une cellule a besoin d’énergie pour bouger et grandir. Quel organite **libère l’énergie de la nourriture** ?',
      options: [
        { val: 'A', text: 'The cell membrane', textVn: 'Màng tế bào', textFr: 'La membrane cellulaire' },
        { val: 'B', text: 'The mitochondria', textVn: 'Ti thể', textFr: 'Les mitochondries' },
        { val: 'C', text: 'The nucleus', textVn: 'Nhân', textFr: 'Le noyau' },
      ],
      correct: 'B',
      expEn: 'The **mitochondria** are where energy is released from food. The nucleus is the boss and the membrane is the gatekeeper — neither makes energy.',
      expVn: '**Ti thể** là nơi năng lượng được giải phóng từ thức ăn. Nhân là ông chủ và màng là người gác cổng — cả hai đều không tạo năng lượng.',
      expFr: 'Les **mitochondries** sont l’endroit où l’énergie est libérée à partir de la nourriture. Le noyau est le chef et la membrane est le gardien — aucun des deux ne produit d’énergie.',
    },
  },

  // 11 ─ What holds a plant up ─────────────────────────────────────────────
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Leaf',
    tone: 'plant',
    columns: 2,
    eyebrow: 'Plant cell exclusives · 1 of 2',
    eyebrowVn: 'Đặc quyền của tế bào thực vật · 1/2',
    eyebrowFr: 'Seulement chez les plantes · 1 sur 2',
    title: 'What Holds a Plant Up',
    titleVn: 'Điều gì giữ cho cây đứng vững',
    titleFr: 'Ce qui tient une plante debout',
    content: 'A plant cell has **everything** an animal cell has, **plus** some extras. An animal has a skeleton to hold it up — a plant does not, so every single cell needs a stiff box around it.',
    contentVn: 'Tế bào thực vật có **mọi thứ** mà tế bào động vật có, **cộng thêm** vài phần nữa. Động vật có bộ xương để nâng đỡ — cây thì không, nên mỗi tế bào cần một chiếc hộp cứng bao quanh.',
    contentFr: 'Une cellule végétale a **tout** ce qu’a une cellule animale, **plus** quelques extras. Un animal a un squelette pour le tenir — une plante non, alors chaque cellule a besoin d’une boîte rigide autour d’elle.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_WALL,
        term: 'Cell wall', termVn: 'Thành tế bào', termFr: 'Paroi cellulaire',
        text: 'A strong, stiff outer layer that **holds the plant cell in shape**.',
        textVn: 'Lớp ngoài chắc và cứng, **giữ hình dạng cho tế bào thực vật**.',
        textFr: 'Une couche externe solide et rigide qui **garde la forme de la cellule végétale**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CELLULOSE,
        term: 'Cellulose', termVn: 'Xenlulozơ', termFr: 'Cellulose',
        text: 'The tough, fibrous substance that the **cell wall is made of**.',
        textVn: 'Chất dai, dạng sợi, **cấu tạo nên thành tế bào**.',
        textFr: 'La substance dure et fibreuse dont est **faite la paroi cellulaire**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_VACUOLE,
        term: 'Sap vacuole', termVn: 'Không bào', termFr: 'Vacuole',
        text: 'A large space of cell sap — sugars and water — that **keeps the cell firm**, like air in a tyre.',
        textVn: 'Khoảng lớn chứa dịch tế bào — đường và nước — **giúp tế bào căng cứng**, như hơi trong lốp xe.',
        textFr: 'Un grand espace plein de suc cellulaire — sucres et eau — qui **garde la cellule ferme**, comme l’air dans un pneu.',
      },
      {
        image: img('onion-cells.jpg'),
        term: 'The real thing', termVn: 'Vật thật', termFr: 'Pour de vrai',
        text: 'Onion cells down a microscope. Those hard straight edges are **cell walls** — animal cells never look this boxy.',
        textVn: 'Tế bào hành dưới kính hiển vi. Những cạnh thẳng cứng đó là **thành tế bào** — tế bào động vật không bao giờ vuông vắn như vậy.',
        textFr: 'Des cellules d’oignon au microscope. Ces bords droits et durs sont des **parois cellulaires** — les cellules animales ne sont jamais aussi carrées.',
      },
    ],
  },

  // 12 ─ How a plant feeds itself + CHECK ──────────────────────────────────
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Sun',
    tone: 'plant',
    columns: 3,
    eyebrow: 'Plant cell exclusives · 2 of 2',
    eyebrowVn: 'Đặc quyền của tế bào thực vật · 2/2',
    eyebrowFr: 'Seulement chez les plantes · 2 sur 2',
    title: 'How a Plant Feeds Itself',
    titleVn: 'Cây tự nuôi mình bằng cách nào',
    titleFr: 'Comment une plante se nourrit',
    content: 'An animal has to go and find food. A plant makes its own, inside these — which is the whole reason plants are green.',
    contentVn: 'Động vật phải đi tìm thức ăn. Cây tự tạo ra thức ăn bên trong những bộ phận này — và đó chính là lý do cây có màu xanh.',
    contentFr: 'Un animal doit chercher sa nourriture. Une plante fabrique la sienne, à l’intérieur de ces parties — c’est pour ça que les plantes sont vertes.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPLAST,
        term: 'Chloroplast', termVn: 'Lục lạp', termFr: 'Chloroplaste',
        text: 'Green structures where the plant **makes its food using sunlight**.',
        textVn: 'Cấu trúc màu xanh, nơi cây **tạo thức ăn nhờ ánh sáng mặt trời**.',
        textFr: 'Des structures vertes où la plante **fabrique sa nourriture grâce à la lumière du soleil**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPHYLL,
        term: 'Chlorophyll', termVn: 'Diệp lục', termFr: 'Chlorophylle',
        text: 'The **green substance inside chloroplasts** that captures the sunlight.',
        textVn: '**Chất màu xanh bên trong lục lạp**, hấp thụ ánh sáng mặt trời.',
        textFr: 'La **substance verte dans les chloroplastes**, qui capte la lumière du soleil.',
      },
      {
        image: img('chloroplasts.jpg'),
        term: 'The real thing', termVn: 'Vật thật', termFr: 'Pour de vrai',
        text: 'Chloroplasts inside a pondweed leaf. Every green dot is one chloroplast, packed with chlorophyll.',
        textVn: 'Lục lạp bên trong lá rong đuôi chó. Mỗi chấm xanh là một lục lạp, chứa đầy diệp lục.',
        textFr: 'Des chloroplastes dans une feuille de plante d’étang. Chaque point vert est un chloroplaste, plein de chlorophylle.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Why are chloroplasts green?',
      qVn: 'Vì sao lục lạp có màu xanh?',
      qFr: 'Pourquoi les chloroplastes sont-ils verts ?',
      options: [
        { val: 'A', text: 'They are made of cellulose', textVn: 'Chúng được làm từ xenlulozơ', textFr: 'Ils sont faits de cellulose' },
        { val: 'B', text: 'They are full of cell sap', textVn: 'Chúng chứa đầy dịch tế bào', textFr: 'Ils sont pleins de suc cellulaire' },
        { val: 'C', text: 'They are full of chlorophyll', textVn: 'Chúng chứa đầy diệp lục', textFr: 'Ils sont pleins de chlorophylle' },
      ],
      correct: 'C',
      expEn: '**Chlorophyll** is the green substance inside chloroplasts; it captures sunlight so the plant can make food. Cellulose is what the cell **wall** is made of, and sap fills the **vacuole**.',
      expVn: '**Diệp lục** là chất màu xanh bên trong lục lạp; nó hấp thụ ánh sáng mặt trời để cây tạo thức ăn. Xenlulozơ cấu tạo nên **thành** tế bào, còn dịch tế bào nằm trong **không bào**.',
      expFr: 'La **chlorophylle** est la substance verte dans les chloroplastes ; elle capte la lumière du soleil pour que la plante puisse fabriquer sa nourriture. La cellulose est ce dont est faite la **paroi**, et le suc cellulaire remplit la **vacuole**.',
    },
  },

  // 13 ─ Side by side: SORT ────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Scale',
    title: 'Side by Side',
    titleVn: 'So sánh trực tiếp',
    titleFr: 'Côte à côte',
    columns: [
      {
        heading: 'Animal cell', headingVn: 'Tế bào động vật', headingFr: 'Cellule animale',
        accent: '#c2185b',
        icon: 'Users',
        inlineSvg: DIAGRAMS.ANIMAL_CELL,
        caption: 'Round and soft. Membrane, cytoplasm, nucleus, mitochondria — and nothing else.',
        captionVn: 'Tròn và mềm. Màng, tế bào chất, nhân, ti thể — và không có gì thêm.',
        captionFr: 'Ronde et molle. Membrane, cytoplasme, noyau, mitochondries — et rien d’autre.',
      },
      {
        heading: 'Plant cell', headingVn: 'Tế bào thực vật', headingFr: 'Cellule végétale',
        accent: GREEN,
        icon: 'Leaf',
        inlineSvg: DIAGRAMS.PLANT_CELL,
        caption: 'Boxy and stiff. The same four parts, plus a wall, chloroplasts and a big sap vacuole.',
        captionVn: 'Vuông vắn và cứng. Vẫn bốn bộ phận đó, cộng thêm thành tế bào, lục lạp và không bào lớn.',
        captionFr: 'Carrée et rigide. Les mêmes quatre parties, plus une paroi, des chloroplastes et une grande vacuole.',
      },
    ],
    activity: {
      id: 'a3', type: 'sort',
      prompt: 'Sort the seven parts: which does **every** cell have, and which are **plant cells only**?',
      promptVn: 'Sắp xếp bảy bộ phận: cái nào **mọi** tế bào đều có, cái nào **chỉ tế bào thực vật** mới có?',
      promptFr: 'Trie les sept parties : lesquelles sont dans **toutes** les cellules, et lesquelles sont **seulement dans les cellules végétales** ?',
      bins: [
        { id: 'all', name: 'Every cell', nameVn: 'Mọi tế bào', nameFr: 'Toutes les cellules' },
        { id: 'plant', name: 'Plant cells only', nameVn: 'Chỉ tế bào thực vật', nameFr: 'Cellules végétales seulement' },
      ],
      cards: [
        { id: 'membrane', name: 'Cell membrane', nameVn: 'Màng tế bào', nameFr: 'Membrane cellulaire', bin: 'all' },
        { id: 'wall', name: 'Cell wall', nameVn: 'Thành tế bào', nameFr: 'Paroi cellulaire', bin: 'plant' },
        { id: 'cyto', name: 'Cytoplasm', nameVn: 'Tế bào chất', nameFr: 'Cytoplasme', bin: 'all' },
        { id: 'chloro', name: 'Chloroplasts', nameVn: 'Lục lạp', nameFr: 'Chloroplastes', bin: 'plant' },
        { id: 'nucleus', name: 'Nucleus', nameVn: 'Nhân', nameFr: 'Noyau', bin: 'all' },
        { id: 'vacuole', name: 'Sap vacuole', nameVn: 'Không bào', nameFr: 'Vacuole', bin: 'plant' },
        { id: 'mito', name: 'Mitochondria', nameVn: 'Ti thể', nameFr: 'Mitochondries', bin: 'all' },
      ],
      explain: 'Membrane, cytoplasm, nucleus and mitochondria are in **every** cell. The stiff wall, the green chloroplasts and the big sap vacuole are the plant-only extras — a plant has no skeleton and cannot go and find food.',
      explainVn: 'Màng, tế bào chất, nhân và ti thể có trong **mọi** tế bào. Thành cứng, lục lạp xanh và không bào lớn là phần chỉ có ở thực vật — cây không có bộ xương và không thể đi tìm thức ăn.',
      explainFr: 'La membrane, le cytoplasme, le noyau et les mitochondries sont dans **toutes** les cellules. La paroi rigide, les chloroplastes verts et la grande vacuole sont les extras propres aux plantes — une plante n’a pas de squelette et ne peut pas aller chercher sa nourriture.',
    },
  },

  // 14 ─ The same two cells, for real ──────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Not drawings — photographs',
    eyebrowVn: 'Không phải hình vẽ — ảnh chụp',
    eyebrowFr: 'Pas des dessins — des photos',
    title: 'The Same Two Cells, For Real',
    titleVn: 'Vẫn hai loại tế bào đó, ngoài đời thật',
    titleFr: 'Les deux mêmes cellules, pour de vrai',
    columns: [
      {
        heading: 'A human cheek cell', headingVn: 'Một tế bào má người', headingFr: 'Une cellule de joue humaine',
        accent: '#c2185b',
        icon: 'Users',
        image: img('cheek-cells.jpg'),
        caption: 'Scraped from the inside of someone’s cheek, then stained. Soft and shapeless, with no straight edges — the small dark dot near the middle is its **nucleus**.',
        captionVn: 'Lấy từ mặt trong má của một người rồi nhuộm màu. Mềm và không có hình dạng cố định, không có cạnh thẳng — chấm sẫm nhỏ ở giữa là **nhân** của nó.',
        captionFr: 'Prélevée à l’intérieur de la joue de quelqu’un, puis colorée. Molle et sans forme, sans bords droits — le petit point foncé au milieu est son **noyau**.',
      },
      {
        heading: 'Onion cells', headingVn: 'Tế bào hành', headingFr: 'Des cellules d’oignon',
        accent: GREEN,
        icon: 'Leaf',
        image: img('onion-cells.jpg'),
        caption: 'A single layer peeled off an onion. Stacked like bricks, because every one is inside a stiff **cell wall**.',
        captionVn: 'Một lớp mỏng bóc từ củ hành. Xếp chồng như những viên gạch, vì mỗi tế bào nằm trong một **thành tế bào** cứng.',
        captionFr: 'Une seule couche détachée d’un oignon. Rangées comme des briques, car chacune est dans une **paroi cellulaire** rigide.',
      },
    ],
  },

  // 15 ─ How does it magnify? ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'The tool that makes it visible',
    eyebrowVn: 'Công cụ giúp ta nhìn thấy',
    eyebrowFr: 'L’outil qui rend visible',
    title: 'How Does It Magnify?',
    titleVn: 'Nó phóng đại bằng cách nào?',
    titleFr: 'Comment grossit-il ?',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.MICROSCOPE_LIGHT,
    content:
      'Light shines up through the specimen. Two curved pieces of glass — **lenses** — bend that light, and the image reaching your eye is far bigger than the real thing.\n\n' +
      'To see things smaller than a cell — viruses, even single molecules — scientists use an **electron microscope**, which fires a beam of electrons instead of light. An electron is far smaller than a wave of light, so it picks out detail that light slides past.',
    contentVn:
      'Ánh sáng chiếu xuyên qua mẫu vật. Hai miếng thuỷ tinh cong — **thấu kính** — bẻ cong ánh sáng đó, và hình ảnh đến mắt em to hơn vật thật rất nhiều.\n\n' +
      'Để nhìn những thứ nhỏ hơn tế bào — virus, thậm chí từng phân tử — các nhà khoa học dùng **kính hiển vi điện tử**, bắn một chùm electron thay cho ánh sáng. Electron nhỏ hơn sóng ánh sáng rất nhiều, nên nó thấy được những chi tiết mà ánh sáng lướt qua mất.',
    contentFr: 'La lumière traverse l’échantillon de bas en haut. Deux morceaux de verre courbés — les **lentilles** — dévient cette lumière, et l’image qui arrive à ton œil est bien plus grande que l’objet réel.\n\nPour voir des choses plus petites qu’une cellule — des virus, et même des molécules — les scientifiques utilisent un **microscope électronique**, qui envoie un faisceau d’électrons au lieu de lumière. Un électron est bien plus petit qu’une onde de lumière, donc il voit des détails que la lumière ne voit pas.',
    notes: [
      {
        tone: 'write',
        text: '**Microscope:** a scientific tool that uses curved pieces of glass, called lenses, to bend light and **magnify** an image — make it look much bigger than it really is.',
        textVn: '**Kính hiển vi (microscope):** dụng cụ khoa học dùng các miếng thuỷ tinh cong, gọi là thấu kính, để bẻ ánh sáng và **phóng đại** hình ảnh — làm nó trông to hơn thực tế rất nhiều.',
        textFr: '**Microscope :** outil scientifique dont les verres courbés, les lentilles, dévient la lumière pour **grossir** une image — la faire paraître bien plus grande qu’en réalité.',
      },
    ],
  },

  // 16 ─ Models, and the recap ─────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: PURPLE,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    titleFr: 'Sais-tu faire les six ?',
    content:
      'In class you build physical **models** of cells from boxes, bags and beads. A model helps you think — but a model is never the real thing: the real cell is alive, its parts move, and it is thousands of times smaller. Those differences are the model’s **limitations**.\n\n' +
      'Next: the Vocab, then **Label It** — you will put every label on these diagrams yourself.',
    contentVn:
      'Trên lớp, các em làm **mô hình** tế bào từ hộp, túi và hạt. Mô hình giúp em tư duy — nhưng không bao giờ là vật thật: tế bào thật thì sống, các bộ phận chuyển động, và nó nhỏ hơn hàng nghìn lần. Những khác biệt đó là **hạn chế** của mô hình.\n\n' +
      'Tiếp theo: Từ vựng, rồi **Gắn nhãn** — em sẽ tự đặt mọi nhãn lên những hình này.',
    contentFr: 'En classe, tu construis des **modèles** de cellules avec des boîtes, des sacs et des perles. Un modèle t’aide à réfléchir — mais un modèle n’est jamais l’objet réel : la vraie cellule est vivante, ses parties bougent, et elle est des milliers de fois plus petite. Ces différences sont les **limites** (limitations) du modèle.\n\nEnsuite : le vocabulaire, puis **Label It** (légender) — tu placeras toi-même chaque étiquette sur ces schémas.',
    items: [
      { text: 'Say **how small a cell is** — with a number or a comparison.', textVn: 'Nói được **tế bào nhỏ đến mức nào** — bằng con số hoặc phép so sánh.', textFr: 'Dire **à quel point une cellule est petite** — avec un nombre ou une comparaison.' },
      { text: 'Define a **cell** and an **organelle**, and say where the word "cell" came from.', textVn: 'Định nghĩa **tế bào** và **bào quan**, và nói được từ "cell" bắt nguồn từ đâu.', textFr: 'Définir une **cellule** et un **organite**, et dire d’où vient le mot « cell ».' },
      { text: 'Name the **four parts every cell has**, and what each one does.', textVn: 'Kể được **bốn bộ phận mọi tế bào đều có** và nhiệm vụ của từng cái.', textFr: 'Nommer les **quatre parties de toutes les cellules**, et le rôle de chacune.' },
      { text: 'Name the **plant-only parts**, and why a plant needs them.', textVn: 'Kể được **các bộ phận chỉ có ở thực vật**, và vì sao cây cần chúng.', textFr: 'Nommer les **parties propres aux plantes**, et pourquoi la plante en a besoin.' },
      { text: 'Explain what a **microscope** does.', textVn: 'Giải thích **kính hiển vi** làm gì.', textFr: 'Expliquer ce que fait un **microscope**.' },
      { text: 'Explain the **limitations** of a scientific model.', textVn: 'Giải thích **hạn chế** của một mô hình khoa học.', textFr: 'Expliquer les **limites** d’un modèle scientifique.' },
    ],
  },
];
