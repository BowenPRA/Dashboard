import { useMemo, useState } from 'react';
import { Construction, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, ListChecks, Columns3, CheckCircle2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr, pickTable } from '../utils/lang';
import DecColumnWork from '../components/math/DecColumnWork.jsx';
import { itemModel, calcText } from '../utils/decColumn';

/* ------------------------------------------------------------------ *
 * LINE UP THE POINTS — written column + and − of decimals (Y7 Maths 4.2).
 *
 * Reads a unit's `decColumn`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } }, items: [
 *       { id, level, a: '23.4', op: '+', b: '6.78' },
 *       { id, level, a: '50', op: '−', b: '23.65', context, contextFr, unit: 'dollars' },
 *       { id, level, steps: [{ a, op, b }, { a: '10', op: '−', b: '@' }], context, contextFr, unit },
 *   ] }
 * utils/decColumn.js derives every square, gap, carry and exchange; the
 * stages are drawn by components/math/DecColumnWork.jsx — choose the
 * calculation (stories), line up the points, fill the gaps with zeros, work
 * the columns from the right as the point drops straight down.
 *
 * An item pays 1, or ½ when a step had to be filled in (two wrong answers at
 * it, or "Show me"). Progress blob: { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#0087a8';
const INK_DARK = '#00697f';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Line Up the Points', level: 'Level', solved: 'done',
    work: 'Work it out', story: 'Read it, then work',
    step: (i, n) => `Step ${i} of ${n}`,
    clean: 'Every step right first time.', slipped: 'Done — one wrong turn, and you found it yourself.', helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer', next: 'Next question', finish: 'Finish',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Aligne les points', level: 'Niveau', solved: 'faites',
    work: 'Calcule', story: 'Lis, puis calcule',
    step: (i, n) => `Étape ${i} sur ${n}`,
    clean: 'Toutes les étapes justes du premier coup.', slipped: 'Fini — une erreur, et tu l’as trouvée toi-même.', helped: 'Fini — avec une ou deux étapes montrées.',
    bookCopy: 'Recopie ceci dans ton cahier', answer: 'Réponse', next: 'Suivant', finish: 'Terminer',
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
  },
};
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function derive(item) {
  if (!item?.id) return null;
  try { return itemModel(item); } catch { return null; }
}

/** "23.4 + 6.78 = 30.18", and "= 7" after a written 7.00. */
const resultLine = (m) => `${calcText(m)} = ${m.answerText}${m.answerText !== m.answerCanon ? ` = ${m.answerCanon}` : ''}`;

export default function DecColumn({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => derive(it)), [pool]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const t = pickTable(T, lang);
  const pick = (en, fr) => tr(lang, en, null, fr || en);

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
  const [stepIdx, setStepIdx] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const im = useMemo(() => derive(item), [item]);

  if (!items.length || !im) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  /* ---------------------------------------------------------- saving */
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const stepDone = ({ helped: h, slipped: sl }) => {
    const nowHelped = helped || h;
    setHelped(nowHelped);
    setSlipped(slipped || sl);
    if (stepIdx + 1 < im.steps.length) { setStepIdx(stepIdx + 1); return; }
    const next = { ...results, [item.id]: { score: nowHelped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const goNext = () => {
    setPos((p) => p + 1);
    setStepIdx(0); setHelped(false); setSlipped(false); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- render */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.fr);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const intro = pos === 0 ? pick(pool?.intro, pool?.introFr) : null;
  const context = item.context ? pick(item.context, item.contextFr) : null;
  const m = im.steps[stepIdx];
  const unit = item.unit ? ` ${pick(item.unit, item.unitFr)}` : '';
  const stepSay = (k) => (im.steps[k].say ? pick(im.steps[k].say, im.steps[k].sayFr) : null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Columns3 className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{context ? t.story : t.work}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            {context && <p className="px-4 pt-3 text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{context}</p>}
            {!context && <p className="px-4 pt-3 pb-1 text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-slate-100">{calcText(m)}</p>}
            {intro && <p className="px-4 pt-2 text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
            {im.multi && (
              <ol className="px-4 pt-3 flex flex-col gap-1">
                {im.steps.map((s, k) => (
                  <li key={k} className={`flex items-center gap-2 text-sm font-bold ${k === stepIdx && !itemDone ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>
                    {k < stepIdx || itemDone ? <CheckCircle2 className="w-4 h-4 text-[#58a700]" strokeWidth={3} /> : <span className="w-4 h-4 rounded-full border-2 border-current inline-block" />}
                    {t.step(k + 1, im.steps.length)}{k < stepIdx || itemDone ? <span className="font-mono">: {resultLine(s)}</span> : stepSay(k) ? `: ${stepSay(k)}` : ''}
                  </li>
                ))}
              </ol>
            )}
            <div className="h-3" />
          </div>
        </div>

        {/* right: the column sum */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              {im.multi && <div className="mb-2 text-[11px] font-black uppercase tracking-widest" style={{ color: INK }}>{t.step(stepIdx + 1, im.steps.length)}</div>}
              <DecColumnWork key={`${item.id}-${stepIdx}`} m={m} lang={lang} uid={`dc-${item.id}-${stepIdx}`} ink={INK}
                choose={!!item.context} seed={`${item.id}-${stepIdx}`} onFinish={stepDone} />
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? t.helped : slipped ? t.slipped : t.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}
                </div>
                <div className={`grid gap-3 ${im.multi ? 'sm:grid-cols-2' : ''}`}>
                  {im.steps.map((s, k) => (
                    <div key={k} className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2 sm:p-3 min-w-0">
                      <DecColumnWork m={s} lang={lang} uid={`dc-done-${item.id}-${k}`} ink={INK} finished compact={im.multi} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(0,135,168,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="font-mono font-black text-lg sm:text-xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                    {resultLine(im.steps[im.steps.length - 1])}{unit}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
