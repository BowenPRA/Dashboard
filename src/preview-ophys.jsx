// Dev-only harness for the OLEVEL_PHYS track (Cambridge O Level Physics, built
// from the Complete Physics chapters): one unit's tasks mounted straight from
// unit data, so they can be checked without Supabase auth. Entry point:
// preview-ophys.html, `?unit=C09_1` to pick a unit; `?done=id1,id2` resumes a
// task part-way. A copy of preview-chem.jsx with the track swapped and the
// engine-pool fallback dropped (this track has no production engines yet). Not
// part of the production build.
//
// The extra "GALLERY" case is not a task — it lays every SVG in the unit's
// diagrams.js on one page, which is the only practical way to check label
// placement after an edit.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask } from './tasks/taskRegistry';

const params = new URLSearchParams(window.location.search);
const TRACK = 'OLEVEL_PHYS';
const UNIT = params.get('unit') || 'C09_1';

const DIAGRAM_MODULES = import.meta.glob('./data/OLEVEL_PHYS/*/diagrams.js', { eager: true });
const DIAGRAMS = DIAGRAM_MODULES[`./data/OLEVEL_PHYS/${UNIT}/diagrams.js`]?.DIAGRAMS || {};

// `?done=pd1,pd2` seeds savedData so a task resumes part-way through.
const SAVED = Object.fromEntries((params.get('done') || '').split(',').filter(Boolean).map((id) => [id, 1]));

// `?slide=12` resumes the NOTES deck at a slide. A deck gates Continue on its
// checks and activities, so without this the only way to look at slide 20 is to
// answer the nineteen items in front of it — and a sort cannot be driven from
// a script at all. Notes only trusts a resume blob whose `total` matches the
// deck length, so the blob is built per unit below.
const SLIDE = Number(params.get('slide'));

// `?widgets` mounts this unit's widgets.jsx exports on one page, the way the
// DIAGRAMS case lays out its SVGs.
const WIDGET_MODULES = import.meta.glob('./data/OLEVEL_PHYS/*/widgets.jsx', { eager: true });
const WIDGETS = Object.entries(WIDGET_MODULES[`./data/OLEVEL_PHYS/${UNIT}/widgets.jsx`] || {})
  .filter(([, v]) => typeof v === 'function');

// The task list is whatever the unit declares, in gate order, so a unit that
// drops a task or adds one needs no edit here.
const casesFor = (unit) =>
  (unit?.phases || []).flatMap((phase) =>
    (phase.tasks || []).map((t) => {
      const def = getTask(t.id);
      return [t.id, `${def?.label || t.id} · ${phase.title} · ${t.maxXP} XP`];
    })
  );

function Gallery({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">
        ← Back
      </button>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(DIAGRAMS).map(([name, svg]) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-2">{name}</div>
            <div className="w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WidgetBench({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">
        ← Back
      </button>
      <div className="flex flex-col gap-6">
        {WIDGETS.map(([name, Widget]) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-2">{name}</div>
            {/* The height a showcase slide gives a widget. */}
            <div className="h-[30rem] w-full"><Widget lang="en" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Harness() {
  // `?open=NOTES` goes straight to a task.
  const [open, setOpen] = useState(params.get('open'));
  const unit = getTrack(TRACK).data[UNIT];

  if (open === 'GALLERY') return <Gallery onBack={() => setOpen(null)} />;
  if (open === 'WIDGETS') return <WidgetBench onBack={() => setOpen(null)} />;

  if (!unit) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">O Level Physics harness</h1>
        <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} did not load — its data.js is missing or threw. See the console.</p>
        <button onClick={() => setOpen('GALLERY')} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">
          Open the SVG gallery anyway ({Object.keys(DIAGRAMS).length})
        </button>
      </div>
    );
  }

  if (open) {
    const def = getTask(open);
    const resolved = resolveTask({ id: open });
    const pool = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const saved = open === 'NOTES' && Number.isFinite(SLIDE) && SLIDE > 0
      ? { slide: Math.min(SLIDE - 1, (unit.notes?.length || 1) - 1), total: unit.notes?.length || 0, checks: {} }
      : SAVED;
    const ctx = {
      pool, unit, unitId: UNIT, track: TRACK,
      scores: {}, savedData: saved, strikes: 0, maxXP: resolved.maxXP,
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
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">O Level Physics harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {[...casesFor(unit),
          ['GALLERY', 'Every SVG in this unit, on one page'],
          ['WIDGETS', `Every widget in this unit (${WIDGETS.length}), on one page`],
        ].map(([taskId, label]) => (
          <button
            key={taskId}
            onClick={() => setOpen(taskId)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-blue-500">{taskId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__ophysroot ||= createRoot(el));
root.render(<Harness />);
