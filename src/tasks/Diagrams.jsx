import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, Award, ImageIcon, Type, FlaskConical, FileEdit, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';

import { gradeDiagram } from '../utils/aiGrader';

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

export default function Diagrams({ pool, unitId, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike }) {
  const questions = pool?.diagrams || [];
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); // Q, LOADING, A, SAVED_PERFECT, SAVED_API_ERROR
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const [cumulativePoints, setCumulativePoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[currentIndex];
    
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

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <ImageIcon className="w-16 h-16 text-rose-300 mb-4" />
        <h2 className="text-3xl font-black text-slate-800 mb-2">Coming Soon</h2>
        <p className="text-lg text-slate-500 mb-8 max-w-md">Teacher is currently uploading the Diagrams for this unit.</p>
        <button onClick={onQuit} className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] transition-all">
          Return
        </button>
      </div>
    );
  }

  const handleLocalFallbackGrade = () => {
    const usedWordGroups = currentQ.requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    
    const trimmed = userAnswer.trim();
    const hasCapital = /^[A-Z]/.test(trimmed);
    const hasPeriod = /[.!?]$/.test(trimmed);
    const englishScore = (hasCapital && hasPeriod) ? 1 : 0; 

    const pointsEarned = usedWordGroups.length + englishScore;
    const maxPoints = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3;

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks: currentQ.markScheme.map(() => false),
      scienceScore: 0,
      englishScore,
      pointsEarned,
      maxPoints,
      isPerfect: false,
      englishFeedback: englishScore ? "1 point awarded for capital letter and punctuation." : "Missed extra point. Start with a capital and end with a period.",
      scienceFeedback: "AI Grader is disabled for this unit due to 3 strikes. No Cambridge marks can be awarded.",
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

    const primaryRequiredWords = currentQ.requiredWords.map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      promptText: currentQ.prompt || currentQ.promptText,
      studentAnswer: userAnswer.trim(),
      requiredWords: primaryRequiredWords,
      expectedAnswer: currentQ.modelAnswer,
      scienceMaxMarks: currentQ.scienceMaxMarks,
      markScheme: currentQ.markScheme
    };

    let aiData;

    try {
      aiData = await gradeDiagram(payload);
    } catch (e1) {
      console.warn("AI Grade Failed, retrying in 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
      try {
        aiData = await gradeDiagram(payload);
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

    const usedWordGroups = currentQ.requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    const scienceScore = aiData.scienceScore || 0;
    const englishScore = aiData.englishScore || 0;
    const scienceMarks = currentQ.markScheme.map((_, i) => i < scienceScore);

    const pointsEarned = usedWordGroups.length + scienceScore + englishScore;
    const maxPoints = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3; 
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks,
      scienceScore,
      englishScore,
      pointsEarned: Math.min(pointsEarned, maxPoints),
      maxPoints,
      isPerfect,
      englishFeedback: aiData.englishFeedback || "No feedback provided.",
      scienceFeedback: aiData.scienceFeedback || "No feedback provided.",
      fixedAnswer: aiData.fixedAnswer || aiData.reworkedAnswer || userAnswer.trim(),
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
      const maxP = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3;
      newCumPoints += maxP;
      newMaxPoints += maxP;
    } else if (feedback) {
      newCumPoints += feedback.pointsEarned;
      newMaxPoints += feedback.maxPoints;
    } else if (gameState === 'SAVED_API_ERROR') {
      newMaxPoints += currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3;
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

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-40 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent ";
  
  if (gameState === 'SAVED_API_ERROR') {
    containerClass += "bg-orange-50 border-orange-300";
    textAreaClass += "text-orange-900";
  } else if (strikes >= 3 || (gameState === 'A' && feedback?.isStrikeFallback)) {
    containerClass += "bg-rose-50 border-rose-400";
    textAreaClass += "text-rose-900";
  } else if ((gameState === 'A' && feedback?.isPerfect) || gameState === 'SAVED_PERFECT') {
    containerClass += "bg-[#ecfccb] border-[#84cc16]";
    textAreaClass += "text-[#3f6212]";
  } else {
    containerClass += "bg-white border-slate-200";
    textAreaClass += "text-slate-800";
  }

  // Dynamic Image Logic Helper
  const renderVisual = () => {
    if (currentQ.inlineSvg) {
      return (
        <div 
          className="w-full h-auto max-h-[500px] flex items-center justify-center p-4 rounded-xl"
          dangerouslySetInnerHTML={{ __html: currentQ.inlineSvg }}
        />
      );
    } 
    
    if (currentQ.imageFile || currentQ.imageUrl) {
      const fallbackImage = currentQ.imageFile || currentQ.imageUrl;
      // Strip any leading slashes or directories for clean formatting
      const cleanImageName = fallbackImage.startsWith('/') ? fallbackImage.split('/').pop() : fallbackImage;
      const dynamicSrc = `${import.meta.env.BASE_URL || ''}images/${unitId}/${cleanImageName}`;

      return (
        <img 
          src={dynamicSrc} 
          alt="Science Diagram" 
          className="w-full h-auto max-h-[500px] object-contain rounded-xl"
        />
      );
    }
    
    return (
      <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
        <ImageIcon className="w-12 h-12" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      <TopBar 
        current={currentIndex} 
        total={questions.length} 
        onQuit={() => onComplete(0, localAnswers)} 
        modeTitle="Diagram Analysis" 
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Image/SVG Viewer */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24">
               {renderVisual()}
            </div>
          </div>

          {/* RIGHT: Interaction & Feedback */}
          <div className="w-full lg:w-1/2 flex flex-col">
            
            <div className="w-full mb-6 animate-in fade-in duration-300">
              <h2 className="text-rose-500 font-black text-xl mb-2 uppercase tracking-widest">
                Analysis {currentIndex + 1}
              </h2>
              <p className="text-2xl font-bold text-slate-800 leading-snug">
                {currentQ.prompt || currentQ.promptText}
              </p>
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
                placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Analyze the diagram here..."}
                className={textAreaClass}
              />
            </div>

            {gameState !== 'LOADING' && (
              <div className="w-full mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
                  Required Vocabulary
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {currentQ.requiredWords.map((wordGroup, i) => {
                    const isUsed = feedback 
                      ? feedback.usedWordGroups.includes(wordGroup) 
                      : checkRequiredWordGroup(wordGroup, userAnswer);
                    const displayWord = Array.isArray(wordGroup) ? wordGroup[0] : wordGroup;
                    
                    return (
                      <span 
                        key={i} 
                        className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors duration-300 ${
                          isUsed 
                            ? 'bg-[#d7ffb8] text-[#3e7500] border-[#58a700]' 
                            : 'bg-white text-[#58a700] border-[#58a700]'
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
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 pt-6 animate-in fade-in">
                 <button 
                   onClick={handleNext} 
                   className="flex items-center px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                 >
                   {currentIndex < questions.length - 1 ? 'Continue' : 'Complete Section'} 
                   <ArrowRight className="w-6 h-6 ml-3" />
                 </button>
              </div>
            )}

            {gameState === 'SAVED_API_ERROR' && (
              <div className="w-full animate-in fade-in">
                <div className="bg-orange-50 border border-orange-200 p-6 sm:p-8 rounded-[1.5rem] shadow-sm mb-8">
                   <div className="flex items-center mb-4">
                     <XCircle className="w-8 h-8 text-orange-500 mr-3" />
                     <h3 className="text-xl font-black text-orange-800">Connection Failed</h3>
                   </div>
                   <p className="text-sm font-bold text-orange-700 mt-2">
                     The AI grader is currently offline. Your answer has been saved. Please continue and resubmit on a future attempt.
                   </p>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-200 mb-8">
                   <button onClick={handleNext} className="flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-orange-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm">
                     {currentIndex < questions.length - 1 ? 'Skip Question' : 'Complete Section'} <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>
              </div>
            )}

            {(gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 pt-6">
                <button 
                  onClick={handleGrade} 
                  disabled={!userAnswer.trim()} 
                  className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] disabled:opacity-50 transition-all shadow-sm"
                >
                  Submit to {strikes >= 3 ? "Local Grader" : "AI Tutor"}
                </button>
              </div>
            )}

            {gameState === 'LOADING' && (
              <div className="w-full h-40 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-slate-200 shadow-sm animate-pulse mb-8">
                 <div className="bg-rose-100 p-3 rounded-full mb-3">
                   <Bot className="w-8 h-8 text-rose-500 animate-bounce" />
                 </div>
                 <h3 className="text-lg font-black text-slate-700">AI Tutor is analyzing your answer...</h3>
              </div>
            )}

            {gameState === 'A' && feedback && (
              <div className="w-full animate-in slide-in-from-bottom-8 duration-500">

                {!feedback.isPerfect && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Your Attempt
                    </span>
                    <p className="text-lg text-slate-700 font-medium italic">
                      "{feedback.originalAnswer}"
                    </p>
                  </div>
                )}

                <div className="flex items-center mb-6 border-b border-slate-200 pb-6">
                  <div className={`p-3 rounded-full mr-4 flex-shrink-0 bg-rose-500`}>
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">
                      {feedback.isStrikeFallback ? "Local Fallback Evaluation" : "AI Tutor Evaluation"}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mt-1">
                      Accuracy Score: 
                      <span className={`ml-2 text-base ${feedback.isPerfect ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {feedback.pointsEarned} / {feedback.maxPoints} Pts
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4 text-slate-800">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 mr-2 text-amber-500" />
                      <h3 className="text-lg font-black">Cambridge Mark Scheme Breakdown</h3>
                    </div>
                    <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-lg text-sm">
                      {feedback.scienceScore} / {currentQ.scienceMaxMarks} Pts
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {currentQ.markScheme.map((mark, i) => (
                      <li key={i} className="flex items-start">
                        {feedback.scienceMarks[i] ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-300 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-base font-medium ${feedback.scienceMarks[i] ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {mark}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-6">
                   <div className="bg-[#fff9e6] border border-[#fde68a] p-6 rounded-[1.5rem]">
                     <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center text-[#d97706]">
                         <Type className="w-5 h-5 mr-2" />
                         <h4 className="font-black text-sm uppercase tracking-widest">English Feedback</h4>
                       </div>
                       <span className="bg-[#fef3c7] text-[#b45309] font-bold px-2 py-0.5 rounded-md text-xs">
                         {feedback.englishScore} / 3 Pts
                       </span>
                     </div>
                     <p className="text-slate-700 font-medium leading-relaxed">
                       {feedback.englishFeedback}
                     </p>
                   </div>
                   
                   <div className="bg-[#eff6ff] border border-[#bfdbfe] p-6 rounded-[1.5rem]">
                     <div className="flex items-center text-[#2563eb] mb-3">
                       <FlaskConical className="w-5 h-5 mr-2" />
                       <h4 className="font-black text-sm uppercase tracking-widest">Science Feedback</h4>
                     </div>
                     <p className="text-slate-700 font-medium leading-relaxed">
                       {feedback.scienceFeedback}
                     </p>
                   </div>
                </div>

                <div className="bg-[#ecfccb] border border-[#bbf7d0] p-6 sm:p-8 rounded-[1.5rem] relative overflow-hidden mb-8">
                  <div className="absolute top-4 right-4 bg-[#84cc16] p-2 rounded-full text-white">
                    <FileEdit className="w-5 h-5" />
                  </div>
                  
                  <h4 className="font-black text-[#3f6212] text-sm uppercase tracking-widest mb-4">
                    Suggested Notebook Answer
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-[#65a30d] uppercase mb-1">
                        {feedback.isPerfect ? "Your Perfect Analysis:" : "Fixed Version of Your Analysis:"}
                      </span>
                      <p className="text-lg font-bold text-[#166534]">
                        "{feedback.fixedAnswer}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#d9f99d]">
                      <span className="block text-xs font-bold text-[#65a30d] uppercase mb-1">
                        Official Model Answer:
                      </span>
                      <p className="text-lg font-bold text-[#166534]">
                        "{currentQ.modelAnswer}"
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm font-bold text-[#3f6212] mt-6 bg-[#d9f99d] inline-block px-4 py-2 rounded-lg">
                    📝 Write one of these down in your notebook for full credit.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 mb-8">
                   <button 
                     onClick={handleNext} 
                     className="flex items-center px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                   >
                     {currentIndex < questions.length - 1 ? 'Next Diagram' : 'Complete Section'} 
                     <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>

              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}