import React, { useMemo, useState } from 'react';
import { TestTube, RotateCcw } from 'lucide-react';
import TopBar from '../components/TopBar';
import { AskHeader, CheckButton, NextButton, ChoiceButton, Verdict, ProgressDots, EmptyScreen, Summary, SvgPlate } from '../components/science/TaskChrome';
import { ScaleRow, SwatchRow, LitmusRows, Beaker, DropControls } from '../components/notes/PhActivity.jsx';
import {
  makePhSession, PH_MODES, markRound, answerOf, SUBSTANCES, KINDS, KIND_WORDS, tubeSvg, phColour, inkOn,
  caseOf, ADDS, WAYS, WAY_CHOICES, cap, NEUTRAL, afterDrops, dropsToNeutral,
} from '../utils/phLab';

/**
 * pH Lab — Science 2.8's generative task. Rounds are drawn fresh from a seed
 * and cycle through the unit's modes (src/utils/phLab.js):
 *
 *   classify    a liquid and its pH: acid, neutral or alkali
 *   colour      a pH: tap its universal-indicator colour — or a tube's colour: tap its pH
 *   litmus      a liquid: what blue litmus does, and what red litmus does
 *   strength    tap the strongest acid / alkali, or order them most acidic first
 *   neutralise  add drops of the other family and stop at green — or an
 *               everyday case: what to add, and which way the pH goes
 *
 * One attempt per round; the verdict names the wrong answer first (the colour
 * that pH really is, the paper that was already red, the drop one past green)
 * and then gives the rule — all from markRound. Score: rounds right out of the
 * session, out of 10; quitting saves what was answered; "New rounds" at the end
 * starts a fresh session and the better finished run is what is saved. Every
 * colour sits on a white plate, so dark mode never changes what is read.
 */

const T = {
  en: {
    title: 'pH Lab', check: 'Check', next: 'Next', results: 'See results', finish: 'Finish', again: 'New rounds',
    empty: 'This unit has no pH Lab modes.', back: 'Return', correct: 'Correct', wrong: 'Not quite', done: 'Lab complete', right: 'right',
    ask: {
      classify: 'Acid, neutral or alkali?',
      toColour: 'Which colour does universal indicator turn?',
      toPH: 'Universal indicator turned this colour. What is the pH?',
      litmus: 'What does each litmus paper do?',
      acid: 'Tap the strongest acid.',
      alkali: 'Tap the strongest alkali.',
      order: 'Tap them in order: most acidic first.',
      dropsAcid: 'Add alkali a drop at a time. Stop when it is neutral.',
      dropsAlkali: 'Add acid a drop at a time. Stop when it is neutral.',
      everyday: 'What would you add — and which way does the pH go?',
    },
    modes: { classify: 'Acid, neutral or alkali', colour: 'Indicator colours', litmus: 'Litmus paper', strength: 'Stronger or weaker', neutralise: 'Neutralise it' },
    acid: 'Acid', neutral: 'Neutral', alkali: 'Alkali', withIndicator: 'with universal indicator',
    beakerOf: (k) => `A beaker of ${k}`, anAcid: 'an acid', anAlkali: 'an alkali',
    add: 'What would you add?', way: 'Which way does the pH go?', clear: 'Start again', tube: 'A test tube of universal indicator',
  },
  vn: {
    title: 'Phòng thí nghiệm pH', check: 'Kiểm tra', next: 'Tiếp', results: 'Xem kết quả', finish: 'Hoàn thành', again: 'Lượt mới',
    empty: 'Bài này chưa có chế độ Phòng thí nghiệm pH.', back: 'Quay lại', correct: 'Chính xác', wrong: 'Chưa đúng', done: 'Hoàn thành phòng thí nghiệm', right: 'đúng',
    ask: {
      classify: 'Axit, trung tính hay kiềm?',
      toColour: 'Chất chỉ thị vạn năng chuyển màu gì?',
      toPH: 'Chất chỉ thị vạn năng chuyển màu này. pH là bao nhiêu?',
      litmus: 'Mỗi loại giấy quỳ sẽ thế nào?',
      acid: 'Chạm vào axit mạnh nhất.',
      alkali: 'Chạm vào kiềm mạnh nhất.',
      order: 'Chạm theo thứ tự: axit nhất trước.',
      dropsAcid: 'Nhỏ kiềm từng giọt một. Dừng khi đã trung tính.',
      dropsAlkali: 'Nhỏ axit từng giọt một. Dừng khi đã trung tính.',
      everyday: 'Em sẽ thêm gì — và pH thay đổi theo hướng nào?',
    },
    modes: { classify: 'Axit, trung tính hay kiềm', colour: 'Màu chất chỉ thị', litmus: 'Giấy quỳ', strength: 'Mạnh hay yếu', neutralise: 'Trung hòa' },
    acid: 'Axit', neutral: 'Trung tính', alkali: 'Kiềm', withIndicator: 'có chất chỉ thị vạn năng',
    beakerOf: (k) => `Một cốc ${k}`, anAcid: 'axit', anAlkali: 'kiềm',
    add: 'Em sẽ thêm gì?', way: 'pH thay đổi theo hướng nào?', clear: 'Làm lại', tube: 'Một ống nghiệm có chất chỉ thị vạn năng',
  },
};

const EMPTY = { choice: null, litmus: {}, order: [], drops: 0, add: null, way: null };

const say = (o, L) => (o ? (L === 'vn' && o.vn ? o.vn : o.en) : '');
const subName = (id, L) => cap(say(SUBSTANCES[id], L));

function askOf(round, t) {
  if (round.mode === 'colour') return t.ask[round.dir];
  if (round.mode === 'strength') return t.ask[round.ask];
  if (round.mode === 'neutralise') return round.ask === 'everyday' ? t.ask.everyday : round.start < NEUTRAL ? t.ask.dropsAcid : t.ask.dropsAlkali;
  return t.ask[round.mode];
}

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-sm ${className}`}>{children}</div>
);

/** A liquid's name (both languages in VN mode) and, if given, its pH chip. */
function NameBlock({ id, pH, kind, L, big = true }) {
  const s = SUBSTANCES[id];
  return (
    <div className="text-center min-w-0">
      <div className={`font-black text-slate-800 dark:text-slate-100 break-words ${big ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{cap(s.en)}</div>
      {L === 'vn' && <div className="font-bold text-sm text-slate-400">({s.vn})</div>}
      {pH != null && (
        // a plain chip: drawn in the pH's own colour it would answer the colour round
        <span className="inline-block mt-2 px-3 py-1 rounded-full font-black text-lg tabular-nums border-2 bg-white text-slate-800 border-slate-300">pH {pH}</span>
      )}
      {kind && <div className="mt-2 font-black text-slate-500 dark:text-slate-400">{say(KIND_WORDS[kind].a, L)}</div>}
    </div>
  );
}

// ------------------------------------------------------------------ the picture side

function Stage({ round, draft, checked, L, t, answerNow, set }) {
  if (round.mode === 'classify') {
    return (
      <Card className="p-4 sm:p-6 flex items-center justify-center gap-4 sm:gap-6 min-h-[8rem] lg:min-h-[16rem]">
        <SvgPlate svg={tubeSvg(checked ? round.pH : null)} label={t.tube} className="w-14 sm:w-20 lg:w-24 shrink-0" />
        <NameBlock id={round.sub} pH={round.pH} L={L} />
      </Card>
    );
  }
  if (round.mode === 'colour') {
    const marks = checked ? { [round.pH]: 'answer', ...(draft.choice !== round.pH ? { [draft.choice]: 'bad' } : {}) } : {};
    return (
      <Card className="p-4 sm:p-6 flex flex-col items-center justify-center gap-3 lg:min-h-[16rem]">
        {round.dir === 'toColour'
          ? <NameBlock id={round.sub} pH={round.pH} L={L} />
          : <SvgPlate svg={tubeSvg(round.pH)} label={t.tube} className="w-16 sm:w-24 lg:w-28" />}
        {checked && <div className="w-full max-w-2xl"><ScaleRow marks={marks} lang={L} compact /></div>}
      </Card>
    );
  }
  if (round.mode === 'litmus') {
    return (
      <Card className="p-4 sm:p-6 flex items-center justify-center lg:min-h-[16rem]">
        <NameBlock id={round.sub} pH={round.show === 'pH' ? round.pH : null} kind={round.show === 'kind' ? round.kind : null} L={L} />
      </Card>
    );
  }
  if (round.mode === 'strength') return <StrengthCards round={round} draft={draft} checked={checked} L={L} t={t} answerNow={answerNow} set={set} />;
  if (round.ask === 'drops') {
    const n = draft.drops;
    const adding = round.start < NEUTRAL ? 12 : 2;
    return (
      <Card className="p-3 sm:p-5 flex items-center justify-center gap-4 lg:min-h-[16rem]">
        <Beaker pH={afterDrops(round.start, n)} drops={n} dropColour={phColour(adding)} className="w-28 sm:w-36 lg:w-48 shrink-0" />
        <div className="text-center sm:text-left">
          <div className="font-black text-xl text-slate-800 dark:text-slate-100">{t.beakerOf(round.start < NEUTRAL ? t.anAcid : t.anAlkali)}</div>
          <div className="font-bold text-sm text-slate-500 dark:text-slate-400">{t.withIndicator}</div>
          {checked && (
            <div className="mt-3 flex flex-wrap gap-1 justify-center sm:justify-start">
              {Array.from({ length: n + 1 }, (_, i) => afterDrops(round.start, i)).map((p, i) => (
                <span key={i} className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-black" style={{ backgroundColor: phColour(p), color: inkOn(p) }}>{p}</span>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  }
  const c = caseOf(round.case);
  return (
    <Card className="p-4 sm:p-6 flex items-center justify-center lg:min-h-[16rem]">
      <p className="font-black text-xl sm:text-2xl text-slate-800 dark:text-slate-100 text-center leading-snug">{say(c, L)}</p>
    </Card>
  );
}

/** Strength rounds: the cards are the answer — tap one, or tap them in order. */
function StrengthCards({ round, draft, checked, L, t, answerNow, set }) {
  const want = answerOf(round);
  const order = round.ask === 'order';
  const tap = (id) => {
    if (checked) return;
    if (!order) { answerNow(id, markRound(round, id)); return; }
    set({ order: draft.order.includes(id) ? draft.order.filter((x) => x !== id) : [...draft.order, id] });
  };
  return (
    <div className="flex flex-col gap-2">
      <div className={`grid gap-2 ${round.subs.length === 4 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {round.subs.map((id) => {
          const pH = SUBSTANCES[id].pH;
          const at = draft.order.indexOf(id);
          let look;
          if (!checked) look = (order ? at >= 0 : draft.choice === id) ? 'picked' : 'idle';
          else if (order) look = at === want.indexOf(id) ? 'good' : 'bad';
          else look = id === want ? (draft.choice === id ? 'good' : 'answer') : draft.choice === id ? 'bad' : 'muted';
          return (
            <ChoiceButton key={id} look={look} disabled={checked} onClick={() => tap(id)} className="!py-2.5 flex items-center gap-3">
              <span className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center font-black text-base tabular-nums border-2 border-white shadow-sm" style={{ backgroundColor: phColour(pH), color: inkOn(pH) }}>{pH}</span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block">{subName(id, L)}</span>
                {L === 'vn' && <span className="block text-xs font-bold opacity-70">({SUBSTANCES[id].en})</span>}
              </span>
              {order && (at >= 0 || checked) && (
                <span className="w-7 h-7 shrink-0 rounded-full bg-slate-900/10 dark:bg-white/10 flex items-center justify-center font-black text-sm">{checked ? want.indexOf(id) + 1 : at + 1}</span>
              )}
            </ChoiceButton>
          );
        })}
      </div>
      {order && !checked && (
        <div className="flex gap-2">
          <button type="button" onClick={() => set({ order: [] })} disabled={!draft.order.length}
            className="px-4 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 disabled:opacity-40 inline-flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />{t.clear}
          </button>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ the answer side

const lookOf = (checked, value, chosen, right) => (!checked ? (value === chosen ? 'picked' : 'idle')
  : value === right ? (value === chosen ? 'good' : 'answer') : value === chosen ? 'bad' : 'muted');

function Panel({ round, draft, set, checked, L, t, record, answerNow }) {
  const want = answerOf(round);
  if (round.mode === 'classify') {
    return (
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
        {KINDS.map((k) => (
          <ChoiceButton key={k} look={lookOf(checked, k, draft.choice, want)} disabled={checked} onClick={() => answerNow(k, markRound(round, k))} className="!text-center !px-2">{t[k]}</ChoiceButton>
        ))}
      </div>
    );
  }
  if (round.mode === 'colour' && round.dir === 'toColour') {
    return <SwatchRow options={round.options} look={(p) => lookOf(checked, p, draft.choice, want)} onPick={(p) => answerNow(p, markRound(round, p))} disabled={checked} reveal={checked} />;
  }
  if (round.mode === 'colour') {
    return (
      <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
        {round.options.map((p) => (
          <ChoiceButton key={p} look={lookOf(checked, p, draft.choice, want)} disabled={checked} onClick={() => answerNow(p, markRound(round, p))} className="!text-center !px-1 tabular-nums">pH {p}</ChoiceButton>
        ))}
      </div>
    );
  }
  if (round.mode === 'litmus') {
    return (
      <div className="flex flex-col gap-2">
        <LitmusRows pick={draft.litmus} want={checked ? want : null} disabled={checked} lang={L}
          onPick={(paper, c) => set({ litmus: { ...draft.litmus, [paper]: c } })} />
        {!checked && <CheckButton onClick={() => record(markRound(round, draft.litmus))} disabled={!draft.litmus.blue || !draft.litmus.red}>{t.check}</CheckButton>}
      </div>
    );
  }
  if (round.mode === 'strength') {
    if (round.ask !== 'order' || checked) return null;
    return <CheckButton onClick={() => record(markRound(round, draft.order))} disabled={draft.order.length !== round.subs.length}>{t.check}</CheckButton>;
  }
  if (round.ask === 'drops') {
    const need = dropsToNeutral(round.start);
    const drop = () => {
      const next = draft.drops + 1;
      set({ drops: next });
      if (next > need) record(markRound(round, { drops: next }));   // one past green ends the round
    };
    return <DropControls start={round.start} drops={draft.drops} onDrop={drop} onStop={() => record(markRound(round, { drops: draft.drops }))} disabled={checked} lang={L} />;
  }
  // everyday
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{t.add}</div>
      <div className="grid grid-cols-1 gap-1.5">
        {round.options.map((id) => (
          <ChoiceButton key={id} look={lookOf(checked, id, draft.add, want.add)} disabled={checked} onClick={() => set({ add: id })} className="!py-2 text-sm">
            {cap(say(ADDS[id], L))}
          </ChoiceButton>
        ))}
      </div>
      <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">{t.way}</div>
      <div className="grid grid-cols-1 gap-1.5">
        {WAY_CHOICES.map((w) => (
          <ChoiceButton key={w} look={lookOf(checked, w, draft.way, want.way)} disabled={checked} onClick={() => set({ way: w })} className="!py-2 text-sm">
            {say(WAYS[w], L)}
          </ChoiceButton>
        ))}
      </div>
      {!checked && <CheckButton onClick={() => record(markRound(round, { add: draft.add, way: draft.way }))} disabled={!draft.add || !draft.way}>{t.check}</CheckButton>}
    </div>
  );
}

function summaryLabel(round, t, L) {
  let detail = '';
  if (round.sub) detail = subName(round.sub, L);
  else if (round.mode === 'colour') detail = `pH ${round.pH}`;
  else if (round.mode === 'strength') detail = round.subs.map((id) => subName(id, L)).join(', ');
  else if (round.ask === 'drops') detail = `pH ${round.start} → 7`;
  else if (round.case) detail = cap(say(ADDS[caseOf(round.case).fix], L));
  return `${t.modes[round.mode]}${detail ? `: ${detail}` : ''}`;
}

// ------------------------------------------------------------------ the task

export default function PhLab({ pool, onComplete, onQuit, bilingual = true }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(() => ((config.modes || []).some((m) => PH_MODES.includes(m)) ? makePhSession(config, seed) : []), [config, seed]);
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
  const answerNow = (choice, res) => { if (!checked) { setDraft((d) => ({ ...d, choice })); record(res); } };
  const next = () => {
    if (idx + 1 < session.length) { setIdx(idx + 1); reset(); }
    else setEnded(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {topBar}
      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-4 lg:px-5 pb-6 flex flex-col gap-3 lg:gap-4">
        <AskHeader icon={TestTube} tone="bg-[#7c3aed] border-[#6d28d9]" sub={t.modes[round.mode]}>{askOf(round, t)}</AskHeader>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-6 lg:items-start">
          <Stage key={`${seed}-${idx}`} round={round} draft={draft} checked={checked} L={L} t={t} answerNow={answerNow} set={set} />
          <div className="flex flex-col gap-3">
            <Panel key={`${seed}-${idx}`} round={round} draft={draft} set={set} checked={checked} L={L} t={t} record={record} answerNow={answerNow} />
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
