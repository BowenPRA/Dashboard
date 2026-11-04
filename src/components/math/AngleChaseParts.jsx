import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Check, CheckCircle2, XCircle, Info, Footprints } from 'lucide-react';
import { tr } from '../../utils/lang';
import { FACT_BUTTONS, FACT_WORDS, frameOf, workingOf, fmt } from '../../utils/angleChase';
import FactIcon from './FactIcon.jsx';
import { CT } from './angleChaseWords';

const ct = (lang) => CT[lang] || CT.en;
const TONE = {
  good: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
  bad: 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200',
  shown: 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
  info: 'bg-sky-50 dark:bg-sky-900/20 border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200',
  soft: 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200',
};
const ICON = { good: CheckCircle2, bad: XCircle, shown: Lightbulb, info: Info, soft: Info };

/** The reason sentence: English always (it is what the book wants), the French beside it in French. */
export function Reason({ kind, lang, className = '' }) {
  const w = FACT_WORDS[kind];
  return (
    <span className={className}>
      <span className="font-bold">because {w.en}</span>
      {lang === 'fr' && <span className="block text-[0.85em] font-semibold opacity-75">(car {w.fr})</span>}
    </span>
  );
}

function messageText(model, run, lang) {
  const { s } = run;
  const m = s.msg;
  if (!m) return null;
  const t = ct(lang);
  const L = s.target ? (model.vars[s.target].letter || '?') : '';
  const say = m.en ? tr(lang, m.en, null, m.fr || m.en) : '';
  switch (m.code) {
    case 'stone': return t.stone;
    case 'stoneNo': return t.stoneNo;
    case 'blocked': return t.blocked(m.letter, m.need || []);
    case 'hintFact': return t.hintFact(L);
    case 'hintPick': return t.hintPick;
    case 'hintSum': {
      const w = workingOf(model, s.target, s.rel, run.known, run.found);
      return w.equal ? say : t.hintSum(w.parts.map((p) => `${fmt(p.value)}°`).join(' + '), fmt(w.sum));
    }
    case 'factShown': return [say, t.factShown(tr(lang, FACT_BUTTONS[m.kind].en[0], null, FACT_BUTTONS[m.kind].fr[0]))].filter(Boolean).join(' ');
    case 'sizeShown': return [say, t.sizeShown].filter(Boolean).join(' ');
    default: return say;
  }
}

export function Message({ model, run, lang }) {
  const text = messageText(model, run, lang);
  if (!text) return null;
  const tone = run.s.msg.tone || 'soft';
  const I = ICON[tone] || Info;
  return (
    <div className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2 text-sm font-bold leading-snug animate-in fade-in duration-200 ${TONE[tone]}`} role="status">
      <I className="w-5 h-5 shrink-0 mt-px" strokeWidth={2.5} /><span>{text}</span>
    </div>
  );
}

/** The letters of the picture, with their sizes once found. Buttons while a letter is being chosen. */
export function LetterChips({ model, run }) {
  const { s, tappable } = run;
  return (
    <div className="flex flex-wrap gap-2">
      {model.letters.map((l) => {
        const done = s.known.includes(l);
        const cur = s.target === l;
        const can = s.stage === 'pick' && tappable.includes(l);
        const cls = done ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-200'
          : cur ? 'bg-orange-100 border-orange-400 text-orange-800 dark:bg-orange-900/40 dark:border-orange-500 dark:text-orange-200'
            : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300';
        const body = <><span className="italic font-black">{l}</span><span className="font-black"> = {done ? `${model.vars[l].value}°` : '?'}</span></>;
        return can
          ? <button key={l} type="button" onClick={() => run.act.pick(l)} className={`px-3 py-1.5 rounded-xl border-2 border-dashed text-base hover:-translate-y-0.5 transition-transform ${cls}`} style={{ borderColor: '#5c2483' }}>{body}</button>
          : <span key={l} className={`px-3 py-1.5 rounded-xl border-2 text-base ${cls}`}>{body}</span>;
      })}
    </div>
  );
}

/** The lines written so far, in the book's form. */
export function WorkingList({ log, lang, bare }) {
  const t = ct(lang);
  const body = (
    <ol className="flex flex-col gap-2">
      {log.map((e, i) => (
        <li key={`${e.name}${i}`} className="text-slate-800 dark:text-slate-100">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-base sm:text-lg font-black tracking-tight">{e.line}</span>
            {!e.letter && <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 rounded px-1.5 py-0.5">{t.onTheWay}</span>}
            {e.helped && <Lightbulb className="w-4 h-4 text-amber-500" strokeWidth={2.5} />}
          </div>
          <Reason kind={e.kind} lang={lang} className="block text-sm text-slate-600 dark:text-slate-300" />
        </li>
      ))}
    </ol>
  );
  if (bare) return body;
  return (
    <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4">
      <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.working}</div>
      {body}
    </div>
  );
}

function SizeBox({ model, run, lang }) {
  const t = ct(lang);
  const { s } = run;
  // Keyed by the step (see ChaseStep), so a new angle starts with an empty box.
  const [val, setVal] = useState('');
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, []);
  const fr = frameOf(model, s.target, s.rel, run.known, run.found, s.full);
  const go = () => { if (val.trim()) run.act.submit(val); };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">
        <span>{fr.lhs}</span>
        <span className="inline-flex items-center gap-1">
          <input ref={ref} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') go(); }}
            inputMode="decimal" autoComplete="off" aria-label="angle in degrees"
            className="w-24 px-2 py-1.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 text-center font-black focus:outline-none focus:border-orange-500" />
          <span>°</span>
        </span>
        <button type="button" onClick={go} disabled={!val.trim()}
          className="ml-1 px-4 py-2 rounded-xl text-white text-sm font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] disabled:opacity-40"
          style={{ backgroundColor: '#58cc02', borderColor: '#46a302' }}><Check className="w-4 h-4 inline -mt-0.5" strokeWidth={3} /> {t.check}</button>
      </div>
      {fr.hint && <div className="text-sm font-bold text-slate-500 dark:text-slate-400">({tr(lang, fr.hint.en, null, fr.hint.fr)})</div>}
    </div>
  );
}

/** The panel for the step in hand: choose the angle, its fact, then its size. */
export function ChaseStep({ model, facts, run, lang }) {
  const t = ct(lang);
  const { s, needStone } = run;
  const L = s.target ? (model.vars[s.target].letter || '?') : null;
  const helpBtn = 'flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-widest border-2';
  return (
    <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0 flex flex-col gap-3">
      {s.last && s.stage !== 'done' && (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-2 text-emerald-800 dark:text-emerald-200 animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="text-sm font-black">{t.done(s.last.line)}</div>
          <Reason kind={s.last.kind} lang={lang} className="block text-xs" />
        </div>
      )}
      {s.stage === 'pick' && (
        <div>
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{t.pickTitle}</h3>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-0.5">{needStone ? t.pickStone : t.pickSub}</p>
        </div>
      )}
      {(s.stage === 'fact' || s.stage === 'size') && (
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
          {!model.vars[s.target].letter && <Footprints className="w-6 h-6 text-purple-700" strokeWidth={2.5} />}
          {model.vars[s.target].letter ? <>{t.find('')}<span className="italic text-orange-600 dark:text-orange-400">{L}</span></> : t.findStone}
        </h3>
      )}
      {s.stage === 'fact' && (
        <>
          <p className="text-sm font-black text-slate-600 dark:text-slate-300 -mt-1">{t.factQ(L)}</p>
          <div className="grid grid-cols-2 gap-2">
            {facts.map((k) => {
              const b = FACT_BUTTONS[k];
              const tried = s.tried.includes(k);
              return (
                <button key={k} type="button" disabled={tried} onClick={() => run.act.chooseFact(k)}
                  className={`flex items-center gap-2 text-left px-2.5 py-2 rounded-xl border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px] ${tried ? 'border-rose-200 bg-rose-50 text-rose-400 line-through dark:bg-rose-900/20 dark:border-rose-900' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-slate-700'}`}>
                  <FactIcon kind={k} className="w-10 h-8 shrink-0" />
                  <span className="min-w-0 leading-tight">
                    <span className="block text-sm font-black">{tr(lang, b.en[0], null, b.fr[0])}</span>
                    <span className="block text-xs font-bold opacity-70">{tr(lang, b.en[1], null, b.fr[1])}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
      {s.stage === 'size' && (
        <>
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-2.5 py-1.5 text-amber-900 dark:text-amber-100">
            <FactIcon kind={s.rel.kind} className="w-9 h-7 shrink-0" />
            <Reason kind={s.rel.kind} lang={lang} className="text-sm leading-snug" />
          </div>
          <p className="text-sm font-black text-slate-600 dark:text-slate-300 -mb-1">{t.sizeQ}</p>
          <SizeBox key={`${s.target}:${s.rel.id}`} model={model} run={run} lang={lang} />
        </>
      )}
      <Message model={model} run={run} lang={lang} />
      <div className="flex flex-wrap gap-2 justify-end">
        <button type="button" onClick={run.act.hint} className={`${helpBtn} text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/20`}>
          <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.hint}
        </button>
        {(s.stage === 'fact' || s.stage === 'size') && (
          <button type="button" onClick={run.act.showMe} className={`${helpBtn} text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20`}>
            {t.stuck}
          </button>
        )}
      </div>
    </div>
  );
}
