import { useMemo, useState } from 'react';
import { ArrowUp01, Construction } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr, pickTable } from '../utils/lang';
import DecOrderItem from '../components/math/DecOrderItem.jsx';
import { QuestionCard, DoneCard } from '../components/math/StepKit.jsx';
import { DecOrderFinal } from '../components/math/DecOrderBoard.jsx';
import { decOrderModel, questionOf } from '../utils/decOrder';

/* ------------------------------------------------------------------ *
 * FILL THE ZEROS — comparing and ordering decimals (Y7 Maths 4.1).
 *
 * Reads a unit's `decOrder`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } }, items: [
 *       { id, level, kind: 'compare', a: '4.09', b: '4.1' },
 *       { id, level, kind: 'order', nums: ['3.3', '3.25', '3.05'], dir: 'asc' },
 *       { id, level, kind: 'order', nums, word: 'fastest', labels, unit: 's', position: 3,
 *         context, contextFr },
 *       { id, level, kind: 'digit', a: '4.□5', sign: '>', b: '4.38' },
 *   ] }
 * utils/decOrder.js derives the padded numbers, the order, the answers and
 * the slip behind a wrong one; components/math/DecOrderItem.jsx works the
 * stages (fill with zeros → order / compare / digits → position).
 *
 * A wrong answer is named and can be tried again; a second one (or "Show
 * me") fills the stage in and the item pays half. Progress blob:
 * { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#1a5fa8';
const INK_DARK = '#134a85';

const T = {
  en: {
    title: 'Fill the Zeros', next: 'Next question', finish: 'Finish', solved: 'done', level: 'Level',
    clean: 'Right first time.', slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step shown to you.', bookCopy: 'Copy this into your book',
    heads: { order: 'Put them in order', compare: 'Compare two decimals', digit: 'A missing digit' },
    how: ['Fill the gaps with zeros', 'Compare from the left', 'Answer'],
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Complète avec des zéros', next: 'Suivant', finish: 'Terminer', solved: 'faites', level: 'Niveau',
    clean: 'Juste du premier coup.', slipped: 'Fini — une erreur, et tu l’as trouvée toi-même.',
    helped: 'Fini — avec une étape montrée.', bookCopy: 'Recopie ceci dans ton cahier',
    heads: { order: 'Range-les dans l’ordre', compare: 'Compare deux décimaux', digit: 'Un chiffre manquant' },
    how: ['Complète avec des zéros', 'Compare de gauche à droite', 'Réponds'],
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
  },
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function deriveItem(item) {
  if (!item?.id) return null;
  try { return decOrderModel(item); } catch { return null; }
}

export default function DecOrder({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => deriveItem(it)), [pool]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const t = pickTable(T, lang);
  const pick = (en, fr) => tr(lang, en, en, fr || en);

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
  const [done, setDone] = useState(null);   // { helped, slipped, msg } once the item is finished
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const model = useMemo(() => deriveItem(item), [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
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
  const onItemDone = (r) => {
    const next = { ...results, [item.id]: { score: r.helped ? 0.5 : 1 } };
    setResults(next);
    setDone(r);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const goNext = () => { setPos((p) => p + 1); setDone(null); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  // X only logs an attempt when something was answered THIS sitting.
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- render */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.fr);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const context = item.context ? pick(item.context, item.contextFr) : null;
  const question = questionOf(model);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <QuestionCard ink={INK} icon={ArrowUp01} head={t.heads[model.kind]}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${items.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName}
            context={context} question={pick(question.en, question.fr)} how={pos === 0 ? t.how : null} />
        </div>

        {/* right: the board */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!done && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              <DecOrderItem key={item.id} model={model} lang={lang} ink={INK} onDone={onItemDone} />
            </div>
          )}

          {done && (
            <DoneCard ink={INK} inkDark={INK_DARK} helped={done.helped} slipped={done.slipped}
              words={{ clean: t.clean, slipped: t.slipped, helped: t.helped, bookCopy: t.bookCopy, next: t.next, finish: t.finish }}
              shown={done.msg?.tone === 'shown' ? pick(done.msg.en, done.msg.fr) : null}
              isLast={isLast} onNext={isLast ? finish : goNext}>
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 min-w-0">
                <DecOrderFinal model={model} ink={INK} />
              </div>
            </DoneCard>
          )}
        </div>
      </div>
    </div>
  );
}
