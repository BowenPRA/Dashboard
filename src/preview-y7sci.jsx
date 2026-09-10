// Dev-only harness for the Y7_SCI track: a unit's tasks mounted straight from
// unit data, so they can be checked without Supabase auth. Entry point:
// preview-y7sci.html (`?unit=U02_1` picks the unit; defaults to U01_1). Not
// part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import Recognition from './tasks/Recognition';
import Spell from './tasks/Spell';
import Reading from './tasks/Reading';
import ShortAnswers from './tasks/ShortAnswers';
import Diagrams from './tasks/Diagrams';
import Assessment from './tasks/Assessment';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const TRACK = 'Y7_SCI';
const PARAMS = new URLSearchParams(window.location.search);
const UNIT = PARAMS.get('unit') || 'U01_1';
// `?slide=N` hands NOTES a resume blob as if the deck had been closed on slide
// N (1-based), to check the "picked up where you left off" path without auth.
const RESUME_SLIDE = Number(PARAMS.get('slide')) || 0;

const CASES = [
  ['NOTES', 'Deck · layout slides, 5 checks, ported widgets'],
  ['WORD_REC', 'Vocab · key words with audio'],
  ['SPELLING', 'Spelling · the same words, typed'],
  ['READ_COMP', 'Reading · 3 cloze passages'],
  ['SHORT_ANSWERS', 'Questions · 4 reasoning items (AI-marked)'],
  ['DIAGRAMS', 'Diagrams · 3 label-and-explain items (AI-marked)'],
  ['ASSESSMENT', 'Quiz · 6 MCQ, 8 minutes'],
];

const SCREENS = {
  NOTES: Notes, WORD_REC: Recognition, SPELLING: Spell, READ_COMP: Reading,
  SHORT_ANSWERS: ShortAnswers, DIAGRAMS: Diagrams, ASSESSMENT: Assessment,
};

function Harness() {
  const [open, setOpen] = useState(null);
  const unit = getTrack(TRACK).data[UNIT];

  if (open) {
    const def = getTask(open);
    const pool = def.buildPool(unit, { track: TRACK, unitId: UNIT });
    const Screen = SCREENS[open];
    return (
      <Screen
        pool={pool}
        slides={pool}
        unit={unit}
        unitTitle={unit?.meta?.title}
        track={TRACK}
        unitId={UNIT}
        savedData={open === 'NOTES' && RESUME_SLIDE > 0
          ? { slide: RESUME_SLIDE - 1, total: pool.length, checks: {} }
          : {}}
        onProgress={(score, blob) => console.log(`${open} checkpoint:`, score, blob)}
        onComplete={(score, _b, log) => { console.log(`${open} completed:`, score, log); setOpen(null); }}
        onQuit={() => setOpen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Y7 Science harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map(([taskId, label]) => (
          <button
            key={taskId}
            onClick={() => setOpen(taskId)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-emerald-500">{taskId}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Reuse one root across HMR so a re-run never calls createRoot twice on #root.
const el = document.getElementById('root');
const root = (window.__y7sciroot ||= createRoot(el));
root.render(<Harness />);
