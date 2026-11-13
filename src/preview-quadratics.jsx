// Dev-only harness for ACELLUS/ALG_QUAD — solving quadratics. Mounts the three
// new engines (Factor It, Formula, Quad Solver), the deck and the quiz from
// unit data without auth, the same pattern as preview-inequality.jsx.
// Entry point: preview-quadratics.html. URL params: ?open=<n> opens case n,
// &lang=vn opens in Vietnamese. Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import FactorQuad from './tasks/FactorQuad';
import QuadFormula from './tasks/QuadFormula';
import QuadSolver from './tasks/QuadSolver';
import Assessment from './tasks/Assessment';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const TRACK = 'ACELLUS';
const UNIT = 'ALG_QUAD';

const CASES = [
  ['QUAD_SOLVER', 'Quad Solver · type any quadratic'],
  ['FACTOR_QUAD', 'Factor It · from the top (a = 1)'],
  ['FACTOR_QUAD', 'Factor It · from f4 (standard form, GCF, ac, squares)', 3],
  ['FACTOR_QUAD', 'Factor It · from f10 (level 4)', 9],
  ['QUAD_FORMULA', 'Formula · from the top'],
  ['QUAD_FORMULA', 'Formula · from q4 (√, none, one)', 3],
  ['QUAD_FORMULA', 'Formula · from q7 (simplify fully)', 6],
  ['NOTES', 'Deck · Solving Quadratics'],
  ['ASSESSMENT', 'Quiz · 12 items'],
];

const SCREENS = { NOTES: Notes, FACTOR_QUAD: FactorQuad, QUAD_FORMULA: QuadFormula, QUAD_SOLVER: QuadSolver, ASSESSMENT: Assessment };
const params = new URLSearchParams(window.location.search);
const langs = params.get('lang') === 'vn' ? ['vn', 'en'] : ['en', 'vn'];

function Harness() {
  const [open, setOpen] = useState(() => (params.get('open') != null ? CASES[Number(params.get('open'))] : null));

  if (open) {
    const [taskId, , from = 0] = open;
    const unit = getTrack(TRACK).data[UNIT];
    const def = getTask(taskId);
    const built = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const pool = Array.isArray(built) ? built.slice(from) : built?.items ? { ...built, items: built.items.slice(from) } : built;
    const Screen = SCREENS[taskId];
    return (
      <Screen pool={pool} slides={pool} unit={unit} langs={langs} bilingual
        onProgress={(score, blob) => console.log('progress', score, blob)}
        onComplete={(score, blob) => { console.log('completed with', score, blob); setOpen(null); }}
        onQuit={() => setOpen(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Quadratics harness</h1>
      <p className="text-slate-500 font-bold mb-6">ACELLUS · ALG_QUAD, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map((c) => (
          <button key={c[1]} onClick={() => setOpen(c)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-violet-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-violet-500">{TRACK} · {c[0]}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{c[1]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__quadroot ||= createRoot(el));
root.render(<Harness />);
