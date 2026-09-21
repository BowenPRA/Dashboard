// src/data/PRIMARY_TECH/T04/sim.js
// T4 Saving Your Work — "Try It" (SIM, 25 XP). Six jobs on the `files` skin,
// in teaching order: save new work; keep a first draft with Save As; rename
// what the computer named; file a download; find a lost file and file it; get
// a deleted file back.
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
// THE PLAUSIBLE WRONG ROUTE FAILS. Each goal is written so the mistake a real
// student makes leaves it unmet: pressing Save on the first draft (still one
// file), saving the second version into Downloads, deleting the other Untitled
// file instead of just renaming, moving the download that is not theirs instead
// of their own poster.
//
// TYPING IS ONE MOVE. Every text field in a solution is typed in a single
// action (`{ type: 'dialogName', name: 'volcano report' }`), which is how the
// engine counts a student's typing against par (UPGRADE-PLAN §3.1).
//
// The names the student types are NOT compared to anything. `someMatches` and
// `matches` ask only "is this a name you could find again next week" — three or
// more characters and not the one the computer suggested. Marking a nine-year-old
// down for choosing "volcano report" over "volcano project" would be testing
// obedience, not filing.

/** A name a person chose: 3+ sensible characters, and not the computer's own. */
const A_REAL_NAME = '^(?!Untitled)[A-Za-z0-9][A-Za-z0-9 _-]{2,}\\.docx$';

/**
 * The second version's name: anything the student chose that is NOT the first
 * draft's own name and not the computer's Untitled. The Save As box pre-fills
 * "volcano report" (no extension), so clicking at the end and typing " 2" gives
 * "volcano report 2.docx". Writing OVER the draft is refused separately, by the
 * `overwritten` clause: a Save before the Save As, or a Save As onto the same
 * name confirmed with "Yes, replace it", both put the draft on that list.
 */
const NOT_THE_DRAFT = '^(?!volcano report\\.docx$)(?!Untitled)\\S.{2,}$';

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
    // Save, the name and the folder each leave the goal as unmet as before (only
    // the final Save in the box meets it). The nudge now also waits until the
    // student is past par, so the perfect route is never nudged.
    hintAfter: 4,
    hints: [
      { after: 4, region: 'save', say: 'Start with Save, at the top (or press Ctrl+S).', sayVn: 'Hãy bắt đầu bằng nút Save ở phía trên (hoặc bấm Ctrl+S).' },
      { after: 6, region: 'dialogName', say: 'Type a name that says what it is, like volcano report.', sayVn: 'Gõ một cái tên nói rõ nó là gì, ví dụ volcano report.' },
      { after: 8, region: 'dialogFolder', say: 'Now choose the folder to put it in: Documents.', sayVn: 'Bây giờ hãy chọn thư mục để cất nó: Documents.' },
    ],
  },
  {
    // Save As, for real. The first draft must still be there, untouched, AND a
    // second file must exist beside it. Pressing Save writes over the draft and
    // leaves one file, so it fails; Save As with the SAME name in the same
    // folder replaces the draft, so it fails too; a copy saved into Downloads
    // leaves Documents one file short.
    //
    // Save first and Save As afterwards writes the new ending over the draft
    // before copying it. The folder listing cannot show that, so the engine
    // keeps a list of files written over (`overwritten`) and the goal refuses it.
    id: 'keep-your-first-draft',
    skin: 'files',
    brief: 'Your teacher liked the first draft of your volcano report. You have changed the ending. Keep the first draft exactly as it is (do not write over it), and save this new version as a SECOND file in Documents.',
    briefVn: 'Cô giáo thích bản nháp đầu tiên của bài báo cáo núi lửa. Em đã sửa phần kết. Hãy giữ nguyên bản nháp đầu tiên (đừng ghi đè lên nó), và lưu phiên bản mới này thành một tệp THỨ HAI trong Documents.',
    initial: {
      cwd: 'Documents',
      editor: { name: 'volcano report.docx', ext: 'docx', in: 'Documents' },
      files: [
        { name: 'volcano report.docx', in: 'Documents' },
        { name: 'maths homework.docx', in: 'Documents' },
      ],
    },
    // No `savedIn` clause: a plain Save would satisfy it and AppSim would read
    // that as progress. Three files in Documents says the same thing.
    goal: [
      { path: 'at.Documents', contains: 'volcano report.docx' },
      { path: 'at.Documents.length', equals: 3 },
      { path: 'savedName', matches: NOT_THE_DRAFT },
      // Kept means never written over — the one thing the folder listing
      // cannot show, since Save-then-Save-As also ends with three files.
      { path: 'overwritten', excludes: 'volcano report.docx' },
    ],
    solution: [
      { type: 'saveAs' },
      { type: 'dialogName', name: 'volcano report 2' },
      { type: 'dialogFolder', folder: 'Documents' },
      { type: 'dialogConfirm' },
    ],
    parMoves: 4,
    hintAfter: 4,
    hints: [
      { after: 4, region: 'saveAs', say: 'Save would write over your first draft. Use Save As — it makes a new file.', sayVn: 'Save sẽ ghi đè lên bản nháp đầu tiên. Hãy dùng Save As — nó tạo ra một tệp mới.' },
      { after: 7, region: 'dialogName', say: 'Give the new version a DIFFERENT name, like volcano report 2.', sayVn: 'Đặt cho phiên bản mới một cái tên KHÁC, ví dụ volcano report 2.' },
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
      // Renaming, not deleting. A deleted file only moves to the bin, so the
      // total `count` cannot see it; both files must still be IN Documents.
      { path: 'count', equals: 2 },
      { path: 'at.Documents.length', equals: 2 },
    ],
    solution: [
      { type: 'select', name: 'Untitled1.docx' },
      { type: 'rename', name: 'Untitled1.docx', to: 'volcano report' },
    ],
    parMoves: 2,
    hintAfter: 3,
    hints: [
      { after: 3, region: 'list', say: 'Tap a file, then use its ⋮ menu (or right-click it) to rename it.', sayVn: 'Hãy chạm vào một tệp, rồi dùng trình đơn ⋮ của nó (hoặc bấm chuột phải) để đổi tên.' },
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
      { after: 5, region: 'file:reading-list.pdf', say: 'Tap its ⋮, then Move to ▸ Documents. Or drag it onto Documents.', sayVn: 'Chạm vào nút ⋮ của nó, rồi chọn Move to ▸ Documents. Hoặc kéo nó thả vào Documents.' },
    ],
  },
  {
    // A file saved somewhere the student did not look. The search box finds it
    // by part of its name (it looks in every folder); opening the folders one by
    // one finds it too, and the solution takes that route so it validates
    // whichever way search behaves. The trap is the other "rainforest" file —
    // a download that is not the student's poster. Moving that one leaves the
    // poster on the Desktop, so the goal stays unmet.
    id: 'find-it-and-file-it',
    skin: 'files',
    brief: 'Yesterday you saved your rainforest poster, but you did not look where it went. Find it, and put it in Documents with the rest of your school work.',
    briefVn: 'Hôm qua em đã lưu tấm áp phích về rừng mưa, nhưng em không để ý nó được lưu vào đâu. Hãy tìm nó, và chuyển nó vào Documents cùng với các bài vở khác của em.',
    initial: {
      cwd: 'Documents',
      files: [
        { name: 'volcano report.docx', in: 'Documents' },
        { name: 'maths homework.docx', in: 'Documents' },
        { name: 'rainforest facts.pdf', in: 'Downloads' },
        { name: 'class-photo.jpg', in: 'Downloads' },
        { name: 'maths-sheet.pdf', in: 'Downloads' },
        { name: 'Untitled1.docx', in: 'Desktop' },
        { name: 'game-screenshot.png', in: 'Desktop' },
        { name: 'rainforest poster.png', in: 'Desktop' },
        { name: 'Untitled2.docx', in: 'Desktop' },
      ],
    },
    goal: [
      { path: 'at.Documents', contains: 'rainforest poster.png' },
      { path: 'at.Desktop', excludes: 'rainforest poster.png' },
      { path: 'bin', excludes: 'rainforest poster.png' },
    ],
    solution: [
      { type: 'openFolder', folder: 'Desktop' },
      { type: 'select', name: 'rainforest poster.png' },
      { type: 'move', name: 'rainforest poster.png', to: 'Documents' },
    ],
    // One spare move over the three-step solution: a student who does not know
    // where it is will reasonably search, or open one wrong folder, first —
    // and hintAfter 4 lets that one wrong folder go by without a nudge.
    parMoves: 4,
    hintAfter: 4,
    hints: [
      { after: 4, region: 'search', say: 'Not sure where it went? Type part of its name, like rainforest, in the search box.', sayVn: 'Không chắc nó ở đâu? Gõ một phần tên của nó, ví dụ rainforest, vào ô tìm kiếm.' },
      { after: 7, region: 'folder:Desktop', say: 'Look on the Desktop. Your poster is the .png, not the downloaded facts sheet.', sayVn: 'Hãy tìm trên Desktop. Áp phích của em là tệp .png, không phải tờ thông tin tải về.' },
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
      { after: 5, region: 'file:homework.docx', say: 'Tap its ⋮, then Put it back.', sayVn: 'Chạm vào nút ⋮ của nó, rồi chọn Put it back.' },
    ],
  },
];
