// src/data/Y7_SCI/U03_5/bus.jsx (ported from the classroom deck content/y7-science/U03_5/kinds.jsx)
// THE BUS GOING UPHILL — the book's bus (page 107), with the eighth label the
// book leaves out (light, from the headlights). The next leader points at its
// clue (the heat, the noise, the beam…) and a "?" waits where the label will
// go; the student names the energy, then the press writes it.
//
// WHAT CHANGED IN THE PORT
//  · NameThatEnergy, the whole-class standing game, does not port: its
//    pictures are the first levels of the Name That Energy task (ENERGY_SPOT)
//    and its action poses are drawn on that task's eight cards.
//  · With all eight up, the line says each one has its clue, not "copy the
//    bus": a self-study student is never sent to paper. The bus itself is the
//    last level of Name That Energy, where the student names all eight alone.
//  · `tr` comes from utils/lang and Btn from ./ui.jsx; nothing else changed.
//
// The pictures are art.js strings, placed with dangerouslySetInnerHTML. The
// labels on the bus stay in English in both languages, like every diagram.
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../utils/lang'
import { Btn } from './ui.jsx'
import * as art from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const { INK, KEY, STORE, TRANSFER } = art
const GREEN_DARK = '#3d731c'
const MUTED = art.MUTED
const FONT = art.FONT
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

// The bus (art.bus, drawn about its centre) is placed at BUS with a tilt, so
// the labels' leader lines are worked out from points ON the bus.
const BUS = { x: 690, y: 296, s: 2, deg: -9 }
const onBus = (px, py) => {
  const a = (BUS.deg * Math.PI) / 180
  return [BUS.x + BUS.s * (px * Math.cos(a) - py * Math.sin(a)), BUS.y + BUS.s * (px * Math.sin(a) + py * Math.cos(a))]
}

// The extras the book's picture has, in the bus's own coordinates. BEHIND the
// bus: the headlight's beam, the noisy exhaust, the heat off the engine at the
// back, the road. IN FRONT of it (or the bus would hide them): the fuel cap
// and the two tyres squashed flat on the road.
const BEHIND = `
  <path d="M 148 16 L 270 -24 L 270 76 Z" fill="#fff3b0" opacity="0.95"/>
  <rect x="-170" y="36" width="22" height="8" rx="3" fill="#5b6770"/>
  <circle cx="-190" cy="36" r="9" fill="#d5dbe1"/><circle cx="-206" cy="30" r="12" fill="#e2e8f0"/>
  <path d="M -184 -26 q -10 12 0 24 M -198 -34 q -16 20 0 40 M -212 -42 q -22 28 0 56" fill="none" stroke="${KEY}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M -136 -82 q -6 -8 0 -16 q 6 -8 0 -16 M -118 -82 q -6 -8 0 -16 q 6 -8 0 -16" fill="none" stroke="#d83a2e" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M -420 78 H 520" stroke="#6b7480" stroke-width="10"/>
`
const FRONT = `
  <rect x="-54" y="24" width="26" height="18" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
  ${[-90, 92].map((wx) => `<ellipse cx="${wx}" cy="71" rx="32" ry="7" fill="#3d4650"/>
  <path d="M ${wx - 32} 71 A 32 7 0 0 0 ${wx + 32} 71" fill="none" stroke="${INK}" stroke-width="3"/>`).join('')}
`

// Each label: its lines (the energy, then why), where the first line sits,
// where its leader starts (clear of the words) and the point on the bus it
// names. In the order the class meets them: the easy ones first.
const LABELS = [
  { lines: ['kinetic'], why: 'the bus is moving', at: [560, 58], from: [640, 98], to: onBus(0, -64), group: STORE },
  { lines: ['light'], why: 'the headlights', at: [1262, 252], from: [1256, 262], to: onBus(232, 20), group: TRANSFER },
  { lines: ['sound'], why: 'the engine is noisy', at: [40, 236], from: [282, 252], to: onBus(-198, -10), group: TRANSFER },
  { lines: ['thermal'], why: 'the engine is hot', at: [40, 112], from: [262, 126], to: onBus(-128, -100), group: STORE },
  { lines: ['chemical'], why: 'fuel in the tank', at: [600, 512], from: [650, 486], to: onBus(-41, 33), group: STORE },
  { lines: ['electrical'], why: 'wires to the lights', at: [1150, 470], from: [1176, 446], to: onBus(141, 30), group: TRANSFER },
  { lines: ['elastic potential'], why: 'squashed tyres', at: [860, 506], from: [920, 482], to: onBus(92, 74), group: STORE },
  { lines: ['gravitational', 'potential'], why: 'going uphill', at: [1180, 100], from: [1172, 124], to: onBus(116, -26), group: STORE },
]
const ROAD_FILL = (() => {
  const [ax, ay] = onBus(-420, 78)
  const [bx, by] = onBus(520, 78)
  return `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)} L ${bx.toFixed(1)} 560 L ${ax.toFixed(1)} 560 Z`
})()

export function BusEnergies({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // labels shown
  const big = isDisplayMode
  const done = k >= LABELS.length
  const next = LABELS[k]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <path d={ROAD_FILL} fill="#eef1f4" />
          <g transform={`translate(${BUS.x} ${BUS.y}) rotate(${BUS.deg}) scale(${BUS.s})`}>
            <Pic svg={BEHIND} />
            <Pic svg={art.bus(0, 0, 1)} />
            <Pic svg={FRONT} />
          </g>

          {LABELS.slice(0, k).map((l) => (
            <g key={l.lines[0]}>
              <line x1={l.from[0]} y1={l.from[1]} x2={l.to[0]} y2={l.to[1]} stroke={l.group} strokeWidth="2.5" />
              <circle cx={l.to[0]} cy={l.to[1]} r="6" fill={l.group} />
              {l.lines.map((line, j) => (
                <text key={j} x={l.at[0]} y={l.at[1] + j * 30} fontFamily={FONT} fontSize="27" fontWeight="900" fill={l.group}>{line}</text>
              ))}
              <text x={l.at[0]} y={l.at[1] + l.lines.length * 30 - 2} fontFamily={FONT} fontSize="23" fontWeight="700" fill={INK}>{l.why}</text>
            </g>
          ))}
          {/* the next one: its leader points at the clue, and a "?" waits where its label will go */}
          {next && (
            <g>
              <line x1={next.at[0] + 24} y1={next.at[1] - 9} x2={next.to[0]} y2={next.to[1]} stroke={KEY} strokeWidth="3" strokeDasharray="8 6" />
              <circle cx={next.to[0]} cy={next.to[1]} r="8" fill={KEY} />
              <rect x={next.at[0] - 4} y={next.at[1] - 34} width="56" height="50" rx="12" fill="#ffffff" stroke={KEY} strokeWidth="4" />
              <text x={next.at[0] + 24} y={next.at[1] + 4} fontFamily={FONT} fontSize="36" fontWeight="900" fill={KEY} textAnchor="middle">?</text>
            </g>
          )}
          <text x="1476" y="44" fontFamily={FONT} fontSize="24" fontWeight="900" fill={done ? GREEN_DARK : MUTED} textAnchor="end">
            {done ? t(lang, 'All 8! Each one has its clue.', 'Les 8 ! Chacune a son indice.') : t(lang, `${k} of 8`, `${k} sur 8`)}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={done} onClick={() => setK((v) => Math.min(LABELS.length, v + 1))}>{t(lang, 'Show the label', 'Voir la légende')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
