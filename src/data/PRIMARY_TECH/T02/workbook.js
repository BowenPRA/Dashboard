// src/data/PRIMARY_TECH/T02/workbook.js
// T2 Mouse, Keys and Windows — Practice (WORKBOOK, 15 XP). Twelve questions
// across the three tiers and five answer widgets — multiple choice, drag into
// targets (matching and sorting), dropdown-in-sentence, typed words in the
// blanks, and ordering — plus one question read off a picture (WB_CAPS). No two
// consecutive questions share a type:
//
//   Focus      mcq · dnd · fill_blank · inline
//   Practice   order · mcq · dnd · fill_blank
//   Challenge  mcq (picture) · inline · order · dnd
//
// Nothing here repeats a deck activity: the deck orders the steps of a drag, so
// the ordering questions here are NEW sequences — making a named folder, and
// fixing a letter in the middle of a word; the deck sorts jobs into mouse
// moves, so the matching here goes the other way (move → what it does) and on
// to a touch screen. Typed boxes only ever take WORDS (with `accept`s for
// honest variants), never a single letter: the typed box marks by algebraic
// equivalence, and "Z" would be read as algebra.
//
// Every question has a stepped solution, because the value we add over a
// worksheet is the METHOD (docs/workbook-tasks.md §1). Schema is in that doc.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        type: 'mcq',
        prompt: 'You want to see a menu of the things you can do to a file. What do you press?',
        promptVn: 'Em muốn xem trình đơn gồm những việc em có thể làm với một tệp. Em bấm gì?',
        options: [
          { val: 'a', text: 'The left button, once', textVn: 'Nút trái, một lần' },
          { val: 'b', text: 'The left button, twice quickly', textVn: 'Nút trái, hai lần thật nhanh' },
          { val: 'c', text: 'The right button, once', textVn: 'Nút phải, một lần' },
          { val: 'd', text: 'The scroll wheel', textVn: 'Con lăn chuột' },
        ],
        correct: 'c',
        solution: [
          'The left button does most jobs: one click **chooses**, two quick clicks **open**.',
          'A menu of the things you can do to the thing under the pointer is exactly what a **right-click** is for.',
          'So it is the **right** button, pressed once. The wheel only rolls the page.',
        ],
        solutionVn: [
          'Nút trái làm hầu hết mọi việc: bấm một lần để **chọn**, bấm nhanh hai lần để **mở**.',
          'Trình đơn gồm những việc em có thể làm với thứ nằm dưới con trỏ chính là việc của **bấm chuột phải**.',
          'Vậy đó là nút **phải**, bấm một lần. Con lăn chỉ kéo trang lên xuống.',
        ],
        answer: 'The right button, once',
        answerVn: 'Nút phải, một lần',
      },
      {
        id: 'f2',
        type: 'dnd',
        prompt: 'Drag each mouse move onto the job it does.',
        promptVn: 'Kéo mỗi động tác chuột vào đúng việc mà nó làm.',
        bank: [
          { val: 'click', text: 'Click', textVn: 'Bấm chuột' },
          { val: 'double', text: 'Double-click', textVn: 'Bấm đúp' },
          { val: 'right', text: 'Right-click', textVn: 'Bấm chuột phải' },
          { val: 'drag', text: 'Drag', textVn: 'Kéo thả' },
        ],
        targets: [
          { id: 'choose', title: 'Chooses a thing, or presses a button', titleVn: 'Chọn một thứ, hoặc bấm một nút' },
          { id: 'open', title: 'Opens a file, folder or program from its icon', titleVn: 'Mở một tệp, thư mục hay chương trình từ biểu tượng của nó' },
          { id: 'menu', title: 'Shows a menu for the thing you clicked', titleVn: 'Hiện trình đơn cho thứ em vừa bấm' },
          { id: 'move', title: 'Moves a thing to a new place', titleVn: 'Chuyển một thứ tới chỗ mới' },
        ],
        correctSets: { choose: ['click'], open: ['double'], menu: ['right'], move: ['drag'] },
        solution: [
          'A **click** is one press of the left button: it chooses a thing or presses a button.',
          'A **double-click** is two quick clicks: it opens things from their icons. A **right-click** shows a menu.',
          'A **drag** is press, hold, move, let go: it moves things — into a folder, or into the bin.',
        ],
        solutionVn: [
          '**Bấm chuột** là bấm nút trái một lần: nó chọn một thứ hoặc bấm một nút.',
          '**Bấm đúp** là hai lần bấm nhanh: nó mở các thứ từ biểu tượng. **Bấm chuột phải** hiện một trình đơn.',
          '**Kéo thả** là bấm, giữ, di chuyển, thả: nó chuyển các thứ đi — vào thư mục, hoặc vào Thùng rác.',
        ],
        answer: 'Click: chooses · Double-click: opens · Right-click: a menu · Drag: moves',
        answerVn: 'Bấm chuột: chọn · Bấm đúp: mở · Bấm chuột phải: trình đơn · Kéo thả: chuyển',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: 'Type the missing English words.',
        promptVn: 'Gõ các từ tiếng Anh còn thiếu.',
        textParts: ['The little arrow on the screen that follows the mouse is the ', '. To read further down a long page, roll the scroll ', '.'],
        textPartsVn: ['Mũi tên nhỏ trên màn hình đi theo con chuột là ', ' (con trỏ chuột). Để đọc xuống dưới một trang dài, hãy lăn scroll ', ' (con lăn).'],
        blanks: {
          1: { correct: 'pointer', width: 8, accept: ['mouse pointer'] },
          2: { correct: 'wheel', width: 7, accept: [] },
        },
        solution: [
          'The arrow that follows the mouse is the **pointer**. Whatever it is on is what your click lands on.',
          'The little wheel between the two buttons is the **scroll wheel**.',
          'The whole sentence: the arrow is the **pointer**, and you roll the scroll **wheel** to move down a page.',
        ],
        solutionVn: [
          'Mũi tên đi theo con chuột là **pointer** (con trỏ chuột). Nó nằm trên thứ gì thì cú bấm rơi vào thứ đó.',
          'Bánh xe nhỏ giữa hai nút là **scroll wheel** (con lăn chuột).',
          'Cả câu: mũi tên là **pointer**, và em lăn scroll **wheel** để kéo trang xuống.',
        ],
        answer: 'pointer; wheel',
        answerVn: 'pointer; wheel',
      },
      {
        id: 'f4',
        type: 'inline',
        prompt: 'Choose the right key for each job.',
        promptVn: 'Chọn đúng phím cho mỗi việc.',
        textParts: ['To type ONE capital letter, hold ', ' and tap the letter. To type EVERY letter as a capital, press ', ' once.'],
        textPartsVn: ['Để gõ MỘT chữ hoa, giữ ', ' rồi bấm chữ cái. Để gõ MỌI chữ cái thành chữ hoa, bấm ', ' một lần.'],
        blanks: {
          1: {
            options: [
              { val: 'shift', text: 'Shift', textVn: 'Shift' },
              { val: 'caps', text: 'Caps Lock', textVn: 'Caps Lock' },
              { val: 'ctrl', text: 'Ctrl', textVn: 'Ctrl' },
            ],
            correct: 'shift',
          },
          2: {
            options: [
              { val: 'shift', text: 'Shift', textVn: 'Shift' },
              { val: 'caps', text: 'Caps Lock', textVn: 'Caps Lock' },
              { val: 'enter', text: 'Enter', textVn: 'Enter' },
            ],
            correct: 'caps',
          },
        },
        solution: [
          '**Shift** is HELD: while it is down, the next letter is a capital. Let go, and small letters come back.',
          '**Caps Lock** is a switch: press it once and every letter is a capital until you press it again. Its light shows when it is on.',
          'Ctrl makes shortcuts and Enter starts a new line — neither makes capitals.',
        ],
        solutionVn: [
          '**Shift** được GIỮ: trong lúc giữ, chữ cái tiếp theo là chữ hoa. Thả ra, chữ thường quay lại.',
          '**Caps Lock** là công tắc: bấm một lần là mọi chữ cái đều viết hoa cho đến khi em bấm lại. Đèn của nó cho biết khi nào nó đang bật.',
          'Ctrl dùng cho phím tắt còn Enter để xuống dòng — không phím nào viết hoa cả.',
        ],
        answer: 'Shift; Caps Lock',
        answerVn: 'Shift; Caps Lock',
      },
    ],
  },
  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        type: 'order',
        prompt: 'Put the steps of making a new folder called Games in order.',
        promptVn: 'Xếp các bước tạo một thư mục mới tên là Games theo đúng thứ tự.',
        bank: [
          { val: 'type', text: 'Type Games', textVn: 'Gõ Games' },
          { val: 'enter', text: 'Press Enter', textVn: 'Bấm Enter' },
          { val: 'rc', text: 'Right-click an empty part of the desktop', textVn: 'Bấm chuột phải vào một chỗ trống trên màn hình nền' },
          { val: 'nf', text: 'Choose New folder', textVn: 'Chọn New folder' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['rc', 'nf', 'type', 'enter'] },
        solution: [
          'It starts with a **right-click on the empty desktop** — a right-click on an icon gives that icon’s menu instead.',
          'Choose **New folder**. It arrives with its name box open, saying "New folder".',
          'Type **Games**, then press **Enter**. Until you press Enter, the folder is still called New folder.',
        ],
        solutionVn: [
          'Bắt đầu bằng **bấm chuột phải vào chỗ trống trên màn hình nền** — bấm chuột phải lên một biểu tượng sẽ ra trình đơn của biểu tượng đó.',
          'Chọn **New folder**. Thư mục xuất hiện với ô tên đang mở, ghi "New folder".',
          'Gõ **Games**, rồi bấm **Enter**. Cho đến khi em bấm Enter, thư mục vẫn tên là New folder.',
        ],
        answer: 'Right-click the desktop, New folder, type Games, Enter.',
        answerVn: 'Bấm chuột phải vào màn hình nền, New folder, gõ Games, Enter.',
      },
      {
        id: 'p2',
        type: 'mcq',
        prompt: 'You typed **helo**, but you meant **hello**. The cursor is at the end, just after the o. What is a quick way to fix it?',
        promptVn: 'Em gõ **helo**, nhưng em muốn gõ **hello**. Con trỏ nằm ở cuối, ngay sau chữ o. Cách sửa nhanh là gì?',
        options: [
          { val: 'a', text: 'Press Delete once, then type lo', textVn: 'Bấm Delete một lần, rồi gõ lo' },
          { val: 'b', text: 'Press Backspace once, then type lo', textVn: 'Bấm Backspace một lần, rồi gõ lo' },
          { val: 'c', text: 'Press Enter, then type hello', textVn: 'Bấm Enter, rồi gõ hello' },
          { val: 'd', text: 'Press Esc to undo the word', textVn: 'Bấm Esc để hoàn tác từ đó' },
        ],
        correct: 'b',
        solution: [
          'The cursor is after the o, so the letter to rub out is BEFORE it — that is **Backspace**. One press: hel.',
          'Now type **lo**, and the word is hello.',
          'Delete rubs out the letter AFTER the cursor, and there is nothing there. Enter just starts a new line and leaves helo behind, and Esc only closes menus.',
        ],
        solutionVn: [
          'Con trỏ nằm sau chữ o, nên chữ cần xóa nằm TRƯỚC nó — đó là **Backspace**. Bấm một lần: hel.',
          'Giờ gõ **lo**, và từ đó thành hello.',
          'Delete xóa chữ cái nằm SAU con trỏ, mà ở đó không có gì. Enter chỉ xuống dòng và để lại chữ helo, còn Esc chỉ đóng trình đơn.',
        ],
        answer: 'Press Backspace once, then type lo',
        answerVn: 'Bấm Backspace một lần, rồi gõ lo',
      },
      {
        id: 'p3',
        type: 'dnd',
        prompt: 'Sort the six keys by the job they do.',
        promptVn: 'Phân loại sáu phím theo việc mà chúng làm.',
        bank: [
          { val: 'backspace', text: 'Backspace', textVn: 'Backspace' },
          { val: 'delete', text: 'Delete', textVn: 'Delete' },
          { val: 'shift', text: 'Shift', textVn: 'Shift' },
          { val: 'caps', text: 'Caps Lock', textVn: 'Caps Lock' },
          { val: 'enter', text: 'Enter', textVn: 'Enter' },
          { val: 'esc', text: 'Esc', textVn: 'Esc' },
        ],
        targets: [
          { id: 'rub', title: 'Rubs out a letter', titleVn: 'Xóa một chữ cái' },
          { id: 'caps', title: 'Makes capital letters', titleVn: 'Viết hoa' },
          { id: 'line', title: 'Starts a new line, or says yes to a box', titleVn: 'Xuống dòng mới, hoặc đồng ý với hộp thoại' },
          { id: 'out', title: 'Backs out without choosing anything', titleVn: 'Thoát ra mà không chọn gì' },
        ],
        correctSets: { rub: ['backspace', 'delete'], caps: ['shift', 'caps'], line: ['enter'], out: ['esc'] },
        solution: [
          '**Backspace** and **Delete** both rub out one letter — Backspace before the cursor, Delete after it.',
          '**Shift** (held, for one capital) and **Caps Lock** (a switch, for all of them) both make capitals.',
          '**Enter** starts a new line or says yes; **Esc** is the opposite — it backs out and chooses nothing.',
        ],
        solutionVn: [
          '**Backspace** và **Delete** đều xóa một chữ cái — Backspace xóa trước con trỏ, Delete xóa sau con trỏ.',
          '**Shift** (giữ, cho một chữ hoa) và **Caps Lock** (công tắc, cho tất cả) đều viết hoa.',
          '**Enter** xuống dòng hoặc đồng ý; **Esc** thì ngược lại — nó thoát ra và không chọn gì.',
        ],
        answer: 'Rub out: Backspace, Delete · Capitals: Shift, Caps Lock · New line: Enter · Back out: Esc',
        answerVn: 'Xóa: Backspace, Delete · Viết hoa: Shift, Caps Lock · Xuống dòng: Enter · Thoát ra: Esc',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: 'Type the missing key names.',
        promptVn: 'Gõ tên các phím còn thiếu.',
        textParts: ['Hold ', ' and tap Z to undo a mistake. Press ', ' to close a menu without choosing anything.'],
        textPartsVn: ['Giữ ', ' rồi bấm Z để hoàn tác một lỗi. Bấm ', ' để đóng trình đơn mà không chọn gì cả.'],
        blanks: {
          1: { correct: 'Ctrl', width: 6, accept: ['control'] },
          2: { correct: 'Esc', width: 6, accept: ['escape'] },
        },
        solution: [
          'A shortcut is **Ctrl** held down with a letter: Ctrl+Z undoes your last change.',
          'The key that backs out of a menu or a box, choosing nothing, is **Esc** — short for escape.',
          'The whole sentence: hold **Ctrl** and tap Z to undo; press **Esc** to close a menu.',
        ],
        solutionVn: [
          'Phím tắt là giữ **Ctrl** cùng một chữ cái: Ctrl+Z hoàn tác thay đổi vừa rồi.',
          'Phím thoát khỏi trình đơn hay hộp thoại mà không chọn gì là **Esc** — viết tắt của escape.',
          'Cả câu: giữ **Ctrl** rồi bấm Z để hoàn tác; bấm **Esc** để đóng trình đơn.',
        ],
        answer: 'Ctrl; Esc',
        answerVn: 'Ctrl; Esc',
      },
    ],
  },
  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        type: 'mcq',
        prompt: 'Ha Vi typed her name. She held Shift for the H and the V, and typed the other letters normally. Look at the screen and the keyboard. What went wrong, and what should she do?',
        promptVn: 'Hà Vi gõ tên của bạn ấy. Bạn ấy giữ Shift khi gõ chữ H và chữ V, còn các chữ khác gõ bình thường. Hãy nhìn màn hình và bàn phím. Điều gì đã sai, và bạn ấy nên làm gì?',
        inlineSvg: DIAGRAMS.WB_CAPS,
        options: [
          { val: 'a', text: 'The keyboard is broken — she needs a new one.', textVn: 'Bàn phím bị hỏng — bạn ấy cần bàn phím mới.' },
          { val: 'b', text: 'Caps Lock was on, so everything flipped. She should press Caps Lock once to turn it off, and type her name again.', textVn: 'Caps Lock đang bật, nên mọi thứ bị đảo ngược. Bạn ấy nên bấm Caps Lock một lần để tắt, rồi gõ lại tên.' },
          { val: 'c', text: 'She pressed Shift too hard. She should press it gently.', textVn: 'Bạn ấy bấm Shift quá mạnh. Bạn ấy nên bấm nhẹ thôi.' },
          { val: 'd', text: 'The window is not the active one. She should click it.', textVn: 'Cửa sổ đó không phải cửa sổ đang dùng. Bạn ấy nên bấm vào nó.' },
        ],
        correct: 'b',
        solution: [
          'Read the keyboard: the **Caps Lock light is on**. So every letter she typed normally came out as a capital: A, I.',
          'With Caps Lock on, holding **Shift** does the OPPOSITE: it gives a small letter. That is the h and the v.',
          'The words did appear in the window, so it WAS the active one. Fix: press **Caps Lock** once to turn it off, rub out the name, and type it again.',
        ],
        solutionVn: [
          'Đọc bàn phím: **đèn Caps Lock đang sáng**. Vì vậy mọi chữ bạn ấy gõ bình thường đều thành chữ hoa: A, I.',
          'Khi Caps Lock đang bật, giữ **Shift** lại làm NGƯỢC lại: nó cho chữ thường. Đó là chữ h và chữ v.',
          'Chữ đã hiện trong cửa sổ, nên đó ĐÚNG LÀ cửa sổ đang dùng. Cách sửa: bấm **Caps Lock** một lần để tắt, xóa tên đi, rồi gõ lại.',
        ],
        answer: 'Caps Lock was on — turn it off and type the name again.',
        answerVn: 'Caps Lock đang bật — hãy tắt nó rồi gõ lại tên.',
      },
      {
        id: 'c2',
        type: 'inline',
        prompt: 'Choose the right words.',
        promptVn: 'Chọn đúng từ.',
        textParts: ['The window on top is the ', ' window: your typing goes into it. To bring a window from behind to the front without closing anything, click its button on the ', '.'],
        textPartsVn: ['Cửa sổ ở trên cùng là cửa sổ ', ': những gì em gõ đi vào nó. Để đưa một cửa sổ từ phía sau lên trước mà không đóng thứ gì, hãy bấm vào nút của nó trên ', '.'],
        blanks: {
          1: {
            options: [
              { val: 'active', text: 'active', textVn: 'đang dùng (active)' },
              { val: 'closed', text: 'closed', textVn: 'đã đóng (closed)' },
              { val: 'min', text: 'minimised', textVn: 'đã thu nhỏ (minimised)' },
            ],
            correct: 'active',
          },
          2: {
            options: [
              { val: 'desktop', text: 'desktop', textVn: 'màn hình nền' },
              { val: 'taskbar', text: 'taskbar', textVn: 'thanh tác vụ' },
              { val: 'bin', text: 'Recycle Bin', textVn: 'Thùng rác' },
            ],
            correct: 'taskbar',
          },
        },
        solution: [
          'The window on top is the **active window** — it gets everything you type and click.',
          'Every open window has a button on the **taskbar**, even one that is hidden behind others.',
          'Clicking that button brings the window to the front. Nothing is closed, and a minimised window is not on top at all.',
        ],
        solutionVn: [
          'Cửa sổ ở trên cùng là **cửa sổ đang dùng** — nó nhận mọi thứ em gõ và bấm.',
          'Mỗi cửa sổ đang mở đều có một nút trên **thanh tác vụ**, kể cả cửa sổ đang bị che phía sau.',
          'Bấm vào nút đó sẽ đưa cửa sổ lên phía trước. Không có gì bị đóng, còn một cửa sổ đã thu nhỏ thì hoàn toàn không ở trên cùng.',
        ],
        answer: 'active; taskbar',
        answerVn: 'đang dùng (active); thanh tác vụ (taskbar)',
      },
      {
        id: 'c3',
        type: 'order',
        prompt: 'Ha Vi spots a wrong letter in the MIDDLE of a word she typed earlier. Put the steps to fix it in order.',
        promptVn: 'Hà Vi phát hiện một chữ cái sai ở GIỮA một từ bạn ấy đã gõ lúc trước. Xếp các bước sửa lỗi theo đúng thứ tự.',
        bank: [
          { val: 'type', text: 'Type the right letter', textVn: 'Gõ chữ cái đúng' },
          { val: 'save', text: 'Press Ctrl+S to save', textVn: 'Bấm Ctrl+S để lưu' },
          { val: 'click', text: 'Click just after the wrong letter', textVn: 'Bấm chuột ngay sau chữ cái sai' },
          { val: 'bs', text: 'Press Backspace once', textVn: 'Bấm Backspace một lần' },
        ],
        targets: [{ id: 'seq', title: 'First to last', titleVn: 'Từ đầu đến cuối' }],
        correctSets: { seq: ['click', 'bs', 'type', 'save'] },
        solution: [
          'First move the cursor: **click just after the wrong letter**. The cursor is where the changes happen.',
          'Now the wrong letter is BEFORE the cursor, so **Backspace** once rubs it out. Then **type** the right one.',
          'Last, **Ctrl+S** saves the fixed work. (Clicking just BEFORE the wrong letter and pressing Delete works too.)',
        ],
        solutionVn: [
          'Trước tiên di chuyển con trỏ: **bấm chuột ngay sau chữ cái sai**. Con trỏ ở đâu thì thay đổi xảy ra ở đó.',
          'Giờ chữ cái sai nằm TRƯỚC con trỏ, nên bấm **Backspace** một lần là xóa được. Rồi **gõ** chữ đúng.',
          'Cuối cùng, **Ctrl+S** lưu lại bài đã sửa. (Bấm ngay TRƯỚC chữ sai rồi bấm Delete cũng được.)',
        ],
        answer: 'Click after it, Backspace, type the right letter, Ctrl+S.',
        answerVn: 'Bấm sau nó, Backspace, gõ chữ đúng, Ctrl+S.',
      },
      {
        id: 'c4',
        type: 'dnd',
        prompt: 'No mouse — only a touch screen. Drag each finger move onto the mouse move that does the same job.',
        promptVn: 'Không có chuột — chỉ có màn hình cảm ứng. Kéo mỗi động tác ngón tay vào động tác chuột làm cùng một việc.',
        bank: [
          { val: 'tap', text: 'Tap', textVn: 'Chạm' },
          { val: 'dtap', text: 'Double-tap', textVn: 'Chạm hai lần' },
          { val: 'hold', text: 'Press and hold', textVn: 'Chạm và giữ' },
          { val: 'slide', text: 'Hold and slide', textVn: 'Giữ và trượt' },
        ],
        targets: [
          { id: 'click', title: 'Click', titleVn: 'Bấm chuột' },
          { id: 'double', title: 'Double-click', titleVn: 'Bấm đúp' },
          { id: 'right', title: 'Right-click', titleVn: 'Bấm chuột phải' },
          { id: 'drag', title: 'Drag', titleVn: 'Kéo thả' },
        ],
        correctSets: { click: ['tap'], double: ['dtap'], right: ['hold'], drag: ['slide'] },
        solution: [
          'A **tap** is a click, and a **double-tap** is a double-click.',
          '**Press and hold** — keeping your finger still — is the right-click: after a moment, a menu appears.',
          '**Hold and slide** is the drag: the thing moves with your finger until you lift it. The difference from a right-click is the sliding.',
        ],
        solutionVn: [
          '**Chạm** là bấm chuột, còn **chạm hai lần** là bấm đúp.',
          '**Chạm và giữ** — giữ yên ngón tay — là bấm chuột phải: sau một chút, một trình đơn hiện ra.',
          '**Giữ và trượt** là kéo thả: thứ đó di chuyển theo ngón tay cho đến khi em nhấc tay lên. Điểm khác với bấm chuột phải là việc trượt.',
        ],
        answer: 'Tap: click · Double-tap: double-click · Press and hold: right-click · Hold and slide: drag',
        answerVn: 'Chạm: bấm chuột · Chạm hai lần: bấm đúp · Chạm và giữ: bấm chuột phải · Giữ và trượt: kéo thả',
      },
    ],
  },
];
