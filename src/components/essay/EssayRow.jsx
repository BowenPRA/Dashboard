import React from 'react';
import { Timer, MessageSquare } from 'lucide-react';
import { Badge } from '../ui';

const fmtDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
};

/**
 * One saved essay in a list — date, unit, prompt, score and what has happened
 * to it since (revised, exam conditions, a teacher's note). Shared by the
 * student's Writing page and the teacher's drawer so both lists read the same.
 */
export default function EssayRow({ entry, selected, onPick }) {
  const total = entry.score?.total ?? 0;
  const tone = entry.nonScorable
    ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'
    : total >= 5
      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
      : total >= 3
        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
        : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300';
  return (
    <button
      onClick={() => onPick(entry)}
      aria-pressed={selected}
      data-essay-id={entry.id}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
        selected
          ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-400 dark:border-indigo-600'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 truncate">
            {fmtDate(entry.at)} · {entry.unitTitle}
          </p>
          <p className="font-black text-slate-800 dark:text-white leading-snug line-clamp-2">
            {entry.promptTitle || 'Extended Response'}
          </p>
        </div>
        <span className={`flex-shrink-0 font-black px-2.5 py-1 rounded-lg text-sm tabular-nums ${tone}`}>
          {entry.nonScorable ? '—' : `${total}/6`}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
        <span className="text-[11px] font-bold text-slate-400 tabular-nums mr-1">{entry.wordCount} words</span>
        {entry.mode === 'exam' && <Badge tone="slate"><Timer className="w-3 h-3" strokeWidth={3} /> Exam</Badge>}
        {entry.revision && <Badge tone="green">Revised {entry.revision.fixed}/{entry.revision.total}</Badge>}
        {entry.teacherNote?.text && <Badge tone="purple"><MessageSquare className="w-3 h-3" strokeWidth={3} /> Note</Badge>}
      </div>
    </button>
  );
}
