import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, Loader2, ChevronLeft, AlertTriangle, Hammer, RefreshCw,
  Layers, Target, CircleDashed, CheckCircle2, Flame, Star,
} from 'lucide-react';

import { getRoster, getStudentDetail } from '../utils/adminApi';
import { getTrackConfig } from '../components/trackRegistry';
import { unitXPOf } from '../tasks/taskRegistry';
import { getTrack } from '../data/index';
import { Card, Badge } from '../components/ui';
import { PROGRAM, WEEK_PATTERN, BENCHMARK, SUBJECT_LABEL } from '../utils/studyPlanConfig';
import {
  planForDate, evaluateDay, coverageReport, buildQueue, unfinishedUnits,
  todayISO, addDays, weekOf, computeStreak, fromDayISO, slotsPerWeek,
} from '../utils/studyPlan';

/** How many weeks of the rotation the grid prints. */
const GRID_WEEKS = 4;

const shortDate = (iso) =>
  fromDayISO(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

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
        <p className="text-3xl font-black text-slate-800 dark:text-white">{value}</p>
        {sub && <p className="text-xs font-bold text-slate-400 truncate">{sub}</p>}
      </div>
    </Card>
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
        // The plan was built for one student; open on him rather than making
        // the teacher pick every time.
        const target = rows.find((s) => String(s.pra_id) === '025') || rows[0];
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

  // Memoised: a fresh `{}` on every render would re-key every useMemo below it
  // and recompute the whole report each time the component re-renders.
  const progress = useMemo(() => detail?.progress || {}, [detail]);

  const coverage = useMemo(() => coverageReport(progress), [progress]);
  const queue = useMemo(() => buildQueue(coverage), [coverage]);
  const unfinished = useMemo(() => unfinishedUnits(progress, unitXPOf), [progress]);
  const streak = useMemo(() => computeStreak(progress, iso), [progress, iso]);

  /** The rotation grid: GRID_WEEKS of Mon–Fri, from this week's Monday. */
  const grid = useMemo(() => {
    const firstMonday = iso < PROGRAM.startISO ? PROGRAM.startISO : weekOf(iso)[0];
    return Array.from({ length: GRID_WEEKS }, (_, w) =>
      WEEK_PATTERN.map((_d, i) => {
        const date = addDays(firstMonday, w * 7 + i);
        return { ...planForDate(date), evaluated: evaluateDay(date, progress) };
      })
    );
  }, [iso, progress]);

  const totalBuilt = coverage.reduce((n, c) => n + c.builtCount, 0);
  const totalBlueprint = coverage.reduce((n, c) => n + c.blueprintTotal, 0);
  const strainedTracks = coverage.filter((c) => c.strained);

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
                {PROGRAM.title} · {PROGRAM.weeks} weeks from {shortDate(PROGRAM.startISO)} · 2 units a day, Mon–Fri
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

        {/* Headline numbers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Stat
            icon={Layers} label="Units built" value={`${totalBuilt} / ${totalBlueprint}`}
            tone="blue" sub={`${totalBlueprint - totalBuilt} still to author`}
          />
          <Stat
            icon={Flame} label="Current streak" value={streak}
            tone={streak > 0 ? 'green' : 'slate'} sub="days both units cleared"
          />
          <Stat
            icon={Target} label="Daily bar" value={`${Math.round(BENCHMARK.assessmentPct * 100)}% + ${BENCHMARK.practiceXP} XP`}
            tone="amber" sub="assessment & practice, same day"
          />
          <Stat
            icon={RefreshCw} label="Strained tracks" value={strainedTracks.length}
            tone={strainedTracks.length ? 'rose' : 'slate'}
            sub={strainedTracks.length ? strainedTracks.map((t) => t.subject).join(', ') : 'rotation has room'}
          />
        </div>

        {/* Coverage per track */}
        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-5">
          Coverage &amp; rotation load
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {coverage.map((c) => {
            const theme = getTrackConfig(c.track)?.theme || {};
            const pct = c.blueprintTotal ? (c.builtCount / c.blueprintTotal) * 100 : 0;
            return (
              <Card key={c.track} className={`p-6 border-b-[6px] ${c.strained ? 'border-rose-300 dark:border-rose-800' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border-b-[3px] ${theme.bg} ${theme.border}`}>
                    {c.subject}
                  </span>
                  <span className="text-xs font-black text-slate-400 tracking-widest">
                    {c.slotsPerWeek}×/wk
                  </span>
                </div>

                <p className="text-3xl font-black text-slate-800 dark:text-white mb-1">
                  {c.builtCount}<span className="text-slate-300 dark:text-slate-600"> / {c.blueprintTotal}</span>
                </p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">units built</p>

                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                  <div className={`h-full ${theme.bg} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                </div>

                <div className={`px-4 py-3 rounded-xl border-2 text-xs font-bold leading-relaxed ${
                  c.strained
                    ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {c.repeatDays === null
                    ? 'No units — this slot is empty in the plan.'
                    : <>A unit comes back every <strong className="font-black">{c.repeatDays} days</strong>.
                       {c.strained ? ' Too tight to count as review — needs more units.' : ''}</>}
                </div>
              </Card>
            );
          })}
        </div>

        {/* What to build */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card className="p-7">
            <div className="flex items-center gap-3 mb-2">
              <Hammer className="w-6 h-6 text-amber-500" strokeWidth={2.5} />
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Build queue</h2>
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Ranked by how hard the rotation is repeating itself, then by the blueprint's own
              priority. Build from the top and the repeat interval loosens fastest.
            </p>

            {queue.length === 0 ? (
              <p className="text-sm font-bold text-slate-400">Every blueprint module is built. Nothing to author.</p>
            ) : (
              <ol className="space-y-2">
                {queue.map((m, i) => {
                  const theme = getTrackConfig(m.track)?.theme || {};
                  return (
                    <li key={`${m.track}-${m.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50">
                      <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-[11px] font-black text-slate-400 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${theme.bg}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-slate-800 dark:text-white truncate">
                          {m.id} · {m.title}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">
                          {m.subject} · {m.strand}
                        </p>
                      </div>
                      {m.critical && <Badge tone="rose">Never drop</Badge>}
                      {m.strained && !m.critical && <Badge tone="amber">{m.repeatDays}d loop</Badge>}
                    </li>
                  );
                })}
              </ol>
            )}
          </Card>

          <Card className="p-7">
            <div className="flex items-center gap-3 mb-2">
              <CircleDashed className="w-6 h-6 text-[#1cb0f6]" strokeWidth={2.5} />
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Still unfinished</h2>
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Built units this student has never taken to 100 XP. The rotation will reach them,
              but these are the real holes in his coverage right now.
            </p>

            {unfinished.length === 0 ? (
              <div className="flex items-center gap-3 text-[#58cc02]">
                <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                <p className="text-sm font-black">Every built unit is at 100 XP.</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {unfinished.map((u) => {
                  const theme = getTrackConfig(u.track)?.theme || {};
                  return (
                    <li key={`${u.track}-${u.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50">
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${theme.bg}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-slate-800 dark:text-white truncate">{u.title}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{u.subject}</p>
                      </div>
                      <div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex-shrink-0">
                        <div className={`h-full ${theme.bg} rounded-full`} style={{ width: `${u.xp}%` }} />
                      </div>
                      <span className="text-xs font-black text-slate-500 w-14 text-right flex-shrink-0">{u.xp} XP</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>

        {/* The rotation grid */}
        <div className="flex items-center gap-3 mb-2">
          <Star className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            The next {GRID_WEEKS} weeks
          </h2>
        </div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-3xl">
          Each subject walks its own unit list in order, so the gap between two sightings of the
          same unit is as wide as the built content allows. Past days are shaded by how many of
          the two units were cleared.
        </p>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[900px] border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="w-16" />
                {WEEK_PATTERN.map((d) => (
                  <th key={d.day} className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-1">
                    {d.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((week, w) => (
                <tr key={w}>
                  <td className="text-[10px] font-black uppercase tracking-widest text-slate-400 align-middle text-right pr-2">
                    W{(week[0].weekIndex ?? w) + 1}
                  </td>
                  {week.map((day) => {
                    const isToday = day.dateISO === iso;
                    const past = day.dateISO < iso;
                    const ev = day.evaluated;
                    return (
                      <td key={day.dateISO} className="align-top">
                        <div className={`h-full p-3 rounded-2xl border-2 border-b-[4px] transition-all ${
                          isToday
                            ? 'bg-white dark:bg-slate-900 border-[#1cb0f6] ring-4 ring-[#1cb0f6]/20'
                            : past && ev.complete
                              ? 'bg-lime-50 dark:bg-lime-900/20 border-lime-200 dark:border-lime-800'
                              : past
                                ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {shortDate(day.dateISO)}
                            </span>
                            {past && (
                              <span className={`text-[10px] font-black ${ev.complete ? 'text-lime-600' : 'text-rose-500'}`}>
                                {ev.done}/{ev.total}
                              </span>
                            )}
                          </div>

                          {!day.inProgram ? (
                            <p className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest py-2">
                              Outside block
                            </p>
                          ) : (
                            <div className="space-y-1.5">
                              {day.assignments.map((a, i) => {
                                const theme = getTrackConfig(a.track)?.theme || {};
                                return (
                                  <div key={i} className="flex items-start gap-2">
                                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${theme.bg}`} />
                                    <div className="min-w-0">
                                      <p className="text-[11px] font-black text-slate-700 dark:text-slate-200 leading-tight truncate">
                                        {a.unitId || '— none —'}
                                      </p>
                                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 truncate">
                                        {a.subject}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs font-bold text-slate-400 dark:text-slate-600 leading-relaxed max-w-3xl mt-4">
          Weekly mix: {Object.entries(SUBJECT_LABEL)
            .map(([t, label]) => `${label} ${slotsPerWeek(t)}`)
            .join(' · ')} — ten slots. Edit <code className="font-mono">src/utils/studyPlanConfig.js</code> to
          change the pattern, the daily bar or the block dates; every screen follows it.
          {getTrack('GED_SCIENCE').meta.length <= 1 && ' Science is the thinnest track and repeats hardest — build there first.'}
        </p>
      </div>
    </div>
  );
}
