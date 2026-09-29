import { useMemo, useRef, useState } from 'react';
import {
  Construction, Target, CheckCircle2, XCircle, ArrowRight, Lightbulb, Ban, RotateCcw,
  MousePointerClick, PenLine, Crosshair, Keyboard,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import LinePlane from '../components/math/LinePlane.jsx';
import { LINE_COLORS, latticeFromEvent } from '../components/math/linePlaneGeom.js';
import { parseInlineText } from '../components/notes/layouts/helpers.jsx';
import {
  modelOf, clickHits, clickNeeds, judgeNumber, judgeRoot, judgeEquation, frPt, numPt, ptText, frTex, frText,
  frTyped, sqrtTex, sqrtText, texToText, slopeInterceptTex, standardTex, slopeOf, onLine, CLICK_KINDS,
  parseNum, isLattice,
} from '../utils/lineLab';
import { fr, frEq, neg, div, sub, add, mul, toNumber } from '../utils/linearEquation';
import { stepText, clickWhy } from '../utils/lineLabText';

/* ------------------------------------------------------------------ *
 * LINE LAB — straight lines, worked on the grid.
 *
 * Reads a unit's `lineLab`: { title, titleVn, items: [ … ] }. The item shape
 * is documented at the top of src/utils/lineLab.js, which derives every
 * answer; this screen only asks, marks and draws.
 *
 * An item is a short run of STEPS. Click steps put points on the lattice —
 * plot a point, place three points on a line, walk a slope from a point, the
 * corner of the distance triangle, a midpoint, where two lines meet. Typed
 * steps ask for a number (a run, a rise, a slope, an intercept), an exact
 * length, a pair of coordinates, an equation in the form the item names, or
 * how two lines are related. Each finished step leaves something on the
 * picture — the point, the line, the triangle leg with its length on it — so
 * the finished grid explains its own answers.
 *
 * SCORING (the same as Graph It): one mark per step, paid only if it was
 * right first time. A student stays on a step until it is right; a wrong
 * click is left where it landed and named ("at (1, 3) the left side is −1,
 * not 6"), because the reason is the lesson. "Show me" fills a step in — for a
 * typed step at any time, for a click step after two misses — and that step
 * pays nothing.
 *
 * AIMING (from Graph It): the pointer snaps to the nearest lattice point and
 * shows it before anything is placed; a finger needs a second tap to commit;
 * arrow keys walk the aim and Enter places it.
 * ------------------------------------------------------------------ */

const SKY = '#1cb0f6';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const INK = '#0891b2';
const UNIT = 34;

const EN = {
  title: 'Line Lab',
  step: 'Step', of: 'of',
  aiming: 'Aiming at',
  aimHint: 'Move over the grid to aim, then click to place.',
  tapAgain: 'Tap the same point again to place it.',
  placeBtn: 'Place',
  placedHere: 'placed',
  check: 'Check', showMe: 'Show me', next: 'Next question', finish: 'Finish', cont: 'Continue',
  clean: 'Every step right first time.',
  helped: 'Done — with a slip or a hint along the way.',
  scoreLine: 'steps right first time',
  never: 'They never meet',
  undefinedBtn: 'Undefined',
  rootBtn: 'Insert √',
  good: 'Yes — keep going.',
  shown: 'Here it is. Read it, then continue.',
  right: 'Right.',
  noGraphs: 'No graphs yet',
  back: 'Return to Dashboard',
  rel: { parallel: 'Parallel', perpendicular: 'Perpendicular', same: 'Same line', neither: 'Neither' },
  fillBoth: 'Fill in both boxes.',
  typeSomething: 'Type your answer first.',
};

const VN = {
  title: 'Phòng Thí Nghiệm Đường Thẳng',
  step: 'Bước', of: 'trên',
  aiming: 'Đang ngắm',
  aimHint: 'Rê chuột trên lưới để ngắm, rồi bấm để đặt điểm.',
  tapAgain: 'Chạm lần nữa vào đúng điểm đó để đặt.',
  placeBtn: 'Đặt điểm',
  placedHere: 'đã đặt',
  check: 'Kiểm tra', showMe: 'Chỉ cho em', next: 'Câu tiếp theo', finish: 'Kết thúc', cont: 'Tiếp tục',
  clean: 'Mọi bước đều đúng ngay lần đầu.',
  helped: 'Xong — có một lần sai hoặc được gợi ý trên đường đi.',
  scoreLine: 'bước đúng ngay lần đầu',
  never: 'Hai đường không bao giờ gặp nhau',
  undefinedBtn: 'Không xác định',
  rootBtn: 'Chèn √',
  good: 'Đúng — làm tiếp nhé.',
  shown: 'Đáp án đây. Đọc kỹ rồi tiếp tục.',
  right: 'Đúng rồi.',
  noGraphs: 'Chưa có đồ thị nào',
  back: 'Quay lại Bảng điều khiển',
  rel: { parallel: 'Song song', perpendicular: 'Vuông góc', same: 'Trùng nhau', neither: 'Không phải hai loại trên' },
  fillBoth: 'Điền cả hai ô.',
  typeSomething: 'Hãy nhập câu trả lời trước.',
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};

const Say = ({ text }) => <span className="[&_.katex]:text-[1.05em]">{parseInlineText(text)}</span>;

const pairText = ([x, y]) => `(${frText(fr(x))}, ${frText(fr(y))})`;

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en);

/** The answer a typed step wants, as the text "Show me" fills in. */
function shownText(ans) {
  if (ans.mode === 'number') return { v: frTyped(ans.value) };
  if (ans.mode === 'slope') return ans.value ? { v: frTyped(ans.value) } : { undef: true };
  if (ans.mode === 'root') return { v: sqrtText(ans.sq) };
  if (ans.mode === 'pair') return { x: frTyped(ans.value[0]), y: frTyped(ans.value[1]) };
  if (ans.mode === 'equation') {
    const tex = ans.form === 'slope' ? slopeInterceptTex(ans.line) : standardTex(ans.line);
    return { v: texToText(tex).replace(/−/g, '-') };
  }
  if (ans.mode === 'relation') return { rel: ans.value };
  return {};
}

export default function LineLab({ pool, onComplete, onQuit }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it && Array.isArray(it.steps) && it.steps.length), [pool]);
  const models = useMemo(() => items.map((it) => { try { return modelOf(it); } catch { return null; } }), [items]);

  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [placed, setPlaced] = useState([]);       // right points on the current click step
  const [misses, setMisses] = useState([]);       // wrong clicks on the current item
  const [missFlag, setMissFlag] = useState(null);
  const [stepMisses, setStepMisses] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [locked, setLocked] = useState(false);    // typed step answered or shown — waiting for Continue
  const [results, setResults] = useState({});     // itemId -> { clean, total }
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState(null);
  const [aim, setAim] = useState(null);
  const [armed, setArmed] = useState(false);
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [labels, setLabels] = useState({});       // lineName -> label text chosen by an equation step
  const [kept, setKept] = useState([]);           // points placed on finished click steps
  const svgRef = useRef(null);

  const t = lang === 'vn' ? VN : EN;
  const item = items[idx];
  const model = models[idx];

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-sky-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noGraphs}</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">
          {t.back}
        </button>
      </div>
    );
  }

  const grid = model.grid;
  const step = item.steps[stepIdx];
  const ans = model.answers[stepIdx];
  const isClick = CLICK_KINDS.includes(step.kind);
  const need = isClick ? clickNeeds(ans) : 0;
  const { title: stepTitle, sub: stepSub } = stepText(step, model, lang);

  // ---------------------------------------------------------------- flow

  const resetStep = () => {
    setPlaced([]); setStepMisses(0); setDirty(false); setLocked(false);
    setMsg(null); setAim(null); setArmed(false); setTyped({}); setMarks({}); setMissFlag(null);
  };

  const closeStep = (wasDirty, pts = placed) => {
    const total = item.steps.length;
    if (isClick && pts.length) setKept((k) => [...k, ...pts.map((at) => ({ at, flag: step.kind !== 'on' && !step.name }))]);
    setResults((r) => {
      const prev = r[item.id] || { clean: 0, total };
      return { ...r, [item.id]: { clean: prev.clean + (wasDirty ? 0 : 1), total } };
    });
    if (step.kind === 'equation') {
      const tex = step.form === 'slope' ? slopeInterceptTex(ans.line) : standardTex(ans.line);
      setLabels((l) => ({ ...l, [step.line]: texToText(tex) }));
    }
    if (stepIdx + 1 < item.steps.length) {
      setStepIdx((s) => s + 1);
      resetStep();
    } else {
      setDone(true);
      setAim(null); setArmed(false); setLocked(false);
    }
  };

  const finishAll = () => {
    const rows = items.map((it) => results[it.id] || { clean: 0, total: it.steps.length });
    const clean = rows.reduce((s, r) => s + r.clean, 0);
    const total = rows.reduce((s, r) => s + r.total, 0);
    const log = items.map((it) => ({ itemId: it.id, correct: (results[it.id]?.clean || 0) === it.steps.length }));
    onComplete?.(total ? Math.round((clean / total) * 10) : 0, null, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finishAll() : onQuit?.());

  const nextItem = () => {
    if (idx + 1 < items.length) {
      setIdx((i) => i + 1);
      setStepIdx(0);
      setMisses([]);
      setDone(false);
      setLabels({});
      setKept([]);
      resetStep();
    } else finishAll();
  };

  // ---------------------------------------------------------------- clicks

  const place = (p) => {
    if (done || !isClick || locked) return;
    if (clickHits(ans, p, placed)) {
      const now = [...placed, p];
      setPlaced(now);
      setMsg(null);
      if (now.length >= need) closeStep(dirty, now);
      else setMsg({ ok: true, text: t.good });
      return;
    }
    if (placed.some((r) => r[0] === p[0] && r[1] === p[1])) return;
    setMisses((m) => [...m, p]);
    setMissFlag(`(${frText(fr(p[0]))}, ${frText(fr(p[1]))})`);
    setDirty(true);
    setStepMisses((n) => n + 1);
    setMsg({ ok: false, text: clickWhy(step, ans, model, p, lang) });
  };

  const onPointerMove = (e) => {
    if (done || !isClick || locked) return;
    if (e.pointerType === 'touch' && !armed) return;
    const p = latticeFromEvent(e, svgRef.current, grid, UNIT);
    if (p) setAim(p);
  };
  const onPointerUp = (e) => {
    if (done || !isClick || locked) return;
    const p = latticeFromEvent(e, svgRef.current, grid, UNIT);
    if (!p) return;
    if (e.pointerType === 'touch') {
      if (armed && aim && aim[0] === p[0] && aim[1] === p[1]) { setArmed(false); setAim(null); place(p); }
      else { setAim(p); setArmed(true); }
      return;
    }
    setAim(p);
    place(p);
  };
  const onKeyDown = (e) => {
    if (done || !isClick || locked) return;
    const nudge = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
    const clamp = (x, y) => [Math.max(grid.xMin, Math.min(grid.xMax, x)), Math.max(grid.yMin, Math.min(grid.yMax, y))];
    if (nudge) {
      e.preventDefault();
      setAim(aim ? clamp(aim[0] + nudge[0], aim[1] + nudge[1]) : clamp(0, 0));
      setArmed(false);
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && aim) {
      e.preventDefault();
      const p = aim;
      setArmed(false); setAim(null);
      place(p);
    }
  };

  const pressNever = () => {
    if (done || locked) return;
    if (ans.verdict === 'parallel') { closeStep(dirty, []); return; }
    setDirty(true);
    setStepMisses((n) => n + 1);
    setMsg({ ok: false, text: lang === 'vn' ? 'Hai đường này CÓ gặp nhau — hệ số góc của chúng khác nhau. Hãy tìm chỗ đó.' : 'These two DO meet — their slopes are different. Find where.' });
  };

  /** Show me: a click step gets its targets placed; a typed step gets its answer filled. */
  const showMe = () => {
    if (done || locked) return;
    setDirty(true);
    if (isClick) {
      if (ans.verdict) { setMsg({ ok: false, shown: true, text: lang === 'vn' ? 'Hai đường này có cùng hệ số góc nhưng khác nhau: chúng song song, không bao giờ gặp nhau.' : 'These lines have the same slope and are different lines: they are parallel and never meet.' }); setLocked(true); return; }
      let want;
      if (ans.on) {
        const excluded = [...ans.exclude.map(numPt), ...placed];
        want = [...placed];
        for (let x = grid.xMin; x <= grid.xMax && want.length < need; x += 1) {
          for (let y = grid.yMin; y <= grid.yMax && want.length < need; y += 1) {
            if (onLine(ans.on, frPt([x, y])) && !excluded.some((r) => r[0] === x && r[1] === y) && !want.some((r) => r[0] === x && r[1] === y)) want.push([x, y]);
          }
        }
      } else want = ans.targets.map(numPt);
      setPlaced(want);
      setMsg({ ok: false, shown: true, text: t.shown });
      setLocked(true);
      return;
    }
    const s = shownText(ans);
    setTyped(s);
    setMarks(ans.mode === 'pair' ? { x: 'shown', y: 'shown' } : { v: 'shown' });
    setMsg({ ok: false, shown: true, text: t.shown });
    setLocked(true);
  };

  // ---------------------------------------------------------------- typed

  const wrong = (text, m = { v: 'bad' }) => {
    setDirty(true);
    setMarks(m);
    setMsg({ ok: false, text });
  };
  const right = (text = t.right, m = { v: 'good' }) => {
    setMarks(m);
    setMsg({ ok: true, text });
    setLocked(true);
  };

  const checkTyped = () => {
    if (locked || done) return;
    const vn = lang === 'vn';
    if (ans.mode === 'slope') {
      const want = ans.value;
      if (typed.undef) {
        if (want === null) { right(vn ? 'Đúng — đường thẳng đứng: độ thay đổi của $x$ bằng 0, và không thể chia cho 0.' : 'Right — an upright line: the change in $x$ is 0, and you cannot divide by 0.'); return; }
        wrong(vn ? 'Đường này không thẳng đứng — nó có hệ số góc. Chọn hai điểm rồi chia.' : 'This line is not upright — it has a slope. Pick two points and divide.');
        return;
      }
      const j = judgeNumber(typed.v, want || fr(0));
      if (j.blank || !j.value) { setMsg({ ok: false, text: t.typeSomething }); return; }
      if (want === null) { wrong(vn ? 'Đường này thẳng đứng: mọi điểm có cùng $x$, nên độ thay đổi của $x$ bằng 0. Hệ số góc KHÔNG XÁC ĐỊNH — bấm nút đó.' : 'This line is upright: every point has the same $x$, so the change in $x$ is 0. Its slope is UNDEFINED — press that button.'); return; }
      if (j.ok) { right(); return; }
      const v = j.value;
      if (v.n !== 0 && want.n !== 0 && frEq(v, div(fr(1), want))) { wrong(vn ? 'Đó là ngang chia dọc. Hệ số góc là dọc chia ngang — độ thay đổi của $y$ ở TRÊN.' : 'That is run ÷ rise. Slope is rise ÷ run — the change in $y$ goes on TOP.'); return; }
      if (frEq(v, neg(want))) {
        const down = toNumber(want) < 0;
        wrong(vn ? `Đúng độ lớn, sai dấu. Đường này đi ${down ? 'XUỐNG' : 'LÊN'} từ trái sang phải, nên hệ số góc ${down ? 'âm' : 'dương'}.` : `Right size, wrong sign. This line goes ${down ? 'DOWN' : 'UP'} from left to right, so its slope is ${down ? 'negative' : 'positive'}.`);
        return;
      }
      wrong(step.line
        ? (vn ? 'Đưa $y$ về một mình ($y = mx + b$) — số đứng trước $x$ là hệ số góc. Hoặc tìm hai điểm trên đường thẳng.' : 'Get $y$ on its own ($y = mx + b$) — the number in front of $x$ is the slope. Or find two points on the line.')
        : (vn ? 'Hệ số góc = (độ thay đổi của $y$) ÷ (độ thay đổi của $x$), trừ theo CÙNG một thứ tự.' : 'Slope = (change in $y$) ÷ (change in $x$), subtracting in the SAME order both times.'));
      return;
    }
    if (ans.mode === 'number') {
      const j = judgeNumber(typed.v, ans.value);
      if (j.blank || !j.value) { setMsg({ ok: false, text: t.typeSomething }); return; }
      if (j.ok) { right(); return; }
      const v = j.value;
      if ((step.ask === 'run' || step.ask === 'rise') && frEq(v, neg(ans.value))) {
        wrong(step.abs
          ? (vn ? 'Độ dài không bao giờ âm.' : 'A length is never negative.')
          : (vn ? `Để ý chiều: đi từ $${step.from}$ tới $${step.to}$, lấy điểm CUỐI trừ điểm ĐẦU.` : `Mind the direction: going from $${step.from}$ to $${step.to}$ is END minus START.`));
        return;
      }
      if (step.ask === 'xint' || step.ask === 'yint') {
        wrong(step.ask === 'xint'
          ? (vn ? 'Trên trục $x$ thì $y = 0$: thay $y = 0$ vào rồi giải tìm $x$.' : 'On the $x$-axis $y = 0$: put $y = 0$ in and solve for $x$.')
          : (vn ? 'Trên trục $y$ thì $x = 0$: thay $x = 0$ vào rồi giải tìm $y$.' : 'On the $y$-axis $x = 0$: put $x = 0$ in and solve for $y$.'));
        return;
      }
      if (step.ask === 'xAt' || step.ask === 'yAt') {
        wrong(vn ? 'Thay giá trị đã cho vào phương trình rồi giải.' : 'Put the value you are given into the equation, then solve.');
        return;
      }
      wrong(vn ? 'Đếm lại trên lưới, hoặc lấy tọa độ trừ nhau.' : 'Count it again on the grid, or subtract the coordinates.');
      return;
    }
    if (ans.mode === 'root') {
      const j = judgeRoot(typed.v, ans.sq);
      if (j.blank) { setMsg({ ok: false, text: t.typeSomething }); return; }
      if (j.ok) { right(vn ? `Đúng — $${sqrtTex(ans.sq)}$.` : `Right — $${sqrtTex(ans.sq)}$.`); return; }
      if (j.near) { setMsg({ ok: false, info: true, text: vn ? `Đúng độ lớn — giờ hãy viết CHÍNH XÁC, bằng căn: ví dụ $\\sqrt{${ans.sq.n * ans.sq.d}}$${ans.sq.d > 1 ? `$/${ans.sq.d}$` : ''}.` : `That is the right size — now give it EXACTLY, with a root sign: something like $\\sqrt{${ans.sq.n * ans.sq.d}}$${ans.sq.d > 1 ? `$/${ans.sq.d}$` : ''}.` }); return; }
      const A = model.points[step.from];
      const B = model.points[step.to];
      const dx = sub(B[0], A[0]);
      const dy = sub(B[1], A[1]);
      const sum = add(fr(Math.abs(dx.n), dx.d), fr(Math.abs(dy.n), dy.d));
      if (j.value && frEq(j.value, mul(sum, sum))) { wrong(vn ? 'Đó là ngang CỘNG dọc. Khoảng cách là cạnh huyền: $\\sqrt{\\text{ngang}^2 + \\text{dọc}^2}$.' : 'That is across PLUS up. The distance is the long side: $\\sqrt{\\text{across}^2 + \\text{up}^2}$.'); return; }
      wrong(vn ? `Dùng định lý Pythagore: ngang $= ${frTex(fr(Math.abs(dx.n), dx.d))}$, dọc $= ${frTex(fr(Math.abs(dy.n), dy.d))}$, rồi khoảng cách$^2$ = ngang$^2$ + dọc$^2$.` : `Use Pythagoras: across $= ${frTex(fr(Math.abs(dx.n), dx.d))}$, up $= ${frTex(fr(Math.abs(dy.n), dy.d))}$, and distance$^2$ = across$^2$ + up$^2$.`);
      return;
    }
    if (ans.mode === 'pair') {
      const x = parseNum(typed.x);
      const y = parseNum(typed.y);
      if (!x || !y) { setMsg({ ok: false, text: t.fillBoth }); return; }
      const okX = frEq(x, ans.value[0]);
      const okY = frEq(y, ans.value[1]);
      const m = { x: okX ? 'good' : 'bad', y: okY ? 'good' : 'bad' };
      if (okX && okY) { right(t.right, m); return; }
      if (frEq(x, ans.value[1]) && frEq(y, ans.value[0])) { wrong(vn ? 'Em đã đảo hai tọa độ — $x$ trước.' : 'You swapped them — $x$ first.', m); return; }
      wrong(step.ask === 'midpoint'
        ? (vn ? 'Trung điểm là trung bình: $\\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$.' : 'The midpoint is the average: $\\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$.')
        : (vn ? 'Lấy điểm đầu, cộng thêm đúng phần đó của độ thay đổi $x$ và của độ thay đổi $y$.' : 'Start at the first point, then add that fraction of the change in $x$ and of the change in $y$.'), m);
      return;
    }
    if (ans.mode === 'equation') {
      if (!String(typed.v || '').trim()) { setMsg({ ok: false, text: t.typeSomething }); return; }
      const j = judgeEquation(typed.v, ans.line, ans.form);
      if (j.ok) { right(vn ? `Đúng — $${ans.form === 'slope' ? slopeInterceptTex(ans.line) : standardTex(ans.line)}$.` : `Right — $${ans.form === 'slope' ? slopeInterceptTex(ans.line) : standardTex(ans.line)}$.`); return; }
      if (j.error) { setMsg({ ok: false, text: vn ? `Chưa đọc được phương trình đó: ${j.error}.` : `I can't read that equation: ${j.error}.` }); return; }
      if (j.sameLine) {
        wrong(ans.form === 'standard'
          ? (vn ? 'Đúng đường thẳng rồi! Giờ viết ở dạng chuẩn: $Ax + By = C$ với các số nguyên, $A$ dương, không có ước chung.' : 'That IS the line! Now write it in standard form: $Ax + By = C$, whole numbers, $A$ positive, no common factor.')
          : (vn ? 'Đúng đường thẳng rồi! Giờ đưa $y$ về một mình: $y = mx + b$.' : 'That IS the line! Now get $y$ on its own: $y = mx + b$.'));
        return;
      }
      wrong(j.sameSlope
        ? (vn ? 'Đúng hệ số góc — nhưng đường của em không đi qua đúng điểm. Kiểm tra hằng số.' : 'Right slope — but your line misses the point it must pass through. Check the constant.')
        : (vn ? 'Hệ số góc chưa đúng. Tính hệ số góc trước, rồi dùng một điểm đã biết.' : 'The slope is not right. Find the slope first, then use a point you know.'));
      return;
    }
    if (ans.mode === 'relation') {
      if (!typed.rel) return;
      if (typed.rel === ans.value) { right(); return; }
      setDirty(true);
      setMarks({ rel: typed.rel });
      const [a, b] = step.lines.map((n) => slopeOf(model.lines[n]));
      const sl = (m) => (m === null ? (vn ? 'không xác định' : 'undefined') : `$${frTex(m)}$`);
      setMsg({ ok: false, text: vn ? `Hai hệ số góc là ${sl(a)} và ${sl(b)}. Bằng nhau → song song (hoặc trùng); tích bằng $-1$ → vuông góc.` : `The slopes are ${sl(a)} and ${sl(b)}. Equal → parallel (or the same line); a product of $-1$ → perpendicular.` });
    }
  };

  // ---------------------------------------------------------------- picture

  const reached = done ? item.steps.length : stepIdx;       // steps finished
  const finished = item.steps.slice(0, reached);
  const shownNames = new Set(item.show || []);
  finished.forEach((st) => {
    if (st.kind === 'plot') (Array.isArray(st.points) ? st.points : [st.points]).forEach((n) => shownNames.add(n));
    if (st.kind === 'on' || st.kind === 'equation') shownNames.add(st.line);
    if (st.name) shownNames.add(st.name);
  });
  // A step that is about a segment shows the segment while it is live.
  const live = !done ? step : null;

  const lineNames = Object.keys(model.lines);
  const drawnLines = lineNames
    .map((n, i) => ({ n, i }))
    .filter(({ n }) => shownNames.has(n))
    .map(({ n, i }) => {
      const ln = model.lines[n];
      const hidden = (item.hideLabels || []).includes(n);
      const label = labels[n] || (ln.tex && !hidden ? texToText(ln.tex) : null);
      return { line: ln, color: LINE_COLORS[i % 4], label };
    });

  // Segments: each finished (or live) step that is ABOUT a segment draws it.
  // A run step draws the horizontal leg from its start to the end's x; a rise
  // step draws the upright leg into its end — so "run A→C", "run A→B" and
  // "rise C→B" all land on the same right triangle, labelled once typed.
  const segments = [];
  const LEG = '#64748b';
  item.steps.forEach((st, j) => {
    const isDone = j < reached;
    const isLive = !!live && j === stepIdx;
    if (!isDone && !isLive) return;
    const a = model.answers[j];
    const pt = (n) => numPt(model.points[n]);
    if (st.kind === 'corner' && isDone) {
      const A = pt(st.from);
      const B = pt(st.to);
      const C = [B[0], A[1]];
      segments.push({ from: A, to: C, color: LEG, dashed: true });
      segments.push({ from: C, to: B, color: LEG, dashed: true });
    }
    if (st.kind === 'type' && (st.ask === 'run' || st.ask === 'rise')) {
      const P = pt(st.from);
      const Q = pt(st.to);
      const K = [Q[0], P[1]];
      const [f, to] = st.ask === 'run' ? [P, K] : [K, Q];
      const label = isDone ? (st.abs ? frText(a.value) : `${toNumber(a.value) > 0 ? '+' : ''}${frText(a.value)}`) : null;
      segments.push({ from: f, to, color: isDone ? LEG : AMBER, dashed: true, width: isDone ? 3 : 4, label });
    }
    if (st.kind === 'type' && st.ask === 'distance') {
      segments.push({ from: pt(st.from), to: pt(st.to), color: isDone ? GREEN : AMBER, width: 3.5, dashed: !isDone, label: isDone ? sqrtText(a.sq) : null, labelSide: 'before' });
    }
    if (st.kind === 'midpoint' || st.kind === 'divide' || (st.kind === 'type' && (st.ask === 'midpoint' || st.ask === 'divide'))) {
      const [p, q] = st.of || [st.from, st.to];
      segments.push({ from: pt(p), to: pt(q), color: '#94a3b8', width: 2.5 });
    }
    if (st.kind === 'extend') {
      const A = pt(st.from);
      const M = pt(st.through);
      segments.push({ from: A, to: M, color: '#94a3b8', width: 2.5 });
      if (isDone) segments.push({ from: M, to: [2 * M[0] - A[0], 2 * M[1] - A[1]], color: '#94a3b8', width: 2.5, dashed: true });
    }
    if (st.kind === 'type' && st.ask === 'slope' && st.from) {
      segments.push({ from: pt(st.from), to: pt(st.to), color: '#94a3b8', width: 2.5 });
    }
  });

  const drawnPoints = [];
  const namedShown = Object.keys(model.points).filter((n) => shownNames.has(n));
  const pointColor = (n) => (item.points?.[n] ? '#be185d' : '#7c3aed');
  for (const n of namedShown) {
    const p = model.points[n];
    if (!isLattice(p) && !finished.some((s) => s.name === n)) continue;
    const at = numPt(p);
    drawnPoints.push({ at, color: pointColor(n), name: n, flag: ptText(p) });
  }
  // Points placed on earlier steps stay where they were put; the live step's
  // right points carry their coordinates.
  for (const k of kept) {
    if (drawnPoints.some((d) => d.at[0] === k.at[0] && d.at[1] === k.at[1])) continue;
    drawnPoints.push({ at: k.at, color: GREEN, r: k.flag ? 7.5 : 5.5, flag: k.flag ? pairText(k.at) : null });
  }
  if (!done && isClick) for (const p of placed) drawnPoints.push({ at: p, color: GREEN, flag: pairText(p) });

  const itemResult = results[item.id];
  const totalClean = Object.values(results).reduce((s, r) => s + r.clean, 0);
  const totalSteps = items.reduce((s, it) => s + it.steps.length, 0);
  const canShowClick = isClick && stepMisses >= 2;

  // ---------------------------------------------------------------- render

  const box = (key, width = 'w-24', placeholder = '?') => (
    <input value={typed[key] ?? ''} disabled={locked} placeholder={placeholder} spellCheck={false} autoComplete="off" aria-label={key}
      onChange={(e) => { setTyped((s) => ({ ...s, [key]: e.target.value, undef: false })); setMarks({}); if (msg && !msg.ok) setMsg(null); }}
      onKeyDown={(e) => { if (e.key === 'Enter') checkTyped(); }}
      className={`${width} px-2 py-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500 disabled:opacity-90 ${RING[marks[key]] || 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}`} />
  );

  let inputs = null;
  if (!isClick && !done) {
    if (ans.mode === 'pair') {
      inputs = (
        <div className="flex items-center gap-1.5 font-mono font-black text-2xl text-slate-500">
          ( {box('x', 'w-20')} , {box('y', 'w-20')} )
        </div>
      );
    } else if (ans.mode === 'relation') {
      inputs = (
        <div className="grid grid-cols-2 gap-2">
          {['parallel', 'perpendicular', 'same', 'neither'].map((r) => {
            const state = locked && ans.value === r ? 'good' : marks.rel === r ? 'bad' : null;
            return (
              <button key={r} disabled={locked} onClick={() => { setTyped({ rel: r }); setMarks({}); }}
                className={`px-3 py-3 rounded-xl border-2 border-b-[4px] font-black text-sm transition-all ${state ? RING[state] : typed.rel === r ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}>
                {t.rel[r]}
              </button>
            );
          })}
        </div>
      );
    } else if (ans.mode === 'equation') {
      inputs = (
        <input value={typed.v ?? ''} disabled={locked} spellCheck={false} autoComplete="off" aria-label="equation"
          placeholder={ans.form === 'slope' ? 'y = mx + b' : ans.form === 'standard' ? 'Ax + By = C' : 'y = …'}
          onChange={(e) => { setTyped({ v: e.target.value }); setMarks({}); if (msg && !msg.ok) setMsg(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') checkTyped(); }}
          className={`w-full px-3 py-2.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500 disabled:opacity-90 ${RING[marks.v] || 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}`} />
      );
    } else {
      inputs = (
        <div className="flex flex-wrap items-center gap-2">
          {box('v', ans.mode === 'root' ? 'w-36' : 'w-28', ans.mode === 'root' ? '√…' : '?')}
          {ans.mode === 'root' && !locked && (
            <button onClick={() => setTyped((s) => ({ ...s, v: `${s.v || ''}√` }))}
              className="px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-black text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-sky-400">
              {t.rootBtn}
            </button>
          )}
          {ans.mode === 'slope' && (
            <button disabled={locked} onClick={() => { setTyped({ undef: true, v: '' }); setMarks({}); }}
              className={`px-3 py-2 rounded-xl border-2 border-b-[4px] font-black text-xs uppercase tracking-widest ${typed.undef ? (locked && ans.value === null ? RING.good : 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300') : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
              {t.undefinedBtn}
            </button>
          )}
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={t.title} current={idx + 1} total={items.length} lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 flex flex-col lg:flex-row gap-4 items-stretch lg:items-start">

        {/* The grid */}
        <div className="lg:flex-1 min-w-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2 flex justify-center">
          <LinePlane
            grid={grid} unit={UNIT} svgRef={svgRef}
            lines={drawnLines} segments={segments} points={drawnPoints}
            misses={misses} missFlag={!done && isClick ? missFlag : null}
            aim={isClick && !done && !locked ? aim : null} armed={armed} interactive={isClick && !done && !locked}
            onPointerMove={onPointerMove} onPointerUp={onPointerUp}
            onPointerLeave={() => { if (!armed) setAim(null); }} onKeyDown={onKeyDown}
            // Fills the column and scales UP from the viewBox; a tall grid is
            // capped by the viewport and letterboxed, which the CTM-based
            // pointer map (latticeFromEvent) is immune to.
            style={{ width: '100%', height: 'auto', maxHeight: '74vh' }} />
        </div>

        {/* The problem and the step */}
        <div className="lg:w-[400px] shrink-0 flex flex-col gap-3">
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4">
            <div className="text-[11px] font-black uppercase tracking-widest mb-1.5" style={{ color: INK }}>
              {pick(lang, pool?.title, pool?.titleVn) || t.title}
            </div>
            <div className="text-base sm:text-lg font-bold leading-relaxed text-slate-800 dark:text-slate-100">
              <Say text={pick(lang, item.prompt, item.promptVn)} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.steps.map((st, j) => {
                const isDone = j < reached;
                const on = !done && j === stepIdx;
                return (
                  <span key={j} className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black border-2
                    ${isDone ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
                      : on ? 'text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'}`}
                    style={on ? { backgroundColor: INK } : undefined}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : j + 1}
                  </span>
                );
              })}
            </div>
          </div>

          {!done ? (
            <div className="rounded-2xl border-2 shadow-sm p-4 flex flex-col gap-3" style={{ borderColor: SKY, backgroundColor: 'rgba(28,176,246,0.07)' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: SKY }}>
                  {isClick ? (step.kind === 'plot' || step.kind === 'on' ? <Target className="w-5 h-5 text-white" strokeWidth={2.5} /> : <Crosshair className="w-5 h-5 text-white" strokeWidth={2.5} />)
                    : step.kind === 'equation' ? <PenLine className="w-5 h-5 text-white" strokeWidth={2.5} /> : <Keyboard className="w-5 h-5 text-white" strokeWidth={2.5} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {t.step} {stepIdx + 1} {t.of} {item.steps.length}
                    {isClick && need > 1 && <span style={{ color: GREEN }}> · {placed.length}/{need} {t.placedHere}</span>}
                  </div>
                  <div className="font-black text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-snug"><Say text={stepTitle} /></div>
                  {stepSub && <div className="mt-0.5 text-sm font-bold text-slate-500 dark:text-slate-400 leading-snug"><Say text={stepSub} /></div>}
                </div>
              </div>

              {isClick && !locked && (
                <div className="flex items-center justify-between gap-2 rounded-xl bg-white/70 dark:bg-slate-900/50 px-3 py-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <MousePointerClick className="w-4 h-4 shrink-0" strokeWidth={2.5} />{armed ? t.tapAgain : t.aimHint}
                  </span>
                  <span className="font-mono font-black text-lg tabular-nums shrink-0" style={aim ? { color: SKY } : undefined}>
                    {aim ? `(${frText(fr(aim[0]))}, ${frText(fr(aim[1]))})` : <span className="text-slate-300 dark:text-slate-600">(–, –)</span>}
                  </span>
                </div>
              )}

              {inputs}

              {msg?.text && (
                <div className={`flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in
                  ${msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
                    : msg.shown || msg.info ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300'}`}>
                  {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown || msg.info ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
                  <span><Say text={msg.text} /></span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-end gap-2">
                {isClick && armed && aim && !locked && (
                  <button onClick={() => { const p = aim; setArmed(false); setAim(null); place(p); }}
                    className={`px-4 py-3 text-xs text-white bg-[#1CB0F6] border-[#1899D6] ${btn} flex items-center gap-2`}>
                    <Target className="w-4 h-4" strokeWidth={3} />{t.placeBtn}
                  </button>
                )}
                {step.kind === 'meet' && !locked && (
                  <button onClick={pressNever} className={`px-4 py-3 text-xs text-white bg-slate-500 dark:bg-slate-600 border-slate-700 ${btn} flex items-center gap-2`}>
                    <Ban className="w-4 h-4" strokeWidth={3} />{t.never}
                  </button>
                )}
                {!locked && (!isClick || canShowClick) && (
                  <button onClick={showMe} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                    <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.showMe}
                  </button>
                )}
                {!isClick && !locked && (
                  <button onClick={checkTyped} className={`px-5 py-3 text-xs text-white ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>
                )}
                {locked && (
                  // Focused as it appears, so Enter — the key that just checked
                  // the answer — also moves on.
                  <button autoFocus onClick={() => closeStep(dirty)} className={`px-5 py-3 text-xs text-white ${btn} flex items-center gap-1.5`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
                    {t.cont} <ArrowRight className="w-4 h-4" strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 shadow-sm p-4 flex flex-col gap-3" style={{ borderColor: GREEN, backgroundColor: 'rgba(88,204,2,0.10)' }}>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 shrink-0" style={{ color: GREEN }} strokeWidth={2.5} />
                <div className="font-black text-base sm:text-lg text-slate-800 dark:text-slate-100">
                  {itemResult && itemResult.clean === item.steps.length ? t.clean : t.helped}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={nextItem} className={`px-6 py-3 text-sm text-white bg-[#58cc02] border-[#3e7500] ${btn} flex items-center gap-2`}>
                  {idx + 1 < items.length ? t.next : t.finish}<ArrowRight className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />
            {totalClean} / {totalSteps} {t.scoreLine}
          </div>
        </div>
      </div>
    </div>
  );
}

