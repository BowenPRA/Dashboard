import React, { useMemo, useState } from 'react';
import { PenLine, MessageSquare, Loader2, Save, ChevronDown } from 'lucide-react';
import { annotateEssay } from '../../utils/adminApi';
import { allEssays, essayStats, kindTotals } from '../../utils/essayArchive';
import EssayReport from './EssayReport';
import EssayTrend from './EssayTrend';
import EssayRow from './EssayRow';

/**
 * The teacher's view of a student's essays, inside StudentProfileDrawer.
 *
 * The same report the student reads (EssayReport, in `teacherView`), the same
 * trend, and one thing the student cannot do: leave a note on an essay. The
 * note is written to that archive entry by the `annotateEssay` admin endpoint
 * and appears on the student's Writing page above the examiner's report.
 */

/** The note editor for one essay. Keyed by essay id, so switching essays resets the draft. */
function NoteBox({ studentId, entry, onSaved }) {
  const saved = entry.teacherNote?.text || '';
  const [draft, setDraft] = useState(saved);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const dirty = draft.trim() !== saved;

  const save = async () => {
    setBusy(true);
    setError('');
    try {
      const { essay } = await annotateEssay(studentId, entry.track, entry.id, draft);
      onSaved(entry.track, { ...essay, track: entry.track });
    } catch (err) {
      setError(err.message || 'Could not save the note.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-200 dark:border-violet-800 p-5 rounded-[1.5rem]">
      <label htmlFor={`note-${entry.id}`} className="flex items-center text-violet-700 dark:text-violet-300 mb-3">
        <MessageSquare className="w-4 h-4 mr-2" strokeWidth={2.5} />
        <span className="font-black text-xs uppercase tracking-widest">Note to the student</span>
      </label>
      <textarea
        id={`note-${entry.id}`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        maxLength={2000}
        rows={4}
        placeholder="What to keep doing, what to fix first next time…"
        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-xl font-medium text-slate-800 dark:text-white leading-relaxed focus:outline-none focus:border-violet-400 resize-y"
      />
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <button
          onClick={save}
          disabled={busy || !dirty}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl font-black text-xs uppercase tracking-widest border-b-[4px] border-violet-800 active:border-b-0 active:translate-y-[4px] disabled:opacity-50 transition-all"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" strokeWidth={2.5} />}
          {saved && !draft.trim() ? 'Remove note' : 'Save note'}
        </button>
        <span className="text-xs font-bold text-violet-500/80">The student sees this on their Writing page.</span>
        {error && <span className="text-xs font-bold text-rose-600">{error}</span>}
      </div>
    </div>
  );
}

export default function EssayReviewPanel({ studentId, progress, onEssayUpdated }) {
  const essays = useMemo(() => allEssays(progress, Object.keys(progress || {})), [progress]);
  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const stats = useMemo(() => essayStats(essays), [essays]);
  const kinds = useMemo(() => kindTotals(essays).slice(0, 5), [essays]);

  if (essays.length === 0) return null;
  const selected = essays.find((e) => e.id === selectedId) || essays[0];
  const pick = (e) => setSelectedId(e.id);

  return (
    <div className="space-y-5">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-2xl font-black text-slate-800 dark:text-white border-b-4 border-slate-200 dark:border-slate-800 pb-3 flex items-center text-left"
      >
        <PenLine className="w-6 h-6 mr-3 text-indigo-500" strokeWidth={3} />
        Essays
        <span className="ml-3 text-sm font-black text-slate-400 tabular-nums">
          {stats.count} written · avg {stats.average}/6 · best {stats.best}/6
          {stats.change !== null ? ` · ${stats.change > 0 ? '+' : ''}${stats.change} since first` : ''}
        </span>
        <ChevronDown className={`w-6 h-6 ml-auto text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={3} />
      </button>

      {open && (
        <>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm text-slate-700 dark:text-slate-300 space-y-5">
            <EssayTrend entries={essays} onPick={pick} selectedId={selected.id} />
            {kinds.length > 0 && (
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Commonest errors, all essays</span>
                <div className="flex flex-wrap gap-2">
                  {kinds.map((k) => (
                    <span key={k.kind} title={k.rule || undefined} className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 text-xs font-black text-rose-700 dark:text-rose-300">
                      {k.kind} × {k.count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[15rem_minmax(0,1fr)] gap-5 items-start">
            <div className="space-y-2.5 md:max-h-[40rem] md:overflow-y-auto md:pr-1">
              {essays.map((e) => (
                <EssayRow key={e.id} entry={e} selected={e.id === selected.id} onPick={pick} />
              ))}
            </div>
            <div className="min-w-0 space-y-5">
              {selected.task && (
                <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border-2 border-slate-200 dark:border-slate-800 p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{selected.unitTitle} · {selected.promptTitle}</p>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{selected.task}</p>
                </div>
              )}
              <NoteBox key={selected.id} studentId={studentId} entry={selected} onSaved={onEssayUpdated} />
              <EssayReport key={`r-${selected.id}`} entry={selected} showText teacherView />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
