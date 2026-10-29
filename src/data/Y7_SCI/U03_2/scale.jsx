// src/data/Y7_SCI/U03_2/scale.jsx
// ScaleShrink, ported from the classroom's Models deck
// (content/y7-science/U03_models/sizes.jsx): a stepper — the Sun becomes a
// football, and one press at a time the Earth, the Moon, Jupiter, Neptune and
// the nearest star are shrunk by the SAME amount. Size and distance, side by
// side, for each.
//
// WHAT CHANGED IN THE PORT
//  · PlanetSizes (the zoom from the planets out to the Sun) does not port: the
//    deck's STAR_PLANET drawing (the Sun and Jupiter to scale) and this table
//    carry size.
//  · The 1500-wide table is unreadable below about 760 px (a phone, or beside
//    the deck's predict panel on a laptop), so there the same rows are cards,
//    one per object. The widget measures its own width to choose.
import { useState, useRef, useEffect } from 'react'
import { Undo2, ChevronRight, RotateCcw } from 'lucide-react'
import { tr } from '../../../utils/lang'
import { Btn } from './ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/* ============================================================= *
 * SCALE SHRINK — the Sun is a football
 * ============================================================= */
// One factor for everything: the Sun (1 391 400 km) becomes a 22 cm football,
// so every size and every distance is divided by about 6.3 billion.
//   Earth    12 756 km → 2.0 mm        150 million km → 24 m
//   Moon      3 475 km → 0.5 mm        384 400 km from Earth → 6 cm
//   Jupiter 142 984 km → 2.3 cm        778 million km → 123 m
//   Neptune  49 528 km → 7.8 mm        4.5 billion km → 711 m
//   Proxima Centauri (the nearest star), 40 trillion km → 6 400 km
const ROWS = [
  {
    key: 'earth',
    name: ['Earth', 'La Terre'],
    real: ['12 756 km wide', '12 756 km de large'],
    model: ['2 mm', '2 mm'],
    like: ['a pinhead', 'une tête d’épingle'],
    far: ['150 million km', '150 millions de km'],
    farModel: ['24 m', '24 m'],
    farLike: ['nearly a basketball court', 'presque un terrain de basket'],
    icon: 'pin',
  },
  {
    key: 'moon',
    name: ['The Moon', 'La Lune'],
    real: ['3 475 km wide', '3 475 km de large'],
    model: ['0.5 mm', '0.5 mm'],
    like: ['a grain of sand', 'un grain de sable'],
    far: ['384 400 km from the Earth', '384 400 km de la Terre'],
    farModel: ['6 cm', '6 cm'],
    farLike: ['from the pinhead', 'de la tête d’épingle'],
    icon: 'sand',
  },
  {
    key: 'jupiter',
    name: ['Jupiter', 'Jupiter'],
    real: ['142 984 km wide', '142 984 km de large'],
    model: ['2.3 cm', '2.3 cm'],
    like: ['a grape', 'un grain de raisin'],
    far: ['778 million km', '778 millions de km'],
    farModel: ['123 m', '123 m'],
    farLike: ['longer than a football pitch', 'plus long qu’un terrain de foot'],
    icon: 'grape',
  },
  {
    key: 'neptune',
    name: ['Neptune', 'Neptune'],
    real: ['49 528 km wide', '49 528 km de large'],
    model: ['8 mm', '8 mm'],
    like: ['a pea', 'un petit pois'],
    far: ['4.5 billion km', '4.5 milliards de km'],
    farModel: ['711 m', '711 m'],
    farLike: ['a 10-minute walk', '10 minutes à pied'],
    icon: 'pea',
  },
  {
    key: 'star',
    name: ['The nearest star', 'L’étoile la plus proche'],
    sub: ['Proxima Centauri', 'Proxima du Centaure'],
    model: ['3.4 cm', '3.4 cm'],
    like: ['a walnut', 'une noix'],
    far: ['40 trillion km', '40 000 milliards de km'],
    farModel: ['6 400 km', '6 400 km'],
    farLike: ['as far as the centre of the Earth', 'aussi loin que le centre de la Terre'],
    icon: 'star',
  },
]

const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', RULE = '#d5dbe1'

function LikeIcon({ kind, x, y }) {
  switch (kind) {
    case 'pin':
      return (
        <g>
          <line x1={x} y1={y - 2} x2={x + 26} y2={y + 26} stroke="#8a96a3" strokeWidth="3" strokeLinecap="round" />
          <circle cx={x} cy={y - 2} r="5" fill="#1a5fa8" />
        </g>
      )
    case 'sand':
      return <g><circle cx={x} cy={y + 6} r="2.2" fill="#c9a86a" /><circle cx={x + 9} cy={y + 9} r="1.6" fill="#b8955a" /><circle cx={x - 7} cy={y + 10} r="1.4" fill="#d9bb80" /></g>
    case 'grape':
      return <g><circle cx={x} cy={y + 6} r="13" fill="#6d3a8c" /><circle cx={x - 4} cy={y + 1} r="4" fill="#a87cc4" opacity="0.7" /><path d={`M ${x} ${y - 7} q 2 -8 9 -10`} stroke="#4a8b23" strokeWidth="3" fill="none" /></g>
    case 'pea':
      return <g><circle cx={x} cy={y + 6} r="5" fill="#4a8b23" /><circle cx={x - 1.5} cy={y + 4} r="1.6" fill="#a6d77f" /></g>
    case 'star':
      return <path d={`M ${x} ${y - 10} l 4 9 10 1 -8 6 3 10 -9 -6 -9 6 3 -10 -8 -6 10 -1 z`} fill="#e0a21b" stroke="#a86f00" strokeWidth="1.5" />
    default:
      return null
  }
}

export function ScaleShrink({ lang = 'en' }) {
  const [n, setN] = useState(0)
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const colX = { name: 40, model: 300, like: 520, far: 760, farModel: 1060, farLike: 1210 }
  const rowY = (i) => 196 + i * 62
  const done = n >= ROWS.length
  // The table needs about 760 px to be read; narrower (a phone, or beside the
  // deck's predict panel on a laptop) the same rows are cards.
  const box = useRef(null)
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const el = box.current
    if (!el) return undefined
    const fit = () => setWide(el.getBoundingClientRect().width >= 760)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className="w-full h-full flex flex-col gap-2 select-none">
      {/* narrow: the same rows as cards */}
      <div className={`${wide ? 'hidden' : ''} flex-1 min-h-0 w-full overflow-y-auto rounded-xl bg-white p-2 text-left`}>
        <div className="flex items-center gap-2 px-1 pb-1.5">
          <svg viewBox="40 20 104 104" className="w-9 h-9 shrink-0" aria-hidden="true">
            <circle cx="92" cy="72" r="44" fill="#ffffff" stroke={INK} strokeWidth="4" />
            <path d="M 92 52 l 17 12 -6 20 -22 0 -6 -20 z" fill={INK} />
          </svg>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-800">{t(lang, 'The Sun is a football: 22 cm', 'Le Soleil est un ballon de foot : 22 cm')}</div>
            <div className="text-[11px] font-semibold text-slate-500 leading-tight">{t(lang, 'Everything shrunk the same: about 6 300 000 000 times.', 'Tout réduit pareil : environ 6 300 000 000 de fois.')}</div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {ROWS.map((r, i) => (
            <div key={r.key} className={`rounded-lg px-2 py-1.5 ${i % 2 ? 'bg-slate-50' : 'bg-white'} border border-slate-100`}>
              <div className="text-[13px] font-black text-slate-800">{L(r.name)}{r.sub && <span className="font-semibold text-slate-500"> · {L(r.sub)}</span>}</div>
              {i < n ? (
                <div className="grid grid-cols-2 gap-x-2 text-[12px] leading-snug">
                  <div><span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">{t(lang, 'Model size', 'Taille')}</span><span className="font-black" style={{ color: KEY }}>{L(r.model)}</span> <span className="text-slate-600">{L(r.like)}</span></div>
                  <div><span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">{t(lang, 'Model distance', 'Dans le modèle')}</span><span className="font-black" style={{ color: KEY }}>{L(r.farModel)}</span> <span className="text-slate-600">{L(r.farLike)}</span></div>
                </div>
              ) : (
                <div className="text-[12px] font-bold text-slate-300">?</div>
              )}
            </div>
          ))}
        </div>
        {done && (
          <div className="mt-1.5 rounded-lg border-2 px-2 py-1 text-center text-[12px] font-black" style={{ borderColor: KEY, color: KEY, backgroundColor: '#fdf1e3' }}>
            {t(lang, 'The Solar System is almost all EMPTY SPACE.', 'Le système solaire est presque entièrement VIDE.')}
          </div>
        )}
      </div>
      <div className={`${wide ? '' : 'hidden'} flex-1 min-h-0 w-full`}>
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          {/* the football Sun */}
          <g>
            <circle cx="92" cy="72" r="44" fill="#ffffff" stroke={INK} strokeWidth="3" />
            <path d="M 92 52 l 17 12 -6 20 -22 0 -6 -20 z" fill={INK} />
            <path d="M 52 60 l 12 -2 6 14 -10 12 -10 -6 z M 132 60 l -12 -2 -6 14 10 12 10 -6 z M 74 106 l 6 -12 24 0 6 12 -18 6 z" fill={INK} />
            <text x="160" y="62" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK}>{t(lang, 'The Sun is a football: 22 cm', 'Le Soleil est un ballon de foot : 22 cm')}</text>
            <text x="160" y="100" fontFamily={FONT} fontSize="24" fill={MUTED}>{t(lang, 'Everything is shrunk by the same amount: about 6 300 000 000 times.', 'Tout est réduit de la même façon : environ 6 300 000 000 de fois.')}</text>
          </g>
          {/* column heads */}
          <g fontFamily={FONT} fontSize="19" fontWeight="800" fill={MUTED} letterSpacing="1.5">
            <text x={colX.name} y="160">{t(lang, 'OBJECT', 'OBJET')}</text>
            <text x={colX.model} y="160">{t(lang, 'MODEL SIZE', 'TAILLE')}</text>
            <text x={colX.far} y="160">{t(lang, 'REAL DISTANCE', 'VRAIE DISTANCE')}</text>
            <text x={colX.farModel} y="160">{t(lang, 'MODEL DISTANCE', 'DANS LE MODÈLE')}</text>
          </g>
          <line x1="30" y1="172" x2="1470" y2="172" stroke={RULE} strokeWidth="2" />
          {ROWS.map((r, i) => {
            const shown = i < n
            const y = rowY(i)
            return (
              <g key={r.key}>
                <rect x="30" y={y - 26} width="1440" height="56" rx="10" fill={i % 2 ? '#f7fafc' : '#ffffff'} />
                <text x={colX.name} y={r.sub ? y : y + 8} fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{L(r.name)}</text>
                {r.sub && <text x={colX.name} y={y + 24} fontFamily={FONT} fontSize="17" fill={MUTED}>{L(r.sub)}</text>}
                {shown ? (
                  <>
                    {r.model[0] && <text x={colX.model} y={y + 8} fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY}>{L(r.model)}</text>}
                    {r.like[0] && <LikeIcon kind={r.icon} x={colX.like - 28} y={r.icon === 'star' ? y - 2 : y - 6} />}
                    {r.like[0] && <text x={colX.like} y={y + 8} fontFamily={FONT} fontSize="23" fill={INK}>{L(r.like)}</text>}
                    <text x={colX.far} y={y + 8} fontFamily={FONT} fontSize="23" fill={MUTED}>{L(r.far)}</text>
                    <text x={colX.farModel} y={y + 8} fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY}>{L(r.farModel)}</text>
                    <text x={colX.farModel} y={y + 30} fontFamily={FONT} fontSize="17" fill={MUTED}>{L(r.farLike)}</text>
                  </>
                ) : (
                  <text x={colX.model} y={y + 8} fontFamily={FONT} fontSize="26" fill="#b4bec8">?</text>
                )}
              </g>
            )
          })}
          {done && (
            <g>
              <rect x="30" y="508" width="1440" height="44" rx="10" fill="#fdf1e3" stroke={KEY} strokeWidth="2" />
              <text x="750" y="538" fontFamily={FONT} fontSize="24" fontWeight="900" fill={KEY} textAnchor="middle">
                {t(lang, 'The Solar System is almost all EMPTY SPACE.', 'Le système solaire est presque entièrement VIDE.')}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={n === 0} onClick={() => setN((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={done} onClick={() => setN((v) => Math.min(ROWS.length, v + 1))}>{t(lang, 'Shrink the next one', 'Réduire le suivant')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={n === 0} onClick={() => setN(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
