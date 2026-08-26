// src/data/Y7_MATH/U01_2/widgets.jsx
// Interactive tools for 1.2 Multiplying & Dividing Integers.
//
// Ported from the classroom deck (C:\Users\bowen\lessons), reduced to the one
// widget the self-study deck keeps: "Say It, Then Write It". The classroom
// PairsGameWidget (a team timer) is dropped — the arcade is the unit's game
// now, and the sign rules are something a student copies down, not clicks.
//
// The widget takes the deck's `lang` so its own interface text is bilingual
// like the slide around it; Notes.jsx forwards it through WidgetRenderer.
import { useState } from 'react';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const GREEN = '#4a8b23';
const ORANGE = '#c25e12';

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en);

const Stage = ({ children, className = '' }) => (
  <div className={`flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Controls = ({ children }) => (
  <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
    {children}
  </div>
);

/* ============================================================= *
 * SAY IT, THEN WRITE IT
 *
 * Read the English, find the words that carry the maths, write the
 * calculation, and only then the answer. The arithmetic is the easy
 * part; the English is where the marks go, so the drill runs sentence
 * -> calculation in both directions with this unit's words.
 * ============================================================= */
const DRILL = [
  {
    prompt: 'Multiply -7 by 4.',
    promptVn: 'Multiply -7 by 4.',
    signal: '“multiply … by” — you start at the first number, so -7 comes first.',
    signalVn: '“multiply … by” (nhân … với) — em bắt đầu ở số thứ nhất, nên -7 đứng trước.',
    calc: '-7 × 4',
    calcVn: '-7 × 4',
    answer: '-28',
  },
  {
    prompt: 'Find the product of -5 and -6.',
    promptVn: 'Find the product of -5 and -6.',
    signal: '“product” always means multiply. Two negatives, so the answer is positive.',
    signalVn: '“product” (tích) luôn có nghĩa là nhân. Hai số âm, nên đáp án là số dương.',
    calc: '-5 × -6',
    calcVn: '-5 × -6',
    answer: '30',
  },
  {
    prompt: 'Divide -36 by 9.',
    promptVn: 'Divide -36 by 9.',
    signal: '“divide … by” — the number after “divide” is the one being cut up.',
    signalVn: '“divide … by” (chia … cho) — số đứng sau “divide” là số bị chia.',
    calc: '-36 ÷ 9',
    calcVn: '-36 ÷ 9',
    answer: '-4',
  },
  {
    prompt: 'Share a debt of 30 dollars equally between 5 friends.',
    promptVn: 'Share a debt of 30 dollars equally between 5 friends.',
    signal: '“share equally between” means divide. A debt is negative, so start at -30.',
    signalVn: '“share equally between” (chia đều cho) nghĩa là chia. Nợ là số âm, nên bắt đầu từ -30.',
    calc: '-30 ÷ 5',
    calcVn: '-30 ÷ 5',
    answer: '-6',
  },
  {
    prompt: 'What is 8 times -3?',
    promptVn: 'What is 8 times -3?',
    signal: '“times” is the everyday word for multiply. Different signs, so negative.',
    signalVn: '“times” là từ thông dụng của phép nhân. Hai dấu khác nhau, nên kết quả âm.',
    calc: '8 × -3',
    calcVn: '8 × -3',
    answer: '-24',
  },
  {
    reverse: true,
    prompt: '-48 ÷ -6',
    promptVn: '-48 ÷ -6',
    signal: 'Say it out loud in English, two different ways.',
    signalVn: 'Hãy đọc to bằng tiếng Anh, theo hai cách khác nhau.',
    calc: '“negative forty-eight divided by negative six” · “how many negative sixes are there in negative forty-eight?”',
    calcVn: '“negative forty-eight divided by negative six” · “how many negative sixes are there in negative forty-eight?”',
    answer: '8',
  },
];

export const TranslateWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0);
  const [step, setStep] = useState(0); // 0 prompt · 1 signal · 2 calculation · 3 answer
  const item = DRILL[i];
  const last = i === DRILL.length - 1;

  const go = (n) => { setI(n); setStep(0); };

  const nextLabel = step === 0 ? pick(lang, 'Which words matter?', 'Từ nào quan trọng?')
    : step === 1 ? (item.reverse ? pick(lang, 'Show the English', 'Hiện câu tiếng Anh') : pick(lang, 'Write the calculation', 'Viết phép tính'))
      : step === 2 ? pick(lang, 'Show the answer', 'Hiện đáp án')
        : pick(lang, 'Next sentence', 'Câu tiếp theo');

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {item.reverse ? pick(lang, 'Maths → English', 'Toán → Tiếng Anh') : pick(lang, 'English → Maths', 'Tiếng Anh → Toán')}
          </span>
          <span className="font-mono font-black text-xs text-slate-400 tabular-nums">{i + 1}/{DRILL.length}</span>
        </div>

        <div className="rounded-xl border-2 px-3 py-2.5 mb-2 shrink-0" style={{ borderColor: TEAL, backgroundColor: `${TEAL}0f` }}>
          <p className={`font-black text-slate-800 dark:text-slate-100 leading-snug ${item.reverse ? 'font-mono text-3xl text-center' : 'text-base sm:text-lg lg:text-xl'}`}>
            {pick(lang, item.prompt, item.promptVn)}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-2">
          {step >= 1 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${ORANGE}14` }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: ORANGE }}>{pick(lang, 'Signal words', 'Từ khoá')}</div>
              <div className="font-bold text-[15px] sm:text-base lg:text-lg text-slate-700 dark:text-slate-200">{pick(lang, item.signal, item.signalVn)}</div>
            </div>
          )}
          {step >= 2 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${PURPLE}12` }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: PURPLE }}>
                {item.reverse ? pick(lang, 'Say it like this', 'Nói như thế này') : pick(lang, 'The calculation', 'Phép tính')}
              </div>
              <div className={`font-black text-slate-800 dark:text-slate-100 ${item.reverse ? 'text-[15px] sm:text-base leading-snug' : 'font-mono text-2xl'}`}>
                {pick(lang, item.calc, item.calcVn)}
              </div>
            </div>
          )}
          {step >= 3 && (
            <div className="rounded-xl px-3 py-2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 border-2" style={{ borderColor: GREEN, backgroundColor: `${GREEN}12` }}>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>{pick(lang, 'Answer', 'Đáp án')}</span>
              <span className="font-mono font-black text-2xl" style={{ color: GREEN }}>{item.answer}</span>
            </div>
          )}
        </div>
      </Stage>

      <Controls>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(Math.max(0, i - 1))}
            disabled={i === 0}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95">
            {pick(lang, 'Back', 'Lùi')}
          </button>
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : !last && go(i + 1))}
            disabled={step === 3 && last}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: step === 3 ? PURPLE : TEAL, borderColor: step === 3 ? PURPLE : TEAL }}>
            {step === 3 && last ? pick(lang, 'That is all of them', 'Hết rồi') : nextLabel}
          </button>
        </div>
      </Controls>
    </div>
  );
};
