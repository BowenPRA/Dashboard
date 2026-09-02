// Dev-only harness for the ADD_MATH track: the AM_3A tasks mounted straight from
// unit data, so they can be checked without Supabase auth. Entry point:
// preview-addmath.html. Not part of the production build.
//
// The extra "DIAGRAMS" case is not a task — it lays every SVG in the unit's
// diagrams.js on one page, which is the only practical way to check curve
// clipping and label placement after an edit.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask } from './tasks/taskRegistry';
import { DIAGRAMS } from './data/ADD_MATH/AM_3A/diagrams.js';

const params = new URLSearchParams(window.location.search);
const TRACK = 'ADD_MATH';
const UNIT = params.get('unit') || 'AM_3A';

// `?done=pd1,pd2` seeds savedData so a task resumes part-way through — the only
// practical way to reach the eighth long division without working the first
// seven by hand.
const SAVED = Object.fromEntries((params.get('done') || '').split(',').filter(Boolean).map((id) => [id, 1]));

const CASES = [
  ['NOTES', 'Notes · 24 slides, 10 checks'],
  ['WORD_REC', 'Vocab · 14 key words'],
  ['POLY_DIV', 'Long Division · 8 divisions, 3 with remainders'],
  ['WORKBOOK', 'Practice · Exercise 3.1, 12 questions'],
  ['WORKBOOK_B', 'Book Problems · Exercise 3.3, 12 questions'],
  ['ASSESSMENT', 'Quiz · 10 MCQ, 12 minutes'],
  ['GAMES', 'Arcade · The Factor Works'],
];

function Gallery({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">
        ← Back
      </button>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(DIAGRAMS).map(([name, svg]) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-cyan-600 mb-2">{name}</div>
            <div className="w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Harness() {
  const [open, setOpen] = useState(null);
  const unit = getTrack(TRACK).data[UNIT];

  if (open === 'DIAGRAMS') return <Gallery onBack={() => setOpen(null)} />;

  if (open) {
    const def = getTask(open);
    const resolved = resolveTask({ id: open });
    const pool = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const ctx = {
      pool, unit, unitId: UNIT, track: TRACK,
      scores: {}, savedData: SAVED, strikes: 0, maxXP: resolved.maxXP,
      onComplete: (score, _b, log) => { console.log(`[harness] ${open} complete`, score, log); setOpen(null); },
      onProgress: (score, _b, log) => console.log(`[harness] ${open} progress`, score, log),
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
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Additional Mathematics harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {[...CASES, ['DIAGRAMS', 'Every SVG in this unit, on one page']].map(([taskId, label]) => (
          <button
            key={taskId}
            onClick={() => setOpen(taskId)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-cyan-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-cyan-500">{taskId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__addmathroot ||= createRoot(el));
root.render(<Harness />);
