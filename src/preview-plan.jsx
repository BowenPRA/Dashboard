// Dev-only harness for the daily study plan.
//
// `/today` sits behind Supabase auth, and the one thing worth eyeballing — does
// a day's goal actually flip when the right work lands on the right date — needs
// a progress blob to look at. So this synthesises one, and drives the real
// `PlanScreen` and the real engine with it. Entry point: preview-plan.html.
// Not part of the production build.
import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PlanScreen } from './views/Today';
import { getTrack } from './data/index';
import { resolveTask, unitXPOf } from './tasks/taskRegistry';
import {
  planForDate, evaluateDay, weekOf, computeStreak, missedThisWeek,
  coverageReport, buildQueue, slotsPerWeek, addDays, toDayISO,
} from './utils/studyPlan';
import { PROGRAM, WEEK_PATTERN, SUBJECT_LABEL, PLAN_TRACKS } from './utils/studyPlanConfig';

/** A day inside the programme, so the harness never lands on "not started". */
const DAY_ONE = PROGRAM.startISO;

/**
 * Build a progress blob by replaying "he did the work" against real dates.
 *
 * `mode`:
 *   none     — nothing done
 *   partial  — assessment only on the target day (one of two goals)
 *   full     — assessment + every practice task, on the target day
 * `history` days before the target are always filled fully, which is what the
 * streak and the week strip read.
 */
function synthProgress(targetISO, mode, historyDays) {
  const progress = {};

  const fill = (iso, level) => {
    for (const a of planForDate(iso).assignments) {
      if (!a.unitId) continue;
      const unit = getTrack(a.track).data[a.unitId];
      const tasks = (unit?.phases || []).flatMap((p) => p.tasks || []).map(resolveTask).filter(Boolean);
      progress[a.track] ||= {};
      progress[a.track][a.unitId] ||= {};

      for (const t of tasks) {
        if (t.maxXP <= 0) continue;
        const isAssessment = t.id === 'ASSESSMENT';
        if (level === 'partial' && !isAssessment) continue;
        // 80% on the assessment clears the 70% gate; practice pays out full.
        const score = isAssessment ? Math.round(t.maxXP * 0.8) : t.maxXP;
        const at = new Date(`${iso}T10:00:00`).toISOString();
        const rec = progress[a.track][a.unitId][t.dbKey] || { current: 0, attempts: [] };
        rec.current = Math.max(rec.current, score);
        rec.last = score;
        rec.updatedAt = at;
        rec.attempts = [...(rec.attempts || []), { score, at }];
        progress[a.track][a.unitId][t.dbKey] = rec;
      }
    }
  };

  // Backfill the study days before the target.
  let cursor = targetISO;
  for (let i = 0; i < historyDays; i += 1) {
    cursor = addDays(cursor, -1);
    while (planForDate(cursor).assignments.length === 0 && cursor > PROGRAM.startISO) {
      cursor = addDays(cursor, -1);
    }
    if (cursor < PROGRAM.startISO) break;
    fill(cursor, 'full');
  }

  if (mode !== 'none') fill(targetISO, mode);
  return progress;
}

const SCENARIOS = [
  { key: 'none', label: 'Nothing done yet', history: 3 },
  { key: 'partial', label: 'Assessment only (1 of 2 goals)', history: 3 },
  { key: 'full', label: 'Both units cleared', history: 4 },
  { key: 'nostreak', label: 'Missed yesterday', history: 0 },
];

function Harness() {
  const [scenario, setScenario] = useState('partial');
  const [offset, setOffset] = useState(0);
  const [dark, setDark] = useState(false);

  const iso = useMemo(() => {
    // Walk forward `offset` study days from day one.
    let cursor = DAY_ONE;
    let seen = 0;
    while (seen < offset) {
      cursor = addDays(cursor, 1);
      if (planForDate(cursor).assignments.length > 0) seen += 1;
    }
    return cursor;
  }, [offset]);

  const spec = SCENARIOS.find((s) => s.key === scenario) || SCENARIOS[0];
  const progress = useMemo(
    () => synthProgress(iso, spec.key === 'nostreak' ? 'none' : spec.key, spec.history),
    [iso, spec]
  );

  const day = useMemo(() => evaluateDay(iso, progress), [iso, progress]);
  const week = useMemo(
    () => weekOf(iso).map((d) => ({ iso: d, ...evaluateDay(d, progress) })),
    [iso, progress]
  );

  const coverage = useMemo(() => coverageReport(progress), [progress]);
  const queue = useMemo(() => buildQueue(coverage), [coverage]);

  const toggleDark = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    setDark(next);
  };

  return (
    <div>
      <div className="bg-slate-900 text-slate-100 p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">Scenario</span>
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => setScenario(s.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black ${
                scenario === s.key ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">Study day</span>
          <button onClick={() => setOffset(Math.max(0, offset - 1))} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-black">◀</button>
          <span className="text-xs font-black tabular-nums">#{offset + 1} · {iso} · {day.dayName}</span>
          <button onClick={() => setOffset(offset + 1)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-black">▶</button>
          <button onClick={toggleDark} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-black ml-4">
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* The numbers behind the plan, so the weighting can be checked at a glance. */}
        <div className="text-[11px] font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-700">
          <div>
            <span className="text-amber-400">weekly mix:</span>{' '}
            {PLAN_TRACKS.map((t) => `${SUBJECT_LABEL[t]} ${slotsPerWeek(t)}`).join(' · ')}
            {' = '}{PLAN_TRACKS.reduce((n, t) => n + slotsPerWeek(t), 0)} slots / {WEEK_PATTERN.length} days
          </div>
          {coverage.map((c) => (
            <div key={c.track}>
              <span className="text-amber-400">{c.subject}:</span>{' '}
              {c.builtCount}/{c.blueprintTotal} built · {c.slotsPerWeek}×/wk ·
              repeats every {c.repeatDays ?? '—'}d{c.strained ? ' ⚠ STRAINED' : ''} · [{c.built.join(', ') || 'none'}]
            </div>
          ))}
          <div>
            <span className="text-amber-400">build queue:</span>{' '}
            {queue.slice(0, 5).map((m) => m.id).join(' → ')}
          </div>
          <div>
            <span className="text-amber-400">unit XP (today&apos;s two):</span>{' '}
            {day.assignments.map((a) => {
              const u = getTrack(a.track).data[a.unitId];
              const s = (progress[a.track] || {})[a.unitId] || {};
              return `${a.unitId}=${u ? unitXPOf(u, s) : '?'}`;
            }).join(' · ')}
          </div>
        </div>
      </div>

      <PlanScreen
        name="Vi Khoi"
        iso={iso}
        day={day}
        streak={computeStreak(progress, iso)}
        missed={missedThisWeek(progress, iso)}
        week={week}
        isDark={dark}
        onToggleDark={toggleDark}
        onBack={() => console.log('back')}
        onStart={(item) => console.log('start', item.track, item.unitId)}
      />
    </div>
  );
}

// Sanity line for the console: today's real date, so drift between the harness
// clock and the programme window is obvious.
console.log('[plan harness] real today =', toDayISO(new Date()), '· programme starts', PROGRAM.startISO);

createRoot(document.getElementById('root')).render(<Harness />);
