import React, { useMemo, useState } from 'react';
import { Atom } from 'lucide-react';
import TopBar from '../components/TopBar';
import PeriodicTableSVG from '../components/science/PeriodicTableSVG';
import { AskHeader, CheckButton, NextButton, ChoiceButton, Verdict, ProgressDots, EmptyScreen, Summary } from '../components/science/TaskChrome';
import { huntSession, tableView, huntAnswer, huntFeedback, huntRowLabel } from '../components/science/huntView';
import { markHunt } from '../utils/elementHunt';

/**
 * Element Hunt — Science 2.5's generative task on the book's first-20 Periodic
 * Table. Rounds are drawn fresh from a seed and cycle through the unit's modes
 * (find, symbol, name, place, metal, mass — src/utils/elementHunt.js), so a
 * second attempt asks about different elements.
 *
 *   tap     the first tap is the answer (no second chance: the table then shows
 *           where the answer was, and the next round is a fresh one)
 *   multi   tiles toggle; Check
 *   type    type the symbol (no autocapitalise — the capitals are the student's)
 *   choice  a button is the answer
 *
 * Before marking the table never answers the question (names, colours and the
 * asked-about symbol are hidden as the round needs — components/science/huntView.js);
 * after marking it shows the answer and the round's explanation.
 *
 * Score: rounds right out of the session, out of 10. Quitting mid-way saves what
 * was answered. "New hunt" at the end starts a fresh session; the better of the
 * finished run and the new one is what is saved.
 */

const T = {
  en: {
    title: 'Element Hunt', check: 'Check', next: 'Next', results: 'See results', finish: 'Finish', again: 'New hunt',
    empty: 'This unit has no Element Hunt modes.', back: 'Return', correct: 'Correct', wrong: 'Not quite',
    tapOne: 'Tap one tile. Your first tap is your answer.',
    tapAll: 'Tap every tile you need, then Check. Tap a tile again to take it back.',
    picked: 'picked', typeHere: 'Type the symbol', done: 'Hunt complete', right: 'right', table: 'The first 20 elements',
    modes: { find: 'Find the element', symbol: 'Write the symbol', name: 'Name the symbol', place: 'Periods and groups', metal: 'Metal or non-metal', mass: 'Heavier atoms' },
  },
  vn: {
    title: 'Truy tìm nguyên tố', check: 'Kiểm tra', next: 'Tiếp', results: 'Xem kết quả', finish: 'Hoàn thành', again: 'Lượt mới',
    empty: 'Bài này chưa có chế độ Truy tìm nguyên tố.', back: 'Quay lại', correct: 'Chính xác', wrong: 'Chưa đúng',
    tapOne: 'Chạm vào một ô. Lần chạm đầu tiên là câu trả lời của bạn.',
    tapAll: 'Chạm vào mọi ô cần chọn, rồi bấm Kiểm tra. Chạm lại vào ô để bỏ chọn.',
    picked: 'đã chọn', typeHere: 'Nhập kí hiệu', done: 'Hoàn thành lượt truy tìm', right: 'đúng', table: '20 nguyên tố đầu tiên',
    modes: { find: 'Tìm nguyên tố', symbol: 'Viết kí hiệu', name: 'Gọi tên kí hiệu', place: 'Chu kì và nhóm', metal: 'Kim loại hay phi kim', mass: 'Nguyên tử nặng hơn' },
  },
};

export default function ElementHunt({ pool, onComplete, onQuit, bilingual = true }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(() => huntSession(config, seed), [config, seed]);
  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [tap, setTap] = useState(null);       // a tap or a choice
  const [picked, setPicked] = useState([]);   // a multi round's tiles
  const [typed, setTyped] = useState('');
  const [mark, setMark] = useState(null);     // markHunt's result for this round
  const [results, setResults] = useState({}); // idx -> boolean
  const [ended, setEnded] = useState(false);
  const [banked, setBanked] = useState(null); // the best finished run before "New hunt"

  const L = bilingual ? lang : 'en';
  const t = T[L];
  const say = (o) => (o ? (L === 'vn' && o.vn ? o.vn : o.en) : '');

  const runOf = (res) => {
    const items = session.map((r, i) => ({ itemId: `${r.mode}-${i + 1}`, correct: !!res[i] }));
    const right = items.filter((i) => i.correct).length;
    return { items, right, score: session.length ? Math.round((right / session.length) * 10) : 0 };
  };
  const finish = () => {
    const cur = runOf(results);
    const best = banked && banked.score >= cur.score ? banked : cur;
    onComplete?.(best.score, null, { items: best.items });
  };
  const quit = () => (Object.keys(results).length || banked ? finish() : onQuit?.());

  if (!session.length) return <EmptyScreen text={t.empty} back={t.back} onQuit={onQuit} />;

  const topBar = (
    <TopBar onQuit={quit} modeTitle={say({ en: config.title, vn: config.titleVn }) || t.title}
      current={ended ? session.length : idx + 1} total={session.length}
      lang={bilingual ? lang : undefined} onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />
  );

  const reset = () => { setTap(null); setPicked([]); setTyped(''); setMark(null); };
  const again = () => {
    const cur = runOf(results);
    setBanked((b) => (b && b.score >= cur.score ? b : cur));
    setSeed(Date.now());
    setIdx(0);
    setResults({});
    setEnded(false);
    reset();
  };

  if (ended) {
    const run = runOf(results);
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
        {topBar}
        <Summary heading={t.done} rightText={`${run.right} / ${session.length} ${t.right}`}
          rows={session.map((r, i) => ({ ok: !!results[i], label: `${t.modes[r.mode]}: ${say(huntRowLabel(r))}` }))}
          againLabel={t.again} finishLabel={t.finish} onAgain={again} onFinish={finish} />
      </div>
    );
  }

  const round = session[idx];
  const checked = mark !== null;
  const answer = huntAnswer(round, { tap, picked, typed, choice: tap });
  const view = tableView(round, { checked, answer, picked });

  const submit = (ans) => {
    if (checked) return;
    const m = markHunt(round, ans);
    setMark(m);
    setResults((r) => ({ ...r, [idx]: !!m.ok }));
  };
  const onTap = (sym) => {
    if (checked) return;
    if (round.kind === 'tap') { setTap(sym); submit(sym); }
    else setPicked((p) => (p.includes(sym) ? p.filter((s) => s !== sym) : [...p, sym]));
  };
  const choose = (val) => { if (!checked) { setTap(val); submit(val); } };
  const next = () => {
    if (idx + 1 < session.length) { setIdx(idx + 1); reset(); }
    else setEnded(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {topBar}

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-4 lg:px-5 pb-8 flex flex-col gap-3 lg:gap-4">
        <AskHeader icon={Atom} tone="bg-[#0087a8] border-[#00697f]" sub={t.modes[round.mode]}>{say(round.ask)}</AskHeader>

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-5 lg:items-start">
          <div className="rounded-2xl bg-white border-2 border-slate-200 dark:border-slate-700 shadow-sm p-1 sm:p-2">
            <PeriodicTableSVG
              highlight={view.highlight} showNames={view.showNames} colourByMetal={view.colourByMetal}
              masked={view.masked} bands={view.bands} lang={L} label={t.table}
              onTap={view.interactive ? onTap : undefined} />
          </div>

          <div className="flex flex-col gap-3">
            {!checked && round.kind === 'tap' && (
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.tapOne}</p>
            )}

            {round.kind === 'multi' && (
              <>
                {!checked && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.tapAll}</p>}
                <div className="flex flex-wrap items-center gap-1.5 min-h-[2rem]">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-1">{picked.length} {t.picked}</span>
                  {picked.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-[#ddf4ff] dark:bg-sky-900/40 border-2 border-[#1cb0f6] text-[#1482b8] dark:text-sky-200 font-black text-sm">{s}</span>
                  ))}
                </div>
                {!checked && <CheckButton onClick={() => submit(picked)} disabled={!picked.length}>{t.check}</CheckButton>}
              </>
            )}

            {round.kind === 'type' && (
              <>
                <label htmlFor={`hunt-typed-${idx}`} className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.typeHere}</label>
                <input
                  key={idx} id={`hunt-typed-${idx}`} type="text" value={typed} disabled={checked} autoFocus
                  autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false} maxLength={4}
                  onChange={(e) => setTyped(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && typed.trim()) submit(typed); }}
                  className={`w-full text-3xl font-black text-center px-3 py-3 rounded-xl border-2 border-b-[4px] outline-none
                    ${checked ? (mark.ok ? 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500]' : 'border-rose-400 bg-rose-50 text-rose-600') : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#1cb0f6]'}`}
                  placeholder="?" />
                {!checked && <CheckButton onClick={() => submit(typed)} disabled={!typed.trim()}>{t.check}</CheckButton>}
              </>
            )}

            {round.kind === 'choice' && (
              <div className={`grid gap-2 ${round.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} lg:grid-cols-1`}>
                {round.options.map((o) => {
                  const look = !checked ? 'idle' : o.val === round.answer ? (tap === o.val ? 'good' : 'answer') : tap === o.val ? 'bad' : 'muted';
                  return (
                    <ChoiceButton key={o.val} look={look} disabled={checked} onClick={() => choose(o.val)}>
                      <span className="block">{say(o)}</span>
                      {L === 'vn' && o.vn && o.vn !== o.en && <span className="block text-xs font-bold opacity-60">{o.en}</span>}
                    </ChoiceButton>
                  );
                })}
              </div>
            )}

            {checked && (
              <>
                <Verdict ok={mark.ok} title={mark.ok ? t.correct : t.wrong}>
                  {huntFeedback(round, answer, mark).map((line, i) => <p key={i}>{say(line)}</p>)}
                  <p className={mark.ok ? '' : 'text-slate-700'}>{say(round.explain)}</p>
                </Verdict>
                <NextButton onClick={next}>{idx + 1 < session.length ? t.next : t.results}</NextButton>
              </>
            )}

            <ProgressDots total={session.length} idx={idx} results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
