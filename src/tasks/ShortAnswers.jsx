import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, MinusCircle, PenTool, ArrowRight, Languages } from 'lucide-react';
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

export default function ShortAnswers({ pool, onComplete, onProgress, onQuit, savedData = {}, strikes = 0, onAddStrike, track, unitTitle }) {
  const questions = pool?.shortQA || [];
  const [localAnswers, setLocalAnswers] = useState(savedData);

  // XP already banked from the questions answered with full marks (the ones
  // stored, and skipped on a later attempt). Used to credit progress the moment a
  // question is passed and when the student exits, so quitting never zeroes work.
  const bankedXP = (answers) => {
    const totalMarks = questions.reduce((s, qq) => s + (qq?.scienceMaxMarks || 2), 0);
    if (!totalMarks) return 0;
    const earned = questions.reduce((s, qq, i) => {
      const a = answers?.[i];
      const perfect = a && (typeof a === 'string' || a.status === 'perfect');
      return s + (perfect ? (qq?.scienceMaxMarks || 2) : 0);
    }, 0);
    return Math.round((earned / totalMarks) * 20);
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); 
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const [cumulativePoints, setCumulativePoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);

  const currentQ = questions[currentIndex];

  // --- SAFE FALLBACKS FOR COMPONENT STABILITY ---
  const suggestedWords = currentQ?.suggestedWords || [];
  const scienceMaxMarks = currentQ?.scienceMaxMarks || 2;
  const markScheme = currentQ?.markScheme || ['Provides a correct explanation or calculation.', 'Addresses the specific prompt.'];
  const modelAnswer = currentQ?.modelAnswer || currentQ?.sampleAnswer || "No model answer provided.";
  const vnTranslation = currentQ?.vnTranslation || null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[currentIndex];
    // Restores the persisted attempt when the item changes, and (per task) also
    // scrolls, focuses, or advances the running score — side effects that have to
    // stay in an effect. Queued for the render-phase-adjustment rewrite; not worth
    // re-testing scoring mid study-block. See docs/daily-plan.md.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // Suggested words are still highlighted as hints, but never scored.
    const usedWordGroups = suggestedWords.filter(group => checkRequiredWordGroup(group, userAnswer));

    // The mark scheme is the whole score now, and only the AI grader can award
    // it, so a disabled grader means no marks — there is nothing left to
    // approximate locally.
    setFeedback({
      usedWordGroups,
      marks: markScheme.map(() => false),
      score: 0,
      maxMarks: scienceMaxMarks,
      isPerfect: false,
      isStrikeFallback: true
    });

    const next = { ...localAnswers, [currentIndex]: { text: userAnswer.trim(), status: 'strike_fallback' } };
    setLocalAnswers(next);
    onProgress?.(bankedXP(next), next);
    setGameState('A');
  };

  const handleGrade = async () => {
    if (!userAnswer.trim()) return;

    if (strikes >= 3) {
      handleLocalFallbackGrade();
      return;
    }

    setGameState('LOADING');

    const primaryRequiredWords = suggestedWords.map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      question: currentQ.question,
      studentAnswer: userAnswer.trim(),
      suggestedWords: primaryRequiredWords,
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
        const next = { ...localAnswers, [currentIndex]: { text: userAnswer.trim(), status: 'api_error' } };
        setLocalAnswers(next);
        onProgress?.(bankedXP(next), next);
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

    // Suggested words are highlighted as hints only — not part of the score.
    const usedWordGroups = suggestedWords.filter(group => checkRequiredWordGroup(group, userAnswer));

    // The mark scheme is the entire score. Trust the grader's per-row judgement
    // rather than filling the first N rows from a total, so a student who earns
    // the second marking point but not the first sees exactly that.
    const score = Number.isFinite(aiData.contentScore) ? aiData.contentScore : (aiData.scienceScore || 0);
    const marks = Array.isArray(aiData.markSchemeHits)
      ? markScheme.map((_, i) => Boolean(aiData.markSchemeHits[i]))
      : markScheme.map((_, i) => i < score);

    const maxMarks = scienceMaxMarks;
    const isPerfect = score >= maxMarks;

    setFeedback({
      usedWordGroups,
      marks,
      score: Math.min(score, maxMarks),
      maxMarks,
      isPerfect,
      isStrikeFallback: false
    });

    if (isPerfect) {
      const next = { ...localAnswers, [currentIndex]: { text: userAnswer.trim(), status: 'perfect' } };
      setLocalAnswers(next);
      // Checkpoint the moment a question is passed, so its marks are banked and
      // it is skipped next time even if the student exits before finishing.
      onProgress?.(bankedXP(next), next);
    }

    setGameState('A');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- wrapping in useCallback would need its whole closure memoised too; the effect below is keyed to the question index on purpose
  const handleNext = () => {
    let newCumPoints = cumulativePoints;
    let newMaxPoints = maxPossiblePoints;

    if (gameState === 'SAVED_PERFECT') {
      newCumPoints += scienceMaxMarks;
      newMaxPoints += scienceMaxMarks;
    } else if (feedback) {
      newCumPoints += feedback.score;
      newMaxPoints += feedback.maxMarks;
    } else if (gameState === 'SAVED_API_ERROR') {
      newMaxPoints += scienceMaxMarks;
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

  /* Three outcomes, and the header says which one at a glance rather than
     making the student read a fraction to find out. Partial credit gets its own
     colour: on a mark scheme it is a real result, not a near-miss. */
  const marksEarned = feedback?.score ?? 0;
  const RESULT_THEMES = {
    full: {
      label: 'Full marks',
      headerBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      headerBorder: 'border-emerald-200 dark:border-emerald-800',
      icon: 'text-emerald-500',
      title: 'text-emerald-800 dark:text-emerald-300',
      pill: 'bg-emerald-500 text-white',
    },
    partial: {
      label: 'Partial marks',
      headerBg: 'bg-amber-50 dark:bg-amber-900/20',
      headerBorder: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-500',
      title: 'text-amber-800 dark:text-amber-300',
      pill: 'bg-amber-500 text-white',
    },
    none: {
      label: 'No marks yet',
      headerBg: 'bg-rose-50 dark:bg-rose-900/20',
      headerBorder: 'border-rose-200 dark:border-rose-800',
      icon: 'text-rose-500',
      title: 'text-rose-800 dark:text-rose-300',
      pill: 'bg-rose-500 text-white',
    },
  };
  const resultTheme = feedback?.isPerfect
    ? RESULT_THEMES.full
    : marksEarned > 0
      ? RESULT_THEMES.partial
      : RESULT_THEMES.none;
  const ResultIcon = feedback?.isPerfect ? CheckCircle2 : marksEarned > 0 ? MinusCircle : XCircle;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 transition-colors duration-300">
      <TopBar
        current={currentIndex}
        total={questions.length}
        onQuit={() => onComplete(bankedXP(localAnswers), localAnswers)}
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
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Type your answer here..."}
            className={textAreaClass}
          />
        </div>

        {gameState !== 'LOADING' && suggestedWords.length > 0 && (
          <div className="w-full mb-10">
            <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
              Suggested Vocabulary <span className="normal-case tracking-normal text-slate-300 dark:text-slate-600">· optional hints, not graded</span>
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {suggestedWords.map((wordGroup, i) => {
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

            {/* One card carries the whole result. The student's own answer is
                still in the (now disabled) box above, so repeating it here as
                "Your Attempt" only pushed the marks further down the page. */}
            <div className="w-full bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">

              <div className={`flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b ${resultTheme.headerBg} ${resultTheme.headerBorder}`}>
                <div className="flex items-center min-w-0">
                  <ResultIcon className={`w-7 h-7 mr-3 flex-shrink-0 ${resultTheme.icon}`} strokeWidth={2.5} />
                  <div className="min-w-0">
                    <h3 className={`text-xl font-black leading-tight ${resultTheme.title}`}>
                      {resultTheme.label}
                    </h3>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                      Mark Scheme
                    </p>
                  </div>
                </div>
                <span className={`flex-shrink-0 font-black text-lg tabular-nums px-4 py-1.5 rounded-xl ${resultTheme.pill}`}>
                  {feedback.score} / {feedback.maxMarks}
                </span>
              </div>

              <ul className="px-6 sm:px-8 py-6 space-y-4">
                {markScheme.map((mark, i) => (
                  <li key={i} className="flex items-start">
                    {feedback.marks[i] ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400 dark:text-rose-500 mr-3 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    )}
                    <span className={`text-base font-medium leading-relaxed ${
                      feedback.marks[i]
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {mark}
                    </span>
                  </li>
                ))}
              </ul>

              {feedback.isStrikeFallback && (
                <p className="px-6 sm:px-8 pb-6 -mt-2 text-sm font-bold text-rose-600 dark:text-rose-400">
                  The AI marker is disabled for this unit after 3 strikes, so no marks can be awarded.
                </p>
              )}
            </div>

            <div className="bg-[#ecfccb] dark:bg-[#3f6212]/20 border border-[#bbf7d0] dark:border-[#4d7c0f] p-6 sm:p-8 rounded-[1.5rem] mb-6">
              <h4 className="font-black text-[#3f6212] dark:text-[#a3e635] text-xs uppercase tracking-widest mb-3">
                Model Answer
              </h4>
              <p className="text-lg font-bold text-[#166534] dark:text-[#ecfccb] leading-relaxed">
                &ldquo;{modelAnswer}&rdquo;
              </p>
            </div>

            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-6">
              Read the model answer, then continue with these marks in mind.
            </p>

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