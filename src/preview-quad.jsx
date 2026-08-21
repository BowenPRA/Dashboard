// Dev-only harness for the two quadratics units and the Graph It task.
//
// The real screens sit behind Supabase auth, so this mounts the Notes deck, the
// Graph It task and the ParabolaLab widget straight from unit data — the same
// pattern as preview-arcade.jsx. Entry point: preview-quad.html. Not part of
// the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import GraphPlot from './tasks/GraphPlot';
import Workbook from './tasks/Workbook';
import ParabolaLab from './components/math/ParabolaLab';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const CASES = [
  ['QUAD_1A', 'NOTES', 'Deck · Parabolas & the Vertex Form'],
  ['QUAD_1B', 'NOTES', 'Deck · Zeros & the Factored Form'],
  ['QUAD_1A', 'GRAPH', 'Graph It · vertex + a point'],
  ['QUAD_1B', 'GRAPH', 'Graph It · zeros, one zero, no zeros'],
  ['QUAD_1A', 'WORKBOOK', 'Practice · 13 questions'],
  ['QUAD_1B', 'WORKBOOK', 'Practice · 13 questions'],
];

const SCREENS = { NOTES: Notes, GRAPH: GraphPlot, WORKBOOK: Workbook };

function Harness() {
  const [open, setOpen] = useState(null);
  const [lang, setLang] = useState('en');

  if (open) {
    const [unitId, taskId] = open;
    const unit = getTrack('AOPS').data[unitId];
    const def = getTask(taskId);
    const pool = def.buildPool(unit, { track: 'AOPS', unitId });
    const Screen = SCREENS[taskId];
    return (
      <Screen
        pool={pool}
        slides={pool}
        onComplete={(score) => { console.log('completed with', score); setOpen(null); }}
        onQuit={() => setOpen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Quadratics harness</h1>
      <p className="text-slate-500 font-bold mb-6">AOPS · QUAD_1A and QUAD_1B, mounted without auth.</p>

      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl mb-10">
        {CASES.map(([unitId, taskId, label]) => (
          <button
            key={`${unitId}-${taskId}`}
            onClick={() => setOpen([unitId, taskId])}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-fuchsia-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-fuchsia-500">{unitId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">ParabolaLab, all four configurations</h2>
        <button
          onClick={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))}
          className="px-3 py-1 rounded-lg bg-slate-700 text-white font-black text-xs uppercase tracking-widest">
          {lang}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { show: 'k', params: { show: 'k' } },
          { show: 'a', params: { show: 'a' } },
          { show: 'h', params: { show: 'h' } },
          { show: 'k + zeros', params: { show: 'k', kStart: 2, zeros: true } },
          { show: 'ahk', params: { show: 'ahk' } },
        ].map((cfg) => (
          <div key={cfg.show} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3 h-[520px]">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{cfg.show}</div>
            <div className="h-[460px]">
              <ParabolaLab {...cfg.params} lang={lang} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
