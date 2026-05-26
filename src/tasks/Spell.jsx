import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Spell({ pool, track, unitId, onComplete, onQuit }) {
  const realWords = useMemo(() => (pool || []).filter(w => w.isReal !== false), [pool]);
  const [wordIndex, setWordIndex] = useState(0);
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
    if (gameState === 'Q' && currentWord) {
      // FIX: Only extract alphabetical letters for the typing mechanic
      const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
      setUserInput(targetLetters.substring(0, getPrefixLength(targetLetters)));
      setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
    }
  }, [gameState, wordIndex, currentWord]);

  const checkAnswer = () => {
    if (gameState !== 'Q') return;
    const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
    const isCorrect = userInput.toLowerCase() === targetLetters.toLowerCase();
    if (isCorrect) setScore(s => s + 1);
    setUserAnswer({ isCorrect });
    setGameState('A');
  };

  const handleNext = () => {
    if (gameState !== 'A') return;
    if (wordIndex < realWords.length - 1) {
      setWordIndex(w => w + 1);
      setGameState('Q');
    } else {
      onComplete(calculateXP(score));
    }
  };

  const renderInteractiveSentence = () => {
    if (!currentWord) return null;
    const targetWord = currentWord.word;
    const targetLetters = targetWord.replace(/[^a-zA-Z]/g, '');
    const prefixLen = getPrefixLength(targetLetters);
    const regex = new RegExp(`\\b${targetWord}\\b`, 'i');
    const parts = currentWord.sent.split(regex);
    
    if (parts.length === 1) {
       return (<div className="flex flex-col items-center"><span className="text-xl text-slate-500 italic mb-4">"{currentWord.sent}"</span>{renderLetterBoxes(targetWord, targetLetters, prefixLen)}</div>);
    }
    return (<div className="text-2xl sm:text-3xl text-slate-800 leading-[2.5] font-medium text-center"><span>{parts[0]}</span>{renderLetterBoxes(targetWord, targetLetters, prefixLen)}<span>{parts[1]}</span></div>);
  };

  const renderLetterBoxes = (targetWord, targetLetters, prefixLen) => {
    let inputIdx = 0;
    
    return (
      <span className="inline-flex relative align-middle mx-3 top-[-2px]">
        <input ref={inputRef} type="text" value={userInput} maxLength={targetLetters.length} disabled={gameState === 'A'} autoComplete="off" spellCheck="false"
          onChange={(e) => {
            let val = e.target.value.replace(/[^a-zA-Z]/g, ''); 
            if (val.length < prefixLen) val = targetLetters.substring(0, prefixLen);
            else if (!val.toLowerCase().startsWith(targetLetters.substring(0, prefixLen).toLowerCase())) val = targetLetters.substring(0, prefixLen) + val.substring(prefixLen);
            setUserInput(val);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter' && userInput.length === targetLetters.length) { e.preventDefault(); checkAnswer(); } }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10" />
        
        <div className="flex gap-[4px] pointer-events-none items-center">
          {Array.from(targetWord).map((char, i) => {
            // FIX: If the character is a space or hyphen, render a spacer instead of an input box
            if (!/[a-zA-Z]/.test(char)) {
              return <div key={i} className="w-3 sm:w-5 h-10 sm:h-12 flex items-center justify-center text-slate-300 font-black text-2xl">-</div>;
            }

            const letter = userInput[inputIdx] || ''; 
            const isPrefix = inputIdx < prefixLen; 
            const isFilled = inputIdx < userInput.length;
            const currentInputIdx = inputIdx; // Capture current index before incrementing
            inputIdx++; // Move to the next typed letter
            
            let boxClass = 'border-slate-300 text-transparent shadow-[0_3px_0_0_#e2e8f0]';
            if (isPrefix) boxClass = 'border-transparent text-slate-800 bg-slate-100 shadow-none';
            else if (isFilled) boxClass = 'border-[#1CB0F6] text-[#1CB0F6] bg-[#1CB0F6]/10 shadow-[0_3px_0_0_#1CB0F6]'; 
            if (gameState === 'A') boxClass = userInput.toLowerCase() === targetLetters.toLowerCase() ? 'border-[#58A700] text-[#58A700] bg-[#F0FDE6] shadow-[0_3px_0_0_#58A700]' : 'border-[#EA2B2B] text-[#EA2B2B] bg-[#FFDFE0] shadow-[0_3px_0_0_#EA2B2B]';
            
            return (<div key={i} className={`w-8 h-10 sm:w-10 sm:h-12 border-2 flex items-center justify-center font-black text-xl sm:text-2xl uppercase transition-all rounded-lg ${boxClass}`}>{gameState === 'A' && !isFilled ? targetLetters[currentInputIdx] : letter}</div>);
          })}
        </div>
      </span>
    );
  };

  if (!currentWord) return null;
  const currentTargetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#1CB0F6]/20 selection:text-[#1CB0F6] pb-32">
      <TopBar current={wordIndex} total={realWords.length} onQuit={onQuit} modeTitle="Spelling" />
      <div className="flex-1 flex flex-col items-center p-4 sm:p-6 w-full max-w-4xl mx-auto mt-4 sm:mt-8">
        <div className="w-full text-center mb-8">
          <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-2xl mb-4 font-bold tracking-widest uppercase text-sm"><BookOpen className="w-5 h-5 mr-2" /> Context Clues</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-snug">{currentWord.def}</h2><p className="text-lg text-slate-500 font-medium mt-2">{currentWord.vnDef}</p>
        </div>
        <div className="w-full bg-white rounded-[2rem] shadow-lg shadow-slate-200 border-2 border-slate-100 p-8 sm:p-12 mb-8">{renderInteractiveSentence()}</div>
        {gameState === 'Q' && <button onClick={checkAnswer} disabled={userInput.length < currentTargetLetters.length} className="w-full max-w-sm px-8 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 transition-all shadow-sm">Check Answer</button>}
      </div>
      {gameState === 'A' && <Feedback isCorrect={userAnswer?.isCorrect} currentWord={currentWord} isWordRecognition={false} track={track} unitId={unitId} onNext={handleNext} />}
    </div>
  );
}