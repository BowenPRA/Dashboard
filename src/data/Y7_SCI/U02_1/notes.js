// src/data/Y7_SCI/U02_1/notes.js
// 2.1 Solids, Liquids and Gases — a self-study reduction of TWO classroom
// decks (C:\Users\bowen\lessons, content/y7-science/U02_1a and U02_1b): the
// three states and their properties, then the particle theory that explains
// them. 22 layout slides, 5 checks.
//
// Reduced from 43 classroom slides. The first half collects BEHAVIOUR — pour
// it, squash it, watch it fill a balloon — and the second half is the one idea
// that explains all of it. The predictions the class voted on (the syringes,
// the sponge) fold into the slides that settle them; the Word Wall game, the
// stand-up-you-are-the-particles activity and both homeworks go; the vacuum
// keeps its drawn diagram and loses the Earth photograph. Every photograph is
// credited in docs/credits.md. The `check:` block is always the LAST key.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as PARTICLES } from './diagramsB.js';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_1/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
// The three state colours, identical to both classroom decks.
const STONE = '#8a7f68';
const WATER = '#2f7fb0';
const VIOLET = '#8b6bb1';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Boxes',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 2 · 2.1',
    eyebrowVn: 'Chương 2 · 2.1',
    title: 'Solids, Liquids and Gases',
    titleVn: 'Chất rắn, chất lỏng và chất khí',
    objective: 'Sort any substance by testing its properties, not by how it looks — and explain those properties with one idea: everything is made of particles, arranged three ways.',
    objectiveVn: 'Phân loại bất kỳ chất nào bằng cách kiểm tra tính chất của nó, không phải vẻ ngoài — và giải thích những tính chất đó bằng một ý tưởng: mọi thứ đều tạo nên từ các hạt, sắp xếp theo ba cách.',
    card: {
      icon: 'Pencil',
      badge: 'Starter · 3 minutes',
      badgeVn: 'Khởi động · 3 phút',
      text: 'In your notebook, write **two solids, two liquids and two gases**. Six things. Rule: none of them may be water.',
      textVn: 'Viết vào vở **hai chất rắn, hai chất lỏng và hai chất khí**. Sáu thứ. Một điều kiện: không được chọn nước.',
    },
  },

  // 2 ─ The hook: sand pours ────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Decide before you go on — and write down why',
    eyebrowVn: 'Quyết định trước khi tiếp tục — và viết ra lý do',
    title: 'Sand Pours Like Water. Is Sand a Liquid?',
    titleVn: 'Cát chảy giống như nước. Vậy cát có phải chất lỏng không?',
    image: img('hourglass.jpg'),
    caption: 'It flows through a narrow neck. It takes the shape of whatever you put it in. You can pour it from one hand to the other. Decide: **solid or liquid** — and be ready to say **why**.',
    captionVn: 'Nó chảy qua một cổ hẹp. Nó mang hình dạng của bất cứ thứ gì em đựng nó vào. Em có thể rót nó từ tay này sang tay kia. Hãy quyết định: **chất rắn hay chất lỏng** — và sẵn sàng nói **vì sao**.',
  },

  // 3 ─ Everything here is matter + CHECK 1 ─────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'Hạ Long Bay — three states in one photograph',
    eyebrowVn: 'Vịnh Hạ Long — ba trạng thái trong một bức ảnh',
    title: 'Everything Here Is Matter',
    titleVn: 'Mọi thứ ở đây đều là vật chất',
    ratio: 45,
    image: img('halong.jpg'),
    content:
      'The rock is a **solid**. The sea is a **liquid**. The air above them is a **gas**. Three completely different ways of behaving — and every single one of them is **matter**.\n\n' +
      'Scientists sort all matter into those three groups. Nothing in this photograph is outside them.',
    contentVn:
      'Đá là **chất rắn**. Biển là **chất lỏng**. Không khí phía trên là **chất khí**. Ba cách hành xử hoàn toàn khác nhau — và tất cả đều là **vật chất**.\n\n' +
      'Các nhà khoa học chia mọi vật chất thành ba nhóm đó. Không có gì trong bức ảnh này nằm ngoài ba nhóm ấy.',
    notes: [
      {
        tone: 'write',
        text: '**Matter:** everything you can see and feel.\n**States of matter:** the three groups we sort matter into — **solid, liquid** and **gas**.',
        textVn: '**Vật chất (matter):** mọi thứ em có thể nhìn thấy và chạm vào.\n**Trạng thái của vật chất (states of matter):** ba nhóm mà ta chia vật chất ra — **chất rắn, chất lỏng** và **chất khí**.',
      },
      {
        tone: 'write',
        text: '**Property:** a way that a substance **behaves** — can you pour it, can you squash it, does it keep its shape? (Not the everyday meaning: a house or land.)',
        textVn: '**Tính chất (property):** cách một chất **hành xử** — rót được không, nén được không, có giữ hình dạng không? (Không phải nghĩa đời thường: nhà cửa hay đất đai.)',
      },
    ],
    check: {
      id: 'c1',
      q: 'In science, what is a **property** of a substance?',
      qVn: 'Trong khoa học, **tính chất (property)** của một chất là gì?',
      options: [
        { val: 'A', text: 'A way it behaves — whether it can be poured, squashed, or keeps its shape', textVn: 'Cách nó hành xử — rót được, nén được, hay giữ hình dạng' },
        { val: 'B', text: 'Something a person owns', textVn: 'Thứ mà một người sở hữu' },
        { val: 'C', text: 'Its colour', textVn: 'Màu sắc của nó' },
      ],
      correct: 'A',
      expEn: 'A property is a way a substance **behaves**. Ownership is the everyday meaning of the word, and colour is exactly the thing this lesson tells you not to trust — you sort by what it **does**, not what it looks like.',
      expVn: 'Tính chất là cách một chất **hành xử**. Sở hữu là nghĩa đời thường của từ này, còn màu sắc chính là thứ bài học này bảo em đừng tin — hãy phân loại theo điều nó **làm**, không phải vẻ ngoài.',
    },
  },

  // 4 ─ Solids ──────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: STONE,
    icon: 'Box',
    eyebrow: 'State 1 of 3',
    eyebrowVn: 'Trạng thái 1 trong 3',
    title: 'Solids Keep Their Own Shape',
    titleVn: 'Chất rắn giữ hình dạng riêng',
    ratio: 45,
    image: img('ice.jpg'),
    content:
      'Every cube in this picture is a **cube**. Tip them into a bowl and they are still cubes. Put one in your hand and squeeze — nothing happens.\n\n' +
      'That is what a solid does. It decides its own shape, and it keeps it. The **volume** — the amount of space it takes up — stays the same too.',
    contentVn:
      'Mỗi viên trong bức ảnh này đều là một **khối lập phương**. Đổ chúng vào bát thì chúng vẫn là khối lập phương. Cầm một viên trong tay và bóp — không có gì xảy ra.\n\n' +
      'Đó là điều chất rắn làm. Nó tự quyết định hình dạng của mình, và giữ nguyên hình dạng ấy. **Thể tích (volume)** — lượng không gian nó chiếm — cũng không đổi.',
    notes: [
      {
        tone: 'write',
        text: '**A solid:** keeps the same **shape** · keeps the same **volume** · cannot be **compressed** (squashed) · cannot be **poured**.',
        textVn: '**Chất rắn:** giữ nguyên **hình dạng** · giữ nguyên **thể tích** · không thể **nén (compressed)** · không thể **rót (poured)**.',
      },
    ],
  },

  // 5 ─ Liquids ─────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: WATER,
    icon: 'Droplets',
    eyebrow: 'State 2 of 3',
    eyebrowVn: 'Trạng thái 2 trong 3',
    title: 'Liquids Borrow the Container’s Shape',
    titleVn: 'Chất lỏng mượn hình dạng của vật chứa',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.SAME_LIQUID,
    content:
      'Pour the same water into a tall tube, a flat dish and a round beaker, and it looks different every time. It has **no shape of its own** — it takes whichever one it is given.\n\n' +
      'But look at the label on each container. It is **50 cm³ every time**. The shape changed. The volume did not.',
    contentVn:
      'Rót cùng một lượng nước vào một ống cao, một đĩa nông và một cốc tròn thì lần nào trông cũng khác. Nó **không có hình dạng riêng** — nó nhận hình dạng nào được đưa cho.\n\n' +
      'Nhưng hãy nhìn nhãn trên mỗi vật chứa. Lần nào cũng là **50 cm³**. Hình dạng đã đổi. Thể tích thì không.',
    notes: [
      {
        tone: 'write',
        text: '**A liquid:** takes the **shape of its container** · keeps the same **volume** · can be **poured** · cannot be **compressed**.',
        textVn: '**Chất lỏng:** mang **hình dạng của vật chứa** · giữ nguyên **thể tích** · có thể **rót (poured)** · không thể **nén (compressed)**.',
      },
    ],
  },

  // 6 ─ Gases + CHECK 2 ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Wind',
    eyebrow: 'State 3 of 3',
    eyebrowVn: 'Trạng thái 3 trong 3',
    title: 'Gases Fill Everything They Are In',
    titleVn: 'Chất khí lấp đầy mọi thứ chứa nó',
    ratio: 45,
    image: img('balloon.jpg'),
    content:
      'There is a person standing inside that balloon, and the thing holding it open is **air**. You cannot see the air, you cannot pick it up, and it weighs very little — but it is filling every corner of a space the size of a house.\n\n' +
      'A gas will not sit in the bottom like a liquid. Give it a room and it takes the **whole room**.',
    contentVn:
      'Có một người đang đứng bên trong quả khinh khí cầu đó, và thứ giữ cho nó căng ra là **không khí**. Em không nhìn thấy không khí, không cầm được nó, và nó rất nhẹ — nhưng nó đang lấp đầy mọi góc của một không gian to bằng cả ngôi nhà.\n\n' +
      'Chất khí không nằm ở đáy như chất lỏng. Cho nó một căn phòng thì nó chiếm **cả căn phòng**.',
    notes: [
      {
        tone: 'write',
        text: '**A gas:** has **no shape of its own** · **fills** any closed container · can be **compressed** easily · its **volume can change** · it weighs very little.',
        textVn: '**Chất khí:** **không có hình dạng riêng** · **lấp đầy** mọi vật chứa kín · dễ dàng bị **nén (compressed)** · **thể tích có thể thay đổi** · nó rất nhẹ.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which state of matter **keeps the same volume** but **takes the shape of its container**?',
      qVn: 'Trạng thái nào **giữ nguyên thể tích** nhưng **mang hình dạng của vật chứa**?',
      options: [
        { val: 'A', text: 'A solid', textVn: 'Chất rắn' },
        { val: 'B', text: 'A gas', textVn: 'Chất khí' },
        { val: 'C', text: 'A liquid', textVn: 'Chất lỏng' },
      ],
      correct: 'C',
      expEn: 'A **liquid** borrows the container’s shape but stays 50 cm³ whatever the container. A solid keeps both its shape and its volume; a gas keeps neither — it fills the whole container and its volume can change.',
      expVn: '**Chất lỏng** mượn hình dạng vật chứa nhưng vẫn là 50 cm³ dù đựng trong gì. Chất rắn giữ cả hình dạng lẫn thể tích; chất khí không giữ cái nào — nó lấp đầy cả vật chứa và thể tích có thể thay đổi.',
    },
  },

  // 7 ─ The syringes + CHECK 3 ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Predict first: one syringe of water, one of air, both holes blocked, push hard',
    eyebrowVn: 'Dự đoán trước: một xi-lanh nước, một xi-lanh không khí, bịt cả hai lỗ, đẩy mạnh',
    title: 'Only the Air Moves',
    titleVn: 'Chỉ có không khí di chuyển',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.SYRINGES,
    content:
      'The water plunger will not budge, however hard you lean on it. The air plunger slides in easily — and springs back the moment you let go.\n\n' +
      'The air was **compressed**: it was squashed into a smaller space. Nothing escaped, and nothing was added. Only the amount of room it took up changed.\n\n' +
      'This is the one property that separates a gas from **both** of the others.',
    contentVn:
      'Cần đẩy bên nước không nhúc nhích, dù em có tì mạnh đến đâu. Cần đẩy bên không khí trượt vào dễ dàng — và bật ngược lại ngay khi em buông tay.\n\n' +
      'Không khí đã bị **nén (compressed)**: nó bị ép vào một khoảng nhỏ hơn. Không có gì thoát ra, cũng không có gì thêm vào. Chỉ có lượng không gian nó chiếm là thay đổi.\n\n' +
      'Đây là tính chất duy nhất tách chất khí ra khỏi **cả hai** trạng thái kia.',
    notes: [
      {
        tone: 'write',
        text: '**Compressed:** squashed into a smaller space. **Only a gas can be compressed.**',
        textVn: '**Nén (compressed):** bị ép vào một khoảng không gian nhỏ hơn. **Chỉ chất khí mới có thể bị nén.**',
      },
    ],
    check: {
      id: 'c3',
      q: 'Which state of matter can be **compressed** (squashed into a smaller space)?',
      qVn: 'Trạng thái nào có thể bị **nén** (ép vào khoảng không gian nhỏ hơn)?',
      options: [
        { val: 'A', text: 'A solid', textVn: 'Chất rắn' },
        { val: 'B', text: 'A gas', textVn: 'Chất khí' },
        { val: 'C', text: 'A liquid', textVn: 'Chất lỏng' },
      ],
      correct: 'B',
      expEn: 'Only a **gas** — the air plunger moved, the water plunger did not. Solids and liquids both keep their volume, so neither can be squashed into a smaller space.',
      expVn: 'Chỉ **chất khí** — cần đẩy bên không khí di chuyển, bên nước thì không. Chất rắn và chất lỏng đều giữ nguyên thể tích, nên không thể bị ép vào khoảng nhỏ hơn.',
    },
  },

  // 8 ─ You cannot tell by looking ──────────────────────────────────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'ScanEye',
    eyebrow: 'Back to the hourglass — and one more like it',
    eyebrowVn: 'Quay lại chiếc đồng hồ cát — và thêm một ví dụ nữa',
    title: 'You Cannot Tell by Looking',
    titleVn: 'Nhìn thôi thì không thể biết được',
    columns: [
      {
        heading: 'Sand pours — but it is a SOLID',
        headingVn: 'Cát chảy — nhưng nó là CHẤT RẮN',
        accent: STONE,
        icon: 'Box',
        image: img('hourglass.jpg'),
        caption: 'Look closer. Each **grain** keeps its own shape and cannot be squashed — so each grain is a solid. What is flowing is not the sand; it is **millions of tiny solids rolling over each other**. Sugar, salt and rice do exactly the same thing.',
        captionVn: 'Hãy nhìn kỹ hơn. Mỗi **hạt** cát giữ hình dạng riêng và không thể bị bóp nhỏ — nên mỗi hạt là một chất rắn. Thứ đang chảy không phải là cát; đó là **hàng triệu chất rắn tí hon lăn lên nhau**. Đường, muối và gạo cũng làm y hệt như vậy.',
      },
      {
        heading: 'Mercury is a metal — but it is a LIQUID',
        headingVn: 'Thuỷ ngân là kim loại — nhưng nó là CHẤT LỎNG',
        accent: WATER,
        icon: 'Droplets',
        image: img('mercury.jpg'),
        caption: 'Every other metal you have held was hard and cold. This one pours, splashes, and takes the shape of the dish. It is a metal **and** a liquid, and there is no contradiction — **liquid** is not a kind of stuff, it is a way of behaving.',
        captionVn: 'Mọi kim loại khác em từng cầm đều cứng và lạnh. Kim loại này thì rót được, bắn toé, và mang hình dạng của cái đĩa. Nó vừa là kim loại **vừa** là chất lỏng, và không hề mâu thuẫn — **chất lỏng** không phải là một loại vật liệu, mà là một cách hành xử.',
      },
    ],
  },

  // 9 ─ Four questions, three states (draw this) ────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Rulers out — you will use this sheet all unit',
    eyebrowVn: 'Lấy thước ra — em sẽ dùng bảng này suốt cả chương',
    title: 'Four Questions, Three States',
    titleVn: 'Bốn câu hỏi, ba trạng thái',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.STATES_TABLE,
    drawThis: true,
    content:
      'Everything so far, on one grid. Rule it up properly, with a ruler, and copy the ticks and crosses exactly.\n\n' +
      'Then answer the book’s questions from your own table:\n\n' +
      '> **1.** What are the three states of matter?\n' +
      '> **2.** Which state can be compressed easily?\n' +
      '> **3.** Which state cannot be poured?\n' +
      '> **4.** List the properties of solids.',
    contentVn:
      'Tất cả những gì đã học, gọn trong một bảng. Hãy kẻ cẩn thận bằng thước, và chép đúng các dấu tích và dấu chéo.\n\n' +
      'Rồi trả lời các câu hỏi trong sách từ chính bảng của em:\n\n' +
      '> **1.** Ba trạng thái của vật chất là gì?\n' +
      '> **2.** Trạng thái nào dễ bị nén?\n' +
      '> **3.** Trạng thái nào không rót được?\n' +
      '> **4.** Liệt kê các tính chất của chất rắn.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**1.** Solid, liquid and gas.\n**2.** A gas.\n**3.** A solid.\n**4.** Keeps the same shape · keeps the same volume · cannot be compressed · cannot be poured.',
      answerVn: '**1.** Chất rắn, chất lỏng và chất khí.\n**2.** Chất khí.\n**3.** Chất rắn.\n**4.** Giữ nguyên hình dạng · giữ nguyên thể tích · không nén được · không rót được.',
    },
  },

  // 10 ─ Hypothesis and theory ──────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'BookOpen',
    eyebrow: 'Every science class is an English class',
    eyebrowVn: 'Mỗi tiết khoa học đều là tiết tiếng Anh',
    title: '“Theory” Means the Opposite of What You Think',
    titleVn: '“Theory” nghĩa ngược với em nghĩ',
    content:
      'Scientists noticed four ordinary things: you can smell food cooking in another room; some substances get bigger when heated; liquids turn to gas when heated; substances turn from liquid to solid when cooled. **One single idea explains all four.**\n\n' +
      'In everyday English, *“it’s only a theory”* means **I am not sure**. In science it means almost the opposite: an idea **tested again and again** until it passes **every time**. It is the strongest thing we have.',
    contentVn:
      'Các nhà khoa học để ý bốn điều bình thường: ngửi thấy mùi thức ăn nấu ở phòng khác; một số chất nở to khi đun nóng; chất lỏng biến thành khí khi đun; các chất chuyển từ lỏng sang rắn khi làm lạnh. **Chỉ một ý tưởng duy nhất giải thích được cả bốn.**\n\n' +
      'Trong tiếng Anh đời thường, *“it’s only a theory”* nghĩa là **tôi không chắc**. Trong khoa học thì gần như ngược lại: một ý tưởng được **kiểm chứng nhiều lần** và **lần nào cũng đúng**. Đó là thứ chắc chắn nhất ta có.',
    notes: [
      {
        tone: 'write',
        text: '**Hypothesis:** a suggested explanation, which has not been tested yet.\n**Theory:** a hypothesis that has been tested many times and is accepted by scientists.',
        textVn: '**Giả thuyết (hypothesis):** cách giải thích được đề ra, chưa kiểm chứng.\n**Học thuyết (theory):** giả thuyết đã kiểm chứng nhiều lần, được công nhận.',
      },
    ],
  },

  // 11 ─ The ink: the smell from the kitchen, answered ──────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Droplets',
    eyebrow: 'Your bedroom door is shut, somebody cooks, and a minute later you can smell it — how?',
    eyebrowVn: 'Cửa phòng đóng kín, có người nấu ăn, một phút sau em ngửi thấy — bằng cách nào?',
    title: 'One Drop of Ink, in Still Water',
    titleVn: 'Một giọt mực, trong nước đứng yên',
    image: img('diffusion.jpg'),
    caption: 'Nobody stirred this. One drop of ink went in at the top, and it is spreading **by itself**, into every part of the glass. Leave it an hour and the whole glass will be pale grey. Whatever the ink is made of, it is **moving on its own** — and so is whatever came out of that kitchen.',
    captionVn: 'Không ai khuấy cả. Một giọt mực rơi vào từ trên, và nó đang **tự lan ra**, đến mọi phần của cốc. Để một tiếng thì cả cốc sẽ ngả màu xám nhạt. Dù mực được tạo nên từ gì đi nữa, thứ đó **đang tự chuyển động** — và thứ bay ra từ căn bếp kia cũng vậy.',
  },

  // 12 ─ Particle theory ────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'Sparkles',
    eyebrow: 'The best theory we have — and it is one sentence long',
    eyebrowVn: 'Học thuyết tốt nhất mà ta có — và nó chỉ dài một câu',
    title: 'One Idea Explains Everything',
    titleVn: 'Một ý tưởng giải thích tất cả',
    content:
      'All matter — the rock, the sea, the air, your hand — is made of **particles**: pieces far too small to see.\n\n' +
      'They are the **same particles** in a solid, a liquid and a gas; the only thing that changes is **how they are arranged and how they move**. That is the whole theory, and it explains the syringes, the ink, the smell from the kitchen, and every row of your table.',
    contentVn:
      'Mọi vật chất — đá, biển, không khí, bàn tay em — đều tạo nên từ các **hạt (particles)**: những mảnh quá nhỏ để nhìn thấy.\n\n' +
      'Đó là **cùng những hạt ấy** trong chất rắn, chất lỏng và chất khí; thứ duy nhất thay đổi là **cách chúng sắp xếp và chuyển động**. Đó là toàn bộ học thuyết, và nó giải thích hai chiếc xi-lanh, giọt mực, mùi thức ăn từ bếp, và mọi hàng trong bảng của em.',
    notes: [
      {
        tone: 'write',
        text: '**Particle theory:** all matter is made up of tiny particles. The particles are **arranged differently** in solids, liquids and gases.',
        textVn: '**Thuyết hạt (particle theory):** mọi vật chất đều được tạo nên từ những hạt rất nhỏ. Các hạt được **sắp xếp khác nhau** trong chất rắn, chất lỏng và chất khí.',
      },
    ],
  },

  // 13 ─ Evidence: the salt cube ────────────────────────────────────────────
  {
    layout: 'split',
    accent: STONE,
    icon: 'Microscope',
    eyebrow: 'Evidence you can hold in your hand',
    eyebrowVn: 'Bằng chứng em có thể cầm trên tay',
    title: 'Why Is Every Grain of Salt a Cube?',
    titleVn: 'Vì sao mỗi hạt muối đều là một khối lập phương?',
    ratio: 45,
    image: img('salt.jpg'),
    content:
      'Nobody cut these. This is table salt from a kitchen, under a microscope — and the grains are **cubes**, with square corners, every single time.\n\n' +
      'Particles are far too small to see. But if the theory is right, and the particles of a solid really are stacked in a **fixed, regular pattern**, then that pattern should sometimes show up on the **outside**.\n\n' +
      'Here it is. The grain is a cube because the particles inside it are stacked in cubes.',
    contentVn:
      'Không ai cắt chúng cả. Đây là muối ăn trong bếp, nhìn dưới kính hiển vi — và các hạt đều là **khối lập phương**, góc vuông vắn, lần nào cũng vậy.\n\n' +
      'Các hạt thì quá nhỏ để nhìn thấy. Nhưng nếu học thuyết đúng, và các hạt trong chất rắn thật sự xếp theo một **khuôn mẫu cố định, đều đặn**, thì khuôn mẫu ấy đôi khi phải lộ ra ở **bên ngoài**.\n\n' +
      'Đây chính là nó. Hạt muối là khối lập phương vì các hạt bên trong nó xếp thành khối lập phương.',
  },

  // 14 ─ Particles in a solid ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: STONE,
    icon: 'Box',
    eyebrow: 'Arrangement 1 of 3',
    eyebrowVn: 'Cách sắp xếp 1 trong 3',
    title: 'In a Solid, Nobody Moves',
    titleVn: 'Trong chất rắn, không hạt nào đi đâu cả',
    ratio: 48,
    side: 'left',
    inlineSvg: PARTICLES.PARTICLES_SOLID,
    content:
      'Packed tightly in a **fixed pattern** — rows and columns, touching, nothing between them.\n\n' +
      'They are not frozen. Each one **vibrates**: tiny movements on the spot, all the time. But it never leaves its place.\n\n' +
      'Look at the beaker: the block does not touch the walls. A solid keeps **its own** shape.',
    contentVn:
      'Xếp sát nhau theo **khuôn mẫu cố định** — hàng và cột, chạm nhau, không có gì ở giữa.\n\n' +
      'Chúng không đứng im: mỗi hạt **dao động (vibrate)** rất nhỏ tại chỗ, nhưng không rời vị trí.\n\n' +
      'Nhìn cốc: khối rắn không chạm thành cốc. Chất rắn giữ hình dạng **của chính nó**.',
    notes: [
      {
        tone: 'write',
        text: '**In a solid:** the particles are in a **fixed pattern**, **tightly packed** and **held together strongly**. They can **vibrate** but they stay in the same place.',
        textVn: '**Trong chất rắn:** các hạt ở trong một **khuôn mẫu cố định**, **xếp sát nhau** và **liên kết chặt với nhau**. Chúng có thể **dao động** nhưng vẫn ở nguyên vị trí.',
      },
    ],
  },

  // 15 ─ Particles in a liquid ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: WATER,
    icon: 'Droplets',
    eyebrow: 'Arrangement 2 of 3',
    eyebrowVn: 'Cách sắp xếp 2 trong 3',
    title: 'In a Liquid, They Touch — but They Slide',
    titleVn: 'Trong chất lỏng, các hạt chạm nhau — nhưng trượt được',
    ratio: 48,
    side: 'left',
    inlineSvg: PARTICLES.PARTICLES_LIQUID,
    content:
      'Still touching, still no space between them — that has not changed from the solid.\n\n' +
      'What changed is the **hold**. It is only **weak** now, so particles slide past one another and change places. No pattern.\n\n' +
      'Look at the top: a **flat surface**. That is the container’s shape, not the liquid’s.',
    contentVn:
      'Vẫn chạm nhau, vẫn không có khoảng trống — điều đó không đổi so với chất rắn.\n\n' +
      'Thứ đã đổi là **độ bám giữ**. Giờ nó chỉ còn **yếu**, nên các hạt trượt qua nhau và đổi chỗ. Không còn khuôn mẫu.\n\n' +
      'Nhìn mặt trên: một **bề mặt phẳng**. Đó là hình dạng của vật chứa, không phải của chất lỏng.',
    notes: [
      {
        tone: 'write',
        text: '**In a liquid:** the particles **still touch** each other, but they are **held together weakly**. They can **move past one another** and change places.',
        textVn: '**Trong chất lỏng:** các hạt **vẫn chạm nhau**, nhưng chỉ **liên kết yếu**. Chúng có thể **trượt qua nhau** và đổi chỗ cho nhau.',
      },
    ],
  },

  // 16 ─ Particles in a gas + CHECK 4 ───────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Wind',
    eyebrow: 'Arrangement 3 of 3',
    eyebrowVn: 'Cách sắp xếp 3 trong 3',
    title: 'In a Gas, Almost All of It Is Empty',
    titleVn: 'Trong chất khí, gần như toàn bộ là khoảng trống',
    ratio: 48,
    side: 'left',
    inlineSvg: PARTICLES.PARTICLES_GAS,
    content:
      'Now the particles do **not** touch. They are far apart, moving quickly in every direction, and nothing holds them together.\n\n' +
      'A gas does not have fewer particles — the **space between them** has become enormous.\n\n' +
      'They spread out by themselves until every corner is filled. That is the ink, and that is the smell from the kitchen.',
    contentVn:
      'Bây giờ các hạt **không** chạm nhau. Chúng ở xa nhau, chuyển động nhanh theo mọi hướng, và không có gì giữ chúng lại.\n\n' +
      'Chất khí không hề có ít hạt hơn — mà **khoảng cách giữa chúng** đã trở nên rất lớn.\n\n' +
      'Chúng tự lan ra cho đến khi lấp đầy mọi góc. Đó là giọt mực, và đó là mùi thức ăn từ căn bếp.',
    notes: [
      {
        tone: 'write',
        text: '**In a gas:** the particles do **not touch**. They are **far apart** and **spread out by themselves** to fill the space they are in.',
        textVn: '**Trong chất khí:** các hạt **không chạm nhau**. Chúng ở **xa nhau** và **tự lan ra** để lấp đầy không gian chứa chúng.',
      },
    ],
    check: {
      id: 'c4',
      q: 'In which state of matter do the particles **not touch** each other?',
      qVn: 'Trong trạng thái nào các hạt **không chạm** nhau?',
      options: [
        { val: 'A', text: 'A gas', textVn: 'Chất khí' },
        { val: 'B', text: 'A liquid', textVn: 'Chất lỏng' },
        { val: 'C', text: 'A solid', textVn: 'Chất rắn' },
      ],
      correct: 'A',
      expEn: 'In a **gas** the particles are far apart with huge spaces between them. In a solid **and** a liquid the particles touch — the difference between those two is only how strongly they are held.',
      expVn: 'Trong **chất khí** các hạt ở xa nhau với khoảng trống rất lớn ở giữa. Trong chất rắn **và** chất lỏng các hạt đều chạm nhau — khác biệt giữa hai trạng thái đó chỉ là chúng được giữ chặt đến đâu.',
    },
  },

  // 17 ─ Two rules that explain the whole table ─────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'You can pour water. You cannot pour a brick. Both are made of particles — so why?',
    eyebrowVn: 'Rót được nước. Không rót được viên gạch. Cả hai đều tạo nên từ các hạt — vậy vì sao?',
    title: 'Two Rules That Explain the Whole Table',
    titleVn: 'Hai quy tắc giải thích cả cái bảng',
    ratio: 52,
    side: 'left',
    inlineSvg: PARTICLES.THREE_ARRANGEMENTS,
    content:
      'Every tick and cross you drew comes out of these two sentences. Read them slowly — they are short, and they are doing a great deal of work.\n\n' +
      'Then hold them against the three boxes. A solid fails both. A liquid passes the first and fails the second. A gas passes both.',
    contentVn:
      'Mọi dấu tích và dấu chéo em vẽ đều suy ra từ hai câu này. Hãy đọc chậm — chúng ngắn, nhưng làm được rất nhiều việc.\n\n' +
      'Rồi đối chiếu chúng với ba ô vuông. Chất rắn trượt cả hai. Chất lỏng đạt câu đầu và trượt câu sau. Chất khí đạt cả hai.',
    notes: [
      {
        tone: 'write',
        text: 'Matter can only **flow** (be poured) if the particles can **move past one another**.\n\nMatter can only **change volume** if the particles can **spread out or move closer together**.',
        textVn: 'Vật chất chỉ **chảy** (rót được) khi các hạt có thể **trượt qua nhau**.\n\nVật chất chỉ **đổi thể tích** khi các hạt có thể **giãn ra hoặc xích lại gần nhau**.',
      },
    ],
  },

  // 18 ─ The pull between them ──────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'Rule 1 · why one flows and the other does not',
    eyebrowVn: 'Quy tắc 1 · vì sao thứ này chảy còn thứ kia thì không',
    title: 'The Difference Is the Pull Between Them',
    titleVn: 'Khác nhau là ở lực hút giữa các hạt',
    columns: [
      {
        heading: 'A solid cannot flow',
        headingVn: 'Chất rắn không chảy được',
        accent: STONE,
        icon: 'Box',
        inlineSvg: PARTICLES.PARTICLES_SOLID,
        caption: 'There is a **pull** between the particles — an **attractive force** — and in a solid it is strong. It holds every particle in its place, so they can only vibrate. Nothing can move past anything. So a solid cannot flow, and it keeps its own shape.',
        captionVn: 'Giữa các hạt có một **lực kéo** — gọi là **lực hút (attractive force)** — và trong chất rắn lực này rất mạnh. Nó giữ mỗi hạt ở đúng vị trí, nên chúng chỉ dao động được. Không hạt nào trượt qua hạt nào. Vì thế chất rắn không chảy được, và giữ hình dạng riêng.',
      },
      {
        heading: 'A liquid can flow',
        headingVn: 'Chất lỏng chảy được',
        accent: WATER,
        icon: 'Droplets',
        inlineSvg: PARTICLES.PARTICLES_LIQUID,
        caption: 'The same pull is there, but it is **weak** — weak enough to let the particles slide past one another, and still strong enough to keep them touching. That is why a liquid flows into any shape but never spreads out to fill the room the way a gas does.',
        captionVn: 'Vẫn có lực kéo đó, nhưng nó **yếu** — đủ yếu để các hạt trượt qua nhau, mà vẫn đủ mạnh để giữ chúng chạm vào nhau. Vì thế chất lỏng chảy vào mọi hình dạng nhưng không bao giờ lan ra lấp đầy cả căn phòng như chất khí.',
      },
    ],
  },

  // 19 ─ Why the air plunger moved + CHECK 5 ────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Zap',
    eyebrow: 'Rule 2 · and this is the syringe',
    eyebrowVn: 'Quy tắc 2 · và đây chính là chiếc xi-lanh',
    title: 'Why the Air Plunger Moved',
    titleVn: 'Vì sao cần đẩy bên không khí lại di chuyển',
    ratio: 52,
    side: 'left',
    inlineSvg: PARTICLES.COMPRESSING_GAS,
    content:
      'In a gas almost **nothing holds the particles together**, and there is a lot of **space between them**. Push, and they move closer — the gas takes up less room. Nothing escaped: **the gaps got smaller**, and that is all “compressed” means.\n\n' +
      'Now the water syringe. Those particles already touch. No gap left to close, so the plunger does not move.',
    contentVn:
      'Trong chất khí gần như **không có gì giữ các hạt lại**, và có rất nhiều **khoảng trống giữa chúng**. Đẩy vào thì chúng xích lại gần nhau — chất khí chiếm ít chỗ hơn. Không có gì thoát ra: **các khoảng trống nhỏ lại**, và “nén” chỉ có nghĩa như vậy.\n\n' +
      'Giờ đến xi-lanh nước. Các hạt ở đó đã chạm nhau. Không còn khoảng trống để khép, nên cần đẩy không nhúc nhích.',
    notes: [
      {
        tone: 'write',
        text: '**Attractive forces:** the pull between particles. **Strong** in a solid · **weak** in a liquid · almost **none** in a gas.',
        textVn: '**Lực hút (attractive forces):** lực kéo giữa các hạt. **Mạnh** trong chất rắn · **yếu** trong chất lỏng · gần như **không có** trong chất khí.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Why can a gas be compressed but a liquid cannot?',
      qVn: 'Vì sao chất khí nén được mà chất lỏng thì không?',
      options: [
        { val: 'A', text: 'A gas has fewer particles', textVn: 'Chất khí có ít hạt hơn' },
        { val: 'B', text: 'Gas particles have big spaces between them that can close up; liquid particles already touch', textVn: 'Các hạt khí có khoảng trống lớn ở giữa có thể khép lại; các hạt lỏng đã chạm nhau rồi' },
        { val: 'C', text: 'Gas particles are softer', textVn: 'Các hạt khí mềm hơn' },
      ],
      correct: 'B',
      expEn: 'Compressing closes the **gaps** between particles. A gas has enormous gaps, so it squashes; liquid particles already touch, so there is nothing to close. It is not about the number or the hardness of the particles.',
      expVn: 'Nén là khép lại **khoảng trống** giữa các hạt. Chất khí có khoảng trống rất lớn, nên ép được; các hạt lỏng đã chạm nhau rồi, nên không có gì để khép. Không liên quan đến số lượng hay độ cứng của hạt.',
    },
  },

  // 20 ─ Vacuum ─────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Minimize2',
    eyebrow: 'Learner’s Book, page 33 · No particles?',
    eyebrowVn: 'Sách học sinh, trang 33 · Không có hạt nào?',
    title: 'What if You Take Them All Away?',
    titleVn: 'Nếu lấy đi hết các hạt thì sao?',
    ratio: 48,
    side: 'left',
    inlineSvg: PARTICLES.VACUUM_BOX,
    content:
      'A box of gas looks empty. It is not — it is mostly space, but there are particles in it, bouncing around.\n\n' +
      'Take every one of them out and you have something with a name of its own: a **vacuum**. Not thin air. Not almost nothing. **Nothing.** Space, outside our atmosphere, is very close to a perfect vacuum — which is why there is no sound out there: sound needs particles to travel through.',
    contentVn:
      'Hộp chứa khí trông có vẻ trống rỗng. Nó không trống — phần lớn là khoảng không, nhưng vẫn có các hạt đang nảy qua nảy lại.\n\n' +
      'Lấy hết chúng ra thì em có một thứ có tên riêng: **chân không (vacuum)**. Không phải khí loãng, mà là **không có gì cả**. Vũ trụ, bên ngoài khí quyển, gần như là chân không hoàn hảo — vì thế ngoài đó không có âm thanh: âm thanh cần các hạt để truyền đi.',
    notes: [
      {
        tone: 'write',
        text: '**Vacuum:** a space where there are **no particles at all**. A vacuum contains nothing.',
        textVn: '**Chân không (vacuum):** một khoảng không **hoàn toàn không có hạt nào**. Chân không không chứa gì cả.',
      },
    ],
  },

  // 21 ─ The sponge: testing the theory ─────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ShieldCheck',
    eyebrow: 'A sponge is a solid — so why can you squash it? Decide before you reveal.',
    eyebrowVn: 'Miếng bọt biển là chất rắn — vậy vì sao bóp được nó? Quyết định trước khi hiện đáp án.',
    title: 'You Are Not Squashing the Sponge',
    titleVn: 'Em không hề bóp miếng bọt biển',
    ratio: 55,
    image: img('sponge.jpg'),
    content:
      'We wrote it down: **a solid cannot be compressed**, because its particles are already touching. But you can squeeze a sponge to half its size with one hand. Either the theory is **wrong**, or we have missed something.\n\n' +
      'Look at the holes. A sponge is a **thin skeleton of solid with air in every gap**. When you squeeze it, the solid part is not compressed at all. **The air is.** You are compressing a gas, exactly as you did with the syringe. Let go and the air pushes it back out. The theory survives — but only because we looked closely enough to see what was really being squashed.',
    contentVn:
      'Chúng ta đã viết: **chất rắn không thể bị nén**, vì các hạt của nó đã chạm nhau rồi. Nhưng em có thể bóp miếng bọt biển nhỏ đi một nửa chỉ bằng một tay. Hoặc là học thuyết **sai**, hoặc là chúng ta đã bỏ sót điều gì đó.\n\n' +
      'Hãy nhìn những lỗ nhỏ. Miếng bọt biển là một **bộ khung rắn mỏng với không khí trong mọi khe hở**. Khi em bóp nó, phần chất rắn hoàn toàn không bị nén. **Không khí mới bị nén.** Em đang nén một chất khí, đúng như đã làm với chiếc xi-lanh. Buông tay ra thì không khí lại đẩy nó bung ra. Học thuyết vẫn đứng vững — nhưng chỉ vì chúng ta đã nhìn đủ kỹ để thấy thứ thật sự bị nén là gì.',
    reveal: {
      label: 'Page 34, Questions 3 and 4 — the strengths and the weaknesses',
      labelVn: 'Trang 34, Câu hỏi 3 và 4 — điểm mạnh và điểm yếu',
      answer:
        '**Strengths:** one simple idea explains shape, volume, pouring, compressing, the smell from the kitchen and the ink in the glass — and it makes **predictions we can test**, like the two syringes.\n\n' +
        '**Weaknesses:** nobody has ever seen a particle, so we are believing in something invisible. The picture also makes particles look like hard little balls, which they are not. And it says nothing about **why** the forces between them are strong or weak — that is Year 8.',
      answerVn:
        '**Điểm mạnh:** một ý tưởng đơn giản giải thích được hình dạng, thể tích, việc rót, việc nén, mùi thức ăn từ bếp và giọt mực trong cốc — và nó đưa ra **dự đoán có thể kiểm chứng**, như hai chiếc xi-lanh.\n\n' +
        '**Điểm yếu:** chưa ai từng nhìn thấy một hạt, nên ta đang tin vào thứ vô hình. Hình vẽ cũng khiến các hạt trông như những viên bi cứng, mà thật ra không phải vậy. Và nó không nói gì về **vì sao** lực giữa chúng mạnh hay yếu — điều đó là của Lớp 8.',
    },
  },

  // 22 ─ Draw this + recap ──────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on · draw the three boxes',
    eyebrowVn: 'Trước khi tiếp tục · vẽ ba ô vuông',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    content:
      '> **Draw this:** rule three large squares across a clean page and label them **Solid · Liquid · Gas**. Draw the particles inside each one, and around each box write that state’s properties from your table. Leave space — you add to it in 2.2.\n\n' +
      'Exit question: a sealed bottle of air and a sealed bottle of water, both exactly full. **Which has more empty space inside?** Say why, using the word *particles*.',
    contentVn:
      '> **Vẽ hình này:** kẻ ba ô vuông lớn ngang một trang giấy sạch và ghi tên **Solid · Liquid · Gas**. Vẽ các hạt vào trong từng ô, và quanh mỗi ô viết các tính chất của trạng thái đó từ bảng của em. Chừa chỗ trống — em sẽ viết thêm ở bài 2.2.\n\n' +
      'Câu hỏi ra về: một chai không khí và một chai nước đậy kín, cả hai đều đầy. **Chai nào có nhiều khoảng trống hơn?** Hãy nói vì sao, dùng từ *particles*.',
    items: [
      { text: 'Classify any substance as a **solid, liquid or gas** by what it does, not how it looks.', textVn: 'Phân loại bất kỳ chất nào thành **rắn, lỏng hay khí** theo điều nó làm, không phải vẻ ngoài.' },
      { text: 'List the **properties** of solids, liquids and gases.', textVn: 'Liệt kê **tính chất** của chất rắn, chất lỏng và chất khí.' },
      { text: 'Describe how the **particles are arranged** in each of the three states.', textVn: 'Mô tả cách **các hạt được sắp xếp** trong mỗi trạng thái.' },
      { text: 'Use particle theory to explain **why a liquid pours and a solid does not**.', textVn: 'Dùng thuyết hạt để giải thích **vì sao chất lỏng rót được còn chất rắn thì không**.' },
      { text: 'Use particle theory to explain **why only a gas can be compressed**.', textVn: 'Dùng thuyết hạt để giải thích **vì sao chỉ chất khí mới nén được**.' },
      { text: 'Say what a **vacuum** is, and use **hypothesis** and **theory** correctly.', textVn: 'Nói **chân không** là gì, và dùng đúng **hypothesis** và **theory**.' },
    ],
  },
];
