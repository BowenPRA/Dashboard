// src/data/Y7_SCI/U01_2/notes.js
// 1.2 Animal Cells — rebuilt to the engagement plan
// (docs/y7-science/ENGAGEMENT-PLAN.md). 16 layout slides; 6 scored items —
// three interactive activities (predict · hotspot · order) and three checks.
//
// The classroom deck opened with "list plant parts starting with c, on
// paper"; this one opens with a guess the next two slides pay off. Every
// "on paper" / "in pairs" / "notebook count" instruction is gone — the
// group build-a-cell activity and the homework slide are dropped entirely
// (Dashboard has no group and no homework). The drawn diagram that used to
// carry a `drawThis` "copy and label" instruction now just teaches, because
// Label It is where the student actually places every label. The steps for
// making a slide are taught, then tested as an `order` activity covering
// all seven steps end to end. Every photograph is credited in
// docs/credits.md. The `check:` or `activity:` block is always the LAST key
// on its slide.
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
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
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
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **guess**, **tap** and **put things in order**. Six things are scored — the guess on the next slide is the first.',
      textVn: 'Em sẽ **đoán**, **chạm** và **sắp xếp thứ tự**. Sáu mục được tính điểm — câu đoán ở slide sau là mục đầu tiên.',
    },
  },

  // 2 ─ How many cells is a person made of? PREDICT ────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Guess before you read on',
    eyebrowVn: 'Đoán trước khi đọc tiếp',
    title: 'How Many Cells Are You Made Of?',
    titleVn: 'Em được tạo nên từ bao nhiêu tế bào?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Nobody has ever counted them all — scientists estimate.',
    textVn: 'Chưa ai từng đếm hết — các nhà khoa học ước tính.',
    sub: 'Tap your best guess below, then see how close you were.',
    subVn: 'Chạm vào dự đoán tốt nhất của em bên dưới, rồi xem em đoán gần đến đâu.',
    activity: {
      id: 'a1', type: 'predict',
      prompt: 'How many cells are in one person?',
      promptVn: 'Có bao nhiêu tế bào trong một người?',
      options: [
        { val: 'million', name: 'A million', nameVn: 'Một triệu' },
        { val: 'billion', name: 'A billion', nameVn: 'Một tỉ' },
        { val: 'trillion', name: 'A trillion', nameVn: 'Một nghìn tỉ' },
        { val: '100trillion', name: '100 trillion', nameVn: '100 nghìn tỉ' },
      ],
      correct: '100trillion',
      explain: 'About **100 trillion** — 100 000 000 000 000. That is more cells than there are stars in the whole Milky Way galaxy, which holds about 400 billion. Every one of them is doing a job right now, while you sit there.',
      explainVn: 'Khoảng **100 nghìn tỉ** — 100 000 000 000 000. Đó là nhiều tế bào hơn cả số sao trong toàn bộ thiên hà Milky Way, vốn có khoảng 400 tỉ ngôi sao. Mỗi tế bào đều đang làm việc ngay lúc này, khi em ngồi đây.',
    },
  },

  // 3 ─ More cells than stars ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Sparkles',
    eyebrow: 'For scale',
    eyebrowVn: 'Để hình dung',
    title: 'More Cells Than Stars',
    titleVn: 'Nhiều tế bào hơn cả số sao',
    image: img('milky-way.jpg'),
    caption: 'Our whole galaxy holds about **400 billion stars**. You are built from about **100 trillion cells** — at least **250 times more**. How close was your guess?',
    captionVn: 'Cả thiên hà của chúng ta có khoảng **400 tỉ ngôi sao**. Còn em được tạo nên từ khoảng **100 nghìn tỉ tế bào** — nhiều gấp ít nhất **250 lần**. Em đoán gần đến đâu?',
  },

  // 4 ─ Parts of an animal cell + CHECK 1 ───────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Boxes',
    title: 'Parts of an Animal Cell',
    titleVn: 'Các bộ phận của tế bào động vật',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANIMAL_CELL,
    content:
      'All animals are made of cells. **You are an animal**, so your body is made of cells too.\n\n' +
      'An animal cell is **similar** to a plant cell in several ways — and we will come back to that word. You will place every label yourself in **Label It**.',
    contentVn:
      'Mọi loài vật đều được tạo nên từ tế bào. **Em cũng là một động vật**, nên cơ thể em cũng được tạo nên từ tế bào.\n\n' +
      'Tế bào động vật **tương tự** tế bào thực vật ở nhiều điểm — và chúng ta sẽ quay lại với từ này. Em sẽ tự đặt mọi nhãn ở phần **Gắn nhãn**.',
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
      id: 'c1',
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

  // 5 ─ Find the plant-only part: HOTSPOT ───────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Target',
    eyebrow: 'Tap the diagram',
    eyebrowVn: 'Chạm vào hình',
    title: 'Spot the Difference',
    titleVn: 'Tìm điểm khác nhau',
    label: 'Locate',
    labelVn: 'Xác định vị trí',
    labelIcon: 'Target',
    text: 'The plant cell (left) has **three things** the animal cell has not got.',
    textVn: 'Tế bào thực vật (bên trái) có **ba thứ** mà tế bào động vật không có.',
    sub: 'Tap the big pale space that keeps the plant cell firm. You get two tries.',
    subVn: 'Chạm vào khoảng trống nhạt màu lớn giúp tế bào thực vật căng cứng. Em có hai lần thử.',
    activity: {
      id: 'a2', type: 'hotspot',
      prompt: 'Tap the **sap vacuole** — found only in the plant cell.',
      promptVn: 'Chạm vào **không bào** — chỉ có ở tế bào thực vật.',
      svg: DIAGRAMS.SPOT_THE_DIFFERENCE, viewBox: '0 0 900 420',
      targets: [
        { id: 'vacuole', x: 190, y: 206, r: 32, name: 'the sap vacuole', nameVn: 'không bào' },
        { id: 'nucleus_p', x: 145, y: 268, r: 24, name: 'the nucleus', nameVn: 'nhân' },
        { id: 'mito_p', x: 136, y: 172, r: 16, name: 'a mitochondrion', nameVn: 'một ti thể' },
        { id: 'nucleus_a', x: 722, y: 290, r: 40, name: 'the nucleus of the animal cell', nameVn: 'nhân của tế bào động vật' },
        { id: 'mito_a', x: 580, y: 140, r: 16, name: 'a mitochondrion of the animal cell', nameVn: 'một ti thể của tế bào động vật' },
      ],
      correct: 'vacuole',
      explain: 'The **sap vacuole** is the big pale space in the middle of the plant cell — full of cell sap, it keeps the cell firm, like air in a tyre. Every cell has a nucleus and mitochondria, plant or animal, so those are never the difference. The next slide shows all three plant-only parts.',
      explainVn: '**Không bào** là khoảng trống nhạt màu lớn ở giữa tế bào thực vật — chứa đầy dịch tế bào, giúp tế bào căng cứng, như hơi trong lốp xe. Mọi tế bào đều có nhân và ti thể, dù là thực vật hay động vật, nên đó không bao giờ là điểm khác biệt. Slide sau sẽ cho em xem cả ba phần chỉ có ở thực vật.',
    },
  },

  // 6 ─ Three things an animal cell has not got ─────────────────────────────
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
    content: 'A plant cell has **everything** an animal cell has, **plus** these three. In each picture the rest of the cell is greyed out, so you can see exactly where the part sits — notice where each one is, you will need that for Label It.',
    contentVn: 'Tế bào thực vật có **mọi thứ** tế bào động vật có, **cộng thêm** ba phần này. Trong mỗi hình, phần còn lại của tế bào được làm mờ để em thấy rõ vị trí của bộ phận đó — hãy để ý vị trí từng phần, em sẽ cần nó ở phần Gắn nhãn.',
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

  // 7 ─ No wall, no fixed shape + CHECK 2 ───────────────────────────────────
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
      id: 'c2',
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

  // 8 ─ Not all animal cells look alike ─────────────────────────────────────
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

  // 9 ─ Similar is not the same (English) ───────────────────────────────────
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
      label: 'Your turn — finish the sentence, then check',
      labelVn: 'Đến lượt em — hoàn thành câu, rồi kiểm tra',
      prompt: '"Both cells have ______ , but only the plant cell has ______ ."',
      promptVn: '"Both cells have ______ , but only the plant cell has ______ ."',
      answer: 'Both cells have **a cell membrane, cytoplasm, mitochondria and a nucleus**, but only the plant cell has **a cell wall, chloroplasts and a sap vacuole**.',
      answerVn: 'Both cells have **a cell membrane, cytoplasm, mitochondria and a nucleus**, but only the plant cell has **a cell wall, chloroplasts and a sap vacuole**. (Cả hai loại tế bào đều có màng tế bào, tế bào chất, ti thể và nhân, nhưng chỉ tế bào thực vật mới có thành tế bào, lục lạp và không bào.)',
    },
  },

  // 10 ─ Plant or animal? (widget) ──────────────────────────────────────────
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
      'Eight real photographs, all taken down a microscope. The **first four** are read for you. The **next four** you decide: plant cell or animal cell — tap your answer and see if you are right.',
    contentVn:
      'Tám tấm ảnh thật, đều chụp qua kính hiển vi. **Bốn ảnh đầu** đã được đọc sẵn. **Bốn ảnh sau** em tự quyết định: tế bào thực vật hay động vật — chạm vào câu trả lời và xem em đúng không.',
    widget: PlantOrAnimalWidget,
  },

  // 11 ─ Looking at your own cells ──────────────────────────────────────────
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

  // 12 ─ Key word: stain ────────────────────────────────────────────────────
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
  },

  // 13 ─ Making the slide (steps) ───────────────────────────────────────────
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

  // 14 ─ Setting up the microscope (steps) ──────────────────────────────────
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Microscope',
    eyebrow: 'Steps 5 to 7',
    eyebrowVn: 'Bước 5 đến 7',
    title: 'Setting Up the Microscope',
    titleVn: 'Lắp đặt kính hiển vi',
    content: 'The third step here matters more than it looks. Get it wrong and you break the slide.',
    contentVn: 'Bước thứ ba ở đây quan trọng hơn vẻ ngoài của nó. Làm sai là em làm vỡ lam kính.',
    steps: [
      { text: 'Put the **smallest objective lens** over the stage.', textVn: 'Đưa **vật kính nhỏ nhất** vào vị trí trên bàn kính.' },
      { text: 'Put the slide on the stage, with the part you want to look at **over the hole**.', textVn: 'Đặt lam kính lên bàn kính, sao cho phần em muốn quan sát nằm **ngay trên lỗ sáng**.' },
      { text: '**Looking from the side**, turn the focusing knob until the lens is close to the slide.', textVn: '**Nhìn từ bên cạnh**, vặn núm chỉnh cho tới khi vật kính gần sát lam kính.' },
      { text: 'Look down the **eyepiece**. Slowly turn the knob to move the lens upwards, and stop when you can see the cells.', textVn: 'Nhìn qua **thị kính**. Từ từ vặn núm để đưa vật kính lên trên, và dừng lại khi em thấy được tế bào.' },
    ],
    reveal: {
      label: 'Why does that step say to look from the side?',
      labelVn: 'Vì sao bước đó lại bảo phải nhìn từ bên cạnh?',
      answer: 'Because with your eye at the top of the eyepiece you cannot tell how close the lens is. Looking from the side is the only way to be sure you are not about to drive it through the slide.',
      answerVn: 'Vì khi mắt em ở trên thị kính, em không thể biết vật kính đang cách lam kính bao xa. Nhìn từ bên cạnh là cách duy nhất để chắc chắn em không đâm vật kính xuyên qua lam kính.',
    },
  },

  // 15 ─ Every step, shuffled: ORDER ────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ListOrdered',
    eyebrow: 'Put it in order',
    eyebrowVn: 'Sắp xếp thứ tự',
    title: 'Every Step, Shuffled',
    titleVn: 'Mọi bước, bị xáo trộn',
    label: 'Arrange',
    labelVn: 'Sắp xếp',
    labelIcon: 'ListOrdered',
    text: 'You just learned every step for looking at your own cheek cells.',
    textVn: 'Em vừa học mọi bước để quan sát tế bào má của chính mình.',
    sub: 'Drag them back into the right order below.',
    subVn: 'Kéo chúng về đúng thứ tự bên dưới.',
    activity: {
      id: 'a3', type: 'order',
      prompt: 'Put the seven steps in order, from first to last.',
      promptVn: 'Sắp xếp bảy bước theo đúng thứ tự, từ đầu đến cuối.',
      steps: [
        { id: 'cheek', name: 'Rub a cotton bud on the inside of your cheek', nameVn: 'Chà tăm bông vào mặt trong má' },
        { id: 'slide', name: 'Rub the bud on a clean microscope slide', nameVn: 'Chà tăm bông lên một lam kính sạch' },
        { id: 'stain', name: 'Add a drop of methylene blue', nameVn: 'Nhỏ một giọt xanh methylen' },
        { id: 'cover', name: 'Lower the cover slip over the drop', nameVn: 'Hạ lamen xuống phủ lên giọt thuốc nhuộm' },
        { id: 'lens', name: 'Put the smallest objective lens over the stage', nameVn: 'Đưa vật kính nhỏ nhất vào vị trí trên bàn kính' },
        { id: 'side', name: 'Looking from the side, bring the lens close to the slide', nameVn: 'Nhìn từ bên cạnh, đưa vật kính lại gần lam kính' },
        { id: 'eyepiece', name: 'Look down the eyepiece until you see the cells', nameVn: 'Nhìn qua thị kính cho tới khi thấy được tế bào' },
      ],
      explain: 'Get the sixth step wrong and the seventh breaks the slide: you always look from the side to bring the lens close, then check through the eyepiece — never the other way round.',
      explainVn: 'Làm sai bước thứ sáu sẽ khiến bước thứ bảy làm vỡ lam kính: em luôn nhìn từ bên cạnh để đưa vật kính lại gần trước, rồi mới kiểm tra qua thị kính — không bao giờ làm ngược lại.',
    },
  },

  // 16 ─ Your own cells, stained blue + CHECK 3 ─────────────────────────────
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
      id: 'c3',
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
      'Next: the Vocab, then **Label It** — you will put every label on these diagrams yourself. Then the Practice mixes sorting, ordering and typed answers.',
    contentVn:
      'Đọc từng dòng và thành thật với chính mình. Điều nào em chưa giải thích được cho một người bạn, hãy đọc lại phần đó.\n\n' +
      'Tiếp theo: Từ vựng, rồi **Gắn nhãn** — em sẽ tự đặt mọi nhãn lên những hình này. Rồi phần Luyện tập sẽ kết hợp sắp xếp, xếp thứ tự và trả lời bằng chữ.',
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
