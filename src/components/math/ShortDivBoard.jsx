import { Plus, Minus } from 'lucide-react';
import { boxOrder, boxDomId as domId, focusBox } from './shortDivBoardHelpers';

/* ------------------------------------------------------------------ *
 * The bus stop, written the short way (utils/shortDivision.js).
 *
 *         0  8 . 2  8  5  7        quotient digits, one box per column
 *       ┌──────────────────
 *     7 │ 5 ⁵8 . ²0 ⁶0 ⁴0 ⁵0       each remainder in a small box up and to
 *                                  the LEFT of the next digit
 *
 * Drawn for the Bus Stop task (one column live at a time) and for the
 * `busstop` deck activity (every box live at once): the parent owns the
 * entries and says what state each box is in.
 *
 * Box ids: `q<c>` the quotient digit above column c; `k<c>` the carry written
 * on column c (the remainder carried INTO it), c ≥ 1.
 *
 * Props
 *   model      shortDivModel(item)
 *   zeros      zeros the student has added after the point
 *   entries    { [id]: text }
 *   stateOf    (id) => 'live' | 'good' | 'bad' | 'shown' | 'idle'
 *   onEdit     (id, text) => void
 *   onEnter    () => void
 *   onAddZero / onRemoveZero   omit (or null) to hide the button
 *   activeCol  the column being worked (tinted), or null
 *   uid        prefix for the inputs' DOM ids (focus is moved by id)
 *   ink        accent colour
 *   compact    narrower columns, and the zero buttons under the number — for
 *              the column beside a slide
 *   labels     { addZero, removeZero, top, carry } — aria / button text
 * ------------------------------------------------------------------ */

const TONE = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
  idle: 'border-dashed border-slate-200 dark:border-slate-700 bg-transparent text-slate-300',
};

const SIZES = {
  roomy: {
    col: 'w-11 sm:w-[3.25rem]', top: 'h-12 sm:h-[3.75rem]', bottom: 'h-14 sm:h-[4.25rem]', point: 'w-3 sm:w-4',
    q: 'w-9 h-11 sm:w-11 sm:h-[3.25rem] text-2xl sm:text-3xl', digit: 'text-3xl sm:text-[2.6rem]',
    carry: 'h-6 sm:h-7 text-sm sm:text-lg', carryW: ['w-5 sm:w-6', 'w-7 sm:w-9'],
  },
  compact: {
    col: 'w-9 sm:w-10', top: 'h-11', bottom: 'h-14', point: 'w-2.5 sm:w-3',
    q: 'w-8 h-10 sm:w-9 text-xl', digit: 'text-3xl',
    carry: 'h-6 text-sm', carryW: ['w-5', 'w-7'],
  },
};

export default function ShortDivBoard({
  model, zeros = 0, entries = {}, stateOf, onEdit, onEnter, onAddZero, onRemoveZero,
  activeCol = null, uid = 'sd', ink = '#7c3aed', compact = false, labels = {},
}) {
  const S = compact ? SIZES.compact : SIZES.roomy;
  const avail = model.givenCols + zeros;
  const order = boxOrder(avail);
  const twoDigitCarry = model.divisor > 10;
  const hasPoint = avail > model.intLen;
  const digitOf = (c) => (c < model.cols.length ? model.cols[c].digit : 0);

  // After a digit is typed, move on to the next box that is live.
  const advance = (id) => {
    const i = order.indexOf(id);
    for (let j = i + 1; j < order.length; j += 1) {
      if (stateOf(order[j]) === 'live' || stateOf(order[j]) === 'bad') { focusBox(uid, order[j]); return; }
    }
  };
  // Enter checks; + or . adds a zero after the point, as the pencil would.
  const onKey = (e) => {
    if (e.key === 'Enter') onEnter?.();
    else if ((e.key === '+' || e.key === '.') && onAddZero) { e.preventDefault(); onAddZero(); }
  };
  const type = (id, raw, max) => {
    const text = raw.replace(/\D/g, '').slice(-max);      // a new digit replaces the old one
    onEdit(id, text);
    if (text.length === max) advance(id);
  };

  const qBox = (c) => {
    const id = `q${c}`;
    const st = stateOf(id);
    const editable = st === 'live' || st === 'bad';
    return (
      <input
        id={domId(uid, id)}
        value={entries[id] ?? ''}
        onChange={(e) => type(id, e.target.value, 1)}
        onKeyDown={onKey}
        readOnly={!editable}
        disabled={st === 'idle'}
        inputMode="numeric" autoComplete="off" aria-label={`${labels.top || 'answer digit'} ${c + 1}`}
        className={`${S.q} rounded-lg border-2 text-center font-mono font-black tabular-nums outline-none transition-colors
          ${TONE[st] || 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900'}`}
        style={st === 'live' ? { borderColor: ink } : undefined}
      />
    );
  };

  const carryBox = (c) => {
    const id = `k${c}`;
    const st = stateOf(id);
    const editable = st === 'live' || st === 'bad';
    const text = entries[id] ?? '';
    // A settled carry of 0 is simply not written.
    if ((st === 'good' || st === 'shown') && (!text || Number(text) === 0)) return null;
    if (st === 'idle') return null;
    return (
      <input
        id={domId(uid, id)}
        value={text}
        onChange={(e) => type(id, e.target.value, twoDigitCarry ? 2 : 1)}
        onKeyDown={onKey}
        readOnly={!editable}
        inputMode="numeric" autoComplete="off" aria-label={`${labels.carry || 'remainder carried onto digit'} ${c + 1}`}
        className={`absolute -left-1.5 top-0.5 ${S.carry} ${S.carryW[twoDigitCarry ? 1 : 0]} rounded-md border-[1.5px] text-center font-mono font-black leading-none tabular-nums outline-none transition-colors
          ${st === 'good' ? 'border-transparent bg-transparent text-orange-600 dark:text-orange-300'
            : st === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              : st === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300'
                : 'border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900'}`}
      />
    );
  };

  const point = (key, height) => (
    <div key={key} className={`${S.point} ${height} shrink-0 flex items-end justify-center pb-2 font-mono font-black text-3xl leading-none text-slate-800 dark:text-slate-100`}>.</div>
  );

  const top = [];
  const bottom = [];
  for (let c = 0; c < avail; c += 1) {
    if (hasPoint && c === model.intLen) {
      top.push(point('tp', S.top));
      bottom.push(point('bp', S.bottom));
    }
    const added = c >= model.givenCols;
    const active = c === activeCol;
    top.push(
      <div key={`t${c}`} className={`${S.col} ${S.top} shrink-0 flex items-center justify-center`}>{qBox(c)}</div>,
    );
    bottom.push(
      <div key={`b${c}`}
        className={`relative ${S.col} ${S.bottom} shrink-0 flex items-end justify-center pb-1 rounded-lg transition-colors ${active ? 'bg-violet-100/80 dark:bg-violet-900/30' : ''}`}>
        {c >= 1 && carryBox(c)}
        <span className={`font-mono font-black ${S.digit} tabular-nums leading-none ${added ? 'text-[#0087a8] dark:text-cyan-300' : 'text-slate-800 dark:text-slate-100'}`}>{digitOf(c)}</span>
      </div>,
    );
  }

  // The zero buttons sit at the end of the number, where the zero is written —
  // or, when there is no room beside it (a phone, a slide's side column), in a
  // labelled row underneath.
  const addBtn = (wordy) => onAddZero && (
    <button type="button" onClick={onAddZero} aria-label={labels.addZero || 'add a zero'} title={labels.addZero || 'add a zero'}
      className="h-10 px-2.5 rounded-xl border-2 border-dashed border-[#0087a8] text-[#0087a8] dark:border-cyan-400 dark:text-cyan-300 font-mono font-black text-lg flex items-center gap-0.5 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 active:translate-y-0.5 transition-all">
      <Plus className="w-4 h-4" strokeWidth={3} />0
      {wordy && labels.addZero && <span className="ml-1.5 font-sans text-[11px] uppercase tracking-widest">{labels.addZero}</span>}
    </button>
  );
  const removeBtn = onRemoveZero && (
    <button type="button" onClick={onRemoveZero} aria-label={labels.removeZero || 'take the last zero away'} title={labels.removeZero || 'take the last zero away'}
      className="h-10 w-9 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-0.5 transition-all">
      <Minus className="w-4 h-4" strokeWidth={3} />
    </button>
  );
  const hasButtons = !!(onAddZero || onRemoveZero);

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <div className="mx-auto w-max flex items-end pt-1 pb-1 pr-1">
          {/* the divisor, outside the bus stop, level with the number */}
          <div className={`${S.bottom} flex items-end pb-1 pr-2 font-mono font-black ${S.digit} tabular-nums leading-none text-slate-800 dark:text-slate-100`}>
            {model.divisor}
          </div>
          <div>
            <div className="flex pl-2">{top}</div>
            <div className="flex items-end">
              <div className="flex pl-2 border-t-[3px] border-l-[3px] border-slate-800 dark:border-slate-200 rounded-tl-xl">{bottom}</div>
              {hasButtons && !compact && <div className={`ml-2 ${S.bottom} hidden sm:flex items-end pb-1 gap-1`}>{addBtn(false)}{removeBtn}</div>}
            </div>
          </div>
        </div>
      </div>
      {hasButtons && <div className={`mt-2 items-center justify-center gap-2 ${compact ? 'flex' : 'flex sm:hidden'}`}>{addBtn(true)}{removeBtn}</div>}
    </div>
  );
}
