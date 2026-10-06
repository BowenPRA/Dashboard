// src/data/Y7_SCI/U02_3/notes.js
// 2.3 Explaining Changes of State — the self-study deck, reduced from the
// classroom lesson content/y7-science/U02_3 to docs/y7-science/unit2-close-engines.md.
// 24 layout slides; 17 scored items — 7 checks and 10 activities of six types
// (sort · predict · chain · estimate · hotspot · order).
//
// THE SPINE IS ONE SENTENCE, TOLD FIVE WAYS. Heat energy is transferred to (or
// away from) the particles → they move more (or less) → they overcome the
// attractive forces (or the forces pull them together) → so the substance
// expands, melts, evaporates, boils (or condenses, freezes). The classroom
// deck was 12 slides and a 50-minute teacher; this one teaches each change in
// turn and makes the student build or fix the chain four times (`chain`).
//
// WHAT THE ROOM DID, AND WHAT THE STUDENT DOES HERE
//  · The paper starter (write the five changes from memory) → the `sort` on
//    slide 2: each change onto its journey.
//  · "You know WHAT happens. Why?" → a `predict` about the heated bar.
//  · The key-words copy-down → Key word cards, one idea at a time.
//  · The expansion photo, the draw-this diagram, the melting write note, the
//    boiling diagram and the condensing photo stay; each change gets its chain
//    sentence as a Key word card, then a `chain` to build or fix.
//  · "The particles do not get bigger" was said aloud in the room; here it is
//    drawn (EXPAND_SIZE) and checked, and the misconceptions get a slide.
//  · The CONDENSING diagram, never used in the room, carries condensing.
//  · The ParticleExplainer game → a showcase slide (it takes `lang`).
//  · Book questions 1–3 → STATE_BOXES and two checks, the answers in a reveal.
//  · The "Lesson Complete" exit question (the bridge, longer in summer) → the
//    checklist's final check.
//
// House notes: bilingual everywhere; a slide's `check:` or `activity:` is its
// LAST key and no slide carries both; activity items use name/explain, never
// text. A `chain` activity sits in the side column from lg (Notes.jsx
// SIDE_ACTIVITIES), so the slides that carry one are short statements, and the
// chain cards repeat Explain It's links word for word. Photos are openly
// licensed and credited in docs/y7-science/plans/U02_3.md.
import { DIAGRAMS } from './diagrams.js';
import { ParticleExplainer } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_3/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const BLUE = '#1a5fa8';
const RED = '#c8102e';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textVn) => ({ tone: 'write', badge: 'Key word', badgeVn: 'Từ khóa', icon: 'BookOpen', text, textVn });
// The chain for one change, worded exactly as utils/stateChain.js LINKS.
const chainCard = (text, textVn) => ({ tone: 'write', badge: 'The explanation', badgeVn: 'Lời giải thích', icon: 'Link', text, textVn });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Atom',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 2 · 2.3',
    eyebrowVn: 'Chương 2 · 2.3',
    title: 'Explaining Changes of State',
    titleVn: 'Giải thích sự chuyển thể',
    objective: 'Use particles to explain why a solid expands and why each change of state happens — then why solids and liquids cannot be compressed, and why liquids and gases can flow.',
    objectiveVn: 'Dùng các hạt để giải thích vì sao chất rắn giãn nở và vì sao mỗi sự chuyển thể xảy ra — rồi vì sao chất rắn và chất lỏng không nén được, và vì sao chất lỏng và chất khí chảy được.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **sort**, **predict**, **build explanations link by link**, **fix broken ones** and **tap a diagram**. **17 things are scored** — the first is on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán**, **xây lời giải thích từng mắt xích**, **sửa những chuỗi bị hỏng** và **chạm vào sơ đồ**. **17 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: SORT — five changes onto their journeys ─────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Last lesson: changes of state',
    eyebrowVn: 'Bài trước: sự chuyển thể',
    title: 'Five Changes, From Memory',
    titleVn: 'Năm sự chuyển thể, từ trí nhớ',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: 'Each change of state is a **journey** from one state to another.',
    textVn: 'Mỗi sự chuyển thể là một **hành trình** từ trạng thái này sang trạng thái khác.',
    sub: 'Put each of the five on its journey. Two share one.',
    subVn: 'Đặt từng sự chuyển thể vào hành trình của nó. Có hai cái dùng chung một hành trình.',
    activity: {
      id: 'act_five_changes',
      type: 'sort',
      prompt: 'Which journey is each change?',
      promptVn: 'Mỗi sự chuyển thể là hành trình nào?',
      bins: [
        { id: 'sl', name: 'Solid → liquid', nameVn: 'Rắn → lỏng' },
        { id: 'ls', name: 'Liquid → solid', nameVn: 'Lỏng → rắn' },
        { id: 'lg', name: 'Liquid → gas', nameVn: 'Lỏng → khí' },
        { id: 'gl', name: 'Gas → liquid', nameVn: 'Khí → lỏng' },
      ],
      cards: [
        { id: 'melting', name: 'melting', nameVn: 'nóng chảy (melting)', bin: 'sl' },
        { id: 'freezing', name: 'freezing', nameVn: 'đông đặc (freezing)', bin: 'ls' },
        { id: 'evaporating', name: 'evaporating', nameVn: 'bay hơi (evaporating)', bin: 'lg' },
        { id: 'boiling', name: 'boiling', nameVn: 'sôi (boiling)', bin: 'lg' },
        { id: 'condensing', name: 'condensing', nameVn: 'ngưng tụ (condensing)', bin: 'gl' },
      ],
      explain: '**Melting:** solid → liquid. **Freezing:** liquid → solid. **Evaporating** and **boiling** are both liquid → gas — evaporating slowly from the surface, boiling fast, all through. **Condensing:** gas → liquid. Today you find out **why** each one happens.',
      explainVn: '**Nóng chảy:** rắn → lỏng. **Đông đặc:** lỏng → rắn. **Bay hơi** và **sôi** đều là lỏng → khí — bay hơi chậm từ bề mặt, sôi nhanh ở khắp trong lòng chất lỏng. **Ngưng tụ:** khí → lỏng. Hôm nay em tìm hiểu **vì sao** mỗi sự chuyển thể xảy ra.',
    },
  },

  // 3 ─ PREDICT: what happens to the particles? ─────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'You know WHAT happens. Now: WHY?',
    eyebrowVn: 'Em biết ĐIỀU GÌ xảy ra. Bây giờ: VÌ SAO?',
    title: 'Why?',
    titleVn: 'Vì sao?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'A steel bar is heated in a flame. It gets a tiny bit **longer**.',
    textVn: 'Một thanh thép được hơ nóng trên ngọn lửa. Nó dài ra một chút xíu.',
    sub: 'What happens to its **particles**? Decide before you go on.',
    subVn: 'Điều gì xảy ra với **các hạt** của nó? Hãy quyết định trước khi đi tiếp.',
    activity: {
      id: 'act_predict_bar',
      type: 'predict',
      prompt: 'The steel bar gets longer. What do its particles do?',
      promptVn: 'Thanh thép dài ra. Các hạt của nó làm gì?',
      options: [
        { val: 'bigger', name: 'They get bigger', nameVn: 'Chúng to ra' },
        { val: 'vibrate', name: 'They vibrate more and push a little further apart', nameVn: 'Chúng rung động nhiều hơn và đẩy nhau ra xa hơn một chút' },
        { val: 'melt', name: 'They start to melt', nameVn: 'Chúng bắt đầu nóng chảy' },
      ],
      correct: 'vibrate',
      explain: '**They vibrate more and push a little further apart.** Particles never change size, and one particle cannot melt. The next slides show why — and the same idea explains every change of state.',
      explainVn: '**Chúng rung động nhiều hơn và đẩy nhau ra xa hơn một chút.** Các hạt không bao giờ thay đổi kích thước, và một hạt không thể nóng chảy. Các slide sau cho thấy vì sao — và cùng ý đó giải thích mọi sự chuyển thể.',
    },
  },

  // 4 ─ Key words: heat energy, transferred, attractive force + CHECK ───────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'BookOpen',
    eyebrow: 'Key words · Learner’s Book, page 41',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 41',
    title: 'Particles and Energy',
    titleVn: 'Các hạt và năng lượng',
    content:
      'Every explanation today uses the same three ideas. **Heat energy** makes particles move. It is **transferred** to them when they are heated, and away from them when they cool. The **attractive forces** between particles pull them together.',
    contentVn:
      'Mọi lời giải thích hôm nay đều dùng ba ý này. **Nhiệt năng** làm các hạt chuyển động. Nó được **truyền** đến các hạt khi chúng bị đun nóng, và ra khỏi chúng khi chúng nguội đi. **Lực hút** giữa các hạt kéo chúng lại với nhau.',
    notes: [
      keyWord(
        '**Heat energy:** the energy that makes particles move.\n**Transferred:** moved from one place to another.\n**Attractive force:** the force that holds particles together.',
        '**Nhiệt năng (heat energy):** năng lượng làm các hạt chuyển động.\n**Truyền (transferred):** di chuyển từ nơi này sang nơi khác.\n**Lực hút (attractive force):** lực giữ các hạt với nhau.',
      ),
    ],
    check: {
      id: 'chk_attractive',
      q: 'In a solid, what holds the particles together in a fixed pattern?',
      qVn: 'Trong chất rắn, điều gì giữ các hạt với nhau theo trật tự cố định?',
      options: [
        { val: 'A', text: 'Heat energy', textVn: 'Nhiệt năng' },
        { val: 'B', text: 'The container the solid is in', textVn: 'Vật chứa chất rắn' },
        { val: 'C', text: 'The attractive forces between the particles', textVn: 'Lực hút giữa các hạt' },
        { val: 'D', text: 'Cold energy', textVn: 'Năng lượng lạnh' },
      ],
      correct: 'C',
      expEn: 'The **attractive forces** between the particles hold them in place. Heat energy (A) does the opposite: it makes the particles move more. A solid keeps its shape without a container (B), and there is no such thing as cold energy (D).',
      expVn: '**Lực hút** giữa các hạt giữ chúng tại chỗ. Nhiệt năng (A) làm điều ngược lại: nó làm các hạt chuyển động nhiều hơn. Chất rắn giữ được hình dạng mà không cần vật chứa (B), và không có thứ gọi là năng lượng lạnh (D).',
    },
  },

  // 5 ─ Why do solids expand? (photo) ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MoveHorizontal',
    eyebrow: 'Learner’s Book, page 42 · heating a solid',
    eyebrowVn: 'Sách học sinh, trang 42 · đun nóng chất rắn',
    title: 'Why Do Solids Expand?',
    titleVn: 'Vì sao chất rắn giãn nở?',
    ratio: 42,
    image: img('expansion.jpg'),
    content:
      'These bridge rails meet at a long slant, so they can slide along each other as the steel grows on hot days.',
    contentVn:
      'Các thanh ray trên cầu này gặp nhau theo một đường xiên dài, để chúng trượt dọc theo nhau khi thép dài ra vào ngày nóng.',
    notes: [
      keyWord(
        '**Expand:** to get bigger.',
        '**Giãn nở (expand):** to ra.',
      ),
      chainCard(
        'Heat energy is transferred to the particles.\nThe particles vibrate more.\nThey take up more space, so the solid expands.',
        'Nhiệt năng được truyền đến các hạt.\nCác hạt rung động nhiều hơn.\nChúng chiếm nhiều chỗ hơn, nên chất rắn giãn nở.',
      ),
    ],
  },

  // 6 ─ CHAIN (build): the bridge ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Link',
    eyebrow: 'Build it',
    eyebrowVn: 'Xây chuỗi',
    title: 'The Bridge in Summer',
    titleVn: 'Cây cầu vào mùa hè',
    text: 'A steel bridge is a little **longer** on a hot summer afternoon than on a cold winter morning.',
    textVn: 'Một cây cầu thép **dài hơn** một chút vào buổi chiều hè nóng so với buổi sáng mùa đông lạnh.',
    sub: 'Two of the links are traps.',
    subVn: 'Có hai mắt xích là bẫy.',
    activity: {
      id: 'act_chain_bridge',
      type: 'chain',
      ask: 'build',
      scenario: 'bridge',
      traps: ['bigger_expand', 'dir_away'],
      prompt: 'Why is the bridge longer? Tap the links in order.',
      promptVn: 'Vì sao cây cầu dài hơn? Chạm các mắt xích theo thứ tự.',
      explain: 'Heat energy goes **in**, the particles **vibrate more**, and they **take up more space** — so the steel expands. Each particle stays the same size: only the gaps between them grow.',
      explainVn: 'Nhiệt năng đi **vào**, các hạt **rung động nhiều hơn**, và chúng **chiếm nhiều chỗ hơn** — nên thép giãn nở. Mỗi hạt vẫn giữ nguyên kích thước: chỉ khoảng cách giữa chúng tăng lên.',
    },
  },

  // 7 ─ Bigger gaps, not bigger particles + CHECK ────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Maximize2',
    eyebrow: 'The mistake to avoid',
    eyebrowVn: 'Lỗi cần tránh',
    title: 'Bigger Gaps, Not Bigger Particles',
    titleVn: 'Khoảng cách to ra, không phải hạt to ra',
    ratio: 55,
    inlineSvg: DIAGRAMS.EXPAND_SIZE,
    content:
      'When a solid expands, its particles do **not** get bigger. The same particles, the same size, **vibrate more** and push a little further apart.\n\n' +
      'That is why engineers leave **gaps** in bridges and between railway rails: the steel needs room to expand on hot days.',
    contentVn:
      'Khi chất rắn giãn nở, các hạt của nó **không** to ra. Vẫn những hạt đó, cùng kích thước đó, **rung động nhiều hơn** và đẩy nhau ra xa hơn một chút.\n\n' +
      'Vì thế các kỹ sư để **khe hở** trên cầu và giữa các thanh ray: thép cần chỗ để giãn nở vào những ngày nóng.',
    check: {
      id: 'chk_gaps',
      q: 'Why do engineers leave small gaps between the steel sections of a bridge?',
      qVn: 'Vì sao các kỹ sư để những khe hở nhỏ giữa các đoạn thép của cây cầu?',
      options: [
        { val: 'A', text: 'So that rain can drain away', textVn: 'Để nước mưa thoát đi' },
        { val: 'B', text: 'So the steel has room to expand on hot days', textVn: 'Để thép có chỗ giãn nở vào những ngày nóng' },
        { val: 'C', text: 'To make the bridge lighter', textVn: 'Để cây cầu nhẹ hơn' },
        { val: 'D', text: 'So the particles have room to get bigger', textVn: 'Để các hạt có chỗ to ra' },
      ],
      correct: 'B',
      expEn: 'On hot days heat energy is transferred to the steel, its particles vibrate more and take up more space, and the steel **expands**. Without gaps it would push and buckle. D is the trap: the particles do not get bigger, the gaps between them do. A and C have nothing to do with heat.',
      expVn: 'Vào ngày nóng nhiệt năng truyền đến thép, các hạt rung động nhiều hơn và chiếm nhiều chỗ hơn, và thép **giãn nở**. Không có khe hở, thép sẽ đẩy nhau và cong vênh. D là cái bẫy: các hạt không to ra, khoảng cách giữa chúng mới to ra. A và C không liên quan đến nhiệt.',
    },
  },

  // 8 ─ ESTIMATE: how much longer? ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Guess first',
    eyebrowVn: 'Đoán trước',
    title: 'How Much Longer?',
    titleVn: 'Dài thêm bao nhiêu?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Sparkles',
    text: 'A **1 km** steel bridge warms up by **30 °C** in one day.',
    textVn: 'Một cây cầu thép dài **1 km** nóng thêm **30 °C** trong một ngày.',
    sub: 'How much longer does it get?',
    subVn: 'Nó dài thêm bao nhiêu?',
    activity: {
      id: 'act_estimate_bridge',
      type: 'estimate',
      prompt: 'How many centimetres longer does the 1 km bridge get?',
      promptVn: 'Cây cầu dài 1 km dài thêm bao nhiêu xentimét?',
      min: 0,
      max: 200,
      step: 1,
      unit: 'cm',
      unitVn: 'cm',
      answer: 36,
      tolerance: 0.5,
      explain: 'About **36 cm**. Steel grows by about 12 mm for every kilometre and every 1 °C, so 30 °C makes 30 × 12 = 360 mm. That is small next to 1 km, but a bridge with no gap for it would push and buckle.',
      explainVn: 'Khoảng **36 cm**. Thép dài thêm khoảng 12 mm cho mỗi kilômét và mỗi 1 °C, nên 30 °C làm dài thêm 30 × 12 = 360 mm. Con số đó nhỏ so với 1 km, nhưng một cây cầu không có khe hở cho nó sẽ bị đẩy và cong vênh.',
    },
  },

  // 9 ─ Heating a solid until it melts (the classroom's Draw This) ──────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Flame',
    eyebrow: 'Learner’s Book, page 42 · keep heating',
    eyebrowVn: 'Sách học sinh, trang 42 · tiếp tục đun nóng',
    title: 'Heating a Solid Until It Melts',
    titleVn: 'Đun nóng chất rắn đến khi nóng chảy',
    inlineSvg: DIAGRAMS.HEATING_TO_MELTING,
    caption: 'Left to right: a solid, the same solid **expanding**, then a **liquid**. Every particle is the same size in all three panels.',
    captionVn: 'Từ trái sang phải: một chất rắn, chính chất rắn đó đang **giãn nở**, rồi một **chất lỏng**. Mọi hạt có cùng kích thước ở cả ba ô.',
  },

  // 10 ─ Why does a solid melt? + HOTSPOT ───────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Droplets',
    eyebrow: 'Melting, explained',
    eyebrowVn: 'Giải thích sự nóng chảy',
    title: 'Why Does a Solid Melt?',
    titleVn: 'Vì sao chất rắn nóng chảy?',
    content:
      'Keep heating, and the particles vibrate **more and more** — until the **attractive forces** cannot hold them in place.',
    contentVn:
      'Tiếp tục đun nóng, các hạt rung động **ngày càng nhiều** — cho đến khi **lực hút** không giữ được chúng tại chỗ.',
    notes: [
      chainCard(
        'Heat energy is transferred to the particles.\nThe particles vibrate more and more.\nThe attractive forces can no longer hold them in a fixed pattern.\nThey can slide past each other, so the solid melts.',
        'Nhiệt năng được truyền đến các hạt.\nCác hạt rung động ngày càng nhiều.\nLực hút không còn giữ được chúng trong trật tự cố định.\nChúng có thể trượt qua nhau, nên chất rắn nóng chảy.',
      ),
    ],
    activity: {
      id: 'act_hotspot_melt',
      type: 'hotspot',
      prompt: 'The labels are gone. Tap the panel where the attractive forces can no longer hold the particles in a fixed pattern.',
      promptVn: 'Các nhãn đã bị xóa. Chạm vào ô mà ở đó lực hút không còn giữ được các hạt trong trật tự cố định.',
      svg: DIAGRAMS.HEATING_TO_MELTING,
      viewBox: '0 0 940 420',
      targets: [
        { id: 'solid', x: 150, y: 185, r: 115, name: 'The cold solid', nameVn: 'Chất rắn lạnh' },
        { id: 'expanding', x: 475, y: 185, r: 115, name: 'The expanding solid', nameVn: 'Chất rắn đang giãn nở' },
        { id: 'liquid', x: 790, y: 185, r: 115, name: 'The liquid', nameVn: 'Chất lỏng' },
      ],
      correct: 'liquid',
      explain: 'The **liquid** (the blue panel). In the expanding solid the forces still hold the particles in their pattern; only in the liquid can the particles slide past each other.',
      explainVn: '**Chất lỏng** (ô màu xanh). Trong chất rắn đang giãn nở, lực hút vẫn giữ các hạt theo trật tự; chỉ trong chất lỏng các hạt mới trượt qua nhau được.',
    },
  },

  // 11 ─ CHAIN (fix): the chocolate bar ─────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Link',
    eyebrow: 'Fix it',
    eyebrowVn: 'Sửa chuỗi',
    title: 'Chocolate in Your Pocket',
    titleVn: 'Sô-cô-la trong túi áo',
    text: 'A bar of chocolate in your pocket goes **soft and runny**.',
    textVn: 'Thanh sô-cô-la trong túi áo em trở nên **mềm và chảy ra**.',
    sub: 'Someone explained it — but one link is wrong.',
    subVn: 'Có người đã giải thích — nhưng một mắt xích bị sai.',
    activity: {
      id: 'act_chain_chocolate',
      type: 'chain',
      ask: 'fix',
      scenario: 'chocolate',
      trap: 'particles_melt',
      prompt: 'Tap the broken link, then its replacement.',
      promptVn: 'Chạm vào mắt xích bị hỏng, rồi chọn mắt xích thay thế.',
      explain: 'A single particle cannot melt. The **solid** melts: the same particles, vibrating so much that the forces can no longer hold them in a fixed pattern, so they slide past each other.',
      explainVn: 'Một hạt riêng lẻ không thể nóng chảy. **Chất rắn** nóng chảy: vẫn những hạt đó, rung động mạnh đến mức lực hút không còn giữ được chúng trong trật tự cố định, nên chúng trượt qua nhau.',
    },
  },

  // 12 ─ Evaporating or boiling? + SORT ─────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Wind',
    eyebrow: 'Liquid to gas, two ways',
    eyebrowVn: 'Lỏng thành khí, hai cách',
    title: 'Evaporating or Boiling?',
    titleVn: 'Bay hơi hay sôi?',
    columns: [
      {
        heading: 'Evaporating',
        headingVn: 'Bay hơi',
        accent: TEAL,
        icon: 'Wind',
        content: 'Some particles **at the surface** have enough energy to overcome the attractive forces and escape into the air.\n\nIt happens **at any temperature**, slowly. A puddle dries on a warm day.',
        contentVn: 'Một số hạt **ở bề mặt** có đủ năng lượng để vượt qua lực hút và thoát vào không khí.\n\nNó xảy ra **ở mọi nhiệt độ**, một cách chậm rãi. Vũng nước khô đi vào ngày ấm.',
      },
      {
        heading: 'Boiling',
        headingVn: 'Sôi',
        accent: RED,
        icon: 'Flame',
        content: 'At the **boiling point**, particles **all through** the liquid have enough energy to overcome the forces.\n\nBubbles of gas form inside the liquid and escape, fast. A kettle at 100 °C.',
        contentVn: 'Ở **nhiệt độ sôi**, các hạt **ở khắp** trong lòng chất lỏng có đủ năng lượng để vượt qua lực hút.\n\nCác bọt khí hình thành bên trong chất lỏng và thoát ra, nhanh. Ấm nước ở 100 °C.',
      },
    ],
    activity: {
      id: 'act_sort_evap_boil',
      type: 'sort',
      prompt: 'Evaporating, boiling, or both?',
      promptVn: 'Bay hơi, sôi, hay cả hai?',
      bins: [
        { id: 'evap', name: 'Evaporating', nameVn: 'Bay hơi' },
        { id: 'boil', name: 'Boiling', nameVn: 'Sôi' },
        { id: 'both', name: 'Both', nameVn: 'Cả hai' },
      ],
      cards: [
        { id: 'surface', name: 'only at the surface', nameVn: 'chỉ ở bề mặt', bin: 'evap' },
        { id: 'anytemp', name: 'at any temperature', nameVn: 'ở mọi nhiệt độ', bin: 'evap' },
        { id: 'all', name: 'all through the liquid', nameVn: 'ở khắp trong lòng chất lỏng', bin: 'boil' },
        { id: 'bp', name: 'only at the boiling point', nameVn: 'chỉ ở nhiệt độ sôi', bin: 'boil' },
        { id: 'lg', name: 'liquid → gas', nameVn: 'lỏng → khí', bin: 'both' },
        { id: 'overcome', name: 'particles overcome the attractive forces', nameVn: 'các hạt vượt qua lực hút', bin: 'both' },
      ],
      explain: '**Evaporating:** only at the surface, at any temperature. **Boiling:** all through the liquid, only at the boiling point. **Both** turn a liquid into a gas, and in both the escaping particles have enough energy to overcome the attractive forces.',
      explainVn: '**Bay hơi:** chỉ ở bề mặt, ở mọi nhiệt độ. **Sôi:** ở khắp trong lòng chất lỏng, chỉ ở nhiệt độ sôi. **Cả hai** đều biến chất lỏng thành chất khí, và trong cả hai, các hạt thoát ra có đủ năng lượng để vượt qua lực hút.',
    },
  },

  // 13 ─ Boiling, explained (diagram); evaporating's chain is slide 12's left column
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Flame',
    eyebrow: 'Learner’s Book, page 43 · keep heating the liquid',
    eyebrowVn: 'Sách học sinh, trang 43 · tiếp tục đun nóng chất lỏng',
    title: 'Why Does a Liquid Boil?',
    titleVn: 'Vì sao chất lỏng sôi?',
    ratio: 48,
    inlineSvg: DIAGRAMS.BOILING,
    notes: [
      chainCard(
        'Heat energy is transferred to the particles.\nThe particles move faster and faster.\nAt the boiling point, particles all through the liquid have enough energy to overcome the attractive forces.\nThey form bubbles of gas that escape, so the liquid boils.',
        'Nhiệt năng được truyền đến các hạt.\nCác hạt chuyển động ngày càng nhanh.\nỞ nhiệt độ sôi, các hạt ở khắp trong lòng chất lỏng có đủ năng lượng để vượt qua lực hút.\nChúng tạo thành các bọt khí rồi thoát ra, nên chất lỏng sôi.',
      ),
    ],
  },

  // 14 ─ CHAIN (build): a pot of phở ────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Link',
    eyebrow: 'Build it',
    eyebrowVn: 'Xây chuỗi',
    title: 'A Pot of Phở',
    titleVn: 'Nồi nước dùng phở',
    text: 'A big pot of phở broth **bubbles hard** on the stove.',
    textVn: 'Một nồi nước dùng phở lớn **sôi sùng sục** trên bếp.',
    sub: 'Four steps, and two traps in the bank.',
    subVn: 'Bốn bước, và hai cái bẫy trong ngân hàng mắt xích.',
    activity: {
      id: 'act_chain_pho',
      type: 'chain',
      ask: 'build',
      scenario: 'pho',
      traps: ['bubbles_air', 'boil_surface'],
      prompt: 'Why does the broth boil? Tap the links in order.',
      promptVn: 'Vì sao nước dùng sôi? Chạm các mắt xích theo thứ tự.',
      explain: 'Heat energy goes **in**, the particles **move faster and faster**, and at the boiling point particles **all through** the broth overcome the forces and escape as bubbles of gas. The bubbles are the broth’s own water as a gas, not air.',
      explainVn: 'Nhiệt năng đi **vào**, các hạt **chuyển động ngày càng nhanh**, và ở nhiệt độ sôi các hạt **ở khắp** trong nồi vượt qua lực hút và thoát ra thành các bọt khí. Các bọt đó là chính nước trong nồi ở dạng khí, không phải không khí.',
    },
  },

  // 15 ─ Cooling is the reverse (photo) + CHECK ──────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Snowflake',
    eyebrow: 'Cooling runs the chain backwards',
    eyebrowVn: 'Làm lạnh chạy chuỗi theo chiều ngược lại',
    title: 'Cooling Is the Reverse',
    titleVn: 'Làm lạnh là quá trình ngược lại',
    ratio: 42,
    image: img('condensation.jpg'),
    content:
      'Take heat energy **away** and everything runs backwards: the particles **slow down**, and the attractive forces pull them back together.\n\n' +
      'These drops formed on the outside of a cold glass of water. **Water vapour** in the air touched the cold glass, lost energy, and **condensed** into a liquid.',
    contentVn:
      'Lấy nhiệt năng **đi** thì mọi thứ chạy ngược lại: các hạt **chậm lại**, và lực hút kéo chúng lại gần nhau.\n\n' +
      'Những giọt này hình thành bên ngoài một cốc nước lạnh. **Hơi nước** trong không khí chạm vào cốc lạnh, mất năng lượng, và **ngưng tụ** thành chất lỏng.',
    check: {
      id: 'chk_iced_coffee',
      q: 'Drops of water form on the outside of a glass of iced coffee (cà phê sữa đá). Where do they come from?',
      qVn: 'Những giọt nước đọng bên ngoài cốc cà phê sữa đá. Chúng đến từ đâu?',
      options: [
        { val: 'A', text: 'Water vapour in the air condenses on the cold glass', textVn: 'Hơi nước trong không khí ngưng tụ trên cốc lạnh' },
        { val: 'B', text: 'Coffee leaks out through the glass', textVn: 'Cà phê rỉ ra qua thành cốc' },
        { val: 'C', text: 'The ice melts through the glass', textVn: 'Đá tan xuyên qua thành cốc' },
        { val: 'D', text: 'The cold glass makes new water particles', textVn: 'Cốc lạnh tạo ra các hạt nước mới' },
      ],
      correct: 'A',
      expEn: '**Water vapour in the air** touches the cold glass, heat energy is transferred away from its particles, they slow down, and the forces pull them together into drops. Glass does not leak (B, C) — the drops are not even brown — and no particles are ever made (D).',
      expVn: '**Hơi nước trong không khí** chạm vào cốc lạnh, nhiệt năng được truyền ra khỏi các hạt của nó, chúng chậm lại, và lực hút kéo chúng lại thành giọt. Thủy tinh không rỉ nước (B, C) — các giọt nước còn không có màu nâu — và không bao giờ có hạt nào được tạo ra (D).',
    },
  },

  // 16 ─ Condensing, explained (the diagram the room never used) ─────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'CloudFog',
    eyebrow: 'Learner’s Book, page 43 · gas to liquid',
    eyebrowVn: 'Sách học sinh, trang 43 · khí thành lỏng',
    title: 'Why Does a Gas Condense?',
    titleVn: 'Vì sao chất khí ngưng tụ?',
    ratio: 48,
    inlineSvg: DIAGRAMS.CONDENSING,
    content:
      'Fast gas particles hit the **cold surface**. They lose energy, slow down, and the attractive forces pull them together.',
    contentVn:
      'Các hạt khí chuyển động nhanh va vào **bề mặt lạnh**. Chúng mất năng lượng, chậm lại, và lực hút kéo chúng lại với nhau.',
    notes: [
      chainCard(
        'Heat energy is transferred away from the particles.\nThe particles slow down.\nThe attractive forces pull them close together.\nThey form drops of liquid, so the gas condenses.',
        'Nhiệt năng được truyền ra khỏi các hạt.\nCác hạt chuyển động chậm lại.\nLực hút kéo chúng lại sát nhau.\nChúng tạo thành các giọt chất lỏng, nên chất khí ngưng tụ.',
      ),
    ],
  },

  // 17 ─ CHAIN (fix): the bathroom mirror ───────────────────────────────────
  {
    layout: 'statement',
    accent: BLUE,
    icon: 'Link',
    eyebrow: 'Fix it',
    eyebrowVn: 'Sửa chuỗi',
    title: 'The Bathroom Mirror',
    titleVn: 'Gương phòng tắm',
    text: 'The bathroom mirror **mists up** after a hot shower.',
    textVn: 'Gương phòng tắm **bị mờ hơi nước** sau khi tắm nước nóng.',
    sub: 'One link in this explanation is a famous mistake.',
    subVn: 'Một mắt xích trong lời giải thích này là một lỗi rất hay gặp.',
    activity: {
      id: 'act_chain_mirror',
      type: 'chain',
      ask: 'fix',
      scenario: 'mirror',
      trap: 'cold_in',
      prompt: 'Tap the broken link, then its replacement.',
      promptVn: 'Chạm vào mắt xích bị hỏng, rồi chọn mắt xích thay thế.',
      explain: 'There is no such thing as cold energy. The mirror is colder than the steam, so heat energy is transferred **away** from the water particles; they slow down and the forces pull them into drops.',
      explainVn: 'Không có thứ gọi là năng lượng lạnh. Gương lạnh hơn hơi nước, nên nhiệt năng được truyền **ra khỏi** các hạt nước; chúng chậm lại và lực hút kéo chúng lại thành giọt.',
    },
  },

  // 18 ─ Freezing + CHECK ───────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Snowflake',
    eyebrow: 'Liquid to solid',
    eyebrowVn: 'Lỏng thành rắn',
    title: 'Why Does a Liquid Freeze?',
    titleVn: 'Vì sao chất lỏng đông đặc?',
    content:
      'Keep taking heat energy away. The particles slow down until the forces pull them into a **fixed pattern** — but they still **vibrate on the spot**.',
    contentVn:
      'Tiếp tục lấy nhiệt năng đi. Các hạt chậm lại cho đến khi lực hút kéo chúng vào một **trật tự cố định** — nhưng chúng vẫn **rung động tại chỗ**.',
    notes: [
      chainCard(
        'Heat energy is transferred away from the particles.\nThe particles slow down.\nThe attractive forces pull them into a fixed pattern.\nThey can only vibrate on the spot, so the liquid freezes.',
        'Nhiệt năng được truyền ra khỏi các hạt.\nCác hạt chuyển động chậm lại.\nLực hút kéo chúng vào một trật tự cố định.\nChúng chỉ còn rung động tại chỗ, nên chất lỏng đông đặc.',
      ),
    ],
    check: {
      id: 'chk_ice_particles',
      q: 'Water freezes into ice in the freezer. Which describes the particles in the ice?',
      qVn: 'Nước đông thành đá trong ngăn đá. Câu nào mô tả các hạt trong đá?',
      options: [
        { val: 'A', text: 'They have stopped moving', textVn: 'Chúng đã ngừng chuyển động' },
        { val: 'B', text: 'They have got smaller', textVn: 'Chúng đã nhỏ lại' },
        { val: 'C', text: 'They have turned into new ice particles', textVn: 'Chúng đã biến thành các hạt đá mới' },
        { val: 'D', text: 'They vibrate on the spot in a fixed pattern', textVn: 'Chúng rung động tại chỗ theo trật tự cố định' },
      ],
      correct: 'D',
      expEn: 'In ice the particles are held in a **fixed pattern** and **vibrate on the spot**. They never stop moving (A), never change size (B), and are the same water particles as before (C) — only their arrangement and movement changed.',
      expVn: 'Trong đá, các hạt được giữ theo **trật tự cố định** và **rung động tại chỗ**. Chúng không bao giờ ngừng chuyển động (A), không bao giờ thay đổi kích thước (B), và vẫn là những hạt nước như trước (C) — chỉ cách sắp xếp và cách chuyển động thay đổi.',
    },
  },

  // 19 ─ The ParticleExplainer, ported ──────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Atom',
    eyebrow: 'Five changes · press the button, watch the particles, read each link',
    eyebrowVn: 'Năm sự chuyển thể · bấm nút, xem các hạt, đọc từng mắt xích',
    title: 'Explain It With Particles',
    titleVn: 'Giải thích bằng hạt',
    widget: ParticleExplainer,
  },

  // 20 ─ Three things particles never do ────────────────────────────────────
  {
    layout: 'stack',
    accent: RED,
    icon: 'ShieldAlert',
    columns: 3,
    eyebrow: 'The three mistakes that break a chain',
    eyebrowVn: 'Ba lỗi làm hỏng một chuỗi giải thích',
    title: 'Three Things Particles Never Do',
    titleVn: 'Ba điều các hạt không bao giờ làm',
    content: 'Every trap you have met so far is one of these. Check each explanation you write against all three.',
    contentVn: 'Mọi cái bẫy em đã gặp đều là một trong ba điều này. Hãy kiểm tra mỗi lời giải thích em viết với cả ba.',
    notes: [
      { tone: 'homework', badge: 'Never', badgeVn: 'Không bao giờ', icon: 'Maximize2',
        text: '**Change size.** Heated particles spread out; cooled particles are pulled together. Each particle stays the same size.',
        textVn: '**Thay đổi kích thước.** Hạt bị đun nóng thì tản ra; hạt bị làm lạnh thì bị kéo lại gần nhau. Mỗi hạt vẫn giữ nguyên kích thước.' },
      { tone: 'homework', badge: 'Never', badgeVn: 'Không bao giờ', icon: 'Snowflake',
        text: '**Stop moving.** Even in ice, the particles still vibrate on the spot.',
        textVn: '**Ngừng chuyển động.** Ngay cả trong đá, các hạt vẫn rung động tại chỗ.' },
      { tone: 'homework', badge: 'Never', badgeVn: 'Không bao giờ', icon: 'Wind',
        text: '**Disappear.** A dried puddle’s particles are still there, in the air, as an invisible gas.',
        textVn: '**Biến mất.** Các hạt của vũng nước đã khô vẫn ở đó, trong không khí, dưới dạng chất khí vô hình.' },
    ],
  },

  // 21 ─ Book question 2: compressing + CHECK ───────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Syringe',
    eyebrow: 'Learner’s Book, page 43 · question 2',
    eyebrowVn: 'Sách học sinh, trang 43 · câu hỏi 2',
    title: 'Can You Squash It?',
    titleVn: 'Em có nén được không?',
    ratio: 55,
    inlineSvg: DIAGRAMS.STATE_BOXES,
    content:
      '> **2.** Use particle theory to explain why solids and liquids cannot be compressed.\n\n' +
      'Look at the gaps between the particles in each box.',
    contentVn:
      '> **2.** Dùng lý thuyết hạt giải thích vì sao chất rắn và chất lỏng không thể bị nén.\n\n' +
      'Hãy nhìn khoảng trống giữa các hạt trong mỗi hộp.',
    notes: [
      keyWord(
        '**Compress:** to squash something into a smaller space.',
        '**Nén (compress):** ép một vật vào một chỗ nhỏ hơn.',
      ),
    ],
    check: {
      id: 'chk_compress',
      q: 'Question 2: why can a liquid not be compressed?',
      qVn: 'Câu 2: vì sao chất lỏng không thể bị nén?',
      options: [
        { val: 'A', text: 'Its particles are too hard to squash', textVn: 'Các hạt của nó quá cứng để ép' },
        { val: 'B', text: 'Its particles are already touching, so there is no space to push them into', textVn: 'Các hạt của nó đã chạm nhau, nên không còn chỗ trống để ép chúng vào' },
        { val: 'C', text: 'Its particles are held in a fixed pattern', textVn: 'Các hạt của nó bị giữ theo trật tự cố định' },
        { val: 'D', text: 'It has no attractive forces', textVn: 'Nó không có lực hút' },
      ],
      correct: 'B',
      expEn: 'In a liquid, as in a solid, the particles are **already touching**: there are no gaps to squash them into. A gas can be compressed because its particles are far apart. A is not the reason — the missing gaps are; C describes a solid, not a liquid; and a liquid does have attractive forces (D) — they keep its particles touching.',
      expVn: 'Trong chất lỏng, cũng như chất rắn, các hạt **đã chạm nhau**: không có khoảng trống nào để ép chúng vào. Chất khí nén được vì các hạt của nó ở xa nhau. A không phải lý do — lý do là không có khoảng trống; C mô tả chất rắn, không phải chất lỏng; và chất lỏng có lực hút (D) — lực đó giữ các hạt chạm nhau.',
    },
  },

  // 22 ─ Book questions 1–3 + CHECK (question 3) ────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 43 · Questions',
    eyebrowVn: 'Sách học sinh, trang 43 · Câu hỏi',
    title: 'Questions 1–3',
    titleVn: 'Câu hỏi 1–3',
    content:
      '> **1.** Explain why a solid expands when it is heated.\n' +
      '> **2.** Use particle theory to explain why solids and liquids cannot be compressed.\n' +
      '> **3.** Use particle theory to explain why liquids and gases can flow.\n\n' +
      'Answer 1 and 2 in your head, then check them. Question 3 is scored.',
    contentVn:
      '> **1.** Giải thích vì sao chất rắn giãn nở khi bị đun nóng.\n' +
      '> **2.** Dùng lý thuyết hạt giải thích vì sao chất rắn và chất lỏng không thể bị nén.\n' +
      '> **3.** Dùng lý thuyết hạt giải thích vì sao chất lỏng và chất khí có thể chảy.\n\n' +
      'Trả lời câu 1 và 2 trong đầu, rồi kiểm tra. Câu 3 được tính điểm.',
    reveal: {
      label: 'Check 1 and 2',
      labelVn: 'Kiểm tra câu 1 và 2',
      answer:
        '**1.** Heat energy is transferred to the particles. They vibrate more and take up more space, so the solid expands. The particles do not get bigger.\n' +
        '**2.** In solids and liquids the particles are already touching. There is no space to squash them into.',
      answerVn:
        '**1.** Nhiệt năng được truyền đến các hạt. Chúng rung động nhiều hơn và chiếm nhiều chỗ hơn, nên chất rắn giãn nở. Các hạt không to ra.\n' +
        '**2.** Trong chất rắn và chất lỏng, các hạt đã chạm nhau. Không có chỗ trống để ép chúng vào.',
    },
    check: {
      id: 'chk_flow',
      q: 'Question 3: why can liquids and gases flow, but solids cannot?',
      qVn: 'Câu 3: vì sao chất lỏng và chất khí chảy được, còn chất rắn thì không?',
      options: [
        { val: 'A', text: 'Liquid and gas particles are smaller than solid particles', textVn: 'Hạt chất lỏng và chất khí nhỏ hơn hạt chất rắn' },
        { val: 'B', text: 'Liquids and gases have no particles', textVn: 'Chất lỏng và chất khí không có hạt' },
        { val: 'C', text: 'Their particles are not held in a fixed pattern: they slide past each other or move freely', textVn: 'Các hạt của chúng không bị giữ theo trật tự cố định: chúng trượt qua nhau hoặc chuyển động tự do' },
        { val: 'D', text: 'Solids are too heavy to flow', textVn: 'Chất rắn quá nặng để chảy' },
      ],
      correct: 'C',
      expEn: 'A solid’s particles are held in a **fixed pattern**, so it keeps its shape. In a liquid they **slide past each other**; in a gas they **move freely**, far apart — so both can flow. Particles are the same size in every state (A), every substance is made of particles (B), and weight has nothing to do with it (D).',
      expVn: 'Các hạt của chất rắn bị giữ theo **trật tự cố định**, nên nó giữ được hình dạng. Trong chất lỏng chúng **trượt qua nhau**; trong chất khí chúng **chuyển động tự do**, ở xa nhau — nên cả hai đều chảy được. Các hạt có cùng kích thước ở mọi trạng thái (A), mọi chất đều được tạo nên từ các hạt (B), và khối lượng không liên quan (D).',
    },
  },

  // 23 ─ ORDER: ice to steam, particle by particle ───────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'The whole lesson in one journey',
    eyebrowVn: 'Cả bài học trong một hành trình',
    title: 'Ice to Steam, Particle by Particle',
    titleVn: 'Từ đá đến hơi nước, từng hạt một',
    label: 'Put it in order',
    labelVn: 'Sắp xếp thứ tự',
    labelIcon: 'Sparkles',
    text: 'An ice cube is heated in a pan until it has all turned to steam.',
    textVn: 'Một viên đá được đun trong nồi cho đến khi tất cả biến thành hơi nước.',
    sub: 'What do its particles do, from start to finish?',
    subVn: 'Các hạt của nó làm gì, từ đầu đến cuối?',
    activity: {
      id: 'act_order_ice_steam',
      type: 'order',
      prompt: 'Put what the particles do in order, from the cold ice to the steam.',
      promptVn: 'Sắp xếp những gì các hạt làm theo thứ tự, từ đá lạnh đến hơi nước.',
      steps: [
        { id: 'fixed', name: 'They vibrate on the spot in a fixed pattern.', nameVn: 'Chúng rung động tại chỗ theo trật tự cố định.' },
        { id: 'expand', name: 'They vibrate more and take up a little more space.', nameVn: 'Chúng rung động nhiều hơn và chiếm thêm một chút chỗ.' },
        { id: 'slide', name: 'The forces can no longer hold them: they slide past each other.', nameVn: 'Lực hút không còn giữ được chúng: chúng trượt qua nhau.' },
        { id: 'faster', name: 'They move faster and faster.', nameVn: 'Chúng chuyển động ngày càng nhanh.' },
        { id: 'escape', name: 'Particles all through the water overcome the forces and escape as a gas.', nameVn: 'Các hạt ở khắp trong nước vượt qua lực hút và thoát ra dưới dạng khí.' },
      ],
      explain: 'Ice (a fixed pattern) → the ice expands a little → it **melts** (the particles slide past each other) → the water warms (faster and faster) → it **boils** (particles all through it escape as steam). The same particles, the same size, all the way.',
      explainVn: 'Đá (trật tự cố định) → đá giãn nở một chút → đá **nóng chảy** (các hạt trượt qua nhau) → nước nóng lên (ngày càng nhanh) → nước **sôi** (các hạt ở khắp trong nước thoát ra thành hơi). Vẫn những hạt đó, cùng kích thước đó, suốt cả hành trình.',
    },
  },

  // 24 ─ Checklist + the exit question as a CHECK ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: 'Next: the Vocab, then **Explain It** — a new everyday scenario to explain every time you play.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Giải thích bằng hạt** — mỗi lần chơi là một tình huống đời thường mới để giải thích.',
    items: [
      { text: 'Explain why a solid **expands** when heated, and say what does **not** happen to its particles.', textVn: 'Giải thích vì sao chất rắn **giãn nở** khi bị đun nóng, và nói điều gì **không** xảy ra với các hạt của nó.' },
      { text: 'Explain **melting**, **evaporating** and **boiling** link by link.', textVn: 'Giải thích **nóng chảy**, **bay hơi** và **sôi** từng mắt xích một.' },
      { text: 'Explain **condensing** and **freezing** as the reverse: heat energy transferred **away**.', textVn: 'Giải thích **ngưng tụ** và **đông đặc** là quá trình ngược lại: nhiệt năng được truyền **ra khỏi** các hạt.' },
      { text: 'Explain why solids and liquids cannot be **compressed**, and why liquids and gases can **flow**.', textVn: 'Giải thích vì sao chất rắn và chất lỏng không thể bị **nén**, và vì sao chất lỏng và chất khí **chảy** được.' },
    ],
    check: {
      id: 'chk_exit_bridge',
      q: 'Exit question: a metal bridge is longer in summer than in winter. Which explanation would get full marks?',
      qVn: 'Câu hỏi cuối bài: một cây cầu kim loại dài hơn vào mùa hè so với mùa đông. Lời giải thích nào được điểm tối đa?',
      options: [
        { val: 'A', text: 'In summer more heat energy is transferred to the metal. Its particles vibrate more and take up more space, so the bridge expands.', textVn: 'Vào mùa hè, nhiều nhiệt năng hơn được truyền đến kim loại. Các hạt của nó rung động nhiều hơn và chiếm nhiều chỗ hơn, nên cây cầu giãn nở.' },
        { val: 'B', text: 'In summer the metal particles get bigger, so the bridge gets longer.', textVn: 'Vào mùa hè, các hạt kim loại to ra, nên cây cầu dài ra.' },
        { val: 'C', text: 'In winter cold energy goes into the metal and the particles stop moving.', textVn: 'Vào mùa đông, năng lượng lạnh đi vào kim loại và các hạt ngừng chuyển động.' },
        { val: 'D', text: 'In summer the metal starts to melt, so it stretches.', textVn: 'Vào mùa hè, kim loại bắt đầu nóng chảy, nên nó bị kéo dài ra.' },
      ],
      correct: 'A',
      expEn: 'A has every link: heat energy **transferred to** the particles, they **vibrate more**, they **take up more space**, the metal **expands**. B is the bigger-particles mistake; C has two — there is no cold energy, and particles never stop moving; and a bridge in summer is nowhere near melting (D).',
      expVn: 'A có đủ mọi mắt xích: nhiệt năng **được truyền đến** các hạt, chúng **rung động nhiều hơn**, chúng **chiếm nhiều chỗ hơn**, kim loại **giãn nở**. B là lỗi hạt to ra; C có hai lỗi — không có năng lượng lạnh, và các hạt không bao giờ ngừng chuyển động; còn cây cầu vào mùa hè còn rất xa mới nóng chảy (D).',
    },
  },
];

