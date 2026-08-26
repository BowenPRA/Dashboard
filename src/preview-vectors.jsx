// Dev-only harness for the PHYSICS track: the FORCE_1A deck, the Vectors task,
// the workbook, and the VectorLab widget on its own.
//
// The real screens sit behind Supabase auth, so this mounts them straight from
// unit data — the same pattern as preview-quad.jsx. Entry point:
// preview-vectors.html. Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import VectorAdd from './tasks/VectorAdd';
import Workbook from './tasks/Workbook';
import Assessment from './tasks/Assessment';
import VectorLab from './components/math/VectorLab';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const CASES = [
  ['FORCE_1A', 'NOTES', 'Deck · Adding Force Vectors (21 slides)'],
  ['FORCE_1A', 'VECTOR_ADD', 'Vectors · 3 problems, 8 boxes each'],
  ['FORCE_1A', 'WORKBOOK', 'Practice · 14 questions in 3 tiers'],
  ['FORCE_1A', 'ASSESSMENT', 'Assessment · 10 MCQ, 20 minutes'],
];

const SCREENS = { NOTES: Notes, VECTOR_ADD: VectorAdd, WORKBOOK: Workbook, ASSESSMENT: Assessment };

function Harness() {
  const [open, setOpen] = useState(null);
  const [lang, setLang] = useState('en');

  if (open) {
    const [unitId, taskId] = open;
    const unit = getTrack('PHYSICS').data[unitId];
    const def = getTask(taskId);
    const pool = def.buildPool(unit, { track: 'PHYSICS', unitId });
    const Screen = SCREENS[taskId];
    return (
      <Screen
        pool={pool}
        slides={pool}
        unit={unit}
        onComplete={(score) => { console.log('completed with', score); setOpen(null); }}
        onQuit={() => setOpen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Physics harness</h1>
      <p className="text-slate-500 font-bold mb-6">PHYSICS · FORCE_1A, mounted without auth.</p>

      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl mb-10">
        {CASES.map(([unitId, taskId, label]) => (
          <button
            key={`${unitId}-${taskId}`}
            onClick={() => setOpen([unitId, taskId])}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-indigo-500">{taskId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">VectorLab, three configurations</h2>
        <button
          onClick={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))}
          className="px-3 py-1 rounded-lg bg-slate-700 text-white font-black text-xs uppercase tracking-widest">
          {lang}
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          { name: 'deck default (chain)', params: { a: { mag: 8, angle: 0 }, b: { mag: 6, angle: 90 }, show: 'chain', span: 16 } },
          { name: 'components on', params: { a: { mag: 10, angle: 35 }, b: { mag: 7, angle: 130 }, show: 'chain parts', span: 16 } },
          { name: 'parallelogram, no presets', params: { a: { mag: 5, angle: 20 }, b: { mag: 4, angle: 80 }, show: 'para chain', span: 10, presets: false } },
        ].map((cfg) => (
          <div key={cfg.name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3 h-[620px]">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{cfg.name}</div>
            <div className="h-[560px]">
              <VectorLab {...cfg.params} lang={lang} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
