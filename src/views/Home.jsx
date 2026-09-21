import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, LayoutDashboard, Sun, Moon, Loader2, CalendarCheck, Coffee, PenLine, Play, Check, Trophy } from 'lucide-react';
import { TRACK_REGISTRY, getTrackConfig, ARCADE_TRACK_ID } from '../components/trackRegistry';
import { supabase } from '../utils/supabaseClient';
import { isPreviewAccount } from '../utils/previewAccount';
import { hasStudyPlan } from '../utils/studyPlanAccess';
import { planForDate, todayISO } from '../utils/studyPlan';
import { getTrack } from '../data/index';
import { trackSummary, unitNumberOf, unitShortLabel } from '../utils/trackSections';
import useDarkMode from '../hooks/useDarkMode';

export default function Home() {
  const navigate = useNavigate();
  const [isDark, toggleDarkMode] = useDarkMode();
  const [visibleTracks, setVisibleTracks] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const [loading, setLoading] = useState(true);
  // The student's progress, for the bars on the cards and the Continue card.
  // Fetched AFTER the menu is on screen and never waited for: the tracks are
  // what the page is for, and a slow or failed read just leaves the bars off.
  const [progress, setProgress] = useState(null);

  // The banner only needs the plan, not the progress behind it — /today owns
  // the per-goal detail, and Home stays a one-query screen.
  const plan = useMemo(() => planForDate(todayISO()), []);

  useEffect(() => {
    // Students with no explicit enrolment see the full GED programme.
    const defaultTracks = TRACK_REGISTRY.filter(t => t.group === 'GED');

    // The Arcade is open to everyone regardless of enrolment — it is where gold
    // earned across the other tracks is spent — so it is appended to whatever
    // set a student would otherwise see, and always last.
    const withArcade = (tracks) => {
      const arcade = TRACK_REGISTRY.find(t => t.id === ARCADE_TRACK_ID);
      const rest = tracks.filter(t => t.id !== ARCADE_TRACK_ID);
      return arcade ? [...rest, arcade] : rest;
    };

    const fetchUserAndTracks = async () => {
      // A failed session read is treated as signed out — the login screen is a
      // better place to land than a spinner that never ends.
      const { data: { session } } = await supabase.auth.getSession()
        .catch(() => ({ data: { session: null } }));

      // Signed out (or the token expired): without this the page fell through to
      // the default GED menu, whoever the student was.
      if (!session) {
        navigate('/login', { replace: true });
        return;
      }

      // Prefer app_metadata (where teachers now set it); fall back to any legacy
      // user_metadata value so no existing student loses their enrolment.
      const enrolled = session?.user?.app_metadata?.enrolled_tracks
        ?? session?.user?.user_metadata?.enrolled_tracks;

      // The daily plan is for the two GED-sprint students only; everyone else
      // never sees the card.
      setShowPlan(hasStudyPlan(session?.user));

      if (isPreviewAccount(session?.user)) {
        // Preview/QA account: every track, regardless of enrolment.
        setVisibleTracks(withArcade(TRACK_REGISTRY));
      } else if (Array.isArray(enrolled) && enrolled.length > 0) {
        // RBAC: only show enrolled tracks (plus the Arcade).
        setVisibleTracks(withArcade(TRACK_REGISTRY.filter(t => enrolled.includes(t.id))));
      } else {
        setVisibleTracks(withArcade(defaultTracks));
      }
      setLoading(false);

      supabase.from('students').select('progress').eq('id', session.user.id).single()
        .then(({ data }) => setProgress(data?.progress || {}), () => {});
    };

    fetchUserAndTracks();
  }, [navigate]);

  // Past the end of the block planForDate still names units, but /today reports
  // the block as finished — so the card must not advertise a plan then.
  const hasPlan = plan.inProgram && plan.assignments.length > 0;

  const hasWriting = visibleTracks.some(t => t.id === 'GED_ENG');

  // Per-track progress, once it has arrived. The Arcade holds no units.
  const summaries = useMemo(() => {
    if (!progress) return {};
    return Object.fromEntries(
      visibleTracks
        .filter(t => t.id !== ARCADE_TRACK_ID)
        .map(t => [t.id, trackSummary(t.id, progress[t.id])])
    );
  }, [progress, visibleTracks]);

  // Where they left off: the unfinished unit touched most recently, across
  // every track they can see. Students on the daily plan get the plan instead.
  const resume = useMemo(() => {
    if (showPlan) return null;
    const best = Object.entries(summaries)
      .filter(([, s]) => s.lastUnitId)
      .sort(([, a], [, b]) => (a.lastAt < b.lastAt ? 1 : -1))[0];
    if (!best) return null;
    const [trackId, s] = best;
    const meta = getTrack(trackId).meta.find(m => m.id === s.lastUnitId);
    return meta ? { track: getTrackConfig(trackId), unitId: meta.id, title: meta.title, number: unitNumberOf(meta.id) } : null;
  }, [summaries, showPlan]);

  // Everything the student can earn, against everything they have: the same
  // two numbers the arcade's free play is measured on (arcade/economy.js).
  const overall = useMemo(() => {
    const all = Object.values(summaries);
    return {
      xp: all.reduce((n, s) => n + s.xp, 0),
      maxXp: all.reduce((n, s) => n + s.total * 100, 0),
      done: all.reduce((n, s) => n + s.done, 0),
      total: all.reduce((n, s) => n + s.total, 0),
    };
  }, [summaries]);
  const overallPct = overall.maxXp ? Math.round((overall.xp / overall.maxXp) * 100) : 0;

  // Past four subjects the big two-up cards turn the menu into a long scroll,
  // so the same cards are drawn smaller and three across. The Arcade does not
  // count: the four-subject GED student keeps the big cards.
  const compact = visibleTracks.filter(t => t.id !== ARCADE_TRACK_ID).length > 4;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen flex flex-col items-center p-6 py-12 sm:py-16 overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
      
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-2xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-sm z-50"
        title="Toggle Dark Mode"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
      </button>

      <div className="relative z-10 w-full max-w-5xl">
        
        <div className="mb-6 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-center w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-800 border-b-[5px] flex-shrink-0">
            <LayoutDashboard className="w-7 h-7 text-slate-800 dark:text-white" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 pr-14">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-white leading-tight">Curriculum</h1>
            <p className="text-xs font-black tracking-widest uppercase text-slate-400">Choose a track, or jump straight into a unit</p>
          </div>
        </div>

        {/* Everything earned, out of everything on offer. Its space is held
            while progress loads, so nothing below it jumps. */}
        <div className={`mb-8 p-5 sm:p-6 rounded-[2rem] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 border-b-[6px] animate-in fade-in duration-300 ${overall.total ? '' : 'invisible'}`}>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-400 border-b-[4px] border-amber-600 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-amber-950" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your XP</p>
                <p className="text-2xl sm:text-3xl font-black tabular-nums text-slate-800 dark:text-white leading-none">
                  {overall.xp.toLocaleString()}
                  <span className="text-base sm:text-lg text-slate-400"> / {overall.maxXp.toLocaleString()}</span>
                </p>
              </div>
            </div>
            <p className="text-sm font-black tabular-nums text-slate-500 dark:text-slate-400">
              <span className="text-slate-800 dark:text-white">{overall.done}</span> / {overall.total} units finished
              <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-800 dark:text-white">{overallPct}%</span>
            </p>
          </div>
          <div className="h-3.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700" style={{ width: `${overallPct}%` }} />
          </div>
        </div>

        {/* Today's plan — the intended way in for the two GED-sprint students.
            The tracks below stay available for free study, but the assignment is
            what the day is measured on. Hidden for every other account. */}
        {showPlan && (
        <button
          onClick={() => navigate('/today')}
          className="group relative w-full text-left mb-8 p-7 sm:p-8 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 border-b-[8px] bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 active:translate-y-[8px] active:border-b-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#ff9600] rounded-2xl flex items-center justify-center shadow-sm border-b-[4px] border-[#cc7800] flex-shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              {hasPlan
                ? <CalendarCheck className="w-8 h-8 text-white drop-shadow-sm" strokeWidth={2.5} />
                : <Coffee className="w-8 h-8 text-white drop-shadow-sm" strokeWidth={2.5} />}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1">
                {plan.dayName}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
                {hasPlan ? "Today's Plan" : 'Rest day'}
              </h2>

              {hasPlan ? (
                <div className="flex flex-wrap gap-2">
                  {plan.assignments.map((a, i) => {
                    const theme = getTrackConfig(a.track)?.theme || {};
                    return (
                      <span
                        key={`${a.track}-${a.unitId ?? i}`}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border-b-[3px] ${theme.bg} ${theme.border}`}
                      >
                        {a.subject}
                      </span>
                    );
                  })}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                    {plan.assignments.length} {plan.assignments.length === 1 ? 'unit' : 'units'}
                  </span>
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide">
                  No assigned units — review anything you like.
                </p>
              )}
            </div>

            <div className="hidden sm:flex w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 border-b-[4px] shadow-sm group-hover:bg-[#ff9600] group-hover:border-[#cc7800] group-hover:text-white transition-all flex-shrink-0">
              <ChevronRight className="w-7 h-7" strokeWidth={3} />
            </div>
          </div>
        </button>
        )}

        {/* Where you left off — straight back into the unit, not just the track. */}
        {resume && (
        <button
          onClick={() => navigate(`/${resume.track.id}?unit=${resume.unitId}`)}
          className={`group w-full mb-8 flex items-center gap-4 p-4 sm:p-5 rounded-[1.75rem] text-left text-white border-b-[6px] transition-all hover:brightness-110 active:border-b-0 active:translate-y-[6px] animate-in fade-in duration-300 ${resume.track.theme.bg} ${resume.track.theme.border}`}
        >
          <span className="w-11 h-11 rounded-xl bg-black/15 flex items-center justify-center flex-shrink-0">
            <Play className="w-5 h-5 fill-current" strokeWidth={2.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-black uppercase tracking-widest opacity-80">
              Continue · {resume.track.title}
            </span>
            <span className="block text-lg sm:text-xl font-black tracking-tight truncate">
              {resume.number && <span className="mr-2 tabular-nums opacity-80">{resume.number}</span>}
              {resume.title}
            </span>
          </span>
          <ChevronRight className="w-6 h-6 flex-shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={3} />
        </button>
        )}

        {/* My Writing — the student's saved essays. Only for students who can
            reach GED Language Arts, since that is where essays are written. */}
        {hasWriting && (
        <button
          onClick={() => navigate('/writing')}
          className="group relative w-full text-left mb-8 p-6 sm:p-7 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 border-b-[8px] bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 active:translate-y-[8px] active:border-b-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-sm border-b-[4px] border-indigo-700 flex-shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <PenLine className="w-7 h-7 text-white drop-shadow-sm" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">My Writing</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide">
                Your essays, their scores, and the errors to watch for
              </p>
            </div>
            <div className="hidden sm:flex w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 border-b-[4px] shadow-sm group-hover:bg-indigo-500 group-hover:border-indigo-700 group-hover:text-white transition-all flex-shrink-0">
              <ChevronRight className="w-6 h-6" strokeWidth={3} />
            </div>
          </div>
        </button>
        )}

        <div className={compact ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start' : 'grid grid-cols-1 md:grid-cols-2 gap-6 items-start'}>
          {visibleTracks.map((t, index) => {
            const Icon = t.icon;
            const sum = summaries[t.id];
            const isArcade = t.id === ARCADE_TRACK_ID;
            const pct = sum?.total ? Math.round((sum.xp / (sum.total * 100)) * 100) : 0;
            const allDone = sum?.total > 0 && sum.done === sum.total;
            return (
              // A card, not one big button: the header opens the track and each
              // unit chip opens that unit, and buttons cannot nest.
              <div
                key={t.id}
                className={`relative w-full flex flex-col border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors overflow-hidden animate-in fade-in slide-in-from-bottom-4
                  ${compact ? 'rounded-[1.75rem] border-b-[6px]' : 'rounded-[2.25rem] border-b-[8px]'}`}
                style={{ animationFillMode: 'both', animationDelay: `${Math.min(index, 8) * 40}ms` }}
              >
                <button
                  onClick={() => navigate(`/${t.id}`)}
                  className={`group w-full text-left flex items-center gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 active:bg-slate-100 dark:active:bg-slate-800 ${compact ? 'p-5' : 'p-6 sm:p-7'} ${isArcade ? '' : 'pb-3 sm:pb-3'}`}
                >
                  <div className={`${t.theme.bg} rounded-2xl flex items-center justify-center shadow-sm border-b-[4px] ${t.theme.border} flex-shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 ${compact ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'}`}>
                    <Icon className={`${compact ? 'w-6 h-6' : 'w-7 h-7 sm:w-8 sm:h-8'} ${t.id === 'ESL' ? 'text-amber-950' : 'text-white'} drop-shadow-sm`} strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className={`font-black text-slate-800 dark:text-white tracking-tight leading-tight ${compact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
                      {t.title}
                    </h2>
                    <p className={`text-slate-500 dark:text-slate-400 font-bold tracking-wide line-clamp-1 ${compact ? 'text-xs' : 'text-sm'}`}>
                      {t.desc}
                    </p>
                  </div>
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 border-b-[4px] flex-shrink-0 group-hover:bg-[#1cb0f6] group-hover:border-[#1899d6] group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" strokeWidth={3} />
                  </div>
                </button>

                {/* XP for the track, then for every unit in it. The space is
                    held while progress loads so the cards do not jump. */}
                {!isArcade && (
                  <div className={`${compact ? 'px-5 pb-5' : 'px-6 sm:px-7 pb-6'} ${sum?.total ? '' : 'invisible'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${allDone ? 'bg-amber-400' : t.theme.bg}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11px] font-black tabular-nums text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {(sum?.xp ?? 0).toLocaleString()}<span className="text-slate-400"> / {((sum?.total ?? 0) * 100).toLocaleString()} XP</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-black tabular-nums text-slate-400 whitespace-nowrap">
                        {allDone && <Check className="w-3.5 h-3.5 text-amber-500" strokeWidth={4} />}
                        {sum?.done ?? 0}/{sum?.total ?? 0} done
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {(sum?.units || []).map((u) => (
                        <button
                          key={u.id}
                          onClick={() => navigate(`/${t.id}?unit=${u.id}`)}
                          title={`${u.title} — ${u.xp} / 100 XP${u.complete ? ' · finished' : ''}`}
                          className={`flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-lg border-2 border-b-[3px] text-[11px] font-black tabular-nums transition-all hover:-translate-y-0.5 active:translate-y-0 active:border-b-2
                            ${u.complete
                              ? 'bg-amber-400 border-amber-600 text-amber-950'
                              : u.xp > 0
                                ? `bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 ${t.theme.text}`
                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'}`}
                        >
                          <span className="opacity-70">{unitShortLabel(u.id)}</span>
                          <span className={`px-1 rounded ${u.complete ? 'bg-black/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                            {u.complete && <Check className="inline w-3 h-3 -mt-0.5 mr-0.5" strokeWidth={4} />}
                            {u.xp}<span className="opacity-50">/100</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}