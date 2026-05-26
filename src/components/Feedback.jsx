import React, { useEffect, useRef, useState } from 'react';
import { Volume2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { playChime } from '../utils/sound';

export default function Feedback({ 
  // Core / Vocab Props
  isCorrect, 
  currentWord, 
  isWordRecognition, 
  track, 
  unitId,
  onNext,
  // Assessment Review Props
  expEn, 
  expVn, 
  onPrev, 
  isFirst, 
  isLast 
}) {
  const isAssessmentMode = !currentWord;
  const audioState = useRef({ isCancelled: false, currentAudio: null });
  const [btnCooldown, setBtnCooldown] = useState(false);
  const [enterActive, setEnterActive] = useState(false);

  // 1. Enter Key Listener
  useEffect(() => {
    if (isAssessmentMode) return;
    
    const timer = setTimeout(() => setEnterActive(true), 400);
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && enterActive && !btnCooldown) {
        e.preventDefault(); 
        setBtnCooldown(true);
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', handleKeyDown); };
  }, [onNext, enterActive, btnCooldown, isAssessmentMode]);

  // 2. Audio Sequences & Chimes
  useEffect(() => {
    if (isAssessmentMode) return;

    playChime(isCorrect ? 'correct' : 'incorrect');
    if (!currentWord?.isReal) return;

    const state = audioState.current;
    state.isCancelled = false;

    // Trust the dashboard injection FIRST to guarantee perfect absolute routes
    const aWord = new Audio(currentWord.audio);
    const aDef = new Audio(currentWord.defAudio);
    const aSent = new Audio(currentWord.sentAudio);

    const playAudioObj = (audioObj) => new Promise((resolve) => {
      state.currentAudio = audioObj;
      audioObj.onended = resolve;
      audioObj.onerror = resolve; 
      audioObj.play().catch(() => resolve()); 
    });

    const playSequence = async () => {
      try {
        if (state.isCancelled) return;
        if (isWordRecognition) {
          await playAudioObj(aWord);
          if (state.isCancelled) return; await new Promise(r => setTimeout(r, 300));
          if (state.isCancelled) return; await playAudioObj(aDef);
          if (state.isCancelled) return; await new Promise(r => setTimeout(r, 400));
          if (state.isCancelled) return; await playAudioObj(aSent);
        } else {
          await playAudioObj(aSent);
        }
      } catch (err) { console.warn(`Spoken audio skipped for ${track}`); }
    };

    if (currentWord.isReal) playSequence();

    return () => {
      state.isCancelled = true;
      if (state.currentAudio) { state.currentAudio.pause(); state.currentAudio.currentTime = 0; }
    };
  }, [isCorrect, currentWord, isWordRecognition, track, unitId, isAssessmentMode]);

  const handleManualAudio = () => {
    if (isAssessmentMode || !currentWord?.isReal || btnCooldown) return;
    setBtnCooldown(true); setTimeout(() => setBtnCooldown(false), 500);
    if (audioState.current.currentAudio) { audioState.current.currentAudio.pause(); audioState.current.currentAudio.currentTime = 0; }
    
    // Blindly trust the absolute URL injected by YearDashboard.jsx
    const audio = new Audio(currentWord.sentAudio);
    audioState.current.currentAudio = audio;
    audio.play().catch(() => console.warn("Manual audio failed"));
  };

  const handleNextClick = () => {
    if (btnCooldown) return;
    setBtnCooldown(true);
    onNext();
  };

  if (isAssessmentMode) {
    return (
      <div className="fixed bottom-0 left-0 w-full z-50 animate-in slide-in-from-bottom-8 duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] flex flex-col">
        <div className={`p-6 md:p-8 flex flex-col border-t-4 ${isCorrect ? 'bg-[#D7FFD7] border-[#58A700]' : 'bg-[#FFE5E5] border-[#EA4335]'}`}>
          <div className="max-w-7xl mx-auto w-full">
             <div className={`font-black text-2xl flex items-center mb-3 tracking-tight ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>
                {isCorrect ? (
                  <><CheckCircle2 className="w-7 h-7 mr-2" strokeWidth={2.5} /> Correct Answer</>
                ) : (
                  <><XCircle className="w-7 h-7 mr-2" strokeWidth={2.5} /> Incorrect Answer</>
                )}
             </div>
             {(expEn || expVn) && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-3 border-t border-black/10">
                 <div>
                   <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>Explanation</span>
                   <p className={`text-[15px] font-medium leading-relaxed ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>{expEn}</p>
                 </div>
                 <div>
                   <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>Giải thích</span>
                   <p className={`text-[15px] font-medium italic leading-relaxed ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>{expVn}</p>
                 </div>
               </div>
             )}
          </div>
        </div>
        
        <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <button 
              onClick={onPrev} 
              disabled={isFirst} 
              className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-500 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-30"
            >
              Previous
            </button>
            <button 
              onClick={onNext} 
              className="px-10 py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md bg-[#58cc02] border-[#58a700] hover:bg-[#46a802]"
            >
              {isLast ? 'Finish Review' : 'Next Review'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const bgClass = isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]';
  const textClass = isCorrect ? 'text-[#468500]' : 'text-[#C9362A]';
  const borderClass = isCorrect ? 'border-[#58A700]' : 'border-[#EA2B2B]';
  
  return (
    <div className={`fixed bottom-0 left-0 w-full ${bgClass} border-t-[6px] ${borderClass} p-6 md:p-8 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <div className="flex-1 w-full overflow-hidden">
          {currentWord?.isReal ? (
            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-1/5 flex-shrink-0">
                <div className={`flex items-center ${isCorrect ? 'text-[#58A700]' : 'text-[#EA2B2B]'} mb-0 flex-shrink-0`}>
                  {isCorrect ? <CheckCircle2 className="w-12 h-12 mr-3 bg-white rounded-full" /> : <XCircle className="w-12 h-12 mr-3 bg-white rounded-full" />}
                  <span className="text-3xl font-black tracking-wide hidden sm:inline">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 w-full bg-white/50 p-5 md:p-6 rounded-[2rem] border border-white/60 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-black/5">
                  <div><h3 className="text-3xl font-black text-slate-800 capitalize">{currentWord.word}</h3><p className="text-xl font-bold text-slate-500 mt-1">{currentWord.vn}</p></div>
                  <button disabled={btnCooldown} onClick={handleManualAudio} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-70">
                    <Volume2 className="w-6 h-6 mr-2" /><span className="font-bold text-sm uppercase tracking-widest">Play Audio</span>
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-slate-800 leading-snug">{currentWord.def}</p>
                  <p className={`text-md font-medium mt-1 ${isCorrect ? 'text-[#3E7500]/80' : 'text-[#A32D23]/80'}`}>{currentWord.vnDef}</p>
                </div>
                <div className={`pt-4 border-t ${isCorrect ? 'border-[#58A700]/20' : 'border-[#EA2B2B]/20'}`}>
                  <span className={`font-black text-xs uppercase tracking-widest block mb-2 ${textClass}`}>Sample Sentence</span>
                  <p className="text-xl font-medium italic leading-relaxed text-slate-800">
                    {currentWord.sent.split(new RegExp(`(${currentWord.word})`, 'gi')).map((part, i) => part.toLowerCase() === currentWord.word.toLowerCase() ? <strong key={i} className={`px-1 rounded ${isCorrect ? 'bg-[#58A700]/20 text-[#3E7500]' : 'bg-[#EA2B2B]/20 text-[#A32D23]'}`}>{part}</strong> : part)}
                  </p>
                  <p className={`text-lg font-medium italic mt-1 ${isCorrect ? 'text-[#3E7500]/80' : 'text-[#A32D23]/80'}`}>"{currentWord.vnSent}"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-1/4 flex-shrink-0">
                <div className={`flex items-center ${isCorrect ? 'text-[#58A700]' : 'text-[#EA2B2B]'} mb-0 flex-shrink-0`}>
                  {isCorrect ? <CheckCircle2 className="w-12 h-12 mr-3 bg-white rounded-full" /> : <XCircle className="w-12 h-12 mr-3 bg-white rounded-full" />}
                  <span className="text-3xl font-black tracking-wide hidden sm:inline">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                </div>
              </div>
              <div className={`flex-1 min-w-0 w-full p-5 md:p-6 rounded-[2rem] border shadow-sm ${isCorrect ? 'bg-white/50 border-[#58A700]/30' : 'bg-white/50 border-[#EA2B2B]/30'}`}>
                 <h3 className={`text-2xl font-black mb-2 ${isCorrect ? 'text-[#468500]' : 'text-[#C9362A]'}`}>{isCorrect ? "You spotted it!" : "Watch out!"}</h3>
                 <p className="text-xl font-medium text-slate-800 flex items-center"><span className="font-bold uppercase tracking-widest text-sm bg-white px-3 py-1 rounded-lg shadow-sm mr-3">Fake Word</span> <strong>{currentWord.word}</strong></p>
                 {currentWord?.imitating && (
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <p className="flex items-center text-lg text-slate-700 font-medium"><AlertCircle className="w-5 h-5 mr-2 text-slate-400" />This was trying to imitate: <strong className="ml-2 font-black text-xl text-slate-900">{currentWord.imitating}</strong></p>
                  </div>
                 )}
              </div>
            </div>
          )}
        </div>
        <button disabled={btnCooldown} onClick={handleNextClick} className={`w-full md:w-auto px-12 py-6 rounded-2xl font-black text-white text-xl uppercase tracking-widest transition-all flex-shrink-0 border-b-[6px] active:border-b-0 active:translate-y-[6px] mt-2 md:mt-0 ${isCorrect ? 'bg-[#58A700] hover:bg-[#468500] border-[#468500]' : 'bg-[#EA2B2B] hover:bg-[#C9362A] border-[#C9362A]'} disabled:opacity-80`}>Continue</button>
      </div>
    </div>
  );
}