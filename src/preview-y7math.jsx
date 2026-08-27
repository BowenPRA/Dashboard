// Dev-only harness for the Y7_MATH track: the U01_2 tasks mounted straight from
// unit data, so they can be checked without Supabase auth. Entry point:
// preview-y7math.html. Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Notes from './tasks/Notes';
import Recognition from './tasks/Recognition';
import Workbook from './tasks/Workbook';
import NumberDrill from './tasks/NumberDrill';
import FactorBlitz from './tasks/FactorBlitz';
import ShortAnswers from './tasks/ShortAnswers';
import Assessment from './tasks/Assessment';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';

const TRACK = 'Y7_MATH';
// ?unit=U01_1 to preview a different unit; defaults to U01_2.
const UNIT = new URLSearchParams(window.location.search).get('unit') || 'U01_2';

const CASES = [
  ['NOTES', 'Deck · 14 slides, 5 checks, TranslateWidget'],
  ['WORD_REC', 'Vocab · 6 key words with audio'],
  ['WORKBOOK', 'Practice · 12 questions in 3 tiers'],
  ['NUM_DRILL', 'Number Gym · long-mult, 8 items'],
  ['FACTOR_BLITZ', 'Factor Blitz · timed factor grid (1.4/1.5 only)'],
  ['SHORT_ANSWERS', 'Questions · 4 reasoning items'],
  ['ASSESSMENT', 'Quiz · 6 MCQ, 8 minutes'],
];

const SCREENS = {
  NOTES: Notes, WORD_REC: Recognition, WORKBOOK: Workbook,
  NUM_DRILL: NumberDrill, FACTOR_BLITZ: FactorBlitz,
  SHORT_ANSWERS: ShortAnswers, ASSESSMENT: Assessment,
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
        track={TRACK}
        unitId={UNIT}
        savedData={{}}
        onComplete={(score, _b, log) => { console.log(`${open} completed:`, score, log); setOpen(null); }}
        onQuit={() => setOpen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Y7 Maths harness</h1>
      <p className="text-slate-500 font-bold mb-6">{TRACK} · {UNIT} “{unit?.meta?.title}”, mounted without auth.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map(([taskId, label]) => (
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

// Reuse one root across HMR so a re-run never calls createRoot twice on #root.
const el = document.getElementById('root');
const root = (window.__y7root ||= createRoot(el));
root.render(<Harness />);
