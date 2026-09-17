import React, { useRef, useState } from 'react';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { PLAN_FIELDS } from '../../utils/essayFrames';
import FramesPane from './FramesPane';

/**
 * The five-minute plan, filled before the first sentence of the response.
 *
 * On the real test the strongest habit a nervous writer can have is to decide
 * the position and the evidence BEFORE typing, because a response that
 * changes its mind halfway scores 1 on every trait. The planner asks the five
 * questions the five paragraphs answer, in order, so a filled plan IS the
 * outline — and it stays open beside the response box while he writes.
 *
 * Frames are shown per field (only the stage that fits), so the plan is
 * written in the sentences he will actually use.
 */
export default function EssayPlanner({ plan, onChange, onStart, onSkip, bilingual = true, extraFrames = [], compact = false }) {
  const [focus, setFocus] = useState(PLAN_FIELDS[0].id);
  const refs = useRef({});

  const insert = (frame) => {
    const field = PLAN_FIELDS.find((f) => f.id === focus) || PLAN_FIELDS[0];
    const cur = plan?.[field.id] || '';
    const sep = cur && !/\s$/.test(cur) ? ' ' : '';
    onChange?.({ ...plan, [field.id]: `${cur}${sep}${frame}` });
    setTimeout(() => refs.current[field.id]?.focus(), 0);
  };

  const filled = PLAN_FIELDS.filter((f) => String(plan?.[f.id] || '').trim()).length;
  const stage = PLAN_FIELDS.find((f) => f.id === focus)?.stage;

  return (
    <div className={compact ? '' : 'grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6'}>
      <div>
        {!compact && (
          <div className="mb-5">
            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Plan · 5 minutes</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mt-1 leading-tight">Decide before you write</h2>
            <p className="mt-2 text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              Answer these five questions in a line each. They are your five paragraphs. The clock is already running, as it does on the test.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {PLAN_FIELDS.map((f, i) => (
            <div key={f.id} className={`rounded-2xl border-2 p-4 transition-colors ${focus === f.id ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
              <label htmlFor={`plan-${f.id}`} className="block mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Paragraph {i + 1}</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{f.label}</span>
                {bilingual && <span className="block text-xs italic text-slate-400 dark:text-slate-500 mt-0.5">{f.labelVn}</span>}
              </label>
              <textarea
                id={`plan-${f.id}`}
                ref={(el) => { refs.current[f.id] = el; }}
                value={plan?.[f.id] || ''}
                onChange={(e) => onChange?.({ ...plan, [f.id]: e.target.value })}
                onFocus={() => setFocus(f.id)}
                onPaste={(e) => e.preventDefault()}
                placeholder={f.placeholder}
                rows={compact ? 2 : 2}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                data-gramm="false"
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-[15px] font-medium text-slate-800 dark:text-slate-100 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-300 dark:placeholder:text-slate-600"
              />
            </div>
          ))}
        </div>

        {!compact && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-bold text-slate-400">{filled} of {PLAN_FIELDS.length} answered{filled < 3 ? ' — three is the minimum worth having' : ''}</span>
            <div className="flex items-center gap-3">
              {onSkip && (
                <button onClick={onSkip} className="px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  Skip planning
                </button>
              )}
              <button
                onClick={onStart}
                className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
              >
                Start writing <ArrowRight className="w-6 h-6 ml-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {!compact && (
        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] flex flex-col">
          <div className="flex items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
            <ClipboardList className="w-4 h-4 mr-2 text-slate-500" strokeWidth={2.5} />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Frames for this paragraph</span>
          </div>
          <div className="overflow-y-auto">
            <FramesPane extra={extraFrames} onInsert={insert} bilingual={bilingual} stageFilter={stage ? [stage, ...(stage === 'evaluate' ? ['evidence'] : [])] : null} />
          </div>
        </div>
      )}
    </div>
  );
}
