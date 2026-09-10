// src/data/Y7_SCI/U02_1/notes.js
// 2.1 Solids, Liquids and Gases — self-study deck rebuilt to the engagement
// plan (docs/y7-science/ENGAGEMENT-PLAN.md). 22 layout slides; 6 scored items
// — four interactive activities (sort · predict · sort · hotspot) and two
// checks.
//
// The old deck opened with "write two solids, two liquids and two gases on
// paper"; this one opens with a sort you do on screen, with sand and mercury
// built in as the traps. The syringe vote becomes a `predict` the reveal
// slide pays off; the particle facts become a second `sort`; the "Two Rules"
// slide gets a `hotspot` on the diagram it already shows. The ruler-and-copy
// table task and the "draw three boxes" homework are gone — the table and
// the recap stay, on screen, with a tap-to-check reveal instead of a pencil.
// Every photograph is credited in docs/credits.md. The `check:` or
// `activity:` block is always the LAST key on its slide.
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
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
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
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **sort**, **predict** and **tap** your way through it. Six things are scored — the sort on the next slide is the first.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán** và **chạm** trong suốt bài học. Sáu mục được tính điểm — bài sắp xếp ở slide sau là mục đầu tiên.',
    },
  },

  // 2 ─ The starter: SORT ───────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Boxes',
    eyebrow: 'Sort by what it DOES, not what it looks like',
    eyebrowVn: 'Phân loại theo điều nó LÀM, không phải vẻ ngoài',
    title: 'Solid, Liquid or Gas?',
    titleVn: 'Chất rắn, chất lỏng hay chất khí?',
    label: 'Six things to sort',
    labelVn: 'Sáu thứ cần sắp xếp',
    labelIcon: 'Sparkles',
    text: 'Some of these will trick you. Test each one: can it be poured? Does it keep its own shape?',
    textVn: 'Một vài thứ sẽ đánh lừa em. Hãy kiểm tra từng thứ: rót được không? Có giữ hình dạng riêng không?',
    sub: 'Drag each card into Solid, Liquid or Gas.',
    subVn: 'Kéo mỗi thẻ vào Chất rắn, Chất lỏng hoặc Chất khí.',
    activity: {
      id: 'a1', type: 'sort',
      prompt: 'Sort these six into the right state.',
      promptVn: 'Sắp xếp sáu thứ này vào đúng trạng thái.',
      bins: [
        { id: 'solid', name: 'Solid', nameVn: 'Chất rắn' },
        { id: 'liquid', name: 'Liquid', nameVn: 'Chất lỏng' },
        { id: 'gas', name: 'Gas', nameVn: 'Chất khí' },
      ],
      cards: [
        { id: 'ice', name: 'Ice', nameVn: 'Nước đá', bin: 'solid' },
        { id: 'sand', name: 'Sand', nameVn: 'Cát', bin: 'solid' },
        { id: 'mercury', name: 'Mercury', nameVn: 'Thuỷ ngân', bin: 'liquid' },
        { id: 'honey', name: 'Honey', nameVn: 'Mật ong', bin: 'liquid' },
        { id: 'air', name: 'The air around you', nameVn: 'Không khí quanh em', bin: 'gas' },
        { id: 'helium', name: 'Helium in a balloon', nameVn: 'Khí heli trong bóng bay', bin: 'gas' },
      ],
      explain: 'Sand pours, but every single grain keeps its own shape and cannot be squashed — sand is a solid. Mercury is a metal, but it pours and takes the shape of its container — mercury is a liquid. You sort by what a substance **does**, never by what it looks like or what it is made of.',
      explainVn: 'Cát chảy được, nhưng mỗi hạt cát vẫn giữ hình dạng riêng và không thể bị bóp nhỏ — cát là chất rắn. Thuỷ ngân là kim loại, nhưng nó rót được và mang hình dạng vật chứa — thuỷ ngân là chất lỏng. Em phân loại theo điều một chất **làm**, không bao giờ theo vẻ ngoài hay chất liệu của nó.',
    },
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

  // 6 ─ Gases ───────────────────────────────────────────────────────────────
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
  },

  // 7 ─ Which plunger moves? PREDICT ────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Predict before you see the reveal',
    eyebrowVn: 'Dự đoán trước khi xem đáp án',
    title: 'Which Plunger Moves?',
    titleVn: 'Cần đẩy nào sẽ di chuyển?',
    label: 'The syringe test',
    labelVn: 'Thử nghiệm xi-lanh',
    labelIcon: 'Target',
    text: 'Two syringes, both holes blocked with a thumb. Push each plunger as hard as you can.',
    textVn: 'Hai xi-lanh, cả hai lỗ đều bị bịt bằng ngón tay cái. Đẩy mạnh từng cần đẩy.',
    sub: 'Choose your prediction, then check the next slide.',
    subVn: 'Chọn dự đoán của em, rồi xem slide sau để kiểm tra.',
    activity: {
      id: 'a2', type: 'predict',
      prompt: 'Which plunger moves?',
      promptVn: 'Cần đẩy nào sẽ di chuyển?',
      options: [
        { val: 'water', name: 'Only the water plunger', nameVn: 'Chỉ cần đẩy bên nước' },
        { val: 'air', name: 'Only the air plunger', nameVn: 'Chỉ cần đẩy bên không khí' },
        { val: 'both', name: 'Both plungers', nameVn: 'Cả hai cần đẩy' },
        { val: 'neither', name: 'Neither plunger', nameVn: 'Không cần đẩy nào cả' },
      ],
      correct: 'air',
      explain: 'Only the **air** plunger moves. Air can be squashed into a smaller space because its particles have huge gaps between them. The water plunger will not budge — water’s particles already touch, so there is no gap left to close.',
      explainVn: 'Chỉ cần đẩy bên **không khí** di chuyển. Không khí có thể bị ép vào khoảng nhỏ hơn vì các hạt của nó có khoảng trống rất lớn ở giữa. Cần đẩy bên nước không nhúc nhích — các hạt nước đã chạm nhau, không còn khoảng trống nào để khép lại.',
    },
  },

  // 8 ─ The reveal: only the air moves ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'The reveal',
    eyebrowVn: 'Kết quả',
    title: 'Only the Air Moves',
    titleVn: 'Chỉ có không khí di chuyển',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.SYRINGES,
    content:
      'The water plunger will not budge, however hard you lean on it. The air plunger slides in easily — and springs back the moment you let go.\n\n' +
      'The air was **compressed**: it was squashed into a smaller space. Nothing escaped, and nothing was added. Only the amount of room it took up changed.\n\n' +
      'This is the one property that separates a gas from **both** of the others. How close was your prediction?',
    contentVn:
      'Cần đẩy bên nước không nhúc nhích, dù em có tì mạnh đến đâu. Cần đẩy bên không khí trượt vào dễ dàng — và bật ngược lại ngay khi em buông tay.\n\n' +
      'Không khí đã bị **nén (compressed)**: nó bị ép vào một khoảng nhỏ hơn. Không có gì thoát ra, cũng không có gì thêm vào. Chỉ có lượng không gian nó chiếm là thay đổi.\n\n' +
      'Đây là tính chất duy nhất tách chất khí ra khỏi **cả hai** trạng thái kia. Dự đoán của em gần đến đâu?',
    notes: [
      {
        tone: 'write',
        text: '**Compressed:** squashed into a smaller space. **Only a gas can be compressed.**',
        textVn: '**Nén (compressed):** bị ép vào một khoảng không gian nhỏ hơn. **Chỉ chất khí mới có thể bị nén.**',
      },
    ],
  },

  // 9 ─ You cannot tell by looking ──────────────────────────────────────────
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

  // 10 ─ One table, three states ────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Everything so far, on one grid',
    eyebrowVn: 'Mọi thứ đã học, gọn trong một bảng',
    title: 'One Table, Three States',
    titleVn: 'Một bảng, ba trạng thái',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.STATES_TABLE,
    content:
      'Every property from the last few slides, in one place. Study the ticks and crosses, then check yourself against these questions:\n\n' +
      '> **1.** What are the three states of matter?\n' +
      '> **2.** Which state can be compressed easily?\n' +
      '> **3.** Which state cannot be poured?\n' +
      '> **4.** List the properties of solids.',
    contentVn:
      'Mọi tính chất từ các slide trước, gói gọn trong một bảng. Hãy xem kỹ các dấu tích và dấu chéo, rồi tự kiểm tra bằng những câu hỏi sau:\n\n' +
      '> **1.** Ba trạng thái của vật chất là gì?\n' +
      '> **2.** Trạng thái nào dễ bị nén?\n' +
      '> **3.** Trạng thái nào không rót được?\n' +
      '> **4.** Liệt kê các tính chất của chất rắn.',
    reveal: {
      label: 'Check yourself',
      labelVn: 'Tự kiểm tra',
      answer: '**1.** Solid, liquid and gas.\n**2.** A gas.\n**3.** A solid.\n**4.** Keeps the same shape · keeps the same volume · cannot be compressed · cannot be poured.',
      answerVn: '**1.** Chất rắn, chất lỏng và chất khí.\n**2.** Chất khí.\n**3.** Chất rắn.\n**4.** Giữ nguyên hình dạng · giữ nguyên thể tích · không nén được · không rót được.',
    },
  },

  // 11 ─ Hypothesis and theory ──────────────────────────────────────────────
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
      'They are the **same particles** in a solid, a liquid and a gas; the only thing that changes is **how they are arranged and how they move**. That is the whole theory, and it explains the syringes, the smell from the kitchen, and every row of your table.',
    contentVn:
      'Mọi vật chất — đá, biển, không khí, bàn tay em — đều tạo nên từ các **hạt (particles)**: những mảnh quá nhỏ để nhìn thấy.\n\n' +
      'Đó là **cùng những hạt ấy** trong chất rắn, chất lỏng và chất khí; thứ duy nhất thay đổi là **cách chúng sắp xếp và chuyển động**. Đó là toàn bộ học thuyết, và nó giải thích hai chiếc xi-lanh, mùi thức ăn từ bếp, và mọi hàng trong bảng của em.',
    notes: [
      {
        tone: 'write',
        text: '**Particle theory:** all matter is made up of tiny particles. The particles are **arranged differently** in solids, liquids and gases.',
        textVn: '**Thuyết hạt (particle theory):** mọi vật chất đều được tạo nên từ những hạt rất nhỏ. Các hạt được **sắp xếp khác nhau** trong chất rắn, chất lỏng và chất khí.',
      },
    ],
  },

  // 13 ─ Particles in a solid ───────────────────────────────────────────────
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

  // 14 ─ Particles in a liquid ──────────────────────────────────────────────
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

  // 15 ─ Particles in a gas ─────────────────────────────────────────────────
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
      'They spread out by themselves until every corner is filled — that is why a smell can reach every corner of a room by itself.',
    contentVn:
      'Bây giờ các hạt **không** chạm nhau. Chúng ở xa nhau, chuyển động nhanh theo mọi hướng, và không có gì giữ chúng lại.\n\n' +
      'Chất khí không hề có ít hạt hơn — mà **khoảng cách giữa chúng** đã trở nên rất lớn.\n\n' +
      'Chúng tự lan ra cho đến khi lấp đầy mọi góc — đó là lý do một mùi hương có thể tự lan đến mọi góc trong phòng.',
    notes: [
      {
        tone: 'write',
        text: '**In a gas:** the particles do **not touch**. They are **far apart** and **spread out by themselves** to fill the space they are in.',
        textVn: '**Trong chất khí:** các hạt **không chạm nhau**. Chúng ở **xa nhau** và **tự lan ra** để lấp đầy không gian chứa chúng.',
      },
    ],
  },

  // 16 ─ Which state does each fact describe? SORT ─────────────────────────
  {
    layout: 'statement',
    accent: VIOLET,
    icon: 'Layers',
    eyebrow: 'Sort the facts, not the words',
    eyebrowVn: 'Sắp xếp sự kiện, không phải từ ngữ',
    title: 'Which State Does Each Fact Describe?',
    titleVn: 'Mỗi sự kiện mô tả trạng thái nào?',
    label: 'Six particle facts',
    labelVn: 'Sáu sự kiện về hạt',
    labelIcon: 'Layers',
    text: 'You have just met all three arrangements. Sort each fact into the state it describes.',
    textVn: 'Em vừa tìm hiểu cả ba cách sắp xếp. Hãy sắp xếp mỗi sự kiện vào trạng thái nó mô tả.',
    sub: 'Drag each card into Solid, Liquid or Gas.',
    subVn: 'Kéo mỗi thẻ vào Chất rắn, Chất lỏng hoặc Chất khí.',
    activity: {
      id: 'a3', type: 'sort',
      prompt: 'Sort these particle facts into the right state.',
      promptVn: 'Sắp xếp các sự kiện về hạt này vào đúng trạng thái.',
      bins: [
        { id: 'solid', name: 'Solid', nameVn: 'Chất rắn' },
        { id: 'liquid', name: 'Liquid', nameVn: 'Chất lỏng' },
        { id: 'gas', name: 'Gas', nameVn: 'Chất khí' },
      ],
      cards: [
        { id: 'fixed', name: 'Fixed pattern, vibrating on the spot', nameVn: 'Khuôn mẫu cố định, dao động tại chỗ', bin: 'solid' },
        { id: 'strong', name: 'Held together strongly', nameVn: 'Liên kết chặt với nhau', bin: 'solid' },
        { id: 'slide', name: 'Touching, but sliding past each other', nameVn: 'Chạm nhau, nhưng trượt qua nhau', bin: 'liquid' },
        { id: 'weak', name: 'Held together weakly', nameVn: 'Liên kết yếu với nhau', bin: 'liquid' },
        { id: 'apart', name: 'Far apart, spread out', nameVn: 'Ở xa nhau, lan rộng ra', bin: 'gas' },
        { id: 'compress', name: 'Can be compressed', nameVn: 'Có thể bị nén', bin: 'gas' },
      ],
      explain: 'Solid particles sit in a **fixed pattern**, held **strongly** — they can only vibrate. Liquid particles still **touch** but are held **weakly**, so they slide past one another. Gas particles are **far apart** with almost nothing holding them, so the huge gaps between them can be squashed smaller — only a gas can be **compressed**.',
      explainVn: 'Các hạt trong chất rắn nằm trong một **khuôn mẫu cố định**, liên kết **chặt** — chúng chỉ có thể dao động. Các hạt trong chất lỏng vẫn **chạm nhau** nhưng liên kết **yếu**, nên chúng trượt qua nhau. Các hạt trong chất khí ở **xa nhau**, gần như không có gì giữ chúng lại, nên khoảng trống lớn giữa chúng có thể bị ép nhỏ lại — chỉ chất khí mới có thể **bị nén**.',
    },
  },

  // 17 ─ Two rules that explain the whole table + HOTSPOT ──────────────────
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
      'Every tick and cross you saw comes out of these two sentences. Read them slowly — they are short, and they are doing a great deal of work.\n\n' +
      'Then hold them against the three boxes on the left. A solid fails both. A liquid passes the first and fails the second. A gas passes both.',
    contentVn:
      'Mọi dấu tích và dấu chéo em thấy đều suy ra từ hai câu này. Hãy đọc chậm — chúng ngắn, nhưng làm được rất nhiều việc.\n\n' +
      'Rồi đối chiếu chúng với ba ô vuông bên trái. Chất rắn trượt cả hai. Chất lỏng đạt câu đầu và trượt câu sau. Chất khí đạt cả hai.',
    notes: [
      {
        tone: 'write',
        text: 'Matter can only **flow** (be poured) if the particles can **move past one another**.\n\nMatter can only **change volume** if the particles can **spread out or move closer together**.',
        textVn: 'Vật chất chỉ **chảy** (rót được) khi các hạt có thể **trượt qua nhau**.\n\nVật chất chỉ **đổi thể tích** khi các hạt có thể **giãn ra hoặc xích lại gần nhau**.',
      },
    ],
    activity: {
      id: 'a4', type: 'hotspot',
      prompt: 'Tap the box that shows a GAS.',
      promptVn: 'Chạm vào ô thể hiện CHẤT KHÍ.',
      svg: PARTICLES.THREE_ARRANGEMENTS, viewBox: '0 0 900 360',
      targets: [
        { id: 'solid', x: 160, y: 166, r: 95, name: 'the solid box', nameVn: 'ô chất rắn' },
        { id: 'liquid', x: 450, y: 166, r: 95, name: 'the liquid box', nameVn: 'ô chất lỏng' },
        { id: 'gas', x: 740, y: 166, r: 95, name: 'the gas box', nameVn: 'ô chất khí' },
      ],
      correct: 'gas',
      explain: 'The **gas** box: particles far apart, no pattern, nothing holding them together. The solid box packs particles into a tight grid; the liquid box has particles touching but jumbled, with no pattern.',
      explainVn: 'Ô **chất khí**: các hạt ở xa nhau, không có khuôn mẫu, không gì giữ chúng lại. Ô chất rắn xếp các hạt thành lưới chặt; ô chất lỏng có các hạt chạm nhau nhưng lộn xộn, không khuôn mẫu.',
    },
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

  // 19 ─ Why the air plunger moved + CHECK 2 ────────────────────────────────
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
      id: 'c2',
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
        '**Strengths:** one simple idea explains shape, volume, pouring, compressing, the smell from the kitchen and how a solid can pass the tick-and-cross test — and it makes **predictions we can test**, like the two syringes.\n\n' +
        '**Weaknesses:** nobody has ever seen a particle, so we are believing in something invisible. The picture also makes particles look like hard little balls, which they are not. And it says nothing about **why** the forces between them are strong or weak — that is Year 8.',
      answerVn:
        '**Điểm mạnh:** một ý tưởng đơn giản giải thích được hình dạng, thể tích, việc rót, việc nén, mùi thức ăn từ bếp và cả cách một chất rắn vượt qua bài kiểm tra tích-chéo — và nó đưa ra **dự đoán có thể kiểm chứng**, như hai chiếc xi-lanh.\n\n' +
        '**Điểm yếu:** chưa ai từng nhìn thấy một hạt, nên ta đang tin vào thứ vô hình. Hình vẽ cũng khiến các hạt trông như những viên bi cứng, mà thật ra không phải vậy. Và nó không nói gì về **vì sao** lực giữa chúng mạnh hay yếu — điều đó là của Lớp 8.',
    },
  },

  // 22 ─ Recap ───────────────────────────────────────────────────────────────
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
      'You sorted substances by behaviour, predicted a syringe, sorted particle facts and tapped the gas box. Six things were scored along the way — how many did you get right?\n\n' +
      'Next: the Vocab, then **Label It** — you will put every label on these diagrams yourself.',
    contentVn:
      'Em đã phân loại các chất theo cách hành xử, dự đoán về xi-lanh, sắp xếp các sự kiện về hạt, và chạm vào ô chất khí. Sáu mục được tính điểm trong suốt bài — em đúng được bao nhiêu?\n\n' +
      'Tiếp theo: Từ vựng, rồi **Gắn nhãn** — em sẽ tự đặt mọi nhãn lên những hình này.',
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
