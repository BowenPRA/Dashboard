import { useOrbitItem } from './useOrbitItem';
import { OrbitPicture, StagePanel, Message } from './OrbitStage.jsx';
import RoundDone from './RoundDone.jsx';

/* ------------------------------------------------------------------ *
 * One Orbit Lab item in the task. Mounted with key={item.id}, so a new item
 * starts clean. The picture sits beside the questions from lg (above them
 * below lg); once done, the rule and Next.
 * ------------------------------------------------------------------ */
export default function OrbitRound({ model, lang, onComplete, onNext, isLast }) {
  const o = useOrbitItem(model, { onDone: ({ helped }) => onComplete(helped) });
  const wide = model.kind !== 'coast';
  return (
    <div className={`grid gap-3 ${wide ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]' : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'} items-start`}>
      <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2 sm:p-3 min-w-0">
        <OrbitPicture o={o} lang={lang} />
      </div>
      <div className="min-w-0">
        {!o.done && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5">
            <StagePanel o={o} lang={lang} />
          </div>
        )}
        {o.done && (
          <RoundDone m={model} lang={lang} helped={o.helped} slipped={o.slipped} onNext={onNext} isLast={isLast}
            note={o.msg?.tone === 'shown' ? <Message msg={o.msg} lang={lang} /> : null} />
        )}
      </div>
    </div>
  );
}
