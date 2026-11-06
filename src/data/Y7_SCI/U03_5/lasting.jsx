// src/data/Y7_SCI/U03_5/lasting.jsx (ported from the classroom deck content/y7-science/U03_5/lasting.jsx)
// The real things, beside the drawings: six photographs, and a launch on film.
//
//   SixPhotos    rice, coal, batteries, water behind a dam, a hot coffee and a
//                bouncing ball, each with its name. The slide's `sort` asks
//                which keep their energy for a year; its explanation gives
//                each one's store.
//   RocketFilm   a NASA launch, 23 seconds, with its sound. The slide's `sort`
//                asks which of what you see and hear are stores and which are
//                transfers.
//
// WHAT CHANGED IN THE PORT
//  · LastsAYear becomes SixPhotos: in the room, a press on a photo showed its
//    verdict after the thumbs vote. Alone, that press would give the sort away,
//    so the photos only show their names and the sort's explanation says which.
//  · RocketFilm loses "Show our list": the list is the sort's explanation.
//  · Photos and the film come from public/images/Y7_SCI/U03_5/ through
//    assetUrl; `tr` from utils/lang.
import { tr } from '../../../utils/lang'
import { assetUrl } from '../../../utils/assetPaths'
import { INK, FONT } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const photo = (f) => assetUrl(`images/Y7_SCI/U03_5/${f}`)

/* ============================================================= *
 * 1 · SIX PHOTOS — will it last a year?
 * ============================================================= */
const TILES = [
  { src: 'rice.jpg', name: ['Rice', 'Du riz'] },
  { src: 'coal.jpg', name: ['Coal', 'Du charbon'] },
  { src: 'battery.jpg', name: ['Batteries', 'Des piles'] },
  { src: 'dam.jpg', name: ['Water behind a dam', 'L’eau d’un barrage'] },
  { src: 'coffee.jpg', name: ['A hot coffee', 'Un café chaud'] },
  { src: 'ball.jpg', name: ['A bouncing ball', 'Une balle qui rebondit'] },
]
const TW = 470, TH = 212
const tileX = (i) => 18 + (i % 3) * 494
const tileY = (i) => 12 + Math.floor(i / 3) * 272

export function SixPhotos({ lang = 'en' }) {
  const L = (p) => (lang === 'fr' ? p[1] : p[0])
  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <defs>
            {TILES.map((_, i) => (
              <clipPath key={i} id={`u35-ph${i}`}><rect x={tileX(i)} y={tileY(i)} width={TW} height={TH} rx="14" /></clipPath>
            ))}
          </defs>
          {TILES.map((tile, i) => {
            const x = tileX(i), y = tileY(i)
            return (
              <g key={i}>
                <image href={photo(tile.src)} x={x} y={y} width={TW} height={TH} preserveAspectRatio="xMidYMid slice" clipPath={`url(#u35-ph${i})`} />
                <rect x={x} y={y} width={TW} height={TH} rx="14" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                <text x={x + TW / 2} y={y + TH + 36} fontFamily={FONT} fontSize="27" fontWeight="900" fill={INK} textAnchor="middle">{L(tile.name)}</text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

/* ============================================================= *
 * 2 · A ROCKET LAUNCH — how many can you find?
 * ============================================================= */
export function RocketFilm({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        className="w-full h-full object-contain rounded-xl bg-black"
        src={photo('rocket.webm')}
        controls
        playsInline
        preload="metadata"
        aria-label={t(lang, 'A NASA rocket launch, with its sound', 'Le lancement d’une fusée de la NASA, avec le son')}
      />
    </div>
  )
}
