import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Eye, EyeOff, Sparkles, History } from 'lucide-react';
import { watchList } from '../../utils/essayArchive';
import { GED_EXAM_MINUTES, isFullLength, stimulusWords } from '../../utils/essayPrompts';

/** Marks a prompt whose sources are as long as test day's. */
const FullLengthTag = () => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 whitespace-nowrap">
    Test length
  </span>
);

/**
 * The screen before the clock starts: which prompt, which mode, and what to
 * watch for.
 *
 * Two modes, chosen every sitting. Practice keeps the planner and the frame
 * bank beside the response; exam strips them away and leaves the two sources,
 * the prompt and 45 minutes, which is what test day is. The watch-list is the
 * commonest error types from the last few essays — "verb endings, articles,
 * comma splices" — put in front of him before the verbs arrive rather than
 * after the score does.
 */
const fmtDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
};

export default function EssayStart({ prompts, index, onPick, mode, onMode, archive = [], onStart, onQuit }) {
  const [open, setOpen] = useState(false);
  const prompt = prompts[index];
  const watch = watchList(archive);
  const attemptsFor = (p) => archive.filter((e) => e.promptKey === p.key && e.task === p.task);
  const past = attemptsFor(prompt);
  const minutes = mode === 'exam' ? GED_EXAM_MINUTES : prompt.minutesAllowed ?? GED_EXAM_MINUTES;
  const sourceNames = (prompt.sources || [])
    .map((s) => [s.type, s.title].filter(Boolean).join(': '))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6 animate-in fade-in">
      <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Extended Response</span>
      <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mt-1 leading-tight">Before the clock starts</h2>

      {/* Prompt */}
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <BookOpen className="w-4 h-4 mr-2" strokeWidth={2.5} />
            <span className="text-[11px] font-black uppercase tracking-widest">{prompts.length > 1 ? `Prompt ${index + 1} of ${prompts.length}` : 'Prompt'}</span>
          </div>
          {prompts.length > 1 && (
            <button onClick={() => setOpen((v) => !v)} className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:underline">
              {open ? 'Close list' : 'Choose a different prompt'}
            </button>
          )}
        </div>
        <div className="px-6 sm:px-8 py-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-xl font-black text-slate-800 dark:text-white">{prompt.title}</h3>
            {isFullLength(prompt) && <FullLengthTag />}
          </div>
          <p className="mt-2 text-[15px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{prompt.task}</p>
          <p className="mt-3 text-xs font-bold text-slate-400">
            Sources: {sourceNames.join(' · ') || 'two opposing passages'}
            {' · '}{stimulusWords(prompt)} words to read
            {' · '}{minutes} minutes
            {past.length > 0 && ` · you have written this ${past.length} time${past.length === 1 ? '' : 's'}`}
          </p>
        </div>
        {open && (
          <div className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            {prompts.map((p, i) => {
              const done = attemptsFor(p);
              const best = done.reduce((m, e) => Math.max(m, e.score?.total || 0), 0);
              return (
                <button
                  key={p.key}
                  onClick={() => { onPick(i); setOpen(false); }}
                  className={`w-full text-left flex items-center justify-between gap-4 px-6 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors ${i === index ? 'bg-indigo-50/60 dark:bg-indigo-950/30' : ''}`}
                >
                  <span className="flex flex-wrap items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                    {p.title}
                    {isFullLength(p) && <FullLengthTag />}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
                    {done.length ? `${done.length}× · best ${best}/6` : 'not yet written'}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mode */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'practice', icon: Eye, title: 'Practice', desc: 'Plan first, and keep the sentence frames beside you while you write.' },
          { id: 'exam', icon: EyeOff, title: 'Exam conditions', desc: `Sources and prompt only, ${GED_EXAM_MINUTES} minutes, no tips. Exactly what test day looks like.` },
        ].map((m) => {
          const Icon = m.icon;
          const on = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onMode(m.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all ${on ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-5 h-5 ${on ? 'text-indigo-600' : 'text-slate-400'}`} strokeWidth={2.5} />
                <span className={`font-black ${on ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>{m.title}</span>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{m.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Watch-list */}
      {watch.length > 0 && (
        <div className="mt-5 bg-[#eff6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-800 p-5 rounded-[1.5rem]">
          <div className="flex items-center text-[#2563eb] dark:text-blue-400 mb-2">
            <Sparkles className="w-5 h-5 mr-2" />
            <h4 className="font-black text-sm uppercase tracking-widest">Watch for these — from your last essays</h4>
          </div>
          <ul className="space-y-1.5">
            {watch.map((k) => (
              <li key={k.kind} className="flex items-start text-slate-700 dark:text-slate-300 font-medium">
                <span className="flex-shrink-0 mr-3 mt-0.5 text-[11px] font-black tabular-nums text-blue-500 bg-white dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-md px-2 py-0.5">×{k.count}</span>
                <span><span className="font-black">{k.kind}.</span>{k.rule ? <span className="text-slate-500 dark:text-slate-400"> {k.rule}.</span> : null}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {past.length > 0 && (
        <div className="mt-5 flex items-center text-xs font-bold text-slate-400">
          <History className="w-4 h-4 mr-2" strokeWidth={2.5} />
          Last time on this prompt: {past[past.length - 1].score?.total ?? 0}/6 on {fmtDate(past[past.length - 1].at)}. Try to beat it.
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <button onClick={onQuit} className="px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          Not now
        </button>
        <button
          onClick={onStart}
          className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
        >
          <Clock className="w-5 h-5 mr-3" strokeWidth={3} /> Start the clock <ArrowRight className="w-6 h-6 ml-3" />
        </button>
      </div>
    </div>
  );
}
