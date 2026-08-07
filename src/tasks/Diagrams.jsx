import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, Award, ImageIcon, Type, FileEdit, ArrowRight, ListChecks } from 'lucide-react';
import TopBar from '../components/TopBar';

import { gradeDiagram } from '../utils/aiGrader';
import { assetUrl, unitImageUrl } from '../utils/assetPaths';
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

/** Points an item is worth: an MCQ its `marks`, a written item content + English. */
const maxPointsOf = (q) => (q?.type === 'mcq' ? (q.marks || 1) : (q?.scienceMaxMarks || 0) + 3);

export default function Diagrams({ pool, unitId, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike, track, unitTitle }) {
  const questions = pool?.diagrams || [];
  const [localAnswers, setLocalAnswers] = useState(savedData);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); // Q, LOADING, A, SAVED_PERFECT, SAVED_API_ERROR
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [picked, setPicked] = useState(null); // MCQ: the chosen option's val

  const [cumulativePoints, setCumulativePoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);

  const currentQ = questions[currentIndex];
  // Written is the default so every item authored before mixed types keeps working.
  const isMcq = currentQ?.type === 'mcq';

  // Feedback is stamped with the item it belongs to and only rendered for that
  // item. Advancing sets currentIndex immediately while the reset effect runs
  // after the commit, so for one render the NEXT question is paired with the
  // PREVIOUS answer — which, in a pool that mixes types, means reading
  // markScheme off an MCQ or usedWordGroups off a multiple-choice result.
  const shownFeedback = feedback && feedback.index === currentIndex ? feedback : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[currentIndex];

    if (saved) {
      const text = typeof saved === 'string' ? saved : saved.text;
      const status = typeof saved === 'string' ? 'perfect' : saved.status;

      setUserAnswer(text || '');
      setFeedback(null);
      setPicked(null);

      if (status === 'mcq') {
        // Replay the graded choice rather than re-asking it.
        setPicked(saved.val);
        setFeedback({ index: currentIndex, isMcq: true, correct: saved.correct, pointsEarned: saved.correct ? (questions[currentIndex].marks || 1) : 0, maxPoints: questions[currentIndex].marks || 1 });
        setGameState('A');
      } else if (status === 'perfect') {
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
      setPicked(null);
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleLocalFallbackGrade = () => {
    // Suggested words are highlighted as hints, never scored.
    const usedWordGroups = (currentQ.suggestedWords || []).filter(group => checkRequiredWordGroup(group, userAnswer));

    const trimmed = userAnswer.trim();
    const hasCapital = /^[A-Z]/.test(trimmed);
    const hasPeriod = /[.!?]$/.test(trimmed);
    const englishScore = (hasCapital && hasPeriod) ? 1 : 0;

    // Two components only: content (mark scheme) + English (max 3).
    const pointsEarned = englishScore;
    const maxPoints = currentQ.scienceMaxMarks + 3;

    setFeedback({
      index: currentIndex,
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks: currentQ.markScheme.map(() => false),
      scienceScore: 0,
      englishScore,
      pointsEarned,
      maxPoints,
      isPerfect: false,
      englishFeedback: englishScore ? "1 point awarded for capital letter and punctuation." : "Missed extra point. Start with a capital and end with a period.",
      scienceFeedback: "AI Grader is disabled for this unit due to 3 strikes. No content marks can be awarded.",
      fixedAnswer: "AI Grader disabled.",
      isStrikeFallback: true
    });

    setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'strike_fallback' } }));
    setGameState('A');
  };

  /**
   * MCQ items are graded here, not by the AI — the answer key is in the data.
   * That also means no English 0–3 component, which is the point: a
   * source-analysis item asking which claim the chart supports should not cost
   * marks for the grammar of a single-letter answer.
   */
  const handlePick = (val) => {
    if (gameState !== 'Q') return;
    const correct = val === currentQ.correct;
    const marks = currentQ.marks || 1;

    setPicked(val);
    setFeedback({ index: currentIndex, isMcq: true, correct, pointsEarned: correct ? marks : 0, maxPoints: marks });
    setLocalAnswers((prev) => ({ ...prev, [currentIndex]: { val, correct, status: 'mcq' } }));
    setGameState('A');
  };

  const handleGrade = async () => {
    if (!userAnswer.trim()) return;

    if (strikes >= 3) {
      handleLocalFallbackGrade();
      return;
    }

    setGameState('LOADING');

    const primarySuggestedWords = (currentQ.suggestedWords || []).map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      promptText: currentQ.prompt || currentQ.promptText,
      studentAnswer: userAnswer.trim(),
      suggestedWords: primarySuggestedWords,
      expectedAnswer: currentQ.modelAnswer,
      scienceMaxMarks: currentQ.scienceMaxMarks,
      markScheme: currentQ.markScheme,
      track,
      unitTitle
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

    // Suggested words are highlighted as hints only — not part of the score.
    const usedWordGroups = (currentQ.suggestedWords || []).filter(group => checkRequiredWordGroup(group, userAnswer));
    const scienceScore = aiData.scienceScore || 0;
    const englishScore = aiData.englishScore || 0;
    const scienceMarks = currentQ.markScheme.map((_, i) => i < scienceScore);

    // Two components only: content (mark scheme) + English (max 3).
    const pointsEarned = scienceScore + englishScore;
    const maxPoints = currentQ.scienceMaxMarks + 3;
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      index: currentIndex,
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
      const maxP = maxPointsOf(currentQ);
      newCumPoints += maxP;
      newMaxPoints += maxP;
    } else if (shownFeedback) {
      // Only the current item's result may be banked — never a leftover.
      newCumPoints += shownFeedback.pointsEarned;
      newMaxPoints += shownFeedback.maxPoints;
    } else if (gameState === 'SAVED_API_ERROR') {
      newMaxPoints += maxPointsOf(currentQ);
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

  // MCQ items have no textarea to hold focus, so Enter is handled globally.
  useEffect(() => {
    if (!currentQ || !isMcq) return;
    const onKey = (e) => {
      if (e.key !== 'Enter' || gameState !== 'A') return;
      e.preventDefault();
      handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, isMcq, gameState, currentIndex, shownFeedback]);

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


  // Guarded here rather than at the top of the component: every hook must run
  // on every render, and the Enter-key effect above needs handleNext in scope.
  if (!currentQ) {
    return (
      <EmptyState
        icon={<ImageIcon className="w-16 h-16" />}
        iconClassName="text-rose-300 dark:text-rose-700"
        title="Coming Soon"
        message="Teacher is currently uploading the Diagrams for this unit."
        onAction={onQuit}
      />
    );
  }

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-40 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent ";
  
  if (gameState === 'SAVED_API_ERROR') {
    containerClass += "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-800";
    textAreaClass += "text-orange-900 dark:text-orange-200";
  } else if (strikes >= 3 || (gameState === 'A' && feedback?.isStrikeFallback)) {
    containerClass += "bg-rose-50 dark:bg-rose-900/20 border-rose-400 dark:border-rose-800";
    textAreaClass += "text-rose-900 dark:text-rose-200";
  } else if ((gameState === 'A' && shownFeedback?.isPerfect) || gameState === 'SAVED_PERFECT') {
    containerClass += "bg-[#ecfccb] dark:bg-lime-900/20 border-[#84cc16] dark:border-lime-800";
    textAreaClass += "text-[#3f6212] dark:text-lime-200";
  } else {
    containerClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800";
    textAreaClass += "text-slate-800 dark:text-slate-100";
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
    
    // imageFile is a bare filename living in public/images/<TRACK>/<UNIT>/;
    // imageUrl/image is a full public-relative path, for shared assets.
    const src = currentQ.imageFile
      ? unitImageUrl(track, unitId, currentQ.imageFile)
      : (currentQ.imageUrl || currentQ.image ? assetUrl(currentQ.imageUrl || currentQ.image) : null);

    if (src) {
      return (
        <img
          src={src}
          alt={currentQ.imageAlt || 'Source material for this question'}
          className="w-full h-auto max-h-[500px] object-contain rounded-xl"
        />
      );
    }

    return (
      <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
        <ImageIcon className="w-12 h-12" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32">
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
            <div className="bg-white dark:bg-slate-900 p-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
               {renderVisual()}
               {(currentQ.credit || currentQ.license) && (
                 <p className="mt-3 px-2 text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-snug">
                   {currentQ.credit}
                   {currentQ.license ? ` · ${currentQ.license}` : ''}
                 </p>
               )}
            </div>
          </div>

          {/* RIGHT: Interaction & Feedback */}
          <div className="w-full lg:w-1/2 flex flex-col">
            
            <div className="w-full mb-6 animate-in fade-in duration-300">
              <h2 className="text-rose-500 font-black text-xl mb-2 uppercase tracking-widest flex items-center">
                {isMcq && <ListChecks className="w-5 h-5 mr-2" strokeWidth={3} />}
                Analysis {currentIndex + 1}
              </h2>
              <p className="text-2xl font-bold text-slate-800 dark:text-white leading-snug">
                {currentQ.prompt || currentQ.promptText}
              </p>
            </div>

            {isMcq && (
              <div className="w-full animate-in fade-in duration-300">
                <div className="grid gap-3 mb-6">
                  {(currentQ.options || []).map((opt) => {
                    const isRight = opt.val === currentQ.correct;
                    const isPicked = picked === opt.val;

                    let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 border-b-[5px] text-slate-700 dark:text-slate-200 hover:border-rose-400 active:border-b-2 active:translate-y-[3px]';
                    if (picked) {
                      if (isRight) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                      else if (isPicked) style = 'bg-[#ffdfe0] dark:bg-rose-900/30 border-[#ea2b2b] text-[#c9362a] dark:text-rose-200';
                      else style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-50';
                    }

                    return (
                      <button
                        key={opt.val}
                        disabled={!!picked}
                        onClick={() => handlePick(opt.val)}
                        className={`flex items-start text-left p-4 sm:p-5 rounded-2xl border-2 font-bold text-base leading-snug transition-all disabled:cursor-default ${style}`}
                      >
                        <span className="font-black uppercase tracking-widest opacity-50 mr-3 mt-0.5 flex-shrink-0">{opt.val}</span>
                        <span className="flex-1">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {gameState === 'A' && shownFeedback?.isMcq && (
                  <div className="animate-in slide-in-from-bottom-4 duration-300">
                    <div className={`p-6 sm:p-8 rounded-[1.5rem] border mb-8 ${shownFeedback.correct ? 'bg-[#ecfccb] dark:bg-lime-900/20 border-[#84cc16] dark:border-lime-800' : 'bg-[#ffe5e5] dark:bg-rose-900/20 border-[#ea4335] dark:border-rose-800'}`}>
                      <div className={`flex items-center justify-between mb-4 pb-4 border-b border-black/10 ${shownFeedback.correct ? 'text-[#3e7500] dark:text-lime-300' : 'text-[#a32d23] dark:text-rose-300'}`}>
                        <div className="flex items-center font-black text-xl tracking-tight">
                          {shownFeedback.correct
                            ? <><CheckCircle2 className="w-7 h-7 mr-2" strokeWidth={2.5} /> Correct</>
                            : <><XCircle className="w-7 h-7 mr-2" strokeWidth={2.5} /> Not quite</>}
                        </div>
                        <span className="font-bold text-sm">{shownFeedback.pointsEarned} / {shownFeedback.maxPoints} Pts</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        <div>
                          <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${shownFeedback.correct ? 'text-[#3e7500] dark:text-lime-400' : 'text-[#a32d23] dark:text-rose-400'}`}>Explanation</span>
                          <p className="text-[15px] font-medium leading-relaxed text-slate-700 dark:text-slate-300">{currentQ.expEn}</p>
                        </div>
                        <div>
                          <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${shownFeedback.correct ? 'text-[#3e7500] dark:text-lime-400' : 'text-[#a32d23] dark:text-rose-400'}`}>Giải thích</span>
                          <p className="text-[15px] font-medium italic leading-relaxed text-slate-700 dark:text-slate-300">{currentQ.expVn}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
                      <button
                        onClick={handleNext}
                        className="flex items-center px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                      >
                        {currentIndex < questions.length - 1 ? 'Continue' : 'Complete Section'}
                        <ArrowRight className="w-6 h-6 ml-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isMcq && (
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
                placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Analyze the diagram here..."}
                className={textAreaClass}
              />
            </div>
            )}

            {gameState !== 'LOADING' && (currentQ.suggestedWords || []).length > 0 && (
              <div className="w-full mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
                  Suggested Vocabulary <span className="normal-case tracking-normal text-slate-300 dark:text-slate-600">· optional hints, not graded</span>
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(currentQ.suggestedWords || []).map((wordGroup, i) => {
                    const isUsed = shownFeedback?.usedWordGroups
                      ? shownFeedback.usedWordGroups.includes(wordGroup)
                      : checkRequiredWordGroup(wordGroup, userAnswer);
                    const displayWord = Array.isArray(wordGroup) ? wordGroup[0] : wordGroup;
                    
                    return (
                      <span 
                        key={i} 
                        className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors duration-300 ${
                          isUsed
                            ? 'bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-300 border-[#58a700]'
                            : 'bg-white dark:bg-slate-900 text-[#58a700] dark:text-lime-400 border-[#58a700]'
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
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 dark:border-slate-800 pt-6 animate-in fade-in">
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
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-6 sm:p-8 rounded-[1.5rem] shadow-sm mb-8">
                   <div className="flex items-center mb-4">
                     <XCircle className="w-8 h-8 text-orange-500 mr-3" />
                     <h3 className="text-xl font-black text-orange-800 dark:text-orange-300">Connection Failed</h3>
                   </div>
                   <p className="text-sm font-bold text-orange-700 dark:text-orange-400 mt-2">
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

            {!isMcq && (gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 dark:border-slate-800 pt-6">
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
              <div className="w-full h-40 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse mb-8">
                 <div className="bg-rose-100 dark:bg-rose-900/40 p-3 rounded-full mb-3">
                   <Bot className="w-8 h-8 text-rose-500 animate-bounce" />
                 </div>
                 <h3 className="text-lg font-black text-slate-700 dark:text-slate-200">AI Tutor is analyzing your answer...</h3>
              </div>
            )}

            {gameState === 'A' && shownFeedback && !shownFeedback.isMcq && (
              <div className="w-full animate-in slide-in-from-bottom-8 duration-500">

                {!shownFeedback.isPerfect && (
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Your Attempt
                    </span>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium italic">
                      "{shownFeedback.originalAnswer}"
                    </p>
                  </div>
                )}

                <div className="flex items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                  <div className={`p-3 rounded-full mr-4 flex-shrink-0 bg-rose-500`}>
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                      {shownFeedback.isStrikeFallback ? "Local Fallback Evaluation" : "AI Tutor Evaluation"}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
                      Accuracy Score:
                      <span className={`ml-2 text-base ${shownFeedback.isPerfect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                        {shownFeedback.pointsEarned} / {shownFeedback.maxPoints} Pts
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4 text-slate-800 dark:text-slate-100">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 mr-2 text-amber-500" />
                      <h3 className="text-lg font-black">Content Marks Breakdown</h3>
                    </div>
                    <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold px-3 py-1 rounded-lg text-sm">
                      {shownFeedback.scienceScore} / {currentQ.scienceMaxMarks} Pts
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {currentQ.markScheme.map((mark, i) => (
                      <li key={i} className="flex items-start">
                        {shownFeedback.scienceMarks[i] ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-300 dark:text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-base font-medium ${shownFeedback.scienceMarks[i] ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500 line-through'}`}>
                          {mark}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                   <div className="bg-[#fff9e6] dark:bg-amber-900/20 border border-[#fde68a] dark:border-amber-800 p-6 rounded-[1.5rem]">
                     <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center text-[#d97706] dark:text-amber-400">
                         <Type className="w-5 h-5 mr-2" />
                         <h4 className="font-black text-sm uppercase tracking-widest">English Feedback</h4>
                       </div>
                       <span className="bg-[#fef3c7] dark:bg-amber-900/40 text-[#b45309] dark:text-amber-300 font-bold px-2 py-0.5 rounded-md text-xs">
                         {shownFeedback.englishScore} / 3 Pts
                       </span>
                     </div>
                     <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                       {shownFeedback.englishFeedback}
                     </p>
                   </div>
                </div>

                <div className="bg-[#ecfccb] dark:bg-lime-900/20 border border-[#bbf7d0] dark:border-lime-800 p-6 sm:p-8 rounded-[1.5rem] relative overflow-hidden mb-8">
                  <div className="absolute top-4 right-4 bg-[#84cc16] p-2 rounded-full text-white">
                    <FileEdit className="w-5 h-5" />
                  </div>

                  <h4 className="font-black text-[#3f6212] dark:text-lime-300 text-sm uppercase tracking-widest mb-4">
                    Suggested Notebook Answer
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-[#65a30d] dark:text-lime-400 uppercase mb-1">
                        {shownFeedback.isPerfect ? "Your Perfect Analysis:" : "Fixed Version of Your Analysis:"}
                      </span>
                      <p className="text-lg font-bold text-[#166534] dark:text-lime-200">
                        "{shownFeedback.fixedAnswer}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#d9f99d] dark:border-lime-800">
                      <span className="block text-xs font-bold text-[#65a30d] dark:text-lime-400 uppercase mb-1">
                        Official Model Answer:
                      </span>
                      <p className="text-lg font-bold text-[#166534] dark:text-lime-200">
                        "{currentQ.modelAnswer}"
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-[#3f6212] dark:text-lime-300 mt-6 bg-[#d9f99d] dark:bg-lime-900/40 inline-block px-4 py-2 rounded-lg">
                    📝 Write one of these down in your notebook for full credit.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
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