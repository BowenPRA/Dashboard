// src/tasks/Recognition.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Check, BookOpen } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Recognition({ pool, track, unitId, onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [gameState, setGameState] = useState('Q');
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const currentWord = pool[wordIndex];

  const calculateXP = (currentScore) => {
    if (!pool || pool.length === 0) return 0;
    return Math.floor((currentScore / pool.length) * 10);
  };

  const handleAnswer = useCallback((choice) => {
    if (gameState !== 'Q') return;
    
    // With fake words removed, this becomes an honest self-assessment flashcard intro.
    // Both choices yield a point to encourage the user to review the vocabulary list.
    setScore(s => s + 1);
    setUserAnswer({ choice, isCorrect: true });
    setGameState('A');
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'Q') return;
      const key = e.key.toLowerCase();
      if (key === 'y') handleAnswer('yes');
      if (key === 'n') handleAnswer('no');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleAnswer]);

  const handleNext = useCallback(() => {
    if (gameState !== 'A') return;
    if (wordIndex + 1 < pool.length) {
      setWordIndex(w => w + 1);
      setGameState('Q');
    } else {
      onComplete(calculateXP(score));
    }
  }, [gameState, wordIndex, pool.length, onComplete, score]);

  if (!currentWord) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#1CB0F6]/20 selection:text-[#1CB0F6] pb-32">
      <TopBar 
        current={wordIndex} 
        total={pool.length} 
        onQuit={() => onComplete(calculateXP(score))} 
        modeTitle="Word Recognition"
      />

      <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm sm:text-base mb-8 text-center">
          Write this word and definition in your notebook. Listen to how it is pronounced.
        </p>

        <div className="w-full flex items-center justify-center mb-12 min-h-[120px]">
          <h1 className="text-5xl sm:text-7xl font-black text-slate-800 tracking-tight text-center break-words px-4 capitalize">
            {currentWord.word}
          </h1>
        </div>

        <div className="flex flex-row justify-center gap-6 sm:gap-12 w-full max-w-2xl">
          <button
            disabled={gameState === 'A'}
            onClick={() => handleAnswer('yes')}
            className={`group flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 border-2 rounded-[2rem] transition-all bg-white flex-shrink-0
              ${gameState === 'A' && userAnswer?.choice !== 'yes' ? 'opacity-40 border-slate-200 bg-slate-50 cursor-not-allowed' 
              : 'border-slate-300 border-b-[8px] hover:bg-slate-50 active:border-b-2 active:translate-y-[6px]'}`}
          >
            <Check className={`w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-colors ${gameState === 'A' && userAnswer?.choice !== 'yes' ? 'text-slate-400' : 'text-[#58A700] group-hover:scale-110'}`} strokeWidth={4} />
            <span className={`font-black text-lg sm:text-xl uppercase tracking-widest text-center px-2 ${gameState === 'A' && userAnswer?.choice !== 'yes' ? 'text-slate-400' : 'text-[#58A700]'}`}>Yes, I know it<br/><span className="text-sm opacity-70">(Y)</span></span>
          </button>
          
          <button
            disabled={gameState === 'A'}
            onClick={() => handleAnswer('no')}
            className={`group flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 border-2 rounded-[2rem] transition-all bg-white flex-shrink-0
              ${gameState === 'A' && userAnswer?.choice !== 'no' ? 'opacity-40 border-slate-200 bg-slate-50 cursor-not-allowed' 
              : 'border-slate-300 border-b-[8px] hover:bg-slate-50 active:border-b-2 active:translate-y-[6px]'}`}
          >
            <BookOpen className={`w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-colors ${gameState === 'A' && userAnswer?.choice !== 'no' ? 'text-slate-400' : 'text-[#1CB0F6] group-hover:scale-110'}`} strokeWidth={4} />
            <span className={`font-black text-lg sm:text-xl uppercase tracking-widest text-center px-2 ${gameState === 'A' && userAnswer?.choice !== 'no' ? 'text-slate-400' : 'text-[#1CB0F6]'}`}>No, teach me<br/><span className="text-sm opacity-70">(N)</span></span>
          </button>
        </div>
      </div>

      {gameState === 'A' && (
        <Feedback 
          isCorrect={userAnswer?.isCorrect} 
          currentWord={currentWord} 
          isWordRecognition={true} 
          track={track}
          unitId={unitId}
          onNext={handleNext} 
        />
      )}
    </div>
  );
}