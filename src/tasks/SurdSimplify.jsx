import { useMemo, useState } from 'react';
import {
  SquareRadical, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  Scissors, PenLine, Search, Equal, Layers, X as Times, ListChecks,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import { SurdBox, NumberBox } from '../components/math/SurdInput.jsx';
import {
  deriveSurdItem, surdQuestionLatex, squareFactors, factorPairs, isSquareFree, simplifyTerm,
  sameTermValue, termLatex, sumLatex,
} from '../utils/surds';

/* ------------------------------------------------------------------ *
 * SURD BREAKER — simplify a square root the way the book does: find a
 * square that divides the number, take its root OUT, and ask whether what
 * is left can be broken down again.
 *
 * Reads a unit's `surds`:
 *   { title, intro, items: [
 *       { id, kind: 'simplify', n, k? },                 k√n in simplest form
 *       { id, kind: 'collect', terms: [[k, n], …] },     simplify each, then collect
 *       { id, kind: 'multiply', a: [k, n], b: [k, n], square? },  multiply, then simplify
 *   ] }
 * Everything else — the square factors, every root taken out, whether a
 * result is finished, like surds, the collected answer — is derived by
 * utils/surds.js.
 *
 * The stages:
 *   SPLIT     tap a square number that divides the number under the root.
 *             Any square factor is accepted, not only the largest: √72 split
 *             as √4 × √18 is right, it just needs a second round, and the
 *             student SEES that — the root tree grows another branch.
 *   WRITE     take the root of the square out and write one surd, a√b.
 *   FINISHED? is what is left under the root square-free? One tap. Saying
 *             "yes" to 2√18 is the "simplify fully" mark lost on the paper.
 *   MULTIPLY  (multiply items) outside numbers together, inside together.
 *   EACH      (collect items) simplify every term that is not simplest.
 *   LIKE?     are they like surds now — the same number under every root?
 *   COLLECT   add the numbers in front, exactly like collecting like terms.
 *
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item pays half. A yes/no gets one try.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const SQUARES = Array.from({ length: 19 }, (_, i) => (i + 2) ** 2); // 4 … 400

const T = {
  title: 'Surd Breaker',
  check: 'Check',
  stuck: 'Show me',
  cont: 'Continue',
  next: 'Next question',
  finish: 'Finish',
  solved: 'solved',
  clean: 'Every move right first time.',
  slipped: 'Solved — one wrong turn, and you found it yourself.',
  helped: 'Solved — with a move or two shown to you.',
  bookCopy: 'Copy this into your book',
  shown: 'Here it is. Read it, then continue.',
  stages: { split: 'Split', write: 'Write', finished: 'Finished?', multiply: 'Multiply', each: 'Simplify each', like: 'Like surds?', collect: 'Collect' },
};
const STAGE_ICON = { split: Scissors, write: PenLine, finished: Search, multiply: Times, each: Layers, like: Equal, collect: ListChecks };

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const intOf = (s) => (/^\s*-?\d+\s*$/.test(String(s ?? '')) ? Number(s) : null);
/** A typed [k]√[r]: an empty root box is √1, a whole number. */
const typedTerm = (coef, rad) => {
  const k = intOf(coef);
  const r = String(rad ?? '').trim() === '' ? 1 : intOf(rad);
  return k == null || r == null || r < 1 ? null : [k, r];
};

function Stage({ icon: Icon, label, active, done }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all
      ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
        : active ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
      style={active && !done ? { backgroundColor: INK } : undefined}>
      {done ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
      <span>{label}</span>
    </div>
  );
}

function Message({ msg }) {
  if (!msg?.text) return null;
  const tone = msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.shown || msg.info ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown || msg.info ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{msg.text}{msg.tex && <> <SafeInlineMath math={msg.tex} /></>}</span>
    </div>
  );
}

function Actions({ locked, onShow, onCheck, onContinue }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {!locked ? (
        <>
          {onShow && (
            <button onClick={onShow} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
            </button>
          )}
          {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>}
        </>
      ) : (
        <button onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

/**
 * The root tree: the student's own splits, drawn the way they draw a factor
 * tree in their book. Each split sends the square left — where it comes OUT of
 * the root as a whole number, in green — and the rest right, where the next
 * split grows from. The numbers that came out are multiplied at the bottom.
 */
function RootTree({ start, splits }) {
  const STEP_X = 78;
  const STEP_Y = 74;
  const x0 = 70;
  const y0 = 34;
  const w = x0 + STEP_X * splits.length + 90;
  const h = y0 + STEP_Y * splits.length + (splits.length ? 58 : 30);
  const outs = splits.map((s) => Math.round(Math.sqrt(s.square)));
  const nodes = [];
  let r = start[1];
  splits.forEach((s, i) => {
    const px = x0 + STEP_X * i;
    const py = y0 + STEP_Y * i;
    nodes.push(
      <g key={i}>
        {i > 0 && <text x={px} y={py + 6} textAnchor="middle" fontFamily="'Cambria Math', Georgia, serif" fontWeight="700" fontSize="19" fill="#1e293b">√{splits[i - 1].rest}</text>}
        <line x1={px} y1={py + 14} x2={px - 34} y2={py + STEP_Y - 20} stroke="#94a3b8" strokeWidth="2.5" />
        <line x1={px} y1={py + 14} x2={px + STEP_X} y2={py + STEP_Y - 20} stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx={px - 38} cy={py + STEP_Y} r="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
        <text x={px - 38} y={py + STEP_Y + 6} textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#166534">{outs[i]}</text>
        <text x={px - 38} y={py + STEP_Y + 38} textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="11" fill="#16a34a">√{s.square} out</text>
      </g>,
    );
    r = s.rest;
  });
  const lastX = x0 + STEP_X * splits.length;
  const lastY = y0 + STEP_Y * splits.length;
  const coefOut = (start[0] || 1) * outs.reduce((a, b) => a * b, 1);
  return (
    <svg viewBox={`0 0 ${Math.max(w, 220)} ${h}`} className="w-full h-auto max-h-[18rem]" role="img" aria-label="Root tree">
      <text x={x0} y={y0 + 6} textAnchor="middle" fontFamily="'Cambria Math', Georgia, serif" fontWeight="700" fontSize="22" fill="#1e293b">{start[0] > 1 ? `${start[0]}√${start[1]}` : `√${start[1]}`}</text>
      {nodes}
      {splits.length > 0 && (
        <>
          <rect x={lastX - 34} y={lastY - 20} width="68" height="36" rx="10" fill={isSquareFree(r) ? '#ede9fe' : '#fff7ed'} stroke={isSquareFree(r) ? INK : '#f59e0b'} strokeWidth="2.5" />
          <text x={lastX} y={lastY + 5} textAnchor="middle" fontFamily="'Cambria Math', Georgia, serif" fontWeight="700" fontSize="19" fill="#1e293b">{r === 1 ? '1' : `√${r}`}</text>
          <text x={x0 - 60} y={h - 10} fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#475569">
            {`outside: ${[...(start[0] > 1 ? [start[0]] : []), ...outs].join(' × ')} = ${coefOut}`}
          </text>
        </>
      )}
    </svg>
  );
}

export default function SurdSimplify({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && it?.kind), [pool]);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [stage, setStage] = useState(null);         // null → the item's first stage
  const [current, setCurrent] = useState(null);     // [k, r] being simplified
  const [splits, setSplits] = useState([]);         // [{ square, rest }]
  const [lines, setLines] = useState([]);           // KaTeX working, as the student worked it
  const [helped, setHelped] = useState(false);
  // A single wrong answer costs nothing but is not "right first time" either.
  const [slipped, setSlipped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wrongs, setWrongs] = useState(0);
  const [msg, setMsg] = useState(null);
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [picked, setPicked] = useState(null);
  const [pairs, setPairs] = useState(false);
  const [root, setRoot] = useState(null);           // the surd the root tree grows from

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return deriveSurdItem(item); } catch { return null; }
  }, [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const firstStage = model.kind === 'simplify' ? 'split' : model.kind === 'multiply' ? 'multiply' : 'each';
  const st = stage || firstStage;
  const cur = current || (model.kind === 'simplify' ? model.start : null);
  const qLatex = surdQuestionLatex(item);

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); };
  const goStage = (s) => { setStage(s); resetStage(); };

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const completeItem = (nowHelped = helped) => {
    const next = { ...results, [item.id]: { score: nowHelped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    resetStage();
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const judge = (ok, badText, reveal, goodText = 'Right.') => {
    if (locked) return;
    if (ok) { setLocked(true); setMsg({ ok: true, text: goodText }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= 2) { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text: `${badText} The answer is filled in for you.` }); }
    else setMsg({ ok: false, text: badText });
  };
  const showMe = (reveal) => { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text: T.shown }); };

  const goNext = () => {
    setPos((p) => p + 1); setStage(null); setCurrent(null); setSplits([]); setLines([]);
    setHelped(false); setSlipped(false); setItemDone(false); setPairs(false); setRoot(null); resetStage();
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- split */
  const r = cur ? cur[1] : 1;
  const options = SQUARES.filter((s) => s <= Math.max(r, 36));
  const largest = squareFactors(r).slice(-1)[0];
  const pickSquare = (s) => {
    if (locked) return;
    setPicked(s);
    if (r % s !== 0) {
      judge(false, `${r} ÷ ${s} is not a whole number, so ${s} is not a factor of ${r}.`, () => setPicked(largest));
      return;
    }
    setLocked(true);
    if (s === largest) setMsg({ ok: true, text: `${s} is the largest square factor of ${r}:`, tex: `\\sqrt{${r}} = \\sqrt{${s}} \\times \\sqrt{${r / s}}` });
    else setMsg({ info: true, text: `That works — ${r} = ${s} × ${r / s}. There is a bigger square factor too, so you may need another round.`, tex: `\\sqrt{${r}} = \\sqrt{${s}} \\times \\sqrt{${r / s}}` });
  };
  const confirmSplit = () => {
    const s = picked;
    setSplits((list) => [...list, { square: s, rest: r / s }]);
    const k = cur[0];
    setLines((ls) => [...ls, `${k > 1 ? `${k} \\times ` : ''}\\sqrt{${s}} \\times \\sqrt{${r / s}}`]);
    goStage('write');
  };

  /* ---------------------------------------------------------- write */
  const lastSplit = splits[splits.length - 1];
  const rootOut = lastSplit ? Math.round(Math.sqrt(lastSplit.square)) : 1;
  const wantWrite = lastSplit ? [cur[0] * rootOut, lastSplit.rest] : null;
  const checkWrite = () => {
    const t = typedTerm(typed.coef, typed.rad);
    if (!t) { setMsg({ ok: false, text: 'Type the number in front, and the number under the root.' }); return; }
    const ok = t[0] === wantWrite[0] && t[1] === wantWrite[1];
    let why = `√${lastSplit.square} = ${rootOut}, and that ${rootOut} comes out in front.`;
    if (t[0] === lastSplit.square * cur[0]) why = `√${lastSplit.square} is ${rootOut}, not ${lastSplit.square}. Take the square ROOT out.`;
    else if (cur[0] > 1 && t[0] === rootOut) why = `Don't lose the ${cur[0]} already in front: ${cur[0]} × ${rootOut} = ${cur[0] * rootOut}.`;
    else if (t[0] === wantWrite[0] && t[1] !== wantWrite[1]) why = `The number in front is right. What is left under the root is ${r} ÷ ${lastSplit.square}.`;
    setMarks({ w: ok ? 'good' : 'bad' });
    judge(ok, why, () => { setTyped({ coef: String(wantWrite[0]), rad: String(wantWrite[1]) }); setMarks({ w: 'shown' }); });
  };
  const confirmWrite = () => {
    setCurrent(wantWrite);
    setLines((ls) => [...ls, termLatex(wantWrite)]);
    goStage('finished');
  };

  /* ---------------------------------------------------------- finished? */
  const chooseFinished = (yes) => {
    if (locked) return;
    const done = isSquareFree(cur[1]);
    setPicked(yes);
    setLocked(true);
    if (yes === done) {
      setMsg({ ok: true, text: done ? `${cur[1] === 1 ? 'Nothing is left under the root' : `${cur[1]} has no square factor except 1`} — it is fully simplified.` : `${cur[1]} still has a square factor, ${squareFactors(cur[1]).slice(-1)[0]}. Break it down again.` });
    } else {
      setHelped(true);
      setMsg({ ok: false, text: done ? `It IS finished: ${cur[1]} has no square factor except 1.` : `Not yet — ${cur[1]} = ${squareFactors(cur[1]).slice(-1)[0]} × ${cur[1] / squareFactors(cur[1]).slice(-1)[0]}, and ${squareFactors(cur[1]).slice(-1)[0]} is a square. On the paper this loses the "simplify fully" mark.` });
    }
  };
  const afterFinished = () => {
    if (isSquareFree(cur[1])) completeItem();
    else goStage('split');
  };

  /* ---------------------------------------------------------- multiply */
  const checkMultiply = () => {
    const t = typedTerm(typed.coef, typed.rad);
    if (!t) { setMsg({ ok: false, text: 'Type the number in front, and the number under the root.' }); return; }
    const ok = sameTermValue(t, model.raw);
    let why = 'Multiply the numbers in front together, and the numbers under the roots together.';
    if (t[0] === model.raw[0] && t[1] === model.a[1] + model.b[1]) why = `Under the root you MULTIPLY: √${model.a[1]} × √${model.b[1]} = √${model.raw[1]}, not √${model.a[1] + model.b[1]}.`;
    else if (t[1] === model.raw[1] && t[0] !== model.raw[0]) why = `The root is right. In front: ${model.a[0]} × ${model.b[0]} = ${model.raw[0]}.`;
    setMarks({ m: ok ? 'good' : 'bad' });
    judge(ok, why, () => { setTyped({ coef: String(model.raw[0]), rad: String(model.raw[1]) }); setMarks({ m: 'shown' }); },
      t && sameTermValue(t, model.raw) && (t[0] !== model.raw[0]) ? 'Right — and you have already started simplifying.' : 'Right.');
  };
  const confirmMultiply = () => {
    const t = typedTerm(typed.coef, typed.rad) || model.raw;
    const start = sameTermValue(t, model.raw) ? t : model.raw;
    setCurrent(start);
    setRoot(start);
    setLines([`${qLatex} = ${termLatex(start)}`]);
    goStage('finished');
  };

  /* ---------------------------------------------------------- each (collect items) */
  const needs = model.kind === 'collect' ? item.terms.map((t) => !isSquareFree(t[1])) : [];
  const checkEach = () => {
    const live = item.terms.map((_, i) => i).filter((i) => needs[i] && marks[i] !== 'good' && marks[i] !== 'shown');
    const next = { ...marks };
    let bad = 0;
    let unfinished = null;
    for (const i of live) {
      const t = typedTerm(typed[`c${i}`], typed[`r${i}`]);
      if (!t) { setMsg({ ok: false, text: 'Fill in every box first.' }); return; }
      if (sameTermValue(t, item.terms[i]) && !isSquareFree(t[1])) { unfinished = i; next[i] = undefined; continue; }
      if (sameTermValue(t, item.terms[i])) next[i] = 'good';
      else { next[i] = 'bad'; bad += 1; }
    }
    setMarks(next);
    if (unfinished != null && !bad) { setMsg({ info: true, text: `${typed[`c${unfinished}`]}√${typed[`r${unfinished}`]} is equal, but not finished — break it down again.` }); return; }
    const reveal = () => {
      const t = { ...typed };
      const mk = { ...next };
      item.terms.forEach((term, i) => { if (needs[i] && mk[i] !== 'good') { const s = simplifyTerm(term); t[`c${i}`] = String(s[0]); t[`r${i}`] = String(s[1]); mk[i] = 'shown'; } });
      setTyped(t); setMarks(mk);
    };
    judge(bad === 0, 'A term is not equal to the one it came from. Find the largest square factor of the number under its root.', reveal, 'Every term is in its simplest form.');
  };
  const showEach = () => showMe(() => {
    const t = { ...typed };
    const mk = { ...marks };
    item.terms.forEach((term, i) => { if (needs[i]) { const s = simplifyTerm(term); t[`c${i}`] = String(s[0]); t[`r${i}`] = String(s[1]); mk[i] = mk[i] === 'good' ? 'good' : 'shown'; } });
    setTyped(t); setMarks(mk);
  });
  const confirmEach = () => {
    setLines([`${qLatex} = ${sumLatex(model.simplified)}`]);
    goStage('like');
  };

  /* ---------------------------------------------------------- like? */
  const chooseLike = (yes) => {
    if (locked) return;
    setPicked(yes);
    setLocked(true);
    const radicands = [...new Set(model.simplified.map(([, rr]) => rr))];
    if (yes === model.like) setMsg({ ok: true, text: model.like ? `Every term is a number of √${model.radicand} — like surds, so they collect.` : `The roots are √${radicands.join(' and √')} — different, so they do not collect.` });
    else { setHelped(true); setMsg({ ok: false, text: model.like ? `They are like surds: every term is a number of √${model.radicand}.` : `They are not like surds: √${radicands.join(' and √')} are different roots, just as 2x and 3y cannot be added.` }); }
  };
  const afterLike = () => {
    if (model.like) goStage('collect');
    else completeItem();
  };

  /* ---------------------------------------------------------- collect */
  const wantCollect = model.kind === 'collect' ? (model.answer[0]?.[0] ?? 0) : null;
  const checkCollect = () => {
    const k = intOf(typed.k);
    if (k == null) { setMsg({ ok: false, text: 'Type the number in front of the root (it can be 0 or negative).' }); return; }
    const ok = k === wantCollect;
    const sumAbs = model.simplified.reduce((a, [kk]) => a + Math.abs(kk), 0);
    const why = k === sumAbs && sumAbs !== wantCollect ? 'Watch the signs — a minus in front of a term takes that many AWAY.' : `Add the numbers in front: ${model.simplified.map(([kk]) => kk).join(' + ').replace(/\+ -/g, '− ')}.`;
    setMarks({ k: ok ? 'good' : 'bad' });
    judge(ok, why, () => { setTyped({ k: String(wantCollect) }); setMarks({ k: 'shown' }); });
  };
  const confirmCollect = () => {
    setLines((ls) => [...ls, model.answer.length ? termLatex(model.answer[0]) : '0']);
    completeItem();
  };

  /* ---------------------------------------------------------- render helpers */
  const stagesShown = model.kind === 'simplify' ? ['split', 'write', 'finished']
    : model.kind === 'multiply' ? ['multiply', 'finished', 'split', 'write']
      : model.like ? ['each', 'like', 'collect'] : ['each', 'like'];
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const answerLatex = model.kind === 'collect' ? sumLatex(model.answer) || '0' : termLatex(model.answer);
  const bookLines = model.kind === 'simplify'
    ? [`${qLatex}`, ...lines].map((l, i) => (i === 0 ? l : `= ${l}`))
    : model.kind === 'multiply'
      ? [lines[0], ...lines.slice(1).map((l) => `= ${l}`)]
      : lines.map((l, i) => (i === 0 ? l : `= ${l}`));

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 lg:items-start">
        {/* left: the question and the picture */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <SquareRadical className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">
                {model.kind === 'simplify' ? 'Simplify fully' : model.kind === 'multiply' ? 'Multiply and simplify' : 'Simplify, then collect'}
              </div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.solved}</div>
            </div>
            <div className="px-4 py-4 text-center text-3xl sm:text-4xl text-slate-900 dark:text-slate-100">
              <SafeBlockMath math={qLatex} />
            </div>
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-3 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stagesShown.map((s) => (
                  <Stage key={s} icon={STAGE_ICON[s]} label={T.stages[s]} active={s === st} done={false} />
                ))}
                {splits.length > 0 && <span className="self-center text-[11px] font-black uppercase tracking-widest text-slate-400">round {splits.length + (st === 'split' ? 1 : 0)}</span>}
              </div>
            )}
          </div>

          {(model.kind !== 'collect') && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm p-3">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Your root tree</div>
              {cur ? <RootTree start={model.kind === 'simplify' ? model.start : (root || model.raw)} splits={splits} />
                : <p className="text-sm font-semibold text-slate-400 py-6 text-center">Multiply first — the tree starts from the product.</p>}
            </div>
          )}

          {lines.length > 0 && !itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 overflow-x-auto">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Working so far</div>
              {bookLines.map((l, i) => <div key={i} className="text-lg py-0.5"><SafeInlineMath math={l} /></div>)}
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              {st === 'split' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    Find a square number that divides <span className="font-mono">{r}</span>.
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    The biggest one saves a round — but any square factor works.
                  </p>
                  <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                    {options.map((s) => {
                      const chosen = picked === s;
                      const divides = r % s === 0;
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500';
                      if (chosen && locked && divides) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                      else if (chosen && !divides) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600';
                      return (
                        <button key={s} disabled={locked} onClick={() => pickSquare(s)}
                          className={`rounded-xl border-2 border-b-[4px] py-2 font-mono font-black text-lg transition-all disabled:opacity-90 ${style}`}>
                          {s}
                          <div className="text-[10px] font-bold opacity-60 -mt-0.5">= {Math.round(Math.sqrt(s))}²</div>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setPairs((p) => !p)} className="mt-3 text-xs font-black uppercase tracking-widest text-violet-700 dark:text-violet-300 hover:underline">
                    {pairs ? 'Hide' : 'Show'} the factor pairs of {r}
                  </button>
                  {pairs && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {factorPairs(r).map(([a, b]) => (
                        <span key={a} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold text-slate-600 dark:text-slate-300">{a} × {b}</span>
                      ))}
                    </div>
                  )}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => { setPicked(largest); showMe(() => {}); setMsg({ shown: true, text: `The largest square factor of ${r} is ${largest}:`, tex: `\\sqrt{${r}} = \\sqrt{${largest}} \\times \\sqrt{${r / largest}}` }); }} onContinue={confirmSplit} />
                </>
              )}

              {st === 'write' && lastSplit && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3 text-lg">Take the root of the square out. Write it as one surd.</div>
                  <div className="text-2xl text-slate-900 dark:text-slate-100 mb-3">
                    <SafeInlineMath math={`${cur[0] > 1 ? `${cur[0]} \\times ` : ''}\\sqrt{${lastSplit.square}} \\times \\sqrt{${lastSplit.rest}} =`} />
                  </div>
                  <SurdBox coef={typed.coef} rad={typed.rad} state={marks.w} disabled={locked} onEnter={checkWrite}
                    onCoef={(v) => { setTyped((t) => ({ ...t, coef: v })); setMarks({}); }} onRad={(v) => { setTyped((t) => ({ ...t, rad: v })); setMarks({}); }} />
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ coef: String(wantWrite[0]), rad: String(wantWrite[1]) }); setMarks({ w: 'shown' }); })} onCheck={checkWrite} onContinue={confirmWrite} />
                </>
              )}

              {st === 'finished' && cur && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3 text-lg">
                    Is <SafeInlineMath math={termLatex(cur)} /> fully simplified?
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Look at the number under the root. Does any square number (4, 9, 16, 25 …) still divide it?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[[true, 'Yes — finished'], [false, 'No — break it down again']].map(([v, label]) => {
                      const right = v === isSquareFree(cur[1]);
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500';
                      if (locked) style = right ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200' : picked === v ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600' : 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400';
                      return <button key={label} disabled={locked} onClick={() => chooseFinished(v)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 font-black text-sm transition-all ${style}`}>{label}</button>;
                    })}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={afterFinished} />}
                </>
              )}

              {st === 'multiply' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Multiply. Numbers in front together; numbers under the roots together.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3"><SafeInlineMath math={'a\\sqrt{b} \\times c\\sqrt{d} = ac\\sqrt{bd}'} /></p>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`${qLatex} =`} />
                    <SurdBox coef={typed.coef} rad={typed.rad} state={marks.m} disabled={locked} onEnter={checkMultiply}
                      onCoef={(v) => { setTyped((t) => ({ ...t, coef: v })); setMarks({}); }} onRad={(v) => { setTyped((t) => ({ ...t, rad: v })); setMarks({}); }} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ coef: String(model.raw[0]), rad: String(model.raw[1]) }); setMarks({ m: 'shown' }); })} onCheck={checkMultiply} onContinue={confirmMultiply} />
                </>
              )}

              {st === 'each' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Simplify every term first.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Surds only collect when the number under the root is the same — and you cannot tell until each one is simplest.</p>
                  <div className="flex flex-col gap-2">
                    {item.terms.map((term, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2">
                        <span className="w-24 text-right text-2xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={`${termLatex(term)} =`} /></span>
                        {needs[i] ? (
                          <SurdBox coef={typed[`c${i}`]} rad={typed[`r${i}`]} state={marks[i]} disabled={locked || marks[i] === 'good'} onEnter={checkEach}
                            onCoef={(v) => { setTyped((t) => ({ ...t, [`c${i}`]: v })); setMarks((m) => ({ ...m, [i]: undefined })); }}
                            onRad={(v) => { setTyped((t) => ({ ...t, [`r${i}`]: v })); setMarks((m) => ({ ...m, [i]: undefined })); }} />
                        ) : (
                          <span className="text-sm font-black uppercase tracking-widest text-slate-400">already simplest: <span className="text-xl text-slate-700 dark:text-slate-200 normal-case"><SafeInlineMath math={termLatex(term)} /></span></span>
                        )}
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showEach} onCheck={checkEach} onContinue={confirmEach} />
                </>
              )}

              {st === 'like' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3 text-lg">
                    <SafeInlineMath math={sumLatex(model.simplified)} /> — are these like surds?
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[[true, 'Yes — same root'], [false, 'No — different roots']].map(([v, label]) => {
                      const right = v === model.like;
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500';
                      if (locked) style = right ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200' : picked === v ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600' : 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400';
                      return <button key={label} disabled={locked} onClick={() => chooseLike(v)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 font-black text-sm transition-all ${style}`}>{label}</button>;
                    })}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={afterLike} />}
                </>
              )}

              {st === 'collect' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Collect them, like collecting like terms.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <SafeInlineMath math={`3x + 2x = 5x`} />, so <SafeInlineMath math={`3\\sqrt{${model.radicand}} + 2\\sqrt{${model.radicand}} = 5\\sqrt{${model.radicand}}`} />.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`${sumLatex(model.simplified)} =`} />
                    <NumberBox value={typed.k} state={marks.k} disabled={locked} onEnter={checkCollect} label="number in front" onChange={(v) => { setTyped({ k: v }); setMarks({}); }} />
                    <SafeInlineMath math={`\\sqrt{${model.radicand}}`} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ k: String(wantCollect) }); setMarks({ k: 'shown' }); })} onCheck={checkCollect} onContinue={confirmCollect} />
                </>
              )}
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? T.helped : slipped ? T.slipped : T.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {T.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 text-lg overflow-x-auto">
                  {bookLines.map((l, i) => <div key={i} className="py-0.5"><SafeInlineMath math={l} /></div>)}
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(124,58,237,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Answer</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={answerLatex} /></div>
                </div>
                {model.kind !== 'collect' && splits.length > 1 && (
                  <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    You took {splits.length} rounds. The largest square factor of {model.kind === 'simplify' ? item.n : model.raw[1]} is {squareFactors(model.kind === 'simplify' ? item.n : model.raw[1]).slice(-1)[0]} — spotting it first does it in one.
                  </p>
                )}
                <div className="mt-4 flex justify-end">
                  <button onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? T.finish : T.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
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

