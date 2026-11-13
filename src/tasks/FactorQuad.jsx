import { useMemo, useState } from 'react';
import { Puzzle, Construction } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { QuestionCard, StepPanel, DoneCard } from '../components/math/StepKit.jsx';
import FactorPairs from '../components/math/FactorPairs.jsx';
import QuadGraph from '../components/math/QuadGraph.jsx';
import { NumBox, MathLine, AnswerStrip } from '../components/math/QuadKit.jsx';
import { binLatex, coefX, factoredLatex, rVal, signed, originalLatex } from '../utils/quadratic';
import {
  deriveFactorItem, innerLatex, fullLatex, diagnoseStandard, diagnoseGcf, diagnoseTarget, diagnosePair, diagnoseSplit,
  groupingFor, diagnoseGroup, diagnoseSquares, diagnoseXout, diagnoseFactors, diagnoseZeros, zerosLatex,
} from '../utils/quadFactor';

/* ------------------------------------------------------------------ *
 * FACTOR IT (FACTOR_QUAD, p94) — factor a quadratic and solve it, one
 * written line at a time (ACELLUS ALG_QUAD).
 *
 * Reads unit.factorQuad:
 *   { title, titleVn, levels: { n: { en, vn } }, items: [{ id, level, eq }] }
 * utils/quadFactor.js derives every stage, answer and named slip from `eq`.
 *
 * The working builds up on the left as each stage is done — exactly the lines
 * a student should have in their notebook — and the stage in hand sits on the
 * right in StepKit's frame (numbered pills, the note about the last step
 * above, the feedback on this one below). The factor-pair table is the same
 * one the deck uses: tap pairs until one adds to b.
 *
 * Marking: a wrong answer is named and can be tried again; a second wrong one
 * (or Show me) fills the stage in and the item pays half. Turning over a
 * wrong factor pair is NOT a mistake — checking pairs is the method. The
 * brackets are marked by multiplying them out, so any correct factorisation
 * counts. Progress blob: { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';

const T = {
  en: {
    title: 'Factor It', level: 'Level', solved: 'done',
    next: 'Next quadratic', finish: 'Finish',
    clean: 'Factored and solved, first time.',
    slipped: 'Done — one wrong turn, and you fixed it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this working into your book',
    question: 'Factor it, then solve.',
    head: { pair: 'Product–sum', ac: 'The ac method', diff: 'Difference of squares', common: 'Common factor' },
    working: 'Your working',
    answer: 'Solutions', graph: 'Where the graph crosses the x-axis',
    filled: 'It is filled in for you.',
    or: 'or',
    stage: {
      standard: ['Standard form', 'Get 0 on one side', 'Write it as ax² + bx + c = 0. Type a, b and c.'],
      gcf: ['Common factor', 'Take out the common factor', 'What is the biggest number that divides every term?'],
      target: ['Target', 'What are you looking for?', null],
      pair: ['Find the pair', 'Find the two numbers', 'Tap pairs until one adds to the right number.'],
      split: ['Split', 'Split the middle term', 'Use your two numbers as the two middle terms.'],
      group: ['Group', 'Factor each group', 'Take the common factor out of each bracket.'],
      squares: ['Squares', 'What is being squared?', 'Write each term as something squared.'],
      xout: ['Take out x', 'Take x out', 'Every term has an x. Divide each one by x.'],
      factors: ['Brackets', 'Write the brackets', 'Type a sign and a number in each box, like −3 or +4.'],
      zeros: ['Zeros', 'Set each bracket equal to 0', 'Solve each bracket. Fractions like −1/2 are fine.'],
    },
    targetSubPair: 'Two numbers that multiply to c and add to b.',
    targetSubAc: 'a is not 1: the numbers multiply to a × c and add to b.',
    multiplyTo: 'multiply to', addTo: 'add to',
    how: { pair: ['Find the two numbers', 'Write the brackets', 'Solve each bracket'], ac: ['Multiply a × c', 'Split and group', 'Solve each bracket'], diff: ['Spot the squares', 'Write the brackets', 'Solve each bracket'], common: ['Take out x', 'Solve each part'] },
    shownWhy: {
      standard: (m) => `Standard form: ${txt(fullLatex(m))} = 0.`,
      gcf: (m) => `The greatest common factor is ${m.fac.g}.`,
      target: (m) => (m.fam === 'ac' ? `Multiply to a × c = ${m.product}, add to b = ${m.sum}.` : `Multiply to ${m.product}, add to ${m.sum}.`),
      pair: (m) => `${m.fac.pair.m} and ${m.fac.pair.n}: they multiply to ${m.product} and add to ${m.sum}.`,
      split: (m) => `Split ${coefX(m.sum)} into ${coefX(m.fac.pair.m)} and ${coefX(m.fac.pair.n)}.`,
      group: () => 'Take the common factor out of each group.',
      squares: (m) => `(${coefX(m.fac.sa)})² − ${m.fac.sc}².`,
      xout: (m) => `x(${txt(binLatex(m.fac.A, m.fac.B))}).`,
      factors: (m) => `${txt(factoredLatex({ ...m.fac, g: 1 }))}.`,
      zeros: (m) => `${txt(zerosLatex(m))}.`,
    },
    workPair: (m) => `\\text{multiply to } ${m.product},\\ \\text{add to } ${m.sum}:\\ \\ ${m.fac.pair.m} \\text{ and } ${m.fac.pair.n}`,
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  vn: {
    title: 'Phân tích nhân tử', level: 'Cấp độ', solved: 'xong',
    next: 'Bài tiếp theo', finish: 'Kết thúc',
    clean: 'Phân tích và giải đúng ngay lần đầu.',
    slipped: 'Xong — sai một bước, và em đã tự sửa.',
    helped: 'Xong — có một hai bước được chỉ cho em.',
    bookCopy: 'Chép lời giải này vào vở',
    question: 'Phân tích thành nhân tử, rồi giải.',
    head: { pair: 'Tích–tổng', ac: 'Phương pháp ac', diff: 'Hiệu hai bình phương', common: 'Nhân tử chung' },
    working: 'Lời giải của em',
    answer: 'Nghiệm', graph: 'Nơi đồ thị cắt trục x',
    filled: 'Đã điền sẵn cho em.',
    or: 'hoặc',
    stage: {
      standard: ['Dạng chuẩn', 'Đưa một vế về 0', 'Viết về dạng ax² + bx + c = 0. Gõ a, b và c.'],
      gcf: ['Nhân tử chung', 'Đặt nhân tử chung ra ngoài', 'Số lớn nhất chia hết mọi hạng tử là gì?'],
      target: ['Mục tiêu', 'Em đang tìm gì?', null],
      pair: ['Tìm cặp số', 'Tìm hai số', 'Chạm vào các cặp cho đến khi tổng đúng.'],
      split: ['Tách', 'Tách hạng tử giữa', 'Dùng hai số vừa tìm làm hai hạng tử giữa.'],
      group: ['Nhóm', 'Phân tích từng nhóm', 'Đặt nhân tử chung của mỗi ngoặc ra ngoài.'],
      squares: ['Bình phương', 'Cái gì được bình phương?', 'Viết mỗi hạng tử dưới dạng bình phương.'],
      xout: ['Đặt x', 'Đặt x ra ngoài', 'Hạng tử nào cũng có x. Chia mỗi hạng tử cho x.'],
      factors: ['Hai ngoặc', 'Viết hai ngoặc', 'Gõ dấu và số vào mỗi ô, ví dụ −3 hoặc +4.'],
      zeros: ['Nghiệm', 'Cho mỗi ngoặc bằng 0', 'Giải từng ngoặc. Phân số như −1/2 cũng được.'],
    },
    targetSubPair: 'Hai số có tích bằng c và tổng bằng b.',
    targetSubAc: 'a khác 1: hai số có tích bằng a × c và tổng bằng b.',
    multiplyTo: 'tích bằng', addTo: 'tổng bằng',
    how: { pair: ['Tìm hai số', 'Viết hai ngoặc', 'Giải từng ngoặc'], ac: ['Tính a × c', 'Tách và nhóm', 'Giải từng ngoặc'], diff: ['Nhận ra bình phương', 'Viết hai ngoặc', 'Giải từng ngoặc'], common: ['Đặt x ra ngoài', 'Giải từng phần'] },
    shownWhy: {
      standard: (m) => `Dạng chuẩn: ${txt(fullLatex(m))} = 0.`,
      gcf: (m) => `Nhân tử chung lớn nhất là ${m.fac.g}.`,
      target: (m) => (m.fam === 'ac' ? `Tích bằng a × c = ${m.product}, tổng bằng b = ${m.sum}.` : `Tích bằng ${m.product}, tổng bằng ${m.sum}.`),
      pair: (m) => `${m.fac.pair.m} và ${m.fac.pair.n}: tích bằng ${m.product} và tổng bằng ${m.sum}.`,
      split: (m) => `Tách ${coefX(m.sum)} thành ${coefX(m.fac.pair.m)} và ${coefX(m.fac.pair.n)}.`,
      group: () => 'Đặt nhân tử chung của mỗi nhóm ra ngoài.',
      squares: (m) => `(${coefX(m.fac.sa)})² − ${m.fac.sc}².`,
      xout: (m) => `x(${txt(binLatex(m.fac.A, m.fac.B))}).`,
      factors: (m) => `${txt(factoredLatex({ ...m.fac, g: 1 }))}.`,
      zeros: (m) => `${txt(zerosLatex(m))}.`,
    },
    workPair: (m) => `\\text{tích } ${m.product},\\ \\text{tổng } ${m.sum}:\\ \\ ${m.fac.pair.m} \\text{ và } ${m.fac.pair.n}`,
    noItems: 'Chưa có câu hỏi', back: 'Quay lại',
  },
};

/** LaTeX → readable text for a sentence: x^{2} → x², \left( → (. */
function txt(latex) {
  return String(latex).replace(/\\left|\\right/g, '').replace(/\^\{2\}/g, '²').replace(/\\quad\\text\{or\}\\quad/g, ' or ')
    .replace(/\\frac\{(-?\d+)\}\{(\d+)\}/g, '$1/$2').replace(/-\\frac/g, '-').replace(/\\/g, '').replace(/-/g, '−');
}
/** A bit of LaTeX inline in a line of boxes. */
const M = ({ children }) => <SafeInlineMath math={children} />;
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';

function derive(item) {
  try { return deriveFactorItem(item); } catch { return null; }
}

export default function FactorQuad({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
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
  const [wrongs, setWrongs] = useState(0);
  const [tried, setTried] = useState([]);
  const [split, setSplit] = useState(null);       // the grouping for the student's split order
  const [done, setDone] = useState([]);           // stage keys finished (with 'shown' marks)
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
  const v = m.v;

  /* ---------------------------------------------------------- saving */
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
    setAt(0); setVals([]); setBadBox(false); setWrongs(0); setTried([]); setSplit(null); setDone([]); setShown([]);
    setHelped(false); setSlipped(false); setMsg(null); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- moving on */
  const advance = (message, wasShown, nowHelped = helped) => {
    const nextDone = [...done, stage];
    setDone(nextDone);
    if (wasShown) setShown((s) => [...s, stage]);
    setVals([]); setBadBox(false); setWrongs(0); setMsg(message);
    if (at + 1 >= m.stages.length) { completeItem(nowHelped || wasShown); return; }
    setAt(at + 1);
  };
  const fillIn = (why) => {
    setHelped(true); setSlipped(true);
    if (stage === 'split') setSplit(groupingFor(m, m.fac.pair.m, m.fac.pair.n));
    const sw = { en: T.en.shownWhy[stage](m), vn: T.vn.shownWhy[stage](m) };
    const lead = why ? { en: `${why.en} `, vn: `${why.vn} ` } : { en: '', vn: '' };
    advance({ tone: 'shown', en: `${lead.en}${sw.en} ${T.en.filled}`, vn: `${lead.vn}${sw.vn} ${T.vn.filled}` }, true, true);
  };

  const groupingNow = split || m.fac.grouping;
  const diagnose = () => {
    switch (stage) {
      case 'standard': return diagnoseStandard(m, [0, 1, 2].map((i) => vals[i]));
      case 'gcf': return diagnoseGcf(m, vals[0]);
      case 'target': return diagnoseTarget(m, vals[0], vals[1]);
      case 'split': return diagnoseSplit(m, vals[0], vals[1]);
      case 'group': return diagnoseGroup(m, groupingNow, vals[0], vals[1]);
      case 'squares': return diagnoseSquares(m, vals[0], vals[1]);
      case 'xout': return diagnoseXout(m, vals[0], vals[1]);
      case 'factors': return diagnoseFactors(m, vals);
      case 'zeros': return diagnoseZeros(m, vals);
      default: return null;
    }
  };
  const check = () => {
    const d = diagnose();
    if (!d) return;
    if (d.ok) {
      if (stage === 'split') {
        const a = Number(String(vals[0]).replace('−', '-')); const b = Number(String(vals[1]).replace('−', '-'));
        setSplit(groupingFor(m, a, b) || groupingFor(m, m.fac.pair.m, m.fac.pair.n));
      }
      advance({ tone: 'ok', en: d.en, vn: d.vn }, false);
      return;
    }
    if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
    setSlipped(true);
    if (wrongs + 1 >= 2) { fillIn(d); return; }
    setWrongs(wrongs + 1); setBadBox(true);
    setMsg({ tone: 'bad', en: d.en, vn: d.vn });
  };
  const onPair = (row) => {
    if (!tried.includes(row.key)) setTried([...tried, row.key]);
    const d = diagnosePair(m, row);
    if (d.ok) { advance({ tone: 'ok', en: d.en, vn: d.vn }, false); return; }
    setMsg({ tone: 'info', en: d.en, vn: d.vn });
  };
  const setVal = (i, x) => { const n = [...vals]; n[i] = x; setVals(n); if (badBox) setBadBox(false); };
  const box = (i, extra = {}) => (
    <NumBox key={`${stage}-${i}`} value={vals[i]} onChange={(x) => setVal(i, x)} onEnter={check} ink={INK} bad={badBox} autoFocus={i === 0} label={`${t.stage[stage][0]} ${i + 1}`} {...extra} />
  );

  /* ---------------------------------------------------------- the working, line by line */
  const f = m.fac;
  const g = f.g > 1 ? String(f.g) : '';
  const work = [];
  work.push(m.std.moved ? originalLatex(m.an.parsed) : `${fullLatex(m)} = 0`);
  const has = (s) => done.includes(s);
  if (has('standard')) work.push(`${fullLatex(m)} = 0`);
  if (has('gcf')) work.push(`${f.g}\\left(${innerLatex(m)}\\right) = 0`);
  if (has('pair') || (has('target') && !m.stages.includes('pair'))) work.push(t.workPair(m));
  if (has('split')) work.push(`${g}${g ? '\\left(' : ''}${coefX(f.A, v)}^{2} ${groupingNow.m < 0 ? '-' : '+'} ${coefX(Math.abs(groupingNow.m), v)} ${groupingNow.n < 0 ? '-' : '+'} ${coefX(Math.abs(groupingNow.n), v)} ${signed(f.C)}${g ? '\\right)' : ''} = 0`);
  if (has('group')) {
    const gr = groupingNow; const bin = binLatex(gr.P, gr.Q, v);
    work.push(`${g}${g ? '\\left[' : ''}${gr.g1 === 1 ? v : `${gr.g1}${v}`}\\left(${bin}\\right) ${gr.g2 < 0 ? `- ${-gr.g2}` : `+ ${gr.g2}`}\\left(${bin}\\right)${g ? '\\right]' : ''} = 0`);
  }
  if (has('squares')) work.push(`${g}${g ? '\\left[' : ''}\\left(${coefX(f.sa, v)}\\right)^{2} - ${f.sc}^{2}${g ? '\\right]' : ''} = 0`);
  if (has('xout') || has('factors')) work.push(`${factoredLatex(f, v)} = 0`);
  if (has('zeros')) work.push(zerosLatex(m));

  const pills = m.stages.map((s, k) => ({ key: s, label: t.stage[s][0], state: k < at || itemDone ? (shown.includes(s) ? 'shown' : 'done') : k === at ? 'now' : 'todo' }));
  const levelRaw = pool?.levels?.[item.level];
  const levelName = levelRaw ? pick(levelRaw.en, levelRaw.vn) : null;
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const [, stTitle, stSub] = t.stage[stage] || [];
  const sub = stage === 'target' ? (m.fam === 'ac' ? t.targetSubAc : t.targetSubPair) : stSub;

  const lineCls = 'flex flex-wrap items-center justify-center gap-y-2 text-2xl font-black text-slate-900 dark:text-slate-100 py-1';
  const inner = innerLatex(m);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pick(pool?.title, pool?.titleVn) || t.title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-5 lg:items-start">
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <QuestionCard ink={INK} icon={Puzzle} head={t.head[m.fam]}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${items.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName}
            question={t.question}
            big={<div className="overflow-x-auto overflow-y-hidden"><SafeInlineMath math={work[0]} /></div>}
            how={pos === 0 ? t.how[m.fam] : null}>
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
            <StepPanel ink={INK} lang={lang} steps={pills} n={at + 1} title={stTitle} sub={sub} msg={msg}
              onShowMe={() => fillIn(null)} onCheck={stage === 'pair' ? null : check}>
              {stage === 'standard' && (
                <div className={lineCls}>{box(0, { width: 'w-14' })}<M>{`${v}^{2} +`}</M>{box(1, { width: 'w-14' })}<M>{`${v} +`}</M>{box(2, { width: 'w-14' })}<M>= 0</M></div>
              )}
              {stage === 'gcf' && (
                <div className={lineCls}><M>{`${fullLatex(m)} =`}</M>{box(0, { width: 'w-14' })}<M>{'\\left(\\ \\dots\\ \\right)'}</M></div>
              )}
              {stage === 'target' && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl text-slate-700 dark:text-slate-200"><M>{inner}</M></div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-lg font-black text-slate-700 dark:text-slate-200">
                    <span className="inline-flex items-center gap-1">{t.multiplyTo} {box(0)}</span>
                    <span className="inline-flex items-center gap-1">{t.addTo} {box(1)}</span>
                  </div>
                </div>
              )}
              {stage === 'pair' && <FactorPairs P={m.product} S={m.sum} tried={tried} onPick={onPair} ink={INK} lang={lang} />}
              {stage === 'split' && (
                <div className={lineCls}><M>{`${coefX(f.A, v)}^{2} +`}</M>{box(0, { width: 'w-14' })}<M>{`${v} +`}</M>{box(1, { width: 'w-14' })}<M>{`${v} ${signed(f.C)}`}</M></div>
              )}
              {stage === 'group' && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl text-slate-700 dark:text-slate-200 overflow-x-auto max-w-full"><M>{`\\left(${coefX(f.A, v)}^{2} ${groupingNow.m < 0 ? '-' : '+'} ${coefX(Math.abs(groupingNow.m), v)}\\right) + \\left(${coefX(groupingNow.n, v)} ${signed(f.C)}\\right)`}</M></div>
                  <div className={lineCls}>{box(0, { width: 'w-14' })}<M>{`${v}\\left(${binLatex(groupingNow.P, groupingNow.Q, v)}\\right) +`}</M>{box(1, { width: 'w-14' })}<M>{`\\left(${binLatex(groupingNow.P, groupingNow.Q, v)}\\right)`}</M></div>
                </div>
              )}
              {stage === 'squares' && (
                <div className={lineCls}><M>{`${inner} = \\left(`}</M>{f.A === 1 ? <M>{v}</M> : <>{box(0, { width: 'w-12' })}<M>{v}</M></>}<M>{'\\right)^{2} - \\left('}</M>{box(1, { width: 'w-12', autoFocus: f.A === 1 })}<M>{'\\right)^{2}'}</M></div>
              )}
              {stage === 'xout' && (
                <div className={lineCls}><M>{`${inner} = ${v}\\left(`}</M>{box(0, { width: 'w-12' })}<M>{v}</M>{box(1, { width: 'w-14', placeholder: '±' })}<M>{'\\right)'}</M></div>
              )}
              {stage === 'factors' && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl text-slate-700 dark:text-slate-200"><M>{`${inner} =`}</M></div>
                  {m.brackets === 2 ? (
                    <div className={lineCls}><M>{`${g}(${v}`}</M>{box(0, { placeholder: '±' })}<M>{`)(${v}`}</M>{box(1, { placeholder: '±' })}<M>)</M></div>
                  ) : (
                    <div className={lineCls}><M>{`${g}(`}</M>{box(0, { width: 'w-12' })}<M>{v}</M>{box(1, { width: 'w-14', placeholder: '±' })}<M>{')('}</M>{box(2, { width: 'w-12' })}<M>{v}</M>{box(3, { width: 'w-14', placeholder: '±' })}<M>)</M></div>
                  )}
                </div>
              )}
              {stage === 'zeros' && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl text-slate-700 dark:text-slate-200 overflow-x-auto max-w-full"><M>{`${factoredLatex(f, v)} = 0`}</M></div>
                  <div className={lineCls}>
                    <M>{`${v} =`}</M>{box(0, { width: 'w-20' })}
                    {f.zeros.length > 1 && <><span className="mx-2 text-base text-slate-500">{t.or}</span><M>{`${v} =`}</M>{box(1, { width: 'w-20' })}</>}
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
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 flex flex-col gap-0.5">
                {work.map((l, i) => <MathLine key={i} latex={l} className="text-lg sm:text-xl text-slate-900 dark:text-slate-100" />)}
              </div>
              <AnswerStrip label={t.answer} latex={zerosLatex(m)} />
              <div className="max-w-sm w-full mx-auto">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.graph}</div>
                <QuadGraph a={m.std.a} b={m.std.b} c={m.std.c} zeros={f.zeros.map(rVal)} ink={INK} lang={lang} v={v} />
              </div>
            </DoneCard>
          )}
        </div>
      </div>
    </div>
  );
}
