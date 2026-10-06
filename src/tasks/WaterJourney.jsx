import { Fragment, useMemo, useState } from 'react';
import { CloudRain, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import { AskHeader, CheckButton, NextButton, ChoiceButton, Verdict, ProgressDots, EmptyScreen, Summary } from '../components/science/TaskChrome';
import { CycleFigure } from '../components/notes/CycleActivity';
import {
  makeJourneySession, markRound, cycleSvg, arrowsOf, processName, stateAnswerOf,
  MODES, ARROW, ARROWS, PLACES, PROCESS, EVERYDAY_BY_ID, STATE_OPTIONS,
} from '../utils/waterCycle';

/**
 * Water Journey — Science 2.4's generative task. Rounds are drawn fresh from a
 * seed and cycle through the unit's modes (src/utils/waterCycle.js), all on the
 * engine's own water-cycle diagram:
 *
 *   arrow     one arrow is lit: which process is it? (four options)
 *   tap       a process is named: tap its arrow, then Check
 *   journey   a particle starts at A and ends at B: tap the processes into the
 *             order it meets them — any order that is a real path is right
 *   state     a process: what happens to the water's state, and is heat
 *             energy taken in, given out, or neither?
 *   everyday  an everyday sentence (a puddle, mist on a lake, a rice field):
 *             which process is it?
 *
 * One attempt per round; a wrong answer is answered by name (what the chosen
 * process really is, or where the journey broke) before the right answer's
 * why. Score: rounds right out of the session, out of 10; quitting saves what
 * was answered; "New rounds" at the end starts a fresh session and the better
 * finished run is what is saved. Sized so a round fits 1280×720 and 375×812
 * without the page scrolling.
 */

const T = {
  en: {
    title: 'Water Journey', check: 'Check', next: 'Next', results: 'See results', finish: 'Finish', again: 'New rounds',
    empty: 'This unit has no Water Journey modes.', back: 'Return', correct: 'Correct', wrong: 'Not quite', done: 'Journey complete', right: 'right',
    ask: {
      arrow: 'Which process is the orange arrow?',
      tap: (p) => `Tap the arrow for ${p}.`,
      journey: 'Put the journey in order.',
      state: (p) => `${p[0].toUpperCase()}${p.slice(1)}: what happens to the water?`,
      everyday: 'Which process is this?',
    },
    modes: { arrow: 'Name the arrow', tap: 'Find the arrow', journey: 'Follow a particle', state: 'What the water does', everyday: 'Everyday water' },
    tapRing: 'Tap a ring on the diagram, then Check.', picked: 'Your arrow', none: 'none yet', arrowN: 'Arrow',
    start: 'Start', end: 'End', tapSteps: 'Tap the processes in order. Tap a step to take it back.',
    state: 'The state of the water', heat: 'Heat energy is…', diagram: 'The water cycle',
    heatShort: { in: 'taken in', out: 'given out', none: 'neither' },
  },
  vn: {
    title: 'Hành trình của nước', check: 'Kiểm tra', next: 'Tiếp', results: 'Xem kết quả', finish: 'Hoàn thành', again: 'Lượt mới',
    empty: 'Bài này chưa có chế độ Hành trình của nước.', back: 'Quay lại', correct: 'Chính xác', wrong: 'Chưa đúng', done: 'Hoàn thành hành trình', right: 'đúng',
    ask: {
      arrow: 'Mũi tên màu cam là quá trình nào?',
      tap: (p) => `Chạm vào mũi tên của ${p}.`,
      journey: 'Sắp xếp hành trình theo thứ tự.',
      state: (p) => `${p[0].toUpperCase()}${p.slice(1)}: điều gì xảy ra với nước?`,
      everyday: 'Đây là quá trình nào?',
    },
    modes: { arrow: 'Gọi tên mũi tên', tap: 'Tìm mũi tên', journey: 'Theo dấu một hạt nước', state: 'Nước thay đổi thế nào', everyday: 'Nước quanh ta' },
    tapRing: 'Chạm vào một vòng tròn trên sơ đồ, rồi bấm Kiểm tra.', picked: 'Mũi tên của em', none: 'chưa chọn', arrowN: 'Mũi tên',
    start: 'Bắt đầu', end: 'Kết thúc', tapSteps: 'Chạm các quá trình theo thứ tự. Chạm vào một bước để bỏ nó ra.',
    state: 'Trạng thái của nước', heat: 'Nhiệt năng được…', diagram: 'Vòng tuần hoàn của nước',
    heatShort: { in: 'nhận vào', out: 'tỏa ra', none: 'không cái nào' },
  },
};

const EMPTY = { picked: null, choice: null, order: [], state: null, heat: null };
const say = (o, L) => (o ? (L === 'vn' && o.vn ? o.vn : o.en) : '');

const askOf = (round, t, L) => {
  if (round.mode === 'tap' || round.mode === 'state') return t.ask[round.mode](processName(round.process, L));
  return t.ask[round.mode];
};

/** The diagram for a round, before and after it is marked. */
function figureOf(round, draft, result, L) {
  const checked = !!result;
  if (round.mode === 'arrow') {
    if (!checked) return cycleSvg({ highlight: round.arrow, lang: L });
    return cycleSvg({ tones: { [round.arrow]: result.ok ? 'good' : 'lit' }, dimRest: true, labels: { arrows: [round.arrow] }, lang: L });
  }
  if (round.mode === 'journey') {
    const marks = { A: round.from, B: round.to };
    if (!checked || !result.path) return cycleSvg({ marks, lang: L });
    return cycleSvg({
      marks, lang: L, dimRest: true,
      tones: Object.fromEntries(result.path.map((id) => [id, 'path'])),
      numbers: Object.fromEntries(result.path.map((id, i) => [id, i + 1])),
    });
  }
  const right = arrowsOf(round.process).map((a) => a.id);
  if (round.mode === 'state') return cycleSvg({ highlight: right, labels: { arrows: right }, lang: L });
  if (round.mode === 'tap' && !checked) return cycleSvg({ hit: true, lang: L });
  if (round.mode === 'everyday' && !checked) return cycleSvg({ lang: L });
  // tap / everyday, marked: the right arrows green, a wrong choice red — named
  const tones = Object.fromEntries(right.map((id) => [id, 'good']));
  if (!result.ok) {
    const wrong = round.mode === 'tap' ? [draft.picked] : arrowsOf(draft.choice).map((a) => a.id);
    for (const id of wrong) if (ARROW[id]) tones[id] = 'bad';
  }
  return cycleSvg({ tones, dimRest: true, labels: { arrows: Object.keys(tones) }, lang: L });
}

// ------------------------------------------------------------------ the picture side

function Stage({ round, svg, draft, setPicked, checked, L, t }) {
  const item = round.mode === 'everyday' ? EVERYDAY_BY_ID[round.item] : null;
  // The diagram's box has the drawing's own shape and sits right under the
  // question; in the fixed-height screen it is the one thing that shrinks
  // (down to 8rem) when the panel needs the room, so a round never scrolls.
  // On a laptop it fills the left column. CycleFigure `fit` letterboxes the
  // drawing inside whatever box it gets.
  return (
    <div className="shrink min-h-0 min-w-0 flex flex-col gap-2 lg:h-full">
      {item && (
        <div className="shrink-0 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-sm px-4 py-2 sm:py-3 text-center">
          <div className="font-black text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-slate-100 leading-snug">{item.en}</div>
          {L === 'vn' && <div className="font-bold text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-0.5">({item.vn})</div>}
        </div>
      )}
      <div className="relative w-full shrink min-h-[8rem] aspect-[800/470] lg:aspect-auto lg:flex-1 lg:min-h-0">
        <div className="absolute inset-0">
          <CycleFigure svg={svg} label={t.diagram} fit
            picked={round.mode === 'tap' ? draft.picked : null}
            onTap={round.mode === 'tap' && !checked ? setPicked : undefined} />
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ the answer side

const lookOf = (checked, isRight, isChosen) => (!checked ? (isChosen ? 'picked' : 'idle') : isRight ? (isChosen ? 'good' : 'answer') : isChosen ? 'bad' : 'muted');

function JourneyPanel({ round, draft, set, checked, result, L, t, check }) {
  const order = draft.order;
  const add = (pid) => { if (!order.includes(pid) && order.length < round.steps.length) set({ order: [...order, pid] }); };
  const takeBack = (i) => set({ order: order.filter((_, k) => k !== i) });
  const bank = round.bank.filter((pid) => !order.includes(pid));
  const chip = 'rounded-xl border-2 border-b-[4px] px-2.5 py-1.5 font-bold text-sm';
  const place = (id, label, colour) => (
    <div className="flex items-baseline gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-300">
      <span className="shrink-0 px-1.5 rounded-md text-white text-xs font-black" style={{ backgroundColor: colour }}>{label}</span>
      <span>{say(PLACES[id].at, L)}</span>
    </div>
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        {place(round.from, `A · ${t.start}`, '#0087a8')}
        {place(round.to, `B · ${t.end}`, '#c25e12')}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {round.steps.map((_, i) => {
          const pid = order[i];
          const look = checked ? (result.ok ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-[#ffdfe0] border-[#ea2b2b] text-[#a32d23]')
            : pid ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100'
              : 'border-dashed bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400';
          return (
            <Fragment key={i}>
              {i > 0 && <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={3} />}
              <button disabled={checked || !pid} onClick={() => takeBack(i)} className={`${chip} min-w-[3.5rem] ${look}`}>
                <span className="opacity-60 mr-1">{i + 1}.</span>{pid ? processName(pid, L) : '…'}
              </button>
            </Fragment>
          );
        })}
      </div>
      {!checked && (
        <>
          <p className="text-xs font-bold text-slate-400">{t.tapSteps}</p>
          <div className="flex flex-wrap gap-1.5 min-h-[2.75rem] p-1.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40">
            {bank.map((pid) => (
              <button key={pid} onClick={() => add(pid)}
                className={`${chip} bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:border-[#1cb0f6] transition-all`}>
                {processName(pid, L)}
              </button>
            ))}
          </div>
          <CheckButton onClick={check} disabled={order.length < round.steps.length}>{t.check}</CheckButton>
        </>
      )}
    </div>
  );
}

function Panel({ round, draft, set, checked, result, L, t, check, answerNow }) {
  if (round.mode === 'arrow' || round.mode === 'everyday') {
    return (
      <div className="grid grid-cols-2 gap-2">
        {round.options.map((pid) => (
          <ChoiceButton key={pid} look={lookOf(checked, pid === round.process, draft.choice === pid)} disabled={checked}
            onClick={() => answerNow({ choice: pid }, markRound(round, pid))} className="!px-3 !py-2.5 !text-sm sm:!text-base">
            {processName(pid, L)}
          </ChoiceButton>
        ))}
      </div>
    );
  }
  if (round.mode === 'tap') {
    const n = draft.picked ? ARROWS.findIndex((a) => a.id === draft.picked) + 1 : 0;
    return !checked && (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.tapRing}</p>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t.picked}: <span className={n ? 'text-[#1899d6]' : ''}>{n ? `${t.arrowN} ${n}` : t.none}</span></p>
        <CheckButton onClick={check} disabled={!draft.picked}>{t.check}</CheckButton>
      </div>
    );
  }
  if (round.mode === 'state') {
    const want = stateAnswerOf(round.process);
    const group = (label, key, options) => (
      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</div>
        <div className="grid grid-cols-3 gap-1.5">
          {options.map(([id, text]) => (
            <ChoiceButton key={id} look={lookOf(checked, want[key] === id, draft[key] === id)} disabled={checked}
              onClick={() => set({ [key]: id })} className="!px-2 !py-2 !text-sm !text-center leading-tight">
              {text}
            </ChoiceButton>
          ))}
        </div>
      </div>
    );
    return (
      <div className="flex flex-col gap-2.5">
        {group(t.state, 'state', STATE_OPTIONS.map((o) => [o.id, say(o, L)]))}
        {group(t.heat, 'heat', ['in', 'out', 'none'].map((id) => [id, t.heatShort[id]]))}
        {!checked && <CheckButton onClick={check} disabled={!draft.state || !draft.heat}>{t.check}</CheckButton>}
      </div>
    );
  }
  return <JourneyPanel round={round} draft={draft} set={set} checked={checked} result={result} L={L} t={t} check={check} />;
}

// ------------------------------------------------------------------ the session

const summaryLabel = (round, t, L) => {
  const detail = round.mode === 'journey' ? `${say(PLACES[round.from], L)} → ${say(PLACES[round.to], L)}`
    : round.mode === 'everyday' ? say({ en: EVERYDAY_BY_ID[round.item].en, vn: EVERYDAY_BY_ID[round.item].vn }, L)
      : say(PROCESS[round.process], L);
  return `${t.modes[round.mode]}: ${detail}`;
};

export default function WaterJourney({ pool, onComplete, onQuit, bilingual = true }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(
    () => ((config.modes || []).some((m) => MODES.includes(m)) ? makeJourneySession(config, seed) : []),
    [config, seed],
  );
  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState(EMPTY);
  const [result, setResult] = useState(null);   // this round's mark
  const [results, setResults] = useState({});   // idx -> boolean
  const [ended, setEnded] = useState(false);
  const [banked, setBanked] = useState(null);   // the best finished run before "New rounds"
  const round = session[idx];

  const L = bilingual ? lang : 'en';
  const t = T[L];
  const svg = useMemo(() => (round ? figureOf(round, draft, result, L) : ''), [round, draft, result, L]);

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
    <TopBar onQuit={quit} modeTitle={say({ en: config.title, vn: config.titleVn }, L) || t.title}
      current={ended ? session.length : idx + 1} total={session.length}
      lang={bilingual ? lang : undefined} onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />
  );

  const reset = () => { setDraft(EMPTY); setResult(null); };
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
          rows={session.map((r, i) => ({ ok: !!results[i], label: summaryLabel(r, t, L) }))}
          againLabel={t.again} finishLabel={t.finish} onAgain={again} onFinish={finish} />
      </div>
    );
  }

  const checked = result !== null;
  const set = (patch) => { if (!checked) setDraft((d) => ({ ...d, ...patch })); };
  const record = (res) => {
    if (checked) return;
    setResult(res);
    setResults((r) => ({ ...r, [idx]: !!res.ok }));
  };
  const check = () => {
    if (round.mode === 'tap') { if (draft.picked) record(markRound(round, draft.picked)); }
    else if (round.mode === 'state') { if (draft.state && draft.heat) record(markRound(round, { state: draft.state, heat: draft.heat })); }
    else if (round.mode === 'journey') { if (draft.order.length === round.steps.length) record(markRound(round, draft.order)); }
  };
  const answerNow = (patch, res) => { if (!checked) { setDraft((d) => ({ ...d, ...patch })); record(res); } };
  const next = () => {
    if (idx + 1 < session.length) { setIdx(idx + 1); reset(); }
    else setEnded(true);
  };

  return (
    // A fixed-height screen: the diagram gives up height before anything scrolls.
    <div className="h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {topBar}

      <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto p-3 sm:p-4 lg:px-5 flex flex-col gap-2.5 sm:gap-3">
        <AskHeader icon={CloudRain} tone="bg-[#1a5fa8] border-[#144a84]" sub={t.modes[round.mode]}>{askOf(round, t, L)}</AskHeader>

        <div className="flex-1 min-h-0 flex flex-col gap-2.5 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[minmax(0,1fr)] lg:gap-5">
          <Stage round={round} svg={svg} draft={draft} setPicked={(id) => set({ picked: id })} checked={checked} L={L} t={t} />

          <div className="shrink-0 flex flex-col gap-2 lg:self-start lg:max-h-full lg:min-h-0 lg:overflow-y-auto">
            <Panel key={`${seed}-${idx}`} round={round} draft={draft} set={set} checked={checked} result={result} L={L} t={t} check={check} answerNow={answerNow} />
            {checked && (
              <>
                <Verdict ok={!!result.ok} title={result.ok ? t.correct : t.wrong}>
                  {result.lines.map((line, i) => <p key={i}>{say(line, L)}</p>)}
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
