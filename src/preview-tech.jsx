// Dev-only harness for the PRIMARY_TECH track: every task a unit declares,
// mounted straight from unit data so it can be checked without Supabase auth.
// Entry point: preview-tech.html. Not part of the production build.
//
// The track now has real units, so the stand-in unit this harness shipped with
// (src/preview-tech-demo.js, deleted) is gone: the browser picture it carried
// lives in src/data/PRIMARY_TECH/T07/diagrams.js, where `npm run audit:svg` can
// see it. Units are listed from the content graph, so a new one appears here the
// moment it lands.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask } from './tasks/taskRegistry';

const TRACK = 'PRIMARY_TECH';
const WANTED = new URLSearchParams(window.location.search).get('unit');

/** Task list DERIVED from the loaded unit, so it can never offer a task the unit lacks. */
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

const countOf = (def, unit, unitId) => {
  // The arcade's pool is its game config, not a list of anything countable.
  if (def.id === 'GAMES') return null;
  // Find It is worked one PROMPT at a time, so the number of pictures is the
  // wrong thing to report — a single picture is usually five questions.
  if (def.id === 'POINT_IT') {
    return (unit?.pointIt || []).reduce((s, it) => s + (it.prompts?.length || 0), 0) || null;
  }
  const direct = sizeOf(def?.buildPool?.(unit, { track: TRACK, unitId }));
  if (direct) return direct;
  // ASSESSMENT hands the component an empty pool and reads the unit itself.
  if (def.id === 'ASSESSMENT') return sizeOf(unit?.assessment?.questions) || null;
  return null;
};

function Harness() {
  const { data, meta } = getTrack(TRACK);
  const [unitId, setUnitId] = useState(WANTED && data[WANTED] ? WANTED : meta[0]?.id);
  const [open, setOpen] = useState(null);
  const unit = data[unitId];

  if (!unit) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Technology harness</h1>
        <p className="text-amber-600 dark:text-amber-400 font-bold">
          No units in <code className="font-mono">src/data/PRIMARY_TECH/</code> yet.
        </p>
      </div>
    );
  }

  if (open) {
    const def = getTask(open);
    // Resolve against the task AS THE UNIT DECLARES IT, not against a bare id.
    // resolveTask({ id }) falls back to defaultMaxXP, so the harness reported a
    // perfect Find It run as 15/15 XP while T01 actually pays 25 — the exact
    // number this screen exists to check.
    const declared = (unit.phases || []).flatMap((p) => p.tasks || []).find((t) => t.id === open);
    const resolved = resolveTask(declared || { id: open });
    const pool = def.buildPool(unit, { track: TRACK, unitId });
    const ctx = {
      pool, unit, unitId, track: TRACK,
      scores: {}, savedData: {}, strikes: 0, maxXP: resolved.maxXP,
      // The XP the task would actually award is worked out here rather than just
      // logging the raw score: "does it award XP" is a done-condition for this
      // track, and a raw 10 tells you nothing about a 25-XP tile.
      onComplete: (score, _b, log) => {
        const xp = Math.round(((Number(score) || 0) / (def.nativeMax || 10)) * resolved.maxXP);
        console.log(`[harness] ${open} complete — raw ${score}/${def.nativeMax} = ${xp}/${resolved.maxXP} XP`, log);
        setOpen(null);
      },
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
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Technology harness</h1>
      <p className="text-slate-500 font-bold mb-5">{TRACK}, mounted without auth.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {meta.map((m) => (
          <button
            key={m.id}
            onClick={() => setUnitId(m.id)}
            className={`px-4 py-2 rounded-xl font-black text-sm border-2 border-b-[4px] transition-all
              ${m.id === unitId
                ? 'bg-sky-500 border-sky-700 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400'}`}>
            {m.id} · {m.title}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {casesFor(unit).map((taskId) => {
          const def = getTask(taskId);
          const n = def ? countOf(def, unit, unitId) : null;
          return (
            <button
              key={taskId}
              onClick={() => setOpen(taskId)}
              className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-sky-400">
              <div className="text-[11px] font-black uppercase tracking-widest text-sky-500">{taskId}</div>
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
const root = (window.__techroot ||= createRoot(el));
root.render(<Harness />);
