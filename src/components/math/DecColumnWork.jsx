import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Lightbulb, MoveHorizontal, PencilLine, Columns3, ListChecks } from 'lucide-react';
import DecColumnBoard from './DecColumnBoard.jsx';
import { focusBox } from './shortDivBoardHelpers';
import { tr, pickTable } from '../../utils/lang';
import {
  diagnoseLineUp, diagnoseFill, diagnoseAdd, diagnoseSub, tapExchange, autoExchange, startTops, solvedState,
  chooseOptions, diagnoseChoose, placeWord,
} from '../../utils/decColumn';

/* ------------------------------------------------------------------ *
 * One calculation of Line Up the Points, worked stage by stage
 * (utils/decColumn.js derives every step):
 *
 *   CHOOSE   (a story) which calculation answers the question
 *   LINE UP  slide the bottom number until the points are in one column
 *   FILL     tap the empty places after the point to write zeros (and a
 *            whole number's point)
 *   COLUMNS  right to left: each digit, each carry (+) or exchange (−); the
 *            point drops straight down on the way past
 *
 * A wrong answer gets the name of its slip and one more try; a second wrong
 * answer at the same step (or "Show me") fills the step in, and the
 * calculation counts as helped. `onFinish({ helped, slipped })` once.
 * Mounted by the task (src/tasks/DecColumn.jsx) and by the `deccol` deck
 * activity; remount it (a new `key`) for a new calculation.
 * ------------------------------------------------------------------ */

const T = {
  en: {
    stages: { choose: 'Choose', line: 'Line up', fill: 'Zeros', cols: 'Columns' },
    choose: 'Which calculation answers the question?',
    line: 'A hurried student lines the numbers up on the RIGHT. Slide the bottom number until the two points are in one column.',
    fill: 'Fill the gaps: tap each empty place after the point to write a 0. A whole number needs its point too.',
    colsAdd: 'Work from the right, like whole numbers. Each carry goes in the small box under the next column.',
    colsSub: 'Work from the right, like whole numbers. Top digit too small? Tap a top digit on its left to exchange.',
    lead: 'A 0 in front of the answer can stay blank.',
    point: 'The point column: the point drops straight down. Tap it into the answer.',
    check: 'Check', stuck: 'Show me', left: 'Move left', right: 'Move right',
    filled: 'It is filled in for you.', shown: 'Here it is. Read it, then carry on.',
    auto: 'Right — and the exchange you did in your head is written in.',
    labels: { digit: 'answer digit', carry: 'carry', point: 'drop the point', gap: 'write in', top: 'exchange from' },
  },
  fr: {
    stages: { choose: 'Choisir', line: 'Aligner', fill: 'Zéros', cols: 'Colonnes' },
    choose: 'Quel calcul répond à la question ?',
    line: 'Un élève pressé aligne les nombres à DROITE. Fais glisser le nombre du bas jusqu’à ce que les deux points soient dans une même colonne.',
    fill: 'Complète les vides : touche chaque place vide après le point pour écrire un 0. Un nombre entier a aussi besoin de son point.',
    colsAdd: 'Calcule à partir de la droite, comme pour les entiers. Chaque retenue va dans la petite case sous la colonne suivante.',
    colsSub: 'Calcule à partir de la droite, comme pour les entiers. Chiffre du haut trop petit ? Touche un chiffre du haut à sa gauche pour faire un échange.',
    lead: 'Un 0 devant la réponse peut rester vide.',
    point: 'La colonne du point : le point descend tout droit. Touche-le pour le placer dans la réponse.',
    check: 'Vérifier', stuck: 'Montre-moi', left: 'À gauche', right: 'À droite',
    filled: 'C’est rempli pour toi.', shown: 'Le voici. Lis-le, puis continue.',
    auto: 'Juste — et l’échange que tu as fait de tête est écrit.',
    labels: { digit: 'chiffre de la réponse', carry: 'retenue', point: 'descendre le point', gap: 'écrire', top: 'échanger depuis' },
  },
};
const ICON = { choose: ListChecks, line: MoveHorizontal, fill: PencilLine, cols: Columns3 };
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const join = (a, b) => ({ en: `${a.en} ${b.en}`, fr: `${a.fr ?? a.en} ${b.fr ?? b.en}` });
const both = (key) => ({ en: T.en[key], fr: T.fr[key] });

function Message({ msg, lang }) {
  if (!msg) return null;
  const text = tr(lang, msg.en, msg.vn, msg.fr);
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed ${tone}`}>
      {msg.tone === 'ok' ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : soft ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{text}</span>
    </div>
  );
}

export default function DecColumnWork({
  m, lang = 'en', uid = 'dc', compact = false, ink = '#0087a8', choose = false, seed = '', onFinish, finished = false,
}) {
  const t = pickTable(T, lang);
  const stages = useMemo(() => [choose && 'choose', m.needsLineUp && 'line', m.needsFill && 'fill', 'cols'].filter(Boolean), [m, choose]);
  const solved = useMemo(() => solvedState(m), [m]);
  const options = useMemo(() => (choose ? chooseOptions(m, seed) : []), [m, choose, seed]);

  const [stage, setStage] = useState(finished ? 'done' : stages[0]);
  const [refused, setRefused] = useState([]);           // choose: options already tried
  const [shift, setShift] = useState(m.startShift);
  const [filled, setFilled] = useState(() => (finished ? solved.filled : new Set()));
  const [tops, setTops] = useState(() => (finished ? solved.tops : startTops(m)));
  const [entries, setEntries] = useState(() => (finished ? solved.entries : {}));
  const [marks, setMarks] = useState({});
  const [w, setW] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);

  const step = stage === 'cols' ? m.walk[w] : null;
  const col = step?.kind === 'digit' ? m.colAt(step.p) : null;
  const digitId = col ? `d${col.cell}` : null;
  const carryId = col && m.op === '+' && col.p < m.hi ? `c${m.cellOf(col.p + 1)}` : null;

  /* ---------------------------------------------------------- moving on */
  const finish = (h, sl) => { setStage('done'); setW(m.walk.length); onFinish?.({ helped: h, slipped: sl }); };
  const nextStage = (h = helped, sl = slipped) => {
    const i = stages.indexOf(stage);
    setWrongs(0);
    if (i + 1 < stages.length) {
      const nx = stages[i + 1];
      setStage(nx);
      if (nx === 'cols') focusBox(uid, `d${m.walk[0].cell}`);
    } else finish(h, sl);
  };
  const advance = (h = helped, sl = slipped) => {
    setWrongs(0);
    if (w + 1 >= m.walk.length) { finish(h, sl); return; }
    const nx = m.walk[w + 1];
    setW(w + 1);
    focusBox(uid, nx.kind === 'point' ? 'pt' : `d${nx.cell}`);
  };
  /** A slip: one more try, then the step is filled in. */
  const slip = (d, reveal) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      setHelped(true);
      setMsg({ tone: 'shown', ...join(d, both('filled')) });
      reveal(true, true);
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', ...d });
  };

  /* ---------------------------------------------------------- reveals */
  const revealChoose = (h = true, sl = true) => nextStage(h, sl);
  const revealLine = (h = true, sl = slipped) => { setShift(0); nextStage(h, sl); };
  const revealFill = (h = true, sl = slipped) => { setFilled(new Set(solved.filled)); nextStage(h, sl); };
  const revealCol = (h = true, sl = slipped) => {
    if (step.kind === 'point') { setEntries((e) => ({ ...e, pt: '.' })); setMarks((k) => ({ ...k, pt: 'shown' })); advance(h, sl); return; }
    if (m.op === '−') setTops((cur) => autoExchange(m, cur, col.p));
    setEntries((e) => ({ ...e, [digitId]: solved.entries[digitId], ...(carryId ? { [carryId]: solved.entries[carryId] ?? '' } : {}) }));
    setMarks((k) => ({ ...k, [digitId]: 'shown', ...(carryId ? { [carryId]: 'shown' } : {}) }));
    advance(h, sl);
  };
  const showMe = () => {
    setHelped(true);
    setMsg({ tone: 'shown', ...both('shown') });
    if (stage === 'choose') revealChoose(true, slipped);
    else if (stage === 'line') revealLine(true);
    else if (stage === 'fill') revealFill(true);
    else if (stage === 'cols') revealCol(true);
  };

  /* ---------------------------------------------------------- checks */
  const pickOption = (val) => {
    if (refused.includes(val)) return;
    const d = diagnoseChoose(m, val);
    if (d.ok) { setMsg(null); nextStage(); return; }
    setRefused((r) => [...r, val]);
    slip(d, revealChoose);
  };
  const checkLine = () => {
    const d = diagnoseLineUp(m, shift);
    if (d.ok) { setMsg(null); nextStage(); return; }
    slip(d, revealLine);
  };
  const checkFill = () => {
    const d = diagnoseFill(m, filled);
    if (d.ok) {
      if (d.extra) {
        setFilled((f) => new Set([...f].filter((k) => !d.extra.includes(k))));
        setMsg({ tone: 'info', en: d.en, fr: d.fr });
      } else setMsg(null);
      nextStage();
      return;
    }
    slip(d, revealFill);
  };
  const checkCol = () => {
    if (!col) return;
    const d = m.op === '+'
      ? diagnoseAdd(m, col.p, entries[digitId], carryId ? (entries[carryId] ?? '') : undefined)
      : diagnoseSub(m, col.p, entries[digitId], tops);
    if (d.ok) {
      if (d.auto) { setTops((cur) => autoExchange(m, cur, col.p)); setMsg({ tone: 'info', ...both('auto') }); } else setMsg(null);
      setMarks((k) => ({ ...k, [digitId]: 'good', ...(carryId ? { [carryId]: 'good' } : {}) }));
      advance();
      return;
    }
    if (d.soft) {
      setMsg({ tone: 'info', en: d.en, fr: d.fr });
      if (d.code === 'carryMissing') { setMarks((k) => ({ ...k, [digitId]: 'good' })); focusBox(uid, carryId); }
      return;
    }
    setMarks((k) => (d.code === 'carryWrong' ? { ...k, [digitId]: 'good', [carryId]: 'bad' } : { ...k, [digitId]: 'bad' }));
    slip(d, revealCol);
    focusBox(uid, d.code === 'carryWrong' ? carryId : digitId);
  };
  const check = () => (stage === 'line' ? checkLine() : stage === 'fill' ? checkFill() : checkCol());

  /* ---------------------------------------------------------- the board's events */
  const tapGap = (row, cell) => {
    const key = `${row}:${cell}`;
    setFilled((f) => { const n = new Set(f); if (n.has(key)) n.delete(key); else n.add(key); return n; });
    if (msg?.tone === 'bad') setMsg(null);
  };
  const tapTop = (p) => {
    if (!col) return;
    const r = tapExchange(m, tops, col.p, p);
    if (r.ok) { setTops(r.cur); if (msg?.tone !== 'shown') setMsg(null); } else if (r.en) setMsg({ tone: 'info', en: r.en, fr: r.fr });
  };
  const edit = (id, text) => {
    setEntries((e) => ({ ...e, [id]: text }));
    if (marks[id] === 'bad') setMarks((k) => ({ ...k, [id]: undefined }));
    if (msg?.tone === 'bad') setMsg(null);
  };
  const dropPoint = () => {
    setEntries((e) => ({ ...e, pt: '.' }));
    setMarks((k) => ({ ...k, pt: 'good' }));
    setMsg(null);
    advance();
  };
  const stateOf = (id) => {
    if (stage === 'done') return marks[id] === 'shown' ? 'shown' : 'good';
    if (marks[id] === 'good' || marks[id] === 'shown') return marks[id];
    if (stage !== 'cols' || !step) return 'idle';
    if (step.kind === 'point') return id === 'pt' ? 'live' : 'idle';
    if (id === digitId || id === carryId) return marks[id] === 'bad' ? 'bad' : 'live';
    return 'idle';
  };

  /* ---------------------------------------------------------- render */
  const place = col ? placeWord(col.p) : null;
  const head = stage === 'choose' ? t.choose
    : stage === 'line' ? t.line
      : stage === 'fill' ? t.fill
        : step?.kind === 'point' ? t.point
          : col ? `${m.op === '+' ? t.colsAdd : t.colsSub}${col.lead ? ` ${t.lead}` : ''}` : '';
  const doneIdx = stage === 'done' ? stages.length : stages.indexOf(stage);
  const [minS, maxS] = m.shiftRange;

  return (
    <div className="min-w-0">
      {stages.length > 1 && stage !== 'done' && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {stages.map((s, i) => {
            const Icon = ICON[s];
            const done = i < doneIdx;
            const on = i === doneIdx;
            return (
              <div key={s} className={`flex items-center gap-1 px-2 py-1 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest
                ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
                  : on ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
                style={on ? { backgroundColor: ink } : undefined}>
                {done ? <CheckCircle2 className="w-3 h-3" strokeWidth={3} /> : <Icon className="w-3 h-3" strokeWidth={3} />}
                {t.stages[s]}
              </div>
            );
          })}
        </div>
      )}
      {stage !== 'done' && (
        <div className="mb-2">
          {col && <div className="font-black text-slate-800 dark:text-slate-100 text-base sm:text-lg capitalize">{tr(lang, place.en, null, place.fr)}</div>}
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-snug">{head}</p>
        </div>
      )}

      {stage === 'choose' ? (
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          {options.map((o) => {
            const no = refused.includes(o.val);
            return (
              <button key={o.val} type="button" onClick={() => pickOption(o.val)} disabled={no}
                className={`px-4 py-3 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl transition-all
                  ${no ? 'border-rose-300 bg-rose-50 dark:bg-rose-900/20 text-rose-400 line-through' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-sky-400 active:translate-y-[2px]'}`}>
                {o.text}
              </button>
            );
          })}
        </div>
      ) : (
        <DecColumnBoard m={m} stage={stage} shift={shift} filled={filled} tops={tops} entries={entries} stateOf={stateOf}
          active={step ? step.cell : null} onTapGap={tapGap} onTapTop={tapTop} onEdit={edit} onEnter={check}
          onDropPoint={dropPoint} compact={compact} uid={uid} ink={ink} labels={t.labels} />
      )}

      {stage === 'line' && (
        <div className="mt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => { setShift((v) => Math.max(minS, v - 1)); if (msg?.tone === 'bad') setMsg(null); }} disabled={shift <= minS}
            aria-label={t.left} className={`w-14 h-11 text-white flex items-center justify-center ${btn}`} style={{ backgroundColor: ink, borderColor: '#00697f' }}>
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          </button>
          <button type="button" onClick={() => { setShift((v) => Math.min(maxS, v + 1)); if (msg?.tone === 'bad') setMsg(null); }} disabled={shift >= maxS}
            aria-label={t.right} className={`w-14 h-11 text-white flex items-center justify-center ${btn}`} style={{ backgroundColor: ink, borderColor: '#00697f' }}>
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      )}

      <Message msg={msg} lang={lang} />

      {stage !== 'done' && (
        <div className="mt-3 flex items-center justify-end gap-2">
          <button type="button" onClick={showMe}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
            <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
          </button>
          {stage !== 'choose' && step?.kind !== 'point' && (
            <button type="button" onClick={check} className={`px-5 py-2.5 text-white text-xs ${btn}`} style={{ backgroundColor: '#58cc02', borderColor: '#3e7500' }}>{t.check}</button>
          )}
        </div>
      )}
    </div>
  );
}
