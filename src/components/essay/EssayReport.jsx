import React, { useState } from 'react';
import {
  Award, AlertTriangle, CheckCircle2, Lightbulb, MessageSquare, Quote, Scale, XCircle, FileText,
} from 'lucide-react';
import { errorDensity } from '../../utils/essayArchive';
import { TRAITS } from './traits';

/**
 * The examiner's report on one GED essay, rendered from an archive entry.
 *
 * Used in three places — the Essay task's results screen the moment a score
 * comes back, the student's Writing page when they read it back later, and
 * the teacher's drawer — so all three show exactly the same thing. That is the
 * point: the report the student learns from is the one the teacher discusses.
 *
 * `entry` is the shape built by utils/essayArchive.js buildEssayEntry().
 */

const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

export function ScorePill({ score }) {
  const pill = score === 2
    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
    : score === 1
      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
      : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300';
  return <span className={`flex-shrink-0 font-bold px-3 py-1 rounded-lg text-sm tabular-nums ${pill}`}>{score} / 2</span>;
}

/** The essay text, with a toggle to the revised version when there is one. */
export function EssayText({ entry }) {
  const [view, setView] = useState(entry?.revision?.revisedText ? 'revised' : 'original');
  const text = view === 'revised' ? entry?.revision?.revisedText : entry?.text;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-1">
          {['original', ...(entry?.revision?.revisedText ? ['revised'] : [])].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${
                view === v ? 'bg-indigo-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              {v === 'original' ? 'As written' : 'After revision'}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 tabular-nums">
          {entry?.wordCount ?? 0} words{entry?.paragraphs ? ` · ${entry.paragraphs} paragraphs` : ''}
        </span>
      </div>
      <div className="px-6 sm:px-8 py-6 text-[16px] font-medium text-slate-800 dark:text-slate-100 leading-[1.9] whitespace-pre-wrap max-h-[32rem] overflow-y-auto">
        {text || <span className="text-slate-400">No text saved.</span>}
      </div>
    </div>
  );
}

export default function EssayReport({ entry, showText = false, showHeader = true, teacherView = false }) {
  if (!entry) return null;
  const score = entry.score || { total: 0, traits: {} };
  const isPerfect = score.total >= 6;
  const revisions = entry.revisions || [];

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className={`p-3 rounded-full mr-4 flex-shrink-0 ${isPerfect ? 'bg-emerald-500' : 'bg-indigo-600'}`}>
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
              {entry.nonScorable ? 'Not scorable' : 'Extended Response Score'}
            </h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
              Raw score
              <span className={`ml-2 text-base ${isPerfect ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {score.total} / 6
              </span>
              <span className="ml-3 normal-case tracking-normal text-slate-400 dark:text-slate-500">
                · {entry.wordCount} words
                {entry.paragraphs ? ` · ${entry.paragraphs} paragraph${entry.paragraphs === 1 ? '' : 's'}` : ''}
                {entry.mode === 'exam' ? ' · exam conditions' : ''}
                {entry.at ? ` · ${fmtDate(entry.at)}` : ''}
              </span>
            </p>
          </div>
        </div>
      )}

      {showText && <EssayText entry={entry} />}

      {/* The teacher edits the note in EssayReviewPanel's box, so their view skips the read-only copy. */}
      {!teacherView && entry.teacherNote?.text && (
        <div className="bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-200 dark:border-violet-800 p-6 rounded-[1.5rem]">
          <div className="flex items-center text-violet-700 dark:text-violet-300 mb-2">
            <MessageSquare className="w-5 h-5 mr-2" />
            <h4 className="font-black text-sm uppercase tracking-widest">Your teacher's note</h4>
            {entry.teacherNote.at && <span className="ml-auto text-[11px] font-bold text-violet-400">{fmtDate(entry.teacherNote.at)}</span>}
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">{entry.teacherNote.text}</p>
        </div>
      )}

      {entry.nonScorable && (
        <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 p-6 rounded-[1.5rem]">
          <div className="flex items-center text-rose-600 dark:text-rose-400 mb-2">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <h4 className="font-black text-sm uppercase tracking-widest">Not Scorable</h4>
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{entry.nonScorable}</p>
        </div>
      )}

      {!entry.nonScorable && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-4">
            <Quote className="w-4 h-4 mr-2" strokeWidth={2.5} />
            <h4 className="font-black text-[11px] uppercase tracking-widest">What the examiner found</h4>
          </div>
          <div className="space-y-4">
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{teacherView ? 'Position stated' : 'Your position'}</span>
              <p className="text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {entry.positionStated || <span className="text-rose-500 dark:text-rose-400">No clear position on which side was better supported.</span>}
              </p>
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Evidence used from the sources</span>
              {(entry.evidenceCited || []).length > 0 ? (
                <ul className="space-y-1.5">
                  {entry.evidenceCited.map((e, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-[15px] font-medium text-slate-700 dark:text-slate-300">{e}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px] font-medium text-rose-500 dark:text-rose-400">None. Only evidence taken from the source texts earns marks.</p>
              )}
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">How the argumentation was judged</span>
              <p className="text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {entry.analysisOfArgumentation || (
                  <span className="text-rose-500 dark:text-rose-400">
                    Both sides were summarised and one chosen, but the quality of their evidence was never judged. This is what keeps Trait 1 at 1 instead of 2.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {TRAITS.map((t) => {
          const s = score.traits?.[t.key] ?? 0;
          const fb = entry.traitFeedback?.[t.key] || 'No feedback provided.';
          const accent = s === 2 ? 'border-l-emerald-400' : s === 1 ? 'border-l-amber-400' : 'border-l-rose-400';
          const band = s === 2 ? 'Top band' : s === 1 ? 'Partial credit' : 'No credit';
          return (
            <div key={t.key} className={`bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 border-l-4 ${accent} shadow-sm`}>
              <div className="flex items-start justify-between gap-4 mb-1">
                <h4 className="text-lg font-black text-slate-800 dark:text-white leading-snug">{t.label}</h4>
                <ScorePill score={s} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">{band}</p>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">{t.hint}</p>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{fb}</p>

              {t.key === 'conventions' && revisions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Errors the examiner marked · {revisions.length} in {entry.wordCount} words ({errorDensity(entry)} per 100)
                  </span>
                  <ul className="space-y-1.5">
                    {revisions.map((r, i) => (
                      <li key={i} className="flex items-start">
                        <XCircle className="w-4 h-4 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          <span className="line-through text-rose-500">{r.quote}</span>
                          <span className="mx-1.5 text-slate-300">→</span>
                          <span className="text-emerald-700 dark:text-emerald-300 font-bold">{r.correction}</span>
                          <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{r.kind}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(entry.scoreNotes || []).length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-[1.5rem]">
          <div className="flex items-center text-amber-700 dark:text-amber-400 mb-3">
            <Scale className="w-5 h-5 mr-2" />
            <h4 className="font-black text-sm uppercase tracking-widest">Why marks were capped</h4>
          </div>
          <ul className="space-y-2">
            {entry.scoreNotes.map((n, i) => (
              <li key={i} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {entry.nextStep && (
        <div className="bg-[#eff6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-800 p-6 rounded-[1.5rem]">
          <div className="flex items-center text-[#2563eb] dark:text-blue-400 mb-2">
            <Lightbulb className="w-5 h-5 mr-2" />
            <h4 className="font-black text-sm uppercase tracking-widest">{teacherView ? 'Next step given' : 'Your Next Step'}</h4>
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{entry.nextStep}</p>
        </div>
      )}

      {entry.revision && (
        <div className="flex items-center text-xs font-bold text-slate-500 dark:text-slate-400">
          <FileText className="w-4 h-4 mr-2" strokeWidth={2.5} />
          Revision: {entry.revision.fixed} of {entry.revision.total} corrections made {teacherView ? 'by the student' : 'yourself'}.
        </div>
      )}
    </div>
  );
}
