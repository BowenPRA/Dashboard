import { useState, useMemo } from 'react';
import {
  CheckCircle2, XCircle, ArrowRight, Trophy, Construction, Eye, Minus, Plus,
  Split, Square, Scale,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Formula } from './chemWidgets';
import { deriveIonicItem, entryText, equationText, REACTION_KINDS } from '../utils/ionicEquation';

/* ------------------------------------------------------------------ *
 * SPECTATOR STRIKE — "write every ion, strike out the spectators."
 *
 * Coursebook spread 11.4 writes an ionic equation in three steps, and this
 * task is those steps with one added at the end:
 *
 *   1. SPLIT   decide which substances split into ions and which stay whole
 *   2. STRIKE  cross out the spectator ions — unchanged, on both sides
 *   3. TIDY    what is left is the ionic equation; write it in its simplest
 *              whole numbers
 *   4. NAME    say what kind of reaction it turned out to be
 *
 * Step 1 is where the marks are usually lost (water written as H⁺ and OH⁻, a
 * solid split, a gas split), so it is a decision the student makes for every
 * substance — the state symbol is the evidence. Step 4 is there because the
 * ionic equation is the ANSWER to "is this a neutralisation?": acid + metal
 * leaves no water behind, and the equation shows it.
 *
 * Nothing is compared against a stored answer. An item is the ordinary
 * balanced equation with state symbols; src/utils/ionicEquation.js finds the
 * ions, the spectators, the ionic equation and the kind of reaction, and
 * `checkIonicItems` refuses an item that does not balance for atoms and charge.
 *
 * Reads a unit's `ionicEq`:
 *   { title, items: [{ id, name, wordEquation,
 *       reactants: [{ formula: 'H2SO4', state: 'aq' }, { formula: 'NaOH', state: 'aq', coeff: 2 }],
 *       products:  [{ formula: 'Na2SO4', state: 'aq' }, { formula: 'H2O', state: 'l', coeff: 2 }],
 *       ionic: 'H⁺ + OH⁻ → H₂O',   // optional: a CHECK the validator holds the item to
 *       note }] }
 * A solid whose ions are to be written out (the book's insoluble base) carries
 * `split: true`.
 *
 * SCORING. An item is worth 1 when all four steps are cleared without the
 * answer being filled in, ½ when one was. The blob is { itemId: score }.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const ACID = '#c8102e';     // H⁺
const BASE = '#4338ca';     // OH⁻, O²⁻, CO₃²⁻ — what the acid reacts with
const WATER = '#2f8f5b';    // what they make
const GREY = '#64748b';

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';

const STAGES = ['split', 'strike', 'tidy', 'kind'];
const STAGE_NAME = { split: 'Split into ions', strike: 'Strike out spectators', tidy: 'What is left', kind: 'Name the reaction' };

const BASE_IONS = ['OH-', 'O2-', 'CO32-'];
const tint = (e) => (e.key === 'H+' ? ACID : BASE_IONS.includes(e.key) ? BASE : e.kind === 'whole' && ['H2O', 'CO2', 'H2'].includes(e.formula) ? WATER : '#1e293b');

/* ---- one substance or ion, set as chemistry ------------------------ */

function Entry({ e, coeff, struck, colour }) {
  const c = coeff ?? e.coeff;
  return (
    <span className={`inline-flex items-baseline ${struck ? 'opacity-45' : ''}`} style={{ color: struck ? GREY : colour || tint(e) }}>
      {c > 1 && <span className="font-mono font-black mr-[1px]">{c}</span>}
      <span className="relative inline-flex items-start">
        <Formula text={e.kind === 'ion' ? e.sym : e.formula} />
        {e.kind === 'ion' && (
          // Not <sup>: inside a flex row it is lifted twice and drifts off the symbol.
          <span className="font-mono font-black text-[0.62em] leading-none mt-[0.1em] ml-[1px]">
            {Math.abs(e.charge) > 1 ? Math.abs(e.charge) : ''}{e.charge > 0 ? '+' : '−'}
          </span>
        )}
        {struck && <span className="absolute left-[-3px] right-[-3px] top-[55%] h-[3px] rounded-full rotate-[-14deg]" style={{ backgroundColor: ACID }} />}
      </span>
      <span className="font-mono font-bold text-[0.72em] opacity-70">({e.state})</span>
    </span>
  );
}

const asEntry = (sp) => ({ kind: 'whole', formula: sp.formula, coeff: sp.coeff, state: sp.state, key: `${sp.formula}(${sp.state})`, charge: 0 });

const Plus2 = () => <span className="font-black text-slate-400 text-lg">+</span>;
const Arrow = () => <span className="font-black text-slate-400 text-xl mx-1">→</span>;

/** The equation as a wrapping row: left side, arrow, right side. */
function Row({ left, right, render }) {
  const side = (list, where) => list.map((e, i) => (
    <span key={`${where}${i}`} className="inline-flex items-center gap-2">
      {i > 0 && <Plus2 />}
      {render(e, where, i)}
    </span>
  ));
  return (
    <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-3">
      {side(left, 'L')}<Arrow />{side(right, 'R')}
    </div>
  );
}

/* ---- the task ------------------------------------------------------ */

const blank = () => ({ split: {}, struck: {}, coeffs: null, kind: null });

export default function SpectatorStrike({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && it?.reactants && it?.products), [pool]);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [stageAt, setStageAt] = useState(0);
  const [work, setWork] = useState(blank);
  const [marks, setMarks] = useState({});
  const [wrongs, setWrongs] = useState(0);
  const [locked, setLocked] = useState(false);
  const [msg, setMsg] = useState(null);
  const [helped, setHelped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const d = useMemo(() => {
    if (!item) return null;
    try { return deriveIonicItem(item); } catch { return null; }
  }, [item]);

  if (!items.length || !d) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No equations yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const stage = STAGES[stageAt];
  const at = itemDone ? STAGES.length : stageAt;
  const past = (s) => at > STAGES.indexOf(s) || (stage === s && locked);

  const L = d.species.filter((s) => s.where === 'L');
  const R = d.species.filter((s) => s.where === 'R');
  const netAll = [...d.net.left.map((e) => ({ ...e, slot: `L:${e.key}` })), ...d.net.right.map((e) => ({ ...e, slot: `R:${e.key}` }))];
  const coeffs = work.coeffs || Object.fromEntries(netAll.map((e) => [e.slot, e.coeff]));
  const chargeOf = (list, where) => list.reduce((s, e) => s + e.charge * (coeffs[`${where}:${e.key}`] ?? e.coeff), 0);
  const showCharge = (n) => (n === 0 ? '0' : `${Math.abs(n)}${n > 0 ? '+' : '−'}`);

  /* ------------------------------------------------------------ flow */
  const clearStage = () => { setMarks({}); setWrongs(0); setLocked(false); setMsg(null); };

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  const settle = (ok, good, bad, newMarks) => {
    setMarks(newMarks || {});
    if (ok) { setLocked(true); setMsg({ ok: true, text: good }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    if (n >= 2) { setLocked(true); setHelped(true); setMsg({ shown: true, text: `${bad} The answer is filled in for you.` }); }
    else setMsg({ ok: false, text: bad });
  };
  const showMe = () => { setLocked(true); setHelped(true); setMarks({}); setMsg({ shown: true, text: 'Filled in for you. Read it through before you go on.' }); };

  const checkSplit = () => {
    const m = {};
    let bad = null;
    for (const s of d.species) {
      const ok = work.split[s.id] === (s.splits ? 'ions' : 'whole');
      m[s.id] = ok;
      if (!ok && !bad) bad = s;
    }
    if (!bad) { settle(true, 'Right. Only substances that are dissolved AND made of ions are written as ions. Everything else stays whole.', '', m); return; }
    settle(false, '', `Look again at ${entryText(asEntry({ ...bad, coeff: 1 }))}. ${bad.why}`, m);
  };

  const checkStrike = () => {
    const m = {};
    let bad = null;
    for (const [where, list] of [['L', d.full.left], ['R', d.full.right]]) {
      const other = where === 'L' ? d.full.right : d.full.left;
      for (const e of list) {
        const slot = `${where}:${e.key}`;
        const should = e.kind === 'ion' && d.spectators.includes(e.key);
        const did = !!work.struck[slot];
        m[slot] = should === did;
        if (should !== did && !bad) {
          if (did && e.kind === 'whole') bad = `${entryText(e)} is not an ion, and it is only on one side. It stays.`;
          else if (did && !other.some((o) => o.key === e.key)) bad = `${entryText({ ...e, coeff: 1 }, false)} is on the ${where === 'L' ? 'left' : 'right'} but NOT on the ${where === 'L' ? 'right' : 'left'}: it has changed. It took part in the reaction, so it stays.`;
          else bad = `${entryText({ ...e, coeff: 1 }, false)} is on both sides and has not changed. It is a spectator — strike it out on BOTH sides.`;
        }
      }
    }
    if (!bad) { settle(true, `The spectator ions are out: ${d.spectators.map((k) => entryText({ ...d.full.left.find((e) => e.key === k), coeff: 1 }, false)).join(' and ')}. They were there at the start and they are still there at the end.`, '', m); return; }
    settle(false, '', bad, m);
  };

  const checkTidy = () => {
    const want = Object.fromEntries([...d.ionic.left.map((e) => [`L:${e.key}`, e.coeff]), ...d.ionic.right.map((e) => [`R:${e.key}`, e.coeff])]);
    const m = {};
    let ok = true;
    for (const e of netAll) { m[e.slot] = coeffs[e.slot] === want[e.slot]; ok = ok && m[e.slot]; }
    if (ok) { settle(true, d.factor > 1 ? `Every number divided by ${d.factor}. The ionic equation is ${equationText(d.ionic)}.` : `It was already in its simplest form. The ionic equation is ${equationText(d.ionic)}.`, '', m); return; }
    const vals = netAll.map((e) => coeffs[e.slot]);
    const ratioKept = netAll.every((e) => coeffs[e.slot] * d.net.left[0].coeff === e.coeff * coeffs[`L:${d.net.left[0].key}`]);
    let bad;
    if (ratioKept) {
      const g = vals.reduce((a, b) => { let x = a, y = b; while (y) [x, y] = [y, x % y]; return x; }, 0);
      bad = `It balances, but every number can still be divided by ${g}. An ionic equation is written with the smallest whole numbers.`;
    } else if (chargeOf(d.net.left, 'L') !== chargeOf(d.net.right, 'R')) {
      bad = `The charges no longer balance: ${showCharge(chargeOf(d.net.left, 'L'))} on the left, ${showCharge(chargeOf(d.net.right, 'R'))} on the right. Change every number by the same factor.`;
    } else bad = 'The atoms no longer balance. Change every number by the same factor, so the equation stays true.';
    settle(false, '', bad, m);
  };

  const KIND_WHY = {
    neutralisation: 'Hydrogen ions from the acid joined with ions from the base to make WATER. A reaction with acid that gives water is a neutralisation.',
    metal: 'Hydrogen GAS formed, and no water. The metal has pushed hydrogen out of the acid — so this is not a neutralisation.',
    carbonate: 'Water AND carbon dioxide formed. That pair is the mark of an acid reacting with a carbonate.',
    precipitation: 'Two ions that were free in solution joined to make a SOLID. That is precipitation.',
    displacement: 'One element went into solution as ions and pushed the other out as the element. That is displacement.',
  };
  const kindOptions = [...new Set(['neutralisation', 'metal', 'carbonate', 'precipitation', d.kind])].filter(Boolean);

  const pickKind = (k) => {
    if (locked) return;
    setWork((w) => ({ ...w, kind: k }));
    if (k === d.kind) { settle(true, KIND_WHY[d.kind], '', { [k]: true }); return; }
    settle(false, '', `Look at what is left: ${equationText(d.ionic)}. ${KIND_WHY[d.kind].split('. ')[0]}.`, { ...marks, [k]: false });
  };

  const check = () => {
    if (stage === 'split') checkSplit();
    else if (stage === 'strike') checkStrike();
    else if (stage === 'tidy') checkTidy();
  };

  const advance = () => {
    if (stageAt < STAGES.length - 1) { setStageAt(stageAt + 1); clearStage(); return; }
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    clearStage();
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const goNext = () => { setPos((p) => p + 1); setStageAt(0); setWork(blank()); setHelped(false); setItemDone(false); clearStage(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const ready = stage === 'split' ? d.species.every((s) => work.split[s.id])
    : stage === 'strike' ? Object.values(work.struck).some(Boolean)
      : stage === 'tidy';

  const isLast = pos >= items.length - 1;
  const clearedCount = items.filter((it) => results[it.id]?.score === 1).length;

  /* ---------------------------------------------------------- panels */
  const ring = (ok) => (ok === false ? 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30' : ok === true ? 'border-[#58a700]' : 'border-slate-200 dark:border-slate-700');
  const card = (s, title, Icon, children) => {
    const open = at >= STAGES.indexOf(s);
    const now = !itemDone && stage === s;
    return (
      <div className={`rounded-2xl border-2 bg-white dark:bg-slate-900 p-4 transition-opacity ${open ? '' : 'opacity-40'} ${now ? 'shadow-sm' : 'border-slate-200 dark:border-slate-700'}`}
        style={now ? { borderColor: INK } : undefined}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${past(s) ? 'bg-[#58cc02] text-white' : now ? 'text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
            style={now && !past(s) ? { backgroundColor: INK } : undefined}>{past(s) ? '✓' : STAGES.indexOf(s) + 1}</span>
          <Icon className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">{title}</span>
        </div>
        {open && children}
      </div>
    );
  };

  const splitTile = (s) => {
    const mine = past('split') ? (s.splits ? 'ions' : 'whole') : work.split[s.id];
    return (
      <div className={`rounded-xl border-2 px-2.5 pt-2 pb-2 flex flex-col items-center gap-2 bg-white ${ring(stage === 'split' ? marks[s.id] : undefined)}`}>
        <span className="text-xl"><Entry e={asEntry(s)} colour="#1e293b" /></span>
        <div className="flex rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-wider">
          {[['whole', 'stays whole'], ['ions', 'splits']].map(([v, label]) => (
            <button key={v} type="button" disabled={past('split')} onClick={() => setWork((w) => ({ ...w, split: { ...w.split, [s.id]: v } }))}
              className={`px-2 py-1.5 ${mine === v ? 'text-white' : 'bg-white dark:bg-slate-950 text-slate-500'}`}
              style={mine === v ? { backgroundColor: v === 'ions' ? INK : GREY } : undefined}>{label}</button>
          ))}
        </div>
      </div>
    );
  };

  const strikeTile = (e, where) => {
    const slot = `${where}:${e.key}`;
    const struck = past('strike') ? e.kind === 'ion' && d.spectators.includes(e.key) : !!work.struck[slot];
    return (
      <button type="button" disabled={past('strike') || stage !== 'strike'}
        onClick={() => setWork((w) => ({ ...w, struck: { ...w.struck, [slot]: !w.struck[slot] } }))}
        className={`rounded-xl border-2 px-2.5 py-2 text-xl bg-white transition-all ${stage === 'strike' && !locked ? 'hover:border-violet-500 active:scale-95' : ''} ${ring(stage === 'strike' ? marks[slot] : undefined)}`}>
        <Entry e={e} struck={struck} />
      </button>
    );
  };

  const tidyTile = (e, where) => {
    const slot = `${where}:${e.key}`;
    const final = past('tidy');
    const want = (where === 'L' ? d.ionic.left : d.ionic.right).find((x) => x.key === e.key).coeff;
    const c = final ? want : coeffs[slot];
    return (
      <div className={`rounded-xl border-2 px-2 py-1.5 flex flex-col items-center gap-1 bg-white ${ring(stage === 'tidy' ? marks[slot] : undefined)}`}>
        <span className="text-xl"><Entry e={e} coeff={c} /></span>
        {!final && stage === 'tidy' && (
          <div className="flex items-center gap-1">
            <button type="button" aria-label="smaller number" onClick={() => setWork((w) => ({ ...w, coeffs: { ...coeffs, [slot]: Math.max(1, c - 1) } }))}
              className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center"><Minus className="w-4 h-4" strokeWidth={3} /></button>
            <span className="w-5 text-center text-sm font-black text-slate-700 dark:text-slate-200">{c}</span>
            <button type="button" aria-label="bigger number" onClick={() => setWork((w) => ({ ...w, coeffs: { ...coeffs, [slot]: Math.min(6, c + 1) } }))}
              className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center"><Plus className="w-4 h-4" strokeWidth={3} /></button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || 'Spectator Strike'} current={pos + (itemDone ? 1 : 0)} total={items.length} />

      <div className="flex-1 w-full max-w-4xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {STAGES.map((s, i) => {
              const done = itemDone || i < stageAt;
              const now = !itemDone && i === stageAt;
              return (
                <div key={s} className={`flex items-center gap-1.5 rounded-full border-2 pl-1 pr-3 py-0.5 text-[11px] font-black
                  ${now ? 'text-white' : done ? 'border-[#58a700] text-[#3e7500] dark:text-lime-400 bg-white dark:bg-slate-900' : 'border-slate-200 dark:border-slate-700 text-slate-400 bg-white dark:bg-slate-900'}`}
                  style={now ? { backgroundColor: INK, borderColor: INK } : undefined}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${now ? 'bg-white/25' : done ? 'bg-[#58cc02] text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{done ? '✓' : i + 1}</span>
                  <span className={now ? '' : 'hidden sm:inline'}>{STAGE_NAME[s]}</span>
                </div>
              );
            })}
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">{clearedCount} / {items.length} first time</div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-4 py-3">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Reaction {pos + 1} of {items.length}</div>
          <div className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">{item.name}</div>
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.wordEquation}</div>
        </div>

        {card('split', 'Which substances split into ions?', Split, (
          <>
            <Row left={L} right={R} render={(s) => splitTile(s)} />
            <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400 text-center">
              The state symbol is your evidence: (aq) dissolved in water · (s) solid · (l) liquid · (g) gas.
            </p>
          </>
        ))}

        {card('strike', 'Every ion written out — strike out the spectators', Square, (
          <>
            <Row left={d.full.left} right={d.full.right} render={(e, where) => strikeTile(e, where)} />
            <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400 text-center">
              A spectator ion is on BOTH sides, unchanged. Tap it on the left and on the right.
            </p>
          </>
        ))}

        {card('tidy', 'What is left is the ionic equation', Scale, (
          <>
            <Row left={d.net.left} right={d.net.right} render={(e, where) => tidyTile(e, where)} />
            <div className="mt-3 flex items-center justify-center gap-3 text-xs font-black text-slate-500 dark:text-slate-400">
              <span>charge on the left <span className="text-slate-800 dark:text-slate-100">{showCharge(past('tidy') ? d.ionic.left.reduce((s, e) => s + e.charge * e.coeff, 0) : chargeOf(d.net.left, 'L'))}</span></span>
              <span className="text-slate-300">|</span>
              <span>charge on the right <span className="text-slate-800 dark:text-slate-100">{showCharge(past('tidy') ? d.ionic.right.reduce((s, e) => s + e.charge * e.coeff, 0) : chargeOf(d.net.right, 'R'))}</span></span>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400 text-center">
              Use the smallest whole numbers that keep it balanced. If it is already as simple as it can be, just check it.
            </p>
          </>
        ))}

        {card('kind', 'What kind of reaction is it?', CheckCircle2, (
          <div className="grid sm:grid-cols-2 gap-2">
            {kindOptions.map((k) => {
              const right = past('kind') && k === d.kind;
              const wrong = marks[k] === false;
              return (
                <button key={k} type="button" disabled={past('kind') || wrong || stage !== 'kind'} onClick={() => pickKind(k)}
                  className={`text-left rounded-xl border-2 px-3 py-2.5 text-sm font-black transition-all
                    ${right ? 'text-white' : wrong ? 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30 text-slate-400 line-through'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:border-violet-500'}`}
                  style={right ? { backgroundColor: '#3e7500', borderColor: 'transparent' } : undefined}>{REACTION_KINDS[k]}</button>
              );
            })}
          </div>
        ))}

        {msg && !itemDone && (
          <div className={`flex items-start gap-2 rounded-xl border-2 p-3 ${msg.ok ? 'border-[#58a700] bg-lime-50 dark:bg-lime-950/30' : msg.shown ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' : 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30'}`}>
            {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#3e7500]" strokeWidth={2.5} />
              : msg.shown ? <Eye className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" strokeWidth={2.5} />
                : <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#ff4b4b]" strokeWidth={2.5} />}
            <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{msg.text}</div>
          </div>
        )}
        {itemDone && (
          <div className="flex items-start gap-2 rounded-xl border-2 border-[#58a700] bg-lime-50 dark:bg-lime-950/30 p-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#3e7500]" strokeWidth={2.5} />
            <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">
              {equationText(d.ionic)} <span className="font-bold block mt-0.5">{item.note}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          {!itemDone && !locked && stage !== 'kind' ? (
            <button type="button" onClick={showMe} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Show me</button>
          ) : <span />}
          {itemDone ? (
            isLast ? (
              <button onClick={finish} className={`px-6 py-3 text-sm text-white bg-[#58cc02] border-[#3e7500] flex items-center gap-2 ${btn}`}>
                <Trophy className="w-4 h-4" strokeWidth={3} /> Finish
              </button>
            ) : (
              <button onClick={goNext} className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                Next reaction <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </button>
            )
          ) : locked ? (
            <button onClick={advance} className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
              {stageAt < STAGES.length - 1 ? 'Next step' : 'Done'} <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          ) : stage !== 'kind' ? (
            <button onClick={check} disabled={!ready}
              className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${ready ? btn : 'rounded-xl font-black uppercase tracking-widest bg-slate-300 dark:bg-slate-700 cursor-not-allowed'}`}
              style={ready ? { backgroundColor: INK, borderColor: INK_DARK } : undefined}>
              <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> Check
            </button>
          ) : <span className="text-xs font-bold text-slate-400">Tap your answer</span>}
        </div>
      </div>
    </div>
  );
}
