import { useEffect, useMemo, useRef, useState } from 'react';
import { Flame, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, RefreshCw } from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { makeQuickFire } from '../utils/quickFire';

/* ------------------------------------------------------------------ *
 * QUICK FIRE — short generated cards (Y7 Maths 3.1, 3.2).
 *
 * Reads a unit's `quickFire`: { title, titleVn, modes: [...], rounds }.
 * Every card is dealt fresh from a seed (utils/quickFire.js), so a second
 * attempt is new practice, and every answer is derived from the numbers on
 * the card.
 *
 * One box per card (or two buttons, for a < / > or Yes / No card, answered
 * once). A wrong answer is answered with the NAME of its slip and
 * one more try: right first time pays 1, right second time pays half, and a
 * second wrong answer shows the answer and pays nothing. Score: cards out of
 * 10. Quitting part-way finishes with the cards that are done.
 * ------------------------------------------------------------------ */

const INK = '#ea580c';
const INK_DARK = '#c2410c';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Quick Fire', check: 'Check', next: 'Next', finish: 'Finish', card: 'Card',
    right: 'Right.', answerWas: 'The answer is', tryAgain: 'One more try',
    streak: 'in a row', power: 'power',
    summaryTitle: 'Quick Fire finished',
    summaryLine: (c, n) => `${c} of ${n} right first time`,
    score: 'Score', again: 'New cards', done: 'Finish',
    empty: 'No cards yet', back: 'Return to Dashboard',
    firstTry: 'first try', secondTry: 'second try', shown: 'shown',
  },
  vn: {
    title: 'Hỏi nhanh', check: 'Kiểm tra', next: 'Tiếp', finish: 'Hoàn thành', card: 'Thẻ',
    right: 'Đúng.', answerWas: 'Đáp án là', tryAgain: 'Thử lại một lần nữa',
    streak: 'liên tiếp', power: 'số mũ',
    summaryTitle: 'Đã xong phần Hỏi nhanh',
    summaryLine: (c, n) => `${c}/${n} đúng ngay lần đầu`,
    score: 'Điểm', again: 'Bộ thẻ mới', done: 'Hoàn thành',
    empty: 'Chưa có thẻ', back: 'Quay lại Bảng điều khiển',
    firstTry: 'lần đầu', secondTry: 'lần hai', shown: 'được chỉ',
  },
};
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function makeSafe(config, seed) {
  try { return makeQuickFire(config, seed); } catch { return []; }
}

export default function QuickFire({ pool, onComplete, onQuit, bilingual = true }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(() => makeSafe(config, seed), [config, seed]);

  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [picked, setPicked] = useState(null);     // a choice card's button
  const [tries, setTries] = useState(0);
  const [state, setState] = useState(null);       // null | 'bad' | 'good' | 'shown'
  const [msg, setMsg] = useState(null);
  const [results, setResults] = useState({});     // card index -> { score, tries }
  const [streak, setStreak] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [ended, setEnded] = useState(false);
  const inputRef = useRef(null);

  const t = lang === 'vn' ? T.vn : T.en;
  const L = (en, vn) => (lang === 'vn' && vn ? vn : en);
  const card = session[idx];
  const settled = state === 'good' || state === 'shown';

  useEffect(() => { inputRef.current?.focus(); }, [idx, seed]);

  const total = (res) => session.reduce((s, _, i) => s + (res[i]?.score || 0), 0);
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const items = session.map((c, i) => ({ itemId: c.id, correct: results[i]?.score === 1 }));
    onComplete?.(session.length ? Math.round((total(results) / session.length) * 10) : 0, null, { items });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  if (!card && !summaryOpen) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <p className="font-black text-slate-600 dark:text-slate-300 mb-4">{t.empty}</p>
        <button onClick={onQuit} className={`px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const check = () => {
    if (settled) return;
    const d = card.mark(typed);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
    if (d.ok) {
      setState('good');
      setMsg(null);
      setResults((r) => ({ ...r, [idx]: { score: tries === 0 ? 1 : 0.5, tries: tries + 1 } }));
      setStreak(tries === 0 ? streak + 1 : 0);
      return;
    }
    setStreak(0);
    if (tries + 1 >= 2) {
      setState('shown');
      setMsg({ tone: 'shown', en: d.en, vn: d.vn });
      setResults((r) => ({ ...r, [idx]: { score: 0, tries: 2, shown: true } }));
      return;
    }
    setTries(tries + 1);
    setState('bad');
    setMsg({ tone: 'bad', en: d.en, vn: d.vn });
  };
  // A choice card (two buttons) is answered once: there is nothing to retry.
  const choose = (val) => {
    if (settled) return;
    const d = card.mark(val);
    setPicked(val);
    if (d.ok) {
      setState('good');
      setMsg(null);
      setResults((r) => ({ ...r, [idx]: { score: 1, tries: 1 } }));
      setStreak(streak + 1);
      return;
    }
    setStreak(0);
    setState('shown');
    setMsg({ tone: 'shown', en: d.en, vn: d.vn });
    setResults((r) => ({ ...r, [idx]: { score: 0, tries: 1, shown: true } }));
  };
  const next = () => {
    if (idx + 1 >= session.length) { setSummaryOpen(true); return; }
    setIdx(idx + 1); setTyped(''); setPicked(null); setTries(0); setState(null); setMsg(null);
  };
  const newCards = () => {
    setSeed(Date.now()); setIdx(0); setTyped(''); setPicked(null); setTries(0); setState(null); setMsg(null);
    setResults({}); setStreak(0); setSummaryOpen(false); setEnded(false);
  };

  const topBar = (
    <TopBar onQuit={quit} modeTitle={L(config.title, config.titleVn) || t.title}
      current={summaryOpen ? session.length : idx + 1} total={session.length}
      lang={bilingual ? lang : undefined}
      onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />
  );

  /* ---------------------------------------------------------- summary */
  if (summaryOpen) {
    const clean = session.filter((_, i) => results[i]?.score === 1).length;
    const scoreOut = session.length ? Math.round((total(results) / session.length) * 10) : 0;
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
        {topBar}
        <div className="flex-1 w-full max-w-xl mx-auto p-3 sm:p-5 pb-10">
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: INK }}>
            <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: INK }}>
              <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />
              <div className="font-black">{t.summaryTitle}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-90">{t.score} {scoreOut} / 10</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4">
              <p className="text-lg font-black text-slate-800 dark:text-slate-100 mb-3">{t.summaryLine(clean, session.length)}</p>
              <div className="flex flex-col gap-1.5">
                {session.map((c, i) => {
                  const r = results[i];
                  const tone = !r ? 'text-slate-300' : r.shown ? 'text-amber-600 dark:text-amber-400' : r.tries === 1 ? 'text-[#3e7500] dark:text-lime-300' : 'text-sky-600 dark:text-sky-300';
                  return (
                    <div key={c.id} className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-slate-800 dark:text-slate-100">
                      <span className="w-5 text-[11px] font-black text-slate-400">{i + 1}</span>
                      <span className="flex-1 min-w-0 overflow-x-auto text-base"><SafeInlineMath math={c.latex} /> {['round', 'couldbe', 'integer'].includes(c.mode) && <span className="ml-2 text-xs font-bold text-slate-400">{L(c.ask.en, c.ask.vn)}</span>}</span>
                      <span className="font-mono font-black">{L(c.answer, c.answerVn)}{c.unit ? ` ${c.unit}` : ''}</span>
                      <span className={`w-16 text-right text-[10px] font-black uppercase tracking-widest ${tone}`}>{!r ? '—' : r.shown ? t.shown : r.tries === 1 ? t.firstTry : t.secondTry}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={newCards} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <RefreshCw className="w-4 h-4" strokeWidth={2.5} /> {t.again}
                </button>
                <button onClick={finish} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.done}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------- a card */
  const inputTone = state === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : state === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
      : state === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
  const soft = msg?.tone === 'info' || msg?.tone === 'shown';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {topBar}
      <div className="flex-1 w-full max-w-2xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor: INK, backgroundColor: 'rgba(234,88,12,0.08)' }}>
            <Flame className="w-4 h-4" style={{ color: INK }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">{t.card} {idx + 1} / {session.length}</span>
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 text-xs font-black uppercase tracking-widest animate-in fade-in zoom-in-90" style={{ color: INK }}>
              <Flame className="w-4 h-4" strokeWidth={3} /> {streak} {t.streak}
            </div>
          )}
        </div>

        <div key={`${seed}-${idx}`} className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="text-center text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 overflow-x-auto py-1">
            <SafeInlineMath math={card.latex} />
          </div>
          <p className="mt-2 text-center text-base font-bold text-slate-500 dark:text-slate-400">{L(card.ask.en, card.ask.vn)}</p>

          {card.choices ? (
            <div className="mt-5 grid grid-cols-2 gap-3 max-w-md mx-auto">
              {card.choices.map((c) => {
                const right = settled && card.mark(c.val).ok;
                const wrongPick = settled && picked === c.val && !right;
                return (
                  <button key={c.val} type="button" disabled={settled} onClick={() => choose(c.val)}
                    className={`px-3 py-4 rounded-xl border-2 border-b-[4px] font-black text-xl transition-all active:border-b-2 active:translate-y-[2px] disabled:cursor-default
                      ${right ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
                        : wrongPick ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
                          : settled ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-orange-400'}`}>
                    {L(c.en, c.vn)}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {card.power && <span className="text-sm font-black uppercase tracking-widest text-slate-400">{t.power} =</span>}
              <input
                ref={inputRef}
                value={state === 'shown' ? card.answer : typed}
                readOnly={settled}
                onChange={(e) => { setTyped(e.target.value); if (state === 'bad') setState(null); }}
                onKeyDown={(e) => { if (e.key === 'Enter') (settled ? next() : check()); }}
                inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={L(card.ask.en, card.ask.vn)} placeholder="?"
                className={`${card.power ? 'w-24' : 'w-52'} px-3 py-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-3xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-orange-500 ${inputTone}`}
              />
              {card.unit && <span className="text-2xl font-black text-slate-700 dark:text-slate-200">{card.unit}</span>}
            </div>
          )}

          {state === 'good' && (
            <div className="mt-4 flex items-center justify-center gap-2 font-black text-[#3e7500] dark:text-lime-300 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5" strokeWidth={3} /> {t.right}
            </div>
          )}
          {msg && (
            <div className={`mt-4 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in
              ${soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300'}`}>
              {soft ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
              <span>
                {msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}
                {L(msg.en, msg.vn)}
                {msg.tone === 'shown' && !card.choices && <span className="ml-1">{t.answerWas} <span className="font-mono">{card.answer}{card.unit ? ` ${card.unit}` : ''}</span>.</span>}
              </span>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            {settled ? (
              <button onClick={next} autoFocus={!!card.choices} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: state === 'shown' ? AMBER : INK, borderColor: state === 'shown' ? '#b45309' : INK_DARK }}>
                {idx + 1 >= session.length ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
              </button>
            ) : !card.choices && (
              <button onClick={check} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
