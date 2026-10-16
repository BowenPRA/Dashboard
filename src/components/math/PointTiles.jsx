import { GHOSTS, placedText } from '../../utils/pointBack';
import { tr } from '../../utils/lang';

/**
 * The digits of a whole-number product with a tappable gap between every two
 * tiles — "put the point back" (Year 7 Maths 4.3, utils/pointBack.js). Used by
 * the Point Out, Point Back task and the `pointback` deck activity.
 *
 * Two faded 0 tiles always stand to the left of the digits, whatever the
 * question, so an answer that needs a placeholder zero (8 → 0.08) can be made
 * without the row giving that away. A faded 0 turns solid when the chosen point
 * needs it: after the point as a placeholder, or as the 0 in front of "0.".
 *
 *   row     the digits, e.g. '864'
 *   k       the decimal places chosen (null: no point yet); 0 = after the last digit
 *   onPick  (k) => void; omit for a read-only row
 *   tone    null | 'good' | 'bad' | 'shown'
 */
const TONE = {
  good: { tile: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200', dot: '#58a700' },
  bad: { tile: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300', dot: '#e11d48' },
  shown: { tile: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200', dot: '#d97706' },
};
const POINT = '#c25e12';

export default function PointTiles({ row, k = null, onPick, tone = null, lang = 'en', compact = false }) {
  const digits = String(row).split('');
  const len = digits.length;
  const tiles = [...Array(GHOSTS).fill(null), ...digits];   // null = a faded 0
  const gc = k == null ? null : len + GHOSTS - k;          // the chosen gap's index
  const look = tone ? TONE[tone] : null;
  const tileSize = compact ? 'w-7 h-10 text-xl sm:w-8 sm:h-11 sm:text-2xl' : 'w-8 h-12 text-2xl sm:w-10 sm:h-14 sm:text-3xl';
  const gapSize = compact ? 'w-3 h-10 sm:h-11' : 'w-3.5 sm:w-4 h-12 sm:h-14';

  const gap = (gi) => {
    const kk = len + GHOSTS - gi;
    const chosen = gi === gc;
    const label = tr(lang, `Put the point here: ${placedText(BigInt(row), kk)}`, null, `Mets le point ici : ${placedText(BigInt(row), kk)}`);
    const dot = <span className={`block rounded-full ${compact ? 'w-2 h-2' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'}`} style={{ backgroundColor: look?.dot || POINT }} />;
    if (!onPick) {
      return <span key={`g${gi}`} className={`${gapSize} flex items-end justify-center pb-1.5`} aria-hidden="true">{chosen && dot}</span>;
    }
    return (
      <button key={`g${gi}`} type="button" onClick={() => onPick(kk)} aria-label={label} title={label} aria-pressed={chosen}
        className={`group relative ${gapSize} flex items-end justify-center pb-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400`}>
        {/* a wider, invisible hit area over the tile edges: a 14px gap is a small target for a thumb */}
        <span className="absolute inset-y-0 -inset-x-2 z-10" aria-hidden="true" />
        {chosen ? dot : <span className={`block rounded-full opacity-0 group-hover:opacity-40 ${compact ? 'w-2 h-2' : 'w-2.5 h-2.5'}`} style={{ backgroundColor: POINT }} />}
      </button>
    );
  };

  const out = [gap(0)];
  tiles.forEach((d, t) => {
    const ghost = d === null;
    // a faded 0 is needed when it sits after the point, or is the 0 of "0." in front of it
    const needed = ghost && gc != null && (t >= gc || (t === gc - 1 && k >= len));
    const style = ghost && !needed
      ? 'border-dashed border-slate-300 dark:border-slate-600 text-slate-300 dark:text-slate-600 bg-transparent'
      : ghost ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200'
        : look ? look.tile : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
    out.push(
      <span key={`t${t}`} className={`${tileSize} rounded-lg border-2 border-b-[4px] flex items-center justify-center font-mono font-black select-none ${style}`}>
        {ghost ? '0' : d}
      </span>,
    );
    out.push(gap(t + 1));
  });

  return (
    <div>
      <div className="flex items-end justify-center">{out}</div>
      <div className="mt-2 text-center min-h-[2rem]" aria-live="polite">
        {k != null && <span className={`font-mono font-black ${compact ? 'text-xl' : 'text-2xl'} ${look ? '' : 'text-slate-800 dark:text-slate-100'}`} style={look ? { color: look.dot } : undefined}>{placedText(BigInt(row), k)}</span>}
      </div>
    </div>
  );
}
