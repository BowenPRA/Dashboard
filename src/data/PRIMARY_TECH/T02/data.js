// src/data/PRIMARY_TECH/T02/data.js
// T2 Mouse, Keys and Windows — the Technology track's second unit
// (docs/digital-skills-course.md §6), built to docs/primary-tech/UPGRADE-PLAN.md
// §8 from the start: click, double-click, right-click and drag (with a mouse, a
// touch screen or a touchpad); the keys that do a job — Enter, Backspace,
// Delete, Shift, Caps Lock, Esc, Ctrl; and the window on top.
//
// What the student meets, in order: a 24-slide deck with 16 scored items and two
// simulator demos; twelve interface words; Try It, six jobs on the `desktop`
// skin (sim.js — each with a wrong-but-plausible route that FAILS); the Mouse
// Gym; Label It on the mouse, the keyboard and a pair of windows; a mixed
// Practice set; the Typing Gym on the unit's words, Shift and sentences; three
// written answers, three pictures to read and an 8-question quiz.
//
// It assumes T1 (the desktop, the taskbar, the three window buttons, logging in,
// shutting down) and leaves saving and folders in depth to T4 and T5: a folder
// here is only something to make, name and drag into.
//
// GATE STRUCTURE — the final shape (UPGRADE-PLAN §8.1):
//
//   Gate 0 · Learn   0   NOTES 20 · WORD_REC 15                               = 35
//   Gate 1 · Do      25  SIM 25 · MOUSE_GYM 15 · LABEL_IT 10 · WORKBOOK 15
//                        · TYPE_GYM 10                                        = 75
//   Gate 2 · Prove   80  SHORT_ANSWERS 10 · DIAGRAMS 10 · ASSESSMENT 20 · GAMES 0 = 40
//
// 150 XP, capped at 100 by unitXPOf. Gate 1 is 25 of 35 (71%), Gate 2 is 80 of
// 115 (70%) — both inside the 80% rule the validator enforces. T2 swaps Find It
// for the Mouse Gym, so no two units share a task list.
//
// This track IS bilingual (see trackRegistry): every learner-facing field needs
// its `vn*` twin. The Quiz and the Source Analysis render only their
// explanations bilingually, so those questions are written in deliberately
// plain English with the teaching carried in `expVn`.
//
// Module properties are written in full (`notes: notes,`) — a shorthand right
// after realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { sim } from './sim.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const T02_DATA = {
  meta: {
    id: 'T02',
    title: 'Mouse, Keys and Windows',
    desc: 'Click, double-click, right-click and drag — with a mouse, a touch screen or a touchpad; use Enter, Backspace, Delete, Shift, Caps Lock, Esc and Ctrl; and switch between windows without closing anything.',
    track: 'PRIMARY_TECH',
    icon: 'Layers',
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
        { id: 'MOUSE_GYM', dbKey: 'p45', maxXP: 15 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 10 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
        { id: 'TYPE_GYM', dbKey: 'p26', maxXP: 10 },
      ],
    },
    {
      // 80 of the 115 XP before it (70%).
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

  // The interface words, in the order the deck meets them. On this track the
  // words are not decoration around the subject: the keys, the menus and every
  // help page are in English, and knowing what a move or a key is CALLED is the
  // skill (course doc §5.3).
  realWords: [
    {
      word: 'Pointer', isReal: true, vn: 'Con trỏ chuột',
      def: 'The little arrow on the screen. It moves when you move the mouse or slide a finger on the touchpad.',
      vnDef: 'Mũi tên nhỏ trên màn hình. Nó di chuyển khi em di chuột hoặc trượt ngón tay trên bàn di chuột.',
      sent: 'Move the pointer onto the folder.',
      vnSent: 'Hãy đưa con trỏ lên thư mục.',
    },
    {
      word: 'Click', isReal: true, vn: 'Bấm chuột',
      def: 'To press and let go of the left mouse button once. It chooses a thing, or presses a button.',
      vnDef: 'Bấm rồi thả nút trái của chuột một lần. Nó chọn một thứ, hoặc bấm một nút.',
      sent: 'Click the Save button.',
      vnSent: 'Hãy bấm vào nút Save.',
    },
    {
      word: 'Double-click', isReal: true, vn: 'Bấm đúp',
      def: 'Two quick clicks, keeping the mouse still. It opens a file, a folder or a program from its icon.',
      vnDef: 'Hai lần bấm thật nhanh, giữ chuột thật yên. Nó mở một tệp, một thư mục hoặc một chương trình từ biểu tượng của nó.',
      sent: 'Double-click the folder to open it.',
      vnSent: 'Hãy bấm đúp vào thư mục để mở nó.',
    },
    {
      word: 'Right-click', isReal: true, vn: 'Bấm chuột phải',
      def: 'To press the right mouse button once. It opens a menu of the things you can do to what you clicked.',
      vnDef: 'Bấm nút phải của chuột một lần. Nó mở một trình đơn gồm những việc em có thể làm với thứ em vừa bấm vào.',
      sent: 'Right-click the file and choose Rename.',
      vnSent: 'Hãy bấm chuột phải vào tệp và chọn Rename.',
    },
    {
      word: 'Drag', isReal: true, vn: 'Kéo thả',
      def: 'To press and hold the left button, move the mouse, then let go. It moves a thing to a new place.',
      vnDef: 'Bấm và giữ nút trái, di chuột, rồi thả tay. Nó chuyển một thứ đến chỗ mới.',
      sent: 'Drag the photo into the Holiday folder.',
      vnSent: 'Hãy kéo bức ảnh thả vào thư mục Holiday.',
    },
    {
      word: 'Scroll wheel', isReal: true, vn: 'Con lăn chuột',
      def: 'The little wheel between the two mouse buttons. You roll it to move a long page up and down.',
      vnDef: 'Bánh xe nhỏ nằm giữa hai nút chuột. Em lăn nó để kéo một trang dài lên và xuống.',
      sent: 'Roll the scroll wheel to read the rest of the page.',
      vnSent: 'Hãy lăn con lăn chuột để đọc phần còn lại của trang.',
    },
    {
      word: 'Active window', isReal: true, vn: 'Cửa sổ đang dùng',
      def: 'The window on top — the one that your typing and your clicks go into.',
      vnDef: 'Cửa sổ nằm trên cùng — cửa sổ nhận những gì em gõ và em bấm.',
      sent: 'Click the story to make it the active window.',
      vnSent: 'Hãy bấm vào truyện để nó trở thành cửa sổ đang dùng.',
    },
    {
      word: 'Enter', isReal: true, vn: 'Phím Enter',
      def: 'The key that finishes a line and starts a new one, or says yes to a box on the screen.',
      vnDef: 'Phím dùng để kết thúc một dòng và bắt đầu dòng mới, hoặc đồng ý với một hộp thoại trên màn hình.',
      sent: 'Type your password and press Enter.',
      vnSent: 'Nhập mật khẩu của em rồi bấm Enter.',
    },
    {
      word: 'Backspace', isReal: true, vn: 'Phím Backspace (xóa lùi)',
      def: 'The key that rubs out the letter just before the cursor.',
      vnDef: 'Phím dùng để xóa chữ cái nằm ngay trước con trỏ soạn thảo.',
      sent: 'Press Backspace to rub out the extra letter.',
      vnSent: 'Hãy bấm Backspace để xóa chữ cái bị thừa.',
    },
    {
      word: 'Shift', isReal: true, vn: 'Phím Shift',
      def: 'The key you hold down to type one capital letter.',
      vnDef: 'Phím em giữ xuống để gõ một chữ cái viết hoa.',
      sent: 'Hold Shift and press H for a capital H.',
      vnSent: 'Giữ Shift rồi bấm H để có chữ H viết hoa.',
    },
    {
      word: 'Ctrl', isReal: true, vn: 'Phím Ctrl',
      def: 'The key you hold down with a letter to do a job quickly, like Ctrl+S to save.',
      vnDef: 'Phím em giữ xuống cùng một chữ cái để làm một việc thật nhanh, ví dụ Ctrl+S để lưu.',
      sent: 'Press Ctrl+Z to undo your mistake.',
      vnSent: 'Hãy bấm Ctrl+Z để hoàn tác lỗi của em.',
    },
    {
      word: 'Esc', isReal: true, vn: 'Phím Esc (thoát)',
      def: 'The key that backs out: it closes a menu or a box without choosing anything.',
      vnDef: 'Phím dùng để thoát ra: nó đóng một trình đơn hay một hộp thoại mà không chọn gì cả.',
      sent: 'Press Esc to close the menu.',
      vnSent: 'Hãy bấm Esc để đóng trình đơn.',
    },
  ],

  // Short Answers: three questions, one clean mark per scheme line
  // (docs/question-quality.md), short and concrete for a nine-year-old.
  // Suggested words are vocabulary a strong answer uses, never the relationship
  // a mark line awards (no "open", no "left"/"right", no "taskbar button").
  shortQA: [
    {
      id: 'sq1',
      question: 'Explain the difference between a click and a double-click. Give one example of when you would use each.',
      vnTranslation: 'Hãy giải thích sự khác nhau giữa bấm chuột (click) và bấm đúp (double-click). Cho một ví dụ về lúc em dùng mỗi cách.',
      suggestedWords: [['icon'], ['button'], ['pointer']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a click is one press of the left button, and it chooses (selects) something or presses a button.',
        '1 mark: a double-click is two quick clicks, and it opens a file, a folder or a program from its icon.',
        '1 mark: gives a correct example of each (e.g. click the Save button or a menu choice; double-click a folder or a program icon to open it).',
      ],
      modelAnswer: 'A click is when you press the left mouse button once. It chooses something, like an icon, or presses a button, like the Save button. A double-click is two quick clicks without moving the mouse, and it opens things. For example, I click the Save button to save my story, and I double-click the Paint icon on the desktop to open Paint.',
    },
    {
      id: 'sq2',
      question: 'When you are typing, what is the difference between the Backspace key and the Delete key?',
      vnTranslation: 'Khi em đang gõ chữ, phím Backspace và phím Delete khác nhau như thế nào?',
      suggestedWords: [['cursor'], ['letter'], ['rub out', 'remove']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark: Backspace rubs out the letter before the cursor (to its left).',
        '1 mark: Delete rubs out the letter after the cursor (to its right).',
      ],
      modelAnswer: 'Both keys rub out one letter at a time, but on different sides of the cursor. Backspace rubs out the letter just before the cursor, on its left. Delete rubs out the letter just after the cursor, on its right. So if I have just typed a wrong letter, I press Backspace.',
    },
    {
      id: 'sq3',
      question: 'You have two windows open, and they overlap. Which window does your typing go into, and how can you tell which one that is? Then describe one way to bring the other window to the front.',
      vnTranslation: 'Em đang mở hai cửa sổ chồng lên nhau. Những gì em gõ sẽ đi vào cửa sổ nào, và làm sao em biết đó là cửa sổ nào? Sau đó hãy mô tả một cách để đưa cửa sổ còn lại lên phía trước.',
      suggestedWords: [['active window'], ['title bar'], ['click']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the typing goes into the window on top (the active window), not the one behind.',
        '1 mark: says how to tell which window is on top — it is in front of the other one, its title bar is darker, or its button on the taskbar is lit.',
        '1 mark: one correct way to bring the other window to the front — click its button on the taskbar, or click any part of it that can be seen (or minimise the window on top).',
      ],
      modelAnswer: 'My typing goes into the window on top, which is called the active window. I can tell which one it is because it is in front of the other window, its title bar is darker, and its button on the taskbar is lit up. To bring the other window to the front, I click its button on the taskbar, or I click any part of it that I can see. Nothing gets closed.',
    },
  ],

  // Source Analysis: reading a screen and judging it — two MCQ and one written
  // (UPGRADE-PLAN §8.3). The deck asks where the keys go on TWO_WINDOWS with a
  // hotspot; the source asks the next question on a busier screen: what must
  // she DO about it?
  diagrams: [
    {
      id: 'diag_1_five_windows',
      type: 'mcq',
      inlineSvg: DIAGRAMS.FIVE_WINDOWS,
      imageAlt: 'A computer screen with five windows in a pile, one in front of another: Browser at the back, then Files, then story, then Paint, and the Calculator in front. Only the Calculator is fully visible; its title bar is darker than the others. On the taskbar there are five buttons — Browser, Files, story, Paint and Calculator — and only the Calculator button is lit, with a blue line under it.',
      promptText: 'Ha Vi wants to type the next line of her story. Look at her screen. What should she do first?',
      options: [
        { val: 'A', text: 'Start typing — her story is already open.' },
        { val: 'B', text: 'Close all the other windows, one by one.' },
        { val: 'C', text: 'Click the story window, or its button on the taskbar, to bring it to the front.' },
        { val: 'D', text: 'Make the Calculator fill the screen.' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The Calculator is on top: its title bar is darkest and its taskbar button is lit, so it is the active window and it would get her typing. Open is not the same as on top. One click on the story (or its taskbar button) makes the story the active window — nothing needs closing.',
      expVn: 'Calculator đang ở trên cùng: thanh tiêu đề của nó đậm nhất và nút của nó trên thanh tác vụ đang sáng, nên nó là cửa sổ đang dùng và nó sẽ nhận những gì bạn ấy gõ. Đang mở không có nghĩa là đang ở trên cùng. Chỉ cần bấm một lần vào cửa sổ truyện (hoặc nút của nó trên thanh tác vụ) là truyện trở thành cửa sổ đang dùng — không cần đóng gì cả.',
    },
    {
      id: 'diag_2_menu_delete',
      type: 'mcq',
      inlineSvg: DIAGRAMS.SA_MENU,
      imageAlt: 'A desktop with three icons: old drawing.png (highlighted), new drawing.png and a folder called Holiday, and a Recycle Bin in the top right corner. A right-click menu is open next to old drawing.png with three choices — Open, Rename and Delete. The mouse pointer is resting on Delete, which is highlighted in pale red.',
      promptText: 'Ha Vi right-clicked her old drawing. She is about to click the choice under the pointer. What will happen to the drawing?',
      options: [
        { val: 'A', text: 'It will move to the Recycle Bin, and she can put it back if she needs it.' },
        { val: 'B', text: 'It will be gone for ever, straight away.' },
        { val: 'C', text: 'It will open in Paint.' },
        { val: 'D', text: 'It will get a new name.' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'The pointer is on Delete. On a computer, Delete does not destroy a file: it moves it to the Recycle Bin, where "Put it back" returns it to the desktop. Open is the first choice and Rename the second — the menu offers them because they are things you can do to THIS file.',
      expVn: 'Con trỏ đang nằm trên Delete. Trên máy tính, Delete không phá hủy tệp: nó chuyển tệp vào Thùng rác, nơi nút "Put it back" (Đặt lại) đưa tệp trở về màn hình nền. Open là lựa chọn đầu tiên và Rename là lựa chọn thứ hai — trình đơn đưa ra những lựa chọn đó vì đó là những việc em có thể làm với CHÍNH tệp này.',
    },
    {
      id: 'diag_3_double_click',
      inlineSvg: DIAGRAMS.SA_DOUBLE,
      imageAlt: 'A computer desktop. At the top left is a file called homework.docx. Below it, a folder called Holiday is highlighted in blue, which means it has been selected (chosen). The folder is a little lower and further right than a dashed outline showing where it used to be, so it has moved. The mouse pointer is on the folder. No window is open, and the taskbar has no window buttons. A speech bubble from Ha Vi says: "I double-clicked the Holiday folder, and nothing opened!"',
      promptText: 'Ha Vi says she double-clicked the Holiday folder, but nothing opened. Look at the screen. Explain TWO things that could have gone wrong, and say how she can open the folder.',
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the two clicks were too slow (too far apart), so the computer took them as single clicks — one click only chooses (selects) the folder, which is why it is highlighted.',
        '1 mark: the mouse moved while the button was pressed, so it became a small drag — the folder has moved from where it was (the dashed outline).',
        '1 mark: a way to open it: two quick clicks while keeping the mouse still, OR right-click the folder and choose Open.',
      ],
      modelAnswer: 'First, her two clicks were probably too slow. If there is too long a gap, the computer thinks they are two single clicks, and a single click only chooses the folder. That is why the folder is blue. Second, the folder has moved away from the dashed outline, so her mouse moved while she was pressing the button and she dragged it a little instead. To open it, she should click twice quickly and keep the mouse still, or right-click the folder and choose Open.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): the unit's three drawn things — the mouse,
  // the keyboard, a pair of windows — labels and leader lines stripped at
  // runtime; the words that are part of the picture (class="keep") stay. (x, y)
  // is where the leader meets the box and `to` is the part; coordinates from
  // `node scripts/svg-coords.mjs PRIMARY_TECH/T02 <KEY>`. Each bank carries one
  // distractor that is a real interface word ABSENT from the picture: the
  // touchpad (a laptop has one, a mouse does not), the power button (a
  // keyboard does not carry it here), the Recycle Bin (not on this screen).
  labelIt: [
    {
      id: 'mouse',
      title: 'Label the mouse', titleVn: 'Gắn nhãn con chuột',
      inlineSvg: DIAGRAMS.LB_MOUSE, viewBox: '0 0 800 470',
      pins: [
        { id: 'p1', x: 220, y: 45, to: [360, 45], side: 'left', answer: 'cable' },
        { id: 'p2', x: 220, y: 189, to: [340, 189], side: 'left', answer: 'left' },
        { id: 'p3', x: 580, y: 120, to: [408, 158], side: 'right', answer: 'wheel' },
        { id: 'p4', x: 580, y: 189, to: [460, 189], side: 'right', answer: 'right' },
      ],
      bank: [
        { val: 'left', text: 'Left button', textVn: 'Nút trái' },
        { val: 'right', text: 'Right button', textVn: 'Nút phải' },
        { val: 'wheel', text: 'Scroll wheel', textVn: 'Con lăn chuột' },
        { val: 'cable', text: 'Cable', textVn: 'Dây cáp' },
        { val: 'touchpad', text: 'Touchpad', textVn: 'Bàn di chuột' },
      ],
    },
    {
      id: 'keys',
      title: 'Label the keys', titleVn: 'Gắn nhãn các phím',
      inlineSvg: DIAGRAMS.LB_KEYS, viewBox: '0 0 1200 600',
      // Every word on the special keys comes off with the labels, so each key
      // is placed by where it sits and its shape: Esc top left, Backspace at
      // the end of the number row, Enter the wide key on the right, Shift
      // under Caps Lock, Ctrl in the bottom corner, the long space bar.
      pins: [
        { id: 'p1', x: 270, y: 110, to: [270, 172], side: 'above', answer: 'esc' },
        { id: 'p2', x: 980, y: 226, to: [950, 226], side: 'right', answer: 'backspace' },
        { id: 'p3', x: 980, y: 322, to: [950, 322], side: 'right', answer: 'enter' },
        { id: 'p4', x: 220, y: 370, to: [250, 370], side: 'left', answer: 'shift' },
        { id: 'p5', x: 220, y: 418, to: [250, 418], side: 'left', answer: 'ctrl' },
        { id: 'p6', x: 564, y: 500, to: [564, 436], side: 'below', answer: 'space' },
      ],
      bank: [
        { val: 'esc', text: 'Esc', textVn: 'Phím Esc' },
        { val: 'backspace', text: 'Backspace', textVn: 'Phím Backspace' },
        { val: 'enter', text: 'Enter', textVn: 'Phím Enter' },
        { val: 'shift', text: 'Shift', textVn: 'Phím Shift' },
        { val: 'ctrl', text: 'Ctrl', textVn: 'Phím Ctrl' },
        { val: 'space', text: 'Space bar', textVn: 'Phím cách' },
        { val: 'power', text: 'Power button', textVn: 'Nút nguồn' },
      ],
    },
    {
      id: 'windows',
      title: 'Label the two windows', titleVn: 'Gắn nhãn hai cửa sổ',
      inlineSvg: DIAGRAMS.LB_WINDOW_PAIR, viewBox: '0 0 1080 560',
      pins: [
        { id: 'p1', x: 225, y: 120, to: [300, 120], side: 'left', answer: 'behind' },
        { id: 'p2', x: 225, y: 330, to: [336, 334], side: 'left', answer: 'pointer' },
        { id: 'p3', x: 855, y: 250, to: [790, 250], side: 'right', answer: 'active' },
        { id: 'p4', x: 560, y: 480, to: [620, 410], side: 'below', answer: 'taskbar' },
      ],
      bank: [
        { val: 'active', text: 'Active window', textVn: 'Cửa sổ đang dùng' },
        { val: 'behind', text: 'Window behind', textVn: 'Cửa sổ phía sau' },
        { val: 'taskbar', text: 'Taskbar', textVn: 'Thanh tác vụ' },
        { val: 'pointer', text: 'Pointer', textVn: 'Con trỏ chuột' },
        { val: 'bin', text: 'Recycle Bin', textVn: 'Thùng rác' },
      ],
    },
  ],

  // Mouse Gym (UPGRADE-PLAN §8.2) — generative: twelve rounds of click,
  // double-click, right-click ▸ choose, and drag, positions and targets drawn
  // from a seed; on a tablet, tap, double-tap, press-and-hold and drag.
  mouseGym: { title: 'Mouse Gym', titleVn: 'Phòng tập chuột', modes: ['click', 'double', 'right', 'drag'], rounds: 12 },

  // Typing Gym (UPGRADE-PLAN §3.2) — never the same twice: every line is drawn
  // fresh from a seed. The keys unit adds the generated `shift` mode (capital
  // letters with the OTHER hand's Shift), and its sentences start with a
  // capital and end with a full stop. Plain ASCII only.
  typeGym: {
    title: 'Typing Gym',
    titleVn: 'Phòng tập gõ phím',
    modes: ['words', 'shift', 'sentences'],
    rounds: 6,
    words: ['click', 'double-click', 'right-click', 'drag', 'pointer', 'scroll wheel', 'window', 'Enter', 'Backspace', 'Shift', 'Esc', 'Ctrl'],
    sentences: [
      'Click once to choose it.',
      'Double-click to open it.',
      'Right-click to see a menu.',
      'Drag the photo into the folder.',
      'Hold Shift for a capital letter.',
      'Press Esc to close the menu.',
    ],
    target: { wpm: 6, accuracy: 0.85 },
  },

  sim: sim,
  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
