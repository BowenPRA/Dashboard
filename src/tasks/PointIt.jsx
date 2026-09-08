import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MousePointerClick, CheckCircle2, XCircle, ArrowRight, Trophy, Construction, Target, Eye,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { checkAll, gradeClick, regionById, rectOf, viewBoxOf } from '../utils/pointIt';

/* ------------------------------------------------------------------ *
 * POINT IT — "Click the address bar."
 *
 * The identification item this course cannot do without. An authored picture of
 * an application window fills the pane, and the student is asked to point at one
 * part of it. The mark is DERIVED from which region the click landed in
 * (src/utils/pointIt.js) — nothing is stored but `target`, a region id — so the
 * same rule that governs Number Gym, Graph It, Equations and Energy Diagrams
 * governs this too.
 *
 * WHY A WRONG CLICK IS THE LESSON. A bare red X teaches nothing. Every region
 * carries a `label`, and the ones a student reliably confuses carry a `misfire`
 * sentence, so a miss comes back as "that is the search box inside the page —
 * the address bar is at the very top". That one sentence is the entire fix for
 * the address-bar-vs-search-box confusion, which is the single most common
 * thing an eight-to-eleven-year-old gets wrong about a browser.
 *
 * Reads a unit's `pointIt` array:
 *   {
 *     id: 'browser-anatomy',
 *     svg: '<svg …>',              // authored, house style per docs/svg-diagrams.md
 *     viewBox: '0 0 800 500',      // must match the svg's own viewBox
 *     title, titleVn,              // optional caption above the picture
 *     regions: [
 *       { id, rect: [x, y, w, h], label, labelVn, misfire?, misfireVn? },
 *     ],
 *
 * A region's `label` is spoken back to the student ("Yes — that is <label>."), so
 * it carries its own article: 'the address bar', 'a link', but 'Shut down' for a
 * button whose name is the label.
 *     prompts: [ { ask, askVn, target } ],   // target is a region id
 *   }
 *
 * Regions may NEST — a search box inside a page inside a window — and the
 * smallest one containing the click wins. Partial overlaps are an authoring bug
 * and `checkItem` refuses them.
 *
 * HIT TESTING goes through the overlay svg's getScreenCTM(), not through
 * getBoundingClientRect() ratios, for the reason Graph It documents: the picture
 * is letterboxed inside its box whenever the element's aspect ratio disagrees
 * with the viewBox, and a ratio map lands the click somewhere the student did
 * not aim. The overlay carries the item's own viewBox and sits exactly on the
 * picture, so its CTM is the picture's transform.
 *
 * SCORING. Two attempts per prompt, then the answer is revealed and the run
 * moves on — a nine-year-old quits at a wall, so nothing here ends the task.
 * A prompt found within its two attempts scores 1. XP = prompts right / total,
 * scaled from nativeMax 10 to the unit's maxXP.
 * ------------------------------------------------------------------ */

const SKY = '#0ea5e9';
const SKY_DARK = '#0369a1';
const GREEN = '#58cc02';
const GREEN_DARK = '#3e7500';
const RED = '#ff4b4b';

const ATTEMPTS = 2;

const EN = {
  title: 'Find It',
  prompt: 'Prompt',
  of: 'of',
  found: 'found',
  hint: 'Tap the part of the picture the question asks for.',
  // No article here: a region's `label` carries its own, because "Shut down" and
  // "the address bar" cannot both follow one fixed prefix.
  right: 'Yes — that is',
  tryAgain: 'Not that one. Try again.',
  thatIs: 'That is',
  offWindow: 'That is the background, not part of the window.',
  revealed: 'Here it is —',
  lastTry: 'One more try.',
  next: 'Next',
  finish: 'Finish',
  empty: 'Nothing to point at yet',
  back: 'Return to Dashboard',
  broken: 'This activity has an authoring problem',
};

const VN = {
  title: 'Tìm Đúng Chỗ',
  prompt: 'Câu',
  of: 'trên',
  found: 'đúng',
  hint: 'Chạm vào phần của hình mà câu hỏi yêu cầu.',
  right: 'Đúng rồi — đó là',
  tryAgain: 'Chưa đúng. Thử lại nhé.',
  thatIs: 'Đó là',
  offWindow: 'Đó là nền, không phải một phần của cửa sổ.',
  revealed: 'Đây rồi — chính là',
  lastTry: 'Còn một lần thử.',
  next: 'Tiếp theo',
  finish: 'Kết thúc',
  empty: 'Chưa có hình nào để chỉ',
  back: 'Về Bảng Điều Khiển',
  broken: 'Hoạt động này có lỗi soạn nội dung',
};

/** A card that says the task is empty or broken, rather than a blank screen. */
function Placeholder({ icon: Icon, tone, heading, detail, onQuit, back }) {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${tone}1f` }}>
        <Icon className="w-8 h-8" style={{ color: tone }} strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{heading}</h2>
      {detail && (
        <pre className="max-w-xl text-left text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-pre-wrap">{detail}</pre>
      )}
      <button
        onClick={onQuit}
        className="mt-6 px-6 py-3 bg-[#0ea5e9] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#0369a1] active:border-b-0 active:translate-y-[4px]">
        {back}
      </button>
    </div>
  );
}

export default function PointIt({ pool, onComplete, onQuit }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : pool?.items || []), [pool]);

  /**
   * Author-time guard. `checkAll` is the same function the content validator
   * runs, so a problem that survives to here means the data changed after the
   * last `npm run validate`. In dev that throws, because a prompt whose target
   * names no region is invisible from reading the data and must not be shrugged
   * off; in a student's browser it is logged and the bad prompt is dropped, so a
   * typo cannot present a question that has no correct answer.
   */
  const problems = useMemo(() => checkAll(items), [items]);
  if (problems.length && import.meta.env.DEV) {
    throw new Error(`POINT_IT authoring problems:\n  ${problems.join('\n  ')}`);
  }

  // Prompts are worked one at a time, flattened across items: an item is a
  // picture, and one picture is usually worth asking about three or four times.
  const steps = useMemo(
    () =>
      items.flatMap((item, i) =>
        (item.prompts || [])
          .filter((prompt) => !!regionById(item, prompt.target))
          .map((prompt, j) => ({ key: `${item.id || i}-${j}`, item, prompt }))
      ),
    [items]
  );

  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [tries, setTries] = useState(0);
  const [shot, setShot] = useState(null);      // { x, y, hit, correct } — the last click
  const [results, setResults] = useState({});  // step key -> boolean
  const [ended, setEnded] = useState(false);
  const svgRef = useRef(null);

  // Production only — DEV threw above. Logged from an effect rather than during
  // render so the render stays pure.
  useEffect(() => {
    if (problems.length) console.error(`[POINT_IT] ${problems.length} authoring problem(s):\n  ${problems.join('\n  ')}`);
  }, [problems]);

  const t = lang === 'vn' ? VN : EN;

  if (problems.length && !steps.length) {
    return (
      <Placeholder icon={XCircle} tone={RED} heading={t.broken} detail={problems.join('\n')} onQuit={onQuit} back={t.back} />
    );
  }
  if (!steps.length) {
    return <Placeholder icon={Construction} tone={SKY} heading={t.empty} onQuit={onQuit} back={t.back} />;
  }

  const step = steps[idx];
  const { item, prompt } = step;
  const vb = viewBoxOf(item) || { x: 0, y: 0, w: 100, h: 100 };
  const target = regionById(item, prompt.target);
  const isLast = idx >= steps.length - 1;

  const settled = shot?.correct === true || tries >= ATTEMPTS;
  const revealed = settled && !shot?.correct;
  const clearedCount = Object.values(results).filter(Boolean).length;

  const pick = (label, labelVn) => (lang === 'vn' && labelVn ? labelVn : label);

  /**
   * Pointer position -> viewBox coordinates, through the transform the browser
   * really used. Returns null if the svg cannot report one.
   */
  const pointToView = (e) => {
    const svg = svgRef.current;
    if (!svg || typeof svg.getScreenCTM !== 'function') return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    let pt;
    if (typeof svg.createSVGPoint === 'function') {
      pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
    } else if (typeof DOMPoint === 'function') {
      pt = new DOMPoint(e.clientX, e.clientY);
    } else {
      return null;
    }
    const loc = pt.matrixTransform(ctm.inverse());
    return { x: loc.x, y: loc.y };
  };

  const handleClick = (e) => {
    if (settled) return;
    const at = pointToView(e);
    if (!at) return;
    const { hit, correct } = gradeClick(item, prompt, at.x, at.y);
    const used = tries + 1;
    setShot({ ...at, hit, correct });
    setTries(used);
    // Right on either attempt scores the prompt; the second try costs nothing
    // but the chance to be quick, which is the right trade at this age.
    if (correct || used >= ATTEMPTS) setResults((r) => ({ ...r, [step.key]: !!correct }));
  };

  const next = () => { setIdx((i) => i + 1); setTries(0); setShot(null); };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const correct = Object.values(results).filter(Boolean).length;
    const raw = steps.length ? Math.round((correct / steps.length) * 10) : 0;
    const log = steps.map((s) => ({
      itemId: s.item.id,
      prompt: s.prompt.ask,
      target: s.prompt.target,
      correct: !!results[s.key],
    }));
    onComplete?.(raw, null, { items: log });
  };

  // What the feedback bar says. A named miss is the whole point of the task, so
  // a region's own `misfire` sentence wins over the generic "that is the …".
  let tone = SKY;
  let message = t.hint;
  if (shot?.correct) {
    tone = GREEN;
    message = `${t.right} ${pick(shot.hit.label, shot.hit.labelVn)}.`;
  } else if (revealed) {
    tone = RED;
    message = `${t.revealed} ${pick(target.label, target.labelVn)}.`;
  } else if (shot) {
    tone = RED;
    message = shot.hit
      ? pick(shot.hit.misfire, shot.hit.misfireVn)
        || `${t.thatIs} ${pick(shot.hit.label, shot.hit.labelVn)}. ${t.lastTry}`
      : `${t.offWindow} ${t.lastTry}`;
  }

  const targetRect = target ? rectOf(target) : null;
  const hitRect = shot?.hit ? rectOf(shot.hit) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={onQuit}
        modeTitle={t.title}
        current={idx + 1}
        total={steps.length}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      <div className="flex-1 w-full max-w-3xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2"
            style={{ borderColor: SKY, backgroundColor: `${SKY}14` }}>
            <MousePointerClick className="w-4 h-4" style={{ color: SKY_DARK }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">
              {t.prompt} {idx + 1} {t.of} {steps.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
            <Target className="w-3.5 h-3.5" strokeWidth={3} /> {clearedCount} / {steps.length} {t.found}
          </div>
        </div>

        {/* the question */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-5 py-4 text-center">
          {(item.title || item.titleVn) && (
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
              {pick(item.title, item.titleVn)}
            </div>
          )}
          <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 leading-snug">
            {pick(prompt.ask, prompt.askVn)}
          </div>
        </div>

        {/* the interface. The authored picture and the click overlay share one
            viewBox and one box, so the overlay's CTM is the picture's. */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm"
          style={{ aspectRatio: `${vb.w} / ${vb.h}` }}>
          <div
            className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: item.svg }} />
          <svg
            ref={svgRef}
            viewBox={item.viewBox}
            preserveAspectRatio="xMidYMid meet"
            onClick={handleClick}
            className={`absolute inset-0 w-full h-full touch-manipulation ${settled ? '' : 'cursor-pointer'}`}>
            {/* full-bleed catcher: a click on bare background must be gradeable
                too, so the student can be told they missed the window entirely */}
            <rect x={vb.x} y={vb.y} width={vb.w} height={vb.h} fill="transparent" />
            {/* the miss, ringed where it landed */}
            {hitRect && shot && !shot.correct && !revealed && (
              <rect x={hitRect.x} y={hitRect.y} width={hitRect.w} height={hitRect.h}
                fill={`${RED}1a`} stroke={RED} strokeWidth="3" strokeDasharray="8 6" rx="6" pointerEvents="none" />
            )}
            {/* the answer: green when they found it, red-ringed when revealed */}
            {targetRect && settled && (
              <rect x={targetRect.x} y={targetRect.y} width={targetRect.w} height={targetRect.h}
                fill={shot?.correct ? `${GREEN}26` : `${RED}1f`}
                stroke={shot?.correct ? GREEN : RED} strokeWidth="4" rx="6" pointerEvents="none" />
            )}
          </svg>
        </div>

        {/* feedback */}
        <div className="flex items-start gap-2 rounded-xl border-2 p-3"
          style={{ borderColor: tone, backgroundColor: `${tone}14` }}>
          {shot?.correct
            ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GREEN_DARK }} strokeWidth={2.5} />
            : revealed
              ? <Eye className="w-5 h-5 shrink-0 mt-0.5" style={{ color: RED }} strokeWidth={2.5} />
              : shot
                ? <XCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: RED }} strokeWidth={2.5} />
                : <MousePointerClick className="w-5 h-5 shrink-0 mt-0.5" style={{ color: SKY_DARK }} strokeWidth={2.5} />}
          <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{message}</div>
        </div>

        {/* actions */}
        <div className="flex items-center justify-end gap-3">
          {settled && (isLast ? (
            <button onClick={finish}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-4 h-4" strokeWidth={3} /> {t.finish}
            </button>
          ) : (
            <button onClick={next}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#0ea5e9] border-b-[4px] border-[#0369a1] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              {t.next} <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
