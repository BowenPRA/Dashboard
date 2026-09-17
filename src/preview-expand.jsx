// Dev-only harness for the two Y7 algebra engines, Expand It (EXPAND_GRID)
// and Undo It (FLOW_SOLVE), mounted with INLINE sample pools so the screens can
// be walked before any unit declares them. Entry point: preview-expand.html.
// `?task=EXPAND_GRID|FLOW_SOLVE` opens one straight away; `?done=e1,e2` resumes
// it part-way (those items count as finished); `?mono` mounts it with
// bilingual off. onComplete / onProgress are logged to the console. Not part of
// the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ExpandGrid from './tasks/ExpandGrid.jsx';
import FlowSolve from './tasks/FlowSolve.jsx';

const params = new URLSearchParams(window.location.search);
const SAVED = Object.fromEntries((params.get('done') || '').split(',').filter(Boolean).map((id) => [id, 1]));
const BILINGUAL = !params.has('mono');

const EXPAND_POOL = {
  title: 'Expand It',
  titleVn: 'Khai triển',
  intro: 'Every box is one multiplication: the number outside times one term inside.',
  introVn: 'Mỗi ô là một phép nhân: số bên ngoài nhân với một hạng tử bên trong.',
  levels: {
    1: { en: 'Every term', vn: 'Mọi hạng tử' },
    2: { en: 'The number first', vn: 'Số đứng trước' },
    3: { en: 'A minus inside', vn: 'Dấu trừ bên trong' },
    4: { en: 'A number times a letter', vn: 'Số nhân với chữ' },
    5: { en: 'Three terms', vn: 'Ba hạng tử' },
    6: { en: 'Expand and simplify', vn: 'Khai triển và rút gọn' },
    7: { en: 'Two brackets', vn: 'Hai dấu ngoặc' },
    8: { en: 'Work backwards', vn: 'Làm ngược lại' },
  },
  items: [
    { id: 'e1', level: 1, expr: '5(a + 3)' },
    { id: 'e2', level: 2, expr: '9(3 + y)' },
    { id: 'e3', level: 3, expr: '4(3 − c)' },
    { id: 'e4', level: 3, expr: '−3(x + 1)' },
    { id: 'e5', level: 4, expr: '5(2p + 3)' },
    { id: 'e6', level: 5, expr: '8(6 + 4w − 3g)' },
    {
      id: 'e7', level: 6, expr: '5(2x − 2) + x + 17',
      context: 'The perimeter of a shape: expand, then collect.',
      contextVn: 'Chu vi của một hình: khai triển, rồi gộp.',
    },
    { id: 'e8', level: 7, expr: '4(x + 4) + 7(x + 1)' },
    { id: 'e9', level: 7, expr: '2(x − 3) − 3(x + 1)' },
    { id: 'e10', level: 7, expr: 'x(x + 2)' },
    { id: 'e11', level: 8, kind: 'missing', expr: '4(2x + 3)', hide: ['outer'] },
    { id: 'e12', level: 8, kind: 'missing', expr: '5(2y − 7)', hide: ['inner:1'] },
  ],
};

const FLOW_POOL = {
  title: 'Undo It',
  titleVn: 'Làm ngược lại',
  levels: {
    1: { en: 'One step: + and −', vn: 'Một bước: + và −' },
    2: { en: 'One step: × and ÷', vn: 'Một bước: × và ÷' },
    3: { en: 'Either way round', vn: 'Viết theo chiều nào cũng được' },
    4: { en: 'I think of a number', vn: 'Tôi nghĩ ra một số' },
    5: { en: 'Two steps', vn: 'Hai bước' },
    6: { en: 'Brackets and stories', vn: 'Dấu ngoặc và bài toán có lời' },
    7: { en: 'Below zero', vn: 'Nhỏ hơn không' },
  },
  items: [
    { id: 'f1', level: 1, eq: 'x + 8 = 20' },
    { id: 'f2', level: 1, eq: 'y − 15 = 12' },
    { id: 'f3', level: 2, eq: 'n/4 = 5' },
    { id: 'f4', level: 2, eq: '6k = 42' },
    { id: 'f5', level: 3, eq: '35 = 5x' },
    { id: 'f6', level: 4, ops: [['*', 6], ['-', 4]], result: 32, letter: 'n' },
    { id: 'f7', level: 4, ops: [['+', 7]], result: 19 },
    { id: 'f8', level: 5, eq: '2a + 4 = 18' },
    { id: 'f9', level: 5, eq: 'x/4 − 3 = 2' },
    { id: 'f10', level: 6, eq: '3(x + 2) = 21' },
    {
      id: 'f11', level: 6, eq: '4n + 7 = 43',
      story: 'Mr Bowen buys 4 notebooks and a pen that costs 7 thousand dong. He pays 43 thousand dong.',
      storyVn: 'Thầy Bowen mua 4 quyển vở và một cây bút giá 7 nghìn đồng. Thầy trả tất cả 43 nghìn đồng.',
    },
    { id: 'f12', level: 7, eq: 'h + 30 = 26' },
  ],
};

const CASES = [
  ['EXPAND_GRID', 'Expand It · 12 items (grid, write, collect, work backwards)', ExpandGrid, EXPAND_POOL],
  ['FLOW_SOLVE', 'Undo It · 12 items (one step, two steps, think of a number, story, negative)', FlowSolve, FLOW_POOL],
];

function Harness() {
  const [open, setOpen] = useState(() => (CASES.some(([id]) => id === params.get('task')) ? params.get('task') : null));

  if (open) {
    const [id, , Comp, pool] = CASES.find(([c]) => c === open);
    return (
      <Comp
        pool={pool}
        savedData={SAVED}
        bilingual={BILINGUAL}
        onComplete={(score, blob, log) => { console.log(`[harness] ${id} complete`, score, blob, log); setOpen(null); }}
        onProgress={(score, blob, log) => console.log(`[harness] ${id} progress`, score, blob, log)}
        onQuit={() => { console.log(`[harness] ${id} quit`); setOpen(null); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Expand It / Undo It harness</h1>
      <p className="text-slate-500 font-bold mb-6">Inline sample pools, mounted without auth. Scores are logged to the console.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setOpen(id)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-orange-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-orange-500">{id}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__expandroot ||= createRoot(el));
root.render(<Harness />);
