// src/data/Y7_SCI/U01_2/notes.js
// 1.2 Animal Cells — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons, content/y7-science/U01_2). 17 layout slides,
// 5 checks.
//
// Reduced from 24 classroom slides: the guess-first question folds into its
// answer; the two Learner's Book scans (the animal-cell drawing, the opening
// artwork) go because they are not openly licensed and ANIMAL_CELL carries
// the drawing; the group build-a-cell activity and the homework go; the
// microscope steps become one seven-step slide. Every photograph is credited
// in docs/credits.md. The `check:` block is always the LAST key.
import { DIAGRAMS } from './diagrams.js';
import { PlantOrAnimalWidget } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U01_2/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';
const CRIMSON = '#c2185b';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: CRIMSON,
    icon: 'Dna',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 1 · 1.2',
    eyebrowVn: 'Chương 1 · 1.2',
    title: 'Animal Cells: What You Are Made Of',
    titleVn: 'Tế bào động vật: Em được tạo nên từ gì',
    objective: 'Name the parts of an animal cell, say how it differs from a plant cell, and learn the method for looking at your own cells.',
    objectiveVn: 'Kể tên các bộ phận của tế bào động vật, nói được nó khác tế bào thực vật thế nào, và học cách quan sát tế bào của chính em.',
    card: {
      icon: 'Hourglass',
      badge: 'Starter · 1 minute',
      badgeVn: 'Khởi động · 1 phút',
      text: 'Several parts of a **plant cell** begin with **c**. On paper, list as many as you can. **Write your answer as a full sentence.**',
      textVn: 'Nhiều bộ phận của **tế bào thực vật** bắt đầu bằng **c**. Hãy viết ra giấy càng nhiều càng tốt. **Viết câu trả lời thành một câu hoàn chỉnh.**',
    },
  },

  // 2 ─ Check your list + CHECK 1 ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Getting started · from the book',
    eyebrowVn: 'Khởi động · trong sách',
    label: 'Check your list',
    labelVn: 'Kiểm tra danh sách',
    labelIcon: 'CheckCircle2',
    text: 'The book asks for **five**. There are **six** — but two of them are not **organelles**.',
    textVn: 'Sách hỏi **năm** từ. Có **sáu** — nhưng hai trong số đó không phải là **bào quan**.',
    sub: '**Organelles:** cell wall, cell membrane, cytoplasm, chloroplast.  **Substances:** cellulose and chlorophyll — the materials those organelles are made of.',
    subVn: '**Bào quan:** thành tế bào, màng tế bào, tế bào chất, lục lạp.  **Chất:** xenlulozơ và diệp lục — vật liệu cấu tạo nên các bào quan đó.',
    check: {
      id: 'c1',
      q: 'Which of these is a **substance**, not an organelle?',
      qVn: 'Cái nào sau đây là một **chất**, không phải bào quan?',
      options: [
        { val: 'A', text: 'Chloroplast', textVn: 'Lục lạp' },
        { val: 'B', text: 'Cellulose', textVn: 'Xenlulozơ' },
        { val: 'C', text: 'Cytoplasm', textVn: 'Tế bào chất' },
      ],
      correct: 'B',
      expEn: '**Cellulose** is the material the cell wall is made of — a substance, like chlorophyll. A chloroplast is a structure with a job (making food), and the cytoplasm is the jelly where reactions happen.',
      expVn: '**Xenlulozơ** là vật liệu cấu tạo nên thành tế bào — một chất, giống như diệp lục. Lục lạp là một cấu trúc có nhiệm vụ (tạo thức ăn), còn tế bào chất là chất thạch nơi diễn ra phản ứng.',
    },
  },

  // 3 ─ How many cells is Mr Bowen? ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Guess first — write a number down before you read on',
    eyebrowVn: 'Đoán trước — viết một con số ra giấy trước khi đọc tiếp',
    title: 'How Many Cells Is Mr Bowen?',
    titleVn: 'Thầy Bowen có bao nhiêu tế bào?',
    label: 'The answer',
    labelVn: 'Đáp án',
    labelIcon: 'Sparkles',
    text: 'About **100 trillion** cells.',
    textVn: 'Khoảng **100 nghìn tỉ** tế bào.',
    sub: '100 000 000 000 000 — in one person. Nobody has ever counted them; scientists estimate.',
    subVn: '100 000 000 000 000 — trong một người. Chưa ai từng đếm hết; các nhà khoa học ước tính.',
    notes: [
      {
        tone: 'plant',
        text: 'How big is a trillion? Counting one number a second, without stopping to sleep, it would take you about **32 000 years** to reach a trillion.',
        textVn: 'Một nghìn tỉ lớn đến mức nào? Đếm mỗi giây một số, không nghỉ để ngủ, em sẽ mất khoảng **32 000 năm** để đếm đến một nghìn tỉ.',
      },
    ],
  },

  // 4 ─ More cells than stars ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Sparkles',
    eyebrow: 'For scale',
    eyebrowVn: 'Để hình dung',
    title: 'More Cells Than Stars',
    titleVn: 'Nhiều tế bào hơn cả số sao',
    image: img('milky-way.jpg'),
    caption: 'Our whole galaxy holds about **400 billion stars**. You are built from about **100 trillion cells** — at least **250 times more**. Every one of them is doing a job right now, while you sit there.',
    captionVn: 'Cả thiên hà của chúng ta có khoảng **400 tỉ ngôi sao**. Còn em được tạo nên từ khoảng **100 nghìn tỉ tế bào** — nhiều gấp ít nhất **250 lần**. Mỗi tế bào đều đang làm việc ngay lúc này, khi em ngồi đây.',
  },

  // 5 ─ Parts of an animal cell + CHECK 2 ───────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Boxes',
    title: 'Parts of an Animal Cell',
    titleVn: 'Các bộ phận của tế bào động vật',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANIMAL_CELL,
    drawThis: true,
    content:
      'All animals are made of cells. **You are an animal**, so your body is made of cells too.\n\n' +
      'An animal cell is **similar** to a plant cell in several ways — and we will come back to that word. **Copy this drawing and label all four parts.**',
    contentVn:
      'Mọi loài vật đều được tạo nên từ tế bào. **Em cũng là một động vật**, nên cơ thể em cũng được tạo nên từ tế bào.\n\n' +
      'Tế bào động vật **tương tự** tế bào thực vật ở nhiều điểm — và chúng ta sẽ quay lại với từ này. **Chép hình này và chú thích đủ bốn bộ phận.**',
    notes: [
      {
        tone: 'write',
        text: '**An animal cell has:** a cell membrane, cytoplasm, mitochondria and a nucleus.',
        textVn: '**Tế bào động vật có:** màng tế bào, tế bào chất, ti thể và nhân.',
      },
    ],
    reveal: {
      label: 'Quick check — what does each one do?',
      labelVn: 'Kiểm tra nhanh — mỗi bộ phận làm nhiệm vụ gì?',
      answer:
        '**Cell membrane:** controls what goes in and out of the cell.\n' +
        '**Cytoplasm:** where the cell’s chemical reactions happen.\n' +
        '**Mitochondria:** where energy is released from food.\n' +
        '**Nucleus:** the control centre that manages everything.',
      answerVn:
        '**Màng tế bào:** kiểm soát những gì ra vào tế bào.\n' +
        '**Tế bào chất:** nơi diễn ra các phản ứng hoá học của tế bào.\n' +
        '**Ti thể:** nơi năng lượng được giải phóng từ thức ăn.\n' +
        '**Nhân:** trung tâm điều khiển mọi hoạt động.',
    },
    check: {
      id: 'c2',
      q: 'Which of these is **not** found in an animal cell?',
      qVn: 'Cái nào sau đây **không** có trong tế bào động vật?',
      options: [
        { val: 'A', text: 'Mitochondria', textVn: 'Ti thể' },
        { val: 'B', text: 'Nucleus', textVn: 'Nhân' },
        { val: 'C', text: 'Chloroplast', textVn: 'Lục lạp' },
      ],
      correct: 'C',
      expEn: 'An animal cell has a membrane, cytoplasm, mitochondria and a nucleus. **Chloroplasts** are plant-only — an animal does not make its own food from sunlight.',
      expVn: 'Tế bào động vật có màng, tế bào chất, ti thể và nhân. **Lục lạp** chỉ có ở thực vật — động vật không tự tạo thức ăn từ ánh sáng mặt trời.',
    },
  },

  // 6 ─ Spot the difference ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'Two minutes — write before you go on',
    eyebrowVn: 'Hai phút — viết ra trước khi tiếp tục',
    title: 'Spot the Difference',
    titleVn: 'Tìm điểm khác nhau',
    inlineSvg: DIAGRAMS.SPOT_THE_DIFFERENCE,
    caption: 'The plant cell has **three things** the animal cell has not got. Find all three and **write them down** before the next slide tells you.',
    captionVn: 'Tế bào thực vật có **ba thứ** mà tế bào động vật không có. Hãy tìm đủ cả ba và **viết ra giấy** trước khi slide sau cho em biết.',
  },

  // 7 ─ Three things an animal cell has not got ─────────────────────────────
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Leaf',
    tone: 'plant',
    columns: 3,
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    title: 'Three Things an Animal Cell Has Not Got',
    titleVn: 'Ba thứ tế bào động vật không có',
    content: 'A plant cell has **everything** an animal cell has, **plus** these three. In each picture the rest of the cell is greyed out, so you can see exactly where the part sits. Copy all three.',
    contentVn: 'Tế bào thực vật có **mọi thứ** tế bào động vật có, **cộng thêm** ba phần này. Trong mỗi hình, phần còn lại của tế bào được làm mờ để em thấy rõ vị trí của bộ phận đó. Chép cả ba.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_WALL,
        term: 'Cell wall', termVn: 'Thành tế bào',
        text: 'A strong, stiff outer layer made of **cellulose**. It holds the plant cell in shape.',
        textVn: 'Lớp ngoài chắc và cứng, làm bằng **xenlulozơ**. Nó giữ hình dạng cho tế bào thực vật.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPLAST,
        term: 'Chloroplasts', termVn: 'Lục lạp',
        text: 'Green structures where the plant **makes its own food** using sunlight.',
        textVn: 'Cấu trúc màu xanh, nơi cây **tự tạo ra thức ăn** nhờ ánh sáng mặt trời.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_VACUOLE,
        term: 'Sap vacuole', termVn: 'Không bào',
        text: 'A large space of cell sap that **keeps the cell firm**, like air inside a tyre.',
        textVn: 'Khoảng lớn chứa dịch tế bào, **giúp tế bào căng cứng**, như hơi trong lốp xe.',
      },
    ],
  },

  // 8 ─ No wall, no fixed shape + CHECK 3 ───────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Droplet',
    title: 'No Wall, No Fixed Shape',
    titleVn: 'Không có thành, không có hình dạng cố định',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.SHAPE_FREEDOM,
    content:
      'A plant stands still. Every one of its cells is locked inside a stiff box, and that is what holds a whole tree up.\n\n' +
      'An animal **moves**. Your cells have to bend, squeeze and change shape all day — a stiff box would stop them.',
    contentVn:
      'Cây đứng yên một chỗ. Mỗi tế bào của nó nằm trong một chiếc hộp cứng, và chính điều đó nâng đỡ cả một cái cây.\n\n' +
      'Động vật thì **di chuyển**. Tế bào của em phải uốn, ép và đổi hình dạng suốt ngày — một chiếc hộp cứng sẽ cản trở điều đó.',
    notes: [
      {
        tone: 'write',
        text: '**An animal cell has no cell wall,** so it has **no fixed shape**. Animal cells look soft and rounded, with no straight edges.',
        textVn: '**Tế bào động vật không có thành tế bào,** nên nó **không có hình dạng cố định**. Tế bào động vật trông mềm và tròn, không có cạnh thẳng.',
      },
    ],
    check: {
      id: 'c3',
      q: 'Why does an animal cell have **no fixed shape**?',
      qVn: 'Vì sao tế bào động vật **không có hình dạng cố định**?',
      options: [
        { val: 'A', text: 'It has no cell wall', textVn: 'Nó không có thành tế bào' },
        { val: 'B', text: 'It has no nucleus', textVn: 'Nó không có nhân' },
        { val: 'C', text: 'It is too small', textVn: 'Nó quá nhỏ' },
      ],
      correct: 'A',
      expEn: 'The stiff **cell wall** is what gives a plant cell its box shape. An animal cell has none, so it stays soft and can change shape. It does have a nucleus, and size has nothing to do with it.',
      expVn: '**Thành tế bào** cứng là thứ tạo cho tế bào thực vật hình hộp. Tế bào động vật không có, nên nó mềm và có thể đổi hình dạng. Nó vẫn có nhân, và kích thước không liên quan.',
    },
  },

  // 9 ─ Not all animal cells look alike ─────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Zap',
    eyebrow: 'Expand your knowledge',
    eyebrowVn: 'Mở rộng kiến thức',
    title: 'Not All Animal Cells Look Alike',
    titleVn: 'Không phải tế bào động vật nào cũng giống nhau',
    ratio: 45,
    image: img('neuron.jpg'),
    content:
      'Because an animal cell is not locked inside a box, it can grow into **whatever shape its job needs**.\n\n' +
      'This is a **nerve cell**. Those long arms carry messages around your body. The longest nerve cell in a person runs from the bottom of the back all the way to the big toe — about **one metre**, and all of it is a single cell.',
    contentVn:
      'Vì tế bào động vật không bị nhốt trong một chiếc hộp, nó có thể phát triển thành **bất kỳ hình dạng nào mà nhiệm vụ của nó cần**.\n\n' +
      'Đây là một **tế bào thần kinh**. Những nhánh dài đó truyền tín hiệu đi khắp cơ thể. Tế bào thần kinh dài nhất trong cơ thể người chạy từ cuối lưng xuống tận ngón chân cái — dài khoảng **một mét**, và tất cả chỉ là **một** tế bào.',
    notes: [
      {
        tone: 'theory',
        text: 'Cells built for one job are called **specialised cells** — that is the next lesson.',
        textVn: 'Những tế bào được xây dựng cho một nhiệm vụ gọi là **tế bào chuyên hoá** — đó là bài học tiếp theo.',
      },
    ],
  },

  // 10 ─ Similar is not the same (English) ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: 'Similar Is Not the Same',
    titleVn: '"Similar" không phải là "the same"',
    content:
      'Your book says: "Animal cells are **similar** to plant cells in several ways."\n\n' +
      'It does not say **the same**. **Similar** means alike in some ways, different in others.',
    contentVn:
      'Sách viết: "Animal cells are **similar** to plant cells in several ways."\n\n' +
      'Sách không viết **the same** (giống hệt). **Similar** là giống một số điểm, khác một số điểm.',
    notes: [
      {
        tone: 'write',
        text:
          '**Sentences for comparing two things:**\n' +
          '**Both** a plant cell **and** an animal cell **have** a nucleus.\n' +
          'A plant cell has a cell wall, **but** an animal cell does not.\n' +
          '**Unlike** a plant cell, an animal cell has no fixed shape.',
        textVn:
          '**Mẫu câu so sánh hai vật:**\n' +
          '**Both** a plant cell **and** an animal cell **have** a nucleus. (Cả… và… đều có…)\n' +
          'A plant cell has a cell wall, **but** an animal cell does not. (…, nhưng… thì không)\n' +
          '**Unlike** a plant cell, an animal cell has no fixed shape. (Khác với…, …)',
      },
    ],
    reveal: {
      label: 'Your turn — finish the sentence on paper, then check',
      labelVn: 'Đến lượt em — hoàn thành câu ra giấy, rồi kiểm tra',
      prompt: '"Both cells have ______ , but only the plant cell has ______ ."',
      promptVn: '"Both cells have ______ , but only the plant cell has ______ ."',
      answer: 'Both cells have **a cell membrane, cytoplasm, mitochondria and a nucleus**, but only the plant cell has **a cell wall, chloroplasts and a sap vacuole**.',
      answerVn: 'Both cells have **a cell membrane, cytoplasm, mitochondria and a nucleus**, but only the plant cell has **a cell wall, chloroplasts and a sap vacuole**. (Cả hai loại tế bào đều có màng tế bào, tế bào chất, ti thể và nhân, nhưng chỉ tế bào thực vật mới có thành tế bào, lục lạp và không bào.)',
    },
  },

  // 11 ─ Plant or animal? (widget) ──────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Learner’s Book, page 15 · Question 1',
    eyebrowVn: 'Sách học sinh, trang 15 · Câu hỏi 1',
    title: 'Plant or Animal?',
    titleVn: 'Thực vật hay động vật?',
    ratio: 40,
    content:
      'Eight real photographs, all taken down a microscope. The **first four** are read for you. The **next four** you decide: plant cell or animal cell — and say **how you know**.\n\n' +
      '> Answer in a full sentence on paper: "Photograph 1 shows plant cells **because** ... "',
    contentVn:
      'Tám tấm ảnh thật, đều chụp qua kính hiển vi. **Bốn ảnh đầu** đã được đọc sẵn. **Bốn ảnh sau** em tự quyết định: tế bào thực vật hay động vật — và nói **vì sao em biết**.\n\n' +
      '> Trả lời bằng câu hoàn chỉnh ra giấy: "Photograph 1 shows plant cells **because** ... "',
    widget: PlantOrAnimalWidget,
  },

  // 12 ─ Looking at your own cells ──────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Beaker',
    eyebrow: 'Think like a scientist',
    eyebrowVn: 'Tư duy như nhà khoa học',
    title: 'Looking at Your Own Cells',
    titleVn: 'Quan sát tế bào của chính em',
    ratio: 55,
    side: 'left',
    image: img('slide-coverslip.jpg'),
    content: 'The book asks you to take cells from **inside your own cheek** and look at them down a microscope. You do this practical in class — here, learn the method so you know every step before you touch the kit.',
    contentVn: 'Sách yêu cầu em lấy tế bào từ **mặt trong má của chính mình** và quan sát qua kính hiển vi. Em làm bài thực hành này trên lớp — ở đây, hãy học cách làm để biết rõ từng bước trước khi chạm vào dụng cụ.',
    notes: [
      {
        tone: 'task',
        badge: 'You Will Need',
        badgeVn: 'Em sẽ cần',
        icon: 'Beaker',
        text: 'microscope · slide · cover slip · cotton bud · methylene blue · dropper pipette · safety glasses',
        textVn: 'kính hiển vi · lam kính · lamen · tăm bông · xanh methylen · ống nhỏ giọt · kính bảo hộ',
      },
      {
        tone: 'homework',
        badge: 'Safety',
        badgeVn: 'An toàn',
        icon: 'ShieldCheck',
        text: '**Safety glasses on** before you start. Use your **own** cotton bud, **once**, then bin it.',
        textVn: '**Đeo kính bảo hộ** trước khi bắt đầu. Dùng tăm bông **của riêng em**, **một lần**, rồi bỏ đi.',
      },
    ],
  },

  // 13 ─ Key word: stain + CHECK 4 ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    title: 'Stain',
    titleVn: 'Stain — thuốc nhuộm',
    content: 'Your cheek cells are almost see-through. Untreated, you would see an empty grey circle and decide there was nothing there. So we add a dye that colours the parts.',
    contentVn: 'Tế bào má của em gần như trong suốt. Không xử lý gì, em chỉ thấy vòng tròn xám trống và tưởng chẳng có gì. Vậy nên ta thêm phẩm màu để tô màu các bộ phận.',
    notes: [
      {
        tone: 'write',
        text: '**Stain:** a coloured dye added to a specimen to make its parts **easier to see**.',
        textVn: '**Thuốc nhuộm (stain):** phẩm màu thêm vào mẫu vật để các bộ phận **dễ nhìn thấy hơn**.',
      },
    ],
    reveal: {
      label: 'English class: what is a stain on your school shirt?',
      labelVn: 'Tiếng Anh: vết "stain" trên áo đồng phục là gì?',
      answer: 'A mark you did **not** want — coffee, ink, mud. In a laboratory it is the exact opposite: a scientist stains something **on purpose**, because the colour is the whole point. Same word, opposite feeling.',
      answerVn: 'Là vết bẩn em **không** hề muốn — cà phê, mực, bùn. Trong phòng thí nghiệm thì ngược lại hoàn toàn: nhà khoa học nhuộm màu **có chủ ý**, vì màu sắc chính là điều họ cần. Cùng một từ, cảm giác trái ngược.',
    },
    check: {
      id: 'c4',
      q: 'Why do scientists add a **stain** to cheek cells?',
      qVn: 'Vì sao các nhà khoa học thêm **thuốc nhuộm** vào tế bào má?',
      options: [
        { val: 'A', text: 'To kill the cells so they stop moving', textVn: 'Để giết tế bào cho chúng ngừng chuyển động' },
        { val: 'B', text: 'To make the parts easier to see', textVn: 'Để các bộ phận dễ nhìn thấy hơn' },
        { val: 'C', text: 'To make the cells bigger', textVn: 'Để tế bào to hơn' },
      ],
      correct: 'B',
      expEn: 'Cheek cells are almost see-through. A stain colours the parts — the nucleus shows up dark blue — so they are **easier to see**. It does not magnify (the microscope does that).',
      expVn: 'Tế bào má gần như trong suốt. Thuốc nhuộm tô màu các bộ phận — nhân hiện lên màu xanh đậm — nên chúng **dễ nhìn thấy hơn**. Nó không phóng đại (kính hiển vi làm việc đó).',
    },
  },

  // 14 ─ Making the slide (steps) ───────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'Steps 1 to 4',
    eyebrowVn: 'Bước 1 đến 4',
    title: 'Making the Slide',
    titleVn: 'Chuẩn bị tiêu bản',
    inlineSvg: DIAGRAMS.SLIDE_PREP,
    steps: [
      { text: 'Very gently rub a cotton bud along the **inside of your cheek**.', textVn: 'Nhẹ nhàng chà tăm bông dọc theo **mặt trong má**.' },
      { text: 'Rub the bud on a clean **microscope slide**. You still will not see anything.', textVn: 'Chà tăm bông lên một **lam kính** sạch. Em vẫn chưa thấy gì cả.' },
      { text: 'Add one drop of **methylene blue** with a dropper pipette.', textVn: 'Nhỏ một giọt **xanh methylen** bằng ống nhỏ giọt.' },
      { text: 'Carefully lower a **cover slip** over the drop.', textVn: 'Cẩn thận hạ **lamen** xuống phủ lên giọt thuốc nhuộm.' },
    ],
  },

  // 15 ─ Using the microscope (steps) ───────────────────────────────────────
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Microscope',
    eyebrow: 'Steps 5 to 10',
    eyebrowVn: 'Bước 5 đến 10',
    title: 'Finding the Cells',
    titleVn: 'Tìm ra tế bào',
    content: 'Step 7 matters more than it looks. Get it wrong and you break the slide.',
    contentVn: 'Bước 7 quan trọng hơn vẻ ngoài của nó. Làm sai là em làm vỡ lam kính.',
    steps: [
      { text: 'Put the **smallest objective lens** over the stage.', textVn: 'Đưa **vật kính nhỏ nhất** vào vị trí trên bàn kính.' },
      { text: 'Put the slide on the stage, with the part you want to look at **over the hole**.', textVn: 'Đặt lam kính lên bàn kính, sao cho phần em muốn quan sát nằm **ngay trên lỗ sáng**.' },
      { text: '**Looking from the side**, turn the focusing knob until the lens is close to the slide.', textVn: '**Nhìn từ bên cạnh**, vặn núm chỉnh cho tới khi vật kính gần sát lam kính.' },
      { text: 'Look down the eyepiece. Slowly turn the knob to move the lens **upwards**, and stop when you can see the cells.', textVn: 'Nhìn qua thị kính. Từ từ vặn núm để đưa vật kính **lên trên**, và dừng lại khi em thấy được tế bào.' },
      { text: 'Turn the lenses until a **larger one** is over the stage. The view should be more magnified.', textVn: 'Xoay cụm vật kính cho tới khi một **vật kính lớn hơn** nằm trên bàn kính. Hình ảnh sẽ được phóng to hơn.' },
      { text: '**Draw** one or two of the cells you can see, and label your drawing.', textVn: '**Vẽ** một hoặc hai tế bào em nhìn thấy, và chú thích hình vẽ.' },
    ],
    reveal: {
      label: 'Why does step 7 say to look from the side?',
      labelVn: 'Vì sao bước 7 lại bảo phải nhìn từ bên cạnh?',
      answer: 'Because with your eye at the top of the eyepiece you cannot tell how close the lens is. Looking from the side is the only way to be sure you are not about to drive it through the slide.',
      answerVn: 'Vì khi mắt em ở trên thị kính, em không thể biết vật kính đang cách lam kính bao xa. Nhìn từ bên cạnh là cách duy nhất để chắc chắn em không đâm vật kính xuyên qua lam kính.',
    },
  },

  // 16 ─ Your own cells, stained blue + CHECK 5 ─────────────────────────────
  {
    layout: 'showcase',
    accent: CRIMSON,
    icon: 'ScanEye',
    eyebrow: 'What you are looking for',
    eyebrowVn: 'Thứ em cần tìm',
    title: 'Your Own Cells, Stained Blue',
    titleVn: 'Tế bào của chính em, nhuộm xanh',
    image: img('cheek-cells.jpg'),
    caption: 'Real human cheek cells after methylene blue. Soft, shapeless, not one straight edge — and the **dark blue dot** inside each one is its nucleus. The one clue that always works: a **cell wall** means plant. Green does not — an onion has no chloroplasts, and it is still a plant.',
    captionVn: 'Tế bào má người thật sau khi nhuộm xanh methylen. Mềm, không có hình dạng cố định, không một cạnh thẳng — và **chấm xanh đậm** bên trong mỗi tế bào là nhân của nó. Dấu hiệu luôn đúng: có **thành tế bào** là thực vật. Màu xanh thì không — củ hành không có lục lạp, mà vẫn là thực vật.',
    check: {
      id: 'c5',
      q: 'Which is the **most reliable** clue that a photograph shows plant cells?',
      qVn: 'Dấu hiệu **đáng tin cậy nhất** cho thấy một bức ảnh là tế bào thực vật là gì?',
      options: [
        { val: 'A', text: 'The cells are green', textVn: 'Tế bào có màu xanh' },
        { val: 'B', text: 'The cells have a nucleus', textVn: 'Tế bào có nhân' },
        { val: 'C', text: 'The cells have straight, stiff edges — a cell wall', textVn: 'Tế bào có cạnh thẳng, cứng — thành tế bào' },
      ],
      correct: 'C',
      expEn: 'Only plants have a **cell wall**, so straight brick-like edges never let you down. Green fails — onion cells have no chloroplasts — and every cell, plant or animal, has a nucleus.',
      expVn: 'Chỉ thực vật mới có **thành tế bào**, nên cạnh thẳng như viên gạch không bao giờ sai. Màu xanh thì sai — tế bào hành không có lục lạp — và mọi tế bào, thực vật hay động vật, đều có nhân.',
    },
  },

  // 17 ─ Recap ──────────────────────────────────────────────────────────────
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
      '> Your notebook should now have **7 things written down** and **1 labelled drawing**. Check. Then do the Vocab, and the Practice.',
    contentVn:
      'Đọc từng dòng và thành thật với chính mình. Điều nào em chưa giải thích được cho một người bạn, hãy đọc lại phần đó.\n\n' +
      '> Trong vở của em bây giờ phải có **7 mục đã chép** và **1 hình vẽ có chú thích**. Hãy kiểm tra. Rồi làm phần Từ vựng và Luyện tập.',
    items: [
      { text: 'Name the **four parts** every animal cell has, and say what each one does.', textVn: 'Kể **bốn bộ phận** mọi tế bào động vật đều có, và nhiệm vụ của từng cái.' },
      { text: 'Name the **three parts** a plant cell has that an animal cell has not.', textVn: 'Kể **ba bộ phận** tế bào thực vật có mà tế bào động vật không có.' },
      { text: 'Explain why an animal cell has **no fixed shape**.', textVn: 'Giải thích vì sao tế bào động vật **không có hình dạng cố định**.' },
      { text: 'Look at a photograph and say **plant or animal** — with a reason.', textVn: 'Nhìn một bức ảnh và nói được **thực vật hay động vật** — kèm lý do.' },
      { text: 'Say what a **stain** is and why scientists use one.', textVn: 'Nói **thuốc nhuộm** là gì và vì sao các nhà khoa học dùng nó.' },
      { text: 'Put the steps of **making a slide** in the right order.', textVn: 'Sắp xếp đúng thứ tự các bước **làm tiêu bản**.' },
    ],
  },
];
