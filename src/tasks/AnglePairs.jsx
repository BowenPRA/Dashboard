import { useMemo, useState } from 'react';
import {
  Construction, CheckCircle2, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, Hand, Tags, Ruler, MousePointerClick, Shuffle, HelpCircle,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import AnglePairFigure from '../components/math/AnglePairFigure.jsx';
import useAnglePairItem, { deriveAnglePair } from '../components/math/useAnglePairItem';
import { PairButtons, ReasonButtons, SizeInput, ApMessage, Sentences } from '../components/math/AnglePairParts.jsx';
import { apT, questionOf, stageTitle } from '../components/math/anglePairWords';

/* ------------------------------------------------------------------ *
 * X, F OR Z? — see the pair, then find the angle and say why (Y7 Maths
 * 5.2, Intersecting lines). Reads a unit's `anglePairs`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } }, items }
 * Item shapes and the stages are in utils/anglePairs.js; the picture is
 * drawn from the item by utils/anglePairGeom.js, so nothing is stored but
 * the question.
 *
 * Two or three actions an item from level 3 on, and naming the pair always
 * stays. A wrong answer is named and tried again; a second (or Show me)
 * fills the stage in and the item pays half. Blob { [itemId]: 1 | 0.5 },
 * score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#c25e12';
const INK_DARK = '#a04a0e';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const STAGE_ICON = { tap: Hand, pair: Tags, size: Ruler, stone: MousePointerClick, stoneSize: Ruler, line: Shuffle, convert: Ruler, reason: HelpCircle };
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function StageChip({ icon: Icon, label, active, done }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest
      ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
        : active ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
      style={active && !done ? { backgroundColor: INK } : undefined}>
      {done ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
      <span>{label}</span>
    </div>
  );
}

/** One item, keyed by its id so every item starts fresh. */
function ItemPanel({ item, pool, lang, header, isLast, onDone, onNext }) {
  const run = useAnglePairItem(item, { onFinish: onDone });
  const t = apT(lang);
  const { m, kind, done } = run;

  const context = item.context ? tr(lang, item.context, null, item.contextFr) : null;
  const intro = item === pool.items[0] ? tr(lang, pool.intro, null, pool.introFr) : null;
  // The chips follow the item's own stages; an opened stage lights the one it belongs to.
  const answered = m.stages.filter((s) => run.answers[s]).length;

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-5 lg:items-start">
      <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          {header}
          <p className="px-4 pt-3 text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{questionOf(m, lang, context)}</p>
          {intro && <p className="px-4 pt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
          <div className="p-2 sm:p-3">
            <AnglePairFigure F={m.F} marks={run.marks} glow={run.glow} tap={done ? null : run.tap} rails={run.rails}
              onTap={run.tap === 'rail' ? run.actions.tapRail : run.actions.tapSector}
              label={t.title} className="mx-auto" style={{ maxHeight: '52vh' }} />
          </div>
          {!done && (
            <div className="px-3 pb-3 flex flex-wrap gap-1.5">
              {m.stages.map((s, n) => {
                const k = s.split(':')[0];
                return <StageChip key={s} icon={STAGE_ICON[k]} label={t.stages[k]} active={n === answered} done={n < answered} />;
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
        {!done && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
            <div className="font-black text-slate-800 dark:text-slate-100 mb-3 text-lg">{stageTitle(run, lang)}</div>
            {kind === 'pair' && <PairButtons options={run.target.options} picks={run.picks} onChoose={run.actions.choose} lang={lang} />}
            {kind === 'reason' && <ReasonButtons picks={run.picks} onChoose={run.actions.choose} lang={lang} />}
            {['size', 'stoneSize', 'convert'].includes(kind) && (
              <>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{t.sizeSub}</p>
                <SizeInput key={run.stage} lang={lang} onCheck={run.actions.type} bad={run.msg?.tone === 'bad'}
                  letter={kind === 'stoneSize' ? 'w' : kind === 'convert' ? '?' : run.target.letter} />
              </>
            )}
            <ApMessage msg={run.msg} lang={lang} />
            <div className="mt-4 flex justify-end">
              <button onClick={run.actions.showMe}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
              </button>
            </div>
          </div>
        )}

        {done && (
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: run.filled ? AMBER : GREEN }}>
            <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: run.filled ? AMBER : GREEN }}>
              {run.filled ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
              <div className="font-black">{run.filled ? t.helped : run.slipped ? t.slipped : t.clean}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
              {run.msg && <div className="-mt-3 mb-3"><ApMessage msg={run.msg} lang={lang} /></div>}
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                <Pencil className="w-4 h-4" strokeWidth={3} /> {t.write}
              </div>
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4">
                <Sentences m={m} stone={run.stone} lang={lang} />
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={onNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                  {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnglePairs({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => deriveAnglePair(it)), [pool]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const t = apT(lang);
  const [results, setResults] = useState(() => Object.fromEntries(Object.entries(savedData || {}).map(([id, s]) => [id, Number(s) || 0])));
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => { const i = items.findIndex((it) => savedData?.[it.id] == null); return i === -1 ? 0 : i; });
  const [ended, setEnded] = useState(false);

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Construction className="w-10 h-10 mb-3" style={{ color: INK }} strokeWidth={2.5} />
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id] || 0), 0);
    return {
      raw: Math.round((cleared / items.length) * 10),
      blob: Object.fromEntries(items.filter((it) => res[it.id] != null).map((it) => [it.id, res[it.id]])),
      log: { items: items.map((it) => ({ itemId: it.id, correct: res[it.id] === 1 })) },
    };
  };
  const item = items[pos];
  const isLast = pos === items.length - 1;
  const onDone = (helped) => {
    const next = { ...results, [item.id]: helped ? 0.5 : 1 };
    setResults(next);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, log);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, log);
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());
  const cleared = items.reduce((s, it) => s + (results[it.id] || 0), 0);
  const level = item.level ? pool?.levels?.[item.level] : null;

  const header = (
    <>
      <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
        <span className="font-black text-sm">X · F · Z</span>
        <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
      </div>
      {item.level && (
        <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase tracking-widest">
            <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
          </span>
          {level && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{tr(lang, level.en, null, level.fr)}</span>}
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={tr(lang, pool?.title, null, pool?.titleFr) || t.title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      <ItemPanel key={item.id} item={item} pool={pool} lang={lang} header={header} isLast={isLast}
        onDone={onDone} onNext={isLast ? finish : () => setPos((p) => p + 1)} />
    </div>
  );
}
