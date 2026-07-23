import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { playChime } from '../utils/sound';

const calculateSimilarity = (str1, str2) => {
  const clean = (s) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ").trim();
  const a = clean(str1);
  const b = clean(str2);
  if (a.length === 0) return 0;
  if (a === b) return 1;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  const distance = matrix[b.length][a.length];
  return Math.max(0, 1 - distance / Math.max(a.length, b.length));
};

const checkFormatting = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return { hasCapital: false, hasPunctuation: false };
  const firstChar = trimmed.charAt(0);
  const hasCapital = /^[A-Z]/.test(firstChar); 
  const hasPunctuation = trimmed.endsWith('.');
  return { hasCapital, hasPunctuation };
};

export default function Dictation({ pool, track, unitId, savedData = {}, onComplete }) {
  const realWords = useMemo(() => (pool || []).filter(w => w.isReal !== false), [pool]);
  const [wordIndex, setWordIndex] = useState(0);
  
  const [localAnswers, setLocalAnswers] = useState(savedData);
  const initialSaved = savedData[0];
  
  const [gameState, setGameState] = useState(initialSaved?.status === 'perfect' ? 'SAVED_PERFECT' : 'Q'); 
  const [userInput, setUserInput] = useState(initialSaved?.status === 'perfect' ? initialSaved.text : '');
  const [score, setScore] = useState(initialSaved?.status === 'perfect' ? 1 : 0);
  const [userAnswer, setUserAnswer] = useState(initialSaved?.status === 'perfect' ? { isPass: true, percentage: 100, formattingPenalty: false, hasCapital: true, hasPunctuation: true } : null);
  
  const audioState = useRef(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const btnCooldown = useRef(false);
  
  const [canAdvance, setCanAdvance] = useState(false);

  const currentWordObj = realWords[wordIndex];

  const calculateXP = (currentScore) => {
    if (!realWords || realWords.length === 0) return 0;
    return Math.floor((currentScore / realWords.length) * 10);
  };

  const playAudioSequence = useCallback((isManual = false) => {
    if (!currentWordObj) return;

    if (isManual) {
      if (btnCooldown.current) return;
      btnCooldown.current = true;
      setIsBtnDisabled(true);
      setTimeout(() => {
        btnCooldown.current = false;
        setIsBtnDisabled(false);
      }, 500); 
    }

    if (audioState.current) {
      audioState.current.isCancelled = true;
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
        audioState.current.currentAudio.currentTime = 0;
      }
    }

    const state = { isCancelled: false, currentAudio: null };
    audioState.current = state;
    const basePath = import.meta.env.BASE_URL || '/';

    const aDict = new Audio(`${basePath}audio/${track}/${unitId}/${encodeURIComponent(`dictation_${currentWordObj.word.toLowerCase()}.mp3`)}`);

    const playAudioObj = (audioObj) => new Promise((resolve) => {
      state.currentAudio = audioObj;
      audioObj.onended = resolve;
      audioObj.onerror = resolve; 
      audioObj.play().catch(() => resolve());
    });

    const runSequence = async () => {
      if (state.isCancelled) return;
      await playAudioObj(aDict);
    };

    runSequence();
  }, [currentWordObj, track, unitId]); 

  useEffect(() => {
    if (gameState === 'Q') {
      const timer = setTimeout(() => playAudioSequence(false), 400);
      return () => clearTimeout(timer);
    }
  }, [gameState, playAudioSequence]);

  useEffect(() => {
    if (wordIndex === 0) return; 

    const saved = localAnswers[wordIndex];
    if (saved && saved.status === 'perfect') {
      setUserInput(saved.text);
      setUserAnswer({ isPass: true, percentage: 100, formattingPenalty: false, hasCapital: true, hasPunctuation: true });
      setGameState('SAVED_PERFECT');
      setScore(s => s + 1);
    } else {
      setUserInput('');
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  useEffect(() => {
    if (gameState === 'SAVED_PERFECT') {
       setCanAdvance(true); 
    } else if (gameState !== 'Q') {
      setCanAdvance(false);
      const timer = setTimeout(() => setCanAdvance(true), 600); 
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (gameState !== 'Q' || !userInput.trim()) return;

    const sim = calculateSimilarity(userInput, currentWordObj.dictSent);
    let percentage = Math.round(sim * 20) * 5; 

    const { hasCapital, hasPunctuation } = checkFormatting(userInput);
    let formattingPenalty = false;

    if (!hasCapital || !hasPunctuation) {
      percentage = Math.max(0, percentage - 5);
      formattingPenalty = true;
    }

    const isPass = percentage >= 85;
    
    if (isPass) {
      setScore(s => s + 1);
      if (percentage === 100 && !formattingPenalty) {
        setLocalAnswers(prev => ({ ...prev, [wordIndex]: { text: userInput.trim(), status: 'perfect' } }));
      }
    }
    playChime(isPass ? 'correct' : 'incorrect');

    setUserAnswer({ isPass, percentage, formattingPenalty, hasCapital, hasPunctuation });
    setGameState(isPass ? 'A_PASS' : 'A_FAIL');
  };

  const handleNext = (overrideScore) => {
    if (audioState.current) {
      audioState.current.isCancelled = true;
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
      }
    }
    
    const finalScore = overrideScore !== undefined ? overrideScore : score;

    if (wordIndex < realWords.length - 1) {
      setWordIndex(w => w + 1);
    } else {
      onComplete(calculateXP(finalScore), localAnswers);
    }
  };

  const checkRetry = () => {
    if (gameState !== 'A_FAIL') return false;
    const { hasCapital, hasPunctuation } = checkFormatting(userInput);
    const sim = calculateSimilarity(userInput, currentWordObj?.dictSent || "");
    let percentage = Math.round(sim * 20) * 5;
    if (!hasCapital || !hasPunctuation) percentage = Math.max(0, percentage - 5);
    return percentage >= 85 && hasCapital && hasPunctuation;
  };

  const isRetryCorrect = checkRetry();
  const isPassState = gameState === 'A_PASS' || gameState === 'SAVED_PERFECT';

  // Global Keyboard Accessibility (Ignoring input)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'ArrowRight') {
        if (canAdvance) {
          if (isPassState || (gameState === 'A_FAIL' && isRetryCorrect)) {
            e.preventDefault();
            document.getElementById('continue-btn')?.click(); 
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPassState, gameState, isRetryCorrect, canAdvance]);

  if (!currentWordObj) return null;

  return (
    <div className={`min-h-screen flex flex-col font-sans pb-56 lg:pb-40 transition-colors duration-500
      ${isPassState ? 'bg-[#F0FDE6] dark:bg-[#F0FDE6]/10' : gameState === 'A_FAIL' ? 'bg-[#FFF0F0] dark:bg-[#FFF0F0]/10' : 'bg-slate-50 dark:bg-slate-950'}`}>
      
      <TopBar current={wordIndex} total={realWords.length} onQuit={() => onComplete(calculateXP(score), localAnswers)} modeTitle="Dictation" />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-4xl mx-auto mt-2 sm:mt-6">
        
        <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm sm:text-base mb-4 text-center">
          {gameState === 'Q' ? 'Type the sentence you hear' : gameState === 'SAVED_PERFECT' ? 'Perfect Score Saved!' : isPassState ? 'Excellent Listening!' : 'Review & Correct'}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col mb-8">
          <div className="relative">
            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isPassState}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  if (gameState === 'Q' && userInput.trim().length > 0) {
                    handleSubmit(e);
                  }
                }
              }}
              placeholder={gameState === 'SAVED_PERFECT' ? '' : "Type what you hear..."}
              className={`w-full h-32 sm:h-40 p-5 text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border-2 rounded-3xl focus:outline-none resize-none transition-all shadow-sm
                ${isPassState ? 'border-[#58A700] text-[#3E7500] dark:text-[#a3e635] disabled:bg-[#F0FDE6] dark:disabled:bg-[#F0FDE6]/10' 
                : gameState === 'A_FAIL' ? (isRetryCorrect ? 'border-[#58A700] focus:border-[#58A700] bg-[#F0FDE6] dark:bg-[#F0FDE6]/10' : 'border-[#EA2B2B] focus:border-[#EA2B2B] bg-[#FFF0F0] dark:bg-[#FFF0F0]/10') 
                : 'border-slate-200 dark:border-slate-700 focus:border-[#1CB0F6]'}`}
            />
          </div>

          {gameState === 'Q' && (
            <div className="flex justify-center mt-6">
              <button 
                type="submit"
                disabled={!userInput.trim()}
                className="w-full sm:w-auto min-w-[250px] px-8 py-4 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 transition-all shadow-sm"
              >
                Check Answer
              </button>
            </div>
          )}
        </form>

        <div className="text-center">
          <button 
            disabled={isBtnDisabled}
            onClick={() => playAudioSequence(true)}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] flex items-center justify-center shadow-xl transition-all active:scale-95 mx-auto disabled:opacity-80
              ${isPassState ? 'bg-[#58A700] shadow-[#58A700]/30' : gameState === 'A_FAIL' ? 'bg-[#EA2B2B] shadow-[#EA2B2B]/30' : 'bg-[#1CB0F6] hover:bg-[#1899D6] shadow-[#1CB0F6]/30'}`}
          >
            <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </button>
          <p className="mt-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs">Replay Audio</p>
        </div>

      </div>

      {gameState !== 'Q' && (
        <div className={`fixed bottom-0 left-0 w-full border-t-[6px] p-4 md:p-6 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50
          ${isPassState ? 'bg-[#D7FFB8] dark:bg-slate-800 border-[#58A700]' : 'bg-[#FFDFE0] dark:bg-slate-800 border-[#EA2B2B]'}`}>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">

            <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start flex-shrink-0">
              <div className={`flex items-center ${isPassState ? 'text-[#58A700]' : 'text-[#EA2B2B] dark:text-[#f87171]'} mb-0`}>
                {isPassState ? <CheckCircle2 className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" /> : <XCircle className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" />}
                <span className="text-2xl font-black tracking-wide">{gameState === 'SAVED_PERFECT' ? 'Saved!' : isPassState ? 'Great!' : 'Review'}</span>
              </div>
            </div>

            <div className="flex-1 w-full bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6">
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest ${isPassState ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                    Target Sentence
                  </span>
                  <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest bg-white/50 dark:bg-slate-900/50 px-2.5 py-0.5 rounded-md ${isPassState ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                    Accuracy: {userAnswer?.percentage}%
                  </span>
                </div>
                <p className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-tight">
                  {currentWordObj.dictSent}
                </p>

                {gameState === 'A_FAIL' && (
                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    {userAnswer?.formattingPenalty && (
                      <span className="bg-[#EA2B2B] text-white px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold flex items-center shadow-sm">
                        <AlertCircle className="w-3 h-3 mr-1" /> Missing Capital/Period (-5%)
                      </span>
                    )}
                    <span className="text-[#C9362A] dark:text-[#f87171] font-bold text-[11px] sm:text-xs bg-[#FFCCCC]/50 dark:bg-[#FFCCCC]/10 px-2 py-1 rounded-md border border-[#EA2B2B]/20">
                      {(!userAnswer?.hasCapital || !userAnswer?.hasPunctuation) ? "Fix formatting to continue!" : "Retype exactly to continue."}
                    </span>
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px bg-black/10 dark:bg-white/10"></div>

              <div className="flex-1 border-t md:border-t-0 border-black/5 dark:border-white/5 pt-3 md:pt-0">
                <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1.5 ${isPassState ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                  Vietnamese Translation
                </span>
                <p className="font-medium text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-tight">
                  "{currentWordObj.dictVn}"
                </p>
              </div>

            </div>

            <button
              id="continue-btn"
              disabled={gameState === 'A_FAIL' && !isRetryCorrect}
              onClick={() => {
                if (gameState === 'A_FAIL') {
                  const newScore = score + 1;
                  setScore(newScore);
                  handleNext(newScore);
                } else {
                  handleNext();
                }
              }}
              className={`w-full lg:w-auto px-10 py-5 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all flex-shrink-0 border-b-[5px] active:border-b-0 active:translate-y-[5px] mt-2 lg:mt-0 
                ${(gameState === 'A_FAIL' && !isRetryCorrect) ? 'bg-slate-300 dark:bg-slate-700 border-slate-400 dark:border-slate-800 cursor-not-allowed opacity-50 text-slate-500' : 'bg-[#58A700] hover:bg-[#468500] border-[#468500]'}`}
            >
              {(gameState === 'A_FAIL' && !isRetryCorrect) ? 'Fix It First' : 'Continue'}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}