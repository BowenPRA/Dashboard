import React, { useState, useMemo, Component } from 'react';
import { Eye, EyeOff, CheckCircle2, Construction, Layers, ChevronDown } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import TopBar from '../components/TopBar';

/* ------------------------------------------------------------------ *
 * Reveal-solution practice task. Reads a unit's `workbook` array:
 *   [{ tier, tierVn, questions: [{ id, prompt, promptVn,
 *        solution:[…], solutionVn:[…], answer, answerVn, inlineSvg }] }]
 * See docs/workbook-tasks.md for the authoring contract.
 * ------------------------------------------------------------------ */

const SafeInlineMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    const clean = math.replace(/[​-‍﻿]/g, '');
    const html = k.renderToString(clean, { throwOnError: true, displayMode: false });
    return <span dangerouslySetInnerHTML={{ __html: html }} className="mx-0.5" />;
  } catch (err) {
    return <span className="text-rose-500 font-mono text-sm px-1" title={err.message}>{math}</span>;
  }
};

const SafeBlockMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    const clean = math.replace(/[​-‍﻿]/g, '');
    const html = k.renderToString(clean, { throwOnError: true, displayMode: true });
    return <div className="overflow-x-auto py-2 flex justify-center custom-scrollbar" dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (err) {
    return <span className="text-rose-500 font-mono text-sm px-1" title={err.message}>{math}</span>;
  }
};

/** Renders a single string with **bold**, $inline$ and $$block$$ math. */
const RichText = ({ text }) => {
  if (!text || typeof text !== 'string') return null;
  const blocks = text.split(/(\$\$[\s\S]+?\$\$)/g);
  return (
    <>
      {blocks.map((block, bi) => {
        if (block.startsWith('$$') && block.endsWith('$$')) {
          return <SafeBlockMath key={`b-${bi}`} math={block.slice(2, -2).trim()} />;
        }
        const parts = block.split(/(\*\*.*?\*\*)/g);
        return (
          <span key={`t-${bi}`}>
            {parts.map((part, pi) => {
              const inner = part.startsWith('**') && part.endsWith('**') ? part.slice(2, -2) : null;
              const source = inner ?? part;
              const rendered = source.split(/(\$[^$]+?\$)/g).map((m, mi) =>
                m.startsWith('$') && m.endsWith('$')
                  ? <SafeInlineMath key={mi} math={m.slice(1, -1).trim()} />
                  : <span key={mi}>{m}</span>
              );
              return inner !== null
                ? <strong key={pi} className="font-black text-slate-900 dark:text-slate-100">{rendered}</strong>
                : <span key={pi}>{rendered}</span>;
            })}
          </span>
        );
      })}
    </>
  );
};

const TIER_THEME = {
  Focus:     { dot: 'bg-[#58cc02]', text: 'text-[#58a700] dark:text-[#7bd42f]', ring: 'border-[#58cc02]' },
  Practice:  { dot: 'bg-[#1cb0f6]', text: 'text-[#1899d6] dark:text-[#5cc4f7]', ring: 'border-[#1cb0f6]' },
  Challenge: { dot: 'bg-[#ce82ff]', text: 'text-[#a855f7] dark:text-[#d6a6ff]', ring: 'border-[#ce82ff]' },
};
const themeFor = (tier) => TIER_THEME[tier] || TIER_THEME.Practice;

class WidgetBoundary extends Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

function QuestionCard({ q, index, lang, revealed, onToggle }) {
  const prompt = lang === 'vn' ? (q.promptVn || q.prompt) : q.prompt;
  const steps = (lang === 'vn' ? (q.solutionVn || q.solution) : q.solution) || [];
  const answer = lang === 'vn' ? (q.answerVn || q.answer) : q.answer;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          {index}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-slate-800 dark:text-slate-100 font-semibold text-base sm:text-lg leading-relaxed">
            <RichText text={prompt} />
          </div>
          {q.inlineSvg && (
            <div className="mt-4 max-w-sm bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 shadow-sm">
              <WidgetBoundary>
                <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: q.inlineSvg }} />
              </WidgetBoundary>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all border-2 border-b-[4px] active:border-b-2 active:translate-y-[2px]
            ${revealed
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              : 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]'}`}
        >
          {revealed ? <EyeOff className="w-4 h-4" strokeWidth={2.5} /> : <Eye className="w-4 h-4" strokeWidth={2.5} />}
          {revealed ? (lang === 'vn' ? 'Ẩn lời giải' : 'Hide solution') : (lang === 'vn' ? 'Xem lời giải' : 'Show solution')}
        </button>

        {revealed && (
          <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 sm:p-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <ol className="space-y-2.5">
              {steps.map((step, si) => (
                <li key={si} className="flex gap-3 text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-[11px] font-black flex items-center justify-center">{si + 1}</span>
                  <span className="min-w-0"><RichText text={step} /></span>
                </li>
              ))}
            </ol>
            {answer && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{lang === 'vn' ? 'Đáp án' : 'Answer'}</span>
                <span className="inline-flex items-center bg-[#58cc02]/10 border-2 border-[#58cc02]/40 text-[#3d8b00] dark:text-[#7bd42f] font-black rounded-xl px-4 py-1.5 text-base sm:text-lg">
                  <RichText text={answer} />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Workbook({ pool, onComplete, onQuit }) {
  const groups = useMemo(() => (Array.isArray(pool) ? pool : []), [pool]);
  const [lang, setLang] = useState('en');
  const [revealed, setRevealed] = useState(() => new Set());

  const allIds = useMemo(() => groups.flatMap((g) => (g.questions || []).map((q) => q.id)), [groups]);
  const allShown = allIds.length > 0 && allIds.every((id) => revealed.has(id));

  const toggleOne = (id) => setRevealed((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () => setRevealed(allShown ? new Set() : new Set(allIds));

  if (groups.length === 0) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center transition-colors">
        <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Construction className="w-8 h-8 text-pink-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-tight">No Practice Yet</h2>
        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-800 mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">
          This section has no workbook questions configured.
        </div>
        <button onClick={onQuit} className="px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148,163,184,0.35); border-radius: 10px; }
      ` }} />

      <TopBar onQuit={onQuit} modeTitle="Workbook Practice" lang={lang} onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-5 sm:py-8">

          {/* Reveal-all control */}
          <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm">
              <Layers className="w-5 h-5 text-[#ec4899]" strokeWidth={2.5} />
              <span className="hidden sm:inline">{lang === 'vn' ? 'Thử tự làm, rồi kiểm tra lời giải.' : 'Try each one first, then check the solution.'}</span>
              <span className="sm:hidden">{lang === 'vn' ? 'Tự làm rồi kiểm tra' : 'Try, then check'}</span>
            </div>
            <button
              onClick={toggleAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              {allShown ? <EyeOff className="w-4 h-4" strokeWidth={2.5} /> : <Eye className="w-4 h-4" strokeWidth={2.5} />}
              {allShown ? (lang === 'vn' ? 'Ẩn tất cả' : 'Hide all') : (lang === 'vn' ? 'Hiện tất cả' : 'Reveal all')}
            </button>
          </div>

          {groups.map((group, gi) => {
            const theme = themeFor(group.tier);
            const tierLabel = lang === 'vn' ? (group.tierVn || group.tier) : group.tier;
            let running = 0;
            for (let k = 0; k < gi; k++) running += (groups[k].questions || []).length;
            return (
              <section key={gi} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-3 h-3 rounded-full ${theme.dot} shadow-sm`} />
                  <h2 className={`font-black uppercase tracking-widest text-sm sm:text-base ${theme.text}`}>{tierLabel}</h2>
                  <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
                <div className="space-y-4">
                  {(group.questions || []).map((q, qi) => (
                    <QuestionCard
                      key={q.id}
                      q={q}
                      index={running + qi + 1}
                      lang={lang}
                      revealed={revealed.has(q.id)}
                      onToggle={() => toggleOne(q.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {/* Finish */}
          <div className="flex justify-center pt-2 pb-8">
            <button
              onClick={() => onComplete?.(10)}
              className="flex items-center px-8 py-4 rounded-xl font-black text-base sm:text-lg tracking-widest uppercase transition-all bg-[#58cc02] border-b-[4px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[4px]"
            >
              <CheckCircle2 className="w-6 h-6 mr-2" strokeWidth={2.5} />
              {lang === 'vn' ? 'Hoàn thành' : 'Mark as done'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
