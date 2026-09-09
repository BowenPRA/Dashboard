// src/data/PRIMARY_TECH/T04/sim.js
// T4 Saving Your Work — "Try It" (SIM, 30 XP). Four jobs on the `files` skin.
//
// Item shape is documented in src/tasks/AppSim.jsx; the engine, the goal
// operators and the author-time checks are in src/utils/appSim.js.
//
// EVERY GOAL IS A STATEMENT ABOUT THE MACHINE, never about a click. "The file is
// in Documents and it is not in Downloads any more" is true whether the student
// dragged it, used the row menu, or used the menu after searching for it — and
// all three of those routes are the same skill. `npm run validate` replays each
// `solution` below and refuses the unit if one does not reach its goal, so an
// unsolvable job cannot ship.
//
// The names the student types are NOT compared to anything. `someMatches` and
// `matches` ask only "is this a name you could find again next week" — three or
// more characters and not the one the computer suggested. Marking a nine-year-old
// down for choosing "volcano report" over "volcano project" would be testing
// obedience, not filing.

/** A name a person chose: 3+ sensible characters, and not the computer's own. */
const A_REAL_NAME = '^(?!Untitled)[A-Za-z0-9][A-Za-z0-9 _-]{2,}\\.docx$';

export const sim = [
  {
    id: 'save-it-somewhere-you-can-find',
    skin: 'files',
    brief: 'You have written a report and it is not saved yet. Save it in Documents, with a name you will still understand next week.',
    briefVn: 'Em vừa viết xong một bài báo cáo và chưa lưu. Hãy lưu nó vào Documents, với một cái tên mà tuần sau em vẫn hiểu.',
    initial: {
      cwd: 'Documents',
      editor: { name: 'Untitled', ext: 'docx' },
      files: [{ name: 'reading-list.pdf', in: 'Downloads' }],
    },
    goal: [
      { path: 'savedIn', equals: 'Documents' },
      { path: 'savedName', matches: A_REAL_NAME },
    ],
    // Save on a document that has never been saved opens the Save As dialog,
    // exactly as it does on a real machine — which is the whole lesson of this
    // unit, and why the first step here is Save and not Save As.
    solution: [
      { type: 'save' },
      { type: 'dialogName', name: 'volcano report' },
      { type: 'dialogFolder', folder: 'Documents' },
      { type: 'dialogConfirm' },
    ],
    parMoves: 4,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'save', say: 'Start with Save, at the top.', sayVn: 'Hãy bắt đầu bằng nút Save ở phía trên.' },
      { after: 6, region: 'dialogFolder', say: 'Now choose the folder to put it in.', sayVn: 'Bây giờ hãy chọn thư mục để cất nó vào.' },
    ],
  },
  {
    id: 'file-the-download',
    skin: 'files',
    brief: 'You downloaded reading-list.pdf and it went to Downloads. Put it in Documents, where your school work lives.',
    briefVn: 'Em đã tải reading-list.pdf về và nó nằm trong Downloads. Hãy chuyển nó vào Documents, nơi để bài vở của em.',
    initial: {
      cwd: 'Documents',
      files: [
        { name: 'reading-list.pdf', in: 'Downloads' },
        { name: 'class-photo.jpg', in: 'Downloads' },
        { name: 'volcano report.docx', in: 'Documents' },
      ],
    },
    // Both clauses matter: arriving in Documents is not enough if a copy is
    // still sitting in Downloads, because "I have two of them and I do not know
    // which is which" is the exact mess this unit exists to prevent.
    goal: [
      { path: 'at.Documents', contains: 'reading-list.pdf' },
      { path: 'at.Downloads', excludes: 'reading-list.pdf' },
    ],
    solution: [
      { type: 'openFolder', folder: 'Downloads' },
      { type: 'select', name: 'reading-list.pdf' },
      { type: 'move', name: 'reading-list.pdf', to: 'Documents' },
    ],
    parMoves: 3,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'folder:Downloads', say: 'The file is in Downloads. Open it first.', sayVn: 'Tệp đang ở trong Downloads. Hãy mở thư mục đó trước.' },
    ],
  },
  {
    id: 'give-it-a-real-name',
    skin: 'files',
    brief: 'The computer named these for you and they are useless. Rename the one you are working on so you will know it next week. Do not delete anything.',
    briefVn: 'Máy tính tự đặt tên cho những tệp này và chúng vô dụng. Hãy đổi tên tệp em đang làm để tuần sau em còn nhận ra. Đừng xoá gì cả.',
    initial: {
      cwd: 'Documents',
      files: [
        { name: 'Untitled1.docx', in: 'Documents' },
        { name: 'Untitled2.docx', in: 'Documents' },
      ],
    },
    goal: [
      { path: 'at.Documents', someMatches: A_REAL_NAME },
      // Renaming, not deleting. Without this a student could empty the folder
      // and the first clause would still be talking about nothing.
      { path: 'count', equals: 2 },
    ],
    solution: [
      { type: 'select', name: 'Untitled1.docx' },
      { type: 'rename', name: 'Untitled1.docx', to: 'volcano report' },
    ],
    parMoves: 2,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'list', say: 'Tap a file, then use its ⋮ menu to rename it.', sayVn: 'Hãy chạm vào một tệp, rồi dùng trình đơn ⋮ của nó để đổi tên.' },
    ],
  },
  {
    id: 'get-it-back',
    skin: 'files',
    brief: 'Somebody deleted your homework by mistake. Get it back into Documents.',
    briefVn: 'Có người lỡ tay xoá mất bài tập của em. Hãy lấy nó về lại Documents.',
    initial: {
      cwd: 'Documents',
      files: [
        { name: 'homework.docx', in: 'Recycle Bin' },
        { name: 'volcano report.docx', in: 'Documents' },
      ],
    },
    goal: [
      { path: 'at.Documents', contains: 'homework.docx' },
      { path: 'bin', excludes: 'homework.docx' },
    ],
    solution: [
      { type: 'openFolder', folder: 'Recycle Bin' },
      { type: 'select', name: 'homework.docx' },
      { type: 'restore', name: 'homework.docx' },
    ],
    parMoves: 3,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'folder:Recycle Bin', say: 'Deleted things go to the Recycle Bin. Look in there.', sayVn: 'Thứ bị xoá sẽ vào Recycle Bin. Hãy tìm trong đó.' },
    ],
  },
];
