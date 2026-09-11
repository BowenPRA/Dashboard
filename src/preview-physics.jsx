// Dev-only harness for PHYSICS/PHY_CIRC — Acellus Physics, Circular Motion &
// Gravity. The new screen worth opening directly is Isolate It (REARRANGE):
// change the subject of a formula move by move, convert the givens to SI,
// then substitute. Cases below open it at the items whose SHAPE is new.
//
// The real screens sit behind Supabase auth, so this mounts them from unit
// data — the same pattern as preview-inequality.jsx. Entry point:
// preview-physics.html. Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import Rearrange from './tasks/Rearrange';
import Workbook from './tasks/Workbook';
import Assessment from './tasks/Assessment';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';
import { DIAGRAMS } from './data/PHYSICS/PHY_CIRC/diagrams.js';

const TRACK = 'PHYSICS';
const UNIT = 'PHY_CIRC';

const CASES = [
  ['REARRANGE', 'Isolate It · from the top (F = mv²/r for m: two moves)'],
  ['REARRANGE', 'Isolate It · from c3, the mass that cancels', 2],
  ['REARRANGE', 'Isolate It · from c4, a bracket (T + mg)', 3],
  ['REARRANGE', 'Isolate It · from g1, the asteroid (10ⁿ answer)', 4],
  ['REARRANGE', 'Isolate It · from g3, square first', 6],
  ['REARRANGE', 'Isolate It · from g4, km/s in and km out', 7],
  ['REARRANGE', 'Isolate It · from g6, √ with 4π², hours out', 9],
  ['NOTES', 'Deck · Circular Motion & Gravity (24 slides)'],
  ['NOTES', 'Deck · from slide 4, the formula and its units card', 3],
  ['NOTES', 'Deck · from slide 6, units and the sort activity', 5],
  ['NOTES', 'Deck · from slide 10, the decision table and the order activity', 9],
  ['NOTES', 'Deck · from slide 13, the bucket at the top', 12],
  ['NOTES', 'Deck · from slide 22, the formula page', 21],
  ['WORKBOOK', 'Practice · 19 questions in 3 tiers'],
  ['ASSESSMENT', 'Quiz · 10 items, 20 minutes'],
  ['DIAGRAMS', 'Diagrams · every SVG on one page'],
];

const SCREENS = { NOTES: Notes, REARRANGE: Rearrange, WORKBOOK: Workbook, ASSESSMENT: Assessment };

function Gallery({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300">← Back</button>
      <div className="grid gap-6 lg:grid-cols-2">
        {Object.entries(DIAGRAMS).map(([key, svg]) => (
          <div key={key} className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4">
            <div className="text-[11px] font-black uppercase tracking-widest text-indigo-500 mb-2">{key}</div>
            <div className="text-slate-800 dark:text-slate-100" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Harness() {
  const [open, setOpen] = useState(null);

  if (open) {
    const [taskId, , from = 0] = open;
    if (taskId === 'DIAGRAMS') return <Gallery onBack={() => setOpen(null)} />;
    const unit = getTrack(TRACK).data[UNIT];
    const def = getTask(taskId);
    // `from` skips ahead so a later shape can be opened without working through
    // the earlier items. REARRANGE pools an object with an `items` array;
    // ASSESSMENT hands back an object with nothing to slice.
    const built = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const pool = Array.isArray(built) ? built.slice(from)
      : built?.items ? { ...built, items: built.items.slice(from) }
        : built;
    const Screen = SCREENS[taskId];
    return (
      <Screen
        pool={pool}
        slides={pool}
        unit={unit}
        onComplete={(score, blob, meta) => { console.log('completed with', score, blob, meta); setOpen(null); }}
        onQuit={() => setOpen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Acellus Physics harness</h1>
      <p className="text-slate-500 font-bold mb-6">PHYSICS · PHY_CIRC, mounted without auth.</p>

      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map((c) => (
          <button
            key={c[1]}
            onClick={() => setOpen(c)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-indigo-500">{TRACK} · {c[0]}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{c[1]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Cache the root or HMR logs a duplicate-createRoot error on every edit.
const el = document.getElementById('root');
const root = (window.__physroot ||= createRoot(el));
root.render(<Harness />);
