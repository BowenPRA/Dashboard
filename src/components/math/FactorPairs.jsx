import { useState } from 'react';
import { Check } from 'lucide-react';
import { signedPairs } from '../../utils/quadratic.js';
import { tr } from '../../utils/lang.js';

/**
 * The factor-pair table: every pair of whole numbers that multiplies to P,
 * each one a tile. Tapping a tile turns it over to show its SUM, so finding
 * "multiply to 12, add to 7" becomes what it really is — checking the pairs
 * one by one until a sum matches — instead of a guess.
 *
 *   P, S       the product and the sum being hunted for
 *   tried      keys ("m,n") already turned over (controlled), or omitted for
 *              a self-contained table (the deck widget)
 *   onPick     (row) => void — the task marks the tap; the table just shows it
 *   hit        the right pair's key, to highlight (the solver shows it found)
 *   revealAll  show every sum (the solver's worked solution)
 *   ink        the task's colour
 *
 * Default export so the notes deck can mount it as a widget:
 *   widget: { type: 'FactorPairs', params: { P: 12, S: 7 } }
 */
export default function FactorPairs({ P, S, tried: triedProp, onPick, hit, revealAll = false, ink = '#7c3aed', lang = 'en', compact = false, max = 24 }) {
  const [own, setOwn] = useState([]);
  const tried = triedProp || own;
  const all = signedPairs(P);
  // A huge product has dozens of pairs; keep the right one and its neighbours.
  let rows = all;
  if (rows.length > max) {
    const at = Math.max(0, all.findIndex((r) => r.key === hit || r.sum === S));
    const from = Math.max(0, Math.min(at - Math.floor(max / 2), all.length - max));
    rows = all.slice(from, from + max);
  }
  const pick = (row) => {
    if (!triedProp) setOwn((t) => (t.includes(row.key) ? t : [...t, row.key]));
    onPick?.(row);
  };
  const shown = (row) => revealAll || tried.includes(row.key);
  const right = (row) => row.sum === S;
  const head = tr(lang, `Pairs that multiply to ${P}`, `Các cặp có tích bằng ${P}`);
  const sub = tr(lang, `Tap a pair to see what it adds to. You want ${S}.`, `Chạm vào một cặp để xem tổng. Em cần tổng bằng ${S}.`);
  return (
    <div className="w-full">
      {!compact && (
        <div className="mb-2">
          <div className="text-[11px] font-black uppercase tracking-widest" style={{ color: ink }}>{head}</div>
          {!revealAll && <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{sub}</div>}
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-1.5">
        {rows.map((row) => {
          const open = shown(row);
          const good = open && right(row);
          const isHit = hit === row.key;
          return (
            <button key={row.key} type="button" onClick={() => pick(row)} disabled={revealAll}
              className={`flex flex-col items-center rounded-xl border-2 border-b-[4px] px-2 py-1.5 font-mono font-black transition-all
                ${good || isHit ? 'bg-[#effbe5] border-[#58cc02] text-[#2f5d00] dark:bg-lime-950/40 dark:text-lime-200'
                  : open ? 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100'}
                ${revealAll ? 'cursor-default' : 'active:border-b-2 active:translate-y-[2px]'}`}>
              <span className="text-base leading-tight">{fmt(row.m)} × {fmt(row.n)}</span>
              <span className={`text-[11px] leading-tight ${open ? '' : 'invisible'}`}>
                {tr(lang, 'add', 'cộng')}: {fmt(row.m)} + {fmt(row.n)} = {fmt(row.sum)} {good || isHit ? <Check className="inline w-3 h-3 -mt-0.5" strokeWidth={4} /> : null}
              </span>
            </button>
          );
        })}
      </div>
      {rows.length < all.length && (
        <div className="mt-1 text-[11px] font-bold text-slate-400">{tr(lang, `Showing ${rows.length} of ${all.length} pairs.`, `Hiện ${rows.length} trên ${all.length} cặp.`)}</div>
      )}
    </div>
  );
}

const fmt = (n) => (n < 0 ? `−${-n}` : `${n}`);
