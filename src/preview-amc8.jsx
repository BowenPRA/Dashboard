// Dev-only harness for the AMC8 track: one unit's tasks mounted straight from
// unit data, so they can be checked without Supabase auth. Entry point:
// preview-amc8.html, `?unit=PT_01` to pick a unit. A copy of
// preview-extmath.jsx with the track swapped. Not part of the production build.
//
//   ?open=AMC_TEST        open a task straight away
//   ?slide=12             resume the NOTES deck at a slide
//   ?paper=BCEEB-DEDEB…   a handed-in paper, one letter per question and "-"
//                         for a blank: what the Review reads, and what the
//                         Practice Test shows as results. `?paper=key` is a
//                         perfect paper, `?paper=mixed` a typical one.
//   ?left=90              a paper in progress with that many seconds left
//   ?paper=mixed&over=1   the time ran out on that paper and its blanks were
//                         answered in extra time (half right) — then handed
//                         in; `over=open` leaves it still in extra time
//
// The harness keeps its own progress in memory, so handing in the test and
// then opening the Review works the way it does in the app.
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { getTask, resolveTask, resolveUnitTasks } from './tasks/taskRegistry';
import { Figure } from './components/amc/AmcParts';

const params = new URLSearchParams(window.location.search);
const TRACK = 'AMC8';
const UNIT = params.get('unit') || 'PT_01';
const SLIDE = Number(params.get('slide'));

const DIAGRAM_MODULES = import.meta.glob('./data/AMC8/*/diagrams.js', { eager: true });
const DIAGRAMS = DIAGRAM_MODULES[`./data/AMC8/${UNIT}/diagrams.js`]?.DIAGRAMS || {};
const FIGURE_MODULES = import.meta.glob('./data/AMC8/*/figures.js', { eager: true });
const FIGURES = FIGURE_MODULES[`./data/AMC8/${UNIT}/figures.js`]?.FIGURES || {};

function seedScores(unit) {
  const problems = unit?.amcTest?.problems || [];
  const paper = params.get('paper');
  const left = Number(params.get('left'));
  const now = Date.now();
  const allowed = (unit?.amcTest?.minutes || 40) * 60;
  if (paper) {
    const letters = paper === 'key'
      ? problems.map((p) => p.correct)
      : paper === 'mixed'
        ? problems.map((p, i) => (i % 4 === 2 ? '-' : i % 3 === 1 ? (p.correct === 'A' ? 'B' : 'A') : p.correct))
        : paper.toUpperCase().split('');
    const picks = {};
    problems.forEach((p, i) => { if (/[A-E]/.test(letters[i] || '')) picks[p.id] = letters[i]; });
    const over = params.get('over');
    if (over) {
      const extra = {};
      problems.filter((p) => !picks[p.id]).forEach((p, i) => {
        extra[p.id] = i % 2 === 0 ? p.correct : (p.correct === 'A' ? 'B' : 'A');
      });
      return { p53: { current: 0, answers: {
        v: 1, startedAt: now - 3000000, remaining: 0, picks, flags: [], usedSeconds: allowed,
        timeUp: true, extra, extraSeconds: 312, submitted: over !== 'open',
      } } };
    }
    return { p53: { current: 0, answers: { v: 1, startedAt: now - 2000000, remaining: 400, picks, flags: [], submitted: true, usedSeconds: 2000 } } };
  }
  if (left > 0) {
    return { p53: { current: 0, answers: { v: 1, startedAt: now - (allowed - left) * 1000, remaining: left, picks: {}, flags: [], submitted: false } } };
  }
  return {};
}

const casesFor = (unit) =>
  (unit?.phases || []).flatMap((phase) =>
    (phase.tasks || []).map((t) => [t.id, `${getTask(t.id)?.label || t.id} · ${phase.title} · ${t.maxXP} XP`]));

function Gallery({ title, items, onBack, figure = false }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">← Back</button>
      <h1 className="text-xl font-black mb-4 text-slate-700 dark:text-slate-200">{title}</h1>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(items).map(([name, svg]) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-cyan-600 mb-2">{name}</div>
            {figure ? <Figure svg={svg} /> : <div className="w-full" dangerouslySetInnerHTML={{ __html: svg }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Harness() {
  const unit = getTrack(TRACK).data[UNIT];
  const [open, setOpen] = useState(params.get('open'));
  const [scores, setScores] = useState(() => seedScores(unit));

  if (open === 'DIAGRAMS') return <Gallery title="diagrams.js" items={DIAGRAMS} onBack={() => setOpen(null)} />;
  if (open === 'FIGURES') return <Gallery title="figures.js" items={FIGURES} figure onBack={() => setOpen(null)} />;

  if (open) {
    const def = getTask(open);
    const resolved = resolveTask({ id: open });
    const pool = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const keep = (score, blob) => setScores((prev) => ({ ...prev, [def.dbKey]: { current: score, answers: blob ?? prev[def.dbKey]?.answers } }));
    const saved = open === 'NOTES' && Number.isFinite(SLIDE) && SLIDE > 0
      ? { slide: Math.min(SLIDE - 1, (unit.notes?.length || 1) - 1), total: unit.notes?.length || 0, checks: {} }
      : scores[def.dbKey]?.answers || {};
    const ctx = {
      pool, unit, unitId: UNIT, track: TRACK,
      scores, savedData: saved, strikes: 0, maxXP: resolved.maxXP,
      onComplete: (score, blob, log) => { console.log(`[harness] ${open} complete`, score, log); keep(score, blob); setOpen(null); },
      onProgress: (score, blob, log) => { console.log(`[harness] ${open} progress`, score, log); keep(score, blob); },
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

  const locks = Object.fromEntries(resolveUnitTasks(unit, 100, scores).map((t) => [t.id, t.locked]));
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">AMC 8 Prep harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {[...casesFor(unit),
          ['FIGURES', `Every test figure (${Object.keys(FIGURES).length}), on one page`],
          ['DIAGRAMS', `Every deck diagram (${Object.keys(DIAGRAMS).length}), on one page`],
        ].map(([taskId, label]) => (
          <button key={taskId} onClick={() => setOpen(taskId)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-cyan-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-cyan-500">{taskId}{locks[taskId] ? ' · locked in the app' : ''}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__amc8root ||= createRoot(el));
root.render(<Harness />);
