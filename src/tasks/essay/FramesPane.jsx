import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { framesByStage } from '../../utils/essayFrames';

/**
 * The sentence-frame bank, as chips grouped by the job each sentence does.
 *
 * Clicking a frame hands it to `onInsert` — the writing screen drops it at the
 * cursor, the planner drops it into the current field. The gaps stay as `___`
 * for the student to fill: the frame gives him the sentence's skeleton so the
 * 45 minutes go on the evidence, not on assembling English. A practice aid,
 * labelled as one; exam mode hides the whole pane.
 */
export default function FramesPane({ extra = [], onInsert, bilingual = true, compact = false, stageFilter = null }) {
  const [showVn, setShowVn] = useState(false);
  const stages = framesByStage(extra).filter((s) => !stageFilter || stageFilter.includes(s.id));

  return (
    <div className={compact ? '' : 'px-6 sm:px-8 py-6'}>
      {!compact && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
            Click a frame to drop it into your response, then fill the gaps. A practice aid — not on the real test.
          </p>
          {bilingual && (
            <button
              onClick={() => setShowVn((v) => !v)}
              className={`ml-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 transition-colors ${showVn ? 'bg-indigo-600 border-indigo-700 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}
            >
              VN
            </button>
          )}
        </div>
      )}
      <div className="space-y-5">
        {stages.map((s) => (
          <div key={s.id}>
            <div className="mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">{s.label}</span>
              <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500">{s.hint}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {s.frames.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onInsert?.(f.text)}
                  className="group text-left flex items-start gap-2 px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-slate-300 group-hover:text-indigo-500" strokeWidth={3} />
                  <span className="min-w-0">
                    <span className="block text-[14px] font-bold text-slate-700 dark:text-slate-200 leading-snug">{f.text}</span>
                    {bilingual && showVn && f.textVn && (
                      <span className="block text-[12px] italic text-slate-500 dark:text-slate-400 mt-0.5">{f.textVn}</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
