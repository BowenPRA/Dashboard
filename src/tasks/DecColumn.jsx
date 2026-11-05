import { useMemo, useState } from 'react';
import { Construction, ListChecks, Columns3, Check } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr, pickTable } from '../utils/lang';
import DecColumnWork from '../components/math/DecColumnWork.jsx';
import { QuestionCard, DoneCard } from '../components/math/StepKit.jsx';
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
 * The frame is StepKit's (as Fill the Zeros): the question on the left, with
 * a 1-2-3 strip on the first item in place of the pool's `intro` paragraph;
 * the steps on the right; the done card with the working to copy.
 *
 * An item pays 1, or ½ when a step had to be filled in (two wrong answers at
 * it, or "Show me"). Progress blob: { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#0087a8';
const INK_DARK = '#00697f';

const T = {
  en: {
    title: 'Line Up the Points', level: 'Level', solved: 'done',
    heads: { add: 'Add in columns', sub: 'Subtract in columns', story: 'A story problem', storyN: (n) => `Story · ${n} calculations` },
    question: 'Work it out in columns.',
    how: ['Line up the points', 'Fill the gaps with zeros', 'Work from the right'],
    calcOf: (i, n) => `Calculation ${i} of ${n}`,
    calcN: (i) => `Calculation ${i}`,
    find: (say) => `Find ${say}`,
    clean: 'Every step right first time.', slipped: 'Done — one wrong turn, and you found it yourself.', helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer', next: 'Next question', finish: 'Finish',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Aligne les points', level: 'Niveau', solved: 'faites',
    heads: { add: 'Addition en colonnes', sub: 'Soustraction en colonnes', story: 'Un problème', storyN: (n) => `Problème · ${n} calculs` },
    question: 'Calcule en colonnes.',
    how: ['Aligne les points', 'Complète avec des zéros', 'Calcule depuis la droite'],
    calcOf: (i, n) => `Calcul ${i} sur ${n}`,
    calcN: (i) => `Calcul ${i}`,
    find: (say) => `Trouve ${say}`,
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

/**
 * A story's last sentence, when it is the question, to set large on its own:
 * "… He pays with a 50-dollar note." + "How much change does he get?".
 * Anything else stays one paragraph.
 */
function splitStory(text) {
  const s = String(text || '').trim();
  if (!s.endsWith('?')) return { context: s, question: null };
  let cut = -1;
  for (const x of s.matchAll(/[.!]\s+/g)) cut = x.index + x[0].length;
  if (cut < 12 || s.length - cut < 8) return { context: s, question: null };
  return { context: s.slice(0, cut).trim(), question: s.slice(cut).trim() };
}

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
  const [lastMsg, setLastMsg] = useState(null);     // the last step's message, kept on the done card when it was filled in
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
  const stepDone = ({ helped: h, slipped: sl, msg }) => {
    const nowHelped = helped || h;
    setHelped(nowHelped);
    setSlipped(slipped || sl);
    if (stepIdx + 1 < im.steps.length) { setStepIdx(stepIdx + 1); return; }
    const next = { ...results, [item.id]: { score: nowHelped ? 0.5 : 1 } };
    setResults(next);
    setLastMsg(msg || null);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const goNext = () => {
    setPos((p) => p + 1);
    setStepIdx(0); setHelped(false); setSlipped(false); setItemDone(false); setLastMsg(null);
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
  const story = item.context ? splitStory(pick(item.context, item.contextFr)) : null;
  const m = im.steps[stepIdx];
  const unit = item.unit ? ` ${pick(item.unit, item.unitFr)}` : '';
  const stepSay = (k) => (im.steps[k].say ? pick(im.steps[k].say, im.steps[k].sayFr) : null);
  const head = story
    ? (im.multi ? t.heads.storyN(im.steps.length) : t.heads.story)
    : (m.op === '+' ? t.heads.add : t.heads.sub);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <QuestionCard ink={INK} icon={Columns3} head={head}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${items.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName}
            context={story?.context} question={story ? story.question : t.question}
            big={story ? null : <span className="font-mono">{calcText(m)}</span>}
            how={pos === 0 ? t.how : null}>
            {im.multi && (
              <ol className="flex flex-col gap-1.5">
                {im.steps.map((s, k) => {
                  const done = k < stepIdx || itemDone;
                  const now = k === stepIdx && !itemDone;
                  return (
                    <li key={k} className={`flex items-center gap-2 text-sm font-bold ${now ? 'text-slate-800 dark:text-slate-100' : done ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
                      <span className={`inline-grid place-items-center w-5 h-5 rounded-full text-[11px] font-black shrink-0 ${done ? 'bg-[#effbe5] text-[#3e7500] dark:bg-lime-900/40 dark:text-lime-200' : now ? 'text-white' : 'bg-slate-100 dark:bg-slate-700'}`}
                        style={now ? { backgroundColor: INK } : undefined}>
                        {done ? <Check className="w-3 h-3" strokeWidth={4} /> : k + 1}
                      </span>
                      {done ? <span className="font-mono font-black">{resultLine(s)}</span> : <span>{stepSay(k) ? t.find(stepSay(k)) : t.calcN(k + 1)}</span>}
                    </li>
                  );
                })}
              </ol>
            )}
          </QuestionCard>
        </div>

        {/* right: the column sum */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              {im.multi && <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-[#00697f] dark:text-cyan-300">{t.calcOf(stepIdx + 1, im.steps.length)}</div>}
              <DecColumnWork key={`${item.id}-${stepIdx}`} m={m} lang={lang} uid={`dc-${item.id}-${stepIdx}`} ink={INK}
                choose={!!item.context} seed={`${item.id}-${stepIdx}`} onFinish={stepDone} />
            </div>
          )}

          {itemDone && (
            <DoneCard ink={INK} inkDark={INK_DARK} helped={helped} slipped={slipped}
              words={{ clean: t.clean, slipped: t.slipped, helped: t.helped, bookCopy: t.bookCopy, next: t.next, finish: t.finish }}
              shown={lastMsg?.tone === 'shown' ? pick(lastMsg.en, lastMsg.fr) : null}
              isLast={isLast} onNext={isLast ? finish : goNext}>
              <div className={`grid gap-3 ${im.multi ? 'sm:grid-cols-2' : ''}`}>
                {im.steps.map((s, k) => (
                  <div key={k} className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2 sm:p-3 min-w-0">
                    {im.multi && <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{t.calcN(k + 1)}</div>}
                    <DecColumnWork m={s} lang={lang} uid={`dc-done-${item.id}-${k}`} ink={INK} finished compact={im.multi} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-xl border-2 p-3 min-w-0" style={{ borderColor: INK, backgroundColor: 'rgba(0,135,168,0.07)' }}>
                <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                <div className="font-mono font-black text-lg sm:text-2xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                  {resultLine(im.steps[im.steps.length - 1])}{unit}
                </div>
              </div>
            </DoneCard>
          )}
        </div>
      </div>
    </div>
  );
}
