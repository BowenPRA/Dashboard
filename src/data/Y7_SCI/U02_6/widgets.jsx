// src/data/Y7_SCI/U02_6/widgets.jsx
// Widgets for 2.6 Compounds and formulae, ported from the classroom lesson
// (y7-science/U02_6/widgets.jsx). Two of the classroom's three; each does one
// thing a still slide cannot:
//
//   NameCompound   Flashcards for the naming rules. The elements appear; the
//                  student says the name out loud; Show writes it with the new
//                  ending (-ide or -ate) in orange and the rule underneath.
//
//   FormulaReader  A formula read one symbol at a time. Each press lights up
//                  the next symbol, writes what it means ("H₂ → 2 hydrogen
//                  atoms", "O → no number → 1 oxygen atom") and adds those
//                  atoms to the particle. The last press counts the atoms and
//                  says element or compound.
//
// Dropped: ElementOrCompound, the full-slide hand-vote game (left hand
// element, right hand compound). It only works with a room; in the deck it
// became two scored `particles` activities (ask 'kind' and ask 'find').
//
// Showcase slides give a widget only `lang`, so both draw their stage as ONE
// wide SVG (text scales with the panel) and keep only the buttons as HTML.
// Every SVG opens with a white plate. Neither widget is scored.
import { useState } from 'react'
import { Undo2, ArrowRight, Eye, SkipForward } from 'lucide-react'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const BLUE = '#1a5fa8'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const METAL = { fill: '#fbe7a1', stroke: '#b8912a' }
const NONMETAL = { fill: '#cfe5f5', stroke: '#4f8fbf' }

const tr = (lang, en, vn) => (lang === 'vn' ? vn : en)
const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
const sub = (n) => String(n).split('').map((d) => SUB[+d]).join('')

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  )
}

/* ============================================================= *
 * WIDGET 1 — NAME THE COMPOUND
 * ============================================================= */
const E = {
  sodium: { sym: 'Na', metal: true },
  potassium: { sym: 'K', metal: true },
  calcium: { sym: 'Ca', metal: true },
  lithium: { sym: 'Li', metal: true },
  copper: { sym: 'Cu', metal: true },
  chlorine: { sym: 'Cl', metal: false },
  oxygen: { sym: 'O', metal: false },
  sulfur: { sym: 'S', metal: false },
  carbon: { sym: 'C', metal: false },
  nitrogen: { sym: 'N', metal: false },
}

// stem + ending = the compound's name; the ending is drawn in orange.
const NAME_CARDS = [
  { els: ['sodium', 'chlorine'], stem: 'sodium chlor', end: 'ide', vn: 'natri clorua' },
  { els: ['potassium', 'chlorine'], stem: 'potassium chlor', end: 'ide', vn: 'kali clorua' },
  { els: ['calcium', 'oxygen'], stem: 'calcium ox', end: 'ide', vn: 'canxi oxit' },
  { els: ['lithium', 'oxygen'], stem: 'lithium ox', end: 'ide', vn: 'liti oxit' },
  { els: ['sodium', 'sulfur'], stem: 'sodium sulf', end: 'ide', vn: 'natri sunfua' },
  { els: ['copper', 'sulfur', 'oxygen'], stem: 'copper sulf', end: 'ate', vn: 'đồng sunfat' },
  { els: ['calcium', 'carbon', 'oxygen'], stem: 'calcium carbon', end: 'ate', vn: 'canxi cacbonat' },
  { els: ['potassium', 'nitrogen', 'oxygen'], stem: 'potassium nitr', end: 'ate', vn: 'kali nitrat' },
  { els: ['sodium', 'carbon', 'oxygen'], stem: 'sodium carbon', end: 'ate', vn: 'natri cacbonat' },
]

const TILE_W = 300
const PLUS_W = 70

export function NameCompound({ lang = 'en' }) {
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)
  const card = NAME_CARDS[pos]
  const n = card.els.length
  const rowW = n * TILE_W + (n - 1) * PLUS_W
  const x0 = 560 - rowW / 2

  // Where the stem ends and the ending starts: an estimate of the name's width
  // at 96px, so the whole name sits roughly centred.
  const CH = 96 * 0.56
  const split = 560 - ((card.stem.length + card.end.length) * CH) / 2 + card.stem.length * CH
  const ate = card.end === 'ate'

  const next = () => {
    if (!shown) { setShown(true); return }
    setShown(false)
    setPos((p) => (p + 1) % NAME_CARDS.length)
  }
  const back = () => {
    if (shown) { setShown(false); return }
    setPos((p) => (p - 1 + NAME_CARDS.length) % NAME_CARDS.length)
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          <text x="1096" y="426" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{pos + 1} / {NAME_CARDS.length}</text>

          {card.els.map((name, k) => {
            const el = E[name]
            const x = x0 + k * (TILE_W + PLUS_W)
            const c = el.metal ? METAL : NONMETAL
            return (
              <g key={name + k}>
                <rect x={x} y="16" width={TILE_W} height="150" rx="18" fill={c.fill} stroke={c.stroke} strokeWidth="3" />
                <text x={x + TILE_W / 2} y="98" fontFamily={FONT} fontSize="70" fontWeight="bold" fill={INK} textAnchor="middle">{el.sym}</text>
                <text x={x + TILE_W / 2} y="146" fontFamily={FONT} fontSize="32" fill={MUTED} textAnchor="middle">{name}</text>
                {k < n - 1 && (
                  <text x={x + TILE_W + PLUS_W / 2} y="110" fontFamily={FONT} fontSize="56" fontWeight="bold" fill={INK} textAnchor="middle">+</text>
                )}
              </g>
            )
          })}

          <path d="M 560 178 v 32 m -14 -14 l 14 14 l 14 -14" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

          {shown ? (
            <g>
              <text x={split} y="304" fontFamily={FONT} fontSize="96" fontWeight="bold" fill={INK} textAnchor="end">{card.stem}</text>
              <text x={split} y="304" fontFamily={FONT} fontSize="96" fontWeight="bold" fill={KEY} textAnchor="start">{card.end}</text>
              <rect x="210" y="330" width="700" height="52" rx="26" fill="#fdf1e3" stroke={KEY} strokeWidth="2.5" />
              <text x="560" y="365" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY} textAnchor="middle">
                {ate
                  ? tr(lang, 'Two elements + oxygen: ends in -ate', 'Hai nguyên tố + oxi: kết thúc bằng -ate')
                  : tr(lang, 'Two elements: the non-metal ends in -ide', 'Hai nguyên tố: phi kim kết thúc bằng -ide')}
              </text>
              {lang === 'vn' && (
                <text x="560" y="420" fontFamily={FONT} fontSize="26" fill={MUTED} textAnchor="middle">({card.vn})</text>
              )}
            </g>
          ) : (
            <text x="560" y="320" fontFamily={FONT} fontSize="120" fontWeight="bold" fill="#c3cbd2" textAnchor="middle">?</text>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={pos === 0 && !shown} onClick={back}>{tr(lang, 'Back', 'Lùi')}</Btn>
        <Btn tone="orange" icon={shown ? ArrowRight : Eye} onClick={next}>
          {shown ? tr(lang, 'Next', 'Tiếp') : tr(lang, 'Show the name', 'Hiện tên')}
        </Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — READ THE FORMULA
 * ============================================================= */
const ATOM = {
  H: { r: 30, fill: '#ffffff', stroke: '#6b7580', en: 'hydrogen', vn: 'hiđro' },
  O: { r: 40, fill: '#f08b82', stroke: '#b3261e', en: 'oxygen', vn: 'oxi' },
  C: { r: 40, fill: '#aab4bc', stroke: '#3b444b', en: 'carbon', vn: 'cacbon' },
  S: { r: 44, fill: '#efe04a', stroke: '#8a7c00', en: 'sulfur', vn: 'lưu huỳnh' },
  Na: { r: 44, fill: '#d9c7ef', stroke: '#5c2483', en: 'sodium', vn: 'natri' },
  Ca: { r: 48, fill: '#fbe7a1', stroke: '#b8912a', en: 'calcium', vn: 'canxi' },
}

// parts: the formula in reading order; atoms: positions around the particle's
// centre, drawn touching like the book's particle diagrams.
const FORMULAE = [
  { parts: [['C', 1], ['O', 1]], atoms: [['C', -38, 0], ['O', 38, 0]] },
  { parts: [['C', 1], ['O', 2]], atoms: [['O', -76, 0], ['C', 0, 0], ['O', 76, 0]] },
  { parts: [['H', 2], ['O', 1]], atoms: [['H', -54, 26], ['H', 54, 26], ['O', 0, -20]] },
  { parts: [['C', 1], ['H', 4]], atoms: [['H', -48, -48], ['H', 48, -48], ['H', -48, 48], ['H', 48, 48], ['C', 0, 0]] },
  { parts: [['O', 2]], atoms: [['O', -38, 0], ['O', 38, 0]] },
  { parts: [['Ca', 1], ['O', 1]], atoms: [['Ca', -42, 0], ['O', 42, 0]] },
  { parts: [['H', 2], ['S', 1]], atoms: [['H', -58, 30], ['H', 58, 30], ['S', 0, -20]] },
  { parts: [['Na', 1], ['O', 1], ['H', 1]], atoms: [['Na', -80, 0], ['H', 66, 0], ['O', 0, 0]] },
  { parts: [['Ca', 1], ['C', 1], ['O', 3]], atoms: [['Ca', -112, 38], ['O', 40, -76], ['O', 106, 38], ['O', -26, 38], ['C', 40, 0]] },
]

// Fixed advances for the big formula, so a part can be boxed without measuring.
const ADV = { C: 82, O: 94, H: 90, S: 74, N: 90, a: 66 }
const SUB_ADV = 44

function layoutFormula(parts) {
  const glyphs = []
  const boxes = []
  let x = 0
  parts.forEach(([sym, n], p) => {
    const start = x
    sym.split('').forEach((ch) => {
      const w = ADV[ch] ?? 80
      glyphs.push({ ch, x: x + w / 2, sub: false, part: p })
      x += w
    })
    if (n > 1) {
      glyphs.push({ ch: String(n), x: x + SUB_ADV / 2, sub: true, part: p })
      x += SUB_ADV
    }
    boxes.push({ x: start, w: x - start })
  })
  return { glyphs, boxes, width: x }
}

export function FormulaReader({ lang = 'en' }) {
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0) // 0 formula · 1..P parts · P+1 summary
  const f = FORMULAE[which]
  const P = f.parts.length
  const { glyphs, boxes, width } = layoutFormula(f.parts)
  const fx = 290 - width / 2
  const total = f.parts.reduce((s, [, n]) => s + n, 0)
  const kinds = P
  const lit = step >= 1 && step <= P ? step - 1 : -1

  const line = ([sym, n]) => {
    const a = ATOM[sym]
    const name = tr(lang, a.en, a.vn)
    const count = lang === 'vn' ? `${n} nguyên tử ${name}` : `${n} ${name} atom${n > 1 ? 's' : ''}`
    const none = n === 1 ? tr(lang, ' (no number)', ' (không có số)') : ''
    return `${sym}${n > 1 ? sub(n) : ''} → ${count}${none}`
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          <line x1="580" y1="24" x2="580" y2="416" stroke="#e2e8f0" strokeWidth="2" />
          <text x="28" y="34" fontFamily={FONT} fontSize="20" fontWeight="bold" fill="#9aa5ae" textAnchor="start">{which + 1} / {FORMULAE.length}</text>

          {lit >= 0 && (
            <rect x={fx + boxes[lit].x - 3} y="44" width={boxes[lit].w + 6} height="160" rx="14" fill="#fdf1e3" stroke={KEY} strokeWidth="4" />
          )}
          {glyphs.map((g, i) => (
            <text key={i} x={fx + g.x} y={g.sub ? 196 : 164} fontFamily={FONT} fontSize={g.sub ? 70 : 120} fontWeight="bold"
              fill={g.part === lit ? KEY : INK} textAnchor="middle">
              {g.ch}
            </text>
          ))}

          {f.parts.map((part, p) => (
            step > p && (
              <text key={p} x="40" y={264 + p * 44} fontFamily={FONT} fontSize="30" fontWeight={p === lit ? 'bold' : 'normal'} fill={p === lit ? KEY : INK}>
                {line(part)}
              </text>
            )
          ))}
          {step === 0 && (
            <text x="290" y="290" fontFamily={FONT} fontSize="30" fill="#9aa5ae" textAnchor="middle">
              {tr(lang, 'How many atoms? Which elements?', 'Bao nhiêu nguyên tử? Nguyên tố nào?')}
            </text>
          )}

          {f.atoms.map(([sym, dx, dy], i) => {
            const a = ATOM[sym]
            const p = f.parts.findIndex(([s]) => s === sym)
            const on = step > p
            return (
              <g key={`${which}-${i}`} style={{ opacity: on ? 1 : 0, transition: 'opacity 450ms' }}>
                <circle cx={840 + dx} cy={180 + dy} r={a.r} fill={a.fill} stroke={p === lit ? KEY : a.stroke} strokeWidth={p === lit ? 5 : 3} />
                <text x={840 + dx} y={180 + dy + 10} fontFamily={FONT} fontSize="28" fontWeight="bold" fill={INK} textAnchor="middle">{sym}</text>
              </g>
            )
          })}

          {step > P && (
            <g>
              <text x="840" y="360" fontFamily={FONT} fontSize="42" fontWeight="bold" fill={INK} textAnchor="middle">
                {tr(lang, `${total} atoms in one particle`, `${total} nguyên tử trong một hạt`)}
              </text>
              <text x="840" y="406" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={kinds > 1 ? KEY : BLUE} textAnchor="middle">
                {kinds > 1
                  ? tr(lang, `a compound: ${kinds} kinds of atom`, `một hợp chất: ${kinds} loại nguyên tử`)
                  : tr(lang, 'an element: one kind of atom', 'một nguyên tố: một loại nguyên tử')}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={step === P + 1} onClick={() => setStep((s) => Math.min(P + 1, s + 1))}>{tr(lang, 'Next step', 'Bước tiếp')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % FORMULAE.length); setStep(0) }}>{tr(lang, 'Next formula', 'Công thức khác')}</Btn>
      </div>
    </div>
  )
}
