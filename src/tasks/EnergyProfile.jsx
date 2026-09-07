import { useState, useMemo } from 'react';
import {
  Flame, Snowflake, CheckCircle2, XCircle, ArrowRight, Trophy, Construction,
  RotateCcw, TrendingUp, TrendingDown, MoveVertical,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Formula } from './chemWidgets';
import { CHEM } from './chemPalette';
import { RUNGS, REACT_RUNG, MAX_PEAK, profileOf, gradeAttempt } from '../utils/energyProfile';

/* ------------------------------------------------------------------ *
 * ENERGY DIAGRAMS — "draw the reaction pathway."
 *
 * The Cambridge worked example (C5.01) asks the student to DRAW an energy level
 * diagram in seven steps. This task is those steps made live: the student
 *
 *   1. moves the PRODUCTS line above or below the fixed reactants line;
 *   2. drags out the ACTIVATION ENERGY hump — which has to clear both lines;
 *   3. labels the enthalpy change ΔH as negative or positive.
 *
 * The diagram redraws under their hands as they go, so the shape and the
 * chemistry stay welded together: push the products down and the arrow flips to
 * point down, the panel turns warm, and "heat given out" is suddenly the only
 * label that fits.
 *
 * Every judgement is DERIVED from the geometry by src/utils/energyProfile.js —
 * nothing is compared against a stored picture, and `checkItem` refuses an item
 * whose stated ΔH contradicts its stated type, so a wrong key cannot ship.
 *
 * Reads a unit's `energyProfile` array:
 *   { id, name, wordEquation, reactants: 'CH4(g) + 2O2(g)',
 *     products: 'CO2(g) + 2H2O(g)', type: 'exothermic', deltaH: -728,
 *     note: '...' }
 *
 * SCORING. An item is worth 1 when the level, the hump and the sign are all
 * right. XP = share of items correct, scaled from nativeMax 10 to the unit maxXP.
 * ------------------------------------------------------------------ */

const WARM = '#c8102e';
const COOL = '#1a5fa8';
const LINE = '#2f8f5b'; // the coursebook's green energy levels

/**
 * Render one side of an equation, e.g. "CH4(g) + 2O2(g)".
 *
 * The two digits in "2O2" mean opposite things and must not look alike: the
 * LEADING one is a coefficient (full size, how many molecules) and the trailing
 * one is a subscript (part of the formula). `Formula` subscripts every digit it
 * meets, so each species is split first — peel off the coefficient, hand the
 * rest to `Formula`, and keep the state symbol upright at full size.
 */
function EquationSide({ text, className = '' }) {
  const species = String(text).split(/\s*\+\s*/).filter(Boolean);
  return (
    <span className={`inline-flex items-baseline flex-wrap justify-center gap-x-1 ${className}`}>
      {species.map((sp, i) => {
        const [, coeff, rest] = /^(\d*)([\s\S]*)$/.exec(sp.trim());
        const parts = rest.split(/(\([slgaq]+\))/g).filter((p) => p !== '');
        return (
          <span key={i} className="inline-flex items-baseline">
            {i > 0 && <span className="font-black text-slate-400 mr-1">+</span>}
            {coeff && <span className="font-mono font-black">{coeff}</span>}
            {parts.map((p, j) =>
              /^\([slgaq]+\)$/.test(p)
                ? <span key={j} className="font-mono font-bold opacity-70">{p}</span>
                : <Formula key={j} text={p} />
            )}
          </span>
        );
      })}
    </span>
  );
}

/* ---- the live diagram --------------------------------------------- */

// The width has to carry the ΔH label to the RIGHT of the enthalpy arrow, which
// sits near the products end of the plot — at 460 the "kJ/mol" ran off the edge.
const W = 530, H = 300;
const PAD_L = 54, PAD_R = 18, PAD_T = 22, PAD_B = 42;
const PLOT_H = H - PAD_T - PAD_B;
const rungY = (r) => PAD_T + PLOT_H - (r / (RUNGS - 1)) * PLOT_H;

function Diagram({ item, productRung, peak, sign, graded, res }) {
  const yR = rungY(REACT_RUNG);
  const yP = rungY(productRung);
  const summit = REACT_RUNG + peak;
  const yS = rungY(Math.min(summit, RUNGS - 1));

  const xA = PAD_L + 14;          // reactants line starts
  const xB = PAD_L + 150;         // reactants line ends / climb begins
  const xC = PAD_L + 215;         // summit
  const xD = PAD_L + 278;         // products line begins
  const xE = W - PAD_R - 6;       // products line ends

  const exo = productRung < REACT_RUNG;
  const accent = productRung === REACT_RUNG ? '#94a3b8' : exo ? WARM : COOL;

  // The reaction pathway: flat, up over the hump, down (or up) to the products.
  const path = peak > 0
    ? `M ${xA} ${yR} L ${xB} ${yR} C ${xB + 26} ${yR}, ${xC - 30} ${yS}, ${xC} ${yS} C ${xC + 30} ${yS}, ${xD - 26} ${yP}, ${xD} ${yP} L ${xE} ${yP}`
    : `M ${xA} ${yR} L ${xB + 40} ${yR} L ${xD - 10} ${yP} L ${xE} ${yP}`;

  // ΔH arrow: from the reactants level to the products level, drawn between them.
  const xArrow = xD + 26;
  const arrowDown = yP > yR;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img"
      aria-label={`Energy level diagram: products ${exo ? 'below' : productRung === REACT_RUNG ? 'level with' : 'above'} reactants`}>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
      <rect x="0.75" y="0.75" width={W - 1.5} height={H - 1.5} rx="13" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* faint rung guides, so the ladder the student is moving on is visible */}
      {Array.from({ length: RUNGS }, (_, r) => (
        <line key={r} x1={PAD_L} y1={rungY(r)} x2={W - PAD_R} y2={rungY(r)}
          stroke="#eef2f7" strokeWidth="1" />
      ))}

      {/* axes */}
      <line x1={PAD_L} y1={PAD_T - 12} x2={PAD_L} y2={H - PAD_B} stroke="#2b2b2b" strokeWidth="2" />
      <path d={`M ${PAD_L} ${PAD_T - 18} l -5 9 l 10 0 z`} fill="#2b2b2b" />
      <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R + 4} y2={H - PAD_B} stroke="#2b2b2b" strokeWidth="2" />
      <path d={`M ${W - PAD_R + 10} ${H - PAD_B} l -9 -5 l 0 10 z`} fill="#2b2b2b" />
      <text x={-(PAD_T + PLOT_H / 2)} y="20" transform="rotate(-90)" textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#475569">Energy / kJ</text>
      <text x={PAD_L + (W - PAD_L - PAD_R) / 2} y={H - 14} textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#475569">Progress of reaction</text>

      {/* the pathway */}
      <path d={path} fill="none" stroke={LINE} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* the two energy levels, drawn thick over the pathway */}
      <line x1={xA} y1={yR} x2={xB} y2={yR} stroke={LINE} strokeWidth="6" strokeLinecap="round" />
      <line x1={xD} y1={yP} x2={xE} y2={yP} stroke={LINE} strokeWidth="6" strokeLinecap="round" />

      {/* labels for the two levels */}
      <text x={xA} y={yR - 12} fontFamily="Inter, system-ui, sans-serif" fontSize="12.5" fontWeight="700" fill="#334155">reactants</text>
      <text x={xE} y={yP > yR ? yP - 12 : yP + 22} textAnchor="end"
        fontFamily="Inter, system-ui, sans-serif" fontSize="12.5" fontWeight="700" fill="#334155">products</text>

      {/* the activation energy bracket, once a hump exists */}
      {peak > 0 && (
        <g>
          <line x1={xC} y1={yS} x2={xC} y2={yR} stroke={accent} strokeWidth="1.6" strokeDasharray="4 3" />
          <path d={`M ${xC} ${yS + 2} l -4 8 l 8 0 z`} fill={accent} />
          <text x={xC - 8} y={(yS + yR) / 2 + 4} textAnchor="end"
            fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fontWeight="700" fill={accent}>Ea</text>
        </g>
      )}

      {/* the enthalpy-change arrow between the levels */}
      {productRung !== REACT_RUNG && (
        <g>
          <line x1={xArrow} y1={arrowDown ? yR : yP} x2={xArrow} y2={arrowDown ? yP - 7 : yR - 7}
            stroke={accent} strokeWidth="2.4" />
          <path d={arrowDown
            ? `M ${xArrow} ${yP} l -5 -10 l 10 0 z`
            : `M ${xArrow} ${yP} l -5 10 l 10 0 z`} fill={accent} />
          {graded && (
            <text x={xArrow + 9} y={(yR + yP) / 2 + 4}
              fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="700" fill={accent}>
              {`ΔH = ${item.deltaH > 0 ? '+' : '−'}${Math.abs(item.deltaH)} kJ/mol`}
            </text>
          )}
        </g>
      )}

      {/* the sign the student has chosen, once they have chosen one */}
      {sign && (
        <text x={PAD_L + 14} y={H - PAD_B + 22}
          fontFamily="Inter, system-ui, sans-serif" fontSize="12.5" fontWeight="700"
          fill={graded ? (res?.signOk ? '#3e7500' : WARM) : '#64748b'}>
          {`ΔH is ${sign === '-' ? 'negative' : 'positive'}`}
        </text>
      )}
    </svg>
  );
}

/* ---- a small stepper used for both level and hump ------------------ */

function Stepper({ label, icon: Icon, display, disabled, ok, onBump }) {
  return (
    <div className={`flex-1 rounded-2xl border-2 p-3 bg-white dark:bg-slate-900
      ${ok === undefined ? 'border-slate-200 dark:border-slate-700' : ok ? 'border-[#58a700]' : 'border-[#ff4b4b]'}`}>
      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">
        <Icon className="w-3.5 h-3.5" strokeWidth={3} /> {label}
      </div>
      <div className="flex items-center justify-between gap-2">
        <button disabled={disabled} onClick={() => onBump(-1)}
          className="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-black text-slate-500 hover:border-[#0087a8] disabled:opacity-40">▼</button>
        <span className="flex-1 text-center text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">{display}</span>
        <button disabled={disabled} onClick={() => onBump(+1)}
          className="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-black text-slate-500 hover:border-[#0087a8] disabled:opacity-40">▲</button>
      </div>
    </div>
  );
}

/* ---- the task ------------------------------------------------------ */

export default function EnergyProfile({ pool, onComplete, onQuit }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : pool?.items || []), [pool]);

  const [idx, setIdx] = useState(0);
  const [graded, setGraded] = useState(false);
  const [results, setResults] = useState({});
  const [ended, setEnded] = useState(false);
  const [answers, setAnswers] = useState({});

  const item = items[idx];
  const isLast = idx >= items.length - 1;

  // Start level with the reactants and with no hump — the student builds it all.
  const blank = () => ({ productRung: REACT_RUNG, peak: 0, sign: null });
  const cur = answers[idx] || blank();
  const setCur = (patch) => setAnswers((a) => ({ ...a, [idx]: { ...cur, ...patch } }));

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-[#0087a8]" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No energy diagrams yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#0087a8] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#026e88] active:border-b-0 active:translate-y-[4px]">Return to Dashboard</button>
      </div>
    );
  }

  const res = results[idx];
  const ready = cur.productRung !== REACT_RUNG && cur.peak >= 1 && !!cur.sign;

  const gradeItem = () => {
    setResults((r) => ({ ...r, [idx]: gradeAttempt(item, cur) }));
    setGraded(true);
  };

  const next = () => { setIdx((i) => i + 1); setGraded(false); };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const total = items.length;
    const correct = Object.values(results).filter((r) => r.correct).length;
    const raw = total ? Math.round((correct / total) * 10) : 0;
    const log = items.map((it, i) => ({ itemId: it.id || `energy-${i}`, correct: !!results[i]?.correct }));
    onComplete?.(raw, null, { items: log });
  };

  const clearedCount = Object.values(results).filter((r) => r.correct).length;
  const truth = profileOf(item);

  const levelWord = cur.productRung === REACT_RUNG ? 'level with the reactants'
    : cur.productRung < REACT_RUNG ? `${REACT_RUNG - cur.productRung} below` : `${cur.productRung - REACT_RUNG} above`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={onQuit} modeTitle={pool?.title || 'Energy Diagrams'} current={idx + 1} total={items.length} />

      <div className="flex-1 w-full max-w-2xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor: CHEM.teal, backgroundColor: CHEM.tealSoft }}>
            <MoveVertical className="w-4 h-4" style={{ color: CHEM.tealDark }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">Reaction {idx + 1}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} /> {clearedCount} / {items.length} correct
          </div>
        </div>

        {/* the reaction */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-5 py-4 text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Draw the energy level diagram for</div>
          <div className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1">{item.name}</div>
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{item.wordEquation}</div>
          <div className="text-base text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2 flex-wrap">
            <EquationSide text={item.reactants} />
            <span className="font-black text-slate-400">&rarr;</span>
            <EquationSide text={item.products} />
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-black uppercase tracking-widest"
            style={{ color: truth.exo ? WARM : COOL, backgroundColor: truth.exo ? '#c8102e14' : '#1a5fa814' }}>
            {truth.exo ? <Flame className="w-3.5 h-3.5" strokeWidth={3} /> : <Snowflake className="w-3.5 h-3.5" strokeWidth={3} />}
            {truth.exo ? 'heat is given out' : 'heat is taken in'}
          </div>
        </div>

        {/* the live diagram */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white overflow-hidden">
          <Diagram item={item} productRung={cur.productRung} peak={cur.peak} sign={cur.sign} graded={graded} res={res} />
        </div>

        {/* step 1 + 2 — the two levers */}
        <div className="flex gap-3">
          <Stepper
            label="Products line" icon={cur.productRung < REACT_RUNG ? TrendingDown : TrendingUp}
            display={levelWord} disabled={graded} ok={graded ? res.levelOk : undefined}
            onBump={(d) => setCur({ productRung: Math.max(0, Math.min(RUNGS - 1, cur.productRung + d)) })} />
          <Stepper
            label="Activation energy" icon={TrendingUp}
            display={cur.peak === 0 ? 'no hump yet' : `${cur.peak} above reactants`}
            disabled={graded} ok={graded ? res.eaOk : undefined}
            onBump={(d) => setCur({ peak: Math.max(0, Math.min(MAX_PEAK, cur.peak + d)) })} />
        </div>

        {/* step 3 — the sign of ΔH */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-full bg-[#0087a8] text-white text-[11px] font-black flex items-center justify-center">3</span>
            <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Label the enthalpy change</span>
          </div>
          <div className="flex gap-3">
            {[
              { s: '-', head: 'ΔH is negative', sub: 'energy given out', col: WARM },
              { s: '+', head: 'ΔH is positive', sub: 'energy taken in', col: COOL },
            ].map((o) => (
              <button key={o.s} disabled={graded} onClick={() => setCur({ sign: o.s })}
                className={`flex-1 rounded-2xl border-2 px-3 py-3 text-left transition-all
                  ${cur.sign === o.s
                    ? 'text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#0087a8]'}
                  ${graded ? 'opacity-90 cursor-default' : ''}`}
                style={cur.sign === o.s ? { backgroundColor: o.col, borderColor: o.col } : undefined}>
                <div className="font-black text-sm">{o.head}</div>
                <div className={`text-[11px] font-bold ${cur.sign === o.s ? 'opacity-80' : 'text-slate-400'}`}>{o.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* hint / verdict */}
        {!graded && (
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400 text-center px-3">
            {cur.peak === 0
              ? 'Every reaction needs a hump: bonds must be broken before new ones form.'
              : item.note}
          </div>
        )}
        {graded && (
          <div className="flex items-start gap-2 rounded-xl border-2 p-3"
            style={{ borderColor: res.correct ? CHEM.green : CHEM.red, backgroundColor: res.correct ? `${CHEM.green}1f` : `${CHEM.red}14` }}>
            {res.correct
              ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CHEM.greenDark }} strokeWidth={2.5} />
              : <XCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CHEM.red }} strokeWidth={2.5} />}
            <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">
              {res.correct ? `Correct — ${item.note}` : (
                <>
                  {!res.levelOk && <>The products belong <b>{truth.exo ? 'below' : 'above'}</b> the reactants: heat is {truth.arrow}, so the system{truth.exo ? ' loses' : ' gains'} energy. </>}
                  {!res.eaOk && <>The activation-energy hump must rise <b>above both</b> lines — bonds are broken before any are made. </>}
                  {!res.signOk && <>&Delta;H is <b>{truth.sign === '-' ? 'negative' : 'positive'}</b> here ({item.deltaH > 0 ? '+' : '−'}{Math.abs(item.deltaH)} kJ/mol). </>}
                  {item.note}
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
