// Dev-only harness for the daily study plan.
//
// `/today` and `/study-plan` sit behind Supabase auth, and the thing worth
// eyeballing — does the right unit land on the right day, and does the day
// count it — needs a progress blob to look at. So this synthesises one, and
// drives the real `PlanScreen`, the real `PlanReport` and the real engine with
// it. Entry point: preview-plan.html. Not part of the production build.
//
// To look at a real student instead, drop their progress into
// `src/preview-plan-real.json.local` as `{ "<name>": <progress> }`. `*.local`
// is gitignored, so a student's records never reach the repo.
import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PlanScreen } from './views/Today';
import { PlanReport } from './views/StudyPlan';
import { resolveTask, unitXPOf, isUnitComplete } from './tasks/taskRegistry';
import {
  planState, planSummary, picksFor, queueAt, addDays, toDayISO, isStudyDay, dayName,
} from './utils/studyPlan';
import { PLAN } from './utils/studyPlanConfig';

const realFiles = import.meta.glob('./preview-plan-real.json.local', {
  eager: true, query: '?raw', import: 'default',
});
const REAL = Object.values(realFiles)[0] ? JSON.parse(Object.values(realFiles)[0]) : {};

// --- writing synthetic work -------------------------------------------------

const stamp = (iso, hour = 10) => new Date(`${iso}T${String(hour).padStart(2, '0')}:00:00`).toISOString();

const tasksOf = (unit) =>
  (unit?.phases || []).flatMap((p) => p.tasks || []).map(resolveTask).filter((t) => t && t.maxXP > 0);

/** Logs one attempt on one task, the way `recordAttempt` would have. */
function attempt(progress, u, task, score, at) {
  progress[u.track] ||= {};
  progress[u.track][u.unitId] ||= {};
  const prev = progress[u.track][u.unitId][task.dbKey] || { current: 0, attempts: [] };
  progress[u.track][u.unitId][task.dbKey] = {
    current: Math.max(prev.current, score),
    last: score,
    updatedAt: at,
    attempts: [...prev.attempts, { score, at }],
  };
}

/** Every task to full marks on `iso` — the unit is finished that day. */
function finish(progress, u, iso, hour) {
  for (const t of tasksOf(u.unit)) attempt(progress, u, t, t.maxXP, stamp(iso, hour));
}

/** The opening tasks only, up to about `xp` — a unit left half done. */
function dabble(progress, u, iso, xp) {
  let sum = 0;
  for (const t of tasksOf(u.unit)) {
    if (t.id === 'ASSESSMENT' || sum >= xp) continue;
    attempt(progress, u, t, t.maxXP, stamp(iso));
    sum += t.maxXP;
  }
}

/** Re-sits a finished unit's quiz on `iso` at `pct`. */
function resit(progress, u, iso, pct) {
  const quiz = tasksOf(u.unit).find((t) => t.id === 'ASSESSMENT');
  if (quiz) attempt(progress, u, quiz, Math.round(quiz.maxXP * pct), stamp(iso, 15));
}

const prevStudyDay = (iso) => {
  let d = addDays(iso, -1);
  while (!isStudyDay(d)) d = addDays(d, -1);
  return d;
};

/** Finishes the first `n` units on the day's list, on that day. */
function doToday(progress, iso, n) {
  const picks = picksFor(planState(progress), iso).picks.slice(0, n);
  picks.forEach((u, i) => (u.kind === 'review' ? resit(progress, u, iso, 0.85) : finish(progress, u, iso, 10 + i)));
}

/**
 * A believable few weeks: four units left half done a while ago, then the goal
 * met on each of the last `days` study days, always with the units the plan
 * would have listed that morning.
 */
function midway(iso, days = 4) {
  const progress = {};
  const all = planState(progress).units;
  [all[1], all[4], all[12], all[20]].filter(Boolean)
    .forEach((u, i) => dabble(progress, u, addDays(iso, -20), 35 + i * 12));

  const dates = [];
  for (let d = prevStudyDay(iso), i = 0; i < days; i += 1, d = prevStudyDay(d)) dates.unshift(d);
  for (const d of dates) doToday(progress, d, PLAN.goal);
  return progress;
}

/** Everything finished long ago, except the last `leave` units of the queue. */
function nearlyDone(iso, leave) {
  const progress = {};
  const queue = queueAt(planState(progress), iso);
  queue.slice(0, queue.length - leave).forEach((u, i) => finish(progress, u, addDays(iso, -30 + (i % 20))));
  return progress;
}

const SCENARIOS = [
  { key: 'fresh', label: 'Nothing done, ever', build: () => ({}) },
  { key: 'midway', label: 'Mid-way, nothing yet today', build: (iso) => midway(iso) },
  { key: 'one', label: '1 finished today', build: (iso) => { const p = midway(iso); doToday(p, iso, 1); return p; } },
  { key: 'goal', label: `Goal hit (${PLAN.goal})`, build: (iso) => { const p = midway(iso); doToday(p, iso, PLAN.goal); return p; } },
  { key: 'stretch', label: `Bonus too (${PLAN.stretch})`, build: (iso) => { const p = midway(iso); doToday(p, iso, PLAN.stretch); return p; } },
  { key: 'missed', label: 'Missed yesterday', build: (iso) => midway(prevStudyDay(iso), 3) },
  { key: 'tail', label: '2 left — review fills the list', build: (iso) => nearlyDone(iso, 2) },
  { key: 'done', label: 'All finished, 1 reviewed today', build: (iso) => { const p = nearlyDone(iso, 0); doToday(p, iso, 1); return p; } },
  ...Object.keys(REAL).map((name) => ({ key: `real:${name}`, label: `REAL · ${name}`, build: () => REAL[name] })),
];

function Harness() {
  const [scenario, setScenario] = useState(SCENARIOS[0].key);
  const [offset, setOffset] = useState(0);
  const [view, setView] = useState('student');
  const [dark, setDark] = useState(false);

  const iso = useMemo(() => addDays(toDayISO(new Date()), offset), [offset]);
  const spec = SCENARIOS.find((s) => s.key === scenario) || SCENARIOS[0];
  const progress = useMemo(() => spec.build(iso), [spec, iso]);
  const plan = useMemo(() => planSummary(progress, iso), [progress, iso]);

  // The replay must land exactly where the live rule does, for every unit.
  const drift = plan.state.units.filter(
    (u) => u.xp !== unitXPOf(u.unit, u.scores) || u.complete !== isUnitComplete(u.unit, u.scores)
  );
  const queue = queueAt(plan.state, iso);

  const toggleDark = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    setDark(next);
  };

  const chip = (on) => `px-3 py-1.5 rounded-lg text-xs font-black ${on ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-300'}`;

  return (
    <div>
      <div className="bg-slate-900 text-slate-100 p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">Scenario</span>
          {SCENARIOS.map((s) => (
            <button key={s.key} onClick={() => setScenario(s.key)} className={chip(scenario === s.key)}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">Day</span>
          <button onClick={() => setOffset(offset - 1)} className={chip(false)}>◀</button>
          <span className="text-xs font-black tabular-nums" data-role="harness-day">{iso} · {dayName(iso)}</span>
          <button onClick={() => setOffset(offset + 1)} className={chip(false)}>▶</button>
          <button onClick={() => setOffset(0)} className={chip(false)}>today</button>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 ml-4">View</span>
          <button onClick={() => setView('student')} className={chip(view === 'student')}>Student</button>
          <button onClick={() => setView('teacher')} className={chip(view === 'teacher')}>Teacher</button>
          <button onClick={toggleDark} className={chip(false)}>{dark ? 'Light' : 'Dark'}</button>
        </div>

        {/* The numbers behind the screen, so the dealing can be checked at a glance. */}
        <div className="text-[11px] font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-700" data-role="harness-debug">
          <div>
            <span className="text-amber-400">replay vs live rule:</span>{' '}
            {drift.length === 0
              ? `agree on all ${plan.state.units.length} units`
              : `⚠ DRIFT on ${drift.map((u) => u.unitId).join(', ')}`}
          </div>
          <div>
            <span className="text-amber-400">today:</span>{' '}
            {plan.today.count} counted · finished [{plan.today.finished.map((u) => u.unitId).join(', ')}]
            {' '}· reviewed [{plan.today.reviewed.map((u) => u.unitId).join(', ')}]
            {' '}· streak {plan.streak} · on goal {plan.onTarget.hit}/{plan.onTarget.of}
            {' '}· week {plan.weekCount}/{plan.weekTarget}
          </div>
          <div>
            <span className="text-amber-400">list:</span>{' '}
            {plan.picks.map((u) => `${u.unitId}(${u.kind === 'review' ? 'review' : `${u.startXP}→${u.xp}`})`).join(' · ')}
          </div>
          <div>
            <span className="text-amber-400">queue this morning ({queue.length}):</span>{' '}
            {queue.map((u) => `${u.unitId}:${u.startXP}`).join(' ')}
          </div>
          <div>
            <span className="text-amber-400">finishes:</span>{' '}
            {plan.finishAt.goal || '—'} at goal pace · {plan.finishAt.stretch || '—'} at stretch
          </div>
        </div>
      </div>

      {view === 'student' ? (
        <PlanScreen
          name="Vi Khoi"
          plan={plan}
          isDark={dark}
          onToggleDark={toggleDark}
          onBack={() => console.log('back')}
          onStart={(item) => console.log('start', item.track, item.unitId)}
        />
      ) : (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <PlanReport progress={progress} iso={iso} />
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
