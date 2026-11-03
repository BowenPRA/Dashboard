import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, Eye, Tag, Layers, MapPin, Boxes, Timer, HelpCircle, Zap } from 'lucide-react';
import { tr } from '../../../utils/lang';
import {
  ENERGIES, STORE_IDS, CLUES, REASONS, FAMILIES,
  diagnoseLook, diagnoseName, diagnoseFamily, diagnoseQuick, diagnoseScene, diagnoseSceneFamilies,
  diagnoseStores, diagnoseStore, diagnoseYear, diagnoseWhy, answerOf,
} from '../../../utils/energySpot';
import { VERDICTS, VERDICT_IDS } from '../../../utils/energySpotData';
import { ChoiceButtons } from '../storyboard/Choices.jsx';
import { T, familyInk } from './spotText.js';
import { EnergyCards, FamilyButtons, PicFrame } from './Cards.jsx';
import { ScenePicture, PinRows } from './SceneBoard.jsx';
import RoundDone from './RoundDone.jsx';

/* ------------------------------------------------------------------ *
 * One Name That Energy item, all its stages. Mounted with key={item.id}. A
 * wrong answer says why (the engine's named slip) and can be tried again; a
 * second wrong one (or Show me) fills the stage in and the item pays half.
 * QUICK (level 3 on): the name and the family together; a wrong name opens
 * Look → Name (and the family if that was wrong too), a wrong family opens
 * only the family, and the quick answer counts as that stage's first try.
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const STAGE_ICON = { look: Eye, name: Tag, family: Layers, quick: Zap, names: MapPin, families: Layers, stores: Boxes, store: Tag, year: Timer, why: HelpCircle };
const CHECKED = ['quick', 'names', 'families', 'stores'];

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

export default function Round({ model: m, pool, lang, onComplete, onNext, isLast }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const both = (fn) => ({ en: fn(T.en), fr: fn(T.fr) });
  const [stages, setStages] = useState(m.stages);
  const [idx, setIdx] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [tried, setTried] = useState([]);
  const [found, setFound] = useState({});
  const [carry, setCarry] = useState({});
  const [quick, setQuick] = useState({ energy: null, family: null });
  const [placed, setPlaced] = useState({});
  const [fams, setFams] = useState({});
  const [active, setActive] = useState(m.pins?.[0]?.id ?? null);
  const [per, setPer] = useState(null);
  const [picked, setPicked] = useState([]);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [done, setDone] = useState(false);
  const stage = stages[idx];

  const startStage = (list, i, carried = carry) => {
    setIdx(i); setWrongs(carried[list[i]]?.wrongs || 0); setTried(carried[list[i]]?.tried || []); setPer(null);
  };
  const advance = (wasHelped, say) => {
    setFound((f) => ({ ...f, [stage]: answerOf(m, stage) }));
    setMsg(say);
    if (idx + 1 < stages.length) { startStage(stages, idx + 1); return; }
    setDone(true);
    onComplete(wasHelped);
  };
  const FILL = {
    quick: () => setQuick(answerOf(m, 'quick')),
    names: () => { setPlaced(answerOf(m, 'names')); setPer(m.pins.map((p) => ({ id: p.id, ok: true, code: 'ok' }))); },
    families: () => { setFams(answerOf(m, 'families')); setPer(m.pins.map((p) => ({ id: p.id, ok: true, code: 'ok' }))); },
    stores: () => setPicked(answerOf(m, 'stores')),
  };
  const wrong = (d, overall = d) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      FILL[stage]?.();
      setHelped(true);
      advance(true, { tone: 'shown', en: `${d.en || ''} ${T.en.filled}`.trim(), fr: `${d.fr || ''} ${T.fr.filled}`.trim() });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: overall.en, fr: overall.fr });
  };
  const choose = (diagnose) => (v) => {
    if (found[stage] != null || tried.includes(v)) return;
    const d = diagnose(m, v);
    if (d.ok) { advance(helped, { tone: 'ok', ...both((x) => x.right[stage]) }); return; }
    setTried((x) => [...x, v]);
    wrong(d);
  };
  const showMe = () => {
    setSlipped(true); setHelped(true);
    FILL[stage]?.();
    advance(true, { tone: 'shown', ...both((x) => x.shown) });
  };

  const checkQuick = () => {
    const d = diagnoseQuick(m, quick);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) { advance(helped, { tone: 'ok', ...both((x) => x.right.name) }); return; }
    // open the stages the slip belongs to; the quick answer is their first try
    setSlipped(true);
    const carried = {};
    if (d.opens.includes('name')) carried.name = { wrongs: 1, tried: [quick.energy] };
    if (d.opens.includes('family')) carried.family = { wrongs: 1, tried: [quick.family] };
    setCarry(carried);
    setStages(d.opens);
    startStage(d.opens, 0, carried);
    setMsg({ tone: 'bad', en: `${d.en} ${T.en.stepByStep}`, fr: `${d.fr} ${T.fr.stepByStep}` });
  };
  const notYet = (d) => {
    const n = d.per.filter((x) => !x.ok).length;
    return { en: `${n} not right yet: read why under each one.`, fr: `${n} pas encore juste : lis pourquoi sous chacun.` };
  };
  const checkNames = () => {
    const d = diagnoseScene(m, placed);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    setPer(d.per);
    if (d.ok) advance(helped, { tone: 'ok', ...both((x) => x.right.names) });
    else wrong(d, notYet(d));
  };
  const checkFamilies = () => {
    const d = diagnoseSceneFamilies(m, fams);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    setPer(d.per);
    if (d.ok) advance(helped, { tone: 'ok', ...both((x) => x.right.families) });
    else wrong(d, notYet(d));
  };
  const checkStores = () => {
    const d = diagnoseStores(m, picked);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) advance(helped, { tone: 'ok', ...both((x) => x.right.stores) });
    else wrong(d);
  };
  const onCheck = { quick: checkQuick, names: checkNames, families: checkFamilies, stores: checkStores }[stage];
  const clearBad = () => setMsg((x) => (x?.tone === 'bad' || x?.tone === 'info' ? null : x));
  const dropResult = (id) => setPer((p) => (p ? p.filter((x) => x.ok || x.id !== id) : p));

  const pinLocked = (id) => per?.find((x) => x.id === id)?.ok;
  const pickEnergyForPin = (e) => {
    if (!active || pinLocked(active)) return;
    setPlaced((p) => ({ ...p, [active]: e }));
    dropResult(active); clearBad();
    const next = m.pins.find((p) => p.id !== active && !placed[p.id] && !pinLocked(p.id));
    if (next) setActive(next.id);
  };

  // what is known so far, under a one-thing picture
  const known = [];
  if (m.kind === 'one' || m.kind === 'lasts') {
    if (found.look || done) known.push([t.clue, pick(CLUES[m.clue].en, CLUES[m.clue].fr)]);
    const e = found.name || found.store || found.quick?.energy || (done ? m.energy || m.store : null);
    const f = found.family || found.quick?.family;
    // coloured as a store or a transfer only once that has been answered
    if (e) known.push([t.stages.name, pick(ENERGIES[e].en, ENERGIES[e].fr), f || m.kind === 'lasts' ? familyInk(m.family || 'store') : null]);
    if (f) known.push([t.stages.family, pick(FAMILIES[f].en, FAMILIES[f].fr), familyInk(f)]);
    if (found.year) known.push([t.lasts, pick(VERDICTS[m.verdict].en, VERDICTS[m.verdict].fr)]);
  }

  const control = {
    look: () => <ChoiceButtons cols={2} options={m.look.map((c) => ({ val: c, label: pick(CLUES[c].en, CLUES[c].fr) }))} wrong={tried} right={found.look ?? null} onPick={choose(diagnoseLook)} />,
    name: () => <EnergyCards poses={pool?.poses} lang={lang} wrong={tried} right={found.name ?? null} onPick={choose(diagnoseName)} />,
    family: () => <FamilyButtons lang={lang} wrong={tried} right={found.family ?? null} onPick={choose(diagnoseFamily)} />,
    quick: () => (
      <div className="flex flex-col gap-3">
        <EnergyCards poses={pool?.poses} lang={lang} selected={quick.energy} onPick={(e) => { setQuick((q) => ({ ...q, energy: e })); clearBad(); }} />
        <FamilyButtons lang={lang} value={quick.family} onPick={(f) => { setQuick((q) => ({ ...q, family: f })); clearBad(); }} />
      </div>
    ),
    names: () => (
      <div className="flex flex-col gap-3">
        <PinRows m={m} lang={lang} mode="names" active={active} placed={placed} per={per} onPin={setActive} />
        <EnergyCards poses={pool?.poses} lang={lang} selected={placed[active] || null} onPick={pickEnergyForPin} />
      </div>
    ),
    families: () => (
      <PinRows m={m} lang={lang} mode="families" placed={placed} fams={fams} per={per}
        onFamily={(id, f) => { setFams((x) => ({ ...x, [id]: f })); dropResult(id); clearBad(); }} />
    ),
    stores: () => (
      <EnergyCards poses={pool?.poses} lang={lang} selected={picked}
        onPick={(e) => { setPicked((p) => (p.includes(e) ? p.filter((x) => x !== e) : [...p, e])); clearBad(); }} />
    ),
    store: () => <EnergyCards poses={pool?.poses} lang={lang} ids={STORE_IDS} wrong={tried} right={found.store ?? null} onPick={choose(diagnoseStore)} />,
    year: () => <ChoiceButtons cols={2} options={VERDICT_IDS.map((v) => ({ val: v, label: pick(VERDICTS[v].en, VERDICTS[v].fr) }))} wrong={tried} right={found.year ?? null} onPick={choose(diagnoseYear)} />,
    why: () => <ChoiceButtons options={m.reasons.map((r) => ({ val: r, label: pick(REASONS[r].en, REASONS[r].fr) }))} wrong={tried} right={found.why ?? null} onPick={choose(diagnoseWhy)} />,
  }[stage];

  const panel = !done && (
    <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 min-w-0">
      <div className="flex flex-wrap gap-1.5 mb-2">
        {stages.map((s, i) => {
          const Icon = STAGE_ICON[s];
          const isDone = i < idx;
          return (
            <span key={s} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest
              ${isDone ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300' : i === idx ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
              {isDone ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
              {t.stages[s]}
            </span>
          );
        })}
      </div>
      <div className="font-black text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-snug">{t.titles[stage]}</div>
      {t.help[stage] ? <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5 mb-3">{t.help[stage]}</p> : <div className="mb-3" />}
      {control?.()}
      <Message msg={msg} lang={lang} />
      <div className="mt-4 flex items-center justify-end gap-2">
        <button type="button" onClick={showMe}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
          <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
        </button>
        {CHECKED.includes(stage) && <button type="button" onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
      </div>
    </div>
  );
  const finished = done && (
    <RoundDone m={m} lang={lang} helped={helped} slipped={slipped} onNext={onNext} isLast={isLast}
      note={msg?.tone === 'shown' ? <Message msg={msg} lang={lang} /> : null} />
  );

  if (m.kind === 'scene') {
    return (
      <div className="flex flex-col gap-3 min-w-0">
        <ScenePicture m={m} active={stage === 'names' && !done ? active : null} per={done ? null : per} onPin={stage === 'names' && !done ? setActive : undefined} />
        {panel}{finished}
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 items-start min-w-0">
      <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 flex flex-col gap-2">
        <PicFrame svg={pool?.pics?.[m.pic]} />
        <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{pick(m.en, m.fr)}</p>
        {known.map(([k, v, ink]) => (
          <p key={k} className="text-sm leading-snug">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{k} · </span>
            <span className="font-bold text-slate-700 dark:text-slate-200" style={ink ? { color: ink } : undefined}>{v}</span>
          </p>
        ))}
      </div>
      <div className="min-w-0 flex flex-col gap-3">{panel}{finished}</div>
    </div>
  );
}
