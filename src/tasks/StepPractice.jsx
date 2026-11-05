import { useState } from 'react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import StepPracticeSet from '../stepPractice/StepPracticeSet.jsx';
import { tr } from '../stepPractice/model';
import { summaryOf } from '../stepPractice/progress';

/* ------------------------------------------------------------------ *
 * STEP_PRACTICE (p93) — the Dashboard's wrapper round the portable
 * step-practice core in src/stepPractice (docs/step-practice.md). The core
 * draws the set; this file adds only what is the Dashboard's own: the
 * TopBar with its language toggle and Save & Quit, and the save round-trip
 * (savedData in, onProgress after each item, onComplete at the end).
 *
 * Blob: { [itemId]: 1 } for items finished without help. Score out of 10.
 * ------------------------------------------------------------------ */

export default function StepPractice({ pool, savedData, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const [saved] = useState(() => (savedData && typeof savedData === 'object' ? savedData : {}));
  const [last, setLast] = useState(null);
  const [pos, setPos] = useState(0);
  const items = pool?.items || [];
  const total = Math.max(1, items.filter((it) => saved[it.id] !== 1).length || items.length);
  const title = tr(lang, pool?.title, pool?.titleVn, pool?.titleFr) || 'Step Practice';

  const report = (sum, fn) => fn?.(sum.score, sum.blob, { items: sum.items });
  const quit = () => (last ? report(last, onComplete) : onQuit?.());

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={total}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      <StepPracticeSet set={pool} lang={lang} saved={saved}
        onPos={(p) => setPos(p)}
        onSave={(sum) => { setLast(sum); report(sum, onProgress); }}
        onFinish={(sum) => report(sum || summaryOf(items, saved, {}), onComplete)} />
    </div>
  );
}
