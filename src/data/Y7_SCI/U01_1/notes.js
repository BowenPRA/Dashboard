// src/data/Y7_SCI/U01_1/notes.js
// 1.1 Cells — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons, content/y7-science/U01_1). 16 layout slides,
// 5 checks.
//
// Reduced from 22 classroom slides: the soda-can question and its working fold
// into one widget slide; the two Learner's Book scans (the labelled plant cell,
// the labelled microscope) are dropped because they are not openly licensed
// and the drawn diagrams carry the same content; the ER "beyond the book"
// slide and the homework go. Every photograph is credited in docs/credits.md.
// The `check:` block is always the LAST key.
import { DIAGRAMS } from './diagrams.js';
import { ScaleChallengeWidget, CellExplorerWidget } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U01_1/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const GREEN = '#4a8b23';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Microscope',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 1 · 1.1',
    eyebrowVn: 'Chương 1 · 1.1',
    title: 'Cells: The Building Blocks of Life',
    titleVn: 'Tế bào: Đơn vị cơ bản của sự sống',
    objective: 'Define a cell and its organelles, compare animal and plant cells, and explain how a microscope lets us see them.',
    objectiveVn: 'Định nghĩa tế bào và các bào quan, so sánh tế bào động vật với tế bào thực vật, và giải thích kính hiển vi giúp ta nhìn thấy chúng như thế nào.',
    card: {
      icon: 'Hourglass',
      badge: 'Starter · 1 minute',
      badgeVn: 'Khởi động · 1 phút',
      text: 'On paper, write a **complete sentence** describing how small a cell is. Use a **measurement** (like mm) or a **real-world comparison**.',
      textVn: 'Viết ra giấy một **câu hoàn chỉnh** mô tả tế bào nhỏ như thế nào. Dùng một **đơn vị đo** (như mm) hoặc một **so sánh thực tế**.',
    },
  },

  // 2 ─ The soda can challenge (widget) ─────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'The soda can challenge',
    eyebrowVn: 'Thử thách lon nước ngọt',
    title: 'Working It Out',
    titleVn: 'Cùng tính toán',
    ratio: 45,
    content:
      'Imagine one **average cell** in Mr Bowen’s body was magnified until it was the size of a **soda can**. How big would Mr Bowen be? He is **178 cm** tall. A building? A mountain? Guess first.\n\n' +
      'Then find the real answer — press through the steps on the right, one at a time.\n\n' +
      '> **1.** A typical human cell is **0.02 mm** across.\n' +
      '> **2.** A soda can is about **120 mm** tall.\n' +
      '> **3.** Work out the **scale factor** — how many times bigger?',
    contentVn:
      'Hãy tưởng tượng một **tế bào trung bình** trong cơ thể thầy Bowen được phóng to đến khi bằng một **lon nước ngọt**. Khi đó thầy Bowen sẽ to cỡ nào? Thầy cao **178 cm**. Một toà nhà? Một ngọn núi? Hãy đoán trước.\n\n' +
      'Rồi tìm đáp án thật — bấm từng bước ở bên phải.\n\n' +
      '> **1.** Một tế bào người thường rộng **0,02 mm**.\n' +
      '> **2.** Một lon nước ngọt cao khoảng **120 mm**.\n' +
      '> **3.** Hãy tính **hệ số phóng đại** — lớn hơn bao nhiêu lần?',
    widget: ScaleChallengeWidget,
  },

  // 3 ─ Taller than Everest + CHECK 1 ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Sparkles',
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    title: 'Taller Than Everest',
    titleVn: 'Cao hơn cả Everest',
    image: img('everest.jpg'),
    caption: 'Magnified 6000×, Mr Bowen would be **10.68 km** tall. Everest is **8.85 km**. He would stand almost 2 km above the summit — and that is how much bigger a soda can is than one of your cells.',
    captionVn: 'Phóng đại 6000 lần, thầy Bowen sẽ cao **10,68 km**. Everest cao **8,85 km**. Thầy sẽ đứng cao hơn đỉnh núi gần 2 km — và đó chính là mức chênh lệch giữa một lon nước ngọt và một tế bào của em.',
    check: {
      id: 'c1',
      q: 'A cell is 0.02 mm across and a soda can is 120 mm tall. How many times bigger is the can?',
      qVn: 'Một tế bào rộng 0,02 mm và một lon nước ngọt cao 120 mm. Cái lon lớn hơn bao nhiêu lần?',
      options: [
        { val: 'A', text: '60 times', textVn: '60 lần' },
        { val: 'B', text: '600 times', textVn: '600 lần' },
        { val: 'C', text: '6000 times', textVn: '6000 lần' },
      ],
      correct: 'C',
      expEn: '$120 ÷ 0.02 = 6000$. Dividing by a number smaller than 1 makes the answer **bigger** than 120, not smaller — that is why 60 and 600 feel right and are wrong.',
      expVn: '$120 ÷ 0,02 = 6000$. Chia cho một số nhỏ hơn 1 làm kết quả **lớn hơn** 120, không phải nhỏ hơn — đó là lý do 60 và 600 nghe hợp lý nhưng sai.',
    },
  },

  // 4 ─ How small is small ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Getting a feel for it',
    eyebrowVn: 'Cảm nhận kích thước',
    title: 'How Small Is Small?',
    titleVn: 'Nhỏ đến mức nào?',
    inlineSvg: DIAGRAMS.SCALE_LADDER,
    caption: 'Everything to the right of the hair needs a microscope. A cell is about **3 times thinner than a human hair**.',
    captionVn: 'Mọi thứ bên phải sợi tóc đều cần kính hiển vi. Một tế bào **mỏng hơn sợi tóc khoảng 3 lần**.',
  },

  // 5 ─ Defining the cell + CHECK 2 ─────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    title: 'Defining the Cell',
    titleVn: 'Định nghĩa Tế bào',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.TINY_ROOM,
    content: 'All living organisms — every plant, every animal, you — are built out of the same kind of tiny unit.',
    contentVn: 'Mọi sinh vật sống — mọi loài cây, mọi loài vật, và cả em — đều được tạo nên từ cùng một loại đơn vị tí hon.',
    notes: [
      {
        tone: 'write',
        text: '**Cell:** the smallest basic unit of all living organisms.',
        textVn: '**Tế bào (cell):** đơn vị cơ bản nhỏ nhất của mọi sinh vật sống.',
      },
    ],
    reveal: {
      label: 'Every class is an English class — where does "cell" come from?',
      labelVn: 'Mỗi tiết học đều là tiết tiếng Anh — từ "cell" đến từ đâu?',
      prompt: '**Hint:** you already know this word. What are **prison cells**? What makes a prison cell a "cell"?',
      promptVn: '**Gợi ý:** em đã biết từ này rồi. **Prison cell** (phòng giam) là gì? Điều gì khiến một phòng giam được gọi là "cell"?',
      answer: 'From the Latin word **cella**, meaning a "**small room**". A prison cell is a small bare room — and so was a monk’s cell. Robert Hooke looked at cork through an early microscope, saw rows of little empty boxes, and used the same word.',
      answerVn: 'Từ tiếng Latin **cella**, nghĩa là "**căn phòng nhỏ**". Phòng giam là một căn phòng nhỏ trống trải — phòng của tu sĩ cũng vậy. Robert Hooke quan sát nút bần qua kính hiển vi thời đầu, thấy những dãy hộp nhỏ trống rỗng, và dùng đúng từ đó.',
    },
    check: {
      id: 'c2',
      q: 'What is a **cell**?',
      qVn: '**Tế bào** là gì?',
      options: [
        { val: 'A', text: 'The smallest basic unit of all living organisms', textVn: 'Đơn vị cơ bản nhỏ nhất của mọi sinh vật sống' },
        { val: 'B', text: 'A tiny structure inside an organ', textVn: 'Một cấu trúc nhỏ bên trong một cơ quan' },
        { val: 'C', text: 'A small room in a prison', textVn: 'Một căn phòng nhỏ trong nhà tù' },
      ],
      correct: 'A',
      expEn: 'A cell is the smallest basic unit of **all living organisms** — plants, animals, you. The prison cell is where the **word** came from, not what a cell is; and a structure inside a cell is an organelle.',
      expVn: 'Tế bào là đơn vị cơ bản nhỏ nhất của **mọi sinh vật sống** — cây, động vật, em. Phòng giam là nơi **từ này** bắt nguồn, không phải định nghĩa tế bào; còn cấu trúc bên trong tế bào là bào quan.',
    },
  },

  // 6 ─ Same word, two places ───────────────────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Boxes',
    title: 'Same Word, Two Places',
    titleVn: 'Cùng một từ, hai nơi',
    columns: [
      {
        heading: 'A prison cell', headingVn: 'Phòng giam',
        accent: '#5c6570',
        icon: 'Home',
        image: img('prison-cell.jpg'),
        caption: 'A small, bare room. This is the meaning you already knew.',
        captionVn: 'Một căn phòng nhỏ, trống trải. Đây là nghĩa em đã biết.',
      },
      {
        heading: 'Hooke’s cork, 1665', headingVn: 'Nút bần của Hooke, 1665',
        accent: PURPLE,
        icon: 'Microscope',
        image: img('hooke-cork.jpg'),
        caption: 'Robert Hooke’s own drawing of cork under his microscope — rows of little rooms. He named them **cells**, and the name stuck for 360 years.',
        captionVn: 'Bản vẽ của chính Robert Hooke về nút bần dưới kính hiển vi — những dãy phòng nhỏ. Ông gọi chúng là **cells**, và cái tên ấy tồn tại suốt 360 năm.',
      },
    ],
  },

  // 7 ─ Inside the tiny room (widget) ───────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    title: 'Inside the Tiny Room',
    titleVn: 'Bên trong căn phòng nhỏ',
    ratio: 45,
    content:
      'A classroom has furniture. A human body has organs. In the same way, a cell has tiny structures inside it, and each one has a job.\n\n' +
      'Tap each part of the cell to find out what it does.',
    contentVn:
      'Lớp học có bàn ghế. Cơ thể người có các cơ quan. Tương tự, tế bào có những cấu trúc nhỏ bên trong, và mỗi cái có một nhiệm vụ.\n\n' +
      'Chạm vào từng bộ phận của tế bào để xem nó làm gì.',
    notes: [
      {
        tone: 'write',
        text: '**Organelle:** a tiny structure inside a cell that does one specific, important job to keep the cell alive.',
        textVn: '**Bào quan (organelle):** một cấu trúc nhỏ bên trong tế bào, đảm nhận một nhiệm vụ cụ thể, quan trọng để giữ tế bào sống.',
      },
    ],
    widget: CellExplorerWidget,
  },

  // 8 ─ Every cell has these four + CHECK 3 ─────────────────────────────────
  {
    layout: 'gallery',
    accent: TEAL,
    icon: 'Layers',
    tone: 'write',
    columns: 4,
    eyebrow: 'The standard features',
    eyebrowVn: 'Những bộ phận tiêu chuẩn',
    title: 'Every Cell Has These Four',
    titleVn: 'Mọi tế bào đều có bốn bộ phận này',
    content: 'Animal cells and plant cells both have all four. The highlighted part shows you where it sits. Copy all four into your notebook.',
    contentVn: 'Cả tế bào động vật và thực vật đều có đủ bốn bộ phận. Phần được tô đậm cho em thấy vị trí của nó. Chép cả bốn vào vở.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_MEMBRANE,
        term: 'Cell membrane', termVn: 'Màng tế bào',
        text: 'A very thin, flexible layer that **controls what goes in and out** of the cell.',
        textVn: 'Lớp rất mỏng và linh hoạt, **kiểm soát những gì ra vào** tế bào.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CYTOPLASM,
        term: 'Cytoplasm', termVn: 'Tế bào chất',
        text: 'A clear, jelly-like substance where the cell’s **chemical reactions** happen.',
        textVn: 'Chất trong suốt, dạng thạch, nơi diễn ra các **phản ứng hoá học** của tế bào.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_NUCLEUS,
        term: 'Nucleus', termVn: 'Nhân',
        text: 'The **control centre** — the "boss" that manages everything the cell does.',
        textVn: '**Trung tâm điều khiển** — "ông chủ" quản lý mọi hoạt động của tế bào.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_MITOCHONDRIA,
        term: 'Mitochondria', termVn: 'Ti thể',
        tag: 'plural', tagVn: 'số nhiều',
        text: 'Where **energy is released from food**. One of them is a mitochondrion.',
        textVn: 'Nơi **năng lượng được giải phóng từ thức ăn**. Số ít là "mitochondrion".',
      },
    ],
    check: {
      id: 'c3',
      q: 'Which organelle is the **control centre** of the cell?',
      qVn: 'Bào quan nào là **trung tâm điều khiển** của tế bào?',
      options: [
        { val: 'A', text: 'The cytoplasm', textVn: 'Tế bào chất' },
        { val: 'B', text: 'The nucleus', textVn: 'Nhân' },
        { val: 'C', text: 'The cell membrane', textVn: 'Màng tế bào' },
      ],
      correct: 'B',
      expEn: 'The **nucleus** is the boss: it manages everything the cell does. The cytoplasm is where reactions happen, and the membrane controls what goes in and out.',
      expVn: '**Nhân** là ông chủ: nó quản lý mọi hoạt động của tế bào. Tế bào chất là nơi diễn ra phản ứng, còn màng kiểm soát những gì ra vào.',
    },
  },

  // 9 ─ What holds a plant up ───────────────────────────────────────────────
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Leaf',
    tone: 'plant',
    columns: 2,
    eyebrow: 'Plant cell exclusives · 1 of 2',
    eyebrowVn: 'Đặc quyền của tế bào thực vật · 1/2',
    title: 'What Holds a Plant Up',
    titleVn: 'Điều gì giữ cho cây đứng vững',
    content: 'A plant cell has **everything** an animal cell has, **plus** some extras. An animal has a skeleton to hold it up — a plant does not, so every single cell needs a stiff box around it.',
    contentVn: 'Tế bào thực vật có **mọi thứ** mà tế bào động vật có, **cộng thêm** vài phần nữa. Động vật có bộ xương để nâng đỡ — cây thì không, nên mỗi tế bào cần một chiếc hộp cứng bao quanh.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_WALL,
        term: 'Cell wall', termVn: 'Thành tế bào',
        text: 'A strong, stiff outer layer that **holds the plant cell in shape**.',
        textVn: 'Lớp ngoài chắc và cứng, **giữ hình dạng cho tế bào thực vật**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CELLULOSE,
        term: 'Cellulose', termVn: 'Xenlulozơ',
        text: 'The tough, fibrous substance that the **cell wall is made of**.',
        textVn: 'Chất dai, dạng sợi, **cấu tạo nên thành tế bào**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_VACUOLE,
        term: 'Sap vacuole', termVn: 'Không bào',
        text: 'A large space of cell sap — sugars and water — that **keeps the cell firm**, like air in a tyre.',
        textVn: 'Khoảng lớn chứa dịch tế bào — đường và nước — **giúp tế bào căng cứng**, như hơi trong lốp xe.',
      },
      {
        image: img('onion-cells.jpg'),
        term: 'The real thing', termVn: 'Vật thật',
        text: 'Onion cells down a microscope. Those hard straight edges are **cell walls** — animal cells never look this boxy.',
        textVn: 'Tế bào hành dưới kính hiển vi. Những cạnh thẳng cứng đó là **thành tế bào** — tế bào động vật không bao giờ vuông vắn như vậy.',
      },
    ],
  },

  // 10 ─ How a plant feeds itself + CHECK 4 ─────────────────────────────────
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Sun',
    tone: 'plant',
    columns: 3,
    eyebrow: 'Plant cell exclusives · 2 of 2',
    eyebrowVn: 'Đặc quyền của tế bào thực vật · 2/2',
    title: 'How a Plant Feeds Itself',
    titleVn: 'Cây tự nuôi mình bằng cách nào',
    content: 'An animal has to go and find food. A plant makes its own, inside these — which is the whole reason plants are green.',
    contentVn: 'Động vật phải đi tìm thức ăn. Cây tự tạo ra thức ăn bên trong những bộ phận này — và đó chính là lý do cây có màu xanh.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPLAST,
        term: 'Chloroplast', termVn: 'Lục lạp',
        text: 'Green structures where the plant **makes its food using sunlight**.',
        textVn: 'Cấu trúc màu xanh, nơi cây **tạo thức ăn nhờ ánh sáng mặt trời**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPHYLL,
        term: 'Chlorophyll', termVn: 'Diệp lục',
        text: 'The **green substance inside chloroplasts** that captures the sunlight.',
        textVn: '**Chất màu xanh bên trong lục lạp**, hấp thụ ánh sáng mặt trời.',
      },
      {
        image: img('chloroplasts.jpg'),
        term: 'The real thing', termVn: 'Vật thật',
        text: 'Chloroplasts inside a pondweed leaf. Every green dot is one chloroplast, packed with chlorophyll.',
        textVn: 'Lục lạp bên trong lá rong đuôi chó. Mỗi chấm xanh là một lục lạp, chứa đầy diệp lục.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Why are chloroplasts green?',
      qVn: 'Vì sao lục lạp có màu xanh?',
      options: [
        { val: 'A', text: 'They are made of cellulose', textVn: 'Chúng được làm từ xenlulozơ' },
        { val: 'B', text: 'They are full of cell sap', textVn: 'Chúng chứa đầy dịch tế bào' },
        { val: 'C', text: 'They are full of chlorophyll', textVn: 'Chúng chứa đầy diệp lục' },
      ],
      correct: 'C',
      expEn: '**Chlorophyll** is the green substance inside chloroplasts; it captures sunlight so the plant can make food. Cellulose is what the cell **wall** is made of, and sap fills the **vacuole**.',
      expVn: '**Diệp lục** là chất màu xanh bên trong lục lạp; nó hấp thụ ánh sáng mặt trời để cây tạo thức ăn. Xenlulozơ cấu tạo nên **thành** tế bào, còn dịch tế bào nằm trong **không bào**.',
    },
  },

  // 11 ─ Side by side + CHECK 5 ─────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Scale',
    title: 'Side by Side',
    titleVn: 'So sánh trực tiếp',
    columns: [
      {
        heading: 'Animal cell', headingVn: 'Tế bào động vật',
        accent: '#c2185b',
        icon: 'Users',
        inlineSvg: DIAGRAMS.ANIMAL_CELL,
        caption: 'Round and soft. Membrane, cytoplasm, nucleus, mitochondria — and nothing else.',
        captionVn: 'Tròn và mềm. Màng, tế bào chất, nhân, ti thể — và không có gì thêm.',
      },
      {
        heading: 'Plant cell', headingVn: 'Tế bào thực vật',
        accent: GREEN,
        icon: 'Leaf',
        inlineSvg: DIAGRAMS.PLANT_CELL,
        drawThis: true,
        caption: 'Boxy and stiff. The same four parts, plus a wall, chloroplasts and a big sap vacuole. **Copy this one into your notebook and label all seven parts.**',
        captionVn: 'Vuông vắn và cứng. Vẫn bốn bộ phận đó, cộng thêm thành tế bào, lục lạp và không bào lớn. **Chép hình này vào vở và chú thích đủ bảy bộ phận.**',
      },
    ],
    check: {
      id: 'c5',
      q: 'Which part is found in a **plant** cell but **not** in an animal cell?',
      qVn: 'Bộ phận nào có ở tế bào **thực vật** nhưng **không** có ở tế bào động vật?',
      options: [
        { val: 'A', text: 'Cell wall', textVn: 'Thành tế bào' },
        { val: 'B', text: 'Nucleus', textVn: 'Nhân' },
        { val: 'C', text: 'Cell membrane', textVn: 'Màng tế bào' },
      ],
      correct: 'A',
      expEn: 'The **cell wall** (with the chloroplasts and the sap vacuole) is a plant-only extra. Every cell — plant or animal — has a nucleus and a cell membrane.',
      expVn: '**Thành tế bào** (cùng lục lạp và không bào) là phần chỉ có ở thực vật. Mọi tế bào — thực vật hay động vật — đều có nhân và màng tế bào.',
    },
  },

  // 12 ─ The same two cells, for real ───────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Not drawings — photographs',
    eyebrowVn: 'Không phải hình vẽ — ảnh chụp',
    title: 'The Same Two Cells, For Real',
    titleVn: 'Vẫn hai loại tế bào đó, ngoài đời thật',
    columns: [
      {
        heading: 'A human cheek cell', headingVn: 'Một tế bào má người',
        accent: '#c2185b',
        icon: 'Users',
        image: img('cheek-cells.jpg'),
        caption: 'Scraped from the inside of someone’s cheek, then stained. Soft and shapeless, with no straight edges — the small dark dot near the middle is its **nucleus**.',
        captionVn: 'Lấy từ mặt trong má của một người rồi nhuộm màu. Mềm và không có hình dạng cố định, không có cạnh thẳng — chấm sẫm nhỏ ở giữa là **nhân** của nó.',
      },
      {
        heading: 'Onion cells', headingVn: 'Tế bào hành',
        accent: GREEN,
        icon: 'Leaf',
        image: img('onion-cells.jpg'),
        caption: 'A single layer peeled off an onion. Stacked like bricks, because every one is inside a stiff **cell wall**.',
        captionVn: 'Một lớp mỏng bóc từ củ hành. Xếp chồng như những viên gạch, vì mỗi tế bào nằm trong một **thành tế bào** cứng.',
      },
    ],
  },

  // 13 ─ How does it magnify? ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'The tool that makes it visible',
    eyebrowVn: 'Công cụ giúp ta nhìn thấy',
    title: 'How Does It Magnify?',
    titleVn: 'Nó phóng đại bằng cách nào?',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.MICROSCOPE_LIGHT,
    content:
      'Light shines up through the specimen. Two curved pieces of glass — **lenses** — bend that light, and the image reaching your eye is far bigger than the real thing.\n\n' +
      'On a real microscope, find: the **eyepiece**, the **coarse and fine focusing knobs**, the **objective lenses**, the **stage** and the **mirror**.',
    contentVn:
      'Ánh sáng chiếu xuyên qua mẫu vật. Hai miếng thuỷ tinh cong — **thấu kính** — bẻ cong ánh sáng đó, và hình ảnh đến mắt em to hơn vật thật rất nhiều.\n\n' +
      'Trên kính hiển vi thật, hãy tìm: **thị kính**, **núm chỉnh thô và chỉnh tinh**, **vật kính**, **bàn kính** và **gương**.',
    notes: [
      {
        tone: 'write',
        text: '**Microscope:** a scientific tool that uses curved pieces of glass, called lenses, to bend light and **magnify** an image — make it look much bigger than it really is.',
        textVn: '**Kính hiển vi (microscope):** dụng cụ khoa học dùng các miếng thuỷ tinh cong, gọi là thấu kính, để bẻ ánh sáng và **phóng đại** hình ảnh — làm nó trông to hơn thực tế rất nhiều.',
      },
    ],
  },

  // 14 ─ Smaller than a cell ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Pushing the limits',
    eyebrowVn: 'Vượt giới hạn',
    title: 'Smaller Than a Cell',
    titleVn: 'Nhỏ hơn cả tế bào',
    ratio: 45,
    side: 'left',
    image: img('electron-microscope.jpg'),
    content:
      'To see things smaller than a cell — **viruses**, or even single **molecules** — scientists use an **Electron Microscope** like this one. It fills a room and costs more than a house.\n\n' +
      'Here is the puzzle. If something is too small for a wave of light to bounce off it, how could this machine possibly see it?',
    contentVn:
      'Để nhìn những thứ nhỏ hơn tế bào — **virus**, hay thậm chí từng **phân tử** — các nhà khoa học dùng **Kính hiển vi điện tử** như chiếc này. Nó chiếm cả một căn phòng và đắt hơn một ngôi nhà.\n\n' +
      'Câu đố là đây. Nếu một vật quá nhỏ để sóng ánh sáng phản xạ lại, thì cỗ máy này nhìn thấy nó bằng cách nào?',
    reveal: {
      label: 'Think first, then reveal',
      labelVn: 'Nghĩ trước, rồi hiện đáp án',
      answer: 'It fires a beam of **electrons** instead of light. An electron is far smaller than a wave of light, so it can pick out detail that light simply slides past.',
      answerVn: 'Nó bắn một chùm **electron** thay cho ánh sáng. Electron nhỏ hơn sóng ánh sáng rất nhiều, nên nó thấy được những chi tiết mà ánh sáng lướt qua mất.',
    },
    caption: 'A modern electron microscope.',
    captionVn: 'Một kính hiển vi điện tử hiện đại.',
  },

  // 15 ─ Models and their limitations ───────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'GraduationCap',
    eyebrow: 'Thinking like a scientist',
    eyebrowVn: 'Tư duy như một nhà khoa học',
    title: 'Models Are Never the Real Thing',
    titleVn: 'Mô hình không bao giờ là vật thật',
    ratio: 45,
    inlineSvg: DIAGRAMS.MODEL_LIMITS,
    content:
      'In class you build physical **models** of these cells out of boxes, bags, beads and modelling clay.\n\n' +
      'A model helps you think — but a model is never the real thing. Keep asking yourself what yours is missing: the real cell is alive, its parts move, and it is thousands of times smaller.',
    contentVn:
      'Trong lớp, các em làm **mô hình** vật lý của tế bào từ hộp, túi, hạt và đất nặn.\n\n' +
      'Mô hình giúp em tư duy — nhưng mô hình không bao giờ là vật thật. Hãy luôn tự hỏi mô hình của mình còn thiếu gì: tế bào thật thì sống, các bộ phận của nó chuyển động, và nó nhỏ hơn hàng nghìn lần.',
    notes: [
      {
        tone: 'write',
        text: '**Limitations:** the weaknesses of a scientific model — the ways it is different from the real object.',
        textVn: '**Hạn chế (limitations):** những điểm yếu của một mô hình khoa học — những chỗ nó khác với vật thật.',
      },
    ],
  },

  // 16 ─ Recap + closer ─────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    content:
      'Read each line and be honest with yourself. If you could not explain one of them to a friend, that is the part to read again.\n\n' +
      '> Your notebook should now have **12 definitions** and **1 labelled drawing** in it. Check. Then do the Vocab, and the Practice.',
    contentVn:
      'Đọc từng dòng và thành thật với chính mình. Nếu có điều nào em chưa giải thích được cho một người bạn, thì hãy đọc lại phần đó.\n\n' +
      '> Trong vở của em bây giờ phải có **12 định nghĩa** và **1 hình vẽ có chú thích**. Hãy kiểm tra. Rồi làm phần Từ vựng và Luyện tập.',
    items: [
      { text: 'Say **how small a cell is** — with a number or a comparison.', textVn: 'Nói được **tế bào nhỏ đến mức nào** — bằng con số hoặc phép so sánh.' },
      { text: 'Define a **cell** and an **organelle**, and say where the word "cell" came from.', textVn: 'Định nghĩa **tế bào** và **bào quan**, và nói được từ "cell" bắt nguồn từ đâu.' },
      { text: 'Name the **four parts every cell has**, and what each one does.', textVn: 'Kể được **bốn bộ phận mọi tế bào đều có** và nhiệm vụ của từng cái.' },
      { text: 'Name the **five plant-only parts**, and why a plant needs them.', textVn: 'Kể được **năm bộ phận chỉ có ở thực vật**, và vì sao cây cần chúng.' },
      { text: 'Explain what a **microscope** does, and name its main parts.', textVn: 'Giải thích **kính hiển vi** làm gì, và kể tên các bộ phận chính.' },
      { text: 'Explain the **limitations** of a scientific model.', textVn: 'Giải thích **hạn chế** của một mô hình khoa học.' },
    ],
  },
];
