// Dev-only harness for the COORD_SCI track: the U04_1 tasks mounted straight
// from unit data, so they can be checked without Supabase auth. Entry point:
// preview-coordsci.html. Not part of the production build.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask } from './tasks/taskRegistry';

const TRACK = 'COORD_SCI';
const UNIT = new URLSearchParams(window.location.search).get('unit') || 'U04_1';

const CASES = [
  ['NOTES', 'Notes · 18 slides, 5 checks'],
  ['WORD_REC', 'Vocab · 11 key words'],
  ['FORMULA_WRITE', 'Formulae · 6 name→formula builds'],
  ['SYMBOL_EQ', 'Equations · 6 word→symbol builds'],
  ['WORKBOOK', 'Practice · 12 questions in 3 tiers'],
  ['SHORT_ANSWERS', 'Questions · 5 reasoning items'],
  ['DIAGRAMS', 'Source Analysis · copper sulfate cell'],
  ['ASSESSMENT', 'Quiz · 8 MCQ, 10 minutes'],
  ['GAMES', 'Arcade · tower defense'],
];

function Harness() {
  const [open, setOpen] = useState(null);
  const unit = getTrack(TRACK).data[UNIT];

  if (open) {
    const def = getTask(open);
    const resolved = resolveTask({ id: open });
    const pool = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const ctx = {
      pool, unit, unitId: UNIT, track: TRACK,
      scores: {}, savedData: {}, strikes: 0, maxXP: resolved.maxXP,
      onComplete: (score, _b, log) => { console.log(`[harness] ${open} complete`, score, log); setOpen(null); },
      onProgress: (d) => console.log(`[harness] ${open} progress`, d),
      onQuit: () => setOpen(null),
      onAddStrike: () => console.log(`[harness] ${open} strike`),
    };
    const Comp = def.component;
    return (
      <Suspense fallback={<div className="p-8 font-black">Loading {open}…</div>}>
        <Comp {...def.props(ctx)} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Coordinated Science harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map(([taskId, label]) => (
          <button
            key={taskId}
            onClick={() => setOpen(taskId)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-teal-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-teal-500">{taskId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__coordroot ||= createRoot(el));
root.render(<Harness />);
