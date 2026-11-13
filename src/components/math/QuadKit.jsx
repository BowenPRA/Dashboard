import { Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SafeInlineMath } from '../notes/SafeMath.jsx';
import FactorPairs from './FactorPairs.jsx';
import { tr } from '../../utils/lang.js';

/**
 * The pieces the three quadratic tasks share (Factor It, Formula, Quad Solver):
 *   NumBox        one number box — signed, fractions allowed, Enter checks
 *   MathLine      a line of LaTeX that scrolls sideways instead of overflowing
 *   AbcChips      a = …  b = …  c = …, each in its own colour
 *   SolutionView  a worked solution from utils/quadSolve.js, section by section
 */

export function NumBox({ value, onChange, onEnter, label, ink = '#7c3aed', bad = false, width = 'w-16', autoFocus = false, placeholder = '?', inputRef }) {
  return (
    <input ref={inputRef} autoFocus={autoFocus} value={value ?? ''} onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onEnter?.(); } }}
      inputMode="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} aria-label={label} placeholder={placeholder}
      className={`${width} mx-0.5 px-1.5 py-1 rounded-xl border-2 border-b-[4px] text-center text-lg font-black align-middle font-mono
        bg-white dark:bg-slate-950 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none
        ${bad ? 'border-rose-400 text-rose-700 dark:text-rose-300' : 'border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100'}`}
      style={bad ? undefined : { caretColor: ink }}
      onFocus={(e) => { e.target.style.borderColor = ink; }}
      onBlur={(e) => { e.target.style.borderColor = ''; }} />
  );
}

export function MathLine({ latex, className = '' }) {
  return (
    <div className={`overflow-x-auto overflow-y-hidden whitespace-nowrap py-0.5 ${className}`}>
      <SafeInlineMath math={latex} />
    </div>
  );
}

const ABC = [
  ['a', '#7c3aed', 'bg-violet-50 border-violet-200 dark:bg-violet-950/40 dark:border-violet-800'],
  ['b', '#0891b2', 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/40 dark:border-cyan-800'],
  ['c', '#db2777', 'bg-pink-50 border-pink-200 dark:bg-pink-950/40 dark:border-pink-800'],
];
export function AbcChips({ a, b, c }) {
  const vals = { a, b, c };
  return (
    <div className="flex flex-wrap gap-2">
      {ABC.map(([k, col, cls]) => (
        <span key={k} className={`inline-flex items-baseline gap-1.5 px-3 py-1 rounded-xl border-2 font-black text-lg ${cls}`}>
          <span className="italic" style={{ color: col }}>{k}</span>
          <span className="text-slate-400">=</span>
          <span className="font-mono text-slate-900 dark:text-slate-100">{vals[k] < 0 ? `−${-vals[k]}` : vals[k]}</span>
        </span>
      ))}
    </div>
  );
}

const NOTE = {
  tip: ['bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/30 dark:border-sky-800 dark:text-sky-200', Lightbulb],
  warn: ['bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200', AlertTriangle],
  muted: ['bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300', Lightbulb],
};

/** One row of a worked solution. */
function Row({ row, lang, ink }) {
  const say = (o) => (o ? tr(lang, o.en, o.vn) : null);
  if (row.abc) return <AbcChips {...row.abc} />;
  if (row.pairs) return <FactorPairs P={row.pairs.P} S={row.pairs.S} hit={row.pairs.hit} revealAll compact lang={lang} ink={ink} max={18} />;
  if (row.note) {
    const [cls, Icon] = NOTE[row.tone] || NOTE.tip;
    return (
      <div className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2 text-sm font-bold leading-snug ${cls}`}>
        <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2.5} /><span>{say(row.note)}</span>
      </div>
    );
  }
  const why = tr(lang, row.en, row.vn);
  const key = row.tone === 'key';
  const muted = row.tone === 'muted';
  return (
    <div className={`flex flex-col gap-0.5 min-w-0 rounded-xl px-3 py-1.5
      ${key ? 'border-2' : ''}`}
      style={key ? { borderColor: ink, backgroundColor: `${ink}0d` } : undefined}>
      <MathLine latex={row.latex} className={`text-lg sm:text-xl ${muted ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'}`} />
      {why && <div className={`text-[13px] font-semibold leading-snug ${key ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>{why}</div>}
    </div>
  );
}

/** A whole worked solution: numbered sections, each a card. */
export function SolutionView({ sections, lang, ink = '#2563eb', open, onToggle }) {
  return (
    <div className="flex flex-col gap-3">
      {sections.map((sec, i) => {
        const closed = open && !open.includes(sec.id);
        return (
          <section key={sec.id} className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <button type="button" onClick={() => onToggle?.(sec.id)} disabled={!onToggle}
              className="w-full flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-left border-b-2 border-slate-100 dark:border-slate-800">
              <span className="inline-grid place-items-center w-7 h-7 rounded-full text-white text-sm font-black shrink-0" style={{ backgroundColor: sec.failed ? '#f59e0b' : ink }}>{i + 1}</span>
              <span className="font-black text-slate-900 dark:text-slate-100">{tr(lang, sec.title.en, sec.title.vn)}</span>
              {sec.method && (
                <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-lg ${sec.failed ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {tr(lang, sec.method.en, sec.method.vn)}
                </span>
              )}
              {onToggle && <span className="ml-auto text-xs font-black text-slate-400">{closed ? '+' : '−'}</span>}
            </button>
            {!closed && (
              <div className="p-3 sm:p-4 flex flex-col gap-2">
                {sec.rows.map((row, k) => <Row key={k} row={row} lang={lang} ink={ink} />)}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/** The green answer strip. */
export function AnswerStrip({ label, latex, sub, ink = '#58cc02' }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 px-3 py-2.5" style={{ borderColor: ink, backgroundColor: `${ink}12` }}>
      <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: ink }} strokeWidth={3} />
      <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</div>
      <MathLine latex={latex} className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100" />
      {sub && <div className="basis-full text-xs font-bold text-slate-500 dark:text-slate-400">{sub}</div>}
    </div>
  );
}
