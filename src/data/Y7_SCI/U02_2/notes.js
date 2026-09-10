// src/data/Y7_SCI/U02_2/notes.js
// 2.2 Changes of State — the self-study deck, rebuilt to the engagement plan
// (docs/y7-science/ENGAGEMENT-PLAN.md). 19 layout slides; 6 scored items —
// four interactive activities (order · estimate · hotspot · predict) and two
// checks — across five different activity/question types.
//
// The classroom deck opened with "draw the particles on paper"; this one
// opens with the water-cycle order activity. Every "on paper / in your
// notebook / copy this" instruction is gone — the "Which Change of State?"
// paper exercise moved into the Workbook as a match and a sort, and the
// "finish the sentences" cloze became the predict activity plus a Workbook
// dropdown. The safety note stays, and the apparatus slide keeps the deck's
// one "draw this". The StateModel widget is the one thing a still slide
// cannot do: run the change. Every photograph is credited in
// docs/credits.md. A slide's `check:` or `activity:` block is always the
// LAST key, and no slide carries both.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as MEASURE } from './diagramsB.js';
import { StateModel } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_2/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const RED = '#c8102e';
// Change words coloured by DIRECTION, matching the diagrams: heating changes
// are warm orange; cooling changes are cool blue.
const HEAT = '#c25e12';
const COOL = '#1a5fa8';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Repeat',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'Unit 2 · 2.2',
    eyebrowVn: 'Chương 2 · 2.2',
    title: 'Changes of State',
    titleVn: 'Sự chuyển thể',
    objective: 'Name the five changes of state as journeys from one state to another, tell evaporating from boiling, measure a volume and a temperature accurately, and explain why heated water stops getting hotter at 100 °C.',
    objectiveVn: 'Gọi tên năm sự chuyển thể như những hành trình từ trạng thái này sang trạng thái khác, phân biệt bay hơi với sôi, đo thể tích và nhiệt độ chính xác, và giải thích vì sao nước đun không nóng thêm khi đến 100 °C.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **order**, **guess**, **tap** and **predict** your way through it. Six things are scored — water’s journey on the next slide is the first.',
      textVn: 'Em sẽ **sắp xếp**, **đoán**, **chạm** và **dự đoán** trong suốt bài học. Sáu mục được tính điểm — hành trình của nước ở slide sau là mục đầu tiên.',
    },
  },

  // 2 ─ Starter: ORDER — water's journey ───────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Water’s journey',
    eyebrowVn: 'Hành trình của nước',
    title: 'Ice to Steam, and Back',
    titleVn: 'Từ đá đến hơi, và trở lại',
    label: 'Order it',
    labelVn: 'Sắp xếp',
    labelIcon: 'Sparkles',
    text: 'The same water can end up **ice**, **liquid** or **steam** — depending only on how much heat it has.',
    textVn: 'Cùng một lượng nước có thể trở thành **đá**, **chất lỏng** hoặc **hơi** — chỉ tùy vào lượng nhiệt nó có.',
    sub: 'Drag the five changes into the order they would happen as ice is heated all the way to steam, then cooled all the way back to ice.',
    subVn: 'Kéo năm sự chuyển thể vào đúng thứ tự khi đá được đun nóng cho tới thành hơi, rồi làm lạnh trở lại thành đá.',
    activity: {
      id: 'a1', type: 'order',
      prompt: 'Put water’s journey from ice to steam, and back again, in order.',
      promptVn: 'Sắp xếp hành trình của nước từ đá đến hơi, rồi trở lại, theo đúng thứ tự.',
      steps: [
        { id: 'melt', name: 'Melting — ice becomes water', nameVn: 'Nóng chảy — đá thành nước' },
        { id: 'evap', name: 'Evaporating — some of it slowly turns to vapour as it warms', nameVn: 'Bay hơi — một phần từ từ biến thành hơi khi nước ấm lên' },
        { id: 'boil', name: 'Boiling — heated hard, it rapidly turns to steam', nameVn: 'Sôi — bị đun mạnh, nhanh chóng biến thành hơi' },
        { id: 'cond', name: 'Condensing — the steam cools and turns back to water', nameVn: 'Ngưng tụ — hơi nguội đi và trở lại thành nước' },
        { id: 'freeze', name: 'Freezing — the water cools and turns back to ice', nameVn: 'Đông đặc — nước nguội đi và trở lại thành đá' },
      ],
      explain: 'Heating drives the first three changes — melting, evaporating, boiling. Cooling reverses the journey — condensing, then freezing — back to where it started.',
      explainVn: 'Đun nóng thúc đẩy ba sự thay đổi đầu — nóng chảy, bay hơi, sôi. Làm lạnh đảo ngược hành trình — ngưng tụ, rồi đông đặc — trở lại điểm xuất phát.',
    },
  },

  // 3 ─ The hook: the same water, three times ───────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think first — the next few slides explain it',
    eyebrowVn: 'Nghĩ trước — vài slide sau sẽ giải thích',
    title: 'The Same Water, Three Times',
    titleVn: 'Vẫn là nước đó, ba lần',
    image: img('melt.jpg'),
    caption: 'You leave an ice cube on the table. An hour later it is a small **puddle**. By lunchtime the puddle is **gone**. It was the same water the whole time. **Where did it go — twice?**',
    captionVn: 'Em để một viên đá trên bàn. Một giờ sau nó thành một **vũng nước** nhỏ. Đến trưa vũng nước **biến mất**. Suốt thời gian đó vẫn là cùng một lượng nước. **Nó đã đi đâu — hai lần?**',
  },

  // 4 ─ Heat in, heat out ───────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Last unit gave us the reason',
    eyebrowVn: 'Chương trước đã cho ta lý do',
    title: 'Heat In, Heat Out',
    titleVn: 'Nhận nhiệt, mất nhiệt',
    content:
      'Everything is made of **particles** — that was last unit. **Heating** gives the particles more energy, so they move more. **Cooling** takes energy away.\n\n' +
      'Put enough energy in, or take enough out, and the substance changes from one state to another. That is what happened to the ice. Every change of state is a journey **from** one state **to** another, and there are **five** words for those journeys.',
    contentVn:
      'Mọi thứ đều tạo nên từ các **hạt** — đó là chương trước. **Đun nóng** cho các hạt thêm năng lượng, nên chúng chuyển động nhiều hơn. **Làm lạnh** thì lấy bớt năng lượng đi.\n\n' +
      'Đưa đủ năng lượng vào, hoặc lấy đủ ra, thì chất sẽ chuyển từ trạng thái này sang trạng thái khác. Đó là điều đã xảy ra với viên đá. Mỗi sự chuyển thể là một hành trình **từ (from)** trạng thái này **sang (to)** trạng thái khác, và có **năm** từ cho những hành trình này.',
    notes: [
      {
        tone: 'write',
        text: '**Change of state:** when a substance changes from one state of matter to another — for example, solid to liquid. **Heating** and **cooling** cause changes of state.',
        textVn: '**Sự chuyển thể (change of state):** khi một chất chuyển từ trạng thái này sang trạng thái khác — ví dụ, từ rắn sang lỏng. **Đun nóng** và **làm lạnh** gây ra sự chuyển thể.',
      },
    ],
  },

  // 5 ─ Melting and freezing ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: HEAT,
    icon: 'Droplets',
    eyebrow: 'Changes 1 and 2 · solid ⇄ liquid',
    eyebrowVn: 'Chuyển thể 1 và 2 · rắn ⇄ lỏng',
    title: 'Melting — and Freezing, Backwards',
    titleVn: 'Nóng chảy — và đông đặc, đảo ngược',
    ratio: 45,
    image: img('melt.jpg'),
    content:
      'Leave ice in a warm place and it **melts** — it turns into liquid water. That is your puddle. The temperature at which a solid melts is its **melting point**. For ice it is **0 °C**.\n\n' +
      'Put liquid water in the freezer and it **freezes** — back to solid ice. Freezing is the exact **reverse** of melting: melting needs heat going **in**, freezing needs heat coming **out**.',
    contentVn:
      'Để đá ở nơi ấm thì nó **nóng chảy (melts)** — biến thành nước lỏng. Đó chính là vũng nước của em. Nhiệt độ mà một chất rắn nóng chảy gọi là **nhiệt độ nóng chảy (melting point)**. Với nước đá là **0 °C**.\n\n' +
      'Cho nước lỏng vào ngăn đá thì nó **đông đặc (freezes)** — trở lại thành nước đá rắn. Đông đặc là quá trình **ngược** của nóng chảy: nóng chảy cần nhiệt đi **vào**, đông đặc cần nhiệt đi **ra**.',
    notes: [
      {
        tone: 'write',
        text: '**Melt:** to change from a **solid** to a **liquid** (by heating). **Melting point:** the temperature at which a solid melts. Ice melts at 0 °C.\n**Freeze:** to change from a **liquid** to a **solid** (by cooling). Freezing is the reverse of melting.',
        textVn: '**Nóng chảy (melt):** chuyển từ **rắn** sang **lỏng** (do đun nóng). **Nhiệt độ nóng chảy (melting point):** nhiệt độ mà chất rắn nóng chảy. Nước đá nóng chảy ở 0 °C.\n**Đông đặc (freeze):** chuyển từ **lỏng** sang **rắn** (do làm lạnh). Đông đặc là quá trình ngược của nóng chảy.',
      },
    ],
  },

  // 6 ─ Evaporation ─────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: HEAT,
    icon: 'Wind',
    eyebrow: 'Change 3 · liquid → gas · slowly',
    eyebrowVn: 'Chuyển thể 3 · lỏng → khí · chậm',
    title: 'Where the Puddle Went',
    titleVn: 'Vũng nước đã đi đâu',
    content:
      'Water on the ground slowly disappears. It changes into **water vapour** — an **invisible** gas. This slow change is **evaporation**.\n\n' +
      'The warmer the water, the faster it evaporates. It left as a gas you cannot see — that is where the puddle went.',
    contentVn:
      'Nước trên mặt đất từ từ biến mất. Nó chuyển thành **hơi nước (water vapour)** — một chất khí **vô hình**. Sự thay đổi chậm này gọi là **sự bay hơi (evaporation)**.\n\n' +
      'Nước càng ấm thì bay hơi càng nhanh. Nó rời đi dưới dạng một chất khí mà em không nhìn thấy — vũng nước đã đi đâu là ở đó.',
    notes: [
      {
        tone: 'write',
        text: '**Evaporate:** to change from a **liquid** to a **gas**, slowly, from the surface. The gas is **water vapour** — you cannot see it. This slow change is **evaporation**.',
        textVn: '**Bay hơi (evaporate):** chuyển từ **lỏng** sang **khí**, một cách chậm rãi, ở bề mặt. Chất khí đó là **hơi nước (water vapour)** — em không nhìn thấy. Sự thay đổi chậm này là **sự bay hơi (evaporation)**.',
      },
    ],
  },

  // 7 ─ Boiling + CHECK 1 ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: HEAT,
    icon: 'Flame',
    eyebrow: 'Change 4 · liquid → gas · fast',
    eyebrowVn: 'Chuyển thể 4 · lỏng → khí · nhanh',
    title: 'Boiling',
    titleVn: 'Sự sôi',
    ratio: 45,
    image: img('boil.jpg'),
    content:
      'Heat water to **100 °C** and it **boils**: bubbles of gas form all through it and it changes rapidly to **steam**. Steam is water that has been heated until it turns into a gas.\n\n' +
      '100 °C is the **boiling point** of water. Look at the kettle — bubbling liquid below, gas escaping above.',
    contentVn:
      'Đun nước đến **100 °C** thì nó **sôi (boils)**: các bọt khí hình thành khắp trong lòng nước và nó nhanh chóng chuyển thành **hơi (steam)**. Hơi là nước đã được đun nóng đến mức biến thành khí.\n\n' +
      '100 °C là **nhiệt độ sôi (boiling point)** của nước. Hãy nhìn ấm nước — chất lỏng sủi bọt ở dưới, khí thoát ra ở trên.',
    notes: [
      {
        tone: 'write',
        text: '**Boil:** to change from a **liquid** to a **gas** quickly, all through the liquid. Water boils at its **boiling point**, 100 °C. The gas is **steam**.',
        textVn: '**Sôi (boil):** chuyển từ **lỏng** sang **khí** một cách nhanh chóng, khắp trong lòng chất lỏng. Nước sôi ở **nhiệt độ sôi (boiling point)** là 100 °C. Chất khí đó là **hơi nước (steam)**.',
      },
    ],
    check: {
      id: 'c1',
      q: 'What are the melting point and the boiling point of water?',
      qVn: 'Nhiệt độ nóng chảy và nhiệt độ sôi của nước là bao nhiêu?',
      options: [
        { val: 'A', text: 'Melts at 100 °C, boils at 0 °C', textVn: 'Nóng chảy ở 100 °C, sôi ở 0 °C' },
        { val: 'B', text: 'Melts at 0 °C, boils at 100 °C', textVn: 'Nóng chảy ở 0 °C, sôi ở 100 °C' },
        { val: 'C', text: 'Melts at 0 °C, boils at 50 °C', textVn: 'Nóng chảy ở 0 °C, sôi ở 50 °C' },
      ],
      correct: 'B',
      expEn: 'Ice melts at **0 °C** and water boils at **100 °C**. A has them backwards — heat goes in to melt and in again to boil, so the boiling point is the higher one.',
      expVn: 'Nước đá nóng chảy ở **0 °C** và nước sôi ở **100 °C**. A đảo ngược — nhiệt đi vào để nóng chảy và vào thêm để sôi, nên nhiệt độ sôi là số cao hơn.',
    },
  },

  // 8 ─ Evaporating or boiling? + CHECK 2 ───────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'Two words, one journey — liquid to gas',
    eyebrowVn: 'Hai từ, một hành trình — lỏng sang khí',
    title: 'Evaporating or Boiling?',
    titleVn: 'Bay hơi hay sôi?',
    columns: [
      {
        heading: 'Evaporating',
        headingVn: 'Bay hơi',
        accent: HEAT,
        icon: 'Wind',
        content:
          '**Slow.** Happens at **any** temperature.\n\nOnly at the **surface** of the liquid.\n\nNo bubbles. A puddle drying, wet clothes on a line, the sea feeding the clouds.',
        contentVn:
          '**Chậm.** Xảy ra ở **bất kỳ** nhiệt độ nào.\n\nChỉ ở **bề mặt** chất lỏng.\n\nKhông có bọt. Vũng nước khô đi, quần áo ướt phơi trên dây, biển cung cấp hơi cho mây.',
      },
      {
        heading: 'Boiling',
        headingVn: 'Sôi',
        accent: RED,
        icon: 'Flame',
        content:
          '**Fast.** Happens only at the **boiling point** (100 °C for water).\n\n**All through** the liquid, not just the top.\n\nBubbles everywhere. A kettle, a pot on the stove.',
        contentVn:
          '**Nhanh.** Chỉ xảy ra ở **nhiệt độ sôi** (100 °C với nước).\n\n**Khắp trong lòng** chất lỏng, không chỉ ở mặt trên.\n\nBọt khắp nơi. Một ấm nước, một nồi trên bếp.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Wet clothes dry on a washing line on a warm day. Which change of state is this?',
      qVn: 'Quần áo ướt khô trên dây phơi vào một ngày ấm. Đây là sự chuyển thể nào?',
      options: [
        { val: 'A', text: 'Boiling — the water turns to gas', textVn: 'Sôi — nước biến thành khí' },
        { val: 'B', text: 'Evaporation — the water slowly turns to water vapour from the surface', textVn: 'Bay hơi — nước từ từ biến thành hơi nước ở bề mặt' },
        { val: 'C', text: 'Condensation — the water turns to liquid', textVn: 'Ngưng tụ — nước biến thành lỏng' },
      ],
      correct: 'B',
      expEn: 'The water leaves slowly, from the surface, at an ordinary temperature with no bubbles — that is **evaporation**. Boiling needs 100 °C; condensation goes the other way, gas to liquid.',
      expVn: 'Nước rời đi chậm, từ bề mặt, ở nhiệt độ bình thường không có bọt — đó là **bay hơi**. Sôi cần 100 °C; ngưng tụ đi theo chiều ngược lại, khí sang lỏng.',
    },
  },

  // 9 ─ Condensation ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: COOL,
    icon: 'CloudFog',
    eyebrow: 'Change 5 · gas → liquid · by cooling',
    eyebrowVn: 'Chuyển thể 5 · khí → lỏng · do làm lạnh',
    title: 'Condensation',
    titleVn: 'Sự ngưng tụ',
    ratio: 45,
    side: 'left',
    image: img('condense.jpg'),
    content:
      'When water vapour or steam touches something **cold**, it **condenses** — it turns back into liquid water, in tiny drops. This is **condensation**.\n\n' +
      'You have seen it a hundred times: a cold drink that "sweats", the bathroom mirror after a shower, the window on a cold morning.',
    contentVn:
      'Khi hơi nước hoặc hơi chạm vào vật gì đó **lạnh**, nó **ngưng tụ (condenses)** — biến trở lại thành nước lỏng, thành những giọt nhỏ. Đây là **sự ngưng tụ (condensation)**.\n\n' +
      'Em đã thấy điều này cả trăm lần: một ly nước lạnh "đổ mồ hôi", tấm gương phòng tắm sau khi tắm, cửa sổ vào một buổi sáng lạnh.',
    notes: [
      {
        tone: 'write',
        text: '**Condense:** to change from a **gas** back to a **liquid** (by cooling). When water vapour touches something cold it condenses into drops. This change is **condensation**.',
        textVn: '**Ngưng tụ (condense):** chuyển từ **khí** trở lại thành **lỏng** (do làm lạnh). Khi hơi nước chạm vào vật lạnh, nó ngưng tụ thành các giọt. Sự thay đổi này là **sự ngưng tụ (condensation)**.',
      },
    ],
  },

  // 10 ─ ESTIMATE — how warm is a warm bath? ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Thermometer',
    eyebrow: 'Guess the temperature',
    eyebrowVn: 'Đoán nhiệt độ',
    title: 'How Warm Is a Warm Bath?',
    titleVn: 'Bồn tắm ấm nóng bao nhiêu?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Sparkles',
    text: 'You now know water **freezes at 0 °C** and **boils at 100 °C** — two fixed points on the scale.',
    textVn: 'Em vừa biết nước **đông đặc ở 0 °C** và **sôi ở 100 °C** — hai mốc cố định trên thang nhiệt độ.',
    sub: 'Where does a warm bath sit between them? Slide to your guess.',
    subVn: 'Bồn tắm ấm nằm ở đâu giữa hai mốc đó? Kéo thanh trượt đến dự đoán của em.',
    activity: {
      id: 'a2', type: 'estimate',
      prompt: 'A warm bath is about how many °C?',
      promptVn: 'Một bồn tắm ấm có nhiệt độ khoảng bao nhiêu °C?',
      min: 0, max: 100, step: 1, unit: '°C', answer: 40, tolerance: 0.25,
      explain: 'About **40 °C** — much warmer than a warm room (around 20 °C), but nowhere near boiling (100 °C). Hot enough to feel warm on skin, cool enough not to burn.',
      explainVn: 'Khoảng **40 °C** — ấm hơn nhiều so với phòng ấm (khoảng 20 °C), nhưng còn cách xa điểm sôi (100 °C). Đủ nóng để cảm thấy ấm trên da, đủ mát để không bị bỏng.',
    },
  },

  // 11 ─ The whole section on one diagram (verb/noun folded in) ────────────
  {
    layout: 'split',
    accent: HEAT,
    icon: 'Repeat',
    eyebrow: 'The reference diagram',
    eyebrowVn: 'Sơ đồ tham khảo',
    title: 'The Whole Section on One Diagram',
    titleVn: 'Cả bài gọn trong một sơ đồ',
    ratio: 40,
    inlineSvg: DIAGRAMS.STATE_CYCLE,
    content:
      'Every arrow on this diagram is one of the five words you now know. Heating drives the changes to the **right**; cooling brings them back to the **left**.\n\n' +
      'English gives every change **two** words: a **doing word** (*the ice melts*) and a **naming word** (*melting is a change of state*). You **boil** the water; **boiling** is the change. Say the pair, not just one half.',
    contentVn:
      'Mỗi mũi tên trên sơ đồ này là một trong năm từ em vừa học. Đun nóng đẩy các thay đổi sang **phải**; làm lạnh đưa chúng về **trái**.\n\n' +
      'Tiếng Anh cho mỗi sự chuyển thể **hai** từ: một **động từ** (*the ice melts*) và một **danh từ** (*melting is a change of state*). Em **boil** nước; **boiling** là sự thay đổi. Hãy nói cả cặp, đừng chỉ một nửa.',
    notes: [
      {
        tone: 'write',
        text: 'The five pairs, doing word → naming word: **melt → melting**, **freeze → freezing**, **boil → boiling**, **evaporate → evaporation**, **condense → condensation**.',
        textVn: 'Năm cặp, động từ → danh từ: **melt → melting** (nóng chảy), **freeze → freezing** (đông đặc), **boil → boiling** (sôi), **evaporate → evaporation** (bay hơi), **condense → condensation** (ngưng tụ).',
      },
    ],
  },

  // 12 ─ The particle model (widget) ────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Thermometer',
    eyebrow: 'A model you can run — heat it, cool it, watch the particles',
    eyebrowVn: 'Một mô hình em có thể chạy — đun nóng, làm lạnh, xem các hạt',
    title: 'Heating and Cooling, Live',
    titleVn: 'Đun nóng và làm lạnh, trực tiếp',
    ratio: 35,
    content:
      'Every change of state, in one moving picture. Press **Heat** and watch the ice melt, then boil. Press **Cool** and watch the steam condense and the water freeze. The particles beside the beaker show **why**.\n\n' +
      'Then swap water for **oxygen** or **iron** and see the whole picture slide along the temperature axis — the melting and boiling points belong to the substance.',
    contentVn:
      'Mọi sự chuyển thể, trong một hình chuyển động. Bấm **Heat** và xem đá nóng chảy, rồi sôi. Bấm **Cool** và xem hơi ngưng tụ và nước đông đặc. Các hạt bên cạnh cốc cho thấy **vì sao**.\n\n' +
      'Rồi đổi nước thành **oxy** hoặc **sắt** và xem cả bức tranh trượt dọc trục nhiệt độ — nhiệt độ nóng chảy và nhiệt độ sôi thuộc về từng chất.',
    widget: StateModel,
  },

  // 13 ─ Reading a measuring cylinder: HOTSPOT ──────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Two students measure the same water: one writes 50, the other 47. Who is wrong?',
    eyebrowVn: 'Hai học sinh đo cùng một lượng nước: một bạn viết 50, bạn kia 47. Ai sai?',
    title: 'Reading a Measuring Cylinder',
    titleVn: 'Đọc một ống đong',
    ratio: 52,
    side: 'left',
    inlineSvg: MEASURE.MENISCUS,
    content:
      'You measure the **volume** of a liquid with a **measuring cylinder**. The surface of the liquid curves up at the edges — that curve is the **meniscus**.\n\n' +
      'Read from the **bottom** of the curve, with your **eye level** with it. Look from above and you read too high; from below, too low. Tap the diagram to try it.',
    contentVn:
      'Em đo **thể tích (volume)** của chất lỏng bằng một **ống đong (measuring cylinder)**. Mặt chất lỏng cong lên ở mép — đường cong đó là **mặt khum (meniscus)**.\n\n' +
      'Đọc ở **đáy** của đường cong, với **mắt ngang tầm (eye level)** với nó. Nhìn từ trên xuống thì đọc quá cao; nhìn từ dưới lên thì quá thấp. Chạm vào hình để thử.',
    notes: [
      {
        tone: 'write',
        text: '**Measuring cylinder:** the tool used to measure the volume of a liquid.\n**Meniscus:** the curved surface of the liquid. Read the **bottom** of it, with your **eye level**.',
        textVn: '**Ống đong (measuring cylinder):** dụng cụ để đo thể tích chất lỏng.\n**Mặt khum (meniscus):** mặt cong của chất lỏng. Đọc ở **đáy** của nó, với **mắt ngang tầm**.',
      },
    ],
    activity: {
      id: 'a3', type: 'hotspot',
      prompt: 'Tap where you read the volume — the bottom of the meniscus.',
      promptVn: 'Chạm vào nơi em đọc thể tích — đáy mặt khum.',
      svg: MEASURE.MENISCUS, viewBox: '0 0 760 430',
      targets: [
        // The curve runs (152,216) → (258,216) with its lowest point at the
        // cylinder's centre line (205, ~220); the decoy is the edge where the
        // liquid meets the glass.
        { id: 'bottom', x: 205, y: 221, r: 28, name: 'the bottom of the meniscus', nameVn: 'đáy mặt khum' },
        { id: 'top', x: 256, y: 214, r: 15, name: 'the edge of the curve', nameVn: 'mép của đường cong' },
        { id: 'eye', x: 620, y: 223, r: 30, name: 'your eye', nameVn: 'mắt em' },
      ],
      correct: 'bottom',
      explain: 'You read the **bottom of the meniscus**, at eye level. Reading from the top of the curve — or looking down on it from above — gives the wrong number.',
      explainVn: 'Em đọc ở **đáy mặt khum**, ngang tầm mắt. Đọc ở đỉnh đường cong — hoặc nhìn từ trên xuống — sẽ cho ra con số sai.',
    },
  },

  // 14 ─ Reading a thermometer ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Learner’s Book, page 37 · Measuring temperature',
    eyebrowVn: 'Sách học sinh, trang 37 · Đo nhiệt độ',
    title: 'Reading a Thermometer',
    titleVn: 'Đọc một nhiệt kế',
    ratio: 52,
    side: 'left',
    inlineSvg: MEASURE.THERMOMETER,
    content:
      'You measure **temperature** with a **thermometer**. The liquid inside **expands** — gets bigger — as it gets hotter, so it rises up the tube.\n\n' +
      'Read the scale at the **top of the liquid**, with your **eye level** with it — the same rule as the cylinder.',
    contentVn:
      'Em đo **nhiệt độ (temperature)** bằng một **nhiệt kế (thermometer)**. Chất lỏng bên trong **giãn nở (expands)** — to ra — khi nóng lên, nên nó dâng lên trong ống.\n\n' +
      'Đọc thang đo ở **đỉnh của cột chất lỏng**, với **mắt ngang tầm** với nó — cùng quy tắc như ống đong.',
    notes: [
      {
        tone: 'write',
        text: '**Thermometer:** the tool used to measure temperature. The liquid inside **expands** and rises as it gets hotter. Read the **top of the liquid**, at **eye level**.',
        textVn: '**Nhiệt kế (thermometer):** dụng cụ để đo nhiệt độ. Chất lỏng bên trong **giãn nở** và dâng lên khi nóng hơn. Đọc ở **đỉnh cột chất lỏng**, **ngang tầm mắt**.',
      },
    ],
    reveal: {
      label: 'This thermometer reads',
      labelVn: 'Nhiệt kế này chỉ',
      answer: '**22 °C** — always at the top of the liquid, always with the units.',
      answerVn: '**22 °C** — luôn đọc ở đỉnh cột chất lỏng, luôn kèm đơn vị.',
    },
  },

  // 15 ─ The apparatus (the one draw-this) ──────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Learner’s Book, page 39 · The set-up',
    eyebrowVn: 'Sách học sinh, trang 39 · Bộ dụng cụ',
    title: 'The Apparatus',
    titleVn: 'Bộ dụng cụ',
    ratio: 45,
    side: 'left',
    inlineSvg: MEASURE.APPARATUS,
    drawThis: true,
    content: 'The one thing that matters: the thermometer bulb sits **in** the water, not touching the bottom of the beaker — so it measures the water, not the glass. Draw the whole set-up and label every part.',
    contentVn: 'Điều quan trọng nhất: bầu nhiệt kế nằm **trong** nước, không chạm đáy cốc — để nó đo nhiệt độ của nước, chứ không phải của thủy tinh. Vẽ toàn bộ bộ dụng cụ và ghi nhãn từng bộ phận.',
    notes: [
      {
        tone: 'homework',
        badge: 'Safety',
        badgeVn: 'An toàn',
        icon: 'AlertTriangle',
        text: 'Hot water burns. Wear **safety spectacles**. **Stand up** while you work, so spilled hot water falls away from you. **Take care** with the hot beaker and the Bunsen flame.',
        textVn: 'Nước nóng gây bỏng. Đeo **kính bảo hộ**. **Đứng lên** khi làm, để nước nóng nếu đổ thì rơi ra xa người em. **Cẩn thận** với cốc nóng và ngọn lửa đèn Bunsen.',
      },
    ],
  },

  // 16 ─ The method ─────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Learner’s Book, page 39 · The method',
    eyebrowVn: 'Sách học sinh, trang 39 · Cách tiến hành',
    title: 'What to Do',
    titleVn: 'Các bước tiến hành',
    inlineSvg: MEASURE.RESULTS_TABLE,
    content: 'Follow the method below, then read what the graph shows on the next slide.',
    contentVn: 'Làm theo các bước dưới đây, rồi xem đồ thị cho thấy điều gì ở slide sau.',
    steps: [
      { text: 'Measure **150 cm³** of water accurately into the beaker.', textVn: 'Đong chính xác **150 cm³** nước vào cốc.' },
      { text: 'Put the thermometer bulb **in the water**, held so it does **not touch the bottom**.', textVn: 'Đặt bầu nhiệt kế **trong nước**, giữ sao cho nó **không chạm đáy**.' },
      { text: 'Read the temperature and **record it** in the results table at 0 minutes.', textVn: 'Đọc nhiệt độ và **ghi vào bảng** ở phút 0.' },
      { text: 'Light the Bunsen and heat the water. Read the temperature **every minute**.', textVn: 'Châm đèn Bunsen và đun nước. Đọc nhiệt độ **mỗi phút**.' },
      { text: 'Keep going until the water is **boiling** hard.', textVn: 'Tiếp tục cho đến khi nước **sôi** mạnh.' },
    ],
  },

  // 17 ─ PREDICT — what happens next? (before the heating curve) ───────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'What Happens Next?',
    titleVn: 'Điều gì xảy ra tiếp theo?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'You keep heating the water. It reaches **100 °C** and starts boiling hard — bubbles everywhere, the Bunsen still roaring underneath.',
    textVn: 'Em tiếp tục đun nước. Nó đạt **100 °C** và bắt đầu sôi mạnh — bọt khí khắp nơi, đèn Bunsen vẫn cháy dữ dội bên dưới.',
    sub: 'What happens to the temperature now?',
    subVn: 'Bây giờ điều gì xảy ra với nhiệt độ?',
    activity: {
      id: 'a4', type: 'predict',
      prompt: 'The Bunsen is still on and the water is boiling hard. What does the temperature do?',
      promptVn: 'Đèn Bunsen vẫn cháy và nước đang sôi mạnh. Điều gì xảy ra với nhiệt độ?',
      options: [
        { val: 'rise', name: 'Keeps rising past 100 °C', nameVn: 'Tiếp tục tăng vượt quá 100 °C' },
        { val: 'same', name: 'Stays the same, at 100 °C', nameVn: 'Giữ nguyên, ở 100 °C' },
        { val: 'fall', name: 'Starts to fall', nameVn: 'Bắt đầu giảm' },
      ],
      correct: 'same',
      explain: 'While water boils, its temperature **stays at 100 °C** — the heat is turning liquid into gas, not making the water hotter. That is the flat part of the graph on the next slide.',
      explainVn: 'Trong khi nước sôi, nhiệt độ **giữ nguyên ở 100 °C** — nhiệt đang biến chất lỏng thành khí, không làm nước nóng hơn. Đó là phần nằm ngang của đồ thị ở slide sau.',
    },
  },

  // 18 ─ It stops at the boiling point ───────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'The answer to your prediction',
    eyebrowVn: 'Đáp án cho dự đoán của em',
    title: 'It Stops at the Boiling Point',
    titleVn: 'Nó dừng lại ở nhiệt độ sôi',
    ratio: 56,
    side: 'left',
    inlineSvg: MEASURE.HEATING_CURVE,
    content:
      'A graph shows the numbers as a picture. **Time** goes along the **horizontal axis** (across); **temperature** goes up the **vertical axis**.\n\n' +
      'At first the temperature climbs steadily — about the same amount each minute. Then it reaches **100 °C**, the **boiling point** of water, and it **stops rising**, even though the Bunsen is still on. The heat is now being used to turn the liquid into gas, not to make it hotter. That is why the line goes flat.',
    contentVn:
      'Đồ thị cho thấy các con số dưới dạng hình ảnh. **Thời gian** nằm trên **trục ngang (horizontal axis)**; **nhiệt độ** nằm trên **trục dọc (vertical axis)**.\n\n' +
      'Lúc đầu nhiệt độ tăng đều — mỗi phút tăng khoảng như nhau. Rồi nó đạt **100 °C**, **nhiệt độ sôi** của nước, và nó **ngừng tăng**, dù đèn Bunsen vẫn đang cháy. Bây giờ nhiệt được dùng để biến chất lỏng thành khí, chứ không phải để làm nó nóng hơn. Đó là lý do đường đồ thị đi ngang.',
    notes: [
      {
        tone: 'write',
        text: '**Axis:** a line on a graph. **Time** goes on the **horizontal** axis; **temperature** on the **vertical** axis.\nWhile water **boils**, its temperature **stays the same** at the boiling point (100 °C). The heat changes the liquid into gas instead of raising the temperature.',
        textVn: '**Trục (axis):** một đường trên đồ thị. **Thời gian** nằm trên **trục ngang**; **nhiệt độ** trên **trục dọc**.\nTrong khi nước **sôi**, nhiệt độ của nó **giữ nguyên** ở nhiệt độ sôi (100 °C). Nhiệt biến chất lỏng thành khí thay vì làm tăng nhiệt độ.',
      },
    ],
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
      'Next: the Vocab, then **Label It** — you will tap every part of the cycle diagram and the apparatus yourself.\n\n' +
      'Exit question: the bathroom mirror goes **foggy** when you shower, then slowly **clears** again. Name the **two** changes of state, in order.',
    contentVn:
      'Tiếp theo: Từ vựng, rồi **Gắn nhãn** — em sẽ tự chạm vào từng bộ phận của sơ đồ vòng và bộ dụng cụ.\n\n' +
      'Câu hỏi ra về: tấm gương phòng tắm bị **mờ hơi nước** khi em tắm, rồi từ từ **trong trở lại**. Hãy gọi tên **hai** sự chuyển thể, theo thứ tự.',
    items: [
      { text: 'Name the **five changes of state**, each as **from [state] to [state]**.', textVn: 'Kể tên **năm sự chuyển thể**, mỗi cái dưới dạng **from [trạng thái] to [trạng thái]**.' },
      { text: 'Give the **doing word** and the **naming word** for each.', textVn: 'Nêu **động từ** và **danh từ** cho mỗi sự thay đổi.' },
      { text: 'Explain the difference between **evaporating** and **boiling**.', textVn: 'Giải thích sự khác nhau giữa **bay hơi** và **sôi**.' },
      { text: 'Give the **melting point** and **boiling point** of water.', textVn: 'Nêu **nhiệt độ nóng chảy** và **nhiệt độ sôi** của nước.' },
      { text: 'Read a **measuring cylinder** and a **thermometer** accurately.', textVn: 'Đọc **ống đong** và **nhiệt kế** một cách chính xác.' },
      { text: 'Explain why the temperature **stops rising** when water boils.', textVn: 'Giải thích vì sao nhiệt độ **ngừng tăng** khi nước sôi.' },
    ],
  },
];
