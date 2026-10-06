// src/data/Y7_SCI/U02_8/widgets.jsx
// Widgets for 2.8 Acids and Bases, ported from the classroom deck
// (content/y7-science/U02_8/widgets.jsx).
//
//   PhDipper   Eleven everyday liquids, dipped one at a time. Decide acid,
//              neutral or alkali BEFORE the press; the press colours the paper,
//              drops a marker onto the 1–14 scale and prints the number. A
//              stepper: nothing appears until it is pressed, so a slide full of
//              answers never spoils the guessing. Walking the list left to right
//              also walks the scale from pH 2 to pH 13.
//
// WHAT CHANGED IN THE PORT
//  · The colours come from utils/phLab.js (SCALE), the same list the pH Lab and
//    the deck's `ph` activities draw with, so a student never sees two scales.
//    The numbers are the classroom's, unchanged.
//  · AcidSnap (a whole-room call-out game with a presenter clicker) does not
//    port: its twelve cards became the deck's Acid Snap `order` activity and
//    the pH Lab's catalogue.
//  · "Say it, then dip the paper" → "Decide, then dip the paper": a student
//    alone has no one to say it to.
//
// A showcase slide hands a widget a short wide box, so the stage is ONE wide
// SVG (text scales with the panel) and only the buttons are HTML. The SVG opens
// with a white plate, so it reads the same on a light or dark slide. The scale
// is sized to end inside the 1120 frame (14 cells of 60 from x=240 ends at
// 1080), and every label is sized against its Vietnamese twin.
import { useState } from 'react';
import { Undo2, RotateCcw, ArrowRight, Droplet } from 'lucide-react';
import { SCALE, phColour, kindOf } from '../../../utils/phLab';

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const tr = (lang, en, vn) => (lang === 'vn' ? vn : en);

const VERDICT = {
  acid: { en: 'ACID', vn: 'AXIT', colour: '#c0392b' },
  neutral: { en: 'NEUTRAL', vn: 'TRUNG TÍNH', colour: '#2f8f3f' },
  alkali: { en: 'ALKALI', vn: 'KIỀM', colour: '#2c6fbb' },
};

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
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  );
}

// In pH order, so the marker walks the scale from left to right.
const LIQUIDS = [
  { en: 'lemon juice', vn: 'nước chanh', ph: 2 },
  { en: 'vinegar', vn: 'giấm', ph: 3 },
  { en: 'orange juice', vn: 'nước cam', ph: 4 },
  { en: 'black coffee', vn: 'cà phê đen', ph: 5 },
  { en: 'milk', vn: 'sữa', ph: 6 },
  { en: 'pure water', vn: 'nước tinh khiết', ph: 7 },
  { en: 'sea water', vn: 'nước biển', ph: 8 },
  { en: 'baking soda', vn: 'bột nở', ph: 9 },
  { en: 'soap', vn: 'nước xà phòng', ph: 10 },
  { en: 'limewater', vn: 'nước vôi trong', ph: 12 },
  { en: 'oven cleaner', vn: 'nước tẩy lò', ph: 13 },
];

const CELL_W = 60;
const cellX = (n) => 240 + (n - 1) * CELL_W;

export function PhDipper({ lang = 'en' }) {
  const [i, setI] = useState(0);
  const [wet, setWet] = useState(false);

  const liquid = LIQUIDS[i];
  const v = VERDICT[kindOf(liquid.ph)];
  const paper = wet ? phColour(liquid.ph) : '#e8edf1';
  const last = i === LIQUIDS.length - 1;

  const advance = () => {
    if (!wet) { setWet(true); return; }
    if (!last) { setI((n) => n + 1); setWet(false); }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          {/* the liquid, in a beaker */}
          <rect x="16" y="16" width="252" height="262" rx="18" fill="#f4f7f9" stroke="#cfd8dc" strokeWidth="3" />
          <path d="M 103 74 v 120 q 0 13 13 13 h 52 q 13 0 13 -13 v -120" fill="#ffffff" stroke="#6b7a86" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 103 118 v 76 q 0 13 13 13 h 52 q 13 0 13 -13 v -76 Z" fill={wet ? phColour(liquid.ph) : '#dbe6ec'} />
          <path d="M 103 74 v 120 q 0 13 13 13 h 52 q 13 0 13 -13 v -120" fill="none" stroke="#6b7a86" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 93 71 q 10 8 20 3" fill="none" stroke="#6b7a86" strokeWidth="3.5" strokeLinecap="round" />
          <text x="142" y="254" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">
            {tr(lang, liquid.en, liquid.vn)}
          </text>

          {/* the paper */}
          <rect x="282" y="16" width="192" height="262" rx="18" fill="#f4f7f9" stroke="#cfd8dc" strokeWidth="3" />
          <path d="M 356 54 h 44 v 170 h -44 Z" fill="#e8edf1" stroke="#6b7a86" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 356 140 h 44 v 84 h -44 Z" fill={paper} stroke="#6b7a86" strokeWidth="3" strokeLinejoin="round" />
          {!wet && <text x="378" y="196" fontFamily={FONT} fontSize="54" fontWeight="bold" fill="#aeb9c2" textAnchor="middle">?</text>}
          <text x="378" y="254" fontFamily={FONT} fontSize="22" fill={MUTED} textAnchor="middle">
            {tr(lang, 'indicator paper', 'giấy chỉ thị')}
          </text>

          {/* the verdict */}
          <rect x="488" y="16" width="616" height="262" rx="18" fill={wet ? '#fdf1e3' : '#f4f7f9'} stroke={wet ? KEY : '#cfd8dc'} strokeWidth="3" />
          {wet ? (
            <>
              <text x="796" y="122" fontFamily={FONT} fontSize="96" fontWeight="bold" fill={v.colour} textAnchor="middle">
                {tr(lang, v.en, v.vn)}
              </text>
              <text x="796" y="218" fontFamily={FONT} fontSize="76" fontWeight="bold" fill={INK} textAnchor="middle">
                pH {liquid.ph}
              </text>
              <text x="796" y="258" fontFamily={FONT} fontSize="26" fill={MUTED} textAnchor="middle">
                {liquid.ph < 7
                  ? tr(lang, 'below 7', 'nhỏ hơn 7')
                  : liquid.ph > 7
                    ? tr(lang, 'above 7', 'lớn hơn 7')
                    : tr(lang, 'exactly 7', 'đúng bằng 7')}
              </text>
            </>
          ) : (
            <>
              <text x="796" y="130" fontFamily={FONT} fontSize="38" fontWeight="bold" fill="#9aa5ae" textAnchor="middle">
                {tr(lang, 'Acid, neutral or alkali?', 'Axit, trung tính hay kiềm?')}
              </text>
              <text x="796" y="200" fontFamily={FONT} fontSize="32" fill="#aeb9c2" textAnchor="middle">
                {tr(lang, 'Decide, then dip the paper.', 'Quyết định, rồi nhúng giấy.')}
              </text>
            </>
          )}

          {/* the scale */}
          {SCALE.map((c) => (
            <rect key={c.pH} x={cellX(c.pH)} y="330" width={CELL_W} height="60" fill={c.colour} stroke="#ffffff" strokeWidth="2" />
          ))}
          {SCALE.map((c) => (
            <text key={c.pH} x={cellX(c.pH) + CELL_W / 2} y="372" fontFamily={FONT} fontSize="28" fontWeight="bold" fill={c.pH === 6 || c.pH === 5 ? INK : '#ffffff'} textAnchor="middle">
              {c.pH}
            </text>
          ))}
          <text x="140" y="372" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={INK} textAnchor="middle">
            {tr(lang, 'pH scale', 'thang pH')}
          </text>
          {wet && (
            <g>
              <path d={`M ${cellX(liquid.ph) + CELL_W / 2} 322 l -18 -24 h 36 Z`} fill={INK} />
              <rect x={cellX(liquid.ph) - 2} y="328" width={CELL_W + 4} height="64" fill="none" stroke={INK} strokeWidth="5" />
            </g>
          )}
          <text x="560" y="428" fontFamily={FONT} fontSize="24" fill={MUTED} textAnchor="middle">
            {tr(lang, 'red = acid  ·  green = neutral  ·  blue and purple = alkali', 'đỏ = axit  ·  xanh lá = trung tính  ·  xanh dương và tím = kiềm')}
          </text>
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={i === 0 && !wet} onClick={() => (wet ? setWet(false) : (setI((n) => n - 1), setWet(true)))}>
          {tr(lang, 'Back', 'Lùi')}
        </Btn>
        <Btn tone="orange" icon={wet ? ArrowRight : Droplet} disabled={wet && last} onClick={advance}>
          {wet ? tr(lang, 'Next liquid', 'Chất tiếp theo') : tr(lang, 'Dip the paper', 'Nhúng giấy')}
        </Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={i === 0 && !wet} onClick={() => { setI(0); setWet(false); }}>
          {tr(lang, 'Start again', 'Làm lại')}
        </Btn>
      </div>
    </div>
  );
}
