// src/data/Y7_MATH/U05_2/tracks.jsx (ported from the classroom deck y7-math/U05_2)
// CROSS THE TRACKS — the model the student predicts before each press. Two
// parallel lines and a line across them; the top four angles are written on,
// the bottom four are ? until the copy lands. Turn the line and say the bottom
// four first: they copy the top four, every time. Slide it down: the top
// crossing moves down the line and fits the bottom one exactly, which is WHY
// corresponding angles are equal. Make them not parallel: the arrows go, the
// bottom angles change, and the slide no longer fits.
// The classroom's Equal or Not? (a standing game) is not ported: its rounds
// are the X, F or Z? task's level 4. EN/FR through tr(lang, en, null, fr).
import { useState, useRef, useEffect } from 'react'
import { RotateCw, RotateCcw, ArrowDown, Slash } from 'lucide-react'
import { tr } from '../../../utils/lang'
import { Btn } from './ui.jsx'
import { at, f1, norm, meet, sector, labelR, chevron, through } from './lines.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770'
const TEAL = '#0087a8', BLUE = '#1a5fa8', PURPLE = '#5c2483', GREEN = '#4a8b23', GREEN_DARK = '#3d731c', RED = '#c8102e'
const ORANGE_T = '#fdf1e3', TEAL_T = '#e2f2f6', PURPLE_T = '#f2ecf7', GREEN_T = '#eef6e6'

// The four angles where a line along `along` meets a line along `cross`
// (0 < cross − along < 180), anticlockwise from the first line's own
// direction: [start, end, size].
function fourAngles(along, cross) {
  const s = norm(cross - along)
  return [
    [along, along + s, s],
    [along + s, along + 180, 180 - s],
    [along + 180, along + 180 + s, s],
    [along + 180 + s, along + 360, 180 - s],
  ]
}

/* ============================================================= *
 * 1 · CROSS THE TRACKS — turn it, slide it, bend it
 * ============================================================= */
const TURNS = [60, 75, 90, 110, 130, 45]
const C = [935, 270] // the line across turns about this point
const TOP = [935, 165]
const BOT = [935, 375]
const BEND = -11 // degrees: the bottom line, made not parallel
const SLIDE_SECONDS = 1.3

function classColours(size) {
  if (size === 90) return [GREEN_T, GREEN]
  return size < 90 ? [ORANGE_T, KEY] : [TEAL_T, TEAL]
}

export function CrossTracks({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const [bent, setBent] = useState(false)
  const [slide, setSlide] = useState(0) // 0 → 1 as the copy moves down
  const [moving, setMoving] = useState(false)
  const live = useRef({ slide: 0, moving: false })
  useEffect(() => { Object.assign(live.current, { slide, moving }) })

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const S = live.current
      if (!S.moving) return
      let s = S.slide + dt / SLIDE_SECONDS
      if (s >= 1) {
        s = 1
        S.moving = false
        setMoving(false)
      }
      S.slide = s
      setSlide(s)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const big = isDisplayMode
  const th = TURNS[k]
  const phi = bent ? BEND : 0
  const P1 = meet(C, th, TOP, 0)
  const P2 = meet(C, th, BOT, phi)
  const top = fourAngles(0, th)
  const bottom = fourAngles(phi, th)
  const crossLen = Math.min(268, 250 / Math.abs(Math.sin((th * Math.PI) / 180)))
  const ease = slide < 0.5 ? 2 * slide * slide : 1 - 2 * (1 - slide) ** 2
  const gx = (P2[0] - P1[0]) * ease
  const gy = (P2[1] - P1[1]) * ease
  const done = slide >= 1

  const reset = (fn) => { live.current.moving = false; live.current.slide = 0; setMoving(false); setSlide(0); fn() }

  // `hide`: a grey ? until the copy lands, so the class says the number first
  const angles = (P, list, tone, hide = false) => list.map(([a1, a2, size], i) => {
    const [fill, stroke] = hide ? ['#f1f4f7', MUTED] : tone || classColours(size)
    const [lx, ly] = at(P, labelR(size, 32, 84, 118), (a1 + a2) / 2)
    return (
      <g key={i}>
        <path d={sector(P, 52, a1, a2)} fill={fill} stroke={stroke} strokeWidth="3" />
        <text x={f1(lx)} y={f1(ly + 11)} fontFamily={FONT} fontSize="31" fontWeight="900" fill={stroke} textAnchor="middle">{hide ? '?' : `${size}°`}</text>
      </g>
    )
  })

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* what the lines are, and what the slide showed */}
          <text x="40" y="66" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'The two lines are', 'Les deux droites sont')}</text>
          <text x="40" y="120" fontFamily={FONT} fontSize={bent ? 36 : 44} fontWeight="900" fill={bent ? RED : GREEN_DARK}>
            {bent ? t(lang, 'NOT PARALLEL', 'PAS PARALLÈLES') : t(lang, 'PARALLEL', 'PARALLÈLES')}
          </text>
          <text x="40" y="160" fontFamily={FONT} fontSize="23" fontWeight="700" fill={MUTED}>
            {bent ? t(lang, 'No arrows on them.', 'Pas de flèches.') : t(lang, 'See the arrows?', 'Tu vois les flèches ?')}
          </text>
          {done && (
            <g>
              <rect x="40" y="208" width="330" height="128" rx="16" fill={bent ? '#fbe9ec' : GREEN_T} stroke={bent ? RED : GREEN_DARK} strokeWidth="3" />
              <text x="205" y="258" fontFamily={FONT} fontSize="32" fontWeight="900" fill={bent ? RED : GREEN_DARK} textAnchor="middle">
                {bent ? t(lang, 'It does not fit.', 'Ça ne colle pas.') : t(lang, 'It fits!', 'Ça colle !')}
              </text>
              <text x="205" y="306" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK} textAnchor="middle">
                {bent ? t(lang, 'Different angles.', 'Angles différents.') : t(lang, 'Same place, same angle.', 'Même place, même angle.')}
              </text>
            </g>
          )}

          {/* the two lines and the line across them */}
          <line {...through(TOP, 520, 0)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <line {...through(BOT, 520, phi)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          {!bent && <path d={chevron(1392, TOP[1], 0)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
          {!bent && <path d={chevron(1392, BOT[1], 0)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
          {angles(P1, top)}
          {angles(P2, bottom, bent ? [PURPLE_T, PURPLE] : null, !done)}
          <line {...through(C, crossLen, th)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx={f1(P1[0])} cy={f1(P1[1])} r="6" fill={INK} />
          <circle cx={f1(P2[0])} cy={f1(P2[1])} r="6" fill={INK} />

          {/* the copy of the top crossing, sliding down the line */}
          {(moving || done) && (
            <g transform={`translate(${f1(gx)} ${f1(gy)})`} opacity="0.9">
              <line {...through(P1, 150, 0)} stroke={BLUE} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
              <line {...through(P1, 150, th)} stroke={BLUE} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
              {top.map(([a1, a2], i) => (
                <path key={i} d={sector(P1, 52, a1, a2)} fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="2.5" strokeDasharray="6 5" />
              ))}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="orange" icon={RotateCw} disabled={moving} onClick={() => reset(() => setK((v) => (v + 1) % TURNS.length))}>{t(lang, 'Turn the line', 'Tourne la droite')}</Btn>
        <Btn big={big} tone="blue" icon={ArrowDown} disabled={moving || done} onClick={() => setMoving(true)}>{t(lang, 'Slide it down', 'Fais-la glisser')}</Btn>
        <Btn big={big} tone="purple" icon={Slash} disabled={moving} onClick={() => reset(() => setBent((b) => !b))}>
          {bent ? t(lang, 'Make them parallel', 'Rends-les parallèles') : t(lang, 'Make them not parallel', 'Rends-les non parallèles')}
        </Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={moving || (k === 0 && !bent && slide === 0)} onClick={() => reset(() => { setK(0); setBent(false) })}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
