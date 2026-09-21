import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Star, Heart, Fish, Rocket, Flower2, Sun, Cloud, Car, TreePine, Apple, Bird, Cat, Bell, Gift,
  MousePointer2, MousePointerClick, Hand, Move, Trophy, CheckCircle2, Lightbulb, Inbox,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { makeSession, promptOf, slipText, scoreOf, shapeOf, MOUSE_MODES } from '../utils/mouseGym';

/* ------------------------------------------------------------------ *
 * MOUSE GYM (MOUSE_GYM) — click, double-click, right-click and drag, on a
 * fresh arrangement every round. The pure parts are in src/utils/mouseGym.js.
 *
 * One set of handlers serves a mouse AND a finger, so the same session works on
 * a laptop and a tablet: a double-click is two clicks (or taps) on the same
 * thing within DOUBLE_MS, not the browser's dblclick (which a tablet never
 * fires); a right-click is the contextmenu event OR a press held for HOLD_MS;
 * a drag is a press that moves. The prompt names the gesture for whichever the
 * student is using.
 *
 * A slip is named and the round carries on — "That was ONE click" is the
 * lesson, and a child who is only ever told "wrong" learns nothing about the
 * button they pressed.
 * ------------------------------------------------------------------ */

const DOUBLE_MS = 450;
const HOLD_MS = 550;
const ICONS = { Star, Heart, Fish, Rocket, Flower2, Sun, Cloud, Car, TreePine, Apple, Bird, Cat, Bell, Gift };

const EN = {
  title: 'Mouse Gym',
  intro: 'Four things you do with a mouse',
  introSub: 'Every round puts things in new places. Read the job, then do it.',
  click: 'Click', clickHow: 'Press the LEFT button once.', clickTouch: 'Tap once',
  double: 'Double-click', doubleHow: 'Two clicks, quickly, without moving.', doubleTouch: 'Tap twice, quickly',
  right: 'Right-click', rightHow: 'The RIGHT button opens a menu of things you can do.', rightTouch: 'Press and hold',
  drag: 'Drag', dragHow: 'Press, keep pressing, move, then let go.', dragTouch: 'Press and slide your finger',
  onTablet: 'On a tablet',
  start: 'Start',
  round: 'Round', of: 'of',
  box: 'Box',
  nice: 'Yes!',
  doneTitle: 'Session finished',
  clean: 'right first time',
  finish: 'Finish',
  keepGoing: 'The ones with a slip are the ones to practise. A new set is waiting next time.',
  allClean: 'Every round right first time. Your hand knows what to do.',
};
const VN = {
  title: 'Phòng tập chuột',
  intro: 'Bốn việc em làm với chuột',
  introSub: 'Mỗi lượt, các hình ở một chỗ mới. Đọc yêu cầu, rồi làm.',
  click: 'Bấm (click)', clickHow: 'Nhấn nút TRÁI một lần.', clickTouch: 'Chạm một lần',
  double: 'Bấm đúp (double-click)', doubleHow: 'Hai lần bấm, thật nhanh, không di chuột.', doubleTouch: 'Chạm hai lần thật nhanh',
  right: 'Bấm chuột phải (right-click)', rightHow: 'Nút PHẢI mở một trình đơn các việc em có thể làm.', rightTouch: 'Nhấn giữ',
  drag: 'Kéo (drag)', dragHow: 'Nhấn, giữ nguyên, di chuyển, rồi thả ra.', dragTouch: 'Nhấn và trượt ngón tay',
  onTablet: 'Trên máy tính bảng',
  start: 'Bắt đầu',
  round: 'Lượt', of: 'trên',
  box: 'Hộp',
  nice: 'Đúng rồi!',
  doneTitle: 'Đã xong buổi tập',
  clean: 'đúng ngay lần đầu',
  finish: 'Kết thúc',
  keepGoing: 'Những lượt bị lỡ tay chính là chỗ cần tập thêm. Lần sau có một bộ mới.',
  allClean: 'Lượt nào cũng đúng ngay lần đầu. Tay em đã biết phải làm gì.',
};

const MODE_ICON = { click: MousePointer2, double: MousePointerClick, right: MousePointerClick, drag: Move };

export default function MouseGym({ pool, onComplete, onQuit, bilingual = true }) {
  const cfg = useMemo(() => pool || {}, [pool]);
  const [seed] = useState(() => Date.now());
  const session = useMemo(() => makeSession(cfg, seed), [cfg, seed]);

  const [lang, setLang] = useState('en');
  const L = bilingual ? lang : 'en';
  const t = L === 'vn' ? VN : EN;

  const [phase, setPhase] = useState('intro');   // intro | round | done
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState([]);    // { kind, done, slips }
  const [slips, setSlips] = useState(0);
  const [message, setMessage] = useState(null);  // the named slip, or the praise
  const [menu, setMenu] = useState(false);       // the right-click menu is open
  const [solved, setSolved] = useState(false);
  const [touch, setTouch] = useState(false);
  const [ghost, setGhost] = useState(null);      // { x, y } in % while dragging
  const [ended, setEnded] = useState(false);

  const arena = useRef(null);
  const boxRef = useRef(null);
  const pending = useRef(null);                  // first click of a double, waiting for the second
  const press = useRef(null);                    // { x, y, moved, held, timer }

  const round = session[idx];

  useEffect(() => () => { clearTimeout(pending.current?.timer); clearTimeout(press.current?.timer); }, []);

  const slip = (code, extra) => {
    setSlips((n) => n + 1);
    setMessage({ ok: false, text: slipText(code, round, L, extra) });
  };

  const win = () => {
    if (solved) return;
    clearTimeout(pending.current?.timer);
    pending.current = null;
    setSolved(true);
    setMenu(false);
    setMessage({ ok: true, text: t.nice });
    const res = [...results, { kind: round.kind, done: true, slips }];
    setResults(res);
    setTimeout(() => {
      if (idx + 1 >= session.length) { setPhase('done'); return; }
      setIdx(idx + 1);
      setSlips(0);
      setMessage(null);
      setSolved(false);
      setGhost(null);
    }, 750);
  };

  // ---- the gestures, as the four jobs see them -------------------------

  const onItemClick = (id) => {
    if (solved) return;
    if (press.current?.held) return;             // that tap was a press-and-hold
    if (id !== round.target) { slip('wrongThing', { other: id }); return; }
    if (round.kind === 'click') { win(); return; }
    if (round.kind === 'right') { slip(touch ? 'holdLonger' : 'leftButton'); return; }
    if (round.kind === 'drag') { slip('notDragged'); return; }
    // double: two clicks on it inside DOUBLE_MS, or it was only one
    if (pending.current) { win(); return; }
    pending.current = {
      timer: setTimeout(() => { pending.current = null; slip(touch ? 'oneTap' : 'oneClick'); }, DOUBLE_MS),
    };
  };

  const onItemMenu = (id) => {
    if (solved) return;
    if (id !== round.target) { slip('wrongThing', { other: id }); return; }
    if (round.kind === 'right') { setMenu(true); setMessage(null); return; }
    slip('rightButton');
  };

  const choose = (c) => {
    if (c === round.choice) { win(); return; }
    setMenu(false);
    slip('wrongChoice', { choice: c });
  };

  const pctOf = (e) => {
    const r = arena.current?.getBoundingClientRect();
    return r ? { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 } : null;
  };

  const onDown = (e, id) => {
    setTouch(e.pointerType === 'touch');
    press.current = { x: e.clientX, y: e.clientY, moved: false, held: false, id, timer: null };
    if (e.pointerType === 'touch') {
      press.current.timer = setTimeout(() => {
        if (press.current && !press.current.moved) { press.current.held = true; onItemMenu(id); }
      }, HOLD_MS);
    }
  };
  const onMove = (e) => {
    const p = press.current;
    if (!p) return;
    if (!p.moved && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 8) {
      p.moved = true;
      clearTimeout(p.timer);
      try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch { /* not capturable */ }
    }
    if (p.moved && round.kind === 'drag' && p.id === round.target && !solved) setGhost(pctOf(e));
  };
  const onUp = (e) => {
    const p = press.current;
    if (!p) return;
    clearTimeout(p.timer);
    if (p.moved && round.kind === 'drag' && p.id === round.target && !solved) {
      const b = boxRef.current?.getBoundingClientRect();
      const inside = b && e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
      setGhost(null);
      if (inside) win(); else slip('dropOutside');
    }
    // `held` survives until the click that follows a press-and-hold is swallowed.
    setTimeout(() => { press.current = null; }, 0);
  };

  const onArenaClick = () => {
    if (solved) return;
    if (menu) { setMenu(false); return; }
    if (round.kind !== 'drag') slip('miss');
  };

  // ---- finishing -------------------------------------------------------

  // Scored over EVERY round in the session, so leaving early counts the rounds
  // not reached as nothing — no separate pro-rata step needed.
  const complete = () => {
    if (ended) return;
    setEnded(true);
    onComplete?.(scoreOf(results, session.length), null, {
      items: results.map((r, i) => ({ itemId: session[i]?.id || `r${i + 1}`, kind: r.kind, correct: r.done && !r.slips, score: r.slips ? 5 : 10 })),
    });
  };
  // The X saves what was done; unfinished rounds simply count nothing.
  const quit = () => (results.length ? complete() : onQuit?.());

  const byKind = MOUSE_MODES.filter((m) => session.some((r) => r.kind === m)).map((m) => ({
    m,
    clean: results.filter((r) => r.kind === m && !r.slips).length,
    total: session.filter((r) => r.kind === m).length,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 select-none">
      <TopBar
        onQuit={quit}
        modeTitle={(L === 'vn' ? cfg.titleVn : cfg.title) || t.title}
        current={results.length}
        total={session.length}
        lang={bilingual ? lang : undefined}
        onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        {phase === 'intro' && (
          <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-7 flex flex-col gap-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{t.intro}</h2>
              <p className="text-sm font-bold text-slate-500 mt-1">{t.introSub}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[['click', t.click, t.clickHow, t.clickTouch], ['double', t.double, t.doubleHow, t.doubleTouch],
                ['right', t.right, t.rightHow, t.rightTouch], ['drag', t.drag, t.dragHow, t.dragTouch]].map(([k, name, how, tab]) => {
                const I = MODE_ICON[k];
                return (
                  <div key={k} className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-3 flex gap-3">
                    <span className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center shrink-0">
                      <I className="w-5 h-5 text-sky-700 dark:text-sky-300" strokeWidth={2.6} />
                    </span>
                    <div>
                      <div className="font-black text-slate-800 dark:text-slate-100">{name}</div>
                      <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{how}</div>
                      <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-1 flex items-center gap-1">
                        <Hand className="w-3 h-3" strokeWidth={3} /> {t.onTablet}: {tab}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setPhase('round')}
                className="px-7 py-3 rounded-xl font-black text-base uppercase tracking-widest text-white bg-[#0284c7] border-b-[4px] border-[#075985] active:border-b-0 active:translate-y-[4px]">
                {t.start}
              </button>
            </div>
          </div>
        )}

        {phase === 'round' && round && (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t.round} {idx + 1} {t.of} {session.length}</span>
              <div className="flex-1 min-w-[16rem] rounded-2xl border-2 border-sky-300 dark:border-sky-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">
                {promptOf(round, L, touch)}
              </div>
            </div>

            <div
              ref={arena}
              role="application"
              aria-label="play area"
              onClick={onArenaClick}
              onContextMenu={(e) => { e.preventDefault(); if (!solved && !menu) slip('miss'); }}
              onPointerMove={onMove}
              onPointerUp={onUp}
              className="relative w-full rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-slate-900 overflow-hidden touch-none"
              // Exactly 2:1 (utils/mouseGym.js ASPECT) and no taller than 60% of
              // the window: capping the height instead would squash the ratio the
              // positions were clamped for, and push shapes out of the box.
              style={{ aspectRatio: '2 / 1', width: 'min(100%, 120vh)', marginInline: 'auto' }}>
              {round.kind === 'drag' && (
                <div ref={boxRef}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border-4 border-dashed border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 flex flex-col items-center justify-center text-emerald-600"
                  style={{ left: `${round.box.x}%`, top: `${round.box.y}%`, width: `${round.size * 1.8}%`, aspectRatio: '1' }}>
                  <Inbox className="w-1/3 h-1/3" strokeWidth={2.2} />
                  <span className="text-xs font-black uppercase tracking-widest">{t.box}</span>
                </div>
              )}

              {round.items.map((it) => {
                const sh = shapeOf(it.id);
                const Icon = ICONS[sh.icon];
                const dragging = ghost && it.id === round.target;
                return (
                  <button key={it.id} type="button"
                    aria-label={sh.en}
                    onClick={(e) => { e.stopPropagation(); onItemClick(it.id); }}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); if (!press.current?.held) onItemMenu(it.id); }}
                    onPointerDown={(e) => { e.stopPropagation(); onDown(e, it.id); }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-slate-800 shadow-md border-2 flex items-center justify-center transition-transform
                      ${solved && it.id === round.target ? 'border-[#58cc02] scale-110' : 'border-slate-200 dark:border-slate-700 hover:scale-105'}
                      ${dragging ? 'opacity-30' : ''}`}
                    style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${round.size}%`, aspectRatio: '1' }}>
                    <Icon className="w-3/5 h-3/5 pointer-events-none" style={{ color: sh.color }} strokeWidth={2.2} />
                  </button>
                );
              })}

              {ghost && <DragGhost id={round.target} at={ghost} size={round.size} />}

              {menu && <RoundMenu round={round} onChoose={choose} />}
            </div>

            <div className={`flex items-start gap-2 rounded-xl border-2 p-3 min-h-[3.25rem] ${message?.ok ? 'border-[#58a700] bg-[#d7ffb8]' : message ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/30' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
              {message?.ok
                ? <CheckCircle2 className="w-5 h-5 shrink-0 text-[#3e7500]" strokeWidth={2.6} />
                : <Lightbulb className="w-5 h-5 shrink-0 text-amber-500" strokeWidth={2.6} />}
              <span className="text-sm font-black text-slate-800 dark:text-slate-100">{message?.text || ''}</span>
            </div>
          </>
        )}

        {phase === 'done' && (
          <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <Trophy className="w-9 h-9 text-amber-500" strokeWidth={2.4} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{t.doneTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
              {byKind.map(({ m, clean, total }) => (
                <div key={m} className={`rounded-2xl border-2 p-3 ${clean === total ? 'border-[#58a700] bg-[#d7ffb8]/60 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t[m]}</div>
                  <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{clean}/{total}</div>
                  <div className="text-[11px] font-bold text-slate-500">{t.clean}</div>
                </div>
              ))}
            </div>
            <p className="max-w-lg text-base font-bold text-slate-600 dark:text-slate-300">
              {results.every((r) => !r.slips) ? t.allClean : t.keepGoing}
            </p>
            <button type="button" onClick={complete} disabled={ended}
              className="px-8 py-3 rounded-xl font-black text-base uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-5 h-5" strokeWidth={2.6} /> {t.finish}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** The thing being dragged, following the pointer. */
function DragGhost({ id, at, size }) {
  const sh = shapeOf(id);
  const Icon = ICONS[sh.icon];
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl ring-4 ring-sky-300 flex items-center justify-center pointer-events-none"
      style={{ left: `${at.x}%`, top: `${at.y}%`, width: `${size}%`, aspectRatio: '1' }}>
      <Icon className="w-3/5 h-3/5" style={{ color: sh.color }} strokeWidth={2.2} />
    </div>
  );
}

/** The right-click menu, beside the thing that was right-clicked. */
function RoundMenu({ round, onChoose }) {
  const at = round.items.find((it) => it.id === round.target);
  return (
    <div onClick={(e) => e.stopPropagation()} onContextMenu={(e) => e.preventDefault()}
      className="absolute z-20 w-40 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-2xl p-1"
      style={{ left: `${Math.min(at.x + round.size / 2, 78)}%`, top: `${Math.min(at.y, 55)}%` }}>
      {round.choices.map((c) => (
        <button key={c} type="button" onClick={() => onChoose(c)}
          className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-700">
          {c}
        </button>
      ))}
    </div>
  );
}
