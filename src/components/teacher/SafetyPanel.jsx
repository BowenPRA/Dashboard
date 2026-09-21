import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Loader2, LockOpen, ChevronDown } from 'lucide-react';
import { getTrack } from '../../data/index';
import { getTrackConfig } from '../trackRegistry';
import { getTask } from '../../tasks/taskRegistry';
import { isUnitKey, STRIKE_LOG_KEY } from '../../utils/progressSchema';
import { unitNumberOf } from '../../utils/trackSections';
import { relTime } from './teacherStats';

const REASON = {
  harmful: { label: 'Inappropriate', cls: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  garbage: { label: 'Nonsense', cls: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
};

/** Every unit with a strike against it or a flagged answer on file. */
function flaggedUnits(progress = {}) {
  const out = [];
  for (const [track, trackData] of Object.entries(progress || {})) {
    if (!trackData || typeof trackData !== 'object') continue;
    for (const [unitId, unitData] of Object.entries(trackData)) {
      if (!isUnitKey(unitId) || !unitData || typeof unitData !== 'object' || Array.isArray(unitData)) continue;
      const strikes = Number(unitData.strikes) || 0;
      const log = Array.isArray(unitData[STRIKE_LOG_KEY]) ? unitData[STRIKE_LOG_KEY] : [];
      if (strikes > 0 || log.length > 0) out.push({ track, unitId, strikes, log });
    }
  }
  // Locked first, then most strikes, then most recently flagged.
  return out.sort((a, b) => b.strikes - a.strikes || ((a.log.at(-1)?.at || '') < (b.log.at(-1)?.at || '') ? 1 : -1));
}

function Entry({ entry }) {
  const reason = REASON[entry.reason] || REASON.garbage;
  return (
    <div className={`rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 ${entry.clearedAt ? 'opacity-60' : ''}`}>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-widest ${reason.cls}`}>{reason.label}</span>
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{getTask(entry.task)?.label || entry.task || 'Task'}</span>
        <span className="text-[11px] font-bold text-slate-400" title={entry.at ? new Date(entry.at).toLocaleString() : ''}>{relTime(entry.at)}</span>
        {entry.clearedAt && <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">· cleared {relTime(entry.clearedAt).toLowerCase()}</span>}
      </div>
      {entry.question && <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Q: {entry.question}</p>}
      <p className="text-sm font-medium text-slate-800 dark:text-slate-100 whitespace-pre-wrap break-words border-l-4 border-slate-200 dark:border-slate-700 pl-3">
        {entry.text || <span className="italic text-slate-400">(empty)</span>}
      </p>
    </div>
  );
}

/**
 * The teacher's view of the AI grader's warnings, inside StudentProfileDrawer.
 *
 * Three "inappropriate or nonsense" answers in a unit disable AI marking for
 * that unit. This shows each unit with a strike, WHAT the student typed each
 * time (the strike log — see progressSchema), and the button that resets the
 * count. The log survives a reset, greyed out, so a second offence is read
 * against the first.
 *
 * Strikes from before the log existed have a count and no text; the panel says
 * so rather than showing an empty list.
 *
 * `onClear(track, unitId)` resets one unit; it returns a promise.
 */
export default function SafetyPanel({ progress, onClear }) {
  const units = flaggedUnits(progress);
  const active = units.filter((u) => u.strikes > 0);
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  if (units.length === 0) return null;
  const locked = active.filter((u) => u.strikes >= 3).length;

  const clear = async (u) => {
    setBusy(`${u.track}/${u.unitId}`);
    setError('');
    try {
      await onClear(u.track, u.unitId);
    } catch (err) {
      setError(err.message || 'Could not reset the strikes.');
    } finally {
      setBusy(null);
    }
  };

  const calm = active.length === 0;

  return (
    <div className={`rounded-[1.75rem] border-2 shadow-sm overflow-hidden ${calm
      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      : 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900'}`}>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full flex items-center gap-3 px-5 py-4 text-left">
        {calm
          ? <ShieldCheck className="w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={2.5} />
          : <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0" strokeWidth={2.5} />}
        <span className="flex-1 min-w-0">
          <span className={`block font-black uppercase tracking-widest text-sm ${calm ? 'text-slate-500 dark:text-slate-400' : 'text-rose-700 dark:text-rose-300'}`}>AI grader warnings</span>
          <span className="block text-xs font-bold text-slate-500 dark:text-slate-400">
            {calm
              ? 'No active strikes — earlier flagged answers are kept below.'
              : `${active.length} ${active.length === 1 ? 'unit' : 'units'} with strikes${locked ? ` · ${locked} locked (AI marking off)` : ''}`}
          </span>
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} strokeWidth={3} />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4">
          {error && <p className="text-xs font-bold text-rose-600">{error}</p>}
          {units.map((u) => {
            const cfg = getTrackConfig(u.track);
            const meta = getTrack(u.track).meta.find((m) => m.id === u.unitId);
            const key = `${u.track}/${u.unitId}`;
            const isLocked = u.strikes >= 3;
            // A count with fewer logged entries means strikes from before the log existed.
            const unlogged = Math.max(0, u.strikes - u.log.filter((e) => !e.clearedAt).length);
            return (
              <div key={key}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${cfg?.theme.text || 'text-slate-400'}`}>{cfg?.title || u.track}</p>
                    <p className="font-black text-slate-800 dark:text-white leading-tight">
                      {unitNumberOf(u.unitId) && <span className="tabular-nums mr-1.5">{unitNumberOf(u.unitId)}</span>}
                      {meta?.title || u.unitId}
                    </p>
                  </div>
                  {u.strikes > 0 && (
                    <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-black uppercase tracking-widest ${isLocked
                      ? 'bg-rose-500 text-white border-rose-700'
                      : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'}`}>
                      {isLocked ? 'Locked · 3/3' : `${u.strikes}/3 strikes`}
                    </span>
                  )}
                  {u.strikes > 0 && (
                    <button
                      onClick={() => clear(u)}
                      disabled={busy === key}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-900 border-b-[3px] text-emerald-600 dark:text-emerald-400 font-black text-[11px] uppercase tracking-widest hover:bg-emerald-50 dark:hover:bg-emerald-900/20 active:border-b-2 active:translate-y-[1px] disabled:opacity-50 transition-all"
                    >
                      {busy === key ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LockOpen className="w-3.5 h-3.5" strokeWidth={2.5} />}
                      {isLocked ? 'Remove lock' : 'Reset strikes'}
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {[...u.log].reverse().map((entry, i) => <Entry key={`${entry.at}-${i}`} entry={entry} />)}
                  {unlogged > 0 && (
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 italic">
                      {unlogged} {unlogged === 1 ? 'strike was' : 'strikes were'} given before flagged answers were recorded, so the text is not available.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          {!calm && (
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              A reset takes effect the next time the student opens the app. If they are in the middle of a session, ask them to refresh — their open tab still holds the old count and would save it back.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
