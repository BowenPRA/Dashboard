// src/data/PRIMARY_TECH/T02/assessment.js
// T2 Mouse, Keys and Windows — the Quiz (ASSESSMENT, 20 XP). Eight questions,
// ten minutes: 1–3 the mouse moves, 4–6 the keys, 7 the touchpad, 8 the window
// on top.
//
// The Quiz asks WHAT FOR and WHY, because Try It, the Mouse Gym and Label It
// have already tested the doing and the where (docs/digital-skills-course.md
// §5.1). No item copies a deck check: the deck asks which part scrolls a page,
// what press-and-hold is on a tablet, how to switch back to a story, which side
// Delete rubs out, how to press Ctrl+S and how to fix a Caps Lock sentence — so
// the quiz asks what a double-click and a right-click do, what Caps Lock and
// Ctrl+Z are, the right-click on a TOUCHPAD, and why typing lands in the wrong
// window.
//
// Bilingual convention for this track's quizzes follows Y7_MATH: the question
// and its options are English (Assessment.jsx renders only the explanation
// bilingually), so the English is kept short and plain, and the Vietnamese
// carries the teaching in `expVn`.
//
// Every distractor is a nameable mistake — one click for two, Shift for Caps
// Lock, save for undo, a touch-screen gesture on a touchpad, "open" for "on
// top" — and the right letter is spread two apiece across A–D.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_double_click',
      type: 'mcq',
      title: '1. What does a double-click on an icon usually do?',
      options: [
        { val: 'A', text: 'A. It chooses the icon, but does not open it' },
        { val: 'B', text: 'B. It opens the file, folder or program' },
        { val: 'C', text: 'C. It puts it in the Recycle Bin' },
        { val: 'D', text: 'D. It gives it a new name' },
      ],
      correct: 'B',
      expEn: 'Two quick clicks open whatever the icon stands for. One click only chooses it (A) — that is the difference between a click and a double-click.',
      expVn: 'Hai lần bấm thật nhanh sẽ mở thứ mà biểu tượng đại diện. Bấm một lần chỉ chọn nó (A) — đó là điểm khác nhau giữa bấm chuột và bấm đúp.',
    },
    {
      id: 'a2_drag',
      type: 'mcq',
      title: '2. You want to move a photo into a folder. Which mouse move do you use?',
      options: [
        { val: 'A', text: 'A. Right-click' },
        { val: 'B', text: 'B. Double-click' },
        { val: 'C', text: 'C. Scroll' },
        { val: 'D', text: 'D. Drag' },
      ],
      correct: 'D',
      expEn: 'Dragging moves things: press and hold on the photo, move it onto the folder, and let go. A double-click would open the photo instead, and scrolling only moves the page.',
      expVn: 'Kéo thả dùng để chuyển các thứ đi: bấm và giữ vào bức ảnh, đưa nó lên thư mục, rồi thả tay. Bấm đúp thì lại mở bức ảnh, còn cuộn chỉ kéo trang lên xuống.',
    },
    {
      id: 'a3_right_click',
      type: 'mcq',
      title: '3. What usually happens when you right-click on something?',
      options: [
        { val: 'A', text: 'A. A menu opens, with things you can do to that thing' },
        { val: 'B', text: 'B. It is deleted' },
        { val: 'C', text: 'C. It opens in a new window' },
        { val: 'D', text: 'D. The computer goes to sleep' },
      ],
      correct: 'A',
      expEn: 'A right-click shows a menu about the thing under the pointer: a file offers Open, Rename and Delete; the empty desktop offers New folder. Nothing happens until you choose from the menu.',
      expVn: 'Bấm chuột phải hiện một trình đơn về thứ nằm dưới con trỏ: một tệp đưa ra Open, Rename và Delete; màn hình nền trống đưa ra New folder. Chưa có gì xảy ra cho đến khi em chọn trong trình đơn.',
    },
    {
      id: 'a4_caps_lock',
      type: 'mcq',
      title: '4. What does Caps Lock do?',
      options: [
        { val: 'A', text: 'A. It makes only the next letter a capital' },
        { val: 'B', text: 'B. It locks the keyboard so nobody can type' },
        { val: 'C', text: 'C. It makes every letter a capital until you press it again' },
        { val: 'D', text: 'D. It rubs out capital letters' },
      ],
      correct: 'C',
      expEn: 'Caps Lock is a switch: on, every letter is a capital; press it again and small letters come back. A capital for just the next letter is what holding Shift does (A).',
      expVn: 'Caps Lock là một công tắc: khi bật, mọi chữ cái đều viết hoa; bấm lại thì chữ thường quay trở lại. Viết hoa chỉ chữ cái tiếp theo là việc của phím Shift khi được giữ (A).',
    },
    {
      id: 'a5_enter',
      type: 'mcq',
      title: '5. You finish a line of typing and want to start a new one. Which key do you press?',
      options: [
        { val: 'A', text: 'A. Enter' },
        { val: 'B', text: 'B. Esc' },
        { val: 'C', text: 'C. Shift' },
        { val: 'D', text: 'D. Backspace' },
      ],
      correct: 'A',
      expEn: 'Enter finishes a line and starts a new one (it also says yes to a box). Esc backs out, Shift makes a capital, and Backspace rubs out a letter.',
      expVn: 'Enter kết thúc một dòng và bắt đầu dòng mới (nó cũng dùng để đồng ý với một hộp thoại). Esc để thoát ra, Shift để viết hoa, còn Backspace để xóa một chữ cái.',
    },
    {
      id: 'a6_ctrl_z',
      type: 'mcq',
      title: '6. What does Ctrl+Z do?',
      options: [
        { val: 'A', text: 'A. It saves your work' },
        { val: 'B', text: 'B. It undoes your last change' },
        { val: 'C', text: 'C. It copies what you chose' },
        { val: 'D', text: 'D. It closes the window' },
      ],
      correct: 'B',
      expEn: 'Ctrl+Z is undo — the first thing to try when something goes wrong. Ctrl+S saves (A) and Ctrl+C copies (C).',
      expVn: 'Ctrl+Z là hoàn tác — việc đầu tiên nên thử khi có gì đó sai. Ctrl+S để lưu (A) còn Ctrl+C để sao chép (C).',
    },
    {
      id: 'a7_touchpad',
      type: 'mcq',
      title: '7. A laptop has a touchpad but no mouse. How do you right-click?',
      options: [
        { val: 'A', text: 'A. Tap the touchpad once' },
        { val: 'B', text: 'B. Slide one finger across the touchpad' },
        { val: 'C', text: 'C. Double-tap the touchpad' },
        { val: 'D', text: 'D. Tap the touchpad with two fingers' },
      ],
      correct: 'D',
      expEn: 'On a touchpad, a two-finger tap is the right-click. One tap is a click (A), sliding one finger moves the pointer (B), and a double-tap is a double-click (C).',
      expVn: 'Trên bàn di chuột, chạm bằng hai ngón tay là bấm chuột phải. Chạm một lần là bấm chuột (A), trượt một ngón tay là di chuyển con trỏ (B), còn chạm hai lần là bấm đúp (C).',
    },
    {
      id: 'a8_wrong_window',
      type: 'mcq',
      title: '8. You start typing, but the words appear in the wrong window. What is the most likely reason?',
      options: [
        { val: 'A', text: 'A. The keyboard is broken' },
        { val: 'B', text: 'B. Caps Lock is on' },
        { val: 'C', text: 'C. A different window was on top, so it got the typing' },
        { val: 'D', text: 'D. The window you wanted is maximised' },
      ],
      correct: 'C',
      expEn: 'Typing always goes into the active window — the one on top. Being open is not enough: click the window you want (or its taskbar button) before you type.',
      expVn: 'Những gì em gõ luôn đi vào cửa sổ đang dùng — cửa sổ ở trên cùng. Chỉ đang mở thôi thì chưa đủ: hãy bấm vào cửa sổ em muốn (hoặc nút của nó trên thanh tác vụ) trước khi gõ.',
    },
  ],
};
