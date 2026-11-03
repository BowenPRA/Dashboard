// src/data/Y7_SCI/U03_7/widgets.jsx
// Three models for 3.7 Where Does Energy Go?, ported from the classroom deck
// (content/y7-science/U03_7/petrol.jsx, jobs.jsx, spread.jsx). English and
// French only, so every string goes through t(lang, en, fr). The fourth, the
// bag story, is in story.jsx.
//
//   PetrolStepper   Mr Bowen buys 100 000 đồng of petrol: four blocks of
//                   25 000 đ. Each press sends ONE block somewhere — the exhaust,
//                   the bike moves, the engine, rubbing parts and noise — so only
//                   a quarter moves the bike (the book's 25%, page 118). The
//                   useful block comes second, so a first "yes" is already wrong.
//   ThreeProcesses  The book's Getting started (page 117): burning wood to cook,
//                   walking up stairs, cycling on a flat road. One press fills
//                   one row in all three diagrams: from, useful, wasted.
//   HeatSpread      Mr Bowen's coffee: its extra heat is 40 red dots. Each press
//                   moves the clock on; the dots spread out into the room and
//                   never come back (going Back jumps, so the screen never shows
//                   heat gathering back into the coffee).
//
// WHAT CHANGED IN THE PORT: `tr` comes from utils/lang, the house button and
// mulberry32 from ./ui.jsx, the art from ./art.js; the "thumbs" and "say it to
// your partner" prompts became a student deciding alone. Nothing else changed.
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../utils/lang'
import { Btn, Pic, mulberry32 } from './ui.jsx'
import {
  INK, MUTED, FONT, RED, BLUE, USEFUL, WASTED,
  motorbike, squiggles, noise, arrow, potFire, stairs, cyclist, mug, thermometer,
} from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1'
const BLUE_HL = '#1a5fa8'

/* ── PetrolStepper ─────────────────────────────────────────────────────── */

const PETROL = '#f6c445'
// Where each block goes, in the order it leaves the tank (top first).
const DEST = ['heat', 'move', 'heat', 'heat']
const P_STAGES = [
  { en: 'Mr Bowen buys 100 000 đ of petrol.', fr: 'M. Bowen achète 100 000 đ d’essence.' },
  { en: '25 000 đ: the exhaust pipe gets hot.', fr: '25 000 đ : le pot d’échappement chauffe.' },
  { en: '25 000 đ: the bike moves!', fr: '25 000 đ : la moto avance !' },
  { en: '25 000 đ: the engine gets hot.', fr: '25 000 đ : le moteur chauffe.' },
  { en: '25 000 đ: rubbing parts get hot, and the noise.', fr: '25 000 đ : des pièces frottent et chauffent, et le bruit.' },
]
const BX = 290, BY = 316, BS = 1.2
const ROAD = BY + 92 * BS
const BLOCK = { w: 170, h: 58, gap: 12 }
const TANK = { x: 630, y: 128, w: 200 }
const BIN_MOVE = { x: 868, w: 280 }
const BIN_HEAT = { x: 1186, w: 290 }
const BOX_H = 4 * BLOCK.h + 3 * BLOCK.gap + 30
const slotY = (fromBottom) => TANK.y + 15 + (3 - fromBottom) * (BLOCK.h + BLOCK.gap)

// Block i's place at stage k: still in the tank, or in its bin.
function place(i, k) {
  if (i >= k) return { x: TANK.x + (TANK.w - BLOCK.w) / 2, y: slotY(3 - i), where: 'tank' }
  const dest = DEST[i]
  const before = DEST.slice(0, i).filter((d) => d === dest).length
  const bin = dest === 'move' ? BIN_MOVE : BIN_HEAT
  return { x: bin.x + (bin.w - BLOCK.w) / 2, y: slotY(before), where: dest }
}
const money = (n) => `${n * 25} 000 đ`

export function PetrolStepper({ lang = 'en' }) {
  const [k, setK] = useState(0)
  const fr = lang === 'fr'
  const last = P_STAGES.length - 1
  const done = DEST.slice(0, k)
  const moved = done.filter((d) => d === 'move').length
  const heated = done.filter((d) => d === 'heat').length

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />
          <text x="40" y="54" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>{fr ? P_STAGES[k].fr : P_STAGES[k].en}</text>

          <line x1="30" y1={ROAD} x2="600" y2={ROAD} stroke={INK} strokeWidth="4" />
          {k >= 3 && <circle cx={BX} cy={BY + 34 * BS} r="70" fill={WASTED} opacity="0.16" />}
          <Pic svg={motorbike(BX, BY, BS)} />
          {k >= 1 && <Pic svg={squiggles(60, BY + 54, 2, 24, 2, WASTED, 6)} />}
          {k >= 2 && <Pic svg={arrow(486, BY - 10, 590, BY - 10, USEFUL, 10, 34)} />}
          {k >= 3 && <Pic svg={squiggles(BX + 4, BY + 6, 3, 26, 2, WASTED, 6)} />}
          {k >= 4 && <Pic svg={noise(BX - 120, BY - 104, '#c25e12', 6)} />}

          <text x={TANK.x + TANK.w / 2} y="114" fontFamily={FONT} fontSize="26" fontWeight="900" fill={INK} textAnchor="middle">{t(lang, 'the petrol', 'l’essence')}</text>
          <rect x={TANK.x} y={TANK.y} width={TANK.w} height={BOX_H} rx="16" fill="#fffaf0" stroke={MUTED} strokeWidth="3" />
          <text x={BIN_MOVE.x + BIN_MOVE.w / 2} y="114" fontFamily={FONT} fontSize="25" fontWeight="900" fill={USEFUL} textAnchor="middle">{t(lang, 'moves the bike', 'fait avancer')}</text>
          <rect x={BIN_MOVE.x} y={TANK.y} width={BIN_MOVE.w} height={BOX_H} rx="16" fill="#eef6e6" stroke={USEFUL} strokeWidth="3" />
          <text x={BIN_HEAT.x + BIN_HEAT.w / 2} y="114" fontFamily={FONT} fontSize="25" fontWeight="900" fill={WASTED} textAnchor="middle">{t(lang, 'heat and sound', 'chaleur et son')}</text>
          <rect x={BIN_HEAT.x} y={TANK.y} width={BIN_HEAT.w} height={BOX_H} rx="16" fill="#fdecee" stroke={WASTED} strokeWidth="3" />
          {[0, 1, 2, 3].map((i) => {
            const p = place(i, k)
            const fill = p.where === 'tank' ? PETROL : p.where === 'move' ? USEFUL : WASTED
            return (
              <g key={i} style={{ transform: `translate(${p.x}px, ${p.y}px)`, transition: 'transform 0.9s cubic-bezier(.4,0,.2,1)' }}>
                <rect x="0" y="0" width={BLOCK.w} height={BLOCK.h} rx="10" fill={fill} stroke={INK} strokeWidth="3" style={{ transition: 'fill 0.9s' }} />
                <text x={BLOCK.w / 2} y="39" fontFamily={FONT} fontSize="27" fontWeight="900" fill={p.where === 'tank' ? INK : '#ffffff'} textAnchor="middle">25 000 đ</text>
              </g>
            )
          })}
          {moved > 0 && <text x={BIN_MOVE.x + BIN_MOVE.w / 2} y="472" fontFamily={FONT} fontSize="28" fontWeight="900" fill={USEFUL} textAnchor="middle">{money(moved)}</text>}
          {heated > 0 && <text x={BIN_HEAT.x + BIN_HEAT.w / 2} y="472" fontFamily={FONT} fontSize="28" fontWeight="900" fill={WASTED} textAnchor="middle">{money(heated)}</text>}

          {k < last ? (
            <g>
              <rect x="30" y="488" width="1440" height="44" rx="12" fill="#e9f1fa" stroke={BLUE_HL} strokeWidth="2.5" />
              <text x="750" y="519" fontFamily={FONT} fontSize="24" fontWeight="800" fill={BLUE_HL} textAnchor="middle">
                {k === 0
                  ? t(lang, 'He rides to school. Decide: does the first 25 000 đ move the bike?', 'Il va à l’école. Décide : les premiers 25 000 đ font-ils avancer la moto ?')
                  : t(lang, 'Decide: does the next 25 000 đ move the bike?', 'Décide : les 25 000 đ suivants font-ils avancer la moto ?')}
              </text>
            </g>
          ) : (
            <g>
              <rect x="30" y="488" width="1440" height="44" rx="12" fill="#fdecee" stroke={WASTED} strokeWidth="2.5" />
              <text x="750" y="520" fontFamily={FONT} fontSize="25" fontWeight="900" fill={WASTED} textAnchor="middle">{t(lang, 'Only 25 000 đ moves the bike!', 'Seulement 25 000 đ fait avancer la moto !')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => setK((v) => Math.min(last, v + 1))}>{t(lang, 'Next 25 000 đ', '25 000 đ suivants')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ── ThreeProcesses ────────────────────────────────────────────────────── */

// [picture, name EN, name FR, from, hint EN, hint FR, useful lines, wasted lines]
const JOBS = [
  [(x) => potFire(x, 112, 0.72), 'Burning wood to cook', 'Brûler du bois pour cuisiner', 'chemical', 'in the wood', 'dans le bois', ['thermal'], ['light,', 'thermal']],
  [(x) => stairs(x, 116, 0.6), 'Walking up stairs', 'Monter un escalier', 'chemical', 'in food', 'dans la nourriture', ['gravitational', 'potential'], ['thermal']],
  [(x) => cyclist(x, 118, 0.62), 'Cycling on a flat road', 'Rouler à vélo sur du plat', 'chemical', 'in food', 'dans la nourriture', ['kinetic'], ['thermal,', 'sound']],
]
const COL_W = 470
const colX = (i) => 30 + i * (COL_W + 10)
const FROM = { w: 230, y: 250, h: 72 }
const LOW = { w: 200, y: 392, h: 82 }

function Box({ x, y, w, h, lines, color, shown, hint }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={shown ? '#ffffff' : '#f7fafc'} stroke={shown ? color : RULE} strokeWidth={shown ? 4 : 3} strokeDasharray={shown ? undefined : '10 8'} />
      {shown ? (
        <g>
          {lines.map((line, j) => (
            <text key={j} x={x + w / 2} y={y + h / 2 + (j - (lines.length - 1) / 2) * 30 + (hint ? -2 : 9)} fontFamily={FONT} fontSize={lines.length > 1 ? 24 : 28} fontWeight="900" fill={color} textAnchor="middle">{line}</text>
          ))}
          {hint && <text x={x + w / 2} y={y + h - 12} fontFamily={FONT} fontSize="20" fontWeight="700" fill={MUTED} textAnchor="middle">{hint}</text>}
        </g>
      ) : (
        <text x={x + w / 2} y={y + h / 2 + 17} fontFamily={FONT} fontSize="48" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
      )}
    </g>
  )
}

export function ThreeProcesses({ lang = 'en' }) {
  const [k, setK] = useState(0) // rows shown: 0 none, 1 from, 2 + useful, 3 + wasted
  const fr = lang === 'fr'
  const NEXT = [
    t(lang, 'Where does the energy come from?', 'D’où vient l’énergie ?'),
    t(lang, 'What useful energy do we get?', 'Quelle énergie utile obtient-on ?'),
    t(lang, 'What energy is wasted?', 'Quelle énergie est gaspillée ?'),
  ]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />
          {JOBS.map(([pic, nameEn, nameFr, from, hintEn, hintFr, useful, wasted], i) => {
            const x0 = colX(i)
            const cx = x0 + COL_W / 2
            const ux = x0 + 20, wx = x0 + COL_W - 20 - LOW.w
            return (
              <g key={i}>
                <rect x={x0} y="12" width={COL_W} height="476" rx="18" fill="#fbfdff" stroke="#e2e8f0" strokeWidth="2" />
                <Pic svg={pic(cx)} />
                <text x={cx} y="226" fontFamily={FONT} fontSize="25" fontWeight="900" fill={INK} textAnchor="middle">{fr ? nameFr : nameEn}</text>
                <Box x={cx - FROM.w / 2} y={FROM.y} w={FROM.w} h={FROM.h} lines={[from]} color={INK} shown={k >= 1} hint={fr ? hintFr : hintEn} />
                <Pic svg={arrow(cx - 30, FROM.y + FROM.h + 6, ux + LOW.w / 2 + 20, LOW.y - 8, k >= 2 ? USEFUL : RULE, 6, 22)} />
                <Pic svg={arrow(cx + 30, FROM.y + FROM.h + 6, wx + LOW.w / 2 - 20, LOW.y - 8, k >= 3 ? WASTED : RULE, 6, 22)} />
                <Box x={ux} y={LOW.y} w={LOW.w} h={LOW.h} lines={useful} color={USEFUL} shown={k >= 2} />
                <Box x={wx} y={LOW.y} w={LOW.w} h={LOW.h} lines={wasted} color={WASTED} shown={k >= 3} />
              </g>
            )
          })}
          <text x="750" y="524" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED} textAnchor="middle">
            {k < 3 ? <>{t(lang, 'Next: ', 'Ensuite : ')}<tspan fill={INK}>{NEXT[k]}</tspan></> : t(lang, 'Every process wastes some energy.', 'Chaque processus gaspille de l’énergie.')}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={k === 3} onClick={() => setK((v) => Math.min(3, v + 1))}>{t(lang, 'Show', 'Afficher')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ── HeatSpread ────────────────────────────────────────────────────────── */

const ROOM = { x: 30, y: 84, w: 1040, h: 376 }
const FLOOR = ROOM.y + ROOM.h
const DESK = { x: 440, w: 280, top: FLOOR - 104 }
const MUG = { x: 580, y: DESK.top - 30, s: 0.5 }
const N = 40
const H_STAGES = [
  { time: ['8:00 a.m.', '8 h'], coffee: 80, en: 'Mr Bowen’s hot coffee. Its heat is all in the mug.', fr: 'Le café chaud de M. Bowen. Sa chaleur est dans la tasse.' },
  { time: ['8:10 a.m.', '8 h 10'], coffee: 65, en: 'The heat starts to move out.', fr: 'La chaleur commence à sortir.' },
  { time: ['8:30 a.m.', '8 h 30'], coffee: 45, en: 'It spreads out into the air.', fr: 'Elle s’étale dans l’air.' },
  { time: ['12 noon', 'Midi'], coffee: 25, en: 'The heat is everywhere. The coffee is cold.', fr: 'La chaleur est partout. Le café est froid.' },
  { time: ['5 p.m.', '17 h'], coffee: 25, en: 'Still everywhere. It never comes back.', fr: 'Toujours partout. Elle ne revient jamais.' },
]
const H_NEXT = [
  ['10 minutes later: where will the heat be?', '10 minutes plus tard : où sera la chaleur ?'],
  ['20 minutes more: where will it be?', '20 minutes de plus : où sera-t-elle ?'],
  ['12 noon: where will it be?', 'Midi : où sera-t-elle ?'],
  ['Wait. Will the heat come back to the coffee?', 'Attends. La chaleur va-t-elle revenir dans le café ?'],
]

// Every dot's place at every stage, fixed (the same each time it is shown).
function layoutDots() {
  const rnd = mulberry32(3707)
  const near = (r) => {
    for (;;) {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r
      const x = MUG.x + d * Math.cos(a), y = MUG.y - 20 + d * Math.sin(a) * 0.7
      if (x > ROOM.x + 16 && x < ROOM.x + ROOM.w - 16 && y > ROOM.y + 16 && y < FLOOR - 14) return [x, y]
    }
  }
  const anywhere = () => [ROOM.x + 20 + rnd() * (ROOM.w - 40), ROOM.y + 20 + rnd() * (ROOM.h - 36)]
  return Array.from({ length: N }, (_, i) => [
    [MUG.x - 16 + (i % 8) * 4.6, MUG.y - 6 + Math.floor(i / 8) * 5.5],
    i < 14 ? [MUG.x - 16 + (i % 7) * 5.5, MUG.y - 4 + Math.floor(i / 7) * 8] : near(120),
    i < 4 ? [MUG.x - 8 + i * 5.5, MUG.y + 4] : near(330),
    anywhere(),
    anywhere(),
  ])
}
const DOTS = layoutDots()

export function HeatSpread({ lang = 'en' }) {
  const [k, setK] = useState(0)
  const [back, setBack] = useState(false) // going back jumps: heat never gathers back on screen either
  const go = (v) => { setBack(v < k); setK(v) }
  const fr = lang === 'fr'
  const last = H_STAGES.length - 1
  const st = H_STAGES[k]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />
          <text x="40" y="56" fontFamily={FONT} fontSize="29" fontWeight="900" fill={INK}>{fr ? st.fr : st.en}</text>

          <rect x={ROOM.x} y={ROOM.y} width={ROOM.w} height={ROOM.h} rx="14" fill="#f7fafc" stroke={MUTED} strokeWidth="3" />
          <rect x={DESK.x} y={DESK.top} width={DESK.w} height="16" rx="4" fill="#b5835a" stroke={INK} strokeWidth="3" />
          <rect x={DESK.x + 18} y={DESK.top + 16} width="14" height={FLOOR - DESK.top - 16} fill="#8a5a2b" />
          <rect x={DESK.x + DESK.w - 32} y={DESK.top + 16} width="14" height={FLOOR - DESK.top - 16} fill="#8a5a2b" />
          <Pic svg={mug(MUG.x, MUG.y, MUG.s, k === 0)} />

          {DOTS.map((stages, i) => {
            const [x, y] = stages[k]
            return (
              <circle key={i} cx="0" cy="0" r="7" fill={RED} stroke="#ffffff" strokeWidth="1.5"
                style={{ transform: `translate(${x}px, ${y}px)`, transition: back ? 'none' : 'transform 1.6s cubic-bezier(.3,0,.3,1)' }} />
            )
          })}

          <text x="1285" y="124" fontFamily={FONT} fontSize="40" fontWeight="900" fill={INK} textAnchor="middle">{fr ? st.time[1] : st.time[0]}</text>
          <Pic svg={thermometer(1190, 266, (st.coffee - 20) / 70, 0.95)} />
          <text x="1190" y="346" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'coffee', 'café')}</text>
          <text x="1190" y="384" fontFamily={FONT} fontSize="30" fontWeight="900" fill={st.coffee > 30 ? RED : BLUE} textAnchor="middle">{`${st.coffee} °C`}</text>
          <Pic svg={thermometer(1380, 266, 5 / 70, 0.95)} />
          <text x="1380" y="346" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'room', 'pièce')}</text>
          <text x="1380" y="384" fontFamily={FONT} fontSize="30" fontWeight="900" fill={BLUE} textAnchor="middle">25 °C</text>
          <circle cx="1206" cy="432" r="9" fill={RED} stroke="#ffffff" strokeWidth="1.5" />
          <text x="1224" y="440" fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED}>{t(lang, '= some heat', '= de la chaleur')}</text>

          {k < last ? (
            <g>
              <rect x="30" y="482" width="1440" height="48" rx="12" fill="#e9f1fa" stroke={BLUE_HL} strokeWidth="2.5" />
              <text x="750" y="515" fontFamily={FONT} fontSize="25" fontWeight="800" fill={BLUE_HL} textAnchor="middle">{t(lang, 'Next: ', 'Ensuite : ')}{fr ? H_NEXT[k][1] : H_NEXT[k][0]}</text>
            </g>
          ) : (
            <g>
              <rect x="30" y="482" width="1440" height="48" rx="12" fill="#fdecee" stroke={RED} strokeWidth="2.5" />
              <text x="750" y="516" fontFamily={FONT} fontSize="26" fontWeight="900" fill={RED} textAnchor="middle">{t(lang, 'Spread out, it never gathers back by itself.', 'Une fois étalée, elle ne se rassemble jamais toute seule.')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={k === 0} onClick={() => go(Math.max(0, k - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => go(Math.min(last, k + 1))}>{t(lang, 'Later', 'Plus tard')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => go(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
