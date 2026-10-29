import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { SafeInlineMath } from './SafeMath.jsx';
import { angleModel, bookLatex, reasonLine } from '../../utils/angleSum';
import { tr } from '../../utils/lang';
import useAngleSteps from '../math/useAngleSteps';
import AngleSumStage, { AngleMessage, StageChips, Working } from '../math/AngleSumStage.jsx';

/**
 * `anglesum` — Find It, Say Why on a Notes slide (Year 7 Maths 5.1). Rendered
 * by ActivityBlock, checked by utils/activity.js → angleSumCheck.checkAngleSumActivity.
 *
 *   { id, type: 'anglesum', kind: 'point', angles: [100, 120, 'b'], prompt, promptFr, explain, explainFr }
 *   { …, walk: false }      opens QUICK (the angle and its reason), like the task from level 3
 *
 * The slide's own picture carries the same numbers, but the panel never needs
 * it: "Add" offers the angles as buttons. Each stage allows one wrong answer,
 * named; a second (or Show me) fills it in and the activity scores wrong.
 */

const T = {
  en: { correct: 'Correct', notQuite: 'Not quite', answer: 'Answer', stuck: 'Show me' },
  fr: { correct: 'Correct !', notQuite: 'Pas tout à fait', answer: 'Réponse', stuck: 'Montre-moi' },
};

function Runner({ model, lang, onResult }) {
  const t = T[lang] || T.en;
  const run = useAngleSteps(model, { onFinish: ({ helped }) => onResult({ done: true, correct: !helped }) });
  return (
    <div>
      <div className="mb-2"><StageChips run={run} lang={lang} /></div>
      <Working run={run} lang={lang} />
      <div className={run.finishedSteps.length ? 'mt-2' : ''}><AngleSumStage run={run} model={model} lang={lang} chips /></div>
      <AngleMessage msg={run.msg} lang={lang} />
      <div className="mt-2">
        <button type="button" onClick={run.act.showMe}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
          <Lightbulb className="w-3.5 h-3.5" strokeWidth={2.5} /> {t.stuck}
        </button>
      </div>
    </div>
  );
}

export function AngleSumActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => angleModel({
    id: activity.id, level: 1, kind: activity.kind, angles: activity.angles, ext: activity.ext, walk: activity.walk ?? true,
  }), [activity]);
  const checked = !!result?.done;
  return (
    <div>
      {activity.context && <p className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{parseText(tr(lang, activity.context, null, activity.contextFr))}</p>}
      {!checked && <Runner key={activity.id} model={model} lang={lang} onResult={onResult} />}
      {checked && (
        <div className={`rounded-xl border-2 mt-1 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? t.correct : t.notQuite}
          </div>
          {model.steps.map((s, i) => (
            <div key={i} className="mb-1 text-slate-900 overflow-x-auto">
              <div className="text-lg"><SafeInlineMath math={bookLatex(s)} /></div>
              <div className="text-sm font-bold text-slate-700">{tr(lang, reasonLine(s).en, null, reasonLine(s).fr)}</div>
            </div>
          ))}
          <div className={`mt-1 font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {parseText(tr(lang, activity.explain, null, activity.explainFr))}
          </div>
        </div>
      )}
    </div>
  );
}
