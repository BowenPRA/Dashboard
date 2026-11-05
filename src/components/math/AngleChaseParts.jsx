import { useEffect, useRef, useState } from 'react';
import { tr } from '../../utils/lang';
import { FACT_WORDS, workingOf, workingParts, fmt } from '../../utils/angleChase';
import FactIcon from './FactIcon.jsx';
import { CT } from './angleChaseWords';
import { FACT_CARD } from './angleKitText';
import { FactGrid, StepHeader, StepTitle, Eq, AnswerBox, CheckButton, Feedback, HelpRow, Because, Notebook } from './AngleKit.jsx';

/**
 * The step panel of Find Every Angle (tasks/AngleChase.jsx): which letter
 * next (free items), then for that letter ① the fact, ② the size — built
 * from the shared AngleKit pieces, so it reads like Find It, Say Why.
 */

const ct = (lang) => CT[lang] || CT.en;

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
    case 'factShown': return [say, t.factShown(tr(lang, FACT_CARD[m.kind].en[0], null, FACT_CARD[m.kind].fr[0]))].filter(Boolean).join(' ');
    case 'sizeShown': return [say, t.sizeShown].filter(Boolean).join(' ');
    default: return say;
  }
}

function Message({ model, run, lang }) {
  const text = messageText(model, run, lang);
  return text ? <Feedback tone={run.s.msg.tone || 'soft'}>{text}</Feedback> : null;
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
        const cls = done ? 'bg-[#effbe5] border-[#9bd36b] text-[#2f5d00] dark:bg-lime-950/30 dark:border-lime-800 dark:text-lime-200'
          : cur ? 'bg-[#e8590c] border-[#a8400a] text-white'
            : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300';
        const body = <><span className="italic font-black">{l}</span><span className="font-black"> = {done ? `${model.vars[l].value}°` : '?'}</span></>;
        return can
          ? <button key={l} type="button" onClick={() => run.act.pick(l)} className={`px-3 py-1.5 rounded-xl border-2 border-dashed border-orange-400 text-base hover:-translate-y-0.5 hover:bg-orange-50 dark:hover:bg-slate-800 transition-transform ${cls}`}>{body}</button>
          : <span key={l} className={`px-3 py-1.5 rounded-xl border-2 text-base ${cls}`}>{body}</span>;
      })}
    </div>
  );
}

function SizeBox({ model, run, lang }) {
  const t = ct(lang);
  const { s } = run;
  const [val, setVal] = useState('');
  const ref = useRef(null);
  // Keyed by the step (see ChaseStep), so a new angle starts with an empty box.
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, []);
  const w = workingParts(model, s.target, s.rel, run.known, run.found);
  const go = () => { if (val.trim()) run.act.submit(val); };
  const box = { node: <AnswerBox value={val} onChange={setVal} onEnter={go} inputRef={ref} label="angle in degrees" /> };
  const full = s.full;
  return (
    <div className="flex flex-col gap-2">
      {full && w.fact && (
        <div className="self-start rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 px-3 py-1.5">
          <Eq parts={w.fact} className="text-lg" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Eq parts={[...(full ? w.solve : w.bare), box]} className="text-xl sm:text-2xl" />
        <CheckButton onClick={go} disabled={!val.trim()} lang={lang} />
      </div>
      {full && w.same && (
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          {t.sameAs} <Eq parts={[w.same]} />
        </p>
      )}
    </div>
  );
}

/** The panel for the step in hand: choose the angle, its fact, then its size. */
export function ChaseStep({ model, facts, run, lang }) {
  const t = ct(lang);
  const { s, needStone } = run;
  const stone = !!s.target && !model.vars[s.target].letter;
  const L = s.target ? (model.vars[s.target].letter || '?') : null;
  const card = 'rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 min-w-0 flex flex-col gap-3';

  if (s.stage === 'pick') {
    return (
      <div className={card}>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{t.pickTitle}</h3>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-0.5">{needStone ? t.pickStone : t.pickSub}</p>
        </div>
        {!needStone && (
          <div className="flex flex-wrap gap-2">
            {run.tappable.map((l) => (
              <button key={l} type="button" onClick={() => run.act.pick(l)}
                className="min-w-[4rem] px-4 py-2.5 rounded-2xl border-2 border-b-[4px] border-orange-300 bg-orange-50 text-[#b4460a] text-2xl font-black italic hover:bg-orange-100 hover:-translate-y-px active:translate-y-[2px] active:border-b-2 transition-all dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-300">
                {l}
              </button>
            ))}
          </div>
        )}
        <Message model={model} run={run} lang={lang} />
        <HelpRow lang={lang} onHint={run.act.hint} />
      </div>
    );
  }

  const factDone = s.stage === 'size';
  const steps = [
    { key: 'fact', label: t.stepFact, state: factDone ? (s.helped && s.msg?.code === 'factShown' ? 'shown' : 'done') : 'now' },
    { key: 'size', label: t.stepSize, state: factDone ? 'now' : 'todo' },
  ];
  return (
    <div className={card}>
      <StepHeader letter={L} stone={stone} lang={lang} steps={steps} />
      {s.stage === 'fact' && (
        <>
          <StepTitle lang={lang} n={1}>{t.factQ(L)}</StepTitle>
          <FactGrid kinds={facts} lang={lang} struck={s.tried} onPick={run.act.chooseFact} />
        </>
      )}
      {s.stage === 'size' && (
        <>
          <div className="flex items-center gap-2.5 rounded-xl bg-[#effbe5] dark:bg-lime-950/30 border-2 border-[#9bd36b] dark:border-lime-800 px-2.5 py-1.5 text-[#2f5d00] dark:text-lime-200">
            <FactIcon kind={s.rel.kind} className="w-10 h-8 shrink-0" />
            <div className="min-w-0 text-sm leading-snug">
              <Because words={FACT_WORDS[s.rel.kind]} lang={lang} />
              <span className="block text-xs font-bold opacity-75">{t.lit}</span>
            </div>
          </div>
          <StepTitle lang={lang} n={2}>{t.sizeQ}</StepTitle>
          <SizeBox key={`${s.target}:${s.rel.id}:${s.full ? 1 : 0}`} model={model} run={run} lang={lang} />
        </>
      )}
      <Message model={model} run={run} lang={lang} />
      <HelpRow lang={lang} onHint={run.act.hint} onShowMe={run.act.showMe} />
    </div>
  );
}

/** The first picture's three-step strip: choose the fact, work it out, it goes on the picture. */
export function HowItWorks({ lang }) {
  const t = ct(lang);
  return (
    <ol className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-bold text-slate-600 dark:text-slate-300">
      {t.how.map((h, i) => (
        <li key={h} className="flex items-center gap-1.5">
          <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-[#e8590c] text-white text-[11px] font-black">{i + 1}</span>{h}
        </li>
      ))}
    </ol>
  );
}

export { Notebook };
