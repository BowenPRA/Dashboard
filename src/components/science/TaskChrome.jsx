import React from 'react';
import { CheckCircle2, XCircle, ChevronRight, Construction, RotateCcw, Trophy } from 'lucide-react';
import { atomStyleOf } from './labMarking.js';
import { elementBySymbol } from '../../utils/elements.js';

/**
 * The pieces Element Hunt and Particle Lab share: the ask header, chunky
 * Check / Next / choice buttons, the verdict card, progress dots, the end
 * summary, the atom colour key, a formula with real subscripts, and the white
 * plate an SVG string sits on (so it reads in dark mode). Presentational only.
 */

const PRESS = 'border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';

export function AskHeader({ icon: Icon, tone = 'bg-[#0087a8] border-[#00697f]', children, sub }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-10 h-10 rounded-xl text-white flex items-center justify-center border-b-[4px] shrink-0 ${tone}`}>
        {Icon && <Icon className="w-5 h-5" strokeWidth={2.5} />}
      </span>
      <div className="min-w-0">
        <h2 className="font-black text-slate-800 dark:text-slate-100 text-lg sm:text-xl lg:text-2xl leading-tight break-words">{children}</h2>
        {sub && <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export function CheckButton({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802] ${PRESS} disabled:opacity-40 disabled:pointer-events-none`}>
      {children}
    </button>
  );
}

export function NextButton({ onClick, children }) {
  return (
    // autoFocus: Enter / Space moves on, whichever control marked the round
    <button onClick={onClick} autoFocus
      className={`w-full px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9] ${PRESS} flex items-center justify-center gap-1 outline-none focus-visible:ring-4 focus-visible:ring-[#1cb0f6]/40`}>
      {children}<ChevronRight className="w-4 h-4" strokeWidth={3} />
    </button>
  );
}

const CHOICE_LOOK = {
  idle: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:border-[#1cb0f6] hover:bg-[#ddf4ff] dark:hover:bg-slate-800',
  picked: 'bg-[#ddf4ff] dark:bg-sky-900/40 border-[#1cb0f6] text-[#1482b8] dark:text-sky-200',
  good: 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]',
  bad: 'bg-[#ffdfe0] border-[#ea2b2b] text-[#a32d23]',
  answer: 'bg-white dark:bg-slate-900 border-[#58a700] text-[#3e7500] dark:text-[#8ee04e]',
  muted: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600',
};

/** A chunky answer button. `look`: idle | picked | good | bad | answer | muted. */
export function ChoiceButton({ look = 'idle', onClick, disabled, children, className = '' }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-pressed={look === 'picked' || undefined}
      className={`w-full min-w-0 px-4 py-3 rounded-xl border-2 border-b-[4px] font-black text-base text-left transition-all ${disabled ? '' : 'active:border-b-2 active:translate-y-[2px]'} ${CHOICE_LOOK[look] || CHOICE_LOOK.idle} ${className}`}>
      {children}
    </button>
  );
}

export function Verdict({ ok, title, children }) {
  return (
    <div role="status" className={`rounded-xl border-2 p-3 text-sm font-bold leading-snug flex flex-col gap-1.5 ${ok ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-[#ffdfe0] border-[#ea2b2b] text-[#a32d23]'}`}>
      <div className="flex items-center font-black uppercase tracking-widest text-[11px]">
        {ok ? <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={3} /> : <XCircle className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={3} />}
        {title}
      </div>
      {children}
    </div>
  );
}

export function ProgressDots({ total, idx, results }) {
  return (
    <div className="flex gap-1 flex-wrap" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`w-3 h-3 rounded-full ${results[i] === undefined ? (i === idx ? 'bg-[#1cb0f6]' : 'bg-slate-200 dark:bg-slate-700') : results[i] ? 'bg-[#58cc02]' : 'bg-rose-400'}`} />
      ))}
    </div>
  );
}

export function EmptyScreen({ text, back, onQuit }) {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <Construction className="w-10 h-10 text-slate-400 mb-3" />
      <p className="font-black text-slate-600 dark:text-slate-300 mb-4">{text}</p>
      <button onClick={onQuit} className={`px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-[#1899D6] ${PRESS}`}>{back}</button>
    </div>
  );
}

/** The end of a session: right / rounds, a row per round, New … and Finish. */
export function Summary({ heading, rightText, rows, againLabel, finishLabel, onAgain, onFinish }) {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 flex flex-col items-center gap-5">
      <div className="p-4 rounded-2xl bg-[#ffc800] border-b-[4px] border-[#cca000] text-white"><Trophy className="w-10 h-10" strokeWidth={2.5} /></div>
      <div className="text-center">
        <h2 className="font-black text-2xl sm:text-3xl text-slate-800 dark:text-slate-100">{heading}</h2>
        <p className="font-black text-lg text-slate-500 dark:text-slate-400 mt-1">{rightText}</p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
        {rows.map((r, i) => (
          <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-bold ${r.ok ? 'border-[#58a700]/40 bg-[#d7ffb8]/40 text-[#3e7500] dark:text-[#8ee04e]' : 'border-rose-300/60 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-300'}`}>
            {r.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={3} /> : <XCircle className="w-4 h-4 shrink-0" strokeWidth={3} />}
            <span className="truncate">{i + 1}. {r.label}</span>
          </div>
        ))}
      </div>
      <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
        <button onClick={onAgain} className={`flex-1 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 ${PRESS} flex items-center justify-center gap-2`}>
          <RotateCcw className="w-4 h-4" strokeWidth={3} />{againLabel}
        </button>
        <button onClick={onFinish} className={`flex-1 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802] ${PRESS}`}>
          {finishLabel}
        </button>
      </div>
    </div>
  );
}

/** A formula with real subscripts (Unicode subscript digits fall back to a font that draws them almost full size). */
export function Formula({ formula, className = '' }) {
  const parts = String(formula ?? '').split(/(\d+)/).filter(Boolean);
  return (
    <span className={`whitespace-nowrap ${className}`}>
      {parts.map((p, i) => (/^\d+$/.test(p)
        ? <sub key={i} className="text-[0.6em] align-baseline relative top-[0.3em]">{p}</sub>
        : <span key={i}>{p}</span>))}
    </span>
  );
}

/** One atom swatch: the drawing's own fill and stroke. */
export function AtomSwatch({ sym, size = 18 }) {
  const [fill, stroke] = atomStyleOf(sym);
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill={fill} stroke={stroke} strokeWidth="2.5" />
    </svg>
  );
}

/** The key under a picture: swatch + symbol + name for each element present. */
export function AtomKey({ symbols, lang = 'en', label }) {
  if (!symbols?.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5" aria-label={label}>
      {symbols.map((sym) => {
        const e = elementBySymbol(sym);
        return (
          <span key={sym} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-sm">
            <AtomSwatch sym={sym} />
            <span className="font-black text-slate-800 dark:text-slate-100">{sym}</span>
            <span className="font-bold text-slate-500 dark:text-slate-400">{e ? (lang === 'vn' ? e.vn : e.en) : ''}</span>
          </span>
        );
      })}
    </div>
  );
}

/** An SVG string on a white plate. */
export function SvgPlate({ svg, className = '', label }) {
  return (
    <div role="img" aria-label={label}
      className={`rounded-2xl overflow-hidden bg-white shadow-sm [&>svg]:block [&>svg]:w-full [&>svg]:h-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
