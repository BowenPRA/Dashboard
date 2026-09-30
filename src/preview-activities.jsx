// Dev-only bench for Notes activity blocks: every Year 7 activity type mounted
// on one page, at the width a laptop gives the side column (34rem) or full
// width. Entry point: preview-activities.html (`?lang=vn`, `?wide`). Not part of
// the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ActivityBlock from './components/notes/ActivityBlock';
import { checkActivity } from './utils/activity';

const params = new URLSearchParams(window.location.search);
const LANG = params.get('lang') === 'vn' ? 'vn' : 'en';
const WIDE = params.has('wide');

const base = (id, type, extra) => ({
  id, type, prompt: `Sample ${type} activity.`, promptVn: `Hoạt động ${type} mẫu.`,
  explain: 'The authored explanation shows here.', explainVn: 'Lời giải thích hiện ở đây.', ...extra,
});

const SAMPLES = [
  base('t1', 'terms', { expr: '7x + 5y − 3x + y' }),
  base('t2', 'terms', { expr: '3ab + 2 + 4ba − x^2 + 5' }),
  base('a1', 'algebra', { mode: 'simplify', expr: '8s − s' }),
  base('a2', 'algebra', { mode: 'expand', expr: '3(x + 2) + 4x' }),
  base('a3', 'algebra', { mode: 'solve', eq: '2a + 4 = 18' }),
  base('g1', 'grid', { expr: '4(3 − c)' }),
  base('g2', 'grid', { expr: '8(6 + 4w − 3g)' }),
  base('f1', 'flow', { eq: '2a + 4 = 18' }),
  base('f2', 'flow', { eq: 'x − 7 = 9' }),
  base('p1', 'periodic', { query: { name: 'magnesium' }, names: false }),
  base('p2', 'periodic', { query: { sameGroupAs: 'He' } }),
  base('p3', 'periodic', { query: { period: 3, metal: true } }),
  base('b1', 'particles', { ask: 'kind', boxes: [['O2', 'O2', 'O2', 'O2', 'O2'], ['H2O', 'H2O', 'H2O', 'H2O'], ['N2', 'N2', 'N2', 'O2', 'O2', 'CO2']] }),
  base('b2', 'particles', { ask: 'find', find: 'compound', boxes: [['CO2', 'CO2', 'CO2', 'CO2'], ['He', 'He', 'He', 'He', 'He'], ['CH4', 'CH4', 'CH4', 'CH4'], ['H2', 'H2', 'Cl2', 'Cl2']] }),
  base('b3', 'particles', { ask: 'magnet', boxes: [['Fe', 'Fe', 'Fe', 'S', 'S', 'S', 'Fe', 'S'], ['FeS', 'FeS', 'FeS', 'FeS', 'FeS']] }),
  base('b4', 'particles', { ask: 'pure', boxes: [['H2O', 'H2O', 'H2O', 'H2O'], ['H2O', 'H2O', 'NaCl', 'NaCl']] }),
  base('m1', 'formula', { ask: 'count', formula: 'CaCO3' }),
  base('m2', 'formula', { ask: 'write', formula: 'CO2' }),
  // Year 7 number units (3.1, 3.2)
  base('s1', 'shift', { n: '7.2', op: '×', p: 3 }),
  base('s2', 'shift', { n: '520', op: '÷', p: 4 }),
  base('s3', 'shift', { kind: 'power', n: '900', op: '÷', result: '0.09' }),
  base('s4', 'shift', { kind: 'convert', n: '4', from: 'kg', to: 'mg' }),
  base('r1', 'round', { n: '34.9892', to: 1 }),
  base('r2', 'round', { n: '283.4617529', to: -1 }),
  base('r3', 'round', { n: '1.99952', to: 3 }),
  base('d1', 'busstop', { dividend: '47', divisor: 4 }),
  base('d2', 'busstop', { dividend: '58', divisor: 7, dp: 3 }),
  base('d3', 'busstop', { dividend: '9.35', divisor: 5 }),
  // Year 7 inequalities (2.6)
  base('i1', 'ineq', { ask: 'draw', ineq: 'x > 3' }),
  base('i2', 'ineq', { ask: 'draw', ineq: 'p > 2.5' }),
  base('i3', 'ineq', { ask: 'read', ineq: 'x < −1' }),
  base('i4', 'ineq', { ask: 'integer', ineq: 'q < −4' }),
  base('i5', 'ineq', { ask: 'list', ineqs: ['s > 20', 's < 24'] }),
  base('i6', 'ineq', { ask: 'list', ineqs: ['n > 7', 'n < 8'] }),
];

function Bench() {
  const [results, setResults] = useState({});
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6">
      <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">Activity bench · {LANG} · {WIDE ? 'wide' : 'side column'}</h1>
      <div className="flex flex-col gap-6">
        {SAMPLES.map((a) => {
          const problems = checkActivity(a, { bilingual: true });
          return (
            <div key={a.id} data-activity={a.id} className="rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-4" style={{ maxWidth: WIDE ? '64rem' : '34rem' }}>
              <div className="text-[11px] font-black uppercase tracking-widest text-orange-600 mb-2">{a.id} · {a.type}{problems.length ? ` · ⚠ ${problems.join('; ')}` : ''}</div>
              <ActivityBlock activity={a} lang={LANG} side={!WIDE} result={results[a.id]}
                onResult={(r) => { console.log('[bench]', a.id, r); setResults((s) => ({ ...s, [a.id]: r })); }} />
              {results[a.id] && <button className="mt-2 text-xs font-black text-slate-400 underline" onClick={() => setResults((s) => { const n = { ...s }; delete n[a.id]; return n; })}>reset</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const el = document.getElementById('root');
const root = (window.__actbenchroot ||= createRoot(el));
root.render(<Bench />);
