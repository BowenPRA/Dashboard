import { useMemo, useState } from 'react';
import { Sigma, Construction } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { QuestionCard, StepPanel, DoneCard } from '../components/math/StepKit.jsx';
import QuadGraph from '../components/math/QuadGraph.jsx';
import { NumBox, MathLine, AnswerStrip, AbcChips } from '../components/math/QuadKit.jsx';
import { quadLatex, originalLatex, rootLatex, pmLatex, rLatex, realZeros, factorModel, factoredLatex } from '../utils/quadratic';
import {
  deriveFormulaItem, diagnoseAbc, diagnoseDisc, diagnoseCount, diagnoseRoot, diagnosePlug, diagnoseSolve,
  COUNT_OPTIONS, countOf, rootIsWhole, answerLatex,
} from '../utils/quadFormula';

/* ------------------------------------------------------------------ *
 * FORMULA (QUAD_FORMULA, p95) — the quadratic formula, one piece at a time
 * (ACELLUS ALG_QUAD).
 *
 * Reads unit.quadFormula:
 *   { title, titleVn, levels: { n: { en, vn } }, items: [{ id, level, eq }] }
 * utils/quadFormula.js derives every stage, answer and named slip from `eq`.
 *
 * The stages are the pieces students get wrong when they do it all in one
 * line on a calculator: a, b, c with their signs; the discriminant (where
 * (−7)² and −4ac with a negative c go wrong); what the discriminant SAYS
 * about the number of solutions; the square root, simplified; −b and 2a; and
 * the answers — two numbers, one, or (p ± k√r)/q in lowest terms. The working
 * builds up on the left exactly as it should be written.
 *
 * Marking as Factor It: a second wrong answer (or Show me) fills the stage in
 * and the item pays half; an answer that is equal but not simplified is a
 * nudge, not a mistake. Progress blob: { [itemId]: 1 | 0.5 }, out of 10.
 * ------------------------------------------------------------------ */

const INK = '#db2777';
const INK_DARK = '#9d174d';

const T = {
  en: {
    title: 'The Quadratic Formula', level: 'Level', solved: 'done',
    next: 'Next equation', finish: 'Finish',
    clean: 'Solved with the formula, first time.',
    slipped: 'Done — one wrong turn, and you fixed it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this working into your book',
    question: 'Solve it with the quadratic formula.',
    head: 'Quadratic formula', working: 'Your working', answer: 'Solutions', graph: 'The graph',
    filled: 'It is filled in for you.', or: 'or',
    alsoFactors: 'The discriminant is a perfect square, so this one factors too:',
    how: ['Read a, b, c', 'Work out b² − 4ac', 'Finish the formula'],
    stage: {
      abc: ['a, b, c', 'Read a, b and c', 'Signs go with the numbers.'],
      disc: ['b² − 4ac', 'Work out the discriminant', 'The part under the square root.'],
      count: ['How many?', 'How many solutions?', 'Look at the sign of the discriminant.'],
      root: ['√', 'Take the square root', null],
      plug: ['−b, 2a', 'Fill in −b and 2a', 'The top starts with −b; the bottom is 2a.'],
      solve: ['Answers', 'Finish it', null],
    },
    moved: 'Get 0 on the right first.',
    rootWhole: 'It is a perfect square.',
    rootSimplify: 'Simplify: take the biggest square factor outside.',
    solveTwo: 'Work out + and − separately. Fractions like 1/2 are fine.',
    solveOne: '± √0 changes nothing, so there is one answer.',
    solveIrr: 'Divide every number by their common factor, so it is fully simplified.',
    shownWhy: {
      abc: (m) => `a = ${m.fm.a}, b = ${m.fm.b}, c = ${m.fm.c}.`,
      disc: (m) => `b² − 4ac = ${m.fm.D}.`,
      count: (m) => COUNT_OPTIONS.find((o) => o.id === countOf(m)).en + '.',
      root: (m) => `√${m.fm.D} = ${rootIsWhole(m) ? Math.sqrt(m.fm.D) : `${m.fm.root.k === 1 ? '' : m.fm.root.k}√${m.fm.root.r}`}.`,
      plug: (m) => `−b = ${-m.fm.b} and 2a = ${m.fm.twoA}.`,
      solve: () => 'Here are the answers.',
    },
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  vn: {
    title: 'Công thức nghiệm', level: 'Cấp độ', solved: 'xong',
    next: 'Bài tiếp theo', finish: 'Kết thúc',
    clean: 'Giải bằng công thức đúng ngay lần đầu.',
    slipped: 'Xong — sai một bước, và em đã tự sửa.',
    helped: 'Xong — có một hai bước được chỉ cho em.',
    bookCopy: 'Chép lời giải này vào vở',
    question: 'Giải bằng công thức nghiệm.',
    head: 'Công thức nghiệm', working: 'Lời giải của em', answer: 'Nghiệm', graph: 'Đồ thị',
    filled: 'Đã điền sẵn cho em.', or: 'hoặc',
    alsoFactors: 'Biệt thức là số chính phương, nên bài này cũng phân tích được:',
    how: ['Đọc a, b, c', 'Tính b² − 4ac', 'Hoàn thành công thức'],
    stage: {
      abc: ['a, b, c', 'Đọc a, b và c', 'Dấu đi theo số.'],
      disc: ['b² − 4ac', 'Tính biệt thức', 'Phần nằm dưới dấu căn.'],
      count: ['Bao nhiêu?', 'Có bao nhiêu nghiệm?', 'Nhìn dấu của biệt thức.'],
      root: ['√', 'Lấy căn bậc hai', null],
      plug: ['−b, 2a', 'Điền −b và 2a', 'Tử bắt đầu bằng −b; mẫu là 2a.'],
      solve: ['Nghiệm', 'Hoàn thành', null],
    },
    moved: 'Đưa vế phải về 0 trước.',
    rootWhole: 'Đây là số chính phương.',
    rootSimplify: 'Rút gọn: đưa thừa số chính phương lớn nhất ra ngoài.',
    solveTwo: 'Tính riêng dấu + và dấu −. Phân số như 1/2 cũng được.',
    solveOne: '± √0 không thay đổi gì, nên chỉ có một nghiệm.',
    solveIrr: 'Chia mọi số cho thừa số chung của chúng để rút gọn hoàn toàn.',
    shownWhy: {
      abc: (m) => `a = ${m.fm.a}, b = ${m.fm.b}, c = ${m.fm.c}.`,
      disc: (m) => `b² − 4ac = ${m.fm.D}.`,
      count: (m) => COUNT_OPTIONS.find((o) => o.id === countOf(m)).vn + '.',
      root: (m) => `√${m.fm.D} = ${rootIsWhole(m) ? Math.sqrt(m.fm.D) : `${m.fm.root.k === 1 ? '' : m.fm.root.k}√${m.fm.root.r}`}.`,
      plug: (m) => `−b = ${-m.fm.b} và 2a = ${m.fm.twoA}.`,
      solve: () => 'Đây là các nghiệm.',
    },
    noItems: 'Chưa có câu hỏi', back: 'Quay lại',
  },
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';
const M = ({ children }) => <SafeInlineMath math={children} />;
/** A stacked fraction made of boxes and text. */
function Stack({ top, bottom }) {
  return (
    <span className="inline-flex flex-col items-center align-middle mx-1">
      <span className="flex items-center gap-1 px-1">{top}</span>
      <span className="w-full h-[3px] my-1 rounded-full bg-slate-800 dark:bg-slate-200" />
      <span className="flex items-center gap-1 px-1">{bottom}</span>
    </span>
  );
}

function derive(item) {
  try { return deriveFormulaItem(item); } catch { return null; }
}

export default function QuadFormula({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => derive(it)), [pool]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const t = T[lang] || T.en;
  const pick = (en, vn) => tr(lang, en, vn);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => { const i = items.findIndex((it) => savedData?.[it.id] == null); return i === -1 ? 0 : i; });
  const [at, setAt] = useState(0);
  const [vals, setVals] = useState([]);
  const [badBox, setBadBox] = useState(false);
  const [struck, setStruck] = useState([]);
  const [wrongs, setWrongs] = useState(0);
  const [done, setDone] = useState([]);
  const [shown, setShown] = useState([]);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const m = useMemo(() => derive(item), [item]);

  if (!items.length || !m) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Construction className="w-10 h-10 mb-3" style={{ color: INK }} />
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const stage = m.stages[at];
  const { fm, v } = m;

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = Math.round((cleared / items.length) * 10);
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    return { raw, blob, log: items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 })) };
  };
  const completeItem = (wasHelped) => {
    const next = { ...results, [item.id]: { score: wasHelped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const goNext = () => {
    setPos((p) => p + 1);
    setAt(0); setVals([]); setBadBox(false); setStruck([]); setWrongs(0); setDone([]); setShown([]);
    setHelped(false); setSlipped(false); setMsg(null); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  const advance = (message, wasShown, nowHelped = helped) => {
    setDone([...done, stage]);
    if (wasShown) setShown((s) => [...s, stage]);
    setVals([]); setBadBox(false); setStruck([]); setWrongs(0); setMsg(message);
    if (at + 1 >= m.stages.length) { completeItem(nowHelped || wasShown); return; }
    setAt(at + 1);
  };
  const fillIn = (why) => {
    setHelped(true); setSlipped(true);
    const lead = why ? { en: `${why.en} `, vn: `${why.vn} ` } : { en: '', vn: '' };
    advance({ tone: 'shown', en: `${lead.en}${T.en.shownWhy[stage](m)} ${T.en.filled}`, vn: `${lead.vn}${T.vn.shownWhy[stage](m)} ${T.vn.filled}` }, true, true);
  };
  const judge = (d) => {
    if (!d) return;
    if (d.ok) { advance({ tone: 'ok', en: d.en, vn: d.vn }, false); return; }
    if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
    setSlipped(true);
    if (wrongs + 1 >= 2) { fillIn(d); return; }
    setWrongs(wrongs + 1); setBadBox(true);
    setMsg({ tone: 'bad', en: d.en, vn: d.vn });
  };
  const check = () => {
    switch (stage) {
      case 'abc': return judge(diagnoseAbc(m, [vals[0], vals[1], vals[2]]));
      case 'disc': return judge(diagnoseDisc(m, vals[0]));
      case 'root': return judge(diagnoseRoot(m, vals[0], vals[1]));
      case 'plug': return judge(diagnosePlug(m, vals[0], vals[1]));
      case 'solve': return judge(diagnoseSolve(m, vals));
      default: return null;
    }
  };
  const choose = (id) => {
    if (struck.includes(id)) return;
    const d = diagnoseCount(m, id);
    if (!d.ok) setStruck([...struck, id]);
    judge(d);
  };
  const setVal = (i, x) => { const n = [...vals]; n[i] = x; setVals(n); if (badBox) setBadBox(false); };
  const box = (i, extra = {}) => (
    <NumBox key={`${stage}-${i}`} value={vals[i]} onChange={(x) => setVal(i, x)} onEnter={check} ink={INK} bad={badBox} autoFocus={i === 0} label={`${t.stage[stage][0]} ${i + 1}`} {...extra} />
  );

  /* ---------------------------------------------------------- the working */
  const has = (s) => done.includes(s);
  const { a, b, c, D, twoA } = fm;
  const rootTxt = D > 0 ? (rootIsWhole(m) ? String(Math.sqrt(D)) : rootLatex(fm.root.k, fm.root.r)) : '0';
  const work = [originalLatex(m.an.parsed)];
  if (m.moved) work.push(`${quadLatex(a, b, c, v)} = 0`);
  if (has('abc')) {
    work.push(`a = ${a},\\ \\ b = ${b},\\ \\ c = ${c}`);
    work.push(`${v} = \\dfrac{-(${b}) \\pm \\sqrt{(${b})^{2} - 4(${a})(${c})}}{2(${a})}`);
  }
  if (has('disc')) work.push(`b^{2} - 4ac = ${b * b} ${4 * a * c < 0 ? '+' : '-'} ${Math.abs(4 * a * c)} = ${D}`);
  if (has('count') && D < 0) work.push(`${D} < 0 \\Rightarrow \\text{no real solutions}`);
  if (has('root') && !rootIsWhole(m) && fm.root.k > 1) work.push(`\\sqrt{${D}} = \\sqrt{${fm.root.k ** 2} \\cdot ${fm.root.r}} = ${rootTxt}`);
  if (has('root') || (has('count') && D === 0)) work.push(`${v} = \\dfrac{${-b} \\pm ${rootTxt}}{${twoA}}`);
  if (has('solve')) {
    if (m.solveKind === 'irr' && fm.g > 1) work.push(`${v} = ${pmLatex(fm.reduced)}`);
    else if (m.solveKind === 'two') work.push(`${v} = \\dfrac{${-b} + ${rootTxt}}{${twoA}} = ${rLatex(fm.plus)} \\quad\\text{${t.or}}\\quad ${v} = \\dfrac{${-b} - ${rootTxt}}{${twoA}} = ${rLatex(fm.minus)}`);
    else if (m.solveKind === 'one') work.push(`${v} = ${rLatex(fm.roots[0])}`);
    else work.push(`${v} = ${pmLatex(fm.reduced)}`);
  }

  const pills = m.stages.map((s, k) => ({ key: s, label: t.stage[s][0], state: k < at || itemDone ? (shown.includes(s) ? 'shown' : 'done') : k === at ? 'now' : 'todo' }));
  const levelRaw = pool?.levels?.[item.level];
  const levelName = levelRaw ? pick(levelRaw.en, levelRaw.vn) : null;
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const [, stTitle, stSub0] = t.stage[stage] || [];
  const stSub = stage === 'abc' && m.moved ? `${t.moved} ${stSub0}`
    : stage === 'root' ? (rootIsWhole(m) ? t.rootWhole : t.rootSimplify)
      : stage === 'solve' ? (m.solveKind === 'irr' ? t.solveIrr : m.solveKind === 'one' ? t.solveOne : t.solveTwo) : stSub0;
  const lineCls = 'flex flex-wrap items-center justify-center gap-y-2 text-2xl font-black text-slate-900 dark:text-slate-100 py-1';
  const fac = fm.D >= 0 && rootIsWhole(m) ? factorModel(a, b, c) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pick(pool?.title, pool?.titleVn) || t.title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 lg:items-start">
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <QuestionCard ink={INK} icon={Sigma} head={t.head}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${items.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName} question={t.question}
            big={<div className="overflow-x-auto overflow-y-hidden"><SafeInlineMath math={work[0]} /></div>}
            how={pos === 0 ? t.how : null}>
            <div className="rounded-xl border-2 px-3 py-1.5 text-center text-lg text-slate-700 dark:text-slate-200" style={{ borderColor: `${INK}55`, backgroundColor: `${INK}0a` }}>
              <M>{`${v} = \\dfrac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}`}</M>
            </div>
            {work.length > 1 && !itemDone && (
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.working}</div>
                {work.slice(1).map((l, i) => <MathLine key={i} latex={l} className="text-lg text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-1" />)}
              </div>
            )}
          </QuestionCard>
        </div>

        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <StepPanel ink={INK} lang={lang} steps={pills} n={at + 1} title={stTitle} sub={stSub} msg={msg}
              onShowMe={() => fillIn(null)} onCheck={stage === 'count' ? null : check}>
              {stage === 'abc' && (
                <div className={lineCls}>
                  <span className="inline-flex items-center"><M>a =</M>{box(0, { width: 'w-14' })}</span>
                  <span className="inline-flex items-center ml-3"><M>b =</M>{box(1, { width: 'w-14' })}</span>
                  <span className="inline-flex items-center ml-3"><M>c =</M>{box(2, { width: 'w-14' })}</span>
                </div>
              )}
              {stage === 'disc' && (
                <div className="flex flex-col items-center gap-2">
                  <AbcChips a={a} b={b} c={c} />
                  <div className={lineCls}><M>{`b^{2} - 4ac = (${b})^{2} - 4(${a})(${c}) =`}</M>{box(0, { width: 'w-20' })}</div>
                </div>
              )}
              {stage === 'count' && (
                <div className="flex flex-col gap-2">
                  <div className="text-center text-xl text-slate-800 dark:text-slate-100"><M>{`b^{2} - 4ac = ${D}`}</M></div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {COUNT_OPTIONS.map((o) => (
                      <button key={o.id} type="button" onClick={() => choose(o.id)} disabled={struck.includes(o.id)}
                        className={`px-3 py-3 rounded-xl border-2 border-b-[4px] font-black transition-all
                          ${struck.includes(o.id) ? 'line-through opacity-50 border-slate-200 dark:border-slate-700 text-slate-400' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-pink-300 active:translate-y-[2px] active:border-b-2'}`}>
                        {pick(o.en, o.vn)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {stage === 'root' && (
                <div className={lineCls}>
                  <M>{`\\sqrt{${D}} =`}</M>
                  {rootIsWhole(m) ? box(0) : <>{box(0, { width: 'w-14' })}<M>{'\\sqrt{\\phantom{0}}'}</M>{box(1, { width: 'w-16' })}</>}
                </div>
              )}
              {stage === 'plug' && (
                <div className={lineCls}>
                  <M>{`${v} =`}</M>
                  <Stack top={<>{box(0, { width: 'w-16' })}<M>{`\\pm ${rootTxt}`}</M></>} bottom={box(1, { width: 'w-16' })} />
                </div>
              )}
              {stage === 'solve' && m.solveKind === 'irr' && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl text-slate-700 dark:text-slate-200"><M>{`${v} = \\dfrac{${-b} \\pm ${rootTxt}}{${twoA}}`}</M></div>
                  <div className={lineCls}>
                    <M>{`${v} =`}</M>
                    <Stack top={<>{box(0, { width: 'w-14' })}<M>\pm</M>{box(1, { width: 'w-12' })}<M>{`\\sqrt{${fm.root.r}}`}</M></>} bottom={box(2, { width: 'w-14' })} />
                  </div>
                </div>
              )}
              {stage === 'solve' && m.solveKind !== 'irr' && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl text-slate-700 dark:text-slate-200"><M>{`${v} = \\dfrac{${-b} \\pm ${rootTxt}}{${twoA}}`}</M></div>
                  <div className={lineCls}>
                    <M>{`${v} =`}</M>{box(0, { width: 'w-20' })}
                    {m.solveKind === 'two' && <><span className="mx-2 text-base text-slate-500">{t.or}</span><M>{`${v} =`}</M>{box(1, { width: 'w-20' })}</>}
                  </div>
                </div>
              )}
            </StepPanel>
          )}

          {itemDone && (
            <DoneCard ink={INK} inkDark={INK_DARK} helped={helped} slipped={slipped}
              words={{ clean: t.clean, slipped: t.slipped, helped: t.helped, bookCopy: t.bookCopy, next: t.next, finish: t.finish }}
              shown={msg?.tone === 'shown' ? pick(msg.en, msg.vn) : null}
              isLast={isLast} onNext={isLast ? finish : goNext}>
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 flex flex-col gap-1">
                {work.map((l, i) => <MathLine key={i} latex={l} className="text-lg sm:text-xl text-slate-900 dark:text-slate-100" />)}
              </div>
              <AnswerStrip label={t.answer} latex={answerLatex(m)} ink={D < 0 ? '#f59e0b' : '#58cc02'} />
              {fac?.factors && (
                <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  {t.alsoFactors} <span className="text-lg"><M>{`${factoredLatex(fac, v)} = 0`}</M></span>
                </div>
              )}
              <div className="max-w-sm w-full mx-auto">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.graph}</div>
                <QuadGraph a={a} b={b} c={c} zeros={realZeros(fm)} ink={INK} lang={lang} v={v} />
              </div>
            </DoneCard>
          )}
        </div>
      </div>
    </div>
  );
}
