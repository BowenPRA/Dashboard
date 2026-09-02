import { useState, useMemo } from 'react';
import {
  FlaskConical, CheckCircle2, XCircle, ArrowRight, Trophy, Construction, RotateCcw, Scale,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Formula, Ion } from './chemWidgets';
import { CHEM } from './chemPalette';

/* ------------------------------------------------------------------ *
 * FORMULAE — "turn the name into a formula: symbols, charges, subscripts."
 *
 * The step the student needs BEFORE writing equations. For each compound they:
 *   1. set the CHARGE on each ion (the superscript) — e.g. Pb²⁺, Br⁻;
 *   2. set how many of each ion (the subscript) so the compound is neutral —
 *      e.g. PbBr₂.
 * A live "charge balance" meter shows positive vs negative charge, so the
 * crossover rule is something they SEE, not memorise. Grading is derived from
 * the chosen charges and counts (neutral + matches the target), so a wrong key
 * cannot ship.
 *
 * Reads a unit's `formulaWrite` array:
 *   { id, name: 'lead(II) bromide',
 *     cation: { symbol: 'Pb', mag: 2 },   // sign is + (metal)
 *     anion:  { symbol: 'Br', mag: 1 },   // sign is − (non-metal / polyatomic)
 *     formula: [{ symbol:'Pb', count:1 }, { symbol:'Br', count:2 }],  // target
 *     hint: 'Lead(II) means Pb²⁺.' }
 *
 * SCORING. An item is worth 1 when both charges AND both subscripts are right.
 * XP = share of items correct, scaled from nativeMax 10 to the unit's maxXP.
 * ------------------------------------------------------------------ */

const MAGS = [1, 2, 3];

function ChargeChip({ mag, sign, active, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border-2 font-mono font-black text-base leading-none transition-all
        ${active
          ? 'bg-[#0087a8] border-[#026e88] text-white'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-[#0087a8]'}
        ${disabled ? 'opacity-60 cursor-default' : ''}`}>
      {mag}<sup className="text-[0.7em]">{sign === '+' ? '+' : '−'}</sup>
    </button>
  );
}

function IonCard({ role, ion, chosenMag, graded, correct, onPick }) {
  const sign = role === 'cation' ? '+' : '-';
  const accent = role === 'cation' ? '#1a5fa8' : '#2f8f5b';
  return (
    <div className={`flex-1 rounded-2xl border-2 p-4 bg-white dark:bg-slate-900
      ${graded ? (correct ? 'border-[#58a700]' : 'border-[#ff4b4b]') : 'border-slate-200 dark:border-slate-700'}`}>
      <div className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: accent }}>
        {role === 'cation' ? 'Metal ion (＋)' : 'Non-metal ion (－)'}
      </div>
      <div className="flex items-center justify-center h-14 mb-3">
        <span className="text-4xl">
          {chosenMag
            ? <Ion symbol={ion.symbol} mag={chosenMag} sign={sign} />
            : <span className="opacity-40"><Formula text={ion.symbol} /><sup className="text-[0.62em]">?</sup></span>}
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5">
        {MAGS.map((m) => (
          <ChargeChip key={m} mag={m} sign={sign} active={chosenMag === m} disabled={graded} onClick={() => onPick(m)} />
        ))}
      </div>
    </div>
  );
}

function CountStepper({ symbol, count, graded, correct, onBump }) {
  return (
    <div className={`inline-flex items-center rounded-2xl border-2 overflow-hidden bg-white dark:bg-slate-900
      ${graded ? (correct ? 'border-[#58a700]' : 'border-[#ff4b4b]') : 'border-slate-200 dark:border-slate-700'}`}>
      <span className="px-3 text-2xl min-w-[3.2rem] text-center text-slate-800 dark:text-slate-100">
        <Formula text={count > 1 ? `${symbol}${count}` : symbol} />
      </span>
      <span className="flex flex-col border-l-2 border-slate-200 dark:border-slate-700">
        <button disabled={graded} onClick={() => onBump(+1)}
          className="px-2.5 py-0.5 text-slate-400 hover:text-[#0087a8] disabled:opacity-40 text-xs font-black leading-none">▲</button>
        <button disabled={graded} onClick={() => onBump(-1)}
          className="px-2.5 py-0.5 text-slate-400 hover:text-[#0087a8] disabled:opacity-40 text-xs font-black leading-none border-t-2 border-slate-200 dark:border-slate-700">▼</button>
      </span>
    </div>
  );
}

export default function FormulaWrite({ pool, onComplete, onQuit }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : pool?.items || []), [pool]);

  const [idx, setIdx] = useState(0);
  const [graded, setGraded] = useState(false);
  const [results, setResults] = useState({});
  const [ended, setEnded] = useState(false);
  // per-item answer: { catMag, anMag, catCount, anCount }
  const [answers, setAnswers] = useState({});

  const item = items[idx];
  const isLast = idx >= items.length - 1;

  const blank = () => ({ catMag: 0, anMag: 0, catCount: 1, anCount: 1 });
  const cur = answers[idx] || blank();
  const setCur = (patch) => setAnswers((a) => ({ ...a, [idx]: { ...cur, ...patch } }));

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-[#0087a8]" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No formulae yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#0087a8] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#026e88] active:border-b-0 active:translate-y-[4px]">Return to Dashboard</button>
      </div>
    );
  }

  const targetCat = item.formula[0];
  const targetAn = item.formula[1];

  // Live charge balance from the current choices.
  const posCharge = cur.catMag * cur.catCount;
  const negCharge = cur.anMag * cur.anCount;
  const chargesPicked = cur.catMag > 0 && cur.anMag > 0;
  const balanced = chargesPicked && posCharge === negCharge && posCharge > 0;
  const ready = chargesPicked; // must at least pick charges before checking

  const gradeItem = () => {
    const chargeOk = cur.catMag === item.cation.mag && cur.anMag === item.anion.mag;
    const countOk = cur.catCount === targetCat.count && cur.anCount === targetAn.count;
    const correct = chargeOk && countOk;
    setResults((r) => ({ ...r, [idx]: { correct, chargeOk, countOk } }));
    setGraded(true);
  };

  const next = () => { setIdx((i) => i + 1); setGraded(false); };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const total = items.length;
    const correct = Object.values(results).filter((r) => r.correct).length;
    const raw = total ? Math.round((correct / total) * 10) : 0;
    const log = items.map((it, i) => ({ itemId: it.id || `formula-${i}`, correct: !!results[i]?.correct }));
    onComplete?.(raw, null, { items: log });
  };

  const clearedCount = Object.values(results).filter((r) => r.correct).length;
  const res = results[idx];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={onQuit} modeTitle={pool?.title || 'Formulae'} current={idx + 1} total={items.length} />

      <div className="flex-1 w-full max-w-2xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor: CHEM.teal, backgroundColor: CHEM.tealSoft }}>
            <FlaskConical className="w-4 h-4" style={{ color: CHEM.tealDark }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">Compound {idx + 1}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} /> {clearedCount} / {items.length} correct
          </div>
        </div>

        {/* the name */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-5 py-4 text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Write the formula of</div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{item.name}</div>
        </div>

        {/* step 1 — charges */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-full bg-[#0087a8] text-white text-[11px] font-black flex items-center justify-center">1</span>
            <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Set each ion's charge (the superscript)</span>
          </div>
          <div className="flex gap-3">
            <IonCard role="cation" ion={item.cation} chosenMag={cur.catMag} graded={graded} correct={res?.chargeOk} onPick={(m) => setCur({ catMag: m })} />
            <IonCard role="anion" ion={item.anion} chosenMag={cur.anMag} graded={graded} correct={res?.chargeOk} onPick={(m) => setCur({ anMag: m })} />
          </div>
        </div>

        {/* step 2 — subscripts + balance meter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-full bg-[#0087a8] text-white text-[11px] font-black flex items-center justify-center">2</span>
            <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">How many of each? (the subscript)</span>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <CountStepper symbol={item.cation.symbol} count={cur.catCount} graded={graded} correct={res?.countOk} onBump={(d) => setCur({ catCount: Math.max(1, Math.min(6, cur.catCount + d)) })} />
              <CountStepper symbol={item.anion.symbol} count={cur.anCount} graded={graded} correct={res?.countOk} onBump={(d) => setCur({ anCount: Math.max(1, Math.min(6, cur.anCount + d)) })} />
            </div>

            {/* live formula preview */}
            <div className="text-4xl text-slate-800 dark:text-slate-100 min-h-[2.5rem] flex items-center">
              <Formula text={formulaString(item, cur)} />
            </div>

            {/* charge balance meter */}
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest mb-1">
                <span className="text-[#1a5fa8]">＋ charge {chargesPicked ? posCharge : '·'}</span>
                <span className="text-[#2f8f5b]">－ charge {chargesPicked ? negCharge : '·'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex justify-end">
                  <div className="h-full bg-[#1a5fa8] transition-all" style={{ width: `${Math.min(100, posCharge * 25)}%` }} />
                </div>
                <span className={`text-xs font-black ${balanced ? 'text-[#3e7500]' : 'text-slate-400'}`}>
                  {balanced ? 'balanced' : '≠'}
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-[#2f8f5b] transition-all" style={{ width: `${Math.min(100, negCharge * 25)}%` }} />
                </div>
              </div>
              <div className="text-center text-[11px] font-bold text-slate-400 mt-1.5 flex items-center justify-center gap-1">
                <Scale className="w-3.5 h-3.5" strokeWidth={2.5} /> a correct formula has no overall charge
              </div>
            </div>
          </div>
        </div>

        {/* hint / verdict */}
        {item.hint && !graded && (
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400 text-center px-3">{item.hint}</div>
        )}
        {graded && (
          <div className="flex items-start gap-2 rounded-xl border-2 p-3"
            style={{ borderColor: res.correct ? CHEM.green : CHEM.red, backgroundColor: res.correct ? `${CHEM.green}1f` : `${CHEM.red}14` }}>
            {res.correct
              ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CHEM.greenDark }} strokeWidth={2.5} />
              : <XCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CHEM.red }} strokeWidth={2.5} />}
            <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">
              {res.correct ? 'Correct — right charges and a neutral formula.' : (
                <>
                  {!res.chargeOk ? 'Check the charges first — ' : 'Charges are right, but the numbers don’t balance — '}
                  the answer is{' '}
                  <span className="text-base">
                    <Ion symbol={item.cation.symbol} mag={item.cation.mag} sign="+" />
                    {' '}<Ion symbol={item.anion.symbol} mag={item.anion.mag} sign="-" />{' → '}
                    <Formula text={targetFormulaString(item)} />
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* actions */}
        <div className="flex items-center justify-end gap-3">
          {!graded ? (
            <button onClick={gradeItem} disabled={!ready}
              className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white flex items-center gap-2
                ${ready ? 'bg-[#0087a8] border-b-[4px] border-[#026e88] active:border-b-0 active:translate-y-[4px]' : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'}`}>
              <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> Check
            </button>
          ) : isLast ? (
            <button onClick={finish}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-4 h-4" strokeWidth={3} /> Finish
            </button>
          ) : (
            <button onClick={next}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#0087a8] border-b-[4px] border-[#026e88] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              Next <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- helpers ------------------------------------------------------ */

function unit(symbol, count) {
  // A polyatomic ion (symbol has >1 element / already has a digit) needs brackets
  // when there is more than one of it: (SO4)2. A single element just gets a
  // subscript: Br2.
  if (count <= 1) return symbol;
  const polyatomic = /[A-Z].*[A-Z]/.test(symbol) || /\d/.test(symbol);
  return polyatomic ? `(${symbol})${count}` : `${symbol}${count}`;
}

function formulaString(item, cur) {
  const c = unit(item.cation.symbol, cur.catCount);
  const a = unit(item.anion.symbol, cur.anCount);
  return `${c}${a}`;
}

function targetFormulaString(item) {
  const c = unit(item.formula[0].symbol, item.formula[0].count);
  const a = unit(item.formula[1].symbol, item.formula[1].count);
  return `${c}${a}`;
}
