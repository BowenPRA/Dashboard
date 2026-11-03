// src/data/Y7_SCI/U03_6/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's candle coffee, ported from the classroom deck
// (content/y7-science/U03_6/story.jsx). A four-panel strip, one panel per
// press, so the student predicts each step before it is shown. Deadpan, never
// flagged as a joke. It opens the book's candle experiment (page 115):
//
//   1  7 a.m. His kettle is broken.    (cracked, no steam; he holds an empty mug)
//   2  He heats his coffee with a candle. Very patient.   (a mug on a stand)
//   3  8 a.m. The coffee is a bit warm. So is everything else.  (heat everywhere)
//   4  12 noon. Six candles later. (He buys a new kettle.)
//   then the question the experiment answers — where did all that energy go?
//   — and the clue: a little into the coffee, the rest everywhere else.
//
// WHAT CHANGED IN THE PORT: Mr Bowen comes from this unit's mrBowen.js; the
// strip is one 1640-wide SVG, so below 640 px of its own width it shows ONE
// panel at a time — the newest — with its caption, the question and the clue
// as HTML (four numbered dots say where you are).
import { useState, useRef, useEffect } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../utils/lang'
import { mrBowenSvg } from './mrBowen.js'
import { mug, clock, kettle, brokenKettle, candle, arrow } from './art.js'
import { Btn } from './ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8', RED = '#d83a2e'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 22
const DESK = FLOOR - 112 // the top of the desk

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['7 a.m. Mr Bowen’s kettle', 'is broken.'], ['7 h. La bouilloire de', 'M. Bowen est cassée.']],
  [['He heats his coffee with', 'a candle. Very patient.'], ['Il chauffe son café avec', 'une bougie. Très patient.']],
  [['8 a.m. The coffee is a bit', 'warm. So is everything else.'], ['8 h. Le café est un peu chaud.', 'Tout le reste aussi.']],
  [['12 noon. Six candles later.', '(He buys a new kettle.)'], ['Midi. Six bougies plus tard.', '(Il achète une bouilloire.)']],
]
const LAST = 4 // panels 0-3, then the clue
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />
const Bowen = (props) => <Pic svg={mrBowenSvg(props)} />

/* ── the pieces ── */
function Desk({ x }) {
  return (
    <g>
      <rect x={x + 176} y={DESK} width="204" height="16" rx="4" fill="#b5835a" stroke={INK} strokeWidth="3" />
      <rect x={x + 192} y={DESK + 16} width="14" height={FLOOR - DESK - 16} fill="#8a5a2b" />
      <rect x={x + 352} y={DESK + 16} width="14" height={FLOOR - DESK - 16} fill="#8a5a2b" />
    </g>
  )
}

// The mug on a little wire stand, a candle under it.
function CandleStand({ x, hot = false, stubs = 0 }) {
  const cx = x + 270
  return (
    <g>
      {Array.from({ length: stubs }, (_, i) => (
        <g key={i}>
          <rect x={x + 188 + i * 30} y={DESK - 14} width="18" height="14" rx="3" fill="#f4efe9" stroke={INK} strokeWidth="2" />
          <line x1={x + 197 + i * 30} y1={DESK - 14} x2={x + 197 + i * 30} y2={DESK - 20} stroke={INK} strokeWidth="2" />
        </g>
      ))}
      {stubs === 0 && (
        <g>
          <path d={`M ${cx - 46} ${DESK} L ${cx - 30} ${DESK - 92} M ${cx + 46} ${DESK} L ${cx + 30} ${DESK - 92}`} stroke="#5b6770" strokeWidth="5" strokeLinecap="round" />
          <line x1={cx - 40} y1={DESK - 92} x2={cx + 40} y2={DESK - 92} stroke="#5b6770" strokeWidth="5" strokeLinecap="round" />
          <Pic svg={candle(cx, DESK - 34, 0.36)} />
          <Pic svg={mug(cx, DESK - 128, 0.36, hot)} />
        </g>
      )}
    </g>
  )
}

/* ── the four panels ── */
// He holds his empty mug; the kettle on the desk is cracked, and no steam.
const MUG_HAND = [60, 130] // in his own frame
function Broken({ x }) {
  const bx = x + 80, by = FLOOR - 268 * 0.82
  return (
    <g>
      <Desk x={x} />
      <Pic svg={brokenKettle(x + 290, DESK - 39, 0.5)} />
      <Bowen x={bx} y={by} scale={0.82} mood="sad" handRight={MUG_HAND} />
      <Pic svg={mug(bx + MUG_HAND[0] * 0.82 + 10, by + MUG_HAND[1] * 0.82 - 12, 0.3, false)} />
      <Pic svg={clock(x + 326, TOP + 56, 7)} />
    </g>
  )
}

function Patient({ x }) {
  return (
    <g>
      <Desk x={x} />
      <CandleStand x={x} />
      <Bowen x={x + 96} y={FLOOR - 268 * 0.82} scale={0.82} />
      <Pic svg={clock(x + 326, TOP + 56, 7)} />
    </g>
  )
}

function WarmEverything({ x }) {
  const cx = x + 270
  return (
    <g>
      <Desk x={x} />
      <CandleStand x={x} hot />
      <Bowen x={x + 96} y={FLOOR - 268 * 0.82} scale={0.82} />
      <Pic svg={arrow(cx - 40, DESK - 60, cx - 100, DESK - 110, RED, 4, 13)} />
      <Pic svg={arrow(cx + 40, DESK - 60, cx + 96, DESK - 110, RED, 4, 13)} />
      <Pic svg={arrow(cx - 30, DESK - 30, cx - 90, DESK - 20, RED, 4, 13)} />
      <Pic svg={arrow(cx + 30, DESK - 30, cx + 92, DESK - 20, RED, 4, 13)} />
      <Pic svg={arrow(cx, DESK + 22, cx, DESK + 66, RED, 4, 13)} />
      <Pic svg={clock(x + 326, TOP + 56, 8)} />
    </g>
  )
}

function NewKettle({ x }) {
  return (
    <g>
      <Desk x={x} />
      <CandleStand x={x} stubs={6} />
      <Pic svg={mug(x + 248, DESK - 46, 0.32, false)} />
      <Bowen x={x + 96} y={FLOOR - 268 * 0.82} scale={0.82} mood="sad" />
      <Pic svg={kettle(x + 330, DESK - 40, 0.32)} />
      <Pic svg={clock(x + 326, TOP + 56, 12)} />
    </g>
  )
}

const PANELS = [Broken, Patient, WarmEverything, NewKettle]

function PanelFrame({ i, shown }) {
  const x = px(i)
  const Panel = PANELS[i]
  return (
    <g>
      <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? '#fbfdff' : '#f4f6f8'}
        stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
      {shown ? (
        <g clipPath={`url(#u36-candle-p${i})`}>
          <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke={RULE} strokeWidth="3" />
          <Panel x={x} />
        </g>
      ) : (
        <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
      )}
      <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
      <circle cx={x + 30} cy={TOP + 30} r="19" fill={shown ? BLUE : RULE} />
      <text x={x + 30} y={TOP + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
    </g>
  )
}

const Clips = () => (
  <defs>
    {PANELS.map((_, i) => (
      <clipPath key={i} id={`u36-candle-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
    ))}
  </defs>
)

export function CandleStory({ lang = 'en' }) {
  const [k, setK] = useState(0) // panels 0..k are shown; k = 4 adds the clue
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const asked = k >= 3
  const box = useRef(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = box.current
    if (!el) return undefined
    const fit = () => setWidth(el.getBoundingClientRect().width)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const wide = width === 0 || width >= 640
  const one = Math.min(k, 3) // the panel a phone shows
  const question = t(lang, 'Five hours of candles. Where did all that energy go?', 'Cinq heures de bougies. Où est partie toute cette énergie ?')
  const clue = t(lang, 'A clue: a little went into the coffee. The rest went everywhere else.', 'Un indice : un peu dans le café. Le reste, partout ailleurs.')

  return (
    <div ref={box} className="w-full h-full flex flex-col gap-2 select-none">
      {wide ? (
        <div className="flex-1 min-h-0 w-full">
          <svg viewBox="0 0 1640 610" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="1640" height="610" rx="16" fill="#ffffff" />
            <Clips />
            {PANELS.map((_, i) => (
              <g key={i}>
                <PanelFrame i={i} shown={i <= k} />
                {i <= k && (
                  <g>
                    <text x={px(i) + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="23" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={px(i) + PANEL_W / 2} y={TOP + PANEL_H + 68} fontFamily={FONT} fontSize="23" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            ))}
            {asked && (
              <g>
                <rect x="30" y="514" width="1580" height="88" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
                <text x="820" y={k >= LAST ? 550 : 568} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">{question}</text>
                {k >= LAST && <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">{clue}</text>}
              </g>
            )}
          </svg>
        </div>
      ) : (
        <div className="flex-1 min-h-0 w-full flex flex-col gap-1.5 rounded-xl bg-white p-2 text-left">
          <div className="flex items-center gap-1.5">
            {PANELS.map((_, i) => (
              <span key={i} className={`w-6 h-6 rounded-full text-[11px] font-black flex items-center justify-center ${i <= k ? 'bg-[#1a5fa8] text-white' : 'bg-slate-200 text-slate-400'} ${i === one ? 'ring-2 ring-offset-1 ring-[#1a5fa8]' : ''}`}>{i + 1}</span>
            ))}
          </div>
          <div className="flex-1 min-h-[7rem]">
            <svg viewBox={`${px(one)} ${TOP} ${PANEL_W} ${PANEL_H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <Clips />
              <PanelFrame i={one} shown />
            </svg>
          </div>
          <p className="text-xs font-black text-slate-800 leading-snug">{L(CAPTIONS[one]).join(' ')}</p>
          {asked && (
            <div className="rounded-lg border-2 border-[#0087a8] bg-[#e2f2f6] px-2 py-1 text-[11px] font-black leading-snug text-slate-800">
              {question}{k >= LAST && <span className="block text-[#0087a8]">{clue}</span>}
            </div>
          )}
        </div>
      )}
      <div className="shrink-0 flex items-center justify-center gap-2 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k === LAST - 1 ? t(lang, 'A clue', 'Un indice') : t(lang, 'What happens next?', 'Et ensuite ?')}
        </Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
