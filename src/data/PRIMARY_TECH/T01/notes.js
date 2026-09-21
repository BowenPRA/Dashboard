// src/data/PRIMARY_TECH/T01/notes.js
// T1 Starting and Stopping — the self-study deck (NOTES), rebuilt to the Year 7
// standard (docs/primary-tech/UPGRADE-PLAN.md §4 and the §6 T1 brief). 26 layout
// slides; 17 scored items — 5 checks and 12 activities (hotspot · order · sort ·
// predict · estimate) — so the student does something every slide or two. Three
// slides are the simulator in demo mode (Show), on the same `desktop` skin and
// the same window the Try It task hands them next (Do).
//
// SPINE:
//   1–2    hero; hotspot — which of four symbols means power?
//   3–5    turning it on (steps, the laptop labelled, "nothing happened" reveal);
//          DEMO press, wait, log in; order — the four start-up steps
//   6–7    your password is yours (split, sticky note) + check; sort — habits
//          that keep it yours / give it away
//   8–10   the desktop tour (LB_DESKTOP, six words on the things they name);
//          hotspot the taskbar; hotspot the menu button
//   11–14  three buttons in the corner (LB_WINDOW) + check; hotspot — the button
//          that closes for good (WINDOW_CORNER); DEMO minimise, bring it back,
//          maximise, close; predict — where did the minimised story go?
//   15–17  four ways to stop (STOP_LADDER); sort — eight situations into
//          Sleep / Log out / Restart / Shut down; restart or shut down? (re- =
//          again, an English beat) + check — all the way off
//   18–21  do not hold the power button + predict (holding it mid-save);
//          stopping properly (steps, POWER_MENU); DEMO save, close, menu, Shut
//          down; order — the five stopping steps
//   22–24  FROZEN + check — which computer is frozen?; estimate — how long do
//          you hold the button?; hotspot — locked or off? (LOCKED_VS_OFF)
//   25–26  the checklist with the exit check; "On your own computer" (last,
//          unassessed — docs/digital-skills-course.md §5.4)
//
// House notes:
//  · Every slide's `check:` or `activity:` is its LAST key; no slide has both.
//  · Activity strings use name/explain, never text/content (the narration
//    generator reads text/content aloud).
//  · Hotspots strip every <text> not tagged class="keep", so interface words
//    that are part of the screen are tagged keep in diagrams.js, and every
//    hotspot asks by FUNCTION ("the button that closes the window for good"),
//    never by a word printed on the thing. Every plausible control is a target,
//    so a wrong tap is NAMED rather than just marked wrong.
//  · No slide sends the student to paper or a partner: the old "Check your
//    notebook" slide is the checklist + exit check now.
//  · The demo slides' widget params follow the `desktop` skin's action table
//    (UPGRADE-PLAN §3.1) — the same actions sim.js is written in.
//  · A picture that must be READ and carries a check sits on a `split`, never a
//    `showcase` (docs/lesson-renderer-gap.md §0: a check on a showcase shrinks
//    the picture to ~0.40 scale, where interface labels are unreadable).
//
// Slide audio is DERIVED from position (slideAudioUrl), so inserting a slide
// shifts the narration of every slide after it — delete the unit's audio folder
// and re-run `npm run sync-audio` after any change to the slide order.
import { DIAGRAMS } from './diagrams.js';

const SKY = '#0ea5e9';
const DEMO = '#0284c7';
const PURPLE = '#a855f7';
const AMBER = '#f59e0b';
const RED = '#ef4444';
const GREEN = '#10b981';

/**
 * Hotspot targets are circles, and a bar is long and thin: one circle cannot
 * cover it without spilling onto the desktop. So a bar is a row of circles that
 * all share one id and name — any of them is a hit on that bar. The FIRST x is
 * where the answer ring is drawn when the answer is revealed.
 */
const along = (id, name, nameVn, y, r, xs) => xs.map((x) => ({ id, x, y, r, name, nameVn }));

/** A box covered by a grid of circles (every point of it within r of a centre), all one id. */
const grid = (id, name, nameVn, xs, ys, r) => ys.flatMap((y) => along(id, name, nameVn, y, r, xs));

// DESKTOP_ANATOMY, shared by the two desktop hotspots. Listed in this order in
// each target list, because the first circle a tap falls in wins: the window
// (250–680 × 90–370) before the desktop around it, and both before the taskbar
// (440–492), whose circles reach 8 units above its top edge.
const WINDOW_NAME = ['the window — the box your work sits in', 'cửa sổ — cái khung chứa bài làm của em'];
const DESKTOP_NAME = ['the desktop — the background everything sits on', 'màn hình nền — phần nền mà mọi thứ nằm trên đó'];
const ICON_NAME = ['an icon — a little picture that opens one thing', 'một biểu tượng — hình nhỏ để mở một thứ'];
const DESKTOP_DECOYS = [
  // the window: a 4 × 2 grid, r 86 ≥ half the diagonal of a 100 × 140 cell
  ...grid('window', ...WINDOW_NAME, [320, 415, 510, 610], [160, 300], 86),
  { id: 'icon', x: 76, y: 84, r: 52, name: ICON_NAME[0], nameVn: ICON_NAME[1] },
  // the desktop around it: the left side, the strip along the top, the right
  // side, and the gap between the window and the taskbar
  { id: 'desktop', x: 125, y: 250, r: 105, name: DESKTOP_NAME[0], nameVn: DESKTOP_NAME[1] },
  { id: 'desktop', x: 125, y: 385, r: 52, name: DESKTOP_NAME[0], nameVn: DESKTOP_NAME[1] },
  ...along('desktop', ...DESKTOP_NAME, 45, 42, [200, 300, 400, 500, 600, 700]),
  ...along('desktop', ...DESKTOP_NAME, 405, 32, [300, 380, 460, 540, 620]),
  { id: 'desktop', x: 745, y: 160, r: 52, name: DESKTOP_NAME[0], nameVn: DESKTOP_NAME[1] },
  { id: 'desktop', x: 745, y: 265, r: 52, name: DESKTOP_NAME[0], nameVn: DESKTOP_NAME[1] },
  { id: 'desktop', x: 745, y: 370, r: 52, name: DESKTOP_NAME[0], nameVn: DESKTOP_NAME[1] },
];

const TASKBAR_XS = [430, 30, 70, 110, 150, 190, 230, 270, 310, 350, 390, 470, 510, 550, 590, 630, 670, 710, 750, 790];

export const notes = [
  // 1 ─ Hero ──────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: SKY,
    icon: 'Power',
    brand: 'Technology',
    brandVn: 'Công nghệ',
    eyebrow: 'Unit T1',
    eyebrowVn: 'Bài T1',
    title: 'Starting and Stopping',
    titleVn: 'Bật máy và Tắt máy',
    objective: 'Turn a computer on, log in, find your way around the screen, and stop it properly — without ever pulling the plug.',
    objectiveVn: 'Bật máy tính, đăng nhập, tìm đường quanh màn hình, và tắt máy đúng cách — mà không bao giờ phải rút điện.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      text: 'You will **tap**, **sort**, **order** and **predict** your way through it, and watch the computer do each job first. **17 things are scored** — the first one is on the next slide.',
      textVn: 'Em sẽ **chạm**, **sắp xếp**, **xếp thứ tự** và **dự đoán** trong suốt bài học, và được xem máy tính làm từng việc trước. **17 mục được tính điểm** — mục đầu tiên ở slide sau.',
    },
  },

  // 2 ─ Starter: HOTSPOT — the power symbol ───────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Power',
    eyebrow: 'Start with what you know',
    eyebrowVn: 'Bắt đầu từ điều em đã biết',
    title: 'Find the Power Symbol',
    titleVn: 'Tìm biểu tượng nguồn',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Four little pictures. One of them means **power**.',
    textVn: 'Bốn hình nhỏ. Một hình có nghĩa là **nguồn điện**.',
    sub: 'Computers, tablets and phones all have them. The power one is on the button that turns the machine on. Tap it.',
    subVn: 'Máy tính, máy tính bảng và điện thoại đều có chúng. Hình nguồn điện nằm trên nút bật máy. Hãy chạm vào nó.',
    activity: {
      id: 'act_power_symbol',
      type: 'hotspot',
      prompt: 'Tap the symbol you would look for on the button that turns a computer on.',
      promptVn: 'Chạm vào biểu tượng em sẽ tìm trên nút bật máy tính.',
      svg: DIAGRAMS.SYMBOLS,
      viewBox: '0 0 760 250',
      targets: [
        { id: 'wifi', x: 113, y: 103, r: 78, name: 'Wi-Fi — the curved lines show the internet connection', nameVn: 'Wi-Fi — các đường cong cho biết kết nối internet' },
        { id: 'battery', x: 297, y: 103, r: 78, name: 'the battery — how much charge is left', nameVn: 'pin — còn bao nhiêu điện' },
        { id: 'power', x: 481, y: 103, r: 78, name: 'the power symbol — a circle with a line through the top', nameVn: 'biểu tượng nguồn — một vòng tròn có một vạch ở trên đỉnh' },
        { id: 'volume', x: 665, y: 103, r: 78, name: 'the volume — how loud the sound is', nameVn: 'âm lượng — âm thanh to hay nhỏ' },
      ],
      correct: 'power',
      explain: 'The **power symbol** is a circle with a line through the top. It grew out of **1** and **0** — on and off. It is on the **power button** of every computer, tablet, phone and TV, so you can start a machine you have never seen before.',
      explainVn: '**Biểu tượng nguồn** là một vòng tròn có một vạch ở trên đỉnh. Nó bắt nguồn từ số **1** và số **0** — bật và tắt. Nó nằm trên **nút nguồn** của mọi máy tính, máy tính bảng, điện thoại và TV, nên em có thể bật cả một chiếc máy em chưa từng thấy.',
    },
  },

  // 3 ─ Turning it on (steps + the laptop, labelled) ──────────────────────────
  {
    layout: 'steps',
    dense: true,
    icon: 'Power',
    accent: SKY,
    eyebrow: 'One press, then wait',
    eyebrowVn: 'Bấm một lần, rồi chờ',
    title: 'Turning It On',
    titleVn: 'Bật máy',
    content: 'Find the **power button** — it carries the symbol you just tapped. Then every computer starts in the same four steps.',
    contentVn: 'Tìm **nút nguồn** — nó mang biểu tượng em vừa chạm. Sau đó mọi máy tính đều khởi động theo bốn bước giống nhau.',
    inlineSvg: DIAGRAMS.LB_COMPUTER,
    steps: [
      {
        text: 'Press the **power button once**. One short press is enough — pressing it again can turn it back off.',
        textVn: 'Bấm **nút nguồn một lần**. Một lần bấm nhẹ là đủ — bấm thêm có thể làm máy tắt lại.',
      },
      {
        text: 'Wait. The **power light** comes on, but the screen stays black for a moment. **That is normal.**',
        textVn: 'Chờ một chút. **Đèn nguồn** sáng lên, nhưng màn hình vẫn đen trong giây lát. **Đó là bình thường.**',
      },
      {
        text: 'The **login screen** appears, with your name on it.',
        textVn: '**Màn hình đăng nhập** hiện ra, có tên của em trên đó.',
      },
      {
        text: 'Type your **password** and press **Enter** (or the arrow next to the box).',
        textVn: 'Nhập **mật khẩu** của em rồi bấm **Enter** (hoặc mũi tên bên cạnh ô).',
      },
    ],
    reveal: {
      label: 'Nothing happened at all. Now what?',
      labelVn: 'Không có gì xảy ra cả. Giờ làm sao?',
      prompt: 'You pressed the button and the screen stayed black. No light, no sound.',
      promptVn: 'Em đã bấm nút mà màn hình vẫn đen. Không đèn, không tiếng.',
      answer: 'Check the **plug** and the **wall switch** first — on a laptop, plug in the **charger**. A computer with no electricity looks exactly like a broken one, and it is the cheapest thing to fix.',
      answerVn: 'Hãy kiểm tra **phích cắm** và **công tắc điện** trước — với máy tính xách tay, hãy cắm **sạc**. Một chiếc máy không có điện trông y hệt một chiếc máy hỏng, và đó lại là thứ dễ sửa nhất.',
    },
  },

  // 4 ─ DEMO: press, wait, log in ─────────────────────────────────────────────
  {
    // The simulator in demo mode — the same engine, skin and machine as the
    // Try It job "turn it on and log in" (sim.js), so the student watches the
    // exact screen they are about to be handed.
    layout: 'split',
    icon: 'Eye',
    accent: DEMO,
    ratio: 62,
    eyebrow: 'Watch first',
    eyebrowVn: 'Xem trước',
    title: 'Watch: Press, Wait, Log In',
    titleVn: 'Xem: Bấm, chờ, đăng nhập',
    content: 'This computer is switched **off**. Watch the whole start, slowly: **one short press**, the wait, the **login screen**, the password, then **Enter**.',
    contentVn: 'Chiếc máy này đang **tắt**. Hãy xem toàn bộ quá trình khởi động, thật chậm: **một lần bấm nhẹ**, chờ, **màn hình đăng nhập**, mật khẩu, rồi **Enter**.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'desktop',
        initial: { power: 'off', user: 'Ha Vi', password: 'sunflower' },
        script: [
          { type: 'pressPower', say: 'One short press of the power button. The screen stays black for a moment — do not press it again.', sayVn: 'Bấm nhẹ nút nguồn một lần. Màn hình đen trong giây lát — đừng bấm lại.' },
          { type: 'typePassword', text: 'sunflower', say: 'The login screen shows Ha Vi’s name. She types her password. The dots hide it from anyone watching.', sayVn: 'Màn hình đăng nhập hiện tên Hà Vi. Bạn ấy nhập mật khẩu. Các dấu chấm giấu nó khỏi người đang nhìn.' },
          { type: 'submitLogin', say: 'Enter — or the arrow — and her own desktop opens.', sayVn: 'Bấm Enter — hoặc mũi tên — và màn hình nền của chính bạn ấy mở ra.' },
        ],
      },
    },
    notes: [
      {
        tone: 'info',
        text: 'The password shows as **dots** on purpose: a person looking over your shoulder cannot read it.',
        textVn: 'Mật khẩu hiện thành **dấu chấm** là có chủ ý: người nhìn qua vai em không đọc được.',
      },
    ],
  },

  // 5 ─ ORDER — the four start-up steps ───────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ListChecks',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Start It in Order',
    titleVn: 'Khởi động theo thứ tự',
    label: 'Order',
    labelVn: 'Xếp thứ tự',
    labelIcon: 'ListChecks',
    text: 'Four steps start every computer.',
    textVn: 'Bốn bước khởi động mọi máy tính.',
    sub: 'Put them in order, **first to last**.',
    subVn: 'Hãy xếp chúng theo thứ tự, **từ đầu đến cuối**.',
    activity: {
      id: 'act_start_order',
      type: 'order',
      prompt: 'Put the four start-up steps in order.',
      promptVn: 'Xếp bốn bước khởi động theo đúng thứ tự.',
      steps: [
        { id: 'press', name: 'Press the power button once', nameVn: 'Bấm nút nguồn một lần' },
        { id: 'wait', name: 'Wait while the screen is black', nameVn: 'Chờ trong lúc màn hình còn đen' },
        { id: 'login', name: 'The login screen appears', nameVn: 'Màn hình đăng nhập hiện ra' },
        { id: 'password', name: 'Type your password and press Enter', nameVn: 'Nhập mật khẩu rồi bấm Enter' },
      ],
      explain: 'Nothing happens until you **press**. The **wait** is the step people skip — they press again, thinking nothing worked, and turn it back off. Only when it has woken up does it show the **login screen**, and only then can you type your **password**.',
      explainVn: 'Không có gì xảy ra cho đến khi em **bấm**. **Chờ** là bước người ta hay bỏ qua — họ bấm lại vì tưởng máy không chạy, và làm máy tắt mất. Chỉ khi máy đã khởi động xong nó mới hiện **màn hình đăng nhập**, và lúc đó em mới nhập được **mật khẩu**.',
    },
  },

  // 6 ─ Your password is yours + CHECK ────────────────────────────────────────
  {
    layout: 'split',
    icon: 'ShieldCheck',
    accent: AMBER,
    ratio: 50,
    title: 'Your Password Is Yours',
    titleVn: 'Mật khẩu là của riêng em',
    content: 'Logging in is how the computer knows **which work is yours**. Your files, your desktop, your saved games — all of it hangs off your name and your password.',
    contentVn: 'Đăng nhập là cách máy tính biết **bài nào là của em**. Tệp của em, màn hình nền của em, những trò em đã lưu — tất cả đều gắn với tên và mật khẩu của em.',
    inlineSvg: DIAGRAMS.LOGIN_STICKY,
    notes: [
      {
        tone: 'write',
        text: '**Log in:** to tell the computer who you are, using your name and your password.\n**Password:** the secret word that proves the account is yours.',
        textVn: '**Đăng nhập (log in):** cho máy tính biết em là ai, bằng tên và mật khẩu của em.\n**Mật khẩu (password):** từ bí mật chứng minh tài khoản là của em.',
      },
      {
        tone: 'homework',
        text: 'A password written on a note stuck to the screen is **not a password any more**. Anyone who walks past can be you.',
        textVn: 'Một mật khẩu ghi trên tờ giấy dán vào màn hình thì **không còn là mật khẩu nữa**. Bất kỳ ai đi ngang qua đều có thể giả làm em.',
      },
    ],
    check: {
      id: 'chk_password',
      q: 'Your friend asks for your password so they can borrow the computer for five minutes. What should you do?',
      qVn: 'Bạn của em xin mật khẩu để mượn máy tính năm phút. Em nên làm gì?',
      options: [
        { val: 'A', text: 'Tell them the password — it is only five minutes.', textVn: 'Nói mật khẩu cho bạn — chỉ có năm phút thôi mà.' },
        { val: 'B', text: 'Type it in for them, so they never see it.', textVn: 'Tự nhập hộ bạn, để bạn không nhìn thấy mật khẩu.' },
        { val: 'C', text: 'Log out, and let them log in with their own account.', textVn: 'Đăng xuất, và để bạn đăng nhập bằng tài khoản riêng.' },
        { val: 'D', text: 'Write it on a note for them, so they do not forget it.', textVn: 'Viết mật khẩu ra giấy cho bạn, để bạn khỏi quên.' },
      ],
      correct: 'C',
      expEn: 'Every person gets their own account for exactly this reason. Logging out takes two seconds and gives your friend their own desktop — and anything they do stays on their name, not yours. Typing it in for them (B) still hands them YOUR account; A and D hand them the password itself.',
      expVn: 'Mỗi người có tài khoản riêng chính là vì lý do này. Đăng xuất chỉ mất hai giây và cho bạn em màn hình nền của chính bạn ấy — và mọi việc bạn ấy làm sẽ mang tên bạn ấy, không phải tên em. Tự nhập hộ (B) vẫn là đưa bạn TÀI KHOẢN của em; A và D thì đưa luôn cả mật khẩu.',
    },
  },

  // 7 ─ SORT — password habits ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: AMBER,
    icon: 'ShieldCheck',
    eyebrow: 'Sort it',
    eyebrowVn: 'Sắp xếp',
    title: 'Keep It, or Give It Away?',
    titleVn: 'Giữ kín, hay làm lộ?',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Layers',
    text: 'Some habits keep your account **yours**.',
    textVn: 'Có những thói quen giữ tài khoản **là của em**.',
    sub: 'Others give it away without you noticing. Sort the six habits.',
    subVn: 'Có những thói quen làm lộ nó mà em không hề hay biết. Hãy sắp xếp sáu thói quen.',
    activity: {
      id: 'act_password_habits',
      type: 'sort',
      prompt: 'Does each habit keep your account yours, or give it away?',
      promptVn: 'Mỗi thói quen giữ tài khoản là của em, hay làm lộ nó?',
      bins: [
        { id: 'keep', name: 'Keeps it yours', nameVn: 'Giữ nó là của em' },
        { id: 'away', name: 'Gives it away', nameVn: 'Làm lộ nó' },
      ],
      cards: [
        { id: 'nobody', name: 'Telling nobody, not even a friend', nameVn: 'Không nói cho ai, kể cả bạn thân', bin: 'keep' },
        { id: 'logout', name: 'Logging out when you leave', nameVn: 'Đăng xuất khi rời máy', bin: 'keep' },
        { id: 'hide', name: 'Hiding your fingers as you type', nameVn: 'Che tay khi nhập mật khẩu', bin: 'keep' },
        { id: 'note', name: 'A note stuck on the screen', nameVn: 'Một tờ giấy dán trên màn hình', bin: 'away' },
        { id: 'aloud', name: 'Saying it out loud', nameVn: 'Đọc to mật khẩu', bin: 'away' },
        { id: 'share', name: 'Letting a friend use your account', nameVn: 'Cho bạn dùng tài khoản của em', bin: 'away' },
      ],
      explain: 'A password only works while **nobody else knows it**. A note, saying it aloud, or lending your account all hand it over. **Logging out** matters too: a computer left logged in needs no password at all.',
      explainVn: 'Mật khẩu chỉ có tác dụng khi **không ai khác biết nó**. Một tờ giấy, đọc to, hay cho mượn tài khoản đều là trao nó cho người khác. **Đăng xuất** cũng quan trọng: một chiếc máy vẫn đang đăng nhập thì chẳng cần mật khẩu nào cả.',
    },
  },

  // 8 ─ The desktop tour (LB_DESKTOP, labelled) ───────────────────────────────
  {
    layout: 'showcase',
    icon: 'ScanEye',
    accent: SKY,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Look Around the Desktop',
    titleVn: 'Nhìn quanh màn hình nền',
    inlineSvg: DIAGRAMS.LB_DESKTOP,
    caption: 'Six words for six things on every computer. The **desktop** is the whole background. An **icon** is a little picture. Your work sits in a **window**. The **taskbar** runs along the bottom, with the **menu button** at one end and the **clock** at the other.',
    captionVn: 'Sáu từ cho sáu thứ trên mọi máy tính. **Màn hình nền (desktop)** là toàn bộ phần nền. **Biểu tượng (icon)** là một hình nhỏ. Bài làm của em nằm trong **cửa sổ (window)**. **Thanh tác vụ (taskbar)** chạy dọc phía dưới, với **nút trình đơn (menu button)** ở một đầu và **đồng hồ (clock)** ở đầu kia.',
  },

  // 9 ─ HOTSPOT — the taskbar ─────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'MousePointerClick',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Find the Taskbar',
    titleVn: 'Tìm thanh tác vụ',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'The **taskbar** runs along the bottom.',
    textVn: '**Thanh tác vụ** chạy dọc phía dưới.',
    sub: 'It holds the menu button, the clock, and a button for **everything that is open**. Tap it.',
    subVn: 'Nó chứa nút trình đơn, đồng hồ, và một nút cho **mọi thứ đang mở**. Hãy chạm vào nó.',
    activity: {
      id: 'act_taskbar',
      type: 'hotspot',
      prompt: 'Tap the taskbar — the bar that shows everything that is open.',
      promptVn: 'Chạm vào thanh tác vụ — thanh cho thấy mọi thứ đang mở.',
      svg: DIAGRAMS.DESKTOP_ANATOMY,
      viewBox: '0 0 800 500',
      // Everything ON the bar — the menu button, the clock — is part of the
      // taskbar, so the whole bar is one target.
      targets: [
        ...DESKTOP_DECOYS,
        ...along('taskbar', 'the taskbar', 'thanh tác vụ', 466, 34, TASKBAR_XS),
      ],
      correct: 'taskbar',
      explain: 'The **taskbar** is the dark bar along the bottom. The menu button sits at its left end and the clock at its right, and every open window gets a button in between — so you can always see what is running.',
      explainVn: '**Thanh tác vụ** là thanh màu tối chạy dọc phía dưới. Nút trình đơn nằm ở đầu bên trái, đồng hồ ở đầu bên phải, và mỗi cửa sổ đang mở có một nút ở giữa — nên em luôn thấy được những gì đang chạy.',
    },
  },

  // 10 ─ HOTSPOT — the menu button ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'LayoutGrid',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Find the Menu',
    titleVn: 'Tìm trình đơn',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Every program lives in the **menu**.',
    textVn: 'Mọi chương trình đều nằm trong **trình đơn**.',
    sub: 'It is also where you go to **stop** the computer. Tap the button that opens it.',
    subVn: 'Đó cũng là nơi em đến để **tắt** máy. Chạm vào nút mở nó ra.',
    activity: {
      id: 'act_menu_button',
      type: 'hotspot',
      prompt: 'Tap the button that opens the list of all your programs.',
      promptVn: 'Chạm vào nút mở danh sách tất cả chương trình của em.',
      svg: DIAGRAMS.DESKTOP_ANATOMY,
      viewBox: '0 0 800 500',
      targets: [
        { id: 'menu', x: 40, y: 466, r: 26, name: 'the menu button', nameVn: 'nút trình đơn' },
        { id: 'notes', x: 96, y: 466, r: 20, name: 'the button for the open Notes window — it brings that window back', nameVn: 'nút của cửa sổ Notes đang mở — nó đưa cửa sổ đó trở lại' },
        { id: 'files', x: 144, y: 466, r: 20, name: 'Files — one program kept on the taskbar, not the list of all of them', nameVn: 'Files — một chương trình được ghim trên thanh tác vụ, không phải danh sách tất cả' },
        ...along('search', 'the search box — it finds things by name', 'ô tìm kiếm — nó tìm theo tên', 466, 22, [280, 196, 226, 256, 316, 346, 370]),
        { id: 'wifi', x: 668, y: 466, r: 26, name: 'the wifi symbol — the internet connection', nameVn: 'biểu tượng wifi — kết nối internet' },
        { id: 'clock', x: 748, y: 466, r: 30, name: 'the clock', nameVn: 'đồng hồ' },
        ...along('bar', 'an empty part of the taskbar', 'một chỗ trống trên thanh tác vụ', 466, 26, [490, 410, 450, 530, 570, 610]),
        ...DESKTOP_DECOYS,
      ],
      correct: 'menu',
      explain: 'The **menu button** is at the **left end** of the taskbar. It opens the list of every program — and at the bottom of that list is the **power** choice you will need to stop the computer properly.',
      explainVn: '**Nút trình đơn** nằm ở **đầu bên trái** thanh tác vụ. Nó mở danh sách mọi chương trình — và ở cuối danh sách đó là mục **nguồn** mà em cần để tắt máy đúng cách.',
    },
  },

  // 11 ─ Three buttons in the corner (LB_WINDOW) + CHECK ──────────────────────
  {
    layout: 'split',
    icon: 'Grid3x3',
    accent: SKY,
    ratio: 50,
    title: 'Three Buttons in the Corner',
    titleVn: 'Ba nút ở góc cửa sổ',
    content: 'Every window has the same three buttons at its **top right**, always in the same order: **hide it**, **make it fill the screen**, **close it**.\n\nOnly the last one ends anything.',
    contentVn: 'Mọi cửa sổ đều có ba nút giống nhau ở **góc trên bên phải**, luôn theo cùng thứ tự: **giấu đi**, **cho chiếm đầy màn hình**, **đóng lại**.\n\nChỉ nút cuối cùng mới kết thúc thứ gì đó.',
    inlineSvg: DIAGRAMS.LB_WINDOW,
    notes: [
      {
        tone: 'write',
        text: '**Minimise (–):** hides the window on the taskbar. It is still open.\n**Maximise (□):** makes the window fill the screen. Press it again, or double-click the title bar, to make it smaller.\n**Close (X):** ends the window. Save first.',
        textVn: '**Thu nhỏ (–):** giấu cửa sổ xuống thanh tác vụ. Nó vẫn đang mở.\n**Phóng to (□):** cho cửa sổ chiếm đầy màn hình. Bấm lại, hoặc bấm đúp vào thanh tiêu đề, để thu nó lại.\n**Đóng (X):** kết thúc cửa sổ. Hãy lưu trước.',
      },
    ],
    check: {
      id: 'chk_close_vs_min',
      q: 'You press the button with the line on it (–) at the top of a window. What happens to your work?',
      qVn: 'Em bấm nút có dấu gạch ngang (–) ở đầu cửa sổ. Bài làm của em sẽ ra sao?',
      options: [
        { val: 'A', text: 'It closes, and anything not saved is gone.', textVn: 'Nó đóng lại, và phần chưa lưu sẽ mất.' },
        { val: 'B', text: 'It gets bigger and fills the screen.', textVn: 'Nó to ra và chiếm đầy màn hình.' },
        { val: 'C', text: 'It is saved, then closed.', textVn: 'Nó được lưu, rồi đóng lại.' },
        { val: 'D', text: 'It is still open — the window just hides on the taskbar.', textVn: 'Nó vẫn đang mở — cửa sổ chỉ ẩn xuống thanh tác vụ.' },
      ],
      correct: 'D',
      expEn: 'That is **minimise**. The window slides down to the taskbar and waits — click it there and it comes straight back. A is the X (close); B is the square (maximise); and minimise does not save anything (C).',
      expVn: 'Đó là **thu nhỏ**. Cửa sổ trượt xuống thanh tác vụ và chờ ở đó — bấm vào nó là cửa sổ quay lại ngay. A là dấu X (đóng); B là ô vuông (phóng to); và thu nhỏ không lưu gì cả (C).',
    },
  },

  // 12 ─ HOTSPOT — the button that closes for good ────────────────────────────
  {
    layout: 'statement',
    accent: RED,
    icon: 'MousePointerClick',
    eyebrow: 'Up close',
    eyebrowVn: 'Nhìn gần',
    title: 'The One That Ends It',
    titleVn: 'Nút kết thúc',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: 'Ha Vi’s story window, drawn big.',
    textVn: 'Cửa sổ truyện của Hà Vi, vẽ to.',
    sub: 'This is its top-right corner. Tap the button that closes the window **for good**.',
    subVn: 'Đây là góc trên bên phải. Chạm vào nút đóng cửa sổ **hẳn luôn**.',
    activity: {
      id: 'act_close_button',
      type: 'hotspot',
      prompt: 'Tap the button that closes the window for good.',
      promptVn: 'Chạm vào nút đóng hẳn cửa sổ.',
      svg: DIAGRAMS.WINDOW_CORNER,
      viewBox: '0 0 760 380',
      targets: [
        { id: 'close', x: 662, y: 90, r: 48, name: 'close (X) — it ends the window', nameVn: 'đóng (X) — nó kết thúc cửa sổ' },
        { id: 'maximise', x: 550, y: 90, r: 48, name: 'maximise (□) — it makes the window fill the screen', nameVn: 'phóng to (□) — nó cho cửa sổ chiếm đầy màn hình' },
        { id: 'minimise', x: 438, y: 90, r: 48, name: 'minimise (–) — it only hides the window on the taskbar', nameVn: 'thu nhỏ (–) — nó chỉ giấu cửa sổ xuống thanh tác vụ' },
        { id: 'title', x: 190, y: 90, r: 80, name: 'the title bar — it shows the window’s name', nameVn: 'thanh tiêu đề — nó cho biết tên cửa sổ' },
        { id: 'work', x: 385, y: 270, r: 110, name: 'the work area — where the story is written', nameVn: 'vùng làm việc — nơi viết truyện' },
      ],
      correct: 'close',
      explain: 'The **close** button is the **X** at the far right — often red. It ends the window, so **save first**. The line (–) only hides the window and the square (□) only makes it bigger; neither one ends anything.',
      explainVn: 'Nút **đóng** là dấu **X** ở tận bên phải — thường có màu đỏ. Nó kết thúc cửa sổ, nên **hãy lưu trước**. Dấu gạch (–) chỉ giấu cửa sổ đi và ô vuông (□) chỉ làm nó to ra; không nút nào kết thúc thứ gì cả.',
    },
  },

  // 13 ─ DEMO: minimise, bring it back, maximise, close ───────────────────────
  {
    layout: 'split',
    icon: 'Eye',
    accent: DEMO,
    ratio: 62,
    eyebrow: 'Watch first',
    eyebrowVn: 'Xem trước',
    title: 'Watch: Hide It, Bring It Back',
    titleVn: 'Xem: Giấu đi, đưa trở lại',
    content: 'One window, all three buttons. Watch it **hide** on the taskbar, come **back** from its taskbar button, **fill the screen**, and **close**.',
    contentVn: 'Một cửa sổ, cả ba nút. Hãy xem nó **ẩn** xuống thanh tác vụ, **trở lại** từ nút của nó trên thanh tác vụ, **chiếm đầy màn hình**, rồi **đóng**.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'desktop',
        initial: {
          power: 'on',
          windows: [{ app: 'notes', title: 'story', state: 'normal', saved: true }],
        },
        script: [
          { type: 'minimise', title: 'story', say: 'Minimise. The window drops down to the taskbar — it is still open.', sayVn: 'Thu nhỏ. Cửa sổ tụt xuống thanh tác vụ — nó vẫn đang mở.' },
          { type: 'restore', title: 'story', say: 'Click its button on the taskbar, and it comes straight back, exactly as it was.', sayVn: 'Bấm vào nút của nó trên thanh tác vụ, và nó quay lại ngay, y như cũ.' },
          { type: 'maximise', title: 'story', say: 'Maximise. Now it fills the whole screen. Press it again to make it smaller.', sayVn: 'Phóng to. Giờ nó chiếm cả màn hình. Bấm lại để thu nó nhỏ lại.' },
          { type: 'close', title: 'story', say: 'Close. The story was saved, so it closes without asking — and its button leaves the taskbar.', sayVn: 'Đóng. Truyện đã được lưu, nên nó đóng mà không hỏi gì — và nút của nó rời khỏi thanh tác vụ.' },
        ],
      },
    },
    notes: [
      {
        tone: 'info',
        text: 'Watch the **taskbar** while the window hides: its button stays there the whole time. The button leaves only when the window **closes**.',
        textVn: 'Hãy nhìn **thanh tác vụ** khi cửa sổ ẩn đi: nút của nó vẫn ở đó suốt. Nút chỉ biến mất khi cửa sổ **đóng**.',
      },
    ],
  },

  // 14 ─ PREDICT — where did the minimised window go? ─────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    title: 'Where Did It Go?',
    titleVn: 'Nó đi đâu rồi?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelIcon: 'Sparkles',
    text: 'Ha Vi presses **minimise (–)** by mistake.',
    textVn: 'Hà Vi lỡ bấm **thu nhỏ (–)**.',
    sub: 'Her story is **not saved**, and the window vanishes. Where is her story now?',
    subVn: 'Truyện **chưa được lưu**, và cửa sổ biến mất. Truyện của bạn ấy giờ ở đâu?',
    activity: {
      id: 'act_where_minimised',
      type: 'predict',
      prompt: 'Where is Ha Vi’s story now?',
      promptVn: 'Truyện của Hà Vi giờ ở đâu?',
      options: [
        { val: 'gone', name: 'Gone — it was not saved, so she must start again', nameVn: 'Mất rồi — vì chưa lưu, bạn ấy phải viết lại' },
        { val: 'bin', name: 'In the Recycle Bin', nameVn: 'Trong Thùng rác' },
        { val: 'taskbar', name: 'Still open, waiting as a button on the taskbar', nameVn: 'Vẫn đang mở, chờ thành một nút trên thanh tác vụ' },
        { val: 'saved', name: 'Saved and closed', nameVn: 'Đã lưu và đóng' },
      ],
      correct: 'taskbar',
      explain: 'Minimise only **hides**. The story is still **open**, every word of it, waiting on the **taskbar** — one click on its button brings it back. It is **not saved** either: minimising and saving are different jobs.',
      explainVn: 'Thu nhỏ chỉ **giấu** đi. Truyện vẫn **đang mở**, từng chữ một, chờ trên **thanh tác vụ** — bấm một cái vào nút của nó là nó quay lại. Nó cũng **chưa được lưu**: thu nhỏ và lưu là hai việc khác nhau.',
    },
  },

  // 15 ─ Four ways to stop (the ladder) ───────────────────────────────────────
  {
    layout: 'showcase',
    icon: 'ListChecks',
    accent: PURPLE,
    title: 'Four Ways to Stop',
    titleVn: 'Bốn cách dừng máy',
    inlineSvg: DIAGRAMS.STOP_LADDER,
    caption: 'They are not four names for the same thing. Left to right, each one goes **further**. Only **Sleep** keeps your work open — for the other three, **save first**.',
    captionVn: 'Đây không phải bốn tên gọi của cùng một việc. Từ trái sang phải, mỗi cách đi **xa hơn**. Chỉ **Ngủ (Sleep)** giữ bài làm của em đang mở — với ba cách còn lại, **hãy lưu trước**.',
  },

  // 16 ─ SORT — which way to stop? ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'Sort it',
    eyebrowVn: 'Sắp xếp',
    title: 'Which Way to Stop?',
    titleVn: 'Dừng máy cách nào?',
    label: 'Sort',
    labelVn: 'Sắp xếp',
    labelIcon: 'Layers',
    text: 'Eight moments when you walk away from a computer.',
    textVn: 'Tám lúc em rời khỏi máy tính.',
    sub: 'Drop each one on the way to stop that fits it best.',
    subVn: 'Thả mỗi tình huống vào cách dừng máy hợp nhất.',
    activity: {
      id: 'act_four_stops',
      type: 'sort',
      prompt: 'Which way to stop fits each moment best?',
      promptVn: 'Cách dừng máy nào hợp nhất với mỗi tình huống?',
      bins: [
        { id: 'sleep', name: 'Sleep', nameVn: 'Ngủ' },
        { id: 'logout', name: 'Log out', nameVn: 'Đăng xuất' },
        { id: 'restart', name: 'Restart', nameVn: 'Khởi động lại' },
        { id: 'shutdown', name: 'Shut down', nameVn: 'Tắt máy' },
      ],
      cards: [
        { id: 'dinner', name: 'Dinner, back in 20 minutes', nameVn: 'Ăn tối, 20 phút nữa quay lại', bin: 'sleep' },
        { id: 'break', name: 'A short break', nameVn: 'Nghỉ một lát', bin: 'sleep' },
        { id: 'sister', name: 'Your sister’s turn', nameVn: 'Đến lượt chị em dùng máy', bin: 'logout' },
        { id: 'room', name: 'Leaving the computer room', nameVn: 'Rời phòng máy của trường', bin: 'logout' },
        { id: 'strange', name: 'A program acts strangely', nameVn: 'Một chương trình chạy lạ', bin: 'restart' },
        { id: 'updates', name: 'Updates are ready', nameVn: 'Có bản cập nhật mới', bin: 'restart' },
        { id: 'bedtime', name: 'Bedtime', nameVn: 'Giờ đi ngủ', bin: 'shutdown' },
        { id: 'holiday', name: 'Away all weekend', nameVn: 'Đi xa cả cuối tuần', bin: 'shutdown' },
      ],
      explain: '**Sleep** for a short break — it wakes in a second with your work still open. **Log out** when someone else is next — the computer stays on for them. **Restart** when something is acting strangely, or updates ask for it. **Shut down** when nobody will need it for a long time.',
      explainVn: '**Ngủ** cho quãng nghỉ ngắn — máy thức dậy trong một giây, bài vẫn đang mở. **Đăng xuất** khi người khác dùng tiếp — máy vẫn bật cho họ. **Khởi động lại** khi có gì đó chạy lạ, hoặc khi bản cập nhật yêu cầu. **Tắt máy** khi lâu nữa mới có người dùng.',
    },
  },

  // 17 ─ Restart or shut down? (re- = again) + CHECK ──────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi buổi học đều là một buổi học tiếng Anh',
    title: 'Restart, or Shut Down?',
    titleVn: 'Khởi động lại, hay Tắt máy?',
    label: 'Word parts',
    labelVn: 'Thành phần của từ',
    labelIcon: 'Languages',
    text: '**Re**start = start **again**.',
    textVn: '**Re**start = khởi động **lại**.',
    notes: [
      {
        tone: 'write',
        text: '**Restart:** the computer turns off, then starts again by itself.\n**Shut down:** the computer stops completely and stays off.',
        textVn: '**Khởi động lại (restart):** máy tắt, rồi tự bật lên lại.\n**Tắt máy (shut down):** máy dừng hoàn toàn và tắt hẳn.',
      },
    ],
    check: {
      id: 'chk_all_off',
      q: 'It is Friday afternoon. Nobody will use this computer until Monday. Which choice leaves it **all the way off**?',
      qVn: 'Chiều thứ Sáu. Không ai dùng máy này cho đến thứ Hai. Lựa chọn nào để máy **tắt hẳn**?',
      options: [
        { val: 'A', text: 'Shut down', textVn: 'Tắt máy (Shut down)' },
        { val: 'B', text: 'Restart — it switches off first', textVn: 'Khởi động lại — nó cũng tắt trước mà' },
        { val: 'C', text: 'Log out — you have finished with it', textVn: 'Đăng xuất — em đã dùng xong rồi' },
        { val: 'D', text: 'Sleep — it hardly uses any electricity', textVn: 'Ngủ — nó gần như không tốn điện' },
      ],
      correct: 'A',
      expEn: 'Only **Shut down** ends with the computer **off**. Restart switches off and then straight back **on** again — that is what "re-" means (B). Log out leaves it on at the login screen for the next person (C). Sleep only rests it (D).',
      expVn: 'Chỉ **Tắt máy** kết thúc với chiếc máy **tắt** hẳn. Khởi động lại tắt rồi **bật** lên ngay — đó chính là nghĩa của "re-" (B). Đăng xuất để máy vẫn bật ở màn hình đăng nhập cho người sau (C). Ngủ chỉ cho máy nghỉ (D).',
    },
  },

  // 18 ─ Do not hold the power button + PREDICT ───────────────────────────────
  {
    layout: 'callout',
    icon: 'AlertTriangle',
    accent: RED,
    eyebrow: 'The one rule',
    eyebrowVn: 'Quy tắc quan trọng nhất',
    title: 'Do Not Hold the Power Button',
    titleVn: 'Đừng giữ nút nguồn',
    content: 'Holding the power button down does not "turn the computer off". It **cuts the power**, in the middle of whatever the computer was doing — like snatching a book away while someone is still writing in it.',
    contentVn: 'Giữ nút nguồn không phải là "tắt máy". Nó **cắt điện**, ngay giữa lúc máy đang làm dở việc gì đó — giống như giật quyển vở khỏi tay người đang viết.',
    notes: [
      {
        tone: 'write',
        text: 'Hold the power button **only** when the computer is **frozen** and nothing at all answers.',
        textVn: 'Chỉ giữ nút nguồn **khi** máy **bị treo** và không còn gì phản hồi.',
      },
      {
        tone: 'info',
        text: 'A short **press** is fine — on most machines it just means "go to sleep".',
        textVn: 'Bấm **nhẹ** một cái thì không sao — trên phần lớn máy, nó chỉ có nghĩa là "hãy ngủ đi".',
      },
    ],
    activity: {
      id: 'act_hold_while_saving',
      type: 'predict',
      prompt: 'Ha Vi presses Save. While the computer is still saving, her brother HOLDS the power button until it goes off. What happens to her story?',
      promptVn: 'Hà Vi bấm Lưu. Trong lúc máy vẫn đang lưu, em trai bạn ấy GIỮ nút nguồn cho đến khi máy tắt. Truyện của bạn ấy sẽ ra sao?',
      options: [
        { val: 'fine', name: 'It is fine — she pressed Save', nameVn: 'Không sao — bạn ấy đã bấm Lưu rồi' },
        { val: 'damaged', name: 'It may be lost or damaged — the save never finished', nameVn: 'Nó có thể bị mất hoặc hỏng — việc lưu chưa kịp xong' },
        { val: 'faster', name: 'It is saved faster, because the computer hurries', nameVn: 'Nó được lưu nhanh hơn, vì máy vội' },
        { val: 'nothing', name: 'Nothing happens — the button only works when it is frozen', nameVn: 'Không có gì xảy ra — nút chỉ có tác dụng khi máy bị treo' },
      ],
      correct: 'damaged',
      explain: 'Saving takes a moment: the computer is still **writing** the file. Holding the button **cuts the power in the middle of it**, like snatching the pen mid-sentence. The story can be lost, or **damaged** so it will not even open. Menu → Shut down would have waited for the save to finish.',
      explainVn: 'Lưu cần một chút thời gian: máy vẫn đang **ghi** tệp. Giữ nút nguồn sẽ **cắt điện ngay giữa chừng**, như giật cây bút khi câu còn đang viết dở. Truyện có thể bị mất, hoặc **hỏng** đến mức không mở được. Trình đơn → Tắt máy thì sẽ chờ việc lưu xong đã.',
    },
  },

  // 19 ─ Stopping properly (steps + POWER_MENU) ───────────────────────────────
  {
    layout: 'steps',
    dense: true,
    icon: 'CheckCircle2',
    accent: GREEN,
    title: 'Stopping Properly',
    titleVn: 'Dừng máy đúng cách',
    content: 'Five steps, in this order, every time. The order is what protects your work.',
    contentVn: 'Năm bước, theo đúng thứ tự này, mọi lần. Chính thứ tự mới là thứ bảo vệ bài làm của em.',
    inlineSvg: DIAGRAMS.POWER_MENU,
    steps: [
      { text: '**Save** your work first (the Save button, or **Ctrl+S**). Nothing below this step will save it for you.', textVn: '**Lưu** bài làm trước (nút Save, hoặc **Ctrl+S**). Không bước nào phía dưới lưu hộ em cả.' },
      { text: '**Close** the windows you have open.', textVn: '**Đóng** các cửa sổ đang mở.' },
      { text: 'Open the **menu** at the end of the taskbar, then **Power**.', textVn: 'Mở **trình đơn** ở đầu thanh tác vụ, rồi chọn **Nguồn (Power)**.' },
      { text: 'Choose **Shut down**.', textVn: 'Chọn **Tắt máy (Shut down)**.' },
      { text: '**Wait** until the screen is black and the lights are off. Then you can leave.', textVn: '**Chờ** đến khi màn hình đen và đèn đã tắt. Lúc đó em mới rời đi.' },
    ],
    reveal: {
      label: 'Why wait for the lights?',
      labelVn: 'Sao phải chờ đèn tắt?',
      prompt: 'The screen went black straight away. Can you close the lid and go?',
      promptVn: 'Màn hình đã đen ngay lập tức. Em có thể gập máy lại và đi luôn không?',
      answer: 'Not yet. The screen goes dark **before** the computer has finished tidying up and putting your files away. The lights going out is the real signal.',
      answerVn: 'Chưa được. Màn hình tối **trước khi** máy tính làm xong việc dọn dẹp và cất tệp của em đi. Đèn tắt mới là tín hiệu thật.',
    },
  },

  // 20 ─ DEMO: save, close, menu, Shut down ───────────────────────────────────
  {
    layout: 'split',
    icon: 'Eye',
    accent: DEMO,
    ratio: 62,
    eyebrow: 'Watch first',
    eyebrowVn: 'Xem trước',
    title: 'Watch: Save, Then Shut Down',
    titleVn: 'Xem: Lưu, rồi tắt máy',
    content: 'Ha Vi’s story is open and **not saved**. Watch the five steps, in order: **save**, **close**, the **menu**, **Power**, **Shut down**.',
    contentVn: 'Truyện của Hà Vi đang mở và **chưa lưu**. Hãy xem năm bước, theo thứ tự: **lưu**, **đóng**, **trình đơn**, **Nguồn**, **Tắt máy**.',
    widget: {
      type: 'AppSim',
      params: {
        skin: 'desktop',
        initial: {
          power: 'on',
          windows: [{ app: 'notes', title: 'story', state: 'normal', saved: false }],
        },
        script: [
          { type: 'save', title: 'story', say: 'Save first — the Save button, or Ctrl+S. Now the story is safe.', sayVn: 'Lưu trước — nút Save, hoặc Ctrl+S. Giờ truyện đã an toàn.' },
          { type: 'close', title: 'story', say: 'Close the window. It is saved, so nothing is lost.', sayVn: 'Đóng cửa sổ. Truyện đã lưu, nên không mất gì cả.' },
          { type: 'openMenu', say: 'Open the menu, at the left end of the taskbar.', sayVn: 'Mở trình đơn, ở đầu bên trái thanh tác vụ.' },
          { type: 'openPowerMenu', say: 'Power, at the bottom of the menu. Four choices.', sayVn: 'Nguồn, ở cuối trình đơn. Bốn lựa chọn.' },
          { type: 'shutdown', say: 'Shut down. The computer tidies up, and then the screen and the lights go out.', sayVn: 'Tắt máy. Máy dọn dẹp xong, rồi màn hình và đèn tắt.' },
        ],
      },
    },
    notes: [
      {
        tone: 'info',
        text: 'Forgot to save? When work is still open, **Shut down stops and asks** first. Choose **Cancel**, save, then try again — never "shut down anyway".',
        textVn: 'Quên lưu? Khi bài vẫn đang mở, **Tắt máy sẽ dừng lại và hỏi** trước. Hãy chọn **Hủy (Cancel)**, lưu bài, rồi thử lại — đừng bao giờ chọn "vẫn tắt".',
      },
    ],
  },

  // 21 ─ ORDER — the five stopping steps ──────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'ListChecks',
    eyebrow: 'Your turn',
    eyebrowVn: 'Đến lượt em',
    title: 'Stop It in Order',
    titleVn: 'Tắt máy theo thứ tự',
    label: 'Order',
    labelVn: 'Xếp thứ tự',
    labelIcon: 'ListChecks',
    text: 'The order is what protects your work.',
    textVn: 'Chính thứ tự mới bảo vệ bài làm của em.',
    sub: 'Put the five stopping steps in order, **first to last**.',
    subVn: 'Xếp năm bước tắt máy theo thứ tự, **từ đầu đến cuối**.',
    activity: {
      id: 'act_stop_order',
      type: 'order',
      prompt: 'Put the five steps of stopping properly in order.',
      promptVn: 'Xếp năm bước tắt máy đúng cách theo thứ tự.',
      steps: [
        { id: 'save', name: 'Save your work', nameVn: 'Lưu bài làm của em' },
        { id: 'close', name: 'Close your windows', nameVn: 'Đóng các cửa sổ' },
        { id: 'menu', name: 'Open the menu, then Power', nameVn: 'Mở trình đơn, rồi Nguồn' },
        { id: 'shutdown', name: 'Choose Shut down', nameVn: 'Chọn Tắt máy' },
        { id: 'lights', name: 'Wait until the lights go out', nameVn: 'Chờ đến khi đèn tắt' },
      ],
      explain: '**Save** comes first because it is the only step that protects your work. **Close** next, so nothing is left asking questions. Then the **menu** and **Shut down** — and **wait for the lights**, the step everybody skips: the screen goes dark before the computer has finished.',
      explainVn: '**Lưu** đứng đầu vì đó là bước duy nhất bảo vệ bài làm. Tiếp theo là **đóng**, để không còn gì hỏi han nữa. Rồi **trình đơn** và **Tắt máy** — và **chờ đèn tắt**, bước ai cũng bỏ qua: màn hình tối trước khi máy làm xong việc.',
    },
  },

  // 22 ─ FROZEN + CHECK ───────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Snowflake',
    eyebrow: 'When nothing answers',
    eyebrowVn: 'Khi không gì phản hồi',
    title: 'Frozen',
    titleVn: 'Bị treo',
    label: 'Key word',
    labelVn: 'Từ khóa',
    labelIcon: 'Snowflake',
    text: '**Frozen** means **nothing answers**.',
    textVn: '**Bị treo** nghĩa là **không gì phản hồi**.',
    sub: 'Not the pointer, not the keys, not even the clock. That — and **only** that — is when you hold the power button down.',
    subVn: 'Con trỏ không nhúc nhích, phím không có tác dụng, đồng hồ đứng yên. Đó — và **chỉ** lúc đó — mới là lúc em giữ nút nguồn.',
    check: {
      id: 'chk_frozen',
      q: 'Which of these computers is **frozen**?',
      qVn: 'Máy tính nào dưới đây đang **bị treo**?',
      options: [
        { val: 'A', text: 'The pointer moves, but a big program is slow to open.', textVn: 'Con trỏ vẫn di chuyển, nhưng một chương trình lớn mở chậm.' },
        { val: 'B', text: 'For three minutes nothing has answered — not the pointer, not the keys — and the clock has stopped.', textVn: 'Suốt ba phút không gì phản hồi — cả con trỏ lẫn bàn phím — và đồng hồ đứng yên.' },
        { val: 'C', text: 'The screen is black, but pressing a key wakes it up.', textVn: 'Màn hình đen, nhưng bấm một phím là máy thức dậy.' },
        { val: 'D', text: 'It is showing the login screen, asking for a password.', textVn: 'Nó đang hiện màn hình đăng nhập, hỏi mật khẩu.' },
      ],
      correct: 'B',
      expEn: 'Only B is frozen: **nothing** answers at all. A is just **slow** — give it time. C was **asleep**, and it woke. D is **locked**: it is on and waiting for you. Holding the power button on A, C or D would throw work away for nothing.',
      expVn: 'Chỉ B là bị treo: **không gì** phản hồi cả. A chỉ **chậm** — hãy cho nó thời gian. C đang **ngủ**, và nó đã thức dậy. D đang **khóa**: máy vẫn bật và chờ em. Giữ nút nguồn ở A, C hay D là vứt bỏ bài làm một cách vô ích.',
    },
  },

  // 23 ─ ESTIMATE — how long do you hold it? ──────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Timer',
    eyebrow: 'Guess first',
    eyebrowVn: 'Đoán trước',
    title: 'How Long Do You Hold It?',
    titleVn: 'Giữ bao lâu?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelIcon: 'Timer',
    text: 'You hold the power button **down**.',
    textVn: 'Em giữ nút nguồn **xuống**.',
    sub: 'The computer is frozen, and you keep holding. About how many **seconds** until it switches off? Slide to your guess.',
    subVn: 'Máy bị treo, và em cứ giữ nguyên. Khoảng bao nhiêu **giây** thì máy tắt? Kéo thanh trượt đến dự đoán của em.',
    activity: {
      id: 'act_hold_seconds',
      type: 'estimate',
      prompt: 'About how many seconds do you hold the power button before a frozen computer switches off?',
      promptVn: 'Em giữ nút nguồn khoảng bao nhiêu giây thì chiếc máy bị treo mới tắt?',
      min: 1, max: 30, step: 1, unit: 's', answer: 8, tolerance: 0.5,
      explain: 'Usually about **5 to 10 seconds** — much longer than a press. Keep holding until the **lights go out**, then let go, wait a moment, and press it **once** to start again. A quick press of about one second only puts a working computer to **sleep**.',
      explainVn: 'Thường khoảng **5 đến 10 giây** — lâu hơn nhiều so với một lần bấm. Cứ giữ cho đến khi **đèn tắt**, rồi thả ra, chờ một chút, và bấm **một lần** để bật lại. Bấm nhanh khoảng một giây chỉ cho máy đang chạy **ngủ** thôi.',
    },
  },

  // 24 ─ HOTSPOT — locked, or off? ────────────────────────────────────────────
  {
    // A statement, not a split: the hotspot IS the picture, and a split would
    // draw LOCKED_VS_OFF twice on one slide. The evidence under each screen is
    // drawn and tagged keep, so the hotspot's copy can still be read.
    layout: 'statement',
    accent: SKY,
    icon: 'Eye',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    title: 'Locked, or Off?',
    titleVn: 'Đang khóa, hay đã tắt?',
    label: 'Tap it',
    labelVn: 'Chạm',
    labelIcon: 'MousePointerClick',
    text: '**Locked** is still **on**.',
    textVn: 'Đang **khóa** thì vẫn đang **bật**.',
    sub: 'Anything left open is still there, behind the login screen. A computer that is **off** has no lights and no fan. Look at the **lights**, not the screen.',
    subVn: 'Mọi thứ còn mở vẫn ở đó, phía sau màn hình đăng nhập. Máy đã **tắt** thì không có đèn và không có tiếng quạt. Hãy nhìn **đèn**, đừng nhìn màn hình.',
    activity: {
      id: 'act_still_on',
      type: 'hotspot',
      prompt: 'Tap the computer that is still switched on.',
      promptVn: 'Chạm vào chiếc máy vẫn đang bật.',
      svg: DIAGRAMS.LOCKED_VS_OFF,
      viewBox: '0 0 760 400',
      targets: [
        { id: 'a', x: 196, y: 190, r: 150, name: 'Screen A — locked: light on, fan running', nameVn: 'Màn hình A — đang khóa: đèn sáng, quạt chạy' },
        { id: 'a', x: 160, y: 342, r: 72, name: 'Screen A — locked: light on, fan running', nameVn: 'Màn hình A — đang khóa: đèn sáng, quạt chạy' },
        { id: 'b', x: 564, y: 190, r: 150, name: 'Screen B — off: no light, no fan', nameVn: 'Màn hình B — đã tắt: không đèn, không quạt' },
        { id: 'b', x: 528, y: 342, r: 72, name: 'Screen B — off: no light, no fan', nameVn: 'Màn hình B — đã tắt: không đèn, không quạt' },
      ],
      correct: 'a',
      explain: '**Screen A** is on. It is **locked** — showing the login screen — and its light is on and its fan is running, so anything left open is still in there. **Screen B** has no light and no fan: that one is really **off**.',
      explainVn: '**Màn hình A** đang bật. Nó đang **khóa** — hiện màn hình đăng nhập — và đèn sáng, quạt chạy, nên mọi thứ còn mở vẫn ở trong đó. **Màn hình B** không đèn, không quạt: chiếc đó mới thật sự **đã tắt**.',
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
    content: 'Next: the Vocab, then **Try It** — a pretend computer where you start it, stop it and rescue it yourself.\n\nLast question: the end of your day.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Thử Làm** — một chiếc máy tính giả để em tự bật, tự tắt và tự cứu nó.\n\nCâu hỏi cuối: cuối ngày của em.',
    items: [
      { text: 'Turn a computer on with **one press**, and **log in** with your own password.', textVn: 'Bật máy tính bằng **một lần bấm**, và **đăng nhập** bằng mật khẩu của chính em.' },
      { text: 'Name the **desktop**, an **icon**, a **window**, the **taskbar**, the **menu button** and the **clock**.', textVn: 'Gọi tên **màn hình nền**, **biểu tượng**, **cửa sổ**, **thanh tác vụ**, **nút trình đơn** và **đồng hồ**.' },
      { text: 'Use the corner buttons: **minimise**, **maximise**, **close** — and bring a window back from the taskbar.', textVn: 'Dùng các nút ở góc: **thu nhỏ**, **phóng to**, **đóng** — và đưa cửa sổ trở lại từ thanh tác vụ.' },
      { text: 'Choose **Sleep**, **Log out**, **Restart** or **Shut down** — and hold the power button **only** when it is frozen.', textVn: 'Chọn **Ngủ**, **Đăng xuất**, **Khởi động lại** hoặc **Tắt máy** — và **chỉ** giữ nút nguồn khi máy bị treo.' },
    ],
    check: {
      id: 'chk_exit',
      q: 'You have finished for the day. Your story is open and **not saved**. Which is the right way to stop?',
      qVn: 'Em đã xong việc hôm nay. Truyện của em đang mở và **chưa lưu**. Cách dừng máy nào là đúng?',
      options: [
        { val: 'A', text: 'Menu → Shut down, then save the story', textVn: 'Trình đơn → Tắt máy, rồi lưu truyện' },
        { val: 'B', text: 'Hold the power button until the lights go out', textVn: 'Giữ nút nguồn cho đến khi đèn tắt' },
        { val: 'C', text: 'Save, close the window, menu → Shut down, wait for the lights', textVn: 'Lưu, đóng cửa sổ, trình đơn → Tắt máy, chờ đèn tắt' },
        { val: 'D', text: 'Save, then menu → Restart', textVn: 'Lưu, rồi trình đơn → Khởi động lại' },
      ],
      correct: 'C',
      expEn: '**Save first**, close, then menu → Shut down, and wait for the lights. A has the order backwards: saving comes before Shut down, never after it. B cuts the power and can lose the story. D saves, but Restart turns the computer straight back on.',
      expVn: '**Lưu trước**, đóng, rồi trình đơn → Tắt máy, và chờ đèn tắt. A làm ngược thứ tự: lưu phải đứng trước Tắt máy, không bao giờ sau. B cắt điện và có thể làm mất truyện. D có lưu, nhưng Khởi động lại sẽ bật máy lên ngay.',
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
    content: 'Everything above was a rehearsal. Go and do it on a real machine — that is the part that actually teaches you.',
    contentVn: 'Tất cả những gì ở trên chỉ là tập dượt. Hãy đi làm thật trên một chiếc máy thật — đó mới là phần thực sự dạy em.',
    notes: [
      {
        tone: 'task',
        text: 'Find the **power symbol** on a computer or tablet. Turn it on with **one press**, and **log in yourself** — do not let anyone type it for you.',
        textVn: 'Tìm **biểu tượng nguồn** trên một máy tính hoặc máy tính bảng. Bật nó bằng **một lần bấm**, và **tự đăng nhập** — đừng để ai gõ hộ em.',
      },
      {
        tone: 'task',
        text: 'Find the **taskbar** and the **clock**. Open a window, **minimise** it, and bring it back from the taskbar.',
        textVn: 'Tìm **thanh tác vụ** và **đồng hồ**. Mở một cửa sổ, **thu nhỏ** nó, rồi đưa nó trở lại từ thanh tác vụ.',
      },
      {
        tone: 'task',
        text: 'Shut it down properly and **wait for the lights to go out** before you walk away.',
        textVn: 'Tắt máy đúng cách và **chờ đèn tắt hẳn** rồi mới rời đi.',
      },
    ],
  },
];
