import { useState, useMemo } from 'react';
import {
  CheckCircle2, XCircle, ArrowRight, Trophy, Construction, Eye, Minus, Plus,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Formula, EquationSide } from './chemWidgets';
import { deriveTitration, near, show } from '../utils/titration';

/* ------------------------------------------------------------------ *
 * TITRATION BENCH — "start from the solution you know."
 *
 * Coursebook spread 11.8 finds a concentration in four steps, and this task is
 * those steps with the two that come before them written in:
 *
 *   ·  READ the burette          final reading − initial reading
 *   ·  CHANGE cm³ to dm³         ÷ 1000
 *   1  MOLES of the solution you know      concentration × volume
 *   2  the RATIO from the equation
 *   3  MOLES of the other solution
 *   4  its CONCENTRATION                   moles ÷ volume in dm³
 *
 * The working builds up line by line on the right, the way it is set out on
 * paper, so by step 4 the student is looking at a complete written answer they
 * made. Each wrong answer is answered by name: the volume left in cm³, the
 * ratio used upside down, the division done the wrong way round.
 *
 * Nothing is compared against a stored answer. An item is the titration as a
 * question gives it; src/utils/titration.js derives the titre, the moles, the
 * ratio and the answer, and `checkTitrationItems` refuses an item whose
 * equation does not balance.
 *
 * Reads a unit's `titration`:
 *   { title, items: [{ id, name, context,
 *       equation: { reactants: [{ formula: 'H2SO4' }, { formula: 'KOH', coeff: 2 }],
 *                   products:  [{ formula: 'K2SO4' }, { formula: 'H2O', coeff: 2 }] },
 *       flask:   { formula: 'KOH', name: 'potassium hydroxide', volume: 25, conc: 0.2 },
 *       burette: { formula: 'H2SO4', name: 'sulfuric acid', initial: 2.3, final: 14.8 },
 *       indicator: { name: 'methyl orange', from: 'yellow', to: 'red' },
 *       answer: 0.2,   // optional: a CHECK the validator holds the item to
 *       note }] }
 * Leave out the concentration that is to be found. Give BOTH concentrations and
 * no burette readings, and the task asks for the volume needed instead.
 *
 * SCORING. An item is worth 1 when every step is cleared without the answer
 * being filled in, ½ when one was. The blob is { itemId: score }.
 * ------------------------------------------------------------------ */

const INK = '#0e7490';
const INK_DARK = '#155e75';
const KNOWN = '#1d4ed8';
const UNKNOWN = '#c2410c';

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';
const FONT = 'Inter, system-ui, sans-serif';

const TINT = {
  blue: '#93c5fd', colourless: '#f1f5f9', yellow: '#fde047', red: '#f87171',
  pink: '#f9a8d4', orange: '#fdba74', purple: '#c4b5fd', green: '#86efac',
};

const num = (s) => {
  const t = String(s ?? '').replace(/[\s,]/g, '').replace(/−/g, '-');
  if (t === '' || !/^-?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
  return Number(t);
};

/* ---- the rig -------------------------------------------------------- */

function Rig({ item, d, done }) {
  const W = 300, H = 380;
  const top = 26, bot = 236;                       // the burette's 0 and 50 marks
  const yOf = (v) => top + (v / 50) * (bot - top);
  const ini = d.hasReadings ? item.burette.initial : 0;
  const fin = d.hasReadings ? item.burette.final : null;
  const level = done && fin != null ? fin : ini;
  const flaskFill = TINT[done ? item.indicator.to : item.indicator.from] || '#e2e8f0';
  const T = (p) => ({ fontFamily: FONT, fontWeight: 700, ...p });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[380px]" role="img"
      aria-label={`A burette of ${item.burette.name} above a flask of ${item.flask.name}`}>
      <rect width={W} height={H} rx="14" fill="#ffffff" />

      {/* burette */}
      <rect x="62" y={top - 14} width="22" height={bot - top + 28} rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
      <rect x="64" y={yOf(level)} width="18" height={bot + 12 - yOf(level)} fill="#bae6fd" />
      {[0, 10, 20, 30, 40, 50].map((v) => (
        <g key={v}>
          <line x1="84" y1={yOf(v)} x2="94" y2={yOf(v)} stroke="#64748b" strokeWidth="1.6" />
          <text x="98" y={yOf(v) + 4} fontSize="10.5" fill="#64748b" {...T()}>{v}</text>
        </g>
      ))}
      {[5, 15, 25, 35, 45].map((v) => <line key={v} x1="84" y1={yOf(v)} x2="90" y2={yOf(v)} stroke="#94a3b8" strokeWidth="1.2" />)}
      <path d={`M 73 ${bot + 14} L 73 ${bot + 40}`} stroke="#64748b" strokeWidth="5" />
      <rect x="60" y={bot + 20} width="26" height="7" rx="3" fill="#334155" />

      {d.hasReadings && (
        <g>
          <line x1="40" y1={yOf(ini)} x2="62" y2={yOf(ini)} stroke={INK} strokeWidth="2" />
          <text x="36" y={yOf(ini) + 4} textAnchor="end" fontSize="11" fill={INK} {...T({ fontWeight: 800 })}>{show(ini)}</text>
          <line x1="40" y1={yOf(fin)} x2="62" y2={yOf(fin)} stroke={INK} strokeWidth="2" strokeDasharray={done ? undefined : '4 3'} />
          <text x="36" y={yOf(fin) + 4} textAnchor="end" fontSize="11" fill={INK} {...T({ fontWeight: 800 })}>{show(fin)}</text>
        </g>
      )}

      {/* flask */}
      <path d="M 60 292 L 86 292 L 86 312 L 124 364 Q 128 372 118 372 L 28 372 Q 18 372 22 364 L 60 312 Z"
        fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 44 336 L 102 336 L 121 363 Q 124 369 117 369 L 29 369 Q 22 369 25 363 Z" fill={flaskFill} stroke="none" />
      {!done && <circle cx="73" cy="283" r="3" fill="#bae6fd" />}

      {/* labels */}
      <text x="140" y="34" fontSize="10" fill="#94a3b8" {...T({ fontWeight: 800, letterSpacing: 1.2 })}>IN THE BURETTE</text>
      <text x="140" y="52" fontSize="13.5" fill="#1e293b" {...T({ fontWeight: 800 })}>{item.burette.name}</text>
      <text x="140" y="70" fontSize="12" fill={d.known.where === 'burette' ? KNOWN : UNKNOWN} {...T()}>
        {Number.isFinite(item.burette.conc) ? `${show(item.burette.conc)} mol/dm³` : 'concentration ?'}
      </text>
      {d.hasReadings && (
        <>
          <text x="140" y="90" fontSize="11.5" fill="#475569" {...T()}>{`start ${show(ini)} cm³`}</text>
          <text x="140" y="106" fontSize="11.5" fill="#475569" {...T()}>{`end ${show(fin)} cm³`}</text>
        </>
      )}
      {d.mode === 'volume' && <text x="140" y="90" fontSize="11.5" fill={UNKNOWN} {...T()}>volume needed ?</text>}

      <text x="140" y="296" fontSize="10" fill="#94a3b8" {...T({ fontWeight: 800, letterSpacing: 1.2 })}>IN THE FLASK</text>
      <text x="140" y="314" fontSize="13.5" fill="#1e293b" {...T({ fontWeight: 800 })}>{item.flask.name}</text>
      <text x="140" y="332" fontSize="12" fill="#475569" {...T()}>{`${show(item.flask.volume)} cm³`}</text>
      <text x="140" y="348" fontSize="12" fill={d.known.where === 'flask' ? KNOWN : UNKNOWN} {...T()}>
        {Number.isFinite(item.flask.conc) ? `${show(item.flask.conc)} mol/dm³` : 'concentration ?'}
      </text>
      <text x="140" y="366" fontSize="10.5" fill="#64748b" {...T()}>{`${item.indicator.name}: ${item.indicator.from} → ${item.indicator.to}`}</text>
    </svg>
  );
}

/* ---- the task ------------------------------------------------------ */

const blank = () => ({ typed: {}, ratio: { known: 1, unknown: 1 } });

export default function TitrationBench({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && it?.flask && it?.burette && it?.equation), [pool]);

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
    try { return deriveTitration(item); } catch { return null; }
  }, [item]);

  if (!items.length || !d) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No titrations yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const K = d.known, U = d.unknown;
  const conc = d.mode === 'conc';

  /* The lines of working, in order. Each has the boxes it asks for. */
  const stages = [
    d.hasReadings && {
      key: 'titre', tag: 'Read the burette', title: `Volume of ${item.burette.name} used`,
      hint: 'final reading − initial reading',
      say: `${show(item.burette.final)} − ${show(item.burette.initial)} = ${show(d.titre)} cm³`,
      boxes: [{ k: 'titre', want: d.titre, unit: 'cm³' }],
    },
    {
      key: 'dm3', tag: 'cm³ to dm³', title: 'Change the volumes into dm³',
      hint: '1000 cm³ = 1 dm³, so divide by 1000',
      say: '1000 cm³ = 1 dm³, so each volume is divided by 1000',
      boxes: [
        { k: 'vk', want: d.volKnown, unit: 'dm³', label: `${show(K.volume)} cm³ of ${K.name}`, from: K.volume },
        conc && { k: 'vu', want: d.volUnknown, unit: 'dm³', label: `${show(U.volume)} cm³ of ${U.name}`, from: U.volume },
      ].filter(Boolean),
    },
    {
      key: 'n1', tag: 'Step 1', title: `Moles of ${K.name} — the solution you know`,
      hint: 'moles = concentration × volume in dm³',
      say: `${show(K.conc)} × ${show(d.volKnown)} = ${show(d.molesKnown)} mol`,
      boxes: [{ k: 'n1', want: d.molesKnown, unit: 'mol' }],
    },
    { key: 'ratio', tag: 'Step 2', title: 'The ratio, from the equation', hint: 'Read the numbers in front of the two formulae.', say: 'from the numbers in front of the two formulae' },
    {
      key: 'n2', tag: 'Step 3', title: `Moles of ${U.name}`,
      hint: `${d.ratio.known} mol of ${K.name} reacts with ${d.ratio.unknown} mol of ${U.name}`,
      say: `${d.ratio.known} : ${d.ratio.unknown}, so ${show(d.molesKnown)} mol of ${K.name} reacts with ${show(d.molesUnknown)} mol`,
      boxes: [{ k: 'n2', want: d.molesUnknown, unit: 'mol' }],
    },
    conc ? {
      key: 'answer', tag: 'Step 4', title: `Concentration of the ${U.name}`,
      hint: 'concentration = moles ÷ volume in dm³',
      say: `${show(d.molesUnknown)} ÷ ${show(d.volUnknown)} = ${show(d.answer)} mol/dm³`,
      boxes: [{ k: 'ans', want: d.answer, unit: 'mol/dm³' }],
    } : {
      key: 'answer', tag: 'Step 4', title: `Volume of ${U.name} needed`,
      hint: 'volume = moles ÷ concentration. That gives dm³ — answer in cm³.',
      say: `${show(d.molesUnknown)} ÷ ${show(U.conc)} = ${show(d.volUnknown)} dm³ = ${show(d.answer)} cm³`,
      boxes: [{ k: 'ans', want: d.answer, unit: 'cm³' }],
    },
  ].filter(Boolean);

  const stage = stages[stageAt];

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
    if (n >= 2) { setLocked(true); setHelped(true); setMsg({ shown: true, text: `${bad} The line is filled in for you.` }); }
    else setMsg({ ok: false, text: bad });
  };
  const showMe = () => { setLocked(true); setHelped(true); setMarks({}); setMsg({ shown: true, text: `Filled in: ${stage.say}.` }); };

  /** The sentence for a wrong number: name the slip if it is one we know. */
  const diagnose = (key, v) => {
    if (key === 'titre') {
      if (near(v, item.burette.final)) return `${show(item.burette.final)} is where the level FINISHED. The burette did not start at zero — take the first reading away.`;
      if (near(v, item.burette.final + item.burette.initial)) return 'You added the two readings. The volume used is the DIFFERENCE between them.';
      return 'The volume used is the final reading minus the initial reading.';
    }
    if (key === 'vk' || key === 'vu') {
      const from = key === 'vk' ? K.volume : U.volume;
      if (near(v, from)) return `${show(from)} is still in cm³. Divide by 1000 to get dm³.`;
      if (near(v, from * 1000)) return 'You multiplied by 1000. A dm³ is BIGGER than a cm³, so the number must get smaller: divide.';
      if (near(v, from / 100) || near(v, from / 10)) return 'There are 1000 cm³ in 1 dm³ — move the decimal point THREE places to the left.';
      return `Divide ${show(from)} by 1000.`;
    }
    if (key === 'n1') {
      if (near(v, K.conc * K.volume)) return `You used the volume in cm³. Use ${show(d.volKnown)} dm³, or the answer is 1000 times too big.`;
      if (near(v, K.conc / d.volKnown) || near(v, d.volKnown / K.conc)) return 'That is a division. Moles = concentration × volume: multiply.';
      return `Multiply the concentration by the volume in dm³: ${show(K.conc)} × ${show(d.volKnown)}.`;
    }
    if (key === 'n2') {
      if (d.ratio.known !== d.ratio.unknown && near(v, d.molesKnown)) return `That is the moles of ${K.name}. The ratio is not 1 : 1 — ${d.ratio.known} of ${K.name} reacts with ${d.ratio.unknown} of ${U.name}.`;
      if (near(v, (d.molesKnown * d.ratio.known) / d.ratio.unknown)) return `The ratio is upside down. There is ${d.ratio.unknown > d.ratio.known ? 'MORE' : 'LESS'} ${U.name} than ${K.name}, so ${d.ratio.unknown > d.ratio.known ? 'multiply' : 'divide'} by ${Math.max(d.ratio.known, d.ratio.unknown) / Math.min(d.ratio.known, d.ratio.unknown)}.`;
      return `${d.ratio.known} mol of ${K.name} reacts with ${d.ratio.unknown} mol of ${U.name}. Scale ${show(d.molesKnown)} mol by that ratio.`;
    }
    if (conc) {
      if (near(v, d.molesUnknown * d.volUnknown)) return 'You multiplied. Concentration = moles ÷ volume: divide.';
      if (near(v, d.volUnknown / d.molesUnknown)) return 'That is volume ÷ moles — upside down. The moles go on top.';
      if (near(v, d.molesUnknown / d.volKnown) && !near(d.volKnown, d.volUnknown)) return `You divided by the volume of the ${K.name}. Use the volume of the ${U.name}: ${show(d.volUnknown)} dm³.`;
      if (near(v, d.molesUnknown / U.volume)) return `You divided by the volume in cm³. Use ${show(d.volUnknown)} dm³.`;
      return `Divide the moles by the volume in dm³: ${show(d.molesUnknown)} ÷ ${show(d.volUnknown)}.`;
    }
    if (near(v, d.volUnknown)) return `${show(d.volUnknown)} is the volume in dm³. The burette is marked in cm³ — multiply by 1000.`;
    if (near(v, d.molesUnknown * U.conc * 1000) || near(v, d.molesUnknown * U.conc)) return 'You multiplied. Volume = moles ÷ concentration: divide.';
    return `Divide the moles by the concentration, then change dm³ to cm³: ${show(d.molesUnknown)} ÷ ${show(U.conc)} × 1000.`;
  };

  const check = () => {
    if (stage.key === 'ratio') {
      const okK = work.ratio.known === d.ratio.known;
      const okU = work.ratio.unknown === d.ratio.unknown;
      if (okK && okU) { settle(true, `${d.ratio.known} mol of ${K.name} reacts with ${d.ratio.unknown} mol of ${U.name}.`, '', { rk: true, ru: true }); return; }
      const swapped = work.ratio.known === d.ratio.unknown && work.ratio.unknown === d.ratio.known;
      settle(false, '', swapped
        ? 'Those are the right two numbers, the wrong way round. Match each number to the formula it stands in front of.'
        : 'Look at the equation: the number in front of each formula is how many moles of it react. No number means 1.', { rk: okK, ru: okU });
      return;
    }
    const m = {};
    let bad = null;
    for (const b of stage.boxes) {
      const v = num(work.typed[b.k]);
      m[b.k] = near(v, b.want);
      if (!m[b.k] && !bad) bad = diagnose(b.k, v);
    }
    if (!bad) { settle(true, `Right: ${stage.say}.`, '', m); return; }
    settle(false, '', bad, m);
  };

  const advance = () => {
    if (stageAt < stages.length - 1) { setStageAt(stageAt + 1); clearStage(); return; }
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

  const ready = stage.key === 'ratio' || stage.boxes.every((b) => String(work.typed[b.k] ?? '').trim() !== '');
  const isLast = pos >= items.length - 1;
  const clearedCount = items.filter((it) => results[it.id]?.score === 1).length;
  const bump = (side, by) => setWork((w) => ({ ...w, ratio: { ...w.ratio, [side]: Math.max(1, Math.min(6, w.ratio[side] + by)) } }));

  const ratioBox = (side, sp, colour, ok) => (
    <div className={`rounded-xl border-2 px-2 py-1.5 flex items-center gap-2 bg-white dark:bg-slate-950 ${ok === false ? 'border-[#ff4b4b]' : 'border-slate-200 dark:border-slate-700'}`}>
      <button type="button" aria-label={`fewer ${sp.name}`} onClick={() => bump(side, -1)} className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center"><Minus className="w-4 h-4" strokeWidth={3} /></button>
      <span className="w-5 text-center text-lg font-black" style={{ color: colour }}>{work.ratio[side]}</span>
      <button type="button" aria-label={`more ${sp.name}`} onClick={() => bump(side, +1)} className="w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center"><Plus className="w-4 h-4" strokeWidth={3} /></button>
      <span className="text-sm font-black text-slate-700 dark:text-slate-200">mol <Formula text={sp.formula} /></span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || 'Titration Bench'} current={pos + (itemDone ? 1 : 0)} total={items.length} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4 items-start">
        {/* LEFT — the question and the rig */}
        <div className="flex flex-col gap-3 lg:sticky lg:top-4">
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Titration {pos + 1} of {items.length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{clearedCount} first time</div>
            </div>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">{item.name}</div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug mt-1">{item.context}</p>
            <div className="mt-2 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 px-3 py-2 text-base text-slate-800 dark:text-slate-100 flex items-baseline flex-wrap gap-x-2">
              <EquationSide text={item.equation.reactants.map((s) => `${s.coeff > 1 ? s.coeff : ''}${s.formula}`).join(' + ')} className="!justify-start" />
              <span className="font-black text-slate-400">→</span>
              <EquationSide text={item.equation.products.map((s) => `${s.coeff > 1 ? s.coeff : ''}${s.formula}`).join(' + ')} className="!justify-start" />
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white overflow-hidden px-2">
            <Rig item={item} d={d} done={itemDone} />
          </div>
        </div>

        {/* RIGHT — the working, a line at a time */}
        <div className="flex flex-col gap-2.5">
          {stages.map((s, i) => {
            const past = itemDone || i < stageAt || (i === stageAt && locked);
            const now = !itemDone && i === stageAt;
            if (i > stageAt && !itemDone) {
              return (
                <div key={s.key} className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center gap-2 opacity-60">
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{s.tag}</span>
                  <span className="text-sm font-bold text-slate-400">{s.title}</span>
                </div>
              );
            }
            return (
              <div key={s.key} className={`rounded-2xl border-2 bg-white dark:bg-slate-900 px-4 py-3 ${now ? 'shadow-sm' : 'border-slate-200 dark:border-slate-700'}`}
                style={now ? { borderColor: INK } : undefined}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] ${past ? 'bg-[#58cc02] text-white' : 'text-white'}`}
                    style={past ? undefined : { backgroundColor: INK }}>{past ? `✓ ${s.tag}` : s.tag}</span>
                  <span className="text-sm font-black text-slate-800 dark:text-slate-100">{s.title}</span>
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{past ? s.say : s.hint}</div>

                {s.key === 'ratio' ? (
                  past ? (
                    <div className="text-base font-black text-slate-800 dark:text-slate-100">
                      <span style={{ color: KNOWN }}>{d.ratio.known}</span> mol <Formula text={K.formula} /> <span className="text-slate-400 mx-1">:</span>
                      <span style={{ color: UNKNOWN }}>{d.ratio.unknown}</span> mol <Formula text={U.formula} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      {ratioBox('known', K, KNOWN, marks.rk)}
                      <span className="text-sm font-black text-slate-500">reacts with</span>
                      {ratioBox('unknown', U, UNKNOWN, marks.ru)}
                    </div>
                  )
                ) : (
                  <div className="flex flex-col gap-2">
                    {s.boxes.map((b) => (
                      <label key={b.k} className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{b.label || '='}</span>
                        <span className="flex items-center gap-2">
                          {past ? (
                            <span className="min-w-[6rem] text-right rounded-xl px-3 py-1.5 font-black text-white" style={{ backgroundColor: s.key === 'answer' ? UNKNOWN : '#475569' }}>{show(b.want)}</span>
                          ) : (
                            <input inputMode="decimal" value={work.typed[b.k] ?? ''} aria-label={`${s.title}${b.label ? `: ${b.label}` : ''}`}
                              onChange={(e) => setWork((w) => ({ ...w, typed: { ...w.typed, [b.k]: e.target.value } }))}
                              className={`w-28 text-right rounded-xl border-2 px-2 py-1.5 font-black text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950 outline-none focus:border-cyan-600
                                ${marks[b.k] === false ? 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30' : 'border-slate-300 dark:border-slate-600'}`} />
                          )}
                          <span className="w-16 text-sm font-black text-slate-500 dark:text-slate-400">{b.unit}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

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
                {conc ? `The ${U.name} is ${show(d.answer)} mol/dm³.` : `${show(d.answer)} cm³ of ${U.name} is needed.`}
                <span className="font-bold block mt-0.5">{item.note}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            {!itemDone && !locked ? (
              <button type="button" onClick={showMe} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Show me</button>
            ) : <span />}
            {itemDone ? (
              isLast ? (
                <button onClick={finish} className={`px-6 py-3 text-sm text-white bg-[#58cc02] border-[#3e7500] flex items-center gap-2 ${btn}`}>
                  <Trophy className="w-4 h-4" strokeWidth={3} /> Finish
                </button>
              ) : (
                <button onClick={goNext} className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                  Next titration <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </button>
              )
            ) : locked ? (
              <button onClick={advance} className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                {stageAt < stages.length - 1 ? 'Next line' : 'Done'} <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </button>
            ) : (
              <button onClick={check} disabled={!ready}
                className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${ready ? btn : 'rounded-xl font-black uppercase tracking-widest bg-slate-300 dark:bg-slate-700 cursor-not-allowed'}`}
                style={ready ? { backgroundColor: INK, borderColor: INK_DARK } : undefined}>
                <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> Check
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
