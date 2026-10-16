import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb } from 'lucide-react';
import { SafeInlineMath } from './SafeMath.jsx';
import { easyModel, chainLatex, diagnoseMeaning, diagnoseRoute, diagnoseStep, txt } from '../../utils/makeEasy';
import { tr } from '../../utils/lang';

/**
 * `makeeasy` — Make It Easy on a Notes slide (Year 7 Maths 4.5). Rendered by
 * ActivityBlock, checked by utils/activity.js → makeEasy.checkEasyActivity.
 *
 *   { id, type: 'makeeasy', a: '800', b: '0.07', prompt, promptFr, explain, explainFr }
 *   { …, kind: 'of', a: '36', b: '0.25' }                         "a quarter of 36"
 *   { …, a: '2.15', b: '9', context, contextFr, cue: 'each' }      a story
 *
 * The task's stages, compact: (the words → the calculation), the easy way
 * from 2–3, then each step's box in turn — the last box is the answer. Each
 * stage allows one wrong answer, named; a second fills it in, and the activity
 * is then scored wrong. Enter in a box checks it and goes no further (the
 * deck's Enter-for-next must not skip the verdict). No "bigger or smaller?"
 * stage — the deck asks that with its own `predict` and `order`.
 */

const GOOD = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
const BAD = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
const IDLE = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';
const SHOWN = 'bg-amber-50 border-amber-400 text-amber-800';
const primary = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]';

const T = {
  en: {
    meaning: 'Which calculation is it?', route: 'Which is the easy way?', steps: 'Now work it out:',
    check: 'Check', tryAgain: 'One more try', answer: 'Answer', correct: 'Correct', notQuite: 'Not quite', filled: 'It is filled in for you.',
  },
  fr: {
    meaning: 'Quel calcul est-ce ?', route: 'Quel est le moyen facile ?', steps: 'Maintenant, calcule :',
    check: 'Vérifier', tryAgain: 'Encore un essai', answer: 'Réponse', correct: 'Correct !', notQuite: 'Pas tout à fait', filled: 'C’est rempli pour toi.',
  },
};

function Hint({ tone, children }) {
  const style = tone === 'nudge' || tone === 'shown'
    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
    : tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  const Icon = tone === 'ok' ? CheckCircle2 : tone === 'bad' ? XCircle : Lightbulb;
  return (
    <div className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${style}`}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />
      <span>{children}</span>
    </div>
  );
}

export function MakeEasyActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const say = (m) => (m ? tr(lang, m.en, null, m.fr) : '');
  const model = useMemo(() => easyModel({
    id: activity.id, a: activity.a, b: activity.b, kind: activity.kind, context: activity.context, cue: activity.cue,
  }), [activity]);
  const stages = model.stages.filter((s) => s !== 'size');
  const [stage, setStage] = useState(stages[0]);
  const [picks, setPicks] = useState({});
  const [route, setRoute] = useState(null);
  const [vals, setVals] = useState([]);       // { text, mark } per finished step
  const [typed, setTyped] = useState('');
  const [wrongs, setWrongs] = useState(0);
  const [filled, setFilled] = useState(false);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;

  const used = route || model.valid.find((r) => r.id === result?.route) || model.valid[0];
  const steps = used.steps;

  const advance = (next, message) => { setStage(next); setPicks({}); setWrongs(0); setMsg(message); };
  const finish = (allVals, wasFilled) => onResult({ done: true, correct: !wasFilled, route: used.id, vals: allVals.map((v) => v.text) });

  const options = stage === 'meaning' ? model.meaning : model.choices;
  const choose = (id) => {
    if (checked || picks[id]) return;
    const d = stage === 'meaning' ? diagnoseMeaning(model, id) : diagnoseRoute(model, id);
    const next = stage === 'meaning' ? 'route' : 'steps';
    if (d.ok) {
      if (stage === 'route') setRoute(model.choices.find((c) => c.id === id));
      advance(next, { tone: 'ok', en: d.en, fr: d.fr });
      return;
    }
    const left = options.filter((o) => !picks[o.id] && o.id !== id);
    if (wrongs + 1 >= 2 || left.length <= 1) {
      const right = stage === 'meaning' ? 'times' : model.choices.find((c) => c.valid).id;
      const r = stage === 'meaning' ? diagnoseMeaning(model, right) : diagnoseRoute(model, right);
      if (stage === 'route') setRoute(model.choices.find((c) => c.id === right));
      setFilled(true);
      advance(next, { tone: 'shown', en: `${d.en} ${r.en} ${T.en.filled}`, fr: `${d.fr} ${r.fr} ${T.fr.filled}` });
      return;
    }
    setPicks({ ...picks, [id]: 'bad' });
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  const current = steps[vals.length];
  const checkStep = () => {
    if (checked || !current) return;
    const d = diagnoseStep(current, typed);
    if (d.soft) { setMsg({ tone: 'nudge', en: d.en, fr: d.fr }); return; }
    let mark = 'good';
    let wasFilled = filled;
    if (!d.ok) {
      if (wrongs + 1 < 2) { setWrongs(wrongs + 1); setMsg({ tone: 'bad', en: d.en, fr: d.fr }); return; }
      mark = 'shown';
      wasFilled = true;
      setFilled(true);
    }
    const all = [...vals, { text: txt(current.value), mark }];
    setVals(all); setTyped(''); setWrongs(0);
    setMsg(mark === 'shown' ? { tone: 'shown', en: `${d.en} ${T.en.filled}`, fr: `${d.fr} ${T.fr.filled}` } : null);
    if (all.length >= steps.length) finish(all, wasFilled);
  };

  const shownVals = checked ? steps.map((s, i) => ({ text: txt(s.value), mark: result.correct ? 'good' : (vals[i]?.mark || 'shown') })) : vals;

  return (
    <div>
      {activity.context && <p className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{parseText(tr(lang, activity.context, null, activity.contextFr))}</p>}
      {(stage !== 'meaning' || checked) && (
        <div className="mb-2 text-center text-xl text-slate-800 dark:text-slate-100 overflow-x-auto">
          <SafeInlineMath math={model.kind === 'of' ? `\\text{${model.words.en} } ${model.A} = ${model.calc.latex}` : model.calc.latex} />
        </div>
      )}

      {!checked && stage !== 'steps' && (
        <>
          <p className="mb-2 text-sm font-black text-slate-600 dark:text-slate-300">{stage === 'meaning' ? t.meaning : t.route}</p>
          <div className="grid grid-cols-1 gap-2">
            {options.map((o) => (
              <button key={o.id} type="button" disabled={!!picks[o.id]} onClick={() => choose(o.id)}
                className={`px-3 py-2.5 rounded-xl border-2 border-b-[4px] font-black text-lg transition-all overflow-x-auto disabled:cursor-default ${picks[o.id] ? BAD : `${IDLE} hover:border-[#1cb0f6]`}`}>
                <SafeInlineMath math={o.latex} />
              </button>
            ))}
          </div>
        </>
      )}

      {(stage === 'steps' || checked) && (
        <>
          {!checked && <p className="mb-2 text-sm font-black text-slate-600 dark:text-slate-300">{t.steps}</p>}
          <div className="mb-2 text-center text-lg text-slate-700 dark:text-slate-200 overflow-x-auto"><SafeInlineMath math={`= ${used.latex}`} /></div>
          <div className="flex flex-col gap-1.5">
            {steps.slice(0, checked ? steps.length : vals.length + 1).map((s, i) => {
              const done = shownVals[i];
              return (
                <div key={i} className="flex items-center justify-end gap-2 text-lg text-slate-800 dark:text-slate-100">
                  <span className="mr-auto text-[10px] font-black uppercase tracking-widest text-orange-700 dark:text-orange-300">{tr(lang, s.note.en, null, s.note.fr)}</span>
                  <SafeInlineMath math={`${s.latex} =`} />
                  {done
                    ? <span className={`min-w-[4.5rem] px-2 py-1 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center ${done.mark === 'good' ? GOOD : SHOWN}`}>{done.text}</span>
                    : (
                      <input autoFocus value={typed} onChange={(e) => { setTyped(e.target.value); if (msg?.tone === 'bad') setMsg(null); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); checkStep(); } }}
                        inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.answer} placeholder="?"
                        className={`w-24 px-2 py-1 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center focus:outline-none focus:border-sky-500 ${msg?.tone === 'bad' ? BAD : IDLE}`} />
                    )}
                </div>
              );
            })}
          </div>
          {!checked && <div className="mt-3 flex justify-end"><button onClick={checkStep} disabled={!typed.trim()} className={primary}>{t.check}</button></div>}
        </>
      )}

      {!checked && msg && <Hint tone={msg.tone}>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{say(msg)}</Hint>}

      {checked && (
        <div className={`rounded-xl border-2 mt-3 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? t.correct : t.notQuite}
          </div>
          <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            <div className="mb-1 text-lg overflow-x-auto"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={chainLatex(model, used)} /></div>
            {parseText(tr(lang, activity.explain, null, activity.explainFr))}
          </div>
        </div>
      )}
    </div>
  );
}
