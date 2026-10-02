import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, Loader2, ChevronLeft, AlertTriangle, Layers, Target, Flame,
  CalendarCheck, CheckCircle2, Star, RotateCcw, ListOrdered, History,
} from 'lucide-react';

import { getRoster, getStudentDetail } from '../utils/adminApi';
import { getTrackConfig } from '../components/trackRegistry';
import { Card, Badge } from '../components/ui';
import { PLAN, REVIEW } from '../utils/studyPlanConfig';
import {
  planSummary, history, forecast, todayISO, addDays, fromDayISO, dayName,
} from '../utils/studyPlan';

const shortDate = (iso) =>
  fromDayISO(iso).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });

/** A date short enough for a headline number: "Oct 21". */
const stampDate = (iso) =>
  fromDayISO(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

/** How far back the day-by-day table reaches. */
const HISTORY_DAYS = 14;

/** The student the plan was built for, so the page opens on him. */
const DEFAULT_STUDENT = 'vikhoi';
const collapse = (name) => String(name || '').toLowerCase().replace(/\s+/g, '');

function Stat({ icon: Icon, label, value, tone = 'slate', sub }) {
  const tones = {
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700',
    blue: 'bg-[#1cb0f6] text-white border-[#1899d6]',
    green: 'bg-[#58cc02] text-white border-[#58a700]',
    amber: 'bg-amber-400 text-amber-950 border-amber-600',
    rose: 'bg-rose-500 text-white border-rose-700',
  };
  return (
    <Card className="p-6 flex items-center">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 border-b-[4px] flex-shrink-0 ${tones[tone]}`}>
        <Icon className="w-7 h-7" strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 truncate">{label}</p>
        <p className="text-3xl font-black text-slate-800 dark:text-white truncate">{value}</p>
        {sub && <p className="text-xs font-bold text-slate-400 truncate">{sub}</p>}
      </div>
    </Card>
  );
}

/**
 * One unit as a row: subject dot, id and title, and its XP. `compact` drops the
 * bar, for the narrow schedule cards where the title needs the room.
 */
function UnitRow({ u, right, compact = false }) {
  const theme = getTrackConfig(u.track)?.theme || {};
  return (
    <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50">
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${theme.bg}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black text-slate-800 dark:text-white truncate">{u.title}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">
          {u.subject} · {u.unitId}
        </p>
      </div>
      {right}
      {!compact && (
        <div className="w-20 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex-shrink-0">
          <div className={`h-full rounded-full ${u.complete ? 'bg-[#58cc02]' : theme.bg}`} style={{ width: `${u.xp}%` }} />
        </div>
      )}
      <span className={`text-xs font-black text-right flex-shrink-0 tabular-nums ${compact ? '' : 'w-14'} ${u.xp > 0 ? 'text-slate-500' : 'text-slate-300 dark:text-slate-600'}`}>
        {u.xp > 0 ? `${u.xp} XP` : 'New'}
      </span>
    </li>
  );
}

/**
 * The plan for one student, given their progress: the numbers, today's list,
 * the day-by-day record and the projected schedule.
 *
 * Split from the data wrapper so `preview-plan.jsx` can mount it against a
 * progress blob without the teacher API behind it.
 */
export function PlanReport({ progress, iso }) {
  const plan = useMemo(() => planSummary(progress, iso), [progress, iso]);
  const days = useMemo(
    () => history(plan.state, addDays(iso, -(HISTORY_DAYS - 1)), iso).reverse(),
    [plan, iso]
  );
  const schedule = useMemo(() => forecast(plan.state, iso), [plan, iso]);

  const { today, totals, finishAt } = plan;

  return (
    <>
      {/* Headline numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <Stat
          icon={Layers} label="Units finished" value={`${totals.done} / ${totals.total}`}
          tone="blue" sub={totals.remaining ? `${totals.remaining} still to finish` : 'nothing left to finish'}
        />
        <Stat
          icon={Target} label="Today"
          value={today.isStudyDay ? `${today.count} / ${today.goal}` : today.count}
          tone={today.goalHit ? 'green' : 'amber'}
          sub={!today.isStudyDay ? 'weekend — no goal' : today.goalHit ? 'goal hit' : 'goal not hit yet'}
        />
        <Stat
          icon={Flame} label="Streak" value={plan.streak}
          tone={plan.streak > 0 ? 'green' : 'slate'}
          sub={plan.onTarget.of > 0
            ? `goal hit on ${plan.onTarget.hit} of ${plan.onTarget.of} days`
            : `counting from ${shortDate(PLAN.startISO)}`}
        />
        <Stat
          icon={CalendarCheck} label="Finishes" value={finishAt.goal ? stampDate(finishAt.goal) : 'Done'}
          tone={finishAt.goal ? 'slate' : 'green'}
          sub={finishAt.goal
            ? `at ${PLAN.goal} a day · ${stampDate(finishAt.stretch)} at ${PLAN.stretch}${plan.pace !== null ? ` · now ${plan.pace.toFixed(1)} a day` : ''}`
            : 'every unit is finished'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Today's list, as the student sees it */}
        <Card className="p-7">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Today's list</h2>
          </div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            What the student is shown for {dayName(iso)}. Dealt from where each unit stood this
            morning, so it does not reshuffle as he works. Any unit he finishes counts, on the
            list or not.
          </p>
          {plan.picks.length === 0 ? (
            <p className="text-sm font-bold text-slate-400">No units in the plan's tracks.</p>
          ) : (
            <ul className="space-y-2">
              {plan.picks.map((u) => (
                <UnitRow
                  key={`${u.track}-${u.unitId}`}
                  u={u}
                  right={
                    u.doneToday
                      ? <Badge tone="green"><CheckCircle2 className="w-3 h-3" strokeWidth={3} /> Done</Badge>
                      : u.kind === 'review'
                        ? <Badge tone="purple"><RotateCcw className="w-3 h-3" strokeWidth={3} /> Review</Badge>
                        : u.next && <span className="hidden sm:block text-[11px] font-bold text-slate-400 truncate max-w-[9rem]">Next: {u.next.label}</span>
                  }
                />
              ))}
            </ul>
          )}
          <p className="text-xs font-bold text-slate-400 mt-5 leading-relaxed">
            A unit is finished at 100 XP, or at 80 XP with its quiz sat. Once everything is
            finished the list turns to review: a quiz re-sat at {Math.round(REVIEW.quizPct * 100)}% or better.
          </p>
        </Card>

        {/* By subject */}
        <Card className="p-7">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-6 h-6 text-[#1cb0f6]" strokeWidth={2.5} />
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">By subject</h2>
          </div>
          <div className="space-y-5">
            {totals.byTrack.map((t) => {
              const theme = getTrackConfig(t.track)?.theme || {};
              const pct = t.total ? (t.done / t.total) * 100 : 0;
              return (
                <div key={t.track}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border-b-[3px] ${theme.bg} ${theme.border}`}>
                      {t.subject}
                    </span>
                    <span className="text-sm font-black tabular-nums text-slate-600 dark:text-slate-300">
                      {t.done} / {t.total}
                      <span className="text-slate-400"> · {t.total - t.done} left</span>
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${theme.bg} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs font-bold text-slate-400 mt-6 leading-relaxed">
            The daily list mixes the subjects in proportion to what each has left, so they all
            run out at about the same time.
          </p>
        </Card>
      </div>

      {/* Day by day */}
      <div className="flex items-center gap-3 mb-2">
        <History className="w-6 h-6 text-indigo-500" strokeWidth={2.5} />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Day by day</h2>
      </div>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-5 leading-relaxed max-w-3xl">
        Units finished on each of the last {HISTORY_DAYS} days, read back from the timestamps on
        his attempts. Weekends appear only when something was finished on them.
      </p>
      <Card className="p-3 sm:p-4 mb-12">
        <ul className="divide-y-2 divide-slate-100 dark:divide-slate-800">
          {days.map((d) => {
            const scored = d.isStudyDay && d.iso >= PLAN.startISO;
            const isToday = d.iso === iso;
            return (
              <li key={d.iso} className="flex items-center gap-4 px-3 py-3">
                <span className={`w-28 text-xs font-black uppercase tracking-widest flex-shrink-0 ${isToday ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>
                  {isToday ? 'Today' : shortDate(d.iso)}
                </span>
                <span className={`w-10 h-10 rounded-xl border-2 border-b-[3px] flex items-center justify-center font-black text-sm flex-shrink-0 ${
                  d.goalHit
                    ? 'bg-[#58cc02] border-[#58a700] text-white'
                    : scored && !isToday
                      ? d.count > 0
                        ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-600'
                        : 'bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  {d.count}
                </span>
                <div className="min-w-0 flex-1 flex flex-wrap gap-1.5">
                  {[...d.finished, ...d.reviewed].map((u) => {
                    const theme = getTrackConfig(u.track)?.theme || {};
                    return (
                      <span
                        key={`${u.track}-${u.unitId}`}
                        title={u.title}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${theme.bg}`}
                      >
                        {u.unitId}{d.reviewed.includes(u) ? ' · review' : ''}
                      </span>
                    );
                  })}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex-shrink-0">
                  {!d.isStudyDay
                    ? 'Weekend'
                    : !scored
                      ? 'Before the plan'
                      : d.stretchHit
                        ? 'Goal + bonus'
                        : d.goalHit
                          ? 'Goal hit'
                          : isToday
                            ? 'In progress'
                            : d.count > 0 ? 'Short' : 'Missed'}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* What is left, and when */}
      <div className="flex items-center gap-3 mb-2">
        <ListOrdered className="w-6 h-6 text-amber-500" strokeWidth={2.5} />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">What is left, and when</h2>
      </div>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-5 leading-relaxed max-w-3xl">
        Every unfinished unit in the order the plan will hand it out — started units first,
        nearest to finished first, then new units in course order — laid over the coming study
        days at {PLAN.goal} a day. A projection: the list is re-dealt each morning from what
        actually got done.
      </p>
      {schedule.length === 0 ? (
        <Card className="p-7 flex items-center gap-3 text-[#58cc02]">
          <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
          <p className="text-sm font-black">Every unit in the plan is finished. The daily list is now review.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {schedule.map((day) => (
            <Card key={day.iso} className={`p-5 ${day.iso === iso ? 'border-[#1cb0f6] ring-4 ring-[#1cb0f6]/20' : ''}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                {day.iso === iso ? 'Today' : shortDate(day.iso)}
              </p>
              <ul className="space-y-2">
                {day.units.map((u) => <UnitRow key={`${u.track}-${u.unitId}`} u={u} compact />)}
              </ul>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs font-bold text-slate-400 dark:text-slate-600 leading-relaxed max-w-3xl mt-8">
        Edit <code className="font-mono">src/utils/studyPlanConfig.js</code> to change the daily goal,
        the stretch, the study days or the tracks; every screen follows it. Nothing is stored —
        the plan is worked out from the student's progress each time it is opened.
      </p>
    </>
  );
}

export default function StudyPlan() {
  const navigate = useNavigate();

  const [roster, setRoster] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);
  const [error, setError] = useState('');

  const iso = todayISO();

  useEffect(() => {
    (async () => {
      try {
        const { roster: list } = await getRoster();
        const rows = list || [];
        setRoster(rows);
        const target = rows.find((s) => collapse(s.name) === DEFAULT_STUDENT) || rows[0];
        if (target) setStudentId(target.id);
      } catch (err) {
        setError(err.message || 'Could not load the roster.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!studentId) return;
    let alive = true;
    (async () => {
      setIsLoadingStudent(true);
      setError('');
      try {
        const d = await getStudentDetail(studentId);
        if (alive) setDetail(d);
      } catch (err) {
        if (alive) setError(err.message || 'Could not load this student.');
      } finally {
        if (alive) setIsLoadingStudent(false);
      }
    })();
    return () => { alive = false; };
  }, [studentId]);

  // Memoised: a fresh `{}` on every render would re-key the report's useMemos
  // and recompute the whole plan each time the component re-renders.
  const progress = useMemo(() => detail?.progress || {}, [detail]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-4" strokeWidth={3} />
        <p className="text-xs font-black tracking-widest uppercase text-slate-400">Loading plan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/teacher-dashboard')}
              className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 transition-all"
              title="Back to Teacher Command"
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={3} />
            </button>
            <div className="w-14 h-14 bg-indigo-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-sm border-b-[4px] border-indigo-700">
              <CalendarDays className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Study Plan</h1>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                {PLAN.title} · finish {PLAN.goal} units a day, {PLAN.stretch} offered · Mon–Fri · goals counted from {shortDate(PLAN.startISO)}
              </p>
            </div>
          </div>

          <select
            value={studentId || ''}
            onChange={(e) => setStudentId(e.target.value)}
            className="px-5 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[1.5rem] text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-400 shadow-sm cursor-pointer"
          >
            {roster.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}{s.pra_id ? ` · ${s.pra_id}` : ''}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-5 py-4 rounded-2xl font-bold">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
            {error}
          </div>
        )}

        {isLoadingStudent && (
          <div className="mb-6 flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest">
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={3} /> Loading progress
          </div>
        )}

        <PlanReport progress={progress} iso={iso} />
      </div>
    </div>
  );
}
