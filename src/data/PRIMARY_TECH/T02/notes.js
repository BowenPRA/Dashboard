// src/data/PRIMARY_TECH/T02/notes.js
// T2 Mouse, Keys and Windows — the self-study deck (NOTES), built to the Year 7
// standard (docs/primary-tech/UPGRADE-PLAN.md §4 and the §8.3 T2 spine). 24
// layout slides; 16 scored items — 6 checks and 10 activities (hotspot ·
// estimate · sort · predict · order) — so the student does something every
// slide or two. Two slides are the simulator in demo mode (Show), on the same
// `desktop` skin the Try It task hands them next (Do).
//
// SPINE:
//   1–2    hero; hotspot — the button you press most (a drawn mouse, no words)
//   3–7    meet the mouse (LB_MOUSE) + check — which part scrolls a page?; the
//          four moves (steps, MOUSE_MOVES, "it only turned blue" reveal);
//          estimate — how quick is a double-click?; sort — eight jobs into
//          click / double-click / right-click / drag; no mouse? (TOUCH, a
//          touch screen and a touchpad) + check — press and hold = right-click
//   8–11   DEMO right-click ▸ Delete, right-click the desktop ▸ New folder,
//          type, Enter, double-click it open; a menu for the thing you clicked
//          (RIGHT_CLICK) + predict — right-click a WORD; drag and drop (steps,
//          DRAG, "it landed in the wrong place" reveal); order — the drag
//   12–15  the window on top (LB_WINDOW_PAIR, "active window"); hotspot —
//          where do the keys go? (TWO_WINDOWS: the Calculator is on top, the
//          story behind); DEMO double-click Paint, switch from the taskbar, by
//          clicking, by minimising; back to the story + check
//   16–22  keys that do a job (LB_KEYS, an English slide); hotspot — Backspace
//          (KEYBOARD); Backspace or Delete? (CURSOR) + check; Shift or Caps
//          Lock? (SHIFT_CAPS) + predict — the password with Caps Lock on;
//          Ctrl shortcuts (CTRL_KEYS) + check — what the + means; sort — which
//          shortcut; Esc, the way out + hotspot — Esc (KEYBOARD)
//   23–24  the checklist with the exit check; "On your own computer" (last,
//          unassessed — docs/digital-skills-course.md §5.4)
//
// House notes:
//  · Every slide's `check:` or `activity:` is its LAST key; no slide has both.
//  · Activity strings use name/explain, never text/content (the narration
//    generator reads text/content aloud).
//  · Hotspots strip every <text> not tagged class="keep", so the words that are
//    part of a picture (window titles, the words on the keys) are keep in
//    diagrams.js, and every hotspot asks by JOB ("the key that rubs out the
//    letter before the cursor"), never by the word printed on the thing. Every
//    plausible part is a target, so a wrong tap is NAMED, not just marked.
//  · A picture that must be READ and carries a check or activity sits on a
//    `split`, never a `showcase` (docs/lesson-renderer-gap.md §0).
//  · The demos' widget params follow the `desktop` skin's action table
//    (UPGRADE-PLAN §3.1, §8.2) — the same actions sim.js is written in — and
//    the validator replays them: a step the engine ignores is an error.
//  · Two ways to do everything (§4.9): the icon and the menu; drag, right-click
//    ▸ Delete and the Delete key; the taskbar button and a click on the window;
//    a mouse, a touch screen and a touchpad; Ctrl on a PC and Cmd on a Mac.
//
// Slide audio is DERIVED from position (slideAudioUrl), so inserting a slide
// shifts the narration of every slide after it — delete the unit's audio folder
// and re-run `npm run sync-audio` after any change to the slide order.
import { DIAGRAMS } from './diagrams.js';

const SKY = '#0ea5e9';
const DEMO = '#0284c7';
const PURPLE = '#a855f7';
const AMBER = '#f59e0b';
const GREEN = '#10b981';
const TEAL = '#0891b2';

/**
 * Hotspot targets are circles, and a key or a window is not: a long thing is a
 * row of circles that all share one id and name — any of them is a hit on that
 * thing. The FIRST circle of an id is where the answer ring is drawn.
 */
const along = (id, name, nameVn, y, r, xs) => xs.map((x) => ({ id, x, y, r, name, nameVn }));

/** A box covered by a grid of circles, all one id. */
const grid = (id, name, nameVn, xs, ys, r) => ys.flatMap((y) => along(id, name, nameVn, y, r, xs));

/** Every key on KEYBOARD, named by its job (key centres from diagrams.js). */
const KEY_NAMES = {
  esc: ['Esc — it backs out: it closes a menu or a box without choosing anything', 'Esc — phím thoát: nó đóng trình đơn hay hộp thoại mà không chọn gì cả'],
  delete: ['Delete — it rubs out the letter AFTER the cursor', 'Delete — nó xóa chữ cái nằm SAU con trỏ'],
  backspace: ['Backspace — it rubs out the letter BEFORE the cursor', 'Backspace — nó xóa chữ cái nằm TRƯỚC con trỏ'],
  enter: ['Enter — it starts a new line, or says yes to a box', 'Enter — nó xuống dòng mới, hoặc đồng ý với một hộp thoại'],
  shift: ['Shift — hold it for ONE capital letter', 'Shift — giữ phím này để viết hoa MỘT chữ cái'],
  capslock: ['Caps Lock — every letter a capital, until you press it again', 'Caps Lock — mọi chữ cái đều viết hoa, cho đến khi em bấm lại'],
  ctrl: ['Ctrl — hold it with a letter for a shortcut, like Ctrl+S', 'Ctrl — giữ phím này cùng một chữ cái để dùng phím tắt, như Ctrl+S'],
  space: ['the space bar — it puts a gap between words', 'phím cách — nó tạo khoảng trống giữa các từ'],
  tab: ['Tab — it jumps to the next box', 'Tab — nó nhảy sang ô tiếp theo'],
  letter: ['a letter key — it types that letter', 'một phím chữ — nó gõ ra chữ cái đó'],
  number: ['a number key — it types that number or mark', 'một phím số — nó gõ ra số hoặc dấu đó'],
  fkey: ['a function key (F1 to F12) — a shortcut for a program', 'một phím chức năng (F1 đến F12) — phím tắt của chương trình'],
  other: ['Fn or Alt — keys for other shortcuts', 'Fn hoặc Alt — các phím dùng cho phím tắt khác'],
  arrow: ['an arrow key — it moves the cursor without rubbing anything out', 'một phím mũi tên — nó di chuyển con trỏ mà không xóa gì cả'],
};
const key = (id, xs, y, r = 22) => along(id, ...KEY_NAMES[id], y, r, xs);
const KEY_TARGETS = [
  ...key('esc', [50], 32, 20),
  ...key('delete', [710], 32, 20),
  ...key('fkey', [116, 164, 212, 260, 308, 356, 404, 452, 500, 548, 596, 644], 32, 18),
  ...key('backspace', [692, 668, 716], 76),
  ...key('number', [44, 92, 140, 188, 236, 284, 332, 380, 428, 476, 524, 572, 620], 76),
  ...key('tab', [40, 72], 124),
  ...key('letter', [116, 164, 212, 260, 308, 356, 404, 452, 500, 548, 596, 644, 704], 124),
  ...key('capslock', [62, 44, 80], 172),
  ...key('letter', [128, 176, 224, 272, 320, 368, 416, 464, 512, 560, 608], 172),
  ...key('enter', [686, 660, 712], 172),
  ...key('shift', [74, 50, 98, 634, 674, 714], 220),
  ...key('letter', [152, 200, 248, 296, 344, 392, 440, 488, 536, 584], 220),
  ...key('ctrl', [56, 40, 72, 572], 268),
  ...key('other', [116, 170, 518], 268),
  ...key('space', [344, 224, 264, 304, 384, 424, 464], 268),
  ...key('arrow', [620, 716], 268),
  ...key('arrow', [668], 257, 11),
  ...key('arrow', [668], 280, 11),
];

// TWO_WINDOWS: the Calculator (400–680 × 120–410) on top of the story (130–560
// × 40–360). Listed Calculator first, because the first circle a tap falls in
// wins and the story's circles reach under the Calculator's edge.
const CALC_NAME = ['the Calculator — it is on top, so every key goes to it', 'Calculator — nó ở trên cùng, nên mọi phím bấm đều đi vào nó'];
const STORY_NAME = ['the story — it is BEHIND, so it gets nothing until you click it', 'truyện — nó ở PHÍA SAU, nên không nhận được gì cho đến khi em bấm vào nó'];
const DESK_NAME = ['the desktop — not a window at all', 'màn hình nền — hoàn toàn không phải cửa sổ'];
const WINDOW_TARGETS = [
  ...grid('calc', ...CALC_NAME, [432, 482, 532, 582, 632, 656], [152, 202, 252, 302, 352, 384], 36),
  ...along('calc', 'the Calculator’s taskbar button — lit, because the Calculator is the active window', 'nút của Calculator trên thanh tác vụ — đang sáng, vì Calculator là cửa sổ đang dùng', 466, 20, [270, 222, 318]),
  ...grid('story', ...STORY_NAME, [175, 255, 335], [88, 168, 248, 318], 57),
  ...along('story', ...STORY_NAME, 80, 40, [430, 505]),
  ...along('storybtn', 'the story’s taskbar button — clicking it WOULD bring the story forward, but nobody has clicked it yet', 'nút của truyện trên thanh tác vụ — bấm vào SẼ đưa truyện lên trước, nhưng chưa ai bấm cả', 466, 20, [132, 92, 172]),
  { id: 'icon', x: 64, y: 72, r: 36, name: 'an icon on the desktop — not a window', nameVn: 'một biểu tượng trên màn hình nền — không phải cửa sổ' },
  { id: 'menu', x: 40, y: 466, r: 18, name: 'the menu button', nameVn: 'nút trình đơn' },
  { id: 'clock', x: 748, y: 468, r: 24, name: 'the clock', nameVn: 'đồng hồ' },
  ...along('taskbar', 'an empty part of the taskbar', 'một chỗ trống trên thanh tác vụ', 466, 22, [380, 430, 480, 530, 580, 630, 680]),
  { id: 'desktop', x: 64, y: 200, r: 55, name: DESK_NAME[0], nameVn: DESK_NAME[1] },
  { id: 'desktop', x: 64, y: 300, r: 55, name: DESK_NAME[0], nameVn: DESK_NAME[1] },
  { id: 'desktop', x: 64, y: 400, r: 36, name: DESK_NAME[0], nameVn: DESK_NAME[1] },
  { id: 'desktop', x: 620, y: 70, r: 48, name: DESK_NAME[0], nameVn: DESK_NAME[1] },
  ...along('desktop', ...DESK_NAME, 400, 36, [170, 250, 330]),
  { id: 'desktop', x: 738, y: 170, r: 55, name: DESK_NAME[0], nameVn: DESK_NAME[1] },
  { id: 'desktop', x: 738, y: 280, r: 55, name: DESK_NAME[0], nameVn: DESK_NAME[1] },
  { id: 'desktop', x: 738, y: 390, r: 45, name: DESK_NAME[0], nameVn: DESK_NAME[1] },
];

export const notes = [
  // 1 ─ Hero ──────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: SKY,
    icon: 'MousePointerClick',
    brand: 'Technology',
    brandVn: 'Công nghệ',
    eyebrow: 'Unit T2',
    eyebrowVn: 'Bài T2',
    title: 'Mouse, Keys and Windows',
    titleVn: 'Chuột, Bàn phím và Cửa sổ',
    objective: 'Click, double-click, right-click and drag — with a mouse, a touch screen or a touchpad; use the keys that do a job; and switch between windows without closing anything.',
    objectiveVn: 'Bấm chuột, bấm đúp, bấm chuột phải và kéo thả — bằng chuột, màn hình cảm ứng hoặc bàn di chuột; dùng những phím có nhiệm vụ riêng; và chuyển qua lại giữa các cửa sổ mà không đóng thứ gì.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **tap**, **guess**, **sort**, **order** and **predict** your way through it, and watch the computer do each job first. **16 things are scored** — the first one is on the next slide.',
      textVn: 'Em sẽ **chạm**, **đoán**, **sắp xếp**, **xếp thứ tự** và **dự đoán** trong suốt bài học, và được xem máy tính làm từng việc trước. **16 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: HOTSPOT — the button you press most ──────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'MousePointerClick',
    eyebrow: 'Start with what you know',
    eyebrowVn: 'Bắt đầu từ điều em đã biết',
    title: 'The Button You Press Most',
    titleVn: 'Nút em bấm nhiều nhất',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'A mouse has two buttons and a little wheel. You will press one of them far more than anything else.',
    textVn: 'Con chuột có hai nút và một bánh xe nhỏ. Có một nút em sẽ bấm nhiều hơn hẳn mọi thứ khác.',
    sub: 'Which one? Tap it on the mouse.',
    subVn: 'Nút nào? Hãy chạm vào nó trên con chuột.',
    activity: {
      id: 'act_main_button',
      type: 'hotspot',
      prompt: 'Tap the part of the mouse you press most often.',
      promptVn: 'Chạm vào phần của con chuột mà em bấm thường xuyên nhất.',
      svg: DIAGRAMS.MOUSE,
      viewBox: '0 0 480 420',
      targets: [
        { id: 'wheel', x: 240, y: 138, r: 15, name: 'the scroll wheel — you roll it to move up and down a page', nameVn: 'con lăn chuột — em lăn nó để kéo trang lên xuống' },
        { id: 'wheel', x: 240, y: 170, r: 15, name: 'the scroll wheel — you roll it to move up and down a page', nameVn: 'con lăn chuột — em lăn nó để kéo trang lên xuống' },
        { id: 'left', x: 186, y: 175, r: 44, name: 'the left button — a click, a double-click and a drag all use it', nameVn: 'nút trái — bấm chuột, bấm đúp và kéo thả đều dùng nút này' },
        { id: 'left', x: 210, y: 125, r: 26, name: 'the left button — a click, a double-click and a drag all use it', nameVn: 'nút trái — bấm chuột, bấm đúp và kéo thả đều dùng nút này' },
        { id: 'right', x: 294, y: 175, r: 44, name: 'the right button — you use it now and then, to open a menu', nameVn: 'nút phải — thỉnh thoảng mới dùng, để mở một trình đơn' },
        { id: 'right', x: 270, y: 125, r: 26, name: 'the right button — you use it now and then, to open a menu', nameVn: 'nút phải — thỉnh thoảng mới dùng, để mở một trình đơn' },
        { id: 'cable', x: 239, y: 89, r: 13, name: 'the cable — it joins the mouse to the computer', nameVn: 'dây cáp — nó nối chuột với máy tính' },
        { id: 'cable', x: 231, y: 70, r: 13, name: 'the cable — it joins the mouse to the computer', nameVn: 'dây cáp — nó nối chuột với máy tính' },
        { id: 'cable', x: 219, y: 55, r: 13, name: 'the cable — it joins the mouse to the computer', nameVn: 'dây cáp — nó nối chuột với máy tính' },
        { id: 'cable', x: 205, y: 40, r: 13, name: 'the cable — it joins the mouse to the computer', nameVn: 'dây cáp — nó nối chuột với máy tính' },
        { id: 'cable', x: 194, y: 21, r: 13, name: 'the cable — it joins the mouse to the computer', nameVn: 'dây cáp — nó nối chuột với máy tính' },
        { id: 'body', x: 240, y: 300, r: 90, name: 'the body of the mouse — your palm rests here', nameVn: 'thân chuột — lòng bàn tay em đặt ở đây' },
      ],
      correct: 'left',
      explain: 'The **left button**. A click, a double-click and a drag all use it — so when anyone says "click", they mean the left button. The **right button** opens a menu now and then, and the **wheel** rolls a long page up and down.',
      explainVn: '**Nút trái**. Bấm chuột, bấm đúp và kéo thả đều dùng nút này — nên khi ai đó nói "bấm chuột" (click), họ muốn nói nút trái. **Nút phải** thỉnh thoảng mới dùng để mở trình đơn, còn **con lăn** thì kéo một trang dài lên xuống.',
    },
  },

  // 3 ─ Meet the mouse (LB_MOUSE) + CHECK ─────────────────────────────────────
  {
    layout: 'split',
    icon: 'MousePointerClick',
    accent: SKY,
    ratio: 50,
    title: 'Meet the Mouse',
    titleVn: 'Làm quen với con chuột',
    content: 'Move the mouse on the desk, and the **pointer** — the little arrow on the screen — moves the same way. Whatever the pointer is on is what your click lands on.',
    contentVn: 'Di chuột trên bàn, và **con trỏ chuột** — mũi tên nhỏ trên màn hình — di chuyển theo đúng hướng đó. Con trỏ đang nằm trên thứ gì thì cú bấm của em rơi vào thứ đó.',
    inlineSvg: DIAGRAMS.LB_MOUSE,
    notes: [
      {
        tone: 'write',
        text: '**Pointer:** the arrow on the screen that follows the mouse.\n**Left button:** the one you press most — to click, double-click and drag.\n**Right button:** opens a menu.\n**Scroll wheel:** rolls a long page up and down.',
        textVn: '**Con trỏ chuột (pointer):** mũi tên trên màn hình đi theo con chuột.\n**Nút trái (left button):** nút em bấm nhiều nhất — để bấm, bấm đúp và kéo thả.\n**Nút phải (right button):** mở một trình đơn.\n**Con lăn chuột (scroll wheel):** kéo một trang dài lên và xuống.',
      },
    ],
    check: {
      id: 'chk_scroll',
      q: 'You are reading a long web page and want to see the bottom of it. Which part of the mouse do you use?',
      qVn: 'Em đang đọc một trang web dài và muốn xem phần cuối trang. Em dùng bộ phận nào của con chuột?',
      options: [
        { val: 'A', text: 'The right button — it opens a menu for the page', textVn: 'Nút phải — nó mở trình đơn cho trang' },
        { val: 'B', text: 'The left button — click the page over and over', textVn: 'Nút trái — bấm vào trang liên tục' },
        { val: 'C', text: 'The scroll wheel — roll it towards you', textVn: 'Con lăn chuột — lăn nó về phía em' },
        { val: 'D', text: 'None of them — a mouse cannot move a page', textVn: 'Không bộ phận nào — chuột không thể kéo trang' },
      ],
      correct: 'C',
      expEn: 'The **scroll wheel** rolls the page: towards you to go down, away from you to go up. Clicking over and over (B) does not move the page, and the right button (A) opens a menu instead. On a laptop, slide two fingers up or down the touchpad.',
      expVn: '**Con lăn chuột** kéo trang: lăn về phía em để đi xuống, lăn ra xa để đi lên. Bấm liên tục (B) không kéo được trang, còn nút phải (A) thì mở trình đơn. Trên máy tính xách tay, hãy trượt hai ngón tay lên hoặc xuống bàn di chuột.',
    },
  },

  // 4 ─ Four things a mouse does (steps + MOUSE_MOVES) ────────────────────────
  {
    layout: 'steps',
    icon: 'MousePointerClick',
    accent: SKY,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Four Things a Mouse Does',
    titleVn: 'Bốn việc con chuột làm',
    content: 'Every job you do with a mouse is one of these four moves. Learn their English names: the computer, your teacher and every help page use them.',
    contentVn: 'Mọi việc em làm với con chuột đều là một trong bốn động tác này. Hãy học tên tiếng Anh của chúng: máy tính, thầy cô và mọi trang hướng dẫn đều dùng những tên này.',
    inlineSvg: DIAGRAMS.MOUSE_MOVES,
    steps: [
      {
        text: '**Click:** press and let go of the **left** button **once**. It chooses a thing, or presses a button.',
        textVn: '**Bấm chuột (click):** bấm rồi thả nút **trái** **một lần**. Nó chọn một thứ, hoặc bấm một nút.',
      },
      {
        text: '**Double-click:** two **quick** clicks, keeping the mouse **still**. It **opens** a file, a folder or a program from its icon.',
        textVn: '**Bấm đúp (double-click):** hai lần bấm **thật nhanh**, giữ chuột **thật yên**. Nó **mở** một tệp, một thư mục hay một chương trình từ biểu tượng của nó.',
      },
      {
        text: '**Right-click:** press the **right** button once. A **menu** opens, with the things you can do to what you clicked.',
        textVn: '**Bấm chuột phải (right-click):** bấm nút **phải** một lần. Một **trình đơn** mở ra, gồm những việc em có thể làm với thứ em vừa bấm.',
      },
      {
        text: '**Drag:** press and **hold** the left button, move the mouse, then let go. It **moves** a thing to a new place.',
        textVn: '**Kéo thả (drag):** bấm và **giữ** nút trái, di chuột, rồi thả tay. Nó **chuyển** một thứ tới chỗ mới.',
      },
    ],
    reveal: {
      label: 'It only turned blue. Why?',
      labelVn: 'Nó chỉ chuyển sang màu xanh. Vì sao?',
      prompt: 'You want to open a folder on the desktop. You click it once, and it just turns blue.',
      promptVn: 'Em muốn mở một thư mục trên màn hình nền. Em bấm vào nó một lần, và nó chỉ chuyển sang màu xanh.',
      answer: 'One click only **chooses** it — the blue means "selected". To **open** it, double-click: two clicks, quickly, without moving the mouse.',
      answerVn: 'Bấm một lần chỉ **chọn** nó — màu xanh nghĩa là "đã được chọn". Để **mở** nó, hãy bấm đúp: hai lần bấm, thật nhanh, không di chuột.',
    },
  },

  // 5 ─ ESTIMATE — how quick is a double-click? ───────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Timer',
    eyebrow: 'Guess first',
    eyebrowVn: 'Đoán trước',
    title: 'How Quick Is a Double-Click?',
    titleVn: 'Bấm đúp nhanh cỡ nào?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Timer',
    text: 'A double-click is two clicks close together. Wait too long between them, and the computer hears two single clicks instead.',
    textVn: 'Bấm đúp là hai lần bấm sát nhau. Nếu chờ quá lâu giữa hai lần bấm, máy tính sẽ hiểu đó là hai lần bấm đơn.',
    sub: 'About how many **seconds** can you leave between the two clicks? Slide to your guess.',
    subVn: 'Em có thể để cách nhau khoảng bao nhiêu **giây** giữa hai lần bấm? Kéo thanh trượt đến dự đoán của em.',
    activity: {
      id: 'act_double_speed',
      type: 'estimate',
      prompt: 'About how many seconds can pass between the two clicks of a double-click?',
      promptVn: 'Giữa hai lần bấm của một cú bấm đúp có thể cách nhau khoảng bao nhiêu giây?',
      min: 0, max: 3, step: 0.1, unit: 's', answer: 0.5, tolerance: 0.5,
      explain: 'About **half a second** on most computers. Slower than that and it counts as two single clicks: the icon is chosen, but nothing opens. So click-click, quickly — and keep the mouse **still**, because if it moves while the button is down, the computer thinks you are starting a drag.',
      explainVn: 'Khoảng **nửa giây** trên phần lớn máy tính. Chậm hơn thế thì máy tính tính là hai lần bấm đơn: biểu tượng được chọn, nhưng không có gì mở ra. Vì vậy hãy bấm-bấm thật nhanh — và giữ chuột **thật yên**, vì nếu chuột di chuyển khi nút đang được bấm, máy tính sẽ nghĩ em đang bắt đầu kéo thả.',
    },
  },

  // 6 ─ SORT — which move does the job? ───────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Layers',
    eyebrow: 'Sort it',
    eyebrowVn: 'Sắp xếp',
    title: 'Which Move Does the Job?',
    titleVn: 'Động tác nào làm việc này?',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Layers',
    text: 'Eight jobs you will do with a mouse this week.',
    textVn: 'Tám việc em sẽ làm với con chuột trong tuần này.',
    sub: 'Drop each job on the move that does it.',
    subVn: 'Thả mỗi việc vào động tác làm được việc đó.',
    activity: {
      id: 'act_four_moves',
      type: 'sort',
      prompt: 'Which mouse move does each job?',
      promptVn: 'Động tác chuột nào làm mỗi việc này?',
      bins: [
        { id: 'click', name: 'Click', nameVn: 'Bấm chuột' },
        { id: 'double', name: 'Double-click', nameVn: 'Bấm đúp' },
        { id: 'right', name: 'Right-click', nameVn: 'Bấm chuột phải' },
        { id: 'drag', name: 'Drag', nameVn: 'Kéo thả' },
      ],
      cards: [
        { id: 'save', name: 'Press the Save button in a window', nameVn: 'Bấm nút Save trong một cửa sổ', bin: 'click' },
        { id: 'choose', name: 'Choose Shut down on the menu', nameVn: 'Chọn Shut down trong trình đơn', bin: 'click' },
        { id: 'folder', name: 'Open a folder from its icon on the desktop', nameVn: 'Mở một thư mục từ biểu tượng của nó trên màn hình nền', bin: 'double' },
        { id: 'paint', name: 'Start Paint from its icon on the desktop', nameVn: 'Mở Paint từ biểu tượng của nó trên màn hình nền', bin: 'double' },
        { id: 'menu', name: 'See the things you can do to a file', nameVn: 'Xem những việc em có thể làm với một tệp', bin: 'right' },
        { id: 'newfolder', name: 'Make a new folder on the desktop', nameVn: 'Tạo một thư mục mới trên màn hình nền', bin: 'right' },
        { id: 'photo', name: 'Move a photo into a folder', nameVn: 'Chuyển một bức ảnh vào một thư mục', bin: 'drag' },
        { id: 'bin', name: 'Carry an old file across to the Recycle Bin', nameVn: 'Đưa một tệp cũ sang Thùng rác', bin: 'drag' },
      ],
      explain: 'A **click** presses buttons and chooses from menus. A **double-click** opens things from their icons. A **right-click** shows what you can do — including making a new folder. A **drag** moves things: into a folder, or into the bin.',
      explainVn: '**Bấm chuột** dùng để bấm nút và chọn trong trình đơn. **Bấm đúp** mở các thứ từ biểu tượng của chúng. **Bấm chuột phải** cho thấy em có thể làm gì — kể cả tạo thư mục mới. **Kéo thả** chuyển các thứ đi: vào một thư mục, hoặc vào Thùng rác.',
    },
  },

  // 7 ─ No mouse? (TOUCH) + CHECK ─────────────────────────────────────────────
  {
    layout: 'split',
    icon: 'Hand',
    accent: TEAL,
    ratio: 40,
    title: 'No Mouse? Use Your Fingers',
    titleVn: 'Không có chuột? Dùng ngón tay',
    content: 'A tablet has a **touch screen**, and a laptop has a **touchpad**. Both do the same four moves — with a finger instead of a button. Read the table across: one row is one move.',
    contentVn: 'Máy tính bảng có **màn hình cảm ứng**, còn máy tính xách tay có **bàn di chuột**. Cả hai đều làm được bốn động tác đó — bằng ngón tay thay cho nút bấm. Hãy đọc bảng theo hàng ngang: mỗi hàng là một động tác.',
    inlineSvg: DIAGRAMS.TOUCH,
    notes: [
      {
        tone: 'write',
        text: '**Touch screen:** a screen you tap with your finger.\n**Touchpad:** the flat pad on a laptop that moves the pointer.',
        textVn: '**Màn hình cảm ứng (touch screen):** màn hình em chạm bằng ngón tay.\n**Bàn di chuột (touchpad):** tấm phẳng trên máy tính xách tay dùng để di chuyển con trỏ.',
      },
    ],
    check: {
      id: 'chk_press_hold',
      q: 'On a tablet, you **press and hold** your finger on a photo. Which mouse move is that the same as?',
      qVn: 'Trên máy tính bảng, em **chạm và giữ** ngón tay lên một bức ảnh. Việc đó giống với động tác chuột nào?',
      options: [
        { val: 'A', text: 'A click — it chooses the photo', textVn: 'Bấm chuột — nó chọn bức ảnh' },
        { val: 'B', text: 'A double-click — it opens the photo', textVn: 'Bấm đúp — nó mở bức ảnh' },
        { val: 'C', text: 'A drag — it moves the photo', textVn: 'Kéo thả — nó chuyển bức ảnh đi' },
        { val: 'D', text: 'A right-click — a menu for the photo opens', textVn: 'Bấm chuột phải — một trình đơn cho bức ảnh mở ra' },
      ],
      correct: 'D',
      expEn: 'Pressing and holding is how a touch screen does a **right-click**: after a moment, the photo’s menu appears. A quick tap is a click (A), two quick taps open it (B), and holding then SLIDING your finger drags it (C). On a touchpad, the right-click is a **two-finger tap**.',
      expVn: 'Chạm và giữ là cách màn hình cảm ứng **bấm chuột phải**: sau một chút, trình đơn của bức ảnh hiện ra. Chạm nhanh một lần là bấm chuột (A), chạm nhanh hai lần là mở ảnh (B), còn giữ rồi TRƯỢT ngón tay là kéo thả (C). Trên bàn di chuột, bấm chuột phải là **chạm bằng hai ngón tay**.',
    },
  },

  // 8 ─ DEMO: right-click ▸ Delete; right-click the desktop ▸ New folder ─────
  {
    // The simulator in demo mode — the same engine and skin as the Try It jobs
    // "put the old drawing in the bin" and "make a folder called My Games", so
    // the student watches the exact screen they are about to be handed. The
    // folder here is called Stories, so the demo does not type the job for them.
    layout: 'split',
    icon: 'Eye',
    accent: DEMO,
    ratio: 62,
    eyebrow: 'Watch first',
    eyebrowVn: 'Xem trước',
    title: 'Watch: Right-Click, Then Choose',
    titleVn: 'Xem: Bấm chuột phải, rồi chọn',
    content: 'Watch Ha Vi tidy her desktop. **Right-click** a file, and ITS menu opens. **Right-click** the empty desktop, and a different menu opens. Then a new folder gets its name, and a **double-click** opens it.',
    contentVn: 'Hãy xem Hà Vi dọn màn hình nền. **Bấm chuột phải** vào một tệp, và trình đơn CỦA TỆP ĐÓ mở ra. **Bấm chuột phải** vào chỗ trống trên màn hình nền, và một trình đơn khác mở ra. Sau đó một thư mục mới được đặt tên, và một cú **bấm đúp** mở nó ra.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'desktop',
        initial: {
          power: 'on',
          items: [{ name: 'old drawing.png' }, { name: 'my poem.docx' }],
        },
        script: [
          { type: 'openContext', target: 'item:old drawing.png', say: 'Right-click the old drawing. A menu opens beside it, with the things you can do to THAT file.', sayVn: 'Bấm chuột phải vào bức vẽ cũ. Một trình đơn mở ra bên cạnh, gồm những việc em có thể làm với CHÍNH tệp đó.' },
          { type: 'contextChoose', choice: 'delete', say: 'Delete. The drawing moves into the Recycle Bin — nothing is destroyed, and it can come back.', sayVn: 'Delete. Bức vẽ chuyển vào Thùng rác — không có gì bị phá hủy, và nó có thể quay lại.' },
          { type: 'openContext', target: 'desktop', say: 'Now right-click an EMPTY part of the desktop. A different menu: this one is about the desktop.', sayVn: 'Giờ bấm chuột phải vào một chỗ TRỐNG trên màn hình nền. Một trình đơn khác: trình đơn này dành cho màn hình nền.' },
          { type: 'contextChoose', choice: 'newFolder', say: 'New folder. It arrives with its name box open, ready for typing.', sayVn: 'New folder. Thư mục mới xuất hiện với ô tên đang mở, sẵn sàng để gõ.' },
          { type: 'typeName', text: 'Stories', say: 'Type the name: Stories. Hold Shift for the capital S.', sayVn: 'Gõ tên: Stories. Giữ Shift để viết hoa chữ S.' },
          { type: 'commitName', say: 'Press Enter. Now the folder has its name.', sayVn: 'Bấm Enter. Giờ thư mục đã có tên.' },
          { type: 'openItem', name: 'Stories', say: 'Double-click the folder to open it. It is empty — for now.', sayVn: 'Bấm đúp vào thư mục để mở nó. Nó đang trống — trong lúc này.' },
        ],
      },
    },
    notes: [
      {
        tone: 'info',
        text: 'Right-click ▸ **Delete** does not destroy anything: the file waits in the **Recycle Bin**, and "Put it back" returns it. Dragging it onto the bin, or clicking it and pressing the **Delete** key, does the same.',
        textVn: 'Bấm chuột phải ▸ **Delete** không phá hủy thứ gì: tệp chờ trong **Thùng rác**, và nút "Put it back" (Đặt lại) đưa nó trở về. Kéo tệp thả vào Thùng rác, hoặc bấm chọn nó rồi bấm phím **Delete**, cũng làm được điều đó.',
      },
    ],
  },

  // 9 ─ A menu for the thing you clicked (RIGHT_CLICK) + PREDICT ──────────────
  {
    layout: 'split',
    icon: 'MousePointerClick',
    accent: AMBER,
    ratio: 45,
    title: 'A Menu for the Thing You Clicked',
    titleVn: 'Trình đơn dành cho thứ em bấm vào',
    content: 'A right-click menu is always about **the thing under the pointer**. A file offers Open, Rename and Delete. The empty desktop offers New folder. Different thing, different menu.',
    contentVn: 'Trình đơn chuột phải luôn dành cho **thứ nằm dưới con trỏ**. Một tệp đưa ra Open, Rename và Delete. Màn hình nền trống đưa ra New folder. Thứ khác nhau, trình đơn khác nhau.',
    inlineSvg: DIAGRAMS.RIGHT_CLICK,
    activity: {
      id: 'act_menu_for_words',
      type: 'predict',
      prompt: 'Ha Vi right-clicks on a WORD in the middle of her story. Which menu is most likely to open?',
      promptVn: 'Hà Vi bấm chuột phải vào một TỪ ở giữa truyện của bạn ấy. Trình đơn nào nhiều khả năng sẽ mở ra nhất?',
      options: [
        { val: 'folder', name: 'New folder, Change background', nameVn: 'New folder, Change background (thư mục mới, đổi hình nền)' },
        { val: 'words', name: 'Copy, Paste, and ways to change the words', nameVn: 'Copy, Paste, và những cách thay đổi chữ' },
        { val: 'power', name: 'Sleep, Restart, Shut down', nameVn: 'Sleep, Restart, Shut down (ngủ, khởi động lại, tắt máy)' },
        { val: 'none', name: 'No menu — right-click only works on icons', nameVn: 'Không có trình đơn — bấm chuột phải chỉ dùng được với biểu tượng' },
      ],
      correct: 'words',
      explain: 'She right-clicked **words**, so the menu is about words: **Copy**, **Paste**, and ways to change them. The desktop’s menu only appears on the empty desktop, and the power choices live in the start menu. Right-click works almost everywhere — that is what makes it so useful.',
      explainVn: 'Bạn ấy bấm chuột phải vào **chữ**, nên trình đơn dành cho chữ: **Copy** (sao chép), **Paste** (dán), và những cách thay đổi chữ. Trình đơn của màn hình nền chỉ hiện ra trên màn hình nền trống, còn các lựa chọn nguồn nằm trong trình đơn bắt đầu. Bấm chuột phải dùng được gần như ở mọi nơi — đó chính là điều làm nó hữu ích đến vậy.',
    },
  },

  // 10 ─ Drag and drop (steps + DRAG) ─────────────────────────────────────────
  {
    layout: 'steps',
    icon: 'Move',
    accent: SKY,
    title: 'Drag and Drop',
    titleVn: 'Kéo và thả',
    content: 'Dragging moves a thing to a new place — a photo into a folder, an old file into the Recycle Bin. The secret is to **keep holding** until you get there.',
    contentVn: 'Kéo thả chuyển một thứ tới chỗ mới — một bức ảnh vào thư mục, một tệp cũ vào Thùng rác. Bí quyết là **cứ giữ nguyên** cho đến khi tới nơi.',
    inlineSvg: DIAGRAMS.DRAG,
    steps: [
      { text: '**Point** at the thing you want to move.', textVn: '**Đưa con trỏ** tới thứ em muốn chuyển.' },
      { text: '**Press and hold** the left button — do not let go yet.', textVn: '**Bấm và giữ** nút trái — đừng thả tay vội.' },
      { text: '**Move** the mouse. The thing travels with the pointer.', textVn: '**Di** chuột. Thứ đó đi theo con trỏ.' },
      { text: 'When the folder (or the bin) **lights up**, let go. That is the "drop".', textVn: 'Khi thư mục (hoặc Thùng rác) **sáng lên**, hãy thả tay. Đó là bước "thả".' },
    ],
    reveal: {
      label: 'It landed in the wrong place!',
      labelVn: 'Nó rơi nhầm chỗ!',
      prompt: 'You let go too early, and the photo dropped on the desktop instead of in the folder.',
      promptVn: 'Em thả tay quá sớm, và bức ảnh rơi xuống màn hình nền thay vì vào thư mục.',
      answer: 'Nothing is lost — it only moved. Drag it again, and hold on until the folder lights up.',
      answerVn: 'Không mất gì cả — nó chỉ bị chuyển chỗ. Hãy kéo nó lần nữa, và giữ cho đến khi thư mục sáng lên.',
    },
  },

  // 11 ─ ORDER — the drag, in order ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ListChecks',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Drag It in Order',
    titleVn: 'Kéo thả theo thứ tự',
    label: 'Order',
    labelVn: 'Xếp thứ tự',
    labelIcon: 'ListChecks',
    text: 'Ha Vi wants to move beach.jpg into her Holiday folder.',
    textVn: 'Hà Vi muốn chuyển beach.jpg vào thư mục Holiday của bạn ấy.',
    sub: 'Put her four steps in order, **first to last**.',
    subVn: 'Hãy xếp bốn bước của bạn ấy theo thứ tự, **từ đầu đến cuối**.',
    activity: {
      id: 'act_drag_order',
      type: 'order',
      prompt: 'Put the steps of dragging beach.jpg into the Holiday folder in order.',
      promptVn: 'Xếp các bước kéo beach.jpg thả vào thư mục Holiday theo đúng thứ tự.',
      steps: [
        { id: 'point', name: 'Point at beach.jpg', nameVn: 'Đưa con trỏ tới beach.jpg' },
        { id: 'hold', name: 'Press and hold the left button', nameVn: 'Bấm và giữ nút trái' },
        { id: 'move', name: 'Keep holding, and move to the Holiday folder', nameVn: 'Vẫn giữ, và di chuyển tới thư mục Holiday' },
        { id: 'drop', name: 'Let go when the folder lights up', nameVn: 'Thả tay khi thư mục sáng lên' },
      ],
      explain: '**Point**, **press and hold**, **move**, **let go**. The step people get wrong is the hold: let go on the way, and the photo drops wherever the pointer happens to be.',
      explainVn: '**Đưa con trỏ tới**, **bấm và giữ**, **di chuyển**, **thả tay**. Bước người ta hay làm sai là bước giữ: thả tay giữa đường, và bức ảnh rơi xuống bất cứ chỗ nào con trỏ đang nằm.',
    },
  },

  // 12 ─ The window on top (LB_WINDOW_PAIR) ───────────────────────────────────
  {
    layout: 'split',
    icon: 'Layers',
    accent: SKY,
    ratio: 40,
    title: 'The Window on Top',
    titleVn: 'Cửa sổ ở trên cùng',
    content: 'When windows overlap, only **one** is the **active window**: the one on top. Everything you type and click goes into it.\n\nYou can spot it three ways: it is **in front** of the others, its **title bar is darker**, and its **button on the taskbar is lit**.',
    contentVn: 'Khi các cửa sổ chồng lên nhau, chỉ **một** cửa sổ là **cửa sổ đang dùng**: cửa sổ ở trên cùng. Mọi thứ em gõ và bấm đều đi vào nó.\n\nEm nhận ra nó bằng ba cách: nó nằm **phía trước** các cửa sổ khác, **thanh tiêu đề đậm hơn**, và **nút của nó trên thanh tác vụ đang sáng**.',
    inlineSvg: DIAGRAMS.LB_WINDOW_PAIR,
    notes: [
      {
        tone: 'write',
        text: '**Active window:** the window on top — the one your typing goes into.',
        textVn: '**Cửa sổ đang dùng (active window):** cửa sổ ở trên cùng — cửa sổ nhận những gì em gõ.',
      },
    ],
  },

  // 13 ─ HOTSPOT — where do the keys go? (TWO_WINDOWS) ────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'MousePointerClick',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    title: 'Where Do the Keys Go?',
    titleVn: 'Phím bấm đi vào đâu?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Ha Vi wants to type the next line of her story. She has not clicked anything — she just starts typing.',
    textVn: 'Hà Vi muốn gõ dòng tiếp theo của truyện. Bạn ấy chưa bấm vào đâu cả — bạn ấy cứ thế bắt đầu gõ.',
    sub: 'Tap the window her keys will go into.',
    subVn: 'Chạm vào cửa sổ sẽ nhận những phím bạn ấy gõ.',
    activity: {
      id: 'act_active_window',
      type: 'hotspot',
      prompt: 'Tap the window that gets Ha Vi’s typing right now.',
      promptVn: 'Chạm vào cửa sổ nhận những gì Hà Vi gõ lúc này.',
      svg: DIAGRAMS.TWO_WINDOWS,
      viewBox: '0 0 800 500',
      targets: WINDOW_TARGETS,
      correct: 'calc',
      explain: 'The **Calculator** is on top — it is the **active window**, and its taskbar button is lit. Her keys go to the Calculator, even though the story is the window she wants. She must **click the story first** (or its taskbar button), and then type.',
      explainVn: '**Calculator** đang ở trên cùng — nó là **cửa sổ đang dùng**, và nút của nó trên thanh tác vụ đang sáng. Phím bạn ấy gõ đi vào Calculator, dù truyện mới là cửa sổ bạn ấy muốn. Bạn ấy phải **bấm vào truyện trước** (hoặc nút của nó trên thanh tác vụ), rồi mới gõ.',
    },
  },

  // 14 ─ DEMO: switch windows ─────────────────────────────────────────────────
  {
    // The Try It jobs "bring the Calculator to the front" and "make Paint fill
    // the screen, then close the Calculator" start from this screen.
    layout: 'split',
    icon: 'Eye',
    accent: DEMO,
    ratio: 62,
    eyebrow: 'Watch first',
    eyebrowVn: 'Xem trước',
    title: 'Watch: Switch Windows',
    titleVn: 'Xem: Chuyển cửa sổ',
    content: 'Ha Vi’s story is open. Watch her open **Paint** on top of it, then switch back and forth — **without closing anything**.',
    contentVn: 'Truyện của Hà Vi đang mở. Hãy xem bạn ấy mở **Paint** đè lên trên, rồi chuyển qua chuyển lại — **mà không đóng thứ gì**.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'desktop',
        initial: {
          power: 'on',
          windows: [{ app: 'notes', title: 'story', state: 'normal', saved: true }],
        },
        script: [
          { type: 'openApp', app: 'paint', say: 'Double-click Paint’s icon. Paint opens ON TOP of the story, so now Paint is the active window.', sayVn: 'Bấm đúp vào biểu tượng Paint. Paint mở ra ĐÈ LÊN truyện, nên giờ Paint là cửa sổ đang dùng.' },
          { type: 'restore', title: 'story', say: 'Click the story’s button on the taskbar. The story jumps to the front.', sayVn: 'Bấm vào nút của truyện trên thanh tác vụ. Truyện nhảy lên phía trước.' },
          { type: 'restore', title: 'Paint', say: 'Click any part of the Paint window you can see. Paint comes to the front again.', sayVn: 'Bấm vào bất kỳ phần nào của cửa sổ Paint mà em nhìn thấy. Paint lại lên phía trước.' },
          { type: 'minimise', title: 'Paint', say: 'Or minimise the window on top: Paint hides on the taskbar, and the story is on top again.', sayVn: 'Hoặc thu nhỏ cửa sổ ở trên cùng: Paint ẩn xuống thanh tác vụ, và truyện lại ở trên cùng.' },
        ],
      },
    },
    notes: [
      {
        tone: 'info',
        text: 'Nothing was closed. Switching only changes **which window is on top** — watch the lit button on the taskbar move with it.',
        textVn: 'Không có gì bị đóng. Chuyển cửa sổ chỉ thay đổi **cửa sổ nào ở trên cùng** — hãy nhìn nút đang sáng trên thanh tác vụ di chuyển theo.',
      },
    ],
  },

  // 15 ─ Back to the story + CHECK ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Layers',
    eyebrow: 'Two ways to switch',
    eyebrowVn: 'Hai cách chuyển cửa sổ',
    title: 'Back to the Story',
    titleVn: 'Quay lại với truyện',
    label: 'Key idea',
    labelVn: 'Ý chính',
    labelIcon: 'Layers',
    text: 'To bring a window to the front, click **its button on the taskbar**, or click **any part of it you can see**.',
    textVn: 'Để đưa một cửa sổ lên phía trước, hãy bấm **nút của nó trên thanh tác vụ**, hoặc bấm vào **bất kỳ phần nào của nó mà em nhìn thấy**.',
    sub: 'Closing the window on top works too — but then that window is gone.',
    subVn: 'Đóng cửa sổ ở trên cùng cũng được — nhưng khi đó cửa sổ ấy mất luôn.',
    check: {
      id: 'chk_switch',
      q: 'Ha Vi is using the Calculator, and her story is hidden behind it. She wants to write in her story again, and she will need the Calculator later. What should she do?',
      qVn: 'Hà Vi đang dùng Calculator, và truyện của bạn ấy bị che phía sau. Bạn ấy muốn viết tiếp truyện, và lát nữa vẫn cần dùng Calculator. Bạn ấy nên làm gì?',
      options: [
        { val: 'A', text: 'Close the Calculator with its X', textVn: 'Đóng Calculator bằng dấu X của nó' },
        { val: 'B', text: 'Double-click Notes to start a new story', textVn: 'Bấm đúp vào Notes để bắt đầu một truyện mới' },
        { val: 'C', text: 'Press Esc', textVn: 'Bấm phím Esc' },
        { val: 'D', text: 'Click the story’s button on the taskbar', textVn: 'Bấm vào nút của truyện trên thanh tác vụ' },
      ],
      correct: 'D',
      expEn: 'The taskbar button brings the story to the front, and the Calculator waits behind it, still open for later. Closing the Calculator (A) works, but then she has to open it again. A new story (B) would not have her writing in it, and Esc (C) only closes menus and boxes.',
      expVn: 'Nút trên thanh tác vụ đưa truyện lên phía trước, còn Calculator chờ ở phía sau, vẫn mở để dùng sau. Đóng Calculator (A) cũng được, nhưng khi đó bạn ấy phải mở lại. Một truyện mới (B) sẽ không có những gì bạn ấy đã viết, còn Esc (C) chỉ đóng trình đơn và hộp thoại.',
    },
  },

  // 16 ─ Keys that do a job (LB_KEYS) ─────────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'Grid3x3',
    accent: TEAL,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Keys That Do a Job',
    titleVn: 'Những phím có nhiệm vụ riêng',
    inlineSvg: DIAGRAMS.LB_KEYS,
    caption: 'Letter keys type letters. These keys **do a job**. **Enter** starts a new line. **Backspace** and **Delete** rub letters out. **Shift** and **Caps Lock** make capitals. The **space bar** makes a gap. **Esc** backs out. **Ctrl** makes shortcuts with a letter.',
    captionVn: 'Phím chữ gõ ra chữ. Những phím này **có nhiệm vụ riêng**. **Enter** xuống dòng mới. **Backspace** và **Delete** xóa chữ. **Shift** và **Caps Lock** viết hoa. **Phím cách (space bar)** tạo khoảng trống. **Esc** thoát ra. **Ctrl** tạo phím tắt cùng một chữ cái.',
  },

  // 17 ─ HOTSPOT — rub it out (Backspace) ─────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'MousePointerClick',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Rub It Out',
    titleVn: 'Xóa đi',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Ha Vi typed **catt** — one letter too many. The cursor is just after the last **t**.',
    textVn: 'Hà Vi gõ **catt** — thừa một chữ cái. Con trỏ nằm ngay sau chữ **t** cuối cùng.',
    sub: 'Tap the key that rubs out the letter just **before** the cursor.',
    subVn: 'Chạm vào phím xóa chữ cái nằm ngay **trước** con trỏ.',
    activity: {
      id: 'act_backspace',
      type: 'hotspot',
      prompt: 'Tap the key that rubs out the letter just before the cursor.',
      promptVn: 'Chạm vào phím xóa chữ cái nằm ngay trước con trỏ.',
      svg: DIAGRAMS.KEYBOARD,
      viewBox: '0 0 760 308',
      targets: KEY_TARGETS,
      correct: 'backspace',
      explain: '**Backspace** — the long key at the end of the number row. Each press rubs out one letter to the **left** of the cursor, so one press turns catt into cat. Hold it down and it keeps going, so tap it.',
      explainVn: '**Backspace** — phím dài ở cuối hàng phím số. Mỗi lần bấm xóa một chữ cái ở **bên trái** con trỏ, nên bấm một lần là catt thành cat. Giữ phím xuống thì nó xóa liên tục, nên hãy bấm nhẹ từng cái.',
    },
  },

  // 18 ─ Backspace or Delete? (CURSOR) + CHECK ───────────────────────────────
  {
    layout: 'split',
    icon: 'ArrowLeftRight',
    accent: TEAL,
    ratio: 45,
    title: 'Backspace or Delete?',
    titleVn: 'Backspace hay Delete?',
    content: 'The **cursor** is the thin line that shows where your next letter will go. Backspace and Delete both rub out ONE letter — on **different sides** of the cursor.',
    contentVn: '**Con trỏ soạn thảo (cursor)** là vạch mảnh cho biết chữ tiếp theo của em sẽ hiện ở đâu. Backspace và Delete đều xóa MỘT chữ cái — nhưng ở **hai bên khác nhau** của con trỏ.',
    inlineSvg: DIAGRAMS.CURSOR,
    notes: [
      {
        tone: 'write',
        text: '**Backspace:** rubs out the letter **before** (to the left of) the cursor.\n**Delete:** rubs out the letter **after** (to the right of) the cursor. It also sends a chosen file to the Recycle Bin.',
        textVn: '**Backspace:** xóa chữ cái nằm **trước** (bên trái) con trỏ.\n**Delete:** xóa chữ cái nằm **sau** (bên phải) con trỏ. Nó cũng đưa một tệp đang được chọn vào Thùng rác.',
      },
    ],
    check: {
      id: 'chk_delete_side',
      q: 'The cursor is at the very start of the word **wrong**, just before the w. Which key rubs out the w?',
      qVn: 'Con trỏ nằm ở ngay đầu từ **wrong**, ngay trước chữ w. Phím nào xóa được chữ w?',
      options: [
        { val: 'A', text: 'Delete', textVn: 'Delete' },
        { val: 'B', text: 'Backspace', textVn: 'Backspace' },
        { val: 'C', text: 'Enter', textVn: 'Enter' },
        { val: 'D', text: 'Caps Lock', textVn: 'Caps Lock' },
      ],
      correct: 'A',
      expEn: 'The w is AFTER the cursor, so it is **Delete**. Backspace rubs out the letter BEFORE the cursor — here that is the space in front of the word, which would join two words together. Enter starts a new line, and Caps Lock changes capitals.',
      expVn: 'Chữ w nằm SAU con trỏ, nên đó là **Delete**. Backspace xóa chữ cái nằm TRƯỚC con trỏ — ở đây đó là dấu cách phía trước từ, và xóa nó sẽ làm hai từ dính vào nhau. Enter xuống dòng mới, còn Caps Lock thay đổi chữ hoa.',
    },
  },

  // 19 ─ Shift or Caps Lock? (SHIFT_CAPS) + PREDICT ───────────────────────────
  {
    layout: 'split',
    icon: 'ArrowUpDown',
    accent: TEAL,
    ratio: 45,
    title: 'Shift or Caps Lock?',
    titleVn: 'Shift hay Caps Lock?',
    content: '**Shift** is for one capital: **hold** it and tap the letter — the H of Ha Vi. **Caps Lock** is a switch: press it once and EVERY letter is a capital, until you press it again. A little light shows when it is on.',
    contentVn: '**Shift** dùng cho một chữ hoa: **giữ** nó rồi bấm chữ cái — chữ H trong Ha Vi. **Caps Lock** là một công tắc: bấm một lần là MỌI chữ cái đều viết hoa, cho đến khi em bấm lại. Một đèn nhỏ cho biết khi nào nó đang bật.',
    inlineSvg: DIAGRAMS.SHIFT_CAPS,
    activity: {
      id: 'act_caps_password',
      type: 'predict',
      prompt: 'Caps Lock is on, and Ha Vi does not notice. She types her password, sunflower, and presses Enter. What happens?',
      promptVn: 'Caps Lock đang bật, mà Hà Vi không để ý. Bạn ấy gõ mật khẩu sunflower rồi bấm Enter. Điều gì xảy ra?',
      options: [
        { val: 'login', name: 'She logs in — capitals do not matter in a password', nameVn: 'Bạn ấy đăng nhập được — chữ hoa không quan trọng trong mật khẩu' },
        { val: 'wrong', name: 'The computer says the password is wrong — it got SUNFLOWER', nameVn: 'Máy tính báo mật khẩu sai — nó nhận được SUNFLOWER' },
        { val: 'off', name: 'The computer switches off to keep her account safe', nameVn: 'Máy tính tự tắt để giữ an toàn cho tài khoản của bạn ấy' },
        { val: 'notes', name: 'Nothing changes — Caps Lock only works in Notes', nameVn: 'Không có gì thay đổi — Caps Lock chỉ có tác dụng trong Notes' },
      ],
      correct: 'wrong',
      explain: 'With Caps Lock on, sunflower arrives as **SUNFLOWER** — a different password, so the computer says it is wrong. Passwords care about capitals. If your password is refused, **check the Caps Lock light first**, press it to turn it off, and type it again.',
      explainVn: 'Khi Caps Lock đang bật, sunflower thành **SUNFLOWER** — một mật khẩu khác, nên máy tính báo sai. Mật khẩu phân biệt chữ hoa và chữ thường. Nếu mật khẩu của em bị từ chối, hãy **kiểm tra đèn Caps Lock trước tiên**, bấm nó để tắt, rồi gõ lại.',
    },
  },

  // 20 ─ Ctrl shortcuts (CTRL_KEYS) + CHECK ───────────────────────────────────
  {
    layout: 'split',
    icon: 'Zap',
    accent: PURPLE,
    ratio: 45,
    title: 'Ctrl: Shortcuts',
    titleVn: 'Ctrl: Phím tắt',
    content: 'Hold **Ctrl** and tap a letter, and the computer does a job at once — no menu needed. Four to know by heart: **Ctrl+S** saves, **Ctrl+Z** undoes your last change, **Ctrl+C** copies, **Ctrl+V** pastes what you copied.',
    contentVn: 'Giữ **Ctrl** rồi bấm một chữ cái, và máy tính làm ngay một việc — không cần trình đơn. Bốn phím tắt cần thuộc lòng: **Ctrl+S** lưu, **Ctrl+Z** hoàn tác thay đổi vừa rồi, **Ctrl+C** sao chép, **Ctrl+V** dán thứ em đã sao chép.',
    inlineSvg: DIAGRAMS.CTRL_KEYS,
    notes: [
      {
        tone: 'info',
        text: 'On a Mac, the **Cmd (⌘)** key does the job of Ctrl: Cmd+S, Cmd+Z, Cmd+C, Cmd+V.',
        textVn: 'Trên máy Mac, phím **Cmd (⌘)** làm nhiệm vụ của Ctrl: Cmd+S, Cmd+Z, Cmd+C, Cmd+V.',
      },
    ],
    check: {
      id: 'chk_ctrl_how',
      q: 'How do you do **Ctrl+S**?',
      qVn: 'Em thực hiện **Ctrl+S** như thế nào?',
      options: [
        { val: 'A', text: 'Press Ctrl, let go, then press S', textVn: 'Bấm Ctrl, thả ra, rồi bấm S' },
        { val: 'B', text: 'Hold Ctrl down, tap S, then let go of both', textVn: 'Giữ Ctrl, bấm S, rồi thả cả hai' },
        { val: 'C', text: 'Type the letters C, t, r, l, then S', textVn: 'Gõ các chữ C, t, r, l, rồi S' },
        { val: 'D', text: 'Press S first, then Ctrl', textVn: 'Bấm S trước, rồi bấm Ctrl' },
      ],
      correct: 'B',
      expEn: 'The **+** means **together**: hold Ctrl down, tap S while you are still holding it, then let go. Pressing them one after the other (A, D) just types an s, and typing the letters C-t-r-l (C) types a word.',
      expVn: 'Dấu **+** nghĩa là **cùng lúc**: giữ Ctrl xuống, bấm S trong lúc vẫn đang giữ, rồi thả ra. Bấm lần lượt từng phím (A, D) chỉ gõ ra chữ s, còn gõ các chữ C-t-r-l (C) thì gõ ra một từ.',
    },
  },

  // 21 ─ SORT — which shortcut? ───────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'Sort it',
    eyebrowVn: 'Sắp xếp',
    title: 'Which Shortcut?',
    titleVn: 'Phím tắt nào?',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Layers',
    text: 'Eight moments, four shortcuts.',
    textVn: 'Tám tình huống, bốn phím tắt.',
    sub: 'Drop each moment on the shortcut you need.',
    subVn: 'Thả mỗi tình huống vào phím tắt em cần.',
    activity: {
      id: 'act_ctrl_sort',
      type: 'sort',
      prompt: 'Which Ctrl shortcut do you need at each moment?',
      promptVn: 'Em cần phím tắt Ctrl nào ở mỗi tình huống?',
      bins: [
        { id: 'save', name: 'Ctrl+S — save', nameVn: 'Ctrl+S — lưu' },
        { id: 'undo', name: 'Ctrl+Z — undo', nameVn: 'Ctrl+Z — hoàn tác' },
        { id: 'copy', name: 'Ctrl+C — copy', nameVn: 'Ctrl+C — sao chép' },
        { id: 'paste', name: 'Ctrl+V — paste', nameVn: 'Ctrl+V — dán' },
      ],
      cards: [
        { id: 'oops', name: 'You rubbed out a whole sentence by mistake', nameVn: 'Em lỡ xóa mất cả một câu', bin: 'undo' },
        { id: 'line', name: 'A wrong line has spoiled your drawing', nameVn: 'Một nét vẽ sai làm hỏng bức tranh của em', bin: 'undo' },
        { id: 'lunch', name: 'You are going to lunch and want your story safe', nameVn: 'Em sắp đi ăn trưa và muốn truyện được an toàn', bin: 'save' },
        { id: 'para', name: 'You have just written a good paragraph', nameVn: 'Em vừa viết xong một đoạn văn hay', bin: 'save' },
        { id: 'title', name: 'You want the title in two places — first, take a copy', nameVn: 'Em muốn tiêu đề ở hai chỗ — trước tiên, lấy một bản sao', bin: 'copy' },
        { id: 'sentence', name: 'You chose a sentence and want a copy of it', nameVn: 'Em đã chọn một câu và muốn có một bản sao của nó', bin: 'copy' },
        { id: 'put', name: 'The cursor is where the copy should go — put it there', nameVn: 'Con trỏ đang ở chỗ bản sao cần đến — đặt nó vào đó', bin: 'paste' },
        { id: 'picture', name: 'You copied a picture and want it in your story', nameVn: 'Em đã sao chép một bức tranh và muốn đưa nó vào truyện', bin: 'paste' },
      ],
      explain: 'Z **undoes** a mistake — the first thing to try when something goes wrong. S **saves**, as often as you like. C and V work as a pair: C takes a **copy**, and V **pastes** it where the cursor is.',
      explainVn: 'Z **hoàn tác** một lỗi — việc đầu tiên nên thử khi có gì đó sai. S **lưu**, bao nhiêu lần tùy thích. C và V đi thành cặp: C lấy một **bản sao**, còn V **dán** nó vào chỗ con trỏ đang nằm.',
    },
  },

  // 22 ─ Esc, the way out + HOTSPOT ───────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'The way out',
    eyebrowVn: 'Lối thoát',
    title: 'Esc: Get Out Safely',
    titleVn: 'Esc: Thoát ra an toàn',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: '**Esc** is short for **escape**: get out. It closes a menu without choosing anything, cancels a box you did not mean to open, and stops a rename — and it never deletes anything.',
    textVn: '**Esc** là viết tắt của **escape**: thoát ra. Nó đóng trình đơn mà không chọn gì, hủy một hộp thoại em lỡ mở, và dừng việc đổi tên — và nó không bao giờ xóa thứ gì.',
    sub: 'A right-click menu popped up by mistake. Tap the key that makes it go away **without choosing anything**.',
    subVn: 'Một trình đơn chuột phải lỡ bật lên. Chạm vào phím làm nó biến mất **mà không chọn gì cả**.',
    activity: {
      id: 'act_esc',
      type: 'hotspot',
      prompt: 'Tap the key that closes a menu without choosing anything.',
      promptVn: 'Chạm vào phím đóng trình đơn mà không chọn gì cả.',
      svg: DIAGRAMS.KEYBOARD,
      viewBox: '0 0 760 308',
      targets: KEY_TARGETS,
      correct: 'esc',
      explain: '**Esc**, at the top left. It backs out of menus and boxes safely. **Enter** would choose whatever is highlighted, and **Delete** is for rubbing out letters and binning a chosen file — not for getting out.',
      explainVn: '**Esc**, ở góc trên bên trái. Nó thoát khỏi trình đơn và hộp thoại một cách an toàn. **Enter** sẽ chọn thứ đang được tô sáng, còn **Delete** dùng để xóa chữ và bỏ tệp đang chọn vào Thùng rác — không phải để thoát ra.',
    },
  },

  // 23 ─ Checklist + CHECK (the exit question) ────────────────────────────────
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
    content: 'Next: the Vocab, then **Try It** — a pretend computer where you click, drag and switch windows yourself — and the **Mouse Gym**.\n\nLast question: a mistake to fix.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Thử Làm** — một chiếc máy tính giả để em tự bấm, kéo thả và chuyển cửa sổ — và **Phòng tập chuột**.\n\nCâu hỏi cuối: sửa một lỗi.',
    items: [
      { text: '**Click**, **double-click**, **right-click** and **drag** — with a mouse, a touch screen or a touchpad.', textVn: '**Bấm chuột**, **bấm đúp**, **bấm chuột phải** và **kéo thả** — bằng chuột, màn hình cảm ứng hoặc bàn di chuột.' },
      { text: 'Use a **right-click menu**: Delete a file, or make a **New folder** and give it a name.', textVn: 'Dùng **trình đơn chuột phải**: Delete một tệp, hoặc tạo **New folder** và đặt tên cho nó.' },
      { text: 'Find the **active window**, and switch windows from the **taskbar** without closing anything.', textVn: 'Tìm **cửa sổ đang dùng**, và chuyển cửa sổ từ **thanh tác vụ** mà không đóng thứ gì.' },
      { text: 'Use **Enter**, **Backspace**, **Delete**, **Shift**, **Caps Lock**, **Esc** and **Ctrl+S, Z, C, V**.', textVn: 'Dùng **Enter**, **Backspace**, **Delete**, **Shift**, **Caps Lock**, **Esc** và **Ctrl+S, Z, C, V**.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'Ha Vi types a whole sentence, then sees that Caps Lock was on: IT IS ALL IN CAPITALS. What should she do?',
      qVn: 'Hà Vi gõ xong cả một câu, rồi mới thấy Caps Lock đang bật: CẢ CÂU TOÀN CHỮ HOA. Bạn ấy nên làm gì?',
      options: [
        { val: 'A', text: 'Close the story without saving, and start again', textVn: 'Đóng truyện mà không lưu, rồi làm lại từ đầu' },
        { val: 'B', text: 'Hold Shift and keep typing — Shift fixes the capitals', textVn: 'Giữ Shift và gõ tiếp — Shift sẽ sửa chữ hoa' },
        { val: 'C', text: 'Turn Caps Lock off, rub the sentence out (Backspace or Ctrl+Z), and type it again', textVn: 'Tắt Caps Lock, xóa câu đó (bằng Backspace hoặc Ctrl+Z), rồi gõ lại' },
        { val: 'D', text: 'Press Esc — it turns capitals back into small letters', textVn: 'Bấm Esc — nó biến chữ hoa trở lại thành chữ thường' },
      ],
      correct: 'C',
      expEn: 'Press **Caps Lock** once to turn it off, rub out just that sentence (Backspace, or **Ctrl+Z** to undo it), and type it again. Closing without saving (A) throws away all her other work. Holding Shift while Caps Lock is on (B) makes SMALL letters. Esc (D) only backs out of menus and boxes.',
      expVn: 'Bấm **Caps Lock** một lần để tắt, xóa đúng câu đó (bằng Backspace, hoặc **Ctrl+Z** để hoàn tác), rồi gõ lại. Đóng mà không lưu (A) sẽ vứt bỏ hết những phần khác bạn ấy đã viết. Giữ Shift khi Caps Lock đang bật (B) lại cho ra chữ THƯỜNG. Esc (D) chỉ thoát khỏi trình đơn và hộp thoại.',
    },
  },

  // 24 ─ On your own computer (unassessed, always last) ───────────────────────
  {
    layout: 'callout',
    icon: 'Sparkles',
    accent: GREEN,
    eyebrow: 'On your own computer',
    eyebrowVn: 'Trên máy tính của em',
    title: 'Do This for Real, Today',
    titleVn: 'Hãy làm thật, ngay hôm nay',
    content: 'The pretend computer was a rehearsal. Now do it for real — with a mouse, a touchpad or a tablet, whichever you have.',
    contentVn: 'Chiếc máy tính giả chỉ là tập dượt. Giờ hãy làm thật — bằng chuột, bàn di chuột hay máy tính bảng, em có cái nào thì dùng cái đó.',
    notes: [
      {
        tone: 'task',
        text: '**Right-click** the desktop, make a **New folder** and give it your name. **Double-click** to open it. Then right-click it ▸ **Delete** to tidy up.',
        textVn: '**Bấm chuột phải** vào màn hình nền, tạo **New folder** và đặt tên em cho nó. **Bấm đúp** để mở nó. Sau đó bấm chuột phải vào nó ▸ **Delete** để dọn dẹp.',
      },
      {
        tone: 'task',
        text: 'Open **two windows**. Switch between them from the **taskbar**, and watch which one is on top.',
        textVn: 'Mở **hai cửa sổ**. Chuyển qua lại giữa chúng từ **thanh tác vụ**, và để ý xem cửa sổ nào ở trên cùng.',
      },
      {
        tone: 'task',
        text: 'Type your name with **Shift** for the capitals. Make a mistake on purpose and fix it with **Backspace** — then try **Ctrl+Z**.',
        textVn: 'Gõ tên em, dùng **Shift** cho các chữ hoa. Cố ý gõ sai một chữ rồi sửa bằng **Backspace** — sau đó thử **Ctrl+Z**.',
      },
    ],
  },
];
