// src/data/PRIMARY_TECH/T01/data.js
// T1 Starting and Stopping — the first unit of the Technology track
// (docs/digital-skills-course.md §6, docs/primary-tech/BUILD-PLAN.md step 2).
//
// Built WITHOUT the simulator, which is not written yet. T1 and T7 were chosen
// for exactly that reason: both are largely *identify and order*, so POINT_IT
// and WORKBOOK carry the doing between them and nothing about the unit is
// waiting on the engine.
//
// GATE STRUCTURE — re-derived, not copied from the course doc's table (which
// assumes SIM and TYPE_GYM exist and prices the phases around them):
//
//   Gate 0 · Learn   0   NOTES 10 · WORD_REC 10                        = 20
//   Gate 1 · Do      15  POINT_IT 25 · WORKBOOK 15                     = 40
//   Gate 2 · Prove   45  DIAGRAMS 20 · SHORT_ANSWERS 15 · ASSESSMENT 20 = 55
//
// Totals 115, capped at 100 by unitXPOf, so a student can drop a whole task and
// still finish. Gate 1 sits at 15 of the 20 before it (75%); Gate 2 at 45 of 60
// (75%). Both are inside the 80% rule the validator enforces — re-derive these
// whenever a task's XP changes, or a gate quietly becomes impassable.
//
// This track IS bilingual (see trackRegistry): every learner-facing field needs
// its `vn*` twin and the validator enforces it. The one exception is the Quiz,
// where Assessment.jsx renders only the explanation bilingually — so those
// questions are written in deliberately plain English with the teaching carried
// in `expVn`, the same convention Y7_MATH uses.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { pointIt } from './pointIt.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const T01_DATA = {
  meta: {
    id: 'T01',
    title: 'Starting and Stopping',
    desc: 'Turn a computer on, log in, find your way around the desktop, and stop it properly — sleep, log out, restart or shut down — without ever holding the power button.',
    track: 'PRIMARY_TECH',
    icon: 'Zap',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 10 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Do',
      threshold: 15,
      tasks: [
        { id: 'POINT_IT', dbKey: 'p24', maxXP: 25 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
      ],
    },
    {
      id: 'mastery',
      title: 'Gate 2: Prove',
      threshold: 45,
      tasks: [
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 20 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 15 },
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // The interface words. On this track these are not decoration around the
  // subject — the interface is in English, and knowing what the button is called
  // IS the skill (docs/digital-skills-course.md §5.3).
  realWords: [
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
      word: 'Log out', isReal: true, vn: 'Đăng xuất',
      def: 'To close your account and hand the computer back, ready for the next person to log in. The machine stays on.',
      vnDef: 'Đóng tài khoản của em và trả máy lại, sẵn sàng cho người tiếp theo đăng nhập. Máy vẫn bật.',
      sent: 'Log out before you leave the computer room.',
      vnSent: 'Hãy đăng xuất trước khi em rời phòng máy.',
    },
    {
      word: 'Shut down', isReal: true, vn: 'Tắt máy',
      def: 'To stop the computer completely and safely, so it ends up switched off.',
      vnDef: 'Dừng máy tính hoàn toàn và an toàn, để máy tắt hẳn.',
      sent: 'Shut down the computer at the end of the day.',
      vnSent: 'Hãy tắt máy vào cuối ngày.',
    },
    {
      word: 'Restart', isReal: true, vn: 'Khởi động lại',
      def: 'To turn the computer off and straight back on again by itself. It often fixes a problem.',
      vnDef: 'Tắt máy rồi để máy tự bật lên lại ngay. Cách này thường sửa được lỗi.',
      sent: 'Restart the computer and try again.',
      vnSent: 'Hãy khởi động lại máy rồi thử lại.',
    },
    {
      word: 'Sleep', isReal: true, vn: 'Chế độ ngủ',
      def: 'To rest the computer without closing anything. It wakes up in a second with your work still open.',
      vnDef: 'Cho máy nghỉ mà không đóng thứ gì. Máy thức dậy trong một giây với bài làm vẫn đang mở.',
      sent: 'Put the laptop to sleep while we eat.',
      vnSent: 'Hãy cho máy tính xách tay ngủ trong lúc chúng ta ăn.',
    },
  ],

  // Short Answers: two questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md). Kept short and concrete — this is a
  // nine-year-old, not a GED candidate. No suggested words: on this unit the
  // vocabulary IS what the mark scheme awards, so chips would be spoilers (§3).
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between putting a computer to sleep and shutting it down. Say what happens to the work you had open in each case.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: sleep leaves your work open (nothing is closed) / the computer only rests.',
        '1 mark: shutting down closes everything and switches the computer off.',
        '1 mark: sleep is for a short break because the computer wakes up quickly, while shutting down is for when you have finished.',
      ],
      modelAnswer: 'When a computer goes to sleep it just rests. Nothing closes, so when you come back your windows are exactly where you left them and it wakes up in a second. When you shut down, everything closes and the computer switches off completely, so next time you have to turn it on and log in again. Sleep is best for a short break like lunch, and shutting down is best when you have finished for the day.',
    },
    {
      id: 'sq2',
      question: 'A computer is working normally. Explain why you should NOT hold the power button down to turn it off.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: holding the power button cuts the power suddenly instead of stopping the computer properly.',
        '1 mark: the computer is stopped in the middle of what it was doing, so work can be lost or damaged.',
        '1 mark: you should use the menu and choose Shut down instead (holding the button is only for a computer that has frozen).',
      ],
      modelAnswer: 'Holding the power button does not really shut the computer down. It cuts the electricity straight away, in the middle of whatever the computer was busy doing, so any work that has not been saved can be lost and files can even be damaged. On a computer that is working you should open the menu and choose Shut down, which lets it finish tidying up first. Holding the button is only for when the computer has frozen and nothing else answers.',
    },
  ],

  // Source Analysis: reading a screen and judging it. Two MCQ and one written,
  // the same 2:1 split the coord-science units use.
  diagrams: [
    {
      id: 'diag_1_locked_or_off',
      type: 'mcq',
      inlineSvg: DIAGRAMS.LOCKED_VS_OFF,
      imageAlt: 'Two computer screens side by side. Screen A is dark blue and shows a name and a password box, with a note that a fan is running and a light is on. Screen B is completely black, with a note that there is no fan and no lights.',
      promptText: 'Look at the two screens. Which one is a computer that is still switched ON?',
      options: [
        { val: 'A', text: 'Screen A — it is asking for a password, and the fan and light show it is running.' },
        { val: 'B', text: 'Screen B — a black screen means the computer is doing nothing.' },
        { val: 'C', text: 'Both of them are off, because you cannot see a desktop on either one.' },
        { val: 'D', text: 'You cannot tell from a picture.' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'Screen A is LOCKED, not off. The computer is running — that is why it can draw a password box and why the fan is turning — and somebody’s work may still be open behind it. Screen B has no fan and no lights, and that is the real evidence, not the dark screen.',
      expVn: 'Màn hình A đang KHÓA, không phải đã tắt. Máy vẫn chạy — vì thế nó mới vẽ được ô mật khẩu và quạt mới quay — và bài của ai đó có thể vẫn đang mở phía sau. Màn hình B không có quạt và không có đèn, và đó mới là bằng chứng thật, chứ không phải màn hình tối.',
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
      imageAlt: 'A computer desktop. A single icon labelled "My Work" sits at the top left. A window titled "Notes" is open in the middle with minimise, maximise and close buttons at its top right. A dark taskbar runs along the bottom with a menu button, a search box and a clock reading 14:05.',
      promptText: 'Look at this screen. Name TWO different parts of it, using the correct English word for each, and say what each part is for.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: names one part of the screen with the correct word (desktop, icon, window, taskbar or clock).',
        '1 mark: says correctly what that first part is for.',
        '1 mark: names a SECOND, different part correctly and says what that one is for.',
      ],
      modelAnswer: 'The bar along the bottom is the taskbar. It holds the menu button, the clock and everything that is open, so you can see what you are running and swap between things. The box in the middle with the word Notes at the top is a window. A window is where a program shows your work, and the buttons in its top corner let you hide it, make it bigger, or close it.',
    },
  ],

  notes: notes,
  workbook: workbook,
  pointIt: pointIt,
  assessment: assessment,
  games: games,
};
