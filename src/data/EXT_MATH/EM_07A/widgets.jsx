// src/data/EXT_MATH/EM_07A/widgets.jsx
// Widgets for EM_07A — Bounds, Inequalities & Simultaneous Equations. Two, and
// each does one thing a still slide cannot (the classroom decks' rule):
//
//   RegionTester        Tap any point on the grid: each of the three
//                       inequalities is worked out AT that point, ticked or
//                       crossed, and the point is in R only when all three
//                       tick. The test-a-point method, made physical — and a
//                       point on a dashed line fails while one on a solid line
//                       passes. The shading waits behind a button.
//
//   EliminationMachine  Simultaneous equations as a stepper: the method and
//                       why, the multiplying, the columns with the cancelled
//                       letter struck through, solve, back-substitute, check
//                       — and finally both lines crossing at the answer.
//
// Every number shown is DERIVED (utils/inequalities.js, utils/simultaneous.js),
// so a widget can never show a wrong answer. English only, like the rest of
// this track; `lang` is accepted and ignored.
import { useState } from 'react';
import { ArrowRight, SkipForward, Undo2, Eye, EyeOff } from 'lucide-react';
import { SafeInlineMath } from '../../../components/notes/SafeMath.jsx';
import CoordGrid from '../../../components/math/CoordGrid.jsx';
import { deriveRegion, REL_LATEX } from '../../../utils/inequalities';
import { deriveSimEq, methodOptions, tidyLatex, oneLetterLatex, frLatex, coefTerm } from '../../../utils/simultaneous';

const PINK = '#be185d';
const EMER = '#047857';
const KEY = '#c2410c';
const RED = '#dc2626';
const BLUE = '#2563eb';
const GREEN = '#15803d';

function Btn({ onClick, disabled, tone = 'violet', icon: Icon, children }) {
  const tones = {
    violet: 'bg-[#7c3aed] border-[#5b21b6]',
    sky: 'bg-[#0369a1] border-[#075985]',
    emerald: 'bg-[#047857] border-[#065f46]',
    orange: 'bg-[#c2410c] border-[#9a3412]',
    slate: 'bg-slate-500 border-slate-700',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-3.5 py-2 text-xs sm:text-sm disabled:opacity-35 disabled:pointer-events-none ${tones[tone] || tones.violet}`}
    >
      {Icon && <Icon className="w-4 h-4" strokeWidth={3} />}
      {children}
    </button>
  );
}

/* ============================================================= *
 * WIDGET 1 — REGION TESTER
 * ============================================================= */
const REGION = deriveRegion({
  grid: { xMin: -1, xMax: 8, yMin: -1, yMax: 8 },
  lines: [{ eq: 'x = 1', dashed: true, labelAt: [1.2, 7.4] }, { eq: 'y = 1' }, { eq: 'x + y = 7', labelAt: [2.4, 5.7] }],
  point: [2, 2],
});
const REGION_COLORS = [PINK, BLUE, KEY];
const holds = (lhs, rel, rhs) => (rel === '<' ? lhs < rhs : rel === '<=' ? lhs <= rhs + 1e-9 : rel === '>' ? lhs > rhs : lhs >= rhs - 1e-9);
const numText = (v) => String(Number(v.toFixed(2))).replace('-', '−');

export function RegionTester() {
  const [pt, setPt] = useState([5, 3]);
  const [shaded, setShaded] = useState(false);
  const rows = REGION.lines.map((l) => {
    const { lhs, rhs } = l.at(pt[0], pt[1]);
    return { l, lhs, rhs, ok: holds(lhs, l.rel, rhs), onLine: Math.abs(lhs - rhs) < 1e-9 };
  });
  const inR = rows.every((r) => r.ok);
  const fails = rows.filter((r) => !r.ok);

  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center select-none">
      <div className="w-full sm:w-[50%] max-w-[26rem] shrink-0">
        <CoordGrid window={REGION.grid} vars={['x', 'y']}
          region={shaded ? REGION.lines.map((l) => l.half) : null} regionLabel={shaded ? 'R' : null}
          lines={REGION.lines.map((l, i) => ({ a: l.a, b: l.b, c: l.c, dashed: l.dashed, color: REGION_COLORS[i], label: l.eqLatex.replace(/-/g, '−'), labelAt: l.labelAt }))}
          points={[{ x: pt[0], y: pt[1], label: `(${numText(pt[0])}, ${numText(pt[1])})`, color: inR ? GREEN : RED }]}
          onPick={(x, y) => setPt([x, y])} />
        <p className="mt-1 text-center text-[11px] font-bold text-slate-400">Tap anywhere on the grid to test that point.</p>
      </div>
      <div className="w-full sm:flex-1 min-w-0 flex flex-col gap-2">
        {rows.map(({ l, lhs, rhs, ok, onLine }, i) => (
          <div key={l.eq} className={`rounded-xl border-2 px-3 py-2 flex items-center gap-3 ${ok ? 'border-[#58a700] bg-[#f0fdf4]' : 'border-rose-300 bg-rose-50'}`}>
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: REGION_COLORS[i] }} />
            <div className="flex-1 min-w-0 text-base sm:text-lg text-slate-800 [&_.katex]:inline-block">
              <SafeInlineMath math={l.written} />
              <div className="text-sm text-slate-500 [&_.katex]:inline-block">
                <SafeInlineMath math={`${numText(lhs)} ${REL_LATEX[l.rel]} ${numText(rhs)}`} />
                {onLine && <span className="ml-2 font-bold">{l.dashed ? 'on a dashed line: not included' : 'on a solid line: included'}</span>}
              </div>
            </div>
            <span className={`text-xl font-black ${ok ? 'text-[#3e7500]' : 'text-rose-600'}`}>{ok ? '✓' : '✗'}</span>
          </div>
        ))}
        <div className={`rounded-xl px-3 py-2 text-center font-black ${inR ? 'bg-[#58cc02] text-white' : 'bg-slate-100 text-slate-600'}`}>
          {inR ? 'All three hold: this point is in R.' : `Not in R — it fails ${fails.length === 1 ? 'one inequality' : `${fails.length} inequalities`}.`}
        </div>
        <div className="flex justify-center">
          <Btn tone="violet" icon={shaded ? EyeOff : Eye} onClick={() => setShaded((s) => !s)}>{shaded ? 'Hide the region' : 'Show the region'}</Btn>
        </div>
      </div>
    </div>
  );
}

/* ============================================================= *
 * WIDGET 2 — ELIMINATION MACHINE
 * ============================================================= */
const EXAMPLES = [
  { eqs: ['3x + 2y = 16', '5x - 2y = 16'] },
  { eqs: ['5x + 3y = 21', '2x - y = 4'] },
  { eqs: ['y = 2x - 1', '3x + 2y = 12'] },
];

function stepsOf(m) {
  const { vars, tidy, labels } = m;
  const right = methodOptions(m).find((o) => o.correct);
  const eqLines = m.method === 'sub'
    ? [`${m.subject.latex} \\quad ${labels[m.subject.idx]}`, `${tidyLatex(tidy[m.other], vars)} \\quad ${labels[m.other]}`]
    : [0, 1].map((i) => `${tidyLatex(tidy[i], vars)} \\quad ${labels[i]}`);
  const steps = [{ name: 'Two equations', lines: eqLines, say: 'Two unknowns need two equations. Number them, so you can say which one you use.' }];
  steps.push({ name: 'Choose', lines: [], say: `${right.label} — because ${right.why}.`, method: true });
  if (m.method === 'sub') {
    steps.push({ name: 'Substitute', lines: [`${m.subLine}`], say: `Replace $${m.subject.v}$ in ${labels[m.other]} with what ${labels[m.subject.idx]} says it is — in a bracket.` });
    const c = m.collected;
    steps.push({ name: 'Collect', lines: [`${coefTerm(c.k, m.subject.w)}${c.c ? ` ${c.c < 0 ? '-' : '+'} ${Math.abs(c.c)}` : ''} = ${c.rhs}`], say: 'Expand the bracket and collect. Only one letter is left.' });
  } else {
    const e = m.elim;
    const mult = m.plan.m;
    const scaled = [0, 1].filter((i) => mult[i] !== 1);
    if (scaled.length) {
      steps.push({ name: 'Multiply', lines: scaled.map((i) => `\\text{${labels[i]}} \\times ${mult[i]}\\text{:} \\; ${tidyLatex(e.scaled[i], vars)}`), say: `Make the $${e.letter}$ terms the same size. Multiply EVERY term — the right-hand side too.` });
    }
    steps.push({ name: e.op === 'add' ? 'Add' : 'Subtract', columns: true, lines: [`${oneLetterLatex(Math.abs(e.result.k), e.keep, e.result.k < 0 ? -e.result.c : e.result.c)}`],
      say: e.op === 'add' ? `The $${e.letter}$ terms have different signs, so ADD: they cancel.` : `The $${e.letter}$ terms have the same sign, so SUBTRACT: they cancel.` });
  }
  steps.push({ name: 'Solve', lines: [`${m.first} = ${frLatex(m.firstValue)}`], say: 'Divide by the number in front.' });
  steps.push({ name: 'Back', lines: [`${m.back.latex} \\;\\Rightarrow\\; ${m.back.letter} = ${frLatex(m.back.value)}`], say: `Put $${m.first} = ${frLatex(m.firstValue)}$ into ${labels[m.back.idx]} to find $${m.back.letter}$.` });
  steps.push({ name: 'Check', lines: [`${m.check.latex} = ${m.check.rhs} \\; \\checkmark`], say: `Both values in ${labels[m.check.idx]}, the one not used yet. It works.` });
  steps.push({ name: 'The picture', lines: [], say: 'Each equation is a straight line. The answer is the one point on both.', graph: true });
  return steps;
}

export function EliminationMachine() {
  const [ex, setEx] = useState(1);
  const [step, setStep] = useState(0);
  const m = deriveSimEq(EXAMPLES[ex]);
  const steps = stepsOf(m);
  const cur = steps[step];
  const { vars, tidy } = m;
  const sx = m.sol[vars[0]].n / m.sol[vars[0]].d;
  const sy = m.sol[vars[1]].n / m.sol[vars[1]].d;
  const shown = steps.slice(0, step + 1).flatMap((s, i) => s.lines.map((l) => ({ l, fresh: i === step })));
  const e = m.elim;

  return (
    <div className="w-full h-full flex flex-col gap-2 select-none">
      <div className="flex flex-wrap gap-1.5">
        {steps.map((s, i) => (
          <span key={s.name} className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide border-2 ${i === step ? 'bg-[#047857] border-[#047857] text-white' : i < step ? 'border-[#047857] text-[#047857]' : 'border-slate-200 text-slate-400'}`}>
            {i + 1} {s.name}
          </span>
        ))}
      </div>
      <div className="flex-1 min-h-0 flex flex-col sm:flex-row gap-3">
        <div className="sm:w-[55%] rounded-2xl border-2 border-slate-200 bg-white p-3 overflow-auto text-slate-800">
          {cur.graph ? (
            <div className="max-w-sm mx-auto">
              <CoordGrid window={{ xMin: Math.min(-1, Math.floor(sx) - 4), xMax: Math.max(1, Math.ceil(sx) + 4), yMin: Math.min(-1, Math.floor(sy) - 4), yMax: Math.max(1, Math.ceil(sy) + 4) }}
                lines={tidy.map((t, i) => ({ ...t, color: i ? KEY : EMER, label: tidyLatex(t, vars).replace(/-/g, '−') }))}
                points={[{ x: sx, y: sy, label: `(${sx}, ${sy})`.replace(/-/g, '−'), color: PINK }]} />
            </div>
          ) : cur.columns ? (
            <div className="flex flex-col items-center gap-1">
              {[0, 1].map((i) => {
                const t = e.scaled[i];
                const struckKey = e.letter === vars[0] ? 'a' : 'b';
                const cell = (k) => (
                  <span className={`relative inline-block min-w-[4.5rem] text-center ${k === struckKey ? 'text-rose-500' : ''}`}>
                    <SafeInlineMath math={k === 'a' ? coefTerm(t.a, vars[0]) : coefTerm(t.b, vars[1], false)} />
                    {k === struckKey && <span className="absolute left-1 right-1 top-1/2 h-[3px] -rotate-12 bg-rose-500 rounded" />}
                  </span>
                );
                return (
                  <div key={i} className="flex items-center gap-2 text-xl [&_.katex]:inline-block">
                    <span className="w-6 font-black text-emerald-700">{i === 1 ? (e.op === 'add' ? '+' : '−') : ''}</span>
                    {cell('a')}{cell('b')}<SafeInlineMath math={`= ${t.c}`} />
                  </div>
                );
              })}
              <div className="h-[3px] w-64 bg-slate-700 rounded my-1" />
              <div className="text-xl font-black text-emerald-700 [&_.katex]:inline-block"><SafeInlineMath math={cur.lines[0]} /></div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {shown.map(({ l, fresh }, i) => (
                <div key={i} className={`text-lg sm:text-xl rounded-lg px-2 py-0.5 [&_.katex]:inline-block ${fresh ? 'bg-emerald-50 text-emerald-900' : ''}`}><SafeInlineMath math={l} /></div>
              ))}
              {cur.method && <div className="text-sm font-bold text-slate-400 px-2">(nothing to write yet — just decide)</div>}
            </div>
          )}
        </div>
        <div className="sm:flex-1 flex flex-col justify-between gap-3">
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-100 p-3 text-base sm:text-lg font-bold text-emerald-900 leading-snug [&_.katex]:inline-block">
            {cur.say.split('$').map((p, i) => (i % 2 ? <SafeInlineMath key={i} math={p} /> : <span key={i}>{p}</span>))}
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Btn>
            <Btn tone="emerald" icon={ArrowRight} disabled={step === steps.length - 1} onClick={() => setStep((s) => s + 1)}>Next step</Btn>
            <Btn tone="orange" icon={SkipForward} onClick={() => { setEx((x) => (x + 1) % EXAMPLES.length); setStep(0); }}>Next example</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
