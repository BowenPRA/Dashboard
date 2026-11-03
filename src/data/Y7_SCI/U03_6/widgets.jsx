// src/data/Y7_SCI/U03_6/widgets.jsx
// The bouncing ball and the slow-motion film for 3.6 Changes in energy, ported
// from the classroom deck (content/y7-science/U03_6/bounce.jsx, film.jsx).
// English and French only, so every string goes through t(lang, en, fr). The
// candle story is story.jsx.
//
//   BouncingBall  Mr Bowen holds a tennis ball 2 m up and lets go. The next
//                 moment is always written on the screen; the student says
//                 which store will be biggest, then Next moves the ball and the
//                 bars show it. Each press is ONE change:
//                   0 in his hand, 2 m up           gravitational potential 100
//                   1 halfway down                  gravitational 50, kinetic 50
//                   2 just before the floor         kinetic 100
//                   3 squashed on the floor: bang!  elastic potential 55; 45 out
//                   4 springing back up             kinetic 55
//                   5 the top of the bounce: 1.1 m  gravitational 55
//                 A tennis ball bounces to just over half the height it fell
//                 from (the rules of tennis want 53–58%), so about 45% leaves at
//                 the bounce as sound and heat. Only the ball's own stores light
//                 up as "biggest" (both, when they are equal).
//   BallFilm      a big gym ball filmed at 240 frames a second: the bottom goes
//                 flat on the floor and springs back (CC BY-SA 4.0).
//
// WHAT CHANGED IN THE PORT
//  · Mr Bowen is drawn by this unit's mrBowen.js (the classroom's src/lib
//    copy); Btn is the house button; `tr` comes from utils/lang.
//  · The stepper is one 1500-wide SVG, unreadable on a phone. Below 640 px of
//    its own width it shows the scene alone (cropped) with the words and the
//    four bars as HTML underneath.
//  · The film is served from public/images/Y7_SCI/U03_6/ through assetUrl.
import { useState, useRef, useEffect } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../utils/lang'
import { assetUrl } from '../../../utils/assetPaths'
import { mrBowenSvg } from './mrBowen.js'
import { INK, MUTED, FONT, tennisBall } from './art.js'
import { Btn } from './ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', BLUE = '#1a5fa8', RED = '#d83a2e'
const ballFilm = assetUrl('images/Y7_SCI/U03_6/ball.webm')

// The ball's three stores, then what leaves it at the bounce.
const STORES = [
  { key: 'g', en: 'gravitational potential', fr: 'potentielle de pesanteur', color: '#0087a8' },
  { key: 'k', en: 'kinetic', fr: 'cinétique', color: '#1a5fa8' },
  { key: 'e', en: 'elastic potential', fr: 'potentielle élastique', color: '#5c2483' },
]
const OUT = { key: 's', en: 'sound and heat', fr: 'son et chaleur', color: RED }
// h = the ball's height in metres; squash = on the floor; dir = which way it moves
const STAGES = [
  { h: 2, g: 100, k: 0, e: 0, s: 0, en: 'Mr Bowen holds the ball 2 m up.', fr: 'M. Bowen tient la balle à 2 m.' },
  { h: 1, dir: 'down', g: 50, k: 50, e: 0, s: 0, en: 'It falls. Halfway down.', fr: 'Elle tombe. À mi-hauteur.' },
  { h: 0.02, dir: 'down', g: 0, k: 100, e: 0, s: 0, en: 'Just before it hits the floor.', fr: 'Juste avant le sol.' },
  { h: 0, squash: true, g: 0, k: 0, e: 55, s: 45, en: 'It squashes on the floor. Bang!', fr: 'Elle s’écrase sur le sol. Bang !' },
  { h: 0.02, dir: 'up', g: 0, k: 55, e: 0, s: 45, en: 'It springs back up.', fr: 'Elle rebondit vers le haut.' },
  { h: 1.1, g: 55, k: 0, e: 0, s: 45, en: 'The top of the bounce: 1.1 m.', fr: 'Le haut du rebond : 1.1 m.' },
]
const NEXT = [
  ['He lets go. Halfway down…', 'Il lâche. À mi-hauteur…'],
  ['Just before it hits the floor…', 'Juste avant le sol…'],
  ['It hits the floor and squashes…', 'Elle touche le sol et s’écrase…'],
  ['It springs back up…', 'Elle rebondit vers le haut…'],
  ['The top of the bounce…', 'Le haut du rebond…'],
]

const FLOOR = 470
const M = 168 // pixels per metre
const BALL_X = 360
const R = 24
const yOf = (h) => FLOOR - R - h * M
const BAR = { x: 820, w: 600, y0: 166, gap: 80, h: 40 }
const OUT_Y = 432 // the sound-and-heat bar, below a rule
// Drawn to this scale, 2 m is out of Mr Bowen's reach: he stands on a lab
// stool, his arm held out so the ball falls clear of him.
const BOWEN = 1.05
const HAND = [100, 36] // in his own frame: a straight arm, up and out
const STAND_X = BALL_X - 14 - HAND[0] * BOWEN
const STAND_Y = yOf(2) + R + 6 - HAND[1] * BOWEN
const SEAT = STAND_Y + 268 * BOWEN

/** The width of an element, kept up to date. */
function useWidth() {
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
  return [box, width]
}

function Bar({ s, y, value, on, lang, note }) {
  const fr = lang === 'fr'
  return (
    <g>
      <text x={BAR.x} y={y - 12} fontFamily={FONT} fontSize="24" fontWeight={on ? 900 : 700} fill={on ? s.color : MUTED}>
        {s.en}{fr && <tspan dx="14" fontSize="19" fontWeight="700" fill={MUTED}>{s.fr}</tspan>}
        {note && <tspan dx="14" fontSize="19" fontWeight="700" fill={MUTED}>{note}</tspan>}
      </text>
      <rect x={BAR.x} y={y} width={BAR.w} height={BAR.h} rx="8" fill="#f1f5f9" stroke={on ? s.color : RULE} strokeWidth={on ? 3 : 1.5} />
      <rect x={BAR.x} y={y} width={BAR.w} height={BAR.h} rx="8" fill={s.color}
        style={{ transform: `scaleX(${value / 100})`, transformOrigin: `${BAR.x}px 0px`, transition: 'transform 0.8s cubic-bezier(.4,0,.2,1)' }} />
    </g>
  )
}

// The same bar as HTML, for a phone.
function BarRow({ s, value, on, lang, note }) {
  return (
    <div>
      <div className="flex items-baseline flex-wrap gap-x-2 text-[11px] leading-tight">
        <span className="font-black" style={{ color: on ? s.color : MUTED }}>{s.en}</span>
        {lang === 'fr' && <span className="font-bold text-slate-500">{s.fr}</span>}
        {note && <span className="font-bold text-slate-500">{note}</span>}
      </div>
      <div className="mt-0.5 h-3 rounded-md bg-slate-100 overflow-hidden" style={{ outline: `${on ? 2 : 1}px solid ${on ? s.color : RULE}` }}>
        <div className="h-full rounded-md" style={{ width: `${value}%`, backgroundColor: s.color, transition: 'width 0.8s cubic-bezier(.4,0,.2,1)' }} />
      </div>
    </div>
  )
}

// Mr Bowen on his stool, the ball, a height scale: x 40–640 of the stage.
function Scene({ st, last }) {
  const ballY = yOf(st.h)
  return (
    <g>
      <line x1="40" y1={FLOOR} x2="548" y2={FLOOR} stroke={INK} strokeWidth="4" />
      <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
        <rect x={STAND_X - 5} y={SEAT + 10} width="10" height={FLOOR - SEAT - 20} fill="#9aa7b4" />
        <line x1={STAND_X - 20} y1={SEAT + 34} x2={STAND_X + 20} y2={SEAT + 34} stroke="#6b7580" strokeWidth="5" strokeLinecap="round" />
        <path d={`M ${STAND_X - 34} ${FLOOR} L ${STAND_X - 7} ${FLOOR - 12} L ${STAND_X + 7} ${FLOOR - 12} L ${STAND_X + 34} ${FLOOR} Z`} fill="#6b7580" />
        <rect x={STAND_X - 42} y={SEAT} width="84" height="12" rx="5" fill="#4a5560" />
      </g>
      <g dangerouslySetInnerHTML={{ __html: mrBowenSvg({ x: STAND_X, y: STAND_Y, scale: BOWEN, handRight: HAND }) }} />
      {[0, 0.5, 1, 1.5, 2].map((m) => (
        <g key={m}>
          <line x1="560" y1={FLOOR - m * M} x2="584" y2={FLOOR - m * M} stroke={INK} strokeWidth="3" />
          <text x="596" y={FLOOR - m * M + 8} fontFamily={FONT} fontSize="22" fontWeight="700" fill={MUTED}>{m} m</text>
        </g>
      ))}
      <line x1="572" y1={FLOOR} x2="572" y2={FLOOR - 2 * M} stroke={INK} strokeWidth="3" />
      <line x1={BALL_X - 40} y1={FLOOR - 2 * M} x2="560" y2={FLOOR - 2 * M} stroke="#9aa7b4" strokeWidth="3" strokeDasharray="8 8" />
      {last && <line x1={BALL_X - 40} y1={FLOOR - 1.1 * M} x2="560" y2={FLOOR - 1.1 * M} stroke={RED} strokeWidth="3" strokeDasharray="8 8" />}
      {st.squash ? (
        <g>
          <ellipse cx={BALL_X} cy={FLOOR - 13} rx="34" ry="13" fill="#d7e84a" stroke={INK} strokeWidth="3" />
          <path d={`M ${BALL_X - 70} ${FLOOR - 40} l 18 12 M ${BALL_X - 60} ${FLOOR - 64} l 18 22 M ${BALL_X + 70} ${FLOOR - 40} l -18 12 M ${BALL_X + 60} ${FLOOR - 64} l -18 22`} stroke="#c25e12" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : (
        <g dangerouslySetInnerHTML={{ __html: tennisBall(BALL_X, ballY, R) }} />
      )}
      {st.dir && (
        <g stroke="#9aa7b4" fill="#9aa7b4">
          <line x1={BALL_X + 52} y1={ballY + (st.dir === 'down' ? -30 : 26)} x2={BALL_X + 52} y2={ballY + (st.dir === 'down' ? 10 : -14)} strokeWidth="5" strokeLinecap="round" />
          <path d={st.dir === 'down'
            ? `M ${BALL_X + 40} ${ballY + 10} L ${BALL_X + 64} ${ballY + 10} L ${BALL_X + 52} ${ballY + 28} Z`
            : `M ${BALL_X + 40} ${ballY - 14} L ${BALL_X + 64} ${ballY - 14} L ${BALL_X + 52} ${ballY - 32} Z`} stroke="none" />
        </g>
      )}
    </g>
  )
}

export function BouncingBall({ lang = 'en' }) {
  const [k, setK] = useState(0)
  const [box, width] = useWidth()
  const wide = width === 0 || width >= 640
  const fr = lang === 'fr'
  const st = STAGES[k]
  const last = STAGES.length - 1
  const most = Math.max(...STORES.map((s) => st[s.key]))
  const nextLine = k < last ? `${t(lang, 'Next: ', 'Ensuite : ')}${fr ? NEXT[k][1] : NEXT[k][0]}` : t(lang, 'Only 1.1 m, not 2 m!', 'Seulement 1.1 m, pas 2 m !')
  const outNote = t(lang, 'out of the ball', 'sortis de la balle')

  return (
    <div ref={box} className="w-full h-full flex flex-col gap-2 select-none">
      {wide ? (
        <div className="flex-1 min-h-0 w-full">
          <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
            <Scene st={st} last={k === last} />
            <text x="40" y="46" fontFamily={FONT} fontSize="27" fontWeight="900" fill={INK}>{fr ? st.fr : st.en}</text>
            <rect x="652" y="16" width="824" height="56" rx="12" fill={k < last ? '#e9f1fa' : '#fdecee'} stroke={k < last ? BLUE : RED} strokeWidth="2.5" />
            <text x="672" y="53" fontFamily={FONT} fontSize="24" fontWeight="800" fill={k < last ? BLUE : RED}>{nextLine}</text>
            <text x={BAR.x} y="108" fontFamily={FONT} fontSize="20" fontWeight="800" fill={INK}>{t(lang, 'The ball’s energy stores', 'Les réserves d’énergie de la balle')}</text>
            {STORES.map((s, i) => (
              <Bar key={s.key} s={s} y={BAR.y0 + i * BAR.gap} value={st[s.key]} on={most > 0 && st[s.key] === most} lang={lang} />
            ))}
            <line x1={BAR.x} y1="380" x2={BAR.x + BAR.w} y2="380" stroke={RULE} strokeWidth="3" strokeDasharray="10 8" />
            <Bar s={OUT} y={OUT_Y} value={st.s} on={st.s > 0} lang={lang} note={outNote} />
          </svg>
        </div>
      ) : (
        <div className="flex-1 min-h-0 w-full flex flex-col gap-1.5 rounded-xl bg-white p-2 text-left">
          <div className="text-xs font-black text-slate-800">{fr ? st.fr : st.en}</div>
          <div className={`rounded-lg border-2 px-2 py-1 text-[11px] font-extrabold leading-snug ${k < last ? 'bg-[#e9f1fa] border-[#1a5fa8] text-[#1a5fa8]' : 'bg-[#fdecee] border-[#d83a2e] text-[#d83a2e]'}`}>{nextLine}</div>
          <div className="flex-1 min-h-[7rem]">
            <svg viewBox="20 60 640 430" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <Scene st={st} last={k === last} />
            </svg>
          </div>
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">{t(lang, 'The ball’s energy stores', 'Les réserves d’énergie de la balle')}</div>
          {STORES.map((s) => <BarRow key={s.key} s={s} value={st[s.key]} on={most > 0 && st[s.key] === most} lang={lang} />)}
          <div className="border-t-2 border-dashed border-slate-200 pt-1">
            <BarRow s={OUT} value={st.s} on={st.s > 0} lang={lang} note={outNote} />
          </div>
        </div>
      )}
      <div className="shrink-0 flex items-center justify-center gap-2 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => setK((v) => Math.min(last, v + 1))}>{t(lang, 'Next', 'Suivant')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

// No frame of its own: the layout already puts the media in a panel.
export function BallFilm({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <video
        className="w-full h-full object-contain rounded-xl"
        src={ballFilm}
        controls
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        aria-label={t(lang, 'Slow motion: a big ball goes flat at the bottom as it bounces', 'Au ralenti : une grosse balle s’aplatit en bas en rebondissant')}
      />
    </div>
  )
}
