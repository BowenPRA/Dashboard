// src/data/Y7_SCI/U03_1/widgets.jsx
// Widgets for 3.1 Gravity, Weight and Mass, ported from the classroom deck
// (content/y7-science/U03_1/widgets.jsx). English and French only.
//
//   Apollo15Clip   David Scott drops a hammer and a feather on the Moon, 1971.
//   MoonJumpClip   Two Apollo 16 astronauts bounding down a slope, a silent loop.
//                  Both are public-domain NASA film, served from public/ so
//                  they play offline once cached.
//   DropRace       The same 5 m drop on the Earth and on the Moon, side by side.
//                  Each lane drops a heavy thing and a light thing together and
//                  leaves a dot every 0.2 s, so the gaps can be SEEN growing:
//                  1.0 s on Earth, 2.5 s on the Moon. Drop, or Slow motion.
//   PlanetScales   Tap a planet: its strength of gravity appears with "80 × g".
//                  Work out Mr Bowen's weight, then Show. His mass sits beside
//                  it and never changes.
//
// WHAT CHANGED IN THE PORT
//  · VacuumClip (the BBC's vacuum chamber) does not port: it is a YouTube clip
//    of BBC film (pairing rule 8). Apollo 15 makes the same point with NASA's
//    own footage, and the deck's predict asks the question before it plays.
//  · MassOrWeight (the book's Activity, played as a left-hand / right-hand vote
//    for the whole room) does not port: its sentences are the deck's `sort`
//    activity on slide 20, which a student alone can score.
//  · Videos come from public/images/Y7_SCI/U03_1/ through assetUrl, not an
//    `import`; the strings go through tr(lang, en, null, fr).
//
// A showcase slide hands a widget a short wide box, so each stage is ONE wide
// SVG with a white plate (its text scales with the panel and reads on a light
// or dark slide); only the buttons are HTML.
import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Turtle, RotateCcw, Eye } from 'lucide-react';
import { assetUrl } from '../../../utils/assetPaths';
import { tr } from '../../../utils/lang';

const t = (lang, en, fr) => tr(lang, en, null, fr);

const apollo15 = assetUrl('images/Y7_SCI/U03_1/apollo15.webm');
const moonjump = assetUrl('images/Y7_SCI/U03_1/moonjump.webm');

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const RULE = '#cfd8dc';
const TEAL = '#0087a8';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

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

/* ============================================================= *
 * THE FILMS
 * ============================================================= */
// No extra frame: `showcase` already wraps the media in a padded panel. Each
// frame is sized from the HEIGHT it is given and centred.
function Film({ src, ratio, label, loop = false }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="h-full max-w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: ratio }}>
        <video
          className="w-full h-full object-contain"
          src={src}
          controls
          playsInline
          preload="metadata"
          aria-label={label}
          {...(loop ? { autoPlay: true, muted: true, loop: true } : {})}
        />
      </div>
    </div>
  );
}

export function Apollo15Clip({ lang = 'en' }) {
  return <Film src={apollo15} ratio="654 / 480" label={t(lang, 'A hammer and a feather dropped on the Moon, Apollo 15', 'Un marteau et une plume lâchés sur la Lune, Apollo 15')} />;
}

export function MoonJumpClip({ lang = 'en' }) {
  return <Film src={moonjump} ratio="854 / 640" loop label={t(lang, 'Two astronauts bounding on the Moon, Apollo 16', 'Deux astronautes qui bondissent sur la Lune, Apollo 16')} />;
}

/* ============================================================= *
 * DROP RACE — the Earth and the Moon, 5 m, side by side
 * ============================================================= */
const DROP_H = 5; // metres
const TOP = 104; // centre of an object at the start
const BOTTOM = 352; // centre of an object on the ground
const PX = (BOTTOM - TOP) / DROP_H;
const GROUND = 370;
const DOT_EVERY = 0.2;
const LANES = [
  { g: 10, x0: 20, en: 'Earth', fr: 'Terre' },
  { g: 1.6, x0: 570, en: 'Moon', fr: 'Lune' },
];
const landTime = (g) => Math.sqrt((2 * DROP_H) / g);
const T_END = landTime(1.6);
const fallen = (g, s) => Math.min(DROP_H, 0.5 * g * s * s);

// The heavy thing and the light thing in each lane.
function Bowling({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill="#e2492c" stroke={INK} strokeWidth="2.5" />
      <circle cx={x - 5} cy={y - 7} r="2.6" fill={INK} /><circle cx={x + 4} cy={y - 8} r="2.6" fill={INK} /><circle cx={x} cy={y + 3} r="2.6" fill={INK} />
    </g>
  );
}
function Football({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      <path d={`M ${x} ${y - 7} L ${x + 7} ${y - 2} L ${x + 4} ${y + 6} L ${x - 4} ${y + 6} L ${x - 7} ${y - 2} Z`} fill={INK} />
    </g>
  );
}
function Hammer({ x, y }) {
  return (
    <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
      <rect x={x - 4} y={y - 6} width="8" height="26" rx="2" fill="#b98a5a" />
      <rect x={x - 18} y={y - 16} width="36" height="12" rx="3" fill="#9aa5ae" />
    </g>
  );
}
function Feather({ x, y }) {
  return (
    <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
      <path d={`M ${x} ${y - 20} C ${x + 12} ${y - 10} ${x + 10} ${y + 8} ${x} ${y + 18} C ${x - 10} ${y + 8} ${x - 12} ${y - 10} ${x} ${y - 20} Z`} fill="#ffffff" />
      <path d={`M ${x} ${y - 16} L ${x} ${y + 22}`} fill="none" />
    </g>
  );
}

export function DropRace({ lang = 'en' }) {
  const [s, setS] = useState(0); // simulated seconds since the drop
  const [running, setRunning] = useState(false);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const drop = (rate) => {
    cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const tick = (now) => {
      const sim = ((now - t0) / 1000) * rate;
      if (sim >= T_END) { setS(T_END); setRunning(false); return; }
      setS(sim);
      raf.current = requestAnimationFrame(tick);
    };
    setS(0);
    setRunning(true);
    raf.current = requestAnimationFrame(tick);
  };
  const reset = () => { cancelAnimationFrame(raf.current); setRunning(false); setS(0); };

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          {LANES.map((lane) => {
            const { x0, g } = lane;
            const tl = landTime(g);
            const landed = s >= tl;
            const y = TOP + fallen(g, s) * PX;
            const dots = [];
            for (let k = 1; k * DOT_EVERY <= Math.min(s, tl) + 1e-9; k++) dots.push(TOP + fallen(g, k * DOT_EVERY) * PX);
            const shown = Math.min(s, tl);
            const kmh = Math.round(g * tl * 3.6);
            const heavyX = x0 + 150;
            const lightX = x0 + 240;
            return (
              <g key={lane.en}>
                <rect x={x0} y="16" width="530" height="408" rx="14" fill="#f7fafc" stroke={RULE} strokeWidth="2" />
                <text x={x0 + 24} y="56" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={INK}>{t(lang, lane.en, lane.fr)}</text>
                <text x={x0 + 506} y="56" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY} textAnchor="end">{g} N/kg</text>

                {/* height scale */}
                <line x1={x0 + 56} y1={TOP} x2={x0 + 56} y2={BOTTOM} stroke={MUTED} strokeWidth="2" />
                {[0, 1, 2, 3, 4, 5].map((m) => (
                  <g key={m}>
                    <line x1={x0 + 50} y1={TOP + m * PX} x2={x0 + 62} y2={TOP + m * PX} stroke={MUTED} strokeWidth="2" />
                    <text x={x0 + 44} y={TOP + m * PX + 6} fontFamily={FONT} fontSize="17" fill={MUTED} textAnchor="end">{m} m</text>
                  </g>
                ))}

                {/* ground */}
                <rect x={x0 + 70} y={GROUND} width="440" height="16" fill={g === 10 ? '#d9c7a5' : '#cfd2d6'} />
                <line x1={x0 + 70} y1={GROUND} x2={x0 + 510} y2={GROUND} stroke={INK} strokeWidth="3" />

                {/* a dot every 0.2 s: the gaps grow */}
                {dots.map((dy, i) => <circle key={i} cx={heavyX - 44} cy={dy} r="5" fill={KEY} />)}

                {g === 10 ? <><Bowling x={heavyX} y={y} /><Football x={lightX} y={y} /></> : <><Hammer x={heavyX} y={y} /><Feather x={lightX} y={y} /></>}

                {/* read-out */}
                <text x={x0 + 420} y="150" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{t(lang, 'time', 'temps')}</text>
                <text x={x0 + 420} y="200" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={landed ? KEY : INK} textAnchor="middle">{shown.toFixed(1)} s</text>
                {landed && (
                  <>
                    <text x={x0 + 420} y="252" fontFamily={FONT} fontSize="24" fontWeight="bold" fill={KEY} textAnchor="middle">{t(lang, 'landed!', 'au sol !')}</text>
                    <text x={x0 + 420} y="292" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{t(lang, `at ${kmh} km/h`, `à ${kmh} km/h`)}</text>
                  </>
                )}
                <text x={x0 + 290} y="410" fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="middle">{t(lang, 'one dot every 0.2 s', 'un point toutes les 0.2 s')}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="orange" icon={ArrowDown} disabled={running} onClick={() => drop(1)}>{t(lang, 'Drop', 'Lâcher')}</Btn>
        <Btn tone="teal" icon={Turtle} disabled={running} onClick={() => drop(1 / 3)}>{t(lang, 'Slow motion', 'Ralenti')}</Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={s === 0 && !running} onClick={reset}>{t(lang, 'Reset', 'Remettre')}</Btn>
      </div>
    </div>
  );
}

/* ============================================================= *
 * PLANET SCALES — Mr Bowen's weight across the Solar System
 * ============================================================= */
const MASS = 80;
const PLANETS = [
  { en: 'Mercury', fr: 'Mercure', g: 3.7, r: 15, fill: '#b5b5b5' },
  { en: 'Venus', fr: 'Vénus', g: 8.9, r: 23, fill: '#e8c27a' },
  { en: 'Earth', fr: 'Terre', g: 10, r: 24, fill: '#4f8fbf' },
  { en: 'Moon', fr: 'Lune', g: 1.6, r: 11, fill: '#d9d9d9' },
  { en: 'Mars', fr: 'Mars', g: 3.7, r: 17, fill: '#d0643b' },
  { en: 'Jupiter', fr: 'Jupiter', g: 25, r: 44, fill: '#d9a066' },
  { en: 'Saturn', fr: 'Saturne', g: 10, r: 34, fill: '#e6cf8b', ring: true },
  { en: 'Uranus', fr: 'Uranus', g: 8.7, r: 29, fill: '#8fd3e0' },
  { en: 'Neptune', fr: 'Neptune', g: 11, r: 28, fill: '#4a6fd1' },
];
const px = (i) => 70 + i * 122.5;
const weightOf = (g) => Math.round(MASS * g);

export function PlanetScales({ lang = 'en' }) {
  const [sel, setSel] = useState(null);
  const [shown, setShown] = useState(false);
  const p = sel === null ? null : PLANETS[sel];
  const pick = (i) => { setSel(i); setShown(false); };

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          {PLANETS.map((pl, i) => {
            const on = sel === null || sel === i;
            const x = px(i);
            return (
              <g key={pl.en} onClick={() => pick(i)} style={{ cursor: 'pointer' }} role="button" tabIndex={0}
                aria-label={t(lang, pl.en, pl.fr)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } }}>
                <rect x={x - 60} y="20" width="120" height="212" rx="14" fill={sel === i ? '#fdf1e3' : '#ffffff'} stroke={sel === i ? KEY : 'none'} strokeWidth="3" />
                {pl.ring && <ellipse cx={x} cy="104" rx="56" ry="11" fill="none" stroke={on ? '#b39b55' : '#d5dbe1'} strokeWidth="4" />}
                <circle cx={x} cy="104" r={pl.r} fill={on ? pl.fill : '#e5e9ed'} stroke={on ? INK : '#cfd5db'} strokeWidth="2" />
                <text x={x} y="186" fontFamily={FONT} fontSize="20" fontWeight="bold" fill={on ? INK : '#b8c1ca'} textAnchor="middle">{t(lang, pl.en, pl.fr)}</text>
                <text x={x} y="214" fontFamily={FONT} fontSize="19" fontWeight="bold" fill={on ? KEY : '#c8d0d7'} textAnchor="middle">{pl.g} N/kg</text>
              </g>
            );
          })}

          {/* mass: the same everywhere */}
          <rect x="40" y="252" width="500" height="172" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
          <text x="290" y="298" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">{t(lang, 'Mr Bowen’s mass', 'La masse de M. Bowen')}</text>
          <text x="290" y="374" fontFamily={FONT} fontSize="62" fontWeight="bold" fill={TEAL} textAnchor="middle">{MASS} kg</text>
          <text x="290" y="408" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{t(lang, 'the same on every planet', 'la même sur toutes les planètes')}</text>

          {/* weight: changes with the strength of gravity */}
          <rect x="580" y="252" width="500" height="172" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
          <text x="830" y="298" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">
            {p ? t(lang, `His weight on ${p.en}`, `Son poids sur ${p.fr}`) : t(lang, 'Tap a planet', 'Touche une planète')}
          </text>
          {p && (
            <>
              <text x="830" y="374" fontFamily={FONT} fontSize="62" fontWeight="bold" fill={shown ? KEY : '#c8d0d7'} textAnchor="middle">{shown ? `${weightOf(p.g)} N` : '? N'}</text>
              <text x="830" y="408" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{MASS} × {p.g}</text>
            </>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="orange" icon={Eye} disabled={!p || shown} onClick={() => setShown(true)}>{t(lang, 'Show weight', 'Voir le poids')}</Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={!p} onClick={() => { setSel(null); setShown(false); }}>{t(lang, 'Clear', 'Effacer')}</Btn>
      </div>
    </div>
  );
}
