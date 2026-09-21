import React from 'react';
import { AlertTriangle, CheckSquare, Square, Clock, ChevronRight } from 'lucide-react';
import { getTrackConfig } from '../trackRegistry';
import { getTrack } from '../../data/index';
import { unitNumberOf } from '../../utils/trackSections';
import ActivityStrip from './ActivityStrip';
import { relTime, daysSince, weekActivity, latestUnit, attentionReasons, INACTIVE_DAYS } from './teacherStats';

/** "Working on": the unit a student touched last, in its track's colour. */
function WorkingOn({ student }) {
  const latest = latestUnit(student);
  if (!latest) {
    return <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Nothing started yet</p>;
  }
  const cfg = getTrackConfig(latest.track);
  const meta = getTrack(latest.track).meta.find((m) => m.id === latest.unitId);
  const number = unitNumberOf(latest.unitId);
  return (
    <div className="min-w-0">
      <p className={`text-[10px] font-black uppercase tracking-widest truncate ${cfg?.theme.text || 'text-slate-400'}`}>
        {cfg?.title || latest.track}
      </p>
      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
        {number && <span className="tabular-nums mr-1.5">{number}</span>}
        {meta?.title || latest.unitId}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 max-w-[9rem] h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className={`h-full rounded-full ${latest.xp >= 100 ? 'bg-emerald-500' : cfg?.theme.bg || 'bg-slate-400'}`} style={{ width: `${Math.min(latest.xp, 100)}%` }} />
        </div>
        <span className="text-[11px] font-black tabular-nums text-slate-500 dark:text-slate-400">{latest.xp}</span>
      </div>
    </div>
  );
}

/**
 * One line per student — what a teacher scans for: who, what they are on, how
 * much they did this fortnight, and when they were last seen. Replaces the old
 * three-up cards, which showed a lifetime XP total and little else.
 */
export default function RosterList({ students, classNameById = {}, showClass = true, selectMode = false, picked, onPick, onOpen }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y-2 divide-slate-100 dark:divide-slate-800">
      {students.map((student) => {
        const isPicked = picked?.has(student.id);
        const week = weekActivity(student);
        const reasons = attentionReasons(student);
        const inactive = daysSince(student.last_active) >= INACTIVE_DAYS;
        const className = showClass && student.class_id ? classNameById[student.class_id] : null;

        return (
          <button
            key={student.id}
            onClick={() => (selectMode ? onPick(student.id) : onOpen(student))}
            className={`group w-full text-left flex items-center gap-3 sm:gap-5 px-4 sm:px-5 py-3.5 transition-colors
              ${isPicked ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            {selectMode && (
              isPicked
                ? <CheckSquare className="w-5 h-5 text-indigo-500 flex-shrink-0" strokeWidth={2.5} />
                : <Square className="w-5 h-5 text-slate-300 flex-shrink-0" strokeWidth={2.5} />
            )}

            {/* Who */}
            <div className="flex items-center gap-3 min-w-0 w-[42%] sm:w-56 flex-shrink-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg border-b-[3px] flex-shrink-0
                ${student.is_locked ? 'bg-rose-500 border-rose-700' : 'bg-[#1cb0f6] border-[#1899d6]'}`}>
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-800 dark:text-white truncate leading-tight">{student.name}</p>
                <p className="text-[11px] font-bold text-slate-400 truncate">
                  {[className, student.pra_id ? `PRA ${student.pra_id}` : null].filter(Boolean).join(' · ') || 'No PRA id'}
                </p>
              </div>
            </div>

            {/* What they are on */}
            <div className="hidden md:block flex-1 min-w-0">
              <WorkingOn student={student} />
            </div>

            {/* The fortnight */}
            <div className="hidden lg:flex flex-col items-start gap-1 w-52 flex-shrink-0">
              <ActivityStrip recent={student.recent} />
              {week && (
                <p className="text-[11px] font-bold text-slate-400">
                  {week.tasks > 0
                    ? <><span className="text-slate-600 dark:text-slate-300 font-black">{week.tasks}</span> {week.tasks === 1 ? 'task' : 'tasks'} · {week.days} {week.days === 1 ? 'day' : 'days'} this week</>
                    : 'Nothing this week'}
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="hidden sm:block w-20 flex-shrink-0 text-right">
              <p className="font-black tabular-nums text-slate-800 dark:text-white leading-tight">{(student.total_xp || 0).toLocaleString()}</p>
              <p className="text-[11px] font-bold text-slate-400">XP · {student.units_completed || 0} done</p>
            </div>

            {/* Last seen / why to look */}
            <div className="flex flex-col items-end gap-1 ml-auto sm:ml-0 sm:w-28 flex-shrink-0">
              <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md border
                ${inactive
                  ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900'
                  : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'}`}>
                <Clock className="w-3 h-3" strokeWidth={2.5} /> {relTime(student.last_active)}
              </span>
              {student.is_locked && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md border text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800" title={reasons.join(' · ')}>
                  <AlertTriangle className="w-3 h-3" strokeWidth={2.5} /> AI lock
                </span>
              )}
            </div>

            <ChevronRight className="hidden sm:block w-5 h-5 text-slate-300 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" strokeWidth={3} />
          </button>
        );
      })}
    </div>
  );
}
