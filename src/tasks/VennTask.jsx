import { useMemo, useState } from 'react';
import {
  Blend, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  Hash, Percent, ListChecks, Scale, PaintBucket, Languages, Grid2x2, MousePointerClick, ToggleLeft,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import VennFigure from '../components/math/VennFigure.jsx';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { parseInlineText } from '../components/notes/layouts/helpers.jsx';
import {
  regionsOf, sameRegions, latexOf, textOf, parseSet, notationOptions, describeRegions, regionWords,
  countsOfItem, elementsByRegion, solvingSteps, universeOf, regionOfElement, membershipWords, ruleWords,
  judgeStatement, readingOrder,
} from '../utils/sets';

/* ------------------------------------------------------------------ *
 * SET IT OUT — Venn diagrams and set notation, worked the way an IGCSE
 * question works them.
 *
 * Reads a unit's `venn`:
 *   { title, intro, items: [item] }
 * An item is one diagram and the questions asked about it, in one of three
 * kinds (full schema in docs/ext-math/task-engines.md):
 *   counts    the diagram is printed with a number in every region
 *   facts     the numbers are given in words; the student FILLS the diagram
 *   elements  ℰ and the sets are rules ("multiples of 3"); the student PLACES
 *             every element
 * and each question is one `ask`: n (how many), p (probability), shade, list
 * (the elements), more (how many more), truth (true or false statements).
 *
 * The item stores only the question. utils/sets.js derives every region a
 * piece of notation covers, every count, the order to fill a diagram in (with
 * x when the middle is hidden), the notation options and the reason a
 * statement is true — so nothing here is an answer key.
 *
 * The screen's one idea: NOTATION IS A PICTURE. A question in words is first
 * turned into notation (pick it), the notation is turned into a picture (shade
 * it), and only then is the picture turned into a number. A student who can do
 * the middle step can do every set question on the paper.
 *
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in, and that part pays half. Multiple choice gets one try.
 * On completion the working is set out under "Copy this into your book".
 * ------------------------------------------------------------------ */

const INK = '#0f766e';
const INK_DARK = '#115e59';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const AMBER = '#f59e0b';

const T = {
  title: 'Set It Out',
  check: 'Check',
  stuck: 'Show me',
  cont: 'Continue',
  next: 'Next diagram',
  finish: 'Finish',
  done: 'done',
  clean: 'Every part right first time.',
  slipped: 'Done — a wrong turn or two, and you found them yourself.',
  helped: 'Done — with a part or two shown to you.',
  bookCopy: 'Copy this into your book',
  shown: 'Here it is. Read it, then continue.',
  stages: {
    fill: 'Fill the diagram', place: 'Place the elements', notation: 'Words → notation', shade: 'Shade it',
    count: 'Count it', prob: 'Probability', list: 'List it', more: 'Compare', truth: 'True or false',
  },
};

const STAGE_ICON = { fill: Grid2x2, place: MousePointerClick, notation: Languages, shade: PaintBucket, count: Hash, prob: Percent, list: ListChecks, more: Scale, truth: ToggleLeft };

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

/** The stages one question is worked in. */
function stagesOf(q) {
  const lead = q.translate ? ['notation'] : [];
  switch (q.ask) {
    case 'n': return [...lead, 'shade', 'count'];
    case 'p': return [...lead, 'shade', 'prob'];
    case 'shade': return [...lead, 'shade'];
    case 'list': return [...lead, 'shade', 'list'];
    case 'more': return ['more'];
    case 'truth': return ['truth'];
    default: return [];
  }
}

/** Everything about one item that the screen needs, derived once. */
function modelOf(item) {
  const sets = item.sets || ['A', 'B'];
  const labels = item.labels || {};
  const elements = item.kind === 'elements' ? elementsByRegion(sets, item.rules, item.universe) : null;
  const counts = countsOfItem(item);
  const total = Object.values(counts || {}).reduce((a, b) => a + b, 0);
  const solve = item.kind === 'facts' ? solvingSteps(sets, item.facts, labels) : null;
  const parts = [];
  if (item.kind === 'facts') parts.push({ id: 'fill', label: 'Fill', stages: ['fill'] });
  if (item.kind === 'elements') parts.push({ id: 'place', label: 'Place', stages: ['place'] });
  for (const q of item.questions || []) {
    parts.push({
      id: q.id, label: `(${q.id})`, q, stages: stagesOf(q),
      regions: q.expr ? regionsOf(q.expr, sets) : null,
      options: q.translate ? notationOptions(q.expr, sets, `${item.id}.${q.id}`) : null,
    });
  }
  return { sets, labels, elements, counts, total, solve, parts };
}

const countIn = (regions, counts) => regions.reduce((a, k) => a + (counts[k] || 0), 0);
const membersIn = (regions, elements) => readingOrder(Object.keys(elements)[0].length).filter((k) => regions.includes(k)).flatMap((k) => elements[k]).sort((a, b) => a - b);
const wrap = (ask, latex) => (ask === 'n' ? `n(${latex})` : ask === 'p' ? `P(${latex})` : latex);
const intOf = (s) => (/^\s*-?\d+\s*$/.test(String(s ?? '')) ? Number(s) : null);

/** A tip for a wrong shading, keyed to the symbols in the notation. */
function shadeTip(expr) {
  const s = textOf(parseSet(expr));
  const tips = [];
  if (s.includes('∪')) tips.push('∪ (union) means in either set, or both.');
  if (s.includes('∩')) tips.push('∩ (intersection) means in both at the same time.');
  if (s.includes("'")) tips.push("′ (complement) means NOT in it — everything else in ℰ, including outside the circles.");
  return tips.join(' ');
}

/** The working an item leaves in the book, derived from the model alone. */
function workingOf(item, m) {
  const lines = [];
  const L = (tree) => latexOf(parseSet(tree), m.labels);
  for (const part of m.parts) {
    if (part.id === 'fill') {
      lines.push({ head: 'Filling the diagram' });
      for (const st of m.solve?.steps || []) lines.push({ text: st.say });
    } else if (part.id === 'place') {
      lines.push({ head: 'The sets' });
      for (const s of m.sets) {
        const xs = membersIn(regionsOf(s, m.sets), m.elements);
        lines.push({ tex: `${m.labels[s] || s} = \\{${xs.join(', ')}\\}` });
      }
    } else {
      const q = part.q;
      lines.push({ head: `(${q.id})` });
      if (q.ask === 'n') {
        const nums = part.regions.map((k) => m.counts[k]);
        lines.push({ tex: `n(${L(q.expr)}) = ${nums.length > 1 ? `${nums.join(' + ')} = ` : ''}${countIn(part.regions, m.counts)}` });
      } else if (q.ask === 'p') {
        lines.push({ tex: `P(${L(q.expr)}) = \\dfrac{n(${L(q.expr)})}{n(\\mathscr{E})} = \\dfrac{${countIn(part.regions, m.counts)}}{${m.total}}` });
      } else if (q.ask === 'list') {
        lines.push({ tex: `${L(q.expr)} = \\{${membersIn(part.regions, m.elements).join(', ')}\\}` });
      } else if (q.ask === 'shade') {
        lines.push({ text: `${textOf(parseSet(q.expr), m.labels)} is ${describeRegions(part.regions, m.sets, m.labels)}.` });
      } else if (q.ask === 'more') {
        const [a, b] = q.exprs.map((e) => countIn(regionsOf(e, m.sets), m.counts));
        lines.push({ tex: `n(${L(q.exprs[0])}) - n(${L(q.exprs[1])}) = ${a} - ${b} = ${a - b}` });
      } else if (q.ask === 'truth') {
        for (const st of q.statements) {
          const j = judgeStatement(st, m.sets, { elements: m.elements, counts: m.elements ? null : m.counts, labels: m.labels });
          lines.push({ tex: `${j.latex} \\quad \\textbf{${j.truth ? 'true' : 'false'}}` });
        }
      }
    }
  }
  return lines;
}

// ─────────────────────────────────────────────────────────── small pieces

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

function NumBox({ value, onChange, onEnter, state, width = 'w-20', disabled, label }) {
  const ring = state === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30'
    : state === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
      : state === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';
  return (
    <input value={value ?? ''} disabled={disabled} inputMode="numeric" aria-label={label}
      onChange={(e) => onChange(e.target.value.replace(/[^\d-]/g, ''))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      placeholder="?" spellCheck={false} autoComplete="off"
      className={`${width} px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 disabled:opacity-80 ${ring}`} />
  );
}

function Actions({ locked, onShow, onCheck, onContinue, canCheck = true, checkLabel = T.check }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {!locked ? (
        <>
          {onShow && (
            <button onClick={onShow} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
            </button>
          )}
          {onCheck && (
            <button onClick={onCheck} disabled={!canCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{checkLabel}</button>
          )}
        </>
      ) : (
        <button onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

function Message({ msg }) {
  if (!msg?.text) return null;
  const tone = msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.shown ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{parseInlineText(msg.text)}</span>
    </div>
  );
}

function Chip({ x, on, tone, onClick, disabled, tag }) {
  const cls = tone === 'bad' ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-400 text-rose-600 dark:text-rose-300'
    : tone === 'good' ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
      : on ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-teal-500';
  return (
    <button onClick={onClick} disabled={disabled}
      className={`relative min-w-[2.75rem] px-2.5 py-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-base transition-all disabled:opacity-80 ${cls}`}
      style={on && !tone ? { backgroundColor: INK } : undefined}>
      {x}
      {tag && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md bg-slate-700 text-white text-[9px] font-black tracking-wide">{tag}</span>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────── the task

export default function VennTask({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
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
  const [partIdx, setPartIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [partHelped, setPartHelped] = useState(false);
  // A single wrong answer costs nothing but is not "right first time" either.
  const [slipped, setSlipped] = useState(false);
  const [partScores, setPartScores] = useState([]);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);
  // stage working
  const [locked, setLocked] = useState(false);
  const [wrongs, setWrongs] = useState(0);
  const [msg, setMsg] = useState(null);
  const [pick, setPick] = useState(null);
  const [shade, setShade] = useState([]);
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [chosen, setChosen] = useState([]);
  const [truth, setTruth] = useState({});
  const [placement, setPlacement] = useState({});
  const [selected, setSelected] = useState(null);
  const [hints, setHints] = useState(0);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return modelOf(item); } catch { return null; }
  }, [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No diagrams yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const { sets, labels, counts, elements, total } = model;
  const part = model.parts[partIdx];
  const stage = part?.stages[stageIdx];
  const q = part?.q;
  const universe = item.kind === 'elements' ? universeOf(item.universe) : [];
  const L = (expr) => latexOf(parseSet(expr), labels);
  const describe = (keys) => describeRegions(keys, sets, labels);

  /* ---------------------------------------------------------- flow */
  const resetStage = () => {
    setLocked(false); setWrongs(0); setMsg(null); setPick(null); setShade([]);
    setTyped({}); setMarks({}); setChosen([]); setTruth({}); setSelected(null); setHints(0);
  };

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  /** Judge an attempt: right locks the stage; a second wrong reveals it. */
  const judge = (ok, badText, reveal, goodText = 'Right.') => {
    if (locked) return;
    if (ok) { setLocked(true); setMsg({ ok: true, text: goodText }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= 2) {
      reveal();
      setLocked(true);
      setPartHelped(true);
      setMsg({ shown: true, text: `${badText} The answer is filled in for you.` });
    } else {
      setMsg({ ok: false, text: badText });
    }
  };
  const showMe = (reveal) => { reveal(); setLocked(true); setPartHelped(true); setMsg({ shown: true, text: T.shown }); };

  const advance = () => {
    if (stageIdx + 1 < part.stages.length) { setStageIdx((s) => s + 1); resetStage(); return; }
    const scores = [...partScores, partHelped ? 0.5 : 1];
    setPartScores(scores);
    if (partIdx + 1 < model.parts.length) {
      setPartIdx((p) => p + 1); setStageIdx(0); setPartHelped(false); resetStage();
      return;
    }
    const itemScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const next = { ...results, [item.id]: { score: Math.round(itemScore * 100) / 100 } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };

  const goNext = () => {
    setPos((p) => p + 1); setPartIdx(0); setStageIdx(0); setPartHelped(false); setPartScores([]);
    setItemDone(false); setSlipped(false); setPlacement({}); resetStage();
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- stage: fill */
  const fillOrder = readingOrder(sets.length);
  const checkFill = () => {
    if (fillOrder.some((k) => intOf(typed[k]) == null)) { setMsg({ ok: false, text: 'Put a number in every region first.' }); return; }
    const bad = fillOrder.filter((k) => intOf(typed[k]) !== counts[k]);
    const nextMarks = Object.fromEntries(fillOrder.map((k) => [k, bad.includes(k) ? 'bad' : 'good']));
    // The diagnosis: a whole set written into one piece of it, or the four not adding up to ℰ.
    let why = `${bad.length} region${bad.length === 1 ? ' is' : 's are'} wrong.`;
    const sum = fillOrder.reduce((a, k) => a + (intOf(typed[k]) || 0), 0);
    const whole = bad.map((k) => {
      const f = (item.facts || []).find((fact) => {
        const cover = regionsOf(fact.expr, sets);
        return cover.length > 1 && cover.includes(k) && fact.n === intOf(typed[k]);
      });
      return f ? `${intOf(typed[k])} is n(${textOf(parseSet(f.expr), labels)}) — all of it. ${regionWords(k, sets, labels)} is only part of that, so take away what is already in the other parts.` : null;
    }).find(Boolean);
    if (whole) why = whole;
    else if (sum !== total) why = `Your numbers add up to ${sum}, but n(ℰ) = ${total}. Start in the middle and work out.`;
    setMarks(nextMarks);
    judge(!bad.length, why, () => {
      setTyped(Object.fromEntries(fillOrder.map((k) => [k, String(counts[k])])));
      setMarks(Object.fromEntries(fillOrder.map((k) => [k, 'shown'])));
    }, 'Every region is right.');
  };
  const revealFill = () => showMe(() => {
    setTyped(Object.fromEntries(fillOrder.map((k) => [k, String(counts[k])])));
    setMarks(Object.fromEntries(fillOrder.map((k) => [k, 'shown'])));
  });

  /* ---------------------------------------------------------- stage: place */
  const truthRegion = (x) => regionOfElement(x, sets, item.rules);
  const placedBy = () => {
    const by = Object.fromEntries(readingOrder(sets.length).map((k) => [k, []]));
    for (const x of universe) if (placement[x]) by[placement[x]].push(x);
    return by;
  };
  const tapRegionPlace = (key) => {
    if (locked || selected == null) return;
    const nextPlacement = { ...placement, [selected]: key };
    setPlacement(nextPlacement);
    setMarks((mk) => { const c = { ...mk }; delete c[selected]; return c; });
    setMsg(null);
    const nextFree = universe.find((x) => !nextPlacement[x]);
    setSelected(nextFree ?? null);
  };
  const checkPlace = () => {
    if (universe.some((x) => !placement[x])) { setMsg({ ok: false, text: 'Place every number first — tap a number, then tap its region.' }); return; }
    const bad = universe.filter((x) => placement[x] !== truthRegion(x));
    setMarks(Object.fromEntries(universe.map((x) => [x, bad.includes(x) ? 'bad' : 'good'])));
    const x = bad[0];
    const why = x == null ? '' : `${sets.map((s) => membershipWords(item.rules[s], x)).join(' and ')}, so ${x} belongs in ${regionWords(truthRegion(x), sets, labels)}.${bad.length > 1 ? ` ${bad.length - 1} more ${bad.length === 2 ? 'is' : 'are'} in the wrong place too.` : ''}`;
    judge(!bad.length, why, () => {
      setPlacement(Object.fromEntries(universe.map((y) => [y, truthRegion(y)])));
      setMarks({});
    }, 'Every number is in the right place.');
  };
  const revealPlace = () => showMe(() => { setPlacement(Object.fromEntries(universe.map((y) => [y, truthRegion(y)]))); setMarks({}); setSelected(null); });

  /* ---------------------------------------------------------- stage: notation */
  const pickNotation = (i) => {
    if (locked) return;
    setPick(i);
    const o = part.options[i];
    setLocked(true);
    if (o.correct) { setMsg({ ok: true, text: `Right — $${wrap(q.ask, o.latex)}$.` }); return; }
    setPartHelped(true);
    const right = part.options.find((p) => p.correct);
    setMsg({ ok: false, text: `$${o.latex}$ is ${describe(o.regions)}. The question wants ${describe(right.regions)}: $${right.latex}$.` });
  };

  /* ---------------------------------------------------------- stage: shade */
  const toggleShade = (key) => {
    if (locked) return;
    setMsg(null);
    setShade((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));
  };
  const checkShade = () => {
    if (!shade.length) { setMsg({ ok: false, text: 'Tap the regions to shade them first.' }); return; }
    const ok = sameRegions(shade, part.regions);
    judge(ok, `You shaded ${describe(readingOrder(sets.length).filter((k) => shade.includes(k)))} — that is not $${L(q.expr)}$. ${shadeTip(q.expr)}`, () => setShade(part.regions), `Right — $${L(q.expr)}$ is ${describe(part.regions)}.`);
  };

  /* ---------------------------------------------------------- stage: count */
  const wantCount = part?.regions && counts ? countIn(part.regions, counts) : null;
  const checkCount = () => {
    const v = intOf(typed.count);
    if (v == null) { setMsg({ ok: false, text: 'Type a whole number.' }); return; }
    const onePiece = part.regions.length > 1 && part.regions.find((k) => counts[k] === v);
    const why = onePiece ? `${v} is only ${regionWords(onePiece, sets, labels)}. Add every shaded region.` : 'Add the numbers in every shaded region — and only those.';
    setMarks({ count: v === wantCount ? 'good' : 'bad' });
    judge(v === wantCount, why, () => { setTyped({ count: String(wantCount) }); setMarks({ count: 'shown' }); });
  };

  /* ---------------------------------------------------------- stage: prob */
  const checkProb = () => {
    const a = intOf(typed.num);
    const b = intOf(typed.den);
    if (a == null || b == null || b === 0) { setMsg({ ok: false, text: 'Type the top and the bottom of the fraction.' }); return; }
    const ok = a * total === wantCount * b;
    let why = 'Probability = the number in the shaded region ÷ the number in ℰ.';
    if (b !== total && a === wantCount) why = `The top is right. The bottom is everyone in ℰ: add every region, not just the circles.`;
    else if (b === total) why = `The bottom is right. The top is the shaded count, n(${textOf(parseSet(q.expr), labels)}).`;
    setMarks({ num: a * total === wantCount * b ? 'good' : a === wantCount ? 'good' : 'bad', den: ok || b === total ? 'good' : 'bad' });
    judge(ok, why, () => { setTyped({ num: String(wantCount), den: String(total) }); setMarks({ num: 'shown', den: 'shown' }); }, ok && b !== total ? 'Right — that fraction simplifies to the same probability.' : 'Right.');
  };

  /* ---------------------------------------------------------- stage: list */
  const wantList = part?.regions && elements ? membersIn(part.regions, elements) : [];
  const toggleChip = (x) => {
    if (locked) return;
    setMsg(null);
    setMarks({});
    setChosen((c) => (c.includes(x) ? c.filter((y) => y !== x) : [...c, x]));
  };
  const checkList = () => {
    const missing = wantList.filter((x) => !chosen.includes(x));
    const extra = chosen.filter((x) => !wantList.includes(x));
    setMarks(Object.fromEntries([...extra.map((x) => [x, 'bad']), ...chosen.filter((x) => wantList.includes(x)).map((x) => [x, 'good'])]));
    const bits = [];
    if (extra.length) bits.push(`${extra.join(', ')} ${extra.length > 1 ? 'are' : 'is'} not in $${L(q.expr)}$ — ${extra.slice(0, 2).map((x) => `${x} is in ${regionWords(truthRegion(x), sets, labels)}`).join('; ')}.`);
    if (missing.length) bits.push(`${missing.length} element${missing.length > 1 ? 's are' : ' is'} missing — look at every shaded region.`);
    judge(!missing.length && !extra.length, bits.join(' '), () => { setChosen(wantList); setMarks({}); });
  };

  /* ---------------------------------------------------------- stage: more */
  const moreCounts = q?.ask === 'more' ? q.exprs.map((e) => countIn(regionsOf(e, sets), counts)) : [];
  const checkMore = () => {
    const vals = ['a', 'b', 'd'].map((k) => intOf(typed[k]));
    if (vals.some((v) => v == null)) { setMsg({ ok: false, text: 'Fill in all three boxes.' }); return; }
    const want = [moreCounts[0], moreCounts[1], moreCounts[0] - moreCounts[1]];
    setMarks(Object.fromEntries(['a', 'b', 'd'].map((k, i) => [k, vals[i] === want[i] ? 'good' : 'bad'])));
    const ok = vals.every((v, i) => v === want[i]);
    let why = 'Count each set in full, then subtract.';
    const onlyOf = (e) => {
      const rs = regionsOf(e, sets);
      return rs.length > 1 ? counts[rs.find((k) => [...k].filter((c) => c === '1').length === 1)] : null;
    };
    if (vals[0] !== want[0] && vals[0] === onlyOf(q.exprs[0])) why = `${vals[0]} is only the "${textOf(parseSet(q.exprs[0]), labels)} only" part. n(${textOf(parseSet(q.exprs[0]), labels)}) includes the middle too.`;
    else if (vals[1] !== want[1] && vals[1] === onlyOf(q.exprs[1])) why = `${vals[1]} is only the "${textOf(parseSet(q.exprs[1]), labels)} only" part. n(${textOf(parseSet(q.exprs[1]), labels)}) includes the middle too.`;
    else if (vals[0] === want[0] && vals[1] === want[1]) why = 'Both counts are right — now subtract the smaller from the bigger.';
    judge(ok, why, () => { setTyped({ a: String(want[0]), b: String(want[1]), d: String(want[2]) }); setMarks({ a: 'shown', b: 'shown', d: 'shown' }); });
  };

  /* ---------------------------------------------------------- stage: truth */
  const judged = q?.ask === 'truth' ? q.statements.map((st) => judgeStatement(st, sets, { elements, counts: elements ? null : counts, labels })) : [];
  const checkTruth = () => {
    if (judged.some((_, i) => truth[i] == null)) { setMsg({ ok: false, text: 'Decide true or false for every statement.' }); return; }
    const bad = judged.map((j, i) => (truth[i] !== j.truth ? i : -1)).filter((i) => i >= 0);
    setMarks(Object.fromEntries(judged.map((_, i) => [i, bad.includes(i) ? 'bad' : 'good'])));
    const why = bad.length ? `Look again at $${judged[bad[0]].latex}$: ${judged[bad[0]].reason}.${bad.length > 1 ? ` ${bad.length - 1} more ${bad.length === 2 ? 'is' : 'are'} wrong.` : ''}` : '';
    judge(!bad.length, why, () => { setTruth(Object.fromEntries(judged.map((j, i) => [i, j.truth]))); setMarks(Object.fromEntries(judged.map((_, i) => [i, 'shown']))); });
  };

  /* ---------------------------------------------------------- figure props per stage */
  // An elements diagram shows its elements, never a count beside them.
  let figure = item.kind === 'elements'
    ? { sets, labels, counts: null, elements, shaded: [], tone: 'pick' }
    : { sets, labels, counts, elements: null, shaded: [], tone: 'pick' };
  const live = itemDone ? null : stage;
  if (live === 'fill') {
    figure = {
      ...figure, hideCounts: true,
      overlay: (key) => (
        <NumBox value={typed[key]} width="w-14 sm:w-16" label={regionWords(key, sets, labels)} disabled={locked}
          state={marks[key]} onChange={(v) => { setTyped((t) => ({ ...t, [key]: v })); setMarks((mk) => ({ ...mk, [key]: undefined })); }} onEnter={checkFill} />
      ),
    };
  } else if (live === 'place') {
    figure = {
      ...figure, elements: placedBy(), counts: null,
      onRegion: locked ? undefined : tapRegionPlace,
      elementTone: (x) => (marks[x] === 'bad' ? 'bad' : null),
    };
  } else if (live === 'shade') {
    figure = { ...figure, shaded: locked ? part.regions : shade, tone: locked ? (msg?.ok ? 'good' : 'show') : 'pick', onRegion: locked ? undefined : toggleShade };
  } else if (['count', 'prob', 'list'].includes(live)) {
    figure = { ...figure, shaded: part.regions, tone: 'good' };
  }

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const ruleLine = item.kind === 'elements'
    ? [`\\mathscr{E} = \\{${universe.length > 8 ? `${universe[0]}, ${universe[1]}, ${universe[2]}, \\ldots, ${universe[universe.length - 1]}` : universe.join(', ')}\\}`,
      ...sets.map((s) => `${labels[s] || s} = \\{\\text{${ruleWords(item.rules[s])}}\\}`)]
    : [];

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-5 lg:items-start">
        {/* ── left: the stem and the diagram ── */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Blend className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">Venn diagram</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{Math.round(cleared * 10) / 10} / {items.length} {T.done}</div>
            </div>
            <div className="px-4 py-3 text-[15px] sm:text-base font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
              {parseInlineText(item.prompt)}
              {pos === 0 && pool?.intro && partIdx === 0 && stageIdx === 0 && !itemDone && (
                <p className="mt-1.5 text-sm font-bold text-slate-400">{pool.intro}</p>
              )}
              {ruleLine.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-slate-800 dark:text-slate-100">
                  {ruleLine.map((ln) => <span key={ln}><SafeInlineMath math={ln} /></span>)}
                </div>
              )}
            </div>
            <div className="px-3 pb-3 flex flex-wrap gap-1.5">
              {model.parts.map((p, i) => (
                <Stage key={p.id} icon={STAGE_ICON[p.stages[0]] || Hash} label={p.label} active={i === partIdx && !itemDone} done={i < partIdx || itemDone} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm p-2 sm:p-3">
            <VennFigure {...figure} />
          </div>
          {stage === 'shade' && !locked && (
            <p className="text-center text-xs font-bold text-slate-400 -mt-1">Tap a region to shade it. Tap it again to clear it.</p>
          )}
          {stage === 'place' && !locked && (
            <p className="text-center text-xs font-bold text-slate-400 -mt-1">Tap a number below, then tap the region it belongs in.</p>
          )}
        </div>

        {/* ── right: the stage ── */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && part && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              {q && (
                <div className="mb-3 pb-3 border-b-2 border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: INK }}>Question {part.label}</div>
                  <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">{parseInlineText(q.prompt)}</div>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {part.stages.map((s, i) => (
                  <Stage key={s} icon={STAGE_ICON[s]} label={T.stages[s]} active={i === stageIdx} done={i < stageIdx || (i === stageIdx && locked)} />
                ))}
              </div>

              {/* fill */}
              {stage === 'fill' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-2">Put a number in every region of the diagram. Start in the middle.</div>
                  <ul className="flex flex-col gap-1.5">
                    {item.facts.map((f, i) => (
                      <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{parseInlineText(f.say)}</span>
                        <span className="ml-auto text-slate-900 dark:text-slate-100"><SafeInlineMath math={`n(${L(f.expr)}) = ${f.n}`} /></span>
                      </li>
                    ))}
                  </ul>
                  {!locked && hints < (model.solve?.steps.length || 0) && (
                    <button onClick={() => setHints((h) => h + 1)} className="mt-3 text-xs font-black uppercase tracking-widest text-teal-700 dark:text-teal-300 hover:underline">
                      {hints ? 'Next step' : 'Where do I start?'}
                    </button>
                  )}
                  {hints > 0 && (
                    <ol className="mt-2 flex flex-col gap-1 list-decimal pl-5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {model.solve.steps.slice(0, hints).map((st, i) => <li key={i}>{st.say}</li>)}
                    </ol>
                  )}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={revealFill} onCheck={checkFill} onContinue={advance} />
                </>
              )}

              {/* place */}
              {stage === 'place' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3">Put every number in ℰ into its region.</div>
                  <div className="flex flex-wrap gap-2">
                    {universe.map((x) => (
                      <Chip key={x} x={x} on={selected === x} tone={marks[x]} disabled={locked}
                        tag={placement[x] ? (placement[x].includes('1') ? sets.filter((_, i) => placement[x][i] === '1').map((s) => labels[s] || s).join('∩') : 'out') : null}
                        onClick={() => { setSelected(x); setMsg(null); }} />
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={revealPlace} onCheck={checkPlace} onContinue={advance} />
                </>
              )}

              {/* notation */}
              {stage === 'notation' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3">Which notation says the same thing as the question?</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {part.options.map((o, i) => {
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-slate-100';
                      if (locked) {
                        if (o.correct) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                        else if (pick === i) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
                        else style = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                      return (
                        <button key={o.text} disabled={locked} onClick={() => pickNotation(i)}
                          className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-xl transition-all ${style}`}>
                          <SafeInlineMath math={wrap(q.ask, o.latex)} />
                        </button>
                      );
                    })}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {/* shade */}
              {stage === 'shade' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Shade <SafeInlineMath math={L(q.expr)} /> on the diagram.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">The notation is a picture. Shade the picture before you count anything.</p>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => setShade(part.regions))} onCheck={checkShade} onContinue={advance} canCheck={shade.length > 0} />
                </>
              )}

              {/* count */}
              {stage === 'count' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3">Add the numbers in the shaded region.</div>
                  <div className="flex flex-wrap items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`n(${L(q.expr)}) =`} />
                    <NumBox value={typed.count} state={marks.count} disabled={locked} onEnter={checkCount} label="count"
                      onChange={(v) => { setTyped({ count: v }); setMarks({}); }} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ count: String(wantCount) }); setMarks({ count: 'shown' }); })} onCheck={checkCount} onContinue={advance} />
                </>
              )}

              {/* prob */}
              {stage === 'prob' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3">Probability = the shaded count over everyone in ℰ.</div>
                  <div className="flex flex-wrap items-center gap-4 text-xl text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`P(${L(q.expr)}) =`} />
                    <div className="inline-flex flex-col items-center gap-1">
                      <NumBox value={typed.num} state={marks.num} disabled={locked} onEnter={checkProb} label="top"
                        onChange={(v) => { setTyped((t) => ({ ...t, num: v })); setMarks({}); }} />
                      <div className="h-[3px] w-24 rounded bg-slate-700 dark:bg-slate-300" />
                      <NumBox value={typed.den} state={marks.den} disabled={locked} onEnter={checkProb} label="bottom"
                        onChange={(v) => { setTyped((t) => ({ ...t, den: v })); setMarks({}); }} />
                    </div>
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ num: String(wantCount), den: String(total) }); setMarks({ num: 'shown', den: 'shown' }); })} onCheck={checkProb} onContinue={advance} />
                </>
              )}

              {/* list */}
              {stage === 'list' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3">Tap every element of <SafeInlineMath math={L(q.expr)} />.</div>
                  <div className="flex flex-wrap gap-2">
                    {universe.map((x) => <Chip key={x} x={x} on={chosen.includes(x)} tone={marks[x]} disabled={locked} onClick={() => toggleChip(x)} />)}
                  </div>
                  <div className="mt-3 text-lg text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`${L(q.expr)} = \\{${[...chosen].sort((a, b) => a - b).join(', ')}\\}`} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setChosen(wantList); setMarks({}); })} onCheck={checkList} onContinue={advance} />
                </>
              )}

              {/* more */}
              {stage === 'more' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3">Count each set in full, then find the difference.</div>
                  <div className="flex flex-col gap-2 text-xl text-slate-900 dark:text-slate-100">
                    {[['a', `n(${L(q.exprs[0])}) =`], ['b', `n(${L(q.exprs[1])}) =`], ['d', 'difference =']].map(([k, tex]) => (
                      <div key={k} className="flex items-center gap-3">
                        <span className="w-40 text-right"><SafeInlineMath math={tex === 'difference =' ? '\\text{difference} =' : tex} /></span>
                        <NumBox value={typed[k]} state={marks[k]} disabled={locked} onEnter={checkMore} label={k}
                          onChange={(v) => { setTyped((t) => ({ ...t, [k]: v })); setMarks((mk) => ({ ...mk, [k]: undefined })); }} />
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ a: String(moreCounts[0]), b: String(moreCounts[1]), d: String(moreCounts[0] - moreCounts[1]) }); setMarks({ a: 'shown', b: 'shown', d: 'shown' }); })} onCheck={checkMore} onContinue={advance} />
                </>
              )}

              {/* truth */}
              {stage === 'truth' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3">Read each statement off the diagram. True or false?</div>
                  <div className="flex flex-col gap-2">
                    {judged.map((j, i) => (
                      <div key={i} className={`flex flex-wrap items-center gap-3 rounded-xl border-2 px-3 py-2 ${marks[i] === 'bad' ? 'border-rose-300 bg-rose-50/60 dark:bg-rose-900/10' : marks[i] === 'good' ? 'border-[#58a700]/50 bg-[#d7ffb8]/30 dark:bg-lime-900/10' : 'border-slate-200 dark:border-slate-700'}`}>
                        <span className="text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={j.latex} /></span>
                        <div className="ml-auto flex gap-1.5">
                          {[true, false].map((v) => (
                            <button key={String(v)} disabled={locked} onClick={() => { setTruth((t) => ({ ...t, [i]: v })); setMarks((mk) => ({ ...mk, [i]: undefined })); setMsg(null); }}
                              className={`px-3 py-1.5 rounded-lg border-2 border-b-[4px] text-xs font-black uppercase tracking-widest transition-all ${truth[i] === v ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                              style={truth[i] === v ? { backgroundColor: v ? '#16a34a' : '#475569' } : undefined}>
                              {v ? 'True' : 'False'}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTruth(Object.fromEntries(judged.map((j, i) => [i, j.truth]))); setMarks(Object.fromEntries(judged.map((_, i) => [i, 'shown']))); })} onCheck={checkTruth} onContinue={advance} />
                </>
              )}
            </div>
          )}

          {/* ── done: the working, set for the book ── */}
          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: (results[item.id]?.score ?? 1) < 1 ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: (results[item.id]?.score ?? 1) < 1 ? AMBER : GREEN }}>
                {(results[item.id]?.score ?? 1) < 1 ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{(results[item.id]?.score ?? 1) < 1 ? T.helped : slipped ? T.slipped : T.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {T.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto flex flex-col gap-1">
                  {workingOf(item, model).map((ln, i) => (
                    ln.head ? <div key={i} className="mt-1 first:mt-0 text-xs font-black uppercase tracking-widest" style={{ color: INK }}>{ln.head}</div>
                      : ln.tex ? <div key={i} className="text-lg py-0.5"><SafeInlineMath math={ln.tex} /></div>
                        : <div key={i} className="text-sm font-semibold">{ln.text}</div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? T.finish : T.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {!itemDone && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 px-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: RED }} />
              A second wrong answer, or Show me, fills the step in and that part pays half.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
