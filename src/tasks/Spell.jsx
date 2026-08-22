import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Spell({ pool, track, unitId, savedData = {}, onComplete }) {
  const realWords = useMemo(() => (pool || []).filter(w => w.isReal !== false), [pool]);
  const [wordIndex, setWordIndex] = useState(0);
  
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const [gameState, setGameState] = useState('Q');
  const [userAnswer, setUserAnswer] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  
  const inputRef = useRef(null);
  const currentWord = realWords[wordIndex];

  const calculateXP = (currentScore) => {
    if (!realWords || realWords.length === 0) return 0;
    return Math.floor((currentScore / realWords.length) * 10);
  };

  const getPrefixLength = (word) => {
    if (!word) return 1;
    if (word.length <= 4) return 1;
    if (word.length <= 8) return 2;
    return 3;
  };

  useEffect(() => {
    if (!currentWord) return;
    
    // Check historical data for a perfect score
    const saved = localAnswers[wordIndex];
    if (saved && saved.status === 'perfect') {
      const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
      // Restores the persisted attempt when the item changes, and (per task) also
      // scrolls, focuses, or advances the running score — side effects that have to
      // stay in an effect. Queued for the render-phase-adjustment rewrite; not worth
      // re-testing scoring mid study-block. See docs/daily-plan.md.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserInput(targetLetters);
      setGameState('SAVED_PERFECT');
      setScore(s => s + 1);
    } else {
      const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
      setUserInput(targetLetters.substring(0, getPrefixLength(targetLetters)));
      setGameState('Q');
      setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
    }
  }, [wordIndex, currentWord]); // eslint-disable-line react-hooks/exhaustive-deps -- restores the saved attempt for this word only; localAnswers changing must not re-run it

  const checkAnswer = () => {
    if (gameState !== 'Q') return;
    const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
    const isCorrect = userInput.toLowerCase() === targetLetters.toLowerCase();
    
    if (isCorrect) {
      setScore(s => s + 1);
      setLocalAnswers(prev => ({ ...prev, [wordIndex]: { status: 'perfect' } }));
    }
    
    setUserAnswer({ isCorrect });
    setGameState('A');
  };

  const handleNext = () => {
    if (gameState !== 'A' && gameState !== 'SAVED_PERFECT') return;
    if (wordIndex < realWords.length - 1) {
      setWordIndex(w => w + 1);
    } else {
      onComplete(calculateXP(score), localAnswers);
    }
  };

  // Global Keyboard Accessibility (WITH THE BUG FIX)
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        
        if (gameState === 'Q') {
            const targetLetters = currentWord?.word.replace(/[^a-zA-Z]/g, '');
            if (userInput.length === targetLetters?.length && e.key === 'Enter') {
               e.preventDefault();
               checkAnswer();
            }
        }
        else if (gameState === 'A') {
            // CRITICAL FIX: Only allow ArrowRight here. 
            // Feedback.jsx natively handles the 'Enter' key with a perfect 400ms safety cooldown.
            if (e.key === 'ArrowRight') {
               e.preventDefault();
               handleNext();
            }
        }
        else if (gameState === 'SAVED_PERFECT') {
            e.preventDefault();
            handleNext();
        }
      }
    };
    
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [gameState, userInput, currentWord]); // eslint-disable-line react-hooks/exhaustive-deps -- deliberately keyed to the typing state, not to the handlers it calls

  const renderInteractiveSentence = () => {
    if (!currentWord) return null;
    const targetWord = currentWord.word;
    const targetLetters = targetWord.replace(/[^a-zA-Z]/g, '');
    const prefixLen = getPrefixLength(targetLetters);
    const regex = new RegExp(`\\b${targetWord}\\b`, 'i');
    const parts = currentWord.sent.split(regex);
    
    if (parts.length === 1) {
       return (
         <div className="flex flex-col items-center w-full">
           <span className="text-xl text-slate-500 dark:text-slate-400 italic mb-4 text-center">"{currentWord.sent}"</span>
           {renderLetterBoxes(targetWord, targetLetters, prefixLen)}
         </div>
       );
    }
    return (
      <div className="text-2xl sm:text-3xl text-slate-800 dark:text-slate-200 leading-[2.5] font-medium text-center w-full">
        <span>{parts[0]}</span>
        {renderLetterBoxes(targetWord, targetLetters, prefixLen)}
        <span>{parts[1]}</span>
      </div>
    );
  };

  const renderLetterBoxes = (targetWord, targetLetters, prefixLen) => {
    let inputIdx = 0;
    const isLongWord = targetWord.length > 10;
    
    return (
      <span className="relative inline-block align-middle mx-2 sm:mx-3 top-[-2px] max-w-full">
        <input ref={inputRef} type="text" value={userInput} maxLength={targetLetters.length} disabled={gameState === 'A' || gameState === 'SAVED_PERFECT'} autoComplete="off" spellCheck="false"
          onChange={(e) => {
            let val = e.target.value.replace(/[^a-zA-Z]/g, ''); 
            if (val.length < prefixLen) val = targetLetters.substring(0, prefixLen);
            else if (!val.toLowerCase().startsWith(targetLetters.substring(0, prefixLen).toLowerCase())) val = targetLetters.substring(0, prefixLen) + val.substring(prefixLen);
            setUserInput(val);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter' && userInput.length === targetLetters.length) { e.preventDefault(); checkAnswer(); } }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10" />
        
        <div className="flex flex-wrap justify-center gap-[4px] sm:gap-[6px] pointer-events-none items-center max-w-full">
          {Array.from(targetWord).map((char, i) => {
            if (!/[a-zA-Z]/.test(char)) {
              return <div key={i} className="w-2 sm:w-4 flex items-center justify-center text-slate-300 dark:text-slate-600 font-black text-xl sm:text-2xl">-</div>;
            }

            const letter = userInput[inputIdx] || ''; 
            const isPrefix = inputIdx < prefixLen; 
            const isFilled = inputIdx < userInput.length;
            const currentInputIdx = inputIdx; 
            inputIdx++; 
            
            let boxClass = 'border-slate-300 dark:border-slate-600 text-transparent shadow-[0_3px_0_0_#e2e8f0] dark:shadow-[0_3px_0_0_#475569]';
            if (isPrefix) boxClass = 'border-transparent text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-none';
            else if (isFilled) boxClass = 'border-[#1CB0F6] text-[#1CB0F6] bg-[#1CB0F6]/10 shadow-[0_3px_0_0_#1CB0F6]'; 
            
            if (gameState === 'A' || gameState === 'SAVED_PERFECT') {
              const isPerfectState = gameState === 'SAVED_PERFECT' || (userInput.toLowerCase() === targetLetters.toLowerCase());
              boxClass = isPerfectState 
                ? 'border-[#58A700] text-[#58A700] dark:text-[#a3e635] bg-[#F0FDE6] dark:bg-[#F0FDE6]/20 shadow-[0_3px_0_0_#58A700]' 
                : 'border-[#EA2B2B] text-[#EA2B2B] dark:text-[#f87171] bg-[#FFDFE0] dark:bg-[#FFDFE0]/20 shadow-[0_3px_0_0_#EA2B2B]';
            }

            const sizeClass = isLongWord 
              ? 'w-6 h-8 sm:w-8 sm:h-10 text-lg sm:text-xl' 
              : 'w-8 h-10 sm:w-10 sm:h-12 text-xl sm:text-2xl';
            
            return (
              <div key={i} className={`${sizeClass} border-2 flex items-center justify-center font-black uppercase transition-all rounded-lg ${boxClass}`}>
                {(gameState === 'A' || gameState === 'SAVED_PERFECT') && !isFilled ? targetLetters[currentInputIdx] : letter}
              </div>
            );
          })}
        </div>
      </span>
    );
  };

  if (!currentWord) return null;
  const currentTargetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
  const isPerfectState = gameState === 'SAVED_PERFECT';

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#1CB0F6]/20 selection:text-[#1CB0F6] pb-32 transition-colors duration-300 ${isPerfectState ? 'bg-[#F0FDE6] dark:bg-[#F0FDE6]/10' : 'bg-slate-50 dark:bg-slate-950'}`}>
      <TopBar current={wordIndex} total={realWords.length} onQuit={() => onComplete(calculateXP(score), localAnswers)} modeTitle="Spelling" />
      <div className="flex-1 flex flex-col items-center p-4 sm:p-6 w-full max-w-4xl mx-auto mt-4 sm:mt-8">
        
        <div className="w-full text-center mb-8">
          <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-2xl mb-4 font-bold tracking-widest uppercase text-sm">
            <BookOpen className="w-5 h-5 mr-2" /> {isPerfectState ? 'Perfect Score Saved' : 'Context Clues'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 leading-snug">
            {currentWord.def}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-2">
            {currentWord.vnDef}
          </p>
        </div>
        
        <div className={`w-full rounded-[2rem] shadow-lg border-2 p-6 sm:p-12 mb-8 transition-colors duration-300 flex justify-center
          ${isPerfectState 
            ? 'bg-[#D7FFD7]/50 dark:bg-slate-800 border-[#58A700]/30 dark:border-[#58A700]/50 shadow-none' 
            : 'bg-white dark:bg-slate-900 shadow-slate-200 dark:shadow-none border-slate-100 dark:border-slate-800'}`}>
          {renderInteractiveSentence()}
        </div>

        {gameState === 'Q' && (
          <button 
            onClick={checkAnswer} 
            disabled={userInput.length < currentTargetLetters.length} 
            className="w-full max-w-sm px-8 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 transition-all shadow-sm"
          >
            Check Answer
          </button>
        )}

        {isPerfectState && (
          <button 
            onClick={handleNext}
            className="w-full max-w-sm px-8 py-5 bg-[#58A700] hover:bg-[#468500] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#468500] active:border-b-0 active:translate-y-[6px] transition-all shadow-sm"
          >
            Continue
          </button>
        )}
      </div>

      {gameState === 'A' && (
        <Feedback 
          isCorrect={userAnswer?.isCorrect} 
          currentWord={currentWord} 
          isWordRecognition={false} 
          track={track} 
          unitId={unitId} 
          onNext={handleNext} 
        />
      )}
    </div>
  );
}