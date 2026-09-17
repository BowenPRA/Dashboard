// Dev-only harness for the Y7_MATH track: one unit's tasks mounted straight
// from unit data, so they can be checked without Supabase auth. Entry point:
// preview-y7math.html, `?unit=U02_3` to pick a unit (default U01_2). Not part of
// the production build.
//
// The task list is whatever the unit declares, in gate order, so a unit that
// adds a task (Collect It, Expand It, Undo It, Pyramids) needs no edit here.
// `?slide=N` resumes NOTES on slide N — a deck gates Continue on its checks and
// activities, and a sort cannot be driven from a script. DIAGRAMS lays every
// SVG in the unit on one page; WIDGETS mounts every widget.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask } from './tasks/taskRegistry';

const params = new URLSearchParams(window.location.search);
const TRACK = 'Y7_MATH';
const UNIT = params.get('unit') || 'U01_2';
const SLIDE = Number(params.get('slide'));
const LANG = params.get('lang') === 'vn' ? 'vn' : 'en';
// `?open=NOTES` mounts a task straight away (with `?slide=N`, a whole deck can be
// swept slide by slide from a script).
const OPEN = params.get('open');

const DIAGRAM_MODULES = import.meta.glob('./data/Y7_MATH/*/diagrams.js', { eager: true });
const DIAGRAMS = DIAGRAM_MODULES[`./data/Y7_MATH/${UNIT}/diagrams.js`]?.DIAGRAMS || {};
const WIDGET_MODULES = import.meta.glob('./data/Y7_MATH/*/widgets.jsx', { eager: true });
const WIDGETS = Object.entries(WIDGET_MODULES[`./data/Y7_MATH/${UNIT}/widgets.jsx`] || {})
  .filter(([, v]) => typeof v === 'function');

const casesFor = (unit) =>
  (unit?.phases || []).flatMap((phase) =>
    (phase.tasks || []).map((t) => {
      const def = getTask(t.id);
      return [t.id, `${def?.label || t.id} · ${phase.title} · ${t.maxXP} XP`];
    })
  );

function Back({ onBack }) {
  return (
    <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">
      ← Back
    </button>
  );
}

function Gallery({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <Back onBack={onBack} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(DIAGRAMS).map(([name, svg]) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2">{name}</div>
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
      <Back onBack={onBack} />
      <div className="flex flex-col gap-6">
        {WIDGETS.map(([name, Widget]) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2">{name}</div>
            <div className="h-[30rem] w-full"><Widget lang={LANG} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Harness() {
  const [open, setOpen] = useState(OPEN);
  const unit = getTrack(TRACK).data[UNIT];

  if (!unit) return <div className="p-8 font-black">No unit {UNIT} in {TRACK}.</div>;
  if (open === 'DIAGRAMS') return <Gallery onBack={() => setOpen(null)} />;
  if (open === 'WIDGETS') return <WidgetBench onBack={() => setOpen(null)} />;

  if (open) {
    const def = getTask(open);
    const resolved = resolveTask({ id: open });
    const pool = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const saved = open === 'NOTES' && Number.isFinite(SLIDE) && SLIDE > 0
      ? { slide: Math.min(SLIDE - 1, (unit.notes?.length || 1) - 1), total: unit.notes?.length || 0, checks: {} }
      : {};
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
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Y7 Maths harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {[...casesFor(unit),
          ['DIAGRAMS', `Every SVG in this unit (${Object.keys(DIAGRAMS).length}), on one page`],
          ['WIDGETS', `Every widget in this unit (${WIDGETS.length}), on one page`],
        ].map(([taskId, label]) => (
          <button
            key={taskId}
            onClick={() => setOpen(taskId)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-orange-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-orange-500">{taskId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__y7mathroot ||= createRoot(el));
root.render(<Harness />);
