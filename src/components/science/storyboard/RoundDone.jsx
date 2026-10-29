import { Lightbulb, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { STEPS, CAUSES, VERDICTS } from '../../../utils/solarStory';
import { T } from './storyboardText.js';
import { FrameCard } from './OrderBoard.jsx';

/* ------------------------------------------------------------------ *
 * The end of a Storyboard item: how it went, then the whole answer to read —
 * the story with every reason (not only the asked ones), what a fact means,
 * or the model's strengths and limitations side by side.
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const INK = '#0087a8';

export default function RoundDone({ m, frames, lang, helped, slipped, onNext, isLast, note = null }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const head = helped ? t.helped : slipped ? t.slipped : t.clean;
  return (
    <div className="rounded-2xl border-2 shadow-sm overflow-hidden" style={{ borderColor: helped ? AMBER : GREEN }}>
      <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
        {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
        <div className="font-black">{head}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
        {note && <div className="-mt-3 mb-3">{note}</div>}
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
          <BookOpen className="w-4 h-4" strokeWidth={3} /> {m.kind === 'story' ? t.theStory : m.kind === 'evidence' ? t.whatItMeans : `${t.strengths} · ${t.limitations}`}
        </div>

        {m.kind === 'story' && (
          <ol className="flex flex-col gap-2">
            {m.frames.map((s, i) => (
              <li key={s} className="flex gap-2 sm:gap-3 items-start">
                <div className="w-20 sm:w-24 shrink-0"><FrameCard step={s} svg={frames?.[s]} lang={lang} showSays={false} compact /></div>
                <div className="min-w-0 text-sm leading-snug">
                  <div className="font-black text-slate-800 dark:text-slate-100">{i + 1}. {pick(STEPS[s].says, STEPS[s].saysFr)}</div>
                  {i > 0 && (
                    <div className="mt-0.5 font-semibold text-slate-600 dark:text-slate-300">
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: INK }}>{t.because} </span>
                      {pick(CAUSES[s].en, CAUSES[s].fr)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        {m.kind === 'evidence' && (
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            {m.verdict === 'supports' && <div className="w-40 shrink-0"><FrameCard step={m.fact.frame} svg={frames?.[m.fact.frame]} lang={lang} showSays={false} compact tone="right" /></div>}
            <div className="min-w-0 text-sm sm:text-base leading-snug">
              <p className="font-black text-slate-800 dark:text-slate-100">{pick(VERDICTS[m.verdict].en, VERDICTS[m.verdict].fr)}</p>
              <p className="mt-1 font-semibold text-slate-600 dark:text-slate-300">
                {m.verdict === 'supports' ? pick(m.fact.link, m.fact.linkFr) : pick(m.fact.after, m.fact.afterFr)}
              </p>
              {m.verdict === 'contradicts' && <p className="mt-1 font-semibold text-slate-600 dark:text-slate-300">{t.keepIt}</p>}
            </div>
          </div>
        )}

        {m.kind === 'model' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {['strength', 'limitation'].map((kind) => (
              <div key={kind} className={`rounded-xl border-2 p-3 ${kind === 'strength' ? 'border-teal-500/60 bg-teal-50 dark:bg-teal-900/20' : 'border-purple-500/50 bg-purple-50 dark:bg-purple-900/20'}`}>
                <div className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${kind === 'strength' ? 'text-teal-700 dark:text-teal-300' : 'text-purple-700 dark:text-purple-300'}`}>
                  {kind === 'strength' ? t.strengths : t.limitations}
                </div>
                <ul className="flex flex-col gap-1.5">
                  {m.model.statements.filter((st) => st.kind === kind).map((st) => (
                    <li key={st.id} className="text-sm leading-snug">
                      <span className="font-bold text-slate-800 dark:text-slate-100">{pick(st.en, st.fr)}</span>
                      <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">{pick(st.why, st.whyFr)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button type="button" onClick={onNext}
            className="px-6 py-3 text-white text-sm rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all"
            style={{ backgroundColor: INK, borderColor: '#00697f' }}>
            {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
