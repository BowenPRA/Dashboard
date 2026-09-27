import { useState, useMemo } from 'react';
import {
  CheckCircle2, XCircle, ArrowRight, Trophy, Construction, Flame, Snowflake,
  Unlink, Link as LinkIcon, Eye, Minus, Plus, Info,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Formula } from './chemWidgets';
import { MOLECULES, bondKey, bondLabel, deriveBondItem, ledgerOf } from '../utils/bondEnergy';

/* ------------------------------------------------------------------ *
 * BOND LEDGER — "energy in, energy out, subtract."
 *
 * The coursebook (8.3) works an enthalpy change out the same way every time,
 * and this task is that method with nothing left out and nothing reordered:
 *
 *   1. COUNT the bonds broken in the reactants   — the coefficient counts
 *   2. TOTAL the energy in                       — count × bond energy
 *   3. COUNT the bonds made in the products
 *   4. TOTAL the energy out
 *   5. ΔH = energy in − energy out, its SIGN, and exothermic / endothermic
 *
 * The equation is drawn with every bond showing, because the commonest way to
 * lose the marks is to count from the formula instead of from the structure
 * (2NH₃ has six N–H bonds, not three, and not two). A count that is wrong
 * lights up the bonds it should have found.
 *
 * Nothing is compared against a stored answer. An item only names the
 * molecules and their coefficients; src/utils/bondEnergy.js reads the bonds
 * off each molecule's drawn structure and derives every count, subtotal, total
 * and ΔH, and `checkBondItems` refuses an item that does not balance.
 *
 * Reads a unit's `bondEnergy`:
 *   { title, items: [{ id, name, wordEquation,
 *       reactants: [{ mol: 'CH4', coeff: 1 }, { mol: 'O2', coeff: 2 }],
 *       products:  [{ mol: 'CO2', coeff: 1 }, { mol: 'H2O', coeff: 2 }],
 *       deltaH: -818,   // optional: a CHECK the validator holds the item to
 *       energies: {},   // optional: bond energies that differ from the table
 *       note }] }
 *
 * SCORING. An item is worth 1 when every stage is cleared without the answer
 * being filled in, and ½ when it was. XP = the share cleared, scaled from
 * nativeMax 10. The blob is { itemId: score }, so finished items stay finished.
 * ------------------------------------------------------------------ */

const IN = '#1a5fa8';   // energy in — bond breaking — endothermic
const OUT = '#c8102e';  // energy out — bond making — exothermic
const INK = '#4338ca';
const INK_DARK = '#312e81';
const LIT = '#f59e0b';

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';

const STAGES = ['countIn', 'sumIn', 'countOut', 'sumOut', 'delta'];
const STAGE_NAME = {
  countIn: 'Count the bonds broken',
  sumIn: 'Total the energy in',
  countOut: 'Count the bonds made',
  sumOut: 'Total the energy out',
  delta: 'Energy in − energy out',
};

const num = (s) => {
  const t = String(s ?? '').replace(/[\s,]/g, '').replace(/−/g, '-');
  if (t === '' || !/^-?\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
};
const fmt = (n) => Math.abs(n).toLocaleString('en-GB');
const signed = (n) => `${n < 0 ? '−' : '+'}${fmt(n)}`;

/* ---- one molecule, every bond drawn -------------------------------- */

const U = 46;      // px per grid unit
const R = 14;      // the clear disc behind each atom's symbol

function Molecule({ mol, colour, lit, faded }) {
  const xs = mol.atoms.map((a) => a[1]);
  const ys = mol.atoms.map((a) => a[2]);
  const minX = Math.min(...xs), minY = Math.min(...ys);
  const w = (Math.max(...xs) - minX) * U + 2 * R + 6;
  const h = (Math.max(...ys) - minY) * U + 2 * R + 6;
  const px = (x) => (x - minX) * U + R + 3;
  const py = (y) => (y - minY) * U + R + 3;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0" role="img" aria-label={mol.name}>
      {mol.bonds.map(([i, j, order], k) => {
        const [ea, ax, ay] = mol.atoms[i];
        const [eb, bx, by] = mol.atoms[j];
        const x1 = px(ax), y1 = py(ay), x2 = px(bx), y2 = py(by);
        const len = Math.hypot(x2 - x1, y2 - y1) || 1;
        const nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
        const isLit = lit && bondKey(ea, eb, order) === lit;
        const offs = order === 1 ? [0] : order === 2 ? [-3.2, 3.2] : [-5.4, 0, 5.4];
        return (
          <g key={k}>
            {isLit && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={LIT} strokeOpacity="0.45" strokeWidth={order * 4 + 7} strokeLinecap="round" />}
            {offs.map((o, n) => (
              <line key={n} x1={x1 + nx * o} y1={y1 + ny * o} x2={x2 + nx * o} y2={y2 + ny * o}
                stroke={isLit ? '#b45309' : colour} strokeWidth="3" strokeLinecap="round"
                strokeDasharray={faded ? '3 4' : undefined} opacity={faded ? 0.55 : 1} />
            ))}
          </g>
        );
      })}
      {mol.atoms.map(([el, x, y], k) => (
        <g key={k}>
          <circle cx={px(x)} cy={py(y)} r={R} fill="#ffffff" />
          <text x={px(x)} y={py(y) + 6.5} textAnchor="middle" fontFamily="Inter, system-ui, sans-serif"
            fontSize={el.length > 1 ? 16.5 : 19} fontWeight="800" fill="#1e293b">{el}</text>
        </g>
      ))}
    </svg>
  );
}

function Side({ side, colour, lit, faded }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-3">
      {side.map((sp, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-xl font-black text-slate-400 mr-1">+</span>}
          {Number(sp.coeff) > 1 && (
            <span className="text-3xl font-black font-mono" style={{ color: colour }}>{sp.coeff}</span>
          )}
          <Molecule mol={MOLECULES[sp.mol]} colour={colour} lit={lit} faded={faded} />
        </div>
      ))}
    </div>
  );
}

const formulaLine = (side) => side.map((sp, i) => (
  <span key={i} className="inline-flex items-baseline">
    {i > 0 && <span className="mx-1.5 text-slate-400">+</span>}
    {Number(sp.coeff) > 1 && <span className="font-mono font-black">{sp.coeff}</span>}
    <Formula text={sp.mol} />
  </span>
));

/* ---- the payoff: the book's energy diagram, to scale --------------- */

// SVG text cannot hold <sub>, so the formula's digits become subscript glyphs.
const sideText = (side) => side
  .map((s) => `${s.coeff > 1 ? s.coeff : ''}${s.mol.replace(/\d/g, (n) => '₀₁₂₃₄₅₆₇₈₉'[n])}`)
  .join(' + ');

const T = (p) => <text fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="700" {...p} />;

function LedgerDiagram({ d, item }) {
  const W = 520, H = 250, top = 34, base = H - 34;
  const span = base - top;
  // Levels measured down from "bonds broken", the highest point of any reaction.
  const big = Math.max(d.energyIn, d.energyOut);
  const yTop = top;
  const yR = top + (d.energyIn / big) * span;
  const yP = top + (d.energyOut / big) * span;
  const col = d.exo ? OUT : IN;
  const arrow = (x, y1, y2, c) => (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 + (y2 > y1 ? -8 : 8)} stroke={c} strokeWidth="2.6" />
      <path d={y2 > y1 ? `M ${x} ${y2} l -5.5 -10 l 11 0 z` : `M ${x} ${y2} l -5.5 10 l 11 0 z`} fill={c} />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img"
      aria-label={`Energy diagram: ${fmt(d.energyIn)} kJ in, ${fmt(d.energyOut)} kJ out, overall ${signed(d.deltaH)} kJ`}>
      <rect width={W} height={H} rx="14" fill="#ffffff" />
      <line x1="46" y1="14" x2="46" y2={base + 12} stroke="#1e293b" strokeWidth="2" />
      <path d="M 46 8 l -5 9 l 10 0 z" fill="#1e293b" />
      <line x1="46" y1={base + 12} x2={W - 14} y2={base + 12} stroke="#1e293b" strokeWidth="2" />
      <T x={-(H / 2)} y="22" transform="rotate(-90)" textAnchor="middle" fill="#475569">energy</T>

      <line x1="150" y1={yTop} x2="392" y2={yTop} stroke="#2f8f5b" strokeWidth="4" strokeLinecap="round" />
      <T x="271" y={yTop - 9} textAnchor="middle" fill="#334155">bonds broken</T>

      <line x1="62" y1={yR} x2="196" y2={yR} stroke="#2f8f5b" strokeWidth="5" strokeLinecap="round" />
      <T x="62" y={yR + 18} fill="#334155">{sideText(item.reactants)}</T>
      <line x1="346" y1={yP} x2={W - 24} y2={yP} stroke="#2f8f5b" strokeWidth="5" strokeLinecap="round" />
      <T x={W - 24} y={yP + 18} textAnchor="end" fill="#334155">{sideText(item.products)}</T>

      {arrow(172, yR, yTop, IN)}
      <T x="164" y={(yR + yTop) / 2 + 4} textAnchor="end" fill={IN}>{`in ${fmt(d.energyIn)} kJ`}</T>
      {arrow(370, yTop, yP, OUT)}
      <T x="380" y={(yTop + yP) / 2 + 4} fill={OUT}>{`out ${fmt(d.energyOut)} kJ`}</T>

      <line x1="196" y1={yR} x2="318" y2={yR} stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="5 4" />
      <line x1="232" y1={yP} x2="346" y2={yP} stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="5 4" />
      {Math.abs(yP - yR) > 14 && arrow(268, yR, yP, col)}
      <T x="278" y={Math.max(yR, yP) + 18} fill={col} fontSize="12.5" fontWeight="800">{`ΔH = ${signed(d.deltaH)} kJ`}</T>
    </svg>
  );
}

/* ---- the ledger ----------------------------------------------------- */

function Ledger({ which, led, colour, stage, counts, subs, total, marks, locked, onCount, onSub, onTotal, onLight }) {
  const isIn = which === 'in';
  const countStage = isIn ? 'countIn' : 'countOut';
  const sumStage = isIn ? 'sumIn' : 'sumOut';
  const at = STAGES.indexOf(stage);
  const counting = stage === countStage;
  const summing = stage === sumStage;
  const countsKnown = at > STAGES.indexOf(countStage);
  const sumsKnown = at > STAGES.indexOf(sumStage);
  const waiting = at < STAGES.indexOf(countStage);
  const Icon = isIn ? Unlink : LinkIcon;
  const ring = (k) => (marks?.[k] === false ? 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30'
    : marks?.[k] === true ? 'border-[#58a700]' : 'border-slate-300 dark:border-slate-600');

  return (
    <div className={`rounded-2xl border-2 bg-white dark:bg-slate-900 overflow-hidden transition-opacity ${waiting ? 'opacity-45' : ''}`}
      style={{ borderColor: counting || summing ? colour : undefined }}>
      <div className="px-3 py-2 flex items-center gap-2 text-white" style={{ backgroundColor: colour }}>
        <Icon className="w-4 h-4" strokeWidth={3} />
        <span className="text-xs font-black uppercase tracking-[0.14em]">{isIn ? 'Bonds broken · energy in' : 'Bonds made · energy out'}</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            <th className="text-left pl-3 py-1.5">Bond</th>
            <th className="py-1.5">How many</th>
            <th className="py-1.5">kJ each</th>
            <th className="text-right pr-3 py-1.5">kJ</th>
          </tr>
        </thead>
        <tbody>
          {led.rows.map((r) => (
            <tr key={r.bond} className="border-t border-slate-100 dark:border-slate-800">
              <td className="pl-3 py-2 font-mono font-black text-slate-800 dark:text-slate-100 whitespace-nowrap">
                <button type="button" onClick={() => onLight?.(r.bond)} className="hover:underline" title="Show these bonds in the drawing">{r.label}</button>
              </td>
              <td className="py-2">
                {counting && !locked ? (
                  <div className={`mx-auto w-fit flex items-center gap-1 rounded-xl border-2 px-1 py-0.5 ${ring(`c:${r.bond}`)}`}>
                    <button type="button" aria-label={`fewer ${r.label}`} onClick={() => onCount(r.bond, -1)}
                      className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"><Minus className="w-4 h-4" strokeWidth={3} /></button>
                    <span className="w-7 text-center font-black text-base text-slate-800 dark:text-slate-100">{counts[r.bond] ?? 0}</span>
                    <button type="button" aria-label={`more ${r.label}`} onClick={() => onCount(r.bond, +1)}
                      className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"><Plus className="w-4 h-4" strokeWidth={3} /></button>
                  </div>
                ) : (
                  <div className="text-center font-black text-base" style={{ color: countsKnown || counting ? colour : '#cbd5e1' }}>
                    {countsKnown || (counting && locked) ? r.count : '?'}
                  </div>
                )}
              </td>
              <td className="py-2 text-center font-bold text-slate-500 dark:text-slate-400">
                {countsKnown ? `× ${r.each}` : '·'}
              </td>
              <td className="pr-3 py-2 text-right">
                {summing && !locked ? (
                  <input inputMode="numeric" value={subs[r.bond] ?? ''} onChange={(e) => onSub(r.bond, e.target.value)}
                    aria-label={`${r.count} times ${r.each}`}
                    className={`w-24 text-right rounded-xl border-2 px-2 py-1.5 font-black text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950 outline-none focus:border-[#4338ca] ${ring(`s:${r.bond}`)}`} />
                ) : (
                  <span className="font-black text-slate-800 dark:text-slate-100">{sumsKnown || (summing && locked) ? fmt(r.subtotal) : ''}</span>
                )}
              </td>
            </tr>
          ))}
          <tr className="border-t-2" style={{ borderColor: colour }}>
            <td colSpan={3} className="pl-3 py-2.5 text-xs font-black uppercase tracking-widest" style={{ color: colour }}>
              Total energy {isIn ? 'in' : 'out'}
            </td>
            <td className="pr-3 py-2.5 text-right">
              {summing && !locked ? (
                <input inputMode="numeric" value={total ?? ''} onChange={(e) => onTotal(e.target.value)}
                  aria-label={`total energy ${isIn ? 'in' : 'out'}`}
                  className={`w-24 text-right rounded-xl border-2 px-2 py-1.5 font-black text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950 outline-none focus:border-[#4338ca] ${ring('total')}`} />
              ) : (
                <span className="font-black text-base" style={{ color: colour }}>{sumsKnown || (summing && locked) ? `${fmt(led.total)} kJ` : ''}</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---- the task ------------------------------------------------------ */

const blankWork = () => ({ counts: { in: {}, out: {} }, subs: { in: {}, out: {} }, totals: { in: '', out: '' }, sign: null, mag: '', kind: null });

export default function BondLedger({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
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
  const [work, setWork] = useState(blankWork);
  const [marks, setMarks] = useState({});
  const [wrongs, setWrongs] = useState(0);
  const [locked, setLocked] = useState(false);
  const [msg, setMsg] = useState(null);
  const [helped, setHelped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [lit, setLit] = useState(null);
  const [sheet, setSheet] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const d = useMemo(() => {
    if (!item) return null;
    try { return deriveBondItem(item); } catch { return null; }
  }, [item]);

  if (!items.length || !d) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No reactions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const stage = STAGES[stageAt];
  const side = stage === 'countOut' || stage === 'sumOut' ? 'out' : 'in';
  const led = side === 'in' ? d.broken : d.made;
  const species = side === 'in' ? item.reactants : item.products;

  /* ------------------------------------------------------------ flow */
  const clearStage = () => { setMarks({}); setWrongs(0); setLocked(false); setMsg(null); setLit(null); };

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  /** A stage is right, wrong once (try again), or wrong twice (filled in). */
  const settle = (ok, good, bad, newMarks, litBond) => {
    setMarks(newMarks);
    if (ok) { setLocked(true); setLit(null); setMsg({ ok: true, text: good }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setLit(litBond || null);
    if (n >= 2) {
      setLocked(true); setHelped(true);
      setMsg({ shown: true, text: `${bad} The answer is filled in — read it against the drawing before you go on.` });
    } else setMsg({ ok: false, text: bad });
  };

  const showMe = () => {
    setLocked(true); setHelped(true); setMarks({});
    setMsg({ shown: true, text: 'Filled in for you. Check each line against the drawing before you go on.' });
  };

  const checkCounts = () => {
    const mine = work.counts[side];
    const m = {};
    let firstBad = null;
    for (const r of led.rows) {
      const ok = (mine[r.bond] ?? 0) === r.count;
      m[`c:${r.bond}`] = ok;
      if (!ok && !firstBad) firstBad = r;
    }
    if (!firstBad) {
      settle(true, side === 'in'
        ? 'Every bond in the reactants is counted. Those are the bonds that must be broken.'
        : 'Every bond in the products is counted. Those are the bonds that form.', '', m);
      return;
    }
    // The count that ignores the numbers in front — the slip this task exists for.
    const bare = ledgerOf(species.map((s) => ({ ...s, coeff: 1 }))).rows.find((r) => r.bond === firstBad.bond)?.count;
    const got = mine[firstBad.bond] ?? 0;
    const holder = species.find((s) => Number(s.coeff) > 1 && MOLECULES[s.mol].bonds.some(([i, j, o]) => bondKey(MOLECULES[s.mol].atoms[i][0], MOLECULES[s.mol].atoms[j][0], o) === firstBad.bond));
    const bad = got === bare && holder
      ? `Look at the number in front: there are ${holder.coeff} molecules of ${MOLECULES[holder.mol].name}, and every one of them has its own ${firstBad.label} bonds.`
      : `Count the ${firstBad.label} bonds again — they are lit up in the drawing. Count lines between atoms, not atoms.`;
    settle(false, '', bad, m, firstBad.bond);
  };

  const checkSums = () => {
    const mine = work.subs[side];
    const m = {};
    let badRow = null;
    for (const r of led.rows) {
      const ok = num(mine[r.bond]) === r.subtotal;
      m[`s:${r.bond}`] = ok;
      if (!ok && !badRow) badRow = r;
    }
    const t = num(work.totals[side]);
    m.total = t === led.total;
    if (!badRow && m.total) {
      settle(true, `Energy ${side} = ${fmt(led.total)} kJ.`, '', m);
      return;
    }
    const bad = badRow
      ? `${badRow.label}: ${badRow.count} bond${badRow.count === 1 ? '' : 's'} at ${badRow.each} kJ each is ${badRow.count} × ${badRow.each}.`
      : 'Each line is right. Add the lines together for the total.';
    settle(false, '', bad, m);
  };

  const checkDelta = () => {
    const mag = num(work.mag);
    const magOk = mag === Math.abs(d.deltaH);
    const signOk = work.sign === d.sign;
    const kindOk = work.kind === d.type;
    const m = { mag: magOk, sign: signOk, kind: kindOk };
    if (magOk && signOk && kindOk) {
      settle(true, `ΔH = ${fmt(d.energyIn)} − ${fmt(d.energyOut)} = ${signed(d.deltaH)} kJ. ${d.exo ? 'More energy is given out than is taken in.' : 'More energy is taken in than is given out.'}`, '', m);
      return;
    }
    let bad;
    if (!magOk && mag === d.energyIn + d.energyOut) bad = 'You added the two totals. The energy out is taken AWAY from the energy in.';
    else if (!magOk) bad = `Subtract: ${fmt(d.energyIn)} − ${fmt(d.energyOut)}. Work out the size first, then decide the sign.`;
    else if (!signOk) bad = d.exo
      ? `Energy in (${fmt(d.energyIn)}) is SMALLER than energy out (${fmt(d.energyOut)}), so in − out is below zero: the sign is minus.`
      : `Energy in (${fmt(d.energyIn)}) is BIGGER than energy out (${fmt(d.energyOut)}), so in − out is above zero: the sign is plus.`;
    else bad = d.exo
      ? 'A minus sign means the reaction has given energy out to the surroundings. Which word is that?'
      : 'A plus sign means the reaction has taken energy in from the surroundings. Which word is that?';
    settle(false, '', bad, m);
  };

  const check = () => {
    if (stage === 'countIn' || stage === 'countOut') checkCounts();
    else if (stage === 'sumIn' || stage === 'sumOut') checkSums();
    else checkDelta();
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

  const goNext = () => {
    setPos((p) => p + 1); setStageAt(0); setWork(blankWork()); setHelped(false); setItemDone(false); clearStage();
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- inputs */
  const bump = (bond, by) => setWork((w) => ({
    ...w, counts: { ...w.counts, [side]: { ...w.counts[side], [bond]: Math.max(0, Math.min(20, (w.counts[side][bond] ?? 0) + by)) } },
  }));
  const typeSub = (bond, v) => setWork((w) => ({ ...w, subs: { ...w.subs, [side]: { ...w.subs[side], [bond]: v } } }));
  const typeTotal = (v) => setWork((w) => ({ ...w, totals: { ...w.totals, [side]: v } }));

  const ready = stage === 'countIn' || stage === 'countOut'
    ? led.rows.some((r) => (work.counts[side][r.bond] ?? 0) > 0)
    : stage === 'sumIn' || stage === 'sumOut'
      ? led.rows.every((r) => String(work.subs[side][r.bond] ?? '').trim() !== '') && String(work.totals[side]).trim() !== ''
      : !!work.sign && String(work.mag).trim() !== '' && !!work.kind;

  const isLast = pos >= items.length - 1;
  const clearedCount = items.filter((it) => results[it.id]?.score === 1).length;
  const stageForLedger = itemDone ? 'done' : stage;
  const deltaOpen = itemDone || stage === 'delta';
  const sheetBonds = Object.keys({ ...d.broken.rows.reduce((o, r) => ({ ...o, [r.bond]: 1 }), {}), ...d.made.rows.reduce((o, r) => ({ ...o, [r.bond]: 1 }), {}) });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || 'Bond Ledger'} current={pos + (itemDone ? 1 : 0)} total={items.length} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        {/* stage rail */}
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
                  <span className={now ? '' : 'hidden md:inline'}>{STAGE_NAME[s]}</span>
                </div>
              );
            })}
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">{clearedCount} / {items.length} first time</div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 items-start">
          {/* LEFT — the reaction, every bond drawn */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-4">
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-4 py-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Reaction {pos + 1}</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">{item.name}</div>
              {item.wordEquation && <div className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.wordEquation}</div>}
              <div className="mt-1.5 text-base text-slate-800 dark:text-slate-100 flex items-baseline flex-wrap gap-x-1">
                {formulaLine(item.reactants)}<span className="mx-2 font-black text-slate-400">→</span>{formulaLine(item.products)}
              </div>

              <div className="mt-3 rounded-xl bg-white border-2 border-slate-100 p-3 flex flex-col items-center gap-2">
                <Side side={item.reactants} colour={IN} lit={side === 'in' ? lit : null} faded={itemDone || stageAt >= 2} />
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="h-px w-10 bg-slate-300" /><ArrowRight className="w-5 h-5 rotate-90" strokeWidth={3} /><span className="h-px w-10 bg-slate-300" />
                </div>
                <Side side={item.products} colour={OUT} lit={side === 'out' ? lit : null} />
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 flex-wrap text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span><span className="font-black" style={{ color: IN }}>Blue</span> bonds break · <span className="font-black" style={{ color: OUT }}>red</span> bonds form</span>
                <button type="button" onClick={() => setSheet((v) => !v)} className="inline-flex items-center gap-1 font-black uppercase tracking-widest text-[10px] text-[#4338ca] dark:text-indigo-300">
                  <Info className="w-3.5 h-3.5" strokeWidth={3} /> {sheet ? 'Hide' : 'Bond energy'} data
                </button>
              </div>
              {sheet && (
                <div className="mt-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-0.5 text-sm">
                  <div className="col-span-full text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Bond energy in kJ/mol</div>
                  {sheetBonds.map((b) => (
                    <div key={b} className="flex justify-between font-mono">
                      <span className="font-black text-slate-700 dark:text-slate-200">{bondLabel(b)}</span>
                      <span className="font-bold text-slate-500 dark:text-slate-400">{d.broken.rows.concat(d.made.rows).find((r) => r.bond === b).each}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {itemDone && (
              <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white overflow-hidden">
                <LedgerDiagram d={d} item={item} />
              </div>
            )}
          </div>

          {/* RIGHT — the ledger */}
          <div className="flex flex-col gap-4">
            <Ledger which="in" led={d.broken} colour={IN} stage={stageForLedger}
              counts={work.counts.in} subs={work.subs.in} total={work.totals.in}
              marks={side === 'in' ? marks : {}} locked={locked}
              onCount={bump} onSub={typeSub} onTotal={typeTotal} onLight={(b) => setLit((v) => (v === b ? null : b))} />
            <Ledger which="out" led={d.made} colour={OUT} stage={stageForLedger}
              counts={work.counts.out} subs={work.subs.out} total={work.totals.out}
              marks={side === 'out' ? marks : {}} locked={locked}
              onCount={bump} onSub={typeSub} onTotal={typeTotal} onLight={(b) => setLit((v) => (v === b ? null : b))} />

            {/* ΔH */}
            <div className={`rounded-2xl border-2 bg-white dark:bg-slate-900 p-3 transition-opacity ${deltaOpen ? '' : 'opacity-45'}`}
              style={{ borderColor: stage === 'delta' && !itemDone ? INK : undefined }}>
              <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 mb-2">
                Enthalpy change = energy in − energy out
              </div>
              {deltaOpen && (
                <>
                  <div className="flex items-center gap-2 flex-wrap text-base font-black text-slate-800 dark:text-slate-100">
                    <span>ΔH =</span>
                    <span style={{ color: IN }}>{fmt(d.energyIn)}</span><span>−</span><span style={{ color: OUT }}>{fmt(d.energyOut)}</span><span>=</span>
                    {itemDone || locked ? (
                      <span className="rounded-xl px-3 py-1 text-white" style={{ backgroundColor: d.exo ? OUT : IN }}>{signed(d.deltaH)} kJ</span>
                    ) : (
                      <>
                        <div className={`flex rounded-xl border-2 overflow-hidden ${marks.sign === false ? 'border-[#ff4b4b]' : 'border-slate-300 dark:border-slate-600'}`}>
                          {['-', '+'].map((s) => (
                            <button key={s} type="button" onClick={() => setWork((w) => ({ ...w, sign: s }))} aria-label={s === '-' ? 'minus' : 'plus'}
                              className={`w-10 h-10 text-lg font-black ${work.sign === s ? 'text-white' : 'text-slate-500 bg-white dark:bg-slate-950'}`}
                              style={work.sign === s ? { backgroundColor: INK } : undefined}>{s === '-' ? '−' : '+'}</button>
                          ))}
                        </div>
                        <input inputMode="numeric" value={work.mag} onChange={(e) => setWork((w) => ({ ...w, mag: e.target.value }))} aria-label="size of the enthalpy change"
                          className={`w-24 text-right rounded-xl border-2 px-2 py-1.5 font-black bg-white dark:bg-slate-950 outline-none focus:border-[#4338ca] ${marks.mag === false ? 'border-[#ff4b4b]' : 'border-slate-300 dark:border-slate-600'}`} />
                        <span>kJ</span>
                      </>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {[
                      { k: 'exothermic', icon: Flame, col: OUT, sub: 'energy given out' },
                      { k: 'endothermic', icon: Snowflake, col: IN, sub: 'energy taken in' },
                    ].map((o) => {
                      const on = itemDone || locked ? d.type === o.k : work.kind === o.k;
                      return (
                        <button key={o.k} type="button" disabled={itemDone || locked} onClick={() => setWork((w) => ({ ...w, kind: o.k }))}
                          className={`flex-1 rounded-xl border-2 px-3 py-2 text-left flex items-center gap-2 transition-all
                            ${on ? 'text-white' : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300'}
                            ${!on && marks.kind === false ? 'border-[#ff4b4b]' : !on ? 'border-slate-200 dark:border-slate-700' : ''}`}
                          style={on ? { backgroundColor: o.col, borderColor: o.col } : undefined}>
                          <o.icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                          <span><span className="block font-black text-sm capitalize">{o.k}</span>
                            <span className={`block text-[11px] font-bold ${on ? 'opacity-85' : 'text-slate-400'}`}>{o.sub}</span></span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* prompt / verdict */}
            {!itemDone && !msg && (
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 px-1">
                {stage === 'countIn' && 'Step 1 — every bond in the reactants has to break. Count each kind in the drawing, and remember the numbers in front.'}
                {stage === 'sumIn' && 'Step 2 — multiply each count by its bond energy, then add the lines. Breaking bonds takes energy IN.'}
                {stage === 'countOut' && 'Step 3 — now the products. Count each kind of bond that forms.'}
                {stage === 'sumOut' && 'Step 4 — multiply and add again. Making bonds gives energy OUT.'}
                {stage === 'delta' && 'Step 5 — energy in first, then take away energy out. Choose the sign, type the size, and name the reaction.'}
              </div>
            )}
            {msg && (
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
                  ΔH = {signed(d.deltaH)} kJ — {d.type}. <span className="font-bold">{item.note}</span>
                </div>
              </div>
            )}

            {/* actions */}
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
                    Next reaction <ArrowRight className="w-4 h-4" strokeWidth={3} />
                  </button>
                )
              ) : locked ? (
                <button onClick={advance} className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                  {stageAt < STAGES.length - 1 ? 'Next step' : 'See the diagram'} <ArrowRight className="w-4 h-4" strokeWidth={3} />
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
    </div>
  );
}
