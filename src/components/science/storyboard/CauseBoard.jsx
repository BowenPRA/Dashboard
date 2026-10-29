import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowDown } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { STEPS, cardText } from '../../../utils/solarStory';
import { FrameCard } from './OrderBoard.jsx';
import useTapDrag from './useTapDrag.js';

/* ------------------------------------------------------------------ *
 * Storyboard: the BECAUSE stage. The story's frames stand in order; under
 * each asked step is a gap, and a bank of reasons holds the right ones and two
 * misconceptions. Tap a reason, then tap a gap (or tap the gap first, then the
 * reason) — or drag a reason onto a gap. Tap a filled gap to send its reason
 * back. After a Check, right gaps lock green and wrong ones say why.
 * ------------------------------------------------------------------ */

const T = {
  en: { because: 'Why?', empty: 'Tap a reason, then tap here', bank: 'Reasons', used: 'All the reasons are in place.', why: (s) => `Why does “${s}” happen?` },
  fr: { because: 'Pourquoi ?', empty: 'Touche une raison, puis ici', bank: 'Les raisons', used: 'Toutes les raisons sont placées.', why: (s) => `Pourquoi l’étape « ${s} » arrive-t-elle ?` },
};

export function CauseBoard({ m, frames, placed, onChange, lang, per = null, locked = false }) {
  const t = T[lang] || T.en;
  const [picked, setPicked] = useState(null); // { card } from the bank, or { slot }
  const okAt = (s) => per?.find((p) => p.step === s);
  const isLocked = (s) => locked || okAt(s)?.ok === true;
  const usedCards = new Set(Object.values(placed));
  const free = m.bank.filter((c) => !usedCards.has(c));

  const place = (card, slot) => {
    if (isLocked(slot)) return;
    const next = { ...placed };
    for (const [s, c] of Object.entries(next)) if (c === card && !isLocked(s)) delete next[s];
    next[slot] = card;
    onChange(next);
  };
  const unplace = (slot) => {
    if (isLocked(slot) || !placed[slot]) return;
    const next = { ...placed };
    delete next[slot];
    onChange(next);
  };
  const { handlers, hover, tookDrag } = useTapDrag((card, to) => {
    setPicked(null);
    if (to === 'bank') {
      const slot = Object.keys(placed).find((s) => placed[s] === card);
      if (slot) unplace(slot);
    } else if (to.startsWith('slot:')) place(card, to.slice(5));
  });

  const tapCard = (card) => {
    if (locked || tookDrag()) return;
    if (picked?.slot) { place(card, picked.slot); setPicked(null); return; }
    setPicked(picked?.card === card ? null : { card });
  };
  const tapSlot = (slot) => {
    if (isLocked(slot) || tookDrag()) return;
    if (picked?.card) { place(picked.card, slot); setPicked(null); return; }
    if (placed[slot]) { unplace(slot); return; }
    setPicked(picked?.slot === slot ? null : { slot });
  };

  const cardBtn = (card, inSlot = null) => {
    const text = cardText(card);
    const on = picked?.card === card;
    const fixed = inSlot && isLocked(inSlot);
    return (
      <button key={card} type="button" disabled={locked || fixed}
        onClick={(e) => { e.stopPropagation(); if (inSlot) tapSlot(inSlot); else tapCard(card); }}
        {...(locked || fixed ? {} : handlers(card))}
        aria-pressed={on}
        className={`w-full text-left rounded-xl border-2 border-b-[4px] px-3 py-2 text-sm font-bold leading-snug select-none touch-pan-y transition-all
          ${on ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30 text-slate-800 dark:text-slate-100 ring-4 ring-amber-300/50'
            : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:border-amber-300 cursor-grab active:cursor-grabbing'}
          disabled:cursor-default`}>
        {tr(lang, text.en, null, text.fr)}
      </button>
    );
  };

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start">
      <div className="flex flex-col gap-2 min-w-0">
        {m.frames.map((step, i) => {
          const asked = m.ask.includes(step);
          const res = okAt(step);
          const name = tr(lang, STEPS[step].en, null, STEPS[step].fr);
          return (
            <div key={step} className="min-w-0">
              {i > 0 && <ArrowDown className="mx-auto w-4 h-4 text-amber-500 mb-1" strokeWidth={3} />}
              <div className="flex gap-2 items-stretch">
                <div className="w-24 sm:w-28 shrink-0"><FrameCard step={step} svg={frames?.[step]} lang={lang} showSays={false} compact /></div>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                  {!asked && <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-snug">{tr(lang, STEPS[step].says, null, STEPS[step].saysFr)}</p>}
                  {asked && (
                    <>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.why(name)}</div>
                      <div data-drop={`slot:${step}`}
                        role="button" tabIndex={isLocked(step) ? -1 : 0}
                        onClick={() => tapSlot(step)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tapSlot(step); } }}
                        className={`rounded-xl border-2 border-dashed min-h-[3rem] p-1 flex items-center transition-all
                          ${res?.ok ? 'border-solid border-[#58a700] bg-[#d7ffb8]/60 dark:bg-lime-900/20'
                            : res && !res.ok && res.code !== 'missing' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                              : hover === `slot:${step}` || picked?.slot === step ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20'
                                : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50'}`}>
                        {placed[step]
                          ? <div className="flex-1 min-w-0 flex items-start gap-1.5">
                            {res?.ok && <CheckCircle2 className="w-5 h-5 mt-2 shrink-0 text-[#58a700]" strokeWidth={3} />}
                            {res && !res.ok && res.code !== 'missing' && <XCircle className="w-5 h-5 mt-2 shrink-0 text-rose-500" strokeWidth={3} />}
                            <div className="flex-1 min-w-0">{cardBtn(placed[step], step)}</div>
                          </div>
                          : <span className="px-2 text-xs font-bold text-slate-400">{t.empty}</span>}
                      </div>
                      {res && !res.ok && res.code !== 'missing' && (
                        <p className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-300 leading-snug">{tr(lang, res.en, null, res.fr)}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div data-drop="bank" className={`rounded-2xl border-2 p-2.5 lg:sticky lg:top-4 ${hover === 'bank' ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'}`}>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.bank}</div>
        {free.length
          ? <div className="flex flex-col gap-2">{free.map((c) => cardBtn(c))}</div>
          : <p className="text-xs font-bold text-slate-400">{t.used}</p>}
      </div>
    </div>
  );
}
