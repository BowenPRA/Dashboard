import { Lightbulb, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { ENERGIES, FAMILIES, CLUES, REASONS } from '../../../utils/energySpot';
import { VERDICTS } from '../../../utils/energySpotData';
import { T, familyInk } from './spotText.js';

/* ------------------------------------------------------------------ *
 * The end of a Name That Energy item: how it went, then the whole answer to
 * read — clue → energy → store or transfer, for the thing or every pin; every
 * store with its clue; or the store, how long it lasts, and why.
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const INK = '#0087a8';

function Line({ clue, energy, family, lang, n = null, name = null }) {
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  return (
    <li className="flex gap-2 items-start text-sm leading-snug">
      {n != null && <span className="w-6 h-6 shrink-0 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center">{n}</span>}
      <div className="min-w-0">
        {name && <div className="font-bold text-slate-700 dark:text-slate-200">{name}</div>}
        <div className="font-semibold text-slate-500 dark:text-slate-400">{pick(CLUES[clue].en, CLUES[clue].fr)}</div>
        <div className="font-black" style={{ color: familyInk(family) }}>
          → {pick(ENERGIES[energy].en, ENERGIES[energy].fr)} · {pick(FAMILIES[family].en, FAMILIES[family].fr).toLowerCase()}
        </div>
      </div>
    </li>
  );
}

export default function RoundDone({ m, lang, helped, slipped, onNext, isLast, note = null }) {
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
          <BookOpen className="w-4 h-4" strokeWidth={3} /> {t.theAnswer}
        </div>

        {m.kind === 'one' && <ul><Line clue={m.clue} energy={m.energy} family={m.family} lang={lang} /></ul>}

        {m.kind === 'scene' && (
          <ul className="grid sm:grid-cols-2 gap-2">
            {m.pins.map((p) => <Line key={p.id} n={p.n} name={pick(p.en, p.fr)} clue={p.clue} energy={p.energy} family={p.family} lang={lang} />)}
          </ul>
        )}

        {m.kind === 'stores' && (
          <ul className="flex flex-col gap-2">
            {m.clues.map((c) => <Line key={c} clue={c} energy={CLUES[c].energy} family="store" lang={lang} />)}
          </ul>
        )}

        {m.kind === 'lasts' && (
          <div className="text-sm sm:text-base leading-snug">
            <p className="font-black" style={{ color: INK }}>{pick(ENERGIES[m.store].en, ENERGIES[m.store].fr)} · {pick(VERDICTS[m.verdict].en, VERDICTS[m.verdict].fr)}</p>
            <p className="mt-1 font-semibold text-slate-600 dark:text-slate-300">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: INK }}>{t.because} </span>
              {pick(REASONS[m.reason].en, REASONS[m.reason].fr)}
            </p>
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
