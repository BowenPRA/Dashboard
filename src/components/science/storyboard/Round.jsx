import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, ListOrdered, Link2, Scale, Footprints, Image as ImageIcon, Boxes, Telescope, FlaskConical } from 'lucide-react';
import { tr } from '../../../utils/lang';
import {
  VERDICTS, VERDICT_IDS, ACTS, EVIDENCE_FRAMES,
  diagnoseOrder, diagnoseCauses, diagnoseVerdict, diagnoseFrame, diagnoseAct, diagnoseSort, answerOf,
} from '../../../utils/solarStory';
import { T } from './storyboardText.js';
import { OrderBoard } from './OrderBoard.jsx';
import { CauseBoard } from './CauseBoard.jsx';
import { ChoiceButtons, FrameChoice, SortBoard } from './Choices.jsx';
import RoundDone from './RoundDone.jsx';

/* ------------------------------------------------------------------ *
 * One Storyboard item, all its stages. Mounted with key={item.id}, so a new
 * item starts clean. A wrong answer says why (the engine's named slip) and can
 * be tried again; a second wrong one (or "Show me") fills the stage in and the
 * item pays half. The engine derives every answer (utils/solarStory.js).
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const STAGE_ICON = { order: ListOrdered, cause: Link2, verdict: Scale, frame: ImageIcon, act: Footprints, sort: Boxes };

function Message({ msg, lang }) {
  if (!msg) return null;
  const text = tr(lang, msg.en, null, msg.fr || msg.en);
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  const Icon = msg.tone === 'ok' ? CheckCircle2 : soft ? Lightbulb : XCircle;
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed ${tone}`}>
      <Icon className="w-5 h-5 shrink-0" strokeWidth={3} /><span>{text}</span>
    </div>
  );
}

export default function Round({ model: m, frames, lang, onComplete, onNext, isLast }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const [stageIdx, setStageIdx] = useState(0);
  const [arrangement, setArrangement] = useState(() => (m.kind === 'story' ? m.start : []));
  const [orderMarks, setOrderMarks] = useState(null);
  const [placed, setPlaced] = useState({});
  const [per, setPer] = useState(null);
  const [tried, setTried] = useState([]);
  const [found, setFound] = useState(null);
  const [verdictFound, setVerdictFound] = useState(null);
  const [picks, setPicks] = useState({});
  const [sortMarks, setSortMarks] = useState(null);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [done, setDone] = useState(false);
  const stage = m.stages[stageIdx];
  const both = (key) => ({ en: T.en[key], fr: T.fr[key] });

  const advance = (wasHelped, say) => {
    if (stage === 'verdict') setVerdictFound(m.verdict);
    if (stageIdx + 1 < m.stages.length) {
      setStageIdx(stageIdx + 1); setWrongs(0); setTried([]); setFound(null); setMsg(say);
      return;
    }
    setMsg(say);
    setDone(true);
    onComplete(wasHelped);
  };
  const wrong = (d, fill, overall = d) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      fill();
      setHelped(true);
      advance(true, { tone: 'shown', en: `${d.en || ''} ${T.en.filled}`.trim(), fr: `${d.fr || ''} ${T.fr.filled}`.trim() });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: overall.en, fr: overall.fr });
  };
  const allOk = (keys, field) => keys.map((k) => ({ [field]: k, ok: true, code: 'ok' }));
  const FILL = {
    order: () => { setArrangement([...m.frames]); setOrderMarks(m.frames.map(() => true)); },
    cause: () => { setPlaced(answerOf(m, 'cause')); setPer(allOk(m.ask, 'step')); },
    verdict: () => {},
    frame: () => setFound(m.fact.frame),
    act: () => setFound('keep'),
    sort: () => { setPicks(answerOf(m, 'sort')); setSortMarks(allOk(m.statements.map((s) => s.id), 'id')); },
  };

  const checkOrder = () => {
    const d = diagnoseOrder(m, arrangement);
    setOrderMarks(d.slots);
    if (d.ok) advance(helped, { tone: 'ok', ...both('orderRight') });
    else wrong(d, FILL.order);
  };
  const checkCause = () => {
    const d = diagnoseCauses(m, placed);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    setPer(d.per);
    if (d.ok) advance(helped, { tone: 'ok', ...both('causeRight') });
    else wrong(d, FILL.cause, both('causeWrong'));
  };
  const checkSort = () => {
    const d = diagnoseSort(m, picks);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    setSortMarks(d.per);
    if (d.ok) advance(helped, { tone: 'ok', ...both('sortRight') });
    else wrong(d, FILL.sort, both('sortWrong'));
  };
  const choose = (diagnose, rightKey) => (v) => {
    if (found != null || tried.includes(v)) return;
    const d = diagnose(m, v);
    if (d.ok) { setFound(v); advance(helped, { tone: 'ok', ...both(rightKey) }); return; }
    setTried((x) => [...x, v]);
    wrong(d, FILL[stage]);
  };
  const showMe = () => {
    setSlipped(true); setHelped(true);
    FILL[stage]();
    advance(true, { tone: 'shown', ...both('shown') });
  };
  const onCheck = { order: checkOrder, cause: checkCause, sort: checkSort }[stage];

  const clearBad = () => setMsg((x) => (x?.tone === 'bad' || x?.tone === 'info' ? null : x));
  const title = { order: t.orderTitle, cause: t.causeTitle, verdict: t.verdictTitle, frame: t.frameTitle, act: t.actTitle, sort: t.sortTitle }[stage];
  const help = { order: t.orderHelp, cause: t.causeHelp, sort: t.sortHelp }[stage];

  return (
    <div className="flex flex-col gap-3 min-w-0">
      {/* What the round is about */}
      {m.kind === 'evidence' && (
        <div className="rounded-2xl border-2 border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 p-3 sm:p-4">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{t.hypothesis}</p>
          <div className="flex items-start gap-3">
            <Telescope className="w-6 h-6 shrink-0 text-sky-600" strokeWidth={2.5} />
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-widest text-sky-700 dark:text-sky-300">{t.fact}</div>
              <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{pick(m.fact.en, m.fact.fr)}</p>
              {verdictFound && <p className="mt-1 text-sm font-black" style={{ color: '#3e7500' }}>✓ {pick(VERDICTS[verdictFound].en, VERDICTS[verdictFound].fr)}</p>}
            </div>
          </div>
        </div>
      )}
      {m.kind === 'model' && (
        <div className="rounded-2xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 p-3 sm:p-4 flex items-start gap-3">
          <FlaskConical className="w-6 h-6 shrink-0 text-purple-700 dark:text-purple-300" strokeWidth={2.5} />
          <div className="min-w-0">
            <div className="text-[10px] font-black uppercase tracking-widest text-purple-700 dark:text-purple-300">{t.model}</div>
            <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{pick(m.model.en, m.model.fr)}</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-snug">{pick(m.model.desc, m.model.descFr)}</p>
          </div>
        </div>
      )}

      {!done && (
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {m.stages.map((s, i) => {
              const Icon = STAGE_ICON[s];
              const isDone = i < stageIdx;
              return (
                <span key={s} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest
                  ${isDone ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300' : i === stageIdx ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
                  {t.stages[s]}
                </span>
              );
            })}
          </div>
          <div className="font-black text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-snug">{title}</div>
          {help && <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5 mb-3">{help}</p>}
          {!help && <div className="mb-3" />}

          {stage === 'order' && (
            <OrderBoard arrangement={arrangement} frames={frames} lang={lang} marks={orderMarks}
              onChange={(next) => { setArrangement(next); setOrderMarks(null); clearBad(); }} />
          )}
          {stage === 'cause' && (
            <CauseBoard m={m} frames={frames} lang={lang} placed={placed} per={per}
              onChange={(next) => { setPlaced(next); setPer((p) => (p ? p.filter((x) => x.ok) : p)); clearBad(); }} />
          )}
          {stage === 'verdict' && (
            <ChoiceButtons cols={2} options={VERDICT_IDS.map((v) => ({ val: v, label: pick(VERDICTS[v].en, VERDICTS[v].fr) }))}
              wrong={tried} right={found} onPick={choose(diagnoseVerdict, 'verdictRight')} />
          )}
          {stage === 'frame' && (
            <FrameChoice steps={EVIDENCE_FRAMES} frames={frames} lang={lang} wrong={tried} right={found} onPick={choose(diagnoseFrame, 'frameRight')} />
          )}
          {stage === 'act' && (
            <ChoiceButtons options={m.acts.map((a) => ({ val: a, label: pick(ACTS[a].en, ACTS[a].fr) }))}
              wrong={tried} right={found} onPick={choose(diagnoseAct, 'actRight')} />
          )}
          {stage === 'sort' && (
            <SortBoard statements={m.statements} picks={picks} lang={lang} marks={sortMarks}
              onPick={(id, bin) => { setPicks((p) => ({ ...p, [id]: bin })); setSortMarks((s) => (s ? s.filter((x) => x.ok) : s)); clearBad(); }} />
          )}

          <Message msg={msg} lang={lang} />

          <div className="mt-4 flex items-center justify-end gap-2">
            <button type="button" onClick={showMe}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
            </button>
            {onCheck && <button type="button" onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
          </div>
        </div>
      )}

      {done && (
        <RoundDone m={m} frames={frames} lang={lang} helped={helped} slipped={slipped} onNext={onNext} isLast={isLast}
          note={msg?.tone === 'shown' ? <Message msg={msg} lang={lang} /> : null} />
      )}
    </div>
  );
}
