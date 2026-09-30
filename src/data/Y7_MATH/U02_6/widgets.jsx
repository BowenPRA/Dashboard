// src/data/Y7_MATH/U02_6/widgets.jsx
// The "say it before you press" stepper for 2.6 Inequalities, ported from the
// classroom deck (content/y7-math/U02_6/widgets.jsx).
//
//   ShowIt   An inequality drawn on a number line, one part per press: the
//            open circle, the arrow, then the integers that work lit up green
//            with the smallest (or largest) one named. The student says each
//            part BEFORE pressing. Two sets, one per slide: ShowOne (positive
//            numbers — it follows the "3 or 4?" vote) and ShowTwo (negative
//            numbers and one decimal — where "less than" going LEFT is the
//            whole difficulty, and the circle for 2.5 sits between two ticks).
//
// Changed from the classroom: each set has its own arrowhead marker id, so the
// two can sit on one page, and the list of integers is its own <text> (no
// <tspan>).
//
// The classroom's room game, Could It Be?, is not ported: in the self-study
// deck it is a scored `sort` activity (slide 19), and the Quick Fire task deals
// the cards (its `couldbe` mode).
//
// A showcase slide hands a widget no isDisplayMode, so the stage is ONE SVG
// (text scales with the panel) and only the buttons are HTML. It opens with a
// white plate.
import { useState } from 'react';
import { Undo2, ArrowRight, SkipForward } from 'lucide-react';

const INK = '#2b2b2b';
const KEY = '#c25e12';
const GREEN = '#4a8b23';
const MUTED = '#5b6770';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const MINUS = '−';

const tr = (lang, en, vn) => (lang === 'vn' ? vn : en);
const num = (v) => (v < 0 ? `${MINUS}${-v}` : `${v}`);

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
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tones[tone] ? tone : 'teal']}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  );
}

// `op` is '>' or '<'; `n` is the number (a decimal is allowed: its circle sits
// between two ticks). The line shows ten intervals around n.
const SETS = {
  one: [
    { L: 'x', op: '>', n: 3 },
    { L: 'x', op: '<', n: 5 },
    { L: 'y', op: '>', n: 0 },
    { L: 'm', op: '<', n: 8 },
  ],
  two: [
    { L: 't', op: '<', n: -2 },
    { L: 'x', op: '>', n: -4 },
    { L: 'y', op: '<', n: 0 },
    { L: 'p', op: '>', n: 2.5 },
  ],
};

const LINE_Y = 250;
const X0 = 110;
const X1 = 1010;
const LAST = 3;

function ShowIt({ lang = 'en', set }) {
  const list = SETS[set];
  const [which, setWhich] = useState(0);
  const [step, setStep] = useState(0);
  const p = list[which];
  const greater = p.op === '>';
  const lo = Math.floor(p.n) - 4;
  const hi = lo + 10;
  const xof = (v) => X0 + ((v - lo) * (X1 - X0)) / (hi - lo);
  const ticks = [];
  for (let v = lo; v <= hi; v += 1) ticks.push(v);

  // The integers that work, and the first one away from the circle.
  const works = ticks.filter((v) => (greater ? v > p.n : v < p.n));
  const edge = greater ? Math.floor(p.n) + 1 : Math.ceil(p.n) - 1;
  const list3 = `${(greater ? [edge, edge + 1, edge + 2] : [edge, edge - 1, edge - 2]).map(num).join(', ')}, …`;
  const nText = num(p.n);
  const markerId = `u26-w-arr-${set}`;

  const cx = xof(p.n);
  const cy = LINE_Y - 46;

  let line = null;
  if (step === 0) {
    line = (
      <text x="560" y="400" fontFamily={FONT} fontSize="36" fill="#9aa5ae" textAnchor="middle">
        {tr(lang, `Where is ${nText}? Is ${nText} included?`, `${nText} ở đâu? ${nText} có được tính không?`)}
      </text>
    );
  } else if (step === 1) {
    line = (
      <text x="560" y="400" fontFamily={FONT} fontSize="40" fontWeight="bold" fill={KEY} textAnchor="middle">
        {tr(lang, `Open circle: ${nText} is not included.`, `Vòng tròn rỗng: không tính ${nText}.`)}
      </text>
    );
  } else if (step === 2) {
    line = (
      <text x="560" y="400" fontFamily={FONT} fontSize="40" fontWeight="bold" fill={KEY} textAnchor="middle">
        {greater
          ? tr(lang, 'Greater than: the arrow goes right.', 'Lớn hơn: mũi tên sang phải.')
          : tr(lang, 'Less than: the arrow goes left.', 'Nhỏ hơn: mũi tên sang trái.')}
      </text>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill={KEY} />
            </marker>
          </defs>
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="560" y="86" fontFamily={FONT} fontSize="64" fontWeight="bold" fill={INK} textAnchor="middle">
            {p.L} {p.op} {nText}
          </text>
          <text x="1096" y="52" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{which + 1} / {list.length}</text>

          {/* the number line */}
          <path d={`M ${X0 - 30} ${LINE_Y} H ${X1 + 30}`} fill="none" stroke={INK} strokeWidth="4" />
          {ticks.map((v) => (
            <g key={v}>
              <path d={`M ${xof(v)} ${LINE_Y - 14} V ${LINE_Y + 14}`} fill="none" stroke={INK} strokeWidth="4" />
              <text x={xof(v)} y={LINE_Y + 56} fontFamily={FONT} fontSize="36" fill={INK} textAnchor="middle">{num(v)}</text>
            </g>
          ))}

          {/* the integers that work */}
          {step >= LAST && works.map((v) => <circle key={`d${v}`} cx={xof(v)} cy={LINE_Y} r="13" fill={GREEN} />)}

          {/* the arrow, then the open circle on top of it */}
          {step >= 2 && (
            <path
              d={greater ? `M ${cx + 18} ${cy} H ${X1 + 26}` : `M ${cx - 18} ${cy} H ${X0 - 26}`}
              fill="none" stroke={KEY} strokeWidth="7" markerEnd={`url(#${markerId})`}
            />
          )}
          {step >= 1 && (
            <g>
              <path d={`M ${cx} ${cy + 17} V ${LINE_Y - 8}`} fill="none" stroke={KEY} strokeWidth="3" strokeDasharray="6 6" />
              <circle cx={cx} cy={cy} r="17" fill="#ffffff" stroke={KEY} strokeWidth="6" />
            </g>
          )}

          {step < LAST && line}
          {step === LAST && (
            <g>
              <rect x="110" y="344" width="900" height="84" rx="16" fill="#eef6e6" stroke={GREEN} strokeWidth="3" />
              <text x="620" y="400" fontFamily={FONT} fontSize="38" fontWeight="bold" fill={GREEN} textAnchor="end">
                {greater ? tr(lang, 'Smallest integer: ', 'Số nguyên nhỏ nhất: ') : tr(lang, 'Largest integer: ', 'Số nguyên lớn nhất: ')}
                {num(edge)}
              </text>
              <text x="660" y="400" fontFamily={FONT} fontSize="32" fontWeight="bold" fill={MUTED} textAnchor="start">{list3}</text>
            </g>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          {tr(lang, 'Back', 'Lùi')}
        </Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={step === LAST} onClick={() => setStep((s) => Math.min(LAST, s + 1))}>
          {step === 2 ? tr(lang, 'Integers', 'Số nguyên') : tr(lang, 'Next step', 'Bước tiếp')}
        </Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % list.length); setStep(0); }}>
          {tr(lang, 'Next question', 'Câu tiếp')}
        </Btn>
      </div>
    </div>
  );
}

export function ShowOne({ lang }) { return <ShowIt lang={lang} set="one" />; }
export function ShowTwo({ lang }) { return <ShowIt lang={lang} set="two" />; }
