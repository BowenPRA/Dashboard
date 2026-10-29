import { useMemo, useState } from 'react';
import { Construction, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, Compass } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { angleModel, questionText } from '../utils/angleSum';
import AngleSumFigure from '../components/math/AngleSumFigure.jsx';
import AngleSumStage, { AngleMessage, StageChips, Working } from '../components/math/AngleSumStage.jsx';
import { INK } from '../components/math/angleSumText';
import useAngleSteps from '../components/math/useAngleSteps';

/* ------------------------------------------------------------------ *
 * FIND IT, SAY WHY — find a missing angle and give the fact as the
 * reason (Y7 Maths 5.1, A sum of 360°).
 *
 * Reads a unit's `angleSum`: { title, titleFr, intro?, introFr?,
 *   levels: { n: { en, fr } }, items: [ { id, level, kind, angles, ext?,
 *   context?, contextFr?, walk? } ] } — schema at the top of utils/angleSum.js.
 *
 * Levels 1–2 WALK every stage: (find first) → 180 or 360 → add → subtract →
 * (share) → say why. From level 3 an item opens QUICK: type the angle and pick
 * the reason. A wrong angle opens the stages where its slip happened; a wrong
 * reason re-asks only the reason. A wrong answer is named and tried again; a
 * second (or Show me) fills the stage in and the item pays half.
 * Progress blob: { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const DARK = '#3f1a5c';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

const T = {
  en: {
    title: 'Find It, Say Why', next: 'Next question', finish: 'Finish', solved: 'done', level: 'Level', stuck: 'Show me',
    clean: 'Found, and the reason given, first time.', slipped: 'Done — one slip, and you fixed it yourself.', helped: 'Done — with a step shown to you.',
    bookCopy: 'Copy this into your book', noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Trouve-le, justifie', next: 'Suivant', finish: 'Terminer', solved: 'faites', level: 'Niveau', stuck: 'Montre-moi',
    clean: 'Trouvé, et la raison donnée, du premier coup.', slipped: 'Fini — une erreur, et tu l’as corrigée toi-même.', helped: 'Fini — avec une étape montrée.',
    bookCopy: 'Recopie ceci dans ton cahier', noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
  },
};

function derive(item) {
  if (!item?.id) return null;
  try { return angleModel(item); } catch { return null; }
}

/** One item, from its first stage to the done panel. Keyed by the item id. */
function ItemRunner({ item, model, lang, levelName, intro, isLast, onDone, onNext }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const run = useAngleSteps(model, { onFinish: ({ helped }) => onDone(helped) });
  const { step, stage, finished } = run;
  const found = finished ? model.answers : run.found;
  const pickable = !finished && stage === 'add' ? [...step.knowns, ...step.decoys].map((e) => e.key) : [];
  const q = questionText(model);
  const context = item.context ? pick(item.context, item.contextFr) : null;

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 lg:items-start">
      <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          <div className="px-4 py-2 text-white flex items-center gap-2" style={{ backgroundColor: INK }}>
            <Compass className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest"><TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}</span>
            {levelName && <span className="text-xs font-bold opacity-90 truncate">· {levelName}</span>}
          </div>
          {context && <p className="px-4 pt-3 text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{context}</p>}
          <p className="px-4 pt-3 text-base font-black text-slate-800 dark:text-slate-100">{pick(q.en, q.fr)}</p>
          {intro && <p className="px-4 pt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
          <div className="p-2 sm:p-3">
            <AngleSumFigure model={model} found={found} current={finished ? [] : step.letters} pickable={pickable} picked={pickable.length ? run.picked : []} onPick={run.act.togglePick} maxHeight="44vh" />
          </div>
          {!finished && <div className="px-3 pb-3"><StageChips run={run} lang={lang} /></div>}
        </div>
      </div>

      <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
        {!finished && (
          <>
            <Working run={run} lang={lang} />
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              <AngleSumStage run={run} model={model} lang={lang} extra={(
                <button type="button" onClick={run.act.showMe}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
                </button>
              )} />
            </div>
          </>
        )}
        {finished && (
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: run.helped ? AMBER : GREEN }}>
            <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: run.helped ? AMBER : GREEN }}>
              {run.helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
              <div className="font-black">{run.helped ? t.helped : run.slipped ? t.slipped : t.clean}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
              {run.msg?.tone === 'shown' && <div className="-mt-3 mb-3"><AngleMessage msg={run.msg} lang={lang} /></div>}
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2"><Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}</div>
              <Working run={run} lang={lang} big />
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

export default function AngleSum({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => derive(it)), [pool]);
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
  const model = useMemo(() => derive(item), [item]);
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4"><Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} /></div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button type="button" onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: DARK }}>{t.back}</button>
      </div>
    );
  }

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = Math.round((cleared / items.length) * 10);
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const onDone = (helped) => {
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
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
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const title = pick(pool?.title, pool?.titleFr) || t.title;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={`${title} · ${cleared % 1 === 0 ? cleared : cleared.toFixed(1)}/${items.length} ${t.solved}`} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      <ItemRunner key={item.id} item={item} model={model} lang={lang} levelName={levelName}
        intro={pos === 0 ? pick(pool?.intro, pool?.introFr) : null} isLast={isLast}
        onDone={onDone} onNext={isLast ? finish : () => setPos((p) => p + 1)} />
    </div>
  );
}
