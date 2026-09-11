// Dev-only harness for ACELLUS/ALG_INEQ — the inequalities unit. Two things
// are new and worth opening directly: the Balance task now carries a RELATION
// (the beam tilts, and swings over when you divide by a negative), and the
// Number Line task is a whole new screen.
//
// The real screens sit behind Supabase auth, so this mounts them from unit data
// — the same pattern as preview-balance.jsx. Entry point: preview-inequality.html.
// Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import EquationBalance from './tasks/EquationBalance';
import IntervalLine from './tasks/IntervalLine';
import Workbook from './tasks/Workbook';
import Assessment from './tasks/Assessment';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const TRACK = 'ACELLUS';
const UNIT = 'ALG_INEQ';

const CASES = [
  ['BALANCE', 'Balance · from the top (one-step, no flip)'],
  ['BALANCE', 'Balance · from i6, the first flip', 5],
  ['BALANCE', 'Balance · from i10, variable on both sides', 9],
  ['INTERVAL', 'Number Line · from the top (one ray)'],
  ['INTERVAL', 'Number Line · from n4, two endpoints', 3],
  ['INTERVAL', 'Number Line · from n7, a union of two pieces', 6],
  ['INTERVAL', 'Number Line · from n9, absolute value', 8],
  ['NOTES', 'Deck · Inequalities and Intervals (18 slides)'],
  ['WORKBOOK', 'Practice · 20 questions in 3 tiers'],
  ['ASSESSMENT', 'Quiz · 12 items, 25 minutes'],
];

const SCREENS = {
  NOTES: Notes, BALANCE: EquationBalance, INTERVAL: IntervalLine,
  WORKBOOK: Workbook, ASSESSMENT: Assessment,
};

function Harness() {
  const [open, setOpen] = useState(null);

  if (open) {
    const [taskId, , from = 0] = open;
    const unit = getTrack(TRACK).data[UNIT];
    const def = getTask(taskId);
    // `from` skips ahead so a later shape can be opened without working through
    // the warm-ups. Not every task pools an array — ASSESSMENT hands back an
    // object — so only slice what slices.
    const built = def.buildPool(unit, { track: TRACK, unitId: UNIT });
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
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Inequalities harness</h1>
      <p className="text-slate-500 font-bold mb-6">ACELLUS · ALG_INEQ, mounted without auth.</p>

      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map((c) => (
          <button
            key={c[1]}
            onClick={() => setOpen(c)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-violet-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-violet-500">{TRACK} · {c[0]}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{c[1]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Cache the root or HMR logs a duplicate-createRoot error on every edit.
const el = document.getElementById('root');
const root = (window.__ineqroot ||= createRoot(el));
root.render(<Harness />);
