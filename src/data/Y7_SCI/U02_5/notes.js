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
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 2 · 2.5',
    eyebrowVn: 'Chương 2 · 2.5',
    eyebrowFr: 'Unité 2 · 2.5',
    title: 'Atoms, Elements and the Periodic Table',
    titleVn: 'Nguyên tử, Nguyên tố và Bảng tuần hoàn',
    titleFr: 'Atomes, éléments et tableau périodique',
    objective: 'Explain what an atom and an element are, describe how atoms join together, find periods, groups, metals and non-metals in the first 20 elements, and write element symbols correctly.',
    objectiveVn: 'Giải thích nguyên tử và nguyên tố là gì, mô tả cách các nguyên tử liên kết với nhau, tìm chu kì, nhóm, kim loại và phi kim trong 20 nguyên tố đầu tiên, và viết đúng kí hiệu của nguyên tố.',
    objectiveFr: 'Expliquer ce que sont un atome et un élément, décrire comment les atomes s’assemblent, trouver les périodes, les groupes, les métaux et les non-métaux parmi les 20 premiers éléments, et écrire correctement les symboles des éléments.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans ce cours',
      text: 'You will **tap**, **guess**, **predict** and **sort** your way through it. **18 things are scored** — the first one is on the next slide.',
      textVn: 'Em sẽ **chạm**, **đoán**, **dự đoán** và **sắp xếp** trong suốt bài học. **18 mục được tính điểm** — mục đầu tiên ở slide sau.',
      textFr: 'Tu vas **toucher**, **estimer**, **prédire** et **trier** tout au long du cours. **18 choses sont notées** — la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: HOTSPOT — the particles in a solid ────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Start with what you know',
    eyebrowVn: 'Bắt đầu từ điều em đã biết',
    eyebrowFr: 'Pars de ce que tu sais',
    title: 'Particles in a Solid',
    titleVn: 'Các hạt trong chất rắn',
    titleFr: 'Les particules d’un solide',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelFr: 'Touche',
    labelIcon: 'MousePointerClick',
    text: 'Everything is made of **particles**. Three boxes, three states.',
    textVn: 'Mọi thứ đều được tạo nên từ các **hạt**. Ba chiếc hộp, ba trạng thái.',
    textFr: 'Tout est fait de **particules**. Trois boîtes, trois états.',
    sub: 'Tap the box that shows a **solid**. Then think: what must you do to a solid to make it **melt**?',
    subVn: 'Chạm vào hộp cho thấy một **chất rắn**. Rồi suy nghĩ: em phải làm gì để chất rắn **nóng chảy**?',
    subFr: 'Touche la boîte qui montre un **solide**. Puis réfléchis : que dois-tu faire à un solide pour qu’il **fonde** ?',
    activity: {
      id: 'act_solid',
      type: 'hotspot',
      prompt: 'Tap the box that shows the particles in a solid.',
      promptVn: 'Chạm vào hộp cho thấy các hạt trong chất rắn.',
      promptFr: 'Touche la boîte qui montre les particules d’un solide.',
      svg: DIAGRAMS.PARTICLE_BOXES,
      viewBox: '0 0 900 340',
      targets: [
        { id: 'liquid', x: 150, y: 150, r: 118, name: 'the left box: a liquid — touching, but not in rows', nameVn: 'hộp bên trái: chất lỏng — sát nhau nhưng không xếp hàng', nameFr: 'la boîte de gauche : un liquide — les particules se touchent, mais pas en rangées' },
        { id: 'gas', x: 450, y: 150, r: 118, name: 'the middle box: a gas — far apart', nameVn: 'hộp ở giữa: chất khí — ở xa nhau', nameFr: 'la boîte du milieu : un gaz — très éloignées' },
        { id: 'solid', x: 750, y: 150, r: 118, name: 'the right box: a solid — packed in rows', nameVn: 'hộp bên phải: chất rắn — xếp sát thành hàng', nameFr: 'la boîte de droite : un solide — serrées en rangées' },
      ],
      correct: 'solid',
      explain: 'In a **solid** (the right box) the particles are **packed closely in rows** and only vibrate. To **melt** it, **heat** it: the particles vibrate more and more until they break out of their rows. This lesson asks: what are those particles made of?',
      explainVn: 'Trong **chất rắn** (hộp bên phải), các hạt **xếp sát nhau thành hàng** và chỉ dao động. Để nó **nóng chảy**, hãy **đun nóng**: các hạt dao động ngày càng mạnh cho tới khi thoát khỏi hàng. Bài này hỏi: những hạt đó được tạo nên từ gì?',
      explainFr: 'Dans un **solide** (la boîte de droite), les particules sont **serrées en rangées** et vibrent seulement. Pour le faire **fondre**, **chauffe-le** : les particules vibrent de plus en plus jusqu’à sortir de leurs rangées. Ce cours pose la question : de quoi sont faites ces particules ?',
    },
  },

  // 3 ─ PREDICT — can you cut forever? ─────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Scissors',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    eyebrowFr: 'Prédis d’abord',
    title: 'Can You Cut Forever?',
    titleVn: 'Có cắt mãi được không?',
    titleFr: 'Peut-on couper sans fin ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'You cut a piece of **gold** in half. Then in half again. And again.',
    textVn: 'Em cắt đôi một miếng **vàng**. Rồi lại cắt đôi. Cứ thế mãi.',
    textFr: 'Tu coupes un morceau d’**or** en deux. Puis encore en deux. Et encore.',
    sub: 'With a sharp enough knife, could you keep cutting **forever**?',
    subVn: 'Với một con dao đủ sắc, em có thể cắt **mãi mãi** không?',
    subFr: 'Avec un couteau assez tranchant, pourrais-tu continuer à couper **sans fin** ?',
    activity: {
      id: 'act_cut_forever',
      type: 'predict',
      prompt: 'Could you keep cutting the gold in half forever?',
      promptVn: 'Em có thể cắt đôi miếng vàng mãi mãi không?',
      promptFr: 'Pourrais-tu couper l’or en deux sans fin ?',
      options: [
        { val: 'yes', name: 'Yes — there is always a smaller half', nameVn: 'Có — luôn còn một nửa nhỏ hơn', nameFr: 'Oui — il y a toujours une moitié plus petite' },
        { val: 'no', name: 'No — in the end you reach a piece that cannot be cut', nameVn: 'Không — cuối cùng em đến một mẩu không thể cắt được nữa', nameFr: 'Non — à la fin, tu arrives à un morceau qu’on ne peut pas couper' },
        { val: 'vanish', name: 'No — in the end the gold disappears', nameVn: 'Không — cuối cùng miếng vàng biến mất', nameFr: 'Non — à la fin, l’or disparaît' },
      ],
      correct: 'no',
      explain: 'Over 2000 years ago the Greek thinker **Democritus** said **no**: keep cutting and you reach a tiny piece that **cannot be cut**. It never disappears — the last piece is still gold. The next slide names it.',
      explainVn: 'Hơn 2000 năm trước, nhà tư tưởng Hy Lạp **Democritus** nói **không**: cứ cắt mãi, em sẽ đến một mẩu rất nhỏ **không thể cắt** được nữa. Nó không bao giờ biến mất — mẩu cuối cùng vẫn là vàng. Slide sau sẽ gọi tên nó.',
      explainFr: 'Il y a plus de 2000 ans, le penseur grec **Democritus** a dit **non** : continue à couper et tu arrives à un tout petit morceau qu’on **ne peut pas couper**. Il ne disparaît jamais — le dernier morceau est toujours de l’or. La diapo suivante lui donne son nom.',
    },
  },

  // 4 ─ Democritus + ATOM + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Greece, over 2000 years ago',
    eyebrowVn: 'Hy Lạp, hơn 2000 năm trước',
    eyebrowFr: 'Grèce, il y a plus de 2000 ans',
    title: 'Democritus Said No',
    titleVn: 'Democritus nói: Không',
    titleFr: 'Democritus a dit non',
    ratio: 55,
    image: img('democritus.jpg'),
    content: 'Keep cutting, and you reach a piece that **cannot be cut**.\n\nThat tiny piece is an **atom**. Everything around you — gold, air, water, you — is made of atoms.',
    contentVn: 'Cứ cắt mãi, em sẽ đến một mẩu **không thể cắt** được nữa.\n\nMẩu rất nhỏ đó là một **nguyên tử**. Mọi thứ quanh em — vàng, không khí, nước, và cả em — đều được tạo nên từ nguyên tử.',
    contentFr: 'Continue à couper, et tu arrives à un morceau qu’on **ne peut pas couper**.\n\nCe tout petit morceau est un **atome**. Tout ce qui t’entoure — l’or, l’air, l’eau, toi — est fait d’atomes.',
    notes: [
      {
        tone: 'write',
        text: '**Atom:** a tiny piece of matter. Everything is made of atoms.\n"Atom" means "cannot be divided".',
        textVn: '**Nguyên tử (atom):** một mẩu vật chất rất nhỏ. Mọi thứ đều được tạo nên từ nguyên tử.\n"Atom" nghĩa là "không thể chia nhỏ".',
        textFr: '**Atome (atom) :** un tout petit morceau de matière. Tout est fait d’atomes.\n« Atom » veut dire « qu’on ne peut pas diviser ».',
      },
    ],
    check: {
      id: 'chk_atom',
      q: 'What does the word **atom** mean?',
      qVn: 'Từ **atom** (nguyên tử) có nghĩa là gì?',
      qFr: 'Que veut dire le mot **atom** (atome) ?',
      options: [
        { val: 'A', text: 'Very, very small', textVn: 'Rất, rất nhỏ', textFr: 'Tout, tout petit' },
        { val: 'B', text: 'Cannot be divided', textVn: 'Không thể chia nhỏ', textFr: 'Qu’on ne peut pas diviser' },
        { val: 'C', text: 'Made of gold', textVn: 'Làm bằng vàng', textFr: 'Fait d’or' },
        { val: 'D', text: 'Everything', textVn: 'Mọi thứ', textFr: 'Tout' },
      ],
      correct: 'B',
      expEn: '"Atom" means **cannot be divided** — the piece Democritus said you cannot cut. "Very, very small" is what **nano** means (you meet it soon); gold was only the example; and everything is *made of* atoms, which is not what the word means.',
      expVn: '"Atom" nghĩa là **không thể chia nhỏ** — mẩu mà Democritus nói em không thể cắt. "Rất, rất nhỏ" là nghĩa của **nano** (em sẽ gặp ngay sau đây); vàng chỉ là ví dụ; và mọi thứ được *tạo nên từ* nguyên tử, đó không phải là nghĩa của từ.',
      expFr: '« Atom » veut dire **qu’on ne peut pas diviser** — le morceau que Democritus disait impossible à couper. « Tout, tout petit », c’est le sens de **nano** (tu vas le voir bientôt) ; l’or n’était qu’un exemple ; et tout est *fait d’atomes*, mais ce n’est pas le sens du mot.',
    },
  },

  // 5 ─ ESTIMATE — how many cuts? ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Guess first',
    eyebrowVn: 'Đoán trước',
    eyebrowFr: 'Devine d’abord',
    title: 'How Many Cuts?',
    titleVn: 'Bao nhiêu lần cắt?',
    titleFr: 'Combien de coupes ?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelFr: 'Estime',
    labelIcon: 'Sparkles',
    text: 'A gold cube is **1 cm** wide. You cut it in half, again and again.',
    textVn: 'Một khối vàng rộng **1 cm**. Em cắt đôi nó, hết lần này đến lần khác.',
    textFr: 'Un cube d’or fait **1 cm** de large. Tu le coupes en deux, encore et encore.',
    sub: 'How many cuts until it is just **one atom** wide? Slide to your guess.',
    subVn: 'Cắt bao nhiêu lần thì nó chỉ còn rộng **một nguyên tử**? Kéo thanh trượt đến dự đoán của em.',
    subFr: 'Combien de coupes pour qu’il fasse juste **un atome** de large ? Fais glisser le curseur jusqu’à ton estimation.',
    activity: {
      id: 'act_cuts',
      type: 'estimate',
      prompt: 'How many cuts from a 1 cm gold cube to one gold atom?',
      promptVn: 'Cần bao nhiêu lần cắt để đi từ khối vàng 1 cm đến một nguyên tử vàng?',
      promptFr: 'Combien de coupes pour passer d’un cube d’or de 1 cm à un seul atome d’or ?',
      min: 1, max: 100, step: 1, answer: 25, tolerance: 0.3,
      explain: 'Only about **25**. Every cut halves the width, so it shrinks very fast: 3 cuts is a grain of sand, 9 is a cell, 17 is a virus, and 25 is **one gold atom**. Count them yourself on the next slide.',
      explainVn: 'Chỉ khoảng **25** lần. Mỗi lần cắt làm chiều rộng giảm một nửa, nên nó nhỏ đi rất nhanh: 3 lần là một hạt cát, 9 lần là một tế bào, 17 lần là một vi-rút, và 25 lần là **một nguyên tử vàng**. Tự đếm ở slide sau nhé.',
      explainFr: 'Seulement environ **25**. Chaque coupe divise la largeur par deux, donc elle diminue très vite : 3 coupes, c’est un grain de sable, 9, une cellule, 17, un virus, et 25, **un atome d’or**. Compte-les toi-même sur la diapo suivante.',
    },
  },

  // 6 ─ The halving counter (widget) ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Scissors',
    eyebrow: 'Press, and count',
    eyebrowVn: 'Bấm, và đếm',
    eyebrowFr: 'Appuie, et compte',
    title: 'Half, and Half Again',
    titleVn: 'Một nửa, rồi lại một nửa',
    titleFr: 'La moitié, puis encore la moitié',
    widget: HalvingWidget,
    caption: 'Press **Cut in half** and count each cut out loud. Was your guess close?',
    captionVn: 'Bấm **Cắt đôi** và đếm to từng lần cắt. Em đoán có gần đúng không?',
    captionFr: 'Appuie sur **Couper en deux** et compte chaque coupe à voix haute. Ton estimation était-elle proche ?',
  },

  // 7 ─ Atoms are real + NANOTUBE ──────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Microscope',
    eyebrow: 'Today we can see atoms',
    eyebrowVn: 'Ngày nay ta có thể nhìn thấy nguyên tử',
    eyebrowFr: 'Aujourd’hui, on peut voir les atomes',
    title: 'Atoms Are Real',
    titleVn: 'Nguyên tử là có thật',
    titleFr: 'Les atomes existent',
    columns: [
      {
        heading: 'Real gold atoms',
        headingVn: 'Nguyên tử vàng thật',
        headingFr: 'De vrais atomes d’or',
        accent: TEAL,
        image: img('stm.jpg'),
        caption: 'Each tiny bright dot is one atom, seen with a **scanning tunnelling microscope**.',
        captionVn: 'Mỗi chấm sáng nhỏ là một nguyên tử, chụp bằng **kính hiển vi quét xuyên hầm**.',
        captionFr: 'Chaque petit point brillant est un atome, vu avec un **microscope à effet tunnel**.',
      },
      {
        heading: 'A model of a nanotube',
        headingVn: 'Mô hình ống nano',
        headingFr: 'Un modèle de nanotube',
        accent: TEAL,
        image: img('nanotube.jpg'),
        caption: 'Each ball is one **carbon** atom.',
        captionVn: 'Mỗi quả bóng là một nguyên tử **cacbon**.',
        captionFr: 'Chaque boule est un atome de **carbone**.',
        notes: [
          {
            tone: 'write',
            text: '**Nanotube:** a very, very small tube made of carbon atoms.\n"Nano" means "very, very small".',
            textVn: '**Ống nano (nanotube):** một ống rất, rất nhỏ tạo nên từ nguyên tử cacbon.\n"Nano" nghĩa là "rất, rất nhỏ".',
            textFr: '**Nanotube (nanotube) :** un tube tout, tout petit, fait d’atomes de carbone.\n« Nano » veut dire « tout, tout petit ».',
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
    eyebrowFr: 'Regarde bien',
    title: 'Only One Kind of Atom',
    titleVn: 'Chỉ một loại nguyên tử',
    titleFr: 'Une seule sorte d’atome',
    inlineSvg: PHOTOS.ONE_KIND,
    caption: 'Each is made of **only one kind** of atom. Soft black graphite and hard sparkling diamond are **both** only carbon atoms, joined in different ways.',
    captionVn: 'Mỗi chất chỉ gồm **một loại** nguyên tử. Than chì đen, mềm và kim cương cứng, lấp lánh **đều** chỉ gồm nguyên tử cacbon, liên kết theo những cách khác nhau. (gold = vàng, silver = bạc)',
    captionFr: 'Chacun est fait d’**une seule sorte** d’atome. Le graphite, noir et mou, et le diamant, dur et brillant, sont **tous les deux** faits seulement d’atomes de carbone, assemblés de façons différentes. (or = gold, argent = silver)',
    check: {
      id: 'chk_graphite',
      q: 'Graphite and diamond look completely different. What are they made of?',
      qVn: 'Than chì và kim cương trông hoàn toàn khác nhau. Chúng được tạo nên từ gì?',
      qFr: 'Le graphite et le diamant ont l’air complètement différents. De quoi sont-ils faits ?',
      options: [
        { val: 'A', text: 'Many different kinds of atom, mixed together', textVn: 'Nhiều loại nguyên tử khác nhau trộn lẫn', textFr: 'Beaucoup de sortes d’atomes différentes, mélangées' },
        { val: 'B', text: 'Graphite is carbon; diamond is a different kind of atom', textVn: 'Than chì là cacbon; kim cương là một loại nguyên tử khác', textFr: 'Le graphite est du carbone ; le diamant est une autre sorte d’atome' },
        { val: 'C', text: 'Gold and silver atoms', textVn: 'Nguyên tử vàng và bạc', textFr: 'Des atomes d’or et d’argent' },
        { val: 'D', text: 'Only carbon atoms, joined in different ways', textVn: 'Chỉ nguyên tử cacbon, liên kết theo những cách khác nhau', textFr: 'Seulement des atomes de carbone, assemblés de façons différentes' },
      ],
      correct: 'D',
      expEn: 'Both are **only carbon atoms**; the atoms are joined differently, so they look and feel different. They are not a mixture (A), diamond is not a different kind of atom (B), and gold and silver are the other two photos (C).',
      expVn: 'Cả hai **chỉ gồm nguyên tử cacbon**; các nguyên tử liên kết khác nhau nên trông và cảm giác khác nhau. Chúng không phải hỗn hợp (A), kim cương không phải loại nguyên tử khác (B), còn vàng và bạc là hai ảnh kia (C).',
      expFr: 'Les deux sont faits **seulement d’atomes de carbone** ; les atomes sont assemblés différemment, donc ils n’ont pas le même aspect ni le même toucher. Ce n’est pas un mélange (A), le diamant n’est pas une autre sorte d’atome (B), et l’or et l’argent sont les deux autres photos (C).',
    },
  },

  // 9 ─ ELEMENT: the silver-ring zoom + CHECK (94) ─────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Element',
    titleVn: 'Nguyên tố',
    titleFr: 'Élément',
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
    contentFr: 'Le carbone, l’or et l’argent sont tous des **éléments**.\n\nChaque sorte d’atome a ses propres **propriétés**, donc chaque élément aussi.\n\nLes scientifiques ont trouvé **94** sortes d’atomes dans la nature.',
    notes: [
      {
        tone: 'write',
        text: '**Element:** a substance made of only one kind of atom.',
        textVn: '**Nguyên tố (element):** một chất chỉ được tạo nên từ một loại nguyên tử.',
        textFr: '**Élément (element) :** une substance faite d’une seule sorte d’atome.',
      },
    ],
    check: {
      id: 'chk_94',
      q: 'There are **94** kinds of atom in nature. How many natural **elements** are there?',
      qVn: 'Có **94** loại nguyên tử trong tự nhiên. Có bao nhiêu **nguyên tố** tự nhiên?',
      qFr: 'Il y a **94** sortes d’atomes dans la nature. Combien y a-t-il d’**éléments** naturels ?',
      options: [
        { val: 'A', text: '1', textVn: '1', textFr: '1' },
        { val: 'B', text: '47', textVn: '47', textFr: '47' },
        { val: 'C', text: '94', textVn: '94', textFr: '94' },
        { val: 'D', text: '118', textVn: '118', textFr: '118' },
      ],
      correct: 'C',
      expEn: 'An element is **one kind of atom**, so 94 kinds of atom make **94** natural elements. 118 also counts the **24** that scientists have made in laboratories; 47 wrongly halves it; 1 would mean every atom is the same.',
      expVn: 'Một nguyên tố là **một loại nguyên tử**, nên 94 loại nguyên tử tạo thành **94** nguyên tố tự nhiên. 118 là tính cả **24** nguyên tố do các nhà khoa học tạo ra trong phòng thí nghiệm; 47 là chia đôi sai; 1 thì có nghĩa mọi nguyên tử đều giống nhau.',
      expFr: 'Un élément, c’est **une sorte d’atome**, donc 94 sortes d’atomes font **94** éléments naturels. 118 compte aussi les **24** que les scientifiques ont fabriqués en laboratoire ; 47 divise par deux à tort ; 1 voudrait dire que tous les atomes sont pareils.',
    },
  },

  // 10 ─ How atoms join together ───────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Atom',
    eyebrow: 'Alone, packed, or joined',
    eyebrowVn: 'Riêng lẻ, xếp sát, hoặc liên kết',
    eyebrowFr: 'Seuls, serrés, ou liés',
    title: 'How Atoms Join Together',
    titleVn: 'Các nguyên tử liên kết như thế nào',
    titleFr: 'Comment les atomes s’assemblent',
    inlineSvg: DIAGRAMS.JOINING,
    caption: 'A few elements, like **neon**: atoms alone. **Most**, like **gold**: atoms packed closely. **A few**, like **oxygen** and **sulfur**: small particles of joined atoms.',
    captionVn: 'Một số ít nguyên tố, như **neon**: nguyên tử đứng riêng. **Hầu hết**, như **vàng**: nguyên tử xếp sát nhau. **Một số ít**, như **oxi** và **lưu huỳnh**: hạt nhỏ gồm các nguyên tử liên kết.',
    captionFr: 'Quelques éléments, comme le **néon** : des atomes seuls. **La plupart**, comme l’**or** : des atomes serrés. **Quelques-uns**, comme l’**oxygène** et le **soufre** : de petites particules d’atomes liés.',
  },

  // 11 ─ The joining, photographed + CHECK ─────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The drawings, for real',
    eyebrowVn: 'Hình vẽ, ngoài đời thật',
    eyebrowFr: 'Les dessins, en vrai',
    title: 'Neon, Oxygen, Sulfur',
    titleVn: 'Neon, Oxi, Lưu huỳnh',
    titleFr: 'Néon, oxygène, soufre',
    inlineSvg: PHOTOS.JOINING_REAL,
    caption: 'You cannot see the atoms in a photo — but the drawing on the last slide is what is inside each one.',
    captionVn: 'Em không nhìn thấy nguyên tử trong ảnh — nhưng hình vẽ ở slide trước chính là những gì ở bên trong mỗi chất.',
    captionFr: 'On ne voit pas les atomes sur une photo — mais le dessin de la diapo précédente montre ce qu’il y a dans chacun.',
    check: {
      id: 'chk_sulfur',
      q: 'How is a particle of **sulfur** made?',
      qVn: 'Một hạt **lưu huỳnh** được tạo nên như thế nào?',
      qFr: 'Comment est faite une particule de **soufre** ?',
      options: [
        { val: 'A', text: '8 atoms joined in a ring', textVn: '8 nguyên tử liên kết thành vòng', textFr: '8 atomes liés en anneau' },
        { val: 'B', text: '2 atoms joined in a pair', textVn: '2 nguyên tử liên kết thành cặp', textFr: '2 atomes liés en paire' },
        { val: 'C', text: '1 atom that moves around alone', textVn: '1 nguyên tử chuyển động riêng lẻ', textFr: '1 atome qui se déplace seul' },
        { val: 'D', text: 'Thousands of atoms packed closely, like gold', textVn: 'Hàng nghìn nguyên tử xếp sát nhau, như vàng', textFr: 'Des milliers d’atomes serrés, comme l’or' },
      ],
      correct: 'A',
      expEn: 'A particle of sulfur is **8 atoms joined in a ring**. Pairs of 2 atoms are **oxygen** (B); atoms alone are **neon** (C); atoms packed closely are **gold** (D).',
      expVn: 'Một hạt lưu huỳnh gồm **8 nguyên tử liên kết thành vòng**. Cặp 2 nguyên tử là **oxi** (B); nguyên tử đứng riêng là **neon** (C); nguyên tử xếp sát nhau là **vàng** (D).',
      expFr: 'Une particule de soufre, ce sont **8 atomes liés en anneau**. Des paires de 2 atomes, c’est l’**oxygène** (B) ; des atomes seuls, c’est le **néon** (C) ; des atomes serrés, c’est l’**or** (D).',
    },
  },

  // 12 ─ THE PERIODIC TABLE ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'LayoutGrid',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'The Periodic Table',
    titleVn: 'Bảng tuần hoàn',
    titleFr: 'Le tableau périodique',
    ratio: 45,
    image: img('ptwall.jpg'),
    content:
      'All **118** elements in one chart: 94 natural, 24 made by scientists.\n\n' +
      'You will find one on the wall of almost every science lab. In this lesson you learn the **first 20**.',
    contentVn:
      'Tất cả **118** nguyên tố trong một bảng: 94 tự nhiên, 24 do nhà khoa học tạo ra.\n\n' +
      'Hầu như phòng thí nghiệm khoa học nào cũng treo một bảng như vậy. Trong bài này em học **20 nguyên tố đầu tiên**.',
    contentFr: 'Les **118** éléments dans un seul tableau : 94 naturels, 24 fabriqués par les scientifiques.\n\nTu en trouveras un au mur de presque chaque labo de sciences. Dans ce cours, tu apprends les **20 premiers**.',
    notes: [
      {
        tone: 'write',
        text: '**The Periodic Table:** a way of arranging all the elements.',
        textVn: '**Bảng tuần hoàn (The Periodic Table):** một cách sắp xếp tất cả các nguyên tố.',
        textFr: '**Le tableau périodique (The Periodic Table) :** une façon de ranger tous les éléments.',
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
    eyebrowFr: 'Les 20 premiers éléments',
    title: 'Rows and Columns',
    titleVn: 'Hàng và cột',
    titleFr: 'Lignes et colonnes',
    widget: TableRowsCols,
    caption: 'Press **Next row**, then **Next column**. A **row** goes across →   A **column** goes down ↓',
    captionVn: 'Bấm **Hàng tiếp**, rồi **Cột tiếp**. Một **hàng** đi ngang →   Một **cột** đi xuống ↓',
    captionFr: 'Appuie sur **Ligne suivante**, puis sur **Colonne suivante**. Une **ligne** va de gauche à droite →   Une **colonne** descend ↓',
  },

  // 14 ─ Words with two meanings + CHECK ───────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Words With Two Meanings',
    titleVn: 'Từ có hai nghĩa',
    titleFr: 'Des mots à deux sens',
    inlineSvg: DIAGRAMS.TWO_MEANINGS,
    caption: 'Same word. A different meaning in science.',
    captionVn: 'Cùng một từ, nghĩa khác trong khoa học: **table** = bảng, **period** = chu kì, **group** = nhóm.',
    captionFr: 'Même mot, autre sens en sciences : **table** = tableau, **period** = période, **group** = groupe.',
    check: {
      id: 'chk_period',
      q: 'In the Periodic Table, what is a **period**?',
      qVn: 'Trong Bảng tuần hoàn, **period** (chu kì) là gì?',
      qFr: 'Dans le tableau périodique, qu’est-ce qu’une **period** (période) ?',
      options: [
        { val: 'A', text: 'One lesson at school', textVn: 'Một tiết học ở trường', textFr: 'Une heure de cours à l’école' },
        { val: 'B', text: 'A column of elements', textVn: 'Một cột nguyên tố', textFr: 'Une colonne d’éléments' },
        { val: 'C', text: 'A row of elements', textVn: 'Một hàng nguyên tố', textFr: 'Une ligne d’éléments' },
        { val: 'D', text: 'People together', textVn: 'Một nhóm người', textFr: 'Des gens ensemble' },
      ],
      correct: 'C',
      expEn: 'In the Periodic Table a **period** is a **row**, going across. "One lesson" is the everyday meaning (A); a column is a **group** (B); "people together" is the everyday meaning of group (D).',
      expVn: 'Trong Bảng tuần hoàn, **period** là một **hàng**, đi ngang. "Một tiết học" là nghĩa đời thường (A); một cột là **group** — nhóm (B); "một nhóm người" là nghĩa đời thường của group (D).',
      expFr: 'Dans le tableau périodique, une **period** est une **ligne**, de gauche à droite. « Une heure de cours », c’est le sens de tous les jours (A) ; une colonne, c’est un **group** — un groupe (B) ; « des gens ensemble », c’est le sens de tous les jours de group (D).',
    },
  },

  // 15 ─ PERIOD and GROUP: tap to explore (widget) ─────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MousePointerClick',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Periods and Groups',
    titleVn: 'Chu kì và nhóm',
    titleFr: 'Périodes et groupes',
    ratio: 40,
    widget: TableExplore,
    content:
      'Tap any element. Its **period** (row) and its **group** (column) light up.\n\n' +
      'Try **hydrogen**. It floats on its own: in this table it is in **no group**.',
    contentVn:
      'Chạm vào một nguyên tố bất kì. **Chu kì** (hàng) và **nhóm** (cột) của nó sẽ sáng lên.\n\n' +
      'Thử **hiđro** xem. Nó đứng riêng một mình: trong bảng này nó **không thuộc nhóm nào**.',
    contentFr: 'Touche n’importe quel élément. Sa **période** (ligne) et son **groupe** (colonne) s’allument.\n\nEssaie l’**hydrogène**. Il flotte tout seul : dans ce tableau, il n’est dans **aucun groupe**.',
    notes: [
      {
        tone: 'write',
        text: '**Period:** a row in the Periodic Table.\n**Group:** a column in the Periodic Table.',
        textVn: '**Chu kì (period):** một hàng trong Bảng tuần hoàn.\n**Nhóm (group):** một cột trong Bảng tuần hoàn.',
        textFr: '**Période (period) :** une ligne du tableau périodique.\n**Groupe (group) :** une colonne du tableau périodique.',
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
    eyebrowFr: 'À toi',
    title: 'Find a Group',
    titleVn: 'Tìm một nhóm',
    titleFr: 'Trouve un groupe',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelFr: 'Touche',
    labelIcon: 'MousePointerClick',
    text: 'A **group** is a column. Its elements go **down** the table.',
    textVn: 'Một **nhóm** là một cột. Các nguyên tố của nó đi **xuống** theo bảng.',
    textFr: 'Un **groupe** est une colonne. Ses éléments **descendent** le long du tableau.',
    sub: 'Tap every element in **group 1**.',
    subVn: 'Chạm vào mọi nguyên tố trong **nhóm 1**.',
    subFr: 'Touche tous les éléments du **groupe 1**.',
    activity: {
      id: 'act_group1',
      type: 'periodic',
      prompt: 'Tap every element in group 1.',
      promptVn: 'Chạm vào mọi nguyên tố trong nhóm 1.',
      promptFr: 'Touche tous les éléments du groupe 1.',
      query: { group: 1 },
      explain: 'Group 1 is the first column: **lithium (Li)**, **sodium (Na)** and **potassium (K)**. Hydrogen floats above the gap in this table, so it is not in group 1.',
      explainVn: 'Nhóm 1 là cột đầu tiên: **liti (Li)**, **natri (Na)** và **kali (K)**. Trong bảng này hiđro đứng riêng phía trên khoảng trống, nên nó không thuộc nhóm 1.',
      explainFr: 'Le groupe 1 est la première colonne : **lithium (Li)**, **sodium (Na)** et **potassium (K)**. Dans ce tableau, l’hydrogène flotte au-dessus du vide, donc il n’est pas dans le groupe 1.',
    },
  },

  // 17 ─ Lightest to heaviest (widget) + CHECK ─────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Read it like a page of English',
    eyebrowVn: 'Đọc như đọc một trang tiếng Anh',
    eyebrowFr: 'Lis-le comme une page en anglais',
    title: 'Lightest to Heaviest',
    titleVn: 'Từ nhẹ nhất đến nặng nhất',
    titleFr: 'Du plus léger au plus lourd',
    widget: TableMass,
    caption: 'Press **Next atom**. Left to right, then the next row: the atoms get **heavier**. Say each name out loud.',
    captionVn: 'Bấm **Nguyên tử tiếp**. Từ trái sang phải, rồi xuống hàng tiếp: nguyên tử **nặng dần**. Đọc to từng tên.',
    captionFr: 'Appuie sur **Atome suivant**. De gauche à droite, puis la ligne suivante : les atomes deviennent **plus lourds**. Dis chaque nom à voix haute.',
    check: {
      id: 'chk_heaviest',
      q: 'Of the first 20 elements, which has the **heaviest** atoms?',
      qVn: 'Trong 20 nguyên tố đầu tiên, nguyên tố nào có nguyên tử **nặng nhất**?',
      qFr: 'Parmi les 20 premiers éléments, lequel a les atomes les **plus lourds** ?',
      options: [
        { val: 'A', text: 'Calcium', textVn: 'Canxi (calcium)', textFr: 'Calcium' },
        { val: 'B', text: 'Argon', textVn: 'Agon (argon)', textFr: 'Argon' },
        { val: 'C', text: 'Hydrogen', textVn: 'Hiđro (hydrogen)', textFr: 'Hydrogène (hydrogen)' },
        { val: 'D', text: 'Helium', textVn: 'Heli (helium)', textFr: 'Hélium (helium)' },
      ],
      correct: 'A',
      expEn: 'Read the table like a page: the **last** element, **calcium**, has the heaviest atoms. Argon only ends period 3 (B); **hydrogen** comes first, so it has the **lightest** atoms (C); helium is second (D).',
      expVn: 'Đọc bảng như đọc một trang sách: nguyên tố **cuối cùng**, **canxi**, có nguyên tử nặng nhất. Agon chỉ đứng cuối chu kì 3 (B); **hiđro** đứng đầu tiên nên có nguyên tử **nhẹ nhất** (C); heli đứng thứ hai (D).',
      expFr: 'Lis le tableau comme une page : le **dernier** élément, le **calcium**, a les atomes les plus lourds. L’argon termine seulement la période 3 (B) ; l’**hydrogène** vient en premier, donc il a les atomes les **plus légers** (C) ; l’hélium est le deuxième (D).',
    },
  },

  // 18 ─ Metals and non-metals (widget) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Layers',
    eyebrow: 'Look at the colours',
    eyebrowVn: 'Nhìn màu sắc',
    eyebrowFr: 'Regarde les couleurs',
    title: 'Metals and Non-metals',
    titleVn: 'Kim loại và phi kim',
    titleFr: 'Métaux et non-métaux',
    widget: TableMetals,
    caption: 'Press **Next**. The table puts **similar** elements **close together**: metals on the left, non-metals on the right.',
    captionVn: 'Bấm **Tiếp**. Bảng xếp các nguyên tố **giống nhau** ở **gần nhau**: kim loại bên trái, phi kim bên phải.',
    captionFr: 'Appuie sur **Suivant**. Le tableau place les éléments **qui se ressemblent** **près les uns des autres** : les métaux à gauche, les non-métaux à droite.',
  },

  // 19 ─ Which photo is not a metal? + CHECK ───────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Five metals and one that is not',
    eyebrowVn: 'Năm kim loại và một chất không phải',
    eyebrowFr: 'Cinq métaux, et un qui n’en est pas un',
    title: 'Metal or Non-metal?',
    titleVn: 'Kim loại hay phi kim?',
    titleFr: 'Métal ou non-métal ?',
    inlineSvg: PHOTOS.METAL_QUIZ,
    caption: 'Five of these are metals. **One is not.** Look at each one before you choose.',
    captionVn: 'Năm chất là kim loại. **Một chất thì không.** Nhìn kỹ từng chất trước khi chọn. (aluminium = nhôm, zinc = kẽm, lead = chì, copper = đồng, iron = sắt, bromine = brom)',
    captionFr: 'Cinq d’entre eux sont des métaux. **Un ne l’est pas.** Regarde chacun avant de choisir. (lead = plomb, copper = cuivre, iron = fer, bromine = brome)',
    check: {
      id: 'chk_bromine',
      q: 'Which one is **not** a metal?',
      qVn: 'Chất nào **không phải** kim loại?',
      qFr: 'Lequel n’est **pas** un métal ?',
      options: [
        { val: 'A', text: 'Aluminium', textVn: 'Nhôm (aluminium)', textFr: 'Aluminium' },
        { val: 'B', text: 'Bromine', textVn: 'Brom (bromine)', textFr: 'Brome (bromine)' },
        { val: 'C', text: 'Lead', textVn: 'Chì (lead)', textFr: 'Plomb (lead)' },
        { val: 'D', text: 'Copper', textVn: 'Đồng (copper)', textFr: 'Cuivre (copper)' },
      ],
      correct: 'B',
      expEn: '**Bromine** is a non-metal — and a red-brown **liquid** in its glass vial. Aluminium (A), lead (C) and copper (D), like zinc and iron, are all metals: shiny solids.',
      expVn: '**Brom** là phi kim — và là một **chất lỏng** màu nâu đỏ trong lọ thủy tinh. Nhôm (A), chì (C) và đồng (D), cũng như kẽm và sắt, đều là kim loại: chất rắn sáng bóng.',
      expFr: 'Le **brome** est un non-métal — et un **liquide** brun-rouge dans son flacon en verre. L’aluminium (A), le plomb (C) et le cuivre (D), comme le zinc et le fer, sont tous des métaux : des solides brillants.',
    },
  },

  // 20 ─ METALS + PERIODIC — the metals in period 3 ────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Hammer',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Metals',
    titleVn: 'Kim loại',
    titleFr: 'Les métaux',
    content:
      'Iron, copper and aluminium are **metals**. Bromine was the one that is not.\n\n' +
      'In the book\'s table the metals are **yellow** and the non-metals are **blue**. The metals sit on the **left** of each row.',
    contentVn:
      'Sắt, đồng và nhôm là **kim loại**. Brom là chất không phải kim loại.\n\n' +
      'Trong bảng của sách, kim loại màu **vàng** và phi kim màu **xanh**. Kim loại nằm ở bên **trái** mỗi hàng.',
    contentFr: 'Le fer, le cuivre et l’aluminium sont des **métaux**. Le brome était celui qui n’en est pas un.\n\nDans le tableau du manuel, les métaux sont en **jaune** et les non-métaux en **bleu**. Les métaux sont à **gauche** de chaque ligne.',
    notes: [
      {
        tone: 'write',
        text: '**Metals:** elements like iron, copper and aluminium.\nIn the Periodic Table, metals are yellow. Non-metals are blue.',
        textVn: '**Kim loại (metals):** các nguyên tố như sắt, đồng và nhôm.\nTrong Bảng tuần hoàn, kim loại màu vàng. Phi kim màu xanh.',
        textFr: '**Métaux (metals) :** des éléments comme le fer, le cuivre et l’aluminium.\nDans le tableau périodique, les métaux sont en jaune. Les non-métaux sont en bleu.',
      },
    ],
    activity: {
      id: 'act_period3_metals',
      type: 'periodic',
      prompt: 'Tap every metal in period 3.',
      promptVn: 'Chạm vào mọi kim loại trong chu kì 3.',
      promptFr: 'Touche tous les métaux de la période 3.',
      query: { period: 3, metal: true },
      explain: 'Period 3 is the third row. Its metals are **sodium (Na)**, **magnesium (Mg)** and **aluminium (Al)** — all on the left. From silicon to argon, the rest of the row is non-metals.',
      explainVn: 'Chu kì 3 là hàng thứ ba. Các kim loại của nó là **natri (Na)**, **magie (Mg)** và **nhôm (Al)** — đều ở bên trái. Từ silic đến agon, phần còn lại của hàng là phi kim.',
      explainFr: 'La période 3 est la troisième ligne. Ses métaux sont le **sodium (Na)**, le **magnésium (Mg)** et l’**aluminium (Al)** — tous à gauche. Du silicium à l’argon, le reste de la ligne, ce sont des non-métaux.',
    },
  },

  // 21 ─ PREDICT — why Na? ─────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    eyebrowFr: 'Prédis d’abord',
    title: 'Why Na?',
    titleVn: 'Tại sao là Na?',
    titleFr: 'Pourquoi Na ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'The symbol for **sodium** is **Na**.',
    textVn: 'Kí hiệu của **sodium** (natri) là **Na**.',
    textFr: 'Le symbole du **sodium** est **Na**.',
    sub: 'Sodium starts with **S**. So where does **Na** come from?',
    subVn: 'Sodium bắt đầu bằng chữ **S**. Vậy **Na** từ đâu ra?',
    subFr: 'Sodium commence par **S**. Alors d’où vient **Na** ?',
    activity: {
      id: 'act_why_na',
      type: 'predict',
      prompt: 'Where does the symbol Na come from?',
      promptVn: 'Kí hiệu Na đến từ đâu?',
      promptFr: 'D’où vient le symbole Na ?',
      options: [
        { val: 'taken', name: 'S was already used by sulfur, so two other letters were picked', nameVn: 'S đã được dùng cho lưu huỳnh, nên người ta chọn hai chữ khác', nameFr: 'S était déjà pris par le soufre (sulfur), donc on a choisi deux autres lettres' },
        { val: 'latin', name: 'From sodium\'s old Latin name, natrium', nameVn: 'Từ tên La-tinh cổ của sodium, natrium', nameFr: 'De l’ancien nom latin du sodium, natrium' },
        { val: 'mistake', name: 'It is a mistake that was never fixed', nameVn: 'Đó là một lỗi chưa bao giờ được sửa', nameFr: 'C’est une erreur qui n’a jamais été corrigée' },
      ],
      correct: 'latin',
      explain: '**Na** comes from **natrium**, the old Latin name for sodium. Sulfur does use **S** — but that is not why. The Vietnamese name **natri** comes from the same Latin word.',
      explainVn: '**Na** đến từ **natrium**, tên La-tinh cổ của sodium. Lưu huỳnh đúng là dùng **S** — nhưng đó không phải lý do. Tên tiếng Việt **natri** cũng đến từ chính từ La-tinh đó.',
      explainFr: '**Na** vient de **natrium**, l’ancien nom latin du sodium. Le soufre (sulfur) utilise bien **S** — mais ce n’est pas la raison. Le nom vietnamien **natri** vient du même mot latin.',
    },
  },

  // 22 ─ SYMBOL + SORT — three ways to make a symbol ───────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'PenLine',
    eyebrow: 'Three ways to make a symbol',
    eyebrowVn: 'Ba cách tạo kí hiệu',
    eyebrowFr: 'Trois façons de faire un symbole',
    title: 'Chemical Symbols',
    titleVn: 'Kí hiệu hóa học',
    titleFr: 'Symboles chimiques',
    ratio: 50,
    inlineSvg: DIAGRAMS.SYMBOL_WAYS,
    content: '**O** is the first letter of oxygen. **He** adds a second letter from helium. **Na** comes from **natrium**.\n\nIf a symbol has letters that are not in the English name, look for a Latin name.',
    contentVn: '**O** là chữ cái đầu của oxygen. **He** thêm một chữ cái thứ hai từ helium. **Na** đến từ **natrium**.\n\nNếu kí hiệu có chữ cái không nằm trong tên tiếng Anh, hãy nghĩ đến một tên La-tinh.',
    contentFr: '**O** est la première lettre de oxygen. **He** ajoute une deuxième lettre de helium. **Na** vient de **natrium**.\n\nSi un symbole a des lettres qui ne sont pas dans le nom anglais, cherche un nom latin.',
    notes: [
      {
        tone: 'write',
        text: '**Symbol:** a short way to write the name of an element.\nThe first letter is always a capital (upper case). The second is always small (lower case).',
        textVn: '**Kí hiệu (symbol):** cách viết ngắn gọn tên của một nguyên tố.\nChữ cái đầu luôn viết hoa. Chữ cái thứ hai luôn viết thường.',
        textFr: '**Symbole (symbol) :** une façon courte d’écrire le nom d’un élément.\nLa première lettre est toujours une majuscule. La deuxième est toujours une minuscule.',
      },
    ],
    activity: {
      id: 'act_symbol_ways',
      type: 'sort',
      prompt: 'Sort the symbols: how was each one made?',
      promptVn: 'Sắp xếp các kí hiệu: mỗi kí hiệu được tạo ra như thế nào?',
      promptFr: 'Trie les symboles : comment chacun a-t-il été formé ?',
      bins: [
        { id: 'first', name: 'The first letter', nameVn: 'Chữ cái đầu', nameFr: 'La première lettre' },
        { id: 'two', name: 'First letter + another letter', nameVn: 'Chữ cái đầu + một chữ khác', nameFr: 'Première lettre + une autre lettre' },
        { id: 'latin', name: 'From a Latin name', nameVn: 'Từ một tên La-tinh', nameFr: 'D’un nom latin' },
      ],
      cards: [
        { id: 'c', name: 'C — carbon', nameVn: 'C — carbon (cacbon)', nameFr: 'C — carbon (carbone)', bin: 'first' },
        { id: 'f', name: 'F — fluorine', nameVn: 'F — fluorine (flo)', nameFr: 'F — fluorine (fluor)', bin: 'first' },
        { id: 'mg', name: 'Mg — magnesium', nameVn: 'Mg — magnesium (magie)', nameFr: 'Mg — magnesium (magnésium)', bin: 'two' },
        { id: 'cl', name: 'Cl — chlorine', nameVn: 'Cl — chlorine (clo)', nameFr: 'Cl — chlorine (chlore)', bin: 'two' },
        { id: 'ca', name: 'Ca — calcium', nameVn: 'Ca — calcium (canxi)', nameFr: 'Ca — calcium', bin: 'two' },
        { id: 'k', name: 'K — potassium', nameVn: 'K — potassium (kali)', nameFr: 'K — potassium', bin: 'latin' },
        { id: 'fe', name: 'Fe — iron', nameVn: 'Fe — iron (sắt)', nameFr: 'Fe — iron (fer)', bin: 'latin' },
      ],
      explain: '**C** and **F** are first letters. **Mg**, **Cl** and **Ca** add a second letter — carbon, calcium and chlorine all start with C, so the small letter tells them apart. There is no K in "potassium" and no F or e in "iron": **K** is from **kalium** and **Fe** from **ferrum**, their Latin names.',
      explainVn: '**C** và **F** là chữ cái đầu. **Mg**, **Cl** và **Ca** thêm một chữ cái thứ hai — carbon, calcium và chlorine đều bắt đầu bằng C, nên chữ thường giúp phân biệt chúng. Trong "potassium" không có chữ K, trong "iron" không có F hay e: **K** đến từ **kalium** và **Fe** từ **ferrum**, tên La-tinh của chúng.',
      explainFr: '**C** et **F** sont des premières lettres. **Mg**, **Cl** et **Ca** ajoutent une deuxième lettre — carbon, calcium et chlorine commencent tous par C, donc la minuscule permet de les distinguer. Il n’y a pas de K dans « potassium », ni de F ou de e dans « iron » : **K** vient de **kalium** et **Fe** de **ferrum**, leurs noms latins.',
    },
  },

  // 23 ─ Capitals matter: Co or CO? + CHECK ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Eye',
    eyebrow: 'Spot the difference',
    eyebrowVn: 'Tìm điểm khác nhau',
    eyebrowFr: 'Trouve la différence',
    title: 'Capitals Matter',
    titleVn: 'Chữ hoa rất quan trọng',
    titleFr: 'Les majuscules comptent',
    text: '**Co** and **CO** look almost the same.',
    textVn: '**Co** và **CO** trông gần giống nhau.',
    textFr: '**Co** et **CO** se ressemblent beaucoup.',
    sub: 'Every symbol starts with **one** capital letter. So how many symbols are in each?',
    subVn: 'Mỗi kí hiệu bắt đầu bằng **một** chữ hoa. Vậy mỗi cách viết có bao nhiêu kí hiệu?',
    subFr: 'Chaque symbole commence par **une** majuscule. Alors, combien de symboles y a-t-il dans chacun ?',
    check: {
      id: 'chk_co',
      q: 'What does **CO**, with two capital letters, mean?',
      qVn: '**CO**, với hai chữ hoa, có nghĩa là gì?',
      qFr: 'Que veut dire **CO**, avec deux majuscules ?',
      options: [
        { val: 'A', text: 'Cobalt, one element', textVn: 'Coban, một nguyên tố', textFr: 'Le cobalt, un seul élément' },
        { val: 'B', text: 'The same as Co — capitals do not matter', textVn: 'Giống Co — chữ hoa không quan trọng', textFr: 'Pareil que Co — les majuscules ne comptent pas' },
        { val: 'C', text: 'Copper', textVn: 'Đồng (copper)', textFr: 'Cuivre (copper)' },
        { val: 'D', text: 'Two elements: carbon (C) and oxygen (O)', textVn: 'Hai nguyên tố: cacbon (C) và oxi (O)', textFr: 'Deux éléments : le carbone (C) et l’oxygène (O)' },
      ],
      correct: 'D',
      expEn: 'Two capitals means **two symbols**: **C** is carbon and **O** is oxygen. **Co**, with a small o, is one element — cobalt, a metal (A); so capitals do matter (B). Copper is **Cu** (C).',
      expVn: 'Hai chữ hoa nghĩa là **hai kí hiệu**: **C** là cacbon và **O** là oxi. **Co**, với chữ o thường, là một nguyên tố — coban, một kim loại (A); vậy chữ hoa rất quan trọng (B). Đồng là **Cu** (C).',
      expFr: 'Deux majuscules, ce sont **deux symboles** : **C** est le carbone et **O** l’oxygène. **Co**, avec un o minuscule, est un seul élément — le cobalt, un métal (A) ; donc les majuscules comptent bien (B). Le cuivre, c’est **Cu** (C).',
    },
  },

  // 24 ─ Questions 1–4 + PERIODIC — potassium, names hidden ────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Questions 1–4',
    eyebrowVn: 'Câu hỏi 1–4',
    eyebrowFr: 'Questions 1–4',
    title: 'Atoms, Elements, Symbols',
    titleVn: 'Nguyên tử, nguyên tố, kí hiệu',
    titleFr: 'Atomes, éléments, symboles',
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
    contentFr: '> **1.** Que sont les atomes ?\n> **2.** Il y a 94 sortes d’atomes naturels. Combien y a-t-il d’éléments naturels ?\n> **3.** Nomme les éléments qui ont les symboles Mg, Be, Li et N.\n> **4.** Trouve les symboles de aluminium, boron (bore), fluorine (fluor) et potassium.\n\nRéponds aux questions 1 à 3 dans ta tête, puis appuie sur Vérifier. La partie la plus difficile de la question 4 est en dessous — avec les noms cachés.',
    reveal: {
      label: 'Check 1–3',
      labelVn: 'Kiểm tra 1–3',
      labelFr: 'Vérifie 1–3',
      answer: '**1.** Tiny pieces of matter. Everything is made of atoms.\n**2.** 94.\n**3.** magnesium, beryllium, lithium, nitrogen',
      answerVn: '**1.** Những mẩu vật chất rất nhỏ. Mọi thứ đều được tạo nên từ nguyên tử.\n**2.** 94.\n**3.** magnesium (magie), beryllium (beri), lithium (liti), nitrogen (nitơ)',
      answerFr: '**1.** De tout petits morceaux de matière. Tout est fait d’atomes.\n**2.** 94.\n**3.** magnesium (magnésium), beryllium (béryllium), lithium, nitrogen (azote)',
    },
    activity: {
      id: 'act_potassium',
      type: 'periodic',
      prompt: 'Question 4: tap potassium. The names are hidden — find it by its symbol.',
      promptVn: 'Câu 4: chạm vào potassium (kali). Tên đã được ẩn — hãy tìm theo kí hiệu.',
      promptFr: 'Question 4 : touche le potassium. Les noms sont cachés — trouve-le grâce à son symbole.',
      query: { name: 'potassium' },
      names: false,
      explain: 'Potassium is **K**, from its Latin name **kalium** — period 4, group 1. The other three in question 4 are **Al** (aluminium), **B** (boron) and **F** (fluorine).',
      explainVn: 'Potassium (kali) là **K**, từ tên La-tinh **kalium** — chu kì 4, nhóm 1. Ba nguyên tố còn lại ở câu 4 là **Al** (nhôm), **B** (bo) và **F** (flo).',
      explainFr: 'Le potassium, c’est **K**, de son nom latin **kalium** — période 4, groupe 1. Les trois autres de la question 4 sont **Al** (aluminium), **B** (bore) et **F** (fluor).',
    },
  },

  // 25 ─ Questions 5–8 + PERIODIC — the same group as helium ───────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Questions 5–8',
    eyebrowVn: 'Câu hỏi 5–8',
    eyebrowFr: 'Questions 5–8',
    title: 'Reading the Table',
    titleVn: 'Đọc bảng tuần hoàn',
    titleFr: 'Lire le tableau',
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
    contentFr: '> **5.** Quel élément a les atomes de plus petite masse ?\n> **6.** Parmi les 20 premiers éléments, lequel a les atomes de plus grande masse ?\n> **7.** Donne les **noms** de deux éléments de la même période que le magnésium.\n> **8.** Donne les **symboles** de deux éléments du même groupe que l’hélium.\n\nRéponds aux questions 5 à 7 dans ta tête, puis appuie sur Vérifier. La question 8 est en dessous.',
    reveal: {
      label: 'Check 5–7',
      labelVn: 'Kiểm tra 5–7',
      labelFr: 'Vérifie 5–7',
      answer: '**5.** hydrogen\n**6.** calcium\n**7.** Any two of: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon',
      answerVn: '**5.** hydrogen (hiđro)\n**6.** calcium (canxi)\n**7.** Hai trong số: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon',
      answerFr: '**5.** hydrogen (hydrogène)\n**6.** calcium\n**7.** Deux parmi : sodium, aluminium, silicon (silicium), phosphorus (phosphore), sulfur (soufre), chlorine (chlore), argon',
    },
    activity: {
      id: 'act_helium_group',
      type: 'periodic',
      prompt: 'Question 8: tap every other element in the same group as helium.',
      promptVn: 'Câu 8: chạm vào mọi nguyên tố khác cùng nhóm với helium (heli).',
      promptFr: 'Question 8 : touche tous les autres éléments du même groupe que l’hélium.',
      query: { sameGroupAs: 'He' },
      explain: 'Helium is at the top of **group 8**, the last column. Below it are **Ne** (neon) and **Ar** (argon). Hydrogen sits in period 1 with helium, but it is in no group.',
      explainVn: 'Heli ở đầu **nhóm 8**, cột cuối cùng. Bên dưới nó là **Ne** (neon) và **Ar** (agon). Hiđro cùng chu kì 1 với heli, nhưng không thuộc nhóm nào.',
      explainFr: 'L’hélium est en haut du **groupe 8**, la dernière colonne. En dessous, il y a **Ne** (néon) et **Ar** (argon). L’hydrogène est dans la période 1 avec l’hélium, mais il n’est dans aucun groupe.',
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
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu faire tout ça ?',
    content:
      'Next: the Vocab, then **Element Hunt** — a new hunt around the table every time you play.\n\n' +
      'Last question: three elements that all start with **C**.',
    contentVn:
      'Tiếp theo: Từ vựng, rồi **Truy tìm nguyên tố** — mỗi lần chơi là một cuộc truy tìm mới quanh bảng tuần hoàn.\n\n' +
      'Câu hỏi cuối: ba nguyên tố đều bắt đầu bằng chữ **C**.',
    contentFr: 'Ensuite : le Vocab, puis **Element Hunt** — une nouvelle chasse dans le tableau à chaque partie.\n\nDernière question : trois éléments qui commencent tous par **C**.',
    items: [
      { text: 'Explain what an **atom** and an **element** are.', textVn: 'Giải thích **nguyên tử** và **nguyên tố** là gì.', textFr: 'Explique ce que sont un **atome** et un **élément**.' },
      { text: 'Describe how atoms **join together**: alone, packed closely, or in small particles.', textVn: 'Mô tả cách các nguyên tử **liên kết**: đứng riêng, xếp sát nhau, hoặc thành hạt nhỏ.', textFr: 'Décris comment les atomes **s’assemblent** : seuls, serrés, ou en petites particules.' },
      { text: 'Find **periods**, **groups**, **metals** and **non-metals** in the first 20 elements.', textVn: 'Tìm **chu kì**, **nhóm**, **kim loại** và **phi kim** trong 20 nguyên tố đầu tiên.', textFr: 'Trouve les **périodes**, les **groupes**, les **métaux** et les **non-métaux** parmi les 20 premiers éléments.' },
      { text: 'Write **symbols** with a capital first letter and a small second letter.', textVn: 'Viết **kí hiệu** với chữ cái đầu viết hoa và chữ cái thứ hai viết thường.', textFr: 'Écris les **symboles** avec une majuscule en première lettre et une minuscule en deuxième.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Which gives the symbols for **carbon**, **calcium** and **chlorine**, in that order?',
      qVn: 'Dãy nào là kí hiệu của **carbon** (cacbon), **calcium** (canxi) và **chlorine** (clo), theo đúng thứ tự?',
      qFr: 'Quelle réponse donne les symboles du **carbone**, du **calcium** et du **chlore**, dans cet ordre ?',
      options: [
        { val: 'A', text: 'C, Ca, Cl', textVn: 'C, Ca, Cl', textFr: 'C, Ca, Cl' },
        { val: 'B', text: 'C, CA, CL', textVn: 'C, CA, CL', textFr: 'C, CA, CL' },
        { val: 'C', text: 'Ca, C, Cl', textVn: 'Ca, C, Cl', textFr: 'Ca, C, Cl' },
        { val: 'D', text: 'C, Cm, Ch', textVn: 'C, Cm, Ch', textFr: 'C, Cm, Ch' },
      ],
      correct: 'A',
      expEn: 'Carbon is **C**, calcium is **Ca**, chlorine is **Cl**. All three start with C, so the **small** second letter tells them apart. CA and CL (B) would each be two elements; C has carbon and calcium swapped; Cm and Ch (D) use letters that are not the symbols.',
      expVn: 'Cacbon là **C**, canxi là **Ca**, clo là **Cl**. Cả ba đều bắt đầu bằng C, nên chữ cái thứ hai **viết thường** giúp phân biệt. CA và CL (B) mỗi cái sẽ là hai nguyên tố; C đảo ngược cacbon và canxi; Cm và Ch (D) dùng chữ cái không phải kí hiệu.',
      expFr: 'Le carbone, c’est **C**, le calcium, **Ca**, le chlore, **Cl**. Les trois commencent par C, donc la deuxième lettre, en **minuscule**, permet de les distinguer. CA et CL (B) seraient chacun deux éléments ; C inverse le carbone et le calcium ; Cm et Ch (D) utilisent des lettres qui ne sont pas les symboles.',
    },
  },
];
