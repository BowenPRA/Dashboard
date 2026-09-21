// src/data/PRIMARY_TECH/T03/notes.js
// T3 Typing Properly — the self-study deck (NOTES), built to the Year 7
// standard (docs/primary-tech/UPGRADE-PLAN.md §4 and the T3 brief in §8.4). 26
// layout slides; 17 scored items — 6 checks and 11 activities (estimate ·
// sort · predict · hotspot · order) — so the student does something every
// slide or two. There is no simulator demo: T3 has no Try It. The doing is the
// Typing Gym, and the deck shows its screens (GYM_RESULT, GYM_SCREEN) so the
// student meets them before the task.
//
// SPINE:
//   1–2    hero; estimate — how many words a minute does a good typist type?
//   3–5    two ways to type (TWO_WAYS; reveal: looking down costs twice);
//          sit like this (POSTURE_GOOD); sort — good habit / bad habit
//   6      switch to EN first (LANG_SWITCH) + predict — Telex turns "moon"
//          into "môn"
//   7–11   meet the keyboard (LB_KEYBOARD, labelled); the home row (LB_HANDS,
//          labelled); hotspot — the left index finger's home key; feel the
//          bumps (BUMPS) + check; predict — one key out: "sad" comes out "dsf"
//   12–14  every finger has its own keys (FINGER_ZONES); hotspot — a key the
//          right little finger presses; thumbs on the space bar + check
//   15–18  reach, then come home (steps, REACH); order — typing R; the other
//          hand's Shift + hotspot — the Shift for the H of Hanoi; Enter and
//          Backspace are right-little-finger reaches + check
//   19–20  full stops, commas, question marks (PUNCT); sort — Shift or no Shift
//   21–24  accuracy first + estimate — 45 right out of 50 is 90%; reading a
//          Typing Gym result (GYM_RESULT) + check; little and often + predict;
//          eyes on the screen (GYM_SCREEN) + check
//   25–26  the checklist with the exit check; the unassessed "On your own
//          computer" card, which stays last (docs/digital-skills-course.md §5.4)
//
// House notes:
//  · Every slide's `check:` or `activity:` is its LAST key; no slide has both.
//    The right check letters are spread C · A · D · B · D · C.
//  · Activity strings are name/explain, never text/content (the narration
//    generator reads text/content aloud and stops at `check:`/`activity:`).
//  · The keyboard hotspots are built from KEY_LIST (diagrams.js): EVERY key is
//    a target, named by what it is and which finger presses it, so a wrong tap
//    is always named ("G — pressed by your left index finger"). A long key
//    (Shift, Enter, the space bar) is a row of circles with one id; the first
//    circle is the one the reveal rings, so it is the key's centre. The
//    keyboard's printed legends are class="keep", so the hotspot's picture is
//    the real keyboard; every question asks by FINGER or JOB.
//  · Two renderer traps (docs/lesson-renderer-gap.md §0): a check on a
//    `showcase` shrinks its picture, so every picture that carries a scored
//    item is on a `split`, and the five showcases carry none. Hotspots sit on
//    `statement` slides: the hotspot IS the picture, and a split would draw the
//    keyboard twice.
//  · Slide audio is derived from position: run `npm run sync-audio` for this
//    unit once the deck is final.
import { DIAGRAMS, KEY_LIST, ZONE } from './diagrams.js';

const SKY = '#0ea5e9';
const BLUE = '#3b82f6';
const PURPLE = '#a855f7';
const AMBER = '#f59e0b';
const GREEN = '#10b981';

/* ------------------------------------------------------------------ *
 * Keyboard hotspot targets, derived from the drawn keys.
 * ------------------------------------------------------------------ */

const FINGER_OF = {
  L4: ['your left little finger', 'ngón út tay trái'],
  L3: ['your left ring finger', 'ngón áp út tay trái'],
  L2: ['your left middle finger', 'ngón giữa tay trái'],
  L1: ['your left index finger', 'ngón trỏ tay trái'],
  R1: ['your right index finger', 'ngón trỏ tay phải'],
  R2: ['your right middle finger', 'ngón giữa tay phải'],
  R3: ['your right ring finger', 'ngón áp út tay phải'],
  R4: ['your right little finger', 'ngón út tay phải'],
};
const HOME_KEYS = new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);
const BIG_KEY = {
  backspace: ['Backspace', 'Backspace'],
  tab: ['Tab', 'Tab'],
  caps: ['Caps Lock', 'Caps Lock'],
  enter: ['Enter', 'Enter'],
  lshift: ['The left Shift', 'Phím Shift trái'],
  rshift: ['The right Shift', 'Phím Shift phải'],
  lctrl: ['Ctrl', 'Ctrl'],
  rctrl: ['Ctrl', 'Ctrl'],
  lalt: ['Alt', 'Alt'],
  ralt: ['Alt', 'Alt'],
  space: ['The space bar', 'Phím cách'],
};

/** A key's default name: what it is, and which finger looks after it. */
function describe(k) {
  const [en, vn] = BIG_KEY[k.id] || [k.main.toUpperCase(), k.main.toUpperCase()];
  const z = ZONE[k.id];
  if (z === 'T') return [`${en} — both thumbs rest on it`, `${vn} — nơi hai ngón cái nghỉ`];
  if (!z) return [`${en} — a key for shortcuts, not for typing words`, `${vn} — phím dùng cho phím tắt, không dùng để gõ chữ`];
  const [fEn, fVn] = FINGER_OF[z];
  if (HOME_KEYS.has(k.id)) return [`${en} — the home key of ${fEn}`, `${vn} — phím cơ sở của ${fVn}`];
  return [`${en} — pressed by ${fEn}`, `${vn} — phím do ${fVn} bấm`];
}

/**
 * The circles that cover one key. A square key is one circle; a long key is
 * a row of circles along its middle with the same id, the first of them at the
 * key's centre (where the reveal draws its ring).
 */
function circlesFor(k, id, [name, nameVn]) {
  const r = 29;
  if (k.w < 70) return [{ id, x: k.cx, y: k.cy, r, name, nameVn }];
  const n = Math.ceil((k.w - 50) / 40);
  const xs = [k.cx, ...Array.from({ length: n + 1 }, (_, i) => k.x + 25 + (i * (k.w - 50)) / n)]
    .filter((x, i) => i === 0 || Math.abs(x - k.cx) > 12)
    .map((x) => Math.round(x * 10) / 10);
  return xs.map((x) => ({ id, x, y: k.cy, r, name, nameVn }));
}

/**
 * Every key of KEYBOARD as a hotspot target. `group` gives a key's target id
 * (so several keys can be one answer), `say` overrides a key's name, and
 * `first` moves one key to the front — the key the reveal rings.
 */
function keyTargets({ group = (k) => k.id, say = {}, first = null } = {}) {
  const keys = first ? [KEY_LIST.find((k) => k.id === first), ...KEY_LIST.filter((k) => k.id !== first)] : KEY_LIST;
  return keys.flatMap((k) => circlesFor(k, group(k), say[k.id] || describe(k)));
}

export const notes = [
  // 1 ─ Hero ──────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: SKY,
    icon: 'Hand',
    brand: 'Technology',
    brandVn: 'Công nghệ',
    eyebrow: 'Unit T3',
    eyebrowVn: 'Bài T3',
    title: 'Typing Properly',
    titleVn: 'Gõ phím đúng cách',
    objective: 'Type with all ten fingers and your eyes on the screen: sit well, find the home row by touch, give every finger its own keys — and get it right before you get fast.',
    objectiveVn: 'Gõ phím bằng cả mười ngón tay, mắt nhìn màn hình: ngồi đúng tư thế, tìm hàng phím cơ sở bằng cảm giác, giao cho mỗi ngón tay những phím riêng — và gõ đúng trước rồi mới gõ nhanh.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **estimate**, **sort**, **tap**, **order** and **predict** your way through it — then practise for real in the **Typing Gym**. **17 things are scored** — the first one is on the next slide.',
      textVn: 'Em sẽ **ước lượng**, **sắp xếp**, **chạm**, **xếp thứ tự** và **dự đoán** trong suốt bài học — rồi luyện tập thật trong **Phòng tập gõ phím**. **17 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: ESTIMATE — words a minute ────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Gauge',
    eyebrow: 'Start with a guess',
    eyebrowVn: 'Bắt đầu bằng một dự đoán',
    title: 'How Fast Is a Good Typist?',
    titleVn: 'Người gõ giỏi nhanh đến đâu?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Gauge',
    text: '**Ten fingers**, eyes up.',
    textVn: '**Mười ngón**, mắt nhìn lên.',
    sub: 'Copying English, about how many **words a minute** (wpm) do they type?',
    subVn: 'Khi chép tiếng Anh, họ gõ khoảng bao nhiêu **từ mỗi phút** (wpm)?',
    activity: {
      id: 'act_wpm',
      type: 'estimate',
      prompt: 'About how many words a minute does a good touch typist type?',
      promptVn: 'Một người gõ mười ngón giỏi gõ được khoảng bao nhiêu từ mỗi phút?',
      min: 0, max: 120, step: 5, unit: 'wpm', answer: 40, tolerance: 0.35,
      explain: 'About **40 words a minute** — much faster than anyone writes by hand. Nobody starts there. Your goal in this unit is **8 words a minute, with 9 keys in every 10 right**, and it climbs as you practise. **Right first, fast later.**',
      explainVn: 'Khoảng **40 từ mỗi phút** — nhanh hơn nhiều so với viết tay. Không ai bắt đầu ở mức đó cả. Mục tiêu của em trong bài này là **8 từ mỗi phút, cứ 10 phím thì đúng 9**, và mục tiêu sẽ tăng dần khi em luyện tập. **Gõ đúng trước, gõ nhanh sau.**',
    },
  },

  // 3 ─ Two ways to type (TWO_WAYS + the looking-down reveal) ─────────────────
  {
    layout: 'split',
    icon: 'Eye',
    accent: SKY,
    ratio: 40,
    eyebrow: 'Why this matters',
    eyebrowVn: 'Vì sao điều này quan trọng',
    title: 'Two Ways to Type',
    titleVn: 'Hai cách gõ phím',
    content: '**Hunt and peck:** one or two fingers, eyes down, hunting for every key.\n\n**Touch typing:** all ten fingers, each with its own keys, and your eyes on the **screen**. It feels slow at first — then it gets far faster than hunting ever can.',
    contentVn: '**Gõ mổ cò:** một hoặc hai ngón tay, mắt nhìn xuống, đi tìm từng phím.\n\n**Gõ mười ngón:** cả mười ngón tay, mỗi ngón có phím riêng, và mắt em nhìn **màn hình**. Lúc đầu thấy chậm — rồi sẽ nhanh hơn gõ mổ cò rất nhiều.',
    inlineSvg: DIAGRAMS.TWO_WAYS,
    notes: [
      {
        tone: 'write',
        text: '**Touch typing:** typing with all ten fingers, without looking at the keys.',
        textVn: '**Gõ mười ngón (touch typing):** gõ phím bằng cả mười ngón tay, không nhìn xuống bàn phím.',
      },
    ],
    reveal: {
      label: 'Why does looking down cost you twice?',
      labelVn: 'Vì sao nhìn xuống khiến em mất gấp đôi?',
      prompt: 'A hunt-and-peck typist looks down to find every letter.',
      promptVn: 'Người gõ mổ cò nhìn xuống để tìm từng chữ cái.',
      answer: 'Then they have to look **up** again and find their place on the screen — **two searches for every letter**. And while their eyes are on the keys, they cannot see their **mistakes**.',
      answerVn: 'Rồi họ phải nhìn **lên** lại và tìm chỗ mình đang gõ trên màn hình — **hai lần tìm cho mỗi chữ cái**. Và trong lúc mắt nhìn phím, họ không thấy được **lỗi** của mình.',
    },
  },

  // 4 ─ Sit like this (POSTURE_GOOD) ──────────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'Activity',
    accent: GREEN,
    eyebrow: 'Before you type',
    eyebrowVn: 'Trước khi gõ',
    title: 'Sit Like This',
    titleVn: 'Hãy ngồi như thế này',
    inlineSvg: DIAGRAMS.POSTURE_GOOD,
    caption: 'Five things to check before you start. **Feet flat** on the floor — on a box if they do not reach. **Back straight**, against the chair. **Elbows** by your sides. **Wrists straight**, floating just above the keys. The **top of the screen** at eye level, about an arm’s length away.',
    captionVn: 'Năm điều cần kiểm tra trước khi bắt đầu. **Bàn chân đặt phẳng** trên sàn — kê một cái hộp nếu chân không chạm sàn. **Lưng thẳng**, tựa vào ghế. **Khuỷu tay** khép hai bên người. **Cổ tay thẳng**, nâng nhẹ ngay trên bàn phím. **Mép trên màn hình** ngang tầm mắt, cách khoảng một sải tay.',
  },

  // 5 ─ SORT — good habit or bad habit ────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Layers',
    eyebrow: 'Sort it',
    eyebrowVn: 'Sắp xếp',
    title: 'Good Habit or Bad Habit?',
    titleVn: 'Thói quen tốt hay xấu?',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Layers',
    text: 'How you sit decides how long you can type **without aching**.',
    textVn: 'Cách em ngồi quyết định em gõ được bao lâu mà **không bị đau mỏi**.',
    sub: 'Sort the eight habits.',
    subVn: 'Hãy sắp xếp tám thói quen.',
    activity: {
      id: 'act_posture_habits',
      type: 'sort',
      prompt: 'Is each one a good habit or a bad habit for typing?',
      promptVn: 'Mỗi điều dưới đây là thói quen tốt hay thói quen xấu khi gõ phím?',
      bins: [
        { id: 'good', name: 'Good habit', nameVn: 'Thói quen tốt' },
        { id: 'bad', name: 'Bad habit', nameVn: 'Thói quen xấu' },
      ],
      cards: [
        { id: 'feet', name: 'Feet flat on the floor', nameVn: 'Bàn chân đặt phẳng trên sàn', bin: 'good' },
        { id: 'lean', name: 'Leaning in to the screen', nameVn: 'Chúi sát vào màn hình', bin: 'bad' },
        { id: 'back', name: 'Back straight in the chair', nameVn: 'Ngồi sâu, lưng thẳng', bin: 'good' },
        { id: 'rest', name: 'Wrists bent up on the desk', nameVn: 'Tì cổ tay lên bàn, gập lên', bin: 'bad' },
        { id: 'wrists', name: 'Wrists straight above the keys', nameVn: 'Cổ tay thẳng trên bàn phím', bin: 'good' },
        { id: 'edge', name: 'Perched on the chair\'s edge', nameVn: 'Ngồi ở mép ghế', bin: 'bad' },
        { id: 'stretch', name: 'Stopping to stretch your hands', nameVn: 'Dừng lại để duỗi tay', bin: 'good' },
        { id: 'low', name: 'Looking down at a low screen', nameVn: 'Cúi nhìn màn hình thấp', bin: 'bad' },
      ],
      explain: 'The good habits all keep your body **straight and relaxed**: feet down, back supported, wrists level, eyes level with the screen. The bad ones **bend** something — your back, your neck or your wrists — and that is what starts to ache after twenty minutes.',
      explainVn: 'Các thói quen tốt đều giữ cơ thể em **thẳng và thoải mái**: chân chạm sàn, lưng được tựa, cổ tay ngang bằng, mắt ngang màn hình. Các thói quen xấu đều **bẻ cong** một chỗ nào đó — lưng, cổ hoặc cổ tay — và đó chính là chỗ bắt đầu đau mỏi sau hai mươi phút.',
    },
  },

  // 6 ─ Switch to EN first (LANG_SWITCH) + PREDICT ────────────────────────────
  {
    layout: 'split',
    icon: 'Languages',
    accent: AMBER,
    ratio: 50,
    eyebrow: 'Before you type English',
    eyebrowVn: 'Trước khi gõ tiếng Anh',
    title: 'Switch to EN First',
    titleVn: 'Chuyển sang EN trước',
    content: 'Many computers here also type **Vietnamese**, with **Telex** or **VNI**. That is perfect for Vietnamese — but it changes English words as you type them.\n\nBefore you type English, look near the **clock**. If the language button says **VI**, click it and choose **EN**.',
    contentVn: 'Nhiều máy tính ở đây còn gõ được **tiếng Việt**, bằng **Telex** hoặc **VNI**. Điều đó rất tốt khi gõ tiếng Việt — nhưng nó làm thay đổi các từ tiếng Anh khi em gõ.\n\nTrước khi gõ tiếng Anh, hãy nhìn gần **đồng hồ**. Nếu nút ngôn ngữ ghi **VI**, hãy bấm vào và chọn **EN**.',
    inlineSvg: DIAGRAMS.LANG_SWITCH,
    notes: [
      {
        tone: 'info',
        text: 'Two ways to switch: click the **language button** by the clock, or press the **Windows key + Space**. If **Unikey** is running, click its **V** by the clock so that it shows **E**.',
        textVn: 'Có hai cách để chuyển: bấm vào **nút ngôn ngữ** cạnh đồng hồ, hoặc nhấn **phím Windows + phím cách**. Nếu **Unikey** đang chạy, hãy bấm vào chữ **V** của nó cạnh đồng hồ để nó chuyển thành **E**.',
      },
    ],
    activity: {
      id: 'act_telex_moon',
      type: 'predict',
      prompt: 'Vietnamese typing (Telex) is still switched on. You type the English word "moon". What appears on the screen?',
      promptVn: 'Bộ gõ tiếng Việt (Telex) vẫn đang bật. Em gõ từ tiếng Anh "moon". Trên màn hình sẽ hiện ra gì?',
      options: [
        { val: 'moon', name: 'moon', nameVn: 'moon' },
        { val: 'mon', name: 'môn', nameVn: 'môn' },
        { val: 'caps', name: 'MOON', nameVn: 'MOON' },
        { val: 'none', name: 'Nothing at all', nameVn: 'Không có gì cả' },
      ],
      correct: 'mon',
      explain: 'In Telex, **oo** makes **ô** — so **moon** comes out as **môn**, a Vietnamese word. **aa** makes **â** and **dd** makes **đ** too. Switch to **EN** and English comes out the way you type it. (The Typing Gym warns you if a letter comes out changed.)',
      explainVn: 'Trong Telex, **oo** thành **ô** — nên **moon** hiện ra thành **môn**, một từ tiếng Việt. **aa** thành **â** và **dd** thành **đ** nữa. Chuyển sang **EN** thì tiếng Anh hiện ra đúng như em gõ. (Phòng tập gõ phím sẽ nhắc em nếu có chữ bị đổi.)',
    },
  },

  // 7 ─ Meet the keyboard (LB_KEYBOARD, labelled) ─────────────────────────────
  {
    layout: 'showcase',
    icon: 'LayoutGrid',
    accent: SKY,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Meet the Keyboard',
    titleVn: 'Làm quen với bàn phím',
    inlineSvg: DIAGRAMS.LB_KEYBOARD,
    caption: 'The **home row** is the middle row of letters — your fingers start there. The long **space bar** is under your thumbs. There is a **Shift** on each side. **Tab**, **Caps Lock**, **Enter** and **Backspace** sit at the edges, where your little fingers reach them. Unit T2 showed what they do; this unit is about **which finger** presses them.',
    captionVn: '**Hàng phím cơ sở** là hàng chữ ở giữa — các ngón tay em bắt đầu từ đó. **Phím cách** dài nằm dưới hai ngón cái. Mỗi bên có một phím **Shift**. **Tab**, **Caps Lock**, **Enter** và **Backspace** nằm ở hai mép, nơi ngón út với tới được. Bài T2 đã cho em biết chúng làm gì; bài này nói về **ngón nào** bấm chúng.',
  },

  // 8 ─ The home row (LB_HANDS, labelled) ─────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'Hand',
    accent: SKY,
    eyebrow: 'Where your fingers live',
    eyebrowVn: 'Chỗ của các ngón tay',
    title: 'The Home Row',
    titleVn: 'Hàng phím cơ sở',
    inlineSvg: DIAGRAMS.LB_HANDS,
    caption: 'Your fingers **rest** here between keys. **Left hand:** A S D F. **Right hand:** J K L ;. Both **thumbs** rest on the space bar. From here every finger can reach its keys — and come straight back.',
    captionVn: 'Các ngón tay em **nghỉ** ở đây giữa những lần gõ. **Tay trái:** A S D F. **Tay phải:** J K L ;. Hai **ngón cái** đặt trên phím cách. Từ đây mỗi ngón tay đều với tới được phím của mình — và trở về ngay.',
  },

  // 9 ─ HOTSPOT — the left index finger's home key ────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'MousePointerClick',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Find the Home Key',
    titleVn: 'Tìm phím cơ sở',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Each finger has a **home key**: the key it rests on.',
    textVn: 'Mỗi ngón tay có một **phím cơ sở**: phím mà nó đặt lên để nghỉ.',
    sub: 'Tap the key your **left index finger** rests on.',
    subVn: 'Chạm vào phím mà **ngón trỏ tay trái** của em đặt lên.',
    activity: {
      id: 'act_home_f',
      type: 'hotspot',
      prompt: 'Tap the key your left index finger rests on.',
      promptVn: 'Chạm vào phím mà ngón trỏ tay trái của em đặt lên.',
      svg: DIAGRAMS.KEYBOARD,
      viewBox: '0 0 900 330',
      targets: keyTargets({
        say: {
          j: ['J — the home key of your RIGHT index finger', 'J — phím cơ sở của ngón trỏ tay PHẢI'],
          g: ['G — your left index finger reaches across to it, but rests next door', 'G — ngón trỏ tay trái với sang phím này, nhưng nghỉ ở phím bên cạnh'],
        },
      }),
      correct: 'f',
      explain: '**F** is your left index finger’s home key — and it has a **bump** you can feel. **J**, your right index finger’s home key, has one too. Find those two, and every other finger falls into place beside them.',
      explainVn: '**F** là phím cơ sở của ngón trỏ tay trái — và nó có một **gờ nổi** em sờ thấy được. **J**, phím cơ sở của ngón trỏ tay phải, cũng có một gờ như vậy. Tìm được hai phím đó, các ngón còn lại sẽ tự vào đúng chỗ bên cạnh.',
    },
  },

  // 10 ─ Feel the bumps (BUMPS) + CHECK ───────────────────────────────────────
  {
    layout: 'split',
    icon: 'Hand',
    accent: SKY,
    ratio: 50,
    eyebrow: 'Feel, don’t look',
    eyebrowVn: 'Sờ, đừng nhìn',
    title: 'Feel the Bumps',
    titleVn: 'Sờ những gờ nổi',
    content: 'Run a finger over **F** and **J** on a real keyboard. Each has a tiny raised line: a **bump**. The bumps are there so your index fingers can find the home row **without your eyes**.',
    contentVn: 'Hãy lướt ngón tay qua phím **F** và **J** trên một bàn phím thật. Mỗi phím có một vạch nhỏ nhô lên: một **gờ nổi**. Các gờ nổi có ở đó để hai ngón trỏ tìm được hàng phím cơ sở **mà không cần mắt**.',
    inlineSvg: DIAGRAMS.BUMPS,
    notes: [
      {
        tone: 'write',
        text: '**Home row:** the middle row of letter keys. Your fingers rest on A S D F and J K L ;.',
        textVn: '**Hàng phím cơ sở (home row):** hàng phím chữ ở giữa. Các ngón tay em đặt trên A S D F và J K L ;.',
      },
    ],
    check: {
      id: 'chk_bumps',
      q: 'Your hands have been off the keyboard. How do you put them back on the home row **without looking**?',
      qVn: 'Hai tay em vừa rời khỏi bàn phím. Làm sao em đặt chúng lại lên hàng phím cơ sở **mà không cần nhìn**?',
      options: [
        { val: 'A', text: 'Glance down quickly — it only takes a second.', textVn: 'Liếc xuống thật nhanh — chỉ mất một giây thôi.' },
        { val: 'B', text: 'Put your fingers anywhere near the middle of the keyboard.', textVn: 'Đặt các ngón tay đâu đó gần giữa bàn phím.' },
        { val: 'C', text: 'Feel for the bumps on F and J with your index fingers, and rest the other fingers beside them.', textVn: 'Dùng hai ngón trỏ sờ tìm gờ nổi trên F và J, rồi đặt các ngón khác bên cạnh.' },
        { val: 'D', text: 'Press keys until the right letters appear.', textVn: 'Bấm thử các phím cho đến khi hiện đúng chữ.' },
      ],
      correct: 'C',
      expEn: 'The bumps are there for exactly this. Your **index fingers** find **F** and **J** by touch, and the other fingers fall onto A S D and K L ; beside them. A glance (A) breaks the habit this unit is building; "anywhere near the middle" (B) is one key out as often as not; and pressing keys (D) types rubbish.',
      expVn: 'Các gờ nổi có ở đó chính là để làm việc này. Hai **ngón trỏ** tìm **F** và **J** bằng cảm giác, rồi các ngón khác tự đặt lên A S D và K L ; bên cạnh. Liếc xuống (A) phá vỡ thói quen mà bài này đang xây dựng; "đâu đó gần giữa" (B) thường bị lệch một phím; còn bấm thử (D) thì gõ ra toàn chữ vô nghĩa.',
    },
  },

  // 11 ─ PREDICT — one key out ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'One Key Out',
    titleVn: 'Lệch một phím',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: '**Left hand**, one key right.',
    textVn: '**Tay trái** lệch một phím.',
    sub: 'Every finger is on its neighbour’s key. You type **sad**. What comes out?',
    subVn: 'Mỗi ngón đang ở phím của ngón bên cạnh. Em gõ chữ **sad**. Chữ gì hiện ra?',
    activity: {
      id: 'act_one_key_out',
      type: 'predict',
      prompt: 'Your left hand is one key to the right. You try to type "sad". What comes out?',
      promptVn: 'Tay trái của em lệch sang phải một phím. Em định gõ "sad". Chữ gì sẽ hiện ra?',
      options: [
        { val: 'sad', name: 'sad', nameVn: 'sad' },
        { val: 'dsf', name: 'dsf', nameVn: 'dsf' },
        { val: 'asd', name: 'asd', nameVn: 'asd' },
        { val: 'none', name: 'Nothing at all', nameVn: 'Không có gì cả' },
      ],
      correct: 'dsf',
      explain: 'Every finger presses the key **next to** the one it meant, so every letter is wrong in the same way: s → **d**, a → **s**, d → **f**. You would not even notice until you looked at the screen. That is why you feel for the **bumps** every time you put your hands down.',
      explainVn: 'Mỗi ngón tay đều bấm vào phím **bên cạnh** phím nó định bấm, nên chữ nào cũng sai theo cùng một kiểu: s → **d**, a → **s**, d → **f**. Em thậm chí sẽ không nhận ra cho đến khi nhìn lên màn hình. Đó là lý do mỗi lần đặt tay xuống, em đều sờ tìm các **gờ nổi**.',
    },
  },

  // 12 ─ Every finger has its own keys (FINGER_ZONES) ─────────────────────────
  {
    layout: 'showcase',
    icon: 'Grid3x3',
    accent: PURPLE,
    eyebrow: 'One finger, one set of keys',
    eyebrowVn: 'Mỗi ngón một nhóm phím',
    title: 'Every Finger Has Its Own Keys',
    titleVn: 'Mỗi ngón tay có những phím riêng',
    inlineSvg: DIAGRAMS.FINGER_ZONES,
    caption: 'Each colour is one finger’s keys — the same colours as the Typing Gym. A finger presses **only** the keys in its own colour: up, down, and back home. The **index fingers** are the strongest, so each looks after two columns. The dashed line is where your left hand stops and your right hand starts.',
    captionVn: 'Mỗi màu là nhóm phím của một ngón tay — giống hệt màu trong Phòng tập gõ phím. Mỗi ngón **chỉ** bấm những phím cùng màu với nó: lên, xuống, rồi về chỗ cũ. Hai **ngón trỏ** khoẻ nhất, nên mỗi ngón phụ trách hai cột. Đường gạch đứt là ranh giới giữa tay trái và tay phải.',
  },

  // 13 ─ HOTSPOT — a key the right little finger presses ──────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MousePointerClick',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'The Little Finger’s Keys',
    titleVn: 'Những phím của ngón út',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: '**Little fingers** look after the **edge** keys.',
    textVn: '**Ngón út** phụ trách các phím ở **mép**.',
    sub: 'Tap **one** key that your **right little finger** presses.',
    subVn: 'Chạm vào **một** phím mà **ngón út tay phải** của em bấm.',
    activity: {
      id: 'act_right_little',
      type: 'hotspot',
      prompt: 'Tap a key that your right little finger presses.',
      promptVn: 'Chạm vào một phím mà ngón út tay phải của em bấm.',
      svg: DIAGRAMS.KEYBOARD,
      viewBox: '0 0 900 330',
      targets: keyTargets({ group: (k) => (ZONE[k.id] === 'R4' ? 'rlittle' : k.id), first: ';' }),
      correct: 'rlittle',
      explain: 'Your right little finger rests on **;** and looks after everything to its right: **P**, **/**, **\'**, the keys above them, and the big keys at the edge — **Enter**, **Backspace** and the right **Shift**. Any of those was right.',
      explainVn: 'Ngón út tay phải của em đặt trên phím **;** và phụ trách mọi phím bên phải nó: **P**, **/**, **\'**, các phím phía trên chúng, và những phím lớn ở mép — **Enter**, **Backspace** và phím **Shift** bên phải. Chạm vào phím nào trong số đó cũng đúng.',
    },
  },

  // 14 ─ Thumbs on the space bar + CHECK ──────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Hand',
    eyebrow: 'The long key',
    eyebrowVn: 'Phím dài',
    title: 'Thumbs on the Space Bar',
    titleVn: 'Ngón cái trên phím cách',
    label: 'Key idea',
    labelVn: 'Ý chính',
    labelIcon: 'Hand',
    text: '**Thumbs** rest on the **space bar**.',
    textVn: '**Ngón cái** đặt trên **phím cách**.',
    sub: 'Tap it with **either thumb** after each word. Your eight fingers never leave the home row.',
    subVn: 'Sau mỗi từ, chạm nó bằng **một trong hai ngón cái**. Tám ngón còn lại không rời hàng phím cơ sở.',
    check: {
      id: 'chk_space',
      q: 'You have just typed the word **cat**. How do you make the space before the next word?',
      qVn: 'Em vừa gõ xong từ **cat**. Em tạo dấu cách trước từ tiếp theo bằng cách nào?',
      options: [
        { val: 'A', text: 'Tap the space bar with a thumb.', textVn: 'Chạm phím cách bằng một ngón cái.' },
        { val: 'B', text: 'Reach down to the space bar with your right index finger.', textVn: 'Đưa ngón trỏ tay phải xuống bấm phím cách.' },
        { val: 'C', text: 'Press the right arrow key.', textVn: 'Bấm phím mũi tên sang phải.' },
        { val: 'D', text: 'Press Tab.', textVn: 'Bấm phím Tab.' },
      ],
      correct: 'A',
      expEn: 'Your thumbs are already resting on the **space bar**, so a tap costs nothing and no finger leaves the home row. Reaching down with an index finger (B) pulls your hand off home. The arrow key moves the cursor without making a space (C), and Tab jumps a long way, not one space (D).',
      expVn: 'Hai ngón cái đã đặt sẵn trên **phím cách**, nên chạm một cái chẳng tốn gì và không ngón nào phải rời hàng phím cơ sở. Đưa ngón trỏ xuống (B) sẽ kéo tay em ra khỏi chỗ. Phím mũi tên chỉ di chuyển con trỏ chứ không tạo dấu cách (C), còn Tab nhảy một khoảng dài, không phải một dấu cách (D).',
    },
  },

  // 15 ─ Reach, then come home (steps + REACH) ────────────────────────────────
  {
    layout: 'steps',
    dense: true,
    icon: 'Move',
    accent: BLUE,
    eyebrow: 'Out and back',
    eyebrowVn: 'Đi rồi về',
    title: 'Reach, Then Come Home',
    titleVn: 'Với ra, rồi trở về',
    content: 'A **reach**: one finger goes out, presses, and comes **straight back**.',
    contentVn: 'Một lần **với**: một ngón tay đi ra, bấm phím, rồi **trở về ngay**.',
    inlineSvg: DIAGRAMS.REACH,
    steps: [
      { text: 'Start with all eight fingers on the **home row**.', textVn: 'Bắt đầu với cả tám ngón tay trên **hàng phím cơ sở**.' },
      { text: 'Move **only** the finger whose key it is — up, down or across. The others stay home.', textVn: '**Chỉ** di chuyển ngón tay phụ trách phím đó — lên, xuống hoặc sang ngang. Các ngón khác giữ nguyên chỗ.' },
      { text: 'Press the key **lightly** — a tap, not a push.', textVn: 'Bấm phím **nhẹ nhàng** — chạm thôi, đừng ấn mạnh.' },
      { text: 'Bring that finger **straight back** to its home key.', textVn: 'Đưa ngón tay đó **trở về ngay** phím cơ sở của nó.' },
    ],
    reveal: {
      label: 'Why come straight back?',
      labelVn: 'Vì sao phải trở về ngay?',
      prompt: 'Your finger has reached up to R. The next letter is D.',
      promptVn: 'Ngón tay em vừa với lên R. Chữ tiếp theo là D.',
      answer: 'If the finger stays out on R, your hand starts to **drift**, and soon every finger is one key out — the **dsf** problem. Come home after every reach, and every key is always the same short move away.',
      answerVn: 'Nếu ngón tay cứ ở trên R, bàn tay em sẽ bắt đầu **trôi đi**, và chẳng mấy chốc ngón nào cũng lệch một phím — đúng như chuyện **dsf**. Hãy trở về sau mỗi lần với, thì phím nào cũng chỉ cách một bước ngắn như nhau.',
    },
  },

  // 16 ─ ORDER — typing R ─────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: BLUE,
    icon: 'ListChecks',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Type the Letter R',
    titleVn: 'Gõ chữ R',
    label: 'Order',
    labelVn: 'Xếp thứ tự',
    labelIcon: 'ListChecks',
    text: '**R** is a reach for your **left index finger**, up from F.',
    textVn: '**R** là một lần với của **ngón trỏ tay trái**, đi lên từ F.',
    sub: 'Put the five moves in order, **first to last**.',
    subVn: 'Hãy xếp năm động tác theo thứ tự, **từ đầu đến cuối**.',
    activity: {
      id: 'act_type_r',
      type: 'order',
      prompt: 'Put the five moves for typing R in order.',
      promptVn: 'Xếp năm động tác để gõ chữ R theo đúng thứ tự.',
      steps: [
        { id: 'bumps', name: 'Feel for the bumps on F and J', nameVn: 'Sờ tìm gờ nổi trên F và J' },
        { id: 'rest', name: 'Rest all eight fingers on the home row', nameVn: 'Đặt cả tám ngón tay lên hàng phím cơ sở' },
        { id: 'reach', name: 'Move your left index finger up to R', nameVn: 'Đưa ngón trỏ tay trái lên phím R' },
        { id: 'press', name: 'Press R', nameVn: 'Bấm phím R' },
        { id: 'home', name: 'Bring your left index finger back to F', nameVn: 'Đưa ngón trỏ tay trái trở về phím F' },
      ],
      explain: 'First the **bumps**, so every finger lands on its home key. Then **only** the left index finger moves: up to **R**, a tap, and **straight back to F**. The last move is the one people forget — and forgetting it is how a hand drifts.',
      explainVn: 'Đầu tiên là sờ **gờ nổi**, để ngón nào cũng đặt đúng phím cơ sở. Sau đó **chỉ** ngón trỏ tay trái di chuyển: lên **R**, chạm một cái, rồi **trở về F ngay**. Động tác cuối là cái hay bị quên — và quên nó chính là lý do bàn tay bị trôi.',
    },
  },

  // 17 ─ The other hand's Shift + HOTSPOT ─────────────────────────────────────
  {
    layout: 'statement',
    accent: AMBER,
    icon: 'PenLine',
    eyebrow: 'Capital letters',
    eyebrowVn: 'Chữ in hoa',
    title: 'The Other Hand’s Shift',
    titleVn: 'Phím Shift của tay kia',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: '**Other hand** on **Shift**.',
    textVn: '**Tay kia** giữ **Shift**.',
    sub: 'You are typing **Hanoi**. Tap the Shift you hold for the capital **H**.',
    subVn: 'Em đang gõ **Hanoi**. Chạm vào phím Shift em giữ để gõ chữ **H** in hoa.',
    activity: {
      id: 'act_shift_h',
      type: 'hotspot',
      prompt: 'You are typing Hanoi. Tap the Shift key you hold down for the capital H.',
      promptVn: 'Em đang gõ chữ Hanoi. Chạm vào phím Shift em giữ để gõ chữ H in hoa.',
      svg: DIAGRAMS.KEYBOARD,
      viewBox: '0 0 900 330',
      targets: keyTargets({
        say: {
          rshift: ['The right Shift — but H is typed by your RIGHT hand, so that hand is busy', 'Phím Shift phải — nhưng chữ H do tay PHẢI gõ, nên tay đó đang bận'],
          caps: ['Caps Lock — it turns capitals on for EVERY letter until you press it again', 'Caps Lock — nó bật chữ in hoa cho MỌI chữ cho đến khi em bấm lại'],
          h: ['H — the letter itself: hold Shift first, then press it', 'H — chính là chữ đó: giữ Shift trước, rồi mới bấm nó'],
        },
      }),
      correct: 'lshift',
      explain: '**H** is a right-hand key — your right index finger reaches across to it — so your **left** little finger holds the **left Shift**. One hand holds, the other types, and neither hand leaves the home row. (**Caps Lock** is for when every letter must be a capital; for one capital, use Shift.)',
      explainVn: '**H** là phím của tay phải — ngón trỏ tay phải với sang nó — nên ngón út tay **trái** giữ phím **Shift trái**. Một tay giữ, tay kia gõ, và không tay nào phải rời hàng phím cơ sở. (**Caps Lock** dùng khi mọi chữ đều phải in hoa; muốn một chữ in hoa thì dùng Shift.)',
    },
  },

  // 18 ─ Enter and Backspace + CHECK ──────────────────────────────────────────
  {
    layout: 'statement',
    accent: AMBER,
    icon: 'Move',
    eyebrow: 'Two big keys',
    eyebrowVn: 'Hai phím lớn',
    title: 'Enter and Backspace',
    titleVn: 'Enter và Backspace',
    label: 'Key idea',
    labelVn: 'Ý chính',
    labelIcon: 'Hand',
    text: 'Both belong to your **right little finger**.',
    textVn: 'Cả hai thuộc về **ngón út tay phải**.',
    sub: 'Reach **right** to Enter, **up** to Backspace, then back to ;. A mistake? **Backspace** it at once.',
    subVn: 'Với **sang phải** tới Enter, **lên trên** tới Backspace, rồi về phím ;. Gõ sai? Bấm **Backspace** ngay.',
    check: {
      id: 'chk_enter',
      q: 'You have finished a line and want to start a new one. Which finger presses **Enter**?',
      qVn: 'Em đã gõ xong một dòng và muốn sang dòng mới. Ngón nào bấm phím **Enter**?',
      options: [
        { val: 'A', text: 'Your right thumb', textVn: 'Ngón cái tay phải' },
        { val: 'B', text: 'Your left little finger', textVn: 'Ngón út tay trái' },
        { val: 'C', text: 'Your right index finger', textVn: 'Ngón trỏ tay phải' },
        { val: 'D', text: 'Your right little finger', textVn: 'Ngón út tay phải' },
      ],
      correct: 'D',
      expEn: 'Enter is at the right-hand end of the home row, just past ; and \', so it is a short reach to the right for your **right little finger** — which then comes straight back to ;. Your index finger (C) would have to leave home and cross the whole hand, and the thumbs (A) stay on the space bar.',
      expVn: 'Enter nằm ở đầu bên phải của hàng phím cơ sở, ngay sau ; và \', nên đó là một lần với ngắn sang phải của **ngón út tay phải** — rồi ngón út trở về phím ; ngay. Ngón trỏ (C) sẽ phải rời chỗ và vượt qua cả bàn tay, còn ngón cái (A) thì luôn ở trên phím cách.',
    },
  },

  // 19 ─ Full stops, commas, question marks (PUNCT) ───────────────────────────
  {
    layout: 'showcase',
    icon: 'Quote',
    accent: PURPLE,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Full Stops, Commas, Question Marks',
    titleVn: 'Dấu chấm, dấu phẩy, dấu chấm hỏi',
    inlineSvg: DIAGRAMS.PUNCT,
    caption: 'The **comma** and the **full stop** are in the bottom row, under your right hand: the comma for your **middle** finger, the full stop for your **ring** finger. A key with **two** marks gives the bottom one when you just press it, and the **top** one with **Shift** — so **?** is Shift + /, with the **left** Shift, because / is a right-hand key. After a full stop: **one space**, then a **capital letter**.',
    captionVn: '**Dấu phẩy** và **dấu chấm** nằm ở hàng dưới, dưới tay phải: dấu phẩy do ngón **giữa**, dấu chấm do ngón **áp út**. Phím có **hai** ký hiệu thì bấm thường sẽ ra ký hiệu ở dưới, còn giữ **Shift** sẽ ra ký hiệu ở **trên** — vì vậy **?** là Shift + /, dùng Shift **bên trái**, vì / là phím của tay phải. Sau dấu chấm: **một dấu cách**, rồi đến **chữ in hoa**.',
  },

  // 20 ─ SORT — Shift, or no Shift? ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'Sort it',
    eyebrowVn: 'Sắp xếp',
    title: 'Shift, or No Shift?',
    titleVn: 'Có cần Shift không?',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Layers',
    text: 'Some marks need **Shift**, and some do not.',
    textVn: 'Có ký hiệu cần giữ **Shift**, có ký hiệu thì không.',
    sub: 'Sort the eight.',
    subVn: 'Hãy sắp xếp tám ký hiệu.',
    activity: {
      id: 'act_shift_marks',
      type: 'sort',
      prompt: 'Do you just press the key, or hold Shift?',
      promptVn: 'Em chỉ cần bấm phím, hay phải giữ Shift?',
      bins: [
        { id: 'plain', name: 'Just press the key', nameVn: 'Chỉ cần bấm phím' },
        { id: 'shift', name: 'Hold Shift', nameVn: 'Giữ Shift' },
      ],
      cards: [
        { id: 'stop', name: 'Full stop ( . )', nameVn: 'Dấu chấm ( . )', bin: 'plain' },
        { id: 'question', name: 'Question mark ( ? )', nameVn: 'Dấu chấm hỏi ( ? )', bin: 'shift' },
        { id: 'comma', name: 'Comma ( , )', nameVn: 'Dấu phẩy ( , )', bin: 'plain' },
        { id: 'excl', name: 'Exclamation mark ( ! )', nameVn: 'Dấu chấm than ( ! )', bin: 'shift' },
        { id: 'apos', name: 'Apostrophe ( \' )', nameVn: 'Dấu nháy đơn ( \' )', bin: 'plain' },
        { id: 'capital', name: 'A capital letter ( A )', nameVn: 'Một chữ in hoa ( A )', bin: 'shift' },
        { id: 'semi', name: 'Semicolon ( ; )', nameVn: 'Dấu chấm phẩy ( ; )', bin: 'plain' },
        { id: 'colon', name: 'Colon ( : )', nameVn: 'Dấu hai chấm ( : )', bin: 'shift' },
      ],
      explain: 'A key with two marks gives its **bottom** mark when you just press it, and its **top** mark with **Shift**. So the full stop, comma, apostrophe and semicolon need no Shift, while **?** (over /), **!** (over 1) and **:** (over ;) do — and so does every capital letter.',
      explainVn: 'Phím có hai ký hiệu thì bấm thường ra ký hiệu **ở dưới**, giữ **Shift** thì ra ký hiệu **ở trên**. Vì vậy dấu chấm, dấu phẩy, dấu nháy đơn và dấu chấm phẩy không cần Shift, còn **?** (trên phím /), **!** (trên phím 1) và **:** (trên phím ;) thì cần — và mọi chữ in hoa cũng vậy.',
    },
  },

  // 21 ─ Accuracy first + ESTIMATE ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Right first',
    eyebrowVn: 'Đúng trước',
    title: 'Accuracy First, Then Speed',
    titleVn: 'Chính xác trước, tốc độ sau',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Target',
    text: 'Rushing makes you **slower**.',
    textVn: 'Gõ vội lại **chậm hơn**.',
    sub: 'You press **50** keys and **5** are wrong. How many in every **100** are right?',
    subVn: 'Em bấm **50** phím và **5** phím sai. Cứ **100** phím thì bao nhiêu phím đúng?',
    activity: {
      id: 'act_accuracy',
      type: 'estimate',
      prompt: 'You press 50 keys and 5 of them are wrong. How many out of every 100 keys are right?',
      promptVn: 'Em bấm 50 phím và 5 phím bị sai. Cứ 100 phím thì có bao nhiêu phím đúng?',
      min: 50, max: 100, step: 5, unit: '%', answer: 90, tolerance: 0.03,
      explain: '**45** right out of **50** is the same as **90** out of **100**: **90% accuracy**. That is exactly the Typing Gym’s goal for this unit — **90% right**, at **8 words a minute**. Reach the 90% first; the speed follows.',
      explainVn: '**45** phím đúng trên **50** cũng giống như **90** trên **100**: **độ chính xác 90%**. Đó chính là mục tiêu của Phòng tập gõ phím trong bài này — **đúng 90%**, với **8 từ mỗi phút**. Hãy đạt 90% trước; tốc độ sẽ theo sau.',
    },
  },

  // 22 ─ Reading a result (GYM_RESULT) + CHECK ────────────────────────────────
  {
    layout: 'split',
    icon: 'Gauge',
    accent: GREEN,
    ratio: 45,
    eyebrow: 'Read your result',
    eyebrowVn: 'Đọc kết quả của em',
    title: 'What Should Ha Vi Do Next?',
    titleVn: 'Hà Vi nên làm gì tiếp theo?',
    content: 'At the end of the Typing Gym you get **two numbers**: your **speed** (words a minute) and how many keys were **right** (out of every 100). Each one has a goal.\n\nThis is Ha Vi’s result.',
    contentVn: 'Cuối mỗi buổi ở Phòng tập gõ phím, em nhận được **hai con số**: **tốc độ** (số từ mỗi phút) và số phím **đúng** (trên mỗi 100 phím). Mỗi con số có một mục tiêu.\n\nĐây là kết quả của Hà Vi.',
    inlineSvg: DIAGRAMS.GYM_RESULT,
    check: {
      id: 'chk_result',
      q: 'Ha Vi typed **14 words a minute** with **72% right**. What should she do next time?',
      qVn: 'Hà Vi gõ được **14 từ mỗi phút** và **đúng 72%**. Lần sau bạn ấy nên làm gì?',
      options: [
        { val: 'A', text: 'Go even faster — speed is what counts.', textVn: 'Gõ nhanh hơn nữa — tốc độ mới là điều quan trọng.' },
        { val: 'B', text: 'Slow down a little and aim for fewer wrong keys.', textVn: 'Chậm lại một chút và cố gõ sai ít phím hơn.' },
        { val: 'C', text: 'Look at her hands, so she makes no mistakes.', textVn: 'Nhìn vào tay mình, để không gõ sai.' },
        { val: 'D', text: 'Nothing — 14 is more than the goal of 8.', textVn: 'Không cần làm gì — 14 đã hơn mục tiêu 8 rồi.' },
      ],
      correct: 'B',
      expEn: 'Her speed is already past the goal of 8, but 72% is far below 90%: more than one key in four is wrong. Slowing down a little brings the wrong keys down and her score up — the Gym counts accuracy for 70% of the score and speed for only 30%. Looking at her hands (C) would slow her down and build the wrong habit.',
      expVn: 'Tốc độ của bạn ấy đã vượt mục tiêu 8, nhưng 72% còn thấp hơn nhiều so với 90%: cứ bốn phím thì hơn một phím sai. Chậm lại một chút sẽ giảm số phím sai và tăng điểm — Phòng tập tính độ chính xác 70% số điểm, còn tốc độ chỉ 30%. Nhìn vào tay (C) sẽ làm bạn ấy chậm đi và tạo thói quen sai.',
    },
  },

  // 23 ─ Little and often + PREDICT ───────────────────────────────────────────
  {
    layout: 'callout',
    icon: 'Timer',
    accent: GREEN,
    eyebrow: 'How practice works',
    eyebrowVn: 'Luyện tập thế nào cho hiệu quả',
    title: 'Little and Often',
    titleVn: 'Ít một, nhưng thường xuyên',
    content: 'Your fingers learn by **repeating**. Ten minutes **every day** teaches them more than one long go a week — and the Typing Gym gives you **new lines every time**, so it is always practice, never memory.',
    contentVn: 'Các ngón tay học bằng cách **lặp lại**. Mười phút **mỗi ngày** dạy chúng nhiều hơn một buổi thật dài mỗi tuần — và Phòng tập gõ phím luôn cho em **những dòng mới**, nên đó luôn là luyện tập thật, không phải học thuộc.',
    activity: {
      id: 'act_little_often',
      type: 'predict',
      prompt: 'Two friends want to type well by the end of the month. Minh practises for one hour every Saturday. Lan practises for ten minutes every day. Who will type better at the end of the month?',
      promptVn: 'Hai bạn muốn gõ phím giỏi vào cuối tháng. Minh luyện tập một giờ vào mỗi thứ Bảy. Lan luyện tập mười phút mỗi ngày. Cuối tháng, ai sẽ gõ giỏi hơn?',
      options: [
        { val: 'minh', name: 'Minh — an hour is a long practice', nameVn: 'Minh — một giờ là buổi tập dài' },
        { val: 'lan', name: 'Lan — a little every day', nameVn: 'Lan — mỗi ngày một ít' },
        { val: 'same', name: 'They will be just the same', nameVn: 'Hai bạn sẽ như nhau' },
        { val: 'unknown', name: 'Nobody can tell', nameVn: 'Không thể biết được' },
      ],
      correct: 'lan',
      explain: 'Lan’s fingers repeat the moves **every day**, before they have time to forget them — and she even practises more in total: about **5 hours** in a month, against Minh’s **4**. A long go once a week lets the fingers forget in between, and a tired typist makes more mistakes near the end.',
      explainVn: 'Các ngón tay của Lan lặp lại động tác **mỗi ngày**, trước khi kịp quên — và tính ra bạn ấy còn luyện tập nhiều hơn: khoảng **5 giờ** mỗi tháng, so với **4 giờ** của Minh. Một buổi dài mỗi tuần khiến các ngón tay quên mất giữa các buổi, và người gõ khi mệt sẽ sai nhiều hơn về cuối.',
    },
  },

  // 24 ─ Eyes on the screen (GYM_SCREEN) + CHECK ──────────────────────────────
  {
    layout: 'split',
    icon: 'Eye',
    accent: SKY,
    ratio: 45,
    eyebrow: 'Don’t look down',
    eyebrowVn: 'Đừng nhìn xuống',
    title: 'Eyes on the Screen',
    titleVn: 'Mắt nhìn màn hình',
    content: 'Your hands find their keys by **touch** — the bumps — so your eyes can stay on the **screen**. That is where your mistakes show up. In the Typing Gym, a wrong key flashes **red**, and the keyboard on the screen **lights the key you want**.',
    contentVn: 'Hai tay em tìm phím bằng **cảm giác** — nhờ các gờ nổi — nên mắt em có thể nhìn **màn hình**. Lỗi sai hiện ra ở đó. Trong Phòng tập gõ phím, phím sai sẽ loé **đỏ**, và bàn phím trên màn hình **sáng lên ở phím em cần gõ**.',
    inlineSvg: DIAGRAMS.GYM_SCREEN,
    notes: [
      {
        tone: 'task',
        text: 'A trick for home: lay a **tea towel** over your hands while you practise. You cannot peek, so your fingers have to learn the way.',
        textVn: 'Một mẹo khi ở nhà: phủ một chiếc **khăn** lên hai tay khi luyện tập. Em không thể nhìn trộm, nên các ngón tay buộc phải tự nhớ đường.',
      },
    ],
    check: {
      id: 'chk_eyes',
      q: 'How can you tell that you pressed a wrong key, **without** looking down at your hands?',
      qVn: 'Làm sao em biết mình vừa bấm sai phím, mà **không** nhìn xuống tay?',
      options: [
        { val: 'A', text: 'Look down after every word, just to check.', textVn: 'Nhìn xuống sau mỗi từ, để kiểm tra cho chắc.' },
        { val: 'B', text: 'Ask a friend to watch your hands.', textVn: 'Nhờ một bạn nhìn tay giúp em.' },
        { val: 'C', text: 'You cannot — you have to look at your hands.', textVn: 'Không thể biết được — em phải nhìn tay.' },
        { val: 'D', text: 'Watch the screen: the wrong letter shows up there straight away.', textVn: 'Nhìn màn hình: chữ sai hiện lên ở đó ngay lập tức.' },
      ],
      correct: 'D',
      expEn: 'Everything you type appears on the **screen**, so that is where mistakes show — in the Typing Gym, as a red key. Your hands never need watching: the bumps tell them where they are. Looking down (A) is exactly the habit this unit is here to break.',
      expVn: 'Mọi thứ em gõ đều hiện lên **màn hình**, nên lỗi sai hiện ra ở đó — trong Phòng tập gõ phím là một phím đỏ. Hai tay không bao giờ cần ai nhìn: các gờ nổi cho chúng biết chúng đang ở đâu. Nhìn xuống (A) chính là thói quen mà bài này muốn bỏ.',
    },
  },

  // 25 ─ Checklist + CHECK (the exit question) ────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: SKY,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: 'Next: the Vocab, then the **Typing Gym** — ten rounds, new lines every time. Your goal: **8 words a minute, 90% right**.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Phòng tập gõ phím** — mười lượt, mỗi lần là những dòng mới. Mục tiêu của em: **8 từ mỗi phút, đúng 90%**.',
    items: [
      { text: 'Sit well: **feet flat**, **back straight**, **wrists** floating, the **screen** at eye level.', textVn: 'Ngồi đúng: **bàn chân đặt phẳng**, **lưng thẳng**, **cổ tay** nâng nhẹ, **màn hình** ngang tầm mắt.' },
      { text: 'Switch the keyboard to **EN** before you type English.', textVn: 'Chuyển bàn phím sang **EN** trước khi gõ tiếng Anh.' },
      { text: 'Find the **home row** by the **bumps** on F and J, and keep every finger on its own keys.', textVn: 'Tìm **hàng phím cơ sở** nhờ **gờ nổi** trên F và J, và giữ mỗi ngón tay trên những phím của nó.' },
      { text: '**Reach and come home**, use the **other hand’s Shift** for capitals, and tap the **space bar** with a thumb.', textVn: '**Với ra rồi trở về**, dùng **Shift của tay kia** cho chữ in hoa, và chạm **phím cách** bằng ngón cái.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Which typist is doing **everything** right?',
      qVn: 'Người gõ nào đang làm đúng **tất cả**?',
      options: [
        { val: 'A', text: 'Minh: Telex on, eyes on his hands, one finger, very fast.', textVn: 'Minh: bật Telex, mắt nhìn tay, gõ một ngón, rất nhanh.' },
        { val: 'B', text: 'Mai: EN on, all ten fingers — but she looks down to check every letter.', textVn: 'Mai: bật EN, gõ cả mười ngón — nhưng nhìn xuống kiểm tra từng chữ.' },
        { val: 'C', text: 'Lan: EN on, fingers on the home row, eyes on the screen, going steadily.', textVn: 'Lan: bật EN, các ngón tay trên hàng phím cơ sở, mắt nhìn màn hình, gõ đều đặn.' },
        { val: 'D', text: 'Nam: EN on, eyes on the screen — but every key with his two index fingers.', textVn: 'Nam: bật EN, mắt nhìn màn hình — nhưng gõ mọi phím bằng hai ngón trỏ.' },
      ],
      correct: 'C',
      expEn: 'Only **Lan** does it all: English keyboard, fingers home, eyes up, steady. Minh (A) breaks every rule. Mai (B) has the fingers but not the eyes — every look down costs her twice. Nam (D) has the eyes but not the fingers: two fingers cannot own every key, so his hands never stop travelling.',
      expVn: 'Chỉ có **Lan** làm đúng tất cả: bàn phím tiếng Anh, ngón tay ở hàng cơ sở, mắt nhìn lên, gõ đều. Minh (A) sai mọi quy tắc. Mai (B) đúng về ngón tay nhưng sai về mắt — mỗi lần nhìn xuống khiến bạn ấy mất gấp đôi. Nam (D) đúng về mắt nhưng sai về ngón tay: hai ngón không thể phụ trách mọi phím, nên tay bạn ấy phải di chuyển liên tục.',
    },
  },

  // 26 ─ On your own computer (unassessed, always last) ───────────────────────
  {
    layout: 'stack',
    columns: 3,
    icon: 'Sparkles',
    accent: GREEN,
    eyebrow: 'On your own computer',
    eyebrowVn: 'Trên máy tính của em',
    title: 'Do This for Real, Today',
    titleVn: 'Hãy làm thật, ngay hôm nay',
    content: 'That was a pretend keyboard. Now do it on a real one — that is what teaches your fingers.',
    contentVn: 'Đó chỉ là bàn phím giả. Giờ hãy làm trên bàn phím thật — đó mới là điều dạy các ngón tay của em.',
    notes: [
      {
        tone: 'task',
        text: 'Sit well. Then look near the **clock** and switch the keyboard to **EN**.',
        textVn: 'Ngồi đúng tư thế. Rồi nhìn gần **đồng hồ** và chuyển bàn phím sang **EN**.',
      },
      {
        tone: 'task',
        text: 'Close your eyes and find the **bumps** on F and J with your index fingers. Rest all eight fingers on the home row.',
        textVn: 'Nhắm mắt lại và dùng hai ngón trỏ tìm **gờ nổi** trên F và J. Đặt cả tám ngón tay lên hàng phím cơ sở.',
      },
      {
        tone: 'task',
        text: 'Open a document and type your **full name** — capitals with the **other hand’s Shift** — without looking down. Then look: did it come out right?',
        textVn: 'Mở một tài liệu và gõ **họ tên đầy đủ** của em — chữ in hoa dùng **Shift của tay kia** — mà không nhìn xuống. Rồi hãy nhìn lên: em gõ có đúng không?',
      },
    ],
  },
];
