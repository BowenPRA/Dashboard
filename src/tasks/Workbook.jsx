import React, { useState, useMemo, useEffect, Component } from 'react';
import { Eye, EyeOff, CheckCircle2, XCircle, Construction, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import TopBar from '../components/TopBar';
import { answersEquivalent } from '../utils/mathEquivalence';

/* ------------------------------------------------------------------ *
 * Slide-per-problem practice. Reads a unit's `workbook` array:
 *   [{ tier, tierVn, questions: [{ id, prompt, promptVn,
 *        solution:[…], solutionVn:[…], answer, answerVn,
 *        inlineSvg, inlineSvgSolved }] }]
 * One problem per screen; "Show solution" reveals the steps AND swaps
 * a fill-in diagram (inlineSvg → inlineSvgSolved). See docs/workbook-tasks.md.
 * ------------------------------------------------------------------ */

const strip = (s) => s.replace(/[​-‍﻿]/g, '');
const SafeInlineMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    return <span className="mx-0.5" dangerouslySetInnerHTML={{ __html: k.renderToString(strip(math), { throwOnError: true, displayMode: false }) }} />;
  } catch (err) { return <span className="text-rose-500 font-mono text-sm px-1" title={err.message}>{math}</span>; }
};
const SafeBlockMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    return <div className="overflow-x-auto py-2 flex justify-center custom-scrollbar" dangerouslySetInnerHTML={{ __html: k.renderToString(strip(math), { throwOnError: true, displayMode: true }) }} />;
  } catch (err) { return <span className="text-rose-500 font-mono text-sm px-1" title={err.message}>{math}</span>; }
};

/** Render a string with **bold**, $inline$ and $$block$$ math. */
const RichText = ({ text }) => {
  if (!text || typeof text !== 'string') return null;
  const blocks = text.split(/(\$\$[\s\S]+?\$\$)/g);
  return (
    <>
      {blocks.map((block, bi) => {
        if (block.startsWith('$$') && block.endsWith('$$')) return <SafeBlockMath key={`b-${bi}`} math={block.slice(2, -2).trim()} />;
        return (
          <span key={`t-${bi}`}>
            {block.split(/(\*\*.*?\*\*)/g).map((part, pi) => {
              const inner = part.startsWith('**') && part.endsWith('**') ? part.slice(2, -2) : null;
              const src = inner ?? part;
              const rendered = src.split(/(\$[^$]+?\$)/g).map((m, mi) =>
                m.startsWith('$') && m.endsWith('$') ? <SafeInlineMath key={mi} math={m.slice(1, -1).trim()} /> : <span key={mi}>{m}</span>);
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
  Focus:     { bg: 'bg-[#58cc02]', text: 'text-[#58a700] dark:text-[#7bd42f]', soft: 'bg-[#58cc02]/10' },
  Practice:  { bg: 'bg-[#1cb0f6]', text: 'text-[#1899d6] dark:text-[#5cc4f7]', soft: 'bg-[#1cb0f6]/10' },
  Challenge: { bg: 'bg-[#ce82ff]', text: 'text-[#a855f7] dark:text-[#d6a6ff]', soft: 'bg-[#ce82ff]/10' },
};
const themeFor = (t) => TIER_THEME[t] || TIER_THEME.Practice;

class WidgetBoundary extends Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

export default function Workbook({ pool, onComplete, onQuit }) {
  const problems = useMemo(() => {
    const groups = Array.isArray(pool) ? pool : [];
    return groups.flatMap((g) => (g.questions || []).map((q) => ({ ...q, tier: g.tier, tierVn: g.tierVn })));
  }, [pool]);

  const [idx, setIdx] = useState(0);
  const [lang, setLang] = useState('en');
  const [revealed, setRevealed] = useState(() => new Set());
  const [results, setResults] = useState({}); // id -> { value, correct, shown }
  const [drafts, setDrafts] = useState({});   // id -> what they have typed so far

  const total = problems.length;
  const q = problems[idx];
  const isRevealed = q ? revealed.has(q.id) : false;
  // Only questions with an authored answer can be marked; a "copy and complete
  // the table" item is still worth doing, just not worth points.
  const scorable = useMemo(() => problems.filter((p) => p.answer), [problems]);
  const result = q ? results[q.id] : null;
  // Keyed by question rather than reset on navigation, so flicking back to an
  // unanswered problem still shows what was typed.
  const draft = q ? (drafts[q.id] ?? '') : '';
  const setDraft = (v) => setDrafts((prev) => ({ ...prev, [q.id]: v }));

  const grade = (correct, shown = false) =>
    setResults((prev) => (prev[q.id] ? prev : { ...prev, [q.id]: { value: draft, correct, shown } }));

  const check = () => {
    if (!q?.answer || result || !draft.trim()) return;
    // Equivalent expressions count: "10+2x" is right for "2x+10". See mathEquivalence.
    grade(answersEquivalent(draft, q.answer, q.accept));
    setRevealed((prev) => new Set(prev).add(q.id)); // right or wrong, show the method
  };

  const toggle = () => {
    // Revealing before answering is allowed — it is practice, and a stuck
    // student should be able to read the method. It just doesn't score.
    if (q.answer && !results[q.id] && !revealed.has(q.id)) grade(false, true);
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };
  const go = (d) => setIdx((i) => Math.max(0, Math.min(total - 1, i + d)));

  /** XP is the share of markable questions answered right before the reveal. */
  const finish = () => {
    if (!scorable.length) { onComplete?.(10); return; }
    const items = scorable.map((p) => ({ itemId: p.id, correct: !!results[p.id]?.correct }));
    const right = items.filter((i) => i.correct).length;
    onComplete?.(Math.round((right / scorable.length) * 10), null, { items });
  };

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, total, q]);

  if (total === 0) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center transition-colors">
        <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Construction className="w-8 h-8 text-pink-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-tight">No Practice Yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const theme = themeFor(q.tier);
  const tierLabel = lang === 'vn' ? (q.tierVn || q.tier) : q.tier;
  const prompt = lang === 'vn' ? (q.promptVn || q.prompt) : q.prompt;
  const steps = (lang === 'vn' ? (q.solutionVn || q.solution) : q.solution) || [];
  const answer = lang === 'vn' ? (q.answerVn || q.answer) : q.answer;
  const diagram = isRevealed && q.inlineSvgSolved ? q.inlineSvgSolved : q.inlineSvg;
  const hasFillIn = !!q.inlineSvgSolved;
  const isLast = idx === total - 1;

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148,163,184,0.35); border-radius: 10px; }
      ` }} />

      <TopBar onQuit={onQuit} modeTitle="Workbook Practice" current={idx + 1} total={total}
        lang={lang} onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      {/* Problem card */}
      <div className="flex-1 flex justify-center items-center overflow-hidden p-3 sm:p-6 lg:p-8 min-h-0">
        <div key={idx} className="w-full max-w-3xl h-full flex flex-col bg-white dark:bg-slate-900 rounded-3xl lg:rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-[0.99] duration-300">

        {/* Header strip */}
        <div className={`${theme.bg} px-5 sm:px-7 py-3 sm:py-4 flex items-center justify-between text-white flex-shrink-0 border-b-4 border-black/10`}>
          <span className="font-black uppercase tracking-widest text-sm sm:text-base drop-shadow-sm">{tierLabel}</span>
          <span className="font-black text-xs sm:text-sm bg-white/20 rounded-full px-3 py-1 border border-white/30">
            {lang === 'vn' ? 'Câu' : 'Question'} {idx + 1} / {total}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8">
          {/* Prompt */}
          <div className="text-slate-800 dark:text-slate-100 font-semibold text-xl sm:text-2xl leading-relaxed">
            <RichText text={prompt} />
          </div>

          {/* Diagram (swaps to solved on reveal) */}
          {diagram && (
            <div className="mt-5 flex flex-col items-center">
              <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 shadow-sm">
                <WidgetBoundary>
                  <div key={isRevealed ? 'solved' : 'blank'} className="w-full flex justify-center animate-in fade-in duration-300" dangerouslySetInnerHTML={{ __html: diagram }} />
                </WidgetBoundary>
              </div>
              {hasFillIn && !isRevealed && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
                  {lang === 'vn' ? 'Xem lời giải để điền vào bảng' : 'Reveal the solution to fill this in'}
                </div>
              )}
            </div>
          )}

          {/* Solution */}
          {isRevealed && (
            <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-5 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 ${theme.text}`}>
                {lang === 'vn' ? 'Lời giải' : 'Solution'}
              </div>
              <ol className="space-y-3">
                {steps.map((step, si) => (
                  <li key={si} className="flex gap-3 text-slate-700 dark:text-slate-300 font-medium text-base sm:text-lg leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-black flex items-center justify-center">{si + 1}</span>
                    <span className="min-w-0"><RichText text={step} /></span>
                  </li>
                ))}
              </ol>
              {answer && (
                <div className="mt-5 flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{lang === 'vn' ? 'Đáp án' : 'Answer'}</span>
                  <span className="inline-flex items-center bg-[#58cc02]/10 border-2 border-[#58cc02]/40 text-[#3d8b00] dark:text-[#7bd42f] font-black rounded-xl px-4 py-1.5 text-lg sm:text-xl">
                    <RichText text={answer} />
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Answer entry — the part that earns the XP */}
        {q.answer && (
          <div className="flex-shrink-0 px-5 sm:px-8 pb-3">
            {!result ? (
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } }}
                  placeholder={lang === 'vn' ? 'Đáp án của bạn' : 'Your answer'}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 min-w-0 px-4 py-3 rounded-xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold text-lg focus:outline-none focus:border-[#1cb0f6]"
                />
                <button
                  onClick={check}
                  disabled={!draft.trim()}
                  className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest bg-[#1cb0f6] border-2 border-b-[4px] border-[#1899d6] text-white hover:bg-[#159bd9] active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  {lang === 'vn' ? 'Kiểm tra' : 'Check'}
                </button>
              </div>
            ) : (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-black text-sm uppercase tracking-widest
                ${result.correct
                  ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>
                {result.correct
                  ? <><CheckCircle2 className="w-5 h-5" strokeWidth={3} />{lang === 'vn' ? 'Chính xác' : 'Correct'}</>
                  : result.shown
                    ? <><Eye className="w-5 h-5" strokeWidth={3} />{lang === 'vn' ? 'Đã xem lời giải' : 'Solution shown'}</>
                    : <><XCircle className="w-5 h-5" strokeWidth={3} />{lang === 'vn' ? 'Bạn viết' : 'You wrote'} “{result.value}”</>}
              </div>
            )}
          </div>
        )}

        {/* Reveal button row */}
        <div className="flex-shrink-0 px-5 sm:px-8 pb-4">
          <button onClick={toggle}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all border-2 border-b-[4px] active:border-b-2 active:translate-y-[2px]
              ${isRevealed
                ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                : `${theme.bg} border-black/20 text-white`}`}>
            {isRevealed ? <EyeOff className="w-5 h-5" strokeWidth={2.5} /> : <Eye className="w-5 h-5" strokeWidth={2.5} />}
            {isRevealed ? (lang === 'vn' ? 'Ẩn lời giải' : 'Hide solution') : (lang === 'vn' ? 'Xem lời giải' : 'Show solution')}
          </button>
        </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 p-3 sm:p-5 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button onClick={() => go(-1)} disabled={idx === 0}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 disabled:pointer-events-none bg-white dark:bg-slate-900">
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
          </button>

          <div className="flex-1 flex items-center justify-center gap-1.5">
            {problems.map((p, i) => (
              <button key={p.id} onClick={() => setIdx(i)} aria-label={`Question ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${i === idx ? `w-6 ${themeFor(p.tier).bg}` : revealed.has(p.id) ? 'w-2.5 bg-slate-300 dark:bg-slate-600' : 'w-2.5 bg-slate-200 dark:bg-slate-700'}`} />
            ))}
          </div>

          {isLast ? (
            <button onClick={finish}
              className="flex items-center px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase bg-[#58cc02] border-b-[4px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[4px] transition-all">
              <CheckCircle2 className="w-6 h-6 mr-2" strokeWidth={2.5} />
              {lang === 'vn' ? 'Xong' : 'Done'}
            </button>
          ) : (
            <button onClick={() => go(1)}
              className="flex items-center px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg tracking-widest uppercase bg-[#1cb0f6] border-b-[4px] border-[#1899d6] text-white hover:bg-[#159bd9] active:border-b-0 active:translate-y-[4px] transition-all">
              <span className="hidden sm:inline mr-1">{lang === 'vn' ? 'Tiếp' : 'Next'}</span>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
