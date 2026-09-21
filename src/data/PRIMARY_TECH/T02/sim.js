// src/data/PRIMARY_TECH/T02/sim.js
// T2 Mouse, Keys and Windows — "Try It" (SIM, 25 XP). Six jobs on the `desktop`
// skin (docs/primary-tech/UPGRADE-PLAN.md §3.1 and the §8.2 additions): icons
// on the desktop, the right-click menu, drag and drop, the Recycle Bin, a new
// folder with its name box, and windows that overlap.
//
// EVERY GOAL IS A STATEMENT ABOUT THE MACHINE, never about a click. "Paint is
// open and on top" is true whether the student double-clicked the icon,
// right-clicked it and chose Open, or went through the menu — and all three
// are the skill. What each goal is built to REFUSE is the wrong-but-plausible
// route, failing the way it fails in life, with Undo right there:
//
//   · closing the window in the way instead of switching → `open`, `lostCount`
//   · minimising the Calculator when the job was to close it → `open`
//   · binning the NEW drawing, or dropping the old one in a folder → `at.*`
//   · a folder left as "New folder" (typed, never Enter; or Esc) → `folders`
//   · one photo left behind, or the homework swept in too → `at.Holiday`
//
// Typing is one move: a folder name is typed in ONE `typeName` action.
// `parMoves` counts the route the deck teaches; where the unit teaches two
// routes of different lengths (double-click = 1 move, right-click ▸ Open = 2),
// par is the longer one, so every taught route earns the bonus.
//
// Hints: `after` is moves made, and a hint shows only once the student has been
// nudged (AppSim.jsx). The LAST hint whose `after` has passed and whose `when`
// holds is the one shown — so the rescue hints ("it went in the bin — put it
// back") sit at the end of each list, where they win when they apply.

export const sim = [
  {
    id: 'open-paint',
    skin: 'desktop',
    brief: 'Your story is open. Open Paint from its icon on the desktop — and keep your story open too.',
    briefVn: 'Truyện của em đang mở. Hãy mở Paint từ biểu tượng của nó trên màn hình nền — và vẫn giữ truyện đang mở.',
    initial: {
      power: 'on',
      windows: [{ app: 'notes', title: 'story', state: 'normal', saved: false }],
    },
    // Three routes pass: double-click the icon (openApp), right-click it ▸ Open,
    // or the menu ▸ Paint. Closing the unsaved story first fails: "Don't save"
    // loses it (lostCount), and "Save" still closes it (open).
    goal: [
      { path: 'focus', equals: 'Paint' },
      { path: 'open', contains: 'story' },
      { path: 'lostCount', equals: 0 },
    ],
    solution: [{ type: 'openApp', app: 'paint' }],
    parMoves: 2,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'app:paint', say: 'Paint’s icon is on the left of the desktop. Double-click it: two quick clicks, and keep the mouse still.', sayVn: 'Biểu tượng Paint nằm bên trái màn hình nền. Bấm đúp vào nó: hai lần bấm thật nhanh, và giữ chuột thật yên.' },
      { after: 2, region: 'context:open', when: { path: 'context', equals: 'app:paint' }, say: 'Its right-click menu is open. Choose Open.', sayVn: 'Trình đơn chuột phải của nó đang mở. Hãy chọn Open.' },
      { after: 1, region: 'app:notes', when: { path: 'open', excludes: 'story' }, say: 'Your story was closed. Press Undo to bring it back — opening Paint does not need the story closed.', sayVn: 'Truyện của em đã bị đóng. Hãy bấm Hoàn tác để lấy lại — mở Paint không cần đóng truyện.' },
      { after: 1, region: 'dialog', when: { path: 'dialog.kind', equals: 'close' }, say: 'Choose Cancel — the job is to keep your story open. Opening Paint does not need the story closed.', sayVn: 'Hãy chọn Cancel — đề bài yêu cầu giữ truyện đang mở. Mở Paint không cần đóng truyện.' },
    ],
  },
  {
    id: 'calculator-to-front',
    skin: 'desktop',
    brief: 'You are drawing in Paint, and you need the Calculator for a moment. It is open, but hidden behind Paint. Bring the Calculator to the front — without closing your drawing.',
    briefVn: 'Em đang vẽ trong Paint, và cần dùng Calculator một chút. Nó đang mở, nhưng bị che phía sau Paint. Hãy đưa Calculator lên phía trước — mà không đóng bức vẽ của em.',
    initial: {
      power: 'on',
      windows: [
        { app: 'calculator', title: 'Calculator', state: 'normal' },
        { app: 'paint', title: 'Paint', state: 'normal', saved: false },
      ],
    },
    // `focus` is the window on top. Clicking the Calculator's taskbar button,
    // clicking the corner of it that shows, or the menu ▸ Calculator all pass;
    // so does minimising Paint (the Calculator is then on top, and the drawing
    // waits on the taskbar, still open). Closing Paint to "get it out of the
    // way" fails: open no longer contains Paint, or the drawing is lost.
    goal: [
      { path: 'focus', equals: 'Calculator' },
      { path: 'open', contains: 'Paint' },
      { path: 'lostCount', equals: 0 },
    ],
    solution: [{ type: 'restore', title: 'Calculator' }],
    parMoves: 1,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'taskbar:Calculator', say: 'Every open window has a button on the taskbar. Click the Calculator’s button — or click any part of its window that you can see.', sayVn: 'Mỗi cửa sổ đang mở đều có một nút trên thanh tác vụ. Hãy bấm vào nút của Calculator — hoặc bấm vào bất kỳ phần nào của cửa sổ đó mà em nhìn thấy.' },
      { after: 1, region: 'dialog', when: { path: 'dialog.kind', equals: 'close' }, say: 'Choose Cancel. Closing Paint is not how you switch windows — and your drawing is not saved.', sayVn: 'Hãy chọn Cancel. Đóng Paint không phải là cách chuyển cửa sổ — và bức vẽ của em chưa được lưu.' },
      { after: 1, region: 'app:paint', when: { path: 'open', excludes: 'Paint' }, say: 'Paint was closed. Press Undo to bring your drawing back, then use the Calculator’s taskbar button instead.', sayVn: 'Paint đã bị đóng. Hãy bấm Hoàn tác để lấy lại bức vẽ, rồi dùng nút của Calculator trên thanh tác vụ.' },
    ],
  },
  {
    id: 'paint-full-screen-close-calculator',
    skin: 'desktop',
    brief: 'You have finished with the Calculator, and you want Paint on the whole screen. Make Paint fill the screen, then close the Calculator. Keep Paint open.',
    briefVn: 'Em đã dùng xong Calculator, và muốn Paint chiếm cả màn hình. Hãy cho Paint chiếm đầy màn hình, rồi đóng Calculator. Vẫn giữ Paint đang mở.',
    initial: {
      power: 'on',
      windows: [
        { app: 'paint', title: 'Paint', state: 'normal', saved: true },
        { app: 'calculator', title: 'Calculator', state: 'normal' },
      ],
    },
    // Paint maximised raises it OVER the Calculator, so the Calculator has to be
    // brought back to the front (its taskbar button) before its X can be
    // reached — or closed from the taskbar with a right-click ▸ Close window.
    // Minimising the Calculator fails (still open); closing Paint fails (not
    // maximised); closing both fails.
    goal: [
      { path: 'maximised', contains: 'Paint' },
      { path: 'open', excludes: 'Calculator' },
    ],
    solution: [
      { type: 'maximise', title: 'Paint' },
      { type: 'restore', title: 'Calculator' },
      { type: 'close', title: 'Calculator' },
    ],
    parMoves: 3,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'max:Paint', when: { path: 'maximised', excludes: 'Paint' }, say: 'The square button in Paint’s own corner makes it fill the screen.', sayVn: 'Nút ô vuông ở góc của chính cửa sổ Paint sẽ cho nó chiếm đầy màn hình.' },
      { after: 2, region: 'taskbar:Calculator', when: [{ path: 'maximised', contains: 'Paint' }, { path: 'focus', equals: 'Paint' }, { path: 'open', contains: 'Calculator' }], say: 'The Calculator is behind Paint now. Click its button on the taskbar to bring it to the front.', sayVn: 'Giờ Calculator đang ở phía sau Paint. Hãy bấm vào nút của nó trên thanh tác vụ để đưa nó lên phía trước.' },
      { after: 2, region: 'close:Calculator', when: { path: 'focus', equals: 'Calculator' }, say: 'Now close the Calculator with the X in ITS corner — not Paint’s.', sayVn: 'Giờ hãy đóng Calculator bằng dấu X ở góc của CHÍNH NÓ — không phải của Paint.' },
      { after: 1, region: 'taskbar:Calculator', when: { path: 'minimised', contains: 'Calculator' }, say: 'Minimise only hides the Calculator — it is still open on the taskbar. Bring it back and close it with its X.', sayVn: 'Thu nhỏ chỉ giấu Calculator đi — nó vẫn đang mở trên thanh tác vụ. Hãy đưa nó trở lại và đóng bằng dấu X của nó.' },
      { after: 1, region: 'app:paint', when: { path: 'open', excludes: 'Paint' }, say: 'Paint was closed. Press Undo — or open Paint again from its icon, and make it fill the screen.', sayVn: 'Paint đã bị đóng. Hãy bấm Hoàn tác — hoặc mở lại Paint từ biểu tượng của nó, rồi cho nó chiếm đầy màn hình.' },
    ],
  },
  {
    id: 'old-drawing-in-the-bin',
    skin: 'desktop',
    brief: 'Put the OLD drawing in the Recycle Bin. Keep the new drawing on the desktop.',
    briefVn: 'Hãy bỏ bức vẽ CŨ (old drawing) vào Thùng rác. Giữ bức vẽ mới (new drawing) trên màn hình nền.',
    initial: {
      power: 'on',
      items: [
        { name: 'old drawing.png' },
        { name: 'new drawing.png' },
        { name: 'Holiday', kind: 'folder' },
      ],
    },
    // Three routes pass, and the deck teaches all three: drag it onto the bin,
    // right-click ▸ Delete, or click it and press the Delete key. Binning the
    // NEW drawing fails; so does letting go over the Holiday folder on the way
    // (it moves into the folder, not the bin).
    goal: [
      { path: 'at.bin', contains: 'old drawing.png' },
      { path: 'at.desktop', contains: 'new drawing.png' },
    ],
    solution: [{ type: 'drag', name: 'old drawing.png', to: 'bin' }],
    parMoves: 2,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'item:old drawing.png', say: 'Drag the OLD drawing onto the Recycle Bin, top right — or right-click it and choose Delete.', sayVn: 'Hãy kéo bức vẽ CŨ thả vào Thùng rác ở góc trên bên phải — hoặc bấm chuột phải vào nó và chọn Delete.' },
      { after: 2, region: 'context:delete', when: { path: 'context', equals: 'item:old drawing.png' }, say: 'Its menu is open. Choose Delete.', sayVn: 'Trình đơn của nó đang mở. Hãy chọn Delete.' },
      { after: 1, region: 'item:Holiday', when: { path: 'at.Holiday', contains: 'old drawing.png' }, say: 'The old drawing landed in the Holiday folder, not the bin. Press Undo, and let go only when the pointer is on the bin.', sayVn: 'Bức vẽ cũ đã rơi vào thư mục Holiday, không phải Thùng rác. Hãy bấm Hoàn tác, và chỉ thả tay khi con trỏ nằm trên Thùng rác.' },
      { after: 1, region: 'bin', when: { path: 'at.bin', contains: 'new drawing.png' }, say: 'The NEW drawing went in the bin. Double-click the Recycle Bin and choose Put it back.', sayVn: 'Bức vẽ MỚI đã vào Thùng rác. Hãy bấm đúp vào Thùng rác và chọn Put it back.' },
    ],
  },
  {
    id: 'new-folder-my-games',
    skin: 'desktop',
    brief: 'Make a new folder on the desktop called My Games. Start with a right-click on an empty part of the desktop.',
    briefVn: 'Hãy tạo một thư mục mới trên màn hình nền tên là My Games. Bắt đầu bằng cách bấm chuột phải vào một chỗ trống trên màn hình nền.',
    initial: {
      power: 'on',
      items: [
        { name: 'my poem.docx' },
        { name: 'rocket.png' },
      ],
    },
    // Right-click the desktop ▸ New folder opens the name box on "New folder";
    // the name counts only once Enter (or a click away) sets it. A folder left
    // as "New folder" fails — typed but never entered, or Esc pressed. Capitals
    // are asked for (the unit teaches Shift) but not marked: "my games" is the
    // same folder to a nine-year-old, and failing it would test the brief.
    goal: [
      { path: 'folders', someMatches: '^[Mm][Yy] [Gg][Aa][Mm][Ee][Ss]$' },
      { path: 'folders', excludes: 'New folder' },
    ],
    solution: [
      { type: 'openContext', target: 'desktop' },
      { type: 'contextChoose', choice: 'newFolder' },
      { type: 'typeName', text: 'My Games' },
      { type: 'commitName' },
    ],
    parMoves: 4,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'screen', say: 'Right-click an EMPTY part of the desktop — not on an icon. (On a tablet: press and hold.)', sayVn: 'Hãy bấm chuột phải vào một chỗ TRỐNG trên màn hình nền — không phải lên biểu tượng. (Trên máy tính bảng: chạm và giữ.)' },
      { after: 2, region: 'context:newFolder', when: { path: 'context', equals: 'desktop' }, say: 'Choose New folder.', sayVn: 'Hãy chọn New folder.' },
      { after: 2, region: 'rename', when: { path: 'renaming', equals: 'New folder' }, say: 'Type My Games — hold Shift for the capital M and G — then press Enter.', sayVn: 'Gõ My Games — giữ Shift để viết hoa chữ M và G — rồi bấm Enter.' },
      { after: 1, region: 'item:New folder', when: [{ path: 'folders', contains: 'New folder' }, { path: 'renaming', equals: null }], say: 'A folder is still called New folder. Right-click it, choose Rename, type My Games and press Enter.', sayVn: 'Vẫn còn một thư mục tên là New folder. Hãy bấm chuột phải vào nó, chọn Rename, gõ My Games rồi bấm Enter.' },
    ],
  },
  {
    id: 'photos-into-holiday',
    skin: 'desktop',
    brief: 'Tidy the desktop: drag BOTH photos — beach.jpg and sandcastle.jpg — into the Holiday folder. Leave your homework where it is.',
    briefVn: 'Dọn màn hình nền: hãy kéo CẢ HAI bức ảnh — beach.jpg và sandcastle.jpg — thả vào thư mục Holiday. Để bài tập về nhà (homework) ở nguyên chỗ cũ.',
    initial: {
      power: 'on',
      items: [
        { name: 'Holiday', kind: 'folder' },
        { name: 'beach.jpg' },
        { name: 'sandcastle.jpg' },
        { name: 'homework.docx' },
      ],
    },
    // Both photos in the folder, the homework still on the desktop. A photo
    // left behind fails; so does one dropped in the bin on the way, or the
    // homework swept in with them. Dropping onto the folder's icon or into its
    // open window are both a `drag` to Holiday, so both pass.
    goal: [
      { path: 'at.Holiday', contains: 'beach.jpg' },
      { path: 'at.Holiday', contains: 'sandcastle.jpg' },
      { path: 'at.desktop', contains: 'homework.docx' },
    ],
    solution: [
      { type: 'drag', name: 'beach.jpg', to: 'Holiday' },
      { type: 'drag', name: 'sandcastle.jpg', to: 'Holiday' },
    ],
    parMoves: 2,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'item:beach.jpg', when: { path: 'at.desktop', contains: 'beach.jpg' }, say: 'Press and hold on beach.jpg, move it onto the Holiday folder, and let go when the folder lights up.', sayVn: 'Bấm và giữ vào beach.jpg, đưa nó lên thư mục Holiday, và thả tay khi thư mục sáng lên.' },
      { after: 2, region: 'item:sandcastle.jpg', when: [{ path: 'at.desktop', contains: 'sandcastle.jpg' }, { path: 'at.Holiday', contains: 'beach.jpg' }], say: 'One photo is in. Now drag sandcastle.jpg onto the Holiday folder too.', sayVn: 'Đã xong một bức ảnh. Giờ hãy kéo cả sandcastle.jpg thả vào thư mục Holiday.' },
      { after: 1, region: 'item:Holiday', when: { path: 'at.Holiday', contains: 'homework.docx' }, say: 'The homework went into the folder too. Press Undo — or open Holiday and drag it back out onto the desktop.', sayVn: 'Bài tập về nhà cũng đã vào thư mục. Hãy bấm Hoàn tác — hoặc mở Holiday và kéo nó trở ra màn hình nền.' },
      { after: 1, region: 'bin', when: { path: 'at.bin', someMatches: '\\.jpg$' }, say: 'A photo went into the Recycle Bin. Double-click the bin, choose Put it back, then drag it onto the folder.', sayVn: 'Một bức ảnh đã vào Thùng rác. Hãy bấm đúp vào Thùng rác, chọn Put it back, rồi kéo nó thả vào thư mục.' },
    ],
  },
];
