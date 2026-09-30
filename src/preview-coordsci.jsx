// Dev-only harness for the COORD_SCI track: the U04_1 tasks mounted straight
// from unit data, so they can be checked without Supabase auth. Entry point:
// preview-coordsci.html. Not part of the production build.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask } from './tasks/taskRegistry';

const TRACK = 'COORD_SCI';
const PARAMS = new URLSearchParams(window.location.search);
const UNIT = PARAMS.get('unit') || 'U04_1';
// `?open=NOTES&slide=N` mounts a task straight away, on slide N (1-based) —
// a deck can then be swept slide by slide from a script. `?open=LABEL_IT&item=N`
// and `?open=HW_REVIEW&q=N` do the same for a diagram and a review question.
const OPEN = PARAMS.get('open');
const RESUME_SLIDE = Number(PARAMS.get('slide')) || 0;
const RESUME_ITEM = Number(PARAMS.get('item')) || 0;
// The Workbook screen (WORKBOOK, HW_REVIEW) has no resume position, so `?q=N`
// taps its N-th progress dot once it has mounted, and `&reveal=1` then opens
// that question's solution ("I'm stuck") so the worked answer can be looked at.
const RESUME_Q = Number(PARAMS.get('q')) || 0;
const REVEAL = PARAMS.get('reveal') === '1';
if (OPEN && RESUME_Q > 0) {
  const tries = { n: 0 };
  const timer = setInterval(() => {
    const dot = document.querySelector(`[aria-label="Question ${RESUME_Q}"]`);
    tries.n += 1;
    if (!dot && tries.n < 40) return;
    clearInterval(timer);
    dot?.click();
    if (REVEAL) {
      setTimeout(() => {
        [...document.querySelectorAll('button')].find((b) => /stuck|show solution/i.test(b.textContent))?.click();
      }, 150);
    }
  }, 100);
}

const resumeFor = (open, pool) => {
  if (open === 'NOTES' && RESUME_SLIDE > 0) return { slide: RESUME_SLIDE - 1, total: pool.length, checks: {} };
  if (open === 'LABEL_IT' && RESUME_ITEM > 1) {
    const done = {};
    pool.slice(0, RESUME_ITEM - 1).forEach((it) => { done[it.id] = { placements: {}, perPin: {}, correct: 0, total: (it.pins || []).length }; });
    return { done };
  }
  return {};
};

/**
 * The task list is DERIVED from whatever unit is loaded, not hardcoded — the
 * harness used to list U04_1's tasks by hand, which silently offered a task the
 * unit did not have (and hid one it did) as soon as `?unit=` pointed elsewhere.
 * Each row shows how many items the task actually built, so an empty pool is
 * visible before you open it.
 */
function casesFor(unit) {
  return (unit?.phases || []).flatMap((p) => (p.tasks || []).map((t) => t.id));
}

/** Rough item count for a pool in any of the shapes the registry hands out. */
function sizeOf(pool) {
  if (Array.isArray(pool)) {
    // Workbook pools are tiers of questions; everything else is a flat list.
    const nested = pool.reduce((s, x) => s + (Array.isArray(x?.questions) ? x.questions.length : 0), 0);
    return nested || pool.length;
  }
  // The wrapper shapes — { shortQA }, { diagrams }, { questions }, { items }.
  if (pool && typeof pool === 'object') {
    const arr = Object.values(pool).find(Array.isArray);
    return arr ? sizeOf(arr) : 0;
  }
  return 0;
}

const countOf = (def, unit) => {
  // The arcade's pool is its game config, not a list of anything countable.
  if (def.id === 'GAMES') return null;
  const direct = sizeOf(def?.buildPool?.(unit, { track: TRACK, unitId: UNIT }));
  if (direct) return direct;
  // ASSESSMENT hands the component an empty pool and reads the unit itself.
  if (def.id === 'ASSESSMENT') return sizeOf(unit?.assessment?.questions) || null;
  return null;
};

function Harness() {
  const [open, setOpen] = useState(OPEN);
  const unit = getTrack(TRACK).data[UNIT];

  if (open) {
    const def = getTask(open);
    const resolved = resolveTask({ id: open });
    const pool = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const ctx = {
      pool, unit, unitId: UNIT, track: TRACK,
      scores: {}, savedData: resumeFor(open, pool), strikes: 0, maxXP: resolved.maxXP,
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
        {casesFor(unit).map((taskId) => {
          const def = getTask(taskId);
          const n = def ? countOf(def, unit) : null;
          return (
            <button
              key={taskId}
              onClick={() => setOpen(taskId)}
              className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-teal-400">
              <div className="text-[11px] font-black uppercase tracking-widest text-teal-500">{taskId}</div>
              <div className="font-black text-slate-800 dark:text-slate-100">
                {def?.label || 'unknown task'}
                {n != null && <span className="font-bold text-slate-400"> · {n} item{n === 1 ? '' : 's'}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__coordroot ||= createRoot(el));
root.render(<Harness />);
