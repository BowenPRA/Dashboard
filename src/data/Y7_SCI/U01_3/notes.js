// src/data/Y7_SCI/U01_3/notes.js
// 1.3 Specialised Cells — a self-study reduction of the classroom deck
// (C:\Users\bowen\lessons, content/y7-science/U01_3). 18 layout slides,
// 5 checks.
//
// The spine is one idea, and it is both the science and the English:
// STRUCTURE FITS FUNCTION. Reduced from 23 classroom slides: the starter's
// check-your-sentences slide and the page-19 Q1/Q2 slide move to Short
// Answers, the peer assessment becomes a self-check, and the homework goes.
// The two tables stay — they are the ONE place the five cells get written
// down. Every photograph is credited in docs/credits.md. The `check:` block
// is always the LAST key.
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
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
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
      icon: 'Pencil',
      badge: 'Starter · 1 minute',
      badgeVn: 'Khởi động · 1 phút',
      text: 'On paper, finish each sentence: **Cell membranes …   ·   Cell walls …   ·   A nucleus …   ·   Chloroplasts …** Every one of those parts has a **job**.',
      textVn: 'Viết ra giấy, hoàn thành mỗi câu: **Cell membranes …   ·   Cell walls …   ·   A nucleus …   ·   Chloroplasts …** Mỗi bộ phận đó đều có một **nhiệm vụ**.',
    },
  },

  // 2 ─ The hook: three shapes from one body ────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Two minutes — write a reason before you go on',
    eyebrowVn: 'Hai phút — viết một lý do trước khi tiếp tục',
    title: 'Why Are These Not the Same?',
    titleVn: 'Vì sao chúng không giống nhau?',
    inlineSvg: DIAGRAMS.THREE_SHAPES,
    caption: 'All three of these came out of **one body** — and every one of them was built from the **same set of instructions**. So why do they look nothing alike? Write down a reason.',
    captionVn: 'Cả ba đều lấy ra từ **một cơ thể** — và mỗi cái đều được tạo nên từ **cùng một bộ chỉ dẫn**. Vậy vì sao chúng trông chẳng giống nhau chút nào? Hãy viết ra một lý do.',
  },

  // 3 ─ 200 kinds (key word: function) + CHECK 1 ────────────────────────────
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

  // 4 ─ Key word: specialised ───────────────────────────────────────────────
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

  // 5 ─ Red blood cell + CHECK 2 ────────────────────────────────────────────
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
    reveal: {
      label: 'And why has it got no nucleus?',
      labelVn: 'Còn vì sao nó không có nhân?',
      answer: 'Almost every other cell keeps its nucleus. This one **throws its own away** — that is its third adaptation, and it leaves **more room inside for haemoglobin**, so it can carry even more oxygen. A specialist gives things up to be better at one job.',
      answerVn: 'Gần như mọi tế bào khác đều giữ nhân. Tế bào này **vứt bỏ nhân của chính mình** — đó là đặc điểm thích nghi thứ ba, và nó để lại **nhiều chỗ hơn cho haemoglobin**, nhờ đó chở được nhiều oxy hơn. Một chuyên gia phải từ bỏ vài thứ để giỏi hơn ở một việc.',
    },
    check: {
      id: 'c2',
      q: 'Why does a red blood cell have **no nucleus**?',
      qVn: 'Vì sao tế bào hồng cầu **không có nhân**?',
      options: [
        { val: 'A', text: 'It is a plant cell', textVn: 'Nó là tế bào thực vật' },
        { val: 'B', text: 'It lost it by accident', textVn: 'Nó bị mất nhân do tai nạn' },
        { val: 'C', text: 'That leaves more room for haemoglobin, so it carries more oxygen', textVn: 'Để có thêm chỗ cho haemoglobin, nên chở được nhiều oxy hơn' },
      ],
      correct: 'C',
      expEn: 'It is an **adaptation**: throwing away the nucleus leaves more room for haemoglobin, the red pigment that holds oxygen. It is an animal cell, and nothing about it is an accident — it is built that way.',
      expVn: 'Đó là một **đặc điểm thích nghi**: bỏ nhân đi để có thêm chỗ cho haemoglobin, sắc tố đỏ giữ oxy. Nó là tế bào động vật, và không có gì là tai nạn — nó được tạo ra như vậy.',
    },
  },

  // 6 ─ Small enough to bend through ────────────────────────────────────────
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

  // 7 ─ Rule up the table ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Learner’s Book, page 19 · Activity 1.3.1',
    eyebrowVn: 'Sách học sinh, trang 19 · Hoạt động 1.3.1',
    title: 'Rule Up the Table',
    titleVn: 'Kẻ bảng',
    ratio: 40,
    inlineSvg: DIAGRAMS.ANIMAL_TABLE,
    drawThis: true,
    content:
      'This table is where the three animal cells go — **instead of** notes, not as well as them. Rule it up now, and fill in a row as you meet each cell.\n\n' +
      'The red blood cell is done for you, and it gets **three** lines, because you have just found all three of its adaptations.',
    contentVn:
      'Bảng này là nơi ghi ba tế bào động vật — **thay cho** ghi chép, chứ không phải ghi thêm. Hãy kẻ bảng ngay bây giờ, và điền từng dòng khi gặp từng tế bào.\n\n' +
      'Tế bào hồng cầu đã được làm sẵn, và nó có **ba** dòng, vì em vừa tìm ra đủ ba đặc điểm thích nghi của nó.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the table. Give it a **title** and use a **ruler**. Leave the red blood cell **three** lines: haemoglobin · small enough for a capillary · no nucleus.',
        textVn: 'Chép bảng. Đặt **tiêu đề** và dùng **thước**. Chừa cho tế bào hồng cầu **ba** dòng: haemoglobin · đủ nhỏ để qua mao mạch · không có nhân.',
      },
    ],
  },

  // 8 ─ Neurone ─────────────────────────────────────────────────────────────
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
      'The **axon** is a very long strand; the short **dendrites** collect signals from nearby cells. The longest neurone in you runs from the bottom of your back to your big toe — about **one metre**, all of it one cell.\n\n' +
      '> **Row 2 — Neurone.** Function: carries electrical signals. Structure: a very long **axon**. How this helps: signals travel far, and fast.',
    contentVn:
      '**Chức năng** của nó là truyền **tín hiệu điện** đi khắp cơ thể — từ não đến một cơ, để làm cơ cử động.\n\n' +
      '**Sợi trục (axon)** là một sợi rất dài; các **sợi nhánh (dendrite)** ngắn thu tín hiệu từ tế bào lân cận. Tế bào thần kinh dài nhất trong cơ thể em chạy từ cuối lưng xuống ngón chân cái — khoảng **một mét**, tất cả chỉ là một tế bào.\n\n' +
      '> **Dòng 2 — Tế bào thần kinh.** Chức năng: truyền tín hiệu điện. Cấu trúc: một **sợi trục** rất dài. Điều này giúp: tín hiệu đi xa, và nhanh.',
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
      'These cells line the tubes from your mouth down to your lungs, and along the top edge they have tiny moving hairs called **cilia**. Other cells there make sticky **mucus**, which traps dust and germs from the air — and the cilia sweep it up towards your mouth.\n\n' +
      '> **Row 3 — Ciliated cell.** Function: sweeps mucus out of the airways. Structure: moving **cilia** along the top. How this helps: dust and germs are carried away from the lungs.',
    contentVn:
      'Những tế bào này lót các ống từ miệng xuống phổi, và ở mép trên chúng có những sợi lông nhỏ biết chuyển động gọi là **lông rung (cilia)**. Các tế bào khác ở đó tạo ra **chất nhầy (mucus)** dính, giữ lại bụi và vi khuẩn trong không khí — và lông rung quét nó lên phía miệng.\n\n' +
      '> **Dòng 3 — Tế bào có lông rung.** Chức năng: quét chất nhầy ra khỏi đường thở. Cấu trúc: **lông rung** biết chuyển động ở mép trên. Điều này giúp: bụi và vi khuẩn bị đưa ra xa khỏi phổi.',
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
    content: 'Every cell in your table is a real thing. Here they are down a microscope — match each photograph to the drawing you have just seen.',
    contentVn: 'Mỗi tế bào trong bảng của em đều là vật thật. Đây là chúng qua kính hiển vi — hãy ghép mỗi bức ảnh với hình vẽ em vừa xem.',
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

  // 11 ─ Root hair cell + CHECK 4 ───────────────────────────────────────────
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
      'Each one has a long, thin **extension** pushing out between the soil grains — a big surface for water to move in through.\n\n' +
      '> **Root hair cell.** Function: absorbs water from the soil. Structure: a long, thin **root hair**. How this helps: a big surface, so water moves in easily.',
    contentVn:
      'Tế bào lông hút mọc ở mặt ngoài **rễ** cây. **Chức năng** của chúng là **hấp thụ** — hút — nước từ đất.\n\n' +
      'Mỗi tế bào có một phần **kéo dài** dài và mảnh, đẩy ra giữa các hạt đất — một bề mặt lớn để nước đi vào.\n\n' +
      '> **Tế bào lông hút.** Chức năng: hấp thụ nước từ đất. Cấu trúc: một **lông hút** dài và mảnh. Điều này giúp: bề mặt lớn, nên nước đi vào dễ dàng.',
    reveal: {
      label: 'Page 20, Question 4 — which parts does the water pass through?',
      labelVn: 'Trang 20, Câu hỏi 4 — nước đi qua những bộ phận nào?',
      answer: 'Going from the soil to the sap vacuole, the water passes through the **cell wall → cell membrane → cytoplasm → vacuole**, in that order.',
      answerVn: 'Đi từ đất vào không bào, nước đi qua **thành tế bào → màng tế bào → tế bào chất → không bào**, theo đúng thứ tự đó.',
    },
    check: {
      id: 'c4',
      q: 'A root hair cell is a plant cell, but it has **no chloroplasts**. Why not?',
      qVn: 'Tế bào lông hút là tế bào thực vật, nhưng **không có lục lạp**. Vì sao?',
      options: [
        { val: 'A', text: 'It is too small to hold them', textVn: 'Nó quá nhỏ để chứa lục lạp' },
        { val: 'B', text: 'Roots are underground in the dark, so there is no sunlight to use', textVn: 'Rễ nằm dưới đất trong bóng tối, nên không có ánh sáng để dùng' },
        { val: 'C', text: 'It is really an animal cell', textVn: 'Thực ra nó là tế bào động vật' },
      ],
      correct: 'B',
      expEn: 'Chloroplasts use **sunlight** to make food. Roots are **underground, in the dark**, so chloroplasts would be useless there — a cell only builds the parts its job needs. It still has a cell wall, so it is a plant cell.',
      expVn: 'Lục lạp dùng **ánh sáng mặt trời** để tạo thức ăn. Rễ nằm **dưới đất, trong bóng tối**, nên lục lạp sẽ vô dụng ở đó — tế bào chỉ tạo những bộ phận mà nhiệm vụ của nó cần. Nó vẫn có thành tế bào, nên là tế bào thực vật.',
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
      'They are packed with **chloroplasts**, which hold the green **chlorophyll** that absorbs energy from sunlight.\n\n' +
      '> **Palisade cell.** Function: makes food by photosynthesis. Structure: packed with **chloroplasts**, and tall. How this helps: it catches as much sunlight as possible.',
    contentVn:
      'Tế bào mô giậu nằm trong **lá** cây. **Chức năng** của chúng là tạo thức ăn bằng **quang hợp**.\n\n' +
      'Chúng chứa đầy **lục lạp**, bên trong có **diệp lục** màu xanh hấp thụ năng lượng từ ánh sáng mặt trời.\n\n' +
      '> **Tế bào mô giậu.** Chức năng: quang hợp tạo thức ăn. Cấu trúc: chứa đầy **lục lạp**, và cao. Điều này giúp: bắt được nhiều ánh sáng nhất có thể.',
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
    icon: 'Microscope',
    tone: 'plant',
    columns: 2,
    eyebrow: 'The plant cells, for real',
    eyebrowVn: 'Tế bào thực vật, ngoài đời thực',
    title: 'Down a Real Microscope',
    titleVn: 'Nhìn qua kính hiển vi thật',
    content: 'And the two plant cells, as they really look. Match each one to the drawing you have just seen.',
    contentVn: 'Và hai tế bào thực vật, đúng như chúng trông thật. Hãy ghép mỗi cái với hình vẽ em vừa xem.',
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

  // 15 ─ The plant table (self-check) ───────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Grid3x3',
    eyebrow: 'Learner’s Book, page 21 · Activity 1.3.2',
    eyebrowVn: 'Sách học sinh, trang 21 · Hoạt động 1.3.2',
    title: 'Now the Plant Cells — On Your Own',
    titleVn: 'Giờ đến tế bào thực vật — em tự làm',
    inlineSvg: DIAGRAMS.PLANT_TABLE,
    drawThis: true,
    content: 'A **second** table, the same four columns. This time nothing is filled in for you — you already have both rows in your notes.',
    contentVn: 'Một bảng **thứ hai**, vẫn bốn cột như vậy. Lần này không có gì làm sẵn — em đã có sẵn cả hai dòng trong vở rồi.',
    steps: [
      { text: 'Rule up the four columns again, and give this table a **title** too.', textVn: 'Kẻ lại bốn cột, và cũng đặt **tiêu đề** cho bảng này.' },
      { text: 'Fill in the **root hair cell** row, then the **palisade cell** row.', textVn: 'Điền dòng **tế bào lông hút**, rồi dòng **tế bào mô giậu**.' },
      { text: 'Check your own table against the four points below.', textVn: 'Tự kiểm tra bảng của em theo bốn điểm dưới đây.' },
    ],
    reveal: {
      label: 'Self-check — what a good table has',
      labelVn: 'Tự kiểm tra — một bảng tốt có những gì',
      answer:
        'Give yourself a tick for each one:\n\n' +
        '**1.** The lines are **ruled**, not drawn freehand.\n' +
        '**2.** Every **column has a heading**, and the table has a title.\n' +
        '**3.** Each **row is named** with one of the two plant cells.\n' +
        '**4.** The descriptions are **short and clear** — not copied sentences from the book.',
      answerVn:
        'Cho mình một dấu tích ở mỗi mục:\n\n' +
        '**1.** Các đường kẻ được **kẻ bằng thước**, không vẽ tay.\n' +
        '**2.** Mỗi **cột đều có tiêu đề**, và bảng có tên.\n' +
        '**3.** Mỗi **dòng được đặt tên** bằng một trong hai tế bào thực vật.\n' +
        '**4.** Phần mô tả **ngắn gọn và rõ ràng** — không chép nguyên câu từ sách.',
    },
  },

  // 16 ─ Structure fits function (the sentence frame) + CHECK 5 ─────────────
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
      label: 'Your turn — finish this one on paper, then check',
      labelVn: 'Đến lượt em — hoàn thành câu này ra giấy, rồi kiểm tra',
      prompt: '“A palisade cell is adapted to ______ because it has ______ .”',
      promptVn: '“A palisade cell is adapted to ______ because it has ______ .”',
      answer: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**.',
      answerVn: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**. (Tế bào mô giậu thích nghi để quang hợp vì nó có nhiều lục lạp gần mặt trên của lá.)',
    },
    check: {
      id: 'c5',
      q: 'Which sentence uses the frame correctly for a **neurone**?',
      qVn: 'Câu nào dùng mẫu câu đúng cho **tế bào thần kinh**?',
      options: [
        { val: 'A', text: 'A neurone is adapted to carry oxygen because it has haemoglobin.', textVn: 'A neurone is adapted to carry oxygen because it has haemoglobin.' },
        { val: 'B', text: 'A neurone is adapted to carry electrical signals because it has a very long axon.', textVn: 'A neurone is adapted to carry electrical signals because it has a very long axon.' },
        { val: 'C', text: 'A neurone is adapted to absorb water because it has a long root hair.', textVn: 'A neurone is adapted to absorb water because it has a long root hair.' },
      ],
      correct: 'B',
      expEn: 'Job, then the feature that fits it: a neurone carries **electrical signals**, and its **long axon** lets them travel far and fast. A describes a red blood cell; C describes a root hair cell.',
      expVn: 'Nhiệm vụ, rồi đặc điểm phù hợp: tế bào thần kinh truyền **tín hiệu điện**, và **sợi trục dài** cho phép tín hiệu đi xa và nhanh. A mô tả hồng cầu; C mô tả tế bào lông hút.',
    },
  },

  // 17 ─ Say it before you see it (widget) ──────────────────────────────────
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
        badge: 'On paper',
        badgeVn: 'Trên giấy',
        text: 'Write the cell’s job **before** you press the button. Use the sentence frame if it helps.',
        textVn: 'Viết nhiệm vụ của tế bào **trước khi** bấm nút. Dùng mẫu câu nếu cần.',
      },
    ],
    widget: SpecialisedCellWidget,
  },

  // 18 ─ Recap ──────────────────────────────────────────────────────────────
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
      '> Your notebook should now have **2 definitions**, the **sentence frame**, and **2 tables** — 3 animal rows and 2 plant rows. Check. Exit question: the small purple **white blood cell** in the blood photograph chases germs and swallows them whole. Why would a **fixed** shape be no good for that job?',
    contentVn:
      '> Trong vở của em bây giờ phải có **2 định nghĩa**, **mẫu câu**, và **2 bảng** — 3 dòng động vật và 2 dòng thực vật. Hãy kiểm tra. Câu hỏi ra về: con **bạch cầu** nhỏ màu tím trong bức ảnh máu đuổi theo vi khuẩn và nuốt trọn chúng. Vì sao một hình dạng **cố định** lại không phù hợp với nhiệm vụ đó?',
    items: [
      { text: 'Say what **function** and **specialised** mean.', textVn: 'Nói được **chức năng** và **chuyên hoá** nghĩa là gì.' },
      { text: 'Name the **three** specialised animal cells and each one’s job.', textVn: 'Kể **ba** tế bào động vật chuyên hoá và nhiệm vụ của từng cái.' },
      { text: 'Name the **two** specialised plant cells and each one’s job.', textVn: 'Kể **hai** tế bào thực vật chuyên hoá và nhiệm vụ của từng cái.' },
      { text: 'Use the frame: **adapted to ___ because it has ___**.', textVn: 'Dùng mẫu câu: **adapted to ___ because it has ___**.' },
      { text: 'Explain why a root hair cell has **no chloroplasts**.', textVn: 'Giải thích vì sao tế bào lông hút **không có lục lạp**.' },
      { text: 'Build a clear **table** with ruled lines and column headings.', textVn: 'Lập được một **bảng** rõ ràng, kẻ thước và có tiêu đề cột.' },
    ],
  },
];
