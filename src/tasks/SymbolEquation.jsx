import { useState, useMemo } from 'react';
import {
  FlaskConical, CheckCircle2, XCircle, ArrowRight, Trophy, Construction, RotateCcw, Lightbulb, Hand,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { balanceReport } from '../utils/chemFormula';
import { Formula, Species } from './chemWidgets';
import { CHEM } from './chemPalette';

/* ------------------------------------------------------------------ *
 * SYMBOL EQUATIONS — "turn the word equation into a balanced symbol
 * equation."
 *
 * The student is given a word equation (e.g. "sodium chloride → sodium +
 * chlorine") and one slot per reactant and product. For each slot they pick a
 * FORMULA from a shared candidate bank and set a whole-number COEFFICIENT
 * (1–6). Nothing is compared to a stored string: the component parses every
 * chosen formula into atom counts (src/utils/chemFormula.js) and DERIVES two
 * things — do the chosen formulae match the target species, and does the built
 * equation balance atom-for-atom. Production, not recognition: the same
 * derive-don't-store rule the Number Gym / Graph It / Vectors tasks follow.
 *
 * Reads a unit's `symbolEq` array:
 *   { id, wordEquation, reactants:[{formula,coeff}], products:[…], bank:[…], note }
 *
 * SCORING. An item is worth 1 when the built equation uses exactly the right
 * formulae on each side AND balances (forces the right coefficients). XP = share
 * of items correct, scaled from nativeMax 10 to the unit's maxXP.
 * ------------------------------------------------------------------ */

/** One slot: a big coefficient stepper + a formula, styled by state. */
function Slot({ side, idx, ans, selected, graded, verdict, onSelect, onCoeff }) {
  const isSel = selected?.side === side && selected?.idx === idx;
  const border = graded
    ? (verdict ? 'border-[#58a700] bg-[#58cc02]/10' : 'border-[#ff4b4b] bg-[#ff4b4b]/5')
    : isSel ? 'border-[#0087a8] ring-4 ring-[#0087a8]/20 bg-white dark:bg-slate-900'
      : ans.formula ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
        : 'border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50';
  return (
    <span className={`inline-flex items-stretch rounded-2xl border-2 overflow-hidden transition-all ${border}`}>
      {/* coefficient stepper */}
      <span className="flex flex-col justify-center border-r-2 border-slate-200/70 dark:border-slate-700">
        <button disabled={graded} onClick={() => onCoeff(side, idx, +1)} aria-label="increase coefficient"
          className="px-2 py-0.5 text-slate-400 hover:text-[#0087a8] disabled:opacity-40 text-[11px] font-black leading-none">▲</button>
        <button disabled={graded} onClick={() => onCoeff(side, idx, -1)} aria-label="decrease coefficient"
          className="px-2 py-0.5 text-slate-400 hover:text-[#0087a8] disabled:opacity-40 text-[11px] font-black leading-none border-t-2 border-slate-200/70 dark:border-slate-700">▼</button>
      </span>
      {/* coefficient + formula (tap to select) */}
      <button disabled={graded} onClick={() => onSelect(side, idx)}
        className="flex items-center gap-0.5 pl-2 pr-3 py-2 min-w-[4.2rem] justify-center">
        <span className={`text-2xl font-mono font-black tabular-nums ${ans.coeff > 1 ? 'text-slate-800 dark:text-slate-100' : 'text-slate-300 dark:text-slate-600'}`}>
          {ans.coeff}
        </span>
        <span className="text-2xl text-slate-800 dark:text-slate-100">
          {ans.formula ? <Formula text={ans.formula} /> : <span className="text-slate-300 dark:text-slate-600 text-base font-black">tap</span>}
        </span>
      </button>
    </span>
  );
}

function EquationSide({ side, answers, selected, graded, target, onSelect, onCoeff }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 justify-center">
      {answers.map((ans, idx) => {
        const verdict = graded
          ? target.some((t) => t.formula === ans.formula && Number(t.coeff) === Number(ans.coeff))
          : null;
        return (
          <span key={idx} className="inline-flex items-center gap-1.5">
            {idx > 0 && <span className="text-2xl font-black text-slate-400">+</span>}
            <Slot side={side} idx={idx} ans={ans} selected={selected} graded={graded} verdict={verdict}
              onSelect={onSelect} onCoeff={onCoeff} />
          </span>
        );
      })}
    </div>
  );
}

export default function SymbolEquation({ pool, onComplete, onQuit }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : pool?.items || []), [pool]);

  const [idx, setIdx] = useState(0);
  const [graded, setGraded] = useState(false);
  const [results, setResults] = useState({});
  const [ended, setEnded] = useState(false);
  const [selected, setSelected] = useState(null); // { side:'r'|'p', idx }
  const [answers, setAnswers] = useState({});      // itemIdx -> { r:[…], p:[…] }

  const item = items[idx];
  const isLast = idx >= items.length - 1;

  const stateFor = (i) => {
    if (answers[i]) return answers[i];
    const it = items[i];
    return {
      r: (it.reactants || []).map(() => ({ coeff: 1, formula: null })),
      p: (it.products || []).map(() => ({ coeff: 1, formula: null })),
    };
  };
  const cur = stateFor(idx);

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-[#0087a8]" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No equations yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#0087a8] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#026e88] active:border-b-0 active:translate-y-[4px]">Return to Dashboard</button>
      </div>
    );
  }

  const setAns = (next) => setAnswers((a) => ({ ...a, [idx]: next }));
  const selectSlot = (side, sIdx) => { if (!graded) setSelected({ side, idx: sIdx }); };
  const placeFormula = (formula) => {
    if (graded || !selected) return;
    const side = selected.side;
    const arr = cur[side].map((s, i) => (i === selected.idx ? { ...s, formula } : s));
    setAns({ ...cur, [side]: arr });
    // auto-advance selection to the next empty slot for a smoother flow
    const order = [...cur.r.map((_, i) => ({ side: 'r', idx: i })), ...cur.p.map((_, i) => ({ side: 'p', idx: i }))];
    const merged = { ...cur, [side]: arr };
    const nextEmpty = order.find((o) => !merged[o.side][o.idx].formula);
    setSelected(nextEmpty || null);
  };
  const bumpCoeff = (side, sIdx, delta) => {
    if (graded) return;
    const arr = cur[side].map((s, i) => (i === sIdx ? { ...s, coeff: Math.max(1, Math.min(6, s.coeff + delta)) } : s));
    setAns({ ...cur, [side]: arr });
    setSelected({ side, idx: sIdx });
  };

  const allFilled = cur.r.every((s) => s.formula) && cur.p.every((s) => s.formula);

  const gradeItem = () => {
    const built = { reactants: cur.r.filter((s) => s.formula), products: cur.p.filter((s) => s.formula) };
    const formulaeMatch = sameMultiset(built.reactants, item.reactants) && sameMultiset(built.products, item.products);
    // `safeBalance` is the same call behind the same try/catch this used to
    // inline — it filters `cur` exactly as `built` does and reports unbalanced
    // when `balanceReport` throws.
    const correct = formulaeMatch && safeBalance(cur).balanced;
    setResults((r) => ({ ...r, [idx]: correct }));
    setGraded(true);
  };

  const next = () => { setIdx((i) => i + 1); setGraded(false); setSelected(null); };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const total = items.length;
    const correct = Object.values(results).filter(Boolean).length;
    const raw = total ? Math.round((correct / total) * 10) : 0;
    const log = items.map((it, i) => ({ itemId: it.id || `eq-${i}`, correct: !!results[i] }));
    onComplete?.(raw, null, { items: log });
  };

  const clearedCount = Object.values(results).filter(Boolean).length;
  const itemCorrect = results[idx];
  const report = graded ? safeBalance(cur) : null;
  // which bank formulae are already placed (so we can de-emphasise them)
  const placed = graded ? [] : [...cur.r, ...cur.p].map((s) => s.formula).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={onQuit} modeTitle={pool?.title || 'Symbol Equations'} current={idx + 1} total={items.length} />

      <div className="flex-1 w-full max-w-2xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor: CHEM.teal, backgroundColor: CHEM.tealSoft }}>
            <FlaskConical className="w-4 h-4" style={{ color: CHEM.tealDark }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">Equation {idx + 1}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} /> {clearedCount} / {items.length} correct
          </div>
        </div>

        {/* word equation */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-5 py-4 text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Word equation</div>
          <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 leading-snug">{item.wordEquation}</div>
        </div>

        {/* the builder */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-4 py-5">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 text-center">
            Build the balanced symbol equation
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <EquationSide side="r" answers={cur.r} selected={selected} graded={graded} target={item.reactants}
              onSelect={selectSlot} onCoeff={bumpCoeff} />
            <span className="text-3xl font-black text-slate-400 px-1">→</span>
            <EquationSide side="p" answers={cur.p} selected={selected} graded={graded} target={item.products}
              onSelect={selectSlot} onCoeff={bumpCoeff} />
          </div>

          {/* formula bank */}
          {!graded && (
            <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2.5">
                <Hand className="w-3.5 h-3.5" strokeWidth={2.5} />
                {selected ? 'Now tap a formula' : 'Tap a slot above, then a formula'}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(item.bank || []).map((f) => {
                  const used = placed.includes(f);
                  return (
                    <button key={f} onClick={() => placeFormula(f)} disabled={!selected}
                      className={`px-3.5 py-2 rounded-xl border-2 text-lg bg-white dark:bg-slate-900 border-b-[4px] transition-all
                        border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100
                        ${selected ? 'active:translate-y-[3px] active:border-b-2 hover:border-[#0087a8]' : 'opacity-40 cursor-not-allowed'}
                        ${used ? 'opacity-50' : ''}`}>
                      <Formula text={f} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* hint */}
        {item.note && !graded && (
          <div className="flex items-start gap-2 rounded-xl border-2 p-2.5" style={{ borderColor: CHEM.teal, backgroundColor: `${CHEM.teal}12` }}>
            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CHEM.tealDark }} strokeWidth={2.5} />
            <div className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug">{item.note}</div>
          </div>
        )}

        {/* verdict */}
        {graded && (
          <div className="flex items-start gap-2 rounded-xl border-2 p-3"
            style={{ borderColor: itemCorrect ? CHEM.green : CHEM.red, backgroundColor: itemCorrect ? `${CHEM.green}1f` : `${CHEM.red}14` }}>
            {itemCorrect
              ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CHEM.greenDark }} strokeWidth={2.5} />
              : <XCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CHEM.red }} strokeWidth={2.5} />}
            <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">
              {itemCorrect ? 'Correct — right formulae and it balances.' : 'Not yet.'}
              {!itemCorrect && (
                <div className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {report && !report.balanced
                    ? <>The atoms don’t balance yet — check <span className="text-[#c2410c]">{report.offenders.join(', ')}</span>.</>
                    : 'Check each formula against the word equation.'}
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <span className="uppercase tracking-widest text-[10px] text-slate-400">Answer</span>
                    <span className="text-base text-slate-800 dark:text-slate-100 inline-flex items-center gap-1 flex-wrap">
                      {item.reactants.map((s, i) => <span key={`r${i}`} className="inline-flex items-center">{i > 0 && <span className="px-1 text-slate-400">+</span>}<Species coeff={s.coeff} formula={s.formula} /></span>)}
                      <span className="px-1 text-slate-400">→</span>
                      {item.products.map((s, i) => <span key={`p${i}`} className="inline-flex items-center">{i > 0 && <span className="px-1 text-slate-400">+</span>}<Species coeff={s.coeff} formula={s.formula} /></span>)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* actions */}
        <div className="flex items-center justify-end gap-3">
          {!graded ? (
            <button onClick={gradeItem} disabled={!allFilled}
              className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white flex items-center gap-2
                ${allFilled ? 'bg-[#0087a8] border-b-[4px] border-[#026e88] active:border-b-0 active:translate-y-[4px]' : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'}`}>
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

function sameMultiset(a, b) {
  if (a.length !== b.length) return false;
  const key = (s) => `${Number(s.coeff)}·${s.formula}`;
  const bag = {};
  for (const s of a) bag[key(s)] = (bag[key(s)] || 0) + 1;
  for (const s of b) { const k = key(s); if (!bag[k]) return false; bag[k] -= 1; }
  return true;
}

function safeBalance(cur) {
  try {
    return balanceReport(cur.r.filter((s) => s.formula), cur.p.filter((s) => s.formula));
  } catch {
    return { balanced: false, offenders: [] };
  }
}
