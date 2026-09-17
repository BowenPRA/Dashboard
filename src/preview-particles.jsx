// Dev-only harness for Element Hunt (ELEMENT_HUNT) and Particle Lab
// (PARTICLE_LAB): each screen mounted with an inline pool, no auth, no unit
// data. Entry point: preview-particles.html. Not part of the production build.
//
//   ?case=HUNT | LAB_26 | LAB_27 | GALLERY   open a case straight away
//   ?mode=symbol                            narrow the case to one mode
//   ?bilingual=0                            mount as an English-only track
//
// GALLERY draws every drawable particle card, a set of boxes and the table in
// each highlight state, so the drawings can be eyeballed.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ElementHunt from './tasks/ElementHunt';
import ParticleLab from './tasks/ParticleLab';
import PeriodicTableSVG from './components/science/PeriodicTableSVG';
import { AtomKey, SvgPlate } from './components/science/TaskChrome';
import { elementsIn, BOX_OPTS } from './components/science/labMarking';
import { SUBSTANCES, particleCardSvg, boxSvg, clusterSvg, formulaPretty } from './utils/particles';

const PARAMS = new URLSearchParams(window.location.search);
const MODE = PARAMS.get('mode');
const BILINGUAL = PARAMS.get('bilingual') !== '0';

const narrow = (pool) => (MODE && pool.modes.includes(MODE) ? { ...pool, modes: [MODE] } : pool);
const POOLS = {
  HUNT: narrow({ title: 'Element Hunt', titleVn: 'Truy tìm nguyên tố', modes: ['find', 'symbol', 'name', 'place', 'metal', 'mass'], rounds: 12 }),
  LAB_26: narrow({ title: 'Particle Lab', titleVn: 'Phòng thí nghiệm hạt', modes: ['count', 'formula', 'build', 'name', 'classify'], mixtures: false, rounds: 10 }),
  LAB_27: narrow({ title: 'Particle Lab', titleVn: 'Phòng thí nghiệm hạt', modes: ['classify', 'pure', 'magnet', 'formula', 'count'], mixtures: true, rounds: 10 }),
};

const CASES = [
  ['HUNT', 'Element Hunt · find, symbol, name, place, metal, mass · 12 rounds'],
  ['LAB_26', 'Particle Lab (2.6) · count, formula, build, name, classify · no mixtures · 10 rounds'],
  ['LAB_27', 'Particle Lab (2.7) · classify, pure, magnet, formula, count · mixtures · 10 rounds'],
  ['GALLERY', 'Every drawable particle, a set of boxes, and the table in each highlight'],
];

const DRAWABLE = Object.keys(SUBSTANCES).filter((f) => SUBSTANCES[f].atoms);
const BOXES = [
  ['element: O₂', ['O2', 'O2', 'O2', 'O2', 'O2']],
  ['element: He', ['He', 'He', 'He', 'He', 'He', 'He']],
  ['compound: H₂O', ['H2O', 'H2O', 'H2O', 'H2O', 'H2O']],
  ['compound: CH₄', ['CH4', 'CH4', 'CH4', 'CH4', 'CH4']],
  ['mixture of elements: N₂ + O₂', ['N2', 'O2', 'N2', 'O2', 'N2', 'O2']],
  ['mixture of compounds: H₂O + CO₂', ['H2O', 'CO2', 'H2O', 'CO2', 'H2O', 'CO2']],
  ['mixture of both: O₂ + H₂O', ['O2', 'H2O', 'O2', 'H2O', 'O2', 'H2O']],
  ['iron and sulfur, stirred', ['Fe', 'S', 'Fe', 'S', 'Fe', 'S', 'Fe', 'S']],
  ['iron sulfide', ['FeS', 'FeS', 'FeS', 'FeS', 'FeS', 'FeS']],
  ['copper and sulfur', ['Cu', 'S', 'Cu', 'S', 'Cu', 'S', 'S']],
];
const TABLES = [
  ['default (names, metal colours)', {}],
  ['good Na · bad Mg · pick Al · focus Si · masked K · bands period 3 + group 2', { highlight: { Na: 'good', Mg: 'bad', Al: 'pick', Si: 'focus' }, masked: ['K'], bands: [{ period: 3 }, { group: 2 }] }],
  ['symbols only, plain white, vn', { showNames: false, colourByMetal: false, lang: 'vn', highlight: { Ne: 'good', Ar: 'focus', He: 'bad' }, bands: [{ group: 8 }] }],
];

function Back({ onBack }) {
  return (
    <button onClick={onBack} className="mb-6 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-sm">
      ← Back
    </button>
  );
}

function Label({ children }) {
  return <div className="text-[11px] font-black uppercase tracking-widest text-emerald-600 mb-2">{children}</div>;
}

function TapTable() {
  const [picked, setPicked] = useState([]);
  const toggle = (s) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
      <Label>tappable: {picked.join(', ') || 'tap tiles'}</Label>
      <PeriodicTableSVG highlight={Object.fromEntries(picked.map((s) => [s, 'pick']))} onTap={toggle} />
    </div>
  );
}

function Gallery({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6">
      <Back onBack={onBack} />

      <h2 className="font-black text-xl text-slate-700 dark:text-slate-200 mb-3">particleCardSvg — {DRAWABLE.length} drawable substances</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 mb-8">
        {DRAWABLE.map((f) => (
          <div key={f} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-2 flex flex-col gap-2">
            <Label>{formulaPretty(f)} · {SUBSTANCES[f].en}</Label>
            <SvgPlate svg={particleCardSvg(f)} />
            <AtomKey symbols={elementsIn([f])} />
          </div>
        ))}
      </div>

      <h2 className="font-black text-xl text-slate-700 dark:text-slate-200 mb-3">boxSvg</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-8">
        {BOXES.map(([name, particles], i) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3 flex flex-col gap-2">
            <Label>{name}</Label>
            <SvgPlate svg={boxSvg(particles, 1000 + i * 7919, BOX_OPTS)} />
            <AtomKey symbols={elementsIn(particles)} />
          </div>
        ))}
      </div>

      <h2 className="font-black text-xl text-slate-700 dark:text-slate-200 mb-3">clusterSvg (Build tray)</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 mb-8">
        {[[], [{ el: 'O', n: 1 }], [{ el: 'H', n: 2 }, { el: 'O', n: 1 }], [{ el: 'C', n: 1 }, { el: 'H', n: 4 }], [{ el: 'Ca', n: 1 }, { el: 'Cl', n: 2 }], [{ el: 'N', n: 6 }, { el: 'H', n: 6 }]].map((counts, i) => (
          <div key={i} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-2">
            <Label>{counts.map((c) => `${c.el}×${c.n}`).join(' ') || 'empty'}</Label>
            <SvgPlate svg={clusterSvg(counts)} />
          </div>
        ))}
      </div>

      <h2 className="font-black text-xl text-slate-700 dark:text-slate-200 mb-3">PeriodicTableSVG</h2>
      <div className="flex flex-col gap-4 max-w-5xl">
        {TABLES.map(([name, props]) => (
          <div key={name} className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3">
            <Label>{name}</Label>
            <PeriodicTableSVG {...props} />
          </div>
        ))}
        <TapTable />
        <div className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3 max-w-[22rem]">
          <Label>narrow (names drop out below 560px)</Label>
          <PeriodicTableSVG highlight={{ C: 'focus' }} />
        </div>
      </div>
    </div>
  );
}

function Harness() {
  const initial = PARAMS.get('case');
  const [open, setOpen] = useState(CASES.some(([id]) => id === initial) ? initial : null);
  const close = () => setOpen(null);
  const done = (score, _blob, log) => { console.log(`[harness] ${open} complete`, score, log); close(); };

  if (open === 'GALLERY') return <Gallery onBack={close} />;
  if (open === 'HUNT') return <ElementHunt pool={POOLS.HUNT} onComplete={done} onQuit={close} bilingual={BILINGUAL} />;
  if (open === 'LAB_26' || open === 'LAB_27') return <ParticleLab key={open} pool={POOLS[open]} onComplete={done} onQuit={close} bilingual={BILINGUAL} />;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">Element Hunt + Particle Lab harness</h1>
      <p className="text-slate-500 font-bold mb-6">Inline pools, mounted without auth{MODE ? ` · mode narrowed to “${MODE}”` : ''}{BILINGUAL ? '' : ' · English only'}.</p>
      <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
        {CASES.map(([id, label]) => (
          <button key={id} onClick={() => setOpen(id)}
            className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-400">
            <div className="text-[11px] font-black uppercase tracking-widest text-emerald-500">{id}</div>
            <div className="font-black text-slate-800 dark:text-slate-100">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Reuse one root across HMR so a re-run never calls createRoot twice on #root.
const el = document.getElementById('root');
const root = (window.__particlesroot ||= createRoot(el));
root.render(<Harness />);
