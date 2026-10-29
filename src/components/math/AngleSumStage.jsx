import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { tr } from '../../utils/lang';
import { bookLatex, reasonLine } from '../../utils/angleSum';
import { SafeInlineMath } from '../notes/SafeMath.jsx';
import { ST, INK, GOOD, BAD, IDLE, PRIMARY } from './angleSumText';

/**
 * The stage panel of Find It, Say Why, shared by the task (figure taps for
 * "Add") and the deck activity (`chips`: the angles as buttons in the panel,
 * so it is answerable without the slide's picture). `run` is useAngleSteps().
 */

const say = (lang, m) => (m ? tr(lang, m.en, null, m.fr || m.en) : '');

export function AngleMessage({ msg, lang }) {
  if (!msg || !say(lang, msg)) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300' : BAD;
  const Icon = msg.tone === 'ok' ? CheckCircle2 : soft ? Lightbulb : XCircle;
  return (
    <div className={`mt-3 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${tone}`}>
      <Icon className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} /><span>{say(lang, msg)}</span>
    </div>
  );
}

/** The stage chips of the current step. */
export function StageChips({ run, lang }) {
  const t = ST[lang] || ST.en;
  return (
    <div className="flex flex-wrap gap-1.5">
      {run.stages.map((s) => {
        const d = run.done[s];
        const on = s === run.stage && !run.finished;
        const cls = d ? (d.mark === 'good' ? GOOD : d.mark === 'given' ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-300' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 text-amber-700 dark:text-amber-200')
          : on ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400';
        return (
          <span key={s} className={`px-2 py-1 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest ${cls}`} style={on && !d ? { backgroundColor: INK } : undefined}>
            {d && d.mark !== 'shown' && <CheckCircle2 className="inline w-3 h-3 mr-1 -mt-0.5" strokeWidth={3} />}{t.stages[s]}
          </span>
        );
      })}
    </div>
  );
}

/** The finished steps, as the book wants them: the working, then the reason. */
export function Working({ run, lang, big = false }) {
  if (!run.finishedSteps.length) return null;
  return (
    <div className="flex flex-col gap-2">
      {run.finishedSteps.map(({ step }, i) => (
        <div key={i} className={`rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 overflow-x-auto ${big ? 'text-lg' : 'text-base'} text-slate-900 dark:text-slate-100`}>
          <SafeInlineMath math={bookLatex(step)} />
          <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">{say(lang, reasonLine(step))}</p>
        </div>
      ))}
    </div>
  );
}

function AngleBox({ value, onChange, onEnter, autoFocus = true, label }) {
  return (
    <span className="inline-flex items-center gap-1">
      <input autoFocus={autoFocus} value={value} onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); e.preventDefault(); onEnter(); } }}
        inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={label} placeholder="?"
        className="w-20 sm:w-24 px-2 py-1 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl text-center border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#5c2483]" />
      <span className="font-mono font-black text-xl text-slate-500">°</span>
    </span>
  );
}

function Choices({ options, struck, onPick, cols = 1 }) {
  return (
    <div className={`grid gap-2 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {options.map((o) => (
        <button key={o.id} type="button" disabled={!!struck[o.id]} onClick={() => onPick(o.id)}
          className={`min-h-[3rem] px-3 py-2 rounded-xl border-2 border-b-[4px] text-left font-bold transition-all disabled:cursor-default ${struck[o.id] ? BAD : IDLE} ${o.big ? 'text-center font-black text-xl' : 'text-sm sm:text-base'}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** The body of one stage. Keyed by the caller per step + stage, so its typing resets. */
function StageBody({ run, model, lang, chips, extra, note }) {
  const t = ST[lang] || ST.en;
  const { step, stage, act, struck } = run;
  const [typed, setTyped] = useState('');
  const [reason, setReason] = useState(null);
  const L = step.letters.join(' = ');
  const head = (title, sub) => (
    <>
      <div className="font-black text-slate-800 dark:text-slate-100 text-base sm:text-lg">{title}</div>
      {sub && <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{sub}</p>}
    </>
  );
  const reasons = step.reasons.map((r) => ({ id: r.id, label: step.fact === 'straight' ? say(lang, r) : `${t.because} ${say(lang, r)}` }));
  const checkRow = (onCheck, disabled) => (
    <>{note}<div className="mt-3 flex items-center justify-between gap-2">{extra || <span />}<button type="button" onClick={onCheck} disabled={disabled} className={PRIMARY}>{t.check}</button></div></>
  );
  const below = <>{note}{extra && <div className="mt-3">{extra}</div>}</>;

  if (stage === 'first') return <>{head(t.first, t.firstSub)}<Choices cols={2} options={step.first.map((l) => ({ id: l, label: <span className="italic">{l}</span>, big: true }))} struck={struck} onPick={act.chooseFirst} />{below}</>;
  if (stage === 'decide') return <>{head(t.decide, t.decideSub)}<Choices cols={2} options={[180, 360].map((v) => ({ id: v, label: `${v}°`, big: true }))} struck={struck} onPick={act.chooseTotal} />{below}</>;
  if (stage === 'why') {
    const sub = step.fact === 'straight' ? null : t.whySub(`${L} = ${step.answer}°,`);
    return <>{head(step.fact === 'straight' ? t.straight : t.why, sub)}<Choices options={reasons} struck={struck} onPick={act.chooseWhy} />{below}</>;
  }
  if (stage === 'add') {
    const valueOfKey = (k) => step.knowns.find((x) => x.key === k)?.value ?? step.decoys.find((x) => x.key === k)?.value ?? null;
    const vals = run.picked.map((k) => valueOfKey(k) ?? model.els[k]?.letter);
    const pickable = chips ? [...step.group.map((k) => model.els[k]), ...step.decoys].filter((e, i, a) => a.findIndex((x) => x.key === e.key) === i) : [];
    return (
      <>
        {head(t.add, chips ? t.addChips : t.addFig)}
        {chips && (
          <div className="flex flex-wrap gap-2 mb-2">
            {pickable.map((e) => {
              const k = step.knowns.find((x) => x.key === e.key) || step.decoys.find((x) => x.key === e.key);
              const on = run.picked.includes(e.key);
              const label = k ? (e.right ? `90° (${t.small})` : `${k.value}°`) : e.letter;
              return (
                <button key={e.key} type="button" onClick={() => act.togglePick(e.key)}
                  className={`min-w-[3rem] min-h-[2.75rem] px-3 rounded-xl border-2 border-b-[4px] font-black text-lg ${on ? 'bg-[#f2ecf7] border-[#5c2483] text-[#5c2483]' : IDLE} ${k ? 'font-mono' : 'italic'}`}>{label}</button>
              );
            })}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 text-xl font-mono font-black text-slate-800 dark:text-slate-100">
          <span>{vals.length ? vals.map((v) => (typeof v === 'number' ? `${v}°` : v)).join(' + ') : '…'}</span><span>=</span>
          <AngleBox value={typed} onChange={setTyped} onEnter={() => act.checkAdd(typed)} autoFocus={false} label={t.add} />
        </div>
        {checkRow(() => act.checkAdd(typed), !typed.trim() || !run.picked.length)}
      </>
    );
  }
  if (stage === 'subtract' || stage === 'share' || stage === 'calc' || stage === 'total') {
    const title = stage === 'subtract' ? t.subtract(step.total) : stage === 'share' ? t.share(step.share) : stage === 'calc' ? t.calc(L, step.answer) : t.total;
    const expr = stage === 'subtract' ? `${step.total}° − ${step.sum}° =` : stage === 'share' ? `${step.rest}° ÷ ${step.share} =`
      : stage === 'calc' ? `${L} =` : `${step.knowns.map((k) => `${k.value}°`).join(' + ')} =`;
    return (
      <>
        {head(title)}
        <div className="flex flex-wrap items-center gap-2 text-xl font-mono font-black text-slate-800 dark:text-slate-100">
          <span>{expr}</span><AngleBox value={typed} onChange={setTyped} onEnter={() => act.checkTyped(typed)} label={title} />
        </div>
        {checkRow(() => act.checkTyped(typed), !typed.trim())}
      </>
    );
  }
  // quick: the angle and its reason together
  return (
    <>
      {head(t.quick, chips ? null : t.quickSub)}
      <div className="flex flex-wrap items-center gap-2 text-xl font-mono font-black text-slate-800 dark:text-slate-100 mb-2">
        <span className="italic">{L} =</span><AngleBox value={typed} onChange={setTyped} onEnter={() => act.checkQuick(typed, reason)} label={L} />
      </div>
      <div className="grid gap-2">
        {reasons.map((o) => (
          <button key={o.id} type="button" onClick={() => setReason(o.id)}
            className={`min-h-[3rem] px-3 py-2 rounded-xl border-2 border-b-[4px] text-left font-bold text-sm sm:text-base ${reason === o.id ? 'bg-[#f2ecf7] border-[#5c2483] text-[#5c2483]' : IDLE}`}>{o.label}</button>
        ))}
      </div>
      {checkRow(() => act.checkQuick(typed, reason), !typed.trim() || !reason)}
    </>
  );
}

/** `extra` (the Show me button) sits beside Check, or under a choice; the message goes above it. */
export default function AngleSumStage({ run, model, lang, chips = false, extra = null }) {
  if (run.finished) return null;
  return <StageBody key={`${run.si}:${run.stage}:${run.mode}`} run={run} model={model} lang={lang} chips={chips} extra={extra} note={<AngleMessage msg={run.msg} lang={lang} />} />;
}
