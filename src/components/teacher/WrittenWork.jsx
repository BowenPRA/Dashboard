import React, { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { getTask } from '../../tasks/taskRegistry';
import { essayPrompts } from '../../utils/essayPrompts';

const STATUS = {
  perfect: { label: 'Full marks', cls: 'text-emerald-600 dark:text-emerald-400' },
  attempted: { label: 'Marked', cls: 'text-sky-600 dark:text-sky-400' },
  api_error: { label: 'Saved — grader was unavailable', cls: 'text-amber-600 dark:text-amber-400' },
  strike_fallback: { label: 'Written while locked — not marked', cls: 'text-rose-600 dark:text-rose-400' },
};

const entryOf = (saved) => (typeof saved === 'string' ? { text: saved, status: 'perfect' } : saved);
const hasText = (e) => e && typeof e === 'object' && typeof e.text === 'string' && e.text.trim();

/**
 * What a student has typed into a unit's written tasks, read out of each
 * task's resume blob (`progress[track][unit][dbKey].answers`):
 *
 *   Questions / Source Analysis — keyed by question index (the pools are never
 *     shuffled, so index i is `unit.shortQA[i]` / `unit.diagrams[i]`)
 *   Essay — keyed by prompt key; the oldest records ARE the entry (`{ text }`)
 *
 * These blobs only ever hold the LATEST text per question, and before
 * 2026-09-21 Questions kept text only for full-mark answers — so an older unit
 * can legitimately show less than the student wrote. GED essays have the full
 * archive (every draft, scored) in the essay panel above; this is the only
 * place the other tracks' essays can be read.
 */
function collect(unit, unitData) {
  const out = [];
  const blob = (taskId) => unitData?.[getTask(taskId)?.dbKey]?.answers;

  const indexed = (taskId, questions, promptOf) => {
    const answers = blob(taskId);
    if (!answers || typeof answers !== 'object') return;
    for (const [i, saved] of Object.entries(answers)) {
      const e = entryOf(saved);
      if (!hasText(e)) continue;
      out.push({ id: `${taskId}-${i}`, task: getTask(taskId).label, n: Number(i) + 1, question: promptOf(questions?.[i]) || '', ...e });
    }
  };
  indexed('SHORT_ANSWERS', unit?.shortQA, (q) => q?.question);
  indexed('DIAGRAMS', unit?.diagrams, (q) => q?.prompt || q?.promptText || q?.question);

  const essay = blob('ESSAY');
  if (essay && typeof essay === 'object') {
    const prompts = unit?.essay ? essayPrompts(unit.essay) : [];
    const label = getTask('ESSAY').label;
    if (hasText(essay)) {
      out.push({ id: 'ESSAY-0', task: label, question: prompts[0]?.task || prompts[0]?.title || '', ...essay });
    } else {
      for (const [key, saved] of Object.entries(essay)) {
        const e = entryOf(saved);
        if (!hasText(e)) continue;
        const prompt = prompts.find((p) => p.key === key) || (key === '0' ? prompts[0] : null);
        out.push({ id: `ESSAY-${key}`, task: label, question: prompt?.task || prompt?.title || '', ...e });
      }
    }
  }
  return out;
}

const words = (t) => t.trim().split(/\s+/).filter(Boolean).length;

/** Folded by default: a unit row is for XP first; the writing is one click in. */
export default function WrittenWork({ unit, unitData }) {
  const items = collect(unit, unitData);
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  return (
    <div className="mt-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
        <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0" strokeWidth={2.5} />
        <span className="flex-1 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
          Written answers <span className="text-slate-400">· {items.length}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} strokeWidth={3} />
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-3 animate-in fade-in duration-150">
          {items.map((it) => {
            const status = STATUS[it.status];
            return (
              <div key={it.id} className="pt-3 border-t-2 border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{it.task}{it.n ? ` ${it.n}` : ''}</span>
                  {status && <span className={`text-[11px] font-bold ${status.cls}`}>· {status.label}{it.status === 'attempted' && it.maxMarks ? ` ${it.score ?? 0}/${it.maxMarks}` : ''}</span>}
                  <span className="text-[11px] font-bold text-slate-400">· {words(it.text)} words</span>
                </div>
                {it.question && <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Q: {it.question}</p>}
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 whitespace-pre-wrap break-words border-l-4 border-indigo-200 dark:border-indigo-900 pl-3 max-h-72 overflow-y-auto">{it.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
