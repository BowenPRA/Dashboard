// src/data/Y7_SCI/U01_4/notes.js
// 1.4 Cells, Tissues and Organs — a self-study reduction of the classroom
// deck (C:\Users\bowen\lessons, content/y7-science/U01_4). 17 layout slides,
// 5 checks.
//
// The spine is one ladder, climbed once, with ONE example on every rung:
// ciliated cell → ciliated epithelium → a lung → the breathing system → you.
// Reduced from 22 classroom slides: the "one leaf" guess folds into the slide
// that answers it, the "lungs alone" question folds into the organ-system
// callout, the group organ relay and the homework go. Every photograph is
// credited in docs/credits.md. The `check:` block is always the LAST key.
import { DIAGRAMS } from './diagrams.js';
import { LevelDrillWidget } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U01_4/${f}`);

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
    icon: 'Boxes',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 1 · 1.4',
    eyebrowVn: 'Chương 1 · 1.4',
    title: 'From One Cell to a Whole Body',
    titleVn: 'Từ một tế bào đến cả cơ thể',
    objective: 'Explain the words tissue, organ, organ system and organism, and put a real example on every rung of the ladder from one cell up to a whole living thing.',
    objectiveVn: 'Giải thích các từ mô, cơ quan, hệ cơ quan và sinh vật, và đặt một ví dụ thật lên mỗi bậc thang từ một tế bào lên đến cả một cơ thể sống.',
    card: {
      icon: 'Pencil',
      badge: 'Starter · 4 minutes',
      badgeVn: 'Khởi động · 4 phút',
      text: 'Draw an outline of a human body. Then sketch and label these five organs inside it: **brain · heart · stomach · intestine · lungs**. A rough drawing is fine.',
      textVn: 'Vẽ hình phác một cơ thể người. Rồi vẽ và ghi tên năm cơ quan này bên trong: **brain (não) · heart (tim) · stomach (dạ dày) · intestine (ruột) · lungs (phổi)**. Vẽ nháp là được.',
    },
  },

  // 2 ─ Check the drawing ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'CheckCircle2',
    eyebrow: 'Getting started · check your drawing',
    eyebrowVn: 'Khởi động · kiểm tra hình vẽ của em',
    title: 'Did You Put Them in the Right Places?',
    titleVn: 'Em đã đặt chúng đúng chỗ chưa?',
    ratio: 40,
    inlineSvg: DIAGRAMS.HUMAN_ORGANS,
    content: 'Nobody gets all five exactly right, and that is fine. The **stomach** sits higher than most people draw it, and the **intestines** fill nearly the whole space below it.',
    contentVn: 'Không ai đặt đúng cả năm cơ quan, và điều đó không sao. **Dạ dày** nằm cao hơn hầu hết mọi người vẽ, và **ruột** chiếm gần hết khoảng trống bên dưới.',
    notes: [
      {
        tone: 'task',
        badge: 'Stand up',
        badgeVn: 'Đứng lên',
        icon: 'Users',
        text: 'Point to each one **on yourself**, saying its name in English: brain — lungs — heart — stomach — intestines. Then sit down.',
        textVn: 'Chỉ vào từng cơ quan **trên cơ thể em**, nói tên bằng tiếng Anh: brain — lungs — heart — stomach — intestines. Rồi ngồi xuống.',
      },
    ],
  },

  // 3 ─ The hook: one ciliated cell ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Two minutes — write a reason before you go on',
    eyebrowVn: 'Hai phút — viết một lý do trước khi tiếp tục',
    title: 'Could This One Cell Keep Your Lungs Clean?',
    titleVn: 'Một tế bào này có giữ sạch phổi em được không?',
    inlineSvg: DIAGRAMS.ONE_CILIATED_CELL,
    caption: 'You met this cell last lesson. Its cilia beat about **twelve times every second**, sweeping dust and germs up and away from your lungs. Here is exactly one of them. Would **one** be enough? Write down a reason.',
    captionVn: 'Em đã gặp tế bào này tiết trước. Lông rung của nó đập khoảng **mười hai lần mỗi giây**, quét bụi và vi khuẩn ra xa khỏi phổi. Đây là đúng một tế bào như vậy. **Một** cái có đủ không? Hãy viết ra một lý do.',
  },

  // 4 ─ Millions side by side (key word: tissue) + CHECK 1 ──────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Layers',
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    title: 'No. It Takes Millions, Side by Side.',
    titleVn: 'Không. Phải cần hàng triệu, sát cạnh nhau.',
    ratio: 52,
    inlineSvg: DIAGRAMS.CILIATED_EPITHELIUM,
    content:
      'One cell sweeps a speck. To clear a whole airway you need **millions** of them, joined edge to edge, all beating the same way at the same time — like grass bending in the wind.\n\n' +
      'A group of cells like that has its own name, and it is the first new word today: a **tissue**.',
    contentVn:
      'Một tế bào chỉ quét được một hạt bụi. Để làm sạch cả đường thở cần **hàng triệu** tế bào, nối liền nhau, cùng đập một hướng cùng một lúc — như cỏ ngả theo gió.\n\n' +
      'Một nhóm tế bào như thế có tên riêng, và đó là từ mới đầu tiên hôm nay: **mô (tissue)**.',
    notes: [
      {
        tone: 'write',
        text: '**Tissue:** a group of **similar** cells, all working together to carry out **one particular job**.',
        textVn: '**Mô (tissue):** một nhóm tế bào **giống nhau**, cùng làm việc với nhau để thực hiện **một nhiệm vụ nhất định**.',
      },
    ],
    check: {
      id: 'c1',
      q: 'What is a **tissue**?',
      qVn: '**Mô (tissue)** là gì?',
      options: [
        { val: 'A', text: 'A group of similar cells working together on one job', textVn: 'Một nhóm tế bào giống nhau cùng làm một nhiệm vụ' },
        { val: 'B', text: 'A structure made of several different tissues', textVn: 'Một cấu trúc tạo nên từ nhiều loại mô khác nhau' },
        { val: 'C', text: 'Any living thing', textVn: 'Bất kỳ cơ thể sống nào' },
      ],
      correct: 'A',
      expEn: 'A tissue is a group of **similar** cells — the same kind — all doing **one job** together, like the millions of ciliated cells lining your airways. B is an organ; C is an organism.',
      expVn: 'Mô là một nhóm tế bào **giống nhau** — cùng loại — cùng làm **một nhiệm vụ**, như hàng triệu tế bào có lông rung lót đường thở. B là cơ quan; C là sinh vật.',
    },
  },

  // 5 ─ Ciliated epithelium, the real thing ─────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Microscope',
    eyebrow: 'The real thing',
    eyebrowVn: 'Vật thật',
    title: 'Ciliated Epithelium',
    titleVn: 'Biểu mô có lông rung',
    ratio: 45,
    image: img('trachea.jpg'),
    content: 'The lining of a real windpipe. Every cell along that edge is the **same kind** of cell, and the **fuzzy dark band** on top is millions of cilia.\n\nIts name is **ciliated epithelium** — and *epithelium* just means a tissue that covers a surface.',
    contentVn: 'Lớp lót của một khí quản thật. Mọi tế bào dọc mép đó đều **cùng một loại**, và **dải sẫm lởm chởm** phía trên là hàng triệu lông rung.\n\nTên của nó là **biểu mô có lông rung (ciliated epithelium)** — và *epithelium* chỉ có nghĩa là mô phủ lên một bề mặt.',
    reveal: {
      label: 'Page 23, Question 1 — what is this tissue’s function?',
      labelVn: 'Trang 23, Câu hỏi 1 — chức năng của mô này là gì?',
      answer: 'To **keep the airways clean**: the cilia sweep mucus, and all the dust and germs trapped in it, **up and away from the lungs**. One ciliated cell does that job in one tiny spot. The tissue does it along the whole tube.',
      answerVn: 'Để **giữ sạch đường thở**: lông rung quét chất nhầy, cùng toàn bộ bụi và vi khuẩn dính trong đó, **lên và ra xa khỏi phổi**. Một tế bào có lông rung làm việc đó ở một điểm nhỏ. Cả mô làm việc đó dọc toàn bộ ống.',
    },
  },

  // 6 ─ Onion epidermis ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Leaf',
    eyebrow: 'Plants have tissues too',
    eyebrowVn: 'Thực vật cũng có mô',
    title: 'Onion Epidermis',
    titleVn: 'Biểu bì hành tây',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.ONION_EPIDERMIS,
    content:
      '**Tissue** is not a human word, or even an animal word. Cut open an onion and every layer inside is wrapped in a thin skin. That skin is a tissue, and it is called the **onion epidermis**.\n\n' +
      'Look at what makes it a tissue: every cell is the **same kind**, they are **joined edge to edge** with no gaps, and together they do **one job** — covering and protecting the surface.',
    contentVn:
      '**Mô** không phải là từ chỉ dành cho người, cũng không chỉ dành cho động vật. Bổ củ hành ra, mỗi lớp bên trong đều được bọc bởi một lớp da mỏng. Lớp da đó là một mô, và nó tên là **biểu bì hành tây (onion epidermis)**.\n\n' +
      'Hãy xem điều gì làm nó thành một mô: mọi tế bào đều **cùng loại**, chúng **nối liền nhau** không có khe hở, và cùng nhau làm **một nhiệm vụ** — che phủ và bảo vệ bề mặt.',
  },

  // 7 ─ You have held this tissue + CHECK 2 ─────────────────────────────────
  {
    layout: 'compare',
    accent: GREEN,
    icon: 'ScanEye',
    eyebrow: 'The same skin, twice',
    eyebrowVn: 'Cùng một lớp da, hai lần',
    title: 'You Have Held This Tissue in Your Hand',
    titleVn: 'Em đã từng cầm mô này trên tay',
    columns: [
      {
        heading: 'In the kitchen',
        headingVn: 'Trong bếp',
        accent: '#a3762f',
        icon: 'Leaf',
        image: img('onion.jpg'),
        caption: 'A cut onion. See the **thin see-through skin** peeling away from the layers on the left? That is the piece you can lift off with your fingers.',
        captionVn: 'Một củ hành đã cắt. Thấy **lớp da mỏng trong suốt** đang bong ra khỏi các lớp ở bên trái không? Đó là mảnh em có thể bóc ra bằng tay.',
      },
      {
        heading: 'Under the microscope',
        headingVn: 'Dưới kính hiển vi',
        accent: GREEN,
        icon: 'Microscope',
        image: img('onionepi.jpg'),
        caption: 'The same skin, magnified. It is **one cell thick**, and every cell is packed against its neighbours like bricks in a wall. That is a tissue.',
        captionVn: 'Cũng lớp da đó, phóng to lên. Nó **dày đúng một tế bào**, và mọi tế bào đều xếp sát vào nhau như gạch trong một bức tường. Đó là một mô.',
      },
    ],
    check: {
      id: 'c2',
      q: 'What makes the onion skin a **tissue**?',
      qVn: 'Điều gì làm lớp da hành thành một **mô**?',
      options: [
        { val: 'A', text: 'It is made of many different kinds of cell', textVn: 'Nó được tạo nên từ nhiều loại tế bào khác nhau' },
        { val: 'B', text: 'It is one kind of cell, joined edge to edge, doing one job', textVn: 'Nó là một loại tế bào, nối liền nhau, cùng làm một nhiệm vụ' },
        { val: 'C', text: 'It is green', textVn: 'Nó có màu xanh' },
      ],
      correct: 'B',
      expEn: 'A tissue is **similar** cells (the same kind), joined together, doing **one job** — here, covering and protecting the surface. Many different kinds of cell working together would be an organ. And it is not green: onion cells have no chloroplasts.',
      expVn: 'Mô là các tế bào **giống nhau** (cùng loại), nối liền nhau, làm **một nhiệm vụ** — ở đây là che phủ và bảo vệ bề mặt. Nhiều loại tế bào khác nhau cùng làm việc thì là cơ quan. Và nó không xanh: tế bào hành không có lục lạp.',
    },
  },

  // 8 ─ Two kinds of tissue (English) + CHECK 3 ─────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Every science class is an English class',
    eyebrowVn: 'Mỗi tiết khoa học đều là tiết tiếng Anh',
    title: 'Two Kinds of Tissue',
    titleVn: 'Hai loại "tissue"',
    ratio: 46,
    content:
      'Ask for **a tissue** in a shop and you get a paper handkerchief. That is the everyday meaning, and it is **countable**: one tissue, two tissues, a box of tissues.\n\n' +
      'In science, **tissue** means a group of similar cells — and it is usually **uncountable**: we say *muscle tissue*, not *a muscle tissue*.\n\n' +
      'Same five letters, completely different meaning.',
    contentVn:
      'Xin **a tissue** ở cửa hàng thì em nhận được một tờ khăn giấy. Đó là nghĩa đời thường, và nó **đếm được**: one tissue, two tissues, a box of tissues.\n\n' +
      'Trong khoa học, **tissue** nghĩa là một nhóm tế bào giống nhau — và nó thường **không đếm được**: ta nói *muscle tissue*, chứ không nói *a muscle tissue*.\n\n' +
      'Cùng năm chữ cái, nghĩa hoàn toàn khác.',
    notes: [
      {
        tone: 'write',
        badge: 'Page 23, Question 2',
        badgeVn: 'Trang 23, Câu hỏi 2',
        text: 'Write **two sentences of your own**. In the first, use *tissue* with its **everyday** meaning. In the second, use *tissue* with its **scientific** meaning.',
        textVn: 'Viết **hai câu của riêng em**. Câu đầu dùng *tissue* với nghĩa **đời thường**. Câu sau dùng *tissue* với nghĩa **khoa học**.',
      },
    ],
    reveal: {
      label: 'If you are stuck — two examples',
      labelVn: 'Nếu em bí — hai ví dụ',
      answer:
        '**Everyday:** “Mr Bowen sneezed, so he took **a tissue** out of the box.”\n\n' +
        '**Scientific:** “The wall of the stomach contains **muscle tissue**.”\n\n' +
        'Now write two different ones. Do not copy these.',
      answerVn:
        '**Đời thường:** “Mr Bowen sneezed, so he took **a tissue** out of the box.” (Thầy Bowen hắt hơi, nên thầy lấy một tờ khăn giấy ra khỏi hộp.)\n\n' +
        '**Khoa học:** “The wall of the stomach contains **muscle tissue**.” (Thành dạ dày chứa mô cơ.)\n\n' +
        'Bây giờ hãy viết hai câu khác. Đừng chép hai câu này.',
    },
    check: {
      id: 'c3',
      q: 'Which sentence uses *tissue* with its **scientific** meaning?',
      qVn: 'Câu nào dùng *tissue* với nghĩa **khoa học**?',
      options: [
        { val: 'A', text: 'She wiped her nose with a tissue.', textVn: 'She wiped her nose with a tissue.' },
        { val: 'B', text: 'Please pass me the box of tissues.', textVn: 'Please pass me the box of tissues.' },
        { val: 'C', text: 'The lining of the windpipe is a tissue made of ciliated cells.', textVn: 'The lining of the windpipe is a tissue made of ciliated cells.' },
      ],
      correct: 'C',
      expEn: 'Only C means a **group of similar cells**. A and B are paper handkerchiefs — the everyday, countable meaning.',
      expVn: 'Chỉ câu C mang nghĩa **một nhóm tế bào giống nhau**. A và B là khăn giấy — nghĩa đời thường, đếm được.',
    },
  },

  // 9 ─ One leaf, four tissues (key word: organ) + CHECK 4 ──────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Layers',
    eyebrow: 'A leaf is one part of a plant — how many kinds of tissue are inside it?',
    eyebrowVn: 'Lá là một bộ phận của cây — bên trong nó có bao nhiêu loại mô?',
    title: 'Four Different Tissues, Stacked',
    titleVn: 'Bốn loại mô khác nhau, xếp chồng lên nhau',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.LEAF_SECTION,
    content: 'Guess first. Last lesson you drew the palisade cell, and it lives in a leaf — so a leaf has palisade tissue. Is that all?\n\nNo. Flat **epidermis** on top and underneath, protecting the leaf. Tall **palisade** cells packed with chloroplasts, catching the light. Loose **spongy** cells with air gaps, letting gases move around.\n\nFour tissues, four jobs, one leaf.',
    contentVn: 'Đoán trước. Tiết trước em đã vẽ tế bào mô giậu, và nó nằm trong lá — vậy lá có mô giậu. Chỉ có thế thôi sao?\n\nKhông. **Biểu bì** dẹt ở trên và ở dưới, bảo vệ lá. Tế bào **mô giậu** cao chứa đầy lục lạp, bắt lấy ánh sáng. Tế bào **mô xốp** lỏng lẻo có khe khí, cho khí di chuyển.\n\nBốn loại mô, bốn nhiệm vụ, một chiếc lá.',
    notes: [
      {
        tone: 'write',
        text: '**Organ:** a structure made of **several different tissues**, all working together. A leaf is a plant organ. So are roots and flowers.',
        textVn: '**Cơ quan (organ):** một cấu trúc tạo nên từ **nhiều loại mô khác nhau**, cùng làm việc với nhau. Lá là một cơ quan của thực vật. Rễ và hoa cũng vậy.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Why is a leaf an **organ** and not a tissue?',
      qVn: 'Vì sao lá là một **cơ quan** chứ không phải một mô?',
      options: [
        { val: 'A', text: 'Because it is made of several different tissues working together', textVn: 'Vì nó được tạo nên từ nhiều loại mô khác nhau cùng làm việc' },
        { val: 'B', text: 'Because it is green', textVn: 'Vì nó có màu xanh' },
        { val: 'C', text: 'Because it is made of one kind of cell', textVn: 'Vì nó được tạo nên từ một loại tế bào' },
      ],
      correct: 'A',
      expEn: 'An organ is **several different tissues** working together — a leaf has epidermis, palisade and spongy tissue, at least. One kind of cell (C) would make it a tissue.',
      expVn: 'Cơ quan là **nhiều loại mô khác nhau** cùng làm việc — lá có ít nhất biểu bì, mô giậu và mô xốp. Một loại tế bào (C) thì chỉ là một mô.',
    },
  },

  // 10 ─ A real leaf ────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Microscope',
    eyebrow: 'The real thing',
    eyebrowVn: 'Vật thật',
    title: 'A Real Leaf, Sliced Across',
    titleVn: 'Một chiếc lá thật, cắt ngang',
    image: img('leaf.jpg'),
    caption: 'The same four layers in a real leaf, in the same order. Find the **flat cells on the top edge**, then the **tall purple columns** just below them, then the **round loose cells with gaps**, then the flat cells again at the bottom.',
    captionVn: 'Vẫn bốn lớp đó trong một chiếc lá thật, theo đúng thứ tự. Hãy tìm **các tế bào dẹt ở mép trên**, rồi **những cột tím cao** ngay bên dưới, rồi **các tế bào tròn lỏng lẻo có khe hở**, rồi lại là các tế bào dẹt ở dưới cùng.',
  },

  // 11 ─ Find them on the X-ray ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'ScanEye',
    eyebrow: 'Your organs — in a living person, right now',
    eyebrowVn: 'Các cơ quan của em — trong một người đang sống, ngay lúc này',
    title: 'Find Them on the X-ray',
    titleVn: 'Hãy tìm chúng trên phim X-quang',
    ratio: 45,
    image: img('chestxray.jpg'),
    content: 'Your brain contains neurones **and** several other kinds of cell. Your heart, stomach and lungs are organs too — each one built from several tissues.\n\nLook for the two dark **lungs**, the pale **heart** shadow between them, and the black **bubble of gas** at the top of the stomach, bottom left.',
    contentVn: 'Não em chứa tế bào thần kinh **và** vài loại tế bào khác nữa. Tim, dạ dày và phổi cũng là cơ quan — mỗi cái tạo nên từ nhiều loại mô.\n\nHãy tìm hai lá **phổi** sẫm màu, bóng **tim** nhạt màu ở giữa, và **bọt khí** đen ở đỉnh dạ dày, phía dưới bên trái.',
    reveal: {
      label: 'Which of your five starter organs can you NOT see here?',
      labelVn: 'Cơ quan nào trong năm cơ quan khởi động em KHÔNG nhìn thấy ở đây?',
      answer: 'The **brain** — it is above the picture — and the **intestines**, which are below it. An X-ray of the chest shows the lungs, the heart and the very top of the stomach.',
      answerVn: '**Não** — nó nằm phía trên bức ảnh — và **ruột**, nằm phía dưới. Phim X-quang ngực cho thấy phổi, tim và phần đỉnh dạ dày.',
    },
  },

  // 12 ─ Organs working in a team ───────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Your lungs cannot get oxygen to your big toe — so what else does it pass through?',
    eyebrowVn: 'Phổi không thể đưa oxy xuống ngón chân cái — vậy nó còn đi qua đâu nữa?',
    title: 'A Set of Organs, One Shared Job',
    titleVn: 'Một nhóm cơ quan, một nhiệm vụ chung',
    columns: [
      {
        heading: 'The breathing system',
        headingVn: 'Hệ hô hấp',
        accent: '#3d8fc4',
        icon: 'Droplet',
        inlineSvg: DIAGRAMS.RESPIRATORY_SYSTEM,
        caption: 'Shared job: **get oxygen into the body**. Not one of these organs can do it alone — the nose warms the air, the windpipe carries it, the lungs take the oxygen out.',
        captionVn: 'Nhiệm vụ chung: **đưa oxy vào cơ thể**. Không cơ quan nào trong số này làm được một mình — mũi làm ấm không khí, khí quản dẫn nó đi, phổi lấy oxy ra.',
      },
      {
        heading: 'The digestive system',
        headingVn: 'Hệ tiêu hoá',
        accent: '#c07a1e',
        icon: 'Sprout',
        inlineSvg: DIAGRAMS.DIGESTIVE_SYSTEM,
        caption: 'Shared job: **break food down and take it into the body**. The mouth chews, the gullet swallows, the stomach churns, the intestines absorb.',
        captionVn: 'Nhiệm vụ chung: **phân giải thức ăn và đưa nó vào cơ thể**. Miệng nhai, thực quản nuốt, dạ dày co bóp, ruột hấp thụ.',
      },
    ],
  },

  // 13 ─ Organ system, organism + CHECK 5 ───────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'The last two words',
    eyebrowVn: 'Hai từ cuối cùng',
    title: 'Organ System, and Organism',
    titleVn: 'Hệ cơ quan, và sinh vật',
    content: 'You have now met every word in the ladder. **Organism** is the one that surprises people: it is not a special kind of creature — it is just any living thing. A tree is an organism. So is a mosquito. So are you.',
    contentVn: 'Bây giờ em đã gặp đủ mọi từ trong bậc thang. **Sinh vật (organism)** là từ khiến nhiều người bất ngờ: nó không phải một loài đặc biệt nào — nó chỉ là bất kỳ cơ thể sống nào. Một cái cây là sinh vật. Một con muỗi cũng vậy. Em cũng vậy.',
    notes: [
      {
        tone: 'write',
        text:
          '**Organ system:** a set of **organs** that all work together to carry out the **same function**.\n' +
          '**Organism:** a living thing. It may contain many organ systems, organs and tissues.',
        textVn:
          '**Hệ cơ quan (organ system):** một nhóm **cơ quan** cùng làm việc với nhau để thực hiện **cùng một chức năng**.\n' +
          '**Sinh vật (organism):** một cơ thể sống. Nó có thể chứa nhiều hệ cơ quan, cơ quan và mô.',
      },
    ],
    reveal: {
      label: 'Organ relay — how many organs can you name in 90 seconds?',
      labelVn: 'Tiếp sức cơ quan — em kể được bao nhiêu cơ quan trong 90 giây?',
      answer: '**brain · heart · lungs · stomach · intestines · liver · kidneys · skin · eyes · ears · tongue · bones · muscles**. And yes — your **skin** is an organ. It is the biggest one you have.',
      answerVn: '**brain (não) · heart (tim) · lungs (phổi) · stomach (dạ dày) · intestines (ruột) · liver (gan) · kidneys (thận) · skin (da) · eyes (mắt) · ears (tai) · tongue (lưỡi) · bones (xương) · muscles (cơ)**. Và đúng vậy — **da** của em là một cơ quan. Nó là cơ quan lớn nhất em có.',
    },
    check: {
      id: 'c5',
      q: 'Which of these is an **organ system**?',
      qVn: 'Cái nào sau đây là một **hệ cơ quan**?',
      options: [
        { val: 'A', text: 'A leaf', textVn: 'Một chiếc lá' },
        { val: 'B', text: 'The digestive system', textVn: 'Hệ tiêu hoá' },
        { val: 'C', text: 'A red blood cell', textVn: 'Một tế bào hồng cầu' },
      ],
      correct: 'B',
      expEn: 'The **digestive system** is a set of organs — mouth, gullet, stomach, intestines — sharing one function. A leaf is an organ; a red blood cell is a cell.',
      expVn: '**Hệ tiêu hoá** là một nhóm cơ quan — miệng, thực quản, dạ dày, ruột — cùng chung một chức năng. Lá là một cơ quan; hồng cầu là một tế bào.',
    },
  },

  // 14 ─ The five levels (draw this) ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Learner’s Book, pages 22-24 · put it all together',
    eyebrowVn: 'Sách học sinh, trang 22-24 · ghép tất cả lại',
    title: 'The Five Levels',
    titleVn: 'Năm cấp độ',
    ratio: 40,
    inlineSvg: DIAGRAMS.LEVELS_LADDER,
    drawThis: true,
    content: 'One cell, climbing all the way up to a whole person — and it is the **same cell you were looking at ten minutes ago**.\n\nRead it left to right: each box is built out of the box before it.',
    contentVn: 'Một tế bào, đi lên hết đường đến cả một con người — và đó chính là **tế bào em đã nhìn cách đây mười phút**.\n\nĐọc từ trái sang phải: mỗi ô được tạo nên từ ô liền trước.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the five boxes and the four arrows. Use a **ruler**. Write the **orange word** in each box, and the example underneath it.',
        textVn: 'Chép năm ô và bốn mũi tên. Dùng **thước kẻ**. Viết **từ màu cam** trong mỗi ô, và ví dụ ở bên dưới.',
      },
    ],
  },

  // 15 ─ Which level is it? (widget) ────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Repeat',
    eyebrow: 'Decide before you press',
    eyebrowVn: 'Quyết định trước khi bấm',
    title: 'Which Level Is It?',
    titleVn: 'Đây là cấp độ nào?',
    ratio: 42,
    content:
      'One thing at a time on the screen. Decide which level it is — **1** for a cell, up to **5** for an organism — and say it out loud **before** you press the button.',
    contentVn:
      'Mỗi lần một thứ hiện trên màn hình. Hãy quyết định đó là cấp độ nào — **1** là tế bào, đến **5** là sinh vật — và nói to **trước khi** bấm nút.',
    notes: [
      {
        tone: 'task',
        badge: 'Look at your ladder',
        badgeVn: 'Nhìn vào sơ đồ của em',
        text: 'Your Draw This has the five levels in the right order. Use it. That is what notes are for.',
        textVn: 'Hình em vừa vẽ có đủ năm cấp độ theo đúng thứ tự. Hãy dùng nó. Ghi chép là để dùng như vậy.',
      },
    ],
    widget: LevelDrillWidget,
  },

  // 16 ─ Question 3, as a hunt ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 24 · Question 3',
    eyebrowVn: 'Sách học sinh, trang 24 · Câu hỏi 3',
    title: 'The Answers Are Already in Your Notebook',
    titleVn: 'Đáp án đã có sẵn trong vở của em',
    ratio: 55,
    content:
      'Choose from: **organism · tissue · organ · organ system**. Say each answer out loud, then **point to where you wrote it** today.\n\n' +
      '> **a.** A group of similar cells is called a ______ .\n' +
      '> **b.** An ______ is a structure made of many different tissues.\n' +
      '> **c.** An ______ is a group of organs that carry out a particular function.\n' +
      '> **d.** An ______ is a living thing.',
    contentVn:
      'Chọn trong: **organism · tissue · organ · organ system**. Nói to từng đáp án, rồi **chỉ vào chỗ em đã viết nó** hôm nay.\n\n' +
      '> **a.** A group of similar cells is called a ______ .\n' +
      '> **b.** An ______ is a structure made of many different tissues.\n' +
      '> **c.** An ______ is a group of organs that carry out a particular function.\n' +
      '> **d.** An ______ is a living thing.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**a.** tissue  ·  **b.** organ  ·  **c.** organ system  ·  **d.** organism\n\nIf you could not point to one of them, that is the definition to copy up now.',
      answerVn: '**a.** tissue (mô)  ·  **b.** organ (cơ quan)  ·  **c.** organ system (hệ cơ quan)  ·  **d.** organism (sinh vật)\n\nNếu em không chỉ được chỗ đã viết một định nghĩa nào đó, thì hãy chép lại đúng định nghĩa ấy ngay bây giờ.',
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
      '> Your notebook should now have **1 body outline**, **4 definitions**, **2 sentences of your own**, and **1 labelled ladder**. Check. Exit question: a **jellyfish** has no heart, no lungs and no brain. It is still an organism. So which of the five levels can a living thing manage **without**?',
    contentVn:
      '> Trong vở của em bây giờ phải có **1 hình cơ thể**, **4 định nghĩa**, **2 câu của riêng em**, và **1 sơ đồ năm cấp độ có ghi chú**. Hãy kiểm tra. Câu hỏi ra về: một con **sứa** không có tim, không có phổi và không có não. Nó vẫn là một sinh vật. Vậy một cơ thể sống có thể **thiếu** cấp độ nào trong năm cấp độ đó?',
    items: [
      { text: 'Explain what a **tissue** is, and give one animal and one plant example.', textVn: 'Giải thích **mô** là gì, và nêu một ví dụ ở động vật và một ở thực vật.' },
      { text: 'Explain what an **organ** is, and say why a leaf is one.', textVn: 'Giải thích **cơ quan** là gì, và nói vì sao lá là một cơ quan.' },
      { text: 'Explain what an **organ system** is, and name two of them.', textVn: 'Giải thích **hệ cơ quan** là gì, và kể tên hai hệ.' },
      { text: 'Name **five human organs** and point to each on yourself.', textVn: 'Kể **năm cơ quan của người** và chỉ vào từng cái trên cơ thể em.' },
      { text: 'Say the five levels **in order**, from cell up to organism.', textVn: 'Nói năm cấp độ **theo đúng thứ tự**, từ tế bào lên sinh vật.' },
      { text: 'Use the word *tissue* correctly in **both** of its meanings.', textVn: 'Dùng đúng từ *tissue* ở **cả hai** nghĩa của nó.' },
    ],
  },
];
