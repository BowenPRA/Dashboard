import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, Award, Type, FlaskConical, FileEdit, ArrowRight, Clock, Lightbulb } from 'lucide-react';
import TopBar from '../components/TopBar';

import { gradeEssay } from '../utils/aiGrader';
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

const MIN_CHARS = 100; 

export default function Essay({ pool, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike, track, unitTitle }) {
  const currentQ = pool?.essay || pool;

  // The GED Extended Response is a timed, unaided piece of writing. Units may
  // override the limit; 45 minutes matches the real test.
  const minutesAllowed = currentQ?.minutesAllowed ?? 45;
  
  const [localAnswers, setLocalAnswers] = useState(savedData);
  const [gameState, setGameState] = useState('Q'); 
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(minutesAllowed * 60);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[0] || savedData[0] || savedData;
    
    if (saved && saved.text) {
      const text = saved.text;
      const status = saved.status;

      setUserAnswer(text || '');
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
  }, [pool]);

  // Counts down only while the student is actually writing. Declared before the
  // early return below so hook order stays identical on every render.
  useEffect(() => {
    if (gameState !== 'Q' || timeUp) return undefined;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(id); setTimeUp(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [gameState, timeUp]);

  const mmss = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  // Safe check to prevent crashing if the unit has no essay
  if (!currentQ || !currentQ.task) {
    return (
      <EmptyState
        icon={<FileEdit className="w-16 h-16" />}
        iconClassName="text-indigo-300 dark:text-indigo-700"
        title="Coming Soon"
        message="The teacher is currently uploading the Essay task for this unit."
        onAction={onQuit}
      />
    );
  }

  const handleLocalFallbackGrade = () => {
    // Bulletproofed mapping
    // Suggested words are highlighted as hints, never scored.
    const usedWordGroups = (currentQ.suggestedWords || []).filter(group => checkRequiredWordGroup(group, userAnswer));

    const trimmed = (userAnswer || '').trim();
    const hasCapital = /^[A-Z]/.test(trimmed);
    const hasPeriod = /[.!?]$/.test(trimmed);
    const englishScore = (hasCapital && hasPeriod) ? 1 : 0;

    // Two components only: content (mark scheme) + English (max 3).
    const pointsEarned = englishScore;
    const maxPoints = (currentQ.scienceMaxMarks || 0) + 3;

    setFeedback({
      originalAnswer: trimmed,
      usedWordGroups,
      scienceMarks: (currentQ.markScheme || []).map(() => false),
      scienceScore: 0,
      englishScore,
      pointsEarned,
      maxPoints,
      isPerfect: false,
      englishFeedback: englishScore ? "1 point awarded for capital letter and punctuation." : "Missed extra point. Ensure proper sentence structure.",
      scienceFeedback: "AI Grader is disabled for this unit due to 3 strikes. No content marks can be awarded.",
      fixedAnswer: "AI Grader disabled.",
      isStrikeFallback: true
    });

    setLocalAnswers({ 0: { text: trimmed, status: 'strike_fallback' } });
    setGameState('A');
  };

  const handleGrade = async () => {
    const trimmedAnswer = (userAnswer || '').trim();
    if (trimmedAnswer.length < MIN_CHARS) return;

    if (strikes >= 3) {
      handleLocalFallbackGrade();
      return;
    }

    setGameState('LOADING');

    const primarySuggestedWords = (currentQ.suggestedWords || []).map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      task: currentQ.task,
      studentAnswer: trimmedAnswer,
      suggestedWords: primarySuggestedWords,
      expectedAnswer: currentQ.modelAnswer,
      scienceMaxMarks: currentQ.scienceMaxMarks,
      markScheme: currentQ.markScheme,
      guidelines: currentQ.guidelines || [],
      track,
      unitTitle,
      minutesAllowed
    };

    let aiData;

    try {
      aiData = await gradeEssay(payload);
    } catch (e1) {
      console.warn("AI Grade Failed, retrying in 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
      try {
        aiData = await gradeEssay(payload);
      } catch (e2) {
        console.error("AI Grade Failed twice. Entering Error State.");
        setGameState('SAVED_API_ERROR');
        setLocalAnswers({ 0: { text: trimmedAnswer, status: 'api_error' } });
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
    const scienceMarks = (currentQ.markScheme || []).map((_, i) => i < scienceScore);

    // Two components only: content (mark scheme) + English (max 3).
    const pointsEarned = scienceScore + englishScore;
    const maxPoints = (currentQ.scienceMaxMarks || 0) + 3;
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      originalAnswer: trimmedAnswer,
      usedWordGroups,
      scienceMarks,
      scienceScore,
      englishScore,
      pointsEarned: Math.min(pointsEarned, maxPoints),
      maxPoints,
      isPerfect,
      englishFeedback: aiData.englishFeedback || "No feedback provided.",
      scienceFeedback: aiData.scienceFeedback || "No feedback provided.",
      fixedAnswer: aiData.fixedAnswer || aiData.reworkedAnswer || trimmedAnswer,
      isStrikeFallback: false
    });

    if (isPerfect) {
      setLocalAnswers({ 0: { text: trimmedAnswer, status: 'perfect' } });
    }
    
    setGameState('A');
  };

  const handleNext = () => {
    let finalXP = 0;

    if (gameState === 'SAVED_PERFECT') {
      finalXP = 10;
    } else if (feedback) {
      finalXP = Math.ceil((feedback.pointsEarned / feedback.maxPoints) * 10);
    } else if (gameState === 'SAVED_API_ERROR') {
      finalXP = 0;
    }

    onComplete(finalXP, localAnswers); 
  };

  // Labels adapt to the subject. A GED English essay must not be told its content
  // was given "Science" feedback where it isn't a science unit. track and
  // unitTitle come from the registry. Never surface an exam board name.
  const isGedTrack = (track || '').startsWith('GED');
  const isScienceTrack = /SCIENCE/i.test(track || '') || track === 'Y8' || track === 'Y9';
  const markSchemeTitle = isGedTrack ? 'GED Mark Scheme' : 'Content Marks';
  const contentFeedbackTitle = isScienceTrack ? 'Science Feedback' : 'Content Feedback';
  const ContentIcon = isScienceTrack ? FlaskConical : Lightbulb;

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-64 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500 ";
  
  if (gameState === 'SAVED_API_ERROR') {
    containerClass += "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-800";
    textAreaClass += "text-orange-900 dark:text-orange-200";
  } else if (strikes >= 3 || (gameState === 'A' && feedback?.isStrikeFallback)) {
    containerClass += "bg-rose-50 dark:bg-rose-900/20 border-rose-400 dark:border-rose-800";
    textAreaClass += "text-rose-900 dark:text-rose-200";
  } else if ((gameState === 'A' && feedback?.isPerfect) || gameState === 'SAVED_PERFECT') {
    containerClass += "bg-[#ecfccb] dark:bg-lime-900/20 border-[#84cc16] dark:border-lime-800";
    textAreaClass += "text-[#3f6212] dark:text-lime-200";
  } else {
    containerClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800";
    textAreaClass += "text-slate-800 dark:text-slate-100";
  }

  // Bulletproof fallback so length check never crashes
  const charsTyped = (userAnswer || '').trim().length;
  const isLengthValid = charsTyped >= MIN_CHARS;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32">
      <TopBar
        current={0}
        total={1}
        onQuit={() => onComplete(0, localAnswers)}
        modeTitle="Essay Writing"
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Guidelines & Task */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-2xl mb-6 font-bold tracking-widest uppercase text-sm">
                <FileEdit className="w-5 h-5 mr-2" /> Essay Prompt
              </div>

              {/* GED Extended Response supplies opposing sources to analyse. */}
              {(currentQ.sources || []).length > 0 && (
                <div className="space-y-4 mb-6">
                  {currentQ.sources.map((s, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                        Source {i + 1}{s.title ? ` — ${s.title}` : ''}
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line">{s.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-snug mb-6">
                {currentQ.task}
              </h2>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Writing Guidelines</h3>
                <ul className="space-y-3">
                  {(currentQ.guidelines || []).map((guide, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400 font-medium">{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Interaction & Feedback */}
          <div className="w-full lg:w-2/3 flex flex-col">
            
            <div className={containerClass}>
              {gameState === 'Q' && (
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Exam conditions &middot; no spell check &middot; no copy &amp; paste
                  </span>
                  <div className={`flex items-center px-3 py-1.5 rounded-xl border-2 font-black text-sm tabular-nums tracking-wider
                    ${timeUp
                      ? 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                      : secondsLeft <= 300
                        ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}
                  >
                    <Clock className="w-4 h-4 mr-2" strokeWidth={3} />
                    {timeUp ? "TIME" : mmss}
                  </div>
                </div>
              )}

              {timeUp && gameState === 'Q' && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800">
                  <p className="text-sm font-bold text-rose-700 dark:text-rose-300 leading-relaxed">
                    Time is up, just like the real test. Submit what you have written &mdash; a
                    finished-enough response always scores better than an unfinished perfect one.
                  </p>
                </div>
              )}

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                disabled={gameState !== 'Q' || timeUp}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Start writing your essay here..."}
                className={textAreaClass}
              />
            </div>

            {gameState !== 'LOADING' && (currentQ.suggestedWords || []).length > 0 && (
              <div className="w-full mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
                  Suggested Vocabulary <span className="normal-case tracking-normal text-slate-300 dark:text-slate-600">· optional hints, not graded</span>
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(currentQ.suggestedWords || []).map((wordGroup, i) => {
                    const isUsed = feedback 
                      ? feedback.usedWordGroups.includes(wordGroup) 
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
                   className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                 >
                   Complete Section <ArrowRight className="w-6 h-6 ml-3" />
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
                     The AI grader is currently offline. Your essay has been saved. Please continue and resubmit on a future attempt.
                   </p>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
                   <button onClick={handleNext} className="flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-orange-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm">
                     Complete Section <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>
              </div>
            )}

            {(gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 border-t border-slate-200 dark:border-slate-800 pt-6">
                <span className={`text-sm font-bold mb-4 sm:mb-0 ${isLengthValid ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {charsTyped} / {MIN_CHARS} characters minimum
                </span>
                <button 
                  onClick={handleGrade} 
                  disabled={!isLengthValid} 
                  className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] disabled:opacity-50 transition-all shadow-sm"
                >
                  Submit to {strikes >= 3 ? "Local Grader" : "AI Tutor"}
                </button>
              </div>
            )}

            {gameState === 'LOADING' && (
              <div className="w-full h-40 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse mb-8">
                 <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full mb-3">
                   <Bot className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-bounce" />
                 </div>
                 <h3 className="text-lg font-black text-slate-700 dark:text-slate-200">AI Tutor is reading your essay...</h3>
              </div>
            )}

            {gameState === 'A' && feedback && (
              <div className="w-full animate-in slide-in-from-bottom-8 duration-500">

                {!feedback.isPerfect && (
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Your Attempt
                    </span>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed">
                      "{feedback.originalAnswer}"
                    </p>
                  </div>
                )}

                <div className="flex items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                  <div className={`p-3 rounded-full mr-4 flex-shrink-0 bg-indigo-600`}>
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                      {feedback.isStrikeFallback ? "Local Fallback Evaluation" : "AI Tutor Evaluation"}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
                      Accuracy Score:
                      <span className={`ml-2 text-base ${feedback.isPerfect ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                        {feedback.pointsEarned} / {feedback.maxPoints} Pts
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4 text-slate-800 dark:text-slate-100">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 mr-2 text-amber-500" />
                      <h3 className="text-lg font-black">{markSchemeTitle} Breakdown</h3>
                    </div>
                    <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold px-3 py-1 rounded-lg text-sm">
                      {feedback.scienceScore} / {currentQ.scienceMaxMarks} Pts
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {(currentQ.markScheme || []).map((mark, i) => (
                      <li key={i} className="flex items-start">
                        {feedback.scienceMarks[i] ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-300 dark:text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-base font-medium ${feedback.scienceMarks[i] ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500 line-through'}`}>
                          {mark}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-6">
                   <div className="bg-[#fff9e6] dark:bg-amber-900/20 border border-[#fde68a] dark:border-amber-800 p-6 rounded-[1.5rem]">
                     <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center text-[#d97706] dark:text-amber-400">
                         <Type className="w-5 h-5 mr-2" />
                         <h4 className="font-black text-sm uppercase tracking-widest">English Feedback</h4>
                       </div>
                       <span className="bg-[#fef3c7] dark:bg-amber-900/40 text-[#b45309] dark:text-amber-300 font-bold px-2 py-0.5 rounded-md text-xs">
                         {feedback.englishScore} / 3 Pts
                       </span>
                     </div>
                     <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                       {feedback.englishFeedback}
                     </p>
                   </div>

                   <div className="bg-[#eff6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-800 p-6 rounded-[1.5rem]">
                     <div className="flex items-center text-[#2563eb] dark:text-blue-400 mb-3">
                       <ContentIcon className="w-5 h-5 mr-2" />
                       <h4 className="font-black text-sm uppercase tracking-widest">{contentFeedbackTitle}</h4>
                     </div>
                     <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                       {feedback.scienceFeedback}
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
                        {feedback.isPerfect ? "Your Perfect Essay:" : "Polished Version of Your Essay:"}
                      </span>
                      <p className="text-lg font-bold text-[#166534] dark:text-lime-200 leading-relaxed">
                        "{feedback.fixedAnswer}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#d9f99d] dark:border-lime-800">
                      <span className="block text-xs font-bold text-[#65a30d] dark:text-lime-400 uppercase mb-1">
                        Official Model Answer:
                      </span>
                      <p className="text-lg font-bold text-[#166534] dark:text-lime-200 leading-relaxed">
                        "{currentQ.modelAnswer}"
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-[#3f6212] dark:text-lime-300 mt-6 bg-[#d9f99d] dark:bg-lime-900/40 inline-block px-4 py-2 rounded-lg">
                    📝 Note down key sentence structures from the model answer.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
                   <button 
                     onClick={handleNext} 
                     className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                   >
                     Complete Section <ArrowRight className="w-6 h-6 ml-3" />
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