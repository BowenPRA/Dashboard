// Dev-only harness for the three lines units (LINE_1A–1C), the Line Lab task,
// the `line` activity and the SlopeLab widget.
//
// The real screens sit behind Supabase auth, so this mounts them straight from
// unit data — the same pattern as preview-quad.jsx. Entry point:
// preview-lines.html. Deep links: ?unit=LINE_1A&open=LINE_LAB&item=3 opens a
// task (item is 1-based, Line Lab only); ?unit=LINE_1B&open=NOTES&slide=12
// opens the deck at a slide. Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import LineLab from './tasks/LineLab';
import Workbook from './tasks/Workbook';
import Assessment from './tasks/Assessment';
import SlopeLab from './components/math/SlopeLab';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const UNITS = ['LINE_1A', 'LINE_1B', 'LINE_1C'];
const TASKS = [['NOTES', 'Deck'], ['LINE_LAB', 'Line Lab'], ['WORKBOOK', 'Practice'], ['ASSESSMENT', 'Quiz']];
const SCREENS = { NOTES: Notes, LINE_LAB: LineLab, WORKBOOK: Workbook, ASSESSMENT: Assessment };

const params = new URLSearchParams(window.location.search);

function Harness() {
  const [open, setOpen] = useState(() => (params.get('unit') && params.get('open') ? [params.get('unit'), params.get('open')] : null));
  const [lang, setLang] = useState('en');

  if (open) {
    const [unitId, taskId] = open;
    const unit = getTrack('AOPS').data[unitId];
    if (!unit) return <div className="p-8 font-bold text-rose-600">No unit {unitId}</div>;
    const def = getTask(taskId);
    let pool = def.buildPool(unit, { track: 'AOPS', unitId });
    if (taskId === 'LINE_LAB' && params.get('item')) {
      const n = Number(params.get('item')) - 1;
      pool = { ...pool, items: pool.items.slice(n, n + 1) };
    }
    const Screen = SCREENS[taskId];
    const saved = taskId === 'NOTES' && params.get('slide') ? { v: 2, slide: Number(params.get('slide')) - 1, total: pool.length, checks: {} } : null;
    return (
      <Screen
        pool={pool}
        slides={pool}
        unit={unit}
        savedData={saved}
        bilingual
        onComplete={(score, _a, extra) => { console.log('completed with', score, extra); setOpen(null); }}
        onProgress={() => {}}
        onQuit={() => setOpen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Lines harness</h1>
      <p className="text-slate-500 font-bold mb-6">AOPS · LINE_1A–1C, mounted without auth.</p>

      {UNITS.map((unitId) => (
        <div key={unitId} className="mb-6">
          <div className="text-[11px] font-black uppercase tracking-widest text-fuchsia-500 mb-2">{unitId} · {getTrack('AOPS').data[unitId]?.meta.title || '(not built)'}</div>
          <div className="grid gap-3 sm:grid-cols-4 max-w-4xl">
            {TASKS.map(([taskId, label]) => (
              <button key={taskId} disabled={!getTrack('AOPS').data[unitId]}
                onClick={() => setOpen([unitId, taskId])}
                className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-fuchsia-400 disabled:opacity-40">
                <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3 mb-3 mt-10">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">SlopeLab</h2>
        <button onClick={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))}
          className="px-3 py-1 rounded-lg bg-slate-700 text-white font-black text-xs uppercase tracking-widest">{lang}</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[{ show: 'm', mStart: '1/2' }, { show: 'b', mStart: '2', bStart: -1 }, { show: 'mb', mStart: '-2/3', bStart: 3 }].map((p) => (
          <div key={p.show} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3 h-[560px]">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{p.show}</div>
            <div className="h-[500px]"><SlopeLab {...p} lang={lang} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
