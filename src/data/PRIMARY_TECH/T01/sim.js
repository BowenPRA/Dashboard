// src/data/PRIMARY_TECH/T01/sim.js
// T1 Starting and Stopping — "Try It" (SIM, 25 XP). Six jobs on the `desktop`
// skin (docs/primary-tech/UPGRADE-PLAN.md §3.1): the machine itself — the power
// button on the case, the login screen, the menu and its Power choices, and
// windows with their three corner buttons.
//
// TEMP (integration): the `desktop` skin is being built by the lead and does not
// exist on this branch, so this file is written but NOT imported by data.js yet.
// When it is wired in (`sim: sim,` in data.js, SIM in Gate 1), `npm run
// validate` replays every `solution` below and refuses an item it cannot solve,
// or one whose goal is met before the student does anything.
//
// EVERY GOAL IS A STATEMENT ABOUT THE MACHINE, never about a click. "The
// computer is asleep and the story is still open" is true whether the student
// used the menu or gave the power button one short press — and both of those are
// the skill. What each goal is built to REFUSE is the wrong-but-plausible route,
// failing the way it fails in life, with Undo right there:
//
//   · holding the power button on a machine that is working → `forced`
//   · Log out / Restart / Shut down "anyway" over unsaved work, or closing it
//     and discarding → `lostCount`
//   · Restart when the job was to hand the computer over → `lastStop`
//   · closing the story when the job was to keep it open → `open`
//
// Typing is one move: the password is typed in ONE `typePassword` action.
// The account is the skin's default (Ha Vi / sunflower), and every job that
// needs the password says it in the brief.

export const sim = [
  {
    id: 'turn-it-on-and-log-in',
    skin: 'desktop',
    brief: 'The computer is off. Turn it on and log in as Ha Vi. Her password is sunflower.',
    briefVn: 'Máy tính đang tắt. Hãy bật máy và đăng nhập với tên Hà Vi. Mật khẩu của bạn ấy là sunflower.',
    initial: { power: 'off', user: 'Ha Vi', password: 'sunflower' },
    // One short press, not a hold: holding the button is never how a working
    // computer is started or stopped, so it fails the job here too.
    goal: [
      { path: 'loggedIn', equals: true },
      { path: 'forced', equals: 0 },
    ],
    solution: [
      { type: 'pressPower' },
      { type: 'typePassword', text: 'sunflower' },
      { type: 'submitLogin' },
    ],
    parMoves: 3,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'power', say: 'Start with ONE short press of the power button on the case.', sayVn: 'Bắt đầu bằng MỘT lần bấm nhẹ nút nguồn trên thân máy.' },
      { after: 4, region: 'password', say: 'Type the password from the job — sunflower — then press Enter.', sayVn: 'Nhập mật khẩu trong đề bài — sunflower — rồi bấm Enter.' },
    ],
  },
  {
    id: 'bring-it-back-full-screen',
    skin: 'desktop',
    brief: 'Ha Vi minimised her story by mistake, and it is not saved. Bring the story window back, and make it fill the whole screen.',
    briefVn: 'Hà Vi lỡ thu nhỏ cửa sổ truyện, và truyện chưa được lưu. Hãy đưa cửa sổ truyện trở lại, và cho nó chiếm đầy màn hình.',
    initial: {
      power: 'on',
      windows: [
        { app: 'notes', title: 'story', state: 'min', saved: false },
        { app: 'paint', title: 'my drawing', state: 'normal', saved: true },
      ],
    },
    // Closing the story and opening Notes again is the tempting wrong route: the
    // unsaved story is lost (lostCount), and a new window is not "story".
    goal: [
      { path: 'maximised', contains: 'story' },
      { path: 'lostCount', equals: 0 },
    ],
    solution: [
      { type: 'restore', title: 'story' },
      { type: 'maximise', title: 'story' },
    ],
    parMoves: 2,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'taskbar:story', say: 'A minimised window waits on the taskbar. Click its button there.', sayVn: 'Cửa sổ bị thu nhỏ chờ trên thanh tác vụ. Hãy bấm vào nút của nó ở đó.' },
      { after: 4, region: 'max:story', say: 'Now the square button in its corner makes it fill the screen.', sayVn: 'Giờ nút ô vuông ở góc cửa sổ sẽ cho nó chiếm đầy màn hình.' },
    ],
  },
  {
    id: 'save-then-shut-down',
    skin: 'desktop',
    brief: 'Ha Vi has finished for the day. Her story is open and not saved yet. Save it, then shut the computer down properly.',
    briefVn: 'Hà Vi đã xong việc hôm nay. Truyện của bạn ấy đang mở và chưa được lưu. Hãy lưu nó, rồi tắt máy đúng cách.',
    initial: {
      power: 'on',
      windows: [{ app: 'notes', title: 'story', state: 'normal', saved: false }],
    },
    // Shut down over the unsaved story stops and asks; "shut down anyway" loses
    // it (lostCount). Holding the power button loses it too, and is `forced`.
    goal: [
      { path: 'power', equals: 'off' },
      { path: 'lastStop', equals: 'shutdown' },
      { path: 'forced', equals: 0 },
      { path: 'lostCount', equals: 0 },
    ],
    // The deck's five steps: save, close, menu, Power, Shut down. Closing the
    // window is good practice but not required — shutting down a SAVED window
    // loses nothing — so the four-move route is inside par too.
    solution: [
      { type: 'save', title: 'story' },
      { type: 'close', title: 'story' },
      { type: 'openMenu' },
      { type: 'openPowerMenu' },
      { type: 'shutdown' },
    ],
    parMoves: 5,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'save:story', say: 'Save first — the Save button, or Ctrl+S.', sayVn: 'Lưu trước — nút Save, hoặc Ctrl+S.' },
      { after: 4, region: 'menu', say: 'Now open the menu at the left end of the taskbar, then Power.', sayVn: 'Giờ hãy mở trình đơn ở đầu bên trái thanh tác vụ, rồi chọn Nguồn.' },
      { after: 6, region: 'stop:shutdown', say: 'Choose Shut down — never hold the power button on a computer that is working.', sayVn: 'Chọn Tắt máy — đừng bao giờ giữ nút nguồn khi máy đang chạy bình thường.' },
    ],
  },
  {
    id: 'hand-it-to-your-sister',
    skin: 'desktop',
    brief: 'Your sister needs the computer for her homework, on her own account. Your drawing is still open and not saved. Leave the computer ready for her to log in — without losing your drawing.',
    briefVn: 'Chị của em cần máy để làm bài tập, bằng tài khoản riêng của chị ấy. Bức vẽ của em vẫn đang mở và chưa lưu. Hãy để máy sẵn sàng cho chị ấy đăng nhập — mà không làm mất bức vẽ.',
    initial: {
      power: 'on',
      windows: [{ app: 'paint', title: 'my drawing', state: 'normal', saved: false }],
    },
    // Restart ALSO ends at the login screen, which is why the goal names the
    // stop: Restart is for a computer acting strangely, and makes her wait for
    // the whole machine. Log out over the unsaved drawing stops and asks, and
    // "log out anyway" loses it.
    goal: [
      { path: 'lastStop', equals: 'logout' },
      { path: 'power', equals: 'login' },
      { path: 'lostCount', equals: 0 },
    ],
    solution: [
      { type: 'save', title: 'my drawing' },
      { type: 'openMenu' },
      { type: 'openPowerMenu' },
      { type: 'logout' },
    ],
    parMoves: 5,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'save:my drawing', say: 'Save the drawing first, or the computer will stop and ask.', sayVn: 'Hãy lưu bức vẽ trước, nếu không máy sẽ dừng lại và hỏi.' },
      { after: 4, region: 'menu', say: 'The ways to stop are in the menu, under Power.', sayVn: 'Các cách dừng máy nằm trong trình đơn, mục Nguồn.' },
      { after: 6, region: 'stop:logout', say: 'Log out closes YOUR account and leaves the computer on, ready for her.', sayVn: 'Đăng xuất đóng tài khoản CỦA EM và để máy vẫn bật, sẵn sàng cho chị ấy.' },
    ],
  },
  {
    id: 'dinner-sleep',
    skin: 'desktop',
    brief: 'Dinner is ready, and you will be back in twenty minutes to finish your story. Save it, then stop the computer so that the story is still open when you come back.',
    briefVn: 'Cơm tối đã xong, và hai mươi phút nữa em sẽ quay lại viết nốt truyện. Hãy lưu truyện, rồi dừng máy sao cho khi quay lại, truyện vẫn đang mở.',
    initial: {
      power: 'on',
      windows: [{ app: 'notes', title: 'story', state: 'normal', saved: false }],
    },
    // Two routes pass, and both are the skill: menu → Power → Sleep, or ONE
    // short press of the power button (on → sleep). Shut down, Log out and
    // Restart all close the story (`open`); holding the button is `forced`.
    goal: [
      { path: 'power', equals: 'sleep' },
      { path: 'open', contains: 'story' },
      { path: 'unsaved', excludes: 'story' },
      { path: 'lostCount', equals: 0 },
      { path: 'forced', equals: 0 },
    ],
    // The menu route. `[{ type: 'save', title: 'story' }, { type: 'pressPower' }]`
    // passes too, in two moves.
    solution: [
      { type: 'save', title: 'story' },
      { type: 'openMenu' },
      { type: 'openPowerMenu' },
      { type: 'sleep' },
    ],
    parMoves: 4,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'save:story', say: 'Save the story first.', sayVn: 'Hãy lưu truyện trước.' },
      { after: 4, region: 'powerMenu', say: 'Sleep keeps every window open. It is under Power in the menu — or give the power button ONE short press.', sayVn: 'Ngủ giữ mọi cửa sổ vẫn mở. Nó nằm trong mục Nguồn của trình đơn — hoặc bấm nhẹ nút nguồn MỘT lần.' },
    ],
  },
  {
    id: 'frozen-get-it-back',
    skin: 'desktop',
    brief: 'The computer has frozen: nothing answers — not the mouse, not the keys. Get it working again and log back in as Ha Vi (password: sunflower).',
    briefVn: 'Máy tính bị treo: không gì phản hồi — cả chuột lẫn bàn phím. Hãy làm cho máy chạy lại và đăng nhập lại với tên Hà Vi (mật khẩu: sunflower).',
    initial: {
      power: 'on',
      frozen: true,
      windows: [{ app: 'paint', title: 'my drawing', state: 'normal', saved: true }],
    },
    // The one job where holding the button is RIGHT: a frozen machine ignores
    // everything else, including the menu and a short press. The goal asks for a
    // working, logged-in machine, so the hold alone is not enough — then it is a
    // normal start: one press, the password, Enter.
    goal: [
      { path: 'frozen', equals: false },
      { path: 'loggedIn', equals: true },
    ],
    solution: [
      { type: 'holdPower' },
      { type: 'pressPower' },
      { type: 'typePassword', text: 'sunflower' },
      { type: 'submitLogin' },
    ],
    parMoves: 4,
    hintAfter: 2,
    hints: [
      { after: 2, region: 'power', say: 'Nothing on the screen answers. This is the one time to HOLD the power button down until it goes off.', sayVn: 'Không gì trên màn hình phản hồi. Đây là lần duy nhất em GIỮ nút nguồn cho đến khi máy tắt.' },
      { after: 4, region: 'power', say: 'It is off now. Press the power button ONCE to start it again.', sayVn: 'Máy đã tắt. Bấm nút nguồn MỘT lần để bật lại.' },
      { after: 6, region: 'password', say: 'Log in: sunflower, then Enter.', sayVn: 'Đăng nhập: sunflower, rồi bấm Enter.' },
    ],
  },
];
