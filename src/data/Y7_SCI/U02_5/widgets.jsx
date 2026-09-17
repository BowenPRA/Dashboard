// src/data/Y7_SCI/U02_5/widgets.jsx
// Widgets for 2.5 Atoms, Elements and the Periodic Table, ported from the
// classroom deck (content/y7-science/U02_5/widgets.jsx). Each does one thing a
// still slide cannot:
//
//   HalvingWidget   Democritus's question as a count. Press to halve a 1 cm
//                   gold cube and watch the width pass a grain of sand, a hair,
//                   a cell, a virus — and reach one gold atom after only 25
//                   cuts. A stepper: nothing is revealed until it is pressed,
//                   so it pays off the estimate on the slide before.
//
//   PeriodicTable   The book's first-20 table (p.54), drawn once, in four modes.
//                   Each slide gets ONE mode with one job: TableRowsCols (a
//                   period is a row, a group is a column), TableMass (lightest
//                   to heaviest, in reading order), TableMetals (yellow, then
//                   blue) and TableExplore (tap an element: its period and group
//                   light up). Whatever is highlighted keeps its colour and gains
//                   a heavy outline; everything else drops to flat grey.
//
// Changes from the classroom: the element list now comes from
// src/utils/elements.js (the same table the `periodic` activity and Element
// Hunt mark against); "Mr Bowen's gold cube" is just a 1 cm gold cube; the
// room game SymbolSnap is gone — its job is done by the deck's `periodic` and
// `sort` activities and the Element Hunt task.
//
// Showcase slides hand a widget a short wide box, so both draw their stage as
// ONE wide SVG (text scales with the panel) and keep only the buttons as HTML.
// Every SVG opens with a white plate, so it reads the same on a light or dark
// slide. Bilingual: each takes the deck's `lang`.
import { useState } from 'react';
import { Scissors, Undo2, RotateCcw, ArrowRight } from 'lucide-react';
import { FIRST_20 } from '../../../utils/elements.js';

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const GOLD = '#d4a017';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const METAL = { fill: '#fbe7a1', stroke: '#b8912a' };
const NONMETAL = { fill: '#cfe5f5', stroke: '#4f8fbf' };
const PLAIN = { fill: '#ffffff', stroke: '#8a979e' };
const OFF = { fill: '#eef1f4', stroke: '#d5dbe1', text: '#b8c1ca', name: '#c8d0d7' };

const tr = (lang, en, vn) => (lang === 'vn' ? vn : en);

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-5 lg:py-2.5 disabled:opacity-35 disabled:pointer-events-none ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  );
}

/* ============================================================= *
 * WIDGET 1 — HALF, AND HALF AGAIN
 * ============================================================= */
const LAST_CUT = 25;
const MILESTONES = [
  { n: 0, en: 'gold cube', vn: 'khối vàng', longEn: 'a 1 cm gold cube', longVn: 'khối vàng rộng 1 cm' },
  { n: 3, en: 'sand', vn: 'hạt cát', longEn: 'a grain of sand', longVn: 'một hạt cát' },
  { n: 7, en: 'hair', vn: 'sợi tóc', longEn: 'as thin as a hair', longVn: 'mỏng như sợi tóc' },
  { n: 9, en: 'cell', vn: 'tế bào', longEn: 'one cell (Unit 1)', longVn: 'một tế bào (Chương 1)' },
  { n: 13, en: 'bacterium', vn: 'vi khuẩn', longEn: 'a bacterium', longVn: 'một vi khuẩn' },
  { n: 17, en: 'virus', vn: 'vi-rút', longEn: 'a virus', longVn: 'một vi-rút' },
  { n: 25, en: 'atom', vn: 'nguyên tử', longEn: 'ONE GOLD ATOM', longVn: 'MỘT NGUYÊN TỬ VÀNG' },
];

// 10 mm halved n times, written out in full so the zeros do the work:
// 0.0000003 mm.
function widthMm(n) {
  const v = 10 / 2 ** n;
  if (v >= 1) return String(Number(v.toPrecision(3)));
  const digits = -Math.floor(Math.log10(v)) + 1;
  return v.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '');
}

const trackX = (k) => 60 + k * 40;

export function HalvingWidget({ lang = 'en' }) {
  const [n, setN] = useState(0);
  const here = MILESTONES.find((m) => m.n === n);

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          {/* counter */}
          <rect x="20" y="16" width="340" height="262" rx="18" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
          <text x="190" y="66" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={INK} textAnchor="middle">{tr(lang, 'Cut in half', 'Cắt đôi')}</text>
          <text x="190" y="214" fontFamily={FONT} fontSize="140" fontWeight="bold" fill={KEY} textAnchor="middle">{n}</text>
          <text x="190" y="260" fontFamily={FONT} fontSize="30" fill={INK} textAnchor="middle">{tr(lang, n === 1 ? 'time' : 'times', 'lần')}</text>

          {/* width read-out */}
          <text x="740" y="70" fontFamily={FONT} fontSize="28" fill={MUTED} textAnchor="middle">{tr(lang, 'How wide?', 'Rộng bao nhiêu?')}</text>
          <text x="740" y="160" fontFamily={FONT} fontSize="76" fontWeight="bold" fill={INK} textAnchor="middle">{widthMm(n)} mm</text>
          {here ? (
            <text x="740" y="236" fontFamily={FONT} fontSize={n === LAST_CUT ? 46 : 38} fontWeight="bold" fill={KEY} textAnchor="middle">
              {n === 0 ? tr(lang, here.longEn, here.longVn) : `≈ ${tr(lang, here.longEn, here.longVn)}`}
            </text>
          ) : (
            <text x="740" y="236" fontFamily={FONT} fontSize="34" fill="#9aa5ae" textAnchor="middle">{tr(lang, 'Keep cutting…', 'Cắt tiếp…')}</text>
          )}

          {/* track */}
          <line x1={trackX(0)} y1="330" x2={trackX(LAST_CUT)} y2="330" stroke="#d5dbe1" strokeWidth="6" strokeLinecap="round" />
          {n > 0 && <line x1={trackX(0)} y1="330" x2={trackX(n)} y2="330" stroke={GOLD} strokeWidth="6" strokeLinecap="round" />}
          {Array.from({ length: LAST_CUT + 1 }, (_, k) => {
            const big = MILESTONES.some((m) => m.n === k);
            return <circle key={k} cx={trackX(k)} cy="330" r={big ? 9 : 5} fill={k <= n ? GOLD : '#c3cbd2'} stroke="#ffffff" strokeWidth="2" />;
          })}
          <rect x={trackX(n) - 13} y="290" width="26" height="26" rx="4" fill={GOLD} stroke="#8a6a00" strokeWidth="2" />

          {MILESTONES.map((m, i) => {
            const y = i % 2 === 0 ? 380 : 414;
            const reached = m.n <= n;
            const anchor = m.n === 0 ? 'start' : m.n === LAST_CUT ? 'end' : 'middle';
            const lx = m.n === 0 ? 44 : m.n === LAST_CUT ? 1076 : trackX(m.n);
            return (
              <g key={m.n}>
                <line x1={trackX(m.n)} y1="341" x2={trackX(m.n)} y2={y - 22} stroke={reached ? KEY : '#c3cbd2'} strokeWidth="2" />
                <text x={lx} y={y} fontFamily={FONT} fontSize="22" fontWeight={reached ? 'bold' : 'normal'} fill={reached ? KEY : '#9aa5ae'} textAnchor={anchor}>
                  {tr(lang, m.en, m.vn)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={n === 0} onClick={() => setN((v) => Math.max(0, v - 1))}>{tr(lang, 'Back', 'Lùi')}</Btn>
        <Btn tone="orange" icon={Scissors} disabled={n === LAST_CUT} onClick={() => setN((v) => Math.min(LAST_CUT, v + 1))}>{tr(lang, 'Cut in half', 'Cắt đôi')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={n === 0} onClick={() => setN(0)}>{tr(lang, 'Start again', 'Làm lại')}</Btn>
      </div>
    </div>
  );
}

/* ============================================================= *
 * WIDGET 2 — THE FIRST 20 ELEMENTS
 * ============================================================= */
// Layout of the book's table: two wide columns, a strip of ten narrow empty
// cells in period 4, six wide columns; hydrogen floats above the gap. The
// status line sits above it, so the table starts lower than elements.js's.
const X0 = 120, Y0 = 90, CW = 88, CH = 86, TW = 26;
const colX = (g) => (g <= 2 ? X0 + (g - 1) * CW : X0 + 2 * CW + 10 * TW + (g - 3) * CW);
const rowY = (p) => Y0 + (p - 1) * CH;
const posOf = (el) => (el.sym === 'H' ? { x: X0 + 2 * CW + 52, y: rowY(1) } : { x: colX(el.group), y: rowY(el.period) });
const RIGHT = colX(8) + CW;

const BLANKS = [
  ...Array.from({ length: 10 }, (_, k) => ({ x: X0 + 2 * CW + k * TW, w: TW })),
  ...[3, 4, 5, 6, 7, 8].map((g) => ({ x: colX(g), w: CW })),
];

const bookColour = (el) => (el.metal ? METAL : NONMETAL);

const periodBand = (p) => ({ x: X0 - 8, y: rowY(p) - 8, w: RIGHT - X0 + 16, h: CH + 16 });
function groupBand(g) {
  const top = g === 8 ? 1 : 2;
  return { x: colX(g) - 8, y: rowY(top) - 8, w: CW + 16, h: (5 - top) * CH + 16 };
}

function PeriodicTable({ lang = 'en', mode }) {
  const [sel, setSel] = useState(null); // rowscols: { kind, idx }; explore: z
  const [step, setStep] = useState(0); // mass: 0..20; metals: 0..3

  // What each tile looks like, and what the status line says, for this mode.
  let look = () => ({ ...PLAIN, text: INK, name: MUTED, sw: 1.5 });
  let status = '';
  let bands = [];

  if (mode === 'rowscols') {
    const inSel = (el) => (sel?.kind === 'period' ? el.period === sel.idx : el.group === sel?.idx);
    if (sel) {
      look = (el) => (inSel(el) ? { ...PLAIN, text: INK, name: MUTED, sw: 2.5, stroke: INK } : { ...OFF, sw: 1.5 });
      bands = [sel.kind === 'period' ? periodBand(sel.idx) : groupBand(sel.idx)];
    }
    status = !sel
      ? tr(lang, 'The first 20 elements', '20 nguyên tố đầu tiên')
      : sel.kind === 'period'
        ? tr(lang, `A row is called a period · period ${sel.idx}`, `Một hàng gọi là một chu kì · chu kì ${sel.idx}`)
        : tr(lang, `A column is called a group · group ${sel.idx}`, `Một cột gọi là một nhóm · nhóm ${sel.idx}`);
  }

  if (mode === 'mass') {
    look = (el) =>
      el.z === step
        ? { fill: '#fdf1e3', stroke: KEY, sw: 5, text: INK, name: MUTED }
        : el.z < step
          ? { ...PLAIN, text: INK, name: MUTED, sw: 1.5 }
          : { ...OFF, sw: 1.5 };
    const cur = FIRST_20[step - 1];
    status = step === 0
      ? tr(lang, 'Press Next atom: the lightest atom first', 'Bấm Nguyên tử tiếp: nguyên tử nhẹ nhất trước')
      : `${step}. ${cur.en}${lang === 'vn' ? ` (${cur.vn})` : ''}` +
        (step === 1 ? tr(lang, ' — the lightest', ' — nhẹ nhất') : step === 20 ? tr(lang, ' — the heaviest here', ' — nặng nhất ở đây') : '');
  }

  if (mode === 'metals') {
    const on = (el) => step === 3 || (step === 1 && el.metal) || (step === 2 && !el.metal);
    look = (el) =>
      step === 0
        ? { ...PLAIN, text: INK, name: MUTED, sw: 1.5 }
        : on(el)
          ? { ...bookColour(el), text: INK, name: MUTED, sw: step === 3 ? 1.5 : 2.5 }
          : { ...OFF, sw: 1.5 };
    status = [
      tr(lang, 'Metals and non-metals', 'Kim loại và phi kim'),
      tr(lang, 'Metals: the yellow boxes', 'Kim loại: các ô màu vàng'),
      tr(lang, 'Non-metals: the blue boxes', 'Phi kim: các ô màu xanh'),
      tr(lang, 'Similar elements sit close together', 'Các nguyên tố giống nhau nằm gần nhau'),
    ][step];
  }

  if (mode === 'explore') {
    const picked = FIRST_20.find((el) => el.z === sel);
    look = (el) => {
      if (!picked) return { ...bookColour(el), text: INK, name: MUTED, sw: 1.5 };
      if (el.z === picked.z) return { ...bookColour(el), stroke: KEY, sw: 5, text: INK, name: MUTED };
      const related = el.period === picked.period || (picked.group && el.group === picked.group);
      return related ? { ...bookColour(el), text: INK, name: MUTED, sw: 1.5 } : { ...OFF, sw: 1.5 };
    };
    if (picked) {
      bands = [periodBand(picked.period), ...(picked.group ? [groupBand(picked.group)] : [])];
      const where = picked.group
        ? tr(lang, `period ${picked.period}, group ${picked.group}`, `chu kì ${picked.period}, nhóm ${picked.group}`)
        : tr(lang, `period ${picked.period}, no group`, `chu kì ${picked.period}, không thuộc nhóm nào`);
      status = `${picked.sym} · ${picked.en}${lang === 'vn' ? ` (${picked.vn})` : ''} · ${where} · ` +
        (picked.metal ? tr(lang, 'a metal', 'kim loại') : tr(lang, 'a non-metal', 'phi kim'));
    } else {
      status = tr(lang, 'Tap an element', 'Chạm vào một nguyên tố');
    }
  }

  const blankOff = (mode === 'rowscols' && sel) || mode === 'mass' || (mode === 'metals' && step > 0 && step < 3) || (mode === 'explore' && sel);
  const tap = (z) => setSel((cur) => (cur === z ? null : z));
  const cycle = (kind, max) => setSel((cur) => ({ kind, idx: cur?.kind === kind ? (cur.idx % max) + 1 : 1 }));

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="450" rx="14" fill="#ffffff" />
          <text x="560" y="54" fontFamily={FONT} fontSize={mode === 'explore' && sel ? 28 : 32} fontWeight="bold" fill={INK} textAnchor="middle">{status}</text>

          {BLANKS.map((b, i) => (
            <rect key={`b${i}`} x={b.x} y={rowY(4)} width={b.w} height={CH} fill={blankOff ? '#f7f8fa' : '#ffffff'} stroke={blankOff ? '#e1e6ea' : '#b9c3c9'} strokeWidth="1.5" />
          ))}

          {FIRST_20.map((el) => {
            const { x, y } = posOf(el);
            const s = look(el);
            return (
              <g key={el.z} onClick={mode === 'explore' ? () => tap(el.z) : undefined} style={mode === 'explore' ? { cursor: 'pointer' } : undefined}>
                <rect x={x} y={y} width={CW} height={CH} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} />
                <text x={x + CW / 2} y={y + 47} fontFamily={FONT} fontSize="34" fontWeight="bold" fill={s.text} textAnchor="middle">{el.sym}</text>
                <text x={x + CW / 2} y={y + 72} fontFamily={FONT} fontSize="13.5" fill={s.name} textAnchor="middle">{el.en}</text>
              </g>
            );
          })}

          {/* Re-draw the focused tile's outline on top, so its neighbours cannot cover it. */}
          {FIRST_20.filter((el) => look(el).sw >= 5).map((el) => {
            const { x, y } = posOf(el);
            return <rect key={`f${el.z}`} x={x} y={y} width={CW} height={CH} fill="none" stroke={KEY} strokeWidth="5" pointerEvents="none" />;
          })}

          {bands.map((b, i) => (
            <rect key={`band${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx="12" fill="none" stroke={KEY} strokeWidth={mode === 'explore' ? 3 : 5} strokeDasharray={mode === 'explore' ? '10 7' : undefined} pointerEvents="none" />
          ))}

          {mode === 'mass' && FIRST_20.filter((el) => el.z <= step).map((el) => {
            const { x, y } = posOf(el);
            return (
              <g key={`n${el.z}`} pointerEvents="none">
                <circle cx={x + 17} cy={y + 17} r="13" fill={KEY} />
                <text x={x + 17} y={y + 22} fontFamily={FONT} fontSize="15" fontWeight="bold" fill="#ffffff" textAnchor="middle">{el.z}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        {mode === 'rowscols' && (
          <>
            <Btn tone="orange" icon={ArrowRight} onClick={() => cycle('period', 4)}>{tr(lang, 'Next row', 'Hàng tiếp')}</Btn>
            <Btn tone="orange" icon={ArrowRight} onClick={() => cycle('group', 8)}>{tr(lang, 'Next column', 'Cột tiếp')}</Btn>
            <Btn tone="slate" icon={RotateCcw} disabled={!sel} onClick={() => setSel(null)}>{tr(lang, 'Clear', 'Xóa')}</Btn>
          </>
        )}
        {mode === 'mass' && (
          <>
            <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((v) => Math.max(0, v - 1))}>{tr(lang, 'Back', 'Lùi')}</Btn>
            <Btn tone="orange" icon={ArrowRight} disabled={step === 20} onClick={() => setStep((v) => Math.min(20, v + 1))}>{tr(lang, 'Next atom', 'Nguyên tử tiếp')}</Btn>
            <Btn tone="teal" icon={RotateCcw} disabled={step === 0} onClick={() => setStep(0)}>{tr(lang, 'Start again', 'Làm lại')}</Btn>
          </>
        )}
        {mode === 'metals' && (
          <>
            <Btn tone="orange" icon={ArrowRight} disabled={step === 3} onClick={() => setStep((v) => Math.min(3, v + 1))}>{tr(lang, 'Next', 'Tiếp')}</Btn>
            <Btn tone="teal" icon={RotateCcw} disabled={step === 0} onClick={() => setStep(0)}>{tr(lang, 'Start again', 'Làm lại')}</Btn>
          </>
        )}
        {mode === 'explore' && (
          <Btn tone="slate" icon={RotateCcw} disabled={!sel} onClick={() => setSel(null)}>{tr(lang, 'Clear', 'Xóa')}</Btn>
        )}
      </div>
    </div>
  );
}

export function TableRowsCols({ lang }) { return <PeriodicTable lang={lang} mode="rowscols" />; }
export function TableMass({ lang }) { return <PeriodicTable lang={lang} mode="mass" />; }
export function TableMetals({ lang }) { return <PeriodicTable lang={lang} mode="metals" />; }
export function TableExplore({ lang }) { return <PeriodicTable lang={lang} mode="explore" />; }
