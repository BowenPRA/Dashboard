// Dev-only bench for the simulator skins and the Typing Gym, mounted without a
// unit so an engine can be worked on before any unit uses it.
// Entry point: preview-sim.html. Not part of the production build.
//
//   ?skin=desktop | browser | files   — the Try It task on a few sample jobs
//   ?demo=desktop | browser | files   — the AppSim notes widget, playing a script
//   ?type=1                           — the Typing Gym
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppSim from './tasks/AppSim.jsx';
import AppSimDemo from './tasks/appsim/AppSimDemo.jsx';
import TypeGym from './tasks/TypeGym.jsx';

const PARAMS = new URLSearchParams(window.location.search);

const JOBS = {
  desktop: [
    {
      id: 'boot', skin: 'desktop',
      brief: 'Turn the computer on and log in. Your password is sunflower.',
      briefVn: 'Hãy bật máy và đăng nhập. Mật khẩu của em là sunflower.',
      initial: { power: 'off' },
      goal: [{ path: 'loggedIn', equals: true }],
      solution: [{ type: 'pressPower' }, { type: 'typePassword', text: 'sunflower' }, { type: 'submitLogin' }],
      parMoves: 3, hintAfter: 3,
      hints: [{ after: 3, region: 'power', say: 'The power button is on the case, under the screen.', sayVn: 'Nút nguồn nằm trên thân máy, dưới màn hình.' }],
    },
    {
      id: 'save-then-stop', skin: 'desktop',
      brief: 'Your story is not saved. Save it, then shut the computer down properly.',
      briefVn: 'Câu chuyện của em chưa được lưu. Hãy lưu lại, rồi tắt máy đúng cách.',
      initial: { windows: [{ app: 'notes', title: 'story', saved: false }, { app: 'paint', title: 'Paint' }] },
      goal: [{ path: 'power', equals: 'off' }, { path: 'lostCount', equals: 0 }, { path: 'forced', equals: 0 }],
      solution: [{ type: 'save', title: 'story' }, { type: 'openMenu' }, { type: 'openPowerMenu' }, { type: 'shutdown' }],
      parMoves: 4, hintAfter: 3,
    },
    {
      id: 'frozen', skin: 'desktop',
      brief: 'The computer has frozen. Nothing answers. Get it working again and log back in (password: sunflower).',
      briefVn: 'Máy bị treo. Không có gì phản hồi. Hãy làm cho máy chạy lại và đăng nhập (mật khẩu: sunflower).',
      initial: { frozen: true, windows: [{ app: 'paint', title: 'Paint' }] },
      goal: [{ path: 'loggedIn', equals: true }, { path: 'frozen', equals: false }],
      solution: [{ type: 'holdPower' }, { type: 'pressPower' }, { type: 'typePassword', text: 'sunflower' }, { type: 'submitLogin' }],
      parMoves: 4, hintAfter: 2,
    },
  ],
  // T2: things on the desktop — right-click, drag, rename.
  desktop2: [
    {
      id: 'bin-it', skin: 'desktop',
      brief: 'Put the old drawing in the Recycle Bin.',
      briefVn: 'Hãy bỏ bức vẽ cũ vào Thùng rác.',
      initial: { items: [{ name: 'old drawing.png' }, { name: 'Holiday', kind: 'folder' }, { name: 'beach.jpg' }, { name: 'boat.jpg' }] },
      goal: [{ path: 'at.bin', contains: 'old drawing.png' }],
      solution: [{ type: 'drag', name: 'old drawing.png', to: 'bin' }],
      parMoves: 2, hintAfter: 3,
    },
    {
      id: 'new-folder', skin: 'desktop',
      brief: 'Right-click the desktop and make a folder called My Games.',
      briefVn: 'Hãy bấm chuột phải vào màn hình nền và tạo một thư mục tên My Games.',
      initial: { items: [{ name: 'Holiday', kind: 'folder' }] },
      goal: [{ path: 'folders', contains: 'My Games' }],
      solution: [{ type: 'openContext', target: 'desktop' }, { type: 'contextChoose', choice: 'newFolder' }, { type: 'typeName', text: 'My Games' }, { type: 'commitName' }],
      parMoves: 4, hintAfter: 3,
    },
    {
      id: 'photos', skin: 'desktop',
      brief: 'Drag both photos into the Holiday folder.',
      briefVn: 'Hãy kéo cả hai tấm ảnh vào thư mục Holiday.',
      initial: { items: [{ name: 'Holiday', kind: 'folder' }, { name: 'beach.jpg' }, { name: 'boat.jpg' }] },
      goal: [{ path: 'at.Holiday', contains: 'beach.jpg' }, { path: 'at.Holiday', contains: 'boat.jpg' }],
      solution: [{ type: 'drag', name: 'beach.jpg', to: 'Holiday' }, { type: 'drag', name: 'boat.jpg', to: 'Holiday' }],
      parMoves: 2, hintAfter: 3,
    },
  ],
  browser: [
    {
      id: 'go-there', skin: 'browser',
      brief: 'Your teacher wrote www.citylibrary.org on the board. Go there.',
      briefVn: 'Cô giáo viết www.citylibrary.org lên bảng. Hãy vào trang đó.',
      initial: { tabs: ['www.schoolsite.org'] },
      goal: [{ path: 'url', equals: 'www.citylibrary.org' }],
      solution: [{ type: 'typeAddress', text: 'www.citylibrary.org' }, { type: 'go' }],
      parMoves: 2, hintAfter: 3,
    },
    {
      id: 'download', skin: 'browser',
      brief: 'Download the reading list, then show where it went.',
      briefVn: 'Hãy tải danh sách sách đọc về, rồi cho thấy nó đã đi đâu.',
      initial: { tabs: [{ history: ['www.schoolsite.org', 'www.schoolsite.org/library'] }] },
      goal: [{ path: 'at.Downloads', contains: 'reading-list.pdf' }, { path: 'shownInFolder', equals: true }],
      solution: [{ type: 'download', file: 'reading-list.pdf' }, { type: 'showInFolder' }],
      parMoves: 2, hintAfter: 3,
    },
  ],
  files: [
    {
      id: 'find-it', skin: 'files',
      brief: 'You saved "maths homework week 3" somewhere. Find it and put it in Documents.',
      briefVn: 'Em đã lưu "maths homework week 3" ở đâu đó. Hãy tìm và để nó vào Documents.',
      initial: { cwd: 'Documents', files: [{ name: 'maths homework week 3.docx', in: 'Desktop' }, { name: 'class-photo.jpg', in: 'Downloads' }] },
      goal: [{ path: 'at.Documents', contains: 'maths homework week 3.docx' }],
      solution: [{ type: 'openFolder', folder: 'Desktop' }, { type: 'move', name: 'maths homework week 3.docx', to: 'Documents' }],
      parMoves: 3, hintAfter: 3,
    },
  ],
};

const DEMOS = {
  desktop: {
    skin: 'desktop',
    initial: { windows: [{ app: 'notes', title: 'story', saved: false }] },
    script: [
      { type: 'save', title: 'story', say: 'Save first.', sayVn: 'Lưu trước.' },
      { type: 'openMenu', say: 'Open the menu.', sayVn: 'Mở trình đơn.' },
      { type: 'openPowerMenu', say: 'The power button in the menu.', sayVn: 'Nút nguồn trong trình đơn.' },
      { type: 'shutdown', say: 'Shut down.', sayVn: 'Tắt máy.' },
    ],
  },
  desktop2: {
    skin: 'desktop',
    initial: { items: [{ name: 'old drawing.png' }, { name: 'Holiday', kind: 'folder' }, { name: 'beach.jpg' }] },
    script: [
      { type: 'openContext', target: 'item:old drawing.png', say: 'Right-click the old drawing.', sayVn: 'Bấm chuột phải.' },
      { type: 'contextChoose', choice: 'delete', say: 'Delete.', sayVn: 'Xoá.' },
      { type: 'openContext', target: 'desktop', say: 'Right-click the desktop.', sayVn: 'Bấm chuột phải vào nền.' },
      { type: 'contextChoose', choice: 'newFolder', say: 'New folder.', sayVn: 'Thư mục mới.' },
      { type: 'typeName', text: 'My Games', say: 'Type a name.', sayVn: 'Gõ tên.' },
      { type: 'commitName', say: 'Enter.', sayVn: 'Enter.' },
      { type: 'drag', name: 'beach.jpg', to: 'Holiday', say: 'Drag the photo in.', sayVn: 'Kéo ảnh vào.' },
      { type: 'openItem', name: 'Holiday', say: 'Double-click the folder.', sayVn: 'Bấm đúp.' },
    ],
  },
  browser: {
    skin: 'browser',
    initial: { tabs: ['www.schoolsite.org'] },
    script: [
      { type: 'typeAddress', text: 'www.citylibrary.org', say: 'Click the address bar and type.', sayVn: 'Bấm vào thanh địa chỉ và gõ.' },
      { type: 'go', say: 'Press Enter.', sayVn: 'Bấm Enter.' },
      { type: 'newTab', say: 'A new tab.', sayVn: 'Một thẻ mới.' },
    ],
  },
  files: {
    skin: 'files',
    initial: { cwd: 'Documents', files: [{ name: 'homework.docx', in: 'Recycle Bin' }] },
    script: [
      { type: 'openFolder', folder: 'Recycle Bin', say: 'Open the bin.', sayVn: 'Mở thùng rác.' },
      { type: 'restore', name: 'homework.docx', say: 'Put it back.', sayVn: 'Lấy lại.' },
    ],
  },
};

const TYPE = {
  title: 'Typing Gym', titleVn: 'Phòng tập gõ phím',
  modes: ['home', 'words', 'addresses'], rounds: 6,
  words: ['desktop', 'taskbar', 'icon', 'window', 'password', 'sleep'],
  addresses: ['www.schoolsite.org', 'www.citylibrary.org/kids'],
  target: { wpm: 8, accuracy: 0.9 },
};

function Bench() {
  const [log, setLog] = useState('');
  const done = (s, _b, l) => setLog(`complete: ${s}/10 ${JSON.stringify(l)}`);
  const quit = () => setLog('quit');
  const skin = PARAMS.get('skin');
  const demo = PARAMS.get('demo');
  if (PARAMS.get('type')) return <TypeGym pool={TYPE} onComplete={done} onQuit={quit} />;
  if (demo && DEMOS[demo]) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-3xl mx-auto h-[34rem] rounded-2xl bg-white p-3"><AppSimDemo {...DEMOS[demo]} /></div>
      </div>
    );
  }
  return (
    <>
      <AppSim pool={JOBS[skin] || JOBS.desktop} onComplete={done} onQuit={quit} />
      {log && <pre id="bench-log" className="fixed bottom-0 left-0 right-0 bg-black text-green-300 text-xs p-2">{log}</pre>}
    </>
  );
}

const el = document.getElementById('root');
const root = (window.__simroot ||= createRoot(el));
root.render(<Suspense fallback={null}><Bench /></Suspense>);
