import { useMemo, useState } from 'react';
import { Construction, Orbit, TrendingUp } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { roundModel } from '../utils/orbitLab';
import { T } from '../components/science/orbitlab/orbitLabText.js';
import OrbitRound from '../components/science/orbitlab/OrbitRound.jsx';

/* ------------------------------------------------------------------ *
 * ORBIT LAB (ORBIT_LAB, p87) — Y7 Science 3.3 Movement in Space. The book's
 * three questions, used on things the student has not met: which way the
 * pull points and where it goes without it; a bar graph of orbit speeds,
 * its pattern and why; what slows a moving thing down, in space and on Earth.
 *
 * Reads a unit's `orbitLab`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } },
 *     items: [
 *       { id, level, kind: 'pull', scene, orbiter?, at, dir, ask?, walk? },
 *       { id, level, kind: 'graph', set, given?, ask },
 *       { id, level, kind: 'coast', scene, walk? },
 *   ] }
 * utils/orbitLab.js derives every round, answer and named slip; the parts are
 * in components/science/orbitlab/ (OrbitRound, OrbitStage, OrbitFigure,
 * BarBuilder, CoastScene, RoundDone, useOrbitItem).
 *
 * Score: an item right first time (or with one wrong turn put right) pays 1;
 * one where a stage was filled in pays half. Progress blob { [itemId]: 1 | 0.5 },
 * score out of 10. English and French only.
 * ------------------------------------------------------------------ */
const INK = '#0087a8';
const INK_DARK = '#00697f';

function deriveItem(item) {
  try { return roundModel(item); } catch { return null; }
}

export default function OrbitLab({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
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
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
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
      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-3">
        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
            <Orbit className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{t.heads[model.kind]}</div>
            <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
          </div>
          <div className="px-4 py-2.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 text-[10px] font-black uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
            </span>
            {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
          </div>
          {intro && <p className="px-4 pb-3 -mt-1 text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{intro}</p>}
        </div>
        <OrbitRound key={item.id} model={model} lang={lang} onComplete={completeItem} onNext={goNext} isLast={isLast} />
      </div>
    </div>
  );
}
