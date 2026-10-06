import React, { useMemo, useState } from 'react';
import { Link2, Flame, Snowflake, ArrowRight, ArrowDown, Lightbulb } from 'lucide-react';
import TopBar from '../components/TopBar';
import { AskHeader, CheckButton, NextButton, ChoiceButton, Verdict, ProgressDots, EmptyScreen, Summary } from '../components/science/TaskChrome';
import { BuildBoard, FixBoard, MarkLines } from '../components/notes/ChainActivity';
import { makeExplainSession, markRound, scenarioById, CHANGE_INFO, CHANGES, EXPLAIN_MODES } from '../utils/stateChain';

/**
 * Explain It — Science 2.3's generative task. A fresh everyday scenario every
 * round (src/utils/stateChain.js), cycling through the unit's modes:
 *
 *   build    put the scenario's links in order from a bank with two traps
 *   fix      one link is a trap: tap it, then choose what replaces it
 *   name     heat energy to or away from the particles, and which change
 *   picture  the before box; choose the after box (one draws the particles bigger)
 *
 * One attempt per round. The verdict names each trap chosen by its own why,
 * and the boards show the right links in place. Score: rounds right out of the
 * session, out of 10; quitting saves what was answered; "New scenarios" starts
 * a fresh session and the better finished run is what is saved.
 */

const T = {
  en: {
    title: 'Explain It', check: 'Check', next: 'Next', results: 'See results', finish: 'Finish', again: 'New scenarios',
    empty: 'This unit has no Explain It modes.', back: 'Return', correct: 'Correct', wrong: 'Not quite', done: 'All explained', right: 'right',
    ask: {
      build: 'Put the links in order.',
      fix: 'Find the wrong link and fix it.',
      name: 'Which way does the heat go? Which change?',
      picture: 'Which box shows the particles after?',
    },
    modes: { build: 'Build the chain', fix: 'Fix the chain', name: 'Name the change', picture: 'Picture it' },
    scenario: 'What happens', heatQ: 'Heat energy is transferred …', to: 'to the particles', away: 'away from the particles',
    changeQ: 'Which change of state?', before: 'Before', after: 'After — choose one',
    whole: (name) => `Every link is in place: that is the whole explanation of ${name}.`,
  },
  vn: {
    title: 'Giải thích bằng hạt', check: 'Kiểm tra', next: 'Tiếp', results: 'Xem kết quả', finish: 'Hoàn thành', again: 'Tình huống mới',
    empty: 'Bài này chưa có chế độ Giải thích bằng hạt.', back: 'Quay lại', correct: 'Chính xác', wrong: 'Chưa đúng', done: 'Đã giải thích xong', right: 'đúng',
    ask: {
      build: 'Xếp các mắt xích theo thứ tự.',
      fix: 'Tìm mắt xích sai và sửa nó.',
      name: 'Nhiệt đi chiều nào? Sự chuyển thể nào?',
      picture: 'Hộp nào cho thấy các hạt sau đó?',
    },
    modes: { build: 'Xây chuỗi', fix: 'Sửa chuỗi', name: 'Gọi tên sự thay đổi', picture: 'Hình dung các hạt' },
    scenario: 'Điều gì xảy ra', heatQ: 'Nhiệt năng được truyền …', to: 'đến các hạt', away: 'ra khỏi các hạt',
    changeQ: 'Sự chuyển thể nào?', before: 'Trước', after: 'Sau — chọn một',
    whole: (name) => `Mọi mắt xích đều đúng chỗ: đó là toàn bộ lời giải thích ${name}.`,
  },
};

const EMPTY = { slots: [], pick: null, replace: null, heat: null, change: null, choice: null };
const say = (o, L) => (o ? (L === 'vn' && o.vn ? o.vn : o.en) : '');
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

function ScenarioCard({ round, L, t }) {
  const sc = scenarioById(round.scenario);
  return (
    // On a phone the card drops its icon and label: the ask header says what to do.
    <div className="rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-sm px-3.5 py-2 sm:px-4 sm:py-3 flex items-start gap-3">
      <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-[#c25e12] hidden sm:flex items-center justify-center shrink-0 mt-0.5">
        <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
      </span>
      <div className="min-w-0">
        <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400">{t.scenario}</div>
        <p className="font-bold text-slate-800 dark:text-slate-100 text-[15px] sm:text-base lg:text-lg leading-snug">{say(sc, L)}</p>
      </div>
    </div>
  );
}

/** A drawn box of particles that can be chosen. */
function BoxButton({ svg, look, onClick, disabled, label }) {
  const ring = {
    idle: 'border-slate-200 dark:border-slate-700 hover:border-[#1cb0f6]',
    picked: 'border-[#1cb0f6] ring-4 ring-[#1cb0f6]/20',
    good: 'border-[#58a700] ring-4 ring-[#58cc02]/30',
    bad: 'border-[#ea2b2b] ring-4 ring-[#ea2b2b]/20',
    answer: 'border-[#58a700]',
    muted: 'border-slate-200 dark:border-slate-800 opacity-50',
  }[look] || '';
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label}
      className={`block w-full rounded-2xl border-[3px] overflow-hidden bg-white transition-all [&>svg]:block [&>svg]:w-full [&>svg]:h-auto ${ring}`}
      dangerouslySetInnerHTML={{ __html: svg }} />
  );
}

function NamePanel({ round, draft, set, checked, L, t }) {
  const info = CHANGE_INFO[round.change];
  const lookOf = (val, right, chosen) => (!checked ? (chosen === val ? 'picked' : 'idle')
    : val === right ? (chosen === val ? 'good' : 'answer') : chosen === val ? 'bad' : 'muted');
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{t.heatQ}</div>
        <div className="grid grid-cols-2 gap-2">
          {[['to', Flame, 'text-[#c25e12]'], ['away', Snowflake, 'text-[#1a5fa8]']].map(([val, Icon, tone]) => (
            <ChoiceButton key={val} look={lookOf(val, info.heat, draft.heat)} disabled={checked} onClick={() => set({ heat: val })} className="!py-2.5 flex items-center gap-2 !text-sm sm:!text-base">
              <Icon className={`w-5 h-5 shrink-0 ${checked ? '' : tone}`} strokeWidth={2.5} />{t[val]}
            </ChoiceButton>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{t.changeQ}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CHANGES.map((c) => (
            <ChoiceButton key={c} look={lookOf(c, round.change, draft.change)} disabled={checked} onClick={() => set({ change: c })} className="!py-2.5 !text-center !text-sm sm:!text-base">
              {say(CHANGE_INFO[c].name, L)}
            </ChoiceButton>
          ))}
        </div>
      </div>
    </div>
  );
}

function PicturePanel({ round, draft, set, checked, t }) {
  return (
    // A phone stacks before over after, so the three choices get the full width.
    <div className="flex flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,3fr)] gap-1.5 sm:gap-3 sm:items-center">
      <figure className="flex flex-col gap-1 w-2/5 mx-auto sm:w-auto sm:mx-0">
        <figcaption className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.before}</figcaption>
        <div className="rounded-2xl border-[3px] border-slate-300 dark:border-slate-600 overflow-hidden bg-white [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: round.before.svg }} />
      </figure>
      <ArrowRight className="hidden sm:block w-5 h-5 text-slate-400 mt-4" strokeWidth={3} />
      <ArrowDown className="sm:hidden w-5 h-5 text-slate-400 mx-auto" strokeWidth={3} />
      <div className="flex flex-col gap-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.after}</div>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {round.options.map((o, i) => {
            const look = !checked ? (draft.choice === o.id ? 'picked' : 'idle')
              : o.id === 'right' ? (draft.choice === o.id ? 'good' : 'answer') : draft.choice === o.id ? 'bad' : 'muted';
            return <BoxButton key={o.id} svg={o.svg} look={look} disabled={checked} onClick={() => set({ choice: o.id })} label={`${t.after} ${i + 1}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

function RoundVerdict({ round, mark, L, t }) {
  const name = say(CHANGE_INFO[round.change].name, L);
  const whole = (round.mode === 'build' || round.mode === 'fix') && mark.correct;
  return (
    <Verdict ok={mark.correct} title={mark.correct ? t.correct : t.wrong}>
      {round.mode === 'build' && mark.correct ? <p>{t.whole(lower(name))}</p> : <MarkLines mark={mark} lang={L} />}
      {whole && round.mode === 'fix' && <p>{t.whole(lower(name))}</p>}
    </Verdict>
  );
}

const answerFrom = (round, d) => (round.mode === 'build' ? { slots: d.slots }
  : round.mode === 'fix' ? { pick: d.pick, replace: d.replace }
    : round.mode === 'name' ? { heat: d.heat, change: d.change } : { choice: d.choice });
const readyOf = (round, d) => (round.mode === 'build' ? round.chain.every((_, i) => d.slots[i])
  : round.mode === 'fix' ? d.pick != null && d.replace != null
    : round.mode === 'name' ? !!d.heat && !!d.change : !!d.choice);

// ------------------------------------------------------------------ the task

export default function ExplainIt({ pool, onComplete, onQuit, bilingual = true }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(
    () => ((config.modes || []).some((m) => EXPLAIN_MODES.includes(m)) ? makeExplainSession(config, seed) : []),
    [config, seed],
  );
  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState(EMPTY);
  const [mark, setMark] = useState(null);       // this round's mark
  const [results, setResults] = useState({});   // idx -> boolean
  const [ended, setEnded] = useState(false);
  const [banked, setBanked] = useState(null);   // the best finished run before "New scenarios"
  const round = session[idx];

  const L = bilingual ? lang : 'en';
  const t = T[L];

  const runOf = (res) => {
    const items = session.map((r, i) => ({ itemId: r.id || `${r.mode}-${i + 1}`, correct: !!res[i] }));
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
    <TopBar onQuit={quit} modeTitle={say({ en: config.title, vn: config.titleVn }, L) || t.title}
      current={ended ? session.length : idx + 1} total={session.length}
      lang={bilingual ? lang : undefined} onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />
  );

  const again = () => {
    const cur = runOf(results);
    setBanked((b) => (b && b.score >= cur.score ? b : cur));
    setSeed(Date.now());
    setIdx(0);
    setResults({});
    setEnded(false);
    setDraft(EMPTY);
    setMark(null);
  };

  if (ended) {
    const run = runOf(results);
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
        {topBar}
        <Summary heading={t.done} rightText={`${run.right} / ${session.length} ${t.right}`}
          rows={session.map((r, i) => ({ ok: !!results[i], label: `${t.modes[r.mode]}: ${L === 'vn' ? scenarioById(r.scenario).nameVn : scenarioById(r.scenario).name}` }))}
          againLabel={t.again} finishLabel={t.finish} onAgain={again} onFinish={finish} />
      </div>
    );
  }

  const checked = mark !== null;
  const set = (patch) => { if (!checked) setDraft((d) => ({ ...d, ...patch })); };
  const ready = readyOf(round, draft);
  const check = () => {
    if (checked || !ready) return;
    const m = markRound(round, answerFrom(round, draft));
    setMark(m);
    setResults((r) => ({ ...r, [idx]: m.correct }));
  };
  const next = () => {
    if (idx + 1 < session.length) { setIdx(idx + 1); setDraft(EMPTY); setMark(null); } else setEnded(true);
  };

  const verdict = checked ? <RoundVerdict round={round} mark={mark} L={L} t={t} /> : null;
  const footer = (
    <div className="flex flex-col gap-2.5">
      {!checked && <CheckButton onClick={check} disabled={!ready}>{t.check}</CheckButton>}
      {checked && <NextButton onClick={next}>{idx + 1 < session.length ? t.next : t.results}</NextButton>}
      <ProgressDots total={session.length} idx={idx} results={results} />
    </div>
  );

  let board;
  if (round.mode === 'build') {
    // Checked, the verdict takes the bank's column, beside the steps.
    board = <BuildBoard key={`${seed}-${idx}`} round={round} slots={draft.slots} onChange={(slots) => set({ slots })} checked={checked} lang={L} wide after={verdict} />;
  } else if (round.mode === 'fix') {
    board = (
      // Checked, the verdict sits under the replacements, beside the chain.
      <FixBoard key={`${seed}-${idx}`} round={round} pick={draft.pick} replace={draft.replace} checked={checked} lang={L} wide
        onPick={(i) => set({ pick: i })} onReplace={(id) => set({ replace: id })} after={verdict} />
    );
  } else if (round.mode === 'name') {
    board = <><NamePanel round={round} draft={draft} set={set} checked={checked} L={L} t={t} />{verdict}</>;
  } else {
    board = <><PicturePanel round={round} draft={draft} set={set} checked={checked} t={t} />{verdict}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {topBar}
      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-4 lg:px-5 pb-4 flex flex-col gap-2.5 sm:gap-3">
        <AskHeader icon={Link2} tone="bg-[#c25e12] border-[#a04a0e]" sub={t.modes[round.mode]}>{t.ask[round.mode]}</AskHeader>
        <ScenarioCard round={round} L={L} t={t} />
        <div className="flex flex-col gap-2.5 sm:gap-3">{board}</div>
        {footer}
      </div>
    </div>
  );
}
