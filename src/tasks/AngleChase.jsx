import { useMemo, useState } from 'react';
import { Construction, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, Search } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { chaseModel, FACT_KINDS, questionOf, findable, litOf } from '../utils/angleChase';
import AngleChaseFigure from '../components/math/AngleChaseFigure.jsx';
import useChaseRun from '../components/math/useChaseRun';
import { ChaseStep, LetterChips, WorkingList } from '../components/math/AngleChaseParts.jsx';
import { CT } from '../components/math/angleChaseWords';

/* ------------------------------------------------------------------ *
 * FIND EVERY ANGLE — a Workbook-style diagram with several letters,
 * found one at a time (Y7 Maths 5.1 A sum of 360°, 5.2 Intersecting
 * lines). Each angle found is written on the picture and is then a
 * known angle for the next one.
 *
 * Reads a unit's `angleChase`: { title, titleFr, intro?, introFr?, facts,
 *   levels: { n: { en, fr } }, items: [ { id, level, fig, context?,
 *   contextFr?, guided? } ] } — schema at the top of utils/angleChase.js.
 *
 * Every angle: (choose it) → the fact → the size. Guided items (levels 1–2)
 * choose the next letter for the student and show the sum with its numbers
 * in place. A letter costs nothing to get wrong once; a second wrong answer,
 * or Show me, fills the stage in and the letter pays half. An item scores the
 * mean of its letters. Progress blob: { [itemId]: score }, out of 10.
 * ------------------------------------------------------------------ */

const INK = '#7a3e00';
const DARK = '#5a2d00';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function derive(item, facts, guidedUpTo) {
  if (!item?.id) return null;
  try { return chaseModel(item, facts, { guidedUpTo }); } catch { return null; }
}

/** One item, from its first letter to the done panel. Keyed by the item id. */
function ItemRunner({ item, model, facts, lang, levelName, intro, isLast, onDone, onNext }) {
  const t = CT[lang] || CT.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const run = useChaseRun(model, { onFinish: onDone });
  const { s } = run;
  const finished = s.stage === 'done';
  const q = questionOf(model);
  const context = item.context ? pick(item.context, item.contextFr) : null;
  const lit = s.stage === 'pick' && s.msg?.code === 'hintPick'
    ? { keys: run.tappable.filter((n) => findable(model, n, run.known)).flatMap((n) => model.vars[n].keys), segs: [] }
    : litOf(model, s.stage === 'size' ? s.rel : s.hintRel, s.target);

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-5 lg:items-start">
      <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          <div className="px-4 py-2 text-white flex items-center gap-2" style={{ backgroundColor: INK }}>
            <Search className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest"><TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}</span>
            {levelName && <span className="text-xs font-bold opacity-90 truncate">· {levelName}</span>}
          </div>
          {context && <p className="px-4 pt-3 text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{context}</p>}
          <p className="px-4 pt-3 text-base font-black text-slate-800 dark:text-slate-100">{pick(q.en, q.fr)}</p>
          {intro && <p className="px-4 pt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
          <div className="p-2 sm:p-3">
            <AngleChaseFigure model={model} found={finished ? Object.fromEntries(Object.keys(model.vars).filter((n) => model.vars[n].letter).map((n) => [n, model.vars[n].value])) : run.found}
              current={finished ? null : s.target} stones={s.stones} lit={finished ? null : lit}
              tappable={run.tappable} onTap={run.act.pick} maxHeight="52vh" />
          </div>
          <div className="px-3 pb-3"><LetterChips model={model} run={run} lang={lang} /></div>
        </div>
      </div>

      <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
        {!finished && <ChaseStep model={model} facts={facts} run={run} lang={lang} />}
        {!finished && s.log.length > 0 && <WorkingList model={model} log={s.log} lang={lang} />}
        {finished && (
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: s.helpedAny ? AMBER : GREEN }}>
            <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: s.helpedAny ? AMBER : GREEN }}>
              {s.helpedAny ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
              <div className="font-black">{s.helpedAny ? t.helped : s.slipped ? t.slipped : t.clean}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2"><Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}</div>
              <WorkingList model={model} log={s.log} lang={lang} bare />
              <div className="mt-4 flex justify-end">
                <button type="button" onClick={onNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: DARK }}>
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

export default function AngleChase({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const facts = useMemo(() => (pool?.facts?.length ? pool.facts : FACT_KINDS), [pool]);
  const guidedUpTo = pool?.guidedUpTo;
  const items = useMemo(() => (pool?.items || []).filter((it) => derive(it, facts, guidedUpTo)), [pool, facts, guidedUpTo]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [ended, setEnded] = useState(false);
  const item = items[pos];
  const model = useMemo(() => derive(item, facts, guidedUpTo), [item, facts, guidedUpTo]);
  const t = CT[lang] || CT.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4"><Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} /></div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button type="button" onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: DARK }}>{t.back}</button>
      </div>
    );
  }

  const summary = (res) => {
    const cleared = items.reduce((sum, it) => sum + (res[it.id]?.score || 0), 0);
    const raw = Math.round((cleared / items.length) * 10);
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const onDone = ({ score }) => {
    const next = { ...results, [item.id]: { score } };
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
  const isLast = pos === items.length - 1;
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());
  const levelRaw = pool?.levels?.[item.level];
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.fr);
  const cleared = items.reduce((sum, it) => sum + (results[it.id]?.score || 0), 0);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const shown = Number.isInteger(cleared) ? cleared : cleared.toFixed(1);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={`${title} · ${shown}/${items.length} ${t.solved}`} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      <ItemRunner key={item.id} item={item} model={model} facts={facts} lang={lang} levelName={levelName}
        intro={pos === 0 ? pick(pool?.intro, pool?.introFr) : null} isLast={isLast}
        onDone={onDone} onNext={isLast ? finish : () => setPos((p) => p + 1)} />
    </div>
  );
}
