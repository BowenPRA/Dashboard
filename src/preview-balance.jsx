// Dev-only harness for MATH_1C — the fraction-equation unit. The Balance task
// is the one that changed most (grouped fraction rendering, the LCD chip), so
// it opens straight onto the deck.
//
// The real screens sit behind Supabase auth, so this mounts them from unit data
// — the same pattern as preview-vectors.jsx. Entry point: preview-balance.html.
// Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import EquationBalance from './tasks/EquationBalance';
import Workbook from './tasks/Workbook';
import Assessment from './tasks/Assessment';
import Diagrams from './tasks/Diagrams';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const CASES = [
  ['MATH_1C', 'BALANCE', 'Balance · all 20 equations from the top'],
  ['MATH_1C', 'BALANCE', 'Balance · from e4, a fraction beside a whole number', 3],
  ['MATH_1C', 'BALANCE', 'Balance · from e6, (x + 4)/3 = 5 onwards', 5],
  ['MATH_1C', 'BALANCE', 'Balance · from e11, (x - 3)/2 = (2x + 1)/3', 10],
  ['MATH_1C', 'NOTES', 'Deck · Equations with Fractions (11 slides)'],
  ['MATH_1C', 'WORKBOOK', 'Practice · 20 questions in 3 tiers'],
  ['MATH_1C', 'DIAGRAMS', 'Source Analysis · 3 written items'],
  ['MATH_1C', 'ASSESSMENT', 'Assessment · 12 items, 30 minutes'],
  ['MATH_1B', 'BALANCE', 'Balance (1B) · regression: no fractions anywhere'],
];

const SCREENS = {
  NOTES: Notes, BALANCE: EquationBalance, WORKBOOK: Workbook,
  ASSESSMENT: Assessment, DIAGRAMS: Diagrams,
};

function Harness() {
  const [open, setOpen] = useState(null);

  if (open) {
    const [unitId, taskId, , from = 0] = open;
    const unit = getTrack('GED_MATH').data[unitId];
    const def = getTask(taskId);
    // `from` skips ahead in the deck so the fraction shapes can be opened
    // without solving the warm-ups first. Not every task pools an array —
    // ASSESSMENT and DIAGRAMS hand back an object — so only slice what slices.
    const built = def.buildPool(unit, { track: 'GED_MATH', unitId });
    const pool = Array.isArray(built) ? built.slice(from) : built;
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
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Fractions harness</h1>
      <p className="text-slate-500 font-bold mb-6">GED_MATH · MATH_1C, mounted without auth.</p>

      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map((c) => (
          <button
            key={c[2]}
            onClick={() => setOpen(c)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-violet-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-violet-500">{c[0]} · {c[1]}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{c[2]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
