import { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Gauge, Target, Trophy, ArrowRight, Hand, CheckCircle2, AlertTriangle } from 'lucide-react';
import TopBar from '../components/TopBar';
import {
  makeSession, newLine, press, statsOf, scoreOf, keyFor, FINGER, MODE_LABEL,
} from '../utils/typeGym';

/* ------------------------------------------------------------------ *
 * TYPING GYM (TYPE_GYM) — touch typing, home row first, a fresh set of lines
 * every session drawn from the unit's own words, file names and addresses.
 * The pure parts (lines, marking, scoring) are in src/utils/typeGym.js; this
 * screen only renders them and feeds it keystrokes.
 *
 * Stop-on-error: the caret moves only on the right key. The on-screen keyboard
 * lights the NEXT key (and the Shift that goes with it) in its finger's colour,
 * so the student looks at the screen, not at their hands — which is the habit
 * being built.
 *
 * Keystrokes arrive through one hidden <input>, not a window listener, so the
 * tablet's own keyboard opens when the student taps the line. Its value is
 * emptied after every change, so each change IS the keys just typed. A
 * composing input method (Vietnamese Telex turns "dd" into "đ") is waited out
 * and the student is told to switch to English if a letter comes out changed.
 * ------------------------------------------------------------------ */

const EN = {
  title: 'Typing Gym',
  homeRow: 'Put your fingers on the home row',
  homeRowHow: 'Left fingers on A S D F, right fingers on J K L ;. Feel the little bumps on F and J — that is how you find them without looking. Thumbs rest on the space bar.',
  eyes: 'Look at the screen, not at your hands.',
  rules: 'The line only moves on the right key. A wrong key turns red — find the right one and carry on.',
  goal: 'Your goal',
  wpm: 'words a minute',
  right: 'right',
  rounds: 'rounds · new lines every time',
  start: 'Start',
  round: 'Round',
  of: 'of',
  tapToType: 'Tap here, then type',
  speed: 'Speed',
  accuracy: 'Right',
  lineDone: 'Line done!',
  next: 'Next line',
  finish: 'Finish',
  doneTitle: 'Session finished',
  goalMet: 'You reached the goal. Next time, try to go a little faster without more red keys.',
  goalAcc: 'Good speed — now slow down a little and aim for fewer red keys. Accuracy comes first.',
  goalSpeed: 'Very accurate. Keep your eyes on the screen and the speed will come.',
  goalNone: 'Keep practising: a few minutes every day beats one long go. Every session has new lines.',
  ime: 'A letter came out changed (like â or đ). Switch your keyboard to English, then carry on.',
  score: 'Score',
  nextKey: 'Next key',
  space: 'space',
};

const VN = {
  title: 'Phòng tập gõ phím',
  homeRow: 'Đặt các ngón tay lên hàng phím cơ sở',
  homeRowHow: 'Ngón tay trái đặt trên A S D F, ngón tay phải trên J K L ;. Hãy sờ hai gờ nhỏ trên F và J — nhờ đó em tìm được chúng mà không cần nhìn. Hai ngón cái đặt trên phím cách.',
  eyes: 'Nhìn vào màn hình, đừng nhìn tay.',
  rules: 'Dòng chữ chỉ đi tiếp khi em gõ đúng phím. Gõ sai thì phím hiện màu đỏ — tìm phím đúng rồi gõ tiếp.',
  goal: 'Mục tiêu của em',
  wpm: 'từ mỗi phút',
  right: 'đúng',
  rounds: 'lượt · mỗi lần là những dòng mới',
  start: 'Bắt đầu',
  round: 'Lượt',
  of: 'trên',
  tapToType: 'Chạm vào đây rồi gõ',
  speed: 'Tốc độ',
  accuracy: 'Đúng',
  lineDone: 'Xong một dòng!',
  next: 'Dòng tiếp theo',
  finish: 'Kết thúc',
  doneTitle: 'Đã xong buổi tập',
  goalMet: 'Em đã đạt mục tiêu. Lần sau, hãy thử gõ nhanh hơn một chút mà không thêm phím đỏ.',
  goalAcc: 'Tốc độ tốt — giờ hãy chậm lại một chút để ít phím đỏ hơn. Gõ đúng quan trọng hơn gõ nhanh.',
  goalSpeed: 'Rất chính xác. Cứ giữ mắt trên màn hình, tốc độ sẽ tự đến.',
  goalNone: 'Hãy tập tiếp: mỗi ngày vài phút tốt hơn một lần thật lâu. Mỗi buổi tập đều có dòng mới.',
  ime: 'Có chữ bị đổi (như â hay đ). Hãy chuyển bàn phím sang tiếng Anh rồi gõ tiếp.',
  score: 'Điểm',
  nextKey: 'Phím tiếp theo',
  space: 'phím cách',
};

const FINGER_BG = {
  L4: '#ffe4e6', L3: '#fef3c7', L2: '#dcfce7', L1: '#dbeafe',
  R1: '#ede9fe', R2: '#dcfce7', R3: '#fef3c7', R4: '#ffe4e6', T: '#f1f5f9',
};
const ROWS = [
  '1234567890-'.split(''),
  'qwertyuiop'.split(''),
  "asdfghjkl;'".split(''),
  'zxcvbnm,./'.split(''),
];
const HOME = new Set('asdfjkl;'.split(''));

export default function TypeGym({ pool, onComplete, onQuit, bilingual = true }) {
  const cfg = useMemo(() => pool || {}, [pool]);
  const [seed] = useState(() => Date.now());
  const session = useMemo(() => makeSession(cfg, seed), [cfg, seed]);
  const target = cfg.target || { wpm: 8, accuracy: 0.9 };

  const [lang, setLang] = useState('en');
  const L = bilingual ? lang : 'en';
  const t = L === 'vn' ? VN : EN;

  const [phase, setPhase] = useState('intro');       // intro | round | done
  const [idx, setIdx] = useState(0);
  const [line, setLine] = useState(() => newLine(session[0]?.text || ''));
  // The line as of the LAST keystroke. Keys can arrive faster than React
  // re-renders (a quick typist, a burst from a soft keyboard); marking each
  // against the rendered `line` marked them all against the same old position
  // and kept only the last.
  const lineRef = useRef(line);
  const [results, setResults] = useState([]);          // statsOf per finished line
  const [focused, setFocused] = useState(false);
  const [imeWarn, setImeWarn] = useState(false);
  const [ended, setEnded] = useState(false);
  const inputRef = useRef(null);
  const composing = useRef(false);

  const round = session[idx];
  const lineDone = line.finished !== null;

  useEffect(() => {
    if (phase === 'round') inputRef.current?.focus();
  }, [phase, idx]);

  const feed = (chars) => {
    const before = lineRef.current;
    if (phase !== 'round' || before.finished !== null) return;
    let next = before;
    for (const ch of chars) {
      if (/[^\x20-\x7E\u2018\u2019\u02BC\u00A0]/.test(ch)) setImeWarn(true);
      next = press(next, ch, Date.now());
      if (next.finished !== null) break;
    }
    lineRef.current = next;
    setLine(next);
    if (next.finished !== null) setResults((r) => [...r, statsOf(next)]);
  };

  const nextRound = () => {
    if (idx + 1 >= session.length) { setPhase('done'); return; }
    setIdx(idx + 1);
    const fresh = newLine(session[idx + 1].text);
    lineRef.current = fresh;
    setLine(fresh);
    setImeWarn(false);
  };

  const summary = scoreOf(results, target);

  const complete = (fraction = 1) => {
    if (ended) return;
    setEnded(true);
    const score = Math.round(summary.score * fraction);
    onComplete?.(score, null, {
      items: results.map((r, i) => ({
        itemId: session[i]?.id || `r${i + 1}`,
        correct: r.accuracy >= (target.accuracy || 0.9),
        score: Math.round(r.accuracy * 100),
        wpm: Math.round(r.wpm * 10) / 10,
      })),
    });
  };

  // The X saves what was typed, pro rata; with nothing typed it just closes.
  const quit = () => (results.length ? complete(results.length / session.length) : onQuit?.());

  const live = statsOf(line);
  const soFar = scoreOf([...results, ...(lineDone ? [] : [live])], target);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={quit}
        modeTitle={(L === 'vn' ? cfg.titleVn : cfg.title) || t.title}
        current={phase === 'done' ? session.length : (phase === 'round' ? idx + (lineDone ? 1 : 0) : 0)}
        total={session.length}
        lang={bilingual ? lang : undefined}
        onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />

      <div className="flex-1 w-full max-w-4xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        {phase === 'intro' && (
          <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center">
                <Hand className="w-7 h-7 text-cyan-700 dark:text-cyan-300" strokeWidth={2.4} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{t.homeRow}</h2>
            </div>
            <KeyboardPicture next={null} homeGlow />
            <p className="text-base font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{t.homeRowHow}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Callout icon={Target} tone="#0891b2">{t.eyes}</Callout>
              <Callout icon={AlertTriangle} tone="#f59e0b">{t.rules}</Callout>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border-2 border-cyan-200 dark:border-cyan-800 text-sm font-black text-cyan-800 dark:text-cyan-200">
                {t.goal}: {target.wpm} {t.wpm} · {Math.round((target.accuracy || 0.9) * 100)}% {t.right}
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{session.length} {t.rounds}</span>
              <button type="button" onClick={() => setPhase('round')}
                className="ml-auto px-7 py-3 rounded-xl font-black text-base uppercase tracking-widest text-white bg-[#0891b2] border-b-[4px] border-[#0e7490] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                <Keyboard className="w-5 h-5" strokeWidth={2.6} /> {t.start}
              </button>
            </div>
          </div>
        )}

        {phase === 'round' && round && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2 border-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 dark:border-cyan-800">
                <Keyboard className="w-4 h-4 text-cyan-700 dark:text-cyan-300" strokeWidth={2.6} />
                <span className="font-black text-sm text-slate-800 dark:text-slate-100">
                  {t.round} {idx + 1} {t.of} {session.length} · {MODE_LABEL[round.mode]?.[L] || round.mode}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><Gauge className="w-4 h-4" strokeWidth={2.6} /> {t.speed} {Math.round(soFar.wpm)}</span>
                <span className="flex items-center gap-1.5"><Target className="w-4 h-4" strokeWidth={2.6} /> {t.accuracy} {Math.round(soFar.accuracy * 100 || 100)}%</span>
              </div>
            </div>

            {/* the line. Tapping it focuses the hidden input, which opens a tablet's keyboard. */}
            <div
              role="textbox"
              tabIndex={-1}
              onClick={() => inputRef.current?.focus()}
              className={`relative rounded-3xl border-2 bg-white dark:bg-slate-900 shadow-sm px-4 sm:px-8 py-7 sm:py-9 cursor-text
                ${focused ? 'border-cyan-400' : 'border-slate-200 dark:border-slate-700'}`}>
              <LineView line={line} />
              <input
                ref={inputRef}
                value=""
                aria-label="type here"
                onChange={(e) => { if (!composing.current) feed([...e.target.value]); }}
                onCompositionStart={() => { composing.current = true; }}
                onCompositionEnd={(e) => { composing.current = false; feed([...(e.data || '')]); }}
                onKeyDown={(e) => { if (lineDone && e.key === 'Enter') { e.preventDefault(); nextRound(); } }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                // 16px, or iOS zooms the page when the box takes focus.
                className="absolute inset-0 w-full h-full opacity-0 cursor-text text-[16px]" />
              {!focused && !lineDone && (
                <div className="absolute inset-0 rounded-3xl bg-white/70 dark:bg-slate-900/70 flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-black text-sm uppercase tracking-widest shadow">{t.tapToType}</span>
                </div>
              )}
            </div>

            {imeWarn && (
              <div className="rounded-xl border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-3 text-sm font-bold text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" strokeWidth={2.6} /> {t.ime}
              </div>
            )}

            {lineDone ? (
              <div className="rounded-2xl border-2 border-[#58a700] bg-[#d7ffb8] dark:bg-emerald-950/40 p-4 flex flex-wrap items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-[#3e7500]" strokeWidth={2.6} />
                <div className="font-black text-[#3e7500] dark:text-emerald-300">
                  {t.lineDone}{' '}
                  <span className="font-bold">
                    {Math.round(results[results.length - 1]?.wpm || 0)} {t.wpm} · {Math.round((results[results.length - 1]?.accuracy || 0) * 100)}% {t.right}
                  </span>
                </div>
                <button type="button" onClick={nextRound}
                  className="ml-auto px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                  {idx + 1 >= session.length ? t.finish : t.next} <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
            ) : (
              <KeyboardPicture next={line.text[line.pos]} wrong={line.wrong} t={t} />
            )}
          </>
        )}

        {phase === 'done' && (
          <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <Trophy className="w-9 h-9 text-amber-500" strokeWidth={2.4} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{t.doneTitle}</h2>
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
              <Stat label={t.speed} value={`${Math.round(summary.wpm)}`} sub={`${t.goal}: ${target.wpm}`} ok={summary.metSpeed} />
              <Stat label={t.accuracy} value={`${Math.round(summary.accuracy * 100)}%`} sub={`${t.goal}: ${Math.round((target.accuracy || 0.9) * 100)}%`} ok={summary.metAccuracy} />
              <Stat label={t.score} value={`${summary.score}/10`} sub="" ok={summary.score >= 8} />
            </div>
            <p className="max-w-lg text-base font-bold text-slate-600 dark:text-slate-300">
              {summary.metAccuracy && summary.metSpeed ? t.goalMet
                : summary.metSpeed ? t.goalAcc
                  : summary.metAccuracy ? t.goalSpeed : t.goalNone}
            </p>
            <button type="button" onClick={() => complete(1)} disabled={ended}
              className="px-8 py-3 rounded-xl font-black text-base uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-5 h-5" strokeWidth={2.6} /> {t.finish}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** The line, one box per character: typed green, the next one lit, a wrong key flashing red. */
function LineView({ line }) {
  return (
    <div className="font-mono text-[1.35rem] sm:text-[2rem] leading-relaxed tracking-wide text-center break-words select-none">
      {[...line.text].map((ch, i) => {
        const done = i < line.pos;
        const current = i === line.pos && line.finished === null;
        const missed = (line.errAt[i] || 0) > 0;
        let cls = 'text-slate-300 dark:text-slate-600';
        if (done) cls = missed ? 'text-amber-600 dark:text-amber-400' : 'text-[#3e7500] dark:text-emerald-400';
        if (current) cls = line.wrong != null
          ? 'bg-rose-500 text-white rounded-md animate-[pulse_0.4s_ease-in-out_1]'
          : 'bg-cyan-100 dark:bg-cyan-900/60 text-slate-900 dark:text-white rounded-md border-b-4 border-cyan-500';
        return (
          <span key={i} className={`inline-block px-[1px] ${cls}`}>
            {ch === ' ' ? (current ? '\u2423' : '\u00A0') : ch}
          </span>
        );
      })}
    </div>
  );
}

/** The keyboard, drawn in finger colours, with the next key (and its Shift) lit. */
function KeyboardPicture({ next, wrong = null, homeGlow = false, t = EN }) {
  const want = keyFor(next);
  const lit = (k) => want && want.key === k;
  const key = (k) => {
    const on = lit(k);
    return (
      <div key={k}
        className={`relative h-9 sm:h-11 min-w-0 flex-1 rounded-lg border-2 flex items-center justify-center font-mono font-black text-sm sm:text-base
          ${on ? 'bg-cyan-500 border-cyan-700 text-white scale-105 shadow-md' : 'border-slate-200 dark:border-slate-700 text-slate-600'}
          ${homeGlow && HOME.has(k) ? 'ring-2 ring-cyan-400' : ''}`}
        style={on ? undefined : { background: FINGER_BG[FINGER[k]] || '#f8fafc' }}>
        {k}
        {(k === 'f' || k === 'j') && <span className={`absolute bottom-1 w-3 h-0.5 rounded ${on ? 'bg-white' : 'bg-slate-500'}`} />}
      </div>
    );
  };
  const shift = (side) => (
    <div className={`h-9 sm:h-11 rounded-lg border-2 flex items-center justify-center text-[10px] sm:text-xs font-black uppercase tracking-widest
      ${want?.shift === side ? 'bg-cyan-500 border-cyan-700 text-white' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
      style={{ flex: 1.6 }}>
      shift
    </div>
  );
  return (
    <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 sm:p-3 flex flex-col gap-1.5 select-none">
      {next != null && (
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
          {t.nextKey}:
          <span className="px-2 py-0.5 rounded-md bg-cyan-500 text-white font-mono normal-case text-sm">{next === ' ' ? t.space : next}</span>
          {wrong != null && <span className="text-rose-500 normal-case">✗ {wrong === ' ' ? t.space : wrong}</span>}
        </div>
      )}
      <div className="flex gap-1 sm:gap-1.5">{ROWS[0].map(key)}</div>
      <div className="flex gap-1 sm:gap-1.5 pl-[4%]">{ROWS[1].map(key)}</div>
      <div className="flex gap-1 sm:gap-1.5 pl-[6%]">{ROWS[2].map(key)}</div>
      <div className="flex gap-1 sm:gap-1.5">{shift('left')}{ROWS[3].map(key)}{shift('right')}</div>
      <div className="flex justify-center">
        <div className={`h-9 sm:h-11 w-1/2 rounded-lg border-2 ${lit(' ') ? 'bg-cyan-500 border-cyan-700' : 'border-slate-200 dark:border-slate-700'}`}
          style={lit(' ') ? undefined : { background: FINGER_BG.T }} />
      </div>
    </div>
  );
}

function Callout({ icon: Icon, tone, children }) {
  return (
    <div className="rounded-2xl border-2 p-3 flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200"
      style={{ borderColor: `${tone}66`, background: `${tone}12` }}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: tone }} strokeWidth={2.6} /> {children}
    </div>
  );
}

function Stat({ label, value, sub, ok }) {
  return (
    <div className={`rounded-2xl border-2 p-3 ${ok ? 'border-[#58a700] bg-[#d7ffb8]/60 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
      <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{value}</div>
      {sub && <div className="text-[11px] font-bold text-slate-500">{sub}</div>}
    </div>
  );
}
