// Dev-only harness for the GED tracks: any unit's tasks mounted straight from
// unit data (Find & Fix, Order It and the rest), plus the student's Writing page
// and the teacher's essay review, all without Supabase auth. Entry point:
// preview-ged.html. Not part of the production build.
//
//   ?track=GED_ENG&unit=ENG_3     pick the unit (defaults GED_ENG / ENG_3)
//   ?open=PROOFREAD               mount a task straight away (&slide=N resumes NOTES on slide N)
//   ?open=WRITING                 the Writing page with synthetic essays (&empty=1 for none)
//   ?open=REVIEW                  the teacher drawer's essay panel; saving a note is stubbed
//   ?open=DIAGRAMS                every authored SVG in the unit, on one page
import { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { TRACK_REGISTRY } from './components/trackRegistry';
import { getTask, resolveTask } from './tasks/taskRegistry';
import { WritingScreen } from './views/Writing';
import EssayReviewPanel from './components/essay/EssayReviewPanel';
import { buildEssayEntry, ESSAYS_KEY } from './utils/essayArchive';
import { supabase } from './utils/supabaseClient';
import useDarkMode from './hooks/useDarkMode';

const params = new URLSearchParams(window.location.search);
const TRACK = params.get('track') || 'GED_ENG';
const UNIT = params.get('unit') || 'ENG_3';
const OPEN = params.get('open');
const EMPTY = params.get('empty') === '1';
const SLIDE = Number(params.get('slide'));

const DIAGRAM_MODULES = import.meta.glob('./data/GED_*/*/diagrams.js', { eager: true });
const DIAGRAMS = DIAGRAM_MODULES[`./data/${TRACK}/${UNIT}/diagrams.js`]?.DIAGRAMS || {};

/* -------------------------------------------------------------------------- *
 * Synthetic essays — five graded responses over three weeks, one of each shape
 * the Writing page and the review panel draw differently.
 * -------------------------------------------------------------------------- */

const rev = (quote, correction, kind, rule) => ({ quote, correction, kind, rule, why: `${kind}.` });

const SAMPLE_TEXT = `Free buses is an idea that both sources talk about, but they do not agree about the cost.

Source 1 argues that a town should not charge for public transport at all. It says that in Elmwood the ridership rose by thirty percent in one year. However the writer never says who pays for the service once the fares are gone.

Source 2 give evidence from Marsden instead. When the buses became busy there, they had to buy new vehicle that the town had not budgeted for.

In conclusion i think Source 2 is better supported, because it answers the question about cost that Source 1 leaves open.`;

function essay(daysAgo, { traits, words, mode = 'practice', revisions = [], nonScorable = '', note = null, revised = false, unitId = 'ENG_1C', unitTitle = 'Evaluating Arguments', promptTitle = 'Free Buses' }) {
  const e = buildEssayEntry({
    id: `${unitId}:0:${daysAgo}`,
    track: 'GED_ENG',
    unitId,
    unitTitle,
    prompt: { key: '0', title: promptTitle, task: 'Analyse both sources to decide which position is better supported. Use specific evidence from both sources.' },
    mode,
    minutesAllowed: mode === 'exam' ? 45 : null,
    secondsUsed: mode === 'exam' ? 41 * 60 : 1900,
    text: SAMPLE_TEXT,
    plan: null,
    feedback: {
      gedTraits: traits,
      gedTotal: traits.arguments + traits.development + traits.conventions,
      wordCount: words,
      paragraphs: 4,
      positionStated: nonScorable ? '' : 'Source 2 is better supported, because it answers the cost question Source 1 leaves open.',
      evidenceCited: nonScorable ? [] : ['Ridership rose thirty percent in Elmwood (Source 1)', 'Marsden bought unbudgeted vehicles (Source 2)'],
      analysisOfArgumentation: traits.arguments === 2 ? 'You weigh the two measured results against each other.' : '',
      traitFeedback: {
        arguments: 'A clear position, held throughout.',
        development: 'Each paragraph does one job.',
        conventions: 'The meaning is clear, but the same slips repeat.',
      },
      scoreNotes: traits.development < 2 && words < 150 ? ['Trait 2 is capped at 1: under 150 words there is not room to develop ideas.'] : [],
      nonScorableReason: nonScorable,
      nextStep: 'Read each sentence aloud and check the verb matches the subject.',
      revisions,
    },
  });
  const at = new Date(Date.now() - daysAgo * 86400000).toISOString();
  return {
    ...e,
    at,
    revision: revised ? { fixed: revisions.length - 1, total: revisions.length, revisedText: SAMPLE_TEXT.replace('Source 2 give', 'Source 2 gives') } : null,
    teacherNote: note ? { text: note, at } : null,
  };
}

const SVA = (q, c) => rev(q, c, 'Subject-verb agreement', 'A singular subject takes verb + s; a plural one does not.');

const ESSAYS = [
  essay(21, { traits: { arguments: 1, development: 1, conventions: 0 }, words: 132, revisions: [SVA('the buses is free', 'the buses are free'), SVA('Source 2 give', 'Source 2 gives'), rev('expensive, because of this', 'expensive. Because of this,', 'Comma splice', 'Join two full sentences with a full stop.'), rev('i think', 'I think', 'Capital letter', 'Always write I with a capital.')], promptTitle: 'Free Buses', unitId: 'ENG_1A', unitTitle: 'Claims & Evidence' }),
  essay(17, { traits: { arguments: 0, development: 0, conventions: 0 }, words: 96, nonScorable: 'About 84% of this response is copied word-for-word from the sources.', promptTitle: 'School Uniforms', unitId: 'ENG_1B', unitTitle: 'Reasoning & Fallacies' }),
  essay(12, { traits: { arguments: 1, development: 2, conventions: 1 }, words: 284, revisions: [SVA('each of the sources show', 'each of the sources shows'), rev('new vehicle', 'new vehicles', 'Plural noun', 'Countable nouns need a plural -s.')], revised: true, note: 'Much better structure — five paragraphs, each with one job. Next: say WHY Source 2’s evidence is stronger, not just that it is.' }),
  essay(6, { traits: { arguments: 2, development: 1, conventions: 1 }, words: 318, mode: 'exam', revisions: [SVA('the data prove', 'the data proves'), rev('However the writer', 'However, the writer', 'Comma after an opener', 'Put a comma after However, Therefore, In conclusion.')], promptTitle: 'Phone Bans' }),
  essay(1, { traits: { arguments: 2, development: 2, conventions: 1 }, words: 402, revisions: [rev('However the writer', 'However, the writer', 'Comma after an opener', 'Put a comma after However, Therefore, In conclusion.')], revised: true, promptTitle: 'Four-Day School Week', unitId: 'ENG_10', unitTitle: 'The Extended Response' }),
].reverse();

/* -------------------------------------------------------------------------- *
 * Stubs for the teacher's note: a fake session for adminApi, and an endpoint
 * that echoes the entry back with the note on it, as annotateEssay does.
 * -------------------------------------------------------------------------- */
supabase.auth.getSession = async () => ({ data: { session: { access_token: 'harness' } } });
const realFetch = window.fetch.bind(window);
window.fetch = async (url, opts) => {
  if (String(url).includes('/api/admin/annotateEssay')) {
    const { essayId, note } = JSON.parse(opts.body);
    await new Promise((r) => setTimeout(r, 500));
    const found = ESSAYS.find((e) => e.id === essayId);
    const text = String(note || '').trim();
    const essay = { ...found, teacherNote: text ? { text, at: new Date().toISOString(), by: 'harness' } : null };
    console.log('[harness] annotateEssay', essayId, text);
    return new Response(JSON.stringify({ ok: true, essay }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  return realFetch(url, opts);
};

function ReviewBench({ onBack }) {
  const [progress, setProgress] = useState({ GED_ENG: { ENG_1C: {}, [ESSAYS_KEY]: ESSAYS } });
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex justify-end">
      <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-950 min-h-screen p-6 sm:p-8 space-y-6">
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">← Back</button>
        <EssayReviewPanel
          studentId="harness-student"
          progress={progress}
          onEssayUpdated={(track, e) => setProgress((p) => ({
            ...p,
            [track]: { ...p[track], [ESSAYS_KEY]: p[track][ESSAYS_KEY].map((x) => (x.id === e.id ? { ...x, ...e } : x)) },
          }))}
        />
      </div>
    </div>
  );
}

function Gallery({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">← Back</button>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(DIAGRAMS).map(([name, svg]) => (
          <div key={name} data-diagram={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2">{name}</div>
            <div className="w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Harness() {
  const [open, setOpen] = useState(OPEN);
  const [isDark, toggleDark] = useDarkMode();
  const unit = getTrack(TRACK).data[UNIT];

  if (open === 'WRITING') {
    return <WritingScreen essays={EMPTY ? [] : ESSAYS} isDark={isDark} onToggleDark={toggleDark} onBack={() => setOpen(null)} onWrite={() => setOpen(null)} />;
  }
  if (open === 'REVIEW') return <ReviewBench onBack={() => setOpen(null)} />;
  if (open === 'DIAGRAMS') return <Gallery onBack={() => setOpen(null)} />;
  if (!unit) return <div className="p-8 font-black">No unit {UNIT} in {TRACK}.</div>;

  if (open) {
    const def = getTask(open);
    if (!def) return <div className="p-8 font-black">No task {open}.</div>;
    const resolved = resolveTask({ id: open });
    const ctx = {
      pool: def.buildPool(unit, { track: TRACK, unitId: UNIT }), unit, unitId: UNIT, track: TRACK,
      scores: {},
      savedData: open === 'NOTES' && SLIDE > 0
        ? { slide: Math.min(SLIDE - 1, (unit.notes?.length || 1) - 1), total: unit.notes?.length || 0, checks: {} }
        : {},
      strikes: 0, maxXP: resolved.maxXP, essayArchive: ESSAYS,
      onComplete: (score, answers, meta) => { console.log(`[harness] ${open} complete`, score, answers, meta); setOpen(null); },
      onProgress: (score, answers, meta) => console.log(`[harness] ${open} progress`, score, answers, meta),
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

  const gedTracks = TRACK_REGISTRY.filter((t) => t.group === 'GED');
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">GED harness</h1>
      <p className="text-slate-500 font-bold mb-4">{TRACK} · {UNIT} “{unit.meta.title}”, mounted without auth.</p>
      <div className="flex flex-wrap gap-2 mb-6 max-w-5xl">
        {gedTracks.flatMap((t) => getTrack(t.id).meta.map((m) => (
          <a key={`${t.id}/${m.id}`} href={`?track=${t.id}&unit=${m.id}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-black ${m.id === UNIT ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}>
            {m.id}
          </a>
        )))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {[
          ...(unit.phases || []).flatMap((phase) => (phase.tasks || []).map((t) => [t.id, `${getTask(t.id)?.label || t.id} · ${phase.title} · ${t.maxXP} XP`])),
          ['WRITING', `My Writing page · ${ESSAYS.length} synthetic essays`],
          ['REVIEW', 'Teacher drawer · essay review and note'],
          ['DIAGRAMS', `Every SVG in this unit (${Object.keys(DIAGRAMS).length}), on one page`],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setOpen(id)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-indigo-500">{id}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__gedroot ||= createRoot(el));
root.render(<Harness />);
