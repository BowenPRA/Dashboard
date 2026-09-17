import React, { useMemo, useState } from 'react';
import { FlaskRound, Minus, Plus } from 'lucide-react';
import TopBar from '../components/TopBar';
import { AskHeader, CheckButton, NextButton, ChoiceButton, Verdict, ProgressDots, EmptyScreen, Summary, Formula, AtomKey, AtomSwatch, SvgPlate } from '../components/science/TaskChrome';
import {
  markCount, countReady, explainCount, markFormula, explainFormula, markBuild, explainBuild,
  markName, explainName, markClassify, markPure, markMagnet, explainBox, explainPure, explainMagnet,
  elementsIn, toCount, BOX_OPTS,
} from '../components/science/labMarking';
import { makeLabSession, LAB_MODES, boxSvg, clusterSvg, particleCardSvg, formulaPretty } from '../utils/particles';
import { elementBySymbol } from '../utils/elements';

/**
 * Particle Lab — Science 2.6 and 2.7's generative task. Rounds are drawn fresh
 * from a seed and cycle through the unit's modes (src/utils/particles.js):
 *
 *   count     a formula: how many elements, how many atoms of each, how many in all
 *   formula   a drawn particle and its colour key: type the formula
 *   build     a formula: add atoms with + and − until the particle matches
 *   name      a compound's name: tap the elements in it
 *   classify  a box of particles: element, compound (or mixture)
 *   pure      a box: pure or a mixture, and how many substances
 *   magnet    a box: would a magnet pull iron out?
 *
 * One attempt per round; the verdict explains from the round itself
 * (components/science/labMarking.js). Every picture carries an atom colour key.
 * Score: rounds right out of the session, out of 10; quitting saves what was
 * answered; "New particles" at the end starts a fresh session and the better
 * finished run is what is saved.
 */

const T = {
  en: {
    title: 'Particle Lab', check: 'Check', next: 'Next', results: 'See results', finish: 'Finish', again: 'New particles',
    empty: 'This unit has no Particle Lab modes.', back: 'Return', correct: 'Correct', wrong: 'Not quite', done: 'Lab complete', right: 'right',
    ask: {
      count: 'Count the atoms in this formula.',
      formula: 'Write the formula of this particle.',
      build: 'Build one particle of this substance.',
      name: 'Which elements are in this compound?',
      classify2: 'Is this box an element or a compound?',
      classify3: 'Is this box an element, a compound or a mixture?',
      pure: 'Is this box a pure substance or a mixture?',
      magnet: 'Would a magnet pull iron out of this box?',
    },
    modes: { count: 'Count the atoms', formula: 'Write the formula', build: 'Build the particle', name: 'Read the name', classify: 'Element, compound or mixture', pure: 'Pure or mixture', magnet: 'The magnet test' },
    elements: 'How many different elements?', atoms: 'atoms', total: 'How many atoms altogether?',
    typeFormula: 'Type the formula', tray: 'Your particle', rightParticle: 'The right particle', addAtoms: 'Add atoms with + and −, then Check.',
    tapElements: 'Tap every element in it, then Check.', less: 'One fewer', more: 'One more',
    element: 'Element', compound: 'Compound', mixture: 'Mixture', pure: 'Pure substance', substances: 'How many different substances?',
    yes: 'Yes', no: 'No', box: 'A box of particles', particle: 'A particle',
    missed: 'Missed', notIn: 'Not in it', substancesAre: (n) => `There ${n === 1 ? 'is 1 substance' : `are ${n} different substances`}.`,
  },
  vn: {
    title: 'Phòng thí nghiệm hạt', check: 'Kiểm tra', next: 'Tiếp', results: 'Xem kết quả', finish: 'Hoàn thành', again: 'Hạt mới',
    empty: 'Bài này chưa có chế độ Phòng thí nghiệm hạt.', back: 'Quay lại', correct: 'Chính xác', wrong: 'Chưa đúng', done: 'Hoàn thành phòng thí nghiệm', right: 'đúng',
    ask: {
      count: 'Đếm các nguyên tử trong công thức này.',
      formula: 'Viết công thức của hạt này.',
      build: 'Tạo một hạt của chất này.',
      name: 'Hợp chất này gồm những nguyên tố nào?',
      classify2: 'Hộp này là nguyên tố hay hợp chất?',
      classify3: 'Hộp này là nguyên tố, hợp chất hay hỗn hợp?',
      pure: 'Hộp này là chất tinh khiết hay hỗn hợp?',
      magnet: 'Nam châm có hút được sắt ra khỏi hộp này không?',
    },
    modes: { count: 'Đếm nguyên tử', formula: 'Viết công thức', build: 'Tạo hạt', name: 'Đọc tên', classify: 'Nguyên tố, hợp chất hay hỗn hợp', pure: 'Tinh khiết hay hỗn hợp', magnet: 'Thử bằng nam châm' },
    elements: 'Có bao nhiêu nguyên tố khác nhau?', atoms: 'nguyên tử', total: 'Tổng cộng có bao nhiêu nguyên tử?',
    typeFormula: 'Nhập công thức', tray: 'Hạt của bạn', rightParticle: 'Hạt đúng', addAtoms: 'Thêm nguyên tử bằng nút + và −, rồi bấm Kiểm tra.',
    tapElements: 'Chạm vào mọi nguyên tố có trong đó, rồi bấm Kiểm tra.', less: 'Bớt một', more: 'Thêm một',
    element: 'Nguyên tố', compound: 'Hợp chất', mixture: 'Hỗn hợp', pure: 'Chất tinh khiết', substances: 'Có bao nhiêu chất khác nhau?',
    yes: 'Có', no: 'Không', box: 'Một hộp các hạt', particle: 'Một hạt',
    missed: 'Còn thiếu', notIn: 'Không có trong đó', substancesAre: (n) => `Có ${n} chất khác nhau.`,
  },
};

const EMPTY = { elements: '', per: {}, total: '', typed: '', tray: {}, chips: [], choice: null, count: '' };
const MAX_ATOMS = 6;

const askOf = (round, t) => (round.mode === 'classify' ? (round.withMixtures ? t.ask.classify3 : t.ask.classify2) : t.ask[round.mode]);
const nameOfEl = (sym, L) => { const e = elementBySymbol(sym); return e ? (L === 'vn' ? e.vn : e.en) : sym; };
const say = (o, L) => (o ? (L === 'vn' && o.vn ? o.vn : o.en) : '');
const INPUT_LOOK = {
  good: 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500]',
  bad: 'border-rose-400 bg-rose-50 text-rose-600',
  idle: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#1cb0f6]',
};

// ------------------------------------------------------------------ small pieces

function NameLine({ name, L, className = '' }) {
  if (!name?.en) return null;
  return (
    <div className={`text-center ${className}`}>
      <div className="font-black text-xl sm:text-2xl text-slate-600 dark:text-slate-300">{name.en}</div>
      {L === 'vn' && name.vn && <div className="font-bold text-sm text-slate-400">({name.vn})</div>}
    </div>
  );
}

function NumberRow({ id, label, suffix, value, onChange, onEnter, disabled, state, right, autoFocus }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="flex-1 min-w-0 text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 flex-wrap">{label}</label>
      <input
        id={id} type="text" inputMode="numeric" value={value} disabled={disabled} autoFocus={autoFocus} maxLength={3} autoComplete="off"
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
        onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
        className={`w-16 h-11 shrink-0 text-xl font-black text-center rounded-xl border-2 border-b-[4px] outline-none ${INPUT_LOOK[state] || INPUT_LOOK.idle}`}
        placeholder="?" />
      {suffix !== undefined && <span className="w-16 shrink-0 text-xs font-bold text-slate-400 leading-tight">{suffix}</span>}
      <span className={`w-9 shrink-0 font-black text-[#3e7500] dark:text-[#8ee04e] ${state === 'bad' ? '' : 'invisible'}`} aria-hidden={state !== 'bad'}>→ {right}</span>
    </div>
  );
}

function StepButton({ icon: Icon, onClick, disabled, label }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={label} title={label}
      className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 border-2 border-b-[4px] border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:border-[#1cb0f6] active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 disabled:pointer-events-none">
      <Icon className="w-4 h-4" strokeWidth={3} />
    </button>
  );
}

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-sm ${className}`}>{children}</div>
);

// ------------------------------------------------------------------ the picture side

function Stage({ round, draft, checked, result, boxPicture, L, t }) {
  if (round.mode === 'count') {
    return (
      <Card className="p-6 flex flex-col items-center justify-center gap-2 min-h-[9rem] lg:min-h-[18rem]">
        <Formula formula={round.formula} className="font-black text-6xl sm:text-7xl text-slate-800 dark:text-slate-100 leading-none pb-3" />
        <NameLine name={round.name} L={L} />
      </Card>
    );
  }
  if (round.mode === 'formula') {
    return (
      <div className="flex flex-col items-center gap-3">
        <SvgPlate svg={round.svg} label={t.particle} className="w-full max-w-[15rem] sm:max-w-[18rem] lg:max-w-[20rem]" />
        <AtomKey symbols={round.counts.map((c) => c.el)} lang={L} />
        {checked && (
          <div className="flex flex-col items-center">
            <Formula formula={round.formula} className="font-black text-4xl text-slate-800 dark:text-slate-100" />
            <NameLine name={round.name} L={L} />
          </div>
        )}
      </div>
    );
  }
  if (round.mode === 'build') {
    const present = Object.keys(draft.tray).filter((el) => draft.tray[el] > 0);
    const counts = present.map((el) => ({ el, n: draft.tray[el] }));
    const showRight = checked && !result?.ok;
    return (
      <Card className="p-3 sm:p-4 flex flex-col items-center gap-3">
        <div className="flex flex-col items-center">
          <Formula formula={round.formula} className="font-black text-5xl text-slate-800 dark:text-slate-100 leading-none pb-2" />
          <NameLine name={round.name} L={L} />
        </div>
        <div className={`w-full grid gap-3 ${showRight ? 'grid-cols-2 max-w-[28rem]' : 'grid-cols-1 max-w-[14rem] sm:max-w-[16rem]'}`}>
          <figure className="flex flex-col items-center gap-1">
            <SvgPlate svg={clusterSvg(counts)} label={t.tray} className="w-full" />
            <figcaption className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.tray}</figcaption>
          </figure>
          {showRight && (
            <figure className="flex flex-col items-center gap-1">
              <SvgPlate svg={particleCardSvg(round.formula)} label={t.rightParticle} className="w-full" />
              <figcaption className="text-[10px] font-black uppercase tracking-widest text-[#3e7500] dark:text-[#8ee04e]">{t.rightParticle}</figcaption>
            </figure>
          )}
        </div>
        <AtomKey symbols={showRight ? [...new Set([...present, ...round.counts.map((c) => c.el)])] : present} lang={L} />
      </Card>
    );
  }
  if (round.mode === 'name') {
    return (
      <Card className="p-6 flex flex-col items-center justify-center gap-1 min-h-[9rem] lg:min-h-[16rem] text-center">
        <div className="font-black text-4xl sm:text-5xl text-slate-800 dark:text-slate-100 break-words">{round.name?.en}</div>
        {L === 'vn' && round.name?.vn && <div className="font-bold text-lg text-slate-400">({round.name.vn})</div>}
        {checked && <div className="mt-3 font-black text-4xl text-[#16a34a]">= <Formula formula={round.formula} /></div>}
      </Card>
    );
  }
  // classify · pure · magnet: a box of particles
  return (
    <div className="flex flex-col items-center gap-3">
      <SvgPlate svg={boxPicture} label={t.box} className="w-full max-w-[30rem]" />
      <AtomKey symbols={elementsIn(round.particles)} lang={L} />
    </div>
  );
}

// ------------------------------------------------------------------ the answer side

function Panel({ round, idx, draft, set, checked, result, L, t, check, answerNow }) {
  const id = (k) => `lab-${idx}-${k}`;

  if (round.mode === 'count') {
    const f = result?.fields;
    const st = (ok) => (checked ? (ok ? 'good' : 'bad') : null);
    const onEnter = () => countReady(round, draft) && check();
    return (
      <div className="flex flex-col gap-2">
        <NumberRow id={id('el')} label={t.elements} suffix="" value={draft.elements} disabled={checked} autoFocus
          onChange={(v) => set({ elements: v })} onEnter={onEnter} state={st(f?.elements)} right={round.elements} />
        {/* The rows name every element, so they would answer the first question:
            they appear once "how many different elements?" has an answer. */}
        {(checked || String(draft.elements ?? '').trim() !== '') && round.counts.map((c) => (
          <NumberRow key={c.el} id={id(c.el)} suffix={t.atoms} value={draft.per[c.el] || ''} disabled={checked}
            label={<><AtomSwatch sym={c.el} /><span className="font-black text-slate-800 dark:text-slate-100">{c.el}</span><span className="truncate">{nameOfEl(c.el, L)}</span></>}
            onChange={(v) => set({ per: { ...draft.per, [c.el]: v } })} onEnter={onEnter} state={st(f?.per?.[c.el])} right={c.n} />
        ))}
        <NumberRow id={id('total')} label={t.total} suffix="" value={draft.total} disabled={checked}
          onChange={(v) => set({ total: v })} onEnter={onEnter} state={st(f?.total)} right={round.total} />
        {!checked && <CheckButton onClick={check} disabled={!countReady(round, draft)}>{t.check}</CheckButton>}
      </div>
    );
  }

  if (round.mode === 'formula') {
    const clean = draft.typed.replace(/\s+/g, '');
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id('f')} className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.typeFormula}</label>
        <input
          key={idx} id={id('f')} type="text" value={draft.typed} disabled={checked} autoFocus
          autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false} maxLength={12}
          onChange={(e) => set({ typed: e.target.value })}
          onKeyDown={(e) => { if (e.key === 'Enter' && clean) check(); }}
          className={`w-full text-3xl font-black text-center px-3 py-3 rounded-xl border-2 border-b-[4px] outline-none ${checked ? (result.ok ? INPUT_LOOK.good : INPUT_LOOK.bad) : INPUT_LOOK.idle}`}
          placeholder="?" />
        {/* what the typed numbers mean: they become small numbers after the symbol */}
        <div className="min-h-[3rem] flex items-center justify-center text-4xl font-black text-slate-700 dark:text-slate-200" aria-hidden="true">
          {clean && <Formula formula={clean} />}
        </div>
        {!checked && <CheckButton onClick={check} disabled={!clean}>{t.check}</CheckButton>}
      </div>
    );
  }

  if (round.mode === 'build') {
    const off = new Set((result?.off || []).map((o) => o.el));
    const bump = (el, d) => set({ tray: { ...draft.tray, [el]: Math.max(0, Math.min(MAX_ATOMS, (draft.tray[el] || 0) + d)) } });
    return (
      <div className="flex flex-col gap-2">
        {!checked && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.addAtoms}</p>}
        {round.palette.map((el) => {
          const n = draft.tray[el] || 0;
          const look = !checked ? 'border-slate-200 dark:border-slate-700' : off.has(el) ? 'border-rose-400' : n ? 'border-[#58a700]' : 'border-slate-200 dark:border-slate-700';
          return (
            <div key={el} className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border-2 bg-white dark:bg-slate-900 ${look}`}>
              <AtomSwatch sym={el} size={26} />
              <span className="font-black text-lg w-7 text-slate-800 dark:text-slate-100">{el}</span>
              <span className="flex-1 min-w-0 truncate text-sm font-bold text-slate-500 dark:text-slate-400">{nameOfEl(el, L)}</span>
              <StepButton icon={Minus} label={`${t.less}: ${el}`} disabled={checked || !n} onClick={() => bump(el, -1)} />
              <span className="w-6 text-center font-black text-xl tabular-nums text-slate-800 dark:text-slate-100" aria-live="polite">{n}</span>
              <StepButton icon={Plus} label={`${t.more}: ${el}`} disabled={checked || n >= MAX_ATOMS} onClick={() => bump(el, 1)} />
            </div>
          );
        })}
        {!checked && <CheckButton onClick={check} disabled={!Object.values(draft.tray).some(Boolean)}>{t.check}</CheckButton>}
      </div>
    );
  }

  if (round.mode === 'name') {
    const toggle = (el) => set({ chips: draft.chips.includes(el) ? draft.chips.filter((s) => s !== el) : [...draft.chips, el] });
    return (
      <div className="flex flex-col gap-2">
        {!checked && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.tapElements}</p>}
        <div className="grid grid-cols-2 gap-2">
          {round.bank.map((el) => {
            const on = draft.chips.includes(el);
            const look = !checked ? (on ? 'picked' : 'idle') : round.answer.includes(el) ? (on ? 'good' : 'answer') : on ? 'bad' : 'muted';
            return (
              <ChoiceButton key={el} look={look} disabled={checked} onClick={() => toggle(el)} className="!px-2.5 !py-2 flex items-center gap-2">
                <AtomSwatch sym={el} />
                <span className="font-black">{el}</span>
                <span className="min-w-0 truncate text-sm font-bold opacity-75">{nameOfEl(el, L)}</span>
              </ChoiceButton>
            );
          })}
        </div>
        {!checked && <CheckButton onClick={check} disabled={!draft.chips.length}>{t.check}</CheckButton>}
      </div>
    );
  }

  if (round.mode === 'classify') {
    const kinds = round.withMixtures ? ['element', 'compound', 'mixture'] : ['element', 'compound'];
    return (
      <div className={`grid gap-2 ${kinds.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'} lg:grid-cols-1`}>
        {kinds.map((k) => {
          const look = !checked ? 'idle' : k === round.verdict.kind ? (draft.choice === k ? 'good' : 'answer') : draft.choice === k ? 'bad' : 'muted';
          return <ChoiceButton key={k} look={look} disabled={checked} onClick={() => answerNow(k, markClassify(round, k))} className="!text-center">{t[k]}</ChoiceButton>;
        })}
      </div>
    );
  }

  if (round.mode === 'pure') {
    const want = round.verdict.pure ? 'pure' : 'mixture';
    const ready = !!draft.choice && toCount(draft.count) != null;
    return (
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {['pure', 'mixture'].map((v) => {
            const look = !checked ? (draft.choice === v ? 'picked' : 'idle') : v === want ? (draft.choice === v ? 'good' : 'answer') : draft.choice === v ? 'bad' : 'muted';
            return <ChoiceButton key={v} look={look} disabled={checked} onClick={() => set({ choice: v })} className="!text-center">{t[v]}</ChoiceButton>;
          })}
        </div>
        <NumberRow id={id('n')} label={t.substances} value={draft.count} disabled={checked}
          onChange={(v) => set({ count: v })} onEnter={() => ready && check()}
          state={checked ? (result.countOk ? 'good' : 'bad') : null} right={round.verdict.substances.length} />
        {!checked && <CheckButton onClick={check} disabled={!ready}>{t.check}</CheckButton>}
      </div>
    );
  }

  // magnet
  const want = round.verdict.magnet;
  return (
    <div className="grid grid-cols-2 gap-2">
      {[true, false].map((v) => {
        const look = !checked ? 'idle' : v === want ? (draft.choice === v ? 'good' : 'answer') : draft.choice === v ? 'bad' : 'muted';
        return <ChoiceButton key={String(v)} look={look} disabled={checked} onClick={() => answerNow(v, markMagnet(round, v))} className="!text-center">{v ? t.yes : t.no}</ChoiceButton>;
      })}
    </div>
  );
}

function LabVerdict({ round, result, L, t }) {
  const lines = [];
  if (round.mode === 'count') {
    const ex = explainCount(round);
    lines.push(ex.rule, ex.working);
  } else if (round.mode === 'formula') {
    if (result.en) lines.push(result);
    lines.push(explainFormula(round));
  } else if (round.mode === 'build') {
    lines.push(...(result.lines || []), explainBuild(round));
  } else if (round.mode === 'name') {
    const both = (list) => ({ en: list.map((s) => `${s} (${nameOfEl(s, 'en')})`).join(', '), vn: list.map((s) => `${s} (${nameOfEl(s, 'vn')})`).join(', ') });
    if (result.missed?.length) { const b = both(result.missed); lines.push({ en: `${T.en.missed}: ${b.en}.`, vn: `${T.vn.missed}: ${b.vn}.` }); }
    if (result.extra?.length) { const b = both(result.extra); lines.push({ en: `${T.en.notIn}: ${b.en}.`, vn: `${T.vn.notIn}: ${b.vn}.` }); }
    const ex = explainName(round);
    lines.push(...ex.lines, ex.summary);
  } else if (round.mode === 'classify') {
    lines.push(explainBox(round.verdict));
  } else if (round.mode === 'pure') {
    const n = round.verdict.substances.length;
    if (!result.countOk) lines.push({ en: T.en.substancesAre(n), vn: T.vn.substancesAre(n) });
    lines.push(explainPure(round.verdict));
  } else {
    lines.push(explainMagnet(round.verdict));
  }
  return (
    <Verdict ok={!!result.ok} title={result.ok ? t.correct : t.wrong}>
      {lines.map((line, i) => <p key={i}>{say(line, L)}</p>)}
    </Verdict>
  );
}

const summaryLabel = (round, t, L) => {
  const detail = round.mode === 'name' ? round.name?.en
    : round.formula ? formulaPretty(round.formula)
      : round.verdict ? round.verdict.substances.map(formulaPretty).join(' + ') : '';
  return `${t.modes[round.mode]}${detail ? `: ${detail}` : ''}${L === 'vn' && round.mode === 'name' && round.name?.vn ? ` (${round.name.vn})` : ''}`;
};

// ------------------------------------------------------------------ the task

export default function ParticleLab({ pool, onComplete, onQuit, bilingual = true }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(
    () => ((config.modes || []).some((m) => LAB_MODES.includes(m)) ? makeLabSession(config, seed) : []),
    [config, seed],
  );
  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState(EMPTY);
  const [result, setResult] = useState(null);   // this round's mark
  const [results, setResults] = useState({});   // idx -> boolean
  const [ended, setEnded] = useState(false);
  const [banked, setBanked] = useState(null);   // the best finished run before "New particles"
  const round = session[idx];
  const boxPicture = useMemo(() => (round?.particles ? boxSvg(round.particles, round.seed, BOX_OPTS) : ''), [round]);

  const L = bilingual ? lang : 'en';
  const t = T[L];

  const runOf = (res) => {
    const items = session.map((r, i) => ({ itemId: `${r.mode}-${i + 1}`, correct: !!res[i] }));
    const right = items.filter((i) => i.correct).length;
    return { items, right, score: session.length ? Math.round((right / session.length) * 10) : 0 };
  };
  const finish = () => {
    const cur = runOf(results);
    const best = banked && banked.score >= cur.score ? banked : cur;
    onComplete?.(best.score, null, { items: best.items });
  };
  const quit = () => (Object.keys(results).length || banked ? finish() : onQuit?.());

  if (!session.length) return <EmptyScreen text={t.empty} back={t.back} onQuit={onQuit} />;

  const topBar = (
    <TopBar onQuit={quit} modeTitle={say({ en: config.title, vn: config.titleVn }, L) || t.title}
      current={ended ? session.length : idx + 1} total={session.length}
      lang={bilingual ? lang : undefined} onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />
  );

  const reset = () => { setDraft(EMPTY); setResult(null); };
  const again = () => {
    const cur = runOf(results);
    setBanked((b) => (b && b.score >= cur.score ? b : cur));
    setSeed(Date.now());
    setIdx(0);
    setResults({});
    setEnded(false);
    reset();
  };

  if (ended) {
    const run = runOf(results);
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
        {topBar}
        <Summary heading={t.done} rightText={`${run.right} / ${session.length} ${t.right}`}
          rows={session.map((r, i) => ({ ok: !!results[i], label: summaryLabel(r, t, L) }))}
          againLabel={t.again} finishLabel={t.finish} onAgain={again} onFinish={finish} />
      </div>
    );
  }

  const checked = result !== null;
  const set = (patch) => { if (!checked) setDraft((d) => ({ ...d, ...patch })); };
  const record = (res) => {
    if (checked) return;
    setResult(res);
    setResults((r) => ({ ...r, [idx]: !!res.ok }));
  };
  const check = () => {
    if (round.mode === 'count') { if (countReady(round, draft)) record(markCount(round, draft)); }
    else if (round.mode === 'formula') { if (draft.typed.trim()) record(markFormula(round, draft.typed)); }
    else if (round.mode === 'build') record(markBuild(round, draft.tray));
    else if (round.mode === 'name') record(markName(round, draft.chips));
    else if (round.mode === 'pure') record(markPure(round, draft));
  };
  const answerNow = (choice, res) => { if (!checked) { setDraft((d) => ({ ...d, choice })); record(res); } };
  const next = () => {
    if (idx + 1 < session.length) { setIdx(idx + 1); reset(); }
    else setEnded(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {topBar}

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-4 lg:px-5 pb-8 flex flex-col gap-3 lg:gap-4">
        <AskHeader icon={FlaskRound} tone="bg-[#16a34a] border-[#15803d]" sub={t.modes[round.mode]}>{askOf(round, t)}</AskHeader>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-6 lg:items-start">
          <Stage round={round} draft={draft} checked={checked} result={result} boxPicture={boxPicture} L={L} t={t} />

          <div className="flex flex-col gap-3">
            <Panel key={`${seed}-${idx}`} round={round} idx={idx} draft={draft} set={set} checked={checked} result={result} L={L} t={t} check={check} answerNow={answerNow} />
            {checked && (
              <>
                <LabVerdict round={round} result={result} L={L} t={t} />
                <NextButton onClick={next}>{idx + 1 < session.length ? t.next : t.results}</NextButton>
              </>
            )}
            <ProgressDots total={session.length} idx={idx} results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
