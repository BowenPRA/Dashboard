// content/y7-science/U01_3/widgets.jsx
// Interactive tool for 1.3 Specialised cells.
//
// One widget only, on purpose. The definitions and the table are things the
// class copies into a notebook, not things to click. What a static slide cannot
// do is make the class PREDICT before it sees the answer, one cell at a time, at
// the teacher's pace — so this deck shows each specialised cell's real photo and
// reveals its job, then its adaptation, only when the class has committed to a
// guess. It is the recall pass that builds straight into the structure-function
// table they have to make.
//
// It takes the deck's `lang` so its own text is bilingual, and colours each cell
// crimson (animal) or green (plant) to keep the two groups straight.
import { useState } from 'react'
import { assetUrl } from '../../../utils/assetPaths';
const blood = assetUrl('images/Y7_SCI/U01_3/blood.jpg');
const neuron = assetUrl('images/Y7_SCI/U01_3/neuron.jpg');
const trachea = assetUrl('images/Y7_SCI/U01_3/trachea.jpg');
const roothair = assetUrl('images/Y7_SCI/U01_3/roothair.jpg');
const leaf = assetUrl('images/Y7_SCI/U01_3/leaf.jpg');
const IMG = { blood, neuron, trachea, roothair, leaf }

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const CRIMSON = '#c2185b'

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en)

// Five specialised cells: three animal, two plant. Each is a job (function) and
// the structure that is adapted to carry it out — the two halves of the table.
const CARDS = [
  {
    img: 'blood', type: 'animal',
    name: 'Red blood cell', nameVn: 'Tế bào hồng cầu',
    job: 'Carries oxygen around the body.',
    jobVn: 'Vận chuyển oxy đi khắp cơ thể.',
    feature: 'It is packed with the red pigment haemoglobin, and has no nucleus — so there is more room for it.',
    featureVn: 'Nó chứa đầy sắc tố đỏ haemoglobin, và không có nhân — nên có nhiều chỗ hơn cho haemoglobin.',
  },
  {
    img: 'neuron', type: 'animal',
    name: 'Neurone (nerve cell)', nameVn: 'Tế bào thần kinh',
    job: 'Carries electrical signals from one part of the body to another.',
    jobVn: 'Truyền tín hiệu điện từ bộ phận này của cơ thể đến bộ phận khác.',
    feature: 'It has a very long axon, so a signal can travel a long way, very fast.',
    featureVn: 'Nó có một sợi trục rất dài, nên tín hiệu truyền được rất xa và rất nhanh.',
  },
  {
    img: 'trachea', type: 'animal',
    name: 'Ciliated cell', nameVn: 'Tế bào có lông rung',
    job: 'Sweeps mucus, with trapped dust and germs, away from the lungs.',
    jobVn: 'Quét chất nhầy, cùng bụi và vi khuẩn bị giữ lại, ra khỏi phổi.',
    feature: 'It has tiny moving hairs called cilia along its top edge.',
    featureVn: 'Nó có những sợi lông nhỏ biết chuyển động gọi là lông rung (cilia) ở mép trên.',
  },
  {
    img: 'roothair', type: 'plant',
    name: 'Root hair cell', nameVn: 'Tế bào lông hút',
    job: 'Absorbs (soaks up) water from the soil.',
    jobVn: 'Hấp thụ (hút) nước từ đất.',
    feature: 'It has a long, thin extension, giving a big surface for water to move in through.',
    featureVn: 'Nó có phần kéo dài, dài và mảnh, tạo bề mặt lớn để nước đi vào.',
  },
  {
    img: 'leaf', type: 'plant',
    name: 'Palisade cell', nameVn: 'Tế bào mô giậu',
    job: 'Makes food for the plant by photosynthesis.',
    jobVn: 'Tạo thức ăn cho cây bằng quang hợp.',
    feature: 'It is packed with chloroplasts, near the top of the leaf where the sunlight is.',
    featureVn: 'Nó chứa đầy lục lạp, nằm gần mặt trên của lá nơi có ánh sáng mặt trời.',
  },
]

const Stage = ({ children }) => (
  <div className="flex-1 min-h-[240px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden">
    {children}
  </div>
)

export const SpecialisedCellWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [step, setStep] = useState(0) // 0 prompt · 1 job · 2 feature
  const c = CARDS[i]
  const colour = c.type === 'plant' ? GREEN : CRIMSON
  const last = i === CARDS.length - 1
  const go = (n) => { setI(n); setStep(0) }

  const nextLabel =
    step === 0 ? pick(lang, 'What is its job?', 'Nhiệm vụ của nó là gì?')
      : step === 1 ? pick(lang, 'How is it adapted?', 'Nó thích nghi thế nào?')
        : pick(lang, 'Next cell', 'Tế bào tiếp theo')

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white rounded-full px-2 py-0.5 shrink-0"
            style={{ backgroundColor: colour }}>
            {c.type === 'plant' ? pick(lang, 'Plant', 'Thực vật') : pick(lang, 'Animal', 'Động vật')}
          </span>
          <span className="font-black text-xs sm:text-sm uppercase tracking-[0.12em] truncate" style={{ color: colour }}>
            {pick(lang, c.name, c.nameVn)}
          </span>
          <span className="ml-auto font-mono font-black text-slate-400 text-xs tabular-nums shrink-0">{i + 1}/{CARDS.length}</span>
        </div>

        <div className="flex-1 min-h-0 rounded-xl overflow-hidden border-2 transition-colors duration-300" style={{ borderColor: colour }}>
          <img src={IMG[c.img]} alt={pick(lang, c.name, c.nameVn)} className="w-full h-full object-cover" draggable={false} />
        </div>

        <div className="mt-2 space-y-1.5 flex-shrink-0">
          {step >= 1 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${TEAL}12` }}>
              <span className="text-[10px] font-black uppercase tracking-widest mr-2" style={{ color: TEAL }}>{pick(lang, 'Its job', 'Nhiệm vụ')}</span>
              <span className="font-bold text-[13px] sm:text-[15px] text-slate-700 dark:text-slate-200">{pick(lang, c.job, c.jobVn)}</span>
            </div>
          )}
          {step >= 2 && (
            <div className="rounded-xl px-3 py-2 border-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ borderColor: colour, backgroundColor: `${colour}0f` }}>
              <span className="text-[10px] font-black uppercase tracking-widest mr-2" style={{ color: colour }}>{pick(lang, 'Adapted because', 'Thích nghi vì')}</span>
              <span className="font-bold text-[13px] sm:text-[15px] text-slate-700 dark:text-slate-200">{pick(lang, c.feature, c.featureVn)}</span>
            </div>
          )}
        </div>
      </Stage>

      <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(Math.max(0, i - 1))}
            disabled={i === 0}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95">
            {pick(lang, 'Back', 'Lùi')}
          </button>
          <button
            onClick={() => (step < 2 ? setStep(step + 1) : !last && go(i + 1))}
            disabled={step === 2 && last}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: step === 2 ? PURPLE : colour, borderColor: step === 2 ? PURPLE : colour }}>
            {step === 2 && last ? pick(lang, 'That is all five', 'Hết cả năm tế bào') : nextLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
