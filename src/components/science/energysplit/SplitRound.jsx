import { CheckCircle2, Lightbulb, ArrowRight } from 'lucide-react';
import { tr } from '../../../utils/lang';
import useTapDrag from '../storyboard/useTapDrag.js';
import useSplitRun from './useSplitRun.js';
import SplitBoard, { PairBoard } from './SplitBoard.jsx';
import SplitStage, { Message } from './SplitStage.jsx';
import { T } from './splitText.js';

/**
 * One Where Did It Go? round in the task: the device's picture, its diagram,
 * the stage panel, and — once every stage is done — the verdict and Next.
 * Mounted with key={item.id}, so a new item starts clean.
 */
const GREEN = '#58cc02';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';

export default function SplitRound({ model: m, pictures = {}, lang, onComplete, onNext, isLast }) {
  const t = T[lang] || T.en;
  const run = useSplitRun(m, { onFinish: ({ helped }) => onComplete(helped) });
  const drag = useTapDrag((chip, to) => run.act.place(chip, to));
  const r = { ...run, drag };
  const pair = m.kind === 'pair';
  const pics = pair ? [[m.aId, m.a], [m.bId, m.b]] : [[m.deviceId, m.device]];

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center">
        <div className={`grid gap-2 ${pair ? 'grid-cols-2' : ''}`}>
          {pics.map(([id, dev]) => (
            <figure key={id} className="min-w-0">
              {pictures[id] && <div className="mx-auto max-w-[15rem] sm:max-w-none aspect-[400/260]" dangerouslySetInnerHTML={{ __html: pictures[id] }} />}
              <figcaption className="mt-1 text-center text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{tr(lang, dev.en, null, dev.fr)}</figcaption>
            </figure>
          ))}
        </div>
        {pair ? <PairBoard m={m} run={r} lang={lang} /> : <SplitBoard m={m} run={r} lang={lang} />}
      </div>

      {!run.finished && <SplitStage run={r} lang={lang} />}

      {run.finished && (
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4">
          <div className="mb-2 flex items-center gap-2">
            {run.helped
              ? <Lightbulb className="w-6 h-6 text-amber-500" strokeWidth={2.5} />
              : <CheckCircle2 className="w-6 h-6" style={{ color: GREEN }} strokeWidth={2.5} />}
            <div className="font-black text-slate-800 dark:text-slate-100">{run.helped ? t.withHelp : run.slipped ? t.fixed : t.clean}</div>
          </div>
          {run.msg && <Message msg={run.msg} lang={lang} />}
          <div className="mt-3 flex justify-end">
            <button type="button" onClick={onNext} className={`inline-flex items-center gap-2 px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
              {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
