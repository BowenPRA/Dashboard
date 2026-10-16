import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb, Target } from 'lucide-react';
import { SafeInlineMath } from './SafeMath.jsx';
import PointTiles from '../math/PointTiles.jsx';
import { activityModel, diagnosePlace, plain } from '../../utils/pointBack';
import { tr } from '../../utils/lang';

/**
 * `pointback` — put the point back, on a slide (Year 7 Maths 4.3). Rendered by
 * ActivityBlock, checked by utils/activity.js (utils/pointBack.js derives it):
 *
 *   { id, type: 'pointback', a: '3.6', b: '24', prompt, promptFr, explain, explainFr }
 *       the point is out and the whole-number product shown (36 × 24 = 864):
 *       tap the gap where the point goes
 *   { id, type: 'pointback', fact: '47 × 23 = 1081', q: '0.47 × 23', … }
 *       the fact's digits: estimate, then tap where the point goes
 *
 * Two tries; a wrong first tap is answered by the name of its slip. Contract
 * as for every activity: `result` is the stored `{ done, correct, … }`;
 * `onResult` is called once, with done: true. English and French.
 */

const T = {
  en: { check: 'Check', tryAgain: 'One more try', answer: 'Answer', tapFirst: 'Tap a gap between the digits first.', correct: 'Correct', notQuite: 'Not quite', tapHow: 'Tap the gap where the point goes.', estimate: 'An estimate' },
  fr: { check: 'Vérifier', tryAgain: 'Encore un essai', answer: 'Réponse', tapFirst: "Touche d'abord un espace entre les chiffres.", correct: 'Correct !', notQuite: 'Pas tout à fait', tapHow: "Touche l'espace où va le point.", estimate: 'Une estimation' },
};
const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const primary = `${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`;
const said = (lang, m) => (m ? tr(lang, m.en, null, m.fr) : '');

export function PointBackActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const m = useMemo(() => activityModel(activity), [activity]);
  const [k, setK] = useState(result?.k ?? null);
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;

  const pick = (kk) => { if (!checked) { setK(kk); setMsg((x) => (x?.tone === 'nudge' ? null : x)); } };
  const check = () => {
    if (checked) return;
    if (k == null) { setMsg({ tone: 'nudge', en: T.en.tapFirst, fr: T.fr.tapFirst }); return; }
    const d = diagnosePlace(m.spec, k);
    const n = tries + 1;
    if (d.ok) { onResult({ done: true, correct: true, k, tries: n }); return; }
    setTries(n);
    if (n >= 2) onResult({ done: true, correct: false, k, tries: n, why: { en: d.en, fr: d.fr } });
    else setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-2 text-slate-800 dark:text-slate-100">
        <span className="text-2xl"><SafeInlineMath math={m.latex} /></span>
        <span className="text-base text-slate-500 dark:text-slate-400"><SafeInlineMath math={m.lead} /></span>
      </div>
      {!checked && <p className="mb-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400">{t.tapHow}</p>}
      <PointTiles row={m.spec.row} k={checked ? m.spec.want : k} onPick={checked ? undefined : pick}
        tone={checked ? (result.correct ? 'good' : 'shown') : null} lang={lang} compact />
      {!checked && (
        <>
          {msg && (
            <div className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${msg.tone === 'nudge' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300'}`}>
              {msg.tone === 'nudge' ? <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />}
              <span>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{said(lang, msg)}</span>
            </div>
          )}
          <div className="mt-3 flex justify-end"><button onClick={check} className={primary}>{t.check}</button></div>
        </>
      )}
      {checked && (
        <div className={`rounded-xl border-2 mt-3 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? t.correct : t.notQuite}
          </div>
          <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
            <div className="mb-1 text-lg"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={`${m.latex} = ${m.simpleText}`} /></div>
            {m.fact && (
              <div className="mb-1 flex items-center gap-1.5 text-sm"><Target className="w-4 h-4" strokeWidth={3} />{t.estimate}: <SafeInlineMath math={`${plain(m.spec.sum.est.a)} ${m.spec.sum.op === '÷' ? '\\div' : '\\times'} ${plain(m.spec.sum.est.b)} = ${plain(m.spec.sum.est.value)}`} /></div>
            )}
            {parseText(tr(lang, activity.explain, null, activity.explainFr))}
          </div>
        </div>
      )}
    </div>
  );
}
