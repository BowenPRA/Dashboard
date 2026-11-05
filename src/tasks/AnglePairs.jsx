import { useMemo, useState } from 'react';
import { Construction, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, MousePointerClick } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import AnglePairFigure from '../components/math/AnglePairFigure.jsx';
import useAnglePairItem, { deriveAnglePair } from '../components/math/useAnglePairItem';
import { PairButtons, ReasonButtons, SizeInput, ApMessage } from '../components/math/AnglePairParts.jsx';
import { apT, questionOf, stageTitle } from '../components/math/anglePairWords';
import { pairLines, frameParts } from '../components/math/anglePairLines';
import { StepHeader, StepTitle, HelpRow, Notebook } from '../components/math/AngleKit.jsx';

/* ------------------------------------------------------------------ *
 * X, F OR Z? — see the pair, then find the angle and say why (Y7 Maths
 * 5.2, Intersecting lines). Reads a unit's `anglePairs`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } }, items }
 * Item shapes and the stages are in utils/anglePairs.js; the picture is
 * drawn from the item by utils/anglePairGeom.js, so nothing is stored but
 * the question. It wears the angle tasks' shared look (AngleKit.jsx): a
 * "Find x" header with that letter's steps, pair cards with a picture of
 * each pair, the size after its sum, and the working written as it goes.
 *
 * Two or three actions an item from level 3 on, and naming the pair always
 * stays. Levels 1–2 show the sum (180° − 76° = ?) with the size box; later
 * levels show it after a wrong size. A wrong answer is named and tried
 * again; a second (or Show me) fills the stage in and the item pays half.
 * Blob { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#c25e12';
const INK_DARK = '#a04a0e';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

/** The steps of the angle in hand: that letter's stages, an opened stage lighting the one it belongs to. */
function stepsOf(run, lang) {
  const t = apT(lang);
  const { m, stage, answers } = run;
  const [kind, idx] = stage.split(':');
  const i = Number(idx || 0);
  const active = kind === 'stoneSize' ? 'size:0' : kind === 'convert' ? 'line' : stage;
  const list = m.kind === 'find' ? m.stages.filter((s) => Number(s.split(':')[1] || 0) === i) : m.stages;
  return list.map((s) => ({
    key: s, label: t.stages[s.split(':')[0]],
    state: answers[s] ? (answers[s].how === 'shown' ? 'shown' : 'done') : s === active ? 'now' : 'todo',
  }));
}

function PairHeader({ run, steps, lang }) {
  const t = apT(lang);
  const { m, index } = run;
  if (m.kind === 'spot') return <StepHeader letter={null} title={t.tapTitle} lang={lang} steps={[]} />;
  if (m.kind === 'which') return <StepHeader letter={null} title={t.whichTitle} lang={lang} steps={steps} />;
  return <StepHeader letter={m.kind === 'steps' ? m.target.letter : m.targets[index].letter} lang={lang} steps={steps} />;
}

const TapHint = ({ text }) => (
  <p className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 -mt-1"><MousePointerClick className="w-4 h-4" strokeWidth={2.5} />{text}</p>
);

/** The body of the stage in hand. */
function StageBody({ run, item, steps, lang }) {
  const t = apT(lang);
  const { m, kind, target, answers } = run;
  const now = steps.findIndex((s) => s.state === 'now');
  const title = <StepTitle lang={lang} n={steps.length > 1 && now >= 0 ? now + 1 : null}>{stageTitle(run, lang)}</StepTitle>;
  // A spot item's header already says "Tap the angle": the hint is all it needs.
  if (kind === 'tap') return <TapHint text={t.tapHint} />;
  if (kind === 'stone') return <>{title}<TapHint text={t.tapHint} /></>;
  if (kind === 'line') return <>{title}<TapHint text={t.lineHint} /></>;
  if (kind === 'pair') return <>{title}<PairButtons options={target.options} picks={run.picks} onChoose={run.actions.choose} lang={lang} /></>;
  if (kind === 'reason') return <>{title}<ReasonButtons picks={run.picks} onChoose={run.actions.choose} lang={lang} /></>;
  if (kind === 'size') {
    // The sum with its numbers: levels 1–2, or after a wrong size (and in two steps, once w is known).
    const knowFrom = m.kind !== 'steps' || !!answers.stoneSize;
    const full = knowFrom && ((item.level || 1) <= 2 || run.msg?.tone === 'bad');
    const frame = frameParts(target.letter, target.right, target.from, full, { from: m.kind === 'steps' ? 's' : 'g' });
    return (
      <>
        {title}
        <SizeInput key={`${run.stage}:${full ? 1 : 0}`} letter={target.letter} frame={frame}
          hint={full && target.right !== 'adj' ? t.sameAs(target.from) : null} onCheck={run.actions.type} lang={lang} />
      </>
    );
  }
  if (kind === 'stoneSize') {
    return <>{title}<SizeInput key={run.stage} letter="w" frame={[{ t: 's', v: 'w' }, { t: 'op', v: '=' }]} onCheck={run.actions.type} lang={lang} /></>;
  }
  if (kind === 'convert') {
    const name = m.lines[run.convertLine].name;
    return <>{title}<SizeInput key={run.stage} letter={name} frame={[{ t: 'cur', v: '?' }, { t: 'op', v: '=' }]} onCheck={run.actions.type} lang={lang} /></>;
  }
  return null;
}

/** One item, keyed by its id so every item starts fresh. */
function ItemPanel({ item, pool, lang, header, isLast, onDone, onNext }) {
  const run = useAnglePairItem(item, { onFinish: onDone });
  const t = apT(lang);
  const { m, done } = run;
  const context = item.context ? tr(lang, item.context, null, item.contextFr) : null;
  const first = item === pool.items[0];
  const steps = done ? [] : stepsOf(run, lang);
  const lines = pairLines(run);
  const card = 'rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 min-w-0 flex flex-col gap-3';

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-5 lg:items-start">
      <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
        <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
          {header}
          <p className="px-4 pt-3 text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{questionOf(m, lang, context)}</p>
          {first && (
            <ol className="px-4 pt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-bold text-slate-600 dark:text-slate-300">
              {t.how.map((h, n) => (
                <li key={h} className="flex items-center gap-1.5"><span className="inline-grid place-items-center w-5 h-5 rounded-full bg-[#e8590c] text-white text-[11px] font-black">{n + 1}</span>{h}</li>
              ))}
            </ol>
          )}
          <div className="p-2 sm:p-3">
            <AnglePairFigure F={m.F} marks={run.marks} glow={run.glow} tap={done ? null : run.tap} rails={run.rails}
              onTap={run.tap === 'rail' ? run.actions.tapRail : run.actions.tapSector}
              label={t.title} className="mx-auto" style={{ maxHeight: '52vh' }} />
          </div>
        </div>
      </div>

      <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
        {!done && (
          <>
            <div className={card}>
              <PairHeader run={run} steps={steps} lang={lang} />
              <StageBody run={run} item={item} steps={steps} lang={lang} />
              <ApMessage msg={run.msg} lang={lang} />
              <HelpRow lang={lang} onShowMe={run.actions.showMe} />
            </div>
            <Notebook lines={lines.map((l, n) => ({ ...l, fresh: n === lines.length - 1 }))} lang={lang} />
          </>
        )}

        {done && (
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: run.filled ? AMBER : GREEN }}>
            <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: run.filled ? AMBER : GREEN }}>
              {run.filled ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
              <div className="font-black">{run.filled ? t.helped : run.slipped ? t.slipped : t.clean}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
              {run.msg?.tone === 'shown' && <div className="-mt-1 mb-3"><ApMessage msg={run.msg} lang={lang} /></div>}
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                <Pencil className="w-4 h-4" strokeWidth={3} /> {t.write}
              </div>
              <Notebook lines={lines} lang={lang} bare big />
              <div className="mt-4 flex justify-end">
                <button onClick={onNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                  {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnglePairs({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => deriveAnglePair(it)), [pool]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const t = apT(lang);
  const [results, setResults] = useState(() => Object.fromEntries(Object.entries(savedData || {}).map(([id, s]) => [id, Number(s) || 0])));
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => { const i = items.findIndex((it) => savedData?.[it.id] == null); return i === -1 ? 0 : i; });
  const [ended, setEnded] = useState(false);

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Construction className="w-10 h-10 mb-3" style={{ color: INK }} strokeWidth={2.5} />
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id] || 0), 0);
    return {
      raw: Math.round((cleared / items.length) * 10),
      blob: Object.fromEntries(items.filter((it) => res[it.id] != null).map((it) => [it.id, res[it.id]])),
      log: { items: items.map((it) => ({ itemId: it.id, correct: res[it.id] === 1 })) },
    };
  };
  const item = items[pos];
  const isLast = pos === items.length - 1;
  const onDone = (helped) => {
    const next = { ...results, [item.id]: helped ? 0.5 : 1 };
    setResults(next);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, log);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, log);
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());
  const cleared = items.reduce((s, it) => s + (results[it.id] || 0), 0);
  const level = item.level ? pool?.levels?.[item.level] : null;

  const header = (
    <>
      <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
        <span className="font-black text-sm">X · F · Z</span>
        <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
      </div>
      {item.level && (
        <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase tracking-widest">
            <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
          </span>
          {level && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{tr(lang, level.en, null, level.fr)}</span>}
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={tr(lang, pool?.title, null, pool?.titleFr) || t.title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      <ItemPanel key={item.id} item={item} pool={pool} lang={lang} header={header} isLast={isLast}
        onDone={onDone} onNext={isLast ? finish : () => setPos((p) => p + 1)} />
    </div>
  );
}
