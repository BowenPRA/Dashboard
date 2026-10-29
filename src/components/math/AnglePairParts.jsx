import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { tr } from '../../utils/lang';
import { PAIR_LABEL, sentencesOf } from '../../utils/anglePairs';
import { apT } from './anglePairWords';

/**
 * The pieces of an X, F or Z? stage that the task (tasks/AnglePairs.jsx) and
 * the deck activity (notes/AnglePairActivity.jsx) share: the words, the pair
 * buttons, the size box, the message and the reason sentences.
 */
const BAD = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
const IDLE = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-orange-400';

/** The five pair buttons (two on an X): the letter, the name, and in French the English word too. */
export function PairButtons({ options, picks, onChoose, lang, compact = false }) {
  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {options.map((id) => {
        const p = PAIR_LABEL[id];
        const state = picks[id];
        return (
          <button key={id} type="button" disabled={!!state} onClick={() => onChoose(id)}
            className={`flex items-center gap-2 text-left rounded-xl border-2 border-b-[4px] transition-all disabled:cursor-default ${compact ? 'px-2 py-1.5' : 'px-3 py-2.5'} ${state === 'bad' ? BAD : IDLE} ${id === 'none' && !compact ? 'sm:col-span-2' : ''}`}>
            <span className={`shrink-0 grid place-items-center rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 font-black ${compact ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-lg'}`}>{p.mark}</span>
            <span className="min-w-0">
              <span className={`block font-black leading-tight ${compact ? 'text-xs' : 'text-sm sm:text-base'}`}>{tr(lang, p.en, null, p.fr)}</span>
              {lang === 'fr' && id !== 'none' && <span className="block text-[10px] font-bold text-slate-400 leading-tight">{p.en.toLowerCase()}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ReasonButtons({ picks, onChoose, lang, compact = false }) {
  const t = apT(lang);
  return (
    <div className="grid gap-2 grid-cols-1">
      {['same', 'perp', 'eye'].map((id) => (
        <button key={id} type="button" disabled={!!picks[id]} onClick={() => onChoose(id)}
          className={`text-left rounded-xl border-2 border-b-[4px] font-black transition-all disabled:cursor-default ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2.5 text-sm sm:text-base'} ${picks[id] === 'bad' ? BAD : IDLE}`}>
          {t.reasons[id]}
        </button>
      ))}
    </div>
  );
}

/** The size box: Enter checks it and goes no further (a deck's Enter-for-next must not skip the verdict). */
export function SizeInput({ letter, onCheck, lang, bad = false, compact = false }) {
  const t = apT(lang);
  const [typed, setTyped] = useState('');
  const go = () => { if (typed.trim()) { onCheck(typed); setTyped(''); } };
  return (
    <div className="flex items-center justify-end gap-2">
      <span className={`font-black text-slate-800 dark:text-slate-100 ${compact ? 'text-lg' : 'text-2xl'}`}>{letter} =</span>
      <input autoFocus value={typed} onChange={(e) => setTyped(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); go(); } }}
        inputMode="numeric" autoComplete="off" spellCheck={false} aria-label={letter} placeholder="?"
        className={`${compact ? 'w-20 text-lg' : 'w-24 text-2xl'} px-2 py-1 rounded-xl border-2 border-b-[4px] font-mono font-black text-center focus:outline-none focus:border-orange-500 ${bad ? BAD : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100'}`} />
      <span className={`font-black text-slate-500 ${compact ? 'text-lg' : 'text-2xl'}`}>°</span>
      <button type="button" onClick={go} disabled={!typed.trim()}
        className="px-4 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none">{t.check}</button>
    </div>
  );
}

export function ApMessage({ msg, lang }) {
  if (!msg) return null;
  const text = tr(lang, msg.en, null, msg.fr || msg.en);
  const soft = msg.tone === 'shown' || msg.tone === 'nudge';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  const Icon = msg.tone === 'ok' ? CheckCircle2 : soft ? Lightbulb : XCircle;
  return (
    <div className={`mt-3 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${tone}`}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />
      <span>{text}</span>
    </div>
  );
}

/** The finished item as the sentences to write: English, with the French beside it in FR. */
export function Sentences({ m, stone, lang, compact = false }) {
  return (
    <div className={`flex flex-col gap-1.5 ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
      {sentencesOf(m, stone).map((s, n) => (
        <p key={n} className="font-bold text-slate-900 dark:text-slate-100 leading-snug">{lang === 'fr' ? s.fr : s.en}</p>
      ))}
    </div>
  );
}
