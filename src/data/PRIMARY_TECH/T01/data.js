// src/data/PRIMARY_TECH/T01/data.js
// T1 Starting and Stopping — the first unit of the Technology track
// (docs/digital-skills-course.md §6), rebuilt to the Year 7 standard by
// docs/primary-tech/UPGRADE-PLAN.md: a 26-slide deck with 17 scored items and
// three simulator demos, Try It on the `desktop` skin (sim.js — six jobs, each
// with a wrong-but-plausible route that FAILS the way it fails in life), Label
// It on three drawn interfaces, Find It, a 12-question mixed Practice set, the
// Typing Gym, three written answers, three pictures to read and an 8-question
// quiz.
//
// GATE STRUCTURE — the final shape (UPGRADE-PLAN §2):
//
//   Gate 0 · Learn   0   NOTES 20 · WORD_REC 15                               = 35
//   Gate 1 · Do      25  SIM 25 · LABEL_IT 15 · POINT_IT 10 · WORKBOOK 15
//                        · TYPE_GYM 10                                        = 75
//   Gate 2 · Prove   80  SHORT_ANSWERS 10 · DIAGRAMS 10 · ASSESSMENT 20 · GAMES 0 = 40
//
// 150 XP, capped at 100 by unitXPOf. Gate 1 is 25 of 35 (71%), Gate 2 is 80 of
// 110 (73%) — both inside the 80% rule the validator enforces.
//
// This track IS bilingual (see trackRegistry): every learner-facing field needs
// its `vn*` twin and the validator enforces it. The Quiz and the Source
// Analysis render only their explanations bilingually, so those questions are
// written in deliberately plain English with the teaching carried in `expVn`,
// the same convention Y7_MATH uses.
//
// Module properties are written in full (`notes: notes,`) — a shorthand right
// after realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { pointIt } from './pointIt.js';
import { sim } from './sim.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const T01_DATA = {
  meta: {
    id: 'T01',
    title: 'Starting and Stopping',
    desc: 'Turn a computer on, log in, find your way around the desktop, and stop it properly — sleep, log out, restart or shut down — holding the power button only when it is frozen.',
    track: 'PRIMARY_TECH',
    icon: 'Zap',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 15 },
      ],
    },
    {
      // 25 of the 35 XP before it (71%).
      id: 'practice',
      title: 'Gate 1: Do',
      threshold: 25,
      tasks: [
        { id: 'SIM', dbKey: 'p25', maxXP: 25 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 15 },
        { id: 'POINT_IT', dbKey: 'p24', maxXP: 10 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
        { id: 'TYPE_GYM', dbKey: 'p26', maxXP: 10 },
      ],
    },
    {
      // 80 of the 110 XP before it (73%).
      id: 'mastery',
      title: 'Gate 2: Prove',
      threshold: 80,
      tasks: [
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 10 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 10 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // The interface words, in the order the deck meets them. On this track these
  // are not decoration around the subject — the interface is in English, and
  // knowing what the button is called IS the skill (course doc §5.3).
  realWords: [
    {
      word: 'Power button', isReal: true, vn: 'Nút nguồn',
      def: 'The button that turns a computer on. It has the power symbol on it: a circle with a line through the top.',
      vnDef: 'Nút dùng để bật máy tính. Trên nút có biểu tượng nguồn: một vòng tròn có một vạch ở trên đỉnh.',
      sent: 'Press the power button once, then wait.',
      vnSent: 'Bấm nút nguồn một lần, rồi chờ.',
    },
    {
      word: 'Log in', isReal: true, vn: 'Đăng nhập',
      def: 'To tell the computer who you are, by typing your name and your password.',
      vnDef: 'Cho máy tính biết em là ai, bằng cách nhập tên và mật khẩu của em.',
      sent: 'Log in with your own name, not somebody else’s.',
      vnSent: 'Hãy đăng nhập bằng tên của chính em, không phải tên người khác.',
    },
    {
      word: 'Password', isReal: true, vn: 'Mật khẩu',
      def: 'The secret word you type to prove the account is yours. You never tell it to anybody.',
      vnDef: 'Từ bí mật em nhập vào để chứng minh tài khoản là của em. Em không bao giờ nói nó cho ai.',
      sent: 'Type your password and press Enter.',
      vnSent: 'Nhập mật khẩu của em rồi bấm Enter.',
    },
    {
      word: 'Desktop', isReal: true, vn: 'Màn hình nền',
      def: 'The whole background of the screen, with your icons on it. It is what you see once you have logged in.',
      vnDef: 'Toàn bộ phần nền của màn hình, có các biểu tượng trên đó. Đây là thứ em thấy sau khi đăng nhập.',
      sent: 'Put the file on the desktop so you can find it.',
      vnSent: 'Hãy để tệp đó trên màn hình nền để em dễ tìm.',
    },
    {
      word: 'Icon', isReal: true, vn: 'Biểu tượng',
      def: 'A small picture you click or double-click to open a program or a file.',
      vnDef: 'Một hình nhỏ mà em bấm hoặc bấm đúp để mở một chương trình hay một tệp.',
      sent: 'Double-click the icon to open your work.',
      vnSent: 'Bấm đúp vào biểu tượng để mở bài làm của em.',
    },
    {
      word: 'Window', isReal: true, vn: 'Cửa sổ',
      def: 'The box a program opens inside. It has buttons at the top to make it smaller, bigger or closed.',
      vnDef: 'Cái khung mà một chương trình mở ra bên trong. Nó có các nút ở phía trên để thu nhỏ, phóng to hoặc đóng lại.',
      sent: 'Close the window when you have finished.',
      vnSent: 'Đóng cửa sổ lại khi em đã làm xong.',
    },
    {
      word: 'Taskbar', isReal: true, vn: 'Thanh tác vụ',
      def: 'The bar along the bottom of the screen. It holds the menu button, the clock, and everything that is open.',
      vnDef: 'Thanh chạy dọc phía dưới màn hình. Nó chứa nút trình đơn, đồng hồ, và mọi thứ đang mở.',
      sent: 'The clock is on the right of the taskbar.',
      vnSent: 'Đồng hồ nằm ở bên phải thanh tác vụ.',
    },
    {
      word: 'Sleep', isReal: true, vn: 'Chế độ ngủ',
      def: 'To rest the computer without closing anything. It wakes up in a second with your work still open.',
      vnDef: 'Cho máy nghỉ mà không đóng thứ gì. Máy thức dậy trong một giây với bài làm vẫn đang mở.',
      sent: 'Put the laptop to sleep while we eat.',
      vnSent: 'Hãy cho máy tính xách tay ngủ trong lúc chúng ta ăn.',
    },
    {
      word: 'Log out', isReal: true, vn: 'Đăng xuất',
      def: 'To close your account and hand the computer back, ready for the next person to log in. The machine stays on.',
      vnDef: 'Đóng tài khoản của em và trả máy lại, sẵn sàng cho người tiếp theo đăng nhập. Máy vẫn bật.',
      sent: 'Log out before you leave the computer room.',
      vnSent: 'Hãy đăng xuất trước khi em rời phòng máy.',
    },
    {
      word: 'Restart', isReal: true, vn: 'Khởi động lại',
      def: 'To turn the computer off and straight back on again by itself. It often fixes a problem.',
      vnDef: 'Tắt máy rồi để máy tự bật lên lại ngay. Cách này thường sửa được lỗi.',
      sent: 'Restart the computer and try again.',
      vnSent: 'Hãy khởi động lại máy rồi thử lại.',
    },
    {
      word: 'Shut down', isReal: true, vn: 'Tắt máy',
      def: 'To stop the computer completely and safely, so it ends up switched off.',
      vnDef: 'Dừng máy tính hoàn toàn và an toàn, để máy tắt hẳn.',
      sent: 'Shut down the computer at the end of the day.',
      vnSent: 'Hãy tắt máy vào cuối ngày.',
    },
    {
      word: 'Frozen', isReal: true, vn: 'Bị treo',
      def: 'Stuck. A frozen computer does not answer the mouse or the keyboard at all.',
      vnDef: 'Bị kẹt. Một chiếc máy bị treo hoàn toàn không phản hồi chuột hay bàn phím.',
      sent: 'The computer is frozen, so hold the power button down.',
      vnSent: 'Máy tính bị treo rồi, nên hãy giữ nút nguồn.',
    },
  ],

  // Short Answers: three questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), kept short and concrete for a nine-year-old.
  // Suggested words are vocabulary a strong answer uses, never the relationship
  // a mark line awards.
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between putting a computer to sleep and shutting it down. Say what happens to the work you had open in each case.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa cho máy tính ngủ và tắt máy. Nói rõ điều gì xảy ra với bài làm em đang mở trong mỗi trường hợp.',
      suggestedWords: [['sleep', 'shut down'], ['windows', 'work'], ['wake up', 'switch off']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: sleep leaves your work open (nothing is closed) / the computer only rests.',
        '1 mark: shutting down closes everything and switches the computer off.',
        '1 mark: sleep is for a short break because the computer wakes up quickly, while shutting down is for when you have finished.',
      ],
      modelAnswer: 'When a computer goes to sleep it just rests. Nothing closes, so when you come back your windows are exactly where you left them and it wakes up in a second. When you shut down, everything closes and the computer switches off completely, so next time you have to turn it on and log in again. Sleep is best for a short break like dinner, and shutting down is best when you have finished for the day.',
    },
    {
      id: 'sq2',
      question: 'A computer is working normally. Explain why you should NOT hold the power button down to turn it off.',
      vnTranslation: 'Một chiếc máy tính đang chạy bình thường. Hãy giải thích vì sao em KHÔNG nên giữ nút nguồn để tắt nó.',
      suggestedWords: [['power button'], ['files', 'work'], ['menu']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: holding the power button cuts the power suddenly instead of stopping the computer properly.',
        '1 mark: the computer is stopped in the middle of what it was doing (for example saving), so work can be lost or damaged.',
        '1 mark: you should use the menu and choose Shut down instead (holding the button is only for a computer that has frozen).',
      ],
      modelAnswer: 'Holding the power button does not really shut the computer down. It cuts the electricity straight away, in the middle of whatever the computer was busy doing, so work that has not been saved can be lost, and a file that was being saved can even be damaged. On a computer that is working you should open the menu and choose Shut down, which lets it finish tidying up first. Holding the button is only for when the computer has frozen and nothing else answers.',
    },
    {
      id: 'sq3',
      question: 'Explain why each person should log in with their own account, and why they should keep their password secret.',
      vnTranslation: 'Hãy giải thích vì sao mỗi người nên đăng nhập bằng tài khoản riêng của mình, và vì sao họ nên giữ bí mật mật khẩu.',
      suggestedWords: [['account', 'log in'], ['files', 'desktop'], ['secret']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark: your own account keeps your work separate — logging in is how the computer knows which files, desktop and work are yours.',
        '1 mark: if someone else knows your password (or uses your account), they can open or change your work, or do things that are filed under your name.',
      ],
      modelAnswer: 'Each person should log in with their own account because that is how the computer knows who you are. It shows you your own desktop and your own files, so your work stays separate from everyone else’s. You must keep your password secret because anyone who knows it can log in as you. They could open or change your work, and anything they did would be filed under your name, not theirs.',
    },
  ],

  // Source Analysis: reading a screen and judging it. Two MCQ and one written.
  // The deck already asks "which one is on?" of LOCKED_VS_OFF with a hotspot, so
  // the source asks the next question: what does "on" mean for the work?
  diagrams: [
    {
      id: 'diag_1_locked_or_off',
      type: 'mcq',
      inlineSvg: DIAGRAMS.LOCKED_VS_OFF,
      imageAlt: 'Two computer monitors side by side. Screen A is dark blue and shows the name Ha Vi and a password box; under it, a green light is glowing ("Light: on") and a fan is spinning ("Fan: running"). Screen B is completely black; under it, the light is grey ("Light: off") and the fan is still ("Fan: silent").',
      promptText: 'Ha Vi walked away from her computer an hour ago with her story open and NOT saved. Now it looks like Screen A. Is her story still there?',
      options: [
        { val: 'A', text: 'No — a login screen means everything has been closed.' },
        { val: 'B', text: 'No — the screen has gone dark, so the computer has switched itself off.' },
        { val: 'C', text: 'Yes — the computer saved it by itself when the screen locked.' },
        { val: 'D', text: 'Yes — the light and the fan show the computer is still on, so the story is still open behind the login screen.' },
      ],
      correct: 'D',
      marks: 1,
      expEn: 'Screen A is LOCKED, not off. The light is on and the fan is running, so the computer never stopped — the login screen is only in front of her work, and the story is still open behind it, still not saved. She should log in and save it. Locking does not save anything (C), and it does not close anything (A).',
      expVn: 'Màn hình A đang KHÓA, không phải đã tắt. Đèn sáng và quạt đang chạy, nên máy chưa hề dừng — màn hình đăng nhập chỉ nằm phía trước bài làm, và truyện vẫn đang mở phía sau, vẫn chưa được lưu. Bạn ấy nên đăng nhập rồi lưu lại. Khóa máy không lưu gì cả (C), và cũng không đóng gì cả (A).',
    },
    {
      id: 'diag_2_sticky_note',
      type: 'mcq',
      inlineSvg: DIAGRAMS.LOGIN_STICKY,
      imageAlt: 'A login screen showing the name Ha Vi and an empty password box, with a yellow sticky note taped to the bottom corner of the monitor reading "my password: havi2016 — do not forget!".',
      promptText: 'Every part of this computer is working correctly. So what is wrong with this picture?',
      options: [
        { val: 'A', text: 'The password box is too small to type in.' },
        { val: 'B', text: 'The computer has not finished starting up yet.' },
        { val: 'C', text: 'The password is written on a note stuck to the screen, so it is not secret any more.' },
        { val: 'D', text: 'Nothing is wrong — it is sensible to write a password down in case you forget it.' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The login screen is doing its job perfectly. The security is defeated by a piece of paper: anyone walking past can now log in as Ha Vi, and everything they do will be filed under her name. A password only works while it is secret.',
      expVn: 'Màn hình đăng nhập đang làm đúng việc của nó. Chính một mẩu giấy đã vô hiệu hoá sự bảo mật: bất kỳ ai đi ngang qua giờ đều có thể đăng nhập với tư cách Hà Vi, và mọi việc họ làm sẽ mang tên bạn ấy. Mật khẩu chỉ có tác dụng khi nó còn là bí mật.',
    },
    {
      id: 'diag_3_name_the_screen',
      inlineSvg: DIAGRAMS.DESKTOP_ANATOMY,
      imageAlt: 'A computer desktop. A single icon labelled "My Work" sits at the top left. A window titled "Notes" is open in the middle, with a to-do list inside and minimise, maximise and close buttons at its top right. A dark taskbar runs along the bottom: a blue menu button at the left end, a button for the open Notes window, a Files button, a search box, a wifi symbol, and a clock reading 14:05 at the right end.',
      promptText: 'Look at this screen. Name TWO different parts of it, using the correct English word for each, and say what each part is for.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: names one part of the screen with the correct word (desktop, icon, window, taskbar, menu button or clock).',
        '1 mark: says correctly what that first part is for.',
        '1 mark: names a SECOND, different part correctly and says what that one is for.',
      ],
      modelAnswer: 'The bar along the bottom is the taskbar. It holds the menu button, the clock and a button for everything that is open, so you can see what you are running and swap between things. The box in the middle with the word Notes at the top is a window. A window is where a program shows your work, and the buttons in its top corner let you hide it, make it bigger, or close it.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's three drawn interfaces, labels
  // and leader lines stripped at runtime; the screen's own words (class="keep")
  // stay. (x, y) is where the leader meets the box and `to` is the part; part
  // coordinates from `node scripts/svg-coords.mjs PRIMARY_TECH/T01 <KEY>`.
  // Every bank carries one distractor that is a real interface word ABSENT from
  // the picture.
  labelIt: [
    {
      id: 'computer',
      title: 'Label the laptop', titleVn: 'Gắn nhãn máy tính xách tay',
      inlineSvg: DIAGRAMS.LB_COMPUTER, viewBox: '0 0 800 500',
      pins: [
        { id: 'p1', x: 184, y: 110, to: [262, 110], answer: 'screen' },
        { id: 'p2', x: 184, y: 318, to: [272, 318], answer: 'keyboard' },
        { id: 'p3', x: 184, y: 440, to: [226, 440], answer: 'light' },
        { id: 'p4', x: 640, y: 250, to: [564, 292], side: 'right', answer: 'button' },
        { id: 'p5', x: 640, y: 410, to: [452, 410], answer: 'touchpad' },
      ],
      bank: [
        { val: 'screen', text: 'Screen', textVn: 'Màn hình' },
        { val: 'keyboard', text: 'Keyboard', textVn: 'Bàn phím' },
        { val: 'touchpad', text: 'Touchpad', textVn: 'Bàn di chuột' },
        { val: 'button', text: 'Power button', textVn: 'Nút nguồn' },
        { val: 'light', text: 'Power light', textVn: 'Đèn nguồn' },
        { val: 'printer', text: 'Printer', textVn: 'Máy in' },
      ],
    },
    {
      id: 'desktop',
      title: 'Label the desktop', titleVn: 'Gắn nhãn màn hình nền',
      inlineSvg: DIAGRAMS.LB_DESKTOP, viewBox: '0 0 1000 540',
      pins: [
        { id: 'p1', x: 180, y: 94, to: [226, 94], answer: 'icon' },
        { id: 'p2', x: 180, y: 250, to: [300, 250], answer: 'desktop' },
        { id: 'p3', x: 820, y: 205, to: [690, 230], side: 'right', answer: 'window' },
        { id: 'p4', x: 229, y: 470, to: [229, 424], side: 'below', answer: 'menu' },
        { id: 'p5', x: 500, y: 470, to: [500, 409], side: 'below', answer: 'taskbar' },
        { id: 'p6', x: 760, y: 470, to: [760, 422], side: 'below', answer: 'clock' },
      ],
      bank: [
        { val: 'desktop', text: 'Desktop', textVn: 'Màn hình nền' },
        { val: 'icon', text: 'Icon', textVn: 'Biểu tượng' },
        { val: 'window', text: 'Window', textVn: 'Cửa sổ' },
        { val: 'taskbar', text: 'Taskbar', textVn: 'Thanh tác vụ' },
        { val: 'menu', text: 'Menu button', textVn: 'Nút trình đơn' },
        { val: 'clock', text: 'Clock', textVn: 'Đồng hồ' },
        { val: 'address', text: 'Address bar', textVn: 'Thanh địa chỉ' },
      ],
    },
    {
      id: 'window',
      title: 'Label the window', titleVn: 'Gắn nhãn cửa sổ',
      inlineSvg: DIAGRAMS.LB_WINDOW, viewBox: '0 0 960 540',
      // The three buttons sit side by side, so their boxes fan out: title bar,
      // minimise and maximise in a row above, close to the right.
      pins: [
        { id: 'p1', x: 330, y: 80, to: [430, 140], side: 'above', answer: 'title' },
        { id: 'p2', x: 540, y: 80, to: [606, 136], side: 'above', answer: 'min' },
        { id: 'p3', x: 740, y: 80, to: [656, 136], side: 'above', answer: 'max' },
        { id: 'p4', x: 780, y: 146, to: [714, 144], side: 'right', answer: 'close' },
        { id: 'p5', x: 780, y: 330, to: [640, 330], side: 'right', answer: 'work' },
      ],
      bank: [
        { val: 'title', text: 'Title bar', textVn: 'Thanh tiêu đề' },
        { val: 'min', text: 'Minimise', textVn: 'Thu nhỏ' },
        { val: 'max', text: 'Maximise', textVn: 'Phóng to' },
        { val: 'close', text: 'Close', textVn: 'Đóng' },
        { val: 'work', text: 'Work area', textVn: 'Vùng làm việc' },
        { val: 'bin', text: 'Recycle Bin', textVn: 'Thùng rác' },
      ],
    },
  ],

  // Typing Gym (UPGRADE-PLAN §3.2) — never the same twice: every line is drawn
  // fresh from a seed. T1 is the first time on the home row, so the target is
  // the course's lowest. Plain ASCII only.
  typeGym: {
    title: 'Typing Gym',
    titleVn: 'Phòng tập gõ phím',
    modes: ['home', 'words', 'sentences'],
    rounds: 6,
    words: ['power', 'password', 'desktop', 'icon', 'window', 'taskbar', 'menu', 'sleep', 'restart', 'shut down', 'log out', 'frozen'],
    sentences: [
      'Press the power button once.',
      'Wait for the login screen.',
      'Save your work first.',
      'Sleep keeps your work open.',
      'Log out when you leave.',
      'Wait for the lights to go out.',
    ],
    target: { wpm: 6, accuracy: 0.85 },
  },

  notes: notes,
  workbook: workbook,
  pointIt: pointIt,
  sim: sim,
  assessment: assessment,
  games: games,
};
