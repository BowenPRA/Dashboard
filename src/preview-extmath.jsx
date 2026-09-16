// Dev-only harness for the EXT_MATH track (IGCSE Mathematics, Extended): one
// unit's tasks mounted straight from unit data, so they can be checked without
// Supabase auth. Entry point: preview-extmath.html, `?unit=EM_06` to pick a
// unit; `?done=id1,id2` resumes a task part-way. A copy of preview-addmath.jsx
// with the track swapped. Not part of the production build.
//
// The extra "DIAGRAMS" case is not a task — it lays every SVG in the unit's
// diagrams.js on one page, which is the only practical way to check label
// placement after an edit.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask } from './tasks/taskRegistry';

const params = new URLSearchParams(window.location.search);
const TRACK = 'EXT_MATH';
const UNIT = params.get('unit') || 'EM_06';

const DIAGRAM_MODULES = import.meta.glob('./data/EXT_MATH/*/diagrams.js', { eager: true });
const DIAGRAMS = DIAGRAM_MODULES[`./data/EXT_MATH/${UNIT}/diagrams.js`]?.DIAGRAMS || {};

// `?done=pd1,pd2` seeds savedData so a task resumes part-way through — the only
// practical way to reach the eighth long division without working the first
// seven by hand.
const SAVED = Object.fromEntries((params.get('done') || '').split(',').filter(Boolean).map((id) => [id, 1]));

// `?slide=12` resumes the NOTES deck at a slide. A deck gates Continue on its
// checks and activities, so without this the only way to look at slide 25 is to
// answer the twenty-four items in front of it — and a sort cannot be driven from
// a script at all. Notes only trusts a resume blob whose `total` matches the
// deck length, so the blob is built per unit below.
const SLIDE = Number(params.get('slide'));

// `?widgets` mounts this unit's widgets.jsx exports on one page, the way the
// DIAGRAMS case lays out its SVGs: a widget lives on a gated slide, and its
// steppers are the part most likely to be wrong after an edit.
const WIDGET_MODULES = import.meta.glob('./data/EXT_MATH/*/widgets.jsx', { eager: true });
const WIDGETS = Object.entries(WIDGET_MODULES[`./data/EXT_MATH/${UNIT}/widgets.jsx`] || {})
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
            <div className="text-[11px] font-black uppercase tracking-widest text-cyan-600 mb-2">{name}</div>
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
            <div className="text-[11px] font-black uppercase tracking-widest text-cyan-600 mb-2">{name}</div>
            {/* The height a showcase slide gives a widget. */}
            <div className="h-[30rem] w-full"><Widget lang="en" /></div>
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
  if (open === 'WIDGETS') return <WidgetBench onBack={() => setOpen(null)} />;

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
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Extended Mathematics harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {[...casesFor(unit),
          ['DIAGRAMS', 'Every SVG in this unit, on one page'],
          ['WIDGETS', `Every widget in this unit (${WIDGETS.length}), on one page`],
        ].map(([taskId, label]) => (
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
const root = (window.__extmathroot ||= createRoot(el));
root.render(<Harness />);
