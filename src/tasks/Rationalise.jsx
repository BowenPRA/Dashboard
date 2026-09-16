import { useMemo, useState } from 'react';
import {
  Divide, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  Grid2x2, ListChecks, MousePointerClick, ArrowDownToLine, ArrowUpToLine, Sparkles,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import { parseInlineText } from '../components/notes/layouts/helpers.jsx';
import { SurdBox, NumberBox } from '../components/math/SurdInput.jsx';
import {
  deriveRationalise, rationaliseQuestionLatex, multiplierOptions, termLatex, sumLatex, fractionLatex,
  sameTermValue, isSquareFree, gcd, tidy,
} from '../utils/surds';

/* ------------------------------------------------------------------ *
 * RATIONALISE IT — brackets with surds, and fractions with a surd on the
 * bottom, worked in the moves the mark scheme gives marks for.
 *
 * Reads a unit's `rationalise`:
 *   { title, intro, items: [
 *       { id, kind: 'expand', left: [t, t], right: [t, t], square? },
 *       { id, kind: 'mono', num: [t, …], den: [q, m] },          num over q√m
 *       { id, kind: 'binomial', num: [t, …], den: [t, t], form? }, num over a bracket
 *   ] }
 * A term t is [k, r] = k√r (r = 1 is a whole number), in the book's order.
 * `form: { latex, a: 'int' | 'surd' | 'den', … }` names the letters of a
 * "show that it can be written as (a + √3)/b" question. Every product cell,
 * the conjugate, the bottom, the top and the fully simplified answer are
 * derived by utils/surds.js.
 *
 * Stages:
 *   GRID      (expand) multiply every term by every term in a 2 × 2 grid —
 *             the grid makes it impossible to lose a term, and a conjugate
 *             pair shows its two surd cells cancelling.
 *   COLLECT   (expand) whole numbers together, surds together.
 *   CHOOSE    what to multiply top and bottom by — the conjugate, against the
 *             three mistakes that look like it.
 *   BOTTOM    the difference of two squares (or √m × √m): a whole number.
 *   TOP       the top times the multiplier, cell by cell.
 *   TIDY TOP  collect the top and simplify any root in it.
 *   FINAL     divide through by any common factor: simplify fully.
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item pays half. CHOOSE gets one try.
 * ------------------------------------------------------------------ */

const INK = '#c2410c';
const INK_DARK = '#9a3412';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  title: 'Rationalise It',
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
  stages: { grid: 'Multiply out', collect: 'Collect', choose: 'Choose', bottom: 'Bottom', top: 'Top', tidyTop: 'Tidy the top', final: 'Simplify fully' },
};
const STAGE_ICON = { grid: Grid2x2, collect: ListChecks, choose: MousePointerClick, bottom: ArrowDownToLine, top: ArrowUpToLine, tidyTop: Sparkles, final: CheckCircle2 };

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const intOf = (s) => (/^\s*-?\d+\s*$/.test(String(s ?? '')) ? Number(s) : null);
const intOr0 = (s) => (String(s ?? '').trim() === '' ? 0 : intOf(s));
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
      <span>{parseInlineText(msg.text)}</span>
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
 * The multiplication grid: row terms down the side, column terms along the
 * top, one answer box per cell. `values` are the derived cells, used only once
 * the stage is locked (to strike through a pair of cells that cancel).
 */
function Grid({ rows, cols, typed, marks, locked, onType, onEnter, cancel = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="border-separate border-spacing-1.5 mx-auto">
        <thead>
          <tr>
            <th className="w-12 text-xl font-black text-slate-400">×</th>
            {cols.map((c, j) => (
              <th key={j} className="px-2 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={termLatex(c)} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((rterm, i) => (
            <tr key={i}>
              <th className="px-2 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={termLatex(rterm)} /></th>
              {cols.map((_, j) => {
                const key = `${i}${j}`;
                const struck = locked && cancel.includes(key);
                return (
                  <td key={j} className={`p-1 rounded-xl ${struck ? 'bg-slate-100 dark:bg-slate-800 relative' : ''}`}>
                    <div className={struck ? 'opacity-40' : ''}>
                      <SurdBox coef={typed[`c${key}`]} rad={typed[`r${key}`]} state={marks[key]} disabled={locked || marks[key] === 'good'} onEnter={onEnter}
                        label={`cell ${i + 1}, ${j + 1}`}
                        onCoef={(v) => onType(key, 'c', v)} onRad={(v) => onType(key, 'r', v)} />
                    </div>
                    {struck && <div className="pointer-events-none absolute inset-x-1 top-1/2 h-[3px] -rotate-6 rounded bg-rose-500" />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Rationalise({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
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
  const [stageIdx, setStageIdx] = useState(0);
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

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return deriveRationalise(item); } catch { return null; }
  }, [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const isExpand = item.kind === 'expand';
  const topCellsFlat = isExpand ? [] : model.topCells.flat();
  const monoCells = item.kind === 'mono' ? model.topCells.map((c) => [c]) : null;
  const topGrid = item.kind === 'binomial' ? model.topCells : monoCells;
  const needTidy = !isExpand && (topCellsFlat.length > 1 || topCellsFlat.some((c) => !isSquareFree(c.raw[1])));
  const stages = isExpand ? ['grid', 'collect'] : ['choose', 'bottom', 'top', ...(needTidy ? ['tidyTop'] : []), 'final'];
  const stage = stages[stageIdx];
  const qLatex = rationaliseQuestionLatex(item);
  const multLatex = item.kind === 'mono' ? termLatex([1, item.den[1]]) : item.kind === 'binomial' ? sumLatex(model.conj) : '';
  const surdRad = isExpand
    ? (model.parts.radicand ?? [...item.left, ...item.right].find(([, r]) => r > 1)?.[1])
    : model.topParts.radicand;

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); };
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const advance = () => {
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); resetStage(); return; }
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
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
  const showMe = (reveal, text = T.shown) => { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text }); };
  const goNext = () => { setPos((p) => p + 1); setStageIdx(0); setHelped(false); setSlipped(false); setItemDone(false); resetStage(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const typeCell = (key, part, v) => {
    setTyped((t) => ({ ...t, [`${part}${key}`]: v }));
    setMarks((m) => ({ ...m, [key]: m[key] === 'good' ? 'good' : undefined }));
    setMsg(null);
  };

  /* ---------------------------------------------------------- grid (expand and top) */
  const gridCells = stage === 'grid' ? model.cells : stage === 'top' ? topGrid : null;
  const checkGrid = () => {
    const keys = gridCells.flatMap((row, i) => row.map((_, j) => `${i}${j}`));
    const next = { ...marks };
    let bad = 0;
    for (const key of keys) {
      if (next[key] === 'good') continue;
      const t = typedTerm(typed[`c${key}`], typed[`r${key}`]);
      if (!t) { setMsg({ ok: false, text: 'Fill in every cell. For a whole number, leave the root box empty.' }); return; }
      const want = gridCells[+key[0]][+key[1]].raw;
      if (sameTermValue(t, want)) next[key] = 'good';
      else { next[key] = 'bad'; bad += 1; }
    }
    setMarks(next);
    const reveal = () => {
      const t = { ...typed };
      const mk = { ...next };
      keys.forEach((key) => { if (mk[key] !== 'good') { const v = gridCells[+key[0]][+key[1]].value; t[`c${key}`] = String(v[0]); t[`r${key}`] = v[1] === 1 ? '' : String(v[1]); mk[key] = 'shown'; } });
      setTyped(t); setMarks(mk);
    };
    judge(bad === 0, `${bad} cell${bad === 1 ? ' is' : 's are'} wrong. Whole numbers multiply the numbers in front; roots multiply under the root, and $\\sqrt{a} \\times \\sqrt{a} = a$.`, reveal,
      isExpand && model.conjugatePair ? 'Right — and look at the two surd cells: they are opposites, so they will cancel.' : 'Every cell is right.');
  };
  const showGrid = () => showMe(() => {
    const t = {};
    const mk = {};
    gridCells.forEach((row, i) => row.forEach((c, j) => { const key = `${i}${j}`; t[`c${key}`] = String(c.value[0]); t[`r${key}`] = c.value[1] === 1 ? '' : String(c.value[1]); mk[key] = marks[key] === 'good' ? 'good' : 'shown'; }));
    setTyped(t); setMarks(mk);
  });

  /* ---------------------------------------------------------- collect (expand) / tidy top */
  const collectParts = isExpand ? model.parts : model.topParts;
  const checkCollect = () => {
    const I = intOr0(typed.int);
    const S = intOr0(typed.surd);
    const R = isExpand ? surdRad : intOf(typed.rad);
    if (I == null || S == null || (!isExpand && S !== 0 && R == null)) { setMsg({ ok: false, text: 'Type the whole-number part and the surd part (a 0 can be left blank).' }); return; }
    const wantI = collectParts.int;
    const wantS = collectParts.surdCoef;
    const surdOk = S === 0 ? wantS === 0 : wantS !== 0 && sameTermValue([S, R || 1], [wantS, collectParts.radicand]);
    const equal = I === wantI && surdOk;
    if (equal && !isExpand && S !== 0 && !isSquareFree(R)) {
      setMsg({ info: true, text: `Equal — but $\\sqrt{${R}}$ is not simplest. Break it down, then type it again.` });
      return;
    }
    let why = 'Add the whole-number cells together and the surd cells together.';
    if (I === wantI && !surdOk) why = 'The whole-number part is right. Now add the surd cells — watch their signs.';
    else if (surdOk && I !== wantI) why = 'The surd part is right. Now add the whole-number cells — remember $\\sqrt{a} \\times \\sqrt{a}$ is a whole number.';
    setMarks({ int: I === wantI ? 'good' : 'bad', surd: surdOk ? 'good' : 'bad' });
    judge(equal, why, () => {
      setTyped({ int: String(wantI), surd: String(wantS), rad: collectParts.radicand ? String(collectParts.radicand) : '' });
      setMarks({ int: 'shown', surd: 'shown' });
    }, isExpand && model.conjugatePair ? 'Right — the surds cancelled, leaving a whole number. That is exactly why the conjugate rationalises a denominator.' : 'Right.');
  };
  const showCollect = () => showMe(() => {
    setTyped({ int: String(collectParts.int), surd: String(collectParts.surdCoef), rad: collectParts.radicand ? String(collectParts.radicand) : '' });
    setMarks({ int: 'shown', surd: 'shown' });
  });

  /* ---------------------------------------------------------- choose */
  const options = !isExpand ? multiplierOptions(item) : [];
  const choose = (i) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
    const o = options[i];
    if (o.correct) setMsg({ ok: true, text: o.why });
    else { setHelped(true); setMsg({ ok: false, text: `${o.why} The right choice is $${options.find((p) => p.correct).latex}$.` }); }
  };

  /* ---------------------------------------------------------- bottom */
  const second = item.kind === 'binomial' ? [Math.abs(item.den[1][0]), item.den[1][1]] : null;
  const checkBottom = () => {
    if (item.kind === 'mono') {
      const v = intOf(typed.b);
      if (v == null) { setMsg({ ok: false, text: 'Type the bottom as a whole number.' }); return; }
      const [q, m] = item.den;
      let why = `$\\sqrt{${m}} \\times \\sqrt{${m}} = ${m}$, and the ${q} in front stays.`;
      if (v === m * m * q) why = `$\\sqrt{${m}} \\times \\sqrt{${m}}$ is ${m}, not ${m * m}. A root times itself gives the number under it.`;
      setMarks({ b: v === model.bottom ? 'good' : 'bad' });
      judge(v === model.bottom, why, () => { setTyped({ b: String(model.bottom) }); setMarks({ b: 'shown' }); });
      return;
    }
    const a = intOf(typed.a);
    const b = intOf(typed.s);
    const d = intOf(typed.b);
    if ([a, b, d].some((v) => v == null)) { setMsg({ ok: false, text: 'Fill in all three boxes.' }); return; }
    const [t1] = item.den;
    const mk = { a: a === model.firstSq ? 'good' : 'bad', s: b === model.secondSq ? 'good' : 'bad', b: d === model.bottom ? 'good' : 'bad' };
    setMarks(mk);
    let why = 'Square each term on its own, then subtract.';
    const sq = (t) => (t[1] > 1 ? t : null);
    const surdT = sq(t1) || sq(second);
    if (surdT && (a === surdT[0] * surdT[1] || b === surdT[0] * surdT[1]) && surdT[0] !== 1) why = `$(${termLatex(surdT)})^2 = ${surdT[0]}^2 \\times ${surdT[1]} = ${surdT[0] ** 2 * surdT[1]}$ — square the ${surdT[0]} as well.`;
    else if (mk.a === 'good' && mk.s === 'good') why = `Both squares are right. The bottom is the FIRST square MINUS the second: ${model.firstSq} − ${model.secondSq}.`;
    judge(Object.values(mk).every((v) => v === 'good'), why, () => { setTyped({ a: String(model.firstSq), s: String(model.secondSq), b: String(model.bottom) }); setMarks({ a: 'shown', s: 'shown', b: 'shown' }); },
      `Right — the surds cancel, so the bottom is ${model.bottom}.`);
  };
  const showBottom = () => showMe(() => {
    if (item.kind === 'mono') { setTyped({ b: String(model.bottom) }); setMarks({ b: 'shown' }); return; }
    setTyped({ a: String(model.firstSq), s: String(model.secondSq), b: String(model.bottom) });
    setMarks({ a: 'shown', s: 'shown', b: 'shown' });
  });

  /* ---------------------------------------------------------- final */
  const F = !isExpand ? model.final : null;
  const fInt = F ? model.finalParts.int : 0;
  const fSurd = F ? model.finalParts.surdCoef : 0;
  const fRad = F ? (model.finalParts.radicand ?? model.topParts.radicand) : null;
  const checkFinal = () => {
    const I = intOr0(typed.int);
    const S = intOr0(typed.surd);
    const D = String(typed.den ?? '').trim() === '' ? 1 : intOf(typed.den);
    if (I == null || S == null || D == null || D === 0) { setMsg({ ok: false, text: 'Type the top and the bottom (a bottom of 1 can be left blank).' }); return; }
    const equal = I * F.den === fInt * D && S * F.den === fSurd * D;
    if (equal && D < 0) { setMsg({ info: true, text: 'Equal — but write the minus on the top, so the bottom is positive.' }); return; }
    const g = gcd(gcd(I, S), D);
    if (equal && g > 1) { setMsg({ info: true, text: `Equal — but every number divides by ${g}. Simplify fully: divide the top AND the bottom by ${g}.` }); return; }
    let why = `Look for a number that divides EVERY term on the top and the bottom. Before simplifying you had $${fractionLatex(model.top, model.bottom)}$.`;
    if (D === F.den && (I !== fInt || S !== fSurd)) why = 'The bottom is right. Divide every term on the top by the same number — not just one of them.';
    setMarks({ int: I * F.den === fInt * D ? 'good' : 'bad', surd: S * F.den === fSurd * D ? 'good' : 'bad', den: D === F.den ? 'good' : 'bad' });
    judge(equal, why, () => { setTyped({ int: String(fInt), surd: String(fSurd), den: String(F.den) }); setMarks({ int: 'shown', surd: 'shown', den: 'shown' }); },
      F.divisor !== 1 && Math.abs(F.divisor) !== 1 ? `Right — everything divided by ${Math.abs(F.divisor)}.` : 'Right — nothing more divides, so it is fully simplified.');
  };
  const showFinal = () => showMe(() => { setTyped({ int: String(fInt), surd: String(fSurd), den: String(F.den) }); setMarks({ int: 'shown', surd: 'shown', den: 'shown' }); });

  /* ---------------------------------------------------------- the working ladder */
  const ladder = [];
  if (isExpand) {
    ladder.push(qLatex);
    const cells = model.cells.flat().map((c) => c.value);
    if (stageIdx >= 1 || itemDone) ladder.push(`= ${sumLatex(cells)}`);
    if (itemDone) ladder.push(`= ${sumLatex(tidy(model.sum)) || '0'}`);
  } else {
    // A line joins the ladder once its stage has been answered (or shown).
    const reached = (s) => itemDone || stages.indexOf(s) < stageIdx || (stages.indexOf(s) === stageIdx && locked);
    ladder.push(qLatex);
    const numL = sumLatex(item.num);
    const denL = item.kind === 'mono' ? termLatex(item.den) : sumLatex(item.den);
    if (reached('choose')) ladder.push(`= \\dfrac{${numL}}{${denL}} \\times \\dfrac{${multLatex}}{${multLatex}}`);
    if (reached('bottom')) ladder.push(`= \\dfrac{${item.num.length > 1 ? `(${numL})` : numL}${item.kind === 'binomial' ? `(${multLatex})` : ` \\times ${multLatex}`}}{${model.bottom}}`);
    const cellsLine = sumLatex(topCellsFlat.map((c) => c.value));
    const tidyLine = sumLatex(tidy(model.top));
    if (reached('top')) ladder.push(`= \\dfrac{${cellsLine}}{${model.bottom}}`);
    // Only when collecting the top actually changed it: an item whose cells are
    // already collected would otherwise print the same line twice.
    if (needTidy && reached('tidyTop') && tidyLine !== cellsLine) ladder.push(`= \\dfrac{${tidyLine}}{${model.bottom}}`);
    if (itemDone && model.final.divisor !== 1) ladder.push(`= ${fractionLatex(model.final.terms, model.final.den)}`);
  }

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const answerLatex = isExpand ? (sumLatex(tidy(model.sum)) || '0') : fractionLatex(model.final.terms, model.final.den);
  const formLine = item.form
    ? Object.entries(item.form).filter(([k, v]) => k !== 'latex' && typeof v === 'string')
      .map(([letter, part]) => `${letter} = ${part === 'int' ? fInt : part === 'surd' ? fSurd : F.den}`).join(', \\; ')
    : null;

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-5 lg:items-start">
        {/* left: the question and the working so far */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Divide className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{isExpand ? 'Expand and simplify' : 'Rationalise the denominator'}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.solved}</div>
            </div>
            {item.prompt && <p className="px-4 pt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">{parseInlineText(item.prompt)}</p>}
            <div className="px-4 py-4 text-center text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 overflow-x-auto overflow-y-hidden [&_.katex]:inline-block">
              <SafeBlockMath math={qLatex} />
            </div>
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-3 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s, i) => <Stage key={s} icon={STAGE_ICON[s]} label={T.stages[s]} active={i === stageIdx} done={i < stageIdx || (i === stageIdx && locked)} />)}
              </div>
            )}
          </div>

          {!itemDone && ladder.length > 1 && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Working so far</div>
              {ladder.map((l, i) => <div key={i} className="text-lg py-1 [&_.katex]:inline-block"><SafeInlineMath math={l} /></div>)}
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              {(stage === 'grid' || stage === 'top') && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    {stage === 'grid' ? 'Multiply every term by every term.' : `Multiply the top by $${multLatex}$.`.split('$').map((p, i) => (i % 2 ? <SafeInlineMath key={i} math={p} /> : <span key={i}>{p}</span>))}
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">One box per cell. A whole number goes in the front box with the root box left empty.</p>
                  <Grid
                    rows={stage === 'grid' ? item.left : item.num}
                    cols={stage === 'grid' ? item.right : item.kind === 'mono' ? [[1, item.den[1]]] : model.conj}
                    typed={typed} marks={marks} locked={locked} onType={typeCell} onEnter={checkGrid}
                    cancel={stage === 'grid' && model.conjugatePair ? ['01', '10'] : []}
                  />
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showGrid} onCheck={checkGrid} onContinue={advance} />
                </>
              )}

              {(stage === 'collect' || stage === 'tidyTop') && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    {stage === 'collect' ? 'Collect: whole numbers together, surds together.' : 'Tidy the top: collect it, and simplify any root.'}
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">A part that is zero can be left blank.</p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                    <NumberBox value={typed.int} state={marks.int} disabled={locked} onEnter={checkCollect} label="whole-number part" onChange={(v) => { setTyped((t) => ({ ...t, int: v })); setMarks({}); }} />
                    <span className="font-black text-slate-400">+</span>
                    <SurdBox coef={typed.surd} rad={typed.rad} radFixed={stage === 'collect' ? surdRad : null} state={marks.surd} disabled={locked} onEnter={checkCollect}
                      onCoef={(v) => { setTyped((t) => ({ ...t, surd: v })); setMarks({}); }} onRad={(v) => { setTyped((t) => ({ ...t, rad: v })); setMarks({}); }} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showCollect} onCheck={checkCollect} onContinue={advance} />
                </>
              )}

              {stage === 'choose' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">What do you multiply the top AND the bottom by?</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">You need a whole number on the bottom — without changing the value of the fraction.</p>
                  <div className="grid gap-2 grid-cols-2">
                    {options.map((o, i) => {
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-500 text-slate-900 dark:text-slate-100';
                      if (locked) {
                        if (o.correct) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                        else if (picked === i) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
                        else style = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                      return (
                        <button key={o.id} disabled={locked} onClick={() => choose(i)} className={`rounded-xl border-2 border-b-[4px] px-2 py-3 text-xl transition-all [&_.katex]:inline-block ${style}`}>
                          <SafeInlineMath math={`\\times ${o.latex}`} />
                        </button>
                      );
                    })}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'bottom' && item.kind === 'mono' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3 text-lg">Multiply out the bottom.</div>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`${termLatex(item.den)} \\times ${multLatex} =`} />
                    <NumberBox value={typed.b} state={marks.b} disabled={locked} onEnter={checkBottom} label="bottom" onChange={(v) => { setTyped({ b: v }); setMarks({}); }} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showBottom} onCheck={checkBottom} onContinue={advance} />
                </>
              )}

              {stage === 'bottom' && item.kind === 'binomial' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">The bottom is a difference of two squares.</div>
                  <p className="text-base text-slate-600 dark:text-slate-300 mb-3 [&_.katex]:inline-block">
                    <SafeInlineMath math={'(a + b)(a - b) = a^2 - b^2'} />
                  </p>
                  <div className="flex flex-col gap-2 text-xl text-slate-900 dark:text-slate-100">
                    {[['a', `\\left(${termLatex(item.den[0])}\\right)^2 =`], ['s', `\\left(${termLatex(second)}\\right)^2 =`], ['b', `(${sumLatex(item.den)})(${multLatex}) =`]].map(([k, tex]) => (
                      <div key={k} className="flex flex-wrap items-center gap-3">
                        <span className="min-w-[10rem] text-right [&_.katex]:inline-block"><SafeInlineMath math={tex} /></span>
                        <NumberBox value={typed[k]} state={marks[k]} disabled={locked} onEnter={checkBottom} label={k}
                          onChange={(v) => { setTyped((t) => ({ ...t, [k]: v })); setMarks((m) => ({ ...m, [k]: undefined })); }} />
                      </div>
                    ))}
                  </div>
                  {locked && (
                    <div className="mt-3 rounded-xl bg-orange-50/60 dark:bg-orange-900/10 border-2 border-orange-100 dark:border-orange-900/40 p-3 text-slate-800 dark:text-slate-100 overflow-x-auto [&_.katex]:inline-block">
                      <div className="text-[11px] font-black uppercase tracking-widest text-orange-700 dark:text-orange-300 mb-1">Why it works</div>
                      <SafeInlineMath math={`(${sumLatex(item.den)})(${multLatex}) = ${sumLatex(model.denCells.flat().map((c) => c.value))} = ${model.bottom}`} />
                    </div>
                  )}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showBottom} onCheck={checkBottom} onContinue={advance} />
                </>
              )}

              {stage === 'final' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Simplify fully.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 [&_.katex]:inline-block">
                    You have <SafeInlineMath math={fractionLatex(model.top, model.bottom)} />. Does one number divide every term on top AND the bottom?
                  </p>
                  <div className="inline-flex flex-col items-center gap-1.5 text-2xl text-slate-900 dark:text-slate-100">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <NumberBox value={typed.int} state={marks.int} disabled={locked} onEnter={checkFinal} label="whole-number part on top" onChange={(v) => { setTyped((t) => ({ ...t, int: v })); setMarks({}); }} />
                      <span className="font-black text-slate-400">+</span>
                      <SurdBox coef={typed.surd} radFixed={fRad} state={marks.surd} disabled={locked} onEnter={checkFinal}
                        onCoef={(v) => { setTyped((t) => ({ ...t, surd: v })); setMarks({}); }} />
                    </div>
                    <div className="h-[3px] w-full min-w-[14rem] rounded bg-slate-700 dark:bg-slate-300" />
                    <NumberBox value={typed.den} state={marks.den} disabled={locked} onEnter={checkFinal} label="bottom" onChange={(v) => { setTyped((t) => ({ ...t, den: v })); setMarks({}); }} />
                  </div>
                  {item.form && (
                    <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400 [&_.katex]:inline-block">The question wants the form <SafeInlineMath math={item.form.latex} />.</p>
                  )}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showFinal} onCheck={checkFinal} onContinue={advance} />
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
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
                  {ladder.map((l, i) => <div key={i} className="text-lg py-1 [&_.katex]:inline-block"><SafeInlineMath math={l} /></div>)}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(194,65,12,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Answer</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block"><SafeInlineMath math={answerLatex} /></div>
                  {formLine && <div className="text-base text-slate-700 dark:text-slate-200 [&_.katex]:inline-block">so <SafeInlineMath math={formLine} /></div>}
                </div>
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
