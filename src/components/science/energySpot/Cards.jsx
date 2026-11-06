import { CheckCircle2, XCircle } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { ENERGIES, ENERGY_IDS, FAMILIES } from '../../../utils/energySpot';
import { familyInk } from './spotText.js';

/* ------------------------------------------------------------------ *
 * Name That Energy: the pieces the student taps. The eight energy cards
 * carry the deck's action poses (run, eat, fan your face…) and stay grey
 * until the answer is known, so their colour never gives away store or
 * transfer; afterwards stores are teal and transfers purple, as on the deck.
 * ------------------------------------------------------------------ */

/** A drawing from a string, in a white frame. */
export function PicFrame({ svg, ratio = '4 / 3', className = '' }) {
  return (
    <div className={`w-full rounded-xl overflow-hidden bg-white border-2 border-slate-200 dark:border-slate-700 ${className}`} style={{ aspectRatio: ratio }}>
      <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: svg || '' }} />
    </div>
  );
}

/**
 * The eight cards. `ids` limits them (the five stores); `selected` is one id or
 * a list (multi); `wrong` ids turn red and stay out; `right` turns green.
 */
export function EnergyCards({ poses, lang, ids = ENERGY_IDS, selected = null, wrong = [], right = null, locked = false, onPick, showFamily = false }) {
  const sel = Array.isArray(selected) ? selected : selected ? [selected] : [];
  return (
    <div className={`grid gap-1.5 sm:gap-2 ${ids.length > 5 ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-5'}`}>
      {ids.map((e) => {
        const on = sel.includes(e);
        const bad = wrong.includes(e);
        const good = right === e || (Array.isArray(right) && right.includes(e));
        const ink = showFamily ? familyInk(ENERGIES[e].family === 'transfer' ? 'transfer' : 'store') : null;
        return (
          <button key={e} type="button" disabled={locked || bad} onClick={() => onPick?.(e)} aria-pressed={on}
            className={`relative rounded-xl border-2 border-b-[4px] px-1 pt-1 pb-1.5 flex flex-col items-center gap-0.5 transition-all text-center
              ${good ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30'
                : bad ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 opacity-70'
                  : on ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/30'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-400'}
              disabled:cursor-default`}>
            {good && <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-[#3e7500]" strokeWidth={3} />}
            {bad && <XCircle className="absolute top-1 right-1 w-4 h-4 text-rose-500" strokeWidth={3} />}
            <div className="w-full h-10 sm:h-14 bg-white rounded-lg [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: poses?.[e] || '' }} />
            <span className="text-[10px] sm:text-xs font-black leading-tight text-slate-800 dark:text-slate-100" style={ink ? { color: ink } : undefined}>
              {tr(lang, ENERGIES[e].en, null, ENERGIES[e].fr)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Store or transfer: two big buttons. */
export function FamilyButtons({ lang, value = null, wrong = [], right = null, locked = false, onPick, small = false }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {['store', 'transfer'].map((f) => {
        const on = value === f;
        const bad = wrong.includes(f);
        const good = right === f;
        return (
          <button key={f} type="button" disabled={locked || bad} onClick={() => onPick?.(f)} aria-pressed={on}
            className={`rounded-xl border-2 border-b-[4px] ${small ? 'px-2 py-1.5' : 'px-3 py-2.5'} text-left transition-all disabled:cursor-default
              ${good ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30'
                : bad ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 opacity-70'
                  : on ? 'text-white' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-400'}`}
            style={on && !good && !bad ? { backgroundColor: familyInk(f), borderColor: familyInk(f) } : undefined}>
            <div className={`font-black ${small ? 'text-xs' : 'text-sm sm:text-base'} ${on && !good && !bad ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
              {tr(lang, FAMILIES[f].en, null, FAMILIES[f].fr)}
            </div>
            {!small && (
              <div className={`text-[11px] sm:text-xs font-semibold leading-snug ${on && !good && !bad ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                {tr(lang, FAMILIES[f].says, null, FAMILIES[f].saysFr)}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
