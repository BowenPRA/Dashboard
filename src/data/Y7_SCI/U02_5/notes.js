// src/data/Y7_SCI/U02_5/notes.js
// 2.5 Atoms, Elements and the Periodic Table — the self-study deck, reduced from
// the classroom lesson y7-science/U02_5 to docs/y7-science/particle-engines.md
// §4. 26 layout slides; 18 scored items — 9 checks and 9 activities (hotspot ·
// predict · estimate · periodic · sort) — so the student does something every
// slide or two.
//
// SPINE:
//   1–2    hero; hotspot — tap the particles in a solid (the book's starter)
//   3–6    predict — can you cut forever?; Democritus + ATOM; estimate — how
//          many cuts to one atom?; the halving counter
//   7–11   atoms are real (STM photo, NANOTUBE); one kind of atom (graphite and
//          diamond both carbon); ELEMENT (the silver-ring zoom, 94 kinds); how
//          atoms join; the joining, photographed
//   12–20  THE PERIODIC TABLE; rows and columns; table/period/group have other
//          meanings; PERIOD and GROUP (tap to explore); periodic — group 1;
//          lightest to heaviest; metals and non-metals; which photo is not a
//          metal (bromine); METALS + periodic — the metals in period 3
//   21–23  predict — why Na?; SYMBOL + sort — three ways to make a symbol;
//          Co or CO?
//   24–25  the book's questions 1–8: periodic — potassium, names hidden;
//          periodic — the same group as helium; the rest in reveals
//   26     the checklist, with the exit question as the last check
//
// House notes:
//  · Every slide's `check:` or `activity:` is its LAST key; no slide has both.
//  · Activity strings use name/explain, never text/content (the narration
//    generator reads text/content aloud).
//  · The classroom's "vote", "draw this", "put your finger on the book" and the
//    Symbol Snap room game are all interactions here; no slide sends the student
//    to paper, a partner or the book.
//  · Photos are copied to public/images/Y7_SCI/U02_5/ and referenced by
//    assetUrl; the photo panels live in diagramsB.js.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as PHOTOS } from './diagramsB.js';
import { HalvingWidget, TableRowsCols, TableMass, TableMetals, TableExplore } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_5/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Atom',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 2 · 2.5',
    eyebrowVn: 'Chương 2 · 2.5',
    title: 'Atoms, Elements and the Periodic Table',
    titleVn: 'Nguyên tử, Nguyên tố và Bảng tuần hoàn',
    objective: 'Explain what an atom and an element are, describe how atoms join together, find periods, groups, metals and non-metals in the first 20 elements, and write element symbols correctly.',
    objectiveVn: 'Giải thích nguyên tử và nguyên tố là gì, mô tả cách các nguyên tử liên kết với nhau, tìm chu kì, nhóm, kim loại và phi kim trong 20 nguyên tố đầu tiên, và viết đúng kí hiệu của nguyên tố.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **tap**, **guess**, **predict** and **sort** your way through it. **18 things are scored** — the first one is on the next slide.',
      textVn: 'Em sẽ **chạm**, **đoán**, **dự đoán** và **sắp xếp** trong suốt bài học. **18 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: HOTSPOT — the particles in a solid ────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Start with what you know',
    eyebrowVn: 'Bắt đầu từ điều em đã biết',
    title: 'Particles in a Solid',
    titleVn: 'Các hạt trong chất rắn',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Everything is made of **particles**. Three boxes, three states.',
    textVn: 'Mọi thứ đều được tạo nên từ các **hạt**. Ba chiếc hộp, ba trạng thái.',
    sub: 'Tap the box that shows a **solid**. Then think: what must you do to a solid to make it **melt**?',
    subVn: 'Chạm vào hộp cho thấy một **chất rắn**. Rồi suy nghĩ: em phải làm gì để chất rắn **nóng chảy**?',
    activity: {
      id: 'act_solid',
      type: 'hotspot',
      prompt: 'Tap the box that shows the particles in a solid.',
      promptVn: 'Chạm vào hộp cho thấy các hạt trong chất rắn.',
      svg: DIAGRAMS.PARTICLE_BOXES,
      viewBox: '0 0 900 340',
      targets: [
        { id: 'liquid', x: 150, y: 150, r: 118, name: 'the left box: a liquid — touching, but not in rows', nameVn: 'hộp bên trái: chất lỏng — sát nhau nhưng không xếp hàng' },
        { id: 'gas', x: 450, y: 150, r: 118, name: 'the middle box: a gas — far apart', nameVn: 'hộp ở giữa: chất khí — ở xa nhau' },
        { id: 'solid', x: 750, y: 150, r: 118, name: 'the right box: a solid — packed in rows', nameVn: 'hộp bên phải: chất rắn — xếp sát thành hàng' },
      ],
      correct: 'solid',
      explain: 'In a **solid** (the right box) the particles are **packed closely in rows** and only vibrate. To **melt** it, **heat** it: the particles vibrate more and more until they break out of their rows. This lesson asks: what are those particles made of?',
      explainVn: 'Trong **chất rắn** (hộp bên phải), các hạt **xếp sát nhau thành hàng** và chỉ dao động. Để nó **nóng chảy**, hãy **đun nóng**: các hạt dao động ngày càng mạnh cho tới khi thoát khỏi hàng. Bài này hỏi: những hạt đó được tạo nên từ gì?',
    },
  },

  // 3 ─ PREDICT — can you cut forever? ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Scissors',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Can You Cut Forever?',
    titleVn: 'Có cắt mãi được không?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'You cut a piece of **gold** in half. Then in half again. And again.',
    textVn: 'Em cắt đôi một miếng **vàng**. Rồi lại cắt đôi. Cứ thế mãi.',
    sub: 'With a sharp enough knife, could you keep cutting **forever**?',
    subVn: 'Với một con dao đủ sắc, em có thể cắt **mãi mãi** không?',
    activity: {
      id: 'act_cut_forever',
      type: 'predict',
      prompt: 'Could you keep cutting the gold in half forever?',
      promptVn: 'Em có thể cắt đôi miếng vàng mãi mãi không?',
      options: [
        { val: 'yes', name: 'Yes — there is always a smaller half', nameVn: 'Có — luôn còn một nửa nhỏ hơn' },
        { val: 'no', name: 'No — in the end you reach a piece that cannot be cut', nameVn: 'Không — cuối cùng em đến một mẩu không thể cắt được nữa' },
        { val: 'vanish', name: 'No — in the end the gold disappears', nameVn: 'Không — cuối cùng miếng vàng biến mất' },
      ],
      correct: 'no',
      explain: 'Over 2000 years ago the Greek thinker **Democritus** said **no**: keep cutting and you reach a tiny piece that **cannot be cut**. It never disappears — the last piece is still gold. The next slide names it.',
      explainVn: 'Hơn 2000 năm trước, nhà tư tưởng Hy Lạp **Democritus** nói **không**: cứ cắt mãi, em sẽ đến một mẩu rất nhỏ **không thể cắt** được nữa. Nó không bao giờ biến mất — mẩu cuối cùng vẫn là vàng. Slide sau sẽ gọi tên nó.',
    },
  },

  // 4 ─ Democritus + ATOM + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Greece, over 2000 years ago',
    eyebrowVn: 'Hy Lạp, hơn 2000 năm trước',
    title: 'Democritus Said No',
    titleVn: 'Democritus nói: Không',
    ratio: 55,
    image: img('democritus.jpg'),
    content: 'Keep cutting, and you reach a piece that **cannot be cut**.\n\nThat tiny piece is an **atom**. Everything around you — gold, air, water, you — is made of atoms.',
    contentVn: 'Cứ cắt mãi, em sẽ đến một mẩu **không thể cắt** được nữa.\n\nMẩu rất nhỏ đó là một **nguyên tử**. Mọi thứ quanh em — vàng, không khí, nước, và cả em — đều được tạo nên từ nguyên tử.',
    notes: [
      {
        tone: 'write',
        text: '**Atom:** a tiny piece of matter. Everything is made of atoms.\n"Atom" means "cannot be divided".',
        textVn: '**Nguyên tử (atom):** một mẩu vật chất rất nhỏ. Mọi thứ đều được tạo nên từ nguyên tử.\n"Atom" nghĩa là "không thể chia nhỏ".',
      },
    ],
    check: {
      id: 'chk_atom',
      q: 'What does the word **atom** mean?',
      qVn: 'Từ **atom** (nguyên tử) có nghĩa là gì?',
      options: [
        { val: 'A', text: 'Very, very small', textVn: 'Rất, rất nhỏ' },
        { val: 'B', text: 'Cannot be divided', textVn: 'Không thể chia nhỏ' },
        { val: 'C', text: 'Made of gold', textVn: 'Làm bằng vàng' },
        { val: 'D', text: 'Everything', textVn: 'Mọi thứ' },
      ],
      correct: 'B',
      expEn: '"Atom" means **cannot be divided** — the piece Democritus said you cannot cut. "Very, very small" is what **nano** means (you meet it soon); gold was only the example; and everything is *made of* atoms, which is not what the word means.',
      expVn: '"Atom" nghĩa là **không thể chia nhỏ** — mẩu mà Democritus nói em không thể cắt. "Rất, rất nhỏ" là nghĩa của **nano** (em sẽ gặp ngay sau đây); vàng chỉ là ví dụ; và mọi thứ được *tạo nên từ* nguyên tử, đó không phải là nghĩa của từ.',
    },
  },

  // 5 ─ ESTIMATE — how many cuts? ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Guess first',
    eyebrowVn: 'Đoán trước',
    title: 'How Many Cuts?',
    titleVn: 'Bao nhiêu lần cắt?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Sparkles',
    text: 'A gold cube is **1 cm** wide. You cut it in half, again and again.',
    textVn: 'Một khối vàng rộng **1 cm**. Em cắt đôi nó, hết lần này đến lần khác.',
    sub: 'How many cuts until it is just **one atom** wide? Slide to your guess.',
    subVn: 'Cắt bao nhiêu lần thì nó chỉ còn rộng **một nguyên tử**? Kéo thanh trượt đến dự đoán của em.',
    activity: {
      id: 'act_cuts',
      type: 'estimate',
      prompt: 'How many cuts from a 1 cm gold cube to one gold atom?',
      promptVn: 'Cần bao nhiêu lần cắt để đi từ khối vàng 1 cm đến một nguyên tử vàng?',
      min: 1, max: 100, step: 1, answer: 25, tolerance: 0.3,
      explain: 'Only about **25**. Every cut halves the width, so it shrinks very fast: 3 cuts is a grain of sand, 9 is a cell, 17 is a virus, and 25 is **one gold atom**. Count them yourself on the next slide.',
      explainVn: 'Chỉ khoảng **25** lần. Mỗi lần cắt làm chiều rộng giảm một nửa, nên nó nhỏ đi rất nhanh: 3 lần là một hạt cát, 9 lần là một tế bào, 17 lần là một vi-rút, và 25 lần là **một nguyên tử vàng**. Tự đếm ở slide sau nhé.',
    },
  },

  // 6 ─ The halving counter (widget) ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Scissors',
    eyebrow: 'Press, and count',
    eyebrowVn: 'Bấm, và đếm',
    title: 'Half, and Half Again',
    titleVn: 'Một nửa, rồi lại một nửa',
    widget: HalvingWidget,
    caption: 'Press **Cut in half** and count each cut out loud. Was your guess close?',
    captionVn: 'Bấm **Cắt đôi** và đếm to từng lần cắt. Em đoán có gần đúng không?',
  },

  // 7 ─ Atoms are real + NANOTUBE ──────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Microscope',
    eyebrow: 'Today we can see atoms',
    eyebrowVn: 'Ngày nay ta có thể nhìn thấy nguyên tử',
    title: 'Atoms Are Real',
    titleVn: 'Nguyên tử là có thật',
    columns: [
      {
        heading: 'Real gold atoms',
        headingVn: 'Nguyên tử vàng thật',
        accent: TEAL,
        image: img('stm.jpg'),
        caption: 'Each tiny bright dot is one atom, seen with a **scanning tunnelling microscope**.',
        captionVn: 'Mỗi chấm sáng nhỏ là một nguyên tử, chụp bằng **kính hiển vi quét xuyên hầm**.',
      },
      {
        heading: 'A model of a nanotube',
        headingVn: 'Mô hình ống nano',
        accent: TEAL,
        image: img('nanotube.jpg'),
        caption: 'Each ball is one **carbon** atom.',
        captionVn: 'Mỗi quả bóng là một nguyên tử **cacbon**.',
        notes: [
          {
            tone: 'write',
            text: '**Nanotube:** a very, very small tube made of carbon atoms.\n"Nano" means "very, very small".',
            textVn: '**Ống nano (nanotube):** một ống rất, rất nhỏ tạo nên từ nguyên tử cacbon.\n"Nano" nghĩa là "rất, rất nhỏ".',
          },
        ],
      },
    ],
  },

  // 8 ─ Only one kind of atom + CHECK ──────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    title: 'Only One Kind of Atom',
    titleVn: 'Chỉ một loại nguyên tử',
    inlineSvg: PHOTOS.ONE_KIND,
    caption: 'Each is made of **only one kind** of atom. Soft black graphite and hard sparkling diamond are **both** only carbon atoms, joined in different ways.',
    captionVn: 'Mỗi chất chỉ gồm **một loại** nguyên tử. Than chì đen, mềm và kim cương cứng, lấp lánh **đều** chỉ gồm nguyên tử cacbon, liên kết theo những cách khác nhau. (gold = vàng, silver = bạc)',
    check: {
      id: 'chk_graphite',
      q: 'Graphite and diamond look completely different. What are they made of?',
      qVn: 'Than chì và kim cương trông hoàn toàn khác nhau. Chúng được tạo nên từ gì?',
      options: [
        { val: 'A', text: 'Many different kinds of atom, mixed together', textVn: 'Nhiều loại nguyên tử khác nhau trộn lẫn' },
        { val: 'B', text: 'Graphite is carbon; diamond is a different kind of atom', textVn: 'Than chì là cacbon; kim cương là một loại nguyên tử khác' },
        { val: 'C', text: 'Gold and silver atoms', textVn: 'Nguyên tử vàng và bạc' },
        { val: 'D', text: 'Only carbon atoms, joined in different ways', textVn: 'Chỉ nguyên tử cacbon, liên kết theo những cách khác nhau' },
      ],
      correct: 'D',
      expEn: 'Both are **only carbon atoms**; the atoms are joined differently, so they look and feel different. They are not a mixture (A), diamond is not a different kind of atom (B), and gold and silver are the other two photos (C).',
      expVn: 'Cả hai **chỉ gồm nguyên tử cacbon**; các nguyên tử liên kết khác nhau nên trông và cảm giác khác nhau. Chúng không phải hỗn hợp (A), kim cương không phải loại nguyên tử khác (B), còn vàng và bạc là hai ảnh kia (C).',
    },
  },

  // 9 ─ ELEMENT: the silver-ring zoom + CHECK (94) ─────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Element',
    titleVn: 'Nguyên tố',
    ratio: 40,
    inlineSvg: PHOTOS.SILVER_ZOOM,
    content:
      'Carbon, gold and silver are all **elements**.\n\n' +
      'Each kind of atom has its own **properties**, so each element does too.\n\n' +
      'Scientists have found **94** kinds of atom in nature.',
    contentVn:
      'Cacbon, vàng và bạc đều là **nguyên tố**.\n\n' +
      'Mỗi loại nguyên tử có **tính chất** riêng, vì vậy mỗi nguyên tố cũng vậy.\n\n' +
      'Các nhà khoa học đã tìm thấy **94** loại nguyên tử trong tự nhiên.',
    notes: [
      {
        tone: 'write',
        text: '**Element:** a substance made of only one kind of atom.',
        textVn: '**Nguyên tố (element):** một chất chỉ được tạo nên từ một loại nguyên tử.',
      },
    ],
    check: {
      id: 'chk_94',
      q: 'There are **94** kinds of atom in nature. How many natural **elements** are there?',
      qVn: 'Có **94** loại nguyên tử trong tự nhiên. Có bao nhiêu **nguyên tố** tự nhiên?',
      options: [
        { val: 'A', text: '1', textVn: '1' },
        { val: 'B', text: '47', textVn: '47' },
        { val: 'C', text: '94', textVn: '94' },
        { val: 'D', text: '118', textVn: '118' },
      ],
      correct: 'C',
      expEn: 'An element is **one kind of atom**, so 94 kinds of atom make **94** natural elements. 118 also counts the **24** that scientists have made in laboratories; 47 wrongly halves it; 1 would mean every atom is the same.',
      expVn: 'Một nguyên tố là **một loại nguyên tử**, nên 94 loại nguyên tử tạo thành **94** nguyên tố tự nhiên. 118 là tính cả **24** nguyên tố do các nhà khoa học tạo ra trong phòng thí nghiệm; 47 là chia đôi sai; 1 thì có nghĩa mọi nguyên tử đều giống nhau.',
    },
  },

  // 10 ─ How atoms join together ───────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Atom',
    eyebrow: 'Alone, packed, or joined',
    eyebrowVn: 'Riêng lẻ, xếp sát, hoặc liên kết',
    title: 'How Atoms Join Together',
    titleVn: 'Các nguyên tử liên kết như thế nào',
    inlineSvg: DIAGRAMS.JOINING,
    caption: 'A few elements, like **neon**: atoms alone. **Most**, like **gold**: atoms packed closely. **A few**, like **oxygen** and **sulfur**: small particles of joined atoms.',
    captionVn: 'Một số ít nguyên tố, như **neon**: nguyên tử đứng riêng. **Hầu hết**, như **vàng**: nguyên tử xếp sát nhau. **Một số ít**, như **oxi** và **lưu huỳnh**: hạt nhỏ gồm các nguyên tử liên kết.',
  },

  // 11 ─ The joining, photographed + CHECK ─────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The drawings, for real',
    eyebrowVn: 'Hình vẽ, ngoài đời thật',
    title: 'Neon, Oxygen, Sulfur',
    titleVn: 'Neon, Oxi, Lưu huỳnh',
    inlineSvg: PHOTOS.JOINING_REAL,
    caption: 'You cannot see the atoms in a photo — but the drawing on the last slide is what is inside each one.',
    captionVn: 'Em không nhìn thấy nguyên tử trong ảnh — nhưng hình vẽ ở slide trước chính là những gì ở bên trong mỗi chất.',
    check: {
      id: 'chk_sulfur',
      q: 'How is a particle of **sulfur** made?',
      qVn: 'Một hạt **lưu huỳnh** được tạo nên như thế nào?',
      options: [
        { val: 'A', text: '8 atoms joined in a ring', textVn: '8 nguyên tử liên kết thành vòng' },
        { val: 'B', text: '2 atoms joined in a pair', textVn: '2 nguyên tử liên kết thành cặp' },
        { val: 'C', text: '1 atom that moves around alone', textVn: '1 nguyên tử chuyển động riêng lẻ' },
        { val: 'D', text: 'Thousands of atoms packed closely, like gold', textVn: 'Hàng nghìn nguyên tử xếp sát nhau, như vàng' },
      ],
      correct: 'A',
      expEn: 'A particle of sulfur is **8 atoms joined in a ring**. Pairs of 2 atoms are **oxygen** (B); atoms alone are **neon** (C); atoms packed closely are **gold** (D).',
      expVn: 'Một hạt lưu huỳnh gồm **8 nguyên tử liên kết thành vòng**. Cặp 2 nguyên tử là **oxi** (B); nguyên tử đứng riêng là **neon** (C); nguyên tử xếp sát nhau là **vàng** (D).',
    },
  },

  // 12 ─ THE PERIODIC TABLE ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'LayoutGrid',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'The Periodic Table',
    titleVn: 'Bảng tuần hoàn',
    ratio: 45,
    image: img('ptwall.jpg'),
    content:
      'All **118** elements in one chart: 94 natural, 24 made by scientists.\n\n' +
      'You will find one on the wall of almost every science lab. In this lesson you learn the **first 20**.',
    contentVn:
      'Tất cả **118** nguyên tố trong một bảng: 94 tự nhiên, 24 do nhà khoa học tạo ra.\n\n' +
      'Hầu như phòng thí nghiệm khoa học nào cũng treo một bảng như vậy. Trong bài này em học **20 nguyên tố đầu tiên**.',
    notes: [
      {
        tone: 'write',
        text: '**The Periodic Table:** a way of arranging all the elements.',
        textVn: '**Bảng tuần hoàn (The Periodic Table):** một cách sắp xếp tất cả các nguyên tố.',
      },
    ],
  },

  // 13 ─ Rows and columns (widget) ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'The first 20 elements',
    eyebrowVn: '20 nguyên tố đầu tiên',
    title: 'Rows and Columns',
    titleVn: 'Hàng và cột',
    widget: TableRowsCols,
    caption: 'Press **Next row**, then **Next column**. A **row** goes across →   A **column** goes down ↓',
    captionVn: 'Bấm **Hàng tiếp**, rồi **Cột tiếp**. Một **hàng** đi ngang →   Một **cột** đi xuống ↓',
  },

  // 14 ─ Words with two meanings + CHECK ───────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    title: 'Words With Two Meanings',
    titleVn: 'Từ có hai nghĩa',
    inlineSvg: DIAGRAMS.TWO_MEANINGS,
    caption: 'Same word. A different meaning in science.',
    captionVn: 'Cùng một từ, nghĩa khác trong khoa học: **table** = bảng, **period** = chu kì, **group** = nhóm.',
    check: {
      id: 'chk_period',
      q: 'In the Periodic Table, what is a **period**?',
      qVn: 'Trong Bảng tuần hoàn, **period** (chu kì) là gì?',
      options: [
        { val: 'A', text: 'One lesson at school', textVn: 'Một tiết học ở trường' },
        { val: 'B', text: 'A column of elements', textVn: 'Một cột nguyên tố' },
        { val: 'C', text: 'A row of elements', textVn: 'Một hàng nguyên tố' },
        { val: 'D', text: 'People together', textVn: 'Một nhóm người' },
      ],
      correct: 'C',
      expEn: 'In the Periodic Table a **period** is a **row**, going across. "One lesson" is the everyday meaning (A); a column is a **group** (B); "people together" is the everyday meaning of group (D).',
      expVn: 'Trong Bảng tuần hoàn, **period** là một **hàng**, đi ngang. "Một tiết học" là nghĩa đời thường (A); một cột là **group** — nhóm (B); "một nhóm người" là nghĩa đời thường của group (D).',
    },
  },

  // 15 ─ PERIOD and GROUP: tap to explore (widget) ─────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MousePointerClick',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    title: 'Periods and Groups',
    titleVn: 'Chu kì và nhóm',
    ratio: 40,
    widget: TableExplore,
    content:
      'Tap any element. Its **period** (row) and its **group** (column) light up.\n\n' +
      'Try **hydrogen**. It floats on its own: in this table it is in **no group**.',
    contentVn:
      'Chạm vào một nguyên tố bất kì. **Chu kì** (hàng) và **nhóm** (cột) của nó sẽ sáng lên.\n\n' +
      'Thử **hiđro** xem. Nó đứng riêng một mình: trong bảng này nó **không thuộc nhóm nào**.',
    notes: [
      {
        tone: 'write',
        text: '**Period:** a row in the Periodic Table.\n**Group:** a column in the Periodic Table.',
        textVn: '**Chu kì (period):** một hàng trong Bảng tuần hoàn.\n**Nhóm (group):** một cột trong Bảng tuần hoàn.',
      },
    ],
  },

  // 16 ─ PERIODIC — find group 1 ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Columns3',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Find a Group',
    titleVn: 'Tìm một nhóm',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'A **group** is a column. Its elements go **down** the table.',
    textVn: 'Một **nhóm** là một cột. Các nguyên tố của nó đi **xuống** theo bảng.',
    sub: 'Tap every element in **group 1**.',
    subVn: 'Chạm vào mọi nguyên tố trong **nhóm 1**.',
    activity: {
      id: 'act_group1',
      type: 'periodic',
      prompt: 'Tap every element in group 1.',
      promptVn: 'Chạm vào mọi nguyên tố trong nhóm 1.',
      query: { group: 1 },
      explain: 'Group 1 is the first column: **lithium (Li)**, **sodium (Na)** and **potassium (K)**. Hydrogen floats above the gap in this table, so it is not in group 1.',
      explainVn: 'Nhóm 1 là cột đầu tiên: **liti (Li)**, **natri (Na)** và **kali (K)**. Trong bảng này hiđro đứng riêng phía trên khoảng trống, nên nó không thuộc nhóm 1.',
    },
  },

  // 17 ─ Lightest to heaviest (widget) + CHECK ─────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Read it like a page of English',
    eyebrowVn: 'Đọc như đọc một trang tiếng Anh',
    title: 'Lightest to Heaviest',
    titleVn: 'Từ nhẹ nhất đến nặng nhất',
    widget: TableMass,
    caption: 'Press **Next atom**. Left to right, then the next row: the atoms get **heavier**. Say each name out loud.',
    captionVn: 'Bấm **Nguyên tử tiếp**. Từ trái sang phải, rồi xuống hàng tiếp: nguyên tử **nặng dần**. Đọc to từng tên.',
    check: {
      id: 'chk_heaviest',
      q: 'Of the first 20 elements, which has the **heaviest** atoms?',
      qVn: 'Trong 20 nguyên tố đầu tiên, nguyên tố nào có nguyên tử **nặng nhất**?',
      options: [
        { val: 'A', text: 'Calcium', textVn: 'Canxi (calcium)' },
        { val: 'B', text: 'Argon', textVn: 'Agon (argon)' },
        { val: 'C', text: 'Hydrogen', textVn: 'Hiđro (hydrogen)' },
        { val: 'D', text: 'Helium', textVn: 'Heli (helium)' },
      ],
      correct: 'A',
      expEn: 'Read the table like a page: the **last** element, **calcium**, has the heaviest atoms. Argon only ends period 3 (B); **hydrogen** comes first, so it has the **lightest** atoms (C); helium is second (D).',
      expVn: 'Đọc bảng như đọc một trang sách: nguyên tố **cuối cùng**, **canxi**, có nguyên tử nặng nhất. Agon chỉ đứng cuối chu kì 3 (B); **hiđro** đứng đầu tiên nên có nguyên tử **nhẹ nhất** (C); heli đứng thứ hai (D).',
    },
  },

  // 18 ─ Metals and non-metals (widget) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Layers',
    eyebrow: 'Look at the colours',
    eyebrowVn: 'Nhìn màu sắc',
    title: 'Metals and Non-metals',
    titleVn: 'Kim loại và phi kim',
    widget: TableMetals,
    caption: 'Press **Next**. The table puts **similar** elements **close together**: metals on the left, non-metals on the right.',
    captionVn: 'Bấm **Tiếp**. Bảng xếp các nguyên tố **giống nhau** ở **gần nhau**: kim loại bên trái, phi kim bên phải.',
  },

  // 19 ─ Which photo is not a metal? + CHECK ───────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Five metals and one that is not',
    eyebrowVn: 'Năm kim loại và một chất không phải',
    title: 'Metal or Non-metal?',
    titleVn: 'Kim loại hay phi kim?',
    inlineSvg: PHOTOS.METAL_QUIZ,
    caption: 'Five of these are metals. **One is not.** Look at each one before you choose.',
    captionVn: 'Năm chất là kim loại. **Một chất thì không.** Nhìn kỹ từng chất trước khi chọn. (aluminium = nhôm, zinc = kẽm, lead = chì, copper = đồng, iron = sắt, bromine = brom)',
    check: {
      id: 'chk_bromine',
      q: 'Which one is **not** a metal?',
      qVn: 'Chất nào **không phải** kim loại?',
      options: [
        { val: 'A', text: 'Aluminium', textVn: 'Nhôm (aluminium)' },
        { val: 'B', text: 'Bromine', textVn: 'Brom (bromine)' },
        { val: 'C', text: 'Lead', textVn: 'Chì (lead)' },
        { val: 'D', text: 'Copper', textVn: 'Đồng (copper)' },
      ],
      correct: 'B',
      expEn: '**Bromine** is a non-metal — and a red-brown **liquid** in its glass vial. Aluminium (A), lead (C) and copper (D), like zinc and iron, are all metals: shiny solids.',
      expVn: '**Brom** là phi kim — và là một **chất lỏng** màu nâu đỏ trong lọ thủy tinh. Nhôm (A), chì (C) và đồng (D), cũng như kẽm và sắt, đều là kim loại: chất rắn sáng bóng.',
    },
  },

  // 20 ─ METALS + PERIODIC — the metals in period 3 ────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Hammer',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    title: 'Metals',
    titleVn: 'Kim loại',
    content:
      'Iron, copper and aluminium are **metals**. Bromine was the one that is not.\n\n' +
      'In the book\'s table the metals are **yellow** and the non-metals are **blue**. The metals sit on the **left** of each row.',
    contentVn:
      'Sắt, đồng và nhôm là **kim loại**. Brom là chất không phải kim loại.\n\n' +
      'Trong bảng của sách, kim loại màu **vàng** và phi kim màu **xanh**. Kim loại nằm ở bên **trái** mỗi hàng.',
    notes: [
      {
        tone: 'write',
        text: '**Metals:** elements like iron, copper and aluminium.\nIn the Periodic Table, metals are yellow. Non-metals are blue.',
        textVn: '**Kim loại (metals):** các nguyên tố như sắt, đồng và nhôm.\nTrong Bảng tuần hoàn, kim loại màu vàng. Phi kim màu xanh.',
      },
    ],
    activity: {
      id: 'act_period3_metals',
      type: 'periodic',
      prompt: 'Tap every metal in period 3.',
      promptVn: 'Chạm vào mọi kim loại trong chu kì 3.',
      query: { period: 3, metal: true },
      explain: 'Period 3 is the third row. Its metals are **sodium (Na)**, **magnesium (Mg)** and **aluminium (Al)** — all on the left. From silicon to argon, the rest of the row is non-metals.',
      explainVn: 'Chu kì 3 là hàng thứ ba. Các kim loại của nó là **natri (Na)**, **magie (Mg)** và **nhôm (Al)** — đều ở bên trái. Từ silic đến agon, phần còn lại của hàng là phi kim.',
    },
  },

  // 21 ─ PREDICT — why Na? ─────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Why Na?',
    titleVn: 'Tại sao là Na?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'The symbol for **sodium** is **Na**.',
    textVn: 'Kí hiệu của **sodium** (natri) là **Na**.',
    sub: 'Sodium starts with **S**. So where does **Na** come from?',
    subVn: 'Sodium bắt đầu bằng chữ **S**. Vậy **Na** từ đâu ra?',
    activity: {
      id: 'act_why_na',
      type: 'predict',
      prompt: 'Where does the symbol Na come from?',
      promptVn: 'Kí hiệu Na đến từ đâu?',
      options: [
        { val: 'taken', name: 'S was already used by sulfur, so two other letters were picked', nameVn: 'S đã được dùng cho lưu huỳnh, nên người ta chọn hai chữ khác' },
        { val: 'latin', name: 'From sodium\'s old Latin name, natrium', nameVn: 'Từ tên La-tinh cổ của sodium, natrium' },
        { val: 'mistake', name: 'It is a mistake that was never fixed', nameVn: 'Đó là một lỗi chưa bao giờ được sửa' },
      ],
      correct: 'latin',
      explain: '**Na** comes from **natrium**, the old Latin name for sodium. Sulfur does use **S** — but that is not why. The Vietnamese name **natri** comes from the same Latin word.',
      explainVn: '**Na** đến từ **natrium**, tên La-tinh cổ của sodium. Lưu huỳnh đúng là dùng **S** — nhưng đó không phải lý do. Tên tiếng Việt **natri** cũng đến từ chính từ La-tinh đó.',
    },
  },

  // 22 ─ SYMBOL + SORT — three ways to make a symbol ───────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'PenLine',
    eyebrow: 'Three ways to make a symbol',
    eyebrowVn: 'Ba cách tạo kí hiệu',
    title: 'Chemical Symbols',
    titleVn: 'Kí hiệu hóa học',
    ratio: 50,
    inlineSvg: DIAGRAMS.SYMBOL_WAYS,
    content: '**O** is the first letter of oxygen. **He** adds a second letter from helium. **Na** comes from **natrium**.\n\nIf a symbol has letters that are not in the English name, look for a Latin name.',
    contentVn: '**O** là chữ cái đầu của oxygen. **He** thêm một chữ cái thứ hai từ helium. **Na** đến từ **natrium**.\n\nNếu kí hiệu có chữ cái không nằm trong tên tiếng Anh, hãy nghĩ đến một tên La-tinh.',
    notes: [
      {
        tone: 'write',
        text: '**Symbol:** a short way to write the name of an element.\nThe first letter is always a capital (upper case). The second is always small (lower case).',
        textVn: '**Kí hiệu (symbol):** cách viết ngắn gọn tên của một nguyên tố.\nChữ cái đầu luôn viết hoa. Chữ cái thứ hai luôn viết thường.',
      },
    ],
    activity: {
      id: 'act_symbol_ways',
      type: 'sort',
      prompt: 'Sort the symbols: how was each one made?',
      promptVn: 'Sắp xếp các kí hiệu: mỗi kí hiệu được tạo ra như thế nào?',
      bins: [
        { id: 'first', name: 'The first letter', nameVn: 'Chữ cái đầu' },
        { id: 'two', name: 'First letter + another letter', nameVn: 'Chữ cái đầu + một chữ khác' },
        { id: 'latin', name: 'From a Latin name', nameVn: 'Từ một tên La-tinh' },
      ],
      cards: [
        { id: 'c', name: 'C — carbon', nameVn: 'C — carbon (cacbon)', bin: 'first' },
        { id: 'f', name: 'F — fluorine', nameVn: 'F — fluorine (flo)', bin: 'first' },
        { id: 'mg', name: 'Mg — magnesium', nameVn: 'Mg — magnesium (magie)', bin: 'two' },
        { id: 'cl', name: 'Cl — chlorine', nameVn: 'Cl — chlorine (clo)', bin: 'two' },
        { id: 'ca', name: 'Ca — calcium', nameVn: 'Ca — calcium (canxi)', bin: 'two' },
        { id: 'k', name: 'K — potassium', nameVn: 'K — potassium (kali)', bin: 'latin' },
        { id: 'fe', name: 'Fe — iron', nameVn: 'Fe — iron (sắt)', bin: 'latin' },
      ],
      explain: '**C** and **F** are first letters. **Mg**, **Cl** and **Ca** add a second letter — carbon, calcium and chlorine all start with C, so the small letter tells them apart. There is no K in "potassium" and no F or e in "iron": **K** is from **kalium** and **Fe** from **ferrum**, their Latin names.',
      explainVn: '**C** và **F** là chữ cái đầu. **Mg**, **Cl** và **Ca** thêm một chữ cái thứ hai — carbon, calcium và chlorine đều bắt đầu bằng C, nên chữ thường giúp phân biệt chúng. Trong "potassium" không có chữ K, trong "iron" không có F hay e: **K** đến từ **kalium** và **Fe** từ **ferrum**, tên La-tinh của chúng.',
    },
  },

  // 23 ─ Capitals matter: Co or CO? + CHECK ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Eye',
    eyebrow: 'Spot the difference',
    eyebrowVn: 'Tìm điểm khác nhau',
    title: 'Capitals Matter',
    titleVn: 'Chữ hoa rất quan trọng',
    text: '**Co** and **CO** look almost the same.',
    textVn: '**Co** và **CO** trông gần giống nhau.',
    sub: 'Every symbol starts with **one** capital letter. So how many symbols are in each?',
    subVn: 'Mỗi kí hiệu bắt đầu bằng **một** chữ hoa. Vậy mỗi cách viết có bao nhiêu kí hiệu?',
    check: {
      id: 'chk_co',
      q: 'What does **CO**, with two capital letters, mean?',
      qVn: '**CO**, với hai chữ hoa, có nghĩa là gì?',
      options: [
        { val: 'A', text: 'Cobalt, one element', textVn: 'Coban, một nguyên tố' },
        { val: 'B', text: 'The same as Co — capitals do not matter', textVn: 'Giống Co — chữ hoa không quan trọng' },
        { val: 'C', text: 'Copper', textVn: 'Đồng (copper)' },
        { val: 'D', text: 'Two elements: carbon (C) and oxygen (O)', textVn: 'Hai nguyên tố: cacbon (C) và oxi (O)' },
      ],
      correct: 'D',
      expEn: 'Two capitals means **two symbols**: **C** is carbon and **O** is oxygen. **Co**, with a small o, is one element — cobalt, a metal (A); so capitals do matter (B). Copper is **Cu** (C).',
      expVn: 'Hai chữ hoa nghĩa là **hai kí hiệu**: **C** là cacbon và **O** là oxi. **Co**, với chữ o thường, là một nguyên tố — coban, một kim loại (A); vậy chữ hoa rất quan trọng (B). Đồng là **Cu** (C).',
    },
  },

  // 24 ─ Questions 1–4 + PERIODIC — potassium, names hidden ────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Questions 1–4',
    eyebrowVn: 'Câu hỏi 1–4',
    title: 'Atoms, Elements, Symbols',
    titleVn: 'Nguyên tử, nguyên tố, kí hiệu',
    content:
      '> **1.** What are atoms?\n' +
      '> **2.** There are 94 kinds of natural atom. How many natural elements are there?\n' +
      '> **3.** Name the elements with the symbols Mg, Be, Li and N.\n' +
      '> **4.** Find the symbols for aluminium, boron, fluorine and potassium.\n\n' +
      'Answer 1–3 in your head, then press Check. The hardest part of question 4 is below — with the names hidden.',
    contentVn:
      '> **1.** Nguyên tử là gì?\n' +
      '> **2.** Có 94 loại nguyên tử tự nhiên. Có bao nhiêu nguyên tố tự nhiên?\n' +
      '> **3.** Gọi tên các nguyên tố có kí hiệu Mg, Be, Li và N.\n' +
      '> **4.** Tìm kí hiệu của aluminium, boron, fluorine và potassium.\n\n' +
      'Trả lời câu 1–3 trong đầu, rồi bấm Kiểm tra. Phần khó nhất của câu 4 ở bên dưới — với tên được ẩn đi.',
    reveal: {
      label: 'Check 1–3',
      labelVn: 'Kiểm tra 1–3',
      answer: '**1.** Tiny pieces of matter. Everything is made of atoms.\n**2.** 94.\n**3.** magnesium, beryllium, lithium, nitrogen',
      answerVn: '**1.** Những mẩu vật chất rất nhỏ. Mọi thứ đều được tạo nên từ nguyên tử.\n**2.** 94.\n**3.** magnesium (magie), beryllium (beri), lithium (liti), nitrogen (nitơ)',
    },
    activity: {
      id: 'act_potassium',
      type: 'periodic',
      prompt: 'Question 4: tap potassium. The names are hidden — find it by its symbol.',
      promptVn: 'Câu 4: chạm vào potassium (kali). Tên đã được ẩn — hãy tìm theo kí hiệu.',
      query: { name: 'potassium' },
      names: false,
      explain: 'Potassium is **K**, from its Latin name **kalium** — period 4, group 1. The other three in question 4 are **Al** (aluminium), **B** (boron) and **F** (fluorine).',
      explainVn: 'Potassium (kali) là **K**, từ tên La-tinh **kalium** — chu kì 4, nhóm 1. Ba nguyên tố còn lại ở câu 4 là **Al** (nhôm), **B** (bo) và **F** (flo).',
    },
  },

  // 25 ─ Questions 5–8 + PERIODIC — the same group as helium ───────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Questions 5–8',
    eyebrowVn: 'Câu hỏi 5–8',
    title: 'Reading the Table',
    titleVn: 'Đọc bảng tuần hoàn',
    content:
      '> **5.** Which element has atoms with the smallest mass?\n' +
      '> **6.** Of the first 20 elements, which has atoms with the greatest mass?\n' +
      '> **7.** Give the **names** of two elements in the same period as magnesium.\n' +
      '> **8.** Give the **symbols** of two elements in the same group as helium.\n\n' +
      'Answer 5–7 in your head, then press Check. Question 8 is below.',
    contentVn:
      '> **5.** Nguyên tố nào có nguyên tử khối lượng nhỏ nhất?\n' +
      '> **6.** Trong 20 nguyên tố đầu tiên, nguyên tố nào có nguyên tử khối lượng lớn nhất?\n' +
      '> **7.** Viết **tên** hai nguyên tố cùng chu kì với magnesium.\n' +
      '> **8.** Viết **kí hiệu** hai nguyên tố cùng nhóm với helium.\n\n' +
      'Trả lời câu 5–7 trong đầu, rồi bấm Kiểm tra. Câu 8 ở bên dưới.',
    reveal: {
      label: 'Check 5–7',
      labelVn: 'Kiểm tra 5–7',
      answer: '**5.** hydrogen\n**6.** calcium\n**7.** Any two of: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon',
      answerVn: '**5.** hydrogen (hiđro)\n**6.** calcium (canxi)\n**7.** Hai trong số: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon',
    },
    activity: {
      id: 'act_helium_group',
      type: 'periodic',
      prompt: 'Question 8: tap every other element in the same group as helium.',
      promptVn: 'Câu 8: chạm vào mọi nguyên tố khác cùng nhóm với helium (heli).',
      query: { sameGroupAs: 'He' },
      explain: 'Helium is at the top of **group 8**, the last column. Below it are **Ne** (neon) and **Ar** (argon). Hydrogen sits in period 1 with helium, but it is in no group.',
      explainVn: 'Heli ở đầu **nhóm 8**, cột cuối cùng. Bên dưới nó là **Ne** (neon) và **Ar** (agon). Hiđro cùng chu kì 1 với heli, nhưng không thuộc nhóm nào.',
    },
  },

  // 26 ─ Checklist + CHECK (the exit question) ─────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content:
      'Next: the Vocab, then **Element Hunt** — a new hunt around the table every time you play.\n\n' +
      'Last question: three elements that all start with **C**.',
    contentVn:
      'Tiếp theo: Từ vựng, rồi **Truy tìm nguyên tố** — mỗi lần chơi là một cuộc truy tìm mới quanh bảng tuần hoàn.\n\n' +
      'Câu hỏi cuối: ba nguyên tố đều bắt đầu bằng chữ **C**.',
    items: [
      { text: 'Explain what an **atom** and an **element** are.', textVn: 'Giải thích **nguyên tử** và **nguyên tố** là gì.' },
      { text: 'Describe how atoms **join together**: alone, packed closely, or in small particles.', textVn: 'Mô tả cách các nguyên tử **liên kết**: đứng riêng, xếp sát nhau, hoặc thành hạt nhỏ.' },
      { text: 'Find **periods**, **groups**, **metals** and **non-metals** in the first 20 elements.', textVn: 'Tìm **chu kì**, **nhóm**, **kim loại** và **phi kim** trong 20 nguyên tố đầu tiên.' },
      { text: 'Write **symbols** with a capital first letter and a small second letter.', textVn: 'Viết **kí hiệu** với chữ cái đầu viết hoa và chữ cái thứ hai viết thường.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Which gives the symbols for **carbon**, **calcium** and **chlorine**, in that order?',
      qVn: 'Dãy nào là kí hiệu của **carbon** (cacbon), **calcium** (canxi) và **chlorine** (clo), theo đúng thứ tự?',
      options: [
        { val: 'A', text: 'C, Ca, Cl', textVn: 'C, Ca, Cl' },
        { val: 'B', text: 'C, CA, CL', textVn: 'C, CA, CL' },
        { val: 'C', text: 'Ca, C, Cl', textVn: 'Ca, C, Cl' },
        { val: 'D', text: 'C, Cm, Ch', textVn: 'C, Cm, Ch' },
      ],
      correct: 'A',
      expEn: 'Carbon is **C**, calcium is **Ca**, chlorine is **Cl**. All three start with C, so the **small** second letter tells them apart. CA and CL (B) would each be two elements; C has carbon and calcium swapped; Cm and Ch (D) use letters that are not the symbols.',
      expVn: 'Cacbon là **C**, canxi là **Ca**, clo là **Cl**. Cả ba đều bắt đầu bằng C, nên chữ cái thứ hai **viết thường** giúp phân biệt. CA và CL (B) mỗi cái sẽ là hai nguyên tố; C đảo ngược cacbon và canxi; Cm và Ch (D) dùng chữ cái không phải kí hiệu.',
    },
  },
];
