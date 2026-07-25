import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, Award, PenTool, Type, FlaskConical, FileEdit, ArrowRight, Languages } from 'lucide-react';
import TopBar from '../components/TopBar';

import { gradeShortAnswer } from '../utils/aiGrader';
import { EmptyState } from '../components/ui';

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

const checkRequiredWordGroup = (wordGroup, text) => {
  if (!text) return false;
  const group = Array.isArray(wordGroup) ? wordGroup : [wordGroup];

  for (let reqWord of group) {
    if (text.toLowerCase().includes(reqWord.toLowerCase())) return true;
    if (!reqWord.includes(' ')) {
      const words = text.split(/[\s,.-]+/);
      for (let w of words) {
        if (calculateSimilarity(reqWord, w) >= 0.85) return true;
      }
    }
  }
  return false;
};

export default function ShortAnswers({ pool, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike, track, unitTitle }) {
  const questions = pool?.shortQA || [];
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); 
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const [cumulativePoints, setCumulativePoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);

  const currentQ = questions[currentIndex];

  // --- SAFE FALLBACKS FOR COMPONENT STABILITY ---
  const requiredWords = currentQ?.requiredWords || [];
  const scienceMaxMarks = currentQ?.scienceMaxMarks || 2;
  const markScheme = currentQ?.markScheme || ['Provides a correct explanation or calculation.', 'Addresses the specific prompt.'];
  const modelAnswer = currentQ?.modelAnswer || currentQ?.sampleAnswer || "No model answer provided.";
  const vnTranslation = currentQ?.vnTranslation || null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[currentIndex];
    setShowTranslation(false); 
    
    if (saved) {
      const text = typeof saved === 'string' ? saved : saved.text;
      const status = typeof saved === 'string' ? 'perfect' : saved.status;

      setUserAnswer(text);
      setFeedback(null);

      if (status === 'perfect') {
        setGameState('SAVED_PERFECT');
      } else if (status === 'api_error') {
        setGameState('SAVED_API_ERROR');
      } else if (status === 'strike_fallback') {
        setGameState('Q'); 
      } else {
        setGameState('Q');
      }
    } else {
      setUserAnswer('');
      setFeedback(null);
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleLocalFallbackGrade = () => {
    const usedWordGroups = requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    
    const trimmed = userAnswer.trim();
    const hasCapital = /^[A-Z]/.test(trimmed);
    const hasPeriod = /[.!?]$/.test(trimmed);
    const englishScore = (hasCapital && hasPeriod) ? 1 : 0;

    const pointsEarned = usedWordGroups.length + englishScore;
    const maxPoints = requiredWords.length + scienceMaxMarks + 2; 

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks: markScheme.map(() => false),
      scienceScore: 0,
      englishScore,
      pointsEarned,
      maxPoints,
      isPerfect: false,
      englishFeedback: englishScore ? "1 point awarded for capital letter and punctuation." : "Missed extra point. Start with a capital and end with a period.",
      scienceFeedback: "AI Grader is disabled for this unit due to 3 strikes. No marks can be awarded.",
      fixedAnswer: "AI Grader disabled.",
      isStrikeFallback: true
    });

    setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'strike_fallback' } }));
    setGameState('A');
  };

  const handleGrade = async () => {
    if (!userAnswer.trim()) return;

    if (strikes >= 3) {
      handleLocalFallbackGrade();
      return;
    }

    setGameState('LOADING');

    const primaryRequiredWords = requiredWords.map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      question: currentQ.question,
      studentAnswer: userAnswer.trim(),
      requiredWords: primaryRequiredWords,
      expectedAnswer: modelAnswer,
      scienceMaxMarks: scienceMaxMarks,
      markScheme: markScheme,
      track,
      unitTitle
    };

    let aiData;

    try {
      aiData = await gradeShortAnswer(payload);
    } catch (e1) {
      console.warn("AI Grade Failed, retrying in 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
      try {
        aiData = await gradeShortAnswer(payload);
      } catch (e2) {
        console.error("AI Grade Failed twice. Entering Error State.");
        setGameState('SAVED_API_ERROR');
        setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'api_error' } }));
        return;
      }
    }

    if (aiData.isHarmful || aiData.isGarbage) {
      const newStrikes = strikes + 1;
      if (onAddStrike) onAddStrike(newStrikes);
      
      if (newStrikes >= 3) {
        alert("Strike 3! You have submitted too many inappropriate or nonsense answers. The AI Grader is permanently disabled for this unit.");
        handleLocalFallbackGrade();
      } else {
        alert(`Warning! Nonsense or inappropriate answer detected. Strike ${newStrikes}/3.`);
        setGameState('Q'); 
      }
      return;
    }

    const usedWordGroups = requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    const scienceScore = aiData.scienceScore || 0;
    const englishScore = aiData.englishScore || 0;
    const marksScored = markScheme.map((_, i) => i < scienceScore);

    const pointsEarned = usedWordGroups.length + scienceScore + englishScore;
    const maxPoints = requiredWords.length + scienceMaxMarks + 2; 
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks: marksScored,
      scienceScore,
      englishScore,
      pointsEarned: Math.min(pointsEarned, maxPoints),
      maxPoints,
      isPerfect,
      englishFeedback: aiData.englishFeedback || "No feedback provided.",
      scienceFeedback: aiData.scienceFeedback || "No feedback provided.",
      fixedAnswer: aiData.reworkedAnswer || userAnswer.trim(),
      isStrikeFallback: false
    });

    if (isPerfect) {
      setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'perfect' } }));
    }
    
    setGameState('A');
  };

  const handleNext = () => {
    let newCumPoints = cumulativePoints;
    let newMaxPoints = maxPossiblePoints;

    if (gameState === 'SAVED_PERFECT') {
      const maxP = requiredWords.length + scienceMaxMarks + 2;
      newCumPoints += maxP;
      newMaxPoints += maxP;
    } else if (feedback) {
      newCumPoints += feedback.pointsEarned;
      newMaxPoints += feedback.maxPoints;
    } else if (gameState === 'SAVED_API_ERROR') {
      newMaxPoints += requiredWords.length + scienceMaxMarks + 2;
    }

    setCumulativePoints(newCumPoints);
    setMaxPossiblePoints(newMaxPoints);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalXP = newMaxPoints === 0 ? 0 : Math.ceil((newCumPoints / newMaxPoints) * 20);
      onComplete(finalXP, localAnswers); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      if (gameState === 'Q' || gameState === 'SAVED_API_ERROR') {
        if (userAnswer.trim()) handleGrade();
      } else if (gameState === 'A' || gameState === 'SAVED_PERFECT') {
        handleNext();
      }
    }
  };

  // Global Keyboard Accessibility (Ignoring TEXTAREA)
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (gameState === 'A' || gameState === 'SAVED_PERFECT' || gameState === 'SAVED_API_ERROR') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [gameState, handleNext]);


  if (!currentQ) {
    return (
      <EmptyState
        icon={<PenTool className="w-16 h-16" />}
        iconClassName="text-teal-300 dark:text-teal-500"
        title="Coming Soon"
        message="Teacher is currently writing the Short Answer questions for this unit."
        onAction={onQuit}
      />
    );
  }

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-40 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent ";
  
  if (gameState === 'SAVED_API_ERROR') {
    containerClass += "bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-800/50";
    textAreaClass += "text-orange-900 dark:text-orange-100";
  } else if (strikes >= 3 || (gameState === 'A' && feedback?.isStrikeFallback)) {
    containerClass += "bg-rose-50 dark:bg-rose-950/30 border-rose-400 dark:border-rose-800/50";
    textAreaClass += "text-rose-900 dark:text-rose-100";
  } else if ((gameState === 'A' && feedback?.isPerfect) || gameState === 'SAVED_PERFECT') {
    containerClass += "bg-[#ecfccb] dark:bg-[#3f6212]/20 border-[#84cc16] dark:border-[#4d7c0f]";
    textAreaClass += "text-[#3f6212] dark:text-[#a3e635]";
  } else {
    containerClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700";
    textAreaClass += "text-slate-800 dark:text-slate-100";
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 transition-colors duration-300">
      <TopBar 
        current={currentIndex} 
        total={questions.length} 
        onQuit={() => onComplete(0, localAnswers)} 
        modeTitle="Short Answers" 
      />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-4xl mx-auto mt-2 sm:mt-6">
        
        <div className="w-full mb-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-3">
             <h2 className="text-[#14b8a6] font-black text-xl uppercase tracking-widest">
               Question {currentIndex + 1}
             </h2>
             {vnTranslation && (
               <button 
                 onClick={() => setShowTranslation(!showTranslation)}
                 className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#14b8a6] hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors text-xs font-bold uppercase tracking-widest"
               >
                 <Languages className="w-4 h-4" />
                 {showTranslation ? 'Hide Translation' : 'View Translation'}
               </button>
             )}
          </div>
          
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 leading-snug">
            {currentQ.question}
          </p>
          
          {showTranslation && vnTranslation && (
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl border-l-4 border-[#14b8a6] animate-in slide-in-from-top-2 duration-200">
              <p className="text-slate-600 dark:text-slate-400 font-medium italic">
                "{vnTranslation}"
              </p>
            </div>
          )}
        </div>

        <div className={containerClass}>
          <textarea 
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            disabled={gameState !== 'Q'}
            placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Type your answer here..."}
            className={textAreaClass}
          />
        </div>

        {gameState !== 'LOADING' && requiredWords.length > 0 && (
          <div className="w-full mb-10">
            <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
              Required Vocabulary
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {requiredWords.map((wordGroup, i) => {
                const isUsed = feedback 
                  ? feedback.usedWordGroups.includes(wordGroup) 
                  : checkRequiredWordGroup(wordGroup, userAnswer);
                const displayWord = Array.isArray(wordGroup) ? wordGroup[0] : wordGroup;
                
                return (
                  <span 
                    key={i} 
                    className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors duration-300 ${
                      isUsed 
                        ? 'bg-[#d7ffb8] dark:bg-[#d7ffb8]/20 text-[#3e7500] dark:text-[#a3e635] border-[#58a700]' 
                        : 'bg-white dark:bg-slate-800 text-[#58a700] dark:text-[#84cc16] border-[#58a700] dark:border-[#84cc16]'
                    }`}
                  >
                    {displayWord}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'SAVED_PERFECT' && (
          <div className="w-full flex justify-end mt-2 mb-8 border-t border-slate-200 dark:border-slate-800 pt-6 animate-in fade-in">
             <button 
               onClick={handleNext} 
               className="flex items-center px-10 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-[#0d9488] active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
             >
               {currentIndex < questions.length - 1 ? 'Continue' : 'Complete Section'} 
               <ArrowRight className="w-6 h-6 ml-3" />
             </button>
          </div>
        )}

        {gameState === 'SAVED_API_ERROR' && (
          <div className="w-full mt-2 animate-in fade-in">
            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 p-6 sm:p-8 rounded-[1.5rem] shadow-sm mb-8">
               <div className="flex items-center mb-4">
                 <XCircle className="w-8 h-8 text-orange-500 mr-3" />
                 <h3 className="text-xl font-black text-orange-800 dark:text-orange-400">Connection Failed</h3>
               </div>
               <p className="text-sm font-bold text-orange-700 dark:text-orange-300 mt-2">
                 The AI grader is currently offline. Your answer has been saved. Please continue and resubmit on a future attempt.
               </p>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
               <button onClick={handleNext} className="flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-orange-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm">
                 {currentIndex < questions.length - 1 ? 'Skip Question' : 'Complete Section'} <ArrowRight className="w-6 h-6 ml-3" />
               </button>
            </div>
          </div>
        )}

        {(gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
          <div className="w-full flex justify-end mt-2 mb-8 border-t border-slate-200 dark:border-slate-800 pt-6">
            <button 
              onClick={handleGrade} 
              disabled={!userAnswer.trim()} 
              className="px-10 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-[#0d9488] active:border-b-0 active:translate-y-[5px] disabled:opacity-50 transition-all shadow-sm"
            >
              Submit to {strikes >= 3 ? "Local Grader" : "AI Tutor"}
            </button>
          </div>
        )}

        {gameState === 'LOADING' && (
          <div className="w-full h-40 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse mt-8">
             <div className="bg-teal-100 dark:bg-teal-900/40 p-3 rounded-full mb-3">
               <Bot className="w-8 h-8 text-teal-600 dark:text-teal-400 animate-bounce" />
             </div>
             <h3 className="text-lg font-black text-slate-700 dark:text-slate-300">AI Tutor is analyzing your answer...</h3>
          </div>
        )}

        {gameState === 'A' && feedback && (
          <div className="w-full mt-2 animate-in slide-in-from-bottom-8 duration-500">

            {!feedback.isPerfect && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Your Attempt
                </span>
                <p className="text-lg text-slate-700 dark:text-slate-300 font-medium italic">
                  "{feedback.originalAnswer}"
                </p>
              </div>
            )}

            <div className="flex items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className={`p-3 rounded-full mr-4 flex-shrink-0 ${feedback.isStrikeFallback ? 'bg-rose-500' : 'bg-[#14b8a6]'}`}>
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {feedback.isStrikeFallback ? "Local Fallback Evaluation" : "AI Tutor Evaluation"}
                </h3>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
                  Accuracy Score: 
                  <span className={`ml-2 text-base ${feedback.isPerfect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                    {feedback.pointsEarned} / {feedback.maxPoints} Pts
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4 text-slate-800 dark:text-slate-200">
                <div className="flex items-center">
                  <Award className="w-6 h-6 mr-2 text-amber-500" />
                  <h3 className="text-lg font-black">Mark Scheme Breakdown</h3>
                </div>
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-lg text-sm">
                  {feedback.scienceScore} / {scienceMaxMarks} Pts
                </span>
              </div>
              
              <ul className="space-y-3">
                {markScheme.map((mark, i) => (
                  <li key={i} className="flex items-start">
                    {feedback.scienceMarks[i] ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 dark:text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-base font-medium ${feedback.scienceMarks[i] ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600 line-through'}`}>
                      {mark}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div className="bg-[#fff9e6] dark:bg-[#fff9e6]/10 border border-[#fde68a] dark:border-[#fde68a]/20 p-6 rounded-[1.5rem]">
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center text-[#d97706] dark:text-[#fbbf24]">
                     <Type className="w-5 h-5 mr-2" />
                     <h4 className="font-black text-sm uppercase tracking-widest">English Feedback</h4>
                   </div>
                   <span className="bg-[#fef3c7] dark:bg-[#fef3c7]/20 text-[#b45309] dark:text-[#fcd34d] font-bold px-2 py-0.5 rounded-md text-xs">
                     {feedback.englishScore} / 2 Pts
                   </span>
                 </div>
                 <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                   {feedback.englishFeedback}
                 </p>
               </div>
               
               <div className="bg-[#eff6ff] dark:bg-[#eff6ff]/10 border border-[#bfdbfe] dark:border-[#bfdbfe]/20 p-6 rounded-[1.5rem]">
                 <div className="flex items-center text-[#2563eb] dark:text-[#60a5fa] mb-3">
                   <FlaskConical className="w-5 h-5 mr-2" />
                   <h4 className="font-black text-sm uppercase tracking-widest">Academic Feedback</h4>
                 </div>
                 <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                   {feedback.scienceFeedback}
                 </p>
               </div>
            </div>

            <div className="bg-[#ecfccb] dark:bg-[#3f6212]/20 border border-[#bbf7d0] dark:border-[#4d7c0f] p-6 sm:p-8 rounded-[1.5rem] relative overflow-hidden mb-8">
              <div className="absolute top-4 right-4 bg-[#84cc16] p-2 rounded-full text-white">
                <FileEdit className="w-5 h-5" />
              </div>
              
              <h4 className="font-black text-[#3f6212] dark:text-[#a3e635] text-sm uppercase tracking-widest mb-4">
                Suggested Answer
              </h4>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-xs font-bold text-[#65a30d] dark:text-[#bef264] uppercase mb-1">
                    {feedback.isPerfect ? "Your Perfect Sentence:" : "Fixed Version of Your Sentence:"}
                  </span>
                  <p className="text-lg font-bold text-[#166534] dark:text-[#ecfccb]">
                    "{feedback.fixedAnswer}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#d9f99d] dark:border-[#65a30d]">
                  <span className="block text-xs font-bold text-[#65a30d] dark:text-[#bef264] uppercase mb-1">
                    Official Model Answer:
                  </span>
                  <p className="text-lg font-bold text-[#166534] dark:text-[#ecfccb]">
                    "{modelAnswer}"
                  </p>
                </div>
              </div>
              
              <p className="text-sm font-bold text-[#3f6212] dark:text-[#a3e635] mt-6 bg-[#d9f99d] dark:bg-[#3f6212]/50 inline-block px-4 py-2 rounded-lg">
                📝 Note how this model answer directly answers the prompt.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
               <button 
                 onClick={handleNext} 
                 className="flex items-center px-10 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-[#0d9488] active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
               >
                 {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Section'} 
                 <ArrowRight className="w-6 h-6 ml-3" />
               </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}