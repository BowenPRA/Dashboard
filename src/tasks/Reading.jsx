import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle2, BookOpen, Volume2, VolumeX, XCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { playChime } from '../utils/sound';

export default function Reading({ pool, track, unitId, savedData = {}, onComplete }) {
  const passages = useMemo(() => pool || [], [pool]);
  const [passageIndex, setPassageIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); 
  const [inputs, setInputs] = useState({});
  const [cumulativeCorrect, setCumulativeCorrect] = useState(0);
  const [btnCooldown, setBtnCooldown] = useState(false);
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const inputRefs = useRef([]);
  const audioState = useRef({ currentAudio: null });

  const currentPassage = passages[passageIndex];
  
  const blankWords = useMemo(() => {
    if (!currentPassage) return [];
    return currentPassage.text.match(/\{.*?\}/g)?.map(w => w.slice(1, -1)) || [];
  }, [currentPassage]);

  const calculateXP = (correct) => {
    let totalBlanks = 0;
    passages.forEach(p => {
      totalBlanks += (p.text.match(/\{.*?\}/g) || []).length;
    });
    if (totalBlanks === 0) return 0;
    return Math.floor((correct / totalBlanks) * 10);
  };

  const getPrefixLength = (word) => {
    if (!word) return 1;
    if (word.length <= 4) return 1;
    if (word.length <= 8) return 2;
    return 3;
  };

  const playPassageAudio = () => {
    if (audioState.current.currentAudio) {
      audioState.current.currentAudio.pause();
      audioState.current.currentAudio.currentTime = 0;
    }
    
    const basePath = import.meta.env.BASE_URL || '/';
    const audio = new Audio(`${basePath}audio/${track}/${unitId}/passage_${unitId}_${passageIndex + 1}.mp3`);
    audioState.current.currentAudio = audio;
    audio.play().catch(err => console.warn(`Could not play passage audio for ${unitId}`, err));
  };

  const stopAudio = () => {
    if (audioState.current && audioState.current.currentAudio) {
      audioState.current.currentAudio.pause();
    }
  };

  // State setup and Smart Reattempts Check
  useEffect(() => {
    if (gameState === 'Q') {
      const initialInputs = {};
      const savedPassage = localAnswers[passageIndex];
      const isPreviouslyPerfect = savedPassage?.status === 'perfect';

      blankWords.forEach((word, idx) => {
        const targetLetters = word.replace(/[^a-zA-Z]/g, '');
        // PRE-FILL if previous attempt was perfect
        initialInputs[idx] = isPreviouslyPerfect 
          ? targetLetters 
          : targetLetters.substring(0, getPrefixLength(targetLetters));
      });
      setInputs(initialInputs);

      if (isPreviouslyPerfect) {
        setCumulativeCorrect(prev => prev + blankWords.length);
        setGameState('A');
      } else {
        setTimeout(() => { if (inputRefs.current[0]) inputRefs.current[0].focus(); }, 100);
      }
    } else if (gameState === 'A') {
      let currentScore = 0;
      blankWords.forEach((word, idx) => {
        const targetLetters = word.replace(/[^a-zA-Z]/g, '');
        if ((inputs[idx] || '').toLowerCase() === targetLetters.toLowerCase()) currentScore++;
      });
      
      const isPerfect = currentScore === blankWords.length;
      if (isPerfect) {
         setLocalAnswers(prev => ({ ...prev, [passageIndex]: { status: 'perfect' } }));
      }

      playChime(isPerfect ? 'correct' : 'incorrect');
      setTimeout(() => playPassageAudio(), 600);
    }

    return stopAudio;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, passageIndex]);

  const handleInputChange = (idx, val) => {
    setInputs(prev => ({ ...prev, [idx]: val }));
  };

  const checkAnswers = () => {
    if (btnCooldown) return;
    setBtnCooldown(true);
    setTimeout(() => setBtnCooldown(false), 500);

    let currentScore = 0;
    blankWords.forEach((word, idx) => {
      const targetLetters = word.replace(/[^a-zA-Z]/g, '');
      if ((inputs[idx] || '').toLowerCase() === targetLetters.toLowerCase()) currentScore++;
    });
    setCumulativeCorrect(prev => prev + currentScore);
    setGameState('A');
  };

  // Save on quit like every other task. A student who finishes two of three
  // passages and leaves keeps that work, and it pre-fills on the next attempt.
  const handleQuit = () => {
    stopAudio();
    onComplete(calculateXP(cumulativeCorrect), localAnswers);
  };

  const handleNext = () => {
    if (btnCooldown) return;
    setBtnCooldown(true);
    setTimeout(() => setBtnCooldown(false), 500);
    
    stopAudio();

    if (passageIndex < passages.length - 1) {
      setPassageIndex(prev => prev + 1);
      setGameState('Q');
    } else {
      onComplete(calculateXP(cumulativeCorrect), localAnswers);
    }
  };

  // Global Keyboard Accessibility
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (gameState === 'Q') checkAnswers();
        else if (gameState === 'A') handleNext();
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [gameState, inputs]); 

  const renderPassage = () => {
    if (!currentPassage) return null;
    const parts = currentPassage.text.split(/(\{.*?\})/g);
    let wordIdx = 0;

    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const targetWord = part.slice(1, -1);
        const targetLetters = targetWord.replace(/[^a-zA-Z]/g, '');
        const currentIndex = wordIdx++;
        const value = inputs[currentIndex] || '';
        const prefixLen = getPrefixLength(targetLetters);
        const prefix = targetLetters.substring(0, prefixLen);

        if (gameState === 'A') {
          const isCorrect = value.toLowerCase() === targetLetters.toLowerCase();
          return (
            <span key={i} className={`inline-flex items-center px-3 py-1 mx-1 rounded-xl border-2 font-bold shadow-sm transition-all ${isCorrect ? 'bg-[#F0FDE6] dark:bg-[#F0FDE6]/20 border-[#58A700] text-[#3E7500] dark:text-[#a3e635]' : 'bg-[#FFDFE0] dark:bg-[#FFDFE0]/20 border-[#EA2B2B] text-[#A32D23] dark:text-[#f87171]'}`}>
              {isCorrect ? targetWord : <span className="line-through opacity-70 mr-2">{value}</span>}
              {!isCorrect && <span>{targetWord}</span>}
            </span>
          );
        }

        let inputIdx = 0;

        return (
          <span key={i} className="inline-flex relative align-middle mx-[4px] top-[-2px]">
            <input
              ref={el => inputRefs.current[currentIndex] = el}
              type="text"
              value={value}
              maxLength={targetLetters.length} 
              autoComplete="off"
              spellCheck="false"
              onChange={(e) => {
                let val = e.target.value.replace(/[^a-zA-Z]/g, ''); 
                if (val.length < prefixLen) {
                  val = prefix;
                } else if (!val.toLowerCase().startsWith(prefix.toLowerCase())) {
                  val = prefix + val.substring(prefixLen);
                }
                handleInputChange(currentIndex, val);

                if (val.length === targetLetters.length) {
                  setTimeout(() => {
                    if (inputRefs.current[currentIndex + 1]) {
                      inputRefs.current[currentIndex + 1].focus();
                    }
                  }, 50); 
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (inputRefs.current[currentIndex + 1]) {
                    inputRefs.current[currentIndex + 1].focus();
                  } else {
                     checkAnswers();
                  }
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
            />
            <div className="flex gap-[3px] sm:gap-[4px] pointer-events-none items-center">
              {Array.from(targetWord).map((char, charIdx) => {
                if (!/[a-zA-Z]/.test(char)) {
                  return <div key={charIdx} className="w-2 sm:w-3 flex items-center justify-center text-slate-300 dark:text-slate-600 font-bold">-</div>;
                }

                const letter = value[inputIdx] || '';
                const isPrefix = inputIdx < prefixLen;
                const isFilled = inputIdx < value.length;
                inputIdx++;
                
                let borderClass = 'border-slate-300 dark:border-slate-600 text-transparent shadow-[0_2px_0_0_#e2e8f0] dark:shadow-[0_2px_0_0_#475569]';
                if (isPrefix) borderClass = 'border-transparent text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-none';
                else if (isFilled) borderClass = 'border-[#1CB0F6] text-[#1CB0F6] bg-[#1CB0F6]/10 shadow-[0_2px_0_0_#1CB0F6]';

                return (
                  <div key={charIdx} className={`w-[24px] h-[32px] sm:w-[28px] sm:h-[38px] border-[2px] flex items-center justify-center font-bold text-[16px] sm:text-[18px] uppercase transition-all rounded-[6px] ${borderClass}`}>
                    {letter}
                  </div>
                );
              })}
            </div>
          </span>
        );
      }
      return <span key={i} className="leading-[2.8] text-slate-800 dark:text-slate-200">{part}</span>;
    });
  };

  if (!currentPassage) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans pb-56 lg:pb-40 transition-colors duration-300">
      <TopBar 
        current={passageIndex} 
        total={passages.length}
        onQuit={handleQuit}
        modeTitle="Reading" 
      />
      
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-4xl mx-auto mt-2 sm:mt-6">
        
        <div className="w-full text-center mb-6">
          <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-2xl mb-3 font-bold tracking-widest uppercase text-sm">
            <BookOpen className="w-5 h-5 mr-2" /> {currentPassage.title}
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Complete the text with the correct words</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-lg shadow-slate-200 dark:shadow-none border-2 border-slate-100 dark:border-slate-800 overflow-hidden w-full mb-8">
          <div className="p-6 sm:p-8 md:p-12">
            <div className="text-xl sm:text-2xl font-medium">
              {renderPassage()}
            </div>
          </div>
        </div>

        {gameState === 'Q' && (
          <button 
            disabled={btnCooldown}
            onClick={checkAnswers}
            className="w-full sm:w-auto min-w-[250px] px-8 py-4 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all shadow-sm disabled:opacity-70"
          >
            Check Answers
          </button>
        )}

        {gameState === 'A' && (() => {
          let currentScore = 0;
          blankWords.forEach((word, idx) => {
            const targetLetters = word.replace(/[^a-zA-Z]/g, '');
            if ((inputs[idx] || '').toLowerCase() === targetLetters.toLowerCase()) currentScore++;
          });
          const isPerfect = currentScore === blankWords.length;

          return (
            <div className={`fixed bottom-0 left-0 w-full border-t-[6px] p-4 md:p-6 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50
              ${isPerfect ? 'bg-[#D7FFB8] dark:bg-slate-800 border-[#58A700]' : 'bg-[#FFDFE0] dark:bg-slate-800 border-[#EA2B2B]'}`}>
              
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
                
                {/* Status Indicator */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start flex-shrink-0">
                  <div className={`flex items-center ${isPerfect ? 'text-[#58A700]' : 'text-[#EA2B2B] dark:text-[#f87171]'} mb-0`}>
                    {isPerfect ? <CheckCircle2 className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" /> : <XCircle className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" />}
                    <span className="text-2xl font-black tracking-wide">{isPerfect ? 'Perfect!' : 'Review'}</span>
                  </div>
                </div>

                {/* Banner Middle Section: Audio Controls & Translation */}
                <div className="flex-1 w-full bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6">
                  
                  {/* Left Half: Audio Playback */}
                  <div className="flex-1 flex flex-col justify-center">
                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-2 ${isPerfect ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                      Passage Audio
                    </span>
                    <div className="flex items-center space-x-3">
                       <button onClick={() => { stopAudio(); playPassageAudio(); }} className="flex-1 flex items-center justify-center bg-[#1CB0F6] hover:bg-[#1899D6] text-white py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-sm transition-all active:scale-95">
                         <Volume2 className="w-4 h-4 mr-2" /> Replay
                       </button>
                       <button onClick={stopAudio} className="flex-1 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-[#EA2B2B] dark:hover:text-red-400 border-2 border-slate-200 dark:border-slate-600 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-sm transition-all active:scale-95">
                         <VolumeX className="w-4 h-4 mr-2" /> Stop
                       </button>
                    </div>
                  </div>

                  <div className="hidden md:block w-px bg-black/10 dark:bg-white/10"></div>

                  {/* Right Half: Vietnamese Translation (Scrollable) */}
                  <div className="flex-[2] max-h-[100px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1 ${isPerfect ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                      {currentPassage.vnTitle}
                    </span>
                    <p className="font-medium text-sm text-slate-700 dark:text-slate-300 italic leading-snug">
                      "{currentPassage.vnText}"
                    </p>
                  </div>
                </div>

                {/* Continue Button */}
                <button 
                  disabled={btnCooldown}
                  onClick={handleNext}
                  className={`w-full lg:w-auto px-10 py-5 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all flex-shrink-0 border-b-[5px] active:border-b-0 active:translate-y-[5px] mt-2 lg:mt-0 
                    ${isPerfect ? 'bg-[#58A700] hover:bg-[#468500] border-[#468500]' : 'bg-[#EA2B2B] hover:bg-[#C9362A] border-[#C9362A]'}`}
                >
                  Continue
                </button>

              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}