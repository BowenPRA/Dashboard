import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Flame, CheckCircle2, Sun, Moon, Coffee, Star,
  ClipboardCheck, ArrowRight, Trophy, Flag, RotateCcw, CalendarCheck,
} from 'lucide-react';

import { useStudentProgress } from '../utils/supabaseClient';
import { getTrackConfig } from '../components/trackRegistry';
import { Card, Badge, Button } from '../components/ui';
import ProgressLoadError from '../components/ProgressLoadError';
import useDarkMode from '../hooks/useDarkMode';
import { PLAN, REVIEW } from '../utils/studyPlanConfig';
import { hasStudyPlan } from '../utils/studyPlanAccess';
import { todayISO, dayName, fromDayISO, planSummary } from '../utils/studyPlan';

const prettyDate = (iso) =>
  fromDayISO(iso).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });

const shortDate = (iso) =>
  fromDayISO(iso).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });

const units = (n) => `${n} ${n === 1 ? 'unit' : 'units'}`;

/**
 * The day's count as pips: one per unit of the goal, then the stretch pips
 * with a star. A pip fills as a unit is finished.
 */
function Pips({ count, goal, stretch }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: Math.max(stretch, goal) }, (_, i) => {
        const filled = i < count;
        const bonus = i >= goal;
        return (
          <div
            key={i}
            className={`h-12 flex-1 rounded-2xl border-2 border-b-[4px] flex items-center justify-center transition-colors ${
              filled
                ? bonus
                  ? 'bg-amber-400 border-amber-600 text-amber-950'
                  : 'bg-[#58cc02] border-[#58a700] text-white'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
            } ${bonus && !filled ? 'border-dashed' : ''}`}
          >
            {bonus
              ? <Star className={`w-5 h-5 ${filled ? 'fill-current' : ''}`} strokeWidth={2.5} />
              : <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />}
          </div>
        );
      })}
    </div>
  );
}

/** One unit on the day's list. */
function PickCard({ item, index, bonus, onStart }) {
  const theme = getTrackConfig(item.track)?.theme || {};
  const review = item.kind === 'review';
  const done = item.doneToday;

  // What is left, in the student's terms. A unit is finished at 100 XP, or at
  // its bar (80) once the quiz has been sat — so under the bar the answer is
  // XP, and over it the answer is the quiz.
  const toBar = Math.max(0, item.minXP - item.xp);
  const left = review
    ? `Quiz today: ${Math.round(item.quizPct * 100)}% · need ${Math.round(REVIEW.quizPct * 100)}%`
    : done
      ? `${item.xp} XP`
      : toBar > 0
        ? `${item.xp} XP · ${toBar} more to reach ${item.minXP}`
        : `${item.xp} XP · the quiz finishes it`;

  const barPct = review ? Math.min(100, (item.quizPct / REVIEW.quizPct) * 100) : item.xp;

  return (
    <Card
      className={`p-6 sm:p-7 border-b-[6px] transition-all animate-in fade-in slide-in-from-bottom-4 ${
        done ? 'border-[#58cc02] dark:border-[#58a700]' : ''
      }`}
      style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border-b-[3px] ${theme.bg} ${theme.border}`}
            >
              {item.subject}
            </span>
            {review && (
              <Badge tone="purple">
                <RotateCcw className="w-3 h-3" strokeWidth={3} /> Review
              </Badge>
            )}
            {bonus && !done && (
              <Badge tone="amber">
                <Star className="w-3 h-3" strokeWidth={3} /> Bonus
              </Badge>
            )}
            {done && (
              <Badge tone="green">
                <CheckCircle2 className="w-3 h-3" strokeWidth={3} /> {review ? 'Reviewed today' : 'Finished'}
              </Badge>
            )}
            {!review && !done && item.startXP > 0 && <Badge>Started</Badge>}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
            {item.title}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
          <span className="font-black text-lg text-slate-400">{index + 1}</span>
        </div>
      </div>

      {/* XP toward the finish, with the bar a unit must clear marked on it. */}
      <div className="mb-5">
        <div className="relative w-full h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300/60 dark:border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${done ? 'bg-[#58cc02]' : theme.bg}`}
            style={{ width: `${barPct}%` }}
          />
          {!review && !done && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-slate-400/70 dark:bg-slate-500"
              style={{ left: `${item.minXP}%` }}
              title={`Finish line: ${item.minXP} XP and the quiz`}
            />
          )}
        </div>
        <p className={`mt-2 text-xs font-black tracking-wider ${done ? 'text-[#58cc02]' : 'text-slate-500 dark:text-slate-400'}`}>
          {left}
        </p>
      </div>

      {review && !done && (
        <p className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 mb-5">
          <ClipboardCheck className="w-4 h-4 text-slate-400 flex-shrink-0" strokeWidth={2.5} />
          Sit the quiz again and score {Math.round(REVIEW.quizPct * 100)}% or more.
        </p>
      )}
      {item.next && (
        <p className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 mb-5">
          <Flag className="w-4 h-4 text-slate-400 flex-shrink-0" strokeWidth={2.5} />
          <span>
            Next: <span className="font-black text-slate-800 dark:text-white">{item.next.label}</span>
            <span className="text-slate-400"> · {item.next.note}</span>
          </span>
        </p>
      )}

      <Button
        onClick={() => onStart(item)}
        variant={done ? 'secondary' : 'primary'}
        size="md"
        className="w-full"
      >
        {done ? 'Open again' : review ? 'Review' : item.xp > 0 ? 'Continue' : 'Start'}
        <ArrowRight className="w-4 h-4" strokeWidth={3} />
      </Button>
    </Card>
  );
}

/**
 * The screen itself, given a `planSummary`.
 *
 * Split from the data wrapper so `preview-plan.jsx` can mount it against a
 * synthetic progress blob — the real route sits behind Supabase auth, which
 * makes the plan's own logic the one thing that cannot be eyeballed in the
 * browser without this seam.
 */
export function PlanScreen({ name, plan, onStart, onBack, isDark, onToggleDark }) {
  const { iso, today, picks, upNext, week, totals, finishAt } = plan;
  const allFinished = totals.remaining === 0;

  const headline = !today.isStudyDay
    ? 'Weekend — no goal today'
    : today.stretchHit
      ? `All ${PLAN.stretch} done, ${name}!`
      : today.goalHit
        ? `Goal hit — nice work, ${name}`
        : today.count > 0
          ? `${units(PLAN.goal - today.count)} to go`
          : `${allFinished ? 'Review' : 'Finish'} ${units(PLAN.goal)} today`;

  const subline = !today.isStudyDay
    ? 'Rest properly. Anything you do finish still counts toward the week.'
    : today.stretchHit
      ? 'Goal and bonus both done. Anything more today is extra.'
      : today.goalHit
        ? `One more today earns the bonus star.`
        : allFinished
          ? 'Every unit is finished, so today is review: re-sit a quiz to keep it fresh.'
          : `Any ${units(PLAN.goal)} count. A third earns the bonus star.`;

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
                {prettyDate(iso)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className={`flex items-center px-4 py-2 rounded-xl border-b-[4px] shadow-sm ${
                plan.streak > 0
                  ? 'bg-[#ff9600] border-[#cc7800] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
              title="Study days in a row with the goal hit"
            >
              <Flame className="w-5 h-5 mr-2" strokeWidth={2.5} />
              <span className="text-xs font-black tracking-widest mt-0.5">{plan.streak}</span>
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Today's goal. */}
        <Card className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                {headline}
              </h2>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {subline}
              </p>
            </div>
            {today.stretchHit
              ? <Trophy className="w-9 h-9 text-amber-400 flex-shrink-0" strokeWidth={2.5} />
              : !today.isStudyDay && <Coffee className="w-9 h-9 text-amber-500 flex-shrink-0" strokeWidth={2.5} />}
          </div>

          {today.isStudyDay
            ? <Pips count={today.count} goal={PLAN.goal} stretch={PLAN.stretch} />
            : today.count > 0 && (
              <p className="text-sm font-black text-[#58cc02]">{units(today.count)} finished today</p>
            )}
        </Card>

        {/* The week: a cell per study day, and the running total. */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">This week</h3>
            <p className="text-xs font-black tracking-wider text-slate-500 dark:text-slate-400">
              <span className={plan.weekCount >= plan.weekTarget ? 'text-[#58cc02]' : 'text-slate-800 dark:text-white'}>
                {plan.weekCount}
              </span> / {plan.weekTarget} units
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            {week.map((d) => {
              const isToday = d.iso === iso;
              const past = d.iso < iso;
              // Days before the plan began were never asked for a goal, so they
              // are shown plainly rather than as misses.
              const scored = d.iso >= PLAN.startISO;
              const tone = d.goalHit
                ? 'bg-[#58cc02] border-[#58a700] text-white'
                : past && scored
                  ? d.count > 0
                    ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-600'
                    : 'bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400';
              return (
                <div key={d.iso} className="flex-1 flex flex-col items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>
                    {dayName(d.iso).slice(0, 3)}
                  </span>
                  <div
                    className={`w-full h-12 rounded-2xl border-2 border-b-[4px] flex items-center justify-center gap-1 font-black text-sm transition-all ${tone} ${
                      isToday ? 'ring-4 ring-[#1cb0f6]/30' : ''
                    }`}
                    title={`${prettyDate(d.iso)} — ${units(d.count)} finished`}
                  >
                    {past || isToday ? d.count : '·'}
                    {d.stretchHit && <Star className="w-3.5 h-3.5 fill-current" strokeWidth={2.5} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The day's list. */}
        {picks.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {picks.map((item, i) => (
              <PickCard
                key={`${item.track}-${item.unitId}`}
                item={item}
                index={i}
                bonus={today.isStudyDay && i >= PLAN.goal}
                onStart={onStart}
              />
            ))}
          </div>
        )}

        {/* What follows — also where to go when the list is done early. */}
        {upNext.length > 0 && (
          <Card className="p-6 sm:p-7">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Coming up next</h3>
            <div className="space-y-2">
              {upNext.map((u) => {
                const theme = getTrackConfig(u.track)?.theme || {};
                return (
                  <button
                    key={`${u.track}-${u.unitId}`}
                    onClick={() => onStart(u)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${theme.bg}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-black text-slate-800 dark:text-white truncate">{u.title}</span>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">{u.subject}</span>
                    </span>
                    <span className="text-xs font-black text-slate-400 tabular-nums flex-shrink-0">
                      {u.complete ? 'Finished' : `${u.xp} XP`}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {/* The whole job: how much is finished, and when the rest runs out. */}
        <Card className="p-6 sm:p-7">
          <div className="flex items-end justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Overall</h3>
              <p className="text-2xl font-black text-slate-800 dark:text-white tabular-nums leading-none">
                {totals.done}<span className="text-slate-400 text-lg"> / {totals.total} units finished</span>
              </p>
            </div>
            {plan.onTarget.of > 0 && (
              <p className="text-xs font-black text-slate-500 dark:text-slate-400 text-right">
                Goal hit on<br />
                <span className="text-slate-800 dark:text-white">{plan.onTarget.hit} of {plan.onTarget.of}</span> days
              </p>
            )}
          </div>
          <div className="h-3.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-5">
            <div
              className="h-full rounded-full bg-[#58cc02] transition-all duration-700"
              style={{ width: `${totals.total ? (totals.done / totals.total) * 100 : 0}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5">
            {totals.byTrack.map((t) => {
              const theme = getTrackConfig(t.track)?.theme || {};
              return (
                <div key={t.track}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">{t.subject}</span>
                    <span className="text-[11px] font-black tabular-nums text-slate-500 dark:text-slate-400">{t.done}/{t.total}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${theme.bg}`} style={{ width: `${t.total ? (t.done / t.total) * 100 : 0}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {allFinished ? (
            <p className="flex items-center gap-2 text-sm font-black text-[#58cc02]">
              <Trophy className="w-5 h-5" strokeWidth={2.5} /> Every unit is finished.
            </p>
          ) : (
            <p className="flex items-start gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
              <CalendarCheck className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span>
                {units(totals.remaining)} to go. At {PLAN.goal} a day you finish on{' '}
                <span className="font-black text-slate-800 dark:text-white">{shortDate(finishAt.goal)}</span>
                {finishAt.stretch !== finishAt.goal && (
                  <> — at {PLAN.stretch} a day, <span className="font-black text-slate-800 dark:text-white">{shortDate(finishAt.stretch)}</span></>
                )}.
              </span>
            </p>
          )}
        </Card>

        <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-600 leading-relaxed px-6">
          A unit is finished at 100 XP, or at 80 XP once you have done its quiz. What you
          do not finish today is first on tomorrow's list.
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
  const { user, allProgress, isLoadingDB, loadError } = useStudentProgress(navigate, 'GED_ENG');

  const [isDark, toggleDarkMode] = useDarkMode();
  const [iso] = useState(todayISO);

  const plan = useMemo(() => planSummary(allProgress, iso), [iso, allProgress]);

  if (loadError) return <ProgressLoadError />;

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
        <p className="text-xs text-slate-500 font-black tracking-widest uppercase">Building today&apos;s plan</p>
      </div>
    );
  }

  // The plan is only for the students it has been turned on for. Anyone else
  // who reaches /today directly (old link, typed URL) goes back to their menu.
  if (!hasStudyPlan(user)) return <Navigate to="/home" replace />;

  return (
    <PlanScreen
      name={user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student'}
      plan={plan}
      isDark={isDark}
      onToggleDark={toggleDarkMode}
      onBack={() => navigate('/home')}
      onStart={(item) => navigate(`/${item.track}?unit=${item.unitId}`)}
    />
  );
}
