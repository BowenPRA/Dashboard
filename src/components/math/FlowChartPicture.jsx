import { SafeInlineMath } from '../notes/SafeMath.jsx';
import { opText, inverseOf } from '../../utils/algebra.js';
import { numLatex } from './algebraSteps.js';

/**
 * The flow chart of an equation as a compact, read-only picture — the
 * classroom Reverse widget's two rows. Top: what happens to the letter,
 * operation by operation, ending at the number on the other side. Bottom
 * (when `reverse`): the same boxes worked back from that number with the
 * inverse operations, arrows pointing left, ending at the solution. Columns
 * line up, so each inverse sits under the step it undoes. Scrolls inside its
 * own box when it is wider than the card.
 */

function Arrow({ label, left, tone }) {
  const stroke = tone === 'back' ? '#c2410c' : '#64748b';
  return (
    <div className="flex flex-col items-center justify-center px-1">
      <span className={`text-xs sm:text-sm font-black whitespace-nowrap ${tone === 'back' ? 'text-orange-700 dark:text-orange-300' : 'text-violet-700 dark:text-violet-300'}`}>{label}</span>
      <svg viewBox="0 0 48 12" className="w-10 sm:w-12 h-3" aria-hidden="true">
        <line x1="3" y1="6" x2="45" y2="6" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {left
          ? <path d="M3 6 L10 1.5 M3 6 L10 10.5" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          : <path d="M45 6 L38 1.5 M45 6 L38 10.5" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />}
      </svg>
    </div>
  );
}

function Node({ math, tone }) {
  const tones = {
    letter: 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200',
    step: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100',
    target: 'border-slate-500 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100',
    back: 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 text-slate-900 dark:text-slate-100',
    answer: 'border-orange-500 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200',
  };
  return (
    <div className={`min-w-[2.5rem] px-2 py-1 rounded-lg border-2 text-center text-base sm:text-lg font-black whitespace-nowrap ${tones[tone]}`}>
      <SafeInlineMath math={math} />
    </div>
  );
}

export default function FlowChartPicture({ model, reverse = true }) {
  const n = model.ops.length;
  const top = [model.letter, ...model.stepsLatex.slice(0, -1), numLatex(model.target)];
  const cols = 2 * n + 1;
  return (
    <div className="overflow-x-auto max-w-full">
      <div className="inline-grid items-center gap-y-2" style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}>
        {top.flatMap((tex, k) => [
          <div key={`t${k}`} className="flex justify-center"><Node math={tex} tone={k === 0 ? 'letter' : k === n ? 'target' : 'step'} /></div>,
          ...(k < n ? [<Arrow key={`ta${k}`} label={opText(model.ops[k])} />] : []),
        ])}
        {reverse && model.forward.flatMap((v, k) => [
          <div key={`b${k}`} className="flex justify-center"><Node math={k === 0 ? `${model.letter} = ${numLatex(v)}` : numLatex(v)} tone={k === 0 ? 'answer' : 'back'} /></div>,
          ...(k < n ? [<Arrow key={`ba${k}`} label={opText(inverseOf(model.ops[k]))} left tone="back" />] : []),
        ])}
      </div>
    </div>
  );
}
