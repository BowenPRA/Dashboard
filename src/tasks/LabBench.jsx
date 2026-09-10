import React, { useMemo, useState } from 'react';
import { Beaker, CheckCircle2, XCircle, ChevronRight, Construction, RotateCcw } from 'lucide-react';
import TopBar from '../components/TopBar';
import { makeSession, drawRound, markAnswer } from '../utils/labBench';

/**
 * Lab Bench — the measuring-skill task that is never the same twice. Each
 * round draws a fresh instrument (a cylinder, a thermometer, a heating curve)
 * with a random reading; the student types the number; the check shows the
 * reading line and says why. Eight rounds a session, drawn from the unit's
 * modes (src/utils/labBench.js).
 *
 * Score: correct rounds out of the session, out of 10. A session is one sitting
 * (there is nothing to resume — the next attempt draws new readings), but
 * quitting mid-way saves what was answered so far.
 */

const T = {
  en: { title: 'Lab Bench', check: 'Check', next: 'Next', finish: 'Finish', again: 'New readings', empty: 'This unit has no Lab Bench modes.', back: 'Return', placeholder: 'Type the reading', correct: 'Correct', wrong: 'Not quite', reading: 'The reading is' },
  vn: { title: 'Bàn thí nghiệm', check: 'Kiểm tra', next: 'Tiếp', finish: 'Hoàn thành', again: 'Số đọc mới', empty: 'Bài này chưa có chế độ Bàn thí nghiệm.', back: 'Quay lại', placeholder: 'Nhập số đọc', correct: 'Chính xác', wrong: 'Chưa đúng', reading: 'Số đọc đúng là' },
};

export default function LabBench({ pool, onComplete, onQuit }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(() => makeSession(config, seed), [config, seed]);
  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [results, setResults] = useState({});   // idx -> boolean
  const t = T[lang] || T.en;
  const round = session[idx];
  const svg = useMemo(() => (round ? drawRound(round) : ''), [round]);
  const checked = results[idx] !== undefined;

  const finish = () => {
    const items = session.map((r, i) => ({ itemId: `${r.mode}-${i + 1}`, correct: !!results[i] }));
    const right = items.filter((i) => i.correct).length;
    onComplete?.(Math.round((right / session.length) * 10), null, { items });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  if (!session.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Construction className="w-10 h-10 text-slate-400 mb-3" />
        <p className="font-black text-slate-600 dark:text-slate-300 mb-4">{t.empty}</p>
        <button onClick={onQuit} className="px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">{t.back}</button>
      </div>
    );
  }

  const check = () => {
    if (checked || typed.trim() === '') return;
    setResults((r) => ({ ...r, [idx]: markAnswer(round, typed) }));
  };
  const next = () => {
    if (idx + 1 < session.length) { setIdx(idx + 1); setTyped(''); }
    else finish();
  };

  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);
  const ok = results[idx];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pick(config.title, config.titleVn) || t.title} current={idx + 1} total={session.length} lang={lang} onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      <div className="flex-1 w-full max-w-4xl mx-auto p-3 sm:p-5 pb-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#0d9488] text-white flex items-center justify-center border-b-[4px] border-[#0f766e] shrink-0"><Beaker className="w-5 h-5" strokeWidth={2.5} /></span>
          <h2 className="font-black text-slate-800 dark:text-slate-100 text-lg sm:text-xl leading-tight">{pick(round.ask, round.askVn)}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px] items-start">
          <div className={`rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm [&>svg]:w-full [&>svg]:h-auto ${round.mode === 'curve' ? '' : 'max-w-sm mx-auto w-full'}`}
            dangerouslySetInnerHTML={{ __html: svg }} />

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.placeholder}</label>
            <div className="flex items-stretch gap-2">
              <input
                type="text" inputMode="decimal" value={typed} disabled={checked} autoFocus
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') (checked ? next() : check()); }}
                className={`flex-1 min-w-0 text-2xl font-black text-center px-3 py-3 rounded-xl border-2 border-b-[4px] outline-none
                  ${checked ? (ok ? 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500]' : 'border-rose-400 bg-rose-50 text-rose-600') : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#1cb0f6]'}`}
                placeholder="?"
              />
              <span className="px-3 flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-black text-slate-500">{round.unit}</span>
            </div>

            {checked && (
              <div className={`rounded-xl border-2 p-3 text-sm font-bold ${ok ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-[#ffdfe0] border-[#ea2b2b] text-[#a32d23]'}`}>
                <div className="flex items-center font-black uppercase tracking-widest text-[10px] mb-1">
                  {ok ? <CheckCircle2 className="w-4 h-4 mr-1.5" strokeWidth={3} /> : <XCircle className="w-4 h-4 mr-1.5" strokeWidth={3} />}
                  {ok ? t.correct : `${t.wrong} — ${t.reading} ${round.answer} ${round.unit}`}
                </div>
                {pick(round.why, round.whyVn)}
              </div>
            )}

            {!checked
              ? <button onClick={check} disabled={typed.trim() === ''} className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-[#58cc02] border-b-[4px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none">{t.check}</button>
              : <button onClick={next} className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-[#1cb0f6] border-b-[4px] border-[#1899d6] text-white hover:bg-[#159bd9] active:border-b-0 active:translate-y-[4px] transition-all flex items-center justify-center gap-1">
                  {idx + 1 < session.length ? t.next : t.finish}<ChevronRight className="w-4 h-4" strokeWidth={3} />
                </button>}

            <div className="flex gap-1 flex-wrap mt-1">
              {session.map((r, i) => (
                <span key={i} className={`w-3 h-3 rounded-full ${results[i] === undefined ? (i === idx ? 'bg-[#1cb0f6]' : 'bg-slate-200 dark:bg-slate-700') : results[i] ? 'bg-[#58cc02]' : 'bg-rose-400'}`} />
              ))}
            </div>

            {idx === 0 && !checked && (
              <button onClick={() => { setSeed(Date.now()); setTyped(''); setResults({}); }} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#1cb0f6] flex items-center gap-1 self-start">
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />{t.again}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
