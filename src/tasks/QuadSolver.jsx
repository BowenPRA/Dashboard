import { useMemo, useRef, useState } from 'react';
import { Calculator, Sparkles, Trophy, CheckCircle2, Circle, CornerDownLeft, Delete } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import QuadGraph from '../components/math/QuadGraph.jsx';
import { SolutionView, AnswerStrip } from '../components/math/QuadKit.jsx';
import { parseEquation, originalLatex } from '../utils/quadratic';
import { solveSteps, challengeMet } from '../utils/quadSolve';

/* ------------------------------------------------------------------ *
 * QUAD SOLVER (QUAD_SOLVER, p96) — type any quadratic, read every step.
 *
 * The student types an equation the way they would on paper ("2x^2 + 7x + 3
 * = 0", "x² = 5x − 6", "(x+2)(x−3) = 0", "y = x^2 − 9", even fractions and
 * decimals) and gets the whole worked solution from utils/quadSolve.js:
 * standard form, a, b, c, the factoring method that fits — with the factor
 * pairs and the grouping written out — or why it does not factor, the zero
 * product property, and the quadratic formula line by line, with a graph
 * that shows the answers as the places the curve crosses the x-axis.
 *
 * It is a tool first: Acellus homework can be checked here, any time. The XP
 * comes from the unit's `quadSolver.challenges` — "find one with no real
 * solutions", "build one whose zeros are 3 and −5" — which can only be met on
 * purpose by a student who knows what makes a quadratic behave that way.
 *
 * Reads unit.quadSolver:
 *   { title, titleVn, examples: ['x^2 + 5x + 6 = 0', …],
 *     challenges: [{ id, type, en, vn, zeros? }] }   (types: utils/quadSolve.js)
 * Progress blob: { done: [challenge ids], recent: [last inputs] }; score out
 * of 10 = the share of challenges met.
 * ------------------------------------------------------------------ */

const INK = '#2563eb';
const INK_DARK = '#1d4ed8';

const T = {
  en: {
    title: 'Quad Solver',
    typeHere: 'Type a quadratic, e.g. 2x^2 + 7x + 3 = 0',
    solve: 'Solve', clear: 'Clear',
    reads: 'I read this as',
    examples: 'Try one of these',
    recent: 'Your recent ones',
    challenges: 'Challenges', challengeSub: 'Find a quadratic that does each of these. Type it in and solve it.',
    met: 'Challenge met!',
    allDone: 'Every challenge met. Keep using the solver for homework any time.',
    finish: 'Save and finish',
    answer: 'Answer', graph: 'The graph',
    tipsHead: 'How to type it',
    tips: ['x^2 or x² for x squared', '− for minus, / for fractions (1/2)', 'Brackets are fine: (x+2)(x−3) = 0', 'Leave out "= 0" and it finds the zeros'],
    empty: 'Type any quadratic and press Solve to see every step — factoring (when it factors), the quadratic formula, and the graph.',
    methodWord: { pair: 'Factors: product–sum', ac: 'Factors: ac method', diff: 'Factors: difference of squares', common: 'Factors: common factor x', roots: 'Square roots', none: 'Does not factor — formula' },
    solutions: (n) => (n === 0 ? 'no real solutions' : n === 1 ? 'one solution' : 'two solutions'),
  },
  vn: {
    title: 'Máy giải phương trình bậc hai',
    typeHere: 'Gõ một phương trình bậc hai, ví dụ 2x^2 + 7x + 3 = 0',
    solve: 'Giải', clear: 'Xóa',
    reads: 'Máy đọc là',
    examples: 'Thử một trong các bài này',
    recent: 'Các bài em vừa gõ',
    challenges: 'Thử thách', challengeSub: 'Tìm một phương trình bậc hai thỏa mỗi yêu cầu. Gõ vào rồi giải.',
    met: 'Hoàn thành thử thách!',
    allDone: 'Đã hoàn thành mọi thử thách. Em vẫn có thể dùng máy giải để làm bài tập bất cứ lúc nào.',
    finish: 'Lưu và kết thúc',
    answer: 'Đáp án', graph: 'Đồ thị',
    tipsHead: 'Cách gõ',
    tips: ['x^2 hoặc x² cho x bình phương', '− cho dấu trừ, / cho phân số (1/2)', 'Dùng ngoặc cũng được: (x+2)(x−3) = 0', 'Bỏ "= 0" thì máy tìm nghiệm của biểu thức'],
    empty: 'Gõ một phương trình bậc hai bất kỳ rồi bấm Giải để xem từng bước — phân tích nhân tử (nếu được), công thức nghiệm và đồ thị.',
    methodWord: { pair: 'Phân tích: tích–tổng', ac: 'Phân tích: phương pháp ac', diff: 'Phân tích: hiệu hai bình phương', common: 'Phân tích: nhân tử chung x', roots: 'Căn bậc hai', none: 'Không phân tích được — dùng công thức' },
    solutions: (n) => (n === 0 ? 'vô nghiệm thực' : n === 1 ? 'một nghiệm' : 'hai nghiệm'),
  },
};

const KEYS = ['x²', 'x', '^', '+', '−', '=', '(', ')', '/'];
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

export default function QuadSolver({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const t = T[lang] || T.en;
  const challenges = useMemo(() => pool?.challenges || [], [pool]);
  const examples = pool?.examples || [];
  const [done, setDone] = useState(() => (Array.isArray(savedData?.done) ? savedData.done.filter((id) => challenges.some((c) => c.id === id)) : []));
  const [recent, setRecent] = useState(() => (Array.isArray(savedData?.recent) ? savedData.recent.slice(0, 6) : []));
  const [openedWith] = useState(done);
  const [text, setText] = useState('');
  const [sol, setSol] = useState(null);
  const [fresh, setFresh] = useState([]);   // challenge ids met by the last solve
  const [ended, setEnded] = useState(false);
  const inputRef = useRef(null);

  const preview = useMemo(() => {
    if (!text.trim()) return null;
    const p = parseEquation(text);
    return p.ok ? originalLatex(p) : null;
  }, [text]);

  const scoreOf = (ids) => (challenges.length ? Math.round((ids.length / challenges.length) * 10) : 10);
  const blobOf = (ids, rec) => ({ done: ids, recent: rec });
  const logOf = (ids) => challenges.map((c) => ({ itemId: c.id, correct: ids.includes(c.id) }));

  const solve = (input = text) => {
    const s = solveSteps(input);
    setSol(s);
    setText(input);
    if (!s.ok) { setFresh([]); return; }
    const rec = [input.trim(), ...recent.filter((r) => r !== input.trim())].slice(0, 6);
    setRecent(rec);
    const newly = challenges.filter((c) => !done.includes(c.id) && challengeMet(c, s)).map((c) => c.id);
    setFresh(newly);
    if (newly.length) {
      const next = [...done, ...newly];
      setDone(next);
      onProgress?.(scoreOf(next), blobOf(next, rec), { items: logOf(next) });
    }
  };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    onComplete?.(scoreOf(done), blobOf(done, recent), { items: logOf(done) });
  };
  const quit = () => (done.length !== openedWith.length ? finish() : onQuit?.());

  const press = (k) => {
    const ins = k === 'x²' ? 'x^2' : k === '−' ? '-' : k;
    const el = inputRef.current;
    if (el && typeof el.selectionStart === 'number') {
      const a = el.selectionStart; const b = el.selectionEnd;
      const next = text.slice(0, a) + ins + text.slice(b);
      setText(next);
      requestAnimationFrame(() => { el.focus(); el.setSelectionRange(a + ins.length, a + ins.length); });
    } else setText(text + ins);
  };

  const title = tr(lang, pool?.title, pool?.titleVn) || t.title;
  const allMet = challenges.length > 0 && done.length === challenges.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={done.length} total={challenges.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-5 lg:items-start">
        {/* left: input + challenges */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Calculator className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90 truncate">{t.title}</div>
            </div>
            <div className="p-3 sm:p-4 flex flex-col gap-2.5">
              <form onSubmit={(e) => { e.preventDefault(); solve(); }} className="flex gap-2">
                <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder={t.typeHere}
                  autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} aria-label={t.typeHere}
                  className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 font-mono text-lg font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 placeholder:text-sm placeholder:font-sans focus:outline-none focus:border-blue-500" />
                <button type="submit" disabled={!text.trim()} className={`px-4 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                  <CornerDownLeft className="w-4 h-4 inline -mt-0.5 mr-1" strokeWidth={3} />{t.solve}
                </button>
              </form>
              <div className="flex flex-wrap gap-1.5">
                {KEYS.map((k) => (
                  <button key={k} type="button" onClick={() => press(k)}
                    className="min-w-[2.4rem] px-2 py-1 rounded-lg border-2 border-b-[3px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono font-black text-slate-700 dark:text-slate-200 active:translate-y-[2px] active:border-b">{k}</button>
                ))}
                <button type="button" onClick={() => { setText(''); setSol(null); setFresh([]); inputRef.current?.focus(); }}
                  className="px-2 py-1 rounded-lg border-2 border-b-[3px] border-slate-200 dark:border-slate-700 text-slate-500 font-black text-xs uppercase tracking-wider"><Delete className="w-4 h-4 inline -mt-0.5" /> {t.clear}</button>
              </div>
              {preview && (
                <div className="rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-3 py-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.reads}</div>
                  <div className="overflow-x-auto overflow-y-hidden text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={preview} /></div>
                </div>
              )}
              {sol && !sol.ok && (
                <div role="status" className="rounded-xl border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 px-3 py-2 text-sm font-bold text-amber-900 dark:text-amber-200">{tr(lang, sol.error.en, sol.error.vn)}</div>
              )}
              {examples.length > 0 && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.examples}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {examples.map((ex) => (
                      <button key={ex} type="button" onClick={() => solve(ex)}
                        className="px-2.5 py-1 rounded-lg border-2 border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 font-mono text-sm font-bold text-blue-800 dark:text-blue-200 hover:border-blue-300">{ex}</button>
                    ))}
                  </div>
                </div>
              )}
              {recent.length > 0 && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.recent}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {recent.map((ex) => (
                      <button key={ex} type="button" onClick={() => solve(ex)}
                        className="px-2.5 py-1 rounded-lg border-2 border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300">{ex}</button>
                    ))}
                  </div>
                </div>
              )}
              <details className="text-xs font-bold text-slate-500 dark:text-slate-400">
                <summary className="cursor-pointer select-none font-black uppercase tracking-widest text-[10px]">{t.tipsHead}</summary>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">{t.tips.map((x) => <li key={x}>{x}</li>)}</ul>
              </details>
            </div>
          </div>

          {challenges.length > 0 && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
                <div className="font-black text-slate-900 dark:text-slate-100">{t.challenges}</div>
                <div className="ml-auto text-xs font-black text-slate-400">{done.length} / {challenges.length}</div>
              </div>
              <p className="mt-0.5 mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">{t.challengeSub}</p>
              <ul className="flex flex-col gap-1.5">
                {challenges.map((c) => {
                  const isDone = done.includes(c.id);
                  const isFresh = fresh.includes(c.id);
                  return (
                    <li key={c.id} className={`flex items-start gap-2 rounded-xl px-2.5 py-1.5 text-sm font-bold leading-snug border-2 transition-colors
                      ${isFresh ? 'border-[#58cc02] bg-[#effbe5] text-[#2f5d00] dark:bg-lime-950/40 dark:text-lime-200 animate-in zoom-in-95 duration-300'
                        : isDone ? 'border-transparent text-slate-400 dark:text-slate-500' : 'border-transparent text-slate-700 dark:text-slate-200'}`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#58cc02]" strokeWidth={3} /> : <Circle className="w-4 h-4 shrink-0 mt-0.5 text-slate-300" strokeWidth={3} />}
                      <span className={isDone && !isFresh ? 'line-through decoration-2' : ''}>{tr(lang, c.en, c.vn)}</span>
                    </li>
                  );
                })}
              </ul>
              {allMet && (
                <div className="mt-3 flex flex-col gap-2">
                  <p className="text-sm font-bold text-[#2f5d00] dark:text-lime-300">{t.allDone}</p>
                  <button type="button" onClick={finish} className={`self-end px-5 py-2.5 text-white text-sm ${btn}`} style={{ backgroundColor: '#58cc02', borderColor: '#46a302' }}>{t.finish}</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* right: the solution */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!sol?.ok && (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-blue-400" strokeWidth={2} />
              <p className="font-bold text-slate-500 dark:text-slate-400">{t.empty}</p>
            </div>
          )}
          {sol?.ok && (
            <>
              {fresh.length > 0 && (
                <div role="status" className="flex items-center gap-2 rounded-xl border-2 border-[#58cc02] bg-[#effbe5] dark:bg-lime-950/40 px-3 py-2 font-black text-[#2f5d00] dark:text-lime-200 animate-in fade-in slide-in-from-top-1">
                  <Trophy className="w-5 h-5" strokeWidth={2.5} /> {t.met} {fresh.map((id) => tr(lang, challenges.find((c) => c.id === id)?.en, challenges.find((c) => c.id === id)?.vn)).join(' · ')}
                </div>
              )}
              <div className="rounded-2xl border-2 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 flex flex-col gap-3" style={{ borderColor: INK }}>
                <div className="overflow-x-auto overflow-y-hidden text-2xl sm:text-3xl text-center text-slate-900 dark:text-slate-100 py-1"><SafeInlineMath math={sol.eqLatex} /></div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">{t.methodWord[sol.family] || t.methodWord.none}</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">b² − 4ac = {sol.D < 0 ? `−${-sol.D}` : sol.D} → {t.solutions(sol.answer.count)}</span>
                </div>
                <AnswerStrip label={t.answer} latex={sol.answer.latex} ink={sol.answer.count ? '#58cc02' : '#f59e0b'}
                  sub={tr(lang, sol.answer.en, sol.answer.vn)} />
                {sol.factored && (
                  <div className="text-center text-lg text-slate-700 dark:text-slate-200 overflow-x-auto overflow-y-hidden">
                    <SafeInlineMath math={`${sol.factored} = 0`} />
                  </div>
                )}
                <div className="max-w-md w-full mx-auto">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.graph}</div>
                  <QuadGraph {...sol.graph} v={sol.v} ink={INK} lang={lang} />
                </div>
              </div>
              <SolutionView sections={sol.sections} lang={lang} ink={INK} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
