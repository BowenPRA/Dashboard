import { Lightbulb, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { T, ruleLines } from './orbitLabText';

/* ------------------------------------------------------------------ *
 * The end of an Orbit Lab item: how it went, and the rule to take away —
 * the pull and the straight line, the pattern with its reason, or what
 * slows a moving thing down (and what does not).
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const INK = '#0087a8';

export default function RoundDone({ m, lang, helped, slipped, onNext, isLast, note = null }) {
  const t = T[lang] || T.en;
  const head = helped ? t.helped : slipped ? t.slipped : t.clean;
  return (
    <div className="rounded-2xl border-2 shadow-sm overflow-hidden" style={{ borderColor: helped ? AMBER : GREEN }}>
      <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
        {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
        <div className="font-black">{head}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
        {note && <div className="-mt-3 mb-3">{note}</div>}
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
          <BookOpen className="w-4 h-4" strokeWidth={3} /> {m.kind === 'graph' ? t.pattern : t.rule}
        </div>
        {ruleLines(m, lang).map((line) => (
          <p key={line} className="font-bold text-slate-800 dark:text-slate-100 leading-snug text-sm sm:text-base">{line}</p>
        ))}
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
