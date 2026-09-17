import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, CheckCircle2, Eye, ListOrdered, XCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { playChime } from '../utils/sound';
import { EmptyState } from '../components/ui';
import { markOrder, moveItem, scrambleOrder } from '../utils/sequence';

/**
 * Order It — put scrambled sentences or paragraphs back in the right order.
 *
 * Trait 2 of the GED essay rubric is scored on the order ideas arrive in and
 * the signposts that carry the reader between them. Here the ideas are given
 * and only the order is the student's; what he learns is to READ the signposts
 * — "First", "However", "As a result", "In conclusion" — which is what his own
 * essay will need to carry.
 *
 * Two checks per exercise: each tells him which slots are right so he fixes
 * the rest rather than reshuffling; a third miss reveals the answer with the
 * explanation, and the exercise scores the slots that were right on the last
 * honest check. Resumable per exercise.
 */

const ATTEMPTS = 2;

export default function Sequence({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : []), [pool]);
  const [saved, setSaved] = useState(savedData || {});
  const firstOpen = useMemo(() => {
    const i = items.findIndex((it) => saved[it.id]?.status !== 'done');
    return i === -1 ? Math.max(0, items.length - 1) : i;
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps
  const [index, setIndex] = useState(firstOpen);

  const item = items[index];
  const n = item?.items?.length || 0;

  const [order, setOrder] = useState([]);
  const [checked, setChecked] = useState(null);   // markOrder() of the last check, cleared by a move
  const [lastCorrect, setLastCorrect] = useState(0); // slots right on the last check — what a reveal credits
  const [attempts, setAttempts] = useState(0);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showVn, setShowVn] = useState(false);

  const totalSlots = items.reduce((s, it) => s + (it.items?.length || 0), 0);
  const correctSoFar = (extra = {}) =>
    items.reduce((s, it) => {
      if (it.id === item?.id && extra[it.id] !== undefined) return s + extra[it.id];
      return s + (saved[it.id]?.status === 'done' ? saved[it.id].correct || 0 : 0);
    }, 0);
  const scoreOf = (correct) => (totalSlots ? Math.round((correct / totalSlots) * 10) : 0);

  useEffect(() => {
    if (!item) return;
    const prev = saved[item.id];
    const wasDone = prev?.status === 'done';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(wasDone ? Array.from({ length: n }, (_, i) => i) : scrambleOrder(n, item.id));
    setChecked(wasDone ? markOrder(Array.from({ length: n }, (_, i) => i)) : null);
    setLastCorrect(wasDone ? prev.correct || 0 : 0);
    setAttempts(0);
    setDone(wasDone);
    // A finished exercise that was not solved comes back as the revealed answer.
    setRevealed(wasDone && (prev.correct || 0) < n);
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!item) {
    return (
      <EmptyState
        icon={<ListOrdered className="w-16 h-16" />}
        iconClassName="text-violet-300 dark:text-violet-700"
        title="Nothing to order yet"
        message="No ordering exercises have been added to this unit."
        onAction={onQuit}
      />
    );
  }

  const finish = (correct) => {
    const updated = { ...saved, [item.id]: { status: 'done', correct, total: n } };
    setSaved(updated);
    setDone(true);
    onProgress?.(scoreOf(correctSoFar({ [item.id]: correct })), updated);
  };

  const handleCheck = () => {
    if (done) return;
    const mark = markOrder(order);
    setChecked(mark);
    setLastCorrect(mark.correct);
    if (mark.ok) { playChime('correct'); finish(mark.correct); return; }
    playChime('incorrect');
    const next = attempts + 1;
    setAttempts(next);
    if (next >= ATTEMPTS + 1) {
      // Third miss: reveal, and credit only what the last honest check had right.
      setRevealed(true);
      setOrder(Array.from({ length: n }, (_, i) => i));
      finish(mark.correct);
    }
  };

  const handleReveal = () => {
    // Credit the last CHECKED arrangement, not whatever was moved since.
    setRevealed(true);
    setOrder(Array.from({ length: n }, (_, i) => i));
    finish(lastCorrect);
  };

  const move = (from, to) => {
    if (done) return;
    setOrder((o) => moveItem(o, from, to));
    setChecked(null);
  };

  const handleNext = () => {
    if (index + 1 < items.length) { setIndex(index + 1); return; }
    onComplete(scoreOf(correctSoFar()), saved);
  };
  const handleQuit = () => onComplete(scoreOf(correctSoFar()), saved);

  const slotTone = (slot) => {
    if (done && !revealed) return 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30';
    if (revealed) return 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30';
    if (checked) return checked.slots[slot]
      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30'
      : 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30';
    return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pb-24">
      <TopBar current={index + 1} total={items.length} onQuit={handleQuit} modeTitle="Order It" />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
        <div className="flex items-center justify-between gap-3 mb-2 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5" strokeWidth={2.5} />
            <span className="font-bold uppercase tracking-widest text-sm">Move the pieces into the right order</span>
          </div>
          {bilingual && (
            <button
              onClick={() => setShowVn((v) => !v)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest border-2 transition-colors ${showVn ? 'bg-indigo-600 border-indigo-700 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}
            >
              {showVn ? 'EN + VN' : 'EN only'}
            </button>
          )}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{item.title}</h2>
        {bilingual && item.titleVn && <p className="text-slate-500 dark:text-slate-400 italic">{item.titleVn}</p>}
        <p className="mt-3 mb-5 text-slate-700 dark:text-slate-300 font-medium">
          {item.prompt}
          {bilingual && showVn && item.promptVn && <span className="block text-slate-500 dark:text-slate-400 italic text-sm mt-1">{item.promptVn}</span>}
        </p>

        <ol className="space-y-3">
          {order.map((orig, slot) => {
            const it = item.items[orig];
            return (
              <li key={orig} className={`flex items-stretch gap-3 rounded-2xl border-2 p-3 sm:p-4 transition-colors ${slotTone(slot)}`}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full grid place-items-center text-sm font-black bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900">
                  {slot + 1}
                </span>
                <div className="flex-1 min-w-0 text-[15px] sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                  {it.text}
                  {bilingual && showVn && it.textVn && <span className="block text-sm italic text-slate-500 dark:text-slate-400 mt-1">{it.textVn}</span>}
                </div>
                {!done && (
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button
                      onClick={() => move(slot, slot - 1)}
                      disabled={slot === 0}
                      title="Move up"
                      className="w-9 h-9 rounded-lg grid place-items-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-30 active:scale-95 transition"
                    >
                      <ArrowUp className="w-4 h-4" strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => move(slot, slot + 1)}
                      disabled={slot === n - 1}
                      title="Move down"
                      className="w-9 h-9 rounded-lg grid place-items-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-30 active:scale-95 transition"
                    >
                      <ArrowDown className="w-4 h-4" strokeWidth={3} />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {!done && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCheck}
              className="flex-1 sm:flex-none px-10 py-4 rounded-2xl border-b-4 font-extrabold text-white bg-[#58cc02] border-[#58a700] hover:brightness-105 transition"
            >
              Check order
            </button>
            {checked && !checked.ok && (
              <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                {checked.correct} of {n} in the right place — green ones are correct, move the red ones.
                {attempts >= ATTEMPTS ? ' One more try, then the answer is shown.' : ''}
              </span>
            )}
            {attempts >= ATTEMPTS && (
              <button
                onClick={handleReveal}
                className="flex items-center px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <Eye className="w-4 h-4 mr-2" strokeWidth={3} /> Show the answer
              </button>
            )}
          </div>
        )}

        {done && (
          <div className={`mt-6 rounded-2xl border-2 p-5 animate-in fade-in ${revealed ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20' : 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/30'}`}>
            <div className="flex items-center gap-2 font-extrabold text-lg mb-2">
              {revealed
                ? <><XCircle className="w-6 h-6 text-amber-500" /><span className="text-amber-700 dark:text-amber-300">Here is the order — {lastCorrect} of {n} {lastCorrect === 1 ? 'was' : 'were'} right</span></>
                : <><CheckCircle2 className="w-6 h-6 text-emerald-600" /><span className="text-emerald-700 dark:text-emerald-300">Perfect order</span></>}
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item.expEn}</p>
            {bilingual && item.expVn && <p className="text-slate-500 dark:text-slate-400 text-sm italic mt-1 leading-relaxed">{item.expVn}</p>}
            <button
              onClick={handleNext}
              className="mt-5 w-full rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] py-4 font-extrabold text-white transition hover:brightness-105"
            >
              {index + 1 < items.length ? 'Next exercise' : 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
