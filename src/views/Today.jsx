import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Flame, CheckCircle2, Circle, Sun, Moon, Coffee,
  ClipboardCheck, Dumbbell, CalendarDays, ArrowRight, AlertTriangle, Trophy,
} from 'lucide-react';

import { useStudentProgress } from '../utils/supabaseClient';
import { getTrackConfig } from '../components/trackRegistry';
import { Card, Badge, Button } from '../components/ui';
import useDarkMode from '../hooks/useDarkMode';
import { PROGRAM, BENCHMARK } from '../utils/studyPlanConfig';
import { hasStudyPlan } from '../utils/studyPlanAccess';
import {
  todayISO, dayName, evaluateDay, weekOf, computeStreak, missedThisWeek,
  totalStudyDays, fromDayISO,
} from '../utils/studyPlan';

const prettyDate = (iso) =>
  fromDayISO(iso).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });

/** One goal row: a label, a progress bar and a tick. */
function Goal({ icon: Icon, label, detail, value, target, done, accent }) {
  const pct = target > 0 ? Math.min(100, (value / target) * 100) : 0;
  return (
    <div className="flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border-b-[3px] transition-colors ${
          done
            ? 'bg-[#58cc02] border-[#58a700] text-white'
            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
        }`}
      >
        <Icon className="w-5 h-5" strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
            {label}
          </span>
          <span
            className={`text-xs font-black tracking-wider whitespace-nowrap ${
              done ? 'text-[#58cc02]' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {detail}
          </span>
        </div>
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300/60 dark:border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${done ? 'bg-[#58cc02]' : accent}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {done
        ? <CheckCircle2 className="w-6 h-6 text-[#58cc02] flex-shrink-0" strokeWidth={2.5} />
        : <Circle className="w-6 h-6 text-slate-300 dark:text-slate-700 flex-shrink-0" strokeWidth={2.5} />}
    </div>
  );
}

/** One of the day's two assigned units. */
function AssignmentCard({ item, index, onStart }) {
  const theme = getTrackConfig(item.track)?.theme || {};

  if (item.missing || item.unavailable) {
    return (
      <Card className="p-7 border-dashed">
        <Badge tone="rose" className="mb-4">
          <AlertTriangle className="w-3 h-3" strokeWidth={3} /> {item.subject}
        </Badge>
        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Nothing to assign yet</h3>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
          This slot is waiting on a {item.subject} unit being built. Do the other unit today and
          take the extra time on writing.
        </p>
      </Card>
    );
  }

  return (
    <Card
      className={`p-7 border-b-[6px] transition-all animate-in fade-in slide-in-from-bottom-4 ${
        item.complete ? 'border-[#58cc02] dark:border-[#58a700]' : ''
      }`}
      style={{ animationFillMode: 'both', animationDelay: `${index * 120}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border-b-[3px] ${theme.bg} ${theme.border}`}
            >
              {item.subject}
            </span>
            {item.complete && (
              <Badge tone="green">
                <CheckCircle2 className="w-3 h-3" strokeWidth={3} /> Done today
              </Badge>
            )}
          </div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
            {item.title}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
          <span className="font-black text-lg text-slate-400">{index + 1}</span>
        </div>
      </div>

      <div className="space-y-5 mb-6">
        {item.assessment ? (
          <Goal
            icon={ClipboardCheck}
            label="Assessment"
            detail={`${Math.round(item.assessment.pct * 100)}% · need ${Math.round(BENCHMARK.assessmentPct * 100)}%`}
            value={item.assessment.pct}
            target={BENCHMARK.assessmentPct}
            done={item.assessment.done}
            accent="bg-[#2563eb]"
          />
        ) : (
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            No assessment in this unit yet — practice only
          </p>
        )}

        <Goal
          icon={Dumbbell}
          label="Practice today"
          detail={`${item.practice.xp} / ${item.practice.target} XP`}
          value={item.practice.xp}
          target={item.practice.target}
          done={item.practice.done}
          accent="bg-[#ff9600]"
        />
      </div>

      <Button
        onClick={() => onStart(item)}
        variant={item.complete ? 'secondary' : 'primary'}
        size="md"
        className="w-full"
      >
        {item.complete ? 'Open again' : 'Start'}
        <ArrowRight className="w-4 h-4" strokeWidth={3} />
      </Button>
    </Card>
  );
}

/**
 * The screen itself, given everything it needs.
 *
 * Split from the data wrapper so `preview-plan.jsx` can mount it against a
 * synthetic progress blob — the real route sits behind Supabase auth, which
 * makes the plan's own logic the one thing that cannot be eyeballed in the
 * browser without this seam.
 */
export function PlanScreen({
  name, iso, day, streak, missed, week, onStart, onBack, isDark, onToggleDark,
}) {
  const weekLabel = day.weekIndex !== null
    ? `Week ${day.weekIndex + 1} of ${PROGRAM.weeks}`
    : PROGRAM.title;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={onBack}
              className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 dark:text-slate-400 flex-shrink-0"
              title="Back"
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={3} />
            </button>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-white truncate">
                Today's Plan
              </h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">
                {weekLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className={`flex items-center px-4 py-2 rounded-xl border-b-[4px] shadow-sm ${
                streak > 0
                  ? 'bg-[#ff9600] border-[#cc7800] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
              title="Consecutive study days completed"
            >
              <Flame className="w-5 h-5 mr-2" strokeWidth={2.5} />
              <span className="text-xs font-black tracking-widest mt-0.5">{streak}</span>
            </div>

            <button
              onClick={onToggleDark}
              className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* The week at a glance — five dots, one per study day. */}
        <div className="flex items-center justify-between gap-2">
          {week.map((d) => {
            const isToday = d.iso === iso;
            const past = d.iso < iso;
            const tone = d.complete
              ? 'bg-[#58cc02] border-[#58a700] text-white'
              : past
                ? 'bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400';
            return (
              <div key={d.iso} className="flex-1 flex flex-col items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>
                  {dayName(d.iso).slice(0, 3)}
                </span>
                <div
                  className={`w-full h-12 rounded-2xl border-2 border-b-[4px] flex items-center justify-center font-black text-sm transition-all ${tone} ${
                    isToday ? 'ring-4 ring-[#1cb0f6]/30' : ''
                  }`}
                  title={`${prettyDate(d.iso)} — ${d.done}/${d.total} units`}
                >
                  {d.total > 0 ? `${d.done}/${d.total}` : '—'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Today */}
        {!day.isStudyDay ? (
          <Card className="p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-[1.75rem] bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-200 dark:border-amber-800 flex items-center justify-center mb-6">
              <Coffee className="w-9 h-9 text-amber-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">
              Rest day
            </h2>
            <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
              {prettyDate(iso)} has no assigned units. The plan runs Monday to Friday — rest
              properly, or use the catch-up list below.
            </p>
          </Card>
        ) : !day.inProgram ? (
          <Card className="p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-[1.75rem] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6">
              <CalendarDays className="w-9 h-9 text-slate-400" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">
              {day.beforeStart ? 'Not started yet' : 'Block finished'}
            </h2>
            <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
              {day.beforeStart
                ? `${PROGRAM.title} begins on ${prettyDate(PROGRAM.startISO)}.`
                : `The ${PROGRAM.weeks}-week block is over — ${totalStudyDays()} study days. Pick any track and keep reviewing.`}
            </p>
          </Card>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                  {day.complete ? `Nice work, ${name}` : `${dayName(iso)}, two units`}
                </h2>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
                  {prettyDate(iso)}
                </p>
              </div>
              {day.complete && <Trophy className="w-9 h-9 text-amber-400 flex-shrink-0" strokeWidth={2.5} />}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {day.assignments.map((item, i) => (
                <AssignmentCard key={`${item.track}-${item.unitId ?? i}`} item={item} index={i} onStart={onStart} />
              ))}
            </div>
          </>
        )}

        {/* Catch-up: past study days this week that were not cleared. */}
        {missed.length > 0 && (
          <Card className="p-7">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-6 h-6 text-amber-500" strokeWidth={2.5} />
              <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                Catch up
              </h3>
            </div>
            <div className="space-y-3">
              {missed.map((d) => (
                <div key={d.dateISO}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    {dayName(d.dateISO)} — {d.done} of {d.total} done
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {d.assignments.filter((a) => !a.complete && a.unitId).map((a) => (
                      <button
                        key={a.unitId}
                        onClick={() => onStart(a)}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        {a.subject} · {a.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-600 leading-relaxed px-6">
          A unit counts for the day when you score {Math.round(BENCHMARK.assessmentPct * 100)}% or more
          on its Assessment <em>today</em> and log {BENCHMARK.practiceXP} XP of practice
          <em> today</em>. Yesterday's score does not carry over — that is the point.
        </p>
      </div>
    </div>
  );
}

/** The route: pulls the student's progress, then hands it to `PlanScreen`. */
export default function Today() {
  const navigate = useNavigate();
  // The plan spans every GED track, so it reads `allProgress` rather than one
  // track's slice. The `track` argument only decides which slice `saveScore`
  // would write to, and this screen never saves.
  const { user, allProgress, isLoadingDB } = useStudentProgress(navigate, 'GED_ENG');

  const [isDark, toggleDarkMode] = useDarkMode();
  const [iso] = useState(todayISO);

  const day = useMemo(() => evaluateDay(iso, allProgress), [iso, allProgress]);
  const streak = useMemo(() => computeStreak(allProgress, iso), [iso, allProgress]);
  const missed = useMemo(() => missedThisWeek(allProgress, iso), [iso, allProgress]);
  const week = useMemo(
    () => weekOf(iso).map((d) => ({ iso: d, ...evaluateDay(d, allProgress) })),
    [iso, allProgress]
  );

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
        <p className="text-xs text-slate-500 font-black tracking-widest uppercase">Building today&apos;s plan</p>
      </div>
    );
  }

  // The plan is for the two GED-sprint students only. Anyone else who reaches
  // /today directly (old link, typed URL) is sent back to their track menu.
  if (!hasStudyPlan(user)) return <Navigate to="/home" replace />;

  return (
    <PlanScreen
      name={user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student'}
      iso={iso}
      day={day}
      streak={streak}
      missed={missed}
      week={week}
      isDark={isDark}
      onToggleDark={toggleDarkMode}
      onBack={() => navigate('/home')}
      onStart={(item) => navigate(`/${item.track}?unit=${item.unitId}`)}
    />
  );
}
