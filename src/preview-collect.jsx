// Dev-only harness for the two Year 7 algebra screens — Collect It
// (COLLECT_TERMS) and Algebra Pyramids (ALG_PYRAMID) — mounted with INLINE
// sample pools, so they can be checked without Supabase auth and before any
// unit declares them. Entry point: preview-collect.html. `?task=collect`,
// `?task=resume` or `?task=pyramids` opens one straight away. onComplete and
// onProgress are logged to the console. Not part of the production build.
import { useState, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { checkCollectItems } from './utils/algebra';
import { checkPyramidConfig } from './utils/pyramid';

const CollectTerms = lazy(() => import('./tasks/CollectTerms.jsx'));
const AlgebraPyramids = lazy(() => import('./tasks/AlgebraPyramids.jsx'));

// Every level of the suggested ladder, and every trap the screen names.
const COLLECT_POOL = {
  title: 'Collect It',
  titleVn: 'Gộp hạng tử',
  intro: 'Find the like terms, move them together with their signs, then collect.',
  introVn: 'Tìm các hạng tử đồng dạng, chuyển chúng lại gần nhau cùng với dấu, rồi gộp lại.',
  levels: {
    1: { en: 'One kind', vn: 'Một loại' },
    2: { en: 'The invisible 1', vn: 'Số 1 vô hình' },
    3: { en: 'Two kinds', vn: 'Hai loại' },
    4: { en: 'Keep the sign', vn: 'Giữ nguyên dấu' },
    5: { en: 'Tricky kinds', vn: 'Các loại dễ nhầm' },
    6: { en: 'Lengths and perimeters', vn: 'Độ dài và chu vi' },
  },
  items: [
    { id: 'c1', level: 1, expr: '2b + 3b' },                          // the plain case
    { id: 'c2', level: 2, expr: 'x + 4x' },                           // invisible 1 (type 4x → named)
    { id: 'c3', level: 2, expr: '8s − s' },                           // the letter vanishing (type 7 → named)
    { id: 'c4', level: 3, expr: '3a + 2b + 4a + b' },                 // two kinds; 7ab → unlike
    { id: 'c5', level: 3, expr: '4a + 3b' },                          // no like terms → Decide
    { id: 'c6', level: 4, expr: '7x + 5y − 3x + y' },                 // sign left behind (10x) + invisible 1 (5y)
    { id: 'c7', level: 4, expr: '5m − 2 + m' },                       // a negative total: "6m + −2" is a form nudge
    { id: 'c8', level: 5, expr: '3ab + 2 + 4ba − 1' },                // ab = ba; numbers are a kind
    { id: 'c9', level: 5, expr: 'x² + 3x + 2x^2 − x' },               // x vs x² baskets; x + x = x² named
    { id: 'c10', level: 5, expr: '6p + 5 + 2q' },                     // a number and letters, nothing alike → Decide
    {
      id: 'c11', level: 6, expr: '2x + 1 + x + 2x + 1 + x',
      context: 'The perimeter of a rectangle with sides 2x + 1 and x.',
      contextVn: 'Chu vi của hình chữ nhật có các cạnh 2x + 1 và x.',
    },
  ],
};

const PYRAMID_POOL = {
  title: 'Algebra Pyramids',
  titleVn: 'Kim tự tháp đại số',
  modes: ['up', 'down', 'brackets', 'solve'],
  rounds: 8,
};

const CASES = [
  ['collect', 'COLLECT_TERMS', `Collect It · ${COLLECT_POOL.items.length} items, levels 1–6`],
  ['resume', 'COLLECT_TERMS', 'Collect It · resumed with c1–c3 already done'],
  ['pyramids', 'ALG_PYRAMID', 'Pyramids · up, down, brackets, solve · 8 rounds'],
];

const log = (name, kind) => (score, blob, meta) => console.log(`[harness] ${name} ${kind}`, score, blob, meta);

function Harness() {
  const [open, setOpen] = useState(() => new URLSearchParams(window.location.search).get('task'));
  const [run, setRun] = useState(0);
  const back = () => { setOpen(null); setRun((r) => r + 1); };
  const collectProblems = checkCollectItems(COLLECT_POOL.items, { levels: COLLECT_POOL.levels });
  const pyramidProblems = checkPyramidConfig(PYRAMID_POOL);

  if (open === 'collect' || open === 'resume') {
    const saved = open === 'resume' ? { c1: 1, c2: 0.5, c3: 1 } : {};
    return (
      <Suspense fallback={<div className="p-8 font-black">Loading Collect It…</div>}>
        <CollectTerms
          key={`${open}-${run}`}
          pool={COLLECT_POOL}
          savedData={saved}
          bilingual
          onComplete={(...a) => { log('COLLECT_TERMS', 'complete')(...a); back(); }}
          onProgress={log('COLLECT_TERMS', 'progress')}
          onQuit={back}
        />
      </Suspense>
    );
  }
  if (open === 'pyramids') {
    return (
      <Suspense fallback={<div className="p-8 font-black">Loading Pyramids…</div>}>
        <AlgebraPyramids
          key={`${open}-${run}`}
          pool={PYRAMID_POOL}
          bilingual
          onComplete={(...a) => { log('ALG_PYRAMID', 'complete')(...a); back(); }}
          onQuit={back}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6 sm:p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Collect It + Pyramids harness</h1>
      <p className="text-slate-500 font-bold mb-6">Inline sample pools, mounted without auth. Results are logged to the console.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map(([key, taskId, label]) => (
          <button
            key={key}
            onClick={() => setOpen(key)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-violet-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-violet-500">{taskId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
      <div className="mt-6 max-w-3xl rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-4 text-sm font-bold">
        <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Validator on the sample pools</div>
        {[...collectProblems, ...pyramidProblems].length === 0
          ? <div className="text-[#3e7500]">checkCollectItems and checkPyramidConfig: no problems.</div>
          : [...collectProblems, ...pyramidProblems].map((p) => <div key={p} className="text-rose-600">{p}</div>)}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__collectroot ||= createRoot(el));
root.render(<Harness />);
