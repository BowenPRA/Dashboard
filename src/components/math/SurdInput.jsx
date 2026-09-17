/**
 * Typed answer boxes for surds, shared by Surd Breaker and Rationalise It.
 *
 *   <SurdBox>       [ k ] √[ r ]    one term: a number in front, a number under
 *                                   the root. An empty root box means "no root",
 *                                   so 5 is typed as [5] √[ ].
 *   <NumberBox>     [ n ]           a plain whole number (may be negative).
 *
 * Both only accept digits and a leading minus, and share the ring colours the
 * other maths tasks use: good (green), bad (rose), shown (amber).
 */

const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

const clean = (v, allowMinus) => {
  // A typeset minus (−) is a minus; stripping it turned −3 into 3.
  const s = String(v ?? '').replace(/[−–]/g, '-').replace(allowMinus ? /[^\d-]/g : /[^\d]/g, '');
  return allowMinus ? s.replace(/(?!^)-/g, '') : s;
};

export function NumberBox({ value, onChange, onEnter, state, disabled, label, width = 'w-16', allowMinus = true, autoFocus = false }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      // The iPhone numeric keypad has no minus key, so a box that takes negatives
      // needs the full keyboard.
      inputMode={allowMinus ? 'text' : 'numeric'}
      aria-label={label}
      autoFocus={autoFocus}
      onChange={(e) => onChange(clean(e.target.value, allowMinus))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      placeholder="?"
      spellCheck={false}
      autoComplete="off"
      className={`${width} px-1.5 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 disabled:opacity-80 ${RING[state] || IDLE}`}
    />
  );
}

export function SurdBox({ coef, rad, onCoef, onRad, onEnter, state, disabled, label = 'surd', radFixed = null, autoFocus = false }) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      <NumberBox value={coef} onChange={onCoef} onEnter={onEnter} state={state} disabled={disabled} label={`${label}: number in front`} width="w-14" autoFocus={autoFocus} />
      <span className="inline-flex items-stretch ml-0.5">
        {/* The root sign is drawn, so the box sits under its bar like a written root. */}
        <svg viewBox="0 0 22 40" className="h-11 w-5 shrink-0 text-slate-700 dark:text-slate-200" aria-hidden="true">
          <path d="M1 24 L6 21 L11 36 L19 3 L22 3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <span className="border-t-[2.4px] border-slate-700 dark:border-slate-200 mt-[3px] pt-1 pr-0.5">
          {radFixed != null ? (
            <span className="inline-block min-w-[2rem] px-1 font-mono font-black text-lg text-slate-800 dark:text-slate-100 text-center">{radFixed}</span>
          ) : (
            <NumberBox value={rad} onChange={onRad} onEnter={onEnter} state={state} disabled={disabled} label={`${label}: number under the root`} width="w-14" allowMinus={false} />
          )}
        </span>
      </span>
    </span>
  );
}
