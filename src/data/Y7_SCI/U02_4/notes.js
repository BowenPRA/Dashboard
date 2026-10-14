// src/data/Y7_SCI/U02_4/notes.js
// 2.4 The Water Cycle — the self-study deck, reduced from the classroom lesson
// content/y7-science/U02_4 to docs/y7-science/unit2-close-engines.md §1 and
// particle-engines.md §4. 24 layout slides; 17 scored items — 8 checks and 9
// activities of five types (predict · cycle · order · estimate · sort), four of
// them the new `cycle` activity on the Water Journey diagram. Each `cycle`
// activity sits on a short callout of its own (slides 8, 18, 23) or a short
// split (slide 11), with the teaching and the Key word cards on the slide
// before: from lg the activity is a column beside the slide, but on a phone it
// is a footer under it that takes up to half the card.
//
// THE SPINE IS THE CLASSROOM'S. Nothing here is new physics: 2.2 named the
// changes of state and 2.3 explained them with particles. 2.4 is the same
// changes outdoors, at the size of a planet — eight English words and where
// each one happens. Up (evaporation, transpiration), across and down
// (condensation, precipitation), and where the rain lands (open water, surface
// run-off, groundwater). The one real misconception — you cannot see water
// vapour; cloud, mist and breath are liquid drops — gets its own prediction.
//
// WHAT THE ROOM DID, AND WHAT THE STUDENT DOES HERE
//  · The paper starter (where does rain come from?) → the `predict` on slide 2.
//  · "Where has this water been?" (no answer on its slide) → folded into the
//    slide that answers it, as a check (slide 3).
//  · The Draw This of the whole cycle → the diagram stays (slide 5); the
//    student taps, names and orders its arrows in `cycle` activities instead.
//  · The hand vote "Can you see water vapour?" → a `predict` answered on the
//    next slide; the ANS_YES / ANS_NO vote cards are gone.
//  · PRECIP_KINDS embedded its photos in an SVG → a `compare` of the same three
//    photos (slide 13).
//  · The book's question slides (p. 50) → a check and an estimate, the rest in
//    the `reveal`s. Question 2 (how rain forms) is the `order` on slide 12.
//  · The room game WhichStage → its sentences are the `sort` on slide 22 and
//    the Water Journey task's `everyday` mode; the widget (built for a presenter
//    clicker) does not port.
//  · The poster homework and the "Lesson Complete" exit hero are gone; the exit
//    question (wet clothes dry faster on a sunny day) is the checklist's check.
//  · The seven "write" panels stay as Key word cards — badge renamed, so no card
//    tells a student alone with a tablet to copy anything.
//
// House notes: bilingual everywhere; a slide's `check:` or `activity:` is its
// LAST key and no slide carries both; activity items use `name`/`explain`.
// Every photograph is openly licensed and credited in
// docs/y7-science/plans/U02_4.md.
import { DIAGRAMS } from './diagrams.js';
import { cycleSvg } from '../../../utils/waterCycle';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_4/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const BLUE = '#1a5fa8';
const GREEN = '#4a8b23';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textVn, textFr) => ({ tone: 'write', badge: 'Key word', badgeVn: 'Từ khóa', badgeFr: 'Mot clé', icon: 'BookOpen', text, textVn, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Droplets',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 2 · 2.4',
    eyebrowVn: 'Chương 2 · 2.4',
    eyebrowFr: 'Unité 2 · 2.4',
    title: 'The Water Cycle',
    titleVn: 'Vòng tuần hoàn của nước',
    titleFr: 'Le cycle de l’eau',
    objective: 'Describe the water cycle with its eight key words, explain each stage with particles, and know that water vapour is an invisible gas.',
    objectiveVn: 'Mô tả vòng tuần hoàn của nước bằng tám từ khóa, giải thích từng giai đoạn bằng kiến thức về hạt, và biết rằng hơi nước là chất khí vô hình.',
    objectiveFr: 'Décrire le cycle de l’eau avec ses huit mots clés, expliquer chaque étape avec les particules, et savoir que la vapeur d’eau est un gaz invisible.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans ce cours',
      text: 'You will **predict**, **sort**, put steps **in order** and follow water **round the cycle** on a diagram. **17 things are scored** — the first is on the next slide.',
      textVn: 'Em sẽ **dự đoán**, **sắp xếp**, xếp các bước **theo thứ tự** và theo dấu nước **đi quanh vòng tuần hoàn** trên sơ đồ. **17 mục được tính điểm** — mục đầu tiên ở slide sau.',
      textFr: 'Tu vas **prédire**, **trier**, remettre des étapes **dans l’ordre** et suivre l’eau **tout autour du cycle** sur un schéma. **17 choses sont notées** — la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: PREDICT — where does rain come from? ───────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Getting started',
    eyebrowVn: 'Khởi động',
    eyebrowFr: 'Pour commencer',
    title: 'Where Does Rain Come From?',
    titleVn: 'Mưa từ đâu mà có?',
    titleFr: 'D’où vient la pluie ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'One summer shower drops thousands of tonnes of water on Hà Nội.',
    textVn: 'Một cơn mưa mùa hè trút hàng nghìn tấn nước xuống Hà Nội.',
    textFr: 'Une seule averse d’été fait tomber des milliers de tonnes d’eau sur Hà Nội.',
    sub: 'Where was it **before** the cloud?',
    subVn: 'Trước khi ở trong mây, nó đã ở đâu?',
    subFr: 'Où était-elle **avant** le nuage ?',
    activity: {
      id: 'act_rain_from',
      type: 'predict',
      prompt: 'Where was the water before it was in the cloud?',
      promptVn: 'Nước đã ở đâu trước khi nó ở trong đám mây?',
      promptFr: 'Où était l’eau avant d’être dans le nuage ?',
      options: [
        { val: 'new', name: 'Nowhere — clouds make brand-new water out of the air', nameVn: 'Không ở đâu cả — mây tạo ra nước hoàn toàn mới từ không khí', nameFr: 'Nulle part — les nuages fabriquent de l’eau toute neuve à partir de l’air' },
        { val: 'up', name: 'It went up from the sea, rivers and plants as a gas, then cooled into drops', nameVn: 'Nó đi lên từ biển, sông và cây cối ở dạng khí, rồi lạnh đi thành giọt', nameFr: 'Elle est montée de la mer, des rivières et des plantes sous forme de gaz, puis a refroidi en gouttes' },
        { val: 'space', name: 'It came down from space', nameVn: 'Nó rơi xuống từ không gian', nameFr: 'Elle est tombée de l’espace' },
        { val: 'smoke', name: 'It was smoke from fires and factories', nameVn: 'Nó là khói từ đám cháy và nhà máy', nameFr: 'C’était de la fumée de feux et d’usines' },
      ],
      correct: 'up',
      explain: '**From below.** The water in a cloud went **up** from the sea, rivers, lakes and plants as an invisible gas, then cooled into tiny drops. No new water is made — the same water goes round and round. This lesson follows that journey.',
      explainVn: '**Từ bên dưới.** Nước trong mây đã **đi lên** từ biển, sông, hồ và cây cối ở dạng khí vô hình, rồi lạnh đi thành những giọt nhỏ. Không có nước mới nào được tạo ra — cùng một lượng nước đi vòng quanh mãi. Bài học này theo dấu hành trình đó.',
      explainFr: '**D’en bas.** L’eau d’un nuage est **montée** de la mer, des rivières, des lacs et des plantes sous forme de gaz invisible, puis a refroidi en toutes petites gouttes. Aucune eau nouvelle n’est fabriquée — la même eau tourne sans fin. Ce cours suit ce voyage.',
    },
  },

  // 3 ─ The Earth never makes new water + CHECK ─────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Learner’s Book, page 47',
    eyebrowVn: 'Sách học sinh, trang 47',
    eyebrowFr: 'Manuel de l’élève, page 47',
    title: 'The Earth Never Makes New Water',
    titleVn: 'Trái Đất không tạo ra nước mới',
    titleFr: 'La Terre ne fabrique jamais d’eau nouvelle',
    ratio: 45,
    image: img('clouds.jpg'),
    content: 'Where was the water in your glass **2000 years ago**? The Earth uses the **same water** again and again, for four billion years. The Romans drank it. So did the dinosaurs.',
    contentVn: 'Nước trong ly của em đã ở đâu **2000 năm trước**? Trái Đất dùng **cùng một lượng nước** lặp đi lặp lại, suốt bốn tỉ năm. Người La Mã đã uống nó. Khủng long cũng vậy.',
    contentFr: 'Où était l’eau de ton verre **il y a 2000 ans** ? La Terre utilise la **même eau** encore et encore, depuis quatre milliards d’années. Les Romains l’ont bue. Les dinosaures aussi.',
    notes: [
      keyWord(
        '**Water cycle:** water moving round and round between the land, the sea and the sky.\n**Atmosphere:** the air around the Earth.',
        '**Vòng tuần hoàn của nước (water cycle):** nước di chuyển vòng quanh giữa đất, biển và bầu trời.\n**Khí quyển (atmosphere):** lớp không khí bao quanh Trái Đất.',
        '**Cycle de l’eau (water cycle) :** l’eau qui tourne sans fin entre la terre, la mer et le ciel.\n**Atmosphère (atmosphere) :** l’air autour de la Terre.',
      ),
    ],
    check: {
      id: 'chk_glass_2000',
      q: 'You drink a glass of water today. Where was that water 2000 years ago?',
      qVn: 'Hôm nay em uống một ly nước. Nước đó đã ở đâu 2000 năm trước?',
      qFr: 'Tu bois un verre d’eau aujourd’hui. Où était cette eau il y a 2000 ans ?',
      options: [
        { val: 'A', text: 'Nowhere — new water is made every year', textVn: 'Không ở đâu cả — mỗi năm lại có nước mới được tạo ra', textFr: 'Nulle part — de l’eau nouvelle est fabriquée chaque année' },
        { val: 'B', text: 'Somewhere on Earth — in the sea, a cloud, a river or a Roman’s cup', textVn: 'Ở đâu đó trên Trái Đất — trong biển, một đám mây, một dòng sông hay chiếc cốc của một người La Mã', textFr: 'Quelque part sur Terre — dans la mer, un nuage, une rivière ou la coupe d’un Romain' },
        { val: 'C', text: 'Out in space, waiting to fall', textVn: 'Ngoài không gian, đang chờ rơi xuống', textFr: 'Dans l’espace, en attendant de tomber' },
        { val: 'D', text: 'Inside a cloud that made it from nothing', textVn: 'Trong một đám mây đã tạo ra nó từ hư không', textFr: 'Dans un nuage qui l’a fabriquée à partir de rien' },
      ],
      correct: 'B',
      expEn: '**Somewhere on Earth.** The Earth never makes new water: the same water moves round and round between the land, the sea and the sky — the **water cycle**. A and D are wrong because no new water is made, and the water does not arrive from space (C).',
      expVn: '**Ở đâu đó trên Trái Đất.** Trái Đất không bao giờ tạo ra nước mới: cùng một lượng nước di chuyển vòng quanh giữa đất, biển và bầu trời — **vòng tuần hoàn của nước**. A và D sai vì không có nước mới nào được tạo ra, và nước không đến từ không gian (C).',
      expFr: '**Quelque part sur Terre.** La Terre ne fabrique jamais d’eau nouvelle : la même eau tourne sans fin entre la terre, la mer et le ciel — c’est le **cycle de l’eau**. A et D sont faux parce qu’aucune eau nouvelle n’est fabriquée, et l’eau n’arrive pas de l’espace (C).',
    },
  },

  // 4 ─ The frame for the whole lesson ──────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Good news',
    eyebrowVn: 'Tin vui',
    eyebrowFr: 'Bonne nouvelle',
    title: 'You Already Know the Science',
    titleVn: 'Em đã biết phần khoa học rồi',
    titleFr: 'Tu connais déjà la science',
    text: 'Evaporating. Condensing. Melting. Freezing.',
    textVn: 'Bay hơi. Ngưng tụ. Nóng chảy. Đông đặc.',
    textFr: 'Évaporation. Condensation. Fusion. Solidification.',
    sub: 'You met these changes in 2.2 and 2.3. This lesson: **where** each one happens in the water cycle, and what to **call** it.',
    subVn: 'Em đã gặp những sự thay đổi này ở bài 2.2 và 2.3. Bài này: mỗi quá trình xảy ra **ở đâu** trong vòng tuần hoàn của nước, và **gọi tên** nó là gì.',
    subFr: 'Tu as vu ces changements en 2.2 et 2.3. Dans ce cours : **où** chacun se passe dans le cycle de l’eau, et comment l’**appeler**.',
  },

  // 5 ─ The whole cycle ─────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Learner’s Book, page 47 · the whole cycle',
    eyebrowVn: 'Sách học sinh, trang 47 · toàn bộ vòng tuần hoàn',
    eyebrowFr: 'Manuel de l’élève, page 47 · tout le cycle',
    title: 'The Whole Cycle',
    titleVn: 'Toàn bộ vòng tuần hoàn',
    titleFr: 'Tout le cycle',
    inlineSvg: DIAGRAMS.WATER_CYCLE,
    caption: 'Land, sea and clouds — and **six labelled arrows**. Look at each one; the next slides take them in turn.',
    captionVn: 'Đất, biển và mây — cùng **sáu mũi tên có nhãn**. Hãy nhìn từng mũi tên; các slide sau sẽ lần lượt nói về chúng.',
    captionFr: 'La terre, la mer et les nuages — et **six flèches légendées**. Regarde chacune ; les diapos suivantes les prennent une par une.',
  },

  // 6 ─ Way up 1: evaporation ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Way up · 1 · from the sea',
    eyebrowVn: 'Đường đi lên · 1 · từ biển',
    eyebrowFr: 'Pour monter · 1 · depuis la mer',
    title: 'Water Goes Into the Air',
    titleVn: 'Nước đi vào không khí',
    titleFr: 'L’eau monte dans l’air',
    ratio: 45,
    inlineSvg: cycleSvg({ highlight: 'evap', labels: { arrows: ['evap'] } }),
    content:
      'The Sun heats the sea. **Heat energy is transferred** to the water particles: they move faster, and some **break free** from the surface as a gas.\n\n' +
      'This is **evaporation** — the change you met in 2.2, at the size of an ocean. Most of the water in the air comes from the sea.',
    contentVn:
      'Mặt Trời làm nóng biển. **Nhiệt năng được truyền** cho các hạt nước: chúng chuyển động nhanh hơn, và một số **thoát ra** khỏi bề mặt thành khí.\n\n' +
      'Đây là **sự bay hơi (evaporation)** — sự thay đổi em đã gặp ở bài 2.2, nhưng ở quy mô cả đại dương. Phần lớn nước trong không khí đến từ biển.',
    contentFr: 'Le Soleil chauffe la mer. **De l’énergie thermique est transférée** aux particules d’eau : elles bougent plus vite, et certaines **s’échappent** de la surface sous forme de gaz.\n\nC’est l’**évaporation (evaporation)** — le changement vu en 2.2, à la taille d’un océan. La plus grande partie de l’eau de l’air vient de la mer.',
    notes: [
      keyWord(
        '**Water vapour:** water as a gas. You cannot see it.',
        '**Hơi nước (water vapour):** nước ở thể khí. Em không nhìn thấy nó.',
        '**Vapeur d’eau (water vapour) :** l’eau sous forme de gaz. Tu ne peux pas la voir.',
      ),
    ],
  },

  // 7 ─ Way up 2: transpiration ─────────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Leaf',
    eyebrow: 'Way up · 2 · through the leaves',
    eyebrowVn: 'Đường đi lên · 2 · qua lá cây',
    eyebrowFr: 'Pour monter · 2 · par les feuilles',
    title: 'Water Leaves the Plants',
    titleVn: 'Nước rời khỏi cây',
    titleFr: 'L’eau quitte les plantes',
    text: 'The roots take water in. It leaves through the **leaves**, as water vapour.',
    textVn: 'Rễ hút nước vào. Nước rời khỏi cây qua **lá**, ở dạng hơi nước.',
    textFr: 'Les racines absorbent l’eau. Elle sort par les **feuilles**, sous forme de vapeur d’eau.',
    notes: [
      keyWord(
        '**Transpiration:** water leaving a plant through its leaves.',
        '**Sự thoát hơi nước (transpiration):** nước đi ra khỏi cây qua lá.',
        '**Transpiration :** l’eau qui sort d’une plante par ses feuilles.',
      ),
    ],
  },

  // 8 ─ CYCLE (tap): find transpiration on the diagram ──────────────────────
  // A `cycle` activity sits on a short callout: on a phone it is a footer under
  // the slide that takes up to half the card, so the teaching stays on the
  // slide before.
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Leaf',
    eyebrow: 'Transpiration',
    eyebrowVn: 'Sự thoát hơi nước',
    eyebrowFr: 'Transpiration',
    title: 'Find It on the Diagram',
    titleVn: 'Tìm nó trên sơ đồ',
    titleFr: 'Trouve-la sur le schéma',
    content: 'Water leaves plants through their **leaves**. Which arrow is that?',
    contentVn: 'Nước rời khỏi cây qua **lá**. Đó là mũi tên nào?',
    contentFr: 'L’eau quitte les plantes par leurs **feuilles**. Quelle flèche est-ce ?',
    activity: {
      id: 'act_tap_transpiration',
      type: 'cycle',
      ask: 'tap',
      process: 'transpiration',
      prompt: 'Tap the arrow that shows **transpiration**.',
      promptVn: 'Chạm vào mũi tên thể hiện **sự thoát hơi nước (transpiration)**.',
      promptFr: 'Touche la flèche qui montre la **transpiration (transpiration)**.',
      explain: '**Transpiration** is the green arrow rising out of the trees: water leaving plants through their leaves. The arrow rising from the sea is evaporation — the same change, liquid to gas, but from open water.',
      explainVn: '**Sự thoát hơi nước** là mũi tên xanh lá bay lên từ những cái cây: nước rời khỏi cây qua lá. Mũi tên bay lên từ biển là sự bay hơi — cùng một sự thay đổi từ lỏng sang khí, nhưng từ mặt nước hở.',
      explainFr: 'La **transpiration**, c’est la flèche verte qui monte des arbres : l’eau qui quitte les plantes par leurs feuilles. La flèche qui monte de la mer, c’est l’évaporation — le même changement, de liquide à gaz, mais depuis les eaux de surface.',
    },
  },

  // 9 ─ PREDICT: can you see water vapour? ──────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    eyebrowFr: 'Prédis d’abord',
    title: 'Can You See Water Vapour?',
    titleVn: 'Em có nhìn thấy hơi nước không?',
    titleFr: 'Vois-tu la vapeur d’eau ?',
    ratio: 45,
    image: img('mist.jpg'),
    content:
      'Mist over a reservoir at sunrise. Water is evaporating from it all the time.\n\n' +
      'Water vapour is all around you right now — in this room too. **Can you see it?**',
    contentVn:
      'Sương mù trên một hồ chứa nước lúc bình minh. Nước luôn bay hơi từ hồ.\n\n' +
      'Hơi nước đang ở quanh em ngay lúc này — cả trong căn phòng này nữa. **Em có nhìn thấy nó không?**',
    contentFr: 'De la brume sur un réservoir au lever du soleil. L’eau s’en évapore sans arrêt.\n\nLa vapeur d’eau est tout autour de toi en ce moment — dans cette pièce aussi. **Peux-tu la voir ?**',
    activity: {
      id: 'act_predict_vapour',
      type: 'predict',
      prompt: 'Can you see water vapour?',
      promptVn: 'Em có nhìn thấy hơi nước không?',
      promptFr: 'Peux-tu voir la vapeur d’eau ?',
      options: [
        { val: 'yes', name: 'Yes — the white mist over the water is water vapour', nameVn: 'Có — làn sương trắng trên mặt nước là hơi nước', nameFr: 'Oui — la brume blanche sur l’eau, c’est de la vapeur d’eau' },
        { val: 'no', name: 'No — water vapour is a gas, and you cannot see it', nameVn: 'Không — hơi nước là chất khí, và em không nhìn thấy nó', nameFr: 'Non — la vapeur d’eau est un gaz, et on ne peut pas la voir' },
      ],
      correct: 'no',
      explain: '**No.** Water vapour is a gas, and it is invisible. The mist you can see is something else — the next slide shows what.',
      explainVn: '**Không.** Hơi nước là chất khí, và nó vô hình. Làn sương em nhìn thấy là một thứ khác — slide sau cho thấy đó là gì.',
      explainFr: '**Non.** La vapeur d’eau est un gaz, et elle est invisible. La brume que tu vois est autre chose — la diapo suivante montre quoi.',
    },
  },

  // 10 ─ The answer: never + CHECK ───────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The answer to your prediction',
    eyebrowVn: 'Đáp án cho dự đoán của em',
    eyebrowFr: 'La réponse à ta prédiction',
    title: 'Never. It Is a Gas.',
    titleVn: 'Không bao giờ. Nó là chất khí.',
    titleFr: 'Jamais. C’est un gaz.',
    inlineSvg: DIAGRAMS.VAPOUR_GAP,
    caption: 'Cloud, mist, the white cloud above a kettle, your breath on a cold day — all of them are **liquid** already: tiny drops.',
    captionVn: 'Mây, sương mù, làn khói trắng phía trên ấm nước, hơi thở ngày lạnh — tất cả đều **đã là chất lỏng**: những giọt nước rất nhỏ.',
    captionFr: 'Nuage, brume, le nuage blanc au-dessus d’une bouilloire, ton souffle quand il fait froid — tout ça est déjà **liquide** : de toutes petites gouttes.',
    check: {
      id: 'chk_cannot_see',
      q: 'Which one of these can you NOT see?',
      qVn: 'Em KHÔNG thể nhìn thấy thứ nào dưới đây?',
      qFr: 'Laquelle de ces choses ne peux-tu PAS voir ?',
      options: [
        { val: 'A', text: 'A cloud', textVn: 'Một đám mây', textFr: 'Un nuage' },
        { val: 'B', text: 'Mist over a lake', textVn: 'Sương mù trên mặt hồ', textFr: 'De la brume sur un lac' },
        { val: 'C', text: 'Water vapour', textVn: 'Hơi nước', textFr: 'La vapeur d’eau' },
        { val: 'D', text: 'Your breath on a cold morning', textVn: 'Hơi thở của em vào buổi sáng lạnh', textFr: 'Ton souffle un matin froid' },
      ],
      correct: 'C',
      expEn: '**Water vapour** is a gas, so it is invisible. A cloud (A), mist (B) and your breath on a cold morning (D) are all tiny drops of **liquid** water that have already condensed — that is why you can see them.',
      expVn: '**Hơi nước** là chất khí, nên nó vô hình. Mây (A), sương mù (B) và hơi thở ngày lạnh (D) đều là những giọt nước **lỏng** rất nhỏ đã ngưng tụ — vì thế em mới nhìn thấy chúng.',
      expFr: 'La **vapeur d’eau** est un gaz, donc elle est invisible. Un nuage (A), la brume (B) et ton souffle un matin froid (D) sont tous de toutes petites gouttes d’eau **liquide** déjà condensées — c’est pour ça que tu peux les voir.',
    },
  },

  // 11 ─ Condensation + CYCLE (arrow) ───────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'CloudFog',
    eyebrow: 'Up high, the air is cold',
    eyebrowVn: 'Trên cao, không khí lạnh',
    eyebrowFr: 'En haut, l’air est froid',
    title: 'Clouds Are Made of Drops',
    titleVn: 'Mây được tạo từ những giọt nước',
    titleFr: 'Les nuages sont faits de gouttes',
    ratio: 45,
    image: img('window.jpg'),
    content:
      'The vapour rises and **cools**: its particles slow down and pull together into tiny drops — a **cloud**.\n\n' +
      'The same change as the drops on this cold window, five kilometres higher: **condensation**.',
    contentVn:
      'Hơi nước bay lên và **lạnh đi**: các hạt chậm lại và hút nhau thành những giọt nhỏ — một **đám mây**.\n\n' +
      'Cùng một sự thay đổi với những giọt nước trên ô cửa sổ lạnh này, chỉ là cao hơn năm ki-lô-mét: **sự ngưng tụ (condensation)**.',
    contentFr: 'La vapeur monte et **refroidit** : ses particules ralentissent et se rassemblent en toutes petites gouttes — un **nuage**.\n\nLe même changement que les gouttes sur cette vitre froide, cinq kilomètres plus haut : la **condensation (condensation)**.',
    activity: {
      id: 'act_arrow_condensation',
      type: 'cycle',
      ask: 'arrow',
      process: 'condensation',
      options: ['evaporation', 'condensation', 'precipitation', 'transpiration'],
      prompt: 'Which process is the **orange arrow**?',
      promptVn: '**Mũi tên màu cam** là quá trình nào?',
      promptFr: 'Quel processus montre la **flèche orange** ?',
      explain: 'The orange arrow carries water from the air into the cloud: **condensation**, gas to liquid as the vapour cools. Evaporation goes the other way, up from the sea; precipitation comes down out of the cloud.',
      explainVn: 'Mũi tên màu cam đưa nước từ không khí vào đám mây: **sự ngưng tụ**, từ khí thành lỏng khi hơi nước lạnh đi. Sự bay hơi đi theo chiều ngược lại, lên từ biển; giáng thủy thì rơi xuống từ đám mây.',
      explainFr: 'La flèche orange porte l’eau de l’air vers le nuage : la **condensation**, de gaz à liquide quand la vapeur refroidit. L’évaporation va dans l’autre sens, en montant de la mer ; les précipitations descendent du nuage.',
    },
  },

  // 12 ─ Precipitation + ORDER: how rain forms ──────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplets',
    eyebrow: 'Key word · Learner’s Book, page 48',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 48',
    eyebrowFr: 'Mot clé · Manuel de l’élève, page 48',
    title: 'Too Heavy to Hold',
    titleVn: 'Nặng quá, không giữ được',
    titleFr: 'Trop lourdes pour tenir',
    ratio: 45,
    image: img('rain.jpg'),
    content: 'The drops in a cloud bump into each other and **join up**. They get bigger and heavier. When the air cannot hold them any more, they **fall**.',
    contentVn: 'Các giọt nước trong mây va vào nhau và **nhập lại**. Chúng to hơn và nặng hơn. Khi không khí không giữ nổi nữa, chúng **rơi xuống**.',
    contentFr: 'Les gouttes d’un nuage se cognent et **s’unissent**. Elles deviennent plus grosses et plus lourdes. Quand l’air ne peut plus les porter, elles **tombent**.',
    notes: [
      keyWord(
        '**Precipitation:** water falling from clouds — rain, snow, hail or sleet.',
        '**Giáng thủy (precipitation):** nước rơi từ đám mây — mưa, tuyết, mưa đá hoặc mưa tuyết.',
        '**Précipitations (precipitation) :** l’eau qui tombe des nuages — pluie, neige, grêle ou grésil.',
      ),
    ],
    activity: {
      id: 'act_order_rain',
      type: 'order',
      prompt: 'How does rain form? Put the steps in order.',
      promptVn: 'Mưa hình thành như thế nào? Sắp xếp các bước theo thứ tự.',
      promptFr: 'Comment la pluie se forme-t-elle ? Remets les étapes dans l’ordre.',
      steps: [
        { id: 'evap', name: 'The Sun heats the sea, and water evaporates', nameVn: 'Mặt Trời làm nóng biển, và nước bay hơi', nameFr: 'Le Soleil chauffe la mer, et l’eau s’évapore' },
        { id: 'rise', name: 'The water vapour rises and cools', nameVn: 'Hơi nước bay lên và lạnh đi', nameFr: 'La vapeur d’eau monte et refroidit' },
        { id: 'cond', name: 'It condenses into tiny drops — a cloud', nameVn: 'Nó ngưng tụ thành những giọt nhỏ — một đám mây', nameFr: 'Elle se condense en toutes petites gouttes — un nuage' },
        { id: 'join', name: 'The drops join up and get heavier', nameVn: 'Các giọt nhập lại và nặng hơn', nameFr: 'Les gouttes s’unissent et deviennent plus lourdes' },
        { id: 'fall', name: 'They are too heavy for the air to hold, and fall as rain', nameVn: 'Chúng quá nặng, không khí không giữ nổi, và rơi xuống thành mưa', nameFr: 'Elles sont trop lourdes pour que l’air les porte, et tombent en pluie' },
      ],
      explain: '**Evaporate → rise and cool → condense → join up → fall.** That answers the book’s question 2, how rain forms. The water was liquid in the sea, a gas in the air, and liquid again in the cloud and the rain.',
      explainVn: '**Bay hơi → bay lên và lạnh đi → ngưng tụ → nhập lại → rơi xuống.** Đó là câu trả lời cho câu hỏi 2 trong sách: mưa hình thành như thế nào. Nước là chất lỏng trong biển, chất khí trong không khí, và lại là chất lỏng trong mây và trong mưa.',
      explainFr: '**S’évaporer → monter et refroidir → se condenser → s’unir → tomber.** C’est la réponse à la question 2 du manuel : comment la pluie se forme. L’eau était liquide dans la mer, gazeuse dans l’air, et de nouveau liquide dans le nuage et la pluie.',
    },
  },

  // 13 ─ Four kinds, one word + CHECK ───────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Snowflake',
    eyebrow: 'One word for all of them · and sleet: rain and snow together',
    eyebrowVn: 'Một từ cho tất cả · và mưa tuyết: mưa và tuyết rơi cùng lúc',
    eyebrowFr: 'Un seul mot pour tous · et le grésil : pluie et neige ensemble',
    title: 'Four Kinds, One Word',
    titleVn: 'Bốn loại, một từ',
    titleFr: 'Quatre sortes, un mot',
    columns: [
      {
        heading: 'Rain',
        headingVn: 'Mưa',
        headingFr: 'Pluie',
        accent: BLUE,
        icon: 'Droplets',
        image: img('rainfall.jpg'),
        caption: 'Cyclos in the rain, Hà Nội. **Liquid** water, falling.',
        captionVn: 'Xích lô trong mưa, Hà Nội. Nước **lỏng** đang rơi.',
        captionFr: 'Des cyclos sous la pluie, Hà Nội. De l’eau **liquide** qui tombe.',
      },
      {
        heading: 'Snow',
        headingVn: 'Tuyết',
        headingFr: 'Neige',
        accent: TEAL,
        icon: 'Snowflake',
        image: img('snow.jpg'),
        caption: 'Snow falling on a river. It **froze inside the cloud**, then fell.',
        captionVn: 'Tuyết rơi trên một dòng sông. Nó **đông đặc trong mây**, rồi rơi xuống.',
        captionFr: 'De la neige qui tombe sur une rivière. Elle **a gelé dans le nuage**, puis elle est tombée.',
      },
      {
        heading: 'Hail',
        headingVn: 'Mưa đá',
        headingFr: 'Grêle',
        accent: PURPLE,
        icon: 'Circle',
        image: img('hail.jpg'),
        caption: 'Hailstones in a hand. **Balls of ice**, frozen in the cloud.',
        captionVn: 'Những viên mưa đá trong lòng bàn tay. **Những viên băng**, đông đặc trong mây.',
        captionFr: 'Des grêlons dans une main. Des **boules de glace**, gelées dans le nuage.',
      },
    ],
    check: {
      id: 'chk_not_precip',
      q: 'Which of these is NOT precipitation?',
      qVn: 'Thứ nào dưới đây KHÔNG phải là giáng thủy?',
      qFr: 'Lequel de ces exemples N’EST PAS une précipitation ?',
      options: [
        { val: 'A', text: 'Snow falling on Sa Pa', textVn: 'Tuyết rơi ở Sa Pa', textFr: 'De la neige qui tombe sur Sa Pa' },
        { val: 'B', text: 'Hail bouncing off the road', textVn: 'Mưa đá nảy trên mặt đường', textFr: 'De la grêle qui rebondit sur la route' },
        { val: 'C', text: 'Sleet on a cold, windy day', textVn: 'Mưa tuyết vào một ngày lạnh, nhiều gió', textFr: 'Du grésil un jour froid et venteux' },
        { val: 'D', text: 'Mist lying on a lake', textVn: 'Sương mù nằm trên mặt hồ', textFr: 'De la brume posée sur un lac' },
      ],
      correct: 'D',
      expEn: 'Precipitation is water **falling from a cloud**. Mist (D) did not fall: it is vapour that condensed into drops close to the ground. Snow (A), hail (B) and sleet (C) all fall from clouds — frozen or not, they are precipitation.',
      expVn: 'Giáng thủy là nước **rơi từ đám mây**. Sương mù (D) không rơi xuống: đó là hơi nước ngưng tụ thành giọt ở sát mặt đất. Tuyết (A), mưa đá (B) và mưa tuyết (C) đều rơi từ mây — dù đông đặc hay không, chúng đều là giáng thủy.',
      expFr: 'Les précipitations, c’est de l’eau qui **tombe d’un nuage**. La brume (D) n’est pas tombée : c’est de la vapeur qui s’est condensée en gouttes près du sol. La neige (A), la grêle (B) et le grésil (C) tombent tous des nuages — gelés ou non, ce sont des précipitations.',
    },
  },

  // 14 ─ English check: the four -ation words + CHECK ───────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Doing Word, Naming Word',
    titleVn: 'Từ chỉ hành động, từ chỉ tên gọi',
    titleFr: 'Le verbe, le nom',
    inlineSvg: DIAGRAMS.ATIONS,
    caption: 'Each **doing word** has a **naming word** ending in **-ation**: evaporate → evaporation. Say all four out loud.',
    captionVn: 'Mỗi **từ chỉ hành động** có một **từ chỉ tên gọi** kết thúc bằng **-ation**: evaporate → evaporation. Đọc to cả bốn từ.',
    captionFr: 'Chaque **verbe (doing word)** a un **nom (naming word)** qui finit en **-ation** : evaporate → evaporation. Dis les quatre à voix haute.',
    check: {
      id: 'chk_ation',
      q: 'Choose the words for the gaps: "Water vapour ___ into tiny drops. This change is called ___."',
      qVn: 'Chọn từ tiếng Anh cho chỗ trống: "Water vapour ___ into tiny drops. This change is called ___." (Hơi nước ___ thành những giọt nhỏ. Sự thay đổi này gọi là ___.)',
      qFr: 'Choisis les mots anglais pour les trous : « Water vapour ___ into tiny drops. This change is called ___. » (La vapeur d’eau ___ en toutes petites gouttes. Ce changement s’appelle ___.)',
      options: [
        { val: 'A', text: 'condenses … condensation', textVn: 'condenses … condensation', textFr: 'condenses … condensation' },
        { val: 'B', text: 'condensation … condenses', textVn: 'condensation … condenses', textFr: 'condensation … condenses' },
        { val: 'C', text: 'evaporates … evaporation', textVn: 'evaporates … evaporation', textFr: 'evaporates … evaporation' },
        { val: 'D', text: 'condenses … precipitation', textVn: 'condenses … precipitation', textFr: 'condenses … precipitation' },
      ],
      correct: 'A',
      expEn: 'The first gap needs the **doing word**, *condenses*; the second needs the **naming word**, *condensation*. B swaps them. C is the wrong change — vapour turning into drops is gas to liquid, not liquid to gas. In D, precipitation is the drops falling, not forming.',
      expVn: 'Chỗ trống thứ nhất cần **từ chỉ hành động**, *condenses* (ngưng tụ); chỗ thứ hai cần **từ chỉ tên gọi**, *condensation* (sự ngưng tụ). B đảo ngược hai từ. C sai quá trình — hơi nước thành giọt là từ khí sang lỏng, không phải từ lỏng sang khí. Ở D, giáng thủy là các giọt rơi xuống, không phải lúc chúng hình thành.',
      expFr: 'Le premier trou demande le **verbe**, *condenses* (se condense) ; le second demande le **nom**, *condensation*. B les inverse. C est le mauvais changement — de la vapeur qui devient des gouttes, c’est de gaz à liquide, pas de liquide à gaz. Dans D, les précipitations, ce sont les gouttes qui tombent, pas qui se forment.',
    },
  },

  // 15 ─ Where it lands 1: open water ───────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Waves',
    eyebrow: 'Key word · where the rain lands · 1',
    eyebrowVn: 'Từ khóa · mưa rơi xuống đâu · 1',
    eyebrowFr: 'Mot clé · où tombe la pluie · 1',
    title: 'Straight Back Down',
    titleVn: 'Rơi thẳng trở lại',
    titleFr: 'Retour direct',
    ratio: 45,
    image: img('halong.jpg'),
    content:
      'Rain lands in one of three places. The first: straight into the sea, a lake or a river — like Hạ Long Bay.\n\n' +
      'Rain that falls here can **evaporate again**, and the cycle starts over.',
    contentVn:
      'Mưa rơi xuống một trong ba nơi. Nơi thứ nhất: thẳng xuống biển, hồ hoặc sông — như vịnh Hạ Long.\n\n' +
      'Mưa rơi xuống đây có thể **bay hơi trở lại**, và vòng tuần hoàn bắt đầu lại.',
    contentFr: 'La pluie tombe à l’un de trois endroits. Le premier : directement dans la mer, un lac ou une rivière — comme la baie d’Hạ Long.\n\nLa pluie qui tombe ici peut **s’évaporer à nouveau**, et le cycle recommence.',
    notes: [
      keyWord(
        '**Open water:** big water you can see — rivers, large lakes and the oceans.',
        '**Mặt nước hở (open water):** vùng nước lớn nhìn thấy được — sông, hồ lớn và đại dương.',
        '**Eaux de surface (open water) :** de grandes étendues d’eau visibles — rivières, grands lacs et océans.',
      ),
    ],
  },

  // 16 ─ Where it lands 2: surface run-off + CHECK ──────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowRight',
    eyebrow: 'Key word · where the rain lands · 2',
    eyebrowVn: 'Từ khóa · mưa rơi xuống đâu · 2',
    eyebrowFr: 'Mot clé · où tombe la pluie · 2',
    title: 'Over the Ground',
    titleVn: 'Chảy trên mặt đất',
    titleFr: 'Sur le sol',
    ratio: 45,
    image: img('paddy.jpg'),
    content:
      'Rain on soil does one of two things. If it cannot soak in, it **flows over the ground** into streams and rivers.\n\n' +
      'These terraces in Sơn La hold it back, so it soaks in instead.',
    contentVn:
      'Mưa rơi xuống đất sẽ đi theo một trong hai đường. Nếu không thấm xuống được, nó **chảy trên mặt đất** vào suối và sông.\n\n' +
      'Ruộng bậc thang ở Sơn La giữ nước lại, để nước thấm xuống.',
    contentFr: 'La pluie sur le sol fait l’une de deux choses. Si elle ne peut pas s’infiltrer, elle **coule sur le sol** jusqu’aux ruisseaux et aux rivières.\n\nCes terrasses de Sơn La la retiennent, pour qu’elle s’infiltre à la place.',
    notes: [
      keyWord(
        '**Surface run-off:** water flowing across the ground into rivers. It carries the soil away.',
        '**Dòng chảy bề mặt (surface run-off):** nước chảy trên mặt đất vào sông. Nó cuốn đất đi.',
        '**Ruissellement (surface run-off) :** l’eau qui coule sur le sol jusqu’aux rivières. Elle emporte la terre.',
      ),
    ],
    check: {
      id: 'chk_runoff',
      q: 'In a storm, rain falls on a bare hillside and rushes across the ground into a river. Which is true?',
      qVn: 'Trong một cơn bão, mưa rơi xuống sườn đồi trọc và chảy xiết trên mặt đất vào sông. Câu nào đúng?',
      qFr: 'Pendant un orage, la pluie tombe sur une colline nue et dévale le sol jusqu’à une rivière. Qu’est-ce qui est vrai ?',
      options: [
        { val: 'A', text: 'It is groundwater — it soaks into the rocks', textVn: 'Đó là nước ngầm — nó thấm vào đá', textFr: 'C’est de l’eau souterraine — elle s’infiltre dans les roches' },
        { val: 'B', text: 'It is surface run-off — and it carries soil away with it', textVn: 'Đó là dòng chảy bề mặt — và nó cuốn đất đi theo', textFr: 'C’est du ruissellement — et il emporte la terre avec lui' },
        { val: 'C', text: 'It is transpiration — it leaves through the plants', textVn: 'Đó là sự thoát hơi nước — nó đi ra qua cây', textFr: 'C’est de la transpiration — elle sort par les plantes' },
        { val: 'D', text: 'It is evaporation — it turns into a gas as it flows', textVn: 'Đó là sự bay hơi — nó biến thành khí khi chảy', textFr: 'C’est de l’évaporation — elle se change en gaz en coulant' },
      ],
      correct: 'B',
      expEn: 'Water flowing **over** the ground into a river is **surface run-off**, and it washes soil away. Groundwater (A) is water that soaks **into** the ground; transpiration (C) leaves through leaves; and run-off stays liquid all the way, so it is not evaporation (D).',
      expVn: 'Nước chảy **trên** mặt đất vào sông là **dòng chảy bề mặt**, và nó cuốn trôi đất. Nước ngầm (A) là nước thấm **vào** lòng đất; sự thoát hơi nước (C) đi ra qua lá; còn dòng chảy bề mặt vẫn là chất lỏng suốt quãng đường, nên không phải sự bay hơi (D).',
      expFr: 'L’eau qui coule **sur** le sol jusqu’à une rivière, c’est le **ruissellement**, et il emporte la terre. L’eau souterraine (A), c’est l’eau qui s’infiltre **dans** le sol ; la transpiration (C) sort par les feuilles ; et le ruissellement reste liquide tout du long, donc ce n’est pas l’évaporation (D).',
    },
  },

  // 17 ─ Where it lands 3: groundwater ───────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'Key word · where the rain lands · 3',
    eyebrowVn: 'Từ khóa · mưa rơi xuống đâu · 3',
    eyebrowFr: 'Mot clé · où tombe la pluie · 3',
    title: 'Into the Ground',
    titleVn: 'Thấm vào đất',
    titleFr: 'Dans le sol',
    ratio: 45,
    image: img('pump.jpg'),
    content:
      'The rest **soaks in**, down through the soil into the rocks. It can stay there for years, moving slowly through the rocks to rivers and the sea.\n\n' +
      'A well or a pump brings it back up. This village in Indonesia drinks it.',
    contentVn:
      'Phần còn lại **thấm xuống**, qua lớp đất vào trong đá. Nó có thể nằm ở đó nhiều năm, di chuyển chậm qua đất đá ra sông và biển.\n\n' +
      'Một cái giếng hoặc máy bơm đưa nó lên lại. Ngôi làng này ở Indonesia uống chính nguồn nước đó.',
    contentFr: 'Le reste **s’infiltre**, à travers le sol jusque dans les roches. Elle peut y rester des années, en avançant lentement à travers les roches vers les rivières et la mer.\n\nUn puits ou une pompe la fait remonter. Ce village d’Indonésie la boit.',
    notes: [
      keyWord(
        '**Groundwater:** water that soaks into the soil and rocks. We pump it back up to drink.',
        '**Nước ngầm (groundwater):** nước thấm vào đất và đá. Ta bơm nó lên để uống.',
        '**Eau souterraine (groundwater) :** l’eau qui s’infiltre dans le sol et les roches. On la pompe pour la boire.',
      ),
    ],
  },

  // 18 ─ CYCLE (journey): cloud to sea, underground ─────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Route',
    eyebrow: 'Follow a raindrop',
    eyebrowVn: 'Theo dấu một giọt mưa',
    eyebrowFr: 'Suis une goutte de pluie',
    title: 'Sky to Sea, Underground',
    titleVn: 'Từ trời ra biển, qua lòng đất',
    titleFr: 'Du ciel à la mer, sous la terre',
    content: 'A raindrop leaves a cloud and reaches the sea — but it never flows over the ground.',
    contentVn: 'Một giọt mưa rời đám mây và đến được biển — nhưng nó không hề chảy trên mặt đất.',
    contentFr: 'Une goutte de pluie quitte un nuage et arrive à la mer — mais elle ne coule jamais sur le sol.',
    activity: {
      id: 'act_journey_ground',
      type: 'cycle',
      ask: 'journey',
      from: 'cloud',
      to: 'sea',
      steps: ['precipitation', 'soaking', 'gwflow'],
      prompt: 'Put the raindrop’s journey in order.',
      promptVn: 'Sắp xếp hành trình của giọt mưa theo thứ tự.',
      promptFr: 'Remets dans l’ordre le voyage de la goutte de pluie.',
      explain: '**Precipitation → soaking in → groundwater flow.** It falls on the land, soaks down into the rocks as groundwater, and moves slowly through them to the sea.',
      explainVn: '**Giáng thủy → thấm xuống đất → dòng nước ngầm.** Nó rơi xuống đất, thấm xuống đá thành nước ngầm, rồi di chuyển chậm qua đó ra biển.',
      explainFr: '**Précipitations → infiltration → écoulement de l’eau souterraine.** Elle tombe sur la terre, s’infiltre dans les roches en eau souterraine, et avance lentement à travers elles jusqu’à la mer.',
    },
  },

  // 19 ─ What the particles do + CHECK ──────────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Atom',
    eyebrow: 'Particle theory · up and down',
    eyebrowVn: 'Lý thuyết hạt · đi lên và đi xuống',
    eyebrowFr: 'Théorie des particules · monter et descendre',
    title: 'What the Particles Do',
    titleVn: 'Các hạt làm gì',
    titleFr: 'Ce que font les particules',
    columns: [
      {
        heading: 'Going up',
        headingVn: 'Đi lên',
        headingFr: 'En montant',
        accent: ORANGE,
        icon: 'Sun',
        content:
          '**Evaporation** and **transpiration**: liquid → gas.\n\n' +
          'The particles **take in** heat energy, move faster and break free from the liquid.',
        contentVn:
          '**Sự bay hơi** và **sự thoát hơi nước**: lỏng → khí.\n\n' +
          'Các hạt **nhận** nhiệt năng, chuyển động nhanh hơn và thoát ra khỏi chất lỏng.',
        contentFr: '**Évaporation** et **transpiration** : liquide → gaz.\n\nLes particules **reçoivent** de l’énergie thermique, bougent plus vite et s’échappent du liquide.',
      },
      {
        heading: 'Coming down',
        headingVn: 'Đi xuống',
        headingFr: 'En descendant',
        accent: BLUE,
        icon: 'CloudFog',
        content:
          '**Condensation**: gas → liquid. The particles **give out** heat energy, slow down and pull together.\n\n' +
          '**Precipitation**: the drops just fall — **no change of state**. Run-off, soaking in and groundwater are liquid all the way.',
        contentVn:
          '**Sự ngưng tụ**: khí → lỏng. Các hạt **tỏa ra** nhiệt năng, chậm lại và hút nhau.\n\n' +
          '**Giáng thủy**: các giọt chỉ rơi xuống — **không chuyển thể**. Dòng chảy bề mặt, nước thấm xuống và nước ngầm đều là chất lỏng suốt quãng đường.',
        contentFr: '**Condensation** : gaz → liquide. Les particules **cèdent** de l’énergie thermique, ralentissent et se rassemblent.\n\n**Précipitations** : les gouttes tombent, c’est tout — **pas de changement d’état**. Le ruissellement, l’infiltration et l’eau souterraine restent liquides tout du long.',
      },
    ],
    check: {
      id: 'chk_rain_state',
      q: 'Rain falls from a cloud onto a field. What happens to the state of the water as it falls?',
      qVn: 'Mưa rơi từ đám mây xuống cánh đồng. Trạng thái của nước thay đổi thế nào khi nó rơi?',
      qFr: 'La pluie tombe d’un nuage sur un champ. Qu’arrive-t-il à l’état de l’eau pendant sa chute ?',
      options: [
        { val: 'A', text: 'Liquid → gas', textVn: 'Lỏng → khí', textFr: 'Liquide → gaz' },
        { val: 'B', text: 'Gas → liquid', textVn: 'Khí → lỏng', textFr: 'Gaz → liquide' },
        { val: 'C', text: 'No change: it is liquid in the cloud and liquid on the ground', textVn: 'Không thay đổi: nó là chất lỏng trong mây và chất lỏng trên mặt đất', textFr: 'Aucun changement : elle est liquide dans le nuage et liquide sur le sol' },
        { val: 'D', text: 'Solid → liquid', textVn: 'Rắn → lỏng', textFr: 'Solide → liquide' },
      ],
      correct: 'C',
      expEn: 'Falling is **not a change of state**: a cloud is already liquid drops, and they land as liquid. Liquid → gas (A) is evaporation; gas → liquid (B) is condensation, which happened earlier, when the cloud formed; and nothing melts on the way down (D).',
      expVn: 'Rơi xuống **không phải là sự chuyển thể**: mây vốn đã là những giọt lỏng, và chúng chạm đất vẫn ở thể lỏng. Lỏng → khí (A) là sự bay hơi; khí → lỏng (B) là sự ngưng tụ, đã xảy ra trước đó khi mây hình thành; và không có gì nóng chảy trên đường rơi (D).',
      expFr: 'Tomber **n’est pas un changement d’état** : un nuage, ce sont déjà des gouttes liquides, et elles arrivent au sol liquides. Liquide → gaz (A), c’est l’évaporation ; gaz → liquide (B), c’est la condensation, qui s’est produite avant, quand le nuage s’est formé ; et rien ne fond pendant la chute (D).',
    },
  },

  // 20 ─ Book questions 1–3 + CHECK ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 50',
    eyebrowVn: 'Sách học sinh, trang 50',
    eyebrowFr: 'Manuel de l’élève, page 50',
    title: 'Questions 1–3',
    titleVn: 'Câu hỏi 1–3',
    titleFr: 'Questions 1–3',
    content:
      '> **1.** What are the different types of precipitation?\n' +
      '> **2.** How does rain form?\n' +
      '> **3.** Use **particle theory** to explain how a pool of water on the road disappears.',
    contentVn:
      '> **1.** Có những loại giáng thủy nào?\n' +
      '> **2.** Mưa hình thành như thế nào?\n' +
      '> **3.** Dùng **lý thuyết hạt** để giải thích vì sao vũng nước trên đường biến mất.',
    contentFr: '> **1.** Quelles sont les différentes sortes de précipitations ?\n> **2.** Comment la pluie se forme-t-elle ?\n> **3.** Utilise la **théorie des particules** pour expliquer comment une flaque d’eau sur la route disparaît.',
    reveal: {
      label: 'Check 1 and 2',
      labelVn: 'Kiểm tra 1 và 2',
      labelFr: 'Vérifie 1 et 2',
      answer:
        '**1.** Rain, snow, hail and sleet.\n' +
        '**2.** Water vapour rises, cools and condenses into tiny drops — a cloud. The drops join up until they are too heavy for the air to hold, and fall.',
      answerVn:
        '**1.** Mưa, tuyết, mưa đá và mưa tuyết.\n' +
        '**2.** Hơi nước bay lên, lạnh đi và ngưng tụ thành những giọt nhỏ — một đám mây. Các giọt nhập lại đến khi quá nặng, không khí không giữ nổi, thì rơi xuống.',
      answerFr: '**1.** La pluie, la neige, la grêle et le grésil.\n**2.** La vapeur d’eau monte, refroidit et se condense en toutes petites gouttes — un nuage. Les gouttes s’unissent jusqu’à être trop lourdes pour que l’air les porte, et elles tombent.',
    },
    check: {
      id: 'chk_pool_particles',
      q: 'Question 3: how does a pool of water on the road disappear?',
      qVn: 'Câu 3: vũng nước trên đường biến mất như thế nào?',
      qFr: 'Question 3 : comment une flaque d’eau sur la route disparaît-elle ?',
      options: [
        { val: 'A', text: 'The Sun transfers heat energy to the particles; they move faster, and some break away and escape as a gas', textVn: 'Mặt Trời truyền nhiệt năng cho các hạt; chúng chuyển động nhanh hơn, và một số tách ra, thoát đi thành khí', textFr: 'Le Soleil transfère de l’énergie thermique aux particules ; elles bougent plus vite, et certaines se détachent et s’échappent sous forme de gaz' },
        { val: 'B', text: 'The particles get smaller and smaller until you cannot see them', textVn: 'Các hạt nhỏ dần cho đến khi không nhìn thấy được', textFr: 'Les particules deviennent de plus en plus petites jusqu’à ce qu’on ne les voie plus' },
        { val: 'C', text: 'The water soaks into the road and becomes groundwater', textVn: 'Nước thấm vào mặt đường và trở thành nước ngầm', textFr: 'L’eau s’infiltre dans la route et devient de l’eau souterraine' },
        { val: 'D', text: 'The heat destroys the water particles', textVn: 'Nhiệt phá hủy các hạt nước', textFr: 'La chaleur détruit les particules d’eau' },
      ],
      correct: 'A',
      expEn: 'That is **evaporation**, explained with particles: heat energy is transferred to the particles, they move faster, and some break away from the others and escape as a gas. Particles never get smaller (B) and are never destroyed (D) — the water is still there, as vapour in the air. A road does not let water soak through it (C).',
      expVn: 'Đó là **sự bay hơi**, giải thích bằng kiến thức về hạt: nhiệt năng được truyền cho các hạt, chúng chuyển động nhanh hơn, và một số tách khỏi các hạt khác, thoát đi thành khí. Các hạt không bao giờ nhỏ đi (B) và không bao giờ bị phá hủy (D) — nước vẫn còn đó, ở dạng hơi nước trong không khí. Mặt đường không để nước thấm qua (C).',
      expFr: 'C’est l’**évaporation**, expliquée avec les particules : de l’énergie thermique est transférée aux particules, elles bougent plus vite, et certaines se détachent des autres et s’échappent sous forme de gaz. Les particules ne rétrécissent jamais (B) et ne sont jamais détruites (D) — l’eau est toujours là, en vapeur dans l’air. Une route ne laisse pas l’eau s’infiltrer à travers elle (C).',
    },
  },

  // 21 ─ Book questions 4, 6, 7 + ESTIMATE ──────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Learner’s Book, page 50',
    eyebrowVn: 'Sách học sinh, trang 50',
    eyebrowFr: 'Manuel de l’élève, page 50',
    title: 'Questions 4, 6 and 7',
    titleVn: 'Câu hỏi 4, 6 và 7',
    titleFr: 'Questions 4, 6 et 7',
    content:
      '> **4.** Where does your drinking water come from?\n' +
      '> **6.** What do we use water for **inside our bodies**?\n' +
      '> **7.** What else do we use water for?\n\n' +
      'Answer them in your head, then check. Then guess how much of you is water.',
    contentVn:
      '> **4.** Nước uống của em đến từ đâu?\n' +
      '> **6.** Cơ thể chúng ta dùng nước để làm gì?\n' +
      '> **7.** Chúng ta còn dùng nước để làm gì nữa?\n\n' +
      'Trả lời trong đầu, rồi kiểm tra. Sau đó đoán xem cơ thể em có bao nhiêu nước.',
    contentFr: '> **4.** D’où vient ton eau potable ?\n> **6.** À quoi sert l’eau **dans notre corps** ?\n> **7.** À quoi d’autre sert l’eau ?\n\nRéponds dans ta tête, puis vérifie. Ensuite, devine quelle part de toi est de l’eau.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer:
        '**4.** A river, a lake or groundwater from a well, then a treatment works and the pipes.\n' +
        '**6.** Blood carrying food and waste, sweating to cool down, digesting food.\n' +
        '**7.** Washing, cooking, rice fields and farms, factories, putting out fires.',
      answerVn:
        '**4.** Từ sông, hồ hoặc nước ngầm từ giếng, rồi qua nhà máy xử lý nước và đường ống.\n' +
        '**6.** Máu vận chuyển thức ăn và chất thải, đổ mồ hôi để làm mát, tiêu hóa thức ăn.\n' +
        '**7.** Giặt giũ, nấu ăn, ruộng lúa và nông trại, nhà máy, chữa cháy.',
      answerFr: '**4.** D’une rivière, d’un lac ou de l’eau souterraine d’un puits, puis d’une station de traitement et des tuyaux.\n**6.** Le sang qui transporte la nourriture et les déchets, la transpiration pour se rafraîchir, la digestion des aliments.\n**7.** Laver, cuisiner, les rizières et les fermes, les usines, éteindre les incendies.',
    },
    activity: {
      id: 'act_estimate_body',
      type: 'estimate',
      prompt: 'About what percentage of your body is water?',
      promptVn: 'Khoảng bao nhiêu phần trăm cơ thể em là nước?',
      promptFr: 'Environ quel pourcentage de ton corps est de l’eau ?',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      answer: 60,
      tolerance: 0.15,
      explain: 'About **60%** — more than half of you is water. It is in your blood, which carries food and waste round your body, in your sweat, and in the juices that digest your food.',
      explainVn: 'Khoảng **60%** — hơn một nửa cơ thể em là nước. Nước có trong máu, thứ vận chuyển thức ăn và chất thải khắp cơ thể, trong mồ hôi, và trong dịch tiêu hóa thức ăn.',
      explainFr: 'Environ **60%** — plus de la moitié de toi est de l’eau. Elle est dans ton sang, qui transporte la nourriture et les déchets dans tout ton corps, dans ta sueur, et dans les sucs qui digèrent tes aliments.',
    },
  },

  // 22 ─ Which stage? SORT (the classroom game's sentences) ─────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Shuffle',
    eyebrow: 'Which stage?',
    eyebrowVn: 'Giai đoạn nào?',
    eyebrowFr: 'Quelle étape ?',
    title: 'Name the Stage',
    titleVn: 'Gọi tên giai đoạn',
    titleFr: 'Nomme l’étape',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelFr: 'Trie',
    labelIcon: 'Sparkles',
    text: 'Six everyday sentences. Each one is a stage of the water cycle.',
    textVn: 'Sáu câu về đời sống hằng ngày. Mỗi câu là một giai đoạn của vòng tuần hoàn của nước.',
    textFr: 'Six phrases de tous les jours. Chacune est une étape du cycle de l’eau.',
    sub: 'Ask two things: **where** is the water going, and can you **see** it?',
    subVn: 'Hãy tự hỏi hai điều: nước đang đi **đâu**, và em có **nhìn thấy** nó không?',
    subFr: 'Pose-toi deux questions : **où** va l’eau, et peux-tu la **voir** ?',
    activity: {
      id: 'act_sort_stage',
      type: 'sort',
      prompt: 'Sort each sentence into its stage.',
      promptVn: 'Xếp mỗi câu vào đúng giai đoạn của nó.',
      promptFr: 'Range chaque phrase dans son étape.',
      bins: [
        { id: 'evaporation', name: 'Evaporation', nameVn: 'Sự bay hơi (evaporation)', nameFr: 'Évaporation (evaporation)' },
        { id: 'transpiration', name: 'Transpiration', nameVn: 'Sự thoát hơi nước (transpiration)', nameFr: 'Transpiration (transpiration)' },
        { id: 'condensation', name: 'Condensation', nameVn: 'Sự ngưng tụ (condensation)', nameFr: 'Condensation (condensation)' },
        { id: 'precipitation', name: 'Precipitation', nameVn: 'Giáng thủy (precipitation)', nameFr: 'Précipitations (precipitation)' },
      ],
      cards: [
        { id: 'puddle', name: 'A puddle dries up', nameVn: 'Một vũng nước khô đi', nameFr: 'Une flaque sèche', bin: 'evaporation' },
        { id: 'sea', name: 'Water rises off a warm sea', nameVn: 'Nước bay lên từ biển ấm', nameFr: 'De l’eau monte d’une mer chaude', bin: 'evaporation' },
        { id: 'rice', name: 'A rice field loses water through its plants', nameVn: 'Ruộng lúa mất nước qua cây lúa', nameFr: 'Une rizière perd de l’eau par ses plantes', bin: 'transpiration' },
        { id: 'glass', name: 'Drops on a glass of iced coffee', nameVn: 'Giọt nước trên ly cà phê đá', nameFr: 'Des gouttes sur un verre de café glacé', bin: 'condensation' },
        { id: 'mist', name: 'Mist on a lake at sunrise', nameVn: 'Sương mù trên hồ lúc bình minh', nameFr: 'De la brume sur un lac au lever du soleil', bin: 'condensation' },
        { id: 'hail', name: 'Hail bounces off the road', nameVn: 'Mưa đá nảy trên mặt đường', nameFr: 'La grêle rebondit sur la route', bin: 'precipitation' },
      ],
      explain: '**Evaporation:** the puddle and the warm sea — liquid to gas. **Transpiration:** the rice field — the water leaves through plants, not off the ground. **Condensation:** the iced-coffee glass and the mist — you can see them, so they are already liquid. **Precipitation:** the hail — frozen, but it still fell from a cloud.',
      explainVn: '**Sự bay hơi:** vũng nước và biển ấm — lỏng thành khí. **Sự thoát hơi nước:** ruộng lúa — nước đi ra qua cây, không phải từ mặt đất. **Sự ngưng tụ:** ly cà phê đá và sương mù — em nhìn thấy được, nên chúng đã là chất lỏng. **Giáng thủy:** mưa đá — đông đặc, nhưng vẫn rơi từ mây.',
      explainFr: '**Évaporation :** la flaque et la mer chaude — de liquide à gaz. **Transpiration :** la rizière — l’eau sort par les plantes, pas par le sol. **Condensation :** le verre de café glacé et la brume — tu peux les voir, donc ils sont déjà liquides. **Précipitations :** la grêle — gelée, mais elle est quand même tombée d’un nuage.',
    },
  },

  // 23 ─ Follow one drop: CYCLE (journey) ───────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Route',
    eyebrow: 'The whole journey',
    eyebrowVn: 'Cả hành trình',
    eyebrowFr: 'Tout le voyage',
    title: 'Follow One Drop',
    titleVn: 'Theo dấu một giọt nước',
    titleFr: 'Suis une seule goutte',
    content: 'A drop leaves a mango leaf. Months later it is deep in the rocks under a hill. **Four** processes took it there.',
    contentVn: 'Một giọt nước rời lá xoài. Nhiều tháng sau nó nằm sâu trong lòng đá dưới một ngọn đồi. **Bốn** quá trình đã đưa nó đến đó.',
    contentFr: 'Une goutte quitte une feuille de manguier. Des mois plus tard, elle est au fond des roches sous une colline. **Quatre** processus l’y ont menée.',
    activity: {
      id: 'act_journey_mango',
      type: 'cycle',
      ask: 'journey',
      from: 'plant',
      to: 'ground',
      steps: ['transpiration', 'condensation', 'precipitation', 'soaking'],
      prompt: 'Put the four processes in the order the drop met them.',
      promptVn: 'Sắp xếp bốn quá trình theo thứ tự giọt nước đã gặp chúng.',
      promptFr: 'Remets les quatre processus dans l’ordre où la goutte les a rencontrés.',
      explain: '**Transpiration → condensation → precipitation → soaking in.** Out of the leaf as vapour, into a cloud as a tiny drop, down as rain on the hill, then down through the soil into the rocks — groundwater.',
      explainVn: '**Sự thoát hơi nước → sự ngưng tụ → giáng thủy → thấm xuống đất.** Ra khỏi lá ở dạng hơi, vào mây thành một giọt nhỏ, rơi xuống đồi thành mưa, rồi thấm qua lớp đất vào đá — thành nước ngầm.',
      explainFr: '**Transpiration → condensation → précipitations → infiltration.** Sortie de la feuille en vapeur, entrée dans un nuage en toute petite goutte, tombée en pluie sur la colline, puis infiltrée à travers le sol jusque dans les roches — de l’eau souterraine.',
    },
  },

  // 24 ─ Checklist + the exit question as a CHECK ───────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu faire tout ça ?',
    content: 'Next: the Vocab, then **Water Journey** — a new trip round the cycle every time you play.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Hành trình của nước** — mỗi lần chơi là một chuyến đi mới quanh vòng tuần hoàn.',
    contentFr: 'Ensuite : le Vocab, puis **Water Journey** — un nouveau voyage autour du cycle à chaque partie.',
    items: [
      { text: 'Use the **eight key words** to describe the water cycle.', textVn: 'Dùng **tám từ khóa** để mô tả vòng tuần hoàn của nước.', textFr: 'Utilise les **huit mots clés** pour décrire le cycle de l’eau.' },
      { text: 'Say **where** evaporation, transpiration, condensation and precipitation happen.', textVn: 'Nói được sự bay hơi, sự thoát hơi nước, sự ngưng tụ và giáng thủy xảy ra **ở đâu**.', textFr: 'Dis **où** se produisent l’évaporation, la transpiration, la condensation et les précipitations.' },
      { text: 'Say where rain goes when it lands: **open water**, **surface run-off** or **groundwater**.', textVn: 'Nói được mưa đi đâu khi chạm đất: **mặt nước hở**, **dòng chảy bề mặt** hoặc **nước ngầm**.', textFr: 'Dis où va la pluie quand elle touche le sol : les **eaux de surface**, le **ruissellement** ou l’**eau souterraine**.' },
      { text: 'Explain each stage with **particles**, and say whether heat energy is taken in or given out.', textVn: 'Giải thích từng giai đoạn bằng **kiến thức về hạt**, và nói được nhiệt năng được nhận vào hay tỏa ra.', textFr: 'Explique chaque étape avec les **particules**, et dis si l’énergie thermique est reçue ou cédée.' },
      { text: 'Remember: you **cannot see** water vapour. Cloud and mist are liquid drops.', textVn: 'Ghi nhớ: em **không thể nhìn thấy** hơi nước. Mây và sương mù là những giọt lỏng.', textFr: 'Retiens : tu **ne peux pas voir** la vapeur d’eau. Les nuages et la brume sont des gouttes liquides.' },
    ],
    check: {
      id: 'chk_wet_clothes',
      q: 'Exit question: wet clothes on a line dry faster on a sunny day. Why?',
      qVn: 'Câu hỏi cuối bài: quần áo ướt phơi trên dây khô nhanh hơn vào ngày nắng. Vì sao?',
      qFr: 'Question de sortie : le linge mouillé sur un fil sèche plus vite un jour de soleil. Pourquoi ?',
      options: [
        { val: 'A', text: 'Sunlight pushes the water out of the cloth', textVn: 'Ánh nắng đẩy nước ra khỏi vải', textFr: 'La lumière du soleil pousse l’eau hors du tissu' },
        { val: 'B', text: 'The water condenses faster in the sun', textVn: 'Nước ngưng tụ nhanh hơn dưới nắng', textFr: 'L’eau se condense plus vite au soleil' },
        { val: 'C', text: 'The water particles get smaller and float away', textVn: 'Các hạt nước nhỏ đi và bay mất', textFr: 'Les particules d’eau rétrécissent et s’envolent' },
        { val: 'D', text: 'The Sun transfers more heat energy to the water particles, so more of them escape as a gas', textVn: 'Mặt Trời truyền nhiều nhiệt năng hơn cho các hạt nước, nên nhiều hạt thoát ra thành khí hơn', textFr: 'Le Soleil transfère plus d’énergie thermique aux particules d’eau, donc plus d’entre elles s’échappent sous forme de gaz' },
      ],
      correct: 'D',
      expEn: 'More heat energy means faster particles, and more of them break free from the cloth as a gas — **evaporation** is faster. Light does not push water (A); condensing is gas → liquid, which would make the clothes wetter (B); and particles never change size (C).',
      expVn: 'Nhiều nhiệt năng hơn nghĩa là các hạt chuyển động nhanh hơn, và nhiều hạt thoát khỏi vải thành khí hơn — **sự bay hơi** nhanh hơn. Ánh sáng không đẩy được nước (A); ngưng tụ là khí → lỏng, sẽ làm quần áo ướt thêm (B); và các hạt không bao giờ thay đổi kích thước (C).',
      expFr: 'Plus d’énergie thermique veut dire des particules plus rapides, et plus d’entre elles s’échappent du tissu sous forme de gaz — l’**évaporation** est plus rapide. La lumière ne pousse pas l’eau (A) ; se condenser, c’est gaz → liquide, ce qui mouillerait encore plus le linge (B) ; et les particules ne changent jamais de taille (C).',
    },
  },
];
