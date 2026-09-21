import React, { useMemo, useState } from 'react';
import { Table2 } from 'lucide-react';
import { TRACK_REGISTRY, ARCADE_TRACK_ID, getTrackConfig } from '../trackRegistry';
import { getTrack } from '../../data/index';
import { sectionsOf, unitShortLabel } from '../../utils/trackSections';
import { daysSince, xpCellClass, XP_LEGEND, RECENT_DAYS } from './teacherStats';

const xpOf = (student, track, unitId) => student.units?.[track]?.[unitId]?.[0] || 0;
const touchedOf = (student, track, unitId) => student.units?.[track]?.[unitId]?.[1] || null;

/**
 * Students down the side, a track's units across the top, unit XP in the cells
 * — the one view that answers "where is everyone in Year 7 Maths?" at a glance.
 *
 * Columns are grouped under the track's coursebook sections where it has them.
 * A cell with a blue ring was worked on in the last week, which is what
 * separates "stuck at 45" from "on 45 and climbing". Click any cell to open
 * that student on that unit.
 *
 * `preferTracks` (the selected class's enrolled tracks) adds chips for tracks
 * nobody has started yet; any track with progress in this group is offered.
 * `isExpected(student, trackId)` says a student SHOULD be on a track (their
 * class is enrolled in it) — those keep their empty row, because an empty row
 * is the finding. Everyone else with nothing in the track is left out, so
 * "Everyone" does not pad Year 7 Maths with the GED students.
 */
export default function Gradebook({ students, preferTracks = [], isExpected = () => false, onOpen }) {
  const tracks = useMemo(() => {
    const counts = {};
    for (const s of students) {
      for (const [t, units] of Object.entries(s.units || {})) {
        if (Object.keys(units || {}).length) counts[t] = (counts[t] || 0) + 1;
      }
    }
    return TRACK_REGISTRY
      .filter((t) => t.id !== ARCADE_TRACK_ID && getTrack(t.id).meta.length > 0)
      .filter((t) => counts[t.id] || preferTracks.includes(t.id))
      .map((t) => ({ ...t, students: counts[t.id] || 0 }));
  }, [students, preferTracks]);

  const [chosen, setChosen] = useState(null);
  // Fall back whenever the chosen track drops out of the list (class changed).
  const busiest = [...tracks].sort((a, b) => b.students - a.students)[0];
  const trackId = tracks.some((t) => t.id === chosen) ? chosen : busiest?.id;

  if (!trackId) {
    return (
      <div className="py-16 flex flex-col items-center text-slate-400">
        <Table2 className="w-12 h-12 mb-4 opacity-50" strokeWidth={2} />
        <p className="font-black text-lg tracking-tight">No progress to chart yet</p>
        <p className="text-sm font-bold">The grid fills in as these students start units.</p>
      </div>
    );
  }

  const cfg = getTrackConfig(trackId);
  const sections = sectionsOf(trackId, getTrack(trackId).meta);
  const units = sections.flatMap((s) => s.units);
  const showSections = sections.length > 1;
  const hasWork = (s) => Object.keys(s.units?.[trackId] || {}).length > 0;
  // Those who have not started sink to the bottom, otherwise in roster order.
  const rows = students
    .filter((s) => hasWork(s) || isExpected(s, trackId))
    .sort((a, b) => Number(hasWork(b)) - Number(hasWork(a)));
  const hidden = students.length - rows.length;

  const stickyCol = 'sticky left-0 z-10 bg-white dark:bg-slate-900';

  return (
    <div>
      {/* Track chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tracks.map((t) => {
          const on = t.id === trackId;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setChosen(t.id)}
              className={`flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl border-2 border-b-[3px] text-xs font-black tracking-wide transition-all active:border-b-2 active:translate-y-[1px]
                ${on ? `${t.theme.bg} ${t.theme.border} text-white` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}
            >
              <Icon className="w-4 h-4" strokeWidth={2.5} />
              {t.title}
              <span className={`px-1.5 py-0.5 rounded-md tabular-nums ${on ? 'bg-black/15' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>{t.students}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-0 text-sm w-full">
            <thead>
              {showSections && (
                <tr>
                  <th className={`${stickyCol} border-b-2 border-slate-100 dark:border-slate-800`} />
                  {sections.map((s) => (
                    <th key={s.key} colSpan={s.units.length} className="px-1 pt-3 pb-1 border-b-2 border-slate-100 dark:border-slate-800 border-l-2 first:border-l-0 text-left">
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white ${cfg.theme.bg}`}>{s.label}</span>
                      <span className="ml-2 text-xs font-black text-slate-600 dark:text-slate-300">{s.title}</span>
                    </th>
                  ))}
                  <th colSpan={2} className="border-b-2 border-slate-100 dark:border-slate-800 border-l-2" />
                </tr>
              )}
              <tr className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                <th className={`${stickyCol} text-left px-4 py-2.5 border-b-2 border-slate-200 dark:border-slate-800 min-w-[10rem]`}>Student</th>
                {sections.map((s) => s.units.map((u, i) => (
                  <th
                    key={u.id}
                    title={u.title}
                    className={`px-1 py-2.5 border-b-2 border-slate-200 dark:border-slate-800 tabular-nums cursor-help ${i === 0 && showSections ? 'border-l-2 border-l-slate-100 dark:border-l-slate-800' : ''}`}
                  >
                    {unitShortLabel(u.id)}
                  </th>
                )))}
                <th className="px-3 py-2.5 border-b-2 border-slate-200 dark:border-slate-800 border-l-2 border-l-slate-100 dark:border-l-slate-800">Done</th>
                <th className="px-3 py-2.5 border-b-2 border-slate-200 dark:border-slate-800">Track</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((s) => {
                const done = units.filter((u) => xpOf(s, trackId, u.id) >= 100).length;
                const pct = Math.round(units.reduce((sum, u) => sum + xpOf(s, trackId, u.id), 0) / units.length);
                return (
                  <tr key={s.id} className="group">
                    <td className={`${stickyCol} px-4 py-1.5 border-b border-slate-100 dark:border-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-800`}>
                      <button onClick={() => onOpen(s, { track: trackId })} className="font-black text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 truncate max-w-[11rem] text-left block">
                        {s.name}
                      </button>
                    </td>
                    {sections.map((sec) => sec.units.map((u, i) => {
                      const xp = xpOf(s, trackId, u.id);
                      const at = touchedOf(s, trackId, u.id);
                      const fresh = at && daysSince(at) < RECENT_DAYS;
                      return (
                        <td key={u.id} className={`p-1 border-b border-slate-100 dark:border-slate-800 text-center ${i === 0 && showSections ? 'border-l-2 border-l-slate-100 dark:border-l-slate-800' : ''}`}>
                          <button
                            onClick={() => onOpen(s, { track: trackId, unitId: u.id })}
                            title={`${s.name} — ${u.title}: ${xp} XP`}
                            className={`w-11 h-8 rounded-lg text-xs font-black tabular-nums transition-transform hover:scale-110 ${xpCellClass(xp)} ${fresh ? 'ring-2 ring-sky-400 ring-offset-1 ring-offset-white dark:ring-offset-slate-900' : ''}`}
                          >
                            {xp || '·'}
                          </button>
                        </td>
                      );
                    }))}
                    <td className="px-3 border-b border-slate-100 dark:border-slate-800 border-l-2 border-l-slate-100 dark:border-l-slate-800 text-center font-black tabular-nums text-slate-700 dark:text-slate-200 whitespace-nowrap">
                      {done}<span className="text-slate-400">/{units.length}</span>
                    </td>
                    <td className="px-3 border-b border-slate-100 dark:border-slate-800 text-center font-black tabular-nums text-slate-700 dark:text-slate-200">{pct}%</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="bg-slate-50 dark:bg-slate-800/40">
                <td className="sticky left-0 z-10 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Average <span className="normal-case tracking-normal font-bold text-slate-400">· of those started</span>
                </td>
                {sections.map((sec) => sec.units.map((u, i) => {
                  const started = rows.map((s) => xpOf(s, trackId, u.id)).filter((x) => x > 0);
                  const avg = started.length ? Math.round(started.reduce((a, b) => a + b, 0) / started.length) : 0;
                  return (
                    <td key={u.id} className={`p-1 text-center ${i === 0 && showSections ? 'border-l-2 border-l-slate-100 dark:border-l-slate-800' : ''}`}>
                      <p className="text-xs font-black tabular-nums text-slate-700 dark:text-slate-200">{started.length ? avg : '·'}</p>
                      <p className="text-[10px] font-bold tabular-nums text-slate-400" title={`${started.length} of ${rows.length} students have started`}>{started.length}/{rows.length}</p>
                    </td>
                  );
                }))}
                <td colSpan={2} className="border-l-2 border-l-slate-100 dark:border-l-slate-800" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-[11px] font-bold text-slate-500 dark:text-slate-400">
        <span className="font-black uppercase tracking-widest text-slate-400">Unit XP</span>
        {XP_LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className={`w-5 h-4 rounded ${xpCellClass(l.xp)}`} /> {l.label}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-4 rounded bg-slate-100 dark:bg-slate-800 ring-2 ring-sky-400 ring-offset-1 ring-offset-slate-50 dark:ring-offset-slate-950" /> worked on in the last {RECENT_DAYS} days
        </span>
        <span className="text-slate-400">Hover a column for the unit title · click a cell to open the student there</span>
        {hidden > 0 && <span className="text-slate-400">· {hidden} not on this track {hidden === 1 ? 'is' : 'are'} hidden</span>}
      </div>
    </div>
  );
}
