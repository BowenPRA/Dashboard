// Dev-only gallery for Find Every Angle (ANGLE_CHASE): every item of one
// unit's `angleChase` drawn three ways — as the student first sees it, with
// its first fact lit, and with every angle found — beside its solving chain
// and the checker's verdict. Entry point: preview-chase.html, `?unit=U05_2`
// (default U05_1), `?only=t2` for one item. Not part of the production build;
// screenshot it headless to review a batch of pictures at once.
import { createRoot } from 'react-dom/client';
import './index.css';
import { getTrack } from './data/index';
import { chaseModel, readyFor, litOf } from './utils/angleChase';
import { proveChaseItem } from './utils/angleChaseCheck';
import AngleChaseFigure from './components/math/AngleChaseFigure.jsx';

const params = new URLSearchParams(window.location.search);
const UNIT = params.get('unit') || 'U05_1';
const ONLY = params.get('only');

function Item({ item, cfg }) {
  let m;
  try { m = chaseModel(item, cfg.facts, { guidedUpTo: cfg.guidedUpTo }); } catch (e) {
    return <div className="p-3 bg-rose-100 rounded-xl font-bold">{item.id}: {e.message}</div>;
  }
  const problems = proveChaseItem(item, cfg.facts, { guidedUpTo: cfg.guidedUpTo });
  const first = m.plan[0];
  const rel = readyFor(m, first, new Set())[0];
  const all = Object.fromEntries(Object.keys(m.vars).filter((n) => m.plan.includes(n)).map((n) => [n, m.vars[n].value]));
  const known = new Set();
  const chain = m.plan.map((n) => {
    const kinds = [...new Set(readyFor(m, n, known).map((r) => r.kind))];
    known.add(n);
    return `${m.vars[n].letter || '?'} = ${m.vars[n].value}° (${kinds.join(' / ')})`;
  });
  const stones = m.plan.filter((n) => !m.vars[n].letter);
  return (
    <div className="rounded-2xl bg-white border-2 border-slate-200 p-3">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-lg font-black">{item.id}</span>
        <span className="text-sm font-bold text-slate-500">level {item.level} · {m.guided ? 'guided' : 'free'}</span>
        <span className={`text-sm font-black ${problems.length ? 'text-rose-600' : 'text-emerald-600'}`}>{problems.length ? problems.join(' · ') : 'proved'}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <AngleChaseFigure model={m} current={m.guided ? first : null} stones={m.guided && !m.vars[first].letter ? [first] : []} maxHeight="none" />
        <AngleChaseFigure model={m} current={first} stones={stones.includes(first) ? [first] : []} lit={litOf(m, rel, first)} maxHeight="none" />
        <AngleChaseFigure model={m} found={all} stones={stones} maxHeight="none" />
      </div>
      <div className="mt-2 text-sm font-bold text-slate-700">{chain.join('  →  ')}</div>
    </div>
  );
}

function Gallery() {
  const unit = getTrack('Y7_MATH').data[UNIT];
  const cfg = unit?.angleChase;
  if (!cfg) return <div className="p-6 font-black">No angleChase in {UNIT}</div>;
  const items = cfg.items.filter((it) => !ONLY || it.id === ONLY);
  return (
    <div className="min-h-screen bg-slate-100 p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-black">{UNIT} · {cfg.title} · {items.length} items · facts: {cfg.facts.join(', ')}</h1>
      {items.map((it) => <Item key={it.id} item={it} cfg={cfg} />)}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Gallery />);
