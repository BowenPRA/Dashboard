import React, { useState, useMemo, useEffect, Component } from 'react';
import { Eye, EyeOff, CheckCircle2, XCircle, Construction, ChevronLeft, ChevronRight, ChevronDown, Lightbulb, GripVertical, CornerDownRight, Check, RotateCcw, HelpCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { renderMath } from '../components/notes/renderMath';
import { answersEquivalent } from '../utils/mathEquivalence';

/* ------------------------------------------------------------------ *
 * Slide-per-problem practice. Reads a unit's `workbook` array:
 *   [{ tier, tierVn, questions: [{ id, prompt, promptVn, type?,
 *        solution:[…], solutionVn:[…], answer, answerVn, … }] }]
 * One problem per screen; each question carries its own answer widget
 * (a typed box, multiple choice, fill-in boxes, dropdowns, or drag-and-
 * drop), and "Show solution" reveals the worked steps. Marking is local.
 * See docs/workbook-tasks.md.
 * ------------------------------------------------------------------ */

// Same KaTeX boundary as the Notes deck, but the workbook keeps its own tighter
// block spacing and its one-line error fallback.
const SafeInlineMath = ({ math }) => {
  const { html, error } = renderMath(math, false);
  if (error) return <span className="text-rose-500 font-mono text-sm px-1" title={error}>{math}</span>;
  return <span className="mx-0.5" dangerouslySetInnerHTML={{ __html: html }} />;
};
const SafeBlockMath = ({ math }) => {
  const { html, error } = renderMath(math, true);
  if (error) return <span className="text-rose-500 font-mono text-sm px-1" title={error}>{math}</span>;
  return <div className="overflow-x-auto py-2 flex justify-center custom-scrollbar" dangerouslySetInnerHTML={{ __html: html }} />;
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
  Focus:     { bg: 'bg-[#58cc02]', text: 'text-[#58a700] dark:text-[#7bd42f]', soft: 'bg-[#58cc02]/10', ring: 'ring-[#58cc02]' },
  Practice:  { bg: 'bg-[#1cb0f6]', text: 'text-[#1899d6] dark:text-[#5cc4f7]', soft: 'bg-[#1cb0f6]/10', ring: 'ring-[#1cb0f6]' },
  Challenge: { bg: 'bg-[#ce82ff]', text: 'text-[#a855f7] dark:text-[#d6a6ff]', soft: 'bg-[#ce82ff]/10', ring: 'ring-[#ce82ff]' },
};
const themeFor = (t) => TIER_THEME[t] || TIER_THEME.Practice;

class WidgetBoundary extends Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

/* ------------------------------------------------------------------ *
 * Answer types. A question's `type` picks the widget:
 *   'text'  (default) — one typed box, marked by algebraic equivalence
 *   'mcq'   — tap one option
 *   'fill_blank' — inline sentence with typed boxes
 *   'inline' — inline sentence with dropdowns
 *   'dnd' / 'order' — drag chips into targets (unordered / ordered)
 * Every widget renders live while answering and "frozen + marked" once
 * checked (`checked` prop), so the same component shows the result too.
 * ------------------------------------------------------------------ */

const emptyValue = (q) => {
  const t = q.type || 'text';
  if (t === 'text') return '';
  if (t === 'mcq') return null;
  return {}; // fill_blank, inline, dnd, order
};

// A question counts toward XP only when it has something to mark against.
const isScorable = (q) => {
  const t = q.type || 'text';
  if (t === 'mcq') return q.correct != null;
  if (t === 'fill_blank' || t === 'inline') return q.blanks && Object.keys(q.blanks).length > 0;
  if (t === 'dnd' || t === 'order') return q.correctSets && Object.keys(q.correctSets).length > 0;
  return !!q.answer;
};

const expectedDndCount = (q) => (q.targets || []).reduce((n, tg) => n + (q.correctSets?.[tg.id]?.length || 1), 0);

// Enough input entered for the Check button to light up.
const isAnswerable = (q, value) => {
  const t = q.type || 'text';
  if (t === 'mcq') return value != null;
  if (t === 'fill_blank' || t === 'inline') {
    const keys = Object.keys(q.blanks || {});
    return keys.length > 0 && keys.every((k) => value?.[k] != null && String(value[k]).trim() !== '');
  }
  if (t === 'dnd' || t === 'order') return Object.values(value || {}).flat().length >= expectedDndCount(q);
  return typeof value === 'string' && value.trim() !== '';
};

// Mark a filled-in answer right or wrong.
const gradeQuestion = (q, value) => {
  const t = q.type || 'text';
  if (t === 'mcq') return value != null && value === q.correct;
  if (t === 'fill_blank') {
    const keys = Object.keys(q.blanks || {});
    return keys.length > 0 && keys.every((k) => {
      const v = value?.[k];
      if (v == null || String(v).trim() === '') return false;
      return answersEquivalent(String(v), q.blanks[k].correct, q.blanks[k].accept);
    });
  }
  if (t === 'inline') {
    const keys = Object.keys(q.blanks || {});
    return keys.length > 0 && keys.every((k) => value?.[k] === q.blanks[k].correct);
  }
  if (t === 'dnd' || t === 'order') {
    const targets = (q.targets || []).map((x) => x.id);
    return targets.length > 0 && targets.every((id) => {
      const got = value?.[id] || [];
      const want = q.correctSets?.[id] || [];
      if (got.length !== want.length) return false;
      if (t === 'order') return got.every((v, i) => v === want[i]);
      const pool = [...want];
      for (const v of got) { const i = pool.indexOf(v); if (i === -1) return false; pool.splice(i, 1); }
      return true;
    });
  }
  return answersEquivalent(String(value ?? ''), q.answer, q.accept);
};

// --- Multiple choice -------------------------------------------------
const ChoiceAnswer = ({ q, value, onChange, checked, lang }) => (
  <div className="flex flex-col gap-3">
    {(q.options || []).map((opt) => {
      const selected = value === opt.val;
      const isRight = opt.val === q.correct;
      let box = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 border-b-[4px] hover:bg-slate-50 dark:hover:bg-slate-700/50 active:border-b-2 active:translate-y-[2px]';
      let dot = 'border-slate-300 dark:border-slate-600';
      if (checked) {
        if (isRight) { box = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] border-b-[4px]'; dot = 'border-[#58a700] bg-[#58a700]'; }
        else if (selected) { box = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 border-b-[4px]'; dot = 'border-rose-400 bg-rose-400'; }
        else { box = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'; }
      } else if (selected) { box = 'bg-[#1cb0f6]/10 border-[#1cb0f6] border-b-[4px] active:border-b-2 active:translate-y-[2px]'; dot = 'border-[#1cb0f6] bg-[#1cb0f6]'; }
      const label = lang === 'vn' && opt.textVn != null ? opt.textVn : opt.text;
      return (
        <button key={opt.val} onClick={() => !checked && onChange(opt.val)} disabled={checked}
          className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${box}`}>
          <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${dot}`}>
            <span className={`w-3 h-3 rounded-full bg-white transition-transform ${selected || (checked && isRight) ? 'scale-100' : 'scale-0'}`} />
          </span>
          <span className="font-bold text-lg sm:text-xl text-slate-700 dark:text-slate-200 min-w-0"><RichText text={label} /></span>
          {checked && isRight && <CheckCircle2 className="w-6 h-6 ml-auto text-[#58a700] shrink-0" strokeWidth={3} />}
          {checked && selected && !isRight && <XCircle className="w-6 h-6 ml-auto text-rose-400 shrink-0" strokeWidth={3} />}
        </button>
      );
    })}
  </div>
);

// --- Inline sentence with typed boxes or dropdowns -------------------
const BlankSentence = ({ q, value, onChange, checked, lang, mode }) => {
  const parts = (lang === 'vn' && q.textPartsVn) ? q.textPartsVn : (q.textParts || []);
  const answers = value || {};
  return (
    <div className="text-slate-700 dark:text-slate-200 text-lg sm:text-2xl font-semibold leading-[2.4] bg-slate-50 dark:bg-slate-800/40 p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
      {parts.map((part, i) => {
        const key = (i + 1).toString();
        const blank = q.blanks?.[key];
        const val = answers[key] ?? '';
        let style = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200';
        let correctText = null;
        if (checked && blank) {
          const ok = mode === 'select'
            ? val === blank.correct
            : val !== '' && answersEquivalent(String(val), blank.correct, blank.accept);
          if (ok) style = 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3d8b00] dark:text-lime-300';
          else {
            style = 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-300';
            const opt = blank.options?.find((o) => o.val === blank.correct);
            correctText = mode === 'select' ? (opt?.text ?? blank.correct) : blank.correct;
          }
        }
        return (
          <React.Fragment key={i}>
            <RichText text={part} />
            {blank && (
              <span className="inline-flex items-center align-middle mx-1.5">
                {mode === 'select' ? (
                  <span className="relative inline-block">
                    <select value={val} onChange={(e) => onChange({ ...answers, [key]: e.target.value })} disabled={checked}
                      className={`appearance-none font-black outline-none cursor-pointer pr-9 pl-4 py-1.5 rounded-xl border-2 border-b-[4px] ${style}`}>
                      <option value="" disabled>…</option>
                      {(blank.options || []).map((o) => (
                        <option key={o.val} value={o.val}>{lang === 'vn' && o.textVn != null ? o.textVn : o.text}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60" strokeWidth={3} />
                  </span>
                ) : (
                  <input type="text" value={val} onChange={(e) => onChange({ ...answers, [key]: e.target.value })} disabled={checked}
                    inputMode={blank.numeric === false ? 'text' : 'text'} spellCheck={false} autoComplete="off" placeholder="?"
                    style={{ width: `${blank.width || 4}ch` }}
                    className={`text-center font-black outline-none px-3 py-1.5 rounded-xl border-2 border-b-[4px] min-w-[3.5rem] ${style}`} />
                )}
                {correctText != null && (
                  <span className="ml-2 px-2.5 py-1 rounded-lg text-sm font-black bg-[#d7ffb8] dark:bg-lime-900/40 text-[#3d8b00] dark:text-lime-300 border-2 border-[#58a700]">
                    <RichText text={String(correctText)} />
                  </span>
                )}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// --- Drag-and-drop into targets (unordered match / ordered sequence) --
const DragAnswer = ({ q, value, onChange, checked, lang }) => {
  const [picked, setPicked] = useState(null);
  const [dragged, setDragged] = useState(null);
  const placements = value || {};
  const label = (item) => (lang === 'vn' && item.textVn != null ? item.textVn : item.text);
  const placed = Object.values(placements).flat();
  const bank = (q.bank || []).filter((it) => !placed.includes(it.val));

  const place = (targetId) => {
    if (checked || !picked) return;
    onChange({ ...placements, [targetId]: [...(placements[targetId] || []), picked.val] });
    setPicked(null);
  };
  const remove = (targetId, val) => {
    if (checked) return;
    onChange({ ...placements, [targetId]: (placements[targetId] || []).filter((v) => v !== val) });
  };
  const drop = (targetId) => {
    if (checked || !dragged) return;
    const next = {};
    Object.keys(placements).forEach((id) => { next[id] = placements[id].filter((v) => v !== dragged.val); });
    next[targetId] = [...(next[targetId] || []), dragged.val];
    onChange(next);
    setDragged(null); setPicked(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {!checked && (
        <div className="flex flex-wrap gap-2.5 items-center justify-center p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40 min-h-[72px]">
          {bank.length === 0
            ? <span className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2"><Check className="w-5 h-5" />{lang === 'vn' ? 'Đã đặt hết' : 'All placed'}</span>
            : bank.map((it) => (
              <button key={it.val} draggable onClick={() => setPicked(picked?.val === it.val ? null : it)}
                onDragStart={(e) => { setDragged(it); e.dataTransfer.effectAllowed = 'move'; }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-b-[4px] font-bold cursor-grab active:cursor-grabbing transition-all
                  ${picked?.val === it.val ? 'bg-[#1cb0f6] border-[#1899d6] text-white scale-105' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:-translate-y-0.5'}`}>
                <GripVertical className="w-4 h-4 opacity-40" strokeWidth={3} /><RichText text={label(it)} />
              </button>
            ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        {(q.targets || []).map((target) => {
          const here = placements[target.id] || [];
          const active = !!picked && !checked;
          return (
            <div key={target.id} onClick={() => place(target.id)}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }} onDrop={(e) => { e.preventDefault(); drop(target.id); }}
              className={`flex flex-col sm:flex-row items-stretch rounded-2xl border-2 overflow-hidden transition-all bg-white dark:bg-slate-800
                ${active ? 'border-[#1cb0f6] ring-4 ring-[#1cb0f6]/20 cursor-pointer' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="bg-slate-50 dark:bg-slate-900 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-200 dark:border-slate-700 p-3 flex items-center justify-center sm:w-2/5 shrink-0">
                <span className="font-black text-slate-500 dark:text-slate-400 text-center text-sm sm:text-base"><RichText text={lang === 'vn' && target.titleVn != null ? target.titleVn : target.title} /></span>
              </div>
              <div className="flex-1 p-3 min-h-[64px] flex flex-wrap gap-2 items-center">
                {here.length === 0 && (
                  <span className={`flex items-center gap-2 font-black uppercase tracking-widest text-xs ${active ? 'text-[#1cb0f6] animate-pulse' : checked ? 'text-rose-400' : 'text-slate-300 dark:text-slate-600'}`}>
                    {checked ? (lang === 'vn' ? 'Bỏ trống' : 'Left blank') : (<><CornerDownRight className="w-4 h-4" />{active ? (lang === 'vn' ? 'Đặt vào đây' : 'Tap to place') : (lang === 'vn' ? 'Kéo vào đây' : 'Drop here')}</>)}
                  </span>
                )}
                {here.map((val, idx) => {
                  const it = (q.bank || []).find((b) => b.val === val);
                  if (!it) return null;
                  let style = 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200';
                  let ok = false;
                  if (checked) {
                    const want = q.correctSets?.[target.id] || [];
                    ok = q.type === 'order' ? want[idx] === val : want.includes(val);
                    style = ok ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3d8b00] dark:text-lime-300' : 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-300';
                  }
                  return (
                    <button key={val} onClick={(e) => { e.stopPropagation(); remove(target.id, val); }} disabled={checked}
                      className={`px-3.5 py-2 rounded-xl border-2 font-bold flex items-center gap-1.5 transition-all ${style} ${!checked ? 'hover:border-rose-400 hover:text-rose-500' : ''}`}>
                      <RichText text={label(it)} />
                      {!checked && <XCircle className="w-4 h-4 opacity-40" />}
                      {checked && (ok ? <CheckCircle2 className="w-4 h-4 text-[#58a700]" strokeWidth={3} /> : <XCircle className="w-4 h-4 text-rose-400" strokeWidth={3} />)}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Plain typed box (the default) -----------------------------------
const TextAnswer = ({ value, onChange, onEnter, checked, correct, lang, result }) => {
  if (checked) {
    return (
      <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border-2 font-black
        ${correct ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3d8b00] dark:text-lime-300'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}>
        {correct
          ? <><CheckCircle2 className="w-5 h-5" strokeWidth={3} />{lang === 'vn' ? 'Chính xác' : 'Correct'}</>
          : result?.shown
            ? <><Eye className="w-5 h-5" strokeWidth={3} />{lang === 'vn' ? 'Đã xem lời giải' : 'Solution shown'}</>
            : <><XCircle className="w-5 h-5" strokeWidth={3} />{lang === 'vn' ? 'Bạn viết' : 'You wrote'} “{result?.value}”</>}
      </div>
    );
  }
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onEnter(); } }}
      placeholder={lang === 'vn' ? 'Nhập đáp án của bạn' : 'Type your answer'} spellCheck={false} autoComplete="off"
      className="w-full px-4 py-3.5 rounded-xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold text-lg focus:outline-none focus:border-[#1cb0f6]" />
  );
};

// Choose the widget for a question.
const AnswerWidget = ({ q, value, onChange, onEnter, checked, lang, result }) => {
  const t = q.type || 'text';
  if (t === 'mcq') return <ChoiceAnswer q={q} value={value} onChange={onChange} checked={checked} lang={lang} />;
  if (t === 'fill_blank') return <BlankSentence q={q} value={value} onChange={onChange} checked={checked} lang={lang} mode="input" />;
  if (t === 'inline') return <BlankSentence q={q} value={value} onChange={onChange} checked={checked} lang={lang} mode="select" />;
  if (t === 'dnd' || t === 'order') return <DragAnswer q={q} value={value} onChange={onChange} checked={checked} lang={lang} />;
  return <TextAnswer value={value} onChange={onChange} onEnter={onEnter} checked={checked} correct={result?.correct} lang={lang} result={result} />;
};

// `title` lets a unit run TWO workbook tasks (WORKBOOK and WORKBOOK_B, one per
// textbook exercise) without both bars reading "Workbook Practice".
export default function Workbook({ pool, onComplete, onQuit, savedData = {}, onProgress, title = 'Workbook Practice' }) {
  const problems = useMemo(() => {
    const groups = Array.isArray(pool) ? pool : [];
    return groups.flatMap((g) => (g.questions || []).map((q) => ({ ...q, tier: g.tier, tierVn: g.tierVn })));
  }, [pool]);

  const [idx, setIdx] = useState(0);
  const [lang, setLang] = useState('en');
  // A correct answer from a previous attempt is restored so it is not asked
  // again — it shows as already solved (method visible) and the student skips
  // past it. Only correct answers are persisted, so wrong ones stay retryable.
  const [results, setResults] = useState(() => savedData || {}); // id -> { value, correct, shown }
  const [revealed, setRevealed] = useState(() => new Set(Object.keys(savedData || {})));
  const [drafts, setDrafts] = useState({});   // id -> what they have entered so far

  const total = problems.length;
  const q = problems[idx];
  const isRevealed = q ? revealed.has(q.id) : false;
  const scorable = useMemo(() => problems.filter(isScorable), [problems]);
  const result = q ? results[q.id] : null;
  const answerable = q ? isScorable(q) : false;
  // Keyed by question rather than reset on navigation, so flicking back to an
  // unanswered problem still shows what was entered.
  const draft = q ? (drafts[q.id] ?? emptyValue(q)) : '';
  const setDraft = (v) => setDrafts((prev) => ({ ...prev, [q.id]: v }));

  // XP is the share of markable questions answered right before the reveal;
  // the resume blob keeps only the correct ones so they can be skipped next time.
  const scoreFrom = (res) => (scorable.length
    ? Math.round((scorable.filter((p) => res[p.id]?.correct).length / scorable.length) * 10)
    : 10);
  const blobFrom = (res) => Object.fromEntries(
    Object.entries(res).filter(([, r]) => r?.correct).map(([id, r]) => [id, { value: r.value, correct: true }])
  );
  const itemsFrom = (res) => scorable.map((p) => ({ itemId: p.id, correct: !!res[p.id]?.correct }));

  const applyResult = (correct, shown) => {
    if (results[q.id]) return results;
    const next = { ...results, [q.id]: { value: draft, correct, shown } };
    setResults(next);
    return next;
  };

  const check = () => {
    if (!answerable || result || !isAnswerable(q, draft)) return;
    const correct = gradeQuestion(q, draft);
    const next = applyResult(correct, false);
    setRevealed((prev) => new Set(prev).add(q.id)); // right or wrong, show the method
    // Checkpoint a correct answer immediately, so exiting keeps it and the next
    // attempt skips it. A wrong answer changes neither the score nor the blob.
    if (correct) onProgress?.(scoreFrom(next), blobFrom(next), { items: itemsFrom(next) });
  };

  // "Show me how" before answering — allowed (it is practice), scores nothing.
  const reveal = () => {
    if (answerable && !results[q.id]) applyResult(false, true);
    setRevealed((prev) => new Set(prev).add(q.id));
  };
  const hideSolution = () => setRevealed((prev) => { const n = new Set(prev); n.delete(q.id); return n; });
  const retry = () => {
    // Only offered before a real Check — clears a "shown" peek so the student
    // can still have a go. A checked answer is final for the session.
    setResults((prev) => { const n = { ...prev }; delete n[q.id]; return n; });
    setRevealed((prev) => { const n = new Set(prev); n.delete(q.id); return n; });
    setDraft(emptyValue(q));
  };
  const go = (d) => setIdx((i) => Math.max(0, Math.min(total - 1, i + d)));

  // Save AND leave — used by both "Done" and the quit button, so exiting the
  // task banks every correct answer rather than discarding the session.
  const finish = () => onComplete?.(scoreFrom(results), scorable.length ? blobFrom(results) : null, { items: itemsFrom(results) });

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, total]); // eslint-disable-line react-hooks/exhaustive-deps -- go is re-created each render; re-binding each render is worse

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
  const checked = !!result; // widget frozen + marked once there is any result

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148,163,184,0.35); border-radius: 10px; }
      ` }} />

      <TopBar onQuit={finish} modeTitle={title} current={idx + 1} total={total}
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

        {/* Body — prompt, answer widget, feedback, then solution */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 space-y-5">
          {/* Prompt */}
          <div className="text-slate-800 dark:text-slate-100 font-semibold text-xl sm:text-2xl leading-relaxed">
            <RichText text={prompt} />
          </div>

          {/* Diagram (swaps to solved on reveal) */}
          {diagram && (
            <div className="flex flex-col items-center">
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

          {/* Answer widget — where the student works */}
          {answerable && (
            <div className="pt-1">
              <AnswerWidget q={q} value={draft} onChange={setDraft} onEnter={check} checked={checked} lang={lang} result={result} />
            </div>
          )}

          {/* Feedback banner after a real Check (skip for a bare "shown" peek) */}
          {checked && !result.shown && (
            <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 font-black text-sm sm:text-base
              ${result.correct
                ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3d8b00] dark:text-lime-300'
                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'}`}>
              {result.correct
                ? <><CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} />{lang === 'vn' ? 'Chính xác! Làm tốt lắm.' : 'Correct — nice work!'}</>
                : <><XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />{lang === 'vn' ? 'Chưa đúng — xem các bước bên dưới.' : 'Not quite — follow the steps below.'}</>}
            </div>
          )}

          {/* Solution */}
          {isRevealed && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-5 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
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

        {/* Action bar — one clear next step */}
        <div className="flex-shrink-0 px-5 sm:px-8 py-3 border-t-2 border-slate-100 dark:border-slate-800">
          {!answerable ? (
            // Nothing to mark (e.g. "copy and complete the table") — just reveal.
            <button onClick={isRevealed ? hideSolution : reveal}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-b-[4px] active:border-b-2 active:translate-y-[2px]
                ${isRevealed ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400' : `${theme.bg} border-black/20 text-white`}`}>
              {isRevealed ? <EyeOff className="w-5 h-5" strokeWidth={2.5} /> : <Eye className="w-5 h-5" strokeWidth={2.5} />}
              {isRevealed ? (lang === 'vn' ? 'Ẩn lời giải' : 'Hide solution') : (lang === 'vn' ? 'Xem lời giải' : 'Show solution')}
            </button>
          ) : !result ? (
            // Answering: primary Check, secondary "I'm stuck".
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={check} disabled={!isAnswerable(q, draft)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-base uppercase tracking-widest bg-[#58cc02] border-2 border-b-[4px] border-[#58a700] text-white hover:bg-[#4fb802] active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-40 disabled:pointer-events-none">
                <CheckCircle2 className="w-5 h-5" strokeWidth={3} />{lang === 'vn' ? 'Kiểm tra' : 'Check'}
              </button>
              <button onClick={reveal}
                className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-black text-sm uppercase tracking-widest bg-white dark:bg-slate-800 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 active:border-b-2 active:translate-y-[2px] transition-all">
                <HelpCircle className="w-5 h-5" strokeWidth={2.5} />{lang === 'vn' ? 'Gợi ý' : "I'm stuck"}
              </button>
            </div>
          ) : (
            // Answered: toggle the solution, and let a peeker try again.
            <div className="flex gap-2">
              <button onClick={isRevealed ? hideSolution : reveal}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-widest bg-slate-100 dark:bg-slate-800 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 active:border-b-2 active:translate-y-[2px]">
                {isRevealed ? <EyeOff className="w-5 h-5" strokeWidth={2.5} /> : <Eye className="w-5 h-5" strokeWidth={2.5} />}
                {isRevealed ? (lang === 'vn' ? 'Ẩn lời giải' : 'Hide solution') : (lang === 'vn' ? 'Xem lời giải' : 'Show solution')}
              </button>
              {result.shown && (
                <button onClick={retry}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-black text-sm uppercase tracking-widest bg-[#1cb0f6]/10 border-2 border-b-[4px] border-[#1cb0f6]/40 text-[#1899d6] dark:text-[#5cc4f7] active:border-b-2 active:translate-y-[2px]">
                  <RotateCcw className="w-5 h-5" strokeWidth={2.5} />{lang === 'vn' ? 'Thử lại' : 'Try it'}
                </button>
              )}
            </div>
          )}
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

          <div className="flex-1 flex items-center justify-center gap-1.5 flex-wrap">
            {problems.map((p, i) => {
              const r = results[p.id];
              const dotColor = r?.correct ? 'bg-[#58cc02]' : r ? 'bg-slate-300 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-700';
              return (
                <button key={p.id} onClick={() => setIdx(i)} aria-label={`Question ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${i === idx ? `w-6 ${themeFor(p.tier).bg}` : `w-2.5 ${dotColor}`}`} />
              );
            })}
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
