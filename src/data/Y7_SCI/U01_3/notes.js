// src/data/Y7_SCI/U01_3/notes.js
// 1.3 Specialised Cells — rebuilt to the engagement plan
// (docs/y7-science/ENGAGEMENT-PLAN.md). 19 layout slides; 6 scored items —
// four interactive activities (sort · predict · hotspot · sort) and two
// checks, four distinct shapes in all.
//
// The classroom deck opened with "on paper, finish each sentence" and had the
// class copy two ruled tables into a notebook; this deck opens with a sort
// activity instead, and both tables now sit near the end as diagrams to look
// at — how a scientist would organise the same evidence — not homework to
// copy. The "why no nucleus" reveal-then-check becomes a `predict`; a new
// `hotspot` on the neurone's axon and a recap `sort` of all five cells add
// the variety the checks alone did not have. Every photograph is credited in
// docs/credits.md. The `check:` or `activity:` block is always the LAST key
// on its slide.
import { DIAGRAMS } from './diagrams.js';
import { SpecialisedCellWidget } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U01_3/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const CRIMSON = '#c2185b';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Dna',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 1 · 1.3',
    eyebrowVn: 'Chương 1 · 1.3',
    title: 'Specialised Cells: Built for the Job',
    titleVn: 'Tế bào chuyên hoá: Được tạo ra cho nhiệm vụ',
    objective: 'Name three specialised animal cells and two specialised plant cells, and explain how the structure of each fits its function.',
    objectiveVn: 'Kể tên ba tế bào động vật chuyên hoá và hai tế bào thực vật chuyên hoá, và giải thích cấu trúc của mỗi loại phù hợp với chức năng ra sao.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **sort**, **predict** and **tap** your way through it. Six things are scored — the sort on the next slide is the first.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán** và **chạm** trong suốt bài học. Sáu mục được tính điểm — mục sắp xếp ở slide sau là mục đầu tiên.',
    },
  },

  // 2 ─ Starter: SORT parts → jobs ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Before the new cells — the old parts',
    eyebrowVn: 'Trước các tế bào mới — các bộ phận cũ',
    title: 'Four Parts, Four Jobs',
    titleVn: 'Bốn bộ phận, bốn nhiệm vụ',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Boxes',
    text: 'You already know these four parts. Do you remember what each one **does**?',
    textVn: 'Em đã biết bốn bộ phận này rồi. Em có nhớ mỗi bộ phận **làm gì** không?',
    sub: 'Sort each part into the job it does.',
    subVn: 'Sắp xếp mỗi bộ phận vào đúng nhiệm vụ của nó.',
    activity: {
      id: 'a1', type: 'sort',
      prompt: 'Sort each part into the job it does.',
      promptVn: 'Sắp xếp mỗi bộ phận vào đúng nhiệm vụ của nó.',
      bins: [
        { id: 'controls', name: 'Controls what goes in and out', nameVn: 'Kiểm soát những gì ra vào' },
        { id: 'shape', name: 'Holds the cell in shape', nameVn: 'Giữ hình dạng cho tế bào' },
        { id: 'boss', name: 'Runs the whole cell', nameVn: 'Điều khiển toàn bộ tế bào' },
        { id: 'food', name: 'Makes food using sunlight', nameVn: 'Tạo thức ăn nhờ ánh sáng mặt trời' },
      ],
      cards: [
        { id: 'membrane', name: 'Cell membrane', nameVn: 'Màng tế bào', bin: 'controls' },
        { id: 'wall', name: 'Cell wall', nameVn: 'Thành tế bào', bin: 'shape' },
        { id: 'nucleus', name: 'Nucleus', nameVn: 'Nhân', bin: 'boss' },
        { id: 'chloroplast', name: 'Chloroplasts', nameVn: 'Lục lạp', bin: 'food' },
      ],
      explain: 'Four parts you already know, four jobs. Today you meet **five** cells built for much more specific jobs than these — carrying oxygen, sending signals, sweeping mucus, soaking up water, making food. Each one is the same idea, sharpened: structure fits function.',
      explainVn: 'Bốn bộ phận em đã biết, bốn nhiệm vụ. Hôm nay em sẽ gặp **năm** tế bào được tạo ra cho những nhiệm vụ cụ thể hơn nhiều — chở oxy, truyền tín hiệu, quét chất nhầy, hút nước, tạo thức ăn. Mỗi tế bào đều là cùng một ý tưởng, được mài sắc hơn: cấu trúc phù hợp với chức năng.',
    },
  },

  // 3 ─ The hook: three shapes from one body ────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ',
    title: 'Why Are These Not the Same?',
    titleVn: 'Vì sao chúng không giống nhau?',
    inlineSvg: DIAGRAMS.THREE_SHAPES,
    caption: 'All three of these came out of **one body** — and every one of them was built from the **same set of instructions**. So why do they look nothing alike? Think about it, then read on.',
    captionVn: 'Cả ba đều lấy ra từ **một cơ thể** — và mỗi cái đều được tạo nên từ **cùng một bộ chỉ dẫn**. Vậy vì sao chúng trông chẳng giống nhau chút nào? Hãy nghĩ về điều đó, rồi đọc tiếp.',
  },

  // 4 ─ 200 kinds (key word: function) + CHECK 1 ────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    text: 'Your body builds about **200 different kinds** of cell.',
    textVn: 'Cơ thể em tạo ra khoảng **200 loại tế bào** khác nhau.',
    sub: 'Last lesson you learned you are about **100 trillion cells**. They are not 100 trillion copies of one thing — they come in about **200 kinds**, and each kind is a different shape, because each kind has a different **job**. Today you meet **five** of them.',
    subVn: 'Tiết trước em đã biết mình có khoảng **100 nghìn tỉ tế bào**. Đó không phải 100 nghìn tỉ bản sao của một thứ — chúng có khoảng **200 loại**, mỗi loại một hình dạng khác nhau, vì mỗi loại có một **nhiệm vụ** khác nhau. Hôm nay em sẽ gặp **năm** loại.',
    notes: [
      {
        tone: 'write',
        text: '**Function:** the job a cell does, or the role it plays.',
        textVn: '**Chức năng (function):** nhiệm vụ mà tế bào làm, hay vai trò nó đảm nhận.',
      },
    ],
    check: {
      id: 'c1',
      q: 'In science, what does the **function** of a cell mean?',
      qVn: 'Trong khoa học, **chức năng (function)** của tế bào nghĩa là gì?',
      options: [
        { val: 'A', text: 'Its size', textVn: 'Kích thước của nó' },
        { val: 'B', text: 'The job it does', textVn: 'Nhiệm vụ nó làm' },
        { val: 'C', text: 'The number of them in the body', textVn: 'Số lượng của nó trong cơ thể' },
      ],
      correct: 'B',
      expEn: 'Function means **the job** a cell does — carrying oxygen, sending signals, soaking up water. The shape follows from the job, which is the whole of this lesson.',
      expVn: 'Chức năng nghĩa là **nhiệm vụ** tế bào làm — chở oxy, truyền tín hiệu, hút nước. Hình dạng đi theo nhiệm vụ, và đó là toàn bộ bài học này.',
    },
  },

  // 5 ─ Key word: specialised ───────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    title: 'Specialised',
    titleVn: 'Specialised — Chuyên hoá',
    content: 'Each of those 200 kinds is **specialised**. Its structure is built for its own job — so it does that one job extremely well, and it cannot do the others.',
    contentVn: 'Mỗi loại trong số 200 loại đó đều **chuyên hoá**. Cấu trúc của nó được tạo ra cho nhiệm vụ riêng — nên nó làm nhiệm vụ đó cực kỳ tốt, và không làm được những việc khác.',
    notes: [
      {
        tone: 'write',
        text: '**Specialised / adapted:** the cell has a structure that helps it carry out its function really well.',
        textVn: '**Chuyên hoá / thích nghi (specialised / adapted):** tế bào có cấu trúc giúp nó thực hiện chức năng của mình thật tốt.',
      },
    ],
    reveal: {
      label: 'English class: what is a specialist?',
      labelVn: 'Tiếng Anh: "specialist" là gì?',
      answer: 'A **specialist** is a person who does **one** job very well — an eye doctor, a heart doctor. You would not go to an eye doctor for a broken leg. A **specialised cell** is exactly that: brilliant at one job, and no use at all for the rest. Watch what the first one gives up to be good at its job.',
      answerVn: '**Specialist** (chuyên gia) là người làm **một** việc rất giỏi — bác sĩ mắt, bác sĩ tim. Em sẽ không đến bác sĩ mắt để chữa gãy chân. **Tế bào chuyên hoá** đúng là như vậy: xuất sắc ở một nhiệm vụ, và vô dụng với mọi việc khác. Hãy xem tế bào đầu tiên đã từ bỏ thứ gì để giỏi nhiệm vụ của nó.',
    },
  },

  // 6 ─ Red blood cell + PREDICT ────────────────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Droplet',
    eyebrow: 'Animal cell 1',
    eyebrowVn: 'Tế bào động vật 1',
    title: 'Red Blood Cell',
    titleVn: 'Tế bào hồng cầu',
    ratio: 48,
    inlineSvg: DIAGRAMS.RED_BLOOD_CELL,
    content:
      'Its **function** is to carry **oxygen** around your body.\n\n' +
      'Two things make it good at that. Its cytoplasm is full of a red **pigment** (a colour) called **haemoglobin**, and haemoglobin is what actually holds the oxygen. And it is **smaller than almost every other cell** in you, so it fits through the very narrowest blood vessels — the **capillaries**.',
    contentVn:
      '**Chức năng** của nó là vận chuyển **oxy** đi khắp cơ thể.\n\n' +
      'Hai điều giúp nó làm tốt việc đó. Tế bào chất của nó chứa đầy một **sắc tố** (màu) đỏ tên là **haemoglobin**, và chính haemoglobin giữ lấy oxy. Và nó **nhỏ hơn hầu hết mọi tế bào khác** trong cơ thể, nên đi lọt qua những mạch máu hẹp nhất — các **mao mạch (capillary)**.',
    activity: {
      id: 'a2', type: 'predict',
      prompt: 'Almost every cell keeps its nucleus. Why does the red blood cell throw its own away?',
      promptVn: 'Gần như mọi tế bào đều giữ nhân. Vì sao tế bào hồng cầu lại vứt bỏ nhân của chính mình?',
      options: [
        { val: 'A', name: 'It was a mistake — the cell lost it', nameVn: 'Đó là một sai sót — tế bào đã mất nhân' },
        { val: 'B', name: 'It leaves more room inside for haemoglobin, so it carries more oxygen', nameVn: 'Để có thêm chỗ bên trong cho haemoglobin, nhờ đó chở được nhiều oxy hơn' },
        { val: 'C', name: 'Red blood cells do not live long enough to need one', nameVn: 'Tế bào hồng cầu không sống đủ lâu để cần đến nhân' },
      ],
      correct: 'B',
      explain: 'It is a third **adaptation**: throwing away the nucleus leaves more room for haemoglobin, the red pigment that holds oxygen. Nothing about a specialised cell is an accident — it is built that way for its job.',
      explainVn: 'Đó là đặc điểm thích nghi thứ ba: bỏ nhân đi để có thêm chỗ cho haemoglobin, sắc tố đỏ giữ oxy. Không có gì ở một tế bào chuyên hoá là ngẫu nhiên — nó được tạo ra như vậy cho nhiệm vụ của mình.',
    },
  },

  // 7 ─ Small enough to bend through ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: CRIMSON,
    icon: 'ScanEye',
    eyebrow: 'The real thing',
    eyebrowVn: 'Vật thật',
    title: 'Small Enough to Bend Through',
    titleVn: 'Đủ nhỏ để lách qua',
    image: img('capillary.jpg'),
    caption: 'One red blood cell, photographed inside a **capillary**. The vessel is so narrow that the cell has had to **bend in half** to get through it — and it can, because it is tiny, floppy, and has no nucleus in the way. That is structure fitting function, in one photograph.',
    captionVn: 'Một tế bào hồng cầu, chụp bên trong một **mao mạch**. Mạch hẹp đến mức tế bào phải **gập đôi lại** mới qua được — và nó làm được, vì nó nhỏ, mềm, và không có nhân cản đường. Đó chính là cấu trúc phù hợp với chức năng, gói trong một bức ảnh.',
  },

  // 8 ─ Neurone + HOTSPOT ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Zap',
    eyebrow: 'Animal cell 2',
    eyebrowVn: 'Tế bào động vật 2',
    title: 'Neurone (Nerve Cell)',
    titleVn: 'Tế bào thần kinh (nơ-ron)',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.NEURONE,
    content:
      'Its **function** is to carry **electrical signals** around the body — from your brain to a muscle, to make it move.\n\n' +
      'The short **dendrites** collect signals from nearby cells; one very long strand then carries the signal onward. The longest neurone in you runs from the bottom of your back to your big toe — about **one metre**, all of it one cell.',
    contentVn:
      '**Chức năng** của nó là truyền **tín hiệu điện** đi khắp cơ thể — từ não đến một cơ, để làm cơ cử động.\n\n' +
      'Các **sợi nhánh (dendrite)** ngắn thu tín hiệu từ tế bào lân cận; rồi một sợi rất dài mang tín hiệu đi tiếp. Tế bào thần kinh dài nhất trong cơ thể em chạy từ cuối lưng xuống ngón chân cái — khoảng **một mét**, tất cả chỉ là một tế bào.',
    activity: {
      id: 'a3', type: 'hotspot',
      prompt: 'Tap the **axon** — the long strand that carries the signal far and fast.',
      promptVn: 'Chạm vào **sợi trục (axon)** — sợi dài mang tín hiệu đi xa và nhanh.',
      svg: DIAGRAMS.NEURONE, viewBox: '0 0 700 300',
      targets: [
        { id: 'dendrites', x: 128, y: 128, r: 35, name: 'a dendrite', nameVn: 'một sợi nhánh' },
        { id: 'nucleus', x: 165, y: 170, r: 30, name: 'the nucleus', nameVn: 'nhân' },
        { id: 'membrane', x: 175, y: 205, r: 30, name: 'the cell membrane', nameVn: 'màng tế bào' },
        { id: 'axon', x: 430, y: 190, r: 60, name: 'the axon', nameVn: 'sợi trục' },
      ],
      correct: 'axon',
      explain: 'The **axon** is the very long thin strand reaching right across the cell — that length is why one neurone can send a signal all the way from your spine to your toe. The short branches near the cell body are **dendrites**: they collect signals, they do not send them far.',
      explainVn: '**Sợi trục** là sợi rất dài và mảnh chạy suốt qua tế bào — chiều dài đó là lý do một tế bào thần kinh có thể gửi tín hiệu từ cột sống đến tận ngón chân. Những nhánh ngắn gần thân tế bào là **sợi nhánh**: chúng thu tín hiệu, không gửi tín hiệu đi xa.',
    },
  },

  // 9 ─ Ciliated cell + CHECK 3 ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Move',
    eyebrow: 'Animal cell 3',
    eyebrowVn: 'Tế bào động vật 3',
    title: 'Ciliated Cell',
    titleVn: 'Tế bào có lông rung',
    ratio: 48,
    inlineSvg: DIAGRAMS.CILIATED_CELL,
    content:
      'These cells line the tubes from your mouth down to your lungs, and along the top edge they have tiny moving hairs called **cilia**. Other cells there make sticky **mucus**, which traps dust and germs from the air — and the cilia sweep it up towards your mouth.',
    contentVn:
      'Những tế bào này lót các ống từ miệng xuống phổi, và ở mép trên chúng có những sợi lông nhỏ biết chuyển động gọi là **lông rung (cilia)**. Các tế bào khác ở đó tạo ra **chất nhầy (mucus)** dính, giữ lại bụi và vi khuẩn trong không khí — và lông rung quét nó lên phía miệng.',
    reveal: {
      label: 'So where does all that mucus go?',
      labelVn: 'Vậy tất cả chất nhầy đó đi đâu?',
      answer: 'You **swallow** it. About **a litre of it, every day**. The cilia beat roughly **twelve times a second**, all day and all night, pushing the mucus and everything stuck in it up to the back of your mouth — and down it goes, without you ever noticing. That is what keeps the dust out of your lungs.',
      answerVn: 'Em **nuốt** nó xuống. Khoảng **một lít mỗi ngày**. Lông rung đập khoảng **mười hai lần một giây**, suốt ngày lẫn đêm, đẩy chất nhầy cùng mọi thứ dính trong đó lên cuối miệng — rồi trôi xuống, mà em chẳng hề hay biết. Chính điều đó giữ cho bụi không vào phổi.',
    },
    check: {
      id: 'c3',
      q: 'What do the **cilia** on a ciliated cell do?',
      qVn: '**Lông rung** trên tế bào có lông rung làm gì?',
      options: [
        { val: 'A', text: 'Sweep mucus, dust and germs away from the lungs', textVn: 'Quét chất nhầy, bụi và vi khuẩn ra xa khỏi phổi' },
        { val: 'B', text: 'Carry oxygen around the body', textVn: 'Chở oxy đi khắp cơ thể' },
        { val: 'C', text: 'Absorb water from the soil', textVn: 'Hấp thụ nước từ đất' },
      ],
      correct: 'A',
      expEn: 'The moving **cilia** sweep the sticky mucus — and the dust and germs trapped in it — up and away from the lungs. Carrying oxygen is the red blood cell; absorbing water is the root hair cell.',
      expVn: '**Lông rung** chuyển động quét chất nhầy dính — cùng bụi và vi khuẩn mắc trong đó — lên và ra xa khỏi phổi. Chở oxy là hồng cầu; hút nước là tế bào lông hút.',
    },
  },

  // 10 ─ Down a real microscope (animal) ────────────────────────────────────
  {
    layout: 'gallery',
    accent: CRIMSON,
    icon: 'Microscope',
    columns: 3,
    eyebrow: 'The same three, for real',
    eyebrowVn: 'Chính ba loại đó, ngoài đời thực',
    title: 'Down a Real Microscope',
    titleVn: 'Nhìn qua kính hiển vi thật',
    content: 'Every cell you have met is a real thing. Here they are down a microscope — match each photograph to the drawing you have just seen.',
    contentVn: 'Mỗi tế bào em vừa gặp đều là vật thật. Đây là chúng qua kính hiển vi — hãy ghép mỗi bức ảnh với hình vẽ em vừa xem.',
    items: [
      {
        image: img('blood.jpg'),
        term: 'Red blood cells', termVn: 'Tế bào hồng cầu',
        text: 'Flat discs with a **pale dent** in the middle. The one small purple cell is a white blood cell.',
        textVn: 'Những đĩa dẹt có **vết lõm nhạt màu** ở giữa. Tế bào tím nhỏ là một bạch cầu.',
      },
      {
        image: img('neuron.jpg'),
        term: 'A neurone', termVn: 'Một tế bào thần kinh',
        text: 'The green cell, with its **long arms** reaching far across the picture.',
        textVn: 'Tế bào màu xanh lá, với những **nhánh dài** vươn ra khắp bức ảnh.',
      },
      {
        image: img('trachea.jpg'),
        term: 'Ciliated cells', termVn: 'Tế bào có lông rung',
        text: 'The lining of the windpipe. The **fuzzy dark edge** at the top is the cilia.',
        textVn: 'Lớp lót khí quản. **Mép sẫm lởm chởm** ở trên chính là lông rung.',
      },
    ],
  },

  // 11 ─ Root hair cell ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Droplet',
    eyebrow: 'Plant cell 1',
    eyebrowVn: 'Tế bào thực vật 1',
    title: 'Root Hair Cell',
    titleVn: 'Tế bào lông hút',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.ROOT_HAIR_CELL,
    content:
      'Root hair cells grow on the outside of a plant’s **roots**. Their **function** is to **absorb** — soak up — water from the soil.\n\n' +
      'Each one has a long, thin **extension** pushing out between the soil grains — a big surface for water to move in through. And underground, in the dark, chloroplasts would be no use at all — so a root hair cell builds none.',
    contentVn:
      'Tế bào lông hút mọc ở mặt ngoài **rễ** cây. **Chức năng** của chúng là **hấp thụ** — hút — nước từ đất.\n\n' +
      'Mỗi tế bào có một phần **kéo dài** dài và mảnh, đẩy ra giữa các hạt đất — một bề mặt lớn để nước đi vào. Và dưới lòng đất, trong bóng tối, lục lạp sẽ vô dụng — nên tế bào lông hút không tạo ra cái nào cả.',
    reveal: {
      label: 'Which parts does the water pass through?',
      labelVn: 'Nước đi qua những bộ phận nào?',
      answer: 'Going from the soil to the vacuole, the water passes through the **cell wall → cell membrane → cytoplasm → vacuole**, in that order.',
      answerVn: 'Đi từ đất vào không bào, nước đi qua **thành tế bào → màng tế bào → tế bào chất → không bào**, theo đúng thứ tự đó.',
    },
  },

  // 12 ─ Palisade cell ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sun',
    eyebrow: 'Plant cell 2',
    eyebrowVn: 'Tế bào thực vật 2',
    title: 'Palisade Cell',
    titleVn: 'Tế bào mô giậu',
    ratio: 48,
    inlineSvg: DIAGRAMS.PALISADE_CELL,
    content:
      'Palisade cells are found in the **leaves**. Their **function** is to make food by **photosynthesis**.\n\n' +
      'They are packed with **chloroplasts**, which hold the green **chlorophyll** that absorbs energy from sunlight.',
    contentVn:
      'Tế bào mô giậu nằm trong **lá** cây. **Chức năng** của chúng là tạo thức ăn bằng **quang hợp**.\n\n' +
      'Chúng chứa đầy **lục lạp**, bên trong có **diệp lục** màu xanh hấp thụ năng lượng từ ánh sáng mặt trời.',
    reveal: {
      label: 'Why tall — and why at the top of the leaf?',
      labelVn: 'Vì sao lại cao — và vì sao nằm ở mặt trên của lá?',
      answer: '**Tall** means one cell can stack more chloroplasts one above another, so it catches more light. At the **top** means the light reaches it **first**, before any other cell can shade it. The shape and the position were both chosen by the same job.',
      answerVn: '**Cao** nghĩa là một tế bào xếp được nhiều lục lạp chồng lên nhau, nên bắt được nhiều ánh sáng hơn. Ở **mặt trên** nghĩa là ánh sáng đến với nó **trước tiên**, trước khi có tế bào nào che mất. Cả hình dạng lẫn vị trí đều do cùng một nhiệm vụ quyết định.',
    },
  },

  // 13 ─ Down a real microscope (plant) ─────────────────────────────────────
  {
    layout: 'gallery',
    accent: GREEN,
    tone: 'plant',
    columns: 2,
    eyebrow: 'The plant cells, for real',
    eyebrowVn: 'Tế bào thực vật, ngoài đời thực',
    title: 'Down a Real Microscope',
    titleVn: 'Nhìn qua kính hiển vi thật',
    content: 'And the two plant cells, as they really look. Match each one to the drawing you have just seen.',
    contentVn: 'Và hai tế bào thực vật, đúng như chúng trông thật. Hãy ghép mỗi cái với hình vẽ em vừa xem.',
    icon: 'Microscope',
    items: [
      {
        image: img('roothair.jpg'),
        term: 'Root hairs', termVn: 'Lông hút',
        text: 'Cress seeds sprouting in soil. The **white fuzz** on each young root is thousands of root hairs.',
        textVn: 'Hạt cải xoong nảy mầm trong đất. **Lớp lông trắng** trên mỗi rễ non là hàng nghìn lông hút.',
      },
      {
        image: img('leaf.jpg'),
        term: 'Palisade cells', termVn: 'Tế bào mô giậu',
        text: 'A slice through a leaf. The **tall purple columns** just under the top are the palisade cells, full of chloroplasts.',
        textVn: 'Một lát cắt qua lá. Những **cột tím cao** ngay dưới mặt trên là tế bào mô giậu, chứa đầy lục lạp.',
      },
    ],
  },

  // 14 ─ Same plant, opposite shapes ────────────────────────────────────────
  {
    layout: 'compare',
    accent: GREEN,
    icon: 'Scale',
    eyebrow: 'One plant, two cells',
    eyebrowVn: 'Một cái cây, hai tế bào',
    title: 'Same Plant. Opposite Shapes.',
    titleVn: 'Cùng một cây. Hình dạng trái ngược.',
    columns: [
      {
        heading: 'Down in the dark',
        headingVn: 'Dưới lòng đất tối',
        accent: '#a3762f',
        icon: 'Droplet',
        inlineSvg: DIAGRAMS.SHAPE_ROOTHAIR,
        caption: 'Job: **soak up water**. So it grows **long and thin**, out between the grains of soil — and builds **no chloroplasts**, because there is no light to use.',
        captionVn: 'Nhiệm vụ: **hút nước**. Nên nó mọc **dài và mảnh**, len ra giữa các hạt đất — và **không tạo lục lạp**, vì ở đó không có ánh sáng để dùng.',
      },
      {
        heading: 'Up in the light',
        headingVn: 'Trên cao trong ánh sáng',
        accent: GREEN,
        icon: 'Sun',
        inlineSvg: DIAGRAMS.SHAPE_PALISADE,
        caption: 'Job: **catch sunlight**. So it grows **tall and packed with chloroplasts**, standing at the very top of the leaf where the light arrives first.',
        captionVn: 'Nhiệm vụ: **bắt ánh sáng**. Nên nó mọc **cao và chứa đầy lục lạp**, đứng ngay mặt trên của lá nơi ánh sáng đến đầu tiên.',
      },
    ],
  },

  // 15 ─ Recap: SORT all five cells → jobs ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Boxes',
    eyebrow: 'Five cells, five jobs',
    eyebrowVn: 'Năm tế bào, năm nhiệm vụ',
    title: 'Match Every Cell to Its Job',
    titleVn: 'Ghép mỗi tế bào với nhiệm vụ của nó',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Boxes',
    text: 'You have now met all **five** specialised cells.',
    textVn: 'Em đã gặp đủ **năm** tế bào chuyên hoá.',
    sub: 'Sort each one into the job it does.',
    subVn: 'Sắp xếp mỗi tế bào vào đúng nhiệm vụ của nó.',
    activity: {
      id: 'a4', type: 'sort',
      prompt: 'Sort each specialised cell into the job it does.',
      promptVn: 'Sắp xếp mỗi tế bào chuyên hoá vào đúng nhiệm vụ của nó.',
      bins: [
        { id: 'oxygen', name: 'Carries oxygen', nameVn: 'Chở oxy' },
        { id: 'signals', name: 'Carries signals', nameVn: 'Truyền tín hiệu' },
        { id: 'mucus', name: 'Sweeps mucus', nameVn: 'Quét chất nhầy' },
        { id: 'water', name: 'Absorbs water', nameVn: 'Hấp thụ nước' },
        { id: 'food', name: 'Makes food', nameVn: 'Tạo thức ăn' },
      ],
      cards: [
        { id: 'rbc', name: 'Red blood cell', nameVn: 'Tế bào hồng cầu', bin: 'oxygen' },
        { id: 'neurone', name: 'Neurone', nameVn: 'Tế bào thần kinh', bin: 'signals' },
        { id: 'ciliated', name: 'Ciliated cell', nameVn: 'Tế bào có lông rung', bin: 'mucus' },
        { id: 'roothair', name: 'Root hair cell', nameVn: 'Tế bào lông hút', bin: 'water' },
        { id: 'palisade', name: 'Palisade cell', nameVn: 'Tế bào mô giậu', bin: 'food' },
      ],
      explain: 'Oxygen → red blood cell (haemoglobin, no nucleus). Signals → neurone (a long axon). Mucus → ciliated cell (moving cilia). Water → root hair cell (a long thin hair). Food → palisade cell (packed with chloroplasts). Five jobs, five different shapes — structure fits function every time.',
      explainVn: 'Oxy → tế bào hồng cầu (haemoglobin, không nhân). Tín hiệu → tế bào thần kinh (sợi trục dài). Chất nhầy → tế bào có lông rung (lông rung chuyển động). Nước → tế bào lông hút (lông dài mảnh). Thức ăn → tế bào mô giậu (chứa đầy lục lạp). Năm nhiệm vụ, năm hình dạng khác nhau — cấu trúc luôn phù hợp với chức năng.',
    },
  },

  // 16 ─ How scientists record it (both tables, viewed not copied) ─────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'How scientists keep track',
    eyebrowVn: 'Cách các nhà khoa học ghi chép',
    title: 'How Scientists Record It',
    titleVn: 'Cách ghi lại thông tin',
    columns: [
      {
        heading: 'The three animal cells', headingVn: 'Ba tế bào động vật',
        accent: CRIMSON,
        icon: 'Users',
        inlineSvg: DIAGRAMS.ANIMAL_TABLE,
        caption: 'Four columns: name, function, structure, how it helps. The red blood cell’s row is filled in — see how each column follows from the one before it.',
        captionVn: 'Bốn cột: tên, chức năng, cấu trúc, tác dụng. Dòng của tế bào hồng cầu đã được điền sẵn — hãy xem mỗi cột nối tiếp cột trước ra sao.',
      },
      {
        heading: 'The two plant cells', headingVn: 'Hai tế bào thực vật',
        accent: GREEN,
        icon: 'Leaf',
        inlineSvg: DIAGRAMS.PLANT_TABLE,
        caption: 'The same four columns again. Once you know a cell’s job, you can usually work out its structure before you are told it.',
        captionVn: 'Vẫn bốn cột đó. Khi đã biết nhiệm vụ của một tế bào, em thường có thể đoán ra cấu trúc của nó trước khi được cho biết.',
      },
    ],
  },

  // 17 ─ Structure fits function (the sentence frame) ──────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: 'Structure Fits Function',
    titleVn: 'Cấu trúc phù hợp với chức năng',
    ratio: 45,
    content:
      'Every cell today told the **same kind of story**: it has a job, and a special feature that helps it do that job.\n\n' +
      'There is one English sentence that says it every time. Learn the frame and you can describe **any** specialised cell — including ones you have never met.',
    contentVn:
      'Mọi tế bào hôm nay đều kể **cùng một kiểu câu chuyện**: nó có một nhiệm vụ, và một đặc điểm đặc biệt giúp nó làm nhiệm vụ đó.\n\n' +
      'Có một câu tiếng Anh nói điều đó mỗi lần. Học mẫu câu này thì em mô tả được **bất kỳ** tế bào chuyên hoá nào — kể cả loại em chưa từng gặp.',
    notes: [
      {
        tone: 'write',
        text:
          '**The sentence frame:**\n' +
          'A [cell] is **adapted to** [its job] **because it has** [its special feature].\n' +
          '“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
        textVn:
          '**Mẫu câu:**\n' +
          'A [cell] is **adapted to** [nhiệm vụ] **because it has** [đặc điểm đặc biệt].\n' +
          '“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
      },
    ],
    reveal: {
      label: 'Your turn — think it through, then check',
      labelVn: 'Đến lượt em — suy nghĩ, rồi kiểm tra',
      prompt: '“A palisade cell is adapted to ______ because it has ______ .”',
      promptVn: '“A palisade cell is adapted to ______ because it has ______ .”',
      answer: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**.',
      answerVn: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**. (Tế bào mô giậu thích nghi để quang hợp vì nó có nhiều lục lạp gần mặt trên của lá.)',
    },
  },

  // 18 ─ Say it before you see it (widget) ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Say It Before You See It',
    titleVn: 'Nói trước khi nhìn thấy',
    ratio: 45,
    content: 'One cell at a time. For each photo, say its **job** and its **special feature** out loud **before** you reveal them — then check.',
    contentVn: 'Mỗi lần một tế bào. Với mỗi bức ảnh, hãy nói to **nhiệm vụ** và **đặc điểm đặc biệt** của nó **trước khi** hiện đáp án — rồi kiểm tra.',
    notes: [
      {
        tone: 'task',
        badge: 'Before you reveal',
        badgeVn: 'Trước khi hiện đáp án',
        text: 'Think of the cell’s job **before** you press the button. Use the sentence frame if it helps.',
        textVn: 'Nghĩ ra nhiệm vụ của tế bào **trước khi** bấm nút. Dùng mẫu câu nếu cần.',
      },
    ],
    widget: SpecialisedCellWidget,
  },

  // 19 ─ Recap ──────────────────────────────────────────────────────────────
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
      '> One to think about: the small purple **white blood cell** in the blood photograph chases germs and swallows them whole. Why would a **fixed** shape be no good for that job?',
    contentVn:
      '> Một điều để suy nghĩ: con **bạch cầu** nhỏ màu tím trong bức ảnh máu đuổi theo vi khuẩn và nuốt trọn chúng. Vì sao một hình dạng **cố định** lại không phù hợp với nhiệm vụ đó?',
    items: [
      { text: 'Say what **function** and **specialised** mean.', textVn: 'Nói được **chức năng** và **chuyên hoá** nghĩa là gì.' },
      { text: 'Name the **three** specialised animal cells and each one’s job.', textVn: 'Kể **ba** tế bào động vật chuyên hoá và nhiệm vụ của từng cái.' },
      { text: 'Name the **two** specialised plant cells and each one’s job.', textVn: 'Kể **hai** tế bào thực vật chuyên hoá và nhiệm vụ của từng cái.' },
      { text: 'Use the frame: **adapted to ___ because it has ___**.', textVn: 'Dùng mẫu câu: **adapted to ___ because it has ___**.' },
      { text: 'Explain why a root hair cell has **no chloroplasts**.', textVn: 'Giải thích vì sao tế bào lông hút **không có lục lạp**.' },
      { text: 'Read a table that records a cell’s **name, function, structure and benefit**.', textVn: 'Đọc được một bảng ghi **tên, chức năng, cấu trúc và tác dụng** của tế bào.' },
    ],
  },
];
