// src/data/Y7_SCI/U02_2/notes.js
// 2.2 Changes of State — a self-study reduction of TWO classroom decks
// (C:\Users\bowen\lessons, content/y7-science/U02_2a and U02_2b) plus the
// classroom's interactive particle model (U02_model_states): the five change
// words and the English that carries them, then measuring volume and
// temperature and the heating-water investigation. 20 layout slides, 5 checks.
//
// Reduced from 36 classroom slides. The pairs card game becomes a reveal; the
// verb/noun pairs fold into the cycle diagram; the two reading-scale questions
// fold into the slides that teach the scale; the practical is kept as a method
// to learn and a result to explain, because the graph — the temperature stops
// climbing at the boiling point — is the payoff of the whole unit. The
// StateModel widget is the one thing a still slide cannot do: run the change.
// Every photograph is credited in docs/credits.md. The `check:` block is
// always the LAST key.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as MEASURE } from './diagramsB.js';
import { StateModel } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_2/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const RED = '#c8102e';
// Change words coloured by DIRECTION, matching the diagrams: heating changes
// are warm orange; cooling changes are cool blue.
const HEAT = '#c25e12';
const COOL = '#1a5fa8';

export const notes = [
  // 1 ─ Hero + starter ──────────────────────────────────────────────────────
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
      icon: 'Pencil',
      badge: 'Starter · 3 minutes',
      badgeVn: 'Khởi động · 3 phút',
      text: 'On one line in your notebook, draw the **particles** of a **solid**, a **liquid** and a **gas** — the three pictures from last unit. From memory.',
      textVn: 'Trên một dòng trong vở, hãy vẽ các **hạt** của một **chất rắn**, một **chất lỏng** và một **chất khí** — ba hình của chương trước. Vẽ từ trí nhớ.',
    },
  },

  // 2 ─ The hook: the same water, three times ───────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think first — write an answer before you go on',
    eyebrowVn: 'Nghĩ trước — viết câu trả lời trước khi tiếp tục',
    title: 'The Same Water, Three Times',
    titleVn: 'Vẫn là nước đó, ba lần',
    image: img('melt.jpg'),
    caption: 'You leave an ice cube on the table. An hour later it is a small **puddle**. By lunchtime the puddle is **gone**. It was the same water the whole time. **Where did it go — twice?**',
    captionVn: 'Em để một viên đá trên bàn. Một giờ sau nó thành một **vũng nước** nhỏ. Đến trưa vũng nước **biến mất**. Suốt thời gian đó vẫn là cùng một lượng nước. **Nó đã đi đâu — hai lần?**',
  },

  // 3 ─ Heat in, heat out + CHECK 1 ─────────────────────────────────────────
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
    check: {
      id: 'c1',
      q: 'What causes a substance to change from one state to another?',
      qVn: 'Điều gì khiến một chất chuyển từ trạng thái này sang trạng thái khác?',
      options: [
        { val: 'A', text: 'Heating it or cooling it', textVn: 'Đun nóng hoặc làm lạnh nó' },
        { val: 'B', text: 'Pouring it into a different container', textVn: 'Rót nó vào một vật chứa khác' },
        { val: 'C', text: 'Stirring it', textVn: 'Khuấy nó' },
      ],
      correct: 'A',
      expEn: 'Heating puts energy **into** the particles and cooling takes it **out**; enough of either changes the state. A new container only changes a liquid’s shape, and stirring changes nothing.',
      expVn: 'Đun nóng đưa năng lượng **vào** các hạt và làm lạnh lấy nó **ra**; đủ một trong hai sẽ đổi trạng thái. Vật chứa mới chỉ đổi hình dạng chất lỏng, còn khuấy thì không đổi gì.',
    },
  },

  // 4 ─ Melting and freezing ────────────────────────────────────────────────
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

  // 5 ─ Evaporation ─────────────────────────────────────────────────────────
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

  // 6 ─ Boiling + CHECK 2 ───────────────────────────────────────────────────
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
      id: 'c2',
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

  // 7 ─ Evaporating or boiling? + CHECK 3 ───────────────────────────────────
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
      id: 'c3',
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

  // 8 ─ Condensation ────────────────────────────────────────────────────────
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

  // 9 ─ The whole section on one diagram (draw this; verb/noun folded in) ───
  {
    layout: 'split',
    accent: HEAT,
    icon: 'Repeat',
    eyebrow: 'Rulers out — this is the sheet you keep',
    eyebrowVn: 'Lấy thước ra — đây là bảng em giữ lại',
    title: 'The Whole Section on One Diagram',
    titleVn: 'Cả bài gọn trong một sơ đồ',
    ratio: 40,
    inlineSvg: DIAGRAMS.STATE_CYCLE,
    drawThis: true,
    content:
      'Rule up the three boxes and copy all five change words onto the arrows. Heating drives the changes to the right, cooling brings them back to the left.\n\n' +
      'English gives every change **two** words: a **doing word** (*the ice melts*) and a **naming word** (*melting is a change of state*). You **boil** the water; **boiling** is the change. Say the pair, not just one half.',
    contentVn:
      'Kẻ ba ô và chép cả năm từ chuyển thể lên các mũi tên. Đun nóng đẩy các thay đổi sang phải, làm lạnh đưa chúng về trái.\n\n' +
      'Tiếng Anh cho mỗi sự chuyển thể **hai** từ: một **động từ** (*the ice melts*) và một **danh từ** (*melting is a change of state*). Em **boil** nước; **boiling** là sự thay đổi. Hãy nói cả cặp, đừng chỉ một nửa.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the five pairs: **melt → melting**, **freeze → freezing**, **boil → boiling**, **evaporate → evaporation**, **condense → condensation**.',
        textVn: 'Chép năm cặp: **melt → melting** (nóng chảy), **freeze → freezing** (đông đặc), **boil → boiling** (sôi), **evaporate → evaporation** (bay hơi), **condense → condensation** (ngưng tụ).',
      },
    ],
  },

  // 10 ─ The particle model (widget) ────────────────────────────────────────
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

  // 11 ─ Which change of state? (from … to …) ───────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Learner’s Book, page 36 · Activity 2.2.1',
    eyebrowVn: 'Sách học sinh, trang 36 · Hoạt động 2.2.1',
    title: 'Which Change of State?',
    titleVn: 'Đây là sự chuyển thể nào?',
    ratio: 56,
    content:
      'On paper, write each change as **from** [state] **to** [state]: *melt, freeze, boil, evaporate, condense*.\n\n' +
      'Then name the change in each of these, in a full sentence — *“This is …”*:\n\n' +
      '> **1.** Drops of water appear on the outside of a cold bottle.\n' +
      '> **2.** A puddle turns to ice overnight.\n' +
      '> **3.** A chocolate bar goes soft and runny in your hand.',
    contentVn:
      'Viết ra giấy mỗi sự thay đổi dưới dạng **from (từ)** [trạng thái] **to (sang)** [trạng thái]: *melt, freeze, boil, evaporate, condense*.\n\n' +
      'Rồi gọi tên sự thay đổi trong mỗi tình huống sau, bằng một câu đầy đủ — *“This is …”*:\n\n' +
      '> **1.** Các giọt nước xuất hiện ở mặt ngoài một chai lạnh.\n' +
      '> **2.** Một vũng nước đóng thành băng qua đêm.\n' +
      '> **3.** Một thanh sô-cô-la mềm ra và chảy trong tay em.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer:
        '**melt** — from solid to liquid · **freeze** — from liquid to solid · **boil** — from liquid to gas · **evaporate** — from liquid to gas · **condense** — from gas to liquid\n\n' +
        '**1.** Condensation — water vapour in the air cools on the cold bottle and turns to liquid.\n**2.** Freezing — the water changes from a liquid to a solid.\n**3.** Melting — the chocolate changes from a solid to a liquid.',
      answerVn:
        '**melt** — từ rắn sang lỏng · **freeze** — từ lỏng sang rắn · **boil** — từ lỏng sang khí · **evaporate** — từ lỏng sang khí · **condense** — từ khí sang lỏng\n\n' +
        '**1.** Ngưng tụ — hơi nước trong không khí gặp lạnh trên chai và biến thành lỏng.\n**2.** Đông đặc — nước chuyển từ lỏng sang rắn.\n**3.** Nóng chảy — sô-cô-la chuyển từ rắn sang lỏng.',
    },
  },

  // 12 ─ Reading a measuring cylinder ───────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Beaker',
    eyebrow: 'Two students measure the same water: one writes 50, the other 47. Who is wrong?',
    eyebrowVn: 'Hai học sinh đo cùng một lượng nước: một bạn viết 50, bạn kia 47. Ai sai?',
    title: 'Reading a Measuring Cylinder',
    titleVn: 'Đọc một ống đong',
    ratio: 52,
    side: 'left',
    inlineSvg: MEASURE.MENISCUS,
    content:
      'You measure the **volume** of a liquid with a **measuring cylinder**. The surface of the liquid curves up at the edges — that curve is the **meniscus**.\n\n' +
      'Read from the **bottom** of the curve, with your **eye level** with it. Look from above and you read too high; from below, too low.',
    contentVn:
      'Em đo **thể tích (volume)** của chất lỏng bằng một **ống đong (measuring cylinder)**. Mặt chất lỏng cong lên ở mép — đường cong đó là **mặt khum (meniscus)**.\n\n' +
      'Đọc ở **đáy** của đường cong, với **mắt ngang tầm (eye level)** với nó. Nhìn từ trên xuống thì đọc quá cao; nhìn từ dưới lên thì quá thấp.',
    notes: [
      {
        tone: 'write',
        text: '**Measuring cylinder:** the tool used to measure the volume of a liquid.\n**Meniscus:** the curved surface of the liquid. Read the **bottom** of it, with your **eye level**.',
        textVn: '**Ống đong (measuring cylinder):** dụng cụ để đo thể tích chất lỏng.\n**Mặt khum (meniscus):** mặt cong của chất lỏng. Đọc ở **đáy** của nó, với **mắt ngang tầm**.',
      },
    ],
  },

  // 13 ─ What volume is in each one? ────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 37 · Question 1',
    eyebrowVn: 'Sách học sinh, trang 37 · Câu hỏi 1',
    title: 'What Volume Is in Each One?',
    titleVn: 'Mỗi ống chứa thể tích bao nhiêu?',
    ratio: 56,
    inlineSvg: MEASURE.CYLINDERS_Q1,
    content:
      'Read each cylinder the way you just learned: **eye level**, at the **bottom of the meniscus**. Each small line is **10 cm³**.\n\n' +
      'Write your three answers in your notebook, with the units — **cm³** — every time.',
    contentVn:
      'Đọc mỗi ống theo cách em vừa học: **mắt ngang tầm**, ở **đáy mặt khum**. Mỗi vạch nhỏ là **10 cm³**.\n\n' +
      'Viết ba đáp án vào vở, kèm đơn vị — **cm³** — mỗi lần.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer: '**A** = 20 cm³\n**B** = 60 cm³\n**C** = 90 cm³',
      answerVn: '**A** = 20 cm³\n**B** = 60 cm³\n**C** = 90 cm³',
    },
  },

  // 14 ─ Reading a thermometer + CHECK 4 ────────────────────────────────────
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
      label: 'Page 38, Question 2 — three thermometers to read',
      labelVn: 'Trang 38, Câu hỏi 2 — ba nhiệt kế để đọc',
      answer: 'The three thermometers in the book read **A** = 25 °C, **B** = 15 °C, **C** = 40 °C — always at the top of the liquid, always with the units.',
      answerVn: 'Ba nhiệt kế trong sách chỉ **A** = 25 °C, **B** = 15 °C, **C** = 40 °C — luôn đọc ở đỉnh cột chất lỏng, luôn kèm đơn vị.',
    },
    check: {
      id: 'c4',
      q: 'Where exactly do you read a measuring cylinder, and where do you read a thermometer?',
      qVn: 'Em đọc ống đong ở đâu, và đọc nhiệt kế ở đâu?',
      options: [
        { val: 'A', text: 'Cylinder: top of the curve. Thermometer: bottom of the liquid.', textVn: 'Ống đong: đỉnh đường cong. Nhiệt kế: đáy cột chất lỏng.' },
        { val: 'B', text: 'Both: wherever is easiest to see', textVn: 'Cả hai: chỗ nào dễ nhìn nhất' },
        { val: 'C', text: 'Cylinder: bottom of the meniscus. Thermometer: top of the liquid. Both at eye level.', textVn: 'Ống đong: đáy mặt khum. Nhiệt kế: đỉnh cột chất lỏng. Cả hai ngang tầm mắt.' },
      ],
      correct: 'C',
      expEn: 'The cylinder is read at the **bottom of the meniscus**, the thermometer at the **top of the liquid** — and both with your **eye level** with the reading, or two people get two different numbers from the same water.',
      expVn: 'Ống đong đọc ở **đáy mặt khum**, nhiệt kế đọc ở **đỉnh cột chất lỏng** — và cả hai với **mắt ngang tầm** vạch đọc, nếu không hai người sẽ ra hai con số khác nhau từ cùng một lượng nước.',
    },
  },

  // 15 ─ Safety and the apparatus ───────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Predict first: we heat water and read the temperature every minute — does it get hotter forever?',
    eyebrowVn: 'Dự đoán trước: ta đun nước và đọc nhiệt độ mỗi phút — nước có nóng lên mãi không?',
    title: 'The Apparatus',
    titleVn: 'Bộ dụng cụ',
    ratio: 45,
    side: 'left',
    inlineSvg: MEASURE.APPARATUS,
    drawThis: true,
    content: 'Write your prediction down. Then draw the whole set-up and label every part. The one thing that matters: the thermometer bulb sits **in** the water, not touching the bottom of the beaker — so it measures the water, not the glass.',
    contentVn: 'Viết dự đoán của em ra. Rồi vẽ toàn bộ bộ dụng cụ và ghi nhãn từng bộ phận. Điều quan trọng nhất: bầu nhiệt kế nằm **trong** nước, không chạm đáy cốc — để nó đo nhiệt độ của nước, chứ không phải của thủy tinh.',
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
    content: 'Rule up the results table before you light the Bunsen, so you are ready to write a number the moment you read one.',
    contentVn: 'Kẻ sẵn bảng kết quả trước khi châm đèn Bunsen, để em sẵn sàng ghi số ngay khi đọc được.',
    steps: [
      { text: 'Measure **150 cm³** of water accurately into the beaker.', textVn: 'Đong chính xác **150 cm³** nước vào cốc.' },
      { text: 'Put the thermometer bulb **in the water**, held so it does **not touch the bottom**.', textVn: 'Đặt bầu nhiệt kế **trong nước**, giữ sao cho nó **không chạm đáy**.' },
      { text: 'Read the temperature and **record it** in your table at 0 minutes.', textVn: 'Đọc nhiệt độ và **ghi vào bảng** ở phút 0.' },
      { text: 'Light the Bunsen and heat the water. Read the temperature **every minute**.', textVn: 'Châm đèn Bunsen và đun nước. Đọc nhiệt độ **mỗi phút**.' },
      { text: 'Keep going until the water is **boiling** hard.', textVn: 'Tiếp tục cho đến khi nước **sôi** mạnh.' },
    ],
  },

  // 17 ─ It stops at the boiling point + CHECK 5 ────────────────────────────
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
    check: {
      id: 'c5',
      q: 'The Bunsen is still on, the water is boiling hard. What is happening to the temperature?',
      qVn: 'Đèn Bunsen vẫn cháy, nước đang sôi mạnh. Điều gì đang xảy ra với nhiệt độ?',
      options: [
        { val: 'A', text: 'It keeps rising past 100 °C', textVn: 'Nó tiếp tục tăng vượt quá 100 °C' },
        { val: 'B', text: 'It stays the same, at 100 °C', textVn: 'Nó giữ nguyên, ở 100 °C' },
        { val: 'C', text: 'It starts to fall', textVn: 'Nó bắt đầu giảm' },
      ],
      correct: 'B',
      expEn: 'While water boils its temperature **stays at 100 °C**: the heat going in is turning liquid into gas, not making the water hotter. That is the flat part of the graph.',
      expVn: 'Trong khi nước sôi, nhiệt độ **giữ ở 100 °C**: nhiệt đưa vào đang biến chất lỏng thành khí, không làm nước nóng hơn. Đó là phần nằm ngang của đồ thị.',
    },
  },

  // 18 ─ Describe and explain the graph ─────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Learner’s Book, page 40 · Describe your graph, then explain it',
    eyebrowVn: 'Sách học sinh, trang 40 · Mô tả đồ thị, rồi giải thích',
    title: 'Finish the Sentences',
    titleVn: 'Hoàn thành các câu',
    ratio: 56,
    content:
      'Fill each gap on paper, in a full sentence:\n\n' +
      '> When we heated the water, the temperature ______.\n' +
      '> The longer we heated it, the ______ the temperature became.\n' +
      '> When the water started to boil, the temperature ______.\n\n' +
      'Then: **why** does the temperature stop rising — and **why** is the thermometer held off the bottom of the beaker?',
    contentVn:
      'Điền vào mỗi chỗ trống ra giấy, bằng câu đầy đủ:\n\n' +
      '> When we heated the water, the temperature ______.\n' +
      '> The longer we heated it, the ______ the temperature became.\n' +
      '> When the water started to boil, the temperature ______.\n\n' +
      'Rồi: **vì sao** nhiệt độ ngừng tăng — và **vì sao** nhiệt kế được giữ không chạm đáy cốc?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      answer:
        'When we heated the water, the temperature **went up (rose)**.\nThe longer we heated it, the **higher** the temperature became.\nWhen the water started to boil, the temperature **stayed the same**.\n\n' +
        'It stops rising because the heat is being used to turn the water into a gas (steam), not to make it hotter. The thermometer is held off the bottom so it measures the temperature of the **water**, not the hotter glass.',
      answerVn:
        'When we heated the water, the temperature **went up (rose)** — nhiệt độ tăng lên.\nThe longer we heated it, the **higher** the temperature became — càng đun lâu, nhiệt độ càng cao.\nWhen the water started to boil, the temperature **stayed the same** — khi nước bắt đầu sôi, nhiệt độ giữ nguyên.\n\n' +
        'Nó ngừng tăng vì nhiệt được dùng để biến nước thành khí (hơi), chứ không phải làm nó nóng hơn. Nhiệt kế được giữ không chạm đáy để nó đo nhiệt độ của **nước**, chứ không phải của lớp thủy tinh nóng hơn.',
    },
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
      '> Your notebook should now have **change of state**, the **five change words with their from → to**, **one labelled cycle diagram**, the **meniscus and thermometer notes**, and **one labelled apparatus drawing**. Check. Exit question: the bathroom mirror goes **foggy** when you shower, then slowly **clears** again. Name the **two** changes of state, in order.',
    contentVn:
      '> Trong vở của em bây giờ phải có **sự chuyển thể**, **năm từ chuyển thể kèm from → to**, **một sơ đồ vòng có ghi nhãn**, **ghi chú về mặt khum và nhiệt kế**, và **một hình bộ dụng cụ có ghi nhãn**. Hãy kiểm tra. Câu hỏi ra về: tấm gương phòng tắm bị **mờ hơi nước** khi em tắm, rồi từ từ **trong trở lại**. Hãy gọi tên **hai** sự chuyển thể, theo thứ tự.',
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
