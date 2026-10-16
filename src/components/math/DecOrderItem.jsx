import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, ListOrdered, Hash, Target, Scale, PaintBucket } from 'lucide-react';
import DecOrderBoard from './DecOrderBoard.jsx';
import { SafeInlineMath } from '../notes/SafeMath.jsx';
import { pickTable, tr } from '../../utils/lang';
import {
  zerosFor, allZeros, stagesOf, diagnoseOrder, diagnosePosition, diagnoseCompare, diagnoseDigits,
  questionOf, positionQuestion, positionPhrase, SIGN_WORDS, BLANK,
} from '../../utils/decOrder';

/* ------------------------------------------------------------------ *
 * One Fill the Zeros item, worked stage by stage (utils/decOrder.js):
 *
 *   FILL      tap the gaps until every number has as many decimal places as
 *             the longest (the zeros are orange). Not marked — a nudge only.
 *   ORDER     tap the numbers in order; tap one again to take it back.
 *   COMPARE   choose <, = or > for the box.
 *   DIGIT     tap every digit that can go in the box.
 *   POSITION  (an order item with `position`) which one is the third …?
 *
 * Used by the task (tries: a wrong answer is named and can be tried again;
 * a second one, or Show me, fills the stage in) and by the `decorder` deck
 * activity (oneShot: the first wrong answer ends the item). `onDone` gets
 * `{ correct, helped, slipped, msg }` once, when the last stage is finished.
 * The parent mounts one per item (key it by the item id).
 * ------------------------------------------------------------------ */

const INK = '#1a5fa8';
const GREEN = '#58cc02';

const T = {
  en: {
    stages: { fill: 'Fill', order: 'Order', compare: 'Compare', digit: 'Digits', position: 'Position' },
    fillTitle: (dp) => `Fill with zeros: give every number ${dp} decimal place${dp === 1 ? '' : 's'}.`,
    fillSub: 'Tap the empty boxes. The orange zeros change nothing — they only line the numbers up.',
    orderSub: 'Tap the numbers in order. Tap one again to take it back.',
    positionSub: 'Tap one of them.',
    compareTitle: 'Which sign goes in the box?',
    compareSub: 'Read it from the left: the first number … the second number.',
    digitTitle: 'Try each digit in the box. Which ones keep the sign true?',
    digitSub: 'Tap a digit to choose it. Tap it again to take it back.',
    check: 'Check', done: 'Done', stuck: 'Show me',
    fill: 'fill with a zero', remove: 'take this zero away',
  },
  fr: {
    stages: { fill: 'Zéros', order: 'Ordre', compare: 'Comparer', digit: 'Chiffres', position: 'Rang' },
    fillTitle: (dp) => `Complète avec des zéros : donne ${dp} décimale${dp === 1 ? '' : 's'} à chaque nombre.`,
    fillSub: 'Touche les cases vides. Les zéros orange ne changent rien — ils alignent seulement les nombres.',
    orderSub: 'Touche les nombres dans l’ordre. Touche-le encore pour le reprendre.',
    positionSub: 'Touche l’un d’eux.',
    compareTitle: 'Quel signe va dans la case ?',
    compareSub: 'Lis de gauche à droite : le premier nombre … le deuxième nombre.',
    digitTitle: 'Essaie chaque chiffre dans la case. Lesquels gardent le signe vrai ?',
    digitSub: 'Touche un chiffre pour le choisir. Touche-le encore pour le reprendre.',
    check: 'Vérifier', done: 'Fini', stuck: 'Montre-moi',
    fill: 'compléter avec un zéro', remove: 'enlever ce zéro',
  },
};

const M = {
  fillNudge: (dp) => ({
    en: `Fill every gap with a zero — every number needs ${dp} decimal place${dp === 1 ? '' : 's'}.`,
    fr: `Complète chaque case vide avec un zéro — chaque nombre doit avoir ${dp} décimale${dp === 1 ? '' : 's'}.`,
  }),
  fillDone: (dp) => ({
    en: `Every number has ${dp} decimal place${dp === 1 ? '' : 's'} now. Look at the whole-number part first, then compare from the left.`,
    fr: `Chaque nombre a maintenant ${dp} décimale${dp === 1 ? '' : 's'}. Regarde d’abord la partie entière, puis compare de gauche à droite.`,
  }),
  orderRight: { en: 'Right — that is the order.', fr: 'Juste — c’est le bon ordre.' },
  shownOrder: { en: 'Here is the right order.', fr: 'Voici le bon ordre.' },
  signRight: (s) => ({ en: `Right — the first number ${SIGN_WORDS[s].en} the second.`, fr: `Juste — le premier nombre ${SIGN_WORDS[s].fr} le deuxième.` }),
  shownSign: { en: 'Here is the right sign.', fr: 'Voici le bon signe.' },
  digitsRight: { en: 'Right — those are all the digits that work.', fr: 'Juste — ce sont tous les chiffres qui marchent.' },
  shownDigits: { en: 'Here are the digits that work.', fr: 'Voici les chiffres qui marchent.' },
  positionRight: (ph) => ({ en: `Right — that is ${ph.en}.`, fr: `Juste — c’est ${ph.fr}.` }),
  shownPosition: { en: 'Here it is.', fr: 'Le voici.' },
};
const join = (a, b) => ({ en: `${a.en} ${b.en}`, fr: `${a.fr} ${b.fr}` });

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function Message({ msg, lang }) {
  if (!msg) return null;
  const text = tr(lang, msg.en, msg.en, msg.fr);
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.tone === 'ok' ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : soft ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{text}</span>
    </div>
  );
}
export { Message as DecMessage };

const STAGE_ICON = { fill: PaintBucket, order: ListOrdered, compare: Scale, digit: Hash, position: Target };

export default function DecOrderItem({ model: m, lang = 'en', oneShot = false, compact = false, ink = INK, onDone }) {
  const t = pickTable(T, lang);
  const stages = useMemo(() => stagesOf(m), [m]);
  const [si, setSi] = useState(0);
  const [added, setAdded] = useState({});
  const [placed, setPlaced] = useState([]);
  const [pick, setPick] = useState(null);
  const [sign, setSign] = useState(null);
  const [badSigns, setBadSigns] = useState([]);
  const [digits, setDigits] = useState([]);
  const [marks, setMarks] = useState({});
  const [wrongs, setWrongs] = useState(0);
  const [slipped, setSlipped] = useState(false);
  const [helped, setHelped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [finished, setFinished] = useState(false);
  const stage = stages[si];

  const finish = (wasHelped, wasSlipped, last) => {
    setFinished(true);
    onDone?.({ correct: !wasHelped && !wasSlipped, helped: wasHelped, slipped: wasSlipped, msg: last });
  };
  const advance = (wasHelped, wasSlipped, last) => {
    setWrongs(0);
    if (si + 1 < stages.length) { setSi(si + 1); setMarks({}); return; }
    finish(wasHelped, wasSlipped, last);
  };
  /**
   * A wrong answer, named. The task gives one more try (returns true); a second
   * wrong answer — or any wrong answer in the deck activity — fills the stage
   * in with `show` and moves on (returns false).
   */
  const wrong = (d, shownNote, show) => {
    setSlipped(true);
    if (oneShot) {
      show();
      const s = { tone: 'bad', en: d.en, fr: d.fr };
      setMsg(s);
      finish(helped, true, s);
      return false;
    }
    if (wrongs + 1 >= 2) {
      show();
      setHelped(true);
      const s = { tone: 'shown', ...join(d, shownNote) };
      setMsg(s);
      advance(true, true, s);
      return false;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
    return true;
  };

  /* ------------------------------------------------ fill */
  const fillDone = m.rows.every((r) => (added[r.i] || 0) >= zerosFor(r, m.maxDp));
  const onFill = (i, k) => { setAdded((a) => ({ ...a, [i]: k })); if (msg?.tone === 'info') setMsg(null); };
  const checkFill = () => {
    if (!fillDone) { setMsg({ tone: 'info', ...M.fillNudge(m.maxDp) }); return; }
    setMsg({ tone: 'ok', ...M.fillDone(m.maxDp) });
    advance(helped, slipped, null);
  };

  /* ------------------------------------------------ order / position */
  const tapRow = (i) => {
    if (stage === 'order') {
      setPlaced((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
      setMarks({});
      if (msg && msg.tone !== 'ok') setMsg(null);
    } else if (stage === 'position') {
      setPick(i);
      setMarks({});
      if (msg && msg.tone !== 'ok') setMsg(null);
    }
  };
  const checkOrder = () => {
    const d = diagnoseOrder(m, placed);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) {
      setMarks(Object.fromEntries(placed.map((i) => [i, 'good'])));
      setMsg({ tone: 'ok', ...M.orderRight });
      advance(helped, slipped, null);
      return;
    }
    const again = wrong(d, M.shownOrder, () => {
      setPlaced(m.order);
      setMarks(Object.fromEntries(m.order.map((i) => [i, 'shown'])));
    });
    if (again) {
      // keep the part that is right, so only the rest is tapped again
      const keep = placed.slice(0, d.wrongAt);
      setPlaced(keep);
      setMarks(Object.fromEntries(keep.map((i) => [i, 'good'])));
    }
  };
  const checkPosition = () => {
    const d = diagnosePosition(m, pick);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) {
      setMarks({ [pick]: 'good' });
      setMsg({ tone: 'ok', ...M.positionRight(positionPhrase(m)) });
      advance(helped, slipped, null);
      return;
    }
    const again = wrong(d, M.shownPosition, () => {
      setPick(m.positionAnswer);
      setMarks({ [pick]: 'bad', [m.positionAnswer]: 'shown' });
    });
    if (again) setMarks({ [pick]: 'bad' });
  };

  /* ------------------------------------------------ compare */
  const chooseSign = (s) => {
    if (sign || badSigns.includes(s) || finished) return;
    const d = diagnoseCompare(m, s);
    if (d.ok) { setSign(s); setMsg({ tone: 'ok', ...M.signRight(s) }); advance(helped, slipped, null); return; }
    setBadSigns((b) => [...b, s]);
    wrong(d, M.shownSign, () => setSign(m.answer));
  };

  /* ------------------------------------------------ digits */
  const toggleDigit = (n) => {
    if (finished) return;
    setDigits((ds) => (ds.includes(n) ? ds.filter((x) => x !== n) : [...ds, n]));
    setMarks({});
    if (msg && msg.tone !== 'ok') setMsg(null);
  };
  const checkDigits = () => {
    const d = diagnoseDigits(m, digits);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) {
      setMarks(Object.fromEntries(m.works.map((n) => [n, 'good'])));
      setMsg({ tone: 'ok', ...M.digitsRight });
      advance(helped, slipped, null);
      return;
    }
    const again = wrong(d, M.shownDigits, () => {
      setDigits(m.works);
      setMarks(Object.fromEntries([...digits.filter((n) => !m.works.includes(n)).map((n) => [n, 'bad']), ...m.works.map((n) => [n, 'shown'])]));
    });
    if (again) setMarks({ [d.digit]: d.slip === 'missing' ? 'shown' : 'bad' });
  };

  /* ------------------------------------------------ show me */
  const showMe = () => {
    if (stage === 'fill') { setAdded(allZeros(m)); setMsg(null); return; }
    const shown = { tone: 'shown', ...(stage === 'order' ? M.shownOrder : stage === 'compare' ? M.shownSign : stage === 'digit' ? M.shownDigits : M.shownPosition) };
    if (stage === 'order') { setPlaced(m.order); setMarks(Object.fromEntries(m.order.map((i) => [i, 'shown']))); }
    if (stage === 'position') { setPick(m.positionAnswer); setMarks({ [m.positionAnswer]: 'shown' }); }
    if (stage === 'compare') setSign(m.answer);
    if (stage === 'digit') { setDigits(m.works); setMarks(Object.fromEntries(m.works.map((n) => [n, 'shown']))); }
    setHelped(true);
    setMsg(shown);
    advance(true, slipped, shown);
  };

  /* ------------------------------------------------ render */
  if (finished) return null;
  const L = (o) => tr(lang, o.en, o.en, o.fr);
  const head = stage === 'fill' ? { text: t.fillTitle(m.maxDp), sub: t.fillSub }
    : stage === 'order' ? { text: L(questionOf(m)), sub: t.orderSub }
      : stage === 'position' ? { text: L(positionQuestion(m)), sub: t.positionSub }
        : stage === 'compare' ? { text: t.compareTitle, sub: t.compareSub }
          : { text: t.digitTitle, sub: t.digitSub };
  const zerosNow = stage === 'fill' ? added : (m.fill ? allZeros(m) : {});
  const boardMode = stage === 'fill' ? 'fill' : stage === 'order' ? 'order' : stage === 'position' ? 'pick' : 'view';
  const toneCls = (st) => (st === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : st === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
      : st === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200' : '');

  return (
    <div className="min-w-0">
      {stages.length > 1 && (
        <div className={`flex flex-wrap gap-1.5 ${compact ? 'mb-2' : 'mb-3'}`}>
          {stages.map((s, k) => {
            const Icon = STAGE_ICON[s];
            const done = k < si;
            const active = k === si;
            return (
              <div key={s} className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest
                ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
                  : active ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
                style={active ? { backgroundColor: ink } : undefined}>
                {done ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
                <span>{t.stages[s]}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className={compact ? 'mb-2' : 'mb-3'}>
        <div className={`font-black text-slate-800 dark:text-slate-100 ${compact ? 'text-base' : 'text-lg'}`}>{head.text}</div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{head.sub}</p>
      </div>

      {m.kind !== 'digit' && (
        <DecOrderBoard model={m} added={zerosNow} mode={boardMode} onFill={onFill} onTap={tapRow}
          placed={stage === 'order' ? placed : []} picked={pick} toneOf={(i) => marks[i] || null}
          rowOrder={stage === 'position' ? m.order : null} ink={ink} compact={compact}
          aria={{ fill: t.fill, remove: t.remove }} />
      )}

      {stage === 'compare' && (
        <div className="mt-4">
          <div className="flex items-center justify-center gap-3 font-mono font-black text-3xl sm:text-4xl text-slate-900 dark:text-slate-100">
            <span>{m.a.text}</span>
            <span className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-dashed flex items-center justify-center ${sign ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200 border-solid' : 'border-slate-300 dark:border-slate-600'}`}>{sign || ''}</span>
            <span>{m.b.text}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 max-w-md mx-auto">
            {['<', '=', '>'].map((s) => {
              const bad = badSigns.includes(s);
              return (
                <button key={s} type="button" disabled={bad || !!sign} onClick={() => chooseSign(s)}
                  className={`px-2 py-2.5 rounded-xl border-2 border-b-[4px] flex flex-col items-center gap-0.5 transition-all active:border-b-2 active:translate-y-[2px] disabled:cursor-default
                    ${bad ? 'border-rose-300 bg-rose-50 dark:bg-rose-900/20 text-rose-400 line-through'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-sky-400'}`}>
                  <span className="font-mono font-black text-3xl leading-none">{s}</span>
                  <span className="text-[10px] sm:text-[11px] font-bold leading-tight">{L(SIGN_WORDS[s])}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {stage === 'digit' && (
        <div>
          <div className="text-center text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 py-2">
            <SafeInlineMath math={`${m.aText} ${m.sign} ${m.bText}`.replace(BLANK, '\\square')} />
          </div>
          <div className="mt-3 grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-w-xl mx-auto">
            {Array.from({ length: 10 }, (_, n) => {
              const on = digits.includes(n);
              const st = marks[n];
              return (
                <button key={n} type="button" onClick={() => toggleDigit(n)} aria-pressed={on}
                  className={`h-12 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl transition-all active:border-b-2 active:translate-y-[2px]
                    ${st ? toneCls(st) : on ? 'text-white border-transparent' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'}`}
                  style={on && !st ? { backgroundColor: ink } : undefined}>
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Message msg={msg} lang={lang} />

      {(stage !== 'compare' || !oneShot) && (
        <div className="mt-4 flex items-center justify-end gap-2">
          {!oneShot && (
            <button type="button" onClick={showMe}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
            </button>
          )}
          {stage !== 'compare' && (
            <button type="button" onClick={stage === 'fill' ? checkFill : stage === 'order' ? checkOrder : stage === 'position' ? checkPosition : checkDigits}
              className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
              {stage === 'fill' ? t.done : t.check}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
