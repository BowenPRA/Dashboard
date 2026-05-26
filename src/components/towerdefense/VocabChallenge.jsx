import React, { useEffect, useRef } from 'react';
import { Zap, Clock, Keyboard, ListChecks, BookOpen, X } from 'lucide-react';

export default function VocabChallenge({
  challenge,
  input,
  onInputChange,
  onSubmit,
  onChoice,
  onDismiss,
  timeLeft,
  maxTime = 15,
  shakeKey = 0
}) {
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (challenge?.mode === 'TYPE' && inputRef.current) inputRef.current.focus();
  }, [challenge]);

  useEffect(() => {
    if (shakeKey === 0) return;
    const el = cardRef.current;
    if (!el) return;
    el.classList.remove('td-shake');
    void el.offsetWidth;
    el.classList.add('td-shake');
  }, [shakeKey]);

  if (!challenge) return null;

  const pct = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));
  const lowTime = timeLeft <= 5;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 animate-in fade-in duration-300 pointer-events-none">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto" />
      
      <style>{`
        @keyframes td-shake-kf {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-7px); }
          80% { transform: translateX(7px); }
        }
        .td-shake { animation: td-shake-kf 0.4s ease-in-out; }
      `}</style>

      <div
        ref={cardRef}
        className="relative z-10 pointer-events-auto bg-white rounded-[2rem] border-b-8 border-slate-200 w-full max-w-lg overflow-hidden p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center border-b-4 border-indigo-200">
               <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Vocab Bolt</div>
              <div className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                {challenge.mode === 'TYPE' ? (
                  <><Keyboard className="w-4 h-4 text-indigo-500" strokeWidth={3} /> Type it</>
                ) : (
                  <><ListChecks className="w-4 h-4 text-indigo-500" strokeWidth={3} /> Pick one</>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm border-b-4 ${lowTime ? 'bg-rose-500 border-rose-700 text-white animate-pulse' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
              <Clock className="w-4 h-4" strokeWidth={3} />
              {timeLeft}s
            </div>
            <button
              onClick={onDismiss}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-200 text-slate-500 hover:bg-rose-500 hover:text-white border-b-4 border-slate-300 hover:border-rose-700 active:border-b-0 active:translate-y-[4px] transition-all"
              title="Skip & Take Penalty"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-4 border-2 border-slate-200 overflow-hidden mb-6">
          <div
            className={`h-full transition-all duration-300 ease-linear rounded-full ${lowTime ? 'bg-rose-500' : 'bg-[#FFC800]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-amber-100 text-amber-700 px-3 py-1.5 rounded-xl mb-4 font-black tracking-widest uppercase text-[10px]">
             <BookOpen className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} /> Definition Target
          </div>
          <div className="text-slate-800 font-black text-xl sm:text-2xl leading-snug">
            {challenge.def}
          </div>
        </div>

        {challenge.mode === 'TYPE' ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-8">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type the word here…"
              autoComplete="off"
              spellCheck={false}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-[#1CB0F6] focus:outline-none focus:ring-4 focus:ring-[#1CB0F6]/20 font-bold text-slate-800 text-xl text-center placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="w-full px-6 py-4 rounded-2xl bg-[#1CB0F6] hover:bg-[#1899D6] text-white font-black uppercase tracking-widest text-lg border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all"
            >
              Submit Answer
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {challenge.choices?.map((c) => (
              <button
                key={c}
                onClick={() => onChoice?.(c)}
                className="px-4 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-[6px] active:translate-y-[6px] active:border-b-[2px] font-black text-slate-700 text-lg sm:text-xl transition-all capitalize"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {challenge.mode === 'CHOICE' && (
          <div className="mt-6 text-center text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 rounded-xl py-3 border border-rose-100">
            ⚠ Incorrect choice spawns extra enemies!
          </div>
        )}
      </div>
    </div>
  );
}