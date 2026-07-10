// src/tasks/Assessment.jsx
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, GripVertical, CornerDownRight, Clock, AlertTriangle, Construction, FileQuestion, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Assessment({ unit, onComplete, onQuit }) {
  const assessmentData = unit?.assessment;
  
  if (!assessmentData || !assessmentData.questions || !Array.isArray(assessmentData.questions) || assessmentData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 transition-colors">
        <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Construction className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight">Assessment Unavailable</h2>
        <div className="bg-white dark:bg-slate-900 px-8 py-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-10 text-lg font-bold text-slate-500 dark:text-slate-400">
          No assessment data is currently configured for this unit.
        </div>
        <button onClick={onQuit} className="px-10 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl uppercase tracking-widest border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const questions = assessmentData.questions;
  const passages = assessmentData.passages || [];
  const totalQuestions = questions.length;

  const [testPhase, setTestPhase] = useState('testing'); 
  const [answers, setAnswers] = useState({}); 
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState(assessmentData.timeLimit || 1800); 
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null); 

  const currentQuestion = questions[currentQIndex] || null;
  const currentPassage = currentQuestion ? passages.find(p => p.id === currentQuestion.passageId) : null;

  const isDND = currentQuestion?.type === 'dnd' || currentQuestion?.type === 'order';
  const isInline = currentQuestion?.type === 'inline' || currentQuestion?.type === 'scrollBox';
  const isMCQ = !isDND && !isInline;

  const hasGraphic = currentQuestion?.inlineSvg || currentQuestion?.imageUrl || currentQuestion?.imageFile;
  const hasPassage = !!currentPassage;
  const hasLHS = hasGraphic || hasPassage;

  const currentAns = answers[currentQIndex] || {};

  useEffect(() => {
    if (testPhase !== 'testing') return;
    if (timeLeft <= 0 && !isTimeUp) {
      setIsTimeUp(true);
      finishTest();
      return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, testPhase, isTimeUp]);

  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => { 
    setActiveGlossaryTerm(null); 
  }, [currentQIndex, testPhase]);

  const updateAnswer = (payload) => {
    setAnswers(prev => {
      const currentAnsObj = prev[currentQIndex] || {};
      return { ...prev, [currentQIndex]: { ...currentAnsObj, ...payload } };
    });
  };

  const handleSelectOption = (val) => {
    if (testPhase !== 'testing') return;
    updateAnswer({ selectedOption: val });
  };

  const handleDragStart = (e, itemId) => {
    if (testPhase !== 'testing') return;
    setDraggedItem(itemId);
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    e.stopPropagation();
    if (testPhase !== 'testing' || !draggedItem) return;
    
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    
    for (const key in newDrops) { 
      if (newDrops[key] === draggedItem) delete newDrops[key]; 
    }
    
    newDrops[slotId] = draggedItem;
    updateAnswer({ droppedItems: newDrops });
    setDraggedItem(null);
  };

  const removeDroppedItem = (slotId) => {
    if (testPhase !== 'testing') return;
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    delete newDrops[slotId];
    updateAnswer({ droppedItems: newDrops });
  };

  const handleInlineChange = (blankIndex, val) => {
    if (testPhase !== 'testing') return;
    const currentInline = currentAns.inlineAnswers || {};
    updateAnswer({ inlineAnswers: { ...currentInline, [blankIndex]: val } });
  };

  let isCurrentAnswered = false;
  if (currentQuestion) {
    if (isMCQ) isCurrentAnswered = !!currentAns.selectedOption;
    if (isInline) isCurrentAnswered = Object.keys(currentAns.inlineAnswers || {}).length === Object.keys(currentQuestion.blanks || {}).length;
    if (isDND) {
      let totalSlots = 0;
      (currentQuestion.targets || []).forEach(t => totalSlots += (currentQuestion.correctSets?.[t.id]?.length || 1));
      isCurrentAnswered = Object.keys(currentAns.droppedItems || {}).length === totalSlots;
    }
  }

  // Global Keyboard Navigation
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (testPhase === 'testing' && isCurrentAnswered) handleNextTest();
        else if (testPhase === 'reviewing') handleNextReview();
        else if (testPhase === 'intermission') { setCurrentQIndex(0); setTestPhase('reviewing'); }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (testPhase === 'testing') handlePrevTest();
        else if (testPhase === 'reviewing') handlePrevReview();
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [testPhase, currentQIndex, isCurrentAnswered]);


  const checkQuestionCorrect = (qIndex) => {
    const q = questions[qIndex];
    const ans = answers[qIndex] || {};
    
    if (q.type === 'mcq') return ans.selectedOption === q.correct;
    
    if (q.type === 'inline' || q.type === 'scrollBox') {
      const userInline = ans.inlineAnswers || {};
      const blanks = q.blanks || {};
      for (const blankId of Object.keys(blanks)) {
        if (userInline[blankId] !== blanks[blankId].correct) return false;
      }
      return true;
    }
    
    if (q.type === 'dnd' || q.type === 'order') {
      const dropped = ans.droppedItems || {};
      let allCorrect = true;
      for (const target of (q.targets || [])) {
        const expectedArr = q.correctSets?.[target.id] || [];
        const userDroppedVals = [];
        
        for (let i = 0; i < expectedArr.length; i++) {
          const dId = dropped[`${target.id}_${i}`];
          const bankItem = (q.bank || []).find(b => b.id === dId);
          if (bankItem) userDroppedVals.push(bankItem.val);
        }

        if (q.type === 'order') {
          if (JSON.stringify(userDroppedVals) !== JSON.stringify(expectedArr)) allCorrect = false;
        } else {
          if (userDroppedVals.length !== expectedArr.length) allCorrect = false;
          const unmatchedExpected = [...expectedArr];
          for (const val of userDroppedVals) {
             const idx = unmatchedExpected.indexOf(val);
             if (idx !== -1) {
                unmatchedExpected.splice(idx, 1);
             } else {
                allCorrect = false;
             }
          }
        }
      }
      return allCorrect;
    }
    return false;
  };

  const finishTest = () => {
    let totalPossible = 0;
    let totalEarned = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const q = questions[i];
      const ans = answers[i] || {};

      if (q.type === 'mcq') {
        totalPossible += 1;
        if (ans.selectedOption === q.correct) totalEarned += 1;
      } else if (q.type === 'inline' || q.type === 'scrollBox') {
        const blanks = q.blanks || {};
        const userInline = ans.inlineAnswers || {};
        for (const blankId of Object.keys(blanks)) {
          totalPossible += 1;
          if (userInline[blankId] === blanks[blankId].correct) totalEarned += 1;
        }
      } else if (q.type === 'dnd' || q.type === 'order') {
        const dropped = ans.droppedItems || {};
        for (const target of (q.targets || [])) {
          const expectedArr = q.correctSets?.[target.id] || [];
          totalPossible += expectedArr.length;

          const userDroppedVals = [];
          for (let s = 0; s < expectedArr.length; s++) {
             const dId = dropped[`${target.id}_${s}`];
             const bankItem = (q.bank || []).find(b => b.id === dId);
             if (bankItem) userDroppedVals.push(bankItem.val);
          }

          if (q.type === 'order') {
            for (let s = 0; s < expectedArr.length; s++) {
              if (userDroppedVals[s] === expectedArr[s]) totalEarned += 1;
            }
          } else {
            const unmatchedExpected = [...expectedArr];
            for (const val of userDroppedVals) {
               const idx = unmatchedExpected.indexOf(val);
               if (idx !== -1) {
                 totalEarned += 1;
                 unmatchedExpected.splice(idx, 1);
               }
            }
          }
        }
      }
    }

    const calculatedScore = totalPossible === 0 ? 0 : Math.ceil((totalEarned / totalPossible) * 10);
    setFinalScore(calculatedScore);
    setTestPhase('intermission');
  };

  const handleNextTest = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else finishTest();
  };

  const handlePrevTest = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  const handleNextReview = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else {
      if (typeof onComplete === 'function') onComplete(finalScore);
    }
  };

  const handlePrevReview = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  const renderPassageWithGlossary = (text) => {
    if (!text || typeof text !== 'string') return null;
    const parts = text.split(/\{([^}]+)\}/g);
    return parts.map((part, i) => {
      if (i % 2 !== 0) {
        const cleanWord = part.toLowerCase();
        const termData = currentPassage?.glossary?.[cleanWord];
        if (!termData) return <span key={i} className="font-bold text-slate-800 dark:text-slate-200">{part}</span>;
        return (
          <button 
            key={i} 
            onClick={() => { setActiveGlossaryTerm({ word: part, ...termData }); }}
            className="text-emerald-600 dark:text-emerald-400 font-bold border-b-2 border-dashed border-emerald-600 dark:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors mx-0.5 rounded px-1"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (testPhase === 'intermission') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans selection:bg-indigo-100 relative overflow-hidden transition-colors">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 opacity-40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200 opacity-40 blur-[120px] pointer-events-none" />
        
        <TopBar onQuit={onQuit} current={totalQuestions} total={totalQuestions} modeTitle="Assessment Module" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 animate-in zoom-in-95 duration-500">
          <div className="bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 text-center max-w-2xl w-full">
             <div className="w-32 h-32 mx-auto bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-inner">
               <CheckCircle2 className="w-16 h-16" strokeWidth={3} />
             </div>
             <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4">Assessment Complete</h1>
             <p className="text-2xl font-bold text-slate-500 dark:text-slate-400 mb-8">Let's see how you did.</p>
             
             <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-8 mb-10 shadow-sm">
                <span className="block text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Normalized XP</span>
                <div className="text-6xl font-black text-emerald-500">
                  {finalScore} <span className="text-4xl text-slate-300 dark:text-slate-600">/ 10</span>
                </div>
             </div>

             <button 
                onClick={() => { setCurrentQIndex(0); setTestPhase('reviewing'); }}
                className="w-full py-5 rounded-2xl font-black text-white text-xl uppercase tracking-widest transition-all bg-[#1CB0F6] border-b-[6px] border-[#1899D6] hover:bg-[#1899D6] active:border-b-0 active:translate-y-[6px] shadow-lg flex items-center justify-center"
             >
                Review Answers <ArrowRight className="w-6 h-6 ml-3" strokeWidth={3} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentlyCorrect = testPhase === 'reviewing' ? checkQuestionCorrect(currentQIndex) : null;

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 font-sans relative transition-colors">
      
      <TopBar 
        onQuit={onQuit} 
        current={currentQIndex + 1} 
        total={totalQuestions} 
        modeTitle={testPhase === 'testing' ? "Assessment Module" : "Assessment Review"} 
      />

      {isTimeUp && testPhase === 'testing' && (
        <div className="bg-red-600 text-white p-3 text-center font-bold text-lg uppercase tracking-widest flex justify-center items-center shadow-md z-30 animate-in slide-in-from-top-2">
          <AlertTriangle className="mr-2" /> Time is up! Submitting answers...
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
        
        {hasLHS && (
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 pb-32 transition-colors">
            {hasPassage && (
              <div className={`animate-in fade-in duration-300 ${hasGraphic ? 'mb-8 border-b-2 border-slate-100 dark:border-slate-800 pb-8' : ''}`}>
                <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-6 leading-tight">{currentPassage.title}</h2>
                <div className="mb-6">
                  {currentPassage.meta && (
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 gap-3">
                      <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{currentPassage.meta}</h3>
                    </div>
                  )}
                  <div className="space-y-4 text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
                    {(currentPassage.text || []).map((p, i) => (
                      <p key={i}>{renderPassageWithGlossary(p)}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {hasGraphic && (
              <div className="w-full animate-in fade-in duration-300">
                {currentQuestion.inlineSvg ? (
                  <div 
                    className="w-full h-auto flex items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-inner"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.inlineSvg }}
                  />
                ) : (
                  <img 
                    src={`${import.meta.env.BASE_URL || ''}images/${unit?.id || 'MATH_1A'}/${(currentQuestion.imageFile || currentQuestion.imageUrl).split('/').pop()}`} 
                    alt="Assessment Diagram" 
                    className="w-full h-auto object-contain rounded-3xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-inner p-6 dark:opacity-90"
                  />
                )}
              </div>
            )}
          </div>
        )}

        <div className={`w-full ${hasLHS ? 'md:w-1/2 bg-slate-50 dark:bg-slate-950' : 'max-w-4xl mx-auto bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800'} flex flex-col relative overflow-hidden pb-48 transition-colors`}>
          
          {testPhase === 'testing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-30 flex items-center font-black text-lg px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm text-slate-700 dark:text-slate-200">
               <Clock className="w-5 h-5 mr-2" />
               {formatTime(timeLeft)}
            </div>
          )}

          <div className="p-6 md:p-8 overflow-y-auto h-full relative animate-in fade-in slide-in-from-right-4 duration-300 pt-16 md:pt-10">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 leading-snug tracking-tight mb-8 pr-20">{currentQuestion.title}</h3>
            
            {isMCQ && (
              <div className="space-y-3">
                {(currentQuestion.options || []).map((opt) => {
                  const isSelected = currentAns.selectedOption === opt.val;
                  const isCorrectAnswer = opt.val === currentQuestion.correct;
                  let btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 shadow-sm hover:shadow-md";
                  
                  if (testPhase === 'reviewing') {
                    if (isCorrectAnswer) btnStyle = "bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] text-[#3E7500] dark:text-[#a3e635] shadow-sm";
                    else if (isSelected && !isCorrectAnswer) btnStyle = "bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] text-[#A32D23] dark:text-[#f87171] shadow-sm";
                    else btnStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60";
                  } else if (isSelected) {
                    btnStyle = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 border-b-4 text-emerald-800 dark:text-emerald-400 translate-y-[-2px] shadow-md";
                  }

                  return (
                    <button 
                      key={opt.val}
                      onClick={() => handleSelectOption(opt.val)}
                      disabled={testPhase !== 'testing'}
                      className={`w-full text-left p-4 rounded-2xl border-2 font-medium text-lg transition-all ${btnStyle}`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            )}

            {isDND && (
              <div className="space-y-8">
                <div className="sticky top-0 z-30 pt-1 pb-4 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md shadow-[0_15px_15px_-15px_rgba(0,0,0,0.1)] -mt-2">
                  <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-5 shadow-sm">
                    <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Options Bank</h4>
                    <div className="flex flex-wrap gap-3">
                      {(currentQuestion.bank || []).map((opt) => {
                        const isUsed = Object.values(currentAns.droppedItems || {}).includes(opt.id);
                        if (isUsed) return null;
                        return (
                          <div
                            key={opt.id}
                            draggable={testPhase === 'testing'}
                            onDragStart={(e) => handleDragStart(e, opt.id)}
                            className={`flex items-center px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-all ${testPhase === 'testing' ? 'cursor-grab active:cursor-grabbing hover:border-emerald-400 hover:shadow-md' : 'opacity-50'}`}
                          >
                            <GripVertical className="w-5 h-5 mr-2 text-slate-400 dark:text-slate-500" />
                            {opt.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Targets</h4>
                  <div className={`grid gap-4 ${(currentQuestion.targets || []).length > 1 && currentQuestion.type !== 'order' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                    {(currentQuestion.targets || []).map((target) => {
                      const requiredCount = currentQuestion.correctSets?.[target.id]?.length || 1;
                      return (
                        <div key={target.id} className="flex flex-col bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                          <div className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-[15px] leading-tight text-center border-b-2 border-slate-100 dark:border-slate-800 pb-3">{target.title}</div>
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: requiredCount }).map((_, slotIndex) => {
                              const slotId = `${target.id}_${slotIndex}`;
                              const droppedId = (currentAns.droppedItems || {})[slotId];
                              const droppedObj = (currentQuestion.bank || []).find(b => b.id === droppedId);
                              
                              let slotStyle = "bg-slate-50 dark:bg-slate-950 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500";
                              
                              if (testPhase === 'reviewing') {
                                const expectedArr = currentQuestion.correctSets?.[target.id] || [];
                                const droppedVal = droppedObj ? droppedObj.val : null;
                                let isCorrectInSlot = currentQuestion.type === 'order' ? expectedArr[slotIndex] === droppedVal : expectedArr.includes(droppedVal);
                                
                                if (!droppedId) slotStyle = "bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] border-solid text-[#A32D23] dark:text-[#f87171] shadow-sm";
                                else if (isCorrectInSlot) slotStyle = "bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] border-solid text-[#3E7500] dark:text-[#a3e635] shadow-sm";
                                else slotStyle = "bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] border-solid text-[#A32D23] dark:text-[#f87171] shadow-sm";
                              } else if (droppedObj) {
                                slotStyle = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 border-solid text-emerald-800 dark:text-emerald-400 shadow-sm";
                              }

                              return (
                                <div 
                                  key={slotId}
                                  onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                                  onDrop={(e) => handleDrop(e, slotId)}
                                  onClick={() => droppedObj && removeDroppedItem(slotId)}
                                  className={`min-h-[70px] flex items-center p-3 rounded-2xl border-2 transition-all ${slotStyle} ${testPhase === 'testing' && droppedObj ? 'cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950 hover:border-rose-300' : ''}`}
                                >
                                  {!droppedObj ? (
                                    <div className="flex items-center justify-center w-full">
                                      <CornerDownRight className="w-5 h-5 mr-2 opacity-50" />
                                      <span className="font-medium text-sm">{testPhase === 'reviewing' ? 'Left Blank' : 'Drop Item Here'}</span>
                                    </div>
                                  ) : (
                                    <div className="font-bold flex items-center justify-between w-full text-[15px]">
                                      <span>{droppedObj.text}</span>
                                      {testPhase === 'testing' && <XCircle className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-rose-500 ml-2 flex-shrink-0 transition-colors" />}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {isInline && (
              <div className="text-lg leading-loose text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                {(currentQuestion.textParts || []).map((part, i) => {
                  const blankIndex = i + 1;
                  const blankData = currentQuestion.blanks?.[blankIndex];
                  const selectedVal = (currentAns.inlineAnswers || {})[blankIndex];
                  
                  let selectStyle = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-100 hover:shadow-md';
                  let showCorrection = false;

                  if (testPhase === 'reviewing') {
                    const isCorrect = selectedVal === blankData?.correct;
                    if (isCorrect) selectStyle = 'bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] text-[#3E7500] dark:text-[#a3e635]';
                    else {
                      selectStyle = 'bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] text-[#A32D23] dark:text-[#f87171]';
                      showCorrection = true;
                    }
                  }

                  return (
                    <React.Fragment key={i}>
                      {part}
                      {blankData && (
                        <span className="inline-flex items-center">
                          <select
                            value={selectedVal || ""}
                            onChange={(e) => handleInlineChange(blankIndex, e.target.value)}
                            disabled={testPhase !== 'testing'}
                            className={`mx-2 p-2 border-b-4 border-2 rounded-xl font-bold cursor-pointer transition-all outline-none appearance-none pr-8 bg-no-repeat shadow-sm ${selectStyle}`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23059669'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
                          >
                            <option value="" disabled>{testPhase === 'reviewing' ? 'Blank' : 'Select...'}</option>
                            {(blankData.options || []).map(opt => <option key={opt.val} value={opt.val}>{opt.text}</option>)}
                          </select>
                          {showCorrection && (
                            <span className="text-[#3E7500] dark:text-[#a3e635] bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border border-[#58A700] px-2 py-1 rounded-lg ml-1 text-sm font-bold shadow-sm">
                              {blankData.options.find(o => o.val === blankData.correct)?.text}
                            </span>
                          )}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {testPhase === 'testing' && (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-2">
            <button 
              onClick={handlePrevTest} 
              disabled={currentQIndex === 0}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-30"
            >
              Previous
            </button>
            <button 
              onClick={handleNextTest}
              disabled={!isCurrentAnswered}
              className="px-10 py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md bg-[#1CB0F6] border-[#1899D6] hover:bg-[#159bd9] disabled:opacity-50 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500"
            >
              {currentQIndex === totalQuestions - 1 ? 'Submit Test' : 'Next Question'}
            </button>
          </div>
        </div>
      )}

      {testPhase === 'reviewing' && (
        <Feedback 
          isCorrect={isCurrentlyCorrect}
          expEn={currentQuestion.expEn}
          expVn={currentQuestion.expVn}
          onPrev={handlePrevReview}
          onNext={handleNextReview}
          isFirst={currentQIndex === 0}
          isLast={currentQIndex === totalQuestions - 1}
        />
      )}

    </div>
  );
}