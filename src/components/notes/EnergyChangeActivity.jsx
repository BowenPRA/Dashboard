import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { energyModel, diagramText } from '../../utils/energyChange';
import { tr } from '../../utils/lang';
import EnergyRound from '../science/energychange/EnergyRound.jsx';
import { Diagram } from '../science/energychange/EnergyBoard.jsx';

/**
 * `energychange` — one From… To… diagram on a Notes slide (Year 7 Science
 * 3.6). Rendered by ActivityBlock, checked by utils/activity.js →
 * energyChangeCheck.checkEnergyChangeActivity.
 *
 *   { id, type: 'energychange', kind: 'one' | 'branch' | 'chain' | 'mixed', scene, prompt, promptFr, explain, explainFr }
 *   { …, walk: false }    opens QUICK (the whole diagram, one Check), like the task from level 3
 *
 * Walked by default, without the event-or-process stage; the slide carries the
 * picture. Each stage allows one wrong answer, named; a second (or Show me)
 * fills it in and the activity scores wrong.
 */

const T = {
  en: { correct: 'Correct', notQuite: 'Not quite' },
  fr: { correct: 'Correct !', notQuite: 'Pas tout à fait' },
};

export function EnergyChangeActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => energyModel({
    id: activity.id, level: 1, kind: activity.kind, scene: activity.scene, walk: activity.walk ?? true, happens: false,
  }), [activity]);
  const checked = !!result?.done;
  if (!checked) {
    return <EnergyRound key={activity.id} model={model} lang={lang} compact onComplete={(helped) => onResult({ done: true, correct: !helped })} />;
  }
  const marks = Object.fromEntries(model.slots.map((_, i) => [i, 'locked']));
  return (
    <div className={`rounded-xl border-2 mt-1 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-2 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {result.correct ? t.correct : t.notQuite}
      </div>
      <Diagram shape={model.shape} n={model.n} fill={model.slots} marks={marks} lang={lang} compact />
      <div className="mt-2 text-sm font-black text-slate-800">{diagramText(model.slots, model.chain, lang)}</div>
      <div className={`mt-1 font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {parseText(tr(lang, activity.explain, null, activity.explainFr))}
      </div>
    </div>
  );
}
