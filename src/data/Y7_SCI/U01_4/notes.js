// src/data/Y7_SCI/U01_4/notes.js
// 1.4 Cells, Tissues and Organs — rebuilt to the engagement plan
// (docs/y7-science/ENGAGEMENT-PLAN.md). 18 layout slides; 6 scored items — three
// interactive activities (hotspot · sort · order) and three checks.
//
// The classroom deck opened with "draw a body outline on paper"; this one opens
// with a tap on the body itself. The spine is still one ladder, climbed once,
// with one example on every rung — ciliated cell → ciliated epithelium →
// a lung → the breathing system → you — but the student now sorts and orders
// that ladder instead of only reading it. Every classroom-only instruction
// (stand up, point on yourself, the organ relay, "write two sentences",
// "your notebook should now have…") has been removed or turned into something
// the student does on screen; the one exception is the five-level ladder
// draw-this, kept as the plan allows. Every photograph is credited in
// docs/credits.md. A `check:` or `activity:` block is always the LAST key on
// its slide, and never both on the same slide.
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
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
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
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **tap**, **sort** and **order** your way up the ladder from one cell to a whole body. Six things are scored — the diagram on the next slide is the first.',
      textVn: 'Em sẽ **chạm**, **sắp xếp** và **xếp thứ tự** để leo lên bậc thang từ một tế bào đến cả cơ thể. Sáu mục được tính điểm — hình ở slide sau là mục đầu tiên.',
    },
  },

  // 2 ─ Where is your stomach: HOTSPOT ─────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Tap the diagram',
    eyebrowVn: 'Chạm vào hình',
    title: 'Where Is Your Stomach?',
    titleVn: 'Dạ dày của em ở đâu?',
    label: 'Guess first',
    labelVn: 'Đoán trước',
    labelIcon: 'Target',
    text: 'Most people place it **too low**, somewhere near the belly button.',
    textVn: 'Hầu hết mọi người đặt nó **quá thấp**, gần chỗ rốn.',
    sub: 'Tap where you think the stomach really is. You get two tries.',
    subVn: 'Chạm vào chỗ em nghĩ dạ dày thật sự nằm. Em có hai lần thử.',
    activity: {
      id: 'a1', type: 'hotspot',
      prompt: 'Tap the **stomach**.',
      promptVn: 'Chạm vào **dạ dày**.',
      svg: DIAGRAMS.HUMAN_ORGANS, viewBox: '0 0 700 420',
      targets: [
        { id: 'stomach', x: 332, y: 300, r: 26, name: 'the stomach', nameVn: 'dạ dày' },
        { id: 'brain', x: 322, y: 58, r: 26, name: 'the brain', nameVn: 'não' },
        { id: 'lungs', x: 328, y: 220, r: 26, name: 'the lungs', nameVn: 'phổi' },
        { id: 'heart', x: 358, y: 254, r: 26, name: 'the heart', nameVn: 'tim' },
        { id: 'intestines', x: 392, y: 368, r: 26, name: 'the intestines', nameVn: 'ruột' },
      ],
      correct: 'stomach',
      explain: 'The **stomach** sits much higher than most people think — just under the ribs, about where the lungs end. Nearly the whole space below it belongs to the **intestines**.',
      explainVn: '**Dạ dày** nằm cao hơn nhiều so với hầu hết mọi người nghĩ — ngay dưới xương sườn, gần chỗ phổi kết thúc. Gần như toàn bộ khoảng trống bên dưới nó thuộc về **ruột**.',
    },
  },

  // 3 ─ The hook: one ciliated cell ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Look closely, then decide',
    eyebrowVn: 'Nhìn kỹ, rồi quyết định',
    title: 'Could This One Cell Keep Your Lungs Clean?',
    titleVn: 'Một tế bào này có giữ sạch phổi em được không?',
    inlineSvg: DIAGRAMS.ONE_CILIATED_CELL,
    caption: 'You met this cell last lesson. Its cilia beat about **twelve times every second**, sweeping dust and germs up and away from your lungs. Here is exactly one of them. Would **one** be enough?',
    captionVn: 'Em đã gặp tế bào này tiết trước. Lông rung của nó đập khoảng **mười hai lần mỗi giây**, quét bụi và vi khuẩn ra xa khỏi phổi. Đây là đúng một tế bào như vậy. **Một** cái có đủ không?',
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
      label: 'What is this tissue’s function?',
      labelVn: 'Chức năng của mô này là gì?',
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

  // 7 ─ You have held this tissue ────────────────────────────────────────────
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
  },

  // 8 ─ Two kinds of tissue (English) ───────────────────────────────────────
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
      'Ask for **a tissue** in a shop and you get a paper handkerchief. That is the everyday meaning, and it is **countable**: one tissue, two tissues, a box of tissues. “Mr Bowen sneezed, so he took a tissue out of the box.”\n\n' +
      'In science, **tissue** means a group of similar cells — and it is usually **uncountable**: we say *muscle tissue*, not *a muscle tissue*. “The wall of the stomach contains muscle tissue.”\n\n' +
      'Same five letters, completely different meaning.',
    contentVn:
      'Xin **a tissue** ở cửa hàng thì em nhận được một tờ khăn giấy. Đó là nghĩa đời thường, và nó **đếm được**: one tissue, two tissues, a box of tissues. “Mr Bowen sneezed, so he took a tissue out of the box.” (Thầy Bowen hắt hơi, nên thầy lấy một tờ khăn giấy ra khỏi hộp.)\n\n' +
      'Trong khoa học, **tissue** nghĩa là một nhóm tế bào giống nhau — và nó thường **không đếm được**: ta nói *muscle tissue*, chứ không nói *a muscle tissue*. “The wall of the stomach contains muscle tissue.” (Thành dạ dày chứa mô cơ.)\n\n' +
      'Cùng năm chữ cái, nghĩa hoàn toàn khác.',
  },

  // 9 ─ One leaf, four tissues (key word: organ) + CHECK 2 ──────────────────
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
    content: 'Guess first. Last lesson you met the palisade cell, and it lives in a leaf — so a leaf has palisade tissue. Is that all?\n\nNo. Flat **epidermis** on top and underneath, protecting the leaf. Tall **palisade** cells packed with chloroplasts, catching the light. Loose **spongy** cells with air gaps, letting gases move around.\n\nFour tissues, four jobs, one leaf.',
    contentVn: 'Đoán trước. Tiết trước em đã gặp tế bào mô giậu, và nó nằm trong lá — vậy lá có mô giậu. Chỉ có thế thôi sao?\n\nKhông. **Biểu bì** dẹt ở trên và ở dưới, bảo vệ lá. Tế bào **mô giậu** cao chứa đầy lục lạp, bắt lấy ánh sáng. Tế bào **mô xốp** lỏng lẻo có khe khí, cho khí di chuyển.\n\nBốn loại mô, bốn nhiệm vụ, một chiếc lá.',
    notes: [
      {
        tone: 'write',
        text: '**Organ:** a structure made of **several different tissues**, all working together. A leaf is a plant organ. So are roots and flowers.',
        textVn: '**Cơ quan (organ):** một cấu trúc tạo nên từ **nhiều loại mô khác nhau**, cùng làm việc với nhau. Lá là một cơ quan của thực vật. Rễ và hoa cũng vậy.',
      },
    ],
    check: {
      id: 'c2',
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
      label: 'Which of your starter organs can you NOT see here?',
      labelVn: 'Cơ quan nào ở slide trước em KHÔNG nhìn thấy ở đây?',
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

  // 13 ─ Organ system, organism + CHECK 3 ───────────────────────────────────
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
      label: 'More organs you have',
      labelVn: 'Thêm các cơ quan em có',
      answer: 'Besides the five you started with: **liver · kidneys · skin · eyes · ears · tongue**. Yes — your **skin** is an organ. It is the biggest one you have.',
      answerVn: 'Ngoài năm cơ quan em bắt đầu với: **liver (gan) · kidneys (thận) · skin (da) · eyes (mắt) · ears (tai) · tongue (lưỡi)**. Đúng vậy — **da** của em là một cơ quan. Nó là cơ quan lớn nhất em có.',
    },
    check: {
      id: 'c3',
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

  // 14 ─ Sort them onto the ladder: SORT ────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Boxes',
    eyebrow: 'Every word, one more time',
    eyebrowVn: 'Mọi từ, thêm một lần nữa',
    title: 'Sort Them Onto the Ladder',
    titleVn: 'Sắp xếp chúng lên bậc thang',
    label: 'Eight examples, five rungs',
    labelVn: 'Tám ví dụ, năm bậc thang',
    labelIcon: 'Layers',
    text: 'Every example below is one you have already met today.',
    textVn: 'Mỗi ví dụ dưới đây đều là thứ em đã gặp trong bài hôm nay.',
    sub: 'Drag each one onto the rung it belongs on.',
    subVn: 'Kéo mỗi ví dụ vào đúng bậc thang của nó.',
    activity: {
      id: 'a2', type: 'sort',
      prompt: 'Sort these eight examples onto the right rung of the ladder.',
      promptVn: 'Sắp xếp tám ví dụ này vào đúng bậc thang.',
      bins: [
        { id: 'cell', name: 'Cell', nameVn: 'Tế bào' },
        { id: 'tissue', name: 'Tissue', nameVn: 'Mô' },
        { id: 'organ', name: 'Organ', nameVn: 'Cơ quan' },
        { id: 'organsys', name: 'Organ system', nameVn: 'Hệ cơ quan' },
        { id: 'organism', name: 'Organism', nameVn: 'Sinh vật' },
      ],
      cards: [
        { id: 'cc', name: 'A ciliated cell', nameVn: 'Một tế bào có lông rung', bin: 'cell' },
        { id: 'ce', name: 'Ciliated epithelium', nameVn: 'Biểu mô có lông rung', bin: 'tissue' },
        { id: 'oe', name: 'Onion epidermis', nameVn: 'Biểu bì hành tây', bin: 'tissue' },
        { id: 'lung', name: 'A lung', nameVn: 'Một lá phổi', bin: 'organ' },
        { id: 'leaf', name: 'A leaf', nameVn: 'Một chiếc lá', bin: 'organ' },
        { id: 'breath', name: 'The breathing system', nameVn: 'Hệ hô hấp', bin: 'organsys' },
        { id: 'digest', name: 'The digestive system', nameVn: 'Hệ tiêu hoá', bin: 'organsys' },
        { id: 'mosq', name: 'A mosquito', nameVn: 'Một con muỗi', bin: 'organism' },
      ],
      explain: 'One kind of cell alone is a **cell**. The same kind joined together doing one job is a **tissue**. Several different tissues together are an **organ**. Organs sharing one job form an **organ system**. And any whole living thing — even a mosquito — is an **organism**.',
      explainVn: 'Một loại tế bào đơn lẻ là một **tế bào**. Cùng loại đó nối liền nhau làm một nhiệm vụ là một **mô**. Nhiều loại mô khác nhau cùng nhau là một **cơ quan**. Các cơ quan chung một nhiệm vụ tạo thành một **hệ cơ quan**. Và bất kỳ cơ thể sống hoàn chỉnh nào — kể cả một con muỗi — là một **sinh vật**.',
    },
  },

  // 15 ─ The five levels (draw this) ────────────────────────────────────────
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

  // 16 ─ Smallest to largest: ORDER ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Repeat',
    eyebrow: 'Same ladder, shuffled',
    eyebrowVn: 'Vẫn bậc thang đó, đã bị xáo trộn',
    title: 'Smallest to Largest',
    titleVn: 'Từ nhỏ nhất đến lớn nhất',
    label: 'The ladder’s own examples',
    labelVn: 'Chính các ví dụ trên bậc thang',
    labelIcon: 'Repeat',
    text: 'The five examples from your ladder are shuffled below.',
    textVn: 'Năm ví dụ trên bậc thang của em bị xáo trộn ở dưới đây.',
    sub: 'Put them back in order, from the smallest up to the whole living thing.',
    subVn: 'Xếp lại chúng theo đúng thứ tự, từ nhỏ nhất đến cả một cơ thể sống.',
    activity: {
      id: 'a3', type: 'order',
      prompt: 'Order the ladder’s examples, smallest to largest.',
      promptVn: 'Xếp thứ tự các ví dụ trên bậc thang, từ nhỏ nhất đến lớn nhất.',
      steps: [
        { id: 's1', name: 'A ciliated cell', nameVn: 'Một tế bào có lông rung' },
        { id: 's2', name: 'Ciliated epithelium', nameVn: 'Biểu mô có lông rung' },
        { id: 's3', name: 'A lung', nameVn: 'Một lá phổi' },
        { id: 's4', name: 'The breathing system', nameVn: 'Hệ hô hấp' },
        { id: 's5', name: 'You', nameVn: 'Em' },
      ],
      explain: 'One cell, joined into a tissue, built into an organ, teamed into an organ system, all inside one organism: you. Each level is built out of the one before it.',
      explainVn: 'Một tế bào, nối thành một mô, tạo nên một cơ quan, hợp thành một hệ cơ quan, tất cả bên trong một sinh vật: chính là em. Mỗi cấp độ được tạo nên từ cấp độ liền trước.',
    },
  },

  // 17 ─ Which level is it? (widget) ────────────────────────────────────────
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
      'One thing at a time on the screen. Decide which level it is — **1** for a cell, up to **5** for an organism — before you press the button.',
    contentVn:
      'Mỗi lần một thứ hiện trên màn hình. Hãy quyết định đó là cấp độ nào — **1** là tế bào, đến **5** là sinh vật — trước khi bấm nút.',
    notes: [
      {
        tone: 'task',
        badge: 'Use your ladder',
        badgeVn: 'Dùng sơ đồ của em',
        text: 'Your Draw This has the five levels in the right order. Use it. That is what notes are for.',
        textVn: 'Hình em vừa vẽ có đủ năm cấp độ theo đúng thứ tự. Hãy dùng nó. Ghi chép là để dùng như vậy.',
      },
    ],
    widget: LevelDrillWidget,
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
      '> Exit question: a **jellyfish** has no heart, no lungs and no brain. It is still an organism. So which of the five levels can a living thing manage **without**?',
    contentVn:
      '> Câu hỏi ra về: một con **sứa** không có tim, không có phổi và không có não. Nó vẫn là một sinh vật. Vậy một cơ thể sống có thể **thiếu** cấp độ nào trong năm cấp độ đó?',
    items: [
      { text: 'Explain what a **tissue** is, and give one animal and one plant example.', textVn: 'Giải thích **mô** là gì, và nêu một ví dụ ở động vật và một ở thực vật.' },
      { text: 'Explain what an **organ** is, and say why a leaf is one.', textVn: 'Giải thích **cơ quan** là gì, và nói vì sao lá là một cơ quan.' },
      { text: 'Explain what an **organ system** is, and name two of them.', textVn: 'Giải thích **hệ cơ quan** là gì, và kể tên hai hệ.' },
      { text: 'Name **five human organs** and say where each one sits in the body.', textVn: 'Kể **năm cơ quan của người** và nói vị trí của từng cái trong cơ thể.' },
      { text: 'Say the five levels **in order**, from cell up to organism.', textVn: 'Nói năm cấp độ **theo đúng thứ tự**, từ tế bào lên sinh vật.' },
      { text: 'Use the word *tissue* correctly in **both** of its meanings.', textVn: 'Dùng đúng từ *tissue* ở **cả hai** nghĩa của nó.' },
    ],
  },
];
