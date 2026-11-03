import { useMemo, useState } from 'react';
import { Construction, Zap, TrendingUp } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { splitModel } from '../utils/energySplit';
import { T } from '../components/science/energysplit/splitText.js';
import SplitRound from '../components/science/energysplit/SplitRound.jsx';

/* ------------------------------------------------------------------ *
 * WHERE DID IT GO? (ENERGY_SPLIT, p91) — Y7 Science 3.7 Where Does Energy
 * Go? One device at a time: sort its energy (the energy-change diagram:
 * from, useful, wasted), count it (useful + wasted = what goes in), chase
 * the wasted energy (where it goes; can it come back?).
 *
 * Reads a unit's `energySplit`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } },
 *     pictures: { [deviceId]: svg },
 *     items: [{ id, level, device, total?, ask?, useful?, sort?, chase?, walk? },
 *             { id, level, kind: 'pair', a, b, useful }] }
 * utils/energySplit.js derives every stage, answer and named slip; the parts
 * are in components/science/energysplit/ (SplitRound, SplitBoard, SplitStage,
 * useSplitRun). Levels 1–2 walk every stage; from level 3 a round opens quick
 * and a wrong part opens the stage it belongs to.
 *
 * Score: a round with no stage filled in pays 1; one where a stage was filled
 * in (a second wrong, or Show me) pays half. Progress blob { [itemId]: 1 | 0.5 },
 * score out of 10. English and French only.
 * ------------------------------------------------------------------ */
const INK = '#c25e12';
const INK_DARK = '#a04a0e';

function deriveItem(item) {
  try { return splitModel(item); } catch { return null; }
}

export default function EnergySplit({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => deriveItem(it)), [pool]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = Number(score) || 0;
    return init;
  });
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [ended, setEnded] = useState(false);
  const item = items[pos];
  const model = useMemo(() => (item ? deriveItem(item) : null), [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button type="button" onClick={onQuit} className="mt-4 px-6 py-3 text-white text-base rounded-xl font-black uppercase tracking-widest border-b-[4px]" style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id] || 0), 0);
    const raw = Math.round((cleared / items.length) * 10);
    const blob = Object.fromEntries(items.filter((it) => res[it.id] != null).map((it) => [it.id, res[it.id]]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id] === 1 }));
    return { raw, blob, log };
  };
  const completeItem = (wasHelped) => {
    const next = { ...results, [item.id]: wasHelped ? 0.5 : 1 };
    setResults(next);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());
  const isLast = pos === items.length - 1;
  const goNext = () => (isLast ? finish() : setPos((p) => p + 1));

  const cleared = items.reduce((s, it) => s + (results[it.id] || 0), 0);
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = levelRaw ? pick(levelRaw.en, levelRaw.fr) : null;
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const intro = pos === 0 ? pick(pool?.intro, pool?.introFr) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      <div className="flex-1 w-full max-w-4xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-3">
        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
            <Zap className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{t.heads[model.kind]}</div>
            <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
          </div>
          <div className="px-4 py-2.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
            </span>
            {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
          </div>
          {intro && <p className="px-4 pb-3 -mt-1 text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{intro}</p>}
        </div>
        <SplitRound key={item.id} model={model} pictures={pool?.pictures} lang={lang}
          onComplete={completeItem} onNext={goNext} isLast={isLast} />
      </div>
    </div>
  );
}
