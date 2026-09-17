import { SafeInlineMath } from '../notes/SafeMath.jsx';

/**
 * The area picture of a single bracket with every term positive: the outside
 * term is the rectangle's height, the inside terms split its width, and each
 * piece's area is one box of the grid. Widths are indicative (a letter term is
 * drawn wider than a small number), never to scale. Parts come from
 * areaParts() in ./algebraSteps.js.
 */
export default function AreaModel({ outerLatex, parts, caption }) {
  if (!parts?.length) return null;
  return (
    <div className="w-full">
      <div className="flex pl-10">
        {parts.map((p, i) => (
          <div key={i} className="min-w-0 pb-1 text-center text-base font-black text-violet-700 dark:text-violet-300" style={{ flex: `${p.weight} 1 0%` }}>
            <SafeInlineMath math={p.headLatex} />
          </div>
        ))}
      </div>
      <div className="flex items-stretch h-16 sm:h-20">
        <div className="w-10 shrink-0 flex items-center justify-center text-base font-black text-teal-700 dark:text-teal-300">
          <SafeInlineMath math={outerLatex} />
        </div>
        <div className="flex flex-1 min-w-0 rounded-lg overflow-hidden border-2 border-slate-700 dark:border-slate-400">
          {parts.map((p, i) => (
            <div
              key={i}
              className={`min-w-0 flex items-center justify-center text-lg font-black text-slate-800 dark:text-slate-100
                ${i ? 'border-l-2 border-slate-700 dark:border-slate-400' : ''}
                ${i % 2 ? 'bg-orange-100 dark:bg-orange-900/40' : 'bg-orange-50 dark:bg-orange-900/20'}`}
              style={{ flex: `${p.weight} 1 0%` }}>
              <SafeInlineMath math={p.cellLatex} />
            </div>
          ))}
        </div>
      </div>
      {caption && <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">{caption}</p>}
    </div>
  );
}
