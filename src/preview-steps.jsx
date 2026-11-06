// Dev-only harness for the step practice (STEP_PRACTICE, docs/step-practice.md).
// preview-steps.html?set=y5maths|y5science|y5english
//   &level=focus|practice|challenge   only that level's items
//   &item=f2                           one item
//   &lang=vn|fr                        open in that language (EN is next on the toggle)
//   &big=1                             the young-learner look
//   &saved=f1,f2                       pretend those items were saved last time
//   &core=1                            mount the bare core (no TopBar) as another app would
//   &dark=1                            dark mode
// Not part of the production build (only index.html is a build input).
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import StepPractice from './tasks/StepPractice.jsx';
import StepPracticeSet from './stepPractice/StepPracticeSet.jsx';
import { SAMPLE_SETS } from './stepPractice/samples/index.js';
import { checkStepPractice } from './stepPractice/check.js';

const q = new URLSearchParams(window.location.search);
if (q.get('dark') === '1') document.documentElement.classList.add('dark');
const KEY = q.get('set') || 'y5maths';
const base = SAMPLE_SETS[KEY];
const pool = base && {
  ...base,
  big: q.get('big') === '1' || base.big,
  items: base.items.filter((it) => (!q.get('level') || it.level === q.get('level')) && (!q.get('item') || it.id === q.get('item'))),
};
const lang = q.get('lang');
const langs = lang === 'vn' ? ['vn', 'en'] : lang === 'fr' ? ['fr', 'en', 'vn'] : ['en', 'vn'];
const saved = Object.fromEntries((q.get('saved') || '').split(',').filter(Boolean).map((id) => [id, 1]));

function Harness() {
  const [log, setLog] = useState([]);
  if (!pool) return <div className="p-6 font-black">No sample set "{KEY}". Sets: {Object.keys(SAMPLE_SETS).join(', ')}</div>;
  const problems = checkStepPractice(base, { vn: true });
  const note = (kind) => (score, blob, meta) => setLog((l) => [...l, { kind, score, blob, meta }]);
  return (
    <>
      {q.get('core') === '1'
        ? <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950"><StepPracticeSet set={pool} lang={lang || 'en'} saved={saved} onSave={(s) => note('save')(s.score, s.blob, s)} onFinish={(s) => note('finish')(s.score, s.blob, s)} /></div>
        : <StepPractice pool={pool} savedData={saved} langs={langs} onProgress={note('progress')} onComplete={note('complete')} onQuit={() => note('quit')()} />}
      <pre id="harness-log" className="fixed bottom-0 right-0 max-w-sm max-h-40 overflow-auto text-[10px] bg-black/70 text-lime-200 p-2 m-2 rounded hidden">
        {problems.length ? `CHECK: ${problems.join(' | ')}\n` : ''}{log.map((l) => `${l.kind} ${l.score} ${JSON.stringify(l.blob)}`).join('\n')}
      </pre>
    </>
  );
}

const el = document.getElementById('root');
el.__root ??= createRoot(el);
el.__root.render(<Harness />);
