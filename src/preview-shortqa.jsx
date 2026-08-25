// Dev-only harness for the Short Answers task.
//
// Mounts the real component with the reference exemplar unit (Y8 MATH_1A) and
// stubs the grader endpoint, so the streamlined mark-scheme results page can be
// checked in each outcome without auth or a live Gemini call.
// Entry point: preview-shortqa.html. Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ShortAnswers from './tasks/ShortAnswers';
import { MATH_1A_DATA } from './data/Y8/MATH_1A/data';

// The three outcomes the results header distinguishes, as markSchemeHits.
const REPLIES = {
  'Full marks': { markSchemeHits: [true, true], contentScore: 2 },
  'Partial — 2nd row only': { markSchemeHits: [false, true], contentScore: 1 },
  'No marks': { markSchemeHits: [false, false], contentScore: 0 },
};

let activeReply = 'Full marks';
window.fetch = async (url) => {
  if (String(url).includes('gradeShortQA')) {
    await new Promise((r) => setTimeout(r, 500));
    const r = REPLIES[activeReply];
    return {
      ok: true,
      status: 200,
      json: async () => ({ isHarmful: false, isGarbage: false, contentMax: 2, ...r }),
    };
  }
  return { ok: false, status: 404, statusText: 'stubbed', json: async () => ({}) };
};

function Harness() {
  const [reply, setReply] = useState(activeReply);
  const [nonce, setNonce] = useState(0);

  return (
    <div>
      <div className="fixed bottom-4 left-4 z-50 flex flex-wrap gap-2 bg-white dark:bg-slate-900 border-2 border-teal-400 rounded-2xl p-3 shadow-lg">
        {Object.keys(REPLIES).map((k) => (
          <button
            key={k}
            onClick={() => { activeReply = k; setReply(k); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${
              reply === k ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}
          >
            {k}
          </button>
        ))}
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-800 text-white"
        >
          Reset
        </button>
      </div>

      <ShortAnswers
        key={nonce}
        pool={{ shortQA: MATH_1A_DATA.shortQA }}
        track="Y8"
        unitTitle="Parallel Lines & Angles"
        savedData={{}}
        strikes={0}
        onAddStrike={() => {}}
        onComplete={(xp) => console.log('complete, xp =', xp)}
        onQuit={() => console.log('quit')}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
